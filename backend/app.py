from flask import Flask, request, jsonify # from flask_jsonpify import jsonify
from flask_restful import Api
from classes import *
import json

# Starter code for Api found here:
# https://www.codementor.io/sagaragarwal94/building-a-basic-restful-api-in-python-58k02xsiq
# More found here
# https://www.codementor.io/dongido/how-to-build-restful-apis-with-python-and-flask-fh5x7zjrx

# Setup
app = Flask(__name__)
api = Api(app)

# Add the end points
api.add_resource(Login, '/login') # <username>/<password>')
    
@app.route("/")
def index():
    return {"Init": "Welcome to Lunatics' chaotic backend!"}

# Run application
# NOTE This needs to go last in the file
if __name__ == "__main__":
    app.run(port=2011)


'''
# NOTE From here below is Tammy's drafing 
# TODO remove it
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


# https://pythonspot.com/flask-web-app-with-python/


# account to persist  - dodgy way global variable in front end since dont need to demo it
'''
