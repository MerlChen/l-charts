<template>
  <div
    :id="domId"
    ref="pieRing"
  >
  </div>
</template>

<script>
export default {
  name: "PieRing",
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
      return "pie_ring_" + (Math.random() * 90000000000).toFixed(0);
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
      if (!this.isDone && this.store.showCharts(this.$refs.pieRing)) {
        this.isDone = true;
        this.initChartsInfo();
      }
    },
    /**
     * @description 图表初始化
     */
    initChartsInfo() {
      this.chartsInfo = window.$eCharts.init(document.getElementById(this.domId));
      this.dataFormat();
    },
    /**
     * @description 图表数据处理
     */
    dataFormat() {
      const obj = {
        name: this.store.getStackLabel,
        type: "pie",
        radius: ["50%", "75%"],
        avoidLabelOverlap: false,
        labelLine: { show: true },
        data: []
      };
      this.store.getXData.map(item => {
        this.$set(item, "name", item[this.store.getDataLabel]);
        this.$set(item, "value", item[this.store.getDataKey]);
        obj.data.push(item);
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
