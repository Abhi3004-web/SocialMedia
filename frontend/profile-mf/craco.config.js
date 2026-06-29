const ModuleFederationPlugin =
    require("webpack").container.ModuleFederationPlugin;

module.exports = {
    webpack: {
        configure: (webpackConfig) => {
            webpackConfig.optimization.runtimeChunk = false;
            webpackConfig.output.publicPath = "http://localhost:3002/";
            webpackConfig.output.uniqueName = "profilemf";
            webpackConfig.devServer = {
                ...webpackConfig.devServer,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                },
            };
            webpackConfig.plugins.push(
                new ModuleFederationPlugin({
                    name: "profilemf",

                    filename: "remoteEntry.js",

                    exposes: {
                        "./Dashboard": "./src/pages/Dashboard/Dashboard",
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

                        "react-redux": {
                            singleton: true,
                            requiredVersion: false,
                        },

                        "@reduxjs/toolkit": {
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