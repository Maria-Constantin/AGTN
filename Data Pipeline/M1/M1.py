# Goal : automatically update the data in 1 csv file based on a new csv file
# Condition1 : has to be in a time interval of 15min (TBD)
# Condition2 : has to produce a new csv file highlighting differences in the data
# Condition3 : all CSVs returned in this program are to be also converted to JSON

# Module Imports
import csv
import requests
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

# Initializing Firebase Database
credentialsObject = credentials.Certificate('M1/theDBKEY.json')
defaultDatabase = firebase_admin.initialize_app(credentialsObject, {
    'databaseURL': "https://nccopendata-370311-default-rtdb.europe-west1.firebasedatabase.app"
})

# Database Tables for Updating
dbTables = ['bus_stops','bus_tram_lanes','car_parks','city_centre_boundary',
            'community_centres','cycle_hubs','landmark_buildings',
            'leisure_centres','libraries','listed_buildings',
            'markets','museums_galleries','park_and_ride',
            'places_of_worship','primary_shopping_area','railway_stations','tram_stops']

# Schema Dictionary (keys -> fields in firebase ; values -> fields in ncc data)
schemaDict = {'ADDRESS':'ADDRESS',
              'CAPACITY':'CAPACITY',
              'CAR_SPACES':'CAR_SPACES',
              'CONTACT':'CONTACT',
              'DESCRIPTION':'DESC',
              'DIRECTION':'DIRECTION',
              'DISABLED':'DISABLED',
              'HECTARES':'HECTARES',
              'LANE_TYPE':'LANE_TYPE',
              'LATITUDE':'LAT',
              'LATITTUDE':'LAT',
              'LIST_DATE':'LIST_DATE',
              'LOCALITY':'LOCALITY',
              'LONGITUDE':'LONG',
              'NAME':'NAME',
              'OPEN':'OPEN',
              'OPENING':'OPENING',
              'PAYMENT':'PAYMENT',
              'PERIMETER':'PERIMETER',
              'POSTCODE':'POSTCODE',
              'ROAD_NAME':'ROAD_NAME',
              'SERVICE':'SERVICE',
              'SHAPE.LEN':'SHAPE.LEN',
              'SIDE_OF_ROAD':'SIDE_OF_ROAD',
              'STOP_NAME':'STOP_NAME',
              'STREET_NAME':'STREET_NAME',
              'TIMES':'TIMES',
              'TYPE':'TYPE',
              'WEBSITE':'WEBSITE',
              'X':'X',
              'Y':'Y'}

# Database Dictionary for getting from the NCC website
databaseDict = {
'bus_stops' : "https://geoserver.nottinghamcity.gov.uk/opendata/csv/spatial/ncc_Bus_Stops.csv?t=638143218737595145", 
'bus_tram_lanes': "https://geoserver.nottinghamcity.gov.uk/opendata/csv/spatial/ncc_Bus_Tram_Lanes.csv?t=638143218930684682", 
'car_parks': "https://geoserver.nottinghamcity.gov.uk/opendata/csv/spatial/ncc_Car_Parks.csv?t=638143219074270728", 
'city_centre_boundary': "https://geoserver.nottinghamcity.gov.uk/opendata/csv/attribute/ncc_CityCentreBoundary_2020.csv?t=638143220650459513", 
'community_centres': "https://geoserver.nottinghamcity.gov.uk/opendata/csv/spatial/ncc_CommunityCentres.csv?t=638143219537461991", 
'cycle_hubs': "https://geoserver.nottinghamcity.gov.uk/opendata/csv/spatial/ncc_Cycle_hubs_hire.csv?t=638143219670787229", 
'landmark_buildings': "https://geoserver.nottinghamcity.gov.uk/opendata/csv/attribute/ncc_Landmark_Buildings_2020.csv?t=638143220829773121", 
'leisure_centres': "https://geoserver.nottinghamcity.gov.uk/opendata/csv/spatial/ncc_LeisureCentres.csv?t=638143220150996170", 
'libraries': "https://geoserver.nottinghamcity.gov.uk/opendata/csv/spatial/ncc_Libraries.csv?t=638143220276838881", 
'listed_buildings': "https://geoserver.nottinghamcity.gov.uk/opendata/csv/spatial/ncc_Listed_Buildings.csv?t=638143220397753182", 
'markets': "https://geoserver.nottinghamcity.gov.uk/opendata/csv/spatial/ncc_Markets.csv?t=638143221096795162", 
'museums_galleries': "https://geoserver.nottinghamcity.gov.uk/opendata/csv/spatial/ncc_MuseumsAndGalleries.csv?t=638143221210258404", 
'park_and_ride': "https://geoserver.nottinghamcity.gov.uk/opendata/csv/spatial/ncc_Park_and_Ride.csv?t=638143221322075243",
'primary_shopping_area': "https://geoserver.nottinghamcity.gov.uk/opendata/csv/attribute/ncc_PrimaryShoppingArea_2020.csv?t=638143222100424409",
'railway_stations': "https://geoserver.nottinghamcity.gov.uk/opendata/csv/spatial/ncc_Railway_Stations.csv?t=638143221545480137", 
'tram_stops': "https://geoserver.nottinghamcity.gov.uk/opendata/csv/spatial/ncc_Tram_stops.csv?t=638143221811953135"
}

