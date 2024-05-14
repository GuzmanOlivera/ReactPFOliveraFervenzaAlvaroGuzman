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

    const requiredUserData = ['firstName', 'lastName', 'phoneNumber', 'email', 'repeatEmail'];
    const missingUserData = requiredUserData.filter(field => !user[field]);

    if (missingUserData.length > 0) {
        throw new Error(`Faltan datos del usuario: ${missingUserData.join(', ')}`);
    }

    const salesCollection = collection(db, "orders");

    const groupedItems = groupItemsById(items);

    for (const itemId in groupedItems) {
        const { book, totalQuantity } = groupedItems[itemId];

        if (!book.stock || totalQuantity > book.stock) {
            throw new Error(`No hay suficiente stock disponible para el libro ${book.volumeInfo.title}`);
        }
    }
    const simplifiedItems = Object.values(groupedItems).map(group => ({
        id: group.book.id,
        title: group.book.volumeInfo.title,
        description: group.book.volumeInfo.description,
        price: group.book.saleInfo.listPrice?.amount || 0,
        quantity: group.totalQuantity
    }));

    const sale = {
        items: simplifiedItems,
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

const groupItemsById = (items) => {
    const groupedItems = {};

    for (const item of items) {
        const { book, quantity } = item;
        const itemId = book.id;

        if (!groupedItems[itemId]) {
            groupedItems[itemId] = {
                book: book,
                totalQuantity: 0
            };
        }

        groupedItems[itemId].totalQuantity += quantity;
    }

    return groupedItems;
};