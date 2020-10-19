import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import App from "./App";
import store from "./store";
import {Route} from "react-router-dom";
import {Router} from "react-router";
import "dotenv/config";
import history from "./history";
import {History} from "history";

ReactDOM.render(
	<Provider store={store}>
		<Router history={history as History<History.UnknownFacade>}>
			<Route path="/" component={App} />
		</Router>
	</Provider>,
	document.getElementById("root")
);
