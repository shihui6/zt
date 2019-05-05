<template>
  <div>
    <!-- 债券 > 评级预警 >  评级变动 -->
    <div class="queryCondition-top">
      <div class="queryCondition-title">评级变动</div>
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
            <date-picker :prop="changeDatePicker" @changeDateEvent="changeDateEvent"></date-picker>
          </div>
            <div class="floatLeft marginLeft10">
              债券代码：<input @input="inputEvent" v-model="queryCondition.securitycode" type="text">
            </div>
        </div>

        <div class="clearFloat">
          <div class="floatLeft">
            <pull-down-list :prop="changeDirection" @changeEvent="changeEvent"></pull-down-list>
          </div>
          <div class="floatLeft">
            <pull-down-list :prop="ratingNameData" @ratingName="ratingName"></pull-down-list>
          </div>
        </div>
        <!-- 查询按钮 -->
        <div class="queryBtn">
          <span @click="query" class="chaxun">查询</span>
        </div>
      </div>
    </div>
    <!-- 查询结果 -->
    <div v-if="isQueryResult">
      <div class="queryResult">
        <table>
          <tbody>
            <tr>
              <th v-for="(item, index) of tableData.th" :key="index" class="title">{{item}}</th>
            </tr>
            <tr v-for="(item, index) of tableData.tr" :key="index">
              <td>{{item.notice_date}}</td>
              <td>{{item.changedate}}</td>
              <td>{{item.creditname}}</td>
              <td @click="portfoliocodeDetails(item)" class="portfoliocode">{{item.portfoliocode}}</td>
              <td>{{item.ratefwd}}</td>
              <td>{{item.rating}}</td>
              <td>{{item.ratingtype}}</td>
              <td>{{item.changeway}}</td>
              <td class="data-content">{{item.reason}}
                <span @click="details(item, index)">{{item.details}}</span>
              </td>
              <td>{{item.companyname}}</td>
              <td>{{item.recently_rating}}</td>
            </tr>
          </tbody>
        </table>
        <pagination :prop="paginationData" @paginationSelect="paginationSelect"></pagination>
      </div>
    </div>
    <div v-if="isShowDetails" class="detailsPopUp">
      <div class="detailsBox">
        <div class="details">
      <div class="queryResult">
        <table>
          <tbody>
            <tr>
              <th v-for="(item, index) of detailsDatat" :key="index" class="title">{{item}}</th>
            </tr>
            <tr v-for="(item, index) of detailsData" :key="index">
              <td>{{item.securitysname}}</td>
              <td>{{item.securityname}}</td>
              <td>{{item.securitycode}}</td>
              <td>{{item.securitytype}}</td>
              <td>{{item.issuetype}}</td>
              <td>{{item.portfoliocode}}</td>
            </tr>
          </tbody>
        </table>
      </div>
          <!-- <ul>
            <li>债券名称：{{detailsData.securitysname}}</li>
            <li>债券全称：{{detailsData.securityname}}</li>
            <li>债券代码：{{detailsData.securitycode}}</li>
            <li>债券类型：{{detailsData.securitytype}}</li>
            <li>募集方式：{{detailsData.issuetype}}</li>
            <li>债券组合代码：{{detailsData.portfoliocode}}</li>
          </ul> -->
        </div>
        <span @click="closeDetails" class="closeBtn">×</span>
      </div>
    </div>
  </div>
</template>

