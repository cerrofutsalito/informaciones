/**
 * Cerro Porteño Futsal - Base y Formativas
 */

(function () {
  'use strict';

  // Configuración de contacto
  const TELEFONO_WHATSAPP = '595992355381';

  // Datos oficiales de categorías
  const CATEGORIAS = [
    {
      id: 'sub4-sub7',
      titulo: 'SUB 4 y SUB 7',
      grupo: 'lunes_miercoles',
      diasCorto: 'Lun y Mié',
      diasCompleto: 'Lunes y Miércoles',
      horario: '16:30 a 17:30 hs',
      lugar: 'Asociación Cristiana de Jóvenes',
      direccion: 'Fulgencio R. Moreno c/ Estados Unidos, Asunción',
      mapaUrl: 'https://www.google.com/maps/search/?api=1&query=ACJ+Fulgencio+R+Moreno+c/+EEUU+Asuncion'
    },
    {
      id: 'sub9',
      titulo: 'SUB 9',
      grupo: 'lunes_miercoles',
      diasCorto: 'Lun y Mié',
      diasCompleto: 'Lunes y Miércoles',
      horario: '17:30 a 18:30 hs',
      lugar: 'Asociación Cristiana de Jóvenes',
      direccion: 'Fulgencio R. Moreno c/ Estados Unidos, Asunción',
      mapaUrl: 'https://www.google.com/maps/search/?api=1&query=ACJ+Fulgencio+R+Moreno+c/+EEUU+Asuncion'
    },
    {
      id: 'sub11',
      titulo: 'SUB 11',
      grupo: 'lunes_miercoles',
      diasCorto: 'Lun y Mié',
      diasCompleto: 'Lunes y Miércoles',
      horario: '18:30 a 19:30 hs',
      lugar: 'Asociación Cristiana de Jóvenes',
      direccion: 'Fulgencio R. Moreno c/ Estados Unidos, Asunción',
      mapaUrl: 'https://www.google.com/maps/search/?api=1&query=ACJ+Fulgencio+R+Moreno+c/+EEUU+Asuncion'
    },
    {
      id: 'sub13',
      titulo: 'SUB 13',
      grupo: 'martes_jueves',
      diasCorto: 'Mar y Jue',
      diasCompleto: 'Martes y Jueves',
      horario: '18:30 a 19:45 hs',
      lugar: 'Seccional 19 (Barrio Obrero)',
      direccion: '18 Proyectadas entre Chile y Alberdi, Barrio Obrero - Asunción',
      mapaUrl: 'https://www.google.com/maps/search/?api=1&query=Seccional+19+Asuncion'
    },
    {
      id: 'sub15-sub17',
      titulo: 'SUB 15 y SUB 17',
      grupo: 'martes_jueves',
      diasCorto: 'Mar y Jue',
      diasCompleto: 'Martes y Jueves',
      horario: '19:45 a 21:00 hs',
      lugar: 'Seccional 19 (Barrio Obrero)',
      direccion: '18 Proyectadas entre Chile y Alberdi, Barrio Obrero - Asunción',
      mapaUrl: 'https://www.google.com/maps/search/?api=1&query=Seccional+19+Asuncion'
    }
  ];

  // Estado de la aplicación
  let state = {
    vista: 'lista', // 'lista' | 'detalle'
    filtro: 'todos', // 'todos' | 'lunes_miercoles' | 'martes_jueves'
    catSeleccionada: null,
    scrollLista: 0
  };

  // Referencias del DOM
  const container = document.getElementById('view-container');
  const stickyCta = document.getElementById('btn-whatsapp-tami');
  const stickyCtaText = document.getElementById('sticky-cta-text');
  const header = document.getElementById('app-header');

  // Año actual dinámico
  const CURRENT_YEAR = new Date().getFullYear();

  function updateDynamicYears() {
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', `Escuela y Formativas de Futsal del Club Cerro Porteño (Cerro Futsalito) en Asunción y Barrio Obrero ${CURRENT_YEAR}. Horarios de entrenamiento Sub 4 a Sub 17, sedes en ACJ y Seccional 19 e inscripciones abiertas para niños y jóvenes.`);
    }
    const statusPill = document.querySelector('.status-pill');
    if (statusPill) {
      statusPill.setAttribute('title', `Temporada ${CURRENT_YEAR} activa`);
    }
    const yearElements = document.querySelectorAll('.current-year');
    yearElements.forEach(el => {
      el.textContent = CURRENT_YEAR;
    });
  }

  // Íconos reutilizables
  const ICON_CLOCK = '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';
  const ICON_PIN = '<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path></svg>';

  // Generador de enlaces de WhatsApp
  function getWhatsappUrl(cat) {
    let msg = '';
    if (cat) {
      msg = `Hola Tami, me gustaría inscribirme en la categoría ${cat.titulo} (${cat.diasCompleto}, ${cat.horario} en ${cat.lugar}). ¿Me podrías indicar los requisitos y detalles?`;
    } else {
      msg = `Hola Tami, me gustaría recibir información sobre las inscripciones para las Formativas de Cerro Porteño Futsal ${CURRENT_YEAR}.`;
    }
    return `https://wa.me/${TELEFONO_WHATSAPP}?text=${encodeURIComponent(msg)}`;
  }

  // Actualizar el dock inferior
  function updateStickyDock() {
    if (state.vista === 'detalle' && state.catSeleccionada) {
      document.body.classList.add('view-detail');
      stickyCta.href = getWhatsappUrl(state.catSeleccionada);
      if (stickyCtaText) stickyCtaText.textContent = 'Inscribirme';
      if (header) {
        header.classList.add('is-back-target');
        header.setAttribute('aria-label', 'Volver a la lista de categorías');
        header.title = 'Toca aquí para volver a la lista';
      }
    } else {
      document.body.classList.remove('view-detail');
      stickyCta.href = getWhatsappUrl(null);
      if (stickyCtaText) stickyCtaText.textContent = 'Consultar WhatsApp';
      if (header) {
        header.classList.remove('is-back-target');
        header.removeAttribute('aria-label');
        header.title = 'Cerro Porteño Futsal - Base y Formativas';
      }
    }
  }

  // Renderizar la vista de listado
  function renderListHtml() {
    const catsFiltradas = state.filtro === 'todos' 
      ? CATEGORIAS 
      : CATEGORIAS.filter(c => c.grupo === state.filtro);

    const cardsHtml = catsFiltradas.map(cat => {
      const isLunMie = cat.grupo === 'lunes_miercoles';
      const badgeClass = isLunMie ? 'badge-blue' : 'badge-red';

      return `
        <button type="button" class="glass-card category-card" data-cat-id="${cat.id}">
          <div class="category-info">
            <div class="category-title-row">
              <span class="cat-title">${cat.titulo}</span>
              <span class="badge-tag ${badgeClass}">${cat.diasCorto}</span>
            </div>
            <div class="cat-time">
              ${ICON_CLOCK}
              <span>${cat.horario}</span>
            </div>
            <div class="cat-place">
              ${ICON_PIN}
              <span>${cat.lugar}</span>
            </div>
          </div>
          <div class="arrow-btn">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"></path></svg>
          </div>
        </button>
      `;
    }).join('');

    return `
      <div class="filter-tabs">
        <button type="button" class="filter-btn ${state.filtro === 'todos' ? 'active-blue' : ''}" data-filter="todos">Todas</button>
        <button type="button" class="filter-btn ${state.filtro === 'lunes_miercoles' ? 'active-blue' : ''}" data-filter="lunes_miercoles">Lun y Mié (ACJ)</button>
        <button type="button" class="filter-btn ${state.filtro === 'martes_jueves' ? 'active-red' : ''}" data-filter="martes_jueves">Mar y Jue (Secc. 19)</button>
      </div>

      <section>
        <div class="section-header">
          <span class="section-hint">Toca para ver detalles</span>
        </div>
        <div class="categories-list">
          ${cardsHtml}
        </div>
      </section>

      <!-- Sección de Preguntas Frecuentes / Beneficios -->
      <section class="faq-section">
        <div class="section-header">
          <span class="section-title">Preguntas Frecuentes</span>
        </div>
        <div class="faq-list">

          <details class="glass-card faq-item">
            <summary class="faq-summary">
              <span>¿Qué indumentaria o calzado se necesita?</span>
              <svg class="faq-chevron" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"></path></svg>
            </summary>
            <div class="faq-content">
              <p>Para comenzar se requiere ropa deportiva cómoda y calzado deportivo de suela lisa (championes para futsal/pista). La indumentaria oficial se gestiona tras confirmar la inscripción.</p>
            </div>
          </details>

          <details class="glass-card faq-item">
            <summary class="faq-summary">
              <span>¿Las formativas y base son mixtas?</span>
              <svg class="faq-chevron" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"></path></svg>
            </summary>
            <div class="faq-content">
              <p>Sí, en las etapas de base y formativas promovemos un entorno formativo mixto e inclusivo, enfocado en el desarrollo psicomotriz, valores deportivos y técnica individual.</p>
            </div>
          </details>

          <details class="glass-card faq-item">
            <summary class="faq-summary">
              <span>¿Quiénes dictan los entrenamientos?</span>
              <svg class="faq-chevron" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"></path></svg>
            </summary>
            <div class="faq-content">
              <p>Las clases son dirigidas por un cuerpo técnico especializado en FUTSAL formativo, con metodología del Club Cerro Porteño centrada en el crecimiento pedagógico y deportivo.</p>
            </div>
          </details>
        </div>
      </section>

      <p class="slogan-text">"Herederos hoy, Dueños del Futsal mañana"</p>
    `;
  }

  // Renderizar la vista de detalle: tarjeta expandida con view-transition-name
  function renderDetailHtml(cat) {
    const isLunMie = cat.grupo === 'lunes_miercoles';
    const borderClass = isLunMie ? 'blue-top' : 'red-top';
    const badgeClass = isLunMie ? 'badge-blue' : 'badge-red';
    const waUrl = getWhatsappUrl(cat);

    return `
      <div class="detail-view">
        <nav class="back-nav">
          <button type="button" class="back-btn" id="btn-volver">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"></path></svg>
            <span>Volver a categorías</span>
          </button>
          <span class="nav-tag">Detalle de Categoría</span>
        </nav>

        <article class="glass-card detail-card ${borderClass}" style="view-transition-name: active-card;">
          <div class="detail-card-head">
            <div class="detail-card-info">
              <span class="detail-label">Categoría</span>
              <h2 class="detail-cat-title">${cat.titulo}</h2>
              <span class="badge-tag ${badgeClass}">${cat.diasCompleto}</span>
            </div>
            <div class="detail-badge-logo">
              <picture>
                <source srcset="imagenes/logo.webp" type="image/webp">
                <img src="imagenes/logo.png" alt="Cerro" width="56" height="56">
              </picture>
            </div>
          </div>

          <div class="detail-facts">
            <div class="detail-fact">
              <span class="time-label">Horario de entrenamiento</span>
              <div class="cat-time is-lg">
                ${ICON_CLOCK}
                <span>${cat.horario}</span>
              </div>
            </div>
            <div class="detail-fact">
              <span class="time-label">Ubicación</span>
              <div class="cat-place is-lg">
                ${ICON_PIN}
                <span>${cat.lugar}</span>
              </div>
              <p class="location-addr">${cat.direccion}</p>
            </div>
          </div>

          <a href="${cat.mapaUrl}" target="_blank" rel="noopener noreferrer" class="maps-btn">
            <svg class="pin-icon" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path></svg>
            <span>Abrir en Google Maps (Cómo llegar)</span>
            <svg class="ext-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
          </a>

          <div class="requirements-box">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span><strong>Requisitos:</strong> Cédula de identidad (alumno/a).</span>
          </div>

          <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="whatsapp-main-btn">
            <picture>
              <source srcset="imagenes/whatsapp-icon.webp" type="image/webp">
              <img src="imagenes/whatsapp-icon.png" alt="WhatsApp" width="20" height="20">
            </picture>
            <span>Inscribirme a ${cat.titulo}</span>
          </a>
        </article>
      </div>
    `;
  }

  // Renderizar la vista actual
  function render() {
    if (state.vista === 'lista') {
      container.innerHTML = renderListHtml();
      bindListEvents();
    } else if (state.vista === 'detalle' && state.catSeleccionada) {
      container.innerHTML = renderDetailHtml(state.catSeleccionada);
      bindDetailEvents();
    }
    updateStickyDock();
  }

  // Abrir detalle con View Transition limpia (solo la tarjeta activa se agranda)
  function abrirDetalle(cat, cardEl, pushHistory = true) {
    state.scrollLista = window.scrollY;

    if (pushHistory && window.history && window.history.pushState) {
      window.history.pushState({ vista: 'detalle', catId: cat.id }, '', `#${cat.id}`);
    }

    if (!document.startViewTransition || !cardEl) {
      state.vista = 'detalle';
      state.catSeleccionada = cat;
      render();
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    // Se asigna view-transition-name ÚNICAMENTE a la tarjeta pulsada
    cardEl.style.viewTransitionName = 'active-card';

    const transition = document.startViewTransition(() => {
      state.vista = 'detalle';
      state.catSeleccionada = cat;
      render();
      window.scrollTo({ top: 0, behavior: 'instant' });
    });

    transition.finished.finally(() => {
      // Limpieza post-transición
      const detailCard = document.querySelector('.detail-card');
      if (detailCard) detailCard.style.viewTransitionName = '';
    });
  }

  // Volver a la lista con animación inversa (la tarjeta se contrae a su posición)
  function volverALista(fromPopState = false) {
    if (state.vista === 'lista') return;

    // Si el usuario tocó el botón en pantalla y existe historial con hash, usar history.back()
    if (!fromPopState && window.location.hash && window.history && window.history.length > 1) {
      window.history.back();
      return;
    }

    const catId = state.catSeleccionada ? state.catSeleccionada.id : null;

    if (!document.startViewTransition) {
      state.vista = 'lista';
      state.catSeleccionada = null;
      render();
      window.scrollTo({ top: state.scrollLista, behavior: 'instant' });
      return;
    }

    const detailCard = document.querySelector('.detail-card');
    if (detailCard) {
      detailCard.style.viewTransitionName = 'active-card';
    }

    const transition = document.startViewTransition(() => {
      state.vista = 'lista';
      state.catSeleccionada = null;
      render();
      window.scrollTo({ top: state.scrollLista, behavior: 'instant' });

      // Asignar view-transition-name a la tarjeta de destino en la lista
      if (catId) {
        const targetCard = document.querySelector(`[data-cat-id="${catId}"]`);
        if (targetCard) {
          targetCard.style.viewTransitionName = 'active-card';
        }
      }
    });

    transition.finished.finally(() => {
      if (catId) {
        const targetCard = document.querySelector(`[data-cat-id="${catId}"]`);
        if (targetCard) targetCard.style.viewTransitionName = '';
      }
    });
  }

  // Eventos de la vista de listado
  function bindListEvents() {
    // Filtros
    const filterButtons = container.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const nuevoFiltro = btn.getAttribute('data-filter');
        if (nuevoFiltro !== state.filtro) {
          if (document.startViewTransition) {
            document.startViewTransition(() => {
              state.filtro = nuevoFiltro;
              render();
            });
          } else {
            state.filtro = nuevoFiltro;
            render();
          }
        }
      });
    });

    // Clics en tarjetas de categoría
    const catCards = container.querySelectorAll('.category-card');
    catCards.forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-cat-id');
        const cat = CATEGORIAS.find(c => c.id === id);
        if (cat) abrirDetalle(cat, card);
      });
    });
  }

  // Eventos de la vista de detalle
  function bindDetailEvents() {
    const btnVolver = document.getElementById('btn-volver');
    if (btnVolver) btnVolver.addEventListener('click', () => volverALista(false));
  }

  // Navegación con el botón "Atrás" del navegador/celular
  window.addEventListener('popstate', (e) => {
    if (e.state && e.state.vista === 'detalle' && e.state.catId) {
      const cat = CATEGORIAS.find(c => c.id === e.state.catId);
      if (cat) {
        const cardEl = document.querySelector(`[data-cat-id="${cat.id}"]`);
        abrirDetalle(cat, cardEl, false);
        return;
      }
    }
    if (state.vista === 'detalle') {
      volverALista(true);
    }
  });

  // Eventos y accesibilidad en el encabezado
  if (header) {
    header.addEventListener('click', (e) => {
      // Evitar que al tocar el enlace de Instagram se cierre la vista de detalle
      if (e.target.closest('a')) return;
      if (state.vista === 'detalle') {
        volverALista(false);
      }
    });

    header.addEventListener('keydown', (e) => {
      if (e.target.closest('a')) return;
      if ((e.key === 'Enter' || e.key === ' ') && state.vista === 'detalle') {
        e.preventDefault();
        volverALista(false);
      }
    });
  }

  // Inicialización
  updateDynamicYears();

  // Si la URL inicial trae un hash de categoría válida, restaurar o limpiar
  if (window.location.hash) {
    const initialId = window.location.hash.replace('#', '');
    const initialCat = CATEGORIAS.find(c => c.id === initialId);
    if (initialCat) {
      // Primero reemplazamos el estado base para que Atrás lleve a la lista
      window.history.replaceState({ vista: 'lista' }, '', window.location.pathname);
      window.history.pushState({ vista: 'detalle', catId: initialCat.id }, '', `#${initialCat.id}`);
      state.vista = 'detalle';
      state.catSeleccionada = initialCat;
    }
  }

  render();
})();
