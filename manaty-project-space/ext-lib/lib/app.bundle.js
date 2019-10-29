webpackJsonp([1],{

/***/ "./src/main.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__("./node_modules/react/react.js");

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__("./node_modules/react-dom/index.js");

var _reactRouterDom = __webpack_require__("./node_modules/react-router-dom/es/index.js");

var _keycloakJs = __webpack_require__("./node_modules/keycloak-js/dist/keycloak.js");

var _keycloakJs2 = _interopRequireDefault(_keycloakJs);

var _properties = __webpack_require__("./src/properties.js");

var properties = _interopRequireWildcard(_properties);

var _LocalStorageService = __webpack_require__("./src/meveo/services/LocalStorageService.js");

var _LocalStorageService2 = _interopRequireDefault(_LocalStorageService);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var keycloak = (0, _keycloakJs2.default)(properties.keycloakConfigURL);

var MainComponent = __webpack_require__("./src/meveo/pages/MainComponent.jsx");

var IndexComponent = __webpack_require__("./src/meveo/pages/public/IndexComponent.jsx");
var LoginComponent = __webpack_require__("./src/meveo/pages/public/LoginComponent.jsx");
var SignupComponent = __webpack_require__("./src/meveo/pages/public/SignupCustomerComponent.jsx");
var ForgotPasswordComponent = __webpack_require__("./src/meveo/pages/public/ForgotPasswordComponent.jsx");
var ResetPasswordComponent = __webpack_require__("./src/meveo/pages/public/ResetPasswordComponent.jsx");
var ContactComponent = __webpack_require__("./src/meveo/pages/public/ContactComponent.jsx");
var HowitworksComponent = __webpack_require__("./src/meveo/pages/public/HowitworksComponent.jsx");
var AboutUsComponent = __webpack_require__("./src/meveo/pages/public/AboutUsComponent.jsx");
var FaqComponent = __webpack_require__("./src/meveo/pages/public/FaqComponent.jsx");
var VerifyEmailComponent = __webpack_require__("./src/meveo/pages/public/VerifyEmailComponent.jsx");

var UserProfile = __webpack_require__("./src/meveo/pages/user/UserProfile.jsx");
var UserTeam = __webpack_require__("./src/meveo/pages/user/UserTeam.jsx");
var UserProjects = __webpack_require__("./src/meveo/pages/user/UserProjects.jsx");
var ChangePassword = __webpack_require__("./src/meveo/pages/user/ChangePassword.jsx");
var Mobile = __webpack_require__("./src/meveo/pages/user/Mobile.jsx");

function SheduleTokenRefresh() {
	setInterval(function () {
		keycloak.updateToken(properties.tokenRefreshRate).success(function (refreshed) {
			console.log("refreshed ==>");
			console.log(refreshed);
			if (refreshed) {
				console.log("TOKEN REFRESH::::::::::::");
				console.log(keycloak);
				_LocalStorageService2.default.setToken(keycloak.token);
			}
		}).error(function () {
			console.log('Keycloak failed to refresh');
		});
	}, properties.tokenRefreshRate * 1000);
}

keycloak.init({
	onLoad: 'login-required'

}).success(function (authenticated) {
	if (authenticated) {
		SheduleTokenRefresh();
		_LocalStorageService2.default.setToken(keycloak.token);
		_LocalStorageService2.default.setTokenParsed(keycloak.tokenParsed);
		(0, _reactDom.render)(_react2.default.createElement(
			_reactRouterDom.HashRouter,
			null,
			_react2.default.createElement(
				MainComponent,
				{ kc: keycloak },
				_react2.default.createElement(_reactRouterDom.Route, { exact: true, path: properties.index_url, component: UserProfile }),
				_react2.default.createElement(_reactRouterDom.Route, { exact: true, path: properties.team_url, component: UserTeam }),
				_react2.default.createElement(_reactRouterDom.Route, { exact: true, path: properties.projects_url, component: UserProjects }),
				_react2.default.createElement(_reactRouterDom.Route, { exact: true, path: properties.change_password, component: ChangePassword }),
				_react2.default.createElement(_reactRouterDom.Route, { path: properties.faq_url, component: LoginComponent }),
				_react2.default.createElement(_reactRouterDom.Route, { path: properties.how_it_works_url, component: HowitworksComponent }),
				_react2.default.createElement(_reactRouterDom.Route, { exact: true, path: properties.about_url, component: AboutUsComponent }),
				_react2.default.createElement(_reactRouterDom.Route, { path: properties.contact_url, component: ContactComponent })
			)
		), document.getElementById('vpp_module'));
	} else {
		keycloak.login();
	}
}).error(function () {
	console.log('Keycloak failed to initialize');
});

/***/ }),

/***/ "./src/meveo/FrontendError.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getPrototypeOf = __webpack_require__("./node_modules/babel-runtime/core-js/object/get-prototype-of.js");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__("./node_modules/babel-runtime/helpers/possibleConstructorReturn.js");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__("./node_modules/babel-runtime/helpers/inherits.js");

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FrontendError = function (_Error) {
  (0, _inherits3.default)(FrontendError, _Error);

  function FrontendError(message) {
    (0, _classCallCheck3.default)(this, FrontendError);

    var _this = (0, _possibleConstructorReturn3.default)(this, (FrontendError.__proto__ || (0, _getPrototypeOf2.default)(FrontendError)).call(this, message));

    _this.name = _this.constructor.name;
    _this.message = message;

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(_this, _this.constructor);
    } else {
      _this.stack = new Error(message).stack;
    }

    return _this;
  }

  return FrontendError;
}(Error);

exports.default = FrontendError;

/***/ }),

/***/ "./src/meveo/MeveoAPI.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fetch) {

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _getIterator2 = __webpack_require__("./node_modules/babel-runtime/core-js/get-iterator.js");

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _promise = __webpack_require__("./node_modules/babel-runtime/core-js/promise.js");

var _promise2 = _interopRequireDefault(_promise);

var _stringify = __webpack_require__("./node_modules/babel-runtime/core-js/json/stringify.js");

var _stringify2 = _interopRequireDefault(_stringify);

var _classCallCheck2 = __webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__("./node_modules/babel-runtime/helpers/createClass.js");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MeveoAPI = function () {
    function MeveoAPI(hostKeycloak, host, credentials, providerCode) {
        (0, _classCallCheck3.default)(this, MeveoAPI);

        this.hostKeycloak = hostKeycloak;
        this.host = host;
        this.providerCode = providerCode;
        this.credentials = credentials;

        this.requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Methods': 'DELETE, GET, OPTIONS, POST, PUT',
                'Access-Control-Allow-Headers': 'x-requested-with, Content-Type, origin, authorization, accept, client-security-token',
                'Access-Control-Max-Age': '1000',
                'Authorization': 'Bearer ' + credentials
            },
            mode: 'cors',
            cache: 'no-cache'
        };
    }

    (0, _createClass3.default)(MeveoAPI, [{
        key: 'checkStatus',
        value: function checkStatus(response) {
            if (response.status >= 200 && response.status < 300) {
                return response;
            } else {
                var error = new Error(response.statusText);
                error.response = response;
                throw error;
            }
        }
    }, {
        key: 'parseJSON',
        value: function parseJSON(response) {
            return response.json();
        }
    }, {
        key: 'parseText',
        value: function parseText(response) {
            return response.text();
        }
    }, {
        key: 'invokeRequest',
        value: function invokeRequest(payload, url, method) {
            this.requestOptions.body = (0, _stringify2.default)(payload);
            return this.fetch(url, method);
        }
    }, {
        key: 'fetch',
        value: function (_fetch) {
            function fetch(_x, _x2) {
                return _fetch.apply(this, arguments);
            }

            fetch.toString = function () {
                return _fetch.toString();
            };

            return fetch;
        }(function (page, method) {
            var _this = this;

            this.requestOptions.method = method;
            var self = this;
            return new _promise2.default(function (resolve, reject) {
                fetch(_this.host + page, _this.requestOptions).then(_this.checkStatus).then(function (data) {
                    data = self.parseJSON(data);
                    //console.log('request succeeded with JSON response', data);
                    resolve(data);
                }).catch(function (error) {
                    //console.log('request failed', error);
                    reject(error);
                });
            });
        })
    }, {
        key: 'createCustomEntity',
        value: function createCustomEntity(entity) {
            var _this2 = this;

            var self = this;
            this.requestOptions.method = "POST";
            this.requestOptions.body = entity.meveoJson;
            var action = this.host + "/api/rest/customEntityInstance/";
            return new _promise2.default(function (resolve, reject) {
                fetch(action, _this2.requestOptions).then(_this2.checkStatus).then(function (data) {
                    data = self.parseJSON(data);
                    console.log('request succeeded with JSON response', data);
                    resolve(data);
                }).catch(function (error) {
                    console.log('request failed', error);
                    reject(error);
                });
            });
        }
    }, {
        key: 'createCRMAccountHierarchy',
        value: function createCRMAccountHierarchy(entity) {
            var _this3 = this;

            console.log("createCRMAccountHierarchy....");
            this.requestOptions.method = "POST";
            this.requestOptions.body = entity.meveoJson;
            var action = this.host + "/inbound/" + this.providerCode + "/registration";
            console.log("action: " + action);
            return new _promise2.default(function (resolve, reject) {
                fetch(action, _this3.requestOptions).then(_this3.checkStatus).then(_this3.parseJSON).then(function (data) {
                    console.log('request succeeded with JSON response', data);
                    resolve(data);
                }).catch(function (error) {
                    console.log('request failed', error);
                    reject(error);
                });
            });
        }
    }, {
        key: 'updateCRMAccountHierarchy',
        value: function updateCRMAccountHierarchy(entity) {
            var _this4 = this;

            //console.log(entity);
            this.requestOptions.method = "POST";
            this.requestOptions.body = entity.meveoJson;
            var action = this.host + "/api/rest/account/accountHierarchy/updateCRMAccountHierarchy";
            console.log("action: " + action);
            return new _promise2.default(function (resolve, reject) {
                fetch(action, _this4.requestOptions).then(_this4.checkStatus).then(_this4.parseJSON).then(function (data) {
                    console.log('request succeeded with JSON response', data);
                    resolve(data);
                }).catch(function (error) {
                    console.log('request failed', error);
                    reject(error);
                });
            });
        }
    }, {
        key: 'createOrUpdate',
        value: function createOrUpdate(entity) {
            var _this5 = this;

            //console.log(entity);
            this.requestOptions.method = "POST";
            this.requestOptions.body = entity.meveoJson;
            var action = this.host + "/api/rest/user/createOrUpdate";
            console.log("action: " + action);
            return new _promise2.default(function (resolve, reject) {
                fetch(action, _this5.requestOptions).then(_this5.checkStatus).then(_this5.parseJSON).then(function (data) {
                    console.log('request succeeded with JSON response', data);
                    resolve(data);
                }).catch(function (error) {
                    console.log('request failed', error);
                    reject(error);
                });
            });
        }
    }, {
        key: 'forgotPassword',
        value: function forgotPassword(email) {
            var _this6 = this;

            this.requestOptions.method = "POST";
            this.requestOptions.headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Methods': 'DELETE, GET, OPTIONS, POST, PUT',
                'Access-Control-Allow-Headers': 'x-requested-with, Content-Type, origin, authorization, accept, client-security-token',
                'Access-Control-Max-Age': '1000'
            };
            var action = this.host + "/api/rest/iep/public/resetPassword/" + email;
            return new _promise2.default(function (resolve, reject) {
                fetch(action, _this6.requestOptions).then(_this6.checkStatus).then(_this6.parseJSON).then(function (data) {
                    //console.log('request succeeded with JSON response', data)
                    resolve(data);
                }).catch(function (error) {
                    //console.log('request failed', error);
                    reject(error);
                });
            });
        }
    }, {
        key: 'find_user',
        value: function find_user(user_email) {
            var _this7 = this;

            var user_data = { "customerCode": user_email };
            this.requestOptions.method = "POST";
            this.requestOptions.body = (0, _stringify2.default)(user_data);
            var action = this.host + "/api/rest/account/accountHierarchy/find";
            return new _promise2.default(function (resolve, reject) {
                fetch(action, _this7.requestOptions).then(_this7.checkStatus).then(_this7.parseJSON).then(function (data) {
                    // console.log('request succeeded with JSON response', data)
                    resolve(data);
                }).catch(function (error) {
                    //console.log('request failed', error);
                    reject(error);
                });
            });
        }
    }, {
        key: 'contact',
        value: function contact(contact_data) {
            var _this8 = this;

            this.requestOptions.method = "POST";
            this.requestOptions.body = (0, _stringify2.default)(contact_data);
            var action = this.host + "/api/rest/account/contact/";
            return new _promise2.default(function (resolve, reject) {
                fetch(action, _this8.requestOptions).then(_this8.checkStatus).then(_this8.parseJSON).then(function (data) {
                    console.log('request succeeded with JSON response', data);
                    resolve(data);
                }).catch(function (error) {
                    console.log('request failed', error);
                    reject(error);
                });
            });
        }
    }, {
        key: 'find_user_details',
        value: function find_user_details(user_name) {
            var _this9 = this;

            this.requestOptions.method = "GET";
            var action = this.host + "/api/rest/manaty/user/" + user_name;
            return new _promise2.default(function (resolve, reject) {
                fetch(action, _this9.requestOptions).then(_this9.checkStatus).then(_this9.parseJSON).then(function (data) {
                    // console.log('request succeeded with JSON response', data)
                    resolve(data);
                }).catch(function (error) {
                    //console.log('request failed', error);
                    reject(error);
                });
            });
        }
    }, {
        key: 'edit_profile_user',
        value: function edit_profile_user(user_data) {
            var _this10 = this;

            //console.log(entity);
            this.requestOptions.method = "PUT";
            this.requestOptions.body = (0, _stringify2.default)(user_data);
            var action = this.host + "/api/rest/manaty/user/";
            return new _promise2.default(function (resolve, reject) {
                fetch(action, _this10.requestOptions).then(_this10.checkStatus).then(_this10.parseJSON).then(function (data) {

                    resolve(data);
                }).catch(function (error) {
                    //console.log('request failed', error);
                    reject(error);
                });
            });
        }
    }, {
        key: 'edit_image_user',
        value: function edit_image_user(user_data) {
            var _this11 = this;

            //console.log(entity);
            this.requestOptions.method = "PUT";
            this.requestOptions.body = (0, _stringify2.default)(user_data);
            var action = this.host + "/api/rest/manaty/user/image";
            return new _promise2.default(function (resolve, reject) {
                fetch(action, _this11.requestOptions).then(_this11.checkStatus).then(_this11.parseJSON).then(function (data) {

                    resolve(data);
                }).catch(function (error) {
                    //console.log('request failed', error);
                    reject(error);
                });
            });
        }
    }, {
        key: 'get_countries',
        value: function get_countries(byUser) {
            var _this12 = this;

            this.requestOptions.method = "GET";
            var action = this.host + "/api/rest/vppCase/localisations/" + byUser;
            return new _promise2.default(function (resolve, reject) {
                fetch(action, _this12.requestOptions).then(_this12.checkStatus).then(_this12.parseJSON).then(function (data) {
                    // console.log('request succeeded with JSON response', data)
                    resolve(data);
                }).catch(function (error) {
                    //console.log('request failed', error);
                    reject(error);
                });
            });
        }
    }, {
        key: 'edit_skills_user',
        value: function edit_skills_user(user_data) {
            var _this13 = this;

            //console.log(entity);
            this.requestOptions.method = "PUT";
            this.requestOptions.body = (0, _stringify2.default)(user_data);
            var action = this.host + "/api/rest/manaty/user/skills/";
            return new _promise2.default(function (resolve, reject) {
                fetch(action, _this13.requestOptions).then(_this13.checkStatus).then(_this13.parseJSON).then(function (data) {

                    resolve(data);
                }).catch(function (error) {
                    //console.log('request failed', error);
                    reject(error);
                });
            });
        }
    }, {
        key: 'edit_projects_user',
        value: function edit_projects_user(user_data) {
            var _this14 = this;

            //console.log(entity);
            this.requestOptions.method = "PUT";
            this.requestOptions.body = (0, _stringify2.default)(user_data);
            var action = this.host + "/api/rest/manaty/user/projects/";
            return new _promise2.default(function (resolve, reject) {
                fetch(action, _this14.requestOptions).then(_this14.checkStatus).then(_this14.parseJSON).then(function (data) {

                    resolve(data);
                }).catch(function (error) {
                    //console.log('request failed', error);
                    reject(error);
                });
            });
        }
    }, {
        key: 'edit_availability_user',
        value: function edit_availability_user(user_data) {
            var _this15 = this;

            //console.log(entity);
            this.requestOptions.method = "PUT";
            this.requestOptions.body = (0, _stringify2.default)(user_data);
            var action = this.host + "/api/rest/manaty/user/availability/";
            return new _promise2.default(function (resolve, reject) {
                fetch(action, _this15.requestOptions).then(_this15.checkStatus).then(_this15.parseJSON).then(function (data) {

                    resolve(data);
                }).catch(function (error) {
                    //console.log('request failed', error);
                    reject(error);
                });
            });
        }
    }, {
        key: 'edit_bio_user',
        value: function edit_bio_user(user_data) {
            var _this16 = this;

            //console.log(entity);
            this.requestOptions.method = "PUT";
            this.requestOptions.body = (0, _stringify2.default)(user_data);
            var action = this.host + "/api/rest/manaty/user/bio/";
            return new _promise2.default(function (resolve, reject) {
                fetch(action, _this16.requestOptions).then(_this16.checkStatus).then(_this16.parseJSON).then(function (data) {

                    resolve(data);
                }).catch(function (error) {
                    //console.log('request failed', error);
                    reject(error);
                });
            });
        }
    }, {
        key: 'download_image_file',
        value: function download_image_file(file_name) {
            var _this17 = this;

            this.requestOptions.method = "GET";
            var action = this.host + "/api/rest/manaty/user/downloadFile?file=" + file_name;
            return new _promise2.default(function (resolve, reject) {
                fetch(action, _this17.requestOptions).then(_this17.checkStatus).then(_this17.parseJSON).then(function (data) {
                    // console.log('request succeeded with JSON response', data)
                    resolve(data);
                }).catch(function (error) {
                    //console.log('request failed', error);
                    reject(error);
                });
            });
        }
    }, {
        key: 'upload_file',
        value: function upload_file(data) {
            var _this18 = this;

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = (0, _getIterator3.default)(data.entries()), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var pair = _step.value;

                    console.log(pair[0] + ', ' + pair[1]);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            var requestOptions = {
                method: "POST",
                mode: 'cors',
                cache: 'no-cache',
                headers: {
                    'Authorization': 'Bearer ' + this.credentials
                },
                body: data
            };
            var action = this.host + "/api/rest/admin/files/upload";
            return new _promise2.default(function (resolve, reject) {
                fetch(action, requestOptions, data).then(_this18.checkStatus).then(_this18.parseJSON).then(function (data) {
                    // console.log('request succeeded with JSON response', data)
                    resolve(data);
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                        for (var _iterator2 = (0, _getIterator3.default)(data.entries()), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var pair = _step2.value;

                            console.log(pair[0] + ', ' + pair[1]);
                        }
                    } catch (err) {
                        _didIteratorError2 = true;
                        _iteratorError2 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                _iterator2.return();
                            }
                        } finally {
                            if (_didIteratorError2) {
                                throw _iteratorError2;
                            }
                        }
                    }
                }).catch(function (error) {
                    //console.log('request failed', error);
                    reject(error);
                });
            });
        }
    }, {
        key: 'download_CV_file',
        value: function download_CV_file(file_name) {
            var _this19 = this;

            var requestOptions = {
                method: "GET",
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/msword',
                    'Authorization': 'Bearer ' + this.credentials,
                    'Content-disposition': 'attachment;filename=' + file_name
                }

            };
            var action = this.host + "/api/rest/admin/files/downloadFile?file=" + file_name;
            return new _promise2.default(function (resolve, reject) {
                fetch(action, _this19.requestOptions).then(_this19.checkStatus).then(_this19.parseJSON).then(function (data) {
                    // console.log('request succeeded with JSON response', data)
                    resolve(data);
                }).catch(function (error) {
                    //console.log('request failed', error);
                    reject(error);
                });
            });
        }
    }, {
        key: 'upload_file_CV',
        value: function upload_file_CV(data) {
            var _this20 = this;

            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = (0, _getIterator3.default)(data.entries()), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var pair = _step3.value;

                    console.log(pair[0] + ', ' + pair[1]);
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }

            var requestOptions = {
                method: "POST",
                mode: 'cors',
                cache: 'no-cache',
                headers: {
                    'Authorization': 'Bearer ' + this.credentials
                },
                body: data
            };
            var action = this.host + "/api/rest/admin/files/upload";
            return new _promise2.default(function (resolve, reject) {
                fetch(action, requestOptions, data).then(_this20.checkStatus).then(_this20.parseJSON).then(function (data) {
                    // console.log('request succeeded with JSON response', data)
                    resolve(data);
                    var _iteratorNormalCompletion4 = true;
                    var _didIteratorError4 = false;
                    var _iteratorError4 = undefined;

                    try {
                        for (var _iterator4 = (0, _getIterator3.default)(data.entries()), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                            var pair = _step4.value;

                            console.log(pair[0] + ', ' + pair[1]);
                        }
                    } catch (err) {
                        _didIteratorError4 = true;
                        _iteratorError4 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion4 && _iterator4.return) {
                                _iterator4.return();
                            }
                        } finally {
                            if (_didIteratorError4) {
                                throw _iteratorError4;
                            }
                        }
                    }
                }).catch(function (error) {
                    //console.log('request failed', error);
                    reject(error);
                });
            });
        }
    }, {
        key: 'find_all_users',
        value: function find_all_users() {
            var _this21 = this;

            this.requestOptions.method = "GET";
            var action = this.host + "/api/rest/manaty/users";
            return new _promise2.default(function (resolve, reject) {
                fetch(action, _this21.requestOptions).then(_this21.checkStatus).then(_this21.parseJSON).then(function (data) {
                    // console.log('request succeeded with JSON response', data)
                    resolve(data);
                }).catch(function (error) {
                    //console.log('request failed', error);
                    reject(error);
                });
            });
        }
    }, {
        key: 'find_all_project',
        value: function find_all_project() {
            var _this22 = this;

            this.requestOptions.method = "GET";
            var action = this.host + "/api/rest/manaty/projects";
            return new _promise2.default(function (resolve, reject) {
                fetch(action, _this22.requestOptions).then(_this22.checkStatus).then(_this22.parseJSON).then(function (data) {
                    // console.log('request succeeded with JSON response', data)
                    resolve(data);
                }).catch(function (error) {
                    //console.log('request failed', error);
                    reject(error);
                });
            });
        }
    }, {
        key: 'find_project_details',
        value: function find_project_details(projectName) {
            var _this23 = this;

            this.requestOptions.method = "GET";
            var action = this.host + "/api/rest/manaty/project/" + projectName;
            return new _promise2.default(function (resolve, reject) {
                fetch(action, _this23.requestOptions).then(_this23.checkStatus).then(_this23.parseJSON).then(function (data) {
                    // console.log('request succeeded with JSON response', data)
                    resolve(data);
                }).catch(function (error) {
                    //console.log('request failed', error);
                    reject(error);
                });
            });
        }
    }, {
        key: 'edit_client_project',
        value: function edit_client_project(user_data) {
            var _this24 = this;

            //console.log(entity);
            this.requestOptions.method = "PUT";
            this.requestOptions.body = (0, _stringify2.default)(user_data);
            var action = this.host + "/api/rest/manaty/project/update";
            return new _promise2.default(function (resolve, reject) {
                fetch(action, _this24.requestOptions).then(_this24.checkStatus).then(_this24.parseJSON).then(function (data) {

                    resolve(data);
                }).catch(function (error) {
                    //console.log('request failed', error);
                    reject(error);
                });
            });
        }
    }, {
        key: 'edit_assembla_project',
        value: function edit_assembla_project(user_data) {
            var _this25 = this;

            //console.log(entity);
            this.requestOptions.method = "PUT";
            this.requestOptions.body = (0, _stringify2.default)(user_data);
            var action = this.host + "/api/rest/manaty/project/update/assembla";
            return new _promise2.default(function (resolve, reject) {
                fetch(action, _this25.requestOptions).then(_this25.checkStatus).then(_this25.parseJSON).then(function (data) {

                    resolve(data);
                }).catch(function (error) {
                    //console.log('request failed', error);
                    reject(error);
                });
            });
        }
    }, {
        key: 'upload_image_project',
        value: function upload_image_project(data) {
            var _this26 = this;

            var _iteratorNormalCompletion5 = true;
            var _didIteratorError5 = false;
            var _iteratorError5 = undefined;

            try {
                for (var _iterator5 = (0, _getIterator3.default)(data.entries()), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                    var pair = _step5.value;

                    console.log(pair[0] + ', ' + pair[1]);
                }
            } catch (err) {
                _didIteratorError5 = true;
                _iteratorError5 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion5 && _iterator5.return) {
                        _iterator5.return();
                    }
                } finally {
                    if (_didIteratorError5) {
                        throw _iteratorError5;
                    }
                }
            }

            var requestOptions = {
                method: "POST",
                mode: 'cors',
                cache: 'no-cache',
                headers: {
                    'Authorization': 'Bearer ' + this.credentials
                },
                body: data
            };
            var action = this.host + "/api/rest/admin/files/upload";
            return new _promise2.default(function (resolve, reject) {
                fetch(action, requestOptions, data).then(_this26.checkStatus).then(_this26.parseJSON).then(function (data) {
                    // console.log('request succeeded with JSON response', data)
                    resolve(data);
                    var _iteratorNormalCompletion6 = true;
                    var _didIteratorError6 = false;
                    var _iteratorError6 = undefined;

                    try {
                        for (var _iterator6 = (0, _getIterator3.default)(data.entries()), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                            var pair = _step6.value;

                            console.log(pair[0] + ', ' + pair[1]);
                        }
                    } catch (err) {
                        _didIteratorError6 = true;
                        _iteratorError6 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion6 && _iterator6.return) {
                                _iterator6.return();
                            }
                        } finally {
                            if (_didIteratorError6) {
                                throw _iteratorError6;
                            }
                        }
                    }
                }).catch(function (error) {
                    //console.log('request failed', error);
                    reject(error);
                });
            });
        }
    }, {
        key: 'edit_teams_project',
        value: function edit_teams_project(user_data) {
            var _this27 = this;

            //console.log(entity);
            this.requestOptions.method = "PUT";
            this.requestOptions.body = (0, _stringify2.default)(user_data);
            var action = this.host + "/api/rest/manaty/project/update/teams";
            return new _promise2.default(function (resolve, reject) {
                fetch(action, _this27.requestOptions).then(_this27.checkStatus).then(_this27.parseJSON).then(function (data) {

                    resolve(data);
                }).catch(function (error) {
                    //console.log('request failed', error);
                    reject(error);
                });
            });
        }
    }, {
        key: 'add_project_foruser',
        value: function add_project_foruser(user_data) {
            var _this28 = this;

            //console.log(entity);
            this.requestOptions.method = "PUT";
            this.requestOptions.body = (0, _stringify2.default)(user_data);
            var action = this.host + "/api/rest/manaty/user/add/user/";
            return new _promise2.default(function (resolve, reject) {
                fetch(action, _this28.requestOptions).then(_this28.checkStatus).then(_this28.parseJSON).then(function (data) {

                    resolve(data);
                }).catch(function (error) {
                    //console.log('request failed', error);
                    reject(error);
                });
            });
        }
    }, {
        key: 'edit_password',
        value: function edit_password(user_profile) {
            var _this29 = this;

            this.requestOptions.method = "POST";
            this.requestOptions.body = user_profile.meveoJson;
            var action = this.hostKeycloak + "/auth/realms/meveo/account/credentials/password";
            return new _promise2.default(function (resolve, reject) {
                fetch(action, _this29.requestOptions).then(_this29.checkStatus).then(function (data) {
                    // console.log('request succeeded with JSON response', data)
                    resolve(data);
                }).catch(function (error) {
                    console.log('request failed', error);
                    reject(error);
                });
            });
        }
    }]);
    return MeveoAPI;
}();

exports.default = MeveoAPI;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/imports-loader/index.js?this=>global!./node_modules/exports-loader/index.js?global.fetch!./node_modules/whatwg-fetch/fetch.js")))

/***/ }),

/***/ "./src/meveo/actions/Action.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _classCallCheck2 = __webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__("./node_modules/babel-runtime/helpers/createClass.js");

var _createClass3 = _interopRequireDefault(_createClass2);

var _ActionMethods = __webpack_require__("./src/meveo/actions/ActionMethods.js");

var ActionMethods = _interopRequireWildcard(_ActionMethods);

var _dispatcher = __webpack_require__("./src/meveo/dispatcher.js");

var _dispatcher2 = _interopRequireDefault(_dispatcher);

var _FrontendError = __webpack_require__("./src/meveo/FrontendError.js");

var _FrontendError2 = _interopRequireDefault(_FrontendError);

var _Error = __webpack_require__("./src/meveo/model/Error.js");

var _Error2 = _interopRequireDefault(_Error);

var _isomorphicFetch = __webpack_require__("./node_modules/isomorphic-fetch/fetch-npm-browserify.js");

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Action = function () {
	function Action(actionMethod, actionFunction) {
		(0, _classCallCheck3.default)(this, Action);

		if (actionMethod == null || actionMethod.trim() == '') {
			throw new _FrontendError2.default("actionMethod cannot be null or empty.");
		}
		if (typeof actionFunction !== 'function') {
			throw new _FrontendError2.default("actionFunction must be a function.");
		}

		this.actionMethod = actionMethod;
		this.actionFunction = actionFunction;
	}

	(0, _createClass3.default)(Action, [{
		key: 'execute',
		value: function execute() {
			this.start();
			try {
				this.actionFunction.apply(this, arguments);
			} catch (e) {
				this.fail(new _Error2.default(e));
			}
		}
	}, {
		key: 'start',
		value: function start() {
			_dispatcher2.default.dispatch({
				actionMethod: ActionMethods.startMethod(this.actionMethod)
			});
		}
	}, {
		key: 'success',
		value: function success(response) {
			_dispatcher2.default.dispatch({
				actionMethod: ActionMethods.successMethod(this.actionMethod),
				result: response
			});
		}
	}, {
		key: 'fail',
		value: function fail(error) {
			_dispatcher2.default.dispatch({
				actionMethod: ActionMethods.errorMethod(this.actionMethod),
				result: new _Error2.default(error)
			});
		}
	}]);
	return Action;
}();

exports.default = Action;

/***/ }),

/***/ "./src/meveo/actions/ActionMethods.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.startMethod = startMethod;
exports.successMethod = successMethod;
exports.errorMethod = errorMethod;
// Customer methods
var GET_CURRENT_CUSTOMER = exports.GET_CURRENT_CUSTOMER = "GET_CURRENT_CUSTOMER";
var LOGIN_USER = exports.LOGIN_USER = "LOGIN_USER";
var FORGOT_PASSWORD = exports.FORGOT_PASSWORD = "FORGOT_PASSWORD";
var SIGNUP_CUSTOMER = exports.SIGNUP_CUSTOMER = "SIGNUP_CUSTOMER";
var UPDATE_CUSTOMER = exports.UPDATE_CUSTOMER = "UPDATE_CUSTOMER";
var LOGOUT_CURRENT_CUSTOMER = exports.LOGOUT_CURRENT_CUSTOMER = "LOGOUT_CURRENT_CUSTOMER";
var UPDATE_USER = exports.UPDATE_USER = "UPDATE_USER";

// Data methods
var GET_COUNTRIES = exports.GET_COUNTRIES = "GET_COUNTRIES";
var GET_STATUSES = exports.GET_STATUSES = "GET_STATUSES";

// user methods
var GET_USER_DETAILS = exports.GET_USER_DETAILS = "GET_USER_DETAILS";
var EDIT_PROFILE_USER = exports.EDIT_PROFILE_USER = "EDIT_PROFILE_USER";
var GET_PROFILE_USERS = exports.GET_PROFILE_USERS = "GET_PROFILE_USERS";
var GET_ATTACHABLE_USERS_KEYSET = exports.GET_ATTACHABLE_USERS_KEYSET = "GET_ATTACHABLE_USERS_KEYSET";
var EDIT_SKILLS_USER = exports.EDIT_SKILLS_USER = "EDIT_SKILLS_USER";
var EDIT_PROJECTS_USER = exports.EDIT_PROJECTS_USER = "EDIT_PROJECTS_USER";
var EDIT_AVAILABILITY_USER = exports.EDIT_AVAILABILITY_USER = "EDIT_AVAILABILITY_USER";
var EDIT_BIO_USER = exports.EDIT_BIO_USER = "EDIT_BIO_USER";
var DOWNLOAD_IMAGE_FILE = exports.DOWNLOAD_IMAGE_FILE = "DOWNLOAD_IMAGE_FILE";
var UPLOAD_IMAGE_FILE = exports.UPLOAD_IMAGE_FILE = "UPLOAD_IMAGE_FILE";
var DOWNLOAD_CV_FILE = exports.DOWNLOAD_CV_FILE = "DOWNLOAD_CV_FILE";
var UPLOAD_CV_FILE = exports.UPLOAD_CV_FILE = "UPLOAD_CV_FILE";
var GET_ALL_USERS = exports.GET_ALL_USERS = "GET_ALL_USERS";
var GET_ALL_PROJECT = exports.GET_ALL_PROJECT = "GET_ALL_PROJECT";
var GET_PROJECT_DETAILS = exports.GET_PROJECT_DETAILS = "GET_PROJECT_DETAILS";
var EDIT_CLIENT_PROJECT = exports.EDIT_CLIENT_PROJECT = "EDIT_CLIENT_PROJECT";
var EDIT_ASSEMBLA_PROJECT = exports.EDIT_ASSEMBLA_PROJECT = "EDIT_ASSEMBLA_PROJECT";
var UPLOAD_IMAGE_PROJECT_FILE = exports.UPLOAD_IMAGE_PROJECT_FILE = "UPLOAD_IMAGE_PROJECT_FILE";
var EDIT_TEAMS_PROJECT = exports.EDIT_TEAMS_PROJECT = "EDIT_TEAMS_PROJECT";
var ADD_PROJECT_FOR_USER = exports.ADD_PROJECT_FOR_USER = "ADD_PROJECT_FOR_USER";
var EDIT_IMAGE_USER = exports.EDIT_IMAGE_USER = "EDIT_IMAGE_USER";
var EDIT_PASSWORD = exports.EDIT_PASSWORD = "EDIT_PASSWORD";

function startMethod(actionMethod) {
	return actionMethod + '_START';
}

function successMethod(actionMethod) {
	return actionMethod + '_SUCCESS';
}

function errorMethod(actionMethod) {
	return actionMethod + '_ERROR';
}

/***/ }),

/***/ "./src/meveo/actions/CustomerActions.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _assign = __webpack_require__("./node_modules/babel-runtime/core-js/object/assign.js");

var _assign2 = _interopRequireDefault(_assign);

var _slicedToArray2 = __webpack_require__("./node_modules/babel-runtime/helpers/slicedToArray.js");

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

exports.loginUser = loginUser;
exports.signupCustomer = signupCustomer;
exports.updateCustomer = updateCustomer;
exports.updateUser = updateUser;
exports.forgotPassword = forgotPassword;
exports.getCurrentCustomer = getCurrentCustomer;
exports.logoutCurrentCustomer = logoutCurrentCustomer;

var _Action = __webpack_require__("./src/meveo/actions/Action.js");

var _Action2 = _interopRequireDefault(_Action);

var _ActionMethods = __webpack_require__("./src/meveo/actions/ActionMethods.js");

var ActionMethods = _interopRequireWildcard(_ActionMethods);

var _CommonService = __webpack_require__("./src/meveo/services/CommonService.js");

var _CommonService2 = _interopRequireDefault(_CommonService);

var _CustomerService = __webpack_require__("./src/meveo/services/CustomerService.js");

var _CustomerService2 = _interopRequireDefault(_CustomerService);

var _LocalStorageService = __webpack_require__("./src/meveo/services/LocalStorageService.js");

var _LocalStorageService2 = _interopRequireDefault(_LocalStorageService);

var _Customer = __webpack_require__("./src/meveo/model/account/Customer.js");

var _Customer2 = _interopRequireDefault(_Customer);

var _Error = __webpack_require__("./src/meveo/model/Error.js");

var _Error2 = _interopRequireDefault(_Error);

var _Success = __webpack_require__("./src/meveo/model/Success.js");

var _Success2 = _interopRequireDefault(_Success);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var commonService = new _CommonService2.default();

var customerService = new _CustomerService2.default();

function loginUser(login) {
	var action = new _Action2.default(ActionMethods.LOGIN_USER, function (login) {
		var _this = this;

		commonService.login(login).then(function (response) {
			var actionStatus = response.actionStatus,
			    customers = response.customers;

			var _ref = customers || {},
			    customer = _ref.customer;
			//const [ firstCustomer ] = customer || [];


			if (actionStatus == null || actionStatus.status === "FAIL") {
				_this.fail(actionStatus);
				/*} else if (firstCustomer == null) {
    	this.fail({
    		message: "No customer found."
    	});*/
			} else {
				var firstCustomer = [];
				firstCustomer.code = login.username;
				firstCustomer.name = { title: '', firstName: '', lastName: login.username };
				var _customer = new _Customer2.default(firstCustomer);
				_LocalStorageService2.default.setCurrentCustomer(_customer, login);
				_this.success(_customer);
			}
		}, function (error) {
			var _error$response = error.response,
			    response = _error$response === undefined ? {} : _error$response;

			if (response.status === 401) {
				_this.fail({
					errorCode: response.status,
					message: "Invalid username or password."
				});
			} else {
				_this.fail(error);
			}
		});
	});

	action.execute(login);
}

function signupCustomer(data) {
	var action = new _Action2.default(ActionMethods.SIGNUP_CUSTOMER, function (data) {
		customerService.Create(data);
		this.success();
	});

	action.execute(data);
}

function updateCustomer(data) {
	var action = new _Action2.default(ActionMethods.UPDATE_CUSTOMER, function (data) {
		var _this2 = this;

		customerService.UpdateCustomer(data).then(function (response) {
			console.log(response);
			if (response.status === "FAIL") {
				_this2.fail(response);
			} else {
				commonService.findUser(data.username).then(function (oResponse) {
					console.log(oResponse);
					var actionStatus = oResponse.actionStatus,
					    customers = oResponse.customers;

					var _ref2 = customers || {},
					    customer = _ref2.customer;

					var _ref3 = customer || [],
					    _ref4 = (0, _slicedToArray3.default)(_ref3, 1),
					    firstCustomer = _ref4[0];

					if (actionStatus == null || actionStatus.status === "FAIL") {
						_this2.fail(actionStatus);
					} else if (firstCustomer == null) {
						_this2.fail({
							message: "No customer found."
						});
					} else {
						var _customer2 = new _Customer2.default(firstCustomer);
						_LocalStorageService2.default.set("vpp_currentCustomer", _customer2);
						_customer2.success = "success";
						_this2.success(_customer2);
					}
				}, function (error) {
					_this2.fail(error);
				});
			}
		}, function (err) {
			_this2.fail(err);
		});
	});

	action.execute(data);
}

function updateUser(data) {
	var action = new _Action2.default(ActionMethods.UPDATE_USER, function (data) {
		var _this3 = this;

		customerService.UpdateUser(data).then(function (response) {
			if (response == null || response.status === "FAIL") {
				_this3.fail(response);
			} else {
				var currentCustomer = _LocalStorageService2.default.getCurrentCustomer();
				var customer = (0, _assign2.default)({}, currentCustomer);
				customer.success = "success";
				_this3.success(customer);
			}
		}, function (err) {
			_this3.fail(err);
		});
	});
	action.execute(data);
}

function forgotPassword(email) {
	var action = new _Action2.default(ActionMethods.FORGOT_PASSWORD, function (email) {
		var _this4 = this;

		commonService.forgotPassword(email).then(function (response) {
			if (response == null || response.status === "FAIL") {
				_this4.fail(response);
			} else {
				var result = new _Success2.default(response);
				result.message = "forgot_password_success";
				_this4.success(result);
			}
		}, function (err) {
			_this4.fail(err);
		});
	});

	action.execute(email);
}

function getCurrentCustomer() {
	var action = new _Action2.default(ActionMethods.GET_CURRENT_CUSTOMER, function () {
		var currentCustomer = _LocalStorageService2.default.get("vpp_currentCustomer");
		//console.log(currentCustomer);
		//console.log("CURRENT CUST: "+JSON.stringify(currentCustomer));
		if (currentCustomer == null) {
			return this.success(null);
		}
		return this.success(currentCustomer);
	});

	action.execute();
}

function logoutCurrentCustomer() {
	var action = new _Action2.default(ActionMethods.LOGOUT_CURRENT_CUSTOMER, function () {
		var currentCustomer = _LocalStorageService2.default.get("vpp_currentCustomer");
		if (currentCustomer == null) {
			this.fail(new _Error2.default({
				message: "No customer found."
			}));
		}
		_LocalStorageService2.default.removeCurrentCustomer();
		return this.success();
	});

	action.execute();
}

/***/ }),

/***/ "./src/meveo/actions/DataActions.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getCountries = getCountries;
exports.getStatuses = getStatuses;

var _Action = __webpack_require__("./src/meveo/actions/Action.js");

var _Action2 = _interopRequireDefault(_Action);

var _ActionMethods = __webpack_require__("./src/meveo/actions/ActionMethods.js");

var ActionMethods = _interopRequireWildcard(_ActionMethods);

var _DataService = __webpack_require__("./src/meveo/services/DataService.js");

var _DataService2 = _interopRequireDefault(_DataService);

var _LocalStorageService = __webpack_require__("./src/meveo/services/LocalStorageService.js");

var _LocalStorageService2 = _interopRequireDefault(_LocalStorageService);

var _Error = __webpack_require__("./src/meveo/model/Error.js");

var _Error2 = _interopRequireDefault(_Error);

var _Success = __webpack_require__("./src/meveo/model/Success.js");

var _Success2 = _interopRequireDefault(_Success);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dataService = new _DataService2.default();

function getCountries(byUser) {
	var action = new _Action2.default(ActionMethods.GET_COUNTRIES, function () {
		var _this = this;

		dataService.get_countries(byUser).then(function (response) {
			var actionStatus = response.actionStatus;

			var _ref = response || {},
			    localisations = _ref.localisations;

			if (actionStatus == null || actionStatus.status === "FAIL") {
				_this.fail(actionStatus);
			} else {
				var result = new _Success2.default(localisations);
				result.message = byUser ? "user_countries_list_success" : "all_countries_list_success";
				_this.success(result);
			}
		}, function (error) {
			_this.fail(error);
		});
	});
	action.execute(byUser);
}

function getStatuses(byRole) {
	var action = new _Action2.default(ActionMethods.GET_STATUSES, function () {
		var _this2 = this;

		dataService.get_statuses(byRole).then(function (response) {
			var actionStatus = response.actionStatus;

			var _ref2 = response || {},
			    statuses = _ref2.statuses;

			if (actionStatus == null || actionStatus.status === "FAIL") {
				_this2.fail(actionStatus);
			} else {
				var result = new _Success2.default(statuses);
				if (byRole) {
					result.message = "user_statuses_list_success";
				} else {
					result.message = "all_statuses_list_success";
				}

				_this2.success(result);
			}
		}, function (error) {
			_this2.fail(error);
		});
	});
	action.execute(byRole);
}

/***/ }),

/***/ "./src/meveo/actions/UserProfileAction.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.userDetail = userDetail;
exports.editProfileUser = editProfileUser;
exports.editImageUser = editImageUser;
exports.editSkillsUser = editSkillsUser;
exports.editProjectsUser = editProjectsUser;
exports.editAvailabilityUser = editAvailabilityUser;
exports.editBioUser = editBioUser;
exports.downloadImage = downloadImage;
exports.uploadImage = uploadImage;
exports.downloadCV = downloadCV;
exports.uploadCV = uploadCV;
exports.getAllUsers = getAllUsers;
exports.getAllProject = getAllProject;
exports.projectDetail = projectDetail;
exports.editClientProject = editClientProject;
exports.editAssemblaProject = editAssemblaProject;
exports.uploadImageProject = uploadImageProject;
exports.editTeamsProject = editTeamsProject;
exports.addProjectForUser = addProjectForUser;
exports.editPassword = editPassword;

var _Action = __webpack_require__("./src/meveo/actions/Action.js");

var _Action2 = _interopRequireDefault(_Action);

var _ActionMethods = __webpack_require__("./src/meveo/actions/ActionMethods.js");

var ActionMethods = _interopRequireWildcard(_ActionMethods);

var _UserProfileService = __webpack_require__("./src/meveo/services/UserProfileService.js");

var _UserProfileService2 = _interopRequireDefault(_UserProfileService);

var _LocalStorageService = __webpack_require__("./src/meveo/services/LocalStorageService.js");

var _LocalStorageService2 = _interopRequireDefault(_LocalStorageService);

var _Error = __webpack_require__("./src/meveo/model/Error.js");

var _Error2 = _interopRequireDefault(_Error);

var _Success = __webpack_require__("./src/meveo/model/Success.js");

var _Success2 = _interopRequireDefault(_Success);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userProfileService = new _UserProfileService2.default();

function userDetail(username) {
    var action = new _Action2.default(ActionMethods.GET_USER_DETAILS, function (username) {
        var _this = this;

        userProfileService.get_user_profile(username).then(function (response) {
            var actionStatus = response.actionStatus;

            var _ref = response || {},
                user = _ref.user;

            if (actionStatus == null || actionStatus.status === "FAIL") {
                _this.fail(actionStatus);
            } else {
                getAllUsers();
                var result = new _Success2.default(user);
                result.message = "user_profile_detail_success";
                _this.success(result);
            }
        }, function (error) {
            _this.fail(error);
        });
    });
    action.execute(username);
}
function editProfileUser(userData) {
    var action = new _Action2.default(ActionMethods.EDIT_PROFILE_USER, function (userData) {
        var _this2 = this;

        userProfileService.edit_user(userData).then(function (response) {
            if (response == null || response.status === "FAIL") {
                _this2.fail(response);
            } else {
                userDetail(userData.username);
                var result = new _Success2.default();
                result.message = "edit_user_success";
                _this2.success(result);
            }
        }, function (error) {
            _this2.fail(error);
        });
    });
    action.execute(userData);
}

function editImageUser(userData) {
    var action = new _Action2.default(ActionMethods.EDIT_IMAGE_USER, function (userData) {
        var _this3 = this;

        userProfileService.edit_image_user(userData).then(function (response) {
            if (response == null || response.status === "FAIL") {
                _this3.fail(response);
            } else {
                userDetail(userData.username);
                var result = new _Success2.default();
                result.message = "edit_image_success";
                _this3.success(result);
            }
        }, function (error) {
            _this3.fail(error);
        });
    });
    action.execute(userData);
}

function editSkillsUser(userData) {
    var action = new _Action2.default(ActionMethods.EDIT_SKILLS_USER, function (userData) {
        var _this4 = this;

        userProfileService.edit_skills_user(userData).then(function (response) {
            if (response == null || response.status === "FAIL") {
                _this4.fail(response);
            } else {
                userDetail(userData.username);
                var result = new _Success2.default();
                result.message = "edit_user_success";
                _this4.success(result);
            }
        }, function (error) {
            _this4.fail(error);
        });
    });
    action.execute(userData);
}

function editProjectsUser(userData) {
    var action = new _Action2.default(ActionMethods.EDIT_PROJECTS_USER, function (userData) {
        var _this5 = this;

        userProfileService.edit_projects_user(userData).then(function (response) {
            if (response == null || response.status === "FAIL") {
                _this5.fail(response);
            } else {
                userDetail(userData.username);
                var result = new _Success2.default();
                result.message = "edit_user_success";
                _this5.success(result);
            }
        }, function (error) {
            _this5.fail(error);
        });
    });
    action.execute(userData);
}

function editAvailabilityUser(userData) {
    var action = new _Action2.default(ActionMethods.EDIT_AVAILABILITY_USER, function (userData) {
        var _this6 = this;

        userProfileService.edit_availability_user(userData).then(function (response) {
            if (response == null || response.status === "FAIL") {
                _this6.fail(response);
            } else {
                userDetail(userData.username);
                var result = new _Success2.default();
                result.message = "edit_user_success";
                _this6.success(result);
            }
        }, function (error) {
            _this6.fail(error);
        });
    });
    action.execute(userData);
}

function editBioUser(userData) {
    var action = new _Action2.default(ActionMethods.EDIT_BIO_USER, function (userData) {
        var _this7 = this;

        userProfileService.edit_bio_user(userData).then(function (response) {
            if (response == null || response.status === "FAIL") {
                _this7.fail(response);
            } else {
                userDetail(userData.username);
                var result = new _Success2.default();
                result.message = "edit_bio_success";
                _this7.success(result);
            }
        }, function (error) {
            _this7.fail(error);
        });
    });
    action.execute(userData);
}

function downloadImage(photo) {
    var action = new _Action2.default(ActionMethods.DOWNLOAD_IMAGE_FILE, function (photo) {
        var _this8 = this;

        userProfileService.download_image_file(photo).then(function (response) {
            var actionStatus = response.actionStatus;

            var _ref2 = response || {},
                user = _ref2.user;

            if (actionStatus == null || actionStatus.status === "FAIL") {
                _this8.fail(actionStatus);
            } else {
                var result = new _Success2.default(user);
                result.message = "user_detail_success";
                _this8.success(result);
            }
        }, function (error) {
            _this8.fail(error);
        });
    });
    action.execute(photo);
}

function uploadImage(formData, username) {
    var action = new _Action2.default(ActionMethods.UPLOAD_IMAGE_FILE, function (formData) {
        var _this9 = this;

        userProfileService.upload_image_file(formData).then(function (response) {
            var status = response.status;

            console.log('Log Manaty', status);
            if (status == null || status === "FAIL") {
                _this9.fail(status);
            } else {
                var result = new _Success2.default();
                result.message = "upload_image_success";
                _this9.success(result);
            }
        }, function (error) {
            _this9.fail(error);
        });
    });
    action.execute(formData);
}

function downloadCV(username) {
    var action = new _Action2.default(ActionMethods.DOWNLOAD_CV_FILE, function (username) {
        var _this10 = this;

        userProfileService.download_CV_file(username).then(function (response) {
            var actionStatus = response.actionStatus;

            var _ref3 = response || {},
                user = _ref3.user;

            if (actionStatus == null || actionStatus.status === "FAIL") {
                _this10.fail(actionStatus);
            } else {
                var result = new _Success2.default(user);
                result.message = "user_detail_success";
                _this10.success(result);
            }
        }, function (error) {
            _this10.fail(error);
        });
    });
    action.execute(username);
}

function uploadCV(formData, username) {
    var action = new _Action2.default(ActionMethods.UPLOAD_CV_FILE, function (formData) {
        var _this11 = this;

        userProfileService.upload_CV_file(formData).then(function (response) {
            var status = response.status;

            console.log('Log Manaty', status);
            if (status == null || status === "FAIL") {
                _this11.fail(status);
            } else {
                var result = new _Success2.default();
                result.message = "upload_cv_success";
                _this11.success(result);
            }
        }, function (error) {
            _this11.fail(error);
        });
    });
    action.execute(formData);
}

function getAllUsers() {
    var action = new _Action2.default(ActionMethods.GET_ALL_USERS, function () {
        var _this12 = this;

        userProfileService.get_all_users().then(function (response) {
            var actionStatus = response.actionStatus;

            var _ref4 = response || {},
                user = _ref4.user;

            if (actionStatus == null || actionStatus.status === "FAIL") {
                _this12.fail(actionStatus);
            } else {
                var result = new _Success2.default(user);
                result.message = "users_detail_success";
                _this12.success(result);
            }
        }, function (error) {
            _this12.fail(error);
        });
    });
    action.execute();
}

function getAllProject() {
    var action = new _Action2.default(ActionMethods.GET_ALL_PROJECT, function () {
        var _this13 = this;

        userProfileService.get_all_project().then(function (response) {
            var actionStatus = response.actionStatus;

            var _ref5 = response || {},
                projects = _ref5.projects;

            if (actionStatus == null || actionStatus.status === "FAIL") {
                _this13.fail(actionStatus);
            } else {
                var result = new _Success2.default(projects);
                result.message = "projects_detail_success";
                _this13.success(result);
            }
        }, function (error) {
            _this13.fail(error);
        });
    });
    action.execute();
}

function projectDetail(projectName) {
    var action = new _Action2.default(ActionMethods.GET_PROJECT_DETAILS, function (projectName) {
        var _this14 = this;

        userProfileService.get_project_detail(projectName).then(function (response) {
            var actionStatus = response.actionStatus;

            var _ref6 = response || {},
                project = _ref6.project;

            if (actionStatus == null || actionStatus.status === "FAIL") {
                _this14.fail(actionStatus);
            } else {
                var result = new _Success2.default(project);
                result.message = "project_detail_success";
                _this14.success(result);
            }
        }, function (error) {
            _this14.fail(error);
        });
    });
    action.execute(projectName);
}

function editClientProject(userData) {
    var action = new _Action2.default(ActionMethods.EDIT_CLIENT_PROJECT, function (userData) {
        var _this15 = this;

        userProfileService.edit_client_project(userData).then(function (response) {
            if (response == null || response.status === "FAIL") {
                _this15.fail(response);
            } else {
                projectDetail(userData.code);
                getAllProject();
                var result = new _Success2.default();
                result.message = "edit_project_success";
                _this15.success(result);
            }
        }, function (error) {
            _this15.fail(error);
        });
    });
    action.execute(userData);
}

function editAssemblaProject(userData) {
    var action = new _Action2.default(ActionMethods.EDIT_ASSEMBLA_PROJECT, function (userData) {
        var _this16 = this;

        userProfileService.edit_assembla_project(userData).then(function (response) {
            if (response == null || response.status === "FAIL") {
                _this16.fail(response);
            } else {
                projectDetail(userData.code);
                var result = new _Success2.default();
                result.message = "edit_project_success";
                _this16.success(result);
            }
        }, function (error) {
            _this16.fail(error);
        });
    });
    action.execute(userData);
}

function uploadImageProject(formData, username) {
    var action = new _Action2.default(ActionMethods.UPLOAD_IMAGE_PROJECT_FILE, function (formData) {
        var _this17 = this;

        userProfileService.upload_image_project(formData).then(function (response) {
            var status = response.status;

            console.log('Log Manaty', status);
            if (status == null || status === "FAIL") {
                _this17.fail(status);
            } else {
                var result = new _Success2.default();
                result.message = "upload_project_success";
                _this17.success(result);
            }
        }, function (error) {
            _this17.fail(error);
        });
    });
    action.execute(formData);
}

function editTeamsProject(userData) {
    var action = new _Action2.default(ActionMethods.EDIT_TEAMS_PROJECT, function (userData) {
        var _this18 = this;

        userProfileService.edit_teams_project(userData).then(function (response) {
            if (response == null || response.status === "FAIL") {
                _this18.fail(response);
            } else {
                projectDetail(userData.code);
                getAllProject();
                var result = new _Success2.default();
                result.message = "edit_teams_project_success";
                _this18.success(result);
            }
        }, function (error) {
            _this18.fail(error);
        });
    });
    action.execute(userData);
}

function addProjectForUser(userData) {
    var action = new _Action2.default(ActionMethods.ADD_PROJECT_FOR_USER, function (userData) {
        var _this19 = this;

        userProfileService.add_project_foruser(userData).then(function (response) {
            if (response == null || response.status === "FAIL") {
                _this19.fail(response);
            } else {
                var result = new _Success2.default();
                result.message = "add_project_foruser_success";
                _this19.success(result);
            }
        }, function (error) {
            _this19.fail(error);
        });
    });
    action.execute(userData);
}

function editPassword(userData) {
    var action = new _Action2.default(ActionMethods.EDIT_PASSWORD, function (userData) {
        var _this20 = this;

        userProfileService.edit_password(userData).then(function (response) {
            if (response == null || response.status === "FAIL") {
                _this20.fail(response);
            } else {
                var result = new _Success2.default();
                result.message = "edit_password_success";
                _this20.success(result);
            }
        }, function (error) {
            _this20.fail(error);
        });
    });
    action.execute(userData);
}

/***/ }),

/***/ "./src/meveo/dispatcher.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _flux = __webpack_require__("./node_modules/flux/index.js");

var dispatcher = new _flux.Dispatcher();

exports.default = dispatcher;

/***/ }),

/***/ "./src/meveo/model/Error.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _classCallCheck2 = __webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Error = function Error() {
	var error = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	(0, _classCallCheck3.default)(this, Error);
	var _error$errorCode = error.errorCode,
	    errorCode = _error$errorCode === undefined ? 'ERROR' : _error$errorCode,
	    _error$message = error.message,
	    message = _error$message === undefined ? "An unknown error was encountered." : _error$message;

	this.image = './images/warning.png';
	this.code = errorCode;
	this.message = message;
};

exports.default = Error;

/***/ }),

/***/ "./src/meveo/model/MeveoCustomer.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _stringify = __webpack_require__("./node_modules/babel-runtime/core-js/json/stringify.js");

var _stringify2 = _interopRequireDefault(_stringify);

var _classCallCheck2 = __webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__("./node_modules/babel-runtime/helpers/createClass.js");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MeveoCustomer = function () {
  function MeveoCustomer(datum) {
    (0, _classCallCheck3.default)(this, MeveoCustomer);

    this.crmAccountType = datum.account_type || "Client";
    this.crmParentCode = 'SELLER_FR';
    this.code = datum.username;
    this.description = datum.description || 'customer description';
    this.name = {
      "title": datum.title || "M",
      "firstName": datum.first_name,
      "lastName": datum.last_name
    };
    this.address = {
      "address1": datum.address1 || "",
      "address2": datum.address2 || "",
      "address3": '',
      "zipCode": datum.zipcode || "",
      "city": datum.city || "",
      "country": datum.country || "",
      "state": datum.state || ""
    };
    this.contactInformation = {
      "email": datum.email,
      "phone": datum.mobile,
      "mobile": datum.mobile
    };
    this.paymentMethod = datum.paymentMethod || "CHECK", this.language = datum.language || 'FRA';
    this.customerCategory = datum.account_type || "Client";
    this.currency = 'EUR';
    this.caStatus = 'ACTIVE';
    this.billingCycle = 'CYC_INV_MT_1';
    this.country = "FR";
    this.baStatus = 'ACTIVE';
    this.email = datum.billingEmail || '';
    this.uaStatus = 'ACTIVE';
    this.mandateIdentification = datum.mandateIdentification || '';
    this.mandateDate = datum.mandateDate || 0;
    this.electronicBilling = datum.electronicBilling || false;
    this.bankCoordinates = {
      "bankCode": datum.bankCode || '',
      "branchCode": datum.branchCode || '',
      "accountNumber": datum.accountNumber || '',
      "key": datum.key || '',
      "iban": datum.iban || '',
      "bic": datum.bic || '',
      "accountOwner": datum.accountOwner || '',
      "bankName": datum.bankName || '',
      "bankId": datum.bankId || '',
      "issuerNumber": datum.issuerNumber || '',
      "issuerName": datum.issuerName || '',
      "ics": datum.ics || ''
    };

    this.customFields = {
      "customField": [{
        "code": "password",
        "stringValue": datum.password
      }]
    };
  }

  (0, _createClass3.default)(MeveoCustomer, [{
    key: 'meveoJson',
    get: function get() {
      return (0, _stringify2.default)(this);
    }
  }], [{
    key: 'convertFromProperties',
    value: function convertFromProperties(entity) {
      return new MeveoCustomer(entity);
    }
  }]);
  return MeveoCustomer;
}();

exports.default = MeveoCustomer;

/***/ }),

/***/ "./src/meveo/model/MeveoUser.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _stringify = __webpack_require__("./node_modules/babel-runtime/core-js/json/stringify.js");

var _stringify2 = _interopRequireDefault(_stringify);

var _classCallCheck2 = __webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__("./node_modules/babel-runtime/helpers/createClass.js");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MeveoUser = function () {
  function MeveoUser(datum) {
    (0, _classCallCheck3.default)(this, MeveoUser);

    this.username = datum.username || "";
    this.password = datum.password;
    this.email = datum.email;
  }

  (0, _createClass3.default)(MeveoUser, [{
    key: "meveoJson",
    get: function get() {
      return (0, _stringify2.default)(this);
    }
  }]);
  return MeveoUser;
}();

exports.default = MeveoUser;

/***/ }),

/***/ "./src/meveo/model/Password.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _stringify = __webpack_require__("./node_modules/babel-runtime/core-js/json/stringify.js");

var _stringify2 = _interopRequireDefault(_stringify);

var _classCallCheck2 = __webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__("./node_modules/babel-runtime/helpers/createClass.js");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Password = function () {
  function Password(datum) {
    (0, _classCallCheck3.default)(this, Password);

    this.currentPassword = datum.currentPassword;
    this.newPassword = datum.newPassword;
    this.confirmation = datum.confirmation;

    // this.mobile = datum.mobile;
    // this.address1 = datum.address1;
    // this.address2 = datum.address2;
    // this.zipcode = datum.zipcode;
    // this.city = datum.city;
    // this.country = datum.country;
    // this.state = datum.state;
  }

  (0, _createClass3.default)(Password, [{
    key: "meveoJson",
    get: function get() {
      return (0, _stringify2.default)(this);
    }
  }, {
    key: "entityCode",
    get: function get() {
      return "Client";
    }
  }], [{
    key: "convertFromProperties",
    value: function convertFromProperties(entity) {
      return new Password(entity);
    }
  }]);
  return Password;
}();

exports.default = Password;

/***/ }),

/***/ "./src/meveo/model/Project.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _stringify = __webpack_require__("./node_modules/babel-runtime/core-js/json/stringify.js");

var _stringify2 = _interopRequireDefault(_stringify);

var _classCallCheck2 = __webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__("./node_modules/babel-runtime/helpers/createClass.js");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Project = function () {
  function Project(datum) {
    (0, _classCallCheck3.default)(this, Project);

    this.code = datum.code;

    this.project = datum.project;
    this.logo = datum.logo;
    this.link = datum.link;
    this.contacts = datum.contacts;
    this.assemblaLink = datum.assemblaLink;
    this.teams = datum.teams;
    this.description = datum.description;
  }

  (0, _createClass3.default)(Project, [{
    key: "meveoJson",
    get: function get() {
      return (0, _stringify2.default)(this);
    }
  }, {
    key: "entityCode",
    get: function get() {
      return "Client";
    }
  }], [{
    key: "convertFromProperties",
    value: function convertFromProperties(entity) {
      return new Project(entity);
    }
  }]);
  return Project;
}();

exports.default = Project;

/***/ }),

/***/ "./src/meveo/model/Success.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _classCallCheck2 = __webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Success = function Success(success) {
	(0, _classCallCheck3.default)(this, Success);

	//const { result = null, message = "success." } = success;
	this.result = success;
};

exports.default = Success;

/***/ }),

/***/ "./src/meveo/model/User.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _stringify = __webpack_require__("./node_modules/babel-runtime/core-js/json/stringify.js");

var _stringify2 = _interopRequireDefault(_stringify);

var _classCallCheck2 = __webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__("./node_modules/babel-runtime/helpers/createClass.js");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = function () {
  function User(datum) {
    (0, _classCallCheck3.default)(this, User);

    this.username = datum.username;
    this.email = datum.email;
    this.firstName = datum.firstName;
    this.lastName = datum.lastName;
    this.sinceDate = datum.sinceDate;
    this.photo = datum.photo;
    this.job = datum.job;
    this.skypeId = datum.skypeId;
    this.country = datum.country;
    this.linkedin = datum.linkedin;
    this.cv = datum.cv;
    this.bio = datum.bio;
    this.skills = datum.skills;
    this.projects = datum.projects;
    this.availability = datum.availability;
    this.user = datum.user;

    // this.mobile = datum.mobile;
    // this.address1 = datum.address1;
    // this.address2 = datum.address2;
    // this.zipcode = datum.zipcode;
    // this.city = datum.city;
    // this.country = datum.country;
    // this.state = datum.state;
  }

  (0, _createClass3.default)(User, [{
    key: "meveoJson",
    get: function get() {
      return (0, _stringify2.default)(this);
    }
  }, {
    key: "entityCode",
    get: function get() {
      return "Client";
    }
  }], [{
    key: "convertFromProperties",
    value: function convertFromProperties(entity) {
      return new User(entity);
    }
  }]);
  return User;
}();

exports.default = User;

/***/ }),

/***/ "./src/meveo/model/account/Customer.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _classCallCheck2 = __webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _CustomerAccount = __webpack_require__("./src/meveo/model/account/CustomerAccount.js");

var _CustomerAccount2 = _interopRequireDefault(_CustomerAccount);

var _FrontendError = __webpack_require__("./src/meveo/FrontendError.js");

var _FrontendError2 = _interopRequireDefault(_FrontendError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Customer = function Customer(customer) {
    (0, _classCallCheck3.default)(this, Customer);

    customer = customer || {};

    if (customer.code == null || customer.code.trim() === '') {
        throw new _FrontendError2.default("Customer code is invalid.");
    }

    this.code = customer.code;
    this.description = customer.description || '';
    this.name = customer.name || { title: '', firstName: '', lastName: '' };
    this.address = customer.address || {};
    this.customFields = customer.customFields;
    this.customerCategory = customer.customerCategory;
    this.seller = customer.seller;
    this.mandateIdentification = customer.mandateIdentification;
    this.mandateDate = customer.mandateDate;
    this.contactInformation = customer.contactInformation;
    this.customerAccount = new _CustomerAccount2.default(customer);
};

exports.default = Customer;

/***/ }),

/***/ "./src/meveo/model/account/CustomerAccount.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
        value: true
});
exports.default = undefined;

var _classCallCheck2 = __webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CustomerAccount = function CustomerAccount(customer) {
        (0, _classCallCheck3.default)(this, CustomerAccount);

        customer = customer || {};

        if (customer.code == null || customer.code.trim() === '') {
                throw new FrontendError("Customer code is invalid.");
        }

        var _customer = customer,
            _customer$customerAcc = _customer.customerAccounts,
            customerAccounts = _customer$customerAcc === undefined ? {} : _customer$customerAcc;

        var _ref = customerAccounts || {},
            _ref$customerAccount = _ref.customerAccount,
            customerAccount = _ref$customerAccount === undefined ? [] : _ref$customerAccount;

        var activeCustomerAccountList = customerAccount.filter(function (ca) {
                return ca.status === 'ACTIVE';
        });
        var newestStatusDate = Math.max.apply(Math, activeCustomerAccountList.map(function (ca) {
                return ca.dateStatus;
        }));
        var customerAccountDetails = activeCustomerAccountList.find(function (ca) {
                return ca.dateStatus === newestStatusDate;
        }) || {};

        this.code = customerAccountDetails.code;
        this.description = customerAccountDetails.description;
        this.externalRef1 = customerAccountDetails.externalRef1;
        this.externalRef2 = customerAccountDetails.externalRef2;
        this.name = customerAccountDetails.name;
        this.address = customerAccountDetails.address;
        this.customFields = customerAccountDetails.customFields;
        this.customer = customerAccountDetails.customer;
        this.currency = customerAccountDetails.currency;
        this.language = customerAccountDetails.language;
        this.status = customerAccountDetails.status;
        this.paymentMethod = customerAccountDetails.paymentMethod;
        this.creditCategory = customerAccountDetails.creditCategory;
        this.dateStatus = customerAccountDetails.dateStatus;
        this.dateDunningLevel = customerAccountDetails.dateDunningLevel;
        this.contactInformation = customerAccountDetails.contactInformation;
        this.dunningLevel = customerAccountDetails.dunningLevel;
        this.mandateIdentification = customerAccountDetails.mandateIdentification;
        this.mandateDate = customerAccountDetails.mandateDate;
        this.balance = customerAccountDetails.balance;
        this.terminationDate = customerAccountDetails.terminationDate;
};

exports.default = CustomerAccount;

/***/ }),

/***/ "./src/meveo/pages/FooterComponent.jsx":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _getPrototypeOf = __webpack_require__("./node_modules/babel-runtime/core-js/object/get-prototype-of.js");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__("./node_modules/babel-runtime/helpers/createClass.js");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__("./node_modules/babel-runtime/helpers/possibleConstructorReturn.js");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__("./node_modules/babel-runtime/helpers/inherits.js");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__("./node_modules/react/react.js");

var _react2 = _interopRequireDefault(_react);

var _properties = __webpack_require__("./src/properties.js");

var properties = _interopRequireWildcard(_properties);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Footer = function (_React$Component) {
    (0, _inherits3.default)(Footer, _React$Component);

    function Footer() {
        (0, _classCallCheck3.default)(this, Footer);
        return (0, _possibleConstructorReturn3.default)(this, (Footer.__proto__ || (0, _getPrototypeOf2.default)(Footer)).apply(this, arguments));
    }

    (0, _createClass3.default)(Footer, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "footer",
                { className: "text-center footer" },
                _react2.default.createElement(
                    "div",
                    { className: "row" },
                    _react2.default.createElement(
                        "div",
                        { className: "footer-links col-xs-12" },
                        _react2.default.createElement(
                            "ul",
                            { className: "list-inline" },
                            _react2.default.createElement(
                                "li",
                                null,
                                _react2.default.createElement(
                                    "a",
                                    { href: "#", target: "_blank" },
                                    "About Manaty"
                                )
                            ),
                            _react2.default.createElement(
                                "li",
                                null,
                                _react2.default.createElement(
                                    "a",
                                    { href: "#", target: "_blank" },
                                    "Community"
                                )
                            ),
                            _react2.default.createElement(
                                "li",
                                null,
                                _react2.default.createElement(
                                    "a",
                                    { href: "#", target: "_blank" },
                                    "Privacy"
                                )
                            ),
                            _react2.default.createElement(
                                "li",
                                null,
                                _react2.default.createElement(
                                    "a",
                                    { href: "#", target: "_blank" },
                                    "Contact us"
                                )
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    "div",
                    { className: "row text-center" },
                    _react2.default.createElement(
                        "div",
                        { className: "footer-copyright" },
                        _react2.default.createElement("i", { className: "fa fa-copyright" }),
                        " Manaty"
                    )
                )
            );
        }
    }]);
    return Footer;
}(_react2.default.Component);

exports.default = Footer;

/***/ }),

/***/ "./src/meveo/pages/HeaderComponent.jsx":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _getPrototypeOf = __webpack_require__("./node_modules/babel-runtime/core-js/object/get-prototype-of.js");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__("./node_modules/babel-runtime/helpers/createClass.js");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__("./node_modules/babel-runtime/helpers/possibleConstructorReturn.js");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__("./node_modules/babel-runtime/helpers/inherits.js");

var _inherits3 = _interopRequireDefault(_inherits2);

var _class;

var _react = __webpack_require__("./node_modules/react/react.js");

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__("./node_modules/react-router-dom/es/index.js");

var _googleSearch = __webpack_require__("./node_modules/google-search/index.js");

var _googleSearch2 = _interopRequireDefault(_googleSearch);

var _DropdownMenu = __webpack_require__("./src/meveo/pages/elements/DropdownMenu.jsx");

var _DropdownMenu2 = _interopRequireDefault(_DropdownMenu);

var _LocalStorageService = __webpack_require__("./src/meveo/services/LocalStorageService.js");

var _LocalStorageService2 = _interopRequireDefault(_LocalStorageService);

var _CustomerStore = __webpack_require__("./src/meveo/stores/CustomerStore.js");

var _CustomerStore2 = _interopRequireDefault(_CustomerStore);

var _CustomerActions = __webpack_require__("./src/meveo/actions/CustomerActions.js");

var CustomerActions = _interopRequireWildcard(_CustomerActions);

var _properties = __webpack_require__("./src/properties.js");

var properties = _interopRequireWildcard(_properties);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HeaderComponent = (0, _reactRouterDom.withRouter)(_class = function (_React$Component) {
	(0, _inherits3.default)(HeaderComponent, _React$Component);

	function HeaderComponent() {
		(0, _classCallCheck3.default)(this, HeaderComponent);

		var _this = (0, _possibleConstructorReturn3.default)(this, (HeaderComponent.__proto__ || (0, _getPrototypeOf2.default)(HeaderComponent)).call(this));

		_this.state = {
			mobileMenu: "none"
		};
		_this.closeMenu = _this.closeMenu.bind(_this);
		return _this;
	}

	(0, _createClass3.default)(HeaderComponent, [{
		key: "componentWillMount",
		value: function componentWillMount() {
			window.addEventListener("click", this.closeMenu);
		}
	}, {
		key: "componentWillUnmount",
		value: function componentWillUnmount() {
			window.removeEventListener("click", this.closeMenu);
		}
	}, {
		key: "componentDidMount",
		value: function componentDidMount() {}
	}, {
		key: "logout",
		value: function logout(event) {
			event.preventDefault();
			var kc = this.props.kc;

			_LocalStorageService2.default.clearUserinfo();
			kc.logout();
		}
	}, {
		key: "changePassword",
		value: function changePassword(event) {
			event.preventDefault();
			var kc = this.props.kc;

			kc.accountManagement();
		}
	}, {
		key: "clickedOutsideOf",
		value: function clickedOutsideOf(event) {
			var ids = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

			var clicked = ids.every(function (id) {
				return event.target.id !== id && event.target.parentNode.id !== id && event.target.parentNode.parentNode.id !== id;
			});
			return clicked;
		}
	}, {
		key: "toggleMenu",
		value: function toggleMenu() {
			var mobileMenu = this.state.mobileMenu;

			var alert = document.getElementById("alert");
			this.setState({
				mobileMenu: mobileMenu === "none" ? "block" : "none"
			});
		}
	}, {
		key: "closeMenu",
		value: function closeMenu(event) {
			var mobileMenu = this.state.mobileMenu;

			if (mobileMenu === "block" && this.clickedOutsideOf(event, ["mobile-menu", "settings-menu", "header-settings", "header-help", "header-search"])) {
				this.setState({
					mobileMenu: mobileMenu === "none" ? "block" : "none"
				});
			}
		}
	}, {
		key: "reloadPage",
		value: function reloadPage(event) {
			event.preventDefault();
			location.reload();
		}
	}, {
		key: "render",
		value: function render() {
			return _react2.default.createElement(
				"div",
				null,
				_react2.default.createElement(
					"nav",
					{ id: "header-navbar", className: "navbar navbar-default navbar-fixed-top", role: "navigation" },
					_react2.default.createElement(
						"div",
						{ className: "navbar-wrapper" },
						_react2.default.createElement("span", { className: "logo_manaty" }),
						_react2.default.createElement("span", { className: "logo-title-manaty" }),
						_react2.default.createElement(
							"div",
							{ id: "right-menu", className: "collapse navbar-collapse", style: { display: this.state.mobileMenu } },
							_react2.default.createElement(
								"ul",
								{ className: "nav navbar-nav navbar-left" },
								_react2.default.createElement(
									"li",
									null,
									_react2.default.createElement(
										"div",
										{ className: "navbar-text navbar-text-sm" },
										_react2.default.createElement(
											"h4",
											{ className: "row" },
											this.props.kc.tokenParsed.preferred_username
										)
									)
								),
								_react2.default.createElement(
									"li",
									{ className: "home-nav" },
									_react2.default.createElement(
										"a",
										{ onClick: this.reloadPage.bind(this) },
										_react2.default.createElement("i", { className: "wd-home5 fs2" })
									)
								)
							),
							_react2.default.createElement(
								"ul",
								{ className: "nav navbar-nav navbar-right" },
								_react2.default.createElement(
									"li",
									null,
									_react2.default.createElement(
										"div",
										{ className: "navbar-text navbar-text-sm" },
										_react2.default.createElement(
											"div",
											null,
											_react2.default.createElement("span", { className: "disconnect" }),
											_react2.default.createElement(
												"span",
												{ className: "name_disconnect" },
												_react2.default.createElement(
													_reactRouterDom.Link,
													{ to: "#", onClick: this.logout.bind(this) },
													"Disconnect"
												)
											)
										),
										_react2.default.createElement(
											"div",
											null,
											_react2.default.createElement("span", { className: "lock" }),
											_react2.default.createElement(
												"span",
												{ className: "name_lock" },
												_react2.default.createElement(
													_reactRouterDom.Link,
													{ to: "/change_password" },
													"Change password"
												)
											)
										)
									)
								)
							)
						)
					)
				)
			);
		}
	}]);
	return HeaderComponent;
}(_react2.default.Component)) || _class;

exports.default = HeaderComponent;

/***/ }),

/***/ "./src/meveo/pages/MainComponent.jsx":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends2 = __webpack_require__("./node_modules/babel-runtime/helpers/extends.js");

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = __webpack_require__("./node_modules/babel-runtime/core-js/object/get-prototype-of.js");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__("./node_modules/babel-runtime/helpers/createClass.js");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__("./node_modules/babel-runtime/helpers/possibleConstructorReturn.js");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__("./node_modules/babel-runtime/helpers/inherits.js");

var _inherits3 = _interopRequireDefault(_inherits2);

var _class;

var _react = __webpack_require__("./node_modules/react/react.js");

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__("./node_modules/react-router-dom/es/index.js");

var _HeaderComponent = __webpack_require__("./src/meveo/pages/HeaderComponent.jsx");

var _HeaderComponent2 = _interopRequireDefault(_HeaderComponent);

var _MenuComponent = __webpack_require__("./src/meveo/pages/MenuComponent.jsx");

var _MenuComponent2 = _interopRequireDefault(_MenuComponent);

var _FooterComponent = __webpack_require__("./src/meveo/pages/FooterComponent.jsx");

var _FooterComponent2 = _interopRequireDefault(_FooterComponent);

var _CustomerStore = __webpack_require__("./src/meveo/stores/CustomerStore.js");

var _CustomerStore2 = _interopRequireDefault(_CustomerStore);

var _CustomerActions = __webpack_require__("./src/meveo/actions/CustomerActions.js");

var _LocalStorageService = __webpack_require__("./src/meveo/services/LocalStorageService.js");

var _LocalStorageService2 = _interopRequireDefault(_LocalStorageService);

var _UserProfileInfo = __webpack_require__("./src/meveo/pages/user/UserProfileInfo.jsx");

var _UserProfileInfo2 = _interopRequireDefault(_UserProfileInfo);

var _properties = __webpack_require__("./src/properties.js");

var properties = _interopRequireWildcard(_properties);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MainComponent = (0, _reactRouterDom.withRouter)(_class = function (_Component) {
	(0, _inherits3.default)(MainComponent, _Component);

	function MainComponent(props) {
		(0, _classCallCheck3.default)(this, MainComponent);

		// The MainComponent is the only component that talks directly to
		// the LocalStorageService.  It allows it to load the currentCustomer
		// directly so that it can redirect when necessary.
		// Other components should bind to the CustomerStore's update handler
		// event instead.
		var _this = (0, _possibleConstructorReturn3.default)(this, (MainComponent.__proto__ || (0, _getPrototypeOf2.default)(MainComponent)).call(this, props));

		_this.state = {
			currentCustomer: _LocalStorageService2.default.get("vpp_currentCustomer")
		};
		return _this;
	}

	(0, _createClass3.default)(MainComponent, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			//CustomerStore.bindUpdateHandler(this.updateCurrentCustomer.bind(this));
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			//CustomerStore.unbindUpdateHandler(this.updateCurrentCustomer.bind(this));
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			//this.redirectIfNeeded();
			//getCurrentCustomer();
		}
	}, {
		key: 'componentWillUpdate',
		value: function componentWillUpdate(nextProps, nextState) {
			//this.redirectIfNeeded(nextProps, nextState);
		}
	}, {
		key: 'updateCurrentCustomer',
		value: function updateCurrentCustomer(currentCustomer) {
			this.setState({
				currentCustomer: currentCustomer
			});
		}
	}, {
		key: 'redirectIfNeeded',
		value: function redirectIfNeeded() {
			window.location = "index.html#" + properties.index_url;
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					'header',
					{ className: 'header' },
					_react2.default.createElement(_HeaderComponent2.default, (0, _extends3.default)({ location: this.props.location.pathname }, this.props))
				),
				_react2.default.createElement(_MenuComponent2.default, null),
				_react2.default.createElement(
					'div',
					{ className: 'content', id: 'content' },
					this.props.children,
					_react2.default.createElement('span', { className: 'footer-div user-footer' })
				)
			);
		}
	}]);
	return MainComponent;
}(_react.Component)) || _class;

module.exports = MainComponent;

/***/ }),

/***/ "./src/meveo/pages/MenuComponent.jsx":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _getPrototypeOf = __webpack_require__("./node_modules/babel-runtime/core-js/object/get-prototype-of.js");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__("./node_modules/babel-runtime/helpers/createClass.js");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__("./node_modules/babel-runtime/helpers/possibleConstructorReturn.js");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__("./node_modules/babel-runtime/helpers/inherits.js");

var _inherits3 = _interopRequireDefault(_inherits2);

var _class;

var _react = __webpack_require__("./node_modules/react/react.js");

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__("./node_modules/react-router-dom/es/index.js");

var _googleSearch = __webpack_require__("./node_modules/google-search/index.js");

var _googleSearch2 = _interopRequireDefault(_googleSearch);

var _reactTabs = __webpack_require__("./node_modules/react-tabs/esm/index.js");

var _DropdownMenu = __webpack_require__("./src/meveo/pages/elements/DropdownMenu.jsx");

var _DropdownMenu2 = _interopRequireDefault(_DropdownMenu);

var _LocalStorageService = __webpack_require__("./src/meveo/services/LocalStorageService.js");

var _LocalStorageService2 = _interopRequireDefault(_LocalStorageService);

var _CustomerStore = __webpack_require__("./src/meveo/stores/CustomerStore.js");

var _CustomerStore2 = _interopRequireDefault(_CustomerStore);

var _CustomerActions = __webpack_require__("./src/meveo/actions/CustomerActions.js");

var CustomerActions = _interopRequireWildcard(_CustomerActions);

var _properties = __webpack_require__("./src/properties.js");

var properties = _interopRequireWildcard(_properties);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MenuComponent = (0, _reactRouterDom.withRouter)(_class = function (_React$Component) {
	(0, _inherits3.default)(MenuComponent, _React$Component);

	function MenuComponent() {
		(0, _classCallCheck3.default)(this, MenuComponent);

		var _this = (0, _possibleConstructorReturn3.default)(this, (MenuComponent.__proto__ || (0, _getPrototypeOf2.default)(MenuComponent)).call(this));

		_this.state = {};
		return _this;
	}

	(0, _createClass3.default)(MenuComponent, [{
		key: "componentWillMount",
		value: function componentWillMount() {}
	}, {
		key: "componentWillUnmount",
		value: function componentWillUnmount() {}
	}, {
		key: "componentDidMount",
		value: function componentDidMount() {}
	}, {
		key: "render",
		value: function render() {
			return _react2.default.createElement(
				_reactTabs.Tabs,
				{ defaultIndex: 0 },
				_react2.default.createElement(
					"div",
					{ className: "main_sidebar" },
					_react2.default.createElement(
						_reactTabs.TabList,
						{ className: "ul_tab" },
						_react2.default.createElement(
							_reactTabs.Tab,
							{ className: "li_tab" },
							_react2.default.createElement(
								"i",
								{ className: "tabsli" },
								_react2.default.createElement(
									"a",
									{ className: "tabsa" },
									_react2.default.createElement(
										_reactRouterDom.Link,
										{ to: "/" },
										"MY PROFILE"
									)
								)
							)
						),
						_react2.default.createElement("br", null),
						_react2.default.createElement(
							_reactTabs.Tab,
							{ className: "li_tab" },
							_react2.default.createElement(
								"i",
								{ className: "tabsli" },
								_react2.default.createElement(
									"a",
									{ className: "tabsa" },
									_react2.default.createElement(
										_reactRouterDom.Link,
										{ to: "/team" },
										"TEAM"
									)
								)
							)
						),
						_react2.default.createElement("br", null),
						_react2.default.createElement(
							_reactTabs.Tab,
							{ className: "li_tab" },
							_react2.default.createElement(
								"i",
								{ className: "tabsli" },
								_react2.default.createElement(
									"a",
									{ className: "tabsa" },
									_react2.default.createElement(
										_reactRouterDom.Link,
										{ to: "/projects" },
										"PROJECTS"
									)
								)
							)
						),
						_react2.default.createElement("br", null)
					)
				)
			);
		}
	}]);
	return MenuComponent;
}(_react2.default.Component)) || _class;

exports.default = MenuComponent;

/***/ }),

/***/ "./src/meveo/pages/elements/DropdownMenu.jsx":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _getPrototypeOf = __webpack_require__("./node_modules/babel-runtime/core-js/object/get-prototype-of.js");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__("./node_modules/babel-runtime/helpers/createClass.js");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__("./node_modules/babel-runtime/helpers/possibleConstructorReturn.js");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__("./node_modules/babel-runtime/helpers/inherits.js");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__("./node_modules/react/react.js");

var _react2 = _interopRequireDefault(_react);

var _reactAddonsCssTransitionGroup = __webpack_require__("./node_modules/react-addons-css-transition-group/index.js");

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DropdownMenu = function (_React$Component) {
	(0, _inherits3.default)(DropdownMenu, _React$Component);

	function DropdownMenu() {
		(0, _classCallCheck3.default)(this, DropdownMenu);

		var _this = (0, _possibleConstructorReturn3.default)(this, (DropdownMenu.__proto__ || (0, _getPrototypeOf2.default)(DropdownMenu)).call(this));

		_this.state = {
			showDropdown: false
		};
		_this.closeDropdown = _this.closeDropdown.bind(_this);
		return _this;
	}

	(0, _createClass3.default)(DropdownMenu, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			this.unMounted = false;
			window.addEventListener("click", this.closeDropdown);
		}
	}, {
		key: "componentWillUnmount",
		value: function componentWillUnmount() {
			window.removeEventListener("click", this.closeDropdown);
			this.unMounted = true;
		}
	}, {
		key: "closeDropdown",
		value: function closeDropdown(event) {
			var showDropdown = this.state.showDropdown;
			var id = this.props.id;

			if (showDropdown && event.target.id !== id && event.target.parentNode.id !== id && event.target.parentNode.parentNode.id !== id) {
				this.setState({
					showDropdown: false
				});
			}
		}
	}, {
		key: "toggleDropdown",
		value: function toggleDropdown(e) {
			e.preventDefault();
			this.setState({
				showDropdown: !this.state.showDropdown
			});
		}
	}, {
		key: "renderMenuLink",
		value: function renderMenuLink() {
			var _props = this.props,
			    id = _props.id,
			    icon = _props.icon,
			    label = _props.label;
			var showDropdown = this.state.showDropdown;

			var hasIcon = !!icon;
			var fullIcon = "fa " + icon + " hidden-xs";
			var smallIcon = "fa " + icon + " visible-xs-inline";
			if (hasIcon) {
				return _react2.default.createElement(
					"a",
					{ id: id, className: "dropdown-toggle navbar-control-icon", onClick: this.toggleDropdown.bind(this) },
					_react2.default.createElement(
						"span",
						null,
						label,
						" "
					),
					_react2.default.createElement("i", { className: fullIcon }),
					_react2.default.createElement("i", { className: smallIcon })
				);
			} else {
				return _react2.default.createElement(
					"a",
					{ id: id, className: "dropdown-toggle navbar-control-icon", onClick: this.toggleDropdown.bind(this) },
					_react2.default.createElement(
						"span",
						null,
						label,
						" "
					),
					showDropdown ? _react2.default.createElement("i", { className: "fa fa-angle-up" }) : _react2.default.createElement("i", { classNameName: "fa fa-angle-down" })
				);
			}
		}
	}, {
		key: "renderDropdown",
		value: function renderDropdown() {
			if (this.state.showDropdown) {
				return this.props.children;
			}
			return null;
		}
	}, {
		key: "render",
		value: function render() {
			return _react2.default.createElement(
				"li",
				{ className: "toggle-dropdown" },
				this.renderMenuLink(),
				_react2.default.createElement(
					_reactAddonsCssTransitionGroup2.default,
					{ transitionName: "fade",
						transitionAppear: true,
						transitionLeave: true,
						transitionEnterTimeout: 600,
						transitionAppearTimeout: 600,
						transitionLeaveTimeout: 300 },
					this.renderDropdown()
				)
			);
		}
	}]);
	return DropdownMenu;
}(_react2.default.Component);

exports.default = DropdownMenu;

/***/ }),

/***/ "./src/meveo/pages/elements/FormLoaderIndicatorComponent.jsx":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _getPrototypeOf = __webpack_require__("./node_modules/babel-runtime/core-js/object/get-prototype-of.js");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__("./node_modules/babel-runtime/helpers/createClass.js");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__("./node_modules/babel-runtime/helpers/possibleConstructorReturn.js");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__("./node_modules/babel-runtime/helpers/inherits.js");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__("./node_modules/react/react.js");

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__("./node_modules/react-dom/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ReactFormLoaderIndicatorComponent = function (_Component) {
	(0, _inherits3.default)(ReactFormLoaderIndicatorComponent, _Component);

	function ReactFormLoaderIndicatorComponent() {
		(0, _classCallCheck3.default)(this, ReactFormLoaderIndicatorComponent);
		return (0, _possibleConstructorReturn3.default)(this, (ReactFormLoaderIndicatorComponent.__proto__ || (0, _getPrototypeOf2.default)(ReactFormLoaderIndicatorComponent)).apply(this, arguments));
	}

	(0, _createClass3.default)(ReactFormLoaderIndicatorComponent, [{
		key: 'render',
		value: function render() {
			if (!this.props.loading) {
				return _react2.default.createElement('span', null);
			}
			return _react2.default.createElement('span', { className: 'fa fa-spinner' });
		}
	}]);
	return ReactFormLoaderIndicatorComponent;
}(_react.Component);

module.exports = ReactFormLoaderIndicatorComponent;

/***/ }),

/***/ "./src/meveo/pages/elements/ProjectPopupAssemblaLink.jsx":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = __webpack_require__("./node_modules/babel-runtime/core-js/object/get-prototype-of.js");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__("./node_modules/babel-runtime/helpers/createClass.js");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__("./node_modules/babel-runtime/helpers/possibleConstructorReturn.js");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__("./node_modules/babel-runtime/helpers/inherits.js");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__("./node_modules/react/react.js");

var _react2 = _interopRequireDefault(_react);

var _reactBootstrapDatePicker = __webpack_require__("./node_modules/react-bootstrap-date-picker/lib/index.js");

var _reactBootstrapDatePicker2 = _interopRequireDefault(_reactBootstrapDatePicker);

var _reactDom = __webpack_require__("./node_modules/react-dom/index.js");

var _reactBootstrap = __webpack_require__("./node_modules/react-bootstrap/es/index.js");

var _UserProfileAction = __webpack_require__("./src/meveo/actions/UserProfileAction.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ProjectPopupClient = function (_Component) {
    (0, _inherits3.default)(ProjectPopupClient, _Component);

    function ProjectPopupClient(props) {
        (0, _classCallCheck3.default)(this, ProjectPopupClient);

        var _this = (0, _possibleConstructorReturn3.default)(this, (ProjectPopupClient.__proto__ || (0, _getPrototypeOf2.default)(ProjectPopupClient)).call(this, props));

        _this.state = {
            assemblaLink: ''
        };
        _this.state.filterText = "";
        return _this;
    }

    (0, _createClass3.default)(ProjectPopupClient, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.setDataFormData();
        }
    }, {
        key: 'changeContent',
        value: function changeContent(name, e) {
            var state = this.state;
            state[name] = e.target.value;
            this.setState(state);
        }
    }, {
        key: 'setDataFormData',
        value: function setDataFormData() {
            var projectSee = this.props.projectSee;

            if (projectSee != null) {
                var state = this.state;
                state['code'] = projectSee.code;
                state['assemblaLink'] = projectSee.assemblaLink;
                this.setState(state);
            }
        }
    }, {
        key: 'edit_assembla_project',
        value: function edit_assembla_project(e) {
            e.preventDefault();
            var projectData = {
                "code": this.state.code,
                "assemblaLink": this.state.assemblaLink
            };
            (0, _UserProfileAction.editAssemblaProject)(projectData);
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'popup_bio' },
                _react2.default.createElement('div', { className: 'close_bio', onClick: this.props.closePopupAssembla }),
                _react2.default.createElement(
                    'form',
                    { method: 'get', onSubmit: this.edit_assembla_project.bind(this) },
                    _react2.default.createElement(
                        'div',
                        { className: 'header_bio' },
                        'EDIT ASSEMBLA LINK'
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'assembla_out' },
                        _react2.default.createElement(
                            'span',
                            { className: 'assembla_pro' },
                            'Assembla link :'
                        ),
                        _react2.default.createElement('input', {
                            className: 'input_as',
                            value: this.state.assemblaLink,
                            onChange: this.changeContent.bind(this, "assemblaLink"),
                            type: 'text' })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'footer_bio' },
                        _react2.default.createElement(
                            'button',
                            { className: 'btn_bio', type: 'submit', onClick: this.props.closePopupAssemblaDelay },
                            'SAVE'
                        )
                    )
                )
            );
        }
    }]);
    return ProjectPopupClient;
}(_react.Component);

exports.default = ProjectPopupClient;

/***/ }),

/***/ "./src/meveo/pages/elements/ProjectPopupClient.jsx":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = __webpack_require__("./node_modules/babel-runtime/helpers/defineProperty.js");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _toConsumableArray2 = __webpack_require__("./node_modules/babel-runtime/helpers/toConsumableArray.js");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _getPrototypeOf = __webpack_require__("./node_modules/babel-runtime/core-js/object/get-prototype-of.js");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__("./node_modules/babel-runtime/helpers/createClass.js");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__("./node_modules/babel-runtime/helpers/possibleConstructorReturn.js");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__("./node_modules/babel-runtime/helpers/inherits.js");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__("./node_modules/react/react.js");

var _react2 = _interopRequireDefault(_react);

var _reactBootstrapDatePicker = __webpack_require__("./node_modules/react-bootstrap-date-picker/lib/index.js");

var _reactBootstrapDatePicker2 = _interopRequireDefault(_reactBootstrapDatePicker);

var _reactDom = __webpack_require__("./node_modules/react-dom/index.js");

var _reactBootstrap = __webpack_require__("./node_modules/react-bootstrap/es/index.js");

var _UserProfileAction = __webpack_require__("./src/meveo/actions/UserProfileAction.js");

var _ProjectStore = __webpack_require__("./src/meveo/stores/ProjectStore.js");

var _ProjectStore2 = _interopRequireDefault(_ProjectStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ProjectPopupClient = function (_Component) {
    (0, _inherits3.default)(ProjectPopupClient, _Component);

    function ProjectPopupClient(props) {
        (0, _classCallCheck3.default)(this, ProjectPopupClient);

        //  this.state.products = [];
        var _this = (0, _possibleConstructorReturn3.default)(this, (ProjectPopupClient.__proto__ || (0, _getPrototypeOf2.default)(ProjectPopupClient)).call(this, props));

        _this.handleChange = function (idx) {
            return function (e) {
                var _e$target = e.target,
                    name = _e$target.name,
                    value = _e$target.value;

                var contacts = [].concat((0, _toConsumableArray3.default)(_this.state.contacts));
                contacts[idx] = (0, _defineProperty3.default)({}, name, value);
                _this.setState({
                    contacts: contacts
                });
            };
        };

        _this.handleAddRow = function () {
            var item = {
                name: _this.state.name,
                position: _this.state.position,
                mail: _this.state.mail,
                skype: _this.state.skype,
                tel: _this.state.tel
            };
            _this.setState({
                contacts: [].concat((0, _toConsumableArray3.default)(_this.state.contacts), [item])
            });
            setTimeout(function () {
                _this.setState({
                    showPopup: !_this.state.showPopup
                });
            }, 200);
        };

        _this.handleRemoveRow = function () {
            _this.setState({
                contacts: _this.state.contacts.slice(0, -1)
            });
        };

        _this.handleRemoveSpecificRow = function (idx) {
            return function () {
                var contacts = [].concat((0, _toConsumableArray3.default)(_this.state.contacts));
                contacts.splice(idx, 1);
                _this.setState({ contacts: contacts });
            };
        };

        _this.state = {
            file: { name: '', type: '' },
            logo: '',
            link: '',
            contacts: [{ id: '', nam: '', position: '', mail: '', skype: '', tel: '' }],
            description: '',
            showPopup: false,
            statusImage: null,
            error: {
                status: false,
                message: ""
            }
        };
        _this.state.filterText = "";
        _this.onChange = _this.onChange.bind(_this);
        return _this;
    }

    (0, _createClass3.default)(ProjectPopupClient, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            _ProjectStore2.default.bindUpdateHandler(this.projectDetailOnUpdate.bind(this));
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            _ProjectStore2.default.unbindUpdateHandler(this.projectDetailOnUpdate.bind(this));
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.setDataFormData();
        }
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate() {
            this.state.statusImage == 'upload_project_success';
            return true;
        }
    }, {
        key: 'projectDetailOnUpdate',
        value: function projectDetailOnUpdate(response) {
            console.log("project On Update");
            console.log(response);
            var result = response.result,
                message = response.message;

            if (message == "upload_project_success") {
                this.setState({
                    statusImage: message
                });
            }
            this.state;
        }
    }, {
        key: 'setDataFormData',
        value: function setDataFormData() {
            var projectSee = this.props.projectSee;

            if (projectSee != null) {
                var state = this.state;
                state['code'] = projectSee.code;
                state['logo'] = projectSee.logo;
                state['link'] = projectSee.link;
                state['contacts'] = projectSee.contacts;
                state['description'] = projectSee.description;
                this.setState(state);
            }
        }
    }, {
        key: 'edit_client_project',
        value: function edit_client_project(e) {
            e.preventDefault();
            if (this.validateUploadImage()) {
                if (this.state.statusImage == 'upload_project_success') {
                    var filename = this.state.file.name;
                }
                this.onFormSubmit();
                var projectData = {
                    "code": this.state.code,
                    "link": this.state.link,
                    "contacts": this.state.contacts,
                    "logo": filename,
                    "description": this.state.description
                };
                (0, _UserProfileAction.editClientProject)(projectData);
            }
        }

        // UPLOAD PROJECT IMAGE

    }, {
        key: 'onFormSubmit',
        value: function onFormSubmit() {
            this.fileUpload(this.state.file);
        }
    }, {
        key: 'onChange',
        value: function onChange(e) {
            this.setState({ file: e.target.files[0] });
        }
    }, {
        key: 'handleChangeFile',
        value: function handleChangeFile(e) {
            var file = e.target.files[0];
            if (file != null) {
                var filename = file.name;
            }

            var formData = new FormData();
            var code = this.state.code;
            formData.append('uploadedFile', file);
            formData.append('filename', filename);
            if (this.validateUploadImage()) {
                (0, _UserProfileAction.uploadImageProject)(formData, code);
            }
            this.setState({ file: e.target.files[0] });
        }
    }, {
        key: 'fileUpload',
        value: function fileUpload(file) {
            var filename = this.state.file.name;
            var formData = new FormData();
            var code = this.state.code;
            formData.append('uploadedFile', file);
            formData.append('filename', filename);
            (0, _UserProfileAction.uploadImageProject)(formData, code);
        }

        //table

    }, {
        key: 'changeContent',
        value: function changeContent(name, e) {
            if (!e.isTrusted) return;
            var state = this.state;
            state[name] = e.target.value;
            this.setState(state);
        }
    }, {
        key: 'togglePopup',
        value: function togglePopup() {
            this.setState({
                showPopup: !this.state.showPopup
            });
        }
    }, {
        key: 'validateUploadImage',
        value: function validateUploadImage() {
            if (this.state.file.type == "image/jpeg" || this.state.file.type == "" || this.state.file.type == "image/png" || this.state.file.type == "image/bmp") {
                var state = this.state;
                state['error']["status"] = false;
                state['error']["message"] = "";
                this.setState(state);
                return true;
            } else {
                var state = this.state;
                state['error']["status"] = true;
                state['error']["message"] = "Your file format is not good";
                this.setState(state);
                return false;
            }
        }
    }, {
        key: 'closePopup',
        value: function closePopup() {
            var _this2 = this;

            if (this.validateUploadImage()) {
                if (this.state.message == 'upload_project_success') {}
                setTimeout(function () {
                    _this2.props.closePopupClientDelay();
                }, 100);
            }
        }
    }, {
        key: 'openFileWindow',
        value: function openFileWindow(event) {
            event.preventDefault();
            document.getElementById('uploadImage').click();
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            return _react2.default.createElement(
                'div',
                { className: 'popup_skill' },
                _react2.default.createElement('div', { className: 'close_skill', onClick: this.props.closePopupClient }),
                _react2.default.createElement(
                    'form',
                    { method: 'get', onSubmit: this.edit_client_project.bind(this), autoComplete: 'off' },
                    _react2.default.createElement(
                        'div',
                        { className: 'header_skill' },
                        'EDIT PROJECT INFOS'
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'description_out' },
                        _react2.default.createElement(
                            'div',
                            { className: 'description_in' },
                            _react2.default.createElement(
                                'div',
                                { className: 'description' },
                                'Project detailed description :'
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'value_description' },
                                _react2.default.createElement('textarea', {
                                    onChange: this.changeContent.bind(this, "description"),
                                    cols: '70', rows: '4',
                                    value: this.state.description,
                                    type: 'text'
                                })
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'link_out' },
                        _react2.default.createElement(
                            'div',
                            { className: 'lk_pro' },
                            _react2.default.createElement(
                                'span',
                                { className: 'sub_link' },
                                'Link : '
                            ),
                            _react2.default.createElement('input', {
                                value: this.state.link,
                                onChange: this.changeContent.bind(this, "link"),
                                type: 'text',
                                className: 'ip_link' })
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'logo_out' },
                        _react2.default.createElement(
                            'div',
                            { className: 'logo_in' },
                            _react2.default.createElement(
                                'span',
                                { className: 'sub_logo' },
                                'Logo :'
                            ),
                            _react2.default.createElement(
                                'span',
                                { className: 'logo_pro' },
                                this.state.file.name ? this.state.file.name : this.state.logo
                            ),
                            '\xA0',
                            _react2.default.createElement(
                                'button',
                                { type: 'file',
                                    onClick: this.openFileWindow.bind(this),
                                    className: 'btn_see_pro' },
                                'Change file'
                            ),
                            _react2.default.createElement(
                                'span',
                                { className: 'size_pro' },
                                '500x500px'
                            ),
                            this.state.statusImage == "upload_project_success" ? _react2.default.createElement(
                                'span',
                                { className: 'logo_success' },
                                'Upload logo success'
                            ) : null
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'name_contact' },
                        'Contacts : '
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'table_client' },
                        _react2.default.createElement(
                            'table',
                            {
                                className: 'fixed_header ',
                                id: 'tab_logic'
                            },
                            _react2.default.createElement(
                                'thead',
                                null,
                                _react2.default.createElement(
                                    'tr',
                                    null,
                                    _react2.default.createElement(
                                        'th',
                                        { className: 'text-center' },
                                        ' Name '
                                    ),
                                    _react2.default.createElement(
                                        'th',
                                        { className: 'text-center' },
                                        ' Position '
                                    ),
                                    _react2.default.createElement(
                                        'th',
                                        { className: 'text-center' },
                                        ' Mail '
                                    ),
                                    _react2.default.createElement(
                                        'th',
                                        { className: 'text-center' },
                                        ' Skype '
                                    ),
                                    _react2.default.createElement(
                                        'th',
                                        { className: 'text-center' },
                                        ' Tel '
                                    ),
                                    _react2.default.createElement(
                                        'th',
                                        { className: 'text-center' },
                                        ' Delete '
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                'tbody',
                                null,
                                this.state.contacts.map(function (item, idx) {
                                    return _react2.default.createElement(
                                        'tr',
                                        { id: 'addr0', key: idx },
                                        _react2.default.createElement(
                                            'td',
                                            null,
                                            _this3.state.contacts[idx].name
                                        ),
                                        _react2.default.createElement(
                                            'td',
                                            null,
                                            _this3.state.contacts[idx].position
                                        ),
                                        _react2.default.createElement(
                                            'td',
                                            null,
                                            _this3.state.contacts[idx].mail
                                        ),
                                        _react2.default.createElement(
                                            'td',
                                            null,
                                            _this3.state.contacts[idx].skype
                                        ),
                                        _react2.default.createElement(
                                            'td',
                                            null,
                                            _this3.state.contacts[idx].tel
                                        ),
                                        _react2.default.createElement(
                                            'td',
                                            null,
                                            _react2.default.createElement('img', { onClick: _this3.handleRemoveSpecificRow(idx), src: 'images/icon/empty_skill.png', className: 'del-btn' })
                                        )
                                    );
                                })
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'add_row' },
                        _react2.default.createElement(
                            'span',
                            { className: 'bt4' },
                            _react2.default.createElement('img', { onClick: this.togglePopup.bind(this), src: 'images/icon/row.png' })
                        ),
                        _react2.default.createElement(
                            'span',
                            { className: 'new_line' },
                            'add new line'
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'show_row' },
                        this.state.showPopup ? _react2.default.createElement(
                            'div',
                            null,
                            _react2.default.createElement(
                                'div',
                                { className: ' input_client_line' },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'li_skill' },
                                    _react2.default.createElement(
                                        'span',
                                        { className: 'name_client_first' },
                                        'Name'
                                    ),
                                    _react2.default.createElement('input', {
                                        type: 'text',
                                        name: 'name',
                                        value: this.state.name,
                                        onChange: this.changeContent.bind(this, "name"),
                                        className: 'form-control',
                                        autoComplete: 'off'
                                    }),
                                    _react2.default.createElement(
                                        'span',
                                        { className: 'name_client' },
                                        'Position'
                                    ),
                                    _react2.default.createElement('input', {
                                        type: 'text',
                                        name: 'name',
                                        value: this.state.position,
                                        onChange: this.changeContent.bind(this, "position"),
                                        className: 'form-control',
                                        autoComplete: 'off'
                                    }),
                                    _react2.default.createElement(
                                        'span',
                                        { className: 'name_client' },
                                        'Mail'
                                    ),
                                    _react2.default.createElement('input', {
                                        type: 'text',
                                        name: 'name',
                                        value: this.state.mail,
                                        onChange: this.changeContent.bind(this, "mail"),
                                        className: 'form-control',
                                        autoComplete: 'off'
                                    }),
                                    _react2.default.createElement(
                                        'span',
                                        { className: 'name_client' },
                                        'Skype'
                                    ),
                                    _react2.default.createElement('input', {
                                        type: 'text',
                                        name: 'name',
                                        value: this.state.skype,
                                        onChange: this.changeContent.bind(this, "skype"),
                                        className: 'form-control',
                                        autoComplete: 'off'
                                    }),
                                    _react2.default.createElement(
                                        'span',
                                        { className: 'name_client' },
                                        'Tel'
                                    ),
                                    _react2.default.createElement('input', {
                                        type: 'text',
                                        name: 'tel',
                                        value: this.state.tel,
                                        onChange: this.changeContent.bind(this, "tel"),
                                        className: 'form-control',
                                        autoComplete: 'off'
                                    }),
                                    _react2.default.createElement(
                                        'button',
                                        { onClick: this.handleAddRow, className: ' add_line', type: 'button' },
                                        'Add'
                                    )
                                )
                            )
                        ) : null,
                        _react2.default.createElement('input', { onChange: this.handleChangeFile.bind(this), type: 'file', className: 'hidden', id: 'uploadImage' })
                    ),
                    this.state.error.status ? _react2.default.createElement(
                        'div',
                        { className: 'row' },
                        _react2.default.createElement(
                            'div',
                            { className: 'text-danger error_message_cli' },
                            this.state.error.message
                        )
                    ) : null,
                    _react2.default.createElement(
                        'div',
                        { className: 'footer_skill' },
                        this.state.showPopup == false ? _react2.default.createElement(
                            'button',
                            { className: 'btn_skill', type: 'submit', onClick: this.closePopup.bind(this) },
                            'SAVE'
                        ) : null
                    )
                )
            );
        }
    }]);
    return ProjectPopupClient;
}(_react.Component);

exports.default = ProjectPopupClient;

/***/ }),

/***/ "./src/meveo/pages/elements/ProjectPopupImage.jsx":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = __webpack_require__("./node_modules/babel-runtime/core-js/object/get-prototype-of.js");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__("./node_modules/babel-runtime/helpers/createClass.js");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__("./node_modules/babel-runtime/helpers/possibleConstructorReturn.js");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__("./node_modules/babel-runtime/helpers/inherits.js");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__("./node_modules/react/react.js");

var _react2 = _interopRequireDefault(_react);

var _reactBootstrapDatePicker = __webpack_require__("./node_modules/react-bootstrap-date-picker/lib/index.js");

var _reactBootstrapDatePicker2 = _interopRequireDefault(_reactBootstrapDatePicker);

var _reactDom = __webpack_require__("./node_modules/react-dom/index.js");

var _reactBootstrap = __webpack_require__("./node_modules/react-bootstrap/es/index.js");

var _UserProfileAction = __webpack_require__("./src/meveo/actions/UserProfileAction.js");

var _UserStore = __webpack_require__("./src/meveo/stores/UserStore.js");

var _UserStore2 = _interopRequireDefault(_UserStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ProjectPopupImage = function (_Component) {
    (0, _inherits3.default)(ProjectPopupImage, _Component);

    function ProjectPopupImage(props) {
        (0, _classCallCheck3.default)(this, ProjectPopupImage);

        var _this = (0, _possibleConstructorReturn3.default)(this, (ProjectPopupImage.__proto__ || (0, _getPrototypeOf2.default)(ProjectPopupImage)).call(this, props));

        _this.state = {
            file: { name: '', type: '' },
            form: {
                username: "",
                photo: ""
            },
            statusImage: null,
            filename: '',
            note: null,
            error: {
                status: false,
                message: ""
            },
            load: false

        };
        _this.state.filterText = "";
        _this.onChange = _this.onChange.bind(_this);

        return _this;
    }

    (0, _createClass3.default)(ProjectPopupImage, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            _UserStore2.default.bindUpdateHandler(this.userDetailOnUpdate.bind(this));
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            _UserStore2.default.bindUpdateHandler(this.userDetailOnUpdate.bind(this));
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.setDataFormData();
            this.edit_upload_image();
            (0, _UserProfileAction.uploadImage)();
        }
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate() {
            this.state.statusImage == 'upload_image_success';
            return true;
        }
    }, {
        key: 'userDetailOnUpdate',
        value: function userDetailOnUpdate(response) {
            console.log("user On Update");
            console.log(response);
            var result = response.result,
                message = response.message;


            if (message == "upload_image_success") {
                this.setState({
                    statusImage: message
                });
            }
            this.state;
        }
    }, {
        key: 'edit_upload_image',
        value: function edit_upload_image(event) {
            event.preventDefault();
            if (this.validateUploadImage()) {
                if (this.state.statusImage == 'upload_image_success') {
                    var filename = this.state.file.name;
                }
                this.onFormSubmit();

                var updateType = "form";
                var form = this.state.form;

                var userData = {
                    "username": form.username,
                    "photo": filename
                };
                (0, _UserProfileAction.editImageUser)(userData);
            }
        }

        // UPLOAD FILE IMAGE

    }, {
        key: 'onFormSubmit',
        value: function onFormSubmit() {
            this.fileUpload(this.state.file);
        }
    }, {
        key: 'onChange',
        value: function onChange(e) {
            this.setState({ file: e.target.files[0] });
        }
    }, {
        key: 'fileUpload',
        value: function fileUpload(file) {
            if (this.state.file != null) {
                var filename = this.state.file.name;
                var formData = new FormData();
                var username = this.state.form.username;
                formData.append('uploadedFile', file);
                formData.append('filename', filename);
                (0, _UserProfileAction.uploadImage)(formData, username);
            }
        }
    }, {
        key: 'handleChangeFile',
        value: function handleChangeFile(event) {
            var file = event.target.files[0];
            var filename = file.name;
            var formData = new FormData();
            formData.append('uploadedFile', file);
            formData.append('filename', filename);
            if (this.validateUploadImage()) {
                (0, _UserProfileAction.uploadImage)(formData);
            }
            this.setState({ file: event.target.files[0] });
        }
    }, {
        key: 'setDataFormData',
        value: function setDataFormData() {
            var userInfo = this.props.userInfo;

            if (userInfo != null) {
                var state = this.state;
                state['form']['username'] = userInfo.username;
                state['photo'] = userInfo.photo;
                this.setState(state);
            }
        }
    }, {
        key: 'openFileWindow',
        value: function openFileWindow(event) {
            event.preventDefault();
            document.getElementById('uploadImage').click();
        }
    }, {
        key: 'reloadPage',
        value: function reloadPage() {
            if (this.state.statusImage == 'upload_image_success') {
                location.reload();
            }
        }
    }, {
        key: 'validateUploadImage',
        value: function validateUploadImage() {
            if (this.state.file.type == "image/jpeg" || this.state.file.type == "" || this.state.file.type == "image/png" || this.state.file.type == "image/bmp") {
                var state = this.state;
                state['error']["status"] = false;
                state['error']["message"] = "";
                this.setState(state);
                return true;
            } else {
                var state = this.state;
                state['error']["status"] = true;
                state['error']["message"] = "Your file format is not good";
                this.setState(state);
                return false;
            }
        }
    }, {
        key: 'popupImageDelay',
        value: function popupImageDelay() {
            if (this.validateUploadImage()) {
                this.props.closePopupImageDelay();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var file = this.state.file;
            var statusImage = this.state.statusImage;
            return _react2.default.createElement(
                'div',
                { className: 'popup_bio' },
                _react2.default.createElement('div', { className: 'close_bio', onClick: this.props.closePopupImage }),
                _react2.default.createElement(
                    'form',
                    { method: 'post', onSubmit: this.edit_upload_image.bind(this) },
                    _react2.default.createElement(
                        'div',
                        { className: 'header_bio' },
                        'EDIT PROFILE PICTURE'
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'size_image' },
                        'Picture must be square, preferred size 500X500 px'
                    ),
                    _react2.default.createElement('br', null),
                    _react2.default.createElement(
                        'span',
                        { className: 'name_picture' },
                        'Upload Picture :'
                    ),
                    ' ',
                    _react2.default.createElement(
                        'span',
                        { className: 'name_photo' },
                        this.state.file.name ? this.state.file.name : this.state.photo
                    ),
                    _react2.default.createElement(
                        'button',
                        { className: 'btn_pic', onClick: this.openFileWindow.bind(this) },
                        'Change file'
                    ),
                    _react2.default.createElement('br', null),
                    _react2.default.createElement(
                        'div',
                        null,
                        this.state.error.status ? _react2.default.createElement(
                            'div',
                            { className: 'text-danger error_message' },
                            this.state.error.message
                        ) : null
                    ),
                    _react2.default.createElement('input', { onChange: this.handleChangeFile.bind(this), type: 'file', className: 'hidden', id: 'uploadImage' }),
                    _react2.default.createElement(
                        'div',
                        { className: 'footer_bio' },
                        this.state.statusImage == 'upload_image_success' ? _react2.default.createElement(
                            'button',
                            { className: 'btn_bio', type: 'submit',
                                onClick: this.popupImageDelay.bind(this)
                            },
                            'Save'
                        ) : _react2.default.createElement(
                            'button',
                            { className: 'btn_bio', type: 'submit',
                                disabled: true
                            },
                            'Save'
                        )
                    )
                )
            );
        }
    }]);
    return ProjectPopupImage;
}(_react.Component);

exports.default = ProjectPopupImage;

/***/ }),

/***/ "./src/meveo/pages/elements/ProjectPopupTeam.jsx":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = __webpack_require__("./node_modules/babel-runtime/helpers/extends.js");

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = __webpack_require__("./node_modules/babel-runtime/helpers/toConsumableArray.js");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _getPrototypeOf = __webpack_require__("./node_modules/babel-runtime/core-js/object/get-prototype-of.js");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__("./node_modules/babel-runtime/helpers/createClass.js");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__("./node_modules/babel-runtime/helpers/possibleConstructorReturn.js");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__("./node_modules/babel-runtime/helpers/inherits.js");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__("./node_modules/react/react.js");

var _react2 = _interopRequireDefault(_react);

var _reactBootstrapDatePicker = __webpack_require__("./node_modules/react-bootstrap-date-picker/lib/index.js");

var _reactBootstrapDatePicker2 = _interopRequireDefault(_reactBootstrapDatePicker);

var _reactDom = __webpack_require__("./node_modules/react-dom/index.js");

var _reactBootstrap = __webpack_require__("./node_modules/react-bootstrap/es/index.js");

var _UserProfileAction = __webpack_require__("./src/meveo/actions/UserProfileAction.js");

var _SeeProfile = __webpack_require__("./src/meveo/pages/user/SeeProfile.jsx");

var _SeeProfile2 = _interopRequireDefault(_SeeProfile);

var _UserStore = __webpack_require__("./src/meveo/stores/UserStore.js");

var _UserStore2 = _interopRequireDefault(_UserStore);

__webpack_require__("./node_modules/react-select/dist/react-select.css");

__webpack_require__("./node_modules/react-virtualized/styles.css");

__webpack_require__("./node_modules/react-virtualized-select/styles.css");

var _reactVirtualizedSelect = __webpack_require__("./node_modules/react-virtualized-select/dist/commonjs/index.js");

var _reactVirtualizedSelect2 = _interopRequireDefault(_reactVirtualizedSelect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ProjectPopupClient = function (_Component) {
    (0, _inherits3.default)(ProjectPopupClient, _Component);

    function ProjectPopupClient(props) {
        (0, _classCallCheck3.default)(this, ProjectPopupClient);

        var _this = (0, _possibleConstructorReturn3.default)(this, (ProjectPopupClient.__proto__ || (0, _getPrototypeOf2.default)(ProjectPopupClient)).call(this, props));

        _this.handleAddRow = function () {
            var item = {
                name: _this.state.name,
                role: _this.state.role
            };
            _this.setState({
                teams: [].concat((0, _toConsumableArray3.default)(_this.state.teams), [item])
            });
        };

        _this.handleRemoveSpecificRow = function (idx) {
            return function () {
                var teams = [].concat((0, _toConsumableArray3.default)(_this.state.teams));
                teams.splice(idx, 1);
                _this.setState({ teams: teams });
            };
        };

        _this.changeContent = function (name, e) {
            var state = _this.state;
            state[name] = e.target.value;
            _this.setState(state);
        };

        _this.state = {
            teams: []

        };
        return _this;
    }

    (0, _createClass3.default)(ProjectPopupClient, [{
        key: 'componentWillMount',
        value: function componentWillMount() {}
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {}
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.setDataFormData();
        }
    }, {
        key: 'setDataFormData',
        value: function setDataFormData() {
            var _this2 = this;

            var projectSee = this.props.projectSee;

            var teamGet = [];
            projectSee.teams.map(function (entry) {

                var singleObj = {};
                if (entry.name != null) {
                    singleObj["name"] = _this2.getUsernameToName(entry.name);
                    singleObj["role"] = entry.role;
                    teamGet.push(singleObj);
                }
            });
            if (projectSee != null) {
                var state = this.state;
                state['code'] = projectSee.code;
                state['teams'] = teamGet;
                this.setState(state);
            }
        }
    }, {
        key: 'edit_teams_project',
        value: function edit_teams_project(e) {
            var _this3 = this;

            var teamSave = [];
            this.state.teams.map(function (entry) {
                var singleObj = {};
                if (entry.name != null) {
                    singleObj["name"] = _this3.getCountryByCode(entry.name);
                    singleObj["role"] = entry.role;
                    teamSave.push(singleObj);
                }
            });
            e.preventDefault();
            var projectData = {
                "code": this.state.code,
                "teams": teamSave
            };
            (0, _UserProfileAction.editTeamsProject)(projectData);
        }
    }, {
        key: 'renderViewProfile',
        value: function renderViewProfile() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_SeeProfile2.default, (0, _extends3.default)({ parent: this, backAllProfiles: this.backAllProfiles, userInfo: this.state.userInfo }, this.state, { baseData: this.props.baseData }, this.props))
            );
        }
    }, {
        key: 'getCountryByCode',
        value: function getCountryByCode(code) {
            var users = this.props.users;
            var all_team = [];
            users.map(function (entry) {

                var singleObj = {};
                if (entry.name != null) {
                    singleObj["value"] = entry.name;
                    singleObj["label"] = entry.username;
                    all_team.push(singleObj);
                }
            });
            if (code != null) {

                var _country = all_team.filter(function (c) {
                    return c.value.toLowerCase() == code.toLowerCase();
                });
                return _country[0].label;
            }
        }
    }, {
        key: 'getUsernameToName',
        value: function getUsernameToName(code) {
            var users = this.props.users;
            var all_team = [];
            users.map(function (entry) {

                var singleObj = {};
                if (entry.username != null) {
                    singleObj["value"] = entry.name;
                    singleObj["label"] = entry.username;
                    all_team.push(singleObj);
                }
            });
            if (code != null) {

                var _country = all_team.filter(function (c) {
                    return c.label.toLowerCase() == code.toLowerCase();
                });
                return _country[0].value;
            }
        }
    }, {
        key: 'setProject',
        value: function setProject(val) {
            if (val != null) {
                var state = this.state;
                state['name'] = val.value;
                this.setState(state);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            var users = this.props.users;
            var all_team = [];
            var listName = [];
            users.map(function (entry) {
                var singleObj = {};
                if (entry.name != null) {
                    listName.push(entry.name);
                }
            });
            listName.sort();
            listName.map(function (entry) {
                var singleObj = {};
                if (entry != null) {
                    singleObj["value"] = entry;
                    singleObj["label"] = entry;
                    all_team.push(singleObj);
                }
            });

            return _react2.default.createElement(
                'div',
                { className: 'popup_skill' },
                _react2.default.createElement('div', { className: 'close_skill', onClick: this.props.closePopupTeam }),
                _react2.default.createElement(
                    'form',
                    { method: 'get', onSubmit: this.edit_teams_project.bind(this) },
                    _react2.default.createElement(
                        'div',
                        { className: 'header_skill' },
                        'EDIT MANATY TEAM'
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'table_team' },
                        _react2.default.createElement(
                            'table',
                            {
                                className: 'croll_team'
                            },
                            _react2.default.createElement(
                                'thead',
                                null,
                                _react2.default.createElement(
                                    'tr',
                                    null,
                                    _react2.default.createElement(
                                        'th',
                                        { className: 'text-center' },
                                        ' Name '
                                    ),
                                    _react2.default.createElement(
                                        'th',
                                        { className: 'text-center' },
                                        ' Role '
                                    ),
                                    _react2.default.createElement(
                                        'th',
                                        { className: 'text-center' },
                                        ' Delete '
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                'tbody',
                                null,
                                this.state.teams.map(function (item, idx) {
                                    return _react2.default.createElement(
                                        'tr',
                                        { key: idx },
                                        _react2.default.createElement(
                                            'td',
                                            null,
                                            _this4.state.teams[idx].name
                                        ),
                                        _react2.default.createElement(
                                            'td',
                                            null,
                                            _this4.state.teams[idx].role
                                        ),
                                        _react2.default.createElement(
                                            'td',
                                            null,
                                            _react2.default.createElement('img', { onClick: _this4.handleRemoveSpecificRow(idx), src: 'images/icon/empty_skill.png', className: 'del-btn' })
                                        )
                                    );
                                })
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'add_member' },
                        'Add member : '
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'select_team' },
                        _react2.default.createElement(
                            'span',
                            { className: '' },
                            _react2.default.createElement(_reactVirtualizedSelect2.default, {
                                className: 'select_team_user',
                                value: this.state.name,
                                placeholder: 'Name',
                                options: all_team,
                                onChange: this.setProject.bind(this)
                            })
                        ),
                        _react2.default.createElement('br', null)
                    ),
                    _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement('input', { className: 'select_team_role',
                            value: this.state.role,
                            onChange: this.changeContent.bind(this, "role"),
                            placeholder: 'Role in the project' }),
                        _react2.default.createElement('br', null)
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'footer_skill' },
                        _react2.default.createElement(
                            'button',
                            { className: 'btn_skill', type: 'submit', onClick: this.props.closePopupTeamDelay },
                            'SAVE'
                        )
                    )
                ),
                _react2.default.createElement(
                    'button',
                    { className: 'btn_add', disabled: !this.state.teams || !this.state.role, onClick: this.handleAddRow },
                    'Add'
                )
            );
        }
    }]);
    return ProjectPopupClient;
}(_react.Component);

exports.default = ProjectPopupClient;

/***/ }),

/***/ "./src/meveo/pages/elements/UserPopup.jsx":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = __webpack_require__("./node_modules/babel-runtime/core-js/object/get-prototype-of.js");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__("./node_modules/babel-runtime/helpers/createClass.js");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__("./node_modules/babel-runtime/helpers/possibleConstructorReturn.js");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__("./node_modules/babel-runtime/helpers/inherits.js");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__("./node_modules/react/react.js");

var _react2 = _interopRequireDefault(_react);

var _reactBootstrapDatePicker = __webpack_require__("./node_modules/react-bootstrap-date-picker/lib/index.js");

var _reactBootstrapDatePicker2 = _interopRequireDefault(_reactBootstrapDatePicker);

var _reactDom = __webpack_require__("./node_modules/react-dom/index.js");

var _reactSelectPlus = __webpack_require__("./node_modules/react-select-plus/lib/Select.js");

var _reactSelectPlus2 = _interopRequireDefault(_reactSelectPlus);

var _reactBootstrap = __webpack_require__("./node_modules/react-bootstrap/es/index.js");

var _UserProfileAction = __webpack_require__("./src/meveo/actions/UserProfileAction.js");

var _moment = __webpack_require__("./node_modules/moment/moment.js");

var _moment2 = _interopRequireDefault(_moment);

var _axios = __webpack_require__("./node_modules/axios/index.js");

var _axios2 = _interopRequireDefault(_axios);

var _UserStore = __webpack_require__("./src/meveo/stores/UserStore.js");

var _UserStore2 = _interopRequireDefault(_UserStore);

__webpack_require__("./node_modules/react-select-plus/dist/react-select-plus.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserPopup = function (_Component) {
    (0, _inherits3.default)(UserPopup, _Component);

    function UserPopup() {
        (0, _classCallCheck3.default)(this, UserPopup);

        var _this = (0, _possibleConstructorReturn3.default)(this, (UserPopup.__proto__ || (0, _getPrototypeOf2.default)(UserPopup)).call(this));

        _this.state = {
            options: _this.options,
            showPopup: false,
            isLoading: false,
            editMode: false,
            form: {
                username: "",
                email: "",
                firstName: "",
                lastName: "",
                sinceDate: null,
                photo: "",
                job: "",
                skypeId: "",
                country: "",
                linkedin: "",
                cv: "",
                skills: [{ name: "", ratio: null }],
                projects: [{ name: "", role: "" }],
                availability: { hoursWork: "", infos: "", timeZone: "", vocations: "" }
            },
            filename: "",
            file: { name: '' },
            filenameCV: "",
            fileCV: { name: '', type: '' },
            name: '',
            formError: {
                status: false,
                message: ""
            },
            userMsg: null,
            statusCV: null,
            error: {
                status: false,
                message: ""
            },
            value: ''

        };
        _this.mandatoryFieldsList = [];
        _this.onChangeCV = _this.onChangeCV.bind(_this);

        return _this;
    }

    (0, _createClass3.default)(UserPopup, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            _UserStore2.default.bindUpdateHandler(this.userDetailOnUpdate.bind(this));
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            _UserStore2.default.bindUpdateHandler(this.userDetailOnUpdate.bind(this));
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.setDataFormData();
            this.edit_user();
            (0, _UserProfileAction.uploadCV)();
        }
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate() {
            this.state.statusCV == 'upload_cv_success';
            return true;
        }
    }, {
        key: 'userDetailOnUpdate',
        value: function userDetailOnUpdate(response) {
            console.log("user On Update");
            console.log(response);
            var result = response.result,
                message = response.message;


            if (message == "upload_cv_success") {
                this.setState({
                    statusCV: message
                });
            }
            this.state;
        }
    }, {
        key: 'changeContent',
        value: function changeContent(name, e) {
            var state = this.state;
            state['form'][name] = e.target.value;
            this.setState(state);
        }
    }, {
        key: 'validateMandatoryFields',
        value: function validateMandatoryFields() {
            var mandatories = [];
            var formValues = this.state.form;
            this.mandatoryFieldsList.map(function (field) {
                if (formValues[field] != null) {
                    if (formValues[field].trim().length == 0) {
                        mandatories.push(field);
                    }
                } else {
                    mandatories.push(field);
                }
            });
            var state = this.state;
            state['mandatoryFields'] = mandatories.slice();
            this.setState(state);

            if (mandatories.length > 0) {
                return false;
            } else {
                return true;
            }
        }
    }, {
        key: 'setCountry',
        value: function setCountry(name, val) {
            if (val != null) {
                var state = this.state;
                state['form']['country'] = val.value;
                this.setState(state);
            }
        }
    }, {
        key: 'changeDate',
        value: function changeDate(name, value) {
            if (value != null && name != null) {
                var dateValue = value.substr(0, 10);
            } else {
                var dateValue = null;
            }

            var state = this.state;
            state['form'][name] = dateValue;
            this.setState(state);
        }
    }, {
        key: 'convertDate',
        value: function convertDate(date) {
            if (date != null && date != 0) {
                var date_ = date.substr(0, 10).replace(/\//g, "-");
                var dateArray = date_.split("-");
                date = dateArray[2] + "-" + dateArray[1] + "-" + dateArray[0] + ' ' + date.substr(11);
                return date;
            }
        }
    }, {
        key: 'edit_user',
        value: function edit_user(event) {
            event.preventDefault();
            if (this.validateUploadCV()) {
                if (this.state.statusCV == 'upload_cv_success') {
                    var filenameCV = this.state.fileCV.name;
                }
                this.onFormSubmitCV();

                var updateType = "form";
                var form = this.state.form;

                var userData = {
                    "email": form.email,
                    "username": form.username,
                    "lastName": form.lastName,
                    "sinceDate": form.sinceDate,
                    "firstName": form.firstName,
                    "job": form.job,
                    "skypeId": form.skypeId,
                    "country": form.country,
                    "linkedin": form.linkedin,
                    "cv": filenameCV
                };
                (0, _UserProfileAction.editProfileUser)(userData);
            }
        }

        // UPLOAD FILE CV

    }, {
        key: 'onFormSubmitCV',
        value: function onFormSubmitCV() {
            this.fileUploadCV(this.state.fileCV);
        }
    }, {
        key: 'onChangeCV',
        value: function onChangeCV(e) {
            this.setState({ fileCV: e.target.files[0] });
        }
    }, {
        key: 'fileUploadCV',
        value: function fileUploadCV(fileCV) {
            if (this.state.fileCV != null) {
                var filenameCV = this.state.fileCV.name;
                var formData = new FormData();
                var username = this.state.form.username;
                formData.append('uploadedFile', fileCV);
                formData.append('filename', filenameCV);
                (0, _UserProfileAction.uploadCV)(formData, username);
            }
        }
    }, {
        key: 'handleChangeFile',
        value: function handleChangeFile(event) {
            var fileCV = event.target.files[0];
            if (fileCV != null) {
                var filenameCV = fileCV.name;
            }
            var formData = new FormData();
            formData.append('uploadedFile', fileCV);
            formData.append('filename', filenameCV);
            if (this.validateUploadCV()) {
                (0, _UserProfileAction.uploadCV)(formData);
            }
            this.setState({ fileCV: event.target.files[0] });
        }
    }, {
        key: 'setDataFormData',
        value: function setDataFormData() {
            var userInfo = this.props.userInfo;

            if (userInfo != null) {
                var state = this.state;
                state['form']['email'] = userInfo.email;
                state['form']['username'] = userInfo.username;
                state['form']['lastName'] = userInfo.lastName;
                state['form']['firstName'] = userInfo.firstName;
                state['form']['sinceDate'] = userInfo.sinceDate != null ? this.convertDate(userInfo.sinceDate) : null;
                state['form']['job'] = userInfo.job;
                state['form']['skypeId'] = userInfo.skypeId;
                state['form']['country'] = userInfo.country;
                state['form']['linkedin'] = userInfo.linkedin;
                state['cv'] = userInfo.cv;
                this.setState(state);
            }
        }
    }, {
        key: 'validateUploadCV',
        value: function validateUploadCV() {
            if (this.state.fileCV.type == "application/msword" || this.state.fileCV.type == "" || this.state.fileCV.type == "application/pdf") {
                var state = this.state;
                state['error']["status"] = false;
                state['error']["message"] = "";
                this.setState(state);
                return true;
            } else {
                var state = this.state;
                state['error']["status"] = true;
                state['error']["message"] = "Your file format is not good";
                this.setState(state);
                return false;
            }
        }
    }, {
        key: 'closePopup',
        value: function closePopup() {
            var _this2 = this;

            if (this.validateUploadCV()) {
                if (this.state.message == 'upload_cv_success') {}
                setTimeout(function () {
                    _this2.props.closePopup();
                }, 100);
            }
        }
    }, {
        key: 'renderPopup',
        value: function renderPopup() {
            var all_countries = this.props.baseData.all_countries;

            return _react2.default.createElement(
                'div',
                { className: 'popup_skill' },
                _react2.default.createElement('div', { className: 'close_bio', onClick: this.props.closePopup }),
                _react2.default.createElement(
                    'form',
                    { method: 'get', onSubmit: this.edit_user.bind(this) },
                    _react2.default.createElement(
                        'div',
                        { className: 'header_bio' },
                        'EDIT PROFILE'
                    ),
                    _react2.default.createElement(
                        'table',
                        { className: 'edit_profile' },
                        _react2.default.createElement(
                            'tbody',
                            null,
                            _react2.default.createElement(
                                'tr',
                                null,
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    _react2.default.createElement(
                                        'label',
                                        { className: 'label_profile' },
                                        _react2.default.createElement(
                                            'span',
                                            null,
                                            'First name: '
                                        )
                                    )
                                ),
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    _react2.default.createElement('input', {
                                        className: 'ip_profile',
                                        value: this.state.form.firstName,
                                        onChange: this.changeContent.bind(this, "firstName"),
                                        type: 'text'
                                    })
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'tbody',
                            null,
                            _react2.default.createElement(
                                'tr',
                                null,
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    _react2.default.createElement(
                                        'label',
                                        { className: 'label_profile' },
                                        _react2.default.createElement(
                                            'span',
                                            null,
                                            'Last name: '
                                        )
                                    )
                                ),
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    _react2.default.createElement('input', {
                                        className: 'ip_profile',
                                        value: this.state.form.lastName,
                                        onChange: this.changeContent.bind(this, "lastName"),
                                        type: 'text'
                                    })
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'tbody',
                            null,
                            _react2.default.createElement(
                                'tr',
                                null,
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    _react2.default.createElement(
                                        'label',
                                        { className: 'label_profile' },
                                        _react2.default.createElement(
                                            'span',
                                            null,
                                            'Manaty member since: '
                                        )
                                    )
                                ),
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    _react2.default.createElement(
                                        'span',
                                        { className: 'ip_picker' },
                                        _react2.default.createElement(_reactBootstrapDatePicker2.default, { className: 'picker',
                                            dateFormat: 'DD/MM/YYYY',
                                            value: this.state.form.sinceDate,
                                            onChange: this.changeDate.bind(this, "sinceDate")
                                        })
                                    )
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'tbody',
                            null,
                            _react2.default.createElement(
                                'tr',
                                null,
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    _react2.default.createElement(
                                        'label',
                                        { className: 'label_profile' },
                                        _react2.default.createElement(
                                            'span',
                                            null,
                                            'Job:  '
                                        )
                                    )
                                ),
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    _react2.default.createElement('input', {
                                        className: 'ip_profile',
                                        value: this.state.form.job,
                                        onChange: this.changeContent.bind(this, "job"),
                                        type: 'text' })
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'tbody',
                            null,
                            _react2.default.createElement(
                                'tr',
                                null,
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    _react2.default.createElement(
                                        'label',
                                        { className: 'label_profile' },
                                        _react2.default.createElement(
                                            'span',
                                            null,
                                            'Country:  '
                                        )
                                    )
                                ),
                                _react2.default.createElement(
                                    'td',
                                    { className: 'coutry' },
                                    _react2.default.createElement(
                                        'div',
                                        null,
                                        _react2.default.createElement(_reactSelectPlus2.default, {
                                            className: 'select_popup_country',
                                            value: this.state.form.country,
                                            options: this.props.countryAll,
                                            onChange: this.setCountry.bind(this, 'value')
                                        })
                                    )
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'tbody',
                            null,
                            _react2.default.createElement(
                                'tr',
                                null,
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    _react2.default.createElement(
                                        'label',
                                        { className: 'label_profile' },
                                        _react2.default.createElement(
                                            'span',
                                            null,
                                            'Manaty email: '
                                        )
                                    )
                                ),
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    _react2.default.createElement('input', {
                                        className: 'ip_profile',
                                        value: this.state.form.email,
                                        onChange: this.changeContent.bind(this, "email"),
                                        type: 'text'
                                    })
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'tbody',
                            null,
                            _react2.default.createElement(
                                'tr',
                                null,
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    _react2.default.createElement(
                                        'label',
                                        { className: 'label_profile' },
                                        _react2.default.createElement(
                                            'span',
                                            null,
                                            'Skype id: '
                                        )
                                    )
                                ),
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    _react2.default.createElement('input', {
                                        className: 'ip_profile',
                                        value: this.state.form.skypeId,
                                        onChange: this.changeContent.bind(this, "skypeId"),
                                        type: 'text' })
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'tbody',
                            null,
                            _react2.default.createElement(
                                'tr',
                                null,
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    _react2.default.createElement(
                                        'label',
                                        { className: 'label_profile' },
                                        _react2.default.createElement(
                                            'span',
                                            null,
                                            'Linkedin link: '
                                        )
                                    )
                                ),
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    _react2.default.createElement('input', {
                                        className: 'ip_profile',
                                        value: this.state.form.linkedin,
                                        onChange: this.changeContent.bind(this, "linkedin"),
                                        type: 'text' })
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'tbody',
                            null,
                            _react2.default.createElement(
                                'tr',
                                null,
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    _react2.default.createElement(
                                        'label',
                                        { className: 'label_profile' },
                                        _react2.default.createElement(
                                            'span',
                                            null,
                                            'Upload CV: '
                                        )
                                    )
                                ),
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    ' ',
                                    _react2.default.createElement('input', { className: 'body_relative ip_profile', type: 'file', onChange: this.handleChangeFile.bind(this) })
                                )
                            )
                        ),
                        _react2.default.createElement('div', null)
                    ),
                    this.state.statusCV == 'upload_cv_success' ? _react2.default.createElement(
                        'span',
                        { className: 'cv_success' },
                        'Upload success'
                    ) : null,
                    this.state.error.status ? _react2.default.createElement(
                        'div',
                        { className: 'text-danger error_message' },
                        this.state.error.message
                    ) : null,
                    _react2.default.createElement(
                        'div',
                        { className: 'footer_bio' },
                        _react2.default.createElement(
                            'button',
                            { className: 'btn_bio', type: 'submit', onClick: this.closePopup.bind(this) },
                            'SAVE'
                        )
                    )
                )
            );
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                this.renderPopup()
            );
        }
    }]);
    return UserPopup;
}(_react.Component);

exports.default = UserPopup;

/***/ }),

/***/ "./src/meveo/pages/elements/UserPopupAvailability.jsx":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _toConsumableArray2 = __webpack_require__("./node_modules/babel-runtime/helpers/toConsumableArray.js");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = __webpack_require__("./node_modules/babel-runtime/helpers/extends.js");

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = __webpack_require__("./node_modules/babel-runtime/core-js/object/get-prototype-of.js");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__("./node_modules/babel-runtime/helpers/createClass.js");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__("./node_modules/babel-runtime/helpers/possibleConstructorReturn.js");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__("./node_modules/babel-runtime/helpers/inherits.js");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__("./node_modules/react/react.js");

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__("./node_modules/react-dom/index.js");

var _reactBootstrap = __webpack_require__("./node_modules/react-bootstrap/es/index.js");

var _UserProfileAction = __webpack_require__("./src/meveo/actions/UserProfileAction.js");

var _reactDaterangePicker = __webpack_require__("./node_modules/react-daterange-picker/dist/DateRangePicker.js");

var _reactDaterangePicker2 = _interopRequireDefault(_reactDaterangePicker);

__webpack_require__("./node_modules/react-daterange-picker/dist/css/react-calendar.css");

var _propTypes = __webpack_require__("./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _timezones = __webpack_require__("./node_modules/timezones.json/index.js");

var _timezones2 = _interopRequireDefault(_timezones);

var _moment = __webpack_require__("./node_modules/moment/moment.js");

var _moment2 = _interopRequireDefault(_moment);

var _momentRange = __webpack_require__("./node_modules/moment-range/dist/moment-range.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var moment = (0, _momentRange.extendMoment)(_moment2.default);

var Vocations = function (_React$Component) {
    (0, _inherits3.default)(Vocations, _React$Component);

    function Vocations() {
        (0, _classCallCheck3.default)(this, Vocations);
        return (0, _possibleConstructorReturn3.default)(this, (Vocations.__proto__ || (0, _getPrototypeOf2.default)(Vocations)).apply(this, arguments));
    }

    (0, _createClass3.default)(Vocations, [{
        key: 'delete',
        value: function _delete(vocation) {
            this.props.delete(vocation);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var vocas = [];
            if (this.props.vocations) {
                vocas = this.props.vocations;
            }
            return _react2.default.createElement(
                'ul',
                { className: 'li_availability' },
                vocas.map(function (vocation, index) {
                    return _react2.default.createElement(
                        'li',
                        { className: 'vocation_list_availability', key: index },
                        vocation,
                        _react2.default.createElement('span', { onClick: _this2.delete.bind(_this2, vocation), className: 'empty_availability' })
                    );
                })
            );
        }
    }]);
    return Vocations;
}(_react2.default.Component);

var UserPopupAvailability = function (_Component) {
    (0, _inherits3.default)(UserPopupAvailability, _Component);

    function UserPopupAvailability() {
        (0, _classCallCheck3.default)(this, UserPopupAvailability);

        var _this3 = (0, _possibleConstructorReturn3.default)(this, (UserPopupAvailability.__proto__ || (0, _getPrototypeOf2.default)(UserPopupAvailability)).call(this));

        _this3.onSelect = function (value, states) {

            _this3.setState({ value: value, states: states

            });
            if (_this3.state.value.end != null) {
                _this3.setState({

                    showPopup: !_this3.state.showPopup
                });
            }
            event.preventDefault();
            if (_this3.state.value != null) {
                if (_this3.state.value.start != null && _this3.state.value.end != null) {
                    var String_1 = _this3.state.value.start.format("DD/MM/YYYY");
                    var String_2 = _this3.state.value.end.format("DD/MM/YYYY");
                    var String_3 = String_1.concat(" - ", String_2);
                }
                if (_this3.state.value.start.format("DD/MM/YYYY") == _this3.state.value.end.format("DD/MM/YYYY")) {
                    var String_1 = _this3.state.value.start.format("DD/MM/YYYY");
                    var String_3 = String_1;
                }
            }
            _this3.setState({
                availability: (0, _extends3.default)({}, _this3.state.availability, {
                    vocations: [].concat((0, _toConsumableArray3.default)(_this3.state.availability.vocations), [String_3])
                })
            });
        };

        _this3.onToggle = function () {
            _this3.setState({ isOpen: !_this3.state.isOpen });
        };

        var today = moment();
        _this3.state = {
            showPopup: false,
            isLoading: false,
            error: null,
            editMode: false,
            form: {
                username: "",
                email: "",
                firstName: "",
                lastName: "",
                bio: "",
                skills: "",
                manatyProjects: ""

            },
            formError: {
                status: false,
                message: ""
            },
            availability: { hoursWork: null, infos: '', timeZone: '', vocations: [] },
            startDate: moment(),
            endDate: moment(),
            isOpen: true,
            value: null

        };
        _this3.mandatoryFieldsList = [];

        return _this3;
    }

    (0, _createClass3.default)(UserPopupAvailability, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.setDataFormData();
            this.edit_availability_user();
        }
    }, {
        key: 'changeContent',
        value: function changeContent(name, e) {
            var state = this.state;
            state['availability'][name] = e.target.value;
            this.setState(state);
        }
    }, {
        key: 'validateMandatoryFields',
        value: function validateMandatoryFields() {
            var mandatories = [];
            var formValues = this.state.form;
            this.mandatoryFieldsList.map(function (field) {
                if (formValues[field] != null) {
                    if (formValues[field].trim().length == 0) {
                        mandatories.push(field);
                    }
                } else {
                    mandatories.push(field);
                }
            });
            var state = this.state;
            state['mandatoryFields'] = mandatories.slice();
            this.setState(state);

            if (mandatories.length > 0) {
                return false;
            } else {
                return true;
            }
        }
    }, {
        key: 'edit_availability_user',
        value: function edit_availability_user(event) {
            event.preventDefault();
            var updateType = "form";
            var form = this.state.form;

            var userData = {
                "username": form.username,
                "availability": this.state.availability
            };
            (0, _UserProfileAction.editAvailabilityUser)(userData);
        }
    }, {
        key: 'setDataFormData',
        value: function setDataFormData() {
            var userInfo = this.props.userInfo;

            if (userInfo != null) {
                var state = this.state;
                state['form']['email'] = userInfo.email || "";
                state['form']['username'] = userInfo.username || "";
                state['form']['lastName'] = userInfo.lastName || "";
                state['form']['firstName'] = userInfo.firstName || "";
                state['availability'] = userInfo.availability;

                this.setState(state);
            }
        }
        // state['form']['availability']['vocations'] =userInfo.availability.vocations!=null? this.convertDate(userInfo.availability.vocations):null;

    }, {
        key: 'changeDate',
        value: function changeDate(name, value) {
            if (value != null && name != null) {
                var dateValue = value.substr(0, 10);
            } else {
                var dateValue = null;
            }
            var state = this.state;
            state['availability'][name] = dateValue;
            this.setState(state);
        }

        // convertDate(date){
        //     if (date != null && date != 0) {
        //         var date_ = date.substr(0, 10).replace(/\//g , "-");
        //         var dateArray = date_.split("-");
        //         date = dateArray[2]+"-"+dateArray[1]+"-"+dateArray[0]+' '+date.substr(11);
        //         return date;
        //     }
        // }

    }, {
        key: 'delete',
        value: function _delete(vocation) {
            this.setState(function (prevState) {
                return {
                    availability: (0, _extends3.default)({}, prevState.availability, {
                        vocations: prevState.availability.vocations.filter(function (el) {
                            return el != vocation;
                        })
                    })
                };
            });
        }
    }, {
        key: 'dateChanged',
        value: function dateChanged(d) {
            this.setState({ date: d });
        }
    }, {
        key: 'combineTwoStrings',
        value: function combineTwoStrings(event) {
            event.preventDefault();
            if (this.state.value != null) {
                if (this.state.value.start != null && this.state.value.end != null) {
                    var String_1 = this.state.value.start.format("DD/MM/YYYY");
                    var String_2 = this.state.value.end.format("DD/MM/YYYY");
                    var String_3 = String_1.concat(" - ", String_2);
                }
                if (this.state.value.start.format("DD/MM/YYYY") == this.state.value.end.format("DD/MM/YYYY")) {
                    var String_1 = this.state.value.start.format("DD/MM/YYYY");
                    var String_3 = String_1;
                }
            }
            this.setState({
                availability: (0, _extends3.default)({}, this.state.availability, {
                    vocations: [].concat((0, _toConsumableArray3.default)(this.state.availability.vocations), [String_3])
                })
            });
        }
    }, {
        key: 'changeVocation',
        value: function changeVocation(name, e) {
            var state = this.state;
            state[name] = e.target.value;
            this.setState(state);
        }

        //Datapicker

    }, {
        key: 'handleStartChange',
        value: function handleStartChange(startDate) {
            this.setState({ startDate: startDate });
        }
    }, {
        key: 'handleEndChange',
        value: function handleEndChange(endDate) {
            return this.setState({ endDate: endDate });
        }
    }, {
        key: 'closePopupAvailability',
        value: function closePopupAvailability() {
            var _this4 = this;

            setTimeout(function () {
                _this4.props.closePopupAvailability();
            }, 100);
        }
    }, {
        key: 'togglePopup',
        value: function togglePopup() {
            this.setState({
                showPopup: !this.state.showPopup
            });
        }
    }, {
        key: 'renderCalendarPopup',
        value: function renderCalendarPopup() {
            return _react2.default.createElement(
                'div',
                { className: 'date_picker' },
                this.state.showPopup ? _react2.default.createElement(
                    'div',
                    null,
                    " ",
                    this.state.isOpen && _react2.default.createElement(_reactDaterangePicker2.default, {
                        value: this.state.value,
                        onSelect: this.onSelect,
                        singleDateRange: true
                    }),
                    " "
                ) : null
            );
        }
    }, {
        key: 'renderPopupAvailability',
        value: function renderPopupAvailability() {
            var _state = this.state,
                startDate = _state.startDate,
                endDate = _state.endDate;

            if (this.state.value != null) {
                if (this.state.value.start != null && this.state.value.end != null) {
                    var String_1 = this.state.value.start.format("DD/MM/YYYY");
                    var String_2 = this.state.value.end.format("DD/MM/YYYY");
                    var String_3 = String_1.concat(" - ", String_2);
                }
                if (this.state.value.start.format("DD/MM/YYYY") == this.state.value.end.format("DD/MM/YYYY")) {
                    var String_1 = this.state.value.start.format("DD/MM/YYYY");
                    var String_3 = String_1;
                }
            }
            return _react2.default.createElement(
                'div',
                { className: 'popup_availability' },
                _react2.default.createElement('div', { className: 'close_availability', onClick: this.props.closePopupAvailability }),
                _react2.default.createElement(
                    'form',
                    { method: 'get', onSubmit: this.edit_availability_user.bind(this) },
                    _react2.default.createElement(
                        'div',
                        { className: 'header_availability' },
                        'EDIT AVAILABILITY'
                    ),
                    _react2.default.createElement('div', null),
                    _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement(
                            'label',
                            { className: 'label_popup' },
                            'Number of working hours a week:'
                        ),
                        _react2.default.createElement('input', { className: 'avai_input',
                            type: 'number',
                            onChange: this.changeContent.bind(this, "hoursWork"),
                            value: this.state.availability.hoursWork
                        }),
                        ' hrs'
                    ),
                    _react2.default.createElement('br', null),
                    _react2.default.createElement('div', null),
                    _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement(
                            'label',
                            { className: 'label_popup' },
                            'Infos (preferred working days,preferred hours slots,constraints):'
                        )
                    ),
                    _react2.default.createElement('div', null),
                    _react2.default.createElement(
                        'label',
                        null,
                        _react2.default.createElement('textarea', {
                            onChange: this.changeContent.bind(this, "infos"),
                            className: 'avai_popup', cols: '80', rows: '5',
                            value: this.state.availability.infos })
                    ),
                    _react2.default.createElement('br', null),
                    _react2.default.createElement('div', null),
                    _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement(
                            'label',
                            { className: 'label_popup' },
                            'Time zone (UTC):'
                        ),
                        _react2.default.createElement(
                            'select',
                            { value: this.state.availability.timeZone, className: 'avai_select', onChange: this.changeContent.bind(this, "timeZone") },
                            _timezones2.default != null ? _timezones2.default.map(function (el) {
                                return _react2.default.createElement(
                                    'option',
                                    { value: el.text },
                                    el.text
                                );
                            }) : null
                        )
                    ),
                    _react2.default.createElement('br', null),
                    _react2.default.createElement('div', null),
                    _react2.default.createElement(
                        'label',
                        { className: 'label_popup' },
                        'Vacations:'
                    ),
                    _react2.default.createElement('input', { className: 'input_vacation', value: String_3, onClick: this.togglePopup.bind(this) }),
                    _react2.default.createElement(
                        'div',
                        { className: 'calendar_icon' },
                        _react2.default.createElement('i', { onClick: this.togglePopup.bind(this), className: 'fa fa-calendar', style: { fontSize: 36 } })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'longText_voca', id: 'hidingScrollBar' },
                        _react2.default.createElement(
                            'div',
                            { className: 'hideScrollBar' },
                            _react2.default.createElement(Vocations, { 'delete': this.delete.bind(this), vocations: this.state.availability.vocations })
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'footer_availability' },
                        _react2.default.createElement(
                            'button',
                            { className: 'btn_availability', type: 'submit', onClick: this.closePopupAvailability.bind(this), onSubmit: this.edit_availability_user.bind(this) },
                            'Save'
                        )
                    )
                )
            );
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                this.renderPopupAvailability(),
                this.renderCalendarPopup()
            );
        }
    }]);
    return UserPopupAvailability;
}(_react.Component);

exports.default = UserPopupAvailability;

/***/ }),

/***/ "./src/meveo/pages/elements/UserPopupBio.jsx":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = __webpack_require__("./node_modules/babel-runtime/core-js/object/get-prototype-of.js");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__("./node_modules/babel-runtime/helpers/createClass.js");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__("./node_modules/babel-runtime/helpers/possibleConstructorReturn.js");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__("./node_modules/babel-runtime/helpers/inherits.js");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__("./node_modules/react/react.js");

var _react2 = _interopRequireDefault(_react);

var _reactBootstrapDatePicker = __webpack_require__("./node_modules/react-bootstrap-date-picker/lib/index.js");

var _reactBootstrapDatePicker2 = _interopRequireDefault(_reactBootstrapDatePicker);

var _reactDom = __webpack_require__("./node_modules/react-dom/index.js");

var _UserProfileAction = __webpack_require__("./src/meveo/actions/UserProfileAction.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserPopupBio = function (_Component) {
    (0, _inherits3.default)(UserPopupBio, _Component);

    function UserPopupBio() {
        (0, _classCallCheck3.default)(this, UserPopupBio);

        var _this = (0, _possibleConstructorReturn3.default)(this, (UserPopupBio.__proto__ || (0, _getPrototypeOf2.default)(UserPopupBio)).call(this));

        _this.state = {
            showPopup: false,
            isLoading: false,
            error: null,
            editMode: false,
            form: {
                username: "",
                email: "",
                firstName: "",
                lastName: "",
                bio: "",
                manatyProjects: ""

            },
            formError: {
                status: false,
                message: ""
            }
        };

        return _this;
    }

    (0, _createClass3.default)(UserPopupBio, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.setDataFormData();
            this.edit_bio_user();
        }
    }, {
        key: 'changeContent',
        value: function changeContent(name, e) {
            var state = this.state;
            state['form'][name] = e.target.value;
            this.setState(state);
        }
    }, {
        key: 'validateMandatoryFields',
        value: function validateMandatoryFields() {
            var mandatories = [];
            var formValues = this.state.form;
            this.mandatoryFieldsList.map(function (field) {
                if (formValues[field] != null) {
                    if (formValues[field].trim().length == 0) {
                        mandatories.push(field);
                    }
                } else {
                    mandatories.push(field);
                }
            });
            var state = this.state;
            state['mandatoryFields'] = mandatories.slice();
            this.setState(state);

            if (mandatories.length > 0) {
                return false;
            } else {
                return true;
            }
        }
    }, {
        key: 'edit_bio_user',
        value: function edit_bio_user(event) {
            event.preventDefault();
            var updateType = "form";
            var userInfo = this.props.userInfo;
            var form = this.state.form;

            var userData = {
                "username": form.username,
                "bio": form.bio
            };
            (0, _UserProfileAction.editBioUser)(userData, updateType, null);
        }
    }, {
        key: 'setDataFormData',
        value: function setDataFormData() {
            var userInfo = this.props.userInfo;

            if (userInfo != null) {
                var state = this.state;
                state['form']['email'] = userInfo.email || "";
                state['form']['username'] = userInfo.username || "";
                state['form']['lastName'] = userInfo.lastName || "";
                state['form']['firstName'] = userInfo.firstName || "";
                state['form']['bio'] = userInfo.bio || "";
                this.setState(state);
            }
        }
    }, {
        key: 'closePopupBio',
        value: function closePopupBio() {
            var _this2 = this;

            setTimeout(function () {
                _this2.props.closePopupBio();
            }, 100);
        }
    }, {
        key: 'renderPopupBio',
        value: function renderPopupBio() {
            return _react2.default.createElement(
                'div',
                { className: 'popup_bio' },
                _react2.default.createElement('div', { className: 'close_bio', onClick: this.props.closePopupBio }),
                _react2.default.createElement(
                    'form',
                    { method: 'get', onSubmit: this.edit_bio_user.bind(this) },
                    _react2.default.createElement(
                        'div',
                        { className: 'header_bio' },
                        'EDIT BIO'
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'modal-body' },
                        _react2.default.createElement('textarea', {
                            onChange: this.changeContent.bind(this, "bio"),
                            className: 'input_bio col-xs-12 ', rows: '10',
                            value: this.state.form.bio,
                            type: 'text'
                        })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'footer_bio' },
                        _react2.default.createElement(
                            'button',
                            { className: 'btn_bio', type: 'submit', onClick: this.closePopupBio.bind(this) },
                            'SAVE'
                        )
                    )
                )
            );
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                this.renderPopupBio()
            );
        }
    }]);
    return UserPopupBio;
}(_react.Component);

exports.default = UserPopupBio;

/***/ }),

/***/ "./src/meveo/pages/elements/UserPopupCourses.jsx":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _toConsumableArray2 = __webpack_require__("./node_modules/babel-runtime/helpers/toConsumableArray.js");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _getPrototypeOf = __webpack_require__("./node_modules/babel-runtime/core-js/object/get-prototype-of.js");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__("./node_modules/babel-runtime/helpers/createClass.js");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__("./node_modules/babel-runtime/helpers/possibleConstructorReturn.js");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__("./node_modules/babel-runtime/helpers/inherits.js");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__("./node_modules/react/react.js");

var _react2 = _interopRequireDefault(_react);

var _UserProfileAction = __webpack_require__("./src/meveo/actions/UserProfileAction.js");

__webpack_require__("./node_modules/react-select/dist/react-select.css");

__webpack_require__("./node_modules/react-virtualized/styles.css");

__webpack_require__("./node_modules/react-virtualized-select/styles.css");

var _reactVirtualizedSelect = __webpack_require__("./node_modules/react-virtualized-select/dist/commonjs/index.js");

var _reactVirtualizedSelect2 = _interopRequireDefault(_reactVirtualizedSelect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Course = function (_React$Component) {
    (0, _inherits3.default)(Course, _React$Component);

    function Course() {
        (0, _classCallCheck3.default)(this, Course);
        return (0, _possibleConstructorReturn3.default)(this, (Course.__proto__ || (0, _getPrototypeOf2.default)(Course)).apply(this, arguments));
    }

    (0, _createClass3.default)(Course, [{
        key: 'delete',
        value: function _delete(courses) {
            this.props.delete(courses);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                'ul',
                null,
                this.props.courses.map(function (el, index) {
                    return _react2.default.createElement(
                        'li',
                        { key: index, className: 'li_course' },
                        _react2.default.createElement(
                            'span',
                            { className: 'names_course' },
                            el.courseTitle
                        ),
                        _react2.default.createElement('br', null),
                        _react2.default.createElement(
                            'span',
                            { className: 'names_course' },
                            ' - ',
                            el.fromYear,
                            '-',
                            el.toYear
                        ),
                        _react2.default.createElement('span', { onClick: _this2.delete.bind(_this2, el), className: 'empty_course' }),
                        _react2.default.createElement('p', null)
                    );
                })
            );
        }
    }]);
    return Course;
}(_react2.default.Component);

var UserPopupCourses = function (_Component) {
    (0, _inherits3.default)(UserPopupCourses, _Component);

    function UserPopupCourses() {
        (0, _classCallCheck3.default)(this, UserPopupCourses);

        var _this3 = (0, _possibleConstructorReturn3.default)(this, (UserPopupCourses.__proto__ || (0, _getPrototypeOf2.default)(UserPopupCourses)).call(this));

        _this3.state = {
            showPopup: false,
            isLoading: false,
            error: null,
            editMode: false,
            username: "",
            form: {},
            educations: [],
            courses: [],
            deleted: false,
            formError: {
                status: false,
                message: ""
            }
        };
        _this3.delete = _this3.delete.bind(_this3);
        _this3.mandatoryFieldsList = [];
        return _this3;
    }

    (0, _createClass3.default)(UserPopupCourses, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.setDataFormData();
            (0, _UserProfileAction.projectDetail)(this.state.name);
        }
    }, {
        key: 'validateMandatoryFields',
        value: function validateMandatoryFields() {
            var mandatories = [];
            var formValues = this.state.form;
            this.mandatoryFieldsList.map(function (field) {
                if (formValues[field] != null) {
                    if (formValues[field].trim().length == 0) {
                        mandatories.push(field);
                    }
                } else {
                    mandatories.push(field);
                }
            });
            var state = this.state;
            state['mandatoryFields'] = mandatories.slice();
            this.setState(state);

            if (mandatories.length > 0) {
                return false;
            } else {
                return true;
            }
        }
    }, {
        key: 'edit_courses_user',
        value: function edit_courses_user(event) {
            event.preventDefault();
            (0, _UserProfileAction.projectDetail)(this.state.name);
            var userInfo = this.props.userInfo;
            var projectSee = this.props.projectSee;

            var userData = {
                "username": userInfo.username,
                "courses": this.state.courses
            };
        }
    }, {
        key: 'setDataFormData',
        value: function setDataFormData() {
            var userInfo = this.props.userInfo;

            if (userInfo != null) {
                var state = this.state;
                state['form']['fromYear'] = userInfo.fromYear || "";
                state['form']['toYear'] = userInfo.toYear || "";
                state['form']['courseTitle'] = userInfo.courseTitle || "";
                state['course'] = userInfo.Course || "";

                this.setState(state);
            }
        }
    }, {
        key: 'delete',
        value: function _delete(courses) {
            this.setState(function (prevState) {
                return {
                    courses: prevState.courses.filter(function (el) {
                        return el.name != courses.name;
                    })
                };
            });
        }
    }, {
        key: 'onSubmit',
        value: function onSubmit(event) {
            (0, _UserProfileAction.projectDetail)(this.state.name);
            event.preventDefault();
            this.setState({
                courseTitle: "",
                toYear: "",
                fromYear: "",
                courses: [].concat((0, _toConsumableArray3.default)(this.state.courses), [{ courseTitle: this.state.courseTitle, toYear: this.state.toYear, fromYear: this.state.fromYear }])
            });
        }
    }, {
        key: 'changeContent',
        value: function changeContent(name, e) {
            var state = this.state;
            state[name] = e.target.value;
            this.setState(state);
        }
    }, {
        key: 'viewProfile',
        value: function viewProfile(name) {
            (0, _UserProfileAction.projectDetail)(name);
        }
    }, {
        key: 'closePopupCourses',
        value: function closePopupCourses() {
            var _this4 = this;

            setTimeout(function () {
                _this4.props.closePopupCourses();
            }, 100);
        }
    }, {
        key: 'renderPopupCourses',
        value: function renderPopupCourses() {
            return _react2.default.createElement(
                'div',
                { className: 'popup_courses' },
                _react2.default.createElement('div', { className: 'close_courses', onClick: this.props.closePopupCourses }),
                _react2.default.createElement(
                    'form',
                    { method: 'get', onSubmit: this.edit_courses_user.bind(this) },
                    _react2.default.createElement(
                        'div',
                        { className: 'header_courses' },
                        ' EDIT TRAINING COURSES '
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'modal-body' },
                        _react2.default.createElement(
                            'div',
                            { className: 'col-xs-6 left_educations' },
                            _react2.default.createElement(
                                'h3',
                                { className: 'name_course' },
                                ' Training courses '
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'longText', id: 'hidingScrollBar' },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'hideScrollBar' },
                                    _react2.default.createElement(Courses, { 'delete': this.delete, courses: this.state.courses }),
                                    _react2.default.createElement('span', { className: 'course' })
                                )
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'col-xs-6 right_educations' },
                        _react2.default.createElement(
                            'h3',
                            { className: 'name_new_course' },
                            ' Add new training courses '
                        ),
                        _react2.default.createElement(
                            'div',
                            null,
                            _react2.default.createElement(
                                'tbody',
                                null,
                                _react2.default.createElement(
                                    'tr',
                                    null,
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        _react2.default.createElement(
                                            'labelCourse1',
                                            { className: 'label_course1_profile' },
                                            _react2.default.createElement(
                                                'span',
                                                null,
                                                ' Training course title : '
                                            )
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        _react2.default.createElement('input', {
                                            className: 'course_profile',
                                            value: this.state.courseTitle,
                                            onChange: this.changeContent.bind(this, "courseTitle"),
                                            type: 'text' })
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                'tbody',
                                null,
                                _react2.default.createElement(
                                    'tr',
                                    null,
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        _react2.default.createElement(
                                            'labelCourse2',
                                            { className: 'label_course2_profile' },
                                            _react2.default.createElement(
                                                'span',
                                                null,
                                                ' From year : '
                                            )
                                        ),
                                        _react2.default.createElement('input', {
                                            className: 'course_from_profile {\r\n',
                                            value: this.state.fromYear,
                                            onChange: this.changeContent.bind(this, "fromYear"),
                                            type: 'text'
                                        })
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        _react2.default.createElement(
                                            'labelCourse3',
                                            { className: 'label_course3_profile' },
                                            _react2.default.createElement(
                                                'span',
                                                null,
                                                ' To year : '
                                            )
                                        ),
                                        _react2.default.createElement('input', {
                                            className: 'course_to_profile',
                                            value: this.state.toYear,
                                            onChange: this.changeContent.bind(this, "toYear"),
                                            type: 'text'
                                        })
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                'button',
                                { disabled: !this.state.courseTitle || !this.state.fromYear || !this.state.toYear, onClick: this.onSubmit.bind(this), className: 'add_courses' },
                                'ADD'
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'footer_courses' },
                        _react2.default.createElement(
                            'button',
                            { className: 'btn_course', type: 'submit', disabled: !this.state.courses, onClick: this.closePopupCourses.bind(this) },
                            'SAVE'
                        )
                    )
                )
            );
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                this.renderPopupCourses()
            );
        }
    }]);
    return UserPopupCourses;
}(_react.Component);

exports.default = UserPopupCourses;

/***/ }),

/***/ "./src/meveo/pages/elements/UserPopupEducations.jsx":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _toConsumableArray2 = __webpack_require__("./node_modules/babel-runtime/helpers/toConsumableArray.js");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _getPrototypeOf = __webpack_require__("./node_modules/babel-runtime/core-js/object/get-prototype-of.js");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__("./node_modules/babel-runtime/helpers/createClass.js");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__("./node_modules/babel-runtime/helpers/possibleConstructorReturn.js");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__("./node_modules/babel-runtime/helpers/inherits.js");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__("./node_modules/react/react.js");

var _react2 = _interopRequireDefault(_react);

var _UserProfileAction = __webpack_require__("./src/meveo/actions/UserProfileAction.js");

__webpack_require__("./node_modules/react-select/dist/react-select.css");

__webpack_require__("./node_modules/react-virtualized/styles.css");

__webpack_require__("./node_modules/react-virtualized-select/styles.css");

var _reactVirtualizedSelect = __webpack_require__("./node_modules/react-virtualized-select/dist/commonjs/index.js");

var _reactVirtualizedSelect2 = _interopRequireDefault(_reactVirtualizedSelect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Education = function (_React$Component) {
    (0, _inherits3.default)(Education, _React$Component);

    function Education() {
        (0, _classCallCheck3.default)(this, Education);
        return (0, _possibleConstructorReturn3.default)(this, (Education.__proto__ || (0, _getPrototypeOf2.default)(Education)).apply(this, arguments));
    }

    (0, _createClass3.default)(Education, [{
        key: 'delete',
        value: function _delete(educations) {
            this.props.delete(educations);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                'ul',
                null,
                this.props.educations.map(function (el, index) {
                    return _react2.default.createElement(
                        'li',
                        { key: index, className: 'li_degree' },
                        _react2.default.createElement(
                            'span',
                            { className: 'names_degree' },
                            el.degreeTitle
                        ),
                        _react2.default.createElement('br', null),
                        _react2.default.createElement(
                            'span',
                            { className: 'names_degree' },
                            el.university,
                            ' - ',
                            el.fromYear,
                            '-',
                            el.toYear
                        ),
                        _react2.default.createElement('span', { onClick: _this2.delete.bind(_this2, el), className: 'empty_degree' }),
                        _react2.default.createElement('p', null)
                    );
                })
            );
        }
    }]);
    return Education;
}(_react2.default.Component);

var UserPopupEducations = function (_Component) {
    (0, _inherits3.default)(UserPopupEducations, _Component);

    function UserPopupEducations() {
        (0, _classCallCheck3.default)(this, UserPopupEducations);

        var _this3 = (0, _possibleConstructorReturn3.default)(this, (UserPopupEducations.__proto__ || (0, _getPrototypeOf2.default)(UserPopupEducations)).call(this));

        _this3.state = {
            showPopup: false,
            isLoading: false,
            error: null,
            editMode: false,
            username: "",
            form: {},
            educations: [],
            deleted: false,
            formError: {
                status: false,
                message: ""
            }
        };
        _this3.delete = _this3.delete.bind(_this3);
        _this3.mandatoryFieldsList = [];
        return _this3;
    }

    (0, _createClass3.default)(UserPopupEducations, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.setDataFormData();
            (0, _UserProfileAction.projectDetail)(this.state.name);
        }
    }, {
        key: 'validateMandatoryFields',
        value: function validateMandatoryFields() {
            var mandatories = [];
            var formValues = this.state.form;
            this.mandatoryFieldsList.map(function (field) {
                if (formValues[field] != null) {
                    if (formValues[field].trim().length == 0) {
                        mandatories.push(field);
                    }
                } else {
                    mandatories.push(field);
                }
            });
            var state = this.state;
            state['mandatoryFields'] = mandatories.slice();
            this.setState(state);

            if (mandatories.length > 0) {
                return false;
            } else {
                return true;
            }
        }
    }, {
        key: 'edit_educations_user',
        value: function edit_educations_user(event) {
            event.preventDefault();
            (0, _UserProfileAction.projectDetail)(this.state.name);
            var userInfo = this.props.userInfo;
            var projectSee = this.props.projectSee;

            var userData = {
                "username": userInfo.username,
                "degree": this.state.degree
            };
        }
    }, {
        key: 'setDataFormData',
        value: function setDataFormData() {
            var userInfo = this.props.userInfo;

            if (userInfo != null) {
                var state = this.state;
                state['form']['fromYear'] = userInfo.fromYear || "";
                state['form']['toYear'] = userInfo.toYear || "";
                state['form']['university'] = userInfo.university || "";
                state['form']['degreeTitle'] = userInfo.DegreeTitle || "";
                state['Dugree'] = userInfo.Dugree || "";

                this.setState(state);
            }
        }
    }, {
        key: 'delete',
        value: function _delete(educations) {
            this.setState(function (prevState) {
                return {
                    educations: prevState.educations.filter(function (el) {
                        return el.name != educations.name;
                    })
                };
            });
        }
    }, {
        key: 'onSubmit',
        value: function onSubmit(event) {
            (0, _UserProfileAction.projectDetail)(this.state.name);
            event.preventDefault();
            this.setState({
                degreeTitle: "",
                university: "",
                toYear: "",
                fromYear: "",
                educations: [].concat((0, _toConsumableArray3.default)(this.state.educations), [{ degreeTitle: this.state.degreeTitle, university: this.state.university, toYear: this.state.toYear, fromYear: this.state.fromYear }])
            });
        }
    }, {
        key: 'changeContent',
        value: function changeContent(name, e) {
            var state = this.state;
            state[name] = e.target.value;
            this.setState(state);
        }
    }, {
        key: 'viewProfile',
        value: function viewProfile(name) {
            (0, _UserProfileAction.projectDetail)(name);
        }
    }, {
        key: 'closePopupEducations',
        value: function closePopupEducations() {
            var _this4 = this;

            setTimeout(function () {
                _this4.props.closePopupEducations();
            }, 100);
        }
    }, {
        key: 'renderPopupEducations',
        value: function renderPopupEducations() {
            return _react2.default.createElement(
                'div',
                { className: 'popup_educations' },
                _react2.default.createElement('div', { className: 'close_educations', onClick: this.props.closePopupEducations }),
                _react2.default.createElement(
                    'form',
                    { method: 'get', onSubmit: this.edit_educations_user.bind(this) },
                    _react2.default.createElement(
                        'div',
                        { className: 'header_educations' },
                        'EDIT EDUCATION'
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'modal-body' },
                        _react2.default.createElement(
                            'div',
                            { className: 'col-xs-6 left_educations' },
                            _react2.default.createElement(
                                'h3',
                                { className: 'name_degree' },
                                'Degree'
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'longText', id: 'hidingScrollBar' },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'hideScrollBar' },
                                    _react2.default.createElement(Education, { 'delete': this.delete, educations: this.state.educations }),
                                    _react2.default.createElement('span', { className: 'degree' })
                                )
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'col-xs-6 right_educations' },
                        _react2.default.createElement(
                            'h3',
                            { className: 'name_new_degree' },
                            'Add new degree'
                        ),
                        _react2.default.createElement(
                            'div',
                            null,
                            _react2.default.createElement(
                                'tbody',
                                null,
                                _react2.default.createElement(
                                    'tr',
                                    null,
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        _react2.default.createElement(
                                            'labelDegree1',
                                            { className: 'label_degree1_profile' },
                                            _react2.default.createElement(
                                                'span',
                                                null,
                                                ' Degree title/Diploma : '
                                            )
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        _react2.default.createElement('input', {
                                            className: 'degree_profile',
                                            value: this.state.degreeTitle,
                                            onChange: this.changeContent.bind(this, "degreeTitle"),
                                            type: 'text' })
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                'tbody',
                                null,
                                _react2.default.createElement(
                                    'tr',
                                    null,
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        _react2.default.createElement(
                                            'labelDegree2',
                                            { className: 'label_degree2_profile' },
                                            _react2.default.createElement(
                                                'span',
                                                null,
                                                ' School/University: '
                                            )
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        _react2.default.createElement('input', {
                                            className: 'degree_profile',
                                            value: this.state.university,
                                            onChange: this.changeContent.bind(this, "university"),
                                            type: 'text'
                                        })
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                'tbody',
                                null,
                                _react2.default.createElement(
                                    'tr',
                                    null,
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        _react2.default.createElement(
                                            'labelDegree3',
                                            { className: 'label_degree3_profile' },
                                            _react2.default.createElement(
                                                'span',
                                                null,
                                                ' From year : '
                                            )
                                        ),
                                        _react2.default.createElement('input', {
                                            className: 'degree_from_profile {\r\n',
                                            value: this.state.fromYear,
                                            onChange: this.changeContent.bind(this, "fromYear"),
                                            type: 'text'
                                        })
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        _react2.default.createElement(
                                            'labelDegree4',
                                            { className: 'label_degree4_profile' },
                                            _react2.default.createElement(
                                                'span',
                                                null,
                                                ' To year : '
                                            )
                                        ),
                                        _react2.default.createElement('input', {
                                            className: 'degree_to_profile',
                                            value: this.state.toYear,
                                            onChange: this.changeContent.bind(this, "toYear"),
                                            type: 'text'
                                        })
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                'button',
                                { disabled: !this.state.degreeTitle || !this.state.university || !this.state.fromYear || !this.state.toYear, onClick: this.onSubmit.bind(this), className: 'add_educatoins' },
                                'ADD'
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'footer_educations' },
                        _react2.default.createElement(
                            'button',
                            { className: 'btn_education', type: 'submit', disabled: !this.state.educations, onClick: this.closePopupEducations.bind(this) },
                            'SAVE'
                        )
                    )
                )
            );
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                this.renderPopupEducations()
            );
        }
    }]);
    return UserPopupEducations;
}(_react.Component);

exports.default = UserPopupEducations;

/***/ }),

/***/ "./src/meveo/pages/elements/UserPopupProjects.jsx":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _toConsumableArray2 = __webpack_require__("./node_modules/babel-runtime/helpers/toConsumableArray.js");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _getPrototypeOf = __webpack_require__("./node_modules/babel-runtime/core-js/object/get-prototype-of.js");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__("./node_modules/babel-runtime/helpers/createClass.js");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__("./node_modules/babel-runtime/helpers/possibleConstructorReturn.js");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__("./node_modules/babel-runtime/helpers/inherits.js");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__("./node_modules/react/react.js");

var _react2 = _interopRequireDefault(_react);

var _UserProfileAction = __webpack_require__("./src/meveo/actions/UserProfileAction.js");

__webpack_require__("./node_modules/react-select/dist/react-select.css");

__webpack_require__("./node_modules/react-virtualized/styles.css");

__webpack_require__("./node_modules/react-virtualized-select/styles.css");

var _reactVirtualizedSelect = __webpack_require__("./node_modules/react-virtualized-select/dist/commonjs/index.js");

var _reactVirtualizedSelect2 = _interopRequireDefault(_reactVirtualizedSelect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Skill = function (_React$Component) {
    (0, _inherits3.default)(Skill, _React$Component);

    function Skill() {
        (0, _classCallCheck3.default)(this, Skill);
        return (0, _possibleConstructorReturn3.default)(this, (Skill.__proto__ || (0, _getPrototypeOf2.default)(Skill)).apply(this, arguments));
    }

    (0, _createClass3.default)(Skill, [{
        key: 'delete',
        value: function _delete(projects) {
            this.props.delete(projects);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                'ul',
                null,
                this.props.projects.map(function (el, index) {
                    return _react2.default.createElement(
                        'li',
                        { key: index, className: 'li_project' },
                        _react2.default.createElement(
                            'span',
                            { className: 'names_project' },
                            el.name
                        ),
                        _react2.default.createElement('span', { onClick: _this2.delete.bind(_this2, el), className: 'empty_project' }),
                        _react2.default.createElement(
                            'div',
                            { className: 'role_projects' },
                            el.role
                        ),
                        _react2.default.createElement('p', null)
                    );
                })
            );
        }
    }]);
    return Skill;
}(_react2.default.Component);

var UserPopupProjects = function (_Component) {
    (0, _inherits3.default)(UserPopupProjects, _Component);

    function UserPopupProjects() {
        (0, _classCallCheck3.default)(this, UserPopupProjects);

        var _this3 = (0, _possibleConstructorReturn3.default)(this, (UserPopupProjects.__proto__ || (0, _getPrototypeOf2.default)(UserPopupProjects)).call(this));

        _this3.state = {
            showPopup: false,
            isLoading: false,
            error: null,
            editMode: false,
            username: "",
            form: {
                username: "",
                email: "",
                firstName: "",
                lastName: "",
                bio: "Free text space where user can give any information he wants about himself",
                availability: " where user can inform on his number of working hours dedicated for Manaty a" + "week, gives specific informations, inform on his working timezone and his vacations dates."
            },
            projects: [{ name: "", role: "" }],
            teams: { name: "", role: "" },
            deleted: false,
            formError: {
                status: false,
                message: ""
            }
        };
        _this3.delete = _this3.delete.bind(_this3);
        _this3.mandatoryFieldsList = [];

        return _this3;
    }

    (0, _createClass3.default)(UserPopupProjects, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.setDataFormData();
            (0, _UserProfileAction.projectDetail)(this.state.name);
        }
    }, {
        key: 'validateMandatoryFields',
        value: function validateMandatoryFields() {
            var mandatories = [];
            var formValues = this.state.form;
            this.mandatoryFieldsList.map(function (field) {
                if (formValues[field] != null) {
                    if (formValues[field].trim().length == 0) {
                        mandatories.push(field);
                    }
                } else {
                    mandatories.push(field);
                }
            });
            var state = this.state;
            state['mandatoryFields'] = mandatories.slice();
            this.setState(state);

            if (mandatories.length > 0) {
                return false;
            } else {
                return true;
            }
        }
    }, {
        key: 'edit_projects_user',
        value: function edit_projects_user(event) {
            event.preventDefault();
            (0, _UserProfileAction.projectDetail)(this.state.name);
            var userInfo = this.props.userInfo;
            var projectSee = this.props.projectSee;

            var userData = {
                "username": userInfo.username,
                "projects": this.state.projects
            };
            (0, _UserProfileAction.editProjectsUser)(userData);
        }
    }, {
        key: 'setDataFormData',
        value: function setDataFormData() {
            var userInfo = this.props.userInfo;

            if (userInfo != null) {
                var state = this.state;
                state['form']['email'] = userInfo.email || "";
                state['username'] = userInfo.username || "";
                state['form']['lastName'] = userInfo.lastName || "";
                state['form']['firstName'] = userInfo.firstName || "";
                state['projects'] = userInfo.projects || "";
                this.setState(state);
            }
        }
    }, {
        key: 'delete',
        value: function _delete(projects) {
            this.setState(function (prevState) {
                return {
                    projects: prevState.projects.filter(function (el) {
                        return el.name != projects.name;
                    })
                };
            });
        }
    }, {
        key: 'onSubmit',
        value: function onSubmit(event) {
            (0, _UserProfileAction.projectDetail)(this.state.name);
            event.preventDefault();
            this.setState({
                name: "",
                role: "",
                projects: [].concat((0, _toConsumableArray3.default)(this.state.projects), [{ name: this.state.name, role: this.state.role }])

            });
        }
    }, {
        key: 'changeContent',
        value: function changeContent(name, e) {
            var state = this.state;
            state[name] = e.target.value;
            this.setState(state);
        }
    }, {
        key: 'setProject',
        value: function setProject(val) {
            if (val != null) {
                var state = this.state;
                state['name'] = val.value;
                this.setState(state);
            }
        }
    }, {
        key: 'viewProfile',
        value: function viewProfile(name) {
            (0, _UserProfileAction.projectDetail)(name);
        }
    }, {
        key: 'closePopupProjects',
        value: function closePopupProjects() {
            var _this4 = this;

            setTimeout(function () {
                _this4.props.closePopupProjects();
            }, 100);
        }
    }, {
        key: 'renderPopupProjects',
        value: function renderPopupProjects() {
            var project = this.props.projectInfo;
            var listProject = [];
            var listProjectDisplay = [];
            project.map(function (entry) {
                listProject.push(entry.code);
            });
            listProject.sort();
            listProject.map(function (entry) {
                var singleObj = {};
                singleObj["value"] = entry;
                singleObj["label"] = entry;
                listProjectDisplay.push(singleObj);
            });
            return _react2.default.createElement(
                'div',
                { className: 'popup_projects' },
                _react2.default.createElement('div', { className: 'close_project', onClick: this.props.closePopupProjects }),
                _react2.default.createElement(
                    'form',
                    { method: 'get', onSubmit: this.edit_projects_user.bind(this) },
                    _react2.default.createElement(
                        'div',
                        { className: 'header_projects' },
                        'EDIT PROJECTS'
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'modal-body' },
                        _react2.default.createElement(
                            'div',
                            { className: 'col-xs-6 left_project' },
                            _react2.default.createElement(
                                'h3',
                                { className: 'name_project' },
                                'Projects'
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'longText', id: 'hidingScrollBar' },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'hideScrollBar' },
                                    _react2.default.createElement(Skill, { 'delete': this.delete, projects: this.state.projects })
                                )
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'col-xs-6 right_project' },
                        _react2.default.createElement(
                            'h3',
                            { className: 'name_new_project' },
                            'Add new project'
                        ),
                        _react2.default.createElement(
                            'div',
                            null,
                            _react2.default.createElement(
                                'span',
                                { className: 'project_select' },
                                _react2.default.createElement(_reactVirtualizedSelect2.default, {
                                    className: 'select_pro_profile',
                                    value: this.state.name,
                                    placeholder: 'Select a project',
                                    options: listProjectDisplay,
                                    onChange: this.setProject.bind(this)
                                })
                            ),
                            _react2.default.createElement('br', null),
                            _react2.default.createElement('input', { className: 'input_projects',
                                value: this.state.role,
                                onChange: this.changeContent.bind(this, "role"),
                                placeholder: 'Role in the project' }),
                            _react2.default.createElement('br', null),
                            _react2.default.createElement(
                                'button',
                                { disabled: !this.props.projectInfo || !this.state.role, onClick: this.onSubmit.bind(this), className: 'add_project' },
                                'ADD'
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'footer_projects' },
                        _react2.default.createElement(
                            'button',
                            { className: 'btn_project', type: 'submit', disabled: !this.state.projects, onClick: this.closePopupProjects.bind(this) },
                            'SAVE'
                        )
                    )
                )
            );
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                this.renderPopupProjects()
            );
        }
    }]);
    return UserPopupProjects;
}(_react.Component);

exports.default = UserPopupProjects;

/***/ }),

/***/ "./src/meveo/pages/elements/UserPopupSkills.jsx":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _toConsumableArray2 = __webpack_require__("./node_modules/babel-runtime/helpers/toConsumableArray.js");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _getPrototypeOf = __webpack_require__("./node_modules/babel-runtime/core-js/object/get-prototype-of.js");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__("./node_modules/babel-runtime/helpers/createClass.js");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__("./node_modules/babel-runtime/helpers/possibleConstructorReturn.js");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__("./node_modules/babel-runtime/helpers/inherits.js");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__("./node_modules/react/react.js");

var _react2 = _interopRequireDefault(_react);

var _reactBootstrapDatePicker = __webpack_require__("./node_modules/react-bootstrap-date-picker/lib/index.js");

var _reactBootstrapDatePicker2 = _interopRequireDefault(_reactBootstrapDatePicker);

var _reactDom = __webpack_require__("./node_modules/react-dom/index.js");

var _reactBootstrap = __webpack_require__("./node_modules/react-bootstrap/es/index.js");

var _UserProfileAction = __webpack_require__("./src/meveo/actions/UserProfileAction.js");

var _reactStarRatingComponent = __webpack_require__("./node_modules/react-star-rating-component/index.js");

var _reactStarRatingComponent2 = _interopRequireDefault(_reactStarRatingComponent);

var _reactSortableHoc = __webpack_require__("./node_modules/react-sortable-hoc/dist/commonjs/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SortableItem = (0, _reactSortableHoc.SortableElement)(function (_ref) {
    var value = _ref.value,
        index = _ref.index,
        sortIndex = _ref.sortIndex,
        onRemove = _ref.onRemove;
    return _react2.default.createElement(
        'div',
        { className: 'li_skill' },
        _react2.default.createElement(
            'li',
            { className: 'li_skill_profile' },
            _react2.default.createElement(
                'span',
                { className: 'names_skill' },
                value.name
            ),
            _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(
                    'button',
                    { onClick: function onClick() {
                            return onRemove(value);
                        }, className: 'empty_skills' },
                    _react2.default.createElement('i', null)
                )
            ),
            sortIndex == 0 ? _react2.default.createElement('span', { className: 'move_up' }) : "",
            sortIndex != 0 ? _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement('span', { onClick: function onClick() {
                        return undefined.props.moveSkills(sortIndex, sortIndex - 1);
                    }, className: 'move_up' })
            ) : "",
            sortIndex != null ? _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement('span', { onClick: function onClick() {
                        return undefined.props.moveSkills(sortIndex, sortIndex + 1);
                    }, className: 'move_down' })
            ) : "",
            sortIndex == null ? _react2.default.createElement('span', { className: 'move_down' }) : "",
            _react2.default.createElement(
                'div',
                { className: 'star' },
                _react2.default.createElement(_reactStarRatingComponent2.default, {
                    starCount: 5,
                    value: value.ratio,
                    starColor: "#ffff00",
                    emptyStarColor: "#c0c0c0"
                })
            )
        ),
        sortIndex == 4 ? _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
                'div',
                { className: 'top5_skill' },
                'Top 5 skills'
            )
        ) : ""
    );
});

var SortableList = (0, _reactSortableHoc.SortableContainer)(function (_ref2) {
    var skills = _ref2.skills,
        onRemove = _ref2.onRemove;

    return _react2.default.createElement(
        'ul',
        null,
        skills.map(function (value, index, i) {
            return _react2.default.createElement(SortableItem, { value: value,
                key: 'item-' + index,
                index: index,
                sortIndex: index,
                onRemove: onRemove });
        })
    );
});

var UserPopupSkills = function (_Component) {
    (0, _inherits3.default)(UserPopupSkills, _Component);

    function UserPopupSkills() {
        (0, _classCallCheck3.default)(this, UserPopupSkills);

        var _this = (0, _possibleConstructorReturn3.default)(this, (UserPopupSkills.__proto__ || (0, _getPrototypeOf2.default)(UserPopupSkills)).call(this));

        _this.onSortEnd = function (_ref3) {
            var oldIndex = _ref3.oldIndex,
                newIndex = _ref3.newIndex;

            _this.setState({
                skills: (0, _reactSortableHoc.arrayMove)(_this.state.skills, oldIndex, newIndex)
            });
        };

        _this.state = {
            ratio: 1,
            showPopup: false,
            isLoading: false,
            error: null,
            editMode: false,
            form: {
                username: "",
                email: "",
                firstName: "",
                lastName: "",
                bio: "",
                manatyProjects: "",
                availability: ""
            },
            skills: [{ name: "", ratio: null }],
            deleted: false,
            formError: {
                status: false,
                message: ""
            }
        };

        _this.mandatoryFieldsList = [];
        _this.onDragEnd = _this.onDragEnd.bind(_this);
        return _this;
    }

    (0, _createClass3.default)(UserPopupSkills, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.setDataFormData();
        }
    }, {
        key: 'changeContent',
        value: function changeContent(name, e) {
            var state = this.state;
            state['form'][name] = e.target.value;
            this.setState(state);
        }
    }, {
        key: 'validateMandatoryFields',
        value: function validateMandatoryFields() {
            var mandatories = [];
            var formValues = this.state.form;
            this.mandatoryFieldsList.map(function (field) {
                if (formValues[field] != null) {
                    if (formValues[field].trim().length == 0) {
                        mandatories.push(field);
                    }
                } else {
                    mandatories.push(field);
                }
            });
            var state = this.state;
            state['mandatoryFields'] = mandatories.slice();
            this.setState(state);

            if (mandatories.length > 0) {
                return false;
            } else {
                return true;
            }
        }
    }, {
        key: 'edit_skills_user',
        value: function edit_skills_user(event) {
            event.preventDefault();
            var userInfo = this.props.userInfo;

            var userData = {
                "username": userInfo.username,
                "skills": this.state.skills
            };
            (0, _UserProfileAction.editSkillsUser)(userData);
        }
    }, {
        key: 'setDataFormData',
        value: function setDataFormData() {
            var userInfo = this.props.userInfo;

            if (userInfo != null) {
                var state = this.state;
                state['form']['email'] = userInfo.email || "";
                state['form']['username'] = userInfo.username || "";
                state['form']['lastName'] = userInfo.lastName || "";
                state['form']['firstName'] = userInfo.firstName || "";
                state['skills'] = userInfo.skills || "";
                this.setState(state);
            }
        }
    }, {
        key: 'delete',
        value: function _delete(skills) {
            this.setState(function (prevState) {
                return {
                    skills: prevState.skills.filter(function (value) {
                        return value.name != skills.name;
                    })
                };
            });
        }
    }, {
        key: 'onChange',
        value: function onChange(event) {
            this.setState({ term: event.target.value });
        }
    }, {
        key: 'onSubmit',
        value: function onSubmit(event) {
            event.preventDefault();
            this.setState({
                term: "",
                ratio: 0,
                skills: [].concat((0, _toConsumableArray3.default)(this.state.skills), [{ name: this.state.term, ratio: this.state.ratio }])
            });
        }
    }, {
        key: 'onStarClick',
        value: function onStarClick(nextValue, prevValue, name) {
            this.setState({ ratio: nextValue });
        }
    }, {
        key: 'moveSkills',
        value: function moveSkills(fromIndex, toIndex) {
            var skills = this.state.skills;
            var movedCard = skills.splice(fromIndex, 1)[0];
            skills.splice(toIndex, 0, movedCard);
            this.setState({
                skills: skills
            });
        }
    }, {
        key: 'closePopupSkills',
        value: function closePopupSkills() {
            var _this2 = this;

            setTimeout(function () {
                _this2.props.closePopupSkills();
            }, 100);
        }

        //drag

    }, {
        key: 'onDragEnd',
        value: function onDragEnd(result) {
            // dropped outside the list
            if (!result.destination) {
                return;
            }

            var items = reorder(this.state.items, result.source.index, result.destination.index);

            this.setState({
                items: items
            });
        }
    }, {
        key: 'renderPopupSkills',
        value: function renderPopupSkills() {
            var _this3 = this;

            var ratio = this.state.ratio;

            return _react2.default.createElement(
                'div',
                { className: 'popup_skill' },
                _react2.default.createElement('div', { className: 'close_skill', onClick: this.props.closePopupSkills }),
                _react2.default.createElement(
                    'form',
                    { method: 'get', onSubmit: this.edit_skills_user.bind(this) },
                    _react2.default.createElement(
                        'div',
                        { className: 'header_skill' },
                        'EDIT SKILLS'
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'modal-body' },
                        _react2.default.createElement(
                            'div',
                            { className: 'col-xs-6 left_skill' },
                            _react2.default.createElement(
                                'h3',
                                { className: 'name_skill' },
                                'Organize skills'
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'longText', id: 'hidingScrollBar' },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'hideScrollBar' },
                                    _react2.default.createElement(SortableList, { skills: this.state.skills,
                                        onSortEnd: this.onSortEnd,
                                        onRemove: function onRemove(skills) {
                                            return _this3.delete(skills);
                                        },
                                        moveSkills: this.moveSkills.bind(this)
                                    })
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'col-xs-6 right_skill' },
                            _react2.default.createElement(
                                'h3',
                                { className: 'name_new_skill' },
                                'Add new skill'
                            ),
                            _react2.default.createElement(
                                'div',
                                { id: 'hidingScrollBar' },
                                _react2.default.createElement(
                                    'form',
                                    { onSubmit: this.onSubmit.bind(this) },
                                    _react2.default.createElement('div', { className: 'wen_skill' }),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'border_input' },
                                        _react2.default.createElement('input', { className: 'ip_skill', placeholder: 'Skill...', value: this.state.term, onChange: this.onChange.bind(this) })
                                    ),
                                    _react2.default.createElement(
                                        'span',
                                        { className: 'proficiency' },
                                        'Proficiency:'
                                    ),
                                    _react2.default.createElement(
                                        'span',
                                        { className: 'stars_skill' },
                                        _react2.default.createElement(_reactStarRatingComponent2.default, {
                                            name: 'rate',
                                            starCount: 5,
                                            value: ratio,
                                            starColor: "#ffff00",
                                            emptyStarColor: "#c0c0c0",
                                            onStarClick: this.onStarClick.bind(this)
                                        })
                                    ),
                                    _react2.default.createElement(
                                        'button',
                                        { className: 'add_skill', disabled: !this.state.term || !this.state.ratio },
                                        'ADD'
                                    )
                                )
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'footer_skill' },
                        _react2.default.createElement(
                            'button',
                            { className: 'btn_skill', type: 'submit', onClick: this.closePopupSkills.bind(this) },
                            'SAVE'
                        )
                    )
                )
            );
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                this.renderPopupSkills()
            );
        }
    }]);
    return UserPopupSkills;
}(_react.Component);

exports.default = UserPopupSkills;

/***/ }),

/***/ "./src/meveo/pages/public/AboutUsComponent.jsx":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _getPrototypeOf = __webpack_require__("./node_modules/babel-runtime/core-js/object/get-prototype-of.js");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__("./node_modules/babel-runtime/helpers/createClass.js");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__("./node_modules/babel-runtime/helpers/possibleConstructorReturn.js");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__("./node_modules/babel-runtime/helpers/inherits.js");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__("./node_modules/react/react.js");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AboutUsComponent = function (_Component) {
    (0, _inherits3.default)(AboutUsComponent, _Component);

    function AboutUsComponent() {
        (0, _classCallCheck3.default)(this, AboutUsComponent);
        return (0, _possibleConstructorReturn3.default)(this, (AboutUsComponent.__proto__ || (0, _getPrototypeOf2.default)(AboutUsComponent)).apply(this, arguments));
    }

    (0, _createClass3.default)(AboutUsComponent, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                null,
                _react2.default.createElement(
                    "div",
                    { id: "about-us" },
                    _react2.default.createElement(
                        "div",
                        { className: "container-fluid" },
                        _react2.default.createElement(
                            "div",
                            { className: "row" },
                            _react2.default.createElement(
                                "div",
                                { id: "story", className: "col-md-8" },
                                _react2.default.createElement(
                                    "h2",
                                    null,
                                    "Story"
                                ),
                                _react2.default.createElement("hr", null),
                                _react2.default.createElement(
                                    "p",
                                    null,
                                    "In 2007, David Meyer, Opencell\u2019s current CEO, was managing a business specialized in providing enablement services for mobile operators. Confronted with the complexity and high costs of available billing solutions, he commissioned S\xE9bastien Mich\xE9a, a Mathematics PhD who had started a software development company based in Dijon, to develop several ad hoc billing modules. Over the course of the next eight years, S\xE9bastien stitched this initial work, and additional developments requested by David and other clients, into an integrated, configurable open source software program that could be used to model and bill almost any complex telco-type offer."
                                ),
                                _react2.default.createElement(
                                    "p",
                                    null,
                                    "In late 2014, David, S\xE9bastien and Ethan Beardsley, who\u2019d worked with David in business consulting, decided to create a software company focused exclusively on the open source billing project. They saw that subscription and usage-based business models were \xAB eating the world \xBB and that available billing options were still unattractive. And they were convinced that businesses were increasingly interested in open source business software solutions provided they could get competent enterprise support and maintenance."
                                ),
                                _react2.default.createElement(
                                    "p",
                                    null,
                                    "After closing a first deal with Orange\u2019s cloud business in a matter of weeks, the team knew they had product/market fit. And, when Xavier Niel, the French telecom maverick, committed to invest in the not-yet created company, they pulled the trigger, leaving their day jobs, to create Opencell in March 2015."
                                )
                            ),
                            _react2.default.createElement(
                                "div",
                                { id: "offices", className: "col-md-4" },
                                _react2.default.createElement(
                                    "h2",
                                    null,
                                    "Offices"
                                ),
                                _react2.default.createElement("hr", null),
                                _react2.default.createElement(
                                    "div",
                                    { className: "row" },
                                    _react2.default.createElement(
                                        "div",
                                        { className: "col-md-6" },
                                        _react2.default.createElement(
                                            "h3",
                                            null,
                                            "Paris"
                                        ),
                                        _react2.default.createElement(
                                            "ul",
                                            { className: "list-unstyled" },
                                            _react2.default.createElement(
                                                "li",
                                                null,
                                                "Opencell"
                                            ),
                                            _react2.default.createElement(
                                                "li",
                                                null,
                                                "14 rue Crespin du Gast"
                                            ),
                                            _react2.default.createElement(
                                                "li",
                                                null,
                                                "75011 Paris"
                                            )
                                        )
                                    ),
                                    _react2.default.createElement(
                                        "div",
                                        { className: "col-md-6" },
                                        _react2.default.createElement(
                                            "h3",
                                            null,
                                            "Dijon"
                                        ),
                                        _react2.default.createElement(
                                            "ul",
                                            { className: "list-unstyled" },
                                            _react2.default.createElement(
                                                "li",
                                                null,
                                                "Opencell"
                                            ),
                                            _react2.default.createElement(
                                                "li",
                                                null,
                                                "64 A rue Sully"
                                            ),
                                            _react2.default.createElement(
                                                "li",
                                                null,
                                                "21000 Dijon"
                                            )
                                        )
                                    )
                                )
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    "div",
                    { id: "leadership" },
                    _react2.default.createElement(
                        "div",
                        { className: "container-fluid" },
                        _react2.default.createElement(
                            "div",
                            { className: "text-center" },
                            _react2.default.createElement(
                                "h2",
                                null,
                                "Leaders"
                            ),
                            _react2.default.createElement("hr", null)
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "row" },
                            _react2.default.createElement(
                                "div",
                                { className: "col-md-10 col-md-offset-1" },
                                _react2.default.createElement(
                                    "div",
                                    { className: "row" },
                                    _react2.default.createElement(
                                        "div",
                                        { className: "col-xs-12 col-sm-12 col-md-4 col-lg-4 leader" },
                                        _react2.default.createElement(
                                            "div",
                                            { className: "thumbnail" },
                                            _react2.default.createElement("img", { src: "https://opencellsoft.com/img/team/dm.png", alt: "", className: "img-responsive" }),
                                            _react2.default.createElement(
                                                "div",
                                                { className: "caption" },
                                                _react2.default.createElement(
                                                    "h3",
                                                    null,
                                                    "David Meyer"
                                                ),
                                                _react2.default.createElement(
                                                    "h4",
                                                    null,
                                                    "CEO & Co-Founder"
                                                ),
                                                _react2.default.createElement(
                                                    "p",
                                                    null,
                                                    "David has over 18 years in experience in IT and business development and channel development with telco, ITO and BPO companies, primarily starting and managing new business units with a strong technology focus. Prior to starting Opencell, he worked for telco operators such as Neuf T\xE9l\xE9com (now part of SFR), Bouygues Telecom, Experian and Docapost (the BPO subsidiary of La Poste) where he was instrumental in commissionning the initial development work that led to the creation of Opencell. David is a graduate of ESEIA engineering school in Paris."
                                                )
                                            )
                                        )
                                    ),
                                    _react2.default.createElement(
                                        "div",
                                        { className: "col-xs-12 col-sm-12 col-md-4 col-lg-4 leader" },
                                        _react2.default.createElement(
                                            "div",
                                            { className: "thumbnail" },
                                            _react2.default.createElement("img", { src: "https://opencellsoft.com/img/team/sm.png", alt: "", className: "img-responsive" }),
                                            _react2.default.createElement(
                                                "div",
                                                { className: "caption" },
                                                _react2.default.createElement(
                                                    "h3",
                                                    null,
                                                    "S\xE9bastien Mich\xE9a"
                                                ),
                                                _react2.default.createElement(
                                                    "h4",
                                                    null,
                                                    "CTO & Co-Founder"
                                                ),
                                                _react2.default.createElement(
                                                    "p",
                                                    null,
                                                    "S\xE9bastien has over 20 years of experience in software development and is an acknowledged expert on Java and open source software. After doing post-doctorate work in physics, he worked as billing software developer for Cap Gemini prior to setting up the software development company that initiated the open source billing project led to Opencell. He holds a PhD in Mathematical Physics for the Universit\xE9 de Dijon and a post-doctorate degree in Statistical Physics from Yonsei University."
                                                )
                                            )
                                        )
                                    ),
                                    _react2.default.createElement(
                                        "div",
                                        { className: "col-xs-12 col-sm-12 col-md-4 col-lg-4 leader" },
                                        _react2.default.createElement(
                                            "div",
                                            { className: "thumbnail" },
                                            _react2.default.createElement("img", { src: "https://opencellsoft.com/img/team/eb.png", alt: "", className: "img-responsive" }),
                                            _react2.default.createElement(
                                                "div",
                                                { className: "caption" },
                                                _react2.default.createElement(
                                                    "h3",
                                                    null,
                                                    "Ethan Beardsley"
                                                ),
                                                _react2.default.createElement(
                                                    "h4",
                                                    null,
                                                    "COO & Co-Founder"
                                                ),
                                                _react2.default.createElement(
                                                    "p",
                                                    null,
                                                    "Ethan has over 25 years of experience in finance, business development and marketing in large companies and startups in the IT and media sector. Prior to starting several digital media startups, he spent ten years at Disney in senior finance and business development roles, most recently as VP Business Development for Southern Europe. An American national, he holds a BA in English Literature from Wesleyan University and is a graduate in Finance & Economics from Sciences Po in Paris."
                                                )
                                            )
                                        )
                                    )
                                )
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    "div",
                    { id: "investors-heading", className: "container-fluid text-center" },
                    _react2.default.createElement(
                        "h2",
                        null,
                        "Investors & Partners"
                    ),
                    _react2.default.createElement("hr", null)
                ),
                _react2.default.createElement(
                    "div",
                    { id: "investors" },
                    _react2.default.createElement(
                        "div",
                        { className: "container-fluid" },
                        _react2.default.createElement(
                            "div",
                            { className: "row" },
                            _react2.default.createElement(
                                "div",
                                { className: "col-md-10 col-md-offset-1" },
                                _react2.default.createElement(
                                    "div",
                                    { className: "col-md-2 col-md-offset-1" },
                                    _react2.default.createElement("img", { src: "images/investors/kimaventures.png", alt: "kimaventures" })
                                ),
                                _react2.default.createElement(
                                    "div",
                                    { className: "col-md-2 col-md-offset-2" },
                                    _react2.default.createElement("img", { src: "images/investors/capinnovest.png", alt: "capinnovest" })
                                ),
                                _react2.default.createElement(
                                    "div",
                                    { className: "col-md-2 col-md-offset-2" },
                                    _react2.default.createElement("img", { src: "images/investors/bourgogne-angels.png", alt: "bourgogne angels" })
                                )
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    "div",
                    { id: "partners" },
                    _react2.default.createElement(
                        "div",
                        { className: "container-fluid" },
                        _react2.default.createElement(
                            "div",
                            { className: "row" },
                            _react2.default.createElement(
                                "div",
                                { className: "col-md-10 col-md-offset-1" },
                                _react2.default.createElement(
                                    "div",
                                    { className: "col-md-3 text-center" },
                                    _react2.default.createElement("img", { src: "https://opencellsoft.com/img/partners/bpi.png", alt: "BPI France" })
                                ),
                                _react2.default.createElement(
                                    "div",
                                    { className: "col-md-3 text-center" },
                                    _react2.default.createElement("img", { src: "https://opencellsoft.com/img/partners/bourgogne-franche-comte.png", alt: "R\xE9gion Bourgogne Franche-Comt\xE9" })
                                ),
                                _react2.default.createElement(
                                    "div",
                                    { className: "col-md-3 text-center" },
                                    _react2.default.createElement("img", { src: "https://opencellsoft.com/img/partners/cap-digital.png", alt: "Cap Digital" })
                                ),
                                _react2.default.createElement(
                                    "div",
                                    { className: "col-md-3 text-center" },
                                    _react2.default.createElement("img", { src: "https://opencellsoft.com/img/partners/syntec-numerique.png", alt: "Syntec Num\xE9rique" })
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);
    return AboutUsComponent;
}(_react.Component);

;

module.exports = AboutUsComponent;

/***/ }),

/***/ "./src/meveo/pages/public/ContactComponent.jsx":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _getPrototypeOf = __webpack_require__("./node_modules/babel-runtime/core-js/object/get-prototype-of.js");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__("./node_modules/babel-runtime/helpers/createClass.js");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__("./node_modules/babel-runtime/helpers/possibleConstructorReturn.js");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__("./node_modules/babel-runtime/helpers/inherits.js");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__("./node_modules/react/react.js");

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__("./node_modules/react-dom/index.js");

var _reactRouter = __webpack_require__("./node_modules/react-router/lib/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FormLoaderIndicator = __webpack_require__("./src/meveo/pages/elements/FormLoaderIndicatorComponent.jsx");

var ContactComponent = function (_Component) {
  (0, _inherits3.default)(ContactComponent, _Component);

  function ContactComponent() {
    (0, _classCallCheck3.default)(this, ContactComponent);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ContactComponent.__proto__ || (0, _getPrototypeOf2.default)(ContactComponent)).call(this));

    _this.state = {
      loading: false,
      form: {
        fullname: '',
        email: '',
        subject: '',
        message: ''
      }
    };
    return _this;
  }

  (0, _createClass3.default)(ContactComponent, [{
    key: 'changeContent',
    value: function changeContent(name, e) {
      var change = {};
      change[name] = e.target.value;
      this.setState(change);
    }
  }, {
    key: 'hideLoading',
    value: function hideLoading() {
      this.setState({ loading: false });
    }
  }, {
    key: 'showLoading',
    value: function showLoading() {
      this.setState({ loading: true });
    }
  }, {
    key: 'contact',
    value: function contact(event) {
      var _this2 = this;

      event.preventDefault();
      this.showLoading();
      var data = this.state.form;
      var oCommonService = new CommonService();
      oCommonService.contact(data).then(function (response) {
        this.hideLoading();
        if (response.ok) {
          (0, _reactDom.render)(_react2.default.createElement(
            'div',
            { className: 'alert alert-success' },
            'Your message was successfully sent, we will contact you soon!.'
          ), document.getElementById("alert_msg"));
        }
      }, function (err) {
        _this2.hideLoading();
        (0, _reactDom.render)(_react2.default.createElement(
          'div',
          { className: 'alert alert-danger' },
          'An error occurred while sending your message.'
        ), document.getElementById("alert_msg"));
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'container-fluid' },
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'div',
            { className: 'col-md-12' },
            _react2.default.createElement('div', { id: 'alert_msg', className: 'container-form-alert' })
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'div',
            { className: 'col-md-12 container-form' },
            _react2.default.createElement(
              'div',
              { className: 'form_header text-center' },
              _react2.default.createElement(
                'h2',
                null,
                'Contact us form'
              ),
              _react2.default.createElement('p', null)
            ),
            _react2.default.createElement(
              'form',
              { method: 'post', onSubmit: this.contact.bind(this) },
              _react2.default.createElement(
                'div',
                { className: 'form-group ' },
                _react2.default.createElement(
                  'label',
                  { className: 'control-label requiredField', htmlFor: 'user_fullname' },
                  'Full name',
                  _react2.default.createElement(
                    'span',
                    { className: 'asteriskField' },
                    '*'
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'input-group' },
                  _react2.default.createElement(
                    'div',
                    { className: 'input-group-addon' },
                    _react2.default.createElement('i', { className: 'fa fa-user' })
                  ),
                  _react2.default.createElement('input', { className: 'form-control', onChange: this.changeContent.bind(this, 'fullname'), id: 'user_fullname', name: 'user_fullname', type: 'text', required: true })
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'form-group ' },
                _react2.default.createElement(
                  'label',
                  { className: 'control-label requiredField', htmlFor: 'contact_email' },
                  'Your email address',
                  _react2.default.createElement(
                    'span',
                    { className: 'asteriskField' },
                    '*'
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'input-group' },
                  _react2.default.createElement(
                    'div',
                    { className: 'input-group-addon' },
                    _react2.default.createElement('i', { className: 'fa fa-user' })
                  ),
                  _react2.default.createElement('input', { className: 'form-control', onChange: this.changeContent.bind(this, 'email'), id: 'contact_email', name: 'contact_email', type: 'text' })
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'form-group ' },
                _react2.default.createElement(
                  'label',
                  { className: 'control-label requiredField', htmlFor: 'subject' },
                  'Subject',
                  _react2.default.createElement(
                    'span',
                    { className: 'asteriskField' },
                    '*'
                  )
                ),
                _react2.default.createElement('input', { className: 'form-control', onChange: this.changeContent.bind(this, 'subject'), id: 'subject', name: 'subject', type: 'text' })
              ),
              _react2.default.createElement(
                'div',
                { className: 'form-group ' },
                _react2.default.createElement(
                  'label',
                  { className: 'control-label requiredField', htmlFor: 'message' },
                  'Message',
                  _react2.default.createElement(
                    'span',
                    { className: 'asteriskField' },
                    '*'
                  )
                ),
                _react2.default.createElement('textarea', { className: 'form-control', onChange: this.changeContent.bind(this, 'message'), cols: '40', id: 'message', name: 'message', rows: '10' })
              ),
              _react2.default.createElement(
                'div',
                { className: 'form-group' },
                _react2.default.createElement(
                  'div',
                  null,
                  _react2.default.createElement(
                    'button',
                    { className: 'btn btn-success btn-lg btn-block', name: 'submit', type: 'submit' },
                    'Send',
                    _react2.default.createElement(FormLoaderIndicator, { loading: this.state.loading })
                  )
                )
              )
            )
          )
        )
      );
    }
  }]);
  return ContactComponent;
}(_react.Component);

module.exports = ContactComponent;

/***/ }),

/***/ "./src/meveo/pages/public/FaqComponent.jsx":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _getPrototypeOf = __webpack_require__("./node_modules/babel-runtime/core-js/object/get-prototype-of.js");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__("./node_modules/babel-runtime/helpers/createClass.js");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__("./node_modules/babel-runtime/helpers/possibleConstructorReturn.js");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__("./node_modules/babel-runtime/helpers/inherits.js");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__("./node_modules/react/react.js");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FaqComponent = function (_Component) {
	(0, _inherits3.default)(FaqComponent, _Component);

	function FaqComponent() {
		(0, _classCallCheck3.default)(this, FaqComponent);
		return (0, _possibleConstructorReturn3.default)(this, (FaqComponent.__proto__ || (0, _getPrototypeOf2.default)(FaqComponent)).apply(this, arguments));
	}

	(0, _createClass3.default)(FaqComponent, [{
		key: "render",
		value: function render() {
			return _react2.default.createElement(
				"div",
				{ className: "page-faq" },
				_react2.default.createElement(
					"section",
					null,
					_react2.default.createElement(
						"div",
						{ className: "container" },
						_react2.default.createElement(
							"div",
							{ className: "row" },
							_react2.default.createElement(
								"div",
								{ className: "col-lg-12 text-center" },
								_react2.default.createElement(
									"h2",
									{ className: "section-title" },
									"Top Questions We Hear Customers Ask"
								),
								_react2.default.createElement("hr", null)
							),
							_react2.default.createElement(
								"div",
								{ className: "col-lg-6 content-half" },
								_react2.default.createElement(
									"h2",
									{ className: "under-section-title" },
									_react2.default.createElement("i", { className: "fa fa-check" }),
									" Quam ob rem id primum videamus"
								),
								_react2.default.createElement(
									"div",
									{ className: "text-muted" },
									_react2.default.createElement(
										"p",
										null,
										"si placet, quatenus amor in amicitia progredi debeat. Numne, si Coriolanus habuit amicos, ferre contra patriam arma illi cum Coriolano debuerunt? num Vecellinum amici regnum adpetentem, num Maelium debuerunt iuvare"
									)
								)
							),
							_react2.default.createElement(
								"div",
								{ className: "col-lg-6 content-half" },
								_react2.default.createElement(
									"h2",
									{ className: "under-section-title" },
									_react2.default.createElement("i", { className: "fa fa-check" }),
									" Quam ob rem id primum videamus"
								),
								_react2.default.createElement(
									"div",
									{ className: "text-muted" },
									_react2.default.createElement(
										"p",
										null,
										"si placet, quatenus amor in amicitia progredi debeat. Numne, si Coriolanus habuit amicos, ferre contra patriam arma illi cum Coriolano debuerunt? num Vecellinum amici regnum adpetentem, num Maelium debuerunt iuvare"
									)
								)
							)
						),
						_react2.default.createElement(
							"div",
							{ className: "row" },
							_react2.default.createElement(
								"div",
								{ className: "col-lg-6 content-half" },
								_react2.default.createElement(
									"h2",
									{ className: "under-section-title" },
									_react2.default.createElement("i", { className: "fa fa-check" }),
									" Quam ob rem id primum videamus"
								),
								_react2.default.createElement(
									"div",
									{ className: "text-muted" },
									_react2.default.createElement(
										"p",
										null,
										"si placet, quatenus amor in amicitia progredi debeat. Numne, si Coriolanus habuit amicos, ferre contra patriam arma illi cum Coriolano debuerunt? num Vecellinum amici regnum adpetentem, num Maelium debuerunt iuvare"
									)
								)
							),
							_react2.default.createElement(
								"div",
								{ className: "col-lg-6 content-half" },
								_react2.default.createElement(
									"h2",
									{ className: "under-section-title" },
									_react2.default.createElement("i", { className: "fa fa-check" }),
									" Quam ob rem id primum videamus"
								),
								_react2.default.createElement(
									"div",
									{ className: "text-muted" },
									_react2.default.createElement(
										"p",
										null,
										"si placet, quatenus amor in amicitia progredi debeat. Numne, si Coriolanus habuit amicos, ferre contra patriam arma illi cum Coriolano debuerunt? num Vecellinum amici regnum adpetentem, num Maelium debuerunt iuvare"
									)
								)
							)
						),
						_react2.default.createElement(
							"div",
							{ className: "row" },
							_react2.default.createElement(
								"div",
								{ className: "col-lg-6 content-half" },
								_react2.default.createElement(
									"h2",
									{ className: "under-section-title" },
									_react2.default.createElement("i", { className: "fa fa-check" }),
									" Quam ob rem id primum videamus"
								),
								_react2.default.createElement(
									"div",
									{ className: "text-muted" },
									_react2.default.createElement(
										"p",
										null,
										"si placet, quatenus amor in amicitia progredi debeat. Numne, si Coriolanus habuit amicos, ferre contra patriam arma illi cum Coriolano debuerunt? num Vecellinum amici regnum adpetentem, num Maelium debuerunt iuvare"
									)
								)
							),
							_react2.default.createElement(
								"div",
								{ className: "col-lg-6 content-half" },
								_react2.default.createElement(
									"h2",
									{ className: "under-section-title" },
									_react2.default.createElement("i", { className: "fa fa-check" }),
									" Quam ob rem id primum videamus"
								),
								_react2.default.createElement(
									"div",
									{ className: "text-muted" },
									_react2.default.createElement(
										"p",
										null,
										"si placet, quatenus amor in amicitia progredi debeat. Numne, si Coriolanus habuit amicos, ferre contra patriam arma illi cum Coriolano debuerunt? num Vecellinum amici regnum adpetentem, num Maelium debuerunt iuvare"
									)
								)
							)
						)
					)
				)
			);
		}
	}]);
	return FaqComponent;
}(_react.Component);

;

module.exports = FaqComponent;

/***/ }),

/***/ "./src/meveo/pages/public/ForgotPasswordComponent.jsx":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _getPrototypeOf = __webpack_require__("./node_modules/babel-runtime/core-js/object/get-prototype-of.js");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__("./node_modules/babel-runtime/helpers/createClass.js");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__("./node_modules/babel-runtime/helpers/possibleConstructorReturn.js");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__("./node_modules/babel-runtime/helpers/inherits.js");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__("./node_modules/react/react.js");

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__("./node_modules/react-dom/index.js");

var _GuestStore = __webpack_require__("./src/meveo/stores/GuestStore.js");

var _GuestStore2 = _interopRequireDefault(_GuestStore);

var _FormLoaderIndicatorComponent = __webpack_require__("./src/meveo/pages/elements/FormLoaderIndicatorComponent.jsx");

var _FormLoaderIndicatorComponent2 = _interopRequireDefault(_FormLoaderIndicatorComponent);

var _CustomerActions = __webpack_require__("./src/meveo/actions/CustomerActions.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ForgotPasswordComponent = function (_Component) {
  (0, _inherits3.default)(ForgotPasswordComponent, _Component);

  function ForgotPasswordComponent() {
    (0, _classCallCheck3.default)(this, ForgotPasswordComponent);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ForgotPasswordComponent.__proto__ || (0, _getPrototypeOf2.default)(ForgotPasswordComponent)).call(this));

    _this.state = {
      isLoading: false,
      error: null,
      email: ''
    };
    return _this;
  }

  (0, _createClass3.default)(ForgotPasswordComponent, [{
    key: 'changeContent',
    value: function changeContent(name, e) {
      var change = {};
      change[name] = e.target.value;
      this.setState(change);
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      _GuestStore2.default.bindLoadHandler(this.renderLoader.bind(this));
      _GuestStore2.default.bindUpdateHandler(this.redirectOnUpdate.bind(this));
      _GuestStore2.default.bindErrorHandler(this.renderError.bind(this));
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _GuestStore2.default.unbindLoadHandler(this.renderLoader.bind(this));
      _GuestStore2.default.unbindUpdateHandler(this.redirectOnUpdate.bind(this));
      _GuestStore2.default.unbindErrorHandler(this.renderError.bind(this));
    }
  }, {
    key: 'navigateBack',
    value: function navigateBack() {
      document.location = "index.html#/signin";
    }
  }, {
    key: 'renderLoader',
    value: function renderLoader() {
      this.setState({
        isLoading: true,
        error: null
      });
    }
  }, {
    key: 'renderError',
    value: function renderError(error) {
      this.setState({
        isLoading: false,
        error: error
      });
    }
  }, {
    key: 'redirectOnUpdate',
    value: function redirectOnUpdate() {
      this.setState({
        isLoading: false,
        error: null
      });
      window.scrollTo(0, 0);
      (0, _reactDom.render)(_react2.default.createElement(
        'div',
        { className: 'alert alert-success' },
        'We have sent you an email with a new password at: ',
        this.state.email,
        '.'
      ), document.getElementById("alert_msg"));
    }
  }, {
    key: 'displayError',
    value: function displayError() {
      var error = this.state.error;

      if (error == null) {
        return;
      } else {
        window.scrollTo(0, 0);
        return _react2.default.createElement(
          'div',
          { className: 'alert alert-danger' },
          _react2.default.createElement(
            'strong',
            null,
            'Error! '
          ),
          ' ',
          error.message,
          '.'
        );
      }
    }
  }, {
    key: 'forgot_password',
    value: function forgot_password(event) {
      event.preventDefault();
      var user_email = this.state.email;
      (0, _CustomerActions.forgotPassword)(user_email);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'forgot-password-container login-container' },
        _react2.default.createElement(
          'div',
          { className: 'container-fluid' },
          _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement(
              'div',
              { id: 'alert_msg', className: 'container-form-alert' },
              this.displayError()
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement(
              'div',
              { className: 'col-md-12 container-form login-form' },
              _react2.default.createElement(
                'div',
                { className: 'form_header text-center' },
                _react2.default.createElement(
                  'h2',
                  null,
                  'You forgot your password ?'
                ),
                _react2.default.createElement(
                  'p',
                  null,
                  'Please enter your email address to retrieve it'
                )
              ),
              _react2.default.createElement(
                'form',
                { method: 'post', onSubmit: this.forgot_password.bind(this) },
                _react2.default.createElement(
                  'div',
                  { className: 'form-group ' },
                  _react2.default.createElement('input', { className: 'form-control input-lg', onChange: this.changeContent.bind(this, 'email'), id: 'reset_email', name: 'reset_email', placeholder: 'Email address', type: 'email', required: true })
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'form-group' },
                  _react2.default.createElement(
                    'div',
                    { className: 'clearfix' },
                    _react2.default.createElement(
                      'button',
                      { className: 'btn btn-danger btn-sm pull-left', type: 'button', onClick: this.navigateBack },
                      'Back'
                    ),
                    _react2.default.createElement(
                      'button',
                      { className: 'btn btn-theme-default btn-sm pull-right', name: 'submit', type: 'submit' },
                      'Continue',
                      _react2.default.createElement(_FormLoaderIndicatorComponent2.default, { loading: this.state.isLoading })
                    )
                  )
                )
              )
            )
          )
        )
      );
    }
  }]);
  return ForgotPasswordComponent;
}(_react.Component);

module.exports = ForgotPasswordComponent;

/***/ }),

/***/ "./src/meveo/pages/public/HowitworksComponent.jsx":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _getPrototypeOf = __webpack_require__("./node_modules/babel-runtime/core-js/object/get-prototype-of.js");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__("./node_modules/babel-runtime/helpers/createClass.js");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__("./node_modules/babel-runtime/helpers/possibleConstructorReturn.js");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__("./node_modules/babel-runtime/helpers/inherits.js");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__("./node_modules/react/react.js");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HowItWorksComponent = function (_Component) {
	(0, _inherits3.default)(HowItWorksComponent, _Component);

	function HowItWorksComponent() {
		(0, _classCallCheck3.default)(this, HowItWorksComponent);
		return (0, _possibleConstructorReturn3.default)(this, (HowItWorksComponent.__proto__ || (0, _getPrototypeOf2.default)(HowItWorksComponent)).apply(this, arguments));
	}

	(0, _createClass3.default)(HowItWorksComponent, [{
		key: "render",
		value: function render() {
			return _react2.default.createElement(
				"div",
				{ className: "page-howitwork" },
				_react2.default.createElement(
					"section",
					null,
					_react2.default.createElement(
						"div",
						{ className: "container" },
						_react2.default.createElement(
							"div",
							{ className: "row" },
							_react2.default.createElement(
								"div",
								{ className: "col-lg-6 content-half text-center pull-lg-right" },
								_react2.default.createElement(
									"div",
									{ className: "image-wrap" },
									_react2.default.createElement("img", { src: "images/desktop.svg", alt: "", width: "545", height: "425" })
								)
							),
							_react2.default.createElement(
								"div",
								{ className: "col-lg-6 content-half" },
								_react2.default.createElement(
									"h2",
									{ className: "section-title" },
									"Quam ob rem id primum videamus"
								),
								_react2.default.createElement(
									"div",
									{ className: "text-muted" },
									_react2.default.createElement(
										"p",
										null,
										"si placet, quatenus amor in amicitia progredi debeat. Numne, si Coriolanus habuit amicos, ferre contra patriam arma illi cum Coriolano debuerunt? num Vecellinum amici regnum adpetentem, num Maelium debuerunt iuvare"
									),
									_react2.default.createElement(
										"ul",
										null,
										_react2.default.createElement(
											"li",
											null,
											"Big or small"
										),
										_react2.default.createElement(
											"li",
											null,
											"Short or ongoing"
										),
										_react2.default.createElement(
											"li",
											null,
											"Individual or team-based"
										)
									),
									_react2.default.createElement(
										"p",
										null,
										"si placet, quatenus amor in amicitia progredi debeat. Numne, si Corio contra patriam arma illi cum Coriolano debuerunt? num Vecellinum amici regnum adpetentem."
									)
								)
							)
						)
					)
				),
				_react2.default.createElement(
					"section",
					null,
					_react2.default.createElement(
						"div",
						{ className: "container" },
						_react2.default.createElement(
							"div",
							{ className: "row" },
							_react2.default.createElement(
								"div",
								{ className: "col-lg-6 content-half text-center" },
								_react2.default.createElement(
									"div",
									{ className: "image-wrap" },
									_react2.default.createElement("img", { src: "images/mobile.png", alt: "" })
								)
							),
							_react2.default.createElement(
								"div",
								{ className: "col-lg-6 content-half" },
								_react2.default.createElement(
									"h2",
									{ className: "section-title" },
									"Omitto iuris dictionem in libera civitate"
								),
								_react2.default.createElement(
									"div",
									{ className: "text-muted" },
									_react2.default.createElement(
										"p",
										null,
										"Start by writing a clear and concise job post. Each freelancer submits a cover letter and link to their Upwork profile covering:"
									),
									_react2.default.createElement(
										"ul",
										null,
										_react2.default.createElement(
											"li",
											null,
											"Skills, experience and portfolios"
										),
										_react2.default.createElement(
											"li",
											null,
											"Client feedback"
										),
										_react2.default.createElement(
											"li",
											null,
											"Language and communication skills"
										)
									),
									_react2.default.createElement(
										"p",
										null,
										"You ll get applications from independent professionals and receive our personalized recommendations within minutes. From there, just interview your strongest candidates and hire your favorite."
									)
								)
							)
						)
					)
				),
				_react2.default.createElement(
					"section",
					{ className: "content-reversed" },
					_react2.default.createElement(
						"div",
						{ className: "container" },
						_react2.default.createElement(
							"div",
							{ className: "row" },
							_react2.default.createElement(
								"div",
								{ className: "col-lg-6 content-half text-center pull-lg-right" },
								_react2.default.createElement(
									"div",
									{ className: "image-wrap" },
									_react2.default.createElement("img", { src: "images/payment.svg", alt: "", width: "540", height: "450" })
								)
							),
							_react2.default.createElement(
								"div",
								{ className: "col-lg-6 content-half" },
								_react2.default.createElement(
									"h2",
									{ className: "section-title" },
									"Iam virtutem ex consuetudine vitae"
								),
								_react2.default.createElement(
									"div",
									{ className: "text-muted" },
									_react2.default.createElement(
										"p",
										null,
										"virgines se in puteos abiecisse et morte voluntaria necessariam turpitudinem depulisse Iam virtutem ex consuetudine vitae sermonisque nostri interpretemur nec eam, ut quidam docti, verborum magnificentia metiamur virosque bonos eos, qui habentur, numeremus."
									),
									_react2.default.createElement(
										"p",
										null,
										"sermonisque nostri interpretemur nec eam or per project, whichever you choose :"
									),
									_react2.default.createElement(
										"ul",
										null,
										_react2.default.createElement(
											"li",
											null,
											"Credit card"
										),
										_react2.default.createElement(
											"li",
											null,
											"PayPal"
										),
										_react2.default.createElement(
											"li",
											null,
											"Bank account"
										)
									),
									_react2.default.createElement(
										"p",
										null,
										"ut quidam docti, verborum magnificentia metiamur virosque bonos eos"
									)
								)
							)
						)
					)
				),
				_react2.default.createElement(
					"section",
					null,
					_react2.default.createElement(
						"div",
						{ className: "container" },
						_react2.default.createElement(
							"div",
							{ className: "row" },
							_react2.default.createElement(
								"div",
								{ className: "col-lg-6 content-half text-center" },
								_react2.default.createElement(
									"div",
									{ className: "image-wrap" },
									_react2.default.createElement("img", { src: "images/protection.svg", alt: "", width: "328", height: "420" })
								)
							),
							_react2.default.createElement(
								"div",
								{ className: "col-lg-6 content-half" },
								_react2.default.createElement(
									"h2",
									{ className: "section-title" },
									"Autem omittamus, qui omnino ?"
								),
								_react2.default.createElement(
									"div",
									{ className: "text-muted" },
									_react2.default.createElement(
										"p",
										null,
										"Enjoy peace of mind with systems designed to provide a safe and trusted workplace, including:"
									),
									_react2.default.createElement(
										"p",
										null,
										_react2.default.createElement(
											"strong",
											null,
											"Work Diary."
										),
										"ut quidam docti, verborum magnificentia metiamur virosque bonos ,"
									),
									_react2.default.createElement(
										"p",
										null,
										_react2.default.createElement(
											"strong",
											{ className: "font-gotham-bold" },
											"Payment Protection."
										),
										"us habuit amicos, ferre contra patriam arma illi cum Coriolano debuerunt"
									),
									_react2.default.createElement(
										"p",
										null,
										_react2.default.createElement(
											"strong",
											{ className: "font-gotham-bold" },
											"Dispute Resolution."
										),
										"ut quidam docti, verborum magnificentia metiamur virosque bonos"
									)
								)
							)
						)
					)
				)
			);
		}
	}]);
	return HowItWorksComponent;
}(_react.Component);

;

module.exports = HowItWorksComponent;

/***/ }),

/***/ "./src/meveo/pages/public/IndexComponent.jsx":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _getPrototypeOf = __webpack_require__("./node_modules/babel-runtime/core-js/object/get-prototype-of.js");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__("./node_modules/babel-runtime/helpers/createClass.js");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__("./node_modules/babel-runtime/helpers/possibleConstructorReturn.js");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__("./node_modules/babel-runtime/helpers/inherits.js");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__("./node_modules/react/react.js");

var _react2 = _interopRequireDefault(_react);

var _reactRouter = __webpack_require__("./node_modules/react-router/lib/index.js");

var _properties = __webpack_require__("./src/properties.js");

var properties = _interopRequireWildcard(_properties);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IndexComponent = function (_Component) {
	(0, _inherits3.default)(IndexComponent, _Component);

	function IndexComponent() {
		(0, _classCallCheck3.default)(this, IndexComponent);
		return (0, _possibleConstructorReturn3.default)(this, (IndexComponent.__proto__ || (0, _getPrototypeOf2.default)(IndexComponent)).apply(this, arguments));
	}

	(0, _createClass3.default)(IndexComponent, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					'section',
					{ className: 'section1 text-center section-backg' },
					_react2.default.createElement(
						'div',
						{ className: 'container' },
						_react2.default.createElement(
							'div',
							{ className: 'row' },
							_react2.default.createElement(
								'div',
								{ className: 'col-sm-12' },
								_react2.default.createElement(
									'h3',
									{ className: 'text-primary' },
									'Create your personal space and ',
									_react2.default.createElement(
										'span',
										null,
										'visualize your invoices'
									)
								),
								_react2.default.createElement(
									'div',
									{ className: 'btn-wrap-inner' },
									_react2.default.createElement(
										_reactRouter.Link,
										{ className: 'btn-start', to: properties.signup_url },
										'Start'
									)
								)
							)
						)
					)
				),
				_react2.default.createElement(
					'section',
					{ className: 'section2 text-center' },
					_react2.default.createElement(
						'div',
						{ className: 'container' },
						_react2.default.createElement(
							'ul',
							{ className: 'landing-categories list-unstyled clearfix' },
							_react2.default.createElement(
								'li',
								{ className: 'col-sm-6 col-md-4 col-lg-3' },
								_react2.default.createElement(
									'a',
									{ className: 'category-item', href: '/cat/developers/' },
									_react2.default.createElement(
										'span',
										{ className: 'front' },
										_react2.default.createElement('i', { className: 'category-icon category-developers' })
									),
									_react2.default.createElement(
										'span',
										{ className: 'category-title' },
										'Admin acces'
									),
									_react2.default.createElement(
										'span',
										{ className: 'back' },
										'Administration',
										_react2.default.createElement('br', null),
										_react2.default.createElement('br', null),
										_react2.default.createElement(
											'em',
											null,
											'an more...'
										)
									)
								)
							)
						),
						_react2.default.createElement('div', { className: 'clear' })
					)
				),
				_react2.default.createElement(
					'section',
					{ className: 'feature-section ' },
					_react2.default.createElement(
						'div',
						{ className: 'contentRow smart_bi' },
						_react2.default.createElement(
							'div',
							{ className: 'container' },
							_react2.default.createElement(
								'div',
								{ className: 'col-sm-3 fact statistics-content ' },
								_react2.default.createElement(
									'div',
									{ className: 'counter-box' },
									_react2.default.createElement(
										'h3',
										null,
										_react2.default.createElement(
											'span',
											{ className: 'counter' },
											'+100'
										)
									),
									_react2.default.createElement(
										'h5',
										null,
										'Customers'
									)
								)
							),
							_react2.default.createElement(
								'div',
								{ className: 'col-sm-3 fact statistics-content ' },
								_react2.default.createElement(
									'div',
									{ className: 'counter-box' },
									_react2.default.createElement(
										'h3',
										null,
										_react2.default.createElement(
											'span',
											{ className: 'counter' },
											'5'
										)
									),
									_react2.default.createElement(
										'h5',
										null,
										'Years of service'
									)
								)
							),
							_react2.default.createElement(
								'div',
								{ className: 'col-sm-3 fact statistics-content ' },
								_react2.default.createElement(
									'div',
									{ className: 'counter-box' },
									_react2.default.createElement(
										'h3',
										null,
										_react2.default.createElement(
											'span',
											{ className: 'counter' },
											'10'
										),
										'+'
									),
									_react2.default.createElement(
										'h5',
										null,
										'Professionals'
									)
								)
							),
							_react2.default.createElement(
								'div',
								{ className: 'col-sm-3 fact statistics-content ' },
								_react2.default.createElement(
									'div',
									{ className: 'counter-box' },
									_react2.default.createElement(
										'h3',
										null,
										_react2.default.createElement(
											'span',
											{ className: 'counter' },
											'100'
										),
										'%'
									),
									_react2.default.createElement(
										'h5',
										null,
										'Satisfied customers'
									)
								)
							)
						)
					)
				),
				_react2.default.createElement(
					'section',
					{ className: 'section3 text-center clearfix' },
					_react2.default.createElement(
						'h2',
						{ className: 'container-title' },
						'Choose ideal plan for your budget'
					),
					_react2.default.createElement(
						'div',
						{ id: 'monthly' },
						_react2.default.createElement(
							'div',
							{ className: 'col-sm-12 pricing_table col-md-5' },
							_react2.default.createElement(
								'div',
								{ className: 'm0 inner' },
								_react2.default.createElement(
									'h4',
									{ className: 'pricing_title' },
									'Entreprise'
								),
								_react2.default.createElement(
									'div',
									{ className: 'row m0 pricing_price' },
									_react2.default.createElement(
										'div',
										{ className: 'row m0 round_box' },
										_react2.default.createElement(
											'div',
											{ className: 'price_inner' },
											_react2.default.createElement(
												'span',
												{ className: 'price' },
												'0\u20AC'
											),
											_react2.default.createElement('br', null),
											'per month'
										)
									)
								),
								_react2.default.createElement(
									'ul',
									{ className: 'list-unstyled feature' },
									_react2.default.createElement(
										'li',
										{ className: 'fa fa fa-check-circle' },
										'Open source'
									),
									_react2.default.createElement(
										'li',
										{ className: 'fa fa-times-circle' },
										'Community Support via forum'
									)
								),
								_react2.default.createElement(
									'a',
									{ className: 'purchase_btn', href: 'http://google.com' },
									'Choose'
								)
							)
						),
						_react2.default.createElement(
							'div',
							{ className: 'col-sm-12 pricing_table col-md-5 col-md-offset-2' },
							_react2.default.createElement(
								'div',
								{ className: 'm0 inner' },
								_react2.default.createElement(
									'h4',
									{ className: 'pricing_title' },
									'Enterprise'
								),
								_react2.default.createElement(
									'div',
									{ className: 'row m0 pricing_price' },
									_react2.default.createElement(
										'div',
										{ className: 'row m0 round_box' },
										_react2.default.createElement(
											'div',
											{ className: 'price_inner' },
											_react2.default.createElement(
												'span',
												{ className: 'price' },
												'90\u20AC'
											),
											_react2.default.createElement('br', null),
											'per month'
										)
									)
								),
								_react2.default.createElement(
									'ul',
									{ className: 'list-unstyled feature' },
									_react2.default.createElement(
										'li',
										{ className: 'fa fa fa-check-circle' },
										'bug fix with SLA'
									),
									_react2.default.createElement(
										'li',
										{ className: 'fa fa-check-circle' },
										'Support'
									),
									_react2.default.createElement(
										'li',
										{ className: 'fa fa-check-circle' },
										'Upgrade scripts'
									)
								),
								_react2.default.createElement(
									'a',
									{ className: 'purchase_btn', href: 'http://google.com' },
									'Choose'
								)
							)
						)
					)
				),
				_react2.default.createElement(
					'section',
					{ className: 'section4' },
					_react2.default.createElement(
						'div',
						{ className: 'container' },
						_react2.default.createElement(
							'div',
							{ className: 'row' },
							_react2.default.createElement(
								'div',
								{ className: 'col-md-6  text-center' },
								_react2.default.createElement(
									'div',
									null,
									_react2.default.createElement('img', { src: 'images/1.jpg', alt: 'Design offers tailored for your buiness.', className: 'img-responsive' })
								)
							),
							_react2.default.createElement(
								'div',
								{ className: 'col-md-6  text-left' },
								_react2.default.createElement(
									'div',
									{ className: 'description-div' },
									_react2.default.createElement(
										'h2',
										{ className: 'section-title' },
										'Design offers tailored',
										_react2.default.createElement('br', null),
										'for your buiness'
									),
									_react2.default.createElement(
										'p',
										{ className: 'section-description' },
										'Get amazing results working with our catalog designers and get help form our experts.'
									)
								)
							)
						)
					)
				),
				_react2.default.createElement(
					'section',
					{ className: 'section6' },
					_react2.default.createElement(
						'div',
						{ className: 'container' },
						_react2.default.createElement(
							'div',
							{ className: 'row' },
							_react2.default.createElement(
								'div',
								{ className: 'col-md-6 text-left' },
								_react2.default.createElement(
									'div',
									{ className: 'description-div' },
									_react2.default.createElement(
										'h2',
										{ className: 'section-title' },
										'Monetize your',
										_react2.default.createElement('br', null),
										'online business'
									),
									_react2.default.createElement(
										'p',
										{ className: 'section-description' },
										'Create priceplans, bundles, etc.'
									)
								)
							),
							_react2.default.createElement(
								'div',
								{ className: 'col-md-6 text-center pull-left' },
								_react2.default.createElement(
									'div',
									null,
									_react2.default.createElement('img', { src: 'images/2.jpg', alt: 'Monetize your online business.', className: 'img-responsive' })
								)
							)
						)
					)
				),
				_react2.default.createElement(
					'section',
					{ className: 'section8' },
					_react2.default.createElement(
						'div',
						{ className: 'container' },
						_react2.default.createElement(
							'div',
							{ className: 'row' },
							_react2.default.createElement(
								'div',
								{ className: 'col-md-6 text-center' },
								_react2.default.createElement(
									'div',
									null,
									_react2.default.createElement('img', { src: 'images/3.jpg', alt: 'Collect payments and monitor dunning process.', className: 'img-responsive' })
								)
							),
							_react2.default.createElement(
								'div',
								{ className: 'col-md-6 text-left' },
								_react2.default.createElement(
									'div',
									{ className: 'description-div' },
									_react2.default.createElement(
										'h2',
										{ className: 'section-title' },
										_react2.default.createElement(
											'span',
											null,
											'Collect '
										),
										_react2.default.createElement(
											'span',
											null,
											'payments'
										)
									),
									_react2.default.createElement(
										'p',
										{ className: 'section-description' },
										'Collect payments and monitor dunning process.'
									)
								)
							)
						)
					)
				),
				_react2.default.createElement(
					'section',
					{ className: 'section10 text-center' },
					_react2.default.createElement(
						'h2',
						{ className: 'container-title' },
						'Open your account today'
					),
					_react2.default.createElement(
						'div',
						{ className: 'btn-wrap' },
						_react2.default.createElement(
							_reactRouter.Link,
							{ to: properties.signup_url, className: 'btn-start' },
							'START'
						)
					)
				)
			);
		}
	}]);
	return IndexComponent;
}(_react.Component);

module.exports = IndexComponent;

/***/ }),

/***/ "./src/meveo/pages/public/LoginComponent.jsx":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _getPrototypeOf = __webpack_require__("./node_modules/babel-runtime/core-js/object/get-prototype-of.js");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__("./node_modules/babel-runtime/helpers/createClass.js");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__("./node_modules/babel-runtime/helpers/possibleConstructorReturn.js");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__("./node_modules/babel-runtime/helpers/inherits.js");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__("./node_modules/react/react.js");

var _react2 = _interopRequireDefault(_react);

var _reactRouter = __webpack_require__("./node_modules/react-router/lib/index.js");

var _CustomerStore = __webpack_require__("./src/meveo/stores/CustomerStore.js");

var _CustomerStore2 = _interopRequireDefault(_CustomerStore);

var _FormLoaderIndicatorComponent = __webpack_require__("./src/meveo/pages/elements/FormLoaderIndicatorComponent.jsx");

var _FormLoaderIndicatorComponent2 = _interopRequireDefault(_FormLoaderIndicatorComponent);

var _CustomerActions = __webpack_require__("./src/meveo/actions/CustomerActions.js");

var _LocalStorageService = __webpack_require__("./src/meveo/services/LocalStorageService.js");

var _LocalStorageService2 = _interopRequireDefault(_LocalStorageService);

var _properties = __webpack_require__("./src/properties.js");

var properties = _interopRequireWildcard(_properties);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LoginComponent = function (_Component) {
	(0, _inherits3.default)(LoginComponent, _Component);

	function LoginComponent() {
		(0, _classCallCheck3.default)(this, LoginComponent);

		var _this = (0, _possibleConstructorReturn3.default)(this, (LoginComponent.__proto__ || (0, _getPrototypeOf2.default)(LoginComponent)).call(this));

		_this.state = {
			isLoading: false,
			username: '',
			password: '',
			error: null
		};
		return _this;
	}

	(0, _createClass3.default)(LoginComponent, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			_CustomerStore2.default.bindLoadHandler(this.renderLoader.bind(this));
			_CustomerStore2.default.bindUpdateHandler(this.redirectOnUpdate.bind(this));
			_CustomerStore2.default.bindErrorHandler(this.renderError.bind(this));
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			_CustomerStore2.default.unbindLoadHandler(this.renderLoader.bind(this));
			_CustomerStore2.default.unbindUpdateHandler(this.redirectOnUpdate.bind(this));
			_CustomerStore2.default.unbindErrorHandler(this.renderError.bind(this));
		}
	}, {
		key: 'changeUsername',
		value: function changeUsername(e) {
			this.setState({
				username: e.target.value
			});
		}
	}, {
		key: 'changePassword',
		value: function changePassword(e) {
			this.setState({
				password: e.target.value
			});
		}
	}, {
		key: 'renderSignupMsg',
		value: function renderSignupMsg() {
			var signup_email = _LocalStorageService2.default.get("vpp_signupEmail");
			if (signup_email != null) {
				_LocalStorageService2.default.remove("vpp_signupEmail");
				window.scrollTo(0, 0);
				return _react2.default.createElement(
					'div',
					{ className: 'alert alert-success' },
					'We have sent you an email at ',
					signup_email,
					', please check it before trying to login.'
				);
			}
		}
	}, {
		key: 'renderLoader',
		value: function renderLoader() {
			this.setState({
				isLoading: true,
				error: null
			});
		}
	}, {
		key: 'renderError',
		value: function renderError(error) {
			this.setState({
				isLoading: false,
				error: error
			});
		}
	}, {
		key: 'redirectOnUpdate',
		value: function redirectOnUpdate(customer) {
			this.setState({
				isLoading: false,
				error: null
			});
			if (customer != null) {
				window.location = "index.html#";
			}
		}
	}, {
		key: 'displayError',
		value: function displayError() {
			var error = this.state.error;

			if (error == null) {
				return;
			} else {
				window.scrollTo(0, 0);
				return _react2.default.createElement(
					'div',
					{ className: 'alert alert-danger' },
					_react2.default.createElement(
						'strong',
						null,
						'Error!'
					),
					' ',
					error.message,
					'.'
				);
			}
		}
	}, {
		key: 'login',
		value: function login(event) {
			event.preventDefault();
			(0, _CustomerActions.loginUser)({
				username: this.state.username,
				password: this.state.password
			});
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				{ className: 'container-fluid login-container' },
				_react2.default.createElement(
					'div',
					{ className: 'row' },
					_react2.default.createElement(
						'div',
						{ id: 'alert_msg', className: 'container-form-alert' },
						this.displayError(),
						this.renderSignupMsg()
					)
				),
				_react2.default.createElement(
					'div',
					{ className: 'row' },
					_react2.default.createElement(
						'div',
						{ className: 'col-md-12 container-form login-form' },
						_react2.default.createElement(
							'div',
							{ className: 'form_header text-center' },
							_react2.default.createElement(
								'h2',
								null,
								'MODULE VPP'
							),
							_react2.default.createElement(
								'p',
								null,
								'Please enter your username and password to access your account.'
							)
						),
						_react2.default.createElement(
							'form',
							{ method: 'post', onSubmit: this.login.bind(this) },
							_react2.default.createElement(
								'div',
								{ className: 'form-group ' },
								_react2.default.createElement(
									'label',
									{ className: 'control-label requiredField', htmlFor: 'login_username' },
									'Username',
									_react2.default.createElement(
										'span',
										{ className: 'asteriskField' },
										'*'
									)
								),
								_react2.default.createElement(
									'div',
									{ className: 'input-group' },
									_react2.default.createElement(
										'div',
										{ className: 'input-group-addon' },
										_react2.default.createElement('i', { className: 'fa fa-user' })
									),
									_react2.default.createElement('input', { className: 'form-control', onChange: this.changeUsername.bind(this), id: 'login_', name: 'login_username', type: 'text', required: true })
								)
							),
							_react2.default.createElement(
								'div',
								{ className: 'form-group ' },
								_react2.default.createElement(
									'label',
									{ className: 'control-label requiredField', htmlFor: 'login_password' },
									'Password',
									_react2.default.createElement(
										'span',
										{ className: 'asteriskField' },
										'*'
									)
								),
								_react2.default.createElement(
									'div',
									{ className: 'input-group' },
									_react2.default.createElement(
										'div',
										{ className: 'input-group-addon' },
										_react2.default.createElement('i', { className: 'fa fa-lock' })
									),
									_react2.default.createElement('input', { className: 'form-control', onChange: this.changePassword.bind(this), id: 'login_password', name: 'login_password', type: 'password', required: true })
								)
							),
							_react2.default.createElement(
								'div',
								{ className: 'form-group' },
								_react2.default.createElement(
									'div',
									null,
									_react2.default.createElement(
										'button',
										{ className: 'login-btn btn-block', name: 'submit', type: 'submit' },
										'Let\'s go ',
										_react2.default.createElement(_FormLoaderIndicatorComponent2.default, { loading: this.state.isLoading })
									)
								)
							)
						),
						_react2.default.createElement(
							'div',
							{ className: 'form-group' },
							_react2.default.createElement(
								_reactRouter.Link,
								{ to: '/forgot-password' },
								'You forgot your password ?'
							)
						)
					)
				)
			);
		}
	}]);
	return LoginComponent;
}(_react.Component);

module.exports = LoginComponent;

/***/ }),

/***/ "./src/meveo/pages/public/ResetPasswordComponent.jsx":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _getPrototypeOf = __webpack_require__("./node_modules/babel-runtime/core-js/object/get-prototype-of.js");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__("./node_modules/babel-runtime/helpers/createClass.js");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__("./node_modules/babel-runtime/helpers/possibleConstructorReturn.js");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__("./node_modules/babel-runtime/helpers/inherits.js");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__("./node_modules/react/react.js");

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__("./node_modules/react-dom/index.js");

var _reactRouter = __webpack_require__("./node_modules/react-router/lib/index.js");

var _CommonService = __webpack_require__("./src/meveo/services/CommonService.js");

var _CommonService2 = _interopRequireDefault(_CommonService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FormLoaderIndicator = __webpack_require__("./src/meveo/pages/elements/FormLoaderIndicatorComponent.jsx");

var ResetPasswordComponent = function (_Component) {
  (0, _inherits3.default)(ResetPasswordComponent, _Component);

  function ResetPasswordComponent() {
    (0, _classCallCheck3.default)(this, ResetPasswordComponent);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ResetPasswordComponent.__proto__ || (0, _getPrototypeOf2.default)(ResetPasswordComponent)).call(this));

    _this.state = {
      loading: false,
      form: {
        new_password: ''
      }
    };
    return _this;
  }

  (0, _createClass3.default)(ResetPasswordComponent, [{
    key: 'changeContent',
    value: function changeContent(name, e) {
      var state = this.state;
      state['form'][name] = e.target.value;
      this.setState(state);
    }
  }, {
    key: 'navigateBack',
    value: function navigateBack() {
      document.location = "index.html#/signin";
    }
  }, {
    key: 'hideLoading',
    value: function hideLoading() {
      this.setState({ loading: false });
    }
  }, {
    key: 'showLoading',
    value: function showLoading() {
      this.setState({ loading: true });
    }
  }, {
    key: 'reset_password',
    value: function reset_password(event) {
      var _this2 = this;

      event.preventDefault();
      this.showLoading();
      var data = this.state.form;
      if (data.new_password == document.getElementById("confirm_password").value) {
        var oCommonService = new _CommonService2.default();
        oCommonService.resetPassword(data.new_password).then(function (response) {
          this.hideLoading();
          if (response.errorCode == null && response.status != "FAIL") {
            (0, _reactDom.render)(_react2.default.createElement(NewPasswordComponent, null), document.getElementById("body"));
          }
        }, function (err) {
          _this2.hideLoading();
          (0, _reactDom.render)(_react2.default.createElement(
            'div',
            { className: 'alert alert-danger' },
            'Error occured while resetting your password.'
          ), document.getElementById("alert_msg"));
        });
      } else {
        this.hideLoading();
        (0, _reactDom.render)(_react2.default.createElement(
          'div',
          { className: 'alert alert-danger' },
          'The two passwords do not match.'
        ), document.getElementById("alert_msg"));
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'reset-password-container' },
        _react2.default.createElement(
          'div',
          { className: 'container-fluid' },
          _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement('div', { id: 'alert_msg', className: 'container-form-alert' })
          ),
          _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement(
              'div',
              { className: 'col-md-12 container-form' },
              _react2.default.createElement(
                'div',
                { className: 'form_header text-center' },
                _react2.default.createElement(
                  'h2',
                  null,
                  'Choose your new password'
                )
              ),
              _react2.default.createElement(
                'form',
                { method: 'post', onSubmit: this.reset_password.bind(this) },
                _react2.default.createElement(
                  'div',
                  { className: 'form-group ' },
                  _react2.default.createElement('input', { className: 'form-control input-lg', onChange: this.changeContent.bind(this, 'new_password'), placeholder: 'New password', type: 'password', required: true })
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'form-group ' },
                  _react2.default.createElement('input', { className: 'form-control input-lg', id: 'confirm_password', placeholder: 'Password confirmation', type: 'password', required: true })
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'form-group' },
                  _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                      'button',
                      { className: 'btn btn-default btn-sm pull-left', type: 'button', onClick: this.navigateBack },
                      'Back'
                    ),
                    _react2.default.createElement(
                      'button',
                      { className: 'btn btn-success btn-sm pull-right', name: 'submit', type: 'submit' },
                      'Continue',
                      _react2.default.createElement(FormLoaderIndicator, { loading: this.state.loading })
                    )
                  )
                )
              )
            )
          )
        )
      );
    }
  }]);
  return ResetPasswordComponent;
}(_react.Component);

module.exports = ResetPasswordComponent;

/***/ }),

/***/ "./src/meveo/pages/public/SignupCustomerComponent.jsx":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _getPrototypeOf = __webpack_require__("./node_modules/babel-runtime/core-js/object/get-prototype-of.js");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__("./node_modules/babel-runtime/helpers/createClass.js");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__("./node_modules/babel-runtime/helpers/possibleConstructorReturn.js");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__("./node_modules/babel-runtime/helpers/inherits.js");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__("./node_modules/react/react.js");

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__("./node_modules/react-dom/index.js");

var _reactRouter = __webpack_require__("./node_modules/react-router/lib/index.js");

var _GuestStore = __webpack_require__("./src/meveo/stores/GuestStore.js");

var _GuestStore2 = _interopRequireDefault(_GuestStore);

var _CustomerActions = __webpack_require__("./src/meveo/actions/CustomerActions.js");

var _LocalStorageService = __webpack_require__("./src/meveo/services/LocalStorageService.js");

var _LocalStorageService2 = _interopRequireDefault(_LocalStorageService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LoginComponent = __webpack_require__("./src/meveo/pages/public/LoginComponent.jsx");
var FormLoaderIndicator = __webpack_require__("./src/meveo/pages/elements/FormLoaderIndicatorComponent.jsx");

var SignupCustomerComponent = function (_Component) {
    (0, _inherits3.default)(SignupCustomerComponent, _Component);

    function SignupCustomerComponent() {
        (0, _classCallCheck3.default)(this, SignupCustomerComponent);

        var _this = (0, _possibleConstructorReturn3.default)(this, (SignupCustomerComponent.__proto__ || (0, _getPrototypeOf2.default)(SignupCustomerComponent)).call(this));

        _this.state = {
            isLoading: false,
            error: null,
            form: {
                username: '',
                email: '',
                first_name: '',
                last_name: '',
                password: ''
            }
        };
        return _this;
    }

    (0, _createClass3.default)(SignupCustomerComponent, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            _GuestStore2.default.bindLoadHandler(this.renderLoader.bind(this));
            _GuestStore2.default.bindUpdateHandler(this.redirectOnUpdate.bind(this));
            _GuestStore2.default.bindErrorHandler(this.renderError.bind(this));
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            _GuestStore2.default.unbindLoadHandler(this.renderLoader.bind(this));
            _GuestStore2.default.unbindUpdateHandler(this.redirectOnUpdate.bind(this));
            _GuestStore2.default.unbindErrorHandler(this.renderError.bind(this));
        }
    }, {
        key: 'changeContent',
        value: function changeContent(name, e) {
            var state = this.state;
            state['form'][name] = e.target.value;
            this.setState(state);
        }
    }, {
        key: 'renderLoader',
        value: function renderLoader() {
            this.setState({
                isLoading: true,
                error: null
            });
        }
    }, {
        key: 'renderError',
        value: function renderError(error) {
            this.setState({
                isLoading: false,
                error: error
            });
        }
    }, {
        key: 'redirectOnUpdate',
        value: function redirectOnUpdate() {
            this.setState({
                isLoading: false,
                error: null
            });
            _LocalStorageService2.default.set("vpp_signupEmail", this.state.form.email);
            document.location = "index.html#/signin";
        }
    }, {
        key: 'displayError',
        value: function displayError() {
            var error = this.state.error;

            if (error == null) {
                return;
            } else {
                window.scrollTo(0, 0);
                return _react2.default.createElement(
                    'div',
                    { className: 'alert alert-danger' },
                    _react2.default.createElement(
                        'strong',
                        null,
                        'Error!'
                    ),
                    ' ',
                    error.message,
                    '.'
                );
            }
        }
    }, {
        key: 'validatePassword',
        value: function validatePassword(e) {
            console.log("validatePassword");
            if (this.state.form.password != document.getElementById("confirm_password").value) {
                document.getElementById("confirm_password").setCustomValidity("Passwords do not match");
            } else {
                document.getElementById("confirm_password").setCustomValidity('');
            }
        }
    }, {
        key: 'validate',
        value: function validate() {
            return document.getElementById("form_add_customer").checkValidity();
        }
    }, {
        key: 'customer_signup',
        value: function customer_signup(event) {
            event.preventDefault();
            var user_data = this.state.form;
            (0, _CustomerActions.signupCustomer)(user_data);
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'container-fluid login-container' },
                _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                        'div',
                        { id: 'alert_msg', className: 'container-form-alert' },
                        this.displayError()
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                        'div',
                        { className: 'container-form' },
                        _react2.default.createElement(
                            'div',
                            { className: 'col-md-12 content login-form signup-form' },
                            _react2.default.createElement(
                                'div',
                                { className: 'form_header text-center' },
                                _react2.default.createElement(
                                    'h2',
                                    null,
                                    'Subscription form'
                                ),
                                _react2.default.createElement(
                                    'p',
                                    null,
                                    'Please enter your details'
                                )
                            ),
                            _react2.default.createElement(
                                'form',
                                { method: 'post', onSubmit: this.customer_signup.bind(this), id: 'form_add_customer' },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'form-group ' },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'input-group' },
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'input-group-addon' },
                                            _react2.default.createElement('i', { className: 'fa fa-user' })
                                        ),
                                        _react2.default.createElement('input', { className: 'form-control',
                                            onChange: this.changeContent.bind(this, 'last_name'),
                                            id: 'customer_lastname', name: 'customer_lastname', placeholder: 'Last name',
                                            type: 'text', required: true })
                                    )
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'form-group ' },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'input-group' },
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'input-group-addon' },
                                            _react2.default.createElement('i', { className: 'fa fa-user' })
                                        ),
                                        _react2.default.createElement('input', { className: 'form-control',
                                            onChange: this.changeContent.bind(this, 'first_name'),
                                            id: 'customer_firstname', name: 'customer_firstname', placeholder: 'First name',
                                            type: 'text', required: true })
                                    )
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'form-group ' },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'input-group' },
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'input-group-addon' },
                                            _react2.default.createElement(
                                                'i',
                                                { className: 'fa' },
                                                ' @'
                                            )
                                        ),
                                        _react2.default.createElement('input', { className: 'form-control',
                                            onChange: this.changeContent.bind(this, 'email'), placeholder: 'Email',
                                            type: 'email', required: true })
                                    )
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'form-group ' },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'input-group' },
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'input-group-addon' },
                                            _react2.default.createElement('i', { className: 'fa fa-user' })
                                        ),
                                        _react2.default.createElement('input', { className: 'form-control',
                                            onChange: this.changeContent.bind(this, 'username'),
                                            placeholder: 'Username', type: 'text', required: true })
                                    )
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'form-group' },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'input-group' },
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'input-group-addon' },
                                            _react2.default.createElement('i', { className: 'fa fa-lock' })
                                        ),
                                        _react2.default.createElement('input', { className: 'form-control',
                                            onChange: this.changeContent.bind(this, 'password'), id: 'password',
                                            name: 'password', placeholder: 'Password', type: 'password', required: true })
                                    )
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'form-group' },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'input-group' },
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'input-group-addon' },
                                            _react2.default.createElement('i', { className: 'fa fa-lock' })
                                        ),
                                        _react2.default.createElement('input', { className: 'form-control', onKeyUp: this.validatePassword.bind(this),
                                            id: 'confirm_password', name: 'confirm_password',
                                            placeholder: 'Confirm your password', type: 'password', required: true })
                                    )
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'form-group' },
                                    _react2.default.createElement(
                                        'div',
                                        null,
                                        _react2.default.createElement(
                                            'button',
                                            { className: 'btn btn-theme-default btn-lg btn-block', name: 'submit', type: 'submit',
                                                disabled: this.state.isLoading },
                                            'Start',
                                            _react2.default.createElement(FormLoaderIndicator, { loading: this.state.isLoading })
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);
    return SignupCustomerComponent;
}(_react.Component);

module.exports = SignupCustomerComponent;

/***/ }),

/***/ "./src/meveo/pages/public/VerifyEmailComponent.jsx":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _getPrototypeOf = __webpack_require__("./node_modules/babel-runtime/core-js/object/get-prototype-of.js");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__("./node_modules/babel-runtime/helpers/createClass.js");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__("./node_modules/babel-runtime/helpers/possibleConstructorReturn.js");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__("./node_modules/babel-runtime/helpers/inherits.js");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__("./node_modules/react/react.js");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VerifyEmailComponent = function (_Component) {
	(0, _inherits3.default)(VerifyEmailComponent, _Component);

	function VerifyEmailComponent() {
		(0, _classCallCheck3.default)(this, VerifyEmailComponent);

		var _this = (0, _possibleConstructorReturn3.default)(this, (VerifyEmailComponent.__proto__ || (0, _getPrototypeOf2.default)(VerifyEmailComponent)).call(this));

		_this.state = {
			loading: false
		};
		return _this;
	}

	(0, _createClass3.default)(VerifyEmailComponent, [{
		key: "send_verification",
		value: function send_verification() {}
	}, {
		key: "render",
		value: function render() {
			return _react2.default.createElement(
				"div",
				{ className: "page-verify-email" },
				_react2.default.createElement(
					"section",
					null,
					_react2.default.createElement(
						"div",
						{ className: "container" },
						_react2.default.createElement(
							"div",
							{ className: "row" },
							_react2.default.createElement(
								"div",
								{ className: "col-lg-12 text-center" },
								_react2.default.createElement(
									"h2",
									{ className: "section-title" },
									"Verify your email address to access to your account"
								),
								_react2.default.createElement("hr", null)
							),
							_react2.default.createElement(
								"div",
								{ className: "col-xs-12 visible-xs text-center m-md-bottom" },
								_react2.default.createElement("img", { src: "images/mail.png", alt: "Check your email.", width: "100" })
							),
							_react2.default.createElement("img", { src: "images/mail.png", alt: "", className: "col-md-2 col-sm-2 hidden-xs" }),
							_react2.default.createElement(
								"div",
								{ className: "col-md-10 col-sm-10 col-xs-12 p-md-top" },
								_react2.default.createElement(
									"p",
									{ className: "fs-lg fw-700 hidden-xs" },
									"We just sent an email to your address: ",
									_react2.default.createElement(
										"span",
										null,
										this.props.email
									)
								),
								_react2.default.createElement(
									"p",
									{ className: "visible-xs text-center m-lg-bottom" },
									_react2.default.createElement(
										"span",
										{ className: "text-muted" },
										"We sent an email to:"
									),
									_react2.default.createElement("br", null),
									_react2.default.createElement(
										"span",
										null,
										this.props.email
									),
									_react2.default.createElement("br", null),
									_react2.default.createElement(
										"span",
										{ className: "text-muted" },
										"Please click on the verification link in the email."
									)
								),
								_react2.default.createElement(
									"button",
									{ className: "btn btn-theme-default", onClick: this.send_verification.bind(this) },
									_react2.default.createElement("i", { className: "fa fa-sent" }),
									"Resend verification email"
								)
							)
						)
					)
				)
			);
		}
	}]);
	return VerifyEmailComponent;
}(_react.Component);

;

module.exports = VerifyEmailComponent;

/***/ }),

/***/ "./src/meveo/pages/user/ChangePassword.jsx":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _getPrototypeOf = __webpack_require__("./node_modules/babel-runtime/core-js/object/get-prototype-of.js");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__("./node_modules/babel-runtime/helpers/createClass.js");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__("./node_modules/babel-runtime/helpers/possibleConstructorReturn.js");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__("./node_modules/babel-runtime/helpers/inherits.js");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__("./node_modules/react/react.js");

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__("./node_modules/react-router-dom/es/index.js");

var _reactTooltip = __webpack_require__("./node_modules/react-tooltip/dist/index.js");

var _reactTooltip2 = _interopRequireDefault(_reactTooltip);

var _moment = __webpack_require__("./node_modules/moment/moment.js");

var _moment2 = _interopRequireDefault(_moment);

var _momentRange = __webpack_require__("./node_modules/moment-range/dist/moment-range.js");

var _UserStore = __webpack_require__("./src/meveo/stores/UserStore.js");

var _UserStore2 = _interopRequireDefault(_UserStore);

var _PasswordStore = __webpack_require__("./src/meveo/stores/PasswordStore.js");

var _PasswordStore2 = _interopRequireDefault(_PasswordStore);

var _UserProfileAction = __webpack_require__("./src/meveo/actions/UserProfileAction.js");

var _LocalStorageService = __webpack_require__("./src/meveo/services/LocalStorageService.js");

var _LocalStorageService2 = _interopRequireDefault(_LocalStorageService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var moment = (0, _momentRange.extendMoment)(_moment2.default);

var ChangePassword = function (_Component) {
    (0, _inherits3.default)(ChangePassword, _Component);

    function ChangePassword(props) {
        (0, _classCallCheck3.default)(this, ChangePassword);

        var _this = (0, _possibleConstructorReturn3.default)(this, (ChangePassword.__proto__ || (0, _getPrototypeOf2.default)(ChangePassword)).call(this, props));

        _this.state = {
            status: '',
            isLoading: false,
            error: null,
            editMode: false,
            form: {
                email: "",
                username: "",
                currentPassword: "",
                newPassword: "",
                conFirmPassword: "",
                firstName: "",
                lastName: ""
            },
            formError: {
                status: false

            }
        };
        return _this;
    }

    (0, _createClass3.default)(ChangePassword, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            _UserStore2.default.bindUpdateHandler(this.userDetailOnUpdate.bind(this));
            _PasswordStore2.default.bindUpdateHandler(this.userChangePassword.bind(this));
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            _UserStore2.default.bindUpdateHandler(this.userDetailOnUpdate.bind(this));
            _PasswordStore2.default.bindUpdateHandler(this.userChangePassword.bind(this));
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var userName = _LocalStorageService2.default.getTokenParsed().preferred_username;
            (0, _UserProfileAction.userDetail)(userName);
        }
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
            return true;
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps() {}
    }, {
        key: 'editUserLoginInformation',
        value: function editUserLoginInformation(userData) {
            var parent = this.props.parent;

            parent.editUserBio(userData);
        }
    }, {
        key: 'validateDateFields',
        value: function validateDateFields() {

            var state = this.state;
            state['formError']["status"] = false;
            this.setState(state);
            return true;
        }
    }, {
        key: 'updateUserDetail',
        value: function updateUserDetail(event) {
            event.preventDefault();
            if (this.validateDateFields()) {
                var updateType = "form";
            }
        }
    }, {
        key: 'userDetailOnUpdate',
        value: function userDetailOnUpdate(response) {
            console.log("userProfile On Update");
            console.log(response);
            var result = response.result,
                message = response.message;

            if (message == "user_detail_success" || message == "user_profile_detail_success") {
                this.setState({
                    userInfo: result,
                    message: message
                });
            }
            this.state;
            this.setDataFormData();
        }
    }, {
        key: 'userChangePassword',
        value: function userChangePassword(response) {
            console.log(response);
            var message = response.message;

            if (message === "edit_password_success") {
                this.setState({
                    status: 'Changed password successfully'
                });
            }
            this.state;
            this.setDataFormData();
        }
    }, {
        key: 'setDataFormData',
        value: function setDataFormData() {
            var user = this.state.userInfo;
            if (user != null) {
                var state = this.state;
                state['form']['email'] = user.email;
                state['form']['username'] = user.username;
                state['form']['currentPassword'] = '';
                state['form']['newPassword'] = '';
                state['form']['confirmPassword'] = '';
                this.setState(state);
            }
        }
    }, {
        key: 'edit_password',
        value: function edit_password(event) {
            this.setState({
                status: 'Not success'
            });
            event.preventDefault();
            var form = this.state.form;

            var userData = {
                "currentPassword": form.currentPassword,
                "newPassword": form.newPassword,
                "confirmation": form.confirmPassword
            };
            (0, _UserProfileAction.editPassword)(userData);
        }
    }, {
        key: 'changeContent',
        value: function changeContent(name, e) {
            var state = this.state;
            state['form'][name] = e.target.value;
            this.setState(state);
        }
    }, {
        key: 'renderChangePassword',
        value: function renderChangePassword() {
            return _react2.default.createElement(
                'div',
                { className: 'row' },
                _react2.default.createElement(
                    'form',
                    { method: 'get', onSubmit: this.edit_password.bind(this) },
                    _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(
                            'div',
                            { className: 'form-style-8-0' },
                            _react2.default.createElement(
                                'h2',
                                null,
                                'LOGIN INFORMATION'
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'changePasswordEmail' },
                                _react2.default.createElement(
                                    'span',
                                    { className: 'labelEmail' },
                                    'Your email :\xA0',
                                    this.state.form.email,
                                    '\xA0'
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'changePasswordLogin' },
                                _react2.default.createElement(
                                    'span',
                                    { className: 'labelLogin' },
                                    'Your login :\xA0',
                                    this.state.form.username,
                                    '\xA0'
                                )
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(
                            'div',
                            { className: 'form-style-8' },
                            _react2.default.createElement(
                                'h2',
                                null,
                                'CHANGE YOUR PASSWORD'
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'form-change-password' },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'changeCurrentPassword' },
                                    ' Current Password'
                                ),
                                _react2.default.createElement('input', {
                                    value: this.state.form.currentPassword,
                                    type: 'password',
                                    className: 'field1',
                                    placeholder: '',
                                    onChange: this.changeContent.bind(this, "currentPassword")
                                }),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'changeNewPassword' },
                                    ' New Password'
                                ),
                                _react2.default.createElement('input', {
                                    value: this.state.form.newPassword,
                                    type: 'password',
                                    className: 'field2',
                                    placeholder: '',
                                    onChange: this.changeContent.bind(this, "newPassword")
                                }),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'changeFirmPassword' },
                                    ' Confirm new Password'
                                ),
                                _react2.default.createElement('input', {
                                    value: this.state.form.confirmPassword,
                                    type: 'password',
                                    className: 'field3',
                                    placeholder: '',
                                    onChange: this.changeContent.bind(this, "confirmPassword")
                                }),
                                this.state.status === 'Changed password successfully' ? _react2.default.createElement(
                                    'div',
                                    { className: 'change1' },
                                    this.state.status
                                ) : _react2.default.createElement(
                                    'div',
                                    { className: 'change2' },
                                    this.state.status
                                ),
                                _react2.default.createElement(
                                    'button',
                                    { type: 'submit' },
                                    'CHANGE PASSWORD'
                                )
                            )
                        )
                    )
                )
            );
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'container-fluid profile_manaty' },
                this.renderChangePassword()
            );
        }
    }]);
    return ChangePassword;
}(_react.Component);

module.exports = ChangePassword;

/***/ }),

/***/ "./src/meveo/pages/user/Mobile.jsx":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _getPrototypeOf = __webpack_require__("./node_modules/babel-runtime/core-js/object/get-prototype-of.js");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__("./node_modules/babel-runtime/helpers/createClass.js");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__("./node_modules/babel-runtime/helpers/possibleConstructorReturn.js");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__("./node_modules/babel-runtime/helpers/inherits.js");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__("./node_modules/react/react.js");

var _react2 = _interopRequireDefault(_react);

var _reactResponsiveModal = __webpack_require__("./node_modules/react-responsive-modal/lib/index.es.js");

var _reactResponsiveModal2 = _interopRequireDefault(_reactResponsiveModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
    fontFamily: "sans-serif",
    textAlign: "center"
};

var Mobile = function (_Component) {
    (0, _inherits3.default)(Mobile, _Component);

    function Mobile() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, Mobile);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Mobile.__proto__ || (0, _getPrototypeOf2.default)(Mobile)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            open: false
        }, _this.onOpenModal = function () {
            _this.setState({ open: true });
        }, _this.onCloseModal = function () {
            _this.setState({ open: false });
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(Mobile, [{
        key: "render",
        value: function render() {
            var open = this.state.open;

            return _react2.default.createElement(
                "div",
                { style: styles },
                _react2.default.createElement(
                    "h2",
                    null,
                    "react-responsive-modal"
                ),
                _react2.default.createElement(
                    "button",
                    { onClick: this.onOpenModal },
                    "Open modal"
                ),
                _react2.default.createElement(
                    _reactResponsiveModal2.default,
                    { open: open, onClose: this.onCloseModal, center: true },
                    _react2.default.createElement(
                        "h2",
                        null,
                        "Simple centered modal"
                    ),
                    _react2.default.createElement(
                        "p",
                        null,
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor quam."
                    )
                )
            );
        }
    }]);
    return Mobile;
}(_react.Component);

module.exports = Mobile;

/***/ }),

/***/ "./src/meveo/pages/user/SeeProfile.jsx":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _values = __webpack_require__("./node_modules/babel-runtime/core-js/object/values.js");

var _values2 = _interopRequireDefault(_values);

var _extends2 = __webpack_require__("./node_modules/babel-runtime/helpers/extends.js");

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = __webpack_require__("./node_modules/babel-runtime/core-js/object/get-prototype-of.js");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__("./node_modules/babel-runtime/helpers/createClass.js");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__("./node_modules/babel-runtime/helpers/possibleConstructorReturn.js");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__("./node_modules/babel-runtime/helpers/inherits.js");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__("./node_modules/react/react.js");

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__("./node_modules/react-dom/index.js");

var _reactDaterangePicker = __webpack_require__("./node_modules/react-daterange-picker/dist/DateRangePicker.js");

var _reactDaterangePicker2 = _interopRequireDefault(_reactDaterangePicker);

__webpack_require__("./node_modules/react-daterange-picker/dist/css/react-calendar.css");

var _moment = __webpack_require__("./node_modules/moment/moment.js");

var _moment2 = _interopRequireDefault(_moment);

var _momentRange = __webpack_require__("./node_modules/moment-range/dist/moment-range.js");

var _UserStore = __webpack_require__("./src/meveo/stores/UserStore.js");

var _UserStore2 = _interopRequireDefault(_UserStore);

var _UserProfileAction = __webpack_require__("./src/meveo/actions/UserProfileAction.js");

var _SeeProjects = __webpack_require__("./src/meveo/pages/user/SeeProjects.jsx");

var _SeeProjects2 = _interopRequireDefault(_SeeProjects);

var _reactStarRatingComponent = __webpack_require__("./node_modules/react-star-rating-component/index.js");

var _reactStarRatingComponent2 = _interopRequireDefault(_reactStarRatingComponent);

var _reactstrap = __webpack_require__("./node_modules/reactstrap/dist/reactstrap.es.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 1 creat moment and stateDefinitions for DateRangePicker
var moment = (0, _momentRange.extendMoment)(_moment2.default);
var stateDefinitions = {
    available: {
        color: null,
        label: "Available"
    },
    enquire: {
        color: "white",
        label: "Enquire"
    },
    unavailable: {
        selectable: false,
        color: "#78818b",
        label: "Unavailable"
    }
};

var Projects = function (_React$Component) {
    (0, _inherits3.default)(Projects, _React$Component);

    function Projects() {
        (0, _classCallCheck3.default)(this, Projects);
        return (0, _possibleConstructorReturn3.default)(this, (Projects.__proto__ || (0, _getPrototypeOf2.default)(Projects)).apply(this, arguments));
    }

    (0, _createClass3.default)(Projects, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                'span',
                null,
                this.props.projects.slice(0, this.props.itemsToShow).map(function (el, index) {
                    return _react2.default.createElement(
                        'span',
                        { key: index, className: 'project_profile' },
                        _react2.default.createElement(
                            'span',
                            { className: 'full_project' },
                            _react2.default.createElement(
                                'div',
                                { className: 'manaty_see_project', onClick: function onClick() {
                                        return _this2.props.viewProject(el.name);
                                    } },
                                el.name
                            ),
                            ' - ',
                            _react2.default.createElement(
                                'span',
                                { className: 'star_project' },
                                el.role
                            )
                        )
                    );
                })
            );
        }
    }]);
    return Projects;
}(_react2.default.Component);

var Skills = function (_React$Component2) {
    (0, _inherits3.default)(Skills, _React$Component2);

    function Skills() {
        (0, _classCallCheck3.default)(this, Skills);
        return (0, _possibleConstructorReturn3.default)(this, (Skills.__proto__ || (0, _getPrototypeOf2.default)(Skills)).apply(this, arguments));
    }

    (0, _createClass3.default)(Skills, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'container-fluid ' },
                _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                        'div',
                        { className: 'col-12' },
                        _react2.default.createElement(
                            'div',
                            { className: 'list-group d-flex flex-row flex-wrap' },
                            this.props.skills.slice(0, this.props.itemsToShowSkill).map(function (el, indeskill_profilex) {
                                return _react2.default.createElement(
                                    'li',
                                    { className: 'list-group-item w-50' },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'container-fluid ' },
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'row' },
                                            _react2.default.createElement(
                                                'div',
                                                { className: 'col-sm-7' },
                                                _react2.default.createElement(
                                                    'span',
                                                    { className: 'center_skill' },
                                                    el.name
                                                )
                                            ),
                                            _react2.default.createElement(
                                                'div',
                                                { className: 'col-sm-5' },
                                                _react2.default.createElement(
                                                    'span',
                                                    { className: 'star_skill' },
                                                    _react2.default.createElement(_reactStarRatingComponent2.default, {
                                                        name: 'rate1',
                                                        starCount: 5,
                                                        value: el.ratio,
                                                        starColor: "#ffff00",
                                                        emptyStarColor: "#c0c0c0"
                                                    })
                                                )
                                            )
                                        )
                                    )
                                );
                            })
                        )
                    )
                )
            );
        }
    }]);
    return Skills;
}(_react2.default.Component);

var UserProfileInfo = function (_Component) {
    (0, _inherits3.default)(UserProfileInfo, _Component);

    function UserProfileInfo(props) {
        (0, _classCallCheck3.default)(this, UserProfileInfo);

        var _this4 = (0, _possibleConstructorReturn3.default)(this, (UserProfileInfo.__proto__ || (0, _getPrototypeOf2.default)(UserProfileInfo)).call(this, props));

        _this4.state = {
            isLoading: false,
            error: null,
            editMode: false,
            form: {
                username: "",
                email: "",
                firstName: "",
                lastName: "",
                sinceDate: null,
                photo: "",
                job: "",
                skypeId: "",
                country: "",
                countryDisplay: "",
                linkedin: "",
                cv: "",
                bio: "",
                skills: [{ name: "", ratio: null }],
                projects: [{ name: "", role: "" }],
                availability: { hoursWork: null, infos: '', timeZone: '', vocations: [] },
                photoBase64: "",
                cvBase64: ""
            },
            userInfo: null,
            all_countries: { value: null, label: null },
            photo: '',
            filename: "",
            file: { name: '' },
            filenameCV: "",
            fileCV: { name: '' },
            imagePreviewUrl: '',
            formError: {
                status: false

            },
            message: "",
            vocations: [],
            itemsToShow: 9,
            itemsToShowSkill: 10,
            expanded: false,
            expandedSkill: false
        };
        _this4.getCountryByCode = _this4.getCountryByCode.bind(_this4);
        _this4.showMore = _this4.showMore.bind(_this4);
        _this4.showMoreSkill = _this4.showMoreSkill.bind(_this4);
        _this4.viewProject = _this4.viewProject.bind(_this4);
        return _this4;
    }

    (0, _createClass3.default)(UserProfileInfo, [{
        key: 'componentWillMount',
        value: function componentWillMount() {}
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {}
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.setDataFormData();
        }
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
            return true;
        }
    }, {
        key: 'setDataFormData',
        value: function setDataFormData() {
            var user = this.props.userInfo;
            if (user != null) {
                var state = this.state;
                state['form']['email'] = user.email;
                state['form']['name'] = user.name;
                state['form']['username'] = user.username;
                state['form']['lastName'] = user.lastName;
                state['form']['firstName'] = user.firstName;
                state['form']['sinceDate'] = user.sinceDate;
                state['form']['job'] = user.job;
                state['form']['skypeId'] = user.skypeId;
                state['form']['country'] = user.country;
                state['form']['countryDisplay'] = this.getCountryByCode(user.country);
                state['form']['linkedin'] = user.linkedin;
                state['form']['bio'] = user.bio;
                state['form']['skills'] = user.skills;
                state['form']['projects'] = user.projects;
                state['form']['availability'] = user.availability;
                state['cv'] = user.cv;
                state['photo'] = user.photo;
                state['photoBase64'] = user.photoBase64;
                state['cvBase64'] = user.cvBase64;
                this.setState(state);
            }
        }
    }, {
        key: 'downloadPDF',
        value: function downloadPDF() {
            var linkSource = "data:application/doc;base64," + this.state.cvBase64;
            var downloadLink = document.createElement("a");
            var fileName = this.state.cv;

            downloadLink.href = linkSource;
            downloadLink.download = fileName;
            downloadLink.click();
        }
    }, {
        key: 'getCountryByCode',
        value: function getCountryByCode(code) {
            if (code != null) {
                var all_countries = this.props.countryAll;
                var _country = all_countries.filter(function (c) {
                    return c.value.toLowerCase() == code.toLowerCase();
                });
                return _country[0].label;
            }
        }
    }, {
        key: 'showMore',
        value: function showMore() {
            this.state.itemsToShow === 9 ? this.setState({ itemsToShow: this.state.form.projects.length, expanded: true }) : this.setState({ itemsToShow: 9, expanded: false });
        }
    }, {
        key: 'showMoreSkill',
        value: function showMoreSkill() {
            this.state.itemsToShowSkill === 10 ? this.setState({ itemsToShowSkill: this.state.form.skills.length, expandedSkill: true }) : this.setState({ itemsToShowSkill: 10, expandedSkill: false });
        }
    }, {
        key: 'viewProject',
        value: function viewProject(name) {
            (0, _UserProfileAction.projectDetail)(name);
        }
    }, {
        key: 'renderViewProject',
        value: function renderViewProject() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_SeeProjects2.default, (0, _extends3.default)({ parent: this, users: this.props.users, backAllProjects: this.props.backAllProjects, resetFilter: this.resetFilter, projectSee: this.state.projectSee }, this.state, { baseData: this.props.baseData }, this.props))
            );
        }
    }, {
        key: 'renderUserProfileInfo',
        value: function renderUserProfileInfo() {
            //Calendar range
            var listOfObjects = [];
            var vocations = this.state.form.availability.vocations;
            var vocaDisplay = [];
            if (vocations != null) {
                vocaDisplay = vocations.filter(function (el) {
                    return moment(el.substring(0, 10), "DD/MM/YYYY").format("YYYY-MM-DD").toString() > moment().subtract(12, 'months').format("YYYY-MM-DD").toString();
                });
            }

            var listOfObjectsEX = [];
            if (this.state.form.availability.vocations != null) {
                vocaDisplay.map(function (entry) {
                    var singleObjEX = {};
                    singleObjEX["a"] = moment(moment(entry.substring(0, 10), 'DD/MM/YYYY')).format("YYYY-MM-DD");
                    if (entry.substring(13) != "") {
                        singleObjEX["b"] = moment(moment(entry.substring(13), 'DD/MM/YYYY')).format("YYYY-MM-DD");
                    } else {
                        singleObjEX["b"] = moment(moment(entry.substring(0, 10), 'DD/MM/YYYY')).format("YYYY-MM-DD");
                    }
                    listOfObjectsEX.push(singleObjEX);
                });
            }

            listOfObjectsEX.forEach(function (entry) {
                var singleObj = {};
                singleObj["state"] = "enquire";
                singleObj["range"] = moment.range((0, _values2.default)(entry));
                listOfObjects.push(singleObj);
            });
            return _react2.default.createElement(
                'div',
                { className: 'row' },
                _react2.default.createElement(
                    'div',
                    { className: 'profile_scoll', id: 'hidingScrollBar' },
                    _react2.default.createElement(
                        'div',
                        { className: 'hideScrollBar' },
                        _react2.default.createElement(
                            'div',
                            { className: 'col-xs-12 col-sm-12 col-md-12 col-lg-12 boder_header' },
                            _react2.default.createElement(
                                'span',
                                { className: 'name_header' },
                                _react2.default.createElement(
                                    'span',
                                    { onClick: this.props.backAllProfiles },
                                    _react2.default.createElement(
                                        'label',
                                        null,
                                        'TEAM'
                                    )
                                ),
                                ' > ',
                                this.state.form.name
                            ),
                            _react2.default.createElement(
                                'div',
                                { onClick: this.props.backAllProfiles },
                                _react2.default.createElement(
                                    'label',
                                    { className: 'back_profile' },
                                    _react2.default.createElement(
                                        'span',
                                        { className: 'name_back' },
                                        'Back to all profiles'
                                    ),
                                    _react2.default.createElement('span', { className: 'arrow_back' })
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'col-xs-4' },
                            _react2.default.createElement(
                                'section',
                                { className: 'profile_infomation' },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'image_pro' },
                                    _react2.default.createElement(
                                        'div',
                                        null,
                                        _react2.default.createElement('img', { className: 'image', src: "data:image/jpeg;base64," + this.state.photoBase64 })
                                    ),
                                    _react2.default.createElement(
                                        'span',
                                        { className: 'name_profile' },
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'user_name' },
                                            _react2.default.createElement(
                                                'span',
                                                { className: 'squa' },
                                                '['
                                            ),
                                            this.state.form.firstName + " " + this.state.form.lastName,
                                            '\xA0',
                                            _react2.default.createElement(
                                                'span',
                                                { className: 'squa' },
                                                ']'
                                            )
                                        ),
                                        _react2.default.createElement(
                                            'div',
                                            null,
                                            this.state.form.job,
                                            '\xA0'
                                        ),
                                        _react2.default.createElement(
                                            'div',
                                            null,
                                            this.state.form.countryDisplay,
                                            '\xA0'
                                        )
                                    ),
                                    _react2.default.createElement('div', { className: 'white_profile' })
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'since_date' },
                                    'Manaty member since: ',
                                    this.state.form.sinceDate,
                                    '\xA0'
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'infomation' },
                                    _react2.default.createElement('span', { className: 'mail' }),
                                    _react2.default.createElement(
                                        'span',
                                        { className: 'text_profile' },
                                        this.state.form.email,
                                        '\xA0'
                                    ),
                                    _react2.default.createElement('span', { className: 'skype' }),
                                    _react2.default.createElement(
                                        'span',
                                        { className: 'text_profile1' },
                                        this.state.form.skypeId,
                                        '\xA0'
                                    ),
                                    _react2.default.createElement('span', { className: 'linkedin' }),
                                    this.state.form.linkedin ? _react2.default.createElement(
                                        'a',
                                        { target: '_blank', href: this.state.form.linkedin, className: 'text_profile2' },
                                        this.state.form.linkedin,
                                        '\xA0'
                                    ) : '',
                                    _react2.default.createElement('span', { className: 'cv' }),
                                    ' ',
                                    this.state.cv ? _react2.default.createElement(
                                        'a',
                                        { onClick: this.downloadPDF.bind(this) },
                                        _react2.default.createElement(
                                            'span',
                                            { className: 'text_profile3' },
                                            this.state.cv
                                        )
                                    ) : '',
                                    _react2.default.createElement('div', { className: 'white_infomation' })
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'col-xs-8' },
                            _react2.default.createElement(
                                'table',
                                { className: 'table_profile' },
                                _react2.default.createElement(
                                    'tr',
                                    null,
                                    _react2.default.createElement(
                                        'td',
                                        { className: 'bio' },
                                        _react2.default.createElement(
                                            'div',
                                            null,
                                            _react2.default.createElement(
                                                'div',
                                                null,
                                                _react2.default.createElement(
                                                    'span',
                                                    { className: 'text_bio' },
                                                    'BIO'
                                                )
                                            ),
                                            _react2.default.createElement('span', { className: 'corner1' }),
                                            _react2.default.createElement(
                                                'div',
                                                { className: 'value_bio' },
                                                this.state.form.bio
                                            ),
                                            _react2.default.createElement('span', { className: 'corner2' })
                                        )
                                    )
                                ),
                                _react2.default.createElement(
                                    'tr',
                                    null,
                                    _react2.default.createElement('td', { className: 'space' })
                                ),
                                _react2.default.createElement(
                                    'tr',
                                    null,
                                    _react2.default.createElement(
                                        'td',
                                        { className: 'skill' },
                                        _react2.default.createElement(
                                            'div',
                                            null,
                                            _react2.default.createElement(
                                                'span',
                                                null,
                                                _react2.default.createElement(
                                                    'div',
                                                    null,
                                                    _react2.default.createElement(
                                                        'span',
                                                        { className: 'text_skill' },
                                                        'SKILLS'
                                                    )
                                                ),
                                                _react2.default.createElement(
                                                    'div',
                                                    { className: 'display_skill' },
                                                    _react2.default.createElement(Skills, { skills: this.state.form.skills, itemsToShowSkill: this.state.itemsToShowSkill })
                                                ),
                                                _react2.default.createElement(
                                                    'div',
                                                    { className: 'see_more', onClick: this.showMoreSkill },
                                                    this.state.expandedSkill ? _react2.default.createElement(
                                                        'div',
                                                        null,
                                                        'See less'
                                                    ) : _react2.default.createElement(
                                                        'div',
                                                        null,
                                                        'See more'
                                                    )
                                                ),
                                                _react2.default.createElement('span', { className: 'line1' }),
                                                _react2.default.createElement('span', { className: 'line2' })
                                            )
                                        )
                                    )
                                ),
                                _react2.default.createElement(
                                    'tr',
                                    null,
                                    _react2.default.createElement('td', { className: 'space' })
                                ),
                                _react2.default.createElement(
                                    'tr',
                                    null,
                                    _react2.default.createElement(
                                        'td',
                                        { className: 'project' },
                                        _react2.default.createElement(
                                            'div',
                                            null,
                                            _react2.default.createElement(
                                                'div',
                                                null,
                                                _react2.default.createElement(
                                                    'span',
                                                    { className: 'text_project' },
                                                    'MANATY PROJECTS'
                                                )
                                            ),
                                            _react2.default.createElement(
                                                'span',
                                                { className: 'display_project' },
                                                _react2.default.createElement(Projects, { projects: this.state.form.projects, itemsToShow: this.state.itemsToShow, viewProject: this.viewProject })
                                            ),
                                            _react2.default.createElement('br', null),
                                            _react2.default.createElement(
                                                'div',
                                                { className: 'see_more', onClick: this.showMore },
                                                this.state.expanded ? _react2.default.createElement(
                                                    'div',
                                                    null,
                                                    'See less'
                                                ) : _react2.default.createElement(
                                                    'div',
                                                    null,
                                                    'See more'
                                                )
                                            )
                                        )
                                    )
                                ),
                                _react2.default.createElement(
                                    'tr',
                                    null,
                                    _react2.default.createElement('td', { className: 'space' })
                                ),
                                _react2.default.createElement(
                                    'tr',
                                    null,
                                    _react2.default.createElement(
                                        'td',
                                        { className: 'availability' },
                                        _react2.default.createElement('div', { className: 'availability_inin' }),
                                        _react2.default.createElement(
                                            'span',
                                            { className: 'text_availability' },
                                            'AVAILABILITY'
                                        ),
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'availability_in' },
                                            '  '
                                        ),
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'hour' },
                                            _react2.default.createElement(
                                                'span',
                                                { className: 'hours_title' },
                                                'Number of working hours a week'
                                            ),
                                            _react2.default.createElement('br', null),
                                            _react2.default.createElement(
                                                'span',
                                                { className: 'hours_value' },
                                                this.state.form.availability.hoursWork,
                                                ' hrs'
                                            )
                                        ),
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'infos' },
                                            _react2.default.createElement(
                                                'span',
                                                { className: 'infos_title' },
                                                'Infos'
                                            ),
                                            _react2.default.createElement('br', null),
                                            _react2.default.createElement(
                                                'span',
                                                { className: 'infos_value' },
                                                this.state.form.availability.infos
                                            )
                                        ),
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'time' },
                                            _react2.default.createElement(
                                                'span',
                                                { className: 'time_title' },
                                                'Time zone (UTC)'
                                            ),
                                            _react2.default.createElement('br', null),
                                            _react2.default.createElement(
                                                'span',
                                                { className: 'time_value' },
                                                this.state.form.availability.timeZone
                                            )
                                        ),
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'calendar' },
                                            _react2.default.createElement(
                                                'div',
                                                { className: 'vacation' },
                                                _react2.default.createElement(
                                                    'span',
                                                    { className: 'vacation_title_pro' },
                                                    'Calendar :'
                                                ),
                                                _react2.default.createElement('br', null),
                                                _react2.default.createElement(
                                                    'span',
                                                    { className: 'calendar_profile' },
                                                    _react2.default.createElement(_reactDaterangePicker2.default, {
                                                        firstOfWeek: 1,
                                                        numberOfCalendars: 1,
                                                        selectionType: 'range',
                                                        stateDefinitions: stateDefinitions,
                                                        dateStates: listOfObjects,
                                                        defaultState: 'available'
                                                    })
                                                )
                                            )
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            );
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'container-fluid profile_manaty' },
                this.props.projectSee == null ? this.renderUserProfileInfo() : this.renderViewProject()
            );
        }
    }]);
    return UserProfileInfo;
}(_react.Component);

exports.default = UserProfileInfo;

/***/ }),

/***/ "./src/meveo/pages/user/SeeProjects.jsx":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = __webpack_require__("./node_modules/babel-runtime/helpers/extends.js");

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = __webpack_require__("./node_modules/babel-runtime/core-js/object/get-prototype-of.js");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__("./node_modules/babel-runtime/helpers/createClass.js");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__("./node_modules/babel-runtime/helpers/possibleConstructorReturn.js");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__("./node_modules/babel-runtime/helpers/inherits.js");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__("./node_modules/react/react.js");

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__("./node_modules/react-dom/index.js");

var _reactTable = __webpack_require__("./node_modules/react-table/es/index.js");

var _reactTable2 = _interopRequireDefault(_reactTable);

__webpack_require__("./node_modules/react-table/react-table.css");

var _ProjectPopupClient = __webpack_require__("./src/meveo/pages/elements/ProjectPopupClient.jsx");

var _ProjectPopupClient2 = _interopRequireDefault(_ProjectPopupClient);

var _ProjectPopupAssemblaLink = __webpack_require__("./src/meveo/pages/elements/ProjectPopupAssemblaLink.jsx");

var _ProjectPopupAssemblaLink2 = _interopRequireDefault(_ProjectPopupAssemblaLink);

var _ProjectPopupTeam = __webpack_require__("./src/meveo/pages/elements/ProjectPopupTeam.jsx");

var _ProjectPopupTeam2 = _interopRequireDefault(_ProjectPopupTeam);

var _SeeProfile = __webpack_require__("./src/meveo/pages/user/SeeProfile.jsx");

var _SeeProfile2 = _interopRequireDefault(_SeeProfile);

var _reactBootstrapTable = __webpack_require__("./node_modules/react-bootstrap-table/lib/index.js");

var _UserStore = __webpack_require__("./src/meveo/stores/UserStore.js");

var _UserStore2 = _interopRequireDefault(_UserStore);

var _UserProfileAction = __webpack_require__("./src/meveo/actions/UserProfileAction.js");

var _reactStarRatingComponent = __webpack_require__("./node_modules/react-star-rating-component/index.js");

var _reactStarRatingComponent2 = _interopRequireDefault(_reactStarRatingComponent);

var _reactstrap = __webpack_require__("./node_modules/reactstrap/dist/reactstrap.es.js");

var _moment = __webpack_require__("./node_modules/moment/moment.js");

var _moment2 = _interopRequireDefault(_moment);

var _momentRange = __webpack_require__("./node_modules/moment-range/dist/moment-range.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var moment = (0, _momentRange.extendMoment)(_moment2.default);

var Teams = function (_React$Component) {
    (0, _inherits3.default)(Teams, _React$Component);

    function Teams() {
        (0, _classCallCheck3.default)(this, Teams);
        return (0, _possibleConstructorReturn3.default)(this, (Teams.__proto__ || (0, _getPrototypeOf2.default)(Teams)).apply(this, arguments));
    }

    (0, _createClass3.default)(Teams, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                'div',
                null,
                this.props.teams.map(function (el, index) {
                    return _react2.default.createElement(
                        'div',
                        { key: index, className: 'project_team_list' },
                        _react2.default.createElement(
                            'span',
                            null,
                            _react2.default.createElement('img', { className: 'image_teams', src: "data:image/jpeg;base64," + el.photoBase64 })
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'in_pro' },
                            _react2.default.createElement(
                                'div',
                                { className: 'full_name' },
                                el.fullName
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'role_pro' },
                                el.role
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'btn_pro' },
                                _react2.default.createElement(
                                    'button',
                                    { className: 'btn_see_project', onClick: function onClick() {
                                            return _this2.props.viewProfile(el.name);
                                        } },
                                    'See profile'
                                )
                            )
                        )
                    );
                })
            );
        }
    }]);
    return Teams;
}(_react2.default.Component);

var Contact = function (_Component) {
    (0, _inherits3.default)(Contact, _Component);

    function Contact() {
        (0, _classCallCheck3.default)(this, Contact);
        return (0, _possibleConstructorReturn3.default)(this, (Contact.__proto__ || (0, _getPrototypeOf2.default)(Contact)).apply(this, arguments));
    }

    (0, _createClass3.default)(Contact, [{
        key: 'render',
        value: function render() {
            var data = this.props.projectSee.contacts;
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    _reactBootstrapTable.BootstrapTable,
                    { data: data },
                    _react2.default.createElement(
                        _reactBootstrapTable.TableHeaderColumn,
                        { isKey: true, dataField: 'name' },
                        'Name'
                    ),
                    _react2.default.createElement(
                        _reactBootstrapTable.TableHeaderColumn,
                        { dataField: 'position' },
                        'Position'
                    ),
                    _react2.default.createElement(
                        _reactBootstrapTable.TableHeaderColumn,
                        { dataField: 'mail' },
                        'Mail'
                    ),
                    _react2.default.createElement(
                        _reactBootstrapTable.TableHeaderColumn,
                        { dataField: 'skype' },
                        'Skype'
                    ),
                    _react2.default.createElement(
                        _reactBootstrapTable.TableHeaderColumn,
                        { dataField: 'tel' },
                        'Tel'
                    )
                )
            );
        }
    }]);
    return Contact;
}(_react.Component);

var SeeProjects = function (_Component2) {
    (0, _inherits3.default)(SeeProjects, _Component2);

    function SeeProjects(props) {
        (0, _classCallCheck3.default)(this, SeeProjects);

        var _this4 = (0, _possibleConstructorReturn3.default)(this, (SeeProjects.__proto__ || (0, _getPrototypeOf2.default)(SeeProjects)).call(this, props));

        _this4.state = {
            showPopupClient: false,
            showPopupAssembla: false,
            showPopupTeam: false,
            userInfo: null,
            file: { name: '' },
            imagePreviewUrl: '',
            uploadImage: false,
            teams: [{ name: '', role: '', fullName: '', photoBase64: '' }]
        };
        _this4.viewProfile = _this4.viewProfile.bind(_this4);
        return _this4;
    }

    (0, _createClass3.default)(SeeProjects, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            _UserStore2.default.bindUpdateHandler(this.userDetailOnUpdate.bind(this));
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            _UserStore2.default.bindUpdateHandler(this.userDetailOnUpdate.bind(this));
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.setDataFormData();
        }
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
            return true;
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps() {}
    }, {
        key: 'togglePopupClient',
        value: function togglePopupClient() {
            this.setState({
                showPopupClient: !this.state.showPopupClient
            });
        }
    }, {
        key: 'togglePopupClientDelay',
        value: function togglePopupClientDelay() {
            var _this5 = this;

            setTimeout(function () {
                _this5.setState({
                    showPopupClient: !_this5.state.showPopupClient,
                    uploadImage: !_this5.state.uploadImage
                });
            }, 500);
        }
    }, {
        key: 'togglePopupAssembla',
        value: function togglePopupAssembla() {
            this.setState({
                showPopupAssembla: !this.state.showPopupAssembla
            });
        }
    }, {
        key: 'togglePopupAssemblaDelay',
        value: function togglePopupAssemblaDelay() {
            var _this6 = this;

            setTimeout(function () {
                _this6.setState({
                    showPopupAssembla: !_this6.state.showPopupAssembla
                });
            }, 500);
        }
    }, {
        key: 'togglePopupTeam',
        value: function togglePopupTeam() {
            this.setState({
                showPopupTeam: !this.state.showPopupTeam
            });
        }
    }, {
        key: 'togglePopupTeamDelay',
        value: function togglePopupTeamDelay() {
            var _this7 = this;

            setTimeout(function () {
                _this7.setState({
                    showPopupTeam: !_this7.state.showPopupTeam
                });
            }, 500);
        }
    }, {
        key: 'renderProfilePopupClient',
        value: function renderProfilePopupClient() {
            return _react2.default.createElement(
                'div',
                { className: 'userpopup' },
                this.state.showPopupClient ? _react2.default.createElement(_ProjectPopupClient2.default, { parent: this, projectSee: this.props.projectSee,
                    closePopupClient: this.togglePopupClient.bind(this),
                    closePopupClientDelay: this.togglePopupClientDelay.bind(this)
                }) : null
            );
        }
    }, {
        key: 'renderProfilePopupAssemblaLink',
        value: function renderProfilePopupAssemblaLink() {
            return _react2.default.createElement(
                'div',
                { className: 'userpopup' },
                this.state.showPopupAssembla ? _react2.default.createElement(_ProjectPopupAssemblaLink2.default, { parent: this, projectSee: this.props.projectSee,
                    closePopupAssembla: this.togglePopupAssembla.bind(this),
                    closePopupAssemblaDelay: this.togglePopupAssemblaDelay.bind(this)
                }) : null
            );
        }
    }, {
        key: 'renderProfilePopupTeam',
        value: function renderProfilePopupTeam() {
            return _react2.default.createElement(
                'div',
                { className: 'userpopup' },
                this.state.showPopupTeam ? _react2.default.createElement(_ProjectPopupTeam2.default, { parent: this, projectSee: this.props.projectSee, users: this.props.users,
                    closePopupTeam: this.togglePopupTeam.bind(this),
                    closePopupTeamDelay: this.togglePopupTeamDelay.bind(this)
                }) : null
            );
        }
    }, {
        key: 'viewProfile',
        value: function viewProfile(username) {
            (0, _UserProfileAction.userDetail)(username);
        }
    }, {
        key: 'userDetailOnUpdate',
        value: function userDetailOnUpdate(response) {
            console.log("user On Update");
            console.log(response);
            var result = response.result,
                message = response.message;

            if (message == "user_profile_detail_success") {
                this.setState({
                    userInfo: result
                });
            }
            this.state;
        }
    }, {
        key: 'renderViewProfile',
        value: function renderViewProfile() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_SeeProfile2.default, (0, _extends3.default)({ parent: this, backAllProfiles: this.backAllProfiles, userInfo: this.state.userInfo }, this.state, { baseData: this.props.baseData }, this.props))
            );
        }
    }, {
        key: 'setDataFormData',
        value: function setDataFormData() {
            var projectSee = this.props.projectSee;

            if (projectSee != null) {
                var state = this.state;
                state['code'] = projectSee.code;
                state['logo'] = projectSee.logo;
                state['link'] = projectSee.link;
                state['contacts'] = projectSee.contacts;
                state['assemblaLink'] = projectSee.assemblaLink;
                state['teams'] = projectSee.teams;
                this.setState(state);
            }
        }

        //binding data from popupClient to SeeProject Page

    }, {
        key: 'handleData',
        value: function handleData(data) {
            this.setState({
                link: data
            });
        }
    }, {
        key: 'renderSeeProject',
        value: function renderSeeProject() {
            var dateEnd = moment(this.props.projectSee.dateEnd, "YYYY/MM/DD").format("MMMM-YYYY").toString();
            var dateStart = moment(this.props.projectSee.dateStart, "YYYY/MM/DD").format("MMMM-YYYY").toString();
            if (dateStart === 'Invalid date') {
                dateStart = 'Ongoing';
            }
            if (dateEnd === 'Invalid date') {
                dateEnd = 'Ongoing';
            }
            var photo64 = this.props.projectSee.logoBase64;
            if (photo64 != null) {
                var photoDisplay = photo64;
            } else {
                var photoDisplay = '/9j/4QDCRXhpZgAASUkqAAgAAAAHABIBAwABAAAAAQAAABoBBQABAAAAYgAAABsBBQABAAAAagAAACgBAwABAAAAAgAAADEBAgAOAAAAcgAAADIBAgAUAAAAgAAAAGmHBAABAAAAlAAAAAAAAAAsAQAAAQAAACwBAAABAAAAUGhvdG9GaWx0cmUgNwAyMDE5OjAzOjEyIDE3OjM3OjI5AAMAAJAHAAQAAAAwMjEwAqADAAEAAAD0AQAAA6ADAAEAAAD0AQAA/9sAQwADAgIDAgIDAwMDBAMDBAUIBQUEBAUKBwcGCAwKDAwLCgsLDQ4SEA0OEQ4LCxAWEBETFBUVFQwPFxgWFBgSFBUU/9sAQwEDBAQFBAUJBQUJFA0LDRQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQU/8AAEQgB9AH0AwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8AxKKKK+4P5UCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooq5pOj3+vahFYaZZXOo30ufLtrSJpZXwCxwqgk4AJ+gNGxSTk0krtlOivoTwZ+xT4212VX12ey8M2odkdXkF1cYC5DKkZ2EFjjmRSME46Z9b8O/sOeD7CKzfV9X1XVrqJ98yxMlvbzgNkLsCs6grgHEmepBXjHDPG0Ifav6H1GG4ZzTEq6pcq/vafhv+B8QUV+iX/DJ/wAK/wDoVv8AyoXX/wAdo/4ZP+Ff/Qrf+VC6/wDjtYf2lS7P8P8AM9b/AFJzH+eH3y/+RPztor7w8U/sV+Ata8yTSn1Hw9N5BjjS3uPOhEnOJHWUM7ckZUOoIXjBya8e8Z/sQeK9Giabw9qll4jjVFJgcfZLhnLYIVWLJgDDZMg7jGQM7QxtCfW3qeZiuFs0wyb9nzpfyu/4aP8AA+cKK1/FPhHWfBOrSaZrumXOl3yZPlXCFd6hiu5D0dSVYBlJU44JrIruTTV0fKzhKnJxmrNdGFFFFMgKKKKACiiigAooooAKKKKACiiigAoo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mOTwxpRcEXUUxF9KFZiPnUgRhhsJVcnKkbypIPz3RRXVTpQpLlgrHgY3H4nMKntcTNyf4L0WyCiiitTzwooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/9k=';
            }
            return _react2.default.createElement(
                'div',
                { className: 'row' },
                _react2.default.createElement(
                    'div',
                    { className: 'project_scoll', id: 'hidingScrollBar' },
                    _react2.default.createElement(
                        'div',
                        { className: 'hideScrollBar' },
                        _react2.default.createElement(
                            'div',
                            { className: 'col-xs-12 col-sm-12 col-md-12 col-lg-12 boder_header_pro' },
                            _react2.default.createElement(
                                'span',
                                { className: 'name_header' },
                                _react2.default.createElement(
                                    'span',
                                    { onClick: this.props.backAllProjects },
                                    _react2.default.createElement(
                                        'label',
                                        null,
                                        'PROJECTS'
                                    )
                                ),
                                ' > ',
                                this.props.projectSee.code
                            ),
                            _react2.default.createElement(
                                'div',
                                { onClick: this.props.backAllProjects },
                                _react2.default.createElement(
                                    'label',
                                    { className: 'back_profile' },
                                    _react2.default.createElement(
                                        'span',
                                        { className: 'name_back' },
                                        'Back to all projects'
                                    ),
                                    _react2.default.createElement('span', { className: 'arrow_back' })
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'col-xs-12 col-sm-12 col-md-12 col-lg-12 pro_page' },
                            _react2.default.createElement(
                                'div',
                                { className: 'header_project' },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'name_pro' },
                                    _react2.default.createElement(
                                        'div',
                                        null,
                                        this.props.projectSee.name,
                                        '\xA0'
                                    )
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'des_pro' },
                                    this.props.projectSee.shortDescription
                                ),
                                _react2.default.createElement('img', { src: 'images/icon/calendar.png', className: 'date_pro' }),
                                _react2.default.createElement(
                                    'span',
                                    { className: 'start_pro' },
                                    dateStart,
                                    '\xA0'
                                ),
                                _react2.default.createElement('br', null),
                                _react2.default.createElement(
                                    'span',
                                    { className: 'end_pro' },
                                    'to ',
                                    dateEnd,
                                    '\xA0'
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'body_project' },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'body_left ' },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'pro_detail' },
                                        'PROJECT DETAILS'
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        null,
                                        _react2.default.createElement('img', { onClick: this.togglePopupClient.bind(this), src: 'images/icon/edit.png', className: 'abso1' })
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'in_see' },
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'left_pro' },
                                            _react2.default.createElement(
                                                'div',
                                                null,
                                                _react2.default.createElement('img', { className: 'image_project', src: "data:image/jpeg;base64," + photoDisplay })
                                            )
                                        ),
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'client_see' },
                                            'Client : ',
                                            this.props.projectSee.client,
                                            '\xA0'
                                        ),
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'short_pro' },
                                            this.props.projectSee.description,
                                            '\xA0'
                                        ),
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'link_see_out' },
                                            'Link : ',
                                            this.props.projectSee.link ? _react2.default.createElement(
                                                'a',
                                                { target: '_blank', href: this.props.projectSee.link, className: 'link_see' },
                                                this.props.projectSee.link,
                                                '\xA0'
                                            ) : ''
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'contact' },
                                        'CONTACT'
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'contact_pro' },
                                        _react2.default.createElement(Contact, { projectSee: this.props.projectSee })
                                    )
                                ),
                                _react2.default.createElement('div', { className: 'body_center' }),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'body_right' },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'team_see' },
                                        'MANATY TEAM'
                                    ),
                                    _react2.default.createElement(Teams, { teams: this.props.projectSee.teams, viewProfile: this.viewProfile }),
                                    _react2.default.createElement('img', { onClick: this.togglePopupTeam.bind(this), src: 'images/icon/edit.png', className: 'abso1' })
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'footer_project' },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'header_see' },
                                    _react2.default.createElement(
                                        'span',
                                        { className: 'as_pro' },
                                        'Assembla link of the project :'
                                    ),
                                    _react2.default.createElement(
                                        'span',
                                        { className: 'link_pro' },
                                        this.props.projectSee.assemblaLink ? _react2.default.createElement(
                                            'a',
                                            { target: '_blank', href: this.props.projectSee.assemblaLink },
                                            this.props.projectSee.assemblaLink,
                                            '\xA0'
                                        ) : ''
                                    )
                                ),
                                _react2.default.createElement('img', { onClick: this.togglePopupAssembla.bind(this), src: 'images/icon/edit.png', className: 'abso1' })
                            )
                        ),
                        this.state.showPopupClient == true || this.state.showPopupAssembla == true || this.state.showPopupTeam == true ? _react2.default.createElement('div', { id: 'page-mask' }) : null
                    )
                )
            );
        }
    }, {
        key: 'render',
        value: function render() {

            return _react2.default.createElement(
                'div',
                { className: 'container-fluid see_project' },
                this.state.userInfo == null ? this.renderSeeProject() : this.renderViewProfile(),
                this.renderProfilePopupClient(),
                this.renderProfilePopupAssemblaLink(),
                this.renderProfilePopupTeam()
            );
        }
    }]);
    return SeeProjects;
}(_react.Component);

exports.default = SeeProjects;

/***/ }),

/***/ "./src/meveo/pages/user/UserProfile.jsx":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends2 = __webpack_require__("./node_modules/babel-runtime/helpers/extends.js");

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = __webpack_require__("./node_modules/babel-runtime/core-js/object/get-prototype-of.js");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__("./node_modules/babel-runtime/helpers/createClass.js");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__("./node_modules/babel-runtime/helpers/possibleConstructorReturn.js");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__("./node_modules/babel-runtime/helpers/inherits.js");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__("./node_modules/react/react.js");

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = __webpack_require__("./node_modules/react-bootstrap/es/index.js");

__webpack_require__("./node_modules/react-responsive-tabs/styles.css");

var _UserProfileInfo = __webpack_require__("./src/meveo/pages/user/UserProfileInfo.jsx");

var _UserProfileInfo2 = _interopRequireDefault(_UserProfileInfo);

var _DataStore = __webpack_require__("./src/meveo/stores/DataStore.js");

var _DataStore2 = _interopRequireDefault(_DataStore);

var _UserStore = __webpack_require__("./src/meveo/stores/UserStore.js");

var _UserStore2 = _interopRequireDefault(_UserStore);

var _AllStore = __webpack_require__("./src/meveo/stores/AllStore.js");

var _AllStore2 = _interopRequireDefault(_AllStore);

var _AllProjectStore = __webpack_require__("./src/meveo/stores/AllProjectStore.js");

var _AllProjectStore2 = _interopRequireDefault(_AllProjectStore);

var _ProjectStore = __webpack_require__("./src/meveo/stores/ProjectStore.js");

var _ProjectStore2 = _interopRequireDefault(_ProjectStore);

var _reactSelectCountryList = __webpack_require__("./node_modules/react-select-country-list/country-list.js");

var _reactSelectCountryList2 = _interopRequireDefault(_reactSelectCountryList);

var _DataActions = __webpack_require__("./src/meveo/actions/DataActions.js");

var _UserProfileAction = __webpack_require__("./src/meveo/actions/UserProfileAction.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserProfile = function (_Component) {
	(0, _inherits3.default)(UserProfile, _Component);

	function UserProfile() {
		(0, _classCallCheck3.default)(this, UserProfile);

		var _this = (0, _possibleConstructorReturn3.default)(this, (UserProfile.__proto__ || (0, _getPrototypeOf2.default)(UserProfile)).call(this));

		_this.options = (0, _reactSelectCountryList2.default)().getData();
		_this.state = {
			options: _this.options,
			isLoading: false,
			dataLoading: false,
			baseData: {
				user_countries: null,
				all_countries: null
			},
			error: null,
			statusUser: '',
			userInfo: null
		};
		_this.backAllProfiles = _this.backAllProfiles.bind(_this);
		_this.backAllProjects = _this.backAllProjects.bind(_this);
		return _this;
	}

	(0, _createClass3.default)(UserProfile, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			_DataStore2.default.bindLoadHandler(this.renderDataLoader.bind(this));
			_DataStore2.default.bindUpdateHandler(this.dataOnUpdate.bind(this));
			_DataStore2.default.bindErrorHandler(this.renderError.bind(this));
			_AllStore2.default.bindUpdateHandler(this.allUserDetail.bind(this));
			_UserStore2.default.bindUpdateHandler(this.userDetailOnUpdate.bind(this));
			_AllProjectStore2.default.bindUpdateHandler(this.projectDetailOnUpdate.bind(this));
			_ProjectStore2.default.bindUpdateHandler(this.projectSeeDetailOnUpdate.bind(this));
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			_DataStore2.default.unbindLoadHandler(this.renderDataLoader.bind(this));
			_DataStore2.default.unbindUpdateHandler(this.dataOnUpdate.bind(this));
			_DataStore2.default.unbindErrorHandler(this.renderError.bind(this));
			_AllStore2.default.bindUpdateHandler(this.allUserDetail.bind(this));
			_UserStore2.default.bindUpdateHandler(this.userDetailOnUpdate.bind(this));
			_AllProjectStore2.default.bindUpdateHandler(this.projectDetailOnUpdate.bind(this));
			_ProjectStore2.default.unbindUpdateHandler(this.projectSeeDetailOnUpdate.bind(this));
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			(0, _DataActions.getCountries)(false);
			(0, _UserProfileAction.getAllUsers)();
			(0, _UserProfileAction.getAllProject)();
		}
	}, {
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate() {
			this.state.message == 'upload_image_success';
			return true;
		}
	}, {
		key: 'allUserDetail',
		value: function allUserDetail(response) {
			console.log("user On Update");
			console.log(response);
			var result = response.result,
			    message = response.message;

			if (message == "users_detail_success") {
				this.setState({
					users: result
				});
			}
			this.state;
		}
	}, {
		key: 'userDetailOnUpdate',
		value: function userDetailOnUpdate(response) {
			console.log("userProfile On Update");
			console.log(response);
			var result = response.result,
			    message = response.message;

			if (message == "user_detail_success" || message == "user_profile_detail_success") {
				this.setState({
					userInfo: result,
					message: message
				});
			}
			this.state;
		}
	}, {
		key: 'projectDetailOnUpdate',
		value: function projectDetailOnUpdate(response) {
			console.log("Project On Update");
			console.log(response);
			var result = response.result,
			    message = response.message;

			if (message == "projects_detail_success") {
				this.setState({
					projectInfo: result
				});
			}
			this.state;
		}
	}, {
		key: 'projectSeeDetailOnUpdate',
		value: function projectSeeDetailOnUpdate(response) {
			console.log("See Project On Update");
			console.log(response);
			var result = response.result,
			    message = response.message;

			if (message == "project_detail_success") {
				this.setState({
					projectSee: result
				});
			}
			this.state;
		}

		// LOADERS

	}, {
		key: 'renderLoader',
		value: function renderLoader() {
			this.setState({
				isLoading: true,
				error: null
			});
		}
	}, {
		key: 'renderDataLoader',
		value: function renderDataLoader() {
			this.setState({
				dataLoading: true,
				error: null
			});
		}
	}, {
		key: 'editUserBio',
		value: function editUserBio(userData) {
			(0, _UserProfileAction.editBioUser)(userData);
		}

		// ERROR

	}, {
		key: 'renderError',
		value: function renderError(error) {
			this.setState({
				isLoading: false,
				dataLoading: false,
				error: error
			});
		}

		// ON UPDATE

	}, {
		key: 'dataOnUpdate',
		value: function dataOnUpdate(response) {
			var result = response.result;


			if (response.message == "user_countries_list_success") {
				var countries_list = [];
				if (response.result != null) {
					response.result.map(function (val) {
						countries_list.push({ value: val.countryCode, label: val.countryName });
					});
				}
				var state = this.state;
				state['baseData']['user_countries'] = countries_list;
				state['dataLoading'] = false;
				this.setState(state);
			}

			if (response.message == "all_countries_list_success") {
				var countries_list = [];
				if (response.result != null) {
					response.result.map(function (val) {
						countries_list.push({ value: val.countryCode, label: val.countryName });
					});
				}
				// Sort countries list
				countries_list.sort(function (a, b) {
					if (a.label == null) {
						return -1;
					}
					if (b.label == null) {
						return 1;
					}
					var descA = a.label.toUpperCase();
					var descB = b.label.toUpperCase();
					if (descA < descB) {
						return -1;
					}
					if (descA > descB) {
						return 1;
					}
					return 0;
				});

				var state = this.state;
				state['baseData']['all_countries'] = countries_list;
				state['dataLoading'] = false;
				this.setState(state);
			}
		}
	}, {
		key: 'backAllProfiles',
		value: function backAllProfiles() {
			this.setState(function (props) {
				return {
					userInfo: null
				};
			});
		}
	}, {
		key: 'backAllProjects',
		value: function backAllProjects() {
			this.setState(function (props) {
				return {
					projectSee: null
				};
			});
		}
	}, {
		key: 'renderUserProfileMain',
		value: function renderUserProfileMain() {
			return _react2.default.createElement(_UserProfileInfo2.default, (0, _extends3.default)({ parent: this, userInfo: this.state.userInfo, statusUser: this.state.statusUser }, this.state, { baseData: this.state.baseData, projectSee: this.state.projectSee, projectInfo: this.state.projectInfo, countryAll: this.state.options }));
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				null,
				this.renderUserProfileMain()
			);
		}
	}]);
	return UserProfile;
}(_react.Component);

module.exports = UserProfile;

/***/ }),

/***/ "./src/meveo/pages/user/UserProfileInfo.jsx":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = __webpack_require__("./node_modules/babel-runtime/core-js/object/get-prototype-of.js");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__("./node_modules/babel-runtime/helpers/createClass.js");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__("./node_modules/babel-runtime/helpers/possibleConstructorReturn.js");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__("./node_modules/babel-runtime/helpers/inherits.js");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__("./node_modules/react/react.js");

var _react2 = _interopRequireDefault(_react);

var _moment = __webpack_require__("./node_modules/moment/moment.js");

var _moment2 = _interopRequireDefault(_moment);

var _momentRange = __webpack_require__("./node_modules/moment-range/dist/moment-range.js");

var _UserStore = __webpack_require__("./src/meveo/stores/UserStore.js");

var _UserStore2 = _interopRequireDefault(_UserStore);

var _UserProfileAction = __webpack_require__("./src/meveo/actions/UserProfileAction.js");

var _UserPopup = __webpack_require__("./src/meveo/pages/elements/UserPopup.jsx");

var _UserPopup2 = _interopRequireDefault(_UserPopup);

var _UserPopupBio = __webpack_require__("./src/meveo/pages/elements/UserPopupBio.jsx");

var _UserPopupBio2 = _interopRequireDefault(_UserPopupBio);

var _UserPopupAvailability = __webpack_require__("./src/meveo/pages/elements/UserPopupAvailability.jsx");

var _UserPopupAvailability2 = _interopRequireDefault(_UserPopupAvailability);

var _UserPopupSkills = __webpack_require__("./src/meveo/pages/elements/UserPopupSkills.jsx");

var _UserPopupSkills2 = _interopRequireDefault(_UserPopupSkills);

var _UserPopupProjects = __webpack_require__("./src/meveo/pages/elements/UserPopupProjects.jsx");

var _UserPopupProjects2 = _interopRequireDefault(_UserPopupProjects);

var _UserPopupEducations = __webpack_require__("./src/meveo/pages/elements/UserPopupEducations.jsx");

var _UserPopupEducations2 = _interopRequireDefault(_UserPopupEducations);

var _UserPopupCourses = __webpack_require__("./src/meveo/pages/elements/UserPopupCourses.jsx");

var _UserPopupCourses2 = _interopRequireDefault(_UserPopupCourses);

var _ProjectPopupImage = __webpack_require__("./src/meveo/pages/elements/ProjectPopupImage.jsx");

var _ProjectPopupImage2 = _interopRequireDefault(_ProjectPopupImage);

var _LocalStorageService = __webpack_require__("./src/meveo/services/LocalStorageService.js");

var _LocalStorageService2 = _interopRequireDefault(_LocalStorageService);

var _reactStarRatingComponent = __webpack_require__("./node_modules/react-star-rating-component/index.js");

var _reactStarRatingComponent2 = _interopRequireDefault(_reactStarRatingComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var moment = (0, _momentRange.extendMoment)(_moment2.default);

var Vocations = function (_React$Component) {
    (0, _inherits3.default)(Vocations, _React$Component);

    function Vocations() {
        (0, _classCallCheck3.default)(this, Vocations);
        return (0, _possibleConstructorReturn3.default)(this, (Vocations.__proto__ || (0, _getPrototypeOf2.default)(Vocations)).apply(this, arguments));
    }

    (0, _createClass3.default)(Vocations, [{
        key: "render",
        value: function render() {
            var vocas = [];
            if (this.props.vocations) {
                vocas = this.props.vocations;
            }
            var vocaDisplay = [];
            if (vocas != null) {
                vocaDisplay = vocas.filter(function (el) {
                    return moment(el.substring(0, 10), "DD/MM/YYYY").format("YYYY-MM-DD").toString() > moment().subtract(12, 'months').format("YYYY-MM-DD").toString();
                });
            }
            var vocationDisplay = vocaDisplay.map(function (e, index) {
                return e;
            }).join(" ; ");
            return _react2.default.createElement(
                "div",
                { className: "li_vocation" },
                vocationDisplay
            );
        }
    }]);
    return Vocations;
}(_react2.default.Component);

var Projects = function (_React$Component2) {
    (0, _inherits3.default)(Projects, _React$Component2);

    function Projects() {
        (0, _classCallCheck3.default)(this, Projects);
        return (0, _possibleConstructorReturn3.default)(this, (Projects.__proto__ || (0, _getPrototypeOf2.default)(Projects)).apply(this, arguments));
    }

    (0, _createClass3.default)(Projects, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "span",
                null,
                this.props.projects.slice(0, this.props.itemsToShow).map(function (el, index) {
                    return _react2.default.createElement(
                        "span",
                        { key: index, className: "project_profile" },
                        _react2.default.createElement(
                            "span",
                            { className: "full_project" },
                            _react2.default.createElement(
                                "span",
                                { className: "center_project" },
                                el.name
                            ),
                            " - ",
                            _react2.default.createElement(
                                "span",
                                {
                                    className: "star_project" },
                                el.role
                            )
                        )
                    );
                })
            );
        }
    }]);
    return Projects;
}(_react2.default.Component);

var Educations = function (_React$Component3) {
    (0, _inherits3.default)(Educations, _React$Component3);

    function Educations() {
        (0, _classCallCheck3.default)(this, Educations);
        return (0, _possibleConstructorReturn3.default)(this, (Educations.__proto__ || (0, _getPrototypeOf2.default)(Educations)).apply(this, arguments));
    }

    (0, _createClass3.default)(Educations, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "span",
                null,
                this.props.educations.slice(0, this.props.itemsToShow).map(function (el, index) {
                    return _react2.default.createElement(
                        "span",
                        { key: index, className: "degree_profile" },
                        _react2.default.createElement(
                            "div",
                            { className: "degree" },
                            _react2.default.createElement(
                                "span",
                                { className: "degree_title" },
                                el.title
                            ),
                            _react2.default.createElement("br", null)
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "degree1" },
                            _react2.default.createElement(
                                "span",
                                { className: "degree1_title" },
                                " ",
                                el.university,
                                " - ",
                                el.years,
                                " "
                            ),
                            _react2.default.createElement("br", null)
                        )
                    );
                })
            );
        }
    }]);
    return Educations;
}(_react2.default.Component);

var Courses = function (_React$Component4) {
    (0, _inherits3.default)(Courses, _React$Component4);

    function Courses() {
        (0, _classCallCheck3.default)(this, Courses);
        return (0, _possibleConstructorReturn3.default)(this, (Courses.__proto__ || (0, _getPrototypeOf2.default)(Courses)).apply(this, arguments));
    }

    (0, _createClass3.default)(Courses, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "span",
                null,
                this.props.courses.slice(0, this.props.itemsToShow).map(function (el, index) {
                    return _react2.default.createElement(
                        "span",
                        { key: index, className: "course_profile" },
                        _react2.default.createElement(
                            "div",
                            { className: "course" },
                            _react2.default.createElement(
                                "span",
                                { className: "course_title" },
                                el.title
                            ),
                            _react2.default.createElement("br", null)
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "course1" },
                            _react2.default.createElement(
                                "span",
                                { className: "course1_title" },
                                " -",
                                el.years,
                                " "
                            ),
                            _react2.default.createElement("br", null)
                        )
                    );
                })
            );
        }
    }]);
    return Courses;
}(_react2.default.Component);

var Skills = function (_React$Component5) {
    (0, _inherits3.default)(Skills, _React$Component5);

    function Skills() {
        (0, _classCallCheck3.default)(this, Skills);
        return (0, _possibleConstructorReturn3.default)(this, (Skills.__proto__ || (0, _getPrototypeOf2.default)(Skills)).apply(this, arguments));
    }

    (0, _createClass3.default)(Skills, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "container-fluid " },
                _react2.default.createElement(
                    "div",
                    { className: "row" },
                    _react2.default.createElement(
                        "div",
                        { className: "col-12" },
                        _react2.default.createElement(
                            "div",
                            { className: "list-group d-flex flex-row flex-wrap" },
                            this.props.skills.slice(0, this.props.itemsToShowSkill).map(function (el, indeskill_profilex) {
                                return _react2.default.createElement(
                                    "li",
                                    { className: "list-group-item w-50" },
                                    _react2.default.createElement(
                                        "div",
                                        { className: "container-fluid " },
                                        _react2.default.createElement(
                                            "div",
                                            { className: "row" },
                                            _react2.default.createElement(
                                                "div",
                                                { className: "col-sm-7" },
                                                _react2.default.createElement(
                                                    "span",
                                                    { className: "center_skill" },
                                                    el.name
                                                )
                                            ),
                                            _react2.default.createElement(
                                                "div",
                                                { className: "col-sm-5" },
                                                _react2.default.createElement(
                                                    "span",
                                                    { className: "star_skill" },
                                                    _react2.default.createElement(_reactStarRatingComponent2.default, {
                                                        name: "rate1",
                                                        starCount: 5,
                                                        value: el.ratio,
                                                        starColor: "#ffff00",
                                                        emptyStarColor: "#c0c0c0"
                                                    })
                                                )
                                            )
                                        )
                                    )
                                );
                            })
                        )
                    )
                )
            );
        }
    }]);
    return Skills;
}(_react2.default.Component);

var UserProfileInfo = function (_Component) {
    (0, _inherits3.default)(UserProfileInfo, _Component);

    function UserProfileInfo(props) {
        (0, _classCallCheck3.default)(this, UserProfileInfo);

        var _this6 = (0, _possibleConstructorReturn3.default)(this, (UserProfileInfo.__proto__ || (0, _getPrototypeOf2.default)(UserProfileInfo)).call(this, props));

        _this6.state = {
            showPopup: false,
            showPopupBio: false,
            showPopupAvailability: false,
            showPopupProjects: false,
            showPopupSkills: false,
            showPopupImage: false,
            isLoading: false,
            error: null,
            editMode: false,
            form: {
                username: "",
                email: "",
                firstName: "",
                lastName: "",
                sinceDate: null,
                photo: "",
                job: "",
                skypeId: "",
                country: "",
                countryDisplay: "",
                linkedin: "",
                cv: "",
                bio: "",
                skills: [{ name: "", ratio: null }],
                projects: [{ name: "", role: "" }],
                educations: [],
                courses: [],
                availability: { hoursWork: null, infos: '', timeZone: '', vocations: [] },
                photoBase64: "",
                cvBase64: ""
            },
            userInfo: null,
            all_countries: { value: null, label: null },
            photo: '',
            filename: "",
            file: { name: '' },
            filenameCV: "",
            fileCV: { name: '' },
            imagePreviewUrl: '',
            formError: {
                status: false

            },
            message: "",
            vocations: [],
            itemsToShow: 9,
            itemsToShowSkill: 10,
            expanded: false,
            expandedSkill: false
        };
        _this6.getCountryByCode = _this6.getCountryByCode.bind(_this6);
        _this6.showMore = _this6.showMore.bind(_this6);
        _this6.showMoreSkill = _this6.showMoreSkill.bind(_this6);
        return _this6;
    }

    (0, _createClass3.default)(UserProfileInfo, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            _UserStore2.default.bindUpdateHandler(this.userDetailOnUpdate.bind(this));
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            _UserStore2.default.bindUpdateHandler(this.userDetailOnUpdate.bind(this));
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            var userName = _LocalStorageService2.default.getTokenParsed().preferred_username;
            (0, _UserProfileAction.userDetail)(userName);
            this.setDataFormData();
        }
    }, {
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(nextProps, nextState) {
            return true;
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps() {}
    }, {
        key: "editUserBio",
        value: function editUserBio(userData) {
            var parent = this.props.parent;

            parent.editUserBio(userData);
        }
    }, {
        key: "validateDateFields",
        value: function validateDateFields() {

            var state = this.state;
            state['formError']["status"] = false;
            this.setState(state);
            return true;
        }
    }, {
        key: "updateUserDetail",
        value: function updateUserDetail(event) {
            event.preventDefault();
            if (this.validateDateFields()) {
                var updateType = "form";
            }
        }
    }, {
        key: "userDetailOnUpdate",
        value: function userDetailOnUpdate(response) {
            console.log("user On Update");
            console.log(response);
            var result = response.result,
                message = response.message;

            if (message == "upload_image_success ") {
                this.setState({
                    userInfo: result,
                    message: message
                });
            }

            this.state;
            this.setDataFormData();
        }
    }, {
        key: "setDataFormData",
        value: function setDataFormData() {
            var user = this.props.userInfo;
            if (user != null) {
                var state = this.state;
                state['form']['email'] = user.email;
                state['form']['username'] = user.username;
                state['form']['lastName'] = user.lastName;
                state['form']['firstName'] = user.firstName;
                state['form']['sinceDate'] = user.sinceDate;
                state['form']['job'] = user.job;
                state['form']['skypeId'] = user.skypeId;
                state['form']['country'] = user.country;
                state['form']['countryDisplay'] = this.getCountryByCode(user.country);
                state['form']['linkedin'] = user.linkedin;
                state['form']['bio'] = user.bio;
                state['form']['skills'] = user.skills;
                state['form']['projects'] = user.projects;
                state['form']['availability'] = user.availability;
                state['form']['courses'] = user.courses | [];
                state['form']['educations'] = user.educations | [];
                state['cv'] = user.cv;
                state['photo'] = user.photo;
                state['photoBase64'] = user.photoBase64;
                state['cvBase64'] = user.cvBase64;
                this.setState(state);
            }
        }
    }, {
        key: "togglePopup",
        value: function togglePopup() {
            this.setState({
                showPopup: !this.state.showPopup
            });
        }
    }, {
        key: "togglePopupBio",
        value: function togglePopupBio() {
            this.setState({
                showPopupBio: !this.state.showPopupBio
            });
        }
    }, {
        key: "togglePopupAvailability",
        value: function togglePopupAvailability() {
            this.setState({
                showPopupAvailability: !this.state.showPopupAvailability
            });
        }
    }, {
        key: "togglePopupSkills",
        value: function togglePopupSkills() {
            this.setState({
                showPopupSkills: !this.state.showPopupSkills
            });
        }
    }, {
        key: "togglePopupProjects",
        value: function togglePopupProjects() {
            this.setState({
                showPopupProjects: !this.state.showPopupProjects
            });
        }
    }, {
        key: "togglePopupImage",
        value: function togglePopupImage() {
            this.setState({
                showPopupImage: !this.state.showPopupImage
            });
        }
    }, {
        key: "togglePopupEducations",
        value: function togglePopupEducations() {
            this.setState({
                showPopupEducations: !this.state.showPopupEducations
            });
        }
    }, {
        key: "togglePopupCourses",
        value: function togglePopupCourses() {
            this.setState({
                showPopupCourses: !this.state.showPopupCourses
            });
        }
    }, {
        key: "togglePopupImageDelay",
        value: function togglePopupImageDelay() {
            var _this7 = this;

            if (this.state.message == 'edit_image_success') {}
            setTimeout(function () {
                _this7.setState({
                    showPopupImage: !_this7.state.showPopupImage
                });
            }, 100);
        }
    }, {
        key: "downloadPDF",
        value: function downloadPDF() {
            var linkSource = "data:application/doc;base64," + this.state.cvBase64;
            var downloadLink = document.createElement("a");
            var fileName = this.state.cv;

            downloadLink.href = linkSource;
            downloadLink.download = fileName;
            downloadLink.click();
        }
    }, {
        key: "getCountryByCode",
        value: function getCountryByCode(code) {
            if (code != null) {
                var all_countries = this.props.countryAll;
                var _country = all_countries.filter(function (c) {
                    return c.value.toLowerCase() == code.toLowerCase();
                });
                return _country[0].label;
            }
        }
    }, {
        key: "showMore",
        value: function showMore() {
            this.state.itemsToShow === 9 ? this.setState({ itemsToShow: this.state.form.projects.length, expanded: true }) : this.setState({ itemsToShow: 9, expanded: false });
        }
    }, {
        key: "showMoreSkill",
        value: function showMoreSkill() {
            this.state.itemsToShowSkill === 10 ? this.setState({ itemsToShowSkill: this.state.form.skills.length, expandedSkill: true }) : this.setState({ itemsToShowSkill: 10, expandedSkill: false });
        }
    }, {
        key: "renderUserProfileInfo",
        value: function renderUserProfileInfo() {

            return _react2.default.createElement(
                "div",
                { className: "row" },
                _react2.default.createElement(
                    "div",
                    { className: "profile_scoll", id: "hidingScrollBar" },
                    _react2.default.createElement(
                        "div",
                        { className: "hideScrollBar" },
                        _react2.default.createElement(
                            "div",
                            { className: "col-xs-12 col-sm-12 col-md-12 col-lg-12 boder_header" },
                            _react2.default.createElement(
                                "div",
                                { className: "name_header" },
                                "MY PROFILE"
                            )
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "col-xs-4" },
                            _react2.default.createElement(
                                "section",
                                { className: "profile_infomation" },
                                _react2.default.createElement("div", { className: "button_profile", onClick: this.togglePopupImage.bind(this) }),
                                _react2.default.createElement(
                                    "div",
                                    { className: "image_pro" },
                                    _react2.default.createElement(
                                        "div",
                                        null,
                                        _react2.default.createElement("img", { className: "image",
                                            src: "data:image/jpeg;base64," + this.state.photoBase64 })
                                    ),
                                    _react2.default.createElement(
                                        "span",
                                        { className: "name_profile" },
                                        _react2.default.createElement(
                                            "div",
                                            { className: "user_name" },
                                            _react2.default.createElement(
                                                "span",
                                                { className: "squa" },
                                                "["
                                            ),
                                            this.state.form.firstName + " " + this.state.form.lastName,
                                            "\xA0",
                                            _react2.default.createElement(
                                                "span",
                                                { className: "squa" },
                                                "]"
                                            )
                                        ),
                                        _react2.default.createElement(
                                            "div",
                                            null,
                                            this.state.form.job,
                                            "\xA0"
                                        ),
                                        _react2.default.createElement(
                                            "div",
                                            null,
                                            this.state.form.countryDisplay,
                                            "\xA0"
                                        )
                                    ),
                                    _react2.default.createElement("div", { className: "white_profile" })
                                ),
                                _react2.default.createElement(
                                    "div",
                                    { className: "since_date" },
                                    "Manaty member since: ",
                                    this.state.form.sinceDate,
                                    "\xA0"
                                ),
                                _react2.default.createElement(
                                    "div",
                                    { className: "infomation" },
                                    _react2.default.createElement("span", { className: "mail" }),
                                    _react2.default.createElement(
                                        "span",
                                        {
                                            className: "text_profile" },
                                        this.state.form.email,
                                        "\xA0"
                                    ),
                                    _react2.default.createElement("span", { className: "skype" }),
                                    _react2.default.createElement(
                                        "span",
                                        {
                                            className: "text_profile1" },
                                        this.state.form.skypeId,
                                        "\xA0"
                                    ),
                                    _react2.default.createElement("span", { className: "linkedin" }),
                                    this.state.form.linkedin ? _react2.default.createElement(
                                        "a",
                                        { target: "_blank", href: this.state.form.linkedin,
                                            className: "text_profile2" },
                                        this.state.form.linkedin,
                                        "\xA0"
                                    ) : '',
                                    _react2.default.createElement("span", { className: "cv" }),
                                    " ",
                                    this.state.cv ? _react2.default.createElement(
                                        "a",
                                        { onClick: this.downloadPDF.bind(this) },
                                        _react2.default.createElement(
                                            "span",
                                            {
                                                className: "text_profile3" },
                                            this.state.cv
                                        )
                                    ) : '',
                                    _react2.default.createElement("div", { className: "white_infomation" })
                                ),
                                _react2.default.createElement(
                                    "div",
                                    null,
                                    _react2.default.createElement("span", { onClick: this.togglePopup.bind(this), className: "edit_user" })
                                )
                            )
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "col-xs-8" },
                            _react2.default.createElement(
                                "table",
                                { className: "table_profile" },
                                _react2.default.createElement(
                                    "tr",
                                    null,
                                    _react2.default.createElement(
                                        "td",
                                        { className: "bio" },
                                        _react2.default.createElement(
                                            "div",
                                            null,
                                            _react2.default.createElement(
                                                "div",
                                                null,
                                                _react2.default.createElement(
                                                    "span",
                                                    { className: "text_bio" },
                                                    "BIO",
                                                    _react2.default.createElement("span", {
                                                        onClick: this.togglePopupBio.bind(this), className: "edit" })
                                                )
                                            ),
                                            _react2.default.createElement("span", { className: "corner1" }),
                                            _react2.default.createElement(
                                                "div",
                                                { className: "value_bio" },
                                                this.state.form.bio
                                            ),
                                            _react2.default.createElement("span", { className: "corner2" })
                                        )
                                    )
                                ),
                                _react2.default.createElement(
                                    "tr",
                                    null,
                                    _react2.default.createElement("td", { className: "space" })
                                ),
                                _react2.default.createElement(
                                    "tr",
                                    null,
                                    _react2.default.createElement(
                                        "td",
                                        { className: "skill" },
                                        _react2.default.createElement(
                                            "div",
                                            null,
                                            _react2.default.createElement(
                                                "span",
                                                null,
                                                _react2.default.createElement(
                                                    "div",
                                                    null,
                                                    _react2.default.createElement(
                                                        "span",
                                                        { className: "text_skill" },
                                                        "SKILLS",
                                                        _react2.default.createElement("span", {
                                                            onClick: this.togglePopupSkills.bind(this), className: "edit_skill" })
                                                    )
                                                ),
                                                _react2.default.createElement(
                                                    "div",
                                                    { className: "display_skill" },
                                                    _react2.default.createElement(Skills, { skills: this.state.form.skills,
                                                        itemsToShowSkill: this.state.itemsToShowSkill })
                                                ),
                                                _react2.default.createElement(
                                                    "div",
                                                    { className: "see_more", onClick: this.showMoreSkill },
                                                    this.state.expandedSkill ? _react2.default.createElement(
                                                        "div",
                                                        null,
                                                        "See less"
                                                    ) : _react2.default.createElement(
                                                        "div",
                                                        null,
                                                        "See more"
                                                    )
                                                ),
                                                _react2.default.createElement("span", { className: "line1" }),
                                                _react2.default.createElement("span", { className: "line2" })
                                            )
                                        )
                                    )
                                ),
                                _react2.default.createElement(
                                    "tr",
                                    null,
                                    _react2.default.createElement("td", { className: "space" })
                                ),
                                _react2.default.createElement(
                                    "tr",
                                    null,
                                    _react2.default.createElement(
                                        "td",
                                        { className: "project" },
                                        _react2.default.createElement(
                                            "div",
                                            null,
                                            _react2.default.createElement(
                                                "div",
                                                null,
                                                _react2.default.createElement(
                                                    "span",
                                                    { className: "text_project" },
                                                    "MANATY PROJECTS",
                                                    _react2.default.createElement("span", {
                                                        onClick: this.togglePopupProjects.bind(this),
                                                        className: "edit_pro" })
                                                )
                                            ),
                                            _react2.default.createElement(
                                                "span",
                                                { className: "display_project" },
                                                _react2.default.createElement(Projects, {
                                                    projects: this.state.form.projects,
                                                    itemsToShow: this.state.itemsToShow })
                                            ),
                                            _react2.default.createElement("br", null),
                                            _react2.default.createElement(
                                                "div",
                                                { className: "see_more", onClick: this.showMore },
                                                this.state.expanded ? _react2.default.createElement(
                                                    "div",
                                                    null,
                                                    "See less"
                                                ) : _react2.default.createElement(
                                                    "div",
                                                    null,
                                                    "See more"
                                                )
                                            )
                                        )
                                    )
                                ),
                                _react2.default.createElement(
                                    "tr",
                                    null,
                                    _react2.default.createElement("td", { className: "space" })
                                ),
                                _react2.default.createElement(
                                    "tr",
                                    null,
                                    _react2.default.createElement(
                                        "td",
                                        { className: "availability" },
                                        _react2.default.createElement("div", { className: "availability_inin" }),
                                        _react2.default.createElement(
                                            "span",
                                            { className: "text_availability" },
                                            "AVAILABILITY",
                                            _react2.default.createElement("span", {
                                                onClick: this.togglePopupAvailability.bind(this),
                                                className: "edit_avai" })
                                        ),
                                        _react2.default.createElement("div", { className: "availability_in" }),
                                        _react2.default.createElement(
                                            "div",
                                            { className: "hour" },
                                            _react2.default.createElement(
                                                "span",
                                                { className: "hours_title" },
                                                "Number of working hours a week"
                                            ),
                                            _react2.default.createElement("br", null),
                                            _react2.default.createElement(
                                                "span",
                                                { className: "hours_value" },
                                                this.state.form.availability.hoursWork,
                                                " hrs"
                                            )
                                        ),
                                        _react2.default.createElement(
                                            "div",
                                            { className: "infos" },
                                            _react2.default.createElement(
                                                "span",
                                                { className: "infos_title" },
                                                "Infos"
                                            ),
                                            _react2.default.createElement("br", null),
                                            _react2.default.createElement(
                                                "span",
                                                { className: "infos_value" },
                                                this.state.form.availability.infos
                                            )
                                        ),
                                        _react2.default.createElement(
                                            "div",
                                            { className: "time" },
                                            _react2.default.createElement(
                                                "span",
                                                { className: "time_title" },
                                                "Time zone (UTC)"
                                            ),
                                            _react2.default.createElement("br", null),
                                            _react2.default.createElement(
                                                "span",
                                                { className: "time_value" },
                                                this.state.form.availability.timeZone
                                            )
                                        ),
                                        _react2.default.createElement(
                                            "div",
                                            { className: "vacation" },
                                            _react2.default.createElement(
                                                "span",
                                                { className: "vacation_title" },
                                                "Vacations"
                                            ),
                                            _react2.default.createElement("br", null),
                                            _react2.default.createElement(
                                                "span",
                                                { className: "vacation_value" },
                                                _react2.default.createElement(Vocations, {
                                                    vocations: this.state.form.availability.vocations })
                                            )
                                        )
                                    )
                                ),
                                _react2.default.createElement(
                                    "tr",
                                    null,
                                    _react2.default.createElement("td", { className: "space" })
                                ),
                                _react2.default.createElement(
                                    "tr",
                                    null,
                                    _react2.default.createElement(
                                        "td",
                                        { className: "educations" },
                                        _react2.default.createElement(
                                            "div",
                                            null,
                                            _react2.default.createElement(
                                                "span",
                                                { className: "text_educations" },
                                                " EDUCATION ",
                                                _react2.default.createElement("span", {
                                                    onClick: this.togglePopupEducations.bind(this),
                                                    className: "edit_education" })
                                            )
                                        ),
                                        _react2.default.createElement(
                                            "span",
                                            { className: "display_degree" },
                                            _react2.default.createElement(Educations, {
                                                educations: this.state.form.educations }),
                                            "itemsToShow=",
                                            this.state.itemsToShow,
                                            "/>"
                                        ),
                                        _react2.default.createElement("br", null)
                                    )
                                ),
                                _react2.default.createElement(
                                    "tr",
                                    null,
                                    _react2.default.createElement("td", { className: "space" })
                                ),
                                _react2.default.createElement(
                                    "tr",
                                    null,
                                    _react2.default.createElement(
                                        "td",
                                        { className: "courses" },
                                        _react2.default.createElement(
                                            "div",
                                            null,
                                            _react2.default.createElement(
                                                "span",
                                                { className: "text_courses" },
                                                " TRAININGS COURSES ",
                                                _react2.default.createElement("span", {
                                                    onClick: this.togglePopupCourses.bind(this),
                                                    className: "edit_courses" })
                                            )
                                        ),
                                        _react2.default.createElement(
                                            "span",
                                            { className: "display_course" },
                                            _react2.default.createElement(Educations, {
                                                courses: this.state.form.courses }),
                                            "itemsToShow=",
                                            this.state.itemsToShow,
                                            "/>"
                                        ),
                                        _react2.default.createElement("br", null)
                                    )
                                )
                            ),
                            this.state.showPopup == true || this.state.showPopupBio == true || this.state.showPopupAvailability == true || this.state.showPopupProjects == true || this.state.showPopupSkills == true || this.state.showPopupImage == true || this.state.showPopupEducations == true || this.state.showPopupCourses == true ? _react2.default.createElement("div", { id: "page-mask" }) : null
                        )
                    )
                )
            );
        }
    }, {
        key: "renderUserPopup",
        value: function renderUserPopup() {
            return _react2.default.createElement(
                "div",
                { className: "userpopup" },
                this.state.showPopup ? _react2.default.createElement(_UserPopup2.default, { parent: this, userInfo: this.props.userInfo, baseData: this.props.baseData,
                    countryAll: this.props.countryAll,
                    closePopup: this.togglePopup.bind(this) }) : null
            );
        }
    }, {
        key: "renderUserPopupBio",
        value: function renderUserPopupBio() {
            return _react2.default.createElement(
                "div",
                { className: "userpopup" },
                this.state.showPopupBio ? _react2.default.createElement(_UserPopupBio2.default, { parent: this, userInfo: this.props.userInfo,
                    closePopupBio: this.togglePopupBio.bind(this)
                }) : null
            );
        }
    }, {
        key: "renderUserPopupAvailability",
        value: function renderUserPopupAvailability() {

            return _react2.default.createElement(
                "div",
                { className: "userpopup" },
                this.state.showPopupAvailability ? _react2.default.createElement(_UserPopupAvailability2.default, { parent: this, userInfo: this.props.userInfo,
                    closePopupAvailability: this.togglePopupAvailability.bind(this)
                }) : null
            );
        }
    }, {
        key: "renderUserPopupSkills",
        value: function renderUserPopupSkills() {
            return _react2.default.createElement(
                "div",
                { className: "userpopup" },
                this.state.showPopupSkills ? _react2.default.createElement(_UserPopupSkills2.default, { parent: this, userInfo: this.props.userInfo,
                    closePopupSkills: this.togglePopupSkills.bind(this)
                }) : null
            );
        }
    }, {
        key: "renderUserPopupProjects",
        value: function renderUserPopupProjects() {

            return _react2.default.createElement(
                "div",
                { className: "userpopup" },
                this.state.showPopupProjects ? _react2.default.createElement(_UserPopupProjects2.default, { parent: this, userInfo: this.props.userInfo,
                    projectSee: this.props.projectSee,
                    projectInfo: this.props.projectInfo,
                    closePopupProjects: this.togglePopupProjects.bind(this)
                }) : null
            );
        }
    }, {
        key: "renderUserPopupEducations",
        value: function renderUserPopupEducations() {

            return _react2.default.createElement(
                "div",
                { className: "userpopup" },
                this.state.showPopupEducations ? _react2.default.createElement(_UserPopupEducations2.default, { parent: this, userInfo: this.props.userInfo,
                    projectSee: this.props.projectSee,
                    projectInfo: this.props.projectInfo,
                    closePopupEducations: this.togglePopupEducations.bind(this) }) : null
            );
        }
    }, {
        key: "renderUserPopupCourses",
        value: function renderUserPopupCourses() {

            return _react2.default.createElement(
                "div",
                { className: "userpopup" },
                this.state.showPopupCourses ? _react2.default.createElement(_UserPopupCourses2.default, { parent: this, userInfo: this.props.userInfo,
                    projectSee: this.props.projectSee,
                    projectInfo: this.props.projectInfo,
                    closePopupCourses: this.togglePopupCourses.bind(this) }) : null
            );
        }
    }, {
        key: "renderProjectPopupImage",
        value: function renderProjectPopupImage() {
            return _react2.default.createElement(
                "div",
                { className: "userpopup" },
                this.state.showPopupImage ? _react2.default.createElement(_ProjectPopupImage2.default, { parent: this,
                    baseData: this.props.baseData,
                    userInfo: this.props.userInfo,
                    projectSee: this.props.projectSee,
                    projectInfo: this.props.projectInfo,
                    closePopupImage: this.togglePopupImage.bind(this),
                    closePopupImageDelay: this.togglePopupImageDelay.bind(this)
                }) : null
            );
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "container-fluid profile_manaty" },
                this.renderUserProfileInfo(),
                this.renderUserPopup(),
                this.renderUserPopupBio(),
                this.renderUserPopupAvailability(),
                this.renderUserPopupSkills(),
                this.renderUserPopupProjects(),
                this.renderUserPopupEducations(),
                this.renderUserPopupCourses(),
                this.renderProjectPopupImage()
            );
        }
    }]);
    return UserProfileInfo;
}(_react.Component);

exports.default = UserProfileInfo;

/***/ }),

/***/ "./src/meveo/pages/user/UserProjectInfo.jsx":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _set = __webpack_require__("./node_modules/babel-runtime/core-js/set.js");

var _set2 = _interopRequireDefault(_set);

var _toConsumableArray2 = __webpack_require__("./node_modules/babel-runtime/helpers/toConsumableArray.js");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = __webpack_require__("./node_modules/babel-runtime/helpers/extends.js");

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = __webpack_require__("./node_modules/babel-runtime/core-js/object/get-prototype-of.js");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__("./node_modules/babel-runtime/helpers/createClass.js");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__("./node_modules/babel-runtime/helpers/possibleConstructorReturn.js");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__("./node_modules/babel-runtime/helpers/inherits.js");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__("./node_modules/react/react.js");

var _react2 = _interopRequireDefault(_react);

var _reactTable = __webpack_require__("./node_modules/react-table/es/index.js");

var _reactTable2 = _interopRequireDefault(_reactTable);

__webpack_require__("./node_modules/react-table/react-table.css");

var _UserProfileAction = __webpack_require__("./src/meveo/actions/UserProfileAction.js");

var _SeeProjects = __webpack_require__("./src/meveo/pages/user/SeeProjects.jsx");

var _SeeProjects2 = _interopRequireDefault(_SeeProjects);

var _ProjectStore = __webpack_require__("./src/meveo/stores/ProjectStore.js");

var _ProjectStore2 = _interopRequireDefault(_ProjectStore);

var _moment = __webpack_require__("./node_modules/moment/moment.js");

var _moment2 = _interopRequireDefault(_moment);

var _momentRange = __webpack_require__("./node_modules/moment-range/dist/moment-range.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var moment = (0, _momentRange.extendMoment)(_moment2.default);

var Team = function (_React$Component) {
    (0, _inherits3.default)(Team, _React$Component);

    function Team() {
        (0, _classCallCheck3.default)(this, Team);
        return (0, _possibleConstructorReturn3.default)(this, (Team.__proto__ || (0, _getPrototypeOf2.default)(Team)).apply(this, arguments));
    }

    (0, _createClass3.default)(Team, [{
        key: 'render',
        value: function render() {
            var teamProjects = [];
            this.props.teams.map(function (el) {
                teamProjects.push(el.name);
            });
            var numTeams = teamProjects.length;
            var otherTeams = 0;
            if (numTeams > 5) {
                otherTeams = numTeams - 5;
            }
            return _react2.default.createElement(
                'div',
                { className: 'team_pro' },
                this.props.teams.slice(0, 5).map(function (el, index) {
                    return _react2.default.createElement(
                        'span',
                        { key: index, className: 'manaty_list' },
                        _react2.default.createElement(
                            'span',
                            null,
                            el.fullName
                        )
                    );
                })
            );
        }
    }]);
    return Team;
}(_react2.default.Component);

var SkillDetail = function (_React$Component2) {
    (0, _inherits3.default)(SkillDetail, _React$Component2);

    function SkillDetail() {
        (0, _classCallCheck3.default)(this, SkillDetail);
        return (0, _possibleConstructorReturn3.default)(this, (SkillDetail.__proto__ || (0, _getPrototypeOf2.default)(SkillDetail)).apply(this, arguments));
    }

    (0, _createClass3.default)(SkillDetail, [{
        key: 'render',
        value: function render() {
            var _this3 = this;

            var photo64 = this.props.logoBase64;
            if (photo64 != null) {
                var photoDisplay = photo64;
            } else {
                var photoDisplay = '/9j/4QDCRXhpZgAASUkqAAgAAAAHABIBAwABAAAAAQAAABoBBQABAAAAYgAAABsBBQABAAAAagAAACgBAwABAAAAAgAAADEBAgAOAAAAcgAAADIBAgAUAAAAgAAAAGmHBAABAAAAlAAAAAAAAAAsAQAAAQAAACwBAAABAAAAUGhvdG9GaWx0cmUgNwAyMDE5OjAzOjEyIDE3OjM3OjI5AAMAAJAHAAQAAAAwMjEwAqADAAEAAAD0AQAAA6ADAAEAAAD0AQAA/9sAQwADAgIDAgIDAwMDBAMDBAUIBQUEBAUKBwcGCAwKDAwLCgsLDQ4SEA0OEQ4LCxAWEBETFBUVFQwPFxgWFBgSFBUU/9sAQwEDBAQFBAUJBQUJFA0LDRQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQU/8AAEQgB9AH0AwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8AxKKKK+4P5UCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooq5pOj3+vahFYaZZXOo30ufLtrSJpZXwCxwqgk4AJ+gNGxSTk0krtlOivoTwZ+xT4212VX12ey8M2odkdXkF1cYC5DKkZ2EFjjmRSME46Z9b8O/sOeD7CKzfV9X1XVrqJ98yxMlvbzgNkLsCs6grgHEmepBXjHDPG0Ifav6H1GG4ZzTEq6pcq/vafhv+B8QUV+iX/DJ/wAK/wDoVv8AyoXX/wAdo/4ZP+Ff/Qrf+VC6/wDjtYf2lS7P8P8AM9b/AFJzH+eH3y/+RPztor7w8U/sV+Ata8yTSn1Hw9N5BjjS3uPOhEnOJHWUM7ckZUOoIXjBya8e8Z/sQeK9Giabw9qll4jjVFJgcfZLhnLYIVWLJgDDZMg7jGQM7QxtCfW3qeZiuFs0wyb9nzpfyu/4aP8AA+cKK1/FPhHWfBOrSaZrumXOl3yZPlXCFd6hiu5D0dSVYBlJU44JrIruTTV0fKzhKnJxmrNdGFFFFMgKKKKACiiigAooooAKKKKACiiigAoo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mOTwxpRcEXUUxF9KFZiPnUgRhhsJVcnKkbypIPz3RRXVTpQpLlgrHgY3H4nMKntcTNyf4L0WyCiiitTzwooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/9k=';
            }
            var dateEnd = moment(this.props.dateEnd, "YYYY/MM/DD").format("MMM YYYY").toString();
            var dateStart = moment(this.props.dateStart, "YYYY/MM/DD").format("MMM YYYY").toString();
            if (dateStart === 'Invalid date') {
                dateStart = 'Ongoing';
            }
            if (dateEnd === 'Invalid date') {
                dateEnd = 'Ongoing';
            }

            var teamProjects = [];
            this.props.teams.map(function (el) {
                teamProjects.push(el.name);
            });
            var numTeams = teamProjects.length;
            var otherTeams = 0;
            if (numTeams > 5) {
                otherTeams = numTeams - 5;
            }

            return _react2.default.createElement(
                'div',
                { className: 'project_detail' },
                _react2.default.createElement(
                    'div',
                    { className: 'div1_project' },
                    _react2.default.createElement(
                        'div',
                        { className: 'picture_pro' },
                        _react2.default.createElement('img', { src: "data:image/jpeg;base64," + photoDisplay })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'out_pro' },
                        _react2.default.createElement(
                            'div',
                            { className: 'all_pro' },
                            _react2.default.createElement(
                                'div',
                                { className: 'name_li' },
                                _react2.default.createElement(
                                    'span',
                                    { className: 'squa' },
                                    '['
                                ),
                                this.props.name,
                                '\xA0',
                                _react2.default.createElement(
                                    'span',
                                    { className: 'squa' },
                                    ']'
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'client_li' },
                                this.props.client,
                                '\xA0'
                            ),
                            dateStart != dateEnd ? _react2.default.createElement(
                                'div',
                                { className: 'date_li' },
                                ' ',
                                dateStart,
                                ' - ',
                                dateEnd,
                                '\xA0'
                            ) : _react2.default.createElement(
                                'div',
                                { className: 'date_li' },
                                ' ',
                                dateStart,
                                '\xA0'
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'since_project' },
                    _react2.default.createElement(
                        'div',
                        { className: 'sin_in' },
                        this.props.shortDescription,
                        '\xA0'
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'link_project' },
                    this.props.link ? _react2.default.createElement(
                        'div',
                        { className: 'link_in' },
                        _react2.default.createElement(
                            'a',
                            { target: '_blank', href: this.props.link },
                            this.props.link
                        )
                    ) : _react2.default.createElement(
                        'div',
                        { className: 'link_inno' },
                        'No link attached'
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'div3_project' },
                    _react2.default.createElement(
                        'div',
                        { className: 'sub_pro' },
                        'MANATY TEAM'
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'project_in' },
                        _react2.default.createElement(Team, { teams: this.props.teams }),
                        otherTeams > 0 ? _react2.default.createElement(
                            'div',
                            { className: 'manaty_list_see', onClick: function onClick() {
                                    return _this3.props.viewProject(_this3.props.code);
                                } },
                            'And ',
                            otherTeams,
                            ' More'
                        ) : ''
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'div4_project' },
                    _react2.default.createElement(
                        'div',
                        { className: 'btn_see', onClick: function onClick() {
                                return _this3.props.viewProject(_this3.props.code);
                            } },
                        'See project'
                    )
                )
            );
        }
    }]);
    return SkillDetail;
}(_react2.default.Component);

var UserProjectInfo = function (_Component) {
    (0, _inherits3.default)(UserProjectInfo, _Component);

    function UserProjectInfo(props) {
        (0, _classCallCheck3.default)(this, UserProjectInfo);

        var _this4 = (0, _possibleConstructorReturn3.default)(this, (UserProjectInfo.__proto__ || (0, _getPrototypeOf2.default)(UserProjectInfo)).call(this, props));

        _this4.state = {
            showFrozen: false,
            amount: 0,
            users: [],
            email: "",
            map: null,
            countryDisplay: "",
            toLowerCase: "",
            render: false,
            projectSee: null,
            allUsers: [],
            fieldSearch: '',
            class1: 'list',
            class2: 'vig1',
            tabDisplay: true,
            dateStartChange: '',
            dateEndChange: '',
            clientChange: ''
        };

        _this4.getCountryByCode = _this4.getCountryByCode.bind(_this4);
        _this4.viewProject = _this4.viewProject.bind(_this4);
        return _this4;
    }

    (0, _createClass3.default)(UserProjectInfo, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            _ProjectStore2.default.bindUpdateHandler(this.projectDetailOnUpdate.bind(this));

            /********Search********/
            var allProject = this.props.projectInfo;
            this.setState({
                allProject: allProject,
                projectSearch: allProject
            });
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            _ProjectStore2.default.unbindUpdateHandler(this.projectDetailOnUpdate.bind(this));
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {}
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(oldProps) {
            var newProps = this.props;
            if (oldProps.projectInfo !== newProps.projectInfo) {
                this.setState({
                    projectSearch: this.props.projectInfo
                });
            }
        }
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
            return true;
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps() {}
    }, {
        key: 'projectDetailOnUpdate',
        value: function projectDetailOnUpdate(response) {
            console.log("project On Update");
            console.log(response);
            var result = response.result,
                message = response.message;

            if (message == "project_detail_success") {
                this.setState({
                    projectSee: result
                });
            }
            this.state;
        }
    }, {
        key: 'viewProject',
        value: function viewProject(name) {
            (0, _UserProfileAction.projectDetail)(name);
        }
    }, {
        key: 'getCountryByCode',
        value: function getCountryByCode(code) {
            if (code != null) {
                var all_countries = this.props.baseData.all_countries;

                var _country = all_countries.filter(function (c) {
                    return c.value.toLowerCase() == code.toLowerCase();
                });
                return _country[0].label;
            }
        }
    }, {
        key: 'renderSkills',
        value: function renderSkills(object) {
            if (object) {
                var skill = object.map(function (val) {
                    return _react2.default.createElement(
                        'div',
                        null,
                        val.name
                    );
                });
                return skill;
            }
        }
    }, {
        key: 'viewProfile',
        value: function viewProfile(name) {
            (0, _UserProfileAction.projectDetail)(name);
        }
    }, {
        key: 'renderViewProject',
        value: function renderViewProject() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_SeeProjects2.default, (0, _extends3.default)({ parent: this, users: this.props.users, backAllProjects: this.props.backAllProjects, resetFilter: this.resetFilter, projectSee: this.state.projectSee }, this.state, { baseData: this.props.baseData }, this.props))
            );
        }
        /********SEARCH********/

    }, {
        key: 'searchDateStart',
        value: function searchDateStart(event) {
            var _this5 = this;

            var allProject = this.props.projectInfo;
            if (allProject != null) {
                var searchInput = event.target.value,
                    displayedContacts = allProject.filter(function (el) {
                    var searchValue = moment(el.dateStart, "YYYY/MM/DD").format("YYYY").toString() != null ? moment(el.dateStart, "YYYY/MM/DD").format("MMMM-YYYY").toString().toLowerCase() : '';
                    var searchValueDateEnd = moment(el.dateEnd, "YYYY/MM/DD").format("YYYY").toString() != null ? moment(el.dateEnd, "YYYY/MM/DD").format("MMMM-YYYY").toString().toLowerCase() : '';
                    var searchValueClient = el.client != null ? el.client.toLowerCase() : '';

                    return (searchValue.indexOf(searchInput.toLowerCase()) !== -1 || searchValueDateEnd.indexOf(searchInput.toLowerCase()) !== -1) && searchValueClient.indexOf(_this5.state.clientChange.toLowerCase()) !== -1;
                });
                this.setState({
                    dateStartChange: searchInput,
                    dateEndChange: searchInput,
                    projectSearch: displayedContacts
                });
            }
        }
    }, {
        key: 'searchClient',
        value: function searchClient(event) {
            var _this6 = this;

            var allProject = this.props.projectInfo;
            if (allProject != null) {
                var searchInput = event.target.value,
                    displayedContacts = allProject.filter(function (el) {
                    var searchValue = el.client != null ? el.client.toLowerCase() : '';
                    var searchValueDateStart = moment(el.dateStart, "YYYY/MM/DD").format("YYYY").toString() != null ? moment(el.dateStart, "YYYY/MM/DD").format("MMMM-YYYY").toString().toLowerCase() : '';
                    var searchValueDateEnd = moment(el.dateEnd, "YYYY/MM/DD").format("YYYY").toString() != '' ? moment(el.dateEnd, "YYYY/MM/DD").format("MMMM-YYYY").toString().toLowerCase() : '';

                    return searchValue.indexOf(searchInput.toLowerCase()) !== -1 && (searchValueDateStart.indexOf(_this6.state.dateStartChange.toLowerCase()) !== -1 || searchValueDateEnd.indexOf(_this6.state.dateEndChange.toLowerCase()) !== -1);
                });
                this.setState({
                    clientChange: searchInput,
                    projectSearch: displayedContacts
                });
            }
        }
    }, {
        key: 'searchAll',
        value: function searchAll(event) {
            var allProject = this.props.projectInfo;
            if (allProject != null) {
                var searchInput = event.target.value,
                    displayedContacts = allProject.filter(function (el) {
                    var searchValueClient = el.client != null ? el.client.toLowerCase() : '';
                    var searchValueDateStart = moment(el.dateStart, "YYYY/MM/DD").format("MMMM-YYYY").toString() != null ? moment(el.dateStart, "YYYY/MM/DD").format("MMMM-YYYY").toString().toLowerCase() : '';
                    var searchValueDateEnd = moment(el.dateEnd, "YYYY/MM/DD").format("MMMM-YYYY").toString() != null ? moment(el.dateEnd, "YYYY/MM/DD").format("MMMM-YYYY").toString().toLowerCase() : '';
                    var searchValueLink = el.link != null ? el.link.toLowerCase() : '';
                    var searchValueName = el.name != null ? el.name.toLowerCase() : '';
                    var searchValueDescription = el.shortDescription != null ? el.shortDescription.toLowerCase() : '';

                    return searchValueClient.indexOf(searchInput.toLowerCase()) !== -1 || searchValueDateStart.indexOf(searchInput.toLowerCase()) !== -1 || searchValueDateEnd.indexOf(searchInput.toLowerCase()) !== -1 || searchValueLink.indexOf(searchInput.toLowerCase()) !== -1 || searchValueName.indexOf(searchInput.toLowerCase()) !== -1 || searchValueDescription.indexOf(searchInput.toLowerCase()) !== -1 || el.teams.some(function (e) {
                        var searchValueTeams = e.fullName != null ? e.fullName.toLowerCase() : "";
                        return searchValueTeams.indexOf(searchInput.toLowerCase()) !== -1;
                    });
                });
                this.setState({
                    projectSearch: displayedContacts
                });
            }
        }
    }, {
        key: 'onChange',
        value: function onChange(event) {
            this.setState({ fieldSearch: event.target.value });
        }
    }, {
        key: 'renderManatyTeam',
        value: function renderManatyTeam(object) {
            if (object) {
                var teams = object.map(function (val) {
                    return _react2.default.createElement(
                        'div',
                        null,
                        val.fullName
                    );
                });
                return teams;
            }
        }
    }, {
        key: 'renderProjectVig',
        value: function renderProjectVig() {
            var _this7 = this;

            if (this.state.projectSearch) {
                var allProject = this.state.projectSearch;

                var detailTags = allProject.map(function (e, index) {
                    return _react2.default.createElement(SkillDetail, {
                        code: e.code,
                        name: e.name,
                        client: e.client,
                        dateStart: e.dateStart,
                        dateEnd: e.dateEnd,
                        shortDescription: e.shortDescription,
                        link: e.link,
                        viewProject: _this7.viewProject,
                        view_log: _this7.view_log,
                        getCountryByCode: _this7.getCountryByCode,
                        teams: e.teams,
                        logo: e.logo,
                        logoBase64: e.logoBase64,
                        assemblaLink: e.assemblaLink
                    });
                });
            }

            return _react2.default.createElement(
                'div',
                { className: 'project_list', id: 'hidingScrollBar' },
                _react2.default.createElement(
                    'div',
                    { className: 'hideScrollBar' },
                    detailTags
                ),
                _react2.default.createElement('div', { className: 'clear' })
            );
        }
    }, {
        key: 'renderDate',
        value: function renderDate(start, end) {
            var dateStart = moment(start, "YYYY/MM/DD").format("MMM YYYY").toString();
            var dateEnd = moment(end, "YYYY/MM/DD").format("MMM YYYY").toString();
            if (dateStart === 'Invalid date') {
                dateStart = 'Ongoing';
            }
            if (dateEnd === 'Invalid date') {
                dateEnd = 'Ongoing';
            }
            if (dateStart != dateEnd) {
                return dateStart.concat(' - ', dateEnd);
            } else {
                return dateStart;
            }
        }
    }, {
        key: 'renderProjectList',
        value: function renderProjectList() {
            var _this8 = this;

            var allProject = this.state.projectSearch;

            var columns = [{
                Header: _react2.default.createElement(
                    'span',
                    null,
                    'Project Name ',
                    _react2.default.createElement('i', { className: 'wd-sort-icon' })
                ),
                accessor: 'name'
            }, {
                Header: _react2.default.createElement(
                    'span',
                    null,
                    'Client ',
                    _react2.default.createElement('i', { className: 'wd-sort-icon' })
                ),
                accessor: 'client'

            }, {
                Header: 'Date',
                accessor: 'dateStart',
                Cell: function Cell(props) {
                    return _this8.renderDate(props.original.dateStart, props.original.dateEnd);
                }

            }, {
                Header: _react2.default.createElement(
                    'span',
                    null,
                    'Short description ',
                    _react2.default.createElement('i', { className: 'wd-sort-icon' })
                ),
                accessor: 'shortDescription',
                width: 300

            }, {
                Header: _react2.default.createElement(
                    'span',
                    null,
                    'Link ',
                    _react2.default.createElement('i', { className: 'wd-sort-icon' })
                ),
                accessor: 'link'

            }, {
                Header: _react2.default.createElement(
                    'span',
                    null,
                    'Manaty team ',
                    _react2.default.createElement('i', { className: 'wd-sort-icon' })
                ),
                accessor: 'teams',
                Cell: function Cell(props) {
                    return _this8.renderManatyTeam(props.row.teams);
                }

            }, {
                Header: _react2.default.createElement(
                    'span',
                    null,
                    'SEE PROJECT'
                ),
                accessor: 'code',
                Cell: function Cell(props) {
                    return _react2.default.createElement(
                        'button',
                        {
                            style: {
                                backgroundColor: '#1d9c9c',
                                color: 'white'
                            },
                            onClick: function onClick() {
                                return _this8.viewProject(props.row.code);
                            }
                        },
                        'See project'
                    );
                }
            }];

            return _react2.default.createElement(
                'div',
                { className: 'project_list' },
                _react2.default.createElement(
                    'div',
                    { className: 'hideScrollBar' },
                    _react2.default.createElement(
                        'div',
                        { className: 'team-react-table' },
                        _react2.default.createElement(_reactTable2.default, { className: '-striped -highlight',
                            data: allProject,
                            columns: columns,
                            showPagination: false,
                            showPageSizeOptions: true,
                            pageSizeOptions: [5, 10, 20, 25, 50, 100],
                            defaultPageSize: 20,
                            showPageJump: true,
                            sortable: true,
                            resizable: true,
                            minRows: 3,
                            style: {
                                height: "100%" // This will force the table body to overflow and scroll, since there is not enough room
                            }
                        })
                    )
                )
            );
        }
    }, {
        key: 'tabChanged',
        value: function tabChanged(event) {
            event.preventDefault();
            var state = this.state;
            state['showFrozen'] = false;
            this.setState(state);
        }
    }, {
        key: 'handleClick1',
        value: function handleClick1() {
            if (this.state.class1 == 'list' && this.state.class2 == 'vig1' && this.state.tabDisplay == true) {
                this.setState({
                    class1: 'list1',
                    class2: 'vig',
                    tabDisplay: false
                });
            }
        }
    }, {
        key: 'handleClick2',
        value: function handleClick2() {
            if (this.state.class1 == 'list1' && this.state.class2 == 'vig' && this.state.tabDisplay == false) {
                this.setState({
                    class1: 'list',
                    class2: 'vig1',
                    tabDisplay: true
                });
            }
        }
    }, {
        key: 'resetFilter',
        value: function resetFilter() {
            this.setState({
                projectSearch: this.props.projectInfo,
                dateStartChange: '',
                dateEndChange: '',
                clientChange: ''
            });
        }
    }, {
        key: 'renderProject',
        value: function renderProject() {
            var users = this.props.projectInfo;
            var uniqueDateStart = [];
            var uniqueDateEnd = [];
            if (users) {
                users.map(function (item) {
                    return uniqueDateStart.push(moment(item.dateStart, "YYYY/MM/DD").format("YYYY").toString());
                });
                users.map(function (item) {
                    return uniqueDateEnd.push(moment(item.dateEnd, "YYYY/MM/DD").format("YYYY").toString());
                });
            }

            var uniqueDate = uniqueDateStart.concat(uniqueDateEnd);
            var uniqueDateSet = [].concat((0, _toConsumableArray3.default)(new _set2.default(uniqueDate.map(function (item) {
                return item;
            }))));

            var optionDates = uniqueDateSet.filter(function (el) {
                return el != "" && el != null;
            });
            var uniqueDateSelect = [];
            optionDates.map(function (item) {
                if (item === 'Invalid date') {
                    item = 'Ongoing';
                }
                uniqueDateSelect.push(item);
            });
            uniqueDateSelect.sort();

            if (users) {
                var uniqueClient = [].concat((0, _toConsumableArray3.default)(new _set2.default(users.map(function (item) {
                    return item.client;
                }))));
                var uniqueClientSelect = uniqueClient.filter(function (el) {
                    return el != "" && el != null;
                });

                uniqueClientSelect.sort();
            }

            return _react2.default.createElement(
                'div',
                { className: 'row' },
                _react2.default.createElement(
                    'div',
                    { className: 'col-xs-12 boder_header' },
                    _react2.default.createElement(
                        'div',
                        { className: 'name_header' },
                        'PROJECTS'
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'col-xs-12 filter_team' },
                    _react2.default.createElement('span', { className: this.state.class1, onClick: this.handleClick1.bind(this) }),
                    _react2.default.createElement('span', { className: this.state.class2, onClick: this.handleClick2.bind(this) }),
                    _react2.default.createElement(
                        'form',
                        null,
                        _react2.default.createElement(
                            'span',
                            null,
                            _react2.default.createElement(
                                'span',
                                { className: 'filter_by' },
                                'Filter by'
                            ),
                            _react2.default.createElement(
                                'select',
                                { className: 'select_country', onChange: this.searchDateStart.bind(this) },
                                _react2.default.createElement(
                                    'option',
                                    { value: '' },
                                    'Date'
                                ),
                                _react2.default.createElement(
                                    'option',
                                    { value: '' },
                                    'All'
                                ),
                                uniqueDateSelect != null ? uniqueDateSelect.map(function (el) {
                                    return _react2.default.createElement(
                                        'option',
                                        { value: el !== 'Ongoing' ? el : 'Invalid date' },
                                        el
                                    );
                                }) : null
                            ),
                            _react2.default.createElement(
                                'select',
                                { className: 'select_country', onChange: this.searchClient.bind(this) },
                                _react2.default.createElement(
                                    'option',
                                    { value: '' },
                                    'Client'
                                ),
                                _react2.default.createElement(
                                    'option',
                                    { value: '' },
                                    'All'
                                ),
                                uniqueClientSelect != null ? uniqueClientSelect.map(function (el) {
                                    return _react2.default.createElement(
                                        'option',
                                        { value: el },
                                        el
                                    );
                                }) : null
                            )
                        ),
                        _react2.default.createElement(
                            'button',
                            { className: 'cancel_filter', onClick: this.resetFilter.bind(this), type: 'reset' },
                            'Cancel all filters'
                        ),
                        _react2.default.createElement(
                            'span',
                            { className: 'relative_te' },
                            _react2.default.createElement('input', { className: 'input_search', type: 'string', placeholder: 'Search', onChange: this.searchAll.bind(this) }),
                            _react2.default.createElement('span', { className: 'search_pro' })
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'col-xs-12 project_page' },
                    this.state.tabDisplay == true ? this.renderProjectVig() : this.renderProjectList()
                )
            );
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'container-fluid project_team' },
                this.props.projectSee == null ? this.renderProject() : this.renderViewProject()
            );
        }
    }]);
    return UserProjectInfo;
}(_react.Component);

exports.default = UserProjectInfo;

/***/ }),

/***/ "./src/meveo/pages/user/UserProjects.jsx":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends2 = __webpack_require__("./node_modules/babel-runtime/helpers/extends.js");

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = __webpack_require__("./node_modules/babel-runtime/core-js/object/get-prototype-of.js");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__("./node_modules/babel-runtime/helpers/createClass.js");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__("./node_modules/babel-runtime/helpers/possibleConstructorReturn.js");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__("./node_modules/babel-runtime/helpers/inherits.js");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__("./node_modules/react/react.js");

var _react2 = _interopRequireDefault(_react);

__webpack_require__("./node_modules/react-responsive-tabs/styles.css");

var _UserProjectInfo = __webpack_require__("./src/meveo/pages/user/UserProjectInfo.jsx");

var _UserProjectInfo2 = _interopRequireDefault(_UserProjectInfo);

var _DataStore = __webpack_require__("./src/meveo/stores/DataStore.js");

var _DataStore2 = _interopRequireDefault(_DataStore);

var _UserStore = __webpack_require__("./src/meveo/stores/UserStore.js");

var _UserStore2 = _interopRequireDefault(_UserStore);

var _AllStore = __webpack_require__("./src/meveo/stores/AllStore.js");

var _AllStore2 = _interopRequireDefault(_AllStore);

var _AllProjectStore = __webpack_require__("./src/meveo/stores/AllProjectStore.js");

var _AllProjectStore2 = _interopRequireDefault(_AllProjectStore);

var _ProjectStore = __webpack_require__("./src/meveo/stores/ProjectStore.js");

var _ProjectStore2 = _interopRequireDefault(_ProjectStore);

var _reactSelectCountryList = __webpack_require__("./node_modules/react-select-country-list/country-list.js");

var _reactSelectCountryList2 = _interopRequireDefault(_reactSelectCountryList);

var _DataActions = __webpack_require__("./src/meveo/actions/DataActions.js");

var _UserProfileAction = __webpack_require__("./src/meveo/actions/UserProfileAction.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserProjects = function (_Component) {
	(0, _inherits3.default)(UserProjects, _Component);

	function UserProjects() {
		(0, _classCallCheck3.default)(this, UserProjects);

		var _this = (0, _possibleConstructorReturn3.default)(this, (UserProjects.__proto__ || (0, _getPrototypeOf2.default)(UserProjects)).call(this));

		_this.options = (0, _reactSelectCountryList2.default)().getData();
		_this.state = {
			options: _this.options,
			isLoading: false,
			dataLoading: false,
			baseData: {
				user_countries: null,
				all_countries: null
			},
			error: null,
			statusUser: '',
			userInfo: null
		};
		_this.backAllProfiles = _this.backAllProfiles.bind(_this);
		_this.backAllProjects = _this.backAllProjects.bind(_this);
		return _this;
	}

	(0, _createClass3.default)(UserProjects, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			_DataStore2.default.bindLoadHandler(this.renderDataLoader.bind(this));
			_DataStore2.default.bindUpdateHandler(this.dataOnUpdate.bind(this));
			_DataStore2.default.bindErrorHandler(this.renderError.bind(this));
			_AllStore2.default.bindUpdateHandler(this.allUserDetails.bind(this));
			_UserStore2.default.bindUpdateHandler(this.userDetailOnUpdate.bind(this));
			_AllProjectStore2.default.bindUpdateHandler(this.projectDetailOnUpdate.bind(this));
			_ProjectStore2.default.bindUpdateHandler(this.projectSeeDetailOnUpdate.bind(this));
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			_DataStore2.default.unbindLoadHandler(this.renderDataLoader.bind(this));
			_DataStore2.default.unbindUpdateHandler(this.dataOnUpdate.bind(this));
			_DataStore2.default.unbindErrorHandler(this.renderError.bind(this));
			_AllStore2.default.bindUpdateHandler(this.allUserDetails.bind(this));
			_UserStore2.default.bindUpdateHandler(this.userDetailOnUpdate.bind(this));
			_AllProjectStore2.default.bindUpdateHandler(this.projectDetailOnUpdate.bind(this));
			_ProjectStore2.default.unbindUpdateHandler(this.projectSeeDetailOnUpdate.bind(this));
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			(0, _DataActions.getCountries)(false);
			(0, _UserProfileAction.getAllUsers)();
			(0, _UserProfileAction.getAllProject)();
		}
	}, {
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate() {
			this.state.message == 'upload_image_success';
			return true;
		}
	}, {
		key: 'allUserDetails',
		value: function allUserDetails(response) {
			console.log("user On Update");
			console.log(response);
			var result = response.result,
			    message = response.message;

			if (message == "users_detail_success") {
				this.setState({
					users: result
				});
			}
			this.state;
		}
	}, {
		key: 'userDetailOnUpdate',
		value: function userDetailOnUpdate(response) {
			console.log("userProfile On Update");
			console.log(response);
			var result = response.result,
			    message = response.message;

			if (message == "user_detail_success" || message == "user_profile_detail_success") {
				this.setState({
					userInfo: result,
					message: message
				});
			}
			this.state;
		}
	}, {
		key: 'projectDetailOnUpdate',
		value: function projectDetailOnUpdate(response) {
			console.log("Project On Update");
			console.log(response);
			var result = response.result,
			    message = response.message;

			if (message == "projects_detail_success") {
				this.setState({
					projectInfo: result
				});
			}
			this.state;
		}
	}, {
		key: 'projectSeeDetailOnUpdate',
		value: function projectSeeDetailOnUpdate(response) {
			console.log("See Project On Update");
			console.log(response);
			var result = response.result,
			    message = response.message;

			if (message == "project_detail_success") {
				this.setState({
					projectSee: result
				});
			}
			this.state;
		}

		// LOADERS

	}, {
		key: 'renderLoader',
		value: function renderLoader() {
			this.setState({
				isLoading: true,
				error: null
			});
		}
	}, {
		key: 'renderDataLoader',
		value: function renderDataLoader() {
			this.setState({
				dataLoading: true,
				error: null
			});
		}

		// ERROR

	}, {
		key: 'renderError',
		value: function renderError(error) {
			this.setState({
				isLoading: false,
				dataLoading: false,
				error: error
			});
		}

		// ON UPDATE

	}, {
		key: 'dataOnUpdate',
		value: function dataOnUpdate(response) {
			var result = response.result;


			if (response.message == "user_countries_list_success") {
				var countries_list = [];
				if (response.result != null) {
					response.result.map(function (val) {
						countries_list.push({ value: val.countryCode, label: val.countryName });
					});
				}
				var state = this.state;
				state['baseData']['user_countries'] = countries_list;
				state['dataLoading'] = false;
				this.setState(state);
			}

			if (response.message == "all_countries_list_success") {
				var countries_list = [];
				if (response.result != null) {
					response.result.map(function (val) {
						countries_list.push({ value: val.countryCode, label: val.countryName });
					});
				}

				// Sort countries list
				countries_list.sort(function (a, b) {
					if (a.label == null) {
						return -1;
					}
					if (b.label == null) {
						return 1;
					}
					var descA = a.label.toUpperCase();
					var descB = b.label.toUpperCase();
					if (descA < descB) {
						return -1;
					}
					if (descA > descB) {
						return 1;
					}
					return 0;
				});

				var state = this.state;
				state['baseData']['all_countries'] = countries_list;
				state['dataLoading'] = false;
				this.setState(state);
			}
		}
	}, {
		key: 'backAllProfiles',
		value: function backAllProfiles() {
			this.setState(function (props) {
				return {
					userInfo: null
				};
			});
		}
	}, {
		key: 'backAllProjects',
		value: function backAllProjects() {
			this.setState(function (props) {
				return {
					projectSee: null
				};
			});
		}
	}, {
		key: 'renderProjectsMain',
		value: function renderProjectsMain() {
			return _react2.default.createElement(_UserProjectInfo2.default, (0, _extends3.default)({ parent: this, users: this.state.users, userInfo: this.state.userInfo }, this.state, { baseData: this.state.baseData, backAllProjects: this.backAllProjects, projectInfo: this.state.projectInfo, countryAll: this.state.options }));
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				null,
				this.renderProjectsMain()
			);
		}
	}]);
	return UserProjects;
}(_react.Component);

module.exports = UserProjects;

/***/ }),

/***/ "./src/meveo/pages/user/UserTeam.jsx":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends2 = __webpack_require__("./node_modules/babel-runtime/helpers/extends.js");

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = __webpack_require__("./node_modules/babel-runtime/core-js/object/get-prototype-of.js");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__("./node_modules/babel-runtime/helpers/createClass.js");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__("./node_modules/babel-runtime/helpers/possibleConstructorReturn.js");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__("./node_modules/babel-runtime/helpers/inherits.js");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__("./node_modules/react/react.js");

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = __webpack_require__("./node_modules/react-bootstrap/es/index.js");

__webpack_require__("./node_modules/react-responsive-tabs/styles.css");

var _UserProfileInfo = __webpack_require__("./src/meveo/pages/user/UserProfileInfo.jsx");

var _UserProfileInfo2 = _interopRequireDefault(_UserProfileInfo);

var _UserTeamInfo = __webpack_require__("./src/meveo/pages/user/UserTeamInfo.jsx");

var _UserTeamInfo2 = _interopRequireDefault(_UserTeamInfo);

var _reactTabs = __webpack_require__("./node_modules/react-tabs/esm/index.js");

var _LocalStorageService = __webpack_require__("./src/meveo/services/LocalStorageService.js");

var _LocalStorageService2 = _interopRequireDefault(_LocalStorageService);

var _UserProjectInfo = __webpack_require__("./src/meveo/pages/user/UserProjectInfo.jsx");

var _UserProjectInfo2 = _interopRequireDefault(_UserProjectInfo);

var _ChangePassword = __webpack_require__("./src/meveo/pages/user/ChangePassword.jsx");

var _ChangePassword2 = _interopRequireDefault(_ChangePassword);

var _DataStore = __webpack_require__("./src/meveo/stores/DataStore.js");

var _DataStore2 = _interopRequireDefault(_DataStore);

var _UserStore = __webpack_require__("./src/meveo/stores/UserStore.js");

var _UserStore2 = _interopRequireDefault(_UserStore);

var _AllStore = __webpack_require__("./src/meveo/stores/AllStore.js");

var _AllStore2 = _interopRequireDefault(_AllStore);

var _AllProjectStore = __webpack_require__("./src/meveo/stores/AllProjectStore.js");

var _AllProjectStore2 = _interopRequireDefault(_AllProjectStore);

var _ProjectStore = __webpack_require__("./src/meveo/stores/ProjectStore.js");

var _ProjectStore2 = _interopRequireDefault(_ProjectStore);

var _reactSelectCountryList = __webpack_require__("./node_modules/react-select-country-list/country-list.js");

var _reactSelectCountryList2 = _interopRequireDefault(_reactSelectCountryList);

var _DataActions = __webpack_require__("./src/meveo/actions/DataActions.js");

var _UserProfileAction = __webpack_require__("./src/meveo/actions/UserProfileAction.js");

var _Mobile = __webpack_require__("./src/meveo/pages/user/Mobile.jsx");

var _Mobile2 = _interopRequireDefault(_Mobile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserTeam = function (_Component) {
	(0, _inherits3.default)(UserTeam, _Component);

	function UserTeam() {
		(0, _classCallCheck3.default)(this, UserTeam);

		var _this = (0, _possibleConstructorReturn3.default)(this, (UserTeam.__proto__ || (0, _getPrototypeOf2.default)(UserTeam)).call(this));

		_this.options = (0, _reactSelectCountryList2.default)().getData();
		_this.state = {
			options: _this.options,
			isLoading: false,
			dataLoading: false,
			baseData: {
				user_countries: null,
				all_countries: null
			},
			error: null,
			statusUser: '',
			userInfo: null
		};
		_this.backAllProfiles = _this.backAllProfiles.bind(_this);
		_this.backAllProjects = _this.backAllProjects.bind(_this);
		return _this;
	}

	(0, _createClass3.default)(UserTeam, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			_DataStore2.default.bindLoadHandler(this.renderDataLoader.bind(this));
			_DataStore2.default.bindUpdateHandler(this.dataOnUpdate.bind(this));
			_DataStore2.default.bindErrorHandler(this.renderError.bind(this));
			_AllStore2.default.bindUpdateHandler(this.allUserDetails.bind(this));
			_UserStore2.default.bindUpdateHandler(this.userDetailOnUpdate.bind(this));
			_AllProjectStore2.default.bindUpdateHandler(this.projectDetailOnUpdate.bind(this));
			_ProjectStore2.default.bindUpdateHandler(this.projectSeeDetailOnUpdate.bind(this));
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			_DataStore2.default.unbindLoadHandler(this.renderDataLoader.bind(this));
			_DataStore2.default.unbindUpdateHandler(this.dataOnUpdate.bind(this));
			_DataStore2.default.unbindErrorHandler(this.renderError.bind(this));
			_AllStore2.default.bindUpdateHandler(this.allUserDetails.bind(this));
			_UserStore2.default.bindUpdateHandler(this.userDetailOnUpdate.bind(this));
			_AllProjectStore2.default.bindUpdateHandler(this.projectDetailOnUpdate.bind(this));
			_ProjectStore2.default.unbindUpdateHandler(this.projectSeeDetailOnUpdate.bind(this));
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			(0, _DataActions.getCountries)(false);
			(0, _UserProfileAction.getAllUsers)();
			(0, _UserProfileAction.getAllProject)();
		}
	}, {
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate() {
			this.state.message == 'upload_image_success';
			return true;
		}
	}, {
		key: 'allUserDetails',
		value: function allUserDetails(response) {
			console.log("user On Update");
			console.log(response);
			var result = response.result,
			    message = response.message;

			if (message == "users_detail_success") {
				this.setState({
					users: result
				});
			}
			this.state;
		}
	}, {
		key: 'userDetailOnUpdate',
		value: function userDetailOnUpdate(response) {
			console.log("userProfile On Update");
			console.log(response);
			var result = response.result,
			    message = response.message;

			if (message == "user_detail_success" || message == "user_profile_detail_success") {
				this.setState({
					userInfo: result,
					message: message
				});
			}
			this.state;
		}
	}, {
		key: 'projectDetailOnUpdate',
		value: function projectDetailOnUpdate(response) {
			console.log("Project On Update");
			console.log(response);
			var result = response.result,
			    message = response.message;

			if (message == "projects_detail_success") {
				this.setState({
					projectInfo: result
				});
			}
			this.state;
		}
	}, {
		key: 'projectSeeDetailOnUpdate',
		value: function projectSeeDetailOnUpdate(response) {
			console.log("See Project On Update");
			console.log(response);
			var result = response.result,
			    message = response.message;

			if (message == "project_detail_success") {
				this.setState({
					projectSee: result
				});
			}
			this.state;
		}

		// LOADERS

	}, {
		key: 'renderLoader',
		value: function renderLoader() {
			this.setState({
				isLoading: true,
				error: null
			});
		}
	}, {
		key: 'renderDataLoader',
		value: function renderDataLoader() {
			this.setState({
				dataLoading: true,
				error: null
			});
		}

		// ERROR

	}, {
		key: 'renderError',
		value: function renderError(error) {
			this.setState({
				isLoading: false,
				dataLoading: false,
				error: error
			});
		}

		// ON UPDATE

	}, {
		key: 'dataOnUpdate',
		value: function dataOnUpdate(response) {
			var result = response.result;


			if (response.message == "user_countries_list_success") {
				var countries_list = [];
				if (response.result != null) {
					response.result.map(function (val) {
						countries_list.push({ value: val.countryCode, label: val.countryName });
					});
				}
				var state = this.state;
				state['baseData']['user_countries'] = countries_list;
				state['dataLoading'] = false;
				this.setState(state);
			}

			if (response.message == "all_countries_list_success") {
				var countries_list = [];
				if (response.result != null) {
					response.result.map(function (val) {
						countries_list.push({ value: val.countryCode, label: val.countryName });
					});
				}

				// Sort countries list
				countries_list.sort(function (a, b) {
					if (a.label == null) {
						return -1;
					}
					if (b.label == null) {
						return 1;
					}
					var descA = a.label.toUpperCase();
					var descB = b.label.toUpperCase();
					if (descA < descB) {
						return -1;
					}
					if (descA > descB) {
						return 1;
					}
					return 0;
				});

				var state = this.state;
				state['baseData']['all_countries'] = countries_list;
				state['dataLoading'] = false;
				this.setState(state);
			}
		}
	}, {
		key: 'backAllProfiles',
		value: function backAllProfiles() {
			this.setState(function (props) {
				return {
					userInfo: null
				};
			});
		}
	}, {
		key: 'backAllProjects',
		value: function backAllProjects() {
			this.setState(function (props) {
				return {
					projectSee: null
				};
			});
		}
	}, {
		key: 'renderTeamMain',
		value: function renderTeamMain() {
			return _react2.default.createElement(_UserTeamInfo2.default, (0, _extends3.default)({ parent: this, users: this.state.users, userInfo: this.state.userInfo }, this.state, { baseData: this.state.baseData, backAllProfiles: this.backAllProfiles, projectInfo: this.state.projectInfo, countryAll: this.state.options }));
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				null,
				this.renderTeamMain()
			);
		}
	}]);
	return UserTeam;
}(_react.Component);

module.exports = UserTeam;

/***/ }),

/***/ "./src/meveo/pages/user/UserTeamInfo.jsx":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _set = __webpack_require__("./node_modules/babel-runtime/core-js/set.js");

var _set2 = _interopRequireDefault(_set);

var _toConsumableArray2 = __webpack_require__("./node_modules/babel-runtime/helpers/toConsumableArray.js");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = __webpack_require__("./node_modules/babel-runtime/helpers/extends.js");

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = __webpack_require__("./node_modules/babel-runtime/core-js/object/get-prototype-of.js");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__("./node_modules/babel-runtime/helpers/createClass.js");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__("./node_modules/babel-runtime/helpers/possibleConstructorReturn.js");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__("./node_modules/babel-runtime/helpers/inherits.js");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__("./node_modules/react/react.js");

var _react2 = _interopRequireDefault(_react);

var _reactTable = __webpack_require__("./node_modules/react-table/es/index.js");

var _reactTable2 = _interopRequireDefault(_reactTable);

__webpack_require__("./node_modules/react-table/react-table.css");

var _UserProfileAction = __webpack_require__("./src/meveo/actions/UserProfileAction.js");

var _SeeProfile = __webpack_require__("./src/meveo/pages/user/SeeProfile.jsx");

var _SeeProfile2 = _interopRequireDefault(_SeeProfile);

var _UserStore = __webpack_require__("./src/meveo/stores/UserStore.js");

var _UserStore2 = _interopRequireDefault(_UserStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Projects = function (_React$Component) {
    (0, _inherits3.default)(Projects, _React$Component);

    function Projects() {
        (0, _classCallCheck3.default)(this, Projects);
        return (0, _possibleConstructorReturn3.default)(this, (Projects.__proto__ || (0, _getPrototypeOf2.default)(Projects)).apply(this, arguments));
    }

    (0, _createClass3.default)(Projects, [{
        key: 'render',
        value: function render() {

            var teamProject = [];
            this.props.projects.map(function (el) {
                teamProject.push(el.name);
            });
            var displayProject = this.props.listProject.filter(function (val) {
                return teamProject.indexOf(val.project) != -1;
            });
            return _react2.default.createElement(
                'div',
                { className: 'projects_on_team' },
                _react2.default.createElement(
                    'div',
                    null,
                    displayProject.slice(0, 3).map(function (el, index) {
                        return _react2.default.createElement(
                            'span',
                            { key: index, className: 'pro_team' },
                            _react2.default.createElement(
                                'span',
                                null,
                                el.project
                            )
                        );
                    })
                )
            );
        }
    }]);
    return Projects;
}(_react2.default.Component);

var Skills = function (_React$Component2) {
    (0, _inherits3.default)(Skills, _React$Component2);

    function Skills() {
        (0, _classCallCheck3.default)(this, Skills);
        return (0, _possibleConstructorReturn3.default)(this, (Skills.__proto__ || (0, _getPrototypeOf2.default)(Skills)).apply(this, arguments));
    }

    (0, _createClass3.default)(Skills, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'div',
                    { className: 'skills_te_on' },
                    this.props.skills.slice(0, 3).map(function (el, index) {
                        return _react2.default.createElement(
                            'span',
                            { key: index, className: 'skill_team_on' },
                            el.name
                        );
                    })
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'skills_te' },
                    this.props.skills.slice(3, 5).map(function (el, index) {
                        return _react2.default.createElement(
                            'span',
                            { key: index, className: 'skill_team' },
                            el.name
                        );
                    })
                )
            );
        }
    }]);
    return Skills;
}(_react2.default.Component);

var SkillDetail = function (_React$Component3) {
    (0, _inherits3.default)(SkillDetail, _React$Component3);

    function SkillDetail() {
        (0, _classCallCheck3.default)(this, SkillDetail);
        return (0, _possibleConstructorReturn3.default)(this, (SkillDetail.__proto__ || (0, _getPrototypeOf2.default)(SkillDetail)).apply(this, arguments));
    }

    (0, _createClass3.default)(SkillDetail, [{
        key: 'render',
        value: function render() {
            var _this4 = this;

            // var fullName=this.props.firstName + this.props.lastName;
            var countryDisplay = this.props.country;
            if (countryDisplay != null) {
                var CountryName = this.props.getCountryByCode(countryDisplay);
            }

            var photo64 = this.props.photoBase64;
            if (photo64 != null) {
                var photoDisplay = photo64;
            } else {
                var photoDisplay = 'iVBORw0KGgoAAAANSUhEUgAAAKIAAACjCAYAAAAJrsW+AAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+nhxg7wAACMdJREFUeJztne1v2zYQh3+U/KYkdlt33YcB+8/3520t1jqJbUm2XkjePiju0tRNm1gSyeM9gIECQZwT+JQUyeNR/fnXXwRBcEziOgBBAEREwRNERMELRETBC0REwQtERMELRETBC0REwQtERMELRETBC0REwQtERMELRETBC0REwQtERMELRETBC0REwQtERMELRETBC0REwQtERMELRETBCyauA2ABEUAEou5krlIKOH2EX0JEfAGkNahtQU0D0hrQGmQMYO03IgIPMiYJkCRQk0n3mc26z3Tq8Cn8RER8DiLY4xFUVbBVBWrbF/wqdYICoKb55mdqOkWyWEBlGZIs6zXkUBERz0BNA1sUsGUJepCp1+9vW5i2BfK8k/L6Guly2fWgkSIiPoLqGma3gz0ex/ubbQuz3cLu90hWK6SrVZTvliIiABDB3N/D5Lm7EKzthCwKpOt1dEN2vGPBA6Q12k+fnEr4GNIa+vNnmO3WdSijErWIZAz0p08vmoSMhdntoDcb12GMRpRDM9U1bFXB5vkgk5G+sGUJTYTJhw+uQxmcqES0RQGz33vZA/4IezjA3N0hXa9dhzIoUYhIxsBsNrBV5TqUV2HyHGo2Q3Jz4zqUwWD/jkhaQ3/8GKyEJ/Tt7dcFco7wFpGom4wwaUB9e+s6hMFgLaL+8oWNhED3vhjS++1LYCsiVdWoOyRjwXV9ka2ImmmD2cOB5bsiSxGpaUB17TqMwbCHg+sQeoeliBwb6jEcXzlYikiBL9X8DKqqLiucEfxEJIJ9kojKDbKW3eyZnYjUNOx6i3OQ1q5D6BV+IhrjOoRRkB7Rc2IRkdsSDjsRuTXQD2H2+iEiBgqnrUuAo4ixID2i4AUioufEchRTRPSciA+phwy7VlMiYpDwa7U0dR2B8ArYiahExCDhJ+IkioOJ7GAn4qkeIXuYrQ7wExGIoxCmiOg/ImJ48BRxNnMdwuBwW6bi9TQPqPncdQjDIz2i/5yKp7NGesQwUIuF6xAGhdt6KVsRE+YiSo8YCNIjhgVfEdOU9+xZRAwHrsOzSlPpEUOC6/CsJhNZvgmJZLFg12AAz3VS1iJCKSRXV66j6B9mM2YggmLu3LbCgK5Yp81zJMsl0jdvXIfTC/xa6RGurzUbEjIGZrtl83xsRTTbLcx+7zqMwTH39yxO9LEUkdoWZrdzHcY4EH13H3SIsBTRlqXrEEaFQ+EpliJyqx0YAyxF5DhTfg4Ozxv+E5yDey7iUxg8L0sRE4Y7Dz+CSxIwSxHVbMZiuPoVuGQY8WwtpdgmPDwlyTLXIfQCTxHBMzHgHEpE9JuEyZD1HMl8ziYvka2IHGaSP0MxyixiK2IMkxVOKW58W0sp1jIm8zmLZZsTfFtKKdbDc8IkD/EEXxHBd2FbTadslm1O8Bbx5sZ1CIMw+e031yH0DmsR1WyG9O1b12H0Srpes9lNeQzfl6gH0jdvoKbT7lZ7IlBVhXV92KMDYMnVFauZ8mPYiwh824Dtx49B3denkoTlUPwU1kPzWQI75xxF9VtEKGJoW2Ic3wfPEZ+IgfUwsSRvxCdiYD0M10JST4lPxIAaNlksWJYXOUccT/kIlabB7LhwXao5R3QiAkCyXLoO4ZdIrq9dhzAacYp4fe397DldLqMZloFIRQSA9P171yE8C7etyZ8RrYhJlnW9joek795F1RsCEYsIdAkEvk0IkixDulq5DmN0ohYRACYfPnjTMyZZhsnvv7sOwwlRJD38jHS9hsoy2P0etqpG//tqMkGyWnnzH8IFIuIDSZYhyTLYsoTebMb928tl1BICMjR/h5MUfAb1DS9FRHyKg9N/HAptXoqI+BSlxr9ejEEN7EsREc8w+q5LQBnjQyEinmPkLG6SHlFEPMvYYhgT/fAc5fINNc2zV0KMfV0EaY3277+BNO3KiCTJ/5VgT/8OLKH3pUQpoj0eYbZb12F8A1kLWAtq2+9+pqZTTP/4w0FU4xHn0BxYQgGnYks/IqwW6YvQZqme5072gYgYAJzL653g/4RnCG4nI7CiAK8hShGD29sVEXkSXI8Y2KvEa+A/HXuEPR5hi+LsEonP2KpCam1ws/2XwF5E0hr2cIAty2DvNaamQfvPP0iur7sTiIGcy34JLEUkY0DHYyfg8eg6nF4ga2HyHCbPoWazrtRelrHZceEjIlEn3kk+xnu31DQwTQOz3Xa3Czxkl4csZfAiUl3DliXs4RDeJKQHbF0DdQ2z3ULN50gWi07KwIbvYEW0RQFTFKC6dh2KN1Bdw9Q1zG7XJUo8iKkWC++3Cf2O7glkDGyedxMPrV2H4zWkdTdRK0sAXZ3FZD6HWiy6KmOerU0GISI1zdcekPO735Ccekvs91Bp2gn5MOHxQUqvRTyt+9nDwXUorCBjQGUJW5Zdmb6rK+fLQl6KaA+Hbgh2cNg9NsiYr8tCyWKBZLl0UobFKxFtWcLkuUxAHGGrCraquouSVqtR6zN6IaItCpj9PritN65Q00BvNlB5jsnbt6OUe3Yqoi3LTsBAt964Q3WN9t9/kdzcYLJeDzqpcSKiPR5hdjsZggPBFgXa4xHp+/eDlWQZVUSqa5j9XmbBAULGQH/+jHS9HqRg1CgiktYw9/ciIAPM3R2gdVfVtkcGF9EWBfTdnSxEM8Ls94BSvdb5HlREc3/fBS2ww+x2UNNpb0s8g6X8ioT80ZtNb8cYBhHR5LlIGAn69raX7+ldRGqa7oVWiAJ7OPSSCdW7iPrLl76/UvCcPlZDehXR5rnkCUZIHxsT/YlI5F2FLWEkepiw9CaiLcuutJoQHX2cFepNRFMUfX2VEBjUthfL2IuIpLUkMMTOhXODfkSUTOrouTSXtB8RJZ8werwYmgXh0mW7fkT04Dii4BjpEQUfkKFZ8AMRUfCB0z0xr0VEFPqB6KKdNRFR6A8RUfACEVHwgUuu+xURhf4QEQUvcC6inFkWAPciSkKsAFzmgbrkBfPrlyiVARi+dpngOwcielVi6n9kw3bQ3Qw6JQAAAABJRU5ErkJggg==';
            }

            return _react2.default.createElement(
                'div',
                { className: 'order-detail' },
                _react2.default.createElement(
                    'div',
                    { className: 'div1_team' },
                    _react2.default.createElement(
                        'div',
                        { className: 'image_team' },
                        _react2.default.createElement('img', { src: "data:image/jpeg;base64," + photoDisplay })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'out_team' },
                        _react2.default.createElement(
                            'div',
                            { className: 'all_info' },
                            _react2.default.createElement(
                                'div',
                                { className: 'name_te' },
                                _react2.default.createElement(
                                    'span',
                                    { className: 'squa' },
                                    '['
                                ),
                                this.props.name,
                                '\xA0',
                                _react2.default.createElement(
                                    'span',
                                    { className: 'squa' },
                                    ']'
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'job_te' },
                                this.props.job,
                                '\xA0'
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'country_te' },
                                CountryName,
                                '\xA0'
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'since_team' },
                    _react2.default.createElement(
                        'div',
                        { className: 'since_in' },
                        'Manaty member since:',
                        this.props.sinceDate,
                        '\xA0'
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'div2_team' },
                    _react2.default.createElement(
                        'div',
                        { className: 'email_in' },
                        _react2.default.createElement(
                            'div',
                            { className: 'name_mail' },
                            this.props.email || "",
                            '\xA0',
                            _react2.default.createElement('div', { className: 'mail_team' })
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'name_skype' },
                            this.props.skypeId || "",
                            '\xA0',
                            _react2.default.createElement('div', { className: 'skype_team' })
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'div3_team' },
                    _react2.default.createElement(
                        'div',
                        { className: 'skill_in' },
                        _react2.default.createElement(
                            'div',
                            null,
                            _react2.default.createElement(
                                'span',
                                { className: 'star_one' },
                                _react2.default.createElement('i', { className: 'fa fa-star' })
                            ),
                            _react2.default.createElement(
                                'span',
                                { className: 'top_skills' },
                                'TOP 5 SKILLS'
                            ),
                            _react2.default.createElement(
                                'span',
                                { className: 'star_two' },
                                _react2.default.createElement('i', { className: 'fa fa-star' })
                            )
                        ),
                        _react2.default.createElement(Skills, { skills: this.props.skills }),
                        _react2.default.createElement(
                            'div',
                            { className: 'sub_te' },
                            'LAST MANATY PROJECTS:'
                        ),
                        _react2.default.createElement(Projects, { projects: this.props.projects, listProject: this.props.listProject })
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'div4_team' },
                    _react2.default.createElement(
                        'div',
                        { className: 'btn_team', onClick: function onClick() {
                                return _this4.props.viewProfile(_this4.props.username);
                            } },
                        'See profile'
                    )
                )
            );
        }
    }]);
    return SkillDetail;
}(_react2.default.Component);

var UserTeamInfo = function (_Component) {
    (0, _inherits3.default)(UserTeamInfo, _Component);

    function UserTeamInfo(props) {
        (0, _classCallCheck3.default)(this, UserTeamInfo);

        var _this5 = (0, _possibleConstructorReturn3.default)(this, (UserTeamInfo.__proto__ || (0, _getPrototypeOf2.default)(UserTeamInfo)).call(this, props));

        _this5.state = {
            showFrozen: false,
            amount: 0,
            users: [],
            email: "",
            map: null,
            countryDisplay: "",
            toLowerCase: "",
            render: false,
            allUsers: [],
            fieldSearch: '',
            class1: 'list',
            class2: 'vig1',
            tabDisplay: true,
            country: {},
            countryChange: "",
            jobChange: "",
            skillsChange: ""
        };

        _this5.getCountryByCode = _this5.getCountryByCode.bind(_this5);
        _this5.viewProfile = _this5.viewProfile.bind(_this5);
        // this.backAllProfiles = this.backAllProfiles.bind(this);
        return _this5;
    }

    (0, _createClass3.default)(UserTeamInfo, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            _UserStore2.default.bindUpdateHandler(this.userDetailOnUpdate.bind(this));

            /********Search********/
            var allUser = this.props.users;
            this.setState({
                allUser: allUser,
                userSearch: allUser
            });
        }
    }, {
        key: 'componentWillUnMount',
        value: function componentWillUnMount() {
            _UserStore2.default.bindUpdateHandler(this.userDetailOnUpdate.bind(this));
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {}
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
            return true;
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps() {}
    }, {
        key: 'userDetailOnUpdate',
        value: function userDetailOnUpdate(response) {
            console.log("user On Update");
            console.log(response);
            var result = response.result,
                message = response.message;

            if (message == "user_detail_success" || message == "user_profile_detail_success") {
                this.setState({
                    userInfo: result
                });
            }
            this.state;
        }
    }, {
        key: 'viewProfile',
        value: function viewProfile(username) {
            (0, _UserProfileAction.userDetail)(username);
        }
    }, {
        key: 'getCountryByCode',
        value: function getCountryByCode(code) {
            if (code != null) {
                var all_countries = this.props.countryAll;
                var _country = all_countries.filter(function (c) {
                    return c.value.toLowerCase() == code.toLowerCase();
                });
                return _country[0].label;
            }
        }
    }, {
        key: 'renderSkills',
        value: function renderSkills(object) {
            if (object) {
                var skill = object.slice(0, 5).map(function (val) {
                    return _react2.default.createElement(
                        'div',
                        null,
                        val.name
                    );
                });
                return skill;
            }
        }
    }, {
        key: 'renderProject',
        value: function renderProject(projectUser) {
            var allProject = this.props.projectInfo;
            var listProject = [];
            allProject.map(function (el) {
                var singleObj = {};
                singleObj["project"] = el.code;
                singleObj["dateEnd"] = el.dateEnd;
                listProject.push(singleObj);
            });
            listProject.sort(function (a, b) {
                var x = a.dateEnd;
                var y = b.dateEnd;
                if (x < y) {
                    return 1;
                }
                if (x > y) {
                    return -1;
                }
                return 0;
            });

            var teamProject = [];
            projectUser.map(function (el) {
                teamProject.push(el.name);
            });

            var listProjectUser = listProject.filter(function (val) {
                return teamProject.indexOf(val.project) != -1;
            });

            if (listProjectUser) {
                var displayProject = listProjectUser.slice(0, 5).map(function (val) {
                    return _react2.default.createElement(
                        'div',
                        null,
                        val.project
                    );
                });
                return displayProject;
            }
        }
    }, {
        key: 'renderViewProfile',
        value: function renderViewProfile() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_SeeProfile2.default, (0, _extends3.default)({ parent: this, backAllProfiles: this.props.backAllProfiles,
                    userInfo: this.state.userInfo }, this.state, {
                    baseData: this.props.baseData }, this.props, { countryAll: this.props.countryAll }))
            );
        }
    }, {
        key: 'searchSkills',
        value: function searchSkills(event) {
            var _this6 = this;

            var allUsers = this.props.users;
            if (allUsers != null) {
                var searchInput = event.target.value,
                    displayedContacts = allUsers.filter(function (el) {
                    return el.skills.some(function (e) {
                        var searchValue = e.name != null ? e.name.toLowerCase() : "";
                        var searchValueCountry = el.country != null ? _this6.getCountryByCode(el.country).toLowerCase() : '';
                        var searchValueJob = el.job != null ? el.job.toLowerCase() : "";

                        return searchValue.indexOf(searchInput.toLowerCase()) !== -1 && searchValueCountry.indexOf(_this6.state.countryChange.toLowerCase()) !== -1 && searchValueJob.indexOf(_this6.state.jobChange.toLowerCase()) !== -1;
                    });
                });
                this.setState({
                    skillsChange: searchInput
                });
                this.setState({
                    userSearch: displayedContacts
                });
            }
        }
    }, {
        key: 'searchJob',
        value: function searchJob(event) {
            var _this7 = this;

            var allUsers = this.props.users;
            if (allUsers != null) {
                var searchInput = event.target.value,
                    displayedContacts = allUsers.filter(function (el) {
                    var searchValue = el.job != null ? el.job.toLowerCase() : "";
                    var searchValueCountry = el.country != null ? _this7.getCountryByCode(el.country).toLowerCase() : '';

                    return searchValue.indexOf(searchInput.toLowerCase()) !== -1 && searchValueCountry.indexOf(_this7.state.countryChange.toLowerCase()) !== -1 && el.skills.some(function (e) {
                        var searchValue = e.name != null ? e.name.toLowerCase() : "";
                        return searchValue.indexOf(_this7.state.skillsChange.toLowerCase()) !== -1;
                    });
                });
                this.setState({
                    jobChange: searchInput
                });
                this.setState({
                    userSearch: displayedContacts
                });
            }
        }
    }, {
        key: 'searchCountry',
        value: function searchCountry(event) {
            var _this8 = this;

            var allUsers = this.props.users;
            if (allUsers != null) {
                var searchInput = event.target.value,
                    displayedContacts = allUsers.filter(function (el) {
                    var searchValueJob = el.job != null ? el.job.toLowerCase() : "";

                    var searchValue = el.country != null ? _this8.getCountryByCode(el.country).toLowerCase() : '';

                    return searchValue.indexOf(searchInput.toLowerCase()) !== -1 && searchValueJob.indexOf(_this8.state.jobChange.toLowerCase()) !== -1 && el.skills.some(function (e) {
                        var searchValue = e.name != null ? e.name.toLowerCase() : "";
                        return searchValue.indexOf(_this8.state.skillsChange.toLowerCase()) !== -1;
                    });
                });
                this.setState({
                    countryChange: searchInput
                });
                this.setState({
                    userSearch: displayedContacts
                });
            }
        }
    }, {
        key: 'searchAll',
        value: function searchAll(event) {
            var _this9 = this;

            var allUsers = this.props.users;
            if (allUsers != null) {
                var searchInput = event.target.value,
                    displayedContacts = allUsers.filter(function (el) {
                    var searchValueName = el.name != null ? el.name.toLowerCase() : "";

                    var searchValueEmail = el.email != null ? el.email.toLowerCase() : "";

                    var searchValueSkype = el.skypeId != null ? el.skypeId.toLowerCase() : "";

                    var searchValueSinceDate = el.sinceDate != null ? el.sinceDate.toLowerCase() : "";

                    var searchValueJob = el.job != null ? el.job.toLowerCase() : "";

                    var searchValueCountry = el.country != null ? _this9.getCountryByCode(el.country).toLowerCase() : '';

                    return searchValueName.indexOf(searchInput.toLowerCase()) !== -1 || searchValueEmail.indexOf(searchInput.toLowerCase()) !== -1 || searchValueSkype.indexOf(searchInput.toLowerCase()) !== -1 || searchValueSinceDate.indexOf(searchInput.toLowerCase()) !== -1 || searchValueJob.indexOf(searchInput.toLowerCase()) !== -1 || searchValueCountry.indexOf(searchInput.toLowerCase()) !== -1 || el.skills.some(function (e) {
                        var searchValueSkills = e.name != null ? e.name.toLowerCase() : "";
                        return searchValueSkills.indexOf(searchInput.toLowerCase()) !== -1;
                    }) || el.projects.some(function (e) {
                        var searchValueProjects = e.name != null ? e.name.toLowerCase() : "";
                        return searchValueProjects.indexOf(searchInput.toLowerCase()) !== -1;
                    });
                });
                this.setState({
                    userSearch: displayedContacts
                });
            }
        }
    }, {
        key: 'onChange',
        value: function onChange(event) {
            this.setState({ fieldSearch: event.target.value });
        }
    }, {
        key: 'changeCountry',
        value: function changeCountry(name, e) {
            var state = this.state;
            state['country'][name] = e.target.value;
            this.setState(state);
        }
    }, {
        key: 'renderTeamVig',
        value: function renderTeamVig() {
            var _this10 = this;

            var allUser = this.props.users;
            var allProject = this.props.projectInfo ? this.props.projectInfo : [];
            var listProject = [];
            if (allProject != null) {
                allProject.map(function (el) {
                    var singleObj = {};
                    singleObj["project"] = el.code;
                    singleObj["dateEnd"] = el.dateEnd;
                    listProject.push(singleObj);
                });
            }

            listProject.sort(function (a, b) {
                var x = a.dateEnd;
                var y = b.dateEnd;
                if (x < y) {
                    return 1;
                }
                if (x > y) {
                    return -1;
                }
                return 0;
            });
            if (this.props.users) {
                var allUserSearch = this.state.userSearch ? this.state.userSearch : this.props.users;
                var detailTags = allUserSearch.map(function (e, index) {
                    return _react2.default.createElement(SkillDetail, {
                        listProject: listProject,
                        photoBase64: e.photoBase64,
                        firstName: e.firstName,
                        lastName: e.lastName,
                        name: e.name,
                        username: e.username,
                        country: e.country,
                        job: e.job,
                        viewProfile: _this10.viewProfile,
                        view_log: _this10.view_log,
                        getCountryByCode: _this10.getCountryByCode,
                        sinceDate: e.sinceDate,
                        email: e.email || "",
                        skypeId: e.skypeId || "",
                        skills: e.skills,
                        projects: e.projects });
                });
            }

            return _react2.default.createElement(
                'div',
                { className: 'order', id: 'hidingScrollBar' },
                _react2.default.createElement(
                    'div',
                    { className: 'hideScrollBar' },
                    detailTags
                ),
                _react2.default.createElement('div', { className: 'clear' })
            );
        }
    }, {
        key: 'renderTeamList',
        value: function renderTeamList() {
            var _this11 = this;

            if (this.props.users) {
                var allUserSearch = this.state.userSearch ? this.state.userSearch : this.props.users;
            }
            var columns = [{
                Header: _react2.default.createElement(
                    'span',
                    null,
                    'Name ',
                    _react2.default.createElement('i', { className: 'wd-sort-icon' })
                ),
                accessor: 'name'
            }, {
                Header: _react2.default.createElement(
                    'span',
                    null,
                    'Job ',
                    _react2.default.createElement('i', { className: 'wd-sort-icon' })
                ),
                accessor: 'job'
            }, {
                Header: _react2.default.createElement(
                    'span',
                    null,
                    'Country ',
                    _react2.default.createElement('i', { className: 'wd-sort-icon' })
                ),
                accessor: 'country',
                Cell: function Cell(props) {
                    return _this11.getCountryByCode(props.row.country);
                }
            }, {
                Header: _react2.default.createElement(
                    'span',
                    null,
                    'Member since ',
                    _react2.default.createElement('i', { className: 'wd-sort-icon' })
                ),
                accessor: 'sinceDate'
            }, {
                Header: _react2.default.createElement(
                    'span',
                    null,
                    'Mail ',
                    _react2.default.createElement('i', { className: 'wd-sort-icon' })
                ),
                accessor: 'email'
            }, {
                Header: _react2.default.createElement(
                    'span',
                    null,
                    'Skype ',
                    _react2.default.createElement('i', { className: 'wd-sort-icon' })
                ),
                accessor: 'skypeId'

            }, {
                Header: _react2.default.createElement(
                    'span',
                    null,
                    'Top 5 Skills ',
                    _react2.default.createElement('i', { className: 'wd-sort-icon' })
                ),
                accessor: 'skills',
                Cell: function Cell(props) {
                    return _this11.renderSkills(props.row.skills);
                }
            }, {
                Header: _react2.default.createElement(
                    'span',
                    null,
                    'Last Manaty projects',
                    _react2.default.createElement('i', { className: 'wd-sort-icon' })
                ),
                accessor: 'projects',
                Cell: function Cell(props) {
                    return _this11.renderProject(props.row.projects);
                }
            }, {
                Header: _react2.default.createElement(
                    'span',
                    null,
                    'See full profile'
                ),
                accessor: 'username',
                Cell: function Cell(props) {
                    return _react2.default.createElement(
                        'button',
                        {
                            style: {
                                backgroundColor: '#1d9c9c',
                                color: 'white'
                            },
                            onClick: function onClick() {
                                return _this11.viewProfile(props.row.username);
                            }
                        },
                        'See profile'
                    );
                }
            }];

            return _react2.default.createElement(
                'div',
                { className: 'order' },
                _react2.default.createElement(
                    'div',
                    { className: 'hideScrollBar' },
                    _react2.default.createElement(
                        'div',
                        { className: 'team-react-table' },
                        _react2.default.createElement(_reactTable2.default, {
                            className: 'react-table -striped -highlight',
                            data: allUserSearch,
                            columns: columns,
                            showPagination: false,
                            showPageSizeOptions: true,
                            pageSizeOptions: [5, 10, 20, 25, 50, 100],
                            defaultPageSize: 20,
                            showPageJump: true,
                            sortable: true,
                            resizable: true,
                            minRows: 3,
                            defaultSorted: [{
                                id: 'username',
                                desc: true
                            }],
                            defaultFilterMethod: function defaultFilterMethod(filter, row) {
                                return row[filter.id] !== null ? String(row[filter.id].toString().toLowerCase()).indexOf(filter.value.toString().toLowerCase()) != -1 : false;
                            },
                            style: {
                                height: "100%" // This will force the table body to overflow and scroll, since there is not enough room
                            }
                        })
                    )
                ),
                _react2.default.createElement('div', { className: 'clear' })
            );
        }
    }, {
        key: 'tabChanged',
        value: function tabChanged(event) {
            event.preventDefault();
            var state = this.state;
            state['showFrozen'] = false;
            this.setState(state);
        }
    }, {
        key: 'handleClick1',
        value: function handleClick1() {
            if (this.state.class1 == 'list' && this.state.class2 == 'vig1' && this.state.tabDisplay == true) {
                this.setState({
                    class1: 'list1',
                    class2: 'vig',
                    tabDisplay: false
                });
            }
        }
    }, {
        key: 'handleClick2',
        value: function handleClick2() {
            if (this.state.class1 == 'list1' && this.state.class2 == 'vig' && this.state.tabDisplay == false) {
                this.setState({
                    class1: 'list',
                    class2: 'vig1',
                    tabDisplay: true
                });
            }
        }

        //Reset button filter

    }, {
        key: 'resetFilter',
        value: function resetFilter() {
            this.setState({
                userSearch: this.props.users,
                countryChange: '',
                jobChange: '',
                skillsChange: ''
            });
        }
    }, {
        key: 'renderTeam',
        value: function renderTeam() {
            var _this12 = this;

            var all_countries = this.props.baseData.all_countries;

            var allUser = this.props.users;
            var uniqueCountry;
            var uniqueCountrySelect = [];

            if (allUser) {
                uniqueCountry = [].concat((0, _toConsumableArray3.default)(new _set2.default(allUser.map(function (item) {
                    return item.country;
                }))));
            }

            if (uniqueCountry != null) {
                uniqueCountrySelect = uniqueCountry.filter(function (el) {
                    return el != "" && el != null && el != "UK";
                });
            }

            uniqueCountrySelect.sort();

            var uniqueJob = allUser ? [].concat((0, _toConsumableArray3.default)(new _set2.default(allUser.map(function (item) {
                return item.job;
            })))) : [];
            var uniqueJobSelect = uniqueJob.filter(function (el) {
                return el != "" && el != null;
            });

            uniqueJobSelect.sort();

            var uniqueSkills = [];
            if (allUser) {
                var allSkills = allUser.map(function (item) {
                    return item.skills.map(function (item) {
                        return uniqueSkills.push(item.name);
                    });
                });
            }
            var uniqueSkillsAll = [].concat((0, _toConsumableArray3.default)(new _set2.default(uniqueSkills)));
            var uniqueSkillsSelect = uniqueSkillsAll.filter(function (el) {
                return el != "" && el != null;
            });
            uniqueSkillsSelect.sort();

            return _react2.default.createElement(
                'div',
                { className: 'row' },
                _react2.default.createElement(
                    'div',
                    { className: 'col-xs-12 boder_header' },
                    _react2.default.createElement(
                        'div',
                        { className: 'name_header' },
                        _react2.default.createElement(
                            'span',
                            null,
                            _react2.default.createElement(
                                'label',
                                null,
                                'TEAM'
                            )
                        ),
                        ' > All members'
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'col-xs-12 filter_team' },
                    _react2.default.createElement('span', { className: this.state.class1, onClick: this.handleClick1.bind(this) }),
                    _react2.default.createElement('span', { className: this.state.class2, onClick: this.handleClick2.bind(this) }),
                    _react2.default.createElement(
                        'form',
                        null,
                        _react2.default.createElement(
                            'span',
                            { className: 'filter_by' },
                            'Filter by :'
                        ),
                        _react2.default.createElement(
                            'select',
                            { className: 'select_country', onChange: this.searchCountry.bind(this) },
                            _react2.default.createElement(
                                'option',
                                { value: '', className: 'op_country' },
                                'Country'
                            ),
                            _react2.default.createElement(
                                'option',
                                { value: '' },
                                'All'
                            ),
                            uniqueCountrySelect != null ? uniqueCountrySelect.map(function (el) {
                                return _react2.default.createElement(
                                    'option',
                                    {
                                        value: _this12.getCountryByCode(el) },
                                    _this12.getCountryByCode(el)
                                );
                            }) : null
                        ),
                        _react2.default.createElement(
                            'select',
                            { className: 'select_skill', onChange: this.searchSkills.bind(this) },
                            _react2.default.createElement(
                                'option',
                                { value: '', className: 'op_country' },
                                'Skills'
                            ),
                            _react2.default.createElement(
                                'option',
                                { value: '' },
                                'All'
                            ),
                            uniqueSkillsSelect != null ? uniqueSkillsSelect.map(function (el) {
                                return _react2.default.createElement(
                                    'option',
                                    { value: el },
                                    el
                                );
                            }) : null
                        ),
                        _react2.default.createElement(
                            'select',
                            { className: 'select_job', onChange: this.searchJob.bind(this) },
                            _react2.default.createElement(
                                'option',
                                { value: '', className: 'op_country' },
                                'Job'
                            ),
                            _react2.default.createElement(
                                'option',
                                { value: '' },
                                'All'
                            ),
                            uniqueJobSelect != null ? uniqueJobSelect.map(function (el) {
                                return _react2.default.createElement(
                                    'option',
                                    { value: el },
                                    el
                                );
                            }) : null
                        ),
                        _react2.default.createElement(
                            'button',
                            { className: 'cancel_filter', onClick: this.resetFilter.bind(this), type: 'reset' },
                            'Cancel all filters'
                        ),
                        _react2.default.createElement(
                            'span',
                            { className: 'relative_te' },
                            _react2.default.createElement('input', { type: 'string', className: 'input_team', placeholder: 'Search',
                                onChange: this.searchAll.bind(this) }),
                            _react2.default.createElement('span', {
                                className: 'search_icon' })
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'col-xs-12 team_page' },
                    this.state.tabDisplay == true ? this.renderTeamVig() : this.renderTeamList()
                )
            );
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'container-fluid team_manaty' },
                this.props.userInfo == null ? this.renderTeam() : this.renderViewProfile()
            );
        }
    }]);
    return UserTeamInfo;
}(_react.Component);

exports.default = UserTeamInfo;

/***/ }),

/***/ "./src/meveo/services/BaseService.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _classCallCheck2 = __webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__("./node_modules/babel-runtime/helpers/createClass.js");

var _createClass3 = _interopRequireDefault(_createClass2);

var _MeveoAPI = __webpack_require__("./src/meveo/MeveoAPI.js");

var _MeveoAPI2 = _interopRequireDefault(_MeveoAPI);

var _LocalStorageService = __webpack_require__("./src/meveo/services/LocalStorageService.js");

var _LocalStorageService2 = _interopRequireDefault(_LocalStorageService);

var _properties = __webpack_require__("./src/properties.js");

var properties = _interopRequireWildcard(_properties);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BaseService = function () {
    function BaseService(provider) {
        (0, _classCallCheck3.default)(this, BaseService);

        this.provider = provider || properties.provider;
        this.useMockup = false;
    }

    (0, _createClass3.default)(BaseService, [{
        key: 'notifyActionSuccess',
        value: function notifyActionSuccess(action, entity) {
            console.log("successfully " + action + " entity " + entity);
        }
    }, {
        key: 'notifyActionFailure',
        value: function notifyActionFailure(action, entity) {
            console.log("failed " + action + " entity " + entity);
        }
    }, {
        key: 'forgotPassword',
        value: function forgotPassword(email, callback) {
            var _this = this;

            this.meveoAPI.forgotPassword(email).then(function (response) {
                if (callback) {
                    callback('success', response);
                }
            }, function (error) {
                _this.dataList.pop();
                if (callback) {
                    callback('error', error);
                }
            });
        }
    }, {
        key: 'login',
        value: function login(data, callback) {
            var _this2 = this;

            //console.log("data login: "+JSON.stringify(data));
            _LocalStorageService2.default.setCredentials(data);
            this.meveoAPI.find_user(data.username).then(function (response) {
                if (callback) {
                    callback('success', response);
                }
            }, function (error) {
                _this2.dataList.pop();
                if (callback) {
                    callback('error', error);
                }
            });
        }
    }, {
        key: 'contact',
        value: function contact(data, callback) {
            var _this3 = this;

            console.log("data contact: " + data);
            this.meveoAPI.contact(data).then(function (response) {
                if (callback) {
                    callback('success', response);
                }
            }, function (error) {
                _this3.dataList.pop();
                if (callback) {
                    callback('error', error);
                }
            });
        }
    }, {
        key: 'findUser',
        value: function findUser(code, callback) {
            this.meveoAPI.find_user(code).then(function (response) {
                if (callback) {
                    callback('success', response);
                }
            }, function (error) {
                if (callback) {
                    callback('error', error);
                }
            });
        }
    }, {
        key: 'getUserDetailsByUserName',
        value: function getUserDetailsByUserName(username, callback) {
            this.meveoAPI.find_user_details(username).then(function (response) {
                if (callback) {
                    callback('success', response);
                }
            }, function (error) {
                if (callback) {
                    callback('error', error);
                }
            });
        }
    }, {
        key: 'editUser',
        value: function editUser(userData, callback) {
            this.meveoAPI.edit_profile_user(userData).then(function (response) {
                if (callback) {
                    callback('success', response);
                }
            }, function (error) {
                if (callback) {
                    callback('error', error);
                }
            });
        }
    }, {
        key: 'editImageUser',
        value: function editImageUser(userData, callback) {
            this.meveoAPI.edit_image_user(userData).then(function (response) {
                if (callback) {
                    callback('success', response);
                }
            }, function (error) {
                if (callback) {
                    callback('error', error);
                }
            });
        }
    }, {
        key: 'getCountries',
        value: function getCountries(byUser, callback) {
            this.meveoAPI.get_countries(byUser).then(function (response) {
                if (callback) {
                    callback('success', response);
                }
            }, function (error) {
                if (callback) {
                    callback('error', error);
                }
            });
        }
    }, {
        key: 'editSkillsUser',
        value: function editSkillsUser(userData, callback) {
            this.meveoAPI.edit_skills_user(userData).then(function (response) {
                if (callback) {
                    callback('success', response);
                }
            }, function (error) {
                if (callback) {
                    callback('error', error);
                }
            });
        }
    }, {
        key: 'editProjectsUser',
        value: function editProjectsUser(userData, callback) {
            this.meveoAPI.edit_projects_user(userData).then(function (response) {
                if (callback) {
                    callback('success', response);
                }
            }, function (error) {
                if (callback) {
                    callback('error', error);
                }
            });
        }
    }, {
        key: 'editAvailabilityUser',
        value: function editAvailabilityUser(userData, callback) {
            this.meveoAPI.edit_availability_user(userData).then(function (response) {
                if (callback) {
                    callback('success', response);
                }
            }, function (error) {
                if (callback) {
                    callback('error', error);
                }
            });
        }
    }, {
        key: 'editBioUser',
        value: function editBioUser(userData, callback) {
            this.meveoAPI.edit_bio_user(userData).then(function (response) {
                if (callback) {
                    callback('success', response);
                }
            }, function (error) {
                if (callback) {
                    callback('error', error);
                }
            });
        }
    }, {
        key: 'downloadImageFile',
        value: function downloadImageFile(username, callback) {
            this.meveoAPI.download_image_file(username).then(function (response) {
                if (callback) {
                    callback('success', response);
                }
            }, function (error) {
                if (callback) {
                    callback('error', error);
                }
            });
        }
    }, {
        key: 'uploadImageFile',
        value: function uploadImageFile(username, callback) {
            this.meveoAPI.upload_file(username).then(function (response) {
                if (callback) {
                    callback('success', response);
                }
            }, function (error) {
                if (callback) {
                    callback('error', error);
                }
            });
        }
    }, {
        key: 'downloadCVFile',
        value: function downloadCVFile(username, callback) {
            this.meveoAPI.download_CV_file(username).then(function (response) {
                if (callback) {
                    callback('success', response);
                }
            }, function (error) {
                if (callback) {
                    callback('error', error);
                }
            });
        }
    }, {
        key: 'uploadCVFile',
        value: function uploadCVFile(username, callback) {
            this.meveoAPI.upload_file_CV(username).then(function (response) {
                if (callback) {
                    callback('success', response);
                }
            }, function (error) {
                if (callback) {
                    callback('error', error);
                }
            });
        }
    }, {
        key: 'getAllUsers',
        value: function getAllUsers(callback) {
            this.meveoAPI.find_all_users().then(function (response) {
                if (callback) {
                    callback('success', response);
                }
            }, function (error) {
                if (callback) {
                    callback('error', error);
                }
            });
        }
    }, {
        key: 'getAllProject',
        value: function getAllProject(callback) {
            this.meveoAPI.find_all_project().then(function (response) {
                if (callback) {
                    callback('success', response);
                }
            }, function (error) {
                if (callback) {
                    callback('error', error);
                }
            });
        }
    }, {
        key: 'getProjectDetailsByCode',
        value: function getProjectDetailsByCode(projectName, callback) {
            this.meveoAPI.find_project_details(projectName).then(function (response) {
                if (callback) {
                    callback('success', response);
                }
            }, function (error) {
                if (callback) {
                    callback('error', error);
                }
            });
        }
    }, {
        key: 'editClientProject',
        value: function editClientProject(userData, callback) {
            this.meveoAPI.edit_client_project(userData).then(function (response) {
                if (callback) {
                    callback('success', response);
                }
            }, function (error) {
                if (callback) {
                    callback('error', error);
                }
            });
        }
    }, {
        key: 'editAssemblaProject',
        value: function editAssemblaProject(userData, callback) {
            this.meveoAPI.edit_assembla_project(userData).then(function (response) {
                if (callback) {
                    callback('success', response);
                }
            }, function (error) {
                if (callback) {
                    callback('error', error);
                }
            });
        }
    }, {
        key: 'uploadImageProject',
        value: function uploadImageProject(username, callback) {
            this.meveoAPI.upload_image_project(username).then(function (response) {
                if (callback) {
                    callback('success', response);
                }
            }, function (error) {
                if (callback) {
                    callback('error', error);
                }
            });
        }
    }, {
        key: 'editTeamProject',
        value: function editTeamProject(userData, callback) {
            this.meveoAPI.edit_teams_project(userData).then(function (response) {
                if (callback) {
                    callback('success', response);
                }
            }, function (error) {
                if (callback) {
                    callback('error', error);
                }
            });
        }
    }, {
        key: 'addProjectForUser',
        value: function addProjectForUser(userData, callback) {
            this.meveoAPI.add_project_foruser(userData).then(function (response) {
                if (callback) {
                    callback('success', response);
                }
            }, function (error) {
                if (callback) {
                    callback('error', error);
                }
            });
        }
    }, {
        key: 'editPassword',
        value: function editPassword(userData, callback) {
            this.meveoAPI.edit_password(userData).then(function (response) {
                if (callback) {
                    callback('success', response);
                }
            }, function (error) {
                if (callback) {
                    callback('error', error);
                }
            });
        }
    }, {
        key: 'meveoAPI',
        get: function get() {
            //return new MeveoAPI(properties.meveo_path, LocalStorageService.getCredentials(), this.provider);
            return new _MeveoAPI2.default(properties.keycloak_path, properties.meveo_path, _LocalStorageService2.default.getToken(), this.provider);
        }
    }, {
        key: 'meveoAPI_selfWS',
        get: function get() {
            return new _MeveoAPI2.default(properties.meveo_path, _LocalStorageService2.default.getSelfCredentials(), this.provider);
        }
    }]);
    return BaseService;
}();

exports.default = BaseService;

/***/ }),

/***/ "./src/meveo/services/CommonService.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _promise = __webpack_require__("./node_modules/babel-runtime/core-js/promise.js");

var _promise2 = _interopRequireDefault(_promise);

var _getPrototypeOf = __webpack_require__("./node_modules/babel-runtime/core-js/object/get-prototype-of.js");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__("./node_modules/babel-runtime/helpers/createClass.js");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__("./node_modules/babel-runtime/helpers/possibleConstructorReturn.js");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = __webpack_require__("./node_modules/babel-runtime/helpers/get.js");

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = __webpack_require__("./node_modules/babel-runtime/helpers/inherits.js");

var _inherits3 = _interopRequireDefault(_inherits2);

var _CrudService2 = __webpack_require__("./src/meveo/services/CrudService.js");

var _CrudService3 = _interopRequireDefault(_CrudService2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CommonService = function (_CrudService) {
	(0, _inherits3.default)(CommonService, _CrudService);

	function CommonService() {
		(0, _classCallCheck3.default)(this, CommonService);
		return (0, _possibleConstructorReturn3.default)(this, (CommonService.__proto__ || (0, _getPrototypeOf2.default)(CommonService)).call(this));
	}

	(0, _createClass3.default)(CommonService, [{
		key: 'forgotPassword',
		value: function forgotPassword(email) {
			var _this2 = this;

			return new _promise2.default(function (resolve, reject) {
				(0, _get3.default)(CommonService.prototype.__proto__ || (0, _getPrototypeOf2.default)(CommonService.prototype), 'forgotPassword', _this2).call(_this2, email, function (code, response) {
					code == 'success' ? resolve(response) : reject(response);
				});
			});
		}
	}, {
		key: 'login',
		value: function login(data) {
			var _this3 = this;

			return new _promise2.default(function (resolve, reject) {
				(0, _get3.default)(CommonService.prototype.__proto__ || (0, _getPrototypeOf2.default)(CommonService.prototype), 'login', _this3).call(_this3, data, function (code, response) {
					code == 'success' ? resolve(response) : reject(response);
				});
			});
		}
	}, {
		key: 'checkLogin',
		value: function checkLogin() {
			if (localStorage.username) {
				return true;
			} else {
				return false;
			}
		}
	}, {
		key: 'resetPassword',
		value: function resetPassword(password) {
			var _this4 = this;

			return new _promise2.default(function (resolve, reject) {
				(0, _get3.default)(CommonService.prototype.__proto__ || (0, _getPrototypeOf2.default)(CommonService.prototype), 'resetPassword', _this4).call(_this4, password, function (code, response) {
					code == 'success' ? resolve(response) : reject(response);
				});
			});
		}
	}, {
		key: 'contact',
		value: function contact(data) {
			var _this5 = this;

			return new _promise2.default(function (resolve, reject) {
				(0, _get3.default)(CommonService.prototype.__proto__ || (0, _getPrototypeOf2.default)(CommonService.prototype), 'contact', _this5).call(_this5, data, function (code, response) {
					code == 'success' ? resolve(response) : reject(response);
				});
			});
		}
	}, {
		key: 'findUser',
		value: function findUser(code) {
			var _this6 = this;

			return new _promise2.default(function (resolve, reject) {
				(0, _get3.default)(CommonService.prototype.__proto__ || (0, _getPrototypeOf2.default)(CommonService.prototype), 'findUser', _this6).call(_this6, code, function (code, response) {
					code == 'success' ? resolve(response) : reject(response);
				});
			});
		}
	}]);
	return CommonService;
}(_CrudService3.default);

exports.default = CommonService;

/***/ }),

/***/ "./src/meveo/services/CrudService.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _getIterator2 = __webpack_require__("./node_modules/babel-runtime/core-js/get-iterator.js");

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _getPrototypeOf = __webpack_require__("./node_modules/babel-runtime/core-js/object/get-prototype-of.js");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__("./node_modules/babel-runtime/helpers/createClass.js");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__("./node_modules/babel-runtime/helpers/possibleConstructorReturn.js");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__("./node_modules/babel-runtime/helpers/inherits.js");

var _inherits3 = _interopRequireDefault(_inherits2);

var _BaseService2 = __webpack_require__("./src/meveo/services/BaseService.js");

var _BaseService3 = _interopRequireDefault(_BaseService2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CrudService = function (_BaseService) {
	(0, _inherits3.default)(CrudService, _BaseService);

	function CrudService(entityClass) {
		(0, _classCallCheck3.default)(this, CrudService);

		var _this = (0, _possibleConstructorReturn3.default)(this, (CrudService.__proto__ || (0, _getPrototypeOf2.default)(CrudService)).call(this));

		_this.entityClass = entityClass;
		_this.dataListListeners = [];
		_this.dataList = [];
		// console.log("created CrudService")
		return _this;
	}

	(0, _createClass3.default)(CrudService, [{
		key: "registerDatalistListener",
		value: function registerDatalistListener(listener) {
			this.dataListListeners.push(listener);
			console.log("registered listener");
		}
	}, {
		key: "notifyDatalistUpdate",
		value: function notifyDatalistUpdate() {
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = (0, _getIterator3.default)(this.dataListListeners), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var listener = _step.value;

					console.log("notify listener");
					listener.datalistUpdated();
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}
		}
	}, {
		key: "listAll",
		value: function listAll(listUrl) {
			var _this2 = this;

			console.log("listAll " + listUrl);
			this.meveoAPI.fetch(listUrl, "GET").then(function (entityList) {
				console.log(entityList);
				_this2.dataList = [];
				var _iteratorNormalCompletion2 = true;
				var _didIteratorError2 = false;
				var _iteratorError2 = undefined;

				try {
					for (var _iterator2 = (0, _getIterator3.default)(entityList), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
						var entity = _step2.value;

						_this2.dataList.push(_this2.entityClass.convertFromProperties(entity));
					}
				} catch (err) {
					_didIteratorError2 = true;
					_iteratorError2 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion2 && _iterator2.return) {
							_iterator2.return();
						}
					} finally {
						if (_didIteratorError2) {
							throw _iteratorError2;
						}
					}
				}

				console.log("before notify dataList size=" + _this2.dataList.length);
				_this2.notifyDatalistUpdate();
			});
		}
	}, {
		key: "persist",
		value: function persist(entity, callback) {
			var _this3 = this;

			console.log("create :" + entity.meveoJson);
			this.dataList.push(entity);
			this.meveoAPI_selfWS.createCRMAccountHierarchy(entity).then(function (response) {
				if (callback) {
					callback('success', response);
				}
			}, function (error) {
				_this3.dataList.pop();
				if (callback) {
					callback('error', error);
				}
			});
		}
	}, {
		key: "update",
		value: function update(entity, callback) {
			//console.log("update :" + entity.meveoJson);
			this.meveoAPI.updateCRMAccountHierarchy(entity).then(function (response) {
				if (callback) {
					callback('success', response);
				}
			}, function (error) {
				if (callback) {
					callback('error', error);
				}
			});
		}
	}, {
		key: "updateUser",
		value: function updateUser(entity, callback) {
			//console.log("update :" + entity.meveoJson);
			this.meveoAPI.createOrUpdate(entity).then(function (response) {
				if (callback) {
					callback('success', response);
				}
			}, function (error) {
				if (callback) {
					callback('error', error);
				}
			});
		}
	}, {
		key: "resetPassword",
		value: function resetPassword(pwd, callback) {
			var _this4 = this;

			console.log("password: " + pwd);
			this.meveoAPI.resetPassword(pwd).then(function (response) {
				if (callback) {
					_this4.notifyActionSuccess("reset password");
					callback('success', response);
				}
			}, function (error) {
				_this4.dataList.pop();
				if (callback) {
					_this4.notifyActionFailure("reset password");
					callback('error', error);
				}
			});
		}
	}]);
	return CrudService;
}(_BaseService3.default);

exports.default = CrudService;

/***/ }),

/***/ "./src/meveo/services/CustomerService.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _promise = __webpack_require__("./node_modules/babel-runtime/core-js/promise.js");

var _promise2 = _interopRequireDefault(_promise);

var _getPrototypeOf = __webpack_require__("./node_modules/babel-runtime/core-js/object/get-prototype-of.js");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__("./node_modules/babel-runtime/helpers/createClass.js");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__("./node_modules/babel-runtime/helpers/possibleConstructorReturn.js");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = __webpack_require__("./node_modules/babel-runtime/helpers/get.js");

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = __webpack_require__("./node_modules/babel-runtime/helpers/inherits.js");

var _inherits3 = _interopRequireDefault(_inherits2);

var _User = __webpack_require__("./src/meveo/model/User.js");

var _User2 = _interopRequireDefault(_User);

var _MeveoCustomer = __webpack_require__("./src/meveo/model/MeveoCustomer.js");

var _MeveoCustomer2 = _interopRequireDefault(_MeveoCustomer);

var _MeveoUser = __webpack_require__("./src/meveo/model/MeveoUser.js");

var _MeveoUser2 = _interopRequireDefault(_MeveoUser);

var _CrudService2 = __webpack_require__("./src/meveo/services/CrudService.js");

var _CrudService3 = _interopRequireDefault(_CrudService2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CustomerService = function (_CrudService) {
	(0, _inherits3.default)(CustomerService, _CrudService);

	function CustomerService() {
		(0, _classCallCheck3.default)(this, CustomerService);

		var _this = (0, _possibleConstructorReturn3.default)(this, (CustomerService.__proto__ || (0, _getPrototypeOf2.default)(CustomerService)).call(this, _User2.default));

		_this.useMockup = false;
		if (_this.useMockup) {
			_this.dataList = [new _User2.default({
				id: 1,
				email: "smichea@gmail.com",
				first_name: "Sébastien",
				last_name: "Michéa",
				company: "webdrone",
				tel: "+3487654432",
				skype: "s.skype",
				website: "",
				acccount_status: 'active',
				newsletter: false,
				password: ""
			})];
		}
		// console.log("created CustomerService");
		return _this;
	}

	(0, _createClass3.default)(CustomerService, [{
		key: 'persist',
		value: function persist(datum, callback) {
			var entity = new _User2.default(datum);
			var MeveoEntity = new _MeveoCustomer2.default(entity);
			(0, _get3.default)(CustomerService.prototype.__proto__ || (0, _getPrototypeOf2.default)(CustomerService.prototype), 'persist', this).call(this, MeveoEntity, callback);
		}
	}, {
		key: 'Create',
		value: function Create(datum) {
			var _this2 = this;

			var self = this;
			return new _promise2.default(function (resolve, reject) {

				_this2.persist(datum, function (code, response) {
					code == 'success' ? resolve(response) : reject(response);
				});
			});
		}
	}, {
		key: 'update',
		value: function update(datum, callback) {
			//let entity = new User(datum);
			var MeveoEntity = new _MeveoCustomer2.default(datum);
			(0, _get3.default)(CustomerService.prototype.__proto__ || (0, _getPrototypeOf2.default)(CustomerService.prototype), 'update', this).call(this, MeveoEntity, callback);
		}
	}, {
		key: 'UpdateUser',
		value: function UpdateUser(datum) {
			var _this3 = this;

			return new _promise2.default(function (resolve, reject) {
				_this3.update(datum, function (code, response) {
					code == 'success' ? resolve(response) : reject(response);
				});
			});
		}
	}, {
		key: 'update_user',
		value: function update_user(datum, callback) {
			var MeveoEntity = new _MeveoUser2.default(datum);
			(0, _get3.default)(CustomerService.prototype.__proto__ || (0, _getPrototypeOf2.default)(CustomerService.prototype), 'updateUser', this).call(this, MeveoEntity, callback);
		}
	}, {
		key: 'UpdateUser',
		value: function UpdateUser(datum) {
			var _this4 = this;

			return new _promise2.default(function (resolve, reject) {
				_this4.update_user(datum, function (code, response) {
					code == 'success' ? resolve(response) : reject(response);
				});
			});
		}
	}]);
	return CustomerService;
}(_CrudService3.default);

exports.default = CustomerService;

/***/ }),

/***/ "./src/meveo/services/DataService.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _promise = __webpack_require__("./node_modules/babel-runtime/core-js/promise.js");

var _promise2 = _interopRequireDefault(_promise);

var _getPrototypeOf = __webpack_require__("./node_modules/babel-runtime/core-js/object/get-prototype-of.js");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__("./node_modules/babel-runtime/helpers/createClass.js");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__("./node_modules/babel-runtime/helpers/possibleConstructorReturn.js");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = __webpack_require__("./node_modules/babel-runtime/helpers/get.js");

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = __webpack_require__("./node_modules/babel-runtime/helpers/inherits.js");

var _inherits3 = _interopRequireDefault(_inherits2);

var _BaseService2 = __webpack_require__("./src/meveo/services/BaseService.js");

var _BaseService3 = _interopRequireDefault(_BaseService2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DataService = function (_BaseService) {
	(0, _inherits3.default)(DataService, _BaseService);

	function DataService() {
		(0, _classCallCheck3.default)(this, DataService);
		return (0, _possibleConstructorReturn3.default)(this, (DataService.__proto__ || (0, _getPrototypeOf2.default)(DataService)).apply(this, arguments));
	}

	(0, _createClass3.default)(DataService, [{
		key: 'get_countries',
		value: function get_countries(byUser) {
			var _this2 = this;

			return new _promise2.default(function (resolve, reject) {
				(0, _get3.default)(DataService.prototype.__proto__ || (0, _getPrototypeOf2.default)(DataService.prototype), 'getCountries', _this2).call(_this2, byUser, function (code, response) {
					code == 'success' ? resolve(response) : reject(response);
				});
			});
		}
	}, {
		key: 'get_statuses',
		value: function get_statuses(byRole) {
			var _this3 = this;

			return new _promise2.default(function (resolve, reject) {
				(0, _get3.default)(DataService.prototype.__proto__ || (0, _getPrototypeOf2.default)(DataService.prototype), 'getStatuses', _this3).call(_this3, byRole, function (code, response) {
					code == 'success' ? resolve(response) : reject(response);
				});
			});
		}
	}]);
	return DataService;
}(_BaseService3.default);

exports.default = DataService;

/***/ }),

/***/ "./src/meveo/services/LocalStorageService.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _classCallCheck2 = __webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__("./node_modules/babel-runtime/helpers/createClass.js");

var _createClass3 = _interopRequireDefault(_createClass2);

var _store = __webpack_require__("./node_modules/store/dist/store.legacy.js");

var _store2 = _interopRequireDefault(_store);

var _FrontendError = __webpack_require__("./src/meveo/FrontendError.js");

var _FrontendError2 = _interopRequireDefault(_FrontendError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LocalStorageService = function () {
	function LocalStorageService() {
		(0, _classCallCheck3.default)(this, LocalStorageService);

		if (!_store2.default.enabled) {
			throw new _FrontendError2.default('Local storage is not supported by your browser. Please disable "Private Mode", or upgrade to a modern browser.');
		}
	}

	(0, _createClass3.default)(LocalStorageService, [{
		key: 'get',
		value: function get(key, defaultValue) {
			return _store2.default.get(key, defaultValue);
		}
	}, {
		key: 'set',
		value: function set(key, value) {
			_store2.default.set(key, value);
		}
	}, {
		key: 'remove',
		value: function remove(key) {
			_store2.default.remove(key);
		}
	}, {
		key: 'clearAll',
		value: function clearAll() {
			_store2.default.clearAll();
		}
	}, {
		key: 'getCurrentCustomer',
		value: function getCurrentCustomer() {
			return this.get("vpp_currentCustomer");
		}
	}, {
		key: 'setCurrentCustomer',
		value: function setCurrentCustomer(customer, credentials) {
			this.set("vpp_currentCustomer", customer);
			this.setCredentials(credentials);
		}
	}, {
		key: 'getCredentials',
		value: function getCredentials() {
			return this.get("vpp_credentials");
		}
	}, {
		key: 'setCredentials',
		value: function setCredentials(credentials) {
			return this.set("vpp_credentials", btoa(credentials.username + ":" + credentials.password));
		}
	}, {
		key: 'setToken',
		value: function setToken(token) {
			return this.set("token", token);
		}
	}, {
		key: 'getToken',
		value: function getToken() {
			return this.get("token");
		}
	}, {
		key: 'setTokenParsed',
		value: function setTokenParsed(tokenParsed) {
			return this.set("tokenParsed", tokenParsed);
		}
	}, {
		key: 'getTokenParsed',
		value: function getTokenParsed() {
			return this.get("tokenParsed");
		}
	}, {
		key: 'getSelfCredentials',
		value: function getSelfCredentials() {
			return btoa("selfcare.default:selfcare.default");
		}
	}, {
		key: 'removeCurrentCustomer',
		value: function removeCurrentCustomer() {
			this.remove("vpp_currentCustomer");
			this.remove("vpp_credentials");
		}
	}, {
		key: 'clearUserinfo',
		value: function clearUserinfo() {
			this.remove("token");
		}
	}]);
	return LocalStorageService;
}();

var localStorageService = new LocalStorageService();

exports.default = localStorageService;

/***/ }),

/***/ "./src/meveo/services/UserProfileService.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _promise = __webpack_require__("./node_modules/babel-runtime/core-js/promise.js");

var _promise2 = _interopRequireDefault(_promise);

var _getPrototypeOf = __webpack_require__("./node_modules/babel-runtime/core-js/object/get-prototype-of.js");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__("./node_modules/babel-runtime/helpers/createClass.js");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__("./node_modules/babel-runtime/helpers/possibleConstructorReturn.js");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = __webpack_require__("./node_modules/babel-runtime/helpers/get.js");

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = __webpack_require__("./node_modules/babel-runtime/helpers/inherits.js");

var _inherits3 = _interopRequireDefault(_inherits2);

var _BaseService2 = __webpack_require__("./src/meveo/services/BaseService.js");

var _BaseService3 = _interopRequireDefault(_BaseService2);

var _User = __webpack_require__("./src/meveo/model/User.js");

var _User2 = _interopRequireDefault(_User);

var _Project = __webpack_require__("./src/meveo/model/Project.js");

var _Project2 = _interopRequireDefault(_Project);

var _Password = __webpack_require__("./src/meveo/model/Password.js");

var _Password2 = _interopRequireDefault(_Password);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserProfileService = function (_BaseService) {
    (0, _inherits3.default)(UserProfileService, _BaseService);

    function UserProfileService() {
        (0, _classCallCheck3.default)(this, UserProfileService);
        return (0, _possibleConstructorReturn3.default)(this, (UserProfileService.__proto__ || (0, _getPrototypeOf2.default)(UserProfileService)).apply(this, arguments));
    }

    (0, _createClass3.default)(UserProfileService, [{
        key: 'get_user_profile',
        value: function get_user_profile(username) {
            var _this2 = this;

            return new _promise2.default(function (resolve, reject) {
                (0, _get3.default)(UserProfileService.prototype.__proto__ || (0, _getPrototypeOf2.default)(UserProfileService.prototype), 'getUserDetailsByUserName', _this2).call(_this2, username, function (code, response) {
                    code == 'success' ? resolve(response) : reject(response);
                });
            });
        }
    }, {
        key: 'edit_user',
        value: function edit_user(userData) {
            var _this3 = this;

            userData.mode = "edit";
            var entity = new _User2.default(userData);
            return new _promise2.default(function (resolve, reject) {
                (0, _get3.default)(UserProfileService.prototype.__proto__ || (0, _getPrototypeOf2.default)(UserProfileService.prototype), 'editUser', _this3).call(_this3, entity, function (code, response) {
                    code == 'success' ? resolve(response) : reject(response);
                });
            });
        }
    }, {
        key: 'edit_image_user',
        value: function edit_image_user(userData) {
            var _this4 = this;

            userData.mode = "edit";
            var entity = new _User2.default(userData);
            return new _promise2.default(function (resolve, reject) {
                (0, _get3.default)(UserProfileService.prototype.__proto__ || (0, _getPrototypeOf2.default)(UserProfileService.prototype), 'editImageUser', _this4).call(_this4, entity, function (code, response) {
                    code == 'success' ? resolve(response) : reject(response);
                });
            });
        }
    }, {
        key: 'edit_skills_user',
        value: function edit_skills_user(userData) {
            var _this5 = this;

            userData.mode = "edit";
            var entity = new _User2.default(userData);
            return new _promise2.default(function (resolve, reject) {
                (0, _get3.default)(UserProfileService.prototype.__proto__ || (0, _getPrototypeOf2.default)(UserProfileService.prototype), 'editSkillsUser', _this5).call(_this5, entity, function (code, response) {
                    code == 'success' ? resolve(response) : reject(response);
                });
            });
        }
    }, {
        key: 'edit_projects_user',
        value: function edit_projects_user(userData) {
            var _this6 = this;

            userData.mode = "edit";
            var entity = new _User2.default(userData);
            return new _promise2.default(function (resolve, reject) {
                (0, _get3.default)(UserProfileService.prototype.__proto__ || (0, _getPrototypeOf2.default)(UserProfileService.prototype), 'editProjectsUser', _this6).call(_this6, entity, function (code, response) {
                    code == 'success' ? resolve(response) : reject(response);
                });
            });
        }
    }, {
        key: 'edit_availability_user',
        value: function edit_availability_user(userData) {
            var _this7 = this;

            userData.mode = "edit";
            var entity = new _User2.default(userData);
            return new _promise2.default(function (resolve, reject) {
                (0, _get3.default)(UserProfileService.prototype.__proto__ || (0, _getPrototypeOf2.default)(UserProfileService.prototype), 'editAvailabilityUser', _this7).call(_this7, entity, function (code, response) {
                    code == 'success' ? resolve(response) : reject(response);
                });
            });
        }
    }, {
        key: 'edit_bio_user',
        value: function edit_bio_user(userData) {
            var _this8 = this;

            userData.mode = "edit";
            var entity = new _User2.default(userData);
            return new _promise2.default(function (resolve, reject) {
                (0, _get3.default)(UserProfileService.prototype.__proto__ || (0, _getPrototypeOf2.default)(UserProfileService.prototype), 'editBioUser', _this8).call(_this8, entity, function (code, response) {
                    code == 'success' ? resolve(response) : reject(response);
                });
            });
        }
    }, {
        key: 'download_image_file',
        value: function download_image_file(username) {
            var _this9 = this;

            return new _promise2.default(function (resolve, reject) {
                (0, _get3.default)(UserProfileService.prototype.__proto__ || (0, _getPrototypeOf2.default)(UserProfileService.prototype), 'downloadImageFile', _this9).call(_this9, username, function (code, response) {
                    code == 'success' ? resolve(response) : reject(response);
                });
            });
        }
    }, {
        key: 'upload_image_file',
        value: function upload_image_file(username) {
            var _this10 = this;

            return new _promise2.default(function (resolve, reject) {
                (0, _get3.default)(UserProfileService.prototype.__proto__ || (0, _getPrototypeOf2.default)(UserProfileService.prototype), 'uploadImageFile', _this10).call(_this10, username, function (code, response) {
                    code == 'success' ? resolve(response) : reject(response);
                });
            });
        }
    }, {
        key: 'download_CV_file',
        value: function download_CV_file(username) {
            var _this11 = this;

            return new _promise2.default(function (resolve, reject) {
                (0, _get3.default)(UserProfileService.prototype.__proto__ || (0, _getPrototypeOf2.default)(UserProfileService.prototype), 'downloadCVFile', _this11).call(_this11, username, function (code, response) {
                    code == 'success' ? resolve(response) : reject(response);
                });
            });
        }
    }, {
        key: 'upload_CV_file',
        value: function upload_CV_file(username) {
            var _this12 = this;

            return new _promise2.default(function (resolve, reject) {
                (0, _get3.default)(UserProfileService.prototype.__proto__ || (0, _getPrototypeOf2.default)(UserProfileService.prototype), 'uploadCVFile', _this12).call(_this12, username, function (code, response) {
                    code == 'success' ? resolve(response) : reject(response);
                });
            });
        }
    }, {
        key: 'get_all_users',
        value: function get_all_users() {
            var _this13 = this;

            return new _promise2.default(function (resolve, reject) {
                (0, _get3.default)(UserProfileService.prototype.__proto__ || (0, _getPrototypeOf2.default)(UserProfileService.prototype), 'getAllUsers', _this13).call(_this13, function (code, response) {
                    code == 'success' ? resolve(response) : reject(response);
                });
            });
        }
    }, {
        key: 'get_all_project',
        value: function get_all_project() {
            var _this14 = this;

            return new _promise2.default(function (resolve, reject) {
                (0, _get3.default)(UserProfileService.prototype.__proto__ || (0, _getPrototypeOf2.default)(UserProfileService.prototype), 'getAllProject', _this14).call(_this14, function (code, response) {
                    code == 'success' ? resolve(response) : reject(response);
                });
            });
        }
    }, {
        key: 'get_project_detail',
        value: function get_project_detail(projectName) {
            var _this15 = this;

            return new _promise2.default(function (resolve, reject) {
                (0, _get3.default)(UserProfileService.prototype.__proto__ || (0, _getPrototypeOf2.default)(UserProfileService.prototype), 'getProjectDetailsByCode', _this15).call(_this15, projectName, function (code, response) {
                    code == 'success' ? resolve(response) : reject(response);
                });
            });
        }
    }, {
        key: 'edit_client_project',
        value: function edit_client_project(userData) {
            var _this16 = this;

            userData.mode = "edit";
            var entity = new _Project2.default(userData);
            return new _promise2.default(function (resolve, reject) {
                (0, _get3.default)(UserProfileService.prototype.__proto__ || (0, _getPrototypeOf2.default)(UserProfileService.prototype), 'editClientProject', _this16).call(_this16, entity, function (code, response) {
                    code == 'success' ? resolve(response) : reject(response);
                });
            });
        }
    }, {
        key: 'edit_assembla_project',
        value: function edit_assembla_project(userData) {
            var _this17 = this;

            userData.mode = "edit";
            var entity = new _Project2.default(userData);
            return new _promise2.default(function (resolve, reject) {
                (0, _get3.default)(UserProfileService.prototype.__proto__ || (0, _getPrototypeOf2.default)(UserProfileService.prototype), 'editAssemblaProject', _this17).call(_this17, entity, function (code, response) {
                    code == 'success' ? resolve(response) : reject(response);
                });
            });
        }
    }, {
        key: 'upload_image_project',
        value: function upload_image_project(username) {
            var _this18 = this;

            return new _promise2.default(function (resolve, reject) {
                (0, _get3.default)(UserProfileService.prototype.__proto__ || (0, _getPrototypeOf2.default)(UserProfileService.prototype), 'uploadImageProject', _this18).call(_this18, username, function (code, response) {
                    code == 'success' ? resolve(response) : reject(response);
                });
            });
        }
    }, {
        key: 'edit_teams_project',
        value: function edit_teams_project(userData) {
            var _this19 = this;

            userData.mode = "edit";
            var entity = new _Project2.default(userData);
            return new _promise2.default(function (resolve, reject) {
                (0, _get3.default)(UserProfileService.prototype.__proto__ || (0, _getPrototypeOf2.default)(UserProfileService.prototype), 'editTeamProject', _this19).call(_this19, entity, function (code, response) {
                    code == 'success' ? resolve(response) : reject(response);
                });
            });
        }
    }, {
        key: 'add_project_foruser',
        value: function add_project_foruser(userData) {
            var _this20 = this;

            userData.mode = "edit";
            var entity = new _Project2.default(userData);
            return new _promise2.default(function (resolve, reject) {
                (0, _get3.default)(UserProfileService.prototype.__proto__ || (0, _getPrototypeOf2.default)(UserProfileService.prototype), 'addProjectForUser', _this20).call(_this20, entity, function (code, response) {
                    code == 'success' ? resolve(response) : reject(response);
                });
            });
        }
    }, {
        key: 'edit_password',
        value: function edit_password(userData) {
            var _this21 = this;

            userData.mode = "edit";
            var entity = new _Password2.default(userData);
            return new _promise2.default(function (resolve, reject) {
                (0, _get3.default)(UserProfileService.prototype.__proto__ || (0, _getPrototypeOf2.default)(UserProfileService.prototype), 'editPassword', _this21).call(_this21, entity, function (code, response) {
                    code == 'success' ? resolve(response) : reject(response);
                });
            });
        }
    }]);
    return UserProfileService;
}(_BaseService3.default);

exports.default = UserProfileService;

/***/ }),

/***/ "./src/meveo/stores/AllProjectStore.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _getPrototypeOf = __webpack_require__("./node_modules/babel-runtime/core-js/object/get-prototype-of.js");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__("./node_modules/babel-runtime/helpers/possibleConstructorReturn.js");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__("./node_modules/babel-runtime/helpers/inherits.js");

var _inherits3 = _interopRequireDefault(_inherits2);

var _microevent = __webpack_require__("./node_modules/microevent/microevent.js");

var _microevent2 = _interopRequireDefault(_microevent);

var _BaseStore2 = __webpack_require__("./src/meveo/stores/BaseStore.js");

var _BaseStore3 = _interopRequireDefault(_BaseStore2);

var _dispatcher = __webpack_require__("./src/meveo/dispatcher.js");

var _dispatcher2 = _interopRequireDefault(_dispatcher);

var _ActionMethods = __webpack_require__("./src/meveo/actions/ActionMethods.js");

var ActionMethods = _interopRequireWildcard(_ActionMethods);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AllProjectStore = function (_BaseStore) {
	(0, _inherits3.default)(AllProjectStore, _BaseStore);

	function AllProjectStore() {
		(0, _classCallCheck3.default)(this, AllProjectStore);
		return (0, _possibleConstructorReturn3.default)(this, (AllProjectStore.__proto__ || (0, _getPrototypeOf2.default)(AllProjectStore)).call(this, "USER", [ActionMethods.GET_ALL_PROJECT]));
	}

	return AllProjectStore;
}(_BaseStore3.default);

_microevent2.default.mixin(AllProjectStore);
var allProjectStore = new AllProjectStore();
_dispatcher2.default.register(allProjectStore.handleAction.bind(allProjectStore));
exports.default = allProjectStore;

/***/ }),

/***/ "./src/meveo/stores/AllStore.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _getPrototypeOf = __webpack_require__("./node_modules/babel-runtime/core-js/object/get-prototype-of.js");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__("./node_modules/babel-runtime/helpers/possibleConstructorReturn.js");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__("./node_modules/babel-runtime/helpers/inherits.js");

var _inherits3 = _interopRequireDefault(_inherits2);

var _microevent = __webpack_require__("./node_modules/microevent/microevent.js");

var _microevent2 = _interopRequireDefault(_microevent);

var _BaseStore2 = __webpack_require__("./src/meveo/stores/BaseStore.js");

var _BaseStore3 = _interopRequireDefault(_BaseStore2);

var _dispatcher = __webpack_require__("./src/meveo/dispatcher.js");

var _dispatcher2 = _interopRequireDefault(_dispatcher);

var _ActionMethods = __webpack_require__("./src/meveo/actions/ActionMethods.js");

var ActionMethods = _interopRequireWildcard(_ActionMethods);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AllStore = function (_BaseStore) {
	(0, _inherits3.default)(AllStore, _BaseStore);

	function AllStore() {
		(0, _classCallCheck3.default)(this, AllStore);
		return (0, _possibleConstructorReturn3.default)(this, (AllStore.__proto__ || (0, _getPrototypeOf2.default)(AllStore)).call(this, "USER", [ActionMethods.GET_ALL_USERS]));
	}

	return AllStore;
}(_BaseStore3.default);

_microevent2.default.mixin(AllStore);
var allStore = new AllStore();
_dispatcher2.default.register(allStore.handleAction.bind(allStore));
exports.default = allStore;

/***/ }),

/***/ "./src/meveo/stores/BaseStore.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _classCallCheck2 = __webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__("./node_modules/babel-runtime/helpers/createClass.js");

var _createClass3 = _interopRequireDefault(_createClass2);

var _ActionMethods = __webpack_require__("./src/meveo/actions/ActionMethods.js");

var ActionMethods = _interopRequireWildcard(_ActionMethods);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BaseStore = function () {
	function BaseStore(type, actionMethods) {
		var _this = this;

		(0, _classCallCheck3.default)(this, BaseStore);

		if (type == null || type.trim == '') {
			throw new FrontendError("Store type cannot be null or empty.");
		}
		if (actionMethods == null || actionMethods.length == 0) {
			throw new FrontendError("Store actionMethods cannot be null or empty.");
		}
		this.type = type;
		this.loadingMethods = [];
		this.successMethods = [];
		this.errorMethods = [];
		actionMethods.map(function (method) {
			_this.loadingMethods.push(ActionMethods.startMethod(method));
			_this.successMethods.push(ActionMethods.successMethod(method));
			_this.errorMethods.push(ActionMethods.errorMethod(method));
		});
	}

	(0, _createClass3.default)(BaseStore, [{
		key: 'handleAction',
		value: function handleAction(action) {
			if (this.loadingMethods.find(function (method) {
				return method === action.actionMethod;
			}) != null) {
				return this.trigger(loadingMethod(this.type));
			}
			if (this.successMethods.find(function (method) {
				return method === action.actionMethod;
			}) != null) {
				return this.trigger(updateMethod(this.type), action.result);
			}
			if (this.errorMethods.find(function (method) {
				return method === action.actionMethod;
			}) != null) {
				return this.trigger(errorMethod(this.type), action.result);
			}
		}
	}, {
		key: 'bindLoadHandler',
		value: function bindLoadHandler(loaderFunction) {
			this.bind(loadingMethod(this.type), loaderFunction);
		}
	}, {
		key: 'bindUpdateHandler',
		value: function bindUpdateHandler(updateFunction) {
			this.bind(updateMethod(this.type), updateFunction);
		}
	}, {
		key: 'bindErrorHandler',
		value: function bindErrorHandler(errorFunction) {
			this.bind(errorMethod(this.type), errorFunction);
		}
	}, {
		key: 'unbindLoadHandler',
		value: function unbindLoadHandler(loaderFunction) {
			this.unbind(loadingMethod(this.type), loaderFunction);
		}
	}, {
		key: 'unbindUpdateHandler',
		value: function unbindUpdateHandler(updateFunction) {
			this.unbind(updateMethod(this.type), updateFunction);
		}
	}, {
		key: 'unbindErrorHandler',
		value: function unbindErrorHandler(errorFunction) {
			this.unbind(errorMethod(this.type), errorFunction);
		}
	}, {
		key: 'TYPE',
		get: function get() {
			return this.type;
		}
	}]);
	return BaseStore;
}();

exports.default = BaseStore;


function loadingMethod(storeMethod) {
	return storeMethod + '_LOADING';
}

function updateMethod(storeMethod) {
	return storeMethod + '_UPDATED';
}

function errorMethod(storeMethod) {
	return storeMethod + '_ERROR';
}

/***/ }),

/***/ "./src/meveo/stores/CustomerStore.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _getPrototypeOf = __webpack_require__("./node_modules/babel-runtime/core-js/object/get-prototype-of.js");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__("./node_modules/babel-runtime/helpers/possibleConstructorReturn.js");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__("./node_modules/babel-runtime/helpers/inherits.js");

var _inherits3 = _interopRequireDefault(_inherits2);

var _microevent = __webpack_require__("./node_modules/microevent/microevent.js");

var _microevent2 = _interopRequireDefault(_microevent);

var _BaseStore2 = __webpack_require__("./src/meveo/stores/BaseStore.js");

var _BaseStore3 = _interopRequireDefault(_BaseStore2);

var _dispatcher = __webpack_require__("./src/meveo/dispatcher.js");

var _dispatcher2 = _interopRequireDefault(_dispatcher);

var _ActionMethods = __webpack_require__("./src/meveo/actions/ActionMethods.js");

var ActionMethods = _interopRequireWildcard(_ActionMethods);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CustomerStore = function (_BaseStore) {
	(0, _inherits3.default)(CustomerStore, _BaseStore);

	function CustomerStore() {
		(0, _classCallCheck3.default)(this, CustomerStore);
		return (0, _possibleConstructorReturn3.default)(this, (CustomerStore.__proto__ || (0, _getPrototypeOf2.default)(CustomerStore)).call(this, "CUSTOMER", [ActionMethods.GET_CURRENT_CUSTOMER, ActionMethods.LOGIN_USER, ActionMethods.LOGOUT_CURRENT_CUSTOMER, ActionMethods.UPDATE_CUSTOMER, ActionMethods.UPDATE_USER]));
	}

	return CustomerStore;
}(_BaseStore3.default);

_microevent2.default.mixin(CustomerStore);
var customerStore = new CustomerStore();
_dispatcher2.default.register(customerStore.handleAction.bind(customerStore));
exports.default = customerStore;

/***/ }),

/***/ "./src/meveo/stores/DataStore.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _getPrototypeOf = __webpack_require__("./node_modules/babel-runtime/core-js/object/get-prototype-of.js");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__("./node_modules/babel-runtime/helpers/possibleConstructorReturn.js");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__("./node_modules/babel-runtime/helpers/inherits.js");

var _inherits3 = _interopRequireDefault(_inherits2);

var _microevent = __webpack_require__("./node_modules/microevent/microevent.js");

var _microevent2 = _interopRequireDefault(_microevent);

var _BaseStore2 = __webpack_require__("./src/meveo/stores/BaseStore.js");

var _BaseStore3 = _interopRequireDefault(_BaseStore2);

var _dispatcher = __webpack_require__("./src/meveo/dispatcher.js");

var _dispatcher2 = _interopRequireDefault(_dispatcher);

var _ActionMethods = __webpack_require__("./src/meveo/actions/ActionMethods.js");

var ActionMethods = _interopRequireWildcard(_ActionMethods);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DataStore = function (_BaseStore) {
	(0, _inherits3.default)(DataStore, _BaseStore);

	function DataStore() {
		(0, _classCallCheck3.default)(this, DataStore);
		return (0, _possibleConstructorReturn3.default)(this, (DataStore.__proto__ || (0, _getPrototypeOf2.default)(DataStore)).call(this, "DATA", [ActionMethods.GET_COUNTRIES, ActionMethods.GET_STATUSES]));
	}

	return DataStore;
}(_BaseStore3.default);

_microevent2.default.mixin(DataStore);
var dataStore = new DataStore();
_dispatcher2.default.register(dataStore.handleAction.bind(dataStore));
exports.default = dataStore;

/***/ }),

/***/ "./src/meveo/stores/GuestStore.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _getPrototypeOf = __webpack_require__("./node_modules/babel-runtime/core-js/object/get-prototype-of.js");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__("./node_modules/babel-runtime/helpers/possibleConstructorReturn.js");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__("./node_modules/babel-runtime/helpers/inherits.js");

var _inherits3 = _interopRequireDefault(_inherits2);

var _microevent = __webpack_require__("./node_modules/microevent/microevent.js");

var _microevent2 = _interopRequireDefault(_microevent);

var _BaseStore2 = __webpack_require__("./src/meveo/stores/BaseStore.js");

var _BaseStore3 = _interopRequireDefault(_BaseStore2);

var _dispatcher = __webpack_require__("./src/meveo/dispatcher.js");

var _dispatcher2 = _interopRequireDefault(_dispatcher);

var _ActionMethods = __webpack_require__("./src/meveo/actions/ActionMethods.js");

var ActionMethods = _interopRequireWildcard(_ActionMethods);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GuestStore = function (_BaseStore) {
	(0, _inherits3.default)(GuestStore, _BaseStore);

	function GuestStore() {
		(0, _classCallCheck3.default)(this, GuestStore);
		return (0, _possibleConstructorReturn3.default)(this, (GuestStore.__proto__ || (0, _getPrototypeOf2.default)(GuestStore)).call(this, "GUEST", [ActionMethods.SIGNUP_CUSTOMER, ActionMethods.FORGOT_PASSWORD]));
	}

	return GuestStore;
}(_BaseStore3.default);

_microevent2.default.mixin(GuestStore);
var guestStore = new GuestStore();
_dispatcher2.default.register(guestStore.handleAction.bind(guestStore));
exports.default = guestStore;

/***/ }),

/***/ "./src/meveo/stores/PasswordStore.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _getPrototypeOf = __webpack_require__("./node_modules/babel-runtime/core-js/object/get-prototype-of.js");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__("./node_modules/babel-runtime/helpers/possibleConstructorReturn.js");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__("./node_modules/babel-runtime/helpers/inherits.js");

var _inherits3 = _interopRequireDefault(_inherits2);

var _microevent = __webpack_require__("./node_modules/microevent/microevent.js");

var _microevent2 = _interopRequireDefault(_microevent);

var _BaseStore2 = __webpack_require__("./src/meveo/stores/BaseStore.js");

var _BaseStore3 = _interopRequireDefault(_BaseStore2);

var _dispatcher = __webpack_require__("./src/meveo/dispatcher.js");

var _dispatcher2 = _interopRequireDefault(_dispatcher);

var _ActionMethods = __webpack_require__("./src/meveo/actions/ActionMethods.js");

var ActionMethods = _interopRequireWildcard(_ActionMethods);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PasswordStore = function (_BaseStore) {
	(0, _inherits3.default)(PasswordStore, _BaseStore);

	function PasswordStore() {
		(0, _classCallCheck3.default)(this, PasswordStore);
		return (0, _possibleConstructorReturn3.default)(this, (PasswordStore.__proto__ || (0, _getPrototypeOf2.default)(PasswordStore)).call(this, "USER", [ActionMethods.EDIT_PASSWORD]));
	}

	return PasswordStore;
}(_BaseStore3.default);

_microevent2.default.mixin(PasswordStore);
var passwordStore = new PasswordStore();
_dispatcher2.default.register(passwordStore.handleAction.bind(passwordStore));
exports.default = passwordStore;

/***/ }),

/***/ "./src/meveo/stores/ProjectStore.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = __webpack_require__("./node_modules/babel-runtime/core-js/object/get-prototype-of.js");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__("./node_modules/babel-runtime/helpers/possibleConstructorReturn.js");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__("./node_modules/babel-runtime/helpers/inherits.js");

var _inherits3 = _interopRequireDefault(_inherits2);

var _microevent = __webpack_require__("./node_modules/microevent/microevent.js");

var _microevent2 = _interopRequireDefault(_microevent);

var _BaseStore2 = __webpack_require__("./src/meveo/stores/BaseStore.js");

var _BaseStore3 = _interopRequireDefault(_BaseStore2);

var _dispatcher = __webpack_require__("./src/meveo/dispatcher.js");

var _dispatcher2 = _interopRequireDefault(_dispatcher);

var _ActionMethods = __webpack_require__("./src/meveo/actions/ActionMethods.js");

var ActionMethods = _interopRequireWildcard(_ActionMethods);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ProjectStore = function (_BaseStore) {
  (0, _inherits3.default)(ProjectStore, _BaseStore);

  function ProjectStore() {
    (0, _classCallCheck3.default)(this, ProjectStore);
    return (0, _possibleConstructorReturn3.default)(this, (ProjectStore.__proto__ || (0, _getPrototypeOf2.default)(ProjectStore)).call(this, "PROJECT", [ActionMethods.GET_PROJECT_DETAILS, ActionMethods.EDIT_CLIENT_PROJECT, ActionMethods.EDIT_ASSEMBLA_PROJECT, ActionMethods.UPLOAD_IMAGE_PROJECT_FILE, ActionMethods.EDIT_TEAMS_PROJECT, ActionMethods.ADD_PROJECT_FOR_USER]));
  }

  return ProjectStore;
}(_BaseStore3.default);

_microevent2.default.mixin(ProjectStore);
var projectStore = new ProjectStore();
_dispatcher2.default.register(projectStore.handleAction.bind(projectStore));
exports.default = projectStore;

/***/ }),

/***/ "./src/meveo/stores/UserStore.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _getPrototypeOf = __webpack_require__("./node_modules/babel-runtime/core-js/object/get-prototype-of.js");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__("./node_modules/babel-runtime/helpers/possibleConstructorReturn.js");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__("./node_modules/babel-runtime/helpers/inherits.js");

var _inherits3 = _interopRequireDefault(_inherits2);

var _microevent = __webpack_require__("./node_modules/microevent/microevent.js");

var _microevent2 = _interopRequireDefault(_microevent);

var _BaseStore2 = __webpack_require__("./src/meveo/stores/BaseStore.js");

var _BaseStore3 = _interopRequireDefault(_BaseStore2);

var _dispatcher = __webpack_require__("./src/meveo/dispatcher.js");

var _dispatcher2 = _interopRequireDefault(_dispatcher);

var _ActionMethods = __webpack_require__("./src/meveo/actions/ActionMethods.js");

var ActionMethods = _interopRequireWildcard(_ActionMethods);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserStore = function (_BaseStore) {
	(0, _inherits3.default)(UserStore, _BaseStore);

	function UserStore() {
		(0, _classCallCheck3.default)(this, UserStore);
		return (0, _possibleConstructorReturn3.default)(this, (UserStore.__proto__ || (0, _getPrototypeOf2.default)(UserStore)).call(this, "USER", [ActionMethods.GET_USER_DETAILS, ActionMethods.EDIT_PROFILE_USER, ActionMethods.UPLOAD_IMAGE_FILE, ActionMethods.UPLOAD_CV_FILE, ActionMethods.EDIT_IMAGE_USER]));
	}

	return UserStore;
}(_BaseStore3.default);

_microevent2.default.mixin(UserStore);
var userStore = new UserStore();
_dispatcher2.default.register(userStore.handleAction.bind(userStore));
exports.default = userStore;

/***/ }),

/***/ "./src/properties.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["list_languages"] = list_languages;
;const baseUrl = "";

const meveo_path = "/meveo";
/* harmony export (immutable) */ __webpack_exports__["meveo_path"] = meveo_path;

const keycloak_path = "";
/* harmony export (immutable) */ __webpack_exports__["keycloak_path"] = keycloak_path;

const provider = "DEMO";
/* harmony export (immutable) */ __webpack_exports__["provider"] = provider;


const index_url = baseUrl + "/";
/* harmony export (immutable) */ __webpack_exports__["index_url"] = index_url;

const faq_url = baseUrl + "/faq";
/* harmony export (immutable) */ __webpack_exports__["faq_url"] = faq_url;

const how_it_works_url = baseUrl + "/how-it-works";
/* harmony export (immutable) */ __webpack_exports__["how_it_works_url"] = how_it_works_url;

const contact_url = baseUrl + "/contact";
/* harmony export (immutable) */ __webpack_exports__["contact_url"] = contact_url;

const about_url = baseUrl + "/about";
/* harmony export (immutable) */ __webpack_exports__["about_url"] = about_url;

const team_url = baseUrl + "/team";
/* harmony export (immutable) */ __webpack_exports__["team_url"] = team_url;

const projects_url = baseUrl + "/projects";
/* harmony export (immutable) */ __webpack_exports__["projects_url"] = projects_url;

const change_password = baseUrl + "/change_password";
/* harmony export (immutable) */ __webpack_exports__["change_password"] = change_password;

const tokenRefreshRate = 300;
/* harmony export (immutable) */ __webpack_exports__["tokenRefreshRate"] = tokenRefreshRate;
 // in seconds
const keycloakConfigURL =  "/meveo/frontend/manaty/keycloak.json";
/* harmony export (immutable) */ __webpack_exports__["keycloakConfigURL"] = keycloakConfigURL;


function list_languages() {
	var langList = ["FRA", "ENG"];
	return langList;
}

const list_civilities = ["M", "MLLES", "MLLE", "MM", "MME", "MMES"];
/* harmony export (immutable) */ __webpack_exports__["list_civilities"] = list_civilities;


const list_payment_methods = ["CHECK", "DIRECTDEBIT", "TIP", "WIRETRANSFER", "CARD"];
/* harmony export (immutable) */ __webpack_exports__["list_payment_methods"] = list_payment_methods;


const list_countries = [{
		code: "AF",
		description: "Afghanistan"
	}, {
		code: "AL",
		description: "Albania"
	}, {
		code: "DZ",
		description: "Algeria"
	}, {
		code: "AS",
		description: "American Samoa"
	}, {
		code: "AD",
		description: "Andorra"
	}, {
		code: "AO",
		description: "Angola"
	}, {
		code: "AI",
		description: "Anguilla"
	}, {
		code: "AG",
		description: "Antigua and Barbuda"
	}, {
		code: "AR",
		description: "Argentina"
	}, {
		code: "AM",
		description: "Armenia"
	}, {
		code: "AW",
		description: "Aruba"
	}, {
		code: "AU",
		description: "Australia"
	}, {
		code: "AT",
		description: "Austria"
	}, {
		code: "AZ",
		description: "Azerbaijan"
	}, {
		code: "BH",
		description: "Bahrain"
	}, {
		code: "BD",
		description: "Bangladesh"
	}, {
		code: "BB",
		description: "Barbados"
	}, {
		code: "BY",
		description: "Belarus"
	}, {
		code: "BE",
		description: "Belgium"
	}, {
		code: "BZ",
		description: "Belize"
	}, {
		code: "BJ",
		description: "Benin"
	}, {
		code: "BM",
		description: "Bermuda"
	}, {
		code: "BT",
		description: "Bhutan"
	}, {
		code: "BO",
		description: "Bolivia"
	}, {
		code: "BA",
		description: "Bosnia and Herzegovina"
	}, {
		code: "BW",
		description: "Botswana"
	}, {
		code: "BV",
		description: "Bouvet Island"
	}, {
		code: "BR",
		description: "Brazil"
	}, {
		code: "IO",
		description: "British Indian Ocean Territory"
	}, {
		code: "VG",
		description: "British Virgin Islands"
	}, {
		code: "BN",
		description: "Brunei Darussalam"
	}, {
		code: "BG",
		description: "Bulgaria"
	}, {
		code: "BF",
		description: "Burkina Faso"
	}, {
		code: "MM",
		description: "Burma"
	}, {
		code: "BI",
		description: "Burundi"
	}, {
		code: "KH",
		description: "Cambodia"
	}, {
		code: "CM",
		description: "Cameroun"
	}, {
		code: "CA",
		description: "Canada"
	}, {
		code: "CV",
		description: "Cape Verde"
	}, {
		code: "KY",
		description: "Cayman Islands"
	}, {
		code: "CF",
		description: "Central African Republic"
	}, {
		code: "TD",
		description: "Chad"
	}, {
		code: "CL",
		description: "Chile"
	}, {
		code: "CN",
		description: "China"
	}, {
		code: "CX",
		description: "Christmas Island"
	}, {
		code: "CC",
		description: "Cocos (Keeling) Islands"
	}, {
		code: "CO",
		description: "Colombia"
	}, {
		code: "KM",
		description: "Comoros"
	}, {
		code: "CD",
		description: "Congo, Democratic Republic of th"
	}, {
		code: "CG",
		description: "Congo, Republic of the"
	}, {
		code: "CK",
		description: "Cook Islands"
	}, {
		code: "CR",
		description: "Costa Rica"
	}, {
		code: "CI",
		description: "Cote Ivoire"
	}, {
		code: "HR",
		description: "Croatia"
	}, {
		code: "CU",
		description: "Cuba"
	}, {
		code: "CY",
		description: "Cyprus"
	}, {
		code: "CZ",
		description: "Czech Republic"
	}, {
		code: "DK",
		description: "Danemark"
	}, {
		code: "DJ",
		description: "Djibouti"
	}, {
		code: "DM",
		description: "Dominica"
	}, {
		code: "DO",
		description: "Dominican Republic"
	}, {
		code: "TL",
		description: "East timor"
	}, {
		code: "EC",
		description: "Ecuador"
	}, {
		code: "EG",
		description: "Egypt"
	}, {
		code: "SV",
		description: "El Salvador"
	}, {
		code: "GQ",
		description: "Equatorial Guinea"
	}, {
		code: "ER",
		description: "Eritrea"
	}, {
		code: "EE",
		description: "Estonia"
	}, {
		code: "ET",
		description: "Ethiopia"
	}, {
		code: "FK",
		description: "Falkland Islands (Islas Malvinas)"
	}, {
		code: "FO",
		description: "Faroe Islands"
	}, {
		code: "FJ",
		description: "Fiji"
	}, {
		code: "FI",
		description: "Finland"
	}, {
		code: "FR",
		description: "France"
	}, {
		code: "GR",
		description: "French Guiana"
	}, {
		code: "PF",
		description: "French Polynesia"
	}, {
		code: "TF",
		description: "French Southern and Antarctic La"
	}, {
		code: "GA",
		description: "Gabon"
	}, {
		code: "GE",
		description: "Georgia"
	}, {
		code: "DE",
		description: "Germany"
	}, {
		code: "GH",
		description: "Ghana"
	}, {
		code: "GI",
		description: "Gibraltar"
	}, {
		code: "GR",
		description: "Greece"
	}, {
		code: "GL",
		description: "Greenland"
	}, {
		code: "GD",
		description: "Grenada"
	}, {
		code: "GP",
		description: "Guadeloupe"
	}, {
		code: "GU",
		description: "Guam"
	}, {
		code: "GT",
		description: "Guatemala"
	}, {
		code: "GN",
		description: "Guinea"
	}, {
		code: "GW",
		description: "Guinea-Bissau"
	}, {
		code: "GY",
		description: "Guyana"
	}, {
		code: "HT",
		description: "Haiti"
	}, {
		code: "HM",
		description: "Heard Island and McDonald Island"
	}, {
		code: "VA",
		description: "Holy See Vatican City"
	}, {
		code: "HN",
		description: "Honduras"
	}, {
		code: "HK",
		description: "Hong Kong (SAR)"
	}, {
		code: "HU",
		description: "Hungary"
	}, {
		code: "IS",
		description: "Iceland"
	}, {
		code: "IN",
		description: "India"
	}, {
		code: "ID",
		description: "Indonesia"
	}, {
		code: "IR",
		description: "Iran"
	}, {
		code: "IQ",
		description: "Iraq"
	}, {
		code: "IE",
		description: "Ireland"
	}, {
		code: "IL",
		description: "Israel"
	}, {
		code: "IT",
		description: "Italy"
	}, {
		code: "JM",
		description: "Jamaica"
	}, {
		code: "JP",
		description: "Japan"
	}, {
		code: "JO",
		description: "Jordan"
	}, {
		code: "KZ",
		description: "Kazakhstan"
	}, {
		code: "KE",
		description: "Kenya"
	}, {
		code: "KI",
		description: "Kiribati"
	}, {
		code: "KP",
		description: "Korea, North"
	}, {
		code: "KR",
		description: "Korea, South"
	}, {
		code: "KW",
		description: "Kuwait"
	}, {
		code: "KG",
		description: "Kyrgyzstan"
	}, {
		code: "LA",
		description: "Laos"
	}, {
		code: "LV",
		description: "Latvia"
	}, {
		code: "LB",
		description: "Lebanon"
	}, {
		code: "LS",
		description: "Lesotho"
	}, {
		code: "LR",
		description: "Liberia"
	}, {
		code: "LY",
		description: "Libya"
	}, {
		code: "LI",
		description: "Liechtenstein"
	}, {
		code: "LT",
		description: "Lithuania"
	}, {
		code: "LU",
		description: "Luxembourg"
	}, {
		code: "MO",
		description: "Macao"
	}, {
		code: "MK",
		description: "Macedonia, The Former Yugoslav R"
	}, {
		code: "MG",
		description: "Madagascar"
	}, {
		code: "MW",
		description: "Malawi"
	}, {
		code: "MY",
		description: "Malaysia"
	}, {
		code: "MV",
		description: "Maldives"
	}, {
		code: "ML",
		description: "Mali"
	}, {
		code: "MT",
		description: "Malta"
	}, {
		code: "MH",
		description: "Marshall Islands"
	}, {
		code: "MQ",
		description: "Martinique"
	}, {
		code: "MR",
		description: "Mauritania"
	}, {
		code: "MU",
		description: "Mauritius"
	}, {
		code: "YT",
		description: "Mayotte"
	}, {
		code: "MX",
		description: "Mexico"
	}, {
		code: "FM",
		description: "Micronesia, Federated States of"
	}, {
		code: "MD",
		description: "Moldova"
	}, {
		code: "MC",
		description: "Monaco"
	}, {
		code: "MN",
		description: "Mongolia"
	}, {
		code: "MS",
		description: "Montserrat"
	}, {
		code: "MA",
		description: "Morocco"
	}, {
		code: "MZ",
		description: "Mozambique"
	}, {
		code: "NA",
		description: "Namibia"
	}, {
		code: "NR",
		description: "Nauru"
	}, {
		code: "NP",
		description: "Nepal"
	}, {
		code: "NL",
		description: "Netherlands"
	}, {
		code: "AN",
		description: "Netherlands Antilles"
	}, {
		code: "NC",
		description: "New Caledonia"
	}, {
		code: "NZ",
		description: "New Zealand"
	}, {
		code: "NI",
		description: "Nicaragua"
	}, {
		code: "NE",
		description: "Niger"
	}, {
		code: "NG",
		description: "Nigeria"
	}, {
		code: "NU",
		description: "Niue"
	}, {
		code: "NF",
		description: "Norfolk Island"
	}, {
		code: "MP",
		description: "Northern Mariana Islands"
	}, {
		code: "NO",
		description: "Norway"
	}, {
		code: "OM",
		description: "Oman"
	}, {
		code: "PK",
		description: "Pakistan"
	}, {
		code: "PW",
		description: "Palau"
	}, {
		code: "PS",
		description: "Palestinian Territory, Occupied"
	}, {
		code: "PA",
		description: "Panama"
	}, {
		code: "PG",
		description: "Papua New Guinea"
	}, {
		code: "PY",
		description: "Paraguay"
	}, {
		code: "PE",
		description: "Peru"
	}, {
		code: "PH",
		description: "Philippines"
	}, {
		code: "PN",
		description: "Pitcairn Islands"
	}, {
		code: "PL",
		description: "Poland"
	}, {
		code: "PT",
		description: "Portugal"
	}, {
		code: "PR",
		description: "Puerto Rico"
	}, {
		code: "QA",
		description: "Qatar"
	}, {
		code: "RO",
		description: "Romania"
	}, {
		code: "RU",
		description: "Russia"
	}, {
		code: "RW",
		description: "Rwanda"
	}, {
		code: "RE",
		description: "Réunion"
	}, {
		code: "SH",
		description: "Saint Helena"
	}, {
		code: "KN",
		description: "Saint Kitts and Nevis"
	}, {
		code: "LC",
		description: "Saint Lucia"
	}, {
		code: "PM",
		description: "Saint Pierre and Miquelon"
	}, {
		code: "VC",
		description: "Saint Vincent and Grenadines"
	}, {
		code: "WS",
		description: "Samoa"
	}, {
		code: "SM",
		description: "San Marino"
	}, {
		code: "SA",
		description: "Saudi Arabia"
	}, {
		code: "SN",
		description: "Senegal"
	}, {
		code: "SC",
		description: "Seychelles"
	}, {
		code: "SL",
		description: "Sierra Leone"
	}, {
		code: "SG",
		description: "Singapore"
	}, {
		code: "SK",
		description: "Slovakia"
	}, {
		code: "SI",
		description: "Slovenia"
	}, {
		code: "SB",
		description: "Solomon Islands"
	}, {
		code: "SO",
		description: "Somalia"
	}, {
		code: "ZA",
		description: "South Africa"
	}, {
		code: "GS",
		description: "South Georgia and the South Sand"
	}, {
		code: "ES",
		description: "Spain"
	}, {
		code: "LK",
		description: "Sri Lanka"
	}, {
		code: "SD",
		description: "Sudan"
	}, {
		code: "SR",
		description: "Suriname"
	}, {
		code: "SJ",
		description: "Svalbard"
	}, {
		code: "SZ",
		description: "Swaziland"
	}, {
		code: "SE",
		description: "Sweden"
	}, {
		code: "CH",
		description: "Switzerland"
	}, {
		code: "SY",
		description: "Syria"
	}, {
		code: "ST",
		description: "São Tomé and Príncipe"
	}, {
		code: "TW",
		description: "Taiwan"
	}, {
		code: "TJ",
		description: "Tajikistan"
	}, {
		code: "TZ",
		description: "Tanzania"
	}, {
		code: "TH",
		description: "Thailand"
	}, {
		code: "BS",
		description: "The Bahamas"
	}, {
		code: "GM",
		description: "The Gambia"
	}, {
		code: "TG",
		description: "Togo"
	}, {
		code: "TK",
		description: "Tokelau"
	}, {
		code: "TO",
		description: "Tonga"
	}, {
		code: "TT",
		description: "Trinidad and Tobago"
	}, {
		code: "TN",
		description: "Tunisia"
	}, {
		code: "TR",
		description: "Turkey"
	}, {
		code: "TM",
		description: "Turkmenistan"
	}, {
		code: "TC",
		description: "Turks and Caicos Islands"
	}, {
		code: "TV",
		description: "Tuvalu"
	}, {
		code: "UG",
		description: "Uganda"
	}, {
		code: "UA",
		description: "Ukraine"
	}, {
		code: "AE",
		description: "United Arab Emirates"
	}, {
		code: "GB",
		description: "United Kingdom"
	}, {
		code: "US",
		description: "United States"
	}, {
		code: "UM",
		description: "United States Minor Outlying Isl"
	}, {
		code: "UY",
		description: "Uruguay"
	}, {
		code: "UZ",
		description: "Uzbekistan"
	}, {
		code: "VU",
		description: "Vanuatu"
	}, {
		code: "VE",
		description: "Venezuela"
	}, {
		code: "VN",
		description: "Vietnam"
	}, {
		code: "VI",
		description: "Virgin Islands"
	}, {
		code: "WF",
		description: "Wallis and Futuna"
	}, {
		code: "YE",
		description: "Yemen"
	}, {
		code: "YU",
		description: "Yugoslavia"
	}, {
		code: "ZM",
		description: "Zambia"
	}, {
		code: "ZW",
		description: "Zimbabwe"
	}];
/* harmony export (immutable) */ __webpack_exports__["list_countries"] = list_countries;



/***/ }),

/***/ 0:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 1:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 5:
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

},["./src/main.js"]);
//# sourceMappingURL=app.bundle.js.map