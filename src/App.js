const App = () => {
    const surpriseOptions = [
        'Un raton dando vueltas',
        'Un mono comiendo pan',
        'Un programador frustrado',
    ]
    return (
        <div className="app">
            <section className="search-section">
                <p> Añade una descripción
                    <span className="surprise">Sorprendeme</span>
                </p>
                <div className="input-container">
                    <input className="" placeholder="Un telefono dando voleteretas"/>
                    <button>Generar</button>
                </div>
            </section>
            <section className="image-section"></section>
        </div>
    );
}

export default App;
