## Window 可拖拽对话框
在保留当前页面状态的情况下，告知用户并承载相关操作。

### 基本用法

Window 弹出一个对话框，适合需要定制性更大的场景。

:::demo 需要设置`visible`属性，它接收`Boolean`，当为`true`时显示 Dialog。Dialog 分为两个部分：`body`和`footer`，`footer`需要具名为`footer`的`slot`。`title`属性用于定义标题，它是可选的，默认值为空。最后，本例还展示了`before-close`的用法。

```html
<el-button type="text" @click="dialogVisible = true">点击打开 Window</el-button>

<el-window
  title="提示"
  :visible.sync="dialogVisible"
  initWidth="30%"
  initHeight="200px"
  initX="50%"
  initY="20vh"
  :before-close="handleClose">
  <span>这是一段信息</span>
  <span slot="footer" class="window-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-window>

<script>
  export default {
    data() {
      return {
        dialogVisible: false
      };
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
    }
  };
</script>
```
:::

:::tip
`before-close` 仅当用户通过点击关闭图标或遮罩关闭 Window 时起效。如果你在 `footer` 具名 slot 里添加了用于关闭 Window 的按钮，那么可以在按钮的点击回调函数里加入 `before-close` 的相关逻辑。
:::

### 自定义内容

Window 组件的内容可以是任意的，甚至可以是表格或表单，下面是应用了 Element Table 和 Form 组件的两个样例。

:::demo
```html
<!-- Table -->
<el-button type="text" @click="dialogTableVisible = true">打开嵌套表格的 Window</el-button>

<el-window title="收货地址" :visible.sync="dialogTableVisible">
  <el-table :data="gridData">
    <el-table-column property="date" label="日期" width="150"></el-table-column>
    <el-table-column property="name" label="姓名" width="200"></el-table-column>
    <el-table-column property="address" label="地址"></el-table-column>
  </el-table>
</el-window>

<!-- Form -->
<el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Window</el-button>

<el-window title="收货地址" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="活动名称" :label-width="formLabelWidth">
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="活动区域" :label-width="formLabelWidth">
      <el-select v-model="form.region" placeholder="请选择活动区域">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="window-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
  </div>
</el-window>

<script>
  export default {
    data() {
      return {
        gridData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        dialogTableVisible: false,
        dialogFormVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px'
      };
    }
  };
</script>
```
:::

### 嵌套的 Window
如果需要在一个 Window 内部嵌套另一个 Dialog，需要使用 `append-to-body` 属性。
:::demo 正常情况下，我们不建议使用嵌套的 Dialog，如果需要在页面上同时显示多个 Dialog，可以将它们平级放置。对于确实需要嵌套 Window 的场景，我们提供了`append-to-body`属性。将内层 Window 的该属性设置为 true，它就会插入至 body 元素上，从而保证内外层 Window 和遮罩层级关系的正确。
```html
<template>
  <el-button type="text" @click="outerVisible = true">点击打开外层 Window</el-button>
  
  <el-window title="外层 Window" :visible.sync="outerVisible">
    <el-window
      initWidth="30%"
      title="内层 Window"
      :visible.sync="innerVisible"
      append-to-body>
    </el-window>
    <div slot="footer" class="window-footer">
      <el-button @click="outerVisible = false">取 消</el-button>
      <el-button type="primary" @click="innerVisible = true">打开内层 Window</el-button>
    </div>
  </el-window>
</template>

<script>
  export default {
    data() {
      return {
        outerVisible: false,
        innerVisible: false
      };
    }
  }
</script>
```
:::

### 居中布局

标题和底部可水平居中

:::demo 将`center`设置为`true`即可使标题和底部居中。`center`仅影响标题和底部区域。Dialog 的内容是任意的，在一些情况下，内容并不适合居中布局。如果需要内容也水平居中，请自行为其添加 CSS。

