import {addClass, removeClass} from "./utils"


class SertificatPreview {
    _props = null;
    _previousActiveIndex = null;
    _activeIndex = null;

    _buttons=[]
    _images=[]

    constructor(props) {

        this._props = {...props}

        const {holderSelector, previewSelector} = this._props


        const $sertificatToogler = document.querySelector(holderSelector)
        if (!$sertificatToogler) {
            return
        }
        const $previewSelector = document.querySelector(previewSelector)
        if (!$previewSelector) {
            return
        }

        this._buttons = Array.from($sertificatToogler.querySelectorAll("input[type='radio']"))
        if(!this._buttons || this._buttons.length === 0) {
            return
        }
        this._images = Array.from($previewSelector.querySelectorAll("img"))
        if(!this._images || this._images.length === 0) {
            return
        }

        this.setActive()
        this.setListeners()
    }

    setListeners() {
        this._buttons.forEach((radio, index)=>{
            radio.addEventListener("change", this.handleRadioChange(index))
        })
    }

    handleRadioChange =(index)=>()=>{
        this.setActive(index)
    }

    setActive(activeIndex = 0) {
        this._buttons.forEach((button, index)=>{
            if(button.checked) {
                activeIndex = index;
            }
        })
        this._previousActiveIndex = this._activeIndex;
        this._activeIndex = activeIndex;
        this.setActiveToPeview()
    }

    setActiveToPeview() {
        const activeImage = this._images[this._activeIndex]
        if(activeImage) {
            addClass(activeImage, "active")
        }
        const previousActiveImage = this._images[this._previousActiveIndex]
        if(previousActiveImage) {
            removeClass(previousActiveImage, "active")
        }
    }
}

export default SertificatPreview;