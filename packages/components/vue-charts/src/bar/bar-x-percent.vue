<template>
  <div :id="domId" class="bar-percent" ref="barXPercent">
  </div>
</template>

<script>
export default {
  name: "BarXPercent",
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
      return "bar_x_percent_" + (Math.random() * 90000000000).toFixed(0);
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
      if (!this.isDone && this.store.showCharts(this.$refs.barXPercent)) {
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
     * @description 百分比图需要对数据进行处理
     */
    dataFormat() {
      const flag = this.store.getYDataType === "object";
      const _this = this;
      if (flag) {
        const sumList = [];
        this.store.getXData.map((item, index) => {
          let sum = 0;
          this.store.getYData.map(cItem => {
            sum += parseFloat(cItem[_this.store.getDataKey][index]);
          });
          sumList.push(sum);
        });
        this.store.getYData.map(cItem => {
          const arr = [];
          sumList.map((item, index) => {
            arr.push((cItem[_this.store.getDataKey][index] / item * 100).toFixed(2));
          });
          this.$set(cItem, "result", arr);
        });
        this.store.getYData.map(item => {
          const obj = {
            name: _this.store.getDataLabel ? item[_this.store.getDataLabel] : item,
            type: "bar",
            data: item.result,
            barMaxWidth: "20px",
            itemStyle: _this.store.getXBarStyle
          };
          this.seriesData.push(obj);
        });
      }
    },
    /**
     * @description 初始化图表及图表数据信息
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
        xAxis: _this.store.getAxisConfig,
        legend: _this.store.getLegendConfig,
        yAxis: _this.store.getPercentAxis,
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
