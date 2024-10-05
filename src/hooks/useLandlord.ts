import { ButtonGroupInterface } from "../types/comman/Hunter";
import useCommonTranslation from "./useCommonTranslation";

const useLandlord = () => {
  const { t } = useCommonTranslation();

  const propertyOfferOptions: ButtonGroupInterface[] = [
    {
      name: t("landlord.propertyOfferOptions.ENTIREROOM"),
      value: "ENTIREROOM",
    },
    {
      name: t("landlord.propertyOfferOptions.SHAREDROOM"),
      value: "SHAREDROOM",
    },
    {
      name: t("landlord.propertyOfferOptions.WHOLEPROPERTY"),
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

  const howmanyPeopleLive: ButtonGroupInterface[] = [
    {
      name: t("landlord.howmanyPeopleLive.01"),
      value: "01",
    },
    {
      name: t("landlord.howmanyPeopleLive.02"),
      value: "02",
    },
    {
      name: t("landlord.howmanyPeopleLive.02"),
      value: "03",
    },
    {
      name: t("landlord.howmanyPeopleLive.04+"),
      value: "04+",
    },
  ];

  const IsApartmentFurnished: ButtonGroupInterface[] = [
    {
      name: t("landlord.IsApartmentFurnished.FULLY"),
      value: "FULLY",
    },
    {
      name: t("landlord.IsApartmentFurnished.PARTIALLY"),
      value: "PARTIALLY",
    },
    {
      name: t("landlord.IsApartmentFurnished.NO"),
      value: "NO",
    },
  ];

  const kitchenOptions: ButtonGroupInterface[] = [
    {
      name: t("landlord.kitchen.SEPARATE"),
      value: "SEPARATE",
    },
    {
      name: t("landlord.kitchen.KICHENETTE"),
      value: "KICHENETTE",
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
      name: t("parking.NO_PREFERENCE"),
      value: "NO_PREFERENCE",
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

  const howManyPropleInRoom: ButtonGroupInterface[] = [
    {
      name: t("landlord.howManyPropleInRoom.01"),
      value: "01",
    },
    {
      name: t("landlord.howManyPropleInRoom.02"),
      value: "02",
    },
    {
      name: t("landlord.howManyPropleInRoom.03+"),
      value: "03+",
    },
  ];

  const yesNoPartiallyOptions: ButtonGroupInterface[] = [
    {
      name: t("landlord.yesNoPartiallyOptions.YES"),
      value: "YES",
    },
    {
      name: t("landlord.yesNoPartiallyOptions.NO"),
      value: "NO",
    },
    {
      name: t("landlord.yesNoPartiallyOptions.PARTIALLY"),
      value: "PARTIALLY",
    },
  ];

  const bedOptions: ButtonGroupInterface[] = [
    {
      name: t("landlord.bedOptions.SINGLE"),
      value: "SINGLE",
    },
    {
      name: t("landlord.bedOptions.DOUBLE"),
      value: "DOUBLE",
    },
    {
      name: t("landlord.bedOptions.COUCH"),
      value: "COUCH",
    },
    {
      name: t("landlord.bedOptions.NOBED"),
      value: "NOBED",
    },
  ];


  const yesNoOutside: ButtonGroupInterface[] = [
    {
      name: t("yesNoOutside.YES"),
      value: "YES",
    },
    {
      name: t("yesNoOutside.NO"),
      value: "yesNoOutside",
    },
    {
      name: t("smokingOptions.OUTSIDE"),
      value: "OUTSIDE",
    },
  ];

  const iamAcceptingOptions: ButtonGroupInterface[] = [
    {
      name: t("landlord.iamAccepting.MAN"),
      value: "MAN",
    },
    {
      name: t("landlord.iamAccepting.WOMAN"),
      value: "WOMAN",
    },
    {
      name: t("landlord.iamAccepting.COUPLE"),
      value: "COUPLE",
    },
    {
      name: t("landlord.iamAccepting.GROUPSFRIENDS"),
      value: "GROUPSFRIENDS",
    },
  ];

  const whoAreYou: ButtonGroupInterface[] = [
    {
      name: t("whoAreYou.MEN"),
      value: "MEN",
    },
    {
      name: t("whoAreYou.WOMEN"),
      value: "WOMEN",
    },
    {
      name: t("whoAreYou.COUPLE"),
      value: "COUPLE",
    },
    {
      name: t("whoAreYou.GROUP_FRIEND"),
      value: "GROUP_FRIEND ",
    },
  ];

  const roomsAmount: ButtonGroupInterface[] = [
    {
      name: t("landlord.roomsAmount.STUDIO"),
      value: "STUDIO",
    },
    {
      name: t("landlord.roomsAmount.01"),
      value: "01",
    },
    {
      name: t("landlord.roomsAmount.02"),
      value: "02",
    },
    {
      name: t("landlord.roomsAmount.03+"),
      value: "03+",
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
    {
        name: t("smokingOptions.NO_PREFERENCE"),
        value: "NO_PREFERENCE",
      },
  ];

  return {
    propertyOfferOptions,
    propertyTypes,
    yesNoOptions,
    howmanyPeopleLive,
    IsApartmentFurnished,
    kitchenOptions,
    parkingOptions,
    howManyPropleInRoom,
    yesNoPartiallyOptions,
    bedOptions,
    yesNoOutside,
    iamAcceptingOptions,
    roomsAmount,
    whoAreYou,
    commanPreferenceOptions,
    smokingOptions
  };
};

export default useLandlord;
