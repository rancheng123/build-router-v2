
var DataUtil = {
        //统一ajax入口
        ajax: function(opts){
            var that = this;

            opts.type = opts.type || "post";
            opts.dataType = opts.dataType || "json";
            var xhr = $.ajax(opts);
            if (xhr) {
                xhr.fail(function () {
                    alert(opts.errMsg);
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

        }
    };







