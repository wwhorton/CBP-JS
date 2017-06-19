/**
 * Created by Bill on 4/22/2016.
 */

// Imports


export default class NavigationLogoSmallIcon extends React.Component {
    shouldComponentUpdate(nextProps) {
            return nextProps !== this.props;
    }
    render() {
            return (
                <a href="/">
                    <div id="CBP-icon" className="small-2 columns" ></div>
                </a>
            );
    }
}