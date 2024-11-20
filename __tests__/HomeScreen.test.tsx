import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {useGetProductsQuery} from '../src/api/getProducts';
import HomeScreen from '../src/screens/HomeScreen';
import {it, expect, beforeEach, describe} from '@jest/globals';

const mockNavigate = jest.fn();
const mockSetOptions = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
    setOptions: mockSetOptions,
  }),
}));

jest.mock('../src/api/getProducts', () => ({
  useGetProductsQuery: jest.fn(),
}));

jest.mock('../src/svgs', () => ({
  CartIcon: () => 'CartIcon',
}));

const mockStore = configureStore([]);

describe('HomeScreen', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      carts: {
        cartItems: [],
      },
    });
  });

  it('should render loading indicator when loading', () => {
    useGetProductsQuery.mockReturnValue({
      data: [],
      isLoading: true,
    });

    const {getByTestId} = render(
      <Provider store={store}>
        <HomeScreen />
      </Provider>,
    );

    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('should render product list when data is loaded', () => {
    useGetProductsQuery.mockReturnValue({
      data: [
        {
          id: 1,
          name: 'Product 1',
          price: 100,
          colour: 'red',
          img: 'img1.jpg',
          quantity: 0,
        },
      ],
      isLoading: false,
    });

    const {getByTestId} = render(
      <Provider store={store}>
        <HomeScreen />
      </Provider>,
    );

    expect(getByTestId('product-list')).toBeTruthy();
  });

  it('should add item to the cart', () => {
    useGetProductsQuery.mockReturnValue({
      data: [
        {
          id: 1,
          name: 'Product 1',
          price: 100,
          colour: 'red',
          img: 'img1.jpg',
          quantity: 0,
        },
      ],
      isLoading: false,
    });

    const {getByTestId} = render(
      <Provider store={store}>
        <HomeScreen />
      </Provider>,
    );

    const addToCartButton = getByTestId('add-to-cart-1');
    fireEvent.press(addToCartButton);

    const actions = store.getActions();
    expect(actions).toEqual([
      {
        type: 'carts/setCartItems',
        payload: [
          {
            id: 1,
            name: 'Product 1',
            price: 100,
            colour: 'red',
            img: 'img1.jpg',
            quantity: 0,
          },
        ],
      },
    ]);
  });

  it('should remove item from the cart if it is already added', () => {
    store = mockStore({
      carts: {
        cartItems: [
          {
            id: 1,
            name: 'Product 1',
            price: 100,
            colour: 'red',
            img: 'img1.jpg',
            quantity: 0,
          },
        ],
      },
    });

    useGetProductsQuery.mockReturnValue({
      data: [
        {
          id: 1,
          name: 'Product 1',
          price: 100,
          colour: 'red',
          img: 'img1.jpg',
          quantity: 0,
        },
      ],
      isLoading: false,
    });

    const {getByTestId} = render(
      <Provider store={store}>
        <HomeScreen />
      </Provider>,
    );

    const addToCartButton = getByTestId('add-to-cart-1');
    fireEvent.press(addToCartButton);

    const actions = store.getActions();
    expect(actions).toEqual([{type: 'carts/setCartItems', payload: []}]);
  });
});
