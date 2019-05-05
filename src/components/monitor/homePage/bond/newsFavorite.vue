<template>
  <div>
    <div>
      <div>
        <div class="queryCondition-top">
          <div class="queryCondition-title">新闻收藏夹</div>
          <div class="middle clearFloat">
            <!-- 查询条件框 -->
            <div class="width1100">
              <div class="floatLeft">
                <date-picker :prop="startDatePicker" @startDateEvent="startDateEvent"></date-picker>
              </div>
              <div class="floatLeft marginLeft10">
                <date-picker :prop="endDatePicker" @endDateEvent="endDateEvent"></date-picker>
              </div>
              <div class="floatLeft">
                <div class="nowConditionStarBox floatLeft marginLeft10">
                  <div class="floatLeft">
                    重要性：
                  </div>
                  <div class="starBg condition floatLeft">
                    <span @click="conditionStar(item)" v-for="item of starNumber" :key="item" class="iconfont icon-star"></span>
                  </div>
                  <div class="nowConditionStar">
                    <span v-for="item of conditionStarNumber" :key="item" class="iconfont icon-xingxing"></span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div class="floatLeft">
                <div @click="checkRiskType" class="checkBox floatLeft">
                  <span class="iconBox">
                    <i v-show="isShowTypeList" class="dot"></i>
                  </span>
                  <span class="marginLeft5">选择风险类别</span>
                </div>
              </div>
              <div class="floatLeft">
                <div class="checkBox floatLeft marginLeft20">
                  <!-- @click="checkFinished" -->
                  <!-- <span class="iconBox">
                    <i v-show="isFinished" class="dot"></i>
                  </span> -->
                  <span class="marginLeft20">是否处理：</span>
                  <span @click="checkFinished(true)">
                    是
                    <span class="iconBox">
                      <i v-show="isFinished" class="dot"></i>
                    </span>
                  </span>
                  <span @click="checkFinished(false)">
                    否
                    <span class="iconBox">
                      <i v-show="!isFinished" class="dot"></i>
                    </span>
                  </span>
                </div>
              </div>
              <div class="floatLeft marginLeft20">
                <div class="uploadFiles">
                  <label for="fileExport">上传文件(csv、txt)等
                    <span class="fileExportBtn">{{selectFileName}}</span>
                  </label>
                  <span v-if="selectFileName !== '选择文件'" @click="clearFile" class="clearFile">清除文件</span>
                  <input type="file" id="fileExport" @change="handleFileChange($event)" ref="inputer">
                </div>
              </div>
            </div>
            <!-- 查询按钮 -->
            <div class="queryBtn">
              <span @click="query">查询</span>
            </div>
          </div>
        </div>
        <!-- 风险类型选择 -->
        <div v-if="isShowTypeList && isShowTypeBox" class="typeBox clearFloat">
          <div class="firstTypeBox">
            <ul class="clearFloat">
              <li v-for="(item,index) of firstTypeList" :key="index" @click="checkFirstType(item,index)">
                <div>
                  <span class="iconBox">
                    <i v-show="item.check" class="iconfont icon-queren"></i>
                  </span>
                  <span class="firstType">{{item.type}}</span>
                </div>
              </li>
            </ul>
          </div>
          <div class="typeBtnBox">
            <span @click="confirmType()">确定</span>
            <span @click="resetType()">重置</span>
          </div>
          <div class="secondTypeBox">
            <ul class="clearFloat">
              <li v-for="(item,index) of secondTypeList" :key="index" class="clearFloat">
                <div v-show="item.check" class="firstItem">
                  <div class="firstTitle">
                    {{item.firstTitle}}：
                  </div>
                  <div class="listBox">
                    <ul class="clearFloat">
                      <li v-for="(secondItem,secondIndex) of item.list" :key="secondIndex" @click="checkSecondType(secondItem,secondIndex)" class="secondItemLi">
                        <span class="iconBox">
                          <i v-show="secondItem.check" class="iconfont icon-queren"></i>
                        </span>
                        <span class="secondType">{{secondItem.title}}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
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
                  <td>{{item.SHOWTIME}}</td>
                  <td class="tableTd">
                    <a :href="item.URL" target="_bank">{{item.TITLE}}</a>
                  </td>
                  <td class="data-content">
                    <p v-html="item.CONTENT"></p>
                    <span @click="details(item, index)">{{item.details}}</span>
                  </td>
                  <td>{{item.SOURCE}}</td>
                  <td>
                    <div class="floatLeft2">
                      <select class="form-control" style="width:100px;" v-model="item.risk_code">
                        <option v-for="s in risk_codeList" :value="s.code" :key="s.code">{{s.title}}</option>
                      </select>
                      <button type="button" @click="saveItem(item)" class="btn btn-default">确定</button>
                    </div>
                  </td>
                  <td class="starBox">
                    <div class="starBg">
                      <span @click="choiceStar(secondItem, item, index)" v-for="secondItem of starNumber" :key="secondItem" class="iconfont icon-star"></span>
                    </div>
                    <div class="nowStarNumber">
                      <div class="clearFloat" v-if="item.starNumber === 1">
                        <span class="iconfont icon-xingxing"></span>
                      </div>
                      <div class="clearFloat" v-else-if="item.starNumber === 2">
                        <span class="iconfont icon-xingxing"></span>
                        <span class="iconfont icon-xingxing"></span>
                      </div>
                      <div class="clearFloat" v-else-if="item.starNumber === 3">
                        <span class="iconfont icon-xingxing"></span>
                        <span class="iconfont icon-xingxing"></span>
                        <span class="iconfont icon-xingxing"></span>
                      </div>
                      <div v-else></div>
                    </div>
                  </td>
                  <td>
                    <span v-if="item.is_favorite">已收藏
                      <span @click="favorite(item, index, false)" class="updateBtn">取消</span>
                    </span>
                    <span v-else @click="favorite(item, index, true)" class="updateBtn">加入收藏夹</span>
                  </td>
                  <td>
                    <span v-if="item.finished">zhangxx已处理
                      <span @click="dispose(item, index, false)" class="updateBtn">取消</span>
                    </span>
                    <span v-else @click="dispose(item, index, true)" class="updateBtn">处理完成</span>
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
  </div>
