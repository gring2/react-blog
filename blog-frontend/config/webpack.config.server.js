const path = require('path');
const webpack = require('webpack');
const paths = require('./paths');
const getClientEnvironment = require('./env');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// 환경변수를 설정하기 위한 설정
const publicPath = paths.servedPath;
const publicUrl = publicPath.slice(0, -1);
const env = getClientEnvironment(publicUrl);
// style files regexes
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;
const isEnvProduction = true;

// Source maps are resource heavy and can cause out of memory issue for large source files.
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';// common function to get style loaders
const shouldUseRelativeAssetPaths = publicPath === './';

const getStyleLoaders = (cssOptions, preProcessor) => {
    const loaders = [
        isEnvProduction && {
            loader: MiniCssExtractPlugin.loader,
            options: Object.assign(
                {},
                shouldUseRelativeAssetPaths ? { publicPath: '../../' } : undefined
            ),
        },
        {
            loader: require.resolve('css-loader'),
            options: cssOptions,
        },
        {
            // Options for PostCSS as we reference these options twice
            // Adds vendor prefixing based on your specified browser support in
            // package.json
            loader: require.resolve('postcss-loader'),
            options: {
                // Necessary for external CSS imports to work
                // https://github.com/facebook/create-react-app/issues/2677
                ident: 'postcss',
                plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    require('postcss-preset-env')({
                        autoprefixer: {
                            flexbox: 'no-2009',
                        },
                        stage: 3,
                    }),
                ],
            },
        },
    ].filter(Boolean);
    if (preProcessor) {
        loaders.push({
            loader: require.resolve(preProcessor),
            options: {
            },
        });
    }
    return loaders;
};

