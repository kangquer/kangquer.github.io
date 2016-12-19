# yohobuy

### 问题
> 2016-11-11

2. backtop.html里console.log($("#footer_wrap").offset().top);
3. headerbase.html引用的js，同步登陆有问题，显示：
`Uncaught TypeError: $.cookie is not a function`
4. translate动画问题

>2016-11-10

1. cookie如果存入的是对象，在获取和上传时一定要JSON.stringify()和JSON.parse()转一下。
2. a标签很特殊，不会继承父级的color和font-size。

>2016-11-9

1. a标签的href和click的执行顺序问题。如何先执行click事件处理程序，再执行href跳转。