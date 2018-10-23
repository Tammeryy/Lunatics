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
# used when user logs in - need to return entire account object if account exists
"""
# kris will be doing authentication
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

@app.route("/")
def index():
    print(database)
    return "Welcome to Lunatics' chaotic backend!"


##### POST REQUESTS CHANGING THE DATABASE #####
# create an account & auto creates default profile - need to add
# adds account to the db
# precondition: username is not taken - use other function to check
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
    about_me = ""
    skills_exp = ""
    
    # check if username is taken
    """
    for account in database['users']:
        #print(account)
        print(account['username'])
        print(username)
        if account['username'] == username:
            print("fjhsdfhk")
            return jsonify({'result' : 'failure'})
        #print(account['password'])
    """

    # calculate id
    #newId = len(database['users'])
    #newId = 0
    #for account in database['users']:
    #newId = account['id'] + 1
    newId = 0
    for account in database['users']:
        if account['id'] > newId:
            newId = account['id']

    newId = newId + 1 # the new id is the largest existing id + 1

    # edit the global variable - before updating the file
    database['users'].append({'id' : newId, 'username' : username, 'password' : password, 'name' : name, 'phone' : phone, 'email' : email, 'about_me' : about_me, 'skills_exp' : skills_exp})

    # to check what databaase looks like
    newDb = json.dumps(database, indent=2) 

    # write new db to file
    with open("data.json", "w") as file:
        json.dump(database, file, indent=2)
    
    return jsonify({'result' : 'success', 'username' : username, 'password' : password})

# checks that the account about to be created 
# username is valid - i.e. does  not exist
# expected input format
#   {"username" : "Taf"}
@app.route("/verifyAvailUsername", methods=["GET", 'POST'])
def verifyAvailUsername():
    data = request.get_json()
    username = data["username"]
    for account in database['users']:
        #print(account)
        print(account['username'])
        print(username)
        if account['username'] == username:
            print("fjhsdfhk")
            return jsonify({'result' : 'false'}) # not available

    return jsonify({'result' : 'true'}) # available

# for adding a post to database
# precondition: assumes that poster id exists
# NOTE: frontend also keeps track of all posts initially in db and calculates id like backend as posts are made - they match
# expected input format
#   {"cuisine" : "cuisine", "description" : "we want yummy food", "title" : "Looking for a world class chef", "bid_close" : "24/11/2018", "budget" : 5.00, "diet" : "vegan", "poster_id" : 0, "location" : "Sydney", "event_date" : "12/12/2018", "quality" : "high quality", "num_ppl" : 5}
@app.route("/postTask", methods=['POST'])
def postTask():
    data = request.get_json()
    cuisine = data["cuisine"]
    task_open = "true"
    description = data["description"]
    title = data["title"]
    bid_close = data["bid_close"]
    budget = data["budget"]
    diet = data["diet"]
    poster_id = data["poster_id"] 
    lowest_bid = None
    location = data["location"]
    event_date = data["event_date"]
    quality = data["quality"]
    num_ppl = data["num_ppl"]

    # calculate id - can use gloabl var later - make it more efficient?
    newId = 0
    for post in database['posts']:
        if post['id'] > newId:
            newId = post['id']

    newId = newId + 1

    # edit the global variable - before updating the file
    database['posts'].append({'cuisine' : cuisine, 'task_open' : task_open, 'description' : description,    
        'title' : title, 'bid_close' : bid_close, 'budget' : budget, 'diet' : diet, 'poster_id' : poster_id,
        'lowest_bid' : lowest_bid, 'location' : location, 'event_date' : event_date, 'quality' : quality,
        'id' : newId, 'num_ppl' : num_ppl})

    # to check what databaase looks like
    newDb = json.dumps(database, indent=2) 

    # write new db to file
    with open("data.json", "w") as file:
        json.dump(database, file, indent=2)
    
    return jsonify({'result' : 'success'})

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

# post_id is already in front end since frontend retrieves stuff from db before anything
# and calculated postid for any posts added after that
# if it's a guest (i.e. someone with no accounts adding a bid - just add it in) - bidder_id = -1
# if it is a person with an account - same person on same post if bidderid&&postid are same
#expected input formaat
#   {"post_id": 0, "bidder_id": 0, "bid_offer": 2.00, "email": "luslee@mail.com", "name": "Lucy", "phone": "0486754231" }
@app.route("/bidTask", methods=['POST'])
def bidTask():
    data = request.get_json()
    post_id = data["post_id"]
    bidder_id = data["bidder_id"] # basically the account user id - if no account -1
    bid_offer = data["bid_offer"]
    email = data["email"]
    name = data["name"]
    phone = data["phone"]

    # check whether its the same person in the db 
    # same person = same name && same email && same phone and for that same post
    i = -1
    for j, d in enumerate(database['bids']):
        print j
        #if d["name"] == name and d["email"] == email and d["phone"] == phone and d["post_id"] == post_id:
        if d["post_id"] == post_id and d["bidder_id"] == bidder_id:
            i = j
            break

    print(i)
    if i == -1 or bidder_id == -1:
        # new record
        # edit the global variable - before updating the file
        # add bid to db
        
        database['bids'].append({"post_id": post_id, "bidder_id": bidder_id, "bid_offer": bid_offer, "email": email, "name": name, "phone": phone })
        
    else:
        # overwrite
        #database["bids"][i]["bid_offer"] = bid_offer
        #database["bids"].remove(i)
        print("delete!")
        print(database["bids"][i])
        del database["bids"][i]
        print(type(database["bids"]))
        database['bids'].append({"post_id": post_id, "bidder_id": bidder_id, "bid_offer": bid_offer, "email": email, "name": name, "phone": phone })

    # update lowest bid
    lowest = bid_offer
    # go through db of bids - find the lowest one
    for bid in database['bids']:
        if bid['post_id'] == post_id and bid['bid_offer'] < lowest:
            lowest = bid['bid_offer']
    # update it on post
    for post in database['posts']:
        if post['id'] == post_id:
            post['lowest_bid'] = lowest

    # to check what databaase looks like
    newDb = json.dumps(database, indent=2) 

    # write new db to file
    with open("data.json", "w") as file:
        json.dump(database, file, indent=2)
    
    return jsonify({'result' : 'success'})

    # if bidding with no account - bidder_id is -1
    

    # check if it is a new or overwriting for account ones - dont worry about this

    """
    {
      "post_id": 0, 
      "bidder_id": 0,
      "bid_offer": "2.00", 
      "email": "luslee@mail.com", 
      "name": "Lucy", 
      "phone": "0486754231"
    }
    """
   

    # check lowest bid and change it in db

    #return bid.bid_offer

#################### should have post requests#####################

# NOTE: currently to change password for account does not need any type of verification
# need to double check^ - not in our req
# expected input format:
#   {"user_id" : 0, "new_password" : "mynewpwd" }
@app.route("/changePwd", methods=['POST'])
def changePwd():
    # change pwd
    data = request.get_json()
    user_id = data["user_id"]
    new_password = data["new_password"]
    #print(database["users"][])
    for user in database['users']:
        if user["id"] == user_id:
            user["password"] = new_password
            # to check what databaase looks like
            newDb = json.dumps(database, indent=2) 

            # write new db to file
            with open("data.json", "w") as file:
                json.dump(database, file, indent=2)
            
            return jsonify({'result' : 'success'})

    return jsonify({'result' : 'failure'}) # when it does not find the user id

# expected input format:
#   {"user_id" : 3 }
@app.route("/delAcc", methods=['POST'])
def delAccount():
    # del account
    data = request.get_json()
    user_id = data["user_id"]
    i = 0
    for user in database["users"]:
        if user["id"] == user_id:
            del database["users"][i]
        i = i + 1

    # to check what databaase looks like
    newDb = json.dumps(database, indent=2) 

    # write new db to file
    with open("data.json", "w") as file:
        json.dump(database, file, indent=2)
    
    return jsonify({'result' : 'success'})

# expects an entire post object - which replaces the old one
#{ "cuisine": "chinese", "task_open": "true", "description": "Cater for a wedding event with various options (vegan, vegetarian, etc..)", "title": "Cook for 50-people event", 
#      "bid_close": "10/10/2018", "budget": 88.88, "diet": "vegetarian", "poster_id": 1, "lowest_bid": 90, "location": "cabramatta", 
#      "event_date": "24/11/2018", "quality": "Fine Dining", "post_id": 0, "num_ppl": 10 }
@app.route("/editTask", methods=['POST'])
def editTask():
    # edit task
    print("need to clarify interface")
    data = request.get_json()
    # process json of post object
    cuisine = data["cuisine"]
    task_open = "true"
    description = data["description"]
    title = data["title"]
    bid_close = data["bid_close"]
    budget = data["budget"]
    diet = data["diet"]
    poster_id = data["poster_id"] 
    lowest_bid = data["lowest_bid"]
    location = data["location"]
    event_date = data["event_date"]
    quality = data["quality"]
    num_ppl = data["num_ppl"]
    post_id = data["post_id"]

    # delete task
    i = 0
    for post in database["posts"]:
        if post["id"] == post_id:
            del database["posts"][i]
        i = i + 1

    # edit the global variable - before updating the file
    # add it back in with updated info
    database['posts'].append({'cuisine' : cuisine, 'task_open' : task_open, 'description' : description,    
        'title' : title, 'bid_close' : bid_close, 'budget' : budget, 'diet' : diet, 'poster_id' : poster_id,
        'lowest_bid' : lowest_bid, 'location' : location, 'event_date' : event_date, 'quality' : quality,
        'id' : post_id, 'num_ppl' : num_ppl})

    # to check what databaase looks like
    newDb = json.dumps(database, indent=2) 

    # write new db to file
    with open("data.json", "w") as file:
        json.dump(database, file, indent=2)
    
    return jsonify({'result' : 'success'})


# expected input format:
#   {"post_id" : 3 }
@app.route("/delTask", methods=['POST'])
def delTask():
    # del task
    print("deletes a task")
    data = request.get_json()
    post_id = data["post_id"]

    i = 0
    for post in database["posts"]:
        if post["id"] == post_id:
            del database["posts"][i]
        i = i + 1

    # to check what databaase looks like
    newDb = json.dumps(database, indent=2) 

    # write new db to file
    with open("data.json", "w") as file:
        json.dump(database, file, indent=2)
    
    return jsonify({'result' : 'success'})

# expected input:
# { "bidder_id": 0, "name": "Lucy", "phone": "0486754231", "post_id": 0, "bid_offer": 2.0, "email": "luslee@mail.com" }
# NOTE: guests(i.e. people with no accounts cannot update their bids)
@app.route("/updateBid", methods=['POST'])
def updateBid():
    print("update an existing bid")
    data = request.get_json()
    bidder_id = data["bidder_id"]
    name = data["name"]
    phone = data["phone"]
    post_id = data["post_id"]
    bid_offer = data["bid_offer"]
    email = data["email"]

    i = 0
    for bid in database["bids"]:
        if bid["post_id"] == post_id and bid["bidder_id"] == bidder_id:
            del database["bids"][i]
        i = i + 1

    # edit the global variable - before updating the file
    # add it back in with updated info
    database['bids'].append({ "bidder_id": bidder_id, "name": name, "phone": phone, "post_id": post_id, "bid_offer": bid_offer, "email": email })

    # to check what databaase looks like
    newDb = json.dumps(database, indent=2) 

    # write new db to file
    with open("data.json", "w") as file:
        json.dump(database, file, indent=2)
    
    return jsonify({'result' : 'success'})
    

# expected input:
# { "post_id" : 0, "bidder_id" : 0 }
# NOTE: guests(i.e. people with no accounts cannot delete their bids)
@app.route("/delBid", methods=['POST'])
def delBid():
    data = request.get_json()
    post_id = data["post_id"]
    bidder_id = data["bidder_id"]

    # del bids
    print("delete an existiing bid")
    i = 0
    for bid in database["bids"]:
        if bid["post_id"] == post_id and bid["bidder_id"] == bidder_id:
            del database["bids"][i]
        i = i + 1

    # to check what databaase looks like
    newDb = json.dumps(database, indent=2) 

    # write new db to file
    with open("data.json", "w") as file:
        json.dump(database, file, indent=2)
    
    return jsonify({'result' : 'success'})

"""
# "profile" created by default when an account is created
@app.route("/createProfile", methods=['POST'])
def createProfile():
    # need to add a field in users for this - probably another object within the user?
    print("creates a profile")
