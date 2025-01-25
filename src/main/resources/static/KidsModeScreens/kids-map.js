let map;
//Array that holds the boolean value of whether a type of pin is showing. Index is based on position in Icons in initMap()
const showPinArr = new Array(7);
//Variable that sets the cloud based map styling.
let mapID = null;

/* Creates the 'icons' array which contains objects with location
       name and pin image values (using the 'iconBase' image path).
    */
const iconBase = "../FrontEndImages/";
//Images for use in adult map
const adultIcons = {
    landmark: {
        name: "Landmark",
        icon: iconBase + "landmark-icon.png",
    },
    // museum: {
    //     name: "Museum & Gallery",
    //     icon: iconBase + "museum-gallery-icon.png",
    // },
    // leisure: {
    //     name: "Leisure Centre",
    //     icon: iconBase + "leisure-centre-icon.png",
    // },
    // library: {
    //     name: "Library",
    //     icon: iconBase + "library-icon.png",
    // },
    // market: {
    //     name: "Market",
    //     icon: iconBase + "market-icon.png",
    // },
    shopping: {
        name: "Shop",
        icon: iconBase + "shopping-icon.png",
    },
    community: {
        name: "Community Centre",
        icon: iconBase + "community-centre-icon.png",
    },
    // church: {
    //     name: "Church",
    //     icon: iconBase + "church-icon.png",
    // },
    // listed: {
    //     name: "Historical Building",
    //     icon: iconBase + "listed-building-icon.png",
    // },
    cycle: {
        name: "Cycle Hub",
        icon: iconBase + "cycle-hub-icon.png",
    },
    car: {
        name: "Car Park",
        icon: iconBase + "car-park-icon.png",
    },
    tram: {
        name: "Tram Station",
        icon: iconBase + "tram-icon.png",
    },
    // train: {
    //     name: "Train Station",
    //     icon: iconBase + "train-station-icon.png",
    // },
    bus: {
        name: "Bus Stop",
        icon: iconBase + "bus-icon.png",
    },
    // train: {
    //     name: "Train Station",
    //     icon: iconBase + "train-station-icon.png",
    // },
};
//Images for use in child map
const childIcons = {
    landmark: {
        name: "Landmark",
        icon: iconBase + "landmark-icon.png",
    },
    // museum: {
    //     name: "Museum & Gallery",
    //     icon: iconBase + "museum-gallery-icon.png",
    // },
    // leisure: {
    //     name: "Leisure Centre",
    //     icon: iconBase + "leisure-centre-icon.png",
    // },
    // library: {
    //     name: "Library",
    //     icon: iconBase + "library-icon.png",
    // },
    // market: {
    //     name: "Market",
    //     icon: iconBase + "market-icon.png",
    // },
    shopping: {
        name: "Shop",
        icon: iconBase + "shopping-icon.png",
    },
    community: {
        name: "Community Centre",
        icon: iconBase + "community-centre-icon.png",
    },
    // church: {
    //     name: "Church",
    //     icon: iconBase + "church-icon.png",
    // },
    // listed: {
    //     name: "Historical Building",
    //     icon: iconBase + "listed-building-icon.png",
    // },
    // cycle: {
    //     name: "Cycle Hub",
    //     icon: iconBase + "cycle-hub-icon.png",
    // },
    // car: {
    //     name: "Car Park",
    //     icon: iconBase + "car-park-icon.png",
    // },
    // train: {
    //     name: "Train Station",
    //     icon: iconBase + "train-station-icon.png",
    // },
};

//const directionsRenderer = new google.maps.DirectionsRenderer();
//const directionsService = new google.maps.DirectionsService();

