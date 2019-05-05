<template>
  <div>
    <div class="hag">
      <router-link to="/">
        <!-- <h1>中泰
          <span class="mmt8">风险
            <span class="war_c">预警</span>系统
          </span>
        </h1> -->
        <div class="di-header">
          <a href="/" class="tj-logo-wrapper">
            <img src="/../static/event/img/logo.png">
          </a>
        </div>
        <div class="name">中泰证券舆情分析系统</div>
      </router-link>

      <h2 @click="usercollection('item, index')">
        个人收藏夹
        <span class="iconfont icon-star"></span>
      </h2>
    </div>

    <div class="div">
      <div class="subname">
        董事会信息分析
      </div>
      <div class="clearfix mt40">
        <div class="left">
          <date-picker :prop="startDatePicker" @startDateEvent="startDateEvent"></date-picker>
        </div>
        <div class="left mttg">
          <date-picker :prop="endDatePicker" @endDateEvent="endDateEvent"></date-picker>
        </div>
        <div class="left ml60">
          分类：<input type="text" placeholder="请输入" class="input" v-model="flKeyword" onkeyup="this.value=this.value.replace(/^ +| +$/g,'')">
        </div>
        <div class="left wi80">
          <div @click="query" class="queryBtn">查询</div>
        </div>
        <div class="execl">
          <div @click="exportExecl()" class="execlText">导出csv</div>
          <!-- <span></span> -->
        </div>
        <div class="left mt130">
          <div @click="hightselect" class="queryBtn">高级搜索</div>
        </div>
      </div>
      <div class="clearfix mt10">
        <!-- <div class="left">
          <div>上传文件(csv、txt)等</div>
        </div>
        <div class="left mt64">
          <input type="file" @change="handleFileChange($event)" ref="inputer" id="fileExport">
        </div> -->
        <div class="uploadFiles">
          <label for="fileExport">上传文件(csv、txt)等
            <span class="fileExportBtn">{{selectFileName}}</span>
          </label>
          <span v-if="selectFileName !== '选择文件'" @click="clearFile" class="clearFile">清除文件</span>
          <input type="file" id="fileExport" @change="handleFileChange($event)" ref="inputer">
        </div>
        <!-- <div class="left mt130">
          <div @click="hightselect" class="queryBtn">高级搜索</div>
        </div> -->
      </div>
      <div class="clearfix select" style="display:none" v-show="show">
        <div class="width265 left">
          <pull-down-list :prop="selectList" @selectListEvent='selectListEvent'></pull-down-list>
        </div>
        <div class="width265 left mt88" v-on:mouseleave="isShowDropDownList = false">
          <input type="text" v-model="selectdetail" v-on:input="inputCode" v-on:click="inputCode" placeholder="请输入" class="input2">
          <span v-if="isShowDropDownList" class="drop-down-box">
            <span v-for="(item, index) of dropDownList" :key="index" @click="dropDownEvent(item)">{{item}}</span>
          </span>
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
              <td class="tableTd">
                {{item.news_time}}
              </td>
              <td>
                <a :href="item.news_url" target="_bank">{{item.news_title}}</a>
              </td>
              <td class="data-content">
                {{item.news_content}}
                <span @click="details(item, index)"> {{item.details}}</span>
              </td>
              <td id="risk_type">{{item.risk_type}}</td>
              <td class="data-content">
                <input type="text" placeholder="请输入" class="input mtt2" v-model="item.signtag" onkeyup="this.value=this.value.replace(/^ +| +$/g,'')">
                <div @click="tagbtn(item,index)" class="queryBtn2 mtt">确定</div>
              </td>
              <td class="data-center">
                <span @click="collection(item,index)">{{item.is_favorite}}</span>
              </td>
            </tr>
          </tbody>
        </table>
        <pagination :prop="paginationData" @paginationSelect="paginationSelect"></pagination>
      </div>
      <div v-show="false">
        <table id="ta">
          <tbody>
            <tr>
              <th v-for="(item, index) of titleData2" :key="index" class="tableTh" width:100px>{{item}}</th>
            </tr>
            <tr v-for="(item, index) of allData" :key="index">
              <td class="tableTd">
                {{item.news_time}}
              </td>
              <td>{{item.news_title}}</td>
              <td class="data-content">
                {{item.news_content}}
                <span @click="details(item, index)"> {{item.details}}</span>
              </td>
              <td>{{item.risk_type}}</td>
              <td>{{item.is_favorite}}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="cover" v-if="maskshow"></div>
    <div class="usercollection" v-if="usercollshow">
      <div class="modal">
        <div class="close" @click="close()">关闭弹框</div>
        <div v-if="isShowQueryResult2" class="queryResult mtll">
          <div v-if="hasResultData2">
            <table>
              <tbody>
                <tr>
                  <th v-for="(item2, index2) of titleData2" :key="index2" class="tableTh" width:100px>{{item2}}</th>
                </tr>
                <tr v-for="(item2, index2) of dataList2" :key="index2">
                  <td class="tableTd">
                    {{item2.news_time}}
                  </td>
                  <td>{{item2.news_title}}</td>
                  <td class="data-content">
                    {{item2.news_content}}
                    <span @click="details2(item2, index2)"> {{item2.details}}</span>
                  </td>
                  <td>{{item2.risk_type}}</td>
                </tr>
              </tbody>
            </table>
            <pagination :prop="paginationData2" @paginationSelect2="paginationSelect2"></pagination>
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

