<template>
  <div>
    <div class="homePageMain clearFloat">
      <!-- <div v-if="isShow" >
        <table class="table" v-if="$route.path != '/monitor/homePage/fundDetailtwo'" v-show="$route.path != '/monitor/homePage/fundDetail'">
          <tbody>
            <tr>
              <th class="w8"></th>
              <th>最新价</th>
              <th>涨跌额</th>
              <th>涨跌幅</th>
            </tr>
            <tr v-for="(item, index) of dataList" :key="index">
              <td>{{item.name}}</td>
              <td class="red">{{item.last_trade}}</td>
              <td class="green">{{item.change}}</td>
              <td class="green">{{item.chg}}</td>
            </tr>
          </tbody>
        </table>
      </div> -->
      <div class="clearFloat top" v-if="isShow">
        <div v-for="(item, index) of dataList" :key="index">
          <div class="left">
            <div class="blue">{{item.name}}</div>
            <div>{{item.last_trade}}</div>
            <div>
              <span class="red">{{item.change}}</span>
              <span class="green">{{item.chg}}</span>
            </div>
          </div>
        </div>
      </div>
      <sidebar :prop="sidebarData"></sidebar>
      <div v-if="routerGoNow" class="homePageChildPage clearFloat">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import sidebar from './sidebar';
