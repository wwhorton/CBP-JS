/**
 * Created by Bill on 7/6/2016.
 */

export default class MapForm extends React.Component{
    constructor(props){
        super(props);
        this._handleClick = this._handleClick.bind(this);
    }
    _handleClick( e ){
        e.preventDefault();
        let data = $("#near-group-search").serializeArray();
        this.props.callback( data );
    }
    render() {
        var radii = [10,25,50,100,200,300];
        let radius = this.props.params.radius;
        let zip = this.props.params.zip;
        let max = this.props.params.max;

        return (
            <div className="panel small-12 columns googleMapFormContainer">
                <h3 className="googleMapFormContainer-title">Find { (this.props.type == 'public access') ? 'an Access Point' : 'a Group'} Near You</h3>
                <form className="googleMapForm" id="near-group-search" onSubmit={this._handleClick}>
                    <div className="row">
                        <div className="small-6 large-6 columns">
                            <label>ZIP Code
                                <input id="zip" type="text" name="zip" placeholder="ZIP Code" defaultValue={zip}/>
                            </label>
                        </div>
                        <div className="small-6 large-6 columns">
                            <label>Radius (mi)
                                <select id="radius" name="radius" defaultValue={radius}>
                                    {radii.map(function(r) {
                                        return (
                                            <option value={r}>{r}</option>
                                        );
                                    })}
                                </select>
                            </label>
                        </div>

                    </div>
                    <input type="hidden" name="max" value={max} />
                    <div className="row">
                        <div className="small-12 columns googleMapForm-submitButtonContainer">
                            <a href="#" id="group-search-link" className="button small default right googleMapForm-submitButton button-blue" onClick={this._handleClick} >Search</a>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}