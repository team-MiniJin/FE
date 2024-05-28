export const fetchUpcomingPlans = async () => {
  try {
    const res = await fetch(`/api/plans/upcoming`);
    if (!res.ok) {
      // If the response status is not ok, throw an error with the status text
      throw new Error(res.statusText);
    }
    const result = await res.json();
    return result;
  } catch (error) {
    // If there is an error, return an object with an error message
    return {
      success: false,
      message:
        error instanceof Error ? error.message : 'An unknown error occurred',
    };
  }
};
