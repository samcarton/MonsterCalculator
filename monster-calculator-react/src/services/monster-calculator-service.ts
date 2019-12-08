export interface ServiceInput {
    challengeRatingInput: number,
    challengeRatingToScaleTo: number,
};

// TODO
export function scale(arg : ServiceInput) {
  return arg.challengeRatingToScaleTo;
};

