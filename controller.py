from flask import Blueprint,request,session,abort,make_response,jsonify
 
bp = Blueprint('controller', __name__, url_prefix='/')
 
@bp.route('/main/usercheck',methods=["POST"])
def userCheck():
    if 'user_id' not in session:
        name = 'guest'
    else :
        name = str(session['user_id'])
    response = {
        'name' : name
    }
    return make_response(jsonify(response),200) 
