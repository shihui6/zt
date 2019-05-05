<template>
  <div class="keywordBox">
    <div>
      <span>关键字：</span>
      <input @input="inputEvent" @keyup.enter="addKeyword" @blur="inputBlur" v-model="nowKeyword" type="text">
      <span @click="addKeyword" class="iconfont icon-gouxuan"></span>
    </div>
    <div class="keyword-pullDown">
      <ul>
        <li v-for="(item,index) of pullDown" :key="index" :class="{firstList: index === 0}">
          <p>{{item}}</p>
          <span @click="clearKeyword(item,index)" class="clear">×</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      nowKeyword: '',
      pullDown: [],
    }
  },
  computed:{
    allKeyword(){
      if(!this.pullDown.length){
        return this.nowKeyword;
      } else {
        if(this.nowKeyword){
          this.pullDown.push(this.nowKeyword);
          this.pullDown = [...new Set(this.pullDown)];
        }
        return this.pullDown.join(',');
      }
      
    }
  },
  methods: {
    inputBlur(){
      this.$emit('keywordEvent',this.allKeyword);
    },
    inputEvent(){
      // this.nowKeyword = this.checkName(this.nowKeyword.trim());
    },
    addKeyword(){
      if(this.nowKeyword){
        this.pullDown.push(this.nowKeyword);
        this.pullDown = [...new Set(this.pullDown)]; 
        this.nowKeyword = '';
        if(this.pullDown.length > 5){
          this.pullDown.shift();
        }
      }
    },
    clearKeyword(item,index){
      this.pullDown.splice(index, 1);
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
  }
}
</script>

<style lang="less" scoped>
.keywordBox{
  position: relative;
  line-height: 25px;
  input{
    width: 130px;
    height: 25px;
    border: 1px solid #797979;
  }
  .icon-gouxuan{
    color: #797979;
    cursor: pointer;
    margin-right:19px;
  }
  .keyword-pullDown{
    position: absolute;
    top: 25px;
    left: 60px;
    width: 98px;
    // border: 1px solid #797979;
    background-color: #fff;
    border-top: none;
    z-index: 1;
    li{
      position: relative;
      width: 128px;
    }
    p{
      width: 120px;
      overflow:hidden;
      text-overflow:ellipsis;
      white-space:nowrap
    }
    .clear{
      position: absolute;
      top: 0px;
      right: 0px;
      cursor: pointer;
      font-size: 20px;
    }
    .firstList{
      border-top: 1px solid #797979;
    }
  }
}
</style>
