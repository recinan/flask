from flask import Flask, request, make_response, render_template,redirect,url_for

app = Flask(__name__, template_folder='templates')

@app.route('/')
def index():
    myValue = 'NeuralNine'
    myresult = 10 + 20
    myList = [10,20,30,40,50]
    return render_template('index.html', myList=myList)

@app.route('/other')
def other():
    return render_template('other.html')

@app.route('/filter-example')
def filter_example():
    some_text = 'Hello World'
    return render_template('filters.html', some_text=some_text)

@app.route('/redirect_endpoint')
def redirect_endpoint():
    return redirect(url_for('other'))

@app.template_filter('reverse_string')
def reverse_string(s):
    return s[::-1]

@app.template_filter('repeat')
def repeat(s, times=2):
    return s*times

@app.template_filter('alternate_cases')
def alternate_case(s):
    return ''.join([c.upper() if i % 2 == 0 else c.lower() for i, c in enumerate(s)])

@app.route('/hello')
def hello():
    response = make_response('Hello World\n')
    response.status_code = 202
    response.headers['content-type'] = 'text/plain'
    return response

@app.route('/greet/<name>')
def greet(name):
    return f"Hello {name}"

@app.route('/add/<int:number1>/<int:number2>')
def add(number1, number2):
    return f'{number1} + {number2} = {number1 + number2}'

@app.route('/handle_url_params')
def handle_params():
    if 'greeting' in request.args.keys() and 'name' in request.args.keys():
        greeting = request.args['greeting']
        name = request.args.get('name')
        return f'{greeting}, {name}'
    else:
        return 'Some parameters are missing!!'

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5555, debug=True)