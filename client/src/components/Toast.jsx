import * as React from 'react'
import * as ReactDOM from 'react-dom'

import './Toast.css'

const Toast = ({ children, onClose, open }) => (
    open ?
        ReactDOM.createPortal(
            <div className={`toast`}>
                { children }
                <button onClick={onClose} className={`toastCloser`}>
                    Dismiss
                </button>
            </div>,
            document.body
        ) : null
)

export default Toast