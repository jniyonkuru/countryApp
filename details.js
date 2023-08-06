function getURLParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return decodeURIComponent(urlParams.get(name));
}

const id = getURLParameter("id");

const data = JSON.parse(localStorage.getItem("data"));
let element = data.filter((item) => item.countryCode == id)[0];
console.log(element);

display(element);

function display(element) {
  let image = document.createElement("img");
  let countryName = document.createElement("h3");
  let region = document.createElement("p");
  region.classList.add("region");
  let population = document.createElement("p");
  let capital = document.createElement("p");
  let card = document.createElement("div");
  card.classList.add("country-card");
  card.setAttribute("id", `${element.countryCode}`);
  image.src = `${element.src}`;
  countryName.innerHTML = `${element.name}`;
  region.innerHTML = `<strong>Region: </strong>${element.region}`;
  capital.innerHTML = `<strong>Capital: </strong>${element.capital}`;
  population.innerHTML = `<strong>Population: </strong>${element.population.toLocaleString(
    "en-us"
  )}`;
  card.append(image, countryName, region, capital,population);

  if(element.borders){
      for(item of element.borders){
    let button=document.createElement('button');
    button.textContent=`${item}`;
    card.appendChild(button);
      }
  }
  document.querySelector(".container").appendChild(card);
  console.log(element.borders);
}
