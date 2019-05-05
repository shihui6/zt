/** 
 * created by mr.x on 16/10/11.
 */
;
window.onload = (function (M) {
  M.define('exception', {
    _id: function (name) {
      return document.getElementById(name);
    },
    _class: function (name) {
      return document.getElementsByClassName(name);
    },
    node: {},
    page: null,
    pageNum: 1,

    init: function (ops) {
      M.path = 'http://10.25.24.51:10188/';
      var list = [];
      this.add([{
        name: 'month_start',
        id: 'month_start'
      }, {
        name: 'month_stop',
        id: 'month_stop'
      }]);

      //日期选择
      var today = new Date();
      var date_1 = new Date();
      date_1.setMonth(date_1.getMonth());
      date_1.setFullYear(date_1.getFullYear() -1);
      var sDate = M.format(date_1, 'yyyy-MM-dd');
      this.beginTime = this.query('beginTime') || sDate;
      var date = today.setDate(today.getDate() + 1);
      console.log(date);
      this.endTime = this.query('endTime') || M.format(today, 'yyyy-MM-dd');
      var that = this;
      temp = null;
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
      });

      M('#btnSelect').click(function () {
        that.pageNum = 1;
        var opt = {
          num: 1
        };
        that.sel(opt);
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
      var opt = {
        export: 0,
        stock_info: '',
        num: ''
      };
      that.sel(opt);
    },

    sel: function (opt) {
      var that = this;
      var str = "";
      var par = {
        page: opt.num || that.pageNum,
        pageSize: 10,
        from_Date: M('#month_start').val() || '',
        to_Date: M('#month_stop').val() || '',
      };
      var url = "http://10.25.24.51:10188/api/rest/nlp/Credit_Announce/count_risk?";
      that.resolve(url, par, function (data) {
        var d = data.result.Announce_List;
        $.each(d, function (index, item) {
          str += '<tr>\
                      <td>' + item.stock_code + '</td>\
                      <td>' + item.stock_name + '</td>\
                      <td>' + item.risk_type + '</td>\
                    </tr>';
        });
        M('#detailData')[0].innerHTML = str;
        M.ellipsisToggle();

        //惠新添加的内容
        $('#btnExport').on('click',function(){
          console.log($('#month_start').val())
          console.log($('#month_stop').val())
          var timebegin = $('#month_start').val()
          var endbegin = $('#month_stop').val()
          window.location.href= 'http://10.25.24.51:10197/api/credit/count_risk_export?start_date='+timebegin+'&end_date='+endbegin+''

        })

        that.page = M.ui.page.init({
          container: this.node.page,
          total: data.result.Total_Count == '' ? (data.result.Page_Count * 10) : (data.result.Total_Count),
          items: 10,
          number: 8,
          isInput: true,
          isText: true,
          current: that.pageNum - 1,
          callback: function (tha) {
            that.pageNum = this.ops.current + 1;
            var opt = {};
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
          }[status], this);
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
          }[status], this);
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
