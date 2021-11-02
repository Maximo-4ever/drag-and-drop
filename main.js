const zona = document.querySelector(".zona-arrastre");

zona.addEventListener("dragover", (e) => {
  e.preventDefault();
  changeStyle(e.srcElement, "#222");
});
zona.addEventListener("dragleave", (e) => {
  e.preventDefault();
  changeStyle(e.srcElement, "#9c9c9c");
});
zona.addEventListener("drop", (e) => {
  e.preventDefault();
  changeStyle(e.srcElement, "#9c9c9c");
  cargarVideo(e.dataTransfer.files[0]);
});
const changeStyle = (obj, color) => {
  obj.style.color = color;
  obj.style.border = `4px dashed ${color}`;
};

const cargarTexto = (ar) => {
  const reader = new FileReader();
  reader.readAsDataURL(ar);
  reader.addEventListener("load", (e) => {
    document.querySelector(".resultado").textContent = e.currentTarget.result;
  });
};

const cargarImagen = (ar) => {
  const reader = new FileReader();
  reader.readAsDataURL(ar);
  reader.addEventListener("load", (e) => {
    let url = URL.createObjectURL(ar);
    let img = document.createElement("img");
    img.setAttribute("src", url.toString());
    document.querySelector(".resultado").appendChild(img);
  });
};

const cargarVideo = (ar) => {
  const reader = new FileReader();
  reader.readAsArrayBuffer(ar);
  reader.addEventListener("progress", (e) => {
    let carga = Math.round(e.loaded / ar.size * 100);
    document.querySelector(".bar-loader").style.width = `${carga}%`;
    console.log(carga);
  });
  reader.addEventListener("load", (e) => {
    let video = new Blob([ new Uint8Array(e.currentTarget.result) ], { type: "video/mp4", });
    let url = URL.createObjectURL(video);
    let img = document.createElement("VIDEO");
    img.setAttribute("src", url.toString());
    document.querySelector(".resultado").appendChild(img);
    img.play();
    img.loop = true;
  });
};
