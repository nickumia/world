

opening = ("As with most of the concepts described here, syntax and grammar "
           "have intensely debated meanings.  I will define these areas as the"
           " building blocks to language.  It defines the constructs for "
           "operating within a given language and it creates the environment "
           "where you and I can communicate very basic ideas such as these "
           "sentences.\nPlease note: This page is specifically the textual "
           "implementation of the smallest units of structure.  Speech has "
           "it's own units of structure.  Vision has it's own as well.  Every "
           "input method (or area of sensing) will define it's own "
           "compositional elements.")

structure = ("The tiniest unit of 'Basic Text' are __characters__.  "
             "Depending on the computer encoding, that can range from a very "
             "limited selection, such as ASCII (256 chars), to the more "
             "robust UTF-8 (or UTF-16) encoding which represents upwards of "
             "1,112,064 characters.\nThe next level of structure builds the "
             "idea of __words__.  A word is any combination of characters "
             "that is not whitespace.  There are quite a bit of complexities "
             "that arise from this definition.  To name a few,")

structure2 = [
    {"key": 1, "value": (" A period (.) can be used as an abbreviation marker "
                         "or a punctuation marker.  As an abbreviation marker "
                         "(as in 'vs.' or 'cont.'), it is directly tied to "
                         "the word itself.  As a punctuation marker, it is not"
                         " actually a part of the word, but a separator to "
                         "mark the next level of __sentences__.")},
    {"key": 2, "value": ("Special characters can end up in __words__, such as "
                         "(AT&T, T-Mobile, Chips Ahoy!, 5,000, 2K, ...) ")},
    {"key": 3, "value": (" Proper names can represent one \"__word__\" with "
                         "spaces, such as (Supreme Court, Walt Disney, United "
                         "States, ...)\n In any case, each space-separated "
                         "__word__ has it's own meaning.  'United' is valid.  "
                         "'States' is valid.  The unification falls more into "
                         "the realm of semantics and pragmatics.")}
]

structure3 = ("In any case, each space-separated __word__ has it's own "
              "meaning.  'United' is valid.  'States' is valid.  The unifi"
              "cation falls more into the realm of semantics and pragmatics."
              "For all intents and purposes, spaces are the accepted separator"
              " for words in a text-based setting.  When considering other "
              "applications, such as data processing, commas might be a more "
              "important separator, as with CSVs.\nAs aforementioned, "
              "__sentences__ are the next class of unit.  There are a few "
              "classifications that fall into here, including normal period-"
              "terminated sentences, exclamations(!) and questions(?).\n\n"
              "Beyond this, there are other constructs, namely paragraphs, "
              "essays, documents, books, ...  However, these become highly "
              "specialized and add very little value beyond 'a group of "
              "__sentences__'.  As a neat formula, text can be expressed as "
              "the following relationship:\nText = Group(Sentence(Word(Char)))"
              "\n\twhere __Group__ is a combination of 'n'  __sentences__"
              "\n\tand __Sentence__ is a combination of 'n'  __words__"
              "\n\tand __Word__ is a combination of 'n'  __chars__\n")

syntax_content = {
    "opening": opening,
    "definition": {
        "start": structure,
        "middle": structure2,
        "end": structure3
    }
}

syn_body = opening + " " + structure + " " + structure3
syn_body += " ".join([i['value'] for i in structure2])
