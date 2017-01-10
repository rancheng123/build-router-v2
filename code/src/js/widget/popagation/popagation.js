
/**
 * @    Constructor Pager
 * @    Diseiption  		分页构造函数
 * @	Parma  {startNum}   开始页码
 * @	Parma  {viewNum}    可视区域显示分页元素数量
 * @	Parma  {allNum}     总页数
 * @	Parma  {isForeAft}  是否显示首页和尾页(目前不支持false)
 * @	Parma  {ellipsis}   省略符号定义
 * @	Parma  {callback}   DOM事件回调函数
 * ----------------------
 * @ Remarks {
 * @ 分页构造函数,参数为两个，第一个目标元素DOM节点，
 * @ 方法内部处理了字符串转换DOM对象方式，所以支持字符串与jQurey对象传入，需要注意，字符串传入需要带有jQuery
 * @ 所识别的标记符号（. | #），第二个参数为扩展默认对象的对象，可以为空，但是不能为 undefin.
 * @ }
 * ----------------------
 * @ 备注
 * @ 目前存在：显示页码等于开始页码的情况下，开始位置的省略符号依然出现的bug.
 **/
;





    function Pager(id, source) {
        var self=this;
        //限定只接受两个参数
        if (arguments.length > 2) {
            throw new Error("The Function number of parameters error.");
        }

        //原始参数集合
        var sourceOriginal = {
            startNum: 1,
            viewNum: 5,
            allNum: 10,
            pageSize:10,
            isForeAft: true,
            ellipsis: "...",
            callback: function () {}
        };

        var quoteProto = Object.prototype.toString;

        var _private = {

            //核心构造方法，处理分页数据与DOM渲染处理
            createHTML: function (n) {

                var _ul = $("<ul>"),
                    _liStr = "<li>",
                    _msg = {
                        //p: "&lt;",
                        //n: "&gt;",

                        p: "上一页",
                        n: "下一页",


                        f: "首页",
                        l: "尾页"
                    },
                    classOn = "on",
                    classEllipsis = "ellipsis",
                    classFirstPage = "firstPage",
                    classLastPage = "lastPage",
                    classPrePage = "prePage",
                    classNextPage = "nextPage",
                    classPager = "pager",
                    classHeadEllipsis = "",
                    classFootEllipsis = "";

                var header = {
                    "0": _msg.f + "|" + classFirstPage,
                    "1": _msg.p + "|" + classPrePage,
                    "2": sourceOriginal.ellipsis + "|" + classEllipsis
                };

                var footer = {
                    "0": sourceOriginal.ellipsis + "|" + classEllipsis,
                    "1": _msg.n + "|" + classNextPage,
                    "2": _msg.l + "|" + classLastPage
                };

                if (n && n != 0) {
                    sourceOriginal.startNum = n;
                }

                var len = sourceOriginal.viewNum + 2;

                var averageValue = Math.floor(sourceOriginal.viewNum / 2);

                var number = 0;

                if (sourceOriginal.allNum == sourceOriginal.viewNum) {
                    classHeadEllipsis = "none";
                    classFootEllipsis = "none";
                }

                if (sourceOriginal.allNum < sourceOriginal.viewNum) {
                    number = 1;
                    len = sourceOriginal.allNum + 2;
                    classHeadEllipsis = "none";
                    classFootEllipsis = "none";
                } else if (sourceOriginal.startNum < sourceOriginal.viewNum) {
                    number = 1;
                    classHeadEllipsis = "none";
                } else if ((sourceOriginal.startNum + averageValue) < sourceOriginal.allNum) {
                    number = sourceOriginal.startNum - averageValue;
                } else {
                    number = sourceOriginal.allNum - (sourceOriginal.viewNum - 1);
                    classFootEllipsis = "none";
                }

                for (var i = 0; i < len; i++) {

                    var _li = $(_liStr);

                    if (sourceOriginal.isForeAft && i == 0) {
                        for (var k in header) {
                            var _hLi = $(_liStr),
                                headArr = header[k].split("|");

                            if (k == "1") {
                                _hLi.addClass(classHeadEllipsis);
                            }

                            _hLi
                                .html(headArr[0])
                                .addClass(headArr[1])
                                .appendTo(_ul);
                        }
                        continue;
                    }

                    if (sourceOriginal.isForeAft && i == (len - 1)) {
                        for (var j in footer) {
                            var _fLi = $(_liStr),
                                footArr = footer[j].split("|");
                            if (j == "0") {
                                _fLi.addClass(classFootEllipsis);
                            }
                            _fLi
                                .html(footArr[0])
                                .addClass(footArr[1])
                                .appendTo(_ul);
                        }
                        continue;
                    }

                    if (number == sourceOriginal.startNum) {
                        _li.addClass(classOn);
                    }

                    var pageNum = number++;

                    _li
                        .attr("data-num", pageNum)
                        .html(pageNum)
                        .appendTo(_ul);

                }


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


                if(sourceOriginal.hideFirstAndLast){
                    _ul.find('.firstPage ,.lastPage').hide();
                };
                //隐藏省略号
                if(sourceOriginal.hideEllipsis){
                    _ul.find('.ellipsis').hide();
                }




                _ul.addClass(classPager);

                return _ul;
            },
            isString: function (str) {
                return quoteProto.call(str) === "[object String]";
            },
            isObject: function (obj) {
                return quoteProto.call(obj) === "[object Object]";
            }
        };
        var source = [].slice.call(arguments).pop();

        //初始化构造函数
        this.init = (function () {

            this.iD = _private.isString(id) ? $(id) : id;

            if (_private.isObject(source)) {
                $.extend(sourceOriginal, source);

                //页数 = 总条数/每页条数
                sourceOriginal.allNum = Math.ceil( (sourceOriginal.totalCount/sourceOriginal.pageSize) );

                this.num = sourceOriginal.startNum;
                this.totalNum = sourceOriginal.allNum;
                this._callback = sourceOriginal.callback;
                this.pageSize = sourceOriginal.pageSize;
                this.totalCount = sourceOriginal.totalCount;
            }

            return _private;

        }).call(this);

    }

    Pager.fn = Pager.prototype = {
        render: function (num) {

            var _this = this;
            this.iD.html(this.init.createHTML(num));

            //当前点击
            this.iD.find("[data-num]").click(function () {
                var that = $(this);

                if (!that.hasClass("on"))
                    _this.one(that.data("num"));
            });

            //上一页
            this.iD.find(".prePage").click(function () {
                _this.prev();
            });

            //下一页
            this.iD.find(".nextPage").click(function () {
                _this.next();
            });

            //首页
            this.iD.find(".firstPage").click(function () {
                _this.first();
            });

            //末页
            this.iD.find(".lastPage").click(function () {
                _this.last();
            });

            //跳页
            this.iD.find(".toPage").click(function () {
                _this.toPage();
            });
        },

        one: function (num) {
            this.num = num;
            this.render(this.num);
            this._callback.call(this, this.num,this.pageSize);
        },

        next: function () {
            if (this.num < this.totalNum) {
                var num = ++this.num;
                this.render(num);
                this._callback.call(this, this.num,this.pageSize);
            }
        },

        prev: function () {
            if (this.num > 1) {
                var num = --this.num;
                this.render(num);
                this._callback.call(this, this.num,this.pageSize);
            }
        },

        first: function () {
            if (this.num > 1) {
                var num = this.num = 1;

                this.render(num);
                this._callback.call(this, this.num,this.pageSize);
            }
        },

        last: function () {
            if (this.num < this.totalNum) {
                var num = this.num = this.totalNum;
                this.render(num);
                this._callback.call(this, this.num,this.pageSize);
            }
        },

        toPage: function () {
            var toPage = Number(this.iD.find(".toPageInput").val());



            if (toPage >= 1 && toPage <= this.totalNum && /^[\d\s]+$/.test(toPage) ) {
                var num = this.num = toPage;
                this.render(num);
                this._callback.call(this, this.num,this.pageSize);
            }else{

                $.layer({
                    title: '提示消息',
                    area: ['300px', '100px'],
                    btns: 0,
                    shade: [false],
                    dialog: {
                        type: 8,
                        msg: '<div class="layer-content mL5">不存在该页</div>'
                    }
                });
            }
        }
    };


