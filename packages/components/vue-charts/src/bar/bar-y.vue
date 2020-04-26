<template>
  <div
    :id="domId"
    ref="barY"
  >
  </div>
</template>

<script>
export default {
  name: "BarY",
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
      return "bar_y_" + (Math.random() * 90000000000).toFixed(0);
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
      if (!this.isDone && this.store.showCharts(this.$refs.barY)) {
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
      const flag = this.store.getXDataType === "object";
      // 判断是单结构数据还是多结构数据，如果是多结构数据的话，需要整理成多数据
      if (flag) {
        this.store.getXData.map(item => {
          this.seriesData.push({
            name: this.store.getDataLabel ? item[this.store.getDataLabel] : item,
            type: "bar",
            data: this.store.getDataKey ? item[this.store.getDataKey] : item,
            barMaxWidth: "20px",
            itemStyle: this.store.getYBarStyle
          });
        });
      } else {
        this.seriesData = [
          {
            type: "bar",
            data: this.store.getXData,
            barMaxWidth: "20px",
            itemStyle: this.store.getYBarStyle
          }
        ];
      }
    },
    /**
     * @description 初始化图表及图表数据信息
     */
    initChartsDataInfo() {
      const _this = this;
      _this.chartsInfo.setOption({
        title: _this.store.getTitleInfo,
        tooltip: _this.store.getToolTip,
        legend: _this.store.getLegendConfig,
        yAxis: _this.store.getAxisConfig,
        xAxis: _this.store.getAxisValue,
        grid: _this.store.getGridConfig,
        color: _this.store.getColorList,
        series: _this.seriesData,
        animationEasing: "elasticOut",
        animationDelayUpdate: function(idx) {
          return idx * 5;
        }
      });
    }
  }
};
</script>

<style lang="scss">

</style>
