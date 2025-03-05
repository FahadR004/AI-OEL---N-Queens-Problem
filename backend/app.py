from flask import Flask
from flask import request, jsonify, make_response
from genetic_alg import genetic_algorithm

app = Flask(__name__)


@app.route("/solution", methods=['POST', 'OPTIONS'])
def solution():
   if request.method == "OPTIONS": # CORS preflight
        return _build_cors_preflight_response()
   elif request.method == "POST":
        data = request.get_json()
        MAX_GENERATIONS = data.get("MAX_GENERATIONS")
        POPULATION_NO = data.get("POPULATION_NO")
        N_QUEENS = data.get("N_QUEENS")  # Where N_QUEENS defines the size of the board
        MUTATION_RATE = data.get("MUTATION_RATE")
        POPULATIONS = data.get("POPULATIONS")

        result = genetic_algorithm(MAX_GENERATIONS, POPULATION_NO, N_QUEENS, MUTATION_RATE, POPULATIONS)
        return _corsify_actual_response(jsonify(result))

# Before the actual cross domain POST request, the browser will issue an OPTIONS request. This response should not return any body, but only some reassuring headers telling the browser that it's alright to do this cross-domain request and it's not part of some cross site scripting attack. From am absolute legend on StackOverflow
def _build_cors_preflight_response():
    response = make_response()
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add('Access-Control-Allow-Headers', "*")
    response.headers.add('Access-Control-Allow-Methods', "*")
    return response

def _corsify_actual_response(response):
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

app.run(debug=True)


# @app.route("/") # Check if the server is working!
# def home():
#    return "Hello World!"