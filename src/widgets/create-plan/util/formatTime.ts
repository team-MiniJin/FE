const formatTime = (hours: string, minutes: string, type: string = ':') => {
  let newHours = hours;
  if (Number(newHours) < 10) {
    newHours = '0'.concat(newHours);
  }
  let newMinutes = minutes;
  if (Number(newMinutes) < 10) {
    newMinutes = '0'.concat(newMinutes);
  }
  return type === ':'
    ? `${newHours}:${newMinutes}`
    : `${newHours}시 ${newMinutes}분`;
};

export default formatTime;
