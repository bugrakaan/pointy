/**
 * Pointy - A lightweight tooltip library with animated pointer
 * 
 * @description A vanilla JavaScript library for creating animated tooltips with a pointing cursor.
 * Features include multi-step tours, multi-message content, autoplay, custom SVG pointers,
 * and extensive customization options.
 * 
 * @example
 * const pointy = new Pointy({
 *   steps: [
 *     { target: '#element1', content: 'Welcome!' },
 *     { target: '#element2', content: ['Message 1', 'Message 2'] }
 *   ],
 *   autoplay: 3000,
 *   messageInterval: 2500
 * });
 * pointy.show();
 * 
 * @options
 * - steps {Array<{target, content, direction?, duration?}>} - Tour steps
 * - target {string|HTMLElement} - Initial target element
 * - content {string|string[]} - Initial content/messages (single-step use)
 * - offsetX {number} - Horizontal offset from target (default: 20)
 * - offsetY {number} - Vertical offset from target (default: 16)
 * - trackingFps {number} - Position update FPS, 0 = unlimited (default: 60)
 * - animationDuration {number} - Move animation duration in ms (default: 1000)
 * - introFadeDuration {number} - Initial fade-in duration in ms (default: 1000)
 * - bubbleFadeDuration {number} - Bubble fade-in duration in ms (default: 500)
 * - messageTransitionDuration {number} - Message change animation in ms (default: 500)
 * - easing {string} - Easing name or CSS timing function (default: 'default')
 * - messageInterval {number|null} - Auto-cycle messages interval in ms (default: null)
 * - resetOnComplete {boolean} - Reset to initial position on complete (default: true)
 * - floatingAnimation {boolean} - Enable floating animation (default: true)
 * - initialPosition {string|HTMLElement} - Starting position preset or element (default: 'center')
 *   Presets: 'center', 'top-left', 'top-center', 'top-right', 'middle-left', 
 *            'middle-right', 'bottom-left', 'bottom-center', 'bottom-right'
 * - initialPositionOffset {number} - Offset from edges for position presets (default: 32)
 * - resetPositionOnHide {boolean} - Reset position when hiding (default: false)
 * - autoplay {number|null} - Auto-advance interval in ms, null = manual (default: null)
 * - autoplayWaitForMessages {boolean} - Wait for all messages before advancing (default: true)
 * - classPrefix {string} - CSS class prefix (default: 'pointy')
 * - classSuffixes {object} - Custom class suffixes
 * - classNames {object} - Full override of class names
 * - cssVarPrefix {string} - CSS variable prefix (default: classPrefix)
 * - pointerSvg {string} - Custom SVG for pointer
 * - onStepChange {function} - Callback on step change
 * - onComplete {function} - Callback on tour complete
 * 
 * @events
 * Lifecycle:
 * - beforeShow: Before pointer becomes visible
 * - show: Pointer becomes visible
 * - beforeHide: Before pointer is hidden
 * - hide: Pointer is hidden
 * - destroy: Instance is destroyed
 * - beforeRestart: Before restart
 * - restart: After restart completed
 * - beforeReset: Before reset to initial position
 * - reset: After reset to initial position
 * 
 * Navigation:
 * - beforeStepChange: Before step transition
 * - stepChange: After step changed
 * - next: Moving to next step
 * - prev: Moving to previous step
 * - complete: Tour completed (last step finished)
 * 
 * Animation:
 * - animationStart: Movement animation started
 * - animationEnd: Movement animation completed
 * - move: Position update started
 * - moveComplete: Position update finished
 * - introAnimationStart: Initial fade-in animation started
 * - introAnimationEnd: Initial fade-in animation completed
 * 
 * Content:
 * - messagesSet: Messages array replaced via setMessages()
 * - messageUpdate: Single message updated via setMessage()
 * - messageChange: Message changed (navigation or auto-cycle)
 * 
 * Message Cycle:
 * - messageCycleStart: Auto message cycling started
 * - messageCycleStop: Auto message cycling stopped
 * - messageCyclePause: Message cycling paused
 * - messageCycleResume: Message cycling resumed
 * - messageCycleComplete: All messages shown (when autoplayWaitForMessages=true)
 * 
 * Point To:
 * - beforePointTo: Before pointing to custom target
 * - pointTo: Pointed to custom target
 * - pointToComplete: Animation to custom target completed
 * 
 * Target Tracking:
 * - track: Target position tracked (fires at trackingFps rate when enabled)
 * - targetChange: Target element changed
 * - trackingChange: Tracking enabled/disabled
 * - trackingFpsChange: Tracking FPS changed
 * 
 * Autoplay:
 * - autoplayStart: Autoplay started
 * - autoplayStop: Autoplay stopped
 * - autoplayPause: Autoplay paused
 * - autoplayResume: Autoplay resumed
 * - autoplayNext: Auto-advancing to next step
 * - autoplayComplete: Autoplay finished all steps
 * - autoHide: Auto-hide triggered after complete
 * - autoplayChange: Autoplay interval changed
 * - autoplayWaitForMessagesChange: Wait for messages setting changed
 * 
 * Configuration Changes:
 * - easingChange: Easing changed
 * - animationDurationChange: Animation duration changed
 * - introFadeDurationChange: Intro fade duration changed
 * - bubbleFadeDurationChange: Bubble fade duration changed
 * - messageIntervalChange: Message interval changed
 * - messageTransitionDurationChange: Message transition duration changed
 * - offsetChange: Offset changed
 * - resetOnCompleteChange: Reset on complete setting changed
 * - hideOnCompleteChange: Hide on complete setting changed
 * - hideOnCompleteDelayChange: Hide on complete delay changed
 * - floatingAnimationChange: Floating animation setting changed
 * - initialPositionChange: Initial position changed
 * - initialPositionOffsetChange: Initial position offset changed
 * - pointerSvgChange: Pointer SVG changed
 * 
 * @methods
 * Core: show(), hide(), destroy()
 * Navigation: next(), prev(), goToStep(index), reset(), restart()
 * Custom Target: pointTo(target, content?, direction?)
 * Content: setMessages(content), setMessage(msg), nextMessage(), prevMessage(), goToMessage(index)
 * Message Cycle: startMessageCycle(interval?), stopMessageCycle(), pauseMessageCycle(), resumeMessageCycle()
 * Autoplay: startAutoplay(), stopAutoplay(), pauseAutoplay(), resumeAutoplay()
 * Animation: animateToInitialPosition()
 * Events: on(event, callback), off(event, callback)
 * State: getCurrentStep(), getTotalSteps(), isAutoplayActive(), isAutoplayPaused()
 * 
 * Setters (all emit change events):
 * setEasing(), setAnimationDuration(), setIntroFadeDuration(), setBubbleFadeDuration(),
 * setMessageInterval(), setMessageTransitionDuration(), setOffset(), setResetOnComplete(),
 * setFloatingAnimation(), setInitialPosition(), setInitialPositionOffset(),
 * setAutoplay(), setAutoplayWaitForMessages()
 * 
 * Static Helpers:
 * - Pointy.renderContent(element, content) - Render string/JSX to element
 * - Pointy.getTargetElement(target) - Get DOM element from selector/element
 * - Pointy.generateClassNames(prefix, suffixes) - Generate class name object
 */
class Pointy {
  // Named easing presets (only custom ones, CSS built-ins like 'ease', 'linear' work directly)
  static EASINGS = {
    // Default - smooth deceleration
    'default': 'cubic-bezier(0, 0.55, 0.45, 1)',
    // Material Design
    'standard': 'cubic-bezier(0.4, 0, 0.2, 1)',
    'decelerate': 'cubic-bezier(0, 0, 0.2, 1)',
    'accelerate': 'cubic-bezier(0.4, 0, 1, 1)',
    // Expressive
    'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    'elastic': 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
    'smooth': 'cubic-bezier(0.45, 0, 0.55, 1)',
    'snap': 'cubic-bezier(0.5, 0, 0.1, 1)',
    // Classic easing curves
    'expo-out': 'cubic-bezier(0.19, 1, 0.22, 1)',
    'circ-out': 'cubic-bezier(0.075, 0.82, 0.165, 1)',
    'back-out': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
  };

  static POINTER_SVG = `
    <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" fill="none" viewBox="0 0 33 33">
      <g filter="url(#pointy-shadow)">
        <path fill="#0a1551" d="m18.65 24.262 6.316-14.905c.467-1.103-.645-2.215-1.748-1.747L8.313 13.925c-1.088.461-1.083 2.004.008 2.459l5.049 2.104c.325.135.583.393.718.718l2.104 5.049c.454 1.09 1.997 1.095 2.458.007"/>
      </g>
      <defs>
        <filter id="pointy-shadow" width="32.576" height="32.575" x="0" y="0" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse">
          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
          <feOffset/>
          <feGaussianBlur stdDeviation="3.75"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/>
          <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
        </filter>
      </defs>
    </svg>
  `;

  // Default CSS class prefix
  static DEFAULT_CLASS_PREFIX = 'pointy';

  // Default class name suffixes - will be combined with prefix
  static DEFAULT_CLASS_SUFFIXES = {
    container: 'container',
    pointer: 'pointer',
    bubble: 'bubble',
    bubbleText: 'bubble-text',
    hidden: 'hidden',
    visible: 'visible',
    moving: 'moving'
  };

  /**
   * Generate class names from prefix and suffixes
   * @param {string} prefix - Class prefix
   * @param {object} suffixes - Custom suffixes to override defaults
   * @returns {object} - Full class names
   */
  static generateClassNames(prefix = Pointy.DEFAULT_CLASS_PREFIX, suffixes = {}) {
    const s = { ...Pointy.DEFAULT_CLASS_SUFFIXES, ...suffixes };
    return {
      container: `${prefix}-${s.container}`,
      pointer: `${prefix}-${s.pointer}`,
      bubble: `${prefix}-${s.bubble}`,
      bubbleText: `${prefix}-${s.bubbleText}`,
      hidden: `${prefix}-${s.hidden}`,
      visible: `${prefix}-${s.visible}`,
      moving: `${prefix}-${s.moving}`
    };
  }

