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

    var ChartObjects = new Map();
    Highcharts.setOptions({
        credits: {
            enabled: false
        }, lang: {
            loading: ""
        }
    });
    var render = function (container, options, loading) {
        if (loading === void 0) { loading = false; }
        var chart = ChartObjects.get(container);
        options = __assign({}, options, { tooltip: { xDateFormat: "%A, %b %e, %H:%M" } });
        if (!chart) {
            // first time rendering
            chart = Highcharts.chart(container, options);
            ChartObjects.set(container, chart);
            if (loading)
                chart.showLoading();
        }
        else {
            // chart updating
            if (loading) {
                chart.showLoading();
            }
            else {
                chart.update(options);
                if (!loading)
                    chart.hideLoading();
            }
        }
    };
    var destroy = function (container) {
        var chart = ChartObjects.get(container);
        if (chart)
            chart.destroy();
    };

    var show = function (element, dotnetModal) {
        $(element)
            .one("shown.bs.modal", function () {
            dotnetModal.invokeMethodAsync("OnModalShownAsync");
        })
            .modal({
            backdrop: "static",
            keyboard: false
        });
    };
    var close = function (element, dotnetModal) {
        $(element)
            .one("hidden.bs.modal", function () {
            $(element).modal("dispose");
            dotnetModal.invokeMethodAsync("OnModalClosedAsync");
        })
            .modal("hide");
    };

    var show$1 = function (element, dotnetToast) {
        $(element)
            .one("shown.bs.toast", function () {
            dotnetToast.invokeMethodAsync("OnToastShownAsync");
        })
            .toast("show");
    };
    var close$1 = function (element, dotnetToast) {
        $(element)
            .one("hidden.bs.toast", function () {
            $(element).toast("dispose");
            dotnetToast.invokeMethodAsync("OnToastClosedAsync");
        })
            .toast("hide");
    };

    (function (global) {
        global.__app = {
            chart: {
                render: render,
                destroy: destroy
            },
            modal: {
                show: show,
                close: close
            },
            toast: {
                show: show$1,
                close: close$1
            }
        };
    })(window);

}(Highcharts));
