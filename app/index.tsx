import React from 'react';
import { View, Text, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store/types';
import { fetchAndIncrementSteps, addCredits } from './store/actions/thunks';

const App: React.FC = () => {
  const steps = useSelector((state: RootState) => state.steps.steps);
  const credits = useSelector((state: RootState) => state.credits.credits);
  const dispatch = useDispatch();

  const handleAddCredits = () => {
    dispatch(addCredits(10)); // Example: Add 10 credits
  };

  const handleFetchSteps = () => {
    dispatch(fetchAndIncrementSteps()); // Simulated asynchronous action
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Steps: {steps}</Text>
      <Text>Credits: {credits}</Text>
      <Button title="Fetch Steps" onPress={handleFetchSteps} />
      <Button title="Add Credits" onPress={handleAddCredits} />
    </View>
  );
};

export default App;