  // CSS variable prefix (defaults to class prefix)
  static DEFAULT_CSS_VAR_PREFIX = 'pointy';

  /**
   * Generate CSS styles with custom class names
   * @param {object} classNames - Class names object
   * @param {string} cssVarPrefix - CSS variable prefix
   * @returns {string} - CSS styles
   */
  static generateStyles(classNames, cssVarPrefix = 'pointy') {
    const cn = classNames;
    const vp = cssVarPrefix;
    
    return `
    @keyframes ${cn.container}-float {
      0%, 100% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(-8px);
      }
    }

    .${cn.container} {
      position: absolute;
      z-index: 9999;
      font-family: 'Circular', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      --${vp}-duration: 1000ms;
      --${vp}-easing: cubic-bezier(0, 0.55, 0.45, 1);
      --${vp}-bubble-fade: 500ms;
      transition: left var(--${vp}-duration) var(--${vp}-easing), top var(--${vp}-duration) var(--${vp}-easing), opacity 0.3s ease;
      animation: ${cn.container}-float 3s ease-in-out infinite;
    }

    .${cn.container}.${cn.moving} {
      animation-play-state: paused;
    }

    .${cn.container}.${cn.hidden} {
      opacity: 0;
      pointer-events: none;
    }

    .${cn.container}.${cn.visible} {
      opacity: 1;
    }

    .${cn.pointer} {
      width: 33px;
      height: 33px;
      transition: transform var(--${vp}-duration) var(--${vp}-easing);
    }

    .${cn.bubble} {
      position: absolute;
      right: 26px;
      top: 0;
      background: #0a1551;
      color: white;
      padding: 4px 12px;
      border-radius: 14px;
      font-size: 14px;
      line-height: 20px;
      font-weight: 400;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.25);
      white-space: nowrap;
      overflow: hidden;
      transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1), height 0.5s cubic-bezier(0.4, 0, 0.2, 1), transform var(--${vp}-duration) var(--${vp}-easing), opacity var(--${vp}-bubble-fade) ease;
    }

    .${cn.bubbleText} {
      display: inline-block;
    }
  `;
  }

  // Track which style sets have been injected (by stringified classNames)
  static injectedStyleKeys = new Set();

  static injectStyles(classNames, cssVarPrefix = 'pointy') {
    const styleKey = JSON.stringify(classNames) + cssVarPrefix;
    if (Pointy.injectedStyleKeys.has(styleKey)) return;
    
    // Inject Circular font (only once)
    if (!Pointy.fontInjected) {
      const fontLink = document.createElement('link');
      fontLink.href = 'https://cdn.jotfor.ms/fonts/?family=Circular';
      fontLink.rel = 'stylesheet';
      document.head.appendChild(fontLink);
      Pointy.fontInjected = true;
    }
    
    const styleElement = document.createElement('style');
    styleElement.id = `pointy-styles-${styleKey.length}`;
    styleElement.textContent = Pointy.generateStyles(classNames, cssVarPrefix);
    document.head.appendChild(styleElement);
    Pointy.injectedStyleKeys.add(styleKey);
  }
  
  static fontInjected = false;

  static getTargetElement(target) {
    if (typeof target === 'string') {
      return document.querySelector(target);
    }
    return target;
  }

  static animateText(element, newContent, duration = 500, bubble = null, onComplete = null) {
    const hideTime = duration * 0.4;
    const revealTime = duration * 0.6;
    
    // Measure new content dimensions using a hidden container
    let newWidth = null;
    let newHeight = null;
    if (bubble) {
      const measureDiv = document.createElement('div');
      measureDiv.style.cssText = 'visibility: hidden; position: absolute; padding: 4px 12px;';
      Pointy.renderContent(measureDiv, newContent);
      bubble.appendChild(measureDiv);
      // Add horizontal padding (12px left + 12px right = 24px)
      newWidth = measureDiv.offsetWidth;
      newHeight = measureDiv.offsetHeight;
      bubble.removeChild(measureDiv);
      
      // Set current dimensions explicitly to enable transition
      const currentWidth = bubble.offsetWidth;
      const currentHeight = bubble.offsetHeight;
      bubble.style.width = currentWidth + 'px';
      bubble.style.height = currentHeight + 'px';
    }
    
    // Phase 1: Hide old text (clip from left, disappears to right)
    element.style.transition = `clip-path ${hideTime}ms ease-in`;
    element.style.clipPath = 'inset(0 0 0 100%)';
    
    setTimeout(() => {
      // Change content while fully clipped
      Pointy.renderContent(element, newContent);
      
      // Animate bubble to new size
      if (bubble && newWidth !== null) {
        bubble.style.width = newWidth + 'px';
        bubble.style.height = newHeight + 'px';
      }
      
      // Prepare for reveal (start fully clipped from right)
      element.style.transition = 'none';
      element.style.clipPath = 'inset(0 100% 0 0)';
      
      // Force reflow
      element.offsetHeight;
      
      // Phase 2: Reveal new text (appears from left to right)
      element.style.transition = `clip-path ${revealTime}ms ease-out`;
      element.style.clipPath = 'inset(0 0 0 0)';
      
      // Clear dimensions after transition so it can auto-size
      if (bubble) {
        setTimeout(() => {
          bubble.style.width = '';
          bubble.style.height = '';
        }, revealTime + 100);
      }
      
      if (onComplete) onComplete();
    }, hideTime);
  }

  /**
   * Render content to an element - supports string (HTML) and React/JSX elements
   * @param {HTMLElement} element - Target element
   * @param {string|object} content - String (HTML) or React element
   */
  static renderContent(element, content) {
    // Check if it's a React element (has $$typeof symbol)
    if (content && typeof content === 'object' && content.$$typeof) {
      // React element - use ReactDOM if available
      if (typeof ReactDOM !== 'undefined' && ReactDOM.createRoot) {
        // React 18+
        const root = ReactDOM.createRoot(element);
        root.render(content);
        element._reactRoot = root;
      } else if (typeof ReactDOM !== 'undefined' && ReactDOM.render) {
        // React 17 and below
        ReactDOM.render(content, element);
      } else {
        console.warn('Pointy: React element passed but ReactDOM not found');
        element.innerHTML = String(content);
      }
    } else {
      // String content - render as HTML
      element.innerHTML = content;
    }
  }

  constructor(options = {}) {
    // CSS class prefix
    this.classPrefix = options.classPrefix || Pointy.DEFAULT_CLASS_PREFIX;
    
    // Generate class names from prefix and optional custom suffixes
    this.classNames = Pointy.generateClassNames(this.classPrefix, options.classSuffixes);
    
    // Allow full override of class names if provided
    if (options.classNames) {
      this.classNames = { ...this.classNames, ...options.classNames };
    }
    
    // CSS variable prefix for avoiding conflicts (defaults to class prefix)
    this.cssVarPrefix = options.cssVarPrefix || this.classPrefix;
    
    // Custom SVG for pointer
    this.pointerSvg = options.pointerSvg || Pointy.POINTER_SVG;
    
    Pointy.injectStyles(this.classNames, this.cssVarPrefix);

    this.steps = options.steps || [];
    this.offsetX = options.offsetX !== undefined ? options.offsetX : 20;
    this.offsetY = options.offsetY !== undefined ? options.offsetY : 16;
    this.tracking = options.tracking !== undefined ? options.tracking : true; // Enable/disable position tracking
    this.trackingFps = options.trackingFps !== undefined ? options.trackingFps : 60; // 0 = unlimited
    this.animationDuration = options.animationDuration !== undefined ? options.animationDuration : 1000; // ms
    this.introFadeDuration = options.introFadeDuration !== undefined ? options.introFadeDuration : 1000; // ms - pointer fade-in
    this.bubbleFadeDuration = options.bubbleFadeDuration !== undefined ? options.bubbleFadeDuration : 500; // ms - bubble fade-in
    this.messageTransitionDuration = options.messageTransitionDuration !== undefined ? options.messageTransitionDuration : 500; // ms - message change animation
    this.easing = options.easing !== undefined ? options.easing : 'default'; // easing name or custom cubic-bezier
    this.resetOnComplete = options.resetOnComplete !== undefined ? options.resetOnComplete : true; // Reset to initial position on complete
    this.floatingAnimation = options.floatingAnimation !== undefined ? options.floatingAnimation : true; // Enable floating animation
    this.initialPosition = options.initialPosition || 'center'; // 'center', 'top-left', 'top-center', 'top-right', 'middle-left', 'middle-right', 'bottom-left', 'bottom-center', 'bottom-right'
    this.initialPositionOffset = options.initialPositionOffset !== undefined ? options.initialPositionOffset : 32; // Offset from edges for non-center positions
    this.resetPositionOnHide = options.resetPositionOnHide !== undefined ? options.resetPositionOnHide : false; // Reset position when hiding
    this.autoplay = options.autoplay || null; // Auto-advance steps interval in ms, null = manual
    this.autoplayEnabled = options.autoplayEnabled !== undefined ? options.autoplayEnabled : false; // Whether autoplay is enabled
    this.autoplayWaitForMessages = options.autoplayWaitForMessages !== undefined ? options.autoplayWaitForMessages : true; // Wait for all messages before advancing
    this.hideOnComplete = options.hideOnComplete !== undefined ? options.hideOnComplete : true; // Auto-hide after tour completes
    this.hideOnCompleteDelay = options.hideOnCompleteDelay !== undefined ? options.hideOnCompleteDelay : null; // Delay before hide (null = use animationDuration)
    this._autoplayTimeoutId = null;
    this._autoplayPaused = false;
    this._messagesCompletedForStep = false; // Track if all messages have been shown
    this._hideOnCompleteTimeoutId = null; // Timer for auto-hide
    this.onStepChange = options.onStepChange;
    this.onComplete = options.onComplete;
    
    // Event listeners
    this._eventListeners = {};
    
    this.targetElement = options.target ? Pointy.getTargetElement(options.target) : null;
    this.currentStepIndex = 0;
    this.currentMessageIndex = 0;
    this.currentMessages = []; // Current step's messages array
    this.messageInterval = options.messageInterval || null; // Auto-cycle interval in ms, null = manual
    this._messageIntervalId = null;
    this.isVisible = false;
    this.isPointingUp = true;  // Always start pointing up
    this.lastTargetY = null;
    this._targetYHistory = []; // Track Y positions for velocity detection
    this._lastDirectionChangeTime = 0; // Debounce direction changes
    this.manualDirection = null; // 'up', 'down', or null (auto)
    this.moveTimeout = null;
    this._hasShownBefore = false; // For intro animation

    // If steps provided, use first step
    if (this.steps.length > 0) {
      this.targetElement = Pointy.getTargetElement(this.steps[0].target);
    }

    // Create DOM elements - pointer is the anchor, bubble positioned relative to it
    this.container = document.createElement('div');
    this.container.className = `${this.classNames.container} ${this.classNames.hidden}`;
    this.container.style.setProperty(`--${this.cssVarPrefix}-duration`, `${this.animationDuration}ms`);
    this.container.style.setProperty(`--${this.cssVarPrefix}-easing`, this._resolveEasing(this.easing));
    this.container.style.setProperty(`--${this.cssVarPrefix}-bubble-fade`, `${this.bubbleFadeDuration}ms`);
    
    // Apply floating animation setting
    if (!this.floatingAnimation) {
      this.container.style.animationPlayState = 'paused';
    }

    this.pointer = document.createElement('div');
    this.pointer.className = this.classNames.pointer;
    Pointy.renderContent(this.pointer, this.pointerSvg);

    this.bubble = document.createElement('div');
    this.bubble.className = this.classNames.bubble;
    // Set initial bubble position for pointing up (default)
    this.bubble.style.transform = 'translateY(28px)';
    
    this.bubbleText = document.createElement('span');
    this.bubbleText.className = this.classNames.bubbleText;
    
    // Handle initial content (string or array) - no animation on init
    if (this.steps.length > 0) {
      const content = this.steps[0].content;
      this.currentMessages = Array.isArray(content) ? content : [content];
      Pointy.renderContent(this.bubbleText, this.currentMessages[0]);
    } else {
      const content = options.content || '';
      this.currentMessages = Array.isArray(content) ? content : [content];
      Pointy.renderContent(this.bubbleText, this.currentMessages[0]);
    }
    this.currentMessageIndex = 0;
    this.bubble.appendChild(this.bubbleText);

    // Assemble - pointer first, bubble positioned via CSS
    this.container.appendChild(this.pointer);
    this.container.appendChild(this.bubble);

    // Bind methods
    this.updatePosition = this.updatePosition.bind(this);
    this._trackPosition = this._trackPosition.bind(this);
    this._lastTrackTime = 0;

    // Listen for resize and scroll
    window.addEventListener('resize', this.updatePosition);
    window.addEventListener('scroll', this.updatePosition);
  }

