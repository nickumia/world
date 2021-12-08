
build: # Build Main App
	docker-compose -f docker-compose.yml build

clean: # Tear down Main App
	docker-compose -f docker-compose.yml down -v --remove-orphan

up: # Start Main App
	docker-compose -f docker-compose.yml up -d

install-front: # Install dependencies for front-end
	cd src && npm install

build-front: # Build jsx into js
	# cd src && ./node_modules/browserify/bin/cmd.js app/static/jsx/*.js --standalone nlp > app/static/js/bundle.js
	touch src/app/static/js
	cd src && ./node_modules/gulp/bin/gulp.js
