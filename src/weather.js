const Search_Btn = document.getElementById('search-btn'); //Search Button Reference
const City_Value = document.getElementById('City'); // City Input value reference
const time = document.getElementById('Time'); // Time Reference
const Recent = document.getElementById('UnOrder-List'); // Recent-History Unordered list
const Error = document.getElementById('error'); // Error Reference
const EmptyError = document.getElementById('emptyerror'); // Error reference
const Dailyforecast = document.getElementById('List'); // Dailyforecast reference
const Temp = document.getElementById('Degree_temp') // temp reference
const main = document.getElementById('Main') // sunny reference
const Description = document.getElementById('descriptions'); // description reference.
const Wind = document.getElementById('Wind_results'); // wind reference
const Humidy = document.getElementById('Humidity_results'); // humidty reference
const Pressure = document.getElementById('Pressure_results'); // pressure reference
const Visibility = document.getElementById('Visibility_results'); // visibility reference
const WeatherImage = document.getElementById('Weather_Image'); // weatherimg reference
const Location_icon = document.getElementById('location_icon'); // location icon reference
const Current_City = document.getElementById('CurrentCity'); // current city reference

const API_KEY = 'f957da4ecc2e9e6f16151391120c0fcd'; // API KEY

function addingList(props) {
    const html = `
    <li class="flex justify-between items-center text-white border-solid border-b-2 border-slate-100 p-2 Cityicon">
       <h3>${props}</h3>
    </li>`
    Recent.innerHTML += html;
}

// Step - 08
// Display CurrentTime

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

// Step - 06
// Display the current weather details
// Update the weathe icon according the weather icon
// To update the image according to weather , -> inside weather there will main it will contains weather feels according to that 
// if my values matched the main value in weather the particular image should get updated

function CurrentWeather(props) {
    // console.log(props);
    const Temperature = (props.main.temp - 273.15).toFixed(1);
    Temp.innerText = `${Temperature}`;

    main.innerText = props.weather[0].main;
    Description.innerText = props.weather[0].description;

    Wind.innerText = props.wind.speed;
    Humidy.innerText = props.main.humidity;
    Pressure.innerText = props.main.pressure;
    Visibility.innerText = props.visibility;

    if (props.weather[0].main == 'Clouds') {
        WeatherImage.src = '/assests/weather-app-img/images/Clouds.png';
    }
    else if (props.weather[0].main == 'Clear') {
        WeatherImage.src = '/assests/weather-app-img/images/Clear.png';
    }
    else if (props.weather[0].main == 'Rain') {
        WeatherImage.src = '/assests/weather-app-img/images/Rain.png';
    }
    else if (props.weather[0].main == 'Drizzle') {
        WeatherImage.src = '/assests/weather-app-img/images/Drizzle.png';
    }
    else if (props.weather[0].main == 'Mist') {
        WeatherImage.src = '/assests/weather-app-img/images/Mist.png';
    }
    else if (props.weather[0].main == 'Humidity') {
        WeatherImage.src = '/assests/weather-app-img/images/Humidity.png';
    }
    else if (props.weather[0].main == 'Snow') {
        WeatherImage.src = '/assests/weather-app-img/images/Snow.png';
    }
    else if (props.weather[0].main == 'Wind') {
        WeatherImage.src = '/assests/weather-app-img/images/Wind.png';
    }
}

// Step - 07
// The data will passed as an argument to this function as a props in one by one in a looping.
// The values will be passed as dynamically to list.
// The List will be added dynamically to the unorder list.

function FiveDay(props) {

    const html =
        `<li class="bg-GreyBox flex flex-col justify-center items-center p-7 rounded-xl border-solid border-2 border-slate-200">
        <h3 id="Date" class="font-OpenSans text-lg font-semibold">${props.dt_txt.split(" ")[0]}</h3>
        <img src="/assests/weather-app-img/images/${props.weather[0].main}.png" class="w-12 h-12">
            <div class="mt3 text-center">
                <h5 class="font-OpenSans text-base font-medium m-1">Temp : ${(props.main.temp - 273.15).toFixed(2)}&deg</h5>
                <h5 class="font-OpenSans text-base font-medium m-1">Wind : ${props.wind.speed}&deg</h5>
                <h5 class="font-OpenSans text-base font-medium m-1">Humidity : ${props.main.humidity}&deg</h5>
            </div>
    </li>`
    Dailyforecast.innerHTML += html
}

// Step - 05 
// The filtered fivedays forecast has been passed as an argument to loopingdata function as an props.
// Looping the obj -> if the index is zero it will be call the current weather func because, it contains current weather details
//                    else the data details will be passed to fiveday forecast function.

function LoopingData(props) {
    console.log(props);
    props.forEach((element, i) => {
        if (i == 0) {
            CurrentWeather(element);
        }
        else {
            FiveDay(element);
        }
    });
}

// Step - 04
// Note - The Problem faced here : After getting the 6 day forecast it contains 6 days include and each days contains 5 hours weather. 
//        I literally stuck here how to get the single day contain single weather data. I didn't get any logic to apply here 
//        After sometimes i can use the filter method to get that data but inside the filter method how can i get the data again stucked here.
//        I have search internet to get some login to filter out the data literally i have seen 20 plus sites regarding the login but nothings seems to match out outdated logic and api.
//        Lastly i found this logic in codingNepal. after understanding the concept i have used here.
// Login Explanation - In Readme File.

// After getting filtered result the forecastdata will be passed to loopingdata.

