import Analyzer, { SELECTED_PLAYER, Options } from 'parser/core/Analyzer';
import RESOURCE_TYPES from 'game/RESOURCE_TYPES';
import Events, { EnergizeEvent } from 'parser/core/Events';
import { ThresholdStyle } from 'parser/core/ParseResults';

class Insanity extends Analyzer {
  private insanityEvents: EnergizeEvent[] = [];
  private wastedInsanity: number = 0;

  constructor(options: Options) {
    super(options);
    this.addEventListener(Events.energize.by(SELECTED_PLAYER), this.onInsanityEnergize);
  }

  onInsanityEnergize(event: EnergizeEvent) {
    if (event.resourceChangeType === RESOURCE_TYPES.INSANITY.id) {
      this.insanityEvents = [
        ...this.insanityEvents,
        event,
      ];

      this.wastedInsanity += event.waste;
    }
  }

  get events() {
    return this.insanityEvents;
  }

  get wasted() {
    return this.wastedInsanity;
  }

  get wastedSuggestionThresholds() {
    return {
      actual: this.wastedInsanity,
      isGreaterThan: {
        minor: 49,
        major: 99,
      },
      style: ThresholdStyle.NUMBER,
    };
  }
}

export default Insanity;
