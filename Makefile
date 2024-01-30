include .env

.PHONY: help start status stop magento-grunt url mailcatcher magento-script magento-cron-start magento-cron-stop restart magento-upgrade magento-flush-cache magento-reindexall magento-reindex shell-magento mysqlcli shell-mysql shell-redis redis docker-pull docker-remove docker-prune docker-rebuild docker-debug docker-logs phpcs phpcs-path phpcs-githook phpcbf xdebug-enable xdebug-disable

default: help

restart: ## Restart containers
	@echo "$(COLOR_LIGHT_GREEN)Restarting containers for $(PROJECT_NAME)"
	@docker-compose stop && @docker-compose up -d
start: ## Start containers.
	@echo "$(COLOR_LIGHT_GREEN)Starting up containers for $(PROJECT_NAME)"
	@docker-compose up -d

stop: ## Stop containers
	@echo "$(COLOR_LIGHT_GREEN)Stopping containers for $(PROJECT_NAME)"
	@docker-compose stop


install: ## install
	@docker-compose exec php composer install

deploy: ## deploy
	@docker-compose exec php composer run deploy

cache-clear: ## cache-clear
	@docker-compose exec php php bin/console cache:clear

migrations: ## run migrations
	@docker-compose exec php php bin/console doctrine:migrations:migrate

fixtures: ## run fixtures
	@docker-compose exec php php bin/console doctrine:fixtures:load

testing: ## run testing
	@docker-compose exec php php bin/phpunit

router: ## router
	@docker-compose exec php php bin/console debug:router



php-shell: ## php shell
	@docker-compose exec php /bin/sh


help:  ## Display this help.
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n\nTargets:\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-10s\033[0m %s\n", $$1, $$2 }' $(MAKEFILE_LIST)

# For using CLI args in Makefile https://stackoverflow.com/a/6273809/1826109
%:
	@:
