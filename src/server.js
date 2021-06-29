const App = require("./app");

let PORT = process.env.PORT || 8000;

App.listen(PORT, () => {
  console.log(`App listen on port: ${PORT}`);
});
