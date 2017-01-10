
$.fn.extend({

    //事件扩展
    input : function(fn){


        var aInput = $(this);


        if(window.navigator.userAgent.indexOf('MSIE 9')!=-1)
        {
            aInput.each(function(i){

                var eachInput = this;
                eachInput.timer = null;

                eachInput.onfocus = function(){
                    this.timer = setInterval(function(){
                        fn.call(eachInput)
                    },30);
                };

                eachInput.onblur = function(){

                    clearInterval(this.timer)
                }
            });

            return;
        };


        if(document.getElementsByClassName)
        {
            aInput.each(function(i){
                this.oninput = function(){
                    fn.call(this);

                }
            })
        }
        else
        {
            aInput.each(function(i){
                this.onpropertychange = function(){
                    fn.call(this);
                }
            });
        };



    }
})
$.extend({
    browser: function()
    {
        var
            rwebkit = /(webkit)\/([\w.]+)/,
            ropera = /(opera)(?:.*version)?[ \/]([\w.]+)/,
            rmsie = /(msie) ([\w.]+)/,
            rmozilla = /(mozilla)(?:.*? rv:([\w.]+))?/,
            browser = {},
            ua = window.navigator.userAgent,
            browserMatch = uaMatch(ua);

        if (browserMatch.browser) {
            browser[browserMatch.browser] = true;
            browser.version = browserMatch.version;
        }
        return { browser: browser };
    }
});

function uaMatch(ua)
{
    ua = ua.toLowerCase();

    var match = rwebkit.exec(ua)
        || ropera.exec(ua)
        || rmsie.exec(ua)
        || ua.indexOf("compatible") < 0 && rmozilla.exec(ua)
        || [];

    return {
        browser : match[1] || "",
        version : match[2] || "0"
    };
}