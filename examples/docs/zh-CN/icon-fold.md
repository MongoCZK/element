## IconFold 带图标侧边折叠面板

带图标侧边折叠面板

### 基础用法

:::demo

```html
<div style="display: flex;height: 200px;">
  <el-icon-fold :time="400" :size="'300px'" :text="'我是折叠面板'" :closed-width="'100px'">
    <div style="width: 100%;height: 100%;background: red;"></div>
  </el-icon-fold>
  <div style="flex: 1;background: pink;"></div>
</div>
```

:::

### 右侧

:::demo

```html
<div style="display: flex;height: 200px;">
  <div style="flex: 1;background: pink;"></div>
  <el-icon-fold :time="400" :size="'200px'" :position="'right'">
    <div style="width: 100%;height: 100%;background: red;"></div>
  </el-icon-fold>
  
</div>
```

:::

### 头部

:::demo

```html
<div style="display: flex;flex-direction: column;height: 400px;background: green;">
  <el-icon-fold :time="400" :size="'200px'" :position="'top'">
    <div style="width: 100%;height: 100%;background: red;"></div>
  </el-icon-fold>
  <div style="flex: 1;background: pink;"></div>
</div>
```

:::

### 底部

:::demo

```html
<div style="display: flex;flex-direction: column;height: 400px;background: green;">
  <div style="flex: 1;background: pink;"></div>
  <el-icon-fold :time="400" :size="'200px'" :position="'bottom'" :closed-width="'50px'">
    <div style="width: 100%;height: 100%;background: red;"></div>
  </el-icon-fold>
</div>
```

:::

### 两侧

:::demo

```html
<div style="display: flex;height: 200px;">
    <el-icon-fold :time="400" :size="'300px'">
    <div style="width: 100%;height: 100%;background: red;"></div>
  </el-icon-fold>
  <div style="flex: 1;background: pink;"></div>
  <el-icon-fold :time="400" :size="'200px'" :position="'right'">
    <div style="width: 100%;height: 100%;background: red;"></div>
  </el-icon-fold>
  
</div>
```

:::

### 打开替换头部

:::demo

```html
<div style="display: flex;height: 200px;">
  <el-icon-fold :time="400" :size="'300px'">
    <div style="width: 100%;height: 100%;background: red;"></div>
    <template #fold-icon-header-title>
        <span>自定义头部文字</span>
      </template>
    <template #fold-icon-open>
        <span>自定义打开文字</span>
    </template>
  </el-icon-fold>
  <div style="flex: 1;background: pink;"></div>
</div>
```

:::

### 收缩替换文本

:::demo

```html
<div style="display: flex;height: 200px;">
  <el-icon-fold :time="400" :size="'300px'">
    <div style="width: 100%;height: 100%;background: red;"></div>
      <template #fold-icon-close>
        <span>自定义关闭文字</span>
      </template>
  </el-icon-fold>
  <div style="flex: 1;background: pink;"></div>
</div>
```

:::


### 复杂用法

:::demo

```html
<div style="display: flex;height: 500px;">
  <el-icon-fold :time="400" :size="'100px'" :text="'我是折叠1'">
    <div style="width: 100%;height: 100%;display: flex;flex-direction: column;">
      <div style="flex: 1;background: red">
      </div> 
      <el-icon-fold :time="400" :size="'100px'" :text="'我是折叠2'" :position="'bottom'">
        <div style="width: 100%;height: 100%;background: yellow"></div>
      </el-icon-fold>
    </div>
  </el-icon-fold>
  <div style="flex: 1;display: flex;flex-direction: column;height: 100%;">
    <el-icon-fold :time="400" :size="'100px'" :text="'我是折叠3'" :position="'top'">
      <div style="width: 100%;height: 100%;background: orange"></div>
    </el-icon-fold>
    <div style="flex: 1;display: flex;">
      <div style="flex: 1;">
      </div> 
      <el-icon-fold :time="400" :size="'200px'" :text="'我是折叠4'" :position="'right'">
        <div style="width: 100%;height: 100%;background: green"></div>
      </el-icon-fold>
    </div>
  </div>
</div>
```

:::


### Empty Attributes

| 参数     | 说明                          | 类型   | 可选值     | 默认值 |
| -------- | ----------------------------- | ------ | ---------- | ------ |
| text     | 头部左侧标题文本 | string | —          | -    | 展开/折叠
| time     | 伸缩时间，单位 ms，应大于 200 | number | —          | 400    |
| size    | 折叠面板（大小,position为left/height为宽度，top/bottom为高度）              | string | —          | 100%   |
| closed-width    | 收缩面板（大小,position为left/height为宽度，top/bottom为高度）              | string | —          | 30px   |
| position | 折叠方向                      | string | left/right | left   |

### Empty Slots

| Name        | 说明           |
| ----------- | -------------- |
| fold-icon-header-title     | 自定义头部标题 |
| fold-icon-open     | 自定义展开图片或文本 |
| fold-icon-close     | 自定义关闭图片或文本 |
