aws s3 cp src/app/static/offline/bundle.js s3://offline.kamutiv.com/bundle.js
aws s3 cp src/app/static/react.css s3://offline.kamutiv.com/react.css
aws s3 cp src/app/static/offline/index s3://offline.kamutiv.com/index --content-type "text/html"
aws s3 cp src/app/static/offline/kumia s3://offline.kamutiv.com/kumia --content-type "text/html"
aws s3 cp src/app/static/offline/natural s3://offline.kamutiv.com/natural --content-type "text/html"
aws s3 cp src/app/static/offline/language s3://offline.kamutiv.com/language --content-type "text/html"
aws s3 cp src/app/static/offline/processing s3://offline.kamutiv.com/processing --content-type "text/html"
