<template>
  <div
    :id="domId"
    class="bar-stack"
    ref="barXStack"
  >
  </div>
</template>

<script>
export default {
  name: "BarXStack",
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
      return "bar_x_stack_" + (Math.random() * 90000000000).toFixed(0);
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
      if (!this.isDone && this.store.showCharts(this.$refs.barXStack)) {
        this.isDone = true;
        this.initChartsInfo();
      }
    },
    /**
     * @description 初始化图表信息
     */
    initChartsInfo() {
      this.chartsInfo = this.$eCharts.init(document.getElementById(this.domId));
      this.dataFormat();
      this.initChartsDataInfo();
    },
    /**
     * @description 数据整理
     */
    dataFormat() {
      this.store.getYData.map(item => {
        this.seriesData.push({
          name: item.name,
          type: "bar",
          stack: this.store.getStackLabel,
          barMaxWidth: "20px",
          itemStyle: this.store.getXBarStyle,
          data: this.store.getDataKey ? item[this.store.getDataKey] : item
        });
      });
    },
    /**
     * @description 初始化图表及图表数据信息
     */
    initChartsDataInfo() {
      const _this = this;
      _this.chartsInfo.setOption({
        tooltip: _this.store.getToolTip,
        title: _this.store.getTitleInfo,
        legend: _this.store.getLegendConfig,
        grid: _this.store.getGridConfig,
        color: _this.store.getColorList,
        xAxis: _this.store.getAxisConfig,
        yAxis: _this.store.getAxisValue,
        series: _this.seriesData
      }, true);
    }
  }
};
</script>

<style lang="scss">

</style>
