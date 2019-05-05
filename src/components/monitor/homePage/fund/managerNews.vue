<template>
  <div>
    <!-- 基金 > 新闻预警 > 基金管理人新闻 -->
    <div>
      <div class="queryCondition-top">
        <div class="queryCondition-title">基金管理人新闻</div>
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
              <div @click="choiceNegative(false)" class="floatLeft newsConditionBox">
                <span class="iconBox">
                  <i v-show="isAllNews" class="dot"></i>
                </span>
                <span class="marginLeft20">全部新闻</span>
              </div>
            </div>
            <div class="floatLeft">
              <div @click="choiceNegative(true)" class="floatLeft newsConditionBox marginLeft15">
                <span class="iconBox">
                  <i v-show="isNegative" class="dot"></i>
                </span>
                <span class="marginLeft20">负面新闻</span>
              </div>
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
                <td>
                  <a :href="item.PURL" target="_bank">{{item.TITLE}}</a>
                </td>
                <td>{{item.SHOWTIME}}</td>
                <td class="data-content">
                  <p v-html="item.CONTENT"></p>
                  <span @click="details(item, index)">{{item.details}}</span>
                </td>
                <td>{{item.SOURCE}}</td>
                <td>
                  <!-- && item.checked == null -->
                  <span @click="markingNegative(item, index, true)" v-if="item.is_negative == null" class="markingNegative">标记为负面新闻</span>
                  <span v-else>负面新闻
                    <span @click="markingNegative(item, index, false)" class="markingNegative">取消</span>
                  </span>
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
import pagination from '@/components/common/pagination'
import commonMethods from '@/common/common.js'
import datePicker from '@/components/common/datePicker'
export default {
  data() {
    const week = new Date().getTime() - 86400000 * 7;
    return {
      // url: 'http://10.25.24.51:10192/api/rest/nlp/risk/fund_manager_news?news_type=1&',
      url: 'http://10.25.24.51:10192/api/rest/nlp/risk/fund_manager_news?',
      isShowQueryResult: false,
      hasResultData: false,
      isNegative: false,
      resultData: {},
      queryCondition: {
        page: 1,
        page_size: 10,
        is_negative: ''
      },
      sendData: {},
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
      paginationData: {
        parentEvent: 'paginationSelect',
        page_Count: 0,
        total_Count: 0,
        current: 1
      },
      titleData: ['新闻标题', '新闻日期', '新闻内容', '新闻来源', '是否为负面新闻'],
      dataList: [],
    }
  },
  components: {
    pagination,
    datePicker
  },
  computed: {
    isAllNews() {
      return !this.isNegative;
    }
  },
  methods: {
    choiceNegative(flag) {
      this.isNegative = flag;
      this.queryCondition.is_negative = flag ? 1 : '';
    },
    markingNegative(newsData, index, flag) {
      // http://10.25.24.51:10192/api/rest/nlp/risk/update_fund_manager_news?infocode=&is_negative=1&checked=1&is_delete=
      let sendData = flag ? '&is_negative=1&checked=1&is_delete=' : '&is_negative=&checked=1&is_delete=1';
      let url = 'http://10.25.24.51:10192/api/rest/nlp/risk/update_fund_manager_news?'
        + 'infocode=' + newsData.INFOCODE + sendData;
      this.$_axios.get(url)
        .then(response => {
          const resultData = response.data.result;
          console.log('基金 > 新闻预警 > 基金管理人新闻 > 标记负面', resultData.result);
          if (flag) {
            console.log()
            if (resultData.update_result == 1) {
              this.dataList[index].is_negative = 1;
              console.log(flag, this.dataList[index].is_negative)
            }
          } else {
            if (resultData.update_result == 1) {
              this.dataList[index].is_negative = null;
              console.log(flag, this.dataList[index].is_negative)
            }
          }
          console.log('newsData', newsData)
        })
        .catch(err => {
          console.log(err);
        });
    },
    paginationSelect(pageNumber) {
      const sendData = JSON.parse(JSON.stringify(this.sendData));
      sendData.page = pageNumber;
      this.$_axios.get(this.url, {
        params: sendData
      }).then(response => {
          console.log('基金 > 新闻预警 > 基金管理人新闻', response.data.result);
          this.resultData = response.data.result.Announce_List;
          this.resultData.forEach(item => {
            item.CONTENT = item.CONTENT.toString().replace(/\\r\\n\\r\\n/g, "<br>");
            item.CONTENT = item.CONTENT.toString().replace(/\\r\\n/g, "<br>");
          });
          this.dataList = JSON.parse(JSON.stringify(this.resultData));
          this.dataList.forEach(item => {
            // item.SHOWTIME = item.SHOWTIME ? commonMethods.formatDateTime(new Date(item.SHOWTIME)) : '-';
            if (item.CONTENT && item.CONTENT.length > 220) {
              item.CONTENT = `${item.CONTENT.slice(0, 220) + '...'}`;
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
          console.log('基金 > 新闻预警 > 基金管理人新闻 内容内容内容', response.data.result);
          this.resultData = response.data.result.Announce_List;
          this.resultData.forEach(item => {
            item.CONTENT = item.CONTENT.toString().replace(/\\r\\n\\r\\n/g, "<br>");
            item.CONTENT = item.CONTENT.toString().replace(/\\r\\n/g, "<br>");
          });
          this.dataList = JSON.parse(JSON.stringify(this.resultData));
          this.paginationData.page_Count = response.data.result.Page_Count;
          this.paginationData.total_Count = response.data.result.Total_Count;
          this.dataList.forEach(item => {
            // item.SHOWTIME = item.SHOWTIME ? commonMethods.formatDateTime(new Date(item.SHOWTIME)) : '-';
            if (item.CONTENT && item.CONTENT.length > 220) {
              item.CONTENT = `${item.CONTENT.slice(0, 220) + '...'}`
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
        item.CONTENT = item.CONTENT.slice(0, 220) + '...';
      } else {
        item.details = '收起';
        item.CONTENT = this.resultData[index].CONTENT;
      }
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
    this.queryCondition.from_date = commonMethods.formatDateTime2(this.startDatePicker.defaultDate);
    this.queryCondition.to_date = commonMethods.formatDateTime2(this.endDatePicker.defaultDate);
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
    position: relative;
  }
  input {
    width: 175px;
    height: 25px;
  }
  
  .negativeNewsCondition {
    margin-left: 20px;
  }
}
.newsConditionBox {
  position: relative;
  float: left;
  cursor: pointer;
}
.iconBox {
  position: absolute;
  display: inline-block;
  top: 4px;
  width: 12px;
  height: 12px;
  border-radius: 6px;
  border: 1px solid #797979;
  .dot {
    position: absolute;
    top: 1px;
    left: 1px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #797979;
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
    .markingNegative {
      padding: 4px;
      cursor: pointer;
      border: 1px solid #797979;
      border-radius: 5px;
      background: #f3f3f3;
    }
    .tableTh:nth-child(1) {
      width: 140px;
    }
    .tableTh:nth-child(2) {
      width: 90px;
    }
    .tableTh:nth-child(4) {
      width: 160px;
    }
    .tableTh:nth-child(5) {
      width: 160px;
    }
  }
}
</style>
