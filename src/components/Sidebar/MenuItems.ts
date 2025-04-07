import {
  IconUsers,
  IconBriefcase,
  IconBuildingBank,
  IconHomeHeart,
  IconActivity,
  IconBrain,
  IconUserHeart,
  IconUsersGroup,
  IconPoint,
} from "@tabler/icons-react";
import { uniqueId } from "lodash";
import { useAppContext } from "../../context/Context";

export default function useMenuItems() {
  const { valueTypes, valueNodes } = useAppContext();

  const icons = [
    IconBuildingBank, // Financial Security
    IconUsers, // Social Security
    IconBriefcase, // Job Skills
    IconHomeHeart, // Family Oriented-Skills
    IconActivity, // Physical Health
    IconBrain, // Mental Health
    IconUserHeart, // Supporting Loved Ones
    IconUsersGroup, // Supporting Others Like Us
  ];

  const dynamicCategoryItems = valueTypes.map((title, index) => ({
    id: uniqueId(),
    title,
    icon: icons[index] || IconPoint,
    node: valueNodes[index],
  }));

  return [
    {
      navlabel: true,
      subheader: "Categories",
    },
    ...dynamicCategoryItems,
  ];
}