<script>
import ratingChange from '@/components/common/ratingChangeList'
import pullDownList from '@/components/common/pullDownList'
import pagination from '@/components/common/pagination'
import datePicker from '@/components/common/datePicker'
import commonMethods from '@/common/common.js'
export default {
  data() {
    const oneDayAfter = new Date().getTime() - 86400000;
    return {
      url: 'http://10.25.24.51:10193/api/risk/bond_rate_change?',
      isQueryResult: false,
      isShowDetails: false,
      ratingChangeData: [],
      queryCondition: {
        start_date: '',
        end_date: '',
        changedate: '',
        changeway: '',
        creditname: '',
        securitycode:'',
        page: 0,
        pagesize: 10
      },
      sendData: {},
      detailsData: {},
      detailsDatat:['债券名称','债券全称','债券代码','债券类型','募集方式','债券组合代码'],
      tableData: {
        th: ['公告日期', '变动日期', '评级机构名称', '关联债券代码', '评级展望', '信用评级', '评级类型', '评级变动方向', '变动原因', '机构名称', '最近评级'],
        tr: [
          { notice_date: '', changedate: '', creditcode: '', creditname: '', portfoliocode: '', ratefwd: '', rating: '', ratingstyle: '', ratingtype: '', changeway: '', reason: '' }
          //  变动日期changedate changeway creditcode creditname notice_date portfoliocode ratefwd rating ratingstyle ratingtype reason
        ]
      },
      paginationData: {
        parentEvent: 'paginationSelect',
        page_Count: 0,
        total_Count: 0,
        current: 1
      },
      changeDatePicker: {
        title: '变动日期：',
        parentEvent: 'changeDateEvent',

      },
      startDatePicker: {
        title: '披露日期：',
        parentEvent: 'startDateEvent',
        defaultDate: new Date(oneDayAfter)
      },
      endDatePicker: {
        title: '至：',
        parentEvent: 'endDateEvent',
        defaultDate: new Date()
      },
      ratingNameData: { title: '评级机构名称：', parentEvent: 'ratingName', default: '全部', listWidth: 230, nowSelectWidth: 150, list: ['全部', '大公国际资信评估有限公司', '上海新世纪资信评估投资服务有限公司', '东方金诚国际信用评估有限公司', '联合信用评级有限公司', '联合资信评估有限公司', '中诚信证券评估有限公司', '鹏元资信评估有限公司'] },
      changeDirection: { title: '评级变动方向：', parentEvent: 'changeEvent', default: '全部', listWidth: 150, nowSelectWidth: 150, list: ['全部', '下调', '维持', '上调', '首次', '撤销'] },
    }
  },
  components: {
    ratingChange,
    pullDownList,
    pagination,
    datePicker
  },
  methods: {
    inputEvent() {
      const numberReg = /^[0-9]*$/;
      this.queryCondition.securitycode = commonMethods.checkName(this.queryCondition.securitycode.trim());
      let arr = this.queryCondition.securitycode.split('');
      let arr2 = [];
      console.log(arr)
      arr.forEach(item => {
        if (numberReg.test(item)) {
          arr2.push(item)
        }
      });
      console.log(arr)
      this.queryCondition.securitycode = arr2.join('');
    },
    query() {
      this.isQueryResult = false;
      this.sendData = JSON.parse(JSON.stringify(this.queryCondition));
      // for (let key in this.sendData) {
      //   if (this.sendData[key] === '') {
      //     delete this.sendData[key];
      //   }
      // }
      console.log('sendData', this.sendData)
      this.sendData.changeway = this.queryCondition.changeway;
      this.$_axios.get(this.url, {
        params: this.sendData
      }).then(response => {
        const resultData = response.data.result;
        console.log(JSON.stringify(response.data))
        this.isQueryResult = true;
        this.dataList = resultData.result;
        this.tableData.tr = JSON.parse(JSON.stringify(this.dataList));
        this.tableData.tr.forEach(item => {
          if (item.reason && item.reason.length > 35) {
            item.reason = item.reason.slice(0, 35) + '...';
            item.details = '...详情';
          }
        });
        this.paginationData.total_Count = resultData.total_count;
        if (resultData.total_count) {
          this.paginationData.page_Count = Math.ceil(resultData.total_count / 10);
        } else {
          this.paginationData.page_Count = 0;
        }
        console.log('债券 > 评级预警 >  评级变动', resultData);
      })
        .catch(err => {
          console.log('请求失败');
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
        this.dataList = resultData.result;
        this.tableData.tr = JSON.parse(JSON.stringify(this.dataList));
        this.tableData.tr.forEach(item => {
          if (item.reason && item.reason.length > 35) {
            item.reason = item.reason.slice(0, 35) + '...';
            item.details = '...详情';
          }
        });
        console.log('债券 > 评级预警 >  评级变动', resultData);
      })
        .catch(err => {
          console.log('请求失败');
        });
    },
    ratingName(...data) {
      console.log('allData:', data)
      if (data[0] === '全部') {
        this.queryCondition.creditname = '';
      } else {
        this.queryCondition.creditname = data[0];
      }
    },
    changeEvent(...data) {
      console.log('allData:', data)
      // '下调', '维持', '上调', '首次', '撤销'
      switch (data[0]) {
        case '下调':
          this.queryCondition.changeway = '03';
          break;
        case '维持':
          this.queryCondition.changeway = '01';
          break;
        case '上调':
          this.queryCondition.changeway = '02';
          break;
        case '首次':
          this.queryCondition.changeway = '04';
          break;
        case '撤销':
          this.queryCondition.changeway = '05';
          break;
        default:
          this.queryCondition.changeway = '';
          break;
      }
    },
    portfoliocodeDetails(item) {
      this.isShowDetails = false;
      let url = 'http://10.25.24.51:10193/api/risk/bond_base_detail?'
        + 'portfoliocode=' + item.portfoliocode;
      this.$_axios.get(url)
        .then(response => {
          this.isShowDetails = true;
          const resultData = response.data.result;
          this.detailsData = JSON.parse(JSON.stringify(resultData.result));
          console.log(resultData)

        })
        .catch(err => {
          console.log(err);
        });
    },
    details(item, index) {
      if (item.details == '收起') {
        item.details = '...详情';
        item.reason = item.reason.slice(0, 35) + '...';
      } else {
        item.details = '收起';
        item.reason = this.dataList[index].reason;
      }
    },
    closeDetails() {
      this.isShowDetails = false;
      this.detailsData = {};
    },
    startDateEvent(...data) {
      this.queryCondition.start_date = data[0];
    },
    endDateEvent(...data) {
      this.queryCondition.end_date = data[0];
    },
    changeDateEvent(...data) {
      this.queryCondition.changedate = data[0];
    },
  },
  mounted() {
    this.queryCondition.changeway = '';
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
    .portfoliocode {
      cursor: pointer;
      text-decoration: underline;
    }
    .title:nth-child(1),
    .title:nth-child(2) {
      width: 80px;
    }
    .title:nth-child(3) {
      width: 85px;
    }
    .title:nth-child(4) {
      width: 123px;
    }
    .title:nth-child(5),
    .title:nth-child(6) {
      width: 86px;
    }
    .title:nth-child(7) {
      width: 95px;
    }
    .title:nth-child(8) {
      width: 85px;
    }
    .title:nth-child(9) {
      width: 200px;
    }
    .title:nth-child(10) {
      // width: 200px;
    }
    .title:nth-child(11) {
      width: 70px;
    }
  }
}
.chaxun{
  margin-left:119px;
  margin-top:-8px;
}
.detailsPopUp {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  border: 1px solid #797979;
  word-break: break-all;
  word-wrap: break-word;
  background-color: #fff;
  z-index: 3;
  .detailsBox {
    position: relative;
    width: 630px;
    margin-left: auto;
    margin-right: auto;
    .details {
      position: absolute;
      top: 100px;
      right: 0;
      bottom: 0;
      left: 100px;
      margin: auto;
    }
    .closeBtn {
      position: absolute;
      right: -50px;
      top: 30px;
      font-size: 40px;
      cursor: pointer;
    }
  }
}
</style>
