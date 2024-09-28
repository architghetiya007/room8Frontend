import { ButtonGroupInterface } from "../types/comman/Hunter";
import useCommonTranslation from "./useCommonTranslation";

const useHunterData = () => {
  const { t } = useCommonTranslation();

  const accommodation: ButtonGroupInterface[] = [
    {
      name: t("accommodation.ENTIREROOM"),
      value: "ENTIREROOM",
    },
    {
      name: t("accommodation.SHAREDROOM"),
      value: "SHAREDROOM",
    },
    {
      name: t("accommodation.WHOLEPROPERTY"),
      value: "WHOLEPROPERTY",
    },
  ];

  const propertyTypes: ButtonGroupInterface[] = [
    {
      name: t("propertyTypes.FLAT"),
      value: "FLAT",
    },
    {
      name: t("propertyTypes.HOUSE"),
      value: "HOUSE",
    },
  ];

  const tenants: ButtonGroupInterface[] = [
    {
      name: t("tenants.NO_PREFERENCE"),
      value: "NO_PREFERENCE",
    },
    {
      name: t("tenants.02"),
      value: "02",
    },
    {
      name: t("tenants.03"),
      value: "03",
    },
    {
      name: t("tenants.04+"),
      value: "04+",
    },
  ];

  const roomsAmount: ButtonGroupInterface[] = [
    {
      name: t("roomsAmount.NO_PREFERENCE"),
      value: "NO_PREFERENCE",
    },
    {
      name: t("roomsAmount.01+"),
      value: "01+",
    },
    {
      name: t("roomsAmount.02+"),
      value: "02+",
    },
    {
      name: t("roomsAmount.03+"),
      value: "03+",
    },
  ];

  const bathroomsAmount: ButtonGroupInterface[] = [
    {
      name: t("bathroomsAmount.NO_PREFERENCE"),
      value: "NO_PREFERENCE",
    },
    {
      name: t("bathroomsAmount.01+"),
      value: "01+",
    },
    {
      name: t("bathroomsAmount.02+"),
      value: "02+",
    },
    {
      name: t("bathroomsAmount.03+"),
      value: "03+",
    },
  ];

  const duration: ButtonGroupInterface[] = [
    {
      name: t("duration.NO_PREFERENCE"),
      value: "NO_PREFERENCE  ",
    },
    {
      name: t("duration.1_WEEK"),
      value: "1_WEEK",
    },
    {
      name: t("duration.2_WEEK"),
      value: "2_WEEK",
    },
    {
      name: t("duration.1_MONTH"),
      value: "1_MONTH",
    },
    {
      name: t("duration.2_MONTH"),
      value: "2_MONTH",
    },
    {
      name: t("duration.3_MONTH"),
      value: "3_MONTH",
    },
    {
      name: t("duration.4_MONTH"),
      value: "4_MONTH",
    },
    {
      name: t("duration.6_MONTH"),
      value: "6_MONTH",
    },
    {
      name: t("duration.9_MONTH"),
      value: "9_MONTH",
    },
    {
      name: t("duration.12_MONTH"),
      value: "12_MONTH",
    },
  ];

  const whoAreYou: ButtonGroupInterface[] = [
    {
      name: t("whoAreYou.man"),
      value: "man",
    },
    {
      name: t("whoAreYou.woman"),
      value: "woman",
    },
    {
      name: t("whoAreYou.couple"),
      value: "couple",
    },
    {
      name: t("whoAreYou.groupFriends"),
      value: "groupFriends",
    },
  ];

  const yesNoOptions: ButtonGroupInterface[] = [
    {
      name: t("yesNoOptions.YES"),
      value: "YES",
    },
    {
      name: t("yesNoOptions.NO"),
      value: "NO",
    },
  ];

  const smokingOptions: ButtonGroupInterface[] = [
    {
      name: t("smokingOptions.YES"),
      value: "YES",
    },
    {
      name: t("smokingOptions.NO"),
      value: "NO",
    },
    {
      name: t("smokingOptions.OUTSIDE"),
      value: "OUTSIDE",
    },
  ];

  const genderOptions: ButtonGroupInterface[] = [
    {
      name: t("gender.MALE"),
      value: "MALE",
    },
    {
      name: t("gender.FEMALE"),
      value: "FEMALE",
    },
  ];

  const yesNoPreferenceOptions: ButtonGroupInterface[] = [
    {
      name: t("duration.NO_PREFERENCE"),
      value: "NO_PREFERENCE",
    },
    {
      name: t("smokingOptions.YES"),
      value: "YES",
    },
    {
      name: t("smokingOptions.NO"),
      value: "NO",
    },
    {
      name: t("smokingOptions.OUTSIDE"),
      value: "outside",
    },
  ];

  const commanPreferenceOptions: ButtonGroupInterface[] = [
    {
      name: t("commanOptions.NO_PREFERENCE"),
      value: "NO_PREFERENCE",
    },
    {
      name: t("commanOptions.YES"),
      value: "YES",
    },
    {
      name: t("commanOptions.NO"),
      value: "NO",
    },
  ];

  const parkingOptions: ButtonGroupInterface[] = [
    {
      name: t("parking.PUBLIC"),
      value: "PUBLIC",
    },
    {
      name: t("parking.DEDICATED"),
      value: "DEDICATED",
    },
    {
      name: t("parking.IN_THE_GARAGE"),
      value: "IN_THE_GARAGE",
    },
    {
      name: t("parking.NO_PREFERENCES"),
      value: "NO_PREFERENCES",
    },
  ];

  const kitchenOptions: ButtonGroupInterface[] = [
    {
      name: t("kitchen.SEPERATE"),
      value: "PUBLIC",
    },
    {
      name: t("kitchen.KICHENETTE"),
      value: "KICHENETTE",
    },
    {
      name: t("kitchen.NO_PREFERENCE"),
      value: "NO_PREFERENCE",
    }
  ];

  const maximumNumberOfpeopleOptions: ButtonGroupInterface[] = [
    {
      name: t("maximumNumberOfpeople.NO_PREFERENCE"),
      value: "NO_PREFERENCE",
    },
    {
      name: t("maximumNumberOfpeople.01"),
      value: "01",
    },
    {
      name: t("maximumNumberOfpeople.02"),
      value: "02",
    },
    {
      name: t("maximumNumberOfpeople.03"),
      value: "03",
    }
  ]

  return {
    accommodation,
    bathroomsAmount,
    propertyTypes,
    tenants,
    roomsAmount,
    duration,
    whoAreYou,
    yesNoOptions,
    smokingOptions,
    genderOptions,
    yesNoPreferenceOptions,
    commanPreferenceOptions,
    parkingOptions,
    kitchenOptions,
    maximumNumberOfpeopleOptions
  };
};

export default useHunterData;
