import { createContext } from 'react'

/** The DOM id of the enclosing Explore's title, so a widget's graph (kit's Plane) can take its
 *  accessible name from it when it has no `label` of its own. Kept in its own tiny module so
 *  Explore (main bundle) and kit (lazy widget chunks) can share it without importing each other. */
export const ExploreTitleContext = createContext<string | null>(null)
