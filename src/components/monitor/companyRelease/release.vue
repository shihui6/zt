<template>
  <div>
    <!-- 黑天鹅 退市警示 -->
    <div>
      <div class="queryCondition-top">
        <div class="queryCondition-title">公告</div>
        <div class="middle clearFloat">
          <!-- 查询条件框 -->
          <div class="zongtiaojian">
            <div class="floatLeft">
              <date-picker :prop="startDatePicker" @startDateEvent="startDateEvent"></date-picker>
            </div>
            <div class="floatLeft">
              <date-picker :prop="endDatePicker" @endDateEvent="endDateEvent"></date-picker>
            </div>
            <div class="floatLeft">
              <keyword @keywordEvent="keywordEvent"></keyword>
            </div>
            <div >
                <!-- <div class="floatLeft">
                    <label for="id" class="scree"><input id='id'  @input="kankan"  type="radio" value='1' v-model="param">按自定义板块筛选</label>
                </div> -->
                <div @click="checkRiskType" class="checkBox floatLeft marginTop10">
                  <span class="iconBox">
                    <i v-show="isShowTypeList"  class="dot"></i>
                  </span>
                  <span class="marginLeft20">按自定义板块筛选</span>
                </div>
                
                <div v-show='isShowTypeList' class="floatLeft bankuai">
                <pull-down-list :prop="modulesNameList" @modulesNameEvent='modulesNameEvent'></pull-down-list>
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
                <th v-for="(item, index) of titleData" :key="index" class="tableThOne" width:100px>{{item}}</th>
              </tr>
              <tr v-for="(item, index) of dataList" :key="index">
                  <td> <a target="_blank" :href="item.sourceurl">{{item.noticetitle}}</a></td>
                  <td>{{item.noticedate}}</td>
                  <td><button><router-link target="_blank" :to="'/monitor/homePage/fundDetail?id='+ item.infocode">详情>></router-link></button></td>
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
import pagination from '@/components/common/pagination'
import commonMethods from '@/common/common.js'
import datePicker from '@/components/common/datePicker'
import keyword from '@/components/common/keyword'

