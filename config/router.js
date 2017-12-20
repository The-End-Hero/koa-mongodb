'use strict'

const Router = require('koa-router')
const User = require('../app/controllers/user')
const App = require('../app/controllers/app')
const Meal = require('../app/controllers/meal')
const Good = require('../app/controllers/good')
const Complaint = require('../app/controllers/complaint')
const Wx = require('../app/controllers/wx')

module.exports = function () {
    var router = new Router({
        prefix: '/api'
    })

    // user
    router.post('/u/signup', App.hasBody, User.signup)
    router.post('/u/update', App.hasBody, App.hasToken, User.update)

    // DB Interface test
    router.get('/test/user/users', User.users)
    router.post('/test/user/add', User.addUser)
    router.post('/test/user/delete', User.deleteUser)


    // 菜品meal相关
    router.get('/test/meal/list', Meal.list)// 菜品列表
    router.post('/test/meal/addlist', Meal.addMeal)// 添加菜品
    router.post('/test/meal/updatalist', Meal.updataMeal)// 更新菜品
    router.post('/test/meal/deletelist', Meal.deleteMeal)// 删除菜品

    // 商品good相关
    router.get('/test/good/list',Good.goods)// 获取所有商品
    router.post('/test/good/addgood', Good.addGood)// 添加商品
    router.post('/test/good/updatagood', Good.updataGood)// 更新商品
    router.post('/test/good/deletegood', Good.deleteGood)// 更新商品

    // 投诉相关
    router.post('/test/complaint/addcomplaint',Complaint.addComplaint)// 添加投诉

    // Wx相关
    router.post('/test/wx/addwx',Wx.addWx) // 新增wx
    router.get('/test/wx/getwx',Wx.getWx) // 查询wx
    return router
}