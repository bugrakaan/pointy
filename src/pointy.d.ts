/**
 * Pointy - A lightweight tooltip library with animated pointer
 * TypeScript definitions
 */

declare module '@diabolic/pointy' {
  export = Pointy;
}

/**
 * Direction presets for pointer positioning
 */
type PointyDirection = 'up' | 'down' | 'left' | 'right' | 'up-left' | 'up-right' | 'down-left' | 'down-right' | null;

/**
 * Horizontal direction
 */
type PointyHorizontalDirection = 'left' | 'right' | null;

/**
 * Vertical direction
 */
type PointyVerticalDirection = 'up' | 'down' | null;

/**
 * Viewport threshold configuration
 */
interface PointyViewportThresholds {
  /** Horizontal margin from viewport edge to trigger flip (default: 40) */
  x?: number;
  /** Vertical margin from viewport edge to trigger flip (default: 60) */
  y?: number;
}

/**
 * Step configuration for tour steps
 */
interface PointyStep {
  /** CSS selector or HTMLElement to point to */
  target: string | HTMLElement;
  /** Content to display - can be string, HTML, array of messages, or React element */
  content: string | string[] | React.ReactNode | React.ReactNode[];
  /** Pointer direction: 'up', 'down', 'left', 'right', 'up-left', 'up-right', 'down-left', 'down-right', or null for auto */
  direction?: PointyDirection;
  /** Step-specific autoplay duration in ms (overrides global autoplay) */
  duration?: number;
}

/**
 * Class name suffixes configuration
 */
interface PointyClassSuffixes {
  container?: string;
  pointer?: string;
  bubble?: string;
  bubbleText?: string;
  hidden?: string;
  visible?: string;
  moving?: string;
}

/**
 * Full class names configuration
 */
interface PointyClassNames {
  container: string;
  pointer: string;
  bubble: string;
  bubbleText: string;
  hidden: string;
  visible: string;
  moving: string;
}

/**
 * Initial position presets
 */
type PointyInitialPosition =
  | 'center'
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'middle-left'
  | 'middle-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'
  | 'first-step';

/**
 * Easing presets
 */
type PointyEasing =
  | 'default'
  | 'standard'
  | 'decelerate'
  | 'accelerate'
  | 'bounce'
  | 'elastic'
  | 'smooth'
  | 'snap'
  | 'expo-out'
  | 'circ-out'
  | 'back-out'
  | 'ease'
  | 'ease-in'
  | 'ease-out'
  | 'ease-in-out'
  | 'linear'
  | string; // Custom cubic-bezier

/**
 * Pointy constructor options
 */
interface PointyOptions {
  // Steps
  /** Array of tour steps */
  steps?: PointyStep[];
  /** Initial target element (for single-step use) */
  target?: string | HTMLElement;
  /** Initial content (for single-step use) */
  content?: string | string[] | React.ReactNode;

  // Animation
  /** Move animation duration in ms (default: 1000) */
  animationDuration?: number;
  /** Initial fade-in duration in ms (default: 1000) */
  introFadeDuration?: number;
  /** Bubble fade-in duration in ms (default: 500) */
  bubbleFadeDuration?: number;
  /** Message change animation duration in ms (default: 500) */
  messageTransitionDuration?: number;
  /** Easing preset name or custom cubic-bezier (default: 'default') */
  easing?: PointyEasing;
  /** Enable floating/bobbing animation (default: true) */
  floatingAnimation?: boolean;

  // Viewport
  /** Auto-flip bubble to stay within viewport (default: true). Can be boolean or threshold config */
  stayInViewport?: boolean | PointyViewportThresholds;

  // Position
  /** Horizontal offset from target in px (default: 20) */
  offsetX?: number;
  /** Vertical offset from target in px (default: 16) */
  offsetY?: number;
  /** Starting position preset, CSS selector, or element (default: 'center') */
  initialPosition?: PointyInitialPosition | string | HTMLElement;
  /** Offset from edges for position presets in px (default: 32) */
  initialPositionOffset?: number;
  /** Reset position when hiding (default: false) */
  resetPositionOnHide?: boolean;

  // Tracking
  /** Enable real-time target tracking (default: true) */
  tracking?: boolean;
  /** Tracking frame rate, 0 = unlimited (default: 60) */
  trackingFps?: number;

  // Messages
  /** Auto-cycle messages interval in ms, null = manual (default: null) */
  messageInterval?: number | null;

