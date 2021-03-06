/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "src";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 205);
/******/ })
/************************************************************************/
/******/ ({

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var queryParams = function queryParams(params) {
    var esc = encodeURIComponent;
    return Object.keys(params).map(function (k) {
        return esc(k) + "=" + esc(params[k]);
    }).join("&");
};

var request = exports.request = function request() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var url = "http://localhost:8000";
    options = Object.assign({
        credentials: "same-origin",
        redirect: "error"
    }, options);
    if (options.queryParams) {
        if (options.method == "POST") {
            options.headers = {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
            };

            options.body = getFormData(options.queryParams);
        } else {
            url += (url.indexOf("?") === -1 ? "?" : "&") + queryParams(options.queryParams);
        }
        delete options.queryParams;
    }
    return fetch(url, options).then(function (data) {
        return data.json();
    });
};

var getFormData = function getFormData(params) {
    return Object.keys(params).map(function (key) {
        return encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
    }).join("&");
};

/***/ }),

/***/ 205:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _request = __webpack_require__(2);

var _SiteMeta = __webpack_require__(206);

var _SiteMeta2 = _interopRequireDefault(_SiteMeta);

var _Utils = __webpack_require__(207);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ExtensionBackground = function () {
    function ExtensionBackground() {
        _classCallCheck(this, ExtensionBackground);

        this.initialCountData = {
            links: { rows: [], total: 0 },
            groups: { rows: [], total: 0 },
            lastUpdateId: 0
        };
        this.events();
        this.listeners();
    }

    _createClass(ExtensionBackground, [{
        key: "events",
        value: function events() {
            var _this = this;

            window.retrieveSiteMeta = _SiteMeta2.default;
            window.countData = this.initialCountData;
            if (localStorage.lastUpdateId) {
                window.countData.lastUpdateId = parseInt(localStorage.lastUpdateId);
            }
            window.resetCountData = function () {
                window.countData = _this.initialCountData;
                if (localStorage.lastUpdateId) {
                    window.countData.lastUpdateId = parseInt(localStorage.lastUpdateId);
                }
            };
            window.updateNotification = function (count) {
                count = count > 99 ? "99+" : count;
                chrome.browserAction.setBadgeText({
                    text: count.toString()
                });
                window.resetCountData();
            };
            window.sendClickedStat = function (data) {
                return (0, _request.request)(data);
            };
            window.nData = {};

            //Start polling
            setInterval(function () {
                (0, _Utils.checkStorage)();
                if (!navigator.onLine) return false;
                if (chrome && chrome.storage && chrome.storage.sync) {
                    _this.checkUpdates();
                }
            }, 20000);

            chrome.notifications.onClicked.addListener(function (t) {
                if (nData.links.rows.length > 0) {
                    window.open(nData.links.rows[0].url);
                }
            });
        }
    }, {
        key: "checkUpdates",
        value: function checkUpdates() {
            chrome.storage.sync.get("userid", function (items) {
                var userid = items.userid;
                var group = localStorage.defaultGroup;
                if (!userid || !group) return false;
                var manifest = chrome.runtime.getManifest();
                var version = manifest.version;

                var params = {
                    queryParams: {
                        group: group,
                        action: "getNotificatonUpdates",
                        chrome_id: userid,
                        version: version,
                        lastUpdateId: window.countData.lastUpdateId
                    }
                };
                (0, _request.request)(params).then(function (data) {
                    if (data.lastUpdateId == countData.lastUpdateId) {
                        return;
                    }
                    nData = data;
                    //data contains link updates and group updates
                    var totalCount = data.count;
                    var views = chrome.extension.getViews({
                        type: "popup"
                    });
                    countData = data;
                    localStorage.lastUpdateId = parseInt(data.lastUpdateId);

                    if (data.count === 0 || views.length != 0) return;

                    chrome.browserAction.setBadgeText({
                        text: totalCount.toString()
                    });

                    var sound = localStorage.sound;
                    var notification = localStorage.notification;

                    if (sound !== null && sound == "1") {
                        var yourSound = new Audio("../public/sound/noti.mp3");
                        yourSound.play();
                    }

                    if (notification !== null && notification == "1") {
                        var itemList = [];
                        var linkCount = 0,
                            likeCount = 0,
                            commentCount = 0,
                            others = 0;
                        data.links.rows.forEach(function (activity) {
                            var type = "link";
                            if (activity.type == "link") {
                                linkCount++;
                            } else if (activity.type == "comment") {
                                commentCount++;
                            } else if (activity.type == "like") {
                                likeCount++;
                            } else {
                                others++;
                            }
                            var title = (0, _Utils.getFormatedText)(activity);
                            itemList.push({
                                title: title,
                                message: (0, _Utils.getEmoji)(activity.type)
                            });
                        });

                        data.groups.rows.forEach(function (activity) {
                            others++;
                            var title = (0, _Utils.getFormatedText)(activity);
                            itemList.push({
                                title: title,
                                message: (0, _Utils.getEmoji)(activity.type)
                            });
                        });

                        var title = (0, _Utils.getTitle)(data.count);

                        var options = {
                            type: "list",
                            message: "New Links posted",
                            title: title,
                            iconUrl: chrome.runtime.getURL("public/icons/notification.png"),
                            items: itemList
                        };

                        if (chrome.notifications) {
                            chrome.notifications.create(new Date().toString(), options);
                        }
                    }
                });
            });
        }
    }, {
        key: "listeners",
        value: function listeners() {
            var _this2 = this;

            /**
             * If the extension is installed or updated, update the version
             * in the server
             */
            chrome.runtime.onInstalled.addListener(function (details) {
                _this2.updateVersion();
            });
            /**
             * Check for updates every 2 hours
             */
            setInterval(function () {
                if (chrome.runtime && typeof chrome.runtime.requestUpdateCheck === "function") {
                    chrome.runtime.requestUpdateCheck(function () {});
                }
            }, 1000 * 3600 * 2);
        }
    }, {
        key: "updateVersion",
        value: function updateVersion() {
            var manifest = chrome.runtime.getManifest();
            var version = manifest.version;
            var chrome_id = localStorage.chrome_id;
            if (chrome_id !== null) {
                var params = {
                    method: "POST",
                    queryParams: {
                        version: version,
                        chrome_id: chrome_id,
                        action: "updateUserVersion"
                    }
                };
                (0, _request.request)(params);
            }
        }
    }]);

    return ExtensionBackground;
}();

