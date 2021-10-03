import moment from "moment";

export function parseTime(timestamp)
{
    return moment(parseInt(timestamp)).format("D MMM, HH:mm");
}

export function parseTimeTimePicker(timestamp)
{
    console.log(timestamp);
    return moment(new Date(parseInt(timestamp))).format("MM/DD/yyyy hh:mm");
}