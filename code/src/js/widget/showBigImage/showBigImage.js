/**
 * Created by xiaofengyun on 2016/8/3.
 */

    function showBigImage(options) {

        $('<div class="preview-shade"></div>'+
            '<div class="preview-pop">'+
            '<div class="closed"></div>'+
            '<div class="pic-wrap">'+
            '</div>'+
            '<div class="btns">'+
            '<a href="javascript:;" class="pre-btn"></a>'+
            '<a href="javascript:;" class="next-btn"></a>'+
            '</div>'+
            '</div>').appendTo($('body'));


        var  ele = options.jqueryEle;

        var  previewShade = $('.preview-shade');//背景蒙层
        var  previewPop = $('.preview-pop');//内容区域
        var  preBtn = $('.pre-btn'); //前一张
        var  nextBtn = $('.next-btn'); //下一张
        var  index; //获取图片索引
        var  src; //获取要展示得图片
        var  imgTotal;//总得图片张数
        var  imgBoxW; //获取图片盒子的原始宽度
        var  imgBoxH; //获取图片盒子的原始高度
        var that;
        ele.on('click','img',function(){
            that = $(this).parent();
            imgTotal = that.children('img').length -1;
            previewShade.show();
            previewPop.show();
            index = $(this).index();
            show(that);

            if(imgTotal > 1 )
            {
                $('.btns').show();
            }else {
                $('.btns').hide();
            }
        })
        //前一张
        preBtn.click(function(){
            index--;
            if(index < 0)
            {
                index = imgTotal;
            }
            show(that);
        })
        //下一张
        nextBtn.click(function(){
            index++;
            if(index > imgTotal)
            {
                index=0;
            }
            show(that);
        })
        $('.closed').click(function(){
            previewShade.hide();
            previewPop.hide();
        })

        //图片展示
        function show(that)
        {
            src = that.find('img').eq(index).attr('src');
            $('.pic-wrap').html('<img src='+src+'>');
            getWH($('.preview-pop'));
        }
        //获取图片盒子的容器
        function getWH(obj)
        {
            imgBoxW = obj.width();
            imgBoxH =  obj.height();
            obj.css({'marginLeft':-imgBoxW/2,'marginTop':-imgBoxH/2});
        }
    }