/* Initialises a map using the Google Maps API */
async function initMap() {
    var myStyles = [
        {
            featureType: "poi",
            elementType: "labels",
            stylers: [
                {visibility: "off"}
            ]
        }
    ];

    var myOptions = {
        styles: myStyles
    };



    /* Creates a map at the div element with id 'map' */
    map = new google.maps.Map(document.getElementById("map"), {
        center: new google.maps.LatLng(52.950001, -1.150000),
        zoom: 13,
        options: myOptions,
        restriction: {
            latLngBounds: {
                north: 53.018280,
                east: -1.066910,
                south: 52.890209,
                west: -1.252945
            },
            strictBounds: true
        },
        mapId: mapID
    });

    //Initialise all pins to be showing
    for (let i = 0; i < showPinArr.length; i++) {
        showPinArr[i] = true;
    }

    let userLocationPin = await createUserLocationPin(map);

    //Create button to centre map on user location
    const centerLocationButton = document.getElementById("centerLocation");
    centerLocationButton.innerHTML = '<img src="../FrontEndImages/centerLocation.png">';
    map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(centerLocationButton);
    centerLocationButton.addEventListener('click', function () {
        map.panTo(userLocationPin.getPosition());
    });

    //Create button to redirect people to the directions page
    const directionsButton = document.getElementById("directions");
    directionsButton.style.marginBottom = "55px";
    directionsButton.innerHTML = '<img src="../FrontEndImages/some_other_directions.png">';
    map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(directionsButton);
    directionsButton.addEventListener('click', function () {
        window.location.href = "directions.html";
    });

    /**
     * Creates a legend for the map using the 'icons' array to display
     location icons alongside their names.
     @param isChildMap Boolean to see whether the child map or adult legend should be displayed
     */
    async function createLegend(isChildMap) {
        let pinArr;
        if (isChildMap)
            pinArr = await childPins();
        else
            pinArr = await pins();

        //Add onclick event for pins
        for (let j = 0; j < pinArr.length; j++) {
            for (let k = 0; k < pinArr[j].length; k++) {
                pinArr[j][k].addListener("click", () => {
                    closeAllInfoWindows(pinArr);
                    pinArr[j][k].infowindow.open({
                        anchor: pinArr[j][k],
                        map,
                    });
                });
            }
        }

        const legend = document.getElementById("legend");
        let i = 0;
        if (!isChildMap) {
            for (const key in adultIcons) {
                const type = adultIcons[key];
                const name = type.name;
                const icon = type.icon;
                const div = document.createElement("div");

                div.innerHTML = '<img src="' + icon + '"> ' + name;
                let iconPins = pinArr[i];
                let index = i;
                div.addEventListener('click', () => filter(iconPins, index, pinArr, userLocationPin.getPosition().lat(), userLocationPin.getPosition().lng()));
                legend.appendChild(div);
                i++;
            }
            //Filter out close transport links by default
            filter(pinArr[5], 5, pinArr, userLocationPin.getPosition().lat(), userLocationPin.getPosition().lng());
            filter(pinArr[6], 6, pinArr, userLocationPin.getPosition().lat(), userLocationPin.getPosition().lng());
        } else {
            for (const key in childIcons) {
                const type = childIcons[key];
                const name = type.name;
                const icon = type.icon;
                const div = document.createElement("div");

                div.innerHTML = '<img src="' + icon + '"> ' + name;
                let iconPins = pinArr[i];
                let index = i;
                div.addEventListener('click', () => filter(iconPins, index, pinArr, userLocationPin.getPosition().lat(), userLocationPin.getPosition().lng()));
                legend.appendChild(div);
                i++;
            }
        }
        map.controls[google.maps.ControlPosition.RIGHT_TOP].push(legend);
        return pinArr;
    }

    //Creates directions functions
    const directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    //Look to see whether the kids or adult map needs to be created (kids map uses mapID) the create one accordingly
    let pinArr;
    if (mapID) {
        pinArr = await createLegend(true);
    } else {
        pinArr = await createLegend(false);
    }

    //Only if user is in normal mode update transport markers
    if(!mapID) {
        updateShownMarkersLocation(userLocationPin, pinArr);
        setInterval(updateShownMarkersLocation, 60000, userLocationPin, pinArr);
    }
}

