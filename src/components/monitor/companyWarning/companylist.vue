<template>
  <div>
    <!-- 公司信息查询 -->
    <div>
      <!-- <div class="queryCondition-top h">
        <div class="queryCondition-title">关联公司信息</div>
        <div class="middle clearFloat">
        </div>
      </div> -->
      <div class="categroy clearFloat">
        <span v-for="(item, index) of categroyList" :key="index" @click="categroyCheck(item, index)" :class="{active: index === categroyIndex}">{{item}}</span>
      </div>
      <!-- 查询结果 -->

      <div v-if="isShowQueryResult1" class="queryResult">
        <div v-if="hasResultData1">
          <div class="queryCondition-top mt10">
            <div class="">控股公司列表
            </div>
            <div class="middle clearFloat">
            </div>
          </div>
          <table>
            <tbody>
              <tr>
                <th v-for="(item, index) of titleData" :key="index" class="tableTh" width:100px>{{item}}</th>
              </tr>
              <tr v-for="(item, index) of dataList1" :key="index">
                <td>
                  {{item.ASSOCIATEDNAME}}
                </td>
                <td>{{item.HOLDINGTYPE}}</td>
                <td>{{item.RELATION}}</td>
              </tr>
            </tbody>
          </table>
          <!-- <pagination :prop="paginationData1" @paginationSelect="paginationSelect"></pagination> -->
        </div>
      </div>

      <div v-if="isShowQueryResult2" class="queryResult">
        <div v-if="hasResultData2">
          <div class="queryCondition-top mt10">
            <div class="">参股公司列表</div>
            <div class="middle clearFloat">
            </div>
          </div>
          <table>
            <tbody>
              <tr>
                <th v-for="(item, index) of titleData" :key="index" class="tableTh" width:100px>{{item}}</th>
              </tr>
              <tr v-for="(item, index) of dataList2" :key="index">
                <td>
                  {{item.ASSOCIATEDNAME}}
                </td>
                <td>{{item.HOLDINGTYPE}}</td>
                <td>{{item.RELATION}}</td>
              </tr>
            </tbody>
          </table>
          <!-- <pagination :prop="paginationData2" @paginationSelect="paginationSelect"></pagination> -->
        </div>
      </div>

      <div v-if="isShowQueryResult3" class="queryResult">
        <div v-if="hasResultData3">
          <div class="queryCondition-top mt10">
            <div class="">全资公司列表</div>
            <div class="middle clearFloat">
            </div>
          </div>
          <table>
            <tbody>
              <tr>
                <th v-for="(item, index) of titleData" :key="index" class="tableTh" width:100px>{{item}}</th>
              </tr>
              <tr v-for="(item, index) of dataList3" :key="index">
                <td>
                  {{item.ASSOCIATEDNAME}}
                </td>
                <td>{{item.HOLDINGTYPE}}</td>
                <td>{{item.RELATION}}</td>
              </tr>
            </tbody>
          </table>
          <!-- <pagination :prop="paginationData3" @paginationSelect="paginationSelect"></pagination> -->
        </div>
      </div>

      <div v-if="isShowQueryResult4" class="queryResult">
        <div v-if="hasResultData4">
          <div class="queryCondition-top mt10">
            <div class="">联营公司列表</div>
            <div class="middle clearFloat">
            </div>
          </div>
          <table>
            <tbody>
              <tr>
                <th v-for="(item, index) of titleData" :key="index" class="tableTh" width:100px>{{item}}</th>
              </tr>
              <tr v-for="(item, index) of dataList4" :key="index">
                <td>
                  {{item.ASSOCIATEDNAME}}
                </td>
                <td>{{item.HOLDINGTYPE}}</td>
                <td>{{item.RELATION}}</td>
              </tr>
            </tbody>
          </table>
          <!-- <pagination :prop="paginationData4" @paginationSelect="paginationSelect"></pagination> -->
        </div>
      </div>

      <div v-if="isShowQueryResult5" class="queryResult">
        <div v-if="hasResultData5">
          <div class="queryCondition-top mt10">
            <div class="">担保公司列表</div>
            <div class="middle clearFloat">
            </div>
          </div>
          <table>
            <tbody>
              <tr>
                <th v-for="(item, index) of titleData2" :key="index" class="tableTh" width:100px>{{item}}</th>
              </tr>
              <tr v-for="(item, index) of dataList5" :key="index">
                <td>
                  {{item.ASSOCIATEDNAME}}
                </td>
                <td>{{item.RELATION}}</td>
              </tr>
            </tbody>
          </table>
          <!-- <pagination :prop="paginationData5" @paginationSelect="paginationSelect"></pagination> -->
        </div>
      </div>
      <div class="queryBtn" v-show="isshow">
        <router-link :to="{name:'negativenews',params: { company_code_list: this.$store.state.company_code_list }}">相关负面新闻</router-link>
      </div>
      <div class="h50"></div>
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
    const oneDayAfter = new Date().getTime() - 86400000;
    return {
      url: "http://10.25.24.51:10192/api/rest/nlp/risk/relation_company?",
      Keyword: "",
      isshow: false,
      isShowQueryResult1: false,
      isShowQueryResult2: false,
      isShowQueryResult3: false,
      isShowQueryResult4: false,
      isShowQueryResult5: false,
      hasResultData1: false,
      hasResultData2: false,
      hasResultData3: false,
      hasResultData4: false,
      hasResultData5: false,
      categroyList: ["子公司", "母公司", "担保关系"],
      categroyIndex: 0,
      nowCategroy: "",
      resultData: [],
      queryCondition: {
        company_code: '',
        keyword: '',
        page: 1,
        page_size: 10,
      },
      sendData: {},
      paginationData1: {
        parentEvent: 'paginationSelect',
        page_Count1: 0,
        total_Count1: 0,
        current: 1
      },
      paginationData2: {
        parentEvent: 'paginationSelect',
        page_Count2: 0,
        total_Count2: 0,
        current: 1
      },
      paginationData3: {
        parentEvent: 'paginationSelect',
        page_Count3: 0,
        total_Count3: 0,
        current: 1
      },
      paginationData4: {
        parentEvent: 'paginationSelect',
        page_Count4: 0,
        total_Count4: 0,
        current: 1
      },
      paginationData5: {
        parentEvent: 'paginationSelect',
        page_Count5: 0,
        total_Count5: 0,
        current: 1
      },
      titleData: ['公司名称', '公司类型', '关系'],
      titleData2: ['公司名称', '关系'],
      dataList1: [],
      dataList2: [],
      dataList3: [],
      dataList4: [],
      dataList5: [],
    }
  },
  components: {
    pagination,
    datePicker,
    keyword
  },
  created() {
    const code = window.localStorage.getItem("company_code");
    if (!window.localStorage.getItem("company_code")) {
      if (this.$route.params.companycode) {
        window.localStorage.setItem("company_code", this.$route.params.companycode);
      }
    }
    else if (code != this.$route.params.companycode && this.$route.params.companycode) {
      window.localStorage.setItem("company_code", this.$route.params.companycode);
    }
    this.url = "http://10.25.24.51:10192/api/rest/nlp/risk/relation_company?";
    this.query();
  },
  methods: {
    paginationSelect(pageNumber) {
      const sendData = JSON.parse(JSON.stringify(this.sendData));
      sendData.page = pageNumber;
      console.log('sendData', sendData)
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
        });
      })
        .catch(err => {
          console.log(err);
        });
    },
    query() {
      this.isshow = false;
      this.isShowQueryResult1 = true;
      this.isShowQueryResult2 = true;
      this.isShowQueryResult3 = true;
      this.isShowQueryResult4 = true;
      this.isShowQueryResult5 = false;
      this.hasResultData1 = false;
      this.hasResultData2 = false;
      this.hasResultData3 = false;
      this.hasResultData4 = false;
      this.queryCondition.company_code = window.localStorage.getItem("company_code");
      this.sendData = JSON.parse(JSON.stringify(this.queryCondition));
      for (let key in this.sendData) {
        if (!this.sendData[key]) {
          delete this.sendData[key];
        }
      }
      this.$_axios.get(this.url, {
        params: this.sendData
      }).then(response => {
        // 显示查询结果
        this.$store.state.company_code_list = response.data.result.company_code_list;
        if (response.data.result.holding_count > 0) {
          this.isshow = true;
          this.hasResultData1 = true;
        }
        if (response.data.result.shareholding_count > 0) {
          this.isshow = true;
          this.hasResultData2 = true;
        }
        if (response.data.result.whollyowned_count > 0) {
          this.isshow = true;
          this.hasResultData3 = true;
        }
        if (response.data.result.associates_count > 0) {
          this.isshow = true;
          this.hasResultData4 = true;
        }
        //控股子公司
        this.dataList1 = JSON.parse(JSON.stringify(response.data.result.holding_list));
        //参股子公司
        this.dataList2 = JSON.parse(JSON.stringify(response.data.result.shareholding_list));
        //全资子公司
        this.dataList3 = JSON.parse(JSON.stringify(response.data.result.whollyowned_list));
        //联营子公司
        this.dataList4 = JSON.parse(JSON.stringify(response.data.result.associates_list));

        this.paginationData1.page_Count1 = response.data.result.Page_Count;
        this.paginationData1.total_Count1 = response.data.result.holding_count;
        this.paginationData2.page_Count2 = response.data.result.Page_Count;
        this.paginationData2.total_Count2 = response.data.result.shareholding_count;
        this.paginationData3.page_Count3 = response.data.result.Page_Count;
        this.paginationData3.total_Count3 = response.data.result.whollyowned_count;
        this.paginationData4.page_Count4 = response.data.result.Page_Count;
        this.paginationData4.total_Count4 = response.data.result.associates_count;
        this.dataList1.forEach(item => {
          item.ASSOCIATEDNAME = item.ASSOCIATEDNAME;
          item.HOLDINGTYPE = item.HOLDINGTYPE;
          item.RELATION = item.RELATION;
        });
        this.dataList2.forEach(item => {
          item.ASSOCIATEDNAME = item.ASSOCIATEDNAME;
          item.HOLDINGTYPE = item.HOLDINGTYPE;
          item.RELATION = item.RELATION;
        });
        this.dataList3.forEach(item => {
          item.ASSOCIATEDNAME = item.ASSOCIATEDNAME;
          item.HOLDINGTYPE = item.HOLDINGTYPE;
          item.RELATION = item.RELATION;
        });
        this.dataList4.forEach(item => {
          item.ASSOCIATEDNAME = item.ASSOCIATEDNAME;
          item.HOLDINGTYPE = item.HOLDINGTYPE;
          item.RELATION = item.RELATION;
        });
      })
        .catch(err => {
          console.log(err);
        });
    },
    // 顶部tab切换
    categroyCheck(item, index) {
      this.categroyIndex = index;
      this.nowCategroy = index;
      if (!this.categroyIndex) {
        this.nowCategroy = "";
      }
      if (this.categroyIndex == 0) {
        this.url = "http://10.25.24.51:10192/api/rest/nlp/risk/relation_company?";
        this.query();
      }
      if (this.categroyIndex == 1) {
        this.url = "http://10.25.24.51:10192/api/rest/nlp/risk/relation_company_parent?";
        this.query();
      }
      if (this.categroyIndex == 2) {
        this.url = "http://10.25.24.51:10192/api/rest/nlp/risk/relation_company_guarantee?";
        this.guaranteelist();
      }
    },
    guaranteelist() {
      this.isshow = false;
      this.isShowQueryResult1 = false;
      this.isShowQueryResult2 = false;
      this.isShowQueryResult3 = false;
      this.isShowQueryResult4 = false;
      this.isShowQueryResult5 = true;
      this.hasResultData5 = false;
      this.queryCondition.company_code = window.localStorage.getItem("company_code");
      this.sendData = JSON.parse(JSON.stringify(this.queryCondition));
      for (let key in this.sendData) {
        if (!this.sendData[key]) {
          delete this.sendData[key];
        }
      }
      this.$_axios.get(this.url, {
        params: this.sendData
      }).then(response => {
        // 显示查询结果
        if (response.data.result.guarantee_count > 0) {
          this.hasResultData5 = true;
          this.isshow = true;
        }
        this.$store.state.company_code_list = response.data.result.company_code_list;
        //担保公司
        this.dataList5 = JSON.parse(JSON.stringify(response.data.result.guarantee_list));
        this.paginationData5.page_Count5 = response.data.result.Page_Count;
        this.paginationData5.total_Count5 = response.data.result.holding_count;
        this.dataList5.forEach(item => {
          item.ASSOCIATEDNAME = item.ASSOCIATEDNAME;
          item.RELATION = item.RELATION;
        });
      })
        .catch(err => {
          console.log(err);
        });
    },
    // news() {
    //   this.$route.push({ path: '/monitor/companyWarning/negativenews', params: { company_code_list: this.$store.state.company_code_list } });
    // }
  },
  mounted() {

  }
}
</script>

<style lang="less" scoped>
a {
  color: white !important;
}
.h50 {
  height: 50px;
}
.mt10 {
  margin-top: 10px;
}
.categroy {
  span {
    float: left;
    width: 80px;
    height: 30px;
    cursor: pointer;
    text-align: center;
    line-height: 30px;
    color: #fff;
    background-color: #d7d7d7;
  }
  span.active {
    // background-color: rgba(0, 114, 255, 0.5);
    background-color: #b50229;
    font-size: 16px;
  }
}
.h {
  height: 70px;
}
.input {
  width: 300px !important;
}
.queryBtn {
  margin-top: 50px;
  width: 100px;
  height: 40px;
  margin-left: 500px;
  line-height: 40px;
  text-align: center;
  cursor: pointer;
  border: 1px solid #169bd5;
  background-color: #169bd5;
  color: white;
  border-radius: 5px;
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
      height: 40px;
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
      width: 350px;
    }
    .tableTh:nth-child(2) {
      width: 200px;
    }
    .tableTh:nth-child(3) {
      width: 200px;
    }
  }
}
</style>
