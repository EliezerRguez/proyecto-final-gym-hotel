"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Client, Stay
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend"
    }

    return jsonify(response_body), 200

@api.route('/create/stay', methods=['GET'])
def list_of_stays():
    stay1 = Stay(
     name = "corta estancia",
     from_day = "1",
     to_day = "4",
    )
    db.session.add(stay1)
    stay2 = Stay(
     name = "media estancia",
     from_day = "5",
     to_day = "10",
    )
    db.session.add(stay2)
    stay3 = Stay(
     name = "larga estancia",
     from_day = "11",
     to_day = "1000",
    )
    db.session.add(stay3)
    db.session.commit()
    return jsonify("stay ok"), 200


@api.route('/stays', methods=['GET'])
def get_stays():
    stays = Stay.query.all()
    stays = list(map(lambda stay : stay.serialize(), stays))
    return jsonify(stays), 200

@api.route("/personaldata", methods=["POST"])
def personal_data():
    email = request.json.get("email",None)
    gender = request.json.get("gender", None)
    room = request.json.get("room",None)
    height = request.json.get("height",None)
    weight = request.json.get("weight", None)
    weeklyexercise = request.json.get("weeklyexercise", None)
    stay_id =  request.json.get("stay_id", None)
    plan_id = request.json.get("plan_id", None)
    
    client = Client(email = email, gender = gender, room = room, height = height, weight = weight, weeklyexercise = weeklyexercise, stay_id = stay_id, plan_id = plan_id)
   #json= request.get_json()

    db.session.add(client)
    db.session.commit()
       

    return jsonify([]), 200