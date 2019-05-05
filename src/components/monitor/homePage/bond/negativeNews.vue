<template>
  <div>
    <!-- 公司信息查询 -->
    <div>
      <div class="queryCondition-top">
        <div class="queryCondition-title">债券发行人负面新闻</div>
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
              <keyword @keywordEvent="keywordEvent"></keyword>
            </div>
            <div class="mt10">
              <div class="uploadFiles">
                <label for="fileExport">导入债券代码(csv、txt)等
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
      <!-- 查询结果 -->
      <div v-if="isShowQueryResult" class="queryResult">
        <div v-if="hasResultData">
          <table>
            <tbody>
              <tr>
                <th v-for="(item, index) of titleData" :key="index" class="tableTh" width:100px>{{item}}</th>
              </tr>
              <tr v-for="(item, index) of dataList" :key="index">
                <td>{{item.SECURITYNAME}}</td>
                <td>{{item.SECURITYCODE}}</td>
                <td>
                  <a :href="item.PURL" target="_bank">{{item.TITLE}}</a>
                </td>
                <td>{{item.SHOWTIME}}</td>
                <td>{{item.SOURCE}}</td>
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
import pullDownList from '@/components/common/pullDownList'
import pagination from '@/components/common/pagination'
import commonMethods from '@/common/common.js'
import datePicker from '@/components/common/datePicker'
import keyword from '@/components/common/keyword'
export default {
  data() {
    const oneDayAfter = new Date().getTime() - 86400000;
    return {
      url: 'http://10.25.24.51:10192/api/rest/nlp/risk/bond_negative_news?',
      isShowQueryResult: false,
      hasResultData: false,
      resultData: null,
      selectFileName: "选择文件",
      queryCondition: {
        from_date: '',
        to_date: '',
        keyword: '',
        page: 1,
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
      paginationData: {
        parentEvent: 'paginationSelect',
        page_Count: 0,
        total_Count: 0,
        current: 1
      },
      titleData: ['证券名称', '证券代码', '新闻标题', '新闻时间', '新闻源'],
      dataList: [],
      file: '',
      sendFile: '',
    }
  },
  components: {
    pullDownList,
    pagination,
    datePicker,
    keyword
  },
  methods: {
    handleFileChange(event) {
      console.log(event)
      this.file = event.target.files[0];
      console.log(this.file)
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
    },
    clearFile() {
      this.$refs.inputer = null;
      this.selectFileName = '选择文件';
      this.file = '';
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
        this.resultData = response.data.result.Announce_List;
        this.dataList = JSON.parse(JSON.stringify(this.resultData));
      })
        .catch(err => {
          console.log(err);
        });
    },
    query() {
      this.isShowQueryResult = true;
      this.hasResultData = false;
      this.sendFile = this.file;
      this.sendData = JSON.parse(JSON.stringify(this.queryCondition));
      for (let key in this.sendData) {
        if (!this.sendData[key]) {
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
        this.resultData = response.data.result.Announce_List;
        this.dataList = JSON.parse(JSON.stringify(this.resultData));
        this.paginationData.page_Count = response.data.result.Page_Count;
        this.paginationData.total_Count = response.data.result.Total_Count;
      })
        .catch(err => {
          console.log(err);
        });
    },
    keywordEvent(...data) {
      this.queryCondition.keyword = data[0];
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
  }
}
</script>

<style lang="less" scoped>
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

.mt10 {
  margin-top: 45px;
}
.ml10 {
  margin-left: 10px;
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
    .tableTh:nth-child(1) {
      width: 100x;
    }
    .tableTh:nth-child(2) {
      width: 100px;
    }
    .tableTh:nth-child(3) {
      width: 450px;
    }
    .tableTh:nth-child(4) {
      width: 250px;
    }
    .tableTh:nth-child(5) {
      width: 200px;
    }
  }
}
</style>
