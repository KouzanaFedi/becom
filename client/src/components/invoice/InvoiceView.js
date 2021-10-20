import { Document, Page, Text, View, StyleSheet, Image, Font } from "@react-pdf/renderer";
import mulish500 from '../../fonts/mulish-v3-latin-500.ttf';
import mulish700 from '../../fonts/mulish-v3-latin-700.ttf';
import InvoiceTableItem from "./invoicePDF/InvoiceTableItem";
import InvoiceTotal from "./invoicePDF/InvoiceTotal";
import imagePlaceholder from "../../assets/imagePlaceholder.jpg";
import { useEffect, useRef, useState } from "react";

Font.register({
    family: 'mulish',
    fonts: [
        { src: mulish500, fontWeight: 500 },
        { src: mulish700, fontWeight: 700 },
    ]
});

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#fff',
        padding: 25,
        fontFamily: 'mulish'
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    logo: {
        height: 50,
        marginTop: 10,
        marginLeft: 10
    },
    headerData: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        marginBottom: 15
    },
    title: {
        fontSize: 15.6,
        fontWeight: 700
    },
    ref: {
        fontSize: 12,
        fontWeight: 700
    },
    metaData: {
        fontSize: 9.6,
    },
    cibleRoot: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    cibleTitle: {
        fontSize: 9.6,
        marginBottom: 5
    },
    recieverTitle: {
        fontSize: 9.6,
        marginBottom: 5,
        marginLeft: 10
    },
    senderBlocTopBloc: {
        flexDirection: 'column',
        marginBottom: 10
    },
    leftBloc: {
        width: '50%'
    },
    rightBloc: {
        width: '50%'
    },
    senderBloc: {
        backgroundColor: '#E6E6E6',
        fontSize: 10.8,
        marginRight: 10,
        height: 115,
        padding: 8,
        fontWeight: 500
    },
    recieverBloc: {
        fontSize: 10.8,
        marginLeft: 10,
        height: 115,
        border: '1px solid #808080',
        padding: 8,
        fontWeight: 500
    },
    currency: {
        fontSize: 9.6,
        fontWeight: 500,
        marginTop: 9,
        textAlign: 'right'
    },
    container: {
        marginTop: '10px',
        flexDirection: 'row'
    },
    designation: {
        width: '60%',
        fontSize: 10.8,
        borderLeft: '1px solid #808080',
        borderTop: '1px solid #808080',
        borderBottom: '1px solid #808080',
        backgroundColor: '#C0C0C0',
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
        borderTop: '1px solid #808080',
        borderBottom: '1px solid #808080',
        backgroundColor: '#C0C0C0',
    },
    pu: {
        width: '10%',
        fontSize: 10.8,
        textAlign: 'center',
        paddingTop: '2px',
        paddingBottom: '2px',
        borderLeft: '1px solid #808080',
        borderTop: '1px solid #808080',
        borderBottom: '1px solid #808080',
        backgroundColor: '#C0C0C0',
    },
    qte: {
        width: '10%',
        fontSize: 10.8,
        textAlign: 'center',
        paddingTop: '2px',
        paddingBottom: '2px',
        borderLeft: '1px solid #808080',
        borderTop: '1px solid #808080',
        borderBottom: '1px solid #808080',
        backgroundColor: '#C0C0C0',
    },
    total: {
        width: '10%',
        fontSize: 10.8,
        textAlign: 'center',
        paddingTop: '2px',
        paddingBottom: '2px',
        border: '1px solid #808080',
        backgroundColor: '#C0C0C0',
    },
    cachet: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 10
    },
    cachetContainer: {
        flexDirection: 'column',
    },
    cachetText: {
        fontSize: 9,
        textAlign: 'left',
        paddingLeft: 3,
        marginBottom: 2
    },
    cachetArea: {
        width: 250,
        height: 40,
        border: '1.5px solid #808080'
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginLeft: 20,
        marginRight: 20,
        borderTop: '1px solid #808080',
        position: 'absolute',
        width: '100%',
        bottom: 10,
        paddingTop: 10
    },
    footerInfo: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    footerInfoBold: {
        fontSize: 8.4,
        fontWeight: 'bold'
    },
    footerInfoRegular: {
        fontSize: 8.4,
        fontWeight: 500
    }
});


