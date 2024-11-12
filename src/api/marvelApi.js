import axios from 'axios';
import md5 from 'md5';

const BASE_URL = 'https://gateway.marvel.com/v1/public';

const generarHash = (ts, privateKey, publicKey) => md5(ts + privateKey + publicKey);

export const obtenerComics = async ({
    format = 'comic',
    dateDescriptor = 'thisMonth',
    orderBy = '-onsaleDate',
    limit = 20
} = {}) => {
    const ts = Date.now().toString();
    const publicKey = process.env.REACT_APP_MARVEL_PUBLIC_KEY;
    const privateKey = process.env.REACT_APP_MARVEL_PRIVATE_KEY;
    const hash = generarHash(ts, privateKey, publicKey);

    const url = `${BASE_URL}/comics`;

    try {
        const response = await axios.get(url, {
            params: {
                ts,
                apikey: publicKey,
                hash,
                format,
                dateDescriptor,
                orderBy,
                limit
            }
        });

        const comicsData = response.data.data.results;

        return comicsData.map(comic => ({
            id: comic.id,
            title: comic.title,
            image: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
            description: comic.description || 'No hay descripción disponible',
            pageCount: comic.pageCount || 'No disponible',
            price: comic.prices.find(price => price.type === 'printPrice')?.price || 'No disponible'
        }));
    } catch (error) {
        console.error('Error al obtener cómics:', error);
        return [];
    }
};

export const obtenerDetallesComic = async (comicId) => {
    const ts = Date.now().toString();
    const publicKey = process.env.REACT_APP_MARVEL_PUBLIC_KEY;
    const privateKey = process.env.REACT_APP_MARVEL_PRIVATE_KEY;
    const hash = generarHash(ts, privateKey, publicKey);

    const url = `${BASE_URL}/comics/${comicId}`;

    try {
        const response = await axios.get(url, {
            params: {
                ts,
                apikey: publicKey,
                hash
            }
        });

        const comicData = response.data.data.results[0];

        if (!comicData) {
            throw new Error('No se encontraron detalles para este cómic.');
        }

        return {
            id: comicData.id,
            title: comicData.title,
            date: comicData.dates.find(date => date.type === 'onsaleDate')?.date || 'Fecha no disponible',
            image: `${comicData.thumbnail.path}.${comicData.thumbnail.extension}`,
            description: comicData.description || 'No hay descripción disponible',
            pageCount: comicData.pageCount || 'No disponible',
            price: comicData.prices.find(price => price.type === 'printPrice')?.price || 'No disponible'
        };
    } catch (error) {
        console.error('Error al obtener detalles del cómic:', error);
        return null;
    }
};

export const obtenerPersonajesComic = async (comicId) => {
    const ts = Date.now().toString();
    const publicKey = process.env.REACT_APP_MARVEL_PUBLIC_KEY;
    const privateKey = process.env.REACT_APP_MARVEL_PRIVATE_KEY;
    const hash = generarHash(ts, privateKey, publicKey);

    const url = `${BASE_URL}/comics/${comicId}/characters`;

    try {
        const response = await axios.get(url, {
            params: {
                ts,
                apikey: publicKey,
                hash
            }
        });

        return response.data.data.results.map(character => ({
            id: character.id,
            name: character.name,
            image: `${character.thumbnail.path}.${character.thumbnail.extension}`
        }));
    } catch (error) {
        console.error('Error al obtener personajes del cómic:', error);
        return [];
    }
};
