import json
import time
from datetime import datetime

from flask import render_template, flash, redirect, url_for, request
from flask_login import current_user, login_user, logout_user, login_required

from . import bp


@bp.route('/', methods=['GET'])
def resume():
    publications = [
        {"title": "CURRE Robotics Demonstration",
         "key": 0,
         "image": "/static/img/rise.jpg",
         "place": "NAVAIR NAWCAD, Webster Field, MD",
         "date": "August 2019",
         "link": "https://www.navair.navy.mil/nawcad/",
         "support": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube-nocookie.com/embed/bUR8KhWFlOI\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>"
        },
        {"title": "NLP: Networks, Levels and Predictions (Master's Thesis)",
         "key": 1,
         "image": "/static/img/hofstra.png",
         "place": "Hofstra School of Engineering and Applied Science, Hempstead, NY",
         "date": "May 2018",
         "link": "https://www.hofstra.edu/academics/colleges/seas/computer-science/index.html",
         "support": "<a href=\"/static/thesis_public_release.pdf\">View Paper</a>"
        },
        {"title": "Mobile Device Programming - Z-track",
         "key": 2,
         "image": "/static/img/hofstra.png",
         "place": "Hofstra School of Engineering and Applied Science, Hempstead, NY",
         "date": "December 2017",
         "link": "https://www.hofstra.edu/academics/colleges/seas/computer-science/index.html",
         "support": "<a href=\"https://github.com/nickumia/z-track\">View Project on Github</a>"
        },
        {"title": "Diversity-driven Adversity in Natural Language Processing-The Riddler",
         "key": 3,
         "image": "/static/img/stix.png",
         "place": "DOD STIx Conference, Crystal City, Virgina",
         "date": "August 2017",
         "link": "https://basicresearch.defense.gov/events/STIx-2017/",
         "support": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube-nocookie.com/embed/I0FxumOTvwk\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>"
        },
        {"title": "A Low Cost Automated Pill Dispenser for At-Home Use",
         "key": 4,
         "image": "/static/img/asee.png",
         "place": "ASEE Annual Conference, Make It! Session, New Orleans, LA",
         "date": "June 2016",
         "link": "https://www.asee.org/conferences-and-events/conferences/annual-conference/",
         "support": "<a href=\"https://peer.asee.org/25607\">View Paper</a>"
        },
        {"title": "Siemens Simatic S7 Automation - Processing, Testing and Storage",
         "key": 5,
         "image": "/static/img/vaughn.png",
         "place": "Mechatronics I Final Project, East Elmherst, NY",
         "date": "May 2016",
         "link": "",
         "support": None # Video
        },
        {"title": "Analysis of Impulsive Natural Phenomena through Finite Difference Methods – A MATLAB Computational Project-Based Learning",
         "key": 6,
         "image": "/static/img/laccei.png",
         "place": "LACCEI Conference, Santo Domingo, DR",
         "date": "July 2015",
         "link": "http://www.laccei.org/",
         "support": "<a href=\"http://www.laccei.org/LACCEI2015-SantoDomingo/StudentPapers/SP015.pdf\">View Paper</a>"
        },
        {"title": "Developing Courseware for Robotics in Pre-Engineering Education for High School Students",
         "key": 7,
         "image": "/static/img/asee.png",
         "place": "ASEE Annual Conference, Seattle, WA",
         "date": "June 2015",
         "link": "https://www.asee.org/conferences-and-events/conferences/annual-conference/",
         "support": "<a href=\"https://peer.asee.org/23837\">View Paper</a>"
        },
        {"title": "Integrating Robotics Education in Pre-College Engineering Program",
         "key": 8,
         "image": "/static/img/ieee.png",
         "place": "IEEE Integrated STEM Education Conference, Princeton University, NJ",
         "date": "March 2015",
         "link": "https://ewh.ieee.org/conf/stem/",
         "support": "<a href=\"https://doi.org/10.1109/ISECon.2015.7119920\">View Paper</a>"
        },
    ]
    return render_template('kumia.html',
                           section='Kumia',
                           title='Resume',
                           user=current_user,
                           pubs=json.dumps(publications),
                           work=json.dumps(publications),
                           edu=json.dumps(publications))
