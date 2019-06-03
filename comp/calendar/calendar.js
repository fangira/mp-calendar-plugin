var now = new Date();
var nowTime = {};
//年
nowTime.year = now.getFullYear();
//月
nowTime.month = now.getMonth();
//日
nowTime.date = now.getDate();
//星期几
nowTime.day = now.getDay();





//是否闰年
function is_leap(year) {
  let res
  return (year % 100 == 0 ? res = (year % 400 == 0 ? 1 : 0) : res = (year % 4 == 0 ? 1 : 0));
}
console.log(nowTime);

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    showPanel: false,
    renderArr: null,
    renderTime: null,
    nowTime: null,
    selectedTime: null,
    showPeriod: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 打开日历
    tap_showCalendar(e) {
      this.setData({
        showPanel: true
      })
    },
    // 隐藏日历
    tap_hideCalendar(e) {
      this.setData({
        showPanel: false,
        showPeriod:false
      })
    },
    //构造数组
    createRenderArray(renderTime) {
      //这个月有多少天
      renderTime.totalDays = new Array(31, 28 + is_leap(renderTime.year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31)[renderTime.month];
      //这个月第一天星期几
      renderTime.firstDay = new Date(renderTime.year, renderTime.month, 1).getDay();

      //qingqiu ,数组每一项一定要为number类型
      var allowArr = [2, 4, 6];
      let arr = [];
      var weekArr = [];
      for (var i = 1; i <= renderTime.totalDays; i++) {
        weekArr.push({
          date: i,
          month: renderTime.month,
          year: renderTime.year,
          // TODO: 请求后台是否可预约;
          stopBooking: allowArr.indexOf(i) != -1
        });
        if ((i + renderTime.firstDay - 1) % 7 == 0 || i == renderTime.totalDays) { // 星期天 或者 等于最后一天
          if (weekArr.length < 7) { // 这周总天数小于7
            if (weekArr[0].date == 1) { // 如果是月头
              while (weekArr.length != 7) {
                weekArr.unshift({
                  date: "",
                  month: renderTime.month,
                  year: renderTime.year
                });
              }
            } else if (i > 27) { // 如果是月尾
              while (weekArr.length != 7) {
                weekArr.push({
                  date: "",
                  month: renderTime.month,
                  year: renderTime.year
                });
              }
            }
          }
          arr.push(weekArr);
          weekArr = [];
        }
      }
      console.log(arr);
      this.setData({
        renderArr: arr
      });
    },
    // 上一月
    lastMonth() {
      let {
        renderTime
      } = this.data;
      let newTime = {};
      if (renderTime.month == 0) {
        newTime.year = renderTime.year - 1;
        newTime.month = 11;
      } else {
        newTime.month = renderTime.month - 1;
      }
      this.setData({
        renderTime: Object.assign({}, renderTime, newTime)
      }, () => {
        this.createRenderArray(this.data.renderTime);
      });
    },
    // 下一月
    nextMonth() {
      let {
        renderTime
      } = this.data;
      let newTime = {};
      if (renderTime.month == 11) {
        newTime.year = renderTime.year + 1;
        newTime.month = 0;
      } else {
        newTime.month = renderTime.month + 1;
      }
      this.setData({
        renderTime: Object.assign({}, renderTime, newTime)
      }, () => {
        this.createRenderArray(this.data.renderTime);
      });
    },
    // 选择日期
    tap_select_date(e) {
      console.log(e.currentTarget.dataset);
      this.setData({
        selectedTime: e.currentTarget.dataset
      });
    },
    tap_to_period() {
      this.setData({
        showPeriod: true
      })
    }
  },
  lifetimes: {
    // 在组件实例进入页面节点树时执行
    attached: function() {
      this.setData({
        nowTime,
        renderTime: nowTime
      })
      this.createRenderArray(nowTime)
    },
    // 在组件实例被从页面节点树移除时执行
    detached: function() {

    },
  }
})