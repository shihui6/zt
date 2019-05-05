<template>
  <div>
    <div>
      <div class="categroy clearFloat">
        <span v-for="(item, index) of categroyList" :key="index" @click="categroyCheck(item, index)" :class="{active: index === categroyIndex}">{{item}}</span>
      </div>
      <div v-show="nowCategroy === ''">
        <div class="poolList">
          <ul class="clearFloat">
            <li v-for="(item, index) of poolList" :key="index" @click="poolCheck(item, index)" class="checkBox floatLeft marginLeft20">
              <span class="iconBox">
                <i v-show="item.check" class="dot"></i>
              </span>
              <span class="marginLeft20">{{item.title}}</span>
            </li>
          </ul>
        </div>
        <div class="poolBtnBox">
          <span @click="deleteList">删除</span>
          <span @click="clearList">清空</span>
        </div>
      </div>

      <div v-show="nowCategroy === 1">
        <div class="queryCondition-top">
          <div class="middle clearFloat">
            <div>
              <div class="floatLeft">
                关键字：<input @input="inputEventCheck" v-model="queryAddList.keyword" type="text">
              </div>
            </div>
            <div class="queryBtn">
              <span @click="query">查询</span>
            </div>
            <div class="queryBtn">
              <span @click="addToList" class="width">添加到关注池</span>
            </div>
          </div>
        </div>
        <div v-if="isShowAddListQuery" class="addListQueryBox">
          <div v-if="hasResultDataAddList">
            <ul class="clearFloat">
              <li v-for="(item,index) of nowAddListQueryData" :key="index" @click="addToListCheck(item, index)" :class="{active: item.check}" class="floatLeft">{{item.title}}</li>
            </ul>
            <div v-if="isShowAddListPage">
              <pagination :prop="paginationData_list" @paginationSelectList="paginationSelectList"></pagination>
            </div>
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

      <div v-show="nowCategroy === 2">
        <div class="queryCondition-top">
          <div class="middle clearFloat">
            <div>
              <div class="floatLeft">
                证券代码:<input @input="inputEventCheck" v-model="queryIssuer.seccode" type="text">
              </div>
              <div class="floatLeft">
                证券简称：<input @input="inputEventCheck" v-model="queryIssuer.secname" type="text">
              </div>
              <div class="queryBtn floatLeft ">
                <span @click="queryIssuerEvent" class="width btn">查找发行人</span>
              </div>
              <div class="floatLeft" style="margin-left:25px;">
                发行人：<input @input="inputEventCheck" v-model="querySecurities.issue" type="text">
              </div>
              <div class="queryBtn floatLeft ">
                <span @click="querySecuritiesEvent" class="width btn">查找证券信息</span>
              </div>
            </div>
          </div>
        </div>
        <div v-if="isShowQueryResult">
          <div v-if="isShowIssuer && !isShowSecurities" class="queryResult">
            <table>
              <tbody>
                <tr>
                  <th>证券代码</th>
                  <th>证券简称</th>
                </tr>
                <tr v-for="(item, index) of nowSecuritiesList" :key="index">
                  <td>{{item.sec_code}}</td>
                  <td>{{item.sec_name}}</td>
                </tr>
              </tbody>
            </table>
            <!-- <pagination :prop="paginationData" @paginationSelect="paginationSelect"></pagination> -->
          </div>
          <div v-if="isShowSecurities && !isShowIssuer" class="queryResult">
            <EasyScrollbar>
              <div style="height:540px;width:1000px">
                <div>
                  <div>
                    <table>
                      <tbody>
                        <tr>
                          <th>证券代码</th>
                          <th>证券简称</th>
                          <th>发行人</th>
                        </tr>
                        <tr v-for="(item, index) of queryIssuerData" :key="index">
                          <td>{{item.seccode}}</td>
                          <td>{{item.secname}}</td>
                          <td>{{item.issue}}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </EasyScrollbar>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import pullDownList from "@/components/common/pullDownList";
