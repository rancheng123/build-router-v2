
var Validator = (function(){
    $.extend($.validator.messages, {
        required: "* 此项为必填项～",
        minlength:  $.validator.format("* 最少输入 {0} 个字符～")
    });

    var valiRules = {
        "required": {
            "paras": true,
            "messages": function(){
                return "* 此项为必填项～"
            }
        },
        "isIntGt0": {
            "paras": true,
            "messages": function(){
                return "* 请输入大于0的整数～"
            },
            "reg": function (value, element) {
                value = $.trim(value);
                return this.optional(element) || ((/^\d+$/.test(value)) && value>0);
            }
        },
        "isIntGt500": {
            "paras": true,
            "messages": function(){
                return "* 请输入不小于500的整数～"
            },
            "reg": function (value, element) {
                value = $.trim(value);
                return this.optional(element) || ((/^\d+$/.test(value))  && (value>=500 && value<=99999999));
            }
        },
        "isIntGt10-59": {
            "paras": true,
            "messages": function(){
                return "* 请输入10-59之间的整数～"
            },
            "reg": function (value, element) {
                return this.optional(element) || ((/^\d+$/.test(value)) && (value>=10 && value<=59));
            }
        },
        "isIDCard": {
            "paras": true,
            "messages": function(){
                return "* 请输入正确的身份证号码～"
            },
            "reg": function (value, element) {
                return this.optional(element) || /^(\d{18,18}|\d{15,15}|\d{17,17}[xX])$/.test(value);
            }
        },
        "isIntGt1-99999999": {
            "paras": true,
            "messages": function(){
                return "* 请输入大于0的整数～"
            },
            "reg": function (value, element) {
                return this.optional(element) || ((/^\d+$/.test(value)) && (value<=99999999 && value>0));//返回true的条件
            }
        }
    };
    $.each(valiRules,function(ruleName,ruleConfig){
        if(ruleConfig.reg){
            $.validator.addMethod(ruleName, function (value, element) {
                return ruleConfig.reg.call(this, value, element);
            });
        };
    });


    //扩展功能
    var extendFn = {
        scan: function(oContext){
            var validator = this;


            /*//过滤掉html注释
             sHtml = oContext.html().replace(/<!--[\w\W\r\n]*?-->/gmi, '');
             //提前预览 验证规则
             usingRules = sHtml.match(/vali-[\w\d]+/g);
             //除掉重复rules
             usingRules = unique(usingRules);

             */


            $.each(valiRules,function(ruleName,usingRule){
                if(valiRules.hasOwnProperty(ruleName)){
                    var ruleConfig = valiRules[ruleName];
                    //添加或删除rules
                    validator.addOrRemoveRules(ruleName,ruleConfig)
                }else{
                    console.error('验证插件中没有配置'+ ruleName +'此验证项')
                }
            });
        },
        //添加或删除rules
        addOrRemoveRules: function(ruleName,ruleConfig){

            var validator = this;
            var name = ruleName;
            var paras = ruleConfig.paras;
            var messages = ruleConfig.messages();


            var valiEles = $(validator.currentForm).find('[class*='+ 'vali-yes' +']');


            valiEles.each(function () {

                var that_ele = $(this);

                //未加过,有class，   添加规则
                if( !(that_ele.data('valiCache') && that_ele.data('valiCache')[name])  &&  that_ele.hasClass('vali-'+name)  ){
                    var ruleObj = {};
                    ruleObj[name] = paras;
                    ruleObj.messages = {};
                    ruleObj.messages[name] = messages;

                    that_ele.rules("add", ruleObj);

                    if( !that_ele.data('valiCache') ){
                        that_ele.data('valiCache',{})
                    }
                    that_ele.data('valiCache')[name] = true;
                }
                //已加过,无class，   删除规则
                else if(  (that_ele.data('valiCache') && that_ele.data('valiCache')[name])  &&  !that_ele.hasClass('vali-'+name)  ){

                    that_ele.rules("remove", name);
                    delete that_ele.data('valiCache')[name];
                    if( $.isEmptyObject(that_ele.data('valiCache')) ){
                        that_ele.data('valiCache',undefined);
                    }
                }
            });
        },
        //验证特殊元素  ，如select ,  图片
        valiSpecail: function(opts){

            var validator = this;
            //验证通过的条件
            var isYes = opts.isYes();

            var jqueryInputElement = opts.jqueryInputElement;

            if(isYes){
                jqueryInputElement.val(1);
                validator.element( jqueryInputElement )
            }else{
                jqueryInputElement.val('');
                validator.element( jqueryInputElement )
            }

        }
    };



    var Validator = {
        //cache: {},

        init: function(opts){

            var that = this;
            var where = opts.where;

            var validator =  where.validate({
                focusCleanup: true,
                ignore: ":hidden ,.ignore",
                joinValid: '.vali-join',
                errorClass: 'validateErrorTip',
                errorPlacement: function (error, element) {
                    var validateErrorTipWrap = element.closest('.vali-item').find('.vali-error');
                    error.appendTo(validateErrorTipWrap)
                },
                onfocusout: function (element) {
                    $(element).valid();
                }
            });

            //继承
            $.extend(validator,extendFn);

            return validator;
        }

    };

    return Validator;
})();

//# sourceURL=validata.js




