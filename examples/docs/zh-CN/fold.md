## Fold 侧边折叠面板

侧边折叠面板

### 基础用法

:::demo

```html
<div style="display: flex;">
  <el-fold :time="400" :width="'300px'">
    <div style="width: 300px; height: 200px;background: red;"></div>
  </el-fold>
  <div style="flex: 1;background: pink;"></div>
</div>
```

:::

### 右侧

通过设置 `position` 属性为 `right` 可将面板显示在右侧。
设置好节点位置顺序后，折叠面板会自动显示在右侧。

:::demo

```html
<div style="display: flex;">
  <div style="flex: 1;background: pink;"></div>
  <el-fold :time="400" :width="'300px'" :position="'right'">
    <div style="width: 300px; height: 200px;background: red;"></div>
    <template #fold-icon="{ isFold }">
      <img
        v-if="!isFold"
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAABICAYAAAApi6+eAAAABHNCSVQICAgIfAhkiAAAArZJREFUWEftWEtrE1EU/iYzMRNXKnVpE6hGC0WjIjVdWNQWLQiCT3yhpboT1/4F3fgW3BQtCHHtzo3d6CY+UBpBJTFpqklKElvMs3l55s5MOtOmyUzBMEIDl8tMOHPOd757z/nu5XYO3fjIcTUvDPw4QQwJvPgklZ15EJl8WuR2DV+vV+pd4O1O2ASRZhrKzJ5p2OidIDhRqxZR+hNBPhMM/c4n+2RjbCZDBwTpA7wD/DppJgP2QXrWzSJysx+QzXy5qfFMHphHp94zeZUjWHxfLecw+80fbu5ZgSB55tSIGhFIEYmIBW7DFGYJO8sBjZl3qrFJzFJEscAtxTMo24RJTY4u2ywHDvpPnwuN5y4WSrNsWxkzW2HGeW6d7dXy7Ontgc1mRzQ2p6wsES7XRvYunuZb87xtBxnzdkSic4217XZtAmcTmLHKisV47jDmNZ6X1LC1/azu+5Wr52r3c6te1dm6fWhgO8I/s0hkajr+29btK6d86PduQWAqiRevoo023LZXjZ49gP273cgXK3js/4QkeTaEeez8EHx7e5AvVPDweYBCrmj6tNxZFmuYZj9fuziCgX0eMizj3sQbJNILy/pz07p96cwRDA96meGd8ddIpErG+/OJY4M4PtJPxgu4Oz6JX6miTpO0xXz1wtFG2Pcn3iJO3pdqkpb9eezcYTlhxTIl7L2C20R/Hj1NVO1xo0BUPfJ/ZhlX5VZbnqU1fvmkvEimvqfx7GXYGM9aHXbQ50Hwxzzmc9B4XoFnIzrs3/Rn6+xnOQeW12HmNYlmP3t6t+rVEK00V7eihlKkhhS9ZrG6bR6zRm8vx+yEu3sDiThSgM0xW0Fvm8f8//Ns5Cy5dq7qpN6uV3JIflUP3wbvDNT+nNUd+w2en+vVEkrZaRTSwVAmH+/jzF91rKerjml21fEXdyuKObAn3HkAAAAASUVORK5CYII="
      />
      <img
        v-else
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAABICAYAAAApi6+eAAAABHNCSVQICAgIfAhkiAAAAq5JREFUWEdj1HPJO8/I+M+AgQjAyMJxl4WZY+abL08mPziw4AejvmvO/z//RRiYWTkZmFg4gDQQQ2kwH4iZgGIsLJwM//7+YPj5+QHDt3dX777/9lIHoplBFKiRnYEFZAAzOwMzG4gGagAbCOSj0BwMX1+dY/jy7loFks1AG8A2cqLaDLQV4gKE+N/fXxle3VpxD7vNUC+AbGaEuQjuApCLOBgen+5iIMnPIL+DwwCIn5yBaSbRzyAXPT7dCbWZARjaQD/BAgcltMFhwA6UQw0LJJtFwE7BFtqD2c/gFEZ8POMPbXLjWU1TmYGJiZXh4eMP0JTFwSAvLwgWe/6WGX88q2oANTOzMjx4+AGethXkhRgYmVjAmmGxMsjimc5+Ho1ntDJsND/D8j3u0pPc/IyvrqJtuW1iqAkuDC7feo1UdxFZbs+bkAeuqRetO8Vw+vJL0uoqWys9hqRwB7ABizeeZzhzBegCaP1MlJ9tLHUYEkKswQYs3XyF4ez190j1NKRmQZRhWPKztZkGQ1yQGdiA5dtvAg34hJLmCcaztakaQ4w/pLkyffV1hgcv/kBLTyLqZ0sTVYZYf0Ow5hmrbzDcf/GbuPrZ2hTZ2beAzv4Ab/TgrZ9tzLUZEkKhAbblKsPZa2+Jq59tLIBRFQGJqiUbLzCcuvIKrVWEp00ytSODgYuTDZxITl1+gdIOIxjPxvrqDD/+MDDcefgRZzuMYDwj6mvMdhht6ueBy8+Ybc8hUW6T3iZBys9qmiqorSFgKSIvB20NvQG2hqDtNYL5mb7tbdL9jNTexvQzJ4OCnACwEQdsAWL382Bob5Pu56Efz8T0JUf7VfRsb///85Xh5U1Y55vIMQNYXfUFpdtPZP/5/9+fDD+/PGL4/vbq3Xffnuswkj7UwQUc6ngEHuoAAHO8bzn8TMi4AAAAAElFTkSuQmCC"
      />
    </template>
  </el-fold>
</div>
```

