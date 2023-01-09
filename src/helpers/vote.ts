export const voteCountUpdater = (
  voteCount: number,
  vote: number,
  currentVote: number
) => {
  if (voteCount === 0 && currentVote === 0 && vote === 1) {
    return voteCount + 1;
  } else if (voteCount === 0 && currentVote === 0 && vote === -1) {
    return voteCount - 1;
  } else if (voteCount === 1 && currentVote === 1 && vote === -1) {
    return voteCount - 2;
  } else if (voteCount === 1 && currentVote === 1 && vote === 1) {
    return voteCount - 1;
  } else if (voteCount === -1 && currentVote === -1 && vote === -1) {
    return voteCount + 1;
  } else if (voteCount === -1 && currentVote === -1 && vote === 1) {
    return voteCount + 2;
  } else if (currentVote === 1 && vote === -1) {
    return voteCount - 1;
  } else if (currentVote === -1 && vote === 1) {
    return voteCount + 1;
  } else {
    return voteCount + vote;
  }
};