  _trackPosition() {
    if (!this.isVisible || !this.targetElement) {
      this._rafId = null;
      return;
    }
    
    // FPS limiting: 0 = unlimited (monitor refresh rate)
    if (this.trackingFps > 0) {
      const now = performance.now();
      const interval = 1000 / this.trackingFps;
      if (now - this._lastTrackTime >= interval) {
        this._lastTrackTime = now;
        this.updatePosition();
        this._emit('track', { target: this.targetElement, timestamp: now });
      }
    } else {
      this.updatePosition();
      this._emit('track', { target: this.targetElement, timestamp: performance.now() });
    }
    
    this._rafId = requestAnimationFrame(this._trackPosition);
  }

  _startTracking() {
    if (!this.tracking) return; // Tracking disabled
    if (!this._rafId) {
      this._trackPosition();
    }
  }

  _stopTracking() {
    if (this._rafId) {
      cancelAnimationFrame(this._rafId);
      this._rafId = null;
    }
  }

  updatePosition() {
    if (!this.targetElement) return;

    const targetRect = this.targetElement.getBoundingClientRect();
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

    // Manual direction takes priority
    if (this.manualDirection !== null) {
      this.isPointingUp = this.manualDirection === 'up';
    } else {
      // Auto: Track velocity over time to detect movement direction
      const currentTargetY = targetRect.top + scrollY;
      const now = Date.now();
      
      // Add to history with timestamp
      this._targetYHistory.push({ y: currentTargetY, time: now });
      
      // Keep only last 200ms of history
      const historyWindow = 200;
      this._targetYHistory = this._targetYHistory.filter(h => now - h.time < historyWindow);
      
      // Calculate velocity if we have enough history
      if (this._targetYHistory.length >= 2) {
        const oldest = this._targetYHistory[0];
        const newest = this._targetYHistory[this._targetYHistory.length - 1];
        const deltaY = newest.y - oldest.y;
        const deltaTime = newest.time - oldest.time;
        
        // Only change direction if significant movement and debounce (300ms between changes)
        const velocityThreshold = 30; // pixels moved in the history window
        const debounceTime = 300;
        
        if (Math.abs(deltaY) > velocityThreshold && (now - this._lastDirectionChangeTime) > debounceTime) {
          const newDirection = deltaY < 0; // Moving up = true, moving down = false
          if (newDirection !== this.isPointingUp) {
            this.isPointingUp = newDirection;
            this._lastDirectionChangeTime = now;
          }
        }
      }
      
      this.lastTargetY = currentTargetY;
    }

    // Pointer tip position varies based on rotation
    // Default SVG (0deg): tip at approximately (25, 8) - points top-right
    // Rotated 90deg: tip at approximately (25, 25) - points bottom-right
    let left, top;

    if (this.isPointingUp) {
      // Pointer points up (default): pointer's top-right → target's bottom-left
      this.pointer.style.transform = 'rotate(0deg)';
      left = targetRect.left + scrollX - 25 + this.offsetX;
      top = targetRect.bottom + scrollY - 8 - this.offsetY;
      
      // Bubble: below pointer
      this.bubble.style.transform = 'translateY(28px)';
    } else {
      // Pointer points down (90deg): pointer's bottom-right → target's top-left
      this.pointer.style.transform = 'rotate(90deg)';
      left = targetRect.left + scrollX - 25 + this.offsetX;
      top = targetRect.top + scrollY - 25 + this.offsetY;
      
      // Bubble: above pointer
      const bubbleHeight = this.bubble.offsetHeight || 28;
      this.bubble.style.transform = `translateY(-${bubbleHeight}px)`;
    }

    this.container.style.left = `${left}px`;
    this.container.style.top = `${top}px`;
  }

  show() {
    this._emit('beforeShow', { target: this.targetElement });
    
    // Cancel any pending auto-hide
    if (this._hideOnCompleteTimeoutId) {
      clearTimeout(this._hideOnCompleteTimeoutId);
      this._hideOnCompleteTimeoutId = null;
    }
    
    if (!document.body.contains(this.container)) {
      document.body.appendChild(this.container);
    }
    
    // First time showing - start from initial position
    if (!this._hasShownBefore) {
      this._hasShownBefore = true;
      
      // Check if starting at first step (no movement needed)
      const isFirstStepStart = this.initialPosition === 'first-step';
      
      // Get initial position based on configuration
      const initialPos = this._getInitialPosition();
      const initialX = initialPos.x;
      const initialY = initialPos.y;
      
      // Disable all movement transitions, only allow opacity fade
      this.container.style.transition = `opacity ${this.introFadeDuration}ms ease`;
      this.pointer.style.transition = 'none';
      this.bubble.style.transition = 'none';
      this.bubble.style.opacity = '0'; // Hide bubble during intro
      this.container.style.left = `${initialX}px`;
      this.container.style.top = `${initialY}px`;
      
      // Set initial pointer/bubble orientation based on direction
      if (isFirstStepStart && initialPos.isPointingUp !== undefined) {
        // Use the direction from first step
        this.isPointingUp = initialPos.isPointingUp;
        if (this.isPointingUp) {
          this.pointer.style.transform = 'rotate(0deg)';
          this.bubble.style.transform = 'translateY(28px)';
        } else {
          this.pointer.style.transform = 'rotate(90deg)';
          const bubbleHeight = this.bubble.offsetHeight || 28;
          this.bubble.style.transform = `translateY(-${bubbleHeight}px)`;
        }
      } else {
        // Default: pointing up
        this.pointer.style.transform = 'rotate(0deg)';
        this.bubble.style.transform = 'translateY(28px)';
      }
      
      this.container.style.display = 'flex';
      this.container.offsetHeight; // Force reflow
      this.container.classList.remove(this.classNames.hidden);
      this.container.classList.add(this.classNames.visible);
      this.isVisible = true;
      
      this._emit('introAnimationStart', { duration: this.introFadeDuration, initialPosition: { x: initialX, y: initialY } });
      
      // Re-enable full transitions after fade-in completes, then animate to target
      setTimeout(() => {
        this._emit('introAnimationEnd', { initialPosition: { x: initialX, y: initialY } });
        
        // If starting at first-step, no movement needed - just show bubble
        if (isFirstStepStart) {
          // Keep transitions disabled - we're already in the right place
          this.container.style.transition = 'none';
          this.pointer.style.transition = 'none';
          
          this._startTracking();
          
          // Show bubble immediately with fade (only if content is not empty)
          const hasContent = this.currentMessages.length > 0 && 
            this.currentMessages.some(m => m !== '' && m !== null && m !== undefined);
          
          this.bubble.style.transition = `opacity ${this.bubbleFadeDuration}ms ease`;
          if (hasContent) {
            this.bubble.style.opacity = '1';
          } else {
            this.bubble.style.opacity = '0';
            this.bubble.style.pointerEvents = 'none';
          }
          
          // Re-enable transitions after bubble fade completes
          setTimeout(() => {
            this.container.style.transition = '';
            this.pointer.style.transition = '';
            this.bubble.style.transition = '';
          }, this.bubbleFadeDuration);
          
          // Start message cycle if multi-message
          if (this.messageInterval && this.currentMessages.length > 1 && !this._messageIntervalId) {
            this._startMessageCycle();
          }
          
          // Schedule autoplay if enabled
          this._scheduleAutoplay();
          
          this._emit('show', { target: this.targetElement, isIntro: true, isFirstStep: true });
        } else {
          // Normal flow: animate to target
          this.container.style.transition = '';
          this.pointer.style.transition = '';
          this.bubble.style.transition = 'none'; // Keep bubble transition off during movement
          this.updatePosition();
          
          // Start tracking
          this._startTracking();
          
          // Show bubble with fade after arriving at first target
          // Show bubble with fade after arriving at first target (only if content is not empty)
          setTimeout(() => {
            const hasContent = this.currentMessages.length > 0 && 
              this.currentMessages.some(m => m !== '' && m !== null && m !== undefined);
            
            this.bubble.style.transition = '';
            if (hasContent) {
              this.bubble.style.opacity = '1';
            } else {
              this.bubble.style.opacity = '0';
              this.bubble.style.pointerEvents = 'none';
            }
            
            // Start message cycle if multi-message
            if (this.messageInterval && this.currentMessages.length > 1 && !this._messageIntervalId) {
              this._startMessageCycle();
            }
            
            // Schedule autoplay if enabled
            this._scheduleAutoplay();
          }, this.animationDuration);
          
          this._emit('show', { target: this.targetElement, isIntro: true, isFirstStep: false });
        }
      }, this.introFadeDuration); // Wait for intro fade to complete
      
      return;
    }
    
    this.container.style.display = 'flex';
    // Force reflow before adding visible class for animation
    this.container.offsetHeight;
    this.container.classList.remove(this.classNames.hidden);
    this.container.classList.add(this.classNames.visible);
    this.isVisible = true;
    this.updatePosition();
    
    // Start tracking
    this._startTracking();
    
    // Resume message cycle if it was paused by hide
    if (this._messageCyclePausedByHide && this.messageInterval && this.currentMessages.length > 1) {
      this._startMessageCycle();
      this._messageCyclePausedByHide = false;
    } else if (this.messageInterval && this.currentMessages.length > 1 && !this._messageIntervalId) {
      // Start message cycle if multi-message and not already running
      this._startMessageCycle();
    }
    
    // Resume autoplay if it was active before hide
    if (this._wasAutoplayActiveBeforeHide) {
      this._scheduleAutoplay();
      this._wasAutoplayActiveBeforeHide = false;
    }
    
    this._emit('show', { target: this.targetElement, isIntro: false });
  }

