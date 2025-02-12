import { Mutator } from 'final-form'

export const insert: Mutator
export const concat: Mutator
export const move: Mutator
export const pop: Mutator
export const push: Mutator
export const removeBatch: Mutator
export const remove: Mutator
export const shift: Mutator
export const swap: Mutator
export const update: Mutator
export const unshift: Mutator

export interface DefaultType<FormValues = any> {
  insert: Mutator<FormValues>
  concat: Mutator<FormValues>
  move: Mutator<FormValues>
  pop: Mutator<FormValues>
  push: Mutator<FormValues>
  removeBatch: Mutator<FormValues>
  remove: Mutator<FormValues>
  shift: Mutator<FormValues>
  swap: Mutator<FormValues>
  update: Mutator<FormValues>
  unshift: Mutator<FormValues>
}

declare const d: DefaultType
export default d

/** The shape of the mutators once final-form has bound them to state */
export interface Mutators {
  insert: (name: string, index: number, value: any) => void
  concat: (name: string, value: Array<any>) => void
  move: (name: string, from: number, to: number) => void
  pop: (name: string) => any
  push: (name: string, value: any) => void
  remove: (name: string, index: number) => any
  removeBatch: (name: string, indexes: Array<number>) => any
  shift: (name: string) => any
  swap: (name: string, indexA: number, indexB: number) => void
  update: (name: string, index: number, value: any) => void
  unshift: (name: string, value: any) => void
}
