import moment from "moment";

export function parseTime(timestamp)
{
    return moment(parseInt(timestamp)).format("D MMM, HH:mm");
}

export function parseTimeTimePicker(timestamp)
{
    return moment(new Date(parseInt(timestamp))).format("MM/DD/yyyy hh:mm");
}

export const fullCalendarDateFormat = (date) =>
{
    return moment(new Date(parseInt(date))).format("yyyy-MM-DD hh:mm");
}

export function parseDateTimePicker(timestamp)
{
    return moment(new Date(parseInt(timestamp))).format("MM/DD/yyyy");
}
