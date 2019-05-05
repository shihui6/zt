<template>
  <div>
    <!-- 股票 > 股价异动预警 -->
    <div>
      <div class="queryCondition-top">
        <div class="queryCondition-title">股价异动</div>
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
              <pull-down-list :prop="pullDownListData" @pullDownListEvent='pullDownListEvent'></pull-down-list>
            </div>
            <div v-if="queryType == '按证券代码'" class="floatLeft">
              <div v-on:mouseleave="isShowDropDownList = false" class="floatLeft drop-down">
                <!-- 证券代码位置 -->
                证券代码： <input type="text" v-model="nowEquityNo" @input="inputCode" placeholder="默认范围">
                <!-- <span v-if="isShowDropDownList" class="drop-down-box">
                  <span v-for="(item, index) of dropDownList" :key="index" @click="dropDownEvent(item)">{{item}}</span>
                </span> -->
              </div>
            </div>
            <!-- 板块名 -->
            <div v-else class="floatLeft">
              <pull-down-list :prop="modulesNameList" @modulesNameEvent='modulesNameEvent'></pull-down-list>
            </div>
            <!-- <div class="floatLeft marginLeft10">
              证券代码：<input @input="inputEvent" v-model="queryCondition.sec_code" type="text">
            </div> -->
          </div>
          <div>
            <div class="floatLeft">
              <pull-down-list :prop="legislationList" @legislationEvent='legislationEvent'></pull-down-list>
            </div>
            <div v-if="queryCondition.abnormal_type === 2" class="threshold floatLeft marginLeft10">
              震荡阈值：<input v-model="queryCondition.threshold" @input="threshold" type="text">
            </div>
          </div>

          <!-- 连续跌停信息 -->
          <div class="fallstop-left" v-if="queryCondition.abnormal_type !== 2">
            
            <pull-down-list :prop="selectList" @selectListEvent='selectListEvent'></pull-down-list>
            <span class="dieting">天跌停</span>
          </div>
          <!-- 查询按钮 -->
          <div class="queryBtn">
            <span @click="query(queryType)">查询</span>
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
                <td>{{item.tradedate}}</td>
                <td>{{item.securitycode}}</td>
                <td>{{item.securityname}}</td>
                <td>{{item.lclose}}</td>
                <td>{{item.open}}</td>
                <td>{{item.high}}</td>
                <td>{{item.low}}</td>
                <td>{{item.tvol}}</td>
                <td>{{item.tvalcny}}</td>
                <td>{{item.chg}}</td>
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

