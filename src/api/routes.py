"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Client, Plan, Machine, Booking, Award, Exercise, Stay, Gym
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
@jwt_required()
def register_personaldata():
    json= request.get_json()
    gender = json.get("gender", None)
    weight = json.get("weight", None)
    height = json.get("height", None)
    weekly_exercise = json.get("weekly_exercise",None)
    
    current_client_id = get_jwt_identity()
    client = Client.query.get(current_client_id)
   
    
    client.gender=gender
    client.weight=weight
    client.height=height
    client.weekly_exercise=weekly_exercise

    
    client.save()
          
    return jsonify({"gender": client.gender, "weight": client.weight, "height":client.height, "weekly_exercise": client.weekly_exercise}), 200
      
@api.route("/create-booking", methods=["POST"])
def create_booking():
    json= request.get_json()
    day = json.get("day", None)
    hour = json.get("hour", None)
    month =json.get("month", None)
    year = json.get("year", None)
    minutes = json.get("minutes", None)
   
    gym = Gym.query.get(1)  
    capacity= gym.capacity
    Booking.query.filter_by(day=day,year=year,hour=hour,month=month, minutes=minutes).count()  
    
    if capacity_used >= capacity:
        return jsonify({"aforo limitado"}),401

    booking= Booking(
        day=day,
        year=year,
        hour=hour,
        month=month, 
        minutes=minutes
    )

    booking.save()
       
   
    return jsonify(booking.serialize()), 200

@api.route('/create/gym', methods=['GET'])
def list_of_gyms():

    gym = Gym(
     capacity = "10"     
    )
    db.session.add(gym)
    gym2 = Gym(
     capacity = "5"     
    )
    db.session.add(gym2)
     
    db.session.commit()
    gyms = Gym.query.all()
    gyms = list(map(lambda gym : gym.serialize(), gyms))
    return jsonify(gyms), 200
    
       

@api.route('/create/all-things', methods=['GET'])
def list_of_things():

    machine1 = Machine(
     name = "Cinta de correr",
    )
    db.session.add(machine1)
    
    machine2=  Machine(
     name = "Kettlebell",
    )
    db.session.add(machine2)

    machine3=  Machine(
     name = "Pesas",
    )
    db.session.add(machine3)

    machine4=  Machine(
     name = "Eliptica",
    )
    db.session.add(machine4)

    machine5=  Machine(
     name = "Bicicleta estatica",
    )
    db.session.add(machine5)

    machine6=  Machine(
     name = "Maquina de abdominales",
    )
    db.session.add(machine6)

    machine7=  Machine(
     name = "Banca",
    )
    db.session.add(machine7)

    machine8=  Machine(
     name = "Suelo",
    )
    db.session.add(machine8)
   
    exercise1 = Exercise(
     name = "Cardio en cinta",
     time = 10,
     detail = "velocidad 6.5",
     machine = machine1,
    )

    db.session.add(exercise1)
    
    exercise2= Exercise(
     name = "Curl de biceps",
     time = 5,
     detail = "Maximas rondas de 10 repeticiones con 10kg",
     machine = machine2,
    )
    
    db.session.add(exercise2)
    
    exercise3= Exercise(
     name = "Flexion de triceps",
     time = 5,
     detail = "5 rondas de 10 repeticiones",
     machine = machine7,
    )

    db.session.add(exercise3)

    exercise4= Exercise(
     name = "Extension de triceps",
     time = 10,
     detail = "5 rondas de 12 repeticiones con disco de 10kg",
     machine = machine3,
    )

    db.session.add(exercise4)

    exercise5= Exercise(
     name = "Remo vertical",
     time = 10,
     detail = "5 rondas de 12 repeticiones con disco de 24kg",
     machine = machine3,
    )

    db.session.add(exercise5)

    exercise6= Exercise(
     name = "Press banca",
     time = 10,
     detail = "5 rondas de 12 repeticiones con 40kg",
     machine = machine7,
    )

    db.session.add(exercise6)

    exercise7= Exercise(
     name = "Flexiones",
     time = 5,
     detail = "5 rondas de 20 flexiones",
     machine = machine8,
    )

    db.session.add(exercise7)

    exercise8= Exercise(
     name = "Plancha",
     time = 5,
     detail = "4 rondas de un minuto de plancha isometrica",
     machine = machine8,
    )

    db.session.add(exercise8)

    exercise9= Exercise(
     name = "Thruster con barra",
     time = 10,
     detail = "5 rondas de 12 repeticiones con 20kg",
     machine = machine3,
    )

    db.session.add(exercise9)

    exercise10= Exercise(
     name = "Cargadas",
     time = 10,
     detail = "5 rondas de 10 repeticiones con 20kg",
     machine = machine3,
    )

    db.session.add(exercise10)

    exercise11= Exercise(
     name = "Front squat con barra",
     time = 5,
     detail = "5 rondas de 10 front squat con peso de 20kg",
     machine = machine3,
    )

    db.session.add(exercise11)

    exercise12= Exercise(
     name = "Back squat con barra",
     time = 5,
     detail = "5 rondas de 10 back squat con peso de 20kg",
     machine = machine3,
    )

    db.session.add(exercise12)

    exercise13= Exercise(
     name = "Swing de Kettlebell",
     time = 10,
     detail = "5 rondas de 20 repeticiones (10 swing de kettlebell con cada mano)",
     machine = machine2,
    )

    db.session.add(exercise13)

    exercise14= Exercise(
     name = "Abdominales",
     time = 10,
     detail = "5 rondas de 30 abdominales",
     machine = machine6,
    )

    db.session.add(exercise14)

    exercise15= Exercise(
     name = "Cardio con eliptica",
     time = 10,
     detail = "10 minutos de cardio en la eliptica",
     machine = machine4,
    )
    db.session.add(exercise15)

    exercise16= Exercise(
     name = "Cardio con bicicleta",
     time = 10,
     detail = "10 minutos de cardio en la bicicleta estatica",
     machine = machine5,
    )

    db.session.add(exercise16)

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

    plan1 = Plan(
     name = "Bajar el buffet",
     time = "135",
     difficulty = "1",
    )
    all_exercises1 = [exercise1,exercise2,exercise3,exercise4,exercise5]
    plan1.exercises = all_exercises1
    
    db.session.add(plan1)
    
    plan2 = Plan(
     name = "Que no se me note demasiado",
     time = "315",
     difficulty = "3",
    )
    all_exercises2 = [exercise1,exercise2,exercise3,exercise4,exercise5,exercise6,exercise7,exercise8,exercise9,exercise10]
    plan2.exercises = all_exercises2
   
    db.session.add(plan2)

    plan3 = Plan(
     name = "Como si nunca me hubiese ido de vacaciones",
     time = "540",
     difficulty = "5",
    )
    all_exercises3 = [exercise1,exercise2,exercise3,exercise4,exercise5,exercise6,exercise7,exercise8,exercise9,exercise10,exercise11,exercise12,exercise13,exercise14,exercise15,exercise16]
    plan3.exercises = all_exercises3
    
    db.session.add(plan3)

    stay1 = Stay(
     id = 1,
     name = "corta estancia",
     from_day = 1,
     to_day = 4,
     plans = [plan1] 
    )
    db.session.add(stay1)
    
    stay2 = Stay(
     id = 2,
     name = "media estancia",
     from_day = 5,
     to_day = 10,
     plans = [plan2] 
    )
    db.session.add(stay2)

    stay3 = Stay(
     id = 3,
     name = "larga estancia",
     from_day = 11,
     to_day = 1000,
     plans = [plan3] 
    )
    db.session.add(stay3)

    client = Client(
        email = "chiara@gmail.com",
        room = 606,
        stay = stay1
    )
    db.session.add(client)

    client2 = Client(
        email = "eliezer@gmail.com",
        room = 506,
        stay =  stay3
    )
    db.session.add(client2)

    client3 = Client(
        email = "almu@gmail.com",
        room = 806,
        stay =  stay2,
        plan = plan2
    )
    db.session.add(client3)

    db.session.commit()

    return jsonify("things ok"), 200


