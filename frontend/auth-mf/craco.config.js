const ModuleFederationPlugin =
    require("webpack").container.ModuleFederationPlugin;

module.exports = {
    webpack: {
        configure: (webpackConfig) => {
            webpackConfig.optimization.runtimeChunk = false;
            webpackConfig.output.publicPath = "http://localhost:3001/";
            webpackConfig.output.uniqueName = "authmf";
            webpackConfig.devServer = {
                ...webpackConfig.devServer,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                },
            };
            webpackConfig.plugins.push(
                new ModuleFederationPlugin({
                    name: "authmf",

                    filename: "remoteEntry.js",

                    exposes: {
                        "./Login": "./src/pages/Login",
                        "./Registration": "./src/pages/Registration",
                    },

                    shared: {
                        react: {
                            singleton: true,
                            requiredVersion: false,
                        },
                        "react-dom": {
                            singleton: true,
                            requiredVersion: false,
                        },
                        "react-router-dom": {
                            singleton: true,
                            requiredVersion: false,
                        },
                    }
                })
            );

            return webpackConfig;
        },
    },

};