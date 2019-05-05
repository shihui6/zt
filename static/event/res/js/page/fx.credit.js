/** 
 * created by mr.x on 16/10/11.
 */
;
window.onload = (function (M) {
  M.define('exception', {
    _id: function (name) {
      return document.getElementById(name);
    },

    //页面新添加的内容
   
    _class: function (name) {
      return document.getElementsByClassName(name);
    },
    node: {},
    page: null,
    pageNum: 1,
    risk_type: [
      {
        content:"可能暂停上市"
      },
      {
        content:"可能退市风险警示"
      },
      {
        content:"可能其他风险警示"
      },
      {
        content:"股份被冻结"
      },
      {
        index: 4,
        content:"公司被立案调查"
      },
      {
        content:"要约收购"
      },
      {
        content:"终止重大资产重组"
      },
      {
        content:"被暂停上市"
      },
      {
        content:"被实施退市风险警示"
      },
      {
        content:"终止上市"
      },
      {
        content:"终止重大事项"
      },
      {
        content:"被实施其他风险警示"
      },
      {
        content:"异常波动"
      },
      {
        content:"上市首日风险"
      },
      {
        content:"摘牌"
      },
      {
        content:"退市整理期"
      },
      {
        content:"吸收合并"
      },
      {
        content:"可能不定期份额折算"
      },
      {
        content:"可转债提前赎回"
      },
      {
        content:"公司银行账户被冻结"
      },
      {
        content:"债券提前兑付"
      },
      {
        content:"业绩预亏"
      },
      {
        content:"被处罚"
      },
      {
        content:"公司关联方被立案调查"
      },
      {
        content:"实施不定期份额折算"
      },
      {
        content:"诉讼仲裁"
      },
      {
        content:"减持"
      },
    ],
    risk_type_data: [
      "可能暂停上市",
        "可能退市风险警示",
        "可能其他风险警示",
        "股份被冻结",
        "公司被立案调查",
        "要约收购",
        "终止重大资产重组",
        "被暂停上市",
        "被实施退市风险警示",
        "终止上市",
        "终止重大事项",
        "被实施其他风险警示",
        "异常波动",
        "上市首日风险",
        "摘牌",
        "退市整理期",
        "吸收合并",
        "可能不定期份额折算",
        "可转债提前赎回",
        "公司银行账户被冻结",
        "债券提前兑付",
        "业绩预亏",
        "被处罚"
        ,"公司关联方被立案调查",
        "实施不定期份额折算",
        "诉讼仲裁",
        "减持"
    ],
    dataPublic: [{
        index: 0,
        content: "IPO公司公告"
      },
      {
        index: 1,
        content: "一季度报告"
      },
      {
        index: 2,
        content: "一季度报告全文"
      },
      {
        index: 3,
        content: "一季度报告更正公告"
      },
      {
        index: 4,
        content: "一季度报告正文"
      },
      {
        index: 5,
        content: "三季度报告"
      },
      {
        index: 6,
        content: "三季度报告全文"
      },
      {
        index: 7,
        content: "三季度报告更正公告"
      },
      {
        index: 8,
        content: "上市公司制度"
      },
      {
        index: 9,
        content: "专项说明/独立意见"
      },
      {
        index: 10,
        content: "中介机构报告"
      },
      {
        index: 11,
        content: "交易"
      },
      {
        index: 12,
        content: "产品价格调整"
      },
      {
        index: 13,
        content: "企业债券"
      },
      {
        index: 14,
        content: "会议资料"
      },
      {
        index: 15,
        content: "保荐/核查意见"
      },
      {
        index: 16,
        content: "保荐代表人（机构）变更"
      },
      {
        index: 17,
        content: "借贷"
      },
      {
        index: 18,
        content: "停牌公告"
      },
      {
        index: 19,
        content: "公司债"
      },
      {
        index: 20,
        content: "公司债券"
      },
      {
        index: 21,
        content: "公司关联方基本资料变更"
      },
      {
        index: 22,
        content: "公司其他基本信息变更"
      },
      {
        index: 23,
        content: "公司办公地址变更"
      },
      {
        index: 24,
        content: "公司名称变更"
      },
      {
        index: 25,
        content: "公司注册地址变更"
      },
      {
        index: 26,
        content: "公司注册资本变更"
      },
      {
        index: 27,
        content: "公司章程"
      },
      {
        index: 28,
        content: "公司章程修正"
      },
      {
        index: 29,
        content: "公司章程修订"
      },
      {
        index: 30,
        content: "公司经营范围变更"
      },
      {
        index: 31,
        content: "公司行业变更"
      },
      {
        index: 32,
        content: "关注函"
      },
      {
        index: 33,
        content: "关联交易"
      },
      {
        index: 35,
        content: "其他增发事项公告"
      },
      {
        index: 36,
        content: "其它"
      },
      {
        index: 37,
        content: "其它融资"
      },
      {
        index: 38,
        content: "其它重大事项"
      },
      {
        index: 39,
        content: "其它风险提示公告"
      },
      {
        index: 40,
        content: "内部控制报告"
      },
      {
        index: 41,
        content: "分配方案实施"
      },
      {
        index: 42,
        content: "分配预案"
      },
      {
        index: 43,
        content: "募集资金使用情况报告"
      },
      {
        index: 44,
        content: "募集资金使用进展情况"
      },
      {
        index: 45,
        content: "募集资金补充流动资金"
      },
      {
        index: 46,
        content: "半年报"
      },
      {
        index: 47,
        content: "发行与上市"
      },
      {
        index: 48,
        content: "取消股东大会公告"
      },
      {
        index: 49,
        content: "取消股东大会议案"
      },
      {
        index: 50,
        content: "变更募集资金投资项目"
      },
      {
        index: 51,
        content: "变更股东大会时间"
      },
      {
        index: 52,
        content: "召开股东大会提示性公告"
      },
      {
        index: 53,
        content: "召开股东大会通知"
      },
      {
        index: 54,
        content: "可交换公司债券"
      },
      {
        index: 55,
        content: "可转债"
      },
      {
        index: 56,
        content: "可转换债券"
      },
      {
        index: 57,
        content: "吸收合并现金选择权公告"
      },
      {
        index: 58,
        content: "吸收合并进展公告"
      },
      {
        index: 59,
        content: "回购实施公告"
      },
      {
        index: 60,
        content: "回购进展情况"
      },
      {
        index: 61,
        content: "回购预案"
      },
      {
        index: 62,
        content: "国债"
      },
      {
        index: 63,
        content: "地方政府债券"
      },
      {
        index: 64,
        content: "基金契约"
      },
      {
        index: 65,
        content: "增加股东大会议案"
      },
      {
        index: 66,
        content: "增发"
      },
      {
        index: 67,
        content: "增发上市公告书"
      },
      {
        index: 68,
        content: "增发上市公告书（摘要）"
      },
      {
        index: 69,
        content: "增发方案修订"
      },
      {
        index: 70,
        content: "增发方案取消"
      },
      {
        index: 71,
        content: "增发终止"
      },
      {
        index: 72,
        content: "增发获准公告"
      },
      {
        index: 73,
        content: "增发预案"
      },
      {
        index: 74,
        content: "增资扩股"
      },
      {
        index: 75,
        content: "处罚"
      },
      {
        index: 76,
        content: "复牌公告"
      },
      {
        index: 77,
        content: "委托（受托）事项"
      },
      {
        index: 78,
        content: "审计报告"
      },
      {
        index: 79,
        content: "审计机构变更"
      },
      {
        index: 80,
        content: "对外项目投资"
      },
      {
        index: 81,
        content: "年度报告"
      },
      {
        index: 82,
        content: "年度报告全文"
      },
      {
        index: 83,
        content: "年度报告摘要"
      },
      {
        index: 84,
        content: "年度报告更正公告"
      },
      {
        index: 85,
        content: "年度报告补充公告"
      },
      {
        index: 86,
        content: "年报"
      },
      {
        index: 87,
        content: "年报摘要"
      },
      {
        index: 88,
        content: "归还募集资金"
      },
      {
        index: 89,
        content: "投资理财"
      },
      {
        index: 90,
        content: "投资设立公司"
      },
      {
        index: 91,
        content: "担保事项"
      },
      {
        index: 92,
        content: "撤销股权激励计划公告"
      },
      {
        index: 93,
        content: "收购出售资产/股权"
      },
      {
        index: 94,
        content: "暂停上市"
      },
      {
        index: 95,
        content: "暂停上市风险提示"
      },
      {
        index: 96,
        content: "月度经营情况"
      },
      {
        index: 97,
        content: "权益分派及限制出售股份上市"
      },
      {
        index: 98,
        content: "权益变动报告书"
      },
      {
        index: 99,
        content: "法定代表人变更"
      },
      {
        index: 100,
        content: "法律意见书"
      },
      {
        index: 101,
        content: "深交所一般公告"
      },
      {
        index: 102,
        content: "深交所问询函"
      },
      {
        index: 103,
        content: "澄清、风险提示、业绩预告事项"
      },
      {
        index: 104,
        content: "澄清公告"
      },
      {
        index: 105,
        content: "特别处理和退市"
      },
      {
        index: 106,
        content: "独立董事候选人声明"
      },
      {
        index: 107,
        content: "独立董事提名人声明"
      },
      {
        index: 108,
        content: "独立董事述职报告"
      },
      {
        index: 109,
        content: "监事会决议公告"
      },
      {
        index: 110,
        content: "第一季度季报"
      },
      {
        index: 111,
        content: "签订协议"
      },
      {
        index: 112,
        content: "管理办法/制度"
      },
      {
        index: 113,
        content: "终止上市"
      },
      {
        index: 114,
        content: "股东/实际控制人变更"
      },
      {
        index: 115,
        content: "股东/实际控制人股份减持"
      },
      {
        index: 116,
        content: "股东/实际控制人股份增持"
      },
      {
        index: 117,
        content: "股东大会"
      },
      {
        index: 118,
        content: "股东大会决议公告"
      },
      {
        index: 119,
        content: "股东大会资料"
      },
      {
        index: 120,
        content: "股份质押、冻结"
      },
      {
        index: 121,
        content: "股本变动"
      },
      {
        index: 122,
        content: "股权变动"
      },
      {
        index: 123,
        content: "股权激励其他事项公告"
      },
      {
        index: 124,
        content: "股权激励对象名单"
      },
      {
        index: 125,
        content: "股权激励行权价（数量）调整"
      },
      {
        index: 126,
        content: "股权激励计划"
      },
      {
        index: 127,
        content: "股权激励计划摘要"
      },
      {
        index: 128,
        content: "股权激励进展公告"
      },
      {
        index: 129,
        content: "股权转让"
      },
      {
        index: 130,
        content: "股票交易异常波动"
      },
      {
        index: 131,
        content: "自查报告"
      },
      {
        index: 132,
        content: "致歉公告"
      },
      {
        index: 133,
        content: "获得补贴（资助）"
      },
      {
        index: 134,
        content: "获得认证"
      },
      {
        index: 135,
        content: "董事会决议公告"
      },
      {
        index: 136,
        content: "补充及更正"
      },
      {
        index: 137,
        content: "要约收购报告书"
      },
      {
        index: 138,
        content: "要约收购报告书摘要"
      },
      {
        index: 139,
        content: "规则"
      },
      {
        index: 140,
        content: "议事规则/实施细则"
      },
      {
        index: 141,
        content: "诉讼仲裁"
      },
      {
        index: 142,
        content: "调研活动"
      },
      {
        index: 143,
        content: "资产重组债权人会议"
      },
      {
        index: 144,
        content: "资金占用"
      },
      {
        index: 145,
        content: "违法违规"
      },
      {
        index: 146,
        content: "通知债权人公告"
      },
      {
        index: 147,
        content: "配股"
      },
      {
        index: 148,
        content: "配股提示性公告"
      },
      {
        index: 149,
        content: "配股预案"
      },
      {
        index: 150,
        content: "重大事故损失"
      },
      {
        index: 151,
        content: "重大合同"
      },
      {
        index: 152,
        content: "重组进展公告"
      },
      {
        index: 153,
        content: "问询函"
      },
      {
        index: 154,
        content: "限售股份上市流通"
      },
      {
        index: 155,
        content: "首发提示性公告"
      },
      {
        index: 156,
        content: "首次公开发行及上市"
      },
      {
        index: 157,
        content: "高管人员任职变动"
      },
      {
        index: 158,
        content: "高管人员持股变动"
      }
    ],
    init: function (ops) {
      M.path = 'http://10.25.24.51:10188/';
      //			M.path = 'http://10.25.24.51:8189/';


      var list = [];
      $("#keyword").on('keyup', function () {
        //正则表达式
        var reg = new RegExp("[`~!%@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
        //获取输入框中的值
        var username = document.getElementById("keyword").value.trim();
        //判断输入框中有内容
        if (reg.test(username)) {
          //输入非法字符，清空输入框
          $("#keyword").val("");
        }
      });
      // ----------搜索code ---s
      //高级搜索展开
      var $advancedSearch = $('#advancedSearch');
      var $searchShow = $('.searchShow');
      $advancedSearch.on('click', function () {
        $searchShow.slideToggle();
      });
      $("#Stock_Info_text").val("");
      this.custid = this.query('eventId') || '';
      this.secCode = this.query('secCode') || '';
      M('#eventId').val(this.custid);
      M('#secCode').val(this.secCode);
      this._id('warper').style.display = 'block';

      
      this.add([{
        name: 'month_start',
        id: 'month_start'
      }, {
        name: 'month_stop',
        id: 'month_stop'
      }]);
      this.add([{
        name: 'month_start_two',
        id: 'month_start_two'
      }, {
        name: 'month_stop_two',
        id: 'month_stop_two'
      }]);
      this.add([{
      name: 'month_start_three',
      id: 'month_start_three'
      }, {
      name: 'month_stop_three',
      id: 'month_stop_three'
      }]);


      //日期选择
      var today = new Date();
      var date_1 = new Date();
      var date_2 = new Date();
      date_1.setMonth(date_1.getMonth());
      date_2.setMonth(date_2.getMonth() - 1);

      //M('#month_start').val(M.format(date_3, 'yyyy-MM-dd'));
      var sDate = M.format(date_1, 'yyyy-MM-dd');
      var sDate_2 = M.format(date_2, 'yyyy-MM-dd');
      this.beginTime = this.query('beginTime') || sDate;
      this.beginTime_Two = this.query('beginTime') || sDate_2;
      var date = today.setDate(today.getDate() + 1);

      console.log(date);
      this.endTime = this.query('endTime') || M.format(today, 'yyyy-MM-dd');
      //			this.endTime = this.query('endTime') || M.format(today, 'yyyy-MM-dd');

      var that = this;



      
      // //日期选择
      // var today_1 = new Date();
      // var data_2 = new Date();
      // data_2.setMonth(data_2.getMonth()-2);

      // //M('#month_start').val(M.format(date_3, 'yyyy-MM-dd'));
      // var sDate_1 = M.format(data_2, 'yyyy-MM-dd');

      // this.beginTime_1 = this.query('beginTime') || sDate_1;
      // var date = today_1.setDate(today_1.getDate());

      // console.log(date);
      // this.endTime_1 = this.query('endTime') || M.format(today_1, 'yyyy-MM-dd');


      var temp = "";
      for (var i = 0, len = that.risk_type_data.length; i < len; i++) {
        temp += ('<li>' + that.risk_type_data[i] + '</li>')
      }
      temp += "<li class='yes'>确定</li>";
      // temp += "<li class='no'>取消</li>";
      var $risk = $('.risk_type_data');
      var $risk_type = $('#Risk_Type');
      $risk.html(temp);
      $risk.on('click', 'li', function () {
        // $risk_type.val($(this).html());
        // $risk.fadeOut()
        if ($(this).text() != "确定") {
          $(this).toggleClass('addC');
        }
      });

      //确定按钮
      $risk.on('click', 'li.yes', function () {
        let parent = $(this).parent().parent().parent();
        var li = $(this).parent().children();
        var html = '';
        for (let i = 0, len = li.length; i < len; i++) {
          if ($(li[i]).hasClass('addC')) {
            if ($(li[i]).text() == "确定") {
              $(this).parent().fadeOut();
              return false;
            }
            html += $(li[i]).text() + ",";
          }
        }
        var risktype = html.substring(0, html.length - 1);
        risktype = risktype.replace(',确定,', '');
        $risk_type.val(risktype);
        $(this).parent().fadeOut();
        var par = {
          Risk_Type: risktype
        };
        that.sel(par);
      });
      $risk_type.focus(function () {
        $risk.fadeIn()
      });
      // $risk_type.blur(function(){
      //     $risk.fadeOut()
      // });

      temp = null;
      // var betime=format(new date(),"yyyy-MM-dd");
      that.month_start = M.ui.calendar.init({

        target: this.node.month_start,
        date: {
          min: '2016-01-01',
          select: that.beginTime,
          max: 'now',
          //					format: 'yyyy-MM-dd'
        },
        time: {
          enabled: false
        },
        auto: true,
        number: 2,
        toggle: 2,
        tool: {
          clear: false,
          today: false
        },

        choose: function (tha) {}
      });
      that.month_start_two = M.ui.calendar.init({

        target: this.node.month_start_two,
        date: {
          min: '2016-01-01',
          select: that.beginTime_Two,
          max: 'now',
          //					format: 'yyyy-MM-dd'
        },
        time: {
          enabled: false
        },
        auto: true,
        number: 2,
        toggle: 2,
        tool: {
          clear: false,
          today: false
        },

        choose: function (tha) { }
      });
            that.month_start_three = M.ui.calendar.init({

              target: this.node.month_start_three,
              date: {
                min: '2016-01-01',
                select: that.beginTime_Two,
                max: 'now',
                //					format: 'yyyy-MM-dd'
              },
              time: {
                enabled: false
              },
              auto: true,
              number: 2,
              toggle: 2,
              tool: {
                clear: false,
                today: false
              },

              choose: function (tha) {}
            });

      that.month_stop = M.ui.calendar.init({
        target: this.node.month_stop,
        date: {
          min: '2016-01-01',
          select: that.endTime,
          max: '2020-01-01'
        },
        time: {
          enabled: false
        },
        auto: true,
        number: 2,
        toggle: 2,
        tool: {
          clear: false,
          today: false
        },

        choose: function (tha) {}
      });
      that.month_stop_two = M.ui.calendar.init({
        target: this.node.month_stop_two,
        date: {
          min: '2016-01-01',
          select: that.beginTime,
          max: '2020-01-01'
        },
        time: {
          enabled: false
        },
        auto: true,
        number: 2,
        toggle: 2,
        tool: {
          clear: false,
          today: false
        },

        choose: function (tha) { }
      });
      that.month_stop_three = M.ui.calendar.init({
        target: this.node.month_stop_three,
        date: {
          min: '2016-01-01',
          select: that.beginTime,
          max: '2020-01-01'
        },
        time: {
          enabled: false
        },
        auto: true,
        number: 2,
        toggle: 2,
        tool: {
          clear: false,
          today: false
        },

        choose: function (tha) {}
      });

      var opt = {
        export: 0,
        stock_info: '',
        num: ''
      };
      that.sel(opt);

      M('#btnSelect').click(function () {
        that.custid = '';
        //资产名称
        that.pageNum = 1;
        var $Stock_Info_text = M('#Stock_Info').val() || "";
        var opt = {
          export: 0,
          // stock_info : $Stock_Info.val().lastIndexOf(' ') == -1 ? $Stock_Info.val().slice(0): $Stock_Info.val().slice($Stock_Info.val().lastIndexOf(' ')+1),
          stock_info: $Stock_Info_text.split(' ')[0],
          num: 1
        };
        that.sel(opt);
      });
      M('.btn_nextPage').click(function () {
        that.pageNum++;
        that.sel(opt);
      });
      M('#btnExport').click(function () {
        var opt = {
          export: 1,
          stock_info: '',
          num: ''
        };
        that.sel(opt);
      });
      //页面中输入框的ID查找
      //资产名称
      var $stock_info = M('#Stock_Info');
      //资产类型
      var $assets_Code = M('#assets_Code');
      //公告来源
      var $announcement_Code = M('#announcement_Code');
      //市场类型
      var $market_Code = M('#market_Code');
      //公告类型
      var $public_Code = M('#public_Code');
      //风险类型
      var $risk_Type = M('#Risk_Type');
      // 页面中资产类型输入框获得信息
      var $risk_type_data = M('.assets_code_data');
      $assets_Code.focus(function (e) {
        var par = {
          notice_type: $public_Code.val() || '',
          stock_type: 1,
          market_type: $market_Code.val() || '',
          notice_source: $announcement_Code.val() || ''
        };
        that.resolve(M.path + 'api/rest/nlp/Credit_Announce/query_notice_factor', par, function (data) {
          var result = data.result.factor_list;
          var temp = "";
          for (var i = 0, len = result.length; i < len; i++) {
            temp += ('<li>' + result[i] + '</li>')
          }
          $risk_type_data.html(temp);
          $risk_type_data.fadeIn();
        }, undefined, 'get');
      });
      var codelist = [];
      $risk_type_data.on('click', 'li', function () {
        $(".shadowDown").html(' ');
        console.log(this);
        $assets_Code.val($(this).html());
        $risk_type_data.fadeOut()
        var type = $("#assets_Code").val();
        var url = "http://10.25.24.51:10191/api/rest/nlp/query_stock_list?stock_type=F";
        if (type != "") {
          url = 'http://10.25.24.51:10191/api/rest/nlp/query_stock_list?stock_type=' + type;
        }
        that.ajaxGet('http://10.25.24.51:10191/api/rest/nlp/query_stock_list?stock_type=' + type, function (data) {
          for (var i = 0; i < data.result.stock_list.length; i++) {
            var newel = {
              index: i,
              content: data.result.stock_list[i]
            };
            codelist.push(newel);
          }
        });
      });
      $assets_Code.blur(function () {
        $risk_type_data.fadeOut()
      });
      //公告来源输入框获得信息
      var $announcement_code_data = M('.announcement_code_data');
      $announcement_Code.focus(function (e) {
        var par = {
          notice_type: $public_Code.val() || '',
          stock_type: $stock_info.val() || '',
          market_type: $market_Code.val() || '',
          notice_source: 1
        };
        that.resolve(M.path + 'api/rest/nlp/Credit_Announce/query_notice_factor', par, function (data) {
          var result = data.result.factor_list;
          var temp = "";
          for (var i = 0, len = result.length; i < len; i++) {
            temp += ('<li>' + result[i] + '</li>')
          }
          $announcement_code_data.html(temp);
          $announcement_code_data.fadeIn();
        }, undefined, 'get');
      });
      $announcement_code_data.on('click', 'li', function () {
        $announcement_Code.val($(this).html());
        $announcement_code_data.fadeOut()
      });
      $announcement_Code.blur(function () {
        $announcement_code_data.fadeOut()
      });
      //市场类型输入框获得信息
      var $market_code_data = M('.market_code_data');
      $market_Code.focus(function (e) {
        var par = {
          notice_type: $public_Code.val() || '',
          stock_type: $stock_info.val() || '',
          market_type: 1,
          notice_source: $announcement_Code.val() || ''
        };
        that.resolve(M.path + 'api/rest/nlp/Credit_Announce/query_notice_factor', par, function (data) {
          var result = data.result.factor_list;
          var temp = "";
          for (var i = 0, len = result.length; i < len; i++) {
            temp += ('<li>' + result[i] + '</li>')
          }
          $market_code_data.html(temp);
          $market_code_data.fadeIn();
        }, undefined, 'get');
      });
      $market_code_data.on('click', 'li', function () {
        $market_Code.val($(this).html());
        $market_code_data.fadeOut()
      });
      $market_Code.blur(function () {
        $market_code_data.fadeOut()
      });

      $public_Code.bSelectPage({
        showField: 'content',
        keyField: 'index',
        data: that.dataPublic,
        formatItem: function (data) {
          return data.content;
        }
      });
      // $risk_Type.bSelectPage({
      //   showField: 'content',
      //   keyField: 'content',
      //   data: that.risk_type,
      //   formatItem: function (data) {
      //     return data.content;
      //   }
      // });

    },
    
    sel: function (opt) {
      var that = this;
      var $public = M('#public_Code_text');
      var $mycheck = M('#myCheck');
      var par = {
        Checked: $mycheck.prop('checked') == true ? 1 : '',
        Risk_Type: M('#Risk_Type').val() || '',
        Stock_Info: opt.stock_info,
        page: opt.num || that.pageNum,
        pageSize: 50,
        from_Date: M('#month_start').val() || '',
        // from_Date: M('#month_start_two').val() || '',
        // from_Date: M('#month_start_three').val() || '',

        to_Date: M('#month_stop').val() || '',
        // to_Date: M('#month_stop_two').val() || '',
        // to_Date: M('#month_stop_three').val() || '',

        keyword: M('#keyword').val() || '',
        market_type: M('#market_Code').val() || '',
        notice_source: M('#announcement_Code').val() || '',
        Stock_Type: M('#assets_Code').val() || '',
        Export: opt.export || 0,
        notice_type: $public.val() || '',
      };

      that.resolve(M.path + 'api/rest/nlp/Credit_Announce/query', par, function (data) {
        var d = data.result.Announce_List;
        list = data.result.Announce_List;
        var str = '';
        var url = '';
        for (var i = 0, len = d.length; i < len; i++) {
          d[i].notice_date = M.format(new Date(d[i].notice_date), 'yyyy-MM-dd hh:mm:ss');
          if (d[i].file_url) {
            url = d[i].file_url;
          } else {
            url = "javascript:void(0)";
          }

          str += M.template.resolve('<tr>\
									<td>{{notice_date}}</td>\
									<td>{{Stock_Code}} {{Stock_Name}}</td>\
                  <td class="y-td titleclick"><a href=' + url + ' target="_blank">{{notice_title}}</a>\
                  <div class="detail" style="display:none">{{notice_detail}}</div>\
									</td>\
									<td>{{notice_type}}</td>\
									<td class="risk_parent">\
									    <p class="risk_p">{{Risk_Type}}</p>\
										<div class="modify">\
                      <span style="display: none" class="id">{{notice_id}}</span>\
                      <p class="modify_p">修改</p>\
											<span class="createSpan">修改</span>\
											<ul class="modify_ul"></ul>\
										</div>\
									</td>\
                  <td>{{notice_source}}</td>\
                  <td class="risk_parent btn">\
                <div class="modify btn">\
                <p class="Stock_Code" style="display:none">{{Stock_Code}}</p>\
                <p class="Risk_Type" style="display:none">{{Risk_Type}}</p>\
                <p class="Stock_Type" style="display:none">{{Stock_Type}}</p>\
                <p class="notice_source" style="display:none">{{notice_source}}</p>\
                <p class="Stock_Name" style="display:none">{{Stock_Name}}</p>\
                <p class="zq_lv" style="display:none">{{zq_lv}}</p>\
                <p class="zq_rzbl" style="display:none">{{zq_rzbl}}</p>\
                <p class="zq_rz" style="display:none">{{zq_rz}}</p>\
                  <p class="modify_p">统计结果</p>\
                  <span class="createSpan">统计结果</span>\
                </div>\
              </td>\
                </tr>', d[i]);
               
        }
        M('#detailData')[0].innerHTML = str;
        M.ellipsisToggle();
        M('[data-href]').click(function () {
          var el = this;
          var beginTime = M('#month_start').val();
          // var beginTime_Two = M('#month_start_two').val();
          // var beginTime_three = M('#month_start_three').val();

          window.open(el.dataset.href + '&beginTime=' + beginTime + '&endTime=' + endTime);
          // window.open(el.dataset.href + '&beginTime=' + beginTime_Two + '&endTime=' + endTime);
          // window.open(el.dataset.href + '&beginTime=' + beginTime_three + '&endTime=' + endTime);
        });
        M('.btn').click(function () {
          var code = $(this).find(".Stock_Code").html();
          var risktype = $(this).find(".Risk_Type").html().trim().replace(/ /g, ',');
          var stocktype = $(this).find(".Stock_Type").html();
          var stockname = $(this).find(".Stock_Name").html();
          var notice_source = $(this).find(".notice_source").html();
          window.location.href = "/static/event/creditinfo.html?Stock_Code=" + code + "&Risk_Type=" + risktype + "&Stock_Type=" + stocktype + "&Stock_Name=" + stockname + "&notice_source=" + notice_source;
        });

        //惠新添加的内容
        var $notice_dan = M('.notice_dan')
        var $warper = M('.warper')
        var $stock_p = M('.stock_p')
        $notice_dan.on('click',function () {
          $(this).css('color','#B50229').siblings().css('color','#000')
          $warper.show()
          $stock_p.hide()
        })
        // 点击标的证券池，切换到标的证券池页面
        var $stock_pool = M('.stock_pool')
        $stock_pool.on('click',function () {
          $(this).css('color', '#B50229').siblings().css('color', '#000')
          $warper.hide()
          $stock_p.show()
          $.ajax({
            type: 'get',
            url: 'http://10.25.24.51:10197/api/credit/rzrq_bd',
            data: {
              start_date: $('#month_start_two').val(),
              end_date: '',
              // markettype: $('#exchange_down').val() == '全部' ? '' : $('#exchange_down').val(),
              companyname: $('#select_down_title').val() == '全部' ? '' : $('#select_down_title').val(),
              securitycode: $('#Security_name').val(),
              page: 0,
              pagesize: 10
            },
            success: function (data) {
              // console.log(data.result.resultlist)
              var data = data.result
              console.log(data)
              // console.log(list)
              var html = template('test', data)
              document.getElementById('detailData_two').innerHTML = html;
              isExportExcel = true;

              console.log(data.total_count)

              // var zongshu = 3000000
              // $.ajax({
              //   type: 'get',
              //   url: 'http://10.25.24.51:10189/api/credit/rzrq_bd',
              //   data: {
              //     start_date: $('#month_start_two').val(),
              //     end_date: $('#month_stop_two').val(),
              //     markettype: $('#exchange_down').val() == '全部' ? '' : $('#exchange_down').val(),
              //     companyname: $('#select_down_title').val() == '全部' ? '' : $('#select_down_title').val(),
              //     securitycode: $('#Security_name').val(),
              //     page: 0,
              //     pagesize: zongshu
              //   },
              //   success: function (data) {
              //     console.log(data)
              //     var data = data.result
              //     var html = template('test', data)
              //     document.getElementById('detailData_two_one').innerHTML = html;
              //   }
              // })

              $('#box').paging({
                initPageNo: 1, // 初始页码
                totalPages: Math.ceil(data.total_count / 10), //总页数
                totalCount: '合计' + data.total_count + '条数据', // 条目总数
                slideSpeed: 600, // 缓动速度。单位毫秒
                jump: true, //是否支持跳转
                callback: function (page) { // 回调函数
                  console.log(page);
                  currentpage = page - 1
                  fanice(currentpage)
                }
              })

            }
          })
          $.ajax({
            type: 'get',
            url: 'http://10.25.24.51:10197/api/credit/rzrq_guarantee',
            data: {
              start_date: $('#month_start_three').val(),
              end_date: '',
              // markettype: $('#exchange_down_two').val() == '全部' ? '' : $('#exchange_down_two').val(),
              companyname: $('#select_down_title_two').val() == '全部' ? '' : $('#select_down_title_two').val(),
              securitycode: $('#Security_name_two').val(),
              import: '',
              page: 0,
              pagesize: 10
            },
            success: function (data) {
              console.log(data)
              var data = data.result
              var html = template('test_one', data)
              document.getElementById('detailData_three').innerHTML = html;
              isExportExcel = true

              // var xinbanzongshu = 200000
              // $.ajax({
              //   type: 'get',
              //   url: 'http://10.25.24.51:10189/api/credit/rzrq_guarantee',
              //   data: {
              //     start_date: $('#month_start_three').val(),
              //     end_date: $('#month_stop_three').val(),
              //     markettype: $('#exchange_down_two').val() == '全部' ? '' : $('#exchange_down_two').val(),
              //     companyname: $('#select_down_title_two').val() == '全部' ? '' : $('#select_down_title_two').val(),
              //     securitycode: $('#Security_name_two').val(),
              //     import: '',
              //     page: 0,
              //     pagesize: xinbanzongshu
              //   },
              //   success: function (data) {
              //     var data = data.result
              //     var html = template('test_one', data)
              //     document.getElementById('detailData_three_two').innerHTML = html;
              //   }
              // })
              $('#box_one').paging({
                initPageNo: 1, // 初始页码
                totalPages: Math.ceil(data.total_count / 10), //总页数
                totalCount: '合计' + data.total_count + '条数据', // 条目总数
                slideSpeed: 600, // 缓动速度。单位毫秒
                jump: true, //是否支持跳转
                callback: function (page) { // 回调函数
                  console.log(page);
                  Flushing = page - 1
                  guaran(Flushing)
                }
              })

            }

          })


        })

        $('.marginbond').on('click',function(){
          $(this).addClass('triger')
          $('.bond').removeClass('triger')
          $('.stock_table').show()
          $('.stock_table_one').show()
          $('.security').hide()
        })
        $('.bond').on('click',function(){
          $(this).addClass('triger')
          $('.marginbond').removeClass('triger')
          $('.stock_table_one').hide()
          $('.security').show()
          $('.searchShow').hide()

        })
        //点击查询按钮，进行ajax请求，首先获取参数
        $('#finance_btnSelect').on('click',function(){
          console.log($('#select_down_title').val())
          // console.log($('#exchange_down').val())
          console.log($('#Security_name').val())
          console.log($('#month_start_two').val())
          console.log($('#month_stop_two').val())
          $.ajax({
            type:'get',
            url:'http://10.25.24.51:10197/api/credit/rzrq_bd',
            data:{
              start_date: $('#month_start_two').val(),
              end_date: $('#month_stop_two').val(),
              // markettype: $('#exchange_down').val() == '全部' ? '' : $('#exchange_down').val(),
              companyname: $('#select_down_title').val() == '全部' ? '' : $('#select_down_title').val(),
              securitycode: $('#Security_name').val(),
              page:0,
              pagesize:10
            },
            success:function (data) {
              // console.log(data.result.resultlist)
              var data = data.result
              console.log(data)
              // console.log(list)
              var html = template('test',data)
              document.getElementById('detailData_two').innerHTML = html;
              isExportExcel = true;

              console.log(data.total_count)

        //  var zongshu = 3000000
        //       $.ajax({
        //         type: 'get',
        //         url: 'http://10.25.24.51:10189/api/credit/rzrq_bd',
        //         data: {
        //           start_date: $('#month_start_two').val(),
        //           end_date: $('#month_stop_two').val(),
        //           markettype: $('#exchange_down').val() == '全部' ? '' : $('#exchange_down').val(),
        //           companyname: $('#select_down_title').val() == '全部' ? '' : $('#select_down_title').val(),
        //           securitycode: $('#Security_name').val(),
        //           page: 0,
        //           pagesize: zongshu 
        //         },
        //         success:function(data){
        //           console.log(data)
        //           var data = data.result
        //           var html = template('test', data)
        //           document.getElementById('detailData_two_one').innerHTML = html;
        //         }
        //       })
           
              $('#box').paging({
                initPageNo: 1, // 初始页码
                totalPages: Math.ceil(data.total_count / 10), //总页数
                totalCount: '合计' + data.total_count + '条数据', // 条目总数
                slideSpeed: 600, // 缓动速度。单位毫秒
                jump: true, //是否支持跳转
                callback: function (page) { // 回调函数
                  console.log(page);
                  currentpage = page - 1
                  fanice(currentpage)
                }
              })

            }
          })
        })
  var currentpage = '';

        function fanice(currentpage) {
          $.ajax({
            type: 'get',
            url: 'http://10.25.24.51:10197/api/credit/rzrq_bd',
            data: {
              start_date: $('#month_start_two').val(),
              end_date:  $('#month_stop_two').val(),
              // markettype: $('#exchange_down').val() == '全部' ? '' : $('#exchange_down').val(),
              companyname: $('#select_down_title').val() == '全部' ? '' : $('#select_down_title').val(),
              securitycode: $('#Security_name').val(),
              page: currentpage || 0,
              pagesize: 10
            },
            success: function (data) {
              // console.log(data.result.resultlist)
              var data = data.result
              console.log(data)
              // console.log(list)
              var html = template('test', data)
              document.getElementById('detailData_two').innerHTML = html;
              isExportExcel = true
            }
          })
        }

        function guaran(Flushing) {
          $.ajax({
            type: 'get',
            url: 'http://10.25.24.51:10197/api/credit/rzrq_guarantee',
            data: {
              start_date: $('#month_start_three').val(),
              end_date: $('#month_stop_three').val(),
              // markettype: $('#exchange_down_two').val() == '全部' ? '' : $('#exchange_down_two').val(),
              companyname: $('#select_down_title_two').val() == '全部' ? '' : $('#select_down_title_two').val(),
              securitycode: $('#Security_name_two').val(),
              import: '',
              page: Flushing || 0,
              pagesize: 10
            },
            success: function (data) {
              console.log(data)
              var data = data.result
              var html = template('test_one', data)
              document.getElementById('detailData_three').innerHTML = html;
              isExportExcel = true
            }

          })
          
        }
        var Flushing = ''
        $('#finance_btnSelect_two').on('click',function(){
          console.log( $('#month_stop_three').val())
          console.log( $('#month_start_three').val())
          $.ajax({
            type:'get',
            url: 'http://10.25.24.51:10197/api/credit/rzrq_guarantee',
            data:{
              start_date: $('#month_start_three').val(),
              end_date: $('#month_stop_three').val(),
              // markettype: $('#exchange_down_two').val() == '全部' ? '' : $('#exchange_down_two').val(),
              companyname: $('#select_down_title_two').val() == '全部' ? '' : $('#select_down_title_two').val(),
              securitycode: $('#Security_name_two').val(),
              import:'',
              page:0,
              pagesize:10
            },
            success:function (data) {
              console.log(data)
              var data = data.result
              var html = template('test_one',data)
              document.getElementById('detailData_three').innerHTML = html;
              isExportExcel = true

              // var xinbanzongshu = 200000
              // $.ajax({
              //   type: 'get',
              //   url: 'http://10.25.24.51:10189/api/credit/rzrq_guarantee',
              //   data: {
              //     start_date: $('#month_start_three').val(),
              //     end_date: $('#month_stop_three').val(),
              //     markettype: $('#exchange_down_two').val() == '全部' ? '' : $('#exchange_down_two').val(),
              //     companyname: $('#select_down_title_two').val() == '全部' ? '' : $('#select_down_title_two').val(),
              //     securitycode: $('#Security_name_two').val(),
              //     import: '',
              //     page: 0,
              //     pagesize: xinbanzongshu
              //   },
              //   success:function(data){
              //     var data = data.result
              //     var html = template('test_one', data)
              //     document.getElementById('detailData_three_two').innerHTML = html;
              //   }
              // })
              $('#box_one').paging({
                initPageNo: 1, // 初始页码
                totalPages: Math.ceil(data.total_count / 10), //总页数
                totalCount: '合计' + data.total_count + '条数据', // 条目总数
                slideSpeed: 600, // 缓动速度。单位毫秒
                jump: true, //是否支持跳转
                callback: function (page) { // 回调函数
                  console.log(page);
                  Flushing = page - 1
                  guaran(Flushing)
                }
              })

            }

          })
        })

      // var isExportExcel = true
      $('#export').on('click',function(){
        var begin = $('#month_start_two').val()
        var stop = $('#month_stop_two').val()
        // var markettype = $('#exchange_down').val() == '全部' ? '' : $('#exchange_down').val()
        var companyname = $('#select_down_title').val() == '全部' ? '' : $('#select_down_title').val()
        var securitycode = $('#Security_name').val()
        window.location.href = 'http://10.25.24.51:10197/api/credit/rzrq_bd?start_date='+begin+'&end_date='+stop+'&companyname='+companyname+'&securitycode='+securitycode+'&page=0&export=1'})


        $('#export_two').on('click', function () {
          var start = $('#month_start_three').val()
          var stop = $('#month_stop_three').val()
          // var markettype = $('#exchange_down_two').val() == '全部' ? '' : $('#exchange_down_two').val()
          var companyname = $('#select_down_title_two').val() == '全部' ? '' : $('#select_down_title_two').val()
          var securitycode = $('#Security_name_two').val()
          window.location.href = 'http://10.25.24.51:10197/api/credit/rzrq_guarantee?start_date='+start+'&end_date='+stop+'&companyname='+companyname+'&securitycode='+securitycode+'&page=0&export=1'
          // console.log(isExportExcel)
          
          // console.log('导出的项')
          // if (!isExportExcel) return;
          // function getExplorer() {
          //   let explorer = window.navigator.userAgent;
          //   //ie
          //   if (explorer.indexOf("MSIE") >= 0) {
          //     return 'ie';
          //   }
          //   //firefox
          //   else if (explorer.indexOf("Firefox") >= 0) {
          //     return 'Firefox';
          //   }
          //   //Chrome
          //   else if (explorer.indexOf("Chrome") >= 0) {
          //     return 'Chrome';
          //   }
          //   //Opera
          //   else if (explorer.indexOf("Opera") >= 0) {
          //     return 'Opera';
          //   }
          //   //Safari
          //   else if (explorer.indexOf("Safari") >= 0) {
          //     return 'Safari';
          //   }
          // }
          // function method1(tableid) { //整个表格拷贝到EXCEL中
          //   if (getExplorer() == 'ie') {
          //     var curTbl = document.getElementById(tableid);
          //     var oXL = new ActiveXObject("Excel.Application");
          //     console.log(222)
          //     //创建AX对象excel
          //     var oWB = oXL.Workbooks.Add();
          //     //获取workbook对象
          //     var xlsheet = oWB.Worksheets(1);
          //     //激活当前sheet
          //     var sel = document.body.createTextRange();
          //     sel.moveToElementText(curTbl);
          //     //把表格中的内容移到TextRange中
          //     sel.select;
          //     //全选TextRange中内容
          //     sel.execCommand("Copy");
          //     //复制TextRange中内容
          //     xlsheet.Paste();
          //     //粘贴到活动的EXCEL中
          //     oXL.Visible = true;
          //     //设置excel可见属性

          //     try {
          //       var fname = oXL.Application.GetSaveAsFilename("Excel.xls", "Excel Spreadsheets (*.xls), *.xls");
          //     } catch (e) {
          //       print("Nested catch caught " + e);
          //     } finally {
          //       oWB.SaveAs(fname);

          //       oWB.Close(savechanges = false);
          //       //xls.visible = false;
          //       oXL.Quit();
          //       oXL = null;
          //       //结束excel进程，退出完成
          //       //window.setInterval("Cleanup();",1);
          //       idTmr = window.setInterval("Cleanup();", 1);
          //     }
          //   } else {
          //     tableToExcel('ta')
          //   }
          // }
          // function Cleanup() {
          //   window.clearInterval(idTmr);
          //   CollectGarbage();
          // }
          // var tableToExcel = (function () {
          //   var uri = 'data:application/vnd.ms-excel;base64,',
          //     template =
          //       '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
          //     base64 = function (s) {
          //       return window.btoa(unescape(encodeURIComponent(s)))
          //     },
          //     // 下面这段函数作用是：将template中的变量替换为页面内容ctx获取到的值
          //     format = function (s, c) {
          //       return s.replace(/{(\w+)}/g,
          //         function (m, p) {
          //           return c[p];
          //         }
          //       )
          //     };
          //   return function (table, name) {
          //     if (!table.nodeType) {

          //       table = document.getElementById('table_three')

          //       console.log(table)
          //     }
          //     // 获取表单的名字和表单查询的内容
          //     var ctx = {
          //       worksheet: name || 'Worksheet',
          //       table: table.innerHTML
          //     };
          //     // format()函数：通过格式操作使任意类型的数据转换成一个字符串
          //     // base64()：进行编码
          //     window.location.href = uri + base64(format(template, ctx))
          //   }
          // })()
          // method1('ta');

        })

       
        //页面中修改的操作
        var $modify = M('.modify');
        for (var i = 0, len = $modify.length; i < len; i++) {
          if ($($modify[i]).parent('td').text().replace(/\s/g, "").slice(5) == '修改修改' || $($modify[i]).parent('td').text().replace(/\s/g, "").slice(5) == '改修改') {
            $($modify[i]).find('p').show();
            $($modify[i]).find('span').hide();
          }
        }

        //页面中第二个修改的操作
        let span = M('.createSpan');
        for (var i = 0, len = span.length; i < len; i++) {
          $(span[i]).on('click', function () {
            that.hideU();
            var temp = "";
            for (var i = 0, len = that.risk_type_data.length; i < len; i++) {
              temp += ('<li>' + that.risk_type_data[i] + '</li>')
            }
            temp += "<li class='yes'>确定</li>";
            temp += "<li class='no'>取消</li>";
            if ($(this).next().html() == '') $(this).next().append(temp).show();
            else $(this).next().show();
            $(".modify_ul li").removeClass("addC");
            var typelist = $(this).parent().parent().parent().find('p.risk_p').html().trim().split(' ');
            var html = $(".modify_ul li");
            for (var i = 0, len = html.length; i < len; i++) {
              for (var j = 0, len2 = typelist.length; j < len2; j++)
                if (html[i].innerHTML.trim() == typelist[j].trim()) {
                  $(".modify_ul li").eq(i).addClass("addC");;
                }
            }
          })
        }

        $modify.on('click', 'p', function () {
          var $risk = $(this).next().next();
          that.hideU();
          if ($risk.children().length >= 1) {
            $risk.show();
            return;
          };
          var temp = "";
          for (var i = 0, len = that.risk_type_data.length; i < len; i++) {
            temp += ('<li>' + that.risk_type_data[i] + '</li>')
          }
          temp += "<li class='yes'>确定</li>";
          $risk.append(temp).show();
        });

        $modify.on('click', 'li', function () {
          $(this).toggleClass('addC');
        });

        //失去焦点时,ul消失


        //确定按钮
        $modify.on('click','li.no',function(){
          // alert(111)
          let parents = $(this).parent();
          parents.hide()
        })
        $modify.on('click', 'li.yes', function () {
          let parent = $(this).parent().parent().parent();
          let id = parent.find('span.id').text();
          let _p = parent.find('p.modify_p');
          let span = parent.find('span.createSpan');
          let p = parent.find('p.risk_p');

          var li = $(this).parent().children();
          var str = '';
          for (let i = 0, len = li.length; i < len; i++) {
            if ($(li[i]).hasClass('addC')) {
              str += $(li[i]).text() + " ";
            } else {
              $(_p).show();
              $(span).hide();
            }
          }
          if (str == "确定") {
            $(_p).hide();
          } else {
            p.text(str.replace('确定', '').trim());
            $(".Risk_Type").html(str.replace('确定', '').trim());
            $(this).parent().fadeOut();
            if (p.text().replace(' ', '')) {
              $(_p).hide();
              $(span).show()
            }
            var par = {
              Announce_Id: id,
              Risk_Type: p.text().trim() == ' ' ? p.text().replace(" ", '') : p.text().trim()
            };
            that.resolve(M.path + 'api/rest/nlp/Credit_Announce/Update_Risktype', par, function (data) {}, undefined, 'get');
          }
        });

        that.page = M.ui.page.init({
          container: this.node.page,
          // container:data.result.Page_Count,
          total: data.result.Total_Count == '' ? (data.result.Page_Count * 10) : (data.result.Total_Count),
          items: 50,
          number: 8,
          isInput: true,
          isText: true,
          current: that.pageNum - 1,
          callback: function (tha) {
            that.pageNum = this.ops.current + 1;
            var $Stock_Info = M('#Stock_Info').val() || "";
            var opt = {
              export: 0,
              stock_info: $Stock_Info.lastIndexOf(' ') == -1 ? $Stock_Info.slice(0) : $Stock_Info.slice($Stock_Info.lastIndexOf(' ') + 1)
            };
            that.sel(opt);
          }
        }, that);
      }, undefined, 'get');

    },

    load: function (index, arr) {
      if (index < arr.length) {
        M.delay(100, function () {
          arr[index].node ? this[arr[index].name](arr[index].node, arr[index].url) : this[arr[index].name](arr[index].url);
          this.load(++index, arr);
        }, this);
      };
    },

    add: function (list) {
      for (var i = 0; i < list.length; i++) {
        this.node[list[i].name] = M(this._id(list[i].id));
      };
      this.node.page = this._id('_page_')
    },

    getArray: function (array) {
      for (var i = 0, sum = M.getArraySum(array); i < array.length; i++) {
        array[i] = Number((Math.round(array[i] * 10000 / sum) * 0.01).toFixed(2));
      };
      return array;
    },

    query: function (key) {
      var href = window.location.search,
        reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)', 'i');
      if (href.length) {
        href = href.substr(1).match(reg);
        if (!href) {
          return null;
        }
        return unescape(href[2]);
      } else {
        return null;
      }
    },


    

    resolve: function (url, param, success, fail, type) {
      type = type || 'post';
      M.ajax({
        url: url,
        type: type,
        data: param,
        contentType: 'application/json;charset=utf-8',
        context: this,
        datatype: 'json',
        success: function (data) {
          M.delay(1, function () {
            M.isFunction(success) && success.call(this, data);
          }, this);
        },
        error: function (XMLHttpRequest, status) {
          M.isFunction(fail) && fail.call(this, {
            error: '请求失败',
            timeout: '请求超时',
            parsererror: '数据格式错误'
          } [status], this);
        }
      });
    },
    ajaxGet: function (url, success, fail) {
      M.ajax({
        url: url,
        type: "GET",
        // data: param,
        contentType: 'application/json;charset=utf-8',
        context: this,
        datatype: 'json',
        success: function (data) {
          M.delay(1, function () {
            M.isFunction(success) && success.call(this, data);
          }, this);
        },
        error: function (XMLHttpRequest, status) {
          M.isFunction(fail) && fail.call(this, {
            error: '请求失败',
            timeout: '请求超时',
            parsererror: '数据格式错误'
          } [status], this);
        }
      });
    },
    renderLoad: function () {
      return M.element.creat('span', {
        html: '加载中',
        'class': 'load'
      }).outerHTML;
    },

    renderNull: function (msg, state) {
      return M.element.creat('span', {
        html: msg + (!!!state ? '，' + M.element.creat('a', {
          html: '点击重新加载',
          href: 'javascript:',
          'class': 'reload'
        }).outerHTML : ''),
        'class': 'error'
      }).outerHTML;
    },
    // check: function () {
    //   //正则表达式
    //   var reg = new RegExp("[`~!%@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
    //   //获取输入框中的值
    //   var username = document.getElementById("keyword").value.trim();
    //   //判断输入框中有内容
    //   if (!reg.test(username)) {
    //     //输入非法字符，清空输入框
    //     $("#keyword").val("");
    //   }
    // },
    hideU: function () {
      var ul = M('.modify_ul');
      for (var i = 0, len = ul.length; i < len; i++) {
        $(ul[i]).hide();
      }
    }


  })(function () {
    M.exception.init();
  });
})(window.jQuery || window.xQuery || window.Zepto);