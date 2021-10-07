import { Box, CircularProgress, Grid, IconButton, Typography } from "@material-ui/core";
import makeStyles from '@material-ui/styles/makeStyles';
import { useEffect, useMemo, useState } from "react";
import { CLIENT_ADDRESS } from "../../../../config";
import { Check, Add } from "@material-ui/icons";
import CopyToClipboard from "react-copy-to-clipboard";
import CibleForm from "./CibleForm";
import { ADD_SHARED_LINK, DELETE_SCHEDULE_LINK } from "../../../../redux/logic/projectManager/scheduleSlice";
import { useDispatch } from "react-redux";
import { useMutation } from "@apollo/client";
import { CREATE_SHARED_CALENDAR, DELETE_SHARED_LINK } from "../../../../api/events";
import ThemedButton from "../../../themedComponents/ThemedButton";
import ThemedTextField from "../../../themedComponents/ThemedTextField";
import { DateTimePicker } from "@material-ui/lab";
import { parseTimeTimePicker } from "../../../../utils/timeParser";
import { useForm } from "react-hook-form";

const useStyles = makeStyles((theme) => (
    {
        labels: {
            color: 'grey',
            fontWeight: 'bold'
        },
        cardStyle: {
            width: '100%',
            borderRadius: '4px',
            border: '1px solid rgba(0, 0, 0, 0.12)',
            height: '30px',
            padding: '0 14px',
            lineHeight: '30px',
            overflowX: 'scroll',
            overflowY: 'hidden',
            whiteSpace: 'nowrap',
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': {
                width: 0,
                height: 0
            }
        },
        customCard: {
            borderColor: '#ba000d',
            backgroundColor: '#ba000d32',
            fontSize: '10px',
            height: '40px',
        },
        addUserBtn: {
            fontWeight: 'bold',
            color: 'rgba(123,33,125,1)'
        },
        titles: {
            fontWeight: 'bold',

        },
        content: {
            height: 'calc(100vh - 116px)',
            overflowY: 'auto',
        }
    }));

