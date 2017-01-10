xbn().module('friendRaise',function(X){


    //朋友众筹基类
    function FriendRaise(){

    };
    FriendRaise.prototype = {

        //发起
        launch: function(){

debugger;
            var testData = [{
                name: 'product',
                price: 18
            }];






            //请求模板
            X.view.renderTmpl({
                url: './template/friendRaise_1.html',
                where: $('#midBox'),
                renderData: {
                    list: testData
                }
            }).then(function(){


                DataUtil.ajax({
                    url: '/js/data/categories.json',
                    type: 'get',
                    errMsg : '系统错误：分类信息获取失败！'
                }).done(function(data){
                    if(!data.ret){
                        R_select({
                            jqueryEle: $('.select-case1'),
                            obj: '.select-ipt',
                            clickFn:function(opt){
                                //验证特殊元素  ，如select ,  图片
                                firstValidator.valiSpecail({
                                    isYes: function(){
                                        return opt.isSelected
                                    },
                                    jqueryInputElement: $('[name=useFor]')
                                });
                            },
                            data: data.data,
                            render: function(i,ele){
                                ele.icon = ele.icon? ele.icon: 'xxx';
                                return '<li data-id="'+ ele.id +'">' +
                                    '<img src="'+ ele.icon +'"/>' +
                                    '<span>'+ ele.name +'</span>' +
                                    '</li>'

                            },
                            where: $('.select-option ul')
                        });
                    }
                    else{
                        alert(data.ret)
                    }
                });


                //加载图片上传
                load_fileUpload({
                    where: $('#upload-cover')
                });



                //统计字数
                commonUtils.count({
                    jqueryEle: $('[name=title]')
                });



                //验证插件初始化
                var firstValidator = Validator.init({
                    where: $('#validateForm')
                });
                firstValidator.scan();

                //第一步点击
                $('.complete-launch').click(function(){
                    var res = $('#validateForm').valid();

                    /*测试start*/
                    res = true;
                    /*测试end*/

                    if(res){
                        //显示第二步
                        location.hash = 'm=friendRaise2&a=launch'
                    }
                });

                //加载图片上传
                function load_fileUpload(opts){
                    var cover_fileInput = R_fileUpload.init({
                        dataType:"json",
                        where: opts.where,
                        url: "/common/image/upload-source",
                        formData: {
                            dealID: '1cb4d78eda49c1fb3bfeb8ea',
                            type: "7"
                        },
                        FileTypes: {
                            rule: '(gif|jpe?g|png)',
                            error: '图片只能是 jpg,jpeg,gif,png 格式'
                        },
                        //文件大小限制
                        FileSizeLimit: {
                            rule: 1024 * 1024*2,
                            error: '文件大小不能超过2M'
                        },
                        success: function(e, data){

                            if(data.result.ret == 3){
                                alert('你上传的图片尺寸太小，请上传大于280*210的图片');
                                return;
                            }

                            var src = data.result.dat.path;
                            //图片裁切
                            var currentURL = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ":" + window.location.port : "");
                            R_cropImage.init({
                                img: currentURL + src,
                                phpUrl: '/common/image/upload-crop-cover',
                                path_output: currentURL + '/static/images/temp-lish',
                                where: $('#imgWrap'),
                                cutSuccess: function (res) {
                                    var res = eval('('+ res +')');
                                    if(!res.ret){
                                        var src = res.dat.img_url;
                                        //添加图片
                                        dataUtil.renderData({
                                            isClear: true,
                                            data: [1],
                                            render: function(i,ele){
                                                return '<li>' +
                                                    '<img src="'+ src +'" alt="">' +
                                                    '<span style="display: none">修改</span>' +
                                                    '</li>';
                                            },
                                            where: $('#pic-list-cover'),
                                            callback: function(where){
                                                where.find('li').on('mouseenter',function(){
                                                    $(this).find('span').show();
                                                }).on('mouseleave',function(){
                                                    $(this).find('span').hide();
                                                });

                                                //加载图片上传
                                                load_fileUpload({
                                                    where: where.find('li')
                                                });
                                            }
                                        });

                                        //验证特殊元素  ，如select ,  图片
                                        firstValidator.valiSpecail({
                                            isYes: function(){
                                                return $('.pic-list img').length
                                            },
                                            jqueryInputElement: $('[name=imgCover]')
                                        });
                                        $('#upload-cover').hide();
                                    }else{
                                        alert(res.msg)
                                    }
                                }
                            });
                        }
                    });
                }
                //发起协议弹层
                $('#argeement').click(function(){
                    $.layer({
                        hideTitle: true,
                        hideBtn: true,
                        shade: [0.5, '#000'],
                        area:['430px','366px'],
                        closeBtn: 0,
                        dialog: {
                            msg: $('#tpl-agreement').html(),
                            btns: 0
                        },
                        success:function(layero, index){
                            layero.find('.agree').click(function(){
                                window.layer.close(index);
                            })
                        }
                    })
                })



                //发起专用select
                function selectLaunchType(obj,callback)
                {
                    var select = $(obj);
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

                        callback&&callback.call( this );
                    })
                };


                //保存发起项目
                function saveProject(){
                    var deal_images = $.map($('#pic-list-pictrue img'),function(ele,i){
                        return $(ele).attr('src');
                    }).join(',');

                    dataUtil.ajax({
                        url: '/friend/project/ajax-save-project',
                        errMsg: '系统错误：项目保存失败！',
                        data: {
                            category_id: $('.select-case1 .select-text').attr('data-id'),
                            deal_name: commonUtils.filterTag( $('[name=title]').val() ),
                            target_amount: $('[name=money]').val(),
                            deal_desc: commonUtils.newline( commonUtils.filterTag( $('[name=desc]').val() ) ) ,
                            deal_cover: $('#pic-list-cover img').attr('src'),
                            deal_images: deal_images
                        }
                    }).done(function(data){
                        if(!data.ret){
                            location.href= '/friend/project/share?deal_id='+data.dat.deal_id;
                        } else {
                            alert(data.msg);
                        }
                    });
                }


            });
        }
    };

    var friendRaiseCase = new FriendRaise();
    friendRaiseCase[ router.cache.currentRoute.action ]();
});


