from flask_sqlalchemy import SQLAlchemy
import datetime


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

class Client(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    room = db.Column(db.Integer, unique=False, nullable=False)
    weight = db.Column(db.Integer, unique=False, nullable=False)
    height = db.Column(db.Integer, unique=False, nullable=False)
    weeklyexercise = db.Column(db.Integer, unique=False, nullable=False)

    stay_id = db.Column(db.Integer, unique=False, nullable=False)
    stay = db.relationship('Stay', backref='client', lazy=True)
    plan_id = db.Column(db.Integer, db.ForeignKey('plan.id'),
        nullable=False)
    plan = db.relationship('Plan', backref='client', lazy=True)
    bookings_client = db.relationship('Booking', secondary=bookings, lazy='subquery',
       backref=db.backref('clients', lazy=True))
    awards_client = db.relationship('Award', secondary=awards, lazy='subquery',
       backref=db.backref('clients', lazy=True))


    def __repr__(self):
        return '<Client %r>' % self.email

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }

class Plan(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    time = db.Column(db.String(120), unique=False, nullable=False)
    difficulty = db.Column(db.String(120), unique=False, nullable=False)
   
    
    def __repr__(self):
        return '<Plan %r>' % self.name

    def serialize(self):
        return {
            "id": self.id,
            "time": self.time,
            "difficulty": self.difficulty
           
            # do not serialize the password, its a security breach
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
            # do not serialize the password, its a security breach
        }

class Booking(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    day = db.Column(db.String(120), unique=False, nullable=False)
    hour = db.Column(db.Integer, unique=False, nullable=False)
    month = db.Column(db.String(120), unique=False, nullable=False)
    year = db.Column(db.Integer, unique=False, nullable=False)
    
    def __repr__(self):
        return '<Booking %r>' % self.day

    def serialize(self):
        return {
            "id": self.id,
            "day": self.day,
            "hour": self.hour,
            "month": self.month,
            "year": self.year
            # do not serialize the password, its a security breach
        }


class Award(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    totaltime = db.Column(db.Integer, unique=False, nullable=False)
    discount = db.Column(db.Integer, unique=False, nullable=False)
   
    
    def __repr__(self):
        return '<Award %r>' % self.name

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "totaltime": self.totaltime,
            "discount": self.discount
            # do not serialize the password, its a security breach
        }


class Exercise(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    time =db.Column(db.Integer, unique=False, nullable=False)
    machine_id = db.Column(db.Integer, db.ForeignKey('machine.id'),
        nullable=False)
    machine = db.relationship('Machine', backref='exercise', lazy=True)


    
    def __repr__(self):
        return '<Exercise %r>' % self.name

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "time": self.time,
             # do not serialize the password, its a security breach
        }

class Stay(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)  
    from_day = db.Column(db.Integer, unique=False, nullable=False)
    to_day = db.Column(db.Integer, unique=False, nullable=False)
    plans = db.relationship('Plan', secondary=plans, lazy='subquery',
       backref=db.backref('stays', lazy=True))
    
    def __repr__(self):
        return '<Stay %r>' % self.name

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "from_day": self.from_day,
            "from_day":self.to_day
             # do not serialize the password, its a security breach
        }