@api.route('/machines', methods=['GET'])
def get_machines():
    machines = Machine.query.all()
    machines = list(map(lambda machine : machine.serialize(), machines))
    return jsonify(machines), 200


@api.route('/exercises', methods=['GET'])
def get_exercises():
    exercises = Exercise.query.all()
    exercises = list(map(lambda exercise : exercise.serialize(), exercises))
    return jsonify(exercises), 200


@api.route('/stays', methods=['GET'])
def get_stays():
    stays = Stay.query.all()
    stays = list(map(lambda stay : stay.serialize(), stays))
    return jsonify(stays), 200


@api.route('/awards', methods=['GET'])
def get_awards():
    awards = Award.query.all()
    awards = list(map(lambda award : award.serialize(), awards))
    return jsonify(awards), 200

@api.route('/plans', methods=['GET'])
def get_plans():
    plans = Plan.query.all()
    plans = list(map(lambda plan : plan.serialize(), plans))
    return jsonify(plans), 200

@api.route("/plans/<int:plan_id>", methods=["GET"])
def get_one_plan(plan_id):
    plan = Plan.query.get(plan_id)
    return jsonify(plan.serialize()), 200


@api.route('/clients', methods=['GET'])
def get_clients():
    clients = Client.query.all()
    clients = list(map(lambda client : client.serialize(), clients))
    return jsonify(clients), 200



@api.route('/select-a-plan', methods=['GET'])
@jwt_required()
def select_a_plan():
   
    current_client_id = get_jwt_identity()
    client = Client.query.get(current_client_id)
       
    plan = client.stay.plans[0]
    

    return jsonify(plan.serialize()), 200

@api.route('/plan-selected', methods=['GET'])
@jwt_required()
def plan_selected():
    current_client_id = get_jwt_identity()
    client = Client.query.get(current_client_id)
    
    client.plan = client.stay.plans[0]
    
    print(client.plan)
    client.save()
    
    return jsonify(client.plan.serialize()), 200
 

@api.route("/exercises/<int:exercise_id>", methods=["GET"])
def get_one_exercise_from_profile(exercise_id):
  
   
    exercise = Exercise.query.get(exercise_id)
   
    return jsonify(exercise.serialize()), 200

@api.route("/plans/<int:plan_id>/exercises", methods=["GET"])
@jwt_required()
def get_exercises_from_profile(plan_id):

    current_client_id = get_jwt_identity()
    client = Client.query.get(current_client_id)
    
    exercises = client.plan.exercises
    print(client.plan)
    print(client.plan.exercises)
    exercises = list(map(lambda exercise : exercise.serialize(), exercises))
   
    return jsonify(exercises), 200

@api.route("/client-time", methods=["POST"])
@jwt_required()
def send_time():

    json= request.get_json()
    time = json.get("total_time", None)

    current_client_id = get_jwt_identity()
    client = Client.query.get(current_client_id)
    print(client)
        
    client.total_time += time

    client.save()

    return jsonify({}), 200