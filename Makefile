TEST_ENV ?= LOCAL
ifeq ($(TEST_ENV), LOCAL)
	COMPOSE_FILE = docker-compose.yml
else
	COMPOSE_FILE = docker-compose.ci.yml
endif

deploy: build-local build-front
	gunicorn --bind 0.0.0.0:8000 main:app

build: # Build Main App
	docker build -t nlp-web:latest .

build-test: # Build Main App
	docker build -t nlp-web:debug . --build-arg debug=1

build-local:
	pip3 install -r requirements.txt

clean: # Tear down Main App
	docker-compose -f $(COMPOSE_FILE) -f docker-compose.test.yml down -v --remove-orphan

up: # Start Main App
	docker-compose -f $(COMPOSE_FILE) up -d
	

install-front: # Install dependencies for front-end
	cd src && npm install

build-front: # Build jsx into js
	# cd src && ./node_modules/browserify/bin/cmd.js app/static/jsx/*.js --standalone nlp > app/static/js/bundle.js
	mkdir -p src/app/static/js
	cd src && ./node_modules/gulp/bin/gulp.js

test-front: # Test frontend UI
	docker-compose -f $(COMPOSE_FILE) -f docker-compose.test.yml up --abort-on-container-exit cypress

lint: # Lint python code
	docker run --rm -v "$(shell pwd)":/app nlp-web:debug bash -c "cd /app/src/ && flake8 . --count --show-source --statistics"

test: # Test Flask Backend
	docker-compose -f $(COMPOSE_FILE) -f docker-compose.test.yml run --rm nlp \
		bash -c "coverage run -m pytest --disable-pytest-warnings && \
			coverage report --omit=\"src/tests/*\",\"app/auth/*\""

test-cov: # Test Flask Backend
	docker-compose -f $(COMPOSE_FILE) -f docker-compose.test.yml run --rm -v $(shell pwd):/app nlp \
		bash -c "coverage run -m pytest --disable-pytest-warnings && \
			coverage xml --omit=\"src/tests/*\",\"app/auth/*\""
