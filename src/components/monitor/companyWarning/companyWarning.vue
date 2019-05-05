<template>
  <div class="blackSwanBox clearFloat">
    <!-- <div v-if="isShow">
      <table class="table">
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
    <!-- 关联公司预警 -->
    <div class="sidebarBox">
      <ul>
        <li v-for="(item, index) of sidebarData" :key="index">
          <router-link @click.native="routerGoNow" :to="item.path">{{item.title}}</router-link>
        </li>
      </ul>
    </div>
    <div v-if="isRouterGoNow" class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
      dataList: [],
      sidebarData: [
        { title: '公司信息查询', path: '/monitor/companyWarning/queryInformation' }
      ]
    }
  },
  computed: {
    isRouterGoNow() {
      return this.$store.state.routerGoNow;
    }
  },
  created() {
    this.created();
  },
  methods: {
    routerGoNow() {
      // this.$router.go(0)
      // console.log(2222)
      this.$store.state.routerGoNow = false;
      let timer = window.setInterval(() => {
        this.$store.state.routerGoNow = true;
        window.clearInterval(timer)
        // console.log(0)
      }, 0);
    },
    created() {
      this.isShow = true;
      const url = "http://10.25.24.51:10191/api/rest/nlp/risk/macro_index";
      this.$_axios.get(url, {}).then(response => {
        // 显示查询结果
        this.isShow = true;
        this.dataList = JSON.parse(JSON.stringify(response.data.result));
        this.dataList.forEach(item => {
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
.blackSwanBox {
  width: 1500px;
  height: 1000px;
}
.sidebarBox {
  float: left;
  width: 235px;
  // margin-top: 45px;
  margin-left: 50px;
  border: 1px solid #797979;
  li {
    width: 100%;
    height: 46px;
    line-height: 46px;
    text-align: center;
    border-bottom: 1px solid #797979;
    a {
      display: inline-block;
      width: 100%;
      height: 100%;
      color: #fff;
      text-decoration: none;
      background-color: #b50229;
    }
  }
  li:nth-last-child(1) {
    border-bottom: none;
  }
}
.content {
  float: left;
  width: 1180px;
  // margin-top: -310px;
  margin-left: 25px;
}
</style>
