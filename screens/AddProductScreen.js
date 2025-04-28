import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Alert,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { saveData, loadData } from '../utils/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Product name is required'),
    inventory: Yup.number()
        .required('Inventory is required')
        .min(0, 'Inventory cannot be negative'),
    costPrice: Yup.number()
        .required('Cost price is required')
        .min(0, 'Cost price cannot be negative'),
    sellingPrice: Yup.number()
        .required('Selling price is required')
        .min(0, 'Selling price cannot be negative')
        .test('is-greater', 'Selling price must be greater than cost price', function (value) {
            return value > this.parent.costPrice;
        }),
});

export default function AddProductScreen({ navigation }) {
    const handleAddProduct = async (values) => {
        // Convert string values to numbers and assign a unique id
        const newProduct = {
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            name: values.name,
            inventory: Number(values.inventory),
            costPrice: Number(values.costPrice),
            sellingPrice: Number(values.sellingPrice),
        };

        // Load current products from storage
        const products = (await loadData('products')) || [];
        // Add new product
        products.push(newProduct);
        // Save updated products
        await saveData('products', products);

        // Navigate back to Home
        navigation.navigate('MainTabs', { screen: 'Home' });

        // Show success message
        Alert.alert(
            'Success',
            'Product added successfully!',
            [{ text: 'OK' }]
        );
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.innerContainer}>
                    <Text style={styles.title}>Add New Product</Text>

                    <Formik
                        initialValues={{
                            name: '',
                            inventory: '',
                            costPrice: '',
                            sellingPrice: '',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleAddProduct}
                    >
                        {({ handleChange, handleSubmit, values, errors, touched }) => (
                            <View style={styles.form}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Product Name"
                                    value={values.name}
                                    onChangeText={handleChange('name')}
                                />
                                {touched.name && errors.name && (
                                    <Text style={styles.errorText}>{errors.name}</Text>
                                )}

                                <TextInput
                                    style={styles.input}
                                    placeholder="Inventory"
                                    value={values.inventory}
                                    onChangeText={handleChange('inventory')}
                                    keyboardType="numeric"
                                />
                                {touched.inventory && errors.inventory && (
                                    <Text style={styles.errorText}>{errors.inventory}</Text>
                                )}

                                <TextInput
                                    style={styles.input}
                                    placeholder="Cost Price"
                                    value={values.costPrice}
                                    onChangeText={handleChange('costPrice')}
                                    keyboardType="numeric"
                                />
                                {touched.costPrice && errors.costPrice && (
                                    <Text style={styles.errorText}>{errors.costPrice}</Text>
                                )}

                                <TextInput
                                    style={styles.input}
                                    placeholder="Selling Price"
                                    value={values.sellingPrice}
                                    onChangeText={handleChange('sellingPrice')}
                                    keyboardType="numeric"
                                />
                                {touched.sellingPrice && errors.sellingPrice && (
                                    <Text style={styles.errorText}>{errors.sellingPrice}</Text>
                                )}

                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={handleSubmit}
                                >
                                    <Text style={styles.buttonText}>Add Product</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.cancelButton}
                                    onPress={() => navigation.goBack()}
                                >
                                    <Text style={styles.cancelButtonText}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </Formik>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    scrollContainer: {
        flexGrow: 1,
    },
    innerContainer: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 20,
        textAlign: 'center',
    },
    form: {
        width: '100%',
    },
    input: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    button: {
        backgroundColor: '#3498db',
        padding: 15,
        borderRadius: 10,
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
    cancelButton: {
        backgroundColor: '#95a5a6',
        padding: 15,
        borderRadius: 10,
        marginTop: 10,
    },
    cancelButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
    errorText: {
        color: '#e74c3c',
        fontSize: 12,
        marginBottom: 10,
    },
}); 