<template>
  <div>
    <!-- 期权 >> 场内期权业务其他舆情监控 -->
    <div>
      <div class="queryCondition-top">
        <div class="queryCondition-title">其他舆情监控</div>
        <div class="middle clearFloat">
          <!-- 查询条件框 -->
          <div>
            <div class="floatLeft">
              <date-picker :prop="startDatePicker" @startDateEvent="startDateEvent"></date-picker>
            </div>
            <div class="floatLeft">
              <date-picker :prop="endDatePicker" @endDateEvent="endDateEvent"></date-picker>
            </div>
            <div class="floatLeft">
              <keyword @keywordEvent="keywordEvent"></keyword>
            </div>
          </div>
          <!-- 查询按钮 -->
          <div class="queryBtn">
            <span @click="query">查询</span>
          </div>
        </div>
      </div>
      <!-- 查询结果 -->
      <div v-if="isShowQueryResult" class="queryResult">
        <div v-if="hasResultData">
          <table>
            <thead>
              <th v-for="(item, index) of titleData" :key="index">{{item}}</th>
            </thead>
            <tbody>
              <tr v-for="(item, index) of dataList" :key="index">
                <td class="tableTd">{{item.SHOWTIME}}</td>
                <!-- <td class="tableTd colorBule"><a :href="item.SOURCEURL" target="_bank">{{item.NOTICETITLE}}</a></td> -->
                <td class="tableTd colorBule">
                  <a :href="item.PURL" target="_bank">{{item.TITLE}}</a>
                </td>
                <td class="tableTd data-content">
                  <p v-html="item.CONTENT"></p>
                  <span @click="details(item, index)">{{item.details}}</span>
                </td>
                <td class="tableTd">{{item.SOURCE}}</td>
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
import commonMethods from '@/common/common.js'
import pagination from '@/components/common/pagination'
import datePicker from '@/components/common/datePicker'
import keyword from '@/components/common/keyword'
export default {
  data() {
    const oneDayAfter = new Date().getTime() - 86400000;
    return {
      url: 'http://10.25.24.51:10192/api/rest/nlp/risk/option_news?',
      isShowQueryResult: false,
      hasResultData: false,
      queryCondition: {
        from_date: '',
        to_date: '',
        page: 1,
        page_size: 10
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
      titleData: ['日期', '标题', '内容', '来源'],
      dataList: [],
    }
  },
  components: {
    pagination,
    datePicker,
    keyword,
  },
  methods: {
    paginationSelect(pageNumber) {
      const sendData = JSON.parse(JSON.stringify(this.sendData));
      sendData.page = pageNumber;
      console.log('sendData', sendData)
      this.$_axios.get(this.url, {
        params: sendData
      }).then(response => {
        console.log('场内期权业务其他舆情监控', response.data.result);
        this.resultData = response.data.result.Announce_List;
        this.resultData.forEach(item => {
          item.CONTENT = item.CONTENT.toString().replace(/\\r\\n\\r\\n/g, "<br>");
          item.CONTENT = item.CONTENT.toString().replace(/\\r\\n/g, "<br>");
        });
        this.dataList = JSON.parse(JSON.stringify(this.resultData));
        this.dataList.forEach(item => {
          // item.SHOWTIME = item.SHOWTIME ? new Date(item.SHOWTIME).toLocaleDateString() : '-';
          if (item.CONTENT && item.CONTENT.length > 175) {
            item.CONTENT = item.CONTENT.slice(0, 175) + '...';
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
        if (this.sendData[key] === '') {
          delete this.sendData[key];
        }
      }
      console.log('sendData', this.sendData)
      this.$_axios.get(this.url, {
        params: this.sendData
      }).then(response => {
        this.hasResultData = true;
        console.log('场内期权业务其他舆情监控', response);
        this.paginationData.page_Count = response.data.result.Page_Count;
        this.paginationData.total_Count = response.data.result.Total_Count;
        this.resultData = response.data.result.Announce_List;
        this.resultData.forEach(item => {
          item.CONTENT = item.CONTENT.toString().replace(/\\r\\n\\r\\n/g, "<br>");
          item.CONTENT = item.CONTENT.toString().replace(/\\r\\n/g, "<br>");
        });
        this.dataList = JSON.parse(JSON.stringify(this.resultData));
        this.dataList.forEach(item => {
          // item.SHOWTIME = item.SHOWTIME ? new Date(item.SHOWTIME).toLocaleDateString() : '-';
          if (item.CONTENT && item.CONTENT.length > 175) {
            item.CONTENT = item.CONTENT.slice(0, 175) + '...';
            item.details = '...详情';
          }
        });
      })
        .catch(err => {
          console.log(err);
        });
    },
    inputEvent() {
      this.queryCondition.keyword = commonMethods.checkName(this.queryCondition.keyword);
    },
    details(item, index) {
      if (item.details == '收起') {
        item.details = '...详情';
        item.CONTENT = item.CONTENT.slice(0, 175) + '...';
      } else {
        item.details = '收起';
        item.CONTENT = this.resultData[index].CONTENT;
      }
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
  },
  mounted() {
    this.queryCondition.from_date = commonMethods.formatDateTime2(this.startDatePicker.defaultDate);
    this.queryCondition.to_date = commonMethods.formatDateTime2(this.endDatePicker.defaultDate);
  }
}
</script>

<style lang="less" scoped>
.queryConditionBox {
  width: 100%;
  height: 70px;
  margin-top: 30px;
  border-bottom: 1px solid #797979;
  > div {
    float: left;
  }
  input {
    width: 110px;
    height: 25px;
    text-align: left;
    line-height: 25px;
  }
  .queryBtn {
    width: 75px;
    height: 30px;
    margin-left: 200px;
    line-height: 30px;
    text-align: center;
    cursor: pointer;
    border: 1px solid #797979;
    background-color: #fff;
    border-radius: 5px;
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
      border: 1px solid #797979;
    }
    td {
      text-align: center;
      vertical-align: middle;
      border: 1px solid #797979;
    }
    .tableTd:nth-child(1) {
      width: 150px;
    }
    .tableTd:nth-child(2) {
      width: 260px;
    }
    .tableTd:nth-child(3) {
      width: 360px;
    }
    .tableTd:nth-child(4) {
      width: 150px;
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
  }
}
</style>
