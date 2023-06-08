import {useState} from "react";
import prompts from "./prompts";

const App = () => {
    const [images, setImages] = useState(null)
    const [value, setValue] = useState(null)
    const [error, setError] = useState(null)

    const surpriseMe = () => {
        const randomValue = prompts[Math.floor(Math.random() * prompts.length)];
        setValue(randomValue)
    }

    const getImages = async () => {
        setImages(null)
        if (value === null){
            setError('Error! Must have a search term')
        }
        try {
            const options = {
                method: 'POST',
                body: JSON.stringify({
                    message: value
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            }

            const response = await fetch('http://localhost:8000/images', options)
            const data = await response.json()
            console.log(data)
            setImages(data)
        } catch (error) {
            console.error(error)
        }
    }

    console.log(value)

    return (
        <div className="app">
            <section className="search-section">
                <p> Añade una descripción
                    <span className="surprise" onClick={surpriseMe}>Sorprendeme</span>
                </p>
                <div className="input-container">
                    <input
                        value={value}
                        placeholder="Un telefono dando voleteretas"
                        onChange={(e => setValue(e.target.value))}/>
                    <button onClick={getImages}>Generar</button>
                </div>
                {error && <p>{error}</p>}
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
