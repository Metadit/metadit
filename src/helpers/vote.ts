export const voteCountUpdater = (
  threadVoteCount: number,
  vote: number,
  currentVote: number
) => {
  if (threadVoteCount === 0 && currentVote === 0 && vote === 1) {
    return threadVoteCount + 1;
  } else if (threadVoteCount === 0 && currentVote === 0 && vote === -1) {
    return threadVoteCount - 1;
  } else if (threadVoteCount === 1 && currentVote === 1 && vote === -1) {
    return threadVoteCount - 2;
  } else if (threadVoteCount === 1 && currentVote === 1 && vote === 1) {
    return threadVoteCount - 1;
  } else if (threadVoteCount === -1 && currentVote === -1 && vote === -1) {
    return threadVoteCount + 1;
  } else if (threadVoteCount === -1 && currentVote === -1 && vote === 1) {
    return threadVoteCount + 2;
  } else if (currentVote === 1 && vote === -1) {
    return threadVoteCount - 1;
  } else if (currentVote === -1 && vote === 1) {
    return threadVoteCount + 1;
  } else {
    return threadVoteCount + vote;
  }
};
