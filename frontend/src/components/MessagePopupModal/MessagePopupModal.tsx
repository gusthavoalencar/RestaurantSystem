import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import "./index.css";

interface MessagePopupModalProps {
    show: boolean;
    onHide: () => void;
    message: string;
    type: string;
}

const MessagePopupModal = ({ show, onHide, message, type }: MessagePopupModalProps) => {
    const [progress, setProgress] = useState(0);
    const duration = 2000;
    const closeDelay = 300;

    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (show) {
            setProgress(0);
            const start = Date.now();
            const interval = setInterval(() => {
                const elapsedTime = Date.now() - start;
                const progress = Math.min((elapsedTime / duration) * 100, 100);
                setProgress(progress);

                if (elapsedTime >= duration) {
                    clearInterval(interval);
                    timer = setTimeout(() => {
                        onHide();
                    }, closeDelay);
                }
            }, 100);

            return () => {
                clearInterval(interval);
                if (timer) clearTimeout(timer);
            };
        }
    }, [show, onHide, closeDelay, duration]);

    const progressBarClass = type === 'error' ? 'progress-bar bg-danger' : 'progress-bar bg-success';
    const modalBorderClass = type === 'error' ? 'border-danger' : 'border-success';

    return (
        <Modal
            show={show}
            onHide={onHide}
            dialogClassName={`shadow rounded messagepopup-modal-dialog ${modalBorderClass}`}
            contentClassName={`rounded messagepopup-modal-content ${modalBorderClass}`}
            backdrop={false}
            keyboard={false}
            className="messagepopup-modal"
        >
            <Modal.Header className="border-0 d-flex justify-content-center align-items-center p-0 pt-2">
                {type === 'error' ? <Modal.Title className='m-0'>Error</Modal.Title> : <Modal.Title className='m-0'>Success</Modal.Title>}
            </Modal.Header>
            <Modal.Body className='p-0 px-3 py-2'>
                <div className='row'>
                    <div className='col d-flex justify-content-center'>
                        <p className='m-0'>{message}</p>
                    </div>
                </div>
                <div className='row p-0'>
                    <div className="progress p-0">
                        <div className={progressBarClass} role="progressbar" style={{ width: `${progress}%` }} aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}></div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default MessagePopupModal;