'use strict'

var mongoose =  require('mongoose')
var Meal = mongoose.model('Meal')

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
 * 查找所有list
 * @return {[type]} [description]
 */
exports.findAllLists = async () => {
    var query = Meal.find({});
    var res = []
    await query.exec(function(err, users) {
        if(err) {
            res = []
        }else {
            res = users;
        }
    })
    return res
}

/**
 * 修改菜品状态（喜欢 投诉 想吃 不想吃）
 * @return {[type]} [description]
 */
exports.updatalist = async (id,type) => {
    // var query = Meal.find({"list":{"$elemMatch":{"_id":id}}});
    // query.update({"like":22}, {’$inc’:{’:1} }  );
    var query
    if(type=='like'){
        query = Meal.update({"list":{"$elemMatch":{"_id":id}}}, { "$inc":{"list.$.like":1}},function (error,docs) {
            if(error) {
                console.log(error);
            } else {
                console.log(docs,'Update success!');
                return docs
            }
        });
    }else if(type=='complain'){
        query = Meal.update({"list":{"$elemMatch":{"_id":id}}}, { "$inc":{"list.$.complain":1}},function (error,docs) {
            if(error) {
                console.log(error);
            } else {
                console.log(docs,'Update success!');
                return docs
            }
        });
    }else if(type=='want'){
        query = Meal.update({"list":{"$elemMatch":{"_id":id}}}, { "$inc":{"list.$.want":1}},function (error,docs) {
            if(error) {
                console.log(error);
            } else {
                console.log(docs,'Update success!');
                return docs
            }
        });
    }else if(type=='unwant'){
        query = Meal.update({"list":{"$elemMatch":{"_id":id}}}, { "$inc":{"list.$.unwant":1}},function (error,docs) {
            if(error) {
                console.log(error);
            } else {
                console.log(docs,'Update success!');
                return docs
            }
        });
    }
    // var query = Meal.update({"list":{"$elemMatch":{"_id":id}}}, { "$inc":{"list.$.like":1}},function (error,docs) {
    //     if(error) {
    //         console.log(error);
    //     } else {
    //         console.log(docs,'Update success!');
    //         return docs
    //     }
    // });
    console.log(query,'query')
    var res = []
    // await query.exec(function(err, users) {
    //     if(err) {
    //         res = []
    //     }else {
    //         res = users;
    //     }
    // })
    return res
}
/**
 * 增加用户
 * @param  {[User]} user [mongoose.model('User')]
 * @return {[type]}      [description]
 */
// exports.addUser = async (user) => {
//     user = await user.save()
//     return user
// }
/**
 * 增加meal
 * @param  {[User]} user [mongoose.model('User')]
 * @return {[type]}      [description]
 */
exports.addMeal = async (meal) => {
    meal = await meal.save()
    return meal
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
