<template>
  <transition
    name="window-fade"
    @after-enter="afterEnter"
    @after-leave="afterLeave">
    <div
      v-show="visible"
      class="el-window__wrapper"
      :class="[{'el-window__pointnull': pointsNull}]"
      @click.self="handleWrapperClick">
      <div
        role="window"
        :key="key"
        aria-modal="true"
        :aria-label="title || 'window'"
        :class="['el-window', { 'is-fullscreen': localFullscreen, 'el-window--center': center, 'el-window__resizable': resizable && !localFullscreen }, customClass]"
        ref="window"
        :style="style"
        >
        <div class="el-window__header" :style="{'cursor': canDrag ? 'grab' : 'default'}" @mousedown="startDrag" @mousemove="handleMouseMove" @mouseup="handleMouseUp" 
        @mouseleave="handleMouseUp">
          <slot name="title">
            <span class="el-window__title">{{ title }}</span>
          </slot>
          <div class="el-window__headerbtns">
            <button
            type="button"
            class="el-window__headerbtn"
            aria-label="Fullscreen"
            v-if="showFullscreen"
            @click="handleFullScreen">
            <i class="el-window__full-screen el-icon el-icon-full-screen"></i>
          </button>
          <button
            type="button"
            class="el-window__headerbtn"
            aria-label="Close"
            v-if="showClose"
            @click="handleClose">
            <i class="el-window__close el-icon el-icon-close"></i>
          </button>
          </div>
          
        </div>
        <div class="el-window__body" v-if="rendered"><slot></slot></div>
        <div class="el-window__footer" v-if="$slots.footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import Popup from 'element-ui/src/utils/popup';
  import Migrating from 'element-ui/src/mixins/migrating';
  import emitter from 'element-ui/src/mixins/emitter';

  export default {
    name: 'ElWindow',

    mixins: [Popup, emitter, Migrating],

    props: {
      title: {
        type: String,
        default: ''
      },

      modal: {
        type: Boolean,
        default: false
      },

      modalAppendToBody: {
        type: Boolean,
        default: true
      },

      pointsNull: {
        type: Boolean,
        default: true
      },

      canDrag: {
        type: Boolean,
        default: false
      },

      appendToBody: {
        type: Boolean,
        default: false
      },

      lockScroll: {
        type: Boolean,
        default: true
      },

      closeOnClickModal: {
        type: Boolean,
        default: true
      },

      closeOnPressEscape: {
        type: Boolean,
        default: true
      },

      showClose: {
        type: Boolean,
        default: true
      },

      showFullscreen: {
        type: Boolean,
        default: true
      },

      initWidth: String,

      initHeight: {
        type: String,
        default: 'auto'
      },

      fullscreen: Boolean,

      customClass: {
        type: String,
        default: ''
      },

      initY: {
        type: String,
        default: '15vh'
      },

      initX: {
        type: String,
        default: 'auto'
      },
  
      beforeClose: Function,
      center: {
        type: Boolean,
        default: false
      },

      destroyOnClose: Boolean,

      // 边界配置，支持自定义拖拽边界
      boundary: {
        type: Object,
        default: () => ({
          left: 0,
          top: 0,
          right: 0,
          bottom: 0
        })
      },

      // 是否可resize
      resizable: {
        type: Boolean,
        default: true
      }
    },

    data() {
      return {
        closed: false,
        key: 0,
        localFullscreen: this.fullscreen,
        isDragging: false,
        startX: 0,
        startY: 0,
        windowX: 0,
        windowY: 0,
        width: 0,
        height: 0,
        beforeFullsreenWidth: 0,
        beforeFullsreenHeight: 0,
        // 添加标记是否初次加载的变量
        isInitialLoad: true
      };
    },

    watch: {
      visible(val) {
        if (val) {
          this.closed = false;
          this.$emit('open');
          this.$el.addEventListener('scroll', this.updatePopper);
          this.$nextTick(() => {
            this.$refs.window.scrollTop = 0;
          });
          if (this.appendToBody) {
            document.body.appendChild(this.$el);
          }
        } else {
          this.$el.removeEventListener('scroll', this.updatePopper);
          if (!this.closed) this.$emit('close');
          if (this.destroyOnClose) {
            this.$nextTick(() => {
              this.key++;
            });
          }
        }
      },
      localFullscreen(val) {
        if (val) {
          // 保存全屏前状态
          const windowRect = this.$refs.window.getBoundingClientRect();
          if (windowRect.width !== 0 || windowRect.height !== 0) {
            this.beforeFullsreenWidth = windowRect.width;
            this.beforeFullsreenHeight = windowRect.height;
          }
        } else {
          // 恢复全屏前状态
          this.width = this.beforeFullsreenWidth;
          this.height = this.beforeFullsreenHeight;
        }
      }
    },

    computed: {
      style() {
        let style = {};
        if (!this.localFullscreen) {
          style.marginTop = this.initY;
          style.marginLeft = this.initX;
          // 如果已经有手动调整的尺寸，使用调整后的尺寸
          if (this.width > 0) {
            style.width = `${this.width}px`;
          } else if (this.initWidth) {
            style.width = this.initWidth;
          }
          if (this.height > 0) {
            style.height = `${this.height}px`;
          } else if (this.initHeight) {
            style.height = this.initHeight;
          }
          // 添加拖拽位置样式
          if (this.canDrag && !this.isInitialLoad) {
            style.marginLeft = `${this.windowX}px`;
            style.marginTop = `${this.windowY}px`;
          }
        } else {
          style.marginTop = this.boundary.top + 'px';
          style.marginLeft = this.boundary.left + 'px';
          const xPadding = this.boundary.right + this.boundary.left;
          const yPadding = this.boundary.bottom + this.boundary.top;
          style.width = `calc(100% - ${xPadding}px)`;
          style.height = `calc(100% - ${yPadding}px)`;
        }
        return style;
      }
    },

    methods: {
      getMigratingConfig() {
        return {
          props: {
            'size': 'size is removed.'
          }
        };
      },
      handleWrapperClick() {
        if (!this.closeOnClickModal) return;
        this.handleClose();
      },
      handleClose() {
        if (typeof this.beforeClose === 'function') {
          this.beforeClose(this.hide);
        } else {
          this.hide();
        }
      },
      handleFullScreen() {
        this.localFullscreen = !this.localFullscreen;
        // this.$emit('update:fullscreen', this.localFullscreen);
      },
      hide(cancel) {
        if (cancel !== false) {
          this.$emit('update:visible', false);
          this.$emit('close');
          this.closed = true;
        }
      },
      updatePopper() {
        this.broadcast('ElSelectDropdown', 'updatePopper');
        this.broadcast('ElDropdownMenu', 'updatePopper');
      },
      afterEnter() {
        this.$emit('opened');
      },
      afterLeave() {
        this.$emit('closed');
        this.localFullscreen = false;
      },
      startDrag(event) {
        if (!this.canDrag || this.localFullscreen) return;
        this.isInitialLoad = false;
        this.isDragging = true;
        this.startX = event.clientX;
        this.startY = event.clientY;
        const windowRect = this.$refs.window.getBoundingClientRect();
        this.width = windowRect.width;
        this.height = windowRect.height;
        // 减去页面滚动距离
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        this.windowX = windowRect.left + scrollLeft;
        this.windowY = windowRect.top + scrollTop;
      },
      handleMouseMove(event) {
        if (!this.isDragging) return;
        const deltaX = event.clientX - this.startX;
        const deltaY = event.clientY - this.startY;
        this.windowX += deltaX;
        this.windowY += deltaY;
        this.startX = event.clientX;
        this.startY = event.clientY;
        // 获取边界配置
        const boundary = this.boundary;
        const windowRect = this.$refs.window.getBoundingClientRect();

        // 限制 window 在边界内
        this.windowX = Math.max(boundary.left, Math.min(this.windowX, window.innerWidth - boundary.right - windowRect.width));
        this.windowY = Math.max(boundary.top, Math.min(this.windowY, window.innerHeight - boundary.bottom - windowRect.height));
      },
      handleMouseUp() {
        this.isDragging = false;
      }
    },

    mounted() {
      if (this.visible) {
        this.rendered = true;
        this.open();
        if (this.appendToBody) {
          document.body.appendChild(this.$el);
        }
  
      }
    },

    destroyed() {
      // if appendToBody is true, remove DOM node after destroy
      if (this.appendToBody && this.$el && this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el);
      }
    }
  };
</script>
