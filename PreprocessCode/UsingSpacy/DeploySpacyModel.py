# imports and load spacy english language package
import spacy
import io
from spacy import displacy
from spacy import tokenizer
df = pd.read_excel("SampleFile.xlsx")
df = df.astype(str)
df.columns = df.columns.str.lower()
i = len(df.columns)
df2 = df.copy()
df3 = df.copy()
df2 = df2.add_prefix("old ")
#load the model from disk, change the path to wherever the model is being stored
nlp = spacy.load("/content/content/testmodel1")
#loop into the input excel file
for x in range(len(df)):
  for y in range(1, len(df.columns)):
    text = df.loc[x][y]
    doc = nlp(text)
    #create a list to store all the entities detected on each cell while being looped
    entity_list = []
    for ent in doc.ents:
      #print(ent.text)
      entity_list.append(ent.text)
    print(entity_list)
    #replace the old cell data to the detected entities
    df.loc[x][y] = (', '.join(entity_list))
    #displacy.render(doc, style='ent', jupyter=True)

df = df.merge(df2, left_on='key', right_on='old key')
df = df.drop("old key", axis=1)
#output file with each sheet for each column with key and old data
with pd.ExcelWriter('Output.xlsx') as writer:
  for each_column in df.columns:
    if each_column in df3.columns and each_column != "key":
      old_value_column_name = df.columns[i]
      i+=1
      df[["key", each_column, old_value_column_name]].to_excel(writer,f'{each_column}',index=False)