export default {
  data() {
    const week = new Date().getTime() - 86400000 * 7;
    // const oneDayAfter = new Date().getTime() - 86400000;
    return {
      url: 'http://10.25.24.51:10193/api/risk/zts_announce?',
      isShowQueryResult: false,
      hasResultData: false,
      isShowTypeList:false,
      resultData: null,
      param:null,
    //   param:true,
      queryCondition: {
        start_date:'',
        end_date:'',
        sectortype:0,
        userid:'risk',
        sector:'',
        keyword: '',
        page: 0,
        page_size: 10,
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
      paginationData: {
        parentEvent: 'paginationSelect',
        page_Count: 0,
        total_Count: 0,
        current: 1
      },
      titleData: ['公告标题', '公告日期', '详情'],
      dataList: [],
    }
  },
  components: {
    pagination,
    datePicker,
    keyword,
    pullDownList
  },

  //   computed: {
  //   isRouterGoNow() {
  //     return this.$store.state.routerGoNow;
  //   }
  // },
    //获取板块名称 进入页面发送请求
  created(){
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
        console.log(err)
      });
  
  },
  methods: {

    // 是否选中板块名
    checkRiskType() {
      this["isShowTypeList"] = !this[
        "isShowTypeList"
      ];
      
      // isShowTypeBox
      if (this["isShowTypeList"]) {
        this["isShowTypeBox"] = true;
      } else {
        this["isShowTypeBox"] = false;
        this["queryCondition"].risk_code = "";
      }
      console.log(this.isShowTypeList)

    },
      // kankan(){
      //     console.log(this.param)
      //     this.queryCondition.sectortype = 1
      //       console.log(this.queryCondition.sectortype)
      // },
    inputEvent() {
      this.queryCondition.keyword = commonMethods.checkName(this.queryCondition.keyword);
    },
    paginationSelect(pageNumber) {
      const sendData = JSON.parse(JSON.stringify(this.sendData));
      sendData.page = pageNumber - 1;
      console.log('sendData', sendData)
      this.$_axios.get(this.url, {
        params: sendData
      }).then(response => {
        console.log('法律法规查询结果', response.data.result);
        this.resultData = response.data.result.result;
        // this.resultData.forEach(item => {
        //   item.CONTENT = item.CONTENT.toString().replace(/\\r\\n\\r\\n/g, "<br>");
        //   item.CONTENT = item.CONTENT.toString().replace(/\\r\\n/g, "<br>");
        // });
        this.dataList = JSON.parse(JSON.stringify(this.resultData));
        // this.dataList.forEach(item => {
        //   // item.SHOWTIME = item.SHOWTIME ? commonMethods.formatDateTime(new Date(item.SHOWTIME)) : '-';
        //   if (item.CONTENT && item.CONTENT.length > 210) {
        //     item.CONTENT = item.CONTENT.slice(0, 210) + '...';
        //     item.details = '...详情';
        //   }
        // });
      })
        .catch(err => {
          console.log(err);
        });
    },
    query() {
      this.isShowQueryResult = true;
      this.hasResultData = false;
      if(this.isShowTypeList){
        this.queryCondition.sectortype = 1
        if(this.queryCondition.sector == ''){
          alert('请选择板块名')
        }
      }else{
        this.queryCondition.sectortype = 0
        this.queryCondition.sector = ''
      }
      this.sendData = JSON.parse(JSON.stringify(this.queryCondition));
    //   for (let key in this.sendData) {
    //     if (!this.sendData[key]) {
    //       delete this.sendData[key];
    //     }
    //   }
      console.log('sendData', this.sendData)
      this.$_axios.get(this.url, {
        params: this.sendData
      }).then(response => {

        console.log(response.data)
        if(response.data.code == 410){
          alert(response.data.message)
          return;
        }
        // 显示查询结果
        this.hasResultData = true;
        console.log('法律法规查询结果', response.data.result);
        this.resultData = response.data.result.result;
        // this.resultData.forEach(item => {
        //   item.CONTENT = item.CONTENT.toString().replace(/\\r\\n\\r\\n/g, "<br>");
        //   item.CONTENT = item.CONTENT.toString().replace(/\\r\\n/g, "<br>");
        // });
        this.dataList = JSON.parse(JSON.stringify(this.resultData));
        this.paginationData.page_Count = Math.ceil(response.data.result.total_count/10);
        this.paginationData.total_Count = response.data.result.total_count;
        // this.dataList.forEach(item => {
        //   // item.SHOWTIME = item.SHOWTIME ? commonMethods.formatDateTime(new Date(item.SHOWTIME)) : '-';
        //   if (item.CONTENT && item.CONTENT.length > 210) {
        //     item.CONTENT = item.CONTENT.slice(0, 210) + '...';
        //     item.details = '...详情';
        //   }
        // });
      })
        .catch(err => {
          // console.log(err.response.status);
        });
    },
    //板块名部分
    modulesNameEvent(...data) {
    //   this.sector = data[0];
      // console.log(data[0])
    //   this.queryCondition.sectortype = 1
      this.queryCondition.sector = data[0]
      console.log(this.queryCondition.sector)
    },
    // details(item, index) {
    //   if (item.details == '收起') {
    //     item.details = '...详情';
    //     item.CONTENT = item.CONTENT.slice(0, 210) + '...';
    //   } else {
    //     item.details = '收起';
    //     item.CONTENT = this.resultData[index].CONTENT;
    //   }
    // },
    keywordEvent(...data) {
      this.queryCondition.keyword = data[0];
      console.log(this.queryCondition.keyword)
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
  .checkBox {
    position: relative;
    cursor: pointer;
    .iconBox {
      position: relative;
      display: inline-block;
      top: 1px;
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
    width: 120px;
    height: 25px;
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
.zongtiaojian{
  height:59px;
}
.scree{
    margin-top:2px;
}
.bankuai{
  margin-top:8px;
}
#id{
  width:  17px;
  height: 17px;
  font: 400 13px/25px Arial;
   vertical-align: bottom;
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
    .tableThOne:nth-child(1) {
      width: 938px;
    }
    .tableThOne:nth-child(2) {
      width: 116px;
    }
    .tableThOne:nth-child(4) {
      width: 90px;
    }
  }
}
</style>
