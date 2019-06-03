// pages/map/map.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    dataArr: [],
    page: 1
  },
  getData() {
    wx.request({
      url: 'https://cnodejs.org/api/v1/topics',
      data: {
        limit: 10,
        page: this.data.page
      },
      success: (res) => {
        console.log(res.data.data);
        this.setData({
          dataArr: this.data.dataArr.concat(res.data.data),
          page: this.data.page + 1
        })
      },
      fail(e) {
        console.log(e);
      }

    })
  },
  tapEvent(e) {
    let data_id = e.currentTarget.dataset.id;
    console.log(data_id);
    wx.navigateTo({
      url: './detail/detail?id='+data_id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.getData();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})