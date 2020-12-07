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
    
    import main_views
    import controller 

    @app.before_request
    def beforerequest():
        session.permanent = True
        app.permanent_session_lifetime = timedelta(minutes=2)
        try :
            print(session['user_name'])
        except:
            print('session is not created')
            pass

    @app.context_processor
    def context_processor():
        try : 
            username = session['user_name'] 
        except :
            username = ''
            pass 
        return dict(key='value',username=username) 

    app.register_blueprint(controller.bp) 
    app.register_blueprint(main_views.bp)

    return app
 




#Create a function return a string when we add 

#use sqlite3 and sqlalchemy for the database.
# gonna use sequel lite3 database that comes with python fairly trivial to swap out different types of databases 
