from flask import Flask, request, redirect
from flask_restful import Api, Resource
import os
#import your spacy lib and wtv else dep u need

app = Flask(__name__)
api = Api(app)

class Home(Resource):
    def get(self):
        return {"data" : "This is a flask microservice to host the NER model. This is not meant to be used as a web application."}

class NER(Resource):
    def get(self):
        if len(os.listdir('../app/client/public/uploads/')) == 0:
            return {"data": "no files to process"}
        else:
            # use ner model for each file in folder
            # output the extracted entity excel files into ../app/client/public/downloads/
            return {"data":[{"category":"specification", "data": ["lolv2"]}, {"category":"accredition", "data": ["idkv2"]}]}

api.add_resource(Home, "/")
api.add_resource(NER, "/api/ner")

if __name__ == "__main__":
    app.run(port=5000, debug=True)