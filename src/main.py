from app import create_app  # , cli
from app.nlp.posts.all import initialize
import wait

import os
import sys


app = create_app()
wait.postgres(os.getenv('POSTGRES_DB'),
              os.getenv('POSTGRES_USER'),
              os.getenv('POSTGRES_HOST'),
              os.getenv('POSTGRES_PASS'))
print("DB up", file=sys.stderr)
wait.elastics(app.elasticsearch)
print("ES up", file=sys.stderr)

initialize(app)
# cli.register(app)

# if __name__ == "__main__":
#    app.run(host="0.0.0.0", port=8000, debug=True)
