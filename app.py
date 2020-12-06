from flask import (
    Flask,
    render_template,
    request,
    redirect,
    url_for,

)
from flask_sqlalchemy import SQLAlchemy 
app = Flask(__name__)
# ///는 상대경로를 나타내는 것임 데이터 베이스 파일이 sitting 되는  /// 데이터 베이스 이름
 
# Initialize the database
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False # warining message doesn't appear 
# 상대 경로로 app 과 같은 경로상에 놓임 
app.config['SQLALCHEMY_DATABASE_URI']  = 'sqlite:///dcampus.db' 
db = SQLAlchemy(app)
# db 생성
# bash 기준(winpty)  python
# db.create_all()  
# exit() 
# 테이블 확인하는 방법
# sqlite3 db.dcampus 
#Create table in the database 
#db.Model : db 변수에 연결. table 생성 
class Users(db.Model):
    id = db.Column(db.Integer,primary_key=True) 
    user_id = db.Column(db.String(200),nullable=False)  #db 아이디 정수로
    user_name = db.Column(db.String(200),nullable=False)
    user_passwd = db.Column(db.String(300),nullable=False)
    def __repr__(self):
        return '<Name %r>' % self.user_id

@app.route('/')
def root():
    return render_template('index.html')

@app.route('/login',methods=["GET","POST"])
def login():
    if request.method == "POST":
        user_id = request.form.get('Id')
        user_passwd = request.form.get('passwd')
        User = Users.query.filter_by(user_id=user_id).first() #Users 클래스 객체로 가져옴
        if User != None : 
            print("이미 있는 사람임") 
            if user_id == User.user_id and user_passwd == User.user_passwd:
                return redirect(url_for('root'))
        makeAlert ="""<script>alert("로그인 오류")</script>""" 
        return render_template("login.html",makeAlert=makeAlert)
    return render_template('login.html')


# @app.before_request
# def before_request():
#     session.permanent = True
#     app.permanent_session_lifetime = timedelta(minutes=30)
#     g.user = None
#     if 'user_id' in session:
#         user_list = [x for x in User.users if x.id == session['user_id']]
#         if user_list != [] : 
#             g.user = user_list[0]  # use 에 append 된건 이름,아이디,비번이 넣어진 User 인스턴스임
#             print(g.user.id)


#유효성 검사를 통해 사전에 에러 방지할 것
@app.route('/signup',methods=["GET","POST"])
def signup():
    if request.method == "POST":
        user_id = request.form.get('Id')
        user_name = request.form.get('name')
        user_passwd = request.form.get('passwd')
        # db 에 넣기 
        new_user = Users(user_id=user_id,user_name = user_name,user_passwd=user_passwd)
        try :
            db.session.add(new_user)
            db.session.commit()
            return redirect(url_for('signup'))  
        except Exception as e :
            print("error :", e)
        #commit 
        print(user_name)
        print(user_id)
        print(user_passwd)
    users = Users.query.order_by(Users.id) 
    return render_template("sign-up.html",users = users)

@app.route('/update/<int:id>',methods=["POST","GET"])
def update(id):
    user_to_update = Users.query.get_or_404(id)  # id 로 User 객체를 검색
    print(user_to_update.user_name)
    if request.method == "POST" : 
        user_to_update.user_name = request.form['name'] # db 의 해당 사용자의 이름을 새로 입력받은 name 으로 교체
        try : 
            db.session.commit() 
            return redirect('/signup')
        except Exception as e :
            print("error :", e)
    return render_template('update.html',user_to_update = user_to_update)

@app.route('/delete/<int:id>')
def delete(id):
    user_to_delete = Users.query.get_or_404(id)
    try :
        db.session.delete(user_to_delete)
        db.session.commit()
        return redirect('/signup')
    except Exception as e :
            print("error :", e)
            return
 


#Create a function return a string when we add 

#use sqlite3 and sqlalchemy for the database.
# gonna use sequel lite3 database that comes with python fairly trivial to swap out different types of databases 






    