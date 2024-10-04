import { ButtonGroupInterface } from "../types/comman/Hunter";
import useCommonTranslation from "./useCommonTranslation";

const useLandlord = () => {
  const { t } = useCommonTranslation();

  const propertyOfferOptions: ButtonGroupInterface[] = [
    {
      name: t('landlord.propertyOfferOptions.ENTIREROOM'),
      value: "ENTIREROOM",
    },
    {
      name: t('landlord.propertyOfferOptions.SHAREDROOM'),
      value: "SHAREDROOM",
    },
    {
      name: t('landlord.propertyOfferOptions.WHOLEPROPERTY'),
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
        value: '01'
    },
    {
        name: t("landlord.howmanyPeopleLive.02"),
        value: '02'
    },
    {
        name: t("landlord.howmanyPeopleLive.02"),
        value: '03'
    },
    {
        name: t("landlord.howmanyPeopleLive.04+"),
        value: '04+'
    }
  ];

  const IsApartmentFurnished: ButtonGroupInterface[] = [
    {
        name: t("landlord.IsApartmentFurnished.FULLY"),
        value: 'FULLY'
    },
    {
        name: t("landlord.IsApartmentFurnished.PARTIALLY"),
        value: 'PARTIALLY'
    },
    {
        name: t("landlord.IsApartmentFurnished.NO"),
        value: 'NO'
    }
  ];

  const kitchenOptions: ButtonGroupInterface[] = [
    {
        name: t('landlord.kitchen.SEPARATE'),
        value: "SEPARATE"
    },
    {
        name: t('landlord.kitchen.KICHENETTE'),
        value: "KICHENETTE"
    }
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

  return {
    propertyOfferOptions,
    propertyTypes,
    yesNoOptions,
    howmanyPeopleLive,
    IsApartmentFurnished,
    kitchenOptions,
    parkingOptions
  };
};

export default useLandlord;
