// Replace this URL to switch from the sample file to a production API.
const DATA_URL = "data/rates.json";
const LANGUAGE_KEY = "rozbhav-language";

const translations = {
  en: {
    languageLabel: "Language", eyebrow: "DAILY WHOLESALE PRICES", title: "Vegetable mandi rates",
    subtitle: "Today’s prices from markets across Maharashtra.", marketLabel: "Market", searchLabel: "Find a vegetable",
    searchPlaceholder: "Search vegetables", ratesTitle: "Today’s rates", loading: "Loading today’s rates…",
    lastUpdated: "Last updated", modal: "Modal", perQuintal: "/ quintal", range: "Min–max",
    down: "down", up: "up", same: "no change", noResults: "No vegetables match your search.",
    error: "Rates could not be loaded. Please check your connection and try again.",
    sourceNote: "Prices are wholesale mandi rates and may differ from retail shop prices. Source: Agmarknet / Government of India.",
    about: "About", contact: "Contact", markets: { kolhapur: "Kolhapur", pune: "Pune", mumbai: "Mumbai (Vashi APMC)", nashik: "Nashik", nagpur: "Nagpur" },
    vegetables: {
      tomato: "Tomato", onion: "Onion", potato: "Potato", brinjal: "Brinjal", cabbage: "Cabbage", cauliflower: "Cauliflower",
      okra: "Okra (Bhendi)", green_chilli: "Green Chilli", carrot: "Carrot", cucumber: "Cucumber", spinach: "Spinach",
      coriander: "Coriander", garlic: "Garlic", ginger: "Ginger", capsicum: "Capsicum"
    }
  },
  hi: {
    languageLabel: "भाषा", eyebrow: "रोज़ाना थोक भाव", title: "सब्ज़ी मंडी के भाव",
    subtitle: "महाराष्ट्र की मंडियों के आज के भाव।", marketLabel: "मंडी", searchLabel: "सब्ज़ी खोजें",
    searchPlaceholder: "सब्ज़ियाँ खोजें", ratesTitle: "आज के भाव", loading: "आज के भाव लोड हो रहे हैं…",
    lastUpdated: "आखिरी अपडेट", modal: "मॉडल भाव", perQuintal: "/ क्विंटल", range: "न्यूनतम–अधिकतम",
    down: "कम", up: "ज़्यादा", same: "कोई बदलाव नहीं", noResults: "आपकी खोज से मेल खाती सब्ज़ी नहीं मिली।",
    error: "भाव लोड नहीं हो सके। कृपया कनेक्शन जाँचकर फिर कोशिश करें।",
    sourceNote: "भाव थोक मंडी के हैं और खुदरा दुकानों के भाव से अलग हो सकते हैं। स्रोत: एगमार्कनेट / भारत सरकार।",
    about: "हमारे बारे में", contact: "संपर्क", markets: { kolhapur: "कोल्हापुर", pune: "पुणे", mumbai: "मुंबई (वाशी APMC)", nashik: "नासिक", nagpur: "नागपुर" },
    vegetables: {
      tomato: "टमाटर", onion: "प्याज़", potato: "आलू", brinjal: "बैंगन", cabbage: "पत्तागोभी", cauliflower: "फूलगोभी",
      okra: "भिंडी", green_chilli: "हरी मिर्च", carrot: "गाजर", cucumber: "खीरा", spinach: "पालक",
      coriander: "धनिया", garlic: "लहसुन", ginger: "अदरक", capsicum: "शिमला मिर्च"
    }
  },
  mr: {
    languageLabel: "भाषा", eyebrow: "रोजचे घाऊक दर", title: "भाजी मंडईचे दर",
    subtitle: "महाराष्ट्रातील बाजारांचे आजचे दर.", marketLabel: "बाजारपेठ", searchLabel: "भाजी शोधा",
    searchPlaceholder: "भाज्या शोधा", ratesTitle: "आजचे दर", loading: "आजचे दर लोड होत आहेत…",
    lastUpdated: "शेवटचे अपडेट", modal: "प्रचलित दर", perQuintal: "/ क्विंटल", range: "किमान–कमाल",
    down: "कमी", up: "जास्त", same: "बदल नाही", noResults: "तुमच्या शोधाशी जुळणारी भाजी सापडली नाही.",
    error: "दर लोड करता आले नाहीत. कृपया कनेक्शन तपासून पुन्हा प्रयत्न करा.",
    sourceNote: "हे घाऊक मंडईचे दर आहेत; किरकोळ दुकानांचे दर वेगळे असू शकतात. स्रोत: अगमार्कनेट / भारत सरकार.",
    about: "आमच्याबद्दल", contact: "संपर्क", markets: { kolhapur: "कोल्हापूर", pune: "पुणे", mumbai: "मुंबई (वाशी APMC)", nashik: "नाशिक", nagpur: "नागपूर" },
    vegetables: {
      tomato: "टोमॅटो", onion: "कांदा", potato: "बटाटा", brinjal: "वांगी", cabbage: "कोबी", cauliflower: "फुलकोबी",
      okra: "भेंडी", green_chilli: "हिरवी मिरची", carrot: "गाजर", cucumber: "काकडी", spinach: "पालक",
      coriander: "कोथिंबीर", garlic: "लसूण", ginger: "आले", capsicum: "ढोबळी मिरची"
    }
  }
};

