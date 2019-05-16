export const show = (element: HTMLElement, dotnetModal: any) => {
    $(element)
        .one("shown.bs.modal", () => {
            dotnetModal.invokeMethodAsync("OnModalShown");
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
            dotnetModal.invokeMethodAsync("OnModalClosed");
        })
        .modal("hide");
};
