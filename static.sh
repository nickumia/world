#!/bin/bash

CUT_START='26'
CUT_END='27'

# Build index
cp static/src/offline/template.html static/src/offline/index
sed -i 's/TITLE_PLACEHOLDER/Kamutiv Tech | Home/g' static/src/offline/index
sed -i 's/MAIN_CONTENT_PLACEHOLDER/homemain/g' static/src/offline/index

# Build NLP Home page
cp static/src/offline/template.html static/src/offline/nlp
sed -i 's/TITLE_PLACEHOLDER/Kamutiv Tech | NLP/g' static/src/offline/nlp
sed -i 's/MAIN_CONTENT_PLACEHOLDER/nlpmain/g' static/src/offline/nlp

# Build Sample post page
cp static/src/offline/template.html static/src/offline/sample_temp
sed -i 's/TITLE_PLACEHOLDER/Kamutiv Tech | Sample/g' static/src/offline/sample_temp
sed -i 's/MAIN_CONTENT_PLACEHOLDER/post/g' static/src/offline/sample_temp
cat > testtest << EOT
<p>Something cool!</p>
EOT

cat <(sed -n "1,${CUT_START}p" static/src/offline/sample_temp) testtest <(sed -n "${CUT_END},1000p" static/src/offline/sample_temp) > static/src/offline/sample
rm -rf testtest static/src/offline/sample_temp
sleep 2


# Export processing page
cp static/src/offline/template.html static/src/offline/processing_temp
sed -i 's/TITLE_PLACEHOLDER/Kamutiv Tech | Processing/g' static/src/offline/processing_temp
sed -i 's/MAIN_CONTENT_PLACEHOLDER/realm/g' static/src/offline/processing_temp
docker run --rm -v `pwd`:/app nlp-web:debug bash -c "python3 src/utilities/tojson.py processing > testtest"

cat <(sed -n "1,${CUT_START}p" static/src/offline/processing_temp) testtest <(sed -n "${CUT_END},1000p" static/src/offline/processing_temp) > static/src/offline/processing
rm -rf testtest static/src/offline/processing_temp
sleep 2

# Export language page
cp static/src/offline/template.html static/src/offline/language_temp
sed -i 's/TITLE_PLACEHOLDER/Kamutiv Tech | Language/g' static/src/offline/language_temp
sed -i 's/MAIN_CONTENT_PLACEHOLDER/realm/g' static/src/offline/language_temp
docker run --rm -v `pwd`:/app nlp-web:debug bash -c "python3 src/utilities/tojson.py language > testtest"

cat <(sed -n "1,${CUT_START}p" static/src/offline/language_temp) testtest <(sed -n "${CUT_END},1000p" static/src/offline/language_temp) > static/src/offline/language
rm -rf testtest static/src/offline/language_temp
sleep 2

# export natural page
cp static/src/offline/template.html static/src/offline/natural_temp
sed -i 's/TITLE_PLACEHOLDER/Kamutiv Tech | Natural/g' static/src/offline/natural_temp
sed -i 's/MAIN_CONTENT_PLACEHOLDER/realm/g' static/src/offline/natural_temp
docker run --rm -v `pwd`:/app nlp-web:debug bash -c "python3 src/utilities/tojson.py natural > testtest"

cat <(sed -n "1,${CUT_START}p" static/src/offline/natural_temp) testtest <(sed -n "${CUT_END},1000p" static/src/offline/natural_temp) > static/src/offline/natural
rm -rf testtest static/src/offline/natural_temp

# export kumia page
cp static/src/offline/template.html static/src/offline/kumia_temp
sed -i 's/TITLE_PLACEHOLDER/Kamutiv Tech | Kumia/g' static/src/offline/kumia_temp
sed -i 's/MAIN_CONTENT_PLACEHOLDER/kumia/g' static/src/offline/kumia_temp
docker run --rm -v `pwd`:/app nlp-web:debug bash -c "python3 src/utilities/tojson.py kumia > testtest"

cat <(sed -n "1,${CUT_START}p" static/src/offline/kumia_temp) testtest <(sed -n "${CUT_END},1000p" static/src/offline/kumia_temp) > static/src/offline/kumia
rm -rf testtest static/src/offline/kumia_temp
