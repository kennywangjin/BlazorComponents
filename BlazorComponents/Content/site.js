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

    var CHART_OBJECTS = new Map();
    Highcharts.setOptions({
        credits: {
            enabled: false
        },
        lang: {
            loading: ""
        }
    });
    function render(container, options, loading) {
        var chart = CHART_OBJECTS.get(container);
        options = __assign({}, options, { tooltip: { xDateFormat: "%A, %b %e, %H:%M" } });
        if (!chart) {
            chart = Highcharts.chart(container, options);
            CHART_OBJECTS.set(container, chart);
        }
        else {
            options.series &&
                options.series.forEach(function (series) {
                    if (!series.data || series.data.length === 0) {
                        delete series.data;
                    }
                });
            chart.update(options);
        }
        if (loading) {
            chart.showLoading();
        }
        else {
            chart.hideLoading();
        }
    }
    var destroy = function (container) {
        var chart = CHART_OBJECTS.get(container);
        if (chart)
            chart.destroy();
    };

    var $Modals = new Map();
    function show(element) {
        if (!element)
            return;
        var $modal = $Modals.get(element);
        if ($modal) {
            $modal.modal("show");
        }
        else {
            $modal = $(element).modal({
                backdrop: "static",
                keyboard: false
            });
            $Modals.set(element, $modal);
        }
    }
    function close(element, dotnet) {
        if (!element)
            return;
        var $modal = $Modals.get(element);
        if (!$modal)
            return;
        $modal
            .one("hidden.bs.modal", function () {
            dispose(element);
            dotnet.invokeMethodAsync("OnClosed");
        })
            .modal("hide");
    }
    function dispose(element) {
        if (!element)
            return;
        var $modal = $Modals.get(element);
        if (!$modal)
            return;
        $modal.modal("dispose");
        $Modals.delete(element);
    }

    var $Toasts = new Map();
    function show$1(element) {
        if (!element)
            return;
        var $toast = $Toasts.get(element);
        if (!$toast) {
            $toast = $(element).toast({
                autohide: false
            });
            $Toasts.set(element, $toast);
        }
        $toast.toast("show");
    }
    function close$1(element, dotnet) {
        if (!element)
            return;
        var $toast = $Toasts.get(element);
        if (!$toast)
            return;
        $toast
            .one("hidden.bs.toast", function () {
            dispose$1(element);
            dotnet.invokeMethodAsync("OnClosed");
        })
            .toast("hide");
    }
    function dispose$1(element) {
        if (!element)
            return;
        var $toast = $Toasts.get(element);
        if (!$toast)
            return;
        $toast.toast("dispose");
        $Toasts.delete(element);
    }

    (function (global) {
        global.__app = {
            chart: {
                render: render,
                destroy: destroy
            },
            modal: {
                show: show,
                close: close,
                dispose: dispose
            },
            toast: {
                show: show$1,
                close: close$1,
                dispose: dispose$1
            }
        };
    })(window);

}(Highcharts));