  hide() {
    this._emit('beforeHide', { target: this.targetElement });
    
    this.container.classList.remove(this.classNames.visible);
    this.container.classList.add(this.classNames.hidden);
    this.isVisible = false;
    
    // Only reset position state if option is enabled
    if (this.resetPositionOnHide) {
      this._hasShownBefore = false;
    }
    
    // Stop tracking
    this._stopTracking();
    
    // Pause message cycle (don't stop - can be resumed)
    if (this._messageIntervalId) {
      this._stopMessageCycle();
      this._messageCyclePausedByHide = true;
    }
    
    // Pause autoplay timer (don't change _autoplayPaused state - just clear timer)
    // This preserves the autoplay state so it can resume on show()
    this._wasAutoplayActiveBeforeHide = this.autoplay && this.autoplayEnabled && !this._autoplayPaused;
    this._stopAutoplay();
    
    this._emit('hide', { target: this.targetElement });
  }

  /**
   * Restart the intro animation from initial position
   * Useful for demoing initial position changes
   */
  restart() {
    this._emit('beforeRestart', {});
    this._hasShownBefore = false;
    
    if (this.isVisible) {
      this.container.classList.remove(this.classNames.visible);
      this.container.classList.add(this.classNames.hidden);
      this._stopTracking();
      this._stopMessageCycle();
      this.isVisible = false;
      
      // Small delay to allow CSS transition to complete
      setTimeout(() => {
        this.goToStep(0);
        this.show();
        this._emit('restart', {});
      }, 50);
    } else {
      this.goToStep(0);
      this.show();
      this._emit('restart', {});
    }
  }

  destroy() {
    this._emit('destroy', {});
    
    if (document.body.contains(this.container)) {
      document.body.removeChild(this.container);
    }
    window.removeEventListener('resize', this.updatePosition);
    window.removeEventListener('scroll', this.updatePosition);
    
    // Stop tracking
    this._stopTracking();
    
    // Clear auto-hide timer
    if (this._hideOnCompleteTimeoutId) {
      clearTimeout(this._hideOnCompleteTimeoutId);
      this._hideOnCompleteTimeoutId = null;
    }
    
    // Clear all event listeners
    this._eventListeners = {};
  }

  /**
   * Reset pointer to initial position and optionally go back to first step
   * @param {boolean} goToFirstStep - Whether to reset step index to 0 (default: true)
   */
  reset(goToFirstStep = true) {
    this._emit('beforeReset', { currentStep: this.currentStepIndex });
    
    // Stop message cycle
    this._stopMessageCycle();
    
    // Clear hide on complete timeout if exists
    if (this._hideOnCompleteTimeoutId) {
      clearTimeout(this._hideOnCompleteTimeoutId);
      this._hideOnCompleteTimeoutId = null;
    }
    
    // Pause floating animation during movement
    this.container.classList.add(this.classNames.moving);
    if (this.moveTimeout) clearTimeout(this.moveTimeout);
    
    // Animate to initial position
    const { x: initialX, y: initialY } = this._getInitialPosition();
    
    this.container.style.left = `${initialX}px`;
    this.container.style.top = `${initialY}px`;
    
    // Fade out bubble during reset
    this.bubble.style.opacity = '0';
    
    // Reset step index if requested
    if (goToFirstStep && this.steps.length > 0) {
      this.currentStepIndex = 0;
      const firstStep = this.steps[0];
      this.targetElement = Pointy.getTargetElement(firstStep.target);
      this.currentMessages = Array.isArray(firstStep.content) ? firstStep.content : [firstStep.content];
      this.currentMessageIndex = 0;
      Pointy.renderContent(this.bubbleText, this.currentMessages[0]);
    }
    
    // After animation completes
    this.moveTimeout = setTimeout(() => {
      this.container.classList.remove(this.classNames.moving);
      this._hasShownBefore = false; // Allow intro animation again
      this._emit('reset', { stepIndex: this.currentStepIndex });
    }, this.animationDuration);
  }

  /**
   * Set resetOnComplete option
   * @param {boolean} reset - Whether to reset on complete
   */
  setResetOnComplete(reset) {
    const oldValue = this.resetOnComplete;
    if (oldValue === reset) return;
    
    this.resetOnComplete = reset;
    this._emit('resetOnCompleteChange', { from: oldValue, to: reset });
  }

  /**
   * Set floating animation enabled/disabled
   * @param {boolean} enabled - Whether floating animation is enabled
   */
  setFloatingAnimation(enabled) {
    const oldValue = this.floatingAnimation;
    if (oldValue === enabled) return;
    
    this.floatingAnimation = enabled;
    
    if (enabled) {
      this.container.style.animationPlayState = '';
    } else {
      this.container.style.animationPlayState = 'paused';
    }
    
    this._emit('floatingAnimationChange', { from: oldValue, to: enabled });
  }

  /**
   * Check if floating animation is enabled
   * @returns {boolean}
   */
  isFloatingAnimationEnabled() {
    return this.floatingAnimation;
  }

  /**
   * Set tracking enabled/disabled
   * @param {boolean} enabled - Whether position tracking is enabled
   */
  setTracking(enabled) {
    const oldValue = this.tracking;
    if (oldValue === enabled) return;
    
    this.tracking = enabled;
    
    if (enabled && this.isVisible) {
      this._startTracking();
    } else if (!enabled) {
      this._stopTracking();
    }
    
    this._emit('trackingChange', { from: oldValue, to: enabled });
  }

  /**
   * Set tracking FPS
   * @param {number} fps - Frames per second (0 = unlimited)
   */
  setTrackingFps(fps) {
    const oldValue = this.trackingFps;
    if (oldValue === fps) return;
    
    this.trackingFps = fps;
    this._emit('trackingFpsChange', { from: oldValue, to: fps });
  }

  /**
   * Check if tracking is enabled
   * @returns {boolean}
   */
  isTrackingEnabled() {
    return this.tracking;
  }

  updateContent(newContent, animate = true) {
    // Check if content is empty
    const isEmpty = newContent === '' || newContent === null || newContent === undefined ||
      (Array.isArray(newContent) && newContent.length === 0) ||
      (Array.isArray(newContent) && newContent.every(m => m === '' || m === null || m === undefined));
    
    if (isEmpty) {
      // Hide bubble when content is empty
      this.bubble.style.opacity = '0';
      this.bubble.style.pointerEvents = 'none';
      return;
    }
    
    // Track if bubble was hidden (needs special handling)
    const wasHidden = this.bubble.style.opacity === '0';
    
    // Show bubble if it was hidden - need to make visible BEFORE measuring
    if (wasHidden && this.isVisible) {
      // Temporarily disable ALL transitions for instant position update
      const oldBubbleTransition = this.bubble.style.transition;
      const oldPointerTransition = this.pointer.style.transition;
      this.bubble.style.transition = 'none';
      this.pointer.style.transition = 'none';
      
      this.bubble.style.opacity = '1';
      this.bubble.style.pointerEvents = '';
      
      // Force reflow to apply opacity
      this.bubble.offsetHeight;
      
      // Update position with bubble visible (so offsetHeight works)
      this.updatePosition();
      
      // Force another reflow to apply position
      this.bubble.offsetHeight;
      
      // Re-enable transitions after a frame
      requestAnimationFrame(() => {
        this.bubble.style.transition = oldBubbleTransition;
        this.pointer.style.transition = oldPointerTransition;
      });
    }
    
    // Skip if content is the same (only for string content)
    if (typeof newContent === 'string' && this.bubbleText.innerHTML === newContent) {
      return;
    }
    
    if (animate) {
      Pointy.animateText(this.bubbleText, newContent, this.messageTransitionDuration, this.bubble, () => {
        this.updatePosition();
      });
    } else {
      Pointy.renderContent(this.bubbleText, newContent);
      this.updatePosition();
    }
  }

