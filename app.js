let mappedArray;
let filteredArray;
let region = "";
let searchValue = "";
let searchBYvalue;
let mode='light';
const searchBox = document.querySelector("#search-box");
const selectOption = document.querySelector("#select-region");
let allCards;
async function fetchAllCountry() {
  const countries = await fetch("https://restcountries.com/v3.1/all", {
    mode: "cors",
  });
  const countriesData = await countries.json();
  console.log(countriesData);
  mappedArray = countriesData.map((country) => ({
    name: country.name.common,
    region: country.region,
    population: country.population,
    capital: country.capital,
    src: country.flags.png,
    countryCode:country.ccn3,
    borders:country.borders,
    languages:country.languages,
    cca3:country.cca3,
    area:country.area
  }));
  
 console.log(mappedArray);
localStorage.setItem('data',JSON.stringify(mappedArray));
display(mappedArray);
}
fetchAllCountry();

document.querySelector('.mode').addEventListener('click' ,function(e){
  document.querySelector('header').classList.toggle('dark-mode');
  document.querySelector('body').classList.toggle('dark-mode');
  if(mode=='light'){
    document.querySelector('.mode').innerHTML=`
    <img src="./images/icons8-sun-30 (1).png" alt="">
    <p>Light mode</p>
`;
    mode='dark';
  }else{
    document.querySelector('.mode').innerHTML=`
    <img src="./images/icons8-moon-30.png" alt="">
                <p>Dark mode</p>
                
`;
mode='light';
  }
 
})

searchBox.addEventListener("input", function (e) {
  searchValue = e.target.value;
  region = selectOption.value;
  filterCountry(region, searchValue);
});

selectOption.addEventListener("change", function (e) {
  region = e.target.value;
  filterCountry(region, searchValue);
});
function filterCountry(region, searchValue) {

   if(region){
      
       filteredArray = mappedArray.filter((c) => {
       const matchesRegion = c.region.toLowerCase() === region.toLowerCase();
       const matchesSearch = c.name
         .toLowerCase()
         .includes(searchValue.toLowerCase());
       return matchesRegion && matchesSearch;
     });
   }else{

      filteredArray=mappedArray.filter(c=>c.name.toLowerCase().includes(searchValue));
   }
  display(filteredArray);
}

function searchCountry(searchValue) {
  searchBYvalue = mappedArray.filter((c) =>
    c.name.toLowerCase().includes(`${searchValue.toLowerCase()}`)
  );
  display(searchBYvalue);
}

function display(array) {
  document.querySelector(".container").innerHTML = "";
  for (let item of array) {
    let image = document.createElement("img");
    let countryName = document.createElement("h3");
    let region = document.createElement("p");
    region.classList.add("region");
    let population = document.createElement("p");
    let capital = document.createElement("p");
    let card = document.createElement("div");
    card.classList.add("country-card");
    card.setAttribute('id',`${item.countryCode}`);
    image.src = `${item.src}`;
    countryName.innerHTML = `${item.name}`;
    region.innerHTML = `<strong>Region: </strong>${item.region}`;
    capital.innerHTML = `<strong>Capital: </strong>${item.capital}`;
    population.innerHTML = `<strong>Population: </strong>${item.population.toLocaleString(
      "en-us"
    )}`;
    card.append(image, countryName, region, population, capital);
    document.querySelector(".container").appendChild(card);
  }
   document.querySelector('.container').addEventListener('click',function(e){
    const identity=e.target.closest('.country-card').id;
      window.open(`details.html?id=${identity}`, '_blank');
   })
}
