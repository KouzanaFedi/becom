import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TablePagination, TableRow } from '@material-ui/core';
import makeStyles from '@material-ui/styles/makeStyles';
import FilePreview from './FilePreview';
import { parseTime } from '../../../../utils/timeParser';



const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        paddingLeft: '5px',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
    noBorderBottom: {
        borderBottom: 'unset',
        width: '50%'
    }
}));

const FileTable = ({ data, serviceId, coverImage, taskId }) =>
{
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(3);
    const [rows, setRows] = useState([]);

    const displayChunk = (arr) =>
    {
        let newArr = [];
        for (let i = 0; i < arr.length; i += 2) {
            newArr.push(arr.slice(i, i + 2));
        }
        return newArr
    }

    // const rows = displayChunk(data);

    function createData(name, size, date, by, link, id)
    {
        return { name, size, date, by, link, id };
    }

    useEffect(() =>
    {
        const rowsData = [];
        data.forEach((attach) =>
        {
            const attachName = attach.src.split('/').pop();
            rowsData.push(createData(attachName, attach.size, parseTime(attach.createdAt), attach.addedBy, attach.src, attach._id))
        });
        setRows(displayChunk(rowsData));
    }, [data])

    const handleChangePage = (_, newPage) =>
    {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) =>
    {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div className={classes.root}>
            <TableContainer>
                <Table
                    className={classes.table}
                    aria-labelledby="tableTitle"
                    size='small'
                    aria-label="enhanced table"
                >
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) =>
                            (
                                <TableRow
                                    tabIndex={-1}
                                    key={index}
                                >
                                    <TableCell classes={{ root: classes.noBorderBottom }} scope="row" padding="none">
                                        <FilePreview link={row[0].link} name={row[0].name} addDate={row[0].date} by={row[0].by} size={row[0].size} serviceId={serviceId} coverImage={coverImage} taskId={taskId} id={row[0].id} />
                                    </TableCell>
                                    {row[1] && <TableCell classes={{ root: classes.noBorderBottom }} scope="row" padding="none">
                                        <FilePreview link={row[1].link} name={row[1].name} addDate={row[1].date} by={row[1].by} size={row[1].size} serviceId={serviceId} coverImage={coverImage} taskId={taskId} id={row[1].id} />
                                    </TableCell>}
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[3, 6, 15]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
    );
}

export default FileTable;