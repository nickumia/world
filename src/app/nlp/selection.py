from flask import url_for


def getSelection():

    return [
        {
            'key':      0,
            'liason':   'Parry',
            'speech':   'Pleasure to be acquainted!',
            'intro':    'Connecting machines to world, getting them to use their "senses", learning about how the world works, what reality means and the practicality of existence […]',  # NOQA
            'domain':   'Processing',
            'link':     url_for('nlp.processing')
        },
        {
            'key':      1,
            'liason':   'Lalita',
            'speech':   '**squints eyes as she turns to do something**',
            'intro':    'Understanding how language is shaped by our cultures, beliefs, values, bonds, relations […]',  # NOQA
            'domain':   'Language',
            'link':     url_for('nlp.language')
        },
        {
            'key':      2,
            'liason':   'Nick',
            'speech':   'Welcome, I hope you find yourself at home.',
            'intro':    'Developing a model for the mind and soul. How we process and make sense of all of the data given our experience, knowledge […]',  # NOQA
            'domain':   'Natural Core',
            'link':     url_for('nlp.natural')
        }
    ]
