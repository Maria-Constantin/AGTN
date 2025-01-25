import M1

"""
Function List

cleanFile(fileData): # Removes rows in the data that have missing data in them
getSchema(fileData): # Returns the Schema of the Dataset
readNClean(filename): # reads and cleans each CSV
findCombineDiff(dataset1,dataset2): # finds differences between 2 sets of data and combines it with the new dataset
convert2JSON(dataset): # converts an existing dataset into json format

getData(keyword): # searches the ncc database based on a keyword and updates the db
push2Firebase(jsonData,title): # pushes a json string to firebase under a certain title
removeFromFirebase(title): # retrieves the data from firebase into a nested list and then deletes the table
updateData(newJSONData,title,schemaDict): # updates data by 2 operations (1. remove data then 2. add new data)

M1(databaseTable, dbDict, schemaDict): # integration function for a table in the list of database tables ; designed to be periodically called for automatic updates
"""
# need to setup a dictionary that holds the database reference and corresponding URL
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


oldtestJSONDATA = [{"A":1,"B":2,"C":3,"D":4},{"A":12,"B":22,"C":32,"D":24}]
newtestJSONDATA = [{"A":90,"B":2,"C":3,"D":40},{"A":12,"B":22,"C":32,"D":24}]

# FUNCTION TESTS

outputFile = []

"""
cleanFile (cF)

Test 1
    cF_testData1 = [[0,1,"Hello",""],[2,3,"Bye","Hi"],[10,20,"e","i"]]
    cF_expectedResult1 = [[2,3,"Bye","Hi"],[10,20,"e","i"]]

Test 2
    cF_testData2 = [[0,1,"Hello",""],[2,3,"","Hi"],[10,20,"e","i"]]
    cF_expectedResult2 = [[10,20,"e","i"]]

Test 3
    cF_testData3 = [[],["",2,3]]
    cF_expectedResult3 = [[]]
"""
cF_testData1 = [[0,1,"Hello",""],[2,3,"Bye","Hi"],[10,20,"e","i"]]
cF_expectedResult1 = [[2,3,"Bye","Hi"],[10,20,"e","i"]]

outputFile.append(cF_expectedResult1 == M1.cleanFile(cF_testData1))

cF_testData2 = [[0,1,"Hello",""],[2,3,"","Hi"],[10,20,'e','i']]
cF_expectedResult2 = [[10,20,'e','i']]

outputFile.append(cF_expectedResult2 == M1.cleanFile(cF_testData2))

cF_testData3 = [[],["",2,3]]
cF_expectedResult3 = [[]]

outputFile.append(cF_expectedResult3 == M1.cleanFile(cF_testData3))

"""
getSchema (gS)

Test1
    gS_testData1 = [['A','B','C','D'],[0,1,2,3],[2,3,4,5]]
    gS_expectedResult1 = ['A','B','C','D']

"""
gS_testData1 = [['A','B','C','D'],[0,1,2,3],[2,3,4,5]]
gS_expectedResult1 = ['A','B','C','D']

outputFile.append(gS_expectedResult1 == M1.getSchema(gS_testData1))

"""
readNClean (rNC)

Test1 
    rNC_testData1 = "rNC_testData1.csv"
    rNC_expectedResult1 = [['A','B','C','D'],[1,2,3,4],[2,3,6,7],[5,6,7,8]]

Test2
    rNC_testData2 = "rNC_testData2.csv"
    rNC_expectedResult2 = [['A','B','C',''],[2,3,4,5],[4,5,6,1]]

"""
rNC_testData1 = "M1/rNC_testData1.csv"
rNC_expectedResult1 = [['A','B','C','D'],[1,2,3,4],[2,3,6,7],[5,6,7,8]]

outputFile.append(M1.readNClean(rNC_testData1)==rNC_expectedResult1)

rNC_testData2 = "M1/rNC_testData2.csv"
rNC_expectedResult2 = [['A','B','C',''],[2,3,4,5],[4,5,6,1]]

outputFile.append(M1.readNClean(rNC_testData2)==rNC_expectedResult2)
# Need to Prep the csv files for this, come back for this later

"""
findCombineDiff (fCD)

Test1 
    fCD_testData1_1 = [['A','B','C','D'],[1,4,3,2],[4,5,1,3]]
    fCD_testData1_2 = [['A','B','C','D'],[1,4,3,2],[10,5,1,3]]
    fCD_expectedResult1 = [['A','B','C','D'],[1,4,3,2],[4,5,1,3],[10,5,1,3]]

Test2
    fCD_testData2_1 = [['A','B','C','D'],[1,4,3,2],[4,5,1,3]]
    fCD_testData2_2 = [['A','B','C','D'],[1,4,0,2],[4,5,1,3]]
    fCD_expectedResult2 = [['A','B','C','D'],[1,4,0,2],[4,5,1,3],[1,4,3,2]]

"""
fCD_testData1_1 = [['A','B','C','D'],[1,4,3,2],[4,5,1,3]]
fCD_testData1_2 = [['A','B','C','D'],[1,4,3,2],[10,5,1,3]]
fCD_expectedResult1 = [['A','B','C','D'],[1,4,3,2],[10,5,1,3],[4,5,1,3]]

outputFile.append(fCD_expectedResult1 == M1.findCombineDiff(fCD_testData1_1,fCD_testData1_2))

fCD_testData2_1 = [['A','B','C','D'],[1,4,3,2],[4,5,1,3]]
fCD_testData2_2 = [['A','B','C','D'],[1,4,0,2],[4,5,1,3]]
fCD_expectedResult2 = [['A','B','C','D'],[1,4,0,2],[4,5,1,3],[1,4,3,2]]

outputFile.append(fCD_expectedResult2 == M1.findCombineDiff(fCD_testData2_1,fCD_testData2_2))

"""
convert2JSON (c2J)

Test1
    c2J_testData1 = [['A','B','C','D'],[1,4,3,2],[4,5,1,3]]
    c2J_expectedResult1 = [{'A':1,'B':4,'C':3,'D':2},{'A':4,'B':5,'C':1,'D':3}]

Test2
    c2J_testData2 = [['A','B','C','D'],[1,4,3,2],[4,0,500,3]]
    c2J_expectedResult2 = [{'A':1,'B':4,'C':3,'D':2},{'A':4,'B':0,'C':500,'D':3}]

"""
c2J_testData1 = [['A','B','C','D'],[1,4,3,2],[4,5,1,3]]
c2J_expectedResult1 = [{'A':1,'B':4,'C':3,'D':2},{'A':4,'B':5,'C':1,'D':3}]

outputFile.append(c2J_expectedResult1 == M1.convert2JSON(c2J_testData1))

c2J_testData2 = [['A','B','C','D'],[1,4,3,2],[4,0,500,3]]
c2J_expectedResult2 = [{'A':1,'B':4,'C':3,'D':2},{'A':4,'B':0,'C':500,'D':3}]

outputFile.append(c2J_expectedResult2 == M1.convert2JSON(c2J_testData2))

"""
getDataFromDict (gDFD)

Test1
    gDFD_testData1 = {'A':1,'B':2,'C':3,'D':4}
    gDFD_expectedResult1 = [1,2,3,4]

"""
gDFD_testData1 = {'A':1,'B':2,'C':3,'D':4}
gDFD_expectedResult1 = [1,2,3,4]

outputFile.append(gDFD_expectedResult1 == M1.getDataFromDict(gDFD_testData1))

"""
getData (gD)

Test1
    gD_testData1_1 = 'markets'
    gD_testData1_2 = dbDict
    gD_expectedResult1 = [..] (Unequal to None)

Test2
    gD_testData2_1 = 'bus_tram_lanes'
    gD_testData2_2 = dbDict
    gD_expectedResult2 = [..] (Unequal to None)

"""
gD_testData1_1 = 'markets'
gD_testData1_2 = databaseDict

outputFile.append(None!=M1.getData(gD_testData1_1,gD_testData1_2))

gD_testData2_1 = 'bus_tram_lanes'
gD_testData2_2 = databaseDict

outputFile.append(None!=M1.getData(gD_testData2_1,gD_testData2_2))

"""
push2Firebase (p2F)

Test1
    p2F_testData1_1 = [{"A":1,"B":2,"C":3,"D":4},{"A":12,"B":22,"C":32,"D":24}]
    p2F_testData1_2 = 'p2F_testData1_1'
    p2F_expectedResult1 will be visually confirmed

"""

"""
removeFromFirebase

Test1
    rFF_testData1 = 'p2F_testData1_1'
    rFF_expectedResult will be visually confirmed

Test2
    rFF_testData2 = 'unknown_doesnt_exist'
    rFF_expectedResult will display an error message saying that the table doesnt exist
"""

# Note: M1 and updateData doesnt need to be tested all of its components are already tested

"""
Expected Output of All Tests (Saved in testOut.txt) 
the output file must contains 13 lines named "True" to indicate that all tests have passed
"""







