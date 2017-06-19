/**
 * Created by Bill on 4/21/2016.
 */

// Imports
import classNames from 'classnames';
import { globals } from '../globals';
import NavigationMenu from 'NavigationMenu';
import NavigationLogo from 'NavigationLogo';
import NavigationSearch from 'NavigationSearch';
import NavigationIcon from 'NavigationIcon';

export default class NavigationArea extends React.Component {
    constructor(props){
        super(props);
        this.handleScroll = this.handleScroll.bind(this);
        this.toggleMenu = this.toggleMenu.bind(this);
        this._checkHeight = this._checkHeight.bind(this);
        this.toggleFixed = this.toggleFixed.bind(this);
        this.state = {
            showSearch: this.isPageIndex,
            menuOpen: false,
            fixed: false,
            height: 0
        };
    }
    isPageIndex() {
        if (typeof window != 'undefined') {
            return window.location.pathname === '/';
        } else {
            return true;
        }
    }
    _padBodyForNav(pad){
        $('body').css('padding-top', pad);
    }
    _checkHeight(){
        let height = ReactDOM.findDOMNode(this).offsetHeight;
        if (this.state.height !== height ) {
            this.setState({ height: height });
            if (this.state.fixed === true) {
                this._padBodyForNav(106);
            }
            else this._padBodyForNav(0);
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        return nextState !== this.state;
    }
    componentDidMount() {
        window.addEventListener('load', this.handleScroll);
        window.addEventListener('scroll', this.handleScroll);
        window.addEventListener('orientationchange', this.handleScroll);
        this._checkHeight();
    }
    componentDidUpdate(){
        this._checkHeight();
    }
    toggleFixed() {
        this.setState({fixed: !this.state.fixed});
        //this.setState({fixed: this.state.fixed});
    }
    handleScroll() {
        if ( window.pageYOffset > 0 ) {
            if (this.state.fixed === false) {
                this.toggleFixed();
            }
        } else if ( window.pageYOffset <= this.node.offsetHeight ) {
            if (this.state.fixed === true) {
                this.toggleFixed();
            }
        }
    }
    toggleMenu() {
        this.setState({menuOpen: !this.state.menuOpen});
    }
    render() {
        const navClass = classNames({
            'navigation': true,
            'fixed': this.state.fixed,
            'static': !this.state.fixed
        });
        return (
            <nav id="desktop-navigation-area" ref={ (node) => this.node = node } className={navClass}>
                <div className="row sidepad">
                    <div className="small-12 columns">
                        <NavigationLogo fixed={this.state.fixed} mobile={false}/>
                        <NavigationSearch fixed={this.state.fixed} mobile={false}/>
                        <NavigationIcon fixed={this.state.fixed} callback={this.toggleMenu} mobile={false}/>
                    </div>
                </div>
                <div className="full-width sidepad navMenuBar">
                    <NavigationMenu key={this.state.menuOpen} items={globals.items} callback={this.toggleMenu}/>
                </div>
            </nav>
        );
    }
}
