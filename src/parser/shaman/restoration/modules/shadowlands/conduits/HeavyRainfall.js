import React from 'react';

import SPELLS from 'common/SPELLS';
import Events from 'parser/core/Events';
import Analyzer, { SELECTED_PLAYER } from 'parser/core/Analyzer';

import calculateEffectiveHealing from 'parser/core/calculateEffectiveHealing';

import BoringSpellValueText from 'interface/statistics/components/BoringSpellValueText';
import Statistic from 'interface/statistics/Statistic';
import STATISTIC_ORDER from 'interface/others/STATISTIC_ORDER';
import STATISTIC_CATEGORY from 'interface/others/STATISTIC_CATEGORY';
import ItemHealingDone from 'interface/ItemHealingDone';


class HeavyRainfall extends Analyzer {

  healingBoost = 0;

  healing = 0;

  /**
   * Whenever you cast healing tide totem you gain a buff that increases your healing rain healing by x% for 20 seconds
   */
  constructor(...args) {
    super(...args);
    this.active = false;//TODO actually check if conduit is active

    this.healingBoost = 1.6;//TODO Get from combat data when they EXPORT IT >:c

    if (!this.active) {
      return;
    }

    this.addEventListener(Events.heal.by(SELECTED_PLAYER).spell(SPELLS.HEALING_RAIN_HEAL), this.normalizeBoost);
  }

  normalizeBoost(event){
    if (this.selectedCombatant.hasBuff(SPELLS.HEAVY_RAINFALL_BUFF.id)) {
      this.healing += calculateEffectiveHealing(event, this.healingBoost);
    }
  }

  statistic() {
    return (
      <Statistic
        position={STATISTIC_ORDER.OPTIONAL(13)}
        size="flexible"
        category={STATISTIC_CATEGORY.COVENANTS}
      >
        <BoringSpellValueText spell={SPELLS.HEAVY_RAINFALL}>
          <ItemHealingDone amount={this.healing} /><br />
        </BoringSpellValueText>
      </Statistic>
    );
  }
}

export default HeavyRainfall;