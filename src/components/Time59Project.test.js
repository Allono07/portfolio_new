import assert from 'node:assert/strict';
import test from 'node:test';

import {
  angularVelocity,
  dailyDrift,
  driftAfterDays,
  hourlyDrift,
  newMinuteDuration,
  requiredRelativisticVelocity,
  secondsPerDay,
  secondsPerHour,
  timeDilationFactor,
} from './Time59Project.js';

test('core time calculations are correct for the 59-minute hour', () => {
  assert.equal(secondsPerHour(59, 60), 3540);
  assert.equal(secondsPerDay(59, 60, 24), 84960);
  assert.equal(hourlyDrift(59, 60), 60);
  assert.equal(dailyDrift(59, 60, 24), 1440);
  assert.equal(driftAfterDays(7, 24, 59, 60), 10080);
  assert.equal(newMinuteDuration(3600, 59), 3600 / 59);
  assert.equal(angularVelocity(3540), (2 * Math.PI) / 3540);
  assert.equal(timeDilationFactor(59 / 60), Math.sqrt(1 - (59 / 60) ** 2));
  assert.equal(requiredRelativisticVelocity(59 / 60), 299792458 * Math.sqrt(1 - (59 / 60) ** 2));
});
