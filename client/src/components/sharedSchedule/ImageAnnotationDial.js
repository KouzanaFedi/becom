import { Dialog } from "@material-ui/core";
import ImageAnnotation from "../annotation/ImageAnnotation";

const ImageAnnotationDial = ({ onClose, open, image, annotations }) =>
{
    return <Dialog
        maxWidth='lg'
        fullWidth
        onClose={onClose}
        open={open} >
        <ImageAnnotation
            image={image}
            annotations={annotations} />
    </Dialog>
}

export default ImageAnnotationDial;