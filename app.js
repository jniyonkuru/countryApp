   
async function fetchCountry(){

 const countries= await fetch('https://restcountries.com/v3.1/all',{mode:'cors'});
 const countriesData=await countries.json();

 const mappedArray=countriesData.map(country=>(
    { name:country.name.common,
         region:country.region,
         population:country.population,
         capital:country.capital,src:country.flags.png}));

   const arrayOfCards=[];

         for( let item of mappedArray){
            let image = document.createElement('img');
            let countryName=document.createElement('h3');
            let region=document.createElement('p');
            let population=document.createElement('p');
            let capital=document.createElement('p');
            let card=document.createElement('div');
            card.classList.add('country-card');
            image.src=`${item.src}`;
            countryName.innerHTML=`${item.name}`;
            region.innerHTML=`<strong>Region: </strong>${item.region}`;
            capital.innerHTML=`<strong>Capital: </strong>${item.capital}`
            population.innerHTML=`<strong>Population: </strong>${item.population.toLocaleString('en-us')}`;
            card.append(image,countryName,region,population,capital);
            arrayOfCards.push(card);
         }
         
 for( let i=0;i<mappedArray.length;i++){

    document.querySelector('body').appendChild(arrayOfCards[i]);
 }
   
}


fetchCountry();