/**
 * Creates a Google Maps marker for each item in a table in the
 database. Uses longitude, latitude and name field of database entity.
 * @param {*} url api endpoint url
 * @param {*} icon image to be displayed for the marker
 * @param map Google maps map object
 * @returns Array of Google Maps marker objects
 */
async function createPins(url, icon, map){
    let markers = [];
    await $.getJSON(url, function( data ) {
		$.each( data, function( key, val ) {
			const marker = new google.maps.Marker({
				position: new google.maps.LatLng(val.LATITUDE, val.LONGITUDE),
				map: map,
				icon: icon,
                infowindow: new google.maps.InfoWindow({
                    content: val.NAME,
                })
			});
            markers.push(marker);
		});
	});
    return markers;
}

/**
 * Sets google map markers visibility to false
 * @param {*} pinArray Array of google map markers
 */
function hidePins(pinArray){
    for (let i = 0; i < pinArray.length; i++) {
        pinArray[i].setVisible(false);
    }
}

/**
 * Sets google map markers visibility to true
 * @param {*} pinArray Array of google map markers
 */
function showPins(pinArray){
    for (let i = 0; i < pinArray.length; i++) {
        pinArray[i].setVisible(true);
    }
}

/**
 * Hides or shows a set of pins based on the value in showPinArr
 * @param {*} pinArray Array of google map markers
 * @param {*} index Position of pin type in array
 * @param allPins
 * @param lat
 * @param lng
 */
function filter(pinArray, index, allPins, lat, lng){

    if(showPinArr[index] === true){
        hidePins(pinArray);
        showPinArr[index] = false;
    }
    else {
        //If the index is for transport links, only show close transport links
        if(index === 5 || index === 6){
            showTransportPins(allPins, index, lat, lng)
        }
        else{
            showPins(pinArray);
        }
        showPinArr[index] = true;
    }
    //Update the legend according to the map type
    if(mapID)
        updateChildLegend(allPins, lat, lng);
    else
        updateLegend(allPins, lat, lng);
}

/* Creates a Google Maps marker for each landmark item in the database. Uses the objects latitude, longitude, name and
info fields to create a marker with a description
   Parameters:
   url - api endpoint url
   icon - image to be displayed for the marker

   Return:
   Array of Google Maps marker objects
 */
