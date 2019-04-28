import * as Chart from "./chart";
import * as Modal from "./modal";
import * as Toast from "./toast";
import "./site.scss";

(function(global: any) {
    global.__app = {
        chart: {
            render: Chart.render,
            showLoading: Chart.showLoading,
            destroy: Chart.destroy
        },
        toast: {
            show: Modal.show,
            close: Modal.close
        },
        modal: {
            show: Toast.show,
            close: Toast.close
        }
    };
})(window);
