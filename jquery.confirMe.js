/**
 * confirMe.js v1.0.1
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2014, Mohammad Wali
 */
(function ($, win, doc) {
    var head = doc.head;
    var _doc = $(doc);

    // plugin definition
    $.confirMe = confirmMe;
    $.confirMe.defaults = {};
    $.confirMe.defaults.message = "";
    $.confirMe.defaults.onConfirm = noop;
    $.confirMe.defaults.onCancel = noop;
    $.confirMe.defaults.onClose = noop;
    $.confirMe.defaults.onCustom = noop;
    $.confirMe.defaults.labels = {};
    $.confirMe.defaults.labels.confirm = "Yes";
    $.confirMe.defaults.labels.cancel = "No";
    $.confirMe.defaults.labels.custom = "";
    $.confirMe.close = closeConfirmMe;

    _doc.keyup(onEscapeClick);


    ////////////////////////////
    function noop() {

    }

    function confirmMe(options) {
        var settings = mergeObject(options);

        if (typeof settings.message == "undefined") {
            error("Message is not defined!");
        }

        if (settings.message.trim() == "") {
            error("Message is empty!");
        }

        if (!$(head).find("#confirMe-styles").length) {
            appendStyles();
        }

        settings.hasCustomButton = (settings.labels.custom.trim().length);


        return initialize(settings);
    }

    function closeConfirmMe(button) {
        button = button || null;
        var elm;

        if (button == null) {
            elm = $($(".confirme-popup.is-visible").get(this.length - 1));
        } else {
            elm = button.parents(".confirme-popup.is-visible");
        }

        elm.removeClass('is-visible');
        setTimeout(removeElem, 200);

        function removeElem() {
            elm.remove();
        }
    }


    function initialize(set) {
        var main = doc.createElement("div");
        var wrapper = doc.createElement("div");
        var text = doc.createElement("p");
        var btn_list = doc.createElement("ul");
        var list_items = [doc.createElement("li"), doc.createElement("li"), doc.createElement("li")];
        var confirm_btn = doc.createElement("a");
        var cancel_btn = doc.createElement("a");
        var close_btn = doc.createElement("a");
        var custom_btn = doc.createElement("a");

        //set id
        var len = $(".confirme-popup").length + 1;
        var id = "confirme-" + len + (Math.floor(Math.random() * (999999999 - 9999 + 1)));
        var _id = "#" + id;
        main.setAttribute("id", id);


        // add Classes
        main.className = "confirme-popup";
        main.setAttribute("role", "alert");
        wrapper.className = "confirme-popup-container";
        btn_list.className = "confirme-buttons list-inline m-n p-b p-l p-r";
        confirm_btn.className = "btn btn-md rounded w-xs confirme-popup-confirm";
        cancel_btn.className = "btn btn-md rounded w-xs confirme-popup-cancel";
        custom_btn.className = "btn btn-md rounded w-xs confirme-popup-custom";
        close_btn.className = "confirme-popup-close";


        // Append items
        doc.body.appendChild(doc.createComment("confirme-popup starts"));
        doc.body.appendChild(main);
        main.appendChild(wrapper);
        wrapper.appendChild(text);
        wrapper.appendChild(btn_list);
        wrapper.appendChild(close_btn);
        btn_list.appendChild(list_items[0]);
        list_items[0].appendChild(confirm_btn);
        btn_list.appendChild(list_items[1]);
        list_items[1].appendChild(cancel_btn);


        if (set.hasCustomButton) {
            btn_list.appendChild(list_items[2]);
            list_items[2].appendChild(custom_btn);
        }


        doc.body.appendChild(doc.createComment("confirme-popup ends"));

        //add texts
        confirm_btn.text = set.labels.confirm;
        cancel_btn.text = set.labels.cancel;
        custom_btn.text = set.labels.custom;
        text.innerHTML = set.message;

        //add events
        $(_id + " a.confirme-popup-close").click(onCloseClick);
        $(_id + " a.confirme-popup-cancel").click(onCancelClick);
        $(_id + " a.confirme-popup-confirm").click(onConfirmClick);
        $(_id + " a.confirme-popup-custom").click(onCustomClick);

        setTimeout(onTimeout, 100);


        ////////////////////////
        function onTimeout() {
            $(main).addClass("is-visible");
        }

        function onCloseClick(event) {
            event.preventDefault();
            $.confirMe.close($(this));
            //callbacks
            if (typeof set.onClose == "function") {
                set.onClose();
            }
        }

        function onCancelClick(event) {
            event.preventDefault();
            $.confirMe.close($(this));
            //callbacks
            if (typeof set.onCancel == "function") {
                set.onCancel()
            }
        }

        function onConfirmClick(event) {
            event.preventDefault();
            //callbacks
            if (typeof set.onCancel == "function") {
                set.onConfirm();
            }
            $.confirMe.close($(this));
        }

        function onCustomClick() {
            event.preventDefault();
            //callbacks
            if (typeof set.onCustom == "function") {
                var elem = $(this);
                set.onCustom(function close() {
                    $.confirMe.close(elem);
                });
            }
        }

    }

    function appendStyles() {
        return $(head).append("<style type='text/css' id='confirMe-styles'>.p-b{padding-bottom:15px}.p-r{padding-right:15px}.p-l{padding-left:15px}.m-n{margin:0!important}.list-inline{margin-left:-5px;list-style:none}.confirme-popup{position:fixed;left:0;top:0;height:100%;width:100%;background-color:rgba(94,110,141,.9);opacity:0;visibility:hidden;-webkit-transition:opacity .3s 0s,visibility 0s .3s;-moz-transition:opacity .3s 0s,visibility 0s .3s;transition:opacity .3s 0s,visibility 0s .3s;z-index:9999999}.confirme-popup.is-visible{opacity:1;visibility:visible;-webkit-transition:opacity .3s 0s,visibility 0s 0s;-moz-transition:opacity .3s 0s,visibility 0s 0s;transition:opacity .3s 0s,visibility 0s 0s}.confirme-popup-container{position:relative;width:90%;max-width:400px;margin:4em auto;background:#FFF;border-radius:.25em .25em .4em .4em;text-align:center;box-shadow:0 0 20px rgba(0,0,0,.2);-webkit-transform:translateY(-40px);-moz-transform:translateY(-40px);-ms-transform:translateY(-40px);-o-transform:translateY(-40px);transform:translateY(-40px);-webkit-backface-visibility:hidden;-webkit-transition-property:-webkit-transform;-moz-transition-property:-moz-transform;transition-property:transform;-webkit-transition-duration:.3s;-moz-transition-duration:.3s;transition-duration:.3s}.confirme-popup-container p{padding:2em 1em .5em;font-size:1.8em}.confirme-popup-container .confirme-buttons:after{content:'';display:table;clear:both}.confirme-popup-container .confirme-buttons li{width:33.333%;display:inline-block}.confirme-popup-container .confirme-buttons a{display:block;text-transform:uppercase;color:#FFF;-webkit-transition:background .2s;-moz-transition:background .2s;transition:background .2s;background:#84d6c5;border:none;margin:0 auto}.confirme-popup-container .confirme-buttons li a.confirme-popup-confirm{background:#fc7169}.no-touch .confirme-popup-container .confirme-buttons li a.confirme-popup-confirm:hover{background-color:#fc8982!important}.confirme-popup-container .confirme-buttons li a.confirme-popup-cancel{background:#b6bece}.no-touch .confirme-popup-container .confirme-buttons li a.confirme-popup-cancel:hover{background-color:#c5ccd8!important}.confirme-popup-container .confirme-popup-close{position:absolute;top:8px;right:8px;width:30px;height:30px}.confirme-popup-container .confirme-popup-close::after,.confirme-popup-container .confirme-popup-close::before{content:'';position:absolute;top:12px;width:14px;height:3px;background-color:#8f9cb5}.confirme-popup-container .confirme-popup-close::before{-webkit-transform:rotate(45deg);-moz-transform:rotate(45deg);-ms-transform:rotate(45deg);-o-transform:rotate(45deg);transform:rotate(45deg);left:8px}.confirme-popup-container .confirme-popup-close::after{-webkit-transform:rotate(-45deg);-moz-transform:rotate(-45deg);-ms-transform:rotate(-45deg);-o-transform:rotate(-45deg);transform:rotate(-45deg);right:8px}.is-visible .confirme-popup-container{-webkit-transform:translateY(0);-moz-transform:translateY(0);-ms-transform:translateY(0);-o-transform:translateY(0);transform:translateY(0)}@media only screen and (min-width:1170px){.confirme-popup-container{margin:8em auto}}</style>");
    }

    function error(e) {
        throw new Error("ConfirMe Cannot Run => " + e);
    }

    function onEscapeClick(event) {
        if (event.which == "27") $.confirMe.close();
    }

    function mergeObject(options) {
        return $.extend(true, $.extend(true, {}, $.confirMe.defaults), options);
    }

})(window.jQuery, window, document);
