import Highcharts, { Options, Chart } from "highcharts";

const CHART_OBJECTS = new Map<HTMLElement, Chart>();

Highcharts.setOptions({
    credits: {
        enabled: false
    },
    lang: {
        loading: ""
    }
});

export function render(
    container: HTMLElement,
    options: Highcharts.Options,
    loading: boolean
) {
    let chart = CHART_OBJECTS.get(container);
    options = { ...options, tooltip: { xDateFormat: "%A, %b %e, %H:%M" } };
    if (!chart) {
        chart = Highcharts.chart(container, options);
        CHART_OBJECTS.set(container, chart);
    } else {
        options.series &&
            options.series.forEach(series => {
                if (!series.data || series.data.length === 0) {
                    delete series.data;
                }
            });
        chart.update(options);
    }
    if (loading) {
        chart.showLoading();
    } else {
        chart.hideLoading();
    }
}

export const destroy = (container: HTMLElement) => {
    const chart = CHART_OBJECTS.get(container);
    if (chart) chart.destroy();
};
