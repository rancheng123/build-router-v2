var eventSystem=function(){var eventStore={};var eventSystem={on:function(oContext,eventType,callback){if(!eventStore[oContext]){eventStore[oContext]={}}if(!eventStore[oContext][eventType]){eventStore[oContext][eventType]=[]}eventStore[oContext][eventType].push(callback)},off:function(oContext,eventType){if(!eventStore[oContext]){console.error("没有"+oContext+"此宿主");return}if(!eventType){delete eventStore[oContext]}else{delete eventStore[oContext][eventType]}},trigger:function(oContext,eventType){if(!eventStore[oContext]){console.error("没有"+oContext+"此宿主");return}if(!eventStore[oContext][eventType]){console.error("没有"+eventType+"此事件");return}var callbackList=eventStore[oContext][eventType];for(var i=0;i<callbackList.length;i++){callbackList[i]()}}};return eventSystem}();/* //使用
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
var R_cropImage={cache:{},init:function(opts){var that=this;var imgSrc=opts.img;var where=opts.where;$.extend(that.cache,{opts:opts});that.destory();$('<div id="jcrop-cover">').appendTo($("body"));/*测试  start*/
//var imgSrc = './crop/1.jpg';
/*测试  end*/
var imgObj=new Image;imgObj.src=imgSrc;imgObj.onload=function(){var wapper=$('<div id="jcrop-wapper">'+'<div class="Jcrop-where">'+'<img id="targetImg" src="'+imgSrc+'">'+"</div>"+'<div class="Jcrop-control">'+'<span class="Jcrop-cancle">取消</span>'+'<span class="Jcrop-ok">确定</span>'+"</div>"+"</div>").appendTo($("body"));var imgWidth=this.width;var imgHeight=this.height;
//弹窗最大宽高
var maxWidth=$(window).width()*.8;var maxHeight=$(window).height()*.8;
//弹窗最小宽高
var minWidth=150;var minHeight=150;if(imgWidth<minWidth){var wapperWidth=minWidth}else if(imgWidth>=minWidth&&imgWidth<=maxWidth){var wapperWidth=imgWidth}else if(imgWidth>maxWidth){var wapperWidth=maxWidth}if(imgHeight<minHeight){var wapperHeight=minHeight}else if(imgHeight>=minHeight&&imgHeight<=maxHeight){var wapperHeight=imgHeight}else if(imgHeight>maxHeight){var wapperHeight=maxHeight}wapper.css({marginLeft:-wapperWidth/2,marginTop:-wapperHeight/2});wapper.find(".Jcrop-where").css({width:wapperWidth,overflowX:imgWidth>=maxWidth?"scroll":"hidden",height:wapperHeight,overflowY:imgHeight>=maxHeight?"scroll":"hidden"});wapper.find(".Jcrop-ok").click(function(){that.cutImg();that.destory()});wapper.find(".Jcrop-cancle").click(function(){that.destory()});var jqueryImg=$("#targetImg");jqueryImg.Jcrop({addClass:"img-cut",bgColor:"black",bgOpacity:.4,shade:true,onSelect:function(){that.cache.api=this},
//选框 最小宽高
minSize:[280,210],
//选框 宽高比例（固定比例）
aspectRatio:4/3},function(){api=this;api.setSelect([130,65,130+200,65+150])})}},cutImg:function(){var that=this;var api=that.cache.api;var phpUrl=that.cache.opts.phpUrl;var cutSuccess=that.cache.opts.cutSuccess;
//选框
var selectorObj=api.tellSelect();
//图片
var imageObj=api.getWidgetSize();/*
             *
             imageH:333,
             imageRotate:0,
             imageSource:"http://www.js-css.cn/jscode/focus/focus19/images/b2.jpg",
             imageW:500,
             imageX:0,
             imageY:13.5,
             selectorH:200,
             selectorW:150,
             selectorX:175,
             selectorY:80,
             viewPortH:360,
             viewPortW:500

             */
$.ajax({url:phpUrl,//'resize_and_crop.php',
type:"post",data:{
//pathOutput:that.cache.opts.path_output,
imageRotate:0,imageSource:that.cache.opts.img,imageW:imageObj[0],imageH:imageObj[1],imageX:0,imageY:0,
//svg
viewPortW:imageObj[0],viewPortH:imageObj[1],
//选框
selectorH:selectorObj.h,selectorW:selectorObj.w,selectorX:selectorObj.x,selectorY:selectorObj.y},success:function(imgRet){cutSuccess&&cutSuccess(imgRet)}})},destory:function(){$("#jcrop-wapper, #jcrop-cover").remove()}};/**
 * jquery.Jcrop.js v0.9.12
 * jQuery Image Cropping Plugin - released under MIT License 
 * Author: Kelly Hallman <khallman@gmail.com>
 * http://github.com/tapmodo/Jcrop
 * Copyright (c) 2008-2013 Tapmodo Interactive LLC {{{
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 *
 * }}}
 */
