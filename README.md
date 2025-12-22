# Pointy 👆

A lightweight, dependency-free JavaScript library for creating animated tooltips with a pointing cursor. Perfect for product tours, onboarding flows, and feature highlights.

[![npm version](https://img.shields.io/npm/v/@diabolic/pointy.svg)](https://www.npmjs.com/package/@diabolic/pointy)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> 🎬 [Live Demo](https://bugrakaan.github.io/pointy/)

## ✨ Features

- 🎯 **Animated Pointer** - Smooth cursor animation with customizable SVG
- 📝 **Multi-step Tours** - Create guided product tours with multiple steps
- 💬 **Multi-message Steps** - Each step can have multiple messages that auto-cycle
- 🎬 **Autoplay Mode** - Automatically advance through steps
- 🎨 **Customizable Styling** - CSS variables, custom class names, and SVG support
- 📍 **Target Tracking** - Follows target elements in real-time (configurable FPS)
- ⚛️ **React Compatible** - Supports JSX/React elements as content
- 🔗 **Event System** - Comprehensive events with group listeners
- 🌊 **Smooth Animations** - 11 built-in easing presets
- 📱 **Responsive** - Adapts to window resize and scroll
- 🪶 **Lightweight** - Zero dependencies, ~15KB

## 📦 Installation

```bash
# npm
npm install @diabolic/pointy

# yarn
yarn add @diabolic/pointy


# pnpm
pnpm add @diabolic/pointy
```

### CDN

```html
<!-- UMD (Global variable) -->
<script src="https://unpkg.com/@diabolic/pointy/dist/pointy.min.js"></script>

<!-- Or from jsDelivr -->
<script src="https://cdn.jsdelivr.net/npm/@diabolic/pointy/dist/pointy.min.js"></script>
```

### Direct Script Include

```html
<script src="pointy.js"></script>
```

### Usage

```javascript
// ES6 import
import Pointy from '@diabolic/pointy';

// CommonJS
const Pointy = require('@diabolic/pointy');
```

## 🚀 Quick Start

```javascript
const pointy = new Pointy({
  steps: [
    { target: '#welcome-btn', content: 'Click here to get started!' },
    { target: '#features', content: 'Explore our features' },
    { target: '#settings', content: ['Customize your experience', 'Change themes', 'Set preferences'] }
  ]
});


pointy.show();
```

## 📖 Configuration Options

### Basic Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `steps` | `Array` | `[]` | Array of step objects |
| `target` | `string\|HTMLElement` | `null` | Initial target element (for single-step use) |
| `content` | `string\|string[]` | `''` | Initial content (for single-step use) |

### Step Object

```javascript
{
  target: '#element',           // CSS selector or HTMLElement
  content: 'Message',           // String, HTML, array of strings, or React element
  direction: 'up',              // Optional: 'up', 'down', or null (auto)
  duration: 3000                // Optional: step-specific autoplay duration (ms)
}
```

### Animation Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `animationDuration` | `number` | `1000` | Move animation duration (ms) |
| `introFadeDuration` | `number` | `1000` | Initial fade-in duration (ms) |
| `bubbleFadeDuration` | `number` | `500` | Bubble fade-in duration (ms) |
| `messageTransitionDuration` | `number` | `500` | Message change animation (ms) |
| `easing` | `string` | `'default'` | Easing preset name or custom cubic-bezier |
| `floatingAnimation` | `boolean` | `true` | Enable floating/bobbing animation |

### Position Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `offsetX` | `number` | `20` | Horizontal offset from target |
| `offsetY` | `number` | `16` | Vertical offset from target |
| `initialPosition` | `string\|HTMLElement` | `'center'` | Starting position preset or element |
| `initialPositionOffset` | `number` | `32` | Offset from edges for position presets |
| `resetPositionOnHide` | `boolean` | `false` | Reset position when hiding |

**Initial Position Presets:**
- `'center'` - Center of viewport
- `'top-left'`, `'top-center'`, `'top-right'`
- `'middle-left'`, `'middle-right'`
- `'bottom-left'`, `'bottom-center'`, `'bottom-right'`
- `'first-step'` - Start directly at first step's target (no intro animation)
- CSS selector (e.g., `'#my-element'`)
- HTMLElement reference

### Tracking Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `tracking` | `boolean` | `true` | Enable real-time target tracking |
| `trackingFps` | `number` | `60` | Tracking frame rate (0 = unlimited) |

### Message Cycling Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `messageInterval` | `number\|null` | `null` | Auto-cycle messages interval (ms) |

### Autoplay Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `autoplay` | `number\|null` | `null` | Auto-advance interval (ms), null = manual |
| `autoplayEnabled` | `boolean` | `false` | Whether autoplay is initially enabled |
| `autoplayWaitForMessages` | `boolean` | `true` | Wait for all messages before advancing |

### Completion Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `resetOnComplete` | `boolean` | `true` | Reset to initial position on complete |
| `hideOnComplete` | `boolean` | `true` | Auto-hide after tour completes |
| `hideOnCompleteDelay` | `number\|null` | `null` | Delay before hide (null = animationDuration) |

### Styling Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `classPrefix` | `string` | `'pointy'` | CSS class prefix |
| `classSuffixes` | `object` | `{}` | Custom class suffixes |
| `classNames` | `object` | `{}` | Full override of class names |
| `cssVarPrefix` | `string` | `classPrefix` | CSS variable prefix |
| `pointerSvg` | `string` | Built-in SVG | Custom SVG for pointer |

### Callbacks

| Option | Type | Description |
|--------|------|-------------|
| `onStepChange` | `function(index, step)` | Called when step changes |
| `onComplete` | `function()` | Called when tour completes |

## 🎯 Methods

### Lifecycle

```javascript
pointy.show();        // Show the pointer
pointy.hide();        // Hide the pointer
pointy.destroy();     // Remove and cleanup
pointy.restart();     // Restart from initial position with intro animation
```

### Navigation

```javascript
pointy.next();              // Go to next step
pointy.prev();              // Go to previous step
pointy.goToStep(index);     // Go to specific step by index
pointy.reset();             // Reset to initial position
pointy.reset(false);        // Reset position without changing step
```

### Custom Target

```javascript
// Point to any element without changing the current step
pointy.pointTo('#element');
pointy.pointTo('#element', 'Custom message');
pointy.pointTo('#element', 'Message', 'down'); // Force direction
```

### Content Management

```javascript
pointy.setContent('New message');
pointy.setContent(['Message 1', 'Message 2', 'Message 3']);
pointy.setContent('<strong>HTML</strong> content');

pointy.nextMessage();           // Show next message
pointy.prevMessage();           // Show previous message
pointy.goToMessage(index);      // Go to specific message

pointy.getCurrentMessage();     // Get current message index
pointy.getTotalMessages();      // Get total messages count
```

### Message Cycling

```javascript
pointy.startMessageCycle();       // Start auto-cycling
pointy.startMessageCycle(3000);   // Start with custom interval
pointy.stopMessageCycle();        // Stop cycling
pointy.pauseMessageCycle();       // Pause cycling
pointy.resumeMessageCycle();      // Resume cycling

pointy.isMessageCycleActive();    // Check if cycling
pointy.isMessageCyclePaused();    // Check if paused
```

### Autoplay Control

```javascript
pointy.startAutoplay();       // Start autoplay
pointy.stopAutoplay();        // Stop autoplay
pointy.pauseAutoplay();       // Pause autoplay
pointy.resumeAutoplay();      // Resume autoplay

pointy.isAutoplayActive();    // Check if autoplay is active
pointy.isAutoplayPaused();    // Check if autoplay is paused
```

### State

```javascript
pointy.getCurrentStep();      // Get current step index
pointy.getTotalSteps();       // Get total steps count
pointy.isVisible;             // Check visibility (property)
```

### Setters

All setters emit corresponding `*Change` events:

```javascript
// Animation
pointy.setEasing('bounce');
pointy.setAnimationDuration(800);
pointy.setIntroFadeDuration(500);
pointy.setBubbleFadeDuration(300);
pointy.setMessageTransitionDuration(400);

// Position
pointy.setOffset(30, 20);
pointy.setInitialPosition('top-left');
pointy.setInitialPositionOffset(50);

// Tracking
pointy.setTracking(false);
pointy.setTrackingFps(30);

// Messages
pointy.setMessageInterval(2000);

// Autoplay
pointy.setAutoplayInterval(3000);
pointy.setAutoplayWaitForMessages(false);

// Completion
pointy.setResetOnComplete(false);
pointy.setHideOnComplete(true);
pointy.setHideOnCompleteDelay(500);

// Styling
pointy.setFloatingAnimation(false);
pointy.setPointerSvg('<svg>...</svg>');
```

### Animation

```javascript
pointy.animateToInitialPosition();  // Animate to current initial position
```

## 🎨 Easing Presets

```javascript
// Built-in presets
pointy.setEasing('default');    // Smooth deceleration (default)
pointy.setEasing('bounce');     // Bouncy overshoot
pointy.setEasing('elastic');    // Elastic spring
pointy.setEasing('smooth');     // Symmetric ease
pointy.setEasing('snap');       // Quick snap

// Material Design
pointy.setEasing('standard');   // Material standard
pointy.setEasing('decelerate'); // Material decelerate
pointy.setEasing('accelerate'); // Material accelerate

// Classic curves
pointy.setEasing('expo-out');   // Exponential out
pointy.setEasing('circ-out');   // Circular out
pointy.setEasing('back-out');   // Back out

// CSS built-ins work too
pointy.setEasing('ease');
pointy.setEasing('ease-in-out');
pointy.setEasing('linear');

// Custom cubic-bezier
pointy.setEasing('cubic-bezier(0.68, -0.55, 0.27, 1.55)');
```

Get all available presets:
```javascript
Pointy.getEasingPresets();
// ['default', 'standard', 'decelerate', 'accelerate', 'bounce', 'elastic', ...]
```

## 📡 Events

### Event System

```javascript
// Subscribe to events
pointy.on('show', (data) => {
  console.log('Pointy shown!', data.target);
});

// Unsubscribe
const handler = (data) => console.log(data);
pointy.on('stepChange', handler);
pointy.off('stepChange', handler);

// Remove all listeners for an event
pointy.off('stepChange');

// Chaining
pointy.on('show', fn1).on('hide', fn2).on('complete', fn3);
```

### Event Groups

Listen to multiple related events with a single handler:

```javascript
// Listen to all lifecycle events
pointy.on('lifecycle', (data) => {
  console.log(data.type); // 'beforeShow', 'show', 'hide', etc.
});

// Listen to all navigation events
pointy.on('navigation', (data) => {
  console.log(data.type); // 'stepChange', 'next', 'prev', 'complete'
});

// Listen to ALL events
pointy.on('all', (data) => {
  console.log(data.type, data);
});

// or
pointy.on('*', (data) => { ... });
```

**Available Groups:**
| Group | Events |
|-------|--------|
| `lifecycle` | beforeShow, show, beforeHide, hide, destroy, beforeRestart, restart, beforeReset, reset |
| `navigation` | beforeStepChange, stepChange, next, prev, complete |
| `animation` | animationStart, animationEnd, move, moveComplete, introAnimationStart, introAnimationEnd |
| `content` | contentSet, messagesSet, messageChange |
| `messageCycle` | messageCycleStart, messageCycleStop, messageCyclePause, messageCycleResume, messageCycleComplete |
| `pointing` | beforePointTo, pointTo, pointToComplete |
| `tracking` | track, targetChange, trackingChange, trackingFpsChange |
| `autoplay` | autoplayStart, autoplayStop, autoplayPause, autoplayResume, autoplayNext, autoplayComplete, autoHide |
| `config` | All `*Change` events |

### Static Helpers

```javascript
Pointy.getEventGroup('show');        // 'lifecycle'
Pointy.getEventsInGroup('lifecycle'); // ['beforeShow', 'show', ...]
Pointy.EVENT_GROUPS;                  // All groups object
```

### All Events Reference

#### Lifecycle Events
| Event | Data | Description |
|-------|------|-------------|
| `beforeShow` | `{ target }` | Before pointer becomes visible |
| `show` | `{ target, isIntro, isFirstStep? }` | After pointer becomes visible |
| `beforeHide` | `{ target }` | Before pointer hides |
| `hide` | `{ target }` | After pointer hides |
| `destroy` | `{}` | Instance destroyed |
| `beforeRestart` | `{}` | Before restart |
| `restart` | `{}` | After restart completed |
| `beforeReset` | `{ currentStep }` | Before reset to initial position |
| `reset` | `{ stepIndex }` | After reset completed |

#### Navigation Events
| Event | Data | Description |
|-------|------|-------------|
| `beforeStepChange` | `{ fromIndex, toIndex, step, fromTarget }` | Before step transition |
| `stepChange` | `{ fromIndex, toIndex, step, target }` | After step changed |
| `next` | `{ fromIndex, toIndex }` | Moving to next step |
| `prev` | `{ fromIndex, toIndex }` | Moving to previous step |
| `complete` | `{ totalSteps, source }` | Tour completed (source: 'manual' or 'autoplay') |

#### Animation Events
| Event | Data | Description |
|-------|------|-------------|
| `animationStart` | `{ fromTarget, toTarget, type, stepIndex? }` | Movement started |
| `animationEnd` | `{ fromTarget, toTarget, type, stepIndex? }` | Movement completed |
| `move` | `{ index, step }` | Position update started |
| `moveComplete` | `{ index, step, target }` | Position update finished |
| `introAnimationStart` | `{ duration, initialPosition }` | Intro fade started |
| `introAnimationEnd` | `{ initialPosition }` | Intro fade completed |

#### Content Events
| Event | Data | Description |
|-------|------|-------------|
| `contentSet` | `{ messages, total, animated, cyclePaused }` | Content updated via setContent() |
| `messagesSet` | `{ messages, total, cyclePaused }` | Messages array set for step |
| `messageChange` | `{ fromIndex, toIndex, message, total, isAuto? }` | Message changed |

#### Message Cycle Events
| Event | Data | Description |
|-------|------|-------------|
| `messageCycleStart` | `{ interval, totalMessages }` | Auto-cycling started |
| `messageCycleStop` | `{ currentIndex }` | Auto-cycling stopped |
| `messageCyclePause` | `{ currentIndex }` | Cycling paused |
| `messageCycleResume` | `{ currentIndex }` | Cycling resumed |
| `messageCycleComplete` | `{ stepIndex, totalMessages }` | All messages shown |

#### Pointing Events
| Event | Data | Description |
|-------|------|-------------|
| `beforePointTo` | `{ target, content, direction, fromTarget }` | Before pointTo() |
| `pointTo` | `{ target, content, direction }` | pointTo() called |
| `pointToComplete` | `{ target, content }` | pointTo() animation done |

#### Tracking Events
| Event | Data | Description |
|-------|------|-------------|
| `track` | `{ target, timestamp }` | Position tracked (fires at trackingFps rate) |
| `targetChange` | `{ from, to }` | Target element changed |
| `trackingChange` | `{ from, to }` | Tracking enabled/disabled |
| `trackingFpsChange` | `{ from, to }` | Tracking FPS changed |

#### Autoplay Events
| Event | Data | Description |
|-------|------|-------------|
| `autoplayStart` | `{}` | Autoplay started |
| `autoplayStop` | `{}` | Autoplay stopped |
| `autoplayPause` | `{}` | Autoplay paused |
| `autoplayResume` | `{}` | Autoplay resumed |
| `autoplayNext` | `{ fromIndex, duration?, afterMessages? }` | Auto-advancing |
| `autoplayComplete` | `{ totalSteps }` | Autoplay finished |
| `autoHide` | `{ delay, source }` | Auto-hide triggered |

#### Configuration Events
All setters emit `*Change` events with `{ from, to }` data:
- `easingChange`, `animationDurationChange`, `introFadeDurationChange`
- `bubbleFadeDurationChange`, `messageIntervalChange`, `messageTransitionDurationChange`
- `offsetChange`, `resetOnCompleteChange`, `hideOnCompleteChange`
- `hideOnCompleteDelayChange`, `floatingAnimationChange`
- `initialPositionChange`, `initialPositionOffsetChange`
- `autoplayChange`, `autoplayWaitForMessagesChange`, `pointerSvgChange`

## 🎨 CSS Customization

### CSS Variables

```css
.pointy-container {
  --pointy-duration: 1000ms;      /* Animation duration */
  --pointy-easing: cubic-bezier(0, 0.55, 0.45, 1);  /* Easing */
  --pointy-bubble-fade: 500ms;    /* Bubble fade duration */
}
```

### Custom Class Prefix

```javascript
const pointy = new Pointy({
  classPrefix: 'my-tooltip',  // Uses: my-tooltip-container, my-tooltip-pointer, etc.
  cssVarPrefix: 'tooltip',    // Uses: --tooltip-duration, etc.
  steps: [...]
});
```

### Generated Classes

| Class | Description |
|-------|-------------|
| `{prefix}-container` | Main container element |
| `{prefix}-pointer` | Pointer/cursor element |
| `{prefix}-bubble` | Tooltip bubble |
| `{prefix}-bubble-text` | Text inside bubble |
| `{prefix}-hidden` | Applied when hidden |
| `{prefix}-visible` | Applied when visible |
| `{prefix}-moving` | Applied during animation |

### Custom Pointer SVG

```javascript
const pointy = new Pointy({
  pointerSvg: `
    <svg width="40" height="40" viewBox="0 0 40 40">
      <circle cx="20" cy="20" r="15" fill="#ff6b6b"/>
    </svg>
  `,
  steps: [...]
});

// Or change at runtime
pointy.setPointerSvg('<svg>...</svg>');
```

## ⚛️ React Integration

Pointy supports React elements as content:

```jsx
const pointy = new Pointy({
  steps: [
    {
      target: '#element',
      content: <div><strong>Welcome!</strong> Click to continue</div>
    },
    {
      target: '#features',
      content: [
        <span key="1">First message with <em>JSX</em></span>,
        <span key="2">Second message</span>
      ]
    }
  ]
});
```

## 🔧 Static Methods

```javascript
// Render content (supports string/HTML and React elements)
Pointy.renderContent(element, content);

// Get DOM element from selector or element
Pointy.getTargetElement('#selector');
Pointy.getTargetElement(domElement);

// Generate class names with custom prefix
Pointy.generateClassNames('custom-prefix', { bubble: 'tooltip' });

// Get available presets
Pointy.getEasingPresets();      // ['default', 'bounce', ...]
Pointy.getInitialPositions();   // ['center', 'top-left', ...]

// Event group helpers
Pointy.getEventGroup('show');           // 'lifecycle'
Pointy.getEventsInGroup('navigation');  // ['stepChange', 'next', ...]
Pointy.EVENT_GROUPS;                    // All groups object
```

## 💡 Examples

### Basic Tour

```javascript
const tour = new Pointy({
  steps: [
    { target: '#logo', content: 'Welcome to our app!' },
    { target: '#dashboard', content: 'This is your dashboard' },
    { target: '#settings', content: 'Customize your settings here' }
  ],
  onComplete: () => {
    console.log('Tour completed!');
  }
});

tour.show();
```

### Autoplay Tour

```javascript
const autoTour = new Pointy({
  steps: [
    { target: '#step1', content: 'Step 1' },
    { target: '#step2', content: 'Step 2', duration: 5000 }, // Longer pause
    { target: '#step3', content: 'Step 3' }
  ],
  autoplay: 3000,          // 3 seconds per step
  autoplayEnabled: true,   // Start automatically
  hideOnComplete: true,    // Hide when done
  hideOnCompleteDelay: 500 // Wait 500ms before hiding
});

autoTour.show();
```

### Multi-Message Steps with Auto-Cycle

```javascript
const multiMsg = new Pointy({
  steps: [
    {
      target: '#feature',
      content: [
        'Did you know...',
        'You can click this button',
        'To access advanced features!'
      ]
    }
  ],
  messageInterval: 2500,  // Change message every 2.5s
  autoplay: null,         // Manual navigation
  autoplayWaitForMessages: true
});

multiMsg.show();
```

### Feature Highlight

```javascript
const highlight = new Pointy({
  target: '#new-feature',
  content: 'New! Check out this feature',
  initialPosition: 'bottom-right',
  floatingAnimation: true
});

highlight.show();

// Point to different elements
highlight.pointTo('#another-element', 'Or explore this!');
```

### Event-Driven Tour

```javascript
const eventTour = new Pointy({
  steps: [...],
  messageInterval: 2000
});

eventTour
  .on('show', () => console.log('Tour started'))
  .on('stepChange', ({ toIndex }) => analytics.track('tour_step', toIndex))
  .on('complete', ({ source }) => {
    analytics.track('tour_complete', { source });
  })
  .on('autoHide', () => {
    showFollowUpModal();
  });

eventTour.show();
```

### Pause/Resume on Hover

```javascript
const tour = new Pointy({
  steps: [...],
  autoplay: 3000,
  autoplayEnabled: true
});

tour.bubble.addEventListener('mouseenter', () => {
  tour.pauseAutoplay();
  tour.pauseMessageCycle();
});

tour.bubble.addEventListener('mouseleave', () => {
  tour.resumeAutoplay();
  tour.resumeMessageCycle();
});

tour.show();
```

### Custom Styling

```javascript
const styledPointy = new Pointy({
  classPrefix: 'custom',
  steps: [
    { target: '#el', content: 'Styled tooltip!' }
  ],
  pointerSvg: `
    <svg width="24" height="24" viewBox="0 0 24 24">
      <path d="M12 2L2 12l10 10V2z" fill="#6366f1"/>
    </svg>
  `
});

// Add custom CSS
const style = document.createElement('style');
style.textContent = `
  .custom-bubble {
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    border-radius: 20px;
    padding: 12px 20px;
  }
`;
document.head.appendChild(style);

styledPointy.show();
```

## 🌐 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 📘 TypeScript Support

Pointy includes full TypeScript definitions out of the box. No additional `@types` package needed.

```typescript
import Pointy, { PointyOptions, PointyStep, PointyEventData } from '@diabolic/pointy';

const options: PointyOptions = {
  steps: [
    { target: '#btn', content: 'Click here!' }
  ],
  autoplay: 3000
};

const pointy = new Pointy(options);

// Full type safety for events
pointy.on('stepChange', (data) => {
  console.log(data.fromIndex, data.toIndex); // Types inferred
});

// Type-safe event groups
pointy.on('lifecycle', (data) => {
  console.log(data.type); // 'beforeShow' | 'show' | 'hide' | ...
});
```

### Exported Types

```typescript
import {
  Pointy,
  PointyOptions,
  PointyStep,
  PointyClassNames,
  PointyInitialPosition,
  PointyEasing,
  PointyEvent,
  PointyEventGroup,
  PointyEventData,
  PointyEventCallback,
  // Event-specific data types
  PointyLifecycleEventData,
  PointyNavigationEventData,
  PointyAnimationEventData,
  PointyContentEventData,
  PointyMessageCycleEventData,
  PointyPointingEventData,
  PointyTrackingEventData,
  PointyAutoplayEventData,
  PointyConfigChangeEventData,
} from '@diabolic/pointy';
```

## 📄 License

MIT License - feel free to use in personal and commercial projects.

---

Made with ❤️ for better user experiences.
