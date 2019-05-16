import {getPoll, castVote , createPoll} from './action';
import reduce from './reduce';

export const pollAction = {getPoll, castVote , createPoll};
export const pollReducer = reduce;
