from flask import Flask, render_template, jsonify
import pandas as pd
from sqlalchemy import create_engine
from config import username, password, port


# Create app instance
app = Flask(__name__)
rds_connection_string = f"{username}:{password}@localhost:{port}/park_db"
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


if __name__ == "__main__":
    app.run(debug=True)
