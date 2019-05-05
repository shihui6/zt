<template>
  <div>
    <!-- 基金 公告预警 -->
    <div>
      <div class="queryCondition-top">
        <div class="queryCondition-title">公告预警</div>
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
              <div v-on:mouseleave="isShowDropDownList = false" class="floatLeft drop-down">
                基金代码： <input @input="inputCode" type="text" v-model="nowEquityNo" placeholder="默认范围">
                <!-- @input="inputCode" -->
                <span v-if="isShowDropDownList" class="drop-down-box">
                  <span v-for="(item, index) of dropDownList" :key="index" @click="dropDownEvent(item)">{{item}}</span>
                </span>
              </div>
              <!-- 基金名称：<input v-model="queryCondition.securityname" type="text"> -->
            </div>
            <!-- <div class="floatLeft">
              基金代码：<input v-model="queryCondition.securitycode" type="text">
            </div> -->
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
                <td @click="newsDetails(item)" class="title colorBule">{{item.noticetitle}}</td>
                <td>{{item.noticedate}}</td>
                <td>{{item.columnname}}</td>
                <td>{{item.importlevel}}</td>
                <td>{{item.securitycode}}</td>
                <td class="data-content">
                  <p v-html="item.securityname"></p>
                  <span @click="details(item, index)">{{item.details}}</span>
                </td>
                <td>{{item.securitytype}}</td>
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
            <!-- <p>新闻编号：{{detailsData.infocode}}</p> -->
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
import pagination from '@/components/common/pagination'
import commonMethods from '@/common/common.js'
import datePicker from '@/components/common/datePicker'

