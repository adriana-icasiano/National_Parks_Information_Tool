from flask import Flask, render_template, jsonify
import pandas as pd
from sqlalchemy import create_engine
from config import username, password

# Create app instance
app = Flask(__name__)
rds_connection_string = f"{username}:{password}@localhost:5433/park_db"
engine = create_engine(f'postgresql://{rds_connection_string}')

@app.route("/")
def home():
    return render_template("index.html")


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
