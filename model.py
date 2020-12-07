from app import db
 

class Users(db.Model):
    id = db.Column(db.Integer,primary_key=True) 
    user_id = db.Column(db.String(200),nullable=False)  #db 아이디 정수로
    user_name = db.Column(db.String(200),nullable=False)
    user_passwd = db.Column(db.String(300),nullable=False)
    def __repr__(self):
        return '<Name %r>' % self.user_id

