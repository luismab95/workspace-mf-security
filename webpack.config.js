const {
  shareAll,
  withModuleFederationPlugin,
} = require("@angular-architects/module-federation/webpack");

const moduleFederationConfig = withModuleFederationPlugin({
  name: "mf-security",
  exposes: {
    "./UserModule": "./src/app/modules/user/user.module.ts",
  },
  shared: {
    ...shareAll({
      singleton: true,
      strictVersion: true,
      requiredVersion: "auto",
    }),
  },
});
moduleFederationConfig.output.publicPath = "http://localhost:4202/";
module.exports = moduleFederationConfig;