(function($){$.Jcrop=function(obj,opt){var options=$.extend({},$.Jcrop.defaults),docOffset,_ua=navigator.userAgent.toLowerCase(),is_msie=/msie/.test(_ua),ie6mode=/msie [1-6]\./.test(_ua);
// Internal Methods {{{
function px(n){return Math.round(n)+"px"}function cssClass(cl){return options.baseClass+"-"+cl}function supportsColorFade(){return $.fx.step.hasOwnProperty("backgroundColor")}function getPos(obj){var pos=$(obj).offset();return[pos.left,pos.top]}
//}}}
function mouseAbs(e){return[e.pageX-docOffset[0],e.pageY-docOffset[1]]}
//}}}
function setOptions(opt){if(typeof opt!=="object")opt={};options=$.extend(options,opt);$.each(["onChange","onSelect","onRelease","onDblClick"],function(i,e){if(typeof options[e]!=="function")options[e]=function(){}})}
//}}}
function startDragMode(mode,pos,touch){docOffset=getPos($img);Tracker.setCursor(mode==="move"?mode:mode+"-resize");if(mode==="move"){return Tracker.activateHandlers(createMover(pos),doneSelect,touch)}var fc=Coords.getFixed();var opp=oppLockCorner(mode);var opc=Coords.getCorner(oppLockCorner(opp));Coords.setPressed(Coords.getCorner(opp));Coords.setCurrent(opc);Tracker.activateHandlers(dragmodeHandler(mode,fc),doneSelect,touch)}
//}}}
function dragmodeHandler(mode,f){return function(pos){if(!options.aspectRatio){switch(mode){case"e":pos[1]=f.y2;break;case"w":pos[1]=f.y2;break;case"n":pos[0]=f.x2;break;case"s":pos[0]=f.x2;break}}else{switch(mode){case"e":pos[1]=f.y+1;break;case"w":pos[1]=f.y+1;break;case"n":pos[0]=f.x+1;break;case"s":pos[0]=f.x+1;break}}Coords.setCurrent(pos);Selection.update()}}
//}}}
function createMover(pos){var lloc=pos;KeyManager.watchKeys();return function(pos){Coords.moveOffset([pos[0]-lloc[0],pos[1]-lloc[1]]);lloc=pos;Selection.update()}}
//}}}
function oppLockCorner(ord){switch(ord){case"n":return"sw";case"s":return"nw";case"e":return"nw";case"w":return"ne";case"ne":return"sw";case"nw":return"se";case"se":return"nw";case"sw":return"ne"}}
//}}}
function createDragger(ord){return function(e){if(options.disabled){return false}if(ord==="move"&&!options.allowMove){return false}
// Fix position of crop area when dragged the very first time.
// Necessary when crop image is in a hidden element when page is loaded.
docOffset=getPos($img);btndown=true;startDragMode(ord,mouseAbs(e));e.stopPropagation();e.preventDefault();return false}}
//}}}
function presize($obj,w,h){var nw=$obj.width(),nh=$obj.height();if(nw>w&&w>0){nw=w;nh=w/$obj.width()*$obj.height()}if(nh>h&&h>0){nh=h;nw=h/$obj.height()*$obj.width()}xscale=$obj.width()/nw;yscale=$obj.height()/nh;$obj.width(nw).height(nh)}
//}}}
function unscale(c){return{x:c.x*xscale,y:c.y*yscale,x2:c.x2*xscale,y2:c.y2*yscale,w:c.w*xscale,h:c.h*yscale}}
//}}}
function doneSelect(pos){var c=Coords.getFixed();if(c.w>options.minSelect[0]&&c.h>options.minSelect[1]){Selection.enableHandles();Selection.done()}else{Selection.release()}Tracker.setCursor(options.allowSelect?"crosshair":"default")}
//}}}
function newSelection(e){if(options.disabled){return false}if(!options.allowSelect){return false}btndown=true;docOffset=getPos($img);Selection.disableHandles();Tracker.setCursor("crosshair");var pos=mouseAbs(e);Coords.setPressed(pos);Selection.update();Tracker.activateHandlers(selectDrag,doneSelect,e.type.substring(0,5)==="touch");KeyManager.watchKeys();e.stopPropagation();e.preventDefault();return false}
//}}}
function selectDrag(pos){Coords.setCurrent(pos);Selection.update()}
//}}}
function newTracker(){var trk=$("<div></div>").addClass(cssClass("tracker"));if(is_msie){trk.css({opacity:0,backgroundColor:"white"})}return trk}
//}}}
// }}}
// Initialization {{{
// Sanitize some options {{{
if(typeof obj!=="object"){obj=$(obj)[0]}if(typeof opt!=="object"){opt={}}
// }}}
setOptions(opt);
// Initialize some jQuery objects {{{
// The values are SET on the image(s) for the interface
// If the original image has any of these set, they will be reset
// However, if you destroy() the Jcrop instance the original image's
// character in the DOM will be as you left it.
var img_css={border:"none",visibility:"visible",margin:0,padding:0,position:"absolute",top:0,left:0};var $origimg=$(obj),img_mode=true;if(obj.tagName=="IMG"){
// Fix size of crop image.
// Necessary when crop image is within a hidden element when page is loaded.
if($origimg[0].width!=0&&$origimg[0].height!=0){
// Obtain dimensions from contained img element.
$origimg.width($origimg[0].width);$origimg.height($origimg[0].height)}else{
// Obtain dimensions from temporary image in case the original is not loaded yet (e.g. IE 7.0). 
var tempImage=new Image;tempImage.src=$origimg[0].src;$origimg.width(tempImage.width);$origimg.height(tempImage.height)}var $img=$origimg.clone().removeAttr("id").css(img_css).show();$img.width($origimg.width());$img.height($origimg.height());$origimg.after($img).hide()}else{$img=$origimg.css(img_css).show();img_mode=false;if(options.shade===null){options.shade=true}}presize($img,options.boxWidth,options.boxHeight);var boundx=$img.width(),boundy=$img.height(),$div=$("<div />").width(boundx).height(boundy).addClass(cssClass("holder")).css({position:"relative",backgroundColor:options.bgColor}).insertAfter($origimg).append($img);if(options.addClass){$div.addClass(options.addClass)}var $img2=$("<div />"),$img_holder=$("<div />").width("100%").height("100%").css({zIndex:310,position:"absolute",overflow:"hidden"}),$hdl_holder=$("<div />").width("100%").height("100%").css("zIndex",320),$sel=$("<div />").css({position:"absolute",zIndex:600}).dblclick(function(){var c=Coords.getFixed();options.onDblClick.call(api,c)}).insertBefore($img).append($img_holder,$hdl_holder);if(img_mode){$img2=$("<img />").attr("src",$img.attr("src")).css(img_css).width(boundx).height(boundy),$img_holder.append($img2)}if(ie6mode){$sel.css({overflowY:"hidden"})}var bound=options.boundary;var $trk=newTracker().width(boundx+bound*2).height(boundy+bound*2).css({position:"absolute",top:px(-bound),left:px(-bound),zIndex:290}).mousedown(newSelection);/* }}} */
// Set more variables {{{
var bgcolor=options.bgColor,bgopacity=options.bgOpacity,xlimit,ylimit,xmin,ymin,xscale,yscale,enabled=true,btndown,animating,shift_down;docOffset=getPos($img);
// }}}
// }}}
// Internal Modules {{{
// Touch Module {{{ 
var Touch=function(){
// Touch support detection function adapted (under MIT License)
// from code by Jeffrey Sambells - http://github.com/iamamused/
function hasTouchSupport(){var support={},events=["touchstart","touchmove","touchend"],el=document.createElement("div"),i;try{for(i=0;i<events.length;i++){var eventName=events[i];eventName="on"+eventName;var isSupported=eventName in el;if(!isSupported){el.setAttribute(eventName,"return;");isSupported=typeof el[eventName]=="function"}support[events[i]]=isSupported}return support.touchstart&&support.touchend&&support.touchmove}catch(err){return false}}function detectSupport(){if(options.touchSupport===true||options.touchSupport===false)return options.touchSupport;else return hasTouchSupport()}return{createDragger:function(ord){return function(e){if(options.disabled){return false}if(ord==="move"&&!options.allowMove){return false}docOffset=getPos($img);btndown=true;startDragMode(ord,mouseAbs(Touch.cfilter(e)),true);e.stopPropagation();e.preventDefault();return false}},newSelection:function(e){return newSelection(Touch.cfilter(e))},cfilter:function(e){e.pageX=e.originalEvent.changedTouches[0].pageX;e.pageY=e.originalEvent.changedTouches[0].pageY;return e},isSupported:hasTouchSupport,support:detectSupport()}}();
// }}}
// Coords Module {{{
var Coords=function(){var x1=0,y1=0,x2=0,y2=0,ox,oy;function setPressed(pos){pos=rebound(pos);x2=x1=pos[0];y2=y1=pos[1]}
//}}}
function setCurrent(pos){pos=rebound(pos);ox=pos[0]-x2;oy=pos[1]-y2;x2=pos[0];y2=pos[1]}
//}}}
function getOffset(){return[ox,oy]}
//}}}
function moveOffset(offset){var ox=offset[0],oy=offset[1];if(0>x1+ox){ox-=ox+x1}if(0>y1+oy){oy-=oy+y1}if(boundy<y2+oy){oy+=boundy-(y2+oy)}if(boundx<x2+ox){ox+=boundx-(x2+ox)}x1+=ox;x2+=ox;y1+=oy;y2+=oy}
//}}}
function getCorner(ord){var c=getFixed();switch(ord){case"ne":return[c.x2,c.y];case"nw":return[c.x,c.y];case"se":return[c.x2,c.y2];case"sw":return[c.x,c.y2]}}
//}}}
function getFixed(){if(!options.aspectRatio){return getRect()}
// This function could use some optimization I think...
var aspect=options.aspectRatio,min_x=options.minSize[0]/xscale,
//min_y = options.minSize[1]/yscale,
max_x=options.maxSize[0]/xscale,max_y=options.maxSize[1]/yscale,rw=x2-x1,rh=y2-y1,rwa=Math.abs(rw),rha=Math.abs(rh),real_ratio=rwa/rha,xx,yy,w,h;if(max_x===0){max_x=boundx*10}if(max_y===0){max_y=boundy*10}if(real_ratio<aspect){yy=y2;w=rha*aspect;xx=rw<0?x1-w:w+x1;if(xx<0){xx=0;h=Math.abs((xx-x1)/aspect);yy=rh<0?y1-h:h+y1}else if(xx>boundx){xx=boundx;h=Math.abs((xx-x1)/aspect);yy=rh<0?y1-h:h+y1}}else{xx=x2;h=rwa/aspect;yy=rh<0?y1-h:y1+h;if(yy<0){yy=0;w=Math.abs((yy-y1)*aspect);xx=rw<0?x1-w:w+x1}else if(yy>boundy){yy=boundy;w=Math.abs(yy-y1)*aspect;xx=rw<0?x1-w:w+x1}}
// Magic %-)
if(xx>x1){// right side
if(xx-x1<min_x){xx=x1+min_x}else if(xx-x1>max_x){xx=x1+max_x}if(yy>y1){yy=y1+(xx-x1)/aspect}else{yy=y1-(xx-x1)/aspect}}else if(xx<x1){// left side
if(x1-xx<min_x){xx=x1-min_x}else if(x1-xx>max_x){xx=x1-max_x}if(yy>y1){yy=y1+(x1-xx)/aspect}else{yy=y1-(x1-xx)/aspect}}if(xx<0){x1-=xx;xx=0}else if(xx>boundx){x1-=xx-boundx;xx=boundx}if(yy<0){y1-=yy;yy=0}else if(yy>boundy){y1-=yy-boundy;yy=boundy}return makeObj(flipCoords(x1,y1,xx,yy))}
//}}}
function rebound(p){if(p[0]<0)p[0]=0;if(p[1]<0)p[1]=0;if(p[0]>boundx)p[0]=boundx;if(p[1]>boundy)p[1]=boundy;return[Math.round(p[0]),Math.round(p[1])]}
//}}}
function flipCoords(x1,y1,x2,y2){var xa=x1,xb=x2,ya=y1,yb=y2;if(x2<x1){xa=x2;xb=x1}if(y2<y1){ya=y2;yb=y1}return[xa,ya,xb,yb]}
//}}}
function getRect(){var xsize=x2-x1,ysize=y2-y1,delta;if(xlimit&&Math.abs(xsize)>xlimit){x2=xsize>0?x1+xlimit:x1-xlimit}if(ylimit&&Math.abs(ysize)>ylimit){y2=ysize>0?y1+ylimit:y1-ylimit}if(ymin/yscale&&Math.abs(ysize)<ymin/yscale){y2=ysize>0?y1+ymin/yscale:y1-ymin/yscale}if(xmin/xscale&&Math.abs(xsize)<xmin/xscale){x2=xsize>0?x1+xmin/xscale:x1-xmin/xscale}if(x1<0){x2-=x1;x1-=x1}if(y1<0){y2-=y1;y1-=y1}if(x2<0){x1-=x2;x2-=x2}if(y2<0){y1-=y2;y2-=y2}if(x2>boundx){delta=x2-boundx;x1-=delta;x2-=delta}if(y2>boundy){delta=y2-boundy;y1-=delta;y2-=delta}if(x1>boundx){delta=x1-boundy;y2-=delta;y1-=delta}if(y1>boundy){delta=y1-boundy;y2-=delta;y1-=delta}return makeObj(flipCoords(x1,y1,x2,y2))}
//}}}
function makeObj(a){return{x:a[0],y:a[1],x2:a[2],y2:a[3],w:a[2]-a[0],h:a[3]-a[1]}}
//}}}
return{flipCoords:flipCoords,setPressed:setPressed,setCurrent:setCurrent,getOffset:getOffset,moveOffset:moveOffset,getCorner:getCorner,getFixed:getFixed}}();
//}}}
// Shade Module {{{
var Shade=function(){var enabled=false,holder=$("<div />").css({position:"absolute",zIndex:240,opacity:0}),shades={top:createShade(),left:createShade().height(boundy),right:createShade().height(boundy),bottom:createShade()};function resizeShades(w,h){shades.left.css({height:px(h)});shades.right.css({height:px(h)})}function updateAuto(){return updateShade(Coords.getFixed())}function updateShade(c){shades.top.css({left:px(c.x),width:px(c.w),height:px(c.y)});shades.bottom.css({top:px(c.y2),left:px(c.x),width:px(c.w),height:px(boundy-c.y2)});shades.right.css({left:px(c.x2),width:px(boundx-c.x2)});shades.left.css({width:px(c.x)})}function createShade(){return $("<div />").css({position:"absolute",backgroundColor:options.shadeColor||options.bgColor}).appendTo(holder)}function enableShade(){if(!enabled){enabled=true;holder.insertBefore($img);updateAuto();Selection.setBgOpacity(1,0,1);$img2.hide();setBgColor(options.shadeColor||options.bgColor,1);if(Selection.isAwake()){setOpacity(options.bgOpacity,1)}else setOpacity(1,1)}}function setBgColor(color,now){colorChangeMacro(getShades(),color,now)}function disableShade(){if(enabled){holder.remove();$img2.show();enabled=false;if(Selection.isAwake()){Selection.setBgOpacity(options.bgOpacity,1,1)}else{Selection.setBgOpacity(1,1,1);Selection.disableHandles()}colorChangeMacro($div,0,1)}}function setOpacity(opacity,now){if(enabled){if(options.bgFade&&!now){holder.animate({opacity:1-opacity},{queue:false,duration:options.fadeTime})}else holder.css({opacity:1-opacity})}}function refreshAll(){options.shade?enableShade():disableShade();if(Selection.isAwake())setOpacity(options.bgOpacity)}function getShades(){return holder.children()}return{update:updateAuto,updateRaw:updateShade,getShades:getShades,setBgColor:setBgColor,enable:enableShade,disable:disableShade,resize:resizeShades,refresh:refreshAll,opacity:setOpacity}}();
// }}}
// Selection Module {{{
var Selection=function(){var awake,hdep=370,borders={},handle={},dragbar={},seehandles=false;
// Private Methods
function insertBorder(type){var jq=$("<div />").css({position:"absolute",opacity:options.borderOpacity}).addClass(cssClass(type));$img_holder.append(jq);return jq}
//}}}
function dragDiv(ord,zi){var jq=$("<div />").mousedown(createDragger(ord)).css({cursor:ord+"-resize",position:"absolute",zIndex:zi}).addClass("ord-"+ord);if(Touch.support){jq.bind("touchstart.jcrop",Touch.createDragger(ord))}$hdl_holder.append(jq);return jq}
//}}}
function insertHandle(ord){var hs=options.handleSize,div=dragDiv(ord,hdep++).css({opacity:options.handleOpacity}).addClass(cssClass("handle"));if(hs){div.width(hs).height(hs)}return div}
//}}}
function insertDragbar(ord){return dragDiv(ord,hdep++).addClass("jcrop-dragbar")}
//}}}
function createDragbars(li){var i;for(i=0;i<li.length;i++){dragbar[li[i]]=insertDragbar(li[i])}}
//}}}
function createBorders(li){var cl,i;for(i=0;i<li.length;i++){switch(li[i]){case"n":cl="hline";break;case"s":cl="hline bottom";break;case"e":cl="vline right";break;case"w":cl="vline";break}borders[li[i]]=insertBorder(cl)}}
//}}}
function createHandles(li){var i;for(i=0;i<li.length;i++){handle[li[i]]=insertHandle(li[i])}}
//}}}
function moveto(x,y){if(!options.shade){$img2.css({top:px(-y),left:px(-x)})}$sel.css({top:px(y),left:px(x)})}
//}}}
function resize(w,h){$sel.width(Math.round(w)).height(Math.round(h))}
//}}}
function refresh(){var c=Coords.getFixed();Coords.setPressed([c.x,c.y]);Coords.setCurrent([c.x2,c.y2]);updateVisible()}
//}}}
// Internal Methods
function updateVisible(select){if(awake){return update(select)}}
//}}}
function update(select){var c=Coords.getFixed();resize(c.w,c.h);moveto(c.x,c.y);if(options.shade)Shade.updateRaw(c);awake||show();if(select){options.onSelect.call(api,unscale(c))}else{options.onChange.call(api,unscale(c))}}
//}}}
function setBgOpacity(opacity,force,now){if(!awake&&!force)return;if(options.bgFade&&!now){$img.animate({opacity:opacity},{queue:false,duration:options.fadeTime})}else{$img.css("opacity",opacity)}}
//}}}
function show(){$sel.show();if(options.shade)Shade.opacity(bgopacity);else setBgOpacity(bgopacity,true);awake=true}
//}}}
function release(){disableHandles();$sel.hide();if(options.shade)Shade.opacity(1);else setBgOpacity(1);awake=false;options.onRelease.call(api)}
//}}}
function showHandles(){if(seehandles){$hdl_holder.show()}}
//}}}
function enableHandles(){seehandles=true;if(options.allowResize){$hdl_holder.show();return true}}
//}}}
function disableHandles(){seehandles=false;$hdl_holder.hide()}
//}}}
function animMode(v){if(v){animating=true;disableHandles()}else{animating=false;enableHandles()}}
//}}}
function done(){animMode(false);refresh()}
//}}}
// Insert draggable elements {{{
// Insert border divs for outline
if(options.dragEdges&&$.isArray(options.createDragbars))createDragbars(options.createDragbars);if($.isArray(options.createHandles))createHandles(options.createHandles);if(options.drawBorders&&$.isArray(options.createBorders))createBorders(options.createBorders);
//}}}
// This is a hack for iOS5 to support drag/move touch functionality
$(document).bind("touchstart.jcrop-ios",function(e){if($(e.currentTarget).hasClass("jcrop-tracker"))e.stopPropagation()});var $track=newTracker().mousedown(createDragger("move")).css({cursor:"move",position:"absolute",zIndex:360});if(Touch.support){$track.bind("touchstart.jcrop",Touch.createDragger("move"))}$img_holder.append($track);disableHandles();return{updateVisible:updateVisible,update:update,release:release,refresh:refresh,isAwake:function(){return awake},setCursor:function(cursor){$track.css("cursor",cursor)},enableHandles:enableHandles,enableOnly:function(){seehandles=true},showHandles:showHandles,disableHandles:disableHandles,animMode:animMode,setBgOpacity:setBgOpacity,done:done}}();
//}}}
// Tracker Module {{{
var Tracker=function(){var onMove=function(){},onDone=function(){},trackDoc=options.trackDocument;function toFront(touch){$trk.css({zIndex:450});if(touch)$(document).bind("touchmove.jcrop",trackTouchMove).bind("touchend.jcrop",trackTouchEnd);else if(trackDoc)$(document).bind("mousemove.jcrop",trackMove).bind("mouseup.jcrop",trackUp)}
//}}}
function toBack(){$trk.css({zIndex:290});$(document).unbind(".jcrop")}
//}}}
function trackMove(e){onMove(mouseAbs(e));return false}
//}}}
function trackUp(e){e.preventDefault();e.stopPropagation();if(btndown){btndown=false;onDone(mouseAbs(e));if(Selection.isAwake()){options.onSelect.call(api,unscale(Coords.getFixed()))}toBack();onMove=function(){};onDone=function(){}}return false}
//}}}
function activateHandlers(move,done,touch){btndown=true;onMove=move;onDone=done;toFront(touch);return false}
//}}}
function trackTouchMove(e){onMove(mouseAbs(Touch.cfilter(e)));return false}
//}}}
function trackTouchEnd(e){return trackUp(Touch.cfilter(e))}
//}}}
function setCursor(t){$trk.css("cursor",t)}
//}}}
if(!trackDoc){$trk.mousemove(trackMove).mouseup(trackUp).mouseout(trackUp)}$img.before($trk);return{activateHandlers:activateHandlers,setCursor:setCursor}}();
//}}}
// KeyManager Module {{{
var KeyManager=function(){var $keymgr=$('<input type="radio" />').css({position:"fixed",left:"-120px",width:"12px"}).addClass("jcrop-keymgr"),$keywrap=$("<div />").css({position:"absolute",overflow:"hidden"}).append($keymgr);function watchKeys(){if(options.keySupport){$keymgr.show();$keymgr.focus()}}
//}}}
function onBlur(e){$keymgr.hide()}
//}}}
function doNudge(e,x,y){if(options.allowMove){Coords.moveOffset([x,y]);Selection.updateVisible(true)}e.preventDefault();e.stopPropagation()}
//}}}
function parseKey(e){if(e.ctrlKey||e.metaKey){return true}shift_down=e.shiftKey?true:false;var nudge=shift_down?10:1;switch(e.keyCode){case 37:doNudge(e,-nudge,0);break;case 39:doNudge(e,nudge,0);break;case 38:doNudge(e,0,-nudge);break;case 40:doNudge(e,0,nudge);break;case 27:if(options.allowSelect)Selection.release();break;case 9:return true}return false}
//}}}
if(options.keySupport){$keymgr.keydown(parseKey).blur(onBlur);if(ie6mode||!options.fixedSupport){$keymgr.css({position:"absolute",left:"-20px"});$keywrap.append($keymgr).insertBefore($img)}else{$keymgr.insertBefore($img)}}return{watchKeys:watchKeys}}();
//}}}
// }}}
// API methods {{{
function setClass(cname){$div.removeClass().addClass(cssClass("holder")).addClass(cname)}
//}}}
function animateTo(a,callback){var x1=a[0]/xscale,y1=a[1]/yscale,x2=a[2]/xscale,y2=a[3]/yscale;if(animating){return}var animto=Coords.flipCoords(x1,y1,x2,y2),c=Coords.getFixed(),initcr=[c.x,c.y,c.x2,c.y2],animat=initcr,interv=options.animationDelay,ix1=animto[0]-initcr[0],iy1=animto[1]-initcr[1],ix2=animto[2]-initcr[2],iy2=animto[3]-initcr[3],pcent=0,velocity=options.swingSpeed;x1=animat[0];y1=animat[1];x2=animat[2];y2=animat[3];Selection.animMode(true);var anim_timer;function queueAnimator(){window.setTimeout(animator,interv)}var animator=function(){return function(){pcent+=(100-pcent)/velocity;animat[0]=Math.round(x1+pcent/100*ix1);animat[1]=Math.round(y1+pcent/100*iy1);animat[2]=Math.round(x2+pcent/100*ix2);animat[3]=Math.round(y2+pcent/100*iy2);if(pcent>=99.8){pcent=100}if(pcent<100){setSelectRaw(animat);queueAnimator()}else{Selection.done();Selection.animMode(false);if(typeof callback==="function"){callback.call(api)}}}}();queueAnimator()}
//}}}
function setSelect(rect){setSelectRaw([rect[0]/xscale,rect[1]/yscale,rect[2]/xscale,rect[3]/yscale]);options.onSelect.call(api,unscale(Coords.getFixed()));Selection.enableHandles()}
//}}}
function setSelectRaw(l){Coords.setPressed([l[0],l[1]]);Coords.setCurrent([l[2],l[3]]);Selection.update()}
//}}}
function tellSelect(){return unscale(Coords.getFixed())}
//}}}
function tellScaled(){return Coords.getFixed()}
//}}}
function setOptionsNew(opt){setOptions(opt);interfaceUpdate()}
//}}}
function disableCrop(){options.disabled=true;Selection.disableHandles();Selection.setCursor("default");Tracker.setCursor("default")}
//}}}
function enableCrop(){options.disabled=false;interfaceUpdate()}
//}}}
function cancelCrop(){Selection.done();Tracker.activateHandlers(null,null)}
//}}}
function destroy(){$div.remove();$origimg.show();$origimg.css("visibility","visible");$(obj).removeData("Jcrop")}
//}}}
function setImage(src,callback){Selection.release();disableCrop();var img=new Image;img.onload=function(){var iw=img.width;var ih=img.height;var bw=options.boxWidth;var bh=options.boxHeight;$img.width(iw).height(ih);$img.attr("src",src);$img2.attr("src",src);presize($img,bw,bh);boundx=$img.width();boundy=$img.height();$img2.width(boundx).height(boundy);$trk.width(boundx+bound*2).height(boundy+bound*2);$div.width(boundx).height(boundy);Shade.resize(boundx,boundy);enableCrop();if(typeof callback==="function"){callback.call(api)}};img.src=src}
//}}}
function colorChangeMacro($obj,color,now){var mycolor=color||options.bgColor;if(options.bgFade&&supportsColorFade()&&options.fadeTime&&!now){$obj.animate({backgroundColor:mycolor},{queue:false,duration:options.fadeTime})}else{$obj.css("backgroundColor",mycolor)}}function interfaceUpdate(alt){if(options.allowResize){if(alt){Selection.enableOnly()}else{Selection.enableHandles()}}else{Selection.disableHandles()}Tracker.setCursor(options.allowSelect?"crosshair":"default");Selection.setCursor(options.allowMove?"move":"default");if(options.hasOwnProperty("trueSize")){xscale=options.trueSize[0]/boundx;yscale=options.trueSize[1]/boundy}if(options.hasOwnProperty("setSelect")){setSelect(options.setSelect);Selection.done();delete options.setSelect}Shade.refresh();if(options.bgColor!=bgcolor){colorChangeMacro(options.shade?Shade.getShades():$div,options.shade?options.shadeColor||options.bgColor:options.bgColor);bgcolor=options.bgColor}if(bgopacity!=options.bgOpacity){bgopacity=options.bgOpacity;if(options.shade)Shade.refresh();else Selection.setBgOpacity(bgopacity)}xlimit=options.maxSize[0]||0;ylimit=options.maxSize[1]||0;xmin=options.minSize[0]||0;ymin=options.minSize[1]||0;if(options.hasOwnProperty("outerImage")){$img.attr("src",options.outerImage);delete options.outerImage}Selection.refresh()}
//}}}
//}}}
if(Touch.support)$trk.bind("touchstart.jcrop",Touch.newSelection);$hdl_holder.hide();interfaceUpdate(true);var api={setImage:setImage,animateTo:animateTo,setSelect:setSelect,setOptions:setOptionsNew,tellSelect:tellSelect,tellScaled:tellScaled,setClass:setClass,disable:disableCrop,enable:enableCrop,cancel:cancelCrop,release:Selection.release,destroy:destroy,focus:KeyManager.watchKeys,getBounds:function(){return[boundx*xscale,boundy*yscale]},getWidgetSize:function(){return[boundx,boundy]},getScaleFactor:function(){return[xscale,yscale]},getOptions:function(){
// careful: internal values are returned
return options},ui:{holder:$div,selection:$sel}};if(is_msie)$div.bind("selectstart",function(){return false});$origimg.data("Jcrop",api);return api};$.fn.Jcrop=function(options,callback){var api;
// Iterate over each object, attach Jcrop
this.each(function(){
// If we've already attached to this object
if($(this).data("Jcrop")){
// The API can be requested this way (undocumented)
if(options==="api")return $(this).data("Jcrop");else $(this).data("Jcrop").setOptions(options)}else{if(this.tagName=="IMG")$.Jcrop.Loader(this,function(){$(this).css({display:"block",visibility:"hidden"});api=$.Jcrop(this,options);if($.isFunction(callback))callback.call(api)});else{$(this).css({display:"block",visibility:"hidden"});api=$.Jcrop(this,options);if($.isFunction(callback))callback.call(api)}}});
// Return "this" so the object is chainable (jQuery-style)
return this};
//}}}
// $.Jcrop.Loader - basic image loader {{{
$.Jcrop.Loader=function(imgobj,success,error){var $img=$(imgobj),img=$img[0];function completeCheck(){if(img.complete){$img.unbind(".jcloader");if($.isFunction(success))success.call(img)}else window.setTimeout(completeCheck,50)}$img.bind("load.jcloader",completeCheck).bind("error.jcloader",function(e){$img.unbind(".jcloader");if($.isFunction(error))error.call(img)});if(img.complete&&$.isFunction(success)){$img.unbind(".jcloader");success.call(img)}};
//}}}
// Global Defaults {{{
$.Jcrop.defaults={
// Basic Settings
allowSelect:true,allowMove:true,allowResize:true,trackDocument:true,
// Styling Options
baseClass:"jcrop",addClass:null,bgColor:"black",bgOpacity:.6,bgFade:false,borderOpacity:.4,handleOpacity:.5,handleSize:null,aspectRatio:0,keySupport:true,createHandles:["n","s","e","w","nw","ne","se","sw"],createDragbars:["n","s","e","w"],createBorders:["n","s","e","w"],drawBorders:true,dragEdges:true,fixedSupport:true,touchSupport:null,shade:null,boxWidth:0,boxHeight:0,boundary:2,fadeTime:400,animationDelay:20,swingSpeed:3,minSelect:[0,0],maxSize:[0,0],minSize:[0,0],
// Callbacks / Event Handlers
onChange:function(){},onSelect:function(){},onDblClick:function(){},onRelease:function(){}}})(jQuery);
//api文档
//https://github.com/blueimp/jQuery-File-Upload/wiki/API
var R_fileUpload={init:function(opts){var where=opts.where;var url=opts.url;var formData=opts.formData;var success=opts.success;
//结构
var id="fileupload"+(new Date).getTime();var fileInput=$('<div style="position:absolute;width:100%;height:100%;overflow: hidden;top: 0px;left:0px;opacity: 0;filter:alpha(opacity=0)">'+'<input id="'+id+'" type="file" name="image" style="width:10000px;height:10000px;cursor: pointer">'+"</div>").appendTo(where);var fileCase=fileInput.fileupload({url:url,formData:formData,dataType:"json",add:function(e,data){
//防止多个请求同时发送
if(fileCase.ajaxSending){return}
//文件类型
if(opts.FileTypes){var name=data.files[0]["name"];
//后缀
var postfix=name.substring(name.lastIndexOf(".")+1);var fileTypesReg=new RegExp(opts.FileTypes.rule,"i");if(!fileTypesReg.test(postfix)){alert(opts.FileTypes.error);return}}
//文件大小
if(opts.FileSizeLimit){var size=data.files[0]["size"];var rule=opts.FileSizeLimit.rule;if(size>rule){alert(opts.FileSizeLimit.error);return}}data.submit();fileCase.ajaxSending=true},done:function(e,data){success&&success(e,data);fileCase.ajaxSending=false}});return fileCase}};
//# sourceURL=fileUpload.js
/*
 * jQuery File Upload Plugin 5.40.0
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2010, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */
/* jshint nomen:false */
/* global define, window, document, location, Blob, FormData */
(function(factory){"use strict";factory(window.jQuery)})(function($){"use strict";
// Detect file input support, based on
// http://viljamis.com/blog/2012/file-upload-support-on-mobile/
$.support.fileInput=!(new RegExp(
// Handle devices which give false positives for the feature detection:
"(Android (1\\.[0156]|2\\.[01]))"+"|(Windows Phone (OS 7|8\\.0))|(XBLWP)|(ZuneWP)|(WPDesktop)"+"|(w(eb)?OSBrowser)|(webOS)"+"|(Kindle/(1\\.0|2\\.[05]|3\\.0))").test(window.navigator.userAgent)||
// Feature detection for all other devices:
$('<input type="file">').prop("disabled"));
// The FileReader API is not actually used, but works as feature detection,
// as some Safari versions (5?) support XHR file uploads via the FormData API,
// but not non-multipart XHR file uploads.
// window.XMLHttpRequestUpload is not available on IE10, so we check for
// window.ProgressEvent instead to detect XHR2 file upload capability:
$.support.xhrFileUpload=!!(window.ProgressEvent&&window.FileReader);$.support.xhrFormDataFileUpload=!!window.FormData;
// Detect support for Blob slicing (required for chunked uploads):
$.support.blobSlice=window.Blob&&(Blob.prototype.slice||Blob.prototype.webkitSlice||Blob.prototype.mozSlice);
// The fileupload widget listens for change events on file input fields defined
// via fileInput setting and paste or drop events of the given dropZone.
// In addition to the default jQuery Widget methods, the fileupload widget
// exposes the "add" and "send" methods, to add or directly send files using
// the fileupload API.
// By default, files added via file input selection, paste, drag & drop or
// "add" method are uploaded immediately, but it is possible to override
// the "add" callback option to queue file uploads.
$.widget("blueimp.fileupload",{options:{
// The drop target element(s), by the default the complete document.
// Set to null to disable drag & drop support:
dropZone:$(document),
// The paste target element(s), by the default the complete document.
// Set to null to disable paste support:
pasteZone:$(document),
// The file input field(s), that are listened to for change events.
// If undefined, it is set to the file input fields inside
// of the widget element on plugin initialization.
// Set to null to disable the change listener.
fileInput:undefined,
// By default, the file input field is replaced with a clone after
// each input field change event. This is required for iframe transport
// queues and allows change events to be fired for the same file
// selection, but can be disabled by setting the following option to false:
replaceFileInput:true,
// The parameter name for the file form data (the request argument name).
// If undefined or empty, the name property of the file input field is
// used, or "files[]" if the file input name property is also empty,
// can be a string or an array of strings:
paramName:undefined,
// By default, each file of a selection is uploaded using an individual
// request for XHR type uploads. Set to false to upload file
// selections in one request each:
singleFileUploads:true,
// To limit the number of files uploaded with one XHR request,
// set the following option to an integer greater than 0:
limitMultiFileUploads:undefined,
// The following option limits the number of files uploaded with one
// XHR request to keep the request size under or equal to the defined
// limit in bytes:
limitMultiFileUploadSize:undefined,
// Multipart file uploads add a number of bytes to each uploaded file,
// therefore the following option adds an overhead for each file used
// in the limitMultiFileUploadSize configuration:
limitMultiFileUploadSizeOverhead:512,
// Set the following option to true to issue all file upload requests
// in a sequential order:
sequentialUploads:false,
// To limit the number of concurrent uploads,
// set the following option to an integer greater than 0:
limitConcurrentUploads:undefined,
// Set the following option to true to force iframe transport uploads:
forceIframeTransport:false,
// Set the following option to the location of a redirect url on the
// origin server, for cross-domain iframe transport uploads:
redirect:undefined,
// The parameter name for the redirect url, sent as part of the form
// data and set to 'redirect' if this option is empty:
redirectParamName:undefined,
// Set the following option to the location of a postMessage window,
// to enable postMessage transport uploads:
postMessage:undefined,
// By default, XHR file uploads are sent as multipart/form-data.
// The iframe transport is always using multipart/form-data.
// Set to false to enable non-multipart XHR uploads:
multipart:true,
// To upload large files in smaller chunks, set the following option
// to a preferred maximum chunk size. If set to 0, null or undefined,
// or the browser does not support the required Blob API, files will
// be uploaded as a whole.
maxChunkSize:undefined,
// When a non-multipart upload or a chunked multipart upload has been
// aborted, this option can be used to resume the upload by setting
// it to the size of the already uploaded bytes. This option is most
// useful when modifying the options object inside of the "add" or
// "send" callbacks, as the options are cloned for each file upload.
uploadedBytes:undefined,
// By default, failed (abort or error) file uploads are removed from the
// global progress calculation. Set the following option to false to
// prevent recalculating the global progress data:
recalculateProgress:true,
// Interval in milliseconds to calculate and trigger progress events:
progressInterval:100,
// Interval in milliseconds to calculate progress bitrate:
bitrateInterval:500,
// By default, uploads are started automatically when adding files:
autoUpload:true,
// Error and info messages:
messages:{uploadedBytes:"Uploaded bytes exceed file size"},
// Translation function, gets the message key to be translated
// and an object with context specific data as arguments:
i18n:function(message,context){message=this.messages[message]||message.toString();if(context){$.each(context,function(key,value){message=message.replace("{"+key+"}",value)})}return message},
// Additional form data to be sent along with the file uploads can be set
// using this option, which accepts an array of objects with name and
// value properties, a function returning such an array, a FormData
// object (for XHR file uploads), or a simple object.
// The form of the first fileInput is given as parameter to the function:
formData:function(form){return form.serializeArray()},
// The add callback is invoked as soon as files are added to the fileupload
// widget (via file input selection, drag & drop, paste or add API call).
// If the singleFileUploads option is enabled, this callback will be
// called once for each file in the selection for XHR file uploads, else
// once for each file selection.
//
// The upload starts when the submit method is invoked on the data parameter.
// The data object contains a files property holding the added files
// and allows you to override plugin options as well as define ajax settings.
//
// Listeners for this callback can also be bound the following way:
// .bind('fileuploadadd', func);
//
// data.submit() returns a Promise object and allows to attach additional
// handlers using jQuery's Deferred callbacks:
// data.submit().done(func).fail(func).always(func);
add:function(e,data){if(e.isDefaultPrevented()){return false}if(data.autoUpload||data.autoUpload!==false&&$(this).fileupload("option","autoUpload")){data.process().done(function(){data.submit()})}},
// Other callbacks:
// Callback for the submit event of each file upload:
// submit: function (e, data) {}, // .bind('fileuploadsubmit', func);
// Callback for the start of each file upload request:
// send: function (e, data) {}, // .bind('fileuploadsend', func);
// Callback for successful uploads:
// done: function (e, data) {}, // .bind('fileuploaddone', func);
// Callback for failed (abort or error) uploads:
// fail: function (e, data) {}, // .bind('fileuploadfail', func);
// Callback for completed (success, abort or error) requests:
// always: function (e, data) {}, // .bind('fileuploadalways', func);
// Callback for upload progress events:
// progress: function (e, data) {}, // .bind('fileuploadprogress', func);
// Callback for global upload progress events:
// progressall: function (e, data) {}, // .bind('fileuploadprogressall', func);
// Callback for uploads start, equivalent to the global ajaxStart event:
// start: function (e) {}, // .bind('fileuploadstart', func);
// Callback for uploads stop, equivalent to the global ajaxStop event:
// stop: function (e) {}, // .bind('fileuploadstop', func);
// Callback for change events of the fileInput(s):
// change: function (e, data) {}, // .bind('fileuploadchange', func);
// Callback for paste events to the pasteZone(s):
// paste: function (e, data) {}, // .bind('fileuploadpaste', func);
// Callback for drop events of the dropZone(s):
// drop: function (e, data) {}, // .bind('fileuploaddrop', func);
// Callback for dragover events of the dropZone(s):
// dragover: function (e) {}, // .bind('fileuploaddragover', func);
// Callback for the start of each chunk upload request:
// chunksend: function (e, data) {}, // .bind('fileuploadchunksend', func);
// Callback for successful chunk uploads:
// chunkdone: function (e, data) {}, // .bind('fileuploadchunkdone', func);
// Callback for failed (abort or error) chunk uploads:
// chunkfail: function (e, data) {}, // .bind('fileuploadchunkfail', func);
// Callback for completed (success, abort or error) chunk upload requests:
// chunkalways: function (e, data) {}, // .bind('fileuploadchunkalways', func);
// The plugin options are used as settings object for the ajax calls.
// The following are jQuery ajax settings required for the file uploads:
processData:false,contentType:false,cache:false},
// A list of options that require reinitializing event listeners and/or
// special initialization code:
_specialOptions:["fileInput","dropZone","pasteZone","multipart","forceIframeTransport"],_blobSlice:$.support.blobSlice&&function(){var slice=this.slice||this.webkitSlice||this.mozSlice;return slice.apply(this,arguments)},_BitrateTimer:function(){this.timestamp=Date.now?Date.now():(new Date).getTime();this.loaded=0;this.bitrate=0;this.getBitrate=function(now,loaded,interval){var timeDiff=now-this.timestamp;if(!this.bitrate||!interval||timeDiff>interval){this.bitrate=(loaded-this.loaded)*(1e3/timeDiff)*8;this.loaded=loaded;this.timestamp=now}return this.bitrate}},_isXHRUpload:function(options){return!options.forceIframeTransport&&(!options.multipart&&$.support.xhrFileUpload||$.support.xhrFormDataFileUpload)},_getFormData:function(options){var formData;if($.type(options.formData)==="function"){return options.formData(options.form)}if($.isArray(options.formData)){return options.formData}if($.type(options.formData)==="object"){formData=[];$.each(options.formData,function(name,value){formData.push({name:name,value:value})});return formData}return[]},_getTotal:function(files){var total=0;$.each(files,function(index,file){total+=file.size||1});return total},_initProgressObject:function(obj){var progress={loaded:0,total:0,bitrate:0};if(obj._progress){$.extend(obj._progress,progress)}else{obj._progress=progress}},_initResponseObject:function(obj){var prop;if(obj._response){for(prop in obj._response){if(obj._response.hasOwnProperty(prop)){delete obj._response[prop]}}}else{obj._response={}}},_onProgress:function(e,data){if(e.lengthComputable){var now=Date.now?Date.now():(new Date).getTime(),loaded;if(data._time&&data.progressInterval&&now-data._time<data.progressInterval&&e.loaded!==e.total){return}data._time=now;loaded=Math.floor(e.loaded/e.total*(data.chunkSize||data._progress.total))+(data.uploadedBytes||0);
// Add the difference from the previously loaded state
// to the global loaded counter:
this._progress.loaded+=loaded-data._progress.loaded;this._progress.bitrate=this._bitrateTimer.getBitrate(now,this._progress.loaded,data.bitrateInterval);data._progress.loaded=data.loaded=loaded;data._progress.bitrate=data.bitrate=data._bitrateTimer.getBitrate(now,loaded,data.bitrateInterval);
// Trigger a custom progress event with a total data property set
// to the file size(s) of the current upload and a loaded data
// property calculated accordingly:
this._trigger("progress",$.Event("progress",{delegatedEvent:e}),data);
// Trigger a global progress event for all current file uploads,
// including ajax calls queued for sequential file uploads:
this._trigger("progressall",$.Event("progressall",{delegatedEvent:e}),this._progress)}},_initProgressListener:function(options){var that=this,xhr=options.xhr?options.xhr():$.ajaxSettings.xhr();
// Accesss to the native XHR object is required to add event listeners
// for the upload progress event:
if(xhr.upload){$(xhr.upload).bind("progress",function(e){var oe=e.originalEvent;
// Make sure the progress event properties get copied over:
e.lengthComputable=oe.lengthComputable;e.loaded=oe.loaded;e.total=oe.total;that._onProgress(e,options)});options.xhr=function(){return xhr}}},_isInstanceOf:function(type,obj){
// Cross-frame instanceof check
return Object.prototype.toString.call(obj)==="[object "+type+"]"},_initXHRData:function(options){var that=this,formData,file=options.files[0],
// Ignore non-multipart setting if not supported:
multipart=options.multipart||!$.support.xhrFileUpload,paramName=$.type(options.paramName)==="array"?options.paramName[0]:options.paramName;options.headers=$.extend({},options.headers);if(options.contentRange){options.headers["Content-Range"]=options.contentRange}if(!multipart||options.blob||!this._isInstanceOf("File",file)){options.headers["Content-Disposition"]='attachment; filename="'+encodeURI(file.name)+'"'}if(!multipart){options.contentType=file.type||"application/octet-stream";options.data=options.blob||file}else if($.support.xhrFormDataFileUpload){if(options.postMessage){
// window.postMessage does not allow sending FormData
// objects, so we just add the File/Blob objects to
// the formData array and let the postMessage window
// create the FormData object out of this array:
formData=this._getFormData(options);if(options.blob){formData.push({name:paramName,value:options.blob})}else{$.each(options.files,function(index,file){formData.push({name:$.type(options.paramName)==="array"&&options.paramName[index]||paramName,value:file})})}}else{if(that._isInstanceOf("FormData",options.formData)){formData=options.formData}else{formData=new FormData;$.each(this._getFormData(options),function(index,field){formData.append(field.name,field.value)})}if(options.blob){formData.append(paramName,options.blob,file.name)}else{$.each(options.files,function(index,file){
// This check allows the tests to run with
// dummy objects:
if(that._isInstanceOf("File",file)||that._isInstanceOf("Blob",file)){formData.append($.type(options.paramName)==="array"&&options.paramName[index]||paramName,file,file.uploadName||file.name)}})}}options.data=formData}
// Blob reference is not needed anymore, free memory:
options.blob=null},_initIframeSettings:function(options){var targetHost=$("<a></a>").prop("href",options.url).prop("host");
// Setting the dataType to iframe enables the iframe transport:
options.dataType="iframe "+(options.dataType||"");
// The iframe transport accepts a serialized array as form data:
options.formData=this._getFormData(options);
// Add redirect url to form data on cross-domain uploads:
if(options.redirect&&targetHost&&targetHost!==location.host){options.formData.push({name:options.redirectParamName||"redirect",value:options.redirect})}},_initDataSettings:function(options){if(this._isXHRUpload(options)){if(!this._chunkedUpload(options,true)){if(!options.data){this._initXHRData(options)}this._initProgressListener(options)}if(options.postMessage){
// Setting the dataType to postmessage enables the
// postMessage transport:
options.dataType="postmessage "+(options.dataType||"")}}else{this._initIframeSettings(options)}},_getParamName:function(options){var fileInput=$(options.fileInput),paramName=options.paramName;if(!paramName){paramName=[];fileInput.each(function(){var input=$(this),name=input.prop("name")||"files[]",i=(input.prop("files")||[1]).length;while(i){paramName.push(name);i-=1}});if(!paramName.length){paramName=[fileInput.prop("name")||"files[]"]}}else if(!$.isArray(paramName)){paramName=[paramName]}return paramName},_initFormSettings:function(options){
// Retrieve missing options from the input field and the
// associated form, if available:
if(!options.form||!options.form.length){options.form=$(options.fileInput.prop("form"));
// If the given file input doesn't have an associated form,
// use the default widget file input's form:
if(!options.form.length){options.form=$(this.options.fileInput.prop("form"))}}options.paramName=this._getParamName(options);if(!options.url){options.url=options.form.prop("action")||location.href}
// The HTTP request method must be "POST" or "PUT":
options.type=(options.type||$.type(options.form.prop("method"))==="string"&&options.form.prop("method")||"").toUpperCase();if(options.type!=="POST"&&options.type!=="PUT"&&options.type!=="PATCH"){options.type="POST"}if(!options.formAcceptCharset){options.formAcceptCharset=options.form.attr("accept-charset")}},_getAJAXSettings:function(data){var options=$.extend({},this.options,data);this._initFormSettings(options);this._initDataSettings(options);return options},
// jQuery 1.6 doesn't provide .state(),
// while jQuery 1.8+ removed .isRejected() and .isResolved():
_getDeferredState:function(deferred){if(deferred.state){return deferred.state()}if(deferred.isResolved()){return"resolved"}if(deferred.isRejected()){return"rejected"}return"pending"},
// Maps jqXHR callbacks to the equivalent
// methods of the given Promise object:
_enhancePromise:function(promise){promise.success=promise.done;promise.error=promise.fail;promise.complete=promise.always;return promise},
// Creates and returns a Promise object enhanced with
// the jqXHR methods abort, success, error and complete:
_getXHRPromise:function(resolveOrReject,context,args){var dfd=$.Deferred(),promise=dfd.promise();context=context||this.options.context||promise;if(resolveOrReject===true){dfd.resolveWith(context,args)}else if(resolveOrReject===false){dfd.rejectWith(context,args)}promise.abort=dfd.promise;return this._enhancePromise(promise)},
// Adds convenience methods to the data callback argument:
_addConvenienceMethods:function(e,data){var that=this,getPromise=function(args){return $.Deferred().resolveWith(that,args).promise()};data.process=function(resolveFunc,rejectFunc){if(resolveFunc||rejectFunc){data._processQueue=this._processQueue=(this._processQueue||getPromise([this])).pipe(function(){if(data.errorThrown){return $.Deferred().rejectWith(that,[data]).promise()}return getPromise(arguments)}).pipe(resolveFunc,rejectFunc)}return this._processQueue||getPromise([this])};data.submit=function(){if(this.state()!=="pending"){data.jqXHR=this.jqXHR=that._trigger("submit",$.Event("submit",{delegatedEvent:e}),this)!==false&&that._onSend(e,this)}return this.jqXHR||that._getXHRPromise()};data.abort=function(){if(this.jqXHR){return this.jqXHR.abort()}this.errorThrown="abort";that._trigger("fail",null,this);return that._getXHRPromise(false)};data.state=function(){if(this.jqXHR){return that._getDeferredState(this.jqXHR)}if(this._processQueue){return that._getDeferredState(this._processQueue)}};data.processing=function(){return!this.jqXHR&&this._processQueue&&that._getDeferredState(this._processQueue)==="pending"};data.progress=function(){return this._progress};data.response=function(){return this._response}},
// Parses the Range header from the server response
// and returns the uploaded bytes:
_getUploadedBytes:function(jqXHR){var range=jqXHR.getResponseHeader("Range"),parts=range&&range.split("-"),upperBytesPos=parts&&parts.length>1&&parseInt(parts[1],10);return upperBytesPos&&upperBytesPos+1},
// Uploads a file in multiple, sequential requests
// by splitting the file up in multiple blob chunks.
// If the second parameter is true, only tests if the file
// should be uploaded in chunks, but does not invoke any
// upload requests:
_chunkedUpload:function(options,testOnly){options.uploadedBytes=options.uploadedBytes||0;var that=this,file=options.files[0],fs=file.size,ub=options.uploadedBytes,mcs=options.maxChunkSize||fs,slice=this._blobSlice,dfd=$.Deferred(),promise=dfd.promise(),jqXHR,upload;if(!(this._isXHRUpload(options)&&slice&&(ub||mcs<fs))||options.data){return false}if(testOnly){return true}if(ub>=fs){file.error=options.i18n("uploadedBytes");return this._getXHRPromise(false,options.context,[null,"error",file.error])}
// The chunk upload method:
upload=function(){
// Clone the options object for each chunk upload:
var o=$.extend({},options),currentLoaded=o._progress.loaded;o.blob=slice.call(file,ub,ub+mcs,file.type);
// Store the current chunk size, as the blob itself
// will be dereferenced after data processing:
o.chunkSize=o.blob.size;
// Expose the chunk bytes position range:
o.contentRange="bytes "+ub+"-"+(ub+o.chunkSize-1)+"/"+fs;
// Process the upload data (the blob and potential form data):
that._initXHRData(o);
// Add progress listeners for this chunk upload:
that._initProgressListener(o);jqXHR=(that._trigger("chunksend",null,o)!==false&&$.ajax(o)||that._getXHRPromise(false,o.context)).done(function(result,textStatus,jqXHR){ub=that._getUploadedBytes(jqXHR)||ub+o.chunkSize;
// Create a progress event if no final progress event
// with loaded equaling total has been triggered
// for this chunk:
if(currentLoaded+o.chunkSize-o._progress.loaded){that._onProgress($.Event("progress",{lengthComputable:true,loaded:ub-o.uploadedBytes,total:ub-o.uploadedBytes}),o)}options.uploadedBytes=o.uploadedBytes=ub;o.result=result;o.textStatus=textStatus;o.jqXHR=jqXHR;that._trigger("chunkdone",null,o);that._trigger("chunkalways",null,o);if(ub<fs){
// File upload not yet complete,
// continue with the next chunk:
upload()}else{dfd.resolveWith(o.context,[result,textStatus,jqXHR])}}).fail(function(jqXHR,textStatus,errorThrown){o.jqXHR=jqXHR;o.textStatus=textStatus;o.errorThrown=errorThrown;that._trigger("chunkfail",null,o);that._trigger("chunkalways",null,o);dfd.rejectWith(o.context,[jqXHR,textStatus,errorThrown])})};this._enhancePromise(promise);promise.abort=function(){return jqXHR.abort()};upload();return promise},_beforeSend:function(e,data){if(this._active===0){
// the start callback is triggered when an upload starts
// and no other uploads are currently running,
// equivalent to the global ajaxStart event:
this._trigger("start");
// Set timer for global bitrate progress calculation:
this._bitrateTimer=new this._BitrateTimer;
// Reset the global progress values:
this._progress.loaded=this._progress.total=0;this._progress.bitrate=0}
// Make sure the container objects for the .response() and
// .progress() methods on the data object are available
// and reset to their initial state:
this._initResponseObject(data);this._initProgressObject(data);data._progress.loaded=data.loaded=data.uploadedBytes||0;data._progress.total=data.total=this._getTotal(data.files)||1;data._progress.bitrate=data.bitrate=0;this._active+=1;
// Initialize the global progress values:
this._progress.loaded+=data.loaded;this._progress.total+=data.total},_onDone:function(result,textStatus,jqXHR,options){var total=options._progress.total,response=options._response;if(options._progress.loaded<total){
// Create a progress event if no final progress event
// with loaded equaling total has been triggered:
this._onProgress($.Event("progress",{lengthComputable:true,loaded:total,total:total}),options)}response.result=options.result=result;response.textStatus=options.textStatus=textStatus;response.jqXHR=options.jqXHR=jqXHR;this._trigger("done",null,options)},_onFail:function(jqXHR,textStatus,errorThrown,options){var response=options._response;if(options.recalculateProgress){
// Remove the failed (error or abort) file upload from
// the global progress calculation:
this._progress.loaded-=options._progress.loaded;this._progress.total-=options._progress.total}response.jqXHR=options.jqXHR=jqXHR;response.textStatus=options.textStatus=textStatus;response.errorThrown=options.errorThrown=errorThrown;this._trigger("fail",null,options)},_onAlways:function(jqXHRorResult,textStatus,jqXHRorError,options){
// jqXHRorResult, textStatus and jqXHRorError are added to the
// options object via done and fail callbacks
this._trigger("always",null,options)},_onSend:function(e,data){if(!data.submit){this._addConvenienceMethods(e,data)}var that=this,jqXHR,aborted,slot,pipe,options=that._getAJAXSettings(data),send=function(){that._sending+=1;
// Set timer for bitrate progress calculation:
options._bitrateTimer=new that._BitrateTimer;/*//跨域请求
                    if(window.navigator.userAgent.indexOf('MSIE 9.0') != -1 || window.navigator.userAgent.indexOf('MSIE 8.0') != -1 || window.navigator.userAgent.indexOf('MSIE 7.0') != -1)
                    {
                        var xdr = new XDomainRequest();
                        jqXHR = xdr;
                        xdr.onload = function() {
                            that._onDone(xdr.responseText, textStatus, jqXHR, options);
                        };
                        xdr.onerror = function(e) {
                            alert('出错')
                        };
                        xdr.open(options.type, options.url);
                        xdr.send( JSON.stringify(options.formData) );
                    }
                    //其他浏览器
                    else{
                        jqXHR = $.ajax(options)
                        .done(function (result, textStatus, jqXHR) {
                            that._onDone(result, textStatus, jqXHR, options);
                        }).fail(function (jqXHR, textStatus, errorThrown) {
                            that._onFail(jqXHR, textStatus, errorThrown, options);
                        });

                    };
*/
jqXHR=jqXHR||((aborted||that._trigger("send",$.Event("send",{delegatedEvent:e}),options)===false)&&that._getXHRPromise(false,options.context,aborted)||that._chunkedUpload(options)||$.ajax(options)).done(function(result,textStatus,jqXHR){that._onDone(result,textStatus,jqXHR,options)}).fail(function(jqXHR,textStatus,errorThrown){that._onFail(jqXHR,textStatus,errorThrown,options)}).always(function(jqXHRorResult,textStatus,jqXHRorError){that._onAlways(jqXHRorResult,textStatus,jqXHRorError,options);that._sending-=1;that._active-=1;if(options.limitConcurrentUploads&&options.limitConcurrentUploads>that._sending){
// Start the next queued upload,
// that has not been aborted:
var nextSlot=that._slots.shift();while(nextSlot){if(that._getDeferredState(nextSlot)==="pending"){nextSlot.resolve();break}nextSlot=that._slots.shift()}}if(that._active===0){
// The stop callback is triggered when all uploads have
// been completed, equivalent to the global ajaxStop event:
that._trigger("stop")}});return jqXHR};this._beforeSend(e,options);if(this.options.sequentialUploads||this.options.limitConcurrentUploads&&this.options.limitConcurrentUploads<=this._sending){if(this.options.limitConcurrentUploads>1){slot=$.Deferred();this._slots.push(slot);pipe=slot.pipe(send)}else{this._sequence=this._sequence.pipe(send,send);pipe=this._sequence}
// Return the piped Promise object, enhanced with an abort method,
// which is delegated to the jqXHR object of the current upload,
// and jqXHR callbacks mapped to the equivalent Promise methods:
pipe.abort=function(){aborted=[undefined,"abort","abort"];if(!jqXHR){if(slot){slot.rejectWith(options.context,aborted)}return send()}return jqXHR.abort()};return this._enhancePromise(pipe)}return send()},_onAdd:function(e,data){var that=this,result=true,options=$.extend({},this.options,data),files=data.files,filesLength=files.length,limit=options.limitMultiFileUploads,limitSize=options.limitMultiFileUploadSize,overhead=options.limitMultiFileUploadSizeOverhead,batchSize=0,paramName=this._getParamName(options),paramNameSet,paramNameSlice,fileSet,i,j=0;if(limitSize&&(!filesLength||files[0].size===undefined)){limitSize=undefined}if(!(options.singleFileUploads||limit||limitSize)||!this._isXHRUpload(options)){fileSet=[files];paramNameSet=[paramName]}else if(!(options.singleFileUploads||limitSize)&&limit){fileSet=[];paramNameSet=[];for(i=0;i<filesLength;i+=limit){fileSet.push(files.slice(i,i+limit));paramNameSlice=paramName.slice(i,i+limit);if(!paramNameSlice.length){paramNameSlice=paramName}paramNameSet.push(paramNameSlice)}}else if(!options.singleFileUploads&&limitSize){fileSet=[];paramNameSet=[];for(i=0;i<filesLength;i=i+1){batchSize+=files[i].size+overhead;if(i+1===filesLength||batchSize+files[i+1].size+overhead>limitSize||limit&&i+1-j>=limit){fileSet.push(files.slice(j,i+1));paramNameSlice=paramName.slice(j,i+1);if(!paramNameSlice.length){paramNameSlice=paramName}paramNameSet.push(paramNameSlice);j=i+1;batchSize=0}}}else{paramNameSet=paramName}data.originalFiles=files;$.each(fileSet||files,function(index,element){var newData=$.extend({},data);newData.files=fileSet?element:[element];newData.paramName=paramNameSet[index];that._initResponseObject(newData);that._initProgressObject(newData);that._addConvenienceMethods(e,newData);result=that._trigger("add",$.Event("add",{delegatedEvent:e}),newData);return result});return result},_replaceFileInput:function(input){var inputClone=input.clone(true);$("<form></form>").append(inputClone)[0].reset();
// Detaching allows to insert the fileInput on another form
// without loosing the file input value:
input.after(inputClone).detach();
// Avoid memory leaks with the detached file input:
$.cleanData(input.unbind("remove"));
// Replace the original file input element in the fileInput
// elements set with the clone, which has been copied including
// event handlers:
this.options.fileInput=this.options.fileInput.map(function(i,el){if(el===input[0]){return inputClone[0]}return el});
// If the widget has been initialized on the file input itself,
// override this.element with the file input clone:
if(input[0]===this.element[0]){this.element=inputClone}},_handleFileTreeEntry:function(entry,path){var that=this,dfd=$.Deferred(),errorHandler=function(e){if(e&&!e.entry){e.entry=entry}
// Since $.when returns immediately if one
// Deferred is rejected, we use resolve instead.
// This allows valid files and invalid items
// to be returned together in one set:
dfd.resolve([e])},dirReader;path=path||"";if(entry.isFile){if(entry._file){
// Workaround for Chrome bug #149735
entry._file.relativePath=path;dfd.resolve(entry._file)}else{entry.file(function(file){file.relativePath=path;dfd.resolve(file)},errorHandler)}}else if(entry.isDirectory){dirReader=entry.createReader();dirReader.readEntries(function(entries){that._handleFileTreeEntries(entries,path+entry.name+"/").done(function(files){dfd.resolve(files)}).fail(errorHandler)},errorHandler)}else{
// Return an empy list for file system items
// other than files or directories:
dfd.resolve([])}return dfd.promise()},_handleFileTreeEntries:function(entries,path){var that=this;return $.when.apply($,$.map(entries,function(entry){return that._handleFileTreeEntry(entry,path)})).pipe(function(){return Array.prototype.concat.apply([],arguments)})},_getDroppedFiles:function(dataTransfer){dataTransfer=dataTransfer||{};var items=dataTransfer.items;if(items&&items.length&&(items[0].webkitGetAsEntry||items[0].getAsEntry)){return this._handleFileTreeEntries($.map(items,function(item){var entry;if(item.webkitGetAsEntry){entry=item.webkitGetAsEntry();if(entry){
// Workaround for Chrome bug #149735:
entry._file=item.getAsFile()}return entry}return item.getAsEntry()}))}return $.Deferred().resolve($.makeArray(dataTransfer.files)).promise()},_getSingleFileInputFiles:function(fileInput){fileInput=$(fileInput);var entries=fileInput.prop("webkitEntries")||fileInput.prop("entries"),files,value;if(entries&&entries.length){return this._handleFileTreeEntries(entries)}files=$.makeArray(fileInput.prop("files"));if(!files.length){value=fileInput.prop("value");if(!value){return $.Deferred().resolve([]).promise()}
// If the files property is not available, the browser does not
// support the File API and we add a pseudo File object with
// the input value as name with path information removed:
files=[{name:value.replace(/^.*\\/,"")}]}else if(files[0].name===undefined&&files[0].fileName){
// File normalization for Safari 4 and Firefox 3:
$.each(files,function(index,file){file.name=file.fileName;file.size=file.fileSize})}return $.Deferred().resolve(files).promise()},_getFileInputFiles:function(fileInput){if(!(fileInput instanceof $)||fileInput.length===1){return this._getSingleFileInputFiles(fileInput)}return $.when.apply($,$.map(fileInput,this._getSingleFileInputFiles)).pipe(function(){return Array.prototype.concat.apply([],arguments)})},_onChange:function(e){var that=this,data={fileInput:$(e.target),form:$(e.target.form)};this._getFileInputFiles(data.fileInput).always(function(files){data.files=files;if(that.options.replaceFileInput){that._replaceFileInput(data.fileInput)}if(that._trigger("change",$.Event("change",{delegatedEvent:e}),data)!==false){that._onAdd(e,data)}})},_onPaste:function(e){var items=e.originalEvent&&e.originalEvent.clipboardData&&e.originalEvent.clipboardData.items,data={files:[]};if(items&&items.length){$.each(items,function(index,item){var file=item.getAsFile&&item.getAsFile();if(file){data.files.push(file)}});if(this._trigger("paste",$.Event("paste",{delegatedEvent:e}),data)!==false){this._onAdd(e,data)}}},_onDrop:function(e){e.dataTransfer=e.originalEvent&&e.originalEvent.dataTransfer;var that=this,dataTransfer=e.dataTransfer,data={};if(dataTransfer&&dataTransfer.files&&dataTransfer.files.length){e.preventDefault();this._getDroppedFiles(dataTransfer).always(function(files){data.files=files;if(that._trigger("drop",$.Event("drop",{delegatedEvent:e}),data)!==false){that._onAdd(e,data)}})}},_onDragOver:function(e){e.dataTransfer=e.originalEvent&&e.originalEvent.dataTransfer;var dataTransfer=e.dataTransfer;if(dataTransfer&&$.inArray("Files",dataTransfer.types)!==-1&&this._trigger("dragover",$.Event("dragover",{delegatedEvent:e}))!==false){e.preventDefault();dataTransfer.dropEffect="copy"}},_initEventHandlers:function(){if(this._isXHRUpload(this.options)){this._on(this.options.dropZone,{dragover:this._onDragOver,drop:this._onDrop});this._on(this.options.pasteZone,{paste:this._onPaste})}if($.support.fileInput){this._on(this.options.fileInput,{change:this._onChange})}},_destroyEventHandlers:function(){this._off(this.options.dropZone,"dragover drop");this._off(this.options.pasteZone,"paste");this._off(this.options.fileInput,"change")},_setOption:function(key,value){var reinit=$.inArray(key,this._specialOptions)!==-1;if(reinit){this._destroyEventHandlers()}this._super(key,value);if(reinit){this._initSpecialOptions();this._initEventHandlers()}},_initSpecialOptions:function(){var options=this.options;if(options.fileInput===undefined){options.fileInput=this.element.is('input[type="file"]')?this.element:this.element.find('input[type="file"]')}else if(!(options.fileInput instanceof $)){options.fileInput=$(options.fileInput)}if(!(options.dropZone instanceof $)){options.dropZone=$(options.dropZone)}if(!(options.pasteZone instanceof $)){options.pasteZone=$(options.pasteZone)}},_getRegExp:function(str){var parts=str.split("/"),modifiers=parts.pop();parts.shift();return new RegExp(parts.join("/"),modifiers)},_isRegExpOption:function(key,value){return key!=="url"&&$.type(value)==="string"&&/^\/.*\/[igm]{0,3}$/.test(value)},_initDataAttributes:function(){var that=this,options=this.options;
// Initialize options set via HTML5 data-attributes:
$.each($(this.element[0].cloneNode(false)).data(),function(key,value){if(that._isRegExpOption(key,value)){value=that._getRegExp(value)}options[key]=value})},_create:function(){this._initDataAttributes();this._initSpecialOptions();this._slots=[];this._sequence=this._getXHRPromise(true);this._sending=this._active=0;this._initProgressObject(this);this._initEventHandlers()},
// This method is exposed to the widget API and allows to query
// the number of active uploads:
active:function(){return this._active},
// This method is exposed to the widget API and allows to query
// the widget upload progress.
// It returns an object with loaded, total and bitrate properties
// for the running uploads:
progress:function(){return this._progress},
// This method is exposed to the widget API and allows adding files
// using the fileupload API. The data parameter accepts an object which
// must have a files property and can contain additional options:
// .fileupload('add', {files: filesList});
add:function(data){var that=this;if(!data||this.options.disabled){return}if(data.fileInput&&!data.files){this._getFileInputFiles(data.fileInput).always(function(files){data.files=files;that._onAdd(null,data)})}else{data.files=$.makeArray(data.files);this._onAdd(null,data)}},
// This method is exposed to the widget API and allows sending files
// using the fileupload API. The data parameter accepts an object which
// must have a files or fileInput property and can contain additional options:
// .fileupload('send', {files: filesList});
// The method returns a Promise object for the file upload call.
send:function(data){if(data&&!this.options.disabled){if(data.fileInput&&!data.files){var that=this,dfd=$.Deferred(),promise=dfd.promise(),jqXHR,aborted;promise.abort=function(){aborted=true;if(jqXHR){return jqXHR.abort()}dfd.reject(null,"abort","abort");return promise};this._getFileInputFiles(data.fileInput).always(function(files){if(aborted){return}if(!files.length){dfd.reject();return}data.files=files;jqXHR=that._onSend(null,data).then(function(result,textStatus,jqXHR){dfd.resolve(result,textStatus,jqXHR)},function(jqXHR,textStatus,errorThrown){dfd.reject(jqXHR,textStatus,errorThrown)})});return this._enhancePromise(promise)}data.files=$.makeArray(data.files);if(data.files.length){return this._onSend(null,data)}}return this._getXHRPromise(false,data&&data.context)}})});
//# sourceURL=jquery.fileUpload.js
/*
 * jQuery Iframe Transport Plugin 1.8.2
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */
/* global define, window, document */
(function(factory){factory(window.jQuery)})(function($){"use strict";
// Helper variable to create unique names for the transport iframes:
var counter=0;
// The iframe transport accepts four additional options:
// options.fileInput: a jQuery collection of file input fields
// options.paramName: the parameter name for the file form data,
//  overrides the name property of the file input field(s),
//  can be a string or an array of strings.
// options.formData: an array of objects with name and value properties,
//  equivalent to the return data of .serializeArray(), e.g.:
//  [{name: 'a', value: 1}, {name: 'b', value: 2}]
// options.initialIframeSrc: the URL of the initial iframe src,
//  by default set to "javascript:false;"
$.ajaxTransport("iframe",function(options){if(options.async){
// javascript:false as initial iframe src
// prevents warning popups on HTTPS in IE6:
/*jshint scripturl: true */
var initialIframeSrc=options.initialIframeSrc||"javascript:false;",/*jshint scripturl: false */
form,iframe,addParamChar;return{send:function(_,completeCallback){form=$('<form style="display:none;"></form>');form.attr("accept-charset",options.formAcceptCharset);addParamChar=/\?/.test(options.url)?"&":"?";
// XDomainRequest only supports GET and POST:
if(options.type==="DELETE"){options.url=options.url+addParamChar+"_method=DELETE";options.type="POST"}else if(options.type==="PUT"){options.url=options.url+addParamChar+"_method=PUT";options.type="POST"}else if(options.type==="PATCH"){options.url=options.url+addParamChar+"_method=PATCH";options.type="POST"}
// IE versions below IE8 cannot set the name property of
// elements that have already been added to the DOM,
// so we set the name along with the iframe HTML markup:
counter+=1;iframe=$('<iframe src="'+initialIframeSrc+'" name="iframe-transport-'+counter+'"></iframe>').bind("load",function(){var fileInputClones,paramNames=$.isArray(options.paramName)?options.paramName:[options.paramName];iframe.unbind("load").bind("load",function(){var response;
// Wrap in a try/catch block to catch exceptions thrown
// when trying to access cross-domain iframe contents:
try{response=iframe.contents();
// Google Chrome and Firefox do not throw an
// exception when calling iframe.contents() on
// cross-domain requests, so we unify the response:
if(!response.length||!response[0].firstChild){throw new Error}}catch(e){response=undefined}
// The complete callback returns the
// iframe content document as response object:
completeCallback(200,"success",{iframe:response});
// Fix for IE endless progress bar activity bug
// (happens on form submits to iframe targets):
$('<iframe src="'+initialIframeSrc+'"></iframe>').appendTo(form);window.setTimeout(function(){
// Removing the form in a setTimeout call
// allows Chrome's developer tools to display
// the response result
form.remove()},0)});form.prop("target",iframe.prop("name")).prop("action",options.url).prop("method",options.type);if(options.formData){$.each(options.formData,function(index,field){$('<input type="hidden"/>').prop("name",field.name).val(field.value).appendTo(form)})}if(options.fileInput&&options.fileInput.length&&options.type==="POST"){fileInputClones=options.fileInput.clone();
// Insert a clone for each file input field:
options.fileInput.after(function(index){return fileInputClones[index]});if(options.paramName){options.fileInput.each(function(index){$(this).prop("name",paramNames[index]||options.paramName)})}
// Appending the file input fields to the hidden form
// removes them from their original location:
form.append(options.fileInput).prop("enctype","multipart/form-data").prop("encoding","multipart/form-data");
// Remove the HTML5 form attribute from the input(s):
options.fileInput.removeAttr("form")}form.submit();
// Insert the file input fields at their original location
// by replacing the clones with the originals:
if(fileInputClones&&fileInputClones.length){options.fileInput.each(function(index,input){var clone=$(fileInputClones[index]);
// Restore the original name and form properties:
$(input).prop("name",clone.prop("name")).attr("form",clone.attr("form"));clone.replaceWith(input)})}});form.append(iframe).appendTo(document.body)},abort:function(){if(iframe){
// javascript:false as iframe src aborts the request
// and prevents warning popups on HTTPS in IE6.
// concat is used to avoid the "Script URL" JSLint error:
iframe.unbind("load").prop("src",initialIframeSrc)}if(form){form.remove()}}}}});
// The iframe transport returns the iframe content document as response.
// The following adds converters from iframe to text, json, html, xml
// and script.
// Please note that the Content-Type for JSON responses has to be text/plain
// or text/html, if the browser doesn't include application/json in the
// Accept header, else IE will show a download dialog.
// The Content-Type for XML responses on the other hand has to be always
// application/xml or text/xml, so IE properly parses the XML response.
// See also
// https://github.com/blueimp/jQuery-File-Upload/wiki/Setup#content-type-negotiation
$.ajaxSetup({converters:{"iframe text":function(iframe){return iframe&&$(iframe[0].body).text()},"iframe json":function(iframe){return iframe&&$.parseJSON($(iframe[0].body).text())},"iframe html":function(iframe){return iframe&&$(iframe[0].body).html()},"iframe xml":function(iframe){var xmlDoc=iframe&&iframe[0];return xmlDoc&&$.isXMLDoc(xmlDoc)?xmlDoc:$.parseXML(xmlDoc.XMLDocument&&xmlDoc.XMLDocument.xml||$(xmlDoc.body).html())},"iframe script":function(iframe){return iframe&&$.globalEval($(iframe[0].body).text())}}})});/*
 * jQuery UI Widget 1.10.3+amd
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2013 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/jQuery.widget/
 */
