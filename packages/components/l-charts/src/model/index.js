class ChartsConfig {
  constructor() {
    // x轴数据源
    this.xData = [];

    // y轴数据源
    this.yData = [];

    // 折线图数据源
    this.lineData = [];

    // 指示器类型
    this.tipsType = "shadow";

    // 图表的图标基础配置
    this.legendConfig = {
      show: true,
      icon: "circle",
      itemWidth: 10,
      itemHeight: 10,
      data: []
    };

    // 图表的标题配置信息
    this.titleConfig = { text: "" };

    // 图表的显示文本字段
    this.dataLabel = "";

    // 图标的显示数据字段
    this.dataKey = "";

    // 图表边距配置信息
    this.gridConfig = {
      left: "20px",
      right: "20px",
      bottom: "20px",
      containLabel: true
    };

    /**
     * @description 图表x轴的显示配置信息
     * @type {{data: [], type: string}}
     */
    this.axisConfig = {
      type: "category",
      data: []
    };

    /**
     * @description 百分比图表的配置
     * @type {{axisLabel: {formatter: string}, min: number, max: number, type: string}}
     */
    this.percentAxisConfig = {
      type: "value",
      min: 0,
      max: 100,
      axisLabel: { formatter: "{value}%" }
    };

    // 图表的图标颜色快数据信息
    this.colorList = [
      "#72ade9",
      "#ffdb5c",
      "#4ed3c3",
      "#f35d5e",
      "#ffbf9a",
      "#8378eb",
      "#4b58be",
      "#6be3eb",
      "#fe8463",
      "#fdbe50",
      "#72c8f2",
      "#f4b1cf",
      "#80adc5",
      "#4d8cae",
      "#b6d0de",
      "#89a0d3",
      "#3fb27e",
      "#51b3f1",
      "#8378eb",
      "#eae38c"
    ];

    // shadow类型提示器
    this.toolTips = {
      trigger: "axis",
      axisPointer: { type: "shadow" }
    };

    // 数据类型轴配置
    this.axisValue = [{ type: "value" }];

    // 堆叠文本
    this.stackLabel = "";

    // 柱体样式设置
    this.barStyle = {
      barBorderRadius: [
        4,
        4,
        0,
        0
      ]
    };

    // 多轴图文本配置
    this.axisLabelConfig = {
      leftLabel: "",
      rightLabel: ""
    };

    // 滚动区域的类名
    this.scrollId = "";
  }

  /**
   * @description 初始化图表的部分配置信息
   * @param type
   */
  initChartsConfig(type) {
    if (type.indexOf("Y") > -1) {
      this.setYAxisConfig();
      this.setYLegendDataInfo();
    } else if (type.indexOf("pie") > -1) {
      this.setPieLegendDataInfo();
    } else {
      this.setXAxisConfig();
      this.setXLegendDataInfo();
    }
  }

  /**
   * @description 设置堆叠文本
   * @param label
   */
  setStackLabel(label) {
    this.stackLabel = label;
  }

  /**
   * @description 获取堆叠文本信息
   * @return {*}
   */
  get getStackLabel() {
    return this.stackLabel ? this.stackLabel : "合计";
  }

  /**
   * @description 设置x轴数据
   * @param val
   */
  setXData(val) {
    this.xData = val;
  }

  /**
   * @description 获取x轴数据
   * @return {string[]}
   */
  get getXData() {
    return this.xData;
  }

  /**
   * @description 获取正向柱体样式
   * @return {{barBorderRadius: number[]}|*}
   */
  get getXBarStyle() {
    return this.barStyle;
  }

  /**
   * @description 设置x轴图表Legend的数据信息
   */
  setXLegendDataInfo() {
    this.yData.map(item => {
      this.legendConfig.data.push(this.getDataLabel && item[this.getDataLabel] ? item[this.getDataLabel] : item);
    });
    if (this.lineData) {
      this.setLineLegendDataInfo();
    }
  }

  /**
   * @description 设置x轴的显示的数据信息
   */
  setXAxisConfig() {
    this.xData.map(item => {
      this.axisConfig.data.push(this.getDataLabel && item[this.getDataLabel] ? item[this.getDataLabel] : item);
    });
  }

  /**
   * @description 获取y轴数据的类型
   * @return {"undefined"|"object"|"boolean"|"number"|"string"|"function"|"symbol"|"bigint"}
   */
  get getXDataType() {
    return typeof this.xData[0];
  }

  /**
   *
   * @description 设置y轴数据
   * @param val
   */
  setYData(val) {
    this.yData = val;
  }

  /**
   * @description 获取y轴数据信息
   * @return {string[]}
   */
  get getYData() {
    return this.yData;
  }

  /**
   * @description 设置折线图数据
   * @param val
   */
  setLineData(val) {
    this.lineData = val;
  }

  /**
   * @description 纵向折线柱状图的折线数据信息
   */
  get getXLineData() {
    return {
      name: this.lineData[this.getDataLabel],
      data: this.lineData[this.getDataKey],
      type: "line",
      yAxisIndex: 1
    };
  }

  /**
   * @description 获取横向柱体样式
   * @return {{barBorderRadius: number[]}|*}
   */
  get getYBarStyle() {
    this.barStyle.barBorderRadius = [
      4,
      4,
      0,
      0
    ];
    return this.barStyle;
  }

  /**
   * @description 设置y轴图表的legend数据信息
   */
  setYLegendDataInfo() {
    this.xData.map(item => {
      this.legendConfig.data.push(this.getDataLabel && item[this.getDataLabel] ? item[this.getDataLabel] : item);
    });
    if (this.lineData) {
      this.setLineLegendDataInfo();
    }
  }

  /**
   * @description 设置y轴的显示数据信息
   */
  setYAxisConfig() {
    this.yData.map(item => {
      this.axisConfig.data.push(this.getDataLabel && item[this.getDataLabel] ? item[this.getDataLabel] : item);
    });
  }

  /**
   * @description 获取y轴数据的类型
   * @return {"undefined"|"object"|"boolean"|"number"|"string"|"function"|"symbol"|"bigint"}
   */
  get getYDataType() {
    return typeof this.yData[0];
  }

  /**
   * @description 横向折线柱状图的折线数据信息
   */
  get getYLineData() {
    return {
      name: this.lineData[this.getDataLabel],
      data: this.lineData[this.getDataKey],
      type: "line",
      xAxisIndex: 1
    };
  }

  /**
   * @description 设置图表Legend是否显示
   * @param status
   */
  setLegendStatus(status) {
    this.legendConfig.show = status;
  }

  /**
   * @description 获取图表的图标块设置
   * @returns {{data: [], itemHeight: number, show: boolean, name: string, icon: string, itemWidth: number}}
   */
  get getLegendConfig() {
    return this.legendConfig;
  }

  /**
   * @description 设置图表标题
   */
  setTitleInfo(val) {
    this.titleConfig.text = val;
  }

  /**
   * @description 获取图表的标题
   * @returns {{text: string}}
   */
  get getTitleInfo() {
    return this.titleConfig;
  }

  /**
   * @description 设置左右图表的边距
   * @param val
   */
  setGridConfig(val) {
    let list = [];
    if (val.indexOf(",") > -1) {
      list = val.split(",");
    }
    this.gridConfig.left = list[0] ? list[0] : "20px";
    this.gridConfig.right = list[1] ? list[1] : "20px";
  }

  /**
   * @description 图表的边距配置
   * @returns {{left: string, bottom: string, right: string, containLabel: boolean}}
   */
  get getGridConfig() {
    return this.gridConfig;
  }

  /**
   * @description 获取x轴的显示数据信息
   */
  get getAxisConfig() {
    return this.axisConfig;
  }

  /**
   * @description 获取百分比的显示数据信息
   * @return {{axisLabel: {formatter: string}, min: number, max: number, type: string}}
   */
  get getPercentAxis() {
    return this.percentAxisConfig;
  }

  /**
   * @description 获取无边距的x轴配置信息
   * @returns {{data: *[], type: string}}
   */
  get getAxisBoundaryGap() {
    this.axisConfig.boundaryGap = false;
    return this.axisConfig;
  }

  /**
   * @description 获取数据轴配置
   * @return {{type: string}[]|*}
   */
  get getAxisValue() {
    return this.axisValue;
  }

  /**
   * @description 设置指示器类型
   * @param val
   */
  setToolTip(val) {
    const type = [
      "shadow",
      "line",
      "cross",
      "none"
    ];
    this.tipsType = type.indexOf(val) > -1 ? val : "shadow";
  }

  /**
   * @description 获取鼠标指示器配置
   */
  get getToolTip() {
    this.toolTips.axisPointer.type = this.tipsType;
    return this.toolTips;
  }

  /**
   * @description 设置显示的文本字段
   * @param label
   */
  setDataLabel(label) {
    this.dataLabel = label;
  }

  /**
   * @description 获取显示的文本字段
   * @return {string}
   */
  get getDataLabel() {
    return this.dataLabel.trim() === "" ? false : this.dataLabel;
  }

  /**
   * @description 设置显示的数据字段
   * @param key
   */
  setDataKey(key) {
    this.dataKey = key;
  }

  /**
   * @description 获取显示的数据字段
   * @return {string}
   */
  get getDataKey() {
    return this.dataKey.trim() === "" ? false : this.dataKey;
  }

  /**
   * @description 设置图表的颜色组
   * @param list
   */
  setColorList(list) {
    this.colorList = list.length > 0 ? list : this.colorList;
  }

  /**
   * @description 获取图表的颜色组
   * @returns {string[]}
   */
  get getColorList() {
    return this.colorList;
  }

  /**
   * @description 设置折线柱状图的标记
   */
  setLineLegendDataInfo() {
    this.legendConfig.data.push(this.lineData[this.getDataLabel]);
  }

  /**
   * @description 获取折线柱状图的标记
   * @return {{data: Array, itemHeight: number, show: boolean, icon: string, itemWidth: number}|*}
   */
  get getLineLegend() {
    return this.legendConfig;
  }

  /**
   * @description 设置多轴图文本
   * @param lLabel
   * @param rLabel
   */
  setAxisLabel(lLabel, rLabel) {
    this.axisLabelConfig.leftLabel = lLabel;
    this.axisLabelConfig.rightLabel = rLabel;
  }

  /**
   * @description 折线图的数据
   * @return {{name: string, type: string}[]}
   */
  get getLineAxisValue() {
    return [
      {
        type: "value",
        name: this.axisLabelConfig.leftLabel
      }, {
        type: "value",
        name: this.axisLabelConfig.rightLabel
      }
    ];
  }

  /**
   * @description 设置饼图/圆环图的图标块
   */
  setPieLegendDataInfo() {
    this.getXData.map(item => {
      this.legendConfig.data.push(this.getDataLabel && item[this.getDataLabel] ? item[this.getDataLabel] : item);
    });
  }

  /**
   * @description 设置滚动区域的ID名称
   * @param idName
   */
  setScrollId(idName) {
    this.scrollId = idName;
  }

  /**
   * @description 检测是否需要进行图表的绘制
   * @param chartsDom 图表的DOM信息
   * @return {boolean}
   */
  showCharts(chartsDom) {
    if (this.scrollId) {
      const offsetTop = chartsDom.offsetTop;
      const chartsHeight = chartsDom.offsetHeight;
      const viewHeight = document.getElementById(this.scrollId).offsetHeight;
      const scrollTop = document.getElementById(this.scrollId).scrollTop;
      if (scrollTop > offsetTop + chartsHeight) {
        return false;
      } else {
        return viewHeight + scrollTop > offsetTop;
      }
    } else {
      return true;
    }
  }

  /**
   * @description 获取饼图/圆环图的图标快
   * @return {{data: Array, itemHeight: number, show: boolean, icon: string, itemWidth: number}|*}
   */
  get getPieLegendDataInfo() {
    return this.legendConfig;
  }
}

export default ChartsConfig
