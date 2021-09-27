import axios from 'axios';
import { Alert } from 'react-native';

import { Product } from '../model';

interface ProductPayload {
    productId?: string;
    name: string;
    description: string;
    price: number;
    user: string
}

export const getProducts = async () => {
    const result = await axios.get<Product[]>('http://localhost:3000/products?name=item&price=100')
    return result.data
}

export const getProduct = async ({ productId }: { productId: string }) => {
    const result = await axios.get<Product>(`http://localhost:3000/products/${productId}`);
    return result.data
}

export const deleteProduct = async ({ productId }: { productId: string }) => {
    await axios.delete(`http://localhost:3000/products/${productId}`);
    Alert.alert('Product successfully deleted');
}

export const updateProduct = async (payload: ProductPayload) => {
    await axios.patch(`http://localhost:3000/products/${payload.productId}`, {
        name: payload.name,
        description: payload.description,
        price: payload.price,
        user: payload.user
    })
    Alert.alert('Product successfully updated');

}

export const addProduct = async (payload: ProductPayload) => {
    await axios.post('http://localhost:3000/products', {
        name: payload.name,
        description: payload.description,
        price: payload.price,
        user: payload.user
    })

}
