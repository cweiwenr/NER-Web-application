import spacy
from spacy.scorer import Scorer
from spacy.training.example import Example
#training data to be added
TRAIN_DATA = []

#change to the path of the Spacy model is placed
nlp = spacy.load("/content/testmodel2")
examples = []
scorer = Scorer()
for text, annotations in TRAIN_DATA:
    doc = nlp.make_doc(text)
    example = Example.from_dict(doc, annotations)
    example.predicted = nlp(str(example.predicted))
    examples.append(example)
scorer.score(examples)