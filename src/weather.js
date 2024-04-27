const Search_Btn = document.getElementById('search-btn');
const City_Value = document.getElementById('City');


const API_KEY = 'f957da4ecc2e9e6f16151391120c0fcd';




async function GettingCityDetails(...props){

    const WEATHER_API = `http://api.openweathermap.org/data/2.5/forecast?lat=${props[1]}&lon=${props[2]}&appid=${API_KEY}`;
    const Weather_Details = await fetch(WEATHER_API);
    const Weather_JSON = await Weather_Details.json();

    console.log(Weather_JSON);
}

async function gettingGeo() {

    const CityName = City_Value.value.trim();
    const GEO_API = `http://api.openweathermap.org/geo/1.0/direct?q=${CityName}&limit=1&appid=${API_KEY}`;
    const GeoFetching = await fetch(GEO_API);
    const GeoJson = await GeoFetching.json();
    // console.log(GeoJson);

    const {name, lat, lon} = GeoJson[0];

    GettingCityDetails(name, lat, lon);
}

Search_Btn.addEventListener('click', () => {
    gettingGeo();
    City.value = '';
})