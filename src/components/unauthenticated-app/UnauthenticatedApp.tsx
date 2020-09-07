import React from "react";
import {Switch, Route} from "react-router";
import Registration from "../registration/Registration";
import Login from "../login/Login";
import ForgotMyPassword from "../forgot-my-password/ForgotMyPassword";
import ResetPassword from "../forgot-my-password/ResetPassword";

export const UnauthenticatedApp = () => {
	return (
		<>
			<Switch>
				<Route path="/register" component={Registration} />
				<Route path="/login" component={Login} />
				<Route path="/forgot-my-password" component={ForgotMyPassword} />
				<Route path="/reset-password/:resetToken" component={ResetPassword} />
				<Route path="/" component={Login} />
			</Switch>
		</>
	);
};
