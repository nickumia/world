FROM python:3.13.0a2-slim
LABEL org.opencontainers.image.source https://github.com/nickumia/nlp-web
ARG debug=0

# Config and Setup
ENV FLASK_APP=0.0.0.0
WORKDIR /app

# Packages
RUN apt-get install git -y

# Dependencies
COPY requirements.txt dev-requirements.txt codecov.yml /app/
COPY src/app/ /app/src/app/
COPY static/src/ /app/src/app/static/
COPY src/utilities/ /app/src/utilities/
COPY src/*.py src/setup.cfg /app/src/
COPY src/tests/* /app/src/tests/

RUN pip install -r requirements.txt
RUN if [ $debug -eq 1 ]; then pip install -r dev-requirements.txt; fi

# Run Code
CMD gunicorn --bind 0.0.0.0:8000 main:app
