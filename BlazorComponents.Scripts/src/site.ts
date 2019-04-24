import { render, showLoading, destroy } from './chart';
import "./site.scss";

(function (global: any) {
    global.__app = {
        chart: {
            render,
            showLoading,
            destroy
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
