// pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: [],
    page: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.getData();
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

  },
  getData() {
    wx.request({
      url: 'https://cnodejs.org/api/v1/topics',
      method: "get",
      data: {
        limit: 10,
        page: this.data.page
      },
      success: (data) => {
        console.log(data.data.data);
        this.setData({
          dataList: this.data.dataList.concat(data.data.data),
          page: ++this.data.page
        })
      }
    })
  },

  goToDetail(e){
    console.log(e);
    let lid = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/detail/detail?lid='+lid,
    })
  }  
})