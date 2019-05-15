import Highcharts, { Options, Chart } from "highcharts";

const ChartObjects = new Map<HTMLElement, Chart>();

Highcharts.setOptions({
    credits: {
        enabled: false
    }, lang: {
        loading: ""
    }
});

export const render = (
    container: HTMLElement,
    options: Options,
    loading: boolean = false
) => {
    let chart = ChartObjects.get(container);
    options = {
        ...options,
        ...{ tooltip: { xDateFormat: "%A, %b %e, %H:%M" } }
    };
    if (!chart) {
        // first time rendering
        chart = Highcharts.chart(container, options);
        ChartObjects.set(container, chart);
        if (loading) chart.showLoading();
    } else {
        // chart updating
        if (loading) {
            chart.showLoading();
        } else {
            chart.update(options);
            if (!loading) chart.hideLoading();
        }
    }
};

export const destroy = (container: HTMLElement) => {
    const chart = ChartObjects.get(container);
    if (chart) chart.destroy();
};
