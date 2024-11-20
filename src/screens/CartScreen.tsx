import React from 'react';
import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import {DeleteCartProductIcon} from '../svgs';
import {setCartItems} from '../store/cartSlice';
import {RootState} from '../store/configureStore';

type Product = {
  id: number;
  name: string;
  img: string;
  price: number;
  colour: string;
  quantity: number;
};

const CartScreen: React.FC = () => {
  const {cartItems} = useSelector((state: RootState) => state.carts);

  const dispatch = useDispatch();

  const removeItemFromCart = (deletedItem: Product) => {
    const updatedCart = cartItems.filter(
      (item: {id: number}) => item.id !== deletedItem.id,
    );
    dispatch(setCartItems(updatedCart));
  };

  const updateQuantity = (id: number, increment: number) => {
    const updatedCartItems = cartItems.map(
      (item: {id: number; quantity: number}) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(0, item.quantity + increment),
            }
          : item,
    );
    dispatch(setCartItems(updatedCartItems));
  };

  const renderItem: ListRenderItem<Product> = ({item}) => {
    return (
      <View style={styles.itemContainer}>
        <FastImage
          style={styles.productImage}
          source={{
            uri: item.img,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
        <View style={styles.productInfoContainer}>
          <View style={styles.productTitleContainer}>
            <Text numberOfLines={1} style={styles.productTitle}>
              {item.name}
            </Text>
            <TouchableOpacity
              onPress={() => removeItemFromCart(item)}
              activeOpacity={0.8}
              testID={`delete-button-${item.id}`}
              style={{marginRight: wp(4)}}>
              <DeleteCartProductIcon />
            </TouchableOpacity>
          </View>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              hitSlop={15}
              testID={`decrement-button-${item.id}`}
              onPress={() => updateQuantity(item.id, -1)}
              disabled={item.quantity === 0}>
              <Text>-</Text>
            </TouchableOpacity>
            <Text testID={`quantity-${item.id}`}>{item.quantity}</Text>
            <TouchableOpacity
              hitSlop={15}
              testID={`increment-button-${item.id}`}
              onPress={() => updateQuantity(item.id, 1)}>
              <Text>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {cartItems.length === 0 ? (
        <Text style={styles.noItem}>No Item</Text>
      ) : (
        <FlatList
          data={cartItems}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(5),
  },
  noItem: {
    textAlign: 'center',
    fontSize: 20,
  },
  itemContainer: {
    marginTop: 10,
    flexDirection: 'row',
    height: hp(11.8),
    width: wp(86),
  },
  productImage: {
    width: wp(25.5),
    height: '100%',
    borderRadius: 10,
    backgroundColor: 'white',
  },
  productInfoContainer: {
    backgroundColor: 'white',
    marginLeft: wp(4),
    paddingLeft: wp(5),
    justifyContent: 'center',
    borderRadius: 10,
    flex: 1,
  },
  productTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productTitle: {
    width: '80%',
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12.5,
    borderWidth: 1,
    marginTop: 16,
    borderColor: '#CCCCCC',
    borderRadius: 50,
    width: wp(20),
  },
});

export default CartScreen;