```html
<el-button type="text" @click="centerDialogVisible = true">点击打开 Window</el-button>

<el-window
  title="提示"
  :visible.sync="centerDialogVisible"
  initWidth="30%"
  center>
  <span>需要注意的是内容是默认不居中的</span>
  <span slot="footer" class="window-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
  </span>
</el-window>

<script>
  export default {
    data() {
      return {
        centerDialogVisible: false
      };
    }
  };
</script>
```
:::

:::tip
Window 的内容是懒渲染的，即在第一次被打开之前，传入的默认 slot 不会被渲染到 DOM 上。因此，如果需要执行 DOM 操作，或通过 `ref` 获取相应组件，请在 `open` 事件回调中进行。
:::

:::tip
如果 `visible` 属性绑定的变量位于 Vuex 的 store 内，那么 `.sync` 不会正常工作。此时需要去除 `.sync` 修饰符，同时监听 Window 的 `open` 和 `close` 事件，在事件回调中执行 Vuex 中对应的 mutation 更新 `visible` 属性绑定的变量的值。
:::

### 开启拖拽

开启拖拽后，Window 可以通过鼠标进行拖拽。

:::demo 将`can-drag`设置为`true`即可开启拖拽。

```html
<el-button type="text" @click="centerDialogVisible = true">点击打开可拖拽Window</el-button>

<el-window
  title="提示"
  :visible.sync="centerDialogVisible"
  :can-drag="canDrag"
  initWidth="30%"
  center>
  <span>这个弹窗可以拖拽头部进行控制弹奏移动</span>
  <span slot="footer" class="window-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
  </span>
</el-window>

<script>
  export default {
    data() {
      return {
        centerDialogVisible: false,
        canDrag: true
      };
    }
  };
</script>
```
:::



### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| visible   | 是否显示 Dialog，支持 .sync 修饰符 | boolean | — | false |
| title     | Window 的标题，也可通过具名 slot （见下表）传入 | string    | — | — |
| initWidth     | Window 的宽度 | string    | — | 50% |
| initHeight     | Window 的高度 | string    | — | auto |
| fullscreen     | 是否为全屏 Window | boolean    | — | false |
| initY       | Window CSS 中的 margin-left 值 | string | — | 15vh |
| initX       | Window CSS 中的 margin-top 值 | string | — | auto |
| modal     | 是否需要遮罩层   | boolean   | — | false |
| modal-append-to-body     | 遮罩层是否插入至 body 元素上，若为 false，则遮罩层会插入至 Window 的父元素上   | boolean   | — | true |
| append-to-body     | Window 自身是否插入至 body 元素上。嵌套的 Window 必须指定该属性并赋值为 true   | boolean   | — | false |
| lock-scroll | 是否在 Window 出现时将 body 滚动锁定 | boolean | — | true |
| custom-class      | Window 的自定义类名 | string    | — | — |
| close-on-click-modal | 是否可以通过点击 modal 关闭 Window | boolean    | — | true |
| close-on-press-escape | 是否可以通过按下 ESC 关闭 Window | boolean    | — | true |
| show-close | 是否显示关闭按钮 | boolean    | — | true |
| show-fullScreen | 是否显示全屏按钮 | boolean    | — | true |
| can-drag | 是否可以进行拖拽 | boolean    | — | false |
| before-close | 关闭前的回调，会暂停 Window 的关闭 | function(done)，done 用于关闭 Window | — | — |
| center | 是否对头部和底部采用居中布局 | boolean | — | false |
| destroy-on-close | 关闭时销毁 Window 中的元素 | boolean | — | false |

### Slot
| name | 说明 |
|------|--------|
| — | Window 的内容 |
| title | Window 标题区的内容 |
| footer | Window 按钮操作区的内容 |

### Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| open  | Window 打开的回调 | — |
| opened  | Window 打开动画结束时的回调 | — |
| close  | Window 关闭的回调 | — |
| closed | Window 关闭动画结束时的回调 | — |
