<template>
  <div>
    <!-- 黑天鹅 国际国内重大事件 -->
    <div>
      <div class="queryCondition-top">
        <div class="queryCondition-title">自定义板块黑天鹅事件</div>
        <div class="middle clearFloat">
          <!-- 查询条件框 -->
          <div>
            <!-- 栏目部分 -->
            <div class="floatLeft">
              <pull-down-list :prop='coloum' @coloumEvent='coloumEvent'></pull-down-list>
            </div>
            <div class="floatLeft">
              <date-picker :prop="startDatePicker" @startDateEvent="startDateEvent"></date-picker>
            </div>
            <div class="floatLeft">
              <date-picker :prop="endDatePicker" @endDateEvent="endDateEvent"></date-picker>
            </div>
            <!-- 板块名部分 -->
            <div class="floatLeft">
              <pull-down-list :prop="modulesNameList" @modulesNameEvent='modulesNameEvent'></pull-down-list>
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
      <div v-if="isShowQueryResult" class="queryResult">
        <div v-if="hasResultData">
          <table>
            <tbody>
              <tr>
                <th v-for="(item, index) of titleData" :key="index" class="tableThOne" width:100px>{{item}}</th>
              </tr>
              <tr v-for="(item, index) of dataList" :key="index">
                <td class="colorBule">
                  <a :href="item.purl" target="_bank">{{item.title}}</a>
                </td>
                <td>{{item.showtime}}</td>
                <td class="data-content">
                  <p v-html="item.content"></p>
                  <span @click="details(item, index)">{{item.details}}</span>
                </td>
                <td>{{item.source}}</td>
                <td>{{item.relatecodes}}</td>
                <td>{{item.relatenames}}</td>
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
import pagination from '@/components/common/pagination'
import pullDownList from '@/components/common/pullDownList'
import commonMethods from '@/common/common.js'
import datePicker from '@/components/common/datePicker'
import keyword from '@/components/common/keyword'
export default {
  data() {
    const oneDayAfter = new Date().getTime() - 86400000;
    return {
      url: 'http://10.25.24.51:10193/api/risk/delist_caution_customize?',
      isShowQueryResult: false,
      hasResultData: false,
      resultData: null,
      queryCondition: {
        keyword: '',
        start_date:'',
        end_date:'',
        userid: 'risk',
        sector:'',
        news_type:'',
        page: 0,
        page_size: 10,
      },
      sendData: {},
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
      coloum: {
        title: '栏目:',
        parentEvent: 'coloumEvent',
        default: '请选择',
        listWidth: 145,
        nowSelectWidth: 147,
        nowSelectHeight: 25,
        nowSelectFontSize: 13,
        list: [
            '退市警示',
            '高管离职',
            '国际国内重大事件'
        ]
      },
      listtemp:[
          {
            code:"0",
            content:"退市警示",
          },
          {
            code:"1",
            content:"高管离职",
          },
          {                                                          
            code:"2",
            content:"国际国内重大事件"
          },  
      ],
      paginationData: {
        parentEvent: 'paginationSelect',
        page_Count: 0,
        total_Count: 0,
        current: 1
      },
      titleData: ['新闻标题', '新闻日期', '新闻内容', '新闻来源','证券代码','证券名称'],
      dataList: [],
    }
  },
  components: {
    pagination,
    datePicker,
    keyword,
    pullDownList
  },
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

      });
  
  },
  methods: {
      //栏目部分
    coloumEvent(data) {
      let code = this.listtemp.find(v => {
        return v.content === data;
      })
      // console.log(code)
      this.queryCondition.news_type = code.code;  
      console.log(this.queryCondition.news_type)
     
    
    },
    //板块名部分
    modulesNameEvent(...data) {
    //   this.sector = data[0];
      // console.log(data[0])
      this.queryCondition.sector = data[0]
      console.log(this.queryCondition.sector)
    },
    // inputEvent() {
    //   this.queryCondition.keyword = commonMethods.checkName(this.queryCondition.keyword);
    //   console.log(this.queryCondition.keyword)
    // },
    paginationSelect(pageNumber) {
      const sendData = JSON.parse(JSON.stringify(this.sendData));
      sendData.page = pageNumber - 1;
      console.log('sendData', sendData)
      this.$_axios.get(this.url, {
        params: sendData
      }).then(response => {
        console.log('法律法规查询结果', response.data.result);
        this.resultData = response.data.result.result;
        this.resultData.forEach(item => {
          item.content = item.content.toString().replace(/\\r\\n\\r\\n/g, "<br>");
          item.content = item.content.toString().replace(/\\r\\n/g, "<br>");
        });
        this.dataList = JSON.parse(JSON.stringify(this.resultData));
        this.dataList.forEach(item => {
          // item.SHOWTIME = item.SHOWTIME ? commonMethods.formatDateTime(new Date(item.SHOWTIME)) : '-';
          if (item.content && item.content.length > 150) {
            item.content = item.content.slice(0, 150) + '...';
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
      console.log(this.sendData)
    //   for (let key in this.sendData) {
    //     if (!this.sendData[key]) {
    //       delete this.sendData[key];
    //     }
    //   }
      if(this.queryCondition.news_type == ''){
          alert('请选择栏目')
          return;
      }

      if(this.queryCondition.sector == ''){
        alert('请选择板块名')
        return
      }
      console.log('sendData', this.sendData)
      this.$_axios.get(this.url, {
        params: this.sendData
      }).then(response => {
        // 显示查询结果
        this.hasResultData = true;
        console.log('黑天鹅查询结果', response.data.result);
        this.resultData = response.data.result.result;
        this.resultData.forEach(item => {
          item.content = item.content.toString().replace(/\\r\\n\\r\\n/g, "<br>");
          item.content = item.content.toString().replace(/\\r\\n/g, "<br>");
        });
        this.dataList = JSON.parse(JSON.stringify(this.resultData));
        console.log(this.dataList)
        this.paginationData.page_Count = Math.ceil(response.data.result.total_count / 10);
        this.paginationData.total_Count = response.data.result.total_count;
        this.dataList.forEach(item => {
          // item.SHOWTIME = item.SHOWTIME ? commonMethods.formatDateTime(new Date(item.SHOWTIME)) : '-';
          if (item.content && item.content.length > 150) {
            item.content = item.content.slice(0, 150) + '...';
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
        item.content = item.content.slice(0, 210) + '...';
      } else {
        item.details = '收起';
        item.content = this.resultData[index].content;
      }
    },
    keywordEvent(...data) {
      this.queryCondition.keyword = data[0];
      console.log(this.queryCondition.keyword)
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
    console.log(this.queryCondition.start_date,this.queryCondition.end_date)
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
    .tableThOne:nth-child(1) {
      width: 144px ;
    }
    .tableThOne:nth-child(2) {
      width: 63px;
    }
    .tableThOne:nth-child(3) {
      width: 144px;
    }
    .tableThOne:nth-child(4) {
      width: 50px;
    }
    .tableThOne:nth-child(5) {
      width: 50px;
    }
    .tableThOne:nth-child(6) {
      width: 50px;
    }
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

  }
}
</style>
