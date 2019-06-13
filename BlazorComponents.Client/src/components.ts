import { Chart } from "./chart";
import { Modal } from "./modal";
import { Toast } from "./toast";
import "./components.scss";

(function(global: any) {
    global.__components = {
        chart: Chart,
        modal: Modal,
        toast: Toast
    };
})(window);
