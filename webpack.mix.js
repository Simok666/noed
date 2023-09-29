const { EnvironmentPlugin } = require('webpack')
const mix = require('laravel-mix')
const glob = require('glob')
const path = require('path')
var env = require('cross-env');
require('dotenv').config();

/*
 |--------------------------------------------------------------------------
 | Mix config
 |--------------------------------------------------------------------------
 */
//  mix.js("resources/js/app.js", "public/js")
//  .postCss("resources/assets/src/css/index.css", "public/css", [
//    require("tailwindcss"),
//  ]);
 
mix.options({
    postCss: [require('autoprefixer')]
});

/*
 |--------------------------------------------------------------------------
 | Webpack config
 |--------------------------------------------------------------------------
 */

mix.webpackConfig({
    plugins: [
        new EnvironmentPlugin({
            // Application's public url
            BASE_URL: '/'
        })
    ],
    module: {
        rules: [{
            test: /node_modules(?:\/|\\).+\.m?js$/,
            loader: 'babel-loader',
            include: [
                path.join(__dirname, 'node_modules/bootstrap-vue'),
                path.join(__dirname, 'node_modules/vuejs-datepicker'),
                path.join(__dirname, 'node_modules/vue-echarts'),
                path.join(__dirname, 'node_modules/resize-detector'),
                path.join(__dirname, 'node_modules/vue-c3'),
                path.join(__dirname, 'node_modules/vue-masonry'),
                path.join(__dirname, 'node_modules/vue-cropper'),
                path.join(__dirname, 'node_modules/vuedraggable'),
                path.join(__dirname, 'node_modules/sweet-modal-vue'),
                path.join(__dirname, 'node_modules/vue-simplemde'),
                path.join(__dirname, 'node_modules/vue2-dropzone'),
                path.join(__dirname, 'node_modules/dropzone'),
                path.join(__dirname, 'node_modules/marked'),
                path.join(__dirname, 'node_modules/vue-plyr'),
                path.join(__dirname, 'node_modules/swiper'),
                path.join(__dirname, 'node_modules/dom7')
            ],
            options: Object.assign({}, require('./package.json').babel, {
                babelrc: false
            })
        }]
    },
    resolve: {
        alias: {
            '@': path.join(__dirname, 'resources/assets/src'),
            'node_modules': path.join(__dirname, 'node_modules')
        }
    }
})

/*
 |--------------------------------------------------------------------------
 | Vendor assets
 |--------------------------------------------------------------------------
 */

function mixAssetsDir(query, cb) {
    (glob.sync('resources/assets/' + query) || []).forEach(f => {
        f = f.replace(/[\\\/]+/g, '/');
        cb(f, f.replace('resources/assets', 'public'));
    });
}

const sassOptions = {
    implementation: () => require('node-sass')
};

// Core stylesheets
mix.sass('resources/assets/src/vendor/styles/rtl/bootstrap.scss', 'public/vendor/css', sassOptions)
   .sass('resources/assets/src/vendor/styles/rtl/bootstrap-material.scss', 'public/vendor/css', sassOptions)
   .sass('resources/assets/src/vendor/styles/rtl/bootstrap-dark.scss', 'public/vendor/css', sassOptions)
   .sass('resources/assets/src/vendor/styles/rtl/appwork.scss', 'public/vendor/css', sassOptions)
   .sass('resources/assets/src/vendor/styles/rtl/appwork-material.scss', 'public/vendor/css', sassOptions)
   .sass('resources/assets/src/vendor/styles/rtl/appwork-dark.scss', 'public/vendor/css', sassOptions)
   .sass('resources/assets/src/vendor/styles/rtl/colors.scss', 'public/vendor/css', sassOptions)
   .sass('resources/assets/src/vendor/styles/rtl/colors-material.scss', 'public/vendor/css', sassOptions)
   .sass('resources/assets/src/vendor/styles/rtl/colors-dark.scss', 'public/vendor/css', sassOptions)
   .sass('resources/assets/src/vendor/styles/rtl/uikit.scss', 'public/vendor/css', sassOptions);

