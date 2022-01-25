const createError = require("http-errors");
function notFoundHandler(request, response, next) {
  next(createError(404, "Your requested content was not found"));
}

// default error handler
function errorHandler(error, request, response, next) {
  response.locals.error =
    process.env.NODE_ENV === "development" ? error : { message: error.message };

  response.status(error.status || 500);

  if (response.locals.isHtml) {
    response.render("error", {
      title: "Eror page",
    });
  } else {
    response.json(response.locals.error);
  }
}

module.exports = {
  notFoundHandler,
  errorHandler,
};