  // Autoplay
  /** Auto-advance interval in ms, null = manual (default: null) */
  autoplay?: number | null;
  /** Whether autoplay is initially enabled (default: false) */
  autoplayEnabled?: boolean;
  /** Wait for all messages before advancing (default: true) */
  autoplayWaitForMessages?: boolean;

  // Completion
  /** Reset to initial position on complete (default: true) */
  resetOnComplete?: boolean;
  /** Auto-hide after tour completes (default: true) */
  hideOnComplete?: boolean;
  /** Delay before auto-hide in ms, null = use animationDuration (default: null) */
  hideOnCompleteDelay?: number | null;

  // Styling
  /** CSS class prefix (default: 'pointy') */
  classPrefix?: string;
  /** Custom class suffixes to override defaults */
  classSuffixes?: PointyClassSuffixes;
  /** Full override of class names */
  classNames?: Partial<PointyClassNames>;
  /** CSS variable prefix (default: classPrefix) */
  cssVarPrefix?: string;
  /** Custom SVG markup for pointer or React element */
  pointerSvg?: string | React.ReactNode;

  // Callbacks
  /** Called when step changes */
  onStepChange?: (index: number, step: PointyStep) => void;
  /** Called when tour completes */
  onComplete?: () => void;
}

/**
 * Event data base interface
 */
interface PointyEventData {
  /** Event type name */
  type: string;
  /** Pointy instance reference */
  pointy: Pointy;
}

/**
 * Lifecycle event data
 */
interface PointyLifecycleEventData extends PointyEventData {
  target?: HTMLElement;
  isIntro?: boolean;
  isFirstStep?: boolean;
  currentStep?: number;
  stepIndex?: number;
}

/**
 * Navigation event data
 */
interface PointyNavigationEventData extends PointyEventData {
  fromIndex?: number;
  toIndex?: number;
  step?: PointyStep;
  fromTarget?: HTMLElement;
  target?: HTMLElement;
  totalSteps?: number;
  source?: 'manual' | 'autoplay';
}

/**
 * Animation event data
 */
interface PointyAnimationEventData extends PointyEventData {
  fromTarget?: HTMLElement;
  toTarget?: HTMLElement;
  type?: 'step' | 'pointTo';
  stepIndex?: number;
  content?: string | string[];
  index?: number;
  step?: PointyStep;
  target?: HTMLElement;
  duration?: number;
  initialPosition?: { x: number; y: number };
}

/**
 * Content event data
 */
interface PointyContentEventData extends PointyEventData {
  messages?: (string | React.ReactNode)[];
  total?: number;
  animated?: boolean;
  cyclePaused?: boolean;
  fromIndex?: number;
  toIndex?: number;
  message?: string | React.ReactNode;
  isAuto?: boolean;
}

/**
 * Message cycle event data
 */
interface PointyMessageCycleEventData extends PointyEventData {
  interval?: number;
  totalMessages?: number;
  currentIndex?: number;
  stepIndex?: number;
}

/**
 * Pointing event data
 */
interface PointyPointingEventData extends PointyEventData {
  target?: HTMLElement;
  content?: string | string[];
  direction?: PointyDirection;
  fromTarget?: HTMLElement;
}

/**
 * Flip event data (when bubble flips due to viewport bounds)
 */
interface PointyFlipEventData extends PointyEventData {
  from: 'left' | 'right' | 'up' | 'down';
  to: 'left' | 'right' | 'up' | 'down';
}

/**
 * Direction change event data
 */
interface PointyDirectionChangeEventData extends PointyEventData {
  from: { horizontal: PointyHorizontalDirection; vertical: PointyVerticalDirection };
  to: { horizontal: PointyHorizontalDirection; vertical: PointyVerticalDirection };
}

/**
 * Viewport change event data
 */
interface PointyViewportChangeEventData extends PointyEventData {
  from: { enabled: boolean; x: number; y: number };
  to: { enabled: boolean; x: number; y: number };
}

/**
 * Tracking event data
 */
interface PointyTrackingEventData extends PointyEventData {
  target?: HTMLElement;
  timestamp?: number;
  from?: HTMLElement | boolean | number;
  to?: HTMLElement | boolean | number;
}

/**
 * Autoplay event data
 */
