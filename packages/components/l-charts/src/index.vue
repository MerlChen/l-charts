<template>
  <component
    :is="type"
    class="l-charts"
    :store="store"
  >
  </component>
</template>
<script>
import eCharts from "echarts"
import Store from "./model";
import barX from "./bar/bar-x";
import barY from "./bar/bar-y";
import barXLine from "./bar/bar-x-line";
import barXStack from "./bar/bar-x-stack";
import barXPercent from "./bar/bar-x-percent";
import barYLine from "./bar/bar-y-line";
import barYPercent from "./bar/bar-y-percent";
import barYStack from "./bar/bar-y-stack";
import lineX from "./line/line-x";
import lineXStack from "./line/line-x-stack";
import lineY from "./line/line-y";
import lineYStack from "./line/line-y-stack";
import pie from "./pie/pie";
import pieRing from "./pie/pie-ring";
import pieRose from "./pie/pie-rose";

export default {
  name: "LCharts",
  components: {
    barX,
    barY,
    barXLine,
    barXStack,
    barXPercent,
    barYLine,
    barYPercent,
    barYStack,
    lineX,
    lineXStack,
    lineY,
    lineYStack,
    pie,
    pieRing,
    pieRose
  },
  props: {
    // 标题
    title: {
      type: String,
      default: ""
    },
    // x轴数据源
    xData: {
      type: Array,
      default: () => {
        return [];
      }
    },
    // y轴数据源
    yData: {
      type: Array,
      default: () => {
        return [];
      }
    },
    // 柱状折线图数据承载字段
    lineData: {
      type: Object,
      default: () => {
        return {};
      }
    },
    // 图表的类型
    chartsType: {
      type: String,
      default: ""
    },
    // 文本的字段名称
    dataLabel: {
      type: String,
      default: ""
    },
    // 数值的字段名称
    dataKey: {
      type: String,
      default: ""
    },
    // 图表颜色组
    colorList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    // 是否需要显示图例
    showLegend: {
      type: [Boolean, String],
      default: true,
      validator: function(value) {
        return value && value !== "false";
      }
    },
    // 指示器类型
    tipsType: {
      type: String,
      default: "shadow"
    },
    // 堆叠文本
    stack: {
      type: String,
      default: "堆叠图"
    },
    // 第一坐标系文本
    leftLabel: {
      type: String,
      default: ""
    },
    // 第二坐标系文本
    rightLabel: {
      type: String,
      default: ""
    },
    // 图标边距
    gridList: {
      type: String,
      default: ""
    },
    // 视图区域的类名
    scrollId: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      store: {},
      type: null
    };
  },
  mounted() {
    this.initGlobalCharts();
    this.$nextTick(() => {
      this.initStoreInfo();
    });
  },
  methods: {
    /**
     * @description 给window增加全局变量
     */
    initGlobalCharts() {
      if (!eCharts) {
        console.error("请先安装eCharts依赖")
        return
      }
      window.$eCharts = eCharts;
    },
    /**
     * @description 初始化Store信息
     */
    initStoreInfo() {
      this.store = new Store();
      this.initChartsConfigInfo(this.chartsType);
      this.checkChartsType();
    },
    /**
     * @description 初始化图表的部分配置信息
     */
    initChartsConfigInfo(chartsType) {
      this.store.setDataLabel(this.dataLabel);
      this.store.setDataKey(this.dataKey);
      this.store.setLegendStatus(this.showLegend);
      this.store.setStackLabel(this.stack);
      this.store.setColorList(this.colorList);
      this.store.setAxisLabel(this.leftLabel, this.rightLabel);
      this.store.setXData(this.xData);
      this.store.setYData(this.yData);
      this.store.setLineData(this.lineData);
      this.store.setTitleInfo(this.title);
      this.store.initChartsConfig(chartsType);
      this.store.setToolTip(this.tipsType);
      if (this.scrollId && this.scrollId !== "") {
        this.store.setScrollId(this.scrollId);
      }
      if (this.gridList !== "") {
        this.store.setGridConfig(this.gridList);
      }
    },
    /**
     * @description 检查传递的图表类型是否支持显示
     */
    checkChartsType() {
      const chartsArr = [
        "barX",
        "barY",
        "barXLine",
        "barXStack",
        "barXPercent",
        "barYLine",
        "barYPercent",
        "barYStack",
        "lineX",
        "lineXStack",
        "lineY",
        "lineYStack",
        "pie",
        "pieRing",
        "pieRose"
      ];
      let flag = false;
      let str = "";
      chartsArr.forEach(item => {
        str = str + item + "、";
        if (this.chartsType === item) {
          flag = true;
        }
      });
      if (!flag) {
        console.error("%c 目前不支持此图表类型:" + this.chartsType,
          "color:#ff0000;font-size:24px;"
        );
        console.log("%c 来自Louis的贴心提示，仅支持：" + str + "等类型",
          "color:#3398DB;font-size: 20px;");
        console.log("%c *****************Split Line*****************************",
          "color:#ff0000;font-size:12px;");
      } else {
        this.type = this.chartsType;
      }
    }
  }
};
</script>

<style lang="scss">
  .l-charts {
    width: 600px;
    height: 400px;
  }
</style>
