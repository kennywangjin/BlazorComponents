export const show = (element: HTMLElement, dotnetModal: any) => {
    $(element)
        .one("shown.bs.modal", () => {
            dotnetModal.invokeMethodAsync("OnModalShownAsync");
        })
        .modal({
            backdrop: "static",
            keyboard: false
        });
};

export const close = (element: HTMLElement, dotnetModal: any) => {
    $(element)
        .one("hidden.bs.modal", () => {
            $(element).modal("dispose");
            dotnetModal.invokeMethodAsync("OnModalClosedAsync");
        })
        .modal("hide");
};
