import { Link } from "react-router-dom";

function ItemCard({ book }) {
    const { volumeInfo } = book; 
    const { title,  imageLinks } = volumeInfo;

    const image = imageLinks?.thumbnail;
    const name = title;
    const id = book.id; 

    return (
        <div className="p-4 transition rounded-md shadow-md user-card hover:scale-105 group bg-slate-300">
            <div className="overflow-hidden aspect-w-3 aspect-h-4">
                <img
                    className="object-cover w-full h-full transition-all duration-500 rounded-md grayscale group-hover:grayscale-0 group-hover:scale-120"
                    src={image}
                    alt="card image"
                    style={{ aspectRatio: "3/4" }}
                />
            </div>
            <h2 className="my-2 font-bold">{name}</h2>
            <Link to={`/item/${id}`}>Ver más</Link>
        </div>
    );
}

export default ItemCard;
