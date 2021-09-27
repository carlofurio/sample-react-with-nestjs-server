import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, Button, TextInput, View } from 'react-native';
import axios from 'axios';

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
}


export const CrudUsers = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<Product>();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [id, setId] = useState('');

  const getProducts = useCallback(async () => {
    const result = await axios.get<Product[]>('http://localhost:3000/products')
    setProducts(result.data);
  }, [])

  const getSingleProduct = async () => {
    const result = await axios.get<Product>(`http://localhost:3000/products/${id}`);
    setProduct(result.data);
    setId('');
  }

  const deleteProduct = async () => {
    await axios.delete(`http://localhost:3000/products/${id}`);
    setId('');
    getProducts();
  }

  const updateProduct = async () => {
    await axios.patch(`http://localhost:3000/products/${id}`, {
      title,
      description,
      price
    })
    setTitle('');
    setDescription('');
    setPrice(0);
    setId('');
    getProducts();
  }

  const onAddProduct = async () => {
    await axios.post('http://localhost:3000/products', {
      title,
      description,
      price
    })
    setTitle('');
    setDescription('');
    setPrice(0);
    getProducts();
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.postGetAll}>
        <View style={styles.inputContainer}>
          <Text>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={(text) => setTitle(text)} />
        </View>
        <View style={styles.inputContainer}>
          <Text>Description</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={(text) => setDescription(text)} />
        </View>
        <View style={styles.inputContainer}>
          <Text>Price</Text>
          <TextInput
            style={styles.input}
            value={price.toString()}
            onChangeText={(text) => setPrice(parseInt(text))} />
        </View>
        <View style={styles.button}>
          <Button title={'Add Product'} onPress={onAddProduct} />
        </View>
        {products.map((product) =>
          <View key={product.id} style={styles.content}>
            <Text>{product.id}</Text>
            <Text>{product.title}</Text>
            <Text>{product.description}</Text>
            <Text>{product.price}</Text>
          </View>
        )}
        <StatusBar style="auto" />

      </View>
      <View style={styles.getOneUpdate}>
        <View style={styles.inputContainer}>
          <Text>Id</Text>
          <TextInput style={styles.input} value={id} onChangeText={(text) => setId(text)} />
        </View>
        <View style={styles.button}>
          <Button title={'Get by Id'} onPress={getSingleProduct} />
        </View>
        <View style={styles.content}>
          <Text>{product?.id}</Text>
          <Text>{product?.title}</Text>
          <Text>{product?.description}</Text>
          <Text>{product?.price}</Text>
        </View>
        <View style={styles.button}>
          <Button title={'Delete by Id'} onPress={deleteProduct} />
        </View>
        <View style={styles.button}>
          <Button title={'Update Product by Id'} onPress={updateProduct} />
        </View>
        <StatusBar style="auto" />
      </View>
    </View>
  );
}

export default CrudUsers;

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
