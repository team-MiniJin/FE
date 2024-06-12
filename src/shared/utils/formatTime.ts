const formatTime = (hours: string, minutes: string, type: string = ':') => {
  let newHours = hours;
  if (newHours !== '00' && Number(newHours) < 10) {
    newHours = '0'.concat(Number(newHours).toString());
  }
  let newMinutes = minutes;
  if (newMinutes !== '00' && Number(newMinutes) < 10) {
    newMinutes = '0'.concat(Number(newMinutes).toString());
  }
  return type === ':'
    ? `${newHours}:${newMinutes}`
    : `${newHours}시 ${newMinutes}분`;
};

export default formatTime;
