FROM python:latest

# Config and Setup
ENV FLASK_APP=0.0.0.0
WORKDIR /app

# Dependencies
COPY requirements.txt /app
RUN pip install -r requirements.txt

# Run Code
CMD flask run --host=${FLASK_HOST}
