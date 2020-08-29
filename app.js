// ---Elements--- 
const time = document.getElementById('time'),
greeting = document.getElementById('greeting'),
name = document.getElementById('name'),
task = document.getElementById('task');

// ---Functions---

//Show the time live

function showTime() {

    let today = new Date(),
        hour= today.getHours(),
        min = today.getMinutes(),
        sec = today.getSeconds();


    // Set AM or PM
    const AmPm = hour >= 12 ? 'PM' : 'AM';

    // 12hr Format
    hour = hour % 12 || 12;

    // Output 
    time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)} ${AmPm}`;

    setTimeout(showTime, 1000);
}

// Add zeros
function addZero(n){
    return (parseInt(n,10) < 10 ? '0' : '') + n;
}

//Change Background and Greeting
function setBg() {
    let today = new Date(),
    hour = today.getHours();

    if(hour < 12){
        // Morning
        document.body.style.background = "url('../imgs/morning.jpg')";
        document.body.style.backgroundRepeat = 'no-repeat';
        document.body.style.backgroundSize = '100%';
        greeting.textContent = 'Good Morning'

    } else if (hour < 18){
        //Afternoon
        document.body.style.background = "url('../imgs/afternoon.jpg')";
        document.body.style.backgroundRepeat = 'no-repeat';
        document.body.style.backgroundSize = '100%';
        greeting.textContent = 'Good Afternoon'

    } else{
        // Evening
        document.body.style.background = "url('../imgs/night2.jpg')";
        document.body.style.backgroundRepeat = 'no-repeat';
        document.body.style.backgroundSize = '100%';
        document.body.style.color = 'white';
        greeting.textContent = 'Good Evening'
    }
}

// Get Name
function getName() {
    if(localStorage.getItem('name') === null){
        name.textContent = '[Enter your name]';
    } else{
        name.textContent = localStorage.getItem('name');
    }
}

// Set Name

function setName(e){
    if(e.type === 'keypress'){

        // If enter is pressed
        if(e.which == 13 || e.keyCode == 13){

            localStorage.setItem('name', e.target.innerText);
            name.blur();
        }

    }else{

        localStorage.setItem('name', e.target.innerText);

    }
}


// Get Task
function getTask() {
    if(localStorage.getItem('task') === null){
        task.textContent = ' [Enter your task] ';
    } else{
        task.textContent = localStorage.getItem('task');
    }
}

function setTask(e){
    if(e.type === 'keypress'){

        // If enter is pressed
        if(e.which == 13 || e.keyCode == 13){

            localStorage.setItem('task', e.target.innerText);
            task.blur();
        }

    }else{

        localStorage.setItem('task', e.target.innerText);

    }
}

// Set Task


// ---Event Listeners---

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);

task.addEventListener('keypress', setTask);
task.addEventListener('blur', setTask);




// ---Function calls---

showTime();
setBg();
getName();
getTask();


// ---------- Weather Section ----------



window.addEventListener('load', () => {
    let long;
    let lat;

    
    if(navigator.geolocation){
        
        navigator.geolocation.getCurrentPosition
        (position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;

            let temperatureDescription = document.querySelector('.temperatureDescription');
            let temperatureDegreeMax = document.querySelector('.temperatureDegreeMax');
            let temperatureDegreeMin = document.querySelector('.temperatureDegreeMin');
            let locationTimezone = document.querySelector('.locationTimezone');
            
            console.log(lat,long);

            // Api

            const proxy = 'https://cors-anywhere.herokuapp.com/';

            const apiLocation= `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=%09W7J0EFmAzsuqzysWCaOAakVDK7ga51Xl&q=${lat}%2C${long}`;
            
            const apiWeather = `https://dataservice.accuweather.com/forecasts/v1/daily/1day/46096?apikey=W7J0EFmAzsuqzysWCaOAakVDK7ga51Xl&metric=true`;

            fetch(apiLocation)
                .then(data =>{
                    return data.json();
                })
                .then(response =>{
                    console.log(response);
                    const {Name} = response.TimeZone;

                     //Set the elements from the api
                    locationTimezone.textContent = Name;

                })
                
            fetch(apiWeather)
                .then(data =>{
                    return data.json();
                })
                .then(response =>{
                    console.log(response);
                    const {Temperature:{Maximum,Minimum}} = response.DailyForecasts[0];
                    const {Text} = response.Headline;

                    const {Day:{IconPhrase}} = response.DailyForecasts[0];
                  
                   
                    //Set the elements from the api

                    temperatureDegreeMax.textContent = Maximum.Value;
                    temperatureDegreeMin.textContent = Minimum.Value;

                    temperatureDescription.textContent = Text;

                    // Set Icon
                    

                })
        });

    }else{
        h1.textContent = "Timezone can't be displayed."
    }

  
})



