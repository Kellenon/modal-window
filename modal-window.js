$(function() {
    const config = {
        namespace: 'modalWindowNamespace',
    };

    const event = {
        click: 'click.' + config.namespace,
        hideBsModal: 'hide.bs.modal.' + config.namespace,
    };

    const selector = {
        body: 'body',
        modalWindow: '#modal-window',
        modelWindowHeader: '#modal-window-header',
        modelWindowTitle: '#modal-window-title',
        modalWindowContent: '#modal-window-content',
        modalWindowBody: '#modal-window-body',
        modalWindowLink: '.modal-window-link',
        modalWindowCloseBtn: '#modal-window-close-btn',
    };

    let isWaiting = false;

    let init = function() {
        unbindEvents();
        bindEvents();
    };

    let unbindEvents = function() {
        $(document).off('.' + config.namespace);
    };

    let bindEvents = function() {
        $(document).on(event.hideBsModal, selector.modalWindow, removeModalWindow);
        $(document).on(event.click, selector.modalWindowLink, stopProcess);
        $(document).on(event.click, selector.modalWindowLink, createModalWindow);
        $(document).on(event.click, selector.modalWindowLink, showModalWindow);
    };

    let stopProcess = function() {
        return false;
    };

    let createModalWindow = function() {
        try {
            if ($(selector.modalWindow).length) {
                return;
            }

            let bsVersion = $(this).attr('data-bs-version') ?? 3;

            let modalForm;

            if (bsVersion >= 4) {
                modalForm =
                    '<div id="' + selector.modalWindow.substring(1) + '" class="modal fade" tabindex="-1" role="dialog">' +
                    '  <div class="modal-dialog" role="document">' +
                    '    <div id="' + selector.modalWindowContent.substring(1) + '" class="modal-content">' +
                    '      <div id="' + selector.modelWindowHeader.substring(1) + '" class="modal-header">' +
                    '        <h4 id="' + selector.modelWindowTitle.substring(1) + '" class="modal-title">' + ($(this).attr('data-modal-title') ?? '') + '</h4>' +
                    '        <button id="' + selector.modalWindowCloseBtn.substring(1) + '" type="button" class="close" data-dismiss="modal" aria-label="Close">' +
                    '          <span aria-hidden="true">&times;</span>' +
                    '        </button>' +
                    '      </div>' +
                    '      <div id="' + selector.modalWindowBody.substring(1) + '" class="modal-body">' +
                    '      </div>' +
                    '    </div>' +
                    '  </div>' +
                    '</div>';
            } else {
                modalForm =
                    '<div id="' + selector.modalWindow.substring(1) + '" class="modal fade" tabindex="-1" role="dialog">' +
                    '  <div class="modal-dialog" role="document">' +
                    '    <div id="' + selector.modalWindowContent.substring(1) + '" class="modal-content">' +
                    '      <div id="' + selector.modelWindowHeader.substring(1) + '" class="modal-header">' +
                    '        <button id="' + selector.modalWindowCloseBtn.substring(1) + '" type="button" class="close" data-dismiss="modal" aria-label="Close">' +
                    '          <span aria-hidden="true">&times;</span>' +
                    '        </button>' +
                    '        <h4 id="' + selector.modelWindowTitle.substring(1) + '" class="modal-title">' + ($(this).attr('data-modal-title') ?? '') + '</h4>' +
                    '      </div>' +
                    '      <div id="' + selector.modalWindowBody.substring(1) + '" class="modal-body">' +
                    '      </div>' +
                    '    </div>' +
                    '  </div>' +
                    '</div>';
            }

            $(selector.body).append(modalForm);
        } catch (error) {
            console.log(error);
        }
    };

    let removeModalWindow = function() {
        let modalWindow = $(selector.modalWindow) ?? null;

        if (null === modalWindow) {
            return;
        }

        setTimeout(function() {
            modalWindow.remove();
        }, 200);
    };

    let showModalWindow = async function() {
        if (isWaiting) {
            return;
        }

        isWaiting = true;

        try {
            $.ajax({
                url: $(this).attr('href') ?? $(this).attr('data-modal-url'),
                method: 'GET',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                data: $(this).attr('data-modal-attributes') ?? {},
                beforeSend: function() {
                    $(selector.modalWindowBody).empty();
                },
                success: function(form) {
                    $(selector.modalWindowBody).html(form);
                    $(selector.modalWindow).modal('show');
                },
                error: function() {
                    removeModalWindow();
                },
                complete: function() {
                    isWaiting = false;
                },
            });
        } catch (error) {
            console.log(error);
            isWaiting = false;
            removeModalWindow();
        }
    };

    init();
});
