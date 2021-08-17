let longitude, latitude, ipNumber, city, region, country, timezone, isp;
const form = document.querySelector("form");
let map = L.map('mapid');

//INITIALIZE MAP
function setMap(longitude, latitude) {
    if(screen.width < 992) {
        document.getElementById("mapid").style.height = `${screen.height}px`;
    }
    
    map.setView([longitude, latitude], 50);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1Ijoia2VudHVyeSIsImEiOiJja3Nic3ozOTIwYTYwMnVvMnloYnQ4aWh0In0.U_9ir5oPFZhkmNvbyrBCog'
    }).addTo(map);
    L.marker([longitude, latitude]).addTo(map)
}


function getIp(ip) {
    if (ip === "") {
        fetch('https://geo.ipify.org/api/v1?apiKey=at_DEuERGt8unBQ2j2v0h9jTEcNS8BMq')
            .then(response => response.json())
            .then(data => {
                longitude = data.location.lng
                latitude = data.location.lat
                ipNumber = data.ip
                city = data.location.city
                region = data.location.region
                country = data.location.country
                timezone = data.location.timezone
                isp = data.isp
                console.log(data)
                getLocation();
            })
    } else {
        let patternRegex = /[A-z]/g;

        ///CHECK IF INPUT CONTAINS ANY LETTER
        if (patternRegex.test(ip) === true) {
            fetch(`https://geo.ipify.org/api/v1?apiKey=at_DEuERGt8unBQ2j2v0h9jTEcNS8BMq&domain=${ip}`)
                .then(response => response.json())
                .then(data => {
                    longitude = data.location.lng
                    latitude = data.location.lat
                    ipNumber = data.ip
                    city = data.location.city
                    region = data.location.region
                    country = data.location.country
                    timezone = data.location.timezone
                    isp = data.isp
                    console.log(data)
                    getLocation();
                })
        } else {
            fetch(`https://geo.ipify.org/api/v1?apiKey=at_DEuERGt8unBQ2j2v0h9jTEcNS8BMq&ip=${ip}`)
                .then(response => response.json())
                .then(data => {
                    longitude = data.location.lng
                    latitude = data.location.lat
                    ipNumber = data.ip
                    city = data.location.city
                    region = data.location.region
                    country = data.location.country
                    timezone = data.location.timezone
                    isp = data.isp
                    console.log(data)
                    getLocation();
                })
        }

    }
}

//CHANGE TEXT BASED ON LOCATION GET
function getLocation() {
    let ipText = document.querySelector('.ip .content');
    let locationText = document.querySelector('.loc .content');
    let timezoneText = document.querySelector('.timezone .content');
    let ispText = document.querySelector('.isp .content');

    setMap(latitude, longitude)
    ipText.innerHTML = ipNumber;
    locationText.innerHTML = `${city}, ${region}, ${country}`
    timezoneText.innerHTML = timezone;
    ispText.innerHTML = isp
}

form.addEventListener("submit", e => {
    e.preventDefault();
    let input = document.querySelector('input');
    getIp(input.value)
    map.setView([longitude, latitude], 50);
})

window.onload = getIp("")
