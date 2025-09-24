from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from config import Config

db = SQLAlchemy()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    CORS(
        app,
        resources={r"/*": {"origins": "http://localhost:5173"}},
        supports_credentials=True,
        allow_headers=["Content-Type", "Authorization"],
        methods=["GET", "POST", "PATCH", "DELETE", "OPTIONS"]
    )

    db.init_app(app)
    jwt.init_app(app)

    from routes.contact_routes import contact_blueprint
    from routes.user_routes import user_blueprint
    app.register_blueprint(contact_blueprint)
    app.register_blueprint(user_blueprint)

    return app