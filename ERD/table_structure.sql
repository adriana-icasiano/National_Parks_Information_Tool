park as park
-
park_id PK VARCHAR
full_name VARCHAR
park_url VARCHAR
webcam_url VARCHAR
park_code VARCHAR
description VARCHAR
latitude DEC
longitude DEC
states VARCHAR
directions_info VARCHAR
directions_url VARCHAR
weather_info VARCHAR

activities as activities
-
activities_id pk VARCHAR 
activities_name VARCHAR 

fees as entrance_fees
-
fee_id PK int
fee BOOLEAN


images 
-
image_id int PK 
park_id VARCHAR FK >- park.park_id
credit VARCHAR
image_url VARCHAR
image_caption VARCHAR

fire 
-
fire_id VARCHAR PK
park_id VARCHAR FK >- park.park_id
fire_name VARCHAR
nwcg_reporting_agency VARCHAR
nwcg_reporting_unit_name VARCHAR
fire_year VARCHAR
stat_cause_descr VARCHAR
fire_size DEC
fire_size_class VARCHAR
latitude DEC
longitude DEC
state VARCHAR


park_species as park_species
-
scientific_name_id PK VARCHAR
park_id VARCHAR FK >- park.park_id
scientific_name VARCHAR
category_name VARCHAR
family VARCHAR 
order VARCHAR
common_names VARCHAR


park_activities 
-
park_id VARCHAR PK FK >- park.park_id
activities_id VARCHAR PK FK >- activities.activities_id

park_fee 
-
park_id VARCHAR PK FK >- park.park_id
fee_id int PK FK >- fees.fee_id