const InvoiceView = ({ invoice, invoiceUI }) =>
{
    const [image, setImage] = useState(imagePlaceholder);
    const ref = useRef(null);
    console.log(invoice);
    useEffect(() =>
    {
        if (invoice?.image !== null) {
            setImage(invoice?.image);
        }
    }, [invoice])

    return <Document >
        <Page size="A4" style={styles.page} >
            <View style={styles.header} fixed >
                <Image ref={ref} src={image} style={styles.logo} />
                <View style={styles.headerData}>
                    <Text style={styles.title}>{invoice?.invoiceType !== undefined ? invoice.invoiceType : "%Invoice title%"}</Text>
                    <Text style={styles.ref}>Réf. : {invoice?.generalInfo?.ref !== undefined ? invoice.generalInfo.ref : "%Ref%"}</Text>
                    <Text style={styles.metaData}>Date : {invoice?.generalInfo?.date !== undefined ? invoice.generalInfo.date : "%date%"}</Text>
                    <Text style={styles.metaData}>Date de fin de validité : {invoice?.generalInfo?.deadline !== undefined ? invoice.generalInfo.deadline : "%deadline%"}</Text>
                    <Text style={styles.metaData}>Code client : {invoice?.generalInfo?.clientCode !== undefined ? invoice.generalInfo.clientCode : "%code client%"}</Text>
                </View>
            </View>
            <View style={styles.cibleRoot} fixed>
                <View style={styles.leftBloc}>
                    <Text style={styles.cibleTitle}>
                        Émetteur:
                    </Text>
                    <View style={styles.senderBloc}>
                        <View style={styles.senderBlocTopBloc}>
                            <Text style={styles.ref}>{invoice?.sender?.entreprise !== undefined ? invoice.sender.entreprise : "%entreprise%"}</Text>
                            <Text >{invoice?.sender?.street !== undefined ? invoice.sender.street : "%street%"}</Text>
                            <Text >{invoice?.sender?.address !== undefined ? invoice.sender.address : "%address%"}</Text>
                        </View>
                        <Text >Tél.: {invoice?.sender?.phone !== undefined ? invoice.sender.phone : "%phone%"}</Text>
                        <Text >Email: {invoice?.sender?.email !== undefined ? invoice.sender.email : "%email%"}</Text>
                        <Text >Web: {invoice?.sender?.web !== undefined ? invoice.sender.web : "%web%"}</Text>
                    </View>
                </View>
                <View style={styles.rightBloc} fixed>
                    <Text style={styles.recieverTitle}>
                        Adressé à:
                    </Text>
                    <View style={styles.recieverBloc}>
                        <Text style={styles.ref}>{invoice?.receiver?.entreprise !== undefined ? invoice.receiver.entreprise : "%entreprise%"}</Text>
                        <Text >{invoice?.receiver?.address !== undefined ? invoice.receiver.address : "%address%"}</Text>
                        <Text >{invoice?.receiver?.city !== undefined ? invoice.receiver.city : "%city%"}</Text>
                        <Text >Matricule fiscal: {invoice?.receiver?.matFis !== undefined ? invoice.receiver.matFis : "%matFis%"}</Text>
                    </View>
                </View>
            </View>
            <Text style={styles.currency} fixed>Montants exprimés en Dinars tunisiens</Text>
            <View style={styles.container} fixed>
                <Text style={styles.designation}>Désignation</Text>
                <Text style={styles.tva}>TVA</Text>
                <Text style={styles.pu}>P.U. HT</Text>
                <Text style={styles.qte}>Qté</Text>
                <Text style={styles.total}>Total HT</Text>
            </View>
            {invoice?.items !== undefined && invoice.items.map((item, key) => <InvoiceTableItem data={item} key={key} lastItem={key === invoice.items.length - 1}
            //|| invoiceUI.breakIndexes.includes(key + 1)} doBreak={invoiceUI.breakIndexes.includes(key) ? true : false}
            />
            )}
            <InvoiceTotal data={invoice?.items} />
            <View style={styles.cachet} wrap={false}>
                <View style={styles.cachetContainer}>
                    <Text style={styles.cachetText}>Cachet, Date, Signature et mention "Bon pour Accord"</Text>
                    <View style={styles.cachetArea} />
                </View>
            </View>
            <View style={styles.footer} fixed>
                <View />
                <View style={styles.footerInfo}>
                    <Text style={styles.footerInfoBold}>Siège social: {invoice?.sender?.entreprise !== undefined ? invoice.sender.entreprise : "%entreprise%"} - {invoice?.sender?.street !== undefined ? invoice.sender.street : "%street%"} - {invoice?.sender?.address !== undefined ? invoice.sender.address : "%address%"}, {invoice?.additionalInfo?.country !== undefined ? invoice.additionalInfo.country : "%country%"}</Text>
                    <Text style={styles.footerInfoBold}>Téléphone: {invoice?.sender?.phone !== undefined ? invoice.sender.phone : "%phone%"} - {invoice?.sender?.web !== undefined ? invoice.sender.web : "%web%"} - {invoice?.sender?.email !== undefined ? invoice.sender.email : "%email%"}</Text>
                    <Text style={styles.footerInfoRegular}>{invoice?.additionalInfo?.entrepriseType !== undefined ? invoice.additionalInfo.entrepriseType : "%entrepriseType%"} - RC: {invoice?.additionalInfo?.rc !== undefined ? invoice.additionalInfo.rc : "%rc%"} - Matricule fiscal: {invoice?.additionalInfo?.matFisc !== undefined ? invoice.additionalInfo.matFisc : "%matFisc%"}</Text>
                </View>
                <Text style={styles.footerInfoRegular} render={({ pageNumber, totalPages }) => (
                    `${pageNumber} / ${totalPages}`
                )} />
            </View>
        </Page>
    </Document>
}

export default InvoiceView;