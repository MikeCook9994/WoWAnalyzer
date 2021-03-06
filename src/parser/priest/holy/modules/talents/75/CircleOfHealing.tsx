import Analyzer from 'parser/core/Analyzer';
import SPELLS from 'common/SPELLS';
import React from 'react';
import ItemHealingDone from 'interface/ItemHealingDone';
import { formatPercentage, formatThousands } from 'common/format';
import { CastEvent, HealEvent } from 'parser/core/Events';
import Statistic from 'interface/statistics/Statistic';
import STATISTIC_CATEGORY from 'interface/others/STATISTIC_CATEGORY';
import BoringSpellValueText from 'interface/statistics/components/BoringSpellValueText';
import STATISTIC_ORDER from 'interface/others/STATISTIC_ORDER';

// Example Log: /report/aBxvzDZJQP7431Nt/21-Normal+G'huun+-+Kill+(7:11)/15-Liarine
class CircleOfHealing extends Analyzer {
  circleOfHealingCasts = 0;
  circleOfHealingHealing = 0;
  circleOfHealingOverhealing = 0;
  circleOfHealingTargetsHit = 0;

  get overHealPercent() {
    return this.circleOfHealingOverhealing / this.rawHealing;
  }

  get rawHealing() {
    return this.circleOfHealingHealing + this.circleOfHealingOverhealing;
  }

  get averageTargetsHit() {
    return this.circleOfHealingTargetsHit / this.circleOfHealingCasts;
  }

  constructor(options: any) {
    super(options);
    this.active = this.selectedCombatant.hasTalent(SPELLS.CIRCLE_OF_HEALING_TALENT.id);
  }

  on_byPlayer_cast(event: CastEvent) {
    const spellId = event.ability.guid;
    if (spellId === SPELLS.CIRCLE_OF_HEALING_TALENT.id) {
      this.circleOfHealingCasts += 1;
    }
  }

  on_byPlayer_heal(event: HealEvent) {
    const spellId = event.ability.guid;
    if (spellId === SPELLS.CIRCLE_OF_HEALING_TALENT.id) {
      this.circleOfHealingTargetsHit += 1;
      this.circleOfHealingHealing += event.amount || 0;
      this.circleOfHealingOverhealing += event.overheal || 0;
    }
  }

  statistic() {
    return (
      <Statistic
        tooltip={(
          <>
            Coh Casts: {this.circleOfHealingCasts}<br />
            Total Healing: {formatThousands(this.circleOfHealingHealing)} ({formatPercentage(this.overHealPercent)}% OH)<br />
            Average Targets Hit: {this.averageTargetsHit.toFixed(2)}
          </>
        )}
        size="flexible"
        category={STATISTIC_CATEGORY.TALENTS}
        position={STATISTIC_ORDER.OPTIONAL(5)}
      >
        <BoringSpellValueText spell={SPELLS.CIRCLE_OF_HEALING_TALENT}>
          <ItemHealingDone amount={this.circleOfHealingHealing} />
        </BoringSpellValueText>
      </Statistic>
    );
  }
}

export default CircleOfHealing;
