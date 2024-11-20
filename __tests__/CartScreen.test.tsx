import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import CartScreen from '../src/screens/CartScreen';
import {setCartItems} from '../src/store/cartSlice';
import {act} from 'react-test-renderer';
import {it, describe, expect} from '@jest/globals';

const mockStore = configureStore([]);
const initialState = {
  carts: {
    cartItems: [
      {
        id: 1,
        name: 'Product 1',
        img: 'https://example.com/image1.jpg',
        price: 10,
        colour: 'red',
        quantity: 0,
      },
      {
        id: 2,
        name: 'Product 2',
        img: 'https://example.com/image2.jpg',
        price: 20,
        colour: 'blue',
        quantity: 0,
      },
    ],
  },
};
const store = mockStore(initialState);

describe('CartScreen', () => {
  it('should render the cart items', () => {
    const {getByText} = render(
      <Provider store={store}>
        <CartScreen />
      </Provider>,
    );

    expect(getByText('Product 1')).toBeTruthy();
    expect(getByText('Product 2')).toBeTruthy();
  });

  it('should remove item from cart on pressing delete button', () => {
    const {getByTestId} = render(
      <Provider store={store}>
        <CartScreen />
      </Provider>,
    );

    // Simulate pressing the delete button for the first product
    const deleteButton = getByTestId('delete-button-1');
    fireEvent.press(deleteButton);

    // Check if the action was dispatched
    const actions = store.getActions();
    expect(actions).toContainEqual(
      setCartItems([
        {
          id: 2,
          name: 'Product 2',
          img: 'https://example.com/image2.jpg',
          price: 20,
          colour: 'blue',
          quantity: 0,
        },
      ]),
    );
  });

  it('should increment and decrement product quantity', async () => {
    const {getByTestId} = render(
      <Provider store={store}>
        <CartScreen />
      </Provider>,
    );

    // Simulate pressing the increment button for the first product
    await act(async () => {
      fireEvent.press(getByTestId('increment-button-1'));
    });
    expect(getByTestId('quantity-1').props.children).toBe(0);

    // Simulate pressing the decrement button for the first product
    await act(async () => {
      fireEvent.press(getByTestId('decrement-button-1'));
    });
    expect(getByTestId('quantity-1').props.children).toBe(0);
  });
});
