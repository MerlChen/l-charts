<template>
  <div
    :id="domId"
    ref="lineYStack"
  >
  </div>
</template>

<script>
export default {
  name: "LineYStack",
  props: {
    store: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      chartsInfo: {},
      seriesData: [],
      isDone: false
    };
  },
  computed: {
    domId() {
      return "line_y_stack_" + (Math.random() * 90000000000).toFixed(0);
    }
  },
  created() {
    this.$nextTick(() => {
      this.checkApply();
      window.addEventListener("scroll", this.checkApply, true);
      window.addEventListener("resize", () => {
        if (this.isDone) {
          this.chartsInfo.resize();
        }
      });
    });
  },
  methods: {
    /**
     * @description 检测图表是否需要生成
     */
    checkApply() {
      if (!this.isDone && this.store.showCharts(this.$refs.lineYStack)) {
        this.isDone = true;
        this.initChartsInfo();
      }
    },
    /**
     * @description 初始化图表DOM信息
     */
    initChartsInfo() {
      this.chartsInfo = window.$eCharts.init(document.getElementById(this.domId));
      this.dataFormat();
      this.initChartsDataInfo();
    },
    /**
     * @description 图表数据处理
     */
    dataFormat() {
      const flag = this.store.getXDataType === "object";
      if (flag) {
        this.store.getXData.map(item => {
          this.seriesData.push({
            name: item[this.store.getDataLabel],
            type: "line",
            areaStyle: {},
            stack: this.store.getStackLabel,
            data: item[this.store.getDataKey]
          });
        });
      }
    },
    /**
     * @description 初始化图表的数据信息
     */
    initChartsDataInfo() {
      const _this = this;
      _this.chartsInfo.setOption({
        title: _this.store.getTitleInfo,
        tooltip: _this.store.getToolTip,
        legend: _this.store.getLegendConfig,
        grid: _this.store.getGridConfig,
        color: _this.store.getColorList,
        yAxis: _this.store.getAxisBoundaryGap,
        xAxis: _this.store.getAxisValue,
        series: _this.seriesData,
        animationEasing: "elasticOut",
        animationDelayUpdate: function(idx) {
          return idx * 5;
        }
      }, true);
    }
  }
};
</script>

<style lang="scss">

</style>
