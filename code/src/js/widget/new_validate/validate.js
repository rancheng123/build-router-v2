(function(){
    var methodConfig = {
        require: function (value, element, params) {
            return $.trim(value) != '';
        },
        range: function (value, element, params) {
            return value.length >= params[0] && value.length <= params[1];
        },
    };



    function ZcValidate(opts) {
        this.form = opts.form;
        this.rules = opts.rules;
        //出错就中断
        this.errorPause = opts.errorPause;
        this.errorPlacement = opts.errorPlacement;
        this.formElements = this.getElements();

        this.ready();

    };
    ZcValidate.prototype = {

        //获取参与验证的元素
        getElements: function () {
            return this.form.find('input,textarea,select')
                //过滤规则
                .filter('[name]');
        },

        validElement: function (element) {
            var that = this;
            var name = element.attr('name');
            var ruleObj = that.rules[name];
            var validRes = true;
            $.each(ruleObj, function (ruleName, ruleConfig) {
                var res = methodConfig[ruleName](element.val(), element, ruleConfig.params);
                if (res) {
                    var id = 'for' + name;
                    $('#' + id).remove();
                } else {

                    var id = 'for' + name;
                    $('#' + id).remove();

                    //替换
                    var msg = ruleConfig.msg.replace(/\{[^{}]\}/g, function (match, i, a) {
                        return ruleConfig.params[match.charAt(1)]
                    });
                    var errorElement = $('<div id=' + id + '>' + msg + '</div>');

                    if (that.errorPlacement) {
                        that.errorPlacement(errorElement, element);
                    } else {
                        element.after(errorElement);
                    }

                    validRes = false;
                    return false;
                }
            });
            return validRes;

        },
        valid: function () {
            var that = this;
            var validRes = true;
            that.formElements.each(function () {
                var res = that.validElement($(this));
                if (!res) {
                    validRes = false;

                    if (that.errorPause) {
                        return false;
                    }

                }
            });
            return validRes;

        },
        ready: function () {

        }
    };
    return ZcValidate;
})()

