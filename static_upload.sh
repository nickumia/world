aws s3 cp static/src/offline/bundle.js s3://offline.kamutiv.com/bundle.js
aws s3 cp static/src/react.css s3://offline.kamutiv.com/react.css
aws s3 cp static/src/offline/index s3://offline.kamutiv.com/index --content-type "text/html"
aws s3 cp static/src/offline/kumia s3://offline.kamutiv.com/kumia --content-type "text/html"
aws s3 cp static/src/offline/nlp s3://offline.kamutiv.com/nlp --content-type "text/html"
aws s3 cp static/src/offline/natural s3://offline.kamutiv.com/natural --content-type "text/html"
aws s3 cp static/src/offline/language s3://offline.kamutiv.com/language --content-type "text/html"
aws s3 cp static/src/offline/processing s3://offline.kamutiv.com/processing --content-type "text/html"
aws s3 cp static/src/offline/london s3://offline.kamutiv.com/london --content-type "text/html"
aws s3 cp static/src/offline/new_york s3://offline.kamutiv.com/new_york --content-type "text/html"
aws s3 cp static/src/offline/spiritual_tech s3://offline.kamutiv.com/spiritual_tech --content-type "text/html"

# aws s3 cp static/src/img/ s3://offline.kamutiv.com/static/img/ --recursive
