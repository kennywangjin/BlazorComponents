(function (Highcharts) {
    'use strict';

    Highcharts = Highcharts && Highcharts.hasOwnProperty('default') ? Highcharts['default'] : Highcharts;

    var ChartObjects = new Map();
    var render = function (container, options) {
        var chart = ChartObjects.get(container);
        if (chart) {
            chart.update(options);
        }
        else {
            chart = Highcharts.chart(container, options);
            ChartObjects.set(container, chart);
        }
        chart.hideLoading();
    };
    var showLoading = function (container) {
        var chart = ChartObjects.get(container);
        if (chart) {
            chart.showLoading();
        }
    };
    var destroy = function (container) {
        var chart = ChartObjects.get(container);
        if (chart) {
            chart.destroy();
        }
    };

    (function (global) {
        global.__app = {
            chart: {
                render: render,
                showLoading: showLoading,
                destroy: destroy
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
