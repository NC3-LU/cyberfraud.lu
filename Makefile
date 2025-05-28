.PHONY: build-development
build-development: ## Build the development docker image.
	export DOCKER_BUILDKIT=1 && docker compose -f docker/build/docker-compose.yml build

.PHONY: start-development
start-development: ## Start the development docker container.
	docker compose -f docker/build/docker-compose.yml up -d

.PHONY: stop-development
stop-development: ## Stop the development docker container.
	docker compose -f docker/build/docker-compose.yml down

.PHONY: build-production
build-production: ## Build the production docker image.
	export DOCKER_BUILDKIT=1 && docker compose -f docker/build/docker-compose.yml build
