function getURLParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return decodeURIComponent(urlParams.get(name));
}

const id = getURLParameter("id");
const data = JSON.parse(localStorage.getItem("data"));

let element = data.filter((item) => item.countryCode == id)[0];

display(element);
document.querySelector('.buttons').addEventListener('click',function(e){
  e.preventDefault();
  let nm=e.target.closest('.btn').textContent;
  element=data.filter(c=>c.name==nm)[0];
  window.open("./details.html" +`?id=${element.countryCode}`, "_blank");
  display(element);
})

document.querySelector('#back').addEventListener('click',function(){
  window.location.href='./index.html';
})

function display(element) {

document.querySelector('.image-details').innerHTML=`
<img src=${element.src} alt="">

`;
document.querySelector('.content-details').innerHTML=`
<h1>${element.name}</h1>
<p>capital:${element.capital}</p>
<p>Population:<strong>${element.population.toLocaleString('en-us')}</strong></p>
<p>Area:<strong>${element.area.toLocaleString('en-us')}km²</strong></p>
<p>Languages:<strong>${Object.values(element.languages)}</strong></p>
<p>Region:<strong>${element.region}</strong></p>
<p>Borders:</p>
<div class="buttons"></div>
        
`;

 if(element.borders){
      for(item of element.borders){
       let button=document.createElement('button');
       button.classList.add('btn');
        button.innerHTML=`${data.filter(c=>c.cca3==`${item}`)[0].name}`;
        document.querySelector('.buttons').appendChild(button);
      }
    }

}
