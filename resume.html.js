module.exports = `<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <meta http-equiv="x-ua-compatible"="ie=edge" />
        <title>Runfastlynda's Resume</title>
        <meta name="viewport" content="width=device-width,user-scalable=no,initial-scale=1.0,  maximum-scale=1.0,minimum-scale=1.0">
        <link rel="stylesheet" href="./resume.css">
        <link href="./tailwind.min.css" rel="stylesheet"></head>
    <style>body { font-family: "Lantinghei SC", "Open Sans", Arial, "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", "STHeiti", "WenQuanYi Micro Hei", SimSun, sans-serif; background-color: #fafafa; }</style>
    
    <body class="text-base text-gray-900 leading-relaxed">
        <div class="bg-white w-full md:w-4/5 lg:w-7/12 mx-auto px-12 md:my-8">
            <header class="flex py-10 text-center flex-col sm:flex-row sm:justify-between">
                <div class="text-base sm:text-left pl-12">
                    <div class="text-5xl">柴嘉临</div>
                    <p class="text-xl">前端工程师</p></div>
                <div class="pt-4 sm:pt-0">
                    <ul class="sm:text-right">
                        <li>
                            <a href="https://github.com/runfastlynda">runfastlynda</a>
                            <i class="iconfont">&#xe534;</i></li>
                        <li>
                            <span href="#">13121921200</span>
                            <i class="iconfont">&#x34ab;</i></li>
                        <li>
                            <a href="http://runfastlynda.com/">runfastlynda.com</a>
                            <i class="iconfont">&#xe668;</i></li>
                        <li>
                            <a href="mailto:runfastlynda@gmail.com">runfastlynda@gmail.com</a>
                            <i class="iconfont">&#xe621;</i></li>
                    </ul>
                </div>
            </header>
            <section class="flex border-t py-8 flex-col sm:flex-row sm:justify-between">
                <div class="sm:w-1/6 text-lg sm:text-right pb-2 sm:pb-0">教育背景</div>
                <div class="sm:w-5/6 sm:text-left sm:pl-8">2010 - 2014 财政学 / 财务管理学 (双学位) 内蒙古财经大学</div></section>
            <section class="flex border-t py-8 flex-col sm:flex-row sm:justify-between">
                <div class="sm:w-1/6 sm:text-right text-lg pb-2">工作经历</div>
                <div class="sm:w-5/6 sm:text-left sm:pl-8">
                    <p class="pb-3">
                        <span class="font-medium">2016.9 - 至今&ensp;美团&ensp;前端工程师</span></p>
                    <p>先后服务于美团机票、公交业务部门，深度参与负责两个部门的前端事务，工作范围涵盖业务开发、技术选型，以及项目、团队管理等方面。</p>
                    <p class="py-3">
                        <span class="font-medium">2015.4 - 2016.9&ensp;北京彩橙科技有限公司&ensp;前端工程师</span></p>
                    <p>参与了公司所有的前端项目，独立负责句读 App 的所有前端工作，工作范围涵盖 App 内嵌 H5、运营管理后台以及数据采集浏览器插件。</p>
                </div>
            </section>
            <section class="flex border-t py-8 flex-col sm:flex-row sm:justify-between">
                <div class="sm:w-1/6 sm:text-right text-lg pb-2">技术栈</div>
                <div class="sm:w-5/6 sm:text-left sm:pl-8">
                    <p class="pb-3">
                        JavaScript、React.js、Vue.js、React Native、HTML、CSS、Sass、Node.js、Electron、Markdown、ElementUI、Antd、TailwindCSS</p>
                    <p>
                        Git、Webpack、Yarn、VSCode、iTerm2、OS X、Sketch、Charles、Postman、双拼</p></div>
            </section>
            <section class="flex border-t py-8 flex-col sm:flex-row sm:justify-between">
                <div class="sm:w-1/6 sm:text-right text-lg pb-2">项目经验</div>
                <div class="sm:w-5/6 sm:text-left sm:pl-8">
                    <ul>
                        <li class="pb-5">
                            <p class="pb-3">
                                <span class="font-medium">美团公交用户端</span></p>
                            <p>
                                <p class="text-base text-gray-700">面向公交用户提供手机端虚拟公交卡服务，帮助用户实现开卡，充值，扫码上车、退卡退费、公交路线及运营情况查询、实时公交及拥挤度提醒等服务。</p>
                                <ul class="py-4 list-decimal">
                                    <li>负责客户端的架构设计，基于 Vue 搭建了一套兼容多平台、多应用的服务架构，带领团队从 0 到 1 落地了业务的全流程，也承担了部分核心模块的开发工作。</li>
                                    <li>基于 React Native 重构了客户端原生公交模块，达到了与其它页面无缝切换的用户体验，同时基于 React Native 转 Web 技术，制定实现了一套多端输出方案，帮助团队提高了整体人效和项目迭代速度。</li></ul>
                            </p>
                            <p class="text-gray-700">技术栈：ES6, TypeScript, React Native, Redux, Vue.js, HTML5, Sass, QRCode, 高德/腾讯地图</p></li>
                        <li class="pb-5">
                            <p class="pb-3">
                                <span class="font-medium">美团公交商家端</span></p>
                            <p>
                                <p class="text-base text-gray-700">面向公交业务运营人员的多个后台系统，包括内，外运营、商务 BD 运营、数据指标运营等。</p>
                                <ul class="py-4 list-decimal">
                                    <li>负责了商家端业务的架构设计，使用微前端方案整合了新旧系统，业务落地后，即保证了新系统的正常上线，也保障了遗留系统的顺畅运转，同时实现了技术栈、交互规范的整体统一，帮助运营和开发人员提高了工作效率。</li>
                                    <li>搭建了一套包含业务逻辑的命令行脚手架工具，帮助开发同事提升了日常工作效率。</li>
                                    <li>借助 JSON Scheme 方案，在 ElementUI 基础上实现了一套表单、表格渲染控件，提升了商家端系统表单处理的灵活性，极大的提升了开发生产效率。</li></ul>
                            </p>
                            <p class="text-gray-700">技术栈: ES6, TypeScript, Vue.js, Vuex, Node.js,HTML5, Sass, 高德/腾讯地图</p></li>
                        <li class="pb-5">
                            <p class="pb-3">
                                <span class="font-medium">美团机票用户端</span></p>
                            <p>
                                <p class="text-base text-gray-700">为机票用户提供国内外机票的查询、购买、售后、特价机票销售、订单，行程分享等服务。</p>
                                <ul class="py-4 list-decimal">
                                    <li>负责机票客户端日常业务开发，包括所有 WebView 页面开发维护、多个小程序、PC 端机票核心流程开发维护，以及支撑多个重点运营活动。</li>
                                    <li>优化了重点流程用户体验，通过离线化、接口缓存、预渲染、动画优化等策略，减少了用户白屏等待时间，提升了用户体验的流畅性。</li>
                                    <li>参与开发和维护了多个团队基础组件</li></ul>
                            </p>
                            <p class="text-gray-700">技术栈: ES6, Vue.js, Vuex, Node.js,HTML5, Sass, Mocha</p></li>
                        <li class="pb-5">
                            <p class="pb-3">
                                <span class="font-medium">句读 App</span></p>
                            <p>
                                <p class="text-base text-gray-700">面向年轻用户群的一款以文字语录为主题的轻阅读社区应用，曾被 App Store 以及国内多家应用商店推荐为优质精选应用。</p>
                                <ul class="py-4 list-decimal">
                                    <li>从 0 到 1 参与了应用的开发构建，基于 React 完成了多个 WebView 混合页面的开发</li>
                                    <li>负责了多个公司 H5 活动页的开发</li>
                                    <li>负责了针对运营人员的运营管理后台，以及 Chrome 辅助插件的开发</li></ul>
                            </p>
                            <p class="text-gray-700">技术栈: JQuery, React.js, Glup.js, HTML5, Sass, Chrome Extension</p></li>
                    </ul>
                </div>
            </section>
        </div>
        <script>(function(i, s, o, g, r, a, m) {
                i["GoogleAnalyticsObject"] = r; (i[r] = i[r] ||
                function() { (i[r].q = i[r].q || []).push(arguments);
                }),
                (i[r].l = 1 * new Date()); (a = s.createElement(o)),
                (m = s.getElementsByTagName(o)[0]);
                a.async = 1;
                a.src = g;
                m.parentNode.insertBefore(a, m);
            })(window, document, "script", "https://www.google-analytics.com/analytics.js", "ga");

            ga("create", "UA-82224639-1", "auto");
            ga("send", "pageview");</script>
    </body>

</html>`