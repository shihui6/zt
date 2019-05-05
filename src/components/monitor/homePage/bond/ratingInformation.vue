<template>
  <div>
    <!-- 债券 > 评级预警 >  评级信息 -->
    <div class="queryCondition-top">
      <div class="queryCondition-title">评级信息</div>
      <div class="middle clearFloat">
        <!-- 查询条件框 -->
        <div class="clearFloat width1100">
          <div class="floatLeft">
            <date-picker :prop="startDatePicker" @startDateEvent="startDateEvent"></date-picker>
          </div>
          <div class="floatLeft">
            <date-picker :prop="endDatePicker" @endDateEvent="endDateEvent"></date-picker>
          </div>
          <div class="floatLeft">
            机构名称：<input @input="inputEvent" v-model="queryCondition.companyname" type="text">
          </div>
        </div>
        <div class="clearFloat">
          <div class="floatLeft">
            <date-picker :prop="ratingDatePicker" @ratingDateEvent="ratingDateEvent"></date-picker>
          </div>
          <div class="floatLeft">
            <pull-down-list :prop="ratingNameData" @ratingName="ratingName"></pull-down-list>
          </div>
        </div>
        <!-- 查询按钮 -->
        <div class="queryBtn">
          <span @click="query">查询</span>
        </div>
      </div>
    </div>
    <!-- 查询结果 -->
    <div v-if="isQueryResult" class="queryResult">
      <table>
        <tbody>
          <tr>
            <th v-for="(item, index) of tableData.th" :key="index" class="title">{{item}}</th>
          </tr>
          <tr v-for="(item, index) of tableData.tr" :key="index">
            <td>{{item.notice_date}}</td>
            <td>{{item.ratingdate}}</td>
            <!-- <td>{{item.companycode}}</td> -->
            <td>{{item.companyname}}</td>
            <td>{{item.creditname}}</td>
            <td>{{item.title}}</td>
            <td>{{item.rating}}</td>
            <td>{{item.ratefwd}}</td>
            <td>{{item.rate_type}}</td>
          </tr>
        </tbody>
      </table>
      <pagination :prop="paginationData" @paginationSelect="paginationSelect"></pagination>
      <!-- <rating-change :prop="ratingChangeData"></rating-change> -->
    </div>
  </div>
</template>

