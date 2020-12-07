from flask import Blueprint,render_template,request,session,redirect,url_for,abort
from  model import Users
from  app import db


bp = Blueprint('views', __name__, url_prefix='/')

@bp.route('/')
def root():
    users = Users.query.order_by(Users.id) 
    return render_template('index.html',users = users)

@bp.route('/login',methods=["GET","POST"])
def login():
    if request.method == "POST":
        session.pop('user_name', None) 
        user_id = request.form.get('Id')
        user_passwd = request.form.get('passwd')
        User = Users.query.filter_by(user_id=user_id).first() #Users 클래스 객체로 가져옴
        if User != None : 
            if user_id == User.user_id and user_passwd == User.user_passwd:

                session['user_name'] = User.user_name
                return redirect(url_for('views.root'))
        makeAlert ="""<script>alert("로그인 오류")</script>"""
        return render_template("login.html",makeAlert=makeAlert)
    return render_template('login.html')

@bp.route('/project')
def project():
    if 'user_name' not in session:
        return abort(403)
    return render_template('plan.html') 

@bp.route('/roadmap')
def roadmap():
    if 'user_name' not in session:
        return abort(403)
    return render_template('roadmap.html') 

@bp.route('/main')
def main(): 
    return render_template('main.html') 


#유효성 검사를 통해 사전에 에러 방지할 것
@bp.route('/signup',methods=["GET","POST"])
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
            return redirect(url_for('views.login'))  
        except Exception as e :
            print("error :", e)
    return render_template("sign-up.html")

@bp.route('/update/<int:id>',methods=["POST","GET"])
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

@bp.route('/delete/<int:id>')
def delete(id):
    user_to_delete = Users.query.get_or_404(id)
    try :
        db.session.delete(user_to_delete)
        db.session.commit()
        return redirect('/')
    except Exception as e :
            print("error :", e)
            return 