const __PREFIX__ = '';

customElements.define('file-upload', class extends HTMLElement {
    constructor() {
        super();
    }
    static get observedAttributes() {
        return ['upload-a','upload-b'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name == "upload-a") {
            this.options = {
                path: ""
            }
        } else if(name == "upload-b") {
            this.options = {
                path: ""
            }
        }
    }

    connectedCallback() {
        this.innerHTML = `<style>
            .pulse-button {
                position: relative;
                height: 70px;
                border: none;
                box-shadow: 0 0 0 0 rgb(45, 149, 185);
                border-radius: 10px;
                background-color: #2d95b973;
                background-size: cover;
                background-repeat: no-repeat;
                cursor: pointer;
                -webkit-animation: pulse 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
                -moz-animation: pulse 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
                -ms-animation: pulse 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
                animation: pulse 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
            }
            .pulse-button:hover {
                -webkit-animation: none;-moz-animation: none;-ms-animation: none;animation: none;
            }

            @-webkit-keyframes pulse {to {box-shadow: 0 0 0 45px rgba(232, 76, 61, 0);}}
            @-moz-keyframes pulse {to {box-shadow: 0 0 0 45px rgba(232, 76, 61, 0);}}
            @-ms-keyframes pulse {to {box-shadow: 0 0 0 45px rgba(232, 76, 61, 0);}}
            @keyframes pulse {to {box-shadow: 0 0 0 45px rgba(232, 76, 61, 0);}}

            file-upload[following] > .wrapper-upload {
                width : 99%;
            }
            file-upload[find] > .wrapper-upload {
                width : 99%;
            }
            file-upload .wrapper-upload  {
                background-color: #fff;
                padding: 25px;
                border-radius: 5px;
                width: 50%;
                max-width: 100%;
                margin: 10px;
                box-sizing: border-box;
                height: max-content;
            }
            file-upload header {
                border-bottom: 1px solid #ddd;
                padding-bottom: 10px;
                margin-bottom: 20px;
                display: flex;
            }
            file-upload h1 {
                flex: 1;
                padding: 0;
                margin: 0;
                font-size: 16px;
                letter-spacing: 1px;
                font-weight: 700;
                color: #7A7B7F;
            }
            file-upload header span {
                flex: 1;
                text-align: right;
                font-size: 12px;
                color: #999;
            }
            file-upload section {
                display: none;
            }
            file-upload section.active {
                display: block;
            }
            file-upload section input,
            file-upload section textarea {
                display: block !important;
                width: 100% !important;
                box-sizing: border-box !important;
                border: 1px solid #ddd !important;
                outline: 0 !important;
                background-color: #F5F7FA !important;
                padding: 10px !important;
                margin-bottom: 10px !important;
                letter-spacing: 1.4px !important;
            }
            file-upload section textarea {
                min-height: 60px;
            }
            file-upload section select {
                width: 100%;
                height: 30px;
                background-color: white;
                padding: 5px;
                border-radius: 6px;
            }
            .images {
                display: flex;
                flex-wrap:  wrap;
                margin-top: 20px;
                max-height: 240px;
                overflow-y: auto;
            }
            .images .img,
            .images .pic {
                flex-basis: 16%;
                margin-bottom: 10px;
                border-radius: 4px;
            }
            .images .img {
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
            }
            .images .img:nth-child(3n) {
                margin-right: 0;
            }
            .images .img span {
                display: none;
                text-transform: capitalize;
                z-index: 2;
            }
            .images .img::after {
                content: '';
                width: 100%;
                height: 100%;
                transition: opacity .1s ease-in;
                border-radius: 4px;
                opacity: 0;
                position: absolute;
            }
            .images .img:hover::after {
                display: block;
                background-color: #000;
                opacity: .5;
                cursor: pointer;
            }
            .images .img:hover span {
                display: block;
                color: #fff;
            }
            .images .pic {
                align-self: center;
                text-align: center;
                padding: 40px 0px;
                text-transform: uppercase;
                color: #000000;
                font-size: 12px;
                cursor: pointer;
                border: 2px dashed #aeaeaf;
            }
            @media screen and (max-width: 400px) {
                .wrapper-upload {
                    margin-top: 0;
                }
                file-upload header {
                    flex-direction: column;
                }
                file-upload header span {
                    text-align: left;
                    margin-top: 10px;
                }
                .images .img,
                .images .pic {
                    flex-basis: 100%;
                    margin-right: 0;
                }
            }
            .wrapper-up {
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: right;
            }
            .wrapper-up .file-upload {
                height: 70px;
                width: 70px;
                border-radius: 100px;
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
                overflow: hidden;
                background-image: linear-gradient(to bottom, #2590EB 50%, #FFFFFF 50%);
                background-size: 100% 200%;
                transition: all 1s;
                color: #FFFFFF;
                font-size: 50px;
                cursor: pointer;
            }
            .wrapper-up .file-upload input[type='file'] {
            height: 200px;
            width: 200px;
            position: absolute;
            top: 0;
            left: 0;
            opacity: 0;
            cursor: pointer;
            }
            .wrapper-up .file-upload:hover {
            background-position: 0 -100%;
            color: #2590EB;
            }
            @keyframes fadeIn {
                0% { opacity: 0; }
                100% { opacity: 1; }
            }
            #toast-container {
                z-index : 99999999999999 !important;
            }
            </style>
            <div class="wrapper-upload">
                <header>
                    <h1>Subir archivos</h1>
                </header>
                <div class="sections">
                    <section class="active">
                            <div class="images" id="upload">
                                <div class="pic mr-2" id="drop">
                                    <input type="file"
                                        name="files"
                                        id="fileUploadInput"
                                        multiple
                                        accept= "application/msword,
                                                    application/vnd.ms-excel,
                                                    application/vnd.ms-powerpoint,
                                                    text/plain,
                                                    application/pdf,
                                                    image/*,
                                                    audio/*"
                                        style="width:auto !important" />
                                </div>
                            </div>
                            <div style="margin-top: 1%;" id="subirArchivos">
                            <div class="wrapper-up" style="flex-direction: row-reverse;">
                                <div class="file-upload" id="upload_subirArchivos" title="Subir Archivos">
                                    <i class="fa fa-arrow-up"></i>
                                </div>
                            </div>

                            </div>
                    </section>
                </div>
                <footer>
                    <span id="reset" class="btn btn-outline-danger">Limpiar todos</span>
                </footer>
                <div id="saved_files" class="galery"></div>
            </div>`;
        setTimeout( ()=>{
        this.initializeFileUpload( '#fileUploadInput' );
        },250);
    }

    initializeFileUpload( selector ){
        let exists    = false;
        let filesList = [];
        let uploadExt = ['application/msword',
                        'application/wps-office.docx',
                        'application/wps-office.xlsx',
                        'application/msexcel',
                        'application/vnd.ms-excel',
                        'application/pdf',
                        'image/jpeg',
                        'image/png',
                        'image/gif',
                        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        let formData = Object.assign({},this.options);

        $(document).on('click', '#reset', function(event) {
            event.preventDefault();
            let images = $('.images .img');
            for(let i = 0; i < images.length; i++) {
                $(images)[i].remove();
            }
            filesList = [];
            filesList.length = 0;
            $("#upload_subirArchivos").removeClass('pulse-button');
        });
        $(document).on('click', '.img [data-action="delete"]', function(e){ //Click en la X roja para remover imagen
            for(let f in filesList){
                if(filesList[f].files[0].name == $(this).closest('div').data("name")){
                    filesList.splice(f,1);
                    break;
                }
            }

            if ($(this).closest('div').data("id") == undefined) {
                $(this).closest('div').remove();
            } else {
                //Realizar llamado ajax para realizar el borrado en el servidor
                var id = $(this).closest('div').data("id");

                $.confirm({
                    title: 'Archivo Adjunto',
                    content: '¿Desea eliminar el archivo adjunto?',
                    type: 'red',
                    typeAnimated: true,
                    buttons: {
                        si: {
                            text: 'SÍ',
                            btnClass: 'btn-danger',
                            action: function(){
                                $.ajax({
                                    url: `${__PATH__}/file/${id}`,
                                    method: "DELETE",
                                    data: {
                                        _token: formData._token
                                    },
                                    dataType: "JSON",
                                    success: function (response) {
                                        if (response.status) {
                                            $(`.img[data-id="${id}"]`).remove();
                                            toastr.success(response.message, 'Éxito');
                                        } else {
                                            toastr.error(response.message, 'Error');
                                            return;
                                        }
                                    }
                                });
                            }
                        },
                        no: {
                            text: 'NO',
                            btnClass: 'btn-primary'
                        }
                    }
                });
                return;
            }
            filesList.length == 0 ? $("#upload_subirArchivos").removeClass('pulse-button') : '';
        });
        $(document).on('click', '.img [data-action="see"]', function(e){
            const source = $(this).closest('div').attr('rel');
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

        }); //Click en la X roja para remover imagen
        $(selector).fileupload({
            url                : `${__PREFIX__}/file/upload`,
            dataType           : 'json',
            autoUpload         : false,
            acceptFileTypes    : /(\.|\/)(gif|jpe?g|png|pdf|csv|xls|xlsx|xlt|xlsm|ods|doc)$/i,
            maxFileSize        : 12582912,
            disableImageResize : /Android(?!.*Chrome)|Opera/.test(window.navigator.userAgent),
            previewMaxWidth    : 100,
            previewMaxHeight   : 100,
            previewCrop        : true,
            singleFileUpload   : false,
            maxNumberOfFiles   : 5,
            xhrFields: {
                withCredentials: true
            },
            formData,
            add: function (e, data) {//Al cargar un archivo al navegador
                if($(".images .img").length>=10){//Validamos que no se carguen más de 10 archivos
                    toastr.warning("Sólo se permite cargar hasta 10 archivos simultáneamente", "Alerta");
                    return false;
                }
                $("#upload_subirArchivos").addClass('pulse-button');
                exists = false;
                let images       = $('.images');
                let nonImageIcon = '';
                $.each(data.files, function (index, file) {
                    if(file.size > 12582912){
                        toastr.error("El tamaño del archivo excede el límite permitido de 12MB",
                                    "Error",
                                    {preventDuplicates:true});
                        $("#toast-container").css('z-index','99999999');
                        return false;
                    }
                    if(uploadExt.indexOf(file.type) == -1){
                        toastr.error("El archivo cargado no tiene un formato permitido",
                                    "Error",
                                    {preventDuplicates:true});
                        $("#toast-container").css('z-index','99999999');
                        return false;
                    }else{
                        if(file.type == 'application/pdf'){
                            nonImageIcon = 'imagenes/pdf-icon.png';
                        }else if(file.type == 'application/msword' || file.type == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'){
                            nonImageIcon = 'imagenes/doc-icon.png';
                        }else if(file.type == 'application/msexcel' || file.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.type == 'application/vnd.ms-excel'){
                            nonImageIcon = 'imagenes/xls-icon.png';
                        }else{
                            nonImageIcon = 'imagenes/file.png';
                        }
                    }
                    if(filesList.length == 0){//La primera vez el arreglo filesList estará vacío
                        filesList.push(data);//Agregar imagen al arreglo
                        let reader    = new FileReader();
                        reader.onload = function(event) {
                            if(file.type.indexOf('image')!=-1){//Si es una imagen
                                //Mostrar imagen vista previa
                                images.append(`<div class="img" data-name="${file.name}" style="background-image: url('${event.target.result}');" rel="${event.target.result}">
                                                    <span data-action="delete" style='font-size:50px;color:#ff0000db' title="${file.name}">
                                                    &#10005;
                                                    </span>
                                                </div>`);
                            }else{//Si es otro archivo
                                //Mostrar imagen vista previa
                                images.append(`<div class="img" data-name="${file.name}" style="background-image: url('${nonImageIcon}'); background-size: contain; background-repeat: no-repeat;">
                                                    <span data-action="delete" style='font-size:50px;color:#ff0000db' title="${file.name}">
                                                    &#10005;
                                                    </span>
                                                </div>`);
                            }
                        }
                        reader.readAsDataURL(file);
                    }else{
                        for(let f in filesList){
                            if(filesList[f].files[0].name == file.name){//Si la imagen no existe en el arreglo (si es nueva)
                                exists = true;
                            }
                        }
                        if (!exists) {
                            filesList.push(data);//Agregar imagen al arreglo
                            let reader    = new FileReader();
                            reader.onload = function(event) {
                                if(file.type.indexOf('image')!=-1){//Si es una imagen
                                    //Mostrar imagen vista previa
                                    images.append(`<div class="img" data-name="${file.name}" style="background-image: url('${event.target.result}');" rel="${event.target.result}">
                                                        <span data-action="delete" style='font-size:50px;color:#ff0000db' title="${file.name}">
                                                        &#10005;
                                                        </span>
                                                    </div>`);
                                }else{//Si es otro archivo
                                    //Mostrar vista previa archivo
                                    images.append(`<div class="img" data-name="${file.name}" style="background-image: url('${nonImageIcon}');  background-size: contain; background-repeat: no-repeat;">
                                                        <span data-action="delete" style='font-size:50px;color:#ff0000db' title="${file.name}">
                                                        &#10005;
                                                        </span>
                                                    </div>`);
                                }
                            }
                            reader.readAsDataURL(file);
                        }else{
                            toastr.info(`El archivo ${file.name} ya fue cargado`, "Información");
                        }
                    }
                });

                $("#upload_subirArchivos").off('click').on('click', function () {
                    if( filesList.length > 0 ){
                        for(let f in filesList){
                            filesList[f].submit();//Se cargan los archivos en el servidor
                        }
                    }
                });
            },
            done: function (e, data) {//Después de subir cada archivo al servidor
                let saved_files  = $('#saved_files');
                $.ajax({
                    type: "POST",
                    url: `${__PREFIX__}/file`,
                    data: {
                        name    : data.files[0].name,
                        path    : data.result,
                        type    : data.files[0].type,
                        user_id : '123456', //TODO cambiar por el usuario logueado
                        ...formData
                    },
                    dataType: "JSON",
                    success: (response)=>{
                        saved_files.append(`<div class="img" data-id="${response.file.id}" data-name="${response.file.name}" style="background-image: url('${__PREFIX__}${response.url}');" rel="${__PREFIX__}${response.url}">
                            <span style='font-size:50px;color:#ff0000db' title="${response.file.name}">
                                <i data-action="delete" style="color:red;font-style:normal;" title="Eliminar Imagen">&#10005;</i>
                                <i data-action="see" style="color:white;font-style:normal;" title="Ver Imagen">&#x1f441;</i>
                                <i data-action="download" style="color:white;font-style:normal;font-size:65px;" title="Descargar Imagen">
                                    <a href="${__PATH__}/${response.url}"" download="${response.file.name}">
                                        <img style="display:none" src="${__PATH__}/${response.url}"" />&#8595;
                                    </a>
                                </i>
                            </span>
                        </div>`);
                    },
                    error: (response)=>{
                        console.log(response);
                    }
                });

            },
            progressall: function(e, data){
                $(".progress").fadeIn().css({
                    display: 'inline-flex'
                });;
                let progress = parseInt(data.loaded / data.total * 100, 10);
                $(".progress-success").css('width',`${progress}%`);
            },
            stop: function(e, data){//Cuando se terminaron de cargar todos los archivos
                $('#reset').trigger('click');
                $(".ffGallery-header").empty();
                $(".ffGallery-container").empty();
                $(".progress-success").css('width',`0%`);
                $(".progress").fadeOut();
                $("#toast-container").css('z-index','99999999');
                $("#upload_subirArchivos").removeClass('pulse-button');
                toastr.success("Los archivos han sido cargados exitosamente", "Mensaje", {preventDuplicates:true});
            },
            fail: function (e, data) {//Cuando ocurre un error al cargar los archivos
                console.log(e, data);
                toastr.error("Ha ocurrido un error inesperado al cargar los archivos", "Error", {preventDuplicates:true});
            },
            change : function (e, data) {
                if(data.files.length>10){//Validamos que no se seleccionen más de 10 archivos
                    toastr.warning("Sólo se permite cargar hasta 10 archivos simultáneamente", "Alerta", {preventDuplicates:true});
                    return false;
                }
            }
        })
    }
});
