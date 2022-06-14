window.addEventListener('load', function() {
    (function() {
        // ---搜索框效果
        const search_input = document.querySelector('.search_input');
        const ipt = search_input.querySelector('input');
        const btn = search_input.querySelector('button');
        const search_hide = search_input.querySelector('.search_hide');
        (function() {
            var ul = search_hide.children[0]; //隐藏的搜索框关键词
            var arr = [];
            var n = 0;
            for (var i = 0; i < ul.children.length; i++) {
                // 把关键词临时保存到数组里
                arr.push(ul.children[i].innerHTML);
            }
            setInterval(function() {
                if (i > arr.length - 1) {
                    i = 0;
                }
                ipt.placeholder = arr[i];
                i++;

            }, 3000);
        })()

        ipt.addEventListener('focus', function() {
            this.style = `border: 1px solid #FF6700;
                          border-right: 1px solid transparent;`;
            btn.style = 'border: 1px solid #FF6700';
            search_hide.style.display = 'block';

        })
        ipt.addEventListener('blur', function() {
            this.style = '';
            search_hide.style.display = 'none';
            btn.style = '';
        })
    })();
    (function() {
        // ---循环背景图
        const home_nav = this.document.querySelector('#home_nav');
        const ul = home_nav.querySelector('ul');
        for (var i = 0; i < ul.children.length; i++) {
            //  ul.children[i].children[0] 是 #home_nav里面的小li 里面的 a
            ul.children[i].children[0].style = `background:url(image/home${i+1}.png) no-repeat center;
            background-size: 35%;`;

        }
    })();
    (function() {
        //---- tab栏切换-商品分类
        const category_in = document.querySelector('.category_in');
        const cate_ul = category_in.querySelector('ul'); //商品分类选项卡
        const category_items = document.querySelector('.category_items'); //tab栏隐藏的区域
        for (var i = 0; i < cate_ul.children.length; i++) {
            // cate_ul.children[i] 每个选项卡 小li
            (function(n) {
                cate_ul.children[n].onmouseenter = function() {
                    // 使用onmouseenter鼠标移动事件(移动到子元素不会触发),没有冒泡,子触发自身
                    // console.log(this.children[2]);
                    this.children[2].style = `position: absolute;
                                              top: 0px;
                                              left: 245px;
                                              display:block;
                                              z-index:9999;
                                              background-color:#fff;
                                              box-shadow: 1px 2px 4px 2px #999;`;

                    // 鼠标离开分类选项卡隐藏
                    cate_ul.children[n].onmouseleave = function() {

                        // console.log(this.children[2]);
                        this.children[2].style = 'display:none';
                    }
                }
            })(i);
        }
    })();
    (function() {
        //--- 轮播图
        const img = document.querySelector('.banner_img').querySelector('.img');
        const ul = img.querySelector('ul');
        const next = img.querySelector('#next'); //下一张
        const last = img.querySelector('#last'); //上一张
        const circle = img.querySelector('#circle'); //小圆点
        const ol = circle.querySelector('ol');
        img.addEventListener('mouseenter', function() {
            // 鼠标经过,上下张按钮背景色变浓
            next.style.backgroundColor = 'rgb(62, 60, 60)';
            last.style.backgroundColor = 'rgb(62, 60, 60)';
            clearInterval(timer);
            timer = null;
        })
        img.addEventListener('mouseleave', function() {
            // 鼠标离开,上下张按钮背景色变淡
            next.style.backgroundColor = 'rgb(62, 60, 60, 0.1)';
            last.style.backgroundColor = 'rgb(62, 60, 60, 0.1)';
            timer = setInterval(function() {
                // 每2秒自动点击下一张图
                next.click();
            }, 2000);
        })

        // 生成小圆点-有几张轮播图就生成几个
        var t = ul.children[0].offsetWidth; //每个轮播图的宽度
        for (var i = 0; i < ul.children.length; i++) {
            // 添加节点并设置自定义属性 index
            var li = document.createElement('li');
            li.setAttribute('index', i);
            ol.appendChild(li);
            // 给每个小li绑定点击事件,点击第几个就切换到第几张图片
            li.addEventListener('click', function() {
                if (flag) {
                    flag = false;
                    for (var i = 0; i < ol.children.length; i++) {
                        ol.children[i].style.backgroundColor = '#999';
                    }
                    this.style.backgroundColor = 'white';
                    var index = this.getAttribute('index'); //获取当前小li索引号
                    num = index; //同步小圆点和索引
                    c_num = num; //同步小原点和上下张索引
                    // 下一张，即向右走(负的left值)
                    runs(ul, -index * t, 10, function() {
                        flag = true;
                    });
                }
            });
        }
        ol.children[0].style.backgroundColor = '#fff'; //第一个小圆点默认色
        var first = ul.children[0].cloneNode(true); //深克隆,复制节点的所有
        ul.appendChild(first);

        var num = 0; //计数当前是第几张图
        var c_num = 0; //控制小圆点；
        var flag = true; //节流阀
        // 下一张
        next.addEventListener('click', function() {
            if (flag) {
                // 正在做动画时关闭
                flag = false;
                if (num == ul.children.length - 1) {
                    ul.style.left = 0;
                    num = 0;
                }
                num++;
                runs(ul, -num * t, 10, function() {
                    // 做完动画再开启
                    flag = true;
                });
                c_num++;
                // 如果小圆点走到最后一个,就继续重置
                c_num = c_num == ol.children.length ? 0 : c_num;
                for (var i = 0; i < ol.children.length; i++) {
                    // console.log(ol.children[i]);
                    ol.children[i].style.backgroundColor = '#999';
                }
                // console.log(c_num);
                ol.children[c_num].style.backgroundColor = 'white';
            }
        });
        // 上一张
        last.addEventListener('click', function() {
            if (flag) {
                // 正在做动画时关闭
                flag = false;
                if (num == 0) {
                    //如果已经回到第一张了,num等于最后一张的索引
                    num = ul.children.length - 1;
                    ul.style.left = -num * t + 'px';

                }
                num--;
                runs(ul, -num * t, 10, function() {
                    // 做完动画再开启
                    flag = true;
                });
                c_num--;
                // 如果小圆点走到最后一个,就继续重置
                c_num = c_num < 0 ? ol.children.length - 1 : c_num;
                for (var i = 0; i < ol.children.length; i++) {
                    ol.children[i].style.backgroundColor = '#999';
                }
                ol.children[c_num].style.backgroundColor = 'white';
            }
        })
        var timer = setInterval(function() {
            // 每2秒自动点击下一张图
            next.click();
        }, 3000);
    })();
    // X轴移动动画函数
    function runs(obj, target, times, fn) {
        obj.timer = setInterval(function() {
            // 缓冲原理,(目标值 减去 当前位置值 除以  步数)
            // Math.ceil 向上取整
            var step = (target - obj.offsetLeft) / 50;
            // 如果step为负值, 就向下取整 否则 就向上取整
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            if (obj.offsetLeft == target) {
                // 如果运动的距离超过终点目标
                clearInterval(obj.timer);

                //回调函数要写到定时器结束的位置
                // if (fn) {
                //     fn();
                // }
                // ---!!!---利用逻辑中断应用
                //如果有回调函数传进来,就为true  执行该函数
                //如果没有,直接不执行
                fn && fn();
            } else {
                obj.style.left = obj.offsetLeft + step + 'px';
                // obj.style.left = obj.offsetLeft + 50 + 'px';
            }
        }, times)
    }
    (function() {
        // -----侧边栏
        const home_tool = document.querySelector('.home_tool'); //侧边栏
        const app = home_tool.querySelector('.app');
        const app_hide = document.querySelector('#app_hide'); //隐藏的二维码
        const main = document.querySelector('main');
        const tool_top = home_tool.querySelector('#tool_top'); //返回顶部
        app.addEventListener('mouseenter', function() {
            app_hide.style.display = 'block';
        });
        app.addEventListener('mouseleave', function() {
            app_hide.style.display = 'none';
        });
        app_hide.addEventListener('mouseenter', function() {
            app_hide.style.display = 'block';
        });
        app_hide.addEventListener('mouseleave', function() {
            app_hide.style.display = 'none';
        });
        var mainTop = main.offsetTop //main与页面的距离
            // 当页面滚动到一定距离,返回顶部按钮出现
            // 滚动事件
        document.addEventListener('scroll', function() {
            // 当页面滚到手机模块时触发
            if (parseInt(window.pageYOffset) >= mainTop + 160) {
                tool_top.style.display = 'block';
            } else {
                tool_top.style.display = 'none';
            }
        });
        // 点击回到顶部
        tool_top.addEventListener('click', function() {
            runsY(window, 0, 8); //Y轴移动
        });

        function runsY(obj, target, times, fn) {
            obj.timer = setInterval(function() {
                // 缓冲原理,(目标值 减去 当前位置值 除以  步数)
                // Math.ceil 向上取整
                var step = (target - window.pageYOffset) / 50;

                // 如果step为负值, 就向下取整 否则 就向上取整
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                if (window.pageYOffset == target) {
                    // 如果运动的距离超过终点目标
                    clearInterval(obj.timer);

                    // 回调函数要写到定时器结束的位置
                    if (fn) {
                        fn();
                    }
                } else {
                    // 为到达目的地 则 继续走
                    window.scroll(0, window.pageYOffset + step);
                }
            }, times)
        }
    })();
})