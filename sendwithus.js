var API_PROTOCOL       = 'https';
var API_HOST           = 'beta.sendwithus.com';
var API_VERSION        = '1_0';
var API_HEADER_KEY     = 'X-SWU-API-KEY';
var API_HEADER_CLIENT  = 'X-SWU-API-CLIENT';
var API_CLIENT         = 'parse';

var Sendwithus = function Sendwithus(apiKey, debug) {
  this.API_KEY = apiKey;
  this.DEBUG = debug || false;

  this._debug('Debug enabled');
};

Sendwithus.prototype._debug = function(str) {
  if (this.DEBUG) {
    console.log('SENDWITHUS: ' + str);
  }
};

Sendwithus.prototype._buildHeaders = function() {
  var headers = { };
  headers[API_HEADER_KEY] = this.API_KEY;
  headers[API_HEADER_CLIENT] = API_CLIENT;
  headers['Content-Type'] = 'application/json';

  this._debug('Set headers: ' + JSON.stringify(headers));

  return headers;
};


Sendwithus.prototype._buildUrl = function(endpoint) {
  var url = API_PROTOCOL + '://' +
            API_HOST + '/api/' +
            'v' + API_VERSION + '/';

  if (endpoint) {
    url += endpoint;
  }

  this._debug('Built url: ' + url);

  return url;
};

Sendwithus.prototype._handleResponse = function(result, response, callback) {
  if (response.status === 200) {
    callback(null, result);
    this._debug('Response 200: ' + JSON.stringify(result));
  } else {
    this._debug('Response ' + response.status + ': ' + JSON.stringify(result));
    var err = {message: 'Request failed with ' + response.status, status: response.status };
    callback(err, result);
  }
};


////////////////////////////
// PUBLIC METHODS 

Sendwithus.prototype.send = function(data, callback) {
  var url = this._buildUrl('send');

  var headers = this._buildHeaders();

  var that = this;

  Parse.Cloud.httpRequest({
      method: "POST",
      url: url,
      body: data,
      headers: headers,
      async: true
    }).then(function(response) {
      that._handleResponse.call(that, response.data, response, callback);
    }, function(response) {
      that._handleResponse.call(that, response.data, response, callback);
    });
};

Sendwithus.prototype.emails = function(callback) {
  var url = this._buildUrl('emails');

  var headers = this._buildHeaders();

  var that = this;
  
  Parse.Cloud.httpRequest({
      url: url,
      headers: headers,
      async: true
    }).then(function(response) {
      that._handleResponse.call(that, response.data, response, callback);
    }, function(response) {
      that._handleResponse.call(that, response.data, response, callback);
    });
};


module.exports = function(apiKey, debug) {
  return new Sendwithus(apiKey, debug);
};