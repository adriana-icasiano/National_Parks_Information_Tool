park as park
-
park_id PK VARCHAR
park_name VARCHAR
park_url VARCHAR
park_code VARCHAR
description VARCHAR
latitude DEC
longitude DEC
states VARCHAR
directions_info VARCHAR
directions_url VARCHAR
weather_info VARCHAR
designation VARCHAR

activity as activity
-
activity_id PK VARCHAR 
activity_name VARCHAR 

fees as fees
-
fee_id PK int
fee BOOLEAN

webcam_url 
-
webcam_id int PK 
park_id VARCHAR FK >- park.park_id
park_webcam_url VARCHAR
webcam_title VARCHAR
webcam_description VARCHAR

images 
-
image_id int PK 
park_id VARCHAR FK >- park.park_id
image_credit VARCHAR
image_url VARCHAR
image_caption VARCHAR

fire 
-
fire_id int PK
park_id VARCHAR FK >- park.park_id
fire_name VARCHAR
park_agency VARCHAR
park_name VARCHAR
fire_year int
cause_description VARCHAR
fire_size DEC
fire_size_class VARCHAR
latitude DEC
longitude DEC
state VARCHAR

sci_name as sci_name
-
scientific_name_id PK int
scientific_name VARCHAR

park_species
-
scientific_name_id int PK FK >- sci_name.scientific_name_id
park_id VARCHAR PK FK >- park.park_id
category_name VARCHAR
family VARCHAR 
order VARCHAR
common_names VARCHAR


park_activities 
-
park_id VARCHAR PK FK >- park.park_id
activity_id VARCHAR PK FK >- activity.activity_id

park_fee 
-
park_id VARCHAR PK FK >- park.park_id
fee_id int PK FK >- fees.fee_id








