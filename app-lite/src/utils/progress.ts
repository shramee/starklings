const COMPLETED_PREFIX = "completedExercises:";

export const getCompleted = (username: string): string[] => {
  const raw = window.localStorage.getItem(`${COMPLETED_PREFIX}${username}`);
  if (!raw) {
    return [];
  }
  try {
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
};

export const markCompleted = (username: string, exerciseId: string) => {
  const completed = getCompleted(username);
  if (!completed.includes(exerciseId)) {
    completed.push(exerciseId);
    window.localStorage.setItem(
      `${COMPLETED_PREFIX}${username}`,
      JSON.stringify(completed)
    );
  }
};

export const isCompleted = (username: string, exerciseId: string) => {
  return getCompleted(username).includes(exerciseId);
};

/** Merge progress from one local user into another (e.g. after GitHub login). */
export const mergeProgress = (fromUser: string, toUser: string) => {
  if (fromUser === toUser) {
    return;
  }
  const from = getCompleted(fromUser);
  const to = getCompleted(toUser);
  const merged = Array.from(new Set([...to, ...from]));
  window.localStorage.setItem(
    `${COMPLETED_PREFIX}${toUser}`,
    JSON.stringify(merged)
  );
};
