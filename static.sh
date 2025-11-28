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
[289]='road_change_home Road_Change_Home singlepost'
[290]='good_and_bad_are_selfish Good_And_Bad_Are_Selfish singlepost'
[291]='fi_value The_True_Value_Of_Financial_Independence singlepost'
[292]='pain Pain singlepost'
[293]='learning_and_testing Learning_And_Testing singlepost'
[294]='learning_v_knowledge Learning_V_Knowledge singlepost'
[295]='inhibition Inhibition singlepost'
[296]='2025_09_11 This_Is_Kind_Of_A_Weird_One singlepost'
[297]='struggling_to_return Struggling_To_Return singlepost'
[995]='spiritualtech/5 Day_5 singlepost'
[996]='spiritualtech/4 Day_4 singlepost'
[997]='spiritualtech/3 Day_3 singlepost'
[998]='spiritualtech/2 Day_2 singlepost'
[999]='spiritualtech/1 Day_1 singlepost'
[1000]='spiritualtech/one_year_later SpiritualTech_One_Year_Later singlepost'
[1001]='spiritualtech_being_wrong SpiritualTech_Being_Wrong singlepost'
[1002]='keep_notes Keep_Notes singlepost'
[1003]='consciousness Consciousness singlepost'
[1004]='languages Languages singlepost'
[1005]='universalization Universalization singlepost'
[1006]='identification Identification singlepost'
[1007]='senses Senses singlepost'
[1008]='introduction_legacy Introduction_Legacy singlepost'
[1009]='natural Natural realm'
[1010]='language Language realm'
[1011]='processing Processing realm'
[1012]='kumia Kumia kumia'
[1013]='spiritual Spiritual singlepost'
[1014]='2023_london London singlepost'
[1015]='2023_new_york NewYork singlepost'
[1016]='2025_vietnam Vietnam singlepost'
[1017]='privacy Privacy singlepost'
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
      meta_file=$(find src/app -path "*/${page_id}_meta.py" -type f | head -1)
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

  # Extract directory and filename
  IFS='/' read -r -a path_parts <<< "${page_parts[0]}"

  if [ ${#path_parts[@]} -gt 1 ]; then
    # Handle subdirectories
    dir_path="static/src/offline/$(dirname "${page_parts[0]}")"
    mkdir -p "$dir_path"
    output_file="$dir_path/$(basename "${page_parts[0]}")"
  else
    # Handle root directory files
    output_file="static/src/offline/${page_parts[0]}"
  fi

  # Export page
  cp static/src/offline/template.html static/src/offline/temp
  sed -i "s/TITLE_PLACEHOLDER/Kamutiv Tech | ${page_parts[1]}/g" static/src/offline/temp
  sed -i "s/MAIN_CONTENT_PLACEHOLDER/${page_parts[2]}/g" static/src/offline/temp

  # Use the base filename (without path) for tojson.py
  base_filename=$(basename "${page_parts[0]}")
  docker run --rm -v `pwd`:/app nlp-web:debug bash -c "python3 src/utilities/tojson.py ${base_filename} > testtest"

  cat <(sed -n "1,${CUT_START}p" static/src/offline/temp) testtest <(sed -n "${CUT_END},1000p" static/src/offline/temp) > "$output_file"
  rm -rf testtest static/src/offline/temp
  echo "Done with...${page_parts[0]}"
done
