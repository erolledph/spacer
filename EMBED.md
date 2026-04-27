# Keyboard Ranger - Embed Guide

A space-themed typing defense game that websites can embed.

---

## Option 1: Iframe (Easiest)

The simplest way to embed - no code changes needed.

```html
<!-- Basic embed -->
<iframe src="https://keyspacer.pages.dev/" width="800" height="600" frameborder="0"></iframe>

<!-- With custom size -->
<iframe src="https://keyspacer.pages.dev/" width="1024" height="768" frameborder="0" allow="fullscreen"></iframe>

<!-- Responsive embed -->
<iframe src="https://keyspacer.pages.dev/" style="width:100%;max-width:1024px;height:100vh;max-height:768px;border:none;"></iframe>
```

### Iframe Parameters

| Parameter | Description | Example |
|----------|------------|---------|
|	width | Game width in pixels | 800 |
|	height | Game height in pixels | 600 |
|	frameborder | Border around iframe | 0 (none) |
|	allow | Permissions | fullscreen |

---

## Option 2: JavaScript Embed (Widget Style)

Add this to the end of the body:

```html
<div id="keyboard-ranger-game"></div>

<script src="https://keyspacer.pages.dev/embed.js"></script>
<script>
  KeyboardRanger.init({
    width: 800,
    height: 600,
    theme: 'dark', // 'dark' or 'light'
    sound: true,
    autoStart: false
  });
</script>
```

### JavaScript Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| width | number | 800 | Game canvas width |
| height | number | 600 | Game canvas height |
| theme | string | 'dark' | UI theme |
| sound | boolean | true | Enable sound effects |
| autoStart | boolean | false | Start game automatically |
| startWave | number | 1 | Starting wave (1-99) |
| playerName | string | 'Pilot' | Default player name |

---

## Option 3: Full Page Embed

For sites that want the game as the main content:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Play Keyboard Ranger</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: #000; overflow: hidden; }
  </style>
</head>
<body>
  <iframe src="https://keyspacer.pages.dev/?fullscreen=true" 
          width="100%" height="100%" 
          frameborder="0" 
          allow="fullscreen"
          allowfullscreen></iframe>
</body>
</html>
```

---

## Option 4: WordPress Shortcode

For WordPress sites, add to functions.php:

```php
function keyboard_ranger_shortcode($atts) {
  $atts = shortcode_atts([
    'width' => '800',
    'height' => '600',
  ], $atts);
  
  return '<iframe src="https://keyspacer.pages.dev/" 
          width="'.$atts['width'].'" 
          height="'.$atts['height'].'" 
          frameborder="0"
          allow="fullscreen"></iframe>';
}
add_shortcode('keyboardranger', 'keyboard_ranger_shortcode');
```

Then use in posts:
```
[keyboardranger width="1024" height="768"]
```

---

## Full Example: Gaming Site

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Play Keyboard Ranger - Free Typing Game</title>
  <style>
    body {
      margin: 0;
      padding: 20px;
      background: #0a0a12;
      font-family: 'Segoe UI', sans-serif;
    }
    .game-container {
      max-width: 1024px;
      margin: 0 auto;
    }
    h1 {
      color: #00ffff;
      text-align: center;
      margin-bottom: 20px;
      font-size: 2.5rem;
    }
    iframe {
      display: block;
      margin: 0 auto;
      border: 2px solid #00ffff;
      border-radius: 10px;
    }
  </style>
</head>
<body>
  <div class="game-container">
    <h1>⌨️ KEYBOARD RANGER</h1>
    <iframe src="https://keyspacer.pages.dev/" 
            width="100%" 
            height="640" 
            frameborder="0"
            allow="fullscreen"
            allowfullscreen>
    </iframe>
  </div>
</body>
</html>
```

---

## Game URL

- **Play Online**: https://keyspacer.pages.dev/
- **GitHub**: https://github.com/erolledph/spacer

---

## Tips for Embedding

1. **Mobile Support**: The game works on mobile but works best on desktop with keyboard
2. **Sound**: Users may need to interact with the page first to enable audio
3. **Fullscreen**: Add `allow="fullscreen"` to iframe for fullscreen mode
4. **Responsive**: Use CSS `width:100%` with `aspect-ratio` for responsive embeds

---

## Contact

- Developer: erolledph
- Report bugs: https://github.com/erolledph/spacer/issues