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


await listOfPlaces();
filter();
var clone;
searchBar();




async function listOfPlaces(){
 auth.onAuthStateChanged(function(user){ // if user signed in
    if(user){
        const dbRef = ref(getDatabase());
        var user = auth.currentUser;

        get(child(dbRef, "places_to_eat_NOTT/")).then((snapshot) =>{ // iterates through places to eat db
            if(snapshot.exists()){
                snapshot.forEach((childSnapshot) =>{

                   
                    const foodId = childSnapshot.key; // labels all attrbutes of a place to eat
                    const foodName = childSnapshot.val().name;
                    const foodCuis = childSnapshot.val().cuisine;
                    const foodImage = childSnapshot.val().image_url;
                    
                    const item = document.createElement("BUTTON"); // creates button  and adds images and description
                    item.className = "btn-food";
                    var myPath = foodImage; // initialises string variable myPath
                    var myImg = document.createElement('img'); // creates a new img element
                    myImg.setAttribute('src', myPath); // adds a src attribute (with the value myPath) to myImg
                    myImg.className = "image-style";
                    item.appendChild(myImg);

                    const brk = document.createElement("BR")
                    var node = document.createTextNode(foodName);
                    item.appendChild(node);
                    const br = document.createElement("BR")
                    item.appendChild(br);
                   
                    var span = document.createElement('span');
                    

                    span.className = "food-description";
                    node = document.createTextNode(foodCuis);
                    span.appendChild(node);
                    item.appendChild(span);
                    const element = document.getElementById("food-list");
                    element.appendChild(item);
                    element.appendChild(brk);

                })
                clone = document.getElementById("food-list").cloneNode(true);
            }
        })

    }
})
}


function generateNewSearch(togglesText)
{
    const element = document.getElementById("food-list");
    console.log(clone.children)
    var children = clone.children;
    element.innerHTML = '';

            for(var x=0;x<children.length; x++){
                var child = children[x].cloneNode(true);
                console.log(child.textContent);
                if (child.textContent.includes(togglesText) == true)
                {
                    element.appendChild( child );
                }
            }
    
}


function generateNewList(toggles,togglesText) {
    const element = document.getElementById("food-list");
    console.log(clone.children)
    var children = clone.children;
    element.innerHTML = '';


    for (var i = 0; i < toggles.length; i++) {
        if (toggles[i].checked) {       
            for(var x=0;x<children.length; x++){
                var child = children[x].cloneNode(true);
                if (child.textContent.includes(togglesText[i]) == true)
                {
                    element.appendChild( child );
                }
            }
        }
    }

}


function filter()
{
    var cb1 = document.getElementById('element1');
    var cb2 = document.getElementById('element2');
    var cb3 = document.getElementById('element3');
    var cb4 =  document.getElementById('element4');
    var cb5 =  document.getElementById('element5');
    var cb6 =  document.getElementById('element6');
    var cb7 =  document.getElementById('element7');
    const filterList = [cb1,cb2,cb3,cb4,cb5,cb6,cb7];
    const filterListText = ["American","Bars","Belgian","British","Chinese","Indian","Seafood"]

    for (var i = 0; i<filterList.length;i++) {
        console.log(filterList[i]);
        filterList[i].addEventListener("click", () => {
            generateNewList(filterList,filterListText);
        })
    
    }

}


function searchBar()
{
    



    var search = document.getElementById('finput');
		search.addEventListener("keypress", function(e) {
		if (e.keyCode === 13) {
			e.preventDefault();
            console.log(search.value);
            generateNewSearch(search.value);

  		}
		});



}