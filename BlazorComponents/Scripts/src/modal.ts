const $Modals = new Map<HTMLElement, JQuery>();

export function show(element: HTMLElement | null) {
    if (!element) return;
    let $modal = $Modals.get(element);
    if ($modal) {
        $modal.modal("show");
    } else {
        $modal = $(element).modal({
            backdrop: "static",
            keyboard: false
        });
        $Modals.set(element, $modal);
    }
}

export function close(element: HTMLElement | null, dotnet: any) {
    if (!element) return;
    const $modal = $Modals.get(element);
    if (!$modal) return;
    $modal
        .one("hidden.bs.modal", () => {
            dispose(element);
            dotnet.invokeMethodAsync("OnClosed");
        })
        .modal("hide");
}

export function dispose(element: HTMLElement | null) {
    if (!element) return;
    const $modal = $Modals.get(element);
    if (!$modal) return;
    $modal.modal("dispose");
    $Modals.delete(element);
}
