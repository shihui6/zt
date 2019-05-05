<template>
  <div>
    <!-- 新三板 监管公开信息 > 自律监管措施 -->
    <div>
      <div class="queryCondition-top">
        <div class="queryCondition-title">自律监管措施</div>
        <!-- <p class="queryConditionType">按证券代码查询：</p> -->
        <div class="middle clearFloat">
          <!-- 查询条件框 -->
          <div>
            <div class="floatLeft">
              <date-picker :prop="startDatePicker" @startDateEvent="startDateEvent"></date-picker>
            </div>
            <div class="floatLeft">
              <date-picker :prop="endDatePicker" @endDateEvent="endDateEvent"></date-picker>
            </div>
            <!-- <div class="floatLeft">
              <pull-down-list :prop="pullDownListData" @pullDownListEvent='pullDownListEvent'></pull-down-list>
            </div> -->
            <div v-if="queryType == '按证券代码查询'" class="floatLeft">
              <div v-on:mouseleave="isShowDropDownList = false" class="floatLeft drop-down">
                公司名称/代码： <input type="text" v-model="nowEquityNo" @input="inputCode" placeholder="默认范围">
                <span v-if="isShowDropDownList" class="drop-down-box">
                  <span v-for="(item, index) of dropDownList" :key="index" @click="dropDownEvent(item)">{{item}}</span>
                </span>
              </div>
            </div>
            <div v-else class="floatLeft">
              <pull-down-list :prop="modulesNameList" @modulesNameEvent='modulesNameEvent'></pull-down-list>
            </div>
            <div class="floatLeft marginLeft20">
              <keyword @keywordEvent="keywordEvent"></keyword>
            </div>
          </div>
          <!-- 查询按钮 -->
          <div class="queryBtn">
            <span @click="query(queryType)">查询</span>
          </div>
        </div>
      </div>
      <!-- 查询结果 -->
      <div v-if="isQueryResult" class="queryResult">
        <table>
          <tbody>
            <tr>
              <th v-for="(item, index) of tableData.th" :key="index" class="title">
                {{item}}
              </th>
            </tr>
            <tr v-for="(item, index) of tableData.tr" :key="index">
              <td>{{item.equity_no}}</td>
              <td>{{item.equity_name}}</td>
              <td>
                <a :href="item.news_content" target="_bank">{{item.news_title}}</a>
              </td>
              <td>{{item.news_date}}</td>
              <td>{{item.pub_type}}</td>
            </tr>
          </tbody>
        </table>
        <pagination :prop="paginationData" @paginationSelect="paginationSelect"></pagination>
      </div>
    </div>
  </div>
</template>

