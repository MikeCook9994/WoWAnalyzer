import SPELLS from 'common/SPELLS';
import CoreAbilities from 'parser/core/modules/Abilities';
import { SpellbookAbility } from 'parser/core/modules/Ability';

class Abilities extends CoreAbilities {
  spellbook(): SpellbookAbility[] {
    const combatant = this.selectedCombatant;
    return [
      /**
       * Shared spells handled in their own files:
       * Binding Shot
       * Hunters Mark
       * Kill Shot
       * A Murder of Crows
       *
       */
      //region Baseline Rotational
      {
        spell: SPELLS.AIMED_SHOT,
        category: Abilities.SPELL_CATEGORIES.ROTATIONAL,
        cooldown: (haste: number) => 12 / (1 + haste),
        charges: 2,
        gcd: {
          base: 1500,
        },
        castEfficiency: {
          suggestion: true,
          recommendedEfficiency: 0.95,
        },
      },
      {
        spell: SPELLS.RAPID_FIRE,
        category: Abilities.SPELL_CATEGORIES.ROTATIONAL,
        cooldown: 20,
        gcd: {
          base: 1500,
        },
        castEfficiency: {
          suggestion: true,
          recommendedEfficiency: 0.95,
        },
      },
      {
        spell: SPELLS.ARCANE_SHOT,
        buffSpellId: SPELLS.PRECISE_SHOTS.id,
        category: Abilities.SPELL_CATEGORIES.ROTATIONAL,
        enabled: !combatant.hasTalent(SPELLS.CHIMAERA_SHOT_MM_TALENT.id),
        gcd: {
          base: 1500,
        },
      },
      {
        spell: SPELLS.STEADY_SHOT,
        buffSpellId: SPELLS.STEADY_FOCUS_BUFF.id,
        category: Abilities.SPELL_CATEGORIES.ROTATIONAL,
        gcd: {
          base: 1500,
        },
      },
      {
        spell: SPELLS.MULTISHOT_MM,
        buffSpellId: SPELLS.PRECISE_SHOTS.id,
        category: Abilities.SPELL_CATEGORIES.ROTATIONAL_AOE,
        gcd: {
          base: 1500,
        },
      },
      {
        spell: SPELLS.TRUESHOT,
        buffSpellId: SPELLS.TRUESHOT.id,
        category: Abilities.SPELL_CATEGORIES.COOLDOWNS,
        cooldown: 120,
        gcd: {
          static: 0,
        },
        castEfficiency: {
          suggestion: true,
          recommendedEfficiency: 0.95,
        },
      },
      //endregion

      //region Baseline Defensives
      {
        spell: SPELLS.EXHILARATION,
        category: Abilities.SPELL_CATEGORIES.DEFENSIVE,
        isDefensive: true,
        cooldown: 120,
        gcd: {
          base: 1500,
        },
      },
      {
        spell: SPELLS.ASPECT_OF_THE_TURTLE,
        buffSpellId: SPELLS.ASPECT_OF_THE_TURTLE.id,
        category: Abilities.SPELL_CATEGORIES.DEFENSIVE,
        isDefensive: true,
        cooldown: 180 * (1 - (combatant.hasTalent(SPELLS.BORN_TO_BE_WILD_TALENT.id) ? 0.2 : 0)),
        gcd: {
          static: 0,
        },
      },
      {
        spell: [SPELLS.SURVIVAL_OF_THE_FITTEST_LONE_WOLF, SPELLS.SURVIVAL_OF_THE_FITTEST],
        category: Abilities.SPELL_CATEGORIES.DEFENSIVE,
        isDefensive: true,
        cooldown: 180,
        gcd: {
          static: 0,
        },
      },
      //endregion

      //region Baseline Utility
      {
        spell: SPELLS.DISENGAGE,
        category: Abilities.SPELL_CATEGORIES.UTILITY,
        cooldown: 20,
        gcd: {
          static: 0,
        },
      },
      {
        spell: SPELLS.BURSTING_SHOT,
        category: Abilities.SPELL_CATEGORIES.UTILITY,
        cooldown: 24,
        gcd: {
          base: 1500,
        },
      },
      {
        spell: SPELLS.CONCUSSIVE_SHOT,
        category: Abilities.SPELL_CATEGORIES.UTILITY,
        cooldown: 5,
        gcd: {
          base: 1500,
        },
      },
      {
        spell: SPELLS.COUNTER_SHOT,
        category: Abilities.SPELL_CATEGORIES.UTILITY,
        cooldown: 24,
        gcd: {
          static: 0,
        },
      },
      {
        spell: SPELLS.MISDIRECTION,
        category: Abilities.SPELL_CATEGORIES.UTILITY,
        cooldown: 30,
        gcd: {
          static: 0,
        },
      },
      {
        spell: SPELLS.ASPECT_OF_THE_CHEETAH,
        category: Abilities.SPELL_CATEGORIES.UTILITY,
        cooldown: 180 * (1 - (combatant.hasTalent(SPELLS.BORN_TO_BE_WILD_TALENT.id) ? 0.2 : 0)),
        gcd: {
          static: 0,
        },
      },
      {
        spell: SPELLS.FREEZING_TRAP,
        category: Abilities.SPELL_CATEGORIES.UTILITY,
        cooldown: 30, //TODO: Set to 25 at Shadowlands launch
        gcd: {
          base: 1500,
        },
      },
      {
        spell: SPELLS.TAR_TRAP,
        category: Abilities.SPELL_CATEGORIES.UTILITY,
        cooldown: 30, //TODO: Set to 25 at Shadowlands launch
        gcd: {
          base: 1500,
        },
      },
      {
        spell: SPELLS.FLARE,
        category: Abilities.SPELL_CATEGORIES.UTILITY,
        cooldown: 20,
        gcd: {
          base: 1500,
        },
      },
      //endregion

      //region Talents
      {
        spell: SPELLS.CHIMAERA_SHOT_MM_TALENT,
        category: Abilities.SPELL_CATEGORIES.ROTATIONAL,
        enabled: combatant.hasTalent(SPELLS.CHIMAERA_SHOT_MM_TALENT.id),
        gcd: {
          base: 1500,
        },
      },
      {
        spell: SPELLS.EXPLOSIVE_SHOT_TALENT,
        category: Abilities.SPELL_CATEGORIES.ROTATIONAL,
        cooldown: 30,
        gcd: {
          base: 1500,
        },
        buffSpellId: SPELLS.EXPLOSIVE_SHOT_TALENT.id,
        enabled: combatant.hasTalent(SPELLS.EXPLOSIVE_SHOT_TALENT.id),
        castEfficiency: {
          suggestion: true,
          recommendedEfficiency: 0.95,
        },
      },
      {
        spell: SPELLS.SERPENT_STING_TALENT,
        buffSpellId: SPELLS.SERPENT_STING_TALENT.id,
        category: Abilities.SPELL_CATEGORIES.ROTATIONAL,
        enabled: combatant.hasTalent(SPELLS.SERPENT_STING_TALENT.id),
        gcd: {
          base: 1500,
        },
      },
      {
        spell: SPELLS.DOUBLE_TAP_TALENT,
        category: Abilities.SPELL_CATEGORIES.ROTATIONAL,
        cooldown: 60,
        enabled: combatant.hasTalent(SPELLS.DOUBLE_TAP_TALENT.id),
        gcd: {
          base: 1500,
        },
        castEfficiency: {
          suggestion: true,
          recommendedEfficiency: 0.8,
        },
      },
      {
        spell: SPELLS.BARRAGE_TALENT,
        category: Abilities.SPELL_CATEGORIES.ROTATIONAL,
        cooldown: 20,
        enabled: combatant.hasTalent(SPELLS.BARRAGE_TALENT.id),
        gcd: {
          base: 1500,
        },
        castEfficiency: {
          suggestion: true,
          recommendedEfficiency: 0.9,
        },
      },
      {
        spell: SPELLS.VOLLEY_TALENT,
        category: Abilities.SPELL_CATEGORIES.ROTATIONAL,
        cooldown: 45,
        enabled: combatant.hasTalent(SPELLS.VOLLEY_TALENT.id),
        gcd: {
          base: 1500, //TODO: Follow up on Volley double dipping focus on it's GCD
        },
        castEfficiency: {
          suggestion: true,
          recommendedEfficiency: 0.9,
        },
      },
      //endregion

      //region Pets
      {
        spell: [SPELLS.PRIMAL_RAGE_1, SPELLS.PRIMAL_RAGE_2],
        buffSpellId: [SPELLS.PRIMAL_RAGE_1.id, SPELLS.PRIMAL_RAGE_2.id],
        category: Abilities.SPELL_CATEGORIES.UTILITY,
        cooldown: 360,
        gcd: {
          static: 0,
        },
      },
      {
        spell: SPELLS.MASTERS_CALL,
        category: Abilities.SPELL_CATEGORIES.UTILITY,
        cooldown: 45,
        gcd: {
          static: 0,
        },
      },

      {
        spell: SPELLS.INTIMIDATION,
        category: Abilities.SPELL_CATEGORIES.UTILITY,
        cooldown: 60,
        gcd: {
          base: 1500,
        },
      },
      {
        spell: [
          SPELLS.CALL_PET_1,
          SPELLS.CALL_PET_2,
          SPELLS.CALL_PET_3,
          SPELLS.CALL_PET_4,
          SPELLS.CALL_PET_5,
        ],
        category: Abilities.SPELL_CATEGORIES.UTILITY,
        gcd: {
          base: 1500,
        },
      },
      {
        spell: SPELLS.DISMISS_PET,
        category: Abilities.SPELL_CATEGORIES.UTILITY,
        gcd: {
          base: 1500,
        },
      },
      {
        spell: SPELLS.MEND_PET,
        category: Abilities.SPELL_CATEGORIES.UTILITY,
        cooldown: 10,
        gcd: {
          base: 1500,
        },
      },
      //endregion
    ];
  }
}

export default Abilities;
