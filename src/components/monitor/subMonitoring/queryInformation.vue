<template>
  <div>
    <!-- 公司信息查询 -->
    <div>
      <div class="queryCondition-top">
        <div class="queryCondition-title">子公司信息舆情</div>
        <div class="middle clearFloat">
          <!-- 查询条件框 -->
          <div>
            <div class="floatLeft">
              <date-picker :prop="startDatePicker" @startDateEvent="startDateEvent" ref="startdata" readonly="readonly"></date-picker>
            </div>
            <div class="floatLeft">
              <date-picker :prop="endDatePicker" @endDateEvent="endDateEvent" ref="enddata" readonly="readonly"></date-picker>
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
    return {
      url: 'http://10.25.24.51:10194/api/rest/nlp/bod/query_subsidiary_news?',
      isShowQueryResult: false,
      hasResultData: false,
      resultData: null,
      updatetime: "",
      queryCondition: {
        from_date: '',
        to_date: '',
        key_info: '',
        keyword: '',
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
          "万家基金",
          "鲁证期货",
          "鲁证创投",
          "中泰资管",
          "中泰国际",
          "中泰创投",
          "鲁证经贸",
          "万家共赢",
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
    paginationSelect(pageNumber) {
      const sendData = JSON.parse(JSON.stringify(this.sendData));
      sendData.page = pageNumber;
      console.log('sendData', sendData)
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
      console.log(this.queryCondition)
    },
    endDateEvent(...data) {
      this.queryCondition.to_date = data[0];
    },
    selectListEvent(...data) {
      this.queryCondition.key_info = data[0];
      if (data[0] === '请选择') {
        this.queryCondition.key_info = 0;
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
.mt15 {
  padding: 0 0 15px;
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
.ml10 {
  margin-left: 10px;
}
.queryConditionBox {
  width: 100%;
  height: 70px;
  margin-top: 30px;
  border-bottom: 1px solid #797979;
  > div {
    float: left;
  }
  input {
    width: 120px;
    height: 25px;
    line-height: 25px;
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
