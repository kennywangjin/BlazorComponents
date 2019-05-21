import { Chart } from "./chart";
import { Modal } from "./modal";
import { Toast } from "./toast";
import "./site.scss";

(function(global: any) {
    global.__app = {
        chart: Chart,
        modal: Modal,
        toast: Toast
    };
})(window);
