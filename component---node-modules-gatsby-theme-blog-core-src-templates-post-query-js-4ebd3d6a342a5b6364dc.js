(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{"A2+M":function(t,e,r){var n=r("X8hv");t.exports={MDXRenderer:n}},Bnag:function(t,e){t.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}},EbDI:function(t,e){t.exports=function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}},Ijbi:function(t,e,r){var n=r("WkPL");t.exports=function(t){if(Array.isArray(t))return n(t)}},RIqP:function(t,e,r){var n=r("Ijbi"),c=r("EbDI"),o=r("ZhPi"),i=r("Bnag");t.exports=function(t){return n(t)||c(t)||o(t)||i()}},SksO:function(t,e){function r(e,n){return t.exports=r=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},r(e,n)}t.exports=r},WkPL:function(t,e){t.exports=function(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}},X8hv:function(t,e,r){var n=r("sXyB"),c=r("RIqP"),o=r("lSNA"),i=r("8OQS");function u(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function a(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?u(Object(r),!0).forEach((function(e){o(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):u(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var l=r("q1tI"),p=r("7ljp").mdx,s=r("BfwJ").useMDXScope;t.exports=function(t){var e=t.scope,r=t.children,o=i(t,["scope","children"]),u=s(e),f=l.useMemo((function(){if(!r)return null;var t=a({React:l,mdx:p},u),e=Object.keys(t),o=e.map((function(e){return t[e]}));return n(Function,["_fn"].concat(c(e),[""+r])).apply(void 0,[{}].concat(c(o)))}),[r,e]);return l.createElement(f,a({},o))}},ZhPi:function(t,e,r){var n=r("WkPL");t.exports=function(t,e){if(t){if("string"==typeof t)return n(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(t,e):void 0}}},b48C:function(t,e){t.exports=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}},sXyB:function(t,e,r){var n=r("SksO"),c=r("b48C");function o(e,r,i){return c()?t.exports=o=Reflect.construct:t.exports=o=function(t,e,r){var c=[null];c.push.apply(c,e);var o=new(Function.bind.apply(t,c));return r&&n(o,r.prototype),o},o.apply(null,arguments)}t.exports=o},xjC2:function(t,e,r){"use strict";r.r(e),r.d(e,"query",(function(){return P}));var n=r("rePB"),c=r("q1tI"),o=r.n(c),i=r("A2+M"),u=r("PqFP"),a=r("dlzO"),l=r("txSG"),p=r("qKvR"),s=function(t){return Object(p.c)(l.c.h1,t)},f=r("wx14"),b=function(t){return Object(l.g)(l.c.p,Object(f.a)({sx:{fontSize:1,mt:-3,mb:3}},t))},O=r("Wbzz"),j=r("s/18"),y=function(t){var e=t.previous,r=t.next;return Object(p.c)("footer",{css:Object(l.f)({mt:4,pt:3})},Object(p.c)(l.c.hr,null),Object(p.c)(j.a,null),(e||r)&&Object(p.c)(l.b,{as:"ul",css:Object(l.f)({flexWrap:"wrap",justifyContent:"space-between",listStyle:"none",padding:0})},Object(p.c)("li",null,e&&Object(p.c)(l.c.a,{as:O.a,to:e.slug,rel:"prev"},"← ",e.title)),Object(p.c)("li",null,r&&Object(p.c)(l.c.a,{as:O.a,to:r.slug,rel:"next"},r.title," →"))))},d=r("9eSz"),v=r.n(d),g=function(t){var e,r=t.post;return Object(p.c)(o.a.Fragment,null,(null==r||null===(e=r.image)||void 0===e?void 0:e.childImageSharp)&&Object(p.c)(v.a,{fluid:r.image.childImageSharp.fluid,alt:r.imageAlt?r.imageAlt:r.excerpt}))},m=function(t){var e,r,n,c,o=t.data,l=o.post,f=o.site.siteMetadata.title,O=t.location,j=t.previous,d=t.next;return Object(p.c)(u.a,{location:O,title:f},Object(p.c)(a.a,{title:l.title,description:l.excerpt,imageSource:l.socialImage?null===(e=l.socialImage)||void 0===e||null===(r=e.childImageSharp)||void 0===r?void 0:r.fluid.src:null===(n=l.image)||void 0===n||null===(c=n.childImageSharp)||void 0===c?void 0:c.fluid.src,keywords:l.keywords,imageAlt:l.imageAlt}),Object(p.c)("main",null,Object(p.c)(g,{post:l}),Object(p.c)(s,null,l.title),Object(p.c)(b,null,l.date),Object(p.c)(i.MDXRenderer,null,l.body)),Object(p.c)(y,{previous:j,next:d}))};function h(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function x(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?h(Object(r),!0).forEach((function(e){Object(n.a)(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):h(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}e.default=function(t){var e=t.location,r=t.data,n=r.blogPost,c=r.previous,o=r.next;return Object(p.c)(m,{data:x(x({},r),{},{post:n}),location:e,previous:c,next:o})};var P="2858515751"}}]);
//# sourceMappingURL=component---node-modules-gatsby-theme-blog-core-src-templates-post-query-js-4ebd3d6a342a5b6364dc.js.map