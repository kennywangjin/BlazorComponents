import * as Chart from "./chart";
import * as Modal from "./modal";
import * as Toast from "./toast";
import "./site.scss";

(function(global: any) {
    global.__app = {
        chart: {
            render: Chart.render,
            destroy: Chart.destroy
        },
        modal: {
            show: Modal.show,
            close: Modal.close,
            dispose: Modal.dispose
        },
        toast: {
            show: Toast.show,
            close: Toast.close,
            dispose: Toast.dispose
        }
    };
})(window);
