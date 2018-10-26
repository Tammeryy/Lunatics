from flask_restful import Resource
from flask import Flask, request, jsonify
# from flask_restful import Api
from hashlib import md5
from time import time
from dafny import *
import json

# TODO Posted time for tasks

# Sessions for users
sessions = []

# Get database
# NOTE This doesn't maintain persistance on server restarts
with open('data.json', 'r') as data_file:
    database = json.load(data_file)

##### Session Handling #####
### Login handler ###
class Login(Resource):
    def post(self):
        data = json.loads(request.data)
        if not data:
            return jsonify({'result': 'Failure', 'error': 'No input data provided'}), 400
        try:
            username = data['username']
            password = data['password']
        except:
            return jsonify({'result': 'Failure', 'error': 'Username or password not given'}), 400

        for u in database['users']:
            if u['username'] == username:
                if u['password'] == password:
                    # Generate a session token and add it to the sessions
                    token = md5(str(username) + str(time())).hexdigest()
                    print(token)
                    sessions.append((username, token))
                    # Return the token
                    return jsonify({'Result': 'Success', 'Token': token})
                else:
                    # Incorrect password
                    return jsonify({'result': 'Failure', 'error': 'Username or password incorrect'}), 400

                break
        
        # Username not found:
        return jsonify({'result': 'Failure', 'error': 'Username or password incorrect.'}), 400

### Logout handler ###
class Logout(Resource):
    def get(self, token):
        for i in sessions:
            if i[1] == token:
                sessions.remove(i)
                return jsonify({"Success": "Logged out."})
        return jsonify({'result': 'Failure', 'error': 'Session doesn\'t exist.'}), 404

class PasswordChange(Resource):
    def post(self, user_id):
        data = request.get_json()
        if not data:
            return jsonify({'result': 'Failure', 'error': 'No data found.'}), 400
        try:
            old_password = data["old_password"]
            new_password = data["new_password"]
        except:
            return jsonify({'result': 'Failure', 'error': 'Not all required data provided.'}), 400

        for user in database['users']:
            if user["id"] == user_id:
                if user["password"] == old_password:
                    user["password"] = new_password
                    # write new db to file
                    with open("data.json", "w") as file:
                        json.dump(database, file, indent=2)
                    
                    return jsonify({'result' : 'Success'})
                else:
                    return jsonify({'result': 'Failure', 'error': 'Passwords don\'t match'}), 403

        # when it does not find the user id
        return jsonify({'result': 'Failure', 'error': 'User account doesn\'t exist'}), 404


##### User interaction #####
### Account handler ###
class GetAccount(Resource):
    def get(self, account_id):
        for acc in database['users']:
            if acc['id'] == int(account_id):
                return jsonify(acc)

        return jsonify({'result': 'Failure', 'error': 'Account ID doesn\'t exist'}), 404

class CreateAccount(Resource):
    def post(self):
        data = request.get_json()
        if not data:
            return jsonify({'result': 'Failure', 'error': 'No data found'}), 400
        try:
            username = data["username"]
            password = data["password"]
            name = data["name"]
            phone = data["phone"]
            email = data["email"]
            about_me = ""
            skills_exp = ""
        except:
            return jsonify({'result': 'Failure', 'error': 'Not all required data provided.'}), 400

        # check if username is taken
        for account in database['users']:
            if account['username'] == username:
                return jsonify({'result': 'Failure', 'error': 'Username already exists.'}), 400

        # calculate new ID
        newId = 0
        for account in database['users']:
            if account['id'] > newId:
                newId = account['id']
        # ID is one more than the largest
        newId += 1

        # edit the global variable - before updating the file
        database['users'].append({'id' : newId, 'username' : username, 'password' : password, 'name' : name, 'phone' : phone, 'email' : email, 'about_me' : about_me, 'skills_exp' : skills_exp})

        # write new db to file
        with open("data.json", "w") as file:
            json.dump(database, file, indent=2)

        return jsonify({'result': 'Success', 'username': username})

class EditAccount(Resource):
    def post(self, user_id):
        data = request.get_json()
        if not data:
            return jsonify({'result': 'Failure', 'error': 'No data found.'}), 400
        try:
            username = data["username"]
            name = data["name"]
            email = data["email"]
            phone = data["phone"]
            password = data["password"]
            about_me = data["about_me"]
            skills_exp = data["skills_exp"]
        except:
            return jsonify({'result': 'Failure', 'error': 'Not all required data provided.'}), 400

        for user in database["users"]:
            if user["id"] == user_id:
                database["users"].remove(user)
                break

        # edit the global variable - before updating the file
        # add it back in with updated info
        database['users'].append({ "username": username, "name": name, "email": email, "phone": phone, "password": password, "id": user_id, "about_me" : about_me, "skills_exp" : skills_exp })

        # write new db to file
        with open("data.json", "w") as file:
            json.dump(database, file, indent=2)
        
        return jsonify({'result' : 'Success'})