async function createLandmarkPins(url, icon){
    let markers = [];

    const user = localStorage.getItem("userKey");
    const favRef = "https://nccopendata-370311-default-rtdb.europe-west1.firebasedatabase.app/users/" + user + "/favourites.json";
    var favourites = [];
    await $.getJSON(favRef, function(fav_locations) {
        favourites = fav_locations;
    });

    let landmarkInfo = [[2]];
    let landmarkOpen = [[2]];
    //Store landmarkinfo in 2d array
    await $.getJSON("https://nccopendata-370311-default-rtdb.europe-west1.firebasedatabase.app/landmark_info.json", (data)=>{
        $.each(data, (key, val)=>{
            landmarkInfo.push([val.NAME, val.INFO]);
            landmarkOpen.push([val.NAME, val.OPENTIME])
        });
    });

    let FactInfo = [[2]];
    await $.getJSON("https://nccopendata-370311-default-rtdb.europe-west1.firebasedatabase.app/landmark_buildings.json", (data)=>{
        $.each(data, (key, val)=>{
            FactInfo.push([val.NAME, val.FACT]);
        });
    });

    await $.getJSON(url, function( data ) {
        $.each( data, function( key, val ) {
            var fav = false;
            if(favourites !== null) {
                fav = (typeof Object.values(favourites).find(element => element.id === key)) !== "undefined";
            }
            let heart_state = fav ? 'class="heart heart-full"' : 'class="heart heart-empty"';
            let bulb_state = true ? 'class="bulb bulb-empty"' : 'class="bulb bulb-full"';
            let contentString;

            //If info about the landmark exists, save index of info
            let isInfo = false;
            let infoI;
            for (let i = 0; i < landmarkInfo.length; i++) {
                if(landmarkInfo[i][0] == val.NAME) {
                    isInfo = true;
                    infoI = i;
                }
            }

            let isFact = true;
            for (let i = 0; i < FactInfo.length; i++) {

                if(FactInfo[i][0] == val.NAME)
                    {  
                        if(FactInfo[i][1] == undefined)
                        {
                            isFact = false;
                        }
                    } 
            }
            
            if(isInfo) {
                var open_time = landmarkOpen[infoI][1] != undefined ? ('<p>' + landmarkOpen[infoI][1] + '<p>') : ('');
            }
            else {
                open_time = "";
            }

          if(isFact == true){
            if(isInfo){
                contentString =
                    '<div id="content">' +
                    '<h1>' + val.NAME + '</h1>' +
                    '<p>'+ landmarkInfo[infoI][1] +'</p>' +
                    open_time +
                    
                    // heart button
                    '<div class="favourite-container"><div id="fav-' + key + '" ' + heart_state + ' onclick="favourite(\'' + key + '\')"></div>' +
                    '<span id="fav-span">Favourite</span></div>' +

                    // lightbulb button
                    '<div class="bulb-container" ><div id="bulb-' + key + '" ' + bulb_state +  ' onclick="lightbulb(\'' + key + '\')"></div>' +
                    '<span id="bulb-span">Fun Fact!</span></div>' +
                    '<p id = "funFact"></p>' +
                    '</div>';
            }
           
            else  {
                contentString =
                '<div id="content">' +
                '<h1>' + val.NAME + '</h1>' +
                open_time +

                // heart button
                '<div class="favourite-container"><div id="fav-' + key + '" ' + heart_state + ' onclick="favourite(\'' + key + '\')"></div>' +
                '<span id="fav-span">Favourite</span></div>' +

                // lightbulb button
                '<div class="bulb-container" ><div id="bulb-' + key + '" ' + bulb_state +  ' onclick="lightbulb(\'' + key + '\')"></div>' +
                '<span id="bulb-span">Fun Fact!</span></div>' +
                '<p id = "funFact"></p>' +
                '</div>';

            }
        }
        else
        {
            if(isInfo){
                contentString =
                    '<div id="content">' +
                    '<h1>' + val.NAME + '</h1>' +
                    '<p>'+ landmarkInfo[infoI][1] +'</p>' +
                    open_time +
                    
                    // heart button
                    '<div class="favourite-container"><div id="fav-' + key + '" ' + heart_state + ' onclick="favourite(\'' + key + '\')"></div>' +
                    '<span id="fav-span">Favourite</span></div>'+

                    '</div>';
            }
           
            else  {
                contentString =
                '<div id="content">' +
                '<h1>' + val.NAME + '</h1>' +
                open_time +

                // heart button
                '<div class="favourite-container"><div id="fav-' + key + '" ' + heart_state + ' onclick="favourite(\'' + key + '\')"></div>' +
                '<span id="fav-span">Favourite</span></div>' +

                '</div>';
            }
        }

            const marker = new google.maps.Marker({
                position: new google.maps.LatLng(val.LATITUDE, val.LONGITUDE),
                map: map,
                icon: icon,
                infowindow: new google.maps.InfoWindow({
                    content: contentString,
                })
            });
            markers.push(marker);
        });
    });
    return markers;
}

/* Adds selected location key to user's favourites branch in database
 *
 * Parameters:
 * key - location key (corresponding to database key) to be favourited
 */
function favourite(key) {
    var favID = '#fav-' + key;
    var fav = $(favID);
    const user = AUTH.currentUser;
    let favRef = REF(DATABASE, 'users/' + user.uid + '/favourites');

    if(fav.hasClass("heart-empty")) {
        // Add selected location to user's favourites
        const newFavRef = PUSH(favRef);
        SET(newFavRef, {
            id: key
        });
    }
    else {
        // Remove selected location from user's favourites
        ONVALUE(favRef, (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                if(childSnapshot.val().id == key) {
                    // remove key
                    const favKeyRef = REF(DATABASE, 'users/' + user.uid + '/favourites/' + childSnapshot.key);
                    REMOVE(favKeyRef);
                }
            });
        }, {
            onlyOnce: true
        });
    }

    fav.toggleClass("heart-empty");
    fav.toggleClass("heart-full");
}


