import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Squad from '../components/authenticated/squad/squads';
import Sprint from '../components/authenticated/sprints/sprints';

const AppRouter = () => {
    return (
        <Switch>
            <Route exact path="/" component={Squad} />
            <Route path="/squads" component={Squad} />
            <Route path="/sprints" component={Sprint} />
        </Switch>
    )
}
export default AppRouter;