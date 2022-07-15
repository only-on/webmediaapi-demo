var U=Object.defineProperty,A=Object.defineProperties;var I=Object.getOwnPropertyDescriptors;var O=Object.getOwnPropertySymbols;var P=Object.prototype.hasOwnProperty,N=Object.prototype.propertyIsEnumerable;var S=(t,e,o)=>e in t?U(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o,_=(t,e)=>{for(var o in e||(e={}))P.call(e,o)&&S(t,o,e[o]);if(O)for(var o of O(e))N.call(e,o)&&S(t,o,e[o]);return t},w=(t,e)=>A(t,I(e));import{r as p,a as T,o as R,b as D,t as j,c as g,d as h,e as c,f,g as Q,h as x,i as $,F as V,j as F}from"./vendor.0d00ebe5.js";const H=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function o(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerpolicy&&(i.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?i.credentials="include":n.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(n){if(n.ep)return;n.ep=!0;const i=o(n);fetch(n.href,i)}};H();var m=(t,e)=>{for(const[o,r]of e)t[o]=r;return t};function E(t){let e,o,r;async function n(){e=await navigator.mediaDevices.getUserMedia({audio:!0}),t.srcObject=e,r=[],o=new MediaRecorder(e),o.ondataavailable=a=>r.push(a.data),o.start()}function i(){e.getTracks().forEach(a=>a.stop()),o.state=="recording"}function s(){t.pause(),t.currentTime=0,t.srcObject=void 0,t.src=URL.createObjectURL(new Blob(r))}function l(){t.pause(),t.currentTime=0,t.srcObject=void 0,t.src=void 0}return{record:n,stop:i,replay:s,stopReplay:l,destroy:()=>e=t=r=null}}const q={setup(){const t=p(null),e=T({recoding:!1,replayable:!1,replaying:!1});let o;return R(()=>o=E(t.value)),D(()=>o.destroy()),w(_({},j(e)),{audioPlayer:t,toggleRecord:()=>{e.replaying=!1,e.recoding?(o.stop(),o.stopReplay(),e.replayable=!0):(o.record(),e.replayable=!1),e.recoding=!e.recoding},replay:()=>{e.replaying?(o.stopReplay(),e.replaying=!1):(o.replay(),e.replaying=!0)}})}},J={class:"m-2 p-4 border-2 border-pink-100"},K=c("h2",{class:"text-3xl"},"web\u5F55\u97F3",-1),W=["disabled"],z={ref:"audioPlayer",autoplay:""};function G(t,e,o,r,n,i){return g(),h("div",J,[K,c("button",{class:"ml-0",onClick:e[0]||(e[0]=(...s)=>r.toggleRecord&&r.toggleRecord(...s))},f(t.recoding?"\u505C\u6B62\u5F55\u97F3":"\u5F00\u59CB\u5F55\u97F3"),1),c("button",{disabled:!t.replayable,class:"disabled:cursor-not-allowed disabled:bg-indigo-100 disabled:text-indigo-300",onClick:e[1]||(e[1]=(...s)=>r.replay&&r.replay(...s))},f(t.replaying?"\u505C\u6B62":"\u64AD\u653E\u5F55\u97F3"),9,W),c("audio",z,null,512)])}var X=m(q,[["render",G]]);function Y(t,e){t.width=getComputedStyle(t).width.split("px")[0],t.height=getComputedStyle(t).height.split("px")[0];let o=Math.min(t.width/e.width,t.height/e.height),r=(t.width-e.width*o)/2,n=(t.height-e.height*o)/2;t.getContext("2d").clearRect(0,0,t.width,t.height),t.getContext("2d").drawImage(e,0,0,e.width,e.height,r,n,e.width*o,e.height*o)}function Z(t,e){let o,r,n,i;function s(d){const y=new ImageCapture(d);let v=0;const C={imageQueue:[],push(u){this.imageQueue.unshift(u),this.imageQueue.length>2&&this.imageQueue.pop()},async compare(){return this.imageQueue.length!==2?void 0:(await(await fetch("http://192.168.101.203:8010/facediff",{method:"POST",mode:"cors",headers:{"Content-Type":"application/json"},body:JSON.stringify({params:this.imageQueue.map(b=>({image:b.substring(22),image_type:"BASE64",face_type:"LIVE"}))})})).json()).score}};function L(){setTimeout(async()=>{if(v!==-1){const u=document.getElementById("snapshot"),b=await y.grabFrame();Y(u,b),C.push(u.toDataURL("image/png",1));const k=await C.compare();k&&(e.value=k),L()}},3e3)}function B(){clearTimeout(v),v=-1}return{start:L,destroy:B}}async function l(){o=await navigator.mediaDevices.getUserMedia({audio:!0,video:!0}),t.src=void 0,t.srcObject=o,n=[],r=new MediaRecorder(o),i=s(o.getVideoTracks()[0]),i.start(),r.ondataavailable=d=>n.push(d.data),r.start()}function a(){r.state=="recording",i.destroy();const d=document.getElementById("snapshot");d.getContext("2d").clearRect(0,0,d.width,d.height),o.getTracks().forEach(y=>y.stop()),setTimeout(()=>{t.srcObject=void 0,t.src=URL.createObjectURL(new Blob(n)),t.play()},100)}return{record:l,stop:a,destroy:()=>o=t=n=null}}const M={setup(){const t=p(null),e=p(0),o=T({recoding:!1});let r;return R(()=>r=Z(t.value,e)),D(()=>r.destroy()),w(_({},j(o)),{scoreRef:e,videoPlayer:t,toggleRecord:()=>{o.recoding?r.stop():r.record(),o.recoding=!o.recoding}})}},ee={class:"m-2 p-4 border-2 border-pink-100"},te=c("h2",{class:"text-3xl"},"web\u6444\u50CF",-1),oe={class:"grid grid-cols-3 gap-2"},re={class:"max-w-full",ref:"videoPlayer",autoplay:"",controls:""},ne=c("ul",null,[c("li",null,"\u81EA\u52A8\u622A\u56FE"),c("canvas",{id:"snapshot"})],-1);function ie(t,e,o,r,n,i){return g(),h("div",ee,[te,c("button",{class:"ml-0",onClick:e[0]||(e[0]=(...s)=>r.toggleRecord&&r.toggleRecord(...s))},f(t.recoding?"\u505C\u6B62\u6444\u50CF":"\u5F00\u59CB\u6444\u50CF"),1),c("div",oe,[c("video",re,null,512),ne,c("div",null,[c("h2",null,"\u76F8\u4F3C\u5EA6: "+f(r.scoreRef),1)])])])}var se=m(M,[["render",ie]]);function ce(){const t={event:void 0,recorded:[],push(n){this.recorded.push(n),this.event=n,clearTimeout(this.timer),this.timer=this.nextTick()},timer:-1,nextTick(){const n=setTimeout(()=>{this.timer===n&&alert(this.event)},100);return n}};function e(){document.visibilityState==="hidden"&&t.push("\u9875\u9762\u9690\u85CF")}function o(){t.push("\u9875\u9762\u5931\u53BB\u7126\u70B9")}function r(){console.log("focus")}return{recorded:t.recorded,on(){document.addEventListener("visibilitychange",e,!1),window.addEventListener("blur",o,!1),window.addEventListener("focus",r,!1)},off(){document.removeEventListener("visibilitychange",e),window.removeEventListener("blur",o),window.removeEventListener("focus",r)}}}const ae={setup(){const t=p(!1),e=ce(),o=r=>{var n="\u8981\u8BB0\u5F97\u4FDD\u5B58\uFF01\u4F60\u786E\u5B9A\u8981\u79BB\u5F00\u6211\u5417\uFF1F";return(r||window.event).returnValue=n,console.log(n),n};return Q(()=>{e.off(),window.removeEventListener("beforeunload",o)}),R(()=>{window.isCloseHint=!0,console.log(isCloseHint),window.addEventListener("beforeunload",o)}),{detecting:t,toggleDeteictive(){console.log(e.recorded),t.value?(t.value=!1,e.off()):(t.value=!0,e.on())}}}},de={class:"m-2 p-4 border-2 border-pink-100"},le=c("h2",{class:"text-3xl"},"\u79BB\u5C4F\u63A2\u6D4B",-1);function ue(t,e,o,r,n,i){return g(),h("div",de,[le,c("button",{class:"ml-0",onClick:e[0]||(e[0]=(...s)=>r.toggleDeteictive&&r.toggleDeteictive(...s))},f(r.detecting?"\u505C\u6B62\u63A2\u6D4B":"\u5F00\u59CB\u63A2\u6D4B"),1)])}var fe=m(ae,[["render",ue]]);const pe={components:{AudioDemo:X,WebcamDemo:se,OffScreenDetective:fe}},ge=c("input",{type:"text",style:{width:"300px",border:"1px solid pink"}},null,-1);function he(t,e,o,r,n,i){const s=x("audio-demo"),l=x("webcam-demo"),a=x("off-screen-detective");return g(),h(V,null,[$(s),$(l),$(a),ge],64)}var me=m(pe,[["render",he]]);F(me).mount("#app");
