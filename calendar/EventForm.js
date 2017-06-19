/**
 * Created by Bill on 3/22/2016.
 */

import EventSelectMenu from "EventSelectMenu";

export default class EventForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            'type': type,
            'month': month,
            'year': year
        };
        this.handleChange = this.handleChange.bind(this);
    }
    componentWillMount(){
        const type = $("#type");
        const month = $("#month");
        const year = $("#year");
        this.setState({
            'type': { name: type.text(), value: type.data( "value" ) },
            'month': { name: month.text(), value: month.data( "value" ) },
            'year': { name: year.text(), value: year.data( "value" ) }
        });
    }
    componentDidMount(){
        $(document).foundation('dropdown', 'reflow');
    }
    componentDidUpdate( prevProps, prevState ){
        $(document).foundation('dropdown', 'reflow');
        if( prevState != this.state ) {
            window.location = location.origin + $("#event-form").data('path-root') + this.state.type.value + "/" + this.state.year.value + "/" + this.state.month.value;
        }
    }
    handleChange( property, name, value ){
        this.setState({ [property]: {name: name, value: value } });
    }
    render() {
        let i, y;
        let years = [];
        i = new Date().getFullYear();
        y = i - 20;
        for ( i; i > y; i-- ){
            years.push( {'value': i, 'name': i } );
        }
        if( typeof this.state.type != 'undefined') {
            return (
                <div className="row eventForm">
                    <div className="eventForm-typeMenuContainer text-left" >
                        <EventSelectMenu menu="type" name={this.state.type} options={this.props.types}
                                         callback={this.handleChange}/>
                    </div>
                    <div className="eventForm-textContainer" >
                        <h2>Events in </h2>
                    </div>
                    <div className="eventForm-monthMenuContainer" >
                        <EventSelectMenu menu="month" name={this.state.month} options={this.props.months}
                                         callback={this.handleChange}/>
                    </div>
                    <div className="eventForm-yearMenuContainer" >
                        <EventSelectMenu menu="year" name={this.state.year} options={years}
                                         callback={this.handleChange}/>
                    </div>
                </div>
            );
        } else {
            return (
                <div></div>
            )
        }
    }
}