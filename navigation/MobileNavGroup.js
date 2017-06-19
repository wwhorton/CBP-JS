/**
 * Created by Bill on 4/14/2016.
 */
// Imports


export default class MobileNavGroup extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <li className="mobileNavigation-listItem">
                <span className="mobileNavigation-topLevelText"><a href={this.props.url}>{this.props.link}</a></span>
                <a href={"#" + String.fromCharCode(97 + this.props.id)}><i className="mobileNavigation-topLevelIcon"></i></a>
                <div id={String.fromCharCode(97 + this.props.id)} className="content">
                    <ul className="no-bullet mobileNavigation-subList">
                        {this.props.items}
                    </ul>
                </div>
            </li>
        );
    }
}