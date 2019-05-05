<template>
  <div>
    <!-- 我已关注的公司舆情 -->
    <div>
      <div class="queryCondition-top">
        <div class="queryCondition-title">投资项目舆情</div>
        <div class="middle clearFloat">
          <!-- 查询条件框 -->
          <div>
            <div class="floatLeft">
              <date-picker :prop="startDatePicker" @startDateEvent="startDateEvent" ref="startdata"></date-picker>
            </div>
            <div class="floatLeft">
              <date-picker :prop="endDatePicker" @endDateEvent="endDateEvent" ref="enddata"></date-picker>
            </div>
            <div class="floatLeft">
              <keyword @keywordEvent="keywordEvent"></keyword>
            </div>
          </div>
        </div>
        <div class="mt15 clearFloat">
          <div class="floatLeft">
            <pull-down-list :prop="selectList" @selectListEvent='selectListEvent'></pull-down-list>
          </div>
          <div class="floatLeft ml10" v-on:mouseleave="isShowDropDownList = false">
            <input type="text" v-model="queryCondition.key_info" @click="inputCode" placeholder="请输入" class="input" ref="clearText">
            <span v-if="isShowDropDownList" class="drop-down-box">
              <span v-for="(item, index) of dropDownList" :key="index" @click="dropDownEvent(item)">{{item}}</span>
            </span>
          </div>
          <div class="floatLeft ml10">
            <pull-down-list :prop="selectList2" @selectListEvent2='selectListEvent2'></pull-down-list>
          </div>
        </div>
        <!-- 查询按钮 -->
        <div class="queryBtn">
          <span @click="query">查询</span>
        </div>
      </div>
      <!-- 查询结果 -->
      <div v-if="isShowQueryResult" class="queryResult">
        <div v-if="hasResultData">
          <table>
            <tbody>
              <tr>
                <th v-for="(item, index) of titleData" :key="index" class="tableTh" width:100px>{{item}}</th>
              </tr>
              <tr v-for="(item, index) of dataList" :key="index">
                <td>
                  <a :href="item.news_url" target="_bank">
                    {{item.news_title}}
                  </a>
                </td>
                <td>{{item.news_time}}</td>
                <td class="data-content">
                  {{item.news_content}}
                  <span @click="details(item, index)"> {{item.details}}</span>
                </td>
                <td>{{item.news_source}}</td>
              </tr>
            </tbody>
          </table>
          <pagination :prop="paginationData" @paginationSelect="paginationSelect"></pagination>
        </div>
        <div v-else>
          <div class="loadEffect">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pullDownList from '@/components/common/pullDownList'
