// Imports

import 'classnames';

export default class NavigationSearch extends React.Component {
    shouldComponentUpdate(nextProps) {
        return nextProps !== this.props;
    }
    render() {
        const navSearchClass = classNames({
            'static small-8 medium-4 large-6': !this.props.fixed && !this.props.mobile,
            'fixed small-8 medium-4 large-6': this.props.fixed && !this.props.mobile,
            'mobile static small-10 medium-4 large-4': this.props.mobile && !this.props.fixed,
            'mobile fixed small-8 medium-4 large-4': this.props.mobile && this.props.fixed,
            'columns search': true,
        });
        const formAction = "http://" + window.location.host + "/search";
        return (
            <div id="search-bar-div" className={navSearchClass}>
                <form action={formAction} method="get" className="row collapse"
                      name="titleSearch" id="search-bar">
                    <div className="small-9 medium-9 large-10 columns">
                        <input type="text" name="q" id="titleSearch" placeholder="search"
                               autoComplete="off" required="true"/>
                    </div>
                    <div className="small-3 medium-3 large-2 columns">
                        <button id="search-button" className="button default postfix" type="submit">
                            <i id="search-icon" className='fa fa-search fa-2x'/>
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}