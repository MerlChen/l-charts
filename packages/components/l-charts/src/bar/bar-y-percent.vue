<template>
  <div
    :id="domId"
    ref="barYPercent"
  >
  </div>
</template>

<script>
export default {
  name: "BarYPercent",
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
      return "bar_y_percent_" + (Math.random() * 90000000000).toFixed(0);
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
      if (!this.isDone && this.store.showCharts(this.$refs.barYPecent)) {
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
    },
    /**
     * @description 图表数据整理
     */
    dataFormat() {
      const _this = this;
      const sumList = [];
      this.store.getYData.map((item, index) => {
        let sum = 0;
        this.store.getXData.map(cItem => {
          sum += parseFloat(cItem[_this.store.getDataKey][index]);
        });
        sumList.push(sum);
      });
      this.store.getXData.map(cItem => {
        const arr = [];
        sumList.map((item, index) => {
          arr.push((cItem[_this.store.getDataKey][index] / item * 100).toFixed(2));
        });
        this.$set(cItem, "result", arr);
      });
      this.store.getXData.map(item => {
        const obj = {
          name: _this.store.getDataLabel ? item[_this.store.getDataLabel] : item,
          type: "bar",
          data: item.result,
          barMaxWidth: "20px",
          itemStyle: _this.store.getYBarStyle
        };
        this.seriesData.push(obj);
      });
      this.initChartsDataInfo();
    },
    /**
     * @description 图表绘制及数据渲染
     */
    initChartsDataInfo() {
      const _this = this;
      const tooltip = _this.store.getToolTip;
      tooltip.formatter = (val) => {
        let tips =
          "<div class=\"title\">" + val[0].axisValueLabel + "</div>";
        val.map(item => {
          tips += "<div class='tips-item'>" +
            item.marker + item.seriesName + ":" + item.data + "%" +
            "</div>";
        });
        return tips;
      };
      _this.chartsInfo.setOption({
        tooltip: tooltip,
        title: _this.store.getTitleInfo,
        yAxis: _this.store.getAxisConfig,
        legend: _this.store.getLegendConfig,
        xAxis: _this.store.getPercentAxis,
        color: _this.store.getColorList,
        grid: _this.store.getGridConfig,
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
