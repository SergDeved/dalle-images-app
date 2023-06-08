import {useState, useRef} from "react";

const Modal = ({ setModalOpen, setSelectedImage, selectedImage, generateVariations, darkMode }) => {
    const [error, setError] = useState(null);
    const ref = useRef(null);
    const closeModal = () => {
        setModalOpen(false);
        setSelectedImage(null);
    };

    const checkSize = () => {
        if (ref.current.width === 256 && ref.current.height === 256) {
            generateVariations();
        } else {
            setError("Error: Choose 256 x 256 image");
        }
    };

    return (
        <div className={`modal ${darkMode ? "dark-mode" : ""}`}>
            <div onClick={closeModal} className="label-file">
                ✖
            </div>
            <div className="img-container">
                {selectedImage && (
                    <img ref={ref} src={URL.createObjectURL(selectedImage)} alt="uploaded image" />
                )}
            </div>
            <p>{error || "* Image must be 256 x 256"}</p>
            {!error && (
                <button onClick={checkSize} className="variation-button">
                    Generate
                </button>
            )}
            {error && <button onClick={closeModal} className="variation-button">Close this and try again</button>}
        </div>
    );
};

export default Modal;