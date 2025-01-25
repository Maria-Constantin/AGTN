import M2

# Translating the Conditions
R1 = [[52.95082656865949,-1.1685602431972726],50,10000,'places_to_eat_NOTT']
R2 = [[52.95339951998661,-1.1872889220872849],10,2000,'places_to_eat_CSLAB']

# Function Calls to push the relevant data to the firebase
# M2.M2('R1',R1[0],R1[1],R1[2],R1[3])
# M2.M2('R2',R2[0],R2[1],R2[2],R2[3])

outputFile = []

"""
Filter (f)

Test 1
    f_testData1 = {'id': 'Xm7psilJ_gogxFNVgi5S9A', 'alias': 'world-service-restaurant-nottingham', 'name': 'World Service Restaurant', 'image_url': 'https://s3-media4.fl.yelpcdn.com/bphoto/p-qHkLcFpBn_9hiru_RiKA/o.jpg', 'is_closed': False, 'url': 'https://www.yelp.com/biz/world-service-restaurant-nottingham?adjust_creative=rKAm3DvC_1-tTGr2WpqoKQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=rKAm3DvC_1-tTGr2WpqoKQ', 'review_count': 8, 'categories': [{'alias': 'british', 'title': 'British'}], 'rating': 4.0, 'coordinates': {'latitude': 52.9508874560959, 'longitude': -1.15253448486328}, 'transactions': [], 'price': '£££', 'location': {'address1': 'Newdigate House', 'address2': 'Castlegate', 'address3': '', 'city': 'Nottingham', 'zip_code': 'NG1 6AF', 'country': 'GB', 'state': 'NGM', 'display_address': ['Newdigate House', 'Castlegate', 'Nottingham NG1 6AF', 'United Kingdom']}, 'phone': '+441158475587', 'display_phone': '+44 115 847 5587', 'distance': 1761.188029846324}
    f_testExpectedResult1 = {'name': 'World Service Restaurant', 'image_url': 'https://s3-media4.fl.yelpcdn.com/bphoto/p-qHkLcFpBn_9hiru_RiKA/o.jpg', 'longitude': -1.15253448486328, 'latitude': 52.9508874560959, 'cuisine': 'British'}

Test 2
    f_testData2 = {'id': '', 'alias': 'world-service-restaurant-nottingham', 'name': 'Indian Restaurant', 'image_url': 'https://s3-media4.fl.yelpcdn.com/bphoto/p-qHkLcFpBn_9hiru_RiKA/o.jpg', 'is_closed': False, 'url': 'https://www.yelp.com/biz/world-service-restaurant-nottingham?adjust_creative=rKAm3DvC_1-tTGr2WpqoKQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=rKAm3DvC_1-tTGr2WpqoKQ', 'review_count': 3, 'categories': [{'alias': 'indian', 'title': 'Indian'}], 'rating': 4.0, 'coordinates': {'latitude': 52.9508874560959, 'longitude': -1.15253448486328}, 'transactions': [], 'price': '£££', 'location': {'address1': 'Newdigate House', 'address2': 'Castlegate', 'address3': '', 'city': 'Nottingham', 'zip_code': 'NG1 6AF', 'country': 'GB', 'state': 'NGM', 'display_address': ['Newdigate House', 'Castlegate', 'Nottingham NG1 6AF', 'United Kingdom']}, 'phone': '+441158475587', 'display_phone': '+44 115 847 5587', 'distance': 1761.188029846324}
    f_testExpectedResult2 = {'name': 'Indian Restaurant', 'image_url': 'https://s3-media4.fl.yelpcdn.com/bphoto/p-qHkLcFpBn_9hiru_RiKA/o.jpg', 'longitude': -1.15253448486328, 'latitude': 52.9508874560959, 'cuisine': 'Indian'}
"""

f_testData1 = {'id': 'Xm7psilJ_gogxFNVgi5S9A', 'alias': 'world-service-restaurant-nottingham', 'name': 'World Service Restaurant', 'image_url': 'https://s3-media4.fl.yelpcdn.com/bphoto/p-qHkLcFpBn_9hiru_RiKA/o.jpg', 'is_closed': False, 'url': 'https://www.yelp.com/biz/world-service-restaurant-nottingham?adjust_creative=rKAm3DvC_1-tTGr2WpqoKQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=rKAm3DvC_1-tTGr2WpqoKQ', 'review_count': 8, 'categories': [{'alias': 'british', 'title': 'British'}], 'rating': 4.0, 'coordinates': {'latitude': 52.9508874560959, 'longitude': -1.15253448486328}, 'transactions': [], 'price': '£££', 'location': {'address1': 'Newdigate House', 'address2': 'Castlegate', 'address3': '', 'city': 'Nottingham', 'zip_code': 'NG1 6AF', 'country': 'GB', 'state': 'NGM', 'display_address': ['Newdigate House', 'Castlegate', 'Nottingham NG1 6AF', 'United Kingdom']}, 'phone': '+441158475587', 'display_phone': '+44 115 847 5587', 'distance': 1761.188029846324}
f_testExpectedResult1 = {'name': 'World Service Restaurant', 'image_url': 'https://s3-media4.fl.yelpcdn.com/bphoto/p-qHkLcFpBn_9hiru_RiKA/o.jpg', 'longitude': -1.15253448486328, 'latitude': 52.9508874560959, 'cuisine': 'British'}

outputFile.append(f_testExpectedResult1 == M2.filter(f_testData1))

f_testData2 = {'id': '', 'alias': 'world-service-restaurant-nottingham', 'name': 'Indian Restaurant', 'image_url': 'https://s3-media4.fl.yelpcdn.com/bphoto/p-qHkLcFpBn_9hiru_RiKA/o.jpg', 'is_closed': False, 'url': 'https://www.yelp.com/biz/world-service-restaurant-nottingham?adjust_creative=rKAm3DvC_1-tTGr2WpqoKQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=rKAm3DvC_1-tTGr2WpqoKQ', 'review_count': 3, 'categories': [{'alias': 'indian', 'title': 'Indian'}], 'rating': 4.0, 'coordinates': {'latitude': 52.9508874560959, 'longitude': -1.15253448486328}, 'transactions': [], 'price': '£££', 'location': {'address1': 'Newdigate House', 'address2': 'Castlegate', 'address3': '', 'city': 'Nottingham', 'zip_code': 'NG1 6AF', 'country': 'GB', 'state': 'NGM', 'display_address': ['Newdigate House', 'Castlegate', 'Nottingham NG1 6AF', 'United Kingdom']}, 'phone': '+441158475587', 'display_phone': '+44 115 847 5587', 'distance': 1761.188029846324}
f_testExpectedResult2 = {'name': 'Indian Restaurant', 'image_url': 'https://s3-media4.fl.yelpcdn.com/bphoto/p-qHkLcFpBn_9hiru_RiKA/o.jpg', 'longitude': -1.15253448486328, 'latitude': 52.9508874560959, 'cuisine': 'Indian'}

outputFile.append(f_testExpectedResult2 == M2.filter(f_testData2))

# OutputFile = [True,True] at the end of all tests
