import { useState } from 'react';
import styles from './ProductCard.module.css'

export function ProductCard({ product, background="slategray", onPurchase }){
  const [stock,setStockCount] = useState(product.stock)
  const [showMore, setShowMore] = useState()
  
  function handleClick(){
    setStockCount(stock - 1);
    onPurchase(product)
  }
  function handleTwoClicks(){
    setStockCount((prevState) => prevState - 1);
    setStockCount((prevState) => prevState - 1);
  }

  return (
      <article className={styles.Container} style={{background}}>
        <h2>{product.title}</h2>
        <img
        src={product.imageSrc}
        alt={product.title}
        width={128}
        height={128}
        />
        <p>Specification</p>
        <button onClick={() => setShowMore(!showMore)}>{showMore? 'Hide' : 'Show more'}</button>
        {showMore &&
        <ul className={styles.Spec}>
          {product.specification.map((spec, index) => (
            <li key={index}>{spec}</li>
          ))}
        </ul>}
        <Status stock={stock}/>
        
        {stock > 0 && (
          <>
            <p>Price: ${product.price}</p>
            <button onClick={handleClick}>Buy</button>
          </>
        )}
        {stock >= 2 && ( 
          <button onClick={handleTwoClicks}>Buy two</button>
        )}
      </article>
    
  );
} 

export function Status({stock}){
  const statusNoAvailable = <p className={styles.StatusNotAvailable}>No items available</p>;
  const statusAvailable = <p className={styles.StatusAvailable}>Items available: {stock}</p>;
  
  return (stock === 0) ? statusNoAvailable : statusAvailable;
}