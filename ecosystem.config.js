module.exports = {
  apps : [{
    name   : "backend",
    script : "./dist/main.js",
    autorestart: true,
    env: {
      ENV_PATH: '../.env'
    }
  }]
}
