import styles from './ProductCard.module.css'

export function ProductCard({ product, background="slategray", onPurchase }){
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
        <ul className={styles.Spec}>
          {product.specification.map((spec, index) => (
            <li key={index}>{spec}</li>
          ))}
        </ul>
        <Status stock={product.stock}/>
        {product.stock > 0 && (<button onClick={() => (onPurchase(product))}>Buy (From ${product.price})</button>)}
      </article>
    
  );
} 

export function Status({stock}){
  const statusNoAvailable = <p className={styles.StatusNotAvailable}>No items available</p>;
  const statusAvailable = <p className={styles.StatusAvailable}>Items available: {stock}</p>;
  
  return (stock === 0) ? statusNoAvailable : statusAvailable;
}