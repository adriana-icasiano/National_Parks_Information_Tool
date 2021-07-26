from flask import Flask, render_template, jsonify
import pandas as pd
from sqlalchemy import create_engine
from config import username, password


# Create app instance
app = Flask(__name__)
rds_connection_string = f"{username}:{password}@localhost:5432/park_db"
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
    print(park_all)
    return jsonify(park_all)

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
