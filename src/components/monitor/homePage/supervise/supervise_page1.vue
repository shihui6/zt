<template>
  <div>
    <!-- 监管要求 > 监管对挂牌公司处罚情况 -->
    <div>
      <div class="queryCondition-top">
        <div class="queryCondition-title">监管对挂牌公司处罚情况</div>
        <div class="middle clearFloat">
          <!-- 查询条件框 -->
          <div class="clearFloat">
            <div class="floatLeft">
              <pull-down-list :prop="dispatch" @dispatchEvent="dispatchEvent"></pull-down-list>
            </div>
            <div class="floatLeft">
              <date-picker :prop="startDatePicker" @startDateEvent="startDateEvent"></date-picker>
            </div>
            <div class="floatLeft">
              <date-picker :prop="endDatePicker" @endDateEvent="endDateEvent"></date-picker>
            </div>
            <div class="floatLeft">
              <pull-down-list :prop="categoryData" @categoryEvent="categoryEvent"></pull-down-list>
            </div>
            <div class="floatLeft">
              <keyword @keywordEvent="keywordEvent"></keyword>
            </div>
          </div>
          <!-- 查询按钮 -->
          <div class="queryBtn" id='btnquery'>
            <span @click="query">查询</span>
          </div>
        </div>
      </div>
      <div v-if="isShowQueryResult" class="queryResult">
        <div v-if="hasResultData">
          <table>
            <thead>
              <th v-for="(item, index) of titleData" :key="index">{{item}}</th>
            </thead>
            <tbody>
              <tr v-for="(item, index) of dataList" :key="index">
                <!-- @click="showDetails(item)" -->
                <td class="tableTd colorBule">
                  <a :href="item.url" target="_bank">{{item.title}}</a>
                </td>
                <td class="tableTd">{{item.category}}</td>
                <td class="tableTd">{{item.publish_date}}</td>
                <td class="tableTd">{{item.source}}</td>
                <td class="tableTd"><router-link target="_blank" :to="'/monitor/homePage/supervise_detail?id='+ item.id">详情</router-link></td>
                <!-- <td class="tableTd">
                  <a :href="item.url" target="_bank">查看</a>
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
      <div v-if="isShowDetails" class="detailsPopUp">
        <div class="detailsBox">
          <div>
            <h1>{{detailsData.title}}</h1>
            <p>发文日期：{{detailsData.date}}</p>
            <div>
              {{detailsData.content}}
            </div>
          </div>
          <span @click="closeDetails" class="closeBtn">×</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import commonMethods from '@/common/common.js'
