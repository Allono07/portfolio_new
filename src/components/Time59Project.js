export function secondsPerHour(minutesPerHour = 59, secondsPerMinute = 60) {
  return minutesPerHour * secondsPerMinute;
}

export function secondsPerDay(hoursPerDay = 24, minutesPerHour = 59, secondsPerMinute = 60) {
  return hoursPerDay * minutesPerHour * secondsPerMinute;
}

export function hourlyDrift(minutesPerHour = 59, secondsPerMinute = 60) {
  return 3600 - secondsPerHour(minutesPerHour, secondsPerMinute);
}

export function dailyDrift(hoursPerDay = 24, minutesPerHour = 59, secondsPerMinute = 60) {
  return 86400 - secondsPerDay(hoursPerDay, minutesPerHour, secondsPerMinute);
}

export function driftAfterDays(days = 1, hoursPerDay = 24, minutesPerHour = 59, secondsPerMinute = 60) {
  return days * dailyDrift(hoursPerDay, minutesPerHour, secondsPerMinute);
}

export function newMinuteDuration(secondsPerHour = 3600, minutesPerHour = 59) {
  return secondsPerHour / minutesPerHour;
}

export function angularVelocity(periodSeconds) {
  return (2 * Math.PI) / periodSeconds;
}

export function timeDilationFactor(ratio = 59 / 60) {
  return Math.sqrt(1 - ratio ** 2);
}

export function requiredRelativisticVelocity(ratio = 59 / 60, speedOfLight = 299792458) {
  return speedOfLight * timeDilationFactor(ratio);
}

export function formatSeconds(value) {
  if (Math.abs(value) < 0.0005) {
    return '0';
  }

  return Number(value).toFixed(3);
}

export function formatMinutes(value) {
  return `${Number(value).toFixed(2)} min`;
}
