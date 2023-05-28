import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";

import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import Geocode from "react-geocode";
import LocationPin from "./LocationPin";

function Map({
  inputvalues, handleCloseAddress, edit, setStates, setLongitude, setLatitude,
}) {
  const [latitude, setlatitude] = useState(inputvalues.lat || 35.14);
  const [longitude, setlongitude] = useState(inputvalues.lng || 33.17);

  const [address, setAddress] = useState("");

  const [zoomLevel, setZoomLevel] = useState(9);
  const [city, setCity] = useState("");

  const [location] = useState({
    address: "",
    lat: 35.14,
    lng: 33.17,
  });

  useEffect(() => {
    setLongitude && setLatitude(location.lat);
    setLatitude && setLongitude(location.lng);
  }, [setLatitude, setLongitude]);

  const handleAddress = () => {
    Geocode.setApiKey("AIzaSyA_9dyGB-Du4nrXiyVLx_Ice7c93V-JOGY");

    Geocode.fromAddress(address.label).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        location.lat = lat;
        location.lng = lng;
        setlatitude(lat);
        setlongitude(lng);
        setZoomLevel(17);
      },
      (error) => {
        console.error(error);
      },
    );
  };

  useEffect(() => {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyA_9dyGB-Du4nrXiyVLx_Ice7c93V-JOGY`,
    )
      .then((response) => response.json())
      .then((data) => {
        setCity(
          data.results[0]?.address_components?.find((component) => component?.types?.includes("locality"))?.long_name,
        );
      });
  }, []);

  const handleConversion = () => {
    Geocode.fromLatLng(latitude, longitude).then(
      (response) => {
        const address = response.results[0].address_components.map((item) => item.long_name).join(", ");
        let city; let state; let
          country;
        for (let i = 0; i < response.results[0].address_components.length; i++) {
          for (let j = 0; j < response.results[0].address_components[i].types.length; j++) {
            switch (response.results[0].address_components[i].types[j]) {
              case "locality":
                city = response.results[0].address_components[i].long_name;
                break;
              case "administrative_area_level_1":
                state = response.results[0].address_components[i].long_name;
                // setStates(state);
                break;
              case "country":
                country = response.results[0].address_components[i].long_name;
                break;
            }
          }
        }

        if (edit) {
          inputvalues.addresschild = address;
        } else {
          inputvalues.address = address;
        }
        handleCloseAddress();
      },
      (error) => {
        console.error(error);
      },
    );
  };

  useEffect(() => {
    handleAddress();
  }, [address]);

  return (
    <div className="map">
      <GooglePlacesAutocomplete
        selectProps={{
          address,
          onChange: setAddress,
        }}
      />

      <div className="google-map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyA_9dyGB-Du4nrXiyVLx_Ice7c93V-JOGY" }}
          defaultCenter={location}
          defaultZoom={9}
          center={[latitude, longitude]}
          zoom={zoomLevel}
          onClick={(ev) => {
            setlatitude(ev.lat);
            setLatitude(ev.lat);

            setlongitude(ev.lng);
            setLongitude(ev.lng);
          }}
        >
          <LocationPin lat={latitude} lng={longitude} />
        </GoogleMapReact>
      </div>
      <button className="mapSubmitbtn" onClick={handleConversion}>
        Submit
      </button>
    </div>
  );
}

export default Map;
