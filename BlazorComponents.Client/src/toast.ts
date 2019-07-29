const $ToastCache = new Map<HTMLElement, JQuery>();

function open(element: HTMLElement | null): Promise<boolean> {
    if (!element) {
        return Promise.resolve(true);
    }

    let $toast = $ToastCache.get(element);
    if (!$toast) {
        $toast = $(element).toast({
            autohide: false
        });
        $ToastCache.set(element, $toast);
    }
    return new Promise<boolean>(resolve => {
        $toast!
            .one("shown.bs.toast", () => {
                resolve(true);
            })
            .toast("show");
    });
}

function close(element: HTMLElement | null): Promise<boolean> {
    if (!element) {
        return Promise.resolve(true);
    }

    const $toast = $ToastCache.get(element);
    if (!$toast) {
        return Promise.resolve(true);
    }

    return new Promise<boolean>(resolve => {
        $toast
            .one("hidden.bs.toast", () => {
                dispose(element);
                resolve(true);
            })
            .toast("hide");
    });
}

function dispose(element: HTMLElement | null): boolean {
    if (!element) {
        return true;
    }

    const $toast = $ToastCache.get(element);
    if (!$toast) {
        return true;
    }

    $toast.toast("dispose");
    $ToastCache.delete(element);
    return true;
}

export const TOAST = { open, close, dispose };