// Themes
mix.sass('resources/assets/src/vendor/styles/rtl/theme-air.scss', 'public/vendor/css', sassOptions)
   .sass('resources/assets/src/vendor/styles/rtl/theme-air-material.scss', 'public/vendor/css', sassOptions)
   .sass('resources/assets/src/vendor/styles/rtl/theme-air-dark.scss', 'public/vendor/css', sassOptions)
   .sass('resources/assets/src/vendor/styles/rtl/theme-corporate.scss', 'public/vendor/css', sassOptions)
   .sass('resources/assets/src/vendor/styles/rtl/theme-corporate-material.scss', 'public/vendor/css', sassOptions)
   .sass('resources/assets/src/vendor/styles/rtl/theme-corporate-dark.scss', 'public/vendor/css', sassOptions)
   .sass('resources/assets/src/vendor/styles/rtl/theme-cotton.scss', 'public/vendor/css', sassOptions)
   .sass('resources/assets/src/vendor/styles/rtl/theme-cotton-material.scss', 'public/vendor/css', sassOptions)
   .sass('resources/assets/src/vendor/styles/rtl/theme-cotton-dark.scss', 'public/vendor/css', sassOptions)
   .sass('resources/assets/src/vendor/styles/rtl/theme-gradient.scss', 'public/vendor/css', sassOptions)
   .sass('resources/assets/src/vendor/styles/rtl/theme-gradient-material.scss', 'public/vendor/css', sassOptions)
   .sass('resources/assets/src/vendor/styles/rtl/theme-gradient-dark.scss', 'public/vendor/css', sassOptions)
   .sass('resources/assets/src/vendor/styles/rtl/theme-paper.scss', 'public/vendor/css', sassOptions)
   .sass('resources/assets/src/vendor/styles/rtl/theme-paper-material.scss', 'public/vendor/css', sassOptions)
   .sass('resources/assets/src/vendor/styles/rtl/theme-paper-dark.scss', 'public/vendor/css', sassOptions)
   .sass('resources/assets/src/vendor/styles/rtl/theme-shadow.scss', 'public/vendor/css', sassOptions)
   .sass('resources/assets/src/vendor/styles/rtl/theme-shadow-material.scss', 'public/vendor/css', sassOptions)
   .sass('resources/assets/src/vendor/styles/rtl/theme-shadow-dark.scss', 'public/vendor/css', sassOptions)
   .sass('resources/assets/src/vendor/styles/rtl/theme-soft.scss', 'public/vendor/css', sassOptions)
   .sass('resources/assets/src/vendor/styles/rtl/theme-soft-material.scss', 'public/vendor/css', sassOptions)
   .sass('resources/assets/src/vendor/styles/rtl/theme-soft-dark.scss', 'public/vendor/css', sassOptions)
   .sass('resources/assets/src/vendor/styles/rtl/theme-sunrise.scss', 'public/vendor/css', sassOptions)
   .sass('resources/assets/src/vendor/styles/rtl/theme-sunrise-material.scss', 'public/vendor/css', sassOptions)
   .sass('resources/assets/src/vendor/styles/rtl/theme-sunrise-dark.scss', 'public/vendor/css', sassOptions)
   .sass('resources/assets/src/vendor/styles/rtl/theme-twitlight.scss', 'public/vendor/css', sassOptions)
   .sass('resources/assets/src/vendor/styles/rtl/theme-twitlight-material.scss', 'public/vendor/css', sassOptions)
   .sass('resources/assets/src/vendor/styles/rtl/theme-twitlight-dark.scss', 'public/vendor/css', sassOptions)
   .sass('resources/assets/src/vendor/styles/rtl/theme-vibrant.scss', 'public/vendor/css', sassOptions)
   .sass('resources/assets/src/vendor/styles/rtl/theme-vibrant-material.scss', 'public/vendor/css', sassOptions)
   .sass('resources/assets/src/vendor/styles/rtl/theme-vibrant-dark.scss', 'public/vendor/css', sassOptions);

// Core javascripts
mixAssetsDir('vendor/js/**/*.js', (src, dest) => mix.scripts(src, dest));

// Fonts
mixAssetsDir('vendor/fonts/*.css', (src, dest) => mix.copy(src, dest));
mixAssetsDir('vendor/fonts/*/*', (src, dest) => mix.copy(src, dest));

/*
 |--------------------------------------------------------------------------
 | Entry point
 |--------------------------------------------------------------------------
 */

mix.js('resources/assets/src/entry-point.js', 'public');

if (Mix.isUsing('hmr')) {
    mix.disableNotifications();
} else {
    mix.version();
}
