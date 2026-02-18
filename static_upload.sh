aws s3 cp static/src/offline/bundle.js s3://offline.kamutiv.com/bundle.js
aws s3 cp static/src/react.css s3://offline.kamutiv.com/react.css
aws s3 cp static/src/offline/index s3://offline.kamutiv.com/index.html --content-type "text/html"

# Upload tracker files
aws s3 cp static/src/offline/tracker s3://offline.kamutiv.com/tracker --content-type "text/html"
aws s3 cp static/src/offline/analytics s3://offline.kamutiv.com/analytics --content-type "text/html"
aws s3 cp static/src/offline/config.js s3://offline.kamutiv.com/config.js --content-type "application/javascript"

# Upload all files from static/src/offline with their directory structure preserved
find static/src/offline -type f -not -name "*.*" | while read -r file; do
    # Get the relative path from static/src/offline
    rel_path="${file#static/src/offline/}"

    # If file is in a subdirectory, ensure the directory exists in S3
    if [[ "$rel_path" == *"/"* ]]; then
        # Create the directory structure in S3
        dir_path="$(dirname "$rel_path")"
        aws s3 cp "$file" "s3://offline.kamutiv.com/$rel_path" --content-type "text/html"
    else
        # File is in the root of offline directory
        aws s3 cp "$file" "s3://offline.kamutiv.com/$rel_path" --content-type "text/html"
    fi
done

# aws s3 cp static/src/img/ s3://offline.kamutiv.com/static/img/ --recursive
aws s3 cp mermaid/financial_concepts.svg s3://offline.kamutiv.com/static/img/financial_concepts.svg

# aws s3 cp static/src/js/raphael-min.js s3://offline.kamutiv.com/raphael-min.js
# aws s3 cp static/src/js/us-map-svg.js s3://offline.kamutiv.com/us-map-svg.js
