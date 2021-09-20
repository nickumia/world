
build:
	docker-compose -f docker-compose.yml build

clean:
	docker-compose -f docker-compose.yml down -v --remove-orphan

up:
	docker-compose -f docker-compose.yml up
