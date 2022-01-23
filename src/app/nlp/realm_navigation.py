# Parry, Lalita and Nick Welcome Pages
import json


processing_json = [
    {"key": "Syntax App",
     "link": "/nlp/syntax",
     },
    # {"key": "Semantics",
    #  "link": "/nlp/semantics",
    #  },
    # {"key": "Pragmatics",
    #  "link": "/nlp/pragmatics",
    #  },
    # {"key": "Phonetics",
    #  "link": "/nlp/phonetics",
    #  },
    # {"key": "Phonology",
    #  "link": "/nlp/phonology",
    #  },
    # {"key": "Morphology",
    #  "link": "/nlp/morphology",
    #  },
    # {"key": "Real-World Objects",
    #  "link": "/nlp/objects",
    #  },
    # {"key": "Reference Clues",
    #  "link": "/nlp/reference_clues",
    #  },
    # {"key": "Object Definitions/Relations",
    #  "link": "/nlp/objects_definition",
    #  },
]

language_json = [
    {"key": "Applications Coming Soon!",
     "link": "/nlp/language",
     },
]
natural_json = [
    {"key": "Applications Coming Soon!",
     "link": "/nlp/natural",
     },
]

parry_navbar = json.dumps(processing_json)
lalita_navbar = json.dumps(language_json)
nick_navbar = json.dumps(natural_json)
