from flask import Flask, request, make_response, render_template,redirect,url_for, jsonify, send_from_directory
import os
from werkzeug.utils import secure_filename 

app = Flask(__name__, template_folder='templates')

@app.route('/', methods=['GET','POST'])
def index():
    if request.method == 'GET':
        return render_template('index.html')
    elif request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
UPLOAD_FOLDER = os.path.join(BASE_DIR, "uploads")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

@app.route('/file_upload', methods=["POST"])
def file_upload():
    file = request.files['file']

    if file.filename == "":
        return "File has not been selected", 400

    filename = secure_filename(file.filename)
    file.save(os.path.join(app.config["UPLOAD_FOLDER"],filename))
    return jsonify({"message":"File has been uploaded"})
       
@app.route('/file_download/<filename>', methods=["GET"])
def file_download(filename):
    return send_from_directory(
        app.config["UPLOAD_FOLDER"],
        filename,
        as_attachment = True
    )

@app.route('/handle_post', methods=["POST"])
def handle_post():
    greeting = request.json['greeting']
    name = request.json['name']

    with open('file.txt','w') as f:
        f.write(f'{greeting}, {name}')

    return jsonify({'message':'Successfully written!'})


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5555, debug=True)