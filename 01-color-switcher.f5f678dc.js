!function(){var e=document.querySelector("body"),t=document.querySelector("[data-start]"),d=document.querySelector("[data-stop]"),a=null;t.addEventListener("click",(function(){a=setInterval((function(){e.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))}),1e3),t.setAttribute("disabled","disabled"),d.removeAttribute("disabled","disabled")})),d.addEventListener("click",(function(){clearInterval(a),t.removeAttribute("disabled","disabled"),d.setAttribute("disabled","disabled")}))}();
//# sourceMappingURL=01-color-switcher.f5f678dc.js.map