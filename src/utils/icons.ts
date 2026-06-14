import { Ionicons } from '@expo/vector-icons';

type IoniconName = keyof typeof Ionicons.glyphMap;

/**
 * Coerces a data-sourced icon string (e.g. a vocab theme or unit `icon` field,
 * often stored as the "-outline" variant) into a typed Ionicons glyph name,
 * stripping the "-outline" suffix to use the filled variant. Centralises the
 * one unavoidable string→glyph cast so call sites stay type-safe.
 */
export function toIconName(icon: string): IoniconName {
  return icon.replace('-outline', '') as IoniconName;
}
