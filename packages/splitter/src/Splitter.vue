
<script>
import SplitterBar from './SplitterBar.vue';

export default {
  name: 'ElSplitter',
  components: {
    SplitterBar
  },
  props: {
    direction: {
      type: String,
      default: 'vertical'
    }
  },
  data() {
    return {
      panelConfigs: [], // [{ size, min, max }]
      draggingIndex: null, // 当前拖拽的分割条索引
      startPos: 0, // 鼠标起始位置
      currentStarSize: 0, // 拖拽起始大小
      isDragging: false // 是否拖拽中
    };
  },
  render(h) {
    // 获取默认插槽内容（数组 of VNodes）
    const panels = this.$slots.default.filter((v) => v && v.componentOptions) || [];
    const children = [];
    panels.forEach((vnode, index) => {
      if (!vnode || vnode.tag === undefined) {
        // 跳过文本节点、注释等无效节点
        // 保留它们以避免丢失空白或注释（可选）
        children.push(vnode);
        return;
      }
      const propsData = vnode.componentOptions.propsData || {};
      const config = this.panelConfigs[index] || {
        size: propsData.size || 200,
        min: propsData.min || 50,
        max: propsData.max || 300
      };
      // 判断是否是组件（有 componentOptions）
      if (vnode.componentOptions) {
        // 是组件（如 <SplitterPanel>）
        const clonedVNode = h(
          vnode.componentOptions.Ctor, // 组件构造函数
          {
            // 合并 props：保留原有 + 注入 direction
            props: {
              ...propsData,
              size: config.size,
              direction: this.direction,
              index: index,
              canChange: index < panels.length - 1
            },
            // 保留 key / ref
            key: vnode.key,
            ref: vnode.data && vnode.data.ref
          },
          // 保留子节点（即 slot 内容）
          vnode.componentOptions.children
        );
        children.push(clonedVNode);
      } else {
        // 非组件（如 <div>），直接保留
        children.push(vnode);
      }

      // 在非最后一个有效面板后插入 SplitterBar
      if (index < panels.length - 1) {
        children.push(
          h(SplitterBar, {
            key: `bar-${index}`,
            props: {
              direction: this.direction,
              index: index,
              size: config.size,
              min: config.min,
              max: config.max
            },
            on: {
              // Vue 2 事件监听必须写在 on 对象里
              'start-drag': (payload) => {
                // console.log(`开始拖拽第 ${payload.index} 个分割条`, payload)
                this.isDragging = true;
                // 绑定全局 mousemove / mouseup
                this.draggingIndex = payload.index;
                this.startPos = this.direction === 'vertical' ? payload.clientX : payload.clientY;
                this.currentStarSize = this.panelConfigs[payload.index].size;
                this.$emit('resize-start', payload.index);
                document.addEventListener('mousemove', this.onDrag);
                document.addEventListener('mouseup', this.onDragEnd);
              }
            }
          })
        );
      }
    });

    return h(
      'div',
      {
        staticClass: 'el-splitter',
        class: {
          'el-splitter-vertical': this.direction === 'vertical',
          'el-splitter-horizontal': this.direction === 'horizontal'
        },
        ref: 'SplitterContainerRef'
      },
      children
    );
  },
  mounted() {
    this.initPanelSizes();
  },
  methods: {
    initPanelSizes() {
      const panels = (this.$slots.default || []).filter(
        (v) => v && v.componentOptions
      );
      this.panelConfigs = panels.map(vnode => {
        const props = vnode.componentOptions.propsData || {};
        return {
          size: props.size || 200,
          min: props.min || 50,
          max: props.max || 300
        };
      });
    },
    onDrag(e) {
      if (this.draggingIndex === null) return;
      const delta = this.direction === 'vertical' ? this.startPos - e.clientX : this.startPos - e.clientY;
      const newSize = this.currentStarSize - delta;
      const config = this.panelConfigs[this.draggingIndex];
      if (newSize >= config.min && newSize <= config.max) {
        this.$set(this.panelConfigs, this.draggingIndex, {
          ...config,
          size: newSize
        });
      } else {
        // 边界处理
        if (newSize < config.min) {
          this.$set(this.panelConfigs, this.draggingIndex, {
            ...config,
            size: config.min
          });
        } else if (newSize > config.max) {
          this.$set(this.panelConfigs, this.draggingIndex, {
            ...config,
            size: config.max
          });
        }
      }
      this.$emit('resize', this.draggingIndex);
    },
    onDragEnd() {
      this.$emit('resize-end', this.draggingIndex);
      this.draggingIndex = null;
      this.isDragging = false;
      document.removeEventListener('mousemove', this.onDrag);
      document.removeEventListener('mouseup', this.onDragEnd);
    }
  }
};
</script>