interface PointyAutoplayEventData extends PointyEventData {
  fromIndex?: number;
  duration?: number;
  afterMessages?: boolean;
  totalSteps?: number;
  delay?: number;
  source?: 'manual' | 'autoplay';
}

/**
 * Config change event data
 */
interface PointyConfigChangeEventData extends PointyEventData {
  from: any;
  to: any;
}

/**
 * Event types union
 */
type PointyEventCallback<T = PointyEventData> = (data: T) => void;

/**
 * Event names
 */
type PointyLifecycleEvent = 'beforeShow' | 'show' | 'beforeHide' | 'hide' | 'destroy' | 'beforeRestart' | 'restart' | 'beforeReset' | 'reset';
type PointyNavigationEvent = 'beforeStepChange' | 'stepChange' | 'next' | 'prev' | 'complete';
type PointyAnimationEvent = 'animationStart' | 'animationEnd' | 'move' | 'moveComplete' | 'introAnimationStart' | 'introAnimationEnd' | 'flipHorizontal' | 'flipVertical';
type PointyDirectionEvent = 'directionChange' | 'horizontalDirectionChange' | 'verticalDirectionChange';
type PointyViewportEvent = 'stayInViewportChange';
type PointyContentEvent = 'contentSet' | 'messagesSet' | 'messageChange';
type PointyMessageCycleEvent = 'messageCycleStart' | 'messageCycleStop' | 'messageCyclePause' | 'messageCycleResume' | 'messageCycleComplete';
type PointyPointingEvent = 'beforePointTo' | 'pointTo' | 'pointToComplete';
type PointyTrackingEvent = 'track' | 'targetChange' | 'trackingChange' | 'trackingFpsChange';
type PointyAutoplayEvent = 'autoplayStart' | 'autoplayStop' | 'autoplayPause' | 'autoplayResume' | 'autoplayNext' | 'autoplayComplete' | 'autoHide' | 'autoplayChange' | 'autoplayWaitForMessagesChange';
type PointyConfigEvent = 'easingChange' | 'animationDurationChange' | 'introFadeDurationChange' | 'bubbleFadeDurationChange' | 'messageIntervalChange' | 'messageTransitionDurationChange' | 'offsetChange' | 'resetOnCompleteChange' | 'hideOnCompleteChange' | 'hideOnCompleteDelayChange' | 'floatingAnimationChange' | 'initialPositionChange' | 'initialPositionOffsetChange' | 'pointerSvgChange' | 'zIndexChange';

type PointyEvent = PointyLifecycleEvent | PointyNavigationEvent | PointyAnimationEvent | PointyDirectionEvent | PointyViewportEvent | PointyContentEvent | PointyMessageCycleEvent | PointyPointingEvent | PointyTrackingEvent | PointyAutoplayEvent | PointyConfigEvent;

/**
 * Event group names
 */
type PointyEventGroup = 'lifecycle' | 'navigation' | 'animation' | 'content' | 'messageCycle' | 'pointing' | 'tracking' | 'autoplay' | 'config' | '*' | 'all';

/**
 * Event groups object type
 */
interface PointyEventGroups {
  lifecycle: PointyLifecycleEvent[];
  navigation: PointyNavigationEvent[];
  animation: PointyAnimationEvent[];
  direction: PointyDirectionEvent[];
  viewport: PointyViewportEvent[];
  content: PointyContentEvent[];
  messageCycle: PointyMessageCycleEvent[];
  pointing: PointyPointingEvent[];
  tracking: PointyTrackingEvent[];
  autoplay: PointyAutoplayEvent[];
}

/**
 * Pointy - Main class
 */
declare class Pointy {
  // Static properties
  /** Named easing presets */
  static EASINGS: Record<string, string>;
  /** Default pointer SVG markup */
  static POINTER_SVG: string;
  /** Default CSS class prefix */
  static DEFAULT_CLASS_PREFIX: string;
  /** Default class name suffixes */
  static DEFAULT_CLASS_SUFFIXES: PointyClassSuffixes;
  /** Default CSS variable prefix */
  static DEFAULT_CSS_VAR_PREFIX: string;
  /** Event groups for generic listeners */
  static EVENT_GROUPS: PointyEventGroups;

  // Static methods
  /**
   * Generate class names from prefix and suffixes
   * @param prefix - Class prefix
   * @param suffixes - Custom suffixes to override defaults
   */
  static generateClassNames(prefix?: string, suffixes?: PointyClassSuffixes): PointyClassNames;