</template>

<script>
import pullDownList from '@/components/common/pullDownList'
import pagination from '@/components/common/pagination'
import commonMethods from '@/common/common.js'
import datePicker from '@/components/common/datePicker'
export default {
  data() {
    const oneDayAfter = new Date().getTime() - 86400000;
    return {
      url: 'http://10.25.24.51:10192/api/rest/nlp/risk/query_favorite',
      updateUrl: 'http://10.25.24.51:10192/api/rest/nlp/risk/update_news_factor?',
      isShowTypeList: false,
      isShowTypeBox: false,
      isShowQueryResult: false,
      hasResultData: false,
      isFinished: false,
      isAttentionPool: false,
      categroyIndex: 0,
      nowCategroy: '',
      selectFileName: '选择文件',
      starNumber: [1, 2, 3],
      conditionStarNumber: [],
      sendData: {},
      queryCondition: {
        stock_type: 'B',
        imp_score: '',
        is_favorite: '',
        risk_type: '',
        risk_code: '',
        page_size: 10,
        page: 1,
        from_date: '',
        to_date: '',
        keyword: '',
        finished: '',
        file: '',
      },
      startDatePicker: {
        title: '新闻日期：',
        parentEvent: 'startDateEvent',
        defaultDate: new Date(oneDayAfter)
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
      titleData: ['新闻时间', '新闻标题', '新闻内容', '新闻源', '风险类型', '重要性', '收藏', '处理情况'],
      dataList: [],
      firstTypeList: [
        { type: '全部', check: false },
        { type: '信用风险', check: false },
        { type: '市场风险', check: false },
        { type: '财务风险', check: false },
        { type: '经营风险', check: false },
        { type: '管理风险', check: false },
        { type: '项目风险', check: false },
        { type: '担保风险', check: false },
        { type: '不可抗力风险', check: false },
        { type: '监管预警', check: false },
        { type: '产品预警', check: false },
        { type: '其他风险', check: false }
      ],
      secondTypeList: [
        {          firstTitle: '信用风险', check: false, list: [
            { code: '510101', check: false, title: '债务违约、合同失信、债务展期' },
            { code: '510102', check: false, title: '评级下调、列入观察或负面类展望、推迟评级' },
            { code: '510103', check: false, title: '欺诈造假' },
            { code: '510104', check: false, title: '承诺失信' },
            { code: '510105', check: false, title: '公司挪用资金、未按约定使用资金' },
          ]        },
        {          firstTitle: '市场风险', check: false, list: [
            { code: '511100', check: false, title: '暂停交易、退市' },
            { code: '511101', check: false, title: '股权质押、冻结或爆仓' },
            { code: '511102', check: false, title: '股份解禁或减持' },
            { code: '511103', check: false, title: '证券价格异常波动' },
          ]        },
        {          firstTitle: '财务风险', check: false, list: [
            { code: '512100', check: false, title: '发生亏损' },
            { code: '512101', check: false, title: '盈利能力下降' },
            { code: '512102', check: false, title: '公司资金流动性不足或资金来源异常' },
            { code: '512103', check: false, title: '资不抵债、资产负债率过高' },
            { code: '512104', check: false, title: '资产重大减值、资产异常' },
            { code: '512105', check: false, title: '财务造假、不透明，财务数据存在真实性问题' },
            { code: '512106', check: false, title: '放弃债权和财产' },
            { code: '512107', check: false, title: '对外借款或对外担保过多,存在代偿风险' },
          ]        },
        {          firstTitle: '经营风险', check: false, list: [
            { code: '513100', check: false, title: '重组失败、重组取消或重组存在问题' },
            { code: '513101', check: false, title: '经营方针、主营业务、经营范围发生重大变化' },
            { code: '513102', check: false, title: '对外投资失误、参与其他公司股权之争、抛售公司资产' },
            { code: '513103', check: false, title: '虚假注资、抽逃资金、转移资产' },
            { code: '513104', check: false, title: '国家或地方政府政策变动而造成影响' },
            { code: '513105', check: false, title: '公司资产被查封、扣押、冻结、司法划转' },
            { code: '513106', check: false, title: '公司经营出现问题、公司（项目）停产或半停产、业务减少' },
            { code: '513107', check: false, title: '公司发生减资、合并、分立、解散、破产' },
            { code: '513108', check: false, title: '关联企业或人（实际控制人、控股股东、供应商、客户、被担保企业、其他关联企业）出现问题' },
            { code: '513109', check: false, title: '投诉和诉讼事件、经济纠纷和环保问题等公共纠纷' },
            { code: '513110', check: false, title: '公司产品存在缺陷或存在问题' },
            { code: '513111', check: false, title: '审批不通过事项或撤销公司某项经营资格' },
            { code: '513112', check: false, title: '犯罪事件' },
            { code: '513113', check: false, title: '公司违规或被问询' },
          ]        },
        {          firstTitle: '管理风险', check: false, list: [
            { code: '514100', check: false, title: '公司控制权斗争、实际控制人发生变动、公司性质变动、公司股东持有的股份被司法划转' },
            { code: '514101', check: false, title: '处罚事件或问询事件' },
            { code: '514102', check: false, title: '高管变动（异动）' },
            { code: '514103', check: false, title: '员工（含高管）违规' },
            { code: '514104', check: false, title: '拖欠员工工资、大量辞工或员工大面积离职' },
          ]        },
        {          firstTitle: '项目风险', check: false, list: [
            { code: '515100', check: false, title: '公司项目发生延期、手续不全、陷入问题' },
            { code: '515101', check: false, title: '项目产能未达到预期或情况备受质疑的' },
          ]        },
        {          firstTitle: '担保风险', check: false, list: [
            { code: '516100', check: false, title: '担保人或抵押物出现纠纷或问题' },
          ]        },
        {          firstTitle: '不可抗力风险', check: false, list: [
            { code: '517100', check: false, title: '地震、水灾、火灾、恐怖袭击；通讯、电力中断；战争' },
          ]        },
        // {firstTitle: '监管预警', check: false, list: [
        //   {code: 'xxxxx', check: false, title: 'xxxxxxxxxx'},
        // ]},
        // {firstTitle: '产品预警', check: false, list: [
        //   {code: 'xxxxx', check: false, title: 'xxxxxxxxxx'},
        // ]},
        {          firstTitle: '其他风险', check: false, list: [
            { code: '590100', check: false, title: '其他风险类事件' },
          ]        },
      ],
      risk_codeList: [
        { code: " ", title: "无" },
        { code: "518", title: "产品预警" },
        { code: "519", title: "监管预警" },
        { code: "510101", title: "债务违约、合同失信、债务展期" },
        { code: "510102", title: "评级下调、列入观察或负面类展望、推迟评级" },
        { code: "510103", title: "欺诈造假" },
        { code: "510104", title: "承诺失信" },
        { code: "510105", title: "公司挪用资金、未按约定使用资金" },
        { code: "511100", title: "暂停交易、退市" },
        { code: "511101", title: "股权质押、冻结或爆仓" },
        { code: "511102", title: "股份解禁或减持" },
        { code: "511103", title: "证券价格异常波动" },
        { code: "512100", title: "发生亏损" },
        { code: "512101", title: "盈利能力下降" },
        { code: "512102", title: "公司资金流动性不足或资金来源异常" },
        { code: "512103", title: "资不抵债、资产负债率过高" },
        { code: "512104", title: "资产重大减值、资产异常" },
        { code: "512105", title: "财务造假、不透明，财务数据存在真实性问题" },
        { code: "512106", title: "放弃债权和财产" },
        { code: "512107", title: "对外借款或对外担保过多,存在代偿风险" },
        { code: "513100", title: "重组失败、重组取消或重组存在问题" },
        { code: "513101", title: "经营方针、主营业务、经营范围发生重大变化" },
        {
          code: "513102",
          title: "对外投资失误、参与其他公司股权之争、抛售公司资产"
        },
        { code: "513103", title: "虚假注资、抽逃资金、转移资产" },
        { code: "513104", title: "国家或地方政府政策变动而造成影响" },
        { code: "513105", title: "公司资产被查封、扣押、冻结、司法划转" },
        {
          code: "513106",
          title: "公司经营出现问题、公司（项目）停产或半停产、业务减少"
        },
        { code: "513107", title: "公司发生减资、合并、分立、解散、破产" },
        {
          code: "513108",
          title:
            "关联企业或人（实际控制人、控股股东、供应商、客户、被担保企业、其他关联企业）出现问题"
        },
        {
          code: "513109",
          title: "投诉和诉讼事件、经济纠纷和环保问题等公共纠纷"
        },
        { code: "513110", title: "公司产品存在缺陷或存在问题" },
        { code: "513111", title: "审批不通过事项或撤销公司某项经营资格" },
        { code: "513112", title: "犯罪事件" },
        { code: "513113", title: "公司违规或被问询" },
        {
          code: "514100",
          title:
            "公司控制权斗争、实际控制人发生变动、公司性质变动、公司股东持有的股份被司法划转"
        },
        { code: "514101", title: "处罚事件或问询事件" },
        { code: "514102", title: "高管变动（异动）" },
        { code: "514103", title: "员工（含高管）违规" },
        { code: "514104", title: "拖欠员工工资、大量辞工或员工大面积离职" },
        { code: "515100", title: "公司项目发生延期、手续不全、陷入问题" },
        { code: "515101", title: "项目产能未达到预期或情况备受质疑的" },
        { code: "516100", title: "担保人或抵押物出现纠纷或问题" },
        {
          code: "517100",
          title: "地震、水灾、火灾、恐怖袭击；通讯、电力中断；战争"
        },
        { code: "590100", title: "其他风险类事件" }
      ]
    }

  },
  components: {
    pagination,
    datePicker,
  },
  methods: {
    saveItem(s) {
      let m = Object.assign({}, s);
      m.news_id = m.INFOCODE;
      m.imp_score = m.starNumber;
      delete m.CONTENT;
      delete m.details;
      delete m.SHOWTIME;
      delete m.SOURCE;
      delete m.TITLE;
      delete m.URL;
      delete m.INFOCODE;

      this.$_axios
        .get(this.updateUrl, {
          params: m
        })
        .then(response => {
          // 结果
          const resultData = response.data.result;
          console.log("dispose处理数据", resultData);
          if (resultData.update_result === 1) {
            alert("风险类型设置成功");
          }
        })
        .catch(err => {
          debugger;
          console.log(err);
        });
    },
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
        this.selectFileName = this.file.name;
      }
      console.log('file', this.file)
    },
    clearFile() {
      // inputer
      this.$refs.inputer = null;
      this.selectFileName = '选择文件';
      this.file = '';
    },
    query() {
      this.isShowQueryResult = true;
      this.hasResultData = false;
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
      this.$_axios.post(this.url.toUrl(), formData, config).then(response => {
        // 显示查询结果
        this.hasResultData = true;
        console.log('主页数据', response.data.result);
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
          if (item.imp_score) {
            item.starNumber = parseInt(item.imp_score);
          } else {
            item.starNumber = 0;
          }
          if (item.CONTENT && item.CONTENT.length > 220) {
            item.CONTENT = item.CONTENT.slice(0, 220) + '...';
            item.details = '...详情';
          }
        });
      }).catch(err => {
        console.log(err);
      });

    },
    paginationSelect1(pageNumber) {
      this.paginationSelect(pageNumber);
    },
    paginationSelect2(pageNumber) {
      this.paginationSelect(pageNumber);
    },
    paginationSelect(pageNumber) {
      const sendData = JSON.parse(JSON.stringify(this.sendData));
      sendData.page = pageNumber;
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
        // 显示查询结果
        this.hasResultData = true;
        console.log('主页数据', response.data.result);
        this.resultData = response.data.result.Announce_List;
        this.resultData.forEach(item => {
          item.CONTENT = item.CONTENT.toString().replace(/\\r\\n\\r\\n/g, "<br>");
          item.CONTENT = item.CONTENT.toString().replace(/\\r\\n/g, "<br>");
        });
        this.dataList = JSON.parse(JSON.stringify(this.resultData));
        this.dataList.forEach(item => {
          // item.SHOWTIME = item.SHOWTIME ? commonMethods.formatDateTime(new Date(item.SHOWTIME)) : '-';
          if (item.imp_score) {
            item.starNumber = parseInt(item.imp_score);
          } else {
            item.starNumber = 0;
          }
          if (item.CONTENT && item.CONTENT.length > 220) {
            item.CONTENT = item.CONTENT.slice(0, 220) + '...';
            item.details = '...详情';
          }
        });
      }).catch(err => {
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
    checkFinished(flag) {
      this.isFinished = flag;
      this.queryCondition.finished = flag ? 1 : '';
    },
    // 是否显示风险类别
    checkRiskType() {
      this.isShowTypeList = !this.isShowTypeList;
      // isShowTypeBox
      if (this.isShowTypeList) {
        this.isShowTypeBox = true;
      } else {
        this.isShowTypeBox = false;
        this.queryCondition.risk_code = '';
      }
    },
    // 条件 选择重要级 星级
    conditionStar(number) {
      if (this.conditionStarNumber.length === 1 && number === 1) {
        this.conditionStarNumber = [];
        this.queryCondition.imp_score = '';
      } else {
        this.conditionStarNumber = [...Array(number).keys()];
        this.queryCondition.imp_score = number;
      }
    },
    // 选择重要级 星级
    choiceStar(number, item, index) {
      const sendData = {
        news_id: item.INFOCODE,
        risk_type: item.risk_type,
        risk_code: item.risk_code,
        is_favorite: item.is_favorite,
        finished: item.finished,
        news_type_fk_id: '',
        user: 'zhangxx',
      };
      for (let key in sendData) {
        if (sendData[key] === '') {
          delete sendData[key];
        }
      }
      sendData.imp_score = number;
      if (this.dataList[index].starNumber === 1 && number === 1) {
        sendData.imp_score = '';
      } else {
        sendData.imp_score = number;
      }
      this.$_axios.get(this.updateUrl, {
        params: sendData
      }).then(response => {
        // 结果
        const resultData = response.data.result;
        console.log('dispose处理数据', resultData);
        if (resultData.update_result === 1) {
          let content = this.dataList[index].CONTENT + ' ';
          if (this.dataList[index].starNumber === 1 && number === 1) {
            this.dataList[index].starNumber = 0;
          } else {
            this.dataList[index].starNumber = number;
          }
          this.dataList[index].CONTENT = content;
        }
      }).catch(err => {
        console.log(err);
      });


    },
    // 收藏
    favorite(item, index, flag) {
      // news_id=NW20180704900220429&risk_type=&risk_code=&imp_score=3&is_favorite=&news_type_fk_id=&finished=&user=
      const sendData = {
        news_id: item.INFOCODE,
        risk_type: item.risk_type,
        risk_code: item.risk_code,
        imp_score: item.imp_score,
        finished: item.finished,
        news_type_fk_id: '',
        user: 'zhangxx',
      };
      for (let key in sendData) {
        if (sendData[key] === '') {
          delete sendData[key];
        }
      }

      if (flag) {
        sendData.is_favorite = '1';
      } else {
        sendData.is_favorite = '';
      }
      sendData.imp_score = this.$store.startnumber;
      console.log('item', item)
      console.log('sendData', sendData)
      this.$_axios.get(this.updateUrl, {
        params: sendData
      }).then(response => {
        // 结果
        const resultData = response.data.result;
        console.log('dispose处理数据', resultData);
        if (resultData.update_result === 1) {
          this.dataList[index].is_favorite = flag ? '1' : '';
        }
      }).catch(err => {
        console.log(err);
      });
    },
    // 处理
    dispose(item, index, flag) {
      // news_id=NW20180704900220429&risk_type=&risk_code=&imp_score=3&is_favorite=&news_type_fk_id=&finished=&user=
      const sendData = {
        news_id: item.INFOCODE,
        risk_type: item.risk_type,
        risk_code: item.risk_code,
        imp_score: item.imp_score,
        is_favorite: item.is_favorite,
        news_type_fk_id: '',
        user: 'zhangxx',
      };
      for (let key in sendData) {
        if (sendData[key] === '') {
          delete sendData[key];
        }
      }
      sendData.imp_score = this.$store.startnumber;
      if (flag) {
        sendData.finished = '1';
      } else {
        sendData.finished = '';
      }
      console.log('item', item)
      console.log('sendData', sendData)
      this.$_axios.get(this.updateUrl, {
        params: sendData
      }).then(response => {
        // 结果
        const resultData = response.data.result;
        console.log('dispose处理数据', resultData);
        if (resultData.update_result === 1) {
          this.dataList[index].finished = flag ? '1' : '';
        }
      }).catch(err => {
        console.log(err);
      });
    },
    startDateEvent(...data) {
      this.queryCondition.from_date = data[0];
      // this.startDatePicker.defaultDate = new Date(data[0]);
    },
    endDateEvent(...data) {
      this.queryCondition.to_date = data[0];
      // this.endDatePicker.defaultDate = new Date(data[0]);
    },
    // 点击一级风险类型
    checkFirstType(item, index) {
      item.check = !item.check;
      if (item.type === '全部') {

        this.firstTypeList.forEach(val => {
          val.check = item.check;
        });
        this.secondTypeList.forEach(firstVal => {
          firstVal.check = item.check;
          firstVal.list.forEach(secondVal => {
            secondVal.check = item.check;
          });
        });
      } else {
        this.secondTypeList.forEach(firstVal => {
          if (item.type === firstVal.firstTitle) {
            firstVal.check = item.check;
            firstVal.list.forEach(secondVal => {
              secondVal.check = item.check;
            });
          }
        });
        if (!item.check) {
          this.firstTypeList[0].check = false;
        } else {
          this.checkAll();
        }
      }
    },
    // 点击二级风险类型
    checkSecondType(item, index) {
      item.check = !item.check;
      if (!item.check) {
        this.firstTypeList[0].check = false;
        this.secondTypeList.forEach(firstVal => {
          let checkNull = firstVal.list.every(secondVal => {
            return secondVal.check === false;
          });
          if (checkNull) {
            firstVal.check = false;
            this.firstTypeList.forEach(val => {
              if (val.type === firstVal.firstTitle) {
                val.check = false;
              }
            });
          }
        });
      } else {
        this.checkAll();
      }
    },
    // 点击一级或者二级判断是否全部选中了
    checkAll() {
      let tempFirstArr = JSON.parse(JSON.stringify(this.firstTypeList));
      tempFirstArr.shift();
      let isFirstAll = tempFirstArr.every(item => {
        return item.check === true;
      });
      let isSecondAll = this.secondTypeList.every(item => {
        let isCheck = item.list.every(secondItem => {
          return secondItem.check === true;
        });
        return isCheck === true;
      });
      console.log(1, isFirstAll, 2, isSecondAll)
      if (isFirstAll && isSecondAll) {
        this.firstTypeList[0].check = true;
      }
    },
    confirmType() {
      const tempArr = [];
      this.secondTypeList.forEach(firstVal => {
        firstVal.list.forEach(secondVal => {
          if (secondVal.check) {
            tempArr.push(secondVal.code);
          }
        });
      });
      this.resetType();
      this.queryCondition.risk_code = tempArr.join(',');
      this.isShowTypeBox = false;
      console.log(tempArr)
    },
    resetType() {
      this.firstTypeList.forEach(val => {
        val.check = false;
      });
      this.secondTypeList.forEach(firstVal => {
        firstVal.check = false;
        firstVal.list.forEach(secondVal => {
          secondVal.check = false;
        });
      });
      this.queryCondition.risk_code = '';
    }
  },
  mounted() {
    this.queryCondition.from_date = commonMethods.formatDateTime2(this.startDatePicker.defaultDate);
    this.queryCondition.to_date = commonMethods.formatDateTime2(this.endDatePicker.defaultDate);
  }
}
</script>

