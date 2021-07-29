let permissions = [];

export const loadPermissions = async (retries = 5) => {
  const { identity } = (await insights.chrome.auth.getUser()) || {};
  if (identity?.account_number) {
    try {
      if (retries > 0) {
        const userPermissions =
          await window.insights.chrome.getUserPermissions();
        permissions =
          userPermissions?.map(({ permission }) => permission) || [];
      }

      if (retries === 0) {
        permissions = [];
      }
    } catch {
      await loadPermissions(retries - 1);
    }
  }
};

export const hasPermissions = (requestedPermissions = []) =>
  requestedPermissions.every((permission) => permissions.includes(permission));

export const loosePermissions = (requestedPermissions = []) =>
  requestedPermissions.length === 0
    ? true
    : requestedPermissions.some((permission) =>
        permissions.includes(permission)
      );
