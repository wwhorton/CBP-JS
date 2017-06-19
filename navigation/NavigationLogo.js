// Imports

import classNames from 'classnames';

export default class NavigationLogo extends React.Component {
    shouldComponentUpdate(nextProps) {
        return nextProps !== this.props;
    }
    render() {
        const navLogoClass = classNames({
            'static': !this.props.fixed && !this.props.mobile,
            'fixed': this.props.fixed && !this.props.mobile,
            'mobile static': this.props.mobile && !this.props.fixed,
            'mobile fixed': this.props.mobile && this.props.fixed,
            'logo': true

        });
        const gridClass = classNames({
            'small-11 medium-6': !this.props.mobile,
            'small-12 medium-6 ': this.props.mobile && !this.props.fixed,
            'small-2 medium-6 ': this.props.mobile && this.props.fixed,
            'columns no-padding-left no-padding-right': true
        });
        return (
            <div className={gridClass}>
                <a href="/">
                    <div className={navLogoClass}></div>
                </a>
            </div>
        );
    }
}