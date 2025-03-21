import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import dayjs from "dayjs";

const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontFamily: "Helvetica",
        fontSize: 12,
        backgroundColor: "#fff",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#000",
        paddingBottom: 10,
    },
    companyInfo: {
        fontSize: 14,
        fontWeight: "bold",
    },
    invoiceTitle: {
        fontSize: 20,
        fontWeight: "bold",
    },
    invoiceDetails: {
        marginTop: 10,
        fontSize: 10,
    },
    table: {
        width: "100%",
        borderWidth: 1,
        borderColor: "#000",
        marginTop: 10,
    },
    tableRow: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#000",
        paddingVertical: 5,
    },
    tableHeader: {
        fontWeight: "bold",
        backgroundColor: "#ddd",
    },
    tableCell: {
        flex: 1,
        textAlign: "center",
    },
    footer: {
        marginTop: 20,
        textAlign: "right",
    },
    subtitle: {
        fontSize: 14,
        fontWeight: "bold",
        marginBottom: 15,
    },
    detailsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        marginBottom: 5,
    }
});

const PDF = ({ invoice }) => {
    const calculateTax = () => {
        return invoice.amount * (invoice.tax / 100);
    }

    const calculateSubTotal = () => {
        return invoice.amount - calculateTax();
    }

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <View>
                        <Text style={styles.companyInfo}>{invoice.billing.name}</Text>
                    </View>
                    <Text style={styles.invoiceTitle}>INVOICE</Text>
                </View>

                <View style={styles.detailsContainer}>
                    <View>
                        <Text style={styles.invoiceDetails}>
                            Invoice To:
                        </Text>
                        <Text style={styles.subtitle}>{invoice.client}</Text>
                        <Text>{invoice.billing.address}</Text>
                        <Text>{invoice.billing.email}</Text>
                        <Text>{invoice.billing.number}</Text>
                    </View>
                    <View>
                        <Text>Invoice No: {invoice.id}</Text>
                        <Text>Invoice Date: {dayjs(invoice.date).format("D MMMM, YYYY")}</Text>
                    </View>
                </View>

                <View style={styles.table}>
                    <View style={[styles.tableRow, styles.tableHeader]}>
                        <Text style={styles.tableCell}>NAME</Text>
                        <Text style={styles.tableCell}>QTY</Text>
                        <Text style={styles.tableCell}>PRICE</Text>
                        <Text style={styles.tableCell}>TOTAL</Text>
                    </View>
                    {invoice.items.map((item, index) => (
                        <View key={index} style={styles.tableRow}>
                            <Text style={styles.tableCell}>{item.name}</Text>
                            <Text style={styles.tableCell}>{item.quantity}</Text>
                            <Text style={styles.tableCell}>${item.price.toFixed(2)}</Text>
                            <Text style={styles.tableCell}>${item.total.toFixed(2)}</Text>
                        </View>
                    ))}
                </View>

                <View style={styles.footer}>
                    {invoice.tax > 0 && 
                        <>
                            <Text>Sub-total: ${calculateSubTotal()}</Text>
                            <Text>Tax: ${calculateTax()}</Text>
                        </>
                    }

                    <Text style={{ fontSize: 14, fontWeight: "bold" }}>Total: ${invoice.amount.toFixed(2)}</Text>
                </View>
            </Page>
        </Document>
    );
};

export default PDF;