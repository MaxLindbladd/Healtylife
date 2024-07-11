import { StepsState, ActionTypes, INCREMENT_STEPS } from '../types';

const initialState: StepsState = {
  steps: 0
};

const stepsReducer = (state = initialState, action: ActionTypes): StepsState => {
  switch (action.type) {
    case INCREMENT_STEPS:
      return {
        ...state,
        steps: state.steps + action.payload
      };
    default:
      return state;
  }
};

export default stepsReducer;
