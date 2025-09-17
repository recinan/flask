from config import create_app, db
from routes.contact_routes import contact_blueprint

app = create_app()
app.register_blueprint(contact_blueprint)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)