  /**
   * Generate CSS styles with custom class names
   * @param classNames - Class names object
   * @param cssVarPrefix - CSS variable prefix
   */
  static generateStyles(classNames: PointyClassNames, cssVarPrefix?: string): string;

  /**
   * Inject CSS styles into document
   * @param classNames - Class names object
   * @param cssVarPrefix - CSS variable prefix
   */
  static injectStyles(classNames: PointyClassNames, cssVarPrefix?: string): void;

  /**
   * Get DOM element from selector or element
   * @param target - CSS selector string or HTMLElement
   */
  static getTargetElement(target: string | HTMLElement): HTMLElement | null;

  /**
   * Animate text content change
   * @param element - Target text element
   * @param newContent - New content to display
   * @param duration - Animation duration in ms
   * @param bubble - Bubble element for size animation
   * @param onComplete - Callback when animation completes
   */
  static animateText(
    element: HTMLElement,
    newContent: string | React.ReactNode,
    duration?: number,
    bubble?: HTMLElement | null,
    onComplete?: () => void
  ): void;

  /**
   * Render content to an element - supports string (HTML) and React elements
   * @param element - Target element
   * @param content - String (HTML) or React element
   */
  static renderContent(element: HTMLElement, content: string | React.ReactNode): void;

  /**
   * Get list of available easing presets
   */
  static getEasingPresets(): string[];

  /**
   * Get list of available initial position presets
   */
  static getInitialPositions(): PointyInitialPosition[];

  /**
   * Get the group name for an event
   * @param event - Event name
   */
  static getEventGroup(event: string): string | null;

  /**
   * Get all events in a group
   * @param group - Group name
   */
  static getEventsInGroup(group: string): string[];

  // Instance properties (readonly)
  /** Main container element */
  readonly container: HTMLDivElement;
  /** Pointer element */
  readonly pointer: HTMLDivElement;
  /** Bubble element */
  readonly bubble: HTMLDivElement;
  /** Bubble text element */
  readonly bubbleText: HTMLSpanElement;
  /** Current class names */
  readonly classNames: PointyClassNames;
  /** Current class prefix */
  readonly classPrefix: string;
  /** Current CSS variable prefix */
  readonly cssVarPrefix: string;

  // Configurable properties
  /** Tour steps */
  steps: PointyStep[];
  /** Current target element */
  targetElement: HTMLElement | null;
  /** Horizontal offset from target */
  offsetX: number;
  /** Vertical offset from target */
  offsetY: number;
  /** Enable position tracking */
  tracking: boolean;
  /** Tracking frame rate */
  trackingFps: number;
  /** Move animation duration in ms */
  animationDuration: number;
  /** Intro fade duration in ms */
  introFadeDuration: number;
  /** Bubble fade duration in ms */
  bubbleFadeDuration: number;
  /** Message transition duration in ms */
  messageTransitionDuration: number;
  /** Current easing */
  easing: string;
  /** Reset to initial position on complete */
  resetOnComplete: boolean;
  /** Enable floating animation */
  floatingAnimation: boolean;
  /** Initial position preset or element */
  initialPosition: PointyInitialPosition | string | HTMLElement;
  /** Initial position offset from edges */
  initialPositionOffset: number;
  /** Reset position on hide */
  resetPositionOnHide: boolean;
  /** Autoplay interval in ms */
  autoplay: number | null;
  /** Autoplay enabled state */
  autoplayEnabled: boolean;
  /** Wait for messages before autoplay advance */
  autoplayWaitForMessages: boolean;
  /** Auto-hide after complete */
  hideOnComplete: boolean;
  /** Delay before auto-hide */
  hideOnCompleteDelay: number | null;
  /** Message auto-cycle interval */
  messageInterval: number | null;
  /** Current pointer SVG or React element */
  pointerSvg: string | React.ReactNode;

  // Viewport properties
  /** Whether to auto-flip bubble to stay in viewport */
  stayInViewport: boolean;
  /** Horizontal viewport threshold */
  viewportThresholdX: number;
  /** Vertical viewport threshold */
  viewportThresholdY: number;

