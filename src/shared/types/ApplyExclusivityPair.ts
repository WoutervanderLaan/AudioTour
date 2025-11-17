/**
 * DisallowKeys
 * Creates an object type where the specified keys K are made optional
 * and their value is set to 'never', effectively disallowing them.
 */
type DisallowKeys<T, K extends keyof any> = {
  [P in K]?: never
}

/**
 * ExclusivePair
 * Takes a Base type and two keys (A and B).
 * It returns a new type that includes all properties from Base,
 * *except* that it enforces that only A, only B, or neither A nor B
 * can be present, but never both.
 */
type ExclusivePair<Base, A extends keyof Base, B extends keyof Base> = Omit<
  Base,
  A | B
> &
  // Case 1: Has A, Disallows B
  (| (Partial<Pick<Base, A>> & DisallowKeys<Base, B>)
    // Case 2: Has B, Disallows A
    | (Partial<Pick<Base, B>> & DisallowKeys<Base, A>)
    // Case 3: Has neither (Both are disallowed)
    | DisallowKeys<Base, A | B>
  )
/**
 * GetKeys (New Helper)
 * Resolves a single key or an array of keys to a union of keys,
 * and ensures the result is assignable to keyof Base.
 */
type GetKeys<Base, K> = (K extends (keyof Base)[] ? K[number] : K) & keyof Base

/**
 * ApplyExclusivityPair
 * Applies a single mutual exclusion rule defined by a tuple [GroupA, GroupB]
 * to a Base type.
 *
 *  * **Example:**
 *
 *  type ExclusiveBoxProps = ApplyExclusivityPair<
 *  BoxProps,
 *  ['padding', ['paddingH', 'paddingV']]
 *  >
 *
 * const BoxInstance = ``<Box padding="md" paddingH="sm" />`` // Error: padding and paddingH are mutually exclusive
 *
 * const BoxInstance2 = ``<Box paddingH="sm" />`` // OK
 *
 * @template Base The base type to apply exclusivity to.
 * @template Pair A tuple [GroupA, GroupB] where GroupA and GroupB are single keys
 * or arrays of keys from Base that must be mutually exclusive.
 */
export type ApplyExclusivityPair<
  Base,
  Pair extends readonly [
    keyof Base | (keyof Base)[],
    keyof Base | (keyof Base)[],
  ],
> = ExclusivePair<Base, GetKeys<Base, Pair[0]>, GetKeys<Base, Pair[1]>>
