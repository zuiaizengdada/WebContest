const webpack = require("webpack");

module.exports = {

    configureWebpack: {

        plugins: [

            new webpack.ProvidePlugin({

                $: 'jquery',

                jQuery: 'jquery',

                'window.jQuery': 'jquery',

                Popper: ['popper.js', 'default']

            })

        ],
        devServer: {
            hot: true,
            open: true,
            port: 8081,
            host: "127.0.0.1"
        },


    }

}