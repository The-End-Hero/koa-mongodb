'use strict'

var xss = require('xss')
var mongoose =  require('mongoose')
var Good = mongoose.model('Good')
var uuid = require('uuid')
// var userHelper = require('../dbhelper/userHelper')
// import goodHelper from '../dbhelper/goodHelper'
var goodHelper = require('../dbhelper/goodHelper')

/**
 * 注册新用户
 * @param {Function} next          [description]
 * @yield {[type]}   [description]
 */
exports.signup = async (ctx, next) => {
    var phoneNumber = xss(ctx.request.body.phoneNumber.trim())
    var user = await User.findOne({
        phoneNumber: phoneNumber
    }).exec()
    console.log(user)

    var verifyCode = Math.floor(Math.random()*10000+1)
    console.log(phoneNumber)
    if (!user) {
        var accessToken = uuid.v4()

        user = new User({
            nickname: '测试用户',
            avatar: 'http://upload-images.jianshu.io/upload_images/5307186-eda1b28e54a4d48e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',
            phoneNumber: xss(phoneNumber),
            verifyCode: verifyCode,
            accessToken: accessToken
        })
    }
    else {
        user.verifyCode = verifyCode
    }

    try {
        user = await user.save()
        ctx.body = {
            success: true
        }
    }
    catch (e) {
        ctx.body = {
            success: false
        }

        return next
    }

}

/**
 * 更新用户信息操作
 * @param  {[type]}   ctx  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
// exports.update = async (ctx, next) => {
//     var body = ctx.request.body
//     var user = ctx.session.user
//     var fields = 'avatar,gender,age,nickname,breed'.split(',')
//
//     fields.forEach(function(field) {
//         if (body[field]) {
//             user[field] = xss(body[field].trim())
//         }
//     })
//
//     user = await user.save()
//
//     ctx.body = {
//         success: true,
//         data: {
//             nickname: user.nickname,
//             accessToken: user.accessToken,
//             avatar: user.avatar,
//             age: user.age,
//             breed: user.breed,
//             gender: user.gender,
//             _id: user._id
//         }
//     }
// }
/**
 * 更新商品
 * @param  {[type]}   ctx  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.updataGood = async (ctx, next) => {
    var body = ctx.request.body

    var data = await goodHelper.updataGood(body)
    ctx.body = {
        success: true,
        data
    }
}



/**
 * 数据库接口测试
 * @param  {[type]}   ctx  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.goods = async (ctx, next) => {
    console.log(ctx.request.body,'goods ctxgoods ctxgoods ctxgoods ctxgoods ctxgoods ctxgoods ctxgoods ctxgoods ctxgoods ctx')
    console.log(ctx.query.type,'get query')
    // console.log(ctx.params.type,'get params')
    var data = await goodHelper.findAllGood(ctx.query.type)
    data.reverse()
    // var obj = await userHelper.findByPhoneNumber({phoneNumber : '13525584568'})
    // console.log('obj=====================================>'+obj)
    ctx.body = {
        success: true,
        data
    }
}
exports.addGood = async (ctx, next) => {
    console.log(ctx.request,'ctx.request')
    console.log(ctx.request.body,'ctx.request.body')


    var good = new Good(
        // {
        //     id: 1,
        //     category: '智能电器',
        //     type: 0,
        //     title: "iPhone X",
        //     desc: "全新iPhone X 164G 免费送！免费送！！免费送！！！",
        //     contactPeople: "Traven",
        //     contactWay: "1235346",
        //     img: "https://img14.360buyimg.com/n0/jfs/t12352/88/127708421/67468/90baaf73/5a04172aN29f845bf.jpg"
        // }
        ctx.request.body
    )
    var good2 =  await goodHelper.addGood(good)
    if(good2){
        ctx.body = {
            success: true,
            data : good2
        }
    }
}
exports.deleteUser = async (ctx, next) => {
    const phoneNumber = xss(ctx.request.body.phoneNumber.trim())
    console.log(phoneNumber)
    var data  = await userHelper.deleteUser({phoneNumber})
    ctx.body = {
        success: true,
        data
    }
}

// 删除商品
exports.deleteGood = async (ctx, next) => {
    const userid = xss(ctx.request.body.userid.trim())
    const _id = xss(ctx.request.body._id.trim())
    console.log(userid)
    var data  = await goodHelper.deleteGood({userid,_id})
    ctx.body = {
        success: true,
        data
    }
}
exports.getGood = async (ctx, next)=>{
    const userid = xss(ctx.query.userid.trim())
    console.log(userid)
    var data  = await goodHelper.getGood(userid)
    ctx.body = {
        success: true,
        data
    }
}