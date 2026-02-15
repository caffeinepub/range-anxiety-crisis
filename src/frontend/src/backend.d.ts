import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface RangeScenario {
    id: bigint;
    rangeEstimate: string;
    name: string;
    description: string;
    uncertaintyBand: string;
}
export interface Insight {
    id: bigint;
    title: string;
    implications: string;
    summary: string;
}
export interface SolutionFeature {
    id: bigint;
    estimatedImpact: string;
    name: string;
    description: string;
}
export interface backendInterface {
    getInsights(): Promise<Array<Insight>>;
    getInteractionStats(): Promise<{
        scenarioBreakdown: Array<[bigint, bigint]>;
        screenBreakdown: Array<[string, bigint]>;
        totalInteractions: bigint;
    }>;
    getRangeScenarios(): Promise<Array<RangeScenario>>;
    getSolutionFeatures(): Promise<Array<SolutionFeature>>;
    initializeRangeData(): Promise<void>;
    recordInteraction(scenarioId: bigint, selectedFeatureId: bigint | null, userInput: string, screen: string): Promise<void>;
    resetDemoData(): Promise<boolean>;
}
