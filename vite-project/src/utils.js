import { collection, getDocs, getDoc, doc, setDoc, getFirestore, query, where, addDoc, serverTimestamp } from "firebase/firestore";
import { app } from "./firebaseConfig";

const db = getFirestore(app);

export const getBooks = async () => {
    const booksCollection = collection(db, "items");
    const querySnapshot = await getDocs(booksCollection);

    const books = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));

    return books;
};
export const getBooksByCategory = async (category) => {
    const booksCollection = collection(db, "items");
    const querySnapshot = await getDocs(booksCollection);

    const books = querySnapshot.docs
        .map(doc => ({
            id: doc.id,
            ...doc.data()
        }))
        .filter(book => {
            const lowercaseTitle = book.volumeInfo.title.toLowerCase();
            return lowercaseTitle.includes(category);
        });

    return books;
};


export const getBookDetail = async (id) => {
    const bookDoc = doc(db, "items", id);
    const bookSnapshot = await getDoc(bookDoc);

    if (bookSnapshot.exists()) {
        return {
            id: bookSnapshot.id,
            ...bookSnapshot.data()
        };
    } else {
        throw new Error(`No se encontró ningún libro con ID ${id}`);
    }
};

export const createSale = async (items, user, total) => {
    if (items.length === 0) {
        throw new Error("No puedes crear una orden de compra con el carrito vacío");
    }

    const requiredUserData = ['firstName', 'lastName', 'phoneNumber', 'email','repeatEmail'];
    const missingUserData = requiredUserData.filter(field => !user[field]);
  
    if (missingUserData.length > 0) {
      throw new Error(`Faltan datos del usuario: ${missingUserData.join(', ')}`);
    }  

    const salesCollection = collection(db, "orders");

    const filteredItems = items.map(item => {
        const { book, quantity } = item;

        if (!book.stock || quantity > book.stock) {
            throw new Error(`No hay suficiente stock disponible para el libro ${book.volumeInfo.title}`);
        }

        const filteredBook = {
            id: book.id,
            title: book.volumeInfo.title,
            description: book.volumeInfo.description,
            saleInfo: book.saleInfo || {}
        };

        if (book.saleInfo && book.saleInfo.listPrice) {
            filteredBook.saleInfo.listPrice = book.saleInfo.listPrice;
        }

        return {
            book: filteredBook,
            quantity: quantity
        };
    });

    const sale = {
        items: filteredItems,
        user: user,
        purchaseDate: serverTimestamp(),
        status: "generada",
        total: total
    };

    try {
        const docRef = await addDoc(salesCollection, sale);
        console.log("Venta creada con ID: ", docRef.id);
        return docRef.id;
    } catch (error) {
        console.error("Error al crear la venta: ", error);
        throw new Error("Error al crear la venta");
    }
};

