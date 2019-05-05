<template>
  <div>
    <!-- 基金 > 新闻预警 > 基金重仓股负面新闻 -->
    <div>
      <div class="queryCondition-top">
        <div class="queryCondition-title">基金重仓股负面新闻</div>
        <div class="middle clearFloat">
          <!-- 查询条件框 -->
          <div>
            <div class="floatLeft">
              <div v-on:mouseleave="isShowDropDownList = false" class="queryCondition">
                基金代码：<input type="text" v-model="queryCondition.fund_code" @input="inputCode" placeholder="请输入基金代码" maxlength="6">
                <span v-if="isShowDropDownList" class="drop-down-box">
                  <span v-for="(item, index) of dropDownList" :key="index" @click="dropDownEvent(item)">{{item}}</span>
                </span>
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
            <div class="floatLeft marginLeft20">
              <date-picker :prop="startDatePicker" @startDateEvent="startDateEvent"></date-picker>
            </div>
            <div class="floatLeft">
              <date-picker :prop="endDatePicker" @endDateEvent="endDateEvent"></date-picker>
            </div>
          </div>
          <!-- 查询按钮 -->
          <div class="queryBtn">
            <span @click="query">查询</span>
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
                <td>{{item.RELATECODE}}</td>
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
      url: 'http://10.25.24.51:10192/api/rest/nlp/risk/funds_holding_stocks?',
      isShowQueryResult: false,
      isShowDropDownList: false,
      hasResultData: false,
      isNegative: false,
      dropDownList: [],
      resultData: {},
      queryCondition: {
        page: 1,
        page_size: 10,
        is_negative: '',
        checked: 0,
        id_delete: '',
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
      titleData: ['重仓股代码', '新闻标题', '新闻日期', '新闻内容', '新闻来源', '是否为负面新闻'],
      dataList: [],
    }
  },
  components: {
    pagination,
    datePicker
  },
  computed: {
    // isAllNews() {
    //   return !this.isNegative;
    // }
  },
  methods: {
    inputCode() {
      let nowNumber = parseInt(this.queryCondition.fund_code);
      if (nowNumber.toString() === 'NaN' || nowNumber.toString() === 'Infinity' || nowNumber > 999999) {
        this.queryCondition.fund_code = '';
      }
      if (this.queryCondition.fund_code.toString().length > 0) {
        const tempArr = [];
        this.isShowDropDownList = true;
        this.codeList.forEach(item => {
          if (item.code.indexOf(this.queryCondition.fund_code.toString()) !== -1) {
            tempArr.push(item.code + ' ' + item.name);
          }
        });
        this.dropDownList = tempArr.slice(0, 5);
      }
    },
    dropDownEvent(item) {
      this.queryCondition.fund_code = item;
      this.isShowDropDownList = false;
      this.queryCondition.fund_code = item.slice(0, item.indexOf(' '));
    },
    choiceNegative(flag) {
      if (this.isNegative) {
        flag = false;
        this.isNegative = flag;
        this.queryCondition.checked = 0;
        this.queryCondition.is_delete = 1;
      }
      else {
        flag = true;
        this.isNegative = flag;
        this.queryCondition.checked = 0;
        this.queryCondition.is_delete = '';
      }
      // this.isNegative = flag;
      this.queryCondition.is_negative = flag ? 1 : '';
    },
    markingNegative(newsData, index, flag) {
      // http://10.25.24.51:10192/api/rest/nlp/risk/update_fund_manager_news?infocode=&is_negative=1&checked=1&is_delete=
      let sendData = flag ? '&is_negative=1&checked=0&is_delete=' : '&is_negative=&checked=0&is_delete=1';
      let url = 'http://10.25.24.51:10192/api/rest/nlp/risk/update_fund_manager_news?'
        + 'infocode=' + newsData.INFOCODE + sendData;
      this.$_axios.get(url)
        .then(response => {
          const resultData = response.data.result;
          if (flag) {
            if (resultData.update_result == 1) {
              this.dataList[index].is_negative = 1;
            }
            else if(resultData.update_result == 2){
               this.dataList[index].is_negative = 1;
            }
          } else {
            if (resultData.update_result == 1) {
              this.dataList[index].is_negative = null;
            }
            else if (resultData.update_result == 2) {
              this.dataList[index].is_negative = null;
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    paginationSelect(pageNumber) {
      const sendData = JSON.parse(JSON.stringify(this.sendData));
      const url = "http://10.25.24.51:10192/api/rest/nlp/risk/funds_holding_stocks";
      sendData.page = pageNumber;
      this.$_axios.get(url, {
          params: sendData
        }).then(response => {
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
      if (this.queryCondition.fund_code == "" || this.queryCondition.fund_code == undefined) {
        alert("请输入基金代码！");
      }
      else {
        this.isShowQueryResult = true;
        this.hasResultData = false;
        this.sendData = JSON.parse(JSON.stringify(this.queryCondition));
        const urlapi = "http://10.25.24.51:10192/api/rest/nlp/risk/funds_holding_stocks?";
        this.url = urlapi
          + 'page=' + this.sendData.page + '&'
          + 'page_size=' + this.sendData.page_size + '&'
          + 'is_negative=' + this.sendData.is_negative + '&'
          + 'fund_code=' + this.sendData.fund_code + '&'
          + 'checked=' + this.sendData.checked
          ;
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
            this.resultData = response.data.result.Announce_List;
            this.resultData.forEach(item => {
              item.CONTENT = item.CONTENT.toString().replace(/\\r\\n\\r\\n/g, "<br>");
              item.CONTENT = item.CONTENT.toString().replace(/\\r\\n/g, "<br>");
            });
            this.dataList = JSON.parse(JSON.stringify(this.resultData));
            this.paginationData.page_Count = response.data.result.Page_Count;
            this.paginationData.total_Count = response.data.result.Total_Count;
            this.dataList.forEach(item => {
              item.CONTENT = item.CONTENT.toString().replace('[\u4e00-\u9fa5|0-9,-]+');
              item.RELATECODE = item.RELATECODE;
              item.SOURCE = item.SOURCE;
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
      }
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
    this.$_axios.get('http://10.25.24.51:10191/api/rest/nlp/query_stock_list?stock_type=F')
      .then(response => {
        this.fundList = response.data.result.stock_list;
        this.codeList = this.fundList.map(item => {
          return {
            code: item.slice(0, item.indexOf(' ')),
            name: item.slice(item.indexOf(' ') + 1)
          }
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
}
</script>

<style lang="less" scoped>
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
      width: 140px;
    }
    .tableTh:nth-child(3) {
      width: 120px;
    }
    .tableTh:nth-child(4) {
      width: 160px;
    }
    .tableTh:nth-child(5) {
      width: 100px;
    }
    .tableTh:nth-child(6) {
      width: 150px;
    }
  }
}

.drop-down-box {
  position: absolute;
  top: 75px;
  left: 70px;
  width: 175px;
  border: 1px solid #797979;
  background-color: #fff;
  z-index: 2;
  span {
    display: inline-block;
    width: 100%;
    height: 25px;
    line-height: 25px;
    cursor: pointer;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  span:hover {
    background-color: deepskyblue;
  }
}
</style>
