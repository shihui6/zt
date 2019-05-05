<template>
  <div>
    <!-- 新三板 最新动态 股转动态 -->
    <div class="queryCondition-top">
      <div class="queryCondition-title">股转动态</div>
      <div class="middle clearFloat">
        <!-- 查询条件框 -->
        <div>
          <div class="floatLeft">
            <keyword @keywordEvent="keywordEvent"></keyword>
          </div>
          <div class="floatLeft">
            <date-picker :prop="startDatePicker" @startDateEvent="startDateEvent"></date-picker>
          </div>
          <div class="floatLeft">
            <date-picker :prop="endDatePicker" @endDateEvent="endDateEvent"></date-picker>
          </div>
          <!-- <div class="floatLeft marginLeft20">
            <date-picker :prop="newsDatePicker" @newsDateEvent="newsDateEvent"></date-picker>
          </div> -->
        </div>
        <!-- 查询按钮 -->
        <div class="queryBtn">
          <span @click="query">查询</span>
        </div>
      </div>
    </div>
    <div v-if="isQueryResult">
      <message-list :prop="announcementData"></message-list>
      <pagination :prop="paginationData" @paginationSelect="paginationSelect"></pagination>
    </div>
  </div>
</template>

<script>
import messageList from '@/components/common/messageList'
import pagination from '@/components/common/pagination'
import datePicker from '@/components/common/datePicker'
import commonMethods from '@/common/common.js'
import keyword from '@/components/common/keyword'
export default {
  data() {
    const _year = new Date().getTime() - 31536000000;
    // const oneDayAfter = new Date().getTime() - 86400000;
    return {
      url: 'http://10.25.24.51:10189/api/risk/neeq_news?',
      isQueryResult: false,
      queryCondition: {
        keyword: '',
        start_date: '',
        end_date: '',
        page: 0,
        pagesize: 10
      },
      sendData: {},
      paginationData: {
        parentEvent: 'paginationSelect',
        page_Count: 0,
        total_Count: 0,
        current: 1
      },
      startDatePicker: {
        title: '日期：',
        parentEvent: 'startDateEvent',
        defaultDate: new Date(_year)
      },
      endDatePicker: {
        title: '至：',
        parentEvent: 'endDateEvent',
        defaultDate: new Date()
      },
      newsDatePicker: {
        title: '日期：',
        parentEvent: 'newsDateEvent'
      },
      announcementData: []
    }
  },
  components: {
    messageList,
    pagination,
    datePicker,
    keyword
  },
  methods: {
    query() {
      this.isQueryResult = false;
      this.sendData = JSON.parse(JSON.stringify(this.queryCondition));
      this.sendData.neeq_type = '股转动态';
      console.log('sendData', this.sendData)
      this.$_axios.get(this.url, {
        params: this.sendData
      }).then(response => {
        const resultData = response.data.result;
        this.isQueryResult = true;
        console.log(resultData)
        console.log(resultData.total_count)
        if (resultData.total_count) {
          this.paginationData.page_Count = Math.ceil(resultData.total_count / 10);
        } else {
          this.paginationData.page_Count = 0;
        }
        this.paginationData.total_Count = resultData.total_count;
        console.log(this.paginationData)

        this.announcementData = response.data.result.neeq_news.map(item => {
          const date = item.news_date.split('-')[1] + '月' + item.news_date.split('-')[2] + '日';
          return {
            id: item.neeq_id,
            neeq_type: item.neeq_type,
            time: date,
            title: item.news_title,
            content: item.sub_title,
          }
        });
      })
        .catch(err => {
          console.log(err);
        });
    },
    paginationSelect(pageNumber) {
      const sendData = JSON.parse(JSON.stringify(this.sendData));
      sendData.page = pageNumber - 1;
      console.log('sendData', sendData)
      this.$_axios.get(this.url, {
        params: sendData
      }).then(response => {
        const resultData = response.data.result;
        this.isQueryResult = true;
        console.log(resultData)

        this.announcementData = response.data.result.neeq_news.map(item => {
          const date = item.news_date.split('-')[1] + '月' + item.news_date.split('-')[2] + '日';
          return {
            id: item.neeq_id,
            neeq_type: item.neeq_type,
            time: date,
            title: item.news_title,
            content: item.sub_title,
          }
        });
      })
        .catch(err => {
          console.log(err);
        });
    },
    keywordEvent(...data) {
      this.queryCondition.keyword = data[0];
    },
    inputEvent() {
      this.queryCondition.keyword = commonMethods.checkName(this.queryCondition.keyword);
    },
    startDateEvent(...data) {
      this.queryCondition.start_date = data[0];
    },
    endDateEvent(...data) {
      this.queryCondition.end_date = data[0];
    },
    newsDateEvent(...data) {
      this.queryCondition.news_date = data[0];
    }
  },
  mounted() {
    this.queryCondition.start_date = commonMethods.formatDateTime2(this.startDatePicker.defaultDate);
    this.queryCondition.end_date = commonMethods.formatDateTime2(this.endDatePicker.defaultDate);
  }
}
</script>

<style lang="less" scoped>
</style>