class DeleteAccount(Resource):
    def get(self, user_id):
        # del account
        # NOTE: We don't check passwords

        for user in database["users"]:
            if user["id"] == user_id:
                database["users"].remove(user)
                break

        # write new db to file
        with open("data.json", "w") as file:
            json.dump(database, file, indent=2)
        
        return jsonify({'result': 'Success'})

##### Tasks #####
### Get and post tasks ###
class Posts(Resource):
    def get(self):
        req = request.get_json()
        if not req:
            return jsonify(database['posts'])
        
        ret = []
        # Search
        # Search query example:
        # {"search": [{"key": "user_id", "value": "0"}, {"key": "location", "value": "cabramatta"}]}
        if "search" in req:
            if len(req['search']) == 1:
                temp = database['posts']
                quicksort(temp, 0, len(temp), req['search'][0]['key'])
                ret = binarySearch(temp, req['search'][0]['value'], req['search'][0]['key'])
                return jsonify(ret)

            # Go through each of the posts
            for p in database["posts"]:
                app = True
                for s in req["search"]:
                    # If each query in the given request matches, append
                    if p[s['key']] != s['value']:
                        app = False
                        break
                if app:
                    ret.append(p)
        else:
            ret = database['posts']


        # Sort
        # Sort query example:
        # {"sort": [{"key": "user_id"}, {"key": "location"}]}
        if 'sort' in req:
            quicksort(ret, 0, len(ret), req['sort'][0]['key'])


        # Filter
        # Filter query example:
        # {"filter": [{"key": "price", "expression": "gt", "value": "1"}, {"key": "location", "value": "parramatta"}]}
        if "filter" in req:
            for p in ret:
                rem = False
                for s in req['filter']:
                    # If each query in the given request matches, remove
                    if s['expression'] == 'eq':
                        if p[s['key']] != s['value']:
                            rem = True
                            break
                    elif s['expression'] == 'ne':
                        if p[s['key']] == s['value']:
                            rem = True
                            break
                    elif s['expression'] == 'lt':
                        if p[s['key']] >= s['value']:
                            rem = True
                            break
                    elif s['expression'] == 'gt':
                        if p[s['key']] <= s['value']:
                            rem = True
                            break
                    else:
                        return jsonify({'result': 'Failure', 'Error': 'Unknown expression given'}), 400
                if rem:
                    ret.remove(p)

        return jsonify(ret)

    def post(self):
        data = request.get_json()
        if not data:
            return jsonify({'result': 'Failure', 'error': 'No data found.'}), 400
        try:
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
        except:
            return jsonify({'result': 'Failure', 'error': 'Not all required data provided.'}), 400

        # Get new post ID
        newId = 0
        for post in database['posts']:
            if post['id'] > newId:
                newId = post['id']
        # Post ID is one greater than the max
        newId += 1

        # edit the global variable - before updating the file
        database['posts'].append({'cuisine' : cuisine, 'task_open' : task_open, 'description' : description,    
            'title' : title, 'bid_close' : bid_close, 'budget' : budget, 'diet' : diet, 'poster_id' : poster_id,
            'lowest_bid' : lowest_bid, 'location' : location, 'event_date' : event_date, 'quality' : quality,
            'id' : newId, 'num_ppl' : num_ppl})

        # write new db to file
        with open("data.json", "w") as file:
            json.dump(database, file, indent=2)
        
        return jsonify({'result' : 'success'})

class EditPost(Resource):
    def post(self, post_id):
        data = request.get_json()
        if not data:
            return jsonify({'result': 'Failure', 'error': 'No data found.'}), 400
        try:
            cuisine = data["cuisine"]
            task_open = "true"
            description = data["description"]
            title = data["title"]
            bid_close = data["bid_close"]
            budget = data["budget"]
            diet = data["diet"] 
            lowest_bid = None
            location = data["location"]
            event_date = data["event_date"]
            quality = data["quality"]
            num_ppl = data["num_ppl"]
        except:
            return jsonify({'result': 'Failure', 'error': 'Not all required data provided.'}), 400

        for post in database["posts"]:
            if post["id"] == post_id:
                database["posts"].remove(post)
                break

        # add it back in with updated info
        database['posts'].append({'cuisine' : cuisine, 'task_open' : task_open, 'description' : description,    
            'title' : title, 'bid_close' : bid_close, 'budget' : budget, 'diet' : diet, 'poster_id' : poster_id,
            'lowest_bid' : lowest_bid, 'location' : location, 'event_date' : event_date, 'quality' : quality,
            'id' : post_id, 'num_ppl' : num_ppl})

        # write new db to file
        with open("data.json", "w") as file:
            json.dump(database, file, indent=2)
        
        return jsonify({'result' : 'success'})

