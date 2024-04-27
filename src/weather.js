const Search_Btn = document.getElementById('search-btn');
const City_Value = document.getElementById('City');

const time = document.getElementById('Time');

const Temp = document.getElementById('Degree_temp')
const main = document.getElementById('Main')
const Description = document.getElementById('descriptions');

const Wind = document.getElementById('Wind_results');
const Humidy = document.getElementById('Humidity_results');
const Pressure = document.getElementById('Pressure_results');
const Visibility = document.getElementById('Visibility_results');

const WeatherImage = document.getElementById('Weather_Image');

const Dailyforecast = document.getElementById('List');

const Error = document.getElementById('error');
const EmptyError = document.getElementById('emptyerror');


const API_KEY = 'f957da4ecc2e9e6f16151391120c0fcd';

(function DisplayingTime() {

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


function CurrentWeather(props) {
    console.log(props);
    const Temperature = (props.main.temp - 273.15).toFixed(2);
    Temp.innerText = `${Temperature}`;

    main.innerText = props.weather[0].main;
    Description.innerText = props.weather[0].description;

    Wind.innerText = props.wind.speed;
    Humidy.innerText = props.main.humidity;
    Pressure.innerText = props.main.pressure;
    Visibility.innerText = props.visibility;

    if (props.weather[0].main == 'Clouds') {
        WeatherImage.src = '/assests/weather-app-img/images/clouds.png';
    }
    else if (props.weather[0].main == 'Clear') {
        WeatherImage.src = '/assests/weather-app-img/images/clear.png';
    }
    else if (props.weather[0].main == 'Rain') {
        WeatherImage.src = '/assests/weather-app-img/images/rain.png';
    }
    else if (props.weather[0].main == 'Drizzle') {
        WeatherImage.src = '/assests/weather-app-img/images/drizzle.png';
    }
    else if (props.weather[0].main == 'Mist') {
        WeatherImage.src = '/assests/weather-app-img/images/mist.png';
    }
    else if (props.weather[0].main == 'Humidity') {
        WeatherImage.src = '/assests/weather-app-img/images/humidity.png';
    }
    else if (props.weather[0].main == 'Snow') {
        WeatherImage.src = '/assests/weather-app-img/images/snow.png';
    }
    else if (props.weather[0].main == 'Wind') {
        WeatherImage.src = '/assests/weather-app-img/images/wind.png';
    }

}

function FiveDay(props) {


    const html =
        `<li class="bg-GreyBox flex flex-col justify-center items-center p-7 rounded-xl border-solid border-2 border-slate-200">
        <h3 id="Date" class="font-OpenSans text-lg font-semibold">${props.dt_txt.split(" ")[0]}</h3>
        <img src="/assests/cloudy.png" class="w-12 h-12">
            <div class="mt3 text-center">
                <h5 class="font-OpenSans text-base font-medium m-1">Temp : ${(props.main.temp - 273.15).toFixed(2)}&deg</h5>
                <h5 class="font-OpenSans text-base font-medium m-1">Wind : ${props.wind.speed}&deg</h5>
                <h5 class="font-OpenSans text-base font-medium m-1">Humidity : ${props.main.humidity}&deg</h5>
            </div>
    </li>`

    Dailyforecast.innerHTML += html


}

function LoopingData(props) {

    // console.log(props);
    props.forEach((element, i) => {
        if (i == 0) {
            CurrentWeather(element);
        }
        else {
            FiveDay(element);
        }
    });

}

function gettingForecast(weather_response) {

    const emptyArray = []
    const ForecastData = weather_response.list.filter(data => {
        const Final = new Date(data.dt_txt).getDate();
        if (!emptyArray.includes(Final)) {
            return emptyArray.push(Final)
        }
    });

    LoopingData(ForecastData);
    // console.log(ForecastData);
}

async function GettingCityDetails(...props) {
    try {
        const WEATHER_API = `http://api.openweathermap.org/data/2.5/forecast?lat=${props[1]}&lon=${props[2]}&appid=${API_KEY}`;
        const Weather_Details = await fetch(WEATHER_API);
        const Weather_JSON = await Weather_Details.json();

        // console.log(Weather_JSON);
        gettingForecast(Weather_JSON);
    }
    catch (error) {
        Error.innerText = `${error}`;
    }
}



async function gettingGeo() {
    try {
        const CityName = City_Value.value.trim();
        const GEO_API = `http://api.openweathermap.org/geo/1.0/direct?q=${CityName}&limit=1&appid=${API_KEY}`;
        const GeoFetching = await fetch(GEO_API);
        const GeoJson = await GeoFetching.json();
        // console.log(GeoJson);

        const { name, lat, lon } = GeoJson[0];

        GettingCityDetails(name, lat, lon);
    }
    catch (error) {
        Error.innerText = 'Please enter a valid Location......';
        Error.innerText = `${error}`;
    }

}

Search_Btn.addEventListener('click', () => {

    if (City_Value.value === "") {
        EmptyError.innerText = 'Please enter a Location.....';
    }
    else {
        gettingGeo();

        City_Value.value = '';

        while (Dailyforecast.firstChild) {
            Dailyforecast.removeChild(Dailyforecast.firstChild);
        }

    }

})

