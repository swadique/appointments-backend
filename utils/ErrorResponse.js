function ErrorResponse(message) {
  this.success = false;
  this.message = message;
}
module.exports = ErrorResponse