(function(factory){factory(jQuery)})(function($,undefined){var uuid=0,slice=Array.prototype.slice,_cleanData=$.cleanData;$.cleanData=function(elems){for(var i=0,elem;(elem=elems[i])!=null;i++){try{$(elem).triggerHandler("remove")}catch(e){}}_cleanData(elems)};$.widget=function(name,base,prototype){var fullName,existingConstructor,constructor,basePrototype,
// proxiedPrototype allows the provided prototype to remain unmodified
// so that it can be used as a mixin for multiple widgets (#8876)
proxiedPrototype={},namespace=name.split(".")[0];name=name.split(".")[1];fullName=namespace+"-"+name;if(!prototype){prototype=base;base=$.Widget}
// create selector for plugin
$.expr[":"][fullName.toLowerCase()]=function(elem){return!!$.data(elem,fullName)};$[namespace]=$[namespace]||{};existingConstructor=$[namespace][name];constructor=$[namespace][name]=function(options,element){
// allow instantiation without "new" keyword
if(!this._createWidget){return new constructor(options,element)}
// allow instantiation without initializing for simple inheritance
// must use "new" keyword (the code above always passes args)
if(arguments.length){this._createWidget(options,element)}};
// extend with the existing constructor to carry over any static properties
$.extend(constructor,existingConstructor,{version:prototype.version,
// copy the object used to create the prototype in case we need to
// redefine the widget later
_proto:$.extend({},prototype),
// track widgets that inherit from this widget in case this widget is
// redefined after a widget inherits from it
_childConstructors:[]});basePrototype=new base;
// we need to make the options hash a property directly on the new instance
// otherwise we'll modify the options hash on the prototype that we're
// inheriting from
basePrototype.options=$.widget.extend({},basePrototype.options);$.each(prototype,function(prop,value){if(!$.isFunction(value)){proxiedPrototype[prop]=value;return}proxiedPrototype[prop]=function(){var _super=function(){return base.prototype[prop].apply(this,arguments)},_superApply=function(args){return base.prototype[prop].apply(this,args)};return function(){var __super=this._super,__superApply=this._superApply,returnValue;this._super=_super;this._superApply=_superApply;returnValue=value.apply(this,arguments);this._super=__super;this._superApply=__superApply;return returnValue}}()});constructor.prototype=$.widget.extend(basePrototype,{
// TODO: remove support for widgetEventPrefix
// always use the name + a colon as the prefix, e.g., draggable:start
// don't prefix for widgets that aren't DOM-based
widgetEventPrefix:existingConstructor?basePrototype.widgetEventPrefix:name},proxiedPrototype,{constructor:constructor,namespace:namespace,widgetName:name,widgetFullName:fullName});
// If this widget is being redefined then we need to find all widgets that
// are inheriting from it and redefine all of them so that they inherit from
// the new version of this widget. We're essentially trying to replace one
// level in the prototype chain.
if(existingConstructor){$.each(existingConstructor._childConstructors,function(i,child){var childPrototype=child.prototype;
// redefine the child widget using the same prototype that was
// originally used, but inherit from the new version of the base
$.widget(childPrototype.namespace+"."+childPrototype.widgetName,constructor,child._proto)});
// remove the list of existing child constructors from the old constructor
// so the old child constructors can be garbage collected
delete existingConstructor._childConstructors}else{base._childConstructors.push(constructor)}$.widget.bridge(name,constructor)};$.widget.extend=function(target){var input=slice.call(arguments,1),inputIndex=0,inputLength=input.length,key,value;for(;inputIndex<inputLength;inputIndex++){for(key in input[inputIndex]){value=input[inputIndex][key];if(input[inputIndex].hasOwnProperty(key)&&value!==undefined){
// Clone objects
if($.isPlainObject(value)){target[key]=$.isPlainObject(target[key])?$.widget.extend({},target[key],value):
// Don't extend strings, arrays, etc. with objects
$.widget.extend({},value)}else{target[key]=value}}}}return target};$.widget.bridge=function(name,object){var fullName=object.prototype.widgetFullName||name;$.fn[name]=function(options){var isMethodCall=typeof options==="string",args=slice.call(arguments,1),returnValue=this;
// allow multiple hashes to be passed on init
options=!isMethodCall&&args.length?$.widget.extend.apply(null,[options].concat(args)):options;if(isMethodCall){this.each(function(){var methodValue,instance=$.data(this,fullName);if(!instance){return $.error("cannot call methods on "+name+" prior to initialization; "+"attempted to call method '"+options+"'")}if(!$.isFunction(instance[options])||options.charAt(0)==="_"){return $.error("no such method '"+options+"' for "+name+" widget instance")}methodValue=instance[options].apply(instance,args);if(methodValue!==instance&&methodValue!==undefined){returnValue=methodValue&&methodValue.jquery?returnValue.pushStack(methodValue.get()):methodValue;return false}})}else{this.each(function(){var instance=$.data(this,fullName);if(instance){instance.option(options||{})._init()}else{$.data(this,fullName,new object(options,this))}})}return returnValue}};$.Widget=function(){};$.Widget._childConstructors=[];$.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{disabled:false,
// callbacks
create:null},_createWidget:function(options,element){element=$(element||this.defaultElement||this)[0];this.element=$(element);this.uuid=uuid++;this.eventNamespace="."+this.widgetName+this.uuid;this.options=$.widget.extend({},this.options,this._getCreateOptions(),options);this.bindings=$();this.hoverable=$();this.focusable=$();if(element!==this){$.data(element,this.widgetFullName,this);this._on(true,this.element,{remove:function(event){if(event.target===element){this.destroy()}}});this.document=$(element.style?
// element within the document
element.ownerDocument:
// element is window or document
element.document||element);this.window=$(this.document[0].defaultView||this.document[0].parentWindow)}this._create();this._trigger("create",null,this._getCreateEventData());this._init()},_getCreateOptions:$.noop,_getCreateEventData:$.noop,_create:$.noop,_init:$.noop,destroy:function(){this._destroy();
// we can probably remove the unbind calls in 2.0
// all event bindings should go through this._on()
this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData($.camelCase(this.widgetFullName));this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName+"-disabled "+"ui-state-disabled");
// clean up events and states
this.bindings.unbind(this.eventNamespace);this.hoverable.removeClass("ui-state-hover");this.focusable.removeClass("ui-state-focus")},_destroy:$.noop,widget:function(){return this.element},option:function(key,value){var options=key,parts,curOption,i;if(arguments.length===0){
// don't return a reference to the internal hash
return $.widget.extend({},this.options)}if(typeof key==="string"){
// handle nested keys, e.g., "foo.bar" => { foo: { bar: ___ } }
options={};parts=key.split(".");key=parts.shift();if(parts.length){curOption=options[key]=$.widget.extend({},this.options[key]);for(i=0;i<parts.length-1;i++){curOption[parts[i]]=curOption[parts[i]]||{};curOption=curOption[parts[i]]}key=parts.pop();if(value===undefined){return curOption[key]===undefined?null:curOption[key]}curOption[key]=value}else{if(value===undefined){return this.options[key]===undefined?null:this.options[key]}options[key]=value}}this._setOptions(options);return this},_setOptions:function(options){var key;for(key in options){this._setOption(key,options[key])}return this},_setOption:function(key,value){this.options[key]=value;if(key==="disabled"){this.widget().toggleClass(this.widgetFullName+"-disabled ui-state-disabled",!!value).attr("aria-disabled",value);this.hoverable.removeClass("ui-state-hover");this.focusable.removeClass("ui-state-focus")}return this},enable:function(){return this._setOption("disabled",false)},disable:function(){return this._setOption("disabled",true)},_on:function(suppressDisabledCheck,element,handlers){var delegateElement,instance=this;
// no suppressDisabledCheck flag, shuffle arguments
if(typeof suppressDisabledCheck!=="boolean"){handlers=element;element=suppressDisabledCheck;suppressDisabledCheck=false}
// no element argument, shuffle and use this.element
if(!handlers){handlers=element;element=this.element;delegateElement=this.widget()}else{
// accept selectors, DOM elements
element=delegateElement=$(element);this.bindings=this.bindings.add(element)}$.each(handlers,function(event,handler){function handlerProxy(){
// allow widgets to customize the disabled handling
// - disabled as an array instead of boolean
// - disabled class as method for disabling individual parts
if(!suppressDisabledCheck&&(instance.options.disabled===true||$(this).hasClass("ui-state-disabled"))){return}return(typeof handler==="string"?instance[handler]:handler).apply(instance,arguments)}
// copy the guid so direct unbinding works
if(typeof handler!=="string"){handlerProxy.guid=handler.guid=handler.guid||handlerProxy.guid||$.guid++}var match=event.match(/^(\w+)\s*(.*)$/),eventName=match[1]+instance.eventNamespace,selector=match[2];if(selector){delegateElement.delegate(selector,eventName,handlerProxy)}else{element.bind(eventName,handlerProxy)}})},_off:function(element,eventName){eventName=(eventName||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace;element.unbind(eventName).undelegate(eventName)},_delay:function(handler,delay){function handlerProxy(){return(typeof handler==="string"?instance[handler]:handler).apply(instance,arguments)}var instance=this;return setTimeout(handlerProxy,delay||0)},_hoverable:function(element){this.hoverable=this.hoverable.add(element);this._on(element,{mouseenter:function(event){$(event.currentTarget).addClass("ui-state-hover")},mouseleave:function(event){$(event.currentTarget).removeClass("ui-state-hover")}})},_focusable:function(element){this.focusable=this.focusable.add(element);this._on(element,{focusin:function(event){$(event.currentTarget).addClass("ui-state-focus")},focusout:function(event){$(event.currentTarget).removeClass("ui-state-focus")}})},_trigger:function(type,event,data){var prop,orig,callback=this.options[type];data=data||{};event=$.Event(event);event.type=(type===this.widgetEventPrefix?type:this.widgetEventPrefix+type).toLowerCase();
// the original event may come from any element
// so we need to reset the target on the new event
event.target=this.element[0];
// copy original event properties over to the new event
orig=event.originalEvent;if(orig){for(prop in orig){if(!(prop in event)){event[prop]=orig[prop]}}}this.element.trigger(event,data);return!($.isFunction(callback)&&callback.apply(this.element[0],[event].concat(data))===false||event.isDefaultPrevented())}};$.each({show:"fadeIn",hide:"fadeOut"},function(method,defaultEffect){$.Widget.prototype["_"+method]=function(element,options,callback){if(typeof options==="string"){options={effect:options}}var hasOptions,effectName=!options?method:options===true||typeof options==="number"?defaultEffect:options.effect||defaultEffect;options=options||{};if(typeof options==="number"){options={duration:options}}hasOptions=!$.isEmptyObject(options);options.complete=callback;if(options.delay){element.delay(options.delay)}if(hasOptions&&$.effects&&$.effects.effect[effectName]){element[method](options)}else if(effectName!==method&&element[effectName]){element[effectName](options.duration,options.easing,callback)}else{element.queue(function(next){$(this)[method]();if(callback){callback.call(element[0])}next()})}}})});!function(window,undefined){"use strict";var path="",//组件存放目录，为空表示自动获取(不用填写host，相对站点的根目录即可)。
$,win,ready={getPath:function(){var js=document.scripts,jsPath=js[js.length-1].src;return path?path:jsPath.substring(0,jsPath.lastIndexOf("/")+1)},
//五种原始层模式
type:["dialog","page","iframe","loading","tips"]};
//默认内置方法。
window.layer={v:"1.8.5",ie6:!!window.ActiveXObject&&!window.XMLHttpRequest,index:0,path:ready.getPath(),
//载入模块
use:function(module,callback){var i=0,head=$("head")[0];var module=module.replace(/\s/g,"");var iscss=/\.css$/.test(module);var node=document.createElement(iscss?"link":"script");var id=module.replace(/\.|\//g,"");if(iscss){node.type="text/css";node.rel="stylesheet"}node[iscss?"href":"src"]=/^http:\/\//.test(module)?module:layer.path+module;node.id=id;if(!$("#"+id)[0]){head.appendChild(node)}if(callback){if(document.all){$(node).ready(callback)}else{$(node).load(callback)}}},alert:function(msg,icon,fn,yes,isCloseSucess){var isfn=typeof fn==="function",conf={dialog:{msg:msg,type:icon,yes:isfn?fn:yes},area:["auto","auto"],close:function(index){
//设置关闭按钮是否执行yes的回调
if(isCloseSucess){isfn?fn():yes()}layer.close(index)}};isfn||(conf.title=fn);return $.layer(conf)},confirm:function(msg,yes,fn,no){var isfn=typeof fn==="function",conf={dialog:{msg:msg,type:4,btns:2,yes:yes,no:isfn?fn:no}};isfn||(conf.title=fn);return $.layer(conf)},msg:function(msg,time,parme,end){var conf={title:false,closeBtn:false,time:time===undefined?2:time,dialog:{msg:msg===""||msg===undefined?"&nbsp;":msg},end:end};if(typeof parme==="object"){conf.dialog.type=parme.type;conf.shade=parme.shade;conf.shift=parme.rate}else if(typeof parme==="function"){conf.end=parme}else{conf.dialog.type=parme}return $.layer(conf)},
//加载层快捷引用
load:function(parme,icon){if(typeof parme==="string"){return layer.msg(parme,icon||0,16)}else{return $.layer({time:parme,loading:{type:icon},bgcolor:icon?"#fff":"",shade:icon?[.1,"#000"]:[0],border:icon===3||!icon?[0]:[6,.3,"#000"],type:3,title:["",false],closeBtn:[0,false]})}},
//tips层快捷引用
tips:function(html,follow,parme,maxWidth,guide,style){var conf={type:4,shade:false,success:function(layero){if(!this.closeBtn){layero.find(".xubox_tips").css({"padding-right":10})}},bgcolor:"",tips:{msg:html,follow:follow}};conf.time=typeof parme==="object"?parme.time:parme|0;parme=parme||{};conf.closeBtn=parme.closeBtn||false;conf.maxWidth=parme.maxWidth||maxWidth;conf.tips.guide=parme.guide||guide;conf.tips.style=parme.style||style;conf.tips.more=parme.more;return $.layer(conf)}};
//缓存常用字符
var doms=["xubox_layer","xubox_iframe",".xubox_title",".xubox_text",".xubox_page",".xubox_main"];var Class=function(setings){var that=this,config=that.config;layer.index++;that.index=layer.index;that.config=$.extend({},config,setings);that.config.dialog=$.extend({},config.dialog,setings.dialog);that.config.page=$.extend({},config.page,setings.page);that.config.iframe=$.extend({},config.iframe,setings.iframe);that.config.loading=$.extend({},config.loading,setings.loading);that.config.tips=$.extend({},config.tips,setings.tips);that.creat()};Class.pt=Class.prototype;
//默认配置
Class.pt.config={type:0,shade:[.1,"#fff"],//lyc修改，原始值为0.7
fix:true,move:".xubox_title",title:"&#x4FE1;&#x606F;",offset:["","50%"],area:["auto","auto"],closeBtn:[0,true],time:0,bgcolor:"#fff",border:[6,.3,"#000"],zIndex:19891014,maxWidth:400,dialog:{btns:1,btn:["&#x786E;&#x5B9A;","&#x53D6;&#x6D88;"],type:8,msg:"",yes:function(index){layer.close(index)},no:function(index){layer.close(index)}},page:{dom:"#xulayer",html:"",url:""},iframe:{src:"http://sentsin.com",scrolling:"auto"},loading:{type:0},tips:{msg:"",follow:"",guide:0,isGuide:true,style:["background-color:#FF9900; color:#fff;","#FF9900"]},success:function(layer,index){},//创建成功后的回调
close:function(index){layer.close(index)},//右上角关闭回调
end:function(){}};
//容器
Class.pt.space=function(html){var that=this,html=html||"",times=that.index,config=that.config,dialog=config.dialog,ico=dialog.type===-1?"":"",frame=['<div class="xubox_dialog">'+dialog.msg+"</div>",'<div class="xubox_page">'+html+"</div>",'<iframe scrolling="'+config.iframe.scrolling+'" allowtransparency="true" id="'+doms[1]+""+times+'" name="'+doms[1]+""+times+'" onload="this.className=\''+doms[1]+'\'" class="'+doms[1]+'" frameborder="0" src="'+config.iframe.src+'"></iframe>','<span class="xubox_loading xubox_loading_'+config.loading.type+'"></span>','<div class="xubox_tips" style="'+config.tips.style[0]+'"><div class="xubox_tipsMsg">'+config.tips.msg+'</div><i class="layerTipsG"></i></div>'],shade="",border="",zIndex=config.zIndex+times,shadeStyle="z-index:"+zIndex+"; background-color:"+config.shade[1]+"; opacity:"+config.shade[0]+"; filter:alpha(opacity="+config.shade[0]*100+");";config.shade[0]&&(shade='<div times="'+times+'" id="xubox_shade'+times+'" class="xubox_shade" style="'+shadeStyle+'"></div>');config.zIndex=zIndex;var title="",closebtn="",borderStyle="z-index:"+(zIndex-1)+";  background-color: "+config.border[2]+"; opacity:"+config.border[1]+"; filter:alpha(opacity="+config.border[1]*100+"); top:-"+config.border[0]+"px; left:-"+config.border[0]+"px;";config.border[0]&&(border="");if(config.maxmin&&(config.type===1||config.type===2)&&(!/^\d+%$/.test(config.area[0])||!/^\d+%$/.test(config.area[1]))){closebtn='<a class="xubox_min" href="javascript:;"><cite></cite></a><a class="xubox_max xulayer_png32" href="javascript:;"></a>'}config.closeBtn[1]&&(closebtn+='<a class="xubox_close xulayer_png32 xubox_close'+config.closeBtn[0]+'" href="javascript:;" style="'+(config.type===4?"position:absolute; right:-3px; _right:7px; top:-4px;":"")+'"><span class="closeTip">关闭<em></em></span></a>');var titype=typeof config.title==="object";config.title&&(title='<div class="xubox_title" style="'+(titype?config.title[1]:"")+'"><em>'+(titype?config.title[0]:config.title)+"</em></div>");return[shade,'<div times="'+times+'" showtime="'+config.time+'" style="z-index:'+zIndex+'" id="'+doms[0]+""+times+'" class="'+doms[0]+'">'+'<div style="background-color:'+config.bgcolor+"; z-index:"+zIndex+'" class="xubox_main">'+title+frame[config.type]+'<span class="xubox_setwin">'+closebtn+"</span>"+'<div class="xubox_botton"></div>'+"</div>"+border+"</div>"]};
//创建骨架
Class.pt.creat=function(){var that=this,space="",config=that.config,dialog=config.dialog,times=that.index;var page=config.page,body=$("body"),setSpace=function(html){var html=html||"";space=that.space(html);body.append($(space[0]))};switch(config.type){case 0:config.title||(config.area=["auto","auto"]);$(".xubox_dialog")[0]&&layer.close($(".xubox_dialog").parents("."+doms[0]).attr("times"));break;case 1:if(page.html!==""){setSpace('<div class="xuboxPageHtml">'+page.html+"</div>");body.append($(space[1]))}else if(page.url!==""){setSpace('<div class="xuboxPageHtml" id="xuboxPageHtml'+times+'">'+page.html+"</div>");body.append($(space[1]));$.get(page.url,function(datas){$("#xuboxPageHtml"+times).html(datas.toString());page.ok&&page.ok(datas)})}else{if($(page.dom).parents(doms[4]).length==0){setSpace();$(page.dom).show().wrap($(space[1]))}else{return}}break;case 3:config.title=false;config.area=["auto","auto"];config.closeBtn=["",false];$(".xubox_loading")[0]&&layer.closeLoad();break;case 4:config.title=false;config.area=["auto","auto"];config.fix=false;config.border=[0];config.tips.more||layer.closeTips();break}if(config.type!==1){setSpace();body.append($(space[1]))}var layerE=that.layerE=$("#"+doms[0]+times);layerE.css({width:config.area[0],height:config.area[1]});config.fix||layerE.css({position:"absolute"});
//配置按钮
if(config.title&&(config.type!==3||config.type!==4)){var confbtn=config.type===0?dialog:config,layerBtn=layerE.find(".xubox_botton");confbtn.btn=config.btn||dialog.btn;switch(confbtn.btns){case 0:layerBtn.html("").hide();break;case 1:layerBtn.html('<a href="javascript:;" class="xubox_yes xubox_botton1">'+confbtn.btn[0]+"</a>");break;case 2:layerBtn.html('<a href="javascript:;" class="xubox_yes xubox_botton2">'+confbtn.btn[0]+"</a>"+'<a href="javascript:;" class="xubox_no xubox_botton3">'+confbtn.btn[1]+"</a>");break}}if(layerE.css("left")==="auto"){layerE.hide();setTimeout(function(){layerE.show();that.set(times)},500)}else{that.set(times)}config.time<=0||that.autoclose();/*自定义   start*/
//隐藏标题
if(config.hideTitle){layerE.find(".xubox_title").hide();layerE.find(".xubox_dialog ").css({paddingTop:0})}
//隐藏按钮
if(config.hideBtn){layerE.find(".xubox_botton").hide()}/*自定义   end*/
that.callback()};ready.fade=function(obj,time,opa){obj.css({opacity:0}).animate({opacity:opa},time)};
//计算坐标
Class.pt.offset=function(){var that=this,config=that.config,layerE=that.layerE,laywid=layerE.outerHeight();if(config.offset[0]===""&&laywid<win.height()){that.offsetTop=(win.height()-laywid-2*config.border[0])/2}else if(config.offset[0].indexOf("px")!=-1){that.offsetTop=parseFloat(config.offset[0])}else{that.offsetTop=parseFloat(config.offset[0]||0)/100*win.height()}that.offsetTop=that.offsetTop+config.border[0]+(config.fix?0:win.scrollTop());if(config.offset[1].indexOf("px")!=-1){that.offsetLeft=parseFloat(config.offset[1])+config.border[0]}else{config.offset[1]=config.offset[1]===""?"50%":config.offset[1];if(config.offset[1]==="50%"){that.offsetLeft=config.offset[1]}else{that.offsetLeft=parseFloat(config.offset[1])/100*win.width()+config.border[0]}}};
//初始化骨架
Class.pt.set=function(times){var that=this;var config=that.config;var dialog=config.dialog;var page=config.page;var loading=config.loading;var layerE=that.layerE;var layerTitle=layerE.find(doms[2]);that.autoArea(times);if(config.title){if(config.type===0){layer.ie6&&layerTitle.css({width:layerE.outerWidth()})}}else{config.type!==4&&layerE.find(".xubox_close").addClass("xubox_close1")}layerE.attr({type:ready.type[config.type]});that.offset();
//判断是否动画弹出
if(config.type!==4){if(config.shift&&!layer.ie6){if(typeof config.shift==="object"){that.shift(config.shift[0],config.shift[1]||500,config.shift[2])}else{that.shift(config.shift,500)}}else{layerE.css({top:that.offsetTop,left:that.offsetLeft})}}switch(config.type){case 0:layerE.find(doms[5]).css({"background-color":"#fff"});if(config.title){layerE.find(doms[3]).css({paddingTop:18+layerTitle.outerHeight()})}else{layerE.find(".xubox_msgico").css({top:8});layerE.find(doms[3]).css({marginTop:11})}break;case 1:layerE.find(page.dom).addClass("layer_pageContent");config.shade[0]&&layerE.css({zIndex:config.zIndex+1});config.title&&layerE.find(doms[4]).css({top:layerTitle.outerHeight()});break;case 2:var iframe=layerE.find("."+doms[1]),heg=layerE.height();iframe.addClass("xubox_load").css({width:layerE.width()});config.title?iframe.css({top:layerTitle.height(),height:heg-layerTitle.height()}):iframe.css({top:0,height:heg});layer.ie6&&iframe.attr("src",config.iframe.src);break;case 4:var layArea=[0,layerE.outerHeight()],fow=$(config.tips.follow),fowo={width:fow.outerWidth(),height:fow.outerHeight(),top:fow.offset().top,left:fow.offset().left},tipsG=layerE.find(".layerTipsG");config.tips.isGuide||tipsG.remove();layerE.outerWidth()>config.maxWidth&&layerE.width(config.maxWidth);fowo.tipColor=config.tips.style[1];layArea[0]=layerE.outerWidth();fowo.autoLeft=function(){if(fowo.left+layArea[0]-win.width()>0){fowo.tipLeft=fowo.left+fowo.width-layArea[0];tipsG.css({right:12,left:"auto"})}else{fowo.tipLeft=fowo.left}};
//辨别tips的方位
fowo.where=[function(){//上
fowo.autoLeft();fowo.tipTop=fowo.top-layArea[1]-10;tipsG.removeClass("layerTipsB").addClass("layerTipsT").css({"border-right-color":fowo.tipColor})},function(){//右
fowo.tipLeft=fowo.left+fowo.width+10;fowo.tipTop=fowo.top;tipsG.removeClass("layerTipsL").addClass("layerTipsR").css({"border-bottom-color":fowo.tipColor})},function(){//下
fowo.autoLeft();fowo.tipTop=fowo.top+fowo.height+10;tipsG.removeClass("layerTipsT").addClass("layerTipsB").css({"border-right-color":fowo.tipColor})},function(){//左
fowo.tipLeft=fowo.left-layArea[0]+10;fowo.tipTop=fowo.top;tipsG.removeClass("layerTipsR").addClass("layerTipsL").css({"border-bottom-color":fowo.tipColor})}];fowo.where[config.tips.guide]();/* 8*2为小三角形占据的空间 */
if(config.tips.guide===0){fowo.top-(win.scrollTop()+layArea[1]+8*2)<0&&fowo.where[2]()}else if(config.tips.guide===1){win.width()-(fowo.left+fowo.width+layArea[0]+8*2)>0||fowo.where[3]()}else if(config.tips.guide===2){fowo.top-win.scrollTop()+fowo.height+layArea[1]+8*2-win.height()>0&&fowo.where[0]()}else if(config.tips.guide===3){layArea[0]+8*2-fowo.left>0&&fowo.where[1]()}else if(config.tips.guide===4){}layerE.css({left:fowo.tipLeft,top:fowo.tipTop});break}if(config.fadeIn){ready.fade(layerE,config.fadeIn,1);ready.fade($("#xubox_shade"+times),config.fadeIn,config.shade[0])}
//坐标自适应浏览器窗口尺寸
if(config.fix&&config.offset[0]===""&&!config.shift){win.on("resize",function(){layerE.css({top:(win.height()-layerE.outerHeight())/2})})}that.move()};
//动画进入
Class.pt.shift=function(type,rate,stop){var that=this,config=that.config;var layerE=that.layerE;var cutWth=0,ww=win.width();var wh=win.height()+(config.fix?0:win.scrollTop());if(config.offset[1]=="50%"||config.offset[1]==""){cutWth=layerE.outerWidth()/2}else{cutWth=layerE.outerWidth()}var anim={t:{top:that.offsetTop},b:{top:wh-layerE.outerHeight()-config.border[0]},cl:cutWth+config.border[0],ct:-layerE.outerHeight(),cr:ww-cutWth-config.border[0]};switch(type){case"left-top":layerE.css({left:anim.cl,top:anim.ct}).animate(anim.t,rate);break;case"top":layerE.css({top:anim.ct}).animate(anim.t,rate);break;case"right-top":layerE.css({left:anim.cr,top:anim.ct}).animate(anim.t,rate);break;case"right-bottom":layerE.css({left:anim.cr,top:wh}).animate(stop?anim.t:anim.b,rate);break;case"bottom":layerE.css({top:wh}).animate(stop?anim.t:anim.b,rate);break;case"left-bottom":layerE.css({left:anim.cl,top:wh}).animate(stop?anim.t:anim.b,rate);break;case"left":layerE.css({left:-layerE.outerWidth()}).animate({left:that.offsetLeft},rate);break}};
//自适应宽高
Class.pt.autoArea=function(times){var that=this,times=times||that.index,config=that.config,page=config.page;var layerE=$("#"+doms[0]+times),layerTitle=layerE.find(doms[2]),layerMian=layerE.find(doms[5]);var titHeight=config.title?layerTitle.innerHeight():0,outHeight,btnHeight=0;if(config.area[0]==="auto"&&layerMian.outerWidth()>=config.maxWidth){}switch(config.type){case 0:var aBtn=layerE.find(".xubox_botton>a");outHeight=layerE.find(doms[3]).outerHeight()+20;if(aBtn.length>0){btnHeight=aBtn.outerHeight()+20}break;case 1:var layerPage=layerE.find(doms[4]);outHeight=$(page.dom).outerHeight();config.area[0]==="auto"&&layerE.css({width:layerPage.outerWidth()});if(page.html!==""||page.url!==""){outHeight=layerPage.outerHeight()}break;case 2:layerE.find("iframe").css({width:layerE.outerWidth(),height:layerE.outerHeight()-(config.title?layerTitle.innerHeight():0)});break;case 3:var load=layerE.find(".xubox_loading");outHeight=load.outerHeight();layerMian.css({width:load.width()});break}config.area[1]==="auto"&&layerMian.css({height:"auto"});$("#xubox_border"+times).css({width:layerE.outerWidth()+2*config.border[0],height:layerE.outerHeight()+2*config.border[0]});layer.ie6&&config.area[0]!=="auto"&&layerMian.css({width:layerE.outerWidth()});(config.offset[1]==="50%"||config.offset[1]=="")&&config.type!==4?layerE.css({marginLeft:-layerE.outerWidth()/2}):layerE.css({marginLeft:0})};
//拖拽层
Class.pt.move=function(){var that=this,config=that.config,conf={setY:0,moveLayer:function(){if(parseInt(conf.layerE.css("margin-left"))==0){var lefts=parseInt(conf.move.css("left"))}else{var lefts=parseInt(conf.move.css("left"))+-parseInt(conf.layerE.css("margin-left"))}if(conf.layerE.css("position")!=="fixed"){lefts=lefts-conf.layerE.parent().offset().left;conf.setY=0}conf.layerE.css({left:lefts,top:parseInt(conf.move.css("top"))-conf.setY})}};var movedom=that.layerE.find(config.move);config.move&&movedom.attr("move","ok");config.move?movedom.css({cursor:"move"}):movedom.css({cursor:"auto"});$(config.move).on("mousedown",function(M){M.preventDefault();if($(this).attr("move")==="ok"){conf.ismove=true;conf.layerE=$(this).parents("."+doms[0]);var xx=conf.layerE.offset().left,yy=conf.layerE.offset().top,ww=conf.layerE.width()-6,hh=conf.layerE.height()-6;if(!$("#xubox_moves")[0]){$("body").append('<div id="xubox_moves" class="xubox_moves" style="left:'+xx+"px; top:"+yy+"px; width:"+ww+"px; height:"+hh+'px; z-index:2147483584"></div>')}conf.move=$("#xubox_moves");config.moveType&&conf.move.css({opacity:0});conf.moveX=M.pageX-conf.move.position().left;conf.moveY=M.pageY-conf.move.position().top;conf.layerE.css("position")!=="fixed"||(conf.setY=win.scrollTop())}});$(document).mousemove(function(M){if(conf.ismove){var offsetX=M.pageX-conf.moveX,offsetY=M.pageY-conf.moveY;M.preventDefault();
//控制元素不被拖出窗口外
if(!config.moveOut){conf.setY=win.scrollTop();var setRig=win.width()-conf.move.outerWidth()-config.border[0],setTop=config.border[0]+conf.setY;offsetX<config.border[0]&&(offsetX=config.border[0]);offsetX>setRig&&(offsetX=setRig);offsetY<setTop&&(offsetY=setTop);offsetY>win.height()-conf.move.outerHeight()-config.border[0]+conf.setY&&(offsetY=win.height()-conf.move.outerHeight()-config.border[0]+conf.setY)}conf.move.css({left:offsetX,top:offsetY});config.moveType&&conf.moveLayer();offsetX=null;offsetY=null;setRig=null;setTop=null}}).mouseup(function(){try{if(conf.ismove){conf.moveLayer();conf.move.remove()}conf.ismove=false}catch(e){conf.ismove=false}config.moveEnd&&config.moveEnd()})};
//自动关闭layer
Class.pt.autoclose=function(){var that=this,time=that.config.time,maxLoad=function(){time--;if(time===0){layer.close(that.index);clearInterval(that.autotime)}};that.autotime=setInterval(maxLoad,1e3)};ready.config={end:{}};Class.pt.callback=function(){var that=this,layerE=that.layerE,config=that.config,dialog=config.dialog;that.openLayer();that.config.success(layerE,that.index);layer.ie6&&that.IE6(layerE);layerE.find(".xubox_close").on("click",function(){config.close(that.index);layer.close(that.index)});layerE.find(".xubox_yes").on("click",function(){config.yes?config.yes(that.index):dialog.yes(that.index)});layerE.find(".xubox_no").on("click",function(){config.no?config.no(that.index):dialog.no(that.index);layer.close(that.index)});if(that.config.shadeClose){$("#xubox_shade"+that.index).on("click",function(){layer.close(that.index)})}
//最小化
layerE.find(".xubox_min").on("click",function(){layer.min(that.index,config);config.min&&config.min(layerE)});
//全屏/还原
layerE.find(".xubox_max").on("click",function(){if($(this).hasClass("xubox_maxmin")){layer.restore(that.index);config.restore&&config.restore(layerE)}else{layer.full(that.index,config);config.full&&config.full(layerE)}});ready.config.end[that.index]=config.end};
//恢复select
ready.reselect=function(){$.each($("select"),function(index,value){var sthis=$(this);if(!sthis.parents("."+doms[0])[0]){sthis.attr("layer")==1&&$("."+doms[0]).length<1&&sthis.removeAttr("layer").show()}sthis=null})};Class.pt.IE6=function(layerE){var that=this;var _ieTop=layerE.offset().top;
//ie6的固定与相对定位
if(that.config.fix){var ie6Fix=function(){layerE.css({top:win.scrollTop()+_ieTop})}}else{var ie6Fix=function(){layerE.css({top:_ieTop})}}ie6Fix();win.scroll(ie6Fix);
//隐藏select
$.each($("select"),function(index,value){var sthis=$(this);if(!sthis.parents("."+doms[0])[0]){sthis.css("display")=="none"||sthis.attr({layer:"1"}).hide()}sthis=null})};
//给layer对象拓展方法
Class.pt.openLayer=function(){var that=this,layerE=that.layerE;
//自适应宽高
layer.autoArea=function(index){return that.autoArea(index)};
//兼容旧版出场动画
layer.shift=function(type,rate,stop){that.shift(type,rate,stop)};
//初始化拖拽元素
layer.setMove=function(){return that.move()};
//置顶当前窗口
layer.zIndex=that.config.zIndex;layer.setTop=function(layerNow){var setZindex=function(){layer.zIndex++;layerNow.css("z-index",layer.zIndex+1)};layer.zIndex=parseInt(layerNow[0].style.zIndex);layerNow.on("mousedown",setZindex);return layer.zIndex}};ready.isauto=function(layero,options,offset){options.area[0]==="auto"&&(options.area[0]=layero.outerWidth());options.area[1]==="auto"&&(options.area[1]=layero.outerHeight());layero.attr({area:options.area+","+offset});layero.find(".xubox_max").addClass("xubox_maxmin")};ready.rescollbar=function(index){if(doms.html.attr("layer-full")==index){if(doms.html[0].style.removeProperty){doms.html[0].style.removeProperty("overflow")}else{doms.html[0].style.removeAttribute("overflow")}doms.html.removeAttr("layer-full")}};/**
     * 集成属性/方法
     **/