function lightbulb(key)
{

    let bulbRef = REF(DATABASE, 'landmark_buildings/');
    let verify = true;


    var bulbID = '#bulb-' + key;

    var bulb= $(bulbID);
    var fact = document.getElementById("funFact");

   


    if(bulb.hasClass("bulb-full")) {
        // make the facts blurb empty
        fact.innerHTML = "";
    }
    else {
        // add the fun fact
        ONVALUE(bulbRef, (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                if(childSnapshot.key == key){
                    const landmarkFact = childSnapshot.val().FACT;
                    fact.innerHTML = landmarkFact;
                    }
            });
        }, {
            onlyOnce: true
        });
    }

   

    

    bulb.toggleClass("bulb-empty");
    bulb.toggleClass("bulb-full");


}

//Updates the opacity of images within the legend to show whether the filter for each item type is on or off
async function updateLegend(pinArr, lat, lng){
    const legend = document.getElementById("legend");
    legend.innerHTML = "";
    let i = 0;
    for (const key in adultIcons) {
        const type = adultIcons[key];
        const name = type.name;
        const icon = type.icon;
        const div = document.createElement("div");
        div.innerHTML = '<img src="' + icon + '"> ' + name;
        if(showPinArr[i] === true){
            div.style.opacity = "1";
        }
        else
            div.style.opacity = "0.5";
        let iconPins = pinArr[i];
        let index = i;
        div.addEventListener('click', () => filter(iconPins, index, pinArr, lat, lng));
        legend.appendChild(div);
        i++;
    }
}

//Updates the opacity of images within the child legend to show whether the filter for each item type is on or off
async function updateChildLegend(pinArr, lat, lng){
    const legend = document.getElementById("legend");
    legend.innerHTML = "";
    let i = 0;
    for (const key in childIcons) {
        const type = childIcons[key];
        const name = type.name;
        const icon = type.icon;
        const div = document.createElement("div");
        div.innerHTML = '<img src="' + icon + '"> ' + name;
        if(showPinArr[i] === true){
            div.style.opacity = "1";
        }
        else
            div.style.opacity = "0.5";
        let iconPins = pinArr[i];
        let index = i;
        div.addEventListener('click', () => filter(iconPins, index, pinArr, lat, lng));
        legend.appendChild(div);
        i++;
    }
}

function setMapId(id){
    mapID = id;
}

/**
 * Fetch all pins from database and store in arrays
 * @returns 2d array containing them
 */
async function pins() {
    let pinArr = await childPins();
    let cycleHubPins = await createPins("https://nccopendata-370311-default-rtdb.europe-west1.firebasedatabase.app/cycle_hubs.json", adultIcons.cycle.icon, map);
    pinArr.push(cycleHubPins);
    let carParkPins = await createPins("https://nccopendata-370311-default-rtdb.europe-west1.firebasedatabase.app/car_parks.json", adultIcons.car.icon, map);
    pinArr.push(carParkPins);
    let tramPins = await createTramPins("https://nccopendata-370311-default-rtdb.europe-west1.firebasedatabase.app/tram_stops.json", adultIcons.tram.icon, map);
    pinArr.push(tramPins);
    let busStopPins = await createTramPins("https://nccopendata-370311-default-rtdb.europe-west1.firebasedatabase.app/bus_stops.json", adultIcons.bus.icon, map);
    pinArr.push(busStopPins);
    //let marketPins = await createPins("http://localhost:8080/api/market");
    return pinArr;
}
/**
 * Fetch all pins to show on the childrens map from the database and store in arrays
 * @returns 2d array containing them
 */
