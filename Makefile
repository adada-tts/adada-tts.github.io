.PHONY: all
all: install build

.PHONY: install
install:
	@pnpm i

.PHONY: build
build:
	@pnpm tsc --noEmit
	@pnpm build

.PHONY: dev
dev:
	@pnpm dev

.PHONY: preview
preview:
	@pnpm preview

.PHONY: update
update:
	@pnpm update --latest

.PHONY: publish
publish:
	@rsync -avz --delete ./dist/ laowudui@web.sourceforge.net:/home/project-web/adada/htdocs/
