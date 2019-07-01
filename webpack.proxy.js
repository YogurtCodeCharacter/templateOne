module.exports = {
        contentBase: './dist',
        hot: true,
        proxy: {
            "/api": {
              target: "http://localhost:3000",
              pathRewrite: {"^/api" : ""},
              secure: false
            }
          }
}