from flask import Flask, render_template, jsonify
import pandas as pd
from sqlalchemy import create_engine


# Create app instance
app = Flask(__name__)
rds_connection_string = f"postgres:postgres@localhost:5432/park_db"
engine = create_engine(f'postgresql://{rds_connection_string}')

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/park")
def park():

    df = pd.read_sql_query('select * from park', con=engine)
    df["lat_lon"] = list(zip(df['latitude'], df['longitude']))
    lat_lon = df['lat_lon'].to_list()
    return jsonify(lat_lon)

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
