/**
 * Created by zhen on 2017/10/26.
 */

(function (){
    //按广告标签筛选节点
    var advertElement = ['#bannerandheader','.content__labels','#js-content-meta','.content__secondary-column','.content__meta-container','aside.element','.submeta','.submeta__share','.submeta__syndication','.content-footer ','footer.l-footer','.site-message','.js-ad-slot'];

    function handler(elems){
        for(var i=0;i<elems.length;i++){
            $(advertElement[i]).remove();
        }
    }

    //针对动态插入的广告，每隔两秒检查删除
    setInterval(function () {
        handler(advertElement);
    },2000);



})();