/**
 * Created by Bill on 7/26/2016.
 */
export default class Slide extends React.Component{
    render(){
        return(
            <div>
                <div className="small-12 large-5 columns">
                    <img src={this.props.image} className="full-width"/>
                    <p className="small-text caption-top-padding"><em>Photo Credit: {this.props.caption}</em></p>
                </div>
                <div className="small-12 large-7 columns">
                    <div className="small-12 columns timeline-slide-caption">
                        <h2>{this.props.title}</h2>
                        <div dangerouslySetInnerHTML={{ __html: this.props.event }}></div>
                    </div>
                </div>
            </div>
        );
    }
}