<script>
// import ratingChange from '@/components/common/ratingChangeList'
import pullDownList from '@/components/common/pullDownList'
import pagination from '@/components/common/pagination'
import datePicker from '@/components/common/datePicker'
import commonMethods from '@/common/common.js'
export default {
  data() {
    const oneDayAfter = new Date().getTime() - 86400000;
    return {
      url: 'http://10.25.24.51:10193/api/risk/bond_rate_info?',
      isQueryResult: false,
      ratingChangeData: [],
      queryCondition: {
        start_date: '',
        end_date: '',
        companyname: '',
        ratingdate: '',
        creditname: '',
        page: 0,
        pagesize: 10
      },
      sendData: {},
      tableData: {
        th: ['公告日期', '评级日期','机构名称', '评级机构名称', '来源标题', '信用评级', '评级展望', '信用评级类型'],
        tr: [
          { notice_date: '', companycode: '', companyname: '', creditcode: '', creditname: '', title: '', rating: '', ratefwd: '', rate_type: '' }
          // companycode companyname creditcode creditname itype/ notice_date rate_type ratefwd rating ratingdate title
        ]
      },
      paginationData: {
        parentEvent: 'paginationSelect',
        page_Count: 0,
        total_Count: 0,
        current: 1
      },
      ratingDatePicker: {
        title: '评级日期：',
        parentEvent: 'ratingDateEvent',
      },
      startDatePicker: {
        title: '公告日期：',
        parentEvent: 'startDateEvent',
        defaultDate: new Date(oneDayAfter)
      },
      endDatePicker: {
        title: '至：',
        parentEvent: 'endDateEvent',
        defaultDate: new Date()
      },
      ratingNameData: { title: '评级机构名称：', parentEvent: 'ratingName', default: '全部', listWidth: 230, nowSelectWidth: 150, list: ['全部', '大公国际资信评估有限公司', '上海新世纪资信评估投资服务有限公司', '东方金诚国际信用评估有限公司', '联合信用评级有限公司', '联合资信评估有限公司', '中诚信证券评估有限公司', '鹏元资信评估有限公司'] },
    }
  },
  components: {
    // ratingChange,
    pullDownList,
    pagination,
    datePicker
  },
  methods: {
    query() {
      this.isQueryResult = false;
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
        const resultData = response.data.result;
        console.log(JSON.stringify(response.data))
        this.isQueryResult = true;
        this.tableData.tr = JSON.parse(JSON.stringify(resultData.result));
        console.log(resultData.total_count)
        if (resultData.total_count) {
          this.paginationData.page_Count = Math.ceil(resultData.total_count / 10);
        } else {
          this.paginationData.page_Count = 0;
        }
        this.paginationData.total_Count = resultData.total_count;

        console.log('债券 > 评级预警 >  评级信息', resultData);
      })
        .catch(err => {
          console.log(err);
        });
    },
    paginationSelect(pageNumber) {
      const sendData = JSON.parse(JSON.stringify(this.sendData));
      sendData.page = pageNumber - 1;
      console.log('sendData', sendData)
      this.$_axios.get(this.url, {
        params: sendData
      }).then(response => {
        const resultData = response.data.result;
        this.isQueryResult = true;
        this.tableData.tr = JSON.parse(JSON.stringify(resultData.result));
        console.log('债券 > 评级预警 >  评级信息', resultData);
      })
        .catch(err => {
          console.log(err);
        });
    },
    inputEvent() {
      this.queryCondition.companyname = commonMethods.checkName(this.queryCondition.companyname);
    },
    startDateEvent(...data) {
      this.queryCondition.start_date = data[0];
    },
    endDateEvent(...data) {
      this.queryCondition.end_date = data[0];
    },
    ratingDateEvent(...data) {
      this.queryCondition.ratingdate = data[0];
    },
    ratingName(...data) {
      console.log('allData:', data)
      if (data[0] === '全部') {
        this.queryCondition.creditname = '';
      } else {
        this.queryCondition.creditname = data[0];
      }
    }
  },
  mounted() {
    this.queryCondition.start_date = commonMethods.formatDateTime2(this.startDatePicker.defaultDate);
    this.queryCondition.end_date = commonMethods.formatDateTime2(this.endDatePicker.defaultDate);
  }
}
</script>

<style lang="less" scoped>
.floatLine {
  width: 1100px;
}
.floatLine2 {
  width: 770px;
}
.queryCondition-top .middle .queryBtn {
  margin-top: -15px;
  margin-left: 153px;
}
.queryResult {
  table {
    width: 100%;
    border-collapse: collapse;
    border-top: 2px solid #a9a9a9;
    background: #ffffff;
  }
  tbody {
    display: table-row-group;
    vertical-align: middle;
    border-color: inherit;
    th {
      border: 1px solid #797979;
      height: 40px;
      line-height: 40px;
      background-color: #f0f5f9;
    }
    td {
      border: 1px solid #797979;
      text-align: center;
      vertical-align: middle;
      padding-top: 30px;
      padding-bottom: 20px;
    }
    .title:nth-child(1) {
      width: 80px;
    }
    .title:nth-child(2) {
      width: 80px;
    }
    .title:nth-child(3) {
      width: 100px;
    }
    .title:nth-child(4) {
      width: 232px;
    }
    .title:nth-child(5) {
      width: 424px;
    }
    .title:nth-child(7) {
      width: 80px;
    }
    .title:nth-child(8) {
      width: 99px;
    }
  }
}
</style>
