function hasChanges(existingData = {}, incomingData = {}) {
  return Object.keys(getChangedFields(existingData, incomingData)).length > 0;
}

function getChangedFields(existingData = {}, incomingData = {}) {
  const changedFields = {};

  for (const key in incomingData) {
    if (
      incomingData[key] !== undefined &&
      incomingData[key] !== existingData[key]
    ) {
      changedFields[key] = incomingData[key];
    }
  }

  return changedFields;
}

export { getChangedFields, hasChanges };
