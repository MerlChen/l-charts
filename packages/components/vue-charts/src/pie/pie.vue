<template>
  <div
    :id="domId"
    ref="pie"
  >
  </div>
</template>

<script>
export default {
  name: "Pie",
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
      return "pie_" + (Math.random() * 90000000000).toFixed(0);
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
      if (!this.isDone && this.store.showCharts(this.$refs.pie)) {
        this.isDone = true;
        this.initChartsInfo();
      }
    },
    /**
     * @description 初始化图表DOM信息
     */
    initChartsInfo() {
      this.chartsInfo = this.$eCharts.init(document.getElementById(this.domId));
      this.dataFormat();
    },
    /**
     * @description 图表数据处理
     */
    dataFormat() {
      const obj = {
        name: this.store.getStackLabel,
        type: "pie",
        radius: "80%",
        center: ["50%", "50%"],
        data: [],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)"
          }
        }
      };
      this.store.getXData.map(item => {
        const cItem = Object.assign({}, item);
        this.$set(cItem, "name", item[this.store.getDataLabel])
        this.$set(cItem, "value", item[this.store.getDataKey])
        obj.data.push(cItem);
      });
      this.seriesData.push(obj);
      this.initChartsDataInfo();
    },
    /**
     * @description 执行图表生成
     */
    initChartsDataInfo() {
      const _this = this;
      _this.chartsInfo.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        title: _this.store.getTitleInfo,
        legend: _this.store.getPieLegendDataInfo,
        color: _this.store.getColorList,
        series: _this.seriesData
      }, true);
    }
  }
};
</script>

<style lang="scss">

</style>
