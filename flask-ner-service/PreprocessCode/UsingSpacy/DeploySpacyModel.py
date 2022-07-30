# imports and load spacy english language package
import spacy
import io
from spacy import displacy
from spacy import tokenizer
import pandas as pd
import csv
import glob
import os
import xlsxwriter
import json


dir_path = r"C:\Users\Jevan\Desktop\itpWithDB\SITElements\app\client\public\uploads"
res = []

for path in os.listdir(dir_path):
  if os.path.isfile(os.path.join(dir_path, path)):
    res.append(path)

incomingXLSX = res[0]

data_dict = {}


df = pd.read_excel("C:\\Users\Jevan\Desktop\\itpWithDB\SITElements\\app\client\\public\\uploads\\" + incomingXLSX)
df = df.astype(str)
df.columns = df.columns.str.lower()
i = len(df.columns)
df2 = df.copy()
df3 = df.copy()
#df2 = df2.add_prefix("C:\\Users\\Jevan\\Desktop\\itpProj\\SITElements\\app\\client\\public\\uploads\\" + incomingXLSX)
df2 = df2.add_prefix("old ")
#load the model from disk, change the path to wherever the model is being stored
nlp = spacy.load("C:\\Users\\Jevan\\Desktop\\itpWithDB\SITElements\\flask-ner-service\\PreprocessCode\\UsingSpacy\\model2")

#Counter and Index to manipulate list
counter = 0
index = 0

#Store all values into an array
global_list = []

#loop into the input excel file

#Loop through every row
for x in range(len(df)):
  data_dict = {}
  #Column
  for y in range(1, len(df.columns)):
    #x = row, y = column
    text = df.loc[x][y]
    doc = nlp(text)
    #create a list to store all the entities detected on each cell while being looped
    entity_list = []
    for ent in doc.ents:
      print(ent.text)
      print("label:", ent.label)
      entity_list.append(ent.text)
      #print(entity_list)

      #For configuring JSON
      global_list.append(ent.text)

    #replace the old cell data to the detected entities
    df.loc[x][y] = ('; '.join(entity_list))
    #displacy.render(doc, style='ent', jupyter=True)

df = df.merge(df2, left_on='key', right_on='old key')
df = df.drop("old key", axis=1)
#output file with each sheet for each column with key and old data

dict_list = []

#Change to ur own directory
outputPath = "C:\\Users\\Jevan\\Desktop\\itpWithDB\\SITElements\\app\\client\\public\\downloads\\output.xlsx"
with pd.ExcelWriter(outputPath, engine='xlsxwriter') as writer:
  for each_column in df.columns:
    if each_column in df3.columns and each_column != "key":
      old_value_column_name = df.columns[i]
      i+=1
      df[["key", each_column, old_value_column_name]].to_excel(writer,f'{each_column}',index=False)
  writer.save()
  print("XLSX FILE HAS BEEN UPDATED!!!!")














