from flask import Flask, render_template, jsonify
import pandas as pd
from sqlalchemy import create_engine


# Create app instance
app = Flask(__name__)
rds_connection_string = f"postgres:postgres@localhost:5432/park_db" # Remember to put passwork in config file
engine = create_engine(f'postgresql://{rds_connection_string}')

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/park")
def park():

    df = pd.read_sql_query('select * from park', con=engine)
    df["coordinates"] = list(zip(df['latitude'], df['longitude']))
    df1 = df.drop(labels=['latitude','longitude'], axis =1)
    # df2 = df[['coordinates']]
    park_all = df1.to_dict(orient = 'records')
    # park_coord = df2.to_json(orient = 'records')
    # lat_lon = df['lat_lon'].to_list()
    print(park_all)
    return jsonify(park_all)

@app.route("/activity")
def activity():

    df_act = pd.read_sql('''SELECT a.activity_name, p.park_name
                            FROM activity as a
                            JOIN park_activities as pa
                            ON a.activity_id = pa.activity_id
                            JOIN park as p
                            ON p.park_id = pa.park_id;''',engine)
    activity_list = df_act['activity_name'].unique()
    activity_list.sort()
    list_of_act = []
    for activity in activity_list:
        name = df_act.loc[df_act['activity_name'] == activity]['park_name'].values.tolist()
        dict_of_act = {"activity":activity, "park_name":name}
        list_of_act.append(dict_of_act)
    # print(list_of_act)
    return jsonify(list_of_act)

@app.route("/activity_count")
def activity_count():

    df_act = pd.read_sql('''SELECT a.activity_name, p.park_name
                            FROM activity as a
                            JOIN park_activities as pa
                            ON a.activity_id = pa.activity_id
                            JOIN park as p
                            ON p.park_id = pa.park_id;''',engine)
    df_act_count = df_act.groupby(['activity_name']).count()
    df_act_count.rename(columns={"park_name": "count"}, inplace = True)
    df_act_count.reset_index(inplace= True)
    df_act_count.sort_values('count', ascending = False, inplace = True)
    top20_list = df_act_count['activity_name'].head(20)
    list_of_act_count = []
    for activity in top20_list:
       count = df_act_count.loc[df_act_count['activity_name'] == activity]['count'].values.tolist()
       dict_of_act_count = {"activity":activity, "count":count}
       list_of_act_count.append(dict_of_act_count)
    print(list_of_act_count)
    return jsonify(list_of_act_count)

@app.route("/wildfires")
def wildfires():

    df = pd.read_sql_query('select * from fire', con=engine)
    df["lat_lon"] = list(zip(df['latitude'], df['longitude']))
    df1 = df.drop(labels=['latitude','longitude'], axis =1)
    all_fires = df1.to_dict(orient = 'records')
    # print(all_fires)
    return jsonify(all_fires)

# @app.route("/petal-species/<species>")
# def petals_species(species):

#     df = pd.read_sql(f""" SELECT PetalLengthCm, Species 
#                         FROM Iris
#                         WHERE Species = '{species}'; """, engine)
#     petal_lengths = df.PetalLengthCm.to_list()
#     return jsonify(petal_lengths)



if __name__ == "__main__":
    app.run(debug=True)