  /**
   * Set messages for current step (internal)
   * @param {string|string[]} content - Single message or array of messages
   * @param {boolean} fromStepChange - Whether this is from a step change (internal)
   * @private
   */
  _applyMessages(content, fromStepChange = false) {
    // Check if cycle was running before
    const wasRunning = this._messageIntervalId !== null;
    
    // Stop any existing auto-cycle
    this._stopMessageCycle();
    
    // Normalize to array
    this.currentMessages = Array.isArray(content) ? content : [content];
    this.currentMessageIndex = 0;
    
    // Show first message
    this.updateContent(this.currentMessages[0]);
    
    // Only auto-start cycle on step changes, not on manual setMessages
    // For manual setMessages, user must call resumeMessageCycle()
    if (fromStepChange && this.messageInterval && this.currentMessages.length > 1) {
      this._startMessageCycle();
    } else if (wasRunning && this.currentMessages.length > 1) {
      // Mark as paused so user can resume
      this._messageCyclePaused = true;
    }
    
    this._emit('messagesSet', { 
      messages: this.currentMessages, 
      total: this.currentMessages.length,
      cyclePaused: this._messageCyclePaused === true
    });
  }

  /**
   * Start auto-cycling through messages
   * @private
   */
  _startMessageCycle() {
    this._messagesCompletedForStep = false;
    this._messageIntervalId = setInterval(() => {
      // Check if we're at the last message and autoplay is waiting for messages
      const isLastMessage = this.currentMessageIndex === this.currentMessages.length - 1;
      
      if (isLastMessage && this.autoplay && this.autoplayWaitForMessages) {
        // Don't cycle back to first message - stop here and advance to next step
        this._stopMessageCycle();
        this._messagesCompletedForStep = true;
        this._emit('messageCycleComplete', { stepIndex: this.currentStepIndex, totalMessages: this.currentMessages.length });
        // Trigger autoplay advance after a brief pause
        this._scheduleAutoplayAfterMessages();
      } else {
        // Normal message cycling
        this.nextMessage(true); // true = isAuto
      }
    }, this.messageInterval);
    this._emit('messageCycleStart', { interval: this.messageInterval, totalMessages: this.currentMessages.length });
  }

  /**
   * Stop auto-cycling through messages
   * @private
   */
  _stopMessageCycle() {
    if (this._messageIntervalId) {
      clearInterval(this._messageIntervalId);
      this._messageIntervalId = null;
      this._emit('messageCycleStop', { currentIndex: this.currentMessageIndex });
    }
  }

  /**
   * Pause auto message cycling (can be resumed later)
   */
  pauseMessageCycle() {
    if (this._messageIntervalId) {
      clearInterval(this._messageIntervalId);
      this._messageIntervalId = null;
      this._messageCyclePaused = true;
      this._emit('messageCyclePause', { currentIndex: this.currentMessageIndex });
    }
  }

  /**
   * Resume paused message cycling
   * @returns {boolean} - True if resumed, false if not paused or no interval set
   */
  resumeMessageCycle() {
    if (this._messageCyclePaused && this.messageInterval && this.currentMessages.length > 1) {
      this._messageCyclePaused = false;
      this._startMessageCycle();
      this._emit('messageCycleResume', { currentIndex: this.currentMessageIndex });
      return true;
    }
    return false;
  }

  /**
   * Start message cycling manually (regardless of messageInterval setting)
   * @param {number} interval - Optional interval in ms, uses current messageInterval if not provided
   * @returns {boolean} - True if started, false if already running or no messages
   */
  startMessageCycle(interval) {
    if (this._messageIntervalId) return false; // Already running
    if (this.currentMessages.length <= 1) return false; // No point cycling single message
    
    if (interval !== undefined) {
      this.messageInterval = interval;
    }
    
    if (!this.messageInterval) return false;
    
    this._messageCyclePaused = false;
    this._startMessageCycle();
    return true;
  }

  /**
   * Stop message cycling completely
   * @returns {boolean} - True if stopped, false if not running
   */
  stopMessageCycle() {
    if (this._messageIntervalId) {
      this._stopMessageCycle();
      this._messageCyclePaused = false;
      return true;
    }
    return false;
  }

  /**
   * Check if message cycling is currently active
   * @returns {boolean}
   */
  isMessageCycleActive() {
    return this._messageIntervalId !== null;
  }

  /**
   * Check if message cycling is paused
   * @returns {boolean}
   */
  isMessageCyclePaused() {
    return this._messageCyclePaused === true;
  }

  /**
   * Go to next message in current step
   * @param {boolean} isAuto - Whether this is from auto-cycle (internal use)
   * @returns {boolean} - True if moved to next, false if at end
   */
  nextMessage(isAuto = false) {
    if (this.currentMessages.length <= 1) return false;
    
    const previousIndex = this.currentMessageIndex;
    this.currentMessageIndex = (this.currentMessageIndex + 1) % this.currentMessages.length;
    
    this.updateContent(this.currentMessages[this.currentMessageIndex]);
    
    this._emit('messageChange', {
      fromIndex: previousIndex,
      toIndex: this.currentMessageIndex,
      message: this.currentMessages[this.currentMessageIndex],
      total: this.currentMessages.length,
      isAuto: isAuto
    });
    
    return true;
  }

  /**
   * Go to previous message in current step
   * @returns {boolean} - True if moved to previous, false if at start
   */
  prevMessage() {
    if (this.currentMessages.length <= 1) return false;
    
    const previousIndex = this.currentMessageIndex;
    this.currentMessageIndex = (this.currentMessageIndex - 1 + this.currentMessages.length) % this.currentMessages.length;
    
    this.updateContent(this.currentMessages[this.currentMessageIndex]);
    
    this._emit('messageChange', {
      fromIndex: previousIndex,
      toIndex: this.currentMessageIndex,
      message: this.currentMessages[this.currentMessageIndex],
      total: this.currentMessages.length
    });
    
    return true;
  }

  /**
   * Go to a specific message by index
   * @param {number} index - Message index
   */
  goToMessage(index) {
    if (index < 0 || index >= this.currentMessages.length) return;
    
    const previousIndex = this.currentMessageIndex;
    this.currentMessageIndex = index;
    
    this.updateContent(this.currentMessages[this.currentMessageIndex]);
    
    this._emit('messageChange', {
      fromIndex: previousIndex,
      toIndex: this.currentMessageIndex,
      message: this.currentMessages[this.currentMessageIndex],
      total: this.currentMessages.length
    });
  }

  /**
   * Get current message index
   * @returns {number}
   */
  getCurrentMessage() {
    return this.currentMessageIndex;
  }

  /**
   * Get total messages in current step
   * @returns {number}
   */
  getTotalMessages() {
    return this.currentMessages.length;
  }

  /**
   * Set/update the current message (at current index)
   * @param {string} message - New message content
   * @param {boolean} animate - Whether to animate the change (default: true)
   */
  setMessage(message, animate = true) {
    const oldMessage = this.currentMessages[this.currentMessageIndex];
    this.currentMessages[this.currentMessageIndex] = message;
    
    this.updateContent(message, animate);
    
    // Ensure position is updated immediately for non-animated changes
    if (!animate) {
      this.updatePosition();
    }
    
    this._emit('messageUpdate', {
      index: this.currentMessageIndex,
      message: message,
      oldMessage: oldMessage,
      total: this.currentMessages.length,
      animated: animate
    });
  }

  /**
   * Set messages programmatically (replaces current messages)
   * @param {string|string[]} content - Single message or array of messages
   * @param {boolean} animate - Whether to animate the change (default: true)
   */
  setMessages(content, animate = true) {
    // Check if cycle was running before
    const wasRunning = this._messageIntervalId !== null;
    
    if (animate) {
      this._applyMessages(content, false); // false = not from step change
    } else {
      // Stop any existing auto-cycle
      this._stopMessageCycle();
      
      // Normalize to array
      this.currentMessages = Array.isArray(content) ? content : [content];
      this.currentMessageIndex = 0;
      
      // Show first message without animation
      Pointy.renderContent(this.bubbleText, this.currentMessages[0]);
      this.updatePosition();
      
      // Mark as paused if cycle was running (user must call resumeMessageCycle)
      if (wasRunning && this.currentMessages.length > 1) {
        this._messageCyclePaused = true;
      }
    }
    
    this._emit('messagesSet', { 
      messages: this.currentMessages, 
      total: this.currentMessages.length,
      animated: animate,
      cyclePaused: this._messageCyclePaused === true
    });
  }

  /**
   * Set message auto-cycle interval
   * @param {number|null} interval - Interval in ms, null to disable
   */
  setMessageInterval(interval) {
    const oldInterval = this.messageInterval;
    if (oldInterval === interval) return;
    
    this.messageInterval = interval;
    this._stopMessageCycle();
    
    if (interval && this.currentMessages.length > 1) {
      this._startMessageCycle();
    }
    
    this._emit('messageIntervalChange', { from: oldInterval, to: interval });
  }

  updateTarget(newTarget) {
    const oldTarget = this.targetElement;
    this.targetElement = Pointy.getTargetElement(newTarget);
    this.updatePosition();
    this._emit('targetChange', { from: oldTarget, to: this.targetElement });
  }

