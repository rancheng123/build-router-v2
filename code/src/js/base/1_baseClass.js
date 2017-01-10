(function(Win){


    //基类
    function Project(){
        //宿主标志
        this.oContext = 'xbn_modules';
    };
    //继承事件系统
    Project.prototype = new EventSystem();


    //注册模块
    Project.prototype.module = function(moduleName,fn){
        var that = this;
        that.on(that.oContext,moduleName,fn);
    };

    //发布模块
    Project.prototype.publish = function(moduleName,params){
        var that = this;
        that.trigger(that.oContext,moduleName,params);
    };










    Win.xbn = function(){
        if(!Win.xbnCase){
            Win.xbnCase = new Project();
        }
        return Win.xbnCase;
    };

})(this);