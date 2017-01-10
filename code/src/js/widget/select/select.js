

    /**
     * Created by xiaofengyun on 2016/7/25.
     */

    function R_select(opts)
    {
        var jqueryEle = opts.jqueryEle,
            clickFn = opts.clickFn,
            data = opts.data,
            render = opts.render,
            //默认选中项
            selectId = opts.selectId;



        jqueryEle.html('');

        $('<div class="select-ipt">' +
            '<div class="select-tit select-click">' +
                '<span class="select-text">请选择</span>' +
                '<i class="drop-down"></i>' +
            '</div>' +
            '<div class="select-con select-option">' +
                '<ul class="select-ul clearfix"></ul>' +
            '</div>' +
        '</div>').appendTo( jqueryEle );



        var ul = jqueryEle.find('.select-ul');

        if(data && data.length){
            var lis = '';
            $.each(data,function(i,ele){
                lis += render(i,ele);
            });
            $(lis).appendTo( ul );
        }




        var selectTit = jqueryEle.find('.select-click'); //单击区域
        var changeText = jqueryEle.find('.select-text');//改变文字
        var selectShow = jqueryEle.find('.select-option') //点击选项
        selectTit.click(function(event){
            event.stopPropagation();
            if(selectShow.is(':visible')){
                selectShow.slideUp();
            }else {
                selectShow.slideDown()//.parent().siblings().find('.select-option').slideUp();
            }
        });
        $(document).click(function(event){
            if(!selectShow.is(event.target) && selectShow.has(event.target).length === 0)
            {
                if(selectShow.is(':visible'))
                {
                    selectShow.slideUp();

                }
            }
        });




        selectShow.find('li').click(function(){

            fillData($(this).attr('data-id'),data);
            /*changeText.html($(this).find('span').html()).css("color","#000")
                .attr('data-id',$(this).attr('data-id'));*/



            selectShow.slideToggle();

            clickFn && clickFn.call(this,{
                changeText: changeText,
                isSelected: changeText.text() == '请选择' ? false: true
            });
        });


        if(typeof selectId != 'undefined' && selectId != '' && selectId != null ){
            fillData(selectId,data);
        }

        //填充数据
        function fillData(id,data){
            var match = null;
            $.each(data,function(i,ele){
                if(ele.id == id){
                    match = ele;
                }
            });
            var text = match.name;
            changeText.html(text).css("color","#000")
                .attr('data-id',id);
        }
    };










