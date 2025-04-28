import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { loadData, saveData } from '../utils/storage';

export default function TotalSalesScreen({ navigation }) {
    const [sales, setSales] = useState([]);

    // Load sales from AsyncStorage when the screen comes into focus
    useFocusEffect(
        React.useCallback(() => {
            const fetchSales = async () => {
                const storedSales = await loadData('sales');
                setSales(storedSales || []);
            };
            fetchSales();
        }, [])
    );

    const handleResetSales = () => {
        Alert.alert(
            'Reset Sales',
            'Are you sure you want to reset all sales data? This action cannot be undone.',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Reset',
                    style: 'destructive',
                    onPress: async () => {
                        setSales([]);
                        await saveData('sales', []);
                    },
                },
            ]
        );
    };

    const calculateTotalSales = () => {
        return sales.reduce((total, sale) => total + sale.total, 0);
    };

    return (
        <View style={styles.container}>
            <View style={styles.summaryCard}>
                <Text style={styles.summaryTitle}>Total Sales Amount</Text>
                <Text style={styles.summaryValue}>${calculateTotalSales()}</Text>
            </View>

            <ScrollView style={styles.salesList}>
                {sales.length === 0 ? (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyStateText}>No sales recorded yet</Text>
                    </View>
                ) : (
                    [...sales].reverse().map((sale) => (
                        <View key={sale.id} style={styles.saleCard}>
                            <Text style={styles.saleProductName}>{sale.productName}</Text>
                            <View style={styles.saleDetails}>
                                <Text style={styles.saleDetail}>Quantity: {sale.quantity}</Text>
                                <Text style={styles.saleDetail}>Total: ${sale.total}</Text>
                                <Text style={styles.saleDetail}>Date: {sale.date}</Text>
                            </View>
                        </View>
                    ))
                )}
            </ScrollView>

            <TouchableOpacity
                style={styles.resetButton}
                onPress={handleResetSales}
            >
                <Text style={styles.resetButtonText}>Reset Sales</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    resetButton: {
        backgroundColor: '#e74c3c',
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
        width: 150,
        alignItems: 'center',
        alignSelf: 'center',
    },
    resetButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    summaryCard: {
        backgroundColor: 'white',
        padding: 8,
        borderRadius: 10,
        marginTop: 60,
        marginBottom: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
        width: 150,
        alignSelf: 'center',
    },
    summaryTitle: {
        fontSize: 14,
        color: '#7f8c8d',
        marginBottom: 5,
    },
    summaryValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2c3e50',
    },
    salesList: {
        flex: 1,
    },
    saleCard: {
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
    saleProductName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 10,
    },
    saleDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    saleDetail: {
        fontSize: 14,
        color: '#7f8c8d',
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyStateText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 10,
    },
}); 