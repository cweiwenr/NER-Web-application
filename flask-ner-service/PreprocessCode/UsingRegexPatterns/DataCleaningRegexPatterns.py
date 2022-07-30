"""
**Note: This file consist of codes for regular expressions using Python to  
perform data cleaning on the raw data obtained from the uploaded excel file. 
As mentioned during the ITP Progress Update Client Meeting on 13/06/2022, 
this approach of using Regex will be discontinued.**

"""

"""## Import Packages"""
import pandas as pd
import spacy
import re
import os
import io
import string
from spacy import displacy



from google.colab import files
uploaded = files.upload()

filename = next(iter(uploaded))
print(filename)

# Load dataset from excel
xlsx = pd.ExcelFile("Sample File.xlsx")
data = pd.read_excel(xlsx, 'Sample1')

# Summary of raw dataset
data.info()

data.head()

"""## Data Cleaning"""

# Remove Unnecessary 'Unnamed' Columns
data = data[data.columns.drop(list(data.filter(regex='Unnamed')))]

# Drop All Rows with any Null/NaN/NaT Value
data = data.dropna()
data.info()

"""## Data Mining"""

services = data["Service Name"].tolist()
specifications = data["Specification"].tolist()
accreditations = data["Accreditation"].tolist()
print(specifications[:10])

# Creating Individual Dataframes
df_names = []
for col in data.columns:
    if col != 'Key':
        refined_col = str(col).replace(" ", "_").lower()
        df_names.append('df_' + refined_col) 
    
print(df_names)

!pip install -U spacy
!python -m spacy download en_core_web_lg
import spacy
nlp = spacy.load("en_core_web_lg")

from spacy.pipeline import EntityRuler
config = {
   "phrase_matcher_attr": None,
   "validate": True,
   "overwrite_ents": False,
   "ent_id_sep": "||",
}

# Creating Entity Ruler
ruler = nlp.add_pipe("entity_ruler", config=config)

patterns = []
for service in services:
  patterns.append({"label": "SERVICE", "pattern": service}) 
  new_string = re.sub(r"\([^()]*\)", "", str(service))
  patterns.append({"label": "SERVICE", "pattern": new_string})
for specification in specifications:
  patterns.append({"label": "SPECIFICATION", "pattern": specification}) 
  pattern1 = pattern = r'(((ASTM|SAE|ISO|AWS|API|NORSOK))[A-Z]?(\d){1,6})'
  new_string = re.findall(pattern1, str(specification))
  patterns.append({"label": "SPECIFICATION", "pattern": new_string})
for accreditation in accreditations:
  patterns.append({"label": "ACCREDITATION", "pattern": accreditation}) 
# Add all customized patterns to the entity ruler
ruler.add_patterns(patterns)


text = ''' 
	ISO 365-1, ASTM A262 Practice A (Oxalic Acid Test), ASTM A262 Practice B (Streicher Test), ASTM A262 Practice C (Huey Test), ASTM A262 Practice E (Strauss Test), ASTM A262 Practice F, ASTM G28; ISO 3651
  Chemical Analysis - Optical Emission Spectroscopy (OES), X-ray fluorescence (XRF), Spectral analysis, on-site Positive Material Identification (PMI)
  ISO 148, ISO 9016, API 1107, ISO 9606,ASTM E1077, SAE J422, ISO 26146 ,NORSOK M501
'''

doc = nlp(text)
for ent in doc.ents:
  print(ent.text, ent.label_)
displacy.render(doc, style='ent', jupyter=True)

final_spec_list = []

def split_spec_with_semicolon(slist):
  splitted_spec = []

  for a in slist:
    word = re.split(",", str(a))
    for i in word:
      b = i.strip()
      splitted_spec.append(b.strip())

  return splitted_spec

specListResult1 = split_spec_with_semicolon(specifications)

specListResult1

def split_spec_with_semicolon1(slist):
  splitted_spec = []

  for a in slist:
    word = re.split(";", str(a))
    for i in word:
      b = i.strip()
      splitted_spec.append(b.strip())

  return splitted_spec

specListResult3 = split_spec_with_semicolon1(specListResult1)

textfile = open("output.txt", "w")
for element in specListResult3:
  textfile. write(element + "\n")
textfile. close()

# Split with comma

# Split with /

def match_spec_with_decimal(slist):
  decimal_list = []

  for i in slist:
    # spit by semicolon
    regex_decimal =  re.compile(r"(((ASTM|SAE|ISO|AWS|API|NEN-EN|EN|CSA|AAMA) )[A-Z]?(\d){1,6}((\.)).*?(\d){1,6})")
    x = regex_decimal.search(str(i))
    # print(x)
    # if len(x) != 0:
    if x is not None:
      decimal_list.append(x.group(1))
      # for spec in x:
      #   print(spec)
      # # spec_list.append(x)
  # spec_list
  return decimal_list

specListResult2 = match_spec_with_decimal(specListResult1)

specListResult2

# for loop - remove duplicates in a list
my_finallist = [i for j, i in enumerate(specListResult2) if i not in specListResult2[:j]] 
my_finallist

# Capture specification with dash and decimal: ASTM E112-99, NEN-EN 10045-1
pattern2 = r"(((ASTM|SAE|ISO|AWS|API|NEN-EN|EN|CSA) )[A-Z]?(\d){1,6}((\.)).*?(\d){1,6})|((((AWS|NEN-EN|EN|ASME|CSA|WDMA) )[A-Z]?(\d){1,6}(-).*?(\d){1,6}))"

old = r"(((ASTM|SAE|ISO|AWS|API|NEN-EN) )[A-Z]?(\d){1,6}-.*?(\d){1,6})"

#text_after = re.sub(regex_search_term, regex_replacement, text_before)

s = 'A, 2, 4, 5| C, B. 7u7, C D'
regex_replacement = '_sep_'

text_after = re.sub(',', regex_replacement, s)
print(text_after)

l = re.split(regex_replacement, text_after)
print(l)

# Export clean data
df1.to_excel("cleaned_data.xlsx", index=False, header=True)