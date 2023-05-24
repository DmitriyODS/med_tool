.PHONY: all release build back-build back-push


IMAGE_REPO=osipovskijdima
IMAGE_MEDTOOL_BACK=$(IMAGE_REPO)/medtool-back:$(shell git describe --abbrev=0 --tags)


all: release

release: back-build back-push

build: back-build

back-build:
	@echo "start making image" $(IMAGE_MEDTOOL_BACK)
	docker build -f ./service.Dockerfile -t $(IMAGE_MEDTOOL_BACK) .
	@echo "finish making image" $(IMAGE_MEDTOOL_BACK)

back-push:
	@docker push $(IMAGE_MEDTOOL_BACK)
