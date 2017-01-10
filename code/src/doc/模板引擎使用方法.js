

1.  模板引擎使用方法


//渲染模板
X.view.renderTmpl({
    url: './template/test.html',
    where: $('#midBox'),
    renderData: {
        list: [{
            name: 'child1111',
            price: 18
        }]
    }
});

/*
 <div>
 {{each(i,item) list}}
 {{if item.name == 'rancheng'}}
 <div style="width:100px;background:green;">${item.name}</div>
 {{else}}
 <div style="width:100px;background:yellow;">${item.name}</div>
 {{/if}}
 {{/each}}
 </div>
 */




//渲染子模板
X.view.renderChildTmpl({
    url: $('#groupTmpl'),
    where: $('#midBox'),
    renderData: {
        list: [{
            name: 'child1111',
            price: 18
        }]
    }
});

/*
 <script type="text/tcl" id="groupTmpl">
     _[{each(i,item) list}]_
     <div>$_[item.name]_</div>
     _[{/each}]_
 </script>
*/