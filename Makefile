env:
	@cp .env.example .env

dev:
	@npm run start:dev

build:
	@npm run build

start-stage:
	@pm2 start ecosystem.config.js --only backend

stop-stage:
	@pm2 delete backend