  // State properties (readonly)
  /** Whether pointer is currently visible */
  readonly isVisible: boolean;
  /** Current step index */
  readonly currentStepIndex: number;
  /** Current message index within step */
  readonly currentMessageIndex: number;
  /** Current messages array */
  readonly currentMessages: (string | React.ReactNode)[];
  /** Whether pointer is pointing up */
  readonly isPointingUp: boolean;
  /** Whether pointer is on left side of target */
  readonly isPointingLeft: boolean;
  /** Manual horizontal direction override */
  readonly manualHorizontalDirection: PointyHorizontalDirection;
  /** Manual vertical direction override */
  readonly manualVerticalDirection: PointyVerticalDirection;

  // Callbacks
  /** Step change callback */
  onStepChange?: (index: number, step: PointyStep) => void;
  /** Complete callback */
  onComplete?: () => void;

  /**
   * Create a new Pointy instance
   * @param options - Configuration options
   */
  constructor(options?: PointyOptions);

  // Lifecycle methods
  /** Show the pointer */
  show(): void;
  /** Hide the pointer */
  hide(): void;
  /** Destroy the instance and cleanup */
  destroy(): void;
  /** Restart from initial position with intro animation */
  restart(): void;

  // Navigation methods
  /** Go to next step */
  next(): void;
  /** Go to previous step */
  prev(): void;
  /**
   * Go to a specific step by index
   * @param index - Step index (0-based)
   */
  goToStep(index: number): void;
  /**
   * Reset to initial position
   * @param goToFirstStep - Whether to reset step index to 0 (default: true)
   */
  reset(goToFirstStep?: boolean): void;

  // Custom target
  /**
   * Point to any element without changing current step
   * @param target - Target element or CSS selector
   * @param content - Optional content to display
   * @param direction - Optional direction: 'up', 'down', 'left', 'right', 'up-left', 'up-right', 'down-left', 'down-right', or null for auto
   */
  pointTo(target: string | HTMLElement, content?: string | string[], direction?: PointyDirection): void;

  // Content methods
  /**
   * Set content programmatically
   * @param content - Single message or array of messages
   * @param animate - Whether to animate the change (default: true)
   */
  setContent(content: string | string[] | React.ReactNode, animate?: boolean): void;
  /**
   * Go to next message in current step
   * @param isAuto - Whether this is from auto-cycle (internal)
   * @returns True if moved to next, false if at end
   */
  nextMessage(isAuto?: boolean): boolean;
  /**
   * Go to previous message in current step
   * @returns True if moved to previous, false if at start
   */
  prevMessage(): boolean;
  /**
   * Go to a specific message by index
   * @param index - Message index (0-based)
   */
  goToMessage(index: number): void;
  /** Get current message index */
  getCurrentMessage(): number;
  /** Get total messages in current step */
  getTotalMessages(): number;
  /**
   * Update displayed content
   * @param content - New content
   * @param animate - Whether to animate (default: true)
   */
  updateContent(content: string | React.ReactNode, animate?: boolean): void;
  /**
   * Update target element
   * @param target - New target element or selector
   */
  updateTarget(target: string | HTMLElement): void;
  /** Update pointer position based on current target */
  updatePosition(): void;

  // Message cycle methods
  /**
   * Start auto-cycling through messages
   * @param interval - Optional interval in ms
   * @returns True if started, false if already running or no messages
   */
  startMessageCycle(interval?: number): boolean;
  /**
   * Stop message cycling completely
   * @returns True if stopped, false if not running
   */
  stopMessageCycle(): boolean;
  /** Pause message cycling (can be resumed) */
  pauseMessageCycle(): void;
  /**
   * Resume paused message cycling
   * @returns True if resumed, false if not paused
   */
  resumeMessageCycle(): boolean;
  /** Check if message cycling is active */
  isMessageCycleActive(): boolean;
  /** Check if message cycling is paused */
  isMessageCyclePaused(): boolean;

  // Autoplay methods
  /** Start autoplay */
  startAutoplay(): void;
  /** Stop autoplay */
  stopAutoplay(): void;
  /** Pause autoplay (can be resumed) */
  pauseAutoplay(): void;
  /** Resume autoplay after pause */
  resumeAutoplay(): void;
  /** Check if autoplay is currently active */
  isAutoplayActive(): boolean;
  /** Check if autoplay is paused */
  isAutoplayPaused(): boolean;

  // Animation methods
  /** Animate to initial position (teleport hidden, fade in, move to target) */
  animateToInitialPosition(): void;

  // State methods
  /** Get current step index */
  getCurrentStep(): number;
  /** Get total number of steps */
  getTotalSteps(): number;
  /** Check if floating animation is enabled */
  isFloatingAnimationEnabled(): boolean;
  /** Check if tracking is enabled */
  isTrackingEnabled(): boolean;

