(() => {
  "use strict";

  const config = window.CROSSHAIRONE_SITE_CONFIG || {};
  const i18n = window.CROSSHAIRONE_I18N || { language: "en", t: (english) => english };
  const t = i18n.t;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const currentYear = document.querySelector("#current-year");
  if (currentYear) currentYear.textContent = String(new Date().getFullYear());

  const analyticsToken = String(config.cloudflareAnalyticsToken || "").trim();
  if (/^[A-Za-z0-9_-]{16,128}$/.test(analyticsToken)) {
    const analytics = document.createElement("script");
    analytics.defer = true;
    analytics.src = "https://static.cloudflareinsights.com/beacon.min.js";
    analytics.dataset.cfBeacon = JSON.stringify({ token: analyticsToken });
    document.head.append(analytics);
  }

  const videoLink = document.querySelector(".video-launch");
  const videoStatus = document.querySelector(".video-status");
  const youtubeId = String(config.youtubeVideoId || "").trim();
  const validYoutubeId = /^[A-Za-z0-9_-]{11}$/.test(youtubeId);

  if (videoLink) {
    if (validYoutubeId) {
      videoLink.href = `https://www.youtube.com/watch?v=${youtubeId}`;
      videoLink.target = "_blank";
      videoLink.rel = "noopener noreferrer";
      videoLink.setAttribute(
        "aria-label",
        t("Watch the CrosshairOne video on YouTube", "Посмотреть видео о CrosshairOne на YouTube"),
      );
    } else {
      videoLink.classList.add("is-placeholder");
      videoLink.addEventListener("click", (event) => {
        event.preventDefault();
        if (videoStatus) {
          videoStatus.textContent = t(
            "The video is coming soon. Leave your email below and we'll let you know when it's ready.",
            "Видео готовится. Оставьте email ниже — сообщим, когда оно появится.",
          );
        }
        document.querySelector("#feedback")?.scrollIntoView({
          behavior: reducedMotion ? "auto" : "smooth",
          block: "start",
        });
      });
    }
  }

  const fileInput = document.querySelector("#attachments");
  const fileList = document.querySelector("#file-list");
  const formStatus = document.querySelector("#form-status");
  const maximumFiles = 3;
  const maximumFileSize = 10 * 1024 * 1024;

  const readableSize = (bytes) => {
    if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} ${t("KB", "КБ")}`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} ${t("MB", "МБ")}`;
  };

  const renderFiles = () => {
    if (!fileInput || !fileList) return true;
    fileList.replaceChildren();
    const files = Array.from(fileInput.files || []);

    if (files.length > maximumFiles) {
      fileInput.value = "";
      if (formStatus) {
        formStatus.textContent = t(
          `You can attach up to ${maximumFiles} files.`,
          `Можно приложить не более ${maximumFiles} файлов.`,
        );
      }
      return false;
    }

    const oversized = files.find((file) => file.size > maximumFileSize);
    if (oversized) {
      fileInput.value = "";
      if (formStatus) {
        formStatus.textContent = t(
          `“${oversized.name}” is larger than 10 MB.`,
          `Файл «${oversized.name}» больше 10 МБ.`,
        );
      }
      return false;
    }

    files.forEach((file) => {
      const item = document.createElement("li");
      const name = document.createElement("span");
      const size = document.createElement("small");
      name.textContent = file.name;
      size.textContent = readableSize(file.size);
      item.append(name, size);
      fileList.append(item);
    });

    if (formStatus) formStatus.textContent = "";
    return true;
  };

  fileInput?.addEventListener("change", renderFiles);

  const feedbackForm = document.querySelector("#feedback-form");
  const endpoint = String(config.feedbackEndpoint || "").trim();
  let endpointUrl = null;
  try {
    const parsed = new URL(endpoint);
    const basinFormPath = /^\/f\/[^/]+\/?$/.test(parsed.pathname);
    if (parsed.protocol === "https:" && parsed.hostname === "usebasin.com" && basinFormPath) {
      endpointUrl = parsed;
    }
  } catch {
    endpointUrl = null;
  }

  if (feedbackForm && endpointUrl) feedbackForm.action = endpointUrl.href;

  feedbackForm?.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!feedbackForm.checkValidity()) {
      feedbackForm.reportValidity();
      if (formStatus) formStatus.textContent = t("Please check the required fields.", "Проверьте обязательные поля.");
      return;
    }

    if (!renderFiles()) {
      return;
    }

    if (!endpointUrl) {
      if (formStatus) {
        formStatus.textContent = t(
          "The form isn't connected yet. Keep this page open and try again in a little while.",
          "Форма пока не подключена. Оставьте страницу открытой и попробуйте ещё раз чуть позже.",
        );
      }
      return;
    }

    const submitButton = feedbackForm.querySelector("button[type='submit']");
    const submitLabel = submitButton?.querySelector("span");
    const idleLabel = submitLabel?.textContent || t("Submit feedback", "Отправить отзыв");
    if (submitButton) {
      submitButton.disabled = true;
      if (submitLabel) submitLabel.textContent = t("Sending…", "Отправляем…");
    }
    if (formStatus) formStatus.textContent = "";

    try {
      const response = await fetch(endpointUrl.href, {
        method: "POST",
        body: new FormData(feedbackForm),
        headers: { Accept: "application/json" },
      });

      if (!response.ok) throw new Error(`Basin returned ${response.status}`);

      feedbackForm.reset();
      fileList?.replaceChildren();
      if (formStatus) {
        formStatus.textContent = t(
          "Thank you — your feedback has been sent.",
          "Спасибо — ваш отзыв отправлен.",
        );
      }
    } catch {
      if (formStatus) {
        formStatus.textContent = t(
          "We couldn't send your feedback. Please try again.",
          "Не удалось отправить отзыв. Попробуйте ещё раз.",
        );
      }
    } finally {
      if (submitButton) submitButton.disabled = false;
      if (submitLabel) submitLabel.textContent = idleLabel;
    }
  });

  const email = String(config.contactEmail || "").trim();
  if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    document.querySelectorAll("[data-contact-email]").forEach((link) => {
      link.href = `mailto:${email}`;
      link.textContent = email;
      link.hidden = false;
    });
  }

  const revealItems = document.querySelectorAll(".reveal");
  if (reducedMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -9%", threshold: 0.08 },
    );
    revealItems.forEach((item) => revealObserver.observe(item));
  }

  const visual = document.querySelector(".product-visual");
  const appWindow = document.querySelector(".app-window");
  if (visual && appWindow && !reducedMotion && window.matchMedia("(pointer: fine)").matches) {
    visual.addEventListener("pointermove", (event) => {
      const bounds = visual.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      appWindow.style.setProperty("--tilt-x", `${(-y * 2.4).toFixed(2)}deg`);
      appWindow.style.setProperty("--tilt-y", `${(x * 3.2).toFixed(2)}deg`);
    });
    visual.addEventListener("pointerleave", () => {
      appWindow.style.setProperty("--tilt-x", "0deg");
      appWindow.style.setProperty("--tilt-y", "0deg");
    });
  }
})();
