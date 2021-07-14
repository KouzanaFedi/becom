import { useEffect, useState } from "react";
import MockedInvoiceTableItem from "./invoiceParameters/MockedInvoiceTableItem";

const ItemsMock = ({ invoice, update }) =>
{
    const [updated, setUpdated] = useState(0);

    useEffect(() =>
    {
        if (invoice.items !== undefined && updated === invoice.items.length - 1) update();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updated]);

    const esm = (ind) =>
    {
        setUpdated(ind);
    }

    return <>
        {invoice.items !== undefined && invoice.items.map((item, key) =>
        {
            return <MockedInvoiceTableItem data={item} key={key} index={key} esm={esm} />
        })}
    </>
};
export default ItemsMock;