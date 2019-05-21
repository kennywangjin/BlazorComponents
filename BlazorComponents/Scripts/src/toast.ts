const $Toasts = new Map<HTMLElement, JQuery>();

export function show(element: HTMLElement | null) {
    if (!element) return;
    let $toast = $Toasts.get(element);
    if (!$toast) {
        $toast = $(element).toast({
            autohide: false
        });
        $Toasts.set(element, $toast);
    }
    $toast.toast("show");
}

export function close(element: HTMLElement | null, dotnet: any) {
    if (!element) return;
    const $toast = $Toasts.get(element);
    if (!$toast) return;
    $toast
        .one("hidden.bs.toast", () => {
            dispose(element);
            dotnet.invokeMethodAsync("OnClosed");
        })
        .toast("hide");
}

export function dispose(element: HTMLElement | null) {
    if (!element) return;
    const $toast = $Toasts.get(element);
    if (!$toast) return;
    $toast.toast("dispose");
    $Toasts.delete(element);
}
