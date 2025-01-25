function initMap() {
    const directionsRenderer = new google.maps.DirectionsRenderer();
    const directionsService = new google.maps.DirectionsService();
    const map = new google.maps.Map(document.getElementById("Map"),{
        zoom: 13,
        center: {lat: 52.950000, lng: -1.150000},
    });

    directionsRenderer.setMap(map);
    calculateAndDisplayRoute(directionsService, directionsRenderer);
    document.getElementById("button").addEventListener("click", () =>{
        calculateAndDisplayRoute(directionsService, directionsRenderer);
    });
    document.getElementById("buttonBack").addEventListener("click", () =>{
        window.location.href = "mapNormal.html";
    });

}

function calculateAndDisplayRoute(directionsService, directionsRenderer){
    const selectedMode = "DRIVING";

    directionsService.route({
        origin: document.getElementById("from").value,
        destination: document.getElementById("to").value,

        travelMode: google.maps.TravelMode[selectedMode],
    })
        .then((response) => {
            directionsRenderer.setDirections(response);
        })



}
