<template>
  <div id="app">
    <l-charts
      charts-type="barX"
      :x-data="chartsData.xData"
      :y-data="chartsData.yData"
      title="图表组件调用测试"
      data-label="name"
      data-key="data"
      scroll-id="app"
      class="charts-item"
    >
    </l-charts>
  </div>
</template>

<script>

export default {
  name: "App",
  data() {
    return {
      chartsData: {
        title: "",
        yData: [
          {
            name: "张三",
            data: [
              135,
              122,
              97,
              75,
              106,
              83,
              91
            ]
          },
          {
            name: "李四",
            data: [
              111,
              92,
              87,
              79,
              136,
              63,
              71
            ]
          },
          {
            name: "王五",
            data: [
              141,
              132,
              97,
              99,
              146,
              93,
              91
            ]
          }
        ],
        xData: [
          "语文",
          "数学",
          "物理",
          "化学",
          "英语",
          "政治",
          "地理"
        ]
      }
    }
  }
}
</script>

<style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;

    .charts-item {
      width: 800px;
      height: 400px;
    }
  }

</style>
