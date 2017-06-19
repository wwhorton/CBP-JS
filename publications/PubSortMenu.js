/**
 * Created by Bill on 1/17/2017.
 */

export default class PubSortMenu extends React.Component{
    constructor( props ){
        super(props);
        this.handleSelect = this.handleSelect.bind(this);
    }
    handleSelect( event ){
        event.preventDefault();
        this.props.callback(event.target.dataset.value);
    }
    render() {
        return (
            <div>
                <a data-dropdown="drop-publication-sort" className="pubSortMenu-listHeading"><h2>{this.props.selected}</h2><i className="fa fa-caret-down fa-3x" aria-hidden="true"></i></a>
                <ul id="drop-publication-sort" className="f-dropdown" data-dropdown-content={true} tabIndex="-1">
                    <li key="1">
                        <a href="#" data-value="Featured" onClick={this.handleSelect} className="pubSortMenu-listItem">Featured</a>
                    </li>
                    <li key="2">
                        <a href="#" data-value="Most Popular" onClick={this.handleSelect} className="pubSortMenu-listItem">Most Popular</a>
                    </li>
                    <li key="3">
                        <a href="#" data-value="Recently Added" onClick={this.handleSelect} className="pubSortMenu-listItem">Recently Added</a>
                    </li>
                </ul>
            </div>
        );
    }
}