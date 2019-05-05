<template>
  <div>
    <!-- 股票 > 股价异动预警 -->
    <div>
      <div class="queryCondition-top">
        <div class="queryCondition-title">自定义板块范围公告</div>
        <div class="middle clearFloat">
          <!-- 自定义模块 -->
          <div class="floatLeft">
            <pull-down-list :prop="modulesNameList" @modulesNameEvent='modulesNameEvent'></pull-down-list>
          </div>
          <!-- <div>
            <div class="floatLeft marginLeft10">
                <pull-down-list :prop="legislation" @legislationEvent='legislationEvent'></pull-down-list>
            </div>
          </div>   -->
          <!-- 公告类型 -->
          <!-- <div>
            <div class="floatLeft">
              <pull-down-listt :prop="legislationList" @legislationEvent2='legislationEvent2'></pull-down-listt>
            </div>
          </div> -->
          <div>
            <!-- 开始时间 -->
            <div class="floatLeft">
              <date-picker :prop="startDatePicker" @startDateEvent="startDateEvent"></date-picker>
            </div>
            <!-- 结束时间 -->
            <div class="floatLeft">
              <date-picker :prop="endDatePicker" @endDateEvent="endDateEvent"></date-picker>
            </div>
          </div>
          <!-- 测试用 -->
          <!-- 查询按钮 -->
          <div class="queryBtn">
            <span @click="query()">查询</span>
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
                <td>
                  <a target="_blank" :href="item.SOURCEURL">{{item.NOTICETITLE}}</a>
                </td>
                <td>{{item.NOTICEDATE}}</td>
                <!-- <td>
                  <button>
                    <router-link target='_blank' :to="'/monitor/homePage/fundDetail?id='+ item.infocode">详情>></router-link>
                  </button>
                </td> -->
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
import pullDownListt from '@/components/common/pullDownListt'
import pagination from '@/components/common/pagination'
import commonMethods from '@/common/common.js'
import datePicker from '@/components/common/datePicker'

