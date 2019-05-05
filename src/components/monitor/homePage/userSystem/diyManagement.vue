<template>
  <div>
    <div>
      <div class="categroy clearFloat">
        <span v-for="(item, index) of sidebarTabData" @click="switchModule(item.module)" :class="{active: isShowModule == item.module}" :key="index">{{item.title}}</span>
      </div>
      <div class="poolBtnBox">
        <div v-if="isShowModule === 'user-defined'" class="clearFloat">
          <div class="topBtn floatLeft">
            <span @click="showAddBox(!isShowAddBox)" class="span">添加</span>
            <span @click="deleteModules" class="span">删除</span>
            <span @click="allCheck" class="span">全选</span>
            <span @click="reverseCheck" class="span">反选</span>
          </div>
          <div v-if="isShowAddBox" class="addBox floatLeft">
            <div class="floatLeft">
              <div>
                板块名称： <input @input="inputEvent" v-model="nowAddModuleName" type="text">
              </div>
              <div>
                <span @click="addModuleSubmit" class="span">提交</span>
                <span @click="showAddBox(false)" class="span">取消</span>
              </div>
            </div>
          </div>
          <div class="content floatLeft clearFloat">
            <div class="left floatLeft">
              <EasyScrollbar>
                <div style="height:518px">
                  <div>
                    <div>
                      <ul class="clearFloat">
                        <!-- searchResultList -->
                        <li v-for="(item, index) of modulesDataList" :key="index" class="floatLeft marginLeft10 marginTop5">
                          <span @click="moduleCheck(item)" class="checkIconBox span">
                            <i v-if="item.check" class="iconfont icon-queren"></i>
                          </span>
                          <!-- item.title -->
                          <span @click="moduleCheck(item)" class="moduleName span" :title="item.title">{{item.title}}</span>
                          <span @click="seeModule(item.title)" class="seeModule span">查看</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </EasyScrollbar>
            </div>
            <div v-if="isShowSeeModule" class="right floatLeft">
              <div class="top">
                <span>板块名称：</span>
                <input v-model="nowUpdateModuleName" @input="inputEvent" type="text" :placeholder="nowSeeModule">
                <span @click="updateModuleName" class="updateModuleName span">更新板块名</span>
                <span @click="isShowSeeModule = false" class="close span">×</span>
              </div>
              <div class="bottom">
                <span @click="emptyModulesInfo" class="span">清空</span>
                <span @click="deleteModulesInfo" class="span">删除</span>
              </div>
              <div>
                <EasyScrollbar>
                  <div style="height:430px;width:320px">
                    <div>
                      <div>
                        <table>
                          <tr>
                            <th v-for="(item, index) of seeModuleData.th" :key="index">{{item}}</th>
                          </tr>
                          <tr v-for="(item, index) of seeModuleData.tr" :key="index">
                            <td>
                              <div @click="moduleCheck(item)">
                                <span class="checkIconBox">
                                  <i v-if="item.check" class="iconfont icon-queren"></i>
                                </span>
                                {{item['证券代码']}}
                              </div>
                            </td>
                            <td>{{item['证券名称']}}</td>
                            <td>{{item['交易市场']}}</td>
                          </tr>
                        </table>
                      </div>
                    </div>
                  </div>
                </EasyScrollbar>

              </div>
            </div>
          </div>
        </div>
        <div v-else-if="isShowModule === 'securitiesImport'" class="securitiesImportBox">
          <div class="clearFloat">
            <div class="floatLeft">
              <pull-down-list :prop="selectImpotModule" @impotModuleEvent='impotModuleEvent'></pull-down-list>
            </div>
            <div class="floatLeft marginLeft20">
              <pull-down-list :prop="importWay" @importWayEvent='importWayEvent'></pull-down-list>
            </div>
          </div>
          <div class="securitiesImport">
            <div v-if="nowImportWay == '手工输入'" class="clearFloat">
              <div class="securitiesImportCondition floatLeft">
                <div class="marginLeft20 marginTop15">
                  <pull-down-list :prop="importWayType" @importWayTypeEvent='importWayTypeEvent'></pull-down-list>
                </div>
                <div class="floatLeft marginLeft20 marginTop15">
                  请在以下框内输入证券列表：
                </div>
                <div class="floatLeft marginLeft20 marginTop15">
                  <textarea :placeholder="placeholderList" v-model="textareaVlaue"></textarea>
                </div>
                <div class="floatLeft marginLeft20 marginTop15">
                  <span @click="ManualQueries" class="queryBtn">查询</span>
                </div>
              </div>
              <div class="securitiesImportResult floatLeft">
                <div class="marginLeft20 marginTop15 marginBottom15">
                  <span @click="addMatch" class="addCode">添加匹配代码</span>
                </div>
                <div class="marginTop15" style="height:530px">
                  <EasyScrollbar>
                    <div style="height:530px">
                      <div>
                        <div>
                          <table>
                            <tr>
                              <th v-for="(item, index) of securitiesImportResult.th" :key="index">{{item}}</th>
                            </tr>
                            <tr v-for="(item, index) of securitiesImportResult.tr" :key="index">
                              <td>
                                <span v-if="index === 0">匹配列表</span>
                                <span v-else></span>
                              </td>
                              <td>{{item.code}}</td>
                              <td>{{item.name}}</td>
                            </tr>
                            <tr v-for="(item, index) of securitiesImportResult.tr2" :key="index">
                              <td>
                                <span v-if="index === 0">未匹配列表</span>
                                <span v-else></span>
                              </td>
                              <td>{{item.code}}</td>
                              <td>{{item.name}}</td>
                            </tr>
                          </table>
                          <div class="matchcountBottom">
                            匹配代码列表
                            <span>{{securitiesImportResult.matchcountNumber}}</span> 条， 未匹配代码列表
                            <span>{{securitiesImportResult.unmatchlistNumber}}</span> 条
                          </div>
                        </div>
                      </div>
                    </div>
                  </EasyScrollbar>
                </div>
              </div>
            </div>
            <div v-else class="multiSelection">
              <div class="clearFloat">
                <div class="floatLeft marginLeft20 marginTop15">
                  <pull-down-list :prop="importWayType" @importWayTypeEvent='importWayTypeEvent'></pull-down-list>
                </div>
                <div class="floatLeft marginLeft20 marginTop15">
                  关键字：<input @input="inputEvent" v-model="keyword" type="text">
                </div>
                <div class="searchBtn floatLeft marginLeft20">
                  <span @click="search">搜索</span>
                </div>
                <div class="searchBtn floatLeft marginLeft20">
                  <span @click="addToModule">添加至板块</span>
                </div>
                <div class="searchBtn floatLeft marginLeft20">
                  <span @click="cancelToModule">取消</span>
                </div>
              </div>
              <div class="searchResulBox">
                <EasyScrollbar>
                  <div style="height: 560px">
                    <div>
                      <div v-show="isShowsearchResultList">
                        <div v-if="hasSearchResultList">
                          <ul class="clearFloat">
                            <li v-for="(item, index) of searchResultList" :key="index" @click="moduleCheck(item)" :class="{oneLine: oneLine}" class="floatLeft searchResultList">
                              <span class="checkIconBox">
                                <i v-if="item.check" class="iconfont icon-queren"></i>
                              </span>
                              <span class="marginTop5 marginLeft3">{{item.code}}</span>
                              <span class="marginTop2 marginLeft3">{{item.name}}</span>
                            </li>
                          </ul>
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
                </EasyScrollbar>
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
import pullDownList from '@/components/common/pullDownList'
import pagination from '@/components/common/pagination'
export default {
  data() {
    return {
      myBarOption: {
        barColor: "red"
      },
      isShowModule: 'user-defined',
      isShowAddBox: false,
      oneLine: false,
      isShowSeeModule: false,
      nowTabIndex: 0,
      nowAddModuleName: '',
      placeholderList: '例如：\n000000\n000001\n000002',
      textareaVlaue: '',
      sidebarTabData: [
        { module: 'user-defined', title: '自定义板块管理' },
        { module: 'securitiesImport', title: '证券导入' },
      ],
      paginationData: {
        parentEvent: 'paginationSelect',
        page_Count: 0,
        total_Count: 0,
        current: 1
      },
      modulesDataList: [],
      seeModuleData: {
        th: ['证券代码', '证券名称', '交易市场'],
        tr: [
          // {证券代码: '835364', 证券名称: '德善药业', 交易市场: '交易市场a'}
        ]
      },
      impotModuleName: '',
      selectImpotModule: {
        title: '请选择要导入的板块：',
        parentEvent: 'impotModuleEvent',
        default: '请选择',
        listWidth: 143,
        nowSelectWidth: 145,
        nowSelectHeight: 25,
        nowSelectFontSize: 13,
        list: [
          '板块一',
          '板块二'
        ]
      },
      nowSeeModule: '',
      nowUpdateModuleName: '',
      nowImportWay: '手工输入',
      importWay: {
        title: '导入方式：',
        parentEvent: 'importWayEvent',
        default: '手工输入',
        listWidth: 143,
        nowSelectWidth: 145,
        nowSelectHeight: 25,
        nowSelectFontSize: 13,
        list: [
          '手工输入',
          '多项选择'
        ]
      },
      importWayType: {
        title: '类型：',
        parentEvent: 'importWayTypeEvent',
        default: '股票',
        listWidth: 143,
        nowSelectWidth: 145,
        nowSelectHeight: 25,
        nowSelectFontSize: 13,
        list: [
          '股票',
          '债券',
          '基金',
          '新三板',
        ]
      },
      codetype: 'S',
      securitiesImportResult: {
        th: ['类型', '证券代码', '证券名称'],
        tr: [
          // {title: '匹配列表', code: '835364', name: '德善药业'},
        ],
        tr2: [],
        matchcountNumber: 0,
        unmatchcountNumber: 0
      },
      keyword: '',
      isShowsearchResultList: false,
      hasSearchResultList: false,
      searchResultList: [
        // {name: '大成基金大成基金', check: false},
        // {name: '大成基金大成基金', check: false},
        // {name: '大成基金大成基金', check: false},
      ]
    }
  },
  components: {
    pullDownList,
    pagination,
  },
  methods: {
    // 关闭
    closePage() {
      this.$store.state.isShowUserSystem = false;
    },
    // 切换tab
    switchModule(nowModule) {
      this.isShowModule = nowModule;
      if (nowModule !== 'user-defined') {
        this.nowImportWay = '手工输入';
        this.impotModuleName = '';
        this.moduleInit();
        console.log(this.modulesDataList)
        this.selectImpotModule.list = this.modulesDataList.map(item => {
          return item.title;
        });
      } else {
        this.nowSeeModule = '';
      }
    },
    // 显示添加模块Box
    showAddBox(flag) {
      this.isShowAddBox = flag;
      if (!flag) {
        this.nowAddModuleName = '';
      }
    },
    inputEvent() {
      this.nowAddModuleName = this.checkName(this.nowAddModuleName.trim());
      this.nowUpdateModuleName = this.checkName(this.nowUpdateModuleName.trim());
      this.keyword = this.checkName(this.keyword.trim());
    },
    // 添加模块提交
    addModuleSubmit() {
      console.log('提交')
      // this.nowAddModuleName
      if (!this.nowAddModuleName) return;
      const url = 'http://10.25.24.51:10189/api/risk/sector_set/insert'
      const sendData = {
        userid: 'risk',
        sectorname: this.nowAddModuleName
      }
      this.$_axios.get(url, {
        params: sendData
      }).then((response) => {
        if (response.data.msg === 'insert success' && response.data.code == '0') {
          this.nowAddModuleName = '';
          // 重新渲染已有板块
          this.moduleInit();
          alert('添加成功');
          this.isShowAddBox = false;
        }
      }).catch((err) => {

      });
    },
    // 删除模块
    deleteModules() {
      const url = 'http://10.25.24.51:10189/api/risk/sector_set/delete'
      const tempArr = [];
      this.modulesDataList.map(item => {
        if (item.check) {
          tempArr.push(item.title);
        }
      });
      const sendData = {
        userid: 'risk',
        sectorname: tempArr.join(',')
      }
      if (!tempArr.length) {
        alert('没有选择要删除的模块');
        return;
      }
      console.log(tempArr.join(','))
      this.$_axios.get(url, {
        params: sendData
      }).then((response) => {
        if (response.data.code == '0' && response.data.msg == 'delete success') {
          alert('删除成功')
          // 重新渲染已有板块
          this.moduleInit();
        }
      }).catch((err) => {

      });
    },
    // 选择模块
    moduleCheck(item) {
      item.check = !item.check;
    },
    // 全选模块
    allCheck() {
      this.modulesDataList.forEach(item => {
        item.check = true;
      });
    },
    // 反选模块
    reverseCheck() {
      this.modulesDataList.forEach(item => {
        item.check = !item.check;
      });
    },
    // 查看板块
    seeModule(modulename) {
      const url = 'http://10.25.24.51:10189/api/risk/sector_set/detail'
      const sendData = {
        userid: 'risk',
        action: 'query',
        sector: modulename,
      }
      this.isShowSeeModule = true;
      // this.nowSeeModule = '';
      this.$_axios.get(url, {
        params: sendData
      }).then((response) => {
        console.log(response.data)
        this.nowSeeModule = modulename;
        if (response.data.code == '0' && response.data.msg == 'query success') {
          this.seeModuleData.tr = response.data.result.result.map(item => {
            const tempItem = JSON.parse(JSON.stringify(item));
            tempItem.check = false;
            return tempItem;
          });
        }
        console.log(this.seeModuleData.tr)
      }).catch((err) => {

      });
    },
    // 更新板块名
    updateModuleName() {
      // this.nowUpdateModuleName
      // if (!this.nowSeeModule || !this.nowUpdateModuleName) return;
      if (this.nowUpdateModuleName == "") {
        alert("请输入板块名");
      }
      else {
        const url = 'http://10.25.24.51:10189/api/risk/sector_set/detail'
        const sendData = {
          userid: 'risk',
          action: 'update',
          sector: this.nowSeeModule,
          new_sector: this.nowUpdateModuleName
        }
        console.log('sendData', sendData)
        this.$_axios.get(url, {
          params: sendData
        }).then((response) => {
          console.log(response.data)
          if (response.data.code == '0') {
            this.nowSeeModule = this.nowUpdateModuleName;
            this.nowUpdateModuleName = '';
            this.moduleInit();
          }
        }).catch((err) => {

        });
      }
    },
    // 清空板块信息
    emptyModulesInfo() {
      if (!this.nowSeeModule) return;
      const url = 'http://10.25.24.51:10189/api/risk/sector_set/detail'
      const sendData = {
        userid: 'risk',
        action: 'drop',
        sector: this.nowSeeModule,
      }
      console.log('sendData', sendData)
      this.$_axios.get(url, {
        params: sendData
      }).then((response) => {
        console.log(response.data)
        if (response.data.code == '0') {
          alert('清空成功')
          this.moduleInit();
          this.seeModule(this.nowSeeModule);
          this.isShowSeeModule = false;
        }
      }).catch((err) => {

      });
    },
    // 删除板块信息
    deleteModulesInfo() {
      if (!this.nowSeeModule) return;
      const url = 'http://10.25.24.51:10189/api/risk/sector_set/detail'
      const tempArr = [];
      this.seeModuleData.tr.forEach(item => {
        if (item.check) {
          tempArr.push(item['证券代码']);
        }
      });
      console.log(tempArr.join(','))
      if (!tempArr.join(',')) return;
      const sendData = {
        userid: 'risk',
        action: 'delete',
        sector: this.nowSeeModule,
        seccodes: tempArr.join(',')
      }
      console.log('sendData', sendData)
      this.$_axios.get(url, {
        params: sendData
      }).then((response) => {
        console.log(response.data)
        if (response.data.code == '0') {
          alert('删除成功')
          this.seeModule(this.nowSeeModule);
        }
      }).catch((err) => {

      });
    },
    // 手动选择查询
    ManualQueries() {
      const codelist = this.textareaVlaue.split('\n');
      const tempArr = [];
      codelist.forEach(item => {
        if (item) {
          tempArr.push(item);
        }
      });
      if (!tempArr.length) {
        alert('请输入证券列表');
        return;
      }
      const url = 'http://10.25.24.51:10189/api/risk/code_import/hand'
      const sendData = {
        codetype: this.codetype,
        action: 'query',
        codelist: tempArr.join(',')
      };
      // return
      console.log(sendData)
      this.$_axios.get(url, {
        params: sendData
      }).then((response) => {
        console.log(response.data)
        if (response.data.code == '0') {
          this.securitiesImportResult.tr = response.data.result.matchlist.map(item => {
            return {
              code: item.securitycode,
              name: item.securityname,
            }
          });
          this.securitiesImportResult.tr2 = response.data.result.unmatchlist.map(item => {
            return {
              code: item
            }
          });
          this.securitiesImportResult.matchcountNumber = response.data.result.matchcount.matchcount;
          this.securitiesImportResult.unmatchlistNumber = response.data.result.matchcount.unmatchcount;
        }
      }).catch((err) => {

      });
    },
    // 多项选择-搜索
    search() {
      const url = 'http://10.25.24.51:10189/api/risk/code_import/choose'
      const sendData = {
        action: 'query',
        codetype: this.codetype,
        keyword: this.keyword,
        page: 0,
        pagesize: 4000,
      };
      this.oneLine = false;
      this.searchSendData = JSON.parse(JSON.stringify(sendData));
      this.isShowsearchResultList = true;
      this.hasSearchResultList = false;
      this.paginationData.current = 1;
      this.$_axios.get(url, {
        params: this.searchSendData
      }).then((response) => {
        if (this.codetype == 'B' || this.codetype == 'F') {
          this.oneLine = true;
        }
        const resultData = response.data;
        if (resultData.code == '0' && resultData.msg == 'query success') {
          this.hasSearchResultList = true;
          if (resultData.result.totalcount) {
            this.paginationData.page_Count = Math.ceil(resultData.result.totalcount / 4000);
          } else {
            this.paginationData.page_Count = 0;
          }
          this.paginationData.total_Count = resultData.result.totalcount;
          this.searchResultList = resultData.result.securitylist.map(item => {
            return {
              check: false,
              name: item.securityname,
              code: item.securitycode
            }
          });
        } else if (resultData.code == '1') {

        }
      }).catch((err) => {

      });
    },
    // 多项选择-搜索-分页
    paginationSelect(pageNumber) {
      const url = 'http://10.25.24.51:10189/api/risk/code_import/choose'
      this.searchSendData.page = pageNumber - 1;
      this.isShowsearchResultList = true;
      this.hasSearchResultList = false;
      this.paginationData.current = pageNumber;
      this.$_axios.get(url, {
        params: this.searchSendData
      }).then((response) => {
        const resultData = response.data;
        if (resultData.code == '0' && resultData.msg == 'query success') {
          this.hasSearchResultList = true;
          this.searchResultList = resultData.result.securitylist.map(item => {
            return {
              check: false,
              name: item.securityname,
              code: item.securitycode
            }
          });
        } else if (resultData.code == '1') {

        }
      }).catch((err) => {

      });
    },
    // 添加至板块-取消
    cancelToModule() {
      this.searchResultList.forEach(item => {
        item.check = false;
      });
    },
    // 添加至板块
    addToModule() {
      if (!this.impotModuleName) {
        alert('请选择要导入的板块');
        return;
      }
      const codelist = [];
      this.searchResultList.forEach(item => {
        if (item.check) {
          codelist.push(item.code);
        }
      });
      if (!codelist.length) {
        alert('未选择代码');
        return;
      }
      const url = 'http://10.25.24.51:10189/api/risk/code_import/choose'
      const sendData = {
        userid: 'risk',
        action: 'insert',
        codetype: this.codetype,
        sector: this.impotModuleName,
        codelist: codelist.join(',')
      };
      this.$_axios.get(url, {
        params: sendData
      }).then((response) => {
        if (response.data.code == '0') {
          alert('添加成功');
        } else if (response.data.code == '1') {
          alert('添加失败');
        }
      }).catch((err) => {
        alert('查询请求服务失败');
      });
    },
    // 添加匹配代码
    addMatch() {
      if (!this.impotModuleName) {
        alert('请选择要导入的板块');
        return;
      }
      const url = 'http://10.25.24.51:10189/api/risk/code_import/hand'
      const codelist = this.securitiesImportResult.tr.map(item => {
        return item.code;
      });
      if (!codelist.length) {
        alert('没有匹配代码');
        return;
      }
      const sendData = {
        action: 'insert',
        userid: 'risk',
        codetype: this.codetype,
        codelist: codelist.join(','),
        sector: this.impotModuleName
      };
      this.$_axios.get(url, {
        params: sendData
      }).then((response) => {
        if (response.data.code == '0') {
          alert('添加成功');
        } else if (response.data.code == '1') {
          alert('添加失败');
        } else if (response.data.code == '2' && response.data.msg == 'already exists the record') {
          alert('重复添加');
        }
      }).catch((err) => {
        alert('添加失败');
      });
    },
    importWayEvent(...data) {
      console.log(data[0])
      if (this.nowImportWay !== data[0]) {
        this.nowImportWay = data[0];
        console.log(this.codetype)
        // this.codetype = 'S';
        // console.log(this.codetype)
      }
    },
    impotModuleEvent(...data) {
      this.impotModuleName = data[0];
    },
    // 类型
    importWayTypeEvent(...data) {
      switch (data[0]) {
        case '股票':
          this.codetype = 'S';
          break;
        case '债券':
          this.codetype = 'B';
          break;
        case '基金':
          this.codetype = 'F';
          break;
        case '新三板':
          this.codetype = 'N';
          break;
      }
    },
    moduleInit() {
      const url = 'http://10.25.24.51:10189/api/risk/sector_set/query'
      const sendData = {
        userid: 'risk'
      };
      console.log('查询')
      this.$_axios.get(url, {
        params: sendData
      }).then((response) => {
        console.log('查询结果', response.data)
        if (!response.data) {
          this.modulesDataList = [];
        } else {
          if (response.data.code == '0') {
            console.log(response.data.sectorlist)
            this.modulesDataList = response.data.sectorlist.map(item => {
              return {
                title: item,
                check: false
              }
            });
          } else {
            this.modulesDataList = [];
          }
        }
      }).catch((err) => {

      });
    },
    checkName(val) {
      // let reg = new RegExp("[`~!%@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
      let reg = new RegExp("[`~!%@#$^&=|''\\[\\]<>/?~@#……&*——|']");
      let rs = "";
      for (let i = 0, l = val.length; i < val.length; i++) {
        rs = rs + val.substr(i, 1).replace(reg, '');
      }
      return rs;
    }
  },
  mounted() {
    this.moduleInit();
  }
}
</script>

