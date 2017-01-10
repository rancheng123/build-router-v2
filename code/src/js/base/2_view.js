(function(X){

    var view = {
        //请求本地模板
        renderTmpl: function(opts){
            var that = this;
            var url = opts.url;
            var where = opts.where;
            var renderData = opts.renderData;

            return $.ajax({
                url: url,
                type: "GET",
                cache: false
            }).then(function(tempText){

                that.renderText(tempText, renderData, where);
            })

        },
        //渲染子模板
        renderChildTmpl: function(opts){
            var that = this;
            var url = opts.url;
            var where = opts.where;
            var renderData = opts.renderData;


            var tempText = url.html();
            tempText = $.trim(tempText).replace(/_\[+/g, "{").replace(/\]+_/g, "}");

            that.renderText(tempText, renderData, where);
        },

        //渲染文本
        renderText: function(tempText, renderData, where){
            //包一层( 防止结构丢失，因为jquery.tmpl识别最外层为script标签 ，会自动去掉)
            tempText = '<div>'+ tempText +'</div>';
            var content = $(tempText).tmpl(renderData);
            where.html(content)
        },
    };

    X.view = view;



})(xbn());