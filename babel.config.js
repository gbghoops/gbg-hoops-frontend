module.exports = function (api) {
    api.cache(true);
    return {
        presets: ["babel-preset-expo"],
        plugins: [
            // optional, only if you ever use process.env
            "transform-inline-environment-variables",
            "expo-router/babel",
            // NOTE: this is optional, you don't *need* the compiler
            [
                "@tamagui/babel-plugin",
                {
                    components: ["tamagui"],
                    config: "./tamagui.config.ts",
                    importsWhitelist: [
                        "./src/styles/theme/colors.js",
                        "./src/styles/theme/sizes.js",
                    ],
                    logTimings: true,
                    disableExtraction: true,
                },
            ],
            [
                "module-resolver",
                {
                    root: ["./"],
                    extensions: [".ts", ".tsx"],
                    alias: {
                        "@assets": "./assets",
                        "@src": "./src",
                        "@": ["."],
                    },
                },
            ],
            // NOTE: this is only necessary if you are using reanimated for animations
            "react-native-reanimated/plugin",
        ],
    };
};
