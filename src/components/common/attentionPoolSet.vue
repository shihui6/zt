<template>
  <div class="attentionPoolBox">
    <div>
      <div class="tab">
        <h4 @click="switchTab(1)" :class="{active: nowTab == '1'}">我的关注池</h4>
        <h4 @click="switchTab(2)" class="marginLeft15" :class="{active: nowTab == '2'}">查找发行人</h4>
        <h4 @click="switchTab(3)" class="marginLeft15" :class="{active: nowTab == '3'}">发行人证券信息</h4>
        <!-- <span @click="closeAttentionPool" class="close marginLeft85">×</span> -->
        <span onclick="window.history.go(-1)" class="close marginLeft85">×</span>
      </div>
      <div v-show="nowTab == '1'">
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
        <div class="poolBtnBox" v-show="isClearList">
          <span @click="deleteList">删除</span>
          <span @click="clearList">清空</span>
        </div>
        <!-- 右侧表单添加内容 -->
        <div class="my_content" v-show="isContent">
            <span class="news_content">相关新闻</span>
            <span class="more_choose" @click="morenews">更多筛选>></span>
              <div v-show="ismorechoose" class="content_more">
                <div class="content_more_first">
                  <span>发行人:</span>
                  <div class="content_more_second">
                    <label for="quanbu"><input type="checkbox" id='quanbu' v-model="checked"  @click="checkedAll">全部</label><br>
                    <ul>
                      <!-- 复选框渲染 -->
                      <li v-for="(item , index) of sencondResult" :key="index"><label :for="index"><input type="checkbox" @click='btnCheck(index)' :id="index" v-model="checkboxModel" :value='item.id' >{{item.value}}</label></li>
                                                                                                                       <!-- @click='btnCheck(item,index)' -->
                    </ul>
                  </div>
                </div>
                <div>
                  <div class="floatLeft">
                    <date-picker :prop="startDatePicker" @startDateEvent="startDateEvent" ></date-picker>
                  </div>
                              <!-- 结束时间 -->
                  <div class="floatLeft">
                    <date-picker :prop="endDatePicker" @endDateEvent="endDateEvent"></date-picker>
                  </div>
                </div>
                          <!-- 查询按钮 -->
                <div class="queryBtn">
                  <span @click="query" class="btnquery">查询</span>
                </div>
            </div>
            <!-- <ul class="newUl">
              <li><span class="content_time_top">发布时间</span><span class="content_between_top">标题</span><span class="content_news_top">新闻来源</span></li>
              <li v-for="(item , index) of dataList" :key="index">
                <span class="content_time">{{item.showtime}}</span>
                <span class="content_between"><a :href="item.purl">{{item.title}}</a></span>
                <span class="content_news">{{item.source}}</span></li>
            </ul>   -->
            <table>
              <tbody>
                <tr>
                  <th v-for="(item, index) of titleData" :key="index" class="tableTh" width:100px>{{item}}</th>
                </tr>
                <tr v-for="(item, index) of dataList" :key="index">
                  <td><a target="_blank" :href="item.sourceurl">{{item.showtime}}</a></td>
                  <td><a :href="item.purl">{{item.title}}</a></td>
                  <td>{{item.source}}</td>
                </tr>
              </tbody>
            </table>
              <pagination :prop="paginationData1" @paginationSelect="paginationSelect"></pagination>
                       
        </div>
       <!-- ------------------------------------------------------------------------------------------ -->
      </div>
      <div v-show="nowTab == '3'" class="queryBox">
        <div class="clearFloat">
          <div class="top floatLeft">
            <!-- 通过注册input事件触发inputEventCheck -->
            证券代码：<input @input="inputEventCheck" v-model="queryIssuer.seccode" type="text" class="marginTop20">
            证券简称：<input @input="inputEventCheck" v-model="queryIssuer.secname" type="text">
            <span @click="queryIssuerEvent" class="queryBtn marginLeft10">查询发行人</span>
          </div>
          <div class="top floatLeft">
            发行人：<input @input="inputEventCheck" v-model="querySecurities.issue" type="text" class="marginTop20 marginLeft20">
            <span @click="querySecuritiesEvent" class="queryBtn marginLeft20">查询证券信息</span>
          </div>
        </div>
        <div v-if="isShowQueryResult">
          <div v-if="isShowIssuer && !isShowSecurities">
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
          <pagination :prop="paginationData2" @paginationSelect2="paginationSelect2"></pagination>
          </div>
          <div v-if="isShowSecurities && !isShowIssuer" class="queryIssuerDataList">
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
                    <!-- <ul class="clearFloat">
                      <li v-for="(item, index) of queryIssuerData" :key="index" class="floatLeft">{{item}}</li>
                    </ul> -->
                  </div>
                </div>
              </div>
            </EasyScrollbar>
          </div>
        </div>
      </div>
      <div v-show="nowTab == '2'" class="addListBox">
        <div class="otherBox">
          <div class="clearFloat">
            <div class="floatLeft">
              <pull-down-list :prop="typeList" @typeListEvent='typeListEvent'></pull-down-list>
            </div>
            <div class="floatLeft marginLeft20">
              关键字：<input @input="inputEventCheck" v-model="queryAddList.keyword" type="text">
            </div>
            <div class="floatLeft marginLeft20 marginTop3">
              <span @click="addListQuery" class="queryBtn">搜索</span>
            </div>
            <div class="floatLeft marginLeft20 marginTop3">
              <span @click="addToList" class="queryBtn">添加到关注池</span>
            </div>
          </div>
          <div v-if="isShowAddListQuery" class="addListQueryBox">
            <div v-if="hasResultDataAddList">
              <ul class="clearFloat">
                <li v-for="(item,index) of nowAddListQueryData" 
                    :key="index" 
                    @click="addToListCheck(item, index)"
                    :class="{active: item.check}" class="floatLeft">{{item.title}}</li>
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
      </div>
    </div>
  </div>
