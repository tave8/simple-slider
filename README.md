## Simple Slider

UI Component to create a Netflix-like Slider.

![Simple Slider](./assets/demo/simple-slider.gif)

Made with JavaScript and Bootstrap.


## Installation

CDN
```
https://simple-slider.giutav.workers.dev/script.js

https://simple-slider.giutav.workers.dev/style.css
```

HTML 
```html
<!-- js -->
<script src="https://simple-slider.giutav.workers.dev/script.js"></script>
<!-- css -->
<script src="https://simple-slider.giutav.workers.dev/style.css"></script>
```



## Configuration

HTML

```html
<div class="slider" id="slider1">
  <div class="cards">
    <!-- the cards will be populated by javascript -->
  </div>
</div>
```

JS

```js
const slider1 = new Slider({
  targetSelector: "#slider1",
  scrollBy: 250,
});
```