//获取page层所在索引
layer.getIndex=function(selector){return $(selector).parents("."+doms[0]).attr("times")};
//获取子iframe的DOM
layer.getChildFrame=function(selector,index){index=index||$("."+doms[1]).parents("."+doms[0]).attr("times");return $("#"+doms[0]+index).find("."+doms[1]).contents().find(selector)};
//得到当前iframe层的索引，子iframe时使用
layer.getFrameIndex=function(name){return $(name?"#"+name:"."+doms[1]).parents("."+doms[0]).attr("times")};
//iframe层自适应宽高
layer.iframeAuto=function(index){index=index||$("."+doms[1]).parents("."+doms[0]).attr("times");var heg=layer.getChildFrame("body",index).outerHeight(),layero=$("#"+doms[0]+index),tit=layero.find(doms[2]),titHt=0;tit&&(titHt=tit.height());layero.css({height:heg+titHt});var bs=-parseInt($("#xubox_border"+index).css("top"));$("#xubox_border"+index).css({height:heg+2*bs+titHt});$("#"+doms[1]+index).css({height:heg})};
//重置iframe url
layer.iframeSrc=function(index,url){$("#"+doms[0]+index).find("iframe").attr("src",url)};
//重置层
layer.area=function(index,options){var layero=[$("#"+doms[0]+index),$("#xubox_border"+index)],type=layero[0].attr("type"),main=layero[0].find(doms[5]),title=layero[0].find(doms[2]);if(type===ready.type[1]||type===ready.type[2]){layero[0].css(options);main.css({width:options.width,height:options.height});if(type===ready.type[2]){var iframe=layero[0].find("iframe");iframe.css({width:options.width,height:title?options.height-title.innerHeight():options.height})}if(layero[0].css("margin-left")!=="0px"){options.hasOwnProperty("top")&&layero[0].css({top:options.top-(layero[1][0]?parseFloat(layero[1].css("top")):0)});options.hasOwnProperty("left")&&layero[0].css({left:options.left+layero[0].outerWidth()/2-(layero[1][0]?parseFloat(layero[1].css("left")):0)});layero[0].css({marginLeft:-layero[0].outerWidth()/2})}if(layero[1][0]){layero[1].css({width:parseFloat(options.width)-2*parseFloat(layero[1].css("left")),height:parseFloat(options.height)-2*parseFloat(layero[1].css("top"))})}}};
//最小化
layer.min=function(index,options){var layero=$("#"+doms[0]+index),offset=[layero.position().top,layero.position().left+parseFloat(layero.css("margin-left"))];ready.isauto(layero,options,offset);layer.area(index,{width:180,height:35});layero.find(".xubox_min").hide();layero.attr("type")==="page"&&layero.find(doms[4]).hide();ready.rescollbar(index)};
//还原
layer.restore=function(index){var layero=$("#"+doms[0]+index),area=layero.attr("area").split(",");var type=layero.attr("type");layer.area(index,{width:parseFloat(area[0]),height:parseFloat(area[1]),top:parseFloat(area[2]),left:parseFloat(area[3])});layero.find(".xubox_max").removeClass("xubox_maxmin");layero.find(".xubox_min").show();layero.attr("type")==="page"&&layero.find(doms[4]).show();ready.rescollbar(index)};
//全屏
layer.full=function(index,options){var layero=$("#"+doms[0]+index),borders=options.border[0]*2||6,timer;var offset=[layero.position().top,layero.position().left+parseFloat(layero.css("margin-left"))];ready.isauto(layero,options,offset);if(!doms.html.attr("layer-full")){doms.html.css("overflow","hidden").attr("layer-full",index)}clearTimeout(timer);timer=setTimeout(function(){layer.area(index,{top:layero.css("position")==="fixed"?0:win.scrollTop(),left:layero.css("position")==="fixed"?0:win.scrollLeft(),width:win.width()-borders,height:win.height()-borders})},100)};
//改变title
layer.title=function(name,index){var title=$("#"+doms[0]+(index||layer.index)).find(".xubox_title>em");title.html(name)};
//关闭layer总方法
layer.close=function(index){var layero=$("#"+doms[0]+index),type=layero.attr("type"),shadeNow=$("#xubox_moves, #xubox_shade"+index);if(!layero[0]){return}if(type==ready.type[1]){if(layero.find(".xuboxPageHtml")[0]){layero[0].innerHTML="";layero.remove()}else{layero.find(".xubox_setwin,.xubox_close,.xubox_botton,.xubox_title,.xubox_border").remove();for(var i=0;i<3;i++){layero.find(".layer_pageContent").unwrap().hide()}}}else{layero[0].innerHTML="";layero.remove()}shadeNow.remove();layer.ie6&&ready.reselect();ready.rescollbar(index);typeof ready.config.end[index]==="function"&&ready.config.end[index]();delete ready.config.end[index]};
//关闭loading层
layer.closeLoad=function(){layer.close($(".xubox_loading").parents("."+doms[0]).attr("times"))};
//关闭tips层
layer.closeTips=function(){layer.closeAll("tips")};
//关闭所有层
layer.closeAll=function(type){$.each($("."+doms[0]),function(){var othis=$(this);var is=type?othis.attr("type")===type:1;if(is){layer.close(othis.attr("times"))}is=null})};
//主入口
ready.run=function(){$=jQuery;win=$(window);doms.html=$("html");
//layer.use('/static/js/widget/layer/skin/layer.css');
$.layer=function(deliver){var o=new Class(deliver);return o.index}};if(/*"function" === typeof define*/false){define(function(){ready.run();return layer})}else{ready.run()}}(window);(function(){var methodConfig={require:function(value,element,params){return $.trim(value)!=""},range:function(value,element,params){return value.length>=params[0]&&value.length<=params[1]}};function ZcValidate(opts){this.form=opts.form;this.rules=opts.rules;
//出错就中断
this.errorPause=opts.errorPause;this.errorPlacement=opts.errorPlacement;this.formElements=this.getElements();this.ready()}ZcValidate.prototype={
//获取参与验证的元素
getElements:function(){return this.form.find("input,textarea,select").filter("[name]")},validElement:function(element){var that=this;var name=element.attr("name");var ruleObj=that.rules[name];var validRes=true;$.each(ruleObj,function(ruleName,ruleConfig){var res=methodConfig[ruleName](element.val(),element,ruleConfig.params);if(res){var id="for"+name;$("#"+id).remove()}else{var id="for"+name;$("#"+id).remove();
//替换
var msg=ruleConfig.msg.replace(/\{[^{}]\}/g,function(match,i,a){return ruleConfig.params[match.charAt(1)]});var errorElement=$("<div id="+id+">"+msg+"</div>");if(that.errorPlacement){that.errorPlacement(errorElement,element)}else{element.after(errorElement)}validRes=false;return false}});return validRes},valid:function(){var that=this;var validRes=true;that.formElements.each(function(){var res=that.validElement($(this));if(!res){validRes=false;if(that.errorPause){return false}}});return validRes},ready:function(){}};return ZcValidate})();function Pager(id,source){var self=this;
//限定只接受两个参数
if(arguments.length>2){throw new Error("The Function number of parameters error.")}
//原始参数集合
var sourceOriginal={startNum:1,viewNum:5,allNum:10,pageSize:10,isForeAft:true,ellipsis:"...",callback:function(){}};var quoteProto=Object.prototype.toString;var _private={
//核心构造方法，处理分页数据与DOM渲染处理
createHTML:function(n){var _ul=$("<ul>"),_liStr="<li>",_msg={
//p: "&lt;",
//n: "&gt;",
p:"上一页",n:"下一页",f:"首页",l:"尾页"},classOn="on",classEllipsis="ellipsis",classFirstPage="firstPage",classLastPage="lastPage",classPrePage="prePage",classNextPage="nextPage",classPager="pager",classHeadEllipsis="",classFootEllipsis="";var header={0:_msg.f+"|"+classFirstPage,1:_msg.p+"|"+classPrePage,2:sourceOriginal.ellipsis+"|"+classEllipsis};var footer={0:sourceOriginal.ellipsis+"|"+classEllipsis,1:_msg.n+"|"+classNextPage,2:_msg.l+"|"+classLastPage};if(n&&n!=0){sourceOriginal.startNum=n}var len=sourceOriginal.viewNum+2;var averageValue=Math.floor(sourceOriginal.viewNum/2);var number=0;if(sourceOriginal.allNum==sourceOriginal.viewNum){classHeadEllipsis="none";classFootEllipsis="none"}if(sourceOriginal.allNum<sourceOriginal.viewNum){number=1;len=sourceOriginal.allNum+2;classHeadEllipsis="none";classFootEllipsis="none"}else if(sourceOriginal.startNum<sourceOriginal.viewNum){number=1;classHeadEllipsis="none"}else if(sourceOriginal.startNum+averageValue<sourceOriginal.allNum){number=sourceOriginal.startNum-averageValue}else{number=sourceOriginal.allNum-(sourceOriginal.viewNum-1);classFootEllipsis="none"}for(var i=0;i<len;i++){var _li=$(_liStr);if(sourceOriginal.isForeAft&&i==0){for(var k in header){var _hLi=$(_liStr),headArr=header[k].split("|");if(k=="1"){_hLi.addClass(classHeadEllipsis)}_hLi.html(headArr[0]).addClass(headArr[1]).appendTo(_ul)}continue}if(sourceOriginal.isForeAft&&i==len-1){for(var j in footer){var _fLi=$(_liStr),footArr=footer[j].split("|");if(j=="0"){_fLi.addClass(classFootEllipsis)}_fLi.html(footArr[0]).addClass(footArr[1]).appendTo(_ul)}continue}if(number==sourceOriginal.startNum){_li.addClass(classOn)}var pageNum=number++;_li.attr("data-num",pageNum).html(pageNum).appendTo(_ul)}
//增加选择几页   跳页
/*var selectLi = $('<li class="li-select-popation" style="">每页' +
                    '<div class="selected w70 select-popation ">' +
                    '<div class="selectMain">' +
                    '<input type="hidden" value="" />' +
                    '<i index-data="" class="seleInput"></i>' +

                    '<ul class="none">' +
                        //'<li index-data="5"'+(self.pageSize=='5'?'class=active':'')+'><span>5</a></span>' +
                    '<li index-data="10"'+(self.pageSize=='10'?'class=active':'')+'><span>10</a></span>' +
                    '<li index-data="20"'+(self.pageSize=='20'?'class=active':'')+'><span>20</a></span>' +
                    '<li index-data="30"'+(self.pageSize=='30'?'class=active':'')+'><span>30</a></span>' +
                    '<li index-data="50"'+(self.pageSize=='50'?'class=active':'')+'><span>50</a></span>' +
                    '<li index-data="100"'+(self.pageSize=='100'?'class=active':'')+'><span>100</a></span>' +

                    '</ul>' +
                    '</div>' +
                    '</div>条' +
                    '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;共'+ self.totalCount +'条，跳转到第<input class="toPageInput" type="text">页<li class="toPage">确定</li></li>').appendTo(_ul);




                selected(function(i){

                    self.pageSize = i;
                    self.one(1);
                }, selectLi.find('.select-popation'));*/
if(sourceOriginal.hideFirstAndLast){_ul.find(".firstPage ,.lastPage").hide()}
//隐藏省略号
if(sourceOriginal.hideEllipsis){_ul.find(".ellipsis").hide()}_ul.addClass(classPager);return _ul},isString:function(str){return quoteProto.call(str)==="[object String]"},isObject:function(obj){return quoteProto.call(obj)==="[object Object]"}};var source=[].slice.call(arguments).pop();
//初始化构造函数
this.init=function(){this.iD=_private.isString(id)?$(id):id;if(_private.isObject(source)){$.extend(sourceOriginal,source);
//页数 = 总条数/每页条数
sourceOriginal.allNum=Math.ceil(sourceOriginal.totalCount/sourceOriginal.pageSize);this.num=sourceOriginal.startNum;this.totalNum=sourceOriginal.allNum;this._callback=sourceOriginal.callback;this.pageSize=sourceOriginal.pageSize;this.totalCount=sourceOriginal.totalCount}return _private}.call(this)}Pager.fn=Pager.prototype={render:function(num){var _this=this;this.iD.html(this.init.createHTML(num));
//当前点击
this.iD.find("[data-num]").click(function(){var that=$(this);if(!that.hasClass("on"))_this.one(that.data("num"))});
//上一页
this.iD.find(".prePage").click(function(){_this.prev()});
//下一页
this.iD.find(".nextPage").click(function(){_this.next()});
//首页
this.iD.find(".firstPage").click(function(){_this.first()});
//末页
this.iD.find(".lastPage").click(function(){_this.last()});
//跳页
this.iD.find(".toPage").click(function(){_this.toPage()})},one:function(num){this.num=num;this.render(this.num);this._callback.call(this,this.num,this.pageSize)},next:function(){if(this.num<this.totalNum){var num=++this.num;this.render(num);this._callback.call(this,this.num,this.pageSize)}},prev:function(){if(this.num>1){var num=--this.num;this.render(num);this._callback.call(this,this.num,this.pageSize)}},first:function(){if(this.num>1){var num=this.num=1;this.render(num);this._callback.call(this,this.num,this.pageSize)}},last:function(){if(this.num<this.totalNum){var num=this.num=this.totalNum;this.render(num);this._callback.call(this,this.num,this.pageSize)}},toPage:function(){var toPage=Number(this.iD.find(".toPageInput").val());if(toPage>=1&&toPage<=this.totalNum&&/^[\d\s]+$/.test(toPage)){var num=this.num=toPage;this.render(num);this._callback.call(this,this.num,this.pageSize)}else{$.layer({title:"提示消息",area:["300px","100px"],btns:0,shade:[false],dialog:{type:8,msg:'<div class="layer-content mL5">不存在该页</div>'}})}}};/**
     * Created by xiaofengyun on 2016/7/25.
     */
