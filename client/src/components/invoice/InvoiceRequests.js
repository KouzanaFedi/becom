import { Box, Grid, Paper, Typography } from "@material-ui/core";
import { useState, useEffect } from "react";

import makeStyles from '@material-ui/styles/makeStyles';
import InvoiceRequestGroup from "./invoiceRequests/InvoiceRequestGroup";
import InvoiceCreate from "./invoiceRequests/InvoiceCreate";

const useStyles = makeStyles(() => ({
    fixOverflow: {
        overflowY: 'auto',
        height: 'calc(100vh - 56px)',
        margin: '4px 0',
        paddingTop: '16px',
        width: "100%",
    },
    title: {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#000',
        marginBottom: '24px'
    }
}));

const InvoiceRequests = () =>
{
    const classes = useStyles();
    const [createInv, setCreateInv] = useState(null);
    const [createInvData, setCreateInvData] = useState(null);

    const [invoiceRequests, setInvoiceRequests] = useState([
        {
            _id: "123456",
            title: "Creation de spot video",
            description: 'La creation de spot video',
            createdAt: new Date().getTime(),
            entreprise: "SOTUDIS",
            address: "Parc industriel de Ben Arous GP1 , KM 5,5 BP 211-2013",
            city: "Ben Arous",
            matFisc: "856180B/A/M/000",
            client: {
                _id: "456789",
                name: "Client 1",
            },
            items: [{
                _id: "78985",
                text: "Creation et montage de spot video",
                type: {
                    _id: "198154",
                    name: "video",
                    description: "Nisi excepteur proident incididunt incididunt ipsum ex Lorem dolor aliquip cupidatat dolor culpa irure.",

                }
            },
                // {
                //     _id: "7836985",
                //     text: "Do duis commodo qui nulla ea incididunt laboris ad sit nostrud. Do cillum fugiat voluptate qui tempor nulla amet laboris. Amet sint sit excepteur qui dolor magna velit.",
                //     type: {
                //         _id: "199458464",
                //         name: "Id nisi enim do consectetur Lorem anim nulla ad sit velit commodo.",
                //         description: "Minim amet consectetur Lorem dolor laborum aliquip exercitation in officia incididunt. Esse qui voluptate quis duis nisi cupidatat proident amet dolore do nisi incididunt cupidatat sit.",

                //     }
                // },
                // {
                //     _id: "78973785",
                //     text: "Laborum magna duis veniam aliqua ipsum aute consequat eu elit. Commodo culpa cillum tempor nostrud duis duis quis. Proident tempor occaecat aliquip aute nisi ut aute occaecat. Irure ex culpa enim minim amet cupidatat voluptate mollit nulla aliqua commodo deserunt minim.",
                //     type: {
                //         _id: "19958rr464",
                //         name: "Id nisi enim do consectetur Lorem anim nulla ad sit velit commodo.",
                //         description: "Amet labore quis ipsum excepteur esse laborum elit excepteur nulla commodo. Sunt sunt fugiat cillum mollit voluptate minim consequat adipisicing officia irure cillum laborum ex ipsum. Cillum pariatur consequat deserunt qui velit enim.",
                //     }
                // },
            ]
        },
        {
            _id: "12324456",
            createdAt: new Date().getTime(),
            title: "Aliquip nisi quis aliquip ipsum magna ullamco et sunt.",
            description: 'Aliqua sit fugiat nisi enim ipsum velit dolor ipsum proident ut reprehenderit ex. Irure cupidatat mollit deserunt sint ut ad mollit irure culpa irure culpa elit labore in. Eiusmod qui incididunt laboris minim consectetur labore proident sunt eu dolor enim et.',
            entreprise: "SOTUDIS",
            address: "Parc industriel de Ben Arous GP1 , KM 5,5 BP 211-2013",
            city: "Ben Arous",
            matFisc: "856180B/A/M/000",
            client: {
                _id: "45625789",
                name: "Client 2",
            },
            items: [{
                _id: "37834",
                text: "Ipsum minim eiusmod duis dolor quis eu deserunt qui. Dolor officia tempor non minim veniam pariatur exercitation commodo deserunt ut consequat quis duis. Sunt commodo eu sint elit et dolor esse incididunt ex. Tempor do qui eu elit id anim et voluptate eiusmod deserunt.",
                type: null,
            },
            {
                _id: "933438",
                text: "Ullamco adipisicing quis ad adipisicing sunt Lorem. Laborum incididunt cillum veniam ipsum officia dolore occaecat est ea labore voluptate. Pariatur est enim Lorem incididunt enim elit laborum sint aliquip excepteur.",
                type: {
                    _id: "198154",
                    name: "Sint et minim voluptate excepteur labore duis quis.",
                    description: "Nisi excepteur proident incididunt incididunt ipsum ex Lorem dolor aliquip cupidatat dolor culpa irure.",

                }
            },
            ]
        }
    ]);

    useEffect(() =>
    {
        setCreateInvData(invoiceRequests.find(a => a._id === createInv
        ));
    }, [createInv, invoiceRequests]);

    return <>
        <Grid item container xs={5} className={classes.root} display="flex" flexDirection="column" rowGap="15px" >
            <Box my={0.5} >
                <Paper className={classes.fixOverflow} elevation={4}>
                    <Grid item xs={12}>
                        <Typography className={classes.title}>Invoice requests </Typography>
                    </Grid>
                    <Grid item xs={12} display="flex" flexDirection="column" rowGap="15px">
                        {invoiceRequests.map((req) =>
                        {
                            if (createInv && createInvData) {
                                return req._id === createInv && <Box
                                    px={2}
                                    mb={2}
                                    key={req._id}>
                                    <InvoiceRequestGroup
                                        fullScreen
                                        setCreateInv={(inv) => setCreateInv(inv)}
                                        data={req} />
                                </Box>

                            } else
                                return <Box
                                    px={2}
                                    key={req._id}>
                                    <InvoiceRequestGroup
                                        fullScreen={false}
                                        setCreateInv={(inv) => setCreateInv(inv)}
                                        data={req} />
                                </Box>
                        })}
                    </Grid>
                </Paper>
            </Box>
        </Grid>
        {createInvData && <InvoiceCreate data={createInvData} />}
    </>
}

export default InvoiceRequests;