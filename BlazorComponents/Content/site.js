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
    function show(element) {
        if (!element)
            return;
        var $modal = $ModalCache.get(element);
        if ($modal) {
            $modal.modal("show");
        }
        else {
            $modal = $(element).modal({
                backdrop: "static",
                keyboard: false
            });
            $ModalCache.set(element, $modal);
        }
    }
    function close(element, dotnet) {
        if (element) {
            var $modal_1 = $ModalCache.get(element);
            if ($modal_1) {
                return new Promise(function (resolve) {
                    $modal_1
                        .one("hidden.bs.modal", function () {
                        dispose(element);
                        resolve();
                        dotnet.invokeMethodAsync("OnModalClosed");
                    })
                        .modal("hide");
                });
            }
        }
        return Promise.resolve();
    }
    function dispose(element) {
        if (!element)
            return;
        var $modal = $ModalCache.get(element);
        if (!$modal)
            return;
        $modal.modal("dispose");
        $ModalCache.delete(element);
    }
    var Modal = { show: show, close: close, dispose: dispose };
    //# sourceMappingURL=modal.js.map

    var $ToastCache = new Map();
    function show$1(element) {
        if (!element)
            return;
        var $toast = $ToastCache.get(element);
        if (!$toast) {
            $toast = $(element).toast({
                autohide: false
            });
            $ToastCache.set(element, $toast);
        }
        $toast.toast("show");
    }
    function close$1(element, dotnet) {
        if (element) {
            var $toast_1 = $ToastCache.get(element);
            if ($toast_1) {
                return new Promise(function (resolve) {
                    $toast_1
                        .one("hidden.bs.toast", function () {
                        dispose$1(element);
                        resolve();
                        dotnet.invokeMethodAsync("OnToastClosed");
                    })
                        .toast("hide");
                });
            }
        }
    }
    function dispose$1(element) {
        if (!element)
            return;
        var $toast = $ToastCache.get(element);
        if (!$toast)
            return;
        $toast.toast("dispose");
        $ToastCache.delete(element);
    }
    var Toast = { show: show$1, close: close$1, dispose: dispose$1 };
    //# sourceMappingURL=toast.js.map

    (function (global) {
        global.__app = {
            chart: Chart,
            modal: Modal,
            toast: Toast
        };
    })(window);
    //# sourceMappingURL=site.js.map

}(Highcharts));