function R_select(opts){var jqueryEle=opts.jqueryEle,clickFn=opts.clickFn,data=opts.data,render=opts.render,
//默认选中项
selectId=opts.selectId;jqueryEle.html("");$('<div class="select-ipt">'+'<div class="select-tit select-click">'+'<span class="select-text">请选择</span>'+'<i class="drop-down"></i>'+"</div>"+'<div class="select-con select-option">'+'<ul class="select-ul clearfix"></ul>'+"</div>"+"</div>").appendTo(jqueryEle);var ul=jqueryEle.find(".select-ul");if(data&&data.length){var lis="";$.each(data,function(i,ele){lis+=render(i,ele)});$(lis).appendTo(ul)}var selectTit=jqueryEle.find(".select-click");//单击区域
var changeText=jqueryEle.find(".select-text");//改变文字
var selectShow=jqueryEle.find(".select-option");//点击选项
selectTit.click(function(event){event.stopPropagation();if(selectShow.is(":visible")){selectShow.slideUp()}else{selectShow.slideDown()}});$(document).click(function(event){if(!selectShow.is(event.target)&&selectShow.has(event.target).length===0){if(selectShow.is(":visible")){selectShow.slideUp()}}});selectShow.find("li").click(function(){fillData($(this).attr("data-id"),data);/*changeText.html($(this).find('span').html()).css("color","#000")
                .attr('data-id',$(this).attr('data-id'));*/
selectShow.slideToggle();clickFn&&clickFn.call(this,{changeText:changeText,isSelected:changeText.text()=="请选择"?false:true})});if(typeof selectId!="undefined"&&selectId!=""&&selectId!=null){fillData(selectId,data)}
//填充数据
function fillData(id,data){var match=null;$.each(data,function(i,ele){if(ele.id==id){match=ele}});var text=match.name;changeText.html(text).css("color","#000").attr("data-id",id)}}/**
 * Created by xiaofengyun on 2016/8/3.
 */
