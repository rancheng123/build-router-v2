
//api文档
//https://github.com/blueimp/jQuery-File-Upload/wiki/API



    var R_fileUpload = {
        init: function(opts){

            var where = opts.where;
            var url = opts.url;
            var formData = opts.formData;
            var success = opts.success;





            //结构
            var id = 'fileupload' + new Date().getTime();
            var fileInput = $('<div style="position:absolute;width:100%;height:100%;overflow: hidden;top: 0px;left:0px;opacity: 0;filter:alpha(opacity=0)">' +
                '<input id="' + id + '" type="file" name="image" style="width:10000px;height:10000px;cursor: pointer">' +
                '</div>').appendTo(where);


            var fileCase = fileInput.fileupload({
                url: url,
                formData: formData,
                dataType: 'json',
                add: function (e, data) {

                    //防止多个请求同时发送
                    if(fileCase.ajaxSending){
                        return;
                    }


                    //文件类型
                    if(opts.FileTypes){
                        var name = data.files[0]['name'];
                        //后缀
                        var postfix = name.substring( name.lastIndexOf('.')+1 );
                        var fileTypesReg =new RegExp(opts.FileTypes.rule,'i');
                        if(!fileTypesReg.test(postfix)){
                            alert(opts.FileTypes.error);return;
                        }
                    };

                    //文件大小
                    if(opts.FileSizeLimit){
                        var size=data.files[0]['size'];
                        var rule = opts.FileSizeLimit.rule;
                        if(size>rule){
                            alert( opts.FileSizeLimit.error);return;
                        }
                    }

                    data.submit();
                    fileCase.ajaxSending = true;
                },
                done: function (e, data) {
                    success && success(e, data);

                    fileCase.ajaxSending = false;
                }
            });
            return fileCase;
        }
    };






//# sourceURL=fileUpload.js
