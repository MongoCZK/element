## Icon

Element provides a set of common icons.

### Basic usage

Just assign the class name to `el-icon-iconName`.

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
<el-button type="primary" icon="el-icon-search">Search</el-button>

```
:::

### Icons

<ul class="icon-list">
  <li v-for="(name, index) in $icon" :key="name">
    <div class="badge" v-if="index > 190"></div>
    <span>
      <i :class="'el-icon-' + name"></i>
      <span class="icon-name">{{'el-icon-' + name}}</span>
    </span>
  </li>
</ul>

