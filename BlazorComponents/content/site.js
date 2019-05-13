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
                showLoading: showLoading,
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
