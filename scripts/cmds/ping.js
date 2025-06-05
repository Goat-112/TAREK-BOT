module.exports = {
  config: {
    name: "ping",
    version: "1.0",
    author: "Tarek",
    countDown: 0,
    role: 0,
    shortDescription: { en: "Ping test" },
    longDescription: { en: "Responds with pong" },
    category: "utility",
    guide: { en: "/ping" }
  },

  onStart: async function ({ api, event }) {
    api.sendMessage("🏓 Pong!", event.threadID);
  }
};