<template>
  <div
    :id="domId"
    ref="barXLine"
  >
  </div>
</template>

<script>
export default {
  name: "BarXLine",
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
      return "bar_x_line" + (Math.random() * 90000000000).toFixed(0);
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
      if (!this.isDone && this.store.showCharts(this.$refs.barXLine)) {
        this.isDone = true;
        this.initChartsInfo();
      }
    },
    /**
     * @description 初始化图表
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
      const flag = this.store.getYDataType === "object";
      if (flag) {
        this.store.getYData.map(item => {
          this.seriesData.push({
            name: item[this.store.getDataLabel],
            type: "bar",
            data: item[this.store.getDataKey],
            barMaxWidth: "20px",
            itemStyle: this.store.getXBarStyle
          });
        });
        this.seriesData.push(this.store.getXLineData);
      }
    },
    /**
     * @description 生成图表
     */
    initChartsDataInfo() {
      const _this = this;
      _this.chartsInfo.setOption({
        tooltip: _this.store.getToolTip,
        title: _this.store.getTitleInfo,
        legend: _this.store.getLineLegend,
        xAxis: _this.store.getAxisConfig,
        yAxis: _this.store.getLineAxisValue,
        grid: _this.store.getGridConfig,
        color: _this.store.getColorList,
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
