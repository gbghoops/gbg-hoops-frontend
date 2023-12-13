import { widthNormalized as wn } from "@src/utils/normalize-dimensions";

const defaultSizes = {
    small: 10,
    medium: 14,
    large: 18,
    true: 14,
    spacing20: wn(20),
    ".5": 0.5,
    1: wn(1),
    2: wn(2),
    4: wn(4),
    5: wn(5),
    6: wn(6),
    8: wn(8),
    10: wn(10),
    12: wn(12),
    14: wn(14),
    15: wn(15),
    16: wn(16),
    18: wn(18),
    20: wn(20),
    22: wn(22),
    24: wn(24),
    26: wn(26),
    28: wn(28),
    30: wn(30),
    32: wn(32),
    34: wn(34),
    36: wn(36),
    35: wn(35),
    38: wn(38),
    40: wn(40),
    42: wn(42),
    44: wn(44),
    45: wn(45),
    46: wn(46),
    48: wn(48),
    50: wn(50),
    52: wn(52),
    54: wn(54),
    56: wn(56),
    58: wn(58),
    55: wn(55),
    60: wn(60),
    62: wn(62),
    64: wn(64),
    65: wn(65),
    66: wn(66),
    68: wn(68),
    70: wn(70),
    72: wn(72),
    74: wn(74),
    75: wn(75),
    76: wn(76),
    78: wn(78),
    80: wn(80),
    82: wn(82),
    84: wn(84),
    85: wn(85),
    86: wn(86),
    88: wn(88),
    90: wn(90),
    92: wn(92),
    94: wn(94),
    95: wn(95),
    96: wn(96),
    98: wn(98),
    100: wn(100),
    102: wn(102),
    104: wn(104),
    105: wn(105),
    106: wn(106),
    108: wn(108),
    110: wn(110),
    112: wn(112),
    114: wn(114),
    115: wn(115),
    116: wn(116),
    118: wn(118),
    120: wn(120),
    122: wn(122),
    124: wn(124),
    125: wn(125),
    126: wn(126),
    128: wn(128),
    130: wn(130),
    132: wn(132),
    134: wn(134),
    135: wn(135),
    136: wn(136),
    138: wn(138),
    140: wn(140),
    200: wn(200),
    220: wn(220),
    280: wn(280),
    400: wn(400),
};

export const sizes = {
    default: defaultSizes,
    p: defaultSizes,
    headings: {
        ...defaultSizes,
        small: wn(16),
        medium: wn(20),
        large: wn(24),
        true: wn(20),
    },
    spacing: defaultSizes,
};
