!function(){var t=document.querySelector("body"),e=document.querySelector("[data-start]"),n=document.querySelector("[data-stop]"),o=null;function r(t,e,n){t.setAttribute(n,n),e.removeAttribute(n)}e.addEventListener("click",(function(){o=setInterval((function(){t.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))}),1e3),r(e,n,"disabled")})),n.addEventListener("click",(function(){clearInterval(o),r(n,e,"disabled")}))}();
//# sourceMappingURL=01-color-switcher.d22e09c3.js.map