function showBigImage(options){$('<div class="preview-shade"></div>'+'<div class="preview-pop">'+'<div class="closed"></div>'+'<div class="pic-wrap">'+"</div>"+'<div class="btns">'+'<a href="javascript:;" class="pre-btn"></a>'+'<a href="javascript:;" class="next-btn"></a>'+"</div>"+"</div>").appendTo($("body"));var ele=options.jqueryEle;var previewShade=$(".preview-shade");//背景蒙层
var previewPop=$(".preview-pop");//内容区域
var preBtn=$(".pre-btn");//前一张
var nextBtn=$(".next-btn");//下一张
var index;//获取图片索引
var src;//获取要展示得图片
var imgTotal;//总得图片张数
var imgBoxW;//获取图片盒子的原始宽度
var imgBoxH;//获取图片盒子的原始高度
var that;ele.on("click","img",function(){that=$(this).parent();imgTotal=that.children("img").length-1;previewShade.show();previewPop.show();index=$(this).index();show(that);if(imgTotal>1){$(".btns").show()}else{$(".btns").hide()}});
//前一张
preBtn.click(function(){index--;if(index<0){index=imgTotal}show(that)});
//下一张
nextBtn.click(function(){index++;if(index>imgTotal){index=0}show(that)});$(".closed").click(function(){previewShade.hide();previewPop.hide()});
//图片展示
function show(that){src=that.find("img").eq(index).attr("src");$(".pic-wrap").html("<img src="+src+">");getWH($(".preview-pop"))}
//获取图片盒子的容器
function getWH(obj){imgBoxW=obj.width();imgBoxH=obj.height();obj.css({marginLeft:-imgBoxW/2,marginTop:-imgBoxH/2})}}/*!
 * jQuery Validation Plugin v1.13.1
 *
 * http://jqueryvalidation.org/
 *
 * Copyright (c) 2014 Jรถrn Zaefferer
 * Released under the MIT license
 */