# Exception : latitude is spelt accidentally as "LATITTUDE" in the leisure centres table

# Temporary Function (Useful for Maintenance - one use functions)

def getSchemaDbTable(title):
    ref = db.reference(f'/{title}')
    data = ref.get()
    token = list(ref.get())[0]
    schemaDict = list(ref.get()[token])

    return schemaDict

def getGeneralSchema():
    schemaList = []
    tableWiseSchemaDict = {}
    
    for i in dbTables:
        tableWiseSchemaDict[i] = getSchemaDbTable(i)
        for j in getSchemaDbTable(i):
            if j not in schemaList:
                schemaList.append(j)
    
    return tableWiseSchemaDict

# General Helper Functions

def cleanFile(fileData): # Removes rows in the data that have missing data in them
    # [list] -> [list]
    data = []
    for i in fileData:
        if ("" in i) or (" " in i):
            pass
        else:
            data.append(i)
    return data

def getSchema(fileData): # Returns the Schema of the Dataset
    # [list] -> list
    return fileData[0]

def readNClean(filename): # reads and cleans each CSV
    # str -> [list]
    # Sub-Function I : Open file and Read it into a list
    uncleaned = []
    with open(filename,'r') as f:
        reader = csv.reader(f)
        schema = next(reader)
        uncleaned.append(schema)
        for row in reader:
            row = [int(num) if num else "" for num in row]
            uncleaned.append(row)
    
    # Sub-Function II : Apply cleanFile on the uncleaned data to produce the result
    cleanedSet = cleanFile(uncleaned)

    # Sub-Function III : Validating that the cleanedSet is a subset of the original dataset
    if(getSchema(cleanedSet) == getSchema(uncleaned)):
        return cleanedSet # returns a list a:as s.t. a = schema and as is the data
    else:
        return uncleaned # this is for contingency incase there are problems with the cleanedSet

def findCombineDiff(dataset1,dataset2): # finds differences between 2 sets of data
    # [list],[list] -> [list] 
    # this function assumes that both dataset1 and dataset2 are clean

    # Sub-Program I : finds the 2-way differences
    d1NotInD2 = []
    d2NotInD1 = []

    for i in dataset1:
        if i not in dataset2:
            d1NotInD2.append(i)
    
    for j in dataset2:
        if j not in dataset1:
            d2NotInD1.append(j)
    
    # Sub-Program II : Combines those 2 lists into 1 (and avoids duplication)
    diff = d1NotInD2
    
    for i in d2NotInD1:
        if i not in diff:
            diff.append(i)

    # Sub-Program III : Combined the diffSet with the latest dataset to form the update set
    result = dataset2

    for k in diff:
        if k not in result:
            result.append(k)

    return result # this returns a nested list s.t. list[0] = schema and list[1:] = data

def convert2JSON(dataset): # converts an existing dataset into json format
    # [list] -> str
    # assume that the Schema is dataset[0] and Data is dataset[1:]

    jsonDataset = []
    schema = dataset[0]
    for i in range(1,len(dataset)):
        tempDict = {}
        for j in range(len(schema)):
            tempDict[schema[j]] = dataset[i][j]
        jsonDataset.append(tempDict)
    
    return jsonDataset

