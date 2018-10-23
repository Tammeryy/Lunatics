from flask_restful import Resource
from flask import Flask, request, jsonify
# from flask_restful import Api
from hashlib import md5
from time import time
import json

# Sessions for users
sessions = []

# Get database
# NOTE This doesn't maintain persistance on server restarts
with open('data.json', 'r') as data_file:
    database = json.load(data_file)


### Login handler ###
class Login(Resource):
    def post(self):
        data = json.loads(request.data)
        if not data:
            return {'Error': 'No input data provided'}, 400
        try:
            username = data['username']
            password = data['password']
        except:
            return {'Error': 'Username or password not given'}, 400
        for u in database['users']:
            if u['username'] == username:
                if u['password'] == password:
                    # Generate a session token and add it to the sessions
                    token = md5(str(username) + str(time())).hexdigest()
                    print(token)
                    # TODO Do we want to do security? I ceebs atm.
                    sessions.append((username, token))
                    # Return the token
                    return {'Success': 'Logging in', 'Token': token}
                else:
                    # Incorrect password
                    return {'Error': 'Username or password incorrect'}, 400

                break
        
        # Username not found:
        return {'Error': 'Username or password incorrect.'}, 400


### Logout handler ###
class Logout(Resource):
    def get(self, token):
        for i in sessions:
            if i[1] == token:
                sessions.remove(i)
                return {"Success": "Logged out."}
        return {'Error': 'Session doesn\'t exist.'}
