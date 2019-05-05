<template>
  <div v-on:mouseleave="isShowTable = false" class="dateBox clearFloat">
    <div class="title">
      {{prop.title}}
    </div>
    <div class="date-check">
      <input @click="showTable" @blur="inputBlur" @input="inputEvent" v-model="_dateStr" type="text" readonly="readonly">
      <!-- <div @click="showTable" class="nowCheckDate">{{showDate.dateStr}}</div> -->
      <div v-if="isShowTable" v-on:mouseleave="isShowTable = false" class="calendarBox">
        <div>
          <div class="top">
            <div class="nowYearBox">
              <span @click="showYearList">{{showDate._year}}</span>
              <div v-if="isYearList">
                <ul>
                  <li @click="changeYear(item)" v-for="(item, index) of yearList" :key="index">{{item}}</li>
                </ul>
              </div>
            </div>
            <div>年</div>
            <div class="nowMonthBox">
              <span @click="showMonthList">{{showDate._month}}</span>
              <div v-if="isMonthList">
                <ul>
                  <li @click="changeMonth(item)" v-for="(item, index) of monthList" :key="index">{{item}}</li>
                </ul>
              </div>
            </div>
            <div>月</div>
          </div>
          <div class="btn clearFloat">
            <span @click="setNullDate()">清空</span>
            <span @click="setToday()">今天</span>
          </div>
          <div class="dateTable">
            <table>
              <tbody>
                <tr>
                  <th v-for="item of th" :key="item">{{item}}</th>
                </tr>
                <tr v-for="(item, index) of dateList" :key="index" :class="{lastLine: index === 5}">
                  <td v-for="(secondItem, secondIndex) of item" :key="secondIndex" :class="{active: secondItem == showDate._day}" @click="changeDate(secondItem)">{{secondItem}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div>

    </div>
  </div>
</template>

<script>
export default {
  props: ['prop'],
  data() {
    // 一周时间的时间戳： 604800000
    // 一天时间的时间戳 86400000
    let nowDate = new Date();
    let list = [];
    let defaultDateStr = '';
    for (let i = 1990; i < 2050; i++) {
      list.push(i);
    }
    if (this.prop.defaultDate) {
      let y = this.prop.defaultDate.getFullYear();
      let m = this.prop.defaultDate.getMonth() + 1;
      m = m < 10 ? '0' + m : m;
      let d = this.prop.defaultDate.getDate();
      d = d < 10 ? '0' + d : d;
      nowDate = this.prop.defaultDate;
      defaultDateStr = y + '-' + m + '-' + d;
    }
    return {
      showDate: {
        dateStr: defaultDateStr,
        _year: nowDate.getFullYear(),
        _month: nowDate.getMonth() + 1,
        _day: nowDate.getDate()
      },
      yearList: list,
      monthList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      isYearList: false,
      isMonthList: false,
      isShowTable: false,
      th: ['日', '一', '二', '三', '四', '五', '六'],
      dateList: [],
      nowStrLength: 0,
    }
  },
  watch: {
    propDefaultDate(newVal, oldVal) {
      console.log(newVal)
      console.log(newVal)
      let defaultDateStr = '';
      let y = this.prop.defaultDate.getFullYear();
      let m = this.prop.defaultDate.getMonth() + 1;
      m = m < 10 ? '0' + m : m;
      let d = this.prop.defaultDate.getDate();
      d = d < 10 ? '0' + d : d;
      defaultDateStr = y + '-' + m + '-' + d;
      this._dateStr = defaultDateStr;
      console.log(defaultDateStr)
    }
  },
  computed: {
    _dateStr: {
      get() {
        return this.showDate.dateStr;
      },
      set(newVal) {
        this.showDate.dateStr = newVal;
      }
    },
    propDefaultDate() {
      return this.prop.defaultDate;
    },
    minDate() {
      if (this.prop.minDate) {
        if (typeof this.prop.minDate === 'string') {
          return new Date(this.prop.minDate);
        } else {
          return this.prop.minDate;
        }
      }
    },
    maxDate() {
      if (this.prop.maxDate) {
        if (typeof this.prop.maxDate === 'string') {
          return new Date(this.prop.maxDate);
        } else {
          return this.prop.maxDate;
        }
      }
    },
  },
  methods: {
    inputBlur() {
      // 失去焦点
      window.setTimeout(() => {
        // this.isShowTable = false;
      }, 300);
    },
    inputEvent() {
      console.log(1)
      this.showDate.dateStr
      const nowStr = this.showDate.dateStr;
      const tempArr = nowStr.split('');
      const tempArr2 = nowStr.split('-');
      const numberReg = /^[0-9]*$/;
      const now = new Date();
      let isAdd = true;
      if (nowStr.length > this.nowStrLength) {
        isAdd = true;
      } else {
        isAdd = false;
      }
      this.nowStrLength = nowStr.length;
      console.log('nowStrLength', this.nowStrLength)
      console.log('isAdd', isAdd)
      switch (nowStr.length) {
        case 1:
          if (nowStr != '1' && nowStr != '2') {
            this.showDate.dateStr = now.getFullYear().toString().slice(0, 1);
          }
          break;
        case 2:
          if (tempArr[0] == 1) {
            if (tempArr[1] != 9) {
              this.showDate.dateStr = 19;
            }
          } else {
            // (tempArr[0] == 2)
            if (tempArr[1] != 0) {
              this.showDate.dateStr = now.getFullYear().toString().slice(0, 2);
            }
          }
          break;
        case 3:
          if (nowStr.slice(0, 2) == '19') {
            if (tempArr[2] != 9) {
              this.showDate.dateStr = 199;
            }
          } else {
            // (nowStr.slice(0,2) == '20')
            if (tempArr[2] != 1 && tempArr[2] != 2) {
              this.showDate.dateStr = now.getFullYear().toString().slice(0, 3);
            }
          }
          break;
        case 4:
          if (nowStr.slice(0, 3) == '199') {
            if (!numberReg.test(tempArr[3])) {
              this.showDate.dateStr = 1990;
            }
          } else {
            // (nowStr.slice(0,3) == '201')
            if (!numberReg.test(tempArr[3])) {
              this.showDate.dateStr = now.getFullYear();
            }
          }
          this.showDate._year = this.showDate.dateStr;
          this.dateList = this.dateListSplicing(this.showDate._year, this.showDate._month);
          console.log('year', this.showDate._year)
          break;
        case 5:
          this.showDate.dateStr = this.showDate.dateStr.slice(0, 4) + '-';
          break;
        case 6:
          if (!numberReg.test(tempArr[5])) {
            this.showDate.dateStr = this.showDate.dateStr.slice(0, 4) + '-' + '0';
          } else {
            if (tempArr[5] > 1) {
              this.showDate.dateStr = this.showDate.dateStr.slice(0, 4) + '-' + '1';
            }
          }
          break;
        case 7:
          if (!numberReg.test(tempArr[6])) {
            if (tempArr[5] == '0') {
              this.showDate.dateStr = this.showDate.dateStr.slice(0, 4) + '-' + '01';
            } else {
              this.showDate.dateStr = this.showDate.dateStr.slice(0, 4) + '-' + '11';
            }
          } else {
            if (tempArr[5] == '0') {
              if (tempArr[6] == '0') {
                this.showDate.dateStr = this.showDate.dateStr.slice(0, 4) + '-' + '01';
              }
            } else {
              if (tempArr[6] > 2) {
                this.showDate.dateStr = this.showDate.dateStr.slice(0, 4) + '-' + '12';
              }
            }
          }
          this.showDate._month = this.showDate.dateStr.slice(5, 7);
          this.dateList = this.dateListSplicing(this.showDate._year, this.showDate._month);
          break;
        case 8:
          this.showDate.dateStr = this.showDate.dateStr.slice(0, 7) + '-';
          break;
        case 9:
          if (!numberReg.test(tempArr[8])) {
            this.showDate.dateStr = this.showDate.dateStr.slice(0, 7) + '-' + '0';
          } else {
            const thisMonthDayNumber = this.getMonthDayNumber(tempArr2[0], tempArr2[1]);
            if (thisMonthDayNumber < 30) {
              if (tempArr[8] > 2) {
                this.showDate.dateStr = this.showDate.dateStr.slice(0, 7) + '-' + '2';
              }
            } else {
              if (tempArr[8] > 3) {
                this.showDate.dateStr = this.showDate.dateStr.slice(0, 7) + '-' + '3';
              }
            }
            console.log('当月天数', thisMonthDayNumber)
          }
          break;
        case 10:
          if (!numberReg.test(tempArr[9])) {
            if (tempArr[8] == '0') {
              this.showDate.dateStr = this.showDate.dateStr.slice(0, 9) + '1';
            } else {
              this.showDate.dateStr = this.showDate.dateStr.slice(0, 9) + '0';
            }
          } else {
            const thisMonthDayNumber2 = this.getMonthDayNumber(tempArr2[0], tempArr2[1]);
            if (tempArr[8] == '0') {
              this.showDate.dateStr = this.showDate.dateStr.slice(0, 9) + '1';
            } else if (tempArr[8] == '3') {
              if (thisMonthDayNumber2 == 30) {
                if (tempArr[9] > 0) {
                  this.showDate.dateStr = this.showDate.dateStr.slice(0, 9) + '0';
                }
              } else {
                if (tempArr[9] > 1) {
                  this.showDate.dateStr = this.showDate.dateStr.slice(0, 9) + '1';
                }
              }
            } else if (tempArr[8] == '2') {
              if (thisMonthDayNumber2 == 28) {
                if (tempArr[9] > 8) {
                  this.showDate.dateStr = this.showDate.dateStr.slice(0, 9) + '8';
                }
              } else if (thisMonthDayNumber2 == 29) {
                if (tempArr[9] > 9) {
                  this.showDate.dateStr = this.showDate.dateStr.slice(0, 9) + '9';
                }
              }
            }
          }
          this.showDate._year = this.showDate.dateStr.slice(0, 4);
          this.showDate._month = this.showDate.dateStr.slice(5, 7);
          this.showDate._day = this.showDate.dateStr.slice(8, 10);
          this.dateList = this.dateListSplicing(this.showDate._year, this.showDate._month);
          if (this.DateCheckout(this.showDate.dateStr) === '日期格式错误') {
            this.setToday();
            return;
          }
          this.$emit(this.prop.parentEvent, this.showDate.dateStr);
          break;
        default:
          this.showDate.dateStr = this.showDate.dateStr.slice(0, 10);
          if (this.DateCheckout(this.showDate.dateStr) === '日期格式错误') {
            this.setToday();
            return;
          }
          this.$emit(this.prop.parentEvent, this.showDate.dateStr);
          break;
      }
      console.log(this.showDate._year, this.showDate._month, this.showDate._day)
    },
    runNian(_year) {
      if (_year % 400 === 0 || (_year % 4 === 0 && _year % 100 !== 0)) {
        return true;
      } else {
        return false;
      }
    },
    getFirstDay(_year, _month) {
      var allDay = 0, y = _year - 1, i = 1;
      allDay = y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) + 1;
      for (; i < _month; i++) {
        switch (i) {
          case 1: allDay += 31; break;
          case 2:
            if (this.runNian(_year)) { allDay += 29; }
            else { allDay += 28; }
            break;
          case 3: allDay += 31; break;
          case 4: allDay += 30; break;
          case 5: allDay += 31; break;
          case 6: allDay += 30; break;
          case 7: allDay += 31; break;
          case 8: allDay += 31; break;
          case 9: allDay += 30; break;
          case 10: allDay += 31; break;
          case 11: allDay += 30; break;
          case 12: allDay += 31; break;
        }
      }
      return allDay % 7;
    },
    digitalCovering(number) {
      if (number < 10) {
        return '0' + Number(number);
      } else {
        return number;
      }
    },
    getMonthDayNumber(_year, _month) {
      const m = parseInt(_month);
      let dayNumber = 31;
      switch (m) {
        case 2:
          dayNumber = this.runNian(_year) ? 29 : 28;
          break;
        case 4:
        case 6:
        case 9:
        case 11:
          dayNumber = 30;
          break;
      }
      return dayNumber;
    },
    dateListSplicing(_year, _month) {
      const firstDayWeekday = this.getFirstDay(_year, _month)
      const nowMonthDayNumber = this.getMonthDayNumber(_year, _month);
      let day = 1;
      let tempArr = [[], [], [], [], [], []];
      for (let i = 1; i < 8; i++) {
        if (i < firstDayWeekday) {
          tempArr[0][i - 1] = '';
        } else {
          tempArr[0][i - 1] = day;
          day++
        }
      }
      for (let i = 1; i < 6; i++) {
        for (let j = 1; j < 8; j++) {
          if (day > nowMonthDayNumber) {
            tempArr[i].lastLine = true;
            break;
          }
          tempArr[i][j - 1] = day;
          day++
        }
      }
      return tempArr;
    },
    formatDateTime(date) {
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      m = m < 10 ? ('0' + m) : m;
      let d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      return y + '-' + m + '-' + d;
    },
    setNullDate() {
      this.showDate.dateStr = '';
      this.$emit(this.prop.parentEvent, this.showDate.dateStr);
    },
    setToday() {
      this.showDate.dateStr = this.formatDateTime(new Date());
      this.showDate._year = new Date().getFullYear();
      this.showDate._month = new Date().getMonth() + 1;
      this.showDate._day = new Date().getDate();
      this.$emit(this.prop.parentEvent, this.showDate.dateStr);
    },
    DateJudgment() {
      this.showDate.dateStr = this.showDate._year.toString() + '-' + this.digitalCovering(this.showDate._month) + '-' + this.digitalCovering(this.showDate._day);
      let nowSelectDate = new Date(this.showDate.dateStr).getTime();
      if (this.minDate) {
        if (nowSelectDate < this.minDate.getTime()) {
          this.showDate.dateStr = this.formatDateTime(this.minDate);
          this.showDate._year = this.minDate.getFullYear();
          this.showDate._month = this.minDate.getMonth() + 1;
        }
      } else if (this.maxDate) {
        if (nowSelectDate > this.maxDate.getTime()) {
          this.showDate.dateStr = this.formatDateTime(this.maxDate);
          this.showDate._year = this.maxDate.getFullYear();
          this.showDate._month = this.maxDate.getMonth() + 1;
        }
      }
      if (this.DateCheckout(this.showDate.dateStr) === '日期格式错误') {
        this.setToday();
        return;
      }
      this.$emit(this.prop.parentEvent, this.showDate.dateStr);
    },
    showTable() {
      let tempArr = this.dateListSplicing(this.showDate._year, this.showDate._month);
      this.dateList = JSON.parse(JSON.stringify(tempArr));
      this.isShowTable = !this.isShowTable;
      this.isYearList = false;
      this.isMonthList = false;
      this.DateJudgment();
    },
    changeDate(item) {
      if (!item) return;
      this.showDate._day = item;
      this.DateJudgment();
    },
    showMonthList() {
      this.isMonthList = !this.isMonthList;
      this.isYearList = false;
    },
    changeMonth(...data) {
      this.isMonthList = false;
      this.showDate._month = data[0];
      let tempArr = this.dateListSplicing(this.showDate._year, this.showDate._month);
      let monthDayNumber = this.getMonthDayNumber(this.showDate._year, this.showDate._month);
      this.dateList = JSON.parse(JSON.stringify(tempArr));
      if (this.showDate._day > monthDayNumber) {
        this.showDate._day = monthDayNumber;
      }
      this.DateJudgment();
    },
    showYearList() {
      this.isYearList = !this.isYearList;
      this.isMonthList = false;
    },
    changeYear(...data) {
      this.isYearList = false;
      this.showDate._year = data[0];
      let tempArr = this.dateListSplicing(this.showDate._year, this.showDate._month);
      let monthDayNumber = this.getMonthDayNumber(this.showDate._year, this.showDate._month);
      this.dateList = JSON.parse(JSON.stringify(tempArr));
      if (this.showDate._day > monthDayNumber) {
        this.showDate._day = monthDayNumber;
      }
      this.DateJudgment();
    },
    DateCheckout(dateStr) {
      const reg = /^(\d{4})-(\d{2})-(\d{2})$/;
      if (!dateStr) return false;
      const arr = reg.exec(dateStr);
      if (!reg.test(dateStr) && RegExp.$2 <= 12 && RegExp.$3 <= 31) {
        alert("请保证输入的日期格式为yyyy-mm-dd或正确的日期!");
        return '日期格式错误';
      }
    },
  },
  mounted() {
    this.nowStrLength = this.showDate.dateStr.length;
    // this.dateListSplicing(2018, 6)
  }
}
</script>

