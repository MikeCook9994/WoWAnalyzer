import Analyzer, { SELECTED_PLAYER } from 'parser/core/Analyzer';
import Statistic from 'interface/statistics/Statistic';
import STATISTIC_ORDER from 'interface/others/STATISTIC_ORDER';
import STATISTIC_CATEGORY from 'interface/others/STATISTIC_CATEGORY';
import ItemDamageDone from 'interface/ItemDamageDone';
import React from 'react';
import Events, { DamageEvent } from 'parser/core/Events';
import { RAPTOR_MONGOOSE_VARIANTS, STINGING_STRIKE_RS_MB_DMG_INCREASE } from 'parser/hunter/survival/constants';
import calculateEffectiveDamage from 'parser/core/calculateEffectiveDamage';
import BoringSpellValueText from 'interface/statistics/components/BoringSpellValueText';
import SPELLS from 'common/SPELLS';

/**
 * Raptor Strike and Mongoose Bite damage increased by 14.0%.
 *
 * Example log
 *
 */
class StingingStrike extends Analyzer {

  conduitRank: number = 0;
  addedDamage: number = 0;

  constructor(options: any) {
    super(options);

    this.conduitRank = this.selectedCombatant.conduitRankBySpellID(SPELLS.STINGING_STRIKE_CONDUIT.id);

    if (!this.conduitRank) {
      this.active = false;
      return;
    }

    this.addEventListener(Events.damage.by(SELECTED_PLAYER).spell(RAPTOR_MONGOOSE_VARIANTS), this.onRaptorMongooseDamage);
  }

  onRaptorMongooseDamage(event: DamageEvent) {
    this.addedDamage += calculateEffectiveDamage(event, STINGING_STRIKE_RS_MB_DMG_INCREASE[this.conduitRank]);
  }

  statistic() {
    return (
      <Statistic
        position={STATISTIC_ORDER.OPTIONAL(13)}
        size="flexible"
        category={STATISTIC_CATEGORY.COVENANTS}
      >
        <BoringSpellValueText spell={SPELLS.STINGING_STRIKE_CONDUIT}>
          <>
            <ItemDamageDone amount={this.addedDamage} />
          </>
        </BoringSpellValueText>
      </Statistic>
    );
  }
}

export default StingingStrike;
