<template>
  <div v-on:mouseleave="leaveTable()" class="clearFloat">
    <div :style="{width: prop.titleWidth + 'px'}" class="pullDownListTitle">{{prop.title}}</div>
    <div class="pullDownListContent">
      <div @click="selected" :style="{width: prop.nowSelectWidth + 'px', 
                                      height: prop.nowSelectHeight + 'px'}" 
                                      :class="{nowSelectedBottomNone: isShowList}" class="nowSelectedBox">
        <span :style="{ width: prop.nowSelectWidth - 15 + 'px',
                        height: prop.nowSelectHeight + 'px', 
                        lineHeight: prop.nowSelectHeight + 'px',
                        fontSize: prop.nowSelectFontSize + 'px'}" class="nowSelected">
            {{defaultData}}
        </span>
         <i :style="{top: (prop.nowSelectHeight - 25)/2  + 'px'}" class="iconfont icon-triangle-bottom"></i>
      </div>
      <div v-show="isShowList" class="pullDownListBox">
        <ul  class="clearFloat">
          <li v-for="(item,index) of prop.list" 
              :key="index"
              :style="{width: prop.listWidth + 'px'}"
              @click="check(item, prop.parentEvent)" class="pullDownList" :title="item">
            {{item}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['prop'],
  data(){
    return {
      defaultData: this.prop.default,
      isShowList: false
    }
  },
  methods:{
    leaveTable(){
      this.isShowList = false;
    },
    selected(){
      this.isShowList = !this.isShowList;
    },
    check(item, parentEvent){
      this.defaultData = item;
      this.isShowList = false;
      this.$emit(parentEvent, item);
    }
  }
}
</script>

<style lang="less" scoped>
.pullDownListTitle{
  // max-width: 75px;
  float: left;
  font: 400 14px/25px Arial;
  margin-left:10px;
}
.pullDownListContent{
  float: left;
  position: relative;
  .nowSelectedBox{
    position: relative;
    width: 75px;
    height: 25px;
    line-height: 25px;
    border: 1px solid #797979;
    cursor: pointer;
    .icon-triangle-bottom{
      position: absolute;
      top: 0px;
      right: 0px;
      font-size: 14px;
      color: #000000;
    }
  }
  .nowSelectedBottomNone{
    border-bottom: none;
  }
  .nowSelected{
    display: inline-block;
    width: 70px;
    height: 25px;
    line-height: 25px;
    word-break:keep-all; 
    white-space:nowrap;
    overflow:hidden;
  }
  .pullDownListBox{
    position: absolute;
    border: 1px solid #797979;
    background-color: #fff;
    z-index: 1;
    li{
      cursor: pointer;
      font: 400 13px/20px Arial;
      overflow:hidden;
      text-overflow:ellipsis;
      white-space:nowrap;
    }
    li:hover{
      background-color: rgba(32,192,252, 0.1);
    }
  }
}
</style>
