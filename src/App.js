import {useState} from "react";
import prompts from "./prompts";
import Modal from "./components/Modal";

const App = () => {
    const [images, setImages] = useState(null)
    const [value, setValue] = useState("")
    const [error, setError] = useState(null)
    const [selectedImage, setSelectedImage] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [fileError, setFileError] = useState(null);
    const [generating, setGenerating] = useState(false);



    const surpriseMe = () => {
        const randomValue = prompts[Math.floor(Math.random() * prompts.length)];
        setValue(randomValue)
    }

    const getImages = async () => {
        setImages(null);
        if (value === null || value.trim() === '') {
            setError('Error! Must have a search term');
            return;
        } else {
            setError(null);
        }

        try {
            setGenerating(true); // Habilitar "generating" antes de hacer la solicitud

            const options = {
                method: 'POST',
                body: JSON.stringify({
                    message: value
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            const response = await fetch('http://192.168.0.100:8000/images', options);
            const data = await response.json();
            setImages(data);
        } catch (error) {
            console.error(error);
        } finally {
            setGenerating(false); // Deshabilitar "generating" después de la solicitud (éxito o error)
        }
    };


    const uploadImage = async (e) => {
        const file = e.target.files[0];

        if (!file) {
            return;
        }

        // Verificar la extensión del archivo
        if (file.type !== "image/png") {
            setFileError("Only PNG files are allowed");
            return;
        }

        const formData = new FormData()
        setModalOpen(true)
        formData.append('file', e.target.files[0])
        setSelectedImage(e.target.files[0])
        e.target.value = null

        try {
            const options = {
                method: "POST",
                body: formData
            }
            const response = await fetch('http://192.168.0.100:8000/upload', options)
            const data = await response.json()

        } catch (error) {
            console.error(error)
        }
    }

    const generateVariations = async () => {
        setImages(null)
        if (selectedImage === null) {
            setError('Error! Must have an existing image')
            setModalOpen(false)
            return
        }
        try {
            const options = {
                method: "POST"
            }
            const response = await fetch('http://192.168.0.100:8000/variations', options)
            const data = await response.json()
            setImages(data)
            setError(null)
            setModalOpen(false)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="app">
            <h1>GENERATE & MODIFY YOUR OWN IMAGES</h1>
            <section className="search-section">
                <p> Add a description
                    <span className="surprise" onClick={surpriseMe}>Surprise Me</span>
                </p>
                <div className="input-container">
                    <input
                        value={value}
                        placeholder="A tree in the water"
                        onChange={(e => setValue(e.target.value))}/>
                    <button onClick={getImages}>
                        {generating ? 'Generating...' : 'Generate'}
                    </button>

                </div>

                <div className="extra-info">
                <p className="">Or,
                    <span>
                        <label htmlFor="files" className="label-file"> upload an image </label>
                        <input onChange={uploadImage} id="files" accept="image/png" type="file" hidden/>
                    </span>
                    to edit.

                </p>
                    {error && <p className="">{error}</p>}
                    {fileError && <p className="">{fileError}</p>}
                </div>



                {modalOpen && fileError === null && (
                    <div className="overlay">
                        <Modal
                            setModalOpen={setModalOpen}
                            setSelectedImage={setSelectedImage}
                            selectedImage={selectedImage}
                            generateVariations={generateVariations}
                        />
                    </div>
                )}
            </section>
            <section className="image-section">
                {images?.map((image, _index) => (
                    <img key={_index} src={image.url} alt={`Generated image of ${value}`}/>
                ))}
            </section>
        </div>
    );
}

export default App;
