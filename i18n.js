(() => {
  "use strict";

  const language = new URLSearchParams(window.location.search).get("lang") === "ru" ? "ru" : "en";
  const t = (english, russian) => (language === "ru" ? russian : english);

  window.CROSSHAIRONE_I18N = { language, t };
  document.documentElement.lang = language;

  const russianText = new Map([
    ["Skip to content", "Перейти к содержанию"],
    ["How it works", "Как работает"],
    ["Features", "Возможности"],
    ["Feedback", "Обратная связь"],
    ["Early access", "Ранний доступ"],
    ["Early build for macOS", "Ранняя версия для macOS"],
    ["Your crosshair.", "Твой прицел."],
    ["Right where you need it.", "Точно там, где нужен."],
    ["CrosshairOne is a native editor and transparent overlay for macOS. Build crosshairs from layers, calibrate them directly on screen, and switch presets with global hotkeys.", "CrosshairOne — нативный редактор и прозрачный overlay для macOS. Собирай прицел из слоёв, калибруй прямо на экране и переключай варианты горячими клавишами."],
    ["See how it works", "Посмотреть, как работает"],
    ["Become a tester", "Стать тестировщиком"],
    ["Core features work offline", "Основные функции офлайн"],
    ["Next crosshair", "Следующий прицел"],
    ["Dead center", "Точно по центру"],
    ["0.5 px calibration", "Калибровка по 0,5 px"],
    ["01 · HOW IT WORKS", "01 · КАК ЭТО РАБОТАЕТ"],
    ["From a blank canvas", "От пустого холста"],
    ["to a finished crosshair.", "до готового прицела."],
    ["One short video walks you through the entire flow: creation, calibration, and overlay use.", "Один короткий ролик покажет весь путь: создание, калибровку и работу overlay."],
    ["PRODUCT WALKTHROUGH", "ОБЗОР ПРОДУКТА"],
    ["See CrosshairOne in action", "Посмотрите CrosshairOne в действии"],
    ["The video plays right here — no trip to YouTube", "Видео откроется здесь — без перехода на YouTube"],
    ["Create", "Создай"],
    ["Build a crosshair from a dot, lines, or pixels. Adjust the color, thickness, gap, and outline.", "Собери прицел из точки, линий или пикселей. Настрой цвет, толщину, gap и контур."],
    ["Calibrate", "Откалибруй"],
    ["Align the entire crosshair over any window in precise 0.5-point increments.", "Выровняй весь прицел прямо поверх нужного окна с шагом до 0,5 пункта."],
    ["Use", "Используй"],
    ["Turn on the overlay and cycle through saved presets with global hotkeys.", "Включай overlay и переключай сохранённые варианты глобальными горячими клавишами."],
    ["02 · FEATURES", "02 · ВОЗМОЖНОСТИ"],
    ["Everything you need.", "Всё нужное."],
    ["Nothing you don't.", "Ничего лишнего."],
    ["CrosshairOne keeps things simple: create, save, and display your crosshair over the screen.", "CrosshairOne остаётся понятным инструментом: создать, сохранить, показать поверх экрана."],
    ["Layer-based editor", "Редактор по слоям"],
    ["Dots, lines, and pixel drawings stay fully editable. Move, hide, duplicate, and customize every layer independently.", "Точки, линии и pixel drawing остаются редактируемыми. Каждый слой можно перемещать, скрывать, дублировать и настраивать отдельно."],
    ["Non-intrusive overlay", "Overlay без помех"],
    ["The transparent window never steals focus and lets clicks pass through to the app underneath.", "Прозрачное окно не забирает фокус и пропускает клики к приложению под ним."],
    ["On-screen calibration", "Калибровка на экране"],
    ["The app steps out of the way while your crosshair stays visible. Move it with hotkeys and save the exact position.", "Приложение скрывается, а прицел остаётся. Двигай его хоткеями и сохрани точную позицию."],
    ["Create a set of favorite presets and cycle forward or back with global hotkeys.", "Собери набор любимых вариантов и листай их вперёд или назад глобальными клавишами."],
    ["Local library", "Локальная библиотека"],
    ["Search, sorting, favorites, recent projects, and autosave — all on your Mac.", "Поиск, сортировка, избранное, недавние проекты и автосохранение — всё на твоём Mac."],
    ["Import and export", "Импорт и экспорт"],
    ["Share editable projects in the", "Передавай редактируемые проекты в формате"],
    ["format — no cloud or account required.", "— без облака и привязки к аккаунту."],
    ["Your crosshairs", "Твои прицелы"],
    ["stay yours.", "остаются твоими."],
    ["The editor, library, overlay, import, and export all run locally. No internet connection is needed for core functionality.", "Редактор, библиотека, overlay, импорт и экспорт работают локально. Интернет не нужен для основной работы."],
    ["STORED LOCALLY", "ХРАНИТСЯ ЛОКАЛЬНО"],
    ["Compatibility", "Совместимость"],
    ["macOS 14 or later · Apple Silicon Mac", "macOS 14 или новее · Mac с Apple Silicon"],
    ["The overlay is designed to work over apps, Spaces, and full-screen windows. Results may vary depending on the display mode and restrictions of individual games.", "Overlay создан для работы поверх приложений, Spaces и полноэкранных окон. Результат может зависеть от режима отображения и ограничений конкретной игры."],
    ["04 · FEEDBACK", "04 · ОБРАТНАЯ СВЯЗЬ"],
    ["Help make", "Помоги сделать"],
    ["CrosshairOne better.", "CrosshairOne лучше."],
    ["Tell us what clicked, what got in the way, and what's missing. The more specific the example, the more useful your feedback.", "Расскажи, что зацепило, что мешает и чего не хватает. Чем конкретнее пример, тем полезнее отзыв."],
    ["Screenshots are welcome", "Можно приложить скриншоты"],
    ["Up to 3 files, 10 MB each", "До 3 файлов, каждый до 10 МБ"],
    ["Your email is only used to reply", "Почта нужна только для ответа"],
    ["And to send an early access invite, if you opt in", "И приглашения в ранний доступ, если ты согласишься"],
    ["Short feedback is welcome", "Подойдёт и короткий отзыв"],
    ["Even a single thought helps", "Даже одной мысли уже достаточно"],
    ["Name", "Имя"],
    ["optional", "необязательно"],
    ["What did you like?", "Что понравилось?"],
    ["What could be improved?", "Что стоит улучшить?"],
    ["Screenshots or files", "Скриншоты или файлы"],
    ["Choose files", "Выбрать файлы"],
    ["PNG, JPG, WEBP, HEIC, PDF, TXT, LOG, or .crosshairone", "PNG, JPG, WEBP, HEIC, PDF, TXT, LOG или .crosshairone"],
    ["I'd like an early access invite", "Хочу получить приглашение в ранний доступ"],
    ["After submission, your email, feedback, and attachments are sent to the Basin form service and stored according to the form settings. On the free plan, submissions are retained for up to 30 days.", "После отправки email, текст и вложения передаются сервису форм Basin и сохраняются по настройкам формы. На бесплатном плане срок хранения — до 30 дней."],
    ["How feedback is handled", "Как обрабатываются отзывы"],
    ["I agree to be contacted about this feedback", "Согласен, чтобы со мной связались по этому отзыву"],
    ["Submit feedback", "Отправить отзыв"],
    ["Do not attach passwords, identity documents, or other sensitive information.", "Не прикладывайте пароли, персональные документы или другую чувствительную информацию."],
    ["Built for people who notice every pixel.", "Создано для тех, кто замечает каждый пиксель."],
    ["Data handling", "Обработка данных"],
    ["Back to the form", "Вернуться к форме"],
    ["FEEDBACK · DATA", "ОБРАТНАЯ СВЯЗЬ · ДАННЫЕ"],
    ["A short, plain-language explanation of what happens to your data after you submit the CrosshairOne feedback form.", "Здесь коротко и без юридического тумана описано, что происходит с данными после отправки формы CrosshairOne."],
    ["What the form collects", "Какие данные попадают в форму"],
    ["Your email, feedback, optional name, early access preference, and any files you choose to attach. Do not send passwords, identity documents, medical information, or other sensitive data.", "Email, текст отзыва, необязательное имя, отметка о раннем доступе и файлы, которые вы решили приложить. Не отправляйте пароли, персональные документы, медицинские или другие чувствительные данные."],
    ["Why we collect it", "Зачем они нужны"],
    ["To review your feedback, understand an attached example, answer your question, and — only if you opt in — send you an early access invite.", "Чтобы изучить отзыв, разобраться в приложенном примере, ответить на вопрос и — только если вы отметили соответствующий пункт — прислать приглашение в ранний доступ."],
    ["Who processes submissions", "Кто обрабатывает отправку"],
    ["The form is powered by Basin. The service receives, stores, spam-filters, and forwards the submitted data and attachments to the owner of CrosshairOne. Basin has its own", "Форма работает через Basin: сервис получает, хранит, фильтрует от спама и передаёт владельцу CrosshairOne введённые данные и вложения. У Basin есть отдельные"],
    ["privacy policy", "политика конфиденциальности"],
    ["and", "и"],
    ["data protection information", "информация о защите данных"],
    ["Retention and deletion", "Срок хранения и удаление"],
    ["Retention is determined by the form settings. On Basin's free plan, submissions are retained for up to 30 days; the form owner may delete them sooner. To request a copy or deletion of your feedback, contact", "Срок задаётся в настройках формы. На бесплатном плане Basin отправки хранятся до 30 дней; владелец формы может удалить их раньше. Если вы хотите запросить копию или удаление своего отзыва, напишите на"],
    ["Anonymous site analytics", "Анонимная статистика сайта"],
    ["After public launch, the site may use Cloudflare Web Analytics to measure aggregate page views, referrers, devices, and loading performance. Cloudflare states that this service does not collect or use visitors' personal data.", "После публичного запуска сайт может использовать Cloudflare Web Analytics для агрегированных просмотров, источников перехода, устройств и скорости загрузки. По заявлению Cloudflare, этот сервис не собирает и не использует персональные данные посетителей."],
    ["This page covers the feedback form only. The CrosshairOne app stores projects locally on your Mac and does not submit them through this form unless you explicitly attach a file.", "Эта страница описывает работу именно формы обратной связи. Само приложение CrosshairOne хранит проекты локально на Mac и не отправляет их через эту форму без вашего явного выбора файла."],
  ]);

  const russianAttributes = new Map([
    ["CrosshairOne — back to top", "CrosshairOne — в начало страницы"],
    ["CrosshairOne — home", "CrosshairOne — на главную"],
    ["Main navigation", "Основная навигация"],
    ["System requirements and highlights", "Системные требования и особенности"],
    ["CrosshairOne interface preview", "Макет интерфейса CrosshairOne"],
    ["Play the CrosshairOne video", "Запустить видео о CrosshairOne"],
    ["What should we call you?", "Как к вам обращаться"],
    ["For example: the intuitive editor, quick calibration…", "Например: понятный редактор, быстрая калибровка…"],
    ["Describe the workflow, issue, or feature you were missing", "Опишите сценарий, проблему или функцию, которой не хватило"],
    ["Language", "Язык"],
  ]);

  const pageMetadata = {
    index: {
      title: "CrosshairOne — прицел для macOS",
      description: "CrosshairOne — нативный редактор прицелов и прозрачный overlay для macOS. Создавайте прицелы из слоёв, калибруйте их на экране и переключайтесь горячими клавишами.",
      ogTitle: "CrosshairOne — твой прицел, точно там, где нужен",
      ogDescription: "Нативный редактор прицелов и прозрачный overlay для macOS.",
    },
    privacy: {
      title: "Обработка отзывов — CrosshairOne",
      description: "Как CrosshairOne обрабатывает отзывы, email и вложения из формы обратной связи.",
    },
  };

  const normalize = (value) => value.replace(/\s+/g, " ").trim();

  if (language === "ru") {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);

    nodes.forEach((node) => {
      const key = normalize(node.nodeValue || "");
      const translated = russianText.get(key);
      if (!translated) return;
      const leading = node.nodeValue.match(/^\s*/)?.[0] || "";
      const trailing = node.nodeValue.match(/\s*$/)?.[0] || "";
      node.nodeValue = `${leading}${translated}${trailing}`;
    });

    document.querySelectorAll("[aria-label], [placeholder]").forEach((element) => {
      ["aria-label", "placeholder"].forEach((attribute) => {
        const value = element.getAttribute(attribute);
        const translated = value ? russianAttributes.get(value) : null;
        if (translated) element.setAttribute(attribute, translated);
      });
    });

    const isPrivacyPage = document.body.classList.contains("legal-page");
    const metadata = isPrivacyPage ? pageMetadata.privacy : pageMetadata.index;
    document.title = metadata.title;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.content = metadata.description;
    if (!isPrivacyPage) {
      const ogTitle = document.querySelector('meta[property="og:title"]');
      const ogDescription = document.querySelector('meta[property="og:description"]');
      if (ogTitle) ogTitle.content = metadata.ogTitle;
      if (ogDescription) ogDescription.content = metadata.ogDescription;
    }

    document.querySelectorAll('a[href="./privacy.html"]').forEach((link) => {
      link.href = "./privacy.html?lang=ru";
    });
    document.querySelectorAll('a[href^="./index.html"]').forEach((link) => {
      const hash = link.hash;
      link.href = `./index.html?lang=ru${hash}`;
    });
  }

  document.querySelectorAll("[data-language]").forEach((button) => {
    const isActive = button.dataset.language === language;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
    button.addEventListener("click", () => {
      const nextLanguage = button.dataset.language === "ru" ? "ru" : "en";
      const url = new URL(window.location.href);
      if (nextLanguage === "ru") url.searchParams.set("lang", "ru");
      else url.searchParams.delete("lang");
      window.location.assign(url);
    });
  });
})();
