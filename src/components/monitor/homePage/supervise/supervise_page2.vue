<template>
  <div>
    <!-- legislation 法律法规 -->
    <div>
      <div class="queryCondition-top">
        <div class="title">法律法规</div>
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
                  <a :href="item.SOURCEURL" target="_bank">{{item.TITLE}}</a>
                </td>
                <td>{{item.PUBLISHDATE}}</td>
                <td>{{item.RULETYPENAME}}</td>
                <td>{{item.COMPANYNAME}}</td>
                <td class="data-content">{{item.INFOBODYCONTENT}}
                  <span @click="details(item, index)">{{item.details}}</span>
                </td>
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
import keyword from '@/components/common/keyword'

export default {
  data() {
    return {
      url: 'http://10.25.24.51:10192/api/rest/nlp/risk/laws_regulations?',
      isShowQueryResult: false,
      hasResultData: false,
      resultData: null,
      queryCondition: {
        keyword: '',
        COMPANYNAME: '',
        page: 1,
        page_size: 10,
        from_date: '',
        to_date: ''
      },
      startDatePicker: {
        title: '日期：',
        parentEvent: 'startDateEvent',
        // defaultDate: new Date()
      },
      endDatePicker: {
        title: '至：',
        parentEvent: 'endDateEvent',
        // defaultDate: new Date()
      },
      sendData: {},
      paginationData: {
        parentEvent: 'paginationSelect',
        page_Count: 0,
        total_Count: 0,
        current: 1
      },
      titleData: ['标题', '发布日期', '法律法规类型', '发文机关名称', '正文内容'],
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
        ]
      }
    }
  },
  components: {
    pullDownList,
    pagination,
    datePicker,
    keyword
  },
  computed: {

  },
  methods: {
    legislationEvent(...data) {
      this.queryCondition.COMPANYNAME = data[0];
      if (data[0] === '全部') {
        this.queryCondition.COMPANYNAME = '';
      }
    },
    paginationSelect(pageNumber) {
      const sendData = JSON.parse(JSON.stringify(this.sendData));
      // let url = this.url 
      //   + 'page=' + pageNumber + '&'
      //   + 'page_size=' + sendData.page_size + '&'
      //   + 'from_date=' + sendData.from_date + '&'
      //   + 'to_date=' + sendData.to_date + '&'
      //   + 'COMPANYNAME=' + sendData.COMPANYNAME;
      sendData.page = pageNumber;
      console.log('sendData', sendData)
      this.$_axios.get(this.url, {
        params: sendData
      }).then(response => {
        console.log('法律法规查询结果', response.data.result);
        this.dataList = JSON.parse(JSON.stringify(response.data.result.Announce_List));
        this.resultData = response.data.result.Announce_List;
        this.dataList.forEach(item => {
          item.PUBLISHDATE = item.PUBLISHDATE ? commonMethods.formatDateTime(new Date(item.PUBLISHDATE)) : '-';
          item.EXECUTEDATE = item.EXECUTEDATE ? commonMethods.formatDateTime(new Date(item.EXECUTEDATE)) : '-';
          if (item.INFOBODYCONTENT && item.INFOBODYCONTENT.length > 220) {
            item.INFOBODYCONTENT = item.INFOBODYCONTENT.slice(0, 220) + '...';
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
      // let url = this.url + 'page=' + this.sendData.page + '&'
      //   + 'page_size=' + this.sendData.page_size + '&'
      //   + 'from_date=' + this.sendData.from_date + '&'
      //   + 'to_date=' + this.sendData.to_date + '&'
      //   + 'COMPANYNAME=' + this.sendData.COMPANYNAME;
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
        this.dataList = JSON.parse(JSON.stringify(response.data.result.Announce_List));
        this.resultData = response.data.result.Announce_List;
        this.paginationData.page_Count = response.data.result.Page_Count;
        this.paginationData.total_Count = response.data.result.Total_Count;
        this.dataList.forEach(item => {
          item.PUBLISHDATE = item.PUBLISHDATE ? commonMethods.formatDateTime(new Date(item.PUBLISHDATE)) : '';
          item.EXECUTEDATE = item.EXECUTEDATE ? commonMethods.formatDateTime(new Date(item.EXECUTEDATE)) : '';
          if (item.INFOBODYCONTENT && item.INFOBODYCONTENT.length > 220) {
            item.INFOBODYCONTENT = item.INFOBODYCONTENT.slice(0, 220) + '...';
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
        item.INFOBODYCONTENT = item.INFOBODYCONTENT.slice(0, 220) + '...';
      } else {
        item.details = '收起';
        item.INFOBODYCONTENT = this.resultData[index].INFOBODYCONTENT;
      }
    },
    keywordEvent(...data){
      this.queryCondition.keyword = data[0];
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

  }
}
</script>

<style  scoped>
</style>
