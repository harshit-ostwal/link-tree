function getChangedFields(existingData, incomingData) {
  const data = {};

  for (const key in incomingData) {
    if (
      incomingData[key] !== undefined &&
      incomingData[key] !== existingData[key]
    ) {
      data[key] = incomingData[key];
    }
  }

  return data;
}

export { getChangedFields };
