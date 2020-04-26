<template>
  <div
    :id="domId"
    class="bar-stack"
    ref="barYStack"
  >
  </div>
</template>

<script>
export default {
  name: "BarYStack",
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
      charts: {},
      seriesData: [],
      isDone: false
    };
  },
  computed: {
    domId() {
      return "bar_y_stack_" + (Math.random() * 90000000000).toFixed(0);
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
      if (!this.isDone && this.store.showCharts(this.$refs.barYStack)) {
        this.isDone = true;
        this.initChartsInfo();
      }
    },
    /**
     * @description 初始化图表信息
     */
    initChartsInfo() {
      this.charts = window.$eCharts.init(document.getElementById(this.domId));
      this.dataFormat();
      this.initChartsDataInfo();
    },
    /**
     * @description 图表数据整理
     */
    dataFormat() {
      this.store.getXData.map(item => {
        this.seriesData.push({
          name: item.name,
          type: "bar",
          stack: this.store.getStackLabel,
          barMaxWidth: "20px",
          itemStyle: this.store.getYBarStyle,
          data: this.store.getDataKey ? item[this.store.getDataKey] : item
        });
      });
    },
    /**
     * @description 初始化图表及图表数据信息
     */
    initChartsDataInfo() {
      const _this = this;
      _this.charts.setOption({
        tooltip: _this.store.getToolTip,
        title: _this.store.getTitleInfo,
        legend: _this.store.getLegendConfig,
        grid: _this.store.getGridConfig,
        color: _this.store.getColorList,
        yAxis: _this.store.getAxisConfig,
        xAxis: _this.store.getAxisValue,
        series: _this.seriesData
      }, true);
    }
  }
};
</script>

<style lang="scss">

</style>