export default {
  data() {
    const now = new Date();
    const week = now.getTime() - 604800000;
     const oneAfterday = now.getTime() + 86400000
    return {
      //url地址
      url: 'http://10.25.24.51:10189/api/risk/sector_set/detail',
      isShowQueryResult: false,
      hasResultData: false,
      resultData: null,
      queryType: '板块一',
      queryCondition: {
        action: 'query',
        userid: 'risk',
        sector: '',
        start_date: '',
        end_date: '',
        page: 1,
        page_size: 10,
      },
      data: {
        from_date: '',
        to_date: '',
        page: 1,
        page_size: 10,
        stock_list: ''
      },
      startDatePicker: {
        title: '公告日期：',
        parentEvent: 'startDateEvent',
        defaultDate: new Date(week)
      },
      endDatePicker: {
        title: '至：',
        parentEvent: 'endDateEvent',
        defaultDate: new Date(oneAfterday)
      },
      sendData: {},
      paginationData: {
        parentEvent: 'paginationSelect',
        page_Count: 0,
        total_Count: 0,
        current: 1
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
      listtemp: [
        {
          code: "002",
          content: "全部",
        },
        {
          code: "002001",
          content: "基金招募及设立",
        },
        {
          code: "002001001",
          content: "招募所明书"
        },
        {
          code: "002001002",
          content: "招募说明书更新"
        },
        {
          code: "002001003",
          content: "发行公告"
        },
        {
          code: "002001004",
          content: "基金募集期变动公告"
        },
        {
          code: "002001005",
          content: "发行结果公告"
        },
        {
          code: "002001006",
          content: "基金成立或基金合同生效报告"
        },
        {
          code: "002001007",
          content: "基金份额上市交易公告书"
        },
        {
          code: "002001008",
          content: "基金合同"
        },
        {
          code: "002001009",
          content: "其他发行事项公告"
        },
        {
          code: "002002",
          content: "基金定期报告",
        },
        {
          code: "002002001",
          content: "年度报告",
        },
        {
          code: "002002002",
          content: "半年度报告",
        },
        {
          code: "002002003",
          content: "季度报告"
        },
        {
          code: "002002004",
          content: "基金资产净值公告",
        },
        {
          code: "002002006",
          content: "其他报告",
        },
        {
          code: "002003",
          content: "基金当事人公告",
        },
        {
          code: "002003001",
          content: "基金管理人、基金托管人的重大人事变动",
        },
        {
          code: "002003002",
          content: "基金管理人股东及其出资比例发生变更",
        },
        {
          code: "002003003",
          content: "基金管理人、基金托管人或其高管人员受调查或处罚",
        },
        {
          code: "002003004",
          content: "重大诉讼、仲裁事项",
        },
        {
          code: "002003005",
          content: "基金管理人或基金托管人变更",
        },
        {
          code: "002003006",
          content: "基金管理人、基金托管人的法定名称、住所发生变更",
        },
        {
          code: "002003007",
          content: "基金改聘会计师事务所",
        },
        {
          code: "002003008",
          content: "代销机构变更",
        },
        {
          code: "002003009",
          content: "基金更换注册登记机构",
        },
        {
          code: "002003010",
          content: "重大关联交易事项",
        },
        {
          code: "002004",
          content: "基金运作公告",
        },
        {
          code: "002004001",
          content: "基金提前终止",
        },
        {
          code: "002004002",
          content: "延长基金合同期限",
        },
        {
          code: "002004004",
          content: "转换基金运作方式",
        },
        {
          code: "002004005",
          content: "基金高管变更",
        },
        {
          code: "002004006",
          content: "召开基金持有人大会的通知",
        },
        {
          code: "002004007",
          content: "基金份额持有人大会表决结果的公告",
        },
        {
          code: "002004008",
          content: "基金份额净值计价错误公告",
        },
        {
          code: "002004009",
          content: "基金费率",
        },
        {
          code: "002004012",
          content: "基金收益分配事项",
        },
        {
          code: "002004013",
          content: "申购及赎回事项",
        },
        {
          code: "002004014",
          content: "不定期折算",
        },
        {
          code: "002004015",
          content: "风险提示公告",
        },
        {
          code: "002005",
          content: "其他公告",
        },
        {
          code: "002005001",
          content: "澄清公告",
        },
        {
          code: "002005002",
          content: "基金其他公告",
        },
      ],
      titleData: ['公告标题', '公告日期'],
      dataList: [],
      legislationList: {
        title: '公告类型：',
        parentEvent: 'legislationEvent2',
        default: '全部',
        listWidth: 340,
        nowSelectWidth: 215,
        nowSelectHeight: 25,
        nowSelectFontSize: 13,
        list: [
          '全部',
          '基金招募及设立',
          '招募所明书',
          '招募说明书更新',
          '发行公告',
          '基金募集期变动公告',
          '发行结果公告',
          '基金成立或基金合同生效报告',
          '基金份额上市交易公告书',
          '基金合同',
          '其他发行事项公告',
          '基金定期报告',
          '年度报告',
          '半年度报告',
          '季度公告',
          '基金资产净值公告',
          '其他报告',
          '基金当事人公告',
          '基金管理人、基金托管人的重大人事变动',
          '基金管理人股东及其出资比例发生变更',
          '基金管理人、基金托管人或其高管人员受调查或处罚',
          '重大诉讼、仲裁事项',
          '基金管理人或基金托管人变更',
          '基金管理人、基金托管人的法定名称、住所发生变更',
          '基金改聘会计师事务所',
          '代销机构变更',
          '基金更换注册登记机构',
          '重大关联交易事项',
          '基金运作公告',
          '基金提前终止',
          '基金参与非公开发行',
          '基金估值方法调整',
          '延长基金合同期限',
          '转换基金运作方式',
          '基金高管变更',
          '召开基金持有人大会的通知',
          '基金份额持有人大会表决结果的公告',
          '基金份额净值计价错误公告',
          '基金费率',
          '基金收益分配事项',
          '申购及赎回事项',
          '不定期折算',
          '风险提示公告',
          '其他公告',
          '澄清公告',
          '基金其他公告'
        ]
      },
      legislation: {
        title: '自定义模块：',
        parentEvent: 'legislationEvent',
        default: '板块一',
        listWidth: 100,
        nowSelectWidth: 115,
        nowSelectHeight: 25,
        nowSelectFontSize: 13,
        list: [
          '板块一',
          '版块二'
        ]
      }
    }
  },
  components: {
    pullDownList,
    pagination,
    datePicker,
    pullDownListt
  },
  //获取板块名称 进入页面发送请求
  created() {
    console.log(this.queryCondition.notice_type)
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
  methods: {
    inputEvent() {
      const numberReg = /^[0-9]*$/;
      this.queryCondition.sec_code = commonMethods.checkName(this.queryCondition.sec_code.trim());
      let arr = this.queryCondition.sec_code.split('');
      let arr2 = [];
      arr.forEach(item => {
        if (numberReg.test(item)) {
          arr2.push(item)
        }
      });
      this.queryCondition.sec_code = arr2.join('');
    },
    //
    modulesNameEvent(...data) {
      this.sector = data[0];
      console.log(data[0])
      this.queryCondition.sector = data[0]
    },
    legislationEvent(data) {
      this.queryCondition.sector = data
    },
    legislationEvent2(data) {
      let code = this.listtemp.find(v => {
        return v.content === data;
      })
      console.log(code)
      this.queryCondition.notice_type = code.code;


    },
    paginationSelect(pageNumber) {
      const sendData = JSON.parse(JSON.stringify(this.data));
      sendData.page = pageNumber;
      const url = "http://10.25.24.51:10192/api/rest/nlp/risk/bond_announce";
      this.$_axios.get(url, {
        params: sendData
      }).then(response => {
        this.dataList = JSON.parse(JSON.stringify(response.data.result.Announce_List));
        this.resultData = this.dataList;
      })
        .catch(err => {
          // console.log(err);
        });
    },
    query() {
      const _year = 31536000000;
      const _startDate = new Date(this.queryCondition.start_date).getTime()
      const _endDate = new Date(this.queryCondition.end_date).getTime()

      console.log(this.queryCondition.sector)
      if (!this.queryCondition.sector) {
        alert('请选择模块名');
        return;
      }
      this.isShowQueryResult = true;
      this.hasResultData = false;
      this.sendData = JSON.parse(JSON.stringify(this.queryCondition));
      this.$_axios.get(this.url, {
        params: this.sendData
      }).then(response => {
        // 显示查询结果
        if (response.data.code == '410') {
          alert(response.data.msg)
          return;
        } else {
          // 显示查询结果
          this.dataList = JSON.parse(JSON.stringify(response.data.result.result))
          let stock_list = "";
          this.dataList.forEach(item => {
            stock_list += item.证券代码 + ",";
          });
          stock_list = stock_list.slice(0, -1);
          this.data.stock_list = stock_list;
          this.data.from_date = this.queryCondition.start_date;
          this.data.to_date = this.queryCondition.end_date;
          if (this.data.from_date == "") {
            delete this.data.from_date
          }
          if (this.data.to_date == "") {
            delete this.data.to_date
          }
          this.sendData = JSON.parse(JSON.stringify(this.data));
          const url = "http://10.25.24.51:10192/api/rest/nlp/risk/bond_announce";
          this.$_axios.get(url, { params: this.sendData }).then(response => {
            this.hasResultData = true;
            this.dataList = JSON.parse(JSON.stringify(response.data.result.Announce_List))
            this.resultData = this.dataList;
            this.dataList.forEach(item => {
              this.NOTICEDATE = this.NOTICEDATE;
              this.SOURCEURL = this.SOURCEURL;
              this.NOTICETITLE = this.NOTICETITLE;
            });
            this.paginationData.page_Count = response.data.result.Page_Count;
            this.paginationData.total_Count = response.data.result.Total_Count;
          });
        }
      })
      // .catch(err => {
      //   // console.log(err);
      // });
    },
    threshold() {
      let threshold = parseFloat(this.queryCondition.threshold);
      if (threshold.toString() === 'NaN' || threshold.toString() === 'Infinity' || threshold > 999999) {
        this.queryCondition.threshold = 0;
      } else {
        this.queryCondition.threshold = threshold;
      }
    },
    startDateEvent(...data) {
      this.queryCondition.start_date = data[0];
    },
    endDateEvent(...data) {
      this.queryCondition.end_date = data[0];
    },
  },


  mounted() {
    this.queryCondition.start_date = commonMethods.formatDateTime2(this.startDatePicker.defaultDate);
    this.queryCondition.end_date = commonMethods.formatDateTime2(this.endDatePicker.defaultDate);
  }
}
</script>

<style lang="less" >
.pullDownListBoxTwo {
  height: 500px;
  overflow-y: scroll;
}
.pullDownListContentTwo .pullDownListBoxTwo li:nth-child(3) {
  padding-left: 40px;
}
.pullDownListContentTwo .pullDownListBoxTwo li:nth-child(4) {
  padding-left: 40px;
}
.pullDownListContentTwo .pullDownListBoxTwo li:nth-child(5) {
  padding-left: 40px;
}
.pullDownListContentTwo .pullDownListBoxTwo li:nth-child(6) {
  padding-left: 40px;
}
.pullDownListContentTwo .pullDownListBoxTwo li:nth-child(7) {
  padding-left: 40px;
}
.pullDownListContentTwo .pullDownListBoxTwo li:nth-child(8) {
  padding-left: 40px;
}
.pullDownListContentTwo .pullDownListBoxTwo li:nth-child(9) {
  padding-left: 40px;
}
.pullDownListContentTwo .pullDownListBoxTwo li:nth-child(10) {
  padding-left: 40px;
}
.pullDownListContentTwo .pullDownListBoxTwo li:nth-child(11) {
  padding-left: 40px;
}

.pullDownListContentTwo .pullDownListBoxTwo li:nth-child(13) {
  padding-left: 40px;
}
.pullDownListContentTwo .pullDownListBoxTwo li:nth-child(14) {
  padding-left: 40px;
}
.pullDownListContentTwo .pullDownListBoxTwo li:nth-child(15) {
  padding-left: 40px;
}
.pullDownListContentTwo .pullDownListBoxTwo li:nth-child(16) {
  padding-left: 40px;
}
.pullDownListContentTwo .pullDownListBoxTwo li:nth-child(17) {
  padding-left: 40px;
}

.pullDownListContentTwo .pullDownListBoxTwo li:nth-child(19) {
  padding-left: 40px;
}
.pullDownListContentTwo .pullDownListBoxTwo li:nth-child(20) {
  padding-left: 40px;
}
.pullDownListContentTwo .pullDownListBoxTwo li:nth-child(21) {
  padding-left: 40px;
}
.pullDownListContentTwo .pullDownListBoxTwo li:nth-child(22) {
  padding-left: 40px;
}
.pullDownListContentTwo .pullDownListBoxTwo li:nth-child(23) {
  padding-left: 40px;
}
.pullDownListContentTwo .pullDownListBoxTwo li:nth-child(24) {
  padding-left: 40px;
}
.pullDownListContentTwo .pullDownListBoxTwo li:nth-child(25) {
  padding-left: 40px;
}
.pullDownListContentTwo .pullDownListBoxTwo li:nth-child(26) {
  padding-left: 40px;
}
.pullDownListContentTwo .pullDownListBoxTwo li:nth-child(27) {
  padding-left: 40px;
}
.pullDownListContentTwo .pullDownListBoxTwo li:nth-child(28) {
  padding-left: 40px;
}
.pullDownListContentTwo .pullDownListBoxTwo li:nth-child(30) {
  padding-left: 40px;
}

.pullDownListContentTwo .pullDownListBoxTwo li:nth-child(31) {
  padding-left: 40px;
}
.pullDownListContentTwo .pullDownListBoxTwo li:nth-child(32) {
  padding-left: 40px;
}
.pullDownListContentTwo .pullDownListBoxTwo li:nth-child(33) {
  padding-left: 40px;
}
.pullDownListContentTwo .pullDownListBoxTwo li:nth-child(34) {
  padding-left: 40px;
}
.pullDownListContentTwo .pullDownListBoxTwo li:nth-child(35) {
  padding-left: 40px;
}
.pullDownListContentTwo .pullDownListBoxTwo li:nth-child(36) {
  padding-left: 40px;
}
.pullDownListContentTwo .pullDownListBoxTwo li:nth-child(37) {
  padding-left: 40px;
}
.pullDownListContentTwo .pullDownListBoxTwo li:nth-child(38) {
  padding-left: 40px;
}
.pullDownListContentTwo .pullDownListBoxTwo li:nth-child(39) {
  padding-left: 40px;
}
.pullDownListContentTwo .pullDownListBoxTwo li:nth-child(40) {
  padding-left: 40px;
}
.pullDownListContentTwo .pullDownListBoxTwo li:nth-child(41) {
  padding-left: 40px;
}
.pullDownListContentTwo .pullDownListBoxTwo li:nth-child(42) {
  padding-left: 40px;
}
.pullDownListContentTwo .pullDownListBoxTwo li:nth-child(43) {
  padding-left: 40px;
}
.pullDownListContentTwo .pullDownListBoxTwo li:nth-child(45) {
  padding-left: 40px;
}
.pullDownListContentTwo .pullDownListBoxTwo li:nth-child(46) {
  padding-left: 40px;
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
.fallstop-left {
  margin-left: 20px;
  position: relative;
}
.dieting {
  position: absolute;
  top: 0px;
  right: -32px;
}
.queryDown {
  margin-left: 150px;
}
</style>
