const App = () => {
    const surpriseOptions = [
        'Un raton dando vueltas',
        'Un mono comiendo pan',
        'Un programador frustrado',
    ]

    const getImages = async () => {
        try {
            const options = {
                method: 'POST',
                body: JSON.stringify({
                message: "hola"
            }),
                headers: {
                    "Content-type": "applications/json"
                }
        }

            const response = await fetch('http://localhost:8000/images', options)
            const data = await response.json()
            console.log(data)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="app">
            <section className="search-section">
                <p> Añade una descripción
                    <span className="surprise">Sorprendeme</span>
                </p>
                <div className="input-container">
                    <input className="" placeholder="Un telefono dando voleteretas"/>
                    <button onClick={getImages}>Generar</button>
                </div>
            </section>
            <section className="image-section"></section>
        </div>
    );
}

export default App;
