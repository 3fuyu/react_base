/**
 * Created by 3fuyu on 16/03/30.
 */

"use strict";

var _ = require('lodash');

var open = {
    available: function () {
        return !!window.ehopenapi;
    },
    hasApi: function (name) {
        if (!open.available()) {
            return false;
        }
        return !!window.ehopenapi[name];
    }
};

var openapi = null;

var funcs = ['closeWindow', 'chooseImage', 'zlPay', 'serviceAddressConfirm', 'msgTo', 'qrParse', 'print', 'pay', 'pickImage', 'uploadImage', 'onBackPressed', 'onBackPressedIntercept'];

_.each(funcs, function (value) {
    open[value] = function (params) {
        if (!openapi && window.ehopenapi) {
            openapi = window.ehopenapi;
        }
        if (!openapi) {
            return;
        }
        if (!openapi[value]) {
            return;
        }
        openapi[value](params);
    };
});

module.exports = open;