<script>
import pullDownList from '@/components/common/pullDownList'
import pagination from '@/components/common/pagination'
import datePicker from '@/components/common/datePicker'
import commonMethods from '@/common/common.js'
import keyword from '@/components/common/keyword'
export default {
  data() {
    const _year = new Date().getTime() - 31536000000;
    // const oneDayAfter = new Date().getTime() - 86400000;
    return {
      url: 'http://10.25.24.51:10189/api/risk/neeq_pub_info1?',
      isQueryResult: false,
      queryType: '按证券代码查询',
      nowEquityNo: '',
      dropDownList: [],
      queryCondition: {
        keyword: '',
        start_date: '',
        end_date: '',
        equity_no: '',
        page: 0,
        page_size: 10
      },
      sector: '',
      sendData: {},
      paginationData: {
        parentEvent: 'paginationSelect',
        page_Count: 0,
        total_Count: 0,
        current: 1
      },
      pullDownListData: {
        title: '查询方式：',
        parentEvent: 'pullDownListEvent',
        default: '按证券代码查询',
        listWidth: 143,
        nowSelectWidth: 145,
        nowSelectHeight: 25,
        nowSelectFontSize: 13,
        list: [
          '按证券代码查询',
          '按自定义板块范围查询'
        ]
      },
      modulesNameList: {
        title: '板块名：',
        parentEvent: 'modulesNameEvent',
        default: '请选择',
        listWidth: 143,
        nowSelectWidth: 145,
        nowSelectHeight: 25,
        nowSelectFontSize: 13,
        list: []
      },
      startDatePicker: {
        title: '日期：',
        parentEvent: 'startDateEvent',
        defaultDate: new Date(_year)
      },
      endDatePicker: {
        title: '至：',
        parentEvent: 'endDateEvent',
        defaultDate: new Date()
      },
      tableData: {
        th: ['公司代码', '公司名称', '新闻标题', '新闻日期', '公告类型'],
        tr: []
      },
      codeDataList: [],
      isShowDropDownList: false
    }
  },
  components: {
    pagination,
    datePicker,
    keyword,
    pullDownList
  },
  methods: {
    inputCode() {
      let keyword = commonMethods.checkName(this.nowEquityNo);
      this.nowEquityNo = keyword;

      let nowNumber = parseInt(this.nowEquityNo);
      // 输入数字过大
      if (nowNumber > 999999) {
        // this.nowEquityNo = '';
      } else if (this.nowEquityNo.toString().length > 0) {
        const tempArr = [];
        this.isShowDropDownList = true;
        this.codeDataList.forEach(item => {
          if (item.indexOf(this.nowEquityNo.toString()) !== -1) {
            tempArr.push(item);
          }
        });
        this.dropDownList = tempArr.slice(0, 5);
      }
    },
    inputEvent() {
      this.queryCondition2.sector = commonMethods.checkName(this.queryCondition2.sector.trim());
    },
    dropDownEvent(item) {
      this.nowEquityNo = item;
      this.queryCondition.equity_no = item.split(' ')[0];
      this.isShowDropDownList = false;
    },
    query(queryType) {
      this.isQueryResult = false;
      this.isShowDropDownList = false;

      const tempArr = [];
      if (this.nowEquityNo) {
        this.codeDataList.forEach(item => {
          if (item.indexOf(this.nowEquityNo.toString()) !== -1) {
            tempArr.push(item);
          }
        });
        if (tempArr.length) {
          this.queryCondition.equity_no = tempArr[0].split(' ')[0];
        } else {
          console.log(this.nowEquityNo);
          if (this.nowEquityNo == '000000') {
            this.queryCondition.equity_no = '000000'
          } else {
            console.log(this.nowEquityNo);
            alert('代码错误或名称错误');
            return;
          }
        }
      } else {
        this.queryCondition.equity_no = '';
      }
      if (queryType == '按证券代码查询') {
        this.sendData = JSON.parse(JSON.stringify(this.queryCondition));
        this.url = 'http://10.25.24.51:10189/api/risk/neeq_pub_info1';
        this.sector = '';
      } else {
        this.sendData = {
          start_date: this.queryCondition.start_date,
          end_date: this.queryCondition.end_date,
          page: this.queryCondition.page,
          page_size: this.queryCondition.page_size,
          keyword: this.queryCondition.keyword,
          sector: this.sector,
          userid: 'risk',
        }
        if (!this.sector) {
          alert('请选择板块');
          return;
        }
        this.url = 'http://10.25.24.51:10189/api/risk/neeq_pub_sector1';
      }
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
        this.isQueryResult = true;
        console.log('自律监管措施', resultData);
        this.tableData.tr = JSON.parse(JSON.stringify(resultData.neeq_pub));
        if (resultData.total_count) {
          this.paginationData.page_Count = Math.ceil(resultData.total_count / 10);
        } else {
          this.paginationData.page_Count = 0;
        }
        this.paginationData.total_Count = resultData.total_count;


      })
        .catch(err => {
          console.log(err);
        });
    },
    paginationSelect(pageNumber) {
      this.isShowDropDownList = false;
      const sendData = JSON.parse(JSON.stringify(this.sendData));
      sendData.page = pageNumber - 1;
      console.log('sendData', sendData)
      this.$_axios.get(this.url, {
        params: sendData
      }).then(response => {
        const resultData = response.data.result;
        this.isQueryResult = true;
        console.log('自律监管措施', resultData);
        this.tableData.tr = JSON.parse(JSON.stringify(resultData.neeq_pub));
      })
        .catch(err => {
          console.log(err);
        });
    },
    pullDownListEvent(...data) {
      this.queryType = data[0];
      this.moduleInit();
    },
    modulesNameEvent(...data) {
      this.sector = data[0];
    },
    keywordEvent(...data) {
      this.queryCondition.keyword = data[0];
    },
    startDateEvent(...data) {
      this.queryCondition.start_date = data[0];
    },
    endDateEvent(...data) {
      this.queryCondition.end_date = data[0];
    },
    moduleInit() {
      const url = 'http://10.25.24.51:10189/api/risk/sector_set/query'
      const sendData = {
        userid: 'risk'
      };
      this.$_axios.get(url, {
        params: sendData
      }).then((response) => {
        if (!response.data) {
          this.modulesNameList.list = [];
          this.modulesNameList.default = '没有可选择板块';
          this.sector = '';
        } else {
          if (response.data.code == '0') {
            console.log(response.data.sectorlist)
            this.modulesNameList.list = JSON.parse(JSON.stringify(response.data.sectorlist));
            this.modulesNameList.default = response.data.sectorlist[0];
            this.sector = response.data.sectorlist[0];
          } else {
            this.modulesNameList.list = [];
            this.modulesNameList.default = '没有可选择板块';
            this.sector = '';
          }
        }
      }).catch((err) => {

      });
    },
  },
  mounted() {
    this.queryCondition.start_date = commonMethods.formatDateTime2(this.startDatePicker.defaultDate);
    this.queryCondition.end_date = commonMethods.formatDateTime2(this.endDatePicker.defaultDate);
    this.moduleInit();
    this.codeDataList = this.$store.state.codeDataList_N;
    // const url = 'http://10.25.24.51:10193/api/risk/code_name_info';
    // const sendData = {
    //   security_type: 'N'
    // }
    // this.$_axios.get(url,{
    //     params:sendData
    //   }).then(response => {
    //     const resultData = response.data;
    //     if(resultData.msg === 'query success'){
    //       this.codeDataList = JSON.parse(JSON.stringify(resultData.result.securitycodelist));
    //     }
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  }
}
</script>

<style lang="less" scoped>
.drop-down {
  position: relative;
  .drop-down-box {
    position: absolute;
    top: 24px;
    left: 106px;
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
  margin-top: 20px;
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
      height: 40px;
      line-height: 40px;
      border: 1px solid #797979;
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
      width: 100px;
    }
    .title:nth-child(2) {
      width: 100px;
    }
    .title:nth-child(4) {
      width: 100px;
    }
    .title:nth-child(5) {
      width: 100px;
    }
  }
}
</style>
