// Imports

import $ from 'jquery';
import NavigationMenuItem from 'NavigationMenuItem';
import MobileNavGroup from 'MobileNavGroup';

export default class MobileNavigationMenu extends React.Component {
    constructor(props){
        super(props);
    }
    componentDidMount() {
        $(document).foundation('accordion', 'reflow');
        $('.accordion li > a.mobileNavigation-topLevelText').on('click', function(e) {
            console.log(e, $(this));
        });
    }
    shouldComponentUpdate(nextProps) {
        return nextProps.menuOpen !== this.props.menuOpen;
    }
    render() {
        const classes = ( this.props.fixed ) ? "off-canvas small-11 columns fixed" : "off-canvas small-11 columns";
        const list = this.props.items.map(function (item, id) {
            const listID = String.fromCharCode(97 + id);
            if( item.subItems ){
                const listItems = item.subItems.map( function ( item, id ) {
                    id++;
                    return (
                        <NavigationMenuItem url={item.url} className="mobileNavigation-subListItem" link={item.link} key={listID + id}/>
                    );
                });
                return (
                    <MobileNavGroup items={listItems} key={listID} id={id} link={item.link} url={item.url} />
                );
            } else {
                return (
                    <NavigationMenuItem url={item.url} link={item.link} key={ listID } primary={true}/>
                );
            }
        });
        return (
        ( this.props.menuOpen ) ?
            <div id="offcanvas-menu" className={classes} >
                <ul id="mobileNavMenuList" className="accordion" data-accordion >
                    {list}
                </ul>
            </div>
            :
            null
        );
    }
}