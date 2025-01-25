 // import Firebase features
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getDatabase, ref, set, get, push, child, orderByChild, equalTo, remove, onValue } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";
import { getAuth, updateProfile,onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

// app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyAzS4vlIj4owXJl2oldZKw30cCjHXgSvtY",
    authDomain: "nccopendata-370311.firebaseapp.com",
    databaseURL: "https://nccopendata-370311-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: "nccopendata-370311",
    storageBucket: "nccopendata-370311.appspot.com",
    messagingSenderId: "127216525001",
    appId: "1:127216525001:web:037425aa4c3a578b3db718",
    measurementId: "G-LQM24ZDSBD"
};
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();
  
window.AUTH = auth;
window.REF = ref;
window.DATABASE = database;
window.SET = set;
window.PUSH = push;
window.GET = get;
window.CHILD = child;
document.ORDERBYCHILD = orderByChild;
window.EQUALTO = equalTo;
window.REMOVE = remove;
window.ONVALUE = onValue;

var req = false;

 /**
 * Connect to the database
 * If a current user is logged in, get their favourites
 */
auth.onAuthStateChanged(function(user){
    if(user){
        const dbRef = ref(getDatabase());
        var user = auth.currentUser;
        //get the favourites from the user
        get(child(dbRef, "users/" + user.uid + "/favourites")).then((snapshot) => {
            if(snapshot.exists()){  //if there are any favourites, get their id
                snapshot.forEach((childSnapshot) =>{
                    const favId = childSnapshot.val().id;
                    console.log(snapshot.val()); //check if ids match
                    /**
                     * Iterate through landmark buildings
                     * Check if favourite places id matches a landmark id
                     * Return the name of the landmark id
                     * Create list element and display the name of the landmark
                     */
                    get(child(dbRef, "landmark_buildings/")).then((snapshot) =>{
                        if(snapshot.exists()){
                            snapshot.forEach((childSnapshot) =>{
                                const landmarkId = childSnapshot.key;
                                const landmarkName = childSnapshot.val().NAME;
                                if(favId == landmarkId){
                                    console.log(landmarkName); //check if name matches
                                    //create HTML elements
                                    const item = document.createElement("BUTTON");
                                    item.className = "btn-favs";
                                    const brk = document.createElement("BR")
                                    const node = document.createTextNode(landmarkName);
                                    item.appendChild(node);
                                    //chevron
                                    const chevron = document.createElement("div");
                                    chevron.className = "chevron";
                                    item.appendChild(chevron);
                                    const element = document.getElementById("favourites-list");
                                    element.appendChild(item);
                                    element.appendChild(brk);
                                    item.addEventListener("click",
                                        async function () {
                                            window.location.href="mapNormal.html";
                                    });
                                }
                            })
                        }

                    })
                    })
                }})
            }else{
                console.log("No data available");
            }
        }).catch((error) =>{
            console.error(error);
        })

 async function function1(landmarkId) {
     const loc = await getLatLng(landmarkId);
     return loc;
 }
 async function getLatLng(landmarkID){
     const dbRef = ref(getDatabase());
     const snapshot = await get(child(dbRef, "landmark_buildings/"));
     let latLng;
     snapshot.forEach((childSnapshot) =>{
         const landmarkId = childSnapshot.key;
         if(landmarkID == landmarkId) {
             const latitude = childSnapshot.val().LATITUDE;
             const longitude = childSnapshot.val().LONGITUDE;
             latLng = [latitude, longitude];
         }
     });
     return latLng;
 }

 function setMapId(id){
     mapID = id;
 }
 async function newMap(location){
    // list -> None
     map = new google.maps.Map(document.getElementById("favmap"), {
         center: new google.maps.LatLng(52.950001, -1.150000),
         zoom: 13,
         restriction: {
             latLngBounds: {
                 north: 53.018280,
                 east: -1.066910,
                 south: 52.890209,
                 west: -1.252945
             },
             strictBounds: true
         },
     });

     var marker = new google.maps.Marker({
         position: { lat: location[0], lng: location[1] },
         map: map,
     });

 }
 function function2() {
     google.maps.event.addDomListener(window, 'load', newMap);
 }