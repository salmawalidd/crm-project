export type TenantId = "tai" | "marq";

export type TenantConfig = {
  id: TenantId;
  displayName: string;
  shortName: string;
  currency: string;
  logoText: string;
  workspaceLabel: string;
};