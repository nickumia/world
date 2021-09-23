from flask import render_template
from app import app

@app.route('/')
@app.route('/index')
def index():
    intros = [
        {
            'liason': 'Perry',
            'speech': 'Pleasure to be acquainted!'
        },
        {
            'liason': 'Lalita',
            'speech': '**squints eyes as she turns to do something**'
        },
        {
            'liason': 'Nick',
            'speech': 'Welcome, I hope you find yourself at home.'
        }
    ]
    return render_template('index.html', section='Home', intros=intros)
