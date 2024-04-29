import * as pdfjsLib from "pdfjs-dist";

const cmapsPath = import.meta.env.VITE_PDF_CMAPS;
const workerPath = import.meta.env.VITE_PDF_WORKER;

// localテスト用
class PDFPreviewBase {
    constructor(element, scale = 2) {
        if (!element || !element.dataset.url) {
            throw new Error('invalid element!');
        } else {
            this.element = element;
            this.url = element.dataset.url;
            this.scale = scale;
            this.data = [];
        }
    };

    loading(isLoading) {
        if (isLoading) {
            this.element.classList.add('pdf-preview__loading');
        } else {
            this.element.classList.remove('pdf-preview__loading');
        }
    }

    async fetchFile() {
        this.loading(true);
        return fetch(this.url, { headers: { "Content-Type": "application/pdf" } })
            .then(res => res.blob())
            .then(res => this.blobtoDataUrl(res))
            .then(res => this.draw(res));
    }

    blobtoDataUrl(blob) {
        return new Promise((resolve) => {
            const fr = new FileReader();
            fr.readAsDataURL(blob);
            fr.onload = () => {
                resolve(fr.result.replace('data:application/pdf;base64,', ''));
            }
        });
    }

    draw(dataURL) {
        pdfjsLib.GlobalWorkerOptions.workerSrc = workerPath;

        const loadingTask = pdfjsLib.getDocument({
            data: atob(dataURL),
            cMapUrl: cmapsPath,
            cMapPacked: true,
        });

        loadingTask.promise
            .then(async (pdf) => {
                for (let i = 1; i <= pdf.numPages; i++) {
                    await this.getPage(i, pdf);
                }
            }, (reason) => {
                console.error(reason);
            }).then(() => {
                const displayImg = document.createElement('img');
                displayImg.setAttribute('class', 'pdf-preview__image');
                displayImg.onload = () => {
                    this.element.addEventListener('click', this.display(this.data));
                    this.element.appendChild(displayImg);
                    this.loading(false);
                }
                displayImg.src = this.data[0];
            });
    }

    display(data) {
        var fslightbox = new FsLightbox();
        fslightbox.props.sources = data;
        refreshFsLightbox();
        return () => {
            fslightbox.open();
        }
    }

    async getPage(pageNumber, pdf) {
        const scale = this.scale;
        const data = this.data;
        return new Promise((resolve) => {
            pdf.getPage(pageNumber).then(function (page) {
                var viewport = page.getViewport({ scale: scale });

                var canvas = document.createElement('canvas');
                var context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                var renderContext = {
                    canvasContext: context,
                    viewport: viewport
                };
                var renderTask = page.render(renderContext);
                renderTask.promise.then(async () => {
                    data.push(canvas.toDataURL('image/png'));
                    resolve();
                });
            });
        })
    }
}

// 本番用
class PDFPreview extends PDFPreviewBase {
    async fetchFile() {
        this.loading(true);
        return fetch(this.url, { headers: { "Content-Type": "application/pdf" } })
            .then(res => res.text())
            .then(res => {
                var blob = new Blob([res], { type: 'application/pdf' });
                return blobtoDataUrl(blob)
            })
            .then(res => this.draw(res));
    }
}


async function makePDFLink(pdfurl) {
    const res = await fetch(pdfurl).then(e => e.blob());
    const dataUrl = await blobtoDataUrl(res);
    const binary = atob(dataUrl);
    const len = binary.length
    const buffer = new ArrayBuffer(len)
    const view = new Uint8Array(buffer)
    for (let i = 0; i < len; i++) {
        view[i] = binary.charCodeAt(i)
    }
    const blob = new Blob([view], { type: 'application/pdf' })
    const url = URL.createObjectURL(blob)

    const link = document.createElement('a');
    link.href = url;
    link.textContent = 'pdf';
    link.target = 'brank';
    document.body.append(link);
    link.addEventListener('click', () => {
        setTimeout(() => {
            URL.revokeObjectURL(url)
        }, 500)
    });
}

function blobtoDataUrl(blob) {
    return new Promise((resolve) => {
        const fr = new FileReader();
        fr.readAsDataURL(blob);
        fr.onload = () => {
            resolve(fr.result.replace('data:application/pdf;base64,', ''));
        }
    });
}


const pdfPreviews = document.querySelectorAll('[data-role="pdf-preview"]');
pdfPreviews.forEach(ele => {
    const pdfPreview = new PDFPreview(ele);
    pdfPreview.fetchFile();
})