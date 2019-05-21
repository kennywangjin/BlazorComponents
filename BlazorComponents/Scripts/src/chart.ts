import Highcharts from "highcharts";

const ChartCache = new Map<HTMLElement, Highcharts.Chart>();

Highcharts.setOptions({
    credits: { enabled: false },
    lang: { loading: "" }
});

function render(
    container: HTMLElement,
    options: Highcharts.Options,
    loading: boolean
) {
    options = { ...options, tooltip: { xDateFormat: "%A, %b %e, %H:%M" } };
    let chart = ChartCache.get(container);
    if (!chart) {
        chart = Highcharts.chart(container, options);
        ChartCache.set(container, chart);
    } else {
        chart.update(options);
    }
    if (loading) {
        chart.showLoading();
    } else {
        chart.hideLoading();
    }
}

function destroy(container: HTMLElement) {
    const chart = ChartCache.get(container);
    if (chart) chart.destroy();
}

export const Chart = { render, destroy };
