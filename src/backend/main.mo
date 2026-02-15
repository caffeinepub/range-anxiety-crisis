import Map "mo:core/Map";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";

actor {
  type Insight = {
    id : Nat;
    title : Text;
    summary : Text;
    implications : Text;
  };

  type SolutionFeature = {
    id : Nat;
    name : Text;
    description : Text;
    estimatedImpact : Text;
  };

  type DemoInteraction = {
    timestamp : Int;
    scenarioId : Nat;
    selectedFeatureId : ?Nat;
    userInput : Text;
    screen : Text;
  };

  type RangeScenario = {
    id : Nat;
    name : Text;
    description : Text;
    rangeEstimate : Text;
    uncertaintyBand : Text;
  };

  let insights = Map.singleton<Nat, Insight>(
    0,
    {
      id = 0;
      title = "Root Causes of Range Anxiety";
      summary = "Customer feedback and data analysis reveal that range anxiety is primarily driven by perceived stranding risk, unreliable range estimates, and uncertainty during long trips.";
      implications = "Addressing these pain points requires a holistic approach that improves estimate accuracy, provides trip planning with charging confidence, and delivers proactive guidance to manage range variance.";
    },
  );

  let solutionFeatures = Map.empty<Nat, SolutionFeature>();
  let rangeScenarios = Map.empty<Nat, RangeScenario>();
  let demoInteractions = Map.empty<Nat, DemoInteraction>();
  var nextInteractionId = 0;

  public shared ({ caller }) func initializeRangeData() : async () {
    // Add Solution Features
    solutionFeatures.add(
      0,
      {
        id = 0;
        name = "Calibrated Range Estimate with Uncertainty Bands";
        description = "Provides real-time range estimates using current driving data, environmental conditions, and historical behavior. Includes clear risk bands to help drivers understand worst-case scenarios.";
        estimatedImpact = "Reduces range estimation error by 20-30%, increasing driver confidence.";
      },
    );

    solutionFeatures.add(
      1,
      {
        id = 1;
        name = "Trip Planning with Charging Stop Confidence";
        description = "Assists in planning long trips by optimizing charging stops based on real-world charging speeds, location availability, and predicted consumption patterns.";
        estimatedImpact = "Decreases charging-related anxiety and improves trip time predictability.";
      },
    );

    // Add Range Scenarios
    rangeScenarios.add(
      0,
      {
        id = 0;
        name = "Urban Commute";
        description = "Short city trips with frequent stops and low average speed.";
        rangeEstimate = "270 km (± 10%)";
        uncertaintyBand = "243-297 km (95% confidence)";
      },
    );

    rangeScenarios.add(
      1,
      {
        id = 1;
        name = "Highway Travel";
        description = "Constant high-speed driving on highways.";
        rangeEstimate = "200 km (± 15%)";
        uncertaintyBand = "170-230 km (95% confidence)";
      },
    );

    rangeScenarios.add(
      2,
      {
        id = 2;
        name = "Long-Distance Trip with Charging Stops";
        description = "Mix of highway and city driving with planned charging interruptions.";
        rangeEstimate = "350 km (including one fast charge)";
        uncertaintyBand = "315-385 km (95% confidence)";
      },
    );

    rangeScenarios.add(
      3,
      {
        id = 3;
        name = "Extremely Hot Weather";
        description = "Increased AC usage and high battery temperature impact.";
        rangeEstimate = "180 km (± 20%)";
        uncertaintyBand = "144-216 km (95% confidence)";
      },
    );

    rangeScenarios.add(
      4,
      {
        id = 4;
        name = "Mountainous Terrain";
        description = "Significant elevation changes leading to variable consumption rates.";
        rangeEstimate = "220 km (± 25%)";
        uncertaintyBand = "165-275 km (95% confidence)";
      },
    );
  };

  public query ({ caller }) func getInsights() : async [Insight] {
    insights.values().toArray();
  };

  public query ({ caller }) func getSolutionFeatures() : async [SolutionFeature] {
    solutionFeatures.values().toArray();
  };

  public query ({ caller }) func getRangeScenarios() : async [RangeScenario] {
    rangeScenarios.values().toArray();
  };

  public shared ({ caller }) func recordInteraction(scenarioId : Nat, selectedFeatureId : ?Nat, userInput : Text, screen : Text) : async () {
    switch (rangeScenarios.get(scenarioId)) {
      case (?_) {
        if (userInput.size() > 500) {
          Runtime.trap("User input is too long. Please limit to 500 characters.");
        };

        let interaction : DemoInteraction = {
          timestamp = Time.now();
          scenarioId;
          selectedFeatureId;
          userInput;
          screen;
        };

        demoInteractions.add(nextInteractionId, interaction);
        nextInteractionId += 1;
      };
      case (null) { Runtime.trap("Scenario does not exist") };
    };
  };

  public query ({ caller }) func getInteractionStats() : async {
    totalInteractions : Nat;
    scenarioBreakdown : [(Nat, Nat)];
    screenBreakdown : [(Text, Nat)];
  } {
    let totalInteractions = demoInteractions.size();

    var urbanCommuteCount = 0;
    var highwayTravelCount = 0;
    var longDistanceTripCount = 0;
    var hotWeatherCount = 0;
    var mountainousTerrainCount = 0;

    let iter = demoInteractions.values();
    iter.forEach(
      func(demo) {
        switch (demo.scenarioId) {
          case (0) { urbanCommuteCount += 1 };
          case (1) { highwayTravelCount += 1 };
          case (2) { longDistanceTripCount += 1 };
          case (3) { hotWeatherCount += 1 };
          case (4) { mountainousTerrainCount += 1 };
          case (_) {};
        };
      }
    );

    let scenarioBreakdown = [
      (0, urbanCommuteCount),
      (1, highwayTravelCount),
      (2, longDistanceTripCount),
      (3, hotWeatherCount),
      (4, mountainousTerrainCount),
    ];

    var mainScreenCount = 0;
    var planningScreenCount = 0;
    var guidanceScreenCount = 0;

    let iter2 = demoInteractions.values();
    iter2.forEach(
      func(demo) {
        switch (demo.screen) {
          case ("main") { mainScreenCount += 1 };
          case ("planning") { planningScreenCount += 1 };
          case ("guidance") { guidanceScreenCount += 1 };
          case (_) {};
        };
      }
    );

    let screenBreakdown = [
      ("main", mainScreenCount),
      ("planning", planningScreenCount),
      ("guidance", guidanceScreenCount),
    ];

    {
      totalInteractions;
      scenarioBreakdown;
      screenBreakdown;
    };
  };

  public shared ({ caller }) func resetDemoData() : async Bool {
    if (demoInteractions.isEmpty()) { Runtime.trap("No interactions to reset") };
    demoInteractions.clear();
    nextInteractionId := 0;
    true;
  };
};
