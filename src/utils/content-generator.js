export const calculatePermissions = (permissions) =>
  Promise.all(
    [permissions]
      .flat()
      .map(({ method, args } = {}) =>
        insights.chrome?.visibilityFunctions?.[method]?.(...(args || []))
      )
  ).then((visibility) => visibility.every(Boolean));

export const calculateVisibility = async (toCheck) => {
  const data = await Promise.all(
    toCheck?.map(async (item) => {
      const isVisible = calculatePermissions(item?.permissions);
      return isVisible && item;
    }) || []
  );

  return data.filter(Boolean);
};

export const calculateEndpoints = async (endpoints) => {
  const data = await Promise.all(
    endpoints.map(async (endpoint) => {
      const isVisible = await calculatePermissions(endpoint?.permissions);
      return (
        isVisible && {
          ...endpoint,
          actions: {
            carousel: await calculateVisibility(endpoint?.actions?.carousel),
            sections: await calculateVisibility(endpoint?.actions?.sections),
          },
        }
      );
    })
  );
  return data.filter(Boolean);
};