import pagination from '@/components/common/pagination'
import commonMethods from '@/common/common.js'
import datePicker from '@/components/common/datePicker'
import keyword from '@/components/common/keyword'
export default {
  data() {
    const oneDayAfter = new Date().getTime() - 86400000;
    const oneweek = new Date().getTime() - 604800000;
    return {
      url: 'http://10.25.24.51:10194/api/rest/nlp/bod/query_project_news?',
      isShowQueryResult: false,
      hasResultData: false,
      isShowDropDownList: false,
      resultData: null,
      selecttype: "",
      selectdetail: "",
      updatetime: "",
      queryCondition: {
        page: 1,
        page_size: 10,
      },
      sendData: {},
      startDatePicker: {
        title: '日期：',
        parentEvent: 'startDateEvent',
        defaultDate: new Date(oneDayAfter)
      },
      endDatePicker: {
        title: '至：',
        parentEvent: 'endDateEvent',
        defaultDate: new Date()
      },
      paginationData: {
        parentEvent: 'paginationSelect',
        page_Count: 0,
        total_Count: 0,
        current: 1
      },
      titleData: ['新闻标题', '新闻日期', '新闻内容', '新闻来源'],
      dataList: [],
      selectList: {
        title: '公司:',
        parentEvent: 'selectListEvent',
        default: '请选择',
        listWidth: 143,
        nowSelectWidth: 140,
        nowSelectHeight: 25,
        nowSelectFontSize: 13,
        list: [
          "请选择",
          "鲁证创投",
          "鲁证新天使",
          "齐鲁中泰",
          "中泰创投",
        ]
      },
      selectList2: {
        title: '',
        parentEvent: 'selectListEvent2',
        default: '请选择',
        listWidth: 143,
        nowSelectWidth: 140,
        nowSelectHeight: 25,
        nowSelectFontSize: 13,
        list: [
          "请选择",
          "存续舆情事件",
          "新增舆情事件"
        ]
      },
      select1: [
        "浙江京新药业股份有限公司",
        "江苏五洋停车产业集团股份有限公司",
        "山东双一科技股份有限公司",
        "山东联诚精密制造股份有限公司",
        "广州建通测绘地理信息技术股份有限公司",
        "内蒙古金海新能源科技股份有限公司",
        "大同新成新材料股份有限公司",
        "大民种业股份有限公司",
        "明冠新材料股份有限公司",
        "山东明仁福瑞达制药股份有限公司",
        "山东宏力热泵能源股份有限公司",
        "山东思源水业工程有限公司",
        "上海华师京城高新技术（集团）有限公司",
        "湖北久顺畜禽实业有限公司",
        "北京微吼时代科技有限公司",

      ],
      select2: [
        "烟台三重技术股份有限公司",
        "北京天天美尚信息科技股份有限公司",
        "北京全景视觉网络科技股份有限公司",
        "湖南咖啡之翼品牌管理股份有限公司",
        "北京亲亲宝贝科技管理有限公司",
        "新道科技股份有限公司",
        "北京卡车之家信息技术股份有限公司",
        "北京友宝在线科技股份有限公司",
        "山东海钰生物股份有限公司",
        "天津森罗科技股份有限公司",
        "青岛容大高科软件股份有限公司",
        "天天艾米（北京）网络科技有限公司",
        "美核电气（济南）股份有限公司",
        "山东省莱芜市汶河化工有限公司",
        "金凯（辽宁）化工有限公司",
        "中际联合（北京）科技股份有限公司",
        "山大地纬软件股份有限公司",
        "上海合全药业股份有限公司",
        "翰博高新材料（合肥）股份有限公司",
        "阿尔特汽车技术股份有限公司",
        "北京友宝在线科技股份有限公司",
        "北京影谱科技股份有限公司",
        "山东泰莱电气股份有限公司",
        "山大地纬软件股份有限公司",
        "上海合全药业股份有限公司",
        "新道科技股份有限公司",
        "翰博高新材料（合肥）股份有限公司",
        "北京卡车之家信息技术股份有限公司",
        "阿尔特汽车技术股份有限公司",
        "北京友宝在线科技股份有限公司",
        "天天艾米（北京）网络科技有限公司",
        "山东天业国际能源有限公司",
        "重庆笛女影视传媒股份有限公司",
        "北京流金岁月文化传播股份有限公司",
        "山东地矿集团有限公司",
        "滨州容众教育科技有限公司",
        "莱芜中泰股权投资基金",
        "莱芜中泰安盈创业投资基金",
        "山东中泰天使创业投资基金企业",
      ],
      select3: [
        "威海恒瑞新型包装材料有限公司",
        "厦门福慧达果蔬股份有限公司",
        "大洋泊车股份有限公司",
        "中悦浦利莱环保科技有限公司",
        "青岛青禾人造草坪股份有限公司",
        "山东远大特材科技股份有限公司",
        "江苏日久光电股份有限公司",
        "威海恒瑞新型包装材料有限公司",
        "江苏日久光电股份有限公司",
        "大洋泊车股份有限公司",
        "青岛青禾人造草坪股份有限公司",
        "山东同科供应链股份有限公司",
        "江苏日久光电股份有限公司",
        "威海恒瑞新型包装材料有限公司",
        "山大地纬软件股份有限公司",
        "万华化学集团股份有限公司",
        "威海市中泰齐东投资中心",
        "山东中泰齐东世华节能投资中心",
        "山东中泰齐东信息产业发展投资中心",
        "威海中泰齐东蓝色并购投资中心",
      ],
      select4: [
        "山东红牛金融服务有限公司",
        "鸿禧能源",
        "海尔厨房",
      ],
      dropDownList: [],
    }
  },
  components: {
    pullDownList,
    pagination,
    datePicker,
    keyword
  },
  methods: {
    details(item, index) {
      if (item.details == '收起') {
        item.details = '...详情';
        item.news_content = item.news_content.slice(0, 150) + '...';
      } else {
        item.details = '收起';
        item.news_content = this.resultData[index].news_content;
      }
    },
    inputEvent() {
      this.queryCondition.keyword = commonMethods.checkName(this.queryCondition.keyword);
    },
    paginationSelect(pageNumber) {
      const sendData = JSON.parse(JSON.stringify(this.sendData));
      sendData.page = pageNumber;
      this.$_axios.get(this.url, {
        params: sendData
      }).then(response => {
        this.resultData = response.data.result.Announce_List;
        this.dataList = JSON.parse(JSON.stringify(this.resultData));
        this.dataList.forEach(item => {
          if (item.news_content && item.news_content.length > 150) {
            item.news_content = item.news_content.slice(0, 150) + '...';
            item.details = '...详情';
          }
        });
      })
        .catch(err => {
          console.log(err);
        });
    },
    query() {
      this.isShowQueryResult = true;
      this.hasResultData = false;
      this.sendData = JSON.parse(JSON.stringify(this.queryCondition));
      for (let key in this.sendData) {
        if (!this.sendData[key]) {
          delete this.sendData[key];
        }
      }
      this.$_axios.get(this.url, {
        params: this.sendData
      }).then(response => {
        // 显示查询结果
        this.hasResultData = true;
        this.resultData = response.data.result.Announce_List;
        this.dataList = JSON.parse(JSON.stringify(this.resultData));
        this.paginationData.page_Count = response.data.result.Page_Count;
        this.paginationData.total_Count = response.data.result.Total_Count;
        this.dataList.forEach(item => {
          if (item.news_content && item.news_content.length > 150) {
            item.news_content = item.news_content.slice(0, 150) + '...';
            item.details = '...详情';
          }
        });

      })
        .catch(err => {
          console.log(err);
        });
    },
    keywordEvent(...data) {
      this.queryCondition.keyword = data[0];
    },
    startDateEvent(...data) {
      this.queryCondition.from_date = data[0];
    },
    endDateEvent(...data) {
      this.queryCondition.to_date = data[0];
    },
    selectListEvent(...data) {
      this.selecttype = data[0];
      this.$refs.clearText.value = "";
      this.queryCondition.key_info = "";
      if (data[0] === '请选择') {
        this.queryCondition.key_info = "";
        this.queryCondition.company = "";
      }
      else {
        this.queryCondition.company = this.selecttype;
      }
    },
    selectListEvent2(...data) {
      this.updatetime = data[0];
      const oneDayAfter = new Date().getTime() - 86400000;
      if (this.updatetime == "请选择") {
        this.startDatePicker.defaultDate = new Date(oneDayAfter);
        this.endDatePicker.defaultDate = new Date();
        this.queryCondition.from_date = commonMethods.formatDateTime2(this.startDatePicker.defaultDate);
        this.queryCondition.to_date = commonMethods.formatDateTime2(this.endDatePicker.defaultDate);
      }
      else if (this.updatetime == "存续舆情事件") {
        const eightday = new Date().getTime() - 691200000;
        this.endDatePicker.defaultDate = new Date(eightday);
        this.$refs.startdata.setNullDate();
        this.queryCondition.to_date = commonMethods.formatDateTime2(this.endDatePicker.defaultDate);
        delete this.queryCondition.from_date;
      } else if (this.updatetime == "新增舆情事件") {
        const oneweek = new Date().getTime() - 604800000;
        this.startDatePicker.defaultDate = new Date(oneweek);
        this.$refs.enddata.setNullDate();
        this.queryCondition.from_date = commonMethods.formatDateTime2(this.startDatePicker.defaultDate);
        delete this.queryCondition.to_date;
      }
    },
    inputCode() {
      const tempArr = [];
      if (this.selecttype == "请选择") {
        this.queryCondition.key_info = "";
        return;
      }
      else if (this.selecttype == "鲁证创投") {
        this.select1.forEach(element => {
          tempArr.push(element);
        });
      }
      else if (this.selecttype == "鲁证新天使") {
        this.select2.forEach(element => {
          tempArr.push(element);
        });
      }
      else if (this.selecttype == "齐鲁中泰") {
        this.select3.forEach(element => {
          tempArr.push(element);
        });
      }
      else if (this.selecttype == "中泰创投") {
        this.select4.forEach(element => {
          tempArr.push(element);
        });
      }
      // if (tempArr.length > 5) {
      //   this.dropDownList = tempArr.slice(0, 5);
      // } else {
      //   this.dropDownList = tempArr;
      // }
      this.dropDownList = tempArr;
      this.isShowDropDownList = true;
    },
    dropDownEvent(item) {
      this.queryCondition.key_info = item;
      this.isShowDropDownList = false;
    },
  },
  watch: {
    defaultDate(val, oldval) {
      console.log("a: " + val, oldVal);
    },
  },
  mounted() {
    this.queryCondition.from_date = commonMethods.formatDateTime2(this.startDatePicker.defaultDate);
    this.queryCondition.to_date = commonMethods.formatDateTime2(this.endDatePicker.defaultDate);
  }
}
</script>

