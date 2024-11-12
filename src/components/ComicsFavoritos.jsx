import React, { useEffect, useState } from 'react';
import Modal from './Modal';

const ComicsFavoritos = () => {
    const [favoritos, setFavoritos] = useState([]);
    const [selectedComic, setSelectedComic] = useState(null); 
    const [isModalOpen, setIsModalOpen] = useState(false); 

    useEffect(() => {
        const favoritosAlmacenados = JSON.parse(localStorage.getItem('favoritos')) || [];
        setFavoritos(favoritosAlmacenados);
    }, []);

    const openModal = (comic) => {
        setSelectedComic(comic); 
        setIsModalOpen(true); 
    };

    const closeModal = () => {
        setIsModalOpen(false); 
        setSelectedComic(null); 
    };

    return (
        <div>
             <h2 className="page-title">CÓMICS FAVORITOS</h2>
            <div className="comics-container">
                {favoritos.length === 0 ? (
                    <p>No tienes cómics favoritos.</p>
                ) : (
                    favoritos.map((comic) => (
                        <div
                            key={comic.id}
                            onClick={() => openModal(comic)}
                            className="comic-card"
                        >
                            <img src={comic.image} alt={comic.title} className="comic-image" />
                            <h3>{comic.title}</h3>
                        </div>
                    ))
                )}
            </div>

            {/* Modal solo se muestra si isModalOpen es true */}
            {isModalOpen && <Modal comic={selectedComic} onClose={closeModal} />}
        </div>
    );
};

export default ComicsFavoritos;
