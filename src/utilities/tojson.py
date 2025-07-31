
import flask
import json
import sys

# Import all necessary modules
from app.nlp.model_pages import (
    asteroid_parry_json, asteroid_lalita_json, asteroid_nick_json,
    openings_parry, openings_lalita, openings_nick
)
from app.kumia.resume import publications, experiences, educations
from app.kumia.posts import spiritual, d20141228
from app.travel.posts import london, new_york
from app.general import privacy

# Page configurations mapping to their respective data
PAGE_DATA = {
    # NLP Model Pages
    'processing': {
        'domain': openings_parry,
        'asteroids': asteroid_parry_json
    },
    'language': {
        'domain': openings_lalita,
        'asteroids': asteroid_lalita_json
    },
    'natural': {
        'domain': openings_nick,
        'asteroids': asteroid_nick_json
    },

    # Resume/CV Pages
    'kumia': {
        'work': experiences,
        'pubs': publications,
        'edu': educations
    },

    # Blog/Post Pages (handled by dynamic import)
    # Example of custom configuration (if needed):
    # 'custom_page': {
    #     'custom_key': custom_value,
    #     'other_key': other_value
    # }
}

def get_page_data(page_name):
    """Get page data, trying predefined config first, then dynamic import."""
    # First try predefined configurations
    if page_name in PAGE_DATA:
        return PAGE_DATA[page_name]

    # Try importing from common module locations
    module_paths = [
        'app.posts',
        'app.travel.posts',
        'app.kumia.posts'
    ]

    for module_path in module_paths:
        try:
            module = __import__(module_path, fromlist=[page_name])
            if hasattr(module, page_name):
                return {'post': getattr(module, page_name)}
        except ImportError:
            continue

    # Try to get from globals (for backward compatibility)
    if page_name in globals():
        return {'post': globals()[page_name]}

    return None

# Get the page name from command line argument
if len(sys.argv) != 2:
    print(f"Usage: {sys.argv[0]} <page_name>")
    print("Predefined pages:", ", ".join(PAGE_DATA.keys()))
    sys.exit(1)

page_name = sys.argv[1]

# Get the page data
data = get_page_data(page_name)
if data is None:
    print(f"Error: Page '{page_name}' not found and could not be imported", file=sys.stderr)
    print("Predefined pages:", ", ".join(PAGE_DATA.keys()))
    sys.exit(1)

# Print the data for the requested page
for key, value in data.items():
    print(f"{key}={flask.json.dumps(json.dumps(value))}")
