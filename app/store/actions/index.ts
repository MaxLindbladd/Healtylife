import { ActionTypes, INCREMENT_STEPS, ADD_CREDITS } from '../types';

export const incrementSteps = (amount: number): ActionTypes => ({
  type: INCREMENT_STEPS,
  payload: amount
});

export const addCredits = (amount: number): ActionTypes => ({
  type: ADD_CREDITS,
  payload: amount
});
