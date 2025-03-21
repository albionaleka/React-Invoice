import { X } from "lucide-react";
import { useState, useEffect } from "react"
import { createPortal } from "react-dom"

const Notification = ({ errors }) => {
    const [show, setShow] = useState(true);

    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            setShow(true);
        }
    }, [errors]);

    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                setShow(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [show]);

    return createPortal (
        <>
            {show &&
                <div className="fixed inset-0 flex ms-4 items-end justify-start" id="error">
                    {Object.keys(errors).length > 0 && (
                        <div className="flex bg-rose-500 text-white p-4 rounded-lg mb-4">
                            <div>
                                {Object.keys(errors).map((key) => (
                                    <p key={key}>{errors[key]}</p>
                                ))}
                            </div>
                            
                            <div className="flex items-baseline justify-end">
                                <button onClick={() => setShow(false)} className="bg-rose-500 text-white px-4 py-2 rounded-lg">
                                    <X size={20} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            } 
        </>, document.querySelector('#error')
    )
}

export default Notification