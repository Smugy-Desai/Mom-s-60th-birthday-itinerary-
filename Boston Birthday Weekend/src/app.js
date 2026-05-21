(function () {
  const data = window.__APP_DATA__;
  const $ = (selector) => document.querySelector(selector);

  const mapButton = (event) => {
    if (!event.mapUrl) return "";
    return `<a class="map-link" href="${event.mapUrl}" target="_blank" rel="noreferrer">Open in Maps</a>`;
  };

  const renderHeader = () => {
    $("#heroTitle").textContent = data.site.title;
    $("#heroSubtitle").innerHTML = data.site.subtitle;
    $("#footerText").textContent = data.site.footer;
  };

  const renderPhotoBackdrop = () => {
    $("#photoBackdrop").innerHTML = data.memoryPhotos.map((photo, index) => `
      <div class="memory-photo memory-photo-${index + 1}">
        <span>${photo.label}</span>
      </div>
    `).join("");
  };

  const renderFlights = () => {
    const groups = [
      { key: "arrival", title: "Arrivals" },
      { key: "departure", title: "Departures" }
    ];

    $("#flightBoard").innerHTML = groups.map((group) => {
      const flights = data.flights.filter((flight) => flight.type === group.key);
      return `
        <section class="flight-group" aria-label="${group.title}">
          <h3>${group.title}</h3>
          <div class="flight-list">
            ${flights.map((flight) => `
              <article class="flight-card">
                <div class="flight-person">${flight.person}</div>
                <div class="flight-route">
                  <strong>${flight.from}</strong>
                  <span>${flight.flightNumber}</span>
                  <strong>${flight.to}</strong>
                </div>
                <div class="flight-times">
                  <p><span>Depart</span>${flight.depart}</p>
                  <p><span>Arrive</span>${flight.arrive}</p>
                </div>
              </article>
            `).join("")}
          </div>
        </section>
      `;
    }).join("");
  };

  const renderWeather = () => {
    $("#weatherNote").textContent = data.site.weatherNote;
    $("#weatherStrip").innerHTML = data.weather.map((day) => `
      <article class="weather-card">
        <div class="weather-card-head">
          <span>${day.label}</span>
          <strong>${day.high}/${day.low}</strong>
        </div>
        <div class="rain-times">
          ${day.periods.map((period) => `
            <p><span>${period.label}</span><b>${period.rain}</b></p>
          `).join("")}
        </div>
      </article>
    `).join("");
  };

  const renderTimeline = () => {
    $("#timeline").innerHTML = data.itinerary.map((day) => `
      <section class="day-section ${day.featured ? "featured-day" : ""}" id="${day.id}" aria-labelledby="${day.id}-title">
        <div class="day-marker" aria-hidden="true"></div>
        <div class="day-heading">
          <p>${day.date}</p>
          <h3 id="${day.id}-title">${day.title}</h3>
          ${day.badge ? `<span>${day.badge}</span>` : ""}
        </div>
        <div class="event-list">
          ${day.events.map((event) => `
            <article class="event-card ${event.status === "open" ? "open-time" : ""}">
              <div class="event-time">${event.time}</div>
              <div class="event-main">
                <div class="event-title-row">
                  <h4>${event.name}</h4>
                  ${event.status === "open" ? `<span class="status-pill">Open time</span>` : ""}
                </div>
                <p class="event-location">${event.location}</p>
                ${event.detail ? `<p class="event-detail">${event.detail}</p>` : ""}
                ${mapButton(event)}
              </div>
            </article>
          `).join("")}
        </div>
      </section>
    `).join("");
  };

  const setupViewSwitching = () => {
    const buttons = document.querySelectorAll("[data-view-target]");
    const panels = document.querySelectorAll(".view-panel");

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const targetId = button.dataset.viewTarget;

        buttons.forEach((item) => {
          item.classList.toggle("is-active", item === button);
        });

        panels.forEach((panel) => {
          panel.classList.toggle("is-active", panel.id === targetId);
        });
      });
    });
  };

  const revealOnScroll = () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("is-visible");
      });
    }, { threshold: 0.14 });
    document.querySelectorAll(".weather-card, .day-section").forEach((element) => {
      observer.observe(element);
    });
  };

  const init = () => {
    renderHeader();
    renderPhotoBackdrop();
    renderFlights();
    renderWeather();
    renderTimeline();
    setupViewSwitching();
    revealOnScroll();
    setTimeout(() => document.body.classList.add("loaded"), 650);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
