<!--
 * @Descripttion: file content
 * @Author: 陈泽铠
 * @version: 
 * @Date: 2025-04-20 18:45:49
 * @LastEditors: 陈泽铠
 * @LastEditTime: 2025-05-22 06:37:04
-->
## Icon 图标

提供了一套常用的图标集合。

### 使用方法

直接通过设置类名为 `el-icon-iconName` 来使用即可。例如：

:::demo
```html
<i class="el-icon-edit"></i>
<i class="el-icon-share"></i>
<i class="el-icon-delete"></i>
<i class="el-icon-word" style="color:#2a5699"></i>
<i class="el-icon-excel" style="color:#107b0f"></i>
<i class="el-icon-ppt" style="color:#d24625"></i>
<i class="el-icon-pdf" style="color:#a33639"></i>
<i class="el-icon-jpg" style="color:#ffa70b"></i>
<i class="el-icon-png" style="color:#0075d5"></i>
<el-button type="primary" icon="el-icon-search">搜索</el-button>

```
:::

### 图标集合

<ul class="icon-list">
  <li v-for="(name, index) in $icon" :key="name">
    <div class="badge" v-if="index > 190"></div>
    <span>
      <i :class="'el-icon-' + name"></i>
      <span class="icon-name">{{'el-icon-' + name}}</span>
    </span>
  </li>
</ul>
