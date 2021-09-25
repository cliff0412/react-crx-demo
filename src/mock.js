import Mock from 'mockjs'

let domain = 'http://test.com/api/'

Mock.mock(domain + 'login', {
    code: 200,
    msg: 'OK',
    data: {
        nickname: "weitao",
        accessToken: "token",
    }
})

//由于GET请求url传参不固定，正则匹配
Mock.mock(/getData/, 'get', {
    code: 200,
    msg: 'success',
    data: {

    }
})