import { useMutation } from "@apollo/client";
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, CircularProgress, Dialog, DialogActions, DialogContent, Typography } from "@material-ui/core";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { DELETE_INVOICE_TEMPLATES } from "../../../api/invoice";
import { IMAGE_ENDPOINT } from "../../../config";
import { DELETE_INVOICE_TEMPLATE_EDIT_DATA, INTI_INVOICE_TEMPLATE_EDIT_DATA } from "../../../redux/logic/projectManager/invoiceSlice";
import { SET_INVOICE_ADDITIONAL_TAB } from "../../../redux/ui/invoiceUiSlice";
import ThemedButton from "../../themedComponents/ThemedButton";

const TemplateCard = ({ classes, setOpen, data }) =>
{
    const dispatch = useDispatch();
    const [deleteDial, setDeleteDial] = useState(false);

    const [deleteInvoiceTemplateQuery, { loading }] = useMutation(DELETE_INVOICE_TEMPLATES, {
        onCompleted: ({ deleteInvoiceTemplate }) =>
        {
            console.log(deleteInvoiceTemplate);
            dispatch(DELETE_INVOICE_TEMPLATE_EDIT_DATA({ id: data.id }));
        }
    });
    return <><Card className={classes.cardRoot}>
        <CardActionArea >
            <CardMedia
                onClick={() => { setOpen(); }}
                component="img"
                src={`${IMAGE_ENDPOINT}${data.image}`}
                height="100px"
                className={classes.cardMedia}
            />
            <CardContent>
                {data.templateName}
                <Typography variant="body2" color="textSecondary" >
                    Created at: {data.createdAt}
                </Typography>
            </CardContent>
        </CardActionArea>
        <CardActions>
            <Button
                onClick={() =>
                {
                    dispatch(INTI_INVOICE_TEMPLATE_EDIT_DATA({ templateId: data.id }));
                    dispatch(SET_INVOICE_ADDITIONAL_TAB({
                        additionalTab: 'template_edit',
                        data: {
                            mode: 'edit',
                            id: data.id
                        }
                    }
                    ));
                }}
                size="small"
                color="primary">
                Edit
            </Button>
            <Button size="small"
                color="primary"
                onClick={() =>
                {
                    setDeleteDial(true);
                }}>
                Delete
            </Button>
        </CardActions>
    </Card>
        <Dialog open={deleteDial} onClose={() => { setDeleteDial(false) }}>
            <DialogContent>
                Deleting <strong>{data.templateName}</strong> is irreversible.
                Are you sure to proceed?
            </DialogContent>
            <DialogActions>
                <ThemedButton
                    variant="outlined"
                    buttonStyle={{ type: 'secondary' }}
                    fullWidth={false}
                    type="submit"
                    onClick={() =>
                    {
                        deleteInvoiceTemplateQuery({ variables: { id: data.id } });
                        if (!loading) {
                            setDeleteDial(false);
                            dispatch(SET_INVOICE_ADDITIONAL_TAB({
                                additionalTab: null,
                                data: null
                            }));
                        }

                    }}>
                    {loading ? <CircularProgress color="secondary"
                        size={24} /> : 'Delete'}
                </ThemedButton>
            </DialogActions>
        </Dialog>
    </>
}

export default TemplateCard;