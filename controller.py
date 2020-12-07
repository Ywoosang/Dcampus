from flask import Blueprint,request,session,abort,make_response,jsonify
 
bp = Blueprint('controller', __name__, url_prefix='/')
 
@bp.route('/main/usercheck',methods=["POST"])
def userCheck():
    print("데이터 보내짐")
    if 'user_name' not in session:
        name = 'guest'
    else :
        name = str(session['user_name'])
    response = {
        'name' : name
    }
    return make_response(jsonify(response),200) 
