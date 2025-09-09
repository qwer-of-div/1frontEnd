const app = require("./server");
const port = process.env.PORT || 3002;

function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
}
app.use(logErrors);

function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: "Something failed!" });
  } else {
    next(err);
  }
}
app.use(clientErrorHandler);
function errorHandler(err, req, res, next) {
  res.status(500);
  res.render("error", { error: err });
}
app.use(errorHandler);

app.listen(port, "0.0.0.0", () => {
  console.log(`🚀 it's listening on ${port}`);
});

process.on("unhandledRejection", (p) => {
  console.error("unhandledRejection", p);
  throw new Error(p);
});

process.on("uncaughtException", function (err) {
  console.error("uncaughtException", err);
  throw new Error(err);
});
