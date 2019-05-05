<template>
  <div>
    <!-- legislation 法律法规 -->
    <div>
      <div class="queryCondition-top">
        <div class="queryCondition-title">法律法规</div>
        <div class="middle clearFloat">
          <!-- 查询条件框 -->
          <div>
            <div class="floatLeft">
              <pull-down-list :prop="legislationList" @legislationEvent='legislationEvent'></pull-down-list>
            </div>
            <div class="floatLeft">
              <date-picker :prop="startDatePicker" @startDateEvent="startDateEvent"></date-picker>
            </div>
            <div class="floatLeft">
              <date-picker :prop="endDatePicker" @endDateEvent="endDateEvent"></date-picker>
            </div>
            <div class="floatLeft">
              <pull-down-list-two :prop="legislationListTwo" @legislationEventTwo='legislationEventTwo'></pull-down-list-two>
            </div>
            <!-- 关键字部分 -->
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
                <td class="tableTd">
                  <a :href="item.sourceurl" target="_bank">{{item.title}}</a>
                </td>
                <td>{{item.publishdate}}</td>
                <td>{{item.ruletypename}}</td>
                <td>{{item.companyname}}</td>
                <!-- <td class="data-content">{{item.INFOBODYCONTENT}}
                  <span @click="details(item, index)">{{item.details}}</span>
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
import pullDownListTwo from '@/components/common/pullDownListTwo'
import pagination from '@/components/common/pagination'
import commonMethods from '@/common/common.js'
import datePicker from '@/components/common/datePicker'
import keyword from '@/components/common/keyword'

export default {
  data() {
    const week = new Date().getTime() - 86400000 * 7;
    return {
      url: 'http://10.25.24.51:10189/api/risk/law_regulation_customize?',
      isShowQueryResult: false,
      hasResultData: false,
      resultData: null,
      queryCondition: {
        companyname: '',
        page: 0,
        page_size: 10,
        start_date: '',
        end_date: '',
        keyword:'',
        ruletypename:''
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
      titleData: ['标题', '发布日期', '法律法规类型', '发文机关名称'],
      dataList: [],
      legislationList: {
        title: '发文机关名称：',
        parentEvent: 'legislationEvent',
        default: '请选择',
        listWidth: 245,
        nowSelectWidth: 145,
        nowSelectHeight: 25,
        nowSelectFontSize: 13,
        list: [
          '全部',
          '深圳证券交易所',
          '中国证券登记结算有限责任公司',
          '上海证券交易所',
          '中国证券监督管理委员会',
          '中国人民银行',
          '上海期货交易所',
          '郑州商品交易所',
          '大连商品交易所',
          '中国证券投资基金业协会 ',
          '中国证券业协会',
          '中央国债登记结算有限责任公司',
          '全国中小企业股份转让系统有限责任公司',
          '中国银行业监督管理委员会',
          '中国保险监督管理委员会',
        ]
      },
      legislationListTwo: {
        title: '法律法规类型',
        parentEvent: 'legislationEventTwo',
        default: '请选择',
        listWidth: 98,
        nowSelectWidth: 100,
        nowSelectHeight: 25,
        nowSelectFontSize: 13,
        list: [
          '全部',
          '要闻',
          '国家法律',
          '地方性法规',
          '地方政府规章',
          '地方规范文件',
          '地方司法文件',
          '行政法规',
          '部门规章',
          '规范性文件',
          '发文通知',
          '司法解释',
          '立法解释',
          '通知公告',
          '热点动态',
          '其他'
        ]
      }
    }
  },
  components: {
    pullDownList,
    pagination,
    datePicker,
    keyword,
    pullDownListTwo
  },
  computed: {

  },
  methods: {
// 添加关键字查询
    keywordEvent(...data) {
      this.queryCondition.keyword = data[0];
    },
    legislationEvent(...data) {
      this.queryCondition.companyname = data[0];
      if (data[0] === '全部') {
        this.queryCondition.companyname = '';
      }
    },
    legislationEventTwo(...data) {
      this.queryCondition.ruletypename = data[0];
      if (data[0] === '全部') {
        this.queryCondition.ruletypename = '';
      }
    },
    paginationSelect(pageNumber) {
      const sendData = JSON.parse(JSON.stringify(this.sendData));
      sendData.page = pageNumber - 1;
      console.log('sendData', sendData)
      this.$_axios.get(this.url, {
        params: sendData
      }).then(response => {
        console.log('法律法规查询结果', response.data.result);
        this.dataList = JSON.parse(JSON.stringify(response.data.result.result));
        this.resultData = response.data.result.result;
        this.dataList.forEach(item => {
          // item.PUBLISHDATE = item.PUBLISHDATE ? commonMethods.formatDateTime(new Date(item.PUBLISHDATE)) : '-';
          // item.EXECUTEDATE = item.EXECUTEDATE ? commonMethods.formatDateTime(new Date(item.EXECUTEDATE)) : '-';
          if (item.content && item.content.length > 220) {
            item.content = item.content.slice(0, 220) + '...';
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
        console.log('法律法规查询结果', response.data.result);
        this.dataList = JSON.parse(JSON.stringify(response.data.result.result));
        this.resultData = response.data.result.result;
        this.paginationData.page_Count = Math.ceil(response.data.result.total_count/10);
        this.paginationData.total_Count = response.data.result.total_count;
        this.dataList.forEach(item => {
          // item.PUBLISHDATE = item.PUBLISHDATE ? commonMethods.formatDateTime(new Date(item.PUBLISHDATE)) : '';
          // item.EXECUTEDATE = item.EXECUTEDATE ? commonMethods.formatDateTime(new Date(item.EXECUTEDATE)) : '';
          if (item.content && item.content.length > 220) {
            item.content = item.content.slice(0, 220) + '...';
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
        item.content = item.content.slice(0, 220) + '...';
      } else {
        item.details = '收起';
        item.content = this.resultData[index].content;
      }
    },
    startDateEvent(...data) {
      this.queryCondition.start_date = data[0];
      console.log(this.queryCondition)
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

<style scoped>
.queryResult table {
  width: 1180px;
  margin-top: 20px;
  border: 1px solid #797979;
  border-collapse: collapse;
  word-wrap: break-word;
  word-break: break-all;
}
.queryResult table th {
  height: 40px;
  line-height: 40px;
  border: 1px solid #797979;
  background-color: #f0f5f9;
}
.queryResult table tr {
  overflow: hidden;
  border: 1px solid #797979;
}
.queryResult table td {
  height: 84px;
  text-align: center;
  vertical-align: middle;
  border: 1px solid #797979;
}
.queryResult table .data-content {
  position: relative;
  text-align: left;
}
.queryResult table .data-content span {
  position: absolute;
  bottom: 0;
  right: 0;
  cursor: pointer;
  color: blue;
}
.queryResult table .tableTh:nth-child(1) {
  width: 145px;
}
.queryResult table .tableTh:nth-child(2) {
  width: 80px;
}
.queryResult table .tableTh:nth-child(3) {
  width: 90px;
}
.queryResult table .tableTh:nth-child(4) {
  width: 90px;
}
</style>
