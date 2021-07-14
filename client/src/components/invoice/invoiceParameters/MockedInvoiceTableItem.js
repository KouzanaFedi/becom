import { makeStyles } from "@material-ui/core";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { ADD_ITEM_HEIGHT } from "../../../redux/ui/invoiceUiSlice";

const useStyles = makeStyles(() => ({
    root: {
        marginRight: '25px',
        marginLeft: '25px',
        display: 'flex',
        flexDirection: 'row',
        position: 'absolute',
        top: 0,
    },
    designation: {
        width: '60%',
        fontSize: 10.8,
        whiteSpace: 'normal',
        textAlign: 'left',
        borderLeft: '1px solid #808080',
        borderBottom: '2px dotted #808080',
        paddingLeft: '5px',
        paddingTop: '2px',
        paddingBottom: '2px',
    },
    tva: {
        width: '10%',
        fontSize: 10.8,
        borderLeft: '1px solid #808080',
        borderBottom: '2px dotted #808080',
        paddingLeft: '5px',
        paddingTop: '2px',
        paddingBottom: '2px',
        paddingRight: '25px',

    },
    pu: {
        width: '10%',
        fontSize: 10.8,
        borderLeft: '1px solid #808080',
        borderBottom: '2px dotted #808080',
        paddingLeft: '5px',
        paddingTop: '2px',
        paddingBottom: '2px',
        paddingRight: '25px',

    },
    quantity: {
        width: '10%',
        fontSize: 10.8,
        borderLeft: '1px solid #808080',
        borderBottom: '2px dotted #808080',
        paddingLeft: '5px',
        paddingTop: '2px',
        paddingBottom: '2px',
        paddingRight: '25px',

    },
    total: {
        width: '10%',
        fontSize: 10.8,
        borderLeft: '1px solid #808080',
        borderBottom: '2px dotted #808080',
        paddingLeft: '5px',
        paddingTop: '2px',
        paddingBottom: '2px',
        paddingRight: '25px',

    }
}));

const MockedInvoiceTableItem = ({ data, index, esm }) =>
{
    const ref = useRef(null);
    const classes = useStyles();
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(true);

    useEffect(() =>
    {
        ref.current.innerHTML = data.designtion.replace(/(?:\r\n|\r|\n)/g, '<br>');
        console.log('calculating ' + index);
        dispatch(ADD_ITEM_HEIGHT({ height: ref.current.clientHeight, index: index }));
        setVisible(false);
        esm(index);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, index]);

    return visible ? <div className={classes.root}>
        <div ref={ref} className={classes.designation}>
        </div>
        <div className={classes.tva}>
            {data.tva}
        </div>
        <div className={classes.pu}>
            {data.pu}
        </div>
        <div className={classes.quantity}>
            {data.quantity}
        </div>
        <div className={classes.total}>
            {data.total}
        </div>
    </div> : <></>
}

export default MockedInvoiceTableItem;