const DisplaySharedLink = ({ data, mode, setScheduleShareData, setMode, openBackDropOpen, closeBackDropOpen }) =>
{

    const classes = useStyles();
    const dispatch = useDispatch();
    const [time, setTime] = useState({
        start: `${new Date().getTime()}`,
        end: `${new Date().getTime()}`
    });

    const [cibleData, setCibleData] = useState([]);

    const { register, formState: { errors }, reset, handleSubmit } = useForm({
        defaultValues: useMemo(() =>
        {
            return { name: data.name }
        }, [data]),
    });

    useEffect(() =>
    {
        setTime({ start: data.start, end: data.end });
        reset({ name: data.name });
        setCibleData(data.cible);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    const [copied, setCopied] = useState(false);
    const link = `${CLIENT_ADDRESS}/shared_schedule/${data.token && data.token}`;

    const copiedStyle = copied ? {
        color: '#3CA374',
        borderColor: '#3CA374',
        fontWeight: 'bold',
        backgroundColor: '#3CA37432',
    } : {};

    const [deleteShared, { loading }] = useMutation(DELETE_SHARED_LINK, {
        onCompleted: (_) =>
        {
            dispatch(DELETE_SCHEDULE_LINK({ id: data._id }));
            setMode(null);
            setScheduleShareData(null);
            closeBackDropOpen()
        }
    });

    const [createSharedLink] = useMutation(CREATE_SHARED_CALENDAR, {
        onCompleted: ({ generateScheduleLink }) =>
        {
            dispatch(ADD_SHARED_LINK({ shared: generateScheduleLink }));
            setScheduleShareData(generateScheduleLink);
            setMode('edit');
            closeBackDropOpen();
        }
    });

    function submitCreate({ name })
    {
        openBackDropOpen();
        createSharedLink({
            variables: {
                projectId: data.projectId,
                name,
                start: `${time.start}`,
                end: `${time.end}`
            }
        })
    }

    return <Box >
        <Grid container className={classes.content} display="flex" alignContent="flex-start" rowGap="15px">
            <Grid item xs={12}>
                <Typography className={classes.labels}>Shareabl schedule name</Typography>
                <form id="createForm" onSubmit={handleSubmit(submitCreate)}>
                    <ThemedTextField
                        inputProps={register('name', { minLength: { value: 3, message: "At least 3 characters." }, required: true })}
                        backgroundColor='#EfE'
                        error={errors?.name !== undefined}
                        helperText={errors?.name !== undefined && errors.name.message}
                        fullWidth
                    />
                </form>
            </Grid>

            {mode === "edit" && <Grid container display="flex" justifyContent="space-between">
                <Grid item xs={12}>
                    <Typography className={classes.labels}>Link</Typography>
                </Grid>
                <Grid item xs={10}>
                    <ThemedTextField
                        value={link}
                        disabled
                        fullWidth
                    />
                </Grid>
                <Grid item xs={2} display="flex" justifyContent="flex-end">
                    <CopyToClipboard text={link} onCopy={(_, res) =>
                    {
                        if (res) {
                            setCopied(true);
                        }
                    }}>
                        <ThemedButton
                            variant="outlined"
                            buttonStyle={{ type: 'secondary' }}
                            fullWidth={false}
                            style={copiedStyle}
                            onClick={() =>
                            {
                            }}>
                            {!copied ? "Copy" : <Check />}
                        </ThemedButton>
                    </CopyToClipboard>
                </Grid>
            </Grid>}

            <Grid container item xs={12} display="flex" columnGap="10px" alignItems="center">
                <Grid xs={1}>
                    <Typography className={classes.labels}>Start</Typography>
                </Grid>
                <Grid xs={5}>
                    <DateTimePicker
                        inputFormat="MM/DD/yyyy HH:mm"
                        id="date"
                        ampm={false}
                        disabled={false}
                        value={parseTimeTimePicker(time?.start)}
                        renderInput={(props) => <ThemedTextField
                            label="start"
                            backgroundColor='#EfE'
                            {...props} />}
                        onChange={(value) =>
                        {
                            setTime({ ...time, start: new Date(value).getTime() });
                        }}
                    />
                </Grid>
            </Grid>
            <Grid container item xs={12} display="flex" columnGap="10px" alignItems="center">
                <Grid xs={1}>
                    <Typography className={classes.labels}>End</Typography>
                </Grid>
                <Grid xs={5}>
                    <DateTimePicker
                        inputFormat="MM/DD/yyyy HH:mm"
                        id="date"
                        ampm={false}
                        disabled={false}
                        value={parseTimeTimePicker(time?.end)}
                        renderInput={(props) => <ThemedTextField
                            label="start"
                            backgroundColor='#EfE'
                            {...props} />}
                        onChange={(value) =>
                        {
                            setTime({ ...time, end: new Date(value).getTime() });
                        }}
                    />
                </Grid>
            </Grid>
            {mode === "edit" && <Grid item xs={12}>
                <Typography className={classes.labels}>Users</Typography>

                {cibleData.map((c) => <CibleForm
                    key={c._id}
                    data={c}
                    edit={c.edit}
                    openBackDropOpen={openBackDropOpen}
                    closeBackDropOpen={closeBackDropOpen}
                    sharedId={data._id}
                    updateDate={(oldId, newId, email, name) =>
                    {
                        const index = cibleData.findIndex(cib => cib._id === oldId);
                        const updatedData = [...cibleData];
                        updatedData[index] = { _id: newId, email, name, edit: true }
                        setCibleData(updatedData);
                    }}
                    deleteFromData={(id) => setCibleData(cibleData.filter(cib => cib._id !== id))}
                />)}

                {!(cibleData.length < 4 && cibleData.some(c => c.edit === false)) && <Box ml={1} mt={1}>
                    <IconButton
                        onClick={() =>
                        {
                            setCibleData([...cibleData, { _id: `${new Date().getTime()}`, email: "", name: "", edit: false, token: "" }]);
                        }}
                        size="small">
                        <Add />
                    </IconButton>
                </Box>}
            </Grid>}
        </Grid>
        <Box display="flex" justifyContent="space-between">
            {mode === "edit" ? <ThemedButton
                variant="outlined"
                buttonStyle={{ type: 'denied' }}
                fullWidth={false}
                onClick={() =>
                {
                    openBackDropOpen();
                    deleteShared({
                        variables: {
                            id: data._id
                        }
                    });
                }}           >
                {loading ? <CircularProgress color="secondary"
                    size={24} /> : 'Delete'}
            </ThemedButton> :
                <ThemedButton
                    variant="outlined"
                    type="submit"
                    form="createForm"
                    buttonStyle={{ type: 'primary' }}
                    fullWidth={false}
                >
                    Create
                </ThemedButton>
            }
        </Box>
    </Box >
}

export default DisplaySharedLink;