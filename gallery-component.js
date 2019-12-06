const template = document.createElement('template');
template.innerHTML = `
    <style>
    .galery {
        display: flex;
        flex-wrap:  wrap;
        margin-top: 20px;
        max-height: 240px;
        overflow-y: auto;
        width: 100%;
        justify-content: center;
    }
    .galery .img,
    .galery .pic {
        flex-basis: 16%;
        margin-bottom: 10px;
        border-radius: 4px;
    }
    .galery .img {
        width: 200px;
        height: 110px;
        background-size: cover;
        margin-right: 10px;
        background-position: center;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        margin: 5px;
    }
    .galery .img:nth-child(3n) {
        margin-right: 0;
    }
    .galery .img span {
        display: none;
        text-transform: capitalize;
        z-index: 2;
    }
    .galery .img::after {
        content: '';
        width: 100%;
        height: 100%;
        transition: opacity .1s ease-in;
        border-radius: 4px;
        opacity: 0;
        position: absolute;
    }
    .galery .img:hover::after {
        display: block;
        background-color: #000;
        opacity: .5;
        cursor: pointer;
    }
    .galery .img:hover span {
        display: block;
        color: #fff;
    }
    .galery .pic {
        align-self: center;
        text-align: center;
        padding: 40px 0px;
        text-transform: uppercase;
        color: #000000;
        font-size: 12px;
        cursor: pointer;
        border: 2px dashed #aeaeaf;
    }
    .galery .img,
    .galery .pic {
        /*flex-basis: 100%;*/
        margin-right: 0;
    }
    </style>
    <div class="galery container_img_gallery">
    </div>
`;


customElements.define('img-gallery', class extends HTMLElement {
    constructor(){
        super();
        this.options = {}
        this._files  = [];
        this._shadowRoot = this.attachShadow({ 'mode': 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));
        this.$gallery = this._shadowRoot.querySelector('.container_img_gallery');
    }
    static get observedAttributes() {
        return ['delete','download',];
    }
    _seeFile(source) {
        var img = new Image();
        img.onload = function(){
            $.confirm({
                title: 'Archivo Adjunto',
                content: `
                    <img src="${source}" style="background-size: 100% 100%;"/>
                `,
                type: 'blue',
                typeAnimated: true,
                buttons: {
                    Cerrar: {
                        text: 'Cerrar',
                    }
                },
                boxWidth: `${this.width}px`,
                useBootstrap: false
            });
        };
        img.src = source;
    }

    _rendergallery() {
        this.$gallery.innerHTML = '';

        this._files.forEach((file, index) => {
            let newImage = `
            <div class="img" data-id="${file.id}" data-name="${file.name}" style="background-image: url('${__PREFIX__}/storage/${file.path}');" rel="${__PREFIX__}/storage/${file.path}">
                <span style="font-size:50px;color:#ff0000db">
                    ${
                        this.options.delete ? `<i data-action="delete" style="color:red;font-style:normal;" title="Eliminar Imagen">✕</i>` : ``
                    }
                    <i data-action="see" data-source='${__PREFIX__}/storage/${file.path}' style="color:white;font-style:normal;" title="Ver Imagen">👁</i>
                    ${
                        this.options.download ? `
                            <i data-action="download" style="color:white;font-style:normal;font-size:65px;" title="Descargar Imagen">
                                <a href="${__PREFIX__}/storage/${file.path}" download="${file.name}">
                                    <img style="display:none" src="${__PREFIX__}/storage/${file.path}">↓
                                </a>
                            </i>` : ``
                    }
                </span>
            </div>`;

            this.$gallery.insertAdjacentHTML('beforeend', newImage);
            this._shadowRoot.querySelector(`[data-id="${file.id}"] [data-action="see"]`).addEventListener('click', function(){
                this._seeFile(`${__PREFIX__}/storage/${file.path}`);
            }.bind(this));
        });
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if(name == "delete"){
            this.options.delete = true;
        }else if(name == "download"){
            this.options.download = true;
        }
    }
    get files() {
        return this._files;
    }
    set files(files) {
        this._files = files;
        this._rendergallery();
    }
});
