import { Box, Typography, Paper, Grid, Button } from '@material-ui/core';
import makeStyles from '@material-ui/styles/makeStyles';
import { useEffect, useState } from 'react';
import { GetApp } from '@material-ui/icons';

import Default from '../../../assets/fileicons/default.png';
import Img from '../../../assets/fileicons/img.png';
import Pdf from '../../../assets/fileicons/pdf.png';
import Ppt from '../../../assets/fileicons/ppt.png';
import Txt from '../../../assets/fileicons/txt.png';
import Xls from '../../../assets/fileicons/xls.png';
import { unifySize } from '../../../utils/fileHelper';

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '14px',
        marginBottom: '5px'
    },
    icon: {
        height: '25px',
        marginRight: '10px'
    },
    nameContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    first: {
        textAlign: 'start'
    },
    headers: {
        color: '#999',
        fontWeight: 700,
        fontSize: '14px'
    },
    fixLineHeight: {
        lineHeight: '36px'
    }
}));

const FileCard = ({ name, size }) =>
{
    const classes = useStyles();
    const [icon, setIcon] = useState(Default);
    const [unifyedSize, setUnifyedSize] = useState(size);
    const [type, setType] = useState('File');

    useEffect(() =>
    {
        getIcon(name);
        setUnifyedSize(unifySize(size));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name, size]);

    function getIcon(file)
    {
        const ext = file.split('.').pop().toLowerCase();
        if (["png", "jpeg", "jpg", "gif"].includes(ext)) {
            setIcon(Img);
            setType('Image');
        }
        else if (["txt", "docx", "doc"].includes(ext)) {
            setIcon(Txt);
            setType('Text');
        }
        else if (["ppt", "pptx"].includes(ext)) {
            setIcon(Ppt);
            setType('Presentation');
        }
        else if (["xlsx", "xls"].includes(ext)) {
            setIcon(Xls);
            setType('Spreadsheet');
        }
        else if (ext === 'pdf') {
            setIcon(Pdf);
            setType('PDF');
        }
        else {
            setIcon(Default);
            setType('File');
        }
    }

    return <Paper>
        <Box px={2} py={1} className={classes.root}>
            <Grid container>
                <Grid item xs={2} className={classes.nameContainer}>
                    <img className={classes.icon} src={icon} alt="icon" />
                    <Typography>{name}</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography className={classes.fixLineHeight}>{unifyedSize}</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography className={classes.fixLineHeight}>{type}</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography className={classes.fixLineHeight}>fedi</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography className={classes.fixLineHeight}>24/01/1995</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Button >
                        <GetApp />
                    </Button>
                </Grid>
            </Grid>
        </Box>
    </Paper>
}

export default FileCard;

export const FileHeader = () =>
{
    const classes = useStyles();
    return <Box px={2} pb={1}>
        <Grid container className={classes.headers}>
            <Grid item xs={2} className={classes.first}>
                Name
            </Grid>
            <Grid item xs={2}>
                Size
            </Grid>
            <Grid item xs={2}>
                Type
            </Grid>
            <Grid item xs={2}>
                Added by
            </Grid>
            <Grid item xs={2}>
                Added date
            </Grid>
            <Grid item xs={2}>
                Download
            </Grid>
        </Grid>
    </Box>
}