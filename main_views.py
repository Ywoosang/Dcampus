from flask import Blueprint,render_template,request,session,redirect,url_for,abort,make_response,jsonify
from  model import Users,Project,Link,Tag
from  app import db
from sqlalchemy import and_


bp = Blueprint('views', __name__, url_prefix='/')

@bp.route('/')
def root():
    users = Users.query.order_by(Users.id) 
    return render_template('index.html',users = users)




 
@bp.route('/login',methods=["GET","POST"])
@bp.route('/login/<makeAlert>',methods=["GET","POST"])
def login(makeAlert=None):
    if request.method == "POST":
        session.pop('user_id', None) 
        user_id = request.form.get('Id')
        user_passwd = request.form.get('passwd')
        User = Users.query.filter_by(user_id=user_id).first() #Users 클래스 객체로 가져옴
        if User != None : 
            if user_id == User.user_id and user_passwd == User.user_passwd:
                session['user_id'] = User.user_id
                return redirect(url_for('views.root'))
        makeAlert ="""<script>alert("로그인 오류")</script>"""
        return render_template("login.html",makeAlert=makeAlert)
    return render_template('login.html',makeAlert=makeAlert)

@bp.route('/project')
def project():
    if 'user_id' not in session:
        return abort(403)
    return render_template('plan.html') 

@bp.route('/roadmap')
def roadmap():
    if 'user_id' not in session:
        return abort(403)
    return render_template('roadmap.html') 

@bp.route('/pose')
def pose():
    if 'user_id' not in session:
        makeAlert ="""<script>alert("로그인 해주세요")</script>"""
        return render_template('login.html',makeAlert=makeAlert)
    return render_template('poseChecker.html') 

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
        except Exception as e :
            print("error :", e) 
            return redirect(url_for('views.signup'))  
        user_project = Project(user_id=user_id,content='') 
        try : 
            db.session.add(user_project)
            db.session.commit()  
        except Exception as e :
            print("error :", e)  
            return redirect(url_for('views.signup'))
       
        user_tag = Tag(user_id =user_id,tag_id='') 
        try :
            db.session.add(user_tag)
            db.session.commit()
            return redirect(url_for('views.login')) 
        except Exception as e :
            print("error :", e)
            makeAlert ="""<script>alert("환영합니다 회원님")</script>"""
            return redirect(url_for('views.signup',makeAlert=makeAlert))
    return render_template("signup.html")

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

@bp.route('/insert/roadmap/items',methods=["POST"])
def addItems():
    req = request.get_json()
    print(req)
    items = str(req['items'])
    print(items)
    try:
        user_id= session['user_id'] 
    except :
        print('error')
        pass
    print(user_id)
    try : 
        Tag_to_update = Tag.query.filter_by(user_id=user_id).first()
        Tag_to_update.tag_id = items 
        db.session.commit() 
    except Exception as e :
        print("error :", e)
        pass
    return make_response(jsonify('execute'),200)
    
@bp.route('/delete/roadmap/items',methods=['POST'])
def deleteItems():
    req = request.get_json()
    print(req)
    items = str(req['items'])
    print(items)
    try:
        user_id= session['user_id'] 
    except : 
        print('error') 
        pass 
    try : 
        Tag_to_update = Tag.query.filter_by(user_id=user_id).first()
        print(Tag_to_update)
        Tag_to_update.tag_id = items 
        db.session.commit() 
    except Exception as e :
        print("error :", e)
        pass

    return make_response(jsonify('execute'),200)
   
    

@bp.route('/get/roadmap/items',methods=["POST"])
def getItems():
    try:
        user_id= session['user_id'] 
        print(user_id)
    except :
        print('error') 
        pass 
    try :
        item = Tag.query.filter_by(user_id=user_id).first()
        Tag_to_get = item.tag_id 
    except Exception as e:
        print("error :", e)
        pass
    response = Tag_to_get
    return make_response(jsonify(response),200) 


@bp.route('/insert/link',methods=["POST"]) 
def addlinks():
    req = request.get_json()
    link_name = req['name']
    link_content = req['content']
    try:
        user_id= session['user_id'] 
    except :
        print('error')
        pass
    user_link = Link(user_id=user_id,link_name=link_name,link_content=link_content) 
    try: 
        db.session.add(user_link)
        db.session.commit()
    except Exception as e :
        print("error :", e)
        pass 
    return make_response(jsonify('execute'),200)


@bp.route('/delete/link',methods=["POST"]) 
def deletelinks(): 
    req = request.get_json()
    link_name = req['name']
    link_content = req['content']
    try:
        user_id= session['user_id'] 
    except :
        print('error')
        pass
    user_links = Link.query.filter_by(user_id=user_id).all() #인스턴스를 전부 가져옴
    for link in user_links :
        if link.link_name == link_name and link.link_content == link_content : 
            db.session.delete(link) 
            db.session.commit() 
    return make_response(jsonify('execute'),200)

@bp.route('/get/links',methods=["POST"]) 
def getlinks():
    try:
        user_id= session['user_id'] 
    except :
        print('error')
        pass
    response = {}
    try : 
        user_links = Link.query.filter_by(user_id=user_id).all() #인스턴스를 전부 가져옴
        print(user_links)
        for link in user_links :
            response[link.link_name] = link.link_content 
    except :
        print('링크 아직 없음')
        return make_response(jsonify('execute'),200)
    return make_response(jsonify(response),200) 
     
@bp.route('/links')
def linkPage():
    if 'user_id' not in session:
        return abort(403)
    return render_template('link.html') 

     



