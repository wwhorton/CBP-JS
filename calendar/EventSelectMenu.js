/**
 * Created by Bill on 3/22/2016.
 */

import React from "react";
import _ from "underscore";

export default class EventSelectMenu extends React.Component {
    constructor( props ){
        super( props );
        this.state = {
            value: ""
        };
        this.handleSelect = this.handleSelect.bind(this);
    }
    componentDidMount(){
           let value = $("#" + this.props.menu).text();
           _.each( this.props.options, function( option ){
              if( option.name == value ){
                  this.setState({
                      'value': option.value
                  });
              }
           }.bind(this));
    }
    handleSelect( event ){
           event.preventDefault();
           this.props.callback(this.props.menu, event.target.dataset.name, event.target.dataset.value);
    }
    render() {
           const self = this;
           let options = _.map( this.props.options, function( option, id ){
               return (<li key={id} ><a href="#" data-value={option.value} data-name={option.name} onClick={self.handleSelect} className="calendarFilter-listItem">{option.name}</a></li>) ;
           });
           return (
               <div>
                   <a data-dropdown={"drop-" + this.props.menu } className="calendarFilter-listAnchor"><h2 className="calendarFilter-listHeading">{this.props.name.name}</h2><i className="fa fa-caret-down fa-3x" aria-hidden="true"></i></a>
                   <ul id={"drop-" + this.props.menu } className="f-dropdown" data-dropdown-content={true} tabIndex="-1">
                       {options}
                   </ul>
               </div>
           );
    }
}
