// ==UserScript==
// @homepageURL  https://github.com/3m4r5/3m4r5/tree/main/scripts/alrai_pdf
// @updateURL    https://raw.githubusercontent.com/3m4r5/3m4r5/main/scripts/alrai_pdf/alrai_pdf.user.js
// @downloadURL  https://raw.githubusercontent.com/3m4r5/3m4r5/main/scripts/alrai_pdf/alrai_pdf.user.js
// @name         alrai pdf download
// @version      1.1
// @icon         https://alrai.com/alraijordan/uploads/global_files/header-logo.svg
// @namespace    Violentmonkey Scripts
// @match        *://*alrai.com*/*
// @grant        GM_registerMenuCommand
// @require      https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js
// ==/UserScript==

(function() { 'use strict';

function rescale(fitWidth, fitHeight, width, height) {
    let widthRatio = fitWidth / width;
    let heightRatio = fitHeight / height;
    let scaleRatio = Math.min(widthRatio, heightRatio);
    return [width * scaleRatio, height * scaleRatio];
}

function imageToBase64(img) {
    let canvas = document.createElement("canvas");
    let context = canvas.getContext("2d");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    context.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);
    return canvas.toDataURL("image/jpeg", 1.0);
}

async function fetchImageData(url, pdfWidth, pdfHeight) {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = url;

    return new Promise((resolve, reject) => {
        img.onload = () => {
            const imgData = imageToBase64(img);
            const [newWidth, newHeight] = rescale(pdfWidth, pdfHeight, img.naturalWidth, img.naturalHeight);
            resolve({ imgData, newWidth, newHeight });
        };
        img.onerror = reject;
    });
}

async function generatePDF(date) {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const baseUrl = `https://alrai.com/uploads/news_paper_pdf/${date.split('-')[0]}/${date}/files/pages/large/`;
    console.log(baseUrl);

    for (let i = 1; ; i++)
        try {
            const { imgData, newWidth, newHeight } = await fetchImageData(`${baseUrl}${i}.jpg`, pdfWidth, pdfHeight);
            if (i > 1) pdf.addPage();
            const xOffset = (pdfWidth - newWidth) / 2;
            const yOffset = (pdfHeight - newHeight) / 2;
            pdf.addImage(imgData, 'JPEG', xOffset, yOffset, newWidth, newHeight);
        } catch (error) {
            console.error(`Failed to process image ${i + 1}:`, error);
            break;
        }
    pdf.deletePage(pdf.internal.getNumberOfPages());
    pdf.save(`alrai-${date}.pdf`);
}

const div = document.createElement("div");
document.body.appendChild(div);
div.innerHTML = '<dialog dir=ltr><form>Pick a date:<input id="dtpdf" type="date"></form><br><center><button autofocus id="dlpdf">Download</button></center></dialog><style>dialog::backdrop {backdrop-filter: blur(5px); text-align: left;} dialog {border:solid 1px gray;border-radius: 8px;}</style>';
var dialog = document.getElementsByTagName('dialog')[0]
dialog.addEventListener('click', function(event) {
    var rect = dialog.getBoundingClientRect();
    var isInDialog = (rect.top <= event.clientY && event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX && event.clientX <= rect.left + rect.width);
    if (!isInDialog) {
        dialog.close();
    }
});
var btn = document.getElementById("dlpdf");
btn.addEventListener("click", () => {
    generatePDF(document.getElementById("dtpdf").value);
    dialog.close();
});

GM_registerMenuCommand("Download PDF file", function (){dialog.showModal();}, "g");

})();