import homeContent from './homeContent';
export default {
  data() {
    return {
      isShow: false,
      isShowList: false,
      dataList: [],
      sidebarData: [
        {
          title:'全网舆情', path:'/monitor/homePage/publicSendtime' , isShowList:false, list:[]
        },
        {          title: '股票', isShowList: false, list: [
            // 新闻预警
            { title: '新闻收藏夹', path: '/monitor/homePage/stock_newsWarning', list: [] },
            { title: '公告预警', isShowList: false, path: '/monitor/homePage/stock_afficheWarning', list: [
                { title: '基本公告', path: '/monitor/homePage/stock_Basicannounce' },
                { title: '自定义板块范围公告', path: '/monitor/homePage/stock_Template' },
                { title: '负面公告', path: '/monitor/homePage/stock_Negative' }
              ]            },
            { title: '财务信息预警', path: '/monitor/homePage/stock_financeWarning', list: [] },
            {              title: '股价异动预警', isShowList: false, path: '/monitor/homePage/homeContent', list: [
                { title: '股价异动数据', path: '/monitor/homePage/stock_sharePriceWarning' },
                { title: '股价异动新闻', path: '/monitor/homePage/stock_sharePriceWarningNews' },
              ]            }
          ]        },

        {          title: '债券', isShowList: false, list: [
            {              title: '新闻预警', isShowList: false, path: '/monitor/homePage/homeContent', list: [
                { title: '债券发行人负面新闻', path: '/monitor/homePage/bond_negativeNews' },
                { title: '新闻收藏夹', path: '/monitor/homePage/bond_newsFavorite' }
              ]            },
            // {title: '公告预警', isShowList: false, path: '/monitor/homePage/homeContent', list: [
            //     {title: '债券发行人公告', path: '/monitor/homePage/bond_issuerNotice'},
            //     {title: '受托管理人、主承销商发布的公告', wordWrapping: true, path: '/monitor/homePage/bond_manageNotice'}
            // ]},
            {              title: '公告预警', isShowList: false, list: [
                { title: '基本公告', path: '/monitor/homePage/bond_ratingwarning' },
                { title: '自定义板块范围公告', path: '/monitor/homePage/bond_template' },
              ]            },
            {              title: '评级预警', isShowList: false, path: '/monitor/homePage/homeContent', list: [
                { title: '评级信息', path: '/monitor/homePage/bond_ratingInformation' },
                { title: '评级变动', path: '/monitor/homePage/bond_ratingChange' },
                { title: '自定义板块预警', path: '/monitor/homePage/bond_plateWarning'}
              ]            }
          ]        },

        {          title: '基金', isShowList: false, list: [
            {              title: '新闻预警', isShowList: false, path: '/monitor/homePage/homeContent', list: [
                { title: '基金重仓股负面新闻', path: '/monitor/homePage/fund_shigekuraNews' },
                { title: '基金管理人新闻', path: '/monitor/homePage/fund_managerNews' },
                { title: '新闻收藏夹', path: '/monitor/homePage/fund_newsFavorite' }
              ]            },
            {              title: '公告预警', isShowList: false, path: '/monitor/homePage/fund_issuerNotice', list: [
                { title: '基本公告', path: '/monitor/homePage/fund_Basicannounce' },
                { title: '自定义板块范围公告', path: '/monitor/homePage/fund_Template' }
              ]            },
            { title: '基金情况', path: '/monitor/homePage/fund_info', list: [] }
          ]        },

        {          title: '期货', isShowList: false, list: [
            { title: '股指期货交易规则', path: '/monitor/homePage/stock_index_futures', list: [] }
          ]        },

        {          title: '期权/商品', isShowList: false, list: [
            { title: '交易所公告信息监控', path: '/monitor/homePage/shareOption_page1', list: [] },
            { title: '其他舆情监控', path: '/monitor/homePage/shareOption_page2', list: [] }
          ]        },

        {          title: '新三板', isShowList: false, list: [
            {              title: '新闻预警', isShowList: false, path: '/monitor/homePage/NEEQ_NewsMonitoring', list: [
                { title: '新三板持仓股票舆情监控', path: '/monitor/homePage/NEEQ_NewsMonitoring' },
                // {title: '新闻收藏夹', path: '/monitor/homePage/NEEQ_favorite'}
              ]            },
            {              title: '最新动态', isShowList: false, path: '/monitor/homePage/NEEQ_announcement', list: [
                { title: '通知公告', path: '/monitor/homePage/NEEQ_announcement' },
                { title: '股转动态', path: '/monitor/homePage/NEEQ_dynamic' }
              ]            },
            {              title: '监管公开信息', isShowList: false, path: '/monitor/homePage/NEEQ_selfMeasures', list: [
                { title: '自律监管措施', path: '/monitor/homePage/NEEQ_selfMeasures' },
                { title: '纪律处分', path: '/monitor/homePage/NEEQ_punishment' },
                { title: '问询函', path: '/monitor/homePage/NEEQ_inquiryLetter' },
              ]            }
          ]        },

        {          title: '监管要求', isShowList: false, list: [
            { title: '监管对挂牌公司处罚情况', path: '/monitor/homePage/supervise_page1', list: [] },
            // {title: '测试页面', path: '/monitor/homePage/supervise_page2', list: []},
            { title: '最新监管规则解读', path: '/monitor/homePage/supervise_page3', list: [] }
          ]        },

        { title: '法律法规', path: '/monitor/homePage/legislation', isShowList: false, lastChild: true, list: [] },
      ]
    }
  },
  computed: {
    routerGoNow() {
      return this.$store.state.routerGoNow;
    }
  },
  components: {
    sidebar,
    homeContent
  },
  created() {
    this.created();
  },
  methods: {
    showList() {
      this.isShowList = !this.isShowList;
    },
    created() {
      this.isShow = true;
      const url = "http://10.25.24.51:10191/api/rest/nlp/risk/macro_index";
      this.$_axios.get(url, {}).then(response => {
        // 显示查询结果
        this.isShow = true;
        this.dataList = JSON.parse(JSON.stringify(response.data.result));
        this.dataList.forEach(item => {
          // html += '<div class="left"><div class="blue">' + item.name + '</div><div>' + item.last_trade + '</div><div><span class="red">' + item.change + '</span><span class="green">' + item.chg + '</span></div></div>';
          item.name = item.name;
          item.last_trade = item.last_trade;
          item.change = item.change;
          item.chg = "(" + item.chg + ")";
        });
      })
        .catch(err => {
          console.log(err);
        });
    },
  },
  mounted() {
    setInterval(() => {
      this.created()
    }, 60000)
  }
}
</script>
<style lang="less" scoped>
.left {
  float: left;
  width: 145.2px;
  display: block;
  padding: 15px 0px 15px 0px;
}
.top {
  width: 1452px;
  margin-left: 50px;
}
.blue {
  color: blue;
}
.red {
  color: red;
}
.green {
  color: green;
}
.w8 {
  width: 99px !important;
}
table {
  font-size: 12px;
  width: 235px;
  text-align: center;
  cursor: pointer;
  margin-left: 50px;
  border: 1px soild #797979;
  border-collapse: collapse;
  word-wrap: break-word;
  word-break: break-all;
  th {
    width: 60px;
    height: 30px;
    line-height: 30px;
    border: 1px solid #797979;
    background-color: #f0f5f9;
  }
  tr {
    overflow: hidden;
    border: 1px solid #797979;
  }
  td {
    height: 30px;
    text-align: center;
    vertical-align: middle;
    border: 1px solid #797979;
  }
}
.homePageMain {
  width: 1719px;
  height: 803px;
}
.homePageChildPage {
  float: left;
  width: 1180px;
  margin-left: 65px;
  // margin-top: -310px;
}
</style>

