// Imports

export default class NavigationMenuItem extends React.Component {
    constructor(props){
        super(props);
        this.handleMouseClick = this.handleMouseClick.bind(this);
    }
    shouldComponentUpdate(nextProps) {
        return nextProps !== this.props;
    }
    _onMouseOver(e){
        //console.log($(e.target));
        var li;
        li = $(e.target).is('li') ? $(e.target) : $(e.target).closest('li');
        if ($('ul', li).length) {
            var elm = $('ul:first', li);
            var off = elm.offset();
            var l = off.left;
            var w = elm.width();
            //var docH = $(".container").height();
            var docW = $("#navigation").width();

            var isEntirelyVisible = (l + w <= docW);

            if (!isEntirelyVisible) {
                elm.addClass('edge');
                console.log('isn\'t entirely visible!');
            } else {
                elm.removeClass('edge');
                console.log('is entirely visible');
            }
        }
    }
    handleMouseClick(e) {
        $('#navMenuList').addClass('interacted');
        if (typeof this.props.callback == 'function') {
            if(this.props.touch == true) e.preventDefault();
            this.props.callback(this.props.index);
        }
    }
    render() {
        const self = this;
        let subNavMenu;
        let liProps = {};
        if(this.props.subItems !== undefined) {
            let length = this.props.subItems.length,
                subMenuClass,
                cols,
                minPerCol,
                colsWithOneExtra,
                menuClass,
                colCounter = -1;
            let bottomRow = [];

            if(length > 10){
                cols = 3;
                subMenuClass = 'three-column';
            }
            else if(length < 4){
                cols = 1;
                subMenuClass = 'one-column';
            }
            else {
                cols = 2;
                subMenuClass = 'two-column';
            }

            minPerCol = Math.floor(length / cols);
            colsWithOneExtra = length - (minPerCol * cols);
            if(colsWithOneExtra === 0) {
                colsWithOneExtra = cols;
                minPerCol -= 1;
            }
            for(let c = 1; c <= colsWithOneExtra; c++){
                colCounter += minPerCol + 1;
                bottomRow.push(colCounter);
            }
            if(this.props.index > 4) subMenuClass += " left";
            subNavMenu = <ul className={subMenuClass}>
                { this.props.subItems.map(function (item, i) {
                    if($.inArray(i, bottomRow) != '-1') menuClass = 'bottomrow';
                    else menuClass = '';
                    return <NavigationMenuItem key={i} index={i} url={item.url} link={item.link} class={menuClass} />
                }.bind(this))}
            </ul>

            //liProps['onMouseOver'] = this._onMouseOver;
        }
        let classes = "navMenu_item";
        classes += ( self.props.active ) ? "--active" : "";
        if(this.props.class !== undefined) classes += ' ' + this.props.class;

        liProps['className'] = classes;
        //console.log(liProps);
        return React.createElement(
            "li",
            liProps,
            React.createElement(
                "a",
                { href: this.props.url, onClick: this.handleMouseClick },
                this.props.link
            ), subNavMenu
        );
    }
}