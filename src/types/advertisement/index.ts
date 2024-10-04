import { BaseResponse } from "../comman/BaseResponse";

interface AnotherPerson {
  name: string;
  age: number;
  gender: string;
}

interface Address {
  streetNumber?: string; // Optional: street number
  streetName?: string; // Optional: street name
  city?: string; // Optional: city name
  state?: string; // Optional: state or region
  country?: string; // Optional: country name
  postalCode?: string; // Optional: postal code
  addressLine?: string; // Optional: full address line
  formattedAddress?: string; // Optional: formatted address for display
  coordinates?: number[]; // Allowing any number of coordinates
}

export interface HunterRequestDTO {
  accommodation?: string;
  typeOfProperty?: string;
  acceptableRentRange?: number[];
  maximumDeposit?: number;
  whenYouWouldLikeMoveIn?: number;
  preferredLengthToStay?: string;
  address?: Address;
  rangeFromCoordinate?: number;
  minimumPropertySize?: number;
  minimumNumberOfTenants?: string;
  roomAmount?: string;
  bathroomAmount?: string;
  parking?: string;
  furnished?: string;
  kitchen?: string;
  balcony?: string;
  maximumNumberOfpeople?: number;
  minimumRoomSize?: number;
  furnishedRoom?: string;
  privateBathroom?: string;
  balconyInRoom?: string;
  whoAreYou?: string;
  name?: string;
  age?: number;
  withChild?: string;
  havePet?: string;
  typeOfEmployment?: string;
  areYouSmoking?: string;
  anotherPerson?: AnotherPerson[];
  flatmatePreference?: string[];
  livingWithOwner?: string;
  tenantsWithChildren?: string;
  acceptPet?: string;
  acceptSmoking?: string;
  photos?: string;
  describeYourSelf?: string;
}

export interface LandlordRequestDTO {
  propertyOffer?: string;
  typeofProperty?: string;
  address?: Address;
  doYouLiveHere?: string;
  ownerLiveHere?: string;
  howmanyPeopleLive?: string; // Changed to number for numeric value
  propertySize?: string; // Kept as number, can be refined further
  roomsAmount?: string; // Made optional
  floor?: string;
  numberOfFloor?: string;
  liftInBuilding?: string;
  isApartmentFurnished?: string; // Using enum for better type safety
  kitchen?: string; // Made optional
  parking?: string; // Made optional
  balconyInApartment?: string;
  roomSize?: number; // Kept as number, can be refined further
  howManyPeopleInRoom?: number; // Changed to number for numeric value
  isRoomFurnished?: string; // Using enum for better type safety
  bed?: string; // Made optional
  privateBathroom?: boolean;
  doesRoomHaveBalcony?: boolean;
  dateAvailable?: Date; // Changed to Date type
  minimumStay?: string; // Consider specifying format (e.g., '1 month')
  maximumStay?: string; // Consider specifying format (e.g., '12 months')
  rentPerMonth?: number; // Made optional
  billIncludeInRent?: boolean; // Changed to boolean for clarity
  deposit?: number; // Made optional
  descriptionOfFlat?: string; // Made optional
  photosOfPlace?: string[]; // Made optional
  whoAreYou?: string; // Made optional
  name?: string; // Made optional
  age?: number; // Made optional
  haveAnyChildren?: boolean; // Made optional
  havePet?: boolean; // Made optional
  typeOfEmployment?: string; // Using enum for better type safety
  doYouSmoke?: string; // Using enum for better type safety
  descriptionAbout?: string; // Made optional
  flatmateAccepting?: string[]; // Made optional
  ageOfFutureRoomMate?: number[]; // Made optional
  acceptTenantWithChildren?: boolean; // Changed to boolean for clarity
  acceptPets?: boolean; // Changed to boolean for clarity
  acceptSmoking?: boolean; // Changed to boolean for clarity
  flatmatePhoto?: string; // Made optional
  profilePhoto?: string; // Made optional
  genderOfCurrentTenants?: string; // Using enum for better type safety
  currentTenantsName?: string; // Made optional
  ageOfCurrentTenants?: number; // Made optional
  doChildrenLiveHere?: boolean; // Made optional
  isPetLivingInApartment?: boolean; // Made optional
  currentTenantsEmployment?: string; // Using enum for better type safety
  tenantsSmoking?: string; // Using enum for better type safety
  preferenceOfFutureTenants?: string[]; // Made optional
  ageRangeOfFutureRoommate?: number[]; // Made optional
  tenantAcceptPets?: boolean; // Changed to boolean for clarity
  tenantAcceptSmoking?: boolean; // Changed to boolean for clarity
}
export interface AdvertisementRequestDTO {
  advertiseType: string;
  hunterData?: HunterRequestDTO;
  landlordData?: LandlordRequestDTO;
}

export interface AdvertisementData {
  userId: string;
  advertiseType: string;
  hunterData?: HunterRequestDTO; // Nested HunterData interface
  landlordData?: LandlordRequestDTO; // Assuming landlordData can be any type or null
  isActive: boolean;
  _id: string; // MongoDB ObjectId
  createdAt: string; // ISO 8601 date string
  updatedAt: string; // ISO 8601 date string
  __v: number; // Version key
}

export interface AdvertisementResponseDTO extends BaseResponse {
  data: AdvertisementData;
}

export interface ListAdvertisementResponseDTO extends BaseResponse {
  data: AdvertisementData[];
}

export interface AdvertisementStatusRequestDTO {
  id: string;
  isActive: boolean;
}
