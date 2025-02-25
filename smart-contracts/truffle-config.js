
module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545, // Ensure this matches your Ganache settings
      network_id: "*" // Matches any network id
    }
  },
  compilers: {
    solc: {
      version: "0.8.0" // or the version you prefer
    }
  }
};
