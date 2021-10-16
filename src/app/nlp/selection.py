from flask import url_for


def getSelection():

    return [
        {
            'key'   : 0,
            'liason': 'Perry',
            'speech': 'Pleasure to be acquainted!',
            'domain': 'Processing',
            'link'  : url_for('nlp.processing')
        },
        {
            'key'   : 1,
            'liason': 'Lalita',
            'speech': '**squints eyes as she turns to do something**',
            'domain': 'Language',
            'link'  : url_for('nlp.language')
        },
        {
            'key'   : 2,
            'liason': 'Nick',
            'speech': 'Welcome, I hope you find yourself at home.',
            'domain': 'Natural Core',
            'link'  : url_for('nlp.natural')
        }
    ]
