# l-charts 组件介绍

> 本着精简调用方的设计模式，集成eCharts的第三方库，减调用方的API查阅数，进行eCharts的二次封装

## 如何使用`l-charts`
>* **第一步，安装依赖**
```
npm install l-charts --save
npm install echarts --save
npm install node-sass sass-loader --save-dev
```
>* **第二步：`main.js引入组件包`**
```javascript
// 此处省略其他包名
import lCharts from "l-charts/packages"
// 此处省略其他包名及设置
Vue.use(lCharts)
```
>*  **第三步，页面调用**
```vue
<l-charts
  charts-type="barX"
  :x-data="xData"
  :y-data="yData"
  :scroll-id="container"
  title="图表组件化"
  data-label="name"
  data-key="data"
  class="charts-container"
>
</l-charts>
```
>* **第四步，覆盖样式**
```css
/* 组件为可直接渲染，内置了默认宽度和高度，如果业务方需要进行样式覆盖，可在调用时，增加class */
.charts-container{
  width: 500px;
  height: 200px;
}
```
## API大纲
| 参数 | 说明| 类型 | 默认值 | 是否必填 | 详细注解 |
|:----|:----|:---- |:---- |:---- |:---- |
| **`title`** | 显示在图表上的标题文本|`String` | 无 | 否 | [title详细说明](#title——图表的名称) |
| **`xData`** | x轴的承载数据字段信息|`Array` | [] | 是 | [xData详细说明](#x-data——X轴数据承载字段) |
| **`yData`** | y轴的承载数据字段信息|`Array` | [] | 是 | [yData详细说明](#y-data——Y轴数据承载字段) |
| **`lineData`** | 折线的承载数据字段信息 **(柱状折线图时才使用)** |`Object` | {} | 否 | [lineData详细说明](#line-data——柱状折线图时才需要此字段) |
| **`dataLabel`** | 显示的文本字段名称 |`String` | 无 | 否 | [dataLabel详细说明](#data-label—文本字段名) |
| **`dataKey`** | 显示的数据字段名称 |`String` |  无 | 否 | [dataKey详细说明](#data-key—数据字段名) |
| **`colorList`** | 图表的颜色值数组 |`Array` |  en+默认色系 | 否 | [colorList详细说明](#color-list—图表的颜色组) |
| **`showLegend`** | 是否需要显示图表的图例 | `Boolean` | `true` | 否 | [showLegend详细说明](#show-legend—是否需要显示图表的图例) |
| **`chartsType`** | 图表的种类名称 | `String` | 无  | 是 | [chartsType详细说明](#charts-type—图表的类型) |
| **`stack`** | 堆叠图的堆叠文本 | `String` | 合计 | 否 | [stack详细说明](#stack—堆叠文本) | 
| **`gridList`** | 图表的左右边距 | `String` | `20px,20px` | 否 | [gridList详细说明](#grid-list-图表间距) |
| **`scrollId`** | 包裹所有图表的容器ID | `String` | 无 | 否 | [scrollId详细说明](#scroll-id—包裹所有图表的容器ID,必须是ID) |

 
## API详解
 
### `title`——图表的名称
> 图表显示在中间的名称
>   * **数据类型**：`String`
>   * **默认值**：``

### `x-data`——X轴数据承载字段
> x轴的数据承载字段
>   * **数据类型**：`Array`
>   * **默认值**：`[]`

### `y-data`——Y轴数据承载字段
> Y轴的数据承载字段
>   * **数据类型**：`Array`
>   * **默认值**：`[]`

### `line-data`——柱状折线图时才需要此字段
> 折线的数据承载字段
>   * **数据类型**：`Object`
>   * **默认值**：`{}`

### `data-label`—文本字段名
> 数据的文本字段名称，如果业务方字段不统一的话，需要业务方自己进行整合统一，组件不进行多次处理。
>   * **数据类型**：`String`
>   * **默认值**：``

### `data-key`—数据字段名
> 数据的字段名称，如果业务方字段不统一的话，需要业务方自己进行整合统一，组件不进行多次处理。
>   * **数据类型**：`String`
>   * **默认值**：``

### `color-list`—图表的颜色组
> 本字段拥有默认值，默认值是en+的色系，非特殊情况，不需要传递对颜色组进行覆盖
>   * **数据类型**：`Array`,
>   * **默认值**：`En+默认色系`

### `show-legend` — 是否需要显示图表的图例
> 一个图表可拥有多个图例，根据`xData`、`yData`、`lineData`的数据量，生成不同的图例，可根据图例进行操作，进行图表的不同呈现，更直观的进行数据对比和查阅。
>   * **数据类型**：`Boolean`、`String`
>   * **默认值**：`true`

### `charts-type` — 图表的类型
> **图表的数据种类，根据不同的值，进行不同的数据渲染**
> * **数据类型**：`String`
>
> 本组件囊括有十数种类型的图表，分别是：
>* **柱状图：**
>   * 纵向柱状图：`barX`
>   * 纵向堆叠柱状图：`barXStack`
>   * 纵向百分比柱状图：`barXPercent`、
>   * 纵向柱状折线图：`barXLine`、
>   * 横向柱状图：`barY`、
>   * 横向堆叠柱状图：`barYStack`、
>   * 横向百分比柱状图：`barYPercent`、
>   * 横向堆叠柱状图：`barYStack`、
>* **折线图：**
>   * 纵向折线图：`lineX`
>   * 纵向堆叠折线图:`lineXStack`
>   * 横向折线图：`lineY`
>   * 横向堆叠折线图：`lineYStack`
>* **饼图：**
>   * 单饼图：`pie`
>   * 圆环图: `pieRing`
>   * 玫瑰图：`pieRose`

### `stack` — 堆叠文本
> **堆叠图或饼图时，可用到此字段，申明堆叠的文本**
>   * **数据类型**：`String`
>   * **默认值**：`合计`

### `tips-type` — 鼠标指示器类型
> **鼠标指示器的类型**
>   * **数据类型**：`String`
>   * **默认值**：`shadow`
>
> 目前提供有四种指示器类型，分别是：
>* 阴影指示器：`shadow`
>   * 默认此指示器，一般在柱状图、饼图中，都是使用此指示器，具体根据自己的业务来定
>* 十字指示器：`cross`
>   * 一般在折线图中，用此指示器比较多
>* 无指示器：`none`
>   * 同文字意思，一般不采用这个，特殊业务场景使用
>* 直线指示器：`line` 
>   * 一般在地图中用此指示器，别的业务场景几乎不用。

### `grid-list` - 图表间距
> **图表左右侧间距，如若部分图表需要调整时，可传递左右像素组，但一般不需要进行调整。**
>  * **数据类型**：`String`,
>  * **默认值**：`"20px","20px"`
>  * **示例**：`grid-list="20px,20px"`
>  * **注意事项**：如果只传递了一个值，那么默认是改左侧的数据，右侧边距依旧默认为`20px`

### `scroll-id` — 包裹所有图表的容器ID,必须是ID
> **为节约渲染时间，加快渲染速度，图表需要异步绘制，此时需要传递包裹图表的区域所在的ID进行对应的坐标来判断是否需要实时绘制图表**
>  * **数据类型**：`String`
>  * **默认值**：`null`
>  * **是否必填**：`false` 
>  * **示例**：`scroll-id="chartsId"`
>  * **注意事项**： 如果不传入最外层（即可滚动的区域）的ID名称的话，区域内的所有图表都会直接绘制，不做坐标判断是否绘制

### 作者信息
>* Autor：`Dansemacabre（Louis）`
>* Date：`2020/04/16`
>* Email：`huangxin1273@vip.qq.com`
>* gitHub：`https://github.com/MerlChen`
