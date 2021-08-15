function initMap() {
    let elementMap = document.querySelector("#mapid");
    let map = L.map('mapid');

    //GET USER LOCATION
    navigator.geolocation ? navigator.geolocation.getCurrentPosition(showPosition, showError) : console.log("Cant Get User Location")

    function showPosition(position) {
        let longitude = position.coords.longitude;
        let latitude = position.coords.latitude;

        localStorage.setItem('start-location-longitude', longitude);
        localStorage.setItem('start-location-latitude', latitude);
    }

    function showError(error) {
        if (error === 1 || error === 2 || error === 3) {
            let longitude = position.coords.longitude;
            let latitude = position.coords.latitude;

            localStorage.setItem('start-location-longitude', longitude);
            localStorage.setItem('start-location-latitude', latitude)
        }
    }

    if (localStorage.getItem('start-location-longitude') !== null && localStorage.getItem('start-location-latitude') !== null) {
        let longitude = localStorage.getItem('start-location-longitude');
        let latitude = localStorage.getItem('start-location-latitude');
        map.setView([latitude, longitude], 50)
        L.marker([latitude, longitude]).addTo(map);
    } else {
        map.setView([-6.1701257, 106.821972], 50)
        L.marker([-6.1701257, 106.821972], 50).addTo(map);
    }


    L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}.U_9ir5oPFZhkmNvbyrBCog`, {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1Ijoia2VudHVyeSIsImEiOiJja3Nic3ozOTIwYTYwMnVvMnloYnQ4aWh0In0'
    }).addTo(map);
        
}

initMap();



