from flask import (
    Flask,
    render_template,
    request,
    redirect,
    url_for,
    session,
    make_response,
    g,
    jsonify
)
from datetime import timedelta
from flask_sqlalchemy import SQLAlchemy 
from flask_cors import CORS

app = Flask(__name__,static_url_path='/static')

CORS(app) 
app.config.update(
    SECRET_KEY ="woosangyoon1234",
    SESSION_COOKIE_NAME="User_cookie"
)
app.config['SQLALCHEMY_DATABASE_URI']  = 'sqlite:///dcampus.db' 
db = SQLAlchemy(app)
 
class Users(db.Model):
    id = db.Column(db.Integer,primary_key=True) 
    user_id = db.Column(db.String(200),nullable=False)  #db 아이디 정수로
    user_name = db.Column(db.String(200),nullable=False)
    user_passwd = db.Column(db.String(300),nullable=False)
    def __repr__(self):
        return '<Name %r>' % self.user_id

class Clients :
    users = [] 

@app.before_request
def before_request():
    session.permanent = True
    app.permanent_session_lifetime = timedelta(minutes=2)
     
 
        # user_list = [x for x in Clients.users if x.user_id == session['user_id']]
        # if user_list != [] : 
        #     g.user = user_list[0]  # use 에 append 된건 이름,아이디,비번이 넣어진 User 인스턴스임
        #     print("<name:" + g.user.user_name)

@app.route('/main/usercheck',methods=["POST"])
def userCheck():
    if 'user_id' not in session: 
        name = 'guest'
    else :
        name = 'user'
    response = {
        'name' : name
    }
    return make_response(jsonify(response),200) 

@app.route('/')
def root():
    return render_template('index.html')

@app.route('/login',methods=["GET","POST"])
def login():
    if request.method == "POST":
        session.pop('user_id', None) 
        user_id = request.form.get('Id')
        user_passwd = request.form.get('passwd')
        User = Users.query.filter_by(user_id=user_id).first() #Users 클래스 객체로 가져옴
        if User != None : 
            if user_id == User.user_id and user_passwd == User.user_passwd:
                session['user_id'] = User.user_id 
                Clients.users.append(User)
                return redirect(url_for('root'))
        makeAlert ="""<script>alert("로그인 오류")</script>""" 
        return render_template("login.html",makeAlert=makeAlert)
    return render_template('login.html')

@app.route('/project')
def project():
    return render_template('plan.html') 

@app.route('/roadmap')
def roadmap():
    return render_template('roadmap.html') 

@app.route('/main')
def main():
    return render_template('main.html') 


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






    