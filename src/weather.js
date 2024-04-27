const Search_Btn = document.getElementById('search-btn');
const City_Value = document.getElementById('City');


const API_KEY = 'f957da4ecc2e9e6f16151391120c0fcd';

const time = document.getElementById('Time');

(function DisplayingTime(){

    let CurrentDate = new Date();
    let CurrentHour = CurrentDate.getHours();
    let CurrentMinutes = CurrentDate.getMinutes();
    let CurrentSeconds = CurrentDate.getSeconds();

    CurrentHour = CurrentHour % 12;
    CurrentHour = CurrentHour ? CurrentHour : 12;

    CurrentMinutes = CurrentMinutes < 10 ? '0' + CurrentMinutes : CurrentMinutes;
    CurrentSeconds = CurrentSeconds < 10 ? '0' + CurrentSeconds : CurrentSeconds;

    let currentTime = CurrentHour + ':' + CurrentMinutes;
    time.innerText = currentTime;

})();


function LoopingData(props){
    
    // console.log(props);
    props.forEach((element,i)=> {
        if(i==0)
        {
            CurrentWeather(element);
        }
        else
        {
            FiveDay(element);
        }
    });

}

function gettingForecast(weather_response){

    const emptyArray = []
    const ForecastData = weather_response.list.filter( data => {
        const Final = new Date(data.dt_txt).getDate();
        if(!emptyArray.includes(Final))
        {
            return emptyArray.push(Final)
        }
    });

    LoopingData(ForecastData);
    // console.log(ForecastData);
}

async function GettingCityDetails(...props){

    const WEATHER_API = `http://api.openweathermap.org/data/2.5/forecast?lat=${props[1]}&lon=${props[2]}&appid=${API_KEY}`;
    const Weather_Details = await fetch(WEATHER_API);
    const Weather_JSON = await Weather_Details.json();

    // console.log(Weather_JSON);
    gettingForecast(Weather_JSON);
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