:::

### 自定义图片

通过设置 `#fold-icon="{ isFold }"` 插槽设置折叠和展开图标。当前固定图片宽度为 15px,如果图片旋转角度有问题可以自己添加样式控制。

:::demo

```html
<div style="display: flex;">
  <div style="flex: 1;background: pink;"></div>
  <el-fold :time="400" :width="'300px'" :position="'right'">
    <div style="width: 300px; height: 200px;background: red;"></div>
    <template #fold-icon="{ isFold }">
      <img
        v-if="!isFold"
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAABICAYAAAApi6+eAAAABHNCSVQICAgIfAhkiAAAArZJREFUWEftWEtrE1EU/iYzMRNXKnVpE6hGC0WjIjVdWNQWLQiCT3yhpboT1/4F3fgW3BQtCHHtzo3d6CY+UBpBJTFpqklKElvMs3l55s5MOtOmyUzBMEIDl8tMOHPOd757z/nu5XYO3fjIcTUvDPw4QQwJvPgklZ15EJl8WuR2DV+vV+pd4O1O2ASRZhrKzJ5p2OidIDhRqxZR+hNBPhMM/c4n+2RjbCZDBwTpA7wD/DppJgP2QXrWzSJysx+QzXy5qfFMHphHp94zeZUjWHxfLecw+80fbu5ZgSB55tSIGhFIEYmIBW7DFGYJO8sBjZl3qrFJzFJEscAtxTMo24RJTY4u2ywHDvpPnwuN5y4WSrNsWxkzW2HGeW6d7dXy7Ontgc1mRzQ2p6wsES7XRvYunuZb87xtBxnzdkSic4217XZtAmcTmLHKisV47jDmNZ6X1LC1/azu+5Wr52r3c6te1dm6fWhgO8I/s0hkajr+29btK6d86PduQWAqiRevoo023LZXjZ49gP273cgXK3js/4QkeTaEeez8EHx7e5AvVPDweYBCrmj6tNxZFmuYZj9fuziCgX0eMizj3sQbJNILy/pz07p96cwRDA96meGd8ddIpErG+/OJY4M4PtJPxgu4Oz6JX6miTpO0xXz1wtFG2Pcn3iJO3pdqkpb9eezcYTlhxTIl7L2C20R/Hj1NVO1xo0BUPfJ/ZhlX5VZbnqU1fvmkvEimvqfx7GXYGM9aHXbQ50Hwxzzmc9B4XoFnIzrs3/Rn6+xnOQeW12HmNYlmP3t6t+rVEK00V7eihlKkhhS9ZrG6bR6zRm8vx+yEu3sDiThSgM0xW0Fvm8f8//Ns5Cy5dq7qpN6uV3JIflUP3wbvDNT+nNUd+w2en+vVEkrZaRTSwVAmH+/jzF91rKerjml21fEXdyuKObAn3HkAAAAASUVORK5CYII="
      />
      <img
        v-else
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAABICAYAAAApi6+eAAAABHNCSVQICAgIfAhkiAAAAq5JREFUWEdj1HPJO8/I+M+AgQjAyMJxl4WZY+abL08mPziw4AejvmvO/z//RRiYWTkZmFg4gDQQQ2kwH4iZgGIsLJwM//7+YPj5+QHDt3dX777/9lIHoplBFKiRnYEFZAAzOwMzG4gGagAbCOSj0BwMX1+dY/jy7loFks1AG8A2cqLaDLQV4gKE+N/fXxle3VpxD7vNUC+AbGaEuQjuApCLOBgen+5iIMnPIL+DwwCIn5yBaSbRzyAXPT7dCbWZARjaQD/BAgcltMFhwA6UQw0LJJtFwE7BFtqD2c/gFEZ8POMPbXLjWU1TmYGJiZXh4eMP0JTFwSAvLwgWe/6WGX88q2oANTOzMjx4+AGethXkhRgYmVjAmmGxMsjimc5+Ho1ntDJsND/D8j3u0pPc/IyvrqJtuW1iqAkuDC7feo1UdxFZbs+bkAeuqRetO8Vw+vJL0uoqWys9hqRwB7ABizeeZzhzBegCaP1MlJ9tLHUYEkKswQYs3XyF4ez190j1NKRmQZRhWPKztZkGQ1yQGdiA5dtvAg34hJLmCcaztakaQ4w/pLkyffV1hgcv/kBLTyLqZ0sTVYZYf0Ow5hmrbzDcf/GbuPrZ2hTZ2beAzv4Ab/TgrZ9tzLUZEkKhAbblKsPZa2+Jq59tLIBRFQGJqiUbLzCcuvIKrVWEp00ytSODgYuTDZxITl1+gdIOIxjPxvrqDD/+MDDcefgRZzuMYDwj6mvMdhht6ueBy8+Ybc8hUW6T3iZBys9qmiqorSFgKSIvB20NvQG2hqDtNYL5mb7tbdL9jNTexvQzJ4OCnACwEQdsAWL382Bob5Pu56Efz8T0JUf7VfRsb///85Xh5U1Y55vIMQNYXfUFpdtPZP/5/9+fDD+/PGL4/vbq3Xffnuswkj7UwQUc6ngEHuoAAHO8bzn8TMi4AAAAAElFTkSuQmCC"
      />
    </template>
  </el-fold>
</div>
```

:::

### 左侧和右侧都要折叠

通过 flex 布局，左右节点顺序改变，折叠面板会自动显示在左侧或右侧。

:::demo

```html
<div style="display: flex;">
  <el-fold :time="400" :width="'100px'">
    <div style="width: 100%; height: 200px;background: red;"></div>
  </el-fold>
  <div style="flex: 1;background: pink;"></div>
  <el-fold :time="400" :width="'100px'" :position="'right'">
    <div style="width: 100%; height: 200px;background: yellow;"></div>
  </el-fold>
</div>
```

:::

### Empty Attributes

| 参数     | 说明                          | 类型   | 可选值     | 默认值 |
| -------- | ----------------------------- | ------ | ---------- | ------ |
| time     | 伸缩时间，单位 ms，应大于 200 | number | —          | 400    |
| width    | 折叠面板（宽度）              | string | —          | 100%   |
| position | 折叠方向                      | string | left/right | left   |

### Empty Slots

| Name        | 说明           |
| ----------- | -------------- |
| fold-icon     | 自定义图片 |

