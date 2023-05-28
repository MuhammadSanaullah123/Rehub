import React, { Component } from "react";
import {
  Map, InfoWindow, Marker, GoogleApiWrapper,
} from "google-maps-react";

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.handleMapIdle = this.handleMapIdle.bind(this);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      mapLoaded: false,
    };
  }

  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });
  }

  /*   onMarkerMounted = (element) => {
    this.onMarkerClick(element.props, element.marker, element);
  }; */
  handleMapIdle = () => {
    this.setState({
      mapLoaded: true,
    });
  };

  render() {
    if (!this.props.google) {
      return <div>Loading...</div>;
    }

    return (
      <div
        className="topdiv"
        style={{
          width: "1220px",
          height: "500px",
        }}
      >
        <Map
          style={{ width: "1220px", height: "500px", borderRadius: "30px" }}
          google={this.props.google}
          zoom={14}
          initialCenter={{
            lat: this.props.lat,
            lng: this.props.lng,
          }}
          onIdle={this.handleMapIdle}
        >
          {this.state.mapLoaded && (
            <Marker
              ref={this.onMarkerMounted}
              onClick={this.onMarkerClick}
              //draggable={true}
              name={this.props.name}
            />
          )}

          <InfoWindow marker={this.state.activeMarker} visible={this.state.showingInfoWindow}>
            <div>
              <p
                style={{
                  fontFamily: "Poppins",
                  fontWeight: "300",
                  fontSize: "14px",
                  color: "#818181",
                  marginLeft: "0",
                }}
              >
                Dirección
              </p>
              <h1
                style={{
                  fontFamily: "Poppins",
                  fontWeight: "500",
                  fontSize: "18px",
                  textTransform: "capitalize",
                  color: "#D96581",
                }}
              >
                {this.state.selectedPlace.name}
              </h1>
            </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: "AIzaSyA_9dyGB-Du4nrXiyVLx_Ice7c93V-JOGY",
  v: "3.30",
})(MapContainer);
