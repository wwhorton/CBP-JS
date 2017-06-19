/**
 * Created by Bill on 1/17/2017.
 */

// Calendar/Agenda form

import PubSortMenu from "PubSortMenu";

export default class PubSortUI extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            sortCriteria: "featured"
        };
        this.handleChange = this.handleChange.bind(this);
    }
    componentWillMount(){
        const self = this;
        let sortParameter = location.search;
        sortParameter = decodeURIComponent( sortParameter.split('=')[1] );
        if( sortParameter !== 'undefined' ){
            self.setState({ 'sortCriteria': sortParameter });
        }
    }
    componentDidMount(){
        $(document).foundation('dropdown', 'reflow');
    }
    componentDidUpdate( prevProps, prevState ){
        $(document).foundation('dropdown', 'reflow');
        const self = this;
        if( prevState != self.state ) {
            window.location = location.origin + location.pathname + "?sortby=" + this.state.sortCriteria;
        }
    }
    handleChange( value ){
        const self = this;
        self.setState({ sortCriteria: value });
    }
    render() {
        return (
            <div className="row">
                <div className="pubSortMenu-menuContainer text-left" >
                    <PubSortMenu selected={this.state.sortCriteria} callback={this.handleChange}/>
                </div>
            </div>
        );
    }
}