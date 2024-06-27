import Vue, { ComponentOptions } from 'vue'
import { VueConstructor, Vue as _Vue, ExtendedVue } from 'vue/types/vue'

export interface DialogPromise<ReturnType> extends Promise<ReturnType> {
  close (data: ReturnType): void,
  error (reason: any): void,
  transition (): Promise<ReturnType>,
  getInstance<T extends DialogComponent<ReturnType>> (): Promise<T>
}

export declare class DialogComponent<ReturnType> extends Vue {
  /** The arguments array passed into the dialog function */
  readonly arguments: any[]

  /** Resolve the promise and close the dialog */
  $close (data: ReturnType): void

  /** Reject the promise and close the dialog */
  $error (reason: any): void
}

export interface DialogComponentConstructor<ReturnType> {
  new (): DialogComponent<ReturnType>
}

export type NormalComponent<ReturnType, PropsDef> = (
  DialogComponentConstructor<ReturnType> |
  VueConstructor
)

export type ESModuleComponent<ReturnType, PropsDef> = (
  NormalComponent<ReturnType, PropsDef> |
  { default: NormalComponent<ReturnType, PropsDef> }
)

export type AsyncComponent<ReturnType, PropsDef> = Promise<ESModuleComponent<ReturnType, PropsDef>>

export type Component<ReturnType, PropsDef> = (
  ESModuleComponent<ReturnType, PropsDef> |
  AsyncComponent<ReturnType, PropsDef>
)

/** Options to build a dialog function */
export interface DialogOptions<ReturnType, PropsDef> {
  /** A Vue component that will be the 'dialog component' */
  component: Component<ReturnType, PropsDef>,

  /** An array that maps the argument list to props */
  props: string[],

  /** The wrapper that the dialog will be added into */
  wrapper: string[]
}

export interface DialogFunction<ReturnType = any, PropsDef extends object = {}> {
  (data?: Partial<PropsDef>): DialogPromise<ReturnType>
  (...args: any[]): DialogPromise<ReturnType>
}