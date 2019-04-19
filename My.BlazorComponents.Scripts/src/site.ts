import Highcharts from "highcharts";
import "./site.scss";

(function(global: any) {
    const getChart = (element: HTMLElement): Highcharts.Chart | undefined => {
        const attr = element.getAttribute("data-highcharts-chart");
        const chartId = Number.parseInt(attr || "-1", 10);
        return Highcharts.charts[chartId];
    };

    global.__app = {
        chart: {
            render: (element: HTMLElement, options: Highcharts.Options) => {
                let chart = getChart(element);

                if (chart) {
                    chart.update(options);
                } else {
                    options = {
                        global: {
                            useUTC: false
                        },
                        lang: {
                            loading: undefined
                        },
                        chart: {
                            style: {
                                fontFamily:
                                    "'Helvetica Neue', Helvetica, Arial, sans-serif"
                            }
                        },
                        credits: { enabled: false },
                        ...options
                    };
                    chart = Highcharts.chart(element, options);
                }
                chart.hideLoading();
            },
            showLoading: (element: HTMLElement) => {
                const chart = getChart(element);
                if (chart) {
                    chart.showLoading();
                }
            },
            destroy: (element: HTMLElement) => {
                const chart = getChart(element);
                if (chart) {
                    chart.destroy();
                }
            }
        },
        toast: {
            show: (element: HTMLElement, dotnetHelper: any) => {
                $(element)
                    .one("shown.bs.toast", () => {
                        dotnetHelper.invokeMethodAsync("OnToastShownAsync");
                    })
                    .toast("show");
            },
            close: (element: HTMLElement, dotnetHelper: any) => {
                $(element)
                    .one("hidden.bs.toast", () => {
                        $(element).toast("dispose");
                        dotnetHelper.invokeMethodAsync("OnToastClosedAsync");
                    })
                    .toast("hide");
            }
        },
        modal: {
            show: (element: HTMLElement, dotnetHelper: any) => {
                $(element)
                    .one("shown.bs.modal", () => {
                        dotnetHelper.invokeMethodAsync("OnModalShownAsync");
                    })
                    .modal({ backdrop: "static", keyboard: false });
            },
            close: (element: HTMLElement, dotnetHelper: any) => {
                $(element)
                    .one("hidden.bs.modal", () => {
                        $(element).modal("dispose");
                        dotnetHelper.invokeMethodAsync("OnModalClosedAsync");
                    })
                    .modal("hide");
            }
        }
    };
})(window);
