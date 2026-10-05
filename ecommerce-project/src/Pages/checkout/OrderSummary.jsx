import dayjs from "dayjs";
import { useState } from "react";
import { formatMoney } from "../../utils/money";
import { DeliveryOptions } from "./DeliveryOptions";
import axios from "axios";

export function OrderSummary({ cart,deliveryOptions , loadCart}) {
  const [isUpdating, setIsUpdating] = useState({});
  const [quantity, setQuantity] = useState({});

  return (
    <div className="order-summary">
      {deliveryOptions.length > 0 &&
        cart.map((cartItem) => {
          const selectDeliveryOption = deliveryOptions.find(
            (deliveryOption) => {
              return deliveryOption.id === cartItem.deliveryOptionId;
            },
          );
          const deleteCartItem = async () => {
            await axios.delete(`/api/cart-items/${cartItem.productId}`);
            await loadCart();
          }

          const updateCartItem = async (event) => {
            event.preventDefault();
            await axios.put(`/api/cart-items/${cartItem.productId}`, {
              quantity: Number(quantity[cartItem.productId])
            });
            await loadCart();
            setIsUpdating((current) => ({
              ...current,
              [cartItem.productId]: false,
            }));
          }

          return (
            <div key={cartItem.productId} className="cart-item-container">
              <div className="delivery-date">
                Delivery date:
                {dayjs(selectDeliveryOption.estimatedDeliveryTimeMs).format(
                  "dddd,MMMM D",
                )}
              </div>

              <div className="cart-item-details-grid">
                <img className="product-image" src={cartItem.product.image} />

                <div className="cart-item-details">
                  <div className="product-name">{cartItem.product.name}</div>
                  <div className="product-price">
                    {formatMoney(cartItem.product.priceCents)}
                  </div>
                  <div className="product-quantity">
                    <span>Quantity: </span>
                      {isUpdating[cartItem.productId] ? (
                        <form onSubmit={updateCartItem}>
                          <input
                            type="number"
                            min="1"
                            step="1"
                            required
                            value={
                              quantity[cartItem.productId] ?? cartItem.quantity
                            }
                            onChange={(event) =>
                              setQuantity((current) => ({
                                ...current,
                                [cartItem.productId]: event.target.value,
                              }))
                            }
                          />
                          <button type="submit">Save</button>
                        </form>
                      ) : (
                        <>
                          <span className="quantity-label">
                            {cartItem.quantity}
                          </span>
                          <span
                            className="update-quantity-link link-primary"
                            onClick={() => {
                              setQuantity((current) => ({
                                ...current,
                                [cartItem.productId]: cartItem.quantity,
                              }));
                              setIsUpdating((current) => ({
                                ...current,
                                [cartItem.productId]: true,
                              }));
                            }}
                          >
                            Update
                          </span>
                        </>
                      )}
                    <span className="delete-quantity-link link-primary"
                      onClick={deleteCartItem}>
                      Delete
                    </span>
                  </div>
                </div>

                <DeliveryOptions cartItem={cartItem} deliveryOptions={deliveryOptions} loadCart={loadCart} />
              </div>
            </div>
          );
        })}
    </div>
  );
}
