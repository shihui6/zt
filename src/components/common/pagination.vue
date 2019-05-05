<template>
  <div class="parentBox">
    <div v-if="allpage > 5" class="paginationBox clearFloat">
      <div class="paginationTitle">共计{{allpage}}页，{{allDate}}条数据</div>
      <div>
        <ul class="pagination">
          <li v-show="current != 1" @click="goto(1)" ><span>第一页</span></li>
          <li v-show="current != 1" @click="current-- && goto(current--)" ><span>上一页</span></li>
          <li v-for="index in pages" @click="goto(index)" :class="{'active':current == index}" :key="index">
            <span >{{index}}</span>
          </li>
          <li v-show="allpage != current && allpage != 0 " @click="current++ && goto(current++)">
            <span >下一页</span>
          </li>
          <li v-show="allpage != current && allpage != 0 " @click="goto(allpage)">
            <span >最后一页</span>
          </li>
          <li class="goToNumberBox">
            <input v-model="goToNumber" @input="numberChange()" type="text" class="goToNumber">
            <span @click="goToEvent" class="goToNumberBtn">go</span>
          </li>
        </ul>
      </div>
    </div>
    <div v-else class="paginationBox clearFloat">
      <div class="paginationTitle2">共计{{allpage}}页，{{allDate}}条数据</div>
      <div>
        <ul class="pagination">
          <li v-for="index in pages" 
              :key="index" 
              :class="{'active':current == index}"
              @click="goto(index)"><span>{{index}}</span></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['prop'],
  data(){
    let showItem = 5,
      allpage = this.prop.page_Count,
      allDate = this.prop.total_Count,
      current = this.prop.current
    return {
      current,
      showItem,
      allpage,
      allDate,
      goToNumber: ''
    }
  },
  watch:{
    'prop':{
      handler:function(val,oldVal) {
          this.allpage = this.prop.page_Count,
          this.allDate = this.prop.total_Count,
          this.current = this.prop.current
      },
      deep:true,
      immediate: true
    }
  },
  computed: {
    pages(){
      let pag = [];
      if( this.current < this.showItem ){ //如果当前的激活的项 小于要显示的条数
        //总页数和要显示的条数那个大就显示多少条
        var i = Math.min(this.showItem,this.allpage);
        while(i){
            pag.unshift(i--);
        }
      }else{ //当前页数大于显示页数了
        var middle = this.current - Math.floor(this.showItem / 2 ),//从哪里开始
          i = this.showItem;
        if( middle >  (this.allpage - this.showItem)  ){
          middle = (this.allpage - this.showItem) + 1
        }
        while(i--){
          pag.push( middle++ );
        }
      }
      return pag
    }
  },
  methods:{
    goto(index){
      if(index == this.current) return;
        this.current = index;
        this.$emit(this.prop.parentEvent,this.current);
        //这里可以发送ajax请求
    },
    goToEvent(){
      if(!this.goToNumber || this.goToNumber === this.current) return;
      this.goto(this.goToNumber);
    },
    numberChange(){
      let nowNumber = parseInt(this.goToNumber);
      if(nowNumber.toString() === 'NaN' || nowNumber.toString() === 'Infinity' || nowNumber === 0){
        this.goToNumber = '';
      } else if(nowNumber > this.allpage){
        this.goToNumber = this.allpage;
      }
    }
  },
  mounted(){
    console.log('分页数据prop',this.prop)
  }
}
</script>

<style lang="less" scoped>
.parentBox{
  // position: relative;
  // margin: auto;
}
.paginationBox{
  // position: relative;
  // top: 50%;
  // left: 50%;
  // width: 700px;
  // height: 40px;
  // transform: translate(-50%, 0%);
  user-select: none;
  >div{
    float: left;
  }
  .paginationTitle{
    line-height: 45px;
  }
  .paginationTitle2{
    line-height: 30px;
  }
}
.pagination{
  position: relative;
  li{
    display: inline-block;
    margin:0 3px;
    span{
      display:inline-block;
      padding: 5px; 
      border:1px solid #ddd;
      background:#fff;
      color:#0E90D2;
      cursor: pointer;
    }
    span:hover{
      background:#eee;
    }
  }
  li.active{
    span{
      background:#0E90D2;
      color:#fff;
    }
  }
  .goToNumberBox{
    position: relative;
    top: 9px;
    width: 70px;
    height: 30px;
    color:#0E90D2;
    .goToNumber{
      position: absolute;
      top: 0px;
      display:inline-block;
      width: 40px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      border: 1px solid #ddd;
    }
    .goToNumberBtn{
      position: absolute;
      top: -2px;
      left: 50px;
      display:inline-block;
      width: 30px;
      height: 30px;
      margin-top: 2px;
      text-align: center;
      cursor: pointer;
      border: 1px solid #ddd;
    }
  }
}
</style>
