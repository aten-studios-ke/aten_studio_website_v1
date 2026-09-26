/**
 * Fixed film-grain overlay across the whole viewport.
 * Purely decorative — pointer-events disabled, blend overlay.
 */
export function Grain() {
  return <div className="grain-layer" aria-hidden="true" />;
}
