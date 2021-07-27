
## Table of Contents ##
* [Project Proposal](#project-proposal)
* [Data Source](#data-sources)
* [Technologies](#technologies)
* [ETL Step](#etl-step)
* [Steps to Recreate Database](#steps-to-recreate-database)
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
![](https://github.com/dalismo/api_call_of_duty_etl/blob/ba8ab844d93b084f2b44e170c624e30bd9c9cdf3/QuickDBD-export.png)

## ETL Step 

### Extract
1) Perform API calls [National Park Services API](https://www.nps.gov/subjects/developer/api-documentation.htm) to retrieve data on all national parks<br>
  [Get API key](https://www.nps.gov/subjects/developer/get-started.htm)<br>
  
2) Save wildfire sqlite database from [Wildfires Database](https://www.kaggle.com/rtatman/188-million-us-wildfires) and extract data from the Fire table<br>

3) Save csv for biodiversity form [Biodiversity at National Park Database](https://www.kaggle.com/nationalparkservice/park-biodiversity) <br>
  
4) Create games ratings dataframe from the RAWG API <br>

### Transform <br>
1) Exploratory Data Analysis - Sort data for analysis <br>
2) Data Cleaning - drop duplicates, rename columns, merge video sales and games ratings dataframes<br>
3) Get data into separate dataframes to match tables in database<br>
  a) game table<br>
  b) rating table<br>
  c) platform table<br>
  d) esrb table<br>
  e) sales table<br>
  f) game platform table<br>
  
### Load<br>
1) Create tables in Postgres
In Jupyter Notebook
2) Connect to local database in Jupyter Notebook <br>
3) Check that tables exists in the games database <br>
4) Export data from dataframes to tables<br>

## Steps to recreate database
### Option 1 - ETL method <br>
1) [Get RAWG API Key](https://rawg.io/apidocs)<br>
2) Create config.py file with RAWG api_key, Postgres username and password<br>
  a) api_key = ""<br>
  b) password = ""<br>
  c) username = ""<br>
3) Create "game_db" database in Postgres<br>
4) [Create tables using the schema file](https://github.com/dalismo/api_call_of_duty_etl/blob/main/QuickDBD-schema_export.sql)<br>
5) [Run the python file](https://github.com/dalismo/api_call_of_duty_etl/blob/main/Extract_Transform_Load.ipynb)<br>

### Option 2 - Manual data import to Postgres<br>
1) As an alternative to running the [ETL python file](https://github.com/dalismo/api_call_of_duty_etl/blob/main/Extract_Transform_Load.ipynb) 
users can access the game ratings and sales data from the [Resources folder](https://github.com/dalismo/api_call_of_duty_etl/tree/main/Resources):<br>
[Video Game Sales from 2012 to 2016](https://github.com/dalismo/api_call_of_duty_etl/blob/main/Resources/clean_video_game_sales_2012_to_2016.csv)<br>
[Video Game Ratings data from 2012 to 2016](https://github.com/dalismo/api_call_of_duty_etl/blob/main/Resources/rawg_games_ratings_2012_to_2016.csv)<br>
[Video Game Sales and Rating data from 2012 to 2016 (CSV)](https://github.com/dalismo/api_call_of_duty_etl/blob/main/Resources/merged_games_sales_ratings_2012_to_2016.csv)<br>

2) [Create tables using the schema file](https://github.com/dalismo/api_call_of_duty_etl/blob/main/QuickDBD-schema_export.sql)<br>
3) Import the data into the table:<br>
[game data](https://github.com/dalismo/api_call_of_duty_etl/blob/main/Resources/games_table.csv) <br> 
[platform data](https://github.com/dalismo/api_call_of_duty_etl/blob/main/Resources/platforms_table.csv)<br>
[ratings data](https://github.com/dalismo/api_call_of_duty_etl/blob/main/Resources/ratings_table.csv)<br> 
[esrb rating data](https://github.com/dalismo/api_call_of_duty_etl/blob/main/Resources/esrb_table.csv)<br>
[sales data](https://github.com/dalismo/api_call_of_duty_etl/blob/main/Resources/sales_table.csv)<br>
[games platform data](https://github.com/dalismo/api_call_of_duty_etl/blob/main/Resources/game_platforms_table.csv)<br>
4) [Perform queries from Queries file](https://github.com/dalismo/api_call_of_duty_etl/blob/main/Queries.sql)<br>

## Example Queries                                                        
## Tables:
```sql
SELECT * FROM esrb_rating
SELECT * FROM game
SELECT * FROM sales_platform
SELECT * FROM ratings
SELECT * FROM platform
```                                                        
                                                        
### To retrieve ESRB Ratings for each game with ESRB rating Mature:
```sql
SELECT e.esrb_rating, g.game_ID, g.game_name
FROM esrb_rating as e
INNER JOIN game as g
ON e.game_ID = g.game_id
WHERE e.esrb_rating = 'Mature'
```                                                          

### To retrieve the most popular games released between 2012 to 2016:
```sql
SELECT g.game_id, g.game_name, r.rating, r.metacritic
FROM game as g
INNER JOIN ratings as r
ON g.game_id = r.game_id
ORDER BY r.rating DESC
```                                                             

### To retrieve the most sold games by units:
```sql
SELECT g.genre, g.game_id, g.game_name, ROUND(CAST(float8 (SUM(s.sales_units_in_millions)) AS numeric),2) AS "Total units sold (in millions)"
FROM sales_platform as s
INNER JOIN game as g
ON s.game_id = g.game_id
GROUP BY g.genre, g.game_id, g.game_name 
ORDER BY ("Total units sold (in millions)") DESC
```                                                           

### To retrieve unit sales by platform:
```sql                                                        
SELECT platform_id, ROUND(CAST(float8 (SUM(sales_units_in_millions)) AS numeric),2) AS "Total units sold (millions)" 
FROM sales_platform
GROUP BY platform_id
ORDER BY "Total units sold (millions)" DESC
```  
                                                        
### To retrieve 'Grand Theft Auto V' PS4 sales vs XOne sales:
```sql  
SELECT g.game_id, g.game_name, s.platform_id, s.sales_units_in_millions
FROM sales_platform as s
INNER JOIN game as g
ON s.game_id = g.game_id
WHERE (s.game_id = 3498)
AND (platform_id = 'PS4' OR platform_id = 'XOne')
```                                                         
#### Team Roles

| Team Member           | Role                          | Github username |        
| -----------           | -----------                   | -----------
| Adriana Icasiano      | Postgres Ruler                | adriana-icasiano |
| Paul Feliciano        | El Rey de SQL                 | pfeliciano1      |
| Alberto Gonzalez      | Data Cleaner                  | dalismo          |
