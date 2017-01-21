/**
 * confirMe.js v2.0.0
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2017, Mohammad Wali
 *
 * @example
 *
 *  $.confirMe({
 *     message: "Do you want to buy this or subscribe for later?",
 *     labels: {
 *         confirm: "Yes",
 *         cancel: "No",
 *         custom: "Subscribe"
 *     },
 *     classes: {
 *         custom: ["subscribe-button"]
 *     },
 *     on: function(type, closeModal, button, event) {
 *
 *     }
 * })
 *
 *
 */
(function (globals, factory, utils) {

    if (utils.isUndefined(globals.jQuery)) {
        utils.error("jQuery not found");
    }
    else {

        globals.jQuery.confirMe = factory(globals, globals.jQuery, utils);

    }

})(window, function (window, $, utils) {

    const ESCAPE_KEY_CODE = 27;
    const DEFAULT_BUTTON_CLASSES = ["confirMe-button"];

    var defaultOptions = {};
    defaultOptions.message = "Are you sure you want to do this ?";
    defaultOptions.labels = {};
    defaultOptions.labels.confirm = "Yes";
    defaultOptions.labels.cancel = "No";

    defaultOptions.classes = {};
    defaultOptions.classes.confirm = [];

    defaultOptions.on = utils.noop;


    return confirMe;

    function confirMe(options) {
        var settings = utils.mergeObj(defaultOptions, options);


    }


    function triggerCallback() {

    }

}, function () {
    return {
        isUndefined: function (item) {
            return (typeof item === "undefined");
        },
        isFunction: function (fn) {
            return (typeof fn === "function");
        },
        error: function (message) {
            throw new Error(message);
        },
        mergeObj: function (mergeTo, obj) {
            return $.extend(true, $.extend(true, {}, mergeTo), obj);
        },
        noop: function () {
        },
        dispatch: function (scope, arguments, callback) {
            return callback.apply(scope, arguments);
        }
    };
}());