export default {
  data() {
    const now = new Date();
    const week = now.getTime() - 604800000;
    return {
      url: 'http://10.25.24.51:10193/api/risk/abnormal_price',
      isShowQueryResult: false,
      queryType: '按证券代码',
      isShowDropDownList: false,
      hasResultData: false,
      dropDownList: [],
      codeDataList: [],
      nowEquityNo: '',
      resultData: null,
      queryCondition: {
        sec_code: '',
        abnormal_type: 1,
        threshold: 1,
        start_date: '',
        end_date: '',
        page: 0,
        page_size: 10,
      },
      selectList: {
        title: '连续',
        parentEvent: 'selectListEvent',
        default: '1',
        listWidth: 40,
        nowSelectWidth: 42,
        nowSelectHeight: 25,
        nowSelectFontSize: 13,
        list: [
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
          '10',
          '11',
          '12',
          '13',
          '14',
          '15',
          '16',
          '17',
          '18',
          '19',
          '20',
        ]
      },
      startDatePicker: {
        title: '日期：',
        parentEvent: 'startDateEvent',
        defaultDate: new Date(week)
      },
      endDatePicker: {
        title: '至：',
        parentEvent: 'endDateEvent',
        defaultDate: new Date()
      },
      sendData: {},
      paginationData: {
        parentEvent: 'paginationSelect',
        page_Count: 0,
        total_Count: 0,
        current: 1
      },
      titleData: ['交易日期', '证券代码', '证券简称', '昨日收盘', '今日开盘', '最高成交', '最低成交', '成交数量', '成交金额', '涨跌幅'],
      dataList: [],
      legislationList: {
        title: '异动分类：',
        parentEvent: 'legislationEvent',
        default: '股价跌停',
        listWidth: 108,
        nowSelectWidth: 110,
        nowSelectHeight: 25,
        nowSelectFontSize: 13,
        list: [
          '股价跌停',
          '大幅震荡',
        ]
      },
      pullDownListData: {
        title: '查询方式：',
        parentEvent: 'pullDownListEvent',
        default: '按证券代码',
        listWidth: 143,
        nowSelectWidth: 145,
        nowSelectHeight: 25,
        nowSelectFontSize: 13,
        list: [
          '按证券代码',
          '按自定义板块'
        ]
      },
      modulesNameList: {
        title: '板块名：',
        parentEvent: 'modulesNameEvent',
        default: '请选择',
        listWidth: 100,
        nowSelectWidth: 102,
        nowSelectHeight: 25,
        nowSelectFontSize: 13,
        list: []
      },
    }
  },
  components: {
    pullDownList,
    pagination,
    datePicker
  },
  created(){
      const url = 'http://10.25.24.51:10189/api/risk/sector_set/query'
      const sendData = {
        userid: 'risk'
      };
      console.log(sendData)
      this.$_axios.get(url, {
        params: sendData
      }).then((response) => {
        if (!response.data) {
          this.modulesNameList.list = [];
          this.modulesNameList.default = '没有可选择板块';
          this.queryCondition.sector = '';
        } else {
          if (response.data.code == '0') {
            console.log(response.data.sectorlist)
            this.modulesNameList.list = JSON.parse(JSON.stringify(response.data.sectorlist));
            this.modulesNameList.default = response.data.sectorlist[0];
            this.queryCondition.sector = response.data.sectorlist[0];
          } else {
            this.modulesNameList.list = [];
            this.modulesNameList.default = '没有可选择板块';
            this.queryCondition.sector = '';
          }
        }
      }).catch((err) => {

      });
  },
  methods: {
    inputCode() {
      let keyword = commonMethods.checkName(this.nowEquityNo);
      this.nowEquityNo = keyword;
      console.log(keyword)
      this.queryCondition.sec_code = keyword

      let nowNumber = parseInt(this.nowEquityNo);
      // 输入数字过大
      // if (nowNumber > 999999) {
      //   // this.nowEquityNo = '';
      // } else if (this.nowEquityNo.toString().length > 0) {
      //   const tempArr = [];
      //   this.isShowDropDownList = true;
      //   this.codeDataList.forEach(item => {
      //     if (item.indexOf(this.nowEquityNo.toString()) !== -1) {
      //       tempArr.push(item);
      //     }
      //   });
      //   this.dropDownList = tempArr.slice(0, 5);
      // }
    },
    dropDownEvent(item) {
      console.log(item)
      this.nowEquityNo = item;
      this.queryCondition.equity_no = item.split(' ')[0];
      console.log(this.queryCondition.equity_no)
      this.isShowDropDownList = false;
    },
    selectListEvent(...data) {
      this.queryCondition.threshold = data[0];
    },
    modulesNameEvent(...data) {
      this.sector = data[0];
      this.queryCondition.sector = this.sector
      console.log(data[0])
    },
    inputEvent() {
      const numberReg = /^[0-9]*$/;
      this.queryCondition.sec_code = commonMethods.checkName(this.queryCondition.sec_code.trim());
      let arr = this.queryCondition.sec_code.split('');
      let arr2 = [];
      console.log(arr)
      arr.forEach(item => {
        if (numberReg.test(item)) {
          arr2.push(item)
        }
      });
      console.log(arr)
      this.queryCondition.sec_code = arr2.join('');
    },
    pullDownListEvent(...data) {
      this.queryType = data[0];
      // this.moduleInit();
    },
    legislationEvent(...data) {
      if (data[0] === '股价跌停') {
        this.queryCondition.threshold = '';
        this.queryCondition.abnormal_type = 1;
      } else {
        this.queryCondition.threshold = 5;
        this.queryCondition.abnormal_type = 2;
      }
    },
    paginationSelect(pageNumber) {
      const sendData = JSON.parse(JSON.stringify(this.sendData));
      sendData.page = pageNumber - 1;
      console.log('sendData', sendData)
      this.$_axios.get(this.url, {
        params: sendData
      }).then(response => {
        console.log('股票 > 股价异动预警', response.data.result);
        this.dataList = JSON.parse(JSON.stringify(response.data.result.result));
        this.resultData = response.data.result;
      })
        .catch(err => {
          console.log(err);
        });
    },
    query(queryType) {
      const _year = 31536000000;
      const _startDate = new Date(this.queryCondition.start_date).getTime()
      const _endDate = new Date(this.queryCondition.end_date).getTime()
      // console.log(new Date(this.queryCondition.end_date))

      if (!this.queryCondition.start_date || !this.queryCondition.end_date) {
        alert('请输入日期时间段');
        return;
      }
      if (!this.queryCondition.sec_code.length) {
        if (_endDate - _startDate > 31536000000) {
          alert('未选定证券代码，仅可查询最近一年的数据');
          return;
        }
      }
      if(this.queryCondition.threshold > 1){
        if(_endDate - _startDate > 2592000000){
          alert("仅可查询不超过一个月间隔的连续跌停");
          return;
        }
      }

      //添加查询方式代码
      // const tempArr = [];
      // if (this.nowEquityNo) {
      //   this.codeDataList.forEach(item => {
      //     if (item.indexOf(this.nowEquityNo.toString()) !== -1) {
      //       tempArr.push(item);
      //     }
      //   });
      //   if (tempArr.length) {
      //     this.queryCondition.equity_no = tempArr[0].split(' ')[0];
      //   } else {
      //     console.log(this.nowEquityNo);
      //     if (this.nowEquityNo == '000000') {
      //       this.queryCondition.equity_no = '000000'
      //     } else {
      //       console.log(this.nowEquityNo);
      //       alert('代码错误或名称错误');
      //       return;
      //     }
      //   }
      // } else {
      //   this.queryCondition.equity_no = '';
      // }
      //       queryCondition: {
      //   sec_code: '',
      //   abnormal_type: 1,
      //   threshold: 1,
      //   start_date: '',
      //   end_date: '',
      //   page: 0,
      //   page_size: 10,
      // },
      if (queryType == '按证券代码') {
        this.queryCondition.userid = ''
        this.sendData = JSON.parse(JSON.stringify(this.queryCondition));
        this.url = 'http://10.25.24.51:10193/api/risk/abnormal_price';
        this.sector = '';
      } else {
        this.queryCondition.userid = 'risk'
        this.sendData = {
          start_date: this.queryCondition.start_date,
          end_date: this.queryCondition.end_date,
          page: this.queryCondition.page,
          page_size: this.queryCondition.page_size,
          abnormal_type: this.queryCondition.abnormal_type,
          threshold: this.queryCondition.threshold,
          sector: this.queryCondition.sector,
          userid: this.queryCondition.userid,
        }
        if (!this.queryCondition.sector) {
          alert('请选择板块');
          return;
        }
        this.url = 'http://10.25.24.51:10193/api/risk/abnormal_price_sector';
      }
      for (let key in this.sendData) {
        if (this.sendData[key] === '') {
          delete this.sendData[key];
        }
      }
  
      this.isShowQueryResult = true;
      this.hasResultData = false;
      this.sendData = this.selectList.parentEvent;
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
        console.log('股票 > 股价异动预警', response.data.result);
        this.dataList = JSON.parse(JSON.stringify(response.data.result.result));
        this.resultData = response.data.result;
        if (this.resultData.total_count) {
          this.paginationData.page_Count = Math.ceil(this.resultData.total_count / 10);
        } else {
          this.paginationData.page_Count = 0;
        }
        this.paginationData.total_Count = this.resultData.total_count;
      })
        .catch(err => {
          console.log(err);
        });
    },
    threshold() {
      let threshold = parseFloat(this.queryCondition.threshold);
      console.log(threshold)
      if (threshold.toString() === 'NaN' || threshold.toString() === 'Infinity' || threshold > 999999) {
        this.queryCondition.threshold = 0;
      } else {
        this.queryCondition.threshold = threshold;
      }
    },
    startDateEvent(...data) {
      this.queryCondition.start_date = data[0];
      console.log(data[0])
    },
    endDateEvent(...data) {
      this.queryCondition.end_date = data[0];
      console.log(data[0])
    },
  },
  mounted() {
    this.queryCondition.start_date = commonMethods.formatDateTime2(this.startDatePicker.defaultDate);
    this.queryCondition.end_date = commonMethods.formatDateTime2(new Date());
    this.codeDataList = this.$store.state.codeDataList_N;
  }
}
</script>

<style lang="less" scoped>
.drop-down {
  position: relative;
  .drop-down-box {
    position: absolute;
    top: 24px;
    left: 75px;
    width: 130px;
    border: 1px solid #797979;
    background-color: #fff;
    span {
      float: left;
      width: 130px;
      cursor: pointer;
    }
    span:hover {
      background-color: rgb(136, 179, 180);
    }
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
      width: 145px;
    }
    .tableTh:nth-child(2) {
      width: 80px;
    }
    .tableTh:nth-child(3) {
      width: 90px;
    }
    .tableTh:nth-child(4) {
      width: 90px;
    }
  }
}
.fallstop-left{
  margin-left: 20px;
  position: relative;
}
.dieting{
  position: absolute;
  top: 0px;
  right: -44px;
}
</style>
