import React from 'react';

const DetalleComic = ({ comic, onClose }) => {
    return (
        <div>
            <div className="comic-detail-container">
                <h2>{comic.title}</h2>
                <img src={comic.image} alt={comic.title} />
                <p><strong>Descripción:</strong> {comic.description || 'No hay descripción disponible'}</p>
                <p><strong>Número de páginas:</strong> {comic.pageCount || 'No disponible'}</p>
                <p><strong>Precio:</strong> {comic.price || 'No disponible'}</p>
                <button className="back-button" onClick={onClose}>
                    Volver
                </button>
            </div>
        </div>
    );
};

export default DetalleComic;
