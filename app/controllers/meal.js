'use strict'

var xss = require('xss')
var mongoose = require('mongoose')
var Meal = mongoose.model('Meal')
var uuid = require('uuid')
// var userHelper = require('../dbhelper/userHelper')
// import mealHelper from '../dbhelper/mealHelper'
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

    var verifyCode = Math.floor(Math.random() * 10000 + 1)
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

    fields.forEach(function (field) {
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
exports.list = async (ctx, next) => {
    var data = await mealHelper.findAllLists()
    // var obj = await userHelper.findByPhoneNumber({phoneNumber : '13525584568'})
    // console.log('obj=====================================>'+obj)

    ctx.body = {
        success: true,
        data
    }
}
exports.addMeal = async (ctx, next) => {
    console.log(ctx,'ctx')
    // const phoneNumber = xss(ctx.request.body.phoneNumber.trim())

    const obj = [
        {
            name:'',
            source:'',
            img:''
        }
    ]
    var meal1 = new Meal({
        id: 1,
        date: 1513648608567,
        list: [
            {
                id: 1,
                name: '沙拉拌五花猪肉',
                source: '盐，糖（最好是冰糖末），葱段，姜片，料酒（至于用量除了糖要3大匙外其他主要看个人口味）',
                img: "https://ai.mklmall.com/uploads/01.jpg",
                like: Math.floor(Math.random()*1000),
                complain: Math.floor(Math.random()*100),
                want: Math.floor(Math.random()*1000),
                unwant: Math.floor(Math.random()*100)
            }, {
                id: 2,
                name: '鱼香肉丝',
                source: '猪里脊肉300克，绿尖椒1根，胡萝卜1/4根，冬笋1/2根，黑木耳6朵',
                img: "https://ai.mklmall.com/uploads/02.jpg",
                like: Math.floor(Math.random()*1000),
                complain: Math.floor(Math.random()*100),
                want: Math.floor(Math.random()*1000),
                unwant: Math.floor(Math.random()*100)
            }, {
                id: 2,
                name: '酱骨架',
                source: '姜，葱白（京葱或者叫大葱），大料，花椒，桂皮，茴香，香叶，糖，老抽，醋，油，食盐',
                img: "https://ai.mklmall.com/uploads/03.jpg",
                like: Math.floor(Math.random()*1000),
                complain: Math.floor(Math.random()*100),
                want: Math.floor(Math.random()*1000),
                unwant: Math.floor(Math.random()*100)
            }, {
                id: 2,
                name: '粉蒸肉',
                source: '这道菜做起来相对简单，需用蒸笼蒸到肉软。其特点是色泽红亮，咸鲜微辣。肉是肥而不腻，易化渣，红薯略带点甜味，糯，口感好。你也可以用豌豆或南瓜代替红薯。另外此道菜无需再加盐了，因为郫县豆瓣和豆腐乳汁本来就有足够的盐味。蒸肉米粉和郫县豆瓣可以在超市中找到。',
                img: "https://ai.mklmall.com/uploads/04.jpg",
                like: Math.floor(Math.random()*1000),
                complain: Math.floor(Math.random()*100),
                want: Math.floor(Math.random()*1000),
                unwant: Math.floor(Math.random()*100)
            }, {
                id: 2,
                name: '辣子鸡丁',
                source: '鸡胸肉150公克，青椒60公克，干辣椒20公克，姜10公克，葱2根，辣椒酱1大匙，酱油1大匙，料酒1小匙，白醋1小匙，细砂糖1小匙，太白粉1/2小匙，水1小匙，太白粉1小匙，盐1/8小匙，蛋白1大匙',
                img: "https://ai.mklmall.com/uploads/05.jpg",
                like: Math.floor(Math.random()*1000),
                complain: Math.floor(Math.random()*100),
                want: Math.floor(Math.random()*1000),
                unwant: Math.floor(Math.random()*100)
            }
        ],
    })
    var meal2 = await mealHelper.addMeal(meal1)
    var meal3 = new Meal({
        id: 1,
        date: 1513648608567,
        list: [
            {
                id: 1,
                name: '红烧带鱼',
                source: '带鱼，了就，红椒，葱，姜，蒜，八角，生抽，白糖，味精，水淀粉',
                img: "https://ai.mklmall.com/uploads/06.jpg",
                like: Math.floor(Math.random()*1000),
                complain: Math.floor(Math.random()*100),
                want: Math.floor(Math.random()*1000),
                unwant: Math.floor(Math.random()*100)
            }, {
                id: 2,
                name: '清蒸鸡蛋羹',
                source: '鸡蛋与鹅肉同食损伤脾胃；与兔肉、柿子同食导致腹泻；同时不宜与甲鱼、鲤鱼、豆浆、茶同食。',
                img: "https://ai.mklmall.com/uploads/07.jpg",
                like: Math.floor(Math.random()*1000),
                complain: Math.floor(Math.random()*100),
                want: Math.floor(Math.random()*1000),
                unwant: Math.floor(Math.random()*100)
            }, {
                id: 2,
                name: '蔬菜沙拉',
                source: '蔬菜、沙拉、葱、姜、蒜、老母鸡、葱、姜、蒜、老母鸡、葱、姜、蒜、老母鸡、葱、姜、蒜、老母鸡、葱、姜、蒜、老母鸡、葱、姜、蒜、老母鸡、葱、姜、蒜、老母鸡、葱、姜、蒜、老母鸡',
                img: "https://ai.mklmall.com/uploads/08.jpg",
                like: Math.floor(Math.random()*1000),
                complain: Math.floor(Math.random()*100),
                want: Math.floor(Math.random()*1000),
                unwant: Math.floor(Math.random()*100)
            }, {
                id: 2,
                name: '清炒虾仁',
                source: '虾仁，鸡蛋，姜，葱，黄瓜，葱姜蒜，水淀粉，盐，胡椒粉，绍酒',
                img: "https://ai.mklmall.com/uploads/09.jpg",
                like: Math.floor(Math.random()*1000),
                complain: Math.floor(Math.random()*100),
                want: Math.floor(Math.random()*1000),
                unwant: Math.floor(Math.random()*100)
            }, {
                id: 2,
                name: '地三鲜',
                source: '土豆200g、茄子200g、青椒200g。姜蒜、水淀粉、酱油1/4小勺、盐1/4小勺、油。',
                img: "https://ai.mklmall.com/uploads/10.jpg",
                like: Math.floor(Math.random()*1000),
                complain: Math.floor(Math.random()*100),
                want: Math.floor(Math.random()*1000),
                unwant: Math.floor(Math.random()*100)
            }
        ],
    })
    var meal4 = await mealHelper.addMeal(meal3)
    var meal5 = new Meal({
        id: 1,
        date: 1513648608567,
        list: [
            {
                id: 1,
                name: '韩国泡菜',
                source: '韩国泡菜，做法千变万化，各式各样。 今天介绍的是最简单的做法，即将所有调料调成适合自己口味的就好。比如剩下的方便面调料包，那些不要丢掉，可以做成美味的泡菜。',
                img: "https://ai.mklmall.com/uploads/11.jpg",
                like: Math.floor(Math.random()*1000),
                complain: Math.floor(Math.random()*100),
                want: Math.floor(Math.random()*1000),
                unwant: Math.floor(Math.random()*100)
            }, {
                id: 2,
                name: '咖喱土豆',
                source: '土豆2个，咖喱小半块',
                img: "https://ai.mklmall.com/uploads/12.jpg",
                like: Math.floor(Math.random()*1000),
                complain: Math.floor(Math.random()*100),
                want: Math.floor(Math.random()*1000),
                unwant: Math.floor(Math.random()*100)
            }, {
                id: 2,
                name: '鸡蛋汤',
                source: '老母鸡、葱、姜、蒜、老母鸡、葱、姜、蒜、老母鸡、葱、姜、蒜、老母鸡、葱、姜、蒜、老母鸡、葱、姜、蒜、老母鸡、葱、姜、蒜、老母鸡、葱、姜、蒜、老母鸡、葱、姜、蒜、老母鸡',
                img: "https://ai.mklmall.com/uploads/13.jpg",
                like: Math.floor(Math.random()*1000),
                complain: Math.floor(Math.random()*100),
                want: Math.floor(Math.random()*1000),
                unwant: Math.floor(Math.random()*100)
            }, {
                id: 2,
                name: '清真红烧牛肉',
                source: '北方回族清真名菜,成菜色泽深红牛肉酥软,汁浓味厚,有补脾胃,益气血,强筋骨的功效。',
                img: "https://ai.mklmall.com/uploads/14.jpg",
                like: Math.floor(Math.random()*1000),
                complain: Math.floor(Math.random()*100),
                want: Math.floor(Math.random()*1000),
                unwant: Math.floor(Math.random()*100)
            }, {
                id: 2,
                name: '皮蛋豆腐',
                source: '盒装嫩豆腐一个、，皮蛋一个，生抽，香油，盐，鸡精',
                img: "https://ai.mklmall.com/uploads/15.jpg",
                like: Math.floor(Math.random()*1000),
                complain: Math.floor(Math.random()*100),
                want: Math.floor(Math.random()*1000),
                unwant: Math.floor(Math.random()*100)
            }
        ],
    })
    var meal6 = await mealHelper.addMeal(meal5)
    var meal7 = new Meal({
        id: 1,
        date: 1513648608567,
        list: [
            {
                id: 1,
                name: '四川水煮牛肉',
                source: '植物油30克，料酒15克，老抽5克，玉米淀粉5克，豆瓣酱10克，辣椒(红，尖，干)10克，花椒5克，大葱5克，姜3克，白皮大蒜5克',
                img: "https://ai.mklmall.com/uploads/16.jpg",
                like: Math.floor(Math.random()*1000),
                complain: Math.floor(Math.random()*100),
                want: Math.floor(Math.random()*1000),
                unwant: Math.floor(Math.random()*100)
            }, {
                id: 2,
                name: '清炖排骨',
                source: '将排骨洗净，剁成四厘米长，三厘米宽的段，下沸水锅焯烫后捞出，冲洗干净；',
                img: "https://ai.mklmall.com/uploads/17.jpg",
                like: Math.floor(Math.random()*1000),
                complain: Math.floor(Math.random()*100),
                want: Math.floor(Math.random()*1000),
                unwant: Math.floor(Math.random()*100)
            }, {
                id: 2,
                name: '山药南瓜汤',
                source: '新鲜山药，南瓜，红枣，红糖',
                img: "https://ai.mklmall.com/uploads/18.jpg",
                like: Math.floor(Math.random()*1000),
                complain: Math.floor(Math.random()*100),
                want: Math.floor(Math.random()*1000),
                unwant: Math.floor(Math.random()*100)
            }, {
                id: 2,
                name: '红烧茄子',
                source: '茄子去皮，切成滚刀快。放如一大碗内，均匀的撒上一层盐，边撒边搅拌。然后放到一边备用。',
                img: "https://ai.mklmall.com/uploads/19.jpg",
                like: Math.floor(Math.random()*1000),
                complain: Math.floor(Math.random()*100),
                want: Math.floor(Math.random()*1000),
                unwant: Math.floor(Math.random()*100)
            }, {
                id: 2,
                name: '土豆饼',
                source: '洗干净土豆，上屉锅蒸。私下认为，用高压锅热也不错，而且很方便呢！不过，建议没用过高压锅的GGMM不要冒险呀！',
                img: "https://ai.mklmall.com/uploads/20.jpg",
                like: Math.floor(Math.random()*1000),
                complain: Math.floor(Math.random()*100),
                want: Math.floor(Math.random()*1000),
                unwant: Math.floor(Math.random()*100)
            }
        ],
    })
    var meal8 = await mealHelper.addMeal(meal7)
    var meal9 = new Meal({
        id: 1,
        date: 1513648608567,
        list: [
            {
                id: 1,
                name: '凉拌银耳',
                source: '银耳，香菜，鲜酱油，鸡精，芝麻油。',
                img: "https://ai.mklmall.com/uploads/21.jpg",
                like: Math.floor(Math.random()*1000),
                complain: Math.floor(Math.random()*100),
                want: Math.floor(Math.random()*1000),
                unwant: Math.floor(Math.random()*100)
            }, {
                id: 2,
                name: '干煸四季豆',
                source: '四季豆洗净，去两头，把筋撕掉，然后沥干水分，一定要干，不然炸四季豆的时候会有油溅出来的，很危险的。',
                img: "https://ai.mklmall.com/uploads/22.jpg",
                like: Math.floor(Math.random()*1000),
                complain: Math.floor(Math.random()*100),
                want: Math.floor(Math.random()*1000),
                unwant: Math.floor(Math.random()*100)
            }, {
                id: 2,
                name: '蚝油生菜',
                source: '生菜无论是炒还是煮生菜，时间都不要太长，这样可以保持生菜脆嫩的口感。',
                img: "https://ai.mklmall.com/uploads/23.jpg",
                like: Math.floor(Math.random()*1000),
                complain: Math.floor(Math.random()*100),
                want: Math.floor(Math.random()*1000),
                unwant: Math.floor(Math.random()*100)
            }, {
                id: 2,
                name: '拔丝苹果',
                source: '拔丝菜是我家家庭聚会必点的菜了，我妈最爱这个菜了。拔丝菜吃了不少，妈妈也是每年都做呢！自己试试，做法挺简单的，后来改良了一下，吃起来甜蜜蜜的，但不腻口，赞一个！',
                img: "https://ai.mklmall.com/uploads/24.jpg",
                like: Math.floor(Math.random()*1000),
                complain: Math.floor(Math.random()*100),
                want: Math.floor(Math.random()*1000),
                unwant: Math.floor(Math.random()*100)
            }, {
                id: 2,
                name: '简版罗宋汤',
                source: '西红柿3个、洋葱1个、牛里脊肉80克、土豆1个、胡萝卜半根、杏鲍菇1个。',
                img: "https://ai.mklmall.com/uploads/25.jpg",
                like: Math.floor(Math.random()*1000),
                complain: Math.floor(Math.random()*100),
                want: Math.floor(Math.random()*1000),
                unwant: Math.floor(Math.random()*100)
            }
        ],
    })
    var meal10 = await mealHelper.addMeal(meal9)
    if (meal10&&meal2&&meal4&&meal6&&meal8) {
        ctx.body = {
            success: true,
            data2: meal2,
            data4: meal4,
            data6: meal6,
            data8: meal8,
            data10: meal10,
        }
    }
}
exports.updataMeal = async (ctx, next) => {
    let id,type
    id = ctx.request.body.id
    type = ctx.request.body.type
    var data = await mealHelper.updatalist(id,type)
    ctx.body = {
        success: true,
        data
    }
}
exports.deleteMeal = async (ctx, next) => {
    const phoneNumber = xss(ctx.request.body.phoneNumber.trim())
    console.log(phoneNumber)
    var data = await mealHelper.deleteUser({phoneNumber})
    ctx.body = {
        success: true,
        data
    }
}