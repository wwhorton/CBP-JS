// Imports

import classNames from 'classnames';
import NavigationSearch from 'NavigationSearch';
import NavigationLogo from 'NavigationLogo';
import NavigationIcon from 'NavigationIcon';
import MobileNavigationMenu from 'MobileNavigationMenu';
import { globals } from 'globals';

export default class OffcanvasNavigation extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            menuOpen: false,
            fixed: false,
            height: 0
        };
        this.toggleMenu = this.toggleMenu.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this._checkHeight = this._checkHeight.bind(this);
    }
    getNodeHeight() {
        return this.node.offsetHeight;
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState !== this.state;
    }
    toggleMenu() {
        let self = this;
        self.setState({menuOpen: !self.state.menuOpen});
        $('.transparency').toggleClass('active');
        $('body').toggleClass('noscroll');
    }
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        $(document).on('click', function (e) {
            if (!$(e.target).closest('#mobileNavMenuList').length && !$(e.target).closest('#menu-icon').length && this.state.menuOpen) {
                $('#menu-icon').trigger('click');
            }
        }.bind(this));
        window.addEventListener('orientationchange', this.handleScroll);
        this._checkHeight();
    }
    componentDidUpdate(){
        this._checkHeight();
        $('#offcanvas-menu').height($(window).height() - this.state.height);
    }
    toggleFixed() {
        let self = this;
        self.setState({fixed: !this.state.fixed}, function () {
            //$('#hero-carousel').css('margin-top', ( ( self.state.fixed === false ) ? '0' : this.getNodeHeight() + 'px' ));
        });
    }
    _checkHeight(){
        let height = this.getNodeHeight();
        if (this.state.height !== height ) {
            this.setState({ height: height });
            if (this.state.fixed === true) {
                $('body').css('padding-top', height);
            }
            else $('body').css('padding-top', 0);
        }
    }
    handleScroll() {
        let self = this;
        if(self.state.menuOpen === true) return;
        if (window.pageYOffset > 1) {
            if (self.state.fixed === false) {
                self.toggleFixed();
            }
        } else if (window.pageYOffset <= self.getNodeHeight()) {
            if (self.state.fixed === true) {
                self.toggleFixed();
            }
        }
    }
    render() {
        let navClasses = classNames({
            'navigation mobile-nav': true,
            'fixed': this.state.fixed,
            'static': !this.state.fixed
        });
        let self = this;
        return (
            <nav className={navClasses} ref={ (node) => this.node = node } >
                    <div>
                        <div className="nav-bar">
                            <NavigationLogo fixed={self.state.fixed} mobile={true}/>
                            <NavigationSearch fixed={self.state.fixed} mobile={true}/>
                            <NavigationIcon fixed={self.state.fixed} mobile={true} callback={this.toggleMenu}/>
                        </div>
                        <MobileNavigationMenu key={self.state.menuOpen} fixed={this.state.fixed} menuOpen={self.state.menuOpen}
                                                  items={globals.items}/>
                    </div>
            </nav>
        );
    }
}