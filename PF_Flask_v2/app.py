from flask import Flask, render_template, jsonify
import pandas as pd
from sqlalchemy import create_engine


# Create app instance
app = Flask(__name__)
rds_connection_string = f"postgres:Bootcamp@localhost:5432/park_db" # Remember to put passwork in config file
engine = create_engine(f'postgresql://{rds_connection_string}')

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/park")
def park():

    df = pd.read_sql_query('''SELECT p.* , p.park_name, f.fee
                            FROM fees as f
                            JOIN park_fee as pf
                            ON f.fee_id = pf.fee_id
                            RIGHT JOIN park as p
                            ON p.park_id = pf.park_id''', con=engine)
    df["coordinates"] = list(zip(df['latitude'], df['longitude']))
    df1 = df.drop(labels=['latitude','longitude'], axis =1)
    park_all = df1.to_dict(orient = 'records')
    # print(park_all)
    return jsonify(park_all)

@app.route("/wildfires")
def wildfires():

    df = pd.read_sql_query('select * from fire', con=engine)
    df["lat_lon"] = list(zip(df['latitude'], df['longitude']))
    df1 = df.drop(labels=['latitude','longitude'], axis =1)
    all_fires = df1.to_dict(orient = 'records')
    # print(all_fires)
    return jsonify(all_fires)

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
    activity_names = list(df_act_count['activity_name'].values)[0:20]
    counts = list(df_act_count['count'].values)[0:20]
    counts_converted = [int(count) for count in counts]
    text_list = []
    for i in range(0,len(activity_names)):
        text_list.append(f"{activity_names[i]} ({counts_converted[i]})")
    list_act_count = [activity_names, counts_converted, text_list, list(range(1,len(activity_names)+1))]
    act_count_dict = {
        'activities':activity_names,
        'counts':counts_converted,
    }
    return jsonify(list_act_count)

@app.route("/fireclass")
def fireclass():
    fire = pd.read_sql_query('select * from fire', con=engine)
    fire_by_year = fire.groupby(['fire_size_class', 'fire_year']).count()
    fire_by_year = fire_by_year.reset_index()
    fire_by_year = fire_by_year.groupby('fire_size_class').agg({'fire_year': list, 'fire_id': list})
    fire_classes = fire_by_year.to_dict(orient = 'records')
    # print(fire_classes)
    return jsonify(fire_classes)

@app.route("/species")
def species():

    species_df = pd.read_sql_query("""SELECT p.park_name, p.park_id, 
    ps.category_name, ps.family, ps.order, ps.common_names, s.sci_name 
    FROM park_species AS ps
    INNER JOIN park as p
    ON ps.park_id = p.park_id
    LEFT OUTER JOIN sci_name as s
    ON s.sci_name_id = ps.sci_name_id;""", con=engine)

    species_json = species_df.to_dict(orient="records")
    # print(species_json)
    return jsonify(species_json)



if __name__ == "__main__":
    app.run(debug=True)
