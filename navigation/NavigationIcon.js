// Imports

import 'classnames';

export default class NavigationIcon extends React.Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    shouldComponentUpdate(nextProps) {
            return nextProps !== this.props;
    }
    handleClick() {
        $('#menu-icon-text').toggleClass( 'active' );
        $('#menu-icon').toggleClass('fa-bars fa-close');
        this.props.callback();
    }
    render() {
            const navIconClass = classNames({
                'button default grey icon right': true,
                'static': !this.props.fixed && !this.props.mobile,
                'static mobile': !this.props.fixed && this.props.mobile,
                'fixed mobile': this.props.fixed && this.props.mobile,
                'fixed': this.props.fixed && !this.props.mobile
            });
            const gridClass = classNames({
                "columns no-padding-right": true,
                "no-padding-left small-2": this.props.mobile,
                "no-padding-left small-2 right": this.props.mobile && this.props.fixed,
                "medium-2": !this.props.mobile

            });
            if(this.props.mobile) return (
                <div className={gridClass}>
                    <a id="menu-button" className={navIconClass} onClick={this.handleClick}>
                        <div id="menu-icon-text" className="show-for-large-up"></div>
                        <i id="menu-icon" className='fa fa-bars'/>
                    </a>
                </div>
            );
            else return null;
    }
}