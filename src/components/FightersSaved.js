import React, { Component } from "react";
import axios from 'axios';
import Fighter from './Fighter.js';

class FightersSaved extends Component {
	constructor(props){
		super(props);
		this.state = {
			fighters: []
		}
		this.getFighters = this.getFighters.bind(this);
		this.fighterDelete = this.fighterDelete.bind(this);
		this.messagePrint = this.messagePrint.bind(this);
	}
	componentDidMount(){
		this.getFighters();
		window.setTimeout( () => {}, 100)
	}
	getFighters(){
		let fightersArr = [];
		axios.get(`${this.props.url}/fighters_saves?auth_token=${this.props.user.token}`).then(response => {
			let item = response.data.fighters.map(f => {
				return Array.of(f)
			})
			this.setState({ fighters: item })
			//fightersArr.push(item)
			}).catch(error => { console.log(error) });
			//console.log('fightersArr', fightersArr)
			//this.setState({ fighters: fightersArr })
	}
	fighterDelete(e) {
		const id = e.target.getAttribute('id');
		axios.delete(`${this.props.url}/fighters_saves/${id}?auth_token=${this.props.user.token}`).then(response => {
			const res = response.data.response;
			if(res === 'deleted') { window.location.reload(); }
		}).catch(error => { console.log(error) })
	}
	messagePrint() {
		window.setTimeout( () => {}, 100)
		if(this.state.fighters.length === 0 ) {
			const message = `There are no saved fighters in the database`;
			return message;
		}
	}

	render() {
		return(
			<div>
			<h1> Saved Fighters </h1>
			{ this.messagePrint() }
			{ this.state.fighters.map((f, i) =>
				<div className="fighter" key={i}>
		      <Fighter fighter={f[0]} />
					<button onClick={ this.fighterDelete } id={ f[0].id }> Delete Fighter </button>
				</div>
		    ) // end map
			}
			</div>
    )
	}
}

export default FightersSaved;
