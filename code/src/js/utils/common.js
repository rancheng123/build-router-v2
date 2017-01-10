

    var commonUtils = {

        //当前url
        baseUrl: window.location.protocol + "//" + window.location.hostname + (window.location.port ? ":" + window.location.port : ""),


        url: {
            context: 'online',     //online线上环境，   dev开发环境
            webUrl: {
                online: 'http://www.zhongchou.com/',
                dev: 'http://dev.web.zhongchou.com/'
            }
        },


        //依据环境获取url
        getUrlByContext: function(url){
            var that = this;
            var context = that.url.context;
            return that.url[url][context];
        },




        //统计字数
        count: function (opts){
            var jqueryEle = opts.jqueryEle;
            var eleDefaultLen = jqueryEle.attr('maxlength') - jqueryEle.val().length;
            $('.limit').text(eleDefaultLen);
            jqueryEle.input(function(){
                var num = $(this).attr('maxlength') - $(this).val().length;
                $('.limit').text(num);
            })
        },

        // //统计字数
        // count: function (opts){
        //     var jqueryEle = opts.jqueryEle;
        //     jqueryEle.input(function(){
        //         var num = $(this).attr('maxlength') - $(this).val().length;
        //         $(this).next('.limit').remove();
        //         $(this).after( $('<em class="limit">'+ num +'</em>'));
        //     })
        // },


        //元素跟随
        follow: function(ele) {

            var copy;
            var top = ele.offset().top;
            var left = ele.offset().left;
            //原有样式
            var oldInfo = {
                position: ele.css('position'),
                top: ele.css('top'),
                left: ele.css('left'),
                zIndex: ele.css('zIndex')
            }


            var Win = $(window);
            Win.scroll(function () {
                if (Win.scrollTop() > top && !ele.hasClass('follow-hasFixed')) {

                    copy = ele.clone().addClass('follow-copy').css('visibility', 'hidden');
                    ele.after(copy);
                    
                    ele.css({
                        position: 'fixed',
                        top: 0,
                        left: left,
                        zIndex: 999
                    }).addClass('follow-hasFixed');
                } else if (Win.scrollTop() <= top && ele.hasClass('follow-hasFixed')) {
                    copy.remove();
                    ele.css(oldInfo).removeClass('follow-hasFixed');
                }
            })

        },
        //textarea 文字识别换行
        newline: function(ele){
            return ele.split("\n").join("<br />");
        },
        
        filterTag: function(text){
            /*return text.replace(/<[^<>]+>/g,'')
                .replace(/[<>]/g,'');
*/

            return text
                .replace(/</g,'[')
                .replace(/>/g,']')
                .replace(/\"/g,'”')
                .replace(/\'/g,'’');
        },


        getQueryString: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]); return null;
        },
        //textarea 可以设置最小高度 最大高度 当小于最大高度时，高度自适应，反之，出现滚动条
        autoTextarea: function(options){
            var ele = options.where;
            var defaults = {
                maxHeight:null,
                minHeight:null
            };
            var opts = $.extend({},defaults,options);
            return ele.each(function(){
                $(this).bind('paste cut keydown keyup focus blur',function(){
                    var height,style = this.style;
                    this.style.height = opts.minHeight + 'px';
                    if(this.scrollHeight > opts.minHeight){
                        if(opts.maxHeight && this.scrollHeight > opts.maxHeight){
                            height = opts.maxHeight;
                            style.overflowY =  'scroll';
                        }else {
                            if($(this).css("padding-top"))
                            {
                                var paddingTop = parseInt($(this).css("padding-top"));
                            }
                            if($(this).css("padding-bottom"))
                            {
                                var paddingBottom = parseInt($(this).css("padding-bottom"));
                            }
                            var padding = paddingTop + paddingBottom;
                            height = this.scrollHeight -padding;
                            style.overflowY =  'hidden';
                        }
                        style.height = height + 'px';
                    }
                });
            });
       },

        //统一ajax入口
        ajax: function(opts){
            var that = this;

            opts.type = opts.type || "post";
            opts.dataType = opts.dataType || "json";
            var xhr = $.ajax(opts);
            if (xhr) {
                xhr.fail(function () {

                    var msg = opts.errMsg ? opts.errMsg : '服务请求错误';
                    alert(msg);
                   
                });
            }
            return xhr;
        },
        renderData: function(opts){

            var data = opts.data || [{}];
            var render = opts.render;
            var where = opts.where;
            var callback = opts.callback;
            var isClear = opts.isClear;


            if(isClear){
                where.html('');
            }
            var html = '';
            $.each(data,function(i,ele){
                html+= render(i,ele);
            });
            $(html).appendTo(where);
            callback && callback(where);

        },
        //发起专用select
        selectLaunchType: function(opts){
        var select = opts.jqueryEle;
        var selectTit = select.children('.select-click'); //单击区域
        var changeText = selectTit.children('span');//改变文字
        var selectShow = select.children('.select-option') //点击选项
        $(selectTit).click(function(e){
            e.stopPropagation();
            if($(selectShow).is(':visible')){
                $(selectShow).slideUp();
            }else {
                $(selectShow).slideDown().parent().siblings().find('.select-option').slideUp();
            }
        })
        $(document).click(function(e){
            if(!selectShow.is(e.target) && selectShow.has(e.target).length === 0)
            {
                if($(selectShow).is(':visible'))
                {
                    $(selectShow).slideUp();
                }
            }
        })
        $(selectShow).find('li').click(function(){
            $(changeText).html($(this).find('span').html());
            $(selectShow).slideToggle();

            opts.callback&&opts.callback.call( this );
        })
    },
    };





