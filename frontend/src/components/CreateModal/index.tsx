import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { TfiPlus } from 'react-icons/tfi';
import ModalOption from '../ModalOption';
import "./index.css";


interface CreateModalProps {
    text: string;
}

const CreateModal = ({ text }: CreateModalProps) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <Button variant="link" className="mainGreenBgColor float-end pt-2 pb-2 ps-3 pe-3 text-white rounded-4 me-5 fw-light text-center pointer text-decoration-none" onClick={handleShow}>
                <p className="fs-5 m-0">
                    <TfiPlus className="fs-4 me-2" />
                    {text}
                </p>
            </Button>

            <Modal show={show} onHide={handleClose} dialogClassName="custom-modal-dialog" contentClassName="custom-modal-content">
                <Modal.Header className="border-0 d-flex justify-content-center align-items-center">
                    <Modal.Title className='m-0'>Create Buy Order/Item</Modal.Title>
                    <Button variant="button" onClick={handleClose} className="position-absolute end-0 fs-2 text-secondary">
                        <span aria-hidden="true">&times;</span>
                    </Button>
                </Modal.Header>
                <Modal.Body className='pb-5'>
                    <div className='row'>
                        <div className='col d-flex justify-content-center'>
                            <ModalOption text='Buy Order' />
                        </div>
                        <div className='col d-flex justify-content-center'>
                            <ModalOption text='Stock Item' />

                        </div>

                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default CreateModal;