  setOffset(offsetX, offsetY) {
    const oldOffsetX = this.offsetX;
    const oldOffsetY = this.offsetY;
    if (oldOffsetX === offsetX && oldOffsetY === offsetY) return;
    
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.updatePosition();
    this._emit('offsetChange', { from: { x: oldOffsetX, y: oldOffsetY }, to: { x: offsetX, y: offsetY } });
  }

  /**
   * Set the animation duration for transitions
   * @param {number} duration - Duration in milliseconds
   */
  setAnimationDuration(duration) {
    const oldDuration = this.animationDuration;
    if (oldDuration === duration) return;
    
    this.animationDuration = duration;
    this.container.style.setProperty(`--${this.cssVarPrefix}-duration`, `${duration}ms`);
    this._emit('animationDurationChange', { from: oldDuration, to: duration });
  }

  /**
   * Set the intro fade duration (pointer appearing from center)
   * @param {number} duration - Duration in milliseconds
   */
  setIntroFadeDuration(duration) {
    const oldDuration = this.introFadeDuration;
    if (oldDuration === duration) return;
    
    this.introFadeDuration = duration;
    this._emit('introFadeDurationChange', { from: oldDuration, to: duration });
  }

  /**
   * Set the bubble fade duration
   * @param {number} duration - Duration in milliseconds
   */
  setBubbleFadeDuration(duration) {
    const oldDuration = this.bubbleFadeDuration;
    if (oldDuration === duration) return;
    
    this.bubbleFadeDuration = duration;
    this.container.style.setProperty(`--${this.cssVarPrefix}-bubble-fade`, `${duration}ms`);
    this._emit('bubbleFadeDurationChange', { from: oldDuration, to: duration });
  }

  /**
   * Get the initial position coordinates based on initialPosition setting
   * @returns {{x: number, y: number, isPointingUp?: boolean}} - Position coordinates and optional direction
   */
  _getInitialPosition() {
    const offset = this.initialPositionOffset;
    const w = window.innerWidth;
    const h = window.innerHeight;
    
    // Special preset: first-step - calculate exact position like updatePosition does
    if (this.initialPosition === 'first-step' && this.steps.length > 0) {
      const firstStep = this.steps[0];
      const firstTarget = Pointy.getTargetElement(firstStep.target);
      if (firstTarget) {
        const targetRect = firstTarget.getBoundingClientRect();
        const scrollX = window.scrollX;
        const scrollY = window.scrollY;
        
        // Check step direction: 'up', 'down', or auto (default to 'up')
        const isPointingUp = firstStep.direction !== 'down';
        
        let left, top;
        if (isPointingUp) {
          // Pointing up: pointer below target
          left = targetRect.left + scrollX - 25 + this.offsetX;
          top = targetRect.bottom + scrollY - 8 - this.offsetY;
        } else {
          // Pointing down: pointer above target
          left = targetRect.left + scrollX - 25 + this.offsetX;
          top = targetRect.top + scrollY - 25 + this.offsetY;
        }
        
        return { x: left, y: top, isPointingUp };
      }
    }
    
    // If initialPosition is an element or selector, get its position
    if (this.initialPosition && typeof this.initialPosition !== 'string') {
      // It's a DOM element
      const rect = this.initialPosition.getBoundingClientRect();
      return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    }
    
    // Check if it's a selector string (starts with # or .)
    if (typeof this.initialPosition === 'string' && (this.initialPosition.startsWith('#') || this.initialPosition.startsWith('.'))) {
      const el = document.querySelector(this.initialPosition);
      if (el) {
        const rect = el.getBoundingClientRect();
        return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
      }
    }
    
    // Preset positions
    const positions = {
      'center': { x: w / 2, y: h / 2 },
      'top-left': { x: offset, y: offset },
      'top-center': { x: w / 2, y: offset },
      'top-right': { x: w - offset, y: offset },
      'middle-left': { x: offset, y: h / 2 },
      'middle-right': { x: w - offset, y: h / 2 },
      'bottom-left': { x: offset, y: h - offset },
      'bottom-center': { x: w / 2, y: h - offset },
      'bottom-right': { x: w - offset, y: h - offset }
    };
    
    return positions[this.initialPosition] || positions['center'];
  }

  /**
   * Set the initial position
   * @param {string|HTMLElement} position - Position preset ('center', 'top-left', 'first-step', etc.), CSS selector, or DOM element
   */
  setInitialPosition(position) {
    const validPresets = ['center', 'top-left', 'top-center', 'top-right', 'middle-left', 'middle-right', 'bottom-left', 'bottom-center', 'bottom-right', 'first-step'];
    
    // Validate if it's a string preset
    if (typeof position === 'string' && !position.startsWith('#') && !position.startsWith('.') && !validPresets.includes(position)) {
      console.warn(`Invalid initial position: ${position}. Valid presets: ${validPresets.join(', ')}. Or use a CSS selector or DOM element.`);
      return;
    }
    
    const oldPosition = this.initialPosition;
    if (oldPosition === position) return;
    
    this.initialPosition = position;
    this._emit('initialPositionChange', { from: oldPosition, to: position });
  }

