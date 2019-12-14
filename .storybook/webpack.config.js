module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,

    use: [
        {
        loader: require.resolve('awesome-typescript-loader'),
        },
    ],
  })

  config.module.rules.push({
    test: /\.svg$/,
    use: [
      {
        loader: "babel-loader"
      },
      {
        loader: "react-svg-loader",

        options: {
          jsx: true
        }
      }
    ]
  })

  config.resolve.extensions.push('.ts', '.tsx')
  return config
}