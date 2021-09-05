import React from "react";
const Toast = (props) => {
    return (<div className={"toast-msg "+ props.toastMessageClass}><div className={props.toastMessageClass}>{props.toastMessage}</div></div>)
}

export default Toast;