<template>
  <div>
    <div>
      <div class="categroy clearFloat">
        <span v-for="(item, index) of categroyList" :key="index" @click="categroyCheck(item, index)" :class="{active: index === categroyIndex}">{{item}}</span>
      </div>
      <div v-show="nowCategroy === ''">
        <div class="queryConditionBox clearFloat">
          <div class="clearFloat">
            <div class="floatLeft">
              <date-picker :prop="startDatePicker" @startDateEvent="startDateEvent"></date-picker>
            </div>
            <div class="floatLeft marginLeft10">
              <date-picker :prop="endDatePicker" @endDateEvent="endDateEvent"></date-picker>
            </div>
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
          <div class="clearFloat">
            <div @click="checkRiskType" class="checkBox floatLeft marginTop10">
              <span class="iconBox">
                <i v-show="isShowTypeList" class="dot"></i>
              </span>
              <span class="marginLeft20">选择风险类别</span>
            </div>
            <!-- <div class="floatLeft marginTop10">
              <pull-down-list :prop="legislationList" @legislationEvent='legislationEvent'></pull-down-list>
            </div> -->
            <div class="checkBox floatLeft marginLeft20 marginTop10">
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
          <div class="clearFloat marginTop10">
            <div class="uploadFiles">
              <label for="fileExport">上传文件(csv、txt)等
                <span class="fileExportBtn">{{selectFileName}}</span>
              </label>
              <span v-if="selectFileName !== '选择文件'" @click="clearFile" class="clearFile">清除文件</span>
              <input type="file" id="fileExport" @change="handleFileChange($event)" ref="inputer">
            </div>
            <div class="floatLeft marginLeft20">
              <pull-down-list :prop="selectList" @selectListEvent='selectListEvent'></pull-down-list>
            </div>
            <!-- 自定义模块 -->
            <div class="floatLeft" v-show="isshowmodulesname">
              <pull-down-list :prop="modulesNameList" @modulesNameEvent='modulesNameEvent'></pull-down-list>
            </div>
            <div class="enshrineBox">
              <!-- <span><i class="iconfont icon-star"></i> 加入收藏夹</span> -->
              <span class="marginLeft85">
                <!-- @click="openAttentionPool" -->
                <!-- <router-link to="/attentionPoolSet">
                  <i>@</i>
                  添加重点关注池
                </router-link> -->
              </span>
            </div>
          </div>
          <div @click="queryType" class="queryBtn">查询</div>
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
                  <th v-for="(item, index) of titleData" :key="index" width:100px>{{item}}</th>
                </tr>
                <tr v-for="(item, index) of dataList" :key="index">
                  <td>{{item.RELATECODE || ""}}</td>
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
                    <div class="floatLeft">
                      <!-- <pull-down-list :prop="risk_typeList" @legislationEvent='legislationEvent'></pull-down-list>
                      
                    <div @click="yesBtn()" class="queryBtn mtt">确定</div> -->
                      <select class="form-control" style="width:100px;" v-model="item.risk_code">
                        <!-- <option value="">无</option> -->
                        <option v-for="s in risk_codeList" :value="s.code" :key="s.code">{{s.title}}</option>
                      </select>
                      <button type="button" @click="saveItem(item)" class="btn btn-default">确定</button>
                    </div>
                    <!-- <div @click="cancelBtn()" class="queryBtn mtt">取消</div> -->
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
                      <!-- <div v-else-if="item.starNumber === 2">
                          <span class="iconfont icon-xingxing"></span>
                        </div>
                        <div>
                          <span v-for="secondItem of dataList[index].starNumber" :key="secondItem" class="iconfont icon-xingxing"></span>
                        </div> -->
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
                  <!-- <td>
                      <span @click="update" class="updateBtn">确认更新</span>
                    </td> -->
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
      <div v-show="nowCategroy === 1">
        <div class="queryConditionBox clearFloat">
          <div class="clearFloat">
            <div class="floatLeft">
              <date-picker :prop="startDatePicker1" @startDateEvent1="startDateEvent1"></date-picker>
            </div>
            <div class="floatLeft marginLeft10">
              <date-picker :prop="endDatePicker1" @endDateEvent1="endDateEvent1"></date-picker>
            </div>
            <div class="nowConditionStarBox floatLeft marginLeft10">
              <div class="floatLeft">
                重要性：
              </div>
              <div class="starBg condition floatLeft">
                <span @click="conditionStar(item)" v-for="item of starNumber" :key="item" class="iconfont icon-star"></span>
              </div>
              <div class="nowConditionStar">
                <span v-for="item of conditionStarNumber1" :key="item" class="iconfont icon-xingxing"></span>
              </div>
            </div>
          </div>
          <div class="clearFloat">
            <!-- <div class="floatLeft marginTop10">
              <pull-down-list :prop="legislationList1" @legislationEvent1='legislationEvent1'></pull-down-list>
            </div> -->
            <div @click="checkRiskType" class="checkBox floatLeft marginTop10">
              <span class="iconBox">
                <i v-show="isShowTypeList1" class="dot"></i>
              </span>
              <span class="marginLeft20">选择风险类别</span>
            </div>
            <div class="checkBox floatLeft marginLeft20 marginTop10">
              <!-- @click="checkFinished" -->
              <!-- <span class="iconBox">
                <i v-show="isFinished" class="dot"></i>
              </span> -->
              <span class="marginLeft20">是否处理：</span>
              <span @click="checkFinished(true)">
                是
                <span class="iconBox">
                  <i v-show="isFinished1" class="dot"></i>
                </span>
              </span>
              <span @click="checkFinished(false)">
                否
                <span class="iconBox">
                  <i v-show="!isFinished1" class="dot"></i>
                </span>
              </span>
            </div>
          </div>
          <div class="clearFloat marginLeft20 marginTop10">
            <div class="uploadFiles">
              <label for="fileExport">上传文件(csv、txt)等
                <span class="fileExportBtn">{{selectFileName1}}</span>
              </label>
              <span v-if="selectFileName1 !== '选择文件'" @click="clearFile" class="clearFile">清除文件</span>
              <input type="file" id="fileExport" @change="handleFileChange($event)" ref="inputer2">
            </div>
            <div class="floatLeft marginLeft20">
              <pull-down-list :prop="selectList" @selectListEvent='selectListEvent'></pull-down-list>
            </div>
            <!-- 自定义模块 -->
            <div class="floatLeft" v-show="isshowmodulesname">
              <pull-down-list :prop="modulesNameList" @modulesNameEvent='modulesNameEvent'></pull-down-list>
            </div>
            <div class="enshrineBox">
              <!-- <span><i class="iconfont icon-star"></i> 加入收藏夹</span> -->
              <span class="marginLeft85">
                <!-- @click="openAttentionPool" -->
                <!-- <router-link to="/attentionPoolSet">
                  <i>@</i>
                  添加重点关注池
                </router-link> -->
              </span>
            </div>
          </div>
          <div @click="queryType" class="queryBtn">查询</div>
        </div>
        <!-- 风险类型选择 -->
        <div v-if="isShowTypeList1 && isShowTypeBox1" class="typeBox clearFloat">
          <div class="firstTypeBox">
            <ul class="clearFloat">
              <li v-for="(item,index) of firstTypeList1" :key="index" @click="checkFirstType(item,index)">
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
              <li v-for="(item,index) of secondTypeList1" :key="index" class="clearFloat">
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
        <div v-if="isShowQueryResult1" class="queryResult">
          <div v-if="hasResultData1">
            <table>
              <tbody>
                <tr>
                  <th v-for="(item, index) of titleData" :key="index" width:100px>{{item}}</th>
                </tr>
                <tr v-for="(item, index) of dataList1" :key="index">
                  <td>{{item.RELATECODE || ""}}</td>
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
                    <div class="floatLeft">
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
                      <!-- <div v-else-if="item.starNumber === 2">
                          <span class="iconfont icon-xingxing"></span>
                        </div>
                        <div>
                          <span v-for="secondItem of dataList[index].starNumber" :key="secondItem" class="iconfont icon-xingxing"></span>
                        </div> -->
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
                  <!-- <td>
                      <span @click="update" class="updateBtn">确认更新</span>
                    </td> -->
                </tr>
              </tbody>
            </table>
            <pagination :prop="paginationData1" @paginationSelect1="paginationSelect1"></pagination>
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
        <div class="queryConditionBox clearFloat">
          <div class="clearFloat">
            <div class="floatLeft">
              <date-picker :prop="startDatePicker2" @startDateEvent2="startDateEvent2"></date-picker>
            </div>
            <div class="floatLeft marginLeft10">
              <date-picker :prop="endDatePicker2" @endDateEvent2="endDateEvent2"></date-picker>
            </div>
            <div class="nowConditionStarBox floatLeft marginLeft10">
              <div class="floatLeft">
                重要性：
              </div>
              <div class="starBg condition floatLeft">
                <span @click="conditionStar(item)" v-for="item of starNumber" :key="item" class="iconfont icon-star"></span>
              </div>
              <div class="nowConditionStar">
                <span v-for="item of conditionStarNumber2" :key="item" class="iconfont icon-xingxing"></span>
              </div>
            </div>
          </div>
          <div class="clearFloat">
            <!-- <div class="floatLeft marginTop10">
              <pull-down-list :prop="legislationList2" @legislationEvent2='legislationEvent2'></pull-down-list>
            </div> -->
            <div @click="checkRiskType" class="checkBox floatLeft marginTop10">
              <span class="iconBox">
                <i v-show="isShowTypeList2" class="dot"></i>
              </span>
              <span class="marginLeft20">选择风险类别</span>
            </div>
            <div class="checkBox floatLeft marginLeft20 marginTop10">
              <!-- @click="checkFinished" -->
              <!-- <span class="iconBox">
                <i v-show="isFinished" class="dot"></i>
              </span> -->
              <span class="marginLeft20">是否处理：</span>
              <span @click="checkFinished(true)">
                是
                <span class="iconBox">
                  <i v-show="isFinished2" class="dot"></i>
                </span>
              </span>
              <span @click="checkFinished(false)">
                否
                <span class="iconBox">
                  <i v-show="!isFinished2" class="dot"></i>
                </span>
              </span>
            </div>
          </div>
          <div class="clearFloat tarword marginTop10">
            <div class="uploadFiles">
              <label for="fileExport">上传文件(csv、txt)等
                <span class="fileExportBtn">{{selectFileName2}}</span>
              </label>
              <span v-if="selectFileName2 !== '选择文件'" @click="clearFile" class="clearFile">清除文件</span>
              <input type="file" id="fileExport" @change="handleFileChange($event)" ref="inputer3">
            </div>
            <div class="floatLeft marginLeft20">
              <pull-down-list :prop="selectList" @selectListEvent='selectListEvent'></pull-down-list>
            </div>
            <!-- 自定义模块 -->
            <div class="floatLeft" v-show="isshowmodulesname">
              <pull-down-list :prop="modulesNameList" @modulesNameEvent='modulesNameEvent'></pull-down-list>
            </div>
            <div class="enshrineBox">
              <!-- <span><i class="iconfont icon-star"></i> 加入收藏夹</span> -->
              <span class="marginLeft85">
                <!-- @click="openAttentionPool" -->
                <!-- <router-link to="/attentionPoolSet">
                  <i>@</i>
                  添加重点关注池
                </router-link> -->
              </span>
            </div>
          </div>
          <div @click="queryType" class="queryBtn">查询</div>
        </div>
        <!-- 风险类型选择 -->
        <div v-if="isShowTypeList2 && isShowTypeBox2" class="typeBox clearFloat">
          <div class="firstTypeBox">
            <ul class="clearFloat">
              <li v-for="(item,index) of firstTypeList2" :key="index" @click="checkFirstType(item,index)">
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
              <li v-for="(item,index) of secondTypeList2" :key="index" class="clearFloat">
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
        <div v-if="isShowQueryResult2" class="queryResult">
          <div v-if="hasResultData2">
            <table>
              <tbody>
                <tr>
                  <th v-for="(item, index) of titleData" :key="index" width:100px>{{item}}</th>
                </tr>
                <tr v-for="(item, index) of dataList2" :key="index">
                  <td>{{item.RELATECODE || ""}}</td>
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
                    <div class="floatLeft">
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
                      <!-- <div v-else-if="item.starNumber === 2">
                          <span class="iconfont icon-xingxing"></span>
                        </div>
                        <div>
                          <span v-for="secondItem of dataList[index].starNumber" :key="secondItem" class="iconfont icon-xingxing"></span>
                        </div> -->
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
                  <!-- <td>
                      <span @click="update" class="updateBtn">确认更新</span>
                    </td> -->
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
      <div v-show="nowCategroy === 3">
        <div class="queryConditionBox clearFloat height">
          <div class="clearFloat">
            <div class="floatLeft">
              <date-picker :prop="startDatePicker3" @startDateEvent3="startDateEvent3"></date-picker>
            </div>
            <div class="floatLeft marginLeft10">
              <date-picker :prop="endDatePicker3" @endDateEvent3="endDateEvent3"></date-picker>
            </div>
            <div class="nowConditionStarBox floatLeft marginLeft10">
              <div class="floatLeft">
                重要性：
              </div>
              <div class="starBg condition floatLeft">
                <span @click="conditionStar(item)" v-for="item of starNumber" :key="item" class="iconfont icon-star"></span>
              </div>
              <div class="nowConditionStar">
                <span v-for="item of conditionStarNumber3" :key="item" class="iconfont icon-xingxing"></span>
              </div>
            </div>
          </div>
          <div class="clearFloat">
            <!-- <div class="floatLeft marginTop10">
              <pull-down-list :prop="legislationList2" @legislationEvent2='legislationEvent2'></pull-down-list>
            </div> -->
            <div @click="checkRiskType" class="checkBox floatLeft marginTop10">
              <span class="iconBox">
                <i v-show="isShowTypeList3" class="dot"></i>
              </span>
              <span class="marginLeft20">选择风险类别</span>
            </div>
            <div class="checkBox floatLeft marginLeft20 marginTop10">
              <!-- @click="checkFinished" -->
              <!-- <span class="iconBox">
                <i v-show="isFinished" class="dot"></i>
              </span> -->
              <span class="marginLeft20">是否处理：</span>
              <span @click="checkFinished(true)">
                是
                <span class="iconBox">
                  <i v-show="isFinished3" class="dot"></i>
                </span>
              </span>
              <span @click="checkFinished(false)">
                否
                <span class="iconBox">
                  <i v-show="!isFinished3" class="dot"></i>
                </span>
              </span>

            </div>
          </div>
          <div class="clearFloat marginTop10">
            <div>
              关键字：
              <input type="text" placeholder="请输入" class="input" v-model="keyword" onkeyup="this.value=this.value.replace(/^ +| +$/g,'')">
            </div>
          </div>
          <div class="clearFloat marginTop10">
            <div class="uploadFiles">
              <label for="fileExport">上传文件(csv、txt)等
                <span class="fileExportBtn">{{selectFileName3}}</span>
              </label>
              <span v-if="selectFileName3 !== '选择文件'" @click="clearFile" class="clearFile">清除文件</span>
              <input type="file" id="fileExport" @change="handleFileChange($event)" ref="inputer3">
            </div>
            <div class="enshrineBox">
              <!-- <span><i class="iconfont icon-star"></i> 加入收藏夹</span> -->
              <span class="marginLeft85">
                <!-- @click="openAttentionPool" -->
                <!-- <router-link to="/attentionPoolSet">
                  <i>@</i>
                  添加重点关注池
                </router-link> -->
              </span>
            </div>
            <div class="ml20">
              证券代码
              <input type="text" placeholder="请输入" class="input" v-model="stock_code" onkeyup="this.value=this.value.replace(/^ +| +$/g,'')">
            </div>
            <!-- <div @click="query2" class="yesBtn">确定</div> -->
          </div>
          <div @click="query2" class="queryBtn">查询</div>
          <div class="codespan" v-show="codeshow">已识别证券代码：
            <span>{{stock_codetext}}</span>
          </div>
        </div>
        <!-- 风险类型选择 -->
        <div v-if="isShowTypeList3 && isShowTypeBox3" class="typeBox clearFloat">
          <div class="firstTypeBox">
            <ul class="clearFloat">
              <li v-for="(item,index) of firstTypeList3" :key="index" @click="checkFirstType(item,index)">
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
              <li v-for="(item,index) of secondTypeList3" :key="index" class="clearFloat">
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
        <div v-if="isShowQueryResult3" class="queryResult">
          <div v-if="hasResultData3">
            <table>
              <tbody>
                <tr>
                  <th v-for="(item, index) of titleData2" :key="index" class="tableTh" width:100px>{{item}}</th>
                </tr>
                <tr v-for="(item, index) of dataList3" :key="index">
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
                    <div class="floatLeft">
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
                      <!-- <div v-else-if="item.starNumber === 2">
                          <span class="iconfont icon-xingxing"></span>
                        </div>
                        <div>
                          <span v-for="secondItem of dataList[index].starNumber" :key="secondItem" class="iconfont icon-xingxing"></span>
                        </div> -->
                    </div>
                  </td>
                  <!-- <td>
                    <span v-if="item.is_favorite">已收藏
                      <span @click="favorite(item, index, false)" class="updateBtn">取消</span>
                    </span>
                    <span v-else @click="favorite(item, index, true)" class="updateBtn">加入收藏夹</span>
                  </td> -->
                  <td>
                    <span v-if="item.finished">zhangxx已处理
                      <span @click="dispose(item, index, false)" class="updateBtn">取消</span>
                    </span>
                    <span v-else @click="dispose(item, index, true)" class="updateBtn">处理完成</span>
                  </td>
                  <!-- <td>
                      <span @click="update" class="updateBtn">确认更新</span>
                    </td> -->
                </tr>
              </tbody>
            </table>
            <pagination :prop="paginationData3" @paginationSelect3="paginationSelect3"></pagination>
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
import pagination from "@/components/common/pagination";
import commonMethods from "@/common/common.js";
import datePicker from "@/components/common/datePicker";
export default {
  data() {
    const oneDayAfter = new Date().getTime() - 86400000;
    return {
      relatecode: "",
      sector: "",
      isshowmodulesname: false,
      querytype: "",
      url: "http://10.25.24.51:10192/api/rest/nlp/risk/query_news",
      updateUrl:
        "http://10.25.24.51:10192/api/rest/nlp/risk/update_news_factor",
      keyword: "",
      stock_code: "",
      stock_codetext: "",
      isShowDropDownList: false,
      codeshow: false,
      dropDownList: [],
      isShowTypeList: false,
      isShowTypeList1: false,
      isShowTypeList2: false,
      isShowTypeList3: false,
      isShowTypeBox: false,
      isShowTypeBox1: false,
      isShowTypeBox2: false,
      isShowTypeBox3: false,
      isShowQueryResult: false,
      isShowQueryResult1: false,
      isShowQueryResult2: false,
      isShowQueryResult3: false,
      hasResultData: false,
      hasResultData1: false,
      hasResultData2: false,
      hasResultData3: false,
      isFinished: false,
      isFinished1: false,
      isFinished2: false,
      isFinished3: false,
      isAttentionPool: false,
      categroyIndex: 0,
      nowCategroy: "",
      selectFileName: "选择文件",
      selectFileName1: "选择文件",
      selectFileName2: "选择文件",
      selectFileName3: "选择文件",
      starNumber: [1, 2, 3],
      conditionStarNumber: [],
      conditionStarNumber1: [],
      conditionStarNumber2: [],
      conditionStarNumber3: [],
      categroyList: ["基金", "债券", "股票"],
      // =F&=&&=&=&=1&=10&=2018-05-17&=2018-05-25&=&=
      sendData: {},
      sendData1: {},
      sendData2: {},
      sendData3: {},
      queryModules: {
        userid: 'risk',
        action: 'query',
        sector: "",
      },
      queryCondition: {
        stock_type: "F",
        imp_score: "",
        is_favorite: "",
        risk_type: "",
        risk_code: "",
        page_size: 10,
        page: 1,
        from_date: "",
        to_date: "",
        keyword: "",
        finished: ""
      },
      queryCondition1: {
        stock_type: "B",
        imp_score: "",
        is_favorite: "",
        risk_type: "",
        risk_code: "",
        page_size: 10,
        page: 1,
        from_date: "",
        to_date: "",
        keyword: "",
        finished: ""
      },
      queryCondition2: {
        stock_type: "S",
        imp_score: "",
        is_favorite: "",
        risk_type: "",
        risk_code: "",
        page_size: 10,
        page: 1,
        from_date: "",
        to_date: "",
        keyword: "",
        finished: ""
      },
      queryCondition3: {
        stock_code: "",
        imp_score: "",
        is_favorite: "",
        risk_type: "",
        risk_code: "",
        page_size: 10,
        page: 1,
        from_date: "",
        to_date: "",
        keyword: "",
        finished: ""
      },
      startDatePicker: {
        title: "新闻日期：",
        parentEvent: "startDateEvent",
        defaultDate: new Date(oneDayAfter)
      },
      endDatePicker: {
        title: "至：",
        parentEvent: "endDateEvent",
        defaultDate: new Date()
      },
      startDatePicker1: {
        title: "新闻日期：",
        parentEvent: "startDateEvent1",
        defaultDate: new Date(oneDayAfter)
      },
      endDatePicker1: {
        title: "至：",
        parentEvent: "endDateEvent1",
        defaultDate: new Date()
      },
      startDatePicker2: {
        title: "新闻日期：",
        parentEvent: "startDateEvent2",
        defaultDate: new Date(oneDayAfter)
      },
      endDatePicker2: {
        title: "至：",
        parentEvent: "endDateEvent2",
        defaultDate: new Date()
      },
      startDatePicker3: {
        title: "新闻日期：",
        parentEvent: "startDateEvent3",
        defaultDate: new Date(oneDayAfter)
      },
      endDatePicker3: {
        title: "至：",
        parentEvent: "endDateEvent3",
        defaultDate: new Date()
      },
      paginationData: {
        parentEvent: "paginationSelect",
        page_Count: 0,
        total_Count: 0,
        current: 1
      },
      paginationData1: {
        parentEvent: "paginationSelect1",
        page_Count: 0,
        total_Count: 0,
        current: 1
      },
      paginationData2: {
        parentEvent: "paginationSelect2",
        page_Count: 0,
        total_Count: 0,
        current: 1
      },
      paginationData3: {
        parentEvent: "paginationSelect3",
        page_Count: 0,
        total_Count: 0,
        current: 1
      },
      selectList: {
        title: '查询方式:',
        parentEvent: 'selectListEvent',
        default: '请选择',
        listWidth: 140,
        nowSelectWidth: 140,
        nowSelectHeight: 25,
        nowSelectFontSize: 13,
        list: [
          "请选择",
          "按关键字查询",
          "按证券代码查询",
          "按自定义板块查询"
        ]
      },
      modulesNameList: {
        title: '板块名：',
        parentEvent: 'modulesNameEvent',
        default: '请选择',
        listWidth: 143,
        nowSelectWidth: 145,
        nowSelectHeight: 25,
        nowSelectFontSize: 13,
        list: []
      },
      titleData: [
        "证券代码",
        "新闻时间",
        "新闻标题",
        "新闻内容",
        "新闻源",
        "风险类型",
        "重要性",
        "收藏",
        "处理情况"
      ],
      titleData2: [
        "证券名称",
        "证券代码",
        "新闻时间",
        "新闻标题",
        "新闻内容",
        "新闻源",
        "风险类型",
        "重要性",
        "处理情况"
      ],
      dataList: [],
      dataList1: [],
      dataList2: [],
      dataList3: [],
      firstTypeList1: null,
      firstTypeList2: null,
      firstTypeList3: null,
      firstTypeList: [
        { type: "全部", check: false },
        { type: "信用风险", check: false },
        { type: "市场风险", check: false },
        { type: "财务风险", check: false },
        { type: "经营风险", check: false },
        { type: "管理风险", check: false },
        { type: "项目风险", check: false },
        { type: "担保风险", check: false },
        { type: "不可抗力风险", check: false },
        { type: "监管预警", check: false },
        { type: "产品预警", check: false },
        { type: "其他风险", check: false }
      ],
      secondTypeList1: null,
      secondTypeList2: null,
      secondTypeList3: null,
      secondTypeList: [
        {
          firstTitle: "信用风险",
          check: false,
          list: [
            {
              code: "510101",
              check: false,
              title: "债务违约、合同失信、债务展期"
            },
            {
              code: "510102",
              check: false,
              title: "评级下调、列入观察或负面类展望、推迟评级"
            },
            { code: "510103", check: false, title: "欺诈造假" },
            { code: "510104", check: false, title: "承诺失信" },
            {
              code: "510105",
              check: false,
              title: "公司挪用资金、未按约定使用资金"
            }
          ]
        },
        {
          firstTitle: "市场风险",
          check: false,
          list: [
            { code: "511100", check: false, title: "暂停交易、退市" },
            { code: "511101", check: false, title: "股权质押、冻结或爆仓" },
            { code: "511102", check: false, title: "股份解禁或减持" },
            { code: "511103", check: false, title: "证券价格异常波动" }
          ]
        },
        {
          firstTitle: "财务风险",
          check: false,
          list: [
            { code: "512100", check: false, title: "发生亏损" },
            { code: "512101", check: false, title: "盈利能力下降" },
            {
              code: "512102",
              check: false,
              title: "公司资金流动性不足或资金来源异常"
            },
            { code: "512103", check: false, title: "资不抵债、资产负债率过高" },
            { code: "512104", check: false, title: "资产重大减值、资产异常" },
            {
              code: "512105",
              check: false,
              title: "财务造假、不透明，财务数据存在真实性问题"
            },
            { code: "512106", check: false, title: "放弃债权和财产" },
            {
              code: "512107",
              check: false,
              title: "对外借款或对外担保过多,存在代偿风险"
            }
          ]
        },
        {
          firstTitle: "经营风险",
          check: false,
          list: [
            {
              code: "513100",
              check: false,
              title: "重组失败、重组取消或重组存在问题"
            },
            {
              code: "513101",
              check: false,
              title: "经营方针、主营业务、经营范围发生重大变化"
            },
            {
              code: "513102",
              check: false,
              title: "对外投资失误、参与其他公司股权之争、抛售公司资产"
            },
            {
              code: "513103",
              check: false,
              title: "虚假注资、抽逃资金、转移资产"
            },
            {
              code: "513104",
              check: false,
              title: "国家或地方政府政策变动而造成影响"
            },
            {
              code: "513105",
              check: false,
              title: "公司资产被查封、扣押、冻结、司法划转"
            },
            {
              code: "513106",
              check: false,
              title: "公司经营出现问题、公司（项目）停产或半停产、业务减少"
            },
            {
              code: "513107",
              check: false,
              title: "公司发生减资、合并、分立、解散、破产"
            },
            {
              code: "513108",
              check: false,
              title:
                "关联企业或人（实际控制人、控股股东、供应商、客户、被担保企业、其他关联企业）出现问题"
            },
            {
              code: "513109",
              check: false,
              title: "投诉和诉讼事件、经济纠纷和环保问题等公共纠纷"
            },
            {
              code: "513110",
              check: false,
              title: "公司产品存在缺陷或存在问题"
            },
            {
              code: "513111",
              check: false,
              title: "审批不通过事项或撤销公司某项经营资格"
            },
            { code: "513112", check: false, title: "犯罪事件" },
            { code: "513113", check: false, title: "公司违规或被问询" }
          ]
        },
        {
          firstTitle: "管理风险",
          check: false,
          list: [
            {
              code: "514100",
              check: false,
              title:
                "公司控制权斗争、实际控制人发生变动、公司性质变动、公司股东持有的股份被司法划转"
            },
            { code: "514101", check: false, title: "处罚事件或问询事件" },
            { code: "514102", check: false, title: "高管变动（异动）" },
            { code: "514103", check: false, title: "员工（含高管）违规" },
            {
              code: "514104",
              check: false,
              title: "拖欠员工工资、大量辞工或员工大面积离职"
            }
          ]
        },
        {
          firstTitle: "项目风险",
          check: false,
          list: [
            {
              code: "515100",
              check: false,
              title: "公司项目发生延期、手续不全、陷入问题"
            },
            {
              code: "515101",
              check: false,
              title: "项目产能未达到预期或情况备受质疑的"
            }
          ]
        },
        {
          firstTitle: "担保风险",
          check: false,
          list: [
            {
              code: "516100",
              check: false,
              title: "担保人或抵押物出现纠纷或问题"
            }
          ]
        },
        {
          firstTitle: "不可抗力风险",
          check: false,
          list: [
            {
              code: "517100",
              check: false,
              title: "地震、水灾、火灾、恐怖袭击；通讯、电力中断；战争"
            }
          ]
        },
        {          firstTitle: '监管预警', check: false, list: [
            { code: '519', check: false, title: '监管预警' },
          ]        },
        {          firstTitle: '产品预警', check: false, list: [
            { code: '518', check: false, title: '产品预警' },
          ]        },
        {
          firstTitle: "其他风险",
          check: false,
          list: [{ code: "590100", check: false, title: "其他风险类事件" }]
        }
      ],
      file: "",
      file1: "",
      file2: "",
      file3: "",
      risk_typeList: {
        title: "",
        parentEvent: "legislationEvent",
        default: "请选择",
        listWidth: 245,
        nowSelectWidth: 145,
        nowSelectHeight: 25,
        nowSelectFontSize: 13,
        list: [
          "债务违约、合同失信、债务展期",
          "评级下调、列入观察或负面类展望、推迟评级",
          "欺诈造假",
          "承诺失信",
          "公司挪用资金、未按约定使用资金",
          "暂停交易、退市",
          "股权质押、冻结或爆仓",
          "股份解禁或减持",
          "证券价格异常波动",
          "发生亏损",
          "盈利能力下降",
          "公司资金流动性不足或资金来源异常",
          "资不抵债、资产负债率过高",
          "资产重大减值、资产异常",
          "财务造假、不透明，财务数据存在真实性问题",
          "放弃债权和财产",
          "对外借款或对外担保过多,存在代偿风险",
          "重组失败、重组取消或重组存在问题",
          "经营方针、主营业务、经营范围发生重大变化",
          "对外投资失误、参与其他公司股权之争、抛售公司资产",
          "虚假注资、抽逃资金、转移资产",
          "国家或地方政府政策变动而造成影响",
          "公司资产被查封、扣押、冻结、司法划转",
          "公司经营出现问题、公司（项目）停产或半停产、业务减少；",
          "公司发生减资、合并、分立、解散、破产",
          "关联企业或人（实际控制人、控股股东、供应商、客户、被担保企业、其他关联企业）出现问题；",
          "投诉和诉讼事件、经济纠纷和环保问题等公共纠纷",
          "公司产品存在缺陷或存在问题",
          "审批不通过事项或撤销公司某项经营资格",
          "犯罪事件",
          "公司违规或被问询",
          "公司控制权斗争、实际控制人发生变动、公司性质变动、公司股东持有的股份被司法划转",
          "处罚事件或问询事件",
          "高管变动（异动）",
          "员工（含高管）违规；",
          "拖欠员工工资、大量辞工或员工大面积离职",
          "公司项目发生延期、手续不全、陷入问题",
          "项目产能未达到预期或情况备受质疑的",
          "担保人或抵押物出现纠纷或问题",
          "地震、水灾、火灾、恐怖袭击；通讯、电力中断；战争；",
          "其他风险类事件"
        ]
      },
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
    };
  },
  components: {
    pullDownList,
    pagination,
    datePicker
  },
  methods: {
    modulesNameEvent(...data) {
      this.sector = data[0];
    },
    selectListEvent(...data) {
      this.querytype = data[0];
      if (data[0] == "按自定义板块查询") {
        this.isshowmodulesname = true;
        this.queryModulesName();
      }
      else {
        this.isshowmodulesname = false;
        this["queryCondition" + this.nowCategroy.toString()].stock_code = "";
        this.sector = "";
      }
    },
    queryModulesName() {
      const url = 'http://10.25.24.51:10189/api/risk/sector_set/query'
      const sendData = {
        userid: 'risk'
      };
      this.$_axios.get(url, {
        params: sendData
      }).then((response) => {
        if (!response.data) {
          this.modulesNameList.list = [];
          this.modulesNameList.default = '没有可选择板块';
          this.sector = '';
        } else {
          if (response.data.code == '0') {
            console.log(response.data.sectorlist)
            this.modulesNameList.list = JSON.parse(JSON.stringify(response.data.sectorlist));
            this.modulesNameList.default = response.data.sectorlist[0];
            this.sector = response.data.sectorlist[0];
          } else {
            this.modulesNameList.list = [];
            this.modulesNameList.default = '没有可选择板块';
            this.sector = '';
          }
        }
      }).catch((err) => {
      });
    },
    saveItem(s) {
      let m = Object.assign({}, s);
      m.news_id = m.INFOCODE;
      m.imp_score = m.starNumber;
      m.showtime = m.SHOWTIME;
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
      // selectFileName: '上传文件',
      this["file" + this.nowCategroy.toString()] = event.target.files[0];
      if (this["file" + this.nowCategroy.toString()]) {
        const type = this["file" + this.nowCategroy.toString()].name
          .slice(-4)
          .toLowerCase();
        if (type != ".txt" && type != ".csv") {
          this["file" + this.nowCategroy.toString()] = "";
          event.target.value = "";
          this["selectFileName" + this.nowCategroy.toString()] = "选择文件";
          alert("请输入txt或csv类型文件");
          return;
        }
        event.target.value = "";
        this["selectFileName" + this.nowCategroy.toString()] = this[
          "file" + this.nowCategroy.toString()
        ].name;
      }
      console.log(
        "file" + this.nowCategroy.toString(),
        this["file" + this.nowCategroy.toString()]
      );
    },
    clearFile() {
      // inputer
      this.$refs["inputer" + this.nowCategroy.toString()] = null;
      this["selectFileName" + this.nowCategroy.toString()] = "选择文件";
      this["file" + this.nowCategroy.toString()] = "";
    },
    // 打开重点关注池
    openAttentionPool() {
      this.$store.state.isAttentionPool = true;
    },
    // 顶部tab切换
    categroyCheck(item, index) {
      this.isshowmodulesname = false;
      this.selectList.default = "请选择";
      this.sector = "";
      this.querytype = "";
      this.categroyIndex = index;
      this.nowCategroy = index;
      if (!this.categroyIndex) {
        this.nowCategroy = "";
      }
    },
    legislationEvent(...data) {
      this.risk_codeList.forEach((item, index) => {
        if (data[0] == item.title) {
          this.queryCondition1.risk_code = item.code;
          return;
        }
      });
    },
    queryType() {
      if (this.querytype == "按证券代码查询") {
        this.url = "http://10.25.24.51:10192/api/rest/nlp/risk/query_news_search";
        this.query();
      }
      else if (this.querytype == "按自定义板块查询") {
        const url = "http://10.25.24.51:10189/api/risk/sector_set/detail";
        this.queryModules.sector = this.sector;
        this.sendData = JSON.parse(JSON.stringify(this.queryModules));
        this.$_axios.get(url, { params: this.sendData }).then(response => {

          this.url = "http://10.25.24.51:10192/api/rest/nlp/risk/query_news_search";
          this.dataList = JSON.parse(JSON.stringify(response.data.result.result))
          let stock_list = "";
          this.dataList.forEach(item => {
            stock_list += item.证券代码 + ",";
            item.RELATECODE = item.RELATECODE;
          });
          stock_list = stock_list.slice(0, -1);
          this["queryCondition" + this.nowCategroy.toString()].stock_code = stock_list;
          this.query();
        });
      }
      else {
        this.url = "http://10.25.24.51:10192/api/rest/nlp/risk/query_news";
        this.query();
      }
    },
    query() {
      this["isShowQueryResult" + this.nowCategroy.toString()] = true;
      this["hasResultData" + this.nowCategroy.toString()] = false;
      this["sendData" + this.nowCategroy.toString()] = JSON.parse(
        JSON.stringify(this["queryCondition" + this.nowCategroy.toString()])
      );
      this["sendFile" + this.nowCategroy.toString()] = this[
        "file" + this.nowCategroy.toString()
      ];
      for (let key in this["sendData" + this.nowCategroy.toString()]) {
        if (this["sendData" + this.nowCategroy.toString()][key] === "") {
          delete this["sendData" + this.nowCategroy.toString()][key];
        }
      }
      console.log("sendData", this["sendData" + this.nowCategroy.toString()]);
      let formData = new FormData();
      for (let key in this["sendData" + this.nowCategroy.toString()]) {
        if (
          this["sendData" + this.nowCategroy.toString()].hasOwnProperty(key)
        ) {
          formData.append(
            key,
            this["sendData" + this.nowCategroy.toString()][key]
          );
        }
      }
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      this["sendFile" + this.nowCategroy.toString()] &&
        formData.append("file", this["sendFile" + this.nowCategroy.toString()]);
      this.$_axios
        .post(this.url.toUrl(), formData, config)
        .then(response => {
          if (response.data.code == 2) {
            alert("请导入证券代码");
            this["isShowQueryResult" + this.nowCategroy.toString()] = false;
            this["hasResultData" + this.nowCategroy.toString()] = true;
            return;
          }
          else {
            // 显示查询结果
            this["hasResultData" + this.nowCategroy.toString()] = true;
            console.log("主页数据", response.data.result);
            this["resultData" + this.nowCategroy.toString()] =
              response.data.result.Announce_List;
            this["resultData" + this.nowCategroy.toString()].forEach(item => {
              item.CONTENT = item.CONTENT.toString().replace(
                /\\r\\n\\r\\n/g,
                "<br>"
              );
              item.CONTENT = item.CONTENT.toString().replace(/\\r\\n/g, "<br>");
            });
            this["dataList" + this.nowCategroy.toString()] = JSON.parse(
              JSON.stringify(this["resultData" + this.nowCategroy.toString()])
            );
            this["paginationData" + this.nowCategroy.toString()].page_Count =
              response.data.result.Page_Count;
            this["paginationData" + this.nowCategroy.toString()].total_Count =
              response.data.result.Total_Count;
          }
          this["dataList" + this.nowCategroy.toString()].forEach(item => {
            // item.SHOWTIME = item.SHOWTIME ? commonMethods.formatDateTime(new Date(item.SHOWTIME)) : '-';
            if (item.imp_score) {
              item.starNumber = parseInt(item.imp_score);
            } else {
              item.starNumber = 0;
            }
            if (item.CONTENT && item.CONTENT.length > 175) {
              item.CONTENT = item.CONTENT.slice(0, 175) + "...";
              item.details = "...详情";
            }
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    query2() {
      this["sendFile" + this.nowCategroy.toString()] = this[
        "file" + this.nowCategroy.toString()
      ];
      if (this.file3 == "" && this.stock_code == "") {
        alert("请输入或者上传证券代码！");
      } else {
        this["isShowQueryResult" + this.nowCategroy.toString()] = true;
        this["hasResultData" + this.nowCategroy.toString()] = false;
        this.queryCondition3.keyword = this.keyword;
        this.queryCondition3.stock_code = this.stock_code;
        this["sendData" + this.nowCategroy.toString()] = JSON.parse(
          JSON.stringify(this["queryCondition" + this.nowCategroy.toString()])
        );
        for (let key in this["sendData" + this.nowCategroy.toString()]) {
          if (this["sendData" + this.nowCategroy.toString()][key] === "") {
            delete this["sendData" + this.nowCategroy.toString()][key];
          }
        }
        console.log("sendData", this["sendData" + this.nowCategroy.toString()]);
        let formData = new FormData();
        for (let key in this["sendData" + this.nowCategroy.toString()]) {
          if (
            this["sendData" + this.nowCategroy.toString()].hasOwnProperty(key)
          ) {
            formData.append(
              key,
              this["sendData" + this.nowCategroy.toString()][key]
            );
          }
        }
        let config = {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        };
        this["sendFile" + this.nowCategroy.toString()] &&
          formData.append(
            "file",
            this["sendFile" + this.nowCategroy.toString()]
          );
        let url =
          "http://10.25.24.51:10192/api/rest/nlp/risk/query_news_search";
        this.$_axios
          .post(url.toUrl(), formData, config)
          .then(response => {
            // 显示查询结果
            this.hasResultData3 = true;
            this.resultData3 = response.data.result.Announce_List;
            this.resultData3.forEach(item => {
              item.CONTENT = item.CONTENT.toString().replace(
                /\\r\\n\\r\\n/g,
                "<br>"
              );
              item.CONTENT = item.CONTENT.toString().replace(/\\r\\n/g, "<br>");
            });
            this.dataList3 = JSON.parse(JSON.stringify(this.resultData3));
            this.paginationData3.page_Count = response.data.result.Page_Count;
            this.paginationData3.total_Count = response.data.result.Total_Count;
            let code = response.data.result.Stock_Code;
            if (code != "") {
              this.codeshow = true;
              this.stock_codetext = code;
              if (code.length > 175) {
                this.stock_codetext = code.slice(0, 175) + "...";
              }
            }
            this.dataList3.forEach(item => {
              // item.SHOWTIME = item.SHOWTIME ? commonMethods.formatDateTime(new Date(item.SHOWTIME)) : '-';
              if (item.imp_score) {
                item.starNumber = parseInt(item.imp_score);
              } else {
                item.starNumber = 0;
              }
              if (item.CONTENT && item.CONTENT.length > 175) {
                item.CONTENT = item.CONTENT.slice(0, 175) + "...";
                item.details = "...详情";
              }
            });
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    paginationSelect1(pageNumber) {
      this.paginationSelect(pageNumber);
    },
    paginationSelect2(pageNumber) {
      this.paginationSelect(pageNumber);
    },
    paginationSelect(pageNumber) {
      const sendData = JSON.parse(
        JSON.stringify(this["sendData" + this.nowCategroy.toString()])
      );
      sendData.page = pageNumber;
      let formData = new FormData();
      for (let key in sendData) {
        if (sendData.hasOwnProperty(key)) {
          formData.append(key, sendData[key]);
        }
      }
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      this["sendFile" + this.nowCategroy.toString()] &&
        formData.append("file", this["sendFile" + this.nowCategroy.toString()]);
      console.log("sendData", sendData);
      this.$_axios
        .post(this.url.toUrl(), formData, config)
        .then(response => {
          // 显示查询结果
          this["hasResultData" + this.nowCategroy.toString()] = true;
          console.log("主页数据", response.data.result);
          this["resultData" + this.nowCategroy.toString()] =
            response.data.result.Announce_List;
          this["resultData" + this.nowCategroy.toString()].forEach(item => {
            item.CONTENT = item.CONTENT.toString().replace(
              /\\r\\n\\r\\n/g,
              "<br>"
            );
            item.CONTENT = item.CONTENT.toString().replace(/\\r\\n/g, "<br>");
          });
          this["dataList" + this.nowCategroy.toString()] = JSON.parse(
            JSON.stringify(this["resultData" + this.nowCategroy.toString()])
          );
          this["dataList" + this.nowCategroy.toString()].forEach(item => {
            // item.SHOWTIME = item.SHOWTIME ? commonMethods.formatDateTime(new Date(item.SHOWTIME)) : '-';
            if (item.imp_score) {
              item.starNumber = parseInt(item.imp_score);
            } else {
              item.starNumber = 0;
            }
            if (item.CONTENT && item.CONTENT.length > 175) {
              item.CONTENT = item.CONTENT.slice(0, 175) + "...";
              item.details = "...详情";
            }
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    paginationSelect3(pageNumber) {
      const sendData = JSON.parse(
        JSON.stringify(this["sendData" + this.nowCategroy.toString()])
      );
      sendData.page = pageNumber;
      let formData = new FormData();
      for (let key in sendData) {
        if (sendData.hasOwnProperty(key)) {
          formData.append(key, sendData[key]);
        }
      }
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      // this['sendFile' + this.nowCategroy.toString()] && formData.append('file', this['sendFile' + this.nowCategroy.toString()]);
      // console.log('sendData', sendData);
      this["sendFile" + this.nowCategroy.toString()] &&
        formData.append("file", this["sendFile" + this.nowCategroy.toString()]);
      let url = "http://10.25.24.51:10192/api/rest/nlp/risk/query_news_search";
      this.$_axios
        .post(url.toUrl(), formData, config)
        .then(response => {
          // 显示查询结果
          this["hasResultData" + this.nowCategroy.toString()] = true;
          console.log("主页数据", response.data.result);
          this["resultData" + this.nowCategroy.toString()] =
            response.data.result.Announce_List;
          this["resultData" + this.nowCategroy.toString()].forEach(item => {
            item.CONTENT = item.CONTENT.toString().replace(
              /\\r\\n\\r\\n/g,
              "<br>"
            );
            item.CONTENT = item.CONTENT.toString().replace(/\\r\\n/g, "<br>");
          });
          this["dataList" + this.nowCategroy.toString()] = JSON.parse(
            JSON.stringify(this["resultData" + this.nowCategroy.toString()])
          );
          this["dataList" + this.nowCategroy.toString()].forEach(item => {
            // item.SHOWTIME = item.SHOWTIME ? commonMethods.formatDateTime(new Date(item.SHOWTIME)) : '-';
            if (item.imp_score) {
              item.starNumber = parseInt(item.imp_score);
            } else {
              item.starNumber = 0;
            }
            if (item.CONTENT && item.CONTENT.length > 175) {
              item.CONTENT = item.CONTENT.slice(0, 175) + "...";
              item.details = "...详情";
            }
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    details(item, index) {
      if (item.details == "收起") {
        item.details = "...详情";
        item.CONTENT = item.CONTENT.slice(0, 220) + "...";
      } else {
        item.details = "收起";
        item.CONTENT = this["resultData" + this.nowCategroy.toString()][
          index
        ].CONTENT;
      }
    },
    checkFinished(flag) {
      this["isFinished" + this.nowCategroy.toString()] = flag;
      this["queryCondition" + this.nowCategroy.toString()].finished = flag
        ? 1
        : "";
    },
    // 是否显示风险类别
    checkRiskType() {
      this["isShowTypeList" + this.nowCategroy.toString()] = !this[
        "isShowTypeList" + this.nowCategroy.toString()
      ];
      // isShowTypeBox
      if (this["isShowTypeList" + this.nowCategroy.toString()]) {
        this["isShowTypeBox" + this.nowCategroy.toString()] = true;
      } else {
        this["isShowTypeBox" + this.nowCategroy.toString()] = false;
        this["queryCondition" + this.nowCategroy.toString()].risk_code = "";
      }
    },
    // 条件 选择重要级 星级
    conditionStar(number) {
      if (
        this["conditionStarNumber" + this.nowCategroy.toString()].length ===
        1 &&
        number === 1
      ) {
        this["conditionStarNumber" + this.nowCategroy.toString()] = [];
        this["queryCondition" + this.nowCategroy.toString()].imp_score = "";
      } else {
        this["conditionStarNumber" + this.nowCategroy.toString()] = [
          ...Array(number).keys()
        ];
        this["queryCondition" + this.nowCategroy.toString()].imp_score = number;
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
        news_type_fk_id: "",
        user: "zhangxx"
      };
      for (let key in sendData) {
        if (sendData[key] === "") {
          delete sendData[key];
        }
      }
      sendData.imp_score = number;
      if (
        this["dataList" + this.nowCategroy.toString()][index].starNumber ===
        1 &&
        number === 1
      ) {
        sendData.imp_score = "";
      } else {
        sendData.imp_score = number;
      }
      this.$store.startnumber = sendData.imp_score;
      this.$_axios
        .get(this.updateUrl, {
          params: sendData
        })
        .then(response => {
          // 结果
          const resultData = response.data.result;
          console.log("dispose处理数据", resultData);
          if (resultData.update_result === 1) {
            let content =
              this["dataList" + this.nowCategroy.toString()][index].CONTENT +
              " ";
            if (
              this["dataList" + this.nowCategroy.toString()][index]
                .starNumber === 1 &&
              number === 1
            ) {
              this["dataList" + this.nowCategroy.toString()][
                index
              ].starNumber = 0;
            } else {
              this["dataList" + this.nowCategroy.toString()][
                index
              ].starNumber = number;
            }
            this["dataList" + this.nowCategroy.toString()][
              index
            ].CONTENT = content;
          }
        })
        .catch(err => {
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
        news_type_fk_id: "",
        user: "zhangxx"
      };
      for (let key in sendData) {
        if (sendData[key] === "") {
          delete sendData[key];
        }
      }

      if (flag) {
        sendData.is_favorite = "1";
      } else {
        sendData.is_favorite = "";
      }
      sendData.imp_score = this.$store.startnumber;
      console.log("item", item);
      console.log("sendData", sendData);
      this.$_axios
        .get(this.updateUrl, {
          params: sendData
        })
        .then(response => {
          // 结果
          const resultData = response.data.result;
          console.log("dispose处理数据", resultData);
          if (resultData.update_result === 1) {
            this["dataList" + this.nowCategroy.toString()][
              index
            ].is_favorite = flag ? "1" : "";
          }
        })
        .catch(err => {
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
        news_type_fk_id: "",
        user: "zhangxx"
      };
      for (let key in sendData) {
        if (sendData[key] === "") {
          delete sendData[key];
        }
      }
      sendData.imp_score = this.$store.startnumber;
      if (flag) {
        sendData.finished = "1";
      } else {
        sendData.finished = "";
      }
      console.log("item", item);
      console.log("sendData", sendData);
      this.$_axios
        .get(this.updateUrl, {
          params: sendData
        })
        .then(response => {
          // 结果
          const resultData = response.data.result;
          console.log("dispose处理数据", resultData);
          if (resultData.update_result === 1) {
            this["dataList" + this.nowCategroy.toString()][
              index
            ].finished = flag ? "1" : "";
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    startDateEvent(...data) {
      this.queryCondition.from_date = data[0];
      // this.startDatePicker.defaultDate = new Date(data[0]);
    },
    startDateEvent1(...data) {
      this.queryCondition1.from_date = data[0];
      // this.startDatePicker1.defaultDate = new Date(data[0]);
    },
    startDateEvent2(...data) {
      this.queryCondition2.from_date = data[0];
      // this.startDatePicker2.defaultDate = new Date(data[0]);
    },
    startDateEvent3(...data) {
      this.queryCondition3.from_date = data[0];
      // this.startDatePicker3.defaultDate = new Date(data[0]);
    },
    endDateEvent(...data) {
      this.queryCondition.to_date = data[0];
      // this.endDatePicker.defaultDate = new Date(data[0]);
    },
    endDateEvent1(...data) {
      // this.endDateEvent(...data);
      this.queryCondition1.to_date = data[0];
      // this.endDatePicker1.defaultDate = new Date(data[0]);
    },
    endDateEvent2(...data) {
      this.queryCondition2.to_date = data[0];
      // this.endDatePicker2.defaultDate = new Date(data[0]);
      // this.endDateEvent(...data);
    },
    endDateEvent3(...data) {
      this.queryCondition3.to_date = data[0];
      // this.endDatePicker3.defaultDate = new Date(data[0]);
      // this.endDateEvent(...data);
    },
    // 点击一级风险类型
    checkFirstType(item, index) {
      item.check = !item.check;
      // console.log(item.check)
      if (item.type === "全部") {
        this["firstTypeList" + this.nowCategroy.toString()].forEach(val => {
          console.log(this.nowCategroy, '我打印的')
          // console.log(val)
          //val是
          val.check = item.check;
        });
        this["secondTypeList" + this.nowCategroy.toString()].forEach(
          firstVal => {
            console.log(firstVal)
            firstVal.check = item.check;
            firstVal.list.forEach(secondVal => {
              secondVal.check = item.check;
            });
          }
        );
      } else {
        this["secondTypeList" + this.nowCategroy.toString()].forEach(
          firstVal => {
            if (item.type === firstVal.firstTitle) {
              firstVal.check = item.check;
              firstVal.list.forEach(secondVal => {
                secondVal.check = item.check;
              });
            }
          }
        );
        if (!item.check) {
          this["firstTypeList" + this.nowCategroy.toString()][0].check = false;
        } else {
          this.checkAll();
        }
      }
    },
    // 点击二级风险类型
    checkSecondType(item, index) {
      item.check = !item.check;
      if (!item.check) {
        this["firstTypeList" + this.nowCategroy.toString()][0].check = false;
        this["secondTypeList" + this.nowCategroy.toString()].forEach(
          firstVal => {
            let checkNull = firstVal.list.every(secondVal => {
              return secondVal.check === false;
            });
            if (checkNull) {
              firstVal.check = false;
              this["firstTypeList" + this.nowCategroy.toString()].forEach(
                val => {
                  if (val.type === firstVal.firstTitle) {
                    val.check = false;
                  }
                }
              );
            }
          }
        );
      } else {
        this.checkAll();
      }
    },
    // 点击一级或者二级判断是否全部选中了
    checkAll() {
      let tempFirstArr = JSON.parse(
        JSON.stringify(this["firstTypeList" + this.nowCategroy.toString()])
      );
      tempFirstArr.shift();
      let isFirstAll = tempFirstArr.every(item => {
        return item.check === true;
      });
      let isSecondAll = this[
        "secondTypeList" + this.nowCategroy.toString()
      ].every(item => {
        let isCheck = item.list.every(secondItem => {
          return secondItem.check === true;
        });
        return isCheck === true;
      });
      console.log(1, isFirstAll, 2, isSecondAll);
      if (isFirstAll && isSecondAll) {
        this["firstTypeList" + this.nowCategroy.toString()][0].check = true;
      }
    },
    confirmType() {
      const tempArr = [];
      this["secondTypeList" + this.nowCategroy.toString()].forEach(firstVal => {
        firstVal.list.forEach(secondVal => {
          if (secondVal.check) {
            tempArr.push(secondVal.code);
          }
        });
      });
      this.resetType();
      this[
        "queryCondition" + this.nowCategroy.toString()
      ].risk_code = tempArr.join(",");
      this["isShowTypeBox" + this.nowCategroy.toString()] = false;
      this["isShowTypeList" + this.nowCategroy.toString()] = false;
    },
    resetType() {
      this["firstTypeList" + this.nowCategroy.toString()].forEach(val => {
        val.check = false;
      });
      this["secondTypeList" + this.nowCategroy.toString()].forEach(firstVal => {
        firstVal.check = false;
        firstVal.list.forEach(secondVal => {
          secondVal.check = false;
        });
      });
      this["queryCondition" + this.nowCategroy.toString()].risk_code = "";
    }
  },
  mounted() {
    this.firstTypeList1 = JSON.parse(JSON.stringify(this.firstTypeList));
    this.firstTypeList2 = JSON.parse(JSON.stringify(this.firstTypeList));
    this.firstTypeList3 = JSON.parse(JSON.stringify(this.firstTypeList));
    this.secondTypeList1 = JSON.parse(JSON.stringify(this.secondTypeList));
    this.secondTypeList2 = JSON.parse(JSON.stringify(this.secondTypeList));
    this.secondTypeList3 = JSON.parse(JSON.stringify(this.secondTypeList));
    this.queryCondition.from_date = commonMethods.formatDateTime2(
      this.startDatePicker.defaultDate
    );
    this.queryCondition1.from_date = commonMethods.formatDateTime2(
      this.startDatePicker1.defaultDate
    );
    this.queryCondition2.from_date = commonMethods.formatDateTime2(
      this.startDatePicker2.defaultDate
    );
    this.queryCondition3.from_date = commonMethods.formatDateTime2(
      this.startDatePicker3.defaultDate
    );
    this.queryCondition.to_date = commonMethods.formatDateTime2(
      this.endDatePicker.defaultDate
    );
    this.queryCondition1.to_date = commonMethods.formatDateTime2(
      this.endDatePicker.defaultDate
    );
    this.queryCondition2.to_date = commonMethods.formatDateTime2(
      this.endDatePicker.defaultDate
    );
    this.queryCondition3.to_date = commonMethods.formatDateTime2(
      this.endDatePicker.defaultDate
    );
  }
};
</script>

<style lang="less" scoped>
.categroy {
  span {
    float: left;
    width: 50px;
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
    font-size: 17px;
  }
}
.queryConditionBox {
    position: relative;
    width: 100%;
    height: 115px;
    line-height: 25px;
    margin-top: 3px;
    border: 1px solid #dddddd;
    padding-top: 10px;
    background-color: #f9f9f9;
    box-shadow: 1px 1px 2px #eee inset;
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
    color: #666;
    border: 1px solid #dddddd;
    /* background-color: #fff; */
    border-radius: 5px;
  }
}
.marginLeftl{
  margin-left: 20px;
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
.tarword{
  margin-left: 20px;
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
    th:nth-child(1) {
      width: 75px;
    }
    th:nth-child(2) {
      width: 100px;
    }
    th:nth-child(3) {
      width: 130px;
    }
    th:nth-child(4) {
      width: 250px;
    }
    th:nth-child(5) {
      width: 130px;
    }
    th:nth-child(6) {
      width: 120px;
    }
    th:nth-child(7) {
      width: 100px;
    }
    th:nth-child(8) {
      width: 100px;
    }
    th:nth-child(9) {
      width: 100px;
    }
    .tableTh:nth-child(1) {
      width: 75px;
    }
    .tableTh:nth-child(2) {
      width: 75px;
    }
    .tableTh:nth-child(3) {
      width: 90px;
    }
    .tableTh:nth-child(4) {
      width: 120px;
    }
    .tableTh:nth-child(5) {
      width: 250px;
    }
    .tableTh:nth-child(7) {
      width: 160px;
    }
    .tableTh:nth-child(6),
    .tableTh:nth-child(8) {
      width: 100px;
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

.queryBtn {
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

.input {
  width: 130px;
  height: 25px;
  border: 1px solid #797979;
}

.mtt {
  margin-top: 40px !important;
  margin-left: 60px !important;
}
.floatLeft {
  margin-left: 20px;
}
.a {
  color: blue;
}
</style>
