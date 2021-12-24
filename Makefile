
build: # Build Main App
	docker-compose -f docker-compose.yml build

build-test: # Build Main App
	docker build -t nlp-web:debug . --build-arg debug=1

clean: # Tear down Main App
	docker-compose -f docker-compose.yml down -v --remove-orphan

up: # Start Main App
	docker-compose -f docker-compose.yml up -d

install-front: # Install dependencies for front-end
	cd src && npm install

build-front: # Build jsx into js
	# cd src && ./node_modules/browserify/bin/cmd.js app/static/jsx/*.js --standalone nlp > app/static/js/bundle.js
	mkdir -p src/app/static/js
	cd src && ./node_modules/gulp/bin/gulp.js

test: # Test Flask Backend
	docker run --rm \
		-v `pwd`/src/tests:/app/src/tests \
		-v `pwd`:/app \
		-e SECRET_KEY=something-important \
		nlp-web:debug bash -c "coverage run -m pytest --disable-pytest-warnings && \
			coverage html --omit=\"src/tests/*\" -d coverage"