export default {
  data() {
    const oneDayAfter = new Date().getTime() - 86400000;
    return {
      url: 'http://10.25.24.51:10193/api/risk/fund_announce?',
      isShowQueryResult: false,
      hasResultData: false,
      isShowDetails: false,
      resultData: null,
      queryCondition: {
        securitycode: '',
        start_date: '',
        end_date: '',
        page: 0,
        page_size: 10,
      },
      startDatePicker: {
        title: '日期：',
        parentEvent: 'startDateEvent',
        defaultDate: new Date(oneDayAfter)
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
      titleData: ['公告标题', '公告日期', '栏目名称', '重要性', '关联基金代码', '关联基金名称', '基金类型'],
      dataList: [],
      detailsData: {},
      isShowDropDownList: false,
      dropDownList: [],
      nowEquityNo: '',
    }
  },
  components: {
    pagination,
    datePicker
  },
  computed: {

  },
  methods: {

    details(item, index) {
      if (item.details == '收起') {
        item.details = '...详情';
        item.securityname = item.securityname.slice(0, 45) + '...';
      } else {
        item.details = '收起';
        item.securityname = this.resultData[index].securityname.join('\r\n');
      }
    },
    inputCode() {
      const numberReg = /^[0-9]*$/;
      this.nowEquityNo = commonMethods.checkName(this.nowEquityNo.trim());
      let arr = this.nowEquityNo.split('');
      let arr2 = [];
      console.log(arr)
      arr.forEach(item => {
        if (numberReg.test(item)) {
          arr2.push(item)
        }
      });
      console.log(arr)
      this.nowEquityNo = arr2.join('');


      return
      let keyword = commonMethods.checkName(this.nowEquityNo);
      this.nowEquityNo = keyword;

      let nowNumber = parseInt(this.nowEquityNo);
      // 输入数字过大
      if (nowNumber > 999999) {
        this.nowEquityNo = '';
      } else if (this.nowEquityNo.toString().length > 0) {
        const tempArr = [];
        this.isShowDropDownList = false;
        this.codeDataList.forEach(item => {
          if (item.indexOf(this.nowEquityNo.toString()) !== -1) {
            tempArr.push(item);
          }
        });
        this.dropDownList = tempArr.slice(0, 5);
      }
    },
    dropDownEvent(item) {
      return
      this.nowEquityNo = item;
      this.queryCondition.securitycode = item.split(' ')[0];
      this.isShowDropDownList = false;
    },
    paginationSelect(pageNumber) {
      const sendData = JSON.parse(JSON.stringify(this.sendData));
      sendData.page = pageNumber - 1;
      console.log('sendData', sendData)
      this.$_axios.get(this.url, {
        params: sendData
      }).then(response => {
        console.log('基金 公告预警', response.data.result);
        this.dataList = JSON.parse(JSON.stringify(response.data.result.result));
        this.resultData = response.data.result.result;
        this.dataList.forEach(item => {
          item.securityname = item.securityname.join('\r\n');
          if (item.securityname && item.securityname.length > 45) {
            item.securityname = `${item.securityname.slice(0, 45) + '...'}`;
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

      // const tempArr = [];
      // if(this.nowEquityNo){
      //   this.codeDataList.forEach(item => {
      //     if (item.indexOf(this.nowEquityNo.toString()) !== -1) {
      //       tempArr.push(item);
      //     }
      //   });
      //   if(tempArr.length){
      //     this.queryCondition.securitycode = tempArr[0].split(' ')[0];
      //   } else {
      //     console.log(this.nowEquityNo);
      //     if(this.nowEquityNo == '000000'){
      //       this.queryCondition.securitycode = '000000'
      //     } else {
      //       console.log(this.nowEquityNo);
      //       alert('代码错误或名称错误');
      //       return;
      //     }
      //   }
      // } else {
      //   this.queryCondition.securitycode = '';
      // }
      this.queryCondition.securitycode = this.nowEquityNo;
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
        console.log('基金 公告预警', response.data.result);
        this.dataList = JSON.parse(JSON.stringify(response.data.result.result));
        this.resultData = response.data.result.result;
        if (response.data.result.total_count) {
          this.paginationData.page_Count = Math.ceil(response.data.result.total_count / 10);
        } else {
          this.paginationData.page_Count = 0;
        }
        this.paginationData.total_Count = response.data.result.total_count;
        this.dataList.forEach(item => {
          item.securityname = item.securityname.join('\r\n');
          if (item.securityname && item.securityname.length > 45) {
            item.securityname = `${item.securityname.slice(0, 45) + '...'}`;
            item.details = '...详情';
          }
        });
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
      this.$_axios.get('http://10.25.24.51:10193/api/risk/fund_announce_detail?id=' + item.infocode)
        .then(response => {
          this.isShowDetails = true;
          const resultData = response.data.result.news_detail;
          this.detailsData = JSON.parse(JSON.stringify(resultData));
          this.detailsData.title = item.noticetitle;
        })
        .catch(err => {
          console.log(err);
        });
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
    this.queryCondition.from_date = commonMethods.formatDateTime2(this.startDatePicker.defaultDate);
    this.queryCondition.to_date = commonMethods.formatDateTime2(this.endDatePicker.defaultDate);
    this.codeDataList = this.$store.state.codeDataList_F;
    // const url = 'http://10.25.24.51:10193/api/risk/code_name_info';
    // const sendData = {
    //   security_type: 'F'
    // }
    // this.$_axios.get(url,{
    //     params:sendData
    //   }).then(response => {
    //     const resultData = response.data;
    //     if(resultData.msg === 'query success'){
    //       console.log(resultData.result.securitycodelist)
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
    width: 240px;
    border: 1px solid #797979;
    background-color: #fff;
    z-index: 1;
    span {
      float: left;
      width: 240px;
      cursor: pointer;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    span:hover {
      background-color: rgb(136, 179, 180);
    }
  }
}
.queryConditionBox {
  width: 100%;
  height: 70px;
  margin-top: 30px;
  border-bottom: 1px solid #797979;
  > div {
    float: left;
  }
  input {
    width: 110px;
    height: 25px;
    border: 1px solid #797979;
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
    .title {
      cursor: pointer;
    }
    .title:hover {
      text-decoration: underline;
    }
    .tableTh:nth-child(1) {
      width: 185px;
    }
    .tableTh:nth-child(2) {
      width: 80px;
    }
    .tableTh:nth-child(3) {
      width: 90px;
    }
    .tableTh:nth-child(4) {
      width: 50px;
    }
    .tableTh:nth-child(5) {
      width: 90px;
    }
    .tableTh:nth-child(7) {
      width: 90px;
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