import pagination from '@/components/common/pagination'
import pullDownList from '@/components/common/pullDownList'
import datePicker from '@/components/common/datePicker'
import keyword from '@/components/common/keyword'
export default {
  data() {
    const now = new Date();
    // const week = now.getTime() - 31536000000;
    const week = new Date().getTime() - 86400000 * 7;
    // const oneDayAfter = new Date().getTime() - 86400000;
    return {
      url: ' http://10.25.24.51:10189/api/risk/regulatory?',
      isShowQueryResult: false,
      isShowDetails: false,
      hasResultData: false,
      queryCondition: {
        start_date: '',
        end_date: '',
        category: '',
        keyword: '',
        source:'',
        page: 0,
        page_size: 10
      },
      sendData: {},
      paginationData: {
        parentEvent: 'paginationSelect',
        page_Count: 0,
        total_Count: 0,
        current: 1
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
      detailsData: {},
      categoryData: { title: '分类：', parentEvent: 'categoryEvent', default: '请选择', listWidth: 108, nowSelectWidth: 110, list: ['全部', '行政处罚', '市场禁入', '行政复议','信息公示','行业自律','中介机构监管','自律处分'] },
      dispatch: { title: '发文机关名称：', parentEvent: 'dispatchEvent', default: '请选择', listWidth: 145, nowSelectWidth: 147, list: ['全部', '证监会', '深圳证券交易所', '上海证券交易所','中国证券投资基金业协会','中国证券业协会','中国银行间交易商协会'] },
      titleData: ['标题', '分类', '发文日期','发文机关名称','详情'],
      dataList: [
        // {NOTICEDATE: '2018-01-01', NOTICETITLE: '2018-02-02',INFOBODYCONTENT: '正文内容正文内容正文内容', SOURCENAME: 'wwww'},
        // {NOTICEDATE: '2018-01-01', NOTICETITLE: '2018-02-02',INFOBODYCONTENT: '正文内容正文内容正文内容', SOURCENAME: 'wwww'},
      ],
    }
  },
  components: {
    pagination,
    pullDownList,
    datePicker,
    keyword
  },
  methods: {
    query() {
      this.isShowQueryResult = true;
      this.hasResultData = false;
      this.sendData = JSON.parse(JSON.stringify(this.queryCondition));
      // for (let key in this.sendData) {
      //   if (this.sendData[key] === '') {
      //     delete this.sendData[key];
      //   }
      // }
      console.log('sendData', this.sendData)
      this.$_axios.get(this.url, {
        params: this.sendData
      }).then(response => {
        const resultData = response.data.result;
        this.hasResultData = true;
        console.log('监管对挂牌公司处罚情况', resultData);
        if (resultData.total_count) {
          this.paginationData.page_Count = Math.ceil(resultData.total_count / 10);
        } else {
          this.paginationData.page_Count = 0;
        }

        this.paginationData.total_Count = resultData.total_count;
        this.dataList = JSON.parse(JSON.stringify(resultData.regulatory_news));
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
        this.hasResultData = true;
        console.log('监管对挂牌公司处罚情况', resultData);
        this.dataList = JSON.parse(JSON.stringify(resultData.regulatory_news));
      })
        .catch(err => {
          console.log(err);
        });
    },
    inputEvent() {
      this.queryCondition.keyword = commonMethods.checkName(this.queryCondition.keyword);
    },
    categoryEvent(...data) {
      if (data[0] === '全部') {
        this.queryCondition.category = '';
      } else {
        this.queryCondition.category = data[0];
      }
    },
        dispatchEvent(...data) {
      if (data[0] === '全部') {
        this.queryCondition.source = '';
      } else {
        this.queryCondition.source = data[0];
      }
    },
    closeDetails() {
      this.isShowDetails = false;
      this.detailsData = {};
    },
    showDetails(item) {
      this.isShowDetails = false;
      console.log(item)
      this.$_axios.get('http://10.25.24.51:10189/api/risk/regulatory_detail?id=' + item.id)
        .then(response => {
          console.log(item.title)
          this.isShowDetails = true;
          const resultData = response.data.result;
          this.detailsData.title = item.title;
          this.detailsData.date = resultData.news_detail.publish_date;
          this.detailsData.content = resultData.news_detail.content;
          console.log('详情', resultData);
        })
        .catch(err => {
          console.log(err);
        });
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
  },
  mounted() {
    this.queryCondition.start_date = commonMethods.formatDateTime2(this.startDatePicker.defaultDate);
    this.queryCondition.end_date = commonMethods.formatDateTime2(this.endDatePicker.defaultDate);
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
    margin-left: 8px;
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
  #btnquery{
    margin-left:10px;
  }
}
.queryResult {
  table {
    width: 900px;
    margin-top: 20px;
    border: 1px solid #797979;
    border-collapse: collapse;
    word-wrap: break-word;
    word-break: break-all;
    th {
      width: 100px;
      height: 40px;
      line-height: 40px;
      border: 1px solid #797979;
      background-color: #f0f5f9;
    }
    tr {
      border: 1px solid #797979;
    }
    td {
      text-align: center;
      vertical-align: middle;
      border: 1px solid #797979;
    }
    .tableTd:nth-child(1) {
      width: 100px;
      cursor: pointer;
    }
    .tableTd:nth-child(1):hover {
      text-decoration: underline;
    }
    .tableTd:nth-child(2) {
      width: 160px;
    }
    .tableTd:nth-child(4) {
      width: 100px;
    }
  }
}
.queryCondition-top{
      position: relative;
    /* width: 100%; */
    width: 1024px;
    border-bottom: 2px solid #797979;
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
    width: 900px;
    margin-left: auto;
    margin-right: auto;
    > div {
      height: 900px;
      overflow: hidden;
      > div {
        height: 823px;
        overflow-y: scroll;
      }
    }
    h1 {
      text-align: center;
      line-height: 40px;
    }
    p {
      text-align: center;
      line-height: 30px;
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
