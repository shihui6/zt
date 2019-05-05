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

    sel: function (opt) {
      var that = this;
      // var par = {
      //   Stock_Code: that.query("Stock_Code") || '',
      //   Risk_Type: that.query("Risk_Type") || '',
      //   Stock_Type: that.query("Stock_Type") || '',
      //   Stock_Name: that.query("Stock_Name") || '',
      //   notice_source: that.query("notice_source") || '',
      // };
      var Stock_Code = that.query("Stock_Code") || '',
        Risk_Type = that.query("Risk_Type") || '',
        Stock_Type = that.query("Stock_Type") || '',
        Stock_Name = that.query("Stock_Name") || '',
        notice_source = that.query("notice_source") || '';
      var url = "http://10.25.24.51:10188/api/rest/nlp/Credit_Announce/Stat?Stock_Code=" + Stock_Code + "&Risk_Type=" + Risk_Type + "&Stock_Type=" + Stock_Type + "&Stock_Name=" + Stock_Name + "&notice_source=" + notice_source;
      that.resolve(url,null ,function (data) {
        var d = data.result;
        var str = '';
        var str2 = '';
        $.each(d, function (index, item) {
          str += '<tr>\
                      <td>' + item.Stock_Code + '</td>\
                      <td>' + item.Stock_Name + '</td>\
                      <td>' + item.purch_or_not + '</td>\
                      <td>' + item.notice_source + '</td>\
                      <td>' + item.zq_lv + '</td>\
                      <td>' + item.zq_rzbl + '</td>\
                      <td>' + item.zq_rz + '</td>\
                    </tr>';
          $.each(d.event_Seg.calculate_eod, function (index2, item2) {
            str2 += '<tr>\
                        <td>' + item2.risk_type + '</td>\
                        <td>' + item2.event_count + '</td>\
                        <td>' + item2.up_percent * 100 + '%</td>\
                        <td>' + item2.down_percent * 100 + '%</td>\
                        <td>' + item2.up_price_average + '</td>\
                        <td>' + item2.down_price_average + '</td>\
                    </tr>';
          });
          M('#detailData')[0].innerHTML = str;
          M('#detailData2')[0].innerHTML = str2;
          M.ellipsisToggle();
          // that.page = M.ui.page.init({
          //   container: this.node.page,
          //   total: data.result.Total_Count == '' ? (data.result.Page_Count * 10) : (data.result.Total_Count),
          //   items: 10,
          //   number: 8,
          //   isInput: true,
          //   isText: true,
          //   current: that.pageNum - 1,
          //   callback: function (tha) {
          //     that.pageNum = this.ops.current + 1;
          //     var $Stock_Info = M('#Stock_Info_text');
          //     var opt = {
          //       export: 0,
          //       stock_info: $Stock_Info.val().lastIndexOf(' ') == -1 ? $Stock_Info.val().slice(0) : $Stock_Info.val().slice($Stock_Info.val().lastIndexOf(' ') + 1)
          //     };
          //     that.sel(opt);
          //   }
          // }, that);
        });
      }, null, 'get');
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
        return decodeURI(href[2]);
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

    hideU: function () {
      var ul = M('.modify_ul');
      for (var i = 0, len = ul.length; i < len; i++) {
        $(ul[i]).hide();
      }
    }

  })(function () {
    M.exception.sel();
  });
})(window.jQuery || window.xQuery || window.Zepto);
