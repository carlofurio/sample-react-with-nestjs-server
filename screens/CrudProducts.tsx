import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { Product } from '../model';
import { getProducts, addProduct, getProduct, updateProduct, deleteProduct } from '../service/DatabaseService';
import { InputField, Button } from '../components'

export const CrudProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<Product>();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [user, setUser] = useState('');
  const [id, setId] = useState('');

  const onGetProducts = async () => {
    const result = await getProducts();
    setProducts(result);
  }

  const onGetProduct = async () => {
    const result = await getProduct({ productId: id });
    setProduct(result);
    setId('');
  }

  const onDeleteProduct = async () => {
    await deleteProduct({ productId: id })
    setId('');
  }

  const onUpdateProduct = async () => {
    await updateProduct({
      productId: id,
      name,
      description,
      price,
      user
    })
    setName('');
    setDescription('');
    setPrice(0);
    setId('');
    setUser('');
  }

  const onAddProduct = () => {
    addProduct({
      name,
      description,
      price,
      user
    })
    setName('');
    setDescription('');
    setPrice(0);
    setUser('');
    getProducts();
  }

  return (
    <View style={styles.container}>
      <View style={styles.postGetAll}>
        <InputField title={'Name'} onValueChange={(text) => setName(text)} value={name} />
        <InputField title={'Description'} onValueChange={(text) => setDescription(text)} value={description} />
        <InputField title={'Price'} onValueChange={(text) => setPrice(parseInt(text))} value={price.toString()} />
        <InputField title={'User'} onValueChange={(text) => setUser(text)} value={user} />
        <Button title={'Add Product'} onPress={onAddProduct} />
        <Button title={'Get Products'} onPress={onGetProducts} />
        {products.map((product) =>
          <View key={product.id} style={styles.content}>
            <Text>{product.id}</Text>
            <Text>{product.name}</Text>
            <Text>{product.description}</Text>
            <Text>{product.price}</Text>
            <Text>{product.user}</Text>
          </View>
        )}
        <StatusBar style="auto" />
      </View>
      <View style={styles.getOneUpdate}>
        <InputField title={'Id'} onValueChange={(text) => setId(text)} value={id} />
        <Button title={'Get by Id'} onPress={onGetProduct} />
        <View style={styles.content}>
          <Text>{product?.id}</Text>
          <Text>{product?.name}</Text>
          <Text>{product?.description}</Text>
          <Text>{product?.price}</Text>
        </View>
        <Button title={'Delete by Id'} onPress={onDeleteProduct} />
        <Button title={'Update Product by Id'} onPress={onUpdateProduct} />
        <StatusBar style="auto" />
      </View>
    </View>
  );
}

export default CrudProducts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  postGetAll: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'grey'
  },
  getOneUpdate: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'grey'
  },
  content: {
    marginTop: 16,
    width: '80%',
    backgroundColor: '#cacfcc',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    backgroundColor: 'white',
    color: 'black'
  },
  button: {
    marginTop: 16
  }
});
