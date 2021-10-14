"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
<<<<<<< HEAD
from api.models import db, Client, Stay
=======
from api.models import db, Client, Plan, Machine, Booking, Award, Exercise, Stay
>>>>>>> 2a4e64329619d875e92b157471e0c51d8553c84d
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import JWTManager, create_access_token,jwt_required, get_jwt_identity

api = Blueprint('api', __name__)
app = Flask(__name__)

app.config["JWT_SECRET_KEY"] = "superequipo-actimel-gimnasiohotel-apptivate"  
jwt = JWTManager(app)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend"
    }

    return jsonify(response_body), 200

<<<<<<< HEAD
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

=======

@api.route("/login", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    room = request.json.get("room", None)
   
    client = Client.query.filter_by(email=email, room=room).first()
    if client is None:
        
        return jsonify({"msg": "Bad email or room"}), 401
    
   
    access_token = create_access_token(identity=client.id)
    return jsonify({ "token": access_token, "client_id": client.id })


@api.route("/personal-data", methods=["POST"])
def register_personaldata():
    gender = request.json.get("gender", None)
    weight = request.json.get("weight", None)
    height = request.json.get("height", None)
    weekly_exercise = request.json.get("weekly_exercise", None)
   
    client = Client(gender=gender, weight=weight, height=height, weekly_exercise=weekly_exercise)
    json= request.get_json()

    db.session.add(client)
    db.session.commit()
       

    return jsonify([]), 200
      
@api.route("/booking", methods=["POST"])
def register_booking():
    day = request.json.get("day", None)
    hour = request.json.get("hour", None)
    month = request.json.get("month", None)
    year = request.json.get("year", None)
   
    booking = Booking(day=day, hour=hour, month=month, year=year)
    json= request.get_json()

    db.session.add(booking)
    db.session.commit()
       

    return jsonify([]), 200

         

@api.route('/create/machine', methods=['GET'])
def list_of_machines():

    machine1 = Machine(
     name = "cinta de correr",
    )
    db.session.add(machine1)
    
    machine2=  Machine(
     name = "kettlebell",
    )
    db.session.add(machine2)

    machine3=  Machine(
     name = "Pesas",
    )
    db.session.add(machine3)

    machine4=  Machine(
     name = "eliptica",
    )
    db.session.add(machine4)

    machine5=  Machine(
     name = "bicicleta",
    )
    db.session.add(machine5)

    machine6=  Machine(
     name = "maquina de abdominales",
    )
    db.session.add(machine6)
    
    
    db.session.commit()

    return jsonify("machine ok"), 200


@api.route('/machines', methods=['GET'])
def get_machines():
    machines = Machine.query.all()
    machines = list(map(lambda machine : machine.serialize(), machines))
    return jsonify(machines), 200

@api.route('/create/exercise', methods=['GET'])
def list_of_exercises():

    exercise1 = Exercise(
     name = "cardio",
     time = 10,
     detail = "velocidad 6.5",
     machine_id = 1,
    )

    db.session.add(exercise1)
    
    exercise2= Exercise(
     name = "fuerza",
     time = 20,
     detail = "5 repeticiones de 10",
     machine_id = 2,
    )

    db.session.add(exercise2)
    db.session.commit()

    return jsonify("exercise ok"), 200

@api.route('/exercises', methods=['GET'])
def get_exercises():
    exercises = Exercise.query.all()
    exercises = list(map(lambda exercise : exercise.serialize(), exercises))
    return jsonify(exercises), 200



@api.route('/create/stay', methods=['GET'])
def list_of_stays():

    stay1 = Stay(
     name = "corta estancia",
     from_day = 1,
     to_day = 4,
    )
    db.session.add(stay1)
    
    stay2 = Stay(
     name = "media estancia",
     from_day = 5,
     to_day = 10,
    )
    db.session.add(stay2)

    stay3 = Stay(
     name = "larga estancia",
     from_day = 11,
     to_day = 1000,
    )
    db.session.add(stay3)
    
    db.session.commit()

    return jsonify("stay ok"), 200
>>>>>>> 2a4e64329619d875e92b157471e0c51d8553c84d

@api.route('/stays', methods=['GET'])
def get_stays():
    stays = Stay.query.all()
    stays = list(map(lambda stay : stay.serialize(), stays))
    return jsonify(stays), 200

<<<<<<< HEAD
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
=======

@api.route('/create/award', methods=['GET'])
def list_of_awards():

    award1 = Award(
     name = "Aficionado",
     total_time = "20",
     discount = "5",
    )
    db.session.add(award1)

    award2 = Award(
     name = "Primera clase completa",
     total_time = "45",
     discount = "10",
    )
    db.session.add(award2)

    award3 = Award(
     name = "Anda, vamos mejorando",
     total_time = "75",
     discount = "12",
    )
    db.session.add(award3)

    award4 = Award(
     name = "WOW",
     total_time = "105",
     discount = "15",
    )
    db.session.add(award4)

    award5 = Award(
     name = "A mitad de lo gordo",
     total_time = "150",
     discount = "20",
    )
    db.session.add(award5)

    award6 = Award(
     name = "Wapura",
     total_time = "200",
     discount = "25",
    )
    db.session.add(award6)

    award7 = Award(
     name = "GYM GYM GYM",
     total_time = "250",
     discount = "30",
    )
    db.session.add(award7)

    award8 = Award(
     name = "uuuuuuuh",
     total_time = "350",
     discount = "35",
    )
    db.session.add(award8)

    award9 = Award(
     name = "Vigorexia",
     total_time = "900",
     discount = "50",
    )
    db.session.add(award9)

    db.session.commit()

    return jsonify("award ok"), 200

@api.route('/awards', methods=['GET'])
def get_awards():
    awards = Award.query.all()
    awards = list(map(lambda award : award.serialize(), awards))
    return jsonify(awards), 200

@api.route('/create/plan', methods=['GET'])
def list_of_plans():

    plan1 = Plan(
     name = "Bajar el buffet",
     time = "135",
     difficulty = "1",
    )
    db.session.add(plan1)
    
    plan2 = Plan(
     name = "Que no se me note demasiado",
     time = "315",
     difficulty = "3",
    )
    db.session.add(plan2)

    plan3 = Plan(
     name = "Como si nunca me hubiese ido de vacaciones",
     time = "540",
     difficulty = "5",
    )
    db.session.add(plan3)
    
    db.session.commit()

    return jsonify("plan ok"), 200

@api.route('/plans', methods=['GET'])
def get_plans():
    plans = Plan.query.all()
    plans = list(map(lambda plan : plan.serialize(), plans))
    return jsonify(plans), 200

@app.route("/plans/<int:plan_id>", methods=["GET"])
def get_one_plan(plan_id):
    plan = Plan.query.get(plan_id)
    return jsonify(plan.serialize()), 200

@app.route("/exercises/<int:excercise_id>", methods=["GET"])
def get_one_exercise(plan_id):
    exercise = Exercise.query.get(exercise_id)
    return jsonify(exercise.serialize()), 200

@api.route('/create/client', methods=['GET'])
def list_of_clients():
    client = Client(
        email = "chiara@gmail.com",
        room = 606
    )
    db.session.add(client)

    client2 = Client(
        email = "eliezer@gmail.com",
        room = 506
    )
    db.session.add(client2)
    db.session.commit()

    
    return jsonify("client ok"), 200

@api.route('/clients', methods=['GET'])
def get_clients():
    clients = Client.query.all()
    clients = list(map(lambda client : client.serialize(), clients))
    return jsonify(clients), 200

@app.route("/profile/<int:client_id>", methods=["GET"])
def get_plan(client_id):
    client = Client.query.get(client_id)
    if client.plan_id is null:
        print()
  #  return jsonify(exercise.serialize()), 200

#@app.route("/plans/<int:plan_id>/exercises/<int:excercise_id>", methods=["GET"])

>>>>>>> 2a4e64329619d875e92b157471e0c51d8553c84d
