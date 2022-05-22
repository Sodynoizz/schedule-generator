import { hexToRgbA } from "@utils/hexToRgb"

type ColorType = {
  r: string
  g: string
  b: string
  a: string
}

export interface ColorTheme {
  name: string
  bg: ColorType
  t1: ColorType
  t2: ColorType
  c1: ColorType
  c2: ColorType
  c3: ColorType
  c4: ColorType
  c5: ColorType
}

export const DefaultTheme: Record<string, ColorTheme> = {
  Christmas: {
    name: "Christmas",
    bg: hexToRgbA("#FFFFFF"),
    t1: hexToRgbA("#A40A14"),
    t2: hexToRgbA("#2B4A05"),
    c1: hexToRgbA("#4B6C57"),
    c2: hexToRgbA("#718049"),
    c3: hexToRgbA("#B19B8C"),
    c4: hexToRgbA("#9A715D"),
    c5: hexToRgbA("#B0000C"),
  },
  Pink: {
    name: "Tooth Fairy",
    bg: hexToRgbA("#FFFFFF"),
    t1: hexToRgbA("#D2488B"),
    t2: hexToRgbA("#EAA4C6"),
    c1: hexToRgbA("#EDB7D2"),
    c2: hexToRgbA("#EAA4C6"),
    c3: hexToRgbA("#E387B3"),
    c4: hexToRgbA("#DD6EA5"),
    c5: hexToRgbA("#CF5893"),
  },
  Purple: {
    name: "The Witches’ Craft",
    bg: hexToRgbA("#FFFFFF"),
    t1: hexToRgbA("#8861DC"),
    t2: hexToRgbA("#B99CF8"),
    c1: hexToRgbA("#B99CF8"),
    c2: hexToRgbA("#A787EC"),
    c3: hexToRgbA("#916CDF"),
    c4: hexToRgbA("#8860DC"),
    c5: hexToRgbA("#7754C1"),
  },
  Red: {
    name: "Bloody Mary",
    bg: hexToRgbA("#FFFFFF"),
    t1: hexToRgbA("#D17474"),
    t2: hexToRgbA("#E28B8B"),
    c1: hexToRgbA("#EBB8B8"),
    c2: hexToRgbA("#E49E9E"),
    c3: hexToRgbA("#E08484"),
    c4: hexToRgbA("#D17474"),
    c5: hexToRgbA("#BA5757"),
  },
  Blue: {
    name: "Fairy Godmother",
    bg: hexToRgbA("#FFFFFF"),
    t1: hexToRgbA("#53ABDC"),
    t2: hexToRgbA("#88CBF1"),
    c1: hexToRgbA("#9CD7F8"),
    c2: hexToRgbA("#88CBF1"),
    c3: hexToRgbA("#65BDEE"),
    c4: hexToRgbA("#53ABDC"),
    c5: hexToRgbA("#2B96D2"),
  },
  Orange: {
    name: "Jack O’Lantern",
    bg: hexToRgbA("#FFFFFF"),
    t1: hexToRgbA("#EA984D"),
    t2: hexToRgbA("#F8BA82"),
    c1: hexToRgbA("#F8BA82"),
    c2: hexToRgbA("#F1AB6A"),
    c3: hexToRgbA("#EA984D"),
    c4: hexToRgbA("#DD8E44"),
    c5: hexToRgbA("#D3741A"),
  },
  Black: {
    name: "Dracula Untold",
    bg: hexToRgbA("#FFFFFF"),
    t1: hexToRgbA("#828282"),
    t2: hexToRgbA("#A8A8A8"),
    c1: hexToRgbA("#ADADAD"),
    c2: hexToRgbA("#989898"),
    c3: hexToRgbA("#828282"),
    c4: hexToRgbA("#7C7C7C"),
    c5: hexToRgbA("#616161"),
  },
  Green: {
    name: "Mr. Frankenstein",
    bg: hexToRgbA("#FFFFFF"),
    t1: hexToRgbA("#96C060"),
    t2: hexToRgbA("#B5D889"),
    c1: hexToRgbA("#BDDB99"),
    c2: hexToRgbA("#B5D889"),
    c3: hexToRgbA("#A8D174"),
    c4: hexToRgbA("#96C060"),
    c5: hexToRgbA("#7FAE42"),
  },
}
