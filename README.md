<p align="center">
    <h1 align="center">Modal Window</h1>
    <h5 align="center">Simple AJAX Modal Window</h5>
    <br>
</p>

Modal Windows is a Javascript library. jQuery is required. The goal is to create a simple ajax modal windows.

## Usage

### Example

```html
<button type="button" class="modal-window-link" data-modal-attributes="param1=&param2=&param3=" data-modal-title="Modal Window Title" data-modal-url="https://example.com/link">
    Show modal window
</button>
```

#### Note

It is necessary to specify the `modal-window-link` class in the button and declare the `data-modal-url` attribute

### Attributes

- data-modal-url - URL to the form to be rendered. Warning! URL must be absolute.
- data-modal-title - Modal window title.
- data-modal-attributes - Get params.
