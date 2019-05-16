export const show = (element: HTMLElement, dotnetToast: any) => {
    $(element)
        .one("shown.bs.toast", () => {
            dotnetToast.invokeMethodAsync("OnToastShown");
        })
        .toast("show");
};

export const close = (element: HTMLElement, dotnetToast: any) => {
    $(element)
        .one("hidden.bs.toast", () => {
            $(element).toast("dispose");
            dotnetToast.invokeMethodAsync("OnToastClosed");
        })
        .toast("hide");
};
