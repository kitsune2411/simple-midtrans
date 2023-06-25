module.exports = {
  apps: [
    {
      name: "midtrans",
      script: "index.js",
      instances: 2,
      exec_mode: "cluster",
      cron_restart: "0 0 * * *",
    },
  ],
};
