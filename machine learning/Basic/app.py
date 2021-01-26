from flask import Flask,  jsonify
import pickle
from flask import request
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 

#loading model
model = pickle.load(open("model.pkl","rb"))

@app.route("/machine-learning", methods=["POST"])
def hello():
    print(request.form)
    req = request.form.to_dict()
    print(req)
    x = [list(req.values())]
    prediction = model.predict(x)
    return jsonify({'prediction': list(prediction)})

if __name__ == '__main__':
    app.run(debug=True)