from flask import Flask, request, jsonify
from models import User, Congress, Bcrypt, db, connect_db, bcrypt
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, login_user, login_required, current_user, logout_user

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:toor@localhost:5432/congress_tracker'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = False
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = True
app.config['SECRET_KEY'] = "the-secret"
app.config['CACHE_TYPE'] = "SimpleCache"

API_KEY = 'Tsnxa0oyxxww5iixT1BXaH3KGUUNqpTfCIpRihBm'
db = SQLAlchemy()
connect_db(app)
bcrypt = Bcrypt(app)

login_manager = LoginManager()
login_manager.init_app(app)


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@app.route('/', methods=['POST'])
def base():
    return 201


@app.route('/login', methods=['GET', 'POST'])
def login():

    login_data = request.get_json()

    if request.method == 'POST':
        user = User.query.filter_by(
            username=login_data['username'],
            password=login_data['password']).first()
        login_user(user)
  
        print(user)
        return 'Logged in', 201

    else:
        print(user.errors)
        return 'Invalid credentials', 404

    return 200

@app.route('/logout')
def logout():
    logout_user()
    return 200

@app.route('/create-new-user', methods=["GET", "POST"])
def create_new_user():

    new_user_data = request.get_json()

    if request.method == "POST":
        new_user = User(
            username=new_user_data['username'],
            first_name=new_user_data['firstName'],
            last_name=new_user_data['lastName'],
            email=new_user_data['email'],
            password=new_user_data['password']
        )

        db.session.add(new_user)
        db.session.commit()
        print(new_user)
        return 'New user added', 201
    else:
        print(new_user_data.errors)


@app.route('/profile/<username>', methods=['GET', 'POST'])
@login_required
def profile(username):

    user_data = User.query.all()
    userDetails = []

    for user in user_data:
        userDetails.append({ 'username': user.username, 'first_name': user.first_name, 'last_name': user.last_name, 'email': user.email})

        print(jsonify({ 'userDetails': userDetails }))
        return jsonify({ 'userDetails': userDetails })
    
    else:
        return 404


@app.route('/congress-profile/<id>', methods=['GET', 'POST'])
def follow(id):
    follow_congress = request.get_json()

    if request.method == 'POST':
        congress_follow = Congress(
            id=follow_congress['id'],
            first_name=follow_congress['first_name'],
            last_name=follow_congress['last_name'],
            title=follow_congress.roles['title'],
            party=follow_congress.roles['party'],
            
        )
        db.session.add(congress_follow)
        db.session.commit()
        print(congress_follow)
        return 'Following', 201

    return 200


@app.route('/following', methods=['GET', 'POST'])
def following():

    congress_data = Congress.query.all()
    congressDetails = []

    for congress in congress_data:
        congressDetails.append({ 'id': congress.id })

    print(congress_data)

    print(jsonify({ 'congressDetails': congressDetails }))
    return jsonify({ 'congressDetails': congressDetails })
    

    congress_res = request.get('https://api.propublica.org/congress/v1/members/' + {congress_data} + '.json', 
                    headers = {'X-API-KEY': 'Tsnxa0oyxxww5iixT1BXaH3KGUUNqpTfCIpRihBm',
                                'Content-Type': 'text/plain'})
        

    # print(jsonify(congress_res))
        


if __name__ == "__main__":
    app.run(debug=True)
