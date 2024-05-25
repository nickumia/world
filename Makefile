TEST_ENV ?= LOCAL
ifeq ($(TEST_ENV), LOCAL)
	COMPOSE_FILE = docker-compose.yml
else
	COMPOSE_FILE = docker-compose.ci.yml
endif

deploy: build-local install-front build-front
	python3 -m gunicorn --bind 0.0.0.0:8000 main:app

build: # Build Main App
	docker build -t nlp-web:latest .

build-test: # Build Main App
	docker build -t nlp-web:debug . --build-arg debug=1

build-local:
	pip3 install -r requirements.txt

clean: # Tear down Main App
	docker-compose -f $(COMPOSE_FILE) -f docker-compose.test.yml down -v --remove-orphan
	rm -rf testtest

up: # Start Main App
	docker-compose -f $(COMPOSE_FILE) up -d
	

install-front: # Install dependencies for front-end
	# TODO: fix mui imports :/
	cd static && npm install --legacy-peer-deps

build-front: # Build jsx into js
	# cd src && ./node_modules/browserify/bin/cmd.js app/static/jsx/*.js --standalone nlp > app/static/js/bundle.js
	mkdir -p static/src/js
	cd static && ./node_modules/gulp/bin/gulp.js
	docker run --rm -u $(id -u):$(id -g) -v ./mermaid:/data minlag/mermaid-cli -i financial_concepts.mmd -o financial_concepts.svg
	docker run --rm -u $(id -u):$(id -g) -v ./mermaid:/data minlag/mermaid-cli -i financial_lifestyle.mmd -o financial_lifestyle.svg

build-mermaid:
	docker run --rm -u $(id -u):$(id -g) -v ./mermaid:/data minlag/mermaid-cli -i financial_concepts.mmd -o financial_concepts.svg
	docker run --rm -u $(id -u):$(id -g) -v ./mermaid:/data minlag/mermaid-cli -i financial_lifestyle.mmd -o financial_lifestyle.svg

build-static: # Convert python structures to javascript
	./static.sh

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
