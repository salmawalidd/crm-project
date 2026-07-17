import { TENANT_CONFIGS } from "../config/tenants";

import type {
  TenantConfig,
  TenantId,
} from "../types/tenant";

const DEFAULT_TENANT_ID: TenantId = "tai";

function isTenantId(value: string): value is TenantId {
  return value === "tai" || value === "marq";
}

export function getCurrentTenant(): TenantConfig {
  const configuredTenant =
    import.meta.env.VITE_TENANT_ID?.trim().toLowerCase();

  if (!configuredTenant) {
    console.warn(
      `VITE_TENANT_ID is missing. Falling back to "${DEFAULT_TENANT_ID}".`,
    );

    return TENANT_CONFIGS[DEFAULT_TENANT_ID];
  }

  if (!isTenantId(configuredTenant)) {
    console.warn(
      `Unknown tenant "${configuredTenant}". Falling back to "${DEFAULT_TENANT_ID}".`,
    );

    return TENANT_CONFIGS[DEFAULT_TENANT_ID];
  }

  return TENANT_CONFIGS[configuredTenant];
}