from flask import Flask,render_template

app = Flask(__name__)

@app.route('/')
def test():
    return render_template('index.html') 

@app.route('/test')
def test2():
    return "취침" 