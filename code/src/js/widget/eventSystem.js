


    var eventSystem = (function(){
        var eventStore = {};
        var eventSystem = {
            on: function(oContext,eventType,callback){
                if(!eventStore[oContext]){
                    eventStore[oContext] = {};
                };
                if(!eventStore[oContext][eventType]){
                    eventStore[oContext][eventType] = [];
                };
                eventStore[oContext][eventType].push(callback);
            },

            off: function(oContext,eventType){
                if(!eventStore[oContext]){
                    console.error('没有'+ oContext +'此宿主');
                    return;
                }
                if(!eventType){
                    delete eventStore[oContext];
                }else{
                    delete eventStore[oContext][eventType];
                };
            },

            trigger: function(oContext,eventType){
                if(!eventStore[oContext]){
                    console.error('没有'+ oContext +'此宿主');
                    return;
                }
                if(!eventStore[oContext][eventType]){
                    console.error('没有'+ eventType +'此事件');
                    return;
                }
                var callbackList = eventStore[oContext][eventType];
                for(var i=0;i<callbackList.length;i++){
                    callbackList[i]();
                }
            }
        };
        return eventSystem;
    })();






   /* //使用
    document.getElementById('on').onclick = function(){
        //注册事件
        eventSystem.on('head','toGreen',function(){
            document.body.style.background = 'green';

            console.log('发布事件成功')
        });
    };

    document.getElementById('trigger').onclick = function(){
        //发布事件
        eventSystem.trigger('head','toGreen');
    };

    document.getElementById('off').onclick = function(){
        //卸载事件
        eventSystem.off('head','toGreen');
    };
*/
