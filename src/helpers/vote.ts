const voteCountUpdater = (
    voteCount: number, // the count of votes for a thread or comment
    vote: number,
    currentVote: number
) => {
    // if thread or comment has vote count of 0
    if (voteCount === 0 && currentVote === 0 && vote === 1) {
        return voteCount + 1;
    } else if (voteCount === 0 && currentVote === 0 && vote === -1) {
        return voteCount - 1;
    }

    // if user has already voted up and thread has vote count of 1 and they downvote
    else if (voteCount === 1 && currentVote === 1 && vote === -1) {
        return voteCount - 2;
        // if user has already voted down and thread has vote count of -1 and they upvote
    } else if (voteCount === -1 && currentVote === -1 && vote === 1) {
        return voteCount + 2;

        // if thread or comment has vote count of 1 because of the users upvote, and they want to upvote again
    } else if (voteCount === 1 && currentVote === 1 && vote === 1) {
        return voteCount - 1;
        // if thread or comment has vote count of -1 because of the users downvote, and they want to downvote again
    } else if (voteCount === -1 && currentVote === -1 && vote === -1) {
        return voteCount + 1;
    }

    // if their current vote is equal to the vote they want to make
    else if (currentVote === -1 && vote === -1) {
        return voteCount + 1;
    } else if (currentVote === 1 && vote === 1) {
        return voteCount - 1;
    }

    // if user has not voted and they want to upvote
    else if (currentVote === 0 && vote === 1) {
        return voteCount + 1;
        // if user has not voted and they want to downvote
    } else if (currentVote === 0 && vote === -1) {
        return voteCount - 1;
    }

    // if the user has voted up, and they want to downvote
    else if (currentVote === 1 && vote === -1) {
        return voteCount - 2;
        // if the user has voted down, and they want to upvote
    } else if (currentVote === -1 && vote === 1) {
        return voteCount + 2;
    }

    return voteCount + vote;
};

export default voteCountUpdater;
