# Whatever our base container image is for our lambda execution engine should match our devel env
FROM nexus.econ.census.gov/amazon/aws-lambda-python:3.11

COPY . /app
WORKDIR /app

RUN export http_proxy="http://proxy.tco.census.gov:3128" && \
    export https_proxy="http://proxy.tco.census.gov:3128" && \
    pip install debugpy -t /tmp && \
    pip install -r requirements.txt

EXPOSE 8125

ENTRYPOINT uvicorn main:app --host=0.0.0.0 --port=8125
