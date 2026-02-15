import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Insight, SolutionFeature, RangeScenario } from '../backend';

export function useGetInsights() {
  const { actor, isFetching } = useActor();

  return useQuery<Insight[]>({
    queryKey: ['insights'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getInsights();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetSolutionFeatures() {
  const { actor, isFetching } = useActor();

  return useQuery<SolutionFeature[]>({
    queryKey: ['solutionFeatures'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getSolutionFeatures();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetRangeScenarios() {
  const { actor, isFetching } = useActor();

  return useQuery<RangeScenario[]>({
    queryKey: ['rangeScenarios'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getRangeScenarios();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetInteractionStats() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['interactionStats'],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getInteractionStats();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useRecordInteraction() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      scenarioId,
      selectedFeatureId,
      userInput,
      screen,
    }: {
      scenarioId: bigint;
      selectedFeatureId: bigint | null;
      userInput: string;
      screen: string;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.recordInteraction(scenarioId, selectedFeatureId, userInput, screen);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['interactionStats'] });
    },
  });
}
