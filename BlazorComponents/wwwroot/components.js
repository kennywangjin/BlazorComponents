(function (Highcharts) {
    'use strict';

    Highcharts = Highcharts && Highcharts.hasOwnProperty('default') ? Highcharts['default'] : Highcharts;

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    var ChartCache = new Map();
    Highcharts.setOptions({
        credits: { enabled: false },
        lang: { loading: "" }
    });
    function render(container, options, loading) {
        options = __assign({}, options, { tooltip: { xDateFormat: "%A, %b %e, %H:%M" } });
        var chart = ChartCache.get(container);
        if (!chart) {
            chart = Highcharts.chart(container, options);
            ChartCache.set(container, chart);
        }
        else {
            chart.update(options);
        }
        if (loading) {
            chart.showLoading();
        }
        else {
            chart.hideLoading();
        }
    }
    function destroy(container) {
        var chart = ChartCache.get(container);
        if (chart)
            chart.destroy();
    }
    var Chart = { render: render, destroy: destroy };
    //# sourceMappingURL=chart.js.map

    var $ModalCache = new Map();
    function open(element) {
        if (!element) {
            return Promise.resolve(true);
        }
        var $modal = $ModalCache.get(element);
        if (!$modal) {
            $modal = $(element).modal({
                backdrop: "static",
                keyboard: false,
                show: false
            });
            $ModalCache.set(element, $modal);
        }
        return new Promise(function (resolve) {
            $modal
                .one("shown.bs.modal", function () {
                resolve(true);
            })
                .modal("show");
        });
    }
    function close(element) {
        if (!element) {
            return Promise.resolve(true);
        }
        var $modal = $ModalCache.get(element);
        if (!$modal) {
            return Promise.resolve(true);
        }
        return new Promise(function (resolve) {
            $modal
                .one("hidden.bs.modal", function () {
                dispose(element);
                resolve(true);
            })
                .modal("hide");
        });
    }
    function dispose(element) {
        if (!element) {
            return true;
        }
        var $modal = $ModalCache.get(element);
        if (!$modal) {
            return true;
        }
        $modal.modal("dispose");
        $ModalCache.delete(element);
        return true;
    }
    var Modal = { open: open, close: close, dispose: dispose };
    //# sourceMappingURL=modal.js.map

    var $ToastCache = new Map();
    function open$1(element) {
        if (!element) {
            return Promise.resolve(true);
        }
        var $toast = $ToastCache.get(element);
        if (!$toast) {
            $toast = $(element).toast({
                autohide: false
            });
            $ToastCache.set(element, $toast);
        }
        return new Promise(function (resolve) {
            $toast
                .one("shown.bs.toast", function () {
                resolve(true);
            })
                .toast("show");
        });
    }
    function close$1(element) {
        if (!element) {
            return Promise.resolve(true);
        }
        var $toast = $ToastCache.get(element);
        if (!$toast) {
            return Promise.resolve(true);
        }
        return new Promise(function (resolve) {
            $toast
                .one("hidden.bs.toast", function () {
                dispose$1(element);
                resolve(true);
            })
                .toast("hide");
        });
    }
    function dispose$1(element) {
        if (!element) {
            return true;
        }
        var $toast = $ToastCache.get(element);
        if (!$toast) {
            return true;
        }
        $toast.toast("dispose");
        $ToastCache.delete(element);
        return true;
    }
    var Toast = { open: open$1, close: close$1, dispose: dispose$1 };
    //# sourceMappingURL=toast.js.map

    (function (global) {
        global.__components = {
            chart: Chart,
            modal: Modal,
            toast: Toast
        };
    })(window);
    //# sourceMappingURL=components.js.map

}(Highcharts));
