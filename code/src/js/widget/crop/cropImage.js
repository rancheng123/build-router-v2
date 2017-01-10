

    var R_cropImage = {
        cache: {},
        init: function(opts){


            var that = this;
            var imgSrc = opts.img;
            var where =  opts.where;

            $.extend(that.cache,{
                opts: opts
            })

            that.destory();
            $('<div id="jcrop-cover">').appendTo( $('body') );

            /*测试  start*/
            //var imgSrc = './crop/1.jpg';
            /*测试  end*/

            var imgObj = new Image();
            imgObj.src = imgSrc;
            imgObj.onload = function(){

                var wapper = $('<div id="jcrop-wapper">' +
                    '<div class="Jcrop-where">' +
                    '<img id="targetImg" src="'+ imgSrc +'">' +
                    '</div>' +
                    '<div class="Jcrop-control">' +
                    '<span class="Jcrop-cancle">取消</span>' +
                    '<span class="Jcrop-ok">确定</span>' +
                    '</div>' +
                    '</div>').appendTo( $('body') );




                var imgWidth = this.width;
                var imgHeight = this.height;

                //弹窗最大宽高
                var maxWidth = $(window).width()*0.8;
                var maxHeight = $(window).height()*0.8;

                //弹窗最小宽高
                var minWidth = 150;
                var minHeight = 150;



                if(imgWidth<minWidth){
                    var wapperWidth = minWidth;
                }else if(imgWidth>=minWidth && imgWidth<=maxWidth){
                    var wapperWidth = imgWidth;
                }else if(imgWidth>maxWidth){
                    var wapperWidth = maxWidth;
                }

                if(imgHeight<minHeight){
                    var wapperHeight = minHeight;
                }else if(imgHeight>=minHeight && imgHeight<=maxHeight){
                    var wapperHeight = imgHeight;
                }else if(imgHeight>maxHeight){
                    var wapperHeight = maxHeight;
                }





                wapper.css({
                    marginLeft: -wapperWidth/2,
                    marginTop: -wapperHeight/2
                });
                wapper.find('.Jcrop-where').css({
                    width:     wapperWidth,
                    overflowX: (imgWidth>=maxWidth)? 'scroll':'hidden',

                    height:    wapperHeight,
                    overflowY: (imgHeight>=maxHeight)?'scroll':'hidden'
                });



                wapper.find('.Jcrop-ok').click(function(){
                    that.cutImg();
                    that.destory();
                });
                wapper.find('.Jcrop-cancle').click(function(){
                    that.destory();
                });


                var jqueryImg = $('#targetImg');
                jqueryImg.Jcrop({
                    addClass: 'img-cut',

                    bgColor: 'black',
                    bgOpacity: 0.4,
                    shade: true,
                    onSelect: function(){
                        that.cache.api = this;
                    },
                    //选框 最小宽高
                    minSize: [280,210],
                    //选框 宽高比例（固定比例）
                    aspectRatio: 4/3
                },function(){
                    api = this;
                    api.setSelect([130,65,130+200,65+150]);
                });


            };



        },
        cutImg: function(){
            var that = this;
            var api = that.cache.api;
            var phpUrl = that.cache.opts.phpUrl;
            var cutSuccess = that.cache.opts.cutSuccess;


            //选框
            var selectorObj = api.tellSelect();
            //图片
            var imageObj = api.getWidgetSize();


            /*
             *
             imageH:333,
             imageRotate:0,
             imageSource:"http://www.js-css.cn/jscode/focus/focus19/images/b2.jpg",
             imageW:500,
             imageX:0,
             imageY:13.5,
             selectorH:200,
             selectorW:150,
             selectorX:175,
             selectorY:80,
             viewPortH:360,
             viewPortW:500

             */

            $.ajax({
                url : phpUrl, //'resize_and_crop.php',
                type: 'post',
                data: {
                    //pathOutput:that.cache.opts.path_output,
                    imageRotate: 0,
                    imageSource: that.cache.opts.img,
                    imageW: imageObj[0],
                    imageH: imageObj[1],
                    imageX: 0,
                    imageY: 0,

                    //svg
                    viewPortW: imageObj[0],
                    viewPortH: imageObj[1],

                    //选框
                    selectorH: selectorObj.h,
                    selectorW: selectorObj.w,
                    selectorX: selectorObj.x,
                    selectorY: selectorObj.y
                },
                success:function(imgRet){
                    cutSuccess && cutSuccess(imgRet);
                }
            });
        },
        destory: function(){
            $('#jcrop-wapper, #jcrop-cover').remove();
        }
    };




