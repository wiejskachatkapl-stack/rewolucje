(() => {
  const APP_VERSION = 'v1002';
  const STORAGE_KEY = 'kuchenne_rewolucje_points_v1';
  const PROXIMITY_RADIUS_KEY = 'kuchenne_rewolucje_proximity_radius_v1';
  const ALERT_HISTORY_KEY = 'kuchenne_rewolucje_alert_history_v1';
  const OSM_ENABLED_KEY = 'kuchenne_rewolucje_database_enabled_v1';
  const USER_DB_KEY = 'kuchenne_rewolucje_user_restaurant_db_v1';
  const ATTRACTION_DB_URL = 'https://raw.githubusercontent.com/zaza/kuchenne-rewolucje/refs/heads/gh-pages/data.geojson';
  const GEOCODE_CACHE_KEY = 'kuchenne_rewolucje_geocode_v1';
  const NOMINATIM_URL = 'https://nominatim.openstreetmap.org/search';
  const ROUTE_MODE_KEY = 'kuchenne_rewolucje_route_mode_v1';
  const ROUTE_MODES = {
    car: {
      label: 'AUTO', icon: '🚗',
      endpoint: 'https://routing.openstreetmap.de/routed-car/route/v1/driving',
      activity: 'jazda samochodem'
    },
    foot: {
      label: 'PIESZO', icon: '🚶',
      endpoint: 'https://routing.openstreetmap.de/routed-foot/route/v1/driving',
      activity: 'trasa piesza'
    },
    hiking: {
      label: 'GÓRY', icon: '🥾',
      endpoint: 'https://routing.openstreetmap.de/routed-foot/route/v1/driving',
      activity: 'trasa piesza / górska'
    },
    bike: {
      label: 'ROWER', icon: '🚲',
      endpoint: 'https://routing.openstreetmap.de/routed-bike/route/v1/driving',
      activity: 'trasa rowerowa'
    }
  };

  const CURRENT_SEASON_ITEMS = [
    {
        "id": "kr/s32/e1",
        "name": "Trattoria Oliwa Sprawiedliwa",
        "originalName": "La Trattoria Familia",
        "season": 32,
        "episode": 1,
        "address": "Kazimierza Wielkiego 2, 67-400 Wschowa, Polska",
        "sourceUrl": "https://tvn.pl/programy/kuchenne-rewolucje/odcinki"
    },
    {
        "id": "kr/s32/e2",
        "name": "Trattoria Matteo e Raffaello",
        "originalName": "Cherry Pepperoni",
        "season": 32,
        "episode": 2,
        "address": "Kościuszki 27, 57-550 Stronie Śląskie, Polska",
        "sourceUrl": "https://tvn.pl/programy/kuchenne-rewolucje/odcinki"
    },
    {
        "id": "kr/s32/e3",
        "name": "Bistro Koronkowa Kajzerka",
        "originalName": "Larysonki",
        "season": 32,
        "episode": 3,
        "address": "Gabrieli Zapolskiej 24, 30-126 Kraków, Polska",
        "sourceUrl": "https://tvn.pl/programy/kuchenne-rewolucje/odcinki"
    },
    {
        "id": "kr/s32/e4",
        "name": "Bistro Czy Kasze?",
        "originalName": "Bistro Chill",
        "season": 32,
        "episode": 4,
        "address": "Rudzka 62, 93-423 Łódź, Polska",
        "sourceUrl": "https://tvn.pl/programy/kuchenne-rewolucje/odcinki"
    },
    {
        "id": "kr/s32/e5",
        "name": "Kolorowy Kogucik",
        "originalName": "3 Smaki",
        "season": 32,
        "episode": 5,
        "address": "Kijanki 2, 30-693 Kraków, Polska",
        "sourceUrl": "https://tvn.pl/programy/kuchenne-rewolucje/odcinki"
    },
    {
        "id": "kr/s32/e6",
        "name": "Bistro Kiszka Gra",
        "originalName": "A'le Dobre",
        "season": 32,
        "episode": 6,
        "address": "Stefana Batorego 38, 41-506 Chorzów, Polska",
        "sourceUrl": "https://tvn.pl/programy/kuchenne-rewolucje/odcinki"
    },
    {
        "id": "kr/s32/e7",
        "name": "Ale Ziółko",
        "originalName": "Karczma Tymianek",
        "season": 32,
        "episode": 7,
        "address": "Bukowa 29, Koszalin, Polska",
        "sourceUrl": "https://tvn.pl/programy/kuchenne-rewolucje/odcinki"
    },
    {
        "id": "kr/s32/e8",
        "name": "Bistro Trzy Fartuchy",
        "originalName": "Bistro Brejk",
        "season": 32,
        "episode": 8,
        "address": "Marcelińska 96A/206, 60-324 Poznań, Polska",
        "sourceUrl": "https://tvn.pl/programy/kuchenne-rewolucje/odcinki"
    },
    {
        "id": "kr/s32/e9",
        "name": "Błękitny Królik",
        "originalName": "Króliczy Ogród",
        "season": 32,
        "episode": 9,
        "address": "Bieszczadzka 5, 38-481 Królik Polski, Polska",
        "sourceUrl": "https://tvn.pl/programy/kuchenne-rewolucje/odcinki"
    },
    {
        "id": "kr/s32/e10",
        "name": "Bistro Bar Tomek",
        "originalName": "Szagówka i Majeranek",
        "season": 32,
        "episode": 10,
        "address": "Grochowska 83/85, 60-336 Poznań, Polska",
        "sourceUrl": "https://tvn.pl/programy/kuchenne-rewolucje/odcinki"
    },
    {
        "id": "kr/s32/e11",
        "name": "Bistro Sztuka Dzika",
        "originalName": "HoNoTu",
        "season": 32,
        "episode": 11,
        "address": "Michała Pietkiewicza 4/lok. 1, 15-689 Białystok, Polska",
        "sourceUrl": "https://tvn.pl/programy/kuchenne-rewolucje/odcinki"
    },
    {
        "id": "kr/s32/e12",
        "name": "Czeska po Mojemu",
        "originalName": "Winiarnia u Czecha",
        "season": 32,
        "episode": 12,
        "address": "Sejmowa 4/4, 43-400 Cieszyn, Polska",
        "sourceUrl": "https://tvn.pl/programy/kuchenne-rewolucje/odcinki"
    }
];
  const FOLLOW_EDGE_MARGIN_PX = 92;
  const ROUTE_DISPLAY_RADIUS = 20000;
  const ALERT_COOLDOWN_MS = 12 * 60 * 60 * 1000;
  const NEARBY_FETCH_MIN_RADIUS = 12000;
  const NEARBY_REFRESH_DISTANCE = 2500;
  const NEARBY_REFRESH_TIME = 8 * 60 * 1000;
  // v1050: lekki indeks przestrzenny ogranicza liczbę punktów sprawdzanych przez telefon.
  const SPATIAL_CELL_DEGREES = 0.25;
  const PREVIEW_MIN_MOVE_METERS = 250;
  const PREVIEW_MIN_INTERVAL_MS = 30 * 1000;
  const ROUTE_SAMPLE_STEP_METERS = 450;
  const CLUSTER_MAX_ZOOM = 8;
  const CLUSTER_CELL_PX = 76;
  
  const RESTAURANT_STATUS_META = {
    active: {
      label: 'Aktywna',
      colorName: 'niebieska',
      fill: '#0b3f82',
      stroke: '#c7ddff',
      inner: '#f7fbff',
      utensil: '#0b3f82'
    },
    closed: {
      label: 'Już nie istnieje',
      colorName: 'czerwona',
      fill: '#b42318',
      stroke: '#fecaca',
      inner: '#fff5f5',
      utensil: '#8a1c16'
    },
    visited: {
      label: 'Odwiedziłem',
      colorName: 'zielona',
      fill: '#1f8f3a',
      stroke: '#c8f1d1',
      inner: '#f6fff7',
      utensil: '#176534'
    }
  };

  const RESTAURANT_STATUS_OVERRIDES = {
    'w małym domku': {
      status: 'closed',
      sourceLabel: 'TVN',
      sourceUrl: 'https://tvn.pl/programy/kuchenne-rewolucje/czy-restauracja-w-malym-domku-nowa-villa-ostrodzka-jeszcze-istnieje-st9151606'
    },
    'nowa villa ostródzka': {
      status: 'closed',
      sourceLabel: 'TVN',
      sourceUrl: 'https://tvn.pl/programy/kuchenne-rewolucje/czy-restauracja-w-malym-domku-nowa-villa-ostrodzka-jeszcze-istnieje-st9151606'
    },
    'bistro w kapuście': {
      status: 'closed',
      sourceLabel: 'TVN',
      sourceUrl: 'https://tvn.pl/programy/kuchenne-rewolucje/aktualnosci/kuchenne-rewolucje-w-plocku-co-sie-stalo-z-restauracja-bistro-w-kapuscie-u-mariusza-st8259912'
    },
    'absynt': {
      status: 'closed',
      sourceLabel: 'TVN',
      sourceUrl: 'https://tvn.pl/programy/kuchenne-rewolucje/aktualnosci/czy-restauracja-mauritiana-absynt-z-kuchennych-rewolucji-istnieje-nadal-to-kultowy-odcinek-st8506502'
    },
    'mauritiana': {
      status: 'closed',
      sourceLabel: 'TVN',
      sourceUrl: 'https://tvn.pl/programy/kuchenne-rewolucje/aktualnosci/czy-restauracja-mauritiana-absynt-z-kuchennych-rewolucji-istnieje-nadal-to-kultowy-odcinek-st8506502'
    },
    'bistro czy kapusty': {
      status: 'active',
      sourceLabel: 'TVN',
      sourceUrl: 'https://tvn.pl/programy/kuchenne-rewolucje/kuchenne-rewolucje-w-tarnowskich-gorach-czy-bistro-czy-kapusty-istnieje-nadal-st8288531'
    },
    'trattoria oliwa sprawiedliwa': {
      status: 'active',
      sourceLabel: 'TVN',
      sourceUrl: 'https://tvn.pl/programy/kuchenne-rewolucje/jak-radzi-sobie-restauracja-trattoria-oliwa-sprawiedliwa-z-32-sezonu-st9085199'
    },
    'bistro sztuka dzika': {
      status: 'active',
      sourceLabel: 'TVN',
      sourceUrl: 'https://tvn.pl/programy/kuchenne-rewolucje/jak-po-kuchennych-rewolucjach-radzi-sobie-bistro-sztuka-dzika-st9058974'
    },
    'przyjemnie podjadaj': {
      status: 'active',
      sourceLabel: 'TVN',
      sourceUrl: 'https://tvn.pl/programy/kuchenne-rewolucje/czy-przyjemnie-podjadaj-nadal-istnieje-st9112265'
    },
    'karczma u ceprów': {
      status: 'active',
      sourceLabel: 'TVN',
      sourceUrl: 'https://tvn.pl/programy/kuchenne-rewolucje/aktualnosci/czy-karczma-u-ceprow-z-kuchennych-rewolucji-istnieje-nadal-st8567279'
    }
  };

  function buildRestaurantMarkerIcon(statusKey) {
    const meta = RESTAURANT_STATUS_META[statusKey] || RESTAURANT_STATUS_META.active;
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
        <path fill="${meta.fill}" stroke="${meta.stroke}" stroke-width="3" d="M32 3C19.3 3 9 13.3 9 26c0 17.3 23 35 23 35s23-17.7 23-35C55 13.3 44.7 3 32 3z"/>
        <circle cx="32" cy="26" r="15" fill="${meta.inner}"/>
        <path d="M24 15v21M20 15v9c0 4 8 4 8 0v-9M42 15v21M38 15c0 7 8 7 8 0" fill="none" stroke="${meta.utensil}" stroke-width="3" stroke-linecap="round"/>
      </svg>`;
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  }

  const RESTAURANT_MARKER_ICONS = {
    active: buildRestaurantMarkerIcon('active'),
    closed: buildRestaurantMarkerIcon('closed'),
    visited: buildRestaurantMarkerIcon('visited')
  };

  const RESTAURANT_MARKER_ICON = RESTAURANT_MARKER_ICONS.active;

  const CATEGORY_INFO = {
    revolution: { label: 'Kuchenne Rewolucje', icon: RESTAURANT_MARKER_ICON }
  };

  const startScreen = document.querySelector('.start-screen');
  const addButton = document.getElementById('addButton');
  const mapButton = document.getElementById('mapButton');
  const myPlacesButton = document.getElementById('myPlacesButton');
  const versionElement = document.getElementById('appVersion');

  const addScreen = document.getElementById('addScreen');
  const addBackButton = document.getElementById('addBackButton');
  const placeName = document.getElementById('placeName');
  const manualMethodButton = document.getElementById('manualMethodButton');
  const autoMethodButton = document.getElementById('autoMethodButton');
  const coordinatesBox = document.getElementById('coordinatesBox');
  const autoLocationBox = document.getElementById('autoLocationBox');
  const latitudeInput = document.getElementById('latitudeInput');
  const longitudeInput = document.getElementById('longitudeInput');
  const gpsAddButton = document.getElementById('gpsAddButton');
  const gpsResult = document.getElementById('gpsResult');
  const categoryGrid = document.getElementById('categoryGrid');
  const dateInput = document.getElementById('dateInput');
  const addMessage = document.getElementById('addMessage');
  const savePlaceButton = document.getElementById('savePlaceButton');

  const editScreen = document.getElementById('editScreen');
  const editBackButton = document.getElementById('editBackButton');
  const editPlaceName = document.getElementById('editPlaceName');
  const editLatitudeInput = document.getElementById('editLatitudeInput');
  const editLongitudeInput = document.getElementById('editLongitudeInput');
  const editCategoryGrid = document.getElementById('editCategoryGrid');
  const editDateInput = document.getElementById('editDateInput');
  const editNoteInput = document.getElementById('editNoteInput');
  const editMessage = document.getElementById('editMessage');
  const saveEditButton = document.getElementById('saveEditButton');
  const deletePlaceButton = document.getElementById('deletePlaceButton');

  const mapScreen = document.getElementById('mapScreen');
  const mapTopPanel = document.getElementById('mapTopPanel');
  const mapBackButton = document.getElementById('mapBackButton');
  const mapLocationButton = document.getElementById('mapLocationButton');
  const locationMessage = document.getElementById('locationMessage');
  const proximityButton = document.getElementById('proximityButton');
  const proximityRadius = document.getElementById('proximityRadius');
  const proximityRadiusWrap = document.getElementById('proximityRadiusWrap');
  const osmRefreshButton = document.getElementById('osmRefreshButton');
  const osmButtonState = document.getElementById('osmButtonState');
  const routeButton = document.getElementById('routeButton');
  const routePanel = document.getElementById('routePanel');
  const routePanelClose = document.getElementById('routePanelClose');
  const routeDestinationInput = document.getElementById('routeDestinationInput');
  const routeSearchButton = document.getElementById('routeSearchButton');
  const routeResults = document.getElementById('routeResults');
  const routeInfo = document.getElementById('routeInfo');
  const routeClearButton = document.getElementById('routeClearButton');
  const routeModeButtons = [...document.querySelectorAll('[data-route-mode]')];
  const routeModeOverlay = document.getElementById('routeModeOverlay');
  const routeModeClose = document.getElementById('routeModeClose');
  const routeModeDestinationName = document.getElementById('routeModeDestinationName');
  const routeSource = document.getElementById('routeSource');
  const osmStatus = document.getElementById('osmStatus');
  const mapModeBadge = document.getElementById('mapModeBadge');
  const myPlacesTransfer = document.getElementById('myPlacesTransfer');
  const exportMyPlacesButton = document.getElementById('exportMyPlacesButton');
  const importMyPlacesButton = document.getElementById('importMyPlacesButton');
  const importMyPlacesInput = document.getElementById('importMyPlacesInput');
  const mapLegend = document.getElementById('mapLegend');
  const attractionPreviewButton = document.getElementById('attractionPreviewButton');
  const attractionPreviewCount = document.getElementById('attractionPreviewCount');
  const attractionPreviewOverlay = document.getElementById('attractionPreviewOverlay');
  const attractionPreviewClose = document.getElementById('attractionPreviewClose');
  const attractionPreviewSummary = document.getElementById('attractionPreviewSummary');
  const attractionPreviewList = document.getElementById('attractionPreviewList');

  const navigationPanel = document.getElementById('navigationPanel');
  const navigationKicker = document.getElementById('navigationKicker');
  const navigationArrow = document.getElementById('navigationArrow');
  const navigationInstruction = document.getElementById('navigationInstruction');
  const navigationRoad = document.getElementById('navigationRoad');
  const navigationTurnDistance = document.getElementById('navigationTurnDistance');
  const navigationRemainingDistance = document.getElementById('navigationRemainingDistance');
  const navigationRemainingTime = document.getElementById('navigationRemainingTime');
  const navigationVoiceButton = document.getElementById('navigationVoiceButton');
  const navigationStopButton = document.getElementById('navigationStopButton');
  const navigationDestination = document.getElementById('navigationDestination');
  const navigationMode = document.getElementById('navigationMode');
  const mapManeuverOverlay = document.getElementById('mapManeuverOverlay');
  const mapManeuverArrow = document.getElementById('mapManeuverArrow');
  const mapManeuverDistance = document.getElementById('mapManeuverDistance');
  const mapLanes = document.getElementById('mapLanes');

  const nearbyAlert = document.getElementById('nearbyAlert');
  const nearbyAlertIcon = document.getElementById('nearbyAlertIcon');
  const nearbyAlertTitle = document.getElementById('nearbyAlertTitle');
  const nearbyAlertMeta = document.getElementById('nearbyAlertMeta');
  const nearbyAlertShow = document.getElementById('nearbyAlertShow');
  const nearbyAlertAdd = document.getElementById('nearbyAlertAdd');
  const nearbyAlertDismiss = document.getElementById('nearbyAlertDismiss');

  let map = null;
  let userLocationMarker = null;
  let userAccuracyCircle = null;
  let locationMessageTimer = null;
  let addMessageTimer = null;
  let editMessageTimer = null;
  let currentMethod = 'manual';
  let currentCategory = 'revolution';
  let editCategory = 'revolution';
  let autoCoords = null;
  let pointLayer = null;
  let pointMarkerById = new Map();
  let editingPointId = null;
  let currentMapMode = 'all';
  let editReturnMapMode = 'all';
  // v1030: legenda pozwala zaznaczyć kilka kategorii jednocześnie.
  const CATEGORY_KEYS = Object.keys(CATEGORY_INFO);
  let activeAttractionFilters = new Set(CATEGORY_KEYS);

  // v1031: aktywny podgląd wszystkich restauracji w ustawionym promieniu od GPS.
  let attractionPreviewItems = [];
  let attractionPreviewUpdateSequence = 0;

  let externalLayer = null;
  let osmAttractions = new Map();
  let viewportAttractions = [];
  let osmMarkerById = new Map();
  let viewportFetchTimer = null;
  let viewportFetchSequence = 0;
  let viewportRetryUsed = false;
  const viewportCache = new Map();
  let osmEnabled = true;
  let attractionDatabase = [];
  let attractionDatabaseLoaded = false;
  let attractionDatabasePromise = null;
  let attractionSpatialIndex = new Map();
  let lastPreviewPosition = null;
  let lastPreviewUpdateAt = 0;
  const externalIconCache = new Map();

  let proximityWatchId = null;
  let proximityActive = false;
  let nearbyAttractions = [];
  let nearbyFetchInFlight = false;
  let lastMonitorPosition = null;
  let lastNearbyFetchPosition = null;
  let lastNearbyFetchAt = 0;
  let currentNearbyAlertId = null;
  let nearbyAlertTimer = null;

  // v1035: WYCENTRUJ włącza śledzenie widoku. Ręczne przesunięcie mapy je wyłącza,
  // ale ręczna zmiana zoomu NIE wyłącza śledzenia. Dzięki temu użytkownik może
  // oddalić mapę, a pozycja wróci do środka dopiero przy dojściu do krawędzi.
  let mapAutoFollowEnabled = false;
  let mapProgrammaticMove = false;
  let mapAutoRecenterInProgress = false;

  let routeLayer = null;
  let routeDestinationMarker = null;
  let routeActive = false;
  let routeDestination = null;
  let routeAttractions = [];
  let routeCoordinates = [];
  let routeSearchSequence = 0;
  let routeAlertedIds = new Set();
  // v1040: tryb wybierany po wskazaniu celu; aktywna nawigacja zachowuje profil przy przeliczaniu.
  let routeTravelMode = 'car';
  let activeRouteMode = 'car';
  // v1040: cel oczekuje na wybór trybu dopiero po kliknięciu PROWADŹ / wskazaniu celu.
  let pendingRouteDestination = null;

  // v1040: nawigacja zintegrowana z panelem mapy + profile AUTO / PIESZO / GÓRY / ROWER.
  let navigationActive = false;
  let navigationVoiceEnabled = true;
  let navigationSteps = [];
  let navigationRouteCumulative = [];
  let navigationRouteDistance = 0;
  let navigationRouteDuration = 0;
  let navigationLastRouteIndex = 0;
  let navigationLastStepIndex = -1;
  let navigationLastVoiceBucket = '';
  let navigationLastSpokenKey = '';
  let navigationRerouteInFlight = false;
  let navigationLastRerouteAt = 0;
  let navigationArrived = false;

  if (versionElement) versionElement.textContent = APP_VERSION;
  updateOsmButtonUi();
  migrateSavedPointsIntoUserDatabase();

  function localDateString(date = new Date()) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  function formatDisplayDate(value) {
    if (!value) return '';
    const parts = value.split('-');
    if (parts.length !== 3) return value;
    return `${parts[2]}.${parts[1]}.${parts[0]}`;
  }

  function escapeHtml(value) {
    return String(value ?? '')
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }

  function noteHtml(value) {
    return escapeHtml(value || '').replaceAll('\n', '<br>');
  }

  function loadPoints() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.warn('Nie udało się odczytać zapisanych punktów:', error);
      return [];
    }
  }

  function savePoints(points) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(points));
  }

  function normalizeImportedPoint(raw, fallbackIndex = 0) {
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null;
    const lat = Number(raw.lat);
    const lon = Number(raw.lon);
    if (!Number.isFinite(lat) || lat < -90 || lat > 90 || !Number.isFinite(lon) || lon < -180 || lon > 180) return null;

    const category = CATEGORY_INFO[raw.category] ? raw.category : 'revolution';
    const sourceId = String(raw.id || '').trim();
    const id = sourceId || `import-${Date.now()}-${fallbackIndex}-${Math.random().toString(16).slice(2)}`;
    const osmId = String(raw.osmId || '').trim();
    const name = String(raw.name || CATEGORY_INFO[category].label).trim().slice(0, 100) || CATEGORY_INFO[category].label;
    const note = String(raw.note || '').slice(0, 2000);
    const date = /^\d{4}-\d{2}-\d{2}$/.test(String(raw.date || '')) ? String(raw.date) : localDateString();
    const createdAt = String(raw.createdAt || '').trim() || new Date().toISOString();
    const updatedAt = String(raw.updatedAt || '').trim() || createdAt;

    return {
      id,
      ...(osmId ? { osmId } : {}),
      name,
      category,
      date,
      note,
      lat,
      lon,
      source: String(raw.source || 'import').slice(0, 40),
      createdAt,
      updatedAt
    };
  }

  function backupPointKey(point) {
    if (point?.osmId) return `osm:${String(point.osmId)}`;
    if (point?.id) return `id:${String(point.id)}`;
    return `geo:${Number(point?.lat).toFixed(6)}:${Number(point?.lon).toFixed(6)}:${String(point?.name || '').trim().toLowerCase()}`;
  }

  function pointTimestamp(point) {
    const value = Date.parse(String(point?.updatedAt || point?.createdAt || ''));
    return Number.isFinite(value) ? value : 0;
  }

  function exportMyPlaces() {
    const places = loadPoints();
    if (!places.length) {
      showLocationMessage('Nie masz jeszcze miejsc do zapisania.');
      return;
    }

    const payload = {
      format: 'kuchenne-rewolucje-visited-restaurants',
      formatVersion: 1,
      appVersion: APP_VERSION,
      exportedAt: new Date().toISOString(),
      count: places.length,
      places
    };
    const json = JSON.stringify(payload, null, 2);
    const filename = `kuchenne rewolucje ${localDateString(new Date())}.json`;

    try {
      // Najbardziej przewidywalna metoda dla PWA na Androidzie/PC:
      // zwykłe pobranie pliku do folderu Pobrane/Downloads.
      const blob = new Blob([json], { type: 'application/json;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.rel = 'noopener';
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 10000);
      showLocationMessage(`Zapisano ${places.length} miejsc. Plik: ${filename}`);
    } catch (error) {
      console.error('Nie udało się zapisać kopii miejsc:', error);
      showLocationMessage('Nie udało się rozpocząć zapisu pliku. Spróbuj ponownie.');
    }
  }

  function readBackupFileText(file) {
    if (file && typeof file.text === 'function') return file.text();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result || ''));
      reader.onerror = () => reject(reader.error || new Error('Nie udało się odczytać pliku'));
      reader.readAsText(file, 'utf-8');
    });
  }

  async function importMyPlacesFile(file) {
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      showLocationMessage('Wybrany plik jest zbyt duży.');
      return;
    }

    if (importMyPlacesButton) importMyPlacesButton.disabled = true;
    try {
      const text = await readBackupFileText(file);
      const parsed = JSON.parse(text);
      if (!Array.isArray(parsed) && parsed?.format && parsed.format !== 'kuchenne-rewolucje-visited-restaurants') {
        throw new Error('To nie jest plik kopii Moich miejsc');
      }
      const rawPlaces = Array.isArray(parsed) ? parsed : parsed?.places;
      if (!Array.isArray(rawPlaces)) throw new Error('Nieprawidłowy format kopii');

      const imported = rawPlaces
        .map((point, index) => normalizeImportedPoint(point, index))
        .filter(Boolean);
      if (!imported.length) throw new Error('Brak poprawnych miejsc w pliku');

      const existing = loadPoints().map((point, index) => normalizeImportedPoint(point, index)).filter(Boolean);
      const merged = new Map();
      existing.forEach((point) => merged.set(backupPointKey(point), point));

      let added = 0;
      let updated = 0;
      let skipped = 0;
      imported.forEach((point) => {
        const key = backupPointKey(point);
        const current = merged.get(key);
        if (!current) {
          merged.set(key, point);
          added += 1;
          return;
        }
        if (pointTimestamp(point) > pointTimestamp(current)) {
          merged.set(key, { ...current, ...point, id: current.id || point.id });
          updated += 1;
        } else {
          skipped += 1;
        }
      });

      const result = [...merged.values()];
      savePoints(result);
      migrateSavedPointsIntoUserDatabase();
      if (attractionDatabaseLoaded) rebuildAttractionDatabase();
      renderStoredPoints();

      if (mapModeBadge) mapModeBadge.textContent = `ODWIEDZONE · ${result.length}`;
      if (currentMapMode === 'mine' && map && result.length) {
        const coords = result
          .filter((point) => Number.isFinite(Number(point.lat)) && Number.isFinite(Number(point.lon)))
          .map((point) => [Number(point.lat), Number(point.lon)]);
        if (coords.length === 1) map.setView(coords[0], 15, { animate: true });
        else if (coords.length > 1) map.fitBounds(coords, { padding: [28, 28], maxZoom: 13 });
      }

      showLocationMessage(`Wczytano kopię: dodano ${added}, zaktualizowano ${updated}, bez zmian ${skipped}. Razem: ${result.length}.`);
    } catch (error) {
      console.error('Nie udało się wczytać kopii miejsc:', error);
      showLocationMessage('Nie udało się wczytać tego pliku. Wybierz plik kuchenne rewolucje YYYY-MM-DD.json zapisany przez aplikację.');
    } finally {
      if (importMyPlacesInput) importMyPlacesInput.value = '';
      if (importMyPlacesButton) importMyPlacesButton.disabled = false;
    }
  }

  function findPoint(id) {
    return loadPoints().find((point) => String(point.id) === String(id)) || null;
  }


  function normalizeRestaurantKey(value) {
    return String(value || '')
      .trim()
      .toLocaleLowerCase('pl-PL')
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '');
  }

  function getRestaurantStatusOverride(target) {
    const keys = [
      target?.name,
      target?.tags?.originalName,
      target?.originalName,
      target?.note
    ]
      .map((value) => normalizeRestaurantKey(value))
      .filter(Boolean);

    for (const key of keys) {
      if (RESTAURANT_STATUS_OVERRIDES[key]) return RESTAURANT_STATUS_OVERRIDES[key];
    }
    return null;
  }

  function getRestaurantStatus(target, options = {}) {
    const saved = options.savedOverride == null
      ? Boolean(target?.osmId) && isOsmSaved(target.osmId)
      : Boolean(options.savedOverride);

    if (saved) {
      return {
        code: 'visited',
        label: RESTAURANT_STATUS_META.visited.label,
        colorName: RESTAURANT_STATUS_META.visited.colorName,
        sourceLabel: 'Moje odwiedzone',
        sourceUrl: ''
      };
    }

    const override = getRestaurantStatusOverride(target);
    if (override && RESTAURANT_STATUS_META[override.status]) {
      const meta = RESTAURANT_STATUS_META[override.status];
      return {
        code: override.status,
        label: meta.label,
        colorName: meta.colorName,
        sourceLabel: override.sourceLabel || 'Zweryfikowano',
        sourceUrl: override.sourceUrl || ''
      };
    }

    return {
      code: 'active',
      label: RESTAURANT_STATUS_META.active.label,
      colorName: RESTAURANT_STATUS_META.active.colorName,
      sourceLabel: 'Brak sygnału o zamknięciu',
      sourceUrl: ''
    };
  }

  function createRestaurantLeafletIcon(statusCode, variant = 'external') {
    const code = RESTAURANT_MARKER_ICONS[statusCode] ? statusCode : 'active';
    const cacheKey = `${variant}:${code}`;
    if (externalIconCache.has(cacheKey)) return externalIconCache.get(cacheKey);
    const large = variant === 'stored';
    const size = large ? 54 : 40;
    const icon = L.icon({
      iconUrl: RESTAURANT_MARKER_ICONS[code],
      iconSize: [size, size],
      iconAnchor: large ? [27, 51] : [20, 38],
      popupAnchor: large ? [0, -47] : [0, -34],
      tooltipAnchor: large ? [0, -44] : [0, -31],
      className: `tourism-marker-icon ${large ? 'saved-marker-icon' : 'osm-marker-icon'}`
    });
    externalIconCache.set(cacheKey, icon);
    return icon;
  }

  function getStatusBadgeHtml(statusInfo, extraClass = '') {
    if (!statusInfo) return '';
    return `<div class="status-badge status-${escapeHtml(statusInfo.code)} ${extraClass}">${escapeHtml(statusInfo.colorName.toUpperCase())} · ${escapeHtml(statusInfo.label)}</div>`;
  }

  function createCategoryIcon(category, point = null) {
    const key = CATEGORY_INFO[category] ? category : 'revolution';
    if (key === 'revolution') {
      const status = getRestaurantStatus(point || {}, { savedOverride: Boolean(point?.osmId) }).code;
      return createRestaurantLeafletIcon(status, 'stored');
    }
    const info = CATEGORY_INFO[key];
    return L.icon({
      iconUrl: info.icon,
      iconSize: [54, 54],
      iconAnchor: [27, 51],
      popupAnchor: [0, -47],
      tooltipAnchor: [0, -44],
      className: 'tourism-marker-icon'
    });
  }


  function createExternalCategoryIcon(attraction) {
    const key = CATEGORY_INFO[attraction?.category] ? attraction.category : 'revolution';
    if (key === 'revolution') {
      const status = getRestaurantStatus(attraction, { savedOverride: false }).code;
      return createRestaurantLeafletIcon(status, 'external');
    }
    const info = CATEGORY_INFO[key];
    return L.icon({
      iconUrl: info.icon,
      iconSize: [40, 40],
      iconAnchor: [20, 38],
      popupAnchor: [0, -34],
      tooltipAnchor: [0, -31],
      className: 'tourism-marker-icon osm-marker-icon'
    });
  }

  function loadAlertHistory() {
    try {
      const parsed = JSON.parse(localStorage.getItem(ALERT_HISTORY_KEY) || '{}');
      return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {};
    } catch {
      return {};
    }
  }

  function saveAlertHistory(history) {
    try {
      localStorage.setItem(ALERT_HISTORY_KEY, JSON.stringify(history));
    } catch (error) {
      console.warn('Nie udało się zapisać historii alertów:', error);
    }
  }

  function markAttractionAlerted(osmId) {
    if (!osmId) return;
    const history = loadAlertHistory();
    history[String(osmId)] = Date.now();

    const oldestAllowed = Date.now() - (7 * 24 * 60 * 60 * 1000);
    Object.keys(history).forEach((key) => {
      if (Number(history[key]) < oldestAllowed) delete history[key];
    });

    saveAlertHistory(history);
  }

  function wasAttractionAlertedRecently(osmId) {
    const history = loadAlertHistory();
    const timestamp = Number(history[String(osmId)] || 0);
    return timestamp > 0 && (Date.now() - timestamp) < ALERT_COOLDOWN_MS;
  }

  function isOsmSaved(osmId) {
    if (!osmId) return false;
    return loadPoints().some((point) => String(point.osmId || '') === String(osmId));
  }

  function getProximityRadiusMeters() {
    const selected = Number(proximityRadius?.value || localStorage.getItem(PROXIMITY_RADIUS_KEY) || 5000);
    return [5000, 10000, 15000, 20000].includes(selected) ? selected : 5000;
  }

  function formatDistance(meters) {
    if (!Number.isFinite(meters)) return '';
    if (meters < 1000) return `${Math.max(1, Math.round(meters))} m`;
    return `${(meters / 1000).toFixed(meters < 10000 ? 1 : 0)} km`;
  }

  function distanceMeters(lat1, lon1, lat2, lon2) {
    const toRad = (value) => value * Math.PI / 180;
    const earthRadius = 6371000;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    return 2 * earthRadius * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  function loadOsmEnabled() {
    return true;
  }

  function saveOsmEnabled() {
    try {
      localStorage.setItem(OSM_ENABLED_KEY, '1');
    } catch (_) {}
  }

  function updateOsmButtonUi() {
    if (!osmRefreshButton) return;
    osmRefreshButton.classList.toggle('is-active', osmEnabled);
    osmRefreshButton.setAttribute('aria-pressed', String(osmEnabled));
    osmRefreshButton.setAttribute('aria-label', osmEnabled ? 'Baza restauracji włączona' : 'Baza restauracji wyłączona');
    osmRefreshButton.title = osmEnabled ? 'Baza restauracji: włączona' : 'Baza restauracji: wyłączona';
    if (osmButtonState) osmButtonState.textContent = osmEnabled ? 'ON' : 'OFF';
  }

  function clearOsmAttractions() {
    clearTimeout(viewportFetchTimer);
    viewportFetchSequence += 1;
    viewportAttractions = [];
    nearbyAttractions = [];
    osmAttractions = new Map();
    externalLayer?.clearLayers();
    osmMarkerById = new Map();
    hideNearbyAlert();
  }

  function setOsmEnabled(enabled, { fetchNow = true } = {}) {
    // v1038: baza restauracji jest zawsze aktywna — nie ma już przełącznika BAZA ON/OFF.
    osmEnabled = true;
    saveOsmEnabled();
    updateOsmButtonUi();
    updateOsmStatus('Baza restauracji: włączona');
    if (lastMonitorPosition?.coords) updateAttractionPreview(lastMonitorPosition);
    if (fetchNow && currentMapMode === 'all' && !mapScreen?.hidden) {
      refreshOsmManually();
    }
  }

  function updateOsmStatus(text, isError = false) {
    if (!osmStatus) return;
    osmStatus.textContent = text;
    osmStatus.classList.toggle('is-error', isError);
    // v1031: bieżący licznik restauracji jest w górnym przycisku „Restauracje w pobliżu”.
    // Dolny status zostawiamy wyłącznie dla rzeczywistych błędów.
    osmStatus.hidden = !text || !isError;
  }

  function loadUserAttractionDb() {
    try {
      const parsed = JSON.parse(localStorage.getItem(USER_DB_KEY) || '[]');
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.warn('Nie udało się odczytać lokalnego rozszerzenia bazy restauracji:', error);
      return [];
    }
  }

  function saveUserAttractionDb(items) {
    try {
      localStorage.setItem(USER_DB_KEY, JSON.stringify(items));
    } catch (error) {
      console.warn('Nie udało się zapisać lokalnego rozszerzenia bazy restauracji:', error);
    }
  }

  function normalizeDatabaseAttraction(item) {
    if (!item) return null;
    const id = String(item.id || item.osmId || '').trim();
    const lat = Number(item.lat);
    const lon = Number(item.lon);
    const category = CATEGORY_INFO[item.category] ? item.category : null;
    if (!id || !category || !Number.isFinite(lat) || !Number.isFinite(lon)) return null;

    return {
      osmId: id,
      category,
      name: String(item.name || CATEGORY_INFO[category].label),
      lat,
      lon,
      tags: item.tags && typeof item.tags === 'object' ? item.tags : {},
      source: item.source || 'Baza Kuchennych Rewolucji',
      sourceUrl: item.sourceUrl || '',
      userAdded: Boolean(item.userAdded)
    };
  }

  function geoJsonToRestaurant(feature, index) {
    if (!feature || feature?.geometry?.type !== 'Point' || !Array.isArray(feature.geometry.coordinates)) return null;
    const props = feature.properties || {};
    const lon = Number(feature.geometry.coordinates[0]);
    const lat = Number(feature.geometry.coordinates[1]);
    if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;
    const season = Number(props.season);
    const episode = Number(props.episode);
    const id = `kr/s${Number.isFinite(season) ? season : 'x'}/e${Number.isFinite(episode) ? episode : index + 1}/${index}`;
    return {
      id,
      category: 'revolution',
      name: String(props.name || 'Restauracja po Kuchennych Rewolucjach'),
      lat,
      lon,
      tags: {
        season: Number.isFinite(season) ? season : null,
        episode: Number.isFinite(episode) ? episode : null,
        homepage: props.homepage || '',
        originalIcon: props.icon || ''
      },
      source: 'Kuchenne Rewolucje – baza społecznościowa',
      sourceUrl: String(props.url || props.homepage || '')
    };
  }

  function loadGeocodeCache() {
    try {
      const parsed = JSON.parse(localStorage.getItem(GEOCODE_CACHE_KEY) || '{}');
      return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {};
    } catch {
      return {};
    }
  }

  function saveGeocodeCache(cache) {
    try { localStorage.setItem(GEOCODE_CACHE_KEY, JSON.stringify(cache)); } catch {}
  }

  function currentSeasonToRestaurant(item, coords) {
    if (!item || !coords) return null;
    return {
      id: item.id,
      category: 'revolution',
      name: item.name,
      lat: Number(coords.lat),
      lon: Number(coords.lon),
      tags: {
        season: item.season,
        episode: item.episode,
        originalName: item.originalName,
        address: item.address,
        currentSeason: true
      },
      source: 'TVN – sezon 32',
      sourceUrl: item.sourceUrl || ''
    };
  }

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  let currentSeasonHydrationPromise = null;

  async function hydrateCurrentSeasonRestaurants() {
    if (currentSeasonHydrationPromise) return currentSeasonHydrationPromise;
    currentSeasonHydrationPromise = (async () => {
      const cache = loadGeocodeCache();
      let added = 0;
      for (let index = 0; index < CURRENT_SEASON_ITEMS.length; index += 1) {
        const item = CURRENT_SEASON_ITEMS[index];
        let coords = cache[item.address];
        let requested = false;
        if (!coords || !Number.isFinite(Number(coords.lat)) || !Number.isFinite(Number(coords.lon))) {
          try {
            requested = true;
            const url = `${NOMINATIM_URL}?format=jsonv2&limit=1&countrycodes=pl&accept-language=pl&q=${encodeURIComponent(item.address)}`;
            const response = await fetch(url, { headers: { Accept: 'application/json' } });
            if (!response.ok) throw new Error(`Nominatim HTTP ${response.status}`);
            const results = await response.json();
            const first = Array.isArray(results) ? results[0] : null;
            if (first && Number.isFinite(Number(first.lat)) && Number.isFinite(Number(first.lon))) {
              coords = { lat: Number(first.lat), lon: Number(first.lon) };
              cache[item.address] = coords;
              saveGeocodeCache(cache);
            }
          } catch (error) {
            console.warn(`Nie udało się ustalić lokalizacji sezonu 32, odc. ${item.episode}:`, error);
          }
        }

        const restaurant = currentSeasonToRestaurant(item, coords);
        if (restaurant && !attractionDatabase.some((entry) => String(entry.osmId) === String(restaurant.id))) {
          rebuildAttractionDatabase([...attractionDatabase.filter((entry) => !entry.userAdded), restaurant]);
          added += 1;
        }
        // Publiczny Nominatim: nie wysyłamy serii zapytań szybciej niż około 1/s.
        if (requested && index < CURRENT_SEASON_ITEMS.length - 1) await sleep(1050);
      }
      if (added && currentMapMode === 'all' && map && !mapScreen?.hidden) {
        try { await loadViewportAttractions(); } catch {}
      }
      return added;
    })();
    try { return await currentSeasonHydrationPromise; }
    finally { currentSeasonHydrationPromise = null; }
  }

  function spatialCellKey(lat, lon) {
    return `${Math.floor(Number(lat) / SPATIAL_CELL_DEGREES)}:${Math.floor(Number(lon) / SPATIAL_CELL_DEGREES)}`;
  }

  function rebuildAttractionSpatialIndex() {
    attractionSpatialIndex = new Map();
    attractionDatabase.forEach((item) => {
      const key = spatialCellKey(item.lat, item.lon);
      if (!attractionSpatialIndex.has(key)) attractionSpatialIndex.set(key, []);
      attractionSpatialIndex.get(key).push(item);
    });
  }

  function getIndexedAttractionsForBox(south, west, north, east) {
    if (!attractionSpatialIndex.size) return attractionDatabase;
    const minLatCell = Math.floor(Number(south) / SPATIAL_CELL_DEGREES);
    const maxLatCell = Math.floor(Number(north) / SPATIAL_CELL_DEGREES);
    const minLonCell = Math.floor(Number(west) / SPATIAL_CELL_DEGREES);
    const maxLonCell = Math.floor(Number(east) / SPATIAL_CELL_DEGREES);
    const result = [];
    for (let latCell = minLatCell; latCell <= maxLatCell; latCell += 1) {
      for (let lonCell = minLonCell; lonCell <= maxLonCell; lonCell += 1) {
        const items = attractionSpatialIndex.get(`${latCell}:${lonCell}`);
        if (items?.length) result.push(...items);
      }
    }
    return result;
  }

  function getSavedOsmIdSet() {
    return new Set(loadPoints().map((point) => String(point.osmId || '')).filter(Boolean));
  }

  function rebuildAttractionDatabase(baseItems = null) {
    const merged = new Map();
    const base = Array.isArray(baseItems) ? baseItems : attractionDatabase.filter((item) => !item.userAdded);

    base.forEach((item) => {
      const normalized = normalizeDatabaseAttraction(item);
      if (normalized) merged.set(normalized.osmId, normalized);
    });

    loadUserAttractionDb().forEach((item) => {
      const normalized = normalizeDatabaseAttraction({ ...item, userAdded: true });
      if (normalized) merged.set(normalized.osmId, normalized);
    });

    attractionDatabase = [...merged.values()];
    attractionDatabaseLoaded = true;
    rebuildAttractionSpatialIndex();
    return attractionDatabase;
  }

  async function ensureAttractionDatabase(force = false) {
    if (attractionDatabaseLoaded && !force) {
      void hydrateCurrentSeasonRestaurants();
      return attractionDatabase;
    }
    if (attractionDatabasePromise && !force) return attractionDatabasePromise;

    attractionDatabasePromise = (async () => {
      let baseItems = [];
      try {
        const response = await fetch(ATTRACTION_DB_URL, { cache: force ? 'reload' : 'default', headers: { Accept: 'application/json' } });
        if (!response.ok) throw new Error(`Baza HTTP ${response.status}`);
        const data = await response.json();
        if (data?.type === 'FeatureCollection' && Array.isArray(data.features)) {
          baseItems = data.features.map(geoJsonToRestaurant).filter(Boolean);
        } else {
          baseItems = Array.isArray(data) ? data : (Array.isArray(data?.attractions) ? data.attractions : []);
        }
      } catch (error) {
        console.warn('Nie udało się wczytać bazy Kuchennych Rewolucji:', error);
        // Jeśli baza była już wcześniej wczytana, zachowaj ją.
        baseItems = attractionDatabase.filter((item) => !item.userAdded);
      }

      const rebuilt = rebuildAttractionDatabase(baseItems);
      void hydrateCurrentSeasonRestaurants();
      return rebuilt;
    })();

    try {
      return await attractionDatabasePromise;
    } finally {
      attractionDatabasePromise = null;
    }
  }

  function upsertUserAttractionFromPoint(point) {
    if (!point) return;
    const attractionId = String(point.osmId || `user/${point.id}`);
    point.osmId = attractionId;

    const items = loadUserAttractionDb();
    const index = items.findIndex((item) => String(item.id) === attractionId);
    const dbItem = {
      id: attractionId,
      name: point.name || CATEGORY_INFO[point.category]?.label || 'Restauracja',
      category: point.category,
      lat: Number(point.lat),
      lon: Number(point.lon),
      source: 'Dodane przez użytkownika',
      userAdded: true,
      updatedAt: new Date().toISOString()
    };

    if (index >= 0) items[index] = { ...items[index], ...dbItem };
    else items.push({ ...dbItem, createdAt: point.createdAt || new Date().toISOString() });
    saveUserAttractionDb(items);

    if (attractionDatabaseLoaded) rebuildAttractionDatabase();
  }

  function removeUserAttractionForPoint(point) {
    const id = String(point?.osmId || '');
    if (!id) return;
    const current = loadUserAttractionDb();
    if (!current.some((item) => String(item.id) === id)) return;
    saveUserAttractionDb(current.filter((item) => String(item.id) !== id));
    if (attractionDatabaseLoaded) rebuildAttractionDatabase();
  }

  function migrateSavedPointsIntoUserDatabase() {
    const points = loadPoints();
    let pointsChanged = false;
    let userItems = loadUserAttractionDb();
    const byId = new Map(userItems.map((item) => [String(item.id), item]));

    points.forEach((point) => {
      // Obiekty z nowej bazy statycznej już są w pliku JSON i nie trzeba ich dublować.
      if (String(point.osmId || '').startsWith('base/')) return;
      if (!point.osmId) {
        point.osmId = `user/${point.id}`;
        pointsChanged = true;
      }
      const id = String(point.osmId);
      byId.set(id, {
        ...(byId.get(id) || {}),
        id,
        name: point.name || CATEGORY_INFO[point.category]?.label || 'Restauracja',
        category: point.category,
        lat: Number(point.lat),
        lon: Number(point.lon),
        source: 'Dodane przez użytkownika',
        userAdded: true,
        createdAt: point.createdAt || new Date().toISOString(),
        updatedAt: point.updatedAt || new Date().toISOString()
      });
    });

    userItems = [...byId.values()].filter((item) => CATEGORY_INFO[item.category] && Number.isFinite(Number(item.lat)) && Number.isFinite(Number(item.lon)));
    saveUserAttractionDb(userItems);
    if (pointsChanged) savePoints(points);
  }

  async function getDatabaseAttractions() {
    await ensureAttractionDatabase();
    return attractionDatabase;
  }

  async function getAttractionsInBounds(bounds) {
    await getDatabaseAttractions();
    if (!bounds) return attractionDatabase;
    const south = bounds.getSouth();
    const west = bounds.getWest();
    const north = bounds.getNorth();
    const east = bounds.getEast();
    return getIndexedAttractionsForBox(south, west, north, east)
      .filter((item) => item.lat >= south && item.lat <= north && item.lon >= west && item.lon <= east);
  }

  async function getAttractionsNear(lat, lon, radius) {
    await getDatabaseAttractions();
    const radiusMeters = Math.max(0, Number(radius) || 0);
    const latDelta = radiusMeters / 111320;
    const lonScale = Math.max(0.2, Math.cos(Number(lat) * Math.PI / 180));
    const lonDelta = radiusMeters / (111320 * lonScale);
    const candidates = getIndexedAttractionsForBox(
      Number(lat) - latDelta,
      Number(lon) - lonDelta,
      Number(lat) + latDelta,
      Number(lon) + lonDelta
    );
    return candidates.filter((item) => distanceMeters(lat, lon, item.lat, item.lon) <= radiusMeters);
  }

  function formatPreviewDistanceKm(meters) {
    if (!Number.isFinite(Number(meters))) return '—';
    const km = Math.max(0, Number(meters)) / 1000;
    return `${km.toFixed(km < 10 ? 1 : 0)} km`;
  }

  function setAttractionPreviewButton(count = null) {
    if (!attractionPreviewButton || !attractionPreviewCount) return;
    const available = Number.isInteger(count) && count >= 0 && osmEnabled && currentMapMode === 'all';
    attractionPreviewCount.textContent = available ? String(count) : '—';
    // v1032: przycisk zawsze daje się otworzyć na głównej mapie. Gdy GPS jeszcze
    // nie ma pozycji, okno pokaże czytelny komunikat zamiast wyglądać jak zepsute.
    attractionPreviewButton.disabled = currentMapMode !== 'all';
    attractionPreviewButton.classList.toggle('has-attractions', available && count > 0);
    attractionPreviewButton.setAttribute(
      'aria-label',
      available
        ? `Restauracje w pobliżu: ${count}. Otwórz listę restauracji w promieniu ${formatDistance(getProximityRadiusMeters())}.`
        : 'Restauracje w pobliżu. Otwórz okno podglądu.'
    );
    attractionPreviewButton.title = available
      ? `Restauracje do ${formatDistance(getProximityRadiusMeters())} od Ciebie: ${count}`
      : 'Otwórz podgląd restauracji';
  }

  function renderAttractionPreviewList() {
    if (!attractionPreviewList || !attractionPreviewSummary) return;
    const radius = getProximityRadiusMeters();

    if (!lastMonitorPosition?.coords) {
      attractionPreviewSummary.textContent = `Promień: ${formatDistance(radius)} · czekam na GPS`;
      attractionPreviewList.innerHTML = `
        <div class="attraction-preview-empty">
          Ustalam Twoją aktualną pozycję. Gdy GPS ją poda, tutaj pojawią się restauracje znajdujące się w wybranym promieniu.
        </div>
      `;
      return;
    }

    attractionPreviewSummary.textContent = `Promień: ${formatDistance(radius)} · znaleziono: ${attractionPreviewItems.length}`;

    if (!attractionPreviewItems.length) {
      attractionPreviewList.innerHTML = `
        <div class="attraction-preview-empty">
          W promieniu ${escapeHtml(formatDistance(radius))} nie ma obecnie restauracji zapisanych w bazie.
        </div>
      `;
      return;
    }

    attractionPreviewList.innerHTML = attractionPreviewItems.map(({ attraction, distance }) => {
      const info = CATEGORY_INFO[attraction.category] || CATEGORY_INFO.revolution;
      const statusInfo = getRestaurantStatus(attraction, { savedOverride: isOsmSaved(attraction.osmId) });
      const iconUrl = RESTAURANT_MARKER_ICONS[statusInfo.code] || info.icon;
      return `
        <article class="attraction-preview-row">
          <img class="attraction-preview-icon" src="${iconUrl}" alt="" aria-hidden="true" />
          <div class="attraction-preview-copy">
            <strong>${escapeHtml(attraction.name || info.label)}</strong>
            <span>${escapeHtml(info.label)} · ${escapeHtml(statusInfo.label)}</span>
          </div>
          <div class="attraction-preview-distance">${escapeHtml(formatPreviewDistanceKm(distance))}</div>
          <button class="attraction-preview-route" type="button" data-preview-route-id="${escapeHtml(attraction.osmId)}">PROWADŹ</button>
        </article>
      `;
    }).join('');
  }

  async function updateAttractionPreview(position = lastMonitorPosition) {
    const sequence = ++attractionPreviewUpdateSequence;

    if (!osmEnabled || currentMapMode !== 'all' || !position?.coords) {
      attractionPreviewItems = [];
      setAttractionPreviewButton(null);
      if (attractionPreviewOverlay && !attractionPreviewOverlay.hidden) renderAttractionPreviewList();
      return;
    }

    const latitude = Number(position.coords.latitude);
    const longitude = Number(position.coords.longitude);
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
      attractionPreviewItems = [];
      setAttractionPreviewButton(null);
      return;
    }

    const now = Date.now();
    const moved = lastPreviewPosition
      ? distanceMeters(latitude, longitude, lastPreviewPosition.lat, lastPreviewPosition.lon)
      : Infinity;
    const overlayOpen = attractionPreviewOverlay && !attractionPreviewOverlay.hidden;
    if (!overlayOpen && moved < PREVIEW_MIN_MOVE_METERS && now - lastPreviewUpdateAt < PREVIEW_MIN_INTERVAL_MS) return;

    try {
      const radius = getProximityRadiusMeters();
      const attractions = await getAttractionsNear(latitude, longitude, radius);
      if (sequence !== attractionPreviewUpdateSequence) return;

      attractionPreviewItems = attractions
        .map((attraction) => ({
          attraction,
          distance: distanceMeters(latitude, longitude, Number(attraction.lat), Number(attraction.lon))
        }))
        .sort((a, b) => a.distance - b.distance);
      lastPreviewPosition = { lat: latitude, lon: longitude };
      lastPreviewUpdateAt = now;

      setAttractionPreviewButton(attractionPreviewItems.length);
      if (attractionPreviewOverlay && !attractionPreviewOverlay.hidden) renderAttractionPreviewList();
    } catch (error) {
      console.warn('Nie udało się zaktualizować podglądu restauracji:', error);
      attractionPreviewItems = [];
      setAttractionPreviewButton(null);
    }
  }

  function showAttractionPreview() {
    if (!attractionPreviewOverlay || currentMapMode !== 'all') return;
    attractionPreviewOverlay.hidden = false;
    renderAttractionPreviewList();
    updateAttractionPreview(lastMonitorPosition).catch(() => {});
    attractionPreviewClose?.focus({ preventScroll: true });
  }

  function hideAttractionPreview() {
    if (attractionPreviewOverlay) attractionPreviewOverlay.hidden = true;
  }

  function allAttractionFiltersActive() {
    return CATEGORY_KEYS.every((key) => activeAttractionFilters.has(key));
  }

  function attractionMatchesActiveFilter(category) {
    return activeAttractionFilters.has(category);
  }

  function updateMapLegendUi() {
    if (!mapLegend) return;
    const allActive = allAttractionFiltersActive();
    mapLegend.querySelectorAll('[data-map-filter]').forEach((button) => {
      const value = button.dataset.mapFilter;
      const active = value === 'all' ? allActive : activeAttractionFilters.has(value);
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  }

  function refreshMarkersForActiveFilter() {
    updateMapLegendUi();
    renderStoredPoints();
    // Filtr legendy zmienia tylko to, co widać na mapie. Alerty i obliczanie
    // restauracji przy trasie nadal korzystają z pełnej bazy, żeby niczego nie przegapić.
    if (currentMapMode === 'all') {
      renderExternalAttractions([...osmAttractions.values()]);
      const visibleExternal = [...osmAttractions.values()].filter((item) =>
        !isOsmSaved(item.osmId) && attractionMatchesActiveFilter(item.category)
      ).length;
      const visibleMine = loadPoints().filter((point) => attractionMatchesActiveFilter(point.category)).length;
      const selectedCount = activeAttractionFilters.size;
      if (allAttractionFiltersActive()) {
        updateOsmStatus(`Baza restauracji: ${osmAttractions.size} · moje: ${visibleMine}`);
      } else if (selectedCount === 0) {
        updateOsmStatus('Filtr restauracji: widok wyłączony');
      } else {
        updateOsmStatus(`Wybrane kategorie: ${selectedCount} · ${visibleExternal + visibleMine} widocznych`);
      }
    }
  }

  function toggleAttractionFilter(value) {
    if (value === 'all') {
      activeAttractionFilters = allAttractionFiltersActive() ? new Set() : new Set(CATEGORY_KEYS);
      refreshMarkersForActiveFilter();
      return;
    }
    if (!CATEGORY_INFO[value]) return;

    // Gdy aktualnie włączone są WSZYSTKIE, pierwszy wybór kategorii przełącza
    // mapę na samą tę kategorię. Następne kliknięcia dodają/odejmują kolejne.
    if (allAttractionFiltersActive()) {
      activeAttractionFilters = new Set([value]);
    } else if (activeAttractionFilters.has(value)) {
      activeAttractionFilters.delete(value);
    } else {
      activeAttractionFilters.add(value);
    }
    refreshMarkersForActiveFilter();
  }

  function externalPopupHtml(attraction, savedOverride = null) {
    const info = CATEGORY_INFO[attraction.category] || CATEGORY_INFO.revolution;
    const saved = savedOverride == null ? isOsmSaved(attraction.osmId) : Boolean(savedOverride);
    const season = Number(attraction.tags?.season);
    const episode = Number(attraction.tags?.episode);
    const episodeLabel = Number.isFinite(season) && Number.isFinite(episode)
      ? `Sezon ${season} · odcinek ${episode}`
      : info.label;
    const originalName = String(attraction.tags?.originalName || '').trim();
    const address = String(attraction.tags?.address || '').trim();
    const safeSourceUrl = /^https?:\/\//i.test(String(attraction.sourceUrl || '')) ? String(attraction.sourceUrl) : '';
    const statusInfo = getRestaurantStatus(attraction, { savedOverride: saved });
    const popupIcon = RESTAURANT_MARKER_ICONS[statusInfo.code] || info.icon;

    return `
      <div class="place-popup osm-place-popup">
        <div class="place-popup-head">
          <img src="${popupIcon}" alt="" />
          <div>
            <strong>${escapeHtml(attraction.name)}</strong>
            <span>${escapeHtml(episodeLabel)} · Kuchenne Rewolucje</span>
          </div>
        </div>
        ${getStatusBadgeHtml(statusInfo)}
        <div class="place-popup-date">Status: ${escapeHtml(statusInfo.label)} · ${escapeHtml(statusInfo.sourceLabel)}</div>
        ${originalName ? `<div class="place-popup-date">Przed rewolucją: ${escapeHtml(originalName)}</div>` : ''}
        ${address ? `<div class="place-popup-date">${escapeHtml(address)}</div>` : ''}
        <div class="place-popup-coords">${Number(attraction.lat).toFixed(6)}, ${Number(attraction.lon).toFixed(6)}</div>
        ${routeActive && Number.isFinite(Number(attraction.routeDistanceMeters))
          ? `<div class="place-popup-date">Od trasy: ${escapeHtml(formatDistance(Number(attraction.routeDistanceMeters)))}</div>`
          : ''}
        <button class="place-popup-add-osm" type="button" data-route-osm-id="${escapeHtml(attraction.osmId)}">PROWADŹ</button>
        ${safeSourceUrl ? `<button class="place-popup-add-osm" type="button" data-source-url="${escapeHtml(safeSourceUrl)}">ODCINEK / ŹRÓDŁO</button>` : ''}
        ${statusInfo.sourceUrl ? `<button class="place-popup-add-osm" type="button" data-source-url="${escapeHtml(statusInfo.sourceUrl)}">STATUS / ŹRÓDŁO</button>` : ''}
        <button class="place-popup-add-osm" type="button" data-wikipedia-query="${escapeHtml(attraction.name)}">SZUKAJ W SIECI</button>
        ${
          saved
            ? '<div class="osm-saved-badge">TA RESTAURACJA JEST JUŻ W ODWIEDZONYCH</div>'
            : `<button class="place-popup-add-osm" type="button" data-add-osm-id="${escapeHtml(attraction.osmId)}">DODAJ DO ODWIEDZONYCH</button>`
        }
      </div>
    `;
  }

  function clusterAttractionsForCurrentZoom(attractions) {
    if (!map || map.getZoom() > CLUSTER_MAX_ZOOM || attractions.length < 2) {
      return attractions.map((attraction) => ({ type: 'attraction', key: String(attraction.osmId), attraction }));
    }

    const zoom = map.getZoom();
    const groups = new Map();
    attractions.forEach((attraction) => {
      const projected = map.project([attraction.lat, attraction.lon], zoom);
      const key = `${Math.floor(projected.x / CLUSTER_CELL_PX)}:${Math.floor(projected.y / CLUSTER_CELL_PX)}`;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(attraction);
    });

    const result = [];
    groups.forEach((items, cellKey) => {
      if (items.length === 1) {
        const attraction = items[0];
        result.push({ type: 'attraction', key: String(attraction.osmId), attraction });
        return;
      }
      const lat = items.reduce((sum, item) => sum + Number(item.lat), 0) / items.length;
      const lon = items.reduce((sum, item) => sum + Number(item.lon), 0) / items.length;
      result.push({
        type: 'cluster',
        key: `cluster:${zoom}:${cellKey}`,
        count: items.length,
        lat,
        lon,
        items
      });
    });
    return result;
  }

  function createClusterIcon(count) {
    const size = count >= 100 ? 48 : count >= 20 ? 44 : 40;
    return L.divIcon({
      className: '',
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
      html: `<div style="width:${size}px;height:${size}px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:rgba(25,91,169,.92);color:#fff;border:3px solid rgba(255,255,255,.95);box-shadow:0 2px 8px rgba(0,0,0,.35);font:bold ${count >= 100 ? 12 : 13}px system-ui,sans-serif;">${count}</div>`
    });
  }

  function renderExternalAttractions(attractions) {
    if (!map || !window.L) return;
    if (!externalLayer) externalLayer = L.layerGroup().addTo(map);

    const savedIds = getSavedOsmIdSet();
    const filtered = attractions.filter((attraction) =>
      attraction?.osmId &&
      !savedIds.has(String(attraction.osmId)) &&
      attractionMatchesActiveFilter(attraction.category)
    );
    const renderItems = clusterAttractionsForCurrentZoom(filtered);
    const desiredKeys = new Set(renderItems.map((item) => item.key));

    // Grupy są bardzo lekkie, więc przy zmianie widoku odtwarzamy tylko je.
    // Zwykłe markery są zachowywane i aktualizowane przyrostowo.
    for (const [key, marker] of osmMarkerById.entries()) {
      if (key.startsWith('cluster:')) {
        externalLayer.removeLayer(marker);
        osmMarkerById.delete(key);
      }
    }

    for (const [key, marker] of osmMarkerById.entries()) {
      if (!desiredKeys.has(key)) {
        externalLayer.removeLayer(marker);
        osmMarkerById.delete(key);
      }
    }

    renderItems.forEach((item) => {
      let marker = osmMarkerById.get(item.key);
      if (item.type === 'cluster') {
        if (!marker) {
          marker = L.marker([item.lat, item.lon], {
            icon: createClusterIcon(item.count),
            title: `${item.count} restauracji`,
            riseOnHover: true
          }).addTo(externalLayer);
          marker.on('click', () => {
            if (!map) return;
            const latLngs = item.items.map((attraction) => [Number(attraction.lat), Number(attraction.lon)]);
            const bounds = L.latLngBounds(latLngs);
            const targetZoom = Math.min(CLUSTER_MAX_ZOOM + 1, map.getZoom() + 2);
            if (bounds.isValid()) map.fitBounds(bounds, { padding: [30, 30], maxZoom: targetZoom, animate: true });
          });
          osmMarkerById.set(item.key, marker);
        }
        return;
      }

      const attraction = item.attraction;
      if (!marker) {
        marker = L.marker([attraction.lat, attraction.lon], {
          icon: createExternalCategoryIcon(attraction),
          title: attraction.name,
          riseOnHover: true,
          opacity: 0.86
        }).addTo(externalLayer);
        osmMarkerById.set(item.key, marker);
      }
      marker.bindPopup(externalPopupHtml(attraction, false), { maxWidth: 320, minWidth: 210 });
    });
  }

  function updateMainAttractionLayer(statusText = '') {
    if (!map || currentMapMode !== 'all') return;
    if (!osmEnabled) {
      clearOsmAttractions();
      updateOsmStatus('Baza restauracji: wyłączona');
      return;
    }

    if (routeActive) {
      osmAttractions = new Map(routeAttractions.map((item) => [item.osmId, item]));
      renderExternalAttractions(routeAttractions);
      if (statusText) updateOsmStatus(statusText);
      return;
    }

    const merged = new Map();
    [...nearbyAttractions, ...viewportAttractions].forEach((item) => {
      if (item?.osmId) merged.set(item.osmId, item);
    });

    osmAttractions = merged;
    renderExternalAttractions([...merged.values()]);

    if (statusText) {
      updateOsmStatus(statusText);
    } else if (merged.size) {
      updateOsmStatus(`Baza restauracji: ${merged.size}`);
    }
  }

  function viewportCacheKey() {
    if (!map) return '';
    const bounds = map.getBounds();
    const z = map.getZoom();
    return [
      z,
      bounds.getSouth().toFixed(2),
      bounds.getWest().toFixed(2),
      bounds.getNorth().toFixed(2),
      bounds.getEast().toFixed(2)
    ].join(':');
  }

  async function loadViewportAttractions() {
    if (!map || mapScreen?.hidden || currentMapMode !== 'all' || !osmEnabled) return;
    if (routeActive) {
      updateMainAttractionLayer(`Restauracje do ${formatDistance(getProximityRadiusMeters())} od trasy: ${routeAttractions.length} · alert aktywny`);
      return;
    }

    const key = viewportCacheKey();
    const cached = viewportCache.get(key);
    if (cached && Date.now() - cached.time < 10 * 60 * 1000) {
      viewportAttractions = cached.items;
      updateMainAttractionLayer(`Baza restauracji: ${new Set([...nearbyAttractions, ...viewportAttractions].map((item) => item.osmId)).size}`);
      return;
    }

    const sequence = ++viewportFetchSequence;
    updateOsmStatus('Baza restauracji: wczytywanie…');

    try {
      const attractions = await getAttractionsInBounds(map.getBounds());
      if (sequence !== viewportFetchSequence) return;

      viewportAttractions = attractions;
      viewportRetryUsed = false;
      viewportCache.set(key, { time: Date.now(), items: attractions });
      while (viewportCache.size > 8) viewportCache.delete(viewportCache.keys().next().value);

      const total = new Set([...nearbyAttractions, ...viewportAttractions].map((item) => item.osmId)).size;
      updateMainAttractionLayer(`Baza restauracji: ${total}`);
    } catch (error) {
      console.warn('Nie udało się wczytać lokalnej bazy restauracji:', error);
      updateMainAttractionLayer();
      const keptCount = new Set(
        [...nearbyAttractions, ...viewportAttractions]
          .filter((item) => item?.osmId)
          .map((item) => item.osmId)
      ).size;
      updateOsmStatus(
        keptCount
          ? `Baza restauracji: ${keptCount} · zachowano wcześniej wczytane punkty`
          : 'Nie udało się wczytać bazy Kuchennych Rewolucji. Sprawdź połączenie z internetem.',
        !keptCount
      );
    }
  }

  function scheduleViewportAttractions(delay = 650, resetRetry = true) {
    clearTimeout(viewportFetchTimer);
    if (resetRetry) viewportRetryUsed = false;
    if (currentMapMode !== 'all' || routeActive || !osmEnabled) return;
    viewportFetchTimer = setTimeout(loadViewportAttractions, delay);
  }

  async function refreshOsmManually() {
    if (!map || currentMapMode !== 'all' || !osmEnabled) return;

    osmRefreshButton?.classList.add('is-loading');
    if (osmRefreshButton) osmRefreshButton.disabled = true;
    viewportCache.clear();
    updateOsmStatus('Baza restauracji: odświeżam…');

    try {
      await ensureAttractionDatabase(true);
      if (routeActive && routeCoordinates.length) {
        routeAttractions = await fetchRouteAttractions(routeCoordinates, getProximityRadiusMeters());
        nearbyAttractions = routeAttractions;
        updateMainAttractionLayer(`Restauracje do ${formatDistance(getProximityRadiusMeters())} od trasy: ${routeAttractions.length} · alert aktywny`);
        return;
      }

      if (lastMonitorPosition?.coords) {
        lastNearbyFetchAt = 0;
        lastNearbyFetchPosition = null;
        await refreshNearbyAttractions(lastMonitorPosition);
      }

      await loadViewportAttractions();
    } finally {
      osmRefreshButton?.classList.remove('is-loading');
      if (osmRefreshButton) osmRefreshButton.disabled = false;
    }
  }

  function addOsmAttractionToMine(attraction, openAfter = true) {
    if (!attraction) return null;

    const existing = loadPoints().find((point) => String(point.osmId || '') === String(attraction.osmId));
    if (existing) {
      if (openAfter) {
        showMap({
          lat: Number(existing.lat),
          lon: Number(existing.lon),
          zoom: 16,
          openPointId: existing.id
        });
      }
      return existing;
    }

    const info = CATEGORY_INFO[attraction.category] || CATEGORY_INFO.revolution;
    const point = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      name: attraction.name || info.label,
      category: attraction.category,
      date: localDateString(),
      note: '',
      lat: Number(attraction.lat),
      lon: Number(attraction.lon),
      source: 'database',
      osmId: attraction.osmId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const points = loadPoints();
    points.push(point);
    savePoints(points);
    renderStoredPoints();
    renderExternalAttractions([...osmAttractions.values()]);
    showLocationMessage('Restauracja została dodana do odwiedzonych.');

    if (openAfter) {
      showMap({ lat: point.lat, lon: point.lon, zoom: 16, openPointId: point.id });
    }

    return point;
  }

  function getOsmAttractionById(osmId) {
    return (
      osmAttractions.get(String(osmId)) ||
      nearbyAttractions.find((item) => String(item.osmId) === String(osmId)) ||
      null
    );
  }

  function focusOsmAttraction(attraction) {
    if (!attraction) return;

    const savedPoint = loadPoints().find((point) => String(point.osmId || '') === String(attraction.osmId));
    if (savedPoint) {
      showMap({ lat: Number(savedPoint.lat), lon: Number(savedPoint.lon), zoom: 16, openPointId: savedPoint.id });
      return;
    }

    showMap({ lat: attraction.lat, lon: attraction.lon, zoom: 16 });

    setTimeout(() => {
      let marker = osmMarkerById.get(String(attraction.osmId));
      if (!marker && map && externalLayer) {
        osmAttractions.set(attraction.osmId, attraction);
        marker = L.marker([attraction.lat, attraction.lon], {
          icon: createExternalCategoryIcon(attraction),
          title: attraction.name,
          riseOnHover: true,
          opacity: 0.9
        }).addTo(externalLayer);
        marker.bindPopup(externalPopupHtml(attraction), { maxWidth: 320, minWidth: 210 });
        osmMarkerById.set(String(attraction.osmId), marker);
      }
      marker?.openPopup();
    }, 280);
  }

  function formatRouteDuration(seconds) {
    if (!Number.isFinite(Number(seconds))) return '';
    const totalMinutes = Math.max(1, Math.round(Number(seconds) / 60));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return hours ? `${hours} h ${minutes} min` : `${minutes} min`;
  }

  function routeDistanceToPointMeters(routeCoordinates, pointLat, pointLon) {
    if (!Array.isArray(routeCoordinates) || routeCoordinates.length < 2) return Infinity;

    const earthRadius = 6371000;
    const toRad = (value) => value * Math.PI / 180;
    const refLat = toRad(Number(pointLat));
    const cosLat = Math.cos(refLat);
    let minimum = Infinity;

    for (let index = 1; index < routeCoordinates.length; index += 1) {
      const a = routeCoordinates[index - 1];
      const b = routeCoordinates[index];
      if (!Array.isArray(a) || !Array.isArray(b)) continue;

      const ax = toRad(Number(a[0]) - Number(pointLon)) * earthRadius * cosLat;
      const ay = toRad(Number(a[1]) - Number(pointLat)) * earthRadius;
      const bx = toRad(Number(b[0]) - Number(pointLon)) * earthRadius * cosLat;
      const by = toRad(Number(b[1]) - Number(pointLat)) * earthRadius;
      const vx = bx - ax;
      const vy = by - ay;
      const lengthSquared = vx * vx + vy * vy;
      const t = lengthSquared > 0
        ? Math.max(0, Math.min(1, -(ax * vx + ay * vy) / lengthSquared))
        : 0;
      const closestX = ax + t * vx;
      const closestY = ay + t * vy;
      const distance = Math.hypot(closestX, closestY);
      if (distance < minimum) minimum = distance;
      if (minimum < 1) return minimum;
    }

    return minimum;
  }

  function simplifyRouteForAttractionSearch(routeCoordinates) {
    if (!Array.isArray(routeCoordinates) || routeCoordinates.length <= 2) return routeCoordinates || [];
    const result = [routeCoordinates[0]];
    let last = routeCoordinates[0];
    for (let index = 1; index < routeCoordinates.length - 1; index += 1) {
      const current = routeCoordinates[index];
      if (!Array.isArray(current) || !Array.isArray(last)) continue;
      const moved = distanceMeters(Number(last[1]), Number(last[0]), Number(current[1]), Number(current[0]));
      if (moved >= ROUTE_SAMPLE_STEP_METERS) {
        result.push(current);
        last = current;
      }
    }
    result.push(routeCoordinates[routeCoordinates.length - 1]);
    return result;
  }

  async function getRouteCandidateAttractions(routeCoordinates, radiusMeters) {
    await getDatabaseAttractions();
    const candidates = new Map();
    const latDelta = radiusMeters / 111320;

    routeCoordinates.forEach((coord) => {
      if (!Array.isArray(coord) || coord.length < 2) return;
      const lon = Number(coord[0]);
      const lat = Number(coord[1]);
      if (!Number.isFinite(lat) || !Number.isFinite(lon)) return;
      const lonDelta = radiusMeters / (111320 * Math.max(0.2, Math.cos(lat * Math.PI / 180)));
      getIndexedAttractionsForBox(
        lat - latDelta,
        lon - lonDelta,
        lat + latDelta,
        lon + lonDelta
      ).forEach((attraction) => candidates.set(String(attraction.osmId), attraction));
    });

    return [...candidates.values()];
  }

  async function fetchRouteAttractions(routeCoordinates, radiusMeters = getProximityRadiusMeters()) {
    if (!Array.isArray(routeCoordinates) || routeCoordinates.length < 2) return [];
    const radius = Math.max(1000, Number(radiusMeters) || getProximityRadiusMeters());
    const simplifiedRoute = simplifyRouteForAttractionSearch(routeCoordinates);
    const attractions = await getRouteCandidateAttractions(simplifiedRoute, radius);

    return attractions
      .map((attraction) => ({
        ...attraction,
        routeDistanceMeters: routeDistanceToPointMeters(
          simplifiedRoute,
          Number(attraction.lat),
          Number(attraction.lon)
        )
      }))
      .filter((attraction) => attraction.routeDistanceMeters <= radius)
      .sort((a, b) => a.routeDistanceMeters - b.routeDistanceMeters);
  }

  async function refreshRouteAttractionsForRadius({ showStatus = true } = {}) {
    if (!routeActive || !routeCoordinates.length) return;
    const radius = getProximityRadiusMeters();
    if (showStatus) updateOsmStatus(`Restauracje w pasie ${formatDistance(radius)} od trasy: wczytywanie…`);

    try {
      routeAttractions = await fetchRouteAttractions(routeCoordinates, radius);
      nearbyAttractions = routeAttractions;
      osmAttractions = new Map(routeAttractions.map((item) => [item.osmId, item]));
      renderExternalAttractions(routeAttractions);
      updateOsmStatus(`Restauracje w pasie ${formatDistance(radius)} od trasy: ${routeAttractions.length} · alert ${formatDistance(getProximityRadiusMeters())}`);
      showLocationMessage(`Na trasie: ${routeAttractions.length} restauracji w odległości do ${formatDistance(radius)} od przebiegu trasy.`);
      if (lastMonitorPosition) checkProximity(lastMonitorPosition);
    } catch (error) {
      console.warn('Nie udało się odczytać restauracji przy trasie:', error);
      updateOsmStatus('Restauracje przy trasie: nie udało się odczytać bazy', true);
    }
  }

  function normalizeRouteMode(mode) {
    return Object.prototype.hasOwnProperty.call(ROUTE_MODES, mode) ? mode : 'car';
  }

  function routeModeMeta(mode = routeTravelMode) {
    return ROUTE_MODES[normalizeRouteMode(mode)] || ROUTE_MODES.car;
  }

  function isWalkingRouteMode(mode = activeRouteMode) {
    const value = normalizeRouteMode(mode);
    return value === 'foot' || value === 'hiking';
  }

  function routeOffRouteThreshold(mode = activeRouteMode) {
    const value = normalizeRouteMode(mode);
    if (value === 'hiking') return 45;
    if (value === 'foot') return 60;
    if (value === 'bike') return 100;
    return 180;
  }

  function routeArrivalThreshold(mode = activeRouteMode) {
    return isWalkingRouteMode(mode) ? 20 : 35;
  }

  function updateRouteModeUi() {
    routeModeButtons.forEach((button) => {
      const active = normalizeRouteMode(button.dataset.routeMode) === routeTravelMode;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
    if (routeSource) {
      routeSource.textContent = 'Routing: OpenStreetMap.de / OSRM · sposób poruszania wybierzesz po wskazaniu celu';
    }
  }

  function setRouteTravelMode(mode, { persist = true } = {}) {
    routeTravelMode = normalizeRouteMode(mode);
    if (persist) localStorage.setItem(ROUTE_MODE_KEY, routeTravelMode);
    updateRouteModeUi();
  }

  function showRouteModeChooser(destination) {
    if (!destination || !Number.isFinite(Number(destination.lat)) || !Number.isFinite(Number(destination.lon))) return;
    pendingRouteDestination = {
      name: String(destination.name || 'Cel podróży'),
      lat: Number(destination.lat),
      lon: Number(destination.lon)
    };
    updateRouteModeUi();
    if (routeModeDestinationName) routeModeDestinationName.textContent = pendingRouteDestination.name;
    if (routeModeOverlay) routeModeOverlay.hidden = false;
    const activeButton = routeModeButtons.find((button) => normalizeRouteMode(button.dataset.routeMode) === routeTravelMode) || routeModeButtons[0];
    requestAnimationFrame(() => activeButton?.focus({ preventScroll: true }));
  }

  function hideRouteModeChooser({ clearPending = true } = {}) {
    if (routeModeOverlay) routeModeOverlay.hidden = true;
    if (clearPending) pendingRouteDestination = null;
  }

  function startPendingRouteWithMode(mode) {
    if (!pendingRouteDestination) return;
    const destination = { ...pendingRouteDestination };
    setRouteTravelMode(mode);
    hideRouteModeChooser();
    if (routeDestinationInput) routeDestinationInput.value = destination.name || '';
    planRouteToDestination(destination, { startNavigation: true, mode: routeTravelMode });
  }

  function updateNavigationModeUi() {
    const meta = routeModeMeta(activeRouteMode);
    if (navigationMode) navigationMode.textContent = `${meta.icon} ${meta.label}`;
    navigationPanel?.setAttribute('data-route-mode', activeRouteMode);
  }

  function setRouteInfo(text, isError = false) {
    if (!routeInfo) return;
    routeInfo.textContent = text || '';
    routeInfo.classList.toggle('is-error', Boolean(isError));
    routeInfo.hidden = !text;
  }

  function showRoutePanel() {
    if (!routePanel || currentMapMode !== 'all') return;
    updateRouteModeUi();
    routePanel.hidden = false;
    if (routeDestinationInput && !routeActive) {
      setTimeout(() => routeDestinationInput.focus({ preventScroll: true }), 30);
    }
    if (!lastMonitorPosition?.coords) {
      startProximityMonitoring(false);
      setRouteInfo('Ustalam Twoją lokalizację startową…');
    } else if (!routeActive) {
      setRouteInfo('Wpisz cel podróży i wybierz go z listy.');
    }
  }

  function hideRoutePanel() {
    if (routePanel) routePanel.hidden = true;
    if (routeResults) routeResults.replaceChildren();
  }

  function renderRouteSearchResults(results) {
    if (!routeResults) return;
    routeResults.replaceChildren();

    if (!results.length) {
      const empty = document.createElement('div');
      empty.className = 'route-result-empty';
      empty.textContent = 'Nie znaleziono takiego celu w Polsce.';
      routeResults.append(empty);
      return;
    }

    results.forEach((result) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'route-result-button';
      button.setAttribute('role', 'listitem');
      button.textContent = result.display_name || result.name || 'Wybrany cel';
      button.addEventListener('click', () => showRouteModeChooser({
        name: result.display_name || result.name || 'Cel podróży',
        lat: Number(result.lat),
        lon: Number(result.lon)
      }));
      routeResults.append(button);
    });
  }

  async function searchRouteDestination() {
    const query = routeDestinationInput?.value.trim() || '';
    if (query.length < 2) {
      setRouteInfo('Wpisz nazwę miejscowości, obiektu lub adres celu.', true);
      return;
    }

    const sequence = ++routeSearchSequence;
    if (routeSearchButton) routeSearchButton.disabled = true;
    setRouteInfo('Szukam celu podróży…');
    if (routeResults) routeResults.replaceChildren();

    try {
      const url = `${NOMINATIM_URL}?format=jsonv2&limit=5&countrycodes=pl&accept-language=pl&q=${encodeURIComponent(query)}`;
      const response = await fetch(url, { headers: { Accept: 'application/json' } });
      if (!response.ok) throw new Error(`Nominatim HTTP ${response.status}`);
      const results = await response.json();
      if (sequence !== routeSearchSequence) return;
      renderRouteSearchResults(Array.isArray(results) ? results : []);
      setRouteInfo(results?.length ? 'Wybierz właściwy cel z listy.' : 'Nie znaleziono celu.', !results?.length);
    } catch (error) {
      console.warn('Nie udało się wyszukać celu:', error);
      setRouteInfo('Wyszukiwanie celu jest chwilowo niedostępne.', true);
    } finally {
      if (routeSearchButton) routeSearchButton.disabled = false;
    }
  }


  function formatNavigationDistance(meters) {
    const value = Math.max(0, Number(meters) || 0);
    if (value < 1000) return `${Math.max(10, Math.round(value / 10) * 10)} m`;
    if (value < 10000) return `${(value / 1000).toFixed(1).replace('.', ',')} km`;
    return `${Math.round(value / 1000)} km`;
  }

  function navigationArrowForStep(step) {
    const type = String(step?.maneuver?.type || '');
    const modifier = String(step?.maneuver?.modifier || '');
    if (type.includes('roundabout') || type === 'rotary') return '↻';
    if (type === 'arrive') return '●';
    const arrows = {
      'sharp left': '↙',
      'left': '←',
      'slight left': '↖',
      'straight': '↑',
      'slight right': '↗',
      'right': '→',
      'sharp right': '↘',
      'uturn': '↶'
    };
    return arrows[modifier] || '↑';
  }

  function navigationInstructionForStep(step) {
    const maneuver = step?.maneuver || {};
    const type = String(maneuver.type || '');
    const modifier = String(maneuver.modifier || '');
    const exit = Number(maneuver.exit);
    const walking = isWalkingRouteMode(activeRouteMode);
    const continueText = walking ? 'idź dalej' : 'jedź dalej';
    const direction = {
      'sharp left': 'skręć ostro w lewo',
      'left': 'skręć w lewo',
      'slight left': 'skręć lekko w lewo',
      'straight': walking ? 'idź prosto' : 'jedź prosto',
      'slight right': 'skręć lekko w prawo',
      'right': 'skręć w prawo',
      'sharp right': 'skręć ostro w prawo',
      'uturn': 'zawróć'
    }[modifier] || continueText;

    if (type === 'arrive') return 'Dotrzesz do celu';
    if (type === 'depart') {
      if (direction === continueText) return walking ? 'Ruszaj pieszo zgodnie z trasą' : 'Ruszaj zgodnie z trasą';
      return direction;
    }
    if (type === 'roundabout' || type === 'rotary' || type === 'roundabout turn') {
      return Number.isFinite(exit) && exit > 0
        ? `Na rondzie wybierz ${exit}. zjazd`
        : 'Wjedź na rondo i poruszaj się zgodnie z trasą';
    }
    if (type === 'exit roundabout' || type === 'exit rotary') return 'Zjedź z ronda';
    if (type === 'merge') return modifier.includes('left') ? 'Włącz się do ruchu z lewej strony' : modifier.includes('right') ? 'Włącz się do ruchu z prawej strony' : 'Włącz się do ruchu';
    if (type === 'fork') return modifier.includes('left') ? 'Na rozwidleniu trzymaj się lewej strony' : modifier.includes('right') ? 'Na rozwidleniu trzymaj się prawej strony' : 'Na rozwidleniu poruszaj się zgodnie z trasą';
    if (type === 'on ramp' || type === 'ramp') return modifier.includes('left') ? 'Wjedź na łącznicę w lewo' : modifier.includes('right') ? 'Wjedź na łącznicę w prawo' : 'Wjedź na łącznicę';
    if (type === 'off ramp') return modifier.includes('left') ? 'Zjedź z drogi w lewo' : modifier.includes('right') ? 'Zjedź z drogi w prawo' : 'Zjedź z drogi';
    if (type === 'end of road') return modifier.includes('left') ? 'Na końcu drogi skręć w lewo' : modifier.includes('right') ? 'Na końcu drogi skręć w prawo' : direction;
    if (type === 'new name' || type === 'continue' || type === 'notification') {
      return direction === continueText ? (walking ? 'Kontynuuj marsz' : 'Kontynuuj jazdę') : direction;
    }
    return direction.charAt(0).toUpperCase() + direction.slice(1);
  }

  function laneArrowForIndications(indications) {
    const values = Array.isArray(indications) ? indications.map((item) => String(item).toLowerCase()) : [];
    const priority = ['uturn', 'sharp left', 'left', 'slight left', 'straight', 'slight right', 'right', 'sharp right'];
    const value = priority.find((candidate) => values.includes(candidate)) || values[0] || 'straight';
    return {
      'uturn': '↶',
      'sharp left': '↙',
      'left': '←',
      'slight left': '↖',
      'straight': '↑',
      'slight right': '↗',
      'right': '→',
      'sharp right': '↘'
    }[value] || '↑';
  }

  function laneGuidanceForStep(stepIndex) {
    const current = navigationSteps[stepIndex];
    const previous = navigationSteps[Math.max(0, stepIndex - 1)];
    const candidates = [current, previous].filter(Boolean);
    for (const step of candidates) {
      const intersections = Array.isArray(step?.intersections) ? step.intersections : [];
      const ordered = step === previous ? [...intersections].reverse() : intersections;
      for (const intersection of ordered) {
        if (Array.isArray(intersection?.lanes) && intersection.lanes.length) return intersection.lanes;
      }
    }
    return [];
  }

  function hideManeuverOverlay() {
    if (mapManeuverOverlay) mapManeuverOverlay.hidden = true;
    if (mapManeuverDistance) mapManeuverDistance.textContent = '0 m';
    if (mapLanes) {
      mapLanes.hidden = true;
      mapLanes.replaceChildren();
    }
  }

  function updateManeuverOverlay(stepIndex, step, distanceToStep) {
    if (!mapManeuverOverlay || !mapManeuverArrow || !navigationActive || navigationArrived) {
      hideManeuverOverlay();
      return;
    }
    const type = String(step?.maneuver?.type || '');
    const distance = Number(distanceToStep);
    if (!Number.isFinite(distance) || distance > 400 || type === 'arrive') {
      hideManeuverOverlay();
      return;
    }

    mapManeuverArrow.textContent = navigationArrowForStep(step);
    if (mapManeuverDistance) {
      mapManeuverDistance.textContent = `${Math.max(0, Math.round(distance))} m`;
    }
    if (mapLanes) {
      mapLanes.replaceChildren();
      const lanes = isWalkingRouteMode(activeRouteMode) ? [] : laneGuidanceForStep(stepIndex);
      lanes.forEach((lane) => {
        const laneEl = document.createElement('span');
        laneEl.className = `map-lane${lane?.valid ? ' is-valid' : ' is-invalid'}`;
        laneEl.textContent = laneArrowForIndications(lane?.indications);
        mapLanes.append(laneEl);
      });
      mapLanes.hidden = lanes.length === 0;
    }
    mapManeuverOverlay.hidden = false;
  }

  function buildNavigationRouteMetrics(coordinates, steps, routeDistance, routeDuration) {
    navigationRouteCumulative = [];
    let cumulative = 0;
    coordinates.forEach((coord, index) => {
      if (index > 0) {
        const prev = coordinates[index - 1];
        cumulative += distanceMeters(Number(prev[1]), Number(prev[0]), Number(coord[1]), Number(coord[0]));
      }
      navigationRouteCumulative.push(cumulative);
    });
    navigationRouteDistance = Number(routeDistance) || cumulative;
    navigationRouteDuration = Number(routeDuration) || 0;
    navigationLastRouteIndex = 0;

    navigationSteps = (Array.isArray(steps) ? steps : []).map((step, stepIndex) => {
      const location = step?.maneuver?.location;
      let nearestIndex = 0;
      let nearestDistance = Infinity;
      if (Array.isArray(location) && location.length >= 2) {
        const lon = Number(location[0]);
        const lat = Number(location[1]);
        coordinates.forEach((coord, index) => {
          const d = distanceMeters(lat, lon, Number(coord[1]), Number(coord[0]));
          if (d < nearestDistance) {
            nearestDistance = d;
            nearestIndex = index;
          }
        });
      }
      return {
        ...step,
        _stepIndex: stepIndex,
        _routeIndex: nearestIndex,
        _routeMeters: navigationRouteCumulative[nearestIndex] || 0
      };
    });
  }

  function findNearestNavigationRoutePosition(lat, lon) {
    if (!routeCoordinates.length) return { index: 0, distance: Infinity, progress: 0 };

    const testRange = (start, end, stride = 1) => {
      let bestIndex = start;
      let bestDistance = Infinity;
      for (let i = start; i <= end; i += stride) {
        const coord = routeCoordinates[i];
        if (!coord) continue;
        const d = distanceMeters(lat, lon, Number(coord[1]), Number(coord[0]));
        if (d < bestDistance) {
          bestDistance = d;
          bestIndex = i;
        }
      }
      return { index: bestIndex, distance: bestDistance };
    };

    const start = Math.max(0, navigationLastRouteIndex - 80);
    const end = Math.min(routeCoordinates.length - 1, navigationLastRouteIndex + 550);
    let best = testRange(start, end, 1);

    if (best.distance > 700) {
      const sampled = testRange(0, routeCoordinates.length - 1, Math.max(1, Math.floor(routeCoordinates.length / 700)));
      const refineStart = Math.max(0, sampled.index - 20);
      const refineEnd = Math.min(routeCoordinates.length - 1, sampled.index + 20);
      best = testRange(refineStart, refineEnd, 1);
    }

    navigationLastRouteIndex = best.index;
    return {
      ...best,
      progress: navigationRouteCumulative[best.index] || 0
    };
  }

  function navigationVoiceBucket(distance) {
    if (distance <= 70) return '70';
    if (distance <= 180) return '180';
    if (distance <= 450) return '450';
    if (distance <= 1000) return '1000';
    return 'far';
  }

  function speakNavigation(text) {
    if (!navigationVoiceEnabled || !text || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pl-PL';
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.warn('Synteza mowy jest niedostępna:', error);
    }
  }

  function setNavigationVoiceUi() {
    if (!navigationVoiceButton) return;
    navigationVoiceButton.textContent = navigationVoiceEnabled ? 'GŁOS ON' : 'GŁOS OFF';
    navigationVoiceButton.classList.toggle('is-muted', !navigationVoiceEnabled);
    navigationVoiceButton.setAttribute('aria-pressed', navigationVoiceEnabled ? 'true' : 'false');
  }

  function stopNavigation({ keepRoute = false } = {}) {
    navigationActive = false;
    navigationArrived = false;
    navigationRerouteInFlight = false;
    navigationLastSpokenKey = '';
    navigationLastVoiceBucket = '';
    navigationLastStepIndex = -1;
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    if (navigationPanel) navigationPanel.hidden = true;
    if (navigationDestination) navigationDestination.textContent = '—';
    hideManeuverOverlay();
    if (!keepRoute) clearRoute({ refreshMap: true });
  }

  function startNavigation() {
    if (!routeActive || !routeDestination || !routeCoordinates.length) return;
    navigationActive = true;
    navigationArrived = false;
    navigationLastRouteIndex = 0;
    navigationLastStepIndex = -1;
    navigationLastVoiceBucket = '';
    navigationLastSpokenKey = '';
    navigationVoiceEnabled = true;
    mapAutoFollowEnabled = true;
    if (navigationPanel) navigationPanel.hidden = false;
    if (navigationDestination) navigationDestination.textContent = routeDestination.name || 'Cel podróży';
    updateNavigationModeUi();
    if (navigationKicker) navigationKicker.textContent = `NAWIGACJA · ${routeModeMeta(activeRouteMode).label}`;
    if (lastMonitorPosition?.coords) {
      const { latitude, longitude } = lastMonitorPosition.coords;
      mapProgrammaticMove = true;
      map?.panTo([latitude, longitude], { animate: true, duration: 0.35, noMoveStart: true });
      mapProgrammaticMove = false;
      updateNavigationFromPosition(lastMonitorPosition, true);
    }
  }

  async function maybeRerouteNavigation(position, offRouteDistance) {
    if (!navigationActive || navigationArrived || navigationRerouteInFlight || !routeDestination) return;
    if (offRouteDistance < routeOffRouteThreshold(activeRouteMode)) return;
    if (Date.now() - navigationLastRerouteAt < 20000) return;

    navigationRerouteInFlight = true;
    navigationLastRerouteAt = Date.now();
    if (navigationKicker) navigationKicker.textContent = 'PRZELICZAM TRASĘ…';
    try {
      await planRouteToDestination(routeDestination, {
        startNavigation: true,
        recalculating: true,
        mode: activeRouteMode
      });
    } finally {
      navigationRerouteInFlight = false;
      if (navigationActive && !navigationArrived && navigationKicker?.textContent === 'PRZELICZAM TRASĘ…') {
        navigationKicker.textContent = `NAWIGACJA · ${routeModeMeta(activeRouteMode).label}`;
      }
    }
  }

  function updateNavigationFromPosition(position, forceSpeak = false) {
    if (!navigationActive || !position?.coords || !routeCoordinates.length || !routeDestination) return;

    const lat = Number(position.coords.latitude);
    const lon = Number(position.coords.longitude);
    const nearest = findNearestNavigationRoutePosition(lat, lon);
    const remaining = Math.max(0, navigationRouteDistance - nearest.progress);
    const destinationDistance = distanceMeters(lat, lon, Number(routeDestination.lat), Number(routeDestination.lon));

    if (destinationDistance <= routeArrivalThreshold(activeRouteMode) || remaining <= 20) {
      navigationArrived = true;
      if (navigationKicker) navigationKicker.textContent = `CEL OSIĄGNIĘTY · ${routeModeMeta(activeRouteMode).label}`;
      if (navigationArrow) navigationArrow.textContent = '●';
      if (navigationInstruction) navigationInstruction.textContent = 'Jesteś na miejscu';
      if (navigationRoad) navigationRoad.textContent = routeDestination.name || 'Cel podróży';
      if (navigationDestination) navigationDestination.textContent = routeDestination.name || 'Cel podróży';
      hideManeuverOverlay();
      if (navigationTurnDistance) navigationTurnDistance.textContent = '0 m';
      if (navigationRemainingDistance) navigationRemainingDistance.textContent = '0 m';
      if (navigationRemainingTime) navigationRemainingTime.textContent = '0 min';
      if (navigationLastSpokenKey !== 'arrived') {
        navigationLastSpokenKey = 'arrived';
        speakNavigation(`Jesteś na miejscu. ${routeDestination.name || ''}`.trim());
      }
      return;
    }

    let stepIndex = navigationSteps.findIndex((step) => {
      if (step?.maneuver?.type === 'depart') return false;
      return Number(step._routeMeters) > nearest.progress + 12;
    });
    if (stepIndex < 0) stepIndex = Math.max(0, navigationSteps.length - 1);
    const step = navigationSteps[stepIndex];
    const distanceToStep = Math.max(0, Number(step?._routeMeters || navigationRouteDistance) - nearest.progress);
    const instruction = navigationInstructionForStep(step);
    const road = String(step?.name || '').trim();
    const remainingTimeSeconds = navigationRouteDistance > 0
      ? navigationRouteDuration * (remaining / navigationRouteDistance)
      : 0;

    if (navigationKicker) navigationKicker.textContent = nearest.distance >= routeOffRouteThreshold(activeRouteMode) ? `POZA TRASĄ · ${routeModeMeta(activeRouteMode).label}` : `NAWIGACJA · ${routeModeMeta(activeRouteMode).label}`;
    if (navigationArrow) navigationArrow.textContent = navigationArrowForStep(step);
    if (navigationInstruction) navigationInstruction.textContent = instruction;
    if (navigationRoad) navigationRoad.textContent = road || (routeDestination.name ? `Kierunek: ${routeDestination.name}` : '');
    if (navigationTurnDistance) navigationTurnDistance.textContent = formatNavigationDistance(distanceToStep);
    if (navigationRemainingDistance) navigationRemainingDistance.textContent = formatNavigationDistance(remaining);
    if (navigationRemainingTime) navigationRemainingTime.textContent = formatRouteDuration(remainingTimeSeconds);
    if (navigationDestination) navigationDestination.textContent = routeDestination.name || 'Cel podróży';
    updateManeuverOverlay(stepIndex, step, distanceToStep);

    const voiceBucket = navigationVoiceBucket(distanceToStep);
    const voiceKey = `${stepIndex}:${voiceBucket}`;
    const shouldSpeak =
      forceSpeak ||
      stepIndex !== navigationLastStepIndex ||
      (voiceBucket !== 'far' && voiceKey !== navigationLastSpokenKey && voiceBucket !== navigationLastVoiceBucket);

    if (shouldSpeak) {
      navigationLastSpokenKey = voiceKey;
      navigationLastVoiceBucket = voiceBucket;
      const distancePhrase = distanceToStep > 90 ? `Za ${formatNavigationDistance(distanceToStep)}, ` : '';
      speakNavigation(`${distancePhrase}${instruction}${road ? `, ${road}` : ''}.`);
    }
    navigationLastStepIndex = stepIndex;

    maybeRerouteNavigation(position, nearest.distance);
  }

  function clearRoute({ refreshMap = true } = {}) {
    if (navigationActive || (navigationPanel && !navigationPanel.hidden)) {
      navigationActive = false;
      navigationArrived = false;
      navigationRerouteInFlight = false;
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      if (navigationPanel) navigationPanel.hidden = true;
      if (navigationDestination) navigationDestination.textContent = '—';
      hideManeuverOverlay();
    }
    routeActive = false;
    routeDestination = null;
    routeAttractions = [];
    routeCoordinates = [];
    nearbyAttractions = [];
    routeAlertedIds = new Set();

    if (map && routeLayer) map.removeLayer(routeLayer);
    routeLayer = null;
    if (map && routeDestinationMarker) map.removeLayer(routeDestinationMarker);
    routeDestinationMarker = null;

    if (routeClearButton) routeClearButton.hidden = true;
    if (routeDestinationInput) routeDestinationInput.value = '';
    if (routeResults) routeResults.replaceChildren();
    setRouteInfo('Wpisz cel podróży i wybierz go z listy.');

    if (refreshMap && currentMapMode === 'all') {
      scheduleViewportAttractions(150);
      if (lastMonitorPosition?.coords) {
        lastNearbyFetchAt = 0;
        refreshNearbyAttractions(lastMonitorPosition);
      }
    }
  }

  async function planRouteToDestination(destination, { startNavigation: shouldStartNavigation = false, recalculating = false, mode = null } = {}) {
    if (!map || !destination || !Number.isFinite(destination.lat) || !Number.isFinite(destination.lon)) return;

    const requestedMode = normalizeRouteMode(recalculating ? activeRouteMode : (mode || routeTravelMode));
    const requestedModeMeta = routeModeMeta(requestedMode);
    if (!recalculating) setRouteTravelMode(requestedMode);

    let position = lastMonitorPosition;
    if (!position?.coords) {
      setRouteInfo('Ustalam Twoją lokalizację startową…');
      try {
        position = await getCurrentPosition();
        handleMonitoredPosition(position);
      } catch (error) {
        setRouteInfo(geolocationErrorText(error), true);
        return;
      }
    }

    const startLat = Number(position.coords.latitude);
    const startLon = Number(position.coords.longitude);
    setRouteInfo(`Wyznaczam trasę · ${requestedModeMeta.icon} ${requestedModeMeta.label}…`);
    if (routeResults) routeResults.replaceChildren();

    try {
      const url = `${requestedModeMeta.endpoint}/${startLon.toFixed(6)},${startLat.toFixed(6)};${destination.lon.toFixed(6)},${destination.lat.toFixed(6)}?overview=full&geometries=geojson&steps=true&annotations=false`;
      const response = await fetch(url, { headers: { Accept: 'application/json' } });
      if (!response.ok) throw new Error(`OSRM HTTP ${response.status}`);
      const data = await response.json();
      const route = data?.routes?.[0];
      const coordinates = route?.geometry?.coordinates;
      if (!route || !Array.isArray(coordinates) || coordinates.length < 2) throw new Error('Brak trasy');

      if (routeLayer) map.removeLayer(routeLayer);
      routeLayer = L.geoJSON(route.geometry, {
        style: {
          color: '#1f6fd5',
          weight: 6,
          opacity: 0.86
        }
      }).addTo(map);

      if (routeDestinationMarker) map.removeLayer(routeDestinationMarker);
      routeDestinationMarker = L.marker([destination.lat, destination.lon], {
        title: destination.name || 'Cel podróży'
      }).addTo(map).bindPopup(`<strong>${escapeHtml(destination.name || 'Cel podróży')}</strong><br>Cel podróży`);

      routeActive = true;
      routeDestination = destination;
      activeRouteMode = requestedMode;
      updateNavigationModeUi();
      routeCoordinates = coordinates;
      if (!recalculating) routeAlertedIds = new Set();
      const routeSteps = (Array.isArray(route.legs) ? route.legs : [])
        .flatMap((leg) => Array.isArray(leg?.steps) ? leg.steps : []);
      buildNavigationRouteMetrics(coordinates, routeSteps, Number(route.distance), Number(route.duration));
      if (routeClearButton) routeClearButton.hidden = false;

      clearTimeout(viewportFetchTimer);
      externalLayer?.clearLayers();
      osmMarkerById = new Map();

      const distance = formatDistance(Number(route.distance));
      const duration = formatRouteDuration(Number(route.duration));
      const routeRadius = getProximityRadiusMeters();
      setRouteInfo(`${requestedModeMeta.icon} ${requestedModeMeta.label} · ${destination.name} · ${distance} · około ${duration}. Szukam restauracji do ${formatDistance(routeRadius)} od przebiegu trasy…`);

      // v1021: wyznaczenie trasy nie może samoczynnie zmieniać skali ani środka mapy.
      // Tylko przycisk WYCENTRUJ ustawia jednorazowo zoom na bieżącej pozycji.

      try {
        routeAttractions = await fetchRouteAttractions(coordinates, routeRadius);
        nearbyAttractions = routeAttractions;
        osmAttractions = new Map(routeAttractions.map((item) => [item.osmId, item]));
        renderExternalAttractions(routeAttractions);
        updateOsmStatus(`Restauracje do ${formatDistance(getProximityRadiusMeters())} od trasy: ${routeAttractions.length} · alert aktywny`);
        setRouteInfo(`${requestedModeMeta.icon} ${requestedModeMeta.label} · ${destination.name} · ${distance} · około ${duration} · restauracji do ${formatDistance(routeRadius)} od trasy: ${routeAttractions.length}. Alert: ${formatDistance(routeRadius)}.`);
        showLocationMessage(`Trasa gotowa · ${routeAttractions.length} restauracji w zasięgu do ${formatDistance(routeRadius)} od trasy. Alerty są aktywne.`);
        // Po wyznaczeniu trasy odsłaniamy mapę i znaczniki restauracji.
        // Nie zmieniamy zoomu ani środka — użytkownik steruje skalą ręcznie.
        hideRoutePanel();
        startProximityMonitoring(false);
        checkProximity(position);
        if (shouldStartNavigation || recalculating) startNavigation();
      } catch (error) {
        console.warn('Nie udało się odczytać restauracji przy trasie:', error);
        routeAttractions = [];
        nearbyAttractions = [];
        updateOsmStatus('Restauracje przy trasie: brak danych z bazy', true);
        setRouteInfo(`${requestedModeMeta.icon} ${requestedModeMeta.label} · ${destination.name} · ${distance} · około ${duration}. Trasa działa, ale restauracji nie udało się odczytać z bazy.`, true);
        hideRoutePanel();
        startProximityMonitoring(false);
        if (shouldStartNavigation || recalculating) startNavigation();
      }
    } catch (error) {
      console.warn('Nie udało się wyznaczyć trasy:', error);
      setRouteInfo(`Nie udało się wyznaczyć trasy w trybie ${requestedModeMeta.label}.`, true);
    }
  }

  function setProximityUi(active) {
    proximityActive = Boolean(active);
    proximityButton?.classList.toggle('is-active', proximityActive);
    proximityButton?.setAttribute('aria-pressed', proximityActive ? 'true' : 'false');
    if (proximityButton) {
      proximityButton.title = proximityActive
        ? 'Śledzenie i alerty działają automatycznie – kliknij, aby wrócić do swojej pozycji'
        : 'Automatyczne śledzenie lokalizacji';
      proximityButton.setAttribute(
        'aria-label',
        proximityActive
          ? 'Automatyczne śledzenie aktywne. Kliknij, aby wrócić do swojej pozycji'
          : 'Automatyczne śledzenie lokalizacji'
      );
    }
    if (proximityRadiusWrap) proximityRadiusWrap.classList.toggle('is-active', proximityActive);
  }

  function updateMonitoredLocationVisual(position) {
    if (!map || !position?.coords) return;
    const { latitude, longitude, accuracy } = position.coords;
    const latlng = [latitude, longitude];

    if (userAccuracyCircle) {
      userAccuracyCircle.setLatLng(latlng).setRadius(Math.max(accuracy || 5, 5));
    } else {
      userAccuracyCircle = L.circle(latlng, {
        radius: Math.max(accuracy || 5, 5),
        color: '#2f80ed',
        weight: 1,
        opacity: 0.55,
        fillColor: '#2f80ed',
        fillOpacity: 0.12,
        interactive: false
      }).addTo(map);
    }

    if (userLocationMarker) {
      userLocationMarker.setLatLng(latlng);
    } else {
      userLocationMarker = L.circleMarker(latlng, {
        radius: 8,
        color: '#ffffff',
        weight: 3,
        fillColor: '#1677ff',
        fillOpacity: 1
      }).addTo(map);
      userLocationMarker.bindTooltip('Twoja lokalizacja', { direction: 'top', offset: [0, -8] });
    }
  }

  function hideNearbyAlert() {
    clearTimeout(nearbyAlertTimer);
    nearbyAlertTimer = null;
    if (nearbyAlert) nearbyAlert.hidden = true;
    currentNearbyAlertId = null;
  }

  function showNearbyAttractionAlert(attraction, distance) {
    if (!nearbyAlert || !attraction) return;

    const info = CATEGORY_INFO[attraction.category] || CATEGORY_INFO.revolution;
    currentNearbyAlertId = attraction.osmId;

    if (nearbyAlertIcon) nearbyAlertIcon.src = info.icon;
    if (nearbyAlertTitle) nearbyAlertTitle.textContent = attraction.name;
    if (nearbyAlertMeta) {
      nearbyAlertMeta.textContent = `${info.label} · około ${formatDistance(distance)} od Ciebie`;
    }

    if (routeActive) {
      routeAlertedIds.add(String(attraction.osmId));
    } else {
      markAttractionAlerted(attraction.osmId);
    }
    nearbyAlert.hidden = false;
    clearTimeout(nearbyAlertTimer);
    nearbyAlertTimer = setTimeout(() => hideNearbyAlert(), 5000);
  }

  function checkProximity(position) {
    if (!osmEnabled || !proximityActive || !position?.coords || !nearbyAttractions.length) return;
    if (currentNearbyAlertId && nearbyAlert && !nearbyAlert.hidden) return;

    const radius = getProximityRadiusMeters();
    const { latitude, longitude } = position.coords;

    let candidate = null;
    let candidateDistance = Infinity;
    for (const attraction of nearbyAttractions) {
      if (routeActive && routeAlertedIds.has(String(attraction.osmId))) continue;
      if (!routeActive && wasAttractionAlertedRecently(attraction.osmId)) continue;
      const distance = distanceMeters(latitude, longitude, attraction.lat, attraction.lon);
      if (distance <= radius && distance < candidateDistance) {
        candidate = attraction;
        candidateDistance = distance;
      }
    }

    if (candidate) {
      showNearbyAttractionAlert(candidate, candidateDistance);
    }
  }

  async function refreshNearbyAttractions(position) {
    if (!osmEnabled || !position?.coords || nearbyFetchInFlight) return;
    nearbyFetchInFlight = true;

    const { latitude, longitude } = position.coords;
    const radius = Math.max(NEARBY_FETCH_MIN_RADIUS, getProximityRadiusMeters() + 5000);
    try {
      nearbyAttractions = await getAttractionsNear(latitude, longitude, radius);
      lastNearbyFetchPosition = { lat: latitude, lon: longitude };
      lastNearbyFetchAt = Date.now();
      if (currentMapMode === 'all' && !routeActive) {
        updateMainAttractionLayer(`Restauracje w pobliżu GPS: ${nearbyAttractions.length}`);
      }
      checkProximity(position);
    } catch (error) {
      console.warn('Nie udało się odczytać restauracji w pobliżu:', error);
      // Nie usuwamy poprzedniej listy nearbyAttractions przy chwilowym błędzie.
      // Dzięki temu istniejące znaczniki i alerty pozostają dostępne.
      const keptCount = new Set(
        [...nearbyAttractions, ...viewportAttractions]
          .filter((item) => item?.osmId)
          .map((item) => item.osmId)
      ).size;
      if (currentMapMode === 'all' && !routeActive) updateMainAttractionLayer();
      showLocationMessage(
        keptCount
          ? `Nie udało się odświeżyć bazy. Zachowuję ${keptCount} wcześniej wczytanych punktów.`
          : 'Nie udało się odczytać bazy restauracji. Spróbuję ponownie automatycznie.',
        !keptCount
      );
    } finally {
      nearbyFetchInFlight = false;
    }
  }

  function keepMonitoredPositionVisible(position) {
    if (!map || mapScreen?.hidden || currentMapMode !== 'all' || !position?.coords || !mapAutoFollowEnabled) return;

    const lat = Number(position.coords.latitude);
    const lon = Number(position.coords.longitude);
    if (!Number.isFinite(lat) || !Number.isFinite(lon)) return;

    // v1035: skala mapy pozostaje dokładnie taka, jak ustawił ją użytkownik.
    // Kropka może swobodnie przesuwać się po ekranie, ale po dojściu do strefy
    // przy krawędzi mapa przesuwa się tak, aby bieżąca pozycja wróciła do środka.
    const point = map.latLngToContainerPoint([lat, lon]);
    const size = map.getSize();
    const marginX = Math.min(FOLLOW_EDGE_MARGIN_PX, Math.max(40, size.x * 0.14));
    const marginY = Math.min(FOLLOW_EDGE_MARGIN_PX, Math.max(40, size.y * 0.14));
    const reachedEdgeZone =
      point.x <= marginX ||
      point.x >= size.x - marginX ||
      point.y <= marginY ||
      point.y >= size.y - marginY;

    if (!reachedEdgeZone || mapAutoRecenterInProgress) return;

    mapAutoRecenterInProgress = true;
    const releaseRecenter = () => {
      mapAutoRecenterInProgress = false;
    };

    map.once('moveend', releaseRecenter);
    map.panTo([lat, lon], { animate: true, duration: 0.4, noMoveStart: true });
    // Zabezpieczenie na wypadek, gdyby konkretna przeglądarka nie wysłała moveend.
    setTimeout(releaseRecenter, 700);
  }

  function handleMonitoredPosition(position) {
    lastMonitorPosition = position;
    updateMonitoredLocationVisual(position);
    setLocationButtonState('active');
    keepMonitoredPositionVisible(position);
    updateAttractionPreview(position);
    if (navigationActive) updateNavigationFromPosition(position);

    const { latitude, longitude } = position.coords;
    const movedSinceFetch = lastNearbyFetchPosition
      ? distanceMeters(
          latitude,
          longitude,
          lastNearbyFetchPosition.lat,
          lastNearbyFetchPosition.lon
        )
      : Infinity;
    const fetchExpired = Date.now() - lastNearbyFetchAt > NEARBY_REFRESH_TIME;

    if (routeActive) {
      checkProximity(position);
    } else if (movedSinceFetch >= NEARBY_REFRESH_DISTANCE || fetchExpired || !nearbyAttractions.length) {
      refreshNearbyAttractions(position);
    } else {
      checkProximity(position);
    }
  }

  function handleMonitoredLocationError(error) {
    setLocationButtonState('idle');
    showLocationMessage(geolocationErrorText(error), true);
    if (error?.code === 1) stopProximityMonitoring(false);
  }

  function startProximityMonitoring(showMessage = true) {
    if (!navigator.geolocation) {
      showLocationMessage('To urządzenie nie obsługuje geolokalizacji.', true);
      return;
    }
    if (proximityWatchId != null) {
      setProximityUi(true);
      return;
    }

    setProximityUi(true);
    setLocationButtonState('locating');
    if (showMessage) {
      showLocationMessage(`Monitoring GPS włączony · alert ${formatDistance(getProximityRadiusMeters())}.`);
    }

    proximityWatchId = navigator.geolocation.watchPosition(
      handleMonitoredPosition,
      handleMonitoredLocationError,
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 5000
      }
    );
  }

  function stopProximityMonitoring(showMessage = false) {
    if (proximityWatchId != null && navigator.geolocation) {
      navigator.geolocation.clearWatch(proximityWatchId);
    }
    proximityWatchId = null;
    setProximityUi(false);
    setLocationButtonState('idle');
    hideNearbyAlert();
    if (showMessage) showLocationMessage('Monitoring GPS został zatrzymany.');
  }

  function popupHtml(point) {
    const info = CATEGORY_INFO[point.category] || CATEGORY_INFO.revolution;
    const title = point.name?.trim() || info.label;
    const note = point.note?.trim();
    const statusInfo = point.category === 'revolution'
      ? getRestaurantStatus(point, { savedOverride: Boolean(point.osmId) })
      : null;
    const popupIcon = statusInfo ? RESTAURANT_MARKER_ICONS[statusInfo.code] : info.icon;
    return `
      <div class="place-popup">
        <div class="place-popup-head">
          <img src="${popupIcon}" alt="" />
          <div>
            <strong>${escapeHtml(title)}</strong>
            <span>${escapeHtml(info.label)}</span>
          </div>
        </div>
        ${statusInfo ? getStatusBadgeHtml(statusInfo) : ''}
        <div class="place-popup-date">Dodano: ${escapeHtml(formatDisplayDate(point.date))}</div>
        <div class="place-popup-coords">${Number(point.lat).toFixed(6)}, ${Number(point.lon).toFixed(6)}</div>
        ${note ? `<div class="place-popup-note">${noteHtml(note)}</div>` : ''}
        <button class="place-popup-edit" type="button" data-route-point-id="${escapeHtml(point.id)}">PROWADŹ</button>
        <button class="place-popup-edit" type="button" data-wikipedia-query="${escapeHtml(title)}">SZUKAJ W SIECI</button>
        <button class="place-popup-edit" type="button" data-edit-point-id="${escapeHtml(point.id)}">EDYTUJ</button>
      </div>
    `;
  }

  function renderStoredPoints() {
    if (!map || !window.L) return;

    if (!pointLayer) pointLayer = L.layerGroup().addTo(map);
    pointLayer.clearLayers();
    pointMarkerById = new Map();

    loadPoints().forEach((point) => {
      if (!Number.isFinite(Number(point.lat)) || !Number.isFinite(Number(point.lon))) return;
      if (!attractionMatchesActiveFilter(point.category)) return;
      const marker = L.marker([Number(point.lat), Number(point.lon)], {
        icon: createCategoryIcon(point.category, point),
        title: point.name || (CATEGORY_INFO[point.category]?.label ?? 'Miejsce'),
        riseOnHover: true
      }).addTo(pointLayer);
      marker.bindPopup(popupHtml(point), { maxWidth: 320, minWidth: 210 });
      pointMarkerById.set(String(point.id), marker);
    });

    if (currentMapMode === 'all' && osmAttractions.size) {
      renderExternalAttractions([...osmAttractions.values()]);
    } else if (currentMapMode === 'mine') {
      externalLayer?.clearLayers();
      osmMarkerById = new Map();
    }
  }

  // v1034: w pionie mapa zaczyna się pod całym panelem. Na telefonie w poziomie
  // panel staje po lewej (ok. 1/4 ekranu), a mapa zajmuje prawą część (ok. 3/4).
  function syncMapContentTop() {
    if (!mapScreen || !mapTopPanel || mapScreen.hidden) return;
    const screenRect = mapScreen.getBoundingClientRect();
    const panelRect = mapTopPanel.getBoundingClientRect();
    const sidePanelLayout = window.matchMedia('(orientation: landscape) and (max-height: 650px)').matches;

    if (sidePanelLayout) {
      const left = Math.max(0, Math.ceil(panelRect.right - screenRect.left + 6));
      mapScreen.style.setProperty('--map-content-top', '0px');
      mapScreen.style.setProperty('--map-content-left', `${left}px`);
    } else {
      const top = Math.max(0, Math.ceil(panelRect.bottom - screenRect.top + 6));
      mapScreen.style.setProperty('--map-content-top', `${top}px`);
      mapScreen.style.setProperty('--map-content-left', '0px');
    }
    requestAnimationFrame(() => map?.invalidateSize());
  }

  function createMap() {
    if (map || !window.L) return;

    map = L.map('map', {
      zoomControl: true,
      attributionControl: true,
      minZoom: 3,
      maxZoom: 19
    }).setView([52.05, 19.15], 6);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap contributors</a>'
    }).addTo(map);

    L.control.scale({
      imperial: false,
      metric: true,
      position: 'bottomleft'
    }).addTo(map);

    const signatureControl = L.control({ position: 'bottomleft' });
    signatureControl.onAdd = () => {
      const element = L.DomUtil.create('div', 'rn-app-signature');
      element.textContent = 'Mariusz Gębka - RN APP 2026.';
      element.setAttribute('aria-label', 'Mariusz Gębka - RN APP 2026.');
      return element;
    };
    signatureControl.addTo(map);

    externalLayer = L.layerGroup().addTo(map);
    renderStoredPoints();

    // Ręczne PRZESUNIĘCIE mapy oznacza: użytkownik chce oglądać inne miejsce.
    // Wtedy śledzenie widoku wyłączamy do kolejnego WYCENTRUJ. Sam zoom nie wyłącza
    // śledzenia — można oddalić mapę i nadal jechać z kropką wracającą ze skraju do środka.
    const pauseAutoFollowFromUser = () => {
      if (mapProgrammaticMove) return;
      mapAutoFollowEnabled = false;
      mapAutoRecenterInProgress = false;
    };
    map.on('dragstart', pauseAutoFollowFromUser);

    map.on('moveend zoomend', () => scheduleViewportAttractions());
    scheduleViewportAttractions(250);
  }

  function showLocationMessage(text, isError = false) {
    if (!locationMessage) return;
    clearTimeout(locationMessageTimer);
    locationMessage.textContent = text;
    locationMessage.classList.toggle('is-error', isError);
    locationMessage.hidden = false;
    locationMessageTimer = setTimeout(() => {
      locationMessage.hidden = true;
    }, 5000);
  }

  function showAddMessage(text, isError = false) {
    if (!addMessage) return;
    clearTimeout(addMessageTimer);
    addMessage.textContent = text;
    addMessage.classList.toggle('is-error', isError);
    addMessage.hidden = false;
    addMessageTimer = setTimeout(() => {
      addMessage.hidden = true;
    }, 4000);
  }

  function showEditMessage(text, isError = false) {
    if (!editMessage) return;
    clearTimeout(editMessageTimer);
    editMessage.textContent = text;
    editMessage.classList.toggle('is-error', isError);
    editMessage.hidden = false;
    editMessageTimer = setTimeout(() => {
      editMessage.hidden = true;
    }, 4000);
  }

  function getCurrentPosition() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject({ code: 0, message: 'Geolokalizacja nie jest obsługiwana.' });
        return;
      }
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000
      });
    });
  }

  function geolocationErrorText(error) {
    if (error?.code === 1) return 'Brak zgody na dostęp do lokalizacji.';
    if (error?.code === 2) return 'Lokalizacja jest teraz niedostępna.';
    if (error?.code === 3) return 'Przekroczono czas ustalania lokalizacji.';
    return 'Nie udało się ustalić lokalizacji.';
  }

  function setLocationButtonState(state) {
    if (!mapLocationButton) return;
    mapLocationButton.classList.toggle('is-locating', state === 'locating');
    mapLocationButton.classList.toggle('is-active', state === 'active');
    mapLocationButton.disabled = state === 'locating';
  }

  async function centerOnCurrentLocation() {
    if (!map) return;
    setLocationButtonState('locating');
    showLocationMessage('Ustalam Twoją lokalizację…');

    try {
      let position = lastMonitorPosition;
      if (!position?.coords) {
        position = await getCurrentPosition();
        lastMonitorPosition = position;
        updateMonitoredLocationVisual(position);
        updateAttractionPreview(position);
        if (!routeActive) {
          lastNearbyFetchAt = 0;
          refreshNearbyAttractions(position);
        }
      }

      const { latitude, longitude, accuracy } = position.coords;
      mapAutoFollowEnabled = true;
      mapProgrammaticMove = true;
      map.setView([latitude, longitude], 15, { animate: true });
      mapProgrammaticMove = false;
      setLocationButtonState('active');
      showLocationMessage(`Wycentrowano na Twojej pozycji (dokładność ok. ${Math.round(accuracy || 0)} m).`);
    } catch (error) {
      setLocationButtonState('idle');
      showLocationMessage(geolocationErrorText(error), true);
    }
  }

  function setMethod(method, shouldLocate = false) {
    currentMethod = method === 'auto' ? 'auto' : 'manual';
    manualMethodButton?.classList.toggle('is-active', currentMethod === 'manual');
    autoMethodButton?.classList.toggle('is-active', currentMethod === 'auto');
    if (coordinatesBox) coordinatesBox.hidden = currentMethod !== 'manual';
    if (autoLocationBox) autoLocationBox.hidden = currentMethod !== 'auto';

    if (currentMethod === 'auto' && shouldLocate) {
      fetchAddLocation();
    }
  }

  function setCategory(category) {
    if (!CATEGORY_INFO[category]) return;
    currentCategory = category;
    categoryGrid?.querySelectorAll('.category-button').forEach((button) => {
      const active = button.dataset.category === category;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  }

  function setEditCategory(category) {
    if (!CATEGORY_INFO[category]) return;
    editCategory = category;
    editCategoryGrid?.querySelectorAll('.edit-category-button').forEach((button) => {
      const active = button.dataset.category === category;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  }

  async function fetchAddLocation() {
    if (!gpsAddButton || !gpsResult) return;
    gpsAddButton.disabled = true;
    gpsAddButton.classList.add('is-locating');
    gpsResult.classList.remove('is-error');
    gpsResult.textContent = 'Ustalam Twoją lokalizację…';
    autoCoords = null;

    try {
      const position = await getCurrentPosition();
      const { latitude, longitude, accuracy } = position.coords;
      autoCoords = { lat: latitude, lon: longitude, accuracy };
      gpsResult.textContent = `Gotowe: ${latitude.toFixed(6)}, ${longitude.toFixed(6)} · dokładność ok. ${Math.round(accuracy)} m`;
    } catch (error) {
      gpsResult.classList.add('is-error');
      gpsResult.textContent = geolocationErrorText(error);
    } finally {
      gpsAddButton.disabled = false;
      gpsAddButton.classList.remove('is-locating');
    }
  }

  function parseCoordinate(value) {
    const normalized = String(value ?? '').trim().replace(',', '.');
    if (!normalized) return NaN;
    return Number(normalized);
  }

  function resetAddForm() {
    if (placeName) placeName.value = '';
    if (latitudeInput) latitudeInput.value = '';
    if (longitudeInput) longitudeInput.value = '';
    if (dateInput) dateInput.value = localDateString();
    if (gpsResult) {
      gpsResult.classList.remove('is-error');
      gpsResult.textContent = 'Lokalizacja nie została jeszcze pobrana.';
    }
    autoCoords = null;
    setMethod('manual');
    setCategory('revolution');
    if (addMessage) addMessage.hidden = true;
  }

  function showAddScreen() {
    if (!addScreen || !startScreen) return;
    resetAddForm();
    startScreen.hidden = true;
    if (mapScreen) mapScreen.hidden = true;
    if (editScreen) editScreen.hidden = true;
    addScreen.hidden = false;
    requestAnimationFrame(() => placeName?.focus({ preventScroll: true }));
  }

  function hideAddScreen() {
    if (!addScreen || !startScreen) return;
    addScreen.hidden = true;
    startScreen.hidden = false;
  }

  function applyMapMode(mode) {
    currentMapMode = mode === 'mine' ? 'mine' : 'all';
    const mineOnly = currentMapMode === 'mine';

    if (mapModeBadge) {
      mapModeBadge.textContent = `ODWIEDZONE · ${loadPoints().length}`;
      mapModeBadge.classList.add('is-my-places');
      mapModeBadge.hidden = !mineOnly;
    }

    if (myPlacesTransfer) myPlacesTransfer.hidden = !mineOnly;

    if (mapLocationButton) mapLocationButton.hidden = mineOnly;
    if (routeButton) routeButton.hidden = mineOnly;
    if (proximityButton) proximityButton.hidden = true;
    if (osmRefreshButton) osmRefreshButton.hidden = true;
    if (attractionPreviewButton) attractionPreviewButton.hidden = mineOnly;
    updateOsmButtonUi();
    if (proximityRadiusWrap) proximityRadiusWrap.hidden = mineOnly;
    if (osmStatus) osmStatus.hidden = true;

    if (mineOnly) {
      hideRoutePanel();
      hideAttractionPreview();
      attractionPreviewItems = [];
      setAttractionPreviewButton(null);
      clearTimeout(viewportFetchTimer);
      viewportFetchSequence += 1;
      osmAttractions = new Map();
      viewportAttractions = [];
      externalLayer?.clearLayers();
      osmMarkerById = new Map();
      hideNearbyAlert();
      stopProximityMonitoring(false);
      setProximityUi(false);

      if (map && userLocationMarker) {
        map.removeLayer(userLocationMarker);
        userLocationMarker = null;
      }
      if (map && userAccuracyCircle) {
        map.removeLayer(userAccuracyCircle);
        userAccuracyCircle = null;
      }
    }
  }

  function showMyPlacesMap() {
    showMap({ mode: 'mine' });
  }

  function showMap(options = {}) {
    if (!mapScreen || !startScreen) return;
    // Wejście na mapę nie odbiera użytkownikowi kontroli. Śledzenie widoku
    // zostanie włączone dopiero po naciśnięciu WYCENTRUJ.
    mapAutoFollowEnabled = false;
    applyMapMode(options.mode || 'all');
    startScreen.hidden = true;
    if (addScreen) addScreen.hidden = true;
    if (editScreen) editScreen.hidden = true;
    mapScreen.hidden = false;
    syncMapContentTop();
    createMap();
    renderStoredPoints();

    const showingRequestedPoint = Number.isFinite(options.lat) && Number.isFinite(options.lon);
    const mineOnly = currentMapMode === 'mine';


    requestAnimationFrame(() => {
      map?.invalidateSize();

      if (showingRequestedPoint) {
        map?.setView([options.lat, options.lon], options.zoom || 16, { animate: true });
      } else if (mineOnly) {
        map?.setView([52.05, 19.15], 6, { animate: false });
      }

      if (options.openPointId != null) {
        setTimeout(() => pointMarkerById.get(String(options.openPointId))?.openPopup(), 250);
      }

      if (mineOnly) {
        externalLayer?.clearLayers();
        updateOsmStatus('');
        if (loadPoints().length === 0) {
          showLocationMessage('Nie masz jeszcze zapisanych miejsc. Dodaj pierwszy punkt przyciskiem DODAJ.');
        }
        return;
      }

      updateOsmButtonUi();
      if (routeActive && osmEnabled) {
        renderExternalAttractions(routeAttractions);
        updateOsmStatus(`Restauracje do ${formatDistance(getProximityRadiusMeters())} od trasy: ${routeAttractions.length} · alert aktywny`);
        } else if (osmEnabled) {
        // Baza jest lokalna, więc od razu pokaż restauracje z aktualnie widocznego obszaru.
        // GPS niezależnie od tego będzie później aktualizował listę restauracji w pobliżu.
        scheduleViewportAttractions(0);
      } else {
        clearOsmAttractions();
        updateOsmStatus('Baza restauracji: wyłączona');
      }
      startProximityMonitoring(true);
      if (osmEnabled && lastMonitorPosition?.coords) {
        updateAttractionPreview(lastMonitorPosition);
      }
      if (osmEnabled && lastMonitorPosition?.coords && !routeActive) {
        lastNearbyFetchAt = 0;
        refreshNearbyAttractions(lastMonitorPosition);
      }
    });
  }

  function hideMap() {
    if (!mapScreen || !startScreen) return;
    stopProximityMonitoring(false);
    hideRoutePanel();
    hideAttractionPreview();
    mapScreen.hidden = true;
    startScreen.hidden = false;
  }

  function saveNewPlace() {
    let lat;
    let lon;

    if (currentMethod === 'manual') {
      lat = parseCoordinate(latitudeInput?.value);
      lon = parseCoordinate(longitudeInput?.value);
      if (!Number.isFinite(lat) || lat < -90 || lat > 90) {
        showAddMessage('Podaj prawidłową szerokość geograficzną od -90 do 90.', true);
        latitudeInput?.focus();
        return;
      }
      if (!Number.isFinite(lon) || lon < -180 || lon > 180) {
        showAddMessage('Podaj prawidłową długość geograficzną od -180 do 180.', true);
        longitudeInput?.focus();
        return;
      }
    } else {
      if (!autoCoords) {
        showAddMessage('Najpierw pobierz swoją lokalizację.', true);
        return;
      }
      lat = autoCoords.lat;
      lon = autoCoords.lon;
    }

    const date = dateInput?.value || localDateString();
    const info = CATEGORY_INFO[currentCategory] || CATEGORY_INFO.revolution;
    const pointId = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    const point = {
      id: pointId,
      osmId: `user/${pointId}`,
      name: placeName?.value.trim() || info.label,
      category: currentCategory,
      date,
      note: '',
      lat,
      lon,
      source: currentMethod,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const points = loadPoints();
    points.push(point);
    savePoints(points);
    upsertUserAttractionFromPoint(point);
    showAddMessage('Restauracja została zapisana i dopisana do Twojej lokalnej bazy.');

    setTimeout(() => {
      showMap({ lat, lon, zoom: 16, openPointId: point.id });
    }, 250);
  }

  function showEditScreen(pointId) {
    const point = findPoint(pointId);
    if (!point || !editScreen) return;

    editingPointId = String(point.id);
    editReturnMapMode = currentMapMode;
    if (editPlaceName) editPlaceName.value = point.name || '';
    if (editLatitudeInput) editLatitudeInput.value = Number(point.lat).toFixed(6);
    if (editLongitudeInput) editLongitudeInput.value = Number(point.lon).toFixed(6);
    if (editDateInput) editDateInput.value = point.date || localDateString();
    if (editNoteInput) editNoteInput.value = point.note || '';
    setEditCategory(point.category || 'revolution');
    if (editMessage) editMessage.hidden = true;

    stopProximityMonitoring(false);
    if (startScreen) startScreen.hidden = true;
    if (addScreen) addScreen.hidden = true;
    if (mapScreen) mapScreen.hidden = true;
    editScreen.hidden = false;

    requestAnimationFrame(() => editPlaceName?.focus({ preventScroll: true }));
  }

  function closeEditToMap(openPoint = true) {
    const point = editingPointId ? findPoint(editingPointId) : null;
    if (editScreen) editScreen.hidden = true;
    editingPointId = null;
    if (point && openPoint) {
      showMap({ mode: editReturnMapMode, lat: Number(point.lat), lon: Number(point.lon), zoom: Math.max(map?.getZoom() || 15, 15), openPointId: point.id });
    } else {
      showMap({ mode: editReturnMapMode });
    }
  }

  function saveEditedPoint() {
    if (!editingPointId) return;
    const lat = parseCoordinate(editLatitudeInput?.value);
    const lon = parseCoordinate(editLongitudeInput?.value);

    if (!Number.isFinite(lat) || lat < -90 || lat > 90) {
      showEditMessage('Podaj prawidłową szerokość geograficzną od -90 do 90.', true);
      editLatitudeInput?.focus();
      return;
    }
    if (!Number.isFinite(lon) || lon < -180 || lon > 180) {
      showEditMessage('Podaj prawidłową długość geograficzną od -180 do 180.', true);
      editLongitudeInput?.focus();
      return;
    }

    const points = loadPoints();
    const index = points.findIndex((point) => String(point.id) === String(editingPointId));
    if (index < 0) {
      showEditMessage('Nie znaleziono tego punktu.', true);
      return;
    }

    const info = CATEGORY_INFO[editCategory] || CATEGORY_INFO.revolution;
    points[index] = {
      ...points[index],
      name: editPlaceName?.value.trim() || info.label,
      category: editCategory,
      date: editDateInput?.value || localDateString(),
      note: editNoteInput?.value.trim() || '',
      lat,
      lon,
      updatedAt: new Date().toISOString()
    };

    const saved = points[index];
    savePoints(points);
    if (loadUserAttractionDb().some((item) => String(item.id) === String(saved.osmId || ''))) {
      upsertUserAttractionFromPoint(saved);
    }
    renderStoredPoints();
    showEditMessage('Zmiany zostały zapisane.');

    setTimeout(() => {
      if (editScreen) editScreen.hidden = true;
      editingPointId = null;
      showMap({ mode: editReturnMapMode, lat, lon, zoom: 16, openPointId: saved.id });
    }, 250);
  }

  function deleteEditedPoint() {
    if (!editingPointId) return;
    const point = findPoint(editingPointId);
    if (!point) return;

    const title = point.name?.trim() || (CATEGORY_INFO[point.category]?.label ?? 'ten punkt');
    const confirmed = window.confirm(`Czy na pewno usunąć punkt „${title}”?\n\nTej operacji nie można cofnąć.`);
    if (!confirmed) return;

    removeUserAttractionForPoint(point);
    const points = loadPoints().filter((item) => String(item.id) !== String(editingPointId));
    savePoints(points);
    editingPointId = null;
    if (editScreen) editScreen.hidden = true;
    renderStoredPoints();
    showMap({ mode: editReturnMapMode });
    setTimeout(() => showLocationMessage('Punkt został usunięty.'), 150);
  }

  addButton?.addEventListener('click', showAddScreen);
  addBackButton?.addEventListener('click', hideAddScreen);
  manualMethodButton?.addEventListener('click', () => setMethod('manual'));
  autoMethodButton?.addEventListener('click', () => setMethod('auto', true));
  gpsAddButton?.addEventListener('click', fetchAddLocation);
  savePlaceButton?.addEventListener('click', saveNewPlace);

  categoryGrid?.querySelectorAll('.category-button').forEach((button) => {
    button.addEventListener('click', () => setCategory(button.dataset.category));
  });

  editCategoryGrid?.querySelectorAll('.edit-category-button').forEach((button) => {
    button.addEventListener('click', () => setEditCategory(button.dataset.category));
  });

  editBackButton?.addEventListener('click', () => closeEditToMap(true));
  saveEditButton?.addEventListener('click', saveEditedPoint);
  deletePlaceButton?.addEventListener('click', deleteEditedPoint);

  document.addEventListener('click', (event) => {
    const sourceButton = event.target.closest('[data-source-url]');
    if (sourceButton) {
      event.preventDefault();
      event.stopPropagation();
      const sourceUrl = String(sourceButton.dataset.sourceUrl || '').trim();
      if (/^https?:\/\//i.test(sourceUrl)) {
        const sourceWindow = window.open(sourceUrl, '_blank', 'noopener,noreferrer');
        if (sourceWindow) sourceWindow.opener = null;
      }
      return;
    }

    const wikipediaButton = event.target.closest('[data-wikipedia-query]');
    if (wikipediaButton) {
      event.preventDefault();
      event.stopPropagation();
      const query = String(wikipediaButton.dataset.wikipediaQuery || '').trim();
      if (query) {
        const url = `https://www.google.com/search?q=${encodeURIComponent(query + ' Kuchenne Rewolucje')}`;
        const searchWindow = window.open(url, '_blank', 'noopener,noreferrer');
        if (searchWindow) searchWindow.opener = null;
      }
      return;
    }

    const routeOsmButton = event.target.closest('[data-route-osm-id]');
    if (routeOsmButton) {
      event.preventDefault();
      event.stopPropagation();
      const attraction = getOsmAttractionById(routeOsmButton.dataset.routeOsmId);
      if (attraction) {
        map?.closePopup();
        if (routeDestinationInput) routeDestinationInput.value = attraction.name || '';
        showRouteModeChooser({
          name: attraction.name || 'Restauracja',
          lat: Number(attraction.lat),
          lon: Number(attraction.lon)
        });
      }
      return;
    }

    const routePointButton = event.target.closest('[data-route-point-id]');
    if (routePointButton) {
      event.preventDefault();
      event.stopPropagation();
      const point = findPoint(routePointButton.dataset.routePointId);
      if (point) {
        map?.closePopup();
        if (routeDestinationInput) routeDestinationInput.value = point.name || '';
        showRouteModeChooser({
          name: point.name || (CATEGORY_INFO[point.category]?.label ?? 'Moje miejsce'),
          lat: Number(point.lat),
          lon: Number(point.lon)
        });
      }
      return;
    }

    const editButton = event.target.closest('[data-edit-point-id]');
    if (editButton) {
      event.preventDefault();
      event.stopPropagation();
      map?.closePopup();
      showEditScreen(editButton.dataset.editPointId);
      return;
    }

    const addOsmButton = event.target.closest('[data-add-osm-id]');
    if (addOsmButton) {
      event.preventDefault();
      event.stopPropagation();
      const attraction = getOsmAttractionById(addOsmButton.dataset.addOsmId);
      if (attraction) {
        map?.closePopup();
        addOsmAttractionToMine(attraction, true);
      }
    }
  });

  mapLegend?.querySelectorAll('[data-map-filter]').forEach((button) => {
    button.addEventListener('click', () => toggleAttractionFilter(button.dataset.mapFilter));
  });
  updateMapLegendUi();

  routeModeButtons.forEach((button) => {
    button.addEventListener('click', () => startPendingRouteWithMode(button.dataset.routeMode));
  });
  routeModeClose?.addEventListener('click', () => hideRouteModeChooser());
  routeModeOverlay?.addEventListener('click', (event) => {
    if (event.target === routeModeOverlay) hideRouteModeChooser();
  });

  routeButton?.addEventListener('click', showRoutePanel);
  routePanelClose?.addEventListener('click', hideRoutePanel);
  routeSearchButton?.addEventListener('click', searchRouteDestination);
  routeDestinationInput?.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      searchRouteDestination();
    }
  });
  routeClearButton?.addEventListener('click', () => clearRoute({ refreshMap: true }));
  navigationStopButton?.addEventListener('click', () => {
    stopNavigation({ keepRoute: false });
    showLocationMessage('Nawigacja zakończona. Trasa usunięta z mapy.');
  });


  proximityButton?.addEventListener('click', () => startProximityMonitoring(true));

  proximityRadius?.addEventListener('change', () => {
    const radius = getProximityRadiusMeters();
    localStorage.setItem(PROXIMITY_RADIUS_KEY, String(radius));
    if (lastMonitorPosition?.coords) updateAttractionPreview(lastMonitorPosition);

    if (proximityActive) {
      showLocationMessage(`Odległość alertu: ${formatDistance(radius)}.`);
      lastNearbyFetchAt = 0;
      if (routeActive && routeCoordinates.length) {
        refreshRouteAttractionsForRadius();
      } else if (lastMonitorPosition) {
        refreshNearbyAttractions(lastMonitorPosition);
      }
    }
  });

  attractionPreviewButton?.addEventListener('click', showAttractionPreview);
  attractionPreviewClose?.addEventListener('click', hideAttractionPreview);
  attractionPreviewOverlay?.addEventListener('click', (event) => {
    if (event.target === attractionPreviewOverlay) hideAttractionPreview();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    if (routeModeOverlay && !routeModeOverlay.hidden) {
      hideRouteModeChooser();
      return;
    }
    if (attractionPreviewOverlay && !attractionPreviewOverlay.hidden) {
      hideAttractionPreview();
      attractionPreviewButton?.focus({ preventScroll: true });
    }
  });
  attractionPreviewList?.addEventListener('click', (event) => {
    const button = event.target.closest('[data-preview-route-id]');
    if (!button) return;
    const item = attractionPreviewItems.find(
      (entry) => String(entry.attraction.osmId) === String(button.dataset.previewRouteId)
    );
    if (!item) return;

    hideAttractionPreview();
    if (routeDestinationInput) routeDestinationInput.value = item.attraction.name || '';
    showRouteModeChooser({
      name: item.attraction.name || (CATEGORY_INFO[item.attraction.category]?.label ?? 'Restauracja'),
      lat: Number(item.attraction.lat),
      lon: Number(item.attraction.lon)
    });
  });

  nearbyAlertShow?.addEventListener('click', () => {
    const attraction = getOsmAttractionById(currentNearbyAlertId);
    hideNearbyAlert();
    if (attraction) focusOsmAttraction(attraction);
  });

  nearbyAlertAdd?.addEventListener('click', () => {
    const attraction = getOsmAttractionById(currentNearbyAlertId);
    hideNearbyAlert();
    if (attraction) addOsmAttractionToMine(attraction, true);
  });

  nearbyAlertDismiss?.addEventListener('click', hideNearbyAlert);

  mapButton?.addEventListener('click', () => showMap({ mode: 'all' }));
  myPlacesButton?.addEventListener('click', showMyPlacesMap);
  exportMyPlacesButton?.addEventListener('click', () => exportMyPlaces());
  importMyPlacesButton?.addEventListener('click', () => importMyPlacesInput?.click());
  importMyPlacesInput?.addEventListener('change', () => importMyPlacesFile(importMyPlacesInput.files?.[0]));
  mapBackButton?.addEventListener('click', hideMap);
  mapLocationButton?.addEventListener('click', centerOnCurrentLocation);

  window.addEventListener('resize', () => {
    if (mapScreen && !mapScreen.hidden) {
      syncMapContentTop();
      map?.invalidateSize();
    }
  });

  if (mapTopPanel && typeof ResizeObserver !== 'undefined') {
    const mapTopPanelObserver = new ResizeObserver(() => {
      if (mapScreen && !mapScreen.hidden) syncMapContentTop();
    });
    mapTopPanelObserver.observe(mapTopPanel);
  }

  if (dateInput && !dateInput.value) dateInput.value = localDateString();

  if (proximityRadius) {
    const savedRadius = Number(localStorage.getItem(PROXIMITY_RADIUS_KEY) || 5000);
    proximityRadius.value = String([5000, 10000, 15000, 20000].includes(savedRadius) ? savedRadius : 5000);
  }

  osmEnabled = true;
  saveOsmEnabled();

  setRouteTravelMode(localStorage.getItem(ROUTE_MODE_KEY) || 'car', { persist: false });
  activeRouteMode = routeTravelMode;
  updateNavigationModeUi();

  setCategory(currentCategory);
  setEditCategory(editCategory);
  setProximityUi(false);
  setAttractionPreviewButton(null);

  // PWA: rejestracja Service Workera i szybkie wykrywanie nowej wersji.
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
      try {
        const registration = await navigator.serviceWorker.register('./service-worker.js?v=1000', {
          scope: './',
          updateViaCache: 'none'
        });
        await registration.update();
      } catch (error) {
        console.warn('Nie udało się zarejestrować Service Workera:', error);
      }
    });
  }
})();
