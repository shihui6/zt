/**
 * created by mr.x on 16/10/11.
 */
;
(function (M) {
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
      M.path = 'http://10.25.24.51:10190/';
      //			M.path = 'http://10.25.24.51:8189/';

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

      //日期选择
      var today = new Date();
      var date_1 = new Date();
      date_1.setMonth(date_1.getMonth() - 3);

      //M('#month_start').val(M.format(date_3, 'yyyy-MM-dd'));
      var sDate = M.format(date_1, 'yyyy-MM-dd');

      this.beginTime = this.query('beginTime') || sDate;

      this.endTime = this.query('endTime') || M.format(today, 'yyyy-MM-dd');
      //			this.endTime = this.query('endTime') || M.format(today, 'yyyy-MM-dd');

      var that = this;

      that.month_start = M.ui.calendar.init({
        target: this.node.month_start,
        date: {
          min: '2015-01-01',
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
      that.month_stop = M.ui.calendar.init({
        target: this.node.month_stop,
        date: {
          min: '2016-01-01',
          select: that.endTime,
          max: 'now'
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
        type: 0,
        keyword: ''
      };
      that.sel(opt);

      M('#btnSelect').click(function () {
        that.custid = '';
        that.pageNum = 1;
        that.sel(opt);
      });
      M('#advancedSearch').click(function () {
        let opt = {
          type: 1,
          keyword: ''
        };
        that.sel(opt);
      });
      M('#btnExport').change(function () {
        let files = this.files;
        let str = '';
        let filesNameLen = files[0].name.lastIndexOf('.') + 1;
        let filesName = files[0].name.substring(filesNameLen);
        console.log(filesName);
        if (filesName !== 'csv' && filesName !== 'txt') {
          alert('请上传.csv或.txt格式文件');
          return;
        }

        if (files.length) {
          var reader = new FileReader(); //new一个FileReader实例
          reader.readAsText(files[0], "utf8"); //以文本格式读取
          reader.onload = function (evt) {
            str += evt.target.result; //读到的数据
            let opt = {
              type: 1,
              keyword: str
            };
            that.sel(opt);
          };
        }
        $(this).val('');
      });
    },

    sel: function (opt) {
      var that = this;
       var par = {
        type: opt.type,
        page: that.pageNum,
        pageSize: 10,
        from_Date: M('#month_start').val() || '',
        to_Date: M('#month_stop').val() || '',
        keyword: opt.keyword || M('#keyword').val(),
      };
      that.resolve(M.path + 'api/rest/nlp/Credit_Announce/query_trust', par, function (data) {
        var d = data.result.Announce_List;
        var str = '';
        for (var i = 0, len = d.length; i < len; i++) {
          d[i].publish_datetime = M.format(new Date(d[i].publish_datetime), 'yyyy-MM-dd');
          str += M.template.resolve('<tr>\
									<td class="y-td">{{title}}\
										<div class="y-ellipsis y-ellipsis-flag">{{content}}</div>\
									</td>\
									<td>{{category}}</td>\
									<td>{{publish_datetime}}</td>\
									<td>{{source}}</td>\
								</tr>', d[i]);
        }
        M('#detailData')[0].innerHTML = str;
        M.ellipsisToggle();
        M('[data-href]').click(function () {
          var el = this;
          var beginTime = M('#month_start').val();
          window.open(el.dataset.href + '&beginTime=' + beginTime + '&endTime=' + endTime);
        });


        that.page = M.ui.page.init({
          container: this.node.page,
          // total: data.result.Page_Count,
          total: data.result.Total_Count == '' ? (data.result.Page_Count * 10) : (data.result.Total_Count),
          items: 10,
          number: 8,
          isInput: true,
          isText: true,
          current: that.pageNum - 1,
          callback: function (tha) {
            that.pageNum = this.ops.current + 1;
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
      }
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
    check: function () {
      //正则表达式
      var reg = new RegExp("^[A-Za-z0-9\u4e00-\u9fa5]+$");
      //获取输入框中的值
      var username = document.getElementById("keyword").value.trim();
      //判断输入框中有内容
      if (!reg.test(username)) {
        //输入非法字符，清空输入框
        $("#keyword").val("");
      }
    }

  })(function () {
    M.exception.init();
  });
})(window.jQuery || window.xQuery || window.Zepto);
