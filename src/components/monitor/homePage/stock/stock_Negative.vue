<template>
  <div>
    <!-- 股票 公告预警 -->
    <div>
      <div class="queryCondition-top">
        <div class="queryCondition-title">负面公告</div>
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
            <tbody>
              <tr>
                <th v-for="(item, index) of titleData" :key="index" class="tableTh" width:100px>{{item}}</th>
              </tr>
              <tr v-for="(item, index) of dataList" :key="index">
                <td>{{item.stock_name}}</td>
                <td>{{item.stock_code}}</td>
                <td>
                  <a :href="item.file_url" target="_bank">{{item.notice_title}}</a>
                </td>
                <!-- <td class="data-content">{{item.file_url}}
                  <span @click="details(item, index)">{{item.details}}</span>
                </td> -->
                <td>{{item.notice_date}}</td>
                <td>{{item.notice_source}}</td>
                <td>{{item.notice_type}}</td>
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
    const oneAfterDay = new Date().getTime() + 86400000;

    return {
      url: 'http://10.25.24.51:10191/api/rest/nlp/risk/query_announce_risk?',
      isShowQueryResult: false,
      hasResultData: false,
      resultData: {},
      queryCondition: {
        keyword: '',
        page: 1,
        page_size: 10,
        from_date: '',
        to_date: ''
      },

      startDatePicker: {
        title: '日期：',
        parentEvent: 'startDateEvent',
        defaultDate: new Date(oneDayAfter)
      },
      endDatePicker: {
        title: '至：',
        parentEvent: 'endDateEvent',
        defaultDate: new Date(oneAfterDay)
      },
      sendData: {},
      paginationData: {
        parentEvent: 'paginationSelect',
        page_Count: 0,
        total_Count: 0,
        current: 1
      },
      titleData: ['股票名称', '股票代码', '公告标题', '公告时间', '公告源', '公告类别'],
      dataList: [],
    }
  },
  components: {
    pagination,
    datePicker,
    keyword
  },
  computed: {

  },
  methods: {
    keywordEvent(...data) {
      this.queryCondition.keyword = data[0];
    },
    paginationSelect(pageNumber) {
      const sendData = JSON.parse(JSON.stringify(this.sendData));
      sendData.page = pageNumber;
      console.log('sendData', sendData)
      this.$_axios.get(this.url, {
        params: sendData
      }).then(response => {
        console.log('股票 公告预警', response.data.result);
        this.dataList = JSON.parse(JSON.stringify(response.data.result.Announce_List));
        this.resultData = response.data.result.Announce_List;
        this.dataList.forEach(item => {
          // item.notice_date = item.notice_date ? commonMethods.formatDateTime(new Date(item.notice_date)) : '-';
          // if (item.notice_detail && item.notice_detail.length > 220) {
          //   item.notice_detail = item.notice_detail.slice(0, 220) + '...';
          //   item.details = '...详情';
          // }
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
        // 显示查询结果
        this.hasResultData = true;
        console.log('股票 公告预警', response.data.result);
        this.dataList = JSON.parse(JSON.stringify(response.data.result.Announce_List));
        this.resultData = response.data.result.Announce_List;
        this.paginationData.page_Count = response.data.result.Page_Count;
        this.paginationData.total_Count = response.data.result.Total_Count;
        this.dataList.forEach(item => {
          // item.notice_date = item.notice_date ? commonMethods.formatDateTime(new Date(item.notice_date)) : '-';
          // if (item.notice_detail && item.notice_detail.length > 220) {
          //   item.notice_detail = item.notice_detail.slice(0, 220) + '...';
          //   item.details = '...详情';
          // }
        });
      })
        .catch(err => {
          console.log(err);
        });
    },
    //     inputEvent(){
    //   this.queryCondition.keyword = commonMethods.checkName(this.queryCondition.keyword);
    // },
    details(item, index) {
      if (item.details == '收起') {
        item.details = '...详情';
        item.notice_detail = item.notice_detail.slice(0, 220) + '...';
      } else {
        item.details = '收起';
        item.notice_detail = this.resultData[index].notice_detail;
      }
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
      height: 84px;
      overflow: hidden;
      border: 1px solid #797979;
    }
    td {
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
      width: 80px;
    }
    .tableTh:nth-child(2) {
      width: 80px;
    }
    .tableTh:nth-child(3) {
      width: 120px;
    }
    .tableTh:nth-child(4) {
      width: 200px;
    }
    .tableTh:nth-child(5) {
      width: 80px;
    }
    .tableTh:nth-child(6) {
      width: 90px;
    }
    .tableTh:nth-child(7) {
      width: 180px;
    }
  }
}
</style>
