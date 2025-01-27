
const PDF_CONFIG = {
margin: 0,
filename: 'Audreylyn_Morana_CV.pdf',
imageType: 'png',
quality: 1,
html2canvas: {
scale: 1,
useCORS: true,
logging: true,
letterRendering: true,
ignoreElements: (element) => element.id === 'export-pdf',
backgroundColor: '#FFFFFF', // Force white background
onclone: (document) => {
// Force white backgrounds on cloned elements
document.querySelector('.main-grid').style.background = '#FFFFFF';
document.querySelector('.cv-container').style.background = '#FFFFFF';
document.querySelectorAll('.skill-tag').forEach(tag => {
tag.style.background = '#FFFFFF !important';
});
}
},
jsPDF: {
unit: 'px',
format: [1200, 1500],
orientation: 'portrait'
}
};

async function generatePDFPage(pdf, element) {
element.style.borderRadius = '0px';
const canvas = await html2canvas(element, {
...PDF_CONFIG.html2canvas,
windowHeight: element.scrollHeight,
height: element.scrollHeight,
width: element.offsetWidth,
backgroundColor: '#ffffff' // Set background color to white
});
const imgData = canvas.toDataURL(
`image/${PDF_CONFIG.imageType}`,
PDF_CONFIG.quality
);
// Add image at original dimensions
pdf.addImage(imgData, PDF_CONFIG.imageType, 
0, // X position
0, // Y position
canvas.width, 
canvas.height
);
}

// Rest of the script remains the same


document.getElementById('export-pdf').addEventListener('click', async () => {
const loader = createLoader();

try {
const cvContainer = document.querySelector('.cv-container');

// Create hidden clone
const clone = cvContainer.cloneNode(true);
clone.style.position = 'fixed';
clone.style.left = '-9999px'; // Move off-screen
clone.style.width = `${cvContainer.offsetWidth}px`;
document.body.appendChild(clone);

const pdf = new jspdf.jsPDF(PDF_CONFIG.jsPDF);

await generatePDFPage(pdf, clone);

pdf.save(PDF_CONFIG.filename);

} catch (error) {
console.error('PDF generation failed:', error);
alert('PDF generation failed. Please try again.');
} finally {
// Cleanup clone and loader
const clone = document.querySelector('.cv-container[style*="-9999px"]');
if (clone) clone.remove();
loader.remove();
}
});


function createLoader() {
const loader = document.createElement('div');
loader.innerHTML = `
<div class="pdf-loader">
<i class="fas fa-spinner fa-spin"></i>
Generating PDF...
</div>
`;
document.body.appendChild(loader);
return loader;
}