const elements = {
  language: document.querySelector("#language-select"),
  market: document.querySelector("#market-select"),
  search: document.querySelector("#vegetable-search"),
  updated: document.querySelector("#updated-at"),
  list: document.querySelector("#rates-list")
};
let ratesData;
let language = localStorage.getItem(LANGUAGE_KEY);
if (!translations[language]) language = "en";

document.querySelector("#year").textContent = new Date().getFullYear();
elements.language.value = language;
elements.language.addEventListener("change", () => {
  language = elements.language.value;
  localStorage.setItem(LANGUAGE_KEY, language);
  applyTranslations();
  renderRates();
});
elements.market.addEventListener("change", renderRates);
elements.search.addEventListener("input", renderRates);

function applyTranslations() {
  const labels = translations[language];
  document.documentElement.lang = language;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = labels[element.dataset.i18n];
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    element.placeholder = labels[element.dataset.i18nPlaceholder];
  });
  elements.language.setAttribute("aria-label", labels.languageLabel);
  for (const option of elements.market.options) {
    option.textContent = labels.markets[option.value];
  }
}

function formatPrice(value) {
  return new Intl.NumberFormat(language === "en" ? "en-IN" : language === "hi" ? "hi-IN" : "mr-IN", {
    maximumFractionDigits: 0
  }).format(value);
}

function renderRates() {
  if (!ratesData) return;
  const labels = translations[language];
  const market = ratesData.markets[elements.market.value];
  const query = elements.search.value.trim().toLocaleLowerCase(language);
  const date = new Date(`${market.updated}T00:00:00`);
  elements.updated.textContent = `${labels.lastUpdated}: ${new Intl.DateTimeFormat(language, { dateStyle: "medium" }).format(date)}`;
  const vegetables = market.vegetables.filter((item) => {
    const localizedName = labels.vegetables[item.id] || item.name;
    return `${localizedName} ${item.name}`.toLocaleLowerCase(language).includes(query);
  });

  elements.list.replaceChildren();
  elements.list.setAttribute("aria-busy", "false");
  if (!vegetables.length) {
    const empty = document.createElement("p");
    empty.className = "status-message";
    empty.textContent = labels.noResults;
    elements.list.append(empty);
    return;
  }

  for (const item of vegetables) {
    const difference = item.today.modal - item.yesterday.modal;
    const direction = difference < 0 ? "down" : difference > 0 ? "up" : "same";
    const arrow = direction === "down" ? "↓" : direction === "up" ? "↑" : "→";
    const card = document.createElement("article");
    card.className = "rate-card";
    card.innerHTML = `
      <div class="card-top">
        <h3 class="veg-name"></h3>
        <p class="modal-price"><span class="price-value"></span> <small>₹ ${labels.perQuintal}</small></p>
      </div>
      <div class="card-bottom">
        <p class="range-price"></p>
        <span class="change ${direction}" aria-label="${labels[direction]} ${formatPrice(Math.abs(difference))} rupees">
          <span class="change-arrow" aria-hidden="true">${arrow}</span>${labels[direction]} ${formatPrice(Math.abs(difference))}
        </span>
      </div>`;
    card.querySelector(".veg-name").textContent = labels.vegetables[item.id] || item.name;
    card.querySelector(".price-value").textContent = formatPrice(item.today.modal);
    card.querySelector(".range-price").textContent = `${labels.range}: ₹${formatPrice(item.today.min)}–${formatPrice(item.today.max)}`;
    elements.list.append(card);
  }
}

async function loadRates() {
  applyTranslations();
  try {
    const response = await fetch(DATA_URL);
    if (!response.ok) throw new Error(`Request failed: ${response.status}`);
    ratesData = await response.json();
    renderRates();
  } catch {
    elements.list.setAttribute("aria-busy", "false");
    elements.list.innerHTML = `<p class="status-message error" role="alert">${translations[language].error}</p>`;
  }
}

loadRates();
