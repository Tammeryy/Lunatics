from flask import Flask
import json
from flask import jsonify
#import request
from flask import request

app = Flask(__name__)

with open('data.json', 'r') as data_file:    
    database = json.load(data_file) # global
    print(type(database))

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
    print(database)
    return "Welcome to Lunatics' chaotic backend!"


##### POST REQUESTS CHANGING THE DATABASE #####
# create an account
# adds account to the db
# expected input format:
#   {"username" : "Tammy", "password" : "1234" , "name" : "Man", "phone" : "044444444", "email" : "tammy@gmail.com"}
@app.route("/createAccount", methods=['POST'])
def createAccount():

    # need to get the username and pwd
    data = request.get_json()
    username = data["username"]
    password = data["password"]
    name = data["name"]
    phone = data["phone"]
    email = data["email"]
    
    # check if username is taken - using binary search
    for account in database['users']:
        #print(account)
        print(account['username'])
        print(username)
        if account['username'] == username:
            print("fjhsdfhk")
            return jsonify({'result' : 'failure'})
        #print(account['password'])

    # calculate id
    newId = 0
    for account in database['users']:
        newId = account['id'] + 1

    # edit the global variable - before updating the file
    database['users'].append({'id' : newId, 'username' : username, 'password' : password, 'name' : name, 'phone' : phone, 'email' : email})

    # to check what databaase looks like
    newDb = json.dumps(database, indent=2) 

    # write new db to file
    with open("data.json", "w") as file:
        json.dump(database, file, indent=2)
    
    return jsonify({'result' : 'success', 'username' : username, 'password' : password})


# used when user logs in - need to return entire account object if account exists
@app.route("/authenticate", methods=['GET','POST'])
def authenticate():
    # need to get the username and pwd
    data = request.get_json()
    username = data["username"]
    password = data["password"]

    # verifies if it exists
    # if false return None 

    # verifies password is correct
    # if false, return password inccorect

    # if correct , returnn the user dictionary object


"""
@app.route("/postTask", methods=['POST'])
def postTask():

    data = request.json()
    cuisine = data["cuisine"]
    task_open = "true"
    description = data["description"]
    title = data["title"]
    bid_close = data["bid_close"]
    budget = data["budget"]
    diet = data["diet"]
    #poster_id 
    lowest_bid = data["lowest_bid"]
    location = data["location"]
    event_date = data["event_date"]
    quality = data["quality"]
    num_ppl = data["num_ppl"]
"""
    """
    "cuisine": "chinese", 
      "task_open": true, 
      "description": "Cater for a wedding event with various options (vegan, vegetarian, etc..)", 
      "title": "Cook for 50-people event", 
      "bid_close": "10/10/2018", 
      "budget": 88.88, 
      "diet": "vegetarian", 
      "poster_id": 1, 
      "lowest_bid": 90, 
      "location": "cabramatta", 
      "event_date": "24/11/2018", 
      "quality": "Fine Dining", 
      "id": 0, 
      "num_ppl": 10
    """

#@app.route("/bidTask", methods=['POST'])
#def bidTask():

#### should have post requests###
# change pwd
# del account
# edit atsk
# del task
# update bids
# del bids
# create profile
# edit profile

#GOALS TODAY^^###

@app.route()

if __name__ == "__main__":
    app.run()

# https://pythonspot.com/flask-web-app-with-python/


# account to persist  - dodgy way global variable in front end since dont need to demo it