</template>

<script>
import pullDownList from "@/components/common/pullDownList";
import pagination from '@/components/common/pagination'
import commonMethods from '@/common/common.js'
import datePicker from "@/components/common/datePicker";

export default {
  data() {
    return {
      url: "http://10.25.24.51:10194/api/rest/nlp/bod/query_news?",
      isShowQueryResult: false,
      hasResultData: false,
      isShowQueryResult2: false,
      hasResultData2: false,
      isShowDropDownList: false,
      isExportExecl: false,
      selectFileName: '选择文件',
      flKeyword: "",
      Keyword: "",
      dropDownList: [],
      show: false,
      maskshow: false,
      usercollshow: false,
      selecttype: "",
      collectiontext: "",
      signtag: "",
      selectdetail: "",
      queryCondition: {
        page: 1,
        pageSize: 10,
        // from_date: '',
        // to_date: '',
        keyword: '',
        is_favorite: "",
        risk_type: "",
        is_detele: "",
        key_info: "",
        export: "",
        user: "wangjkl",
      },
      select: [
        '莱芜钢铁集团有限公司',
        '兖矿集团有限公司',
        '济钢集团有限公司',
        '山东省鲁信投资控股集团有限公司 ',
        '新汶矿业集团有限责任公司 ',
        '济南西城投资发展有限公司 ',
        '山东永通实业有限公司',
        '上海禹佐投资管理中心（有限合伙） ',
        '宁波美舜投资管理中心（有限合伙）',
        '上海弘康实业投资有限公司',
        '山东省国有资产投资控股有限公司 ',
        '烟台市广信投资发展有限责任公司',
        '泰安点石资产管理有限公司 ',
        '北京泰达瑞顿投资管理中心（有限合伙） ',
        '山东省宏恩投资有限公司 ',
        '共青城汇泉投资管理合伙企业（有限合伙） ',
        '宁波梅山保税港区丰海投资有限公司 ',
        '山东中通科技发展有限公司 ',
        '山东省融资担保有限公司 ',
        '霍氏文化产业集团有限公司 ',
        '烟台蓝天投资控股有限公司',
        '苏州金安九鼎创业投资中心（有限合伙） ',
        '山东豪晟投资置业有限公司',
        '淄博市城市资产运营有限公司',
        '济宁市投资中心',
        '联合创业集团有限公司 ',
        '江苏新潮科技集团有限公司',
        '联合创业担保集团有限公司',
        '威海市国有资本运营有限公司',
        '浙江杭州湾投资有限公司',
        '蓬莱市茂源建筑工程有限公司',
        '山东天宝翔基机械有限公司 ',
        '山东润邦科技投资有限公司',
        '山东华联矿业股份有限公司 ',
        '德州市德信资产管理有限公司',
        '山东环球渔具股份有限公司',
        '济南均土源投资有限公司 ',
        '江苏汇鸿国际集团畜产进出口股份有限公司 ',
        '中扶华夏管理咨询有限公司',
        '南山集团有限公司',
        '山东钢铁集团有限公司',
      ],
      subselect: [
        '鲁证期货股份有限公司',
        '万家基金管理有限公司',
        '中泰创业投资（深圳）有限公司',
        '中泰证券（上海）资产管理有限公司 ',
        '齐鲁股权交易中心有限公司 ',
        '齐鲁中泰物业有限公司 ',
        '中泰金融国际有限公司',
        '鲁证创业投资有限公司',
      ],
      people: [
        '李玮',
        '侯祥银',
        '王学德',
        '范奎杰 ',
        '孟庆建 ',
        '徐亮天 ',
        '刘锋',
        '时英',
        '肖金明',
        '郑伟',
        '陈晓莉',
        '杨峰',
        '张涛',
        '王思远',
        '孔令伟',
        '安铁',
        '崔建忠',
        '王丽敏',
        '毕玉国',
        '陈方',
        '孙培国',
        '钟金龙',
        '吕祥友',
        '刘珂滨',
        '黄华',
        '张晖',
        '袁西存',
        '李恒第',
        '何振江',
        '李迅雷',
        '章飙',
      ],
      startDatePicker: {
        title: "日期：",
        parentEvent: "startDateEvent"
        // defaultDate: new Date()
      },
      endDatePicker: {
        title: "至：",
        parentEvent: "endDateEvent"
        // defaultDate: new Date()
      },
      selectList: {
        title: '',
        parentEvent: 'selectListEvent',
        default: '请选择',
        listWidth: 143,
        nowSelectWidth: 140,
        nowSelectHeight: 25,
        nowSelectFontSize: 13,
        list: [
          '涉及公司',
          '涉及子公司',
          '涉及人物',
        ]
      },
      sendData: {},
      paginationData: {
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
      titleData: ['日期', '标题', '内容', "分类", '分类操作', '收藏'],
      titleData2: ['日期', '标题', '内容', "分类"],
      dataList: [],
      dataList2: [],
      allData: [],
      file: '',
      sendFile: '',
    };
  },
  components: {
    pullDownList,
    datePicker,
    pagination
  },
  created() {
    this.query();
  },
  methods: {
    handleFileChange(event) {
      this.file = event.target.files[0];
      if (this.file) {
        const type = this.file.name.slice(-4).toLowerCase();
        if (type != '.txt' && type != '.csv') {
          this.file = '';
          event.target.value = '';
          this.selectFileName = '选择文件';
          alert('请输入txt或csv类型文件')
          return;
        }
        event.target.value = '';
        if (this.file.name.length > 10) {
          this.selectFileName = this.file.name.slice(0, 10) + '...';
        }
        else {
          this.selectFileName = this.file.name;
        }
      }
      console.log('file', this.file)
    },
    clearFile() {
      // inputer
      this.$refs.inputer = null;
      this.selectFileName = '选择文件';
      this.file = '';
    },
    details(item, index) {
      if (item.details == '收起') {
        item.details = '...详情';
        item.news_content = item.news_content.slice(0, 150) + '...';
      } else {
        item.details = '收起';
        item.news_content = this.resultData[index].news_content;
      }
    },
    details2(item2, index2) {
      if (item2.details == '收起') {
        item2.details = '...详情';
        item2.news_content = item2.news_content.slice(0, 150) + '...';
      } else {
        item2.details = '收起';
        item2.news_content = this.resultData2[index2].news_content;
      }
    },
    startDateEvent(...data) {
      this.queryCondition.from_date = data[0];
      console.log(this.queryCondition);
    },
    endDateEvent(...data) {
      this.queryCondition.to_date = data[0];
    },
    selectListEvent(...data) {
      this.selecttype = data[0];
      if (data[0] === '请选择') {
        this.selecttype = 0;
      }
      this.selectdetail = "";
    },
    hightselect() {
      if (this.show) {
        this.show = false;
      }
      else {
        this.show = true;
      }
    },
    close() {
      this.maskshow = false;
      this.usercollshow = false;
    },
    usercollection(str) {
      this.isShowQueryResult2 = true;
      const url = "http://10.25.24.51:10194/api/rest/nlp/bod/query_news?";
      const sendData = {
        user: 'wangjkl',
        is_favorite: '1',
        checke: '1',
      };
      this.$_axios.get(url, {
        params: sendData
      }).then(response => {
        this.maskshow = true;
        this.usercollshow = true;
        // 显示查询结果
        this.hasResultData2 = true;
        console.log(this.hasResultData2)
        this.dataList2 = JSON.parse(JSON.stringify(response.data.result.Announce_List));
        console.log(this.dataList2)
        this.resultData2 = response.data.result.Announce_List;
        console.log(this.resultData2)
        this.paginationData2.page_Count = response.data.result.Page_Count;
        this.paginationData2.total_Count = response.data.result.Total_Count;
        this.dataList2.forEach(item => {
          item.news_time = item.news_time ? commonMethods.formatDateTime(new Date(item.news_time)) : '-';
          item.news_title = item.news_title;
          if (item.news_content && item.news_content.length > 150) {
            item.news_content = item.news_content.slice(0, 150) + '...';
            item.details = '...详情';
          }
          item.risk_type = item.risk_type;
        });
      })
        .catch(err => {
          console.log(err);
        });
    },
    inputCode() {
      const tempArr = [];
      if (this.selecttype == "涉及公司") {
        this.select.forEach(element => {
          if (element.indexOf(this.selectdetail) !== -1) {
            tempArr.push(element);
          }
          console.log(tempArr)
        });
      }
      else if (this.selecttype == "涉及子公司") {
        this.subselect.forEach(element => {
          if (element.indexOf(this.selectdetail) !== -1) {
            tempArr.push(element);
          }
        });
      }
      else if (this.selecttype == "涉及人物") {
        this.people.forEach(element => {
          if (element.indexOf(this.selectdetail) !== -1) {
            tempArr.push(element);
            console.log(tempArr)
          }
        });
      }
      this.dropDownList = tempArr;
      this.isShowDropDownList = true;
      console.log(this.selectdetail)
    },
    dropDownEvent(item) {
      this.selectdetail = item;
      this.isShowDropDownList = false;
      // this.selectdetail = item.slice(0, item.indexOf(' '));
    },
    query() {
      this.url = "http://10.25.24.51:10194/api/rest/nlp/bod/query_news?";
      this.isShowQueryResult = true;
      this.hasResultData = false;
      this.isExportExecl = false;
      this.queryCondition.risk_type = this.flKeyword;
      // this.queryCondition.keyword = this.Keyword;
      this.queryCondition.key_info = this.selectdetail;
      // delete this.queryCondition.selectdetail;
      this.sendData = JSON.parse(JSON.stringify(this.queryCondition));
      this.sendFile = this.file;
      for (let key in this.sendData) {
        if (this.sendData[key] === '') {
          delete this.sendData[key];
        }
      }
      let formData = new FormData();
      for (let key in this.sendData) {
        if (this.sendData.hasOwnProperty(key)) {
          formData.append(key, this.sendData[key]);
        }
      }
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      this.sendFile && formData.append('file', this.sendFile);
      console.log('sendData', this.sendData)
      this.$_axios.post(this.url.toUrl(), formData, config).then(response => {
        // 显示查询结果
        this.hasResultData = true;
        this.dataList = JSON.parse(JSON.stringify(response.data.result.Announce_List));
        this.resultData = response.data.result.Announce_List;
        this.paginationData.page_Count = response.data.result.Page_Count;
        this.paginationData.total_Count = response.data.result.Total_Count;
        this.dataList.forEach(item => {
          item.news_time = item.news_time ? commonMethods.formatDateTime(new Date(item.news_time)) : '-';
          item.news_title = item.news_title;
          item.risk_type = item.risk_type;
          item.signtag = '';
          if (item.is_favorite != null || item.is_favorite > 0) {
            item.is_favorite = "取消收藏";
          }
          else {
            item.is_favorite = "收藏";
          }
          if (item.news_content && item.news_content.length > 150) {
            item.news_content = item.news_content.slice(0, 150) + '...';
            item.details = '...详情';
          }
        });
        // 请求所有数据
        const sendData = JSON.parse(JSON.stringify(this.sendData));
        sendData.pageSize = 350;
        sendData.page = 1;
        // sendData.export = 1;
        this.sendFile && formData.append('file', this.sendFile);
        console.log('sendData', this.sendData)
        this.$_axios.post(this.url.toUrl(), formData, config).then(response => {
          const resultData = response.data.result;
          this.allData = JSON.parse(JSON.stringify(resultData.Announce_List));
          this.allData.forEach(item => {
            item.news_time = item.news_time ? commonMethods.formatDateTime(new Date(item.news_time)) : '-';
            item.news_title = item.news_title;
            item.risk_type = item.risk_type;
            if (item.is_favorite != null || item.is_favorite > 0) {
              item.is_favorite = "已收藏";
            }
            else {
              item.is_favorite = "未收藏";
            }
          });
          this.isExportExecl = true;
        })
          .catch(err => {
            console.log(err);
          });
      })
    },
    tagbtn(item, index) {
      this.url = "http://10.25.24.51:10194/api/rest/nlp/bod/update_type?";
      let sendData = {
        news_id: item.id,
        risk_type: item.signtag,
      };
      this.$_axios.get(this.url, {
        params: sendData
      }).then(response => {
        // 显示查询结果
        if (response.data.result.update_result > 0) {
          alert("标签更新成功");
          this.dataList[index].risk_type = item.signtag;
          item.signtag = "";
        }
      })
        .catch(err => {
          alert("标签更新失败，请稍后再试！");
          console.log(err);
        });
    },
    // blur() {
    //   console.log(this.selecttype);
    //   this.items = search_item(this.msg);
    // },
    paginationSelect(pageNumber) {
      this.url = "http://10.25.24.51:10194/api/rest/nlp/bod/query_news?";
      const sendData = JSON.parse(JSON.stringify(this.sendData));
      sendData.page = pageNumber;
      sendData.pageSize = 10;
      delete sendData.is_favorite;
      delete sendData.news_id;
      console.log('sendData', sendData)
      let formData = new FormData();
      for (let key in sendData) {
        if (sendData.hasOwnProperty(key)) {
          formData.append(key, sendData[key]);
        }
      }
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      this.sendFile && formData.append('file', this.sendFile);
      this.$_axios.post(this.url.toUrl(), formData, config).then(response => {
        this.dataList = JSON.parse(JSON.stringify(response.data.result.Announce_List));
        this.resultData = response.data.result.Announce_List;
        this.dataList.forEach(item => {
          item.id = item.id;
          item.news_time = item.news_time ? commonMethods.formatDateTime(new Date(item.news_time)) : '-';
          item.news_title = item.news_title;
          item.risk_type = item.risk_type;
          if (item.is_favorite != null || item.is_favorite > 0) {
            item.is_favorite = "取消收藏";
          }
          else {
            item.is_favorite = "收藏";
          }
          if (item.news_content && item.news_content.length > 150) {
            item.news_content = item.news_content.slice(0, 150) + '...';
            item.details = '...详情';
          }
        });
      })
        .catch(err => {
          console.log(err);
        });
    },
    paginationSelect2(pageNumber) {
      this.url = "http://10.25.24.51:10194/api/rest/nlp/bod/query_news?";
      const sendData = JSON.parse(JSON.stringify(this.sendData));
      sendData.page = pageNumber;
      sendData.pageSize = 10;
      console.log('sendData', sendData)
      let formData = new FormData();
      for (let key in sendData) {
        if (sendData.hasOwnProperty(key)) {
          formData.append(key, sendData[key]);
        }
      }
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      this.sendFile && formData.append('file', this.sendFile);
      this.$_axios.post(this.url.toUrl(), formData, config).then(response => {
        this.dataList2 = JSON.parse(JSON.stringify(response.data.result.Announce_List));
        this.resultData = response.data.result.Announce_List;
        this.dataList2.forEach(item => {
          item.id = item.id;
          item.news_time = item.news_time ? commonMethods.formatDateTime(new Date(item.news_time)) : '-';
          item.news_title = item.news_title;
          item.risk_type = item.risk_type;
          if (item.is_favorite != null || item.is_favorite > 0) {
            item.is_favorite = "取消收藏";
          }
          else {
            item.is_favorite = "收藏";
          }
          if (item.news_content && item.news_content.length > 150) {
            item.news_content = item.news_content.slice(0, 150) + '...';
            item.details = '...详情';
          }
        });
      })
        .catch(err => {
          console.log(err);
        });
    },
    collection(item, index) {
      if (item.is_favorite == "取消收藏") {
        this.sendData = {
          news_id: item.id,
          user: 'wangjkl',
          is_delete: 1,
          is_favorite: '',
        };
      }
      else {
        this.sendData = {
          news_id: item.id,
          is_favorite: '1',
          user: 'wangjkl',
          is_delete: '',
        };
      }
      this.url = "http://10.25.24.51:10194/api/rest/nlp/bod/update_favorite?";
      this.$_axios.get(this.url, {
        params: this.sendData
      }).then(response => {
        // 显示查询结果
        if (response.data.result.update_result > 0) {
          if (item.is_favorite == "取消收藏") {
            alert("取消收藏成功");
            this.dataList[index].is_favorite = "收藏";
          }
          else {
            alert("收藏成功");
            this.dataList[index].is_favorite = "取消收藏";
          }

        }
      })
        .catch(err => {
          alert("取消收藏失败，请稍后再试！");
          console.log(err);
        });
    },
    // exportExecl() {
    //   if (!this.isExportExecl) return;
    //   function getExplorer() {
    //     let explorer = window.navigator.userAgent;
    //     //ie
    //     if (explorer.indexOf("MSIE") >= 0) {
    //       return 'ie';
    //     }
    //     //firefox
    //     else if (explorer.indexOf("Firefox") >= 0) {
    //       return 'Firefox';
    //     }
    //     //Chrome
    //     else if (explorer.indexOf("Chrome") >= 0) {
    //       return 'Chrome';
    //     }
    //     //Opera
    //     else if (explorer.indexOf("Opera") >= 0) {
    //       return 'Opera';
    //     }
    //     //Safari
    //     else if (explorer.indexOf("Safari") >= 0) {
    //       return 'Safari';
    //     }
    //   }
    //   function method1(tableid) { //整个表格拷贝到EXCEL中
    //     if (getExplorer() == 'ie') {
    //       var curTbl = document.getElementById(tableid);
    //       var oXL = new ActiveXObject("Excel.Application");
    //       console.log(222)
    //       //创建AX对象excel
    //       var oWB = oXL.Workbooks.Add();
    //       //获取workbook对象
    //       var xlsheet = oWB.Worksheets(1);
    //       //激活当前sheet
    //       var sel = document.body.createTextRange();
    //       sel.moveToElementText(curTbl);
    //       //把表格中的内容移到TextRange中
    //       sel.select;
    //       //全选TextRange中内容
    //       sel.execCommand("Copy");
    //       //复制TextRange中内容
    //       xlsheet.Paste();
    //       //粘贴到活动的EXCEL中
    //       oXL.Visible = true;
    //       //设置excel可见属性

    //       try {
    //         var fname = oXL.Application.GetSaveAsFilename("Excel.xls", "Excel Spreadsheets (*.xls), *.xls");
    //       } catch (e) {
    //         print("Nested catch caught " + e);
    //       } finally {
    //         oWB.SaveAs(fname);

    //         oWB.Close(savechanges = false);
    //         //xls.visible = false;
    //         oXL.Quit();
    //         oXL = null;
    //         //结束excel进程，退出完成
    //         //window.setInterval("Cleanup();",1);
    //         idTmr = window.setInterval("Cleanup();", 1);
    //       }
    //     } else {
    //       tableToExcel('ta')
    //     }
    //   }
    //   function Cleanup() {
    //     window.clearInterval(idTmr);
    //     CollectGarbage();
    //   }
    //   var tableToExcel = (function () {
    //     var uri = 'data:application/vnd.ms-excel;base64,',
    //       template =
    //         '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
    //       base64 = function (s) {
    //         return window.btoa(unescape(encodeURIComponent(s)))
    //       },
    //       // 下面这段函数作用是：将template中的变量替换为页面内容ctx获取到的值
    //       format = function (s, c) {
    //         return s.replace(/{(\w+)}/g,
    //           function (m, p) {
    //             return c[p];
    //           }
    //         )
    //       };
    //     return function (table, name) {
    //       if (!table.nodeType) {
    //         table = document.getElementById(table)
    //       }
    //       // 获取表单的名字和表单查询的内容
    //       var ctx = {
    //         worksheet: name || 'Worksheet',
    //         table: table.innerHTML
    //       };
    //       // format()函数：通过格式操作使任意类型的数据转换成一个字符串
    //       // base64()：进行编码
    //       window.location.href = uri + base64(format(template, ctx))
    //     }
    //   })()
    //   method1('ta');
    // },

    exportExecl() {
      this.sendFile = this.file;
      for (let key in this.sendData) {
        if (this.sendData[key] === '') {
          delete this.sendData[key];
        }
      }
      let formData = new FormData();
      for (let key in this.sendData) {
        if (this.sendData.hasOwnProperty(key)) {
          formData.append(key, this.sendData[key]);
        }
      }
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      this.sendFile && formData.append('file', this.sendFile);
      formData.append('export', 1);
      console.log('sendData', this.sendData)
      if (this.queryCondition.from_date && this.queryCondition.to_date) {
        window.location.href = "http://10.25.24.51:10194/api/rest/nlp/bod/query_news?is_favorite=" + this.queryCondition.is_favorite + "&risk_type=" + this.queryCondition.risk_type + "&page=" + this.queryCondition.page + "&page_size=" + this.queryCondition.pageSize + "&file=" + this.sendFile + "&user=&key_info=" + this.queryCondition.key_info + "&from_date=" + this.queryCondition.from_date + "&to_date=" + this.queryCondition.to_date + "&export=1";
      } else if (this.queryCondition.from_date && !this.queryCondition.to_date) {
        window.location.href = "http://10.25.24.51:10194/api/rest/nlp/bod/query_news?is_favorite=" + this.queryCondition.is_favorite + "&risk_type=" + this.queryCondition.risk_type + "&page=" + this.queryCondition.page + "&page_size=" + this.queryCondition.pageSize + "&file=" + this.sendFile + "&user=&key_info=" + this.queryCondition.key_info + "&from_date=" + this.queryCondition.from_date + "&export=1";
      }
      else if (this.queryCondition.to_date && !this.queryCondition.from_date) {
        window.location.href = "http://10.25.24.51:10194/api/rest/nlp/bod/query_news?is_favorite=" + this.queryCondition.is_favorite + "&risk_type=" + this.queryCondition.risk_type + "&page=" + this.queryCondition.page + "&page_size=" + this.queryCondition.pageSize + "&file=" + this.sendFile + "&user=&key_info=" + this.queryCondition.key_info + "&to_date=" + this.queryCondition.to_date + "&export=1";
      }
      else {
        window.location.href = "http://10.25.24.51:10194/api/rest/nlp/bod/query_news?is_favorite=" + this.queryCondition.is_favorite + "&risk_type=" + this.queryCondition.risk_type + "&page=" + this.queryCondition.page + "&page_size=" + this.queryCondition.pageSize + "&file=" + this.sendFile + "&user=&key_info=" + this.queryCondition.key_info + "&export=1";
      }
      // this.$_axios.post('http://10.25.26.232:10194/api/rest/nlp/bod/query_news?', formData, config).then(response => {
      // });
      // this.$_axios.post("http://10.25.24.51:10194/api/rest/nlp/bod/query_news?is_favorite=&risk_type=&page=1&page_size=10&keyword=&checked=&user=&key_info=&export=1").then(response => {
      // })
      //   .catch(err => {
      //     alert("导出失败，请稍后再试！");
      //     console.log(err);
      //   });
    }
  },
};
</script>

<style lang="less" scoped>
.wi80 {
  width: 80px !important;
}
.parentBox {
  width: 510px;
  margin: 0 auto;
}
body {
  font-size: 14px;
  font-family: "Arial";
  color: #000000;
}

.execl {
  width: 30px;
  position: absolute;
  top: 51px;
  .execlText {
    text-align: center;
    width: 80px;
    height: 30px;
    // margin-top: 64px;
    margin-left: 650px;
    border: 1px solid #b50229;
    background-color: #b50229;
    border-radius: 5px;
    color: white;
    line-height: 30px;
    cursor: pointer;
  }
}

h1 {
  width: 243px;
  height: 49px;
  font-size: 0;
  // font-size: 28px;
  line-height: 49px;
  // font-style: oblique;
  margin-top: 20px;
  margin-left: 20px;
  // padding-left: 10px;
  color: #000000;
  // background-color: #99FFFF;
  span {
    color: #ff6633;
    font-size: 28px;
    display: block;
  }
}

// h1 {
//   display: block;
//   width: 280px;
//   height: 49px;
//   font-size: 28px;
//   line-height: 49px;
//   font-style: oblique;
//   margin-top: 20px;
//   margin-left: 150px;
//   padding-left: 10px;
//   color: #000000;
//   // background-color: #99ffff;
// }
h2 {
  display: block;
  width: 150px;
  margin-bottom: 10px;
  margin-left: 1400px;
  color: gray;
  position: absolute;
  z-index: 2;
}
.mtt {
  margin-top: 8px !important;
  margin-left: 40px !important;
}

.mtt2 {
  margin-top: 8px !important;
  margin-left: 10px !important;
}
.div {
  display: block;
  border-bottom: solid 1px #888;
  position: relative;
  width: 1180px;
  min-width: 100%;
}
.war_c {
  color: red;
}
.clearfix {
  width: 850px;
  margin: 30px auto 20px;
}
// .mt40 {
//   margin-top: 40px;
// }
.clearfix:after {
  content: ".";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
  zoom: 1;
}

.left {
  float: left;
  width: 220px;
  display: block;
}
.input {
  width: 130px;
  height: 25px;
  border: 1px solid #797979;
}
.input2 {
  width: 180px;
  height: 25px;
  border: 1px solid #797979;
}
.ml60 {
  margin-left: 40px;
}
.queryBtn {
  width: 75px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  cursor: pointer;
  border: 1px solid #b50229;
  background-color: #b50229;
  border-radius: 5px;
  margin-top: -3px;
  color: white;
}

.queryBtn2 {
  width: 75px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  cursor: pointer;
  border: 1px solid #797979;
  background-color: #fff;
  border-radius: 5px;
  margin-top: -3px;
}
.width265 {
  width: 180px !important;
  float: left;
  display: block;
}
.mt10 {
  margin-top: 10px !important;
}

.select {
  width: 363px !important;
  position: absolute;
  top: 68px;
  left: 755px;
}
// .mt88 {
//   margin-left: -88px;
// }

.drop-down-box {
  background-color: #fff;
  position: absolute;
  top: 24px;
  left: 178px;
  width: 179px;
  border: 1px solid #797979;
  z-index: 2;
  height: 300px;
  overflow-x: hidden;
  overflow-y: auto;
  line-height: 24px;
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

.queryResult {
  margin: 0 20px 0 20px;
  table {
    width: 1380px;
    // margin-top: 30px;
    // margin-left: 160px;
    margin: 30px auto 0;
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
      width: 200px;
    }
    .tableTh:nth-child(2) {
      width: 350px;
    }
    .tableTh:nth-child(3) {
      width: 550px;
    }
    .tableTh:nth-child(4) {
      width: 150px;
    }
    .tableTh:nth-child(5) {
      width: 200px;
    }
    .tableTh:nth-child(6) {
      width: 200px;
    }
  }
  .select-panel {
    height: 0;
    z-index: 999;
  }

  .select-item {
    /*height: 0;*/
    z-index: 999;
    margin: 1px;
    padding: 2px;
    background: #fff;
    opacity: 0.8;
  }

  .data-center {
    position: relative;
    text-align: center;
    span {
      // position: absolute;
      // bottom: 0;
      // right: 0;
      cursor: pointer;
      color: blue;
    }
  }
}

.cover {
  position: fixed;
  left: 0px;
  top: 0px;
  background: rgba(0, 0, 0, 0.4);
  width: 100%; /*宽度设置为100%，这样才能使隐藏背景层覆盖原页面*/
  height: 170%;
  filter: alpha(opacity=60); /*设置透明度为60%*/
  opacity: 0.6; /*非IE浏览器下设置透明度为60%*/
  z-index: 999;
}
.modal {
  position: absolute;
  width: 1400px;
  height: auto;
  top: 30%;
  left: 5%;
  background-color: #fff;
  cursor: pointer;
  z-index: 9999;
  border-radius: 10px;
}
.close {
  text-align: right;
  color: blue;
  margin-top: 8px;
  width: 99%;
}

.mtll {
  margin-left: 15px !important;
}

.mt64 {
  margin-left: -64px;
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 23px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-star:before {
  content: "\e615";
}

.hag {
  height: 50px;
  background-color: #f0f0f0;
}

.mttg {
  margin-left: -63px;
  margin-right: -90px;
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

.mt130 {
  margin-left: 125px;
  width: 80px;
}

//导航栏效果
.di-header {
  min-width: 1000px;
  height: 60px;
  background: rgba(255, 255, 255, 1);
  text-align: center;
}

.di-header:after {
  content: "";
  display: table;
  width: 100%;
  height: 4px;
  z-index: 1;
  background: url(//../static/event/img/line_1.png) repeat-x;
  position: absolute;
  top: 58px;
}

.tj-logo-wrapper {
  position: absolute;
  left: 20px;
  top: 5px;
}
.tj-logo-wrapper img {
  display: block;
  outline: 0;
}
.name {
  font-family: 微软雅黑;
  font-size: 24px;
  font-weight: 400;
  text-align: center;
  height: 36px;
  line-height: 36px;
  width: 500px;
  margin: 0 auto;
  position: relative;
  top: -50px;
  color: black;
}
.subname {
  font-size: 18px;
  width: 200px;
  position: relative;
  top: 52px;
  left: 105px;
}
</style>



