app_name=shopping_list
build_dir=$(CURDIR)/build
sign_dir=$(build_dir)/sign
cert_dir=$(HOME)/.nextcloud/certificates

all: dev

.PHONY: dev
dev: npm-install
	npm run dev

.PHONY: build
build: npm-install
	npm run build

.PHONY: npm-install
npm-install:
	npm ci

.PHONY: composer-install
composer-install:
	composer install --no-dev

.PHONY: lint
lint:
	npm run lint
	npm run stylelint

.PHONY: lint-fix
lint-fix:
	npm run lint:fix
	npm run stylelint:fix

.PHONY: test
test:
	composer run test

.PHONY: clean
clean:
	rm -rf $(build_dir)
	rm -rf js/
	rm -rf css/

.PHONY: appstore
appstore: build
	mkdir -p $(sign_dir)/$(app_name)
	rsync -a \
		--exclude=.git \
		--exclude=.github \
		--exclude=.gitignore \
		--exclude=.nextcloudignore \
		--exclude=.php-cs-fixer.cache \
		--exclude=build \
		--exclude=node_modules \
		--exclude=src \
		--exclude=tests \
		--exclude=package.json \
		--exclude=package-lock.json \
		--exclude=tsconfig.json \
		--exclude=vite.config.ts \
		--exclude=Makefile \
		--exclude='*.map' \
		$(CURDIR)/ $(sign_dir)/$(app_name)/
	tar -czf $(build_dir)/$(app_name).tar.gz \
		-C $(sign_dir) $(app_name)
