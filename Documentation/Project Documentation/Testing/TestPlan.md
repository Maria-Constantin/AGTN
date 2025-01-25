| Contents                                             |
| ---------------------------------------------------- |
| [Test Plan](#test-plan)                              |
| [Jump to Backend Models:](#backend-models)           |
| [Jump to Backend Controllers:](#backend-controllers) |

## Test Plan

### Backend Models:

#### nccLandmarkBuildings

Tests authored by psydl4

| Test                   | Inputs                                                                                          | Expected Outcome                                                                                               | Actual Outcome | Currently Passing |
|------------------------| ----------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | -------------- | ----------------- |
| 1. Default Constructor | No inputs                                                                                       | A landmark object is created with all it's fields set to null                                                  |                |                   |
| 2. toString()          | nccLandmarkBuildings("1", "landmark1", 50.31221312, 23.273217321376, 4234342423.123).toString() | {"objectid":1,"name":"landmark1","longitude":50.31221312,"latitude":23.273217321376,"northing":4234342423.123} |                |                   |

#### nccCommunityCentres

Tests authored by psydl4

| Test                   | Inputs                                                                                                                                                                                                  | Expected Outcome                                                                                               | Actual Outcome | Currently Passing |
|------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------| -------------- | ----------------- |
| 1. Default Constructor | No inputs                                                                                                                                                                                               | A community centre object is created with all it's fields set to null                                          |                |                   |
| 2. toString()          | nccCommunityCentres("comm centre", 50.31221312, 23.273217321376, 4234342423.123, 532176489542.552, "ward", "NG7 123", "The Old School, " + "Montpelier Rd, Dunkirk, Nottingham", 2147483647).toString() | {NAME=comm centre, LONGITUDE=50.312213, LATITUDE=23.273217, NORTHING=4234342423.123000, EASTING=532176489542.552000, WARD='ward, POSTCODE='NG7 123, ADDRESS='The Old School, Montpelier Rd, Dunkirk, Nottingham, UPRN=12147483647} |                |                   |

### Backend Controllers:

#### landmarkBuildingController

| Test                                               | Inputs                                                                                                                                                  | Expected Outcome                                                                             | Actual Outcome | Currently Passing |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------- | ----------------- |
| 1. Test getting landmark buildings from controller | GET request sent to api/landmarkBuilding. nccLandmarkBuildings(1, "landmark1", 50.31221312, 23.273217321376, 4234342423.123) as a record in repository. | Json list of landmark buildings returned. List of length 1 and landmark has name "landmark1" |                |                   |

#### communityCentreController

| Test                                              | Inputs                                                                                                                                                  | Expected Outcome                                                                                      | Actual Outcome | Currently Passing |
|---------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------| -------------- | ----------------- |
| 1. Test getting community centres from controller | GET request sent to api/communityCentre. nccLandmarkBuildings(1, "landmark1", 50.31221312, 23.273217321376, 4234342423.123); as a record in repository. | Json list of community centres returned. List of length 1 and community centre has name "comm centre" |                |                   |



