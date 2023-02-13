// function to send a json object
const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

// function to show a success status code
const success = (request, response) => {
  const responseJSON = {
    message: 'This is a successful response',
  };

  respondJSON(request, response, 200, responseJSON);
};

// function to show a bad request without the correct parameters
const badRequest = (request, response, params) => {
  const responseJSON = {
    message: 'This request has the required parameters',
  };

  // if the request does not contain a valid=true query parameter
  if (!params.valid || params.valid !== 'true') {
    responseJSON.message = 'Missing valid query parameter set to true';
    responseJSON.id = 'badRequest';
    return respondJSON(request, response, 400, responseJSON);
  }

  // if the parameter is here, send json with a success status code
  return respondJSON(request, response, 200, responseJSON);
};

// function to show unauthorized without the correct parameters
const unauthorized = (request, response, params) => {
  const responseJSON = {
    message: 'Missing loggedIn query parameter set to yes',
  };

  // if the request does not contain a loggedIn=yes query parameter
  if (!params.logedIn || params.loggedIn !== 'yes') {
    responseJSON.message = 'Missing valid query parameter set to yes';
    responseJSON.id = 'unauthorized';
    return respondJSON(request, response, 401, responseJSON);
  }

  // if the parameter is here, send json with a success status code
  return respondJSON(request, response, 200, responseJSON);
};

// function to show forbidden
const forbidden = (request, response) => {
  const responseJSON = {
    message: 'You do not have access to this content',
    id: 'forbidden',
  };

  return respondJSON(request, response, 403, responseJSON);
};

// function to show internal server error
const internal = (request, response) => {
  const responseJSON = {
    message: 'Internal Server Error. Something went wrong',
    id: 'internalError',
  };

  return respondJSON(request, response, 500, responseJSON);
};

// function to show not implemented
const notImplemented = (request, response) => {
  const responseJSON = {
    message: 'A get request for this page has not been implemented yet. Check again later for updated content.',
    id: 'notImplemented',
  };

  return respondJSON(request, response, 501, responseJSON);
};

// function to show not found error
const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  respondJSON(request, response, 404, responseJSON);
};

module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  notFound,
};
