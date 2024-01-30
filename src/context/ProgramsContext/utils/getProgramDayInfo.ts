import { ProgramWeek } from "../types";

interface GetDayArgs {
    week: ProgramWeek;
    day: number;
}
const getProgramDayInfo = ({ week, day }: GetDayArgs) => {
    switch (day) {
        case 1:
            return { dayData: week["day_1"], dayMemo: week["day_1_memo"] };
        case 2:
            return { dayData: week["day_2"], dayMemo: week["day_2_memo"] };
        case 3:
            return { dayData: week["day_3"], dayMemo: week["day_3_memo"] };
        case 4:
            return { dayData: week["day_4"], dayMemo: week["day_4_memo"] };
        case 5:
            return { dayData: week["day_5"], dayMemo: week["day_5_memo"] };
        default:
            return { dayData: week["day_1"], dayMemo: week["day_1_memo"] };
    }
};

export default getProgramDayInfo;