<style lang="less" scoped>
.attentionPoolSet {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  z-index: 3;
}
.categroy {
  span {
    float: left;
    width: 50px;
    height: 30px;
    cursor: pointer;
    text-align: center;
    line-height: 30px;
    color: #fff;
    background-color: #00ccff;
  }
  span.active {
    background-color: rgba(0, 114, 255, 0.5);
  }
}
.queryCondition-top {
  // position: relative;
  // width: 100%;
  // height: 100px;
  // margin-top: 30px;
  line-height: 25px;
  // border-bottom: 1px solid #797979;
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
      left: 56px;
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
  }
  .queryBtn {
    margin-top: -15px;
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
      height: 84px;
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
    // .tableTh:nth-child(1) {
    //   width: 75px;
    // }
    // .tableTh:nth-child(2) {
    //   width: 145px;
    // }
    // .tableTh:nth-child(4) {
    //   width: 90px;
    // }
    // .tableTh:nth-child(5){
    //   width: 100px;
    // }
    // .tableTh:nth-child(6) {
    //   width: 150px;
    // }

    .tableTh:nth-child(1) {
      width: 75px;
    }
    .tableTh:nth-child(2) {
      width: 165px;
    }
    .tableTh:nth-child(3) {
      width: 260px;
    }
    .tableTh:nth-child(4) {
      width: 75px;
    }
    .tableTh:nth-child(5) {
      width: 180px;
    }
    .tableTh:nth-child(6) {
      width: 95px;
    }
    .tableTh:nth-child(7) {
      width: 100px;
    }
    .tableTh:nth-child(8) {
      width: 140px;
    }
  }
}

.floatLeft2 {
  margin-left: 20px;
}
</style>
