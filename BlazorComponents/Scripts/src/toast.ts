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
    if (element) {
        const $toast = $ToastCache.get(element);
        if ($toast) {
            return new Promise<void>(resolve => {
                $toast
                    .one("hidden.bs.toast", () => {
                        dispose(element);
                        resolve();
                        dotnet.invokeMethodAsync("OnToastClosed");
                    })
                    .toast("hide");
            });
        }
    }
}

function dispose(element: HTMLElement | null) {
    if (!element) return;
    const $toast = $ToastCache.get(element);
    if (!$toast) return;
    $toast.toast("dispose");
    $ToastCache.delete(element);
}

export const Toast = { show, close, dispose };
