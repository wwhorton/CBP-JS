/**
 * Created by Bill on 4/21/2016.
 */

// Imports


export default class NavigationTitle extends React.Component {
    render() {
        return (
            <div className="small-10 columns">
                <h>{this.props.articleTitle}</h>
            </div>
        )
    }
}