<template>
  <div>
    <!-- 黑天鹅 高管离职 -->
    <div>
      <div class="queryCondition-top">
        <div class="queryCondition-title">高管离职</div>
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
      <div v-if="isShowQueryResult" class="queryResult">
        <div v-if="hasResultData">
          <table>
            <tbody>
              <tr>
                <th v-for="(item, index) of titleData" :key="index" class="tableTh" width:100px>{{item}}</th>
              </tr>
              <tr v-for="(item, index) of dataList" :key="index">
                <td class="colorBule">
                  <a :href="item.URL" target="_bank">{{item.TITLE}}</a>
                </td>
                <td>{{item.SHOWTIME}}</td>
                <td class="data-content">
                  <p v-html="item.CONTENT"></p>
                  <span @click="details(item, index)">{{item.details}}</span>
                </td>
                <td>{{item.SOURCE}}</td>
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
import pagination from '@/components/common/pagination'
import commonMethods from '@/common/common.js'
import datePicker from '@/components/common/datePicker'
import keyword from '@/components/common/keyword'
export default {
  data() {
    const oneDayAfter = new Date().getTime() - 86400000;
    return {
      url: 'http://10.25.24.51:10192/api/rest/nlp/risk/delist_caution?news_type=1&',
      isShowQueryResult: false,
      hasResultData: false,
      resultData: null,
      queryCondition: {
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
    }
  },
  components: {
    pagination,
    datePicker,
    keyword,
  },
  methods: {
    inputEvent() {
      this.queryCondition.keyword = commonMethods.checkName(this.queryCondition.keyword);
    },
    paginationSelect(pageNumber) {
      const sendData = JSON.parse(JSON.stringify(this.sendData));
      sendData.page = pageNumber;
      console.log('sendData', sendData)
      this.$_axios.get(this.url, {
        params: sendData
      }).then(response => {
        console.log('法律法规查询结果', response.data.result);
        this.resultData = response.data.result.Announce_List;
        this.resultData.forEach(item => {
          item.CONTENT = item.CONTENT.toString().replace(/\\r\\n\\r\\n/g, "<br>");
          item.CONTENT = item.CONTENT.toString().replace(/\\r\\n/g, "<br>");
        });
        this.dataList = JSON.parse(JSON.stringify(this.resultData));
        this.dataList.forEach(item => {
          // item.SHOWTIME = item.SHOWTIME ? commonMethods.formatDateTime(new Date(item.SHOWTIME)) : '-';
          if (item.CONTENT && item.CONTENT.length > 210) {
            item.CONTENT = item.CONTENT.slice(0, 210) + '...';
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
      console.log('sendData', this.sendData)
      this.$_axios.get(this.url, {
        params: this.sendData
      }).then(response => {
        // 显示查询结果
        this.hasResultData = true;
        console.log('法律法规查询结果', response.data.result);
        this.resultData = response.data.result.Announce_List;
        this.resultData.forEach(item => {
          item.CONTENT = item.CONTENT.toString().replace(/\\r\\n\\r\\n/g, "<br>");
          item.CONTENT = item.CONTENT.toString().replace(/\\r\\n/g, "<br>");
        });
        this.dataList = JSON.parse(JSON.stringify(this.resultData));
        this.paginationData.page_Count = response.data.result.Page_Count;
        this.paginationData.total_Count = response.data.result.Total_Count;
        this.dataList.forEach(item => {
          // item.SHOWTIME = item.SHOWTIME ? commonMethods.formatDateTime(new Date(item.SHOWTIME)) : '-';
          if (item.CONTENT && item.CONTENT.length > 210) {
            item.CONTENT = item.CONTENT.slice(0, 210) + '...';
            item.details = '...详情';
          }
        });
      })
        .catch(err => {
          console.log(err);
        });
    },
    details(item, index) {
      if (item.details == '收起') {
        item.details = '...详情';
        item.CONTENT = item.CONTENT.slice(0, 210) + '...';
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
      width: 145px;
    }
    .tableTh:nth-child(2) {
      width: 80px;
    }
    .tableTh:nth-child(4) {
      width: 90px;
    }
  }
}
</style>
