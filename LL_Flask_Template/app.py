from flask import Flask, render_template, jsonify
import pandas as pd
from sqlalchemy import create_engine


# Create app instance
app = Flask(__name__)
engine = create_engine('postgresql://postgres:4lll0v3@localhost:5432/park_db')

@app.route("/")
def home():
    return render_template("index.html")

# @app.route("/park")
# def park():





    # df = pd.read_sql_query('select * from park', con=engine)
    # df["coordinates"] = list(zip(df['latitude'], df['longitude']))
    # df1 = df.drop(labels=['latitude','longitude'], axis =1)
    # # df2 = df[['coordinates']]
    # park_all = df1.to_dict(orient = 'records')
    # # park_coord = df2.to_json(orient = 'records')
    # # lat_lon = df['lat_lon'].to_list()
    # print(park_all)
    # return jsonify(park_all)




# @app.route("/petal-avg")
# def avg_petals():

#     df = pd.read_sql_query("""SELECT Species, AVG(PetalLengthCm) as 'avg petal'
#                     FROM Iris
#                     GROUP BY Species;""", engine)
#     results = df.to_json(orient="records")
    
#     return results

# @app.route("/petal-species/<species>")
# def petals_species(species):

#     df = pd.read_sql(f""" SELECT PetalLengthCm, Species 
#                         FROM Iris
#                         WHERE Species = '{species}'; """, engine)
#     petal_lengths = df.PetalLengthCm.to_list()
#     return jsonify(petal_lengths)



if __name__ == "__main__":
    app.run(debug=True)
