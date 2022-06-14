from flask import Flask
#import your spacy lib and wtv else dep u need

app = Flask(__name__)

# nodejs will be calling this endpoint to use the ner model
@app.route('/api/ner', methods=['GET'])
def index():
    # input excel file, for now just make a folder in the curr dir for ur sample files
    # then use ur model and return json object
    return "Flask server"

if __name__ == "__main__":
    app.run(port=5000, debug=True)