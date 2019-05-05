<template>
  <div>
    <div>
      <div class="queryCondition-top">
        <div class="queryCondition-title">新三板挂牌企业新闻预警</div>
        <div class="middle clearFloat">
          <!-- 查询条件框 -->
          <div>
            <div class="floatLeft">
              <date-picker :prop="startDatePicker" @startDateEvent="startDateEvent"></date-picker>
            </div>
            <div class="floatLeft">
              <date-picker :prop="endDatePicker" @endDateEvent="endDateEvent"></date-picker>
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
              <th v-for="(item, index) of titleData" :key="index" class="tableTh">{{item}}</th>
            </thead>
            <tbody>
              <tr v-for="(item, index) of dataList" :key="index">
                <td>{{item.title}}</td>
                <td>{{item.showtime}}</td>
                <td>
                  <a :href="item.purl" target="_bank">{{item.purl}}</a>
                </td>
                <td>{{item.source}}</td>
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
import datePicker from '@/components/common/datePicker'
import keyword from '@/components/common/keyword'
import commonMethods from '@/common/common.js'
export default {
  data() {
    const oneDayAfter = new Date().getTime() - 86400000;
    return {
      url: 'http://10.25.24.51:10193/api/risk/issue_news?',
      isShowQueryResult: false,
      hasResultData: false,
      queryCondition: {
        userid: 'neeq',
        page: 0,
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
      titleData: ['标题', '发布时间', '链接', '新闻来源'],
      dataList: [],
    }
  },
  components: {
    pullDownList,
    pagination,
    datePicker
  },
  methods: {
    query() {
      this.isShowQueryResult = false;
      this.hasResultData = false;
      this.sendData = JSON.parse(JSON.stringify(this.queryCondition));
      for (let key in this.sendData) {
        if (this.sendData[key] === '') {
          delete this.sendData[key];
        }
      }
      this.$_axios.get(this.url, {
        params: this.sendData
      }).then(response => {
        this.isShowQueryResult = true;
        this.hasResultData = true;
        this.dataList = JSON.parse(JSON.stringify(response.data.result.result));
        this.resultData = response.data.result.result;
        this.paginationData.page_Count = Math.ceil(response.data.result.total_count / 10);
        this.paginationData.total_Count = response.data.result.total_count;
        this.dataList.forEach(item => {
          item.title = item.title;
          item.showtime = item.showtime;
          item.purl = item.purl;
          item.source = item.source;
        });
      })
        .catch(err => {
          console.log(err);
        });
    },
    paginationSelect(pageNumber) {
      const sendData = JSON.parse(JSON.stringify(this.sendData));
      sendData.page = pageNumber - 1;
      this.$_axios.get(this.url, {
        params: sendData
      }).then(response => {
        this.isShowQueryResult = true;
        this.hasResultData = true;
        this.dataList = JSON.parse(JSON.stringify(response.data.result.result));
        this.resultData = response.data.result.result;
        this.dataList.forEach(item => {
          item.title = item.title;
          item.showtime = item.showtime;
          item.purl = item.purl;
          item.source = item.source;
        });
      })
        .catch(err => {
          console.log(err);
        });
    },
    startDateEvent(...data) {
      this.queryCondition.from_date = data[0];
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
    th {
      height: 40px;
      line-height: 40px;
      border: 1px solid #797979;
      background-color: #f0f5f9;
    }
    tr {
      height: 30px;
      line-height: 30px;
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
      width: 200px;
    }
    .tableTh:nth-child(2) {
      width: 150px;
    }
    .tableTh:nth-child(3) {
      width: 400px;
    }
    .tableTh:nth-child(4) {
      width: 100px;
    }
  }
}
</style>
