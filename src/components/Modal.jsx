import React, { useEffect, useState } from 'react';
import { obtenerPersonajesComic } from '../api/marvelApi';
import './Modal.css';


const Modal = ({ comic, onClose }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        if (comic) {
            const favoritosAlmacenados = JSON.parse(localStorage.getItem('favoritos')) || [];
            setIsFavorite(favoritosAlmacenados.some(fav => fav.id === comic.id));
            
            
            const cargarPersonajes = async () => {
                const personajes = await obtenerPersonajesComic(comic.id);
                setCharacters(personajes);
            };
            
            cargarPersonajes();
        }
    }, [comic]);

    const addToFavorites = () => {
        const favoritosAlmacenados = JSON.parse(localStorage.getItem('favoritos')) || [];
        if (!favoritosAlmacenados.some(fav => fav.id === comic.id)) {
            favoritosAlmacenados.push(comic);
            localStorage.setItem('favoritos', JSON.stringify(favoritosAlmacenados));
            setIsFavorite(true);
        }
    };

    const removeFromFavorites = () => {
        const favoritosAlmacenados = JSON.parse(localStorage.getItem('favoritos')) || [];
        const updatedFavorites = favoritosAlmacenados.filter(fav => fav.id !== comic.id);
        localStorage.setItem('favoritos', JSON.stringify(updatedFavorites));
        setIsFavorite(false);
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <img src={comic.image} alt={comic.title} />
                <h3>{comic.title}</h3>
                <p><strong>Descripción:</strong> {comic.description || 'No hay descripción disponible'}</p>
                <p><strong>Número de páginas:</strong> {comic.pageCount || 'No disponible'}</p>
                <p><strong>Precio:</strong> {comic.price || 'No disponible'}</p>
                
                {!isFavorite ? (
                    <button className="favorite-button button-common" onClick={addToFavorites}>
                        Añadir a Favoritos
                    </button>
                ) : (
                    <button className="favorite-button button-common" onClick={removeFromFavorites}>
                        Eliminar de Favoritos
                    </button>
                )}
                
                <button className="modal-close button-common" onClick={onClose}>Cerrar</button>

                <div className="characters-section">
                    <h4>Personajes en este cómic</h4>
                    <div className="characters-list">
                        {characters.length > 0 ? (
                            characters.map(character => (
                                <div key={character.id} className="character-item">
                                    <img src={character.image} alt={character.name} className="character-image" />
                                    <p>{character.name}</p>
                                </div>
                            ))
                        ) : (
                            <p>No hay personajes disponibles.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
