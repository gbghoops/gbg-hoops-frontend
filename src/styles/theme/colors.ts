export const base = {
    gold: "#FDBF0B",
    deep_grey: "#212121",
    grey: "#353535",
    white: "#FFFFFF",
    gold_hightlight: "#FFF415",
    gold_hot: "#FD901B",
    gold_dominant: "#A35614",
    grey_accent: "#A4A4A4",
    black: "#000000",
    transparent: "rgba(0, 0, 0, 0)",
    transclucent_dark_80: "rgba(0, 0, 0, 0.8)",
    error_red: "#FF6948",
};
export const colors = {
    ...base,

    accent_hightlight: base.gold_hightlight,
    accent_hot: base.gold_hot,
    accent_dominant: base.gold_dominant,
    accent_grey: base.grey_accent,

    surface_primary: base.grey,
    surface_secondary: base.white,
    surface_background: base.deep_grey,
    surface_foreground: base.white,
    surface_brand: base.gold,
    surface_accent: base.grey_accent,

    text_primary: base.white,
    text_secondary: base.grey,
    text_brand: base.gold,
    text_accent: base.grey_accent,

    border_primary: base.grey_accent,
    border_brand: base.gold,

    error_primary: base.error_red,
};
