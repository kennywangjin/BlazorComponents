const $ToastCache = new Map<HTMLElement, JQuery>();

function show(element: HTMLElement | null) {
    if (!element) return;
    let $toast = $ToastCache.get(element);
    if (!$toast) {
        $toast = $(element).toast({
            autohide: false
        });
        $ToastCache.set(element, $toast);
    }
    $toast.toast("show");
}

function close(element: HTMLElement | null, dotnet: any) {
    if (!element) return;
    const $toast = $ToastCache.get(element);
    if (!$toast) return;
    $toast
        .one("hidden.bs.toast", () => {
            dispose(element);
            dotnet.invokeMethodAsync("OnToastClosed");
        })
        .toast("hide");
}

function dispose(element: HTMLElement | null) {
    if (!element) return;
    const $toast = $ToastCache.get(element);
    if (!$toast) return;
    $toast.toast("dispose");
    $ToastCache.delete(element);
}

export const Toast = { show, close, dispose };
