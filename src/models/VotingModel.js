import { MOCK_VOTING_ITEMS, DEFAULT_USER_UNITS } from '../mock/votingData';

export class VotingModel {
  /**
   * Fetch initial voting items dataset.
   */
  static getInitialItems() {
    return MOCK_VOTING_ITEMS;
  }

  /**
   * Filter voting items by category ('ALL', 'EVENT', 'POLL').
   */
  static filterItems(items, filter) {
    if (!items || !Array.isArray(items)) return [];

    let filtered = [...items];
    if (filter === 'EVENT') {
      filtered = filtered.filter((item) => item.itemType === 'EVENT');
    } else if (filter === 'POLL') {
      filtered = filtered.filter((item) => item.itemType === 'POLL');
    }

    // Status Priority: Ongoing (1) > Scheduled (2) > Complete (3)
    const getStatusPriority = (status) => {
      const s = (status || '').toLowerCase();
      if (s === 'ongoing' || s === 'open') return 1;
      if (s === 'scheduled' || s === 'upcoming') return 2;
      if (s === 'complete' || s === 'completed' || s === 'closed') return 3;
      return 4;
    };

    return filtered.sort((a, b) => getStatusPriority(a.status) - getStatusPriority(b.status));
  }

  /**
   * Get units list from a poll object.
   */
  static getUnitsList(poll) {
    if (!poll) return DEFAULT_USER_UNITS;
    return poll.userUnit?.unitsList || DEFAULT_USER_UNITS;
  }

  /**
   * Calculate summary of unit representations (Owner vs Tenant).
   */
  static getRepresentationSummary(unitsList) {
    const list = unitsList && Array.isArray(unitsList) ? unitsList : DEFAULT_USER_UNITS;
    const totalUnits = list.length;
    const ownerUnitsList = list.filter((u) => u.representedBy === 'OWNER');
    const tenantUnitsList = list.filter((u) => u.representedBy === 'TENANT');

    const ownerUnits = ownerUnitsList.length;
    const tenantUnits = tenantUnitsList.length;

    const ownerNpp = ownerUnitsList.reduce((acc, u) => acc + (parseFloat(u.npp) || 0), 0);
    const tenantNpp = tenantUnitsList.reduce((acc, u) => acc + (parseFloat(u.npp) || 0), 0);
    const totalNpp = list.reduce((acc, u) => acc + (parseFloat(u.npp) || 0), 0);

    return {
      totalUnits,
      ownerUnits,
      tenantUnits,
      ownerUnitsList,
      tenantUnitsList,
      ownerNpp: parseFloat(ownerNpp.toFixed(2)),
      tenantNpp: parseFloat(tenantNpp.toFixed(2)),
      totalNpp: parseFloat(totalNpp.toFixed(2)),
    };
  }

  /**
   * Update representation for a single unit within a poll.
   */
  static updateUnitRepresentation(items, pollId, unitNo, representedBy) {
    return items.map((item) => {
      if (item.id === pollId) {
        const currentUnits = item.userUnit?.unitsList || DEFAULT_USER_UNITS;
        const updatedUnits = currentUnits.map((u) =>
          u.unitNo === unitNo ? { ...u, representedBy } : u
        );

        return {
          ...item,
          userUnit: {
            ...item.userUnit,
            unitsList: updatedUnits,
          },
        };
      }
      return item;
    });
  }

  /**
   * Update all units representation simultaneously (bulk 'OWNER' or 'TENANT').
   */
  static updateAllUnitsRepresentation(items, pollId, representedBy) {
    return items.map((item) => {
      if (item.id === pollId) {
        const currentUnits = item.userUnit?.unitsList || DEFAULT_USER_UNITS;
        const updatedUnits = currentUnits.map((u) => {
          const isSelf = u.tenant?.relationType === 'SELF';
          return {
            ...u,
            representedBy: isSelf ? 'OWNER' : representedBy,
          };
        });

        return {
          ...item,
          userUnit: {
            ...item.userUnit,
            unitsList: updatedUnits,
          },
        };
      }
      return item;
    });
  }

  /**
   * Batch update all units for a poll with a new units array and optional finalization flag.
   */
  static setUnitsListForPoll(items, pollId, newUnitsList, isDelegationFinalized = false) {
    return items.map((item) => {
      if (item.id === pollId) {
        return {
          ...item,
          isDelegationFinalized: isDelegationFinalized || Boolean(item.isDelegationFinalized),
          userUnit: {
            ...item.userUnit,
            unitsList: newUnitsList,
          },
        };
      }
      return item;
    });
  }

  /**
   * Get active questions for a given poll (isActive === true).
   */
  static getActiveQuestions(poll) {
    if (!poll || !poll.questions) return [];
    return poll.questions.filter((q) => q.isActive === true);
  }

  /**
   * Get unanswered active questions — active questions NOT yet in answeredQuestionIds.
   */
  static getUnansweredActiveQuestions(poll) {
    const activeQuestions = VotingModel.getActiveQuestions(poll);
    const answered = poll.answeredQuestionIds || [];
    return activeQuestions.filter((q) => !answered.includes(q.id));
  }

  /**
   * Check if a poll has new active questions that were not previously answered.
   * Returns true if userVoted but there are still unanswered active questions.
   */
  static hasNewUnansweredQuestions(poll) {
    if (!poll.userVoted) return false;
    return VotingModel.getUnansweredActiveQuestions(poll).length > 0;
  }

  /**
   * Calculate number of answered questions among active questions.
   */
  static calculateAnsweredCount(activeQuestions, answers) {
    if (!activeQuestions || !answers) return 0;
    return activeQuestions.filter((q) => {
      const val = answers[q.id];
      if (Array.isArray(val)) return val.length > 0;
      if (typeof val === 'string') return val.trim().length > 0;
      return Boolean(val);
    }).length;
  }

  /**
   * Validate required answers for active questions.
   * Returns object { isValid: boolean, errors: map, firstErrorId: string|null }.
   */
  static validateRequiredAnswers(activeQuestions, answers) {
    const errors = {};
    let firstErrorId = null;

    activeQuestions.forEach((q) => {
      if (q.isRequired) {
        const val = answers[q.id];
        const isAnswered =
          (Array.isArray(val) && val.length > 0) ||
          (typeof val === 'string' && val.trim().length > 0) ||
          Boolean(val);

        if (!isAnswered) {
          errors[q.id] = true;
          if (!firstErrorId) {
            firstErrorId = q.id;
          }
        }
      }
    });

    const isValid = Object.keys(errors).length === 0;
    return { isValid, errors, firstErrorId };
  }

  /**
   * Record partial or full vote.
   * - Stores answeredQuestionIds & userAnswers cumulatively.
   * - Sets userVoted = true.
   * - Sets status = 'complete' if all active questions are answered.
   */
  static recordVote(items, pollId, answeredIds, newAnswers = {}) {
    return items.map((item) => {
      if (item.id === pollId) {
        const existingAnswered = item.answeredQuestionIds || [];
        const mergedIds = Array.from(new Set([...existingAnswered, ...answeredIds]));
        const mergedAnswers = { ...(item.userAnswers || {}), ...newAnswers };
        const activeQuestions = VotingModel.getActiveQuestions(item);
        const allAnswered = activeQuestions.every((q) => mergedIds.includes(q.id));

        return {
          ...item,
          userVoted: true,
          answeredQuestionIds: mergedIds,
          userAnswers: mergedAnswers,
          status: item.status,
        };
      }
      return item;
    });
  }
}
