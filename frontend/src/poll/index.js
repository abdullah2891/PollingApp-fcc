import {getPoll, castVote , createPoll, deletePoll} from './action';
import reduce from './reduce';

export const pollAction = {getPoll, castVote , createPoll, deletePoll};
export const pollReducer = reduce;
