import { CreditsState, ActionTypes, ADD_CREDITS } from '../types';

const initialState: CreditsState = {
  credits: 0
};

const creditsReducer = (state = initialState, action: ActionTypes): CreditsState => {
  switch (action.type) {
    case ADD_CREDITS:
      return {
        ...state,
        credits: state.credits + action.payload
      };
    default:
      return state;
  }
};

export default creditsReducer;
