import { Fragment } from "react/jsx-runtime";
import { ProductCard } from "./components/ProductCard";
import { ProductList } from "./components/ProductList";
import styles from "./App.module.css";


const products = [
  {
    imageSrc: "images/iphone.png",
    title: "iPhone 15 Pro",
    specification: [
      "A17 Pro chip with 6-core GPU",
      "3x or 5x Telephoto camera",
      "Up to 29 hours video playback"
    ],
    stock: 10,
    price: 999,
  },
  {
    imageSrc: "images/airpods.png",
    title: "AirPods Pro 2",
    specification: [
      "Noise Cancellation",
      "Dust, sweat, and water resistant",
      "Up to 6 hours of listening",
    ],
    stock: 0,
    price: 200,
  },
  {
    imageSrc: "images/apple-watch.png",
    title: "Apple Watch 9",
    specification: [
      "45mm or 41mm case size",
      "Always-On Retina display",
      "Up to 18 hours normal use",
    ],
    stock: 3,
    price: 400,
  }

];

function handlePurchase(product){
    return (window.alert(`You bought an ${product.title} with price $${product.price}`));
  }

function App() {
  return (
    
    <div className={styles.App}>

      <h2>Products</h2>
      
      <ProductList>
        {products.map((product) => (
            <ProductCard key={product.title} width="96px" height="96px" onPurchase={handlePurchase} product={product} />
        ))}
      </ProductList>

      <h2>Products which cost up to $500</h2>

      
        {products.filter(({price}) => price < 500).map(({title, price}) => (
          <Fragment key={title}>
            <p key={title} className={styles.ListTitle}>
              {title} cost ${price}
            </p>
            <hr className={styles.ListDivider}/>
          </Fragment>
        ))}
      
    </div>
    
  );
}

export default App;