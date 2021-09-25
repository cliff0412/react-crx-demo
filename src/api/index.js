import axios from 'axios'

import '@/mock' // 引入 mock.js

let API_DOMAIN = 'http://test.com/api/'

export const API_CODE = {
    OK: 200,
    ERR_DATA: 403,
    ER_NO_DATA:301,
    ERR_LOGOUT:401
}

export const API_FAILED = 'network issue, retry later'

export const apiReqs = {
    signIn: (config) => {
        config.url = API_DOMAIN + 'login'
        config.method = 'post'
        fetch(config)
    },
    getData: (config) => {
        config.url = API_DOMAIN + 'getData'
        config.method = 'get'
        fetch(config)
    }
}

function fetch(config) {
    if(process.env.REACT_APP_DEBUG == 'true') {
        apiRequest(config)
    } else {
        sendRequestToBackground(config)
    }
}

export function apiRequest(config) {
 
    if(config.data === undefined) {
        config.data = {}
    }

    config.method = config.method || 'post'

    let headers = {
        'Access-Token': ''
    }

    let data = null
    if(config.formData) {
        headers['Content-Type'] = 'multipart/form-data'
        data = new FormData()
        Object.keys(config.data).forEach(function(key){
            data.append(key, config.data[key])
        })
    } else {
        data = config.data
    }

    let axiosConfig = {
        method: config.method,
        url: config.url,
        headers
    }

    if(config.method === 'get') {
        axiosConfig.params = data
    } else {
        axiosConfig.data = data
    }

    axios(axiosConfig).then((res) => {
        let result = res.data
        // 请求结束的回调
        config.done && config.done()
        // 请求成功的回调
        config.success && config.success(result)
    }).catch(() => {
        config.done && config.done()
        config.fail && config.fail(API_FAILED)
    })
}

function sendRequestToBackground(config) {
    config.apiType = 'background'
    if(window.chrome && window.chrome.runtime) {
        window.chrome && window.chrome.runtime.sendMessage({
          contentRequest: 'apiRequest',
          config: config,  
        }, (result) => {
            config.done && config.done()
            if(result.result === 'succ') {
                config.success && config.success(result)
            } else {
                config.fail && config.fail(result.msg)
            }
        })
    } else {
        console.log("unable to find chrome API")
    }
}