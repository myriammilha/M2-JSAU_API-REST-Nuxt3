export JSAU_REPOSITORY_FILE_PATH := $(CURDIR)/jsau-data
export NODE_ENV ?= development

.PHONY: help \
install-backend install-frontend install \
start-backend start-frontend \
test-backend test-frontend test \
clean-backend clean-frontend clean

help:
	@echo "Available commands:"
	@echo "  make install-backend     Install backend dependencies"
	@echo "  make install-frontend    Install frontend dependencies"
	@echo "  make install             Install backend and frontend"
	@echo "  make start-backend       Start Express API"
	@echo "  make start-frontend      Start Nuxt app"
	@echo "  make test-backend        Run backend tests"
	@echo "  make test-frontend       Run frontend tests"
	@echo "  make test                Run all tests"
	@echo "  make clean-backend       Clean backend"
	@echo "  make clean-frontend      Clean frontend"
	@echo "  make clean               Clean everything"

# =========================
# Install
# =========================
install: install-backend install-frontend

install-backend:
	cd jsau-apiserver && npm install

install-frontend:
	cd jsau-webhybrid-nuxt && npm install

# =========================
# Start
# =========================
start-backend:
	cd jsau-apiserver && npm run start

start-frontend:
	cd jsau-webhybrid-nuxt && npm run dev

# =========================
# Tests
# =========================
test: test-backend test-frontend

test-backend:
	cd jsau-apiserver && npm run test

test-frontend:
	cd jsau-webhybrid-nuxt && npm run test

# =========================
# Clean
# =========================
clean: clean-backend clean-frontend

clean-backend:
	cd jsau-apiserver && rm -rf node_modules package-lock.json coverage

clean-frontend:
	cd jsau-webhybrid-nuxt && rm -rf node_modules package-lock.json .nuxt .output coverage