  // Setter methods
  /**
   * Set the animation easing
   * @param easing - Easing preset name or custom cubic-bezier
   */
  setEasing(easing: PointyEasing): void;
  /**
   * Set the animation duration
   * @param duration - Duration in milliseconds
   */
  setAnimationDuration(duration: number): void;
  /**
   * Set the intro fade duration
   * @param duration - Duration in milliseconds
   */
  setIntroFadeDuration(duration: number): void;
  /**
   * Set the bubble fade duration
   * @param duration - Duration in milliseconds
   */
  setBubbleFadeDuration(duration: number): void;
  /**
   * Set the message transition duration
   * @param duration - Duration in milliseconds
   */
  setMessageTransitionDuration(duration: number): void;
  /**
   * Set the message auto-cycle interval
   * @param interval - Interval in ms, null to disable
   */
  setMessageInterval(interval: number | null): void;
  /**
   * Set the offset from target
   * @param offsetX - Horizontal offset
   * @param offsetY - Vertical offset
   */
  setOffset(offsetX: number, offsetY: number): void;
  /**
   * Set reset on complete option
   * @param reset - Whether to reset on complete
   */
  setResetOnComplete(reset: boolean): void;
  /**
   * Set hide on complete option
   * @param hide - Whether to hide on complete
   */
  setHideOnComplete(hide: boolean): void;
  /**
   * Set hide on complete delay
   * @param delay - Delay in ms, null to use animationDuration
   */
  setHideOnCompleteDelay(delay: number | null): void;
  /**
   * Set floating animation enabled/disabled
   * @param enabled - Whether floating animation is enabled
   */
  setFloatingAnimation(enabled: boolean): void;
  /**
   * Set tracking enabled/disabled
   * @param enabled - Whether tracking is enabled
   */
  setTracking(enabled: boolean): void;
  /**
   * Set tracking FPS
   * @param fps - Frames per second (0 = unlimited)
   */
  setTrackingFps(fps: number): void;
  /**
   * Set the initial position
   * @param position - Position preset, CSS selector, or element
   */
  setInitialPosition(position: PointyInitialPosition | string | HTMLElement): void;
  /**
   * Set the initial position offset from edges
   * @param offset - Offset in pixels
   */
  setInitialPositionOffset(offset: number): void;
  /**
   * Set autoplay interval (does not start autoplay)
   * @param interval - Interval in ms, or null to disable
   */
  setAutoplayInterval(interval: number | null): void;
  /**
   * Set autoplay interval and start autoplay
   * @param interval - Interval in ms, or null to disable
   * @deprecated Use setAutoplayInterval() + startAutoplay() instead
   */
  setAutoplay(interval: number | null): void;
  /**
   * Set whether autoplay waits for messages
   * @param wait - Whether to wait for all messages
   */
  setAutoplayWaitForMessages(wait: boolean): void;
  /**
   * Set custom pointer SVG
   * @param svg - SVG markup string or React element
   */
  setPointerSvg(svg: string | React.ReactNode): void;
  /**
   * Set the z-index of the container
   * @param zIndex - CSS z-index value
   */
  setZIndex(zIndex: number): void;
  /**
   * Set stayInViewport enabled/disabled with optional thresholds
   * @param enabled - Whether stayInViewport is enabled
   * @param thresholds - Optional threshold values { x?: number, y?: number }
   */
  setStayInViewport(enabled: boolean, thresholds?: PointyViewportThresholds): void;
  /**
   * Set the pointer direction manually (both horizontal and vertical)
   * @param direction - Direction: 'up', 'down', 'left', 'right', 'up-left', 'up-right', 'down-left', 'down-right', or null for auto
   */
  setDirection(direction: PointyDirection): void;
  /**
   * Set only the horizontal direction
   * @param direction - 'left', 'right', or null for auto
   */
  setHorizontalDirection(direction: PointyHorizontalDirection): void;
  /**
   * Set only the vertical direction
   * @param direction - 'up', 'down', or null for auto
   */
  setVerticalDirection(direction: PointyVerticalDirection): void;

  // Getter methods
  /** Get current pointer SVG or React element */
  getPointerSvg(): string | React.ReactNode;
  /** Get class names object */
  getClassNames(): PointyClassNames;
  /** Get class prefix */
  getClassPrefix(): string;
  /** Get CSS variable prefix */
  getCssVarPrefix(): string;

