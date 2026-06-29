import deps from "./package.json";
const ModuleFederationPlugin =
    require("webpack").container.ModuleFederationPlugin;

module.exports = {
    webpack: {
        configure: (webpackConfig) => {
            webpackConfig.optimization.runtimeChunk = false;
            webpackConfig.output.publicPath = "auto";
            webpackConfig.output.uniqueName = "shell";
            webpackConfig.devServer = {
                ...webpackConfig.devServer,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                },
            };
            webpackConfig.plugins.push(
                new ModuleFederationPlugin({
                    name: "shell",

                    remotes: {
                        authmf:
                            "authmf@http://localhost:3001/remoteEntry.js",

                        profilemf:
                            "profilemf@http://localhost:3002/remoteEntry.js",
                    },

                    shared: {
                        react: {
                            singleton: true,
                            requiredVersion: deps.dependencies["react"],
                        },
                        "react-dom": {
                            singleton: true,
                            requiredVersion: deps.dependencies["react-dom"],
                        },
                        "react-router-dom": {
                            singleton: true,
                            requiredVersion: deps.dependencies["react-router-dom"],
                        },

                        "react-redux": {
                            singleton: true,
                            requiredVersion: deps.dependencies["react-redux"],
                        },

                        "@reduxjs/toolkit": {
                            singleton: true,
                            requiredVersion: deps.dependencies["@reduxjs/toolkit"],
                        },
                    }
                })
            );

            return webpackConfig;
        },
    },
};