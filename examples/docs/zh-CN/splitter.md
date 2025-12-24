## 分割面板

分割面板用于将内容进行分隔,可拖拽改变分隔条的位置,从而改变面板的宽度或高度。

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
        console.log("开始调整", index);
      },
      onResize(index) {
        console.log("正在调整", index);
      },
      onResizeEnd(index) {
        console.log("结束调整", index);
      },
    },
  };
</script>
```

:::

### 大小设置

:::warning
如果需要设置面板的初始大小、最小大小和最大大小，请分别设置 `size`、`min` 和 `max` 属性。最后一个面板设置无效
:::

:::demo

```html
<template>
  <el-splitter>
    <el-splitter-panel :size="size1" :min="min1" :max="max1">
      <div style="height: 280px; background: blue;">
        初始大小300，最小200，最大400
      </div>
    </el-splitter-panel>
    <el-splitter-panel :size="size2" :min="min2" :max="max2">
      <div style="height: 280px; background: red;">
        初始大小100，最小50，最大200
      </div>
    </el-splitter-panel>
    <el-splitter-panel>
      <div style="height: 280px; background: yellow;">弹性布局</div>
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

| 参数      | 说明               | 类型   | 可选值                | 默认值     |
| --------- | ------------------ | ------ | --------------------- | ---------- |
| direction | 分隔面板的布局方向 | string | horizontal / vertical | horizontal |

### Splitter Events​

| 名称         | 详情                                           | 类型     |
| ------------ | ---------------------------------------------- | -------- |
| resize-start | 开始调整面板大小时触发，index 是拖拽条的索引。 | Function |
| resize       | 调整面板大小时触发，index 是拖拽条的索引。     | Function |
| resize-end   | 面板调整大小结束时触发，index 是拖拽条的索引。 | Function |

### SplitterPanel Attributes

| 参数 | 说明                 | 类型   | 可选值 | 默认值 |
| ---- | -------------------- | ------ | ------ | ------ |
| size | 面板大小(像素)       | number | 200    | 200    |
| min  | 面板最小尺寸(像素)   | number | 50     | 50     |
| max  | 面板的最大尺寸(像素) | number | 300    | 300    |

### SplitterPanel Slots

| 名称    | 说明       |
| ------- | ---------- |
| default | 面板的内容 |
