import axiosClient from '../utils/axiosClient';
import { cartActions } from '../Features/Checkout/CartSlice.js';
import { STORAGE, DUMMYSELLERS } from '../constants';
import { loc } from '../utils';

export const addToCart = (productId, qty) => async (dispatch, getState) => {
  const { data } = await axiosClient.get(`/api/products/${productId}`);
  const { cart } = getState();
  const { cartItems } = cart;

  if (cartItems.length > 0 && data.seller._id !== cartItems[0].seller._id) {
    dispatch(
      cartActions._ADD_ITEM_FAIL(
        `Can't Add Item Of Other Supplier. Buy Only From The Same Seller (${
          cartItems[0].seller.seller.name || DUMMYSELLERS.name
        }) in this order`
      )
    );
  } else {
    dispatch(
      cartActions._ADD_ITEM({
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        product: data._id,
        ship: data.ship,
        deal: data.deal,
        seller: data.seller,
        qty
      })
    );

    loc[STORAGE.CART_ITEMS] = getState().cart.cartItems;
  }
};

export const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch(cartActions._REMOVE_ITEM(productId));
  loc[STORAGE.CART_ITEMS] = getState().cart.cartItems;
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch(cartActions._SAVE_SHIPPING_ADDRESS(data));
  loc[STORAGE.SHIPPING_ADDRESS] = data;
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch(cartActions._SAVE_PAYMENT_METHOD(data));
};
