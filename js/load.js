/**
 * Created by zhen on 2017/10/23.
 */
chrome.browserAction.onClicked.addListener(function  (tab) {
    chrome.tabs.executeScript(tab.id, {file: 'js/shanbay.js'});
    chrome.tabs.insertCSS(tab.id, { file: 'css/shanbay.css' });
})
