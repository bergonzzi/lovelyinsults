export function isFeatureEnabled(featureName: string): boolean {
  const envVar = process.env[`NEXT_PUBLIC_${featureName.toUpperCase()}`]
  return envVar === "true"
}
