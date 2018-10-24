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
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout/<token>')
api.add_resource(GetAccount, '/account/<account_id>')
api.add_resource(CreateAccount, '/account/create')
api.add_resource(PasswordChange, '/account/change_pwd/<user_id>')
api.add_resource(EditProfile, '/account/edit/<user_id>')
api.add_resource(DeleteAccount, '/account/delete/<user_id>')
api.add_resource(Posts, '/tasks')
api.add_resource(EditPost, '/tasks/edit/<post_id>')
api.add_resource(DeletePost, '/tasks/delete/<post_id>')
api.add_resource(Bid, '/bids/create/<post_id>')
api.add_resource(EditBid, '/bids/edit')
api.add_resource(DeleteBid, '/bids/delete/<post_id>/<bidder_id>')
    
@app.route("/")
def index():
    print(sessions)
    return jsonify({"Init": "Welcome to Lunatics' chaotic backend!"})

# Run application
# NOTE This needs to go last in the file
if __name__ == "__main__":
    app.run(port=2011)


