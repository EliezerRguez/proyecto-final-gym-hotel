"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Client
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend"
    }

    return jsonify(response_body), 200

@api.route("/personaldata", methods=["POST"])
def personal_data():
   height = request.json.get("height",None)
   weight = request.json.get("height", None)
   gender = request.json.get("gender", None)
   weeklyexercise = request.json.get("weeklyexercise", None)
   
  
    
   client = Client(height = height, weight = weight, gender = gender, weeklyexercise = weeklyexercise)
   #json= request.get_json()

   db.session.add(client)
   db.session.commit()
       

   return jsonify([]), 200