import pagination from "@/components/common/pagination";
import commonMethods from "@/common/common.js";
import datePicker from "@/components/common/datePicker";
import keyword from '@/components/common/keyword'
export default {
  data() {
    return {
      categroyIndex: 0,
      nowCategroy: "",
      isShowAddListQuery: false,
      hasResultDataAddList: false,
      isShowAddListPage: false,
      isShowQueryResult: false,
      isShowIssuer: false,
      isShowSecurities: false,
      addListQueryData: null,
      nowSecuritiesList: [],
      categroyList: ["我的关注池", "查找发行人", "发行人证券信息"],
      datalist: [],
      poolList: [],
      queryIssuerData: '',
      nowAddListQueryData: [],
      queryAddList: {
        companytype: 'N',
        keyword: '',
      },
      paginationData_list: {
        parentEvent: 'paginationSelectList',
        page_Count: 0,
        total_Count: 0,
        current: 1
      },
      queryIssuer: {
        seccode: '',
        secname: ''
      },
      querySecurities: {
        issue: ''
      },
    }
  },
  components: {
    pullDownList,
    pagination,
    datePicker,
    keyword
  },
  created() {
    this.created();
  },
  methods: {
    created() {
      const url = 'http://10.25.24.51:10193/api/risk/attention_pool_set';
      const sendData = {
        userid: 'neeq',
        action: 'query'
      }
      this.$_axios.get(url, {
        params: sendData
      }).then(response => {
        // 显示查询结果
        const resultData = response.data.result.attention_list;
        this.poolList = resultData.map(item => {
          return {
            title: item,
            check: false
          }
        });
      }).catch(err => {
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
      if (index == 0) {
        this.created();
      }
    },
    keywordEvent(...data) {
      this.queryCondition.keyword = data[0];
    },
    poolCheck(item, index) {
      item.check = !item.check;
    },
    clearList() {
      const sendData = {
        userid: 'neeq',
        action: 'drop'
      }
      this.$_axios.get('http://10.25.24.51:10193/api/risk/attention_pool_set', {
        params: sendData
      }).then(response => {
        // 显示查询结果
        console.log(response)
        if (response.status == 200 && response.data.msg === 'drop success') {
          this.poolList.forEach((item, index) => {
            this.poolList.splice(index);
          });
        }
      }).catch(err => {
        console.log(err);
      });
    },

    deleteList() {
      const url = 'http://10.25.24.51:10193/api/risk/attention_pool_set';
      const tempArr = [];
      const indexArr = [];
      const sendData = {
        userid: 'neeq',
        companylist: '',
        action: 'delete'
      }
      this.poolList.forEach((item, index) => {
        if (item.check) {
          tempArr.push(item.title);
          indexArr.push(index);
        }
      });
      sendData.companylist = tempArr.join(',');
      if (sendData.companylist === '') return;
      this.$_axios.get(url, {
        params: sendData
      }).then(response => {
        // 显示查询结果
        console.log(response)
        if (response.status == 200 && response.data.msg === 'delete success') {
          const tempArr = JSON.parse(JSON.stringify(this.poolList));
          const tempArr2 = [];
          this.poolList.forEach((item, index) => {
            if (item.check) {
              delete tempArr[index];
            }
          });
          tempArr.forEach(item => {
            if (item) {
              tempArr2.push(item);
            }
          });
          this.poolList = JSON.parse(JSON.stringify(tempArr2));
        }
      }).catch(err => {
        console.log(err);
      });
    },
    query() {
      this.isShowAddListQuery = false;
      this.isShowAddListPage = false;
      this.hasResultDataAddList = false;
      const url = 'http://10.25.24.51:10193/api/risk/attention_base_query';
      this.addListSendData = {
        companytype: this.queryAddList.companytype,
        keyword: this.queryAddList.keyword,
      }
      console.log('sendData', this.addListSendData)
      this.$_axios.get(url, {
        params: this.addListSendData
      }).then(response => {
        // 显示查询结果
        this.hasResultDataAddList = true;
        this.isShowAddListQuery = true;
        const resultData = response.data.result.result;
        this.addListQueryData = resultData.map(item => {
          return {
            check: false,
            title: item
          }
        });
        if (this.addListQueryData.length > 60) {
          this.paginationData_list.page_Count = Math.ceil(this.addListQueryData.length / 60)
          this.paginationData_list.total_Count = this.addListQueryData.length;
          this.nowAddListQueryData = this.addListQueryData.slice(0, 60);
          this.isShowAddListPage = true;
        } else {
          this.nowAddListQueryData = JSON.parse(JSON.stringify(this.addListQueryData));
          this.paginationData_list.page_Count = Math.ceil(this.addListQueryData.length / 60)
          this.paginationData_list.total_Count = this.addListQueryData.length;
          this.isShowAddListPage = true;
        }
        console.log(resultData)
      }).catch(err => {
        console.log(err);
      });
    },
    inputEventCheck() {
      this.queryIssuer.seccode = commonMethods.checkName(this.queryIssuer.seccode.trim());
      this.queryIssuer.secname = commonMethods.checkName(this.queryIssuer.secname.trim());
      this.querySecurities.issue = commonMethods.checkName(this.querySecurities.issue.trim());
      this.queryAddList.keyword = commonMethods.checkName(this.queryAddList.keyword.trim());
    },
    addToList() {
      const tempArr = [];
      const url = 'http://10.25.24.51:10193/api/risk/attention_pool_set'
      const sendData = {
        userid: 'neeq',
        action: 'insert',
        companytype: this.addListSendData.companytype,
        companylist: '',
      }
      this.nowAddListQueryData.forEach(item => {
        if (item.check) {
          tempArr.push(item.title);
        }
      });
      sendData.companylist = tempArr.join(',');
      console.log(sendData)
      this.$_axios.get(url, {
        params: sendData
      }).then(response => {
        // 显示查询结果
        const resultData = response.data;
        console.log(resultData)
        if (resultData.code == '0') {
          alert('添加成功');
          // this.nowAddListQueryData.forEach(item => {
          //   if (item.check) {
          //     item.check = !item.check;
          //   }
          // });
        } else if (resultData.code == '1') {
          alert('添加失败');
        } else {
          alert('无需添加');
        }
      }).catch(err => {
        console.log(err);
      });
    },
    addToListCheck(item, index) {
      item.check = !item.check;
    },
    paginationSelectList(number) {
      this.nowAddListPage = number - 1;
      this.nowAddListQueryData = this.addListQueryData.slice(this.nowAddListPage * 60, (Number(this.nowAddListPage) + 1) * 60);
    },
    queryIssuerEvent() {
      this.isShowSecurities = false;
      this.isShowQueryResult = false;
      this.isShowIssuer = false;
      const url = 'http://10.25.24.51:10193/api/risk/seccode_issue_mapper';
      const sendData = {
        seccode: this.queryIssuer.seccode,
        secname: this.queryIssuer.secname
      }
      if (!sendData.seccode && !sendData.secname) {
        alert('请输入证券代码或简称');
        return;
      }
      console.log('sendData', sendData)
      this.$_axios.get(url, {
        params: sendData
      }).then(response => {
        // 显示查询结果
        console.log(response.data)
        const resultData = response.data;
        if (resultData.msg === 'query success') {
          this.isShowSecurities = true;
          this.isShowQueryResult = true;
          console.log('', resultData.result.issue)
          if (!resultData.result.issue.length) {
            this.queryIssuerData = [{ issue: '无匹配', seccode: '无匹配', secname: '无匹配' }]
          } else {
            this.queryIssuerData = JSON.parse(JSON.stringify(resultData.result.issue));
            this.queryIssuerData = resultData.result.issue.map(item => {
              const issue = item.issue ? item.issue : '无匹配';
              const seccode = item.seccode ? item.seccode : '无匹配';
              const secname = item.secname ? item.secname : '无匹配';
              return {
                issue,
                seccode,
                secname
              }
              // return item = '发行人：' + issue + '； ' + '证券代码：' + seccode + '； ' + '证券简称：' + secname + '； '
            });
          }
        } else {
          this.isShowSecurities = true;
          this.isShowQueryResult = true;
          this.queryIssuerData = [{ issue: '无匹配', seccode: '无匹配', secname: '无匹配' }]
        }
      }).catch(err => {
        this.isShowSecurities = true;
        this.isShowQueryResult = true;
        this.queryIssuerData = [{ issue: '无匹配', seccode: '无匹配', secname: '无匹配' }]
      });
    },
    // 查询证券信息
    querySecuritiesEvent() {
      this.isShowQueryResult = false;
      const url = 'http://10.25.24.51:10193/api/risk/issue_seccode_mapper';
      const sendData = {
        issue: this.querySecurities.issue
      }
      console.log('sendData', sendData)
      this.$_axios.get(url, {
        params: sendData
      }).then(response => {
        // 显示查询结果
        this.isShowQueryResult = true;
        this.isShowIssuer = true;
        this.isShowSecurities = false;
        console.log(response.data)
        if (response.data.code == 0 && response.data.msg == 'query success') {
          const resultData = response.data.result.seccodes_names;
          this.securitiesList = JSON.parse(JSON.stringify(resultData));
          // this.paginationData.page_Count = Math.floor(this.securitiesList.length / 30)
          // this.paginationData.total_Count = this.securitiesList.length;
          this.nowSecuritiesList = this.securitiesList.slice(0, 30);
        } else {
          // this.paginationData.page_Count = 0;
          // this.paginationData.total_Count = 0;
          this.nowSecuritiesList = [];
        }

      }).catch(err => {
        console.log(err);
        this.isShowQueryResult = true;
        this.isShowIssuer = true;
        this.isShowSecurities = false;
        // this.paginationData.page_Count = 0;
        // this.paginationData.total_Count = 0;
        this.nowSecuritiesList = [];
      });
    },
  },
  mounted() {

  }
}
</script>

<style lang="less" scoped>
.queryIssuerDataList {
  width: 1000px;
  height: 540px;
  th:nth-child(1) {
    width: 100px;
  }
  th:nth-child(2) {
    width: 250px;
  }
  th:nth-child(3) {
    width: 300px;
  }
  li {
    float: left;
    margin-left: 30px;
  }
}
.btn {
  margin-top: -4px;
  margin-left: -30px;
}
.width {
  width: 150px !important;
}
.addListQueryBox {
  width: 1000px;
  margin-top: 20px;
  li {
    width: 200px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    cursor: pointer;
    border: 1px solid #797979;
    background-color: #fff;
  }
  li.active {
    background-color: rgba(0, 114, 255, 0.3);
  }
}
.poolBtnBox {
  margin-top: 40px;
  height: 60px;
  span {
    cursor: pointer;
    padding: 6px;
    margin-left: 20px;
    border: 1px solid #797979;
    border-radius: 5px;
  }
}
.poolList {
  margin-top: 50px;
  width: 700px;
  .checkBox {
    position: relative;
    cursor: pointer;
    .iconBox {
      position: absolute;
      display: inline-block;
      top: 5px;
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
}
.categroy {
  span {
    float: left;
    width: 140px;
    height: 40px;
    cursor: pointer;
    text-align: center;
    line-height: 40px;
    color: #fff;
    background-color: #d7d7d7;
  }
  span.active {
    // background-color: rgba(0, 114, 255, 0.5);
    background-color: #b50229;
    font-size: 17px;
  }
}
.queryConditionBox {
  position: relative;
  width: 100%;
  height: 110px;
  // margin-top: 30px;
  line-height: 25px;
  // border-bottom: 1px solid #797979;

  border: 1px solid #797979;
  padding-top: 10px;
  input {
    width: 130px;
    height: 25px;
    border: 1px solid #797979;
  }
  .nowConditionStarBox {
    position: relative;
    .starBg {
      cursor: pointer;
    }
    .nowConditionStar {
      position: absolute;
      top: -1px;
      left: 96px;
      pointer-events: none;
    }
  }
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
  .uploadFiles {
    float: left;
    input {
      position: absolute;
      width: 0;
      height: 0;
      opacity: 0;
      z-index: -2;
    }
    label {
      float: left;
      // width: 200px;
      cursor: pointer;
    }
    .clearFile,
    .fileExportBtn {
      background-color: #eaeaea;
      padding: 5px;
      border: 1px solid #797979;
      border-radius: 5px;
      cursor: pointer;
    }
    .fileExportBtn {
      pointer-events: none;
    }
  }
  .enshrineBox {
    float: left;
    span {
      cursor: pointer;
    }
    a {
      color: #000;
    }
  }
  .queryBtn {
    position: absolute;
    top: 15px;
    left: 710px;
    width: 75px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    cursor: pointer;
    background-color: #fff;
    border-radius: 5px;
  }
}
.typeBox {
  .firstTypeBox {
    float: left;
    width: 480px;
    margin-left: 30px;
    margin-top: 30px;
    li {
      float: left;
      width: 115px;
      cursor: pointer;
      > div {
        position: relative;
      }
      .iconBox {
        position: absolute;
        display: inline-block;
        top: 3px;
        width: 12px;
        height: 12px;
        border-radius: 3px;
        border: 1px solid #797979;
        .iconfont {
          position: absolute;
          top: -2px;
          left: -7px;
        }
      }
      .firstType {
        margin-left: 20px;
      }
    }
  }
  .typeBtnBox {
    float: left;
    width: 430px;
    span {
      display: inline-block;
      width: 110px;
      height: 30px;
      margin-top: 40px;
      margin-left: 20px;
      cursor: pointer;
      text-align: center;
      line-height: 30px;
      background-color: #e7e7e7;
      border: 1px solid #797979;
    }
  }
  .secondTypeBox {
    float: left;
    width: 1180px;
    margin-top: 10px;
    .firstItem {
      float: left;
      margin-left: 10px;
      margin-top: 10px;
      width: 1180px;
      border: 1px solid #797979;
      .firstTitle {
        float: left;
        // height: 78px;
      }
      .listBox {
        float: right;
        width: 1070px;
      }
    }
    .secondItemLi {
      // width: 130px;
      position: relative;
      float: left;
      text-align: center;
      margin-right: 15px;
      cursor: pointer;
      // min-height: 38px;
      // border-bottom: 1px solid #797979;
      .iconBox {
        position: absolute;
        display: inline-block;
        top: 4px;
        width: 12px;
        height: 12px;
        border-radius: 3px;
        border: 1px solid #797979;
        .iconfont {
          position: absolute;
          top: -2px;
          left: -7px;
        }
      }
      .secondType {
        margin-left: 20px;
      }
    }
    // .secondItemLi:nth-last-child(1){
    //   border-bottom: none;
    // }
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
    .starBox {
      position: relative;
      .starBg {
        span {
          cursor: pointer;
        }
      }
      .starBg.condition {
        float: left;
      }
      .nowStarNumber {
        position: absolute;
        top: 50%;
        left: 26px;
        transform: translate(0px, -10px);
        pointer-events: none;
        span {
          float: left;
        }
      }
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
    .updateBtn {
      padding: 5px;
      cursor: pointer;
      border: 1px solid #797979;
      border-radius: 5px;
      background-color: #f3f3f3;
    }
    th:nth-child(1) {
      width: 75px;
    }
    th:nth-child(2) {
      width: 165px;
    }
    th:nth-child(3) {
      width: 160px;
    }
    th:nth-child(4) {
      width: 75px;
    }
  }
}

.height {
  height: 150px !important;
}

.ml20 {
  width: 300px;
  float: left;
  margin-left: 40px;
}

.input {
  width: 200px;
}

.yesBtn {
  position: absolute;
  left: 760px;
  top: 113px;
  width: 75px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  cursor: pointer;
  border: 1px solid #797979;
  background-color: #fff;
  border-radius: 5px;
}

.codespan {
  width: 350px;
  position: absolute;
  left: 820px;
  top: 10px;
  word-break: break-all;
  word-wrap: break-word;
}

.input {
  width: 130px;
  height: 25px;
  border: 1px solid #797979;
}

.mtt {
  margin-top: 40px !important;
  margin-left: 60px !important;
}
.a {
  color: blue;
}
</style>

