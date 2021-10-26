import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Inicio } from "./pages/inicio";
import { Login } from "./pages/login";
import { PersonalData } from "./pages/personalData";
import { Homepage } from "./pages/homepage";
import { Profile } from "./pages/profile";
import { Info } from "./pages/info";
import { Plans } from "./pages/plans";
import { Awards } from "./pages/awards";
import { PersonalPlan } from "./pages/personalPlan";
import { Time } from "./pages/time";
import { Exercise } from "./pages/exercise";
import { Booking } from "./pages/booking";
import { Customize } from "./pages/customize";
import injectContext from "./store/appContext";
import { Navbars } from "./component/navbars";
import { Footer } from "./component/footer";
import { PlanConfirmation } from "./pages/planConfirmation";

//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	return (
		<div className="h-100">
			<BrowserRouter basename={basename}>
				<ScrollToTop>
					<Navbars />
					<Switch>
						<Route exact path="/">
							<Inicio />
						</Route>
						<Route exact path="/login">
							<Login />
						</Route>
						<Route exact path="/personal-data">
							<PersonalData />
						</Route>
						<Route exact path="/homepage">
							<Homepage />
						</Route>
						<Route exact path="/profile">
							<Profile />
						</Route>
						<Route exact path="/info">
							<Info />
						</Route>
						<Route exact path="/plans">
							<Plans />
						</Route>
						<Route exact path="/planConfirmation">
							<PlanConfirmation />
						</Route>
						<Route exact path="/awards">
							<Awards />
						</Route>
						<Route exact path="/personal-plan">
							<PersonalPlan />
						</Route>
						<Route exact path="/time">
							<Time />
						</Route>
						<Route path="/exercise/:id">
							<Exercise />
						</Route>
						<Route exact path="/booking">
							<Booking />
						</Route>
						<Route exact path="/customize">
							<Customize />
						</Route>
						<Route>
							<h1>Not found!</h1>
						</Route>
					</Switch>
					<Footer />
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
