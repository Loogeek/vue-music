webpackJsonp([4],{528:function(t,e,i){function n(t){i(573)}var s=i(19)(i(554),i(589),n,"data-v-74fbf022",null);t.exports=s.exports},554:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i(124),s=i.n(n),r=i(34),a=i.n(r),l=i(121),A=i(122),o=i.n(A),c=i(190),f=i.n(c);e.default={data:function(){return{currentIndex:0,scrollY:0,listTitleDiff:0,listGroupHeight:[]}},created:function(){this.touches={}},mounted:function(){this.fetchSingerList()},computed:a()({alphabetName:function(){return this.singerList.map(function(t){return t.title.slice(0,1)})},listTopTitle:function(){if(!(this.scrollY<0))return this.singerList[this.currentIndex]&&this.singerList[this.currentIndex].title}},i.i(l.a)(["singerList"])),methods:a()({handleTouchStart:function(t){this.touches.startIndex=parseInt(t.target.dataset.index),this.touches.startY=t.touches[0].pageY,this.currentIndex=this.touches.startIndex,this._scrollToElement()},handleTouchMove:function(t){var e=Math.floor((t.touches[0].pageY-this.touches.startY)/18),i=this.touches.startIndex+e;i<0?i=0:i>this.singerList.length-1&&(i=this.singerList.length-1),this.currentIndex=i,this._scrollToElement()},handleScroll:function(t){this.scrollY=-t.y},setCurrentSinger:function(t){this.setCurrentSinger(t)},_scrollToElement:function(){var t=this.$refs.listGroup[this.currentIndex];this.$refs.singerScroll.scrollToElement(t,0)},_calculateHeight:function(){var t=0,e=[0];[].concat(s()(this.$refs.listGroup)).map(function(i){t+=i.clientHeight,e.push(t)}),this.listGroupHeight=e}},i.i(l.d)(["fetchSingerList"]),i.i(l.b)({setCurrentSinger:"SET_CURRENT_SINGER"})),watch:{singerList:function(){var t=this;this.$nextTick(function(){t._calculateHeight()})},scrollY:function(){for(var t=0,e=this.listGroupHeight.length;t<e;t++){var i=this.listGroupHeight[t],n=this.listGroupHeight[t+1];if(this.scrollY>=i&&this.scrollY<n){this.currentIndex=t,this.listTitleDiff=n-this.scrollY;break}}},listTitleDiff:function(t){if(this.$refs.listTitle){var e=t>0&&t<30?t-30:0;this.$refs.listTitle.style.webkitTransform="translateY("+e+"px)"}}},components:{Scroll:o.a,Loading:f.a}}},563:function(t,e,i){e=t.exports=i(521)(!0),e.push([t.i,".singer[data-v-74fbf022]{position:fixed;top:88px;bottom:0;width:100%}.singer-item[data-v-74fbf022]{padding-bottom:3rem}.singer-item-index[data-v-74fbf022]{height:30px;line-height:30px;padding-left:2rem;font-size:1.2rem;color:hsla(0,0%,100%,.5);background-color:#333}.singer-item-list-item .item-link[data-v-74fbf022],.singer-item-list-item[data-v-74fbf022]{display:-webkit-box;display:-ms-flexbox;display:flex}.singer-item-list-item .item-link[data-v-74fbf022]{-webkit-box-flex:1;-ms-flex:1;flex:1;padding:2rem 0 0 3rem;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.singer-item-list-item .item-avatar[data-v-74fbf022]{width:5rem;height:5rem;border-radius:50%}.singer-item-list-item .item-name[data-v-74fbf022]{margin-left:2rem;color:hsla(0,0%,100%,.5);font-size:1.4rem}.singer-list-title[data-v-74fbf022]{position:absolute;top:0;left:0;width:100%;height:30px;line-height:30px;padding-left:2rem;font-size:1.2rem;color:hsla(0,0%,100%,.5);background-color:#333}.singer-alphabetlist[data-v-74fbf022]{position:fixed;top:50%;right:0;z-index:100;-webkit-transform:translateY(-50%);transform:translateY(-50%);width:2rem;padding:2rem 0;border-radius:1rem;text-align:center;background-color:rgba(0,0,0,.3);font-family:Helvetica}.singer-alphabetlist-item[data-v-74fbf022]{padding:.3rem;line-height:1;color:hsla(0,0%,100%,.5);font-size:1.2rem}.singer-alphabetlist-item.current[data-v-74fbf022]{color:#ffcd32}","",{version:3,sources:["/Users/xiaolong/Documents/Github/vue-music/src/containers/singer/index.vue"],names:[],mappings:"AACA,yBACE,eAAgB,AAChB,SAAU,AACV,SAAU,AACV,UAAY,CACb,AACD,8BACI,mBAAqB,CACxB,AACD,oCACM,YAAa,AACb,iBAAkB,AAClB,kBAAmB,AACnB,iBAAkB,AAClB,yBAAgC,AAChC,qBAAuB,CAC5B,AAMD,2FAJM,oBAAqB,AACrB,oBAAqB,AACrB,YAAc,CAanB,AAXD,mDACQ,mBAAoB,AAChB,WAAY,AACR,OAAQ,AAChB,sBAAuB,AAIvB,yBAA0B,AACtB,sBAAuB,AACnB,kBAAoB,CACnC,AACD,qDACQ,WAAY,AACZ,YAAa,AACb,iBAAmB,CAC1B,AACD,mDACQ,iBAAkB,AAClB,yBAAgC,AAChC,gBAAkB,CACzB,AACD,oCACI,kBAAmB,AACnB,MAAO,AACP,OAAQ,AACR,WAAY,AACZ,YAAa,AACb,iBAAkB,AAClB,kBAAmB,AACnB,iBAAkB,AAClB,yBAAgC,AAChC,qBAAuB,CAC1B,AACD,sCACI,eAAgB,AAChB,QAAS,AACT,QAAS,AACT,YAAa,AACb,mCAAoC,AAC5B,2BAA4B,AACpC,WAAY,AACZ,eAAgB,AAChB,mBAAoB,AACpB,kBAAmB,AACnB,gCAAqC,AACrC,qBAAuB,CAC1B,AACD,2CACM,cAAe,AACf,cAAe,AACf,yBAAgC,AAChC,gBAAkB,CACvB,AACD,mDACQ,aAAe,CACtB",file:"index.vue",sourcesContent:["\n.singer[data-v-74fbf022] {\n  position: fixed;\n  top: 88px;\n  bottom: 0;\n  width: 100%;\n}\n.singer-item[data-v-74fbf022] {\n    padding-bottom: 3rem;\n}\n.singer-item-index[data-v-74fbf022] {\n      height: 30px;\n      line-height: 30px;\n      padding-left: 2rem;\n      font-size: 1.2rem;\n      color: rgba(255, 255, 255, 0.5);\n      background-color: #333;\n}\n.singer-item-list-item[data-v-74fbf022] {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n}\n.singer-item-list-item .item-link[data-v-74fbf022] {\n        -webkit-box-flex: 1;\n            -ms-flex: 1;\n                flex: 1;\n        padding: 2rem 0 0 3rem;\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-box-align: center;\n            -ms-flex-align: center;\n                align-items: center;\n}\n.singer-item-list-item .item-avatar[data-v-74fbf022] {\n        width: 5rem;\n        height: 5rem;\n        border-radius: 50%;\n}\n.singer-item-list-item .item-name[data-v-74fbf022] {\n        margin-left: 2rem;\n        color: rgba(255, 255, 255, 0.5);\n        font-size: 1.4rem;\n}\n.singer-list-title[data-v-74fbf022] {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 30px;\n    line-height: 30px;\n    padding-left: 2rem;\n    font-size: 1.2rem;\n    color: rgba(255, 255, 255, 0.5);\n    background-color: #333;\n}\n.singer-alphabetlist[data-v-74fbf022] {\n    position: fixed;\n    top: 50%;\n    right: 0;\n    z-index: 100;\n    -webkit-transform: translateY(-50%);\n            transform: translateY(-50%);\n    width: 2rem;\n    padding: 2rem 0;\n    border-radius: 1rem;\n    text-align: center;\n    background-color: rgba(0, 0, 0, 0.3);\n    font-family: Helvetica;\n}\n.singer-alphabetlist-item[data-v-74fbf022] {\n      padding: .3rem;\n      line-height: 1;\n      color: rgba(255, 255, 255, 0.5);\n      font-size: 1.2rem;\n}\n.singer-alphabetlist-item.current[data-v-74fbf022] {\n        color: #ffcd32;\n}\n"],sourceRoot:""}])},573:function(t,e,i){var n=i(563);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);i(522)("0f366ae8",n,!0)},589:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("section",{staticClass:"singer"},[i("scroll",{ref:"singerScroll",attrs:{data:t.singerList,listenScroll:!0,probeType:3},on:{onScroll:t.handleScroll}},[i("ul",t._l(t.singerList,function(e,n){return i("li",{key:n,ref:"listGroup",refInFor:!0,staticClass:"singer-item"},[i("h3",{staticClass:"singer-item-index"},[t._v(t._s(e.title))]),t._v(" "),i("ul",{staticClass:"singer-item-list"},t._l(e.items,function(e,n){return i("li",{key:n,staticClass:"singer-item-list-item",on:{click:function(i){t.setCurrentSinger(e)}}},[i("router-link",{staticClass:"item-link",attrs:{to:"/singer/"+e.id}},[i("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.avatar,expression:"item.avatar"}],staticClass:"item-avatar"}),t._v(" "),i("span",{staticClass:"item-name"},[t._v(t._s(e.name))])])],1)}))])}))]),t._v(" "),i("ul",{staticClass:"singer-alphabetlist",on:{touchstart:t.handleTouchStart,touchmove:function(e){e.stopPropagation(),e.preventDefault(),t.handleTouchMove(e)}}},t._l(t.alphabetName,function(e,n){return i("li",{key:n,class:["singer-alphabetlist-item",{current:t.currentIndex===n}],attrs:{"data-index":n}},[t._v("\n            "+t._s(e)+"\n        ")])})),t._v(" "),t.listTopTitle?i("div",{ref:"listTitle",staticClass:"singer-list-title"},[t._v(t._s(t.listTopTitle))]):t._e(),t._v(" "),0===t.singerList.length?i("Loading"):t._e(),t._v(" "),i("router-view")],1)},staticRenderFns:[]}}});
//# sourceMappingURL=4.dc67d1d64917b3798611.js.map