<style lang="less" scoped>
.addBox {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 1px solid #797979;
  line-height: 25px;
  z-index: 4;
  > div {
    position: fixed;
    top: 60%;
    left: 29%;
    width: 400px;
    height: 100px;
    z-index: 5;
    > div {
      width: 215px;
      height: 50%;
      margin: 7px auto;
    }
  }
  input {
    width: 140px;
    height: 25px;
    border: 1px solid #797979;
  }
  span {
    padding: 5px 20px;
    margin-left: 28px;
    cursor: pointer;
    border: 1px solid #797979;
    border-radius: 5px;
  }
}

.securitiesImport {
  width: 980px;
  height: 620px;
  margin-top: 20px;
  border: 1px solid #797979;
  .securitiesImportCondition {
    width: 300px;
    textarea {
      width: 248px;
      height: 460px;
      resize: none;
      outline: none;
      border: 1px solid #797979;
    }
    .queryBtn {
      margin-left: 90px;
      padding: 5px 20px;
      cursor: pointer;
      border: 1px solid #797979;
      border-radius: 5px;
      background-color: #eaeaea;
    }
  }
  .securitiesImportResult {
    .addCode {
      margin-left: 90px;
      margin-bottom: 15px;
      padding: 5px 20px;
      cursor: pointer;
      border: 1px solid #797979;
      border-radius: 5px;
      background-color: #eaeaea;
    }
    .matchcountBottom {
      text-align: center;
      border: 1px solid #797979;
      border-top: none;
    }
    table {
      margin-left: 1px;
      margin-top: 10px;
      border: 1px solid #797979;
      border-collapse: collapse;
      word-wrap: break-word;
      word-break: break-all;
      th {
        height: 40px;
        width: 106px;
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
    }
  }
  .multiSelection {
    input {
      width: 150px;
      height: 25px;
      line-height: 25px;
      border: 1px solid #797979;
    }
    .searchBtn {
      margin-top: 17px;
      span {
        padding: 3px 25px;
        cursor: pointer;
        background-color: #eaeaea;
        border: 1px solid #797979;
      }
    }
    .searchResulBox {
      margin-top: 15px;
      height: 560px;
      width: 978px;
      overflow: hidden;
      .searchResultList.oneLine {
        width: 960px;
        > span:nth-child(3) {
          width: 800px;
        }
      }
      .searchResultList {
        width: 242px;
        height: 36px;
        cursor: pointer;
        span {
          float: left;
        }
        > span:nth-child(3) {
          width: 140px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .checkIconBox {
          position: relative;
          display: inline-block;
          width: 10px;
          height: 10px;
          margin-top: 8px;
          border: 1px solid #797979;
          overflow: hidden;
          .icon-queren {
            position: absolute;
            top: -2px;
            left: -8px;
          }
        }
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
.span {
  cursor: pointer;
  padding: 6px;
  margin-left: 20px;
  border: 1px solid #797979;
  border-radius: 5px;
}
.poolBtnBox {
  margin-top: 40px;
}

.content {
  width: 990px;
  height: 520px;
  margin-top: 20px;
  border: 1px solid #797979;
  .left {
    width: 666px;
    height: 100%;
    border-right: 1px solid #797979;
    li {
      span {
        float: left;
        cursor: pointer;
      }
      .checkIconBox {
        position: relative;
        width: 10px;
        height: 10px;
        margin-top: 8px;
        border: 1px solid #797979;
        overflow: hidden;
        .icon-queren {
          position: absolute;
          top: -1px;
          left: -6px;
        }
      }
      .moduleName {
        width: 155px;
        padding: 5px 0;
        margin-left: 5px;
        text-align: center;
        border: 1px solid #797979;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .seeModule {
        margin-left: 2px;
        padding: 3px;
        border: 1px solid #797979;
        border-radius: 5px;
      }
    }
  }
  .right {
    .top {
      padding-top: 5px;
      input {
        width: 120px;
        height: 25px;
        border: 1px solid #797979;
      }
      span {
        margin-left: 5px;
      }
      .close,
      .updateModuleName {
        padding: 5px;
        cursor: pointer;
        background-color: #eaeaea;
        border: 1px solid #797979;
      }
    }
    table {
      margin-left: 1px;
      margin-top: 10px;
      width: 318px;
      table-layout: fixed;
      border: 1px solid #797979;
      border-collapse: collapse;
      word-wrap: break-word;
      word-break: break-all;
      th {
        height: 40px;
        width: 106px;
        line-height: 40px;
        border: 1px solid #797979;
        background-color: #f0f5f9;
      }
      tr {
        overflow: hidden;
        border: 1px solid #797979;
      }
      td {
        width: 106px;
        text-align: center;
        vertical-align: middle;
        border: 1px solid #797979;
        div {
          cursor: pointer;
        }
        .checkIconBox {
          position: relative;
          display: inline-block;
          width: 10px;
          height: 10px;
          margin-top: 8px;
          border: 1px solid #797979;
          overflow: hidden;
          .icon-queren {
            position: absolute;
            top: -2px;
            left: -8px;
          }
        }
      }
    }
    .bottom {
      margin-left: 60px;
      margin-top: 20px;
      span {
        margin-left: 20px;
        padding: 5px 20px;
        border: 1px solid #797979;
        border-radius: 5px;
        cursor: pointer;
        background-color: #eaeaea;
      }
    }
  }
}
</style>



