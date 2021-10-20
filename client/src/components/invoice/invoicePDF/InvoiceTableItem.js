import { Text, View, StyleSheet } from "@react-pdf/renderer"

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    designation: {
        width: '60%',
        fontSize: 10.8,
        borderLeft: '1px solid #808080',
        paddingLeft: '5px',
        paddingTop: '2px',
        paddingBottom: '2px',
    },
    tva: {
        width: '10%',
        fontSize: 10.8,
        textAlign: 'center',
        paddingTop: '2px',
        paddingBottom: '2px',
        borderLeft: '1px solid #808080',
    },
    pu: {
        width: '10%',
        fontSize: 10.8,
        textAlign: 'center',
        paddingTop: '2px',
        paddingBottom: '2px',
        borderLeft: '1px solid #808080',
    },
    qte: {
        width: '10%',
        fontSize: 10.8,
        textAlign: 'center',
        paddingTop: '2px',
        paddingBottom: '2px',
        borderLeft: '1px solid #808080',
    },
    total: {
        width: '10%',
        fontSize: 10.8,
        textAlign: 'center',
        paddingTop: '2px',
        paddingBottom: '2px',
        borderLeft: '1px solid #808080',
        borderRight: '1px solid #808080',
    }
});

const InvoiceTableItem = ({ data, doBreak, lastItem }) =>
{
    const dottedStyle = '2px dotted #808080';
    const solidStyle = '1px solid #808080';
    console.log(data.pu);
    console.log(data.quantity);
    return <View break={doBreak} style={styles.container} >
        < Text style={[styles.designation, { borderBottom: lastItem ? solidStyle : dottedStyle }]} > {data.designtion}</Text >
        <Text style={[styles.tva, { borderBottom: lastItem ? solidStyle : dottedStyle }]}>{data.tva}</Text>
        <Text style={[styles.pu, { borderBottom: lastItem ? solidStyle : dottedStyle }]}>{data.pu}</Text>
        <Text style={[styles.qte, { borderBottom: lastItem ? solidStyle : dottedStyle }]}>{data.quantity}</Text>
        <Text style={[styles.total, { borderBottom: lastItem ? solidStyle : dottedStyle }]}>{(data.pu || 0) * (data.quantity || 0)}</Text>
    </View >
};

export default InvoiceTableItem;