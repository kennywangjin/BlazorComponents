const $ModalCache = new Map<HTMLElement, JQuery>();

function open(element: HTMLElement | null): Promise<boolean> {
    if (!element) {
        return Promise.resolve(true);
    }

    let $modal = $ModalCache.get(element);
    if (!$modal) {
        $modal = $(element).modal({
            backdrop: "static",
            keyboard: false,
            show: false
        });
        $ModalCache.set(element, $modal);
    }
    return new Promise<boolean>(resolve => {
        $modal!
            .one("shown.bs.modal", () => {
                resolve(true);
            })
            .modal("show");
    });
}

function close(element: HTMLElement | null): Promise<boolean> {
    if (!element) {
        return Promise.resolve(true);
    }

    const $modal = $ModalCache.get(element);
    if (!$modal) {
        return Promise.resolve(true);
    }

    return new Promise<true>(resolve => {
        $modal
            .one("hidden.bs.modal", () => {
                dispose(element);
                resolve(true);
            })
            .modal("hide");
    });
}

function dispose(element: HTMLElement | null): boolean {
    if (!element) {
        return true;
    }

    const $modal = $ModalCache.get(element);
    if (!$modal) {
        return true;
    }

    $modal.modal("dispose");
    $ModalCache.delete(element);
    return true;
}

export const MODAL = { open, close, dispose };
