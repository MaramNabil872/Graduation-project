import React from "react";
import Price from "../Price/Price";
import StarRating from "../StarRating/StarRating";
import classes from "./thumbnails.module.css";
export default function Thumbnails({ foods }) {
    // Ensure that foods is always an array before calling map
    const foodItems = Array.isArray(foods)
        ? foods.map((food) => (
              <li key={food.id}>
                  <Link to={`/food/${food.id}`}>
                      <img
                          className={classes.image}
                          src={`${food.thumbnailUrl}`}
                          alt={food.name}
                      />
                      <div className={classes.content}>
                          <div className={classes.name}>{food.name}</div>
                          <span
                              className={`${classes.favorite} ${
                                  food.favorite ? "" : classes.not
                              }`}
                          >
                              ❤
                          </span>
                          <div className={classes.stars}>
                              <StarRating stars={food.stars} />
                          </div>
                          <div className={classes.product_item_footer}>
                              <div className={classes.origins}>
                                  {food.origins.map((origin) => (
                                      <span key={origin}>{origin}</span>
                                  ))}
                              </div>
                              <div className={classes.cook_time}>
                                  <span>🕒</span>
                                  {food.cookTime}
                              </div>
                          </div>
                          <div className={classes.price}>
                              <Price price={food.price} />
                          </div>
                      </div>
                  </Link>
              </li>
          ))
        : null;

    return <ul className={classes.list}>{foodItems}</ul>;
}
