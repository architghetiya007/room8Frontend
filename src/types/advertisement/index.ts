interface AnotherPerson {
  name: string;
  age: number;
  gender: string;
}

export interface HunterRequestDTO {
  accommodation: string;
  typeOfProperty: string;
  acceptableRentRange: number[];
  maximumDeposit: number;
  whenYouWouldLikeMoveIn: number;
  preferredLengthToStay: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
    coordinate: number[];
    rowText: string;
  };
  rangeFromCoordinate: number;
  minimumPropertySize: number;
  minimumNumberOfTenants: string;
  roomAmount: string;
  bathroomAmount: string;
  parking: string;
  furnished: string;
  kitchen: string;
  balcony: string;
  maximumNumberOfpeople: number;
  minimumRoomSize: number;
  furnishedRoom: string;
  privateBathroom: string;
  balconyInRoom: string;
  whoAreYou: string;
  name: string;
  age: number;
  withChild: string;
  havePet: string;
  typeOfEmployment: string;
  areYouSmoking: string;
  anotherPerson: AnotherPerson[];
  flatmatePreference: string[];
  livingWithOwner: string;
  tenantsWithChildren: string;
  acceptPet: string;
  acceptSmoking: string;
  photos: string;
  describeYourSelf: string;
}

export interface LandlordRequestDTO {}

export interface AdvertisementRequestDTO {
  advertiseType: string;
  hunterData?: HunterRequestDTO;
  landlordData?: LandlordRequestDTO;
}
