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