## 分割面板

The Splitter component is used to divide content into separate sections. Users can drag the divider to change the position of the split bar, thereby adjusting the width or height of the panels.

### 基础用法

:::demo

```html
<template>
  <el-splitter>
    <el-splitter-panel :size="300" :min="200" :max="400">
      <div style="height: 280px; background: blue;">Panel 1</div>
    </el-splitter-panel>
    <el-splitter-panel>
      <div style="height: 280px; background: red;">Panel 2</div>
    </el-splitter-panel>
    <el-splitter-panel>
      <div style="height: 280px; background: yellow;">Panel 3</div>
    </el-splitter-panel>
  </el-splitter>
</template>
```

:::

### 垂直分割

:::demo

```html
<template>
  <el-splitter
    style="height: 600px;"
    :direction="'horizontal'"
    @resize-start="onResizeStart"
    @resize="onResize"
    @resize-end="onResizeEnd"
  >
    <el-splitter-panel :size="100" :min="50" :max="200">
      <div style="height: 100%; background: blue;">Panel 1</div>
    </el-splitter-panel>
    <el-splitter-panel>
      <div style="height: 100%; background: red;">Panel 2</div>
    </el-splitter-panel>
    <el-splitter-panel>
      <div style="height: 100%; background: yellow;">Panel 3</div>
    </el-splitter-panel>
  </el-splitter>
</template>

<script>
  export default {
    methods: {
      onResizeStart(index) {
        console.log("Resize started", index);
      },
      onResize(index) {
        console.log("Resizing", index);
      },
      onResizeEnd(index) {
        console.log("Resize ended", index);
      },
    },
  };
</script>
```

:::

### 大小设置

:::warning
To set the initial, minimum, and maximum sizes of a panel， set the `size`、`min`and `max` attributes respectively. Settings for the last panel are ineffective.
:::

:::demo

```html
<template>
  <el-splitter>
    <el-splitter-panel :size="size1" :min="min1" :max="max1">
      <div style="height: 280px; background: blue;">
        Initial size: 300, Min: 200, Max: 400
      </div>
    </el-splitter-panel>
    <el-splitter-panel :size="size2" :min="min2" :max="max2">
      <div style="height: 280px; background: red;">
        Initial size: 100, Min: 50, Max: 200
      </div>
    </el-splitter-panel>
    <el-splitter-panel>
      <div style="height: 280px; background: yellow;">Flexible layout</div>
    </el-splitter-panel>
  </el-splitter>
</template>

<script>
  export default {
    data() {
      return {
        size1: 300,
        min1: 200,
        max1: 400,
        size2: 100,
        min2: 50,
        max2: 200,
      };
    },
  };
</script>
```

:::

### Splitter Attributes

| Attribute | Description                      | Type   | Accepted Values       | Default    |
| --------- | -------------------------------- | ------ | --------------------- | ---------- |
| direction | Layout direction of the splitter | string | horizontal / vertical | horizontal |

### Splitter Events​

| Event Name   | Description                                                                                | Type     |
| ------------ | ------------------------------------------------------------------------------------------ | -------- |
| resize-start | Triggered when starting to adjust panel size. index is the index of the dragged split bar. | Function |
| resize       | Triggered when adjusting panel size. index is the index of the dragged split bar.          | Function |
| resize-end   | Triggered when panel size adjustment ends. index is the index of the dragged split bar.    | Function |

### SplitterPanel Attributes

| Attribute | Description                 | Type   | Accepted Values | Default |
| --------- | --------------------------- | ------ | --------------- | ------- |
| size      | Panel size (pixels)         | number | 200             | 200     |
| min       | Panel minimum size (pixels) | number | 50              | 50      |
| max       | Panel maximum size (pixels) | number | 300             | 300     |

### SplitterPanel Slots

| Name    | Description          |
| ------- | -------------------- |
| default | Content of the panel |
