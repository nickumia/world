#!/bin/bash

CUT_START='29'
CUT_END='30'

declare -a simple_pages=(
[0]='index Home homemain'
[1]='nlp NLP nlpmain'
[2]='spiritual-tech SpiritualTech spiritualtech'
[3]='financial Financial financial'
)

declare -a content_pages=(
# [0]='d20141228 A_Beginning_20141228 singlepost'
[99]='one_year_later_1 SpiritualTech_One_Year_Later_1 singlepost'
[100]='one_year_later SpiritualTech_One_Year_Later singlepost'
[101]='spiritualtech_being_wrong SpiritualTech_Being_Wrong singlepost'
[102]='keep_notes Keep_Notes singlepost'
[103]='consciousness Consciousness singlepost'
[104]='languages Languages singlepost'
[105]='universalization Universalization singlepost'
[106]='identification Identification singlepost'
[107]='senses Senses singlepost'
[108]='introduction_legacy Introduction_Legacy singlepost'
[109]='natural Natural realm'
[110]='language Language realm'
[111]='processing Processing realm'
[112]='kumia Kumia kumia'
[113]='spiritual Spiritual singlepost'
[114]='2023_london London singlepost'
[115]='2023_new_york NewYork singlepost'
[116]='2025_vietnam Vietnam singlepost'
[117]='privacy Privacy singlepost'
)

for page in "${simple_pages[@]}"
do
  read -ra page_parts <<< "$page"
    # Special handling for home page to pass pages data
  if [ "${page_parts[0]}" = "index" ]; then
    # Generate a JSON array of pages from content_pages, pulling names from _meta.py files
    pages_json='['
    first=true
    for content_page in "${content_pages[@]}"; do
      read -ra parts <<< "$content_page"
      page_id="${parts[0]}"

      # Default name (from content_pages array)
      name="${parts[1]//_/ }"

      # Initialize date as empty
      posted_date=""

      # Try to find and extract data from _meta.py file
      meta_file=$(find src/app -name "${page_id}_meta.py" -type f | head -1)
      if [ -f "$meta_file" ]; then
        # Extract title from _meta.py (handles both single and double quotes)
        title=$(grep -E "^title\s*=" "$meta_file" | head -1 | sed -E "s/^title\s*=\s*['\"]([^'\"]+)['\"].*/\1/")
        if [ -n "$title" ]; then
          name="$title"
        fi

        # Extract posted_time if available
        date_line=$(grep -E "^posted_time\s*=" "$meta_file" | head -1)
        if [ -n "$date_line" ]; then
          # Extract the date value, handling different date formats
          posted_date=$(echo "$date_line" | sed -E "s/^posted_time\s*=\s*['\"]([^'\"]+)['\"].*/\1/")
        fi
      fi

      if [ "$first" = false ]; then
        pages_json+=","
      fi

      # Escape special characters for JSON
      name_escaped=$(echo "$name" | sed 's/"/\\"/g')
      date_escaped=$(echo "$posted_date" | sed 's/"/\\"/g')

      # Include date in the page data if available
      if [ -n "$posted_date" ]; then
        pages_json+="{\"id\":\"$page_id\",\"name\":\"$name_escaped\",\"date\":\"$date_escaped\"}"
      else
        pages_json+="{\"id\":\"$page_id\",\"name\":\"$name_escaped\"}"
      fi
      first=false
    done
    pages_json+="]"

    # Create a temporary file with the template and inject the pages data
    cp static/src/offline/template.html static/src/offline/temp
    # Update placeholders in the temp file
    sed -i "s/TITLE_PLACEHOLDER/Kamutiv Tech | ${page_parts[1]}/g" static/src/offline/temp
    sed -i "s/MAIN_CONTENT_PLACEHOLDER/${page_parts[2]}/g" static/src/offline/temp

    # Use the same content insertion logic as other content pages
    # The JSON is already properly escaped, just wrap it in quotes
    cat <(sed -n "1,${CUT_START}p" static/src/offline/temp) \
        <(echo -n 'allPages='; echo -n "'$pages_json';") \
        <(sed -n "${CUT_END},1000p" static/src/offline/temp) > static/src/offline/${page_parts[0]}

    # Clean up
    rm -f static/src/offline/temp
  else
    # Standard page build for other simple pages
    cp static/src/offline/template.html static/src/offline/${page_parts[0]}
    sed -i "s/TITLE_PLACEHOLDER/Kamutiv Tech | ${page_parts[1]}/g" static/src/offline/${page_parts[0]}
    sed -i "s/MAIN_CONTENT_PLACEHOLDER/${page_parts[2]}/g" static/src/offline/${page_parts[0]}
  fi
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
