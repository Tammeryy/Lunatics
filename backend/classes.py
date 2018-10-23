from flask_restful import Resource

# Sessions for users
sessions = []

# Get database
# NOTE This doesn't maintain persistance on server restarts
with open('data.json', 'r') as data_file:
    database = json.load(data_file)

class Login(Resource):
    def get(self):
        return {'testing': 'Penis'}