from blueprintapp.app import db

class Person(db.Model):
    __tablename__ = 'people'

    person_id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable=False)
    age = db.Column(db.String)
    job = db.Column(db.String)

    def __repr__(self):
        return f"<PERSON Name: {self.name}, Age: {self.age}, Job: {self.job}>"
    
    def get_id(self):
        return self.person_id