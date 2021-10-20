import { StyleSheet, View } from "@react-pdf/renderer"
import { useEffect, useState } from "react";
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

const InvoiceTotal = ({ data }) =>
{
    const [totals, setTotals] = useState({
        ht: 0,
        tva: 0,
        ttc: 0
    });
    useEffect(() =>
    {
        if (data) {
            const ht = data.reduce((acc, curr) => acc + ((curr.pu || 0) * (curr.quantity || 0)), 0);
            const tva = data.reduce((acc, curr) => acc + (((curr.pu || 0) * (curr.quantity || 0)) * (curr.tva / 100)), 0);
            setTotals({
                ht,
                tva,
                ttc: tva + ht
            });
        }
    }, [data]);

    return <View style={styles.container}>
        <View style={styles.blankSpace} />
        <View style={styles.root}>
            <TotalElement data={{ field: 'Total HT', value: `${totals.ht}` }} />
            <TotalElement data={{ field: 'Total TVA', value: `${totals.tva}` }} backgroundColor='#F8F8F8' />
            <TotalElement data={{ field: 'Total TTC', value: `${totals.ttc}` }} backgroundColor='#E0E0E0' />
        </View>
    </View>
}

export default InvoiceTotal;