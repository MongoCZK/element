<template>
  <div class="el-fold">
    <!--    内容-->
    <div
      class="el-fold__wrap"
      :class="{ 'el-fold__hide': isFold }"
      :style="{ width: width, transition: 'width ' + time + 'ms' }"
    >
      <div class="el-fold__inner" :style="{ width: width }">
        <slot></slot>
      </div>
    </div>
   <!--    收缩图标，使用具名插槽替换默认图标 -->
    <div ref="iconContainer" class="el-fold__img" :style="imgPostionStyle" @click="onFold()">
      <slot name="fold-icon" :isFold="isFold">
        <img :src="foldIcon" />
      </slot>
    </div>
  </div>
</template>

<script>
import FoldIconOpen from './images/fold-icon--open.png';
import FoldIconClose from './images/fold-icon--close.png';
export default {
  name: 'ElFold',

  props: {
    // 伸缩时间，单位ms，应大于200
    time: {
      type: Number,
      default: 400
    },
    // 默认宽度取决于外层元素的宽度，建议指定为固定的px的（如466px）,
    // 可避免伸缩过程中内容不断调整布局，影响性能及效果
    width: {
      type: String,
      default: '100%'
    },

    position: {
      type: String,
      default: 'left',
      validator: (value) => ['left', 'right'].includes(value)
    }
  },
  data() {
    return {
      // 内容是否折叠
      isFold: false,
      // 左侧操作栏是否折叠
      isShowFold: true,
      isShowFoldSetT: null
    };
  },

  computed: {
    foldIcon() {
      return this.isFold ? FoldIconOpen : FoldIconClose;
    },

    imgPostionStyle() {
      switch (this.position) {
        case 'right':
          return {
            left: '-16px',
            transform: 'translateY(-50%)rotate(180deg)'
          };
        case 'left':
        default:
          return {
            right: '-16px',
            transform: 'translateY(-50%)'
          };
      }
    }
  },

  methods: {
    /**
     * 展开/折叠变化
     * @param {boolean} [targetStatus] 目标状态
     */
    onFold(targetStatus) {
      this.isFold = targetStatus || !this.isFold;
      this.$emit('async', this.isFold);
      clearTimeout(this.isShowFoldSetT);
      this.isShowFoldSetT = setTimeout(() => {
        this.isShowFold = !this.isFold;
        this.$emit('async', this.isFold);
      }, this.time - 200);
    }
  }
};
</script>
