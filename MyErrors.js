const invaliddataError = (message) => ({ error: true, status: 422, message });
const notFound = (message) => ({ error: true, status: 404, message });
const badRequest = (message) => ({ error: true, status: 400, message });
const conflict = (message) => ({ error: true, status: 409, message });
module.exports = {
  invaliddataError,
  notFound,
  badRequest,
  conflict,
};
