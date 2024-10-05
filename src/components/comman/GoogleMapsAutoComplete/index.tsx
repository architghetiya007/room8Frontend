import React, { useState, useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";

interface PlaceType {
  description: string;
  place_id: string;
}

interface AddressDetails {
  streetNumber?: string;
  streetName?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  addressLine?: string;
  formattedAddress?: string;
  coordinates?: [number, number]; // Coordinates array [latitude, longitude]
}
interface GoogleMapsAutocompleteProps {
  onClickPlaceDetails: (details: AddressDetails | null) => void; // Callback for place details
}
const GoogleMapsAutocomplete: React.FC<GoogleMapsAutocompleteProps> = ({
  onClickPlaceDetails,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<PlaceType[]>([]);
  const [loading, setLoading] = useState(false);
  const [addressDetails, setAddressDetails] = useState<AddressDetails | null>(
    null
  );
  const [autocompleteService, setAutocompleteService] =
    useState<google.maps.places.AutocompleteService | null>(null);
  const [placeService, setPlaceService] =
    useState<google.maps.places.PlacesService | null>(null);

  useEffect(() => {
    if (!autocompleteService && window.google) {
      setAutocompleteService(
        new window.google.maps.places.AutocompleteService()
      );
    }
  }, [autocompleteService]);

  // Initialize PlacesService once Google Maps API is loaded
  useEffect(() => {
    if (!placeService && window.google) {
      const map = document.createElement("div"); // Create a dummy div for the PlacesService
      setPlaceService(new window.google.maps.places.PlacesService(map));
    }
  }, [placeService]);

  const fetchPlacePredictions = (value: string) => {
    if (autocompleteService) {
      setLoading(true);
      autocompleteService.getPlacePredictions(
        { input: value },
        (results, status) => {
          setLoading(false);
          if (
            status === window.google.maps.places.PlacesServiceStatus.OK &&
            results
          ) {
            setOptions(
              results.map((place) => ({
                description: place.description,
                place_id: place.place_id,
              }))
            );
          } else {
            setOptions([]);
          }
        }
      );
    }
  };

  const fetchPlaceDetails = (placeId: string) => {
    if (placeService) {
      const request = {
        placeId: placeId,
        fields: [
          "name",
          "geometry", // Include geometry for coordinates
          "formatted_address", // Include formatted address
          "place_id",
          "address_component",
        ],
      };
      placeService.getDetails(request, (place, status) => {
        if (
          status === window.google.maps.places.PlacesServiceStatus.OK &&
          place
        ) {
          extractAddressComponents(place);
        } else {
          console.error("Error fetching place details:", status);
        }
      });
    }
  };

  const extractAddressComponents = (place: google.maps.places.PlaceResult) => {
    if (place.address_components) {
      const addressComponents = place.address_components.reduce(
        (acc, component) => {
          const types = component.types;
          if (types.includes("street_number")) {
            acc.streetNumber = component.long_name;
          } else if (types.includes("route")) {
            acc.streetName = component.long_name;
          } else if (types.includes("locality")) {
            acc.city = component.long_name;
          } else if (types.includes("administrative_area_level_1")) {
            acc.state = component.short_name;
          } else if (types.includes("country")) {
            acc.country = component.long_name;
          } else if (types.includes("postal_code")) {
            acc.postalCode = component.long_name;
          }
          return acc;
        },
        {} as AddressDetails
      );

      // Add formatted_address from the API response
      addressComponents.formattedAddress = place.formatted_address || "";

      // Extract coordinates (latitude and longitude) and store as an array
      if (place.geometry && place.geometry.location) {
        addressComponents.coordinates = [
          place.geometry.location.lng(),
          place.geometry.location.lat(),
        ];
      }

      // Create a formatted address line from individual components
      addressComponents.addressLine = `${
        addressComponents.streetNumber || ""
      } ${addressComponents.streetName || ""}, ${
        addressComponents.city || ""
      }, ${addressComponents.state || ""}, ${
        addressComponents.postalCode || ""
      }, ${addressComponents.country || ""}`.trim();

      setAddressDetails(addressComponents);
      onClickPlaceDetails(addressDetails);
    }
  };

  return (
    <Autocomplete
      inputValue={inputValue}
      onInputChange={(_, newInputValue) => {
        setInputValue(newInputValue);
        if (newInputValue) {
          fetchPlacePredictions(newInputValue);
        }
      }}
      options={options}
      getOptionLabel={(option) => option.description || ""}
      onChange={(_, value) => {
        if (value) {
          fetchPlaceDetails(value.place_id); // Fetch details of selected place
        }
      }}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search places"
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default GoogleMapsAutocomplete;
