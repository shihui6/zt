<template>
    <div>
        <div class="middle_detail"><img src="../img/beijing1.png" alt=""></div>
        <div class="beijing">
            <span class="sentiment">欢迎使用舆情监控平台</span>
            <router-view></router-view>
        </div>
    </div>
</template>
<style>
    .beijing{
    height: 700px;
    background-image: url('../img/beijinglog.jpg');
    background-repeat: no-repeat;
    background-size: 1600px 700px;
    }
    .sentiment{
        color: white;
        font-size: 38px;
        margin-top: 355px;
        margin-left: 255px;
        display: inline-block;
    }
    .middle_detail{
        background-color:#E7E7E7;
    }
</style>

