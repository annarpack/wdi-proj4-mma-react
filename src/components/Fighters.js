import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

class Fighters extends Component {
	constructor(props){
		super(props);

		this.searchFighters = this.searchFighters.bind(this);
	}
	componentDidMount(){
		//this.setState({ date: today_date })
		//this.searchFighters();
	}
	searchFighters(){
		//## search fighters listed in UFC database
		axios.get(`${this.props.url}/fighters/search?auth_token=${this.props.user.token}`).then(response => {
			console.log(response);
			this.setState({
				fighters: response.data.results
			})
		})
	}
	render() {
		return(
      <div className="Fighters">
			<h1> Search for Fighters</h1>
				<div className="search-form">
				</div>

      </div>
		);
	}
}

export default Fighters;