def getDataFromDict(dataDict): # takes in 1 line of a dictionary and outputs the corresponding list of data
    # dict -> list
    resData = []
    for i in dataDict:
        resData.append(dataDict[i])
    
    return resData

# Helper Functions - WEB SCRAPING + FIREBASE OPERATIONS

def getData(keyword,dbDict): # scrapes the NCCOPENDATA Website based on an input keyword, returns data in json format
    # str,dict -> [list]
    # assuming that there are only a known-finite set of databases to update
    url = dbDict[keyword] # using a prepared dictionary to get the relevant url

    # Sub-Program I : using the requests library to get the csvfile from the url
    req = requests.get(url)
    req.encoding = req.apparent_encoding
    
    # Sub-Program II : decoding the request response to text and converting it to a nested list
    data = req.text
    reader = csv.reader(data.splitlines(),delimiter=',')
    data = list(reader)

    return data # data[0] is the Schema and data[1:] is the Data

def push2Firebase(jsonData,title): # pushes json data to firebase
    # str -> None
    # Credentials for the Firebase Realtime Database
    
    ref = db.reference(f"/{title}") # reference to the database table

    if(ref.get() == None): # sanity check :  whether the table exists or not
        for i in jsonData:
            ref.push(i)
    else:
        # Write Code to Update that directory
        print("Error, Already Exists")

def removeFromFirebase(title): # retrieves the data from firebase into a nested list and then deletes the table
    # str -> [list]
    ref = db.reference(f"/{title}")
    data = []

    if(ref.get() != None): # sanity check :  whether the table exists or not
        # Sub-Program II : Get the schema from ref and add it to the data list
        expToken = list(ref.get())[0]
        expDict = ref.get()[expToken]
        schema = list(expDict)
        data.append(schema)

        # Sub-Program III : Get the data and add it to the data list
        for i in list(ref.get()):
            data.append(getDataFromDict(ref.get()[i]))

        # Sub-Program III : Delete the table from the database
        ref.delete()
    else:
        print(f"{title} Doesn't Exist")
    
    return data

def updateData(newJSONData,title,schemaDict): # updates data by 2 operations (1. remove data then 2. add new data)
    # [dict],[dict],str -> None
    removeFromFirebase(title)
    push2Firebase(newJSONData,title)

# Main Function

def M1(databaseTable, dbDict,schemaDict):
    # str,dict,dict -> None

    # remove data from the firebase temporarily
    oldData = removeFromFirebase(databaseTable)

    oldDataSchema = getSchema(oldData)
    oldData = oldData[1:]

    # sanity check for existence of the database table ; termination indicates no existence
    if(oldData == []):
        print(f"Error : {databaseTable} Doesnt Exist")
        return None
    
    # get the data from the ncc website
    newRawData = getData(databaseTable,dbDict) 

    # initial processing of raw data
    rawSchema = newRawData[0] # schema extraction
    rawData = cleanFile(newRawData) # high-level data cleaning

    # Schema Translation to prep for filtering the data columns
    schemaForFilter = []

    i=0
    for i in oldDataSchema:
        schemaForFilter.append(schemaDict[i])

    i=0
    schemaIndices = []
    for i in range(len(schemaForFilter)):
        schemaIndices.append(rawSchema.index(schemaForFilter[i]))

    # Application of the filter to generate data for updating
    newFilteredData = []
    i=0
    for i in range(1,len(rawData)):
        for j in range(len(rawData[i])):
            tempFilteredData = []
            for k in schemaIndices:
                if j==k:
                    tempFilteredData.append(rawData[i][j])
        newFilteredData.append(tempFilteredData)
    
    # Combine any differences in the new and old data
    newData = []
    newData = findCombineDiff(newFilteredData,oldData)

    newData.remove([])
    newData.insert(0,oldDataSchema)
    

    # Convert to JSON format, ready to push to firebase
    data2Push = convert2JSON(newData)

    # Pushing to firebase
    push2Firebase(data2Push,databaseTable)