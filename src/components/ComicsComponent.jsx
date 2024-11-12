import React, { useEffect, useState } from 'react';
import { obtenerComics } from '../api/marvelApi';
import Modal from './Modal';

const ComicsComponent = () => {
    const [comicDetails, setComicDetails] = useState([]);
    const [selectedComic, setSelectedComic] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const isComicFavorite = (comicId) => {
        const favoritosAlmacenados = JSON.parse(localStorage.getItem('favoritos')) || [];
        return favoritosAlmacenados.some(fav => fav.id === comicId);
    };

    useEffect(() => {
        const fetchComics = async () => {
            const comics = await obtenerComics({
                format: 'comic',
                limit: 24
            });
            setComicDetails(comics);
        };

        fetchComics();
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
            <h2 className="page-title">CATÁLOGO DE CÓMICS</h2>
            <div className="comics-container">
                {comicDetails.map((comic) => (
                    <div
                        key={comic.id}
                        onClick={() => openModal(comic)}
                        className={`comic-card ${isComicFavorite(comic.id) ? 'favorite' : ''}`}
                    >
                        <img src={comic.image} alt={comic.title} className="comic-image" />
                        <h3>{comic.title}</h3>
                    </div>
                ))}
            </div>
            {isModalOpen && <Modal comic={selectedComic} onClose={closeModal} />}
        </div>
    );
};

export default ComicsComponent;
