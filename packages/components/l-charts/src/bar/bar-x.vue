<template>
  <div
    :id="domId"
    ref="barX"
  >
  </div>
</template>

<script>
export default {
  name: "BarX",
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
      return "bar_x_" + (Math.random() * 90000000000).toFixed(0);
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
      if (!this.isDone && this.store.showCharts(this.$refs.barX)) {
        this.isDone = true;
        this.initChartsInfo();
      }
    },
    /**
     * @description 初始化图表信息
     */
    initChartsInfo() {
      this.chartsInfo = window.$eCharts.init(document.getElementById(this.domId));
      this.dataFormat();
    },
    /**
     * @description 数据加工处理=>动态判断是否为多结构数据
     */
    dataFormat() {
      let flag = false;
      flag = this.store.getYDataType === "object";
      if (flag) {
        this.store.getYData.map(item => {
          this.seriesData.push({
            name: this.store.getDataLabel && item[this.store.getDataLabel] ? item[this.store.getDataLabel] : item,
            type: "bar",
            data: this.store.getDataKey && item[this.store.getDataKey] ? item[this.store.getDataKey] : item,
            barMaxWidth: "20px",
            itemStyle: this.store.getXBarStyle
          });
        });
      }
      this.initChartsDataInfo();
    },
    /**
     * @description 初始化图表数据信息
     */
    initChartsDataInfo() {
      const _this = this;
      _this.chartsInfo.setOption({
        tooltip: _this.store.getToolTip,
        title: _this.store.getTitleInfo,
        xAxis: _this.store.getAxisConfig,
        legend: _this.store.getLegendConfig,
        yAxis: _this.store.getAxisValue,
        grid: _this.store.getGridConfig,
        color: _this.store.getColorList,
        series: _this.seriesData,
        animationEasing: "elasticOut",
        animationDelayUpdate: function(idx) {
          return idx * 5;
        }
      }, true);
      // 点击事件处理
      _this.chartsInfo.on("click", (params) => {
        console.log(_this.store.getXData[params.componentIndex], _this.store.getYData[params.dataIndex]);
      });
    }
  }
};
</script>

<style lang="scss">
</style>
