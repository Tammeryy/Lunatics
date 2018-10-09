from flask import Flask
import json
from flask import jsonify
app = Flask(__name__)

with open('data.json', 'r') as data_file:    
    data = json.load(data_file)

# NOTE: database = json file
# return format = json format
# from routes import app # separate into files later?

# https://stackoverflow.com/questions/34057851/python-flask-typeerror-dict-object-is-not-callable
"""
@app.route("/")
def index():
    return "Index!"
 
@app.route("/hello")
def hello():
    return "Hello World!"
 
@app.route("/members")
def members():
    return "Members"
 
@app.route("/members/<string:name>/")
def getMember(name):
    return name
"""
@app.route("/")
def index():
	return "Welcome to Lunatics' chaotic backend!"

# editing json files in python?

# createAccount - unsure about the ones that need to pass in a parameter

# authenticate - unsure how authentications work?

# postTask -how to edit json files?

# getPostedTasks

# getBiddersForTask

# bidTask

# getAllTasks
@app.route("/alltasks")
def getAllTasks():
	return jsonify(data["posts"])


if __name__ == "__main__":
    app.run()

# https://pythonspot.com/flask-web-app-with-python/