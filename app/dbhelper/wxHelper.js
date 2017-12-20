'use strict'

var mongoose =  require('mongoose')
var Wx = mongoose.model('Wx')

/**
 * 通过电话号码查询
 * @param  {[type]} options.phoneNumber [description]
 * @return {[type]}                     [description]
 */
// exports.findByPhoneNumber = async ({phoneNumber}) => {
//     var query = User.find({phoneNumber})
//     var res = null
//     await query.exec(function(err, user) {
//         if(err) {
//             res = {}
//         }else {
//             res = user
//         }
//     })
//     // console.log('res====>' + res)
//     return res;
// }

/**
 * 查找所用用户
 * @return {[type]} [description]
 */
// exports.findAllUsers = async () => {
//     var query = User.find({});
//     var res = []
//     await query.exec(function(err, users) {
//         if(err) {
//             res = []
//         }else {
//             res = users;
//         }
//     })
//     return res
// }

/**
 * 增加用户
 * @param  {[User]} user [mongoose.model('User')]
 * @return {[type]}      [description]
 */
// exports.addUser = async (user) => {
//     user = await user.save()
//     return user
// }

exports.addWx = async (user) => {
    user = await user.save()
    return user
}

exports.findAllWx = async (userid) => {
    var query = Wx.find({"userid":userid},function (err,docs) {
        if(err){
            console.log(err,'docs')
        }else{
            console.log(docs,'docs')
            if(docs.length<1){
                // addWx(userid)
                console.log(123)
            }
        }
    });
    var res = []
    await query.exec(function (err, users) {
        if (err) {
            res = []
        } else {
            if(users.length<1){
                res = users;
            }else {
                res = false;
            }

        }
    })
    return res
}
/**
 * 删除用户
 * @param  {[type]} options.phoneNumber [description]
 * @return {[type]}                     [description]
 */
// exports.deleteUser = async ({phoneNumber}) => {
//     var flag = false
//     console.log('flag==========>'+flag)
//     await User.remove({phoneNumber}, function(err) {
//         if(err) {
//             flag = false
//             // return false
//         }else{
//             flag = true
//         }
//
//     })
//     console.log('flag=====await=====>'+flag)
//     return flag
// }
