/**
 * Created by danbr on 5/8/2017.
 */

// Imports

export default class GoogleMapInfoWindowContents extends React.Component {
    constructor(props){
        super(props);
        this._addHttp = this._addHttp.bind(this);
        this._extractHostname = this._extractHostname.bind(this);
        this._extractRootDomain = this._extractRootDomain.bind(this);
    }
    _addHttp(url){
        if(url === '' || url === false) return false;
        if (!/^https?:\/\//i.test(url)) {
            url = "http://" + url;
        }
        return url;
    }
    _extractHostname(url) {
        var hostname;
        //find & remove protocol (http, ftp, etc.) and get the hostname
        if (url.indexOf("://") > -1) {
            hostname = url.split('/')[2];
        }
        else {
            hostname = url.split('/')[0];
        }

        //find & remove port number
        hostname = hostname.split(':')[0];

        return hostname;
    }
    componentDidMount(){
        if(typeof this.props.callback === "function") {
            this.props.callback(this.refs.infoWindowContent);
        }
    }
    _extractRootDomain(url) {
        var domain = this._extractHostname(url),
            splitArr = domain.split('.'),
            arrLen = splitArr.length;

        //extracting the root domain here
        if (arrLen > 2) {
            domain = splitArr[arrLen - 2] + '.' + splitArr[arrLen - 1];
        }
        return domain;
    }
    render() {
        var infoWindowContent = null;
        if(this.props.marker) {
            if(this.props.type !== 'public access'){
                let url = this._addHttp(this.props.marker.url);
                let orgTitle;
                if(url) orgTitle = <a href={url}>{this.props.marker.title}<br /><small>{this._extractRootDomain(url)}</small></a>;
                else orgTitle = this.props.marker.title;

                infoWindowContent = <div>
                    <h4 className="markerInfoWindow-title">{orgTitle}</h4>
                    <ul className="no-bullet markerInfoWindow-contactList">
                        <li className="markerInfoWindow-contactName">{this.props.marker.contact}</li>
                        <li className="markerInfoWindow-contactPhone"><a
                            href={"tel:" + this.props.marker.contactPhone}>{this.props.marker.contactPhone}</a>
                        </li>
                        <li className="markerInfoWindow-contactEmail"><a
                            href={"mailto:" + this.props.marker.email}>{this.props.marker.email}</a></li>
                        <li className="markerInfoWindow-contactAddress">
                            <address>
                                {this.props.marker.address}<br />
                                {this.props.marker.city}, {this.props.marker.state} {this.props.marker.zip}
                            </address>
                        </li>
                    </ul>
                </div>;
            }
            else {
                infoWindowContent = <div>
                    <h4 className="markerInfoWindow-title">{this.props.marker.title}</h4>
                    <p>{this.props.marker.county}, {this.props.marker.state}</p>
                    <div className="markerInfoWindow-iconRow">
                        <ul className="no-bullet">
                            <li>Boat Ramp: { this.props.marker.boatRamp }</li>
                            <li>Fishing: { this.props.marker.fishing }</li>
                            <li>Swimming: { this.props.marker.swimming }</li>
                            <li>Trail: { this.props.marker.trail }</li>
                            <li>{ (this.props.marker.parking) ? "Parking: " + this.props.marker.parking : "" }</li>
                        </ul>
                    </div>
                    <div>
                        <h5>Driving Directions:</h5>
                        <p>Enter your starting address or ZIP below:</p>
                        <form id="directionForm" action="https://maps.google.com/maps" method="get" target="_blank">
                            <div className="row collapse">
                                <div className="small-10 columns">
                                    <input type="text" name="saddr" placeholder="ex. 410 Severn Ave, Annapolis, MD 21403" />
                                    <input type="hidden" name="daddr" value={this.props.marker.position} />
                                </div>
                                <div className="small-2 columns">
                                    <input type="submit" className="button postfix" value="Go" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>;
            }
        }
        return (
            <div ref="infoWindowContent">{infoWindowContent}</div>
        );
    }
}