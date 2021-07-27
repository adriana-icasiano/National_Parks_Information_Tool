
## Table of Contents ##
* [Project Proposal](#project-proposal)
* [Data Source](#data-sources)
* [Technologies](#technologies)
* [ETL Step](#etl-step)
* [Steps to Recreate Database](#steps-to-recreate-database)
* [Flask](#Flask)
* [Example Queries](#example-queries)
* [Team Roles](#team-roles)

## Project Proposal 
# A brief description of your final database
An interactive tool for park visitors to explore park information including activities, directions, description, state, historical wildfires data, and biodiversity.

# Why our final database will be useful to Park Visitors?
1) Park visitors can find out about important park information (directions, fees, activities, images, park URL, live webcam URL, wildfire history and biodiversity)
2) Wildlife enthusiast, educators and students can learn about the types of species that can be found at each National Parks.
3) Park visitors can get historical wildfire data including year, size and class of fire for the last 24 years.

## Data sources
1) [National Park Services API](https://www.nps.gov/subjects/developer/api-documentation.htm)  <br>
2) [Biodiversity at National Park Database](https://www.kaggle.com/nationalparkservice/park-biodiversity)<br>
3) [Wildfires Database](https://www.kaggle.com/rtatman/188-million-us-wildfires)<br>
 
## Technologies
* SQL Alchemy
* Postgres
* [Quick DBD](https://app.quickdatabasediagrams.com/#/)
* Pandas
* Flask
* Jupyter Notebook
* Javascript
* Bootstrap
* Libraries
  - Highchart
  - json
  - requests 
  - d3
  - Leafleat
  
## Entity Relational Database (ERD) design 
![](https://github.com/adriana-icasiano/yogi_booboo_playground/blob/main/ERD/QuickDBD-Free%20Diagram%20(10).png)

## ETL Step 

### Extract
1) Perform API calls [National Park Services API](https://www.nps.gov/subjects/developer/api-documentation.htm) to retrieve data on all national parks<br>
  [Get API key](https://www.nps.gov/subjects/developer/get-started.htm)<br>
  
2) Save wildfire sqlite database from [Wildfires Database](https://www.kaggle.com/rtatman/188-million-us-wildfires) and extract data from the Fire table<br>

3) Save csv for biodiversity form [Biodiversity at National Park Database](https://www.kaggle.com/nationalparkservice/park-biodiversity) <br>
  
4) Create games ratings dataframe from the RAWG API <br>

### Transform <br>
1) Exploratory Data Analysis - Sort data for analysis <br>
2) Data Cleaning - drop duplicates, rename columns, flatten nested json data <br>
3) Get data into separate dataframes to match tables in database<br>
  a) park table<br>
  b) activity table <br>
  c) park activity table<br>
  d) fee table<br>
  e) park fee table<br>
  f) park image table<br>
  g) scientific name table<br>
  h) park species table<br>
  i) fire table<br>
  
### Load<br>
1) Create database called park_db
2) [Create tables using the schema file](https://github.com/adriana-icasiano/yogi_booboo_playground/blob/main/ERD/QuickDBD-Free%20Diagram%20(23).sql)<br>
3) Load csv files manually into Postgres database <br>

## Steps to recreate database
### Manual data import to Postgres<br>
1) Create config.py file with postgres username, password <br>
2) Access the park tables from the [Resources folder](https://github.com/adriana-icasiano/yogi_booboo_playground/tree/main/Resources):<br>
3) [Create tables using the schema file](https://github.com/adriana-icasiano/yogi_booboo_playground/blob/main/ERD/QuickDBD-Free%20Diagram%20(23).sql)<br>
4) Import the data into the table in this order:<br>
[park data](https://github.com/adriana-icasiano/yogi_booboo_playground/blob/main/Resources/nps_park_data2.csv) <br> 
[activity data](https://github.com/adriana-icasiano/yogi_booboo_playground/blob/main/Resources/activities_data.csv)<br>
[park activity data](https://github.com/adriana-icasiano/yogi_booboo_playground/blob/main/Resources/park_activities_data.csv)<br>
[fee data](https://github.com/adriana-icasiano/yogi_booboo_playground/blob/main/Resources/fee_id_data.csv)<br> 
[park fee data](https://github.com/adriana-icasiano/yogi_booboo_playground/blob/main/Resources/park_fee_data.csv)<br>
[scientific name data](https://github.com/adriana-icasiano/yogi_booboo_playground/blob/main/Resources/sci_name_latest.csv)<br>
[park species data](https://github.com/adriana-icasiano/yogi_booboo_playground/blob/main/Resources/park_species_latest.csv)<br>
[fire data](https://github.com/adriana-icasiano/yogi_booboo_playground/blob/main/Resources/wildfires.csv)<br>
[park images data](https://github.com/adriana-icasiano/yogi_booboo_playground/blob/main/Resources/images_data.csv)<br>
[park live webcam data](https://github.com/adriana-icasiano/yogi_booboo_playground/blob/main/Resources/webcam_data.csv)<br>

## Flask


## Example Queries                                                        
## Tables:
```sql
SELECT * from park;
SELECT * from activity;
SELECT * from park_activity;
SELECT * from fees;
SELECT * from park_fee;
SELECT * from images;
SELECT * from webcam_url;
SELECT * from fire;
SELECT * from sci_name;
SELECT * from park_species;
```                                                        
                                                        
### To retrieve a list of National Parks that are free and paid:
```sql
SELECT p.* , p.park_name, f.fee
FROM fees as f
JOIN park_fee as pf                        
ON f.fee_id = pf.fee_id
RIGHT JOIN park as p
ON p.park_id = pf.park_id
```                                                                                                                       

### To retrieve all wildfires at National Parks in the last 24 fires:
```sql
SELECT f.* ,p.park_name
FROM fire as f
JOIN park as p
ON f.park_id = p.park_id
```                                                           

### To retrieve scientific name, order, family and category information on species at National Parks:
```sql                                                        
SELECT p.park_name, sn.*, ps.*
FROM park_species as ps
JOIN sci_name as sn
ON ps.sci_name_id = sn.sci_name_id
JOIN park as p
on ps.park_id = p.park_id
```  
                                                        
#### Team Roles

| Team Member           | Role                          | Github username |        
| -----------           | -----------                   | -----------
| Adriana Icasiano      | Park Ranger                   | adriana-icasiano |
| Paul Feliciano        | El Rey de Fogo                | pfeliciano1      |
| Alberto Gonzalez      | El Rey de Fogo                | dalismo          |
| Abayomi Olujobi       | Sunburst Creator              | bay0624          |
| Lovensky Lubin        | Trend Setter                  | Lubinl           |

