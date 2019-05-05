<template>
  <div>
    <!-- 公司信息查询 -->
    <div>
      <div class="queryCondition-top">
        <div class="queryCondition-title">公司信息查询</div>
        <div class="middle clearFloat">
          <!-- 查询条件框 -->
          <div>
            <div class="floatLeft">
              公司名称关联词：<input type="text" placeholder="请输入关联公司名称" class="input" v-model="keyword">
            </div>
          </div>
          <!-- 查询按钮 -->
          <div class="queryBtn">
            <span @click="query">查询</span>
            <!-- <span>查询</span> -->
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
                <router-link :to="{name:'companylist',params:{companycode:item.COMPANYCODE}}">{{item.COMPANYNAME}}</router-link>
                <td>{{item.COMPANYSNAME}}</td>
                <td>{{item.ORGTYPE}}</td>
                <td>{{item.NODETYPE}}</td>
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
import keyword from '@/components/common/keyword'
export default {
  data() {
    return {
      url: "http://10.25.24.51:10192/api/rest/nlp/risk/company_search?",
      keyword: "",
      isShowQueryResult: false,
      hasResultData: false,
      resultData: null,
      queryCondition: {
        keyword: '',
        page: 1,
        page_size: 10,
      },
      sendData: {},
      paginationData: {
        parentEvent: 'paginationSelect',
        page_Count: 0,
        total_Count: 0,
        current: 1
      },
      titleData: ['公司名称', '公司简称', '公司类型', '实体类型'],
      dataList: [],
    }
  },
  components: {
    pagination,
    datePicker,
    keyword
  },
  methods: {
    paginationSelect(pageNumber) {
      const sendData = JSON.parse(JSON.stringify(this.sendData));
      sendData.page = pageNumber;
      this.$_axios.get(this.url, {
        params: sendData
      }).then(response => {
        this.resultData = response.data.result.Company_List;
        this.dataList = JSON.parse(JSON.stringify(this.resultData));
        this.dataList.forEach(item => {
          item.COMPANYSNAME = item.COMPANYSNAME;
          item.COMPANYNAME = item.COMPANYNAME;
          item.NODETYPE = item.NODETYPE;
          item.ORGTYPE = item.ORGTYPE;
          item.COMPANYCODE = item.COMPANYCODE;
        });
      })
        .catch(err => {
          console.log(err);
        });
    },
    query() {
      this.isShowQueryResult = true;
      this.hasResultData = false;
      this.queryCondition.keyword = this.keyword;
      this.sendData = JSON.parse(JSON.stringify(this.queryCondition));
      for (let key in this.sendData) {
        if (!this.sendData[key]) {
          delete this.sendData[key];
        }
      }
      console.log('sendData', this.sendData)
      this.url = "http://10.25.24.51:10192/api/rest/nlp/risk/company_search?";
      this.$_axios.get(this.url, {
        params: this.sendData
      }).then(response => {
        // 显示查询结果
        this.hasResultData = true;
        this.resultData = response.data.result.Company_List;
        this.dataList = JSON.parse(JSON.stringify(this.resultData));
        this.paginationData.page_Count = response.data.result.Page_Count;
        this.paginationData.total_Count = response.data.result.Total_Count;
        this.dataList.forEach(item => {
          item.COMPANYSNAME = item.COMPANYSNAME;
          item.COMPANYNAME = item.COMPANYNAME;
          item.NODETYPE = item.NODETYPE;
          item.ORGTYPE = item.ORGTYPE;
          item.COMPANYCODE = item.COMPANYCODE;
        });
      })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {

  }
}
</script>

<style lang="less" scoped>
.input {
  width: 300px !important;
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
    width: 320px;
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
      a {
        display: block;
        margin-top: 20px;
        text-align: center;
      }
    }
    td {
      height: 60px;
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
    .tableTh:nth-child(1) {
      width: 450px;
    }
    .tableTh:nth-child(2) {
      width: 150px;
    }
    .tableTh:nth-child(4) {
      width: 150px;
    }
  }
}
</style>
