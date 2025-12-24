# Pointy

A lightweight, dependency-free JavaScript library for creating animated tooltips with a pointing cursor. Perfect for product tours, onboarding flows, and feature highlights.

[![npm version](https://img.shields.io/npm/v/@diabolic/pointy.svg)](https://www.npmjs.com/package/@diabolic/pointy)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> [Live Demo](https://bugrakaan.github.io/pointy/)

## Features

- 🎯 **Animated Pointer** - Smooth cursor animation with customizable SVG
- 📝 **Multi-step Tours** - Create guided product tours with multiple steps
- 💬 **Multi-message Steps** - Each step can have multiple messages that auto-cycle
- 🎬 **Autoplay Mode** - Automatically advance through steps
- 🎨 **Customizable Styling** - CSS variables, custom class names, and SVG support
- 📍 **Target Tracking** - Follows target elements in real-time
- ⚛️ **React Compatible** - Supports JSX/React elements as content
- 🔗 **Event System** - Comprehensive events with group listeners
- 🌊 **Smooth Animations** - 11 built-in easing presets
- 🪶 **Lightweight** - Zero dependencies, ~15KB

## Installation

```bash
npm install @diabolic/pointy
```

### CDN

```html
<script src="https://unpkg.com/@diabolic/pointy/dist/pointy.min.js"></script>
```

## Quick Start

```javascript
import Pointy from '@diabolic/pointy';

const pointy = new Pointy({
  steps: [
    { target: '#welcome-btn', content: 'Click here to get started!' },
    { target: '#features', content: 'Explore our features' },
    { target: '#settings', content: ['Customize your experience', 'Change themes', 'Set preferences'] }
  ]
});

pointy.show();
```

## Configuration

### Basic Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `steps` | `Array` | `[]` | Array of step objects |
| `target` | `string\|HTMLElement` | `null` | Initial target (single-step use) |
| `content` | `string\|string[]` | `''` | Initial content (single-step use) |

### Step Object

```javascript
{
  target: '#element',           // CSS selector or HTMLElement
  content: 'Message',           // String, HTML, array, or React element
  direction: 'up',              // 'up', 'down', or null (auto)
  duration: 3000                // Step-specific autoplay duration (ms)
}
```

### Animation

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `animationDuration` | `number` | `1000` | Move animation duration (ms) |
| `introFadeDuration` | `number` | `1000` | Initial fade-in duration (ms) |
| `bubbleFadeDuration` | `number` | `500` | Bubble fade duration (ms) |
| `easing` | `string` | `'default'` | Easing preset or cubic-bezier |
| `floatingAnimation` | `boolean` | `true` | Enable floating animation |

### Position

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `offsetX` | `number` | `20` | Horizontal offset from target |
| `offsetY` | `number` | `16` | Vertical offset from target |
| `initialPosition` | `string` | `'center'` | Starting position preset |
| `tracking` | `boolean` | `true` | Enable real-time target tracking |
| `zIndex` | `number` | `9999` | CSS z-index for the container |

**Initial Position Presets:** `'center'`, `'top-left'`, `'top-center'`, `'top-right'`, `'middle-left'`, `'middle-right'`, `'bottom-left'`, `'bottom-center'`, `'bottom-right'`, `'first-step'`

### Autoplay

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `autoplay` | `number\|null` | `null` | Auto-advance interval (ms) |
| `autoplayEnabled` | `boolean` | `false` | Start autoplay on show |
| `autoplayWaitForMessages` | `boolean` | `true` | Wait for all messages |
| `messageInterval` | `number\|null` | `null` | Message auto-cycle interval (ms) |

### Completion

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `resetOnComplete` | `boolean` | `true` | Reset to initial position |
| `hideOnComplete` | `boolean` | `true` | Auto-hide after completion |
| `hideOnCompleteDelay` | `number\|null` | `null` | Delay before hide (ms) |

### Callbacks

| Option | Type | Description |
|--------|------|-------------|
| `onStepChange` | `function(index, step)` | Called when step changes |
| `onComplete` | `function()` | Called when tour completes |

## Methods

### Lifecycle

```javascript
pointy.show();        // Show the pointer
pointy.hide();        // Hide the pointer
pointy.destroy();     // Remove and cleanup
pointy.restart();     // Restart from initial position
```

### Navigation

```javascript
pointy.next();              // Go to next step
pointy.prev();              // Go to previous step
pointy.goToStep(index);     // Go to specific step
pointy.reset();             // Reset to initial position
```

### Content

```javascript
pointy.setMessage('Single message');            // Replace all with single message
pointy.setMessages(['Message 1', 'Message 2']); // Set multiple messages

pointy.setCurrentMessage('Updated text');       // Update message at current index only

pointy.nextMessage();
pointy.prevMessage();
pointy.goToMessage(index);
```

### Point to Custom Target

```javascript
pointy.pointTo('#element');
pointy.pointTo('#element', 'Custom message');
pointy.pointTo('#element', 'Message', 'down');
```

### Autoplay Control

```javascript
pointy.startAutoplay();
pointy.stopAutoplay();
pointy.pauseAutoplay();
pointy.resumeAutoplay();
```

### Message Cycling

```javascript
pointy.startMessageCycle();
pointy.stopMessageCycle();
pointy.pauseMessageCycle();
pointy.resumeMessageCycle();
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
pointy.setFloatingAnimation(true);

// Position
pointy.setOffset(30, 20);
pointy.setInitialPosition('top-left');
pointy.setInitialPositionOffset(50);
pointy.setZIndex(10000);

// Tracking
pointy.setTracking(true);
pointy.setTrackingFps(30);

// Messages
pointy.setMessageInterval(2000);

// Autoplay
pointy.setAutoplayInterval(3000);
pointy.setAutoplayWaitForMessages(true);

// Completion
pointy.setResetOnComplete(true);
pointy.setHideOnComplete(true);
pointy.setHideOnCompleteDelay(500);

// Styling
pointy.setPointerSvg('<svg>...</svg>');
```

## Easing Presets

```javascript
pointy.setEasing('default');    // Smooth deceleration
pointy.setEasing('bounce');     // Bouncy overshoot
pointy.setEasing('elastic');    // Elastic spring
pointy.setEasing('smooth');     // Symmetric ease
pointy.setEasing('snap');       // Quick snap
pointy.setEasing('expo-out');   // Exponential out
pointy.setEasing('back-out');   // Back out

// CSS built-ins
pointy.setEasing('ease');
pointy.setEasing('linear');

// Custom
pointy.setEasing('cubic-bezier(0.68, -0.55, 0.27, 1.55)');
```

## Events

```javascript
pointy.on('show', (data) => console.log('Shown!'));
pointy.on('stepChange', (data) => console.log(data.toIndex));
pointy.on('complete', (data) => console.log('Done!'));

// Unsubscribe
pointy.off('stepChange', handler);
```

### Event Groups

Listen to multiple related events at once:

```javascript
pointy.on('lifecycle', (data) => {
  // Fires for: show, hide, destroy, restart, reset
  console.log(data.type);
});

pointy.on('navigation', (data) => {
  // Fires for: stepChange, next, prev, complete
});

pointy.on('all', (data) => {
  // Fires for ALL events
});
```

**Available Groups:** `lifecycle`, `navigation`, `animation`, `content`, `messageCycle`, `pointing`, `tracking`, `autoplay`, `config`

### All Events

#### Lifecycle
| Event | Data |
|-------|------|
| `beforeShow` | `{ target }` |
| `show` | `{ target, isIntro, isFirstStep? }` |
| `beforeHide` | `{ target }` |
| `hide` | `{ target }` |
| `destroy` | `{}` |
| `beforeRestart` | `{}` |
| `restart` | `{}` |
| `beforeReset` | `{ currentStep }` |
| `reset` | `{ stepIndex }` |

#### Navigation
| Event | Data |
|-------|------|
| `beforeStepChange` | `{ fromIndex, toIndex, step, fromTarget }` |
| `stepChange` | `{ fromIndex, toIndex, step, target }` |
| `next` | `{ fromIndex, toIndex }` |
| `prev` | `{ fromIndex, toIndex }` |
| `complete` | `{ totalSteps, source }` |

#### Animation
| Event | Data |
|-------|------|
| `animationStart` | `{ fromTarget, toTarget, type, stepIndex? }` |
| `animationEnd` | `{ fromTarget, toTarget, type, stepIndex? }` |
| `move` | `{ index, step }` |
| `moveComplete` | `{ index, step, target }` |
| `introAnimationStart` | `{ duration, initialPosition }` |
| `introAnimationEnd` | `{ initialPosition }` |

#### Content
| Event | Data |
|-------|------|
| `messagesSet` | `{ messages, total, animated, cyclePaused }` |
| `currentMessageUpdate` | `{ index, message, oldMessage, total, animated }` |
| `messageChange` | `{ fromIndex, toIndex, message, total, isAuto? }` |

#### Message Cycle
| Event | Data |
|-------|------|
| `messageCycleStart` | `{ interval, totalMessages }` |
| `messageCycleStop` | `{ currentIndex }` |
| `messageCyclePause` | `{ currentIndex }` |
| `messageCycleResume` | `{ currentIndex }` |
| `messageCycleComplete` | `{ stepIndex, totalMessages }` |

#### Pointing
| Event | Data |
|-------|------|
| `beforePointTo` | `{ target, content, direction, fromTarget }` |
| `pointTo` | `{ target, content, direction }` |
| `pointToComplete` | `{ target, content }` |

#### Tracking
| Event | Data |
|-------|------|
| `track` | `{ target, timestamp }` |
| `targetChange` | `{ from, to }` |
| `trackingChange` | `{ from, to }` |
| `trackingFpsChange` | `{ from, to }` |

#### Autoplay
| Event | Data |
|-------|------|
| `autoplayStart` | `{}` |
| `autoplayStop` | `{}` |
| `autoplayPause` | `{}` |
| `autoplayResume` | `{}` |
| `autoplayNext` | `{ fromIndex, duration?, afterMessages? }` |
| `autoplayComplete` | `{ totalSteps }` |
| `autoHide` | `{ delay, source }` |

#### Config
All setter methods emit `*Change` events with `{ from, to }` data.

## CSS Customization

### CSS Variables

```css
.pointy-container {
  --pointy-duration: 1000ms;
  --pointy-easing: cubic-bezier(0, 0.55, 0.45, 1);
  --pointy-bubble-fade: 500ms;
}
```

### Custom Class Names

Customize class prefix or override specific class names:

```javascript
// Change prefix (default: 'pointy')
const pointy = new Pointy({
  classPrefix: 'my-tour',  // → .my-tour-container, .my-tour-bubble, etc.
  steps: [...]
});

// Override specific suffixes
const pointy = new Pointy({
  classSuffixes: {
    container: 'wrapper',  // → .pointy-wrapper instead of .pointy-container
    bubble: 'tooltip'      // → .pointy-tooltip instead of .pointy-bubble
  },
  steps: [...]
});

// Full class name override
const pointy = new Pointy({
  classNames: {
    container: 'custom-container',
    pointer: 'custom-pointer',
    bubble: 'custom-bubble',
    bubbleText: 'custom-text',
    hidden: 'is-hidden',
    visible: 'is-visible',
    moving: 'is-moving'
  },
  steps: [...]
});
```

**Default Class Names:**

| Key | Default | Description |
|-----|---------|-------------|
| `container` | `pointy-container` | Main wrapper element |
| `pointer` | `pointy-pointer` | Pointer/cursor element |
| `bubble` | `pointy-bubble` | Message bubble |
| `bubbleText` | `pointy-bubble-text` | Text inside bubble |
| `hidden` | `pointy-hidden` | Hidden state |
| `visible` | `pointy-visible` | Visible state |
| `moving` | `pointy-moving` | During animation |

### CSS Variable Prefix

```javascript
const pointy = new Pointy({
  cssVarPrefix: 'tour',  // → --tour-duration, --tour-easing, etc.
  steps: [...]
});
```

### Custom Pointer SVG

```javascript
const pointy = new Pointy({
  pointerSvg: `<svg width="40" height="40">...</svg>`,
  steps: [...]
});
```

## Examples

### Basic Tour

```javascript
const tour = new Pointy({
  steps: [
    { target: '#logo', content: 'Welcome to our app!' },
    { target: '#dashboard', content: 'This is your dashboard' },
    { target: '#settings', content: 'Customize settings here' }
  ]
});

tour.show();
```

### Autoplay Tour

```javascript
const tour = new Pointy({
  steps: [
    { target: '#step1', content: 'Step 1' },
    { target: '#step2', content: 'Step 2', duration: 5000 },
    { target: '#step3', content: 'Step 3' }
  ],
  autoplay: 3000,
  autoplayEnabled: true,
  hideOnComplete: true
});

tour.show();
```

### Multi-Message Steps

```javascript
const tour = new Pointy({
  steps: [{
    target: '#feature',
    content: [
      'Did you know...',
      'You can click this button',
      'To access advanced features!'
    ]
  }],
  messageInterval: 2500
});

tour.show();
```

### Pause on Hover

```javascript
const tour = new Pointy({
  steps: [...],
  autoplay: 3000,
  autoplayEnabled: true
});

tour.container.addEventListener('mouseenter', () => tour.pauseAutoplay());
tour.container.addEventListener('mouseleave', () => tour.resumeAutoplay());

tour.show();
```

## TypeScript

Full TypeScript support included:

```typescript
import Pointy, { PointyOptions, PointyStep } from '@diabolic/pointy';

const options: PointyOptions = {
  steps: [{ target: '#btn', content: 'Click!' }]
};

const pointy = new Pointy(options);

pointy.on('stepChange', (data) => {
  console.log(data.fromIndex, data.toIndex);
});
```

## Browser Support

Chrome 60+, Firefox 55+, Safari 12+, Edge 79+

## License

MIT License

---

Made with ❤️ for better user experiences.
