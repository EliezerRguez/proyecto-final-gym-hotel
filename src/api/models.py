from flask_sqlalchemy import SQLAlchemy



db = SQLAlchemy()


awards_client = db.Table('awards',

    db.Column('award_id', db.Integer, db.ForeignKey('award.id'), primary_key=True),
    db.Column('client_id', db.Integer, db.ForeignKey('client.id'), primary_key=True)
)


bookings_client = db.Table('bookings',

    db.Column('booking_id', db.Integer, db.ForeignKey('booking.id'), primary_key=True),
    db.Column('client_id', db.Integer, db.ForeignKey('client.id'), primary_key=True)
)



exercises_plan = db.Table('exercises',

    db.Column('exercise_id', db.Integer, db.ForeignKey('exercise.id'), primary_key=True),
    db.Column('plan_id', db.Integer, db.ForeignKey('plan.id'), primary_key=True)
)


plans_stay = db.Table('plans',

    db.Column('stay_id', db.Integer, db.ForeignKey('stay.id'), primary_key=True),
    db.Column('plan_id', db.Integer, db.ForeignKey('plan.id'), primary_key=True)
)


class SaveAll:
    def save(self):
        db.session.add(self)
        db.session.commit()

class Client(db.Model,SaveAll):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    room = db.Column(db.Integer, unique=True, nullable=False)
    gender = db.Column(db.String(120), unique=False, nullable=True)
    weight = db.Column(db.Integer, unique=False, nullable=True)
    height = db.Column(db.Integer, unique=False, nullable=True)
    weekly_exercise = db.Column(db.Integer, unique=False, nullable=True)
    stay_id = db.Column(db.Integer, db.ForeignKey('stay.id'),
        nullable=False)
    stay = db.relationship('Stay', backref='client', lazy=True)
    plan_id = db.Column(db.Integer, db.ForeignKey('plan.id'),
        nullable=True)
    plan = db.relationship('Plan', backref='client', lazy=True)
    bookings = db.relationship('Booking', secondary=bookings_client, lazy='subquery',
       backref=db.backref('clients', lazy=True))
    awards = db.relationship('Award', secondary=awards_client, lazy='subquery',
       backref=db.backref('clients', lazy=True))
   


    def __repr__(self):
        return '<Client %r>' % self.email

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "gender": self.gender,
            "room": self.room,
            "weight": self.weight,
            "height": self.height,
            "weekly_exercise": self.weekly_exercise,
            "stay_id": self.stay_id,
            "plan_id": self.plan_id
        }

class Plan(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    time = db.Column(db.String(120), unique=False, nullable=False)
    difficulty = db.Column(db.Integer, unique=False, nullable=False)
    exercises = db.relationship('Exercise', secondary=exercises_plan, lazy='subquery',
       backref=db.backref('plans', lazy=True))
    
    def __repr__(self):
        return '<Plan %r>' % self.name

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "time": self.time,
            "difficulty": self.difficulty
        }
        
class Machine(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
   
    
    def __repr__(self):
        return '<Machine %r>' % self.name

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name
        }

class Booking(db.Model, SaveAll):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.datetime, unique=False, nullable=False)
    #day = db.Column(db.Integer, unique=False, nullable=False)
    #hour = db.Column(db.Integer, unique=False, nullable=False)
    #minutes = db.Column(db.Integer, unique=False, nullable=False)
    #month = db.Column(db.Integer, unique=False, nullable=False)
    #year = db.Column(db.Integer, unique=False, nullable=False)
    #gym_id = db.Column(db.Integer, db.ForeignKey('gym.id'),
        nullable=False)
    gym = db.relationship('Gym', backref='booking', lazy=True)
    
    def __repr__(self):
        return '<Booking %r>' % self.day

    def serialize(self):
        return {
            "id": self.id,
            "date": self.date,
            "gym_id": self.gym_id
           
        }


class Award(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    total_time = db.Column(db.Integer, unique=False, nullable=False)
    discount = db.Column(db.Integer, unique=False, nullable=False)
   
    
    def __repr__(self):
        return '<Award %r>' % self.name

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "total_time": self.total_time,
            "discount": self.discount
        }


class Exercise(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    time =db.Column(db.Integer, unique=False, nullable=False)
    detail = db.Column(db.String(120), unique=False, nullable=False)
    machine_id = db.Column(db.Integer, db.ForeignKey('machine.id'),
        nullable=False)
    machine = db.relationship('Machine', backref='exercises', lazy=True)

    
    def __repr__(self):
        return '<Exercise %r>' % self.name

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "time": self.time,
            "detail": self.detail,
            "machine_id": self.machine_id
        }

class Stay(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement= False)
    name = db.Column(db.String(120), unique=False, nullable=False)  
    from_day = db.Column(db.Integer, unique=False, nullable=False)
    to_day = db.Column(db.Integer, unique=False, nullable=True)
    plans = db.relationship('Plan', secondary=plans_stay, lazy='subquery',
       backref=db.backref('stays', lazy=True))
    
    def __repr__(self):
        return '<Stay %r>' % self.name

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "from_day": self.from_day,
            "to_day":self.to_day
        }

 
class Gym(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    capacity = db.Column(db.Integer, unique=False, nullable=False)

    def __repr__(self):
        return '<Gym %r>' % self.capacity

    def serialize(self):
        return {
            "id": self.id,
            "capacity": self.capacity            
        }

