<template>
  <div
    @mousedown="handleMouseDown"
    class="el-splitter-bar"
    :class="[
      direction === 'vertical'
        ? 'el-splitter-bar-vertical'
        : 'el-splitter-bar-horizontal',
      dragStateClass
    ]"
    ref="SplitterBarRef"
  ></div>
</template>

<script>
export default {
  name: 'ElSplitterBar',
  props: {
    direction: {
      type: String,
      default: 'vertical'
    },
    index: {
      type: Number,
      required: true
    },
    size: {
      type: Number,
      default: 200
    },
    min: {
      type: Number,
      default: 50
    },
    max: {
      type: Number,
      default: 300
    }
  },
  computed: {
    // 判断当前拖拽能力
    canShrink() {
      return this.size > this.min; // 能否再变小？
    },
    canGrow() {
      return this.size < this.max; // 能否再变大？
    },
    dragStateClass() {
      if (!this.canShrink && !this.canGrow) {
        return 'el-drag-locked';
      } else if (!this.canShrink) {
        return 'el-drag-min-limit'; // 已达最小，只能变大
      } else if (!this.canGrow) {
        return 'el-drag-max-limit'; // 已达最大，只能变小
      } else {
        return 'el-drag-normal';
      }
    }
  },
  methods: {
    handleMouseDown(event) {
      event.preventDefault();
      this.$emit('start-drag', {
        index: this.index,
        clientX: event.clientX,
        clientY: event.clientY
      });
    }
  }
};
</script>

<style scoped lang="scss">
.el-splitter-bar {
  background: #ccc;
  // transition: background 0.2s, cursor 0.1s;
}

/* 垂直分割条（左右拖） */
.el-splitter-bar-vertical {
  width: 5px;

  &.el-drag-locked {
    cursor: default;
    background: #eee;
  }
  &.el-drag-min-limit { /* size == min，不能再小，只能往右拖（增大） */
    cursor: e-resize;
  }
  &.el-drag-max-limit { /* size == max，不能再大，只能往左拖（减小） */
    cursor: w-resize;
  }
  &.el-drag-normal {
    cursor: col-resize;
  }
}

/* 水平分割条（上下拖） */
.el-splitter-bar-horizontal {
  height: 5px;

  &.el-drag-locked {
    cursor: default;
    background: #eee;
  }
  &.el-drag-min-limit { /* size == min，不能再小（高度不能再小），只能往下拖（增大） */
    cursor: s-resize;
  }
  &.el-drag-max-limit { /* size == max，不能再大，只能往上拖（减小） */
    cursor: n-resize;
  }
  &.el-drag-normal {
    cursor: row-resize;
  }
}
</style>
