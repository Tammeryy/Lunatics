from flask import Flask
import json
from flask import jsonify
# import request

app = Flask(__name__)

with open('data.json', 'r') as data_file:    
    data = json.load(data_file)

# NOTE: database = json file
# return format = json format
# from routes import app # separate into files later?

# req && wbs - or kris' wbs


# must have and should have

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
 
@app.route("/members/<string:name>/") # through routes as in like this? # or methods = GET POST? -where do those come from # or just the other function? -wouldnt work
def getMember(name):
    return name
"""
@app.route("/")
def index():
	return "Welcome to Lunatics' chaotic backend!"

# post - mvp - Tammy
# get - mvp - Kris
# search, sort, filter (2/3) - dafny then code - Lucy
	# minimum of 2 dafny verification
# front end - can see mvp by next week






# request.json - getting params from frontend


# editing json files in python?


# passin gin params through routes bit? or a separate function?


# createAccount - unsure about the ones that need to pass in a parameter


# authenticate - unsure how authentications work?


# postTask -how to edit json files?


# getPostedTasks


# getBiddersForTask
@app.route("")
def getbidders():
	# return as json object

# bidTask

# getAllTasks
@app.route("/alltasks")
def getAllTasks():
	return jsonify(data["posts"])

if __name__ == "__main__":
    app.run()

# https://pythonspot.com/flask-web-app-with-python/


# account to persist  - dodgy way global variable in front end since dont need to demo it