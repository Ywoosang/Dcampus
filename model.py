from app import db
from datetime import datetime

class Users(db.Model):
    id = db.Column(db.Integer,primary_key=True) 
    user_id = db.Column(db.String(200),nullable=False)  #db 아이디 정수로
    user_name = db.Column(db.String(200),nullable=False)
    user_passwd = db.Column(db.String(300),nullable=False)
    def __repr__(self):
        return '<Name %r>' % self.user_id

class Project(db.Model):
    id = db.Column(db.Integer,primary_key=True) 
    user_id = db.Column(db.String(200),nullable=False) 
    content = db.Column(db.Text(),nullable=True) 
   
class Link(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    user_id = db.Column(db.String(200),nullable=False)
    link_name = db.Column(db.Text(),nullable=False)
    link_content = db.Column(db.Text(),nullable=False)

class Tag(db.Model):
    id = db.Column(db.Integer,primary_key =True)
    user_id = db.Column(db.String(200),nullable=False)
    tag_id = db.Column(db.Text(),nullable=False)