async function childPins(){
    let pinArr = [];
    let landmarkPins = await createLandmarkPins("https://nccopendata-370311-default-rtdb.europe-west1.firebasedatabase.app/landmark_buildings.json", adultIcons.landmark.icon, map);
    pinArr.push(landmarkPins);
    let shoppingAreaPins = await createPins("https://nccopendata-370311-default-rtdb.europe-west1.firebasedatabase.app/primary_shopping_area.json", adultIcons.shopping.icon, map);
    pinArr.push(shoppingAreaPins);
    let communityCentrePins = await createPins("https://nccopendata-370311-default-rtdb.europe-west1.firebasedatabase.app/community_centres.json", adultIcons.community.icon, map);
    pinArr.push(communityCentrePins);
    //let marketPins = await createPins("http://localhost:8080/api/market");
    return pinArr;
}

/**
 * Takes all markers in 2d Array and closes their related infowindow's
 * @param pinArr 2d Array containing google maps markers
 */
function closeAllInfoWindows(pinArr) {
    for (let i = 0; i < pinArr.length; i++) {
        for (let j = 0; j < pinArr[i].length; j++) {
            pinArr[i][j].infowindow.close();
        }
    }
}

/**
 * Adds a google maps marker to the map positioned at the users location. Updates the position of itself every 60 seconds
 * @param map Google maps map object
 * @returns {google.maps.Marker} Marker of the users location
 */
function createUserLocationPin(map){
    //Updates location of pin with the users current location
    function updateUserLocationPin(userLocationPin){
        navigator.geolocation.getCurrentPosition(function (position) {
            userLocationPin.setPosition(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
            map.panTo(userLocationPin.getPosition());
        }, function (error) {
            console.error(error);
        });
    }

    let lat;
    let lng;

    navigator.geolocation.getCurrentPosition(function (position) {
       lat = position.coords.latitude;
       lng = position.coords.longitude;
    }, function (error) {
        console.error(error);
    });

    //If the user has geolocation enabled, update position every minute
    if(window.navigator.geolocation) {
        //Create a pin for the users location if they accept. Every 60 seconds update location of pin
        const userLocationPin = new google.maps.Marker({
            map: map,
            position: new google.maps.LatLng(lat, lng)
        });

        let userLocationInfoWindow = new google.maps.InfoWindow({
            content: "<div id='userLocationPin'>" +
                "You are here" +
                "</div>",
        });

        //Remove the close button from info window
        google.maps.event.addListener(userLocationInfoWindow, 'domready', function(){
            $("#userLocationPin").parent().parent().next().remove();
        });

        userLocationInfoWindow.open(map, userLocationPin);

        updateUserLocationPin(userLocationPin);
        setInterval(updateUserLocationPin, 60000, userLocationPin);

        return userLocationPin;
    }
}

/**
 * Creates a Google Maps marker for each item in a table in the
 database. Uses longitude, latitude and stop name field of database entity.
 * @param url api endpoint url
 * @param icon image to be displayed for the marker
 * @param map Google maps map object
 * @returns Array of Google Maps marker objects
 */
async function createTramPins(url, icon, map){
    let markers = [];
    await $.getJSON(url, function( data ) {
        $.each( data, function( key, val ) {
            const marker = new google.maps.Marker({
                position: new google.maps.LatLng(val.LATITUDE, val.LONGITUDE),
                map: map,
                icon: icon,
                infowindow: new google.maps.InfoWindow({
                    content: val.STOP_NAME,
                }),
                zIndex: 0,
                //Required so that map circles load beneath
                optimized: false,
            });
            markers.push(marker);
        });
    });
    return markers;
}

//This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
//https://stackoverflow.com/questions/18883601/function-to-calculate-distance-between-two-coordinates
function calcCrow(lat1, lon1, lat2, lon2) {
    var R = 6371; // km
    var dLat = toRad(lat2 - lat1);
    var dLon = toRad(lon2 - lon1);
    var lat12 = toRad(lat1);
    var lat22 = toRad(lat2);

    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat12) * Math.cos(lat22);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
}

