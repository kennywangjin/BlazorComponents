import Highcharts, { Options, Chart } from "highcharts";

const ChartObjects = new Map<HTMLElement, Chart>();

export const render = (container: HTMLElement, options: Options) => {
    let chart = ChartObjects.get(container);
    if (chart) {
        chart.update(options);
    } else {
        chart = Highcharts.chart(container, options);
        ChartObjects.set(container, chart);
    }
    chart.hideLoading();
};

export const showLoading = (container: HTMLElement) => {
    const chart = ChartObjects.get(container);
    if (chart) {
        chart.showLoading();
    }
};

export const destroy = (container: HTMLElement) => {
    const chart = ChartObjects.get(container);
    if (chart) {
        chart.destroy();
    }
};
