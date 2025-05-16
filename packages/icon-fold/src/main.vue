<template>
  <div class="el-icon-fold" :style="foldStyle">
    <template v-if="position === 'left' || position === 'right'">
    <div v-show="!isFold" class="el-icon-fold__header">
      <div class="el-icon-fold__header__title">
        <slot name="fold-icon-header-title">
          <div class="el-icon-fold__header__title__text">{{ text }}</div>
        </slot>
      </div>
      <div class="el-icon-fold-img" @click="onFold()">
        <slot name="fold-icon-open">
          <img :src="foldIcon" />
        </slot>
      </div>
    </div>
    <div
      class="el-icon-fold__wrap"
    >
      <slot></slot>
    </div>
    <div
      v-show="isFold"
      class="el-icon-fold__close"
      @click="onFold()"
      :style="{ width: closedWidth}"
    >
      <slot name="fold-icon-close">
        <div class="el-icon-fold__close__text">
          <img :src="foldIcon" />
        </div>
      </slot>
    </div>
    </template>
    <template v-else>
      <div class="el-icon-fold__header" :style="{ height: closedWidth}">
      <div class="el-icon-fold__header__title">
        <slot name="fold-icon-header-title">
          <div class="el-icon-fold__header__title__text">{{ text }}</div>
        </slot>
      </div>
      <div class="el-icon-fold-img" @click="onFold()">
        <slot name="fold-icon-open">
          <img :src="foldIcon" />
        </slot>
      </div>
    </div>
    <div
      class="el-icon-fold__wrap"
    >
      <slot></slot>
    </div>
    </template>
  </div>
</template>

<script>
import FoldRight from './images/右.svg';
import FoldLeft from './images/左.svg';
import FoldTop from './images/上.svg';
import FoldBottom from './images/下.svg';
export default {
  name: 'ElIconFold',

  props: {
    text: {
      type: String,
      default: '展开/折叠'
    },
    // 伸缩时间，单位ms，应大于200
    time: {
      type: Number,
      default: 400
    },
    size: {
      type: String,
      default: '100%'
    },
    closedWidth: {
      type: String,
      default: '30px'
    },
    position: {
      type: String,
      default: 'left',
      validator: (value) => ['left', 'right', 'top', 'bottom'].includes(value)
    }
  },
  data() {
    return {
      // 内容是否折叠
      isFold: false,
      // 左侧操作栏是否折叠
      isShowFold: false,
      isShowFoldSetT: null
    };
  },

  computed: {
    foldIcon() {
      if (this.position === 'top') {
        // 当位置为顶部时，折叠返回 FoldBottom，展开返回 FoldTop
        return this.isFold ? FoldBottom : FoldTop;
      } else if (this.position === 'bottom') {
        // 当位置为底部时，折叠返回 FoldTop，展开返回 FoldBottom
        return this.isFold ? FoldTop : FoldBottom;
      } else if (this.position === 'right') {
        // 当位置为右侧时，折叠返回 FoldLeft，展开返回 FoldRight
        return this.isFold ? FoldLeft : FoldRight;
      }
      // 当位置为左侧时，折叠返回 FoldRight，展开返回 FoldLeft
      return this.isFold ? FoldRight : FoldLeft;
    },
    foldStyle() {
      const isHorizontal = this.position === 'left' || this.position === 'right';
      const dimension = isHorizontal ? 'width' : 'height';
      return {
        // 根据方向动态设置宽度或高度
        [dimension]: !this.isFold ? this.size : this.closedWidth,
        // 根据方向动态设置过渡属性
        transition: `${dimension} ${this.time}ms`
      };
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
    }
  }
};
</script>

