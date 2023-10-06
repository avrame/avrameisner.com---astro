interface LinkMetaData {
  url: string | null;
  title?: string;
  src_code_url?: string;
}

// *** START ELEMENTS ***
let img_idx = 0;
const lightbox_links_container = document.querySelector(
  ".lightbox-links-container",
);
const lightbox_links = lightbox_links_container?.querySelectorAll("a");
const lightbox = document.getElementById("lightbox") as HTMLDialogElement;
const close_btn = lightbox.querySelector(".close");
const content_container = lightbox.querySelector(".content-container");
const prev_img_btn = lightbox.querySelector(".prev-image");
const next_img_btn = lightbox.querySelector(".next-image");
// *** END ELEMENTS ***

lightbox_links_container?.addEventListener("click", show_lightbox);

const images: Array<LinkMetaData> = [];
lightbox_links?.forEach((lb_link) => {
  images.push(get_link_data(lb_link));
});

close_btn?.addEventListener("click", hide_lightbox);
prev_img_btn?.addEventListener("click", show_prev_image);
next_img_btn?.addEventListener("click", show_next_image);

// *** START FUNCTIONS ***
function show_lightbox(e: Event) {
  e.preventDefault();

  const target = e.target as Element;
  const link = target.closest("a") as HTMLAnchorElement;

  if (link?.tagName === "A") {
    const type = link.getAttribute("data-type");
    if (type === "img") {
      if ("content" in document.createElement("template")) {
        const figure_template = document.querySelector(
          "#figure_template",
        ) as HTMLTemplateElement;
        const figure_clone = figure_template?.content.cloneNode(true);
        content_container?.appendChild(figure_clone);
        const img_data = get_link_data(link);
        if (img_data.url) {
          img_idx = images.findIndex((imgObj) => imgObj.url === img_data.url);
          set_figure(img_data);
        }
      }
    } else if (type === "iframe") {
      if ("content" in document.createElement("template")) {
        const iframe_template = document.querySelector(
          "#iframe_template",
        ) as HTMLTemplateElement;
        const iframe_clone = iframe_template?.content.cloneNode(true);
        content_container?.classList.add("justify-center");
        content_container?.appendChild(iframe_clone);
        const iframe = lightbox.querySelector("iframe");
        const iframe_data = get_link_data(link);
        if (iframe) {
          iframe.src = iframe_data.url as string;
          const src_code_url = lightbox.querySelector('.source-code-url')
          src_code_url?.setAttribute('href', iframe_data.src_code_url as string)
        }
      }
    }
    // Attach keyboard events
    document.addEventListener("keydown", handle_keyboard, { passive: true });
    lightbox?.classList.add("fade-in");
    lightbox?.showModal();
  }
}

function handle_keyboard(event: KeyboardEvent) {
  switch (event.key) {
    case "ArrowRight":
      show_next_image();
      break;
    case "ArrowLeft":
      show_prev_image();
      break;
    case "Escape":
      hide_lightbox();
      break;
  }
}

function fade_out_lightbox() {
  while (content_container?.firstChild) {
    content_container.removeChild(content_container?.firstChild);
  }
  lightbox.classList.remove("fade-out");
  lightbox.close();
  lightbox.removeEventListener("transitionend", fade_out_lightbox);
}

function hide_lightbox(event?: Event) {
  event?.preventDefault()
  lightbox.classList.remove("fade-in");
  lightbox.classList.add("fade-out");
  document.removeEventListener("keydown", handle_keyboard);
  lightbox.addEventListener("transitionend", fade_out_lightbox);
}

function show_next_image(e?: Event) {
  e?.preventDefault()
  const new_idx = img_idx + 1;
  img_idx = new_idx === images.length ? 0 : new_idx;
  set_figure(images[img_idx]);
}

function show_prev_image(e?: Event) {
  e?.preventDefault()
  const new_idx = img_idx - 1;
  img_idx = new_idx < 0 ? images.length - 1 : new_idx;
  set_figure(images[img_idx]);
}

function get_link_data(link: HTMLAnchorElement): LinkMetaData {
  const url = link.getAttribute("href");
  const title = link.querySelector(".title")?.innerHTML;
  const src_code_url = link.getAttribute("data-src-code-url") || undefined
  return { url, title, src_code_url };
}

function set_figure({ url, title }: LinkMetaData) {
  const img_element = document.querySelector("figure img");
  const img_caption = document.querySelector("figure figcaption");
  if (url) img_element?.setAttribute("src", url);
  if (title) {
    img_element?.setAttribute("alt", title);
    if (img_caption) img_caption.innerHTML = title;
  }
}
// *** END FUNCTIONS ***
