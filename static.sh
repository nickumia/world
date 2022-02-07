#!/bin/bash

# Export processing.html
docker run --rm -v `pwd`:/app nlp-web:debug bash -c "python3 src/utilities/tojson.py processing > testtest"

cat <(sed -n '1,25p' src/app/static/offline/realm_template.html) testtest <(sed -n '26,1000p' src/app/static/offline/realm_template.html) > src/app/static/offline/processing.html
rm -rf testtest
sleep 2

# Export language.html
docker run --rm -v `pwd`:/app nlp-web:debug bash -c "python3 src/utilities/tojson.py language > testtest"

cat <(sed -n '1,25p' src/app/static/offline/realm_template.html) testtest <(sed -n '26,1000p' src/app/static/offline/realm_template.html) > src/app/static/offline/language.html
rm -rf testtest
sleep 2

# export natural.html
docker run --rm -v `pwd`:/app nlp-web:debug bash -c "python3 src/utilities/tojson.py natural > testtest"

cat <(sed -n '1,25p' src/app/static/offline/realm_template.html) testtest <(sed -n '26,1000p' src/app/static/offline/realm_template.html) > src/app/static/offline/natural.html
rm -rf testtest

# export kumia.html
docker run --rm -v `pwd`:/app nlp-web:debug bash -c "python3 src/utilities/tojson.py kumia > testtest"

cat <(sed -n '1,25p' src/app/static/offline/kumia_template.html) testtest <(sed -n '26,1000p' src/app/static/offline/kumia_template.html) > src/app/static/offline/kumia.html
rm -rf testtest