(function(factory){if(typeof define==="function"&&define.amd){define(["jquery"],factory)}else{factory(jQuery)}})(function($){$.extend($.fn,{
// http://jqueryvalidation.org/validate/
validate:function(options){
// if nothing is selected, return nothing; can't chain anyway
if(!this.length){if(options&&options.debug&&window.console){console.warn("Nothing selected, can't validate, returning nothing.")}return}
// check if a validator for this form was already created
var validator=$.data(this[0],"validator");if(validator){return validator}
// Add novalidate tag if HTML5.
this.attr("novalidate","novalidate");validator=new $.validator(options,this[0]);$.data(this[0],"validator",validator);if(validator.settings.onsubmit){this.validateDelegate(":submit","click",function(event){if(validator.settings.submitHandler){validator.submitButton=event.target}
// allow suppressing validation by adding a cancel class to the submit button
if($(event.target).hasClass("cancel")){validator.cancelSubmit=true}
// allow suppressing validation by adding the html5 formnovalidate attribute to the submit button
if($(event.target).attr("formnovalidate")!==undefined){validator.cancelSubmit=true}});
// validate the form on submit
this.submit(function(event){if(validator.settings.debug){
// prevent form submit to be able to see console output
event.preventDefault()}function handle(){var hidden,result;if(validator.settings.submitHandler){if(validator.submitButton){
// insert a hidden input as a replacement for the missing submit button
hidden=$("<input type='hidden'/>").attr("name",validator.submitButton.name).val($(validator.submitButton).val()).appendTo(validator.currentForm)}result=validator.settings.submitHandler.call(validator,validator.currentForm,event);if(validator.submitButton){
// and clean up afterwards; thanks to no-block-scope, hidden can be referenced
hidden.remove()}if(result!==undefined){return result}return false}return true}
// prevent submit for invalid forms or custom submit handlers
if(validator.cancelSubmit){validator.cancelSubmit=false;return handle()}if(validator.form()){if(validator.pendingRequest){validator.formSubmitted=true;return false}return handle()}else{validator.focusInvalid();return false}})}return validator},
// http://jqueryvalidation.org/valid/
valid:function(){var valid,validator;if($(this[0]).is("form")){validator=this.validate();valid=validator.form()}else{valid=true;validator=$(this[0].form).validate();this.each(function(){valid=validator.element(this)&&valid})}return valid},
// attributes: space separated list of attributes to retrieve and remove
removeAttrs:function(attributes){var result={},$element=this;$.each(attributes.split(/\s/),function(index,value){result[value]=$element.attr(value);$element.removeAttr(value)});return result},
// http://jqueryvalidation.org/rules/
rules:function(command,argument){var element=this[0],settings,staticRules,existingRules,data,param,filtered;if(command){settings=$.data(element.form,"validator").settings;staticRules=settings.rules;existingRules=$.validator.staticRules(element);switch(command){case"add":$.extend(existingRules,$.validator.normalizeRule(argument));
// remove messages from rules, but allow them to be set separately
delete existingRules.messages;staticRules[element.name]=existingRules;if(argument.messages){settings.messages[element.name]=$.extend(settings.messages[element.name],argument.messages)}break;case"remove":if(!argument){delete staticRules[element.name];return existingRules}filtered={};$.each(argument.split(/\s/),function(index,method){filtered[method]=existingRules[method];delete existingRules[method];if(method==="required"){$(element).removeAttr("aria-required")}});return filtered}}data=$.validator.normalizeRules($.extend({},$.validator.classRules(element),$.validator.attributeRules(element),$.validator.dataRules(element),$.validator.staticRules(element)),element);
// make sure required is at front
if(data.required){param=data.required;delete data.required;data=$.extend({required:param},data);$(element).attr("aria-required","true")}
// make sure remote is at back
if(data.remote){param=data.remote;delete data.remote;data=$.extend(data,{remote:param})}return data}});
// Custom selectors
$.extend($.expr[":"],{
// http://jqueryvalidation.org/blank-selector/
blank:function(a){return!$.trim(""+$(a).val())},
// http://jqueryvalidation.org/filled-selector/
filled:function(a){return!!$.trim(""+$(a).val())},
// http://jqueryvalidation.org/unchecked-selector/
unchecked:function(a){return!$(a).prop("checked")}});
// constructor for validator
$.validator=function(options,form){this.settings=$.extend(true,{},$.validator.defaults,options);this.currentForm=form;this.init()};
// http://jqueryvalidation.org/jQuery.validator.format/
$.validator.format=function(source,params){if(arguments.length===1){return function(){var args=$.makeArray(arguments);args.unshift(source);return $.validator.format.apply(this,args)}}if(arguments.length>2&&params.constructor!==Array){params=$.makeArray(arguments).slice(1)}if(params.constructor!==Array){params=[params]}$.each(params,function(i,n){source=source.replace(new RegExp("\\{"+i+"\\}","g"),function(){return n})});return source};$.extend($.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",validClass:"valid",errorElement:"label",focusCleanup:false,focusInvalid:true,errorContainer:$([]),errorLabelContainer:$([]),onsubmit:true,ignore:":hidden",ignoreTitle:false,onfocusin:function(element){this.lastActive=element;
// Hide error label and remove error class on focus if enabled
if(this.settings.focusCleanup){if(this.settings.unhighlight){this.settings.unhighlight.call(this,element,this.settings.errorClass,this.settings.validClass)}this.hideThese(this.errorsFor(element))}},onfocusout:function(element){if(!this.checkable(element)&&(element.name in this.submitted||!this.optional(element))){this.element(element)}},onkeyup:function(element,event){if(event.which===9&&this.elementValue(element)===""){return}else if(element.name in this.submitted||element===this.lastElement){if($(element).is(":text")){return false}this.element(element)}},onclick:function(element){
// click on selects, radiobuttons and checkboxes
if(element.name in this.submitted){this.element(element)}else if(element.parentNode.name in this.submitted){this.element(element.parentNode)}},highlight:function(element,errorClass,validClass){if(element.type==="radio"){this.findByName(element.name).addClass(errorClass).removeClass(validClass)}else{$(element).addClass(errorClass).removeClass(validClass)}},unhighlight:function(element,errorClass,validClass){if(element.type==="radio"){this.findByName(element.name).removeClass(errorClass).addClass(validClass)}else{$(element).removeClass(errorClass).addClass(validClass)}}},
// http://jqueryvalidation.org/jQuery.validator.setDefaults/
setDefaults:function(settings){$.extend($.validator.defaults,settings)},messages:{required:"This field is required.",remote:"Please fix this field.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date ( ISO ).",number:"Please enter a valid number.",digits:"Please enter only digits.",creditcard:"Please enter a valid credit card number.",equalTo:"Please enter the same value again.",maxlength:$.validator.format("您输入的文字已超过 {0} 个字符！"),minlength:$.validator.format("Please enter at least {0} characters."),rangelength:$.validator.format("Please enter a value between {0} and {1} characters long."),range:$.validator.format("Please enter a value between {0} and {1}."),max:$.validator.format("Please enter a value less than or equal to {0}."),min:$.validator.format("Please enter a value greater than or equal to {0}.")},autoCreateRanges:false,prototype:{init:function(){this.labelContainer=$(this.settings.errorLabelContainer);this.errorContext=this.labelContainer.length&&this.labelContainer||$(this.currentForm);this.containers=$(this.settings.errorContainer).add(this.settings.errorLabelContainer);this.submitted={};this.valueCache={};this.pendingRequest=0;this.pending={};this.invalid={};this.reset();var groups=this.groups={},rules;$.each(this.settings.groups,function(key,value){if(typeof value==="string"){value=value.split(/\s/)}$.each(value,function(index,name){groups[name]=key})});rules=this.settings.rules;$.each(rules,function(key,value){rules[key]=$.validator.normalizeRule(value)});function delegate(event){var validator=$.data(this[0].form,"validator"),eventType="on"+event.type.replace(/^validate/,""),settings=validator.settings;if(settings[eventType]&&!this.is(settings.ignore)){settings[eventType].call(validator,this[0],event)}}$(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, "+"[type='number'], [type='search'] ,[type='tel'], [type='url'], "+"[type='email'], [type='datetime'], [type='date'], [type='month'], "+"[type='week'], [type='time'], [type='datetime-local'], "+"[type='range'], [type='color'], [type='radio'], [type='checkbox']","focusin focusout keyup",delegate).validateDelegate("select, option, [type='radio'], [type='checkbox']","click",delegate);if(this.settings.invalidHandler){$(this.currentForm).bind("invalid-form.validate",this.settings.invalidHandler)}
// Add aria-required to any Static/Data/Class required fields before first validation
// Screen readers require this attribute to be present before the initial submission http://www.w3.org/TR/WCAG-TECHS/ARIA2.html
$(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required","true")},
// http://jqueryvalidation.org/Validator.form/
form:function(){this.checkForm();$.extend(this.submitted,this.errorMap);this.invalid=$.extend({},this.errorMap);if(!this.valid()){$(this.currentForm).triggerHandler("invalid-form",[this])}this.showErrors();return this.valid()},checkForm:function(){this.prepareForm();for(var i=0,elements=this.currentElements=this.elements();elements[i];i++){this.check(elements[i])}return this.valid()},
// http://jqueryvalidation.org/Validator.element/
element:function(element){var cleanElement=this.clean(element),checkElement=this.validationTargetFor(cleanElement),result=true;this.lastElement=checkElement;if(checkElement===undefined){delete this.invalid[cleanElement.name]}else{this.prepareElement(checkElement);this.currentElements=$(checkElement);result=this.check(checkElement)!==false;if(result){delete this.invalid[checkElement.name]}else{this.invalid[checkElement.name]=true}}
// Add aria-invalid status for screen readers
$(element).attr("aria-invalid",!result);if(!this.numberOfInvalids()){
// Hide error containers on last error
this.toHide=this.toHide.add(this.containers)}this.showErrors();return result},
// http://jqueryvalidation.org/Validator.showErrors/
showErrors:function(errors){if(errors){
// add items to error list and map
$.extend(this.errorMap,errors);this.errorList=[];for(var name in errors){this.errorList.push({message:errors[name],element:this.findByName(name)[0]})}
// remove items from success list
this.successList=$.grep(this.successList,function(element){return!(element.name in errors)})}if(this.settings.showErrors){this.settings.showErrors.call(this,this.errorMap,this.errorList)}else{this.defaultShowErrors()}},
// http://jqueryvalidation.org/Validator.resetForm/
resetForm:function(){if($.fn.resetForm){$(this.currentForm).resetForm()}this.submitted={};this.lastElement=null;this.prepareForm();this.hideErrors();this.elements().removeClass(this.settings.errorClass).removeData("previousValue").removeAttr("aria-invalid")},numberOfInvalids:function(){return this.objectLength(this.invalid)},objectLength:function(obj){/* jshint unused: false */
var count=0,i;for(i in obj){count++}return count},hideErrors:function(){this.hideThese(this.toHide)},hideThese:function(errors){errors.not(this.containers).text("");this.addWrapper(errors).hide()},valid:function(){return this.size()===0},size:function(){return this.errorList.length},focusInvalid:function(){if(this.settings.focusInvalid){try{$(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").focus().trigger("focusin")}catch(e){}}},findLastActive:function(){var lastActive=this.lastActive;return lastActive&&$.grep(this.errorList,function(n){return n.element.name===lastActive.name}).length===1&&lastActive},elements:function(){var validator=this,rulesCache={};
// select all valid inputs inside the form (no submit or reset buttons)
/*

                    //原始版本
                    return $(this.currentForm)
                        .find("input, select, textarea")
                        .not(":submit, :reset, :image, [disabled], [readonly]")
                        .not(this.settings.ignore)
                        .filter(function () {
                            if (!this.name && validator.settings.debug && window.console) {
                                console.error("%o has no name assigned", this);
                            }


                            // select only the first element for each name, and only those with rules specified
                            if (this.name in rulesCache || !validator.objectLength($(this).rules())) {
                                return false;
                            }

                            rulesCache[this.name] = true;
                            return true;
                        });*/
//改进版本  author chengRan   ,如有bug 希望继续改进
return $(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled], [readonly]").add($(this.currentForm).find("input, select, textarea").filter("[disabled],[readonly]").filter(this.settings.joinValid)).not(this.settings.ignore).filter(function(){if(!this.name&&validator.settings.debug&&window.console){console.error("%o has no name assigned",this)}
// select only the first element for each name, and only those with rules specified
if(this.name in rulesCache||!validator.objectLength($(this).rules())){return false}rulesCache[this.name]=true;return true})},clean:function(selector){return $(selector)[0]},errors:function(){var errorClass=this.settings.errorClass.split(" ").join(".");return $(this.settings.errorElement+"."+errorClass,this.errorContext)},reset:function(){this.successList=[];this.errorList=[];this.errorMap={};this.toShow=$([]);this.toHide=$([]);this.currentElements=$([])},prepareForm:function(){this.reset();this.toHide=this.errors().add(this.containers)},prepareElement:function(element){this.reset();this.toHide=this.errorsFor(element)},elementValue:function(element){var val,$element=$(element),type=element.type;if(type==="radio"||type==="checkbox"){return $("input[name='"+element.name+"']:checked").val()}else if(type==="number"&&typeof element.validity!=="undefined"){return element.validity.badInput?false:$element.val()}val=$element.val();if(typeof val==="string"){return val.replace(/\r/g,"")}return val},check:function(element){element=this.validationTargetFor(this.clean(element));var rules=$(element).rules(),rulesCount=$.map(rules,function(n,i){return i}).length,dependencyMismatch=false,val=this.elementValue(element),result,method,rule;for(method in rules){rule={method:method,parameters:rules[method]};try{
//if ($.validator.methods[method])
result=$.validator.methods[method].call(this,val,element,rule.parameters);
// if a method indicates that the field is optional and therefore valid,
// don't mark it as valid when there are no other rules
if(result==="dependency-mismatch"&&rulesCount===1){dependencyMismatch=true;continue}dependencyMismatch=false;if(result==="pending"){this.toHide=this.toHide.not(this.errorsFor(element));return}if(!result){this.formatAndAdd(element,rule);return false}}catch(e){if(this.settings.debug&&window.console){console.log("Exception occurred when checking element "+element.id+", check the '"+rule.method+"' method.",e)}throw e}}if(dependencyMismatch){return}if(this.objectLength(rules)){this.successList.push(element)}return true},
// return the custom message for the given element and validation method
// specified in the element's HTML5 data attribute
// return the generic message if present and no method specific message is present
customDataMessage:function(element,method){return $(element).data("msg"+method.charAt(0).toUpperCase()+method.substring(1).toLowerCase())||$(element).data("msg")},
// return the custom message for the given element name and validation method
customMessage:function(name,method){var m=this.settings.messages[name];return m&&(m.constructor===String?m:m[method])},
// return the first defined argument, allowing empty strings
findDefined:function(){for(var i=0;i<arguments.length;i++){if(arguments[i]!==undefined){return arguments[i]}}return undefined},defaultMessage:function(element,method){
// title is never undefined, so handle empty string as undefined
return this.findDefined(this.customMessage(element.name,method),this.customDataMessage(element,method),!this.settings.ignoreTitle&&element.title||undefined,$.validator.messages[method],"<strong>Warning: No message defined for "+element.name+"</strong>")},formatAndAdd:function(element,rule){var message=this.defaultMessage(element,rule.method),theregex=/\$?\{(\d+)\}/g;if(typeof message==="function"){message=message.call(this,rule.parameters,element)}else if(theregex.test(message)){message=$.validator.format(message.replace(theregex,"{$1}"),rule.parameters)}this.errorList.push({message:message,element:element,method:rule.method});this.errorMap[element.name]=message;this.submitted[element.name]=message},addWrapper:function(toToggle){if(this.settings.wrapper){toToggle=toToggle.add(toToggle.parent(this.settings.wrapper))}return toToggle},defaultShowErrors:function(){var i,elements,error;for(i=0;this.errorList[i];i++){error=this.errorList[i];if(this.settings.highlight){this.settings.highlight.call(this,error.element,this.settings.errorClass,this.settings.validClass)}this.showLabel(error.element,error.message)}if(this.errorList.length){this.toShow=this.toShow.add(this.containers)}if(this.settings.success){for(i=0;this.successList[i];i++){this.showLabel(this.successList[i])}}if(this.settings.unhighlight){for(i=0,elements=this.validElements();elements[i];i++){this.settings.unhighlight.call(this,elements[i],this.settings.errorClass,this.settings.validClass)}}this.toHide=this.toHide.not(this.toShow);this.hideErrors();this.addWrapper(this.toShow).show()},validElements:function(){return this.currentElements.not(this.invalidElements())},invalidElements:function(){return $(this.errorList).map(function(){return this.element})},showLabel:function(element,message){var place,group,errorID,error=this.errorsFor(element),elementID=this.idOrName(element),describedBy=$(element).attr("aria-describedby");if(error.length){
// refresh error/success class
error.removeClass(this.settings.validClass).addClass(this.settings.errorClass);
// replace message on existing label
error.html(message)}else{
// create error element
error=$("<"+this.settings.errorElement+">").attr("id",elementID+"-error").addClass(this.settings.errorClass).html(message||"");
// Maintain reference to the element to be placed into the DOM
place=error;if(this.settings.wrapper){
// make sure the element is visible, even in IE
// actually showing the wrapped element is handled elsewhere
place=error.hide().show().wrap("<"+this.settings.wrapper+"/>").parent()}if(this.labelContainer.length){this.labelContainer.append(place)}else if(this.settings.errorPlacement){this.settings.errorPlacement(place,$(element))}else{place.insertAfter(element)}
// Link error back to the element
if(error.is("label")){
// If the error is a label, then associate using 'for'
error.attr("for",elementID)}else if(error.parents("label[for='"+elementID+"']").length===0){
// If the element is not a child of an associated label, then it's necessary
// to explicitly apply aria-describedby
errorID=error.attr("id").replace(/(:|\.|\[|\])/g,"\\$1");
// Respect existing non-error aria-describedby
if(!describedBy){describedBy=errorID}else if(!describedBy.match(new RegExp("\\b"+errorID+"\\b"))){
// Add to end of list if not already present
describedBy+=" "+errorID}$(element).attr("aria-describedby",describedBy);
// If this element is grouped, then assign to all elements in the same group
group=this.groups[element.name];if(group){$.each(this.groups,function(name,testgroup){if(testgroup===group){$("[name='"+name+"']",this.currentForm).attr("aria-describedby",error.attr("id"))}})}}}if(!message&&this.settings.success){error.text("");/*ไธดๆถไฟฎๆน๏ผไธป่ฆ้ๅฏน้กต้ขไธญๆ�ก้ชๆทปๅ�successๅ้่ฏฏๆ�่ฎฐ๏ผไธๆถๅคฑ็้ฎ้ขs*/
error.remove();if(typeof this.settings.success==="string"){error.addClass(this.settings.success)}else{this.settings.success(error,element)}}this.toShow=this.toShow.add(error)},errorsFor:function(element){var name=this.idOrName(element),describer=$(element).attr("aria-describedby"),selector="label[for='"+name+"'], label[for='"+name+"'] *";
// aria-describedby should directly reference the error element
if(describer){selector=selector+", #"+describer.replace(/\s+/g,", #")}return this.errors().filter(selector)},idOrName:function(element){return this.groups[element.name]||(this.checkable(element)?element.name:element.id||element.name)},validationTargetFor:function(element){
// If radio/checkbox, validate first element in group instead
if(this.checkable(element)){element=this.findByName(element.name)}
// Always apply ignore filter
return $(element).not(this.settings.ignore)[0]},checkable:function(element){return/radio|checkbox/i.test(element.type)},findByName:function(name){return $(this.currentForm).find("[name='"+name+"']")},getLength:function(value,element){switch(element.nodeName.toLowerCase()){case"select":return $("option:selected",element).length;case"input":if(this.checkable(element)){return this.findByName(element.name).filter(":checked").length}}return value.length},depend:function(param,element){return this.dependTypes[typeof param]?this.dependTypes[typeof param](param,element):true},dependTypes:{"boolean":function(param){return param},string:function(param,element){return!!$(param,element.form).length},"function":function(param,element){return param(element)}},optional:function(element){var val=this.elementValue(element);return!$.validator.methods.required.call(this,val,element)&&"dependency-mismatch"},startRequest:function(element){if(!this.pending[element.name]){this.pendingRequest++;this.pending[element.name]=true}},stopRequest:function(element,valid){this.pendingRequest--;
// sometimes synchronization fails, make sure pendingRequest is never < 0
if(this.pendingRequest<0){this.pendingRequest=0}delete this.pending[element.name];if(valid&&this.pendingRequest===0&&this.formSubmitted&&this.form()){$(this.currentForm).submit();this.formSubmitted=false}else if(!valid&&this.pendingRequest===0&&this.formSubmitted){$(this.currentForm).triggerHandler("invalid-form",[this]);this.formSubmitted=false}},previousValue:function(element){return $.data(element,"previousValue")||$.data(element,"previousValue",{old:null,valid:true,message:this.defaultMessage(element,"remote")})}},classRuleSettings:{required:{required:true},email:{email:true},url:{url:true},date:{date:true},dateISO:{dateISO:true},number:{number:true},digits:{digits:true},creditcard:{creditcard:true}},addClassRules:function(className,rules){if(className.constructor===String){this.classRuleSettings[className]=rules}else{$.extend(this.classRuleSettings,className)}},classRules:function(element){var rules={},classes=$(element).attr("class");if(classes){$.each(classes.split(" "),function(){if(this in $.validator.classRuleSettings){$.extend(rules,$.validator.classRuleSettings[this])}})}return rules},attributeRules:function(element){var rules={},$element=$(element),type=element.getAttribute("type"),method,value;for(method in $.validator.methods){
// support for <input required> in both html5 and older browsers
if(method==="required"){value=element.getAttribute(method);
// Some browsers return an empty string for the required attribute
// and non-HTML5 browsers might have required="" markup
if(value===""){value=true}
// force non-HTML5 browsers to return bool
value=!!value}else{value=$element.attr(method)}
// convert the value to a number for number inputs, and for text for backwards compability
// allows type="date" and others to be compared as strings
if(/min|max/.test(method)&&(type===null||/number|range|text/.test(type))){value=Number(value)}if(value||value===0){rules[method]=value}else if(type===method&&type!=="range"){
// exception: the jquery validate 'range' method
// does not test for the html5 'range' type
rules[method]=true}}
// maxlength may be returned as -1, 2147483647 ( IE ) and 524288 ( safari ) for text inputs
if(rules.maxlength&&/-1|2147483647|524288/.test(rules.maxlength)){delete rules.maxlength}return rules},dataRules:function(element){var method,value,rules={},$element=$(element);for(method in $.validator.methods){value=$element.data("rule"+method.charAt(0).toUpperCase()+method.substring(1).toLowerCase());if(value!==undefined){rules[method]=value}}return rules},staticRules:function(element){var rules={},validator=$.data(element.form,"validator");if(validator.settings.rules){rules=$.validator.normalizeRule(validator.settings.rules[element.name])||{}}return rules},normalizeRules:function(rules,element){
// handle dependency check
$.each(rules,function(prop,val){
// ignore rule when param is explicitly false, eg. required:false
if(val===false){delete rules[prop];return}if(val.param||val.depends){var keepRule=true;switch(typeof val.depends){case"string":keepRule=!!$(val.depends,element.form).length;break;case"function":keepRule=val.depends.call(element,element);break}if(keepRule){rules[prop]=val.param!==undefined?val.param:true}else{delete rules[prop]}}});
// evaluate parameters
$.each(rules,function(rule,parameter){rules[rule]=$.isFunction(parameter)?parameter(element):parameter});
// clean number parameters
$.each(["minlength","maxlength"],function(){if(rules[this]){rules[this]=Number(rules[this])}});$.each(["rangelength","range"],function(){var parts;if(rules[this]){if($.isArray(rules[this])){rules[this]=[Number(rules[this][0]),Number(rules[this][1])]}else if(typeof rules[this]==="string"){parts=rules[this].replace(/[\[\]]/g,"").split(/[\s,]+/);rules[this]=[Number(parts[0]),Number(parts[1])]}}});if($.validator.autoCreateRanges){
// auto-create ranges
if(rules.min!=null&&rules.max!=null){rules.range=[rules.min,rules.max];delete rules.min;delete rules.max}if(rules.minlength!=null&&rules.maxlength!=null){rules.rangelength=[rules.minlength,rules.maxlength];delete rules.minlength;delete rules.maxlength}}return rules},
// Converts a simple string to a {string: true} rule, e.g., "required" to {required:true}
normalizeRule:function(data){if(typeof data==="string"){var transformed={};$.each(data.split(/\s/),function(){transformed[this]=true});data=transformed}return data},
// http://jqueryvalidation.org/jQuery.validator.addMethod/
addMethod:function(name,method,message){$.validator.methods[name]=method;$.validator.messages[name]=message!==undefined?message:$.validator.messages[name];if(method.length<3){$.validator.addClassRules(name,$.validator.normalizeRule(name))}},methods:{
// http://jqueryvalidation.org/required-method/
required:function(value,element,param){
// check if dependency is met
if(!this.depend(param,element)){return"dependency-mismatch"}if(element.nodeName.toLowerCase()==="select"){
// could be an array for select-multiple or a string, both are fine this way
var val=$(element).val();return val&&val.length>0}if(this.checkable(element)){return this.getLength(value,element)>0}return $.trim(value).length>0},
// http://jqueryvalidation.org/email-method/
email:function(value,element){
// From http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#e-mail-state-%28type=email%29
// Retrieved 2014-01-14
// If you have a problem with this implementation, report a bug against the above spec
// Or use custom methods to implement your own email validation
return this.optional(element)||/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value)},
// http://jqueryvalidation.org/url-method/
url:function(value,element){
// contributed by Scott Gonzalez: http://projects.scottsplayground.com/iri/
return this.optional(element)||/^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value)},
// http://jqueryvalidation.org/date-method/
date:function(value,element){
// ๆญฃๅๅน้ๅผๅฎนie7
return this.optional(element)||!/Invalid|NaN/.test(new Date(value).toString())||/^((\d{2}(([02468][048])|([13579][26]))[\-\/\s]?((((0?[13578])|(1[02]))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\-\/\s]?((0?[1-9])|([1-2][0-9])))))|(\d{2}(([02468][1235679])|([13579][01345789]))[\-\/\s]?((((0?[13578])|(1[02]))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\-\/\s]?((0?[1-9])|(1[0-9])|(2[0-8]))))))(\s(((0?[0-9])|([1-2][0-3]))\:([0-5]?[0-9])((\s)|(\:([0-5]?[0-9])))))?$/.test(value)},
// http://jqueryvalidation.org/dateISO-method/
dateISO:function(value,element){return this.optional(element)||/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value)},
// http://jqueryvalidation.org/number-method/
number:function(value,element){return this.optional(element)||/^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value)},
// http://jqueryvalidation.org/digits-method/
digits:function(value,element){return this.optional(element)||/^\d+$/.test(value)},
// http://jqueryvalidation.org/creditcard-method/
// based on http://en.wikipedia.org/wiki/Luhn/
creditcard:function(value,element){if(this.optional(element)){return"dependency-mismatch"}
// accept only spaces, digits and dashes
if(/[^0-9 \-]+/.test(value)){return false}var nCheck=0,nDigit=0,bEven=false,n,cDigit;value=value.replace(/\D/g,"");
// Basing min and max length on
// http://developer.ean.com/general_info/Valid_Credit_Card_Types
if(value.length<13||value.length>19){return false}for(n=value.length-1;n>=0;n--){cDigit=value.charAt(n);nDigit=parseInt(cDigit,10);if(bEven){if((nDigit*=2)>9){nDigit-=9}}nCheck+=nDigit;bEven=!bEven}return nCheck%10===0},
// http://jqueryvalidation.org/minlength-method/
minlength:function(value,element,param){var length=$.isArray(value)?value.length:this.getLength(value,element);return this.optional(element)||length>=param},
// http://jqueryvalidation.org/maxlength-method/
maxlength:function(value,element,param){var length=$.isArray(value)?value.length:this.getLength(value,element);return this.optional(element)||length<=param},
// http://jqueryvalidation.org/rangelength-method/
rangelength:function(value,element,param){var length=$.isArray(value)?value.length:this.getLength(value,element);return this.optional(element)||length>=param[0]&&length<=param[1]},
// http://jqueryvalidation.org/min-method/
min:function(value,element,param){return this.optional(element)||value>=param},
// http://jqueryvalidation.org/max-method/
max:function(value,element,param){return this.optional(element)||value<=param},
// http://jqueryvalidation.org/range-method/
range:function(value,element,param){return this.optional(element)||value>=param[0]&&value<=param[1]},
// http://jqueryvalidation.org/equalTo-method/
equalTo:function(value,element,param){
// bind to the blur event of the target in order to revalidate whenever the target field is updated
// TODO find a way to bind the event just once, avoiding the unbind-rebind overhead
var target=$(param);if(this.settings.onfocusout){target.unbind(".validate-equalTo").bind("blur.validate-equalTo",function(){$(element).valid()})}return value===target.val()},
// http://jqueryvalidation.org/remote-method/
remote:function(value,element,param){if(this.optional(element)){return"dependency-mismatch"}var previous=this.previousValue(element),validator,data;if(!this.settings.messages[element.name]){this.settings.messages[element.name]={}}previous.originalMessage=this.settings.messages[element.name].remote;this.settings.messages[element.name].remote=previous.message;param=typeof param==="string"&&{url:param}||param;if(previous.old===value){return previous.valid}previous.old=value;validator=this;this.startRequest(element);data={};data[element.name]=value;$.ajax($.extend(true,{url:param,mode:"abort",port:"validate"+element.name,dataType:"json",data:data,context:validator.currentForm,success:function(response){var valid=response===true||response==="true",errors,message,submitted;validator.settings.messages[element.name].remote=previous.originalMessage;if(valid){submitted=validator.formSubmitted;validator.prepareElement(element);validator.formSubmitted=submitted;validator.successList.push(element);delete validator.invalid[element.name];validator.showErrors()}else{errors={};message=response||validator.defaultMessage(element,"remote");errors[element.name]=previous.message=$.isFunction(message)?message(value):message;validator.invalid[element.name]=true;validator.showErrors(errors)}previous.valid=valid;validator.stopRequest(element,valid)}},param));return"pending"}}});$.format=function deprecated(){throw"$.format has been deprecated. Please use $.validator.format instead."};
// ajax mode: abort
// usage: $.ajax({ mode: "abort"[, port: "uniqueport"]});
// if mode:"abort" is used, the previous request on that port (port can be undefined) is aborted via XMLHttpRequest.abort()
var pendingRequests={},ajax;
// Use a prefilter if available (1.5+)
if($.ajaxPrefilter){$.ajaxPrefilter(function(settings,_,xhr){var port=settings.port;if(settings.mode==="abort"){if(pendingRequests[port]){pendingRequests[port].abort()}pendingRequests[port]=xhr}})}else{
// Proxy ajax
ajax=$.ajax;$.ajax=function(settings){var mode=("mode"in settings?settings:$.ajaxSettings).mode,port=("port"in settings?settings:$.ajaxSettings).port;if(mode==="abort"){if(pendingRequests[port]){pendingRequests[port].abort()}pendingRequests[port]=ajax.apply(this,arguments);return pendingRequests[port]}return ajax.apply(this,arguments)}}
// provides delegate(type: String, delegate: Selector, handler: Callback) plugin for easier event delegation
// handler is only called when $(event.target).is(delegate), in the scope of the jquery-object for event.target
$.extend($.fn,{validateDelegate:function(delegate,type,handler){return this.bind(type,function(event){var target=$(event.target);if(target.is(delegate)){return handler.apply(target,arguments)}})}})});var Validator=function(){$.extend($.validator.messages,{required:"* 此项为必填项～",minlength:$.validator.format("* 最少输入 {0} 个字符～")});var valiRules={required:{paras:true,messages:function(){return"* 此项为必填项～"}},isIntGt0:{paras:true,messages:function(){return"* 请输入大于0的整数～"},reg:function(value,element){value=$.trim(value);return this.optional(element)||/^\d+$/.test(value)&&value>0}},isIntGt500:{paras:true,messages:function(){return"* 请输入不小于500的整数～"},reg:function(value,element){value=$.trim(value);return this.optional(element)||/^\d+$/.test(value)&&(value>=500&&value<=99999999)}},"isIntGt10-59":{paras:true,messages:function(){return"* 请输入10-59之间的整数～"},reg:function(value,element){return this.optional(element)||/^\d+$/.test(value)&&(value>=10&&value<=59)}},isIDCard:{paras:true,messages:function(){return"* 请输入正确的身份证号码～"},reg:function(value,element){return this.optional(element)||/^(\d{18,18}|\d{15,15}|\d{17,17}[xX])$/.test(value)}},"isIntGt1-99999999":{paras:true,messages:function(){return"* 请输入大于0的整数～"},reg:function(value,element){return this.optional(element)||/^\d+$/.test(value)&&(value<=99999999&&value>0)}}};$.each(valiRules,function(ruleName,ruleConfig){if(ruleConfig.reg){$.validator.addMethod(ruleName,function(value,element){return ruleConfig.reg.call(this,value,element)})}});
//扩展功能
var extendFn={scan:function(oContext){var validator=this;/*//过滤掉html注释
             sHtml = oContext.html().replace(/<!--[\w\W\r\n]*?-->/gmi, '');
             //提前预览 验证规则
             usingRules = sHtml.match(/vali-[\w\d]+/g);
             //除掉重复rules
             usingRules = unique(usingRules);

             */
$.each(valiRules,function(ruleName,usingRule){if(valiRules.hasOwnProperty(ruleName)){var ruleConfig=valiRules[ruleName];
//添加或删除rules
validator.addOrRemoveRules(ruleName,ruleConfig)}else{console.error("验证插件中没有配置"+ruleName+"此验证项")}})},
//添加或删除rules
addOrRemoveRules:function(ruleName,ruleConfig){var validator=this;var name=ruleName;var paras=ruleConfig.paras;var messages=ruleConfig.messages();var valiEles=$(validator.currentForm).find("[class*="+"vali-yes"+"]");valiEles.each(function(){var that_ele=$(this);
//未加过,有class，   添加规则
if(!(that_ele.data("valiCache")&&that_ele.data("valiCache")[name])&&that_ele.hasClass("vali-"+name)){var ruleObj={};ruleObj[name]=paras;ruleObj.messages={};ruleObj.messages[name]=messages;that_ele.rules("add",ruleObj);if(!that_ele.data("valiCache")){that_ele.data("valiCache",{})}that_ele.data("valiCache")[name]=true}else if(that_ele.data("valiCache")&&that_ele.data("valiCache")[name]&&!that_ele.hasClass("vali-"+name)){that_ele.rules("remove",name);delete that_ele.data("valiCache")[name];if($.isEmptyObject(that_ele.data("valiCache"))){that_ele.data("valiCache",undefined)}}})},
//验证特殊元素  ，如select ,  图片
valiSpecail:function(opts){var validator=this;
//验证通过的条件
var isYes=opts.isYes();var jqueryInputElement=opts.jqueryInputElement;if(isYes){jqueryInputElement.val(1);validator.element(jqueryInputElement)}else{jqueryInputElement.val("");validator.element(jqueryInputElement)}}};var Validator={
//cache: {},
init:function(opts){var that=this;var where=opts.where;var validator=where.validate({focusCleanup:true,ignore:":hidden ,.ignore",joinValid:".vali-join",errorClass:"validateErrorTip",errorPlacement:function(error,element){var validateErrorTipWrap=element.closest(".vali-item").find(".vali-error");error.appendTo(validateErrorTipWrap)},onfocusout:function(element){$(element).valid()}});
//继承
$.extend(validator,extendFn);return validator}};return Validator}();
//# sourceURL=validata.js
/**

 @Name: layer拓展类，依赖于layer
 @Date: 2014.08.13
 @Author: 贤心
 @Versions：1.8.5-ext
 @Api：http://sentsin.com/jquery/layer
 @Desc: 本拓展会持续更新

 */
