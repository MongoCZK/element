<template>
  <div class="el-splitter-panel" ref="SplitterPanelRef" :style="splitterStyle">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ElSplitterPanel',
  props: {
    index: {
      type: Number,
      required: true
    },
    direction: {
      type: String,
      default: 'vertical'
    },
    canChange: {
      type: Boolean,
      default: true
    },
    size: {
      type: Number,
      default: 200
    },
    max: {
      type: Number,
      default: 300
    },
    min: {
      type: Number,
      default: 50
    }
  },
  computed: {
    clampedSize() {
      return Math.max(this.min, Math.min(this.size, this.max));
    },
    splitterStyle() {
      if (!this.canChange) {
        return this.direction === 'vertical'
          ? { flex: 1, width: '0px' }
          : { flex: 1, height: '0px' };
      }

      const size = this.clampedSize + 'px';

      return this.direction === 'vertical' ? { width: size } : { height: size };
    }
  }
};
</script>

<style scoped lang="scss">

</style>
