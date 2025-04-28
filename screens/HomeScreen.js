import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, TextInput } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { loadData, saveData } from '../utils/storage';

export default function HomeScreen({ navigation, route }) {
    const [products, setProducts] = useState([]);
    const [sales, setSales] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [shouldNavigate, setShouldNavigate] = useState(false);

    // Load products from AsyncStorage when screen is focused
    useFocusEffect(
        React.useCallback(() => {
            const fetchProducts = async () => {
                const storedProducts = await loadData('products');
                setProducts(storedProducts || []);
            };
            fetchProducts();

            if (route.params?.sales) {
                setSales(route.params.sales);
            }
            if (route.params?.resetSales) {
                setSales([]);
                navigation.setParams({ resetSales: false });
            }
        }, [route.params?.sales, route.params?.resetSales])
    );

    // Handle navigation after state updates
    useEffect(() => {
        if (shouldNavigate) {
            navigation.navigate('TotalSales', { sales });
            setShouldNavigate(false);
        }
    }, [shouldNavigate, sales]);

    const handleEditQuantity = async (productId, newQuantity) => {
        if (newQuantity < 0) return;

        const updatedProducts = products.map(product => {
            if (product.id === productId) {
                // Detect sale
                const oldQuantity = product.inventory;
                const quantityDiff = oldQuantity - newQuantity;
                if (quantityDiff > 0) {
                    // Create new sale record
                    const newSale = {
                        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
                        productName: product.name,
                        quantity: quantityDiff,
                        total: quantityDiff * product.sellingPrice,
                        date: new Date().toISOString().split('T')[0]
                    };
                    // Load, update, and save sales
                    loadData('sales').then(sales => {
                        const updatedSales = (sales || []);
                        updatedSales.push(newSale);
                        saveData('sales', updatedSales);
                    });
                }
                return { ...product, inventory: Math.max(0, newQuantity) };
            }
            return product;
        });
        setProducts(updatedProducts);
        await saveData('products', updatedProducts);
    };

    const handleDeleteProduct = (productId) => {
        Alert.alert(
            'Delete Product',
            'Are you sure you want to delete this product?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        const updatedProducts = products.filter(product => product.id !== productId);
                        setProducts(updatedProducts);
                        await saveData('products', updatedProducts);
                    },
                },
            ],
            { cancelable: true }
        );
    };

    const handleEditProduct = (product) => {
        setEditingProduct({ ...product });
    };

    const handleSaveEdit = async () => {
        if (!editingProduct) return;

        if (editingProduct.costPrice >= editingProduct.sellingPrice) {
            Alert.alert(
                'Invalid Prices',
                'Cost Price must be less than Selling Price.'
            );
            return;
        }

        const updatedProducts = products.map(product =>
            product.id === editingProduct.id ? editingProduct : product
        );
        setProducts(updatedProducts);
        await saveData('products', updatedProducts);
        setEditingProduct(null);
    };

    const calculateTotalValue = () => {
        return products.reduce((total, product) => {
            return total + (product.inventory * product.costPrice);
        }, 0);
    };

    const calculatePotentialProfit = () => {
        return products.reduce((total, product) => {
            return total + (product.inventory * (product.sellingPrice - product.costPrice));
        }, 0);
    };

    // Filter out null/invalid products at the top
    const validProducts = products.filter(product => product && typeof product === 'object');

    return (
        <View style={styles.container}>
            <View style={styles.summaryContainer}>
                <View style={styles.summaryCard}>
                    <Text style={styles.summaryTitle}>Total Products</Text>
                    <Text style={styles.summaryValue}>{products.length}</Text>
                </View>
                <View style={styles.summaryCard}>
                    <Text style={styles.summaryTitle}>Total Products Value</Text>
                    <Text style={styles.summaryValue}>${calculateTotalValue()}</Text>
                </View>
                <View style={styles.summaryCard}>
                    <Text style={styles.summaryTitle}>Potential Profit</Text>
                    <Text style={styles.summaryValue}>${calculatePotentialProfit()}</Text>
                </View>
            </View>

            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('AddProduct')}
            >
                <Text style={styles.addButtonText}>Add New Product</Text>
            </TouchableOpacity>

            <ScrollView style={styles.productList}>
                {validProducts.length === 0 ? (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyStateText}>No products added yet</Text>
                        <Text style={styles.emptyStateSubText}>Click the button above to add your first product</Text>
                    </View>
                ) : (
                    validProducts.map((product) => (
                        <View key={product.id} style={styles.productCard}>
                            <View style={styles.productHeader}>
                                {editingProduct && editingProduct.id === product.id ? (
                                    <TextInput
                                        style={styles.editInput}
                                        value={editingProduct.name}
                                        onChangeText={(text) => setEditingProduct({ ...editingProduct, name: text })}
                                    />
                                ) : (
                                    <Text style={styles.productName}>{product.name}</Text>
                                )}
                                <View style={styles.productActions}>
                                    {editingProduct && editingProduct.id === product.id ? (
                                        <TouchableOpacity
                                            style={styles.saveButton}
                                            onPress={handleSaveEdit}
                                        >
                                            <Text style={styles.saveButtonText}>Save</Text>
                                        </TouchableOpacity>
                                    ) : (
                                        <>
                                            <TouchableOpacity
                                                style={styles.editButton}
                                                onPress={() => handleEditProduct(product)}
                                            >
                                                <Text style={styles.editButtonText}>Edit</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={styles.deleteButton}
                                                onPress={() => handleDeleteProduct(product.id)}
                                                activeOpacity={0.7}
                                            >
                                                <Text style={styles.deleteButtonText}>×</Text>
                                            </TouchableOpacity>
                                        </>
                                    )}
                                </View>
                            </View>
                            <View style={styles.productDetails}>
                                <View style={styles.quantityContainer}>
                                    <Text style={styles.quantityLabel}>Quantity:</Text>
                                    {editingProduct && editingProduct.id === product.id ? (
                                        <View style={styles.quantityControls}>
                                            <TouchableOpacity
                                                style={[styles.quantityButton, editingProduct.inventory <= 0 && styles.disabledButton]}
                                                onPress={() => setEditingProduct({ ...editingProduct, inventory: Math.max(0, editingProduct.inventory - 1) })}
                                                disabled={editingProduct.inventory <= 0}
                                            >
                                                <Text style={styles.quantityButtonText}>-</Text>
                                            </TouchableOpacity>
                                            <Text style={styles.quantityValue}>{editingProduct.inventory}</Text>
                                            <TouchableOpacity
                                                style={styles.quantityButton}
                                                onPress={() => setEditingProduct({ ...editingProduct, inventory: editingProduct.inventory + 1 })}
                                            >
                                                <Text style={styles.quantityButtonText}>+</Text>
                                            </TouchableOpacity>
                                        </View>
                                    ) : (
                                        <View style={styles.quantityControls}>
                                            <TouchableOpacity
                                                style={[styles.quantityButton, product.inventory <= 0 && styles.disabledButton]}
                                                onPress={() => handleEditQuantity(product.id, product.inventory - 1)}
                                                disabled={product.inventory <= 0}
                                            >
                                                <Text style={styles.quantityButtonText}>-</Text>
                                            </TouchableOpacity>
                                            <Text style={styles.quantityValue}>{product.inventory}</Text>
                                            <TouchableOpacity
                                                style={styles.quantityButton}
                                                onPress={() => handleEditQuantity(product.id, product.inventory + 1)}
                                            >
                                                <Text style={styles.quantityButtonText}>+</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                </View>
                                {editingProduct && editingProduct.id === product.id ? (
                                    <>
                                        <TextInput
                                            style={styles.editInput}
                                            value={editingProduct.costPrice.toString()}
                                            onChangeText={(text) => setEditingProduct({ ...editingProduct, costPrice: parseFloat(text) || 0 })}
                                            keyboardType="numeric"
                                            placeholder="Cost Price"
                                        />
                                        <TextInput
                                            style={styles.editInput}
                                            value={editingProduct.sellingPrice.toString()}
                                            onChangeText={(text) => setEditingProduct({ ...editingProduct, sellingPrice: parseFloat(text) || 0 })}
                                            keyboardType="numeric"
                                            placeholder="Selling Price"
                                        />
                                    </>
                                ) : (
                                    <>
                                        <Text style={styles.productDetail}>Cost: ${product.costPrice}</Text>
                                        <Text style={styles.productDetail}>Price: ${product.sellingPrice}</Text>
                                    </>
                                )}
                            </View>
                        </View>
                    ))
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    summaryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        marginTop: 60,
    },
    summaryCard: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        flex: 1,
        marginHorizontal: 5,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    summaryTitle: {
        fontSize: 12,
        color: '#7f8c8d',
        marginBottom: 5,
    },
    summaryValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2c3e50',
    },
    addButton: {
        backgroundColor: '#3498db',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
    },
    addButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
    productList: {
        flex: 1,
    },
    productCard: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    productHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2c3e50',
    },
    productActions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    editButton: {
        backgroundColor: '#3498db',
        padding: 8,
        borderRadius: 5,
    },
    editButtonText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    deleteButton: {
        backgroundColor: '#e74c3c',
        width: 35,
        height: 35,
        borderRadius: 17.5,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5,
    },
    deleteButtonText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        lineHeight: 30,
    },
    saveButton: {
        backgroundColor: '#2ecc71',
        padding: 8,
        borderRadius: 5,
    },
    saveButtonText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    productDetails: {
        gap: 10,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    quantityLabel: {
        fontSize: 14,
        color: '#7f8c8d',
    },
    quantityControls: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityButton: {
        backgroundColor: '#3498db',
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
    },
    disabledButton: {
        backgroundColor: '#bdc3c7',
    },
    quantityButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    quantityValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2c3e50',
        minWidth: 30,
        textAlign: 'center',
    },
    productDetail: {
        fontSize: 14,
        color: '#7f8c8d',
    },
    editInput: {
        borderWidth: 1,
        borderColor: '#bdc3c7',
        borderRadius: 5,
        padding: 8,
        marginBottom: 5,
        fontSize: 14,
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        marginTop: 20,
    },
    emptyStateText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 10,
    },
    emptyStateSubText: {
        fontSize: 14,
        color: '#7f8c8d',
        textAlign: 'center',
    },
}); 