  // Event methods
  /**
   * Subscribe to an event or event group
   * @param event - Event name, group name ('lifecycle', 'navigation', etc.), or wildcard ('*', 'all')
   * @param callback - Callback function
   * @returns This instance for chaining
   */
  on(event: PointyEvent | PointyEventGroup | string, callback: PointyEventCallback<any>): this;

  /**
   * Subscribe to a lifecycle event
   */
  on(event: PointyLifecycleEvent, callback: PointyEventCallback<PointyLifecycleEventData>): this;

  /**
   * Subscribe to a navigation event
   */
  on(event: PointyNavigationEvent, callback: PointyEventCallback<PointyNavigationEventData>): this;

  /**
   * Subscribe to an animation event
   */
  on(event: PointyAnimationEvent, callback: PointyEventCallback<PointyAnimationEventData>): this;

  /**
   * Subscribe to a content event
   */
  on(event: PointyContentEvent, callback: PointyEventCallback<PointyContentEventData>): this;

  /**
   * Subscribe to a message cycle event
   */
  on(event: PointyMessageCycleEvent, callback: PointyEventCallback<PointyMessageCycleEventData>): this;

  /**
   * Subscribe to a pointing event
   */
  on(event: PointyPointingEvent, callback: PointyEventCallback<PointyPointingEventData>): this;

  /**
   * Subscribe to a tracking event
   */
  on(event: PointyTrackingEvent, callback: PointyEventCallback<PointyTrackingEventData>): this;

  /**
   * Subscribe to an autoplay event
   */
  on(event: PointyAutoplayEvent, callback: PointyEventCallback<PointyAutoplayEventData>): this;

  /**
   * Subscribe to a config change event
   */
  on(event: PointyConfigEvent, callback: PointyEventCallback<PointyConfigChangeEventData>): this;

  /**
   * Subscribe to an event group
   */
  on(event: 'lifecycle', callback: PointyEventCallback<PointyLifecycleEventData>): this;
  on(event: 'navigation', callback: PointyEventCallback<PointyNavigationEventData>): this;
  on(event: 'animation', callback: PointyEventCallback<PointyAnimationEventData>): this;
  on(event: 'content', callback: PointyEventCallback<PointyContentEventData>): this;
  on(event: 'messageCycle', callback: PointyEventCallback<PointyMessageCycleEventData>): this;
  on(event: 'pointing', callback: PointyEventCallback<PointyPointingEventData>): this;
  on(event: 'tracking', callback: PointyEventCallback<PointyTrackingEventData>): this;
  on(event: 'autoplay', callback: PointyEventCallback<PointyAutoplayEventData>): this;
  on(event: 'config', callback: PointyEventCallback<PointyConfigChangeEventData>): this;
  on(event: '*' | 'all', callback: PointyEventCallback<PointyEventData>): this;

  /**
   * Unsubscribe from an event
   * @param event - Event name
   * @param callback - Callback function to remove (omit to remove all)
   * @returns This instance for chaining
   */
  off(event: string, callback?: PointyEventCallback<any>): this;
}

export default Pointy;

export {
  Pointy,
  PointyOptions,
  PointyStep,
  PointyClassNames,
  PointyClassSuffixes,
  PointyInitialPosition,
  PointyEasing,
  PointyDirection,
  PointyHorizontalDirection,
  PointyVerticalDirection,
  PointyViewportThresholds,
  PointyEvent,
  PointyEventGroup,
  PointyEventGroups,
  PointyEventData,
  PointyEventCallback,
  PointyLifecycleEvent,
  PointyLifecycleEventData,
  PointyNavigationEvent,
  PointyNavigationEventData,
  PointyAnimationEvent,
  PointyAnimationEventData,
  PointyDirectionEvent,
  PointyDirectionChangeEventData,
  PointyViewportEvent,
  PointyViewportChangeEventData,
  PointyFlipEventData,
  PointyContentEvent,
  PointyContentEventData,
  PointyMessageCycleEvent,
  PointyMessageCycleEventData,
  PointyPointingEvent,
  PointyPointingEventData,
  PointyTrackingEvent,
  PointyTrackingEventData,
  PointyAutoplayEvent,
  PointyAutoplayEventData,
  PointyConfigEvent,
  PointyConfigChangeEventData,
};