<style lang="less" scoped>
.dateBox {
  > div {
    float: left;
    line-height: 25px;
  }
  .date-check {
    position: relative;
    width: 105px;
    height: 25px;
    input {
      width: 100px;
      height: 25px;
      line-height: 25px;
      border: 1px solid #797979;
    }
  }
  .nowCheckDate {
    cursor: pointer;
    height: 25px;
  }
  .calendarBox {
    position: absolute;
    top: 23px;
    left: -1px;
    width: 170px;
    // height: 140px;
    border: 1px solid #797979;
    > div {
      position: relative;
      width: 100%;
      height: 100%;
      background-color: #f0f5f9;
      z-index: 2;
    }
    .btn {
      span {
        float: left;
        width: 50%;
        text-align: center;
        cursor: pointer;
      }
    }
    .top {
      width: 100%;
      height: 22px;
      font-size: 12px;
      > div {
        float: left;
      }
      .nowYearBox,
      .nowMonthBox {
        position: relative;
        width: 65px;
        height: 20px;
        margin-top: 1px;
        text-align: center;
        line-height: 20px;
        cursor: pointer;
        border: 1px solid #797979;
        background-color: #fff;
        div {
          height: 100px;
          overflow: hidden;
        }
        span {
          display: inline-block;
          width: 100%;
          height: 100%;
        }
        ul {
          height: 80px;
          overflow-y: scroll;
        }
        li {
          background-color: #fff;
        }
      }
    }
    .dateTable {
      font-size: 12px;
      margin-top: 2px;
      table {
        border-top: 1px solid #797979;
        border-collapse: collapse;
      }
      tr.lastLine {
        td {
          border-bottom: none;
        }
      }
      th {
        border: 1px solid #797979;
        width: 170/7px;
      }
      td {
        border: 1px solid #797979;
        text-align: center;
        cursor: pointer;
      }
      td:hover {
        background-color: rgba(252, 0, 152, 0.1);
      }
      td.active {
        background-color: rgba(252, 0, 152, 0.3);
      }
      td:nth-child(1),
      th:nth-child(1) {
        border-left: none;
      }
      td:nth-child(7),
      th:nth-child(7) {
        border-right: none;
      }
    }
  }
}
</style>