class DeletePost(Resource):
    def get(self, post_id):
        # Remove
        for post in database["posts"]:
            if post["id"] == post_id:
                database["posts"].remove(post)
                break

        # write new db to file
        with open("data.json", "w") as file:
            json.dump(database, file, indent=2)
        
        return jsonify({'result' : 'success'})

class PostsByUser(Resource):
    def get(self, user_id):
        ret = []
        for p in database["posts"]:
            if p['poster_id'] == int(user_id):
                ret.append(p)
        return jsonify(p)


##### Bids #####
class Bid(Resource):
    def get(self, post_id):
        ret = []
        for i in database['bids']:
            if i['post_id'] == int(post_id):
                ret.append(i)

        insertionSort(ret, 0, len(ret), 'price')

        return jsonify(ret)

    def post(self, post_id):
        data = request.get_json()
        if not data:
            return jsonify({'result': 'Failure', 'error': 'No data found.'}), 400
        try:
            bidder_id = data["bidder_id"] # basically the account user id - if no account -1
            bid_offer = data["bid_offer"]
            email = data["email"]
            name = data["name"]
            phone = data["phone"]
        except:
            return jsonify({'result': 'Failure', 'error': 'Not all required data provided.'}), 400

        # check whether its the same person in the db 
        # same person = same name && same email && same phone and for that same post
        i = -1
        for j, d in enumerate(database['bids']):
            print j
            #if d["name"] == name and d["email"] == email and d["phone"] == phone and d["post_id"] == post_id:
            if d["post_id"] == post_id and d["bidder_id"] == bidder_id:
                i = j
                break

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

        # write new db to file
        with open("data.json", "w") as file:
            json.dump(database, file, indent=2)
        
        return jsonify({'result' : 'success'})

class LowestBid(Resource):
    def get(self, post_id):
        ret = []
        for i in database['bids']:
            if i['post_id'] == int(post_id):
                ret.append(i)

        quicksort(ret, 0, len(ret), 'price')

        return jsonify(ret[0])

class EditBid(Resource):
    def post(self):
        data = request.get_json()
        if not data:
            return jsonify({'result': 'Failure', 'error': 'No data found.'}), 400
        try:
            bidder_id = data["bidder_id"]
            name = data["name"]
            phone = data["phone"]
            post_id = data["post_id"]
            bid_offer = data["bid_offer"]
            email = data["email"]
        except:
            return jsonify({'result': 'Failure', 'error': 'Not all required data provided.'}), 400

        for bid in database["bids"]:
            if bid["post_id"] == post_id and bid["bidder_id"] == bidder_id:
                database["bids"].remove(bid)
                break

        # edit the global variable - before updating the file
        # add it back in with updated info
        database['bids'].append({ "bidder_id": bidder_id, "name": name, "phone": phone, "post_id": post_id, "bid_offer": bid_offer, "email": email })

        # write new db to file
        with open("data.json", "w") as file:
            json.dump(database, file, indent=2)
        
        return jsonify({'result' : 'success'})

class DeleteBid(Resource):
    def get(self, post_id, bidder_id):
        data = request.get_json()
        if not data:
            return jsonify({'result': 'Failure', 'error': 'No data found.'}), 400

        # del bids
        for bid in database["bids"]:
            if bid["post_id"] == post_id and bid["bidder_id"] == bidder_id:
                database["bids"].remove(bid)
                break

        # write new db to file
        with open("data.json", "w") as file:
            json.dump(database, file, indent=2)
        
        return jsonify({'result' : 'success'})


# NOTE key passed in here as Dafny verifies the sorting algorithm, but
# only on ints. As we're sorting an array on a key, we need to know 
# what the key is.
def partition(a, start, end, key):
    pivot = start
    i = start + 1
    while i < end:
        if a[i][key] < a[start][key]:
            pivot += 1
            temp = a[i]
            a[i] = a[pivot]
            a[pivot] = temp
        i += 1
    temp = a[start]
    a[start] = a[pivot]
    a[pivot] = temp

    return pivot

def quicksort(arr, start, end, key):
    if end <= start:
        return
    else:
        pivot = partition(arr, start, end, key)
        quicksort(arr, start, pivot, key)
        quicksort(arr, pivot + 1, end, key)

def binarySearch(arr, value, key):
    lo = 0
    hi = len(arr)
    while lo < hi:
        mid = int(lo + hi)/2
        if value < arr[mid][key]:
            hi = mid
        elif arr[mid][key] < value:
            low = mid + 1
        else:
            return arr[mid]
