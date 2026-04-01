const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/BlogLibraryPage-ChXCwn9a.js","assets/vendor-BZl5gVyz.js","assets/blogPosts-Diz1IUqp.js","assets/BlogPostPage-BcKTWhIe.js","assets/PortfolioPage-BeoIqUek.js","assets/AboutPage-CrqLbcs0.js","assets/ContactPage-CrSqI09v.js","assets/NotFoundPage-xVPk6QhT.js"])))=>i.map(i=>d[i]);
import{r as e,a as t,N as n,u as a,O as r,L as i,R as s,b as o,c,B as l}from"./vendor-BZl5gVyz.js";!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const n of e)if("childList"===n.type)for(const e of n.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&t(e)}).observe(document,{childList:!0,subtree:!0})}function t(e){if(e.ep)return;e.ep=!0;const t=function(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),"use-credentials"===e.crossOrigin?t.credentials="include":"anonymous"===e.crossOrigin?t.credentials="omit":t.credentials="same-origin",t}(e);fetch(e.href,t)}}();var d={exports:{}},h={},u=e,p=Symbol.for("react.element"),f=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,g=u.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,b={key:!0,ref:!0,__self:!0,__source:!0};function w(e,t,n){var a,r={},i=null,s=null;for(a in void 0!==n&&(i=""+n),void 0!==t.key&&(i=""+t.key),void 0!==t.ref&&(s=t.ref),t)m.call(t,a)&&!b.hasOwnProperty(a)&&(r[a]=t[a]);if(e&&e.defaultProps)for(a in t=e.defaultProps)void 0===r[a]&&(r[a]=t[a]);return{$$typeof:p,type:e,key:i,ref:s,props:r,_owner:g.current}}h.Fragment=f,h.jsx=w,h.jsxs=w,d.exports=h;var y=d.exports,v={},x=t;v.createRoot=x.createRoot,v.hydrateRoot=x.hydrateRoot;const I={},j=function(e,t,n){let a=Promise.resolve();if(t&&t.length>0){document.getElementsByTagName("link");const e=document.querySelector("meta[property=csp-nonce]"),n=e?.nonce||e?.getAttribute("nonce");a=Promise.allSettled(t.map(e=>{if((e=function(e){return"/"+e}(e))in I)return;I[e]=!0;const t=e.endsWith(".css"),a=t?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${e}"]${a}`))return;const r=document.createElement("link");return r.rel=t?"stylesheet":"modulepreload",t||(r.as="script"),r.crossOrigin="",r.href=e,n&&r.setAttribute("nonce",n),document.head.appendChild(r),t?new Promise((t,n)=>{r.addEventListener("load",t),r.addEventListener("error",()=>n(new Error(`Unable to preload CSS for ${e}`)))}):void 0}))}function r(e){const t=new Event("vite:preloadError",{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return a.then(t=>{for(const e of t||[])"rejected"===e.status&&r(e.reason);return e().catch(r)})};function E(t,n){const[a,r]=e.useState(()=>{if("undefined"==typeof window)return n;const e=window.localStorage.getItem(t);if(null===e)return n;try{return JSON.parse(e)}catch{return n}});return e.useEffect(()=>{window.localStorage.setItem(t,JSON.stringify(a))},[t,a]),[a,r]}const S=e.createContext(null);function _({children:t}){const[n,a]=E("kindle-theme","light"),[r,i]=E("kindle-font-scale",.95),[s,o]=E("kindle-bookmarks",[]);e.useEffect(()=>{document.body.dataset.theme=n},[n]);const c={theme:n,fontScale:r,bookmarks:s,increaseFontSize:()=>{i(e=>Math.min(1.1,Number((e+.05).toFixed(2))))},decreaseFontSize:()=>{i(e=>Math.max(.85,Number((e-.05).toFixed(2))))},toggleTheme:()=>{a(e=>"light"===e?"dark":"light")},toggleBookmark:e=>{o(t=>t.includes(e)?t.filter(t=>t!==e):[...t,e])},isBookmarked:e=>s.includes(e)};return y.jsx(S.Provider,{value:c,children:t})}function k(){const t=e.useContext(S);if(!t)throw new Error("useKindle must be used inside KindleProvider");return t}const C=[{label:"Home",to:"/"},{label:"Portfolio",to:"/portfolio"},{label:"Blog",to:"/blog"},{label:"About",to:"/about"},{label:"Contact",to:"/contact"}];function N(){return y.jsxs("svg",{viewBox:"0 0 24 24",focusable:"false","aria-hidden":"true",children:[y.jsx("circle",{cx:"12",cy:"12",r:"4.2",fill:"none",stroke:"currentColor",strokeWidth:"1.6"}),y.jsx("path",{d:"M12 2.8v2.5M12 18.7v2.5M21.2 12h-2.5M5.3 12H2.8M18.5 5.5l-1.8 1.8M7.3 16.7l-1.8 1.8M18.5 18.5l-1.8-1.8M7.3 7.3 5.5 5.5",fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5"})]})}function D(){return y.jsx("svg",{viewBox:"0 0 24 24",focusable:"false","aria-hidden":"true",children:y.jsx("path",{d:"M18.2 15.4a7.4 7.4 0 0 1-9.6-9.6 8.8 8.8 0 1 0 9.6 9.6Z",fill:"none",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.6"})})}function A(){const{theme:e,toggleTheme:t}=k();return y.jsxs("nav",{className:"kindle-nav","aria-label":"Primary site navigation",children:[y.jsx("span",{className:"nav-side-spacer","aria-hidden":"true"}),y.jsx("div",{className:"nav-link-list",children:C.map(e=>y.jsx(n,{className:({isActive:e})=>e?"kindle-nav-link active":"kindle-nav-link",end:"/"===e.to,to:e.to,children:e.label},e.to))}),y.jsx("button",{className:"nav-theme-toggle",onClick:t,type:"button","aria-label":"dark"===e?"Switch to light mode":"Switch to dark mode",title:"dark"===e?"Switch to light mode":"Switch to dark mode",children:"dark"===e?y.jsx(N,{}):y.jsx(D,{})})]})}function T({children:e}){const t=a();return y.jsx("div",{className:"page-transition",children:e},t.pathname)}const P=[{label:"Home",to:"/"},{label:"About",to:"/about"},{label:"Contact",to:"/contact"}];function M(){return y.jsxs("footer",{className:"site-footer","aria-label":"Site footer navigation",children:[y.jsx("nav",{className:"site-footer-nav",children:P.map(e=>y.jsx(n,{className:({isActive:e})=>e?"site-footer-link active":"site-footer-link",end:"/"===e.to,to:e.to,children:e.label},e.to))}),y.jsx("p",{className:"site-footer-copy",children:"© allenthomson.com"})]})}const L=[{label:"LinkedIn",href:"https://www.linkedin.com/in/allen-thomson-5b1309110/",icon:y.jsx("svg",{viewBox:"0 0 24 24",focusable:"false","aria-hidden":"true",children:y.jsx("path",{d:"M5.2 8.6h3.1V19H5.2zM6.8 4.8a1.8 1.8 0 1 1 0 3.6 1.8 1.8 0 0 1 0-3.6ZM10.4 8.6h3v1.4h.1c.4-.8 1.5-1.7 3.2-1.7 3.4 0 4 2.1 4 5V19h-3.1v-4.9c0-1.2 0-2.8-1.8-2.8s-2 1.3-2 2.7V19h-3.1z",fill:"currentColor"})})},{label:"Instagram",href:"https://www.instagram.com/allen.thomson7?igsh=OXlvZW8yanQ0NWR4",icon:y.jsxs("svg",{viewBox:"0 0 24 24",focusable:"false","aria-hidden":"true",children:[y.jsx("rect",{x:"4.2",y:"4.2",width:"15.6",height:"15.6",rx:"4.2",fill:"none",stroke:"currentColor",strokeWidth:"1.7"}),y.jsx("circle",{cx:"12",cy:"12",r:"3.8",fill:"none",stroke:"currentColor",strokeWidth:"1.7"}),y.jsx("circle",{cx:"17.2",cy:"6.8",r:"1",fill:"currentColor"})]})},{label:"LeetCode",href:"https://leetcode.com/u/AllenThomson/",icon:y.jsx("svg",{viewBox:"0 0 24 24",focusable:"false","aria-hidden":"true",children:y.jsx("path",{d:"M15.7 5.2 9.4 11.5a1 1 0 0 0 0 1.4l6.3 6.3M12.3 8.2H8.6a4.6 4.6 0 0 0 0 9.2h4.2",fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.7"})})},{label:"GitHub",href:"https://github.com/Allono07",icon:y.jsx("svg",{viewBox:"0 0 24 24",focusable:"false","aria-hidden":"true",children:y.jsx("path",{d:"M12 3.2a8.8 8.8 0 0 0-2.8 17.1c.4.1.5-.2.5-.4v-1.6c-2.2.5-2.7-1-2.7-1-.4-.9-.9-1.2-.9-1.2-.7-.5 0-.5 0-.5.8 0 1.2.8 1.2.8.7 1.2 1.8.8 2.2.6.1-.5.3-.8.5-1-1.8-.2-3.8-.9-3.8-4.1 0-.9.3-1.7.8-2.3-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.3.8a7.7 7.7 0 0 1 4.2 0c1.6-1 2.3-.8 2.3-.8.5 1.1.2 1.9.1 2.1.5.6.8 1.4.8 2.3 0 3.2-2 3.9-3.8 4.1.3.2.6.8.6 1.5v2.2c0 .2.1.5.5.4A8.8 8.8 0 0 0 12 3.2Z",fill:"currentColor"})})}];function B(){return y.jsx("aside",{className:"social-rail","aria-label":"Social links",children:L.map(e=>y.jsx("a",{className:"social-rail-link",href:e.href,rel:"noreferrer",target:"_blank","aria-label":e.label,title:e.label,children:e.icon},e.label))})}function O(e){return new Intl.DateTimeFormat([],{hour:"numeric",minute:"2-digit",hour12:!0}).format(e).replace(/\b(am|pm)\b/i,e=>e.toUpperCase())}function $(){const t=a(),n="/"===(r=t.pathname)?"Home":"/portfolio"===r?"Portfolio":"/blog"===r?"Library":r.startsWith("/blog/")?"Now Reading":"/about"===r?"About":"/contact"===r?"Contact":"Kindle Portfolio";var r;const[i,s]=e.useState(()=>O(new Date)),[o,c]=e.useState(72);e.useEffect(()=>{const e=window.setInterval(()=>{s(O(new Date))},1e3);return()=>window.clearInterval(e)},[]),e.useEffect(()=>{let e,t=()=>{},n=!0;const a=()=>{e&&n&&c(Math.round(100*e.level))};return(async()=>{if(!navigator.getBattery)return;if(e=await navigator.getBattery(),!n)return;a();const r=()=>a();e.addEventListener("levelchange",r),e.addEventListener("chargingchange",r),t=()=>{e.removeEventListener("levelchange",r),e.removeEventListener("chargingchange",r)}})(),()=>{n=!1,t()}},[]);const l=e.useMemo(()=>`${Math.max(8,Math.min(100,o))}%`,[o]);return y.jsxs("header",{className:"status-bar","aria-label":"Kindle device status bar",children:[y.jsx("span",{className:"status-time",children:i}),y.jsx("span",{className:"status-label",children:n||" "}),y.jsxs("div",{className:"status-icons",children:[y.jsx("span",{className:"wifi-icon","aria-hidden":"true",children:y.jsx("svg",{viewBox:"0 0 24 24",focusable:"false",children:y.jsx("path",{d:"M2.5 8.5a15.2 15.2 0 0 1 19 0M5.6 11.6a10.7 10.7 0 0 1 12.8 0M8.8 14.7a6.2 6.2 0 0 1 6.4 0M12 18.2h.01",fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.6"})})}),y.jsxs("span",{className:"signal-icon","aria-hidden":"true",children:[y.jsx("span",{className:"signal-bar signal-bar--one"}),y.jsx("span",{className:"signal-bar signal-bar--two"}),y.jsx("span",{className:"signal-bar signal-bar--three"}),y.jsx("span",{className:"signal-bar signal-bar--four"})]}),y.jsxs("span",{className:"battery-level",children:[o,"%"]}),y.jsxs("span",{className:"battery-icon","aria-label":`Battery at ${o} percent`,children:[y.jsx("span",{className:"battery-body",children:y.jsx("span",{className:"battery-fill",style:{width:l}})}),y.jsx("span",{className:"battery-cap"})]})]})]})}function F(){const e=a(),{fontScale:t}=k(),n=e.pathname.startsWith("/blog/")&&"/blog"!==e.pathname;return y.jsxs("div",{className:"app-shell",children:[y.jsxs("div",{className:"kindle-screen",style:{"--font-scale":t},children:[y.jsx($,{}),!n&&y.jsx(A,{}),y.jsx("main",{className:"screen-content "+(n?"reader-screen":""),children:y.jsx(T,{children:y.jsx(r,{})})})]}),y.jsx(B,{}),y.jsx(M,{})]})}const R=[{id:"trash-buddy",title:"Trash Buddy",year:"2025",preview:"backend",tech:"Node.js · PostgreSQL (PostGIS) · Redis · Socket.io · Flutter · Docker · Firebase",description:"A real-time waste vehicle tracking system that sends notifications when garbage collection vehicles are nearby, built with a live location pipeline and push-alert infrastructure.",simulationLink:"https://trash-buddy-simulation.vercel.app/",linkLabel:"View Demo >"},{id:"sonno",title:"Sonno Music Player",year:"2025",preview:"mobile",description:"A sleep-first music player that lets listeners fade audio out on a timer, schedule quiet hours, and keep playback controls simple enough for tired nights.",playStoreLink:"https://drive.google.com/file/d/1JFeMZl858jQ0tmwd5FtX6w6s2IqZxTiW/view",linkLabel:"Get on Play Store >"},{id:"attendance-composable",title:"Attendance Tracking Mobile Application",year:"2024",preview:"mobile",description:"A Jetpack Compose app paired with a Spring Boot backend to generate QR attendance passes, sync records in real time, and make classroom check-ins frictionless.",link:"https://github.com/Allono07/attendance_composable",linkLabel:"Read More >"},{id:"corpcon",title:"Corpcon Backend Application",year:"2024",preview:"backend",description:"A Kotlin and Spring Boot backend for the Corpcon web platform with Kafka-based event flow, cloud deployment, and the operational care required for a live system.",link:"https://corpcon.in/",linkLabel:"View Project >"},{id:"flutter-food",title:"Food Delivery App",year:"2023",preview:"mobile",description:"A Flutter delivery experience structured with MVVM, backed by Firebase authentication and Firestore, and focused on keeping browsing and ordering pleasantly direct.",link:"https://github.com/Allono07/restaurant_app_flutter",linkLabel:"Read More >"},{id:"autobill",title:"Automatic Billing Machine",year:"2022",preview:"hardware",description:"An IoT billing prototype using image recognition, load sensors, and Raspberry Pi hardware to identify products and turn physical checkout into a faster ritual.",link:"https://github.com/Allono07/autobillproject",linkLabel:"View Project >"}];function V({project:t}){const[n,a]=e.useState(!1);return t.simulationLink?y.jsxs("a",{"aria-label":`View demo for ${t.title}`,className:"demo-btn",href:t.simulationLink,rel:"noreferrer",target:"_blank",children:[y.jsx("svg",{"aria-hidden":"true",viewBox:"0 0 24 24",width:"11",height:"11",children:y.jsx("path",{d:"M8 5v14l11-7z",fill:"currentColor"})}),"View Demo"]}):t.playStoreLink?y.jsxs(y.Fragment,{children:[y.jsxs("button",{"aria-label":`Download ${t.title} on Google Play`,className:"play-store-link",onClick:()=>a(!0),title:"Available on Google Play (Testing)",type:"button",children:[y.jsx("svg",{"aria-hidden":"true",viewBox:"0 0 24 24",width:"15",height:"15",children:y.jsx("path",{d:"M3.18 23.76a2 2 0 0 1-.88-.88V1.12A2 2 0 0 1 3.18.24L13.94 11 3.18 23.76ZM5.06 1.42 16.3 9.17l-2.9 2.9L5.06 1.42Zm0 21.16 8.34-10.65 2.9 2.9L5.06 22.58ZM17.36 16.7l2.48-1.42a1.6 1.6 0 0 0 0-2.56l-2.48-1.42-3.1 3.1 3.1 3.3Z",fill:"currentColor"})}),y.jsxs("span",{className:"play-store-label",children:[y.jsx("span",{className:"play-store-sub",children:"GET IT ON"}),y.jsx("span",{className:"play-store-main",children:"Google Play"})]})]}),n&&y.jsx("div",{className:"modal-overlay",role:"dialog","aria-modal":"true","aria-labelledby":"modal-title",children:y.jsxs("div",{className:"modal-box",children:[y.jsx("div",{className:"modal-icon",children:y.jsx("svg",{viewBox:"0 0 24 24",width:"32",height:"32","aria-hidden":"true",children:y.jsx("path",{d:"M3.18 23.76a2 2 0 0 1-.88-.88V1.12A2 2 0 0 1 3.18.24L13.94 11 3.18 23.76ZM5.06 1.42 16.3 9.17l-2.9 2.9L5.06 1.42Zm0 21.16 8.34-10.65 2.9 2.9L5.06 22.58ZM17.36 16.7l2.48-1.42a1.6 1.6 0 0 0 0-2.56l-2.48-1.42-3.1 3.1 3.1 3.3Z",fill:"currentColor"})})}),y.jsx("h3",{id:"modal-title",className:"modal-title",children:"App in Testing Phase"}),y.jsxs("p",{className:"modal-body",children:[y.jsx("strong",{children:"Sonno Music Player"})," is currently in the"," ",y.jsx("strong",{children:"Google Play testing phase"})," and is not yet publicly available on the Play Store."]}),y.jsx("p",{className:"modal-body",children:"You can download the APK directly and install it on your Android device."}),y.jsxs("div",{className:"modal-actions",children:[y.jsx("button",{className:"modal-btn modal-btn--cancel",onClick:()=>a(!1),type:"button",children:"Cancel"}),y.jsx("a",{className:"modal-btn modal-btn--ok",href:t.playStoreLink,onClick:()=>a(!1),rel:"noreferrer",target:"_blank",children:"Download APK"})]})]})})]}):t.link?y.jsx("a",{"aria-label":`Open ${t.title}`,className:"project-icon-link",href:t.link,rel:"noreferrer",target:"_blank",title:`Open ${t.title}`,children:y.jsx("svg",{"aria-hidden":"true",viewBox:"0 0 24 24",children:y.jsx("path",{d:"M12 .5A11.5 11.5 0 0 0 .5 12.2a11.7 11.7 0 0 0 7.9 11.1c.6.1.8-.3.8-.6v-2.1c-3.2.7-3.9-1.4-3.9-1.4-.5-1.4-1.3-1.8-1.3-1.8-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.4-5.3-6 0-1.3.4-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.2 1.2a10.7 10.7 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.7 1.7.2 2.9.1 3.2.7.8 1.2 1.9 1.2 3.2 0 4.7-2.8 5.7-5.5 6 .4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6a11.7 11.7 0 0 0 7.9-11.1A11.5 11.5 0 0 0 12 .5Z",fill:"currentColor"})})}):null}const H=[{id:"unbxd-backend",role:"Software Engineer - Backend",company:"Unbxd",period:"Mar 2026 - Present",summary:"Developing and maintaining backend services.",details:["Just Getting Started!!"]},{id:"netcore-mobile",role:"Software Engineer - Mobile",company:"Netcore Cloud",period:"Sep 2024 - Feb 2026",summary:"Building mobile SDK and tooling experiences across Android, Flutter, React Native, and internal support workflows.",details:["Worked across Android, Flutter, and React Native integration flows to improve SDK implementation quality and developer confidence.","Contributed to internal tooling and support workflows that made technical troubleshooting faster and more dependable.","Focused on creating smoother onboarding and integration experiences for teams adopting mobile capabilities at scale."]},{id:"webengage-tam",role:"Technical Account Manager",company:"WebEngage",period:"Sep 2023 - Sep 2024",summary:"Worked closely with customers on integrations, technical strategy, and product adoption for large-scale implementations.",details:["Partnered with customers on technical planning, implementation decisions, and product rollout strategy.","Supported large-scale onboarding efforts by translating product requirements into practical integration steps.","Balanced client-facing communication with hands-on technical problem solving to keep adoption moving forward."]},{id:"webengage-support",role:"Product Support Engineer",company:"WebEngage",period:"Dec 2022 - Sep 2023",summary:"Resolved SDK integration issues across web and mobile while improving onboarding and documentation quality.",details:["Diagnosed and resolved SDK integration issues across web and mobile environments with a strong focus on reliability.","Improved onboarding clarity through better documentation, repeatable troubleshooting, and implementation guidance.","Worked closely with teams to reduce friction during setup and help customers reach successful adoption faster."]}];function z({items:t,initialOpenId:n=null}){const[a,r]=e.useState(n);return y.jsx("div",{className:"experience-tree",children:t.map((e,t)=>{const n=a===e.id,i=`experience-panel-${e.id}`,s=t%2==0?"left":"right";return y.jsx("article",{className:`experience-tree-item experience-tree-item--${s}${n?" is-open":""}`,children:y.jsxs("div",{className:"experience-tree-node",children:[y.jsxs("div",{className:"experience-heading",children:[y.jsxs("div",{className:"experience-heading-copy",children:[y.jsx("h3",{children:e.role}),y.jsxs("p",{className:"experience-meta",children:[e.company," · ",e.period]})]}),y.jsxs("button",{"aria-controls":i,"aria-expanded":n,className:"text-button experience-toggle",onClick:()=>r(n?null:e.id),type:"button",children:[y.jsx("span",{children:n?"Hide details":"Read more"}),y.jsx("span",{"aria-hidden":"true",className:"experience-toggle-icon"})]})]}),y.jsx("p",{className:"experience-summary",children:e.summary}),y.jsx("div",{className:"experience-panel"+(n?" is-open":""),id:i,children:y.jsx("div",{className:"experience-panel-inner",children:y.jsx("ul",{className:"experience-details",children:e.details.map(e=>y.jsx("li",{children:e},e))})})})]})},e.id)})})}const W=[{title:"A Cost-Effective NFC-Based Tap-and-Pay Payment System",date:"Sep 2025",venue:"IEEE ICWITE 2025",location:"Bengaluru, India",highlights:["Paper accepted for oral presentation at IEEE International Conference for Women in Innovation, Technology & Entrepreneurship (ICWITE 2025).","Submission ID: 741, Status: Accepted"]}];function U(){const e=R.slice(0,4);return y.jsxs("section",{className:"page page-home",children:[y.jsxs("section",{className:"home-hero",children:[y.jsxs("div",{className:"home-hero-copy",children:[y.jsxs("header",{className:"home-heading",children:[y.jsx("h1",{className:"portfolio-name",children:"Allen Thomson"}),y.jsx("p",{className:"portfolio-role",children:"Software Engineer"})]}),y.jsx("div",{className:"ink-rule"}),y.jsxs("div",{className:"intro-row",children:[y.jsx("div",{className:"portrait-shell",children:y.jsx("img",{className:"portrait-image",src:"/assets/allen-BxzZcpJd.webp",alt:"Allen Thomson portrait"})}),y.jsx("p",{className:"intro-copy",children:"Hello! I'm Allen, a software engineer. I love to build and solve problems."})]})]}),y.jsx("aside",{className:"hero-art-panel","aria-label":"Engineering animation",children:y.jsx("video",{autoPlay:!0,className:"hero-art-media",loop:!0,muted:!0,playsInline:!0,preload:"auto",children:y.jsx("source",{src:"/assets/engineeringvideo-Da6Aifq_.webm",type:"video/mp4"})})})]}),y.jsx("div",{className:"ink-rule"}),y.jsxs("section",{className:"home-section",children:[y.jsx("h2",{className:"section-title",children:"Work Experience"}),y.jsx(z,{items:H})]}),y.jsx("div",{className:"ink-rule"}),y.jsxs("section",{className:"home-section",children:[y.jsx("h2",{className:"section-title",children:"Featured Projects"}),y.jsx("div",{className:"feature-list feature-list--compact",children:e.map(e=>y.jsx("article",{className:"feature-row feature-row--compact feature-row--text-only",children:y.jsxs("div",{className:"feature-copy",children:[y.jsx("h3",{children:e.title}),y.jsx("p",{children:e.description}),y.jsx(V,{project:e})]})},e.id))}),y.jsx("div",{className:"view-more-row",children:y.jsx(i,{className:"text-link",to:"/portfolio",children:"View More Projects >"})})]}),y.jsx("div",{className:"ink-rule"}),y.jsxs("section",{className:"home-section",children:[y.jsx("h2",{className:"section-title",children:"Research and Publications"}),y.jsx("div",{className:"research-list",children:W.map(e=>y.jsxs("article",{className:"research-item",children:[y.jsxs("div",{className:"research-heading",children:[y.jsx("h3",{children:e.title}),y.jsx("p",{className:"research-meta",children:e.date})]}),y.jsxs("p",{className:"research-submeta",children:[e.venue," · ",e.location]}),y.jsx("ul",{className:"research-highlights",children:e.highlights.map(e=>y.jsx("li",{children:e},e))})]},e.title))})]}),y.jsxs("div",{className:"home-panels",children:[y.jsxs("article",{className:"home-panel",children:[y.jsx("h2",{children:"About Me"}),y.jsx("p",{children:"Learn more about how I work across mobile, backend, and developer experience projects."}),y.jsx(i,{className:"text-link",to:"/about",children:"Read More >"})]}),y.jsxs("article",{className:"home-panel",children:[y.jsx("h2",{children:"Contact Me"}),y.jsx("p",{children:"Reach out for product engineering, backend work, or collaboration on thoughtful software."}),y.jsx(i,{className:"text-link",to:"/contact",children:"Get In Touch >"})]})]})]})}var q={};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const K=function(e){const t=[];let n=0;for(let a=0;a<e.length;a++){let r=e.charCodeAt(a);r<128?t[n++]=r:r<2048?(t[n++]=r>>6|192,t[n++]=63&r|128):55296==(64512&r)&&a+1<e.length&&56320==(64512&e.charCodeAt(a+1))?(r=65536+((1023&r)<<10)+(1023&e.charCodeAt(++a)),t[n++]=r>>18|240,t[n++]=r>>12&63|128,t[n++]=r>>6&63|128,t[n++]=63&r|128):(t[n++]=r>>12|224,t[n++]=r>>6&63|128,t[n++]=63&r|128)}return t},G={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:"function"==typeof atob,encodeByteArray(e,t){if(!Array.isArray(e))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,a=[];for(let r=0;r<e.length;r+=3){const t=e[r],i=r+1<e.length,s=i?e[r+1]:0,o=r+2<e.length,c=o?e[r+2]:0,l=t>>2,d=(3&t)<<4|s>>4;let h=(15&s)<<2|c>>6,u=63&c;o||(u=64,i||(h=64)),a.push(n[l],n[d],n[h],n[u])}return a.join("")},encodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(e):this.encodeByteArray(K(e),t)},decodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(e):function(e){const t=[];let n=0,a=0;for(;n<e.length;){const r=e[n++];if(r<128)t[a++]=String.fromCharCode(r);else if(r>191&&r<224){const i=e[n++];t[a++]=String.fromCharCode((31&r)<<6|63&i)}else if(r>239&&r<365){const i=((7&r)<<18|(63&e[n++])<<12|(63&e[n++])<<6|63&e[n++])-65536;t[a++]=String.fromCharCode(55296+(i>>10)),t[a++]=String.fromCharCode(56320+(1023&i))}else{const i=e[n++],s=e[n++];t[a++]=String.fromCharCode((15&r)<<12|(63&i)<<6|63&s)}}return t.join("")}(this.decodeStringToByteArray(e,t))},decodeStringToByteArray(e,t){this.init_();const n=t?this.charToByteMapWebSafe_:this.charToByteMap_,a=[];for(let r=0;r<e.length;){const t=n[e.charAt(r++)],i=r<e.length?n[e.charAt(r)]:0;++r;const s=r<e.length?n[e.charAt(r)]:64;++r;const o=r<e.length?n[e.charAt(r)]:64;if(++r,null==t||null==i||null==s||null==o)throw new Z;const c=t<<2|i>>4;if(a.push(c),64!==s){const e=i<<4&240|s>>2;if(a.push(e),64!==o){const e=s<<6&192|o;a.push(e)}}}return a},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let e=0;e<this.ENCODED_VALS.length;e++)this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e),this.charToByteMap_[this.byteToCharMap_[e]]=e,this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e,e>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e)}}};class Z extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const J=function(e){return function(e){const t=K(e);return G.encodeByteArray(t,!0)}(e).replace(/\./g,"")};
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Q=()=>
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function(){if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;if("undefined"!=typeof global)return global;throw new Error("Unable to locate global object.")}().__FIREBASE_DEFAULTS__,X=()=>{if("undefined"==typeof document)return;let e;try{e=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch(n){return}const t=e&&function(e){try{return G.decodeString(e,!0)}catch(n){}return null}(e[1]);return t&&JSON.parse(t)},Y=()=>{try{return Q()||(()=>{if("undefined"==typeof process)return;const e=q.__FIREBASE_DEFAULTS__;return e?JSON.parse(e):void 0})()||X()}catch(e){return}},ee=()=>Y()?.config;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class te{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,n)=>{t?this.reject(t):this.resolve(n),"function"==typeof e&&(this.promise.catch(()=>{}),1===e.length?e(t):e(t,n))}}}function ne(){const e="object"==typeof chrome?chrome.runtime:"object"==typeof browser?browser.runtime:void 0;return"object"==typeof e&&void 0!==e.id}function ae(){try{return"object"==typeof indexedDB}catch(e){return!1}}function re(){return new Promise((e,t)=>{try{let n=!0;const a="validate-browser-context-for-indexeddb-analytics-module",r=self.indexedDB.open(a);r.onsuccess=()=>{r.result.close(),n||self.indexedDB.deleteDatabase(a),e(!0)},r.onupgradeneeded=()=>{n=!1},r.onerror=()=>{t(r.error?.message||"")}}catch(n){t(n)}})}function ie(){return!("undefined"==typeof navigator||!navigator.cookieEnabled)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class se extends Error{constructor(e,t,n){super(t),this.code=e,this.customData=n,this.name="FirebaseError",Object.setPrototypeOf(this,se.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,oe.prototype.create)}}class oe{constructor(e,t,n){this.service=e,this.serviceName=t,this.errors=n}create(e,...t){const n=t[0]||{},a=`${this.service}/${e}`,r=this.errors[e],i=r?function(e,t){return e.replace(ce,(e,n)=>{const a=t[n];return null!=a?String(a):`<${n}?>`})}(r,n):"Error",s=`${this.serviceName}: ${i} (${a}).`;return new se(a,s,n)}}const ce=/\{\$([^}]+)}/g;function le(e,t){if(e===t)return!0;const n=Object.keys(e),a=Object.keys(t);for(const r of n){if(!a.includes(r))return!1;const n=e[r],i=t[r];if(de(n)&&de(i)){if(!le(n,i))return!1}else if(n!==i)return!1}for(const r of a)if(!n.includes(r))return!1;return!0}function de(e){return null!==e&&"object"==typeof e}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function he(e,t=1e3,n=2){const a=t*Math.pow(n,e),r=Math.round(.5*a*(Math.random()-.5)*2);return Math.min(144e5,a+r)}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ue(e){return e&&e._delegate?e._delegate:e}class pe{constructor(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fe="[DEFAULT]";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class me{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const e=new te;if(this.instancesDeferred.set(t,e),this.isInitialized(t)||this.shouldAutoInitialize())try{const n=this.getOrInitializeService({instanceIdentifier:t});n&&e.resolve(n)}catch(n){}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e?.identifier),n=e?.optional??!1;if(!this.isInitialized(t)&&!this.shouldAutoInitialize()){if(n)return null;throw Error(`Service ${this.name} is not available`)}try{return this.getOrInitializeService({instanceIdentifier:t})}catch(a){if(n)return null;throw a}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,this.shouldAutoInitialize()){if(function(e){return"EAGER"===e.instantiationMode}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e))try{this.getOrInitializeService({instanceIdentifier:fe})}catch(t){}for(const[e,n]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(e);try{const e=this.getOrInitializeService({instanceIdentifier:a});n.resolve(e)}catch(t){}}}}clearInstance(e=fe){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(e=>"INTERNAL"in e).map(e=>e.INTERNAL.delete()),...e.filter(e=>"_delete"in e).map(e=>e._delete())])}isComponentSet(){return null!=this.component}isInitialized(e=fe){return this.instances.has(e)}getOptions(e=fe){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,n=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const a=this.getOrInitializeService({instanceIdentifier:n,options:t});for(const[r,i]of this.instancesDeferred.entries()){n===this.normalizeInstanceIdentifier(r)&&i.resolve(a)}return a}onInit(e,t){const n=this.normalizeInstanceIdentifier(t),a=this.onInitCallbacks.get(n)??new Set;a.add(e),this.onInitCallbacks.set(n,a);const r=this.instances.get(n);return r&&e(r,n),()=>{a.delete(e)}}invokeOnInitCallbacks(e,t){const n=this.onInitCallbacks.get(t);if(n)for(const a of n)try{a(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let n=this.instances.get(e);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:(a=e,a===fe?void 0:a),options:t}),this.instances.set(e,n),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(n,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,n)}catch{}var a;return n||null}normalizeInstanceIdentifier(e=fe){return this.component?this.component.multipleInstances?e:fe:e}shouldAutoInitialize(){return!!this.component&&"EXPLICIT"!==this.component.instantiationMode}}class ge{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new me(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var be,we;(we=be||(be={}))[we.DEBUG=0]="DEBUG",we[we.VERBOSE=1]="VERBOSE",we[we.INFO=2]="INFO",we[we.WARN=3]="WARN",we[we.ERROR=4]="ERROR",we[we.SILENT=5]="SILENT";const ye={debug:be.DEBUG,verbose:be.VERBOSE,info:be.INFO,warn:be.WARN,error:be.ERROR,silent:be.SILENT},ve=be.INFO,xe={[be.DEBUG]:"log",[be.VERBOSE]:"log",[be.INFO]:"info",[be.WARN]:"warn",[be.ERROR]:"error"},Ie=(e,t,...n)=>{if(t<e.logLevel)return;(new Date).toISOString();if(!xe[t])throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)};class je{constructor(e){this.name=e,this._logLevel=ve,this._logHandler=Ie,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in be))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel="string"==typeof e?ye[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if("function"!=typeof e)throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,be.DEBUG,...e),this._logHandler(this,be.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,be.VERBOSE,...e),this._logHandler(this,be.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,be.INFO,...e),this._logHandler(this,be.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,be.WARN,...e),this._logHandler(this,be.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,be.ERROR,...e),this._logHandler(this,be.ERROR,...e)}}let Ee,Se;const _e=new WeakMap,ke=new WeakMap,Ce=new WeakMap,Ne=new WeakMap,De=new WeakMap;let Ae={get(e,t,n){if(e instanceof IDBTransaction){if("done"===t)return ke.get(e);if("objectStoreNames"===t)return e.objectStoreNames||Ce.get(e);if("store"===t)return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return Me(e[t])},set:(e,t,n)=>(e[t]=n,!0),has:(e,t)=>e instanceof IDBTransaction&&("done"===t||"store"===t)||t in e};function Te(e){return e!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(Se||(Se=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(e)?function(...t){return e.apply(Le(this),t),Me(_e.get(this))}:function(...t){return Me(e.apply(Le(this),t))}:function(t,...n){const a=e.call(Le(this),t,...n);return Ce.set(a,t.sort?t.sort():[t]),Me(a)}}function Pe(e){return"function"==typeof e?Te(e):(e instanceof IDBTransaction&&function(e){if(ke.has(e))return;const t=new Promise((t,n)=>{const a=()=>{e.removeEventListener("complete",r),e.removeEventListener("error",i),e.removeEventListener("abort",i)},r=()=>{t(),a()},i=()=>{n(e.error||new DOMException("AbortError","AbortError")),a()};e.addEventListener("complete",r),e.addEventListener("error",i),e.addEventListener("abort",i)});ke.set(e,t)}(e),t=e,(Ee||(Ee=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])).some(e=>t instanceof e)?new Proxy(e,Ae):e);var t}function Me(e){if(e instanceof IDBRequest)return function(e){const t=new Promise((t,n)=>{const a=()=>{e.removeEventListener("success",r),e.removeEventListener("error",i)},r=()=>{t(Me(e.result)),a()},i=()=>{n(e.error),a()};e.addEventListener("success",r),e.addEventListener("error",i)});return t.then(t=>{t instanceof IDBCursor&&_e.set(t,e)}).catch(()=>{}),De.set(t,e),t}(e);if(Ne.has(e))return Ne.get(e);const t=Pe(e);return t!==e&&(Ne.set(e,t),De.set(t,e)),t}const Le=e=>De.get(e);function Be(e,t,{blocked:n,upgrade:a,blocking:r,terminated:i}={}){const s=indexedDB.open(e,t),o=Me(s);return a&&s.addEventListener("upgradeneeded",e=>{a(Me(s.result),e.oldVersion,e.newVersion,Me(s.transaction),e)}),n&&s.addEventListener("blocked",e=>n(e.oldVersion,e.newVersion,e)),o.then(e=>{i&&e.addEventListener("close",()=>i()),r&&e.addEventListener("versionchange",e=>r(e.oldVersion,e.newVersion,e))}).catch(()=>{}),o}const Oe=["get","getKey","getAll","getAllKeys","count"],$e=["put","add","delete","clear"],Fe=new Map;function Re(e,t){if(!(e instanceof IDBDatabase)||t in e||"string"!=typeof t)return;if(Fe.get(t))return Fe.get(t);const n=t.replace(/FromIndex$/,""),a=t!==n,r=$e.includes(n);if(!(n in(a?IDBIndex:IDBObjectStore).prototype)||!r&&!Oe.includes(n))return;const i=async function(e,...t){const i=this.transaction(e,r?"readwrite":"readonly");let s=i.store;return a&&(s=s.index(t.shift())),(await Promise.all([s[n](...t),r&&i.done]))[0]};return Fe.set(t,i),i}Ae=(e=>({...e,get:(t,n,a)=>Re(t,n)||e.get(t,n,a),has:(t,n)=>!!Re(t,n)||e.has(t,n)}))(Ae);
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Ve{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(e=>{if(function(e){const t=e.getComponent();return"VERSION"===t?.type}(e)){const t=e.getImmediate();return`${t.library}/${t.version}`}return null}).filter(e=>e).join(" ")}}const He="@firebase/app",ze="0.14.10",We=new je("@firebase/app"),Ue="@firebase/app-compat",qe="@firebase/analytics-compat",Ke="@firebase/analytics",Ge="@firebase/app-check-compat",Ze="@firebase/app-check",Je="@firebase/auth",Qe="@firebase/auth-compat",Xe="@firebase/database",Ye="@firebase/data-connect",et="@firebase/database-compat",tt="@firebase/functions",nt="@firebase/functions-compat",at="@firebase/installations",rt="@firebase/installations-compat",it="@firebase/messaging",st="@firebase/messaging-compat",ot="@firebase/performance",ct="@firebase/performance-compat",lt="@firebase/remote-config",dt="@firebase/remote-config-compat",ht="@firebase/storage",ut="@firebase/storage-compat",pt="@firebase/firestore",ft="@firebase/ai",mt="@firebase/firestore-compat",gt="firebase",bt="[DEFAULT]",wt={[He]:"fire-core",[Ue]:"fire-core-compat",[Ke]:"fire-analytics",[qe]:"fire-analytics-compat",[Ze]:"fire-app-check",[Ge]:"fire-app-check-compat",[Je]:"fire-auth",[Qe]:"fire-auth-compat",[Xe]:"fire-rtdb",[Ye]:"fire-data-connect",[et]:"fire-rtdb-compat",[tt]:"fire-fn",[nt]:"fire-fn-compat",[at]:"fire-iid",[rt]:"fire-iid-compat",[it]:"fire-fcm",[st]:"fire-fcm-compat",[ot]:"fire-perf",[ct]:"fire-perf-compat",[lt]:"fire-rc",[dt]:"fire-rc-compat",[ht]:"fire-gcs",[ut]:"fire-gcs-compat",[pt]:"fire-fst",[mt]:"fire-fst-compat",[ft]:"fire-vertex","fire-js":"fire-js",[gt]:"fire-js-all"},yt=new Map,vt=new Map,xt=new Map;function It(e,t){try{e.container.addComponent(t)}catch(n){We.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`,n)}}function jt(e){const t=e.name;if(xt.has(t))return We.debug(`There were multiple attempts to register component ${t}.`),!1;xt.set(t,e);for(const n of yt.values())It(n,e);for(const n of vt.values())It(n,e);return!0}function Et(e,t){const n=e.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),e.container.getProvider(t)}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const St=new oe("app","Firebase",{"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."});
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class _t{constructor(e,t,n){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new pe("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw St.create("app-deleted",{appName:this._name})}}function kt(e,t={}){let n=e;if("object"!=typeof t){t={name:t}}const a={name:bt,automaticDataCollectionEnabled:!0,...t},r=a.name;if("string"!=typeof r||!r)throw St.create("bad-app-name",{appName:String(r)});if(n||(n=ee()),!n)throw St.create("no-options");const i=yt.get(r);if(i){if(le(n,i.options)&&le(a,i.config))return i;throw St.create("duplicate-app",{appName:r})}const s=new ge(r);for(const c of xt.values())s.addComponent(c);const o=new _t(n,a,s);return yt.set(r,o),o}function Ct(e,t,n){let a=wt[e]??e;n&&(a+=`-${n}`);const r=a.match(/\s|\//),i=t.match(/\s|\//);if(r||i){const e=[`Unable to register library "${a}" with version "${t}":`];return r&&e.push(`library name "${a}" contains illegal characters (whitespace or "/")`),r&&i&&e.push("and"),i&&e.push(`version name "${t}" contains illegal characters (whitespace or "/")`),void We.warn(e.join(" "))}jt(new pe(`${a}-version`,()=>({library:a,version:t}),"VERSION"))}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nt="firebase-heartbeat-store";let Dt=null;function At(){return Dt||(Dt=Be("firebase-heartbeat-database",1,{upgrade:(e,t)=>{if(0===t)try{e.createObjectStore(Nt)}catch(n){}}}).catch(e=>{throw St.create("idb-open",{originalErrorMessage:e.message})})),Dt}async function Tt(e,t){try{const n=(await At()).transaction(Nt,"readwrite"),a=n.objectStore(Nt);await a.put(t,Pt(e)),await n.done}catch(n){if(n instanceof se)We.warn(n.message);else{const e=St.create("idb-set",{originalErrorMessage:n?.message});We.warn(e.message)}}}function Pt(e){return`${e.name}!${e.options.appId}`}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mt{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new Bt(t),this._heartbeatsCachePromise=this._storage.read().then(e=>(this._heartbeatsCache=e,e))}async triggerHeartbeat(){try{const e=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),t=Lt();if(null==this._heartbeatsCache?.heartbeats&&(this._heartbeatsCache=await this._heartbeatsCachePromise,null==this._heartbeatsCache?.heartbeats))return;if(this._heartbeatsCache.lastSentHeartbeatDate===t||this._heartbeatsCache.heartbeats.some(e=>e.date===t))return;if(this._heartbeatsCache.heartbeats.push({date:t,agent:e}),this._heartbeatsCache.heartbeats.length>30){const e=function(e){if(0===e.length)return-1;let t=0,n=e[0].date;for(let a=1;a<e.length;a++)e[a].date<n&&(n=e[a].date,t=a);return t}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(e,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){We.warn(e)}}async getHeartbeatsHeader(){try{if(null===this._heartbeatsCache&&await this._heartbeatsCachePromise,null==this._heartbeatsCache?.heartbeats||0===this._heartbeatsCache.heartbeats.length)return"";const e=Lt(),{heartbeatsToSend:t,unsentEntries:n}=function(e,t=1024){const n=[];let a=e.slice();for(const r of e){const e=n.find(e=>e.agent===r.agent);if(e){if(e.dates.push(r.date),Ot(n)>t){e.dates.pop();break}}else if(n.push({agent:r.agent,dates:[r.date]}),Ot(n)>t){n.pop();break}a=a.slice(1)}return{heartbeatsToSend:n,unsentEntries:a}}(this._heartbeatsCache.heartbeats),a=J(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,n.length>0?(this._heartbeatsCache.heartbeats=n,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),a}catch(e){return We.warn(e),""}}}function Lt(){return(new Date).toISOString().substring(0,10)}class Bt{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return!!ae()&&re().then(()=>!0).catch(()=>!1)}async read(){if(await this._canUseIndexedDBPromise){const e=await async function(e){try{const t=(await At()).transaction(Nt),n=await t.objectStore(Nt).get(Pt(e));return await t.done,n}catch(t){if(t instanceof se)We.warn(t.message);else{const e=St.create("idb-get",{originalErrorMessage:t?.message});We.warn(e.message)}}}(this.app);return e?.heartbeats?e:{heartbeats:[]}}return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const t=await this.read();return Tt(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??t.lastSentHeartbeatDate,heartbeats:e.heartbeats})}}async add(e){if(await this._canUseIndexedDBPromise){const t=await this.read();return Tt(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??t.lastSentHeartbeatDate,heartbeats:[...t.heartbeats,...e.heartbeats]})}}}function Ot(e){return J(JSON.stringify({version:2,heartbeats:e})).length}var $t;$t="",jt(new pe("platform-logger",e=>new Ve(e),"PRIVATE")),jt(new pe("heartbeat",e=>new Mt(e),"PRIVATE")),Ct(He,ze,$t),Ct(He,ze,"esm2020"),Ct("fire-js","");
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Ct("firebase","12.11.0","app");const Ft="@firebase/installations",Rt="0.6.21",Vt=1e4,Ht=`w:${Rt}`,zt="FIS_v2",Wt=36e5,Ut=new oe("installations","Installations",{"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."});function qt(e){return e instanceof se&&e.code.includes("request-failed")}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kt({projectId:e}){return`https://firebaseinstallations.googleapis.com/v1/projects/${e}/installations`}function Gt(e){return{token:e.token,requestStatus:2,expiresIn:(t=e.expiresIn,Number(t.replace("s","000"))),creationTime:Date.now()};var t}async function Zt(e,t){const n=(await t.json()).error;return Ut.create("request-failed",{requestName:e,serverCode:n.code,serverMessage:n.message,serverStatus:n.status})}function Jt({apiKey:e}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e})}function Qt(e,{refreshToken:t}){const n=Jt(e);return n.append("Authorization",function(e){return`${zt} ${e}`}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(t)),n}async function Xt(e){const t=await e();return t.status>=500&&t.status<600?e():t}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Yt(e){return new Promise(t=>{setTimeout(t,e)})}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const en=/^[cdef][\w-]{21}$/;function tn(){try{const e=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(e),e[0]=112+e[0]%16;const t=function(e){const t=(n=e,btoa(String.fromCharCode(...n)).replace(/\+/g,"-").replace(/\//g,"_"));var n;return t.substr(0,22)}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e);return en.test(t)?t:""}catch{return""}}function nn(e){return`${e.appName}!${e.appId}`}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const an=new Map;function rn(e,t){const n=nn(e);sn(n,t),function(e,t){const n=function(){!on&&"BroadcastChannel"in self&&(on=new BroadcastChannel("[Firebase] FID Change"),on.onmessage=e=>{sn(e.data.key,e.data.fid)});return on}();n&&n.postMessage({key:e,fid:t});0===an.size&&on&&(on.close(),on=null)}(n,t)}function sn(e,t){const n=an.get(e);if(n)for(const a of n)a(t)}let on=null;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const cn="firebase-installations-store";let ln=null;function dn(){return ln||(ln=Be("firebase-installations-database",1,{upgrade:(e,t)=>{if(0===t)e.createObjectStore(cn)}})),ln}async function hn(e,t){const n=nn(e),a=(await dn()).transaction(cn,"readwrite"),r=a.objectStore(cn),i=await r.get(n);return await r.put(t,n),await a.done,i&&i.fid===t.fid||rn(e,t.fid),t}async function un(e){const t=nn(e),n=(await dn()).transaction(cn,"readwrite");await n.objectStore(cn).delete(t),await n.done}async function pn(e,t){const n=nn(e),a=(await dn()).transaction(cn,"readwrite"),r=a.objectStore(cn),i=await r.get(n),s=t(i);return void 0===s?await r.delete(n):await r.put(s,n),await a.done,!s||i&&i.fid===s.fid||rn(e,s.fid),s}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function fn(e){let t;const n=await pn(e.appConfig,n=>{const a=function(e){const t=e||{fid:tn(),registrationStatus:0};return bn(t)}(n),r=function(e,t){if(0===t.registrationStatus){if(!navigator.onLine){return{installationEntry:t,registrationPromise:Promise.reject(Ut.create("app-offline"))}}const n={fid:t.fid,registrationStatus:1,registrationTime:Date.now()},a=async function(e,t){try{const n=await async function({appConfig:e,heartbeatServiceProvider:t},{fid:n}){const a=Kt(e),r=Jt(e),i=t.getImmediate({optional:!0});if(i){const e=await i.getHeartbeatsHeader();e&&r.append("x-firebase-client",e)}const s={fid:n,authVersion:zt,appId:e.appId,sdkVersion:Ht},o={method:"POST",headers:r,body:JSON.stringify(s)},c=await Xt(()=>fetch(a,o));if(c.ok){const e=await c.json();return{fid:e.fid||n,registrationStatus:2,refreshToken:e.refreshToken,authToken:Gt(e.authToken)}}throw await Zt("Create Installation",c)}(e,t);return hn(e.appConfig,n)}catch(n){throw qt(n)&&409===n.customData.serverCode?await un(e.appConfig):await hn(e.appConfig,{fid:t.fid,registrationStatus:0}),n}}(e,n);return{installationEntry:n,registrationPromise:a}}return 1===t.registrationStatus?{installationEntry:t,registrationPromise:mn(e)}:{installationEntry:t}}(e,a);return t=r.registrationPromise,r.installationEntry});return""===n.fid?{installationEntry:await t}:{installationEntry:n,registrationPromise:t}}async function mn(e){let t=await gn(e.appConfig);for(;1===t.registrationStatus;)await Yt(100),t=await gn(e.appConfig);if(0===t.registrationStatus){const{installationEntry:t,registrationPromise:n}=await fn(e);return n||t}return t}function gn(e){return pn(e,e=>{if(!e)throw Ut.create("installation-not-found");return bn(e)})}function bn(e){return 1===(t=e).registrationStatus&&t.registrationTime+Vt<Date.now()?{fid:e.fid,registrationStatus:0}:e;var t;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}async function wn({appConfig:e,heartbeatServiceProvider:t},n){const a=function(e,{fid:t}){return`${Kt(e)}/${t}/authTokens:generate`}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e,n),r=Qt(e,n),i=t.getImmediate({optional:!0});if(i){const e=await i.getHeartbeatsHeader();e&&r.append("x-firebase-client",e)}const s={installation:{sdkVersion:Ht,appId:e.appId}},o={method:"POST",headers:r,body:JSON.stringify(s)},c=await Xt(()=>fetch(a,o));if(c.ok){return Gt(await c.json())}throw await Zt("Generate Auth Token",c)}async function yn(e,t=!1){let n;const a=await pn(e.appConfig,a=>{if(!xn(a))throw Ut.create("not-registered");const r=a.authToken;if(!t&&function(e){return 2===e.requestStatus&&!function(e){const t=Date.now();return t<e.creationTime||e.creationTime+e.expiresIn<t+Wt}(e)}(r))return a;if(1===r.requestStatus)return n=async function(e,t){let n=await vn(e.appConfig);for(;1===n.authToken.requestStatus;)await Yt(100),n=await vn(e.appConfig);const a=n.authToken;return 0===a.requestStatus?yn(e,t):a}(e,t),a;{if(!navigator.onLine)throw Ut.create("app-offline");const t=function(e){const t={requestStatus:1,requestTime:Date.now()};return{...e,authToken:t}}(a);return n=async function(e,t){try{const n=await wn(e,t),a={...t,authToken:n};return await hn(e.appConfig,a),n}catch(n){if(!qt(n)||401!==n.customData.serverCode&&404!==n.customData.serverCode){const n={...t,authToken:{requestStatus:0}};await hn(e.appConfig,n)}else await un(e.appConfig);throw n}}(e,t),t}});return n?await n:a.authToken}function vn(e){return pn(e,e=>{if(!xn(e))throw Ut.create("not-registered");const t=e.authToken;return 1===(n=t).requestStatus&&n.requestTime+Vt<Date.now()?{...e,authToken:{requestStatus:0}}:e;var n;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */})}function xn(e){return void 0!==e&&2===e.registrationStatus}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function In(e,t=!1){const n=e;await async function(e){const{registrationPromise:t}=await fn(e);t&&await t}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(n);return(await yn(n,t)).token}function jn(e){return Ut.create("missing-app-config-values",{valueName:e})}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const En="installations",Sn=e=>{const t=Et(e.getProvider("app").getImmediate(),En).getImmediate();return{getId:()=>async function(e){const t=e,{installationEntry:n,registrationPromise:a}=await fn(t);return a?a.catch(console.error):yn(t).catch(console.error),n.fid}(t),getToken:e=>In(t,e)}};jt(new pe(En,e=>{const t=e.getProvider("app").getImmediate(),n=function(e){if(!e||!e.options)throw jn("App Configuration");if(!e.name)throw jn("App Name");const t=["projectId","apiKey","appId"];for(const n of t)if(!e.options[n])throw jn(n);return{appName:e.name,projectId:e.options.projectId,apiKey:e.options.apiKey,appId:e.options.appId}}(t);return{app:t,appConfig:n,heartbeatServiceProvider:Et(t,"heartbeat"),_delete:()=>Promise.resolve()}},"PUBLIC")),jt(new pe("installations-internal",Sn,"PRIVATE")),Ct(Ft,Rt),Ct(Ft,Rt,"esm2020");
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const _n="analytics",kn="https://www.googletagmanager.com/gtag/js",Cn=new je("@firebase/analytics"),Nn=new oe("analytics","Analytics",{"already-exists":"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.","already-initialized":"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-initialized instance.","already-initialized-settings":"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.","interop-component-reg-failed":"Firebase Analytics Interop Component failed to instantiate: {$reason}","invalid-analytics-context":"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","indexeddb-unavailable":"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","fetch-throttle":"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.","config-fetch-failed":"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}","no-api-key":'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',"no-app-id":'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',"no-client-id":'The "client_id" field is empty.',"invalid-gtag-resource":"Trusted Types detected an invalid gtag resource: {$gtagURL}."});
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Dn(e){if(!e.startsWith(kn)){const t=Nn.create("invalid-gtag-resource",{gtagURL:e});return Cn.warn(t.message),""}return e}function An(e){return Promise.all(e.map(e=>e.catch(e=>e)))}function Tn(e,t){const n=function(e,t){let n;return window.trustedTypes&&(n=window.trustedTypes.createPolicy(e,t)),n}("firebase-js-sdk-policy",{createScriptURL:Dn}),a=document.createElement("script"),r=`${kn}?l=${e}&id=${t}`;a.src=n?n?.createScriptURL(r):r,a.async=!0,document.head.appendChild(a)}function Pn(e,t,n,a){return async function(r,...i){try{if("event"===r){const[a,r]=i;await async function(e,t,n,a,r){try{let i=[];if(r&&r.send_to){let e=r.send_to;Array.isArray(e)||(e=[e]);const a=await An(n);for(const n of e){const e=a.find(e=>e.measurementId===n),r=e&&t[e.appId];if(!r){i=[];break}i.push(r)}}0===i.length&&(i=Object.values(t)),await Promise.all(i),e("event",a,r||{})}catch(i){Cn.error(i)}}(e,t,n,a,r)}else if("config"===r){const[r,s]=i;await async function(e,t,n,a,r,i){const s=a[r];try{if(s)await t[s];else{const e=(await An(n)).find(e=>e.measurementId===r);e&&await t[e.appId]}}catch(o){Cn.error(o)}e("config",r,i)}(e,t,n,a,r,s)}else if("consent"===r){const[t,n]=i;e("consent",t,n)}else if("get"===r){const[t,n,a]=i;e("get",t,n,a)}else if("set"===r){const[t]=i;e("set",t)}else e(r,...i)}catch(s){Cn.error(s)}}}const Mn=new class{constructor(e={},t=1e3){this.throttleMetadata=e,this.intervalMillis=t}getThrottleMetadata(e){return this.throttleMetadata[e]}setThrottleMetadata(e,t){this.throttleMetadata[e]=t}deleteThrottleMetadata(e){delete this.throttleMetadata[e]}};function Ln(e){return new Headers({Accept:"application/json","x-goog-api-key":e})}async function Bn(e,t=Mn,n){const{appId:a,apiKey:r,measurementId:i}=e.options;if(!a)throw Nn.create("no-app-id");if(!r){if(i)return{measurementId:i,appId:a};throw Nn.create("no-api-key")}const s=t.getThrottleMetadata(a)||{backoffCount:0,throttleEndTimeMillis:Date.now()},o=new $n;return setTimeout(async()=>{o.abort()},6e4),On({appId:a,apiKey:r,measurementId:i},s,o,t)}async function On(e,{throttleEndTimeMillis:t,backoffCount:n},a,r=Mn){const{appId:i,measurementId:s}=e;try{await function(e,t){return new Promise((n,a)=>{const r=Math.max(t-Date.now(),0),i=setTimeout(n,r);e.addEventListener(()=>{clearTimeout(i),a(Nn.create("fetch-throttle",{throttleEndTimeMillis:t}))})})}(a,t)}catch(o){if(s)return Cn.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${s} provided in the "measurementId" field in the local Firebase config. [${o?.message}]`),{appId:i,measurementId:s};throw o}try{const t=await async function(e){const{appId:t,apiKey:n}=e,a={method:"GET",headers:Ln(n)},r="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig".replace("{app-id}",t),i=await fetch(r,a);if(200!==i.status&&304!==i.status){let e="";try{const t=await i.json();t.error?.message&&(e=t.error.message)}catch(s){}throw Nn.create("config-fetch-failed",{httpStatus:i.status,responseMessage:e})}return i.json()}(e);return r.deleteThrottleMetadata(i),t}catch(o){const t=o;if(!function(e){if(!(e instanceof se&&e.customData))return!1;const t=Number(e.customData.httpStatus);return 429===t||500===t||503===t||504===t}(t)){if(r.deleteThrottleMetadata(i),s)return Cn.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${s} provided in the "measurementId" field in the local Firebase config. [${t?.message}]`),{appId:i,measurementId:s};throw o}const c=503===Number(t?.customData?.httpStatus)?he(n,r.intervalMillis,30):he(n,r.intervalMillis),l={throttleEndTimeMillis:Date.now()+c,backoffCount:n+1};return r.setThrottleMetadata(i,l),Cn.debug(`Calling attemptFetch again in ${c} millis`),On(e,l,a,r)}}class $n{constructor(){this.listeners=[]}addEventListener(e){this.listeners.push(e)}abort(){this.listeners.forEach(e=>e())}}async function Fn(e,t,n,a,r,i,s){const o=Bn(e);o.then(t=>{n[t.measurementId]=t.appId,e.options.measurementId&&t.measurementId!==e.options.measurementId&&Cn.warn(`The measurement ID in the local Firebase config (${e.options.measurementId}) does not match the measurement ID fetched from the server (${t.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)}).catch(e=>Cn.error(e)),t.push(o);const c=
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function(){if(!ae())return Cn.warn(Nn.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;try{await re()}catch(e){return Cn.warn(Nn.create("indexeddb-unavailable",{errorInfo:e?.toString()}).message),!1}return!0}().then(e=>e?a.getId():void 0),[l,d]=await Promise.all([o,c]);(function(e){const t=window.document.getElementsByTagName("script");for(const n of Object.values(t))if(n.src&&n.src.includes(kn)&&n.src.includes(e))return n;return null}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */)(i)||Tn(i,l.measurementId),r("js",new Date);const h=s?.config??{};return h.origin="firebase",h.update=!0,null!=d&&(h.firebase_id=d),r("config",l.measurementId,h),l.measurementId}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rn{constructor(e){this.app=e}_delete(){return delete Vn[this.app.options.appId],Promise.resolve()}}let Vn={},Hn=[];const zn={};let Wn,Un,qn="dataLayer",Kn=!1;function Gn(e,t,n){!function(){const e=[];if(ne()&&e.push("This is a browser extension environment."),ie()||e.push("Cookies are not available."),e.length>0){const t=e.map((e,t)=>`(${t+1}) ${e}`).join(" "),n=Nn.create("invalid-analytics-context",{errorInfo:t});Cn.warn(n.message)}}();const a=e.options.appId;if(!a)throw Nn.create("no-app-id");if(!e.options.apiKey){if(!e.options.measurementId)throw Nn.create("no-api-key");Cn.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${e.options.measurementId} provided in the "measurementId" field in the local Firebase config.`)}if(null!=Vn[a])throw Nn.create("already-exists",{id:a});if(!Kn){!function(e){let t=[];Array.isArray(window[e])?t=window[e]:window[e]=t}(qn);const{wrappedGtag:e,gtagCore:t}=function(e,t,n,a,r){let i=function(...e){window[a].push(arguments)};return window[r]&&"function"==typeof window[r]&&(i=window[r]),window[r]=Pn(i,e,t,n),{gtagCore:i,wrappedGtag:window[r]}}(Vn,Hn,zn,qn,"gtag");Un=e,Wn=t,Kn=!0}Vn[a]=Fn(e,Hn,zn,t,Wn,qn,n);return new Rn(e)}function Zn(e=function(e=bt){const t=yt.get(e);if(!t&&e===bt&&ee())return kt();if(!t)throw St.create("no-app",{appName:e});return t}()){const t=Et(e=ue(e),_n);return t.isInitialized()?t.getImmediate():function(e,t={}){const n=Et(e,_n);if(n.isInitialized()){const e=n.getImmediate();if(le(t,n.getOptions()))return e;throw Nn.create("already-initialized")}const a=n.initialize({options:t});return a}(e)}function Jn(e,t,n){e=ue(e),async function(e,t,n,a){if(a&&a.global){const t={};for(const e of Object.keys(n))t[`user_properties.${e}`]=n[e];return e("set",t),Promise.resolve()}e("config",await t,{update:!0,user_properties:n})}(Un,Vn[e.app.options.appId],t,n).catch(e=>Cn.error(e))}const Qn="@firebase/analytics",Xn="0.10.21";jt(new pe(_n,(e,{options:t})=>Gn(e.getProvider("app").getImmediate(),e.getProvider("installations-internal").getImmediate(),t),"PUBLIC")),jt(new pe("analytics-internal",function(e){try{const t=e.getProvider(_n).getImmediate();return{logEvent:(e,n,a)=>function(e,t,n,a){e=ue(e),async function(e,t,n,a,r){if(r&&r.global)e("event",n,a);else{const r=await t;e("event",n,{...a,send_to:r})}}(Un,Vn[e.app.options.appId],t,n,a).catch(e=>Cn.error(e))}(t,e,n,a),setUserProperties:(e,n)=>Jn(t,e,n)}}catch(t){throw Nn.create("interop-component-reg-failed",{reason:t})}},"PRIVATE")),Ct(Qn,Xn),Ct(Qn,Xn,"esm2020");const Yn=kt({apiKey:"AIzaSyD0v66rpnRlf5s_TO2CxBEBPSt2CJwx2vg",authDomain:"portfolio-website-c899e.firebaseapp.com",projectId:"portfolio-website-c899e",storageBucket:"portfolio-website-c899e.firebasestorage.app",messagingSenderId:"955465981238",appId:"1:955465981238:web:48be745bc5c5da4107e797",measurementId:"G-EL2LSGW7SV"});(async function(){if(ne())return!1;if(!ie())return!1;if(!ae())return!1;try{return await re()}catch(e){return!1}})().then(e=>{e&&Zn(Yn)});const ea=e.lazy(()=>j(()=>import("./BlogLibraryPage-ChXCwn9a.js"),__vite__mapDeps([0,1,2]))),ta=e.lazy(()=>j(()=>import("./BlogPostPage-BcKTWhIe.js"),__vite__mapDeps([3,1,2]))),na=e.lazy(()=>j(()=>import("./PortfolioPage-BeoIqUek.js"),__vite__mapDeps([4,1]))),aa=e.lazy(()=>j(()=>import("./AboutPage-CrqLbcs0.js"),__vite__mapDeps([5,1]))),ra=e.lazy(()=>j(()=>import("./ContactPage-CrSqI09v.js"),__vite__mapDeps([6,1]))),ia=e.lazy(()=>j(()=>import("./NotFoundPage-xVPk6QhT.js"),__vite__mapDeps([7,1])));function sa(){return y.jsx("div",{style:{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center"}})}function oa(){const t=a();return e.useEffect(()=>{!function(){if("undefined"!=typeof window){if("PerformanceObserver"in window){try{new PerformanceObserver(e=>{const t=e.getEntries(),n=t[t.length-1];window.gtag&&window.gtag("event","page_view",{value:Math.round(n.renderTime||n.loadTime),event_category:"Web Vitals",event_label:"LCP"})}).observe({entryTypes:["largest-contentful-paint"]})}catch(e){}try{let e=0;new PerformanceObserver(t=>{for(const n of t.getEntries())n.hadRecentInput||(e+=n.value);window.gtag&&e>.1&&window.gtag("event","layout_shift",{value:e.toFixed(3),event_category:"Web Vitals",event_label:"CLS"})}).observe({entryTypes:["layout-shift"]})}catch(e){}try{new PerformanceObserver(e=>{for(const t of e.getEntries())window.gtag&&window.gtag("event","first_input",{value:Math.round(t.processingDuration),event_category:"Web Vitals",event_label:"FID"})}).observe({entryTypes:["first-input"]})}catch(e){}}window.performance&&window.performance.timing&&window.addEventListener("load",()=>{const e=window.performance.timing,t=e.navigationStart;performance.getEntriesByType("paint").forEach(e=>{}),window.gtag&&window.gtag("event","page_load",{page_load_time:e.loadEventEnd-t,event_category:"performance"})})}}()},[]),e.useEffect(()=>{if("undefined"!=typeof window&&"function"==typeof window.gtag){const e=function(e){switch(e){case"/":return"Home";case"/portfolio":return"Portfolio";case"/blog":return"BlogLibrary";case"/about":return"About";case"/contact":return"Contact";default:return e.startsWith("/blog/")?"BlogPost":"Unknown"}}(t.pathname);window.gtag("config",void 0,{page_path:t.pathname,page_title:document.title,screen_name:e}),window.gtag("event","screen_view",{screen_name:e,page_path:t.pathname})}},[t.pathname]),y.jsx(s,{children:y.jsxs(o,{element:y.jsx(F,{}),children:[y.jsx(o,{index:!0,element:y.jsx(U,{})}),y.jsx(o,{path:"portfolio",element:y.jsx(e.Suspense,{fallback:y.jsx(sa,{}),children:y.jsx(na,{})})}),y.jsx(o,{path:"blog",element:y.jsx(e.Suspense,{fallback:y.jsx(sa,{}),children:y.jsx(ea,{})})}),y.jsx(o,{path:"blog/:postId",element:y.jsx(e.Suspense,{fallback:y.jsx(sa,{}),children:y.jsx(ta,{})})}),y.jsx(o,{path:"about",element:y.jsx(e.Suspense,{fallback:y.jsx(sa,{}),children:y.jsx(aa,{})})}),y.jsx(o,{path:"contact",element:y.jsx(e.Suspense,{fallback:y.jsx(sa,{}),children:y.jsx(ra,{})})}),y.jsx(o,{path:"*",element:y.jsx(e.Suspense,{fallback:y.jsx(sa,{}),children:y.jsx(ia,{})})})]})})}v.createRoot(document.getElementById("root")).render(y.jsx(c.StrictMode,{children:y.jsx(l,{children:y.jsx(_,{children:y.jsx(oa,{})})})}));export{z as E,V as P,y as j,R as p,k as u,H as w};
