import Highcharts from "highcharts";

Highcharts.setOptions({
    lang: { loading: '' },
    credits: { enabled: false }
});

const CHART_OBJECTS = new Map<HTMLElement, Highcharts.Chart>();

/**
 * render or update chart hosted in specified html element
 * @param element container element the chart is hosted in
 * @param options chart options
 */
export function render(element: HTMLElement, options: Highcharts.Options) {
    let chart = CHART_OBJECTS.get(element);

    if (!chart) {
        chart = Highcharts.chart(element, options);
        CHART_OBJECTS.set(element, chart);
    } else {
        chart.update(options);
    }
}

/**
 * show or hide loading symbol
 * @param element element where chart is hosted in
 * @param isLoading * whether show or hide loading symbol
 */
export function showLoading(element: HTMLElement, isLoading: boolean) {
    const chart = CHART_OBJECTS.get(element);
    chart && (isLoading ? chart.showLoading() : chart.hideLoading());
}

/**
 * completely destroy chart object hosted in the specified element
 * @param element container element the chart may be hosted in
 */
export function destroy(element: HTMLElement) {
    const chart = CHART_OBJECTS.get(element);
    chart && chart.destroy();
}

export const CHART = { showLoading, render, destroy };