</template>

<script>
import commonMethods from '@/common/common.js'
import pagination from '@/components/common/pagination'
import pullDownList from '@/components/common/pullDownList'
import datePicker from '@/components/common/datePicker'
export default {
  data(){
       const now = new Date();
       const week = now.getTime() - 604800000;
    return {
      isContent:true,
      isClearList:true,
      ischecked:false,
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
      titleData:['发布时间','标题','新闻来源'],
      ismorechoose:false,
      nowTab: true,
      isAddList: false,
      isShowQueryResult: false,
      isShowIssuer: false,
      isShowSecurities: false,
      isShowAddListQuery:false,
      hasResultDataAddList: false,
      isShowAddListPage: false,
      nowSecuritiesPage: 1,
      nowAddListPage: 1,
      queryIssuerData: '',
      poolList: [],
      queryIssuer:{
        seccode: '',
        secname: ''
      },
      querySecurities:{
        issue: ''
      },
      resultData:[],
      queryAddList:{
        companytype: 'S',
        keyword: '',
      },
      queryCondition:{
        start_date:'',
        end_date:''
      },
      //全选反选数据
      sencondResult:[],
      checkboxModel:[],
      // 全选反选数据
      checked:true,
      groupArr:[],

      addListSendData: {},
      securitiesList: null,
      nowSecuritiesList: [],
      addListQueryData: null,
      nowAddListQueryData: [],
      paginationData1: {
        parentEvent: 'paginationSelect',
        page_Count: 0,
        total_Count: 0,
        current: 1
      },
      paginationData2: {
        parentEvent: 'paginationSelect2',
        page_Count: 0,
        total_Count: 0,
        current: 1
      },
      paginationData_list: {
        parentEvent: 'paginationSelectList',
        page_Count: 0,
        total_Count: 0,
        current: 1
      },
      peopleDate:{
        companylist:[],
        userid: 'risk',
        start_date:'',
        end_date:'',
        pagesize: 10,
        page:0
      },
      sendData:{},
      dataList:[],
      typeList: {
        title: '类型：',
        parentEvent: 'typeListEvent',
        default: '股票发行人',
        listWidth: 138,
        nowSelectWidth: 140,
        nowSelectHeight: 25,
        nowSelectFontSize: 13,
        list: [
          '股票发行人',
          '债券发行人',
          '基金管理人',
          '新三板发行人',
        ]
      }
    }
  },
  components:{
    pagination,
    pullDownList,
    datePicker
  },
  //页面加载完之后展示内容
  created(){
    const url = 'http://10.25.24.51:10193/api/risk/issue_news';

    this.$_axios.get(url, {
          params: this.peopleDate
        }).then(response => {
        // 显示查询结果
            this.hasResultData = true;
            this.dataList = JSON.parse(JSON.stringify(response.data.result.result)); 
            this.paginationData1.page_Count = Math.ceil(response.data.result.total_count / 10);
            // this.$set(this.paginationData1, "total_Count", response.data.result.total_count)
            console.log(response.data.result.total_count)
            // this.$set(this.paginationData1, "page_Count", Math.ceil(response.data.result.total_count / 10))
            console.log(Math.ceil(response.data.result.total_count / 10))
            this.paginationData1.total_Count = response.data.result.total_count;
            console.log(response.data.result.total_count)
            console.log("pc"+this.paginationData1.page_Count);
            console.log("pc"+this.paginationData1.total_Count);

        })
      

  },
  //监听单个复选框，点击复选框判断获取内容
  watch: {//深度 watcher
  'checkboxModel': {
    handler: function (val, oldVal) { 
      if (this.checkboxModel.length === this.sencondResult.length) {
        this.checked=true;
      }else{
        this.checked=false;
      }
      this.checkboxModel = val
      // this.checkboxModel = JSON.parse(JSON.stringify(val));
      console.log(this.checkboxModel);
    },
    deep: true
  }
},
  methods:{
    //全选反选功能
      checkedAll() {
          var _this = this;
          console.log(this.checkboxModel);
          console.log(this.sencondResult)
          if (this.checked) {//实现反选
            _this.checkboxModel = [];
          }else{//实现全选
          console.log(_this.sencondResult)
          console.log(_this.checkboxModel);
            _this.checkboxModel = [];
            _this.sencondResult.forEach((v,i)=> {
              _this.checkboxModel.push(v.id);
            });
          }
          this.peopleDate.companylist = [];
       },



    //点击复选框，选取内容作为参数
    btnCheck(){
      setTimeout(() => {
        console.log(this.checkboxModel);
        let shujuArr =[]
        this.checkboxModel.forEach((item)=>{
        let shuju = this.sencondResult.filter((v)=>{
            if(v.id ==item){
              return v.value
            }
        })
        shujuArr.push(shuju)
      })
        console.log(this.checkboxModel)
      let targetArr = shujuArr.map(v=>v[0].value)
      // console.log(targetArr)
      this.peopleDate.companylist = targetArr

      console.log(this.peopleDate.companylist)
      }, 0);

    },
    //点击更多显示
    morenews(){
      this.ismorechoose = !this.ismorechoose
      this.checked = true
      
        const newUrl = 'http://10.25.24.51:10193/api/risk/attention_pool_set';
        const newDateList = {
              userid: 'risk',
              action: 'query'
        }
        this.$_axios.get(newUrl,{
          params: newDateList
        }).then(response=>{
          //显示结果
          console.log(response)
          this.sencondResult = response.data.result.attention_list;
          
          console.log(this.groupArr)
          // this.checkboxModel = this.sencondResult

          let len = this.sencondResult.length
          
          for(let i = 1 ; i <=len ; i++ ){
            this.checkboxModel.push(i)
          }

          console.log(this.checkboxModel)
          // this.sencondResult.unshift("全部")
          this.sencondResult = this.sencondResult.map((v,i)=>{
            return {
              id: i + 1,
              value: v
            }
          })
        })
    },
  //通过自带的flag参数，跳转到相应的页面（我的关注池，查找发行人，发行人证券信息）
    switchTab(flag){
      this.nowTab = flag;
      this.isAddList = false;
      this.isShowSecurities = false;
      this.isShowQueryResult = false;
      if(flag == '1'){
        window.history.go(0);
        const url = 'http://10.25.24.51:10193/api/risk/attention_pool_set';
        const sendData = {
          userid: 'risk',
          action: 'query'
        }
        this.$_axios.get(url, {
          params: sendData
        }).then(response => {
          // 显示查询结果
          console.log(response);
          const resultData = response.data.result.attention_list;
          console.log(resultData)
          this.poolList = resultData.map(item => {
            return {
              title: item,
              check: false
            }
          });
        }).catch(err => {
          console.log(err);
        });
      }
    },
    //我的关注池查询请求
    query() {
      console.log(this.peopleDate.companylist)
      let myselfArr = this.peopleDate.companylist;
      if(Object.prototype.toString.call(this.peopleDate.companylist).slice(8, -1)=="Array"){

          this.peopleDate.companylist = this.peopleDate.companylist.join(',')
          console.log(this.peopleDate.companylist)
      }
      console.log(this.peopleDate)
      // console.log(boolean([]))
       const searchUrl = 'http://10.25.24.51:10193/api/risk/issue_news'
     this.peopleDate.page = 0;

      this.$_axios.get(searchUrl, {
        params: this.peopleDate
      }).then(res => {
        console.log(res);
        this.resultData = res.data.result.result
        // console.log(res.data.result.result)
        this.hasResultData = true;
        this.dataList = JSON.parse(JSON.stringify(res.data.result.result))
        this.resultData = res.data.result;
        console.log(this.dataList);


        if (this.resultData.total_count) {
          this.paginationData1.page_Count = Math.ceil(this.resultData.total_count / 10);
        } else {
          this.paginationData1.page_Count = 0;
        }
        this.paginationData1.total_Count = this.resultData.total_count;

    //将数据companylist的字符串变成数组
        this.peopleDate.companylist = myselfArr;
        
      })
    },
    closeAttentionPool(){
      this.$store.state.isAttentionPool = false;
    },
    poolCheck(item, index){
      item.check = !item.check;
    },
    //获取相应的输入框的内容
    inputEventCheck(){
      this.queryIssuer.seccode = commonMethods.checkName(this.queryIssuer.seccode.trim());
      this.queryIssuer.secname = commonMethods.checkName(this.queryIssuer.secname.trim());
      this.querySecurities.issue = commonMethods.checkName(this.querySecurities.issue.trim());
      this.queryAddList.keyword = commonMethods.checkName(this.queryAddList.keyword.trim());
    },
    //添加到关注池
    //通过添加接口，将数据添加到数据库中
    addToList(){
      const tempArr = [];
      const url = 'http://10.25.24.51:10193/api/risk/attention_pool_set'
      const sendData = {
        userid: 'risk',
        action: 'insert',
        companytype: this.addListSendData.companytype,
        companylist: '',
      }
      this.nowAddListQueryData.forEach(item => {
        if(item.check){
          tempArr.push(item.title);
        }
      });
      //将数据切成字符串的形式
      sendData.companylist = tempArr.join(',');
      console.log(sendData)
      this.$_axios.get(url, {
        params: sendData
      }).then(response => {
        // 显示查询结果
        const resultData = response.data;
        console.log(resultData)
        //根据返回的状态码进行判断是否返回添加成功
        if(resultData.code == '0'){
          alert('添加成功');
        } else if(resultData.code == '1') {
          alert('添加失败');
        } else {
          alert('无需添加');
        }
      }).catch(err => {
        console.log(err);
      });
    },
    //点击搜索出来的内容，选中为item.check为true
    addToListCheck(item, index){
      item.check = !item.check;
    },
    //点击分页按钮进行接口数据请求
    paginationSelect(pageNumber) {
      const url = 'http://10.25.24.51:10193/api/risk/issue_news';
      const sendData = JSON.parse(JSON.stringify(this.sendData));
      this.peopleDate.page = pageNumber - 1;
      console.log('sendData', sendData)
      this.$_axios.get(url, {
        params: this.peopleDate
      }).then(response => {
        this.dataList = JSON.parse(JSON.stringify(response.data.result.result));
        this.resultData = response.data.result;
      })
        .catch(err => {
          console.log(err);
        });
    },
    //搜索
    addListQuery(){
      this.isShowAddListQuery = false;
      this.isShowAddListPage = false;
      this.hasResultDataAddList = false;
      const url = 'http://10.25.24.51:10193/api/risk/attention_base_query';
      //addListSendData 为对象
      this.addListSendData = {
        companytype: this.queryAddList.companytype,
        keyword: this.queryAddList.keyword,
      }
      console.log('sendData',this.addListSendData)
      this.$_axios.get(url, {
        params: this.addListSendData
      }).then(response => {
        // 显示查询结果
        this.hasResultDataAddList = true;
        this.isShowAddListQuery = true;
        const resultData = response.data.result.result;
        console.log(resultData)
        this.addListQueryData = resultData.map(item => {
          return {
            check: false,
            title: item
          }
        });
        if(this.addListQueryData.length > 60){
          this.paginationData_list.page_Count = Math.floor(this.addListQueryData.length / 60)
          this.paginationData_list.total_Count = this.addListQueryData.length;
          console.log(this.addListQueryData)
          this.nowAddListQueryData = this.addListQueryData.slice(0, 60);
          console.log(this.addListQueryData.slice(0, 60))
          this.isShowAddListPage = true;
        } else {
          this.nowAddListQueryData = JSON.parse(JSON.stringify(this.addListQueryData));
          this.paginationData_list.page_Count = Math.floor(this.addListQueryData.length / 60)
          this.paginationData_list.total_Count = this.addListQueryData.length;
          this.isShowAddListPage = true;
        }
        console.log(resultData)
      }).catch(err => {
        console.log(err);
      });
    },
    //点击清空按钮，清空页面上所有内容
    clearList(){
      this.isClearList = false;
      this.isContent = false;
      // http://localhost:10193/api/risk/attention_pool_set?userid=zhangxx &action=drop
      const sendData = {
        userid: 'risk',
        action: 'drop'
      }
      this.$_axios.get('http://10.25.24.51:10193/api/risk/attention_pool_set', {
        params: sendData
      }).then(response => {
        // 显示查询结果
        console.log(response)
        if(response.status == 200 && response.data.msg === 'drop success'){
          this.poolList.forEach((item, index) => {
            this.poolList.splice(index);
          });
        }
      }).catch(err => {
        console.log(err);
      });
    },
    //点击删除按钮，通过接口删除数据库中对应的数据
    deleteList(){
      const url = 'http://10.25.24.51:10193/api/risk/attention_pool_set';
      const tempArr = [];
      const indexArr = [];
      const sendData = {
        userid: 'risk',
        companylist: '',
        action: 'delete'
      }
      this.poolList.forEach((item, index) => {
        if(item.check){
          tempArr.push(item.title);
          indexArr.push(index);
        }
      });
      sendData.companylist = tempArr.join(',');
      if(sendData.companylist === '') return;
      console.log('sendData',sendData)
      this.$_axios.get(url, {
        params: sendData
      }).then(response => {
        // 显示查询结果
        console.log(response)
        if(response.status == 200 && response.data.msg === 'delete success'){
          const tempArr = JSON.parse(JSON.stringify(this.poolList));
          const tempArr2 = [];
          this.poolList.forEach((item,index) => {
            if(item.check){
              delete tempArr[index];
            }
          });
          tempArr.forEach(item => {
            if(item){
              tempArr2.push(item);
            }
          });
          this.poolList = JSON.parse(JSON.stringify(tempArr2));
        }
      }).catch(err => {
        console.log(err);
      });
    },
    //开始时间
    startDateEvent(...data) {
      this.peopleDate.start_date = data[0];
      console.log(data[0])
    },
    //结束时间
    endDateEvent(...data) {
      this.peopleDate.end_date = data[0];
      console.log(data[0])
    },
    //点击查找发行人按钮请求接口
    queryIssuerEvent(){
      this.isShowSecurities = false;
      this.isShowQueryResult = false;
      this.isShowIssuer = false;
      const url = 'http://10.25.24.51:10193/api/risk/seccode_issue_mapper';
      const sendData = {
        seccode: this.queryIssuer.seccode,
        secname: this.queryIssuer.secname
      }
      if(!sendData.seccode && !sendData.secname){
        alert('请输入证券代码或简称');
        return;
      }
      console.log( 'sendData',sendData)
      this.$_axios.get( url, {
        params: sendData
      }).then(response => {
        // 显示查询结果
        console.log(response.data)
        const resultData =  response.data;
        if(resultData.msg === 'query success'){
          this.isShowSecurities = true;
          this.isShowQueryResult = true;
          console.log('',resultData.result.issue)
          if(!resultData.result.issue.length){
            this.queryIssuerData = [{issue: '无匹配', seccode: '无匹配', secname: '无匹配'}]
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
        }else{
          this.isShowSecurities = true;
          this.isShowQueryResult = true;
          //若接口没有数据返回，在页面中显示没有匹配项
          this.queryIssuerData = [{issue: '无匹配', seccode: '无匹配', secname: '无匹配'}]
        }
      }).catch(err => {   //在输入不正确或者输入不合法的情况下调用这个方法
        this.isShowSecurities = true;
        this.isShowQueryResult = true;
        this.queryIssuerData = [{issue: '无匹配', seccode: '无匹配', secname: '无匹配'}]
      });
    },
    // 查询证券信息
    querySecuritiesEvent(){
      this.isShowQueryResult = false;
      const url = 'http://10.25.24.51:10193/api/risk/issue_seccode_mapper';
      const sendData = {
        issue: this.querySecurities.issue,
      }
      console.log( 'sendData',sendData)
      this.$_axios.get( url, {
        params: sendData
      }).then(response => {
        console.log(response)
        // 显示查询结果
        this.isShowQueryResult = true;
        this.isShowIssuer = true;
        this.isShowSecurities = false;
        console.log(response.data )
        if(response.data.code == 0 && response.data.msg == 'query success'){
          //拿到的数据
          const resultData = response.data.result.seccodes_names;
          this.securitiesList = JSON.parse(JSON.stringify(resultData));
          console.log(this.securitiesList)
          console.log(this.securitiesList.length);
          this.paginationData2.page_Count = Math.ceil(this.securitiesList.length /  10);
          this.paginationData2.total_Count = this.securitiesList.length;
          //将拿到的数据进行分割，每页显示
          //this.nowSecuritieslist 已经接受到接口返回的所有数据
          this.nowSecuritiesList = this.securitiesList.slice(0,9);
          console.log(this.nowSecuritiesList)
        } else {
          this.paginationData.page_Count = 0;
          this.paginationData.total_Count = 0;
          this.nowSecuritiesList = [];
        }
        
      })
    },
    paginationSelect2(number){
      //点击分页将传进俩，返回新的页数进行展示
      this.nowAddListPage = number;
      this.nowSecuritiesList = this.securitiesList.slice(this.nowAddListPage * 10, (Number(this.nowAddListPage) + 1) * 10);
    },
    //查找发行人类型，通过pulldownList组件进行操作，通过返回的data数据,进行companytype参数的获取
    typeListEvent(...data){
      switch (data[0]) {
        case '股票发行人':
          this.queryAddList.companytype = 'S';
          break;
        case '债券发行人':
          this.queryAddList.companytype = 'B';
          break;
        case '基金管理人':
          this.queryAddList.companytype = 'F';
          break;
        case '新三板发行人':
          this.queryAddList.companytype = 'N';
          break;
      }
    },
    //分页数据展示
    paginationSelectList(number){
      this.nowAddListPage = number;
      this.nowAddListQueryData = this.addListQueryData.slice(this.nowAddListPage * 60, (Number(this.nowAddListPage) + 1) * 60);
    }
  },
  //
  mounted(){
    const url = 'http://10.25.24.51:10193/api/risk/attention_pool_set';
    const sendData = {
      userid: 'risk',
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
    this.peopleDate.start_date = commonMethods.formatDateTime2(this.startDatePicker.defaultDate);
    this.peopleDate.end_date = commonMethods.formatDateTime2(new Date());
  }
}
</script>

<style lang="less" scoped>
  table {
    width: 1425px;
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
    .tableTh:nth-child(1) {
      width: 145px;
    }
    .tableTh:nth-child(2) {
      width: 80px;
    }
    .tableTh:nth-child(3) {
      width: 90px;
    }
    .tableTh:nth-child(4) {
      width: 90px;
    }
  }
.attentionPoolBox{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  z-index: 3;
  overflow: scroll;
  >div{
    width: 100%;
    height: 100%;
    padding-top: 10px;
    padding-left: 100px;
    // background: linear-gradient(#ffffff, #d7d7d7);;
  }
  .poolList{
    margin-top: 15px;
    margin-left: 240px;
    width: 1023px;
    .checkBox{
      position: relative;
      cursor: pointer;
      .iconBox{
        position: absolute;
        display: inline-block;
        top: 5px;
        width: 12px;
        height: 12px;
        border-radius: 6px;
        border: 1px solid #797979;
        .dot{
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
  .poolBtnBox{
    margin-left: 1186px;
    span{
      cursor: pointer;
      padding: 6px;
      margin-left: 20px;
      border: 1px solid #797979;
      border-radius: 5px;
    }
  }
  .queryBox{
    height: 1000px;
    .top{
      width: 500px;
      height: 70px;
      border: 1px solid #797979;
    }
    input{
      width: 120px;
      height: 25px;
      line-height: 25px;
    }
    .queryBtn{
      padding: 5px;
      cursor: pointer;
      border: 1px solid #797979;
      border-radius: 5px;
      background-color: #f3f3f3;
    }
    .queryIssuerDataList{
      width: 1000px;
      height: 540px;
      th:nth-child(1){
        width: 100px;
      }
      th:nth-child(2){
        width: 400px;
      }
      th:nth-child(3){
        width: 300px;
      }
      li{
        float: left;
        margin-left: 30px;
        // width: 236px;
      }
    }
  }
  .addListBox{
    background-color: #fff;
    .addListQueryBox{
      width: 1000px;
      margin-top: 50px;
      li{
        width: 200px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        cursor: pointer;
        border: 1px solid #797979;
        background-color: #fff;
      }
      li.active{
        background-color: rgba(0, 114, 255, 0.3);
      }
    }
  }
  .otherBox{
    input{
      width: 120px;
      height: 25px;
      line-height: 25px;
      border: 1px solid #797979;
    }
    .queryBtn{
      padding: 5px 15px;
      cursor: pointer;
      border: 1px solid #797979;
      border-radius: 5px;
      background-color: #f3f3f3;
    }
  }
}
.tab{
  line-height: 50px;
  margin-left: 470px;
  h4{
    float: left;
    width: 200px;
    font-size: 24px;
    text-align: center;
    cursor: pointer;
    color: #fff;
    background-color: #D7D7D7;
  }
  h4.active{
    background-color: #b50229;
  }
  .close{
    font-size: 40px;
    cursor: pointer;
    font-weight: 500;
  }
}
table {
  margin-top: 20px;
  border: 1px solid #797979;
  border-collapse: collapse;
  word-wrap: break-word;
  word-break: break-all;
  position: relative;
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
    text-align: center;
    vertical-align: middle;
    border: 1px solid #797979;
  }
  th:nth-child(1){
    width: 100px;
  }
  th:nth-child(2){
    width: 600px;
  }
}
.my_content{
    position: absolute;
    top: 180px;
    left:114px;

}
.more_choose{
  font-size:15px;
  cursor: pointer;
}
.my_content ul span{
  display:inline-block;
  height: 50px;
  text-align: center

}
.content_time{
  width: 154px;
  height: 20px;
}
.content_between{
  height: 20px;
  width: 448px;
}
.content_news{
  height: 20px;
  width: 126px;
}
.content_time_top{
  width: 154px;
  height: 20px;
  line-height:50px;
  background-color: #F0F5F9;
}
.content_between_top{
  height: 20px;
  width: 448px;
  line-height:50px;
  background-color: #F0F5F9;
}
.content_news_top{
  height: 20px;
  width: 126px;
  line-height:50px;
  background-color: #F0F5F9;
}
.content_more{
  width: 510px;
  border: 1px solid #000;
  margin-top:16px;
  padding-left: 26px;
  padding-top: 10px;
  position: relative;

}
table:after{
    position: absolute;
    top: -10px;
    left: 0;
    content: "";
    width: 1400px;
    height: 2px;
    background-color: #797979;
}
.content_more_second{
    margin-left: 60px;
    margin-top: -20px;
}
.content_more_second > ul{
  overflow: hidden;
}
.content_more_second > ul > li{
  margin-bottom:10px;
  float: left;
}
.content_more_second > ul >li.active{
  margin-right:20px;
}
.content_more_first{
  border-bottom:1px dashed #000;
  margin-bottom:10px;
}
.news_content{
  margin-right:376px;
}
.btnquery{
  border:1px solid #ccc;
  display:inline-block;
  border-radius: 5px;
  width:68px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
  font-size:15px;
  margin-left:100px;
}
.newUl{
  margin-top:20px;
  // height:1000px;
}
.poolBtnBox{
  margin-top: 10px;
  margin-left:1000px;
}
body{
  overflow: scroll;
}
</style>
