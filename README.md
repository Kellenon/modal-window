<div>
    <p align="center">
        <a href="https://github.com/Kellenon/modal-window" target="_blank">
            <img src="https://github-production-user-asset-6210df.s3.amazonaws.com/48764983/257301874-39943b34-1336-4699-9228-0b36846d8ce0.png" width="150" alt="Yii Framework" />
        </a>
    </p>
    <h1 align="center">Modal Window</h1>
    <h5 align="center">Simple AJAX Modal Window</h5>
    <br>
</p>

Modal Windows is a Javascript library. [jQuery](https://jquery.com/) and [bootstrap 3 or 4](https://getbootstrap.com/) is required.

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