/*layer.use("skin/layer.ext.css", function () {
    layer.ext && layer.ext()
}), */
layer.prompt=function(a,b,c){var d={},a=a||{},e={area:["auto","auto"],offset:[a.top||"",""],title:a.title||"信息",dialog:{btns:2,type:-1,msg:'<input type="'+function(){return 1===a.type?"password":2===a.type?"file":"text"}()+'" class="xubox_prompt xubox_form" id="xubox_prompt" value="'+(a.val||"")+'" />',yes:function(c){var e=d.prompt.val();""===e?d.prompt.focus():e.replace(/\s/g,"").length>(a.length||1e3)?layer.tips("最多输入"+(a.length||1e3)+"个字数","#xubox_prompt",2):b&&b(e,c,d.prompt)},no:c},success:function(){d.prompt=$("#xubox_prompt"),d.prompt.focus()}};return 3===a.type&&(e.dialog.msg='<textarea class="xubox_prompt xubox_form xubox_formArea" id="xubox_prompt">'+(a.val||"")+"</textarea>"),$.layer(e)},layer.tab=function(a){var a=a||{},c=a.data||[],d={type:1,border:[0],area:["auto","auto"],bgcolor:"",title:!1,shade:a.shade,offset:a.offset,move:".xubox_tabmove",closeBtn:!1,page:{html:'<div class="xubox_tab" style="'+function(){return a.area=a.area||[],"width:"+(a.area[0]||"500px")+"; height:"+(a.area[1]||"300px")+'">'}()+'<span class="xubox_tabmove"></span>'+'<div class="xubox_tabtit">'+function(){var a=c.length,b=1,d="";if(a>0)for(d='<span class="xubox_tabnow">'+c[0].title+"</span>";a>b;b++)d+="<span>"+c[b].title+"</span>";return d}()+"</div>"+'<ul class="xubox_tab_main">'+function(){var a=c.length,b=1,d="";if(a>0)for(d='<li class="xubox_tabli xubox_tab_layer">'+(c[0].content||"content未传入")+"</li>";a>b;b++)d+='<li class="xubox_tabli">'+(c[b].content||"content未传入")+"</li>";return d}()+"</ul>"+'<span class="xubox_tabclose" title="关闭">X</span>'+"</div>"},success:function(a){var b=$(".xubox_tabtit").children(),c=$(".xubox_tab_main").children(),d=$(".xubox_tabclose");b.on("click",function(){var a=$(this),b=a.index();a.addClass("xubox_tabnow").siblings().removeClass("xubox_tabnow"),c.eq(b).show().siblings().hide()}),d.on("click",function(){layer.close(a.attr("times"))})}};return $.layer(d)},layer.photos=function(a){var b,c,d,e,f,g,h,i;if(a=a||{},b={imgIndex:1,end:null,html:$("html")},c=$(window),d=a.json,e=a.page,d){if(f=d.data,1!==d.status)return layer.msg("未请求到数据",2,8),void 0;if(b.imgLen=f.length,!(f.length>0))return layer.msg("没有任何图片",2,8),void 0;b.thissrc=f[d.start].src,b.pid=f[d.start].pid,b.imgsname=d.title||"",b.name=f[d.start].name,b.imgIndex=d.start+1}else g=$(e.parent).find("img"),h=g.eq(e.start),b.thissrc=h.attr("layer-img")||h.attr("src"),b.pid=h.attr("pid"),b.imgLen=g.length,b.imgsname=e.title||"",b.name=h.attr("alt"),b.imgIndex=e.start+1;return i={type:1,border:[0],area:[(a.html?915:600)+"px","auto"],title:!1,shade:[.9,"#000",!0],shadeClose:!0,offset:["25px",""],bgcolor:"",page:{html:'<div class="xubox_bigimg"><img src="'+b.thissrc+'" alt="'+(b.name||"")+'" layer-pid="'+(b.pid||"")+'"><div class="xubox_imgsee">'+function(){return b.imgLen>1?'<a href="" class="xubox_iconext xubox_prev"></a><a href="" class="xubox_iconext xubox_next"></a>':""}()+'<div class="xubox_imgbar"><span class="xubox_imgtit"><a href="javascript:;">'+b.imgsname+" </a><em>"+b.imgIndex+"/"+b.imgLen+"</em></span></div></div></div>"+function(){return a.html?'<div class="xubox_intro">'+a.html+"</div>":""}()},success:function(a){b.bigimg=a.find(".xubox_bigimg"),b.imgsee=b.bigimg.find(".xubox_imgsee"),b.imgbar=b.imgsee.find(".xubox_imgbar"),b.imgtit=b.imgbar.find(".xubox_imgtit"),b.layero=a;var c=b.imgs=b.bigimg.find("img");clearTimeout(b.timerr),b.timerr=setTimeout(function(){$("html").css("overflow","hidden").attr("layer-full",b.index)},10),c.load(function(){b.imgarea=[c.outerWidth(),c.outerHeight()],b.resize(a)}),b.event()},end:function(){layer.closeAll(),b.end=!0}},b.event=function(){b.bigimg.hover(function(){b.imgsee.show()},function(){b.imgsee.hide()}),i.imgprev=function(){b.imgIndex--,b.imgIndex<1&&(b.imgIndex=b.imgLen),b.tabimg()},b.bigimg.find(".xubox_prev").on("click",function(a){a.preventDefault(),i.imgprev()}),i.imgnext=function(){b.imgIndex++,b.imgIndex>b.imgLen&&(b.imgIndex=1),b.tabimg()},b.bigimg.find(".xubox_next").on("click",function(a){a.preventDefault(),i.imgnext()}),$(document).keyup(function(a){if(!b.end){var c=a.keyCode;a.preventDefault(),37===c?i.imgprev():39===c?i.imgnext():27===c&&layer.close(b.index)}}),b.tabimg=function(){var e,h,i,j,k;b.imgs.removeAttr("style"),d?(j=f[b.imgIndex-1],e=j.src,h=j.pid,i=j.name):(k=g.eq(b.imgIndex-1),e=k.attr("layer-img")||k.attr("src"),h=k.attr("layer-pid")||"",i=k.attr("alt")||""),b.imgs.attr({src:e,"layer-pid":h,alt:i}),b.imgtit.find("em").text(b.imgIndex+"/"+b.imgLen),b.imgsee.show(),a.tab&&a.tab({pid:h,name:i})}},b.resize=function(d){var g,e={},f=[c.width(),c.height()];e.limit=f[0]-f[0]/f[1]*(60*f[0]/f[1]),e.limit<600&&(e.limit=600),g=[e.limit,f[1]>400?f[1]-50:400],g[0]=a.html?g[0]:g[0]-300,layer.area(b.index,{width:g[0]+(a.html?15:0),height:g[1]}),e.flwidth=g[0]-(a.html?300:0),b.imgarea[0]>e.flwidth?b.imgs.css({width:e.flwidth}):b.imgs.css({width:b.imgarea[0]}),b.imgs.outerHeight()<g[1]&&b.imgs.css({top:(g[1]-b.imgs.outerHeight())/2}),b.imgs.css({visibility:"visible"}),b.bigimg.css({width:e.flwidth,height:g[1],"background-color":a.bgcolor}),a.html&&d.find(".xubox_intro").css({height:g[1]}),e=null,f=null,g=null},c.on("resize",function(){b.end||(b.timer&&clearTimeout(b.timer),b.timer=setTimeout(function(){b.resize(b.layero)},200))}),b.index=$.layer(i),b.index},layer.photosPage=function(a){var b={};b.run=function(b){layer.photos({html:a.html,success:a.success,page:{title:a.title,id:a.id,start:b,parent:a.parent}})},a=a||{},$(a.parent).find("img").each(function(a){$(this).on("click",function(){b.run(a)})})};
//# sourceMappingURL=source222/widget.js.map
