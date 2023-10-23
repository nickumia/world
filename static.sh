#!/bin/bash

CUT_START='26'
CUT_END='27'

declare -a simple_pages=(
[0]='index Home homemain'
[1]='nlp NLP nlpmain'
)

declare -a content_pages=(
[0]='processing Processing realm'
[1]='language Language realm'
[2]='natural Natural realm'
[3]='kumia Kumia kumia'
[4]='london London singlepost'
)

for page in "${simple_pages[@]}"
do
  read -ra page_parts <<< "$page"
  # Build page
  cp static/src/offline/template.html static/src/offline/${page_parts[0]}
  sed -i "s/TITLE_PLACEHOLDER/Kamutiv Tech | ${page_parts[1]}/g" static/src/offline/${page_parts[0]}
  sed -i "s/MAIN_CONTENT_PLACEHOLDER/${page_parts[2]}/g" static/src/offline/${page_parts[0]}
  echo "Done with...${page_parts[0]}"
done

for page in "${content_pages[@]}"
do
  read -ra page_parts <<< "$page"
  # Export page
  cp static/src/offline/template.html static/src/offline/temp
  sed -i "s/TITLE_PLACEHOLDER/Kamutiv Tech | ${page_parts[1]}/g" static/src/offline/temp
  sed -i "s/MAIN_CONTENT_PLACEHOLDER/${page_parts[2]}/g" static/src/offline/temp
  docker run --rm -v `pwd`:/app nlp-web:debug bash -c "python3 src/utilities/tojson.py ${page_parts[0]} > testtest"

  cat <(sed -n "1,${CUT_START}p" static/src/offline/temp) testtest <(sed -n "${CUT_END},1000p" static/src/offline/temp) > static/src/offline/${page_parts[0]}
  rm -rf testtest static/src/offline/temp
  echo "Done with...${page_parts[0]}"
done
