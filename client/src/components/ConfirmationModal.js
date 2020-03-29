import React, { Component } from 'react';

const ConfirmationModal = (props) => {
    return (
        <div className="modal_wrapper">
            <div className="modal_inner">
                <div className="modal_header">
                    {props.title}
                </div>
                <div className="modal_body">
                    <p>{props.message}</p>
                </div>
                <div className="modal_footer">
                    <button onClick={props.onApprove}>Yes</button>
                    <button onClick={props.onDecline}>No</button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationModal;