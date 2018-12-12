import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Fighters extends Component {
	constructor(props){
		super(props);
		this.state = {
			fighter: [],
			fighters: [],
			fighterValue: [],
			queryValue: '',
			searchResults: []
		}

		this.searchFighters = this.searchFighters.bind(this);
		this.updateInput = this.updateInput.bind(this);
		this.handleQueryChange = this.handleQueryChange.bind(this);
		this.searchQueryValue = this.searchQueryValue.bind(this);
		this.onFighterClick = this.onFighterClick.bind(this);
	}
	componentDidMount(){
		//this.setState({ date: today_date })

	}
	searchFighters(){
		//## take inputed parmas and search for a UFC fighter
		axios.get(`${this.props.url}/fighters/search?auth_token=${this.props.user.token}`).then(response => {
			this.setState({
				fighters: response.data
			})
		})
	}
	searchQueryValue(query){
		if(query.length === 0) {
			//## if the search bar includes nothing, reset search
			this.setState({ searchResults: [] });
		} else {
			//## take inputed parmas and search for UFC fighter
			axios.get(`${this.props.url}/fighters/results?auth_token=${this.props.user.token}&search=${query}`).then(response => {
				this.setState({
					searchResults: response.data.results
				})
			})
		}
	}
	updateInput(value){
		//## updated seach input
		this.setState({ queryValue: value });
	}
	handleQueryChange(e){
		e.preventDefault();
		//## set the current state to include the serach results
		this.setState({ queryValue: e.target.value });
		this.searchQueryValue(e.target.value);
	}
	onSubmit(e) {
		//## when the submit button is pressed
		e.preventDefault();
    this.searchQueryValue(this.state.queryValue);
	}
	onFighterClick(f) {
		this.setState({ fighter: f });
	}
	render() {
		return(
      <div className='search-form'>
			<h1> Search for Fighters</h1>
				<form className='search-form' >
					<input className='search' type='search' placeholder='search for a fighter'
						value={this.state.queryValue} onChange={this.handleQueryChange} />
					<input type='submit' value='Search' />
						<div className='fighter-search-results'>
						<ul className='search-list'>
					{this.state.searchResults.map((f, i) =>
						<li className='list-item' key={i} ><Link to={{
							pathname: `fighters/${f.first_name}-${f.last_name}`,
						 	query: f }} >
							{f.full_name}
							</Link></li>
					)}
							</ul>
							</div>
				</form>

      </div>
		);
	}
}

export default Fighters;
