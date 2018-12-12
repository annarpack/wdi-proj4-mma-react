import React, { Component } from "react";
import axios from 'axios';

class Fighter extends Component {
	constructor(props){
		super(props);

    this.getFighterImage = this.getFighterImage.bind(this);
    this.getWeightClass = this.getWeightClass.bind(this);
	}
  getFighterImage(f) {
		//## get the image for the fighter
		if(f.title_holder) {
			//## if the figher has a winning title and belt picture,
			//## get the picture of them with their belt
			return f.belt_thumbnail;
		}
		else {
			//## if the fighter does not have a belt picture,
			//## get their regular image
			return f.image;
		}
	}
	getWeightClass(f) {
		//## get the figher's weight class
		//## if the weight class is displayed with an underscore, change the format 
		if(f.weight_class === 'Women_Strawweight') {
			return 'Womens Straw Weight';
		}
		else {
			return f.weight_class;
		}
	}
  render() {
    console.log(this.props.fighter)
		return(
      <div>
      <h3>{ this.props.fighter.full_name }</h3>
      <img src={ this.getFighterImage(this.props.fighter)	} alt={ this.props.fighter.full_name } />
      <ul>
        <li>Status: { this.props.fighter.status } </li>
        <li> Weight Class: { this.getWeightClass(this.props.fighter) }  </li>
        <li>{this.props.fighter.wins} WINS / {this.props.fighter.losses} LOSSES / {this.props.fighter.draws} DRAWS </li>
      </ul>
      </div>
		);
	}
}

export default Fighter;
