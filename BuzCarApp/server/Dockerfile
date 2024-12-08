FROM python:3.10-alpine

WORKDIR /server

COPY requirements.txt /server
RUN --mount=type=cache,target=/root/.cache/pip \
    pip3 install -r requirements.txt

COPY . /server

ENTRYPOINT ["python3"]
CMD ["run.py"]