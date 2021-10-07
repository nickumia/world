
build: # Build Main App
	docker-compose -f docker-compose.yml build

clean: # Tear down Main App
	docker-compose -f docker-compose.yml down -v --remove-orphan

up: # Start Main App
	docker-compose -f docker-compose.yml up

build-front: # Install dependencies for front-end
	cd src && npm install
	cd src && ./node_modules/bower/bin/bower install
	cd src && ./node_modules/gulp/bin/gulp.js
	
