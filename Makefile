.PHONY: all release build back-build front-build back-push front-push


IMAGE_REPO=osipovskijdima
IMAGE_MEDTOOL_FRONT=$(IMAGE_REPO)/medtool-front:$(shell git describe --abbrev=0 --tags)
IMAGE_MEDTOOL_BACK=$(IMAGE_REPO)/medtool-back:$(shell git describe --abbrev=0 --tags)


all: release

release: back-build front-build back-push front-push

build: back-build front-build

back-build:
	@echo "start making image" $(IMAGE_MEDTOOL_BACK)
	docker build -f ./service.Dockerfile -t $(IMAGE_MEDTOOL_BACK) .
	@echo "finish making image" $(IMAGE_MEDTOOL_BACK)

front-build:
	@echo "start making image" $(IMAGE_MEDTOOL_FRONT)
	docker build --build-arg base_url=127.0.0.1:8080 -f ./client.Dockerfile -t $(IMAGE_MEDTOOL_FRONT) .
	@echo "finish making image" $(IMAGE_MEDTOOL_FRONT)

back-push:
	@docker push $(IMAGE_MEDTOOL_BACK)

front-push:
	@docker push $(IMAGE_MEDTOOL_FRONT)
