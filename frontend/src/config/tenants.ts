import type {
  TenantConfig,
  TenantId,
} from "../types/tenant";

export const TENANT_CONFIGS: Record<
  TenantId,
  TenantConfig
> = {
  tai: {
    id: "tai",
    displayName: "The Address Investments",
    shortName: "TAI",
    currency: "EGP",
    logoText: "THE ADDRESS",
    workspaceLabel: "The Address Workspace",
  },

  marq: {
    id: "marq",
    displayName: "MarQ Communities",
    shortName: "MarQ",
    currency: "EGP",
    logoText: "MarQ",
    workspaceLabel: "MarQ Workspace",
  },
};