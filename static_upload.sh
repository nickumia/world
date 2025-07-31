aws s3 cp static/src/offline/bundle.js s3://offline.kamutiv.com/bundle.js
aws s3 cp static/src/react.css s3://offline.kamutiv.com/react.css
# Upload all files from static/src/offline with HTML content type
find static/src/offline -type f -not -name "*.*" -print0 | while IFS= read -r -d $'\0' file; do
    # Get just the filename without path
    filename=$(basename "$file")
    # Upload with HTML content type
    aws s3 cp "$file" "s3://offline.kamutiv.com/${filename}" --content-type "text/html"
done

# aws s3 cp static/src/img/ s3://offline.kamutiv.com/static/img/ --recursive
aws s3 cp mermaid/financial_concepts.svg s3://offline.kamutiv.com/static/img/financial_concepts.svg

# aws s3 cp static/src/js/raphael-min.js s3://offline.kamutiv.com/raphael-min.js
# aws s3 cp static/src/js/us-map-svg.js s3://offline.kamutiv.com/us-map-svg.js
