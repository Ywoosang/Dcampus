from flask import (
    Flask,
    render_template,
    request,
    redirect,
    url_for,
    session,
    make_response,
    g,
    jsonify,
    abort,
    blueprints 
)
from datetime import timedelta
from flask_sqlalchemy import SQLAlchemy 
from flask_cors import CORS
   
db = SQLAlchemy()

def create_app():
    app = Flask(__name__,static_url_path='/static') 
    CORS(app)
    db.init_app(app) 
    app.config.update(
        SECRET_KEY ="woosangyoon1234",
        SESSION_COOKIE_NAME="User_cookie"
    )
    app.config['SQLALCHEMY_DATABASE_URI']  = 'sqlite:///dcampus.db' 
    from  model import Users
    import controller
    import main_views 
    
    @app.before_request
    def beforerequest():
        session.permanent = True
        app.permanent_session_lifetime = timedelta(minutes=20)
        try :
            print(session['user_id'])
        except:
            print('session is not created')
            pass
    
    
    @app.context_processor
    def context_processor():
        try : 
            User = Users.query.filter_by(user_id = session['user_id']).first()
            username = User.user_name
        except :
            username = ''
            pass 
        return dict(key='value',username=username) 

    app.register_blueprint(controller.bp) 
    app.register_blueprint(main_views.bp)

    return app
 

app = create_app() 


#Create a function return a string when we add 

#use sqlite3 and sqlalchemy for the database.
# gonna use sequel lite3 database that comes with python fairly trivial to swap out different types of databases 
