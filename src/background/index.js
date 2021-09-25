import {apiRequest} from '@/api'

// 一定要加上下面的global chrome, 要不编译会报错 chrome is not defined
/*global chrome*/
chrome.runtime.onInstalled.addListener(function(details) {
    // console.log(details)
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
            // 运行插件的页面url规则
            conditions: [
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: {}
                })

            ],
            actions: [
                new window.chrome.declarativeContent.ShowPageAction()
            ]
        }])
    })
})


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse ){
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {
        const {contentRequest} = request
        if(contentRequest === 'apiRequest') {
            let {config} = request
            config.success = (data) => {
                data.result = 'succ'
                sendResponse(data)
            }

            config.fail = (msg) => {
                sendResponse({
                    result: 'fail',
                    msg
                })
            }

            apiRequest(config)
        }
    })
    return true
})