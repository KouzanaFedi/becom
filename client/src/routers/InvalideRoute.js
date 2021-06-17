import { Redirect, Route } from "react-router-dom"

const InvalideRoute = () =>
{
    return <Route render={() => <Redirect to={{ pathname: "/404" }} />} />
}

export default InvalideRoute;