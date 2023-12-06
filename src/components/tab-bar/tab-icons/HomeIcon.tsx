import Svg, { Path } from "react-native-svg";
import { colors } from "@src/styles/theme/colors";

interface TabIconProps {
    color?: string;
}

export const HomeIcon = ({ color }: TabIconProps) => {
    return (
        <Svg width="17" height="19" viewBox="0 0 17 19" fill="none">
            <Path
                d="M2.32178 15.9283H5.11253V11C5.11253 10.6808 5.22231 10.4114 5.44188 10.1919C5.66144 9.9723 5.93083 9.86252 6.25003 9.86252H10.25C10.5692 9.86252 10.8386 9.9723 11.0582 10.1919C11.2777 10.4114 11.3875 10.6808 11.3875 11V15.9283H14.1783V7.03589L8.25003 2.58969L2.32178 7.03589V15.9283ZM0.0467529 15.9283V7.03589C0.0467529 6.67636 0.126553 6.33575 0.286153 6.01407C0.44577 5.69238 0.668511 5.42592 0.954378 5.21469L6.88263 0.768491C7.28444 0.461974 7.74024 0.308716 8.25003 0.308716C8.75981 0.308716 9.21561 0.461974 9.61743 0.768491L15.5457 5.21469C15.8315 5.42592 16.0543 5.69238 16.2139 6.01407C16.3735 6.33575 16.4533 6.67636 16.4533 7.03589V15.9283C16.4533 16.558 16.2316 17.0946 15.7881 17.5381C15.3446 17.9816 14.808 18.2033 14.1783 18.2033H10.3397C10.0205 18.2033 9.75112 18.0935 9.53155 17.8739C9.31199 17.6544 9.2022 17.385 9.2022 17.0658V12.0478H7.29785V17.0658C7.29785 17.385 7.18807 17.6544 6.9685 17.8739C6.74894 18.0935 6.47955 18.2033 6.16035 18.2033H2.32178C1.69206 18.2033 1.15546 17.9816 0.711978 17.5381C0.268494 17.0946 0.0467529 16.558 0.0467529 15.9283Z"
                fill={color ?? colors.white}
            />
        </Svg>
    );
};
