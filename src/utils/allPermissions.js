let permissions = [];

export const loadPermissions = async (retries = 5) => {
  try {
    if (retries > 0) {
      const userPermissions = await window.insights.chrome.getUserPermissions();
      if (Array.isArray(userPermissions)) {
        permissions = userPermissions.map(({ permission }) => permission);
      }
    }
  } catch (e) {
    await loadPermissions(retries - 1);
  }
};

export const hasPermissions = (requestedPermissions = []) =>
  requestedPermissions.every((permission) => permissions.includes(permission));
