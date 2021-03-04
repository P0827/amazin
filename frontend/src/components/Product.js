import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";

export default function Product({ product }) {
  return (
    <div key={product._id} className="card flex">
      <div className="card__center">
        <Link to={`/product/${product._id}`}>
          <img className="thumbnail" src={product.image} alt={product.name} />
        </Link>
        <div className="card__body">
          <Link to={`/product/${product._id}`}>
            <h2>{product.name}</h2>
          </Link>
          <Rating
            rating={product.rating}
            numReviews={product.numReviews}
          ></Rating>
          <div className="">
            <div className="price">
              <sup>$</sup>
              {product.price}
            </div>
            <sub>Shipping exklusive</sub>
            <div>
              <Link to={`/seller/${product.seller._id}`} className="row end">
                By Seller: {product?.seller?.seller?.name || "Anonymous Seller"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
