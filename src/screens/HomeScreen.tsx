import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  ListRenderItem,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {CartIcon} from '../svgs';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {setCartItems} from '../store/cartSlice';
import {useGetProductsQuery} from '../api/getProducts';
import {RootState} from '../store/configureStore';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackNavigatorParamsList} from '../../App';

type Product = {
  id: number;
  name: string;
  price: number;
  colour: string;
  img: string;
};

const HomeScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackNavigatorParamsList>>();
  const {data, isLoading} = useGetProductsQuery('');
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const {cartItems} = useSelector((state: RootState) => state.carts);

  const headerRight = useCallback(
    () => (
      <TouchableOpacity
        onPress={() => navigation.navigate('CartScreen')}
        testID="cart-icon">
        <CartIcon />
        <Text style={styles.headerRight} testID="cart-count">
          {cartItems.length.toString()}
        </Text>
      </TouchableOpacity>
    ),
    [cartItems.length, navigation],
  );

  useEffect(() => {
    if (data) {
      const updatedProducts = data.map((product: Product) => ({
        ...product,
        quantity: 0,
      }));
      setProducts(updatedProducts);
    }
  }, [data]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: headerRight,
    });
  }, [navigation, cartItems, headerRight]);

  const addToCart = (selectedItem: Product) => {
    const index = cartItems.findIndex(
      (item: {id: number}) => item.id === selectedItem.id,
    );

    if (index !== -1) {
      const updatedCart = cartItems.filter(
        (item: {id: number}) => item.id !== selectedItem.id,
      );
      dispatch(setCartItems(updatedCart));
    } else {
      const updatedCart = [...cartItems, selectedItem];
      dispatch(setCartItems(updatedCart));
    }
  };

  const renderItem: ListRenderItem<Product> = ({item, index}) => (
    <View style={styles.itemContainer} testID={`product-item-${item.id}`}>
      <FastImage
        style={styles.productImage}
        source={{
          uri:
            index === 0
              ? 'https://cdn-img.prettylittlething.com/f/7/1/8/f718a4011ddf92f48aeefff6da0f475178694599_cly0842_1.jpg?imwidth=1024'
              : item.img,
        }}
        resizeMode={FastImage.resizeMode.contain}
        testID={`product-image-${item.id}`}
      />
      <View style={styles.productInfoContainer}>
        <View style={{width: wp(15)}}>
          <Text testID={`product-name-${item.id}`}>{item.name}</Text>
          <Text testID={`product-price-${item.id}`}>
            PKR {item.price.toFixed()}
          </Text>
        </View>
        <TouchableOpacity
          testID={`add-to-cart-${item.id}`}
          onPress={() => addToCart(item)}
          activeOpacity={0.8}
          style={styles.cartButton}>
          <CartIcon />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container} testID="home-screen">
      {isLoading || products.length === 0 ? (
        <ActivityIndicator
          testID="loading-indicator"
          style={styles.indicator}
        />
      ) : (
        <FlatList
          data={products}
          renderItem={renderItem}
          numColumns={2}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          testID="product-list"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: wp(5),
  },
  indicator: {
    flex: 1,
  },
  itemContainer: {
    width: wp(45),
    marginTop: 52,
  },
  productImage: {
    height: hp(30),
    borderRadius: 20,
  },
  productInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cartButton: {
    marginRight: 10,
  },
  headerRight: {
    position: 'absolute',
    right: 0,
    backgroundColor: 'black',
    width: 20,
    height: 20,
    padding: 2,
    borderRadius: 10,
    color: 'white',
    textAlign: 'center',
  },
});

export default HomeScreen;
