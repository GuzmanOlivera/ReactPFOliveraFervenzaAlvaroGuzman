import { getFirestore, doc, setDoc } from "firebase/firestore";
import { app } from "./firebaseConfig";
import config from '../config';

const db = getFirestore(app);

const fetchAndSaveBooks = async () => {
    try {
        const programmingBooksResponse = await fetchBooksByCategory('programming');
        const databaseBooksResponse = await fetchBooksByCategory('database');

        const programmingBooks = programmingBooksResponse.items || [];
        const databaseBooks = databaseBooksResponse.items || [];

        const booksToSave = [...programmingBooks, ...databaseBooks];

        booksToSave.forEach(async book => {
            await setDoc(doc(db, "books", book.id), book);
        });

        console.log('Libros guardados exitosamente en Firebase.');
    } catch (error) {
        console.error('Error al obtener y guardar los libros:', error);
    }
};

const fetchBooksByCategory = async (category) => {
    const apiKey = config.apiKey;
    const url = `https://www.googleapis.com/books/v1/volumes?q=${category}&key=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();
    
    return data;
};

export default fetchAndSaveBooks;
