"""
Requirements

Output Req: name,image_url,cuisine,latitude,longitude

R1: Get 50 top-rated restaurants in Nottingham
R2: Get 10 top-rated restaurants in a radius of 2000m from A32 (52.95339951998661, -1.1872889220872849)
"""

# Module Imports
import json
import requests
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

# Firebase Initialization
credentialsObject = credentials.Certificate('M2/theDBKEY.json')
defaultDatabase = firebase_admin.initialize_app(credentialsObject, {
    'databaseURL': "https://nccopendata-370311-default-rtdb.europe-west1.firebasedatabase.app"
})

# Yelp-Api Initialization
url = 'https://api.yelp.com/v3/businesses/search'
api_key = "JtQUqU8wCYL5eZWZQW_urkF73TNVhWdcon_MHUEqziXcYA9zkr36SRcc-P_CoNDbewlC6TMk34gi0lQxPNwoM97MhkXct4JqbYwll0nqBGRwLb_nH_OW37TnZiUfZHYx"
headers = {'Authorization': f'Bearer {api_key}'}

# Helper Functions

def filter(restaurantDict): # filters the dictionary based on the data points required
    # dict -> dict
    resDict = {} # Initialize an empty dictionary to store the filtered results

    # Filter out the relevant data from the original data dictionary
    resDict['name'] = restaurantDict['name']
    resDict['image_url'] = restaurantDict['image_url']
    resDict['longitude'] = restaurantDict['coordinates']['longitude']
    resDict['latitude'] = restaurantDict['coordinates']['latitude']

    # Quick Code Revision - Cuisine (avoids duplication of cuisine types)
    cuisines = []
    for category in restaurantDict['categories']:
        if restaurantDict['categories'][0]['title'] not in cuisines:
            cuisines.append(restaurantDict['categories'][0]['title'])

    if len(cuisines) > 1:
        resDict['cuisine'] = '.'.join(x for x in cuisines)
    else:
        resDict['cuisine'] = cuisines[0]
    
    return resDict

def convert2JSON(data): # takes in the raw data and (filters +) converts it into JSON format
    # dict -> [dict]
    jsonData = [] # Initialize empty list

    # iterate through the data returned by the api and apply the filter to generate a new JSON set
    for i in data['businesses']:
        jsonData.append(filter(i))
    
    return jsonData

def push2Firebase(jsonData,title): # pushes json data to firebase
    # str -> None
    ref = db.reference(f"/{title}") # reference to the database table

    if(ref.get() == None): # sanity check :  whether the table exists or not
        for i in jsonData:
            ref.push(i)
    else:
        # Write Code to Update that directory
        print("Error, Already Exists")

# Body Functions
def M2(R,location,numRes,radius,title): # Function Written for Requirement 1
    # list,int,int,str -> None
    # Quick Note: this function is based on requirements for the prototype ; These are extendable.

    # Yelp-Api Parameters (below are relevant parameters to the project)
    if R=='R1':
        params = {'location':'Nottingham','term':'restaurant','radius': radius,
            'limit':numRes,'offset':0,'min_rating':4.0}
    else:
        params = {'latitude':location[0],'longitude':location[1],'term':'restaurant',
            'radius': radius,'limit':numRes,'offset':0,'min_rating':4.0}
    
    # GET request to extract the relevant data
    rawData = requests.get(url,headers=headers,params=params)

    # Converting to JSON
    data = json.loads(rawData.text)

    # Prepare the data to push to the firebase db
    toPushData = convert2JSON(data)

    # Push the data to the firebase db
    push2Firebase(toPushData,title)