  /**
   * Animate to initial position (useful for demoing position changes)
   * Flow: teleport hidden to new position -> fade in -> move to target
   */
  animateToInitialPosition() {
    if (!this.isVisible) return;
    
    const { x, y } = this._getInitialPosition();
    
    // Stop tracking during animation
    this._stopTracking();
    
    // Step 1: Teleport hidden to new initial position (no transition, instant)
    this.container.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      opacity: 0;
      transition: none;
    `;
    this.bubble.style.opacity = '0';
    this.bubble.style.transition = 'none';
    
    // Force reflow to apply instant position change
    this.container.offsetHeight;
    
    // Step 2: Fade in at new initial position (only opacity animates)
    this.container.style.transition = `opacity ${this.introFadeDuration}ms ease`;
    this.container.style.opacity = '1';
    
    // Step 3: After fade in completes, animate movement to target
    setTimeout(() => {
      // Restore normal transitions for movement
      this.container.style.transition = '';
      this.container.style.cssText = '';
      this.container.style.left = `${x}px`;
      this.container.style.top = `${y}px`;
      
      // Force reflow
      this.container.offsetHeight;
      
      // Now animate to target
      this.updatePosition();
      this._startTracking();
      
      // Show bubble after arriving at target
      setTimeout(() => {
        this.bubble.style.transition = '';
        this.bubble.style.opacity = '1';
      }, this.animationDuration);
    }, this.introFadeDuration);
  }

  /**
   * Set the initial position offset from edges (for non-center positions)
   * @param {number} offset - Offset in pixels (can be negative to go off-screen)
   */
  setInitialPositionOffset(offset) {
    const oldOffset = this.initialPositionOffset;
    if (oldOffset === offset) return;
    
    this.initialPositionOffset = offset;
    this._emit('initialPositionOffsetChange', { from: oldOffset, to: offset });
  }

  /**
   * Resolve easing name to CSS value
   * @param {string} easing - Easing name or custom cubic-bezier
   * @returns {string} - CSS easing value
   */
  _resolveEasing(easing) {
    // If it's a named preset, return the value
    if (Pointy.EASINGS[easing]) {
      return Pointy.EASINGS[easing];
    }
    // Otherwise assume it's a custom cubic-bezier or CSS easing
    return easing;
  }

  /**
   * Set the animation easing
   * @param {string} easing - Easing name (e.g., 'bounce', 'elastic') or custom cubic-bezier
   */
  setEasing(easing) {
    const oldEasing = this.easing;
    if (oldEasing === easing) return;
    
    this.easing = easing;
    this.container.style.setProperty(`--${this.cssVarPrefix}-easing`, this._resolveEasing(easing));
    this._emit('easingChange', { from: oldEasing, to: easing });
  }

  /**
   * Set the message transition duration
   * @param {number} duration - Duration in milliseconds
   */
  setMessageTransitionDuration(duration) {
    const oldDuration = this.messageTransitionDuration;
    if (oldDuration === duration) return;
    
    this.messageTransitionDuration = duration;
    this._emit('messageTransitionDurationChange', { from: oldDuration, to: duration });
  }

  /**
   * Set custom pointer SVG
   * @param {string|React.ReactNode} svg - SVG markup string or React element
   */
  setPointerSvg(svg) {
    const oldSvg = this.pointerSvg;
    if (oldSvg === svg) return;
    
    this.pointerSvg = svg;
    Pointy.renderContent(this.pointer, svg);
    this._emit('pointerSvgChange', { from: oldSvg, to: svg });
  }

  /**
   * Get current pointer SVG
   * @returns {string|React.ReactNode} - Current SVG markup or React element
   */
  getPointerSvg() {
    return this.pointerSvg;
  }

  /**
   * Get the class names object
   * @returns {object} - Current class names
   */
  getClassNames() {
    return { ...this.classNames };
  }

  /**
   * Get the class prefix
   * @returns {string} - Current class prefix
   */
  getClassPrefix() {
    return this.classPrefix;
  }

  /**
   * Get the CSS variable prefix
   * @returns {string} - Current CSS variable prefix
   */
  getCssVarPrefix() {
    return this.cssVarPrefix;
  }

  /**
   * Get list of available easing presets
   * @returns {string[]} - Array of easing names
   */
  static getEasingPresets() {
    return Object.keys(Pointy.EASINGS);
  }

  /**
   * Get list of available initial position presets
   * @returns {string[]} - Array of position names
   */
  static getInitialPositions() {
    return ['center', 'top-left', 'top-center', 'top-right', 'middle-left', 'middle-right', 'bottom-left', 'bottom-center', 'bottom-right', 'first-step'];
  }

  goToStep(index) {
    if (this.steps.length === 0 || index < 0 || index >= this.steps.length) return;
    
    // Stop any existing autoplay timer
    this._stopAutoplay();
    
    // Reset message completion tracking for new step
    this._messagesCompletedForStep = false;
    
    const previousIndex = this.currentStepIndex;
    const previousTarget = this.targetElement;
    this.currentStepIndex = index;
    const step = this.steps[this.currentStepIndex];
    
    this._emit('beforeStepChange', { 
      fromIndex: previousIndex, 
      toIndex: index, 
      step: step,
      fromTarget: previousTarget
    });
    
    // Set direction: step.direction can be 'up', 'down', or undefined (auto)
    this.manualDirection = step.direction || null;
    
    // Reset velocity tracking for new target
    this._targetYHistory = [];
    this.lastTargetY = null;
    
    // Pause floating animation during movement
    this.container.classList.add(this.classNames.moving);
    if (this.moveTimeout) clearTimeout(this.moveTimeout);
    
    this._emit('animationStart', { 
      fromTarget: previousTarget, 
      toTarget: Pointy.getTargetElement(step.target),
      type: 'step',
      stepIndex: index
    });
    
    this.moveTimeout = setTimeout(() => {
      this.container.classList.remove(this.classNames.moving);
      this._emit('moveComplete', { index: index, step: step, target: this.targetElement });
      this._emit('animationEnd', { 
        fromTarget: previousTarget, 
        toTarget: this.targetElement,
        type: 'step',
        stepIndex: index
      });
      
      // Schedule next step if autoplay is enabled
      this._scheduleAutoplay();
    }, this.animationDuration);
    
    this._emit('move', { index: index, step: step });
    
    this._applyMessages(step.content, true); // true = from step change, auto-start cycle
    this.targetElement = Pointy.getTargetElement(step.target);
    this.updatePosition();
    
    this._emit('stepChange', { 
      fromIndex: previousIndex, 
      toIndex: index, 
      step: step, 
      target: this.targetElement 
    });
    
    if (this.onStepChange) {
      this.onStepChange(this.currentStepIndex, step);
    }
  }

  /**
   * Schedule the next autoplay step
   * @private
   */
  _scheduleAutoplay() {
    if (!this.autoplay || !this.autoplayEnabled || this._autoplayPaused || !this.isVisible) return;
    
    const step = this.steps[this.currentStepIndex];
    const hasMultipleMessages = this.currentMessages.length > 1 && this.messageInterval;
    
    // If waiting for messages and step has multiple messages with auto-cycle, don't schedule here
    // The _startMessageCycle will handle advancing after all messages are shown
    if (this.autoplayWaitForMessages && hasMultipleMessages) {
      return; // Wait for message cycle to complete
    }
    
    // Use step-specific duration if provided, otherwise use global autoplay
    const duration = step.duration !== undefined ? step.duration : this.autoplay;
    
    if (duration && duration > 0) {
      this._autoplayTimeoutId = setTimeout(() => {
        if (!this._autoplayPaused && this.isVisible && this.autoplayEnabled) {
          this._emit('autoplayNext', { fromIndex: this.currentStepIndex, duration });
          this.next();
        }
      }, duration);
    }
  }

  /**
   * Schedule autoplay advance after message cycle completes
   * @private
   */
  _scheduleAutoplayAfterMessages() {
    if (!this.autoplay || !this.autoplayEnabled || this._autoplayPaused || !this.isVisible) return;
    
    // Use a short delay before advancing (user can read the last message during messageInterval already)
    const delay = 300; // Brief pause after last message before advancing
    
    this._autoplayTimeoutId = setTimeout(() => {
      if (!this._autoplayPaused && this.isVisible && this._messagesCompletedForStep) {
        this._emit('autoplayNext', { fromIndex: this.currentStepIndex, afterMessages: true });
        this.next();
      }
    }, delay);
  }

  /**
   * Stop autoplay timer
   * @private
   */
  _stopAutoplay() {
    if (this._autoplayTimeoutId) {
      clearTimeout(this._autoplayTimeoutId);
      this._autoplayTimeoutId = null;
    }
  }

  /**
   * Start autoplay
   */
  startAutoplay() {
    if (!this.autoplay) return;
    this.autoplayEnabled = true;
    this._autoplayPaused = false;
    this._emit('autoplayStart', {});
    this._scheduleAutoplay();
  }

  /**
   * Stop autoplay
   */
  stopAutoplay() {
    this._stopAutoplay();
    this.autoplayEnabled = false;
    this._autoplayPaused = false;
    this._emit('autoplayStop', {});
  }

  /**
   * Pause autoplay (can be resumed)
   */
  pauseAutoplay() {
    this._stopAutoplay();
    this._autoplayPaused = true;
    this._emit('autoplayPause', {});
  }

  /**
   * Resume autoplay after pause
   */
  resumeAutoplay() {
    if (!this._autoplayPaused) return;
    this._autoplayPaused = false;
    this._emit('autoplayResume', {});
    this._scheduleAutoplay();
  }

  /**
   * Check if autoplay is currently active
   * @returns {boolean}
   */
  isAutoplayActive() {
    return this.autoplay && this.autoplayEnabled && !this._autoplayPaused;
  }

  /**
   * Check if autoplay is paused
   * @returns {boolean}
   */
  isAutoplayPaused() {
    return this._autoplayPaused;
  }

  /**
   * Set autoplay interval (does not start autoplay, use startAutoplay() for that)
   * @param {number|null} interval - Interval in ms, or null to disable
   */
  setAutoplayInterval(interval) {
    const oldInterval = this.autoplay;
    if (oldInterval === interval) return;
    
    this.autoplay = interval;
    this._emit('autoplayChange', { from: oldInterval, to: interval });
    
    // If autoplay is enabled and running, restart with new interval
    if (this.autoplayEnabled && interval && this.isVisible) {
      this._stopAutoplay();
      this._scheduleAutoplay();
    } else if (!interval) {
      this._stopAutoplay();
      this.autoplayEnabled = false;
    }
  }

  /**
   * Set autoplay interval and start autoplay (legacy method, use setAutoplayInterval + startAutoplay instead)
   * @param {number|null} interval - Interval in ms, or null to disable
   */
  setAutoplay(interval) {
    this.setAutoplayInterval(interval);
    
    // Start autoplay if interval is set
    if (interval && this.isVisible) {
      this.autoplayEnabled = true;
      this._autoplayPaused = false;
      this.restart(); // Full restart from initial position
    }
  }

  /**
   * Set whether autoplay should wait for all messages to complete before advancing
   * @param {boolean} wait - True to wait for messages, false to use normal duration
   */
  setAutoplayWaitForMessages(wait) {
    const oldValue = this.autoplayWaitForMessages;
    if (oldValue === wait) return;
    
    this.autoplayWaitForMessages = wait;
    this._emit('autoplayWaitForMessagesChange', { from: oldValue, to: wait });
  }

  /**
   * Set whether to auto-hide after tour completes
   * @param {boolean} hide - True to auto-hide, false to stay visible
   */
  setHideOnComplete(hide) {
    const oldValue = this.hideOnComplete;
    if (oldValue === hide) return;
    
    this.hideOnComplete = hide;
    this._emit('hideOnCompleteChange', { from: oldValue, to: hide });
  }

  /**
   * Set the delay before auto-hiding after complete
   * @param {number|null} delay - Delay in ms, or null to use animationDuration
   */
  setHideOnCompleteDelay(delay) {
    const oldValue = this.hideOnCompleteDelay;
    if (oldValue === delay) return;
    
    this.hideOnCompleteDelay = delay;
    this._emit('hideOnCompleteDelayChange', { from: oldValue, to: delay });
  }

  next() {
    if (this.steps.length === 0) return;
    
    if (this.currentStepIndex < this.steps.length - 1) {
      this._emit('next', { fromIndex: this.currentStepIndex, toIndex: this.currentStepIndex + 1 });
      this.goToStep(this.currentStepIndex + 1);
    } else {
      // Check if autoplay was active before emitting complete
      const wasAutoplayActive = this.autoplay && this.autoplayEnabled && !this._autoplayPaused;
      
      this._emit('complete', { totalSteps: this.steps.length, source: wasAutoplayActive ? 'autoplay' : 'manual' });
      
      // Emit autoplayComplete if autoplay was running
      if (wasAutoplayActive) {
        this._stopAutoplay();
        this.autoplayEnabled = false;
        this._emit('autoplayComplete', { totalSteps: this.steps.length });
      }
      
      // Handle post-completion behavior based on settings
      // Note: hideOnComplete is respected for both autoplay and manual navigation
      if (this.resetOnComplete) {
        this.reset();
        
        // Schedule hide after reset animation completes (only if hideOnComplete is true)
        if (this.hideOnComplete) {
          const hideDelay = this.hideOnCompleteDelay !== null ? this.hideOnCompleteDelay : this.animationDuration;
          const source = wasAutoplayActive ? 'autoplay' : 'manual';
          this._hideOnCompleteTimeoutId = setTimeout(() => {
            this.hide();
            this._emit('autoHide', { delay: hideDelay, source: source });
          }, this.animationDuration + hideDelay);
        }
      } else {
        // No reset: hide immediately after delay (only if hideOnComplete is true)
        if (this.hideOnComplete) {
          const delay = this.hideOnCompleteDelay !== null ? this.hideOnCompleteDelay : this.animationDuration;
          const source = wasAutoplayActive ? 'autoplay' : 'manual';
          this._hideOnCompleteTimeoutId = setTimeout(() => {
            this.hide();
            this._emit('autoHide', { delay: delay, source: source });
          }, delay);
        }
      }
      
      if (this.onComplete) {
        this.onComplete();
      }
    }
  }

  prev() {
    if (this.steps.length === 0) return;
    
    if (this.currentStepIndex > 0) {
      this._emit('prev', { fromIndex: this.currentStepIndex, toIndex: this.currentStepIndex - 1 });
      this.goToStep(this.currentStepIndex - 1);
    }
  }

  getCurrentStep() {
    return this.currentStepIndex;
  }

  getTotalSteps() {
    return this.steps.length;
  }

  /**
   * Temporarily point to a target without changing the current step.
   * When next() is called, it will continue from where it left off.
   * @param {string|HTMLElement} target - The target element or selector
   * @param {string} content - Optional content to show
   * @param {string} direction - Optional direction: 'up', 'down', or null for auto
   */
  pointTo(target, content, direction) {
    const previousTarget = this.targetElement;
    
    // Determine actual direction ('auto' means will be calculated in updatePosition)
    const actualDirection = direction || 'auto';
    
    this._emit('beforePointTo', { 
      target: Pointy.getTargetElement(target), 
      content: content,
      direction: actualDirection,
      fromTarget: previousTarget
    });
    
    // Set manual direction (null means auto)
    this.manualDirection = direction || null;
    
    // Reset velocity tracking for new target
    this._targetYHistory = [];
    this.lastTargetY = null;
    
    // Pause floating animation during movement
    this.container.classList.add(this.classNames.moving);
    if (this.moveTimeout) clearTimeout(this.moveTimeout);
    
    const toTarget = Pointy.getTargetElement(target);
    
    this._emit('animationStart', { 
      fromTarget: previousTarget, 
      toTarget: toTarget,
      type: 'pointTo',
      content: content
    });
    
    this.targetElement = toTarget;
    
    if (content !== undefined) {
      this._applyMessages(content, false); // false = not from step change, don't auto-start cycle
    } else {
      // No new content - keep cycling if it was running
      // (cycle state is preserved)
    }
    
    this.updatePosition();
    
    // Get the resolved direction after updatePosition calculates it
    const resolvedDirection = this.isPointingUp ? 'up' : 'down';
    
    this.moveTimeout = setTimeout(() => {
      this.container.classList.remove(this.classNames.moving);
      this._emit('pointToComplete', { target: this.targetElement, content: content, direction: resolvedDirection });
      this._emit('animationEnd', { 
        fromTarget: previousTarget, 
        toTarget: this.targetElement,
        type: 'pointTo',
        content: content
      });
    }, this.animationDuration);
    
    this._emit('pointTo', { target: this.targetElement, content: content, direction: resolvedDirection });
    
    // Make sure it's visible
    if (!this.isVisible) {
      this.show();
    }
  }

  /**
   * Subscribe to an event
   * @param {string} event - Event name
   * @param {function} callback - Callback function
   * @returns {Pointy} - Returns this for chaining
   * 
   * Available events:
   * 
   * Lifecycle:
   * - beforeShow: Before pointy becomes visible
   * - show: After pointy becomes visible
   * - beforeHide: Before pointy hides
   * - hide: After pointy hides
   * - destroy: When pointy is destroyed
   * - beforeReset: Before reset() is called
   * - reset: After reset completes
   * - beforeRestart: Before restart() is called
   * - restart: After restart completes
   * 
   * Navigation:
   * - beforeStepChange: Before changing to a new step
   * - stepChange: After step has changed
   * - next: When next() is called
   * - prev: When prev() is called
   * - complete: When tour reaches the end
   * - beforePointTo: Before pointTo() moves to target
   * - pointTo: When pointTo() is called
   * - pointToComplete: When pointTo animation completes
   * 
   * Animation:
   * - move: When pointy starts moving to a target
   * - moveComplete: When pointy finishes moving (after animation)
   * - animationStart: When any movement animation starts (step or pointTo)
   * - animationEnd: When any movement animation ends (step or pointTo)
   * - track: Each time position is updated during tracking
   * 
   * Content:
   * - messagesSet: When messages array is set for a step
   * - messageChange: When current message changes (next/prev message) - includes isAuto flag
   * - messagesSet: When setMessages() is called
   * - messageCycleStart: When auto message cycling starts
   * - messageCycleStop: When auto message cycling stops
   * - messageCyclePause: When message cycling is paused
   * - messageCycleResume: When message cycling is resumed
   * - messageCycleComplete: When all messages have been shown (autoplayWaitForMessages)
   * 
   * Autoplay:
   * - autoplayStart: When autoplay starts
   * - autoplayStop: When autoplay stops
   * - autoplayPause: When autoplay is paused
   * - autoplayResume: When autoplay is resumed
   * - autoplayNext: When autoplay triggers next step
   * - autoplayComplete: When autoplay finishes all steps
   * - autoplayChange: When autoplay interval changes
   * - autoplayWaitForMessagesChange: When autoplayWaitForMessages option changes
   * 
   * Configuration changes:
   * - targetChange: When target element changes
   * - offsetChange: When offset values change
   * - animationDurationChange: When animation duration changes
   * - introFadeDurationChange: When intro fade duration changes
   * - bubbleFadeDurationChange: When bubble fade duration changes
   * - easingChange: When easing changes
   * - messageIntervalChange: When message interval changes
   * - messageTransitionDurationChange: When message transition duration changes
   * - pointerSvgChange: When pointer SVG changes
   * - resetOnCompleteChange: When resetOnComplete option changes
   * - floatingAnimationChange: When floating animation is toggled
   * - initialPositionChange: When initial position preset changes
   * - initialPositionOffsetChange: When initial position offset changes
   * 
   * Generic Event Groups (listen to multiple events with one handler):
   * - 'lifecycle': beforeShow, show, beforeHide, hide, destroy, beforeRestart, restart, beforeReset, reset
   * - 'navigation': beforeStepChange, stepChange, next, prev, complete
   * - 'animation': animationStart, animationEnd, move, moveComplete, introAnimationStart, introAnimationEnd
   * - 'content': contentSet, messagesSet, messageChange
   * - 'messageCycle': messageCycleStart, messageCycleStop, messageCyclePause, messageCycleResume, messageCycleComplete
   * - 'pointing': beforePointTo, pointTo, pointToComplete
   * - 'tracking': track, targetChange, trackingChange, trackingFpsChange
   * - 'autoplay': autoplayStart, autoplayStop, autoplayPause, autoplayResume, autoplayNext, autoplayComplete, autoHide, autoplayChange, autoplayWaitForMessagesChange
   * - 'config': all *Change events
   * - '*' or 'all': all events
   * 
   * Example: pointy.on('lifecycle', (data) => console.log(data.type, data));
   */
  on(event, callback) {
    if (!this._eventListeners[event]) {
      this._eventListeners[event] = [];
    }
    this._eventListeners[event].push(callback);
    return this;
  }

  /**
   * Unsubscribe from an event
   * @param {string} event - Event name
   * @param {function} callback - Callback function to remove
   * @returns {Pointy} - Returns this for chaining
   */
  off(event, callback) {
    if (!this._eventListeners[event]) return this;
    
    if (callback) {
      this._eventListeners[event] = this._eventListeners[event].filter(cb => cb !== callback);
    } else {
      // Remove all listeners for this event
      delete this._eventListeners[event];
    }
    return this;
  }

  /**
   * Emit an event
   * @param {string} event - Event name
   * @param {object} data - Event data
   * @private
   */
  _emit(event, data) {
    const eventData = { ...data, type: event, pointy: this };
    
    // Emit to specific event listeners
    if (this._eventListeners[event]) {
      this._eventListeners[event].forEach(callback => {
        try {
          callback(eventData);
        } catch (e) {
          console.error(`Pointy: Error in ${event} event handler:`, e);
        }
      });
    }
    
    // Find which group this event belongs to and emit to group listeners
    const group = Pointy.getEventGroup(event);
    if (group && this._eventListeners[group]) {
      this._eventListeners[group].forEach(callback => {
        try {
          callback(eventData);
        } catch (e) {
          console.error(`Pointy: Error in ${group} group handler for ${event}:`, e);
        }
      });
    }
    
    // Emit to wildcard listeners ('*' or 'all')
    ['*', 'all'].forEach(wildcard => {
      if (this._eventListeners[wildcard]) {
        this._eventListeners[wildcard].forEach(callback => {
          try {
            callback(eventData);
          } catch (e) {
            console.error(`Pointy: Error in wildcard handler for ${event}:`, e);
          }
        });
      }
    });
  }

  /**
   * Get the group name for an event
   * @param {string} event - Event name
   * @returns {string|null} - Group name or null if not in a group
   */
  static getEventGroup(event) {
    for (const [group, events] of Object.entries(Pointy.EVENT_GROUPS)) {
      if (events.includes(event)) {
        return group;
      }
    }
    // Check if it's a config change event
    if (event.endsWith('Change')) {
      return 'config';
    }
    return null;
  }

  /**
   * Get all events in a group
   * @param {string} group - Group name
   * @returns {string[]} - Array of event names
   */
  static getEventsInGroup(group) {
    return Pointy.EVENT_GROUPS[group] || [];
  }
}

/**
 * Event groups for generic listeners
 */
Pointy.EVENT_GROUPS = {
  lifecycle: ['beforeShow', 'show', 'beforeHide', 'hide', 'destroy', 'beforeRestart', 'restart', 'beforeReset', 'reset'],
  navigation: ['beforeStepChange', 'stepChange', 'next', 'prev', 'complete'],
  animation: ['animationStart', 'animationEnd', 'move', 'moveComplete', 'introAnimationStart', 'introAnimationEnd'],
  content: ['contentSet', 'messagesSet', 'messageChange'],
  messageCycle: ['messageCycleStart', 'messageCycleStop', 'messageCyclePause', 'messageCycleResume', 'messageCycleComplete'],
  pointing: ['beforePointTo', 'pointTo', 'pointToComplete'],
  tracking: ['track', 'targetChange', 'trackingChange', 'trackingFpsChange'],
  autoplay: ['autoplayStart', 'autoplayStop', 'autoplayPause', 'autoplayResume', 'autoplayNext', 'autoplayComplete', 'autoHide', 'autoplayChange', 'autoplayWaitForMessagesChange'],
  // 'config' is handled dynamically for all *Change events
};

// Export for different module systems
export default Pointy;
