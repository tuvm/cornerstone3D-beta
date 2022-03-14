import ICamera from './ICamera'
import Point2 from './Point2'
import Point3 from './Point3'
import ViewportInputOptions from './ViewportInputOptions'
import { ActorEntry } from './IActor'
import VIEWPORT_TYPE from '../enums/viewportType'

/**
 * Viewport interface for cornerstone viewports
 */
interface IViewport {
  /** unique identifier of the viewport */
  uid: string
  /** renderingEngineUID the viewport belongs to */
  renderingEngineUID: string
  /** viewport type, can be ORTHOGRAPHIC or STACK for now */
  type: VIEWPORT_TYPE
  /** canvas associated to the viewport */
  canvas: HTMLCanvasElement
  /** public DOM element associated to the viewport */
  element: HTMLElement
  /** sx of the viewport on the offscreen canvas (if rendering using GPU) */
  sx: number
  /** sy of the viewport on the offscreen canvas (if rendering using GPU) */
  sy: number
  /** width of the viewport on the offscreen canvas (if rendering using GPU) */
  sWidth: number
  /** height of the viewport on the offscreen canvas (if rendering using GPU) */
  sHeight: number
  /** actors rendered in the viewport (volumeActors as of now) */
  _actors: Map<string, any>
  /** viewport default options including the axis, and background color  */
  defaultOptions: any
  /** viewport options */
  options: ViewportInputOptions
  /** Suppress events */
  suppressEvents: boolean
  /** frameOfReferenceUID the viewport's default actor is rendering */
  getFrameOfReferenceUID: () => string
  /** method to convert canvas to world coordinates */
  canvasToWorld: (canvasPos: Point2) => Point3
  /** method to convert world to canvas coordinates */
  worldToCanvas: (worldPos: Point3) => Point2
  /** returns all the actors on the viewport which includes both volumeActor object and its uid */
  getActors(): Array<ActorEntry>
  /** returns specific actor by its uid */
  getActor(actorUID: string): ActorEntry
  /** set and overwrite actors in a viewport */
  setActors(actors: Array<ActorEntry>): void
  /** add actors to the list of actors */
  addActors(actors: Array<ActorEntry>): void
  /** add one actor */
  addActor(actorEntry: ActorEntry): void
  /** remove all actors from the viewport */
  removeAllActors(): void
  /** returns the renderingEngine instance the viewport belongs to */
  getRenderingEngine(): any
  /** returns the vtkRenderer (for GPU rendering) of the viewport */
  getRenderer(): void
  /** triggers render for all actors in the viewport */
  render(): void
  /** set options for the viewport */
  setOptions(options: ViewportInputOptions, immediate: boolean): void
  /** reset camera and options*/
  reset(immediate: boolean): void
  /** returns the canvas */
  getCanvas(): HTMLCanvasElement
  /** returns camera object */
  getCamera(): ICamera
  /** sets the camera */
  setCamera(cameraInterface: ICamera): void
  /** whether the viewport has custom rendering */
  customRenderViewportToCanvas: () => unknown
  _getCorners(bounds: Array<number>): Array<number>[]
}

/**
 * Public Interface for viewport input to get enabled/disabled or set
 */
type PublicViewportInput = {
  /** HTML element in the DOM */
  element: HTMLElement
  /** unique id for the viewport in the renderingEngine */
  viewportUID: string
  /** type of the viewport */
  type: VIEWPORT_TYPE
  /** options for the viewport */
  defaultOptions: ViewportInputOptions
}

type InternalViewportInput = {
  element: HTMLElement
  canvas: HTMLCanvasElement
  viewportUID: string
  type: VIEWPORT_TYPE
  defaultOptions: ViewportInputOptions
}

type ViewportInput = {
  uid: string
  element: HTMLElement
  canvas: HTMLCanvasElement
  renderingEngineUID: string
  type: VIEWPORT_TYPE
  sx: number
  sy: number
  sWidth: number
  sHeight: number
  defaultOptions: ViewportInputOptions
}

export type {
  IViewport,
  ViewportInput,
  PublicViewportInput,
  InternalViewportInput,
}
