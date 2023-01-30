module.exports = {
  apps: [
    {
      name: "toboggan",
      script: "app.js",
      node_args: "-r dotenv/config dotenv_config_path=.env.production",
    },
  ],
};
