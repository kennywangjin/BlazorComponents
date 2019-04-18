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

    (function (global) {
        var getChart = function (element) {
            var attr = element.getAttribute("data-highcharts-chart");
            var chartId = Number.parseInt(attr || "-1", 10);
            return Highcharts.charts[chartId];
        };
        global.__app = {
            chart: {
                render: function (element, options) {
                    var chart = getChart(element);
                    if (chart) {
                        chart.update(options);
                    }
                    else {
                        options = __assign({ global: {
                                useUTC: false
                            }, chart: {
                                style: {
                                    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif"
                                }
                            }, credits: { enabled: false } }, options);
                        Highcharts.chart(element, options);
                    }
                },
                destroy: function (element) {
                    var chart = getChart(element);
                    if (chart) {
                        chart.destroy();
                    }
                }
            },
            toast: {
                show: function (element, dotnetHelper) {
                    $(element)
                        .one("shown.bs.toast", function () {
                        dotnetHelper.invokeMethodAsync("OnToastShownAsync");
                    })
                        .toast("show");
                },
                close: function (element, dotnetHelper) {
                    $(element)
                        .one("hidden.bs.toast", function () {
                        $(element).toast("dispose");
                        dotnetHelper.invokeMethodAsync("OnToastClosedAsync");
                    })
                        .toast("hide");
                }
            },
            modal: {
                show: function (element, dotnetHelper) {
                    $(element)
                        .one("shown.bs.modal", function () {
                        dotnetHelper.invokeMethodAsync("OnModalShownAsync");
                    })
                        .modal({ backdrop: "static", keyboard: false });
                },
                close: function (element, dotnetHelper) {
                    $(element)
                        .one("hidden.bs.modal", function () {
                        $(element).modal("dispose");
                        dotnetHelper.invokeMethodAsync("OnModalClosedAsync");
                    })
                        .modal("hide");
                }
            }
        };
    })(window);

}(Highcharts));
