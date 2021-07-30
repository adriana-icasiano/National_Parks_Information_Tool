from flask import Flask, render_template, jsonify
import pandas as pd
from sqlalchemy import create_engine
# from config import username, password


# Create app instance
app = Flask(__name__)
rds_connection_string = f"{username}:{password}@localhost:5432/park_db"
engine = create_engine('postgresql:/{rds_connection_string}')

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/fireclass")
def fireclass():
    fire = pd.read_sql_query('select * from fire', con=engine)
    fire_by_year = fire.groupby(['fire_size_class', 'fire_year']).count()
    fire_by_year = fire_by_year.reset_index()
    fire_by_year = fire_by_year.groupby('fire_size_class').agg({'fire_year': list, 'fire_id': list})
    fire_classes = fire_by_year.to_dict(orient = 'records')
    print(fire_classes)
    return jsonify(fire_classes)

if __name__ == "__main__":
    app.run(debug=True)   