import { StyleSheet, View } from "@react-pdf/renderer"
import TotalElement from "./TotalElement";

const styles = StyleSheet.create({
    root: {
        width: '40%',
        flexDirection: 'column',
    },
    blankSpace: {
        width: '60%'
    },
    container: {
        flexDirection: 'row',
    }
});

const InvoiceTotal = () =>
{
    return <View style={styles.container}>
        <View style={styles.blankSpace} />
        <View style={styles.root}>
            <TotalElement data={{ field: 'Total HT', value: '8 800,000' }} />
            <TotalElement data={{ field: 'Total TVA 19%', value: '1 672,000' }} backgroundColor='#F8F8F8' />
            <TotalElement data={{ field: 'Total TTC', value: '10 472,000' }} backgroundColor='#E0E0E0' />
        </View>
    </View>
}

export default InvoiceTotal;