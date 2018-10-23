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
"""
@app.route("")
def getbidders():
	# return as json object
    return None

# bidTask

# getAllTasks
@app.route("/alltasks")
def getAllTasks():
	return jsonify(data["posts"])


"""
# cross origin?
##### POST REQUESTS CHANGING THE DATABASE #####
# create an account
# adds account to the db
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

    #print(newId)

    #database['users']['username'] = username

    # edit the global variable - before updating the file
    database['users'].append({'id' : newId, 'username' : username, 'password' : password, 'name' : name, 'phone' : phone, 'email' : email})
    #print(database['users'])

    newDb = json.dumps(database, indent=2) # to check what databaase looks like
    with open("data.json", "w") as file:
        json.dump(database, file, indent=2)

    #print(newDb)

    # write new db to file

    #newAccount = {username: pwd}
    return jsonify({'result' : 'success', 'username' : username, 'password' : password})

#@app.route("/postTask", methods=['POST'])
#def postTask():



# make a post
#@app.route("/")

# make a bid

if __name__ == "__main__":
    app.run()

# https://pythonspot.com/flask-web-app-with-python/


# account to persist  - dodgy way global variable in front end since dont need to demo it