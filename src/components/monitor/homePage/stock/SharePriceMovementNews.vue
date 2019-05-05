<template>
  <div>
    <!-- 股票 > 股价异动新闻 -->
    <div>
      <div class="queryCondition-top">
        <div class="queryCondition-title">股价异动新闻</div>
        <div class="middle clearFloat">
          <!-- 查询条件框 -->
          <div>
            <div class="floatLeft">
              <date-picker :prop="startDatePicker_news" @startDateNews="startDateNews"></date-picker>
            </div>
            <div class="floatLeft">
              <date-picker :prop="endDatePicker_news" @endDateNews="endDateNews"></date-picker>
            </div>
          </div>
          <!-- 查询按钮 -->
          <div class="queryBtn">
            <span @click="query">查询</span>
          </div>
        </div>
      </div>
      <!-- 查询结果 -->
      <div v-if="isShowQueryResultNews" class="queryResult">
        <div v-if="hasResultDataNews">
          <table>
            <tbody>
              <tr>
                <th v-for="(item, index) of titleDataNews" :key="index" class="tableTh" width:100px>{{item}}</th>
              </tr>
              <tr v-for="(item, index) of dataListNews" :key="index">
                <td>{{item.showtime}}</td>
                <td>{{item.source}}</td>
                <td @click="newsDetails(item)" class="title">{{item.title}}</td>
                <td>{{item.relkey}}</td>
                <td>
                  <span v-for="(relatecodesItem,index) of item.relatecodes" :key="index">
                    {{relatecodesItem['沪深交易所股票基金/港股']}}
                  </span>
                </td>
                <td>
                  <a :href="item.purl" target="_bank">查看</a>
                </td>
              </tr>
            </tbody>
          </table>
          <pagination :prop="paginationDataNews" @paginationSelectNews="paginationSelectNews"></pagination>
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
            <div v-html="detailsData.conttext.toString().replace(/\\r\\n/g, '<br>')"></div>
          </div>
          <span @click="closeDetails" class="closeBtn">×</span>
          <!-- <router-link class="closeBtn" to="/monitor/homePage/homeContent">×</router-link> -->
          <!-- <a href="/monitor/homePage/homeContent">
            <span @click="closeDetails" class="closeBtn">×</span>
          </a> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pagination from '@/components/common/pagination'
import commonMethods from '@/common/common.js'
import datePicker from '@/components/common/datePicker'

export default {
  data() {
    const now = new Date();
    const week = now.getTime() - 604800000;
    return {
      urlNews: 'http://10.25.24.51:10193/api/risk/abnormal_price_news',
      isShowQueryResultNews: false,
      hasResultDataNews: false,
      isShowDetails: false,
      resultDataNews: null,
      queryCondition: {
        start_date: '',
        end_date: '',
        page: 0,
        page_size: 10,
      },
      startDatePicker_news: {
        title: '日期：',
        parentEvent: 'startDateNews',
        defaultDate: new Date(week)
      },
      endDatePicker_news: {
        title: '至：',
        parentEvent: 'endDateNews',
        defaultDate: new Date()
      },
      sendDataNews: {},
      paginationDataNews: {
        parentEvent: 'paginationSelectNews',
        page_Count: 0,
        total_Count: 0,
        current: 1
      },
      titleDataNews: ['发布时间', '新闻来源', '标题', '相关关键字', '相关代码', '发布网址'],
      dataListNews: [],
      detailsData: {},
    }
  },
  components: {
    pagination,
    datePicker
  },
  methods: {
    paginationSelectNews(pageNumber) {
      const sendDataNews = JSON.parse(JSON.stringify(this.sendDataNews));
      sendDataNews.page = pageNumber - 1;
      console.log('sendData', sendDataNews)
      this.$_axios.get(this.urlNews, {
        params: sendDataNews
      }).then(response => {
        console.log('股票 > 股价异动预警', response.data.result);
        this.dataListNews = JSON.parse(JSON.stringify(response.data.result.result));
        this.resultDataNews = response.data.result;
      })
        .catch(err => {
          console.log(err);
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
      this.isShowQueryResultNews = true;
      this.hasResultDataNews = false;
      this.sendDataNews = JSON.parse(JSON.stringify(this.queryCondition));
      for (let key in this.sendDataNews) {
        if (this.sendDataNews[key] === '') {
          delete this.sendDataNews[key];
        }
      }
      console.log('sendData', this.sendDataNews)
      this.$_axios.get(this.urlNews, {
        params: this.sendDataNews
      }).then(response => {
        // 显示查询结果
        this.hasResultDataNews = true;
        console.log('股票 > 股价异动预警News', response.data.result);
        this.dataListNews = JSON.parse(JSON.stringify(response.data.result.result));
        this.resultDataNews = response.data.result;
        if (this.resultDataNews.total_count) {
          this.paginationDataNews.page_Count = Math.ceil(this.resultDataNews.total_count / 10);
        } else {
          this.paginationDataNews.page_Count = 0;
        }

        this.paginationDataNews.total_Count = this.resultDataNews.total_count;
      })
        .catch(err => {
          console.log(err);
        });
    },
    closeDetails() {
      this.isShowDetails = false;
      this.detailsData = {}
    },
    newsDetails(item) {
      this.isShowDetails = false;
      this.$_axios.get('http://10.25.24.51:10193/api/risk/abnormal_price_news_detail?infocode=' + item.infocode)
        .then(response => {
          this.isShowDetails = true;
          const resultData = response.data.result.result;
          this.detailsData = JSON.parse(JSON.stringify(resultData));
          this.detailsData.title = item.title;
          // this.detailsData
        })
        .catch(err => {
          console.log(err);
        });
    },
    startDateNews(...data) {
      this.queryCondition.start_date = data[0];
    },
    endDateNews(...data) {
      this.queryCondition.end_date = data[0];
    },
  },
  mounted() {
    this.queryCondition.start_date = commonMethods.formatDateTime2(this.startDatePicker_news.defaultDate);
    this.queryCondition.end_date = commonMethods.formatDateTime2(new Date());
  }
}
</script>

<style lang="less" scoped>
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
    .title {
      cursor: pointer;
    }
    .title:hover {
      text-decoration: underline;
    }
    .tableTh:nth-child(1) {
      width: 150px;
    }
    .tableTh:nth-child(2) {
      width: 80px;
    }
    .tableTh:nth-child(3) {
      width: 270px;
    }
    .tableTh:nth-child(4) {
      width: 80px;
    }
    .tableTh:nth-child(5) {
      width: 200px;
    }
    .tableTh:nth-child(6) {
      width: 65px;
    }
  }
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
  z-index: 2;
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
    h1,
    h3 {
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
