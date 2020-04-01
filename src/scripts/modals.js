import scrollbarSize from 'dom-helpers/util/scrollbarSize';
import {
  addListener as addResizeDetectorListener
} from 'resize-detector';
import MicroModal from 'micromodal';


import { addClass, setAttributes, removeClass, wrapElement } from './utils';


const DEFAULT_PROPS = {
  modalContentSelector: '[data-modal_id]',
  defaultProperties: {
    additionalClass: '',
    classes: {
      modal: 'modal',
      overlay: 'modal-overlay',
      container: 'modal-container',
      header: 'modal-header',
      title: 'modal-title',
      closeButton: 'modal-close',
      contentHolder: 'modal-contentHolder',
      content: 'modal-content'
    }
  }
};

export default class Modals {
  _props = null;
  _modalContentNodes = [];
  _modalsProperties = [];

  _modalElements = [];

  _activeModalId = null;

  constructor(props) {
    this._props = { ...DEFAULT_PROPS, ...props };
    const { modalContentSelector, defaultProperties } = this._props;

    if (!document.querySelector(modalContentSelector)) {
      return;
    }

    this._modalContentNodes = Array.from(
      document.querySelectorAll(modalContentSelector)
    );

    this._modalsProperties = this._modalContentNodes.map(
      this.getDataProperties(defaultProperties)
    );

    this._modalContentNodes[0].parentElement.style.display = 'block';
    this._modalContentNodes.map(this.wrapModalContents);

    MicroModal.init({
      onShow: this.handleDialogShow,
      onClose: this.handleDialogClose,
      openTrigger: 'data-custom-open',
      closeTrigger: 'data-custom-close',
      disableScroll: true,
      disableFocus: false,
      awaitCloseAnimation: false,
      debugMode: true
    });

    this.setHeaderWidthByContent();
  }
  setHeaderWidthByContent() {
    const { _modalContentNodes } = this;
    _modalContentNodes.forEach(this.setHeaderWidth);
    _modalContentNodes.forEach((contentElement, index) => {
      addResizeDetectorListener(
        contentElement,
        this.handleContentResize(contentElement, index)
      );
    });
  }

  handleContentResize = (element, index) => () => {
    this.setHeaderWidth(element, index);
  };

  setHeaderWidth = (element, index) => {
    const { width } = element.getBoundingClientRect();
    const header = this._modalElements[index].querySelector('header');
    header.style.width = `${width}px`;
  };

  wrapModalContents = (element, index) => {
    const { id, title, additionalClass, classes } = this._modalsProperties[
      index
    ];

    let overlayElement,
      containerElement,
      headerElement,
      titleElement,
      closeButtonElement,
      contentElement;

    this._modalElements[index] = document.createElement('div');
    setAttributes(this._modalElements[index], {
      class: classes.modal + ' ' + additionalClass,
      id: id,
      'aria-hidden': true
    });

    overlayElement = document.createElement('div');
    setAttributes(overlayElement, {
      class: classes.overlay,
      tabindex: '-1',
      'data-custom-close': true
    });

    containerElement = document.createElement('div');
    setAttributes(containerElement, {
      class: classes.container,
      role: 'dialog',
      'aria-modal': 'true',
      'aria-labelledby': `${id}-title`
    });

    headerElement = document.createElement('header');
    setAttributes(headerElement, {
      class: classes.header
    });

    titleElement = document.createElement('h2');
    setAttributes(titleElement, {
      class: classes.title,
      id: `${id}-title`
    });
    titleElement.textContent = title;

    closeButtonElement = document.createElement('button');
    setAttributes(closeButtonElement, {
      class: classes.closeButton,
      'aria-label': 'Close modal',
      'data-custom-close': true
    });

    contentElement = document.createElement('div');
    setAttributes(contentElement, {
      class: classes.content,
      id: `${id}-content`
    });
    addClass(contentElement, 'js-init-scroll-shadow');

    wrapElement(element, contentElement);
    wrapElement(contentElement, containerElement);
    wrapElement(containerElement, overlayElement);
    wrapElement(overlayElement, this._modalElements[index]);
    containerElement.insertAdjacentElement('afterbegin', headerElement);
    headerElement.insertAdjacentElement('afterbegin', closeButtonElement);
    title && headerElement.insertAdjacentElement('afterbegin', titleElement);
  };

  getDataProperties = defaultProperties => element => {
    const { modal_id, modal_title, modal_additional_class } = element.dataset;
    const properties = {};

    if (modal_id !== undefined) properties.id = modal_id;
    if (modal_title !== undefined) properties.title = modal_title;
    if (modal_additional_class !== undefined)
      properties.additionalClass = modal_additional_class;


    return { ...defaultProperties, ...properties };
  };

  setBodyStyle() {
    const bodyElement = document.body;
    bodyElement.style.paddingRight = `${scrollbarSize()}px`;
    bodyElement.children[0].style.webkitFilter = 'blur(3px)';
    bodyElement.children[0].style.msFilter = 'blur(3px)';
    bodyElement.children[0].style.OFilter = 'blur(3px)';
    bodyElement.children[0].style.MozFilter = 'blur(3px)';
    bodyElement.children[0].style.filter = 'blur(3px)';
  }

  resetBodyStyle() {
    const bodyElement = document.body;
    bodyElement.style.paddingRight = '';
    bodyElement.children[0].style.filter = '';
    bodyElement.children[0].style.webkitFilter = '';
    bodyElement.children[0].style.msFilter = '';
    bodyElement.children[0].style.OFilter = '';
    bodyElement.children[0].style.MozFilter = '';
  }

  handleDialogShow = modal => {
    this._activeModalId = modal.id;
    this.setBodyStyle();
  };

  handleDialogClose = modal => {
    this._activeModalId = null;
    this.resetBodyStyle();
    this.pauseAllYoutubeVideos(modal);
    this.pauseAllVideos(modal);
  };

  pauseAllYoutubeVideos(modal) {
    if (!modal.querySelector('.youtubeVideoModal-video')) {
      return;
    }

    try {
      const videos = Array.from(
        modal.querySelectorAll('.youtubeVideoModal-video')
      );
      videos.forEach(video => {
        video.contentWindow.postMessage(
          '{"event":"command","func":"stopVideo","args":""}',
          '*'
        );
      });
    } catch (error) {
      console.warn("Can't stop video", error);
    }
  }

  pauseAllVideos(modal) {
    if (!modal.querySelector('video')) {
      return;
    }

    const videos = Array.from(modal.querySelectorAll('video'));
    videos.forEach(video => {
      video.pause();
    });
  }
}
