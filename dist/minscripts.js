let pokemonRepository=function(){let t=[];function e(){return t}function n(e){t.push(e)}function o(t){return fetch(t.detailsUrl).then(function(t){return t.json()}).then(function(e){t.imageUrl=e.sprites.front_default,t.height=e.height,t.weight=e.weight,t.types=[];for(let n=0;n<e.types.length;n++)t.types.push(e.types[n].type.name)}).catch(function(t){console.log(t)})}function i(t){o(t).then(function(){a(t)})}function a(t){let e=$(".modal-body"),n=$(".modal-title");n.empty(),e.empty();let o=$("<h2>"+t.name+"</h2>"),i=$('<img class = "modal-img" style =width:40%>');i.attr("src",t.imageUrl);let a=$("<p>Height: "+t.height+"</p>"),l=$("<p>Weight: "+t.weight+"</p>"),s=$("<p>Types: "+t.types+"</p>");n.append(o),e.append(i),e.append(a),e.append(l),e.append(s)}return{getAll:e,add:n,addListItem:function t(e){let n=document.querySelector(".pokemon-list"),o=document.createElement("li"),a=document.createElement("button");a.innerText=e.name,o.classList.add("col"),a.classList.add("list-group-item"),a.classList.add("btn","btn-primary","button-class"),a.setAttribute("data-toggle","modal"),a.setAttribute("data-target","#modal-container"),o.appendChild(a),n.appendChild(o),a.addEventListener("click",function(){i(e)})},loadList:function t(){return fetch("https://pokeapi.co/api/v2/pokemon/?limit=150").then(function(t){return t.json()}).then(function(t){t.results.forEach(function(t){n({name:t.name,detailsUrl:t.url})})}).catch(function(t){console.error(t)})},loadDetails:o,showDetails:i,showModal:a}}();const searchInput=document.getElementById("searchinput");searchInput.addEventListener("input",t=>{let e=t.target.value,n=document.querySelectorAll(".list-group-item");n.forEach(t=>{t.innerText.toLowerCase().includes(e.toLowerCase())?t.parentNode.style.display="block":t.parentNode.style.display="none"})}),pokemonRepository.loadList().then(function(){pokemonRepository.getAll().forEach(function(t){pokemonRepository.addListItem(t)})});