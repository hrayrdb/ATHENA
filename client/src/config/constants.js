import {  fileIcon, ai, mic ,chat , info , timer , typing } from "../assets";

export const EditorTabs = [
  {
    name: "chat",
    icon: chat,
  },
  {
    name: "sessioninfo",
    icon: info,
  },
  {
    name: "timer",
    icon: timer,
  },
];

export const FilterTabs = [
  {
    name: "Text",
    icon: typing,
  },
  {
    name: "Mic",
    icon: mic,
  },
];

export const DecalTypes = {
  logo: {
    stateProperty: "logoDecal",
    filterTab: "logoShirt",
  },
  full: {
    stateProperty: "fullDecal",
    filterTab: "stylishShirt",
  },
};
