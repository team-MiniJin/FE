const fetchUpcomingPlans = async () => {
  try {
    const res = await fetch(`/api/plans/upcoming`);
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    const result = await res.json();
    return result;
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : 'An unknown error occurred',
    };
  }
};
export default fetchUpcomingPlans;
