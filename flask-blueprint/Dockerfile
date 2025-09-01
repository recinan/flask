FROM python:3.12.3-slim

WORKDIR /flask-app

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY . .

WORKDIR /flask-app/blueprintapp

RUN flask db init
RUN flask db migrate
RUN flask db upgrade

WORKDIR /flask-app

CMD ["python3", "run.py"]