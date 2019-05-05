<template>
  <div>
    <!-- 监管要求 > 最新监管规则解读 list -->
    <div class="listBox">
      <div class="title clearFloat">
        <div class="titleText">序号</div>
        <div class="titleText">日期</div>
        <div class="titleText">标题</div>
        <div class="titleText">数据源</div>
      </div>
      <ul>
        <li v-for="(item,index) of prop" 
              :key="index" class="lists clearFloat">
          <div class="listsText">{{index + 1}}</div>
          <div class="listsText">{{item.news_date}}</div>
          <div class="listsText">{{item.news_title}}</div>
          <div class="listsText">{{item.data_source}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ['prop']
}
</script>

<style lang="less" scoped>
.listBox{
  margin-top: 50px;
  margin-left: 50px;
  .title{
    >div{
      float: left;
      text-align: center;
    }
    .titleText:nth-child(1){
      width: 50px;
    }
    .titleText:nth-child(2){
      width: 100px;
    }
    .titleText:nth-child(3){
      width: 300px;
    }
    .titleText:nth-child(4){
      width: 100px;
    }
  }
  .lists{
    width: 100%;
    >div{
      float: left;
      text-align: center;
    }
    .listsText:nth-child(1){
      width: 50px;
    }
    .listsText:nth-child(2){
      width: 100px;
    }
    .listsText:nth-child(3){
      width: 300px;
    }
    .listsText:nth-child(4){
      width: 100px;
    }
  }
}
</style>
