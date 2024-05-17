import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ModalOption from '../ModalOption';
import "./index.css";


interface CreateOrderModalProps {
    show: boolean;
    onHide: () => void;
}

const CreateOrderModal = ({ show, onHide }: CreateOrderModalProps) => {
    return (
        <>
            <Modal show={show} onHide={onHide} dialogClassName="custom-modal-dialog" contentClassName="custom-modal-content">
                <Modal.Header className="border-0 d-flex justify-content-center align-items-center">
                    <Modal.Title className='m-0'>Create Order</Modal.Title>
                    <Button variant="button" onClick={onHide} className="position-absolute end-0 fs-2 text-secondary">
                        <span aria-hidden="true">&times;</span>
                    </Button>
                </Modal.Header>
                <Modal.Body className='pb-5'>
                    <div className='row'>
                        <div className='col d-flex justify-content-center'>
                            <ModalOption text='Dine In' onClick={() => onHide()} />
                        </div>
                        <div className='col d-flex justify-content-center'>
                            <ModalOption text='Delivery' onClick={() => {
                                onHide();
                            }} />
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default CreateOrderModal;