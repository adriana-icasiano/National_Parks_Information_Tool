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
fee_type VARCHAR
cost VARCHAR
fee_description VARCHAR

images as images
----
image_id int PK 
credit VARCHAR
image_url VARCHAR
image_caption VARCHAR

fire as fire
-
fire_id VARCHAR PK
fire_name VARCHAR
reporting_agency VARCHAR
fire_year VARCHAR
fire_cause VARCHAR
fire_size DEC
fire_size_class VARCHAR
fire_latitude DEC
fire_longitude DEC
state VARCHAR

species as species
-
category_id VARCHAR PK
family VARCHAR
order VARCHAR
scientific VARCHAR
common_names VARCHAR

park_activities as park_act
-
park_id VARCHAR PK FK >-< park.full_name
activities_id VARCHAR PK FK >- activities.activities_name

park_fee as park_fee
-
park_id VARCHAR PK FK >-< park.full_name
fee_id int PK FK - fees.fee_id

park_image as park_image
-
park_id VARCHAR PK FK >-< park.full_name
image_id int PK FK - images.image_id

park_fire as park_fire
-
park_id VARCHAR PK FK >-< park.full_name
fire_id VARCHAR PK FK - fire.fire_name

park_species as park_species
-
park_id VARCHAR PK FK >- park.full_name
category_id VARCHAR PK FK >- species.category_id



