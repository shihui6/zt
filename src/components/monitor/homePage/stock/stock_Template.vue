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
        <div>
            <div class="floatLeft">
              <pull-down-listtt :prop="legislationList" @legislationEvent2='legislationEvent2'></pull-down-listtt>
            </div>
          </div>
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
                <td><a target="_blank" :href="item.sourceurl">{{item.noticetitle}}</a></td>
                <td>{{item.noticedate}}</td>
                <td><button><router-link  target='_blank' :to="'/monitor/homePage/fundDetailtwo?id='+ item.infocode">详情>></router-link></button></td>
              </tr>
            </tbody>
          </table>
          <pagination :prop="paginationData" @paginationSelect="paginationSelect"></pagination>
        </div>
        <!-- <div v-else>
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
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import pullDownList from '@/components/common/pullDownList'
import pullDownListtt from '@/components/common/pullDownListtt'
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
      url: 'http://10.25.24.51:10193/api/risk/stock_announce_sector',
      isShowQueryResult: false,
      hasResultData: false,
      resultData: null,
      queryType: '板块一',
      queryCondition: {
        userid: 'risk',  
        sector: '',
        notice_type: '001',
        start_date: '',
        end_date: '',
        page: 0,
        pagesize: 10,
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
      listtemp:[
          {
            code:"001",
            content:"股票",
          },
          {
            code:"001001",
            content:"定期报告",
          },
          {                                                          
            code:"001001001",
            content:"定期报告（中文）"
          },             
          {
            code:"001001001001",
            content:"年度报告"
          },  
          {
            code:"001001001002",
            content:"半年度报告"
          },
          {
            code:"001001001003",
            content:"一季度报告"
          },
          {
            code:"001001001004",
            content:"三季度报告"
          },
          {
            code:"001001001005",
            content:"财务报告"
          },
          {
            code:"001001002002",
            content:"年度报告（英文）"
          },
          {
            code:"001001002003",
            content:"半年度报告（英文）"
          },
          {
            code:"001001002004",
            content:"一季度报告（英文）"
          },
          {
            code:"001001002005",
            content:"三季度报告（英文）",
          },
          {
            code:"001002",
            content:"临时公告",
          },
          {
            code:"001002001",
            content:"融资公告",
          },
          {
            code:"001002001001",
            content:"首发"
          },
          {
            code:"001002001002",
            content:"增发",
          },
          {
            code:"001002001003",
            content:"配股",
          },
          {
            code:"001002001004",
            content:"权证",
          },
          {
            code:"001002002",
            content:"权益分配及变动",
          },
          {
            code:"001002003",
            content:"股东大会相关",
          },
          {
            code:"001002004",
            content:"风险提示相关",
          },
          {
            code:"001002005",
            content:"基本信息变更",
          },
          {
            code:"001002006",
            content:"经营事项相关",
          },
          {
            code:"001002007",
            content:"重大事项相关",
          },
          {
            code:"001002008",
            content:"其他",
          },
          {
            code:"001002009",
            content:"董事会决议公告",
          },
          {
            code:"001002010",
            content:"监事会决议公告",
          },
          {
            code:"001002011",
            content:"交易所监管问询函",
          },
          {
            code:"001003",
            content:"制度文件",
          },
          {
            code:"001003001",
            content:"上市公司制度",
          },
          {
            code:"001003002",
            content:"中介机构报告",
          },
          {
            code:"001003003",
            content:"其他制度文件",
          },
          {
            code:"001004",
            content:"投资者关系",
          },
          {
            code:"001004001",
            content:"媒体采访",
          },
          {
            code:"001004002",
            content:"路演活动",
          },
          {
            code:"001004003",
            content:"调研活动",
          },
          {
            code:"001004004",
            content:"管理制度",
          },
          {
            code:"001999",
            content:"限制公开类公告",
          },
      ],
      titleData: ['公告标题','公告日期','详情'],
      dataList: [],
      legislationList: {
        title: '公告类型：',
        parentEvent: 'legislationEvent2',
        default: '全部',
        listWidth: 340,
        nowSelectWidth: 215,
        nowSelectHeight: 25,
        nowSelectFontSize: 13,
        // list1:[  ['基金','基金招募及设立' ], [11, 2,2], []   ],
        list: [
          // ['基金','基金招募及设立' ],
            '股票',
            '定期报告',
            '定期报告（中文）',
            '年度报告',
            '半年度报告',
            '一季度报告',
            '三季度报告',
            '财务报告',
            '年度报告（英文）',
            '半年度报告（英文）',
            '一季度报告（英文）',
            '三季度报告（英文）',
            '临时公告',
            '融资公告',
            '首发',
            '增发',
            '配股',
            '权证',
            '权益分配及变动',
            '股东大会相关',
            '风险提示相关',
            '基本信息变更',
            '经营事项相关',
            '重大事件相关',
            '其他',
            '董事会决议公告',
            '监事会决议公告',
            '交易所监管问询函',
            '制度文件',
            '上市公司制度',
            '中介机构报告',
            '其他制度文件',
            '投资者关系',
            '媒体采访',
            '路演活动',
            '调研活动',
            '管理制度',
            '限制公开类公告'
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
    pullDownListtt
  },
    //获取板块名称 进入页面发送请求
  created(){
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
      // console.log(arr)
      arr.forEach(item => {
        if (numberReg.test(item)) {
          arr2.push(item)
        }
      });
      // console.log(arr)
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
      const sendData = JSON.parse(JSON.stringify(this.sendData));
      sendData.page = pageNumber - 1;
      // console.log('sendData', sendData)
      this.$_axios.get(this.url, {
        params: sendData
      }).then(response => {
        // console.log('股票 > 股价异动预警', response.data.result);
        this.dataList = JSON.parse(JSON.stringify(response.data.result.result));
        this.resultData = response.data.result;
      })
        .catch(err => {
          // console.log(err);
        });
    },
    query() {
      const _year = 31536000000;
      const _startDate = new Date(this.queryCondition.start_date).getTime()
      const _endDate = new Date(this.queryCondition.end_date).getTime()

      if (!this.queryCondition.start_date || !this.queryCondition.end_date) {
        alert('请输入日期时间段');
        return;
      }
      console.log(this.queryCondition.sector)
      if(!this.queryCondition.sector){
        alert('请选择模块名');
        return;
      }

      
      this.isShowQueryResult = true;
      this.hasResultData = false;

      this.sendData = JSON.parse(JSON.stringify(this.queryCondition));

      console.log(this.sendData)

      this.$_axios.get(this.url, {
        params: this.sendData
      }).then(response => {
        // 显示查询结果
        console.log(response)
        // this.hasResultData = true;
        if(response.data.code=='410'){
          alert("版块内不包含股票代码")
          return;
        }else{
                   // 显示查询结果
              this.hasResultData = true;
              this.dataList = JSON.parse(JSON.stringify(response.data.result.result))
              this.resultData = response.data.result;
              console.log(this.dataList);
              if (this.resultData.total_count) {
                this.paginationData.page_Count = Math.ceil(this.resultData.total_count / 10);
              } else {
                this.paginationData.page_Count = 0;
              }
              this.paginationData.total_Count = this.resultData.total_count;
        }

      })

    },
    threshold() {
      let threshold = parseFloat(this.queryCondition.threshold);
      // console.log(threshold)
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
.pullDownListBoxTwo{
  height: 500px;
  overflow: scroll;
}
.pullDownListContentTwo .pullDownListBoxTwo li:nth-child(2){
  padding-left: 20px;
}
.pullDownListContentTwo .pullDownListBoxTwo li:nth-child(3){
  padding-left: 40px;
}
.pullDownListContentTwo .pullDownListBoxTwo li:nth-child(4){
  padding-left: 60px;
}
.pullDownListContentTwo .pullDownListBoxTwo li:nth-child(5){
  padding-left: 60px;
}
.pullDownListContentTwo .pullDownListBoxTwo li:nth-child(6){
  padding-left: 60px;
}
.pullDownListContentTwo .pullDownListBoxTwo li:nth-child(7){
  padding-left: 60px;
}
.pullDownListContentTwo .pullDownListBoxTwo li:nth-child(8){
  padding-left: 60px;
}
.pullDownListContentTwo .pullDownListBoxTwo li:nth-child(9){
  padding-left: 60px;
}
.pullDownListContentTwo .pullDownListBoxTwo li:nth-child(10){
  padding-left: 60px;
}
.pullDownListContentTwo .pullDownListBoxTwo li:nth-child(11){
  padding-left: 60px;
}
.pullDownListContentTwo .pullDownListBoxTwo li:nth-child(12){
  padding-left: 60px;
}
.pullDownListContentTwo .pullDownListBoxTwo li:nth-child(13){
  padding-left: 20px;
}
.pullDownListContentTwo .pullDownListBoxTwo li:nth-child(14){
  padding-left: 40px;
}
.pullDownListContentTwo .pullDownListBoxTwo li:nth-child(15){
  padding-left: 60px;
}
.pullDownListContentTwo .pullDownListBoxTwo li:nth-child(16){
  padding-left: 60px;
}
.pullDownListContentTwo .pullDownListBoxTwo li:nth-child(17){
  padding-left: 60px;
}
.pullDownListContentTwo .pullDownListBoxTwo li:nth-child(18){
  padding-left: 60px;
}
.pullDownListContentTwo .pullDownListBoxTwo li:nth-child(19){
  padding-left: 40px;
}
.pullDownListContentTwo .pullDownListBoxTwo li:nth-child(20){
  padding-left: 40px;
}
.pullDownListContentTwo .pullDownListBoxTwo li:nth-child(21){
  padding-left: 40px;
}
.pullDownListContentTwo .pullDownListBoxTwo li:nth-child(22){
  padding-left: 40px;
}
.pullDownListContentTwo .pullDownListBoxTwo li:nth-child(23){
  padding-left: 40px;
}
.pullDownListContentTwo .pullDownListBoxTwo li:nth-child(24){
  padding-left: 40px;
}
.pullDownListContentTwo .pullDownListBoxTwo li:nth-child(25){
  padding-left: 40px;
}
.pullDownListContentTwo .pullDownListBoxTwo li:nth-child(26){
  padding-left: 40px;
}
.pullDownListContentTwo .pullDownListBoxTwo li:nth-child(27){
  padding-left: 40px;
}
.pullDownListContentTwo .pullDownListBoxTwo li:nth-child(28){
  padding-left: 40px;
}
.pullDownListContentTwo .pullDownListBoxTwo li:nth-child(29){
  padding-left: 20px;
}
.pullDownListContentTwo .pullDownListBoxTwo li:nth-child(30){
  padding-left: 40px;
}
.pullDownListContentTwo .pullDownListBoxTwo li:nth-child(31){
  padding-left: 40px;
}
.pullDownListContentTwo .pullDownListBoxTwo li:nth-child(32){
  padding-left: 40px;
}
.pullDownListContentTwo .pullDownListBoxTwo li:nth-child(33){
  padding-left: 20px;
}
.pullDownListContentTwo .pullDownListBoxTwo li:nth-child(34){
  padding-left: 40px;
}
.pullDownListContentTwo .pullDownListBoxTwo li:nth-child(35){
  padding-left: 40px;
}
.pullDownListContentTwo .pullDownListBoxTwo li:nth-child(36){
  padding-left: 40px;
}
.pullDownListContentTwo .pullDownListBoxTwo li:nth-child(37){
  padding-left: 40px;
}
.pullDownListContentTwo .pullDownListBoxTwo li:nth-child(38){
  padding-left: 20px;
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
  right: -32px;
}
.queryDown{
    margin-left:150px;
}
</style>
