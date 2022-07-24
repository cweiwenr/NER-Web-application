# imports and load spacy english language package
import spacy
from spacy import displacy
from spacy import tokenizer
import random
from spacy.util import minibatch, compounding
from pathlib import Path
# load blank spacy model
nlp = spacy.blank('en')
nlp.add_pipe(nlp.create_pipe('ner'))
nlp.begin_training()
ner=nlp.get_pipe("ner")
# add the labels you want the model to be able to detect
ner.add_label("Services")
ner.add_label("Specification")
ner.add_label("Accreditation")
# Disable pipeline components you dont need to change
pipe_exceptions = ["ner", "trf_wordpiecer", "trf_tok2vec"]
unaffected_pipes = [pipe for pipe in nlp.pipe_names if pipe not in pipe_exceptions]
# sample data to train the model
TRAIN_DATA = [
              ("Chemical Analysis is one of our services", {"entities": [(0, 17, "Services")]}),
              ("Salt Spray Testing is also provided", {"entities": [(0, 18, "Services")]}),
              ("Chemical Analysis - Optical Emission Spectroscopy (OES), X-ray fluorescence (XRF), Spectral analysis, on-site Positive Material Identification (PMI)",
               {"entities": [(0, 17, "Services")]}),
              ("Salt Spray Testing - Copper Accelerated Acetic Acid-Salt Spray (CASS)", {"entities": [(0, 18, "Services")]}),
              ("Salt Spray Testing (Hydrogen Induced Cracking)", {"entities": [(0, 18, "Services")]}),
              ("ASTM G85-11 A3", {"entities": [(0, 14, "Specification")]}),
              ("DIN EN ISO 3651-1, ASTM A262", {"entities": [(0, 17, "Specification"), (20, 30, "Specification")]})
              ]
			  
# start training the model
with nlp.disable_pipes(*unaffected_pipes):

  # Training for 30 iterations
  for iteration in range(30):

    # shuufling examples  before every iteration
    random.shuffle(TRAIN_DATA)
    losses = {}
    # batch up the examples using spaCy's minibatch
    batches = minibatch(TRAIN_DATA, size=compounding(4.0, 32.0, 1.001))
    for batch in batches:
        texts, annotations = zip(*batch)
        nlp.update(
                    texts,  # batch of texts
                    annotations,  # batch of annotations
                    drop=0.5,  # dropout - make it harder to memorise data
                    losses=losses,
                )
        print("Losses", losses)
		
#save the model to disk
nlp.to_disk("/content/ner/testmodel1")