/**
 * Created by Bill on 4/21/2016.
 */
// Imports

import NavigationMenuItem from 'NavigationMenuItem';

export default class NavigationMenu extends React.Component {
    constructor(props){
        super(props);
        this._setActiveItem = this._setActiveItem.bind(this);
        this._setActiveSubItem = this._setActiveSubItem.bind(this);
        this.state = {
            "activeItem": null,
            "activeSubItem": null,
            "touch": $('html').hasClass('touch'),
            "origActiveItem": null,
            'interacted': false
        }
    }
    shouldComponentUpdate(nextProps) {
        return nextProps.menuOpen !== this.props.menuOpen;
    }
    _setActiveItem(i) {
        const self = this;
        return new Promise(
            function( resolve, reject ) {
                if(self.state.activeItem == self.props.items[i]) {
                    self.setState({"activeItem": null});
                    self.setState({"interacted": false});
                    $('#navMenuList').removeClass('interacted');
                }
                else {
                    self.setState({"activeItem": self.props.items[i]});
                }
                self.forceUpdate();
                resolve();
            }
        );
    }
    _setActiveSubItem(activeItem, i) {
        this.forceUpdate();
    }
    componentDidUpdate() {
        $(document).foundation('equalizer', 'reflow');
    }
    componentDidMount(){
        const self = this;
        let path = location.pathname.split('/');
        this.props.items.map( function( item, i ){
            if( path[1] == item.url.split('/')[1] ){
                self.setState({"origActiveItem": self.props.items[i]});

                this._setActiveItem(i).then(function(){
                    self.state.activeItem.subItems.map( function( item, i ){
                        if( location.pathname == item.url ){
                            self._setActiveSubItem( self.state.activeItem, [i] );
                        }
                    }.bind(this));
                }).catch( function( reason ){
                    console.log( 'Subnav promise rejected: ' + reason );
                });
            }
        }.bind(this));
    }
    render() {
        return (
            <ul id="navMenuList" className="no-bullet">
                { this.props.items.map(function (item, i) {
                    let activeProp = this.state.activeItem == null ? ( item == this.state.origActiveItem ) : ( item == this.state.activeItem );
                    return <NavigationMenuItem key={i} index={i} link={item.link} url={item.url}
                                               callback={ this._setActiveItem } active={activeProp} subItems={item.subItems} touch={this.state.touch} />
                }.bind(this)) }
            </ul>
        );
    }
}