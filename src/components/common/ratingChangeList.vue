<template>
  <div>
    <div class="dataTitle clearFloat">
      <div class="ratingListTitle unilineTitle">序号</div>
      <div class="ratingListTitle unilineTitle">公告日期</div>
      <div class="ratingListTitle unilineTitle">公司代码</div>
      <div class="ratingListTitle">机构名称</div>
      <div class="ratingListTitle">评级机构代码</div>
      <div class="ratingListTitle">评级机构名称</div>
      <div class="ratingListTitle">来源标题</div>
      <div class="ratingListTitle unilineTitle">信用评级</div>
      <div class="ratingListTitle unilineTitle">评级展望</div>
      <div class="ratingListTitle unilineTitle">机构代码</div>
      <div class="ratingListTitle unilineTitle">信用评级类型</div>
    </div>
    <ul class="clearFloat">
      <li v-for="(item,index) of prop" 
          :key="index" class="ratingDateList clearFloat">
        <div class="ratingListContent">{{index + 1}}</div>
        <div class="ratingListContent">{{item.noticedate}}</div>
        <div class="ratingListContent">{{item.companycode}}</div>
        <div class="ratingListContent">{{item.companyname}}</div>
        <div class="ratingListContent">{{item.creditcode}}</div>
        <div class="ratingListContent">{{item.creditname}}</div>
        <div class="ratingListContent">{{item.title}}</div>
        <div class="ratingListContent">{{item.rating}}</div>
        <div class="ratingListContent">{{item.ratefwd}}</div>
        <div class="ratingListContent">{{item.ratetype}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['prop']
  
}
</script>

<style lang="less" scoped>
.dataTitle{
  >div{
    float: left;
    margin-left: 5px;
    text-align: center;
    line-height: 20px;
    // border: 1px solid #797979;
  }
  .unilineTitle{
    line-height: 40px;
  }
  .ratingListTitle:nth-child(1){
    width: 40px;
  }
  .ratingListTitle:nth-child(2){
    width: 70px;
  }
  .ratingListTitle:nth-child(3){
    width: 70px;
  }
  .ratingListTitle:nth-child(4){
    width: 65px;
  }
  .ratingListTitle:nth-child(5){
    width: 65px;
  }
  .ratingListTitle:nth-child(6){
    width: 40px;
  }
  .ratingListTitle:nth-child(7){
    width: 40px;
  }
  .ratingListTitle:nth-child(8){
    width: 200px;
  }
  .ratingListTitle:nth-child(9){
    width: 80px;
  }
  .ratingListTitle:nth-child(10){
    width: 80px;
  }
  .ratingListTitle:nth-child(11){
    width: 140px;
  }
  .ratingListTitle:nth-child(12){
    width: 60px;
  }
  .ratingListTitle:nth-child(13){
    width: 70px;
  }
}
.ratingDateList{
  float: left;
  width: 100%;
  margin-top: 10px;
  >div{
    float: left;
    font-size: 12px;
    margin-left: 5px;
    text-align: center;
    line-height: 14px;
    // border: 1px solid #797979;
  }
  .ratingListContent:nth-child(1){
    width: 40px;
  }
  .ratingListContent:nth-child(2){
    width: 70px;
  }
  .ratingListContent:nth-child(3){
    width: 70px;
  }
  .ratingListContent:nth-child(4){
    width: 65px;
  }
  .ratingListContent:nth-child(5){
    width: 65px;
  }
  .ratingListContent:nth-child(6){
    width: 40px;
  }
  .ratingListContent:nth-child(7){
    width: 40px;
  }
  .ratingListContent:nth-child(8){
    width: 200px;
  }
  .ratingListContent:nth-child(9){
    width: 80px;
  }
  .ratingListContent:nth-child(10){
    width: 80px;
  }
  .ratingListContent:nth-child(11){
    width: 140px;
  }
  .ratingListContent:nth-child(12){
    width: 60px;
  }
  .ratingListContent:nth-child(13){
    width: 70px;
  }
}
</style>
