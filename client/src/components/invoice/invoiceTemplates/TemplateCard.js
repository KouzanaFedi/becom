import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { IMAGE_ENDPOINT } from "../../../config";
import { INTI_INVOICE_TEMPLATE_EDIT_DATA } from "../../../redux/logic/projectManager/invoiceSlice";
import { SET_INVOICE_ADDITIONAL_TAB } from "../../../redux/ui/invoiceUiSlice";

const TemplateCard = ({ classes, setOpen, data }) =>
{
    const dispatch = useDispatch();

    return <Card className={classes.cardRoot}>
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
                            mode: 'edit'
                        }
                    }
                    ));
                }}
                size="small"
                color="primary">
                Edit
            </Button>
            <Button size="small"
                color="primary">
                Delete
            </Button>
        </CardActions>
    </Card>
}

export default TemplateCard;