function gettingForecast(weather_response) {
    const emptyArray = []
    const ForecastData = weather_response.list.filter(data => {
        const Final = new Date(data.dt_txt).getDate();
        if (!emptyArray.includes(Final)) {
            return emptyArray.push(Final);
        }
    });
    LoopingData(ForecastData);
    // console.log(ForecastData);
}

// Step -03
// Name Lat Lon will be passed as an argumrntd from the gettinggeo fun and it will be received as an ...rest parameter.
// !!! Rest Paramenter - Bundle the single element into an array !!!.
// After receiving the props we need to pass the value into five day forecast api to get city five day forecast.
// Fetching the API -> Then converting Promise object into JSON Object -> Returs Obj contains array.
// Inside that We have obj contains 6 element Today and upcoming five days forecast.
// Passing the object to gettingforecast.
//  ERROR HANDLING : try block and catch block -> Fetching api part inside the try if the api failed to fetch the api throws an error will be catch by the catch block.

async function GettingCityDetails(...props) {
    try {
        Current_City.innerText = props[0];
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

// Step - 2 
// 01 - Passing city as arugment to gettinggeo fun as props.
// 02 - Inside this function api to fetch latitude and longitude by the city name.
// 03 - Fetching the API -> Then converting Promise object into JSON Object -> Returs Obj contains array.
// 04 - Inside that We have name, lat, lon. -> To get that we can use object destructing.
// 05 - After getting the name lat long will be passed to the GettingCityDetails function to get the five days forecast.
// 06 - ERROR HANDLING : try block and catch block -> Fetching api part inside the try if the api failed to 
//      fetch the api throws an error will be catch by the catch block.

async function gettingGeo(props) {
    try {
        const GEO_API = `http://api.openweathermap.org/geo/1.0/direct?q=${props}&limit=1&appid=${API_KEY}`;
        const GeoFetching = await fetch(GEO_API);
        const GeoJson = await GeoFetching.json();
        // console.log(GeoJson);
        const { name, lat, lon } = GeoJson[0];
        GettingCityDetails(name, lat, lon);
    }
    catch (error) {
        Error.innerText = 'Invalid Location, Please enter a valid Location';
    }
}


// Step-1 --- Adding addEventListener to search to button to get the city values.
//Checking if the input values is empty if the input fiels is empty displaying error.
//If the input field has text getting the value.
//triming the whitespace of the input value
//After the Clicking the button my input field should become empty so, i have give innertext null.
// Setting value to the local storage while clicking search button.
//Running loop to remove previous weather five day forecast
// Finally calling gettinggeo to get the city latitude nd longitude

Search_Btn.addEventListener('click', () => {
    if (City_Value.value === "") {
        EmptyError.innerText = 'Please enter a Location';
    } 
    else {   
        const CityName = City_Value.value.trim();     
        City_Value.value = '';    
        localStorage.setItem('City', CityName);       
        while (Dailyforecast.firstChild) { 
            Dailyforecast.removeChild(Dailyforecast.firstChild);  
        }    
        gettingGeo(CityName);
    }
})

// This used to get the value in localstorage.
// Before getting the value from localstorgae need to if there is any value in local storage.
//After getting value from local storage passing value to function to add the list inside recent history unorder list.

if (localStorage.getItem('City')) {
    addingList(localStorage.getItem('City'));
}

// Step - 12
// Adding EventListner to the RecentHistory underorder list.
// When the list is clicked if the list contains cityicon class it should get the textcontent inside the list.
// After getting the textcontent value Note-> Here textcontent value is cityvalue.
// Then value is passed to the GettingGeo function step - 02

Recent.addEventListener('click', (e) => {
    // console.log('clicked');
    if (e.target.classList.contains('Cityicon'))
     {
        const CityNames = e.target.textContent;
        while (Dailyforecast.firstChild) {
            Dailyforecast.removeChild(Dailyforecast.firstChild);
        }
        gettingGeo(CityNames);
    }
});

// Step - 11 
// This create new promise if the api failed to fetch the current lati and lon it need to reject and throw the error. 
// if it resolve the value should passed to the funtion.

const GeoLocationDetail = new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(currentPosition => {
        resolve(
            {
                Latitude: currentPosition.coords.latitude,
                Longitude: currentPosition.coords.longitude
            }
        );
        reject(error);
    });

});

// Step - 10 
// Logic - To get the location details clicking icon we need use the navigator.geolocation.getCurrentPosition it is api  
//         which provide by geolocation api available in modern web browsers allows us to get current location weather.
// This GeoLoaction api gives current Latitude and Longitude by using this latitude and longitude we need to the city name.
// After getting the name, lat, lon it will be passed to step 03.

async function GeoLocation() {
    try {
        const { Latitude, Longitude } = await GeoLocationDetail;
        const GEO_URL = `http://api.openweathermap.org/geo/1.0/reverse?lat=${Latitude}&lon=${Longitude}&limit=1&appid=${API_KEY}`;
        const GEO_FETCH = await fetch(GEO_URL);
        //    console.log(GEO_FETCH);
        const Json = await GEO_FETCH.json();
        //    console.log(Json);
        const { name, lat, lon } = Json[0];
        GettingCityDetails(name, lat, lon);
    }
    catch (error) {
        Error.innerText = `Error has been Occured ${error}`;
    }
}

// GeoLocation();
// Step - 09 
// Adding event listner to locationicon while clicking the icon geolocation function will be called.
// After that before city five day forecast should be emptied. -> For that looping the forecast and removing.

Location_icon.addEventListener('click', () => {
    GeoLocation();
    while (Dailyforecast.firstChild) {
        Dailyforecast.removeChild(Dailyforecast.firstChild);
    }
});