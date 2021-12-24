FROM python:latest
ARG debug=0

# Config and Setup
ENV FLASK_APP=0.0.0.0
WORKDIR /app

# Dependencies
COPY requirements.txt dev-requirements.txt /app/
COPY src/app/ /app/src/app/
COPY src/*.py src/setup.cfg /app/src/
COPY src/tests/* /app/src/tests/

RUN pip install -r requirements.txt
RUN if [ $debug -eq 1 ]; then pip install -r dev-requirements.txt; fi

# Run Code
CMD flask run --host=${FLASK_HOST}