// Converts numeric degrees to radians
function toRad(Value) {
    return Value * Math.PI / 180;
}

/**Shows all pins in a 2km radius on the map
 * @param pins A 2d array of google maps markers
 * @param i Index of the array to access
 * @param lat User latitude
 * @param long User longitude
 */
function showTransportPins(pins, i, lat, long){
    for (let j = 0; j < pins[i].length; j++) {
        let pinPos = pins[i][j].getPosition();
        if (calcCrow(lat, long, pinPos.lat(), pinPos.lng()) > 2) {
            pins[i][j].setVisible(false);
        } else {
            pins[i][j].setVisible(true);
        }
    }
}

/**Calculates directions from user to selected pin's location
 * @param directionsService
 * @param directionsRenderer
 * @param pinLat
 * @param pinLng
 */
function calculateAndDisplayRoute(directionsService, directionsRenderer,pinLat, pinLng) {
    // Check if the browser supports geolocation
    if (navigator.geolocation) {
        // Get the user's current location
        navigator.geolocation.getCurrentPosition(function(position) {
            // Set the destination to pin


            var destination = {lat:pinLat, lng:pinLng};

            // Create the request object
            var request = {
                origin: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                destination: destination,
                travelMode: google.maps.DirectionsTravelMode.DRIVING
            };

            // Send the request to the DirectionsService
            directionsService.route(request, function(response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    // Display the directions on the map using the DirectionsRenderer
                    directionsRenderer.setDirections(response);
                }
            });
        });
    } else {
        // Geolocation is not supported by the browser
        alert("Geolocation is not supported by your browser.");
    }
}

/**Toggles whether the pins in the array are shown or hidden if they are not within 2 km
 * @param userLocationPin
 * @param pins 2d array of google maps markers
 */
function updateShownMarkersLocation(userLocationPin, pins) {
    let lat = userLocationPin.getPosition().lat();
    let long = userLocationPin.getPosition().lng();

    if(showPinArr[5]) {
        showTransportPins(pins, 5, lat, long);
    }
    if(showPinArr[6]) {
        showTransportPins(pins, 6, lat, long);
    }

    //Get info from map about closest transport links
    let tramDist = Number.MAX_VALUE;
    let tramStop;
    let tramPos;
    let busDist = Number.MAX_VALUE;
    let busStop;
    let busPos;
    for (let j = 0; j < pins[5].length; j++) {
        let pinPos = pins[5][j].getPosition();
        if (calcCrow(lat, long, pinPos.lat(), pinPos.lng()) < tramDist) {
            tramDist = calcCrow(lat, long, pinPos.lat(), pinPos.lng());
            tramStop = pins[5][j].infowindow.getContent();
            tramPos = pins[5][j].getPosition();
        }
    }
    for (let j = 0; j < pins[6].length; j++) {
        let pinPos = pins[6][j].getPosition();
        if (calcCrow(lat, long, pinPos.lat(), pinPos.lng()) < busDist) {
            busDist = calcCrow(lat, long, pinPos.lat(), pinPos.lng());
            busStop = pins[6][j].infowindow.getContent();
            busPos = pins[6][j].getPosition();
        }
    }


    //Make div to show closest transport info
    let d = document.getElementById("infodiv");
    d.innerHTML = "";
    d.innerHTML = 'The closest tram stop is ' + tramStop + ' which is ' + Number(tramDist).toFixed(2) + " km away";
    d.innerHTML += '<br>';
    d.innerHTML += 'The closest bus stop is ' + busStop + ' which is ' + Number(busDist).toFixed(2) + " km away";
    d.style.backgroundColor = "white";
    d.style.marginTop = "50px";
    map.controls[google.maps.ControlPosition.TOP_CENTER].clear();
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(d);

}

window.initMap = initMap;
window.setMapId = setMapId;