<style lang="less" scoped>
.icon-link:before {
  content: "\e652";
}
.queryBtn {
  position: absolute;
  top: 60px;
  left: 650px;
  width: 60px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  cursor: pointer;
  background-color: #c82c37;
  color: white;
  border-radius: 5px;
  font-size: 16px;
}
.mt15 {
  padding: 0 0 15px;
}
.ml10 {
  margin-left: 10px;
}
input {
  width: 120px;
  height: 25px;
  line-height: 25px;
}
.drop-down-box {
  background-color: #fff;
  position: absolute;
  top: 114px;
  left: 182px;
  width: 173px;
  border: 1px solid #797979;
  z-index: 2;
  span {
    display: inline-block;
    width: 100%;
    height: 25px;
    line-height: 25px;
    cursor: pointer;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  span:hover {
    background-color: deepskyblue;
  }
}

.queryConditionBox {
  width: 100%;
  height: 70px;
  margin-top: 30px;
  border-bottom: 1px solid #797979;
  > div {
    float: left;
  }
}
.queryResult {
  table {
    width: 1180px;
    margin-top: 20px;
    border: 1px solid #797979;
    border-collapse: collapse;
    word-wrap: break-word;
    word-break: break-all;
    th {
      height: 40px;
      line-height: 40px;
      border: 1px solid #797979;
      background-color: #f0f5f9;
    }
    tr {
      overflow: hidden;
      border: 1px solid #797979;
    }
    td {
      height: 84px;
      text-align: center;
      vertical-align: middle;
      border: 1px solid #797979;
    }
    .data-content {
      position: relative;
      text-align: left;
      span {
        position: absolute;
        bottom: 0;
        right: 0;
        cursor: pointer;
        color: blue;
      }
    }
    .tableTh:nth-child(1) {
      width: 100x;
    }
    .tableTh:nth-child(2) {
      width: 150px;
    }
    .tableTh:nth-child(3) {
      width: 450px;
    }
    .tableTh:nth-child(4) {
      width: 150px;
    }
  }
}
</style>
