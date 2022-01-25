// get login page
function getLoginView(request, response, next) {
  response.render("index", {
    title: "Login - Chat Application",
  });
}

module.exports = {
  getLoginView,
};
