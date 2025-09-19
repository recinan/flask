from flask import Flask, render_template, session, make_response, request, flash
import os

app = Flask(__name__, template_folder='templates')
app.secret_key = 'SOME KEY'

@app.route('/')
def index():
    return render_template('index.html',message = 'Index')

@app.route('/set_data')
def set_data():
    session['name'] = 'Mike'
    session['other'] = 'Hello WOrld'
    return render_template('index.html', message = 'Session data set.')

@app.route('/get_data')
def get_data():
    if 'name' in session.keys() and 'other' in session.keys():
        name = session.get('name')
        other = session.get('other')
        return render_template('index.html', message=f'name: {name}, other: {other}')
    else:
        return render_template('index.html', message=f'No session found.')

@app.route('/clear_session')
def clear_session():
    session.clear()
    return render_template('index.html')

@app.route('/set_cookie')
def set_cookie():
    response = make_response(render_template('index.html', message='Cookie Set.'))
    response.set_cookie('cookie_name','cookie_value')
    return response

@app.route('/get_cookie')
def get_cookie():
    if 'cookie_name' in request.cookies.keys():
        cookie_value = request.cookies['cookie_name']
        return render_template('index.html',message=f'Cookie Value: {cookie_value}')
    else:
        return render_template('index.html', message='No cookies found.')

@app.route('/remove_cookie')
def remove_cookie():
    response = make_response(render_template('index.html', message='Cookie removed.'))
    response.set_cookie('cookie_name', expires=0)
    return response

@app.route('/login', methods=['GET','POST'])
def login():
    if request.method == 'GET':
        return render_template('login.html')
    elif request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        if username == 'Mike' and password == '12345':
            flash('Successfully logged in.')
            return render_template('index.html', message='')
        else:
            flash('Check username or password.')
            return render_template('index.html', message='')

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5555, debug=True)