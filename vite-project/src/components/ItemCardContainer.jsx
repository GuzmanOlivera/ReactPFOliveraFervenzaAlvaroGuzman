import React, { useEffect, useState } from 'react';
import ItemCard from './ItemCard';
import { useParams } from 'react-router-dom';
import { getBooks, getBooksByCategory } from '../utils';

function ItemCardContainer() {
  const [books, setBooks] = useState([]);
  const params = useParams();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        let fetchedBooks;
        if (params.category) {
          fetchedBooks = await getBooksByCategory(params.category);
        } else {
          fetchedBooks = await getBooks();
        }
        setBooks(fetchedBooks);
      } catch (error) {
        console.error('Error al obtener los libros: ', error);
        toast.error('Error al obtener los libros: ' + error);
      }
    };

    fetchBooks();
  }, [params.category]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">
        {params.category === "programming" ? "Libros de programación" : params.category === "database" ? "Libros de bases de datos" : "Todos los Libros"}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        {books.map(book => (
          <ItemCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}

export default ItemCardContainer;
