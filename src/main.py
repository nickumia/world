from app import create_app # , cli
from app.nlp.posts.all import initialize

app = create_app()

initialize(app)
# cli.register(app)

#if __name__ == "__main__":
#    app.run(host="0.0.0.0", port=8000, debug=True)
