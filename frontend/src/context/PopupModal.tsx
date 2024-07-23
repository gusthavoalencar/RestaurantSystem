import { createContext, useContext, useState, ReactNode } from 'react';
import MessagePopupModal from '../components/MessagePopupModal/MessagePopupModal';

interface ModalContextType {
    showModal: (message: string, type: string) => void;
    hideModal: () => void;
}

const ModalContext = createContext<ModalContextType | null>(null);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [modalShow, setModalShow] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [modalType, setModalType] = useState('');

    const showModal = (message: string, type: string) => {
        setModalMessage(message);
        setModalType(type);
        setModalShow(true);
    };

    const hideModal = () => {
        setModalShow(false);
    };

    return (
        <ModalContext.Provider value={{ showModal, hideModal }}>
            {children}
            <MessagePopupModal
                show={modalShow}
                onHide={hideModal}
                message={modalMessage}
                type={modalType}
            />
        </ModalContext.Provider>
    );
};

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
};
