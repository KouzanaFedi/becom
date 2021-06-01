import { Box } from "@material-ui/core"
import { useSelector } from "react-redux";
import { scheduleDisplayCalendarForm } from "../../../../redux/logic/projectManager/scheduleSlice";
import CreateSharedLinkForm from "./CreateSharedLinkForm";
import DisplaySharedLink from "./DisplaySharedLink";

const RightDialComponent = () =>
{
    const displayCalendarForm = useSelector(scheduleDisplayCalendarForm);
    
    return <Box pl={4}>
        {displayCalendarForm === 'edit' ? <DisplaySharedLink /> : <CreateSharedLinkForm />}
    </Box>
}

export default RightDialComponent;