module.exports = {
entry: paths.ssrJs,
  target: 'node', // node 전용으로 번들링한다는 것을 명시합니다.
  output: {
    path: paths.ssrBuild,
    filename: 'render.js',
    // Node.js에서 require로 불러올 수 있게 함
    libraryTarget: 'commonjs2'
  },
  module: {
    // 각 파일을 불러올 때 설정
    rules: [
      {
        // oneOf는 내부의 모든 로더를 시도해보고, 해당되는 것이 없다면
        // 최하단의 file-loader를 실행시킵니다
          oneOf: [
              // "url" loader works like "file" loader except that it embeds assets
              // smaller than specified limit in bytes as data URLs to avoid requests.
              // A missing `test` is equivalent to a match.
              {
                  test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                  loader: require.resolve('url-loader'),
                  options: {
                      limit: 10000,
                      name: 'static/media/[name].[hash:8].[ext]',
                  },
              },
              // Process application JS with Babel.
              // The preset includes JSX, Flow, TypeScript, and some ESnext features.
              {
                  test: /\.(js|mjs|jsx|ts|tsx)$/,
                  include: paths.appSrc,
                  loader: require.resolve('babel-loader'),
                  options: {
                      customize: require.resolve(
                          'babel-preset-react-app/webpack-overrides'
                      ),

                      plugins: [
                          [
                              require.resolve('babel-plugin-named-asset-import'),
                              {
                                  loaderMap: {
                                      svg: {
                                          ReactComponent: '@svgr/webpack?-svgo![path]',
                                      },
                                  },
                              },
                          ],
                      ],
                      // This is a feature of `babel-loader` for webpack (not Babel itself).
                      // It enables caching results in ./node_modules/.cache/babel-loader/
                      // directory for faster rebuilds.
                      cacheDirectory: true,
                      cacheCompression: isEnvProduction,
                      compact: isEnvProduction,
                  },
              },
              // Process any JS outside of the app with Babel.
              // Unlike the application JS, we only compile the standard ES features.
              {
                  test: /\.(js|mjs)$/,
                  exclude: /@babel(?:\/|\\{1,2})runtime/,
                  loader: require.resolve('babel-loader'),
                  options: {
                      babelrc: false,
                      configFile: false,
                      compact: false,
                      presets: [
                          [
                              require.resolve('babel-preset-react-app/dependencies'),
                              { helpers: true },
                          ],
                      ],
                      cacheDirectory: true,
                      cacheCompression: isEnvProduction,

                      // If an error happens in a package, it's possible to be
                      // because it was compiled. Thus, we don't want the browser
                      // debugger to show the original code. Instead, the code
                      // being evaluated would be much more helpful.
                      sourceMaps: false,
                  },
              },
              // "postcss" loader applies autoprefixer to our CSS.
              // "css" loader resolves paths in CSS and adds assets as dependencies.
              // "style" loader turns CSS into JS modules that inject <style> tags.
              // In production, we use MiniCSSExtractPlugin to extract that CSS
              // to a file, but in development "style" loader enables hot editing
              // of CSS.
              // By default we support CSS Modules with the extension .module.css
              {
                  test: cssRegex,
                  exclude: cssModuleRegex,
                  use: getStyleLoaders({
                      importLoaders: 1,
                      sourceMap: isEnvProduction
                          ? shouldUseSourceMap
                          : isEnvDevelopment,
                  }),
                  // Don't consider CSS imports dead code even if the
                  // containing package claims to have no side effects.
                  // Remove this when webpack adds a warning or an error for this.
                  // See https://github.com/webpack/webpack/issues/6571
                  sideEffects: true,
              },
              // Adds support for CSS Modules (https://github.com/css-modules/css-modules)
              // using the extension .module.css
              {
                  test: cssModuleRegex,
                  use: getStyleLoaders({
                      importLoaders: 1,
                      modules: true,
                      getLocalIdent: getCSSModuleLocalIdent,
                  }),
              },
              // Opt-in support for SASS (using .scss or .sass extensions).
              // By default we support SASS Modules with the
              // extensions .module.scss or .module.sass
              {
                  test: sassRegex,
                  exclude: sassModuleRegex,
                  use: getStyleLoaders(
                      {
                          importLoaders: 2,
                          sourceMap: isEnvProduction
                              ? shouldUseSourceMap
                              : isEnvDevelopment,
                      },
                      'sass-loader'
                  ),
                  // Don't consider CSS imports dead code even if the
                  // containing package claims to have no side effects.
                  // Remove this when webpack adds a warning or an error for this.
                  // See https://github.com/webpack/webpack/issues/6571
                  sideEffects: true,
              },
              // Adds support for CSS Modules, but using SASS
              // using the extension .module.scss or .module.sass
              {
                  test: sassModuleRegex,
                  use: getStyleLoaders(
                      {
                          importLoaders: 2,
                          sourceMap: isEnvProduction
                              ? shouldUseSourceMap
                              : isEnvDevelopment,
                          modules: true,
                          getLocalIdent: getCSSModuleLocalIdent,
                      },
                      'sass-loader'
                  ),
              },
              // "file" loader makes sure those assets get served by WebpackDevServer.
              // When you `import` an asset, you get its (virtual) filename.
              // In production, they would get copied to the `build` folder.
              // This loader doesn't use a "test" so it will catch all modules
              // that fall through the other loaders.
              {
                  loader: require.resolve('file-loader'),
                  // Exclude `js` files to keep "css" loader working as it injects
                  // its runtime that would otherwise be processed through "file" loader.
                  // Also exclude `html` and `json` extensions so they get processed
                  // by webpacks internal loaders.
                  exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
                  options: {
                      name: 'static/media/[name].[hash:8].[ext]',
                  },
              },
              // ** STOP ** Are you adding a new loader?
              // Make sure to add the new loader(s) before the "file" loader.
          ],
      }
    ]
  },
  resolve: {
    // NODE_PATH가 제대로 작동하도록 production에서 사용한 설정을
    // 그대로 넣어 줬습니다.
    modules: ['node_modules', paths.appNodeModules].concat(
      process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
    )
  },
  // 여기서는 환경변수 관련 플러그인만 적용해주면 됩니다.
  plugins: [
      new MiniCssExtractPlugin({
          // Options similar to the same options in webpackOptions.output
          // both options are optional
          filename: 'static/css/[name].[contenthash:8].css',
          chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
      }),
    new webpack.DefinePlugin(env.stringified),

  ],
};