new ExtensionBackground();

/***/ }),

/***/ 206:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (passed_message, callback) {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, function (tabs) {
        if (tabs[0] && tabs[0].id) {
            chrome.tabs.sendMessage(tabs[0].id, passed_message, function (response) {
                callback(response);
            });
        }
    });
};

/***/ }),

/***/ 207:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getEmoji = exports.getFormatedText = exports.getTitle = exports.checkStorage = undefined;

var _Templates = __webpack_require__(208);

var _Templates2 = _interopRequireDefault(_Templates);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var checkStorage = exports.checkStorage = function checkStorage() {
    if (typeof localStorage.notification === "undefined") {
        localStorage.notification = 1;
    }
    if (typeof localStorage.sound === "undefined") {
        localStorage.sound = 1;
    }
    localStorage.theme = "dark";
};

var getTitle = exports.getTitle = function getTitle(totalNotifications) {
    var getVerb = function getVerb(count, word) {
        return count > 1 ? word + "s" : word;
    };
    return "You have got " + totalNotifications + " " + getVerb(totalNotifications, "notification");
};

var getFormatedText = exports.getFormatedText = function getFormatedText(activity) {
    //activity type
    var type = activity.type;
    var template = _Templates2.default[type];
    if (!template) {
        return "Couldn't decode the message. Maybe something very personal";
    }
    var text = template.replace(/{(.*?)}/gi, function (variable) {
        // convert {VAR} to VAR
        variable = variable.substring(1, variable.length - 1).toLowerCase();

        return activity[variable];
    });
    return text;
};

var getEmoji = exports.getEmoji = function getEmoji(type) {
    switch (type) {
        case "like":
            return "❤️";
        case "link":
            return "🔗";
        case "comment":
            return "🗣";
        case "joined_linkcast":
            return "🙍🏻";
        case "joined_group":
            return "👨‍👨‍👦‍👦";
        case "group_invite":
            return "✉️";
        case "group_invite_rejected":
            return "😏";
        case "linkcast":
            return "📣";
        default:
            return "";
    }
};

/***/ }),

/***/ 208:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
    link: "{POSTER} posted {TITLE} in {GROUP_NAME}",
    like: "{NICKNAME} liked {POSTER}'s link - {TITLE}",
    comment: "{NICKNAME} commented - {COMMENT} on {POSTER}'s link",
    joined_group: "{NICKNAME} joined the group {GROUP_NAME}",
    joined_linkcast: "{NICKNAME} joined Linkcast",
    new_group: "{NICKNAME} created a new group - {GROUP_NAME}",
    group_invite: "{NICKNAME} invited you to join {GROUP_NAME}",
    group_invite_rejected: "{NICKNAME} rejected your invite to join {GROUP_NAME}",
    request_private_group_join: "{NICKNAME} wants to join {GROUP_NAME}"
};

/***/ })

/******/ });
//# sourceMappingURL=background.js.map