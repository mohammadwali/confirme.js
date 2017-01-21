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
 *     on: function(name, closeModal, button, event) {
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
    const REMOVE_DELAY = 200;
    const INIT_DELAY = 150;
    const DEFAULT_BUTTON_CLASS = "confirMe-button";

    var avialableModals = [];

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

        ///generating buttons and doing rest of stuff
        var data = generateModal(settings);

        ///setting up message
        data.selectors.messageContainer.text(settings.message);

        //caching modal object
        avialableModals.push(data);

        //pushing modal to body
        $("body").append(data.selectors.modal);

        //initialize
        setTimeout(function () {
            //binding buttons
            data.selectors.buttons.on("click", clickHandler);

            data.selectors.modal.addClass("is-visible");
        }, INIT_DELAY);


        //////////////////
        function clickHandler(event) {
            var button = $(this);
            var name = button.data("confirMeName");

            utils.dispatch(this, [name, closeModal, button, event], settings.on);

            function closeModal() {
                data.selectors.modal.removeClass("is-visible");

                setTimeout(function () {

                    data.selectors.modal.remove();

                    flush();

                }, REMOVE_DELAY);

            }
        }

        function flush() {
            $.each(avialableModals, function (modalObject, index) {
                if (modalObject.id === data.id) {
                    avialableModals.splice(index, 1);
                }
            });

            data.selectors.buttons.off("click", clickHandler);
            data = null;
        }
    }

    function generateModal(settings) {
        var wrapper = $("<div class='confirme-popup' role='alertdialog'></div>");
        var container = $("<div class='confirme-popup-container'></div>");
        var messageContainer = $("<p></p>");
        var buttonsContainer = $("<ul class='confirme-buttons list-inline m-n p-b p-l p-r'>");
        var wrapperId = utils.randId();

        container.append(messageContainer);
        container.append(buttonsContainer);
        wrapper.append(container);
        wrapper.attr("id", "confirMe-" + wrapperId);

        $.each(settings.labels, function (name, text) {
            var li = $("<li></li>");
            var a = $("<a class='btn btn-md rounded w-xs'></a>");

            a.text(text)
                .addClass(DEFAULT_BUTTON_CLASS)
                .data("confirMeName", name);


            if (name === "confirm" || name === "cancel") {
                a.addClass("confirme-popup-" + name);
            }

            li.append(a);

            buttonsContainer.append(li);
        });

        return {
            id: wrapperId,
            selectors: {
                modal: wrapper,
                buttons: wrapper.find(".".concat(DEFAULT_BUTTON_CLASS)),
                buttonsContainer: buttonsContainer,
                messageContainer: messageContainer
            }
        }
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
        },
        randId: function () {
            return Math.random().toString(36).substr(2, 10);
        }
    };
}());
