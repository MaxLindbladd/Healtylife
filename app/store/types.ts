// State types
export interface RootState {
    steps: StepsState;
    credits: CreditsState;
  }
  
  export interface StepsState {
    steps: number;
  }
  
  export interface CreditsState {
    credits: number;
  }
  
  // Action types
  export const INCREMENT_STEPS = 'INCREMENT_STEPS';
  export const ADD_CREDITS = 'ADD_CREDITS';
  
  interface IncrementStepsAction {
    type: typeof INCREMENT_STEPS;
    payload: number;
  }
  
  interface AddCreditsAction {
    type: typeof ADD_CREDITS;
    payload: number;
  }
  
  export type ActionTypes = IncrementStepsAction | AddCreditsAction;
  