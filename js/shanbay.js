/**
 * Created by zhen on 2017/10/26.
 */

;(function (){
    /*
    * 按广告标签筛选节点
    * */
    var advertElement = ['#bannerandheader','.content__labels','#js-content-meta','.content__secondary-column','.content__meta-container','aside.element','.submeta','.submeta__share','.submeta__syndication','.content-footer ','footer.l-footer','.site-message','.js-ad-slot'];

    function handler(elems){
        for(var i=0;i<elems.length;i++){
            $(elems[i]).remove();
        }

    }
    handler(advertElement);
    scrollTo(0,0);

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
    var headerH = document.getElementsByTagName('header')[0].scrollHeight;  //标题高度
    var contentH = document.getElementsByClassName('content__main')[0].scrollHeight;  //文章高度
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


    /*取词翻译
    *双击单词查看翻译和发音
    * */

    document.addEventListener("dblclick",translate);
    document.addEventListener("click",removePopup);//移除弹出框

    function translate(e){
        var e = e || window.event.target;
        var word = window.getSelection().toString();    //利用getSelection()方法取词
        var shanbay = 'https://api.shanbay.com/bdc/search/?word='+word;

        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function (){
            if(xhr.readyState == 4){
                var msg = JSON.parse(xhr.responseText).data;
                popup(e,msg);
            }
        }
        xhr.open("get",shanbay,true);
        xhr.send(null);

    }



    //创建弹出框
    function popup(e,msg){
        var pop = document.createElement("div");
        pop.classList.add("pop-warp");

        var word = document.createElement("h3");

        var wordcontent = document.createElement("div");
        wordcontent.classList.add("word-content");

        var title = document.createElement("div");
        title.classList.add("dictionary-title");

        var comment = document.createElement("div");
        comment.classList.add("dictionary-comment");

        word.innerHTML = msg.content;

        title.innerHTML = "<hr><div class=''><span>英</span><span><i class='iconfont' id='ico1'>&#xe608;<audio id='uk_audio' ></audio></i></span><span>[" + msg.pronunciations.uk + "]</span></div>" + "<div><span>美</span><span><i class='iconfont' id='ico2'>&#xe608;<audio id='us_audio' ></audio></i></span><span>[" + msg.pronunciations.us + "]</span></div>";

        var defins = msg.definition.split('\n');
        var com = '';
        for(var i =0; i< defins.length;i++){
            com += defins[i] + '<br>';
        }
        comment.innerHTML = com;


        document.body.appendChild(pop);
        pop.appendChild(word);
        wordcontent.appendChild(title);
        wordcontent.appendChild(comment);
        pop.appendChild(wordcontent);


        //弹出框内的点击避免最外层的事件委托
        pop.addEventListener('click',function(e){
            e.stopPropagation();
        });
        pop.addEventListener('dblclick',function(e){
            e.stopPropagation();
        })

        document.getElementById("ico1").addEventListener('click', function (e) {

            var audio = document.getElementById("uk_audio");
            audio.src = msg.audio_addresses.uk[0];
            audio.play();
        });
        document.getElementById("ico2").addEventListener('click', function (e) {
            var audio = document.getElementById("us_audio");
            audio.src = msg.audio_addresses.us[0];
            audio.play();
        })


        popupStyle(e.pageX, e.pageY,pop);


    }

    //弹窗口样式以及位置
    function popupStyle(x,y,pop){
        var clientW = document.documentElement.clientWidth;
        var clientH = document.documentElement.clientHeight;

        var popW = pop.clientWidth;
        var popH = pop.clientHeight;

        pop.style.position = 'absolute';


        if(x+popW > clientW){
            pop.style.left = x - 24 - popW + "px";     //单词左
            if(y+popH > clientH){
                pop.style.top = y - 24 - popH + "px";  //单词上
            }else{
                pop.style.top = y + 24  + "px";       //单词下
            }
        }else{
            pop.style.left = x + 24  + "px";    //单词右
            if(y+popH > clientH){
                pop.style.top = y - 24 - popH + "px";  //单词上
            }else{
                pop.style.top = y + 24  + "px";       //单词下
            }
        }
    }


    //移除弹出框
    function removePopup(){
        var pop = document.getElementsByClassName('pop-warp')[0];
        if(pop){
            document.body.removeChild(pop);
        }
    }


})();


