<template>
  <div>
    <!-- 新三板 监管公开信息 > 问询函 -->
    <div>
      <div class="queryCondition-top">
        <div class="queryCondition-title">
          问询函
        </div>
        <div class="middle clearFloat">
          <div class="clearFloat">
            <div class="floatLeft">
              <date-picker :prop="startDatePicker" @startDateEvent="startDateEvent"></date-picker>
            </div>
            <div class="floatLeft">
              <date-picker :prop="endDatePicker" @endDateEvent="endDateEvent"></date-picker>
            </div>
          </div>
          <!-- <div>
            <pull-down-list :prop="pullDownListData" @pullDownListEvent='pullDownListEvent'></pull-down-list>
          </div> -->
          <div v-if="queryType == '按证券代码查询'" class="marginLeft20">
            证券代码：<input v-model="queryCondition.equity_no" type="text">
          </div>
          <div v-else class="marginLeft20">
            <pull-down-list :prop="modulesNameList" @modulesNameEvent='modulesNameEvent'></pull-down-list>
          </div>
          <div class="marginLeft20">
            <keyword @keywordEvent="keywordEvent"></keyword>
          </div>
          <div class="queryBtn">
            <span @click="query(queryType)">查询</span>
          </div>
        </div>
      </div>

      <div v-if="isQueryResult" class="queryResult">
        <table>
          <tbody>
            <tr>
              <th v-for="(item, index) of tableData.th" :key="index" class="title">
                {{item}}
              </th>
            </tr>
            <tr v-for="(item, index) of tableData.tr" :key="index">
              <td>{{item.news_date}}</td>
              <td>{{item.equity_no}}</td>
              <td>{{item.news_title}}</td>
              <td>{{item.equity_id}}</td>
              <td>{{item.firm_type}}</td>
              <td>
                <a v-if="item.firm_reply" :href="item.firm_reply" target="_bank">查看</a>
              </td>
              <td>
                <a :href="item.news_content" target="_bank">下载</a>
              </td>
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
    const now = new Date();
    const _year = new Date().getTime() - 31536000000;
    // const oneDayAfter = new Date().getTime() - 86400000;
    return {
      url: 'http://10.25.24.51:10189/api/risk/neeq_pub_info3',
      isQueryResult: false,
      queryType: '按证券代码查询',
      inquiryLetterType: {
        title: '',
        parentEvent: 'inquiryLetter',
        default: '全部',
        listWidth: 148,
        nowSelectWidth: 150,
        nowSelectHeight: 25,
        list: ['全部类别', '年度问询函', '问询函']
      },
      tableData: {
        th: ['新闻日期', '公司代码', '新闻标题', '证券简称', '公司类型', '公司回复', '详情'],
        tr: [
          { news_title: '2017-09-07', news_date: '000000', equity_no: '证券简称', equity_id: '年报问询函', firm_type: '年报问询函', firm_reply: '年报问询函' },
        ]
      },
      queryCondition: {
        start_date: '',
        end_date: '',
        keyword: '',
        equity_no: '',
        page: 0,
        pagesize: 10
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
      startDatePicker2: {
        title: '日期：',
        parentEvent: 'startDateEvent',
        defaultDate: new Date(_year)
      },
      endDatePicker2: {
        title: '至：',
        parentEvent: 'endDateEvent',
        defaultDate: new Date()
      }
    }
  },
  components: {
    pullDownList,
    pagination,
    datePicker,
    keyword,
  },
  methods: {
    query(queryType) {
      this.isQueryResult = false;
      if (queryType == '按证券代码查询') {
        this.sendData = JSON.parse(JSON.stringify(this.queryCondition));
        this.url = 'http://10.25.24.51:10189/api/risk/neeq_pub_info3';
        this.sector = '';
      } else {
        this.sendData = {
          start_date: this.queryCondition.start_date,
          end_date: this.queryCondition.end_date,
          page: this.queryCondition.page,
          pagesize: this.queryCondition.pagesize,
          keyword: this.queryCondition.keyword,
          sector: this.sector,
          userid: 'risk',
        }
        if (!this.sector) {
          alert('请选择板块');
          return;
        }
        this.url = 'http://10.25.24.51:10189/api/risk/neeq_pub_sector3';
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
        console.log('监管公开信息-问询函', resultData);
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
      const sendData = JSON.parse(JSON.stringify(this.sendData));
      sendData.page = pageNumber - 1;
      console.log('sendData', sendData)
      this.$_axios.get(this.url, {
        params: sendData
      }).then(response => {
        const resultData = response.data.result;
        this.isQueryResult = true;
        console.log('监管公开信息-问询函', resultData);
        this.tableData.tr = JSON.parse(JSON.stringify(resultData.neeq_pub));
      })
        .catch(err => {
          console.log(err);
        });
    },
    inputEvent() {
      this.queryCondition2.sector = commonMethods.checkName(this.queryCondition2.sector.trim());
    },
    inquiryLetter(...data) {
      this.queryCondition.type = data[0];
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
    pullDownListEvent(...data) {
      this.queryType = data[0];
      this.moduleInit();
    },
    modulesNameEvent(...data) {
      this.sector = data[0];
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
  }
}
</script>

<style scoped>
.queryResult table {
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
  border-top: 2px solid #a9a9a9;
  background: #ffffff;
}
.queryResult tbody {
  display: table-row-group;
  vertical-align: middle;
  border-color: inherit;
}
.queryResult tbody th {
  height: 40px;
  line-height: 40px;
  border: 1px solid #797979;
  background-color: #f0f5f9;
}
.queryResult tbody td {
  border: 1px solid #797979;
  text-align: center;
  vertical-align: middle;
}
.queryResult tbody .portionSpan {
  display: block;
  width: 100%;
  line-height: 25px;
  border-top: 1px solid #797979;
}
.queryResult tbody .portionSpan:nth-child(1) {
  border-top: none;
}
.queryResult tbody .title:nth-child(1) {
  width: 90px;
}
.queryResult tbody .title:nth-child(2) {
  width: 95px;
}
.queryResult tbody .title:nth-child(3) {
  width: 350px;
}
.queryResult tbody .title:nth-child(4) {
  width: 100px;
}
.queryResult tbody .title:nth-child(5) {
  width: 100px;
}
.queryResult tbody .title:nth-child(6) {
  width: 100px;
}
.queryResult tbody .title:nth-child(7) {
  width: 60px;
}
</style>
