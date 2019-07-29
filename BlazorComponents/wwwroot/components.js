(function (Highcharts) {
    'use strict';

    Highcharts = Highcharts && Highcharts.hasOwnProperty('default') ? Highcharts['default'] : Highcharts;

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
    var MODAL = { open: open, close: close, dispose: dispose };
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
    var TOAST = { open: open$1, close: close$1, dispose: dispose$1 };
    //# sourceMappingURL=toast.js.map

    Highcharts.setOptions({
        lang: { loading: '' },
        credits: { enabled: false }
    });
    var CHART_OBJECTS = new Map();
    /**
     * render or update chart hosted in specified html element
     * @param element container element the chart is hosted in
     * @param options chart options
     * @param isLoading whether to show loading symbol (chart won't re-render if loading symbol is shown)
     */
    function render(element, options) {
        var chart = CHART_OBJECTS.get(element);
        if (!chart) {
            chart = Highcharts.chart(element, options);
            CHART_OBJECTS.set(element, chart);
        }
        else {
            chart.update(options);
        }
    }
    /**
     * show or hide loading symbol
     * @param element element where chart is hosted in
     * @param isLoading * whether show or hide loading symbol
     */
    function showLoading(element, isLoading) {
        var chart = CHART_OBJECTS.get(element);
        chart && (isLoading ? chart.showLoading() : chart.hideLoading());
    }
    /**
     * completely destroy chart object hosted in the specified element
     * @param element container element the chart may be hosted in
     */
    function destroy(element) {
        var chart = CHART_OBJECTS.get(element);
        chart && chart.destroy();
    }
    var CHART = { showLoading: showLoading, render: render, destroy: destroy };
    //# sourceMappingURL=chart.js.map

    //@ts-ignore
    window.__components = {
        modal: MODAL,
        toast: TOAST,
        chart: CHART
    };
    //# sourceMappingURL=components.js.map

}(Highcharts));
