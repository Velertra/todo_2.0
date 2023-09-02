(()=>{var e={210:()=>{class e{constructor(){this.sectionArray={},this.trialArray={},this.sectionInputs=document.querySelectorAll('option[name="folder_choices"]')}createSection(e){try{console.log(this.sectionArray),this.sectionArray[e]||(this.sectionArray[e]=[])}catch(e){console.error("Error creating section",e)}}createTaskArray(){let e="default";this.sectionInputs.forEach((t=>{try{t.selected&&(e=t.value)}catch(e){console.error("Error section input",e)}}));try{this.title=document.getElementById("title").value,this.description=document.getElementById("description").value,this.dueDate=document.getElementById("due_date").value,this.priority=document.getElementById("priority").value,this.notes=document.getElementById("notes").value;const t={title:this.title,description:this.description,dueDate:this.dueDate,priority:this.priority,notes:this.notes};this.saveData(e,t),document.getElementById("task_form").reset()}catch(e){console.error("Error submitting form:",e)}}saveData(e,t){this.sectionArray[e]||this.createSection(e);try{this.sectionArray[e].push(t),localStorage.setItem("tasks",JSON.stringify(this.sectionArray))}catch(e){console.error("Error saving data",e)}}loadSavedData(){try{const e=localStorage.getItem("tasks");e&&(this.sectionArray=JSON.parse(e))}catch(e){console.error("Error loading saved data",e)}}renderTask(e,t){try{const r=document.createElement("div");r.className=`${e}`,r.innerHTML=`<h2>${e}</h2>`,t.appendChild(r)}catch(e){console.error("Error rendering task",e)}}renderAllTasks(e,t){try{t.innerHTML="";for(const e in this.sectionArray)this.sectionArray[e].forEach((e=>{this.renderTask(e,t)}))}catch(e){console.error("Error rendering all tasks",e)}}createNewFolder(e){this.trialArray[e]={},console.log(this.trialArray);let t=[...this.sectionArray,...this.trialArray];this.saveData(t)}}document.addEventListener("DOMContentLoaded",(()=>{const t=new e;try{const r=document.getElementById("task_form"),o=document.querySelectorAll(".form_container"),n=document.getElementById("task_container"),s=document.getElementById("home_btn"),a=document.getElementById("section_div"),i=document.querySelectorAll(".section_btn"),c=document.getElementById("new_task"),l=(document.querySelectorAll('[name="hide_button"]'),document.getElementById("new_folder")),d=document.querySelectorAll(".folder_text"),u=document.getElementById("folder_text");r.addEventListener("submit",(e=>{e.preventDefault(),t.createTaskArray()})),s.addEventListener("click",(()=>{try{t.renderAllTasks(t,n)}catch(e){console.error("Error with renderButton EventListener",e)}})),a.addEventListener("click",(()=>{i.forEach((e=>{e.classList.toggle("hidden")}))})),c.addEventListener("click",(()=>{o.forEach((e=>{e.classList.toggle("hidden")}))})),l.addEventListener("click",(()=>{d.forEach((e=>{e.classList.toggle("hidden")}))})),u.addEventListener("keydown",(function(t){"Enter"===t.key&&(t.preventDefault(),(new e).createNewFolder(u.value),u.value="")}))}catch(e){console.error("Error during initialization:",e)}}))}},t={};function r(o){var n=t[o];if(void 0!==n)return n.exports;var s=t[o]={exports:{}};return e[o](s,s.exports,r),s.exports}r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var o in t)r.o(t,o)&&!r.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";r(210)})()})();