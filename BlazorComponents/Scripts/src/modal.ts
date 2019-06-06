const $ModalCache = new Map<HTMLElement, JQuery>();

function show(element: HTMLElement | null) {
    if (!element) return;
    let $modal = $ModalCache.get(element);
    if ($modal) {
        $modal.modal("show");
    } else {
        $modal = $(element).modal({
            backdrop: "static",
            keyboard: false
        });
        $ModalCache.set(element, $modal);
    }
}

function close(element: HTMLElement | null, dotnet: any) {
    if (element) {
        const $modal = $ModalCache.get(element);
        if ($modal) {
            return new Promise<void>(resolve => {
                $modal
                    .one("hidden.bs.modal", () => {
                        dispose(element);
                        resolve();
                        dotnet.invokeMethodAsync("OnModalClosed");
                    })
                    .modal("hide");
            });
        }
    }
    return Promise.resolve();
}

function dispose(element: HTMLElement | null) {
    if (!element) return;
    const $modal = $ModalCache.get(element);
    if (!$modal) return;
    $modal.modal("dispose");
    $ModalCache.delete(element);
}

export const Modal = { show, close, dispose };
