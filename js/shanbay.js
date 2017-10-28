/**
 * Created by zhen on 2017/10/26.
 */

;(function (){
    //按广告标签筛选节点
    var advertElement = ['#bannerandheader','.content__labels','#js-content-meta','.content__secondary-column','.content__meta-container','aside.element','.submeta','.submeta__share','.submeta__syndication','.content-footer ','footer.l-footer','.site-message','.js-ad-slot'];

    function handler(elems){
        for(var i=0;i<elems.length;i++){
            $(elems[i]).remove();
        }

    }
    handler(advertElement);

    //针对动态插入的广告，每隔两秒检查删除
    setInterval(function () {
        handler(advertElement);
    },2000);

    /*
    * 分页操作
    * 页数——由全文高度加分页器的高度 除 浏览器可用高度（向上舍入）得到
    * 点击页数移动距离——由标题加上文章内容高度 乘 页数得到
    * */
    //var docH = document.body.scrollHeight;  //全文高度
    var headerH = document.getElementsByTagName('header')[0].scrollHeight;  //全文高度
    var contentH = document.getElementsByClassName('content__main')[0].scrollHeight;  //全文高度
    var docH = headerH + contentH;
    //var scrH = window.screen.height;        //屏幕高度
    var scrH = document.documentElement.clientHeight;        //浏览器实际可用高度

    document.body.style.overflow = 'hidden'; //
    document.documentElement.style.overflow = 'hidden';
    pagination(docH,scrH);

    function pagination(docH,scrH){

        var page = Math.ceil(docH/scrH);

        if(page > 1){
            var div = document.createElement("div");
            var divCenter = document.createElement("div");
            var ul = document.createElement("ul");
            var frag = document.createDocumentFragment();
            var i,li;
            for(i=1;i<=page;i++){
                li = document.createElement("li");
                li.innerHTML = i;
                frag.appendChild(li);
            }
            div.classList.add("pageList");
            divCenter.classList.add("warp-center");
            document.body.appendChild(div);
            divCenter.appendChild(ul);
            div.appendChild(divCenter);
            ul.appendChild(frag);

            //事件委托
            divCenter.addEventListener('click',function(e){
                var target = e.target;
                var n = parseInt(target.innerHTML);

                //当前页的分页标签样式改动
                var list = this.childNodes[0].childNodes;
                for(var i = 0;i<list.length;i++){
                    list[i].style.backgroundColor = '#fff';
                    list[i].style.borderColor = '#ddd';
                    list[i].style.color = '#337ab7';
                }
                target.style.backgroundColor = '#337ab7';
                target.style.borderColor = '#337ab7';
                target.style.color = '#fff';


                switchPage(n-1);
            })
        }
    }

    function switchPage(n){       //修改header标签以及content__main标签的top值，达到翻页效果
        var header = document.getElementsByTagName('header')[0];
        var content = document.getElementsByClassName('content__main')[0];

        header.style.position = 'relative';
        content.style.position = 'relative';

        //移页时，预留两行行高，提高用户阅读体验（line-height为24px）
        header.style.top = '-' + (n*(scrH-48)) + 'px';
        content.style.top = '-' + (n*(scrH-48)) + 'px';


    }


})();


