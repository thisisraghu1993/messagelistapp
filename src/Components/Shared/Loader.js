import React from "react";

export const Loader = () => {
    return (Array.from({length: 10}, (item, idx) => (<div key={idx} className="card ">
        <div className="card-body">
        <div className="card-header">
            <span className="avatar linear-background"/>
            <div className="card-title">
                <h6 className="full-name linear-background"></h6>
                <p className="published-date linear-background"></p>
            </div>
        </div>
        <div className="card-content linear-background"></div>
        </div>
        </div>
    )));
}

export default Loader;