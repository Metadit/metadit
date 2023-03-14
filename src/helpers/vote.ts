type VoteCountUpdater = (
    count: number,
    vote: 1 | -1,
    current: 1 | -1 | 0
) => number;

const voteCountUpdater: VoteCountUpdater = (count, vote, current) => {

    // vote map for threads with 0, 1 and -1 votes

    const voteMap: Record<string, number> = {
        "0-1-0": 1,
        "1-1-1": count - 1,
        "1-1-0": count + 1,
        "1--1-1": count - 2,
        "-1-1--1": count + 2,
        "-1--1--1": count + 1,
        "0--1--1": count + 1,
    };

    // handling threads with votes greater than or equal to 1
    if (count >= 1) {
        if (vote === 1 && current === 1) {
            return count - 1;
        } else if (vote === 1 && current === 0) {
            return count + 1;
        }
    }

    // handling threads with votes greater than -1
    if (count >= -1) {
        if (vote === -1 && current === -1) {
            return count + 1;
        } else if (vote === -1 && current === 0) {
            return count - 1;
        }
    }

    const key = `${count}-${vote}-${current}`;
    return voteMap[key] ?? count + vote;
};

export default voteCountUpdater;
