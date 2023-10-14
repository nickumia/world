#!/bin/bash

# Export processing.html
docker run --rm -v `pwd`:/app nlp-web:debug bash -c "python3 src/utilities/tojson.py processing > testtest"

cat <(sed -n '1,26p' static/src/offline/realm_template.html) testtest <(sed -n '27,1000p' static/src/offline/realm_template.html) > static/src/offline/processing
rm -rf testtest
sleep 2

# Export language.html
docker run --rm -v `pwd`:/app nlp-web:debug bash -c "python3 src/utilities/tojson.py language > testtest"

cat <(sed -n '1,26p' static/src/offline/realm_template.html) testtest <(sed -n '27,1000p' static/src/offline/realm_template.html) > static/src/offline/language
rm -rf testtest
sleep 2

# export natural.html
docker run --rm -v `pwd`:/app nlp-web:debug bash -c "python3 src/utilities/tojson.py natural > testtest"

cat <(sed -n '1,26p' static/src/offline/realm_template.html) testtest <(sed -n '27,1000p' static/src/offline/realm_template.html) > static/src/offline/natural
rm -rf testtest

# export kumia.html
docker run --rm -v `pwd`:/app nlp-web:debug bash -c "python3 src/utilities/tojson.py kumia > testtest"

cat <(sed -n '1,26p' static/src/offline/kumia_template.html) testtest <(sed -n '27,1000p' static/src/offline/kumia_template.html) > static/src/offline/kumia
rm -rf testtest