"""

# updates the "profile" that was auto created when account was created
# profile = the fields in an user object
# { "username": "Lu Slee Choo", "name": "Lucy", "email": "luslee@mail.com", "phone": "0486754231", "password": "iloveuni", "user_id": 2, "about_me" : "luslee", "skills_exp" : "experienced as" }
@app.route("/editProfile", methods=['POST'])
def editProfile():
    print("edit a profile")
    data = request.get_json()
    username = data["username"]
    name = data["name"]
    email = data["email"]
    phone = data["phone"]
    password = data["password"]
    user_id = data["user_id"] # diff name
    about_me = data["about_me"]
    skills_exp = data["skills_exp"]

    i = 0
    for user in database["users"]:
        if user["id"] == user_id:
            del database["users"][i]
        i = i + 1

    # edit the global variable - before updating the file
    # add it back in with updated info
    database['users'].append({ "username": username, "name": name, "email": email, "phone": phone, "password": password, "id": user_id, "about_me" : about_me, "skills_exp" : skills_exp })

    # to check what databaase looks like
    newDb = json.dumps(database, indent=2) 

    # write new db to file
    with open("data.json", "w") as file:
        json.dump(database, file, indent=2)
    
    return jsonify({'result' : 'success'})
    



if __name__ == "__main__":
    app.run()

# https://pythonspot.com/flask-web-app-with-python/


# account to persist  - dodgy way global variable in front end since dont need to demo it