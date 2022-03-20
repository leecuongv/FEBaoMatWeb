import { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'

const Modal = props => {
    const [active, setActive] = useState(false);

    useEffect(() => {
        setActive(props.active);
    },[props.active]);

    return (
        <div className={`modal ${props.active ? 'active' : ''}`}>
           {props.children}
        </div>
    )
}

Modal.propTypes = {
    active: PropTypes.bool
}

export const ModalContent = props => {
    const contentRef = useRef(null);

    const closeModal = () => {
        contentRef.current.parentNode.classList.remove('active');
        if(props.onClose) props.onClose()
    }
    return (
        <div ref={contentRef} className="modal__content active">
            {props.children}
            <div className="modal__content__close" onClick={closeModal}>
                <i className="fa-solid fa-xmark"></i>
            </div>
        </div>
    )
}

ModalContent.propTypes = {
    onClose : PropTypes.func
}

export default Modal
