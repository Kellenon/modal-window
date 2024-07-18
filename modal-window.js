let modalWindow = (function($) {
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
        modalWindowDialog: '#modal-window-dialog',
        modelWindowHeader: '#modal-window-header',
        modelWindowTitle: '#modal-window-title',
        modalWindowContent: '#modal-window-content',
        modalWindowBody: '#modal-window-body',
        modalWindowLink: '.modal-window-link',
        modalWindowCloseBtn: '#modal-window-close-btn',
    };

    let params = {
        bsVersion: 4,
    };

    let loader = undefined;

    let currenSize = null;

    let isWaiting = false;

    let init = function(inParams) {
        $.extend(params, inParams || {});
        unbindEvents();
        bindEvents();
    };

    let unbindEvents = function() {
        $(document).off('.' + config.namespace);
    };

    let bindEvents = function() {
        $(document).ready(createModalWindow);
        $(document).on(event.hideBsModal, selector.modalWindow, hideModalWindow);
        $(document).on(event.click, selector.modalWindowLink, stopProcess);
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

            let modalForm;

            if (params.bsVersion >= 4) {
                modalForm =
                    '<div id="' + selector.modalWindow.substring(1) + '" class="modal fade" tabindex="-1" role="dialog">' +
                    '  <div id="' + selector.modalWindowDialog.substring(1) + '" class="modal-dialog" role="document">' +
                    '    <div id="' + selector.modalWindowContent.substring(1) + '" class="modal-content">' +
                    '      <div id="' + selector.modelWindowHeader.substring(1) + '" class="modal-header">' +
                    '        <h4 id="' + selector.modelWindowTitle.substring(1) + '" class="modal-title">' + '' + '</h4>' +
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
                    '  <div id="' + selector.modalWindowDialog.substring(1) + '" class="modal-dialog" role="document">' +
                    '    <div id="' + selector.modalWindowContent.substring(1) + '" class="modal-content">' +
                    '      <div id="' + selector.modelWindowHeader.substring(1) + '" class="modal-header">' +
                    '        <button id="' + selector.modalWindowCloseBtn.substring(1) + '" type="button" class="close" data-dismiss="modal" aria-label="Close">' +
                    '          <span aria-hidden="true">&times;</span>' +
                    '        </button>' +
                    '        <h4 id="' + selector.modelWindowTitle.substring(1) + '" class="modal-title">' + '' + '</h4>' +
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

    let hideModalWindow = function(event) {
        clearModalWindowBody();
        setTitleModalWindow(event, '');
        setTimeout(() => setSizeModalWindow(event), 200);
    };

    let showModalWindow = function(event) {
        setSizeModalWindow(event, $(this).attr('data-modal-size') ?? null);
        setTitleModalWindow(event, $(this).attr('data-modal-title') ?? '');
        fillModalBody(event, {
            url: $(this).attr('href') ?? $(this).attr('data-modal-url'),
            attributes: $(this).attr('data-modal-attributes') ?? {},
        });
    };

    let setSizeModalWindow = function(event, size = null) {
        let modalWindowDialog = $(selector.modalWindowDialog);

        if (size) {
            modalWindowDialog.addClass(size);
            currenSize = size;
        } else {
            modalWindowDialog.removeClass(currenSize);
            currenSize = null;
        }
    };

    let setTitleModalWindow = function(event, titleText = '') {
        let modalWindowTitle = $(selector.modelWindowTitle) ?? null;

        if (!modalWindowTitle) {
            return;
        }

        modalWindowTitle.text(titleText ?? '');
    };

    let setLoader = function(inLoader) {
        if (!(typeof inLoader === 'function')) {
            return;
        }

        loader = inLoader;
    }

    let fillModalBody = function(event, data) {
        if (isWaiting) {
            return;
        }

        isWaiting = true;

        try {
            $.ajax({
                url: data.url,
                method: 'GET',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                data: data.attributes,
                beforeSend: function() {
                    clearModalWindowBody();

                    try {
                        if (typeof loader === 'function') {
                            loader(selector.modalWindowBody);
                        }
                    } catch (error) {
                        console.log(error);
                    }

                    $(selector.modalWindow).modal('show');
                },
                success: function(data) {
                    $(selector.modalWindowBody).html(data);
                },
                error: function(jqXHR) {
                    if (jqXHR.status === 404) {
                        $(selector.modalWindowBody).html('<h1 style="text-align: center">404</h1>');
                    }
                },
                complete: function() {
                    isWaiting = false;
                },
            });
        } catch (error) {
            console.log(error);
            isWaiting = false;
        }
    };

    let clearModalWindowBody = function() {
        let modalWindowBody = $(selector.modalWindowBody) ?? null;

        if (null === modalWindowBody) {
            return;
        }

        modalWindowBody.empty();
    };

    return {
        init: init,
        setLoader: setLoader,
    };
})(jQuery);
