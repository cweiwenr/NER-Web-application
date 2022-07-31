from flask import Flask, request, redirect
from flask_restful import Api, Resource
import time
import os
import subprocess
import xlsxwriter
import json
import pandas as pd
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
            time.sleep(5)
            """
            with open('../app/client/public/downloads/text.xlsx', 'w') as f:
                f.write('new file')
            """
            # run NER model to process the csv uploaded in uploads directory
            subprocess.check_call(["python", r'C:\Users\Jevan\Desktop\itpWithDB\SITElements\flask-ner-service\PreprocessCode\UsingSpacy\DeploySpacyModel.py'])
            print("NER successfully called....")

            # get JSON object
            xls = pd.ExcelFile("C:\\Users\\Jevan\\Desktop\\itpWithDB\\SITElements\\app\\client\\public\\downloads\\output.xlsx")
            s1 = pd.read_excel(xls, 'service name')
            s2 = pd.read_excel(xls, 'specification')
            s3 = pd.read_excel(xls, 'accreditation')

            s1Length = len(s1)
            s2Length = len(s2)
            s3Length = len(s3)
            print('length of service name', s1Length)
            print('length of specification', s2Length)
            print('length of accreditation', s3Length)

            dataJSON = {}
            dataDict = {}
            dict_list = []


            # To ensure that all sheets in the output have the same number of rows.
            if (s1Length == s2Length and s2Length == s3Length):
                print("XLSX Sheets have the same length!")
            for i in range(s1Length):
                # Save the results
                serviceName = s1['service name'][i]
                specification = s2['specification'][i]
                accreditation = s3['accreditation'][i]

                # This condition is to check for empty cells and NaN to change it into "N/A" to fit the DB
                if type(specification) != str or type(specification) == float:
                    specification = "N/A"

                if type(accreditation) != str or type(specification) == float:
                    accreditation = "N/A"

                specAndAccred = [specification, accreditation]
                data_dict = {'category': serviceName, 'data': specAndAccred}
                dict_list.append(data_dict)

            dataJSON['data'] = dict_list

            return dataJSON
            #return {"data":[{"category":'specification', "data": ["lolv2","test1"]}, {"category":"accredition", "data": ["idkv2"]}]}

api.add_resource(Home, "/")
api.add_resource(NER, "/api/ner")

if __name__ == "__main__":
    app.run(port=5000, debug=True)