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

@api.route("/login", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    room = request.json.get("room", None)
   
    client = Client.query.filter_by(email=email, room=room).first()
    if client is None:
        
        return jsonify({"msg": "Bad email or room"}), 401
    
   
    access_token = create_access_token(identity=client.id)
    return jsonify({ "token": access_token, "client_id": client.id, "client_gender":client.gender})


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
@jwt_required()
def create_booking():


    current_client_id = get_jwt_identity()
    client = Client.query.get(current_client_id)

    
    json= request.get_json()
    day = json.get("day", None)
    hour = json.get("hour", None)
    month =json.get("month", None)
    year = json.get("year", None)
    minutes = json.get("minutes", None)
   
    gym = Gym.query.get(1)  
    if gym is None:
        return jsonify("no encontrado")
    capacity= gym.capacity
    capacity_used = Booking.query.filter_by(
        day=day,year=year,hour=hour,month=month, minutes=minutes, gym = gym, client_id = current_client_id
    ).count()  
    
    if capacity_used >= capacity:
        return jsonify({"aforo limitado"}),401

    booking= Booking(
        day=day,
        year=year,
        hour=hour,
        month=month, 
        minutes=minutes,
        gym = gym,
        client_id = current_client_id
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
     detail = "Es un ejercicio dentro de la categoria HIIT (ejercicios de alta intensidad) para mejorar la resistencia y capacidad cardiovascular.",
     machine = machine1,
     video = "https://www.youtube.com/embed/QY3PhsJ7d08",
     imagen = "exercise-1"
    )

    db.session.add(exercise1)
    
    exercise2= Exercise(
     name = "Curl de biceps",
     time = 5,
     detail = "En este ejercicio intentaremos realizar las maximas rondas posibles de 10 repeticiones, con dos mancuernas con 10kg",
     machine = machine2,
     video = "https://www.youtube.com/embed/COzFAWnbdPY",
     imagen = "exercise-2"
    )
    
    db.session.add(exercise2)
    
    exercise3= Exercise(
     name = "Flexion de triceps",
     time = 5,
     detail = "Para poder fortalecer los tríceps, uno de los ejercicios más recomendables es la flexión de tríceps. Para este ejercicio realizrás 5 rondas de 10 repeticiones cada una",
     machine = machine7,
     video = "https://www.youtube.com/embed/hTPkT1pZpdk",
     imagen = "exercise-3"
    )

    db.session.add(exercise3)

    exercise4= Exercise(
     name = "Extension de triceps",
     time = 10,
     detail = "Otro ejercicio muy útil para fortalecer los tríceps es la extensión. Para ello realizarás 5 rondas de 12 repeticiones con un peso de 10kg",
     machine = machine3,
     video = "https://www.youtube.com/embed/6_C4IohqulY",
     imagen = "exercise-4"
    )

    db.session.add(exercise4)

    exercise5= Exercise(
     name = "Remo vertical",
     time = 10,
     detail = "En este ejercicio realizaremos 5 rondas de 12 repeticiones con un peso de 24kg",
     machine = machine3,
     video = "https://www.youtube.com/embed/ZszxnckeOT0",
     imagen = "exercise-5"
    )

    db.session.add(exercise5)

    exercise6= Exercise(
     name = "Press banca",
     time = 10,
     detail = "Este ejercicio es uno de los reyes para el fortaleimiento de los pectorales. Para ello 5 rondas de 12 repeticiones con 40kg",
     machine = machine7,
     video = "https://www.youtube.com/embed/GeLq8cMODLc",
     imagen = "exercise-6"
    )

    db.session.add(exercise6)

    exercise7= Exercise(
     name = "Lounges",
     time = 5,
     detail = "Con este ejercicio fortaleceremos los cuadríceps y el glúteo. Un ejercicio sencillo para poder trabajar el tren inferior. Para ello realizarás 5 rondas de 20 repeticiones (10 con cada pierna)",
     machine = machine8,
     video = "https://www.youtube.com/embed/FtNBlVNKrs0",
     imagen = "exercise-7"
    )

    db.session.add(exercise7)

    exercise8= Exercise(
     name = "Plancha",
     time = 5,
     detail = "En este ejercicio trabajaremos el abdomen realizando 4 rondas de un minuto de plancha isometrica",
     machine = machine8,
     video = "https://www.youtube.com/embed/mMieHCr-H0c",
     imagen = "exercise-8"
    )

    db.session.add(exercise8)

    exercise9= Exercise(
     name = "Thruster con barra",
     time = 10,
     detail = "Con este ejercicio vamos a trabajar tanto piernas como hombros. Para ello realizarás 5 rondas de 12 repeticiones con 20kg",
     machine = machine3,
     video ="https://www.youtube.com/embed/L219ltL15zk",
     imagen = "exercise-9"
    )

    db.session.add(exercise9)

    exercise10= Exercise(
     name = "Cargadas",
     time = 10,
     detail = "Para realizar las cargadas harás 5 rondas de 10 repeticiones con 20kg",
     machine = machine3,
     video = "https://www.youtube.com/embed/G7A3kC8yoLI",
     imagen = "exercise-10"
    )

    db.session.add(exercise10)

    exercise11= Exercise(
     name = "Front squat con barra",
     time = 5,
     detail = "Lo que conocemos como sentadilla con peso. Es un gran ejercicio para trabajar el tren inferior. Para ello, realizaremos 5 rondas de 10 front squat con peso de 20kg",
     machine = machine3,
     video = "https://www.youtube.com/embed/uYumuL_G_V0",
     imagen = "exercise-11"
    )

    db.session.add(exercise11)

    exercise12= Exercise(
     name = "Back squat con barra",
     time = 5,
     detail = "Al igual que el front squat, este ejercicio nos ayuda a fortalecer el tren inferior. Para ello, realizaremos 5 rondas de 10 back squat con peso de 20kg",
     machine = machine3,
     video = "https://www.youtube.com/embed/QmZAiBqPvZw",
     imagen = "exercise-12"
    )

    db.session.add(exercise12)

    exercise13= Exercise(
     name = "Swing de Kettlebell",
     time = 10,
     detail = "En este ejercicio trabajaremos la espalda. Pra ello realizaremos 5 rondas de 20 repeticiones (10 swing de kettlebell con cada mano)",
     machine = machine2,
     video = "https://www.youtube.com/embed/mKDIuUbH94Q",
     imagen = "exercise-13"
    )

    db.session.add(exercise13)

    exercise14= Exercise(
     name = "Abdominales",
     time = 10,
     detail = "Este es un clásico para trabajar el core. Realizaremos 5 rondas de 30 abdominales cada una, con un descanso de 20 segundos entre rondas",
     machine = machine6,
     video = "https://www.youtube.com/embed/2tXQbi16EdI",
     imagen = "exercise-14"
    )

    db.session.add(exercise14)

    exercise15= Exercise(
     name = "Cardio con eliptica",
     time = 10,
     detail = "Realizaremos 10 minutos de cardio en la eliptica",
     machine = machine4,
     video = "https://www.youtube.com/embed/JgS5RLAHoBw",
     imagen = "exercise-15"
    )
    db.session.add(exercise15)

    exercise16= Exercise(
     name = "Cardio con bicicleta",
     time = 10,
     detail = "Realizaremos 10 minutos de cardio en la bicicleta estatica",
     machine = machine5,
     video = "https://www.youtube.com/embed/YIy3PY_fdYQ",
     imagen = "exercise-16"
    )

    db.session.add(exercise16)

    award1 = Award(
     name = "Aficionado",
     total_time = "20",
     discount = "5",
     image_on = "002-sport",
     image_off = "002-sport-gris",
     qr_code = "qr_code"
    )
    db.session.add(award1)

    award2 = Award(
     name = "Primera clase completa",
     total_time = "45",
     discount = "10",
     image_on = "013-trainers",
     image_off = "013-trainers-gris",
     qr_code = "qr_code"
    )
    db.session.add(award2)

    award3 = Award(
     name = "Anda, vamos mejorando",
     total_time = "75",
     discount = "12",
     image_on = "020-muscle",
     image_off = "020-muscle-gris",
     qr_code = "qr_code"
    )
    db.session.add(award3)

    award4 = Award(
     name = "WOW",
     total_time = "105",
     discount = "15",
     image_on = "022-barbell",
     image_off = "022-barbell-gris",
     qr_code = "qr_code"
    )
    db.session.add(award4)

    award5 = Award(
     name = "A mitad de lo gordo",
     total_time = "150",
     discount = "20",
     image_on = "024-diet",
     image_off = "024-diet-gris",
     qr_code = "qr_code"
    )
    db.session.add(award5)

    award6 = Award(
     name = "Wapura",
     total_time = "200",
     discount = "25",
     image_on = "030-agility",
     image_off = "030-agility-gris",
     qr_code = "qr_code"
    )
    db.session.add(award6)

    award7 = Award(
     name = "GYM GYM GYM",
     total_time = "250",
     discount = "30",
     image_on = "031-calendar",
     image_off = "031-calendar-gris",
     qr_code = "qr_code"
    )
    db.session.add(award7)

    award8 = Award(
     name = "uuuuuuuh",
     total_time = "350",
     discount = "35",
     image_on = "039-whistle",
     image_off = "039-whistle-gris",
     qr_code = "qr_code"
    )
    db.session.add(award8)

    award9 = Award(
     name = "Vigorexia",
     total_time = "900",
     discount = "50",
     image_on = "044-stopwatch",
     image_off = "044-stopwatch-gris",
     qr_code = "qr_code"
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
        stay = stay1,
        total_time = 0
    )
    db.session.add(client)

    client2 = Client(
        email = "eliezer@gmail.com",
        room = 506,
        stay =  stay3,
        total_time = 0
    )
    db.session.add(client2)

    client3 = Client(
        email = "almu@gmail.com",
        room = 806,
        stay =  stay2,
        plan = plan2,
        total_time = 0
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

@api.route('/booking', methods=['GET'])
@jwt_required()
def get_all_bookings():
    current_client_id = get_jwt_identity()
    bookings = Booking.query.filter_by(client_id=current_client_id).all()
    bookings = list(map(lambda booking : booking.serialize(), bookings))
    return jsonify(bookings), 200

@api.route('/booking/<int:booking_id>', methods=['GET'])
def get_booking(booking_id):
    booking = Booking.query.get(booking_id)
    return jsonify(booking.serialize()), 200

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
 
@api.route('/define-customized', methods=['GET'])
def define_customized():

    exercises = Exercise.query.all()
    exercises = list(map(lambda exercise : exercise.serialize(), exercises))
    
    return jsonify(exercises), 200


@api.route('/customized-exercises',  methods=["POST"])
@jwt_required()
def customized_exercises():

    current_client_id = get_jwt_identity()
    client = Client.query.get(current_client_id)
    
    json= request.get_json()
    exercises = json.get("exercises", None)
    print(exercises)
    plan = Plan(
        name= "customize"
    )
    
    client.plan = plan 
    

    custom_exercises = []

    for id in exercises: 
        exercise = Exercise.query.get(id)
        custom_exercises.append(exercise) 

    client.plan.exercises = custom_exercises
   
   
    custom_exercises = list(map(lambda custom_exercise : custom_exercise.serialize(), custom_exercises))
    client.save()    

    return jsonify(custom_exercises),200 

@api.route('/customize-selected', methods=['GET'])
@jwt_required()
def customize_selected():
    current_client_id = get_jwt_identity()
    client = Client.query.get(current_client_id)
    
    plan = client.plan
    
    print(client.plan)
    client.save()
    
    return jsonify(client.plan.serialize()), 200

@api.route('/profile', methods=['GET'])
@jwt_required()
def profile():
    current_client_id = get_jwt_identity()
    client = Client.query.get(current_client_id)
    
    exercises = client.plan.exercises 
    plan = client.plan
    
    
    print(client.plan)
   
    exercises = list(map(lambda exercise : exercise.serialize(), exercises))
    print(exercises)

    return jsonify({"exercises":exercises, "plan":plan.serialize()}), 200

@api.route('/bookings/<int:booking_id>', methods=['DELETE'])
@jwt_required()
def delete_bookings(booking_id):
    try: 
        booking_to_delete = Booking.query.get(booking_id)
        print(booking_to_delete.serialize())
        db.session.delete(booking_to_delete)
        db.session.commit()
        return jsonify(booking_id), 200
    except Exception as error:
        print(error)
        return jsonify("internal server error"), 500


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

@api.route("/get-client-time", methods=["GET"])
@jwt_required()
def get_client_time():

    current_client_id = get_jwt_identity()
    client = Client.query.get(current_client_id)
    
    total_time = client.total_time
    print(total_time)

    return jsonify(total_time), 200