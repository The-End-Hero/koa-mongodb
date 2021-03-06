'use strict'

var xss = require('xss')
var mongoose =  require('mongoose')
var Complaint = mongoose.model('Complaint')
var Meal = mongoose.model('Meal')
var uuid = require('uuid')
// var userHelper = require('../dbhelper/userHelper')
// import complaintHelper from '../dbhelper/complaintHelper'
// import mealHelper from '../dbhelper/mealHelper'

var complaintHelper = require('../dbhelper/complaintHelper')
var mealHelper = require('../dbhelper/mealHelper')
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
exports.update = async (ctx, next) => {
    var body = ctx.request.body
    var user = ctx.session.user
    var fields = 'avatar,gender,age,nickname,breed'.split(',')

    fields.forEach(function(field) {
        if (body[field]) {
            user[field] = xss(body[field].trim())
        }
    })

    user = await user.save()

    ctx.body = {
        success: true,
        data: {
            nickname: user.nickname,
            accessToken: user.accessToken,
            avatar: user.avatar,
            age: user.age,
            breed: user.breed,
            gender: user.gender,
            _id: user._id
        }
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
    // var obj = await userHelper.findByPhoneNumber({phoneNumber : '13525584568'})
    // console.log('obj=====================================>'+obj)
    ctx.body = {
        success: true,
        data
    }
}
exports.addComplaint = async (ctx, next) => {
    console.log(ctx.request,'ctx.request')
    console.log(ctx.request.body,'ctx.request.body')

    var addcomplaint = new Meal({

    })
    var addcomplaint2 = await mealHelper.updatalist(ctx.request.body.mealid, 'complain')
    var complaint = new Complaint(
        // {
        //     id: 1,
        //     mealid: 'sadas34523423463sadas',
        //     content: '萨达三大萨达三大萨达三大色特听歌发呆萨达三大吴',
        //     img: "https://img14.360buyimg.com/n0/jfs/t12352/88/127708421/67468/90baaf73/5a04172aN29f845bf.jpg"
        // }
        ctx.request.body
    )
    var complaint2 =  await complaintHelper.addComplaint(complaint)
    if(complaint2){
        ctx.body = {
            success: true,
            data : complaint2
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