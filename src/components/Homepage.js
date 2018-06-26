import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import NavBar from './NavBar.js';
import FightCards from './FightCards.js';
import FightsSaved from './FightsSaved.js';
import FightersSearch from './FightersSearch.js';
import FightersSaved from './FightersSaved.js';
import SingleFighter from './SingleFighter.js';


class Homepage extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
  render() {
    return(
      <div className="content">
        <NavBar logout={this.props.logout} />
				<div className="container">
	        <Switch>
	          <Route exact path="/"
	            render={() => <Redirect to="/fight_cards" />}
	          />
	          <Route exact path="/fight_cards" render={props => (
	            <FightCards {...props} {...this.props} />
	          )} />
	          <Route exact path="/fights_saved" render={props => (
	            <FightsSaved {...props} {...this.props} />
	          )} />
	          <Route exact path="/fighters" render={props => (
	            <FightersSearch {...props} {...this.props} />
	          )} />
						<Route exact path="/fighters/:name" render={props => (
							<SingleFighter {...props} {...this.props} />
						)} />
						<Route exact path="/fighters_saved" render={props => (
							<FightersSaved {...props} {...this.props} />
						)} />
	          </Switch>
					</div>
      </div>
    )
  }
}
export default Homepage;
