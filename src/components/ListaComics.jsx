import React, { useEffect, useState } from 'react';
import { obtenerComics, obtenerDetallesComic } from '../api/marvelApi';
import Modal from './Modal';

const ListaComics = () => {
    const [comics, setComics] = useState([]);
    const [selectedComic, setSelectedComic] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        obtenerComics().then(setComics);
    }, []);

    const openModal = async (comicId) => {
        const comicDetails = await obtenerDetallesComic(comicId);
        setSelectedComic(comicDetails);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedComic(null);
    };

    return (
        <div>
            <h2>Últimos Cómics</h2>
            <ul>
                {comics.map((comic) => (
                    <li key={comic.id} onClick={() => openModal(comic.id)}>
                        <img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt={comic.title} />
                        <p>{comic.title}</p>
                    </li>
                ))}
            </ul>

            <Modal isOpen={isModalOpen} onClose={closeModal} comic={selectedComic} />
        </div>
    );
};

export default ListaComics;
