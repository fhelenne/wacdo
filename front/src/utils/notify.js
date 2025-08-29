import {toast} from "react-toastify";

export const notify = {
    success: (message, config) => toast.success(message, config),
    info: (message, config) => toast.info(message, config),
    error: (message, config) => toast.error(message, config),
}