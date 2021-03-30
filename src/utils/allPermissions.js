let permissions = [];

export const loadPermissions = async () => {
  const userPermissions = await window.insights.chrome.getUserPermissions();
  permissions = userPermissions.map(({ permission }) => permission);
};

export const hasPermissions = (requestedPermissions = []) =>
  requestedPermissions.reduce(
    (acc, curr) => acc || permissions.includes(curr),
    false
  );
