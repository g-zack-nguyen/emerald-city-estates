/*! Emerald City Estates 1.0.0 (build 1b6d8b1be4be65c7). An original game; no affiliation with any company. */
(function (ECE) {
  'use strict';
  ECE.BUILD = '1b6d8b1be4be65c7';
})(window.ECE = window.ECE || {});
;
(function (ECE) {
  'use strict';

  var LAYOUT = {
    count: 40,
    corners: [0, 8, 20, 28],
    top: [1, 2, 3, 4, 5, 6, 7],
    right: [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
    bottom: [21, 22, 23, 24, 25, 26, 27],
    left: [29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39],
    widthUnits: 10,
    heightUnits: 14
  };

  var DISTRICTS = [
    { id: 'tacoma',      name: 'Tacoma',       tag: 'TA', color: '#1C9AA0', build: 45,  spaces: [1, 3, 4] },
    { id: 'everett',     name: 'Everett',      tag: 'EV', color: '#E5822B', build: 55,  spaces: [7, 9, 10] },
    { id: 'westseattle', name: 'West Seattle', tag: 'WS', color: '#D4A21B', build: 75, spaces: [12, 13, 15] },
    { id: 'ballard',     name: 'Ballard',      tag: 'BA', color: '#2F6FD6', build: 90, spaces: [17, 18, 19] },
    { id: 'capitolhill', name: 'Capitol Hill', tag: 'CH', color: '#8A4FCB', build: 115, spaces: [21, 23, 24] },
    { id: 'downtown',    name: 'Downtown',     tag: 'DT', color: '#C8373B', build: 140, spaces: [27, 29, 30] },
    { id: 'bellevue',    name: 'Bellevue',     tag: 'BV', color: '#D04A92', build: 170, spaces: [32, 33, 34] },
    { id: 'medina',      name: 'Medina',       tag: 'MD', color: '#12945F', build: 200, spaces: [36, 38, 39] }
  ];

  function street(i, name, label, area, district, price, rent, about) {
    return { i: i, kind: 'street', name: name, label: label, area: area, district: district, price: price, rent: rent, about: about };
  }

  var SPACES = [
    { i: 0, kind: 'start', name: 'START', label: ['START'], note: 'Payday! Get $250 each time you pass or land here.' },
    street(1, 'Dock St', ['Dock', 'St'], 'Tacoma', 'tacoma', 75, [6, 25, 80, 195, 270, 370],
      'Downtown Tacoma\u2019s street along the Thea Foss Waterway.'),
    { i: 2, kind: 'card', deck: 'rain', name: 'Rain Check', label: ['Rain', 'Check'] },
    street(3, 'Commerce St', ['Commerce', 'St'], 'Tacoma', 'tacoma', 80, [6, 25, 80, 200, 280, 370],
      'Runs from downtown Tacoma to the Dome District.'),
    street(4, 'Ruston Way', ['Ruston', 'Way'], 'Tacoma', 'tacoma', 90, [7, 30, 85, 210, 290, 380],
      'Tacoma\u2019s waterfront walk on Commencement Bay.'),
    { i: 5, kind: 'transit', mode: 'train', name: 'Tacoma Dome Station', label: ['Tacoma', 'Dome'], area: 'Tacoma', price: 230,
      about: 'Trains stop here, a short walk from the Tacoma Dome.' },
    { i: 6, kind: 'tax', name: 'Sales Tax', label: ['Sales', 'Tax'], amount: 125, note: 'Pay $125.',
      about: 'Paid at the register, on top of the price tag.' },
    street(7, 'Hewitt Ave', ['Hewitt', 'Ave'], 'Everett', 'everett', 95, [7, 30, 100, 250, 350, 460],
      'Crosses Everett from west to east, out to the Snohomish River.'),
    { i: 8, kind: 'traffic', name: 'Stuck in Traffic', label: ['Stuck in', 'Traffic'], area: 'I-5',
      note: 'Sent here? You are stuck in traffic. Just driving by? Nothing happens.' },
    street(9, 'Colby Ave', ['Colby', 'Ave'], 'Everett', 'everett', 110, [8, 35, 105, 260, 360, 480],
      'A north-south street through the middle of Everett.'),
    street(10, 'Grand Ave', ['Grand', 'Ave'], 'Everett', 'everett', 125, [9, 40, 115, 270, 380, 500],
      'Grand Avenue Park looks out over Port Gardner from this street.'),
    { i: 11, kind: 'card', deck: 'buzz', name: 'Local Buzz', label: ['Local', 'Buzz'] },
    street(12, 'Delridge Way SW', ['Delridge', 'Way SW'], 'West Seattle', 'westseattle', 130, [10, 45, 140, 340, 480, 650],
      'Runs north-south through Delridge, in West Seattle.'),
    street(13, 'California Ave SW', ['California', 'Ave SW'], 'West Seattle', 'westseattle', 140, [10, 45, 145, 350, 490, 660],
      'West Seattle\u2019s Alaska Junction is on this street.'),
    { i: 14, kind: 'utility', name: 'Diablo Dam Power', label: ['Diablo', 'Dam'], area: 'Skagit River', price: 175,
      about: 'One of the Skagit River dams that power Seattle.' },
    street(15, 'Alki Ave SW', ['Alki', 'Ave SW'], 'West Seattle', 'westseattle', 155, [12, 50, 155, 370, 510, 680],
      'The beach road of Alki, across Elliott Bay from downtown.'),
    { i: 16, kind: 'transit', mode: 'ferry', name: 'Fauntleroy Ferry Dock', label: ['Fauntleroy', 'Ferry'], area: 'West Seattle', price: 230,
      about: 'Ferries to Vashon Island and Southworth.' },
    street(17, 'Shilshole Ave NW', ['Shilshole', 'Ave NW'], 'Ballard', 'ballard', 165, [12, 65, 175, 430, 610, 810],
      'Runs along the Ballard shore of Salmon Bay.'),
    street(18, 'NW Market St', ['NW Market', 'St'], 'Ballard', 'ballard', 175, [13, 65, 180, 440, 620, 820],
      'Ballard\u2019s main east-west street, west to the Locks.'),
    street(19, 'Ballard Ave NW', ['Ballard', 'Ave NW'], 'Ballard', 'ballard', 190, [14, 65, 190, 460, 640, 840],
      'The Ballard farmers market sets up on this street every Sunday.'),
    { i: 20, kind: 'rest', name: 'Coffee Break', label: ['Coffee', 'Break'],
      note: 'Take a break. With the Rain Fund house rule on, collect the Rain Fund.' },
    street(21, 'E Pine St', ['E Pine', 'St'], 'Capitol Hill', 'capitolhill', 205, [15, 75, 220, 560, 780, 1050],
      'Part of the Pike/Pine nightlife strip on Capitol Hill.'),
    { i: 22, kind: 'card', deck: 'rain', name: 'Rain Check', label: ['Rain', 'Check'] },
    street(23, '15th Ave E', ['15th', 'Ave E'], 'Capitol Hill', 'capitolhill', 215, [16, 75, 230, 570, 790, 1050],
      'Runs along the east side of Volunteer Park.'),
    street(24, 'Broadway E', ['Broadway', 'East'], 'Capitol Hill', 'capitolhill', 230, [17, 80, 240, 580, 810, 1075],
      'Capitol Hill\u2019s main street of shops and cafes.'),
    { i: 25, kind: 'transit', mode: 'ferry', name: 'Colman Dock', label: ['Colman', 'Dock'], area: 'Downtown', price: 230,
      about: 'Ferries to Bainbridge Island and Bremerton.' },
    { i: 26, kind: 'utility', name: 'Cedar River Water', label: ['Cedar', 'River'], area: 'Cedar River', price: 175,
      about: 'Much of Seattle\u2019s tap water comes from this river.' },
    street(27, '1st Ave', ['1st', 'Ave'], 'Downtown', 'downtown', 250, [19, 90, 280, 690, 970, 1300],
      'Runs north from Pioneer Square through downtown to Belltown.'),
    { i: 28, kind: 'bridge', name: 'Bridge Up!', label: ['Bridge', 'Up!'], area: 'Fremont Bridge',
      note: 'The Fremont Bridge is up. Go to Stuck in Traffic; no salary.',
      about: 'The Fremont drawbridge goes up about 35 times a day for boats.' },
    street(29, 'Alaskan Way', ['Alaskan', 'Way'], 'Downtown', 'downtown', 265, [20, 95, 290, 710, 990, 1325],
      'Seattle\u2019s waterfront street on Elliott Bay.'),
    street(30, 'Pike Place', ['Pike', 'Place'], 'Downtown', 'downtown', 290, [20, 105, 310, 730, 1025, 1350],
      'A brick street through the public market above the bay.'),
    { i: 31, kind: 'card', deck: 'buzz', name: 'Local Buzz', label: ['Local', 'Buzz'] },
    street(32, 'Main St', ['Main', 'St'], 'Bellevue', 'bellevue', 310, [25, 115, 350, 860, 1200, 1625],
      'The main street of Old Bellevue, near Meydenbauer Bay.'),
    street(33, 'NE 8th St', ['NE 8th', 'St'], 'Bellevue', 'bellevue', 330, [25, 120, 370, 880, 1225, 1650],
      'Runs through the high-rises of downtown Bellevue.'),
    street(34, 'Bellevue Way NE', ['Bellevue', 'Way NE'], 'Bellevue', 'bellevue', 355, [25, 125, 370, 910, 1250, 1675],
      'Downtown Bellevue\u2019s main north-south street, past Downtown Park.'),
    { i: 35, kind: 'transit', mode: 'bus', name: 'Bellevue Transit Center', label: ['Bellevue', 'Transit'], area: 'Bellevue', price: 230,
      about: 'Downtown Bellevue\u2019s bus hub, on NE 6th St.' },
    street(36, '84th Ave NE', ['84th', 'Ave NE'], 'Medina', 'medina', 375, [30, 140, 420, 1050, 1450, 1950],
      'A north-south street through Medina and Clyde Hill.'),
    { i: 37, kind: 'tax', name: '520 Bridge Toll', label: ['520', 'Toll'], amount: 85, note: 'Pay $85.',
      about: 'The toll for the floating bridge across Lake Washington.' },
    street(38, 'Overlake Dr W', ['Overlake', 'Dr W'], 'Medina', 'medina', 405, [30, 145, 440, 1075, 1500, 2000],
      'In Medina, a small town on the shore of Lake Washington.'),
    street(39, 'Evergreen Point Rd', ['Evergreen', 'Point Rd'], 'Medina', 'medina', 445, [35, 155, 460, 1125, 1550, 2050],
      'Leads to Evergreen Point, where the floating bridge lands.')
  ];

  var RULES = {
    startCash: 2000,
    salary: 250,
    trafficFee: 60,
    trafficMaxTries: 3,
    doublesToTraffic: 3,
    transitRent: [30, 65, 130, 250],
    utilityTimes: [5, 12],
    mortgageShare: 0.5,
    unmortgageExtra: 0.1,
    sellShare: 0.5,
    maxLevel: 5,
    auctionOpen: 10,
    maxOffers: 3,
    minPlayers: 2,
    maxPlayers: 6,
    logMax: 200
  };

  function streetRent(space, level, ownsDistrict) {
    if (!space || space.kind !== 'street') return 0;
    var r = space.rent[Math.max(0, Math.min(5, level | 0))];
    return (level === 0 && ownsDistrict) ? r * 2 : r;
  }

  var byId = {};
  for (var d = 0; d < DISTRICTS.length; d++) byId[DISTRICTS[d].id] = DISTRICTS[d];

  ECE.BoardData = {
    LAYOUT: LAYOUT,
    DISTRICTS: DISTRICTS,
    SPACES: SPACES,
    RULES: RULES,
    district: function (id) { return byId[id] || null; },
    districtOf: function (i) { var s = SPACES[i]; return s && s.district ? byId[s.district] : null; },
    isOwnable: function (i) { var s = SPACES[i]; return !!s && (s.kind === 'street' || s.kind === 'transit' || s.kind === 'utility'); },
    mortgageValue: function (i) {
      var s = SPACES[i];
      return s && s.price ? Math.floor((s.price * RULES.mortgageShare) / 5 + 1e-9) * 5 : 0;
    },
    unmortgageCost: function (i) {
      var cents = Math.round(ECE.BoardData.mortgageValue(i) * (1 + RULES.unmortgageExtra) * 100);
      return Math.ceil(cents / 500) * 5;
    },
    buildCost: function (i) { var dd = ECE.BoardData.districtOf(i); return dd ? dd.build : 0; },
    streetRent: streetRent,
    TRANSIT: [5, 16, 25, 35],
    UTILITIES: [14, 26],
    TRAFFIC: 8,
    BRIDGE: 28,
    REST: 20,
    START: 0
  };
})(window.ECE = window.ECE || {});
;
(function (ECE) {
  'use strict';

  var RAIN = [
    { id: 'rc1',  text: 'Sun break! Everyone heads for the beach. Advance to Alki Ave SW.', effect: { to: 15 } },
    { id: 'rc2',  text: 'Missed your exit on I-5. Go back 4 spaces.', effect: { back: 4 } },
    { id: 'rc3',  text: 'The Fremont Bridge is up. Go to Stuck in Traffic. No salary.', effect: { traffic: true } },
    { id: 'rc4',  text: 'Carpool Pass. Leave Stuck in Traffic for free. Keep this card until you use it.', effect: { carpool: true } },
    { id: 'rc5',  text: 'Catch the next ferry, train or bus. Advance to the nearest transit stop.', effect: { nearest: 'transit' } },
    { id: 'rc6',  text: 'Windstorm! The power is out. Advance to the nearest utility.', effect: { nearest: 'utility' } },
    { id: 'rc7',  text: 'Open house with a Lake Washington view. Advance to Evergreen Point Rd.', effect: { to: 39 } },
    { id: 'rc8',  text: 'Payday! Advance to START.', effect: { to: 0 } },
    { id: 'rc9',  text: 'Sunday farmers market. Advance to Ballard Ave NW.', effect: { to: 19 } },
    { id: 'rc10', text: 'Night out on the Hill. Advance to Broadway E.', effect: { to: 24 } },
    { id: 'rc11', text: 'Moss on every roof. Pay $35 per home and $90 per tower you own.', effect: { repairs: { home: 35, tower: 90 } } },
    { id: 'rc12', text: 'Your Lake Union houseboat rental is booked all summer. Collect $120.', effect: { cash: 120 } },
    { id: 'rc13', text: 'Parking ticket on Capitol Hill. Pay $30.', effect: { cash: -30 } },
    { id: 'rc14', text: 'The mountain is out! Everyone is cheerful: collect $20 from each player.', effect: { each: 20 } }
  ];

  var BUZZ = [
    { id: 'lb1',  text: 'Your drive-thru espresso stand has a record week. Collect $110.', effect: { cash: 110 } },
    { id: 'lb2',  text: "You find $30 in last winter's rain jacket.", effect: { cash: 30 } },
    { id: 'lb3',  text: 'Fir needles fill your gutters before the fall rains. Pay $45.', effect: { cash: -45 } },
    { id: 'lb4',  text: 'Your blackberry pie wins a blue ribbon at the fair in Puyallup. Collect $45.', effect: { cash: 45 } },
    { id: 'lb5',  text: 'Ferry fare for the whole family. Pay $40.', effect: { cash: -40 } },
    { id: 'lb6',  text: 'You sell your old flannel shirts online. Collect $60.', effect: { cash: 60 } },
    { id: 'lb7',  text: 'You host the block party. Pay each player $15.', effect: { each: -15 } },
    { id: 'lb8',  text: 'Your food truck caters a street fair. Collect $140.', effect: { cash: 140 } },
    { id: 'lb9',  text: 'Seismic retrofit check. Pay $30 per home and $80 per tower you own.', effect: { repairs: { home: 30, tower: 80 } } },
    { id: 'lb10', text: 'You hit every green light on Aurora. Advance to START.', effect: { to: 0 } },
    { id: 'lb11', text: 'Two inches of snow and the whole city stops. Go to Stuck in Traffic. No salary.', effect: { traffic: true } },
    { id: 'lb12', text: 'Carpool Pass. Leave Stuck in Traffic for free. Keep this card until you use it.', effect: { carpool: true } },
    { id: 'lb13', text: 'Sunny weekend for your kayak tours. Collect $80.', effect: { cash: 80 } },
    { id: 'lb14', text: 'Rideshare surge pricing in the rain. Pay $25.', effect: { cash: -25 } }
  ];

  ECE.CardData = {
    DECKS: {
      rain: { id: 'rain', name: 'Rain Check', cards: RAIN },
      buzz: { id: 'buzz', name: 'Local Buzz', cards: BUZZ }
    },
    card: function (deck, id) {
      var list = (deck === 'rain' ? RAIN : deck === 'buzz' ? BUZZ : []);
      for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
      return null;
    }
  };
})(window.ECE = window.ECE || {});
;
(function (ECE) {
  'use strict';

  ECE.Glossary = {
    game: {
      name: 'Emerald City Estates',
      short: 'Emerald Estates',
      codeId: 'emeraldcityestates',
      tagline: 'Buy real Seattle-area streets, build homes and towers, and outlast the computer players.'
    },
    money: { sign: '$' },
    buildings: {
      home: 'home', homes: 'homes', tower: 'tower',
      levelNames: ['No buildings', '1 home', '2 homes', '3 homes', '4 homes', 'Tower']
    },
    places: {
      start: 'START', traffic: 'Stuck in Traffic', drivingBy: 'Just driving by',
      rest: 'Coffee Break', bridge: 'Bridge Up!', rainFund: 'Rain Fund', carpool: 'Carpool Pass'
    },
    decks: { rain: 'Rain Check', buzz: 'Local Buzz' },

    tokens: [
      { id: 'ferry',     name: 'Ferry' },
      { id: 'coffee',    name: 'Coffee Cup' },
      { id: 'salmon',    name: 'Salmon' },
      { id: 'umbrella',  name: 'Umbrella' },
      { id: 'evergreen', name: 'Evergreen' },
      { id: 'orca',      name: 'Orca' },
      { id: 'bicycle',   name: 'Bicycle' },
      { id: 'seaplane',  name: 'Seaplane' }
    ],

    playerColors: ['#1E73E8', '#E0453A', '#F08A1C', '#5A4632', '#0E9488', '#D6337F'],

    computers: [
      { id: 'fran', name: 'Ferry Fran',  token: 'ferry',     persona: 'trader',    blurb: 'Loves a good swap.' },
      { id: 'leo',  name: 'Latte Leo',   token: 'coffee',    persona: 'builder',   blurb: 'Builds as soon as he can.' },
      { id: 'max',  name: 'Mossy Max',   token: 'evergreen', persona: 'saver',     blurb: 'Keeps a rainy-day fund.' },
      { id: 'rosa', name: 'Rainy Rosa',  token: 'umbrella',  persona: 'collector', blurb: 'Pays extra to finish a district.' },
      { id: 'sam',  name: 'Salmon Sam',  token: 'salmon',    persona: 'bold',      blurb: 'Bids high, keeps little cash.' }
    ],

    levels: [
      { id: 'easy', name: 'Easy' },
      { id: 'normal', name: 'Normal' },
      { id: 'hard', name: 'Hard' }
    ],

    limits: [
      { id: 'none', name: 'No limit', kind: 'none', value: 0, note: 'Last one standing wins; about 10-15 minutes with 3 computer players.' },
      { id: 'm30', name: '30 minutes', kind: 'minutes', value: 30, note: 'Richest after 30 minutes of play wins.' },
      { id: 'm60', name: '60 minutes', kind: 'minutes', value: 60, note: 'Richest after 60 minutes of play wins.' },
      { id: 'm90', name: '90 minutes', kind: 'minutes', value: 90, note: 'Richest after 90 minutes of play wins.' },
      { id: 'r20', name: '20 rounds', kind: 'rounds', value: 20, note: 'Richest after 20 rounds wins.' },
      { id: 'r40', name: '40 rounds', kind: 'rounds', value: 40, note: 'Richest after 40 rounds wins.' }
    ]
  };
})(window.ECE = window.ECE || {});
;
(function (ECE) {
  'use strict';

  var W = window;

  ECE.VERSION = '1.0.0';

  function money(n) {
    var v = Math.round(Number(n));
    if (!isFinite(v)) v = 0;
    if (v > 9e15) v = 9e15;
    if (v < -9e15) v = -9e15;
    var neg = v < 0;
    var s = String(Math.abs(v));
    var out = '';
    while (s.length > 3) {
      out = ',' + s.slice(s.length - 3) + out;
      s = s.slice(0, s.length - 3);
    }
    return (neg ? '-$' : '$') + s + out;
  }

  function clamp(v, lo, hi) {
    var a = Number(lo), b = Number(hi);
    if (a > b) { var t = a; a = b; b = t; }
    var x = Number(v);
    if (!(x >= a)) return a;
    return x > b ? b : x;
  }

  function ordinal(n) {
    var v = Math.trunc(Number(n));
    if (!isFinite(v)) v = 0;
    var a = Math.abs(v) % 100, b = Math.abs(v) % 10;
    var suffix = (a >= 11 && a <= 13) ? 'th' : b === 1 ? 'st' : b === 2 ? 'nd' : b === 3 ? 'rd' : 'th';
    return v + suffix;
  }

  var STANDALONE_MODES = ['standalone', 'fullscreen', 'minimal-ui', 'window-controls-overlay'];

  function displayMode(env) {
    if (env && typeof env.displayMode === 'string') return env.displayMode;
    if (env) return 'browser';
    try {
      if (W && typeof W.matchMedia === 'function') {
        for (var i = 0; i < STANDALONE_MODES.length; i++) {
          if (W.matchMedia('(display-mode: ' + STANDALONE_MODES[i] + ')').matches) return STANDALONE_MODES[i];
        }
      }
    } catch (e) { }
    return 'browser';
  }

  function browser(env) {
    var out = { engine: 'other', os: 'other', name: 'other', version: 0, standalone: false };
    var nav = env || (W && W.navigator) || null;
    if (!nav) return out;
    try {
      var ua = String(nav.userAgent || '');
      var touch = Number(nav.maxTouchPoints) || 0;
      var ver = function (re) { var m = re.exec(ua); return m ? (parseInt(m[1], 10) || 0) : 0; };

      if (/iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && touch > 1)) out.os = 'ios';
      else if (/Android/.test(ua)) out.os = 'android';
      else if (/Macintosh|Mac OS X/.test(ua)) out.os = 'mac';
      else if (/Windows/.test(ua)) out.os = 'windows';
      else if (/Linux|X11|CrOS/.test(ua)) out.os = 'linux';

      if (/\bEdg(?:e|A|iOS)?\//.test(ua)) { out.name = 'edge'; out.version = ver(/\bEdg(?:e|A|iOS)?\/(\d+)/); }
      else if (/\bSamsungBrowser\//.test(ua)) { out.name = 'samsung'; out.version = ver(/\bSamsungBrowser\/(\d+)/); }
      else if (/\b(?:OPR|OPT|OPX|Opera)\//.test(ua)) { out.name = 'opera'; out.version = ver(/\b(?:OPR|OPT|OPX|Opera)\/(\d+)/); }
      else if (/\b(?:Firefox|FxiOS)\//.test(ua)) { out.name = 'firefox'; out.version = ver(/\b(?:Firefox|FxiOS)\/(\d+)/); }
      else if (/\b(?:CriOS|Chrome|Chromium|HeadlessChrome)\//.test(ua)) { out.name = 'chrome'; out.version = ver(/\b(?:CriOS|Chrome|Chromium|HeadlessChrome)\/(\d+)/); }
      else if (/\bSafari\//.test(ua) && /\bVersion\//.test(ua)) { out.name = 'safari'; out.version = ver(/\bVersion\/(\d+)/); }

      if (out.os === 'ios') out.engine = 'webkit';
      else if (out.name === 'firefox' || (/\bGecko\/\d/.test(ua) && !/like Gecko/.test(ua))) out.engine = 'gecko';
      else if (/\b(?:Chrome|Chromium|HeadlessChrome|Edg|OPR|SamsungBrowser)\//.test(ua)) out.engine = 'blink';
      else if (out.name === 'safari' || /AppleWebKit\//.test(ua)) out.engine = 'webkit';
      else {
        var vendor = String(nav.vendor || '');
        if (nav.userAgentData && typeof nav.userAgentData === 'object') out.engine = 'blink';
        else if (/Apple/.test(vendor)) out.engine = 'webkit';
        else if (/Google/.test(vendor)) out.engine = 'blink';
      }

      out.standalone = nav.standalone === true || STANDALONE_MODES.indexOf(displayMode(env)) >= 0;
    } catch (e) { }
    return out;
  }

  ECE.Util = {
    money: money,
    clamp: clamp,
    ordinal: ordinal,
    browser: browser
  };
})(window.ECE = window.ECE || {});
;
(function (ECE) {
  'use strict';

  function seedOf(seed) {
    if (typeof seed === 'number' && isFinite(seed)) return Math.floor(seed) >>> 0;
    if (typeof seed === 'string') return hash(seed);
    return 0;
  }

  function create(seed) { return { s: seedOf(seed) }; }

  function next(r) {
    var s = (r.s + 0x6d2b79f5) >>> 0;
    r.s = s;
    var t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  function int(r, n) {
    var x = next(r);
    n = Math.floor(n);
    return n > 1 ? Math.floor(x * n) : 0;
  }

  function shuffle(r, a) {
    for (var i = a.length - 1; i > 0; i--) {
      var j = int(r, i + 1);
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function mix(h, k) {
    k = Math.imul(k, 0xcc9e2d51);
    k = (k << 15) | (k >>> 17);
    k = Math.imul(k, 0x1b873593);
    h ^= k;
    h = (h << 13) | (h >>> 19);
    return (Math.imul(h, 5) + 0xe6546b64) | 0;
  }

  function mixValue(h, v) {
    if (typeof v === 'number') {
      if (v === (v | 0)) return mix(mix(h, 1), v);
      if (v === Math.floor(v) && isFinite(v)) return mix(mix(mix(h, 2), v >>> 0), Math.floor(v / 4294967296) | 0);
      return mixString(mix(h, 3), String(v));
    }
    if (typeof v === 'string') return mixString(mix(h, 4), v);
    if (typeof v === 'boolean') return mix(h, v ? 5 : 6);
    if (v === null || v === undefined) return mix(h, 7);
    return mixString(mix(h, 8), String(v));
  }

  function mixString(h, str) {
    for (var i = 0; i < str.length; i++) h = mix(h, str.charCodeAt(i));
    return mix(h, str.length);
  }

  function hash() {
    var h = 0x2f6b9e13 ^ arguments.length;
    for (var i = 0; i < arguments.length; i++) h = mixValue(h, arguments[i]);
    h ^= h >>> 16;
    h = Math.imul(h, 0x85ebca6b);
    h ^= h >>> 13;
    h = Math.imul(h, 0xc2b2ae35);
    h ^= h >>> 16;
    return h >>> 0;
  }

  function hashFloat() { return hash.apply(null, arguments) / 4294967296; }

  ECE.Rng = { create: create, next: next, int: int, shuffle: shuffle, hash: hash, hashFloat: hashFloat };
})(window.ECE = window.ECE || {});
;
(function (ECE) {
  'use strict';

  var B = ECE.BoardData, CD = ECE.CardData, Rng = ECE.Rng;
  var RULES = B.RULES, SPACES = B.SPACES, N = SPACES.length;
  var TRAFFIC = B.TRAFFIC, START = B.START;
  var MAX_OFFERS = RULES.maxOffers || 3;
  var DECLINED_MAX = 16;
  var DECK_IDS = ['rain', 'buzz'];
  var PHASES = ['roll', 'buy', 'auction', 'card', 'debt', 'trade', 'end', 'over'];
  var LEVELS = ['easy', 'normal', 'hard'];
  var DEBT_REASONS = ['rent', 'tax', 'card', 'repairs', 'each', 'traffic'];

  var KIND = [], OWNABLE = [], DIST = [], PRICE = [];
  for (var si = 0; si < N; si++) {
    KIND[si] = SPACES[si].kind;
    OWNABLE[si] = B.isOwnable(si);
    DIST[si] = B.districtOf(si);
    PRICE[si] = SPACES[si].price || 0;
  }
  var CARD_IDS = {}, CARPOOL = {};
  for (var di = 0; di < DECK_IDS.length; di++) {
    var dname = DECK_IDS[di], dcards = CD.DECKS[dname].cards;
    CARD_IDS[dname] = [];
    for (var ci = 0; ci < dcards.length; ci++) {
      CARD_IDS[dname].push(dcards[ci].id);
      if (dcards[ci].effect && dcards[ci].effect.carpool) CARPOOL[dname] = dcards[ci].id;
    }
  }

  function isInt(x) { return typeof x === 'number' && Math.floor(x) === x && isFinite(x); }
  function isSpace(i) { return typeof i === 'number' && i >= 0 && i < N && Math.floor(i) === i; }
  function P(s, id) {
    var ps = s.players;
    for (var i = 0; i < ps.length; i++) if (ps[i].id === id) return ps[i];
    return null;
  }
  function seatOf(s, id) {
    var ps = s.players;
    for (var i = 0; i < ps.length; i++) if (ps[i].id === id) return i;
    return -1;
  }
  function turnPlayer(s) { return s.players[s.turn] || null; }
  function sellValue(i) { return Math.round(B.buildCost(i) * RULES.sellShare); }
  function money(n) {
    n = Math.round(+n || 0);
    var neg = n < 0, str = String(Math.abs(n));
    str = str.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return (neg ? '-$' : '$') + str;
  }
  function ordinal(n) {
    if (Math.floor(n / 10) % 10 === 1) return n + 'th';
    var k = n % 10;
    return n + (k === 1 ? 'st' : k === 2 ? 'nd' : k === 3 ? 'rd' : 'th');
  }
  function errMsg(e) {
    try { return String((e && e.message) || e); } catch (x) { return 'unknown error'; }
  }
  function clone(v) {
    if (v === null || typeof v !== 'object') return v;
    var i, out;
    if (Array.isArray(v)) {
      out = new Array(v.length);
      for (i = 0; i < v.length; i++) out[i] = clone(v[i]);
      return out;
    }
    out = {};
    for (var k in v) {
      if (Object.prototype.hasOwnProperty.call(v, k) && v[k] !== undefined && typeof v[k] !== 'function') out[k] = clone(v[k]);
    }
    return out;
  }
  function without(arr, idx) {
    var out = [];
    for (var i = 0; i < arr.length; i++) if (i !== idx) out.push(arr[i]);
    return out;
  }

  var SC = [], PL = [], PR = [], PRV = [], DK = [], LOGBUF = [];
  var snapPlayers = 0, logSaved = false, logSavedN = 0;
  var NONE = {};
  function snapshot(s) {
    logSaved = false;
    var c = s.counters;
    SC[0] = s.rng; SC[1] = s.rng.s; SC[2] = s.playMs; SC[3] = s.round; SC[4] = s.turn; SC[5] = s.phase;
    SC[6] = s.dice; SC[7] = s.doubles; SC[8] = s.rolled; SC[9] = s.pending; SC[10] = s.rainFund;
    SC[11] = s.limitHit; SC[12] = s.offersThisTurn; SC[13] = s.winner; SC[14] = s.standings;
    SC[15] = c; SC[16] = c.turns; SC[17] = c.trades; SC[18] = c.auctions; SC[19] = c.bankrupt;
    SC[20] = s.log; SC[21] = s.log.length; SC[22] = s.props; SC[23] = s.decks; SC[24] = s.players;
    SC[25] = s.declined; SC[26] = Object.prototype.hasOwnProperty.call(s, 'declined');
    var ps = s.players, k = 0, i;
    for (i = 0; i < ps.length; i++) {
      var p = ps[i];
      PL[k++] = p; PL[k++] = p.cash; PL[k++] = p.pos; PL[k++] = p.stuck; PL[k++] = p.stuckTries;
      PL[k++] = p.passes; PL[k++] = p.out; PL[k++] = p.outOrder;
      PL[k++] = Object.prototype.hasOwnProperty.call(p, 'outRound') ? p.outRound : NONE;
    }
    snapPlayers = ps.length;
    var pr = s.props;
    for (i = 0; i < N; i++) {
      var e = pr[i];
      PR[i] = e;
      if (e) { PRV[3 * i] = e.owner; PRV[3 * i + 1] = e.level; PRV[3 * i + 2] = e.mortgaged; }
    }
    var dk = s.decks;
    DK[0] = dk.rain; DK[1] = dk.rain.order; DK[2] = dk.rain.next;
    DK[3] = dk.buzz; DK[4] = dk.buzz.order; DK[5] = dk.buzz.next;
  }
  function restore(s) {
    s.rng = SC[0]; s.rng.s = SC[1]; s.playMs = SC[2]; s.round = SC[3]; s.turn = SC[4]; s.phase = SC[5];
    s.dice = SC[6]; s.doubles = SC[7]; s.rolled = SC[8]; s.pending = SC[9]; s.rainFund = SC[10];
    s.limitHit = SC[11]; s.offersThisTurn = SC[12]; s.winner = SC[13]; s.standings = SC[14];
    var c = SC[15];
    s.counters = c; c.turns = SC[16]; c.trades = SC[17]; c.auctions = SC[18]; c.bankrupt = SC[19];
    if (SC[26]) { if (s.declined !== SC[25]) s.declined = SC[25]; } else if (s.declined !== undefined) delete s.declined;
    var log = SC[20], i;
    s.log = log;
    if (logSaved) {
      for (i = 0; i < logSavedN; i++) if (log[i] !== LOGBUF[i]) log[i] = LOGBUF[i];
      if (log.length !== logSavedN) log.length = logSavedN;
      for (i = 0; i < logSavedN; i++) LOGBUF[i] = null;
      logSaved = false;
    } else if (log.length > SC[21]) {
      log.length = SC[21];
    }
    s.players = SC[24];
    var k = 0;
    for (i = 0; i < snapPlayers; i++) {
      var p = PL[k++];
      p.cash = PL[k++]; p.pos = PL[k++]; p.stuck = PL[k++]; p.stuckTries = PL[k++];
      p.passes = PL[k++]; p.out = PL[k++]; p.outOrder = PL[k++];
      var orr = PL[k++];
      if (orr !== NONE) p.outRound = orr; else if (Object.prototype.hasOwnProperty.call(p, 'outRound')) delete p.outRound;
    }
    var pr = SC[22];
    s.props = pr;
    for (i = 0; i < N; i++) {
      var e = PR[i];
      if (e) {
        if (pr[i] !== e) pr[i] = e;
        e.owner = PRV[3 * i]; e.level = PRV[3 * i + 1]; e.mortgaged = PRV[3 * i + 2];
      } else if (pr[i] !== undefined) {
        delete pr[i];
      }
    }
    var dk = SC[23];
    s.decks = dk;
    dk.rain = DK[0]; DK[0].order = DK[1]; DK[0].next = DK[2];
    dk.buzz = DK[3]; DK[3].order = DK[4]; DK[3].next = DK[5];
  }


  function actor(s) {
    if (!s || !s.players) return null;
    var pd = s.pending, x;
    switch (s.phase) {
      case 'over': return null;
      case 'auction': x = pd && pd.order ? pd.order[pd.idx] : null; break;
      case 'debt': x = pd && pd.debts && pd.debts[0] ? pd.debts[0].player : null; break;
      case 'trade': x = pd && pd.offer ? pd.offer.to : null; break;
      default: x = s.players[s.turn] ? s.players[s.turn].id : null;
    }
    return x === undefined ? null : x;
  }

  function ownsDistrict(s, pid, districtId) {
    var d = B.district(districtId);
    if (!d) return false;
    for (var k = 0; k < d.spaces.length; k++) {
      var e = s.props[d.spaces[k]];
      if (!e || e.owner !== pid) return false;
    }
    return true;
  }

  function countOwned(s, pid, kind) {
    var n = 0;
    for (var i = 0; i < N; i++) {
      if (KIND[i] !== kind) continue;
      var e = s.props[i];
      if (e && e.owner === pid) n++;
    }
    return n;
  }

  function rent(s, i, diceTotal) {
    if (!s || !isSpace(i) || !OWNABLE[i]) return 0;
    var e = s.props[i];
    if (!e || e.mortgaged) return 0;
    var k = KIND[i];
    if (k === 'street') return B.streetRent(SPACES[i], e.level, ownsDistrict(s, e.owner, SPACES[i].district));
    if (k === 'transit') return RULES.transitRent[countOwned(s, e.owner, 'transit') - 1] || 0;
    if (k === 'utility') {
      var t = typeof diceTotal === 'number' ? diceTotal : (s.dice ? s.dice[0] + s.dice[1] : 0);
      return t * (RULES.utilityTimes[countOwned(s, e.owner, 'utility') - 1] || 0);
    }
    return 0;
  }

  function rentWhy(s, i, diceTotal) {
    if (!s || !isSpace(i) || !OWNABLE[i] || !s.props) return null;
    var e = s.props[i];
    if (!e) return null;
    var k = KIND[i];
    if (k === 'street') {
      if (e.level >= RULES.maxLevel) return { kind: 'tower' };
      if (e.level > 0) return { kind: 'homes', n: e.level };
      return { kind: ownsDistrict(s, e.owner, SPACES[i].district) ? 'double' : 'base' };
    }
    if (k === 'transit') return { kind: 'stops', n: countOwned(s, e.owner, 'transit') };
    var t = typeof diceTotal === 'number' ? diceTotal : (s.dice ? s.dice[0] + s.dice[1] : 0);
    return { kind: 'dice', total: t, times: RULES.utilityTimes[countOwned(s, e.owner, 'utility') - 1] || 0 };
  }
  function whyText(w) {
    if (!w || typeof w !== 'object') return '';
    switch (w.kind) {
      case 'homes': return isInt(w.n) && w.n > 0 ? w.n + (w.n === 1 ? ' home' : ' homes') : '';
      case 'tower': return 'tower';
      case 'double': return 'whole district: double';
      case 'stops': return isInt(w.n) && w.n > 0 ? w.n + (w.n === 1 ? ' transit stop' : ' transit stops') : '';
      case 'dice': return isInt(w.total) && isInt(w.times) && w.total > 0 && w.times > 0 ? 'dice ' + w.total + ' \u00d7 ' + w.times : '';
      default: return '';
    }
  }

  function buildingsOf(s, pid) {
    var homes = 0, towers = 0;
    for (var i = 0; i < N; i++) {
      var e = s.props[i];
      if (!e || e.owner !== pid || !e.level) continue;
      if (e.level >= RULES.maxLevel) towers++; else homes += e.level;
    }
    return { homes: homes, towers: towers };
  }

  function netWorth(s, pid) {
    var p = s && P(s, pid);
    if (!p) return 0;
    var v = p.cash;
    for (var i = 0; i < N; i++) {
      var e = s.props[i];
      if (!e || e.owner !== pid) continue;
      v += e.mortgaged ? B.mortgageValue(i) : PRICE[i];
      if (e.level) v += e.level * B.buildCost(i);
    }
    return v;
  }

  function liquid(s, pid) {
    var p = s && P(s, pid);
    if (!p) return 0;
    var v = p.cash;
    for (var i = 0; i < N; i++) {
      var e = s.props[i];
      if (!e || e.owner !== pid) continue;
      if (e.level) v += e.level * sellValue(i);
      if (!e.mortgaged) v += B.mortgageValue(i);
    }
    return v;
  }

  function mctx(s, pid) {
    var ph = s.phase, tp = s.players[s.turn];
    if (ph === 'roll' || ph === 'end') return tp && tp.id === pid ? 2 : 0;
    if (ph === 'buy') return tp && tp.id === pid ? 1 : 0;
    if (ph === 'debt') return s.pending && s.pending.debts[0].player === pid ? 1 : 0;
    return 0;
  }

  function buildError(s, pid, i) {
    if (!isSpace(i)) return 'Pick a street.';
    if (mctx(s, pid) !== 2) return 'You can build only on your own turn, before rolling or before ending it.';
    if (KIND[i] !== 'street') return 'Only streets get homes and towers.';
    var e = s.props[i];
    if (!e || e.owner !== pid) return 'You do not own that street.';
    var sp = DIST[i].spaces, min = 99;
    for (var k = 0; k < sp.length; k++) {
      var q = s.props[sp[k]];
      if (!q || q.owner !== pid) return 'Own all three streets of the district first.';
      if (q.mortgaged) return 'Pay off the mortgages in this district first.';
      if (q.level < min) min = q.level;
    }
    if (e.level >= RULES.maxLevel) return 'That street already has a tower.';
    if (e.level > min) return 'Build evenly: another street of the district needs a building first.';
    if (e.level === RULES.maxLevel - 1 && min < RULES.maxLevel - 1) return 'A tower needs ' + (RULES.maxLevel - 1) + ' homes on every street of the district.';
    var p = P(s, pid);
    if (!p || p.cash < B.buildCost(i)) return 'Not enough cash to build.';
    return null;
  }

  function sellError(s, pid, i) {
    if (!isSpace(i)) return 'Pick a street.';
    if (mctx(s, pid) < 1) return 'You cannot sell now.';
    if (KIND[i] !== 'street') return 'Only streets have buildings.';
    var e = s.props[i];
    if (!e || e.owner !== pid) return 'You do not own that street.';
    if (!(e.level > 0)) return 'There is nothing built there.';
    var sp = DIST[i].spaces;
    for (var k = 0; k < sp.length; k++) {
      var q = s.props[sp[k]];
      if (q && q.level > e.level) return 'Sell evenly: sell from the street with the most buildings first.';
    }
    return null;
  }

  function mortgageError(s, pid, i) {
    if (!isSpace(i) || !OWNABLE[i]) return 'Pick one of your spaces.';
    if (mctx(s, pid) < 1) return 'You cannot mortgage now.';
    var e = s.props[i];
    if (!e || e.owner !== pid) return 'You do not own that space.';
    if (e.mortgaged) return 'It is already mortgaged.';
    var d = DIST[i];
    if (d) {
      for (var k = 0; k < d.spaces.length; k++) {
        var q = s.props[d.spaces[k]];
        if (q && q.level > 0) return 'Sell the buildings in this district first.';
      }
    }
    return null;
  }

  function unmortgageError(s, pid, i) {
    if (!isSpace(i) || !OWNABLE[i]) return 'Pick one of your spaces.';
    if (mctx(s, pid) !== 2) return 'You can pay off a mortgage only on your own turn, before rolling or before ending it.';
    var e = s.props[i];
    if (!e || e.owner !== pid) return 'You do not own that space.';
    if (!e.mortgaged) return 'It is not mortgaged.';
    var p = P(s, pid);
    if (!p || p.cash < B.unmortgageCost(i)) return 'Not enough cash to pay off the mortgage.';
    return null;
  }

  function canBuild(s, pid, i) { try { return !buildError(s, pid, i); } catch (e) { return false; } }
  function canSell(s, pid, i) { try { return !sellError(s, pid, i); } catch (e) { return false; } }
  function canMortgage(s, pid, i) { try { return !mortgageError(s, pid, i); } catch (e) { return false; } }
  function canUnmortgage(s, pid, i) { try { return !unmortgageError(s, pid, i); } catch (e) { return false; } }

  function tradeableSpace(s, pid, i) {
    if (!isSpace(i) || !OWNABLE[i]) return false;
    var e = s.props[i];
    if (!e || e.owner !== pid) return false;
    var d = DIST[i];
    if (d) {
      for (var k = 0; k < d.spaces.length; k++) {
        var q = s.props[d.spaces[k]];
        if (q && q.level > 0) return false;
      }
    }
    return true;
  }

  function tradeable(s, pid) {
    var p = s && P(s, pid), spaces = [];
    if (!p) return { spaces: spaces, passes: 0, cash: 0 };
    for (var i = 0; i < N; i++) if (tradeableSpace(s, pid, i)) spaces.push(i);
    return { spaces: spaces, passes: p.passes.length, cash: p.cash };
  }

  function sideError(s, owner, side) {
    if (side === undefined || side === null) return null;
    if (typeof side !== 'object') return 'That offer is not complete.';
    var cash = side.cash === undefined ? 0 : side.cash;
    if (!isInt(cash) || cash < 0) return 'Cash in an offer must be a whole number of dollars.';
    if (cash > owner.cash) return 'That is more cash than they have.';
    var passes = side.passes === undefined ? 0 : side.passes;
    if (!isInt(passes) || passes < 0) return 'That offer is not complete.';
    if (passes > owner.passes.length) return 'They do not have that many Carpool Passes.';
    var sp = side.spaces === undefined ? [] : side.spaces;
    if (!Array.isArray(sp)) return 'That offer is not complete.';
    for (var k = 0; k < sp.length; k++) {
      var i = sp[k];
      if (!isSpace(i) || !OWNABLE[i]) return 'Only streets, transit stops and utilities can be traded.';
      for (var j = 0; j < k; j++) if (sp[j] === i) return 'A space is listed twice.';
      var e = s.props[i];
      if (!e || e.owner !== owner.id) return 'A space in the offer belongs to someone else.';
      if (!tradeableSpace(s, owner.id, i)) return 'Streets can be traded only when their district has no buildings.';
    }
    return null;
  }
  function sideItems(side) {
    if (!side || typeof side !== 'object') return 0;
    return (side.cash > 0 ? 1 : 0) + (side.passes > 0 ? 1 : 0) + (Array.isArray(side.spaces) ? side.spaces.length : 0);
  }
  function offerContentError(s, o) {
    if (!o || typeof o !== 'object') return 'That offer is not complete.';
    var from = P(s, o.from), to = P(s, o.to);
    if (!from || !to || from === to) return 'Pick another player to trade with.';
    if (from.out || to.out) return 'That player is out of the game.';
    var e = sideError(s, from, o.give) || sideError(s, to, o.get);
    if (e) return e;
    if (sideItems(o.give) + sideItems(o.get) === 0) return 'Add at least one item to the offer.';
    return null;
  }
  function offerError(s, o) {
    if (!s || !s.players) return 'No game.';
    if (s.phase !== 'roll' && s.phase !== 'end') return 'Offers can be made only before rolling or before ending your turn.';
    var tp = turnPlayer(s);
    if (!o || typeof o !== 'object' || !tp || o.from !== tp.id) return 'Only the player whose turn it is can make an offer.';
    if (s.offersThisTurn >= MAX_OFFERS) return 'No more offers this turn (' + MAX_OFFERS + ' at most).';
    return offerContentError(s, o);
  }
  function checkOffer(s, o) {
    var e;
    try { e = offerError(s, o); } catch (x) { e = 'internal: ' + errMsg(x); }
    return e ? { ok: false, error: e } : { ok: true, error: null };
  }
  function normSide(side) {
    side = side && typeof side === 'object' ? side : {};
    var sp = Array.isArray(side.spaces) ? side.spaces.slice() : [];
    sp.sort(function (a, b) { return a - b; });
    return { cash: side.cash || 0, spaces: sp, passes: side.passes || 0 };
  }
  function normOffer(o) { return { from: o.from, to: o.to, give: normSide(o.give), get: normSide(o.get) }; }

  function minBid(s) {
    var pd = s && s.pending;
    if (!pd || pd.kind !== 'auction') return 0;
    return Math.max(RULES.auctionOpen, pd.bid + 1);
  }

  function standings(s) {
    var list = [], i;
    if (!s || !s.players) return list;
    for (i = 0; i < s.players.length; i++) {
      var p = s.players[i];
      list.push({ id: p.id, name: p.name, net: netWorth(s, p.id), cash: p.cash, out: !!p.out, rank: 0, seat: i, outOrder: p.outOrder || 0 });
    }
    list.sort(function (a, b) {
      if (a.out !== b.out) return a.out ? 1 : -1;
      if (a.out) return b.outOrder - a.outOrder;
      if (a.net !== b.net) return b.net - a.net;
      if (a.cash !== b.cash) return b.cash - a.cash;
      return a.seat - b.seat;
    });
    var out = [];
    for (i = 0; i < list.length; i++) {
      var x = list[i];
      out.push({ id: x.id, name: x.name, net: x.net, cash: x.cash, out: x.out, rank: i + 1 });
    }
    return out;
  }

  function nextPhase(s) {
    var tp = s.players[s.turn];
    return (s.doubles > 0 && tp && !tp.stuck && !tp.out) ? 'roll' : 'end';
  }


  function addManage(s, pid, out, full) {
    for (var i = 0; i < N; i++) {
      if (!OWNABLE[i]) continue;
      var e = s.props[i];
      if (!e || e.owner !== pid) continue;
      if (full && !buildError(s, pid, i)) out.push({ t: 'build', p: pid, space: i });
      if (!sellError(s, pid, i)) out.push({ t: 'sell', p: pid, space: i });
      if (!mortgageError(s, pid, i)) out.push({ t: 'mortgage', p: pid, space: i });
      if (full && !unmortgageError(s, pid, i)) out.push({ t: 'unmortgage', p: pid, space: i });
    }
  }

  function legal(s) {
    var out = [];
    try {
      if (!s || !s.players || s.phase === 'over') return out;
      var who = actor(s);
      if (who === null) return out;
      var p = P(s, who);
      if (!p || p.out) return out;
      switch (s.phase) {
        case 'roll':
          if (p.stuck) {
            if (p.cash >= RULES.trafficFee) out.push({ t: 'payFee', p: who });
            if (p.passes.length) out.push({ t: 'usePass', p: who });
          }
          out.push({ t: 'roll', p: who });
          addManage(s, who, out, true);
          break;
        case 'end':
          out.push({ t: 'endTurn', p: who });
          addManage(s, who, out, true);
          break;
        case 'buy':
          if (p.cash >= PRICE[s.pending.space]) out.push({ t: 'buy', p: who });
          out.push({ t: 'decline', p: who });
          addManage(s, who, out, false);
          break;
        case 'auction':
          var mb = minBid(s);
          if (p.cash >= mb) out.push({ t: 'bid', p: who, amount: mb });
          out.push({ t: 'pass', p: who });
          break;
        case 'card':
          out.push({ t: 'ack', p: who });
          break;
        case 'debt':
          var d = s.pending.debts[0];
          if (p.cash >= d.amount) out.push({ t: 'pay', p: who });
          if (liquid(s, who) < d.amount) out.push({ t: 'bankrupt', p: who });
          addManage(s, who, out, false);
          break;
        case 'trade':
          out.push({ t: 'accept', p: who });
          out.push({ t: 'reject', p: who });
          break;
      }
    } catch (e) {
      return [];
    }
    return out;
  }


  function salary(s, p, ev) {
    p.cash += RULES.salary;
    ev.push({ t: 'salary', p: p.id, amount: RULES.salary });
  }

  function moveBy(s, p, n, ev) {
    var from = p.pos, to = (from + n) % N, pass = from + n >= N;
    p.pos = to;
    ev.push({ t: 'move', p: p.id, from: from, to: to, steps: n, passStart: pass, jump: false });
    if (pass) salary(s, p, ev);
    land(s, p, to, false, ev);
  }
  function moveTo(s, p, target, ev) {
    var from = p.pos, n = (target - from + N) % N, pass = n > 0 && from + n >= N;
    p.pos = target;
    ev.push({ t: 'move', p: p.id, from: from, to: target, steps: n, passStart: pass, jump: false });
    if (pass) salary(s, p, ev);
    land(s, p, target, true, ev);
  }
  function moveBack(s, p, n, ev) {
    var from = p.pos, to = ((from - n) % N + N) % N;
    p.pos = to;
    ev.push({ t: 'move', p: p.id, from: from, to: to, steps: -n, passStart: false, jump: false });
    land(s, p, to, true, ev);
  }
  function nearestOf(pos, kind) {
    for (var k = 1; k <= N; k++) { var j = (pos + k) % N; if (KIND[j] === kind) return j; }
    return pos;
  }

  function sendToTraffic(s, p, reason, ev) {
    ev.push({ t: 'traffic', p: p.id, reason: reason });
    var from = p.pos;
    p.pos = TRAFFIC; p.stuck = true; p.stuckTries = 0;
    s.doubles = 0;
    ev.push({ t: 'move', p: p.id, from: from, to: TRAFFIC, steps: 0, passStart: false, jump: true });
    s.pending = null;
    s.phase = 'end';
  }

  function finish(s) { if (s.pending === null) s.phase = nextPhase(s); }

  function payEvent(pid, amount, toId, fund, reason, space, ev, why) {
    switch (reason) {
      case 'rent':
        ev.push(why ? { t: 'rent', p: pid, owner: toId, space: space, amount: amount, why: why } : { t: 'rent', p: pid, owner: toId, space: space, amount: amount });
        break;
      case 'tax': ev.push({ t: 'tax', p: pid, space: space, amount: amount, fund: !!fund }); break;
      case 'traffic': ev.push({ t: 'leave', p: pid, how: 'forced', amount: amount }); break;
      case 'each': ev.push({ t: 'cash', p: pid, amount: -amount, reason: 'card', to: toId, fund: false }); break;
      default: ev.push({ t: 'cash', p: pid, amount: -amount, reason: reason, to: toId, fund: !!fund }); break;
    }
  }

  function addDebt(s, d, ev) {
    var pd = s.pending;
    if (pd !== null && pd.kind === 'debt') s.pending = { kind: 'debt', debts: pd.debts.concat([d]), resume: pd.resume };
    else s.pending = { kind: 'debt', debts: [d], resume: d.reason === 'traffic' ? 'leave' : nextPhase(s) };
    s.phase = 'debt';
    var one = d.to.length === 1;
    ev.push({ t: 'debt', p: d.player, amount: d.amount, reason: d.reason, to: one ? d.to[0].id : null, fund: one && !!d.to[0].fund });
  }

  function charge(s, payer, amount, toId, fund, reason, space, ev, why) {
    if (!(amount > 0)) return;
    if (payer.cash >= amount) {
      payer.cash -= amount;
      if (toId !== null) P(s, toId).cash += amount;
      else if (fund) s.rainFund += amount;
      payEvent(payer.id, amount, toId, fund, reason, space, ev, why);
      return;
    }
    var d = { player: payer.id, amount: amount, to: [{ id: toId, amount: amount, fund: !!fund }], reason: reason, space: space };
    if (why) d.why = why;
    addDebt(s, d, ev);
  }

  function draw(s, p, deckId, ev) {
    var dk = s.decks[deckId];
    if (dk.next >= dk.order.length) {
      if (!dk.order.length) { finish(s); return; }
      var o = dk.order.slice();
      Rng.shuffle(s.rng, o);
      dk.order = o;
      dk.next = 0;
    }
    var id = dk.order[dk.next];
    dk.next = dk.next + 1;
    s.pending = { kind: 'card', deck: deckId, id: id };
    s.phase = 'card';
    ev.push({ t: 'card', p: p.id, deck: deckId, id: id });
  }

  function land(s, p, i, byCard, ev) {
    ev.push({ t: 'land', p: p.id, space: i });
    var k = KIND[i];
    if (OWNABLE[i]) {
      var e = s.props[i];
      if (!e) {
        s.pending = { kind: 'buy', space: i };
        s.phase = 'buy';
        ev.push({ t: 'buyAsk', p: p.id, space: i, price: PRICE[i] });
        return;
      }
      if (e.owner !== p.id && !e.mortgaged) {
        var total = 0;
        if (k === 'utility') {
          if (byCard) {
            var a = Rng.int(s.rng, 6) + 1, b = Rng.int(s.rng, 6) + 1;
            total = a + b;
            ev.push({ t: 'dice', p: p.id, d: [a, b], doubles: a === b, forRent: true });
          } else {
            total = s.dice ? s.dice[0] + s.dice[1] : 0;
          }
        }
        charge(s, p, rent(s, i, total), e.owner, false, 'rent', i, ev, rentWhy(s, i, total));
      }
      finish(s);
      return;
    }
    if (k === 'tax') {
      charge(s, p, SPACES[i].amount, null, !!s.rules.rainFund, 'tax', i, ev);
      finish(s);
      return;
    }
    if (k === 'card') { draw(s, p, SPACES[i].deck, ev); return; }
    if (k === 'rest') {
      if (s.rules.rainFund && s.rainFund > 0) {
        var f = s.rainFund;
        s.rainFund = 0;
        p.cash += f;
        ev.push({ t: 'fund', p: p.id, amount: f });
      }
      finish(s);
      return;
    }
    if (k === 'bridge') { sendToTraffic(s, p, 'bridge', ev); return; }
    finish(s);
  }

  function keepPass(s, p, deckId, cardId) {
    p.passes = p.passes.concat([deckId]);
    var dk = s.decks[deckId], idx = dk.order.indexOf(cardId);
    if (idx >= 0) {
      dk.order = without(dk.order, idx);
      if (idx < dk.next) dk.next = dk.next - 1;
    }
  }
  function returnPass(s, deckId) {
    var dk = s.decks[deckId];
    dk.order = dk.order.concat([CARPOOL[deckId]]);
  }

  function repairsCost(s, pid, r) {
    var b = buildingsOf(s, pid);
    return b.homes * (r.home || 0) + b.towers * (r.tower || 0);
  }

  function cardEach(s, p, n, ev) {
    var ps = s.players, cnt = ps.length, seat = seatOf(s, p.id), k, q;
    if (n > 0) {
      for (k = 1; k < cnt; k++) {
        q = ps[(seat + k) % cnt];
        if (!q.out) charge(s, q, n, p.id, false, 'each', null, ev);
      }
      return;
    }
    var amt = -n, to = [];
    for (k = 1; k < cnt; k++) {
      q = ps[(seat + k) % cnt];
      if (!q.out) to.push({ id: q.id, amount: amt, fund: false });
    }
    if (!to.length || !(amt > 0)) return;
    var total = amt * to.length;
    if (p.cash >= total) {
      for (k = 0; k < to.length; k++) {
        p.cash -= amt;
        P(s, to[k].id).cash += amt;
        payEvent(p.id, amt, to[k].id, false, 'each', null, ev);
      }
      return;
    }
    addDebt(s, { player: p.id, amount: total, to: to, reason: 'each', space: null }, ev);
  }

  function applyCard(s, p, deckId, cardId, e, ev) {
    if (e.to !== undefined) { moveTo(s, p, e.to, ev); return; }
    if (e.back !== undefined) { moveBack(s, p, e.back, ev); return; }
    if (e.nearest !== undefined) { moveTo(s, p, nearestOf(p.pos, e.nearest), ev); return; }
    if (e.traffic) { sendToTraffic(s, p, 'card', ev); return; }
    if (e.carpool) { keepPass(s, p, deckId, cardId); finish(s); return; }
    if (e.cash !== undefined) {
      if (e.cash > 0) {
        p.cash += e.cash;
        ev.push({ t: 'cash', p: p.id, amount: e.cash, reason: 'card', to: null, fund: false });
      } else {
        charge(s, p, -e.cash, null, !!s.rules.rainFund, 'card', null, ev);
      }
      finish(s);
      return;
    }
    if (e.each !== undefined) { cardEach(s, p, e.each, ev); finish(s); return; }
    if (e.repairs) {
      charge(s, p, repairsCost(s, p.id, e.repairs), null, !!s.rules.rainFund, 'repairs', null, ev);
      finish(s);
      return;
    }
    finish(s);
  }

  function startAuction(s, decliner, i, ev) {
    var ps = s.players, n = ps.length, seat = seatOf(s, decliner.id), order = [];
    for (var k = 1; k <= n; k++) {
      var q = ps[(seat + k) % n];
      if (!q.out) order.push(q.id);
    }
    s.pending = { kind: 'auction', space: i, bid: 0, leader: null, order: order, idx: 0 };
    s.phase = 'auction';
    s.counters.auctions += 1;
    ev.push({ t: 'auction', space: i });
  }
  function endAuction(s, winnerId, amount, ev) {
    var i = s.pending.space;
    if (winnerId !== null) {
      P(s, winnerId).cash -= amount;
      s.props[i] = { owner: winnerId, level: 0, mortgaged: false };
    }
    ev.push({ t: 'auctionEnd', space: i, winner: winnerId, amount: winnerId !== null ? amount : 0 });
    s.pending = null;
    s.phase = nextPhase(s);
  }

  function gameOver(s, ev) {
    var st = standings(s);
    s.phase = 'over';
    s.pending = null;
    s.standings = st;
    s.winner = st.length ? st[0].id : null;
    ev.push({ t: 'over', winner: s.winner, standings: clone(st) });
  }
  function overCheck(s, ev) {
    var alive = 0, humanOut = false;
    for (var i = 0; i < s.players.length; i++) {
      var p = s.players[i];
      if (!p.out) alive++;
      else if (p.kind === 'human') humanOut = true;
    }
    if (alive <= 1 || humanOut) { gameOver(s, ev); return true; }
    return false;
  }

  function advanceTurn(s, ev) {
    var ps = s.players, n = ps.length, cur = s.turn, next = -1, wrapped = false;
    for (var k = 1; k <= n; k++) {
      var j = cur + k;
      if (j >= n) { j -= n; wrapped = true; }
      if (!ps[j].out) { next = j; break; }
    }
    s.counters.turns += 1;
    if (next < 0) { gameOver(s, ev); return; }
    if (wrapped) {
      if (s.limitHit) { gameOver(s, ev); return; }
      s.round += 1;
      var lim = s.rules.limit;
      if (lim.kind === 'rounds' && s.round >= lim.value) {
        s.limitHit = true;
        ev.push({ t: 'limit', kind: 'rounds' });
      }
    }
    s.turn = next;
    s.phase = 'roll';
    s.pending = null;
    s.dice = null;
    s.doubles = 0;
    s.rolled = false;
    s.offersThisTurn = 0;
    ev.push({ t: 'turn', p: ps[next].id, round: s.round });
  }

  function splitCash(cash, to) {
    var total = 0, given = 0, k, shares = [];
    for (k = 0; k < to.length; k++) total += to[k].amount;
    for (k = 0; k < to.length; k++) {
      var a = total > 0 ? Math.floor(cash * to[k].amount / total) : 0;
      given += a;
      shares.push({ id: to[k].id, amount: a, fund: !!to[k].fund });
    }
    for (k = 0; given < cash && shares.length; k = (k + 1) % shares.length) { shares[k].amount += 1; given += 1; }
    return shares;
  }

  function goBankrupt(s, p, d, ev) {
    var i, e, spaces = [];
    for (i = 0; i < N; i++) {
      e = s.props[i];
      if (!e || e.owner !== p.id) continue;
      if (e.level > 0) {
        var count = e.level, amt = count * sellValue(i);
        e.level = 0;
        p.cash += amt;
        ev.push({ t: 'sell', p: p.id, space: i, level: 0, amount: amt, count: count });
      }
      spaces.push(i);
    }
    var to = d.to, cash = p.cash, passes = p.passes, single = to.length === 1 && to[0].id !== null;
    if (single) {
      var c = P(s, to[0].id);
      c.cash += cash;
      for (i = 0; i < spaces.length; i++) s.props[spaces[i]].owner = c.id;
      if (passes.length) c.passes = c.passes.concat(passes);
      p.cash = 0;
      ev.push({ t: 'bankrupt', p: p.id, to: c.id, amount: cash, spaces: spaces, passes: passes.length, shares: null });
    } else {
      var shares = splitCash(cash, to);
      for (i = 0; i < shares.length; i++) {
        var sh = shares[i];
        if (sh.id !== null) P(s, sh.id).cash += sh.amount;
        else if (sh.fund) s.rainFund += sh.amount;
      }
      for (i = 0; i < spaces.length; i++) delete s.props[spaces[i]];
      for (i = 0; i < passes.length; i++) returnPass(s, passes[i]);
      p.cash = 0;
      ev.push({ t: 'bankrupt', p: p.id, to: null, amount: cash, spaces: spaces, passes: passes.length, shares: shares });
    }
    p.passes = [];
    p.out = true;
    p.stuck = false;
    p.stuckTries = 0;
    s.counters.bankrupt += 1;
    p.outOrder = s.counters.bankrupt;
    p.outRound = s.round;
  }

  function cleanDebt(s, d) {
    var payer = P(s, d.player);
    if (!payer || payer.out) return null;
    var keep = [], amount = 0;
    for (var k = 0; k < d.to.length; k++) {
      var t = d.to[k];
      if (t.id === null) { keep.push(t); amount += t.amount; continue; }
      var q = P(s, t.id);
      if (q && !q.out) { keep.push(t); amount += t.amount; }
    }
    if (!keep.length || !(amount > 0)) return null;
    if (keep.length === d.to.length) return d;
    var nd = { player: d.player, amount: amount, to: keep, reason: d.reason, space: d.space };
    if (d.why) nd.why = d.why;
    return nd;
  }

  function nextDebt(s, pd, ev) {
    if (pd.debts.length > 1) {
      s.pending = { kind: 'debt', debts: pd.debts.slice(1), resume: pd.resume };
      s.phase = 'debt';
      return;
    }
    s.pending = null;
    if (pd.resume === 'leave') {
      var tp = turnPlayer(s);
      tp.stuck = false;
      tp.stuckTries = 0;
      moveBy(s, tp, s.dice[0] + s.dice[1], ev);
      return;
    }
    s.phase = pd.resume;
  }


  function doTick(s, a, ev) {
    var ms = a.ms;
    if (typeof ms !== 'number' || !(ms >= 0) || !isFinite(ms)) return 'A tick needs ms >= 0.';
    if (s.phase === 'over') return null;
    s.playMs = s.playMs + ms;
    var lim = s.rules.limit;
    if (!s.limitHit && lim.kind === 'minutes' && s.playMs >= lim.value * 60000) {
      s.limitHit = true;
      ev.push({ t: 'limit', kind: 'minutes' });
    }
    return null;
  }

  function doRoll(s, p, ev) {
    if (s.phase !== 'roll') return 'You cannot roll now.';
    var a = Rng.int(s.rng, 6) + 1, b = Rng.int(s.rng, 6) + 1, dbl = a === b;
    s.dice = [a, b];
    s.rolled = true;
    ev.push({ t: 'dice', p: p.id, d: [a, b], doubles: dbl, forRent: false });
    if (p.stuck) {
      s.doubles = 0;
      if (dbl) {
        p.stuck = false;
        p.stuckTries = 0;
        ev.push({ t: 'leave', p: p.id, how: 'doubles', amount: 0 });
        moveBy(s, p, a + b, ev);
        return null;
      }
      p.stuckTries = p.stuckTries + 1;
      if (p.stuckTries < RULES.trafficMaxTries) { s.phase = 'end'; return null; }
      var fee = RULES.trafficFee;
      if (p.cash >= fee) {
        p.cash -= fee;
        p.stuck = false;
        p.stuckTries = 0;
        ev.push({ t: 'leave', p: p.id, how: 'forced', amount: fee });
        moveBy(s, p, a + b, ev);
      } else {
        addDebt(s, { player: p.id, amount: fee, to: [{ id: null, amount: fee, fund: false }], reason: 'traffic', space: null }, ev);
      }
      return null;
    }
    if (dbl) {
      s.doubles = s.doubles + 1;
      if (s.doubles >= RULES.doublesToTraffic) { sendToTraffic(s, p, 'doubles', ev); return null; }
    } else {
      s.doubles = 0;
    }
    moveBy(s, p, a + b, ev);
    return null;
  }

  function doPayFee(s, p, ev) {
    if (s.phase !== 'roll' || !p.stuck) return 'You are not stuck in traffic.';
    var fee = RULES.trafficFee;
    if (p.cash < fee) return 'Not enough cash to pay the fee.';
    p.cash -= fee;
    p.stuck = false;
    p.stuckTries = 0;
    ev.push({ t: 'leave', p: p.id, how: 'fee', amount: fee });
    return null;
  }

  function doUsePass(s, p, ev) {
    if (s.phase !== 'roll' || !p.stuck) return 'You are not stuck in traffic.';
    if (!p.passes.length) return 'You have no Carpool Pass.';
    var deckId = p.passes[0];
    p.passes = p.passes.slice(1);
    returnPass(s, deckId);
    p.stuck = false;
    p.stuckTries = 0;
    ev.push({ t: 'leave', p: p.id, how: 'pass', amount: 0, deck: deckId });
    return null;
  }

  function doBuy(s, p, ev) {
    if (s.phase !== 'buy') return 'There is nothing to buy now.';
    var i = s.pending.space, price = PRICE[i];
    if (p.cash < price) return 'Not enough cash: sell or mortgage first, or decline.';
    p.cash -= price;
    s.props[i] = { owner: p.id, level: 0, mortgaged: false };
    ev.push({ t: 'buy', p: p.id, space: i, price: price });
    s.pending = null;
    s.phase = nextPhase(s);
    return null;
  }

  function doDecline(s, p, ev) {
    if (s.phase !== 'buy') return 'There is nothing to decline now.';
    var i = s.pending.space;
    if (s.rules.auctions) { startAuction(s, p, i, ev); return null; }
    s.pending = null;
    s.phase = nextPhase(s);
    return null;
  }

  function doBid(s, p, a, ev) {
    if (s.phase !== 'auction') return 'There is no auction now.';
    var pd = s.pending, amount = a.amount;
    if (!isInt(amount)) return 'A bid must be a whole number of dollars.';
    if (amount < minBid(s)) return 'Bid more than the current bid (at least the opening bid).';
    if (amount > p.cash) return 'You cannot bid more than your cash.';
    ev.push({ t: 'bid', p: p.id, amount: amount });
    if (pd.order.length === 1) { endAuction(s, p.id, amount, ev); return null; }
    var idx = pd.idx + 1;
    if (idx >= pd.order.length) idx = 0;
    s.pending = { kind: 'auction', space: pd.space, bid: amount, leader: p.id, order: pd.order, idx: idx };
    return null;
  }

  function doBidPass(s, p, ev) {
    if (s.phase !== 'auction') return 'There is no auction now.';
    var pd = s.pending, order = without(pd.order, pd.idx), idx = pd.idx;
    if (idx >= order.length) idx = 0;
    ev.push({ t: 'bidPass', p: p.id });
    if (!order.length) { endAuction(s, pd.leader, pd.bid, ev); return null; }
    if (order.length === 1 && pd.leader === order[0]) { endAuction(s, pd.leader, pd.bid, ev); return null; }
    s.pending = { kind: 'auction', space: pd.space, bid: pd.bid, leader: pd.leader, order: order, idx: idx };
    return null;
  }

  function doAck(s, p, ev) {
    if (s.phase !== 'card') return 'There is no card to read.';
    var pc = s.pending, card = CD.card(pc.deck, pc.id);
    if (!card || !card.effect) return 'internal: unknown card ' + pc.id;
    s.pending = null;
    applyCard(s, p, pc.deck, pc.id, card.effect, ev);
    return null;
  }

  function doBuild(s, p, a, ev) {
    var i = a.space, why = buildError(s, p.id, i);
    if (why) return why;
    var e = s.props[i], cost = B.buildCost(i);
    e.level = e.level + 1;
    p.cash -= cost;
    ev.push({ t: 'build', p: p.id, space: i, level: e.level, amount: cost });
    return null;
  }

  function doSell(s, p, a, ev) {
    var i = a.space, why = sellError(s, p.id, i);
    if (why) return why;
    var e = s.props[i], back = sellValue(i);
    e.level = e.level - 1;
    p.cash += back;
    ev.push({ t: 'sell', p: p.id, space: i, level: e.level, amount: back, count: 1 });
    return null;
  }

  function doMortgage(s, p, a, ev) {
    var i = a.space, why = mortgageError(s, p.id, i);
    if (why) return why;
    var amt = B.mortgageValue(i);
    s.props[i].mortgaged = true;
    p.cash += amt;
    ev.push({ t: 'mortgage', p: p.id, space: i, amount: amt });
    return null;
  }

  function doUnmortgage(s, p, a, ev) {
    var i = a.space, why = unmortgageError(s, p.id, i);
    if (why) return why;
    var cost = B.unmortgageCost(i);
    s.props[i].mortgaged = false;
    p.cash -= cost;
    ev.push({ t: 'unmortgage', p: p.id, space: i, amount: cost });
    return null;
  }

  function doOffer(s, p, a, ev) {
    var o = a.offer, why = offerError(s, o);
    if (why) return why;
    if (o.from !== p.id) return 'Only the player whose turn it is can make an offer.';
    var n = normOffer(o);
    s.pending = { kind: 'trade', offer: n, back: s.phase };
    s.phase = 'trade';
    s.offersThisTurn = s.offersThisTurn + 1;
    ev.push({ t: 'offer', offer: normOffer(n) });
    return null;
  }

  function cleanReason(r) { return typeof r === 'string' && r ? r.slice(0, 128) : null; }

  function moveSide(s, giver, taker, side) {
    if (side.cash) { giver.cash -= side.cash; taker.cash += side.cash; }
    for (var k = 0; k < side.spaces.length; k++) s.props[side.spaces[k]].owner = taker.id;
    if (side.passes) {
      var moved = giver.passes.slice(0, side.passes);
      giver.passes = giver.passes.slice(side.passes);
      taker.passes = taker.passes.concat(moved);
    }
  }

  function doAccept(s, p, a, ev) {
    if (s.phase !== 'trade') return 'There is no offer to answer.';
    var pd = s.pending, o = pd.offer, why = offerContentError(s, o);
    if (why) return why;
    var from = P(s, o.from), to = P(s, o.to);
    moveSide(s, from, to, o.give);
    moveSide(s, to, from, o.get);
    s.counters.trades += 1;
    ev.push({ t: 'trade', offer: normOffer(o), reason: cleanReason(a.reason) });
    s.pending = null;
    s.phase = pd.back;
    return null;
  }

  function doReject(s, p, a, ev) {
    if (s.phase !== 'trade') return 'There is no offer to answer.';
    var pd = s.pending;
    ev.push({ t: 'tradeNo', offer: normOffer(pd.offer), reason: cleanReason(a.reason) });
    if (p.kind === 'human') remember(s, pd.offer);
    s.pending = null;
    s.phase = pd.back;
    return null;
  }
  function remember(s, o) {
    var n = normOffer(o), old = Array.isArray(s.declined) ? s.declined : [], list = [];
    for (var k = Math.max(0, old.length - DECLINED_MAX + 1); k < old.length; k++) list.push(old[k]);
    list.push({ from: n.from, to: n.to, give: n.give.spaces, get: n.get.spaces, cash: (n.give.cash || 0) - (n.get.cash || 0), round: s.round });
    s.declined = list;
  }

  function doPay(s, p, ev) {
    if (s.phase !== 'debt') return 'You do not owe anything now.';
    var pd = s.pending, d = pd.debts[0];
    if (p.cash < d.amount) return 'Not enough cash yet: sell buildings or mortgage spaces first.';
    for (var k = 0; k < d.to.length; k++) {
      var t = d.to[k];
      p.cash -= t.amount;
      if (t.id !== null) P(s, t.id).cash += t.amount;
      else if (t.fund) s.rainFund += t.amount;
      payEvent(p.id, t.amount, t.id, t.fund, d.reason, d.space, ev, d.why);
    }
    nextDebt(s, pd, ev);
    return null;
  }

  function doBankrupt(s, p, ev) {
    if (s.phase !== 'debt') return 'You do not owe anything now.';
    var pd = s.pending, d = pd.debts[0];
    if (liquid(s, p.id) >= d.amount) return 'You can still raise the money: sell buildings or mortgage spaces.';
    var tp = turnPlayer(s), wasTurn = tp && tp.id === p.id;
    goBankrupt(s, p, d, ev);
    var rest = [];
    for (var k = 1; k < pd.debts.length; k++) {
      var x = cleanDebt(s, pd.debts[k]);
      if (x) rest.push(x);
    }
    s.pending = null;
    if (overCheck(s, ev)) return null;
    if (rest.length) {
      s.pending = { kind: 'debt', debts: rest, resume: pd.resume };
      s.phase = 'debt';
      return null;
    }
    if (wasTurn) { advanceTurn(s, ev); return null; }
    s.phase = pd.resume === 'leave' ? 'end' : pd.resume;
    return null;
  }

  function doEndTurn(s, p, ev) {
    if (s.phase !== 'end') return s.phase === 'roll' ? 'Roll first.' : 'You cannot end your turn now.';
    advanceTurn(s, ev);
    return null;
  }

  function dispatch(s, a, ev) {
    if (a.t === 'tick') return doTick(s, a, ev);
    if (s.phase === 'over') return 'The game is over.';
    var who = actor(s);
    if (who === null) return 'No one can act now.';
    if (a.p !== who) return a.p === undefined ? 'The action needs p, the acting player id.' : 'It is not that player\'s move.';
    var p = P(s, who);
    if (!p || p.out) return 'That player is out of the game.';
    switch (a.t) {
      case 'roll': return doRoll(s, p, ev);
      case 'payFee': return doPayFee(s, p, ev);
      case 'usePass': return doUsePass(s, p, ev);
      case 'buy': return doBuy(s, p, ev);
      case 'decline': return doDecline(s, p, ev);
      case 'bid': return doBid(s, p, a, ev);
      case 'pass': return doBidPass(s, p, ev);
      case 'ack': return doAck(s, p, ev);
      case 'build': return doBuild(s, p, a, ev);
      case 'sell': return doSell(s, p, a, ev);
      case 'mortgage': return doMortgage(s, p, a, ev);
      case 'unmortgage': return doUnmortgage(s, p, a, ev);
      case 'offer': return doOffer(s, p, a, ev);
      case 'accept': return doAccept(s, p, a, ev);
      case 'reject': return doReject(s, p, a, ev);
      case 'pay': return doPay(s, p, ev);
      case 'bankrupt': return doBankrupt(s, p, ev);
      case 'endTurn': return doEndTurn(s, p, ev);
      default: return 'Unknown action.';
    }
  }

  function commitLog(s, ev) {
    if (!ev.length) return;
    var log = s.log, n = log.length, max = RULES.logMax, i;
    if (n + ev.length > max) {
      for (i = 0; i < n; i++) LOGBUF[i] = log[i];
      logSavedN = n;
      logSaved = true;
    }
    for (i = 0; i < ev.length; i++) log.push(ev[i]);
    while (log.length > max) log.shift();
    if (logSaved) {
      for (i = 0; i < logSavedN; i++) LOGBUF[i] = null;
      logSaved = false;
    }
  }

  function act(s, a) {
    var ev = [], snapped = false;
    try {
      if (!s || typeof s !== 'object' || !s.players) return { ok: false, error: 'No game.', events: [] };
      if (!a || typeof a !== 'object' || typeof a.t !== 'string') return { ok: false, error: 'Unknown action.', events: [] };
      snapshot(s);
      snapped = true;
      var err = dispatch(s, a, ev);
      if (err) { restore(s); return { ok: false, error: err, events: [] }; }
      commitLog(s, ev);
      return { ok: true, error: null, events: ev };
    } catch (e) {
      if (snapped) { try { restore(s); } catch (e2) { } }
      return { ok: false, error: 'internal: ' + errMsg(e), events: [] };
    }
  }


  function cleanName(n) {
    if (typeof n !== 'string') return '';
    return n.replace(/[\u0000-\u001f\u007f]/g, '').replace(/\s+/g, ' ').trim().slice(0, 24);
  }
  function normLimit(l) {
    if (typeof l === 'string') {
      var list = (ECE.Glossary && ECE.Glossary.limits) || [];
      for (var i = 0; i < list.length; i++) {
        if (list[i].id === l && (list[i].kind === 'minutes' || list[i].kind === 'rounds') && list[i].value > 0) return { kind: list[i].kind, value: list[i].value };
      }
      return { kind: 'none', value: 0 };
    }
    if (l && typeof l === 'object' && (l.kind === 'minutes' || l.kind === 'rounds') && typeof l.value === 'number' && l.value > 0 && isFinite(l.value)) {
      return { kind: l.kind, value: l.kind === 'rounds' ? Math.max(1, Math.floor(l.value)) : l.value };
    }
    return { kind: 'none', value: 0 };
  }
  function normRules(r) {
    r = r && typeof r === 'object' ? r : {};
    return { auctions: r.auctions !== false, rainFund: r.rainFund === true, limit: normLimit(r.limit) };
  }

  function newGame(opts) {
    opts = opts && typeof opts === 'object' ? opts : {};
    var G = ECE.Glossary || {};
    var comps = G.computers || [], tokens = G.tokens || [], colors = G.playerColors || [];
    var tokenIds = [], i;
    for (i = 0; i < tokens.length; i++) tokenIds.push(tokens[i].id);
    var seed = typeof opts.seed === 'number' && isFinite(opts.seed) ? Math.floor(opts.seed) >>> 0
      : typeof opts.seed === 'string' ? Rng.hash(opts.seed) : 1;
    var rng = Rng.create(seed);
    var input = Array.isArray(opts.players) ? opts.players : [], list = [];
    for (i = 0; i < input.length && list.length < RULES.maxPlayers; i++) list.push(input[i] && typeof input[i] === 'object' ? input[i] : {});
    if (!list.length) list.push({ kind: 'human' });
    while (list.length < RULES.minPlayers) list.push({ kind: 'cpu' });
    var players = [], used = {}, names = {}, cpuN = 0;
    for (i = 0; i < list.length; i++) {
      var q = list[i], kind = q.kind === 'human' ? 'human' : 'cpu';
      var comp = kind === 'cpu' && comps.length ? comps[cpuN++ % comps.length] : null;
      var token = tokenIds.indexOf(q.token) >= 0 ? q.token : comp && tokenIds.indexOf(comp.token) >= 0 ? comp.token : tokenIds[0] || 'ferry';
      if (used[token]) {
        for (var k = 0; k < tokenIds.length; k++) if (!used[tokenIds[k]]) { token = tokenIds[k]; break; }
      }
      used[token] = true;
      var nm = cleanName(q.name) || (kind === 'human' ? 'You' : comp ? comp.name : 'Player ' + (i + 1));
      if (names[nm]) { var base = nm.slice(0, 21), m = 2; while (names[base + ' ' + m]) m++; nm = base + ' ' + m; }
      names[nm] = true;
      players.push({
        id: i,
        name: nm,
        token: token,
        color: typeof q.color === 'string' && q.color ? q.color : colors[i] || '#5A6B73',
        kind: kind,
        level: LEVELS.indexOf(q.level) >= 0 ? q.level : 'normal',
        persona: typeof q.persona === 'string' && q.persona ? q.persona : comp ? comp.persona : null,
        cash: RULES.startCash, pos: START, stuck: false, stuckTries: 0, passes: [], out: false, outOrder: 0, outRound: 0
      });
    }
    if (!opts.keepOrder) Rng.shuffle(rng, players);
    var decks = {};
    for (i = 0; i < DECK_IDS.length; i++) decks[DECK_IDS[i]] = { order: Rng.shuffle(rng, CARD_IDS[DECK_IDS[i]].slice()), next: 0 };
    var rules = normRules(opts.rules);
    var s = {
      v: 1, seed: seed, rng: rng,
      createdAt: typeof opts.now === 'number' && isFinite(opts.now) ? opts.now : 0,
      playMs: 0, round: 1, turn: 0, phase: 'roll', dice: null, doubles: 0, rolled: false,
      players: players, props: {}, decks: decks, rainFund: 0, rules: rules, pending: null,
      limitHit: false, offersThisTurn: 0, log: [], winner: null, standings: null,
      counters: { turns: 0, trades: 0, auctions: 0, bankrupt: 0 },
      declined: []
    };
    if (rules.limit.kind === 'rounds' && rules.limit.value <= 1) {
      s.limitHit = true;
      s.log.push({ t: 'limit', kind: 'rounds' });
    }
    s.log.push({ t: 'turn', p: players[0].id, round: 1 });
    return s;
  }


  var WORDS = ['No', 'One', 'Two', 'Three', 'Four', 'Five', 'Six'];
  function drivingBy() {
    var g = ECE.Glossary && ECE.Glossary.places && ECE.Glossary.places.drivingBy;
    g = typeof g === 'string' && g ? g : 'Just driving by';
    return g.charAt(0).toLowerCase() + g.slice(1);
  }
  function tx(s, ev, viewer) {
    var me = viewer !== undefined && viewer !== null;
    function isYou(id) { return me && id === viewer; }
    function Name(id) {
      if (isYou(id)) return 'You';
      var p = id !== null && id !== undefined ? P(s, id) : null;
      return p ? p.name : 'Someone';
    }
    function name(id) { return isYou(id) ? 'you' : Name(id); }
    function poss(id) { return isYou(id) ? 'your' : Name(id) + '\'s'; }
    function v(id, he, you) { return isYou(id) ? you : he; }
    function sp(i) { return isSpace(i) ? SPACES[i].name : 'a space'; }
    function n(k, one, many) { return k + ' ' + (k === 1 ? one : many); }
    function side(sd) {
      var items = [];
      if (!sd) return items;
      if (sd.cash > 0) items.push(money(sd.cash));
      var list = sd.spaces || [];
      for (var k = 0; k < list.length; k++) items.push(sp(list[k]));
      if (sd.passes > 0) items.push(sd.passes === 1 ? 'a Carpool Pass' : sd.passes + ' Carpool Passes');
      return items;
    }
    function join(items) {
      if (items.length <= 1) return items.join('');
      return items.slice(0, -1).join(', ') + ' and ' + items[items.length - 1];
    }
    function quote(r) { return r ? ': "' + r + '"' : ''; }
    function deal(o) {
      var give = side(o.give), get = side(o.get);
      var gc = o.give && o.give.cash > 0, tc = o.get && o.get.cash > 0;
      var gThings = give.length - (gc ? 1 : 0), tThings = get.length - (tc ? 1 : 0);
      if (!get.length) return Name(o.from) + ' gave ' + join(give) + ' to ' + name(o.to);
      if (!give.length) return Name(o.to) + ' gave ' + join(get) + ' to ' + name(o.from);
      if (tThings && !tc && gc && !gThings) return Name(o.to) + ' sold ' + join(get) + ' to ' + name(o.from) + ' for ' + money(o.give.cash);
      if (gThings && !gc && tc && !tThings) return Name(o.from) + ' sold ' + join(give) + ' to ' + name(o.to) + ' for ' + money(o.get.cash);
      return Name(o.from) + ' traded ' + join(give) + ' to ' + name(o.to) + ' for ' + join(get);
    }
    function proposal(o) {
      var give = side(o.give), get = side(o.get);
      if (!get.length) return poss(o.from) + ' gift of ' + join(give);
      if (!give.length) return poss(o.from) + ' request for ' + join(get);
      return poss(o.from) + ' offer of ' + join(give) + ' for ' + join(get);
    }
    var p = ev.p, d, w;
    switch (ev.t) {
      case 'dice':
        d = ev.d || [0, 0];
        if (ev.forRent) return Name(p) + ' rolled ' + d[0] + ' and ' + d[1] + ' (' + (d[0] + d[1]) + ') for the rent.';
        if (ev.doubles) return Name(p) + ' rolled double ' + d[0] + 's (' + (d[0] + d[1]) + ').';
        return Name(p) + ' rolled ' + d[0] + ' and ' + d[1] + ' (' + (d[0] + d[1]) + ').';
      case 'move':
        if (ev.jump) return Name(p) + ' went straight to ' + sp(ev.to) + '.';
        w = ev.to === TRAFFIC ? ' (' + drivingBy() + ')' : '';
        if (ev.steps < 0) return Name(p) + ' went back ' + n(-ev.steps, 'space', 'spaces') + ' to ' + sp(ev.to) + w + '.';
        return Name(p) + ' moved ' + n(ev.steps, 'space', 'spaces') + ' to ' + sp(ev.to) + w + '.';
      case 'salary': return Name(p) + ' collected ' + money(ev.amount) + ' salary at ' + SPACES[START].name + '.';
      case 'land': return Name(p) + ' landed on ' + sp(ev.space) + '.';
      case 'buyAsk': return Name(p) + ' can buy ' + sp(ev.space) + ' for ' + money(ev.price) + '.';
      case 'buy': return Name(p) + ' bought ' + sp(ev.space) + ' for ' + money(ev.price) + '.';
      case 'auction': return sp(ev.space) + ' is up for auction.';
      case 'bid': return Name(p) + ' bid ' + money(ev.amount) + '.';
      case 'bidPass': return Name(p) + ' dropped out of the auction.';
      case 'auctionEnd':
        if (ev.winner === null || ev.winner === undefined) return 'No one bid on ' + sp(ev.space) + '; it stays unowned.';
        return Name(ev.winner) + ' won ' + sp(ev.space) + ' for ' + money(ev.amount) + '.';
      case 'rent': w = whyText(ev.why); return Name(p) + ' paid ' + money(ev.amount) + ' rent to ' + name(ev.owner) + ' for ' + sp(ev.space) + (w ? ' (' + w + ')' : '') + '.';
      case 'tax': return sp(ev.space) + ': ' + name(p) + ' paid ' + money(ev.amount) + (ev.fund ? ' into the Rain Fund.' : '.');
      case 'card':
        var card = CD.card(ev.deck, ev.id), deck = CD.DECKS[ev.deck];
        return Name(p) + ' drew ' + (deck ? deck.name : 'a card') + (card ? ': "' + card.text + '"' : '.');
      case 'cash':
        if (ev.to !== null && ev.to !== undefined) return Name(p) + ' paid ' + money(Math.abs(ev.amount)) + ' to ' + name(ev.to) + '.';
        if (ev.amount > 0) return Name(p) + ' collected ' + money(ev.amount) + '.';
        if (ev.amount < 0 && ev.reason === 'repairs') return Name(p) + ' paid ' + money(-ev.amount) + ' for upkeep' + (ev.fund ? ' into the Rain Fund.' : '.');
        if (ev.amount < 0) return Name(p) + ' paid ' + money(-ev.amount) + (ev.fund ? ' into the Rain Fund.' : ' to the bank.');
        return Name(p) + ' paid nothing.';
      case 'traffic':
        if (ev.reason === 'bridge') return 'The ' + (SPACES[B.BRIDGE].area || SPACES[B.BRIDGE].name) + ' is up: ' + name(p) + ' ' + v(p, 'is', 'are') + ' stuck in traffic.';
        if (ev.reason === 'doubles') return (WORDS[RULES.doublesToTraffic] || RULES.doublesToTraffic) + ' doubles in a row: ' + name(p) + ' ' + v(p, 'is', 'are') + ' stuck in traffic.';
        return Name(p) + ' ' + v(p, 'is', 'are') + ' stuck in traffic.';
      case 'leave':
        if (ev.how === 'fee') return Name(p) + ' paid ' + money(ev.amount) + ' to leave traffic.';
        if (ev.how === 'pass') return Name(p) + ' used a Carpool Pass to leave traffic.';
        if (ev.how === 'doubles') return Name(p) + ' rolled doubles and left traffic.';
        return Name(p) + ' paid ' + money(ev.amount) + ' and left traffic after ' + RULES.trafficMaxTries + ' tries.';
      case 'build':
        if (ev.level >= RULES.maxLevel) return Name(p) + ' built a tower on ' + sp(ev.space) + ' for ' + money(ev.amount) + '.';
        return Name(p) + ' built a home on ' + sp(ev.space) + ' for ' + money(ev.amount) + ' (' + n(ev.level, 'home', 'homes') + ').';
      case 'sell':
        if (ev.count > 1) return Name(p) + ' sold the buildings on ' + sp(ev.space) + ' for ' + money(ev.amount) + '.';
        if (ev.level === RULES.maxLevel - 1) return Name(p) + ' sold the tower on ' + sp(ev.space) + ' for ' + money(ev.amount) + ' (' + n(ev.level, 'home', 'homes') + ' left).';
        return Name(p) + ' sold a home on ' + sp(ev.space) + ' for ' + money(ev.amount) + (ev.level > 0 ? ' (' + n(ev.level, 'home', 'homes') + ' left).' : '.');
      case 'mortgage': return Name(p) + ' mortgaged ' + sp(ev.space) + ' for ' + money(ev.amount) + '.';
      case 'unmortgage': return Name(p) + ' paid off the mortgage on ' + sp(ev.space) + ' for ' + money(ev.amount) + '.';
      case 'offer':
        var o = ev.offer || {}, give = side(o.give), get = side(o.get);
        if (!get.length) return Name(o.from) + ' offered ' + name(o.to) + ' ' + join(give) + ' as a gift.';
        if (!give.length) return Name(o.from) + ' asked ' + name(o.to) + ' for ' + join(get) + '.';
        return Name(o.from) + ' offered ' + name(o.to) + ' ' + join(give) + ' for ' + join(get) + '.';
      case 'trade':
        return deal(ev.offer || {}) + '.';
      case 'tradeNo':
        w = ev.offer || {};
        return Name(w.to) + ' turned down ' + proposal(w) + (ev.reason && isYou(w.from) && !isYou(w.to) ? quote(ev.reason) : '.');
      case 'debt':
        var whom = ev.to !== null && ev.to !== undefined ? name(ev.to) : ev.reason === 'each' ? 'the other players' : ev.fund ? 'the Rain Fund' : 'the bank';
        return Name(p) + ' ' + v(p, 'owes', 'owe') + ' ' + whom + ' ' + money(ev.amount) + (ev.reason === 'rent' ? ' rent' : '') +
          (isYou(p) ? ': sell buildings or mortgage spaces to pay.' : '.');
      case 'bankrupt':
        if (ev.to !== null && ev.to !== undefined) {
          return Name(p) + ' ' + v(p, 'is', 'are') + ' bankrupt and out; ' + name(ev.to) + ' ' + v(ev.to, 'takes', 'take') + ' ' + (isYou(p) ? 'your' : 'their') + ' cash and spaces.';
        }
        return Name(p) + ' ' + v(p, 'is', 'are') + ' bankrupt and out; ' + (isYou(p) ? 'your' : 'their') + ' spaces go back to the bank.';
      case 'fund': return Name(p) + ' collected the Rain Fund: ' + money(ev.amount) + '.';
      case 'turn': return 'Round ' + ev.round + ': ' + (isYou(p) ? 'your' : Name(p) + '\'s') + ' turn.';
      case 'limit':
        if (ev.kind === 'minutes') return 'Time is up: this is the last round.';
        return 'Last round: the richest player wins when it ends.';
      case 'over':
        var line = 'Game over: ' + name(ev.winner) + ' ' + v(ev.winner, 'wins', 'win') + (isYou(ev.winner) ? '!' : '.');
        var st = ev.standings || [];
        if (me && !isYou(ev.winner)) {
          for (var k = 0; k < st.length; k++) if (st[k].id === viewer) line += ' You finished ' + ordinal(st[k].rank) + ' of ' + st.length + '.';
        }
        return line;
      default: return '';
    }
  }
  function endLine(line) { return typeof line === 'string' ? line.replace(/([.!?])\.$/, '$1') : ''; }
  function text(s, ev, viewerId) {
    try {
      if (!s || !s.players || !ev || typeof ev !== 'object') return '';
      return endLine(tx(s, ev, viewerId));
    } catch (e) {
      return '';
    }
  }


  function check(s) {
    var out = [];
    try { checkInto(s, out); } catch (e) { out.push('check failed: ' + errMsg(e)); }
    return out;
  }

  function checkInto(s, out) {
    if (!s || typeof s !== 'object') { out.push('no state'); return; }
    var ps = s.players, i, k, p, e;
    if (!Array.isArray(ps) || ps.length < RULES.minPlayers || ps.length > RULES.maxPlayers) { out.push('players: need 2-6'); return; }
    if (!s.props || typeof s.props !== 'object') { out.push('props missing'); return; }
    if (!s.decks || !s.decks.rain || !s.decks.buzz) { out.push('decks missing'); return; }
    if (!s.rules || !s.rules.limit) { out.push('rules missing'); return; }
    if (!s.counters) { out.push('counters missing'); return; }
    var pd = s.pending, ids = 0, outOrders = 0, outCount = 0;
    for (i = 0; i < ps.length; i++) {
      p = ps[i];
      if (!p || !isInt(p.id) || p.id < 0 || p.id >= RULES.maxPlayers) { out.push('player at seat ' + i + ': bad id'); continue; }
      if (ids & (1 << p.id)) out.push('player id ' + p.id + ' appears twice');
      ids |= 1 << p.id;
      var who = 'player ' + p.id;
      if (!isInt(p.cash) || p.cash < 0) out.push(who + ': cash ' + p.cash);
      if (!isSpace(p.pos)) out.push(who + ': pos ' + p.pos);
      if (typeof p.stuck !== 'boolean') out.push(who + ': stuck not a boolean');
      if (p.stuck && p.pos !== TRAFFIC) out.push(who + ': stuck but not on Stuck in Traffic');
      if (!isInt(p.stuckTries) || p.stuckTries < 0 || p.stuckTries > RULES.trafficMaxTries) out.push(who + ': stuckTries ' + p.stuckTries);
      if (!p.stuck && p.stuckTries !== 0) out.push(who + ': stuckTries without being stuck');
      if (p.stuckTries === RULES.trafficMaxTries) {
        var forced = s.phase === 'debt' && pd && pd.resume === 'leave' && pd.debts && pd.debts[0] && pd.debts[0].player === p.id;
        if (!forced) out.push(who + ': ' + p.stuckTries + ' tries but no traffic fee owed');
      }
      if (!Array.isArray(p.passes)) out.push(who + ': passes not a list');
      else for (k = 0; k < p.passes.length; k++) if (p.passes[k] !== 'rain' && p.passes[k] !== 'buzz') out.push(who + ': bad pass ' + p.passes[k]);
      if (p.kind !== 'human' && p.kind !== 'cpu') out.push(who + ': kind ' + p.kind);
      if (LEVELS.indexOf(p.level) < 0) out.push(who + ': level ' + p.level);
      if (p.out) {
        outCount++;
        if (p.cash !== 0) out.push(who + ': out with cash');
        if (p.passes && p.passes.length) out.push(who + ': out with passes');
        if (p.stuck) out.push(who + ': out and stuck');
        if (!isInt(p.outOrder) || p.outOrder < 1 || p.outOrder > ps.length) out.push(who + ': outOrder ' + p.outOrder);
        else if (outOrders & (1 << p.outOrder)) out.push(who + ': outOrder ' + p.outOrder + ' twice');
        else outOrders |= 1 << p.outOrder;
        if (p.outRound !== undefined && (!isInt(p.outRound) || p.outRound < 0 || p.outRound > s.round)) out.push(who + ': outRound ' + p.outRound);
      } else if (p.outOrder !== 0) out.push(who + ': in the game with outOrder ' + p.outOrder);
      else if (p.outRound !== undefined && p.outRound !== 0) out.push(who + ': in the game with outRound ' + p.outRound);
    }
    if (s.counters.bankrupt !== outCount) out.push('counters.bankrupt ' + s.counters.bankrupt + ' but ' + outCount + ' out');
    for (var key in s.props) {
      if (!Object.prototype.hasOwnProperty.call(s.props, key)) continue;
      var si = +key;
      e = s.props[key];
      if (!isSpace(si) || String(si) !== key || !OWNABLE[si]) { out.push('props: ' + key + ' is not an ownable space'); continue; }
      if (!e || typeof e !== 'object') { out.push('props ' + key + ': not an entry'); continue; }
      var owner = P(s, e.owner);
      if (!owner) out.push('props ' + key + ': owner ' + e.owner + ' does not exist');
      else if (owner.out) out.push('props ' + key + ': owner ' + e.owner + ' is out');
      if (!isInt(e.level) || e.level < 0 || e.level > RULES.maxLevel) out.push('props ' + key + ': level ' + e.level);
      if (e.level > 0 && KIND[si] !== 'street') out.push('props ' + key + ': buildings on a non-street');
      if (typeof e.mortgaged !== 'boolean') out.push('props ' + key + ': mortgaged not a boolean');
      if (e.mortgaged && e.level > 0) out.push('props ' + key + ': mortgaged with buildings');
    }
    var D = B.DISTRICTS;
    for (k = 0; k < D.length; k++) {
      var dsp = D[k].spaces, built = false, min = 99, max = -1, own = undefined, same = true, anyMort = false;
      for (i = 0; i < dsp.length; i++) {
        e = s.props[dsp[i]];
        var lv = e ? e.level : 0;
        if (lv > 0) built = true;
        if (lv < min) min = lv;
        if (lv > max) max = lv;
        if (!e) same = false;
        else { if (own === undefined) own = e.owner; else if (own !== e.owner) same = false; if (e.mortgaged) anyMort = true; }
      }
      if (!built) continue;
      if (!same) out.push(D[k].id + ': buildings without one owner of the whole district');
      if (anyMort) out.push(D[k].id + ': buildings in a district with a mortgage');
      if (max - min > 1) out.push(D[k].id + ': uneven buildings (' + min + '..' + max + ')');
    }
    for (k = 0; k < DECK_IDS.length; k++) {
      var dn = DECK_IDS[k], dk = s.decks[dn], ids2 = CARD_IDS[dn];
      if (!dk || !Array.isArray(dk.order)) { out.push('deck ' + dn + ': no order'); continue; }
      if (!isInt(dk.next) || dk.next < 0 || dk.next > dk.order.length) out.push('deck ' + dn + ': next ' + dk.next);
      var held = 0;
      for (i = 0; i < ps.length; i++) if (ps[i] && Array.isArray(ps[i].passes)) for (var h = 0; h < ps[i].passes.length; h++) if (ps[i].passes[h] === dn) held++;
      if (dk.order.length + held !== ids2.length) out.push('deck ' + dn + ': ' + dk.order.length + ' cards + ' + held + ' passes held, want ' + ids2.length);
      for (i = 0; i < ids2.length; i++) {
        var cnt = 0;
        for (h = 0; h < dk.order.length; h++) if (dk.order[h] === ids2[i]) cnt++;
        if (ids2[i] === CARPOOL[dn]) cnt += held;
        if (cnt !== 1) out.push('deck ' + dn + ': card ' + ids2[i] + ' appears ' + cnt + ' times');
      }
    }
    if (!isInt(s.rainFund) || s.rainFund < 0) out.push('rainFund ' + s.rainFund);
    if (!s.rules.rainFund && s.rainFund !== 0) out.push('rainFund ' + s.rainFund + ' with the Rain Fund rule off');
    if (!isInt(s.round) || s.round < 1) out.push('round ' + s.round);
    if (!isInt(s.doubles) || s.doubles < 0 || s.doubles >= RULES.doublesToTraffic) out.push('doubles ' + s.doubles);
    if (s.dice !== null && !(Array.isArray(s.dice) && s.dice.length === 2 && isInt(s.dice[0]) && isInt(s.dice[1]) &&
        s.dice[0] >= 1 && s.dice[0] <= 6 && s.dice[1] >= 1 && s.dice[1] <= 6)) out.push('dice ' + JSON.stringify(s.dice));
    if (typeof s.rolled !== 'boolean') out.push('rolled not a boolean');
    if (!isInt(s.offersThisTurn) || s.offersThisTurn < 0 || s.offersThisTurn > MAX_OFFERS) out.push('offersThisTurn ' + s.offersThisTurn);
    if (typeof s.limitHit !== 'boolean') out.push('limitHit not a boolean');
    if (typeof s.playMs !== 'number' || !(s.playMs >= 0) || !isFinite(s.playMs)) out.push('playMs ' + s.playMs);
    var c = s.counters;
    if (!isInt(c.turns) || c.turns < 0 || !isInt(c.trades) || c.trades < 0 || !isInt(c.auctions) || c.auctions < 0) out.push('counters ' + JSON.stringify(c));
    if (!Array.isArray(s.log) || s.log.length > RULES.logMax) out.push('log missing or too long');
    checkDeclined(s, out);
    var lk = s.rules.limit.kind;
    if (lk !== 'none' && lk !== 'minutes' && lk !== 'rounds') out.push('limit kind ' + lk);
    if (!isInt(s.turn) || s.turn < 0 || s.turn >= ps.length) { out.push('turn ' + s.turn); return; }
    var tp = ps[s.turn];
    if (PHASES.indexOf(s.phase) < 0) { out.push('phase ' + s.phase); return; }
    if (s.phase === 'over') {
      if (pd !== null) out.push('over with something pending');
      if (!P(s, s.winner)) out.push('over without a winner');
      if (!Array.isArray(s.standings) || s.standings.length !== ps.length) out.push('over without standings');
      return;
    }
    if (s.winner !== null || s.standings !== null) out.push('winner or standings before the game is over');
    if (tp.out) out.push('the turn player ' + tp.id + ' is out');
    var alive = ps.length - outCount;
    if (alive < 2) out.push('fewer than 2 players in but not over');
    if (s.phase === 'roll' || s.phase === 'end') {
      if (pd !== null) out.push(s.phase + ' with something pending');
      if (s.phase === 'roll' && tp.stuck && s.rolled) out.push('stuck in traffic after rolling this turn');
    } else if (!pd || pd.kind !== s.phase) {
      out.push('phase ' + s.phase + ' but pending is ' + (pd ? pd.kind : 'null'));
      return;
    } else if (s.phase === 'buy') {
      if (!isSpace(pd.space) || !OWNABLE[pd.space]) out.push('buy: not an ownable space');
      else if (s.props[pd.space]) out.push('buy: the space is owned');
      if (tp.pos !== pd.space) out.push('buy: the turn player is not on the space');
    } else if (s.phase === 'auction') {
      if (!isSpace(pd.space) || !OWNABLE[pd.space]) out.push('auction: not an ownable space');
      else if (s.props[pd.space]) out.push('auction: the space is owned');
      if (!Array.isArray(pd.order) || !pd.order.length) out.push('auction: no bidders');
      else {
        for (i = 0; i < pd.order.length; i++) {
          var b = P(s, pd.order[i]);
          if (!b || b.out) out.push('auction: bidder ' + pd.order[i] + ' is not in the game');
          for (k = 0; k < i; k++) if (pd.order[k] === pd.order[i]) out.push('auction: bidder ' + pd.order[i] + ' twice');
        }
        if (!isInt(pd.idx) || pd.idx < 0 || pd.idx >= pd.order.length) out.push('auction: idx ' + pd.idx);
        if (pd.leader === null) { if (pd.bid !== 0) out.push('auction: a bid without a leader'); }
        else {
          if (pd.order.indexOf(pd.leader) < 0) out.push('auction: the leader left the auction');
          if (!isInt(pd.bid) || pd.bid < RULES.auctionOpen) out.push('auction: bid ' + pd.bid);
          if (pd.order[pd.idx] === pd.leader) out.push('auction: the leader is asked to bid');
          var L = P(s, pd.leader);
          if (L && L.cash < pd.bid) out.push('auction: the leader cannot pay the bid');
        }
      }
    } else if (s.phase === 'card') {
      var cdk = s.decks[pd.deck];
      if (!cdk || CARD_IDS[pd.deck].indexOf(pd.id) < 0) out.push('card: unknown card ' + pd.deck + '/' + pd.id);
      else { var at = cdk.order.indexOf(pd.id); if (at < 0 || at >= cdk.next) out.push('card: the shown card is not the one drawn'); }
    } else if (s.phase === 'debt') {
      if (!Array.isArray(pd.debts) || !pd.debts.length) out.push('debt: no debts');
      else {
        for (i = 0; i < pd.debts.length; i++) {
          var dd = pd.debts[i], payer = dd && P(s, dd.player);
          if (!payer || payer.out) { out.push('debt ' + i + ': payer is not in the game'); continue; }
          if (!isInt(dd.amount) || dd.amount <= 0) out.push('debt ' + i + ': amount ' + dd.amount);
          if (DEBT_REASONS.indexOf(dd.reason) < 0) out.push('debt ' + i + ': reason ' + dd.reason);
          if (!Array.isArray(dd.to) || !dd.to.length) { out.push('debt ' + i + ': no creditor'); continue; }
          var sum = 0;
          for (k = 0; k < dd.to.length; k++) {
            var t = dd.to[k];
            sum += t.amount;
            if (t.id !== null) { var cr = P(s, t.id); if (!cr || cr.out || cr === payer) out.push('debt ' + i + ': bad creditor ' + t.id); }
          }
          if (sum !== dd.amount) out.push('debt ' + i + ': shares ' + sum + ' do not add up to ' + dd.amount);
        }
        if (pd.resume !== 'roll' && pd.resume !== 'end' && pd.resume !== 'leave') out.push('debt: resume ' + pd.resume);
        if (pd.resume === 'leave' && (pd.debts[0].player !== tp.id || pd.debts[0].reason !== 'traffic')) out.push('debt: leave without the traffic fee');
      }
    } else if (s.phase === 'trade') {
      if (pd.back !== 'roll' && pd.back !== 'end') out.push('trade: back ' + pd.back);
      var oe = offerContentError(s, pd.offer);
      if (oe) out.push('trade: ' + oe);
      else if (pd.offer.from !== tp.id) out.push('trade: the offer is not from the turn player');
    }
    var a = actor(s);
    var ap = a === null ? null : P(s, a);
    if (!ap || ap.out) out.push('actor ' + a + ' is not a player in the game');
  }

  function checkDeclined(s, out) {
    var dl = s.declined;
    if (dl === undefined) return;
    if (!Array.isArray(dl)) { out.push('declined is not a list'); return; }
    if (dl.length > DECLINED_MAX) out.push('declined has ' + dl.length + ' entries (at most ' + DECLINED_MAX + ')');
    for (var k = 0; k < dl.length; k++) {
      var e = dl[k], who = 'declined ' + k;
      if (!e || typeof e !== 'object') { out.push(who + ': not an entry'); continue; }
      if (!P(s, e.from)) out.push(who + ': from ' + e.from + ' is not a player');
      if (e.to !== undefined && !P(s, e.to)) out.push(who + ': to ' + e.to + ' is not a player');
      var lists = [e.give, e.get];
      for (var j = 0; j < 2; j++) {
        var l = lists[j];
        if (!Array.isArray(l)) { out.push(who + ': ' + (j ? 'get' : 'give') + ' is not a list'); continue; }
        for (var q = 0; q < l.length; q++) if (!isSpace(l[q]) || !OWNABLE[l[q]]) out.push(who + ': ' + l[q] + ' is not an ownable space');
      }
      if (!isInt(e.cash)) out.push(who + ': cash ' + e.cash);
      if (!isInt(e.round) || e.round < 1 || e.round > s.round) out.push(who + ': round ' + e.round);
    }
  }

  function guard(fn, fallback) {
    return function () {
      try { return fn.apply(null, arguments); } catch (e) { return typeof fallback === 'function' ? fallback() : fallback; }
    };
  }

  ECE.Rules = {
    VERSION: 1,
    MAX_OFFERS: MAX_OFFERS,
    PHASES: PHASES.slice(),
    newGame: guard(newGame, function () { try { return newGame({}); } catch (e) { return null; } }),
    actor: guard(actor, null),
    legal: legal,
    act: act,
    rent: guard(rent, 0),
    netWorth: guard(netWorth, 0),
    liquid: guard(liquid, 0),
    canBuild: canBuild,
    canSell: canSell,
    canMortgage: canMortgage,
    canUnmortgage: canUnmortgage,
    ownsDistrict: guard(ownsDistrict, false),
    tradeable: guard(tradeable, function () { return { spaces: [], passes: 0, cash: 0 }; }),
    checkOffer: checkOffer,
    standings: guard(standings, function () { return []; }),
    clone: guard(clone, null),
    text: text,
    check: check,
    player: guard(function (s, id) { return s && s.players ? P(s, id) : null; }, null),
    minBid: guard(minBid, 0),
    sellValue: guard(sellValue, 0),
    buildings: guard(buildingsOf, function () { return { homes: 0, towers: 0 }; }),
    rentWhy: guard(rentWhy, null),
    whyText: guard(whyText, ''),
    whyNot: function (s, action) {
      try {
        if (!s || !action) return 'No action.';
        var pid = action.p;
        switch (action.t) {
          case 'build': return buildError(s, pid, action.space);
          case 'sell': return sellError(s, pid, action.space);
          case 'mortgage': return mortgageError(s, pid, action.space);
          case 'unmortgage': return unmortgageError(s, pid, action.space);
          case 'offer': return offerError(s, action.offer);
          default: return null;
        }
      } catch (e) { return 'internal: ' + errMsg(e); }
    },
    money: money,
    ordinal: ordinal
  };
})(window.ECE = window.ECE || {});
;
(function (ECE) {
  'use strict';

  var B = ECE.BoardData, CD = ECE.CardData, Rng = ECE.Rng, Ru = ECE.Rules;
  var SPACES = B.SPACES, N = SPACES.length, RULES = B.RULES, DISTRICTS = B.DISTRICTS, ND = DISTRICTS.length;
  var MAXL = RULES.maxLevel, MAXP = RULES.maxPlayers, TRAFFIC = B.TRAFFIC;
  var MANAGE = { build: 1, sell: 1, mortgage: 1, unmortgage: 1 };
  var TURN_MANAGE_CAP = 40;
  var RAISE_CAP = 10;
  var HUMAN_ROUNDS = 3;

  var KIND = [], PRICE = [], OWNABLE = [], DI = [], MORTV = [], UNMORT = [], SELLV = [], BCOST = [];
  var TRANSITS = [], UTILS = [], DSP = [], DNAME = [];
  var d0, i0;
  for (d0 = 0; d0 < ND; d0++) { DSP.push(DISTRICTS[d0].spaces.slice()); DNAME.push(DISTRICTS[d0].name); }
  for (i0 = 0; i0 < N; i0++) {
    KIND[i0] = SPACES[i0].kind;
    PRICE[i0] = SPACES[i0].price || 0;
    OWNABLE[i0] = B.isOwnable(i0);
    DI[i0] = -1;
    for (d0 = 0; d0 < ND; d0++) if (DSP[d0].indexOf(i0) >= 0) DI[i0] = d0;
    MORTV[i0] = B.mortgageValue(i0);
    UNMORT[i0] = B.unmortgageCost(i0);
    BCOST[i0] = B.buildCost(i0);
    SELLV[i0] = Math.round(BCOST[i0] * RULES.sellShare);
    if (KIND[i0] === 'transit') TRANSITS.push(i0);
    if (KIND[i0] === 'utility') UTILS.push(i0);
  }

  var DS = [], DD = [], DP = [], MEAN = 0;
  (function () {
    for (var a = 1; a <= 6; a++) {
      for (var b = 1; b <= 6; b++) {
        var t = a + b, dbl = a === b, f = -1;
        MEAN += t / 36;
        for (var k = 0; k < DS.length; k++) if (DS[k] === t && DD[k] === dbl) f = k;
        if (f < 0) { DS.push(t); DD.push(dbl); DP.push(1 / 36); } else DP[f] += 1 / 36;
      }
    }
  })();

  var RES_L = [], RES_P = [], RES_T = [];
  function addTo(list, k, w) {
    for (var j = 0; j < list.length; j += 2) if (list[j] === k) { list[j + 1] += w; return; }
    list.push(k, w);
  }
  function nearestOf(pos, kind) {
    for (var k = 1; k <= N; k++) { var j = (pos + k) % N; if (KIND[j] === kind) return j; }
    return pos;
  }
  function isSpace(i) { return typeof i === 'number' && i >= 0 && i < N && Math.floor(i) === i; }
  function resolveInto(q, w, depth, lands, poss) {
    addTo(lands, q, w);
    var k = KIND[q];
    if (k === 'bridge') return w;
    if (k === 'card' && depth < 3) {
      var deck = CD.DECKS[SPACES[q].deck], cards = deck ? deck.cards : [], n = cards.length, t = 0;
      if (!n) { addTo(poss, q, w); return 0; }
      for (var c = 0; c < n; c++) {
        var e = cards[c].effect || {}, cw = w / n;
        if (e.traffic) t += cw;
        else if (isSpace(e.to)) t += resolveInto(e.to, cw, depth + 1, lands, poss);
        else if (typeof e.back === 'number') t += resolveInto(((q - e.back) % N + N) % N, cw, depth + 1, lands, poss);
        else if (e.nearest) t += resolveInto(nearestOf(q, e.nearest), cw, depth + 1, lands, poss);
        else addTo(poss, q, cw);
      }
      return t;
    }
    addTo(poss, q, w);
    return 0;
  }
  for (i0 = 0; i0 < N; i0++) {
    var l0 = [], p0 = [];
    RES_T[i0] = resolveInto(i0, 1, 0, l0, p0);
    RES_L[i0] = l0;
    RES_P[i0] = p0;
  }

  var LAND = new Float64Array(N);
  var NEXT = [];
  var STAY = new Float64Array(N);

  function chain() {
    var J = N * 3, S = J + 3, rowTo = new Float64Array(S), rowLd = new Float64Array(N), s, k, j;
    var TI = [], TW = [], LI = [], LW = [], TS = new Int32Array(S + 1), LS = new Int32Array(S + 1);
    function roll(pos, d, w0) {
      for (var o1 = 0; o1 < DS.length; o1++) {
        var w = w0 * DP[o1];
        if (DD[o1] && d === 2) { rowTo[J] += w; continue; }
        var q = (pos + DS[o1]) % N, ls = RES_L[q], ps = RES_P[q], nd = DD[o1] ? d + 1 : 0, jj;
        for (jj = 0; jj < ls.length; jj += 2) rowLd[ls[jj]] += w * ls[jj + 1];
        rowTo[J] += w * RES_T[q];
        for (jj = 0; jj < ps.length; jj += 2) rowTo[ps[jj] * 3 + nd] += w * ps[jj + 1];
      }
    }
    function tryDoubles(t, w0) {
      for (var o1 = 0; o1 < DS.length; o1++) {
        var w = w0 * DP[o1];
        if (!DD[o1] && t < 2) { rowTo[J + t + 1] += w; continue; }
        var q = (TRAFFIC + DS[o1]) % N, ls = RES_L[q], ps = RES_P[q], jj;
        for (jj = 0; jj < ls.length; jj += 2) rowLd[ls[jj]] += w * ls[jj + 1];
        rowTo[J] += w * RES_T[q];
        for (jj = 0; jj < ps.length; jj += 2) rowTo[ps[jj] * 3] += w * ps[jj + 1];
      }
    }
    for (s = 0; s < S; s++) {
      for (k = 0; k < S; k++) rowTo[k] = 0;
      for (k = 0; k < N; k++) rowLd[k] = 0;
      if (s < J) roll((s / 3) | 0, s % 3, 1);
      else if (s === J) { roll(TRAFFIC, 0, 0.5); tryDoubles(0, 0.5); }
      else tryDoubles(s - J, 1);
      TS[s] = TI.length;
      for (k = 0; k < S; k++) if (rowTo[k] > 0) { TI.push(k); TW.push(rowTo[k]); }
      LS[s] = LI.length;
      for (k = 0; k < N; k++) if (rowLd[k] > 0) { LI.push(k); LW.push(rowLd[k]); }
    }
    TS[S] = TI.length;
    LS[S] = LI.length;
    var ti = new Int32Array(TI), tw = new Float64Array(TW), li = new Int32Array(LI), lw = new Float64Array(LW);
    function step(pi, nx, acc) {
      nx.fill(0);
      for (var s1 = 0; s1 < S; s1++) {
        var m = pi[s1];
        if (!(m > 0)) continue;
        for (var j1 = TS[s1], e1 = TS[s1 + 1]; j1 < e1; j1++) nx[ti[j1]] += m * tw[j1];
        for (j1 = LS[s1], e1 = LS[s1 + 1]; j1 < e1; j1++) acc[li[j1]] += m * lw[j1];
      }
      var tm = pi[J] + pi[J + 1] + pi[J + 2];
      for (var k1 = 0; k1 < J; k1 += 3) tm += pi[k1];
      return tm;
    }
    var pi = new Float64Array(S), nx = new Float64Array(S), acc = new Float64Array(N), turns = 0;
    pi[0] = 1;
    for (var it = 0; it < 100; it++) {
      if (it === 30) { acc.fill(0); turns = 0; }
      turns += step(pi, nx, acc);
      var sw = pi; pi = nx; nx = sw;
    }
    for (k = 0; k < N; k++) LAND[k] = turns > 0 ? acc[k] / turns : 1 / N;
    function turnRoll(cur, nxt, out, d) {
      nxt.fill(0);
      for (var s1 = d; s1 < J; s1 += 3) {
        var m = cur[s1];
        if (!(m > 0)) continue;
        for (var j1 = LS[s1], e1 = LS[s1 + 1]; j1 < e1; j1++) out[li[j1]] += m * lw[j1];
        for (j1 = TS[s1], e1 = TS[s1 + 1]; j1 < e1; j1++) { var to = ti[j1]; if (to < J && to % 3 === d + 1) nxt[to] += m * tw[j1]; }
      }
    }
    var cur = new Float64Array(J), nxt = new Float64Array(J);
    for (var pos = 0; pos < N; pos++) {
      var out = new Float64Array(N);
      cur.fill(0);
      cur[pos * 3] = 1;
      for (var d = 0; d < 3; d++) { turnRoll(cur, nxt, out, d); var tmp = cur; cur = nxt; nxt = tmp; }
      NEXT.push(out);
    }
    for (var o = 0; o < DS.length; o++) {
      if (!DD[o]) continue;
      var ls3 = RES_L[(TRAFFIC + DS[o]) % N];
      for (j = 0; j < ls3.length; j += 2) STAY[ls3[j]] += DP[o] * ls3[j + 1];
    }
  }

  var RL = [], R0 = [], INC = [], BASE = [];
  function rentTables() {
    var i, d, j, lv;
    for (i = 0; i < N; i++) {
      RL.push(null);
      R0.push(0);
      if (KIND[i] !== 'street') continue;
      var row = [];
      for (lv = 0; lv <= MAXL; lv++) row.push(B.streetRent(SPACES[i], lv, true) * LAND[i]);
      RL[i] = row;
      R0[i] = B.streetRent(SPACES[i], 0, false) * LAND[i];
    }
    for (d = 0; d < ND; d++) {
      var inc = [], base = 0;
      for (lv = 0; lv <= MAXL; lv++) {
        var sum = 0;
        for (j = 0; j < DSP[d].length; j++) sum += RL[DSP[d][j]][lv];
        inc.push(sum);
      }
      INC.push(inc);
      for (j = 0; j < DSP[d].length; j++) base += R0[DSP[d][j]];
      BASE.push(base);
    }
  }
  var READY = false;
  function ensure() {
    if (READY) return;
    chain();
    rentTables();
    READY = true;
  }

  var LEVELS = {
    easy: {
      level: 'easy', naive: true, H: 8, resMul: 0.4, buildRes: 0, buildFree: true, buyRes: 0.4, buyMin: 0.9,
      deny: 0, bidMul: 0.92, bidKeep: 0.3, w: 0.1, wHuman: 0.15, margin: 0, offerMargin: 15, offerRate: 0.05, completeRate: 0.06,
      stay: 0, fundBuild: false, sells: false, consolidate: false, swaps: false, hint: true, vague: false,
      naiveSet: 0.35, unmortKeep: 60, unmortRes: 1, floor: 1.2, skip: 0.5, sellHuman: true
    },
    normal: {
      level: 'normal', naive: false, H: 10, resMul: 1, buildRes: 0.75, buildFree: false, buyRes: 0.5, buyMin: 0.95,
      deny: 0.25, bidMul: 1, bidKeep: 0.4, w: 0.45, wHuman: 0.75, margin: 25, offerMargin: 25, offerRate: 0.55, completeRate: 0.85,
      stay: 1, fundBuild: true, sells: true, consolidate: true, swaps: true, hint: true, vague: false,
      naiveSet: 0.35, unmortKeep: 120, unmortRes: 1.3, floor: 2, skip: 0.15, sellHuman: true
    },
    hard: {
      level: 'hard', naive: false, H: 12, resMul: 0.9, buildRes: 0.6, buildFree: false, buyRes: 0.5, buyMin: 0.95,
      deny: 0.5, bidMul: 1.04, bidKeep: 0.35, w: 0.8, wHuman: 1, margin: 45, offerMargin: 35, offerRate: 0.85, completeRate: 1,
      stay: 2, fundBuild: true, sells: true, consolidate: true, swaps: true, hint: false, vague: true,
      naiveSet: 0.35, unmortKeep: 120, unmortRes: 1.3, floor: 2.5, skip: 0, sellHuman: false
    }
  };
  var CPU_TRADE_ROUND = 8, CPU_TRADE_OWNED = 0.75;
  var REPEAT_ROUNDS = 15, REPEAT_BETTER = 0.15;
  var STALL_ROUND = 60;
  var SHARED = {
    m1: 1, m2: 1.08, m3: 1.15, f2u: 0.3, f2o: 0.18, t0: 0.85, t1: 0.15, u0: 0.9, u1: 0.1, kappa: 0.7,
    devKeep: 100, devFuture: 150, save: 70, liq: 0.35, pass: 45, complete: 1, buildMin: 0.4
  };
  var PERSONAS = {
    trader: { offerRate: ['x', 1.6], completeRate: ['x', 1.3], margin: ['+', -5], offerMargin: ['+', -10], consolidate: ['=', true] },
    builder: { buildRes: ['x', 0.75], H: ['+', 2], unmortKeep: ['x', 0.8] },
    saver: { resMul: ['x', 1.2], buildRes: ['x', 1.0], bidMul: ['x', 0.94], unmortRes: ['x', 1.2] },
    collector: { complete: ['x', 1.3], m2: ['+', 0.06], f2u: ['+', 0.08], f2o: ['+', 0.06] },
    bold: { bidMul: ['x', 1.12], resMul: ['x', 0.6], buyRes: ['x', 0.6], bidKeep: ['x', 0.5] }
  };
  var KCACHE = {};
  function baseKnobs(level, persona) {
    var key = level + '/' + persona;
    if (KCACHE[key]) return KCACHE[key];
    var L = LEVELS[level] || LEVELS.normal, K = {}, k;
    for (k in SHARED) K[k] = SHARED[k];
    for (k in L) K[k] = L[k];
    var P = PERSONAS[persona];
    if (P) {
      for (k in P) {
        var op = P[k][0], v = P[k][1];
        if (op === 'x') K[k] = K[k] * v;
        else if (op === '+') K[k] = K[k] + v;
        else K[k] = v;
      }
    }
    if (K.offerRate > 1) K.offerRate = 1;
    if (K.completeRate > 1) K.completeRate = 1;
    K.persona = P ? persona : null;
    KCACHE[key] = K;
    return K;
  }
  var HUMAN_MODEL = (function () {
    var K = {}, b = baseKnobs('normal', null);
    for (var k in b) K[k] = b[k];
    K.w = 0.55; K.wHuman = 0.55; K.margin = 40; K.floor = 0;
    return K;
  })();
  function urgent(K, round) {
    var u = (round - STALL_ROUND) / 60;
    if (!(u > 0)) return K;
    if (u > 1) u = 1;
    var out = {};
    for (var k in K) out[k] = K[k];
    out.w = K.w * (1 - 0.6 * u);
    out.wHuman = K.wHuman * (1 - 0.4 * u);
    out.margin = K.margin * (1 - u);
    out.offerMargin = K.offerMargin * (1 - u);
    out.offerRate = K.offerRate + (1 - K.offerRate) * u;
    out.completeRate = K.completeRate + (1 - K.completeRate) * u;
    out.sells = true;
    out.swaps = true;
    out.consolidate = true;
    out.buildMin = 0;
    if (u >= 0.5) out.naive = false;
    return out;
  }
  function roundsLeft(s) {
    var lim = s.rules && s.rules.limit, r = s.round || 1;
    if (!lim || s.phase === 'over') return 0;
    if (s.limitHit) return 1;
    if (lim.kind === 'rounds') return Math.max(1, lim.value - r + 1);
    if (lim.kind === 'minutes' && s.playMs > 0 && r > 1) return Math.max(1, (lim.value * 60000 - s.playMs) / (s.playMs / (r - 1)));
    return 0;
  }
  function tradeKnobs(s, pl, partnerHuman) {
    var K = knobsOf(s, pl);
    if (partnerHuman || !pl || pl.level !== 'easy') return K;
    var N2 = knobsOf(s, { level: 'normal', persona: pl.persona }), out = {}, k;
    for (k in N2) out[k] = N2[k];
    var keep = ['offerRate', 'completeRate', 'sells', 'swaps', 'consolidate', 'sellHuman', 'skip'];
    for (k = 0; k < keep.length; k++) out[keep[k]] = K[keep[k]];
    out.level = 'easy';
    return out;
  }
  function knobsOf(s, pl) {
    var K = urgent(baseKnobs(pl ? pl.level : 'normal', pl ? pl.persona : null), s.round || 1);
    var left = roundsLeft(s);
    if (left && left < K.H) {
      var out = {};
      for (var k in K) out[k] = K[k];
      out.H = Math.max(1, left);
      if (s.limitHit) { out.fundBuild = false; out.unmortKeep = 1e9; }
      K = out;
    }
    return K;
  }

  function playerOf(s, id) {
    var ps = s.players;
    for (var k = 0; k < ps.length; k++) if (ps[k].id === id) return ps[k];
    return null;
  }
  function seatOf(s, id) {
    var ps = s.players;
    for (var k = 0; k < ps.length; k++) if (ps[k].id === id) return k;
    return -1;
  }
  function makeView(s) {
    var V = {
      own: new Int8Array(N), lvl: new Int8Array(N), mort: new Int8Array(N),
      cash: [], pos: [], stuck: [], passes: [], inGame: [], human: [], res: [], ids: [], alive: 0
    };
    var i, k;
    for (i = 0; i < N; i++) {
      V.own[i] = -1;
      var e = s.props[i];
      if (e && OWNABLE[i]) { V.own[i] = e.owner; V.lvl[i] = e.level | 0; V.mort[i] = e.mortgaged ? 1 : 0; }
    }
    for (k = 0; k < MAXP; k++) {
      V.cash.push(0); V.pos.push(0); V.stuck.push(false); V.passes.push(0);
      V.inGame.push(false); V.human.push(false); V.res.push(0);
    }
    for (k = 0; k < s.players.length; k++) {
      var p = s.players[k];
      if (!(p.id >= 0 && p.id < MAXP)) continue;
      V.cash[p.id] = p.cash;
      V.pos[p.id] = p.pos;
      V.stuck[p.id] = !!p.stuck;
      V.passes[p.id] = p.passes ? p.passes.length : 0;
      V.human[p.id] = p.kind === 'human';
      if (!p.out) { V.inGame[p.id] = true; V.ids.push(p.id); V.alive++; }
    }
    for (k = 0; k < V.ids.length; k++) V.res[V.ids[k]] = reserveRaw(V, V.ids[k]);
    return V;
  }

  function full(V, x, d) {
    var sp = DSP[d];
    for (var j = 0; j < sp.length; j++) if (V.own[sp[j]] !== x) return false;
    return true;
  }
  function countOf(V, x, list) {
    var n = 0;
    for (var j = 0; j < list.length; j++) if (V.own[list[j]] === x) n++;
    return n;
  }
  function rentNow(V, i) {
    var o = V.own[i];
    if (o < 0 || V.mort[i]) return 0;
    var k = KIND[i];
    if (k === 'street') return B.streetRent(SPACES[i], V.lvl[i], full(V, o, DI[i]));
    if (k === 'transit') return RULES.transitRent[countOf(V, o, TRANSITS) - 1] || 0;
    if (k === 'utility') return MEAN * (RULES.utilityTimes[countOf(V, o, UTILS) - 1] || 0);
    return 0;
  }
  function liquidV(V, x) {
    var v = V.cash[x];
    for (var i = 0; i < N; i++) {
      if (V.own[i] !== x) continue;
      v += V.lvl[i] * SELLV[i];
      if (!V.mort[i]) v += MORTV[i];
    }
    return v;
  }
  function reserveRaw(V, x) {
    var top = 0, exp = 0, worst = 0, nx = NEXT[V.stuck[x] ? TRAFFIC : V.pos[x]] || NEXT[0];
    for (var i = 0; i < N; i++) {
      var o = V.own[i];
      if (o < 0 || o === x) continue;
      var r = rentNow(V, i);
      if (!r) continue;
      if (r > top) top = r;
      exp += r * LAND[i];
      if (nx[i] >= 0.02 && r > worst) worst = r;
    }
    var res = 50 + 0.25 * top + 0.4 * worst + 4 * exp;
    var cap = 0.45 * liquidV(V, x);
    return res > cap ? Math.max(50, cap) : res;
  }
  function reserveOf(V, x, K) { return V.res[x] * K.resMul; }

  var RAISE_MORT = 0.85, RAISE_SELL = 0.5;
  var RT = new Float64Array(ND);
  function raiseInto(V, x) {
    var tot = V.cash[x], d, j, i;
    for (d = 0; d < ND; d++) RT[d] = 0;
    for (i = 0; i < N; i++) {
      if (V.own[i] !== x) continue;
      d = DI[i];
      var v = 0;
      if (V.lvl[i] > 0) v = RAISE_SELL * V.lvl[i] * SELLV[i];
      else if (!V.mort[i]) {
        var ok = true;
        if (d >= 0) {
          var whole = true;
          for (j = 0; j < DSP[d].length; j++) { var q = DSP[d][j]; if (V.lvl[q] > 0) ok = false; if (V.own[q] !== x) whole = false; }
          if (whole) ok = false;
        }
        if (ok) v = RAISE_MORT * MORTV[i];
      }
      tot += v;
      if (d >= 0) RT[d] += v;
    }
    return tot;
  }
  function raiseFor(V, x, d) { return raiseInto(V, x) - RT[d]; }
  function devValue(V, x, d, K, nOpp, raise) {
    var sp = DSP[d], cur = 0, lmin = MAXL, j, i;
    for (j = 0; j < sp.length; j++) {
      i = sp[j];
      cur += RL[i][V.lvl[i]];
      if (V.lvl[i] < lmin) lmin = V.lvl[i];
    }
    var H = K.H, best = cur * nOpp * H;
    var budget = Math.max(0, raise - K.devKeep) + K.devFuture;
    for (var L = lmin + 1; L <= MAXL; L++) {
      var cost = 0, inc = 0;
      for (j = 0; j < sp.length; j++) {
        i = sp[j];
        var li = V.lvl[i] > L ? V.lvl[i] : L;
        cost += (li - V.lvl[i]) * BCOST[i];
        inc += RL[i][li];
      }
      var wait = cost > budget ? (cost - budget) / K.save : 0;
      if (wait >= H) break;
      var v = inc * nOpp * (H - wait) + cur * nOpp * wait - cost * K.kappa;
      if (v > best) best = v;
    }
    return best;
  }
  function strength(V, x, K) {
    if (K.naive) return naiveStrength(V, x, K);
    var s = V.cash[x], nOpp = V.alive - 1, d, j, i;
    if (nOpp < 1) nOpp = 1;
    var raiseAll = -1;
    for (d = 0; d < ND; d++) {
      var sp = DSP[d], k = 0, other = -1, missing = -1;
      for (j = 0; j < sp.length; j++) { if (V.own[sp[j]] === x) k++; else { other = V.own[sp[j]]; missing = sp[j]; } }
      if (!k) continue;
      var m = k === 1 ? K.m1 : k === 2 ? K.m2 : K.m3, sub = 0;
      for (j = 0; j < sp.length; j++) {
        i = sp[j];
        if (V.own[i] !== x) continue;
        sub += PRICE[i] * m + V.lvl[i] * SELLV[i];
        if (V.mort[i]) sub -= UNMORT[i];
      }
      if (k >= sp.length - 1) {
        if (raiseAll < 0) raiseAll = raiseInto(V, x);
        var raise = raiseAll - RT[d] - (k < sp.length ? PRICE[missing] : 0);
        var prem = Math.max(0, devValue(V, x, d, K, nOpp, raise) - BASE[d] * nOpp * K.H);
        sub += (k === sp.length ? K.complete : other < 0 ? K.f2u : K.f2o) * prem;
      }
      s += sub;
    }
    var kt = countOf(V, x, TRANSITS), ku = countOf(V, x, UTILS);
    for (j = 0; j < TRANSITS.length; j++) {
      i = TRANSITS[j];
      if (V.own[i] === x) s += PRICE[i] * (K.t0 + K.t1 * kt) - (V.mort[i] ? UNMORT[i] : 0);
    }
    for (j = 0; j < UTILS.length; j++) {
      i = UTILS[j];
      if (V.own[i] === x) s += PRICE[i] * (K.u0 + K.u1 * ku) - (V.mort[i] ? UNMORT[i] : 0);
    }
    s += V.passes[x] * K.pass;
    var short = V.res[x] - V.cash[x];
    if (short > 0) s -= short * K.liq;
    return s;
  }
  function naiveStrength(V, x, K) {
    var s = V.cash[x], i, d, j;
    for (i = 0; i < N; i++) {
      if (V.own[i] !== x) continue;
      s += PRICE[i] + V.lvl[i] * SELLV[i] - (V.mort[i] ? UNMORT[i] : 0);
    }
    for (d = 0; d < ND; d++) {
      if (!full(V, x, d)) continue;
      for (j = 0; j < DSP[d].length; j++) s += K.naiveSet * PRICE[DSP[d][j]];
    }
    return s + V.passes[x] * K.pass;
  }

  function gainAt(V, x, i, K, X, base) {
    var o = V.own[i], om = V.mort[i], ol = V.lvl[i];
    var s0 = base === undefined ? strength(V, x, K) : base;
    V.own[i] = x; V.mort[i] = 0; V.lvl[i] = 0; V.cash[x] -= X;
    var s1 = strength(V, x, K);
    V.own[i] = o; V.mort[i] = om; V.lvl[i] = ol; V.cash[x] += X;
    return s1 - s0;
  }
  function denyValue(V, x, i, K) {
    if (!(K.deny > 0)) return 0;
    var most = 0, o = V.own[i];
    for (var k = 0; k < V.ids.length; k++) {
      var y = V.ids[k];
      if (y === x || y === o) continue;
      var g = gainAt(V, y, i, K, PRICE[i]);
      if (g > most) most = g;
    }
    return K.deny * most;
  }
  function spaceValue(V, x, i, K, deny) {
    if (!OWNABLE[i]) return 0;
    var o = V.own[i];
    if (o === x) {
      var s1 = strength(V, x, K);
      V.own[i] = -1;
      var s0 = strength(V, x, K);
      V.own[i] = o;
      return s1 - s0;
    }
    return gainAt(V, x, i, K, 0) + (deny ? denyValue(V, x, i, K) : 0);
  }
  function bidLimit(V, x, i, K, order) {
    var base = strength(V, x, K), hi = Math.max(0, V.cash[x]), rivals = [], k;
    if (K.deny > 0 && order) for (k = 0; k < order.length; k++) if (order[k] !== x && V.inGame[order[k]] && V.own[i] < 0) rivals.push(order[k]);
    var rb = [];
    for (k = 0; k < rivals.length; k++) rb.push(strength(V, rivals[k], K));
    function gain(X) {
      var g = gainAt(V, x, i, K, X, base), most = 0;
      for (var r = 0; r < rivals.length; r++) {
        var y = rivals[r];
        if (V.cash[y] < X) continue;
        var gy = gainAt(V, y, i, K, X, rb[r]);
        if (gy > most) most = gy;
      }
      return g + K.deny * most;
    }
    if (gain(0) <= 0) return 0;
    if (gain(hi) > 0) return hi;
    var lo = 0;
    while (hi - lo > 5) {
      var mid = (lo + hi) >> 1;
      if (gain(mid) > 0) lo = mid; else hi = mid;
    }
    return lo;
  }

  function find(L, t) {
    for (var k = 0; k < L.length; k++) if (L[k].t === t) return L[k];
    return null;
  }
  function findSpace(L, t, i) {
    for (var k = 0; k < L.length; k++) if (L[k].t === t && L[k].space === i) return L[k];
    return null;
  }
  function rnd(s, p, salt, extra) { return Rng.hashFloat(s.seed, s.counters ? s.counters.turns : 0, p, salt, extra === undefined ? 0 : extra); }
  function up10(n) { return Math.ceil(n / 10) * 10; }
  function down10(n) { return Math.floor(n / 10) * 10; }
  function money(n) { return Ru.money(n); }

  function turnMemo(s, p) {
    var m = { manage: 0, build: 0, sell: 0, mortgage: 0, unmortgage: 0, raise: 0 }, log = s.log || [], ask = false;
    for (var k = log.length - 1; k >= 0; k--) {
      var e = log[k];
      if (!e) continue;
      if (e.t === 'turn') break;
      if (e.t === 'buyAsk') ask = true;
      if (e.p !== p || !MANAGE[e.t] || (e.t === 'sell' && e.count > 1)) continue;
      m.manage++;
      m[e.t]++;
      if (!ask && (e.t === 'mortgage' || e.t === 'sell')) m.raise++;
    }
    return m;
  }

  function mortgageLoss(V, x, i, K) {
    var nOpp = Math.max(1, V.alive - 1), loss = UNMORT[i] - MORTV[i] + rentNow(V, i) * LAND[i] * nOpp * 6;
    var d = DI[i];
    if (d >= 0) {
      var k = 0;
      for (var j = 0; j < DSP[d].length; j++) if (V.own[DSP[d][j]] === x) k++;
      if (k === DSP[d].length) loss += 0.2 * Math.max(0, devValue(V, x, d, K, nOpp, raiseFor(V, x, d)) - INC[d][0] * nOpp * K.H) + 40;
      else if (k === DSP[d].length - 1) loss += 40;
    }
    return loss;
  }
  function sellLoss(V, x, i, K) {
    var nOpp = Math.max(1, V.alive - 1), L = V.lvl[i];
    return SELLV[i] + (RL[i][L] - RL[i][L - 1]) * nOpp * 6;
  }
  function raiseAction(V, x, K, L, need, mortgagesOnly) {
    var best = null, bestScore = Infinity;
    for (var k = 0; k < L.length; k++) {
      var a = L[k], gain, loss;
      if (a.t === 'mortgage') { gain = MORTV[a.space]; loss = mortgageLoss(V, x, a.space, K); }
      else if (a.t === 'sell' && !mortgagesOnly) { gain = SELLV[a.space]; loss = sellLoss(V, x, a.space, K); }
      else continue;
      if (!(gain > 0)) continue;
      var score = loss / Math.min(gain, Math.max(1, need));
      if (score < bestScore) { bestScore = score; best = a; }
    }
    return best;
  }
  function mortgagePlan(V, x, K, need) {
    var list = [], i;
    for (i = 0; i < N; i++) {
      if (V.own[i] !== x || V.mort[i] || !OWNABLE[i]) continue;
      var d = DI[i];
      if (d >= 0) {
        var built = false;
        for (var j = 0; j < DSP[d].length; j++) if (V.lvl[DSP[d][j]] > 0) built = true;
        if (built || full(V, x, d)) continue;
      }
      list.push({ gain: MORTV[i], loss: mortgageLoss(V, x, i, K) });
    }
    list.sort(function (a, b) { return a.loss / a.gain - b.loss / b.gain; });
    var got = 0, loss = 0;
    for (var k = 0; k < list.length && got < need; k++) { got += list[k].gain; loss += list[k].loss; }
    return got >= need ? { loss: loss, got: got } : null;
  }

  function decideBuy(s, V, p, K, L) {
    var i = s.pending.space, price = PRICE[i], cash = V.cash[p];
    var buy = find(L, 'buy'), decline = find(L, 'decline');
    var full0 = reserveOf(V, p, K), res = full0 * K.buyRes;
    var mine = ownKey(V, p, i);
    if (buy) {
      if (mine && cash - price >= 0.25 * full0) return buy;
      if (K.skip > 0 && !V.human[p] && !mine && playerPair(V, i) && rnd(s, p, 'skip', i) < K.skip) return decline;
      var deny = denyValue(V, p, i, K);
      var key = keySpace(V, p, i);
      var surplus = gainAt(V, p, i, K, price) + deny;
      if (surplus >= (K.buyMin - 1) * price && cash - price >= res) return buy;
      if (key && surplus > 0 && cash - price >= res * 0.25) return buy;
      return decline;
    }
    var deny2 = denyValue(V, p, i, K);
    var memo = turnMemo(s, p);
    if (memo.raise < RAISE_CAP && !K.naive) {
      var plan = mortgagePlan(V, p, K, price - cash);
      if (plan && gainAt(V, p, i, K, cash) + deny2 - (price - cash) - plan.loss > Math.max(20, 0.15 * price)) {
        var a = raiseAction(V, p, K, L, price - cash, true);
        if (a) return a;
      }
    }
    return decline;
  }
  function playerPair(V, i) {
    var d = DI[i], human = false;
    if (d < 0) return false;
    for (var j = 0; j < DSP[d].length; j++) {
      var o = V.own[DSP[d][j]];
      if (o < 0) continue;
      if (!V.human[o]) return false;
      human = true;
    }
    return human;
  }
  function ownKey(V, x, i) {
    var d = DI[i];
    if (d < 0) return false;
    for (var j = 0; j < DSP[d].length; j++) if (DSP[d][j] !== i && V.own[DSP[d][j]] !== x) return false;
    return true;
  }
  function keySpace(V, x, i) {
    var d = DI[i];
    if (d < 0) return false;
    var sp = DSP[d], who = -2;
    for (var j = 0; j < sp.length; j++) {
      if (sp[j] === i) continue;
      var o = V.own[sp[j]];
      if (o < 0) return false;
      if (who === -2) who = o; else if (who !== o) return false;
    }
    return who >= 0;
  }

  function decideBid(s, V, p, K, L) {
    var pd = s.pending, i = pd.space, bid = find(L, 'bid'), pass = find(L, 'pass');
    if (!bid) return pass;
    var minB = bid.amount, cash = V.cash[p];
    var jit = 1 + (rnd(s, p, 'bid', i) - 0.5) * 0.08;
    var max = bidLimit(V, p, i, K, pd.order) * K.bidMul * jit;
    var step = Math.max(RULES.auctionOpen, Math.round(PRICE[i] * 0.08 / 5) * 5);
    if (K.deny > 0 && max < PRICE[i] + step && rivalFinishes(V, p, i, pd)) max = PRICE[i] + step;
    var keep = reserveOf(V, p, K) * K.bidKeep;
    if (keySpace(V, p, i)) keep *= 0.4;
    if (max > cash - keep) max = cash - keep;
    max = Math.floor(max);
    if (minB > max) return pass;
    var amount = pd.bid === 0 ? Math.max(minB, down10(PRICE[i] * 0.5)) : pd.bid + step;
    if (amount > max) amount = max;
    if (amount < minB) amount = minB;
    return { t: 'bid', p: p, amount: on5(amount, minB, max) };
  }
  function on5(amount, minB, max) {
    var a = Math.floor(amount / 5) * 5;
    if (a < minB) a = Math.ceil(minB / 5) * 5;
    return a > max ? minB : a;
  }

  function rivalFinishes(V, x, i, pd) {
    var d = DI[i];
    if (d < 0 || !pd.order) return false;
    for (var k = 0; k < pd.order.length; k++) {
      var y = pd.order[k];
      if (y === x || !V.inGame[y] || V.cash[y] <= pd.bid) continue;
      if (ownKey(V, y, i)) return true;
    }
    return false;
  }

  function decideDebt(s, V, p, K, L) {
    var pay = find(L, 'pay');
    if (pay) return pay;
    var bk = find(L, 'bankrupt');
    if (bk) return bk;
    var d = s.pending.debts[0];
    return raiseAction(V, p, K, L, d.amount - V.cash[p], false);
  }

  function decideRoll(s, V, p, K, L) {
    if (V.stuck[p]) {
      var t = trafficChoice(s, V, p, K, L);
      if (t) return t;
    }
    return find(L, 'roll');
  }
  function trafficChoice(s, V, p, K, L) {
    var pass = find(L, 'usePass'), pay = find(L, 'payFee'), leave = pass || pay;
    if (!leave) return null;
    if (K.stay === 0) return leave;
    var unowned = 0, built = 0, go = 0, stay = 0, i, d;
    for (i = 0; i < N; i++) if (OWNABLE[i] && V.own[i] < 0) unowned++;
    for (d = 0; d < ND; d++) {
      var o = V.own[DSP[d][0]];
      if (o < 0 || o === p || !full(V, o, d)) continue;
      var lv = 99;
      for (var j = 0; j < DSP[d].length; j++) if (V.lvl[DSP[d][j]] < lv) lv = V.lvl[DSP[d][j]];
      if (lv >= 3) built++;
    }
    if (K.stay === 1) return built >= 1 && unowned <= 6 ? null : leave;
    for (i = 0; i < N; i++) {
      var ow = V.own[i];
      if (ow < 0 || ow === p) continue;
      var r = rentNow(V, i);
      go += NEXT[TRAFFIC][i] * r;
      stay += STAY[i] * r;
    }
    return go - stay > 45 + 18 * unowned ? null : leave;
  }

  function decideEnd(s, V, p, K, L) {
    var memo = turnMemo(s, p);
    if (s.offersThisTurn === 0 && memo.build === 0 && memo.unmortgage === 0) {
      var o = offerInner(s, V, p, K);
      if (o) return { t: 'offer', p: p, offer: o };
    }
    if (memo.manage < TURN_MANAGE_CAP) {
      var a = manageAction(s, V, p, K, L, memo);
      if (a) return a;
    }
    return find(L, 'endTurn');
  }

  function manageAction(s, V, p, K, L, memo) {
    var cash = V.cash[p], res = reserveOf(V, p, K), a;
    if (memo.sell === 0 && memo.mortgage === 0 && (a = unmortgageDistrict(V, p, K, L, cash, res))) return a;
    if (memo.sell === 0 && (a = buildAction(V, p, K, L, cash, res))) return a;
    if (memo.sell === 0 && memo.unmortgage === 0 && K.fundBuild && (a = fundBuild(V, p, K, L, cash, res))) return a;
    if (memo.sell === 0 && memo.mortgage === 0 && (a = unmortgageSingle(V, p, K, L, cash, res))) return a;
    return null;
  }
  function unmortgageDistrict(V, p, K, L, cash, res) {
    for (var k = 0; k < L.length; k++) {
      var a = L[k];
      if (a.t !== 'unmortgage') continue;
      var d = DI[a.space];
      if (d < 0 || !full(V, p, d)) continue;
      if (K.buildFree ? cash >= UNMORT[a.space] : cash - UNMORT[a.space] >= res * K.buildRes) return a;
    }
    return null;
  }
  function buildGain(V, i) {
    var l0 = V.lvl[i], T = l0 + 1 < 3 ? 3 : l0 + 1;
    if (T > MAXL) T = MAXL;
    return (RL[i][T] - RL[i][l0]) / (T - l0);
  }
  function buildAction(V, p, K, L, cash, res) {
    var best = null, bestScore = 0, nOpp = Math.max(1, V.alive - 1);
    for (var k = 0; k < L.length; k++) {
      var a = L[k];
      if (a.t !== 'build') continue;
      var i = a.space, cost = BCOST[i];
      if (!K.buildFree && cash - cost < res * K.buildRes) continue;
      var gain = buildGain(V, i);
      if (gain * nOpp * K.H < cost * K.buildMin && cash - cost < 2 * res + 300) continue;
      var score = K.naive ? 1 / (1 + i) : gain / cost;
      if (score > bestScore) { bestScore = score; best = a; }
    }
    return best;
  }
  function buildableNoCash(V, p, i) {
    var d = DI[i];
    if (d < 0 || V.own[i] !== p || V.lvl[i] >= MAXL) return false;
    var sp = DSP[d], min = 99;
    for (var j = 0; j < sp.length; j++) {
      var q = sp[j];
      if (V.own[q] !== p || V.mort[q]) return false;
      if (V.lvl[q] < min) min = V.lvl[q];
    }
    if (V.lvl[i] > min) return false;
    if (V.lvl[i] === MAXL - 1 && min < MAXL - 1) return false;
    return true;
  }
  function fundBuild(V, p, K, L, cash, res) {
    var bi = -1, bScore = 0, nOpp = Math.max(1, V.alive - 1), i, k;
    for (i = 0; i < N; i++) {
      if (KIND[i] !== 'street' || !buildableNoCash(V, p, i)) continue;
      var cost = BCOST[i];
      if (cash - cost >= res * K.buildRes) continue;
      var gain = buildGain(V, i);
      if (gain * nOpp * K.H < cost * K.buildMin) continue;
      var sc = gain / cost;
      if (sc > bScore) { bScore = sc; bi = i; }
    }
    if (bi < 0) return null;
    var best = null, bestLoss = Infinity;
    for (k = 0; k < L.length; k++) {
      var a = L[k];
      if (a.t !== 'mortgage') continue;
      var d = DI[a.space];
      if (d >= 0 && full(V, p, d)) continue;
      var lp = (rentNow(V, a.space) * LAND[a.space] + (UNMORT[a.space] - MORTV[a.space]) / (6 * nOpp)) / MORTV[a.space];
      if (lp < bestLoss) { bestLoss = lp; best = a; }
    }
    if (!best || bScore < bestLoss * 1.5) return null;
    if (cash + MORTV[best.space] - BCOST[bi] < res * K.buildRes) return null;
    return best;
  }
  function unmortgageSingle(V, p, K, L, cash, res) {
    var best = null, bestScore = 0;
    for (var k = 0; k < L.length; k++) {
      var a = L[k];
      if (a.t !== 'unmortgage') continue;
      var i = a.space;
      if (cash - UNMORT[i] < res * K.unmortRes + K.unmortKeep) continue;
      V.mort[i] = 0;
      var r = rentNow(V, i);
      V.mort[i] = 1;
      var score = (r * LAND[i] + 0.01) / UNMORT[i];
      if (score > bestScore) { bestScore = score; best = a; }
    }
    return best;
  }

  function side(o, k) {
    var sd = o && o[k] && typeof o[k] === 'object' ? o[k] : {};
    return { cash: sd.cash > 0 ? sd.cash : 0, spaces: Array.isArray(sd.spaces) ? sd.spaces : [], passes: sd.passes > 0 ? sd.passes : 0 };
  }
  function offerProblem(s, V, o) {
    if (!o || typeof o !== 'object') return 'bad';
    var from = playerOf(s, o.from), to = playerOf(s, o.to);
    if (!from || !to || from === to || from.out || to.out) return 'bad';
    var g = side(o, 'give'), t = side(o, 'get');
    if (g.cash > from.cash || t.cash > to.cash) return 'cash';
    if (g.passes > from.passes.length || t.passes > to.passes.length) return 'bad';
    var lists = [[g.spaces, from.id], [t.spaces, to.id]];
    for (var l = 0; l < 2; l++) {
      var sp = lists[l][0], owner = lists[l][1];
      for (var k = 0; k < sp.length; k++) {
        var i = sp[k];
        if (!isSpace(i) || !OWNABLE[i] || V.own[i] !== owner) return 'bad';
        for (var j = 0; j < k; j++) if (sp[j] === i) return 'bad';
        var d = DI[i];
        if (d >= 0) for (j = 0; j < DSP[d].length; j++) if (V.lvl[DSP[d][j]] > 0) return 'bad';
      }
    }
    if (g.cash + t.cash + g.passes + t.passes + g.spaces.length + t.spaces.length === 0) return 'bad';
    return null;
  }

  function swapApply(V, a, b, gs, ts, c, gp, tp) {
    var k;
    for (k = 0; k < gs.length; k++) V.own[gs[k]] = b;
    for (k = 0; k < ts.length; k++) V.own[ts[k]] = a;
    V.cash[a] -= c; V.cash[b] += c;
    V.passes[a] += tp - gp; V.passes[b] += gp - tp;
  }
  function swapUndo(V, a, b, gs, ts, c, gp, tp) {
    var k;
    for (k = 0; k < gs.length; k++) V.own[gs[k]] = a;
    for (k = 0; k < ts.length; k++) V.own[ts[k]] = b;
    V.cash[a] += c; V.cash[b] -= c;
    V.passes[a] -= tp - gp; V.passes[b] -= gp - tp;
  }
  function judge(V, x, y, K, xs, ys, c, xp, yp, before) {
    var bx = before ? before.x : strength(V, x, K), by = before ? before.y : strength(V, y, K);
    swapApply(V, x, y, xs, ys, c, xp, yp);
    var ax = strength(V, x, K), ay = strength(V, y, K);
    swapUndo(V, x, y, xs, ys, c, xp, yp);
    return { gx: ax - bx, gy: ay - by };
  }
  function netOf(V, x, y, K, j) {
    var w = V.human[y] ? K.wHuman : K.w;
    return j.gx - w * Math.max(0, j.gy);
  }
  function finishes(V, b, gets) {
    for (var k = 0; k < gets.length; k++) {
      var d = DI[gets[k]];
      if (d < 0) continue;
      var sp = DSP[d], ok = true;
      for (var j = 0; j < sp.length; j++) {
        var q = sp[j], mineAfter = V.own[q] === b || gets.indexOf(q) >= 0;
        if (!mineAfter) ok = false;
      }
      if (ok) return d;
    }
    return -1;
  }
  function breaks(V, x, gives) {
    for (var k = 0; k < gives.length; k++) {
      var d = DI[gives[k]];
      if (d >= 0 && full(V, x, d)) return d;
    }
    return -1;
  }

  function face(list) { var v = 0; for (var k = 0; k < list.length; k++) v += PRICE[list[k]]; return v; }
  function finishedFace(V, b, recv, sent) {
    var v = 0;
    for (var k = 0; k < recv.length; k++) {
      var d = DI[recv[k]];
      if (d < 0) continue;
      var whole = true;
      for (var j = 0; j < DSP[d].length; j++) {
        var q = DSP[d][j];
        if (!(recv.indexOf(q) >= 0 || (V.own[q] === b && sent.indexOf(q) < 0))) { whole = false; break; }
      }
      if (whole) v += PRICE[recv[k]];
    }
    return v;
  }
  function floorNeed(V, x, y, gives, gets, floor) {
    if (!(floor > 1) || !gives.length) return null;
    var fin = finishedFace(V, y, gives, gets);
    if (!fin) return null;
    return (floor - 1) * Math.max(0, fin - finishedFace(V, x, gets, gives));
  }
  function netFace(gives, gets, cashIn, givesP, getsP, K) { return cashIn + face(gets) - face(gives) + K.pass * (getsP - givesP); }

  function verdict(V, x, y, K, gives, gets, cashIn, givesP, getsP, before, need) {
    var j = judge(V, x, y, K, gives, gets, -cashIn, givesP, getsP, before);
    var net = netOf(V, x, y, K, j);
    var ok = net >= K.margin && (need === null || need === undefined || netFace(gives, gets, cashIn, givesP, getsP, K) >= need);
    return { ok: ok, net: net, j: j };
  }

  var TXT = {
    yes: ['Deal!', 'Deal!', 'You have a deal.', 'Deal! Nice doing business.'],
    gift: 'Thanks! Deal!',
    vague: ['Not interested.', 'I\'ll pass.', 'That doesn\'t work for me.', 'Not for that.', 'No deal.'],
    bad: 'That offer doesn\'t work right now.',
    none: 'That doesn\'t work for me.'
  };
  var VOICE = {
    trader: { yes: 'Deal! I never miss a good swap.', no: 'I\'ll wait for the next boat.' },
    builder: { yes: 'Deal! Time to build.', no: 'Not for that. My cash is for homes.', noWhen: 'pay' },
    saver: { yes: 'Deal. My rainy-day fund approves.', no: 'Too rich for my rainy-day fund.', noWhen: 'pay' },
    collector: { yes: 'Deal! One step closer to a full district.', yesWhen: 'gets', no: 'No. I\'m keeping it for my set.', noWhen: 'keep' },
    bold: { yes: 'Deal! Full speed upstream.', no: 'Nope. I swim my own way.' }
  };
  function pick(list, s, p, salt) { return list[Math.floor(rnd(s, p, salt, s.offersThisTurn) * list.length) % list.length]; }
  function fits(when, g, t) {
    if (when === 'pay') return t.cash > 0;
    if (when === 'keep') return t.spaces.length > 0;
    if (when === 'gets') { for (var k = 0; k < g.spaces.length; k++) if (KIND[g.spaces[k]] === 'street') return true; return false; }
    return true;
  }
  function yesLine(s, p, me, g, t) {
    var v = VOICE[me.persona];
    return v && fits(v.yesWhen, g, t) ? v.yes : pick(TXT.yes, s, p, 'yes');
  }
  function noLine(s, p, me, K, g, t, plain) {
    var v = VOICE[me.persona];
    if (v && fits(v.noWhen, g, t)) return v.no;
    return K.vague && !plain ? pick(TXT.vague, s, p, 'no') : TXT.none;
  }
  function raisableOut(V, x, gives) {
    var v = liquidV(V, x);
    for (var k = 0; k < gives.length; k++) if (V.own[gives[k]] === x && !V.mort[gives[k]]) v -= MORTV[gives[k]];
    return v;
  }
  function raiseOnView(V, x, K, need, keep) {
    var list = [], i, j;
    for (i = 0; i < N; i++) {
      if (V.own[i] !== x || V.mort[i] || !OWNABLE[i] || keep.indexOf(i) >= 0) continue;
      var d = DI[i];
      if (d >= 0) {
        var skip = full(V, x, d);
        for (j = 0; j < DSP[d].length && !skip; j++) if (V.lvl[DSP[d][j]] > 0 || keep.indexOf(DSP[d][j]) >= 0) skip = true;
        if (skip) continue;
      }
      list.push({ i: i, r: mortgageLoss(V, x, i, K) / MORTV[i] });
    }
    list.sort(function (a, b) { return a.r - b.r || a.i - b.i; });
    var done = [], got = 0;
    for (j = 0; j < list.length && got < need; j++) { var q = list[j].i; V.mort[q] = 1; V.cash[x] += MORTV[q]; got += MORTV[q]; done.push(q); }
    return done;
  }
  function unraise(V, x, done) { for (var k = 0; k < done.length; k++) { V.mort[done[k]] = 0; V.cash[x] -= MORTV[done[k]]; } }
  function up100(n) { return Math.ceil(n / 100) * 100; }
  function down100(n) { return Math.floor(n / 100) * 100; }
  function wantLine(amt, short, fin) {
    var want = 'I\'d want about ' + money(amt) + ' more.';
    if (fin < 0) return short ? want + ' Mortgage a street to raise it.' : want;
    if (!short) return 'That would finish your ' + DNAME[fin] + ' district. ' + want;
    var line = 'Your ' + DNAME[fin] + ' district: ' + want + ' Mortgage to raise it.';
    return line.length < 80 ? line : want + ' Mortgage to raise it.';
  }

  function offeredBack(s, p, y, g, t, cashIn) {
    if (t.passes) return false;
    var dl = declinedFor(s, p, y), round = s.round || 1, k1 = key(t.spaces, g.spaces);
    for (var k = 0; k < dl.length; k++) {
      var e = dl[k];
      if (round - e.round < REPEAT_ROUNDS && key(e.give, e.get) === k1 && -cashIn <= e.cash) return true;
    }
    return false;
  }
  function withMargin(K, m) {
    var out = {};
    for (var k in K) out[k] = K[k];
    out.margin = m;
    return out;
  }
  function answerInner(s, V, p, o) {
    var me = playerOf(s, p);
    if (!me || !o || o.to !== p) return { accept: false, reason: TXT.bad };
    if (offerProblem(s, V, o)) return { accept: false, reason: TXT.bad };
    var y = o.from, g = side(o, 'give'), t = side(o, 'get');
    var K = tradeKnobs(s, me, V.human[y]);
    var cashIn = g.cash - t.cash;
    if (V.human[y] && K.offerMargin < K.margin && offeredBack(s, p, y, g, t, cashIn)) K = withMargin(K, K.offerMargin);
    var before = { x: strength(V, p, K), y: strength(V, y, K) };
    var need = V.human[y] ? floorNeed(V, p, y, t.spaces, g.spaces, K.floor) : null;
    var okAt = function (ci) { return verdict(V, p, y, K, t.spaces, g.spaces, ci, t.passes, g.passes, before, need).ok; };
    var gift = t.cash + t.passes + t.spaces.length === 0;
    if (okAt(cashIn)) return { accept: true, reason: gift ? TXT.gift : yesLine(s, p, me, g, t) };
    if (gift && verdict(V, p, y, K, t.spaces, g.spaces, cashIn, t.passes, g.passes, before, need).net >= 0) return { accept: true, reason: TXT.gift };
    if (g.cash + g.passes + g.spaces.length === 0 && !t.spaces.length && !t.passes) return { accept: false, reason: noLine(s, p, me, K, g, t, true) };
    var brk = breaks(V, p, t.spaces);
    var fin = K.naive ? -1 : finishes(V, y, t.spaces);
    if (brk >= 0) return { accept: false, reason: K.vague ? noLine(s, p, me, K, g, t) : 'I\'m keeping my ' + DNAME[brk] + ' streets.' };
    var cashRoom = V.cash[y] - g.cash + t.cash, room = raisableOut(V, y, g.spaces) - g.cash + t.cash;
    var findMore = function (okF) {
      if (!(room > 0) || !okF(cashIn + room)) return -1;
      var lo = 0, hi = room;
      while (hi - lo > 5) {
        var mid = Math.floor((lo + hi) / 2);
        if (okF(cashIn + mid)) hi = mid; else lo = mid;
      }
      return hi;
    };
    var more = findMore(okAt);
    var keepL = t.spaces.concat(g.spaces);
    for (var it = 0; it < 3 && more > cashRoom; it++) {
      var done = raiseOnView(V, y, K, cashIn + more - V.cash[y], keepL);
      var b2 = { x: strength(V, p, K), y: strength(V, y, K) };
      var m2 = findMore(function (ci) { return verdict(V, p, y, K, t.spaces, g.spaces, ci, t.passes, g.passes, b2, need).ok; });
      unraise(V, y, done);
      if (!(m2 > more)) break;
      more = m2;
    }
    var out = { accept: false, reason: '' }, ask = '';
    var payCase = more > 0 && t.cash > 0 && more <= t.cash && !g.cash;
    if (more > 0 && K.vague) {
      if (payCase) {
        var payH = t.cash - more >= 100 ? down100(t.cash - more) : down10(t.cash - more);
        if (payH > 0) { ask = 'Not over ' + money(payH) + '.'; out.pay = payH; }
      } else if (cashIn + more > 0) {
        var total = up100(cashIn + more);
        if (total - cashIn > room) total = up10(cashIn + more);
        if (total - cashIn > room) total = cashIn + more;
        ask = 'Not under ' + money(total) + '.';
        out.more = total - cashIn;
        out.short = out.more > cashRoom;
      }
    } else if (more > 0 && K.hint) {
      if (payCase) {
        var pay = down10(t.cash - more);
        if (pay > 0) { ask = 'I\'d pay about ' + money(pay) + '.'; out.pay = pay; }
      } else {
        var amt = more >= 500 || more > cashRoom ? Math.ceil(more / 50) * 50 : up10(more);
        if (amt > room) amt = room;
        out.more = amt;
        out.short = amt > cashRoom;
        ask = wantLine(amt, out.short, fin);
        fin = -1;
      }
    }
    if (fin >= 0 && !K.vague) out.reason = 'That would finish your ' + DNAME[fin] + ' district.' + (ask ? ' ' + ask : '');
    else out.reason = ask || noLine(s, p, me, K, g, t);
    return out;
  }

  function humanRoundOk(s, p, y) {
    var seat = seatOf(s, p);
    if (!(seat >= 0 && ((s.round || 1) + seat) % HUMAN_ROUNDS === 0)) return false;
    var log = s.log || [], round = s.round || 1;
    for (var k = log.length - 1; k >= 0; k--) {
      var e = log[k];
      if (!e) continue;
      if (e.t === 'turn' && e.round < round) break;
      if (e.t === 'offer' && e.offer && e.offer.to === y && e.offer.from !== y) return false;
    }
    return true;
  }
  function rejectedSets(s, y) {
    var out = [], log = s.log || [];
    for (var k = 0; k < log.length; k++) {
      var e = log[k];
      if (!e || e.t !== 'tradeNo' || !e.offer || e.offer.to !== y) continue;
      out.push(key(side(e.offer, 'give').spaces, side(e.offer, 'get').spaces));
    }
    return out;
  }
  function key(gs, ts) {
    var a = gs.slice().sort(function (x, z) { return x - z; }), b = ts.slice().sort(function (x, z) { return x - z; });
    return a.join(',') + '|' + b.join(',');
  }
  function wanted(V, p, y, skipD) {
    var out = [];
    for (var i = 0; i < N; i++) {
      if (V.own[i] !== p || !OWNABLE[i]) continue;
      var d = DI[i];
      if (d >= 0) {
        if (d === skipD || full(V, p, d)) continue;
        var built = false, theirs = 0, mine = 0, j;
        for (j = 0; j < DSP[d].length; j++) {
          var q = DSP[d][j];
          if (V.lvl[q] > 0) built = true;
          if (V.own[q] === y) theirs++;
          if (V.own[q] === p) mine++;
        }
        if (built || mine > 1) continue;
        if (theirs >= 1) out.push(i);
      } else if (KIND[i] === 'transit' && countOf(V, y, TRANSITS) > 0) out.push(i);
      else if (KIND[i] === 'utility' && countOf(V, y, UTILS) > 0) out.push(i);
    }
    return out;
  }

  function cpuTradesOpen(s, V) {
    if ((s.round || 1) >= CPU_TRADE_ROUND) return true;
    var owned = 0, all = 0;
    for (var i = 0; i < N; i++) if (OWNABLE[i]) { all++; if (V.own[i] >= 0) owned++; }
    return owned >= CPU_TRADE_OWNED * all;
  }
  function declinedFor(s, p, y) {
    var out = [], dl = Array.isArray(s.declined) ? s.declined : [];
    for (var k = 0; k < dl.length; k++) {
      var e = dl[k];
      if (e && e.from === p && (e.to === undefined || e.to === y) && Array.isArray(e.give) && Array.isArray(e.get)) out.push(e);
    }
    return out;
  }
  function repeatFloor(ctx, gs, ts) {
    if (!ctx.declined || !ctx.declined.length) return -Infinity;
    var k1 = key(gs, ts), round = ctx.s.round || 1, need = -Infinity, times = 0;
    var k2 = ts.length && !finishedFace(ctx.V, ctx.y, gs, ts) ? key([], ts) : null;
    for (var k = 0; k < ctx.declined.length; k++) {
      var e = ctx.declined[k];
      if (round - e.round >= REPEAT_ROUNDS) continue;
      if (key(e.give, e.get) !== k1 && !(k2 !== null && key([], e.get) === k2)) continue;
      times++;
      var base = Math.max(Math.abs(e.cash), face(e.give), face(e.get), 20);
      var c = e.cash + face(e.give) - face(gs) + Math.ceil(REPEAT_BETTER * base);
      if (c > need) need = c;
    }
    return times >= 2 ? Infinity : need;
  }
  var PATIENCE_ROUNDS = 30;
  function patience(ctx) {
    var dl = ctx.declined, round = ctx.s.round || 1, n = 0, nf = 0, last = -1e9, lastF = -1e9;
    if (!dl) return { all: false, fin: false };
    for (var k = 0; k < dl.length; k++) {
      var e = dl[k];
      if (round - e.round >= PATIENCE_ROUNDS) continue;
      n++;
      if (e.round > last) last = e.round;
      if (finishedFace(ctx.V, ctx.y, e.give, e.get)) { nf++; if (e.round > lastF) lastF = e.round; }
    }
    var wait = function (count, at) { return count > 0 && round - at < Math.min(PATIENCE_ROUNDS, HUMAN_ROUNDS * Math.pow(2, count - 1)); };
    return { all: wait(n, last), fin: wait(nf, lastF) };
  }

  function offerInner(s, V, p, K0) {
    if (s.phase !== 'roll' && s.phase !== 'end') return null;
    var tp = s.players[s.turn];
    if (!tp || tp.id !== p || s.offersThisTurn >= Ru.MAX_OFFERS) return null;
    var me = playerOf(s, p);
    var roll = rnd(s, p, 'offer'), any = roll < K0.offerRate, complete = roll < K0.completeRate;
    var cpuOk = cpuTradesOpen(s, V), stall = (s.round || 1) >= STALL_ROUND, endOn = endgame(s, V);
    var best = null;
    for (var k = 0; k < V.ids.length; k++) {
      var y = V.ids[k];
      if (y === p) continue;
      var human = V.human[y];
      if (human && !humanRoundOk(s, p, y)) continue;
      if (!human && !V.human[p] && !cpuOk) continue;
      var sellH = human && K0.sellHuman;
      if (!any && !complete && !sellH && !(human && endOn)) continue;
      var K = tradeKnobs(s, me, human);
      var py = playerOf(s, y), Ky = human ? HUMAN_MODEL : tradeKnobs(s, py, V.human[p]);
      var ctx = { s: s, V: V, p: p, y: y, K: K, Ky: Ky, human: human,
        declined: human ? declinedFor(s, p, y) : null,
        rejected: human && !Array.isArray(s.declined) ? rejectedSets(s, y) : null,
        bp: strength(V, p, K), byMine: strength(V, y, K), byTheirs: strength(V, y, Ky), bpTheirs: strength(V, p, Ky) };
      ctx.waiting = human ? patience(ctx) : null;
      var pairs = [];
      var sells = [];
      for (var d = 0; d < ND; d++) {
        var sp = DSP[d], mine = 0, theirs = 0, ts = -1, ms = -1, built = false, mineList = [];
        for (var j = 0; j < sp.length; j++) {
          var o = V.own[sp[j]];
          if (V.lvl[sp[j]] > 0) built = true;
          if (o === p) { mine++; ms = sp[j]; mineList.push(sp[j]); } else if (o === y) { theirs++; ts = sp[j]; }
        }
        if (built) continue;
        if (mine === 1 && theirs === 2) sells.push(ms);
        if (mine === 2 && theirs === 1) {
          pairs.push({ d: d, ts: ts, mine: mineList });
          if (!complete) continue;
          best = better(best, candidate(ctx, [], [ts]));
          if (K.swaps) {
            var wl = wanted(V, p, y, d);
            for (var w = 0; w < wl.length && w < 5; w++) best = better(best, candidate(ctx, [wl[w]], [ts]));
          }
        } else if (mine === 1 && theirs === 2 && (sellH || (any && K.sells))) {
          best = better(best, candidate(ctx, [ms], []));
        } else if (any && K.consolidate && mine === 1 && theirs === 1) {
          best = better(best, candidate(ctx, [], [ts]));
          var wl2 = wanted(V, p, y, d);
          for (var w2 = 0; w2 < wl2.length && w2 < 4; w2++) if (DI[wl2[w2]] >= 0) best = better(best, candidate(ctx, [wl2[w2]], [ts]));
        }
      }
      if (stall && (complete || any) && pairs.length >= 2) {
        for (var a1 = 0; a1 < pairs.length; a1++) {
          for (var b1 = 0; b1 < pairs.length; b1++) {
            if (a1 !== b1) best = better(best, candidate(ctx, pairs[b1].mine, [pairs[a1].ts]));
          }
        }
      }
      if (human && endOn) {
        for (var e1 = 0; e1 < sells.length; e1++) {
          best = better(best, endCandidate(ctx, [sells[e1]], []));
          for (var e2 = 0; e2 < pairs.length; e2++) best = better(best, endCandidate(ctx, [sells[e1]], [pairs[e2].ts]));
        }
      }
    }
    if (!best) return null;
    var offer = { from: p, to: best.y, give: { cash: best.c > 0 ? best.c : 0, spaces: best.gs.slice(), passes: 0 },
      get: { cash: best.c < 0 ? -best.c : 0, spaces: best.ts.slice(), passes: 0 } };
    return Ru.checkOffer(s, offer).ok ? offer : null;
  }
  function better(a, b) { return !b ? a : !a || b.score > a.score ? b : a; }

  var END_ROUND = 30, END_QUIET = 20;
  function endgame(s, V) {
    if (V.alive !== 2) return false;
    var r = s.round || 1;
    if (r >= END_ROUND) return true;
    if (r < END_QUIET) return false;
    for (var i = 0; i < N; i++) if (V.lvl[i] > 0) return false;
    for (var d = 0; d < ND; d++) { var o = V.own[DSP[d][0]]; if (o >= 0 && full(V, o, d)) return false; }
    return true;
  }
  function endCandidate(ctx, gs, ts) {
    var V = ctx.V, p = ctx.p, y = ctx.y, K = ctx.K;
    if (ctx.rejected && ctx.rejected.indexOf(key(gs, ts)) >= 0) return null;
    if (ctx.waiting && ctx.waiting.fin) return null;
    var need = floorNeed(V, p, y, gs, ts, K.floor), before = { x: ctx.bp, y: ctx.byMine }, hi = V.cash[y];
    var ok = function (X) { return verdict(V, p, y, K, gs, ts, X, 0, 0, before, need).ok; };
    if (!(hi >= 0) || !ok(hi)) return null;
    var X = 0;
    if (!ok(0)) {
      var lo = 0, top = hi;
      while (top - lo > 5) { var mid = Math.floor((lo + top) / 2); if (ok(mid)) top = mid; else lo = mid; }
      X = top;
      if (up10(X) <= hi && ok(up10(X))) X = up10(X);
    }
    var c = -X;
    if (c < repeatFloor(ctx, gs, ts)) return null;
    return { y: y, gs: gs, ts: ts, c: c, score: netOf(V, p, y, K, judge(V, p, y, K, gs, ts, c, 0, 0, before)) };
  }

  function candidate(ctx, gs, ts) {
    var V = ctx.V, p = ctx.p, y = ctx.y, K = ctx.K, Ky = ctx.Ky;
    if (ctx.rejected && ctx.rejected.indexOf(key(gs, ts)) >= 0) return null;
    if (ctx.waiting && (ctx.waiting.fin || (ctx.waiting.all && !finishedFace(V, y, gs, ts)))) return null;
    var lo = -V.cash[y], hi = V.cash[p];
    var myNeed = ctx.human ? floorNeed(V, p, y, gs, ts, K.floor) : null;
    var cMax = myNeed === null ? hi : Math.min(hi, Math.floor(face(ts) - face(gs) - myNeed));
    var minRepeat = repeatFloor(ctx, gs, ts);
    if (minRepeat > lo) lo = Math.min(hi + 1, minRepeat);
    var yNeed = V.human[p] ? floorNeed(V, y, p, ts, gs, Ky.floor) : null;
    var by = { x: ctx.byTheirs, y: ctx.bpTheirs };
    function yOk(c) { return verdict(V, y, p, Ky, ts, gs, c, 0, 0, by, yNeed).ok; }
    if (cMax < lo || !yOk(cMax)) return null;
    var c = lo;
    if (!yOk(lo)) {
      var top = cMax;
      while (top - c > 5) {
        var mid = Math.floor((c + top) / 2);
        if (yOk(mid)) top = mid; else c = mid;
      }
      c = top;
    }
    var mine = { x: ctx.bp, y: ctx.byMine };
    function myNet(cc) { return netOf(V, p, y, K, judge(V, p, y, K, gs, ts, cc, 0, 0, mine)); }
    function myOk(cc) { return cc <= cMax && cc >= minRepeat && myNet(cc) >= K.offerMargin; }
    if (!myOk(c)) return null;
    if (ctx.human) {
      var most = c, over = cMax;
      if (myOk(over)) most = over;
      else while (over - most > 5) { var m1 = Math.floor((most + over) / 2); if (myOk(m1)) most = m1; else over = m1; }
      var even = c, past = most, j0 = judge(V, p, y, K, gs, ts, c, 0, 0, mine);
      if (j0.gx > j0.gy) {
        var jm = judge(V, p, y, K, gs, ts, most, 0, 0, mine);
        if (jm.gx >= jm.gy) even = most;
        else while (past - even > 5) {
          var m2 = Math.floor((even + past) / 2), j2 = judge(V, p, y, K, gs, ts, m2, 0, 0, mine);
          if (j2.gx >= j2.gy) even = m2; else past = m2;
        }
      }
      c = even;
    }
    var r1 = c > 0 ? up10(c) : -down10(-c), r2 = c > 0 ? down10(c) : -up10(-c);
    c = myOk(r1) ? r1 : myOk(r2) ? r2 : c;
    if (c > V.cash[p]) c = V.cash[p];
    if (-c > V.cash[y]) c = -V.cash[y];
    if (!myOk(c)) return null;
    if (!ctx.human && !yOk(c)) return null;
    return { y: y, gs: gs, ts: ts, c: c, score: myNet(c) };
  }

  function fallback(s, p, L, V, K) {
    if (!L || !L.length) return null;
    if (s.phase === 'debt') {
      var a = find(L, 'pay') || find(L, 'bankrupt');
      if (a) return a;
      try { a = V && K ? raiseAction(V, p, K, L, s.pending.debts[0].amount - V.cash[p], false) : null; } catch (e) { a = null; }
      if (a) return a;
    }
    var order = ['ack', 'roll', 'endTurn', 'pay', 'pass', 'decline', 'reject', 'bankrupt', 'mortgage', 'sell'];
    for (var k = 0; k < order.length; k++) {
      var f = find(L, order[k]);
      if (f) return f;
    }
    return L[0];
  }
  function validFor(s, L, p, a) {
    if (!a || typeof a !== 'object' || a.p !== p) return false;
    if (a.t === 'offer') return Ru.checkOffer(s, a.offer).ok;
    if (a.t === 'bid') {
      var b = find(L, 'bid'), pl = playerOf(s, p);
      return !!b && typeof a.amount === 'number' && Math.floor(a.amount) === a.amount && a.amount >= b.amount && !!pl && a.amount <= pl.cash;
    }
    if (MANAGE[a.t]) return !!findSpace(L, a.t, a.space);
    return !!find(L, a.t);
  }

  var AI = {};

  AI.decide = function (s, p) {
    var L = null, V = null, K = null;
    try {
      ensure();
      if (!s || !s.players || s.phase === 'over' || Ru.actor(s) !== p) return null;
      L = Ru.legal(s);
      if (!L.length) return null;
      var me = playerOf(s, p);
      if (!me || me.out) return null;
      K = knobsOf(s, me);
      V = makeView(s);
      var a = null;
      switch (s.phase) {
        case 'roll': a = decideRoll(s, V, p, K, L); break;
        case 'end': a = decideEnd(s, V, p, K, L); break;
        case 'buy': a = decideBuy(s, V, p, K, L); break;
        case 'auction': a = decideBid(s, V, p, K, L); break;
        case 'card': a = find(L, 'ack'); break;
        case 'debt': a = decideDebt(s, V, p, K, L); break;
        case 'trade':
          var ans = answerInner(s, V, p, s.pending.offer);
          a = { t: ans.accept ? 'accept' : 'reject', p: p, reason: ans.reason };
          break;
        default: a = null;
      }
      if (validFor(s, L, p, a)) return a;
      AI.misses++;
      return fallback(s, p, L, V, K);
    } catch (e) {
      AI.lastError = String((e && e.stack) || e);
      try { return fallback(s, p, L || Ru.legal(s), V, K); } catch (e2) { return null; }
    }
  };

  AI.answer = function (s, p, offer) {
    try {
      ensure();
      if (!s || !s.players) return { accept: false, reason: TXT.bad };
      return answerInner(s, makeView(s), p, offer);
    } catch (e) {
      AI.lastError = String((e && e.stack) || e);
      return { accept: false, reason: TXT.bad };
    }
  };

  AI.offerFor = function (s, p) {
    try {
      ensure();
      if (!s || !s.players) return null;
      var me = playerOf(s, p);
      if (!me || me.out) return null;
      return offerInner(s, makeView(s), p, knobsOf(s, me));
    } catch (e) {
      AI.lastError = String((e && e.stack) || e);
      return null;
    }
  };

  AI.value = function (s, p, space) {
    try {
      ensure();
      if (!s || !s.players || !isSpace(space)) return 0;
      var me = playerOf(s, p);
      if (!me) return 0;
      return Math.round(spaceValue(makeView(s), p, space, knobsOf(s, me), true));
    } catch (e) {
      AI.lastError = String((e && e.stack) || e);
      return 0;
    }
  };

  AI.landing = function () { ensure(); return Array.prototype.slice.call(LAND); };
  AI.nextTurn = function (pos) { ensure(); return Array.prototype.slice.call(NEXT[pos] || NEXT[0]); };
  AI.knobs = function (s, p) { var me = s && s.players ? playerOf(s, p) : null; var K = knobsOf(s || {}, me), out = {}; for (var k in K) out[k] = K[k]; return out; };
  AI.reserve = function (s, p) {
    try { ensure(); var me = playerOf(s, p); var V = makeView(s); return me ? Math.round(reserveOf(V, p, knobsOf(s, me))) : 0; } catch (e) { return 0; }
  };
  AI.strength = function (s, p) {
    try { ensure(); var me = playerOf(s, p); return me ? Math.round(strength(makeView(s), p, knobsOf(s, me))) : 0; } catch (e) { return 0; }
  };
  AI.LEVELS = ['easy', 'normal', 'hard'];
  AI.PERSONAS = ['trader', 'builder', 'saver', 'collector', 'bold'];
  AI.TURN_MANAGE_CAP = TURN_MANAGE_CAP;
  AI.misses = 0;
  AI.lastError = null;
  AI.VERSION = 1;

  ECE.AI = AI;
})(window.ECE = window.ECE || {});
;
(function (ECE) {
  'use strict';

  var W = window;

  var VERSION = 1;
  var APP = 'emeraldcityestates';
  var PREFIX = 'emeraldcityestates.';
  var KEY = PREFIX + 'save.v1';
  var BACKUP_KEY = PREFIX + 'backup.v1';
  var BROKEN_PREFIX = PREFIX + 'broken.';
  var PREMIGRATION_PREFIX = PREFIX + 'premigration.v';
  var PROBE_KEY = PREFIX + 'probe';
  var CODE_PREFIX = 'ECE1-';
  var MAX_CODE = 2 * 1024 * 1024;
  var NAME_MAX = 20;
  var HISTORY_MAX = 20;
  var BROKEN_MAX = 200;
  var DEBOUNCE_MS = 300;
  var MAX_WAIT_MS = 2000;
  var RETRY_MS = 5000;
  var GAME_NAME = 'Emerald City Estates';

  var SETTINGS = { speed: 'normal', sound: true, volume: 0.6, rain: false, tips: true, reduceMotion: 'auto', closeUp: false };
  var SETUP = { name: 'You', token: 'orca', opponents: 3, level: 'normal', limit: 'none', auctions: true, rainFund: false };
  var STATS = { played: 0, won: 0, bestNet: 0, bestRank: 0, fastestWin: 0 };
  var SPEEDS = ['normal', 'fast', 'instant'];
  var MOTION = ['auto', 'on', 'off'];
  var LEVELS_DEFAULT = ['easy', 'normal', 'hard'];
  var LIMITS_DEFAULT = ['none', 'm30', 'm60', 'm90', 'r20', 'r40'];
  var TOKENS_DEFAULT = ['ferry', 'coffee', 'salmon', 'umbrella', 'evergreen', 'orca', 'bicycle', 'seaplane'];
  var PERSONAS_DEFAULT = ['trader', 'builder', 'saver', 'collector', 'bold'];
  var PHASES = ['roll', 'buy', 'auction', 'card', 'debt', 'trade', 'end', 'over'];
  var DECK_IDS = ['rain', 'buzz'];
  var LIMIT_KINDS = ['none', 'minutes', 'rounds'];

  function gloss() { return ECE.Glossary || null; }
  function ids(list, fallback) {
    if (!list || !list.length) return fallback;
    var out = [];
    for (var i = 0; i < list.length; i++) if (list[i] && typeof list[i].id === 'string') out.push(list[i].id);
    return out.length ? out : fallback;
  }
  function levelIds() { var G = gloss(); return ids(G && G.levels, LEVELS_DEFAULT); }
  function limitIds() { var G = gloss(); return ids(G && G.limits, LIMITS_DEFAULT); }
  function tokenIds() { var G = gloss(); return ids(G && G.tokens, TOKENS_DEFAULT); }
  function personaIds() {
    var G = gloss(), out = [];
    if (G && G.computers) for (var i = 0; i < G.computers.length; i++) if (G.computers[i] && G.computers[i].persona) out.push(G.computers[i].persona);
    return out.length ? out : PERSONAS_DEFAULT;
  }
  function gameName() { var G = gloss(); return (G && G.game && G.game.name) || GAME_NAME; }
  function spaceCount() { var B = ECE.BoardData; return (B && B.SPACES && B.SPACES.length) || 40; }
  function maxPlayers() { var B = ECE.BoardData; return (B && B.RULES && B.RULES.maxPlayers) || 6; }

  var hooks = { storage: null, kind: '', scheduler: null, clock: null };
  var st = {
    readOnly: false, storageNotice: null, pending: null, debounce: null, maxWait: null, retry: null,
    replacing: makeSet(), premigration: null,
    lastText: undefined, takenOver: false, takenHow: null, takenGameChanged: true, listening: false, inLoad: false,
    errorKind: null, errorText: null, putError: null, readError: null, notifyTimer: null,
    conflictCbs: [], errorCbs: []
  };

  function makeSet() {
    if (typeof WeakSet === 'function') return new WeakSet();
    var list = [];
    return {
      add: function (o) { if (list.indexOf(o) < 0) list.push(o); },
      has: function (o) { return list.indexOf(o) >= 0; },
      'delete': function (o) { var i = list.indexOf(o); if (i >= 0) list.splice(i, 1); }
    };
  }

  function memoryStorage() {
    var m = {};
    return {
      getItem: function (k) { k = String(k); return Object.prototype.hasOwnProperty.call(m, k) ? m[k] : null; },
      setItem: function (k, v) { m[String(k)] = String(v); },
      removeItem: function (k) { delete m[String(k)]; }
    };
  }

  function store() {
    if (hooks.storage) return hooks.storage;
    var ls = null;
    try {
      ls = W.localStorage || null;
      if (ls) ls.getItem(KEY);
    } catch (e) { ls = null; }
    if (ls) {
      hooks.storage = ls;
      hooks.kind = 'local';
      try { ls.setItem(PROBE_KEY, '1'); ls.removeItem(PROBE_KEY); } catch (e2) { writeFailed(e2); }
      return ls;
    }
    hooks.storage = memoryStorage();
    hooks.kind = 'memory';
    st.storageNotice = 'This browser is not keeping saves for ' + gameName() + ' (private browsing, or saving is turned off for this site). Your game lasts until you close this tab; to keep it, copy your save code in Settings.';
    return hooks.storage;
  }

  function errorKind(e) {
    var name = e && e.name ? String(e.name) : '';
    var code = e && typeof e.code === 'number' ? e.code : 0;
    var words = name + ' ' + String((e && e.message) || e || '');
    if (name === 'QuotaExceededError' || name === 'NS_ERROR_DOM_QUOTA_REACHED' || code === 22 || code === 1014 || /quota|storage is full|no space/i.test(words)) return 'full';
    if (name === 'SecurityError' || name === 'NotAllowedError' || name === 'InvalidAccessError' || code === 18 || /security|denied|not allowed|permission|insecure|disabled|blocked/i.test(words)) return 'denied';
    return 'unknown';
  }

  function call(cb, info) {
    try { cb(info); } catch (e) { }
  }

  function tellErrors() {
    var kind = st.errorKind;
    if (st.inLoad || !kind) return;
    var list = st.errorCbs.slice();
    for (var i = 0; i < list.length; i++) {
      if (list[i].told[kind]) continue;
      list[i].told[kind] = true;
      call(list[i].fn, { kind: kind });
    }
  }
  function tellConflict() {
    if (st.inLoad || !st.takenOver) return;
    var list = st.conflictCbs.slice();
    for (var i = 0; i < list.length; i++) {
      if (list[i].told) continue;
      list[i].told = true;
      call(list[i].fn, { how: st.takenHow, gameChanged: st.takenGameChanged });
    }
  }

  function writeFailed(e) {
    st.errorKind = errorKind(e);
    st.errorText = String((e && e.name ? e.name + ': ' : '') + ((e && e.message) || e || 'the write failed')).slice(0, 300);
    tellErrors();
  }
  function writeWorked() {
    st.errorKind = null;
    st.errorText = null;
    st.putError = null;
    for (var i = 0; i < st.errorCbs.length; i++) st.errorCbs[i].told = {};
  }

  function gameText(text) {
    if (typeof text !== 'string') return null;
    try {
      var o = JSON.parse(text);
      return isObj(o) && o.game !== undefined && o.game !== null ? JSON.stringify(o.game) : null;
    } catch (e) { return 'unreadable'; }
  }
  function gameChangedFrom(cur) { return gameText(cur) !== gameText(st.lastText); }

  function takeOver(how, gameChanged) {
    if (st.takenOver) return;
    st.takenOver = true;
    st.takenHow = how;
    st.takenGameChanged = gameChanged !== false;
    st.pending = null;
    cancelTimers();
    tellConflict();
  }

  var HEAD_RE = /^\{"v":(-?\d+),"app":"emeraldcityestates","createdAt":(-?[0-9.eE+-]+),"updatedAt":-?[0-9.eE+-]+,"build":"(?:[^"\\]|\\.)*"/;
  function sameContent(a, b) {
    if (a === b) return true;
    if (typeof a !== 'string' || typeof b !== 'string') return false;
    var ma = HEAD_RE.exec(a), mb = HEAD_RE.exec(b);
    if (!ma || !mb) return false;
    return ma[1] === mb[1] && ma[2] === mb[2] && a.slice(ma[0].length) === b.slice(mb[0].length);
  }

  function onStorageEvent(e) {
    try {
      if (!e || (e.key !== KEY && e.key !== null) || st.takenOver || hooks.kind === 'memory' || st.lastText === undefined) return;
      var cur = get(KEY);
      if (cur === null || sameContent(cur, st.lastText)) return;
      if (newerStored(cur)) st.readOnly = true;
      takeOver('event', gameChangedFrom(cur));
    } catch (err) { }
  }
  function listen() {
    if (st.listening) return;
    try {
      if (W && typeof W.addEventListener === 'function') { W.addEventListener('storage', onStorageEvent); st.listening = true; }
    } catch (e) { }
  }

  function known(list, cb) {
    for (var i = 0; i < list.length; i++) if (list[i].fn === cb) return true;
    return false;
  }
  function onConflict(cb) {
    if (typeof cb !== 'function') return false;
    if (!known(st.conflictCbs, cb)) st.conflictCbs.push({ fn: cb, told: false });
    tellConflict();
    return true;
  }
  function onError(cb) {
    if (typeof cb !== 'function') return false;
    if (!known(st.errorCbs, cb)) st.errorCbs.push({ fn: cb, told: {} });
    tellErrors();
    return true;
  }

  function clock() {
    if (hooks.clock) { var t = Number(hooks.clock()); return isFinite(t) ? t : 0; }
    return Date.now();
  }

  function scheduler() {
    if (hooks.scheduler) return hooks.scheduler;
    if (W && typeof W.setTimeout === 'function' && typeof W.clearTimeout === 'function') {
      return { set: function (fn, ms) { return W.setTimeout(fn, ms); }, clear: function (h) { W.clearTimeout(h); } };
    }
    return null;
  }

  function get(key) {
    try { var v = store().getItem(key); return v === null || v === undefined ? null : String(v); } catch (e) { st.readError = e; return null; }
  }
  function put(key, value) {
    try { store().setItem(key, value); return true; } catch (e) { st.putError = e; return false; }
  }

  var CONTROL = /[\u0000-\u001f\u007f-\u009f\u00ad\u061c\u115f\u1160\u180e\u200b-\u200f\u2028-\u202e\u2060-\u2069\u3164\ufeff\uffa0]/g;
  function badKey(k) { return k === '__proto__' || k === 'constructor' || k === 'prototype'; }

  function isObj(v) { return !!v && typeof v === 'object' && !Array.isArray(v); }
  function own(o, k) { return Object.prototype.hasOwnProperty.call(o, k); }
  function cleanStr(v, max, def) {
    if (typeof v !== 'string') return def;
    var s = v.replace(CONTROL, '').trim();
    if (s.length > max) s = s.slice(0, max).trim();
    return s.length ? s : def;
  }
  function cleanNum(v, lo, hi, def, whole) {
    if (typeof v !== 'number' || !isFinite(v)) return def;
    var x = whole ? Math.round(v) : v;
    if (x < lo) x = lo;
    if (x > hi) x = hi;
    return x;
  }
  function cleanBool(v, def) { return typeof v === 'boolean' ? v : def; }
  function cleanEnum(v, list, def) { return list.indexOf(v) >= 0 ? v : def; }
  function clone(v) { return v === undefined ? undefined : JSON.parse(JSON.stringify(v)); }

  function section(value, spec, defaults, strict, repairs, where) {
    var src = isObj(value) ? value : null;
    if (!src && repairs && value !== undefined) repairs.push(where);
    var out = strict || !src ? {} : src;
    for (var k in spec) {
      if (!own(spec, k)) continue;
      var had = src && own(src, k) ? src[k] : undefined;
      var v = spec[k](had, defaults[k]);
      if (repairs && src && own(src, k) && JSON.stringify(v) !== JSON.stringify(had)) repairs.push(where + '.' + k);
      out[k] = v;
    }
    return out;
  }

  var settingsSpec = {
    speed: function (v, d) { return cleanEnum(v, SPEEDS, d); },
    sound: cleanBool,
    volume: function (v, d) { return cleanNum(v, 0, 1, d, false); },
    rain: cleanBool,
    tips: cleanBool,
    reduceMotion: function (v, d) { return cleanEnum(v, MOTION, d); },
    closeUp: cleanBool
  };
  var setupSpec = {
    name: function (v, d) { return cleanStr(v, NAME_MAX, d); },
    token: function (v, d) { return cleanEnum(v, tokenIds(), d); },
    opponents: function (v, d) { return cleanNum(v, 1, Math.max(1, maxPlayers() - 1), d, true); },
    level: function (v, d) { return cleanEnum(v, levelIds(), d); },
    limit: function (v, d) { return cleanEnum(v, limitIds(), d); },
    auctions: cleanBool,
    rainFund: cleanBool
  };
  var statsSpec = {
    played: function (v, d) { return cleanNum(v, 0, 1e9, d, true); },
    won: function (v, d) { return cleanNum(v, 0, 1e9, d, true); },
    bestNet: function (v, d) { return cleanNum(v, -1e12, 1e12, d, true); },
    bestRank: function (v, d) { return cleanNum(v, 0, 99, d, true); },
    fastestWin: function (v, d) { return cleanNum(v, 0, 1e12, d, false); }
  };

  function cleanTips(v, strict, repairs) {
    if (!isObj(v)) { if (repairs && v !== undefined) repairs.push('tips'); return {}; }
    if (!strict) return v;
    var out = {}, n = 0;
    for (var k in v) {
      if (!own(v, k) || badKey(k) || !/^[A-Za-z0-9_.:-]{1,40}$/.test(k) || v[k] !== true) continue;
      out[k] = true;
      if (++n >= 200) break;
    }
    return out;
  }

  var HISTORY_LIMIT = /^(?:none|minutes:\d{1,4}|rounds:\d{1,4})$/;
  function cleanLimit(v) {
    if (typeof v !== 'string') return 'none';
    if (HISTORY_LIMIT.test(v)) return v;
    return cleanEnum(v, limitIds(), 'none');
  }

  function cleanHistoryEntry(e) {
    if (!isObj(e)) return null;
    var of = cleanNum(e.of, 2, maxPlayers(), 2, true);
    return {
      at: cleanNum(e.at, 0, 1e15, 0, false),
      rounds: cleanNum(e.rounds, 0, 1e6, 0, true),
      rank: cleanNum(e.rank, 0, of, of, true),
      of: of,
      net: cleanNum(e.net, -1e12, 1e12, 0, true),
      winnerName: cleanStr(e.winnerName, NAME_MAX, ''),
      limit: cleanLimit(e.limit)
    };
  }
  function cleanHistory(v, strict, repairs) {
    if (!Array.isArray(v)) { if (repairs && v !== undefined) repairs.push('history'); return []; }
    if (!strict) {
      if (v.length > HISTORY_MAX) v.splice(0, v.length - HISTORY_MAX);
      return v;
    }
    var out = [];
    for (var i = Math.max(0, v.length - HISTORY_MAX); i < v.length; i++) {
      var e = cleanHistoryEntry(v[i]);
      if (e) out.push(e);
    }
    return out;
  }

  function cleanBuild(v) { return typeof v === 'string' && /^[A-Za-z0-9._-]{1,40}$/.test(v) ? v : ''; }

  function normalize(obj, strict) {
    var repairs = [];
    var src = isObj(obj) ? obj : {};
    var out = strict ? {} : src;
    var top = {
      v: VERSION,
      app: APP,
      createdAt: cleanNum(src.createdAt, 0, 1e15, 0, false),
      updatedAt: cleanNum(src.updatedAt, 0, 1e15, 0, false),
      build: cleanBuild(src.build)
    };
    if (!strict) {
      for (var k in top) if (own(top, k) && own(src, k) && src[k] !== top[k] && k !== 'v' && k !== 'app') repairs.push(k);
    }
    if (strict) for (var t in top) out[t] = top[t];
    else for (var t2 in top) src[t2] = top[t2];
    out.settings = section(src.settings, settingsSpec, SETTINGS, strict, strict ? null : repairs, 'settings');
    out.setup = section(src.setup, setupSpec, SETUP, strict, strict ? null : repairs, 'setup');
    out.stats = section(src.stats, statsSpec, STATS, strict, strict ? null : repairs, 'stats');
    out.tips = cleanTips(src.tips, strict, strict ? null : repairs);
    var tipShown = cleanBool(src.keepTipShown, false);
    if (!strict && own(src, 'keepTipShown') && src.keepTipShown !== tipShown) repairs.push('keepTipShown');
    out.keepTipShown = tipShown;
    out.game = own(src, 'game') && src.game !== undefined ? src.game : null;
    out.history = cleanHistory(src.history, strict, strict ? null : repairs);
    return { save: out, repairs: repairs };
  }

  function blank(now) {
    var t = typeof now === 'number' && isFinite(now) ? now : clock();
    return {
      v: VERSION, app: APP, createdAt: t, updatedAt: t, build: currentBuild(),
      settings: clone(SETTINGS), setup: clone(SETUP), stats: clone(STATS),
      tips: {}, keepTipShown: false, game: null, history: []
    };
  }

  function currentBuild() { return cleanBuild(ECE.BUILD) || 'dev'; }

  function gameShapeOk(g) {
    if (g === null) return true;
    if (!isObj(g)) return false;
    if (!Array.isArray(g.players) || g.players.length < 2 || g.players.length > maxPlayers()) return false;
    for (var i = 0; i < g.players.length; i++) if (!isObj(g.players[i])) return false;
    if (!isObj(g.props) || typeof g.phase !== 'string' || PHASES.indexOf(g.phase) < 0) return false;
    return typeof g.round === 'number' && isFinite(g.round);
  }

  function generic(v, depth) {
    if (v === null || typeof v === 'boolean') return v;
    if (typeof v === 'number') return isFinite(v) ? v : 0;
    if (typeof v === 'string') return cleanStr(v, 300, '');
    if (depth > 6) return null;
    if (Array.isArray(v)) {
      var a = [];
      for (var i = 0; i < v.length && i < 500; i++) { var x = generic(v[i], depth + 1); if (x !== undefined) a.push(x); }
      return a;
    }
    if (isObj(v)) {
      var o = {}, n = 0;
      for (var k in v) {
        if (!own(v, k) || badKey(k) || !/^[A-Za-z_$][A-Za-z0-9_$]{0,39}$/.test(k)) continue;
        var y = generic(v[k], depth + 1);
        if (y !== undefined) o[k] = y;
        if (++n >= 60) break;
      }
      return o;
    }
    return undefined;
  }

  function int(v, lo, hi, def) { return cleanNum(v, lo, hi, def, true); }
  function idOrNull(v, n) { return v === null ? null : int(v, 0, n - 1, null); }
  function spaceList(v) {
    var out = [];
    if (!Array.isArray(v)) return out;
    for (var i = 0; i < v.length && i < 40; i++) {
      var s = int(v[i], 0, spaceCount() - 1, -1);
      if (s >= 0 && out.indexOf(s) < 0) out.push(s);
    }
    return out;
  }
  function side(v) {
    var s = isObj(v) ? v : {};
    return { cash: int(s.cash, 0, 1e9, 0), spaces: spaceList(s.spaces), passes: int(s.passes, 0, 2, 0) };
  }
  function cleanOffer(v, n) {
    if (!isObj(v)) return null;
    return { from: idOrNull(v.from, n), to: idOrNull(v.to, n), give: side(v.give), get: side(v.get) };
  }
  function idList(v, n) {
    var out = [];
    if (!Array.isArray(v)) return out;
    for (var i = 0; i < v.length && i < n; i++) { var x = int(v[i], 0, n - 1, -1); if (x >= 0 && out.indexOf(x) < 0) out.push(x); }
    return out;
  }
  var RESUME = PHASES.concat(['leave']);

  function cleanPending(v, n) {
    if (!isObj(v)) return null;
    var out = generic(v, 1);
    var space = function (x) { return int(x, 0, spaceCount() - 1, 0); };
    switch (v.kind) {
      case 'buy':
        out.space = space(v.space);
        return out;
      case 'auction':
        out.space = space(v.space); out.bid = int(v.bid, 0, 1e9, 0); out.leader = idOrNull(v.leader, n);
        out.order = idList(v.order, n); out.idx = int(v.idx, 0, n, 0);
        return out;
      case 'card':
        out.deck = cleanEnum(v.deck, DECK_IDS, 'rain'); out.id = cleanStr(v.id, 20, '');
        return out;
      case 'debt': {
        var debts = [];
        if (Array.isArray(v.debts)) {
          for (var i = 0; i < v.debts.length && i < n; i++) {
            var d = v.debts[i];
            if (!isObj(d)) continue;
            var to = [];
            if (Array.isArray(d.to)) {
              for (var j = 0; j < d.to.length && j < n; j++) {
                if (!isObj(d.to[j])) continue;
                var c = generic(d.to[j], 3);
                c.id = idOrNull(d.to[j].id, n);
                c.amount = int(d.to[j].amount, 0, 1e9, 0);
                to.push(c);
              }
            }
            var e = generic(d, 2);
            e.player = int(d.player, 0, n - 1, 0); e.amount = int(d.amount, 0, 1e9, 0); e.to = to; e.reason = cleanStr(d.reason, 40, '');
            debts.push(e);
          }
        }
        out.debts = debts;
        out.resume = cleanEnum(v.resume, RESUME, 'end');
        return out;
      }
      case 'trade':
        out.offer = cleanOffer(v.offer, n); out.back = cleanEnum(v.back, PHASES, 'roll');
        return out;
      default: return null;
    }
  }

  function engineKeys() {
    var R = ECE.Rules;
    if (!R || typeof R.newGame !== 'function') return { top: {}, player: {} };
    try {
      var g = R.newGame({ seed: 1, now: 0, players: [{ name: 'A', token: 'ferry', kind: 'human', level: 'normal' }, { name: 'B', token: 'coffee', kind: 'cpu', level: 'normal', persona: 'trader' }], rules: { auctions: true, rainFund: false, limit: { kind: 'none', value: 0 } } });
      var top = {}, player = {};
      if (isObj(g)) for (var k in g) if (own(g, k)) top[k] = 1;
      if (g && Array.isArray(g.players) && isObj(g.players[0])) for (var p in g.players[0]) if (own(g.players[0], p)) player[p] = 1;
      return { top: top, player: player };
    } catch (e) { return { top: {}, player: {} }; }
  }

  var PLAYER_KEYS = ['id', 'name', 'token', 'color', 'kind', 'level', 'persona', 'cash', 'pos', 'stuck', 'stuckTries', 'passes', 'out', 'outOrder', 'outRound'];
  var GAME_KEYS = ['v', 'seed', 'rng', 'createdAt', 'playMs', 'round', 'turn', 'phase', 'dice', 'doubles', 'rolled', 'players', 'props', 'decks', 'rainFund', 'rules', 'pending', 'limitHit', 'offersThisTurn', 'log', 'winner', 'standings', 'counters'];

  function cleanPlayer(p, i, n, extra) {
    var G = gloss();
    var colors = (G && G.playerColors) || [];
    var out = {
      id: int(p.id, 0, maxPlayers() - 1, i),
      name: cleanStr(p.name, NAME_MAX, 'Player ' + (i + 1)),
      token: cleanEnum(p.token, tokenIds(), tokenIds()[0]),
      color: typeof p.color === 'string' && /^#[0-9a-fA-F]{6}$/.test(p.color) ? p.color : (colors[i] || '#1E73E8'),
      kind: cleanEnum(p.kind, ['human', 'cpu'], 'cpu'),
      level: cleanEnum(p.level, levelIds(), 'normal'),
      persona: typeof p.persona === 'string' && personaIds().indexOf(p.persona) >= 0 ? p.persona : null,
      cash: int(p.cash, -1e9, 1e9, 0),
      pos: int(p.pos, 0, spaceCount() - 1, 0),
      stuck: cleanBool(p.stuck, false),
      stuckTries: int(p.stuckTries, 0, 3, 0),
      passes: [],
      out: cleanBool(p.out, false),
      outOrder: int(p.outOrder, 0, n, 0)
    };
    if (Array.isArray(p.passes)) for (var j = 0; j < p.passes.length && j < 2; j++) if (DECK_IDS.indexOf(p.passes[j]) >= 0) out.passes.push(p.passes[j]);
    if (own(p, 'outRound')) out.outRound = int(p.outRound, 0, 1e6, 0);
    for (var k in p) {
      if (own(p, k) && !own(out, k) && own(extra, k) && !badKey(k)) { var x = generic(p[k], 1); if (x !== undefined) out[k] = x; }
    }
    return out;
  }

  function cleanDeck(d) {
    var o = isObj(d) ? d : {};
    var order = [];
    if (Array.isArray(o.order)) for (var i = 0; i < o.order.length && i < 60; i++) { var s = cleanStr(o.order[i], 20, ''); if (s) order.push(s); }
    return { order: order, next: int(o.next, 0, 60, 0) };
  }

  function cleanGame(g) {
    if (g === null || g === undefined) return null;
    if (!isObj(g) || !Array.isArray(g.players)) return undefined;
    var n = Math.min(g.players.length, maxPlayers());
    if (n < 2) return undefined;
    var ek = engineKeys();
    var out = {
      v: int(g.v, 0, 1e6, 1),
      seed: int(g.seed, -4294967296, 4294967296, 0),
      rng: { s: int(isObj(g.rng) ? g.rng.s : 0, -4294967296, 4294967296, 0) },
      createdAt: cleanNum(g.createdAt, 0, 1e15, 0, false),
      playMs: cleanNum(g.playMs, 0, 1e12, 0, false),
      round: int(g.round, 1, 1e6, 1),
      turn: int(g.turn, 0, n - 1, 0),
      phase: cleanEnum(g.phase, PHASES, 'roll'),
      dice: Array.isArray(g.dice) && g.dice.length === 2 ? [int(g.dice[0], 1, 6, 1), int(g.dice[1], 1, 6, 1)] : null,
      doubles: int(g.doubles, 0, 3, 0),
      rolled: cleanBool(g.rolled, false),
      players: [],
      props: {},
      decks: { rain: cleanDeck(isObj(g.decks) ? g.decks.rain : null), buzz: cleanDeck(isObj(g.decks) ? g.decks.buzz : null) },
      rainFund: int(g.rainFund, 0, 1e9, 0),
      rules: {
        auctions: cleanBool(isObj(g.rules) ? g.rules.auctions : undefined, true),
        rainFund: cleanBool(isObj(g.rules) ? g.rules.rainFund : undefined, false),
        limit: {
          kind: cleanEnum(isObj(g.rules) && isObj(g.rules.limit) ? g.rules.limit.kind : '', LIMIT_KINDS, 'none'),
          value: int(isObj(g.rules) && isObj(g.rules.limit) ? g.rules.limit.value : 0, 0, 1e6, 0)
        }
      },
      pending: cleanPending(g.pending, n),
      limitHit: cleanBool(g.limitHit, false),
      offersThisTurn: int(g.offersThisTurn, 0, 99, 0),
      log: [],
      winner: g.winner === null || g.winner === undefined ? null : int(g.winner, 0, maxPlayers() - 1, null),
      standings: g.standings === null || g.standings === undefined ? null : generic(g.standings, 1),
      counters: {
        turns: int(isObj(g.counters) ? g.counters.turns : 0, 0, 1e9, 0),
        trades: int(isObj(g.counters) ? g.counters.trades : 0, 0, 1e9, 0),
        auctions: int(isObj(g.counters) ? g.counters.auctions : 0, 0, 1e9, 0),
        bankrupt: int(isObj(g.counters) ? g.counters.bankrupt : 0, 0, 1e9, 0)
      }
    };
    for (var i = 0; i < n; i++) {
      if (!isObj(g.players[i])) return undefined;
      out.players.push(cleanPlayer(g.players[i], i, n, ek.player));
    }
    if (isObj(g.props)) {
      for (var k in g.props) {
        if (!own(g.props, k) || !/^\d{1,2}$/.test(k) || +k >= spaceCount()) continue;
        var p = g.props[k];
        if (!isObj(p)) continue;
        out.props[String(+k)] = { owner: int(p.owner, 0, maxPlayers() - 1, 0), level: int(p.level, 0, 5, 0), mortgaged: cleanBool(p.mortgaged, false) };
      }
    }
    if (Array.isArray(g.log)) {
      var max = (ECE.BoardData && ECE.BoardData.RULES && ECE.BoardData.RULES.logMax) || 200;
      for (var e = Math.max(0, g.log.length - max); e < g.log.length; e++) {
        var ev = generic(g.log[e], 1);
        if (isObj(ev)) out.log.push(ev);
      }
    }
    for (var x in g) {
      if (own(g, x) && !own(out, x) && own(ek.top, x) && !badKey(x) && GAME_KEYS.indexOf(x) < 0) {
        var y = generic(g[x], 1);
        if (y !== undefined) out[x] = y;
      }
    }
    return out;
  }

  var MIGRATIONS = {
    1: function (s) {
      s.app = APP;
      if (!isObj(s.settings)) s.settings = clone(SETTINGS);
      if (!isObj(s.setup)) s.setup = clone(SETUP);
      if (!isObj(s.stats)) s.stats = clone(STATS);
      if (!isObj(s.tips)) s.tips = {};
      if (typeof s.keepTipShown !== 'boolean') s.keepTipShown = false;
      if (!own(s, 'game')) s.game = null;
      if (!Array.isArray(s.history)) s.history = [];
      return s;
    }
  };

  function migrate(obj, opts) {
    opts = opts || {};
    var to = typeof opts.to === 'number' ? opts.to : VERSION;
    var table = opts.migrations || MIGRATIONS;
    try {
      if (!isObj(obj)) return { ok: false, save: null, error: 'not a save' };
      if (obj.app !== undefined && obj.app !== APP) return { ok: false, save: null, error: 'a save of another game' };
      var from = obj.v === undefined ? 0 : obj.v;
      if (typeof from !== 'number' || !isFinite(from) || from < 0 || Math.floor(from) !== from) return { ok: false, save: null, error: 'an unknown save format (' + String(from).slice(0, 12) + ')' };
      if (from > to) return { ok: false, save: null, error: 'a save from a newer version (format ' + from + ')', newer: true };
      var s = clone(obj);
      for (var n = from + 1; n <= to; n++) {
        if (typeof table[n] !== 'function') return { ok: false, save: null, error: 'no migration to format ' + n };
        var r = table[n](s);
        if (isObj(r)) s = r;
        if (!isObj(s)) return { ok: false, save: null, error: 'the migration to format ' + n + ' gave no save' };
        s.v = n;
      }
      s.v = to;
      s.app = APP;
      return { ok: true, save: s, error: null, from: from };
    } catch (e) {
      return { ok: false, save: null, error: 'the migration failed: ' + String((e && e.message) || e).slice(0, 120) };
    }
  }

  function keepBroken(raw) {
    for (var n = 1; n <= BROKEN_MAX; n++) {
      var key = BROKEN_PREFIX + n;
      var have = get(key);
      if (have === raw) return key;
      if (have !== null) continue;
      if (!put(key, raw)) return null;
      return get(key) === raw ? key : null;
    }
    return null;
  }

  function loadResult(save, readOnly, notice, info) {
    st.readOnly = !!readOnly;
    info = info || { reason: 'ok' };
    var bits = [info.reason];
    if (info.error) bits.push(String(info.error));
    if (info.key) bits.push('kept as ' + info.key);
    if (hooks.kind === 'memory') bits.push('storage: memory');
    if (st.errorKind) bits.push('writes failing: ' + st.errorKind + (st.errorText ? ' (' + st.errorText + ')' : ''));
    info.detail = bits.join('; ');
    Save.lastLoad = info;
    var n = st.storageNotice;
    var text = notice && n ? notice + ' ' + n : (notice || n || null);
    return { save: save, readOnly: !!readOnly, notice: text };
  }

  function load() {
    st.inLoad = true;
    var r;
    try { r = loadNow(); } finally { st.inLoad = false; }
    if (st.errorKind || st.takenOver) {
      var S = scheduler();
      if (S && st.notifyTimer === null) st.notifyTimer = S.set(function () { st.notifyTimer = null; tellErrors(); tellConflict(); }, 0);
    }
    return r;
  }

  function loadNow() {
    cancelTimers();
    st.pending = null;
    st.readOnly = false;
    st.takenOver = false;
    st.takenHow = null;
    st.takenGameChanged = true;
    for (var c = 0; c < st.conflictCbs.length; c++) st.conflictCbs[c].told = false;
    st.premigration = null;
    st.lastText = undefined;
    Save.lastRepairs = [];
    Save.lastProblems = [];
    store();
    listen();
    var raw = get(KEY);
    st.lastText = raw;
    if (raw === null) return loadResult(blank(), false, null, { reason: 'new' });

    var obj = null, why = '';
    try { obj = JSON.parse(raw); } catch (e) { why = 'not JSON'; }
    if (!why && !isObj(obj)) why = 'not a save object';
    if (!why) {
      var m = migrate(obj);
      if (!m.ok && m.newer) {
        return loadResult(blank(), true, 'This save was made by a newer version of ' + gameName() + '. Reload the page to get it; until then nothing is saved here, so the newer save stays as it is.', { reason: 'newer', error: m.error });
      }
      if (!m.ok) why = m.error;
      else {
        var r = normalize(m.save, false);
        Save.lastRepairs = r.repairs;
        if (m.from < VERSION) st.premigration = { key: PREMIGRATION_PREFIX + m.from, raw: raw };
        if (!gameShapeOk(r.save.game)) {
          var kept = keepBroken(raw);
          if (!kept) return loadResult(r.save, true, 'The game in progress could not be read. It was left as it is, and nothing is saved this session.', { reason: 'game-unreadable', error: 'its copy could not be kept' });
          r.save.game = null;
          writeNow(r.save);
          return loadResult(r.save, false, 'The game in progress could not be read, so it was set aside (a copy is kept on this device). Your stats and settings are fine.', { reason: 'game-unreadable', key: kept });
        }
        if (r.save.game && ECE.Rules && typeof ECE.Rules.check === 'function') {
          try { Save.lastProblems = ECE.Rules.check(r.save.game) || []; } catch (e) { Save.lastProblems = ['check failed: ' + e.message]; }
        }
        return loadResult(r.save, false, null, { reason: m.from < VERSION ? 'migrated' : 'ok', from: m.from });
      }
    }
    var key = keepBroken(raw);
    if (!key) {
      return loadResult(blank(), true, 'Your saved game could not be read. It was left as it is, and nothing is saved this session.', { reason: 'broken', error: why + '; its copy could not be kept' });
    }
    var fresh = blank();
    writeNow(fresh);
    return loadResult(fresh, false, 'Your saved game could not be read, so a new one was started. A copy of the old save is kept on this device.', { reason: 'broken', error: why, key: key });
  }

  function newerStored(cur) {
    if (cur === null) return false;
    var m = /^\s*\{\s*"v"\s*:\s*(\d+)/.exec(cur);
    if (m) return +m[1] > VERSION;
    try { var o = JSON.parse(cur); return isObj(o) && typeof o.v === 'number' && o.v > VERSION && o.app === APP; } catch (e) { return false; }
  }

  function jsonOf(save) {
    var out = { v: VERSION, app: APP, createdAt: save.createdAt, updatedAt: save.updatedAt, build: save.build };
    for (var k in save) if (own(save, k) && !own(out, k) && !badKey(k)) out[k] = save[k];
    return JSON.stringify(out);
  }

  function writeSave(save) {
    if (!isObj(save)) return 'bad';
    if (st.takenOver) return 'conflict';
    if (st.readOnly) return 'read-only';
    var cur = get(KEY);
    if (st.lastText === undefined) st.lastText = cur;
    var other = cur !== null && !sameContent(cur, st.lastText);
    if (newerStored(cur)) st.readOnly = true;
    if (other) { takeOver('write', gameChangedFrom(cur)); return 'conflict'; }
    if (st.readOnly) return 'read-only';
    if (st.replacing.has(save)) {
      if (cur !== null && !put(BACKUP_KEY, cur)) { writeFailed(st.putError); return 'failed'; }
      st.replacing['delete'](save);
    }
    if (st.premigration) {
      if (get(st.premigration.key) === null && !put(st.premigration.key, st.premigration.raw)) { writeFailed(st.putError); return 'failed'; }
      st.premigration = null;
    }
    save.v = VERSION;
    save.app = APP;
    save.updatedAt = clock();
    if (typeof save.createdAt !== 'number' || !isFinite(save.createdAt)) save.createdAt = save.updatedAt;
    save.build = currentBuild();
    var json;
    try { json = jsonOf(save); } catch (e) { writeFailed(e); return 'failed'; }
    if (!put(KEY, json)) { writeFailed(st.putError); return 'failed'; }
    var back = get(KEY);
    st.lastText = back !== null && sameContent(back, json) ? back : json;
    writeWorked();
    return 'ok';
  }
  function writeNow(save) { return writeSave(save) === 'ok'; }

  function cancelTimers() {
    var S = scheduler();
    if (S) {
      if (st.debounce !== null) S.clear(st.debounce);
      if (st.maxWait !== null) S.clear(st.maxWait);
      if (st.retry !== null) S.clear(st.retry);
    }
    st.debounce = null;
    st.maxWait = null;
    st.retry = null;
  }

  function settle(save, code) {
    if (code === 'failed' && !st.takenOver && !st.readOnly) {
      if (!st.pending) st.pending = save;
      var S = scheduler();
      if (S && st.retry === null) st.retry = S.set(function () { st.retry = null; fire(); }, RETRY_MS);
    }
    return code === 'ok';
  }

  function fire() {
    cancelTimers();
    var s = st.pending;
    st.pending = null;
    if (s) settle(s, writeSave(s));
  }

  function schedule(save) {
    if (!isObj(save)) return false;
    if (st.takenOver || st.readOnly) return false;
    st.pending = save;
    var S = scheduler();
    if (!S) { fire(); return true; }
    if (st.debounce !== null) S.clear(st.debounce);
    st.debounce = S.set(fire, DEBOUNCE_MS);
    if (st.maxWait === null) st.maxWait = S.set(fire, MAX_WAIT_MS);
    return true;
  }

  function flush(save) {
    if (isObj(save)) st.pending = save;
    var s = st.pending;
    cancelTimers();
    st.pending = null;
    if (!s) return !st.readOnly && !st.takenOver && !st.errorKind;
    return settle(s, writeSave(s));
  }

  function replace(save) {
    if (!isObj(save)) return false;
    st.pending = null;
    cancelTimers();
    st.replacing.add(save);
    return writeSave(save) === 'ok';
  }

  var CRC_TABLE = null;
  function crc32(bytes) {
    if (!CRC_TABLE) {
      CRC_TABLE = [];
      for (var n = 0; n < 256; n++) {
        var c = n;
        for (var k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
        CRC_TABLE[n] = c >>> 0;
      }
    }
    var crc = 0xffffffff;
    for (var i = 0; i < bytes.length; i++) crc = CRC_TABLE[(crc ^ bytes[i]) & 0xff] ^ (crc >>> 8);
    return (crc ^ 0xffffffff) >>> 0;
  }
  function hex8(n) { var s = (n >>> 0).toString(16); while (s.length < 8) s = '0' + s; return s; }

  function utf8Encode(str) {
    var out = [];
    for (var i = 0; i < str.length; i++) {
      var c = str.charCodeAt(i);
      if (c >= 0xd800 && c <= 0xdbff && i + 1 < str.length) {
        var d = str.charCodeAt(i + 1);
        if (d >= 0xdc00 && d <= 0xdfff) { c = 0x10000 + ((c - 0xd800) << 10) + (d - 0xdc00); i++; } else c = 0xfffd;
      } else if (c >= 0xd800 && c <= 0xdfff) c = 0xfffd;
      if (c < 0x80) out.push(c);
      else if (c < 0x800) out.push(0xc0 | (c >> 6), 0x80 | (c & 63));
      else if (c < 0x10000) out.push(0xe0 | (c >> 12), 0x80 | ((c >> 6) & 63), 0x80 | (c & 63));
      else out.push(0xf0 | (c >> 18), 0x80 | ((c >> 12) & 63), 0x80 | ((c >> 6) & 63), 0x80 | (c & 63));
    }
    return out;
  }
  function utf8Decode(b) {
    var out = '', chunk = [];
    for (var i = 0; i < b.length;) {
      var c = b[i], cp, need;
      if (c < 0x80) { cp = c; need = 0; } else if (c >= 0xc2 && c <= 0xdf) { cp = c & 31; need = 1; } else if (c >= 0xe0 && c <= 0xef) { cp = c & 15; need = 2; } else if (c >= 0xf0 && c <= 0xf4) { cp = c & 7; need = 3; } else return null;
      if (i + need >= b.length + (need ? 0 : 1)) return null;
      for (var k = 1; k <= need; k++) { var x = b[i + k]; if ((x & 0xc0) !== 0x80) return null; cp = (cp << 6) | (x & 63); }
      if ((need === 2 && cp < 0x800) || (need === 3 && (cp < 0x10000 || cp > 0x10ffff)) || (cp >= 0xd800 && cp <= 0xdfff)) return null;
      i += need + 1;
      if (cp >= 0x10000) { cp -= 0x10000; chunk.push(0xd800 + (cp >> 10), 0xdc00 + (cp & 1023)); } else chunk.push(cp);
      if (chunk.length >= 4096) { out += String.fromCharCode.apply(null, chunk); chunk = []; }
    }
    return out + String.fromCharCode.apply(null, chunk);
  }

  var B64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
  var B64_INDEX = null;
  function b64urlEncode(bytes) {
    var out = [], i;
    for (i = 0; i + 2 < bytes.length; i += 3) {
      var n = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
      out.push(B64[n >> 18], B64[(n >> 12) & 63], B64[(n >> 6) & 63], B64[n & 63]);
    }
    var rest = bytes.length - i;
    if (rest === 1) { var a = bytes[i] << 16; out.push(B64[a >> 18], B64[(a >> 12) & 63]); }
    if (rest === 2) { var b = (bytes[i] << 16) | (bytes[i + 1] << 8); out.push(B64[b >> 18], B64[(b >> 12) & 63], B64[(b >> 6) & 63]); }
    return out.join('');
  }
  function b64urlDecode(s) {
    if (!B64_INDEX) { B64_INDEX = {}; for (var j = 0; j < 64; j++) B64_INDEX[B64[j]] = j; }
    if (s.length % 4 === 1) return null;
    var out = [], acc = 0, bits = 0;
    for (var i = 0; i < s.length; i++) {
      var v = B64_INDEX[s[i]];
      if (v === undefined) return null;
      acc = ((acc << 6) | v) & 0xffffff;
      bits += 6;
      if (bits >= 8) { bits -= 8; out.push((acc >> bits) & 255); }
    }
    return out;
  }

  function exportCode(save) {
    var s = isObj(save) ? save : blank();
    var bytes = utf8Encode(jsonOf(s));
    return CODE_PREFIX + b64urlEncode(bytes) + '-' + hex8(crc32(bytes));
  }

  function plural(n, one, many) { return n + ' ' + (n === 1 ? one : many); }

  function summary(save) {
    var s = isObj(save) ? save : {};
    var stats = isObj(s.stats) ? s.stats : {};
    var g = isObj(s.game) ? s.game : null;
    var played = typeof stats.played === 'number' ? stats.played : 0;
    var won = typeof stats.won === 'number' ? stats.won : 0;
    var you = null;
    if (g && Array.isArray(g.players)) for (var i = 0; i < g.players.length; i++) if (isObj(g.players[i]) && g.players[i].kind === 'human') { you = g.players[i]; break; }
    var round = g && typeof g.round === 'number' ? g.round : 0;
    var over = !!(g && g.phase === 'over');
    var text = (played ? plural(played, 'game', 'games') + ' played, ' + won + ' won.' : 'No games played yet.')
      + (g && !over ? ' A game in progress: round ' + round + (you && typeof you.cash === 'number' ? ', you have ' + (ECE.Util ? ECE.Util.money(you.cash) : '$' + you.cash) : '') + '.' : ' No game in progress.');
    return {
      played: played, won: won, inProgress: !!g && !over, round: round,
      players: g && Array.isArray(g.players) ? g.players.length : 0,
      name: isObj(s.setup) && typeof s.setup.name === 'string' ? s.setup.name : '',
      cash: you && typeof you.cash === 'number' ? you.cash : 0,
      updatedAt: typeof s.updatedAt === 'number' ? s.updatedAt : 0,
      text: text
    };
  }

  function reseed(g, now) {
    var R = ECE.Rng;
    if (!isObj(g) || g.phase === 'over' || !R || typeof R.hash !== 'function') return g;
    if (!isObj(g.rng)) g.rng = { s: 0 };
    var s0 = typeof g.rng.s === 'number' && isFinite(g.rng.s) ? g.rng.s : 0;
    g.rng.s = R.hash(s0, typeof now === 'number' && isFinite(now) ? now : 0) >>> 0;
    if (!isObj(g.decks) || typeof R.shuffle !== 'function' || typeof R.create !== 'function') return g;
    for (var i = 0; i < DECK_IDS.length; i++) {
      var dk = g.decks[DECK_IDS[i]];
      if (!isObj(dk) || !Array.isArray(dk.order)) continue;
      var next = int(dk.next, 0, dk.order.length, 0);
      if (dk.order.length - next < 2) continue;
      var rest = dk.order.slice(next);
      R.shuffle(R.create(R.hash(g.rng.s, DECK_IDS[i])), rest);
      dk.order = dk.order.slice(0, next).concat(rest);
    }
    return g;
  }

  function fail(error, detail) { return { ok: false, save: null, summary: null, error: error, detail: detail || null }; }

  function importCode(text) {
    try {
      if (typeof text !== 'string') return fail('Paste a save code first.');
      if (text.length > MAX_CODE * 2) return fail('That save code is too large (more than 2 MB).');
      var code = text.replace(/\s+/g, '');
      if (!code) return fail('Paste a save code first.');
      if (code.length > MAX_CODE) return fail('That save code is too large (more than 2 MB).');
      var m = /^ECE(\d+)-([A-Za-z0-9_-]*)-([0-9A-Fa-f]{8})$/.exec(code);
      if (!m) {
        if (/^ECE\d+-/.test(code)) return fail('That save code is cut off or damaged. Copy it again, all of it.');
        return fail('That is not a save code of ' + gameName() + '.');
      }
      if (m[1] !== '1') return fail('That save code is from a newer version of ' + gameName() + '. Update the game first.');
      var bytes = b64urlDecode(m[2]);
      if (!bytes) return fail('That save code is damaged. Copy it again, all of it.');
      if (hex8(crc32(bytes)) !== m[3].toLowerCase()) return fail('That save code is damaged (its check digits do not match). Copy it again, all of it.');
      var json = utf8Decode(bytes);
      if (json === null) return fail('That save code is damaged. Copy it again, all of it.');
      var obj;
      try { obj = JSON.parse(json); } catch (e) { return fail('That save code is damaged. Copy it again, all of it.'); }
      if (!isObj(obj)) return fail('That is not a save code of ' + gameName() + '.');
      if (obj.app !== APP) return fail('That save code is for another game.');
      var mg = migrate(obj);
      if (!mg.ok) return fail(mg.newer ? 'That save code is from a newer version of ' + gameName() + '. Update the game first.' : 'That save code could not be read.', mg.error);
      var s = normalize(mg.save, true).save;
      var g = cleanGame(mg.save.game);
      if (g === undefined) return fail('The game in progress in that save code is damaged, so it cannot be loaded.', 'the game is not a rules state');
      if (g) reseed(g, clock());
      s.game = g;
      if (g && ECE.Rules && typeof ECE.Rules.check === 'function') {
        var problems;
        try { problems = ECE.Rules.check(g); } catch (e) { problems = ['the check failed: ' + ((e && e.message) || e)]; }
        if (problems && problems.length) {
          Save.lastProblems = problems;
          return fail('The game in progress in that save code is damaged, so it cannot be loaded.', 'ECE.Rules.check: ' + String(problems[0]).slice(0, 200) + (problems.length > 1 ? ' (+' + (problems.length - 1) + ' more)' : ''));
        }
      }
      st.replacing.add(s);
      return { ok: true, save: s, summary: summary(s), error: null, detail: null };
    } catch (e) {
      return fail('That save code could not be read.', String((e && e.message) || e).slice(0, 200));
    }
  }

  function useStorage(adapter) {
    cancelTimers();
    st.pending = null;
    st.readOnly = false;
    st.storageNotice = null;
    st.premigration = null;
    st.replacing = makeSet();
    st.lastText = undefined;
    st.takenOver = false;
    st.takenHow = null;
    st.takenGameChanged = true;
    st.errorKind = null;
    st.errorText = null;
    st.putError = null;
    st.readError = null;
    for (var i = 0; i < st.errorCbs.length; i++) st.errorCbs[i].told = {};
    for (var j = 0; j < st.conflictCbs.length; j++) st.conflictCbs[j].told = false;
    hooks.storage = adapter || null;
    hooks.kind = adapter ? 'custom' : '';
  }
  function useScheduler(s) {
    cancelTimers();
    var before = scheduler();
    if (st.notifyTimer !== null && before) { try { before.clear(st.notifyTimer); } catch (e) { } }
    st.notifyTimer = null;
    hooks.scheduler = s && typeof s.set === 'function' && typeof s.clear === 'function' ? s : null;
    if (st.pending) { var p = st.pending; st.pending = null; schedule(p); }
  }
  function useClock(fn) { hooks.clock = typeof fn === 'function' ? fn : null; }
  function status() {
    store();
    return {
      storage: hooks.kind || 'local', takenOver: st.takenOver, readOnly: st.readOnly, pending: !!st.pending,
      lastError: st.errorKind, lastErrorText: st.errorText
    };
  }

  var Save = {
    VERSION: VERSION,
    APP: APP,
    PREFIX: PREFIX,
    KEY: KEY,
    BACKUP_KEY: BACKUP_KEY,
    BROKEN_PREFIX: BROKEN_PREFIX,
    PREMIGRATION_PREFIX: PREMIGRATION_PREFIX,
    CODE_PREFIX: CODE_PREFIX,
    MAX_CODE: MAX_CODE,
    NAME_MAX: NAME_MAX,
    HISTORY_MAX: HISTORY_MAX,
    DEBOUNCE_MS: DEBOUNCE_MS,
    MAX_WAIT_MS: MAX_WAIT_MS,
    RETRY_MS: RETRY_MS,
    lastLoad: null,
    lastRepairs: [],
    lastProblems: [],
    blank: blank,
    load: load,
    schedule: schedule,
    flush: flush,
    replace: replace,
    exportCode: exportCode,
    importCode: importCode,
    migrate: migrate,
    summary: summary,
    onConflict: onConflict,
    onError: onError,
    cleanName: function (v, def) { return cleanStr(v, NAME_MAX, typeof def === 'string' ? def : SETUP.name); },
    useStorage: useStorage,
    useScheduler: useScheduler,
    useClock: useClock,
    status: status,
    _onStorageEvent: onStorageEvent,
    _sameContent: sameContent,
    _errorKind: errorKind,
    _crc32: crc32,
    _utf8Encode: utf8Encode,
    _utf8Decode: utf8Decode,
    _b64urlEncode: b64urlEncode,
    _b64urlDecode: b64urlDecode,
    _cleanGame: cleanGame,
    _reseed: reseed
  };
  ECE.Save = Save;
})(window.ECE = window.ECE || {});
;
(function (ECE) {
  'use strict';

  var W = window;
  var MSG_SKIP = 'emeraldcityestates-skip-waiting';
  var MSG_READY = 'emeraldcityestates-update-ready';
  var TITLE = 'Keep your progress safe';
  var SPARE = 'Settings > Copy save code keeps a spare copy.';

  var APPLY_WAIT_MS = 8000;

  var st = {
    promise: null, reg: null, waiting: null, build: '', notified: null, callbacks: [],
    applying: false, applyTimer: null, hadController: false, switchedElsewhere: false
  };

  function nav() { return (W && W.navigator) || null; }
  function container() { var n = nav(); return n && n.serviceWorker && typeof n.serviceWorker.register === 'function' ? n.serviceWorker : null; }
  function webPage() {
    var loc = W && W.location;
    return !!loc && (loc.protocol === 'https:' || loc.protocol === 'http:');
  }
  function warn(msg) { try { if (W.console && W.console.warn) W.console.warn('[pwa] ' + msg); } catch (e) { } }
  function gameName() { var G = ECE.Glossary; return (G && G.game && G.game.name) || 'Emerald City Estates'; }

  function info() { return { build: st.build || '' }; }

  function announce(key) {
    if (st.notified === key) return;
    st.notified = key;
    var list = st.callbacks.slice();
    for (var i = 0; i < list.length; i++) {
      try { list[i](info()); } catch (e) { warn('an update listener failed: ' + ((e && e.message) || e)); }
    }
  }

  function waitingFound(worker) {
    var sw = container();
    if (!worker || !sw || !sw.controller) return;
    st.waiting = worker;
    announce(worker);
  }

  function track(worker) {
    if (!worker || typeof worker.addEventListener !== 'function') return;
    worker.addEventListener('statechange', function () {
      if (worker.state === 'installed') waitingFound(worker);
    });
  }

  function watch(reg) {
    if (reg.waiting) waitingFound(reg.waiting);
    if (reg.installing) track(reg.installing);
    if (typeof reg.addEventListener === 'function') {
      reg.addEventListener('updatefound', function () { track(reg.installing); });
    }
  }

  function onMessage(e) {
    var d = e && e.data;
    if (!d || d.type !== MSG_READY) return;
    if (typeof d.build === 'string') st.build = d.build.slice(0, 40);
    if (st.reg && st.reg.waiting) waitingFound(st.reg.waiting);
    else if (st.reg && st.reg.installing) track(st.reg.installing);
  }

  function onControllerChange() {
    if (st.applying) {
      st.applying = false;
      if (st.applyTimer !== null) { try { W.clearTimeout(st.applyTimer); } catch (e) { } st.applyTimer = null; }
      reload();
      return;
    }
    if (st.hadController) {
      st.switchedElsewhere = true;
      st.waiting = null;
      announce('elsewhere');
    }
    st.hadController = true;
  }

  function reload() {
    try { W.location.reload(); } catch (e) { warn('could not reload: ' + ((e && e.message) || e)); }
  }

  function usable() { return !!(ECE.BUILD && webPage() && container() && typeof Promise === 'function'); }

  function adopt(reg) {
    if (!reg || typeof reg !== 'object') return st.reg;
    if (st.reg !== reg) {
      st.reg = reg;
      watch(reg);
    }
    return st.reg;
  }

  function existing() {
    if (st.reg) return Promise.resolve(st.reg);
    var sw = container();
    if (!usable() || typeof sw.getRegistration !== 'function') return Promise.resolve(null);
    try {
      return Promise.resolve(sw.getRegistration()).then(function (reg) { return adopt(reg) || null; }, function () { return null; });
    } catch (e) { return Promise.resolve(null); }
  }

  function register() {
    if (st.promise) return st.promise;
    var sw = container();
    if (!usable()) {
      st.promise = typeof Promise === 'function' ? Promise.resolve(null) : null;
      return st.promise;
    }
    var failed = function (e) {
      return existing().then(function (reg) {
        warn((reg ? 'could not register again (the offline copy stays): ' : 'no offline copy: ') + ((e && e.message) || e));
        return reg;
      });
    };
    try {
      st.hadController = !!sw.controller;
      sw.addEventListener('controllerchange', onControllerChange);
      sw.addEventListener('message', onMessage);
      st.promise = Promise.resolve(sw.register('sw.js', { scope: './', updateViaCache: 'none' })).then(function (reg) {
        if (reg) return adopt(reg);
        return existing();
      }, failed);
    } catch (e) {
      st.promise = failed(e);
    }
    return st.promise;
  }

  function onUpdate(cb) {
    if (typeof cb !== 'function') return;
    st.callbacks.push(cb);
    if (st.notified !== null && typeof Promise === 'function') {
      Promise.resolve().then(function () {
        try { cb(info()); } catch (e) { warn('an update listener failed: ' + ((e && e.message) || e)); }
      });
    }
  }

  function gone(w) { return !!w && (w.state === 'activating' || w.state === 'activated' || w.state === 'redundant'); }

  function applyUpdate() {
    var w = st.reg && st.reg.waiting;
    if (!w && st.waiting && !gone(st.waiting)) w = st.waiting;
    if (w && typeof w.postMessage === 'function') {
      st.applying = true;
      try { w.postMessage({ type: MSG_SKIP }); } catch (e) { st.applying = false; warn('could not switch: ' + ((e && e.message) || e)); return false; }
      if (st.applyTimer === null && W && typeof W.setTimeout === 'function') {
        st.applyTimer = W.setTimeout(function () {
          st.applyTimer = null;
          if (st.applying) { st.applying = false; reload(); }
        }, APPLY_WAIT_MS);
      }
      return true;
    }
    if (st.switchedElsewhere || gone(st.waiting)) { st.waiting = null; reload(); return true; }
    return false;
  }

  function check() {
    if (typeof Promise !== 'function') return null;
    return existing().then(function (reg) {
      if (!reg || typeof reg.update !== 'function') return false;
      try {
        return Promise.resolve(reg.update()).then(function () { return true; }, function () { return false; });
      } catch (e) { return false; }
    });
  }

  function isStandalone() { return !!(ECE.Util && ECE.Util.browser().standalone); }

  function keepTip(b) {
    var given = !!b && typeof b === 'object';
    if (!given) {
      if (!webPage() || !ECE.Util) return null;
      b = ECE.Util.browser();
    }
    if (!b || b.standalone) return null;
    var name = gameName();
    var weekLine = function (who) { return who + ' can remove a tab’s save after 7 days without a visit.'; };
    if (b.os === 'ios') {
      return { id: 'ios', title: TITLE, lines: [
        'Add ' + name + ' to your Home Screen: Share > Add to Home Screen.',
        weekLine(b.name === 'safari' ? 'Safari' : 'This browser'),
        'The Home Screen app keeps its own save: move this one there with Settings > Copy save code, then Import it in the app.'
      ] };
    }
    if (b.os === 'android' && (b.name === 'chrome' || b.name === 'edge')) {
      return { id: 'android', title: TITLE, lines: [
        'Install ' + name + ': Menu > Install app.',
        'Your progress stays in this browser. ' + SPARE
      ] };
    }
    if (b.name === 'firefox') {
      return { id: 'firefox', title: TITLE, lines: [
        'Your progress stays in this browser; keep this page bookmarked.',
        SPARE
      ] };
    }
    if (b.os === 'mac' && b.name === 'safari' && b.version >= 17) {
      return { id: 'mac', title: TITLE, lines: [
        'Add ' + name + ' to your Dock: File > Add to Dock.',
        weekLine('Safari'),
        'The Dock app keeps its own save: move this one there with Settings > Copy save code, then Import it in the app.'
      ] };
    }
    if ((b.name === 'chrome' || b.name === 'edge') && b.os !== 'android') {
      return { id: 'desktop', title: TITLE, lines: [
        'Install ' + name + ' with the Install button in the address bar.',
        'Your progress stays in this browser. ' + SPARE
      ] };
    }
    var lines = ['Your progress stays in this browser; keep this page bookmarked.'];
    if (b.name === 'safari') lines.push(weekLine('Safari'));
    lines.push(SPARE);
    return { id: 'bookmark', title: TITLE, lines: lines };
  }

  function status() {
    var sw = container();
    return {
      supported: !!sw,
      registered: !!st.reg,
      controlled: !!(sw && sw.controller),
      waiting: !!((st.reg && st.reg.waiting) || (st.waiting && !gone(st.waiting))),
      updateReady: st.notified !== null
    };
  }

  ECE.Pwa = {
    MSG_SKIP: MSG_SKIP,
    MSG_READY: MSG_READY,
    register: register,
    onUpdate: onUpdate,
    applyUpdate: applyUpdate,
    check: check,
    isStandalone: isStandalone,
    keepTip: keepTip,
    status: status
  };
})(window.ECE = window.ECE || {});
;
(function (ECE) {
  'use strict';

  var SVGNS = 'http://www.w3.org/2000/svg';
  var Dom = {};
  ECE.Dom = Dom;

  Dom.report = function (err, where) {
    try {
      if (ECE.App && typeof ECE.App.report === 'function') { ECE.App.report(err, where); return; }
    } catch (e) { }
    try { console.error('[ece]', where || '', err); } catch (e2) { }
  };

  Dom.safe = function (fn, where, fallback) {
    return function () {
      try { return fn.apply(this, arguments); } catch (e) { Dom.report(e, where || 'ui'); return fallback; }
    };
  };

  Dom.on = function (el, type, fn, opts) {
    if (!el || !el.addEventListener) return fn;
    var w = Dom.safe(fn, type);
    el.addEventListener(type, w, opts || false);
    return w;
  };

  Dom.typo = function (s) {
    s = String(s === null || s === undefined ? '' : s);
    if (s.indexOf("'") < 0 && s.indexOf('"') < 0) return s;
    return s
      .replace(/([A-Za-z0-9])'(?=[A-Za-z])/g, '$1\u2019')
      .replace(/([sS])'(?=[\s.,;:!?)]|$)/g, '$1\u2019')
      .replace(/(^|[\s(\[\u2014-])'(?=\S)/g, '$1\u2018')
      .replace(/'/g, '\u2019')
      .replace(/(^|[\s(\[\u2014-])"(?=\S)/g, '$1\u201C')
      .replace(/"/g, '\u201D');
  };

  function append(el, kids) {
    if (kids === null || kids === undefined || kids === false) return;
    if (Array.isArray(kids)) { for (var i = 0; i < kids.length; i++) append(el, kids[i]); return; }
    if (typeof kids === 'string' || typeof kids === 'number') { el.appendChild(document.createTextNode(Dom.typo(kids))); return; }
    if (kids.nodeType) el.appendChild(kids);
  }
  Dom.append = append;

  function applyProps(el, p, isSvg) {
    for (var k in p) {
      if (!Object.prototype.hasOwnProperty.call(p, k)) continue;
      var v = p[k];
      if (v === null || v === undefined || v === false) continue;
      if (k === 'cls' || k === 'class') {
        if (isSvg) el.setAttribute('class', String(v)); else el.className = String(v);
      } else if (k === 'text') el.textContent = Dom.typo(v);
      else if (k === 'on') { for (var ev in v) if (v[ev]) Dom.on(el, ev, v[ev]); }
      else if (k === 'style') { for (var sp in v) if (v[sp] !== null && v[sp] !== undefined) el.style[sp] = v[sp]; }
      else if (k === 'data') { for (var dk in v) if (v[dk] !== null && v[dk] !== undefined) el.dataset[dk] = String(v[dk]); }
      else if (k === 'hidden') el.hidden = !!v;
      else if (k === 'disabled') el.disabled = !!v;
      else if (k === 'value') el.value = String(v);
      else if (k === 'checked') el.checked = !!v;
      else if (k === 'selected') el.selected = !!v;
      else if (k === 'style-attr' || k.toLowerCase() === 'style') { }
      else el.setAttribute(k, v === true ? '' : String(v));
    }
  }

  Dom.h = function (tag, props, kids) {
    var el = document.createElement(tag);
    if (props) applyProps(el, props, false);
    append(el, kids);
    return el;
  };

  Dom.s = function (tag, attrs, kids) {
    var el = document.createElementNS(SVGNS, tag);
    if (attrs) applyProps(el, attrs, true);
    append(el, kids);
    return el;
  };

  Dom.clear = function (el) {
    if (!el) return el;
    while (el.firstChild) el.removeChild(el.firstChild);
    return el;
  };

  Dom.text = function (el, s) {
    s = Dom.typo(s === null || s === undefined ? '' : String(s));
    if (el && el.textContent !== s) el.textContent = s;
    return el;
  };

  Dom.toggle = function (el, cls, on) {
    if (el && el.classList.contains(cls) !== !!on) el.classList.toggle(cls, !!on);
  };

  Dom.btn = function (label, fn, opts) {
    opts = opts || {};
    var cls = 'ui-btn' + (opts.primary ? ' ui-btn-primary' : '') + (opts.ghost ? ' ui-btn-ghost' : '') +
      (opts.small ? ' ui-btn-small' : '') + (opts.danger ? ' ui-btn-danger' : '') + (opts.cls ? ' ' + opts.cls : '');
    var b = Dom.h('button', { type: 'button', cls: cls, disabled: !!opts.disabled, 'aria-label': opts.aria || null,
      data: opts.data || null, 'aria-pressed': opts.pressed === undefined ? null : String(!!opts.pressed) }, label);
    if (fn) Dom.on(b, 'click', function (ev) { if (!b.disabled) fn(ev); });
    return b;
  };

  Dom.share = function (x) { x = Number(x); return x === 0.5 ? 'half' : Math.round(x * 100) + '%'; };
  Dom.payOffStep = function () {
    var Bd = ECE.BoardData;
    if (!Bd || !Bd.SPACES || typeof Bd.unmortgageCost !== 'function') return 0;
    var extra = (Bd.RULES && Bd.RULES.unmortgageExtra) || 0;
    var steps = [1, 5, 10];
    for (var k = 0; k < steps.length; k++) {
      var st = steps[k], all = true, any = false;
      for (var i = 0; i < Bd.SPACES.length && all; i++) {
        if (!(Bd.SPACES[i].price > 0)) continue;
        any = true;
        var m = Bd.mortgageValue(i), want = Math.ceil(Math.round(m * (1 + extra) * 100) / (st * 100)) * st;
        if (Bd.unmortgageCost(i) !== want) all = false;
      }
      if (all && any) return st;
    }
    return 0;
  };

  Dom.money = function (n) {
    if (ECE.Util && typeof ECE.Util.money === 'function') {
      try { return ECE.Util.money(n); } catch (e) { }
    }
    n = Math.round(Number(n) || 0);
    var neg = n < 0;
    var s = String(Math.abs(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return (neg ? '-$' : '$') + s;
  };

  Dom.ordinal = function (n) {
    if (ECE.Util && typeof ECE.Util.ordinal === 'function') {
      try { return ECE.Util.ordinal(n); } catch (e) { }
    }
    n = n | 0;
    var m100 = n % 100, m10 = n % 10;
    var suf = (m100 >= 11 && m100 <= 13) ? 'th' : m10 === 1 ? 'st' : m10 === 2 ? 'nd' : m10 === 3 ? 'rd' : 'th';
    return n + suf;
  };

  Dom.player = function (state, id) {
    if (!state || !state.players) return null;
    for (var i = 0; i < state.players.length; i++) if (state.players[i].id === id) return state.players[i];
    return null;
  };

  Dom.space = function (i) {
    var B = ECE.BoardData;
    return B && B.SPACES ? B.SPACES[i] || null : null;
  };

  Dom.spaceName = function (i) {
    var s = Dom.space(i);
    return s ? s.name : 'space ' + i;
  };

  Dom.tagColors = function (color) {
    if (ECE.Art && typeof ECE.Art.tagColors === 'function') { try { return ECE.Art.tagColors(color); } catch (e) { } }
    return { fill: color, text: '#FFFFFF' };
  };

  Dom.tag = function (districtId, extraCls) {
    var d = ECE.BoardData && ECE.BoardData.district(districtId);
    var el = Dom.h('span', { cls: 'ui-tag' + (extraCls ? ' ' + extraCls : ''), 'aria-hidden': 'true' }, d ? d.tag : '');
    if (d) { var tc = Dom.tagColors(d.color); el.style.backgroundColor = tc.fill; el.style.color = tc.text; }
    return el;
  };

  Dom.spaceIcon = function (i) {
    var s = Dom.space(i);
    if (!s) return null;
    switch (s.kind) {
      case 'transit': return s.mode === 'ferry' ? 'ferry' : s.mode === 'bus' ? 'bus' : 'train';
      case 'utility': return /dam|power/i.test(s.name) ? 'dam' : 'drop';
      case 'tax': return /toll/i.test(s.name) ? 'toll' : 'tax';
      case 'card': return s.deck === 'rain' ? 'rain' : 'buzz';
      default: return null;
    }
  };

  Dom.spaceBadge = function (i) {
    var s = Dom.space(i);
    if (!s) return null;
    if (s.kind === 'street') return Dom.tag(s.district);
    var name = Dom.spaceIcon(i);
    if (!name) return null;
    var wrap = Dom.h('span', { cls: 'ui-tag ui-tag-icon ui-tag-' + s.kind, 'aria-hidden': 'true' });
    var svg = Dom.s('svg', { viewBox: '0 0 24 24', width: 22, height: 22, focusable: 'false' });
    if (ECE.Art && typeof ECE.Art.icon === 'function') { try { ECE.Art.icon(svg, name, 12, 12, 24); } catch (e) { Dom.report(e, 'art.icon'); } }
    wrap.appendChild(svg);
    return wrap;
  };

  Dom.tokenName = function (id) {
    var list = (ECE.Glossary && ECE.Glossary.tokens) || [];
    for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i].name;
    return id || '';
  };

  function artToken(id, size, color) {
    var A = ECE.Art;
    if (!A) return null;
    var tries = ['tokenIcon', 'tokenSvg', 'tokenGlyph', 'token', 'glyph'];
    for (var i = 0; i < tries.length; i++) {
      var f = A[tries[i]];
      if (typeof f !== 'function') continue;
      try {
        var el = f.call(A, id, { size: size, color: color, standalone: true });
        if (el && el.nodeType) return el;
      } catch (e) { }
    }
    return null;
  }

  var FALLBACK = {
    ferry: [['M5 14h14l-2 4H7z', 'f'], ['M8 10h8v3H8z', 'f'], ['M11 7h2v3h-2z', 'f']],
    coffee: [['M7 9h9v6a3 3 0 0 1-3 3h-3a3 3 0 0 1-3-3z', 'f'], ['M16 10.5h1a2 2 0 0 1 0 4h-1', 's'], ['M9.5 5c0 1 1 1 1 2M12.5 5c0 1 1 1 1 2', 's']],
    salmon: [['M4 12c3-4 9-5 13-1l3-2v6l-3-2c-4 4-10 3-13-1z', 'f']],
    umbrella: [['M4 12a8 8 0 0 1 16 0z', 'f'], ['M12 12v5a1.6 1.6 0 0 1-3.2 0', 's']],
    evergreen: [['M12 4l5 7h-3l4 5h-5v3h-2v-3H6l4-5H7z', 'f']],
    orca: [['M4 13c2-5 9-6 13-3 1-2 2-3 3-3-1 2-1 3 0 5-1 0-2 0-3-1-3 4-10 5-13 2z', 'f']],
    bicycle: [['M4 15a3 3 0 1 0 6 0a3 3 0 1 0-6 0', 's'], ['M14 15a3 3 0 1 0 6 0a3 3 0 1 0-6 0', 's'], ['M7 15l3-6h5l2 6M10 9l2 6', 's']],
    seaplane: [['M3 11h18v2H3z', 'f'], ['M10 7h3l1 4h-5z', 'f'], ['M5 16h14v1.5H5z', 'f'], ['M9 13v3M15 13v3', 's']]
  };

  Dom.token = function (id, color, px) {
    px = px || 24;
    var wrap = Dom.h('span', { cls: 'ui-token', 'aria-hidden': 'true' });
    wrap.style.width = px + 'px';
    wrap.style.height = px + 'px';
    var art = artToken(id, px, color);
    if (art) {
      wrap.appendChild(art);
      wrap.classList.add('ui-token-art');
      return wrap;
    }
    var svg = Dom.s('svg', { viewBox: '0 0 24 24', width: px, height: px, focusable: 'false' });
    svg.appendChild(Dom.s('circle', { cx: 12, cy: 12, r: 11.5, fill: color || '#2E6F95' }));
    var parts = FALLBACK[id] || FALLBACK.ferry;
    for (var i = 0; i < parts.length; i++) {
      var stroked = parts[i][1] === 's';
      svg.appendChild(Dom.s('path', { d: parts[i][0], fill: stroked ? 'none' : '#fff', stroke: stroked ? '#fff' : 'none',
        'stroke-width': stroked ? 1.6 : null, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }));
    }
    wrap.appendChild(svg);
    return wrap;
  };

  var PIPS = { 1: [[12, 12]], 2: [[7, 7], [17, 17]], 3: [[7, 7], [12, 12], [17, 17]], 4: [[7, 7], [17, 7], [7, 17], [17, 17]],
    5: [[7, 7], [17, 7], [12, 12], [7, 17], [17, 17]], 6: [[7, 6.5], [17, 6.5], [7, 12], [17, 12], [7, 17.5], [17, 17.5]] };

  Dom.die = function (n, px, cls) {
    px = px || 26;
    var svg = Dom.s('svg', { viewBox: '0 0 24 24', width: px, height: px, cls: 'ui-die' + (cls ? ' ' + cls : ''), focusable: 'false', 'aria-hidden': 'true' });
    svg.appendChild(Dom.s('rect', { x: 1, y: 1, width: 22, height: 22, rx: 5, fill: '#fff', stroke: '#1D2A30', 'stroke-width': 1.4 }));
    var p = PIPS[n] || [];
    for (var i = 0; i < p.length; i++) svg.appendChild(Dom.s('circle', { cx: p[i][0], cy: p[i][1], r: 2.1, fill: '#1D2A30' }));
    return svg;
  };

  var ICONS = {
    menu: ['M4 7h16M4 12h16M4 17h16'],
    zoom: ['M10.5 4.5a6 6 0 1 1 0 12a6 6 0 0 1 0-12z', 'M15 15l5 5', 'M8 10.5h5M10.5 8v5'],
    unzoom: ['M10.5 4.5a6 6 0 1 1 0 12a6 6 0 0 1 0-12z', 'M15 15l5 5', 'M8 10.5h5'],
    close: ['M6 6l12 12M18 6L6 18'],
    back: ['M15 5l-7 7 7 7'],
    log: ['M5 6h14M5 10h14M5 14h10M5 18h7'],
    sound: ['M4 10h4l5-4v12l-5-4H4z', 'M16 9a4 4 0 0 1 0 6'],
    trade: ['M5 9h12l-3-3M19 15H7l3 3'],
    build: ['M4 12l8-7 8 7', 'M7 10v9h10v-9', 'M10 19v-5h4v5']
  };
  Dom.icon = function (name, px) {
    px = px || 22;
    var svg = Dom.s('svg', { viewBox: '0 0 24 24', width: px, height: px, cls: 'ui-icon', focusable: 'false', 'aria-hidden': 'true' });
    var list = ICONS[name] || [];
    for (var i = 0; i < list.length; i++) {
      svg.appendChild(Dom.s('path', { d: list[i], fill: 'none', stroke: 'currentColor', 'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }));
    }
    return svg;
  };

  Dom.levelGlyphs = function (level, mortgaged) {
    var wrap = Dom.h('span', { cls: 'ui-levels', 'aria-hidden': 'true' });
    if (mortgaged) { wrap.appendChild(Dom.h('span', { cls: 'ui-mort' }, 'M')); return wrap; }
    if (level >= 5) {
      var t = Dom.s('svg', { viewBox: '0 0 12 16', width: 11, height: 15, cls: 'ui-tower' });
      t.appendChild(Dom.s('path', { d: 'M3 15V4l3-3 3 3v11z', fill: '#3D5A80', stroke: '#22344d', 'stroke-width': 1 }));
      t.appendChild(Dom.s('path', { d: 'M5 6h2M5 9h2M5 12h2', stroke: '#cfe0f5', 'stroke-width': 1 }));
      wrap.appendChild(t);
      return wrap;
    }
    for (var i = 0; i < level; i++) {
      var hsv = Dom.s('svg', { viewBox: '0 0 12 12', width: 11, height: 11, cls: 'ui-house' });
      hsv.appendChild(Dom.s('path', { d: 'M1.5 6L6 1.8 10.5 6v4.7h-9z', fill: '#fff', stroke: '#8A5A3B', 'stroke-width': 1.2, 'stroke-linejoin': 'round' }));
      wrap.appendChild(hsv);
    }
    return wrap;
  };

  var FOCUSABLE = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
  Dom.focusables = function (root) {
    if (!root) return [];
    var list = root.querySelectorAll(FOCUSABLE), out = [];
    for (var i = 0; i < list.length; i++) {
      var e = list[i];
      if (e.offsetParent !== null || e === document.activeElement) out.push(e);
    }
    return out;
  };
  Dom.trapTab = function (root, ev) {
    if (ev.key !== 'Tab') return;
    var f = Dom.focusables(root);
    if (!f.length) { ev.preventDefault(); return; }
    var first = f[0], last = f[f.length - 1], a = document.activeElement;
    if (ev.shiftKey && (a === first || !root.contains(a))) { ev.preventDefault(); last.focus(); }
    else if (!ev.shiftKey && (a === last || !root.contains(a))) { ev.preventDefault(); first.focus(); }
  };
  var focusHow = typeof WeakMap === 'function' ? new WeakMap() : null;
  var lastInput = 'keyboard';
  Dom.trackFocus = function () {
    if (Dom.tracking || typeof document === 'undefined' || !document.addEventListener) return;
    Dom.tracking = true;
    var pointer = function () { lastInput = 'pointer'; };
    document.addEventListener('pointerdown', pointer, true);
    document.addEventListener('mousedown', pointer, true);
    document.addEventListener('touchstart', pointer, { capture: true, passive: true });
    document.addEventListener('keydown', function (ev) { if (ev.key === 'Tab' || /^Arrow/.test(ev.key || '')) lastInput = 'keyboard'; }, true);
    document.addEventListener('focusin', function (ev) { if (focusHow && ev.target && typeof ev.target === 'object') focusHow.set(ev.target, lastInput); }, true);
  };
  Dom.focusByKeyboard = function (el) {
    if (!el || el === document.body || el === document.documentElement) return false;
    if (focusHow && focusHow.has(el)) return focusHow.get(el) === 'keyboard';
    try { return el.matches(':focus-visible'); } catch (e) { return true; }
  };

  Dom.focus = function (el) {
    if (!el || typeof el.focus !== 'function') return;
    try { el.focus({ preventScroll: true }); } catch (e) { try { el.focus(); } catch (e2) { } }
  };

  Dom.query = function () {
    var out = {};
    try {
      var s = (window.location && window.location.search) || '';
      s.replace(/^\?/, '').split('&').forEach(function (kv) {
        if (!kv) return;
        var i = kv.indexOf('=');
        var k = decodeURIComponent(i < 0 ? kv : kv.slice(0, i));
        var v = i < 0 ? '1' : decodeURIComponent(kv.slice(i + 1));
        out[k] = v;
      });
    } catch (e) { }
    return out;
  };

  Dom.now = function () {
    return (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now();
  };

  Dom.wait = function (ms) {
    return new Promise(function (res) { setTimeout(res, Math.max(0, ms | 0)); });
  };
})(window.ECE = window.ECE || {});
;
(function (ECE) {
  'use strict';

  var NS = 'http://www.w3.org/2000/svg';

  var FONT = 'ui-rounded, "SF Pro Rounded", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

  var COLORS = {
    mist: '#EEF3F1', paper: '#F7F4EC', evergreen: '#1F5F45', emerald: '#13A06F', sound: '#2E6F95', slate: '#1D2A30',
    cedar: '#8A5A3B', tower: '#3D5A80', towerDark: '#22344D', towerWin: '#CFE0F5',
    boardBase: '#E4DCC8', boardEdge: '#CFC5AE', tile: '#FFFDF7', asphalt: '#59666C', asphaltEdge: '#46525A',
    dash: '#F4E6AE', curb: '#EAE3D2', mortgage: '#D3D7D6', hatch: '#7B878C', text: '#1D2A30', textSoft: '#4A5A61',
    plus: '#0E8F5F', minus: '#D23B3B', gold: '#F2B632', goldDark: '#B9831A',
    rain: '#2E6F95', rainTint: '#DDEBF4', buzz: '#C8742E', buzzTint: '#F6E8D6',
    transitTint: '#E3EAEE', utilityTint: '#E6EEF0', taxTint: '#F3E3DA'
  };

  function el(tag, attrs, parent) {
    var e = document.createElementNS(NS, tag);
    if (attrs) {
      for (var k in attrs) {
        if (!Object.prototype.hasOwnProperty.call(attrs, k)) continue;
        var v = attrs[k];
        if (v === null || v === undefined || k === 'style') continue;
        e.setAttribute(k, String(v));
      }
    }
    if (parent) parent.appendChild(e);
    return e;
  }

  function txt(parent, x, y, s, size, attrs) {
    var a = { x: r3(x), y: r3(y), 'font-size': r3(size), 'text-anchor': 'middle' };
    if (attrs) for (var k in attrs) if (Object.prototype.hasOwnProperty.call(attrs, k)) a[k] = attrs[k];
    var t = el('text', a, parent);
    t.textContent = s;
    return t;
  }

  function r3(n) { return Math.round(n * 1000) / 1000; }

  function lum(hex) {
    var m = /^#?([0-9a-f]{6})$/i.exec(String(hex || ''));
    var v = m ? parseInt(m[1], 16) : 0;
    var ch = [(v >> 16) & 255, (v >> 8) & 255, v & 255].map(function (x) { x /= 255; return x <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4); });
    return 0.2126 * ch[0] + 0.7152 * ch[1] + 0.0722 * ch[2];
  }
  function contrast(a, b) { var x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); }
  function darken(hex, t) {
    var v = parseInt(String(hex).replace('#', ''), 16) || 0, o = '#';
    [(v >> 16) & 255, (v >> 8) & 255, v & 255].forEach(function (c) { var n = Math.round(c * (1 - t)); o += (n < 16 ? '0' : '') + n.toString(16); });
    return o.toUpperCase();
  }
  var tagMemo = {};
  function tagColors(color) {
    var key = String(color || '');
    if (tagMemo[key]) return tagMemo[key];
    var w = contrast('#FFFFFF', key), s = contrast(COLORS.slate, key), out;
    if (w >= 4.5 && w >= s) out = { fill: key, text: '#FFFFFF' };
    else if (s >= 4.5) out = { fill: key, text: COLORS.slate };
    else {
      var t = 0, f = key;
      while (contrast('#FFFFFF', f) < 4.6 && t < 0.9) { t += 0.02; f = darken(key, t); }
      out = { fill: f, text: '#FFFFFF' };
    }
    tagMemo[key] = out;
    return out;
  }

  function box(parent, cx, cy, s, cls) {
    var k = s / 24;
    return el('g', { transform: 'translate(' + r3(cx - 12 * k) + ' ' + r3(cy - 12 * k) + ') scale(' + r3(k) + ')', 'class': cls || null }, parent);
  }

  var GLYPHS = {
    ferry: [
      ['M1.6 13.3H22.4L19.9 17.9C19.6 18.5 19 18.9 18.3 18.9H5.7C5 18.9 4.4 18.5 4.1 17.9Z', 'f'],
      ['M4.9 13.3V10.4C4.9 9.9 5.3 9.5 5.8 9.5H18.2C18.7 9.5 19.1 9.9 19.1 10.4V13.3Z', 'f'],
      ['M8.2 9.5V7.4C8.2 6.9 8.6 6.5 9.1 6.5H14.9C15.4 6.5 15.8 6.9 15.8 7.4V9.5Z', 'f'],
      ['M10.8 6.5V4.1C10.8 3.8 11 3.6 11.3 3.6H12.7C13 3.6 13.2 3.8 13.2 4.1V6.5Z', 'f'],
      ['M6.6 10.9H8.4V12.3H6.6ZM9.5 10.9H11.3V12.3H9.5ZM12.7 10.9H14.5V12.3H12.7ZM15.6 10.9H17.4V12.3H15.6Z', 'c'],
      ['M3.4 15.2H20.6L20 16.2H4Z', 'c']
    ],
    coffee: [
      ['M5.9 6.9C5.9 6.2 6.4 5.6 7.1 5.6H16.9C17.6 5.6 18.1 6.2 18.1 6.9V8.4H5.9Z', 'f'],
      ['M8.6 5.6L9.3 3.9C9.4 3.6 9.7 3.4 10 3.4H14C14.3 3.4 14.6 3.6 14.7 3.9L15.4 5.6Z', 'f'],
      ['M6.6 9.2H17.4L16 20.6C15.9 21.3 15.3 21.8 14.6 21.8H9.4C8.7 21.8 8.1 21.3 8 20.6Z', 'f'],
      ['M7.3 12.2H16.7L16.3 16.2H7.7Z', 'c']
    ],
    salmon: [
      ['M1.9 12C4.4 7.6 10.2 6.5 15.2 10.1L20.7 6.5C21.2 6.2 21.8 6.7 21.6 7.2L20.2 12L21.6 16.8C21.8 17.3 21.2 17.8 20.7 17.5L15.2 13.9C10.2 17.5 4.4 16.4 1.9 12Z', 'f'],
      ['M8.7 8.4L10.9 5.6C11.2 5.2 11.8 5.3 11.9 5.8L12.6 8.6Z', 'f'],
      ['M5.7 11.1A0.95 0.95 0 1 1 7.6 11.1A0.95 0.95 0 1 1 5.7 11.1Z', 'c'],
      ['M9.3 9.4C10.2 10.9 10.2 13.1 9.3 14.6', 'sc', 0.9]
    ],
    umbrella: [
      ['M12 3.1C16.9 3.1 21 6.8 21.6 11.6C21.6 11.9 21.3 12.1 21 11.9C20 11.1 18.6 11.1 17.6 11.9C17.4 12.1 17.1 12.1 16.9 11.9C15.7 10.9 13.9 10.8 12.6 11.7L12 12.1L11.4 11.7C10.1 10.8 8.3 10.9 7.1 11.9C6.9 12.1 6.6 12.1 6.4 11.9C5.4 11.1 4 11.1 3 11.9C2.7 12.1 2.4 11.9 2.4 11.6C3 6.8 7.1 3.1 12 3.1Z', 'f'],
      ['M11.2 3.4V1.9C11.2 1.5 11.6 1.1 12 1.1C12.4 1.1 12.8 1.5 12.8 1.9V3.4Z', 'f'],
      ['M12 11.8V18.7C12 20 11 21 9.7 21C8.6 21 7.7 20.2 7.5 19.1', 's', 1.8]
    ],
    evergreen: [
      ['M12 1.4L17.3 7.9H14.7L19.1 13.3H15.9L20.4 19H3.6L8.1 13.3H4.9L9.3 7.9H6.7Z', 'f'],
      ['M10.6 19H13.4V22.6H10.6Z', 'f']
    ],
    orca: [
      ['M1.6 13.4C1.6 10.3 4.2 8.6 7.8 8.5L11.9 8.4L13.2 1.9C13.3 1.4 14 1.4 14.1 1.9L15.6 8.8C17.5 9.2 19 10 20.1 11.1L21.8 8.6C22.1 8.1 22.8 8.2 22.9 8.8L23 12.1L23.3 15.3C23.4 15.9 22.9 16.3 22.4 16L20.2 14.9C17.9 17.6 13.4 18.7 8.9 18.5C4.4 18.3 1.6 16.5 1.6 13.4Z', 'f'],
      ['M8.2 17.9L10.1 21.4C10.4 21.9 11.1 21.8 11.2 21.2L11.7 18.3Z', 'f'],
      ['M4.7 11.3C5 10.5 6.3 10.2 7.6 10.5C8.8 10.8 9.6 11.5 9.4 12.2C9.2 12.8 8 13 6.8 12.7C5.5 12.4 4.5 11.9 4.7 11.3Z', 'c'],
      ['M15.6 10.3C16.9 10.6 17.9 11.2 18.5 11.9C17.5 12 16.5 11.7 15.8 11.2Z', 'c']
    ],
    bicycle: [
      ['M1.9 15.6A3.9 3.9 0 1 0 9.7 15.6A3.9 3.9 0 1 0 1.9 15.6', 's', 1.7],
      ['M14.3 15.6A3.9 3.9 0 1 0 22.1 15.6A3.9 3.9 0 1 0 14.3 15.6', 's', 1.7],
      ['M5.8 15.6L9.5 8.7H15.6L18.2 15.6M9.5 8.7L12.1 15.6L15.6 8.7M8 7.2H11.2M15.6 8.7L15 6.3H17.6', 's', 1.7],
      ['M11 15.6A1.1 1.1 0 1 0 13.2 15.6A1.1 1.1 0 1 0 11 15.6Z', 'f']
    ],
    seaplane: [
      ['M3 10.7C3 9.7 3.8 8.8 4.9 8.8H16.3L19.5 4.9C19.7 4.6 20 4.5 20.3 4.5H21.7C22.1 4.5 22.4 4.9 22.3 5.3L21.1 11.4C21 11.8 20.7 12.1 20.3 12.1H4.9C3.9 12.1 3 11.5 3 10.7Z', 'f'],
      ['M6.6 6.7H15.4C15.9 6.7 16.3 7.1 16.3 7.6V8.8H5.7V7.6C5.7 7.1 6.1 6.7 6.6 6.7Z', 'f'],
      ['M7.8 12L6.9 15.4M13.6 12L14.5 15.4', 's', 1.3],
      ['M3.2 15.2H17.6C17.6 16.4 16.6 17.4 15.4 17.4H5.4C4.2 17.4 3.2 16.4 3.2 15.2Z', 'f'],
      ['M1.8 7.4V14', 's', 1.3],
      ['M5.6 9.9H7.4V11H5.6ZM8.4 9.9H10.2V11H8.4Z', 'c']
    ]
  };

  function glyph(parent, id, fg, cut) {
    fg = fg || '#FFFFFF';
    var parts = GLYPHS[id] || GLYPHS.ferry;
    var g = el('g', { transform: 'scale(0.0833333) translate(-12 -12)', 'class': 'ece-glyph' }, parent);
    for (var i = 0; i < parts.length; i++) {
      var p = parts[i], how = p[1];
      if (how === 'f') el('path', { d: p[0], fill: fg }, g);
      else if (how === 'c') el('path', { d: p[0], fill: cut || '#000000' }, g);
      else el('path', { d: p[0], fill: 'none', stroke: how === 'sc' ? (cut || '#000000') : fg, 'stroke-width': p[2] || 1.6,
        'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g);
    }
    return g;
  }

  function disc(parent, id, color, r, opts) {
    opts = opts || {};
    var g = el('g', { 'class': 'ece-disc' }, parent);
    if (opts.shadow) el('ellipse', { cx: 0, cy: r3(r * 0.22), rx: r3(r * 0.98), ry: r3(r * 0.86), fill: '#0B1A20', opacity: 0.22, 'class': 'ece-disc-shadow' }, g);
    el('circle', { cx: 0, cy: 0, r: r3(r), fill: color || COLORS.sound, stroke: '#FFFFFF', 'stroke-width': r3(r * (opts.rim || 0.14)), 'class': 'ece-disc-face' }, g);
    var gl = el('g', { transform: 'scale(' + r3(r * (opts.glyph || 0.66)) + ')' }, g);
    glyph(gl, id, '#FFFFFF', color || COLORS.sound);
    return g;
  }

  function tokenIcon(id, opts) {
    opts = opts || {};
    var px = opts.size || 24;
    var svg = el('svg', { viewBox: '-1.1 -1.1 2.2 2.2', width: px, height: px, focusable: 'false', 'aria-hidden': 'true', 'class': 'ece-token-icon' });
    disc(svg, id, opts.color || COLORS.sound, 1, { rim: 0.1, glyph: 0.68 });
    return svg;
  }

  function house(parent, cx, bottom, s, cls) {
    var w = s, h = s * 0.92, x = cx - w / 2, y = bottom - h;
    var g = el('g', { 'class': cls || 'ece-house' }, parent);
    el('path', { d: 'M' + r3(x) + ' ' + r3(y + h * 0.46) + 'L' + r3(cx) + ' ' + r3(y) + 'L' + r3(x + w) + ' ' + r3(y + h * 0.46) +
      'V' + r3(bottom) + 'H' + r3(x) + 'Z', fill: '#FFFFFF', stroke: COLORS.cedar, 'stroke-width': r3(s * 0.13), 'stroke-linejoin': 'round' }, g);
    el('rect', { x: r3(cx - w * 0.12), y: r3(bottom - h * 0.36), width: r3(w * 0.24), height: r3(h * 0.36), fill: COLORS.cedar }, g);
    return g;
  }

  function tower(parent, cx, bottom, w, h, cls) {
    var g = el('g', { 'class': cls || 'ece-tower' }, parent);
    var x = cx - w / 2, top = bottom - h, sw = w * 0.1;
    el('path', { d: 'M' + r3(x) + ' ' + r3(bottom) + 'V' + r3(top + h * 0.14) + 'H' + r3(x + w * 0.18) + 'V' + r3(top) + 'H' + r3(x + w * 0.82) +
      'V' + r3(top + h * 0.14) + 'H' + r3(x + w) + 'V' + r3(bottom) + 'Z', fill: COLORS.tower, stroke: COLORS.towerDark, 'stroke-width': r3(sw), 'stroke-linejoin': 'round' }, g);
    var rows = Math.max(3, Math.round(h / (w * 0.42)));
    var d = '';
    for (var i = 0; i < rows; i++) {
      var yy = top + h * 0.24 + i * (h * 0.66 / rows);
      d += 'M' + r3(x + w * 0.3) + ' ' + r3(yy) + 'H' + r3(x + w * 0.42) + 'M' + r3(x + w * 0.58) + ' ' + r3(yy) + 'H' + r3(x + w * 0.7);
    }
    el('path', { d: d, stroke: COLORS.towerWin, 'stroke-width': r3(w * 0.12), 'stroke-linecap': 'round', fill: 'none' }, g);
    return g;
  }

  function waves(g, y, color, w) {
    el('path', { d: 'M1.5 ' + y + 'C3.3 ' + (y - 1) + ' 5.1 ' + (y - 1) + ' 6.9 ' + y + 'C8.7 ' + (y + 1) + ' 10.5 ' + (y + 1) + ' 12.3 ' + y +
      'C14.1 ' + (y - 1) + ' 15.9 ' + (y - 1) + ' 17.7 ' + y + 'C19.5 ' + (y + 1) + ' 21.3 ' + (y + 1) + ' 22.6 ' + y,
      fill: 'none', stroke: color, 'stroke-width': w || 1.3, 'stroke-linecap': 'round' }, g);
  }

  var DROP = 'M12 2.4C12 2.4 5.2 10.2 5.2 14.6C5.2 18.4 8.2 21.4 12 21.4C15.8 21.4 18.8 18.4 18.8 14.6C18.8 10.2 12 2.4 12 2.4Z';

  function icon(parent, name, cx, cy, s, mono) {
    var g = box(parent, cx, cy, s, 'ece-icon ece-icon-' + name);
    var m = mono || null;
    var c = function (normal) { return m ? m.fg : normal; };
    var cut = function (normal) { return m ? m.cut : normal; };
    switch (name) {
      case 'train':
        el('path', { d: 'M8.6 3.4L12 1.2L15.4 3.4', fill: 'none', stroke: c(COLORS.slate), 'stroke-width': 1.2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g);
        el('rect', { x: 4.8, y: 3.4, width: 14.4, height: 15.2, rx: 3.4, fill: c(COLORS.sound) }, g);
        el('rect', { x: 6.8, y: 5.4, width: 10.4, height: 6.4, rx: 1.6, fill: cut('#D3E9F4') }, g);
        el('rect', { x: 4.8, y: 13, width: 14.4, height: 1.3, fill: cut('#FFFFFF') }, g);
        el('circle', { cx: 8.4, cy: 16.2, r: 1.1, fill: cut('#FFE7A0') }, g);
        el('circle', { cx: 15.6, cy: 16.2, r: 1.1, fill: cut('#FFE7A0') }, g);
        el('path', { d: 'M7.4 18.6L5.6 21.4M16.6 18.6L18.4 21.4M3.4 21.8H20.6', fill: 'none', stroke: c(COLORS.slate), 'stroke-width': 1.3, 'stroke-linecap': 'round' }, g);
        break;
      case 'ferry':
        waves(g, 20.4, c(COLORS.sound), 1.3);
        el('path', { d: 'M1.8 13.6H22.2L19.8 17.8C19.5 18.4 18.9 18.7 18.3 18.7H5.7C5.1 18.7 4.5 18.4 4.2 17.8Z', fill: c('#FFFFFF'), stroke: m ? 'none' : COLORS.slate, 'stroke-width': 0.9, 'stroke-linejoin': 'round' }, g);
        el('path', { d: 'M3.3 15.6H20.7L20.1 16.6H3.9Z', fill: cut(COLORS.sound) }, g);
        el('path', { d: 'M5 13.6V10.6C5 10.1 5.4 9.7 5.9 9.7H18.1C18.6 9.7 19 10.1 19 10.6V13.6Z', fill: c('#FFFFFF'), stroke: m ? 'none' : COLORS.slate, 'stroke-width': 0.9 }, g);
        el('path', { d: 'M6.7 11H8.5V12.4H6.7ZM9.6 11H11.4V12.4H9.6ZM12.6 11H14.4V12.4H12.6ZM15.5 11H17.3V12.4H15.5Z', fill: cut(COLORS.sound) }, g);
        el('path', { d: 'M8.4 9.7V7.6C8.4 7.1 8.8 6.7 9.3 6.7H14.7C15.2 6.7 15.6 7.1 15.6 7.6V9.7Z', fill: c('#FFFFFF'), stroke: m ? 'none' : COLORS.slate, 'stroke-width': 0.9 }, g);
        el('rect', { x: 10.9, y: 3.8, width: 2.2, height: 2.9, rx: 0.5, fill: c(COLORS.slate) }, g);
        break;
      case 'bus':
        el('rect', { x: 4.4, y: 2.6, width: 15.2, height: 16.4, rx: 3, fill: c('#1F7A57') }, g);
        el('rect', { x: 6.2, y: 4.6, width: 11.6, height: 7.2, rx: 1.4, fill: cut('#D6ECF4') }, g);
        el('rect', { x: 9.2, y: 14.4, width: 5.6, height: 1.8, rx: 0.6, fill: cut('#14533A') }, g);
        el('circle', { cx: 7.6, cy: 15.3, r: 1.2, fill: cut('#FFE7A0') }, g);
        el('circle', { cx: 16.4, cy: 15.3, r: 1.2, fill: cut('#FFE7A0') }, g);
        el('rect', { x: 5.8, y: 18.4, width: 3.2, height: 3, rx: 1, fill: c(COLORS.slate) }, g);
        el('rect', { x: 15, y: 18.4, width: 3.2, height: 3, rx: 1, fill: c(COLORS.slate) }, g);
        el('path', { d: 'M4.4 7H3.2M19.6 7H20.8', stroke: c(COLORS.slate), 'stroke-width': 1.4, 'stroke-linecap': 'round' }, g);
        break;
      case 'dam':
        el('path', { d: 'M1.6 8.6C3.6 8 5.6 8 7.8 8.6V20.8H1.6Z', fill: c('#5C9DC4') }, g);
        el('path', { d: 'M7 5.6H12.6L17.2 20.8H7Z', fill: c('#D3D8DA'), stroke: m ? 'none' : '#8E999F', 'stroke-width': 0.9, 'stroke-linejoin': 'round' }, g);
        el('path', { d: 'M8.6 9.4H12.4M8.6 13H13.4M8.6 16.6H14.6', stroke: cut('#A9B3B8'), 'stroke-width': 0.8 }, g);
        el('path', { d: 'M16.6 20.8H22.6', stroke: c('#5C9DC4'), 'stroke-width': 1.6, 'stroke-linecap': 'round' }, g);
        el('path', { d: 'M18.4 1.8L14.4 9.6H17.3L15.4 15.8L21.6 7.4H18.5L20.8 1.8Z', fill: c(COLORS.gold), stroke: m ? 'none' : COLORS.goldDark, 'stroke-width': 0.7, 'stroke-linejoin': 'round' }, g);
        break;
      case 'drop':
        el('path', { d: DROP, fill: c('#3D8EC2') }, g);
        el('path', { d: 'M7.6 14.4C8.9 13.6 10.1 13.6 11.4 14.4C12.7 15.2 13.9 15.2 15.2 14.4C15.7 14.1 16.1 14 16.5 14M7.8 17.6C9.1 16.8 10.3 16.8 11.6 17.6C12.9 18.4 14.1 18.4 15.4 17.6',
          fill: 'none', stroke: cut('#FFFFFF'), 'stroke-width': 1.2, 'stroke-linecap': 'round' }, g);
        el('path', { d: 'M8 11.2C8.4 9.9 9.2 8.6 10 7.6', fill: 'none', stroke: cut('#FFFFFF'), 'stroke-width': 1.1, 'stroke-linecap': 'round', opacity: m ? 1 : 0.8 }, g);
        break;
      case 'tax':
        el('path', { d: 'M3.4 11.2L11.1 3.5C11.5 3.1 12 2.9 12.5 2.9H19.1C20.2 2.9 21.1 3.8 21.1 4.9V11.5C21.1 12 20.9 12.5 20.5 12.9L12.8 20.6C12 21.4 10.7 21.4 9.9 20.6L3.4 14.1C2.6 13.3 2.6 12 3.4 11.2Z', fill: c('#D9603B') }, g);
        el('circle', { cx: 17.2, cy: 6.8, r: 1.5, fill: cut('#FFFFFF') }, g);
        el('path', { d: 'M8.4 15.6L14.2 9.8', stroke: cut('#FFFFFF'), 'stroke-width': 1.4, 'stroke-linecap': 'round' }, g);
        el('circle', { cx: 9.2, cy: 10.8, r: 1.3, fill: 'none', stroke: cut('#FFFFFF'), 'stroke-width': 1.1 }, g);
        el('circle', { cx: 13.4, cy: 14.6, r: 1.3, fill: 'none', stroke: cut('#FFFFFF'), 'stroke-width': 1.1 }, g);
        break;
      case 'toll':
        waves(g, 20.6, c(COLORS.sound), 1.3);
        el('path', { d: 'M5.6 13.4V6.2M18.4 13.4V6.2', stroke: c(COLORS.slate), 'stroke-width': 1.4, 'stroke-linecap': 'round' }, g);
        el('rect', { x: 4.4, y: 4.2, width: 15.2, height: 3.6, rx: 0.9, fill: c(COLORS.evergreen) }, g);
        el('circle', { cx: 12, cy: 6, r: 1.1, fill: cut(COLORS.gold) }, g);
        el('rect', { x: 1.6, y: 13.4, width: 20.8, height: 2.6, rx: 0.6, fill: c(COLORS.slate) }, g);
        el('path', { d: 'M3.6 14.7H20.4', stroke: cut(COLORS.dash), 'stroke-width': 0.5, 'stroke-dasharray': '1.4 1' }, g);
        el('rect', { x: 4.2, y: 16, width: 3.4, height: 2.2, rx: 0.5, fill: c('#8C979C') }, g);
        el('rect', { x: 10.3, y: 16, width: 3.4, height: 2.2, rx: 0.5, fill: c('#8C979C') }, g);
        el('rect', { x: 16.4, y: 16, width: 3.4, height: 2.2, rx: 0.5, fill: c('#8C979C') }, g);
        break;
      case 'rain':
        el('path', { d: DROP, fill: c(COLORS.rain) }, g);
        el('path', { d: 'M8.4 14.6L11 17.2L15.8 12.2', fill: 'none', stroke: cut('#FFFFFF'), 'stroke-width': 1.9, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g);
        break;
      case 'buzz':
        el('path', { d: 'M8.4 6.6C7.6 5.6 9.2 4.6 8.4 3.4M11.6 6.6C10.8 5.6 12.4 4.6 11.6 3.4', fill: 'none', stroke: c('#A88B78'), 'stroke-width': 1.1, 'stroke-linecap': 'round' }, g);
        el('path', { d: 'M4.8 8.4H15.2V15.4C15.2 17.8 13.3 19.6 11 19.6H9C6.7 19.6 4.8 17.8 4.8 15.4Z', fill: c(COLORS.buzz) }, g);
        el('path', { d: 'M15.2 10.4H16.6C18 10.4 19 11.4 19 12.8C19 14.2 18 15.2 16.6 15.2H15.2', fill: 'none', stroke: c(COLORS.buzz), 'stroke-width': 1.5 }, g);
        el('path', { d: 'M3.2 21.2H16.8', stroke: c(COLORS.buzz), 'stroke-width': 1.5, 'stroke-linecap': 'round' }, g);
        el('rect', { x: 6.6, y: 11, width: 6.8, height: 1.4, rx: 0.5, fill: cut('#FFFFFF'), opacity: m ? 1 : 0.85 }, g);
        el('path', { d: 'M19.4 7.6L21.8 5.6M20.4 10.4H23M17.8 6L18.6 3.4', fill: 'none', stroke: c('#D9822B'), 'stroke-width': 1.3, 'stroke-linecap': 'round' }, g);
        el('path', { d: 'M2.2 12.6C1.4 11.8 1.4 10.4 2.2 9.6', fill: 'none', stroke: c('#D9822B'), 'stroke-width': 1.2, 'stroke-linecap': 'round' }, g);
        break;
      default:
        el('circle', { cx: 12, cy: 12, r: 8, fill: c(COLORS.sound) }, g);
    }
    return g;
  }

  function car(parent, x, y, w, color, facing) {
    var h = w * 0.42;
    var g = el('g', { transform: 'translate(' + r3(x + (facing < 0 ? w : 0)) + ' ' + r3(y) + ') scale(' + (facing < 0 ? -1 : 1) + ' 1)' }, parent);
    el('path', { d: 'M0 ' + r3(-h * 0.3) + 'C0 ' + r3(-h * 0.55) + ' ' + r3(w * 0.06) + ' ' + r3(-h * 0.62) + ' ' + r3(w * 0.18) + ' ' + r3(-h * 0.62) +
      'L' + r3(w * 0.3) + ' ' + r3(-h) + 'H' + r3(w * 0.72) + 'L' + r3(w * 0.86) + ' ' + r3(-h * 0.62) + 'C' + r3(w * 0.96) + ' ' + r3(-h * 0.6) + ' ' + r3(w) + ' ' + r3(-h * 0.5) +
      ' ' + r3(w) + ' ' + r3(-h * 0.32) + 'V' + r3(-h * 0.14) + 'H0Z', fill: color }, g);
    el('path', { d: 'M' + r3(w * 0.34) + ' ' + r3(-h * 0.88) + 'H' + r3(w * 0.5) + 'V' + r3(-h * 0.64) + 'H' + r3(w * 0.26) + 'ZM' + r3(w * 0.56) + ' ' + r3(-h * 0.88) +
      'H' + r3(w * 0.68) + 'L' + r3(w * 0.78) + ' ' + r3(-h * 0.64) + 'H' + r3(w * 0.56) + 'Z', fill: '#DCEBF2' }, g);
    el('circle', { cx: r3(w * 0.24), cy: r3(-h * 0.12), r: r3(h * 0.2), fill: '#263238' }, g);
    el('circle', { cx: r3(w * 0.78), cy: r3(-h * 0.12), r: r3(h * 0.2), fill: '#263238' }, g);
    el('rect', { x: r3(-w * 0.02), y: r3(-h * 0.44), width: r3(w * 0.06), height: r3(h * 0.14), fill: '#FF5A4E' }, g);
    return g;
  }

  function tree(parent, cx, bottom, h, color) {
    var w = h * 0.62;
    el('path', { d: 'M' + r3(cx) + ' ' + r3(bottom - h) + 'L' + r3(cx + w * 0.36) + ' ' + r3(bottom - h * 0.56) + 'H' + r3(cx + w * 0.2) +
      'L' + r3(cx + w / 2) + ' ' + r3(bottom - h * 0.14) + 'H' + r3(cx - w / 2) + 'L' + r3(cx - w * 0.2) + ' ' + r3(bottom - h * 0.56) +
      'H' + r3(cx - w * 0.36) + 'Z', fill: color }, parent);
  }

  function corner(parent, kind, x, y, s, lines, info) {
    info = info || {};
    var g = el('g', { 'class': 'ece-corner ece-corner-' + kind }, parent);
    var out = { g: g };
    var cx = x + s / 2;
    var em = typeof info.em === 'function' ? info.em : function (t) { return t.length * 0.62; };
    var minF = info.minFont || 0.165;
    var title = function (yy, maxW, centreX) {
      var one = lines.join(' ');
      var f1 = Math.min(0.215, maxW / (em(one) || 1));
      if (f1 >= 0.185 || lines.length < 2) {
        txt(g, centreX, yy, one, Math.max(minF, f1), { 'font-weight': 800, fill: COLORS.slate });
        return 1;
      }
      var w2 = Math.max(em(lines[0]), em(lines[1])) || 1;
      var f2 = Math.max(minF, Math.min(0.215, maxW / w2));
      txt(g, centreX, yy, lines[0], f2, { 'font-weight': 800, fill: COLORS.slate });
      txt(g, centreX, yy + f2 * 1.1, lines[1], f2, { 'font-weight': 800, fill: COLORS.slate });
      return 2;
    };
    var bg = function (fill) { el('rect', { x: x + 0.035, y: y + 0.035, width: s - 0.07, height: s - 0.07, rx: 0.12, fill: fill }, g); };
    if (kind === 'start') {
      bg('#D9EEE3');
      el('path', { d: 'M' + r3(x + 0.035) + ' ' + r3(y + 1.02) + 'Q' + r3(cx) + ' ' + r3(y + 0.82) + ' ' + r3(x + s - 0.035) + ' ' + r3(y + 1.02) +
        'V' + r3(y + s - 0.155) + 'Q' + r3(x + s - 0.035) + ' ' + r3(y + s - 0.035) + ' ' + r3(x + s - 0.155) + ' ' + r3(y + s - 0.035) +
        'H' + r3(x + 0.155) + 'Q' + r3(x + 0.035) + ' ' + r3(y + s - 0.035) + ' ' + r3(x + 0.035) + ' ' + r3(y + s - 0.155) + 'Z', fill: '#BFE3CF' }, g);
      el('rect', { x: x + 0.38, y: y + 0.66, width: 0.07, height: 0.34, fill: '#6F7B80' }, g);
      el('rect', { x: x + s - 0.45, y: y + 0.66, width: 0.07, height: 0.34, fill: '#6F7B80' }, g);
      el('rect', { x: x + 0.13, y: y + 0.13, width: s - 0.26, height: 0.58, rx: 0.1, fill: COLORS.evergreen }, g);
      el('rect', { x: x + 0.18, y: y + 0.18, width: s - 0.36, height: 0.48, rx: 0.07, fill: 'none', stroke: '#FFFFFF', 'stroke-width': 0.03 }, g);
      var word = lines[0] || 'START';
      var sf = Math.min(0.32, (s - 0.5) / (em(word) || 3));
      txt(g, cx, y + 0.42 + sf * 0.36, word, sf, { 'font-weight': 800, fill: '#FFFFFF' });
      txt(g, cx, y + 1.2, '+' + (info.salary || ''), 0.3, { 'font-weight': 800, fill: COLORS.plus });
      el('path', { d: 'M' + r3(x + 0.34) + ' ' + r3(y + 1.34) + 'H' + r3(x + 1.08) + 'M' + r3(x + 0.94) + ' ' + r3(y + 1.24) + 'L' + r3(x + 1.1) + ' ' + r3(y + 1.34) + 'L' + r3(x + 0.94) + ' ' + r3(y + 1.44),
        fill: 'none', stroke: COLORS.evergreen, 'stroke-width': 0.06, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g);
    } else if (kind === 'traffic') {
      bg('#E2E7EA');
      var sw = 0.34, sh = 0.26, sx = x + s - 0.06 - sw, sy = y + 0.12;
      var tl = x + 0.07, tr = sx - 0.05;
      var n = title(y + 0.31, tr - tl, (tl + tr) / 2);
      el('rect', { x: r3(sx + sw / 2 - 0.02), y: r3(sy + sh), width: 0.04, height: 0.12, fill: '#6F7B80' }, g);
      el('rect', { x: r3(sx), y: r3(sy), width: r3(sw), height: r3(sh), rx: 0.05, fill: COLORS.evergreen }, g);
      el('rect', { x: r3(sx + 0.025), y: r3(sy + 0.025), width: r3(sw - 0.05), height: r3(sh - 0.05), rx: 0.035, fill: 'none', stroke: '#FFFFFF', 'stroke-width': 0.018 }, g);
      txt(g, sx + sw / 2, sy + sh / 2 + 0.065, info.road || 'I-5', Math.max(minF, 0.17), { 'font-weight': 800, fill: '#FFFFFF' });
      var ly = y + (n === 2 ? 0.66 : 0.5), lh = y + s - 0.08 - ly;
      el('rect', { x: x + 0.07, y: r3(ly), width: s - 0.14, height: r3(lh), rx: 0.08, fill: COLORS.asphalt }, g);
      el('path', { d: 'M' + r3(x + 0.12) + ' ' + r3(ly + lh / 2) + 'H' + r3(x + s - 0.12), stroke: COLORS.dash, 'stroke-width': 0.025, 'stroke-dasharray': '0.1 0.08' }, g);
      var cols = ['#E9E2D0', '#C8373B', '#2F6FD6', '#F2F2F2', '#E5822B', '#7A8A92'];
      for (var k = 0; k < 3; k++) {
        car(g, x + 0.13 + k * 0.43, ly + lh / 2 - 0.07, 0.37, cols[k], 1);
        car(g, x + 0.3 + k * 0.39, ly + lh - 0.07, 0.33, cols[k + 3], 1);
      }
      out.stuck = { x: x + 0.1, y: ly + 0.03, w: s - 0.2, h: lh - 0.06 };
    } else if (kind === 'rest') {
      bg('#F2E4CD');
      title(y + 0.31, s - 0.14, cx);
      var cyy = y + 1.04, mw = 0.36;
      el('ellipse', { cx: cx, cy: r3(cyy + 0.3), rx: 0.52, ry: 0.085, fill: '#FFFFFF', stroke: '#C9B79E', 'stroke-width': 0.025 }, g);
      el('path', { d: 'M' + r3(cx - mw) + ' ' + r3(cyy - 0.24) + 'H' + r3(cx + mw - 0.08) + 'V' + r3(cyy + 0.06) + 'C' + r3(cx + mw - 0.08) + ' ' + r3(cyy + 0.22) + ' ' + r3(cx + 0.16) + ' ' + r3(cyy + 0.3) +
        ' ' + r3(cx - 0.04) + ' ' + r3(cyy + 0.3) + 'C' + r3(cx - 0.24) + ' ' + r3(cyy + 0.3) + ' ' + r3(cx - mw) + ' ' + r3(cyy + 0.22) + ' ' + r3(cx - mw) + ' ' + r3(cyy + 0.06) + 'Z',
        fill: '#FFFFFF', stroke: COLORS.cedar, 'stroke-width': 0.04, 'stroke-linejoin': 'round' }, g);
      el('path', { d: 'M' + r3(cx + mw - 0.08) + ' ' + r3(cyy - 0.15) + 'H' + r3(cx + mw) + 'C' + r3(cx + mw + 0.12) + ' ' + r3(cyy - 0.15) + ' ' + r3(cx + mw + 0.16) + ' ' + r3(cyy - 0.07) + ' ' + r3(cx + mw + 0.16) + ' ' + r3(cyy - 0.01) +
        'C' + r3(cx + mw + 0.16) + ' ' + r3(cyy + 0.08) + ' ' + r3(cx + mw + 0.1) + ' ' + r3(cyy + 0.14) + ' ' + r3(cx + mw - 0.1) + ' ' + r3(cyy + 0.14), fill: 'none', stroke: COLORS.cedar, 'stroke-width': 0.045 }, g);
      el('rect', { x: r3(cx - mw + 0.02), y: r3(cyy - 0.1), width: r3(2 * mw - 0.12), height: 0.09, fill: '#C0613F' }, g);
      el('ellipse', { cx: r3(cx - 0.04), cy: r3(cyy - 0.235), rx: r3(mw - 0.06), ry: 0.035, fill: '#8C5A3C' }, g);
      el('path', { d: 'M' + r3(cx - 0.2) + ' ' + r3(cyy - 0.33) + 'c-0.07 -0.07 0.07 -0.12 0 -0.2M' + r3(cx - 0.04) + ' ' + r3(cyy - 0.33) + 'c-0.07 -0.07 0.07 -0.12 0 -0.2M' +
        r3(cx + 0.12) + ' ' + r3(cyy - 0.33) + 'c-0.07 -0.07 0.07 -0.12 0 -0.2', fill: 'none', stroke: '#B59C86', 'stroke-width': 0.035, 'stroke-linecap': 'round' }, g);
    } else if (kind === 'bridge') {
      bg('#DCEAF3');
      title(y + 0.31, s - 0.14, cx);
      var wy = y + 1.18, py = wy - 0.16;
      el('path', { d: 'M' + r3(x + 0.035) + ' ' + r3(wy) + 'H' + r3(x + s - 0.035) + 'V' + r3(y + s - 0.155) + 'Q' + r3(x + s - 0.035) + ' ' + r3(y + s - 0.035) + ' ' + r3(x + s - 0.155) + ' ' + r3(y + s - 0.035) +
        'H' + r3(x + 0.155) + 'Q' + r3(x + 0.035) + ' ' + r3(y + s - 0.035) + ' ' + r3(x + 0.035) + ' ' + r3(y + s - 0.155) + 'Z', fill: '#5B9BC2' }, g);
      var boat = el('g', { 'class': 'ece-boat' }, g);
      el('path', { d: 'M' + r3(cx - 0.02) + ' ' + r3(wy - 0.04) + 'V' + r3(wy - 0.48) + 'L' + r3(cx + 0.19) + ' ' + r3(wy - 0.1) + 'Z', fill: '#FFFFFF' }, boat);
      el('path', { d: 'M' + r3(cx - 0.2) + ' ' + r3(wy - 0.04) + 'H' + r3(cx + 0.22) + 'L' + r3(cx + 0.16) + ' ' + r3(wy + 0.06) + 'H' + r3(cx - 0.14) + 'Z', fill: '#E0453A' }, boat);
      out.boat = boat;
      el('rect', { x: x + 0.035, y: r3(py), width: 0.37, height: 0.06, fill: '#7D878C' }, g);
      el('rect', { x: x + s - 0.405, y: r3(py), width: 0.37, height: 0.06, fill: '#7D878C' }, g);
      el('rect', { x: x + 0.24, y: r3(py), width: 0.16, height: r3(wy - py + 0.1), fill: '#B9B2A2' }, g);
      el('rect', { x: x + s - 0.4, y: r3(py), width: 0.16, height: r3(wy - py + 0.1), fill: '#B9B2A2' }, g);
      var leaf = function (px, flip) {
        var lg = el('g', { transform: 'translate(' + r3(px) + ' ' + r3(py) + ') rotate(' + (flip ? 58 : -58) + ')' + (flip ? ' scale(-1 1)' : '') }, g);
        el('rect', { x: 0, y: -0.07, width: 0.44, height: 0.09, fill: '#2E6F95' }, lg);
        el('rect', { x: 0, y: -0.09, width: 0.44, height: 0.03, fill: '#E5822B' }, lg);
        return lg;
      };
      out.leafL = leaf(x + 0.4, false);
      out.leafR = leaf(x + s - 0.4, true);
      out.pivotL = { x: x + 0.4, y: py };
      out.pivotR = { x: x + s - 0.4, y: py };
      el('path', { d: 'M' + r3(x + 0.14) + ' ' + r3(y + 1.38) + 'q0.1 -0.05 0.2 0t0.2 0M' + r3(x + s - 0.54) + ' ' + r3(y + 1.38) + 'q0.1 -0.05 0.2 0t0.2 0',
        fill: 'none', stroke: '#FFFFFF', 'stroke-width': 0.025, opacity: 0.8 }, g);
    }
    return out;
  }

  var PIPS = { 1: [[0, 0]], 2: [[-1, -1], [1, 1]], 3: [[-1, -1], [0, 0], [1, 1]], 4: [[-1, -1], [1, -1], [-1, 1], [1, 1]],
    5: [[-1, -1], [1, -1], [0, 0], [-1, 1], [1, 1]], 6: [[-1, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [1, 1]] };

  function die(parent, cx, cy, s) {
    var g = el('g', { transform: 'translate(' + r3(cx) + ' ' + r3(cy) + ')', 'class': 'ece-die' }, parent);
    var inner = el('g', {}, g);
    el('rect', { x: r3(-s / 2 + s * 0.05), y: r3(-s / 2 + s * 0.12), width: r3(s), height: r3(s), rx: r3(s * 0.2), fill: '#0B1A20', opacity: 0.25 }, inner);
    var face = el('rect', { x: r3(-s / 2), y: r3(-s / 2), width: r3(s), height: r3(s), rx: r3(s * 0.2), fill: '#FFFFFF', stroke: '#C9CFCC', 'stroke-width': r3(s * 0.04) }, inner);
    var pips = [];
    for (var i = 0; i < 6; i++) pips.push(el('circle', { cx: 0, cy: 0, r: r3(s * 0.095), fill: COLORS.slate, visibility: 'hidden' }, inner));
    var cur = -1, curFaded = null;
    function set(n, faded) {
      n = n | 0;
      faded = !!faded;
      if (faded !== curFaded) {
        curFaded = faded;
        face.setAttribute('fill', faded ? '#F4F6F5' : '#FFFFFF');
        for (var f = 0; f < 6; f++) pips[f].setAttribute('fill', faded ? '#A9B4B8' : COLORS.slate);
      }
      if (n === cur) return;
      cur = n;
      var p = PIPS[n] || [];
      for (var j = 0; j < 6; j++) {
        if (j < p.length) {
          pips[j].setAttribute('cx', r3(p[j][0] * s * 0.26));
          pips[j].setAttribute('cy', r3(p[j][1] * s * 0.26));
          pips[j].setAttribute('visibility', 'visible');
        } else pips[j].setAttribute('visibility', 'hidden');
      }
    }
    return { g: g, inner: inner, set: set, x: cx, y: cy, s: s };
  }

  function cardFace(parent, deck, w, h, name) {
    var g = el('g', { 'class': 'ece-card ece-card-' + deck }, parent);
    var col = deck === 'rain' ? COLORS.rain : COLORS.buzz;
    el('rect', { x: r3(-w / 2), y: r3(-h / 2), width: r3(w), height: r3(h), rx: r3(w * 0.12), fill: col, stroke: '#FFFFFF', 'stroke-width': r3(w * 0.05) }, g);
    el('rect', { x: r3(-w / 2 + w * 0.09), y: r3(-h / 2 + w * 0.09), width: r3(w - w * 0.18), height: r3(h - w * 0.18), rx: r3(w * 0.07), fill: 'none',
      stroke: '#FFFFFF', 'stroke-width': r3(w * 0.025), opacity: 0.55 }, g);
    icon(g, deck, 0, -h * 0.13, w * 0.5, { fg: '#FFFFFF', cut: col });
    var words = String(name || '').split(' ');
    var fs = Math.max(0.17, w * 0.17);
    if (words.length > 1) {
      txt(g, 0, h * 0.2, words[0], fs, { 'font-weight': 800, fill: '#FFFFFF' });
      txt(g, 0, h * 0.2 + fs * 1.05, words.slice(1).join(' '), fs, { 'font-weight': 800, fill: '#FFFFFF' });
    } else txt(g, 0, h * 0.26, name || '', fs, { 'font-weight': 800, fill: '#FFFFFF' });
    return g;
  }

  function pile(parent, deck, cx, cy, w, h, name) {
    var g = el('g', { transform: 'translate(' + r3(cx) + ' ' + r3(cy) + ')', 'class': 'ece-pile ece-pile-' + deck }, parent);
    var col = deck === 'rain' ? '#245A79' : '#9E5A22';
    el('rect', { x: r3(-w / 2 + 0.06), y: r3(-h / 2 + 0.12), width: r3(w), height: r3(h), rx: r3(w * 0.12), fill: '#0B1A20', opacity: 0.22 }, g);
    for (var i = 2; i >= 1; i--) {
      el('rect', { x: r3(-w / 2 + i * 0.035), y: r3(-h / 2 + i * 0.045), width: r3(w), height: r3(h), rx: r3(w * 0.12), fill: col, stroke: '#FFFFFF', 'stroke-width': r3(w * 0.04) }, g);
    }
    cardFace(g, deck, w, h, name);
    return {
      g: g, x: cx, y: cy, w: w, h: h,
      card: function (p) { return cardFace(p, deck, w, h, name); }
    };
  }

  function jar(parent, cx, cy, w, h, label) {
    var g = el('g', { transform: 'translate(' + r3(cx) + ' ' + r3(cy) + ')', 'class': 'ece-jar' }, parent);
    var x0 = -w / 2, y0 = -h / 2;
    var body = 'M' + r3(x0 + w * 0.14) + ' ' + r3(y0 + h * 0.2) + 'H' + r3(x0 + w * 0.86) + 'C' + r3(x0 + w * 1.02) + ' ' + r3(y0 + h * 0.32) + ' ' + r3(x0 + w) + ' ' + r3(y0 + h * 0.5) +
      ' ' + r3(x0 + w) + ' ' + r3(y0 + h * 0.62) + 'V' + r3(y0 + h * 0.86) + 'C' + r3(x0 + w) + ' ' + r3(y0 + h * 0.95) + ' ' + r3(x0 + w * 0.92) + ' ' + r3(y0 + h) + ' ' + r3(x0 + w * 0.8) + ' ' + r3(y0 + h) +
      'H' + r3(x0 + w * 0.2) + 'C' + r3(x0 + w * 0.08) + ' ' + r3(y0 + h) + ' ' + r3(x0) + ' ' + r3(y0 + h * 0.95) + ' ' + r3(x0) + ' ' + r3(y0 + h * 0.86) + 'V' + r3(y0 + h * 0.62) +
      'C' + r3(x0) + ' ' + r3(y0 + h * 0.5) + ' ' + r3(x0 - w * 0.02) + ' ' + r3(y0 + h * 0.32) + ' ' + r3(x0 + w * 0.14) + ' ' + r3(y0 + h * 0.2) + 'Z';
    el('ellipse', { cx: 0.04, cy: r3(y0 + h + 0.05), rx: r3(w * 0.52), ry: 0.08, fill: '#0B1A20', opacity: 0.2 }, g);
    el('path', { d: body, fill: '#EAF5FA', opacity: 0.92 }, g);
    var clipId = 'ece-jarclip-' + (++jarSeq);
    var cp = el('clipPath', { id: clipId }, g);
    el('path', { d: body }, cp);
    var water = el('rect', { x: r3(x0 - 0.1), y: r3(y0 + h), width: r3(w + 0.2), height: r3(h), fill: '#58A4D0', 'clip-path': 'url(#' + clipId + ')' }, g);
    var coins = el('g', { 'clip-path': 'url(#' + clipId + ')' }, g);
    var coinList = [];
    for (var i = 0; i < 5; i++) {
      var c = el('ellipse', { cx: r3(x0 + w * (0.26 + (i % 3) * 0.24)), cy: r3(y0 + h * (0.9 - Math.floor(i / 3) * 0.1)), rx: r3(w * 0.13), ry: r3(w * 0.06), fill: COLORS.gold, stroke: COLORS.goldDark, 'stroke-width': 0.015, visibility: 'hidden' }, coins);
      coinList.push(c);
    }
    el('path', { d: body, fill: 'none', stroke: '#7FA9BE', 'stroke-width': 0.04 }, g);
    el('rect', { x: r3(x0 + w * 0.1), y: r3(y0 + h * 0.06), width: r3(w * 0.8), height: r3(h * 0.16), rx: 0.05, fill: COLORS.evergreen }, g);
    el('path', { d: 'M' + r3(x0 + w * 0.22) + ' ' + r3(y0 + h * 0.4) + 'V' + r3(y0 + h * 0.78), stroke: '#FFFFFF', 'stroke-width': 0.05, 'stroke-linecap': 'round', opacity: 0.8 }, g);
    var amount = txt(g, 0, r3(y0 + h * 0.66), '', Math.max(0.2, w * 0.27), { 'font-weight': 800, fill: COLORS.slate, stroke: '#FFFFFF', 'stroke-width': 0.05, 'paint-order': 'stroke' });
    var lab = label || 'Rain Fund', lw = Math.max(w * 1.05, lab.length * 0.118 + 0.2);
    el('rect', { x: r3(-lw / 2), y: r3(y0 + h + 0.07), width: r3(lw), height: 0.3, rx: 0.15, fill: COLORS.evergreen }, g);
    txt(g, 0, r3(y0 + h + 0.285), lab, 0.18, { 'font-weight': 800, fill: '#FFFFFF' });
    var last = null;
    return {
      g: g,
      set: function (text, frac) {
        var key = text + '|' + frac;
        if (key === last) return;
        last = key;
        amount.textContent = text;
        var f = Math.max(0, Math.min(1, frac || 0));
        var hh = (h * 0.72) * f;
        water.setAttribute('y', r3(y0 + h - hh));
        var n = Math.min(5, Math.ceil(f * 5));
        for (var k = 0; k < coinList.length; k++) coinList[k].setAttribute('visibility', k < n ? 'visible' : 'hidden');
      }
    };
  }
  var jarSeq = 0;

  function gavel(parent) {
    var g = el('g', { 'class': 'ece-gavel' }, parent);
    el('rect', { x: -0.04, y: -0.05, width: 0.62, height: 0.1, rx: 0.04, fill: '#B07A4E', stroke: '#6B4426', 'stroke-width': 0.02 }, g);
    el('rect', { x: -0.17, y: -0.16, width: 0.3, height: 0.32, rx: 0.06, fill: '#8A5A3B', stroke: '#5A3820', 'stroke-width': 0.025 }, g);
    el('rect', { x: -0.17, y: -0.035, width: 0.3, height: 0.07, fill: COLORS.gold }, g);
    return g;
  }

  function coin(parent, r) {
    var g = el('g', { 'class': 'ece-coin' }, parent);
    el('circle', { cx: r3(r * 0.12), cy: r3(r * 0.22), r: r3(r), fill: '#0B1A20', opacity: 0.2 }, g);
    el('circle', { cx: 0, cy: 0, r: r3(r), fill: COLORS.gold, stroke: COLORS.goldDark, 'stroke-width': r3(r * 0.16) }, g);
    el('circle', { cx: 0, cy: 0, r: r3(r * 0.58), fill: 'none', stroke: '#FFE4A0', 'stroke-width': r3(r * 0.12) }, g);
    return g;
  }

  var seq = 0;
  function centre(parent, rc, opts) {
    opts = opts || {};
    var id = 'ece-c' + (++seq);
    var g = el('g', { 'class': 'ece-centre' }, parent);
    var defs = el('defs', {}, g);
    var clip = el('clipPath', { id: id + '-clip' }, defs);
    el('rect', { x: rc.x, y: rc.y, width: rc.w, height: rc.h, rx: 0.28 }, clip);
    var sky = el('linearGradient', { id: id + '-sky', x1: 0, y1: 0, x2: 0, y2: 1 }, defs);
    el('stop', { offset: 0, 'stop-color': '#CFE4EC' }, sky);
    el('stop', { offset: 1, 'stop-color': '#DFEBEF' }, sky);
    var sea = el('linearGradient', { id: id + '-sea', x1: 0, y1: 0, x2: 0, y2: 1 }, defs);
    el('stop', { offset: 0, 'stop-color': '#6FA7C6' }, sea);
    el('stop', { offset: 0.45, 'stop-color': '#3F82AA' }, sea);
    el('stop', { offset: 1, 'stop-color': '#2E6F95' }, sea);

    var s = el('g', { 'clip-path': 'url(#' + id + '-clip)' }, g);
    var X = rc.x, Y = rc.y, W = rc.w, H = rc.h;
    var shore = Y + H * 0.43;
    el('rect', { x: X, y: Y, width: W, height: shore - Y + 0.2, fill: 'url(#' + id + '-sky)' }, s);

    var cl = el('g', { opacity: 0.9 }, s);
    var cx0 = X + W * 0.17, cy0 = Y + H * 0.215;
    el('path', { d: 'M' + r3(cx0 - 0.5) + ' ' + r3(cy0) + 'a0.22 0.22 0 0 1 0.2 -0.3a0.32 0.32 0 0 1 0.58 -0.08a0.24 0.24 0 0 1 0.36 0.2a0.2 0.2 0 0 1 0 0.38h-1.02a0.2 0.2 0 0 1 -0.12 -0.2z',
      'class': 'ece-cloud', fill: '#FFFFFF', opacity: 0.95 }, cl);
    var rain = '';
    for (var i = 0; i < 6; i++) {
      var rx = cx0 - 0.42 + i * 0.17, ry = cy0 + 0.3 + (i % 2) * 0.12;
      rain += 'M' + r3(rx) + ' ' + r3(ry) + 'l-0.08 0.22';
    }
    el('path', { d: rain, 'class': 'ece-rain', stroke: '#7FB2CF', 'stroke-width': 0.035, 'stroke-linecap': 'round', fill: 'none', opacity: 0.85 }, cl);

    var mx = X + W * 0.64, mBase = shore + 0.05, mH = W * 0.24, mTop = shore - mH;
    var mL = X + W * 0.06, mR = X + W * 1.02;
    var dome = 'M' + r3(mL) + ' ' + r3(mBase) + 'C' + r3(mL + W * 0.2) + ' ' + r3(mBase - mH * 0.14) + ' ' + r3(mx - W * 0.2) + ' ' + r3(mTop + mH * 0.34) + ' ' + r3(mx - W * 0.085) + ' ' + r3(mTop + mH * 0.07) +
      'Q' + r3(mx - W * 0.03) + ' ' + r3(mTop - mH * 0.005) + ' ' + r3(mx + W * 0.01) + ' ' + r3(mTop) +
      'Q' + r3(mx + W * 0.055) + ' ' + r3(mTop + mH * 0.005) + ' ' + r3(mx + W * 0.09) + ' ' + r3(mTop + mH * 0.06) +
      'C' + r3(mx + W * 0.2) + ' ' + r3(mTop + mH * 0.3) + ' ' + r3(mR - W * 0.17) + ' ' + r3(mBase - mH * 0.16) + ' ' + r3(mR) + ' ' + r3(mBase) + 'Z';
    var mClip = el('clipPath', { id: id + '-mtn' }, defs);
    el('path', { d: dome }, mClip);
    el('path', { d: dome, fill: '#A7BCC9' }, s);
    var mt = el('g', { 'clip-path': 'url(#' + id + '-mtn)' }, s);
    el('path', { d: 'M' + r3(mx + W * 0.02) + ' ' + r3(mTop - 0.1) + 'L' + r3(mR + 0.2) + ' ' + r3(mTop - 0.1) + 'V' + r3(mBase + 0.1) + 'H' + r3(mx + W * 0.08) + 'C' + r3(mx + W * 0.07) + ' ' + r3(mBase - mH * 0.5) + ' ' + r3(mx + W * 0.04) + ' ' + r3(mTop + mH * 0.3) + ' ' + r3(mx + W * 0.02) + ' ' + r3(mTop - 0.1) + 'Z', fill: '#93AABA' }, mt);
    var sl = mTop + mH * 0.4, snow = 'M' + r3(mL - 0.2) + ' ' + r3(mTop - 0.2) + 'H' + r3(mR + 0.2) + 'V' + r3(sl - mH * 0.06);
    var tongues = [[0.9, 0.04], [0.8, -0.08], [0.72, 0.1], [0.64, -0.05], [0.57, 0.13], [0.5, -0.04], [0.43, 0.11], [0.36, -0.07], [0.28, 0.06], [0.18, -0.1]];
    for (var tn = 0; tn < tongues.length; tn++) snow += 'L' + r3(X + W * tongues[tn][0]) + ' ' + r3(sl + mH * tongues[tn][1]);
    snow += 'L' + r3(mL - 0.2) + ' ' + r3(sl - mH * 0.1) + 'Z';
    el('path', { d: snow, fill: '#FFFFFF' }, mt);
    el('path', { d: dome, fill: 'none', stroke: '#A9BFCB', 'stroke-width': 0.022, 'stroke-linejoin': 'round' }, s);

    el('path', { d: 'M' + r3(X) + ' ' + r3(shore - 0.34) + 'C' + r3(X + W * 0.2) + ' ' + r3(shore - 0.62) + ' ' + r3(X + W * 0.36) + ' ' + r3(shore - 0.46) + ' ' + r3(X + W * 0.5) + ' ' + r3(shore - 0.28) +
      'V' + r3(shore + 0.1) + 'H' + r3(X) + 'Z', fill: '#7FA0AF' }, s);
    var hills = el('g', {}, s);
    el('path', { d: 'M' + r3(X) + ' ' + r3(shore - 0.08) + 'C' + r3(X + W * 0.16) + ' ' + r3(shore - 0.36) + ' ' + r3(X + W * 0.3) + ' ' + r3(shore - 0.3) + ' ' + r3(X + W * 0.42) + ' ' + r3(shore - 0.1) +
      'C' + r3(X + W * 0.6) + ' ' + r3(shore - 0.2) + ' ' + r3(X + W * 0.8) + ' ' + r3(shore - 0.36) + ' ' + r3(X + W) + ' ' + r3(shore - 0.16) + 'V' + r3(shore + 0.12) + 'H' + r3(X) + 'Z', fill: '#2C7652' }, hills);
    var treeXs = [0.04, 0.09, 0.14, 0.2, 0.26, 0.33, 0.62, 0.69, 0.76, 0.83, 0.9, 0.96];
    for (var t = 0; t < treeXs.length; t++) {
      var tx = X + W * treeXs[t];
      var th = 0.3 + ((t * 37) % 5) * 0.04;
      tree(hills, tx, shore + 0.04, th, t % 2 ? '#1F5F45' : '#195039');
    }

    var sk = el('g', {}, s);
    var bx = X + W * 0.38;
    var bl = [[0, 0.3, 0.62], [0.32, 0.24, 0.92], [0.58, 0.34, 1.22], [0.94, 0.26, 0.82], [1.22, 0.3, 1.04], [1.54, 0.22, 0.66], [1.78, 0.3, 0.84], [2.1, 0.26, 0.5]];
    for (var b = 0; b < bl.length; b++) {
      var x0 = bx + bl[b][0], bw = bl[b][1], bh = bl[b][2];
      var top = shore - bh;
      var d = b === 2 ? 'M' + r3(x0) + ' ' + r3(shore) + 'V' + r3(top + 0.14) + 'H' + r3(x0 + 0.06) + 'V' + r3(top) + 'H' + r3(x0 + bw - 0.06) + 'V' + r3(top + 0.14) + 'H' + r3(x0 + bw) + 'V' + r3(shore) + 'Z'
        : b === 4 ? 'M' + r3(x0) + ' ' + r3(shore) + 'V' + r3(top + 0.12) + 'L' + r3(x0 + bw) + ' ' + r3(top) + 'V' + r3(shore) + 'Z'
          : 'M' + r3(x0) + ' ' + r3(shore) + 'V' + r3(top) + 'H' + r3(x0 + bw) + 'V' + r3(shore) + 'Z';
      el('path', { d: d, fill: b % 2 ? '#47657A' : '#56768A' }, sk);
      var wd = '';
      for (var wy = top + 0.16; wy < shore - 0.08; wy += 0.14) wd += 'M' + r3(x0 + bw * 0.28) + ' ' + r3(wy) + 'H' + r3(x0 + bw * 0.42) + 'M' + r3(x0 + bw * 0.58) + ' ' + r3(wy) + 'H' + r3(x0 + bw * 0.72);
      el('path', { d: wd, stroke: '#E9D9A2', 'stroke-width': 0.035, opacity: 0.65, fill: 'none' }, sk);
    }

    el('rect', { x: X, y: shore, width: W, height: Y + H - shore, fill: 'url(#' + id + '-sea)' }, s);
    el('path', { d: 'M' + r3(X) + ' ' + r3(shore) + 'H' + r3(X + W), stroke: '#E4F0F4', 'stroke-width': 0.04, opacity: 0.7 }, s);
    var wv = '';
    var spots = [[0.12, 0.5], [0.7, 0.53], [0.4, 0.6], [0.86, 0.66], [0.18, 0.72], [0.55, 0.78], [0.3, 0.88], [0.8, 0.9], [0.1, 0.96], [0.62, 0.97]];
    for (var v = 0; v < spots.length; v++) {
      var wx = X + W * spots[v][0], wyy = Y + H * spots[v][1];
      wv += 'M' + r3(wx) + ' ' + r3(wyy) + 'q0.09 -0.06 0.18 0t0.18 0';
    }
    el('path', { d: wv, stroke: '#FFFFFF', 'stroke-width': 0.03, fill: 'none', opacity: 0.45, 'stroke-linecap': 'round' }, s);

    var fx = X + W * 0.2, fy = shore + 0.52;
    el('path', { d: 'M' + r3(fx - 0.5) + ' ' + r3(fy + 0.06) + 'q-0.3 0.03 -0.62 0.1M' + r3(fx - 0.46) + ' ' + r3(fy + 0.12) + 'q-0.26 0.06 -0.5 0.16', stroke: '#FFFFFF', 'stroke-width': 0.03, fill: 'none', opacity: 0.7 }, s);
    icon(s, 'ferry', fx, fy - 0.12, 1.0);

    var tg = el('g', { 'class': 'ece-title' }, g);
    var name = opts.title || 'Emerald City Estates';
    var words = name.split(' ');
    var last = words.pop();
    var tx0 = X + W / 2, ty0 = Y + H * 0.085;
    txt(tg, tx0, ty0, words.join(' '), 0.58, { 'font-weight': 800, fill: COLORS.evergreen, stroke: '#F4F8F5', 'stroke-width': 0.08, 'paint-order': 'stroke', 'stroke-linejoin': 'round' });
    txt(tg, tx0, ty0 + 0.42, last.toUpperCase(), 0.3, { 'font-weight': 800, fill: COLORS.emerald, 'letter-spacing': 0.12, stroke: '#F4F8F5', 'stroke-width': 0.06, 'paint-order': 'stroke' });
    el('path', { d: 'M' + r3(tx0 - 1.75) + ' ' + r3(ty0 + 0.32) + 'H' + r3(tx0 - 0.98) + 'M' + r3(tx0 + 0.98) + ' ' + r3(ty0 + 0.32) + 'H' + r3(tx0 + 1.75), stroke: COLORS.emerald, 'stroke-width': 0.035, 'stroke-linecap': 'round' }, tg);

    var midY = shore + (Y + H - shore) * 0.27;
    return {
      g: g,
      title: tg,
      shore: shore,
      dice: [{ x: X + W / 2 - 0.5, y: midY }, { x: X + W / 2 + 0.5, y: midY }],
      diceSize: 0.8,
      piles: { rain: { x: X + W * 0.22, y: Y + H * 0.79 }, buzz: { x: X + W * 0.78, y: Y + H * 0.79 } },
      pileSize: { w: 1.22, h: 1.62 },
      jar: { x: X + W / 2, y: Y + H * 0.775, w: 0.92, h: 1.06 },
      cardSpot: { x: X + W / 2, y: Y + H * 0.56 }
    };
  }

  ECE.Art = {
    FONT: FONT,
    COLORS: COLORS,
    GLYPHS: GLYPHS,
    el: el,
    text: txt,
    glyph: glyph,
    disc: disc,
    tokenIcon: tokenIcon,
    house: house,
    tower: tower,
    icon: icon,
    car: car,
    tree: tree,
    corner: corner,
    centre: centre,
    die: die,
    pile: pile,
    cardFace: cardFace,
    jar: jar,
    gavel: gavel,
    coin: coin,
    tagColors: tagColors,
    contrast: contrast
  };
})(window.ECE = window.ECE || {});
;
(function (ECE) {
  'use strict';

  var ROAD_W = 0.56;
  var ROAD_R = 0.3;
  var GAP = 0.035;
  var MIN_FONT = 0.165;
  var ZOOM = 2;
  var HOP = { normal: 85, fast: 38, instant: 0 };
  var PACE = { normal: 1, fast: 0.4, instant: 0 };
  var DICE_MS = 280;
  var MORT_BAND = '#9AA4A8';
  var MORT_TEXT = '#3A464C';

  var cache = null;

  function layout() {
    if (cache) return cache;
    var B = ECE.BoardData, L = B.LAYOUT;
    var W = L.widthUnits, H = L.heightUnits, n = L.count;
    var c = (W - L.top.length) / 2;
    var cells = new Array(n);
    var cs = ['tl', 'tr', 'br', 'bl'];
    var cxy = [[0, 0], [W - c, 0], [W - c, H - c], [0, H - c]];
    for (var q = 0; q < 4; q++) cells[L.corners[q]] = { x: cxy[q][0], y: cxy[q][1], w: c, h: c, side: 'corner', corner: cs[q] };
    L.top.forEach(function (i, k) { cells[i] = { x: c + k, y: 0, w: 1, h: c, side: 'top' }; });
    L.right.forEach(function (i, k) { cells[i] = { x: W - c, y: c + k, w: c, h: 1, side: 'right' }; });
    L.bottom.forEach(function (i, k) { cells[i] = { x: W - c - 1 - k, y: H - c, w: 1, h: c, side: 'bottom' }; });
    L.left.forEach(function (i, k) { cells[i] = { x: 0, y: H - c - 1 - k, w: c, h: 1, side: 'left' }; });
    var inner = { x: c, y: c, w: W - 2 * c, h: H - 2 * c };
    var scene = { x: c + ROAD_W, y: c + ROAD_W, w: W - 2 * (c + ROAD_W), h: H - 2 * (c + ROAD_W) };
    cache = { W: W, H: H, c: c, n: n, cells: cells, inner: inner, scene: scene, corners: L.corners.slice() };
    cache.road = road(cache);
    return cache;
  }

  function road(Lo) {
    var d = ROAD_W / 2, r = ROAD_R;
    var X0 = Lo.c + d, Y0 = Lo.c + d, X1 = Lo.W - Lo.c - d, Y1 = Lo.H - Lo.c - d;
    var Lt = X1 - X0 - 2 * r, Lr = Y1 - Y0 - 2 * r, A = Math.PI * r / 2;
    var segs = [Lt, A, Lr, A, Lt, A, Lr, A];
    var P = 2 * Lt + 2 * Lr + 4 * A;
    function mod(s) { s %= P; return s < 0 ? s + P : s; }
    function point(s) {
      s = mod(s);
      var k = 0;
      while (k < 7 && s > segs[k]) { s -= segs[k]; k++; }
      var a;
      switch (k) {
        case 0: return { x: X0 + r + s, y: Y0, tx: 1, ty: 0 };
        case 2: return { x: X1, y: Y0 + r + s, tx: 0, ty: 1 };
        case 4: return { x: X1 - r - s, y: Y1, tx: -1, ty: 0 };
        case 6: return { x: X0, y: Y1 - r - s, tx: 0, ty: -1 };
        case 1: a = -Math.PI / 2 + s / r; return { x: X1 - r + r * Math.cos(a), y: Y0 + r + r * Math.sin(a), tx: -Math.sin(a), ty: Math.cos(a) };
        case 3: a = s / r; return { x: X1 - r + r * Math.cos(a), y: Y1 - r + r * Math.sin(a), tx: -Math.sin(a), ty: Math.cos(a) };
        case 5: a = Math.PI / 2 + s / r; return { x: X0 + r + r * Math.cos(a), y: Y1 - r + r * Math.sin(a), tx: -Math.sin(a), ty: Math.cos(a) };
        default: a = Math.PI + s / r; return { x: X0 + r + r * Math.cos(a), y: Y0 + r + r * Math.sin(a), tx: -Math.sin(a), ty: Math.cos(a) };
      }
    }
    var stops = new Array(Lo.n);
    for (var i = 0; i < Lo.n; i++) {
      var cl = Lo.cells[i];
      if (cl.side === 'top') stops[i] = cl.x + 0.5 - (X0 + r);
      else if (cl.side === 'right') stops[i] = Lt + A + (cl.y + 0.5 - (Y0 + r));
      else if (cl.side === 'bottom') stops[i] = Lt + A + Lr + A + (X1 - r - (cl.x + 0.5));
      else if (cl.side === 'left') stops[i] = 2 * Lt + 3 * A + Lr + (Y1 - r - (cl.y + 0.5));
    }
    Lo.corners.forEach(function (ci) {
      var a = (ci - 2 + Lo.n) % Lo.n, b = (ci + 2) % Lo.n;
      var sa = stops[a], sb = stops[b];
      if (sb <= sa) sb += P;
      var step = (sb - sa) / 4;
      stops[(ci - 1 + Lo.n) % Lo.n] = mod(sa + step);
      stops[ci] = mod(sa + 2 * step);
      stops[(ci + 1) % Lo.n] = mod(sa + 3 * step);
    });
    return { X0: X0, Y0: Y0, X1: X1, Y1: Y1, r: r, P: P, point: point, mod: mod, stops: stops,
      ahead: function (a, b) { var ds = stops[b] - stops[a]; return ds < 0 ? ds + P : ds; } };
  }

  var CLUSTER = {
    1: { r: 0.29, at: [[0, 0]] },
    2: { r: 0.25, at: [[-0.25, 0], [0.25, 0]] },
    3: { r: 0.22, at: [[-0.4, 0], [0, 0], [0.4, 0]] },
    4: { r: 0.21, at: [[-0.21, 0.2], [0.21, 0.2], [-0.21, -0.2], [0.21, -0.2]] },
    5: { r: 0.19, at: [[-0.36, 0.18], [0, 0.18], [0.36, 0.18], [-0.36, -0.18], [0, -0.18]] },
    6: { r: 0.19, at: [[-0.36, 0.18], [0, 0.18], [0.36, 0.18], [-0.36, -0.18], [0, -0.18], [0.36, -0.18]] }
  };

  function clusterAt(stopPt, n, k) {
    var C = CLUSTER[Math.max(1, Math.min(6, n))] || CLUSTER[6];
    var o = C.at[Math.min(k, C.at.length - 1)];
    var tx = stopPt.tx, ty = stopPt.ty;
    if (Math.abs(tx) >= Math.abs(ty) - 1e-9) { tx = tx < 0 ? -1 : 1; ty = 0; } else { ty = ty < 0 ? -1 : 1; tx = 0; }
    var ox = ty, oy = -tx;
    return { x: stopPt.x + o[0] * tx + o[1] * ox, y: stopPt.y + o[0] * ty + o[1] * oy, r: C.r };
  }

  function stuckAt(rect, n, k) {
    n = Math.max(1, Math.min(6, n));
    var rows = n > 3 ? 2 : 1, perRow = Math.ceil(n / rows);
    var row = Math.floor(k / perRow), col = k % perRow;
    var inRow = row === rows - 1 ? n - perRow * (rows - 1) : perRow;
    var r = Math.min(0.22, rect.w / (perRow * 2.15), rect.h / (rows * 2.1));
    var gapX = rect.w / inRow, gapY = rect.h / rows;
    return { x: rect.x + gapX * (col + 0.5), y: rect.y + gapY * (row + 0.5), r: r };
  }

  function geometry(w, h) {
    var Lo = layout();
    w = Math.max(0, +w || 0); h = Math.max(0, +h || 0);
    var unit = Math.min(w / Lo.W, h / Lo.H);
    var ox = (w - unit * Lo.W) / 2, oy = (h - unit * Lo.H) / 2;
    function px(r) { return { x: ox + r.x * unit, y: oy + r.y * unit, w: r.w * unit, h: r.h * unit }; }
    return {
      unit: unit,
      board: { x: ox, y: oy, w: unit * Lo.W, h: unit * Lo.H },
      spaces: Lo.cells.map(function (c) {
        var o = px(c); o.side = c.side; if (c.corner) o.corner = c.corner; return o;
      }),
      center: px(Lo.scene),
      inner: px(Lo.inner)
    };
  }

  function r3(n) { return Math.round(n * 1000) / 1000; }
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function ease(t) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }
  function easeOut(t) { return 1 - (1 - t) * (1 - t); }
  function back(t) { var c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); }

  function hex(c) {
    var m = /^#?([0-9a-f]{6})$/i.exec(String(c || ''));
    var v = m ? parseInt(m[1], 16) : 0x888888;
    return [(v >> 16) & 255, (v >> 8) & 255, v & 255];
  }
  function mix(a, b, t) {
    var x = hex(a), y = hex(b);
    var o = '#';
    for (var i = 0; i < 3; i++) { var v = Math.round(x[i] + (y[i] - x[i]) * t); o += (v < 16 ? '0' : '') + v.toString(16); }
    return o.toUpperCase();
  }

  function money(n) {
    if (ECE.Util && typeof ECE.Util.money === 'function') { try { return ECE.Util.money(n); } catch (e) { } }
    n = Math.round(Number(n) || 0);
    return (n < 0 ? '-$' : '$') + String(Math.abs(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  function signed(n) { return (n >= 0 ? '+' : '-') + money(Math.abs(n)); }

  var reported = false;
  function report(e, where) {
    try {
      if (ECE.Dom && typeof ECE.Dom.report === 'function') { ECE.Dom.report(e, 'board:' + where); return; }
      if (ECE.App && typeof ECE.App.report === 'function') { ECE.App.report(e, 'board:' + where); return; }
    } catch (e2) { }
    if (!reported) { reported = true; try { console.error('[ece board] ' + where, e); } catch (e3) { } }
  }

  function measurer(weight) {
    var ctx = null;
    try { ctx = document.createElement('canvas').getContext('2d'); } catch (e) { ctx = null; }
    var memo = {};
    return function (s) {
      var key = weight + '|' + s;
      if (memo[key] !== undefined) return memo[key];
      var w = 0;
      if (ctx) {
        try { ctx.font = weight + ' 100px ' + ECE.Art.FONT; w = ctx.measureText(s).width / 100; } catch (e) { w = 0; }
      }
      if (!(w > 0)) {
        for (var i = 0; i < s.length; i++) {
          var ch = s.charAt(i);
          w += /[ilj.,'!| ]/.test(ch) ? 0.3 : /[ftrI]/.test(ch) ? 0.4 : /[mwMW]/.test(ch) ? 0.92 : /[A-Z]/.test(ch) ? 0.7 : 0.6;
        }
      }
      memo[key] = w;
      return w;
    };
  }

  function fitFont(lines, em, maxW, maxF) {
    var wide = 0;
    for (var i = 0; i < lines.length; i++) wide = Math.max(wide, em(lines[i]));
    if (!(wide > 0)) return { f: maxF, squeeze: false };
    var f = Math.min(maxF, maxW / wide);
    if (f >= MIN_FONT) return { f: f, squeeze: false };
    if (MIN_FONT * wide <= maxW / 0.88) return { f: MIN_FONT, squeeze: true };
    return null;
  }

  function View(container, opts) {
    this.opts = opts || {};
    this.container = container;
    this.model = null;
    this.drawn = { spaces: [], tokens: {}, dice: null, jar: null, turn: undefined, hl: '' };
    this.tokens = {};
    this.flying = {};
    this.queue = Promise.resolve();
    this.queued = 0;
    this.pendingRender = null;
    this.tweens = [];
    this.raf = 0;
    this.destroyed = false;
    this.highlighted = null;
    this.cam = { on: false, z: ZOOM, cx: 5, cy: 7, follow: null, panned: false, vb: null, coverPx: 0, hostH: 0 };
    this.popSlots = {};
    this.drawnCards = [];
    this.noteOn = false;
    this.centreTop = null;
    this.build();
  }

  View.prototype.build = function () {
    var A = ECE.Art, B = ECE.BoardData, Lo = layout();
    var el = A.el;
    var root = document.createElement('div');
    root.className = 'ece-board';
    var svg = el('svg', { viewBox: '0 0 ' + Lo.W + ' ' + Lo.H, preserveAspectRatio: 'xMidYMid meet', 'class': 'ece-board-svg',
      role: 'img', 'aria-label': 'Game board', 'font-family': A.FONT, focusable: 'false' });
    this.root = root; this.svg = svg;
    root.appendChild(svg);

    var defs = el('defs', {}, svg);
    this.uid = 'eceb' + (++View.seq);
    var pat = el('pattern', { id: this.uid + '-hatch', patternUnits: 'userSpaceOnUse', width: 0.16, height: 0.16, patternTransform: 'rotate(45)' }, defs);
    el('rect', { x: 0, y: 0, width: 0.16, height: 0.16, fill: A.COLORS.mortgage }, pat);
    el('rect', { x: 0, y: 0, width: 0.055, height: 0.16, fill: A.COLORS.hatch, opacity: 0.3 }, pat);

    el('rect', { x: 0, y: 0, width: Lo.W, height: Lo.H, rx: 0.24, fill: A.COLORS.boardBase, stroke: A.COLORS.boardEdge, 'stroke-width': 0.04 }, svg);

    this.gRoad = el('g', { 'class': 'ece-road' }, svg);
    this.gCentre = el('g', { 'class': 'ece-centre-layer' }, svg);
    this.gSpaces = el('g', { 'class': 'ece-spaces' }, svg);
    this.gHl = el('g', { 'class': 'ece-hl-layer' }, svg);
    this.gLive = el('g', { 'class': 'ece-live' }, svg);
    this.gTokens = el('g', { 'class': 'ece-tokens' }, svg);
    this.gFx = el('g', { 'class': 'ece-fx' }, svg);

    this.drawRoad();
    this.anchors = A.centre(this.gCentre, Lo.scene, { title: (ECE.Glossary && ECE.Glossary.game && ECE.Glossary.game.name) || 'Emerald City Estates' });

    var emB = measurer(700), emP = measurer(600), emT = measurer(800);
    this.em = { b: emB, p: emP, t: emT };
    this.tiles = [];
    for (var i = 0; i < Lo.n; i++) this.tiles.push(this.buildTile(i));

    var an = this.anchors, decks = (ECE.CardData && ECE.CardData.DECKS) || {};
    this.piles = {
      rain: A.pile(this.gLive, 'rain', an.piles.rain.x, an.piles.rain.y, an.pileSize.w, an.pileSize.h, (decks.rain && decks.rain.name) || 'Rain Check'),
      buzz: A.pile(this.gLive, 'buzz', an.piles.buzz.x, an.piles.buzz.y, an.pileSize.w, an.pileSize.h, (decks.buzz && decks.buzz.name) || 'Local Buzz')
    };
    var jarLabel = (ECE.Glossary && ECE.Glossary.places && ECE.Glossary.places.rainFund) || 'Rain Fund';
    this.jar = A.jar(this.gLive, an.jar.x, an.jar.y, an.jar.w, an.jar.h, jarLabel);
    this.jar.g.setAttribute('visibility', 'hidden');
    this.dice = [A.die(this.gLive, an.dice[0].x, an.dice[0].y, an.diceSize), A.die(this.gLive, an.dice[1].x, an.dice[1].y, an.diceSize)];
    this.diceG = this.dice.map(function (d) { return d.g; });
    this.home = { dice: [{ x: an.dice[0].x, y: an.dice[0].y }, { x: an.dice[1].x, y: an.dice[1].y }], jar: { x: an.jar.x, y: an.jar.y } };

    this.bindInput();
    this.container.appendChild(root);
    this.applyCamera();
  };
  View.seq = 0;

  View.prototype.drawRoad = function () {
    var A = ECE.Art, Lo = layout(), R = Lo.road, el = A.el, C = A.COLORS;
    var o = Lo.inner, ix = o.x + ROAD_W, iy = o.y + ROAD_W, iw = o.w - 2 * ROAD_W, ih = o.h - 2 * ROAD_W, ir = 0.18;
    var outer = 'M' + o.x + ' ' + o.y + 'H' + (o.x + o.w) + 'V' + (o.y + o.h) + 'H' + o.x + 'Z';
    var innerP = 'M' + r3(ix + ir) + ' ' + r3(iy) + 'H' + r3(ix + iw - ir) + 'Q' + r3(ix + iw) + ' ' + r3(iy) + ' ' + r3(ix + iw) + ' ' + r3(iy + ir) +
      'V' + r3(iy + ih - ir) + 'Q' + r3(ix + iw) + ' ' + r3(iy + ih) + ' ' + r3(ix + iw - ir) + ' ' + r3(iy + ih) + 'H' + r3(ix + ir) +
      'Q' + r3(ix) + ' ' + r3(iy + ih) + ' ' + r3(ix) + ' ' + r3(iy + ih - ir) + 'V' + r3(iy + ir) + 'Q' + r3(ix) + ' ' + r3(iy) + ' ' + r3(ix + ir) + ' ' + r3(iy) + 'Z';
    el('path', { d: outer + innerP, 'fill-rule': 'evenodd', fill: C.asphalt }, this.gRoad);
    el('rect', { x: o.x + 0.035, y: o.y + 0.035, width: o.w - 0.07, height: o.h - 0.07, fill: 'none', stroke: '#8D989D', 'stroke-width': 0.02, opacity: 0.8 }, this.gRoad);
    el('path', { d: innerP, fill: 'none', stroke: '#E9E2CF', 'stroke-width': 0.05 }, this.gRoad);
    var x0 = R.X0, y0 = R.Y0, x1 = R.X1, y1 = R.Y1, r = R.r;
    var mid = 'M' + r3(x0 + r) + ' ' + r3(y0) + 'H' + r3(x1 - r) + 'A' + r + ' ' + r + ' 0 0 1 ' + r3(x1) + ' ' + r3(y0 + r) + 'V' + r3(y1 - r) +
      'A' + r + ' ' + r + ' 0 0 1 ' + r3(x1 - r) + ' ' + r3(y1) + 'H' + r3(x0 + r) + 'A' + r + ' ' + r + ' 0 0 1 ' + r3(x0) + ' ' + r3(y1 - r) +
      'V' + r3(y0 + r) + 'A' + r + ' ' + r + ' 0 0 1 ' + r3(x0 + r) + ' ' + r3(y0) + 'Z';
    el('path', { d: mid, fill: 'none', stroke: C.dash, 'stroke-width': 0.035, 'stroke-dasharray': '0.17 0.13', 'stroke-linecap': 'round', opacity: 0.95 }, this.gRoad);
  };

  View.prototype.buildTile = function (i) {
    var A = ECE.Art, B = ECE.BoardData, C = A.COLORS, el = A.el, Lo = layout();
    var s = B.SPACES[i], cell = Lo.cells[i];
    var t = { i: i, s: s, cell: cell, kind: s.kind };
    var g = el('g', { 'class': 'ece-space ece-k-' + s.kind, 'data-space': i }, this.gSpaces);
    t.g = g;
    if (cell.side === 'corner') {
      var info = { salary: money(B.RULES.salary), em: this.em.t, minFont: MIN_FONT, road: s.kind === 'traffic' ? (s.area || 'I-5') : '' };
      var kind = s.kind === 'start' ? 'start' : s.kind === 'traffic' ? 'traffic' : s.kind === 'rest' ? 'rest' : 'bridge';
      t.corner = A.corner(g, kind, cell.x, cell.y, cell.w, s.label || [s.name], info);
      if (kind === 'traffic') this.stuckRect = t.corner.stuck;
      if (kind === 'bridge') this.bridge = t.corner;
      t.card = { x: cell.x + GAP, y: cell.y + GAP, w: cell.w - 2 * GAP, h: cell.h - 2 * GAP };
      t.hoverEl = el('rect', { x: r3(t.card.x), y: r3(t.card.y), width: r3(t.card.w), height: r3(t.card.h), rx: 0.12, fill: 'none', 'class': 'ece-hover' }, g);
      return t;
    }
    var portrait = cell.side === 'top' || cell.side === 'bottom';
    var outerFirst = cell.side === 'top' || cell.side === 'left';
    var card = { x: cell.x + GAP, y: cell.y + GAP, w: cell.w - 2 * GAP, h: cell.h - 2 * GAP };
    t.card = card;
    var d = B.districtOf(i);
    var ownable = B.isOwnable(i);
    var tint = d ? mix(d.color, C.tile, 0.8) : s.kind === 'transit' ? C.transitTint : s.kind === 'utility' ? C.utilityTint :
      s.kind === 'tax' ? C.taxTint : s.deck === 'rain' ? C.rainTint : C.buzzTint;
    t.tint = tint;
    t.cardEl = el('rect', { x: r3(card.x), y: r3(card.y), width: r3(card.w), height: r3(card.h), rx: 0.09, fill: tint, 'class': 'ece-card-bg' }, g);
    t.hatch = el('rect', { x: r3(card.x), y: r3(card.y), width: r3(card.w), height: r3(card.h), rx: 0.09, fill: 'url(#' + this.uid + '-hatch)', visibility: 'hidden' }, g);

    var bandD = portrait ? 0.3 : 0.31;
    var iconD = ownable ? (portrait ? 0.44 : 0.4) : (portrait ? 0.54 : 0.44);
    var outerD = d ? bandD : iconD;
    var ownD = ownable && portrait ? 0.34 : 0;
    var depth = portrait ? card.h : card.w;
    var along = portrait ? card.w : card.h;
    var u2 = function (u) {
      if (portrait) return outerFirst ? card.y + u : card.y + card.h - u;
      return outerFirst ? card.x + u : card.x + card.w - u;
    };
    var acrossMid = portrait ? card.x + card.w / 2 : card.y + card.h / 2;
    t.portrait = portrait;

    if (d) {
      var b0 = u2(0), b1 = u2(bandD);
      var band = portrait ? { x: card.x, y: Math.min(b0, b1), w: card.w, h: bandD } : { x: Math.min(b0, b1), y: card.y, w: bandD, h: card.h };
      t.band = band;
      var rr = 0.09;
      var tc = A.tagColors(d.color);
      t.tagColors = tc;
      t.bandEl = el('path', { d: bandPath(band, cell.side, rr), fill: tc.fill, 'class': 'ece-band' }, g);
      var tf = Math.max(MIN_FONT, Math.min(0.18, (band.w - 0.04) / (this.em.t(d.tag) || 1.4)));
      t.tagEl = A.text(g, band.x + band.w / 2, band.y + band.h / 2 + tf * 0.36, d.tag, tf, { 'font-weight': 800, fill: tc.text, 'class': 'ece-tag' });
      t.tagF = tf; t.tagText = d.tag;
      t.buildG = el('g', { 'class': 'ece-build' }, g);
      t.level = 0;
    } else {
      var iconName = s.kind === 'transit' ? (s.mode || 'train') : s.kind === 'utility' ? (/dam|power/i.test(s.name) ? 'dam' : 'drop') :
        s.kind === 'tax' ? (/toll/i.test(s.name) ? 'toll' : 'tax') : s.kind === 'card' ? (s.deck === 'rain' ? 'rain' : 'buzz') : 'drop';
      var isz = Math.min(iconD - 0.08, along - 0.2, portrait ? 0.44 : 0.36);
      var ic = portrait ? { x: acrossMid, y: (u2(0) + u2(iconD)) / 2 } : { x: (u2(0) + u2(iconD)) / 2, y: acrossMid };
      A.icon(g, iconName, ic.x, ic.y, isz);
    }

    var textD0 = outerD + 0.03, textD1 = depth - ownD - 0.04;
    var lines = (s.label && s.label.length ? s.label : [s.name]).slice(0, 2);
    var priceText = s.price ? money(s.price) : s.kind === 'tax' ? money(s.amount) : '';
    var hasPrice = !!priceText;
    var pf = portrait ? 0.19 : 0.2;
    var textW, lineMaxF, rows;
    if (portrait) {
      textW = card.w - 0.08;
      var avail = textD1 - textD0;
      rows = lines.length + (hasPrice ? 1 : 0);
      lineMaxF = Math.min(0.23, (avail - (hasPrice ? pf * 1.25 : 0)) / (lines.length * 1.18 + 0.1));
    } else {
      textW = (textD1 - textD0) - 0.06;
      lineMaxF = 0.235;
    }
    var fit = fitFont(lines, this.em.b, textW, lineMaxF);
    t.fit = fit;
    var lf = fit ? fit.f : 0;
    var showLabel = !!fit;
    var positions = [];
    if (portrait) {
      var lh = lf * 1.16;
      var blockH = (showLabel ? lh * lines.length : 0) + (hasPrice ? pf * 1.3 : 0);
      var zA = Math.min(u2(textD0), u2(textD1)), zB = Math.max(u2(textD0), u2(textD1));
      var top = (zA + zB) / 2 - blockH / 2;
      for (var k = 0; k < (showLabel ? lines.length : 0); k++) positions.push({ x: acrossMid, y: top + lh * (k + 0.5) });
      if (hasPrice) t.pricePos = { x: acrossMid, y: top + (showLabel ? lh * lines.length : 0) + pf * 0.72 };
      if (ownable) t.ownerPos = { x: acrossMid, y: u2(depth - ownD / 2 - 0.01) };
    } else {
      var cxText = (u2(textD0) + u2(textD1)) / 2;
      var lh2 = Math.max(lf, 0.2) * 1.14;
      var rowsH = (showLabel ? lh2 * lines.length : 0) + (hasPrice ? pf * 1.22 : 0);
      var y0 = card.y + card.h / 2 - rowsH / 2;
      for (var k2 = 0; k2 < (showLabel ? lines.length : 0); k2++) positions.push({ x: cxText, y: y0 + lh2 * (k2 + 0.5) });
      var py = y0 + (showLabel ? lh2 * lines.length : 0) + pf * 0.62;
      if (ownable) {
        var ou = depth - 0.2;
        t.ownerPos = { x: u2(ou), y: py };
        var pu = (textD0 + ou - 0.16) / 2;
        t.pricePos = { x: u2(pu), y: py };
      } else if (hasPrice) t.pricePos = { x: cxText, y: py };
    }
    t.labelEls = [];
    if (showLabel) {
      for (var m = 0; m < lines.length; m++) {
        var attrs = { 'font-weight': 700, fill: C.text, 'class': 'ece-label' };
        if (fit.squeeze && this.em.b(lines[m]) * lf > textW) { attrs.textLength = r3(textW); attrs.lengthAdjust = 'spacingAndGlyphs'; }
        t.labelEls.push(A.text(g, positions[m].x, positions[m].y + lf * 0.36, lines[m], lf, attrs));
      }
    }
    t.lf = lf;
    if (hasPrice) {
      var label = priceText;
      if (s.kind === 'tax') {
        var payW = this.em.p('Pay ' + priceText) * pf;
        if (payW <= textW) label = 'Pay ' + priceText;
      }
      t.priceEl = A.text(g, t.pricePos.x, t.pricePos.y + pf * 0.36, label, pf, { 'font-weight': 600, fill: C.textSoft, 'class': 'ece-price' });
      t.pf = pf;
    }
    if (ownable) {
      t.ownerG = el('g', { transform: 'translate(' + r3(t.ownerPos.x) + ' ' + r3(t.ownerPos.y) + ')', 'class': 'ece-owner', visibility: 'hidden' }, g);
      t.ownerInner = el('g', {}, t.ownerG);
      t.owner = null;
      var mp = t.pricePos || t.ownerPos;
      t.mortG = el('g', { 'class': 'ece-mort', visibility: 'hidden', transform: 'translate(' + r3(mp.x) + ' ' + r3(mp.y) + ')' }, g);
      el('rect', { x: -0.17, y: -0.14, width: 0.34, height: 0.28, rx: 0.07, fill: C.slate }, t.mortG);
      A.text(t.mortG, 0, 0.075, 'M', 0.2, { 'font-weight': 800, fill: '#FFFFFF' });
      t.mortgaged = false;
    }
    t.hoverEl = el('rect', { x: r3(card.x), y: r3(card.y), width: r3(card.w), height: r3(card.h), rx: 0.09, fill: 'none', 'class': 'ece-hover' }, g);
    return t;
  };

  function bandPath(b, side, r) {
    var x0 = b.x, y0 = b.y, x1 = b.x + b.w, y1 = b.y + b.h;
    var tl = side === 'top' || side === 'left' ? r : 0, tr = side === 'top' || side === 'right' ? r : 0;
    var br = side === 'bottom' || side === 'right' ? r : 0, bl = side === 'bottom' || side === 'left' ? r : 0;
    return 'M' + r3(x0 + tl) + ' ' + r3(y0) + 'H' + r3(x1 - tr) + (tr ? 'Q' + r3(x1) + ' ' + r3(y0) + ' ' + r3(x1) + ' ' + r3(y0 + tr) : '') +
      'V' + r3(y1 - br) + (br ? 'Q' + r3(x1) + ' ' + r3(y1) + ' ' + r3(x1 - br) + ' ' + r3(y1) : '') + 'H' + r3(x0 + bl) +
      (bl ? 'Q' + r3(x0) + ' ' + r3(y1) + ' ' + r3(x0) + ' ' + r3(y1 - bl) : '') + 'V' + r3(y0 + tl) + (tl ? 'Q' + r3(x0) + ' ' + r3(y0) + ' ' + r3(x0 + tl) + ' ' + r3(y0) : '') + 'Z';
  }

  function wrapPos(v) { var n = ECE.BoardData.SPACES.length; v = v | 0; return ((v % n) + n) % n; }

  function modelFrom(state, you) {
    var B = ECE.BoardData;
    var m = { you: you === undefined ? null : you, players: [], byId: {}, props: new Array(B.SPACES.length), dice: null, turn: null,
      fundOn: false, fund: 0 };
    if (!state || !state.players) return m;
    for (var i = 0; i < state.players.length; i++) {
      var p = state.players[i];
      var mp = { id: p.id, token: p.token, color: p.color, name: p.name, pos: wrapPos(p.pos), stuck: !!p.stuck, out: !!p.out };
      m.players.push(mp);
      m.byId[p.id] = mp;
    }
    var props = state.props || {};
    for (var k in props) {
      if (!Object.prototype.hasOwnProperty.call(props, k)) continue;
      var pr = props[k], idx = +k;
      if (!pr || !(idx >= 0 && idx < m.props.length)) continue;
      m.props[idx] = { owner: pr.owner, level: pr.level | 0, mortgaged: !!pr.mortgaged };
    }
    m.dice = state.dice && state.dice.length === 2 ? [state.dice[0] | 0, state.dice[1] | 0] : null;
    m.lastRoll = null;
    if (!m.dice && state.log && state.log.length) {
      for (var li = state.log.length - 1; li >= 0; li--) {
        var le = state.log[li];
        if (le && le.t === 'dice' && !le.forRent && le.d && le.d.length === 2) { m.lastRoll = [le.d[0] | 0, le.d[1] | 0]; break; }
      }
    }
    var tp = state.players[state.turn];
    m.turn = state.phase === 'over' || !tp ? null : tp.id;
    m.fundOn = !!(state.rules && state.rules.rainFund);
    m.fund = state.rainFund | 0;
    return m;
  }

  View.prototype.render = function (state, opts) {
    if (this.destroyed) return;
    try {
      opts = opts || {};
      if (this.queued) { this.pendingRender = { state: state, opts: opts }; return; }
      var gk = state ? String(state.seed) + '|' + String(state.createdAt) : '';
      if (gk !== this.gameKey) { this.gameKey = gk; this.lastDice = null; this.drawn.dice = null; }
      this.model = modelFrom(state, opts.you);
      this.draw();
    } catch (e) { report(e, 'render'); }
  };

  View.prototype.draw = function () {
    var m = this.model;
    if (!m) return;
    for (var i = 0; i < this.tiles.length; i++) this.drawTile(this.tiles[i], m.props[i] || null, m);
    this.drawTokens(false);
    this.drawDice(m.dice, m.lastRoll);
    this.drawJar();
  };

  View.prototype.drawTile = function (t, pr, m) {
    if (!t.ownerG) return;
    var A = ECE.Art, C = A.COLORS;
    var owner = pr ? pr.owner : null;
    var op = owner !== null && owner !== undefined ? m.byId[owner] : null;
    var key = op ? owner + '|' + op.token + '|' + op.color : '';
    if (t.owner !== key) {
      t.owner = key;
      while (t.ownerInner.firstChild) t.ownerInner.removeChild(t.ownerInner.firstChild);
      if (op) {
        A.disc(t.ownerInner, op.token, op.color, 0.135, { rim: 0.16, glyph: 0.7 });
        t.ownerG.setAttribute('visibility', 'visible');
      } else t.ownerG.setAttribute('visibility', 'hidden');
    }
    var level = pr ? pr.level : 0;
    if (t.buildG && t.level !== level) {
      t.level = level;
      this.drawBuildings(t, level);
    }
    var mort = !!(pr && pr.mortgaged);
    if (t.mortgaged !== mort) {
      t.mortgaged = mort;
      t.hatch.setAttribute('visibility', mort ? 'visible' : 'hidden');
      t.mortG.setAttribute('visibility', mort ? 'visible' : 'hidden');
      if (t.priceEl) t.priceEl.setAttribute('visibility', mort ? 'hidden' : 'visible');
      if (t.bandEl) t.bandEl.setAttribute('fill', mort ? MORT_BAND : t.tagColors.fill);
      if (t.tagEl) t.tagEl.setAttribute('fill', mort ? C.text : t.tagColors.text);
      for (var k = 0; k < t.labelEls.length; k++) t.labelEls[k].setAttribute('fill', mort ? MORT_TEXT : C.text);
      t.g.setAttribute('class', 'ece-space ece-k-' + t.kind + (mort ? ' ece-mortgaged' : ''));
    }
  };

  View.prototype.placeTag = function (t, level) {
    var b = t.band, tg = t.tagEl, tf = t.tagF;
    var wT = (this.em.t(t.tagText) || 1.4) * tf;
    var x, y, zone;
    if (level <= 0) { x = b.x + b.w / 2; y = b.y + b.h / 2 + tf * 0.36; zone = null; }
    else if (t.portrait) {
      x = b.x + 0.05 + wT / 2; y = b.y + b.h / 2 + tf * 0.36;
      var zx = b.x + 0.05 + wT + 0.03;
      zone = { x: zx, y: b.y, w: b.x + b.w - 0.03 - zx, h: b.h };
    } else {
      x = b.x + b.w / 2; y = b.y + 0.05 + tf * 0.86;
      var zy = b.y + 0.05 + tf * 1.12;
      zone = { x: b.x, y: zy, w: b.w, h: b.y + b.h - 0.03 - zy };
    }
    var k = r3(x) + ' ' + r3(y);
    if (t.tagAt !== k) { t.tagAt = k; tg.setAttribute('x', r3(x)); tg.setAttribute('y', r3(y)); }
    tg.setAttribute('visibility', 'visible');
    return zone;
  };

  View.prototype.drawBuildings = function (t, level) {
    var A = ECE.Art, g = t.buildG, b = t.band;
    while (g.firstChild) g.removeChild(g.firstChild);
    var z = this.placeTag(t, level);
    if (level <= 0 || !z) return;
    if (level >= 5) {
      if (t.portrait) A.tower(g, z.x + z.w / 2, b.y + b.h - 0.025, 0.18, b.h - 0.05);
      else A.tower(g, b.x + b.w / 2, z.y + z.h - 0.01, 0.2, Math.min(0.62, z.h - 0.03));
      return;
    }
    var hs = 0.128, gap = 0.026;
    for (var k = 0; k < level; k++) {
      if (t.portrait) {
        var total = level * hs + (level - 1) * gap;
        A.house(g, z.x + z.w / 2 - total / 2 + hs / 2 + k * (hs + gap), b.y + b.h / 2 + hs * 0.46, hs);
      } else {
        var totalV = level * hs * 0.92 + (level - 1) * gap;
        A.house(g, b.x + b.w / 2, z.y + z.h / 2 - totalV / 2 + hs * 0.92 + k * (hs * 0.92 + gap), hs);
      }
    }
  };

  View.prototype.tokenNode = function (p) {
    var A = ECE.Art, el = A.el;
    var tk = this.tokens[p.id];
    var key = p.token + '|' + p.color;
    if (tk && tk.key === key) return tk;
    if (tk) this.gTokens.removeChild(tk.g);
    var g = el('g', { 'class': 'ece-token' }, this.gTokens);
    var halo = el('g', { 'class': 'ece-halo', visibility: 'hidden' }, g);
    el('circle', { cx: 0, cy: 0, r: 1.34, fill: p.color, opacity: 0.3, 'class': 'ece-halo-glow' }, halo);
    el('circle', { cx: 0, cy: 0, r: 1.17, fill: 'none', stroke: '#FFFFFF', 'stroke-width': 0.2 }, halo);
    var body = el('g', {}, g);
    A.disc(body, p.token, p.color, 1, { shadow: true, rim: 0.13, glyph: 0.68 });
    var you = el('circle', { cx: 0, cy: 0, r: 1.07, fill: 'none', stroke: '#1D2A30', 'stroke-width': 0.07, visibility: 'hidden' }, body);
    tk = { g: g, halo: halo, body: body, youRing: you, key: key, x: null, y: null, r: null, lift: 0, scale: 1, shown: null, op: 1 };
    this.tokens[p.id] = tk;
    return tk;
  };

  View.prototype.restPositions = function () {
    var m = this.model, Lo = layout(), R = Lo.road;
    var out = {}, groups = {};
    var order = m.players.slice();
    order.sort(function (a, b) { return rank(a) - rank(b); });
    function rank(p) { return p.id === m.turn ? 2 : p.id === m.you ? 1 : 0; }
    for (var i = 0; i < order.length; i++) {
      var p = order[i];
      if (p.out) continue;
      var key = p.stuck ? 'stuck' : String(p.pos);
      (groups[key] = groups[key] || []).push(p);
    }
    for (var k in groups) {
      var list = groups[k];
      for (var j = 0; j < list.length; j++) {
        var at;
        if (k === 'stuck' && this.stuckRect) at = stuckAt(this.stuckRect, list.length, j);
        else at = clusterAt(R.point(R.stops[(+k) % Lo.n]), list.length, j);
        out[list[j].id] = at;
      }
    }
    return { at: out, order: order };
  };

  View.prototype.drawTokens = function (animate) {
    var m = this.model;
    if (!m) return;
    var rest = this.restPositions();
    var seen = {};
    var orderKey = rest.order.map(function (q) { return q.id; }).join(',');
    var reorder = orderKey !== this.drawn.order;
    this.drawn.order = orderKey;
    for (var i = 0; i < rest.order.length; i++) {
      var p = rest.order[i];
      seen[p.id] = true;
      var tk = this.tokenNode(p);
      if (reorder || tk.g.parentNode !== this.gTokens) this.gTokens.appendChild(tk.g);
      if (p.out) { hideToken(tk); continue; }
      if (tk.shown !== true) { tk.g.setAttribute('visibility', 'visible'); tk.shown = true; tk.g.setAttribute('opacity', 1); }
      var cur = p.id === m.turn;
      var hv = cur ? 'visible' : 'hidden';
      if (tk.haloV !== hv) { tk.halo.setAttribute('visibility', hv); tk.haloV = hv; }
      var yv = p.id === m.you && !cur ? 'visible' : 'hidden';
      if (tk.youV !== yv) { tk.youRing.setAttribute('visibility', yv); tk.youV = yv; }
      if (this.flying[p.id]) continue;
      var at = rest.at[p.id];
      var r = at.r * (cur ? 1.08 : 1);
      if (animate && tk.x !== null && (Math.abs(tk.x - at.x) > 0.01 || Math.abs(tk.y - at.y) > 0.01 || Math.abs(tk.r - r) > 0.005)) {
        this.slideToken(p.id, tk, at.x, at.y, r, 130);
      } else this.placeToken(tk, at.x, at.y, r, 0);
    }
    for (var id in this.tokens) {
      if (!seen[id]) hideToken(this.tokens[id]);
    }
  };

  function hideToken(tk) {
    if (tk.shown !== false) { tk.g.setAttribute('visibility', 'hidden'); tk.shown = false; }
    if (tk.haloV !== 'hidden') { tk.halo.setAttribute('visibility', 'hidden'); tk.haloV = 'hidden'; }
    if (tk.youV !== 'hidden') { tk.youRing.setAttribute('visibility', 'hidden'); tk.youV = 'hidden'; }
  }

  View.prototype.placeToken = function (tk, x, y, r, lift) {
    lift = lift || 0;
    var key = r3(x) + ' ' + r3(y - lift) + ' ' + r3(r * (1 + lift * 0.9));
    if (tk.tf === key) return;
    tk.tf = key;
    tk.x = x; tk.y = y; tk.r = r;
    tk.g.setAttribute('transform', 'translate(' + r3(x) + ' ' + r3(y - lift) + ') scale(' + r3(r * (1 + lift * 0.9)) + ')');
  };

  View.prototype.slideToken = function (id, tk, x, y, r, ms) {
    var self = this, x0 = tk.x, y0 = tk.y, r0 = tk.r;
    var token = {};
    tk.slide = token;
    return this.tween(ms * this.pace(), function (k) {
      if (tk.slide !== token) return;
      var e = ease(k);
      self.placeToken(tk, x0 + (x - x0) * e, y0 + (y - y0) * e, r0 + (r - r0) * e, 0);
    });
  };

  View.prototype.drawDice = function (d, fromLog) {
    var faded = false;
    if (d) this.lastDice = d;
    else if (this.lastDice) { d = this.lastDice; faded = true; }
    else if (fromLog) { d = fromLog; faded = true; }
    var key = d ? d[0] + ',' + d[1] + (faded ? 'f' : '') : '';
    if (this.drawn.dice === key) return;
    this.drawn.dice = key;
    this.dice[0].set(d ? d[0] : 0, faded);
    this.dice[1].set(d ? d[1] : 0, faded);
  };

  View.prototype.drawJar = function () {
    var m = this.model;
    var on = !!(m && m.fundOn);
    if (this.drawn.jarOn !== on) {
      this.drawn.jarOn = on;
      this.jar.g.setAttribute('visibility', on ? 'visible' : 'hidden');
      if (this.centreTop !== null && this.centreTop !== undefined) this.placeCentre();
    }
    if (on) this.jar.set(money(m.fund), Math.min(1, m.fund / 1000));
  };

  View.prototype.setNote = function (on) {
    on = !!on;
    if (this.destroyed || this.noteOn === on) return;
    this.noteOn = on;
    for (var i = 0; i < 2; i++) this.dice[i].g.setAttribute('opacity', on ? 0 : 1);
    if (on) this.dropCards();
  };
  View.prototype.dropCards = function () {
    var list = this.drawnCards.splice(0);
    for (var i = 0; i < list.length; i++) if (list[i].parentNode) list[i].parentNode.removeChild(list[i]);
  };
  View.prototype.setTitle = function (on) {
    var tg = this.anchors && this.anchors.title;
    if (!tg) return;
    var v = on === false ? 'hidden' : 'visible';
    if (this.drawn.title !== v) { this.drawn.title = v; tg.setAttribute('visibility', v); }
  };

  View.prototype.setCentreInset = function (topU) {
    if (this.destroyed) return;
    this.centreTop = topU === null || topU === undefined || !(topU > 0) ? null : topU;
    this.placeCentre();
  };
  View.prototype.placeCentre = function () {
    var top = this.centreTop, jarOn = !!this.drawn.jarOn;
    var key = (top === null || top === undefined ? '' : r3(top)) + '|' + jarOn;
    if (this.centreKey === key) return;
    this.centreKey = key;
    var an = this.anchors, H = this.home, Lo = layout(), sc = Lo.scene, ds = an.diceSize;
    var dice = [H.dice[0], H.dice[1]], jar = H.jar;
    if (top !== null && top !== undefined) {
      var lim = top - 0.14;
      var bandTop = sc.y + sc.h * 0.085 + 0.62;
      var diceHit = H.dice[0].y + ds * 0.62 > lim;
      var jarHit = jarOn && H.jar.y + an.jar.h / 2 + 0.4 > lim;
      if (diceHit || jarHit) {
        var mid = (bandTop + lim) / 2;
        if (jarOn) {
          dice = [{ x: sc.x + sc.w * 0.25, y: mid }, { x: sc.x + sc.w * 0.25 + ds * 1.2, y: mid }];
          var jy = Math.max(bandTop + an.jar.h / 2, Math.min(mid - 0.18, lim - an.jar.h / 2 - 0.4));
          jar = { x: sc.x + sc.w * 0.76, y: jy };
        } else dice = [{ x: H.dice[0].x, y: mid }, { x: H.dice[1].x, y: mid }];
      }
    }
    for (var i = 0; i < 2; i++) {
      this.dice[i].g.setAttribute('transform', 'translate(' + r3(dice[i].x) + ' ' + r3(dice[i].y) + ')');
      this.dice[i].x = dice[i].x; this.dice[i].y = dice[i].y;
      an.dice[i].x = dice[i].x; an.dice[i].y = dice[i].y;
    }
    this.jar.g.setAttribute('transform', 'translate(' + r3(jar.x) + ' ' + r3(jar.y) + ')');
    an.jar.x = jar.x; an.jar.y = jar.y;
  };

  View.prototype.focusScreen = function () {
    if (this.destroyed) return null;
    try {
      var pt = this.focusPoint();
      var vb = this.cam.on ? this.viewBox() : (this.cam.vb || this.viewBox());
      var rc = this.svg.getBoundingClientRect();
      var sc = Math.min(rc.width / vb[2], rc.height / vb[3]);
      if (!(sc > 0)) return null;
      var ox = (rc.width - vb[2] * sc) / 2, oy = (rc.height - vb[3] * sc) / 2;
      var tk = this.tokens[this.followId()];
      var r = ((tk && tk.r) || 0.29) * sc;
      return { x: rc.left + ox + (pt.x - vb[0]) * sc, y: rc.top + oy + (pt.y - vb[1]) * sc, r: r };
    } catch (e) { report(e, 'focusScreen'); return null; }
  };

  View.prototype.pace = function () { return this.speedK === undefined ? 1 : this.speedK; };

  View.prototype.tween = function (ms, fn) {
    var self = this;
    return new Promise(function (resolve) {
      if (self.destroyed || !(ms > 0) || hidden()) { try { fn(1); } catch (e) { report(e, 'tween'); } resolve(); return; }
      var tw = { t0: null, ms: ms, fn: fn, resolve: resolve, done: false };
      tw.guard = setTimeout(function () { finish(self, tw); }, ms + 600);
      self.tweens.push(tw);
      if (!self.raf) self.raf = requestAnimationFrame(function (now) { self.frame(now); });
    });
  };

  function finish(view, tw) {
    if (tw.done) return;
    tw.done = true;
    clearTimeout(tw.guard);
    try { tw.fn(1); } catch (e) { report(e, 'tween'); }
    tw.resolve();
    var k = view.tweens.indexOf(tw);
    if (k >= 0) view.tweens.splice(k, 1);
  }

  View.prototype.frame = function (now) {
    this.raf = 0;
    if (this.destroyed) return;
    var list = this.tweens.slice();
    for (var i = 0; i < list.length; i++) {
      var tw = list[i];
      if (tw.done) continue;
      if (tw.t0 === null) tw.t0 = now;
      var k = (now - tw.t0) / tw.ms;
      if (k >= 1) { finish(this, tw); continue; }
      try { tw.fn(k < 0 ? 0 : k); } catch (e) { report(e, 'frame'); finish(this, tw); }
    }
    if (this.camDirty) { this.camDirty = false; this.applyCamera(); }
    var self = this;
    if (this.tweens.length) this.raf = requestAnimationFrame(function (n) { self.frame(n); });
  };

  View.prototype.wait = function (ms) { return this.tween(ms, function () {}); };

  function hidden() { try { return typeof document !== 'undefined' && document.hidden === true; } catch (e) { return false; } }

  View.prototype.play = function (events, opts) {
    var self = this;
    this.queued++;
    var run = function () { return self.run(events || [], opts || {}); };
    var p = this.queue.then(run, run).then(null, function (e) { report(e, 'play'); })
      .then(function () { self.afterPlay(); }).then(null, function (e) { report(e, 'afterPlay'); });
    this.queue = p;
    return p;
  };

  View.prototype.busy = function () { return this.queued > 0; };

  View.prototype.run = function (events, opts) {
    var self = this;
    if (this.destroyed || !this.model) return Promise.resolve();
    var speed = opts.speed === 'fast' || opts.speed === 'instant' ? opts.speed : 'normal';
    if (opts.you !== undefined) this.model.you = opts.you;
    var reduce = opts.reduceMotion === true || opts.reduceMotion === 'on' || (opts.reduceMotion !== false && opts.reduceMotion !== 'off' && prefersReduced());
    if (speed === 'instant' || hidden()) {
      for (var i = 0; i < events.length; i++) { try { this.apply(events[i], events, i); } catch (e) { report(e, 'apply'); } }
      this.draw();
      return Promise.resolve();
    }
    this.speedK = PACE[speed];
    this.hopMs = HOP[speed];
    this.reduce = reduce;
    var idx = 0;
    function next() {
      if (self.destroyed) return Promise.resolve();
      if (idx >= events.length) return Promise.resolve();
      var ev = events[idx], at = idx;
      idx++;
      var p;
      try { p = self.animate(ev, events, at); } catch (e) { report(e, 'animate'); p = null; }
      return Promise.resolve(p).then(null, function (e) { report(e, 'animate'); }).then(next);
    }
    return next().then(function () { self.speedK = undefined; self.reduce = false; });
  };

  View.prototype.afterPlay = function () {
    this.queued = Math.max(0, this.queued - 1);
    if (this.queued || this.destroyed) return;
    this.flying = {};
    if (this.pendingRender) {
      var pr = this.pendingRender;
      this.pendingRender = null;
      this.model = modelFrom(pr.state, pr.opts.you);
    }
    this.drawTokens(true);
    this.draw();
  };

  function prefersReduced() {
    try { return typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { return false; }
  }

  var SPACE_EVENTS = { buy: 1, buyAsk: 1, auction: 1, auctionEnd: 1, build: 1, sell: 1, mortgage: 1, unmortgage: 1, rent: 1, tax: 1, land: 1 };
  function badSpace(ev) {
    return !!SPACE_EVENTS[ev.t] && ev.space !== null && ev.space !== undefined &&
      !(ev.space === (ev.space | 0) && ev.space >= 0 && ev.space < ECE.BoardData.SPACES.length);
  }

  View.prototype.apply = function (ev, list, at) {
    var m = this.model, B = ECE.BoardData;
    if (!ev || !m || badSpace(ev)) return;
    var p = ev.p !== undefined && ev.p !== null ? m.byId[ev.p] : null;
    switch (ev.t) {
      case 'dice': if (ev.d) m.dice = [ev.d[0] | 0, ev.d[1] | 0]; break;
      case 'move':
        if (p) {
          p.pos = wrapPos(ev.to);
          if (ev.to !== B.TRAFFIC) p.stuck = false;
          else if (list && near(list, at, 'traffic', ev.p, 3)) p.stuck = true;
        }
        break;
      case 'traffic': if (p) { p.stuck = true; p.pos = B.TRAFFIC; } break;
      case 'leave': if (p) p.stuck = false; break;
      case 'buy': m.props[ev.space] = { owner: ev.p, level: 0, mortgaged: false }; break;
      case 'auctionEnd': if (ev.winner !== null && ev.winner !== undefined) m.props[ev.space] = { owner: ev.winner, level: 0, mortgaged: false }; break;
      case 'build': case 'sell': if (m.props[ev.space]) m.props[ev.space].level = ev.level | 0; break;
      case 'mortgage': if (m.props[ev.space]) m.props[ev.space].mortgaged = true; break;
      case 'unmortgage': if (m.props[ev.space]) m.props[ev.space].mortgaged = false; break;
      case 'trade':
        var of = ev.offer;
        if (of) {
          moveSpaces(m, (of.give && of.give.spaces) || [], of.to);
          moveSpaces(m, (of.get && of.get.spaces) || [], of.from);
        }
        break;
      case 'bankrupt':
        if (p) {
          p.out = true;
          var heir = ev.to !== null && ev.to !== undefined && m.byId[ev.to] ? ev.to : null;
          for (var i = 0; i < m.props.length; i++) {
            var pr = m.props[i];
            if (!pr || pr.owner !== ev.p) continue;
            m.props[i] = heir !== null ? { owner: heir, level: 0, mortgaged: pr.mortgaged } : null;
          }
          var sh = ev.shares || [];
          for (var k = 0; k < sh.length; k++) if (sh[k] && sh[k].fund) m.fund += Math.abs(sh[k].amount | 0);
        }
        break;
      case 'fund': m.fund = 0; break;
      case 'tax': if (ev.fund === true || (ev.fund === undefined && m.fundOn)) m.fund += Math.abs(ev.amount | 0); break;
      case 'cash': if (ev.fund === true && ev.amount < 0) m.fund += Math.abs(ev.amount | 0); break;
      case 'turn': m.turn = ev.p; break;
      case 'over': m.turn = null; break;
      default: break;
    }
  };

  function moveSpaces(m, spaces, to) {
    for (var i = 0; i < spaces.length; i++) {
      var pr = m.props[spaces[i]];
      if (pr) pr.owner = to; else m.props[spaces[i]] = { owner: to, level: 0, mortgaged: false };
    }
  }

  function near(list, at, t, p, span) {
    for (var k = Math.max(0, at - span); k < list.length && k <= at + span; k++) {
      if (k !== at && list[k] && list[k].t === t && list[k].p === p) return list[k];
    }
    return null;
  }

  function isPlayer(m, id) { return id !== null && id !== undefined && !!m.byId[id]; }

  View.prototype.animate = function (ev, list, at) {
    var self = this, m = this.model, B = ECE.BoardData, k = this.pace();
    if (!ev || badSpace(ev)) return null;
    var jar = this.anchors.jar;
    switch (ev.t) {
      case 'dice':
        this.apply(ev);
        return this.rollDice(ev.d, DICE_MS * k);
      case 'move':
        return this.moveToken(ev, list, at);
      case 'salary':
        this.popAt(ev.p, signed(ev.amount | 0), true);
        return this.wait(130 * k);
      case 'buy':
        this.apply(ev);
        this.drawTile(this.tiles[ev.space], m.props[ev.space], m);
        this.ownerPop(ev.space);
        this.popAt(ev.p, signed(-(ev.price | 0)), false);
        return this.wait(180 * k);
      case 'auction':
        return this.gavelAt(ev.space, false);
      case 'auctionEnd':
        this.apply(ev);
        this.drawTile(this.tiles[ev.space], m.props[ev.space], m);
        if (isPlayer(m, ev.winner)) {
          this.ownerPop(ev.space);
          this.popAt(ev.winner, signed(-(ev.amount | 0)), false);
        }
        return this.gavelAt(ev.space, true);
      case 'rent':
        this.popAt(ev.p, signed(-(ev.amount | 0)), false);
        return this.coinFly(this.tokenPoint(ev.p), this.tokenPoint(ev.owner), 300 * k).then(function () {
          self.popAt(ev.owner, signed(ev.amount | 0), true);
          return self.wait(60 * k);
        });
      case 'tax':
        var toFund = ev.fund === true || (ev.fund === undefined && m.fundOn);
        this.apply(ev);
        this.popAt(ev.p, signed(-Math.abs(ev.amount | 0)), false);
        if (toFund && m.fundOn) return this.coinFly(this.tokenPoint(ev.p), { x: jar.x, y: jar.y }, 420 * k).then(function () { self.drawJar(); });
        return this.wait(300 * k);
      case 'card':
        return this.cardDraw(ev.deck);
      case 'cash':
        var amount = ev.amount | 0;
        this.apply(ev);
        if (amount) this.popAt(ev.p, signed(amount), amount > 0);
        if (amount < 0 && isPlayer(m, ev.to)) {
          return this.coinFly(this.tokenPoint(ev.p), this.tokenPoint(ev.to), 360 * k).then(function () {
            self.popAt(ev.to, signed(-amount), true);
            return self.wait(100 * k);
          });
        }
        if (amount < 0 && ev.fund === true && m.fundOn) return this.coinFly(this.tokenPoint(ev.p), { x: jar.x, y: jar.y }, 400 * k).then(function () { self.drawJar(); });
        return this.wait(220 * k);
      case 'traffic':
        var tp = m.byId[ev.p];
        var already = tp && tp.stuck && tp.pos === B.TRAFFIC;
        this.apply(ev);
        var chain = ev.reason === 'bridge' ? this.raiseBridge() : Promise.resolve();
        var mv = near(list || [], at, 'move', ev.p, 3);
        if (already || (mv && mv.to === B.TRAFFIC)) return chain;
        return chain.then(function () { return self.settle(ev.p, 300); });
      case 'leave':
        this.apply(ev);
        if (ev.amount > 0) this.popAt(ev.p, signed(-ev.amount), false);
        return this.settle(ev.p, 260);
      case 'build':
      case 'sell':
        this.apply(ev);
        this.drawTile(this.tiles[ev.space], m.props[ev.space], m);
        this.buildPop(ev.space);
        var cost = ev.amount !== undefined ? Math.abs(ev.amount | 0) :
          ev.t === 'build' ? B.buildCost(ev.space) : Math.round(B.buildCost(ev.space) * B.RULES.sellShare);
        if (cost) this.popSpace(ev.space, signed(ev.t === 'build' ? -cost : cost), ev.t !== 'build');
        return this.wait(100 * k);
      case 'mortgage':
      case 'unmortgage':
        this.apply(ev);
        this.drawTile(this.tiles[ev.space], m.props[ev.space], m);
        this.tilePulse(ev.space);
        if (ev.amount) this.popSpace(ev.space, signed(ev.t === 'mortgage' ? Math.abs(ev.amount) : -Math.abs(ev.amount)), ev.t === 'mortgage');
        return this.wait(120 * k);
      case 'trade':
        this.apply(ev);
        var of = ev.offer || {};
        var sp = [].concat((of.give && of.give.spaces) || [], (of.get && of.get.spaces) || []);
        for (var i = 0; i < sp.length; i++) { this.drawTile(this.tiles[sp[i]], m.props[sp[i]], m); this.ownerPop(sp[i]); }
        if (of.give && of.give.cash) { this.popAt(of.from, signed(-of.give.cash), false); this.popAt(of.to, signed(of.give.cash), true); }
        if (of.get && of.get.cash) { this.popAt(of.to, signed(-of.get.cash), false); this.popAt(of.from, signed(of.get.cash), true); }
        return this.wait(320 * k);
      case 'debt':
        return this.tokenPulse(ev.p);
      case 'bankrupt':
        var gone = this.tokens[ev.p];
        this.apply(ev);
        for (var s = 0; s < this.tiles.length; s++) this.drawTile(this.tiles[s], m.props[s], m);
        if (isPlayer(m, ev.to) && ev.amount > 0) this.popAt(ev.to, signed(ev.amount | 0), true);
        var shares = ev.shares || [];
        for (var q = 0; q < shares.length; q++) if (shares[q] && isPlayer(m, shares[q].id) && shares[q].amount > 0) this.popAt(shares[q].id, signed(shares[q].amount | 0), true);
        this.drawJar();
        if (gone && gone.shown) {
          return this.tween(520 * k, function (t) { gone.g.setAttribute('opacity', r3(1 - t)); }).then(function () { self.drawTokens(true); });
        }
        return this.wait(200 * k);
      case 'fund':
        var amt = ev.amount | 0;
        this.apply(ev);
        this.drawJar();
        return this.coinFly({ x: jar.x, y: jar.y }, this.tokenPoint(ev.p), 420 * k).then(function () {
          self.popAt(ev.p, signed(amt), true);
          return self.wait(160 * k);
        });
      case 'turn':
        this.apply(ev);
        this.drawTokens(true);
        if (this.cam.on && (this.cam.follow === null || this.cam.follow === undefined)) { this.cam.panned = false; this.centreOn(ev.p, true); }
        return this.wait(60 * k);
      default:
        this.apply(ev, list, at);
        return null;
    }
  };

  View.prototype.tokenPoint = function (pid) {
    var tk = this.tokens[pid];
    if (tk && tk.x !== null && tk.shown) return { x: tk.x, y: tk.y, r: tk.r };
    var rest = this.model ? this.restPositions().at[pid] : null;
    return rest || { x: 5, y: 7, r: 0.25 };
  };

  View.prototype.moveToken = function (ev, list, at) {
    var self = this, m = this.model, Lo = layout(), R = Lo.road, B = ECE.BoardData;
    var p = m.byId[ev.p];
    if (!p) return null;
    var tk = this.tokenNode(p);
    var from = (ev.from | 0) % Lo.n, to = (ev.to | 0) % Lo.n;
    var steps = ev.steps | 0;
    var fwd = (to - from + Lo.n) % Lo.n;
    var jump = !!ev.jump || steps < 0 || (steps === 0 && from !== to && fwd === 0);
    if (!jump && steps <= 0) steps = fwd;
    var start = { x: tk.x !== null ? tk.x : R.point(R.stops[from]).x, y: tk.y !== null ? tk.y : R.point(R.stops[from]).y, r: tk.r || 0.29 };
    this.apply(ev, list, at);
    this.flying[p.id] = true;
    this.drawTokens(true);
    this.gTokens.appendChild(tk.g);
    this.drawn.order = null;
    var follow = this.cam.on && this.followId() === p.id;
    if (follow) this.cam.panned = false;
    var land = function () {
      self.flying[p.id] = false;
      self.drawTokens(true);
      if (follow && !self.cam.panned) self.centreOn(p.id, true);
    };
    if (this.reduce || steps === 0 && !jump) {
      var restA = this.restPositions().at[p.id];
      if (restA) this.placeToken(tk, restA.x, restA.y, restA.r, 0);
      land();
      return this.wait(this.reduce ? 160 * this.pace() : 0);
    }
    if (jump) {
      var dest = this.restPositions().at[p.id];
      var half = 150 * this.pace();
      return this.tween(half, function (q) { tk.g.setAttribute('opacity', r3(1 - q)); }).then(function () {
        self.placeToken(tk, dest.x, dest.y, dest.r, 0);
        if (follow && !self.cam.panned) self.centreOn(p.id, false);
        return self.tween(half, function (q) { tk.g.setAttribute('opacity', r3(q)); });
      }).then(function () { tk.g.setAttribute('opacity', 1); land(); });
    }
    var per = this.hopMs;
    if (steps * per > 1300 * this.pace()) per = 1300 * this.pace() / steps;
    var total = steps * per;
    var offX = start.x - R.point(R.stops[from]).x, offY = start.y - R.point(R.stops[from]).y;
    var s0 = R.stops[from];
    var segs = [];
    var acc = 0;
    for (var i = 0; i < steps; i++) {
      var a = (from + i) % Lo.n, b = (from + i + 1) % Lo.n;
      var ds = R.ahead(a, b);
      segs.push({ s: s0 + acc, ds: ds });
      acc += ds;
    }
    var r0 = start.r, r1 = 0.29;
    return this.tween(total, function (q) {
      var f = q * steps, hi = Math.min(steps - 1, Math.floor(f)), u = f - hi;
      if (q >= 1) { hi = steps - 1; u = 1; }
      var sg = segs[hi];
      var pt = R.point(sg.s + sg.ds * ease(u));
      var x = pt.x, y = pt.y;
      if (hi === 0) { x += offX * (1 - u); y += offY * (1 - u); }
      var lift = Math.sin(Math.PI * u) * 0.32;
      var rr = hi === 0 ? r0 + (r1 - r0) * u : r1;
      self.placeToken(tk, x, y, rr, lift * 0.3);
      if (follow && !self.cam.panned) self.camTo(x, y);
    }).then(land);
  };

  View.prototype.settle = function (pid, ms) {
    var self = this, m = this.model;
    var p = m.byId[pid];
    if (!p) return null;
    var tk = this.tokenNode(p);
    var dest = this.restPositions().at[pid];
    if (!dest || tk.x === null || this.reduce) { this.drawTokens(false); return this.wait(100 * this.pace()); }
    var start = { x: tk.x, y: tk.y, r: tk.r };
    this.flying[pid] = true;
    var follow = this.cam.on && this.followId() === pid && !this.cam.panned;
    return this.tween(ms * this.pace(), function (q) {
      var e = ease(q), lift = Math.sin(Math.PI * q) * 0.5;
      var x = start.x + (dest.x - start.x) * e, y = start.y + (dest.y - start.y) * e;
      self.placeToken(tk, x, y, start.r + (dest.r - start.r) * e, lift * 0.4);
      if (follow) self.camTo(x, y);
    }).then(function () { self.flying[pid] = false; self.drawTokens(true); });
  };

  View.prototype.rollDice = function (d, ms) {
    var self = this;
    if (!d || this.reduce) { this.drawDice(d || null); return this.wait(this.reduce ? 120 : 0); }
    this.drawn.dice = null;
    var last = -1;
    var dice = this.dice;
    for (var i = 0; i < 2; i++) dice[i].g.setAttribute('opacity', 1);
    return this.tween(ms, function (q) {
      var tick = Math.floor(q * 7);
      if (q < 1 && tick !== last) {
        last = tick;
        for (var j = 0; j < 2; j++) {
          dice[j].set(1 + Math.floor(Math.random() * 6));
          var rot = (Math.random() * 2 - 1) * 24 * (1 - q);
          var dy = -Math.sin(Math.PI * q) * 0.22;
          dice[j].inner.setAttribute('transform', 'translate(0 ' + r3(dy) + ') rotate(' + r3(rot) + ')');
        }
      }
      if (q >= 1) {
        for (var k2 = 0; k2 < 2; k2++) dice[k2].inner.setAttribute('transform', '');
        self.drawn.dice = null;
        self.drawDice(d);
      }
    }).then(function () {
      return self.tween(50 * self.pace(), function (q) {
        var sc = 1 + Math.sin(Math.PI * q) * 0.08;
        for (var j2 = 0; j2 < 2; j2++) dice[j2].inner.setAttribute('transform', q >= 1 ? '' : 'scale(' + r3(sc) + ')');
      });
    });
  };

  var POP_F = 0.32, POP_DESC = 0.085;
  View.prototype.titleBox = function () {
    if (this.tBox !== undefined) return this.tBox;
    var box = null;
    try {
      var tg = this.anchors && this.anchors.title, t = null;
      var kids = tg ? (tg.children || tg.childNodes || []) : [];
      for (var i = 0; i < kids.length && !t; i++) if (String(kids[i].tagName || '').toLowerCase() === 'text') t = kids[i];
      if (t) {
        var f = parseFloat(t.getAttribute('font-size')) || 0.58, x = parseFloat(t.getAttribute('x')), y = parseFloat(t.getAttribute('y'));
        var w = (this.em.t(String(t.textContent || '')) || 6) * f + 0.08;
        if (isFinite(x) && isFinite(y)) box = { x: x - w / 2, y: y - f * 0.78 - 0.04, w: w, h: f + 0.08 };
      }
    } catch (e) { box = null; }
    this.tBox = box;
    return box;
  };

  View.prototype.popAt = function (pid, textS, plus) {
    var pt = this.tokenPoint(pid);
    if (pt.y < layout().c + ROAD_W + 0.2) this.pop(pt.x, pt.y + (pt.r || 0.25) + 0.3, textS, plus, 'p' + pid, true);
    else this.pop(pt.x, pt.y - (pt.r || 0.25) - 0.22, textS, plus, 'p' + pid);
  };

  View.prototype.popSpace = function (i, textS, plus) {
    var t = this.tiles[i];
    if (!t) return;
    var c = t.card;
    this.pop(c.x + c.w / 2, c.y + c.h / 2, textS, plus, 's' + i);
  };

  View.prototype.pop = function (x, y, textS, plus, slotKey, down) {
    var A = ECE.Art, C = A.COLORS, self = this;
    var now = Date.now();
    var slot = this.popSlots[slotKey];
    var n = slot && now - slot.t < 600 ? slot.n + 1 : 0;
    this.popSlots[slotKey] = { t: now, n: n };
    var Lo = layout();
    if (down) x += (n % 2 ? 1 : -1) * Math.ceil(n / 2) * 0.8;
    else y -= n * 0.34;
    x = clamp(x, 0.7, Lo.W - 0.7);
    y = clamp(y, 0.35, Lo.H - 0.2);
    var rise = this.reduce ? 0 : down ? -0.36 : 0.5;
    if (down) {
      var tb = this.titleBox(), hw = (this.em.t(String(textS)) || 3) * POP_F / 2 + 0.15;
      if (tb && x + hw > tb.x && x - hw < tb.x + tb.w) {
        var low = tb.y - 0.03 - POP_DESC;
        if (y > low) y = low;
        rise = -Math.max(0, Math.min(-rise, low - y));
      }
    }
    var g = A.el('g', { 'class': 'ece-pop', transform: 'translate(' + r3(x) + ' ' + r3(y) + ')' }, this.gFx);
    A.text(g, 0, 0, textS, POP_F, { 'font-weight': 800, fill: plus ? C.plus : C.minus, stroke: '#FFFFFF', 'stroke-width': 0.085,
      'paint-order': 'stroke', 'stroke-linejoin': 'round' });
    var ms = 1000 * Math.max(0.6, this.pace());
    this.tween(ms, function (q) {
      var e = easeOut(q);
      g.setAttribute('transform', 'translate(' + r3(x) + ' ' + r3(y - rise * e) + ') scale(' + r3(q < 0.15 ? 0.7 + 2 * q : 1) + ')');
      g.setAttribute('opacity', r3(q < 0.6 ? 1 : 1 - (q - 0.6) / 0.4));
      if (q >= 1 && g.parentNode) g.parentNode.removeChild(g);
    });
  };

  View.prototype.ownerPop = function (i) {
    var t = this.tiles[i];
    if (!t || !t.ownerInner || this.reduce) return;
    var inner = t.ownerInner;
    this.tween(300 * this.pace(), function (q) {
      inner.setAttribute('transform', q >= 1 ? '' : 'scale(' + r3(Math.max(0.01, back(q))) + ')');
    });
  };

  View.prototype.buildPop = function (i) {
    var t = this.tiles[i];
    if (!t || !t.buildG || this.reduce) return;
    var b = t.band, cx = b.x + b.w / 2, cy = b.y + b.h / 2, g = t.buildG;
    this.tween(320 * this.pace(), function (q) {
      var sc = q >= 1 ? 1 : Math.max(0.01, back(q));
      g.setAttribute('transform', q >= 1 ? '' : 'translate(' + r3(cx) + ' ' + r3(cy) + ') scale(' + r3(sc) + ') translate(' + r3(-cx) + ' ' + r3(-cy) + ')');
    });
  };

  View.prototype.tilePulse = function (i) {
    var t = this.tiles[i];
    if (!t || this.reduce) return;
    var c = t.card, A = ECE.Art;
    var ring = A.el('rect', { x: r3(c.x), y: r3(c.y), width: r3(c.w), height: r3(c.h), rx: 0.09, fill: 'none', stroke: A.COLORS.emerald, 'stroke-width': 0.08 }, this.gFx);
    this.tween(420 * this.pace(), function (q) {
      ring.setAttribute('opacity', r3(1 - q));
      if (q >= 1 && ring.parentNode) ring.parentNode.removeChild(ring);
    });
  };

  View.prototype.tokenPulse = function (pid) {
    var pt = this.tokenPoint(pid), A = ECE.Art;
    if (this.reduce) return this.wait(200 * this.pace());
    var ring = A.el('circle', { cx: r3(pt.x), cy: r3(pt.y), r: r3((pt.r || 0.25) * 1.2), fill: 'none', stroke: A.COLORS.minus, 'stroke-width': 0.07 }, this.gFx);
    return this.tween(460 * this.pace(), function (q) {
      ring.setAttribute('r', r3((pt.r || 0.25) * (1.1 + q * 0.9)));
      ring.setAttribute('opacity', r3(1 - q));
      if (q >= 1 && ring.parentNode) ring.parentNode.removeChild(ring);
    });
  };

  View.prototype.coinFly = function (a, b, ms) {
    var A = ECE.Art, self = this;
    if (!a || !b || this.reduce) return this.wait(Math.min(ms, 200));
    var mx = (a.x + b.x) / 2, my = Math.min(a.y, b.y) - 0.8 - Math.abs(a.x - b.x) * 0.08;
    var coins = [], lag = 0.16;
    for (var i = 0; i < 3; i++) coins.push(A.coin(this.gFx, 0.17 - i * 0.015));
    var total = ms;
    return this.tween(total, function (q) {
      for (var j = 0; j < coins.length; j++) {
        var c = coins[j];
        var u0 = clamp((q * (1 + lag * 2) - j * lag), 0, 1);
        var e = ease(u0), u = 1 - e;
        var x = u * u * a.x + 2 * u * e * mx + e * e * b.x, y = u * u * a.y + 2 * u * e * my + e * e * b.y;
        c.setAttribute('transform', 'translate(' + r3(x) + ' ' + r3(y) + ')');
        c.setAttribute('opacity', u0 <= 0 || u0 >= 1 ? 0 : 1);
        if (q >= 1 && c.parentNode) c.parentNode.removeChild(c);
      }
    }).then(function () { return self.wait(0); });
  };

  View.prototype.cardDraw = function (deck) {
    var self = this, A = ECE.Art;
    var pl = this.piles[deck === 'rain' ? 'rain' : 'buzz'];
    var spot = this.anchors.cardSpot;
    var g = A.el('g', { 'class': 'ece-drawn' }, this.gFx);
    pl.card(g);
    var k = this.pace();
    var cards = this.drawnCards;
    cards.push(g);
    var gone = function () { var at = cards.indexOf(g); if (at >= 0) cards.splice(at, 1); if (g.parentNode) g.parentNode.removeChild(g); };
    if (this.reduce) {
      g.setAttribute('transform', 'translate(' + r3(spot.x) + ' ' + r3(spot.y) + ') scale(1.5)');
      return this.wait(260 * k).then(gone);
    }
    return this.tween(320 * k, function (q) {
      var e = ease(q);
      var x = pl.x + (spot.x - pl.x) * e, y = pl.y + (spot.y - pl.y) * e - Math.sin(Math.PI * q) * 0.5;
      var sc = 1 + 0.6 * e, rot = (deck === 'rain' ? -1 : 1) * 8 * (1 - e);
      g.setAttribute('transform', 'translate(' + r3(x) + ' ' + r3(y) + ') rotate(' + r3(rot) + ') scale(' + r3(sc) + ')');
    }).then(function () {
      self.tween(160 * k, function (q) {
        g.setAttribute('opacity', r3(1 - q));
        if (q >= 1) gone();
      });
    });
  };

  View.prototype.gavelAt = function (i, knock) {
    var A = ECE.Art, t = this.tiles[i], k = this.pace();
    if (!t) return null;
    var c = t.card;
    var Lo = layout();
    var x = clamp(c.x + c.w / 2 + (Lo.W / 2 - (c.x + c.w / 2)) * 0.12, 0.6, Lo.W - 0.6);
    var y = clamp(c.y + c.h / 2 + (Lo.H / 2 - (c.y + c.h / 2)) * 0.08, 0.6, Lo.H - 0.6);
    var holder = A.el('g', { transform: 'translate(' + r3(x) + ' ' + r3(y) + ') scale(1.25)' }, this.gFx);
    var gv = A.gavel(holder);
    if (this.reduce) return this.wait(300 * k).then(function () { if (holder.parentNode) holder.parentNode.removeChild(holder); });
    var swings = knock ? 1 : 2;
    return this.tween((knock ? 300 : 380) * k, function (q) {
      var ph = (q * swings) % 1;
      var ang = -40 + Math.sin(Math.PI * ph) * 46;
      gv.setAttribute('transform', 'rotate(' + r3(ang) + ' 0.5 0)');
      holder.setAttribute('opacity', r3(q > 0.8 ? 1 - (q - 0.8) / 0.2 : 1));
      if (q >= 1 && holder.parentNode) holder.parentNode.removeChild(holder);
    });
  };

  View.prototype.raiseBridge = function () {
    var b = this.bridge;
    if (!b || this.reduce) return this.wait(120 * this.pace());
    var L = b.leafL, R = b.leafR, pl = b.pivotL, pr = b.pivotR, boat = b.boat;
    return this.tween(520 * this.pace(), function (q) {
      var a = 58 * (q < 0.5 ? 1 - q * 2 : (q - 0.5) * 2);
      L.setAttribute('transform', 'translate(' + r3(pl.x) + ' ' + r3(pl.y) + ') rotate(' + r3(-a) + ')');
      R.setAttribute('transform', 'translate(' + r3(pr.x) + ' ' + r3(pr.y) + ') rotate(' + r3(a) + ') scale(-1 1)');
      if (boat) boat.setAttribute('opacity', q >= 1 ? 1 : r3(clamp((a / 58 - 0.25) / 0.6, 0, 1)));
    });
  };

  View.prototype.highlight = function (list) {
    if (this.destroyed) return;
    try {
      var set = {};
      var arr = Array.isArray(list) ? list : [];
      for (var i = 0; i < arr.length; i++) if (arr[i] >= 0 && arr[i] < this.tiles.length) set[arr[i] | 0] = true;
      var key = Object.keys(set).sort().join(',');
      if (key === this.drawn.hl) return;
      this.drawn.hl = key;
      var g = this.gHl, A = ECE.Art;
      while (g.firstChild) g.removeChild(g.firstChild);
      if (!key) return;
      for (var j = 0; j < this.tiles.length; j++) {
        var c = this.tiles[j].card;
        if (set[j]) {
          A.el('rect', { x: r3(c.x - 0.02), y: r3(c.y - 0.02), width: r3(c.w + 0.04), height: r3(c.h + 0.04), rx: 0.11, fill: 'none',
            stroke: A.COLORS.emerald, 'stroke-width': 0.07, 'class': 'ece-hl-ring' }, g);
        } else {
          A.el('rect', { x: r3(c.x), y: r3(c.y), width: r3(c.w), height: r3(c.h), rx: 0.09, fill: '#F7F4EC', opacity: 0.66, 'class': 'ece-hl-veil' }, g);
        }
      }
    } catch (e) { report(e, 'highlight'); }
  };

  View.prototype.followId = function () {
    if (this.cam.follow !== null && this.cam.follow !== undefined) return this.cam.follow;
    return this.model ? this.model.turn : null;
  };

  View.prototype.setCloseUp = function (on) {
    if (this.destroyed) return;
    try {
      on = !!on;
      if (this.cam.on === on) return;
      this.cam.on = on;
      this.root.classList.toggle('ece-closeup', on);
      this.cam.panned = false;
      var Lo = layout();
      var from = this.cam.vb || [0, 0, Lo.W, Lo.H];
      var target;
      if (on) {
        var pt = this.focusPoint();
        this.cam.cx = pt.x; this.cam.cy = pt.y;
        target = this.viewBox();
      } else target = [0, 0, Lo.W, Lo.H];
      this.animateViewBox(from, target);
    } catch (e) { report(e, 'closeUp'); }
  };

  View.prototype.closeUp = function () { return this.cam.on; };

  View.prototype.follow = function (pid) {
    if (this.destroyed) return;
    this.cam.follow = pid === undefined ? null : pid;
    this.cam.panned = false;
    if (this.cam.on && !this.queued) this.centreOn(this.followId(), true);
  };

  View.prototype.focusPoint = function () {
    var id = this.followId();
    var tk = id !== null && id !== undefined ? this.tokens[id] : null;
    if (tk && tk.shown && tk.x !== null) return { x: tk.x, y: tk.y };
    var rest = this.model && id !== null && id !== undefined ? this.restPositions().at[id] : null;
    return rest ? { x: rest.x, y: rest.y } : { x: 5, y: 7 };
  };

  View.prototype.viewBox = function () {
    var Lo = layout();
    if (!this.cam.on) return [0, 0, Lo.W, Lo.H];
    var w = Lo.W / this.cam.z, h = Lo.H / this.cam.z;
    var cov = this.cam.coverPx > 0 && this.cam.hostH > 0 ? Math.min(h * 0.8, this.cam.coverPx * h / this.cam.hostH) : 0;
    var hv = h - cov;
    var x = clamp(this.cam.cx - w / 2, 0, Lo.W - w), y = clamp(this.cam.cy - hv / 2, 0, Lo.H - hv);
    this.cam.cx = x + w / 2; this.cam.cy = y + hv / 2;
    return [x, y, w, h];
  };

  View.prototype.setBottomInset = function (px) {
    if (this.destroyed) return;
    px = px > 0 ? Math.round(px) : 0;
    if (px === this.cam.coverPx) return;
    var hh = 0;
    try { hh = this.svg.getBoundingClientRect().height || 0; } catch (e) { hh = 0; }
    this.cam.coverPx = px;
    this.cam.hostH = hh;
    if (this.cam.on) { this.cam.panned = false; this.centreOn(this.followId(), true); }
  };

  View.prototype.sheetFocus = function (pid, pt) {
    var Lo = layout(), m = this.model, p = m && m.byId ? m.byId[pid] : null;
    var pos = p ? ((p.pos | 0) % Lo.n + Lo.n) % Lo.n : -1, cell = pos >= 0 ? Lo.cells[pos] : null;
    if (!cell || !(this.cam.coverPx > 0) || !(this.cam.hostH > 0)) return pt;
    var h = Lo.H / this.cam.z;
    var hv = h - Math.min(h * 0.8, this.cam.coverPx * h / this.cam.hostH);
    var tk = this.tokens[pid], r = (tk && tk.r) || 0.29;
    var text = this.tileText(this.tiles[pos]);
    var tries = [[cell.y, cell.y + cell.h, 0.1]];
    if (text) tries.push([text[0], text[1], 0.1], [text[0], text[1], 0.03]);
    for (var i = 0; i < tries.length; i++) {
      var top = Math.min(pt.y - r - tries[i][2], tries[i][0]), bottom = Math.max(pt.y + r + tries[i][2], tries[i][1]);
      if (bottom - top <= hv) return { x: pt.x, y: (top + bottom) / 2 };
    }
    if (cell.y >= pt.y) return { x: pt.x, y: pt.y - r - 0.03 + hv / 2 };
    if (cell.y + cell.h <= pt.y) return { x: pt.x, y: pt.y + r + 0.03 - hv / 2 };
    return pt;
  };
  View.prototype.tileText = function (t) {
    if (!t) return null;
    var els = (t.labelEls || []).concat(t.priceEl ? [t.priceEl] : []), top = Infinity, bottom = -Infinity;
    for (var i = 0; i < els.length; i++) {
      var y = parseFloat(els[i].getAttribute('y')), f = parseFloat(els[i].getAttribute('font-size'));
      if (!isFinite(y) || !(f > 0)) continue;
      top = Math.min(top, y - f * 0.95);
      bottom = Math.max(bottom, y + f * 0.3);
    }
    return bottom > top ? [top, bottom] : null;
  };

  View.prototype.applyCamera = function () {
    var vb = this.viewBox();
    this.setVB(vb);
  };

  View.prototype.setVB = function (vb) {
    var key = vb.map(r3).join(' ');
    if (this.cam.vbKey === key) return;
    this.cam.vbKey = key;
    this.cam.vb = vb;
    this.svg.setAttribute('viewBox', key);
  };

  View.prototype.animateViewBox = function (from, to) {
    var self = this;
    var token = {};
    this.cam.anim = token;
    if (this.reduce || prefersReduced()) { this.setVB(to); return; }
    this.tween(300, function (q) {
      if (self.cam.anim !== token) return;
      var e = ease(q);
      var on = self.cam.on;
      var tgt = on ? self.viewBox() : to;
      self.setVB([0, 1, 2, 3].map(function (k) { return from[k] + (tgt[k] - from[k]) * e; }));
      if (q >= 1) self.cam.anim = null;
    });
  };

  View.prototype.camTo = function (x, y) {
    if (!this.cam.on || this.cam.anim) return;
    this.cam.cx = x; this.cam.cy = y;
    this.camDirty = true;
  };

  View.prototype.centreOn = function (pid, animated) {
    if (!this.cam.on) return;
    var tk = pid !== null && pid !== undefined ? this.tokens[pid] : null;
    var pt = tk && tk.shown && tk.x !== null ? { x: tk.x, y: tk.y } : null;
    if (!pt && this.model && pid !== null && pid !== undefined) pt = this.restPositions().at[pid] || null;
    if (!pt) return;
    if (this.cam.coverPx > 0) pt = this.sheetFocus(pid, pt);
    var from = this.cam.vb || this.viewBox();
    this.cam.cx = pt.x; this.cam.cy = pt.y;
    var to = this.viewBox();
    if (animated) this.animateViewBox(from, to); else this.setVB(to);
  };

  View.prototype.bindInput = function () {
    var self = this, svg = this.svg;
    var down = null;
    var safe = function (fn) { return function (e) { try { fn(e); } catch (err) { report(err, 'input'); } }; };
    this.onDown = safe(function (e) {
      if (down || (e.button !== undefined && e.button > 0)) return;
      down = { id: e.pointerId, x: e.clientX, y: e.clientY, cx: self.cam.cx, cy: self.cam.cy, drag: false, rect: svg.getBoundingClientRect() };
      if (self.cam.on && svg.setPointerCapture) { try { svg.setPointerCapture(e.pointerId); } catch (er) { } }
    });
    this.onMove = safe(function (e) {
      if (!down || e.pointerId !== down.id) return;
      var dx = e.clientX - down.x, dy = e.clientY - down.y;
      if (!down.drag && dx * dx + dy * dy > 64) down.drag = true;
      if (down.drag && self.cam.on) {
        var vb = self.cam.vb || self.viewBox();
        var sc = Math.min(down.rect.width / vb[2], down.rect.height / vb[3]) || 1;
        self.cam.anim = null;
        self.cam.panned = true;
        self.cam.cx = down.cx - dx / sc;
        self.cam.cy = down.cy - dy / sc;
        self.setVB(self.viewBox());
        if (e.cancelable) e.preventDefault();
      }
    });
    var fire = function (i) { if (i !== null && typeof self.opts.onSpaceTap === 'function') self.opts.onSpaceTap(i); };
    this.onUp = safe(function (e) {
      if (!down || e.pointerId !== down.id) return;
      var d = down;
      down = null;
      if (d.drag) return;
      var i = self.hitTest(e.clientX, e.clientY, d.rect);
      if (i === null) return;
      if (e.pointerType === 'touch' || e.pointerType === 'pen') {
        if (self.tapWait) clearTimeout(self.tapWait.timer);
        var tap = { i: i, timer: 0 };
        tap.timer = setTimeout(safe(function () { if (self.tapWait === tap) { self.tapWait = null; fire(tap.i); } }), 450);
        self.tapWait = tap;
        return;
      }
      fire(i);
    });
    this.onClick = safe(function () {
      var tap = self.tapWait;
      if (!tap) return;
      self.tapWait = null;
      clearTimeout(tap.timer);
      fire(tap.i);
    });
    this.onCancel = safe(function () { down = null; });
    svg.addEventListener('pointerdown', this.onDown);
    svg.addEventListener('pointermove', this.onMove);
    svg.addEventListener('pointerup', this.onUp);
    svg.addEventListener('pointercancel', this.onCancel);
    svg.addEventListener('click', this.onClick);
  };

  View.prototype.hitTest = function (clientX, clientY, rect) {
    rect = rect || this.svg.getBoundingClientRect();
    var vb = this.cam.vb || this.viewBox();
    var sc = Math.min(rect.width / vb[2], rect.height / vb[3]);
    if (!(sc > 0)) return null;
    var ox = (rect.width - vb[2] * sc) / 2, oy = (rect.height - vb[3] * sc) / 2;
    var ux = vb[0] + (clientX - rect.left - ox) / sc, uy = vb[1] + (clientY - rect.top - oy) / sc;
    return spaceAt(ux, uy);
  };

  function spaceAt(ux, uy) {
    var cells = layout().cells;
    for (var i = 0; i < cells.length; i++) {
      var c = cells[i];
      if (ux >= c.x && ux < c.x + c.w && uy >= c.y && uy < c.y + c.h) return i;
    }
    return null;
  }

  View.prototype.resize = function () {
    if (this.destroyed) return;
    try { this.applyCamera(); } catch (e) { report(e, 'resize'); }
  };

  View.prototype.destroy = function () {
    if (this.destroyed) return;
    this.destroyed = true;
    try {
      if (this.raf) cancelAnimationFrame(this.raf);
      this.raf = 0;
      var list = this.tweens.slice();
      for (var i = 0; i < list.length; i++) finish(this, list[i]);
      this.tweens = [];
      var svg = this.svg;
      svg.removeEventListener('pointerdown', this.onDown);
      svg.removeEventListener('pointermove', this.onMove);
      svg.removeEventListener('pointerup', this.onUp);
      svg.removeEventListener('pointercancel', this.onCancel);
      svg.removeEventListener('click', this.onClick);
      if (this.tapWait) { clearTimeout(this.tapWait.timer); this.tapWait = null; }
      if (this.root.parentNode) this.root.parentNode.removeChild(this.root);
    } catch (e) { report(e, 'destroy'); }
  };

  function mount(container, opts) {
    var v = new View(container, opts);
    return {
      render: function (state, o) { v.render(state, o); },
      play: function (events, o) { return v.play(events, o); },
      setCloseUp: function (on) { v.setCloseUp(on); },
      closeUp: function () { return v.closeUp(); },
      follow: function (pid) { v.follow(pid); },
      highlight: function (list) { v.highlight(list); },
      setNote: function (on) { v.setNote(on); },
      dropCards: function () { v.dropCards(); },
      setTitle: function (on) { v.setTitle(on); },
      setCentreInset: function (u) { v.setCentreInset(u); },
      setBottomInset: function (px) { v.setBottomInset(px); },
      focusScreen: function () { return v.focusScreen(); },
      resize: function () { v.resize(); },
      destroy: function () { v.destroy(); },
      busy: function () { return v.busy(); },
      _view: v
    };
  }

  ECE.BoardView = {
    mount: mount,
    geometry: geometry,
    _layout: layout,
    _clusterAt: clusterAt,
    _stuckAt: stuckAt,
    _fitFont: fitFont,
    _spaceAt: spaceAt,
    _modelFrom: modelFrom,
    MIN_FONT: MIN_FONT,
    HOP_MS: HOP,
    PACE: PACE,
    DICE_MS: DICE_MS
  };
})(window.ECE = window.ECE || {});
;
(function (ECE) {
  'use strict';

  var Sound = {};
  ECE.Sound = Sound;

  var ac = null, master = null, noiseBuf = null;
  var enabled = true, volume = 0.6, rainWanted = false, rain = null;
  var hooked = false;

  function report(e) { if (ECE.Dom) ECE.Dom.report(e, 'sound'); }

  function ctor() { return (typeof window !== 'undefined') && (window.AudioContext || window.webkitAudioContext); }

  function setGain() {
    if (!master || !ac) return;
    var v = enabled ? Math.max(0, Math.min(1, volume)) * 0.7 : 0;
    try { master.gain.setTargetAtTime(v, ac.currentTime, 0.02); } catch (e) { master.gain.value = v; }
  }

  Sound.init = function (s) {
    s = s || {};
    enabled = s.sound !== false;
    volume = typeof s.volume === 'number' ? s.volume : 0.6;
    if (hooked || typeof document === 'undefined') return;
    hooked = true;
    var once = function () { Sound.unlock(); };
    document.addEventListener('pointerdown', once, true);
    document.addEventListener('touchend', once, true);
    document.addEventListener('keydown', once, true);
  };

  Sound.unlock = function () {
    try {
      if (!ac) {
        var C = ctor();
        if (!C) return false;
        ac = new C();
        master = ac.createGain();
        master.gain.value = 0;
        master.connect(ac.destination);
        setGain();
      }
      if (ac.state === 'suspended' && typeof ac.resume === 'function') { var p = ac.resume(); if (p && p.catch) p.catch(function () { }); }
      if (rainWanted && !rain) startRain();
      return true;
    } catch (e) { report(e); return false; }
  };

  Sound.set = function (s) {
    s = s || {};
    if (s.sound !== undefined) enabled = s.sound !== false;
    if (typeof s.volume === 'number') volume = s.volume;
    setGain();
    var want = !!s.rain && enabled;
    if (want !== rainWanted) {
      rainWanted = want;
      if (want) { if (ac) startRain(); } else stopRain();
    }
  };

  Sound.suspend = function () { try { if (ac && ac.state === 'running' && ac.suspend) ac.suspend(); } catch (e) { } };
  Sound.resume = function () { try { if (ac && ac.state === 'suspended' && ac.resume) { var p = ac.resume(); if (p && p.catch) p.catch(function () {}); } } catch (e) { } };
  Sound.ready = function () { return !!ac && ac.state === 'running'; };

  function noise() {
    if (noiseBuf) return noiseBuf;
    var len = Math.floor(ac.sampleRate * 1.0);
    noiseBuf = ac.createBuffer(1, len, ac.sampleRate);
    var d = noiseBuf.getChannelData(0);
    var seed = 12345;
    for (var i = 0; i < len; i++) { seed = (seed * 1103515245 + 12345) & 0x7fffffff; d[i] = (seed / 0x3fffffff) - 1; }
    return noiseBuf;
  }
  function tone(type, freq, t, len, peak, dest) {
    var o = ac.createOscillator(), g = ac.createGain();
    o.type = type;
    var f0 = Array.isArray(freq) ? freq[0] : freq, f1 = Array.isArray(freq) ? freq[1] : freq;
    o.frequency.setValueAtTime(f0, t);
    if (f1 !== f0) o.frequency.exponentialRampToValueAtTime(Math.max(20, f1), t + len);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(Math.max(0.0002, peak), t + Math.min(0.012, len / 4));
    g.gain.exponentialRampToValueAtTime(0.0001, t + len);
    o.connect(g); g.connect(dest || master);
    o.start(t); o.stop(t + len + 0.02);
  }
  function burst(t, len, peak, filterType, freq, q) {
    var src = ac.createBufferSource(), f = ac.createBiquadFilter(), g = ac.createGain();
    src.buffer = noise();
    f.type = filterType || 'bandpass';
    f.frequency.setValueAtTime(freq || 2000, t);
    f.Q.value = q || 1;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(Math.max(0.0002, peak), t + 0.004);
    g.gain.exponentialRampToValueAtTime(0.0001, t + len);
    src.connect(f); f.connect(g); g.connect(master);
    src.start(t, Math.random() * 0.5); src.stop(t + len + 0.02);
    return f;
  }

  var SOUNDS = {
    dice: function (t) {
      var clacks = [0, 0.07, 0.13, 0.22, 0.3];
      for (var i = 0; i < clacks.length; i++) burst(t + clacks[i], 0.05, 0.35 - i * 0.04, 'bandpass', 2400 + i * 300, 3);
      tone('triangle', 180, t + 0.3, 0.06, 0.08);
    },
    step: function (t) { tone('sine', [540, 420], t, 0.05, 0.05); },
    coinIn: function (t) { tone('triangle', 1046, t, 0.09, 0.16); tone('triangle', 1568, t + 0.075, 0.16, 0.14); },
    coinOut: function (t) { tone('triangle', 784, t, 0.09, 0.12); tone('triangle', 523, t + 0.08, 0.16, 0.1); },
    card: function (t) {
      var f = burst(t, 0.22, 0.12, 'highpass', 900, 0.7);
      try { f.frequency.exponentialRampToValueAtTime(5200, t + 0.2); } catch (e) { }
      tone('sine', 660, t + 0.16, 0.12, 0.05);
    },
    build: function (t) { tone('triangle', [260, 180], t, 0.12, 0.2); burst(t, 0.06, 0.18, 'lowpass', 900, 1); tone('sine', 523, t + 0.12, 0.14, 0.07); },
    gavel: function (t) {
      for (var i = 0; i < 2; i++) { burst(t + i * 0.16, 0.07, 0.4, 'bandpass', 1300, 2); tone('sine', [190, 120], t + i * 0.16, 0.1, 0.22); }
    },
    bell: function (t) {
      for (var i = 0; i < 2; i++) {
        var s = t + i * 0.42;
        tone('sine', 988, s, 1.0, 0.14); tone('sine', 988 * 2.76, s, 0.5, 0.04); tone('sine', 988 * 5.4, s, 0.25, 0.015);
      }
    },
    win: function (t) {
      var notes = [523, 659, 784, 1047, 1319];
      for (var i = 0; i < notes.length; i++) tone('triangle', notes[i], t + i * 0.11, i === notes.length - 1 ? 0.6 : 0.18, 0.16);
    },
    out: function (t) {
      var notes = [392, 330, 262, 196];
      for (var i = 0; i < notes.length; i++) tone('triangle', notes[i], t + i * 0.18, 0.28, 0.12);
    },
    bid: function (t) { tone('sine', [880, 1100], t, 0.06, 0.08); },
    click: function (t) { tone('sine', 1200, t, 0.03, 0.04); },
    horn: function (t) {
      var lp = ac.createBiquadFilter();
      lp.type = 'lowpass'; lp.frequency.value = 1200; lp.Q.value = 0.7;
      lp.connect(master);
      for (var i = 0; i < 2; i++) { var s0 = t + i * 0.18; tone('square', 415, s0, 0.12, 0.07, lp); tone('square', 523, s0, 0.12, 0.06, lp); }
    }
  };
  Sound.NAMES = Object.keys(SOUNDS);

  Sound.soundFor = function (ev, you) {
    var k = ev && (ev.t || ev.type);
    switch (k) {
      case 'dice': return 'dice';
      case 'salary': case 'fund': return ev.p === you || ev.owner === you ? 'coinIn' : null;
      case 'rent': return ev.owner === you ? 'coinIn' : 'coinOut';
      case 'buy': case 'tax': case 'unmortgage': return 'coinOut';
      case 'cash': return (ev.amount | 0) >= 0 ? 'coinIn' : 'coinOut';
      case 'card': return 'card';
      case 'build': return 'build';
      case 'sell': case 'mortgage': case 'trade': return 'coinIn';
      case 'bid': return 'bid';
      case 'auctionEnd': return ev.winner !== null && ev.winner !== undefined ? 'gavel' : null;
      case 'traffic': return ev.reason === 'bridge' ? 'bell' : 'horn';
      case 'bankrupt': return 'out';
      default: return null;
    }
  };

  Sound.renderOffline = function (name, seconds) {
    var OAC = typeof window !== 'undefined' && (window.OfflineAudioContext || window.webkitOfflineAudioContext);
    if (!OAC || !SOUNDS[name]) return Promise.resolve(null);
    var rate = 22050, len = Math.ceil((seconds || 1) * rate);
    var off = new OAC(1, len, rate);
    var keep = { ac: ac, master: master, noiseBuf: noiseBuf };
    try {
      ac = off; noiseBuf = null;
      master = off.createGain(); master.gain.value = 1; master.connect(off.destination);
      SOUNDS[name](0.01);
    } finally { ac = keep.ac; master = keep.master; noiseBuf = keep.noiseBuf; }
    return off.startRendering().then(function (buf) {
      var d = buf.getChannelData(0), peak = 0, last = 0;
      for (var i = 0; i < d.length; i++) { var a = Math.abs(d[i]); if (a > peak) peak = a; if (a > 0.0005) last = i; }
      return { seconds: last / rate, peak: peak };
    });
  };

  Sound.play = function (name, when) {
    if (!ac || !enabled || !(volume > 0) || !SOUNDS[name]) return;
    if (ac.state !== 'running') return;
    try { SOUNDS[name](ac.currentTime + 0.01 + Math.max(0, (when || 0) / 1000)); } catch (e) { report(e); }
  };

  Sound.events = function (list, speed, you) {
    if (!ac || !enabled || !(volume > 0) || !list || !list.length) return;
    if (speed === 'instant') return;
    var fast = speed === 'fast';
    var BV = ECE.BoardView || {};
    var hop = (BV.HOP_MS && BV.HOP_MS[fast ? 'fast' : 'normal']) || (fast ? 40 : 90);
    var diceMs = Math.round(((BV.DICE_MS || 380) + 100) * ((BV.PACE && BV.PACE[fast ? 'fast' : 'normal']) || (fast ? 0.4 : 1)));
    var t = 0, step = 0;
    for (var i = 0; i < list.length; i++) {
      var ev = list[i], k = ev && (ev.t || ev.type);
      var mine = ev && (ev.p === you || ev.owner === you);
      switch (k) {
        case 'dice': Sound.play('dice', t); t += diceMs; break;
        case 'move':
          if (ev.jump) { t += 120; }
          else { var n = Math.min(12, ev.steps | 0); for (step = 0; step < n; step++) Sound.play('step', t + step * hop); t += n * hop; }
          break;
        case 'salary': case 'fund': if (mine) Sound.play('coinIn', t); t += 90; break;
        case 'rent': Sound.play(ev.owner === you ? 'coinIn' : 'coinOut', t); t += 120; break;
        case 'buy': Sound.play('coinOut', t); t += 120; break;
        case 'tax': Sound.play('coinOut', t); t += 120; break;
        case 'cash': Sound.play((ev.amount | 0) >= 0 ? 'coinIn' : 'coinOut', t); t += 100; break;
        case 'card': Sound.play('card', t); t += 200; break;
        case 'build': Sound.play('build', t); t += 140; break;
        case 'sell': case 'mortgage': Sound.play('coinIn', t); t += 100; break;
        case 'unmortgage': Sound.play('coinOut', t); t += 100; break;
        case 'bid': Sound.play('bid', t); break;
        case 'auctionEnd': if (ev.winner !== null && ev.winner !== undefined) Sound.play('gavel', t); t += 200; break;
        case 'traffic': Sound.play(Sound.soundFor(ev, you), t); t += 300; break;
        case 'trade': Sound.play('coinIn', t); t += 120; break;
        case 'bankrupt': Sound.play('out', t); t += 400; break;
        default: break;
      }
    }
  };

  function startRain() {
    if (!ac || rain) return;
    try {
      var src = ac.createBufferSource();
      src.buffer = noise();
      src.loop = true;
      var lp = ac.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 1400; lp.Q.value = 0.3;
      var hp = ac.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 260;
      var g = ac.createGain(); g.gain.value = 0.0001;
      var lfo = ac.createOscillator(), lg = ac.createGain();
      lfo.frequency.value = 0.09; lg.gain.value = 0.012;
      lfo.connect(lg); lg.connect(g.gain);
      src.connect(lp); lp.connect(hp); hp.connect(g); g.connect(master);
      src.start(); lfo.start();
      g.gain.setTargetAtTime(0.05, ac.currentTime, 1.2);
      var drops = setInterval(function () {
        if (!rain || !ac || ac.state !== 'running') return;
        var t = ac.currentTime + Math.random() * 0.5;
        tone('sine', [2400 + Math.random() * 1600, 900], t, 0.04, 0.012 + Math.random() * 0.012);
      }, 380);
      rain = { src: src, g: g, lfo: lfo, drops: drops };
    } catch (e) { report(e); rain = null; }
  }
  function stopRain() {
    if (!rain) return;
    var r = rain;
    rain = null;
    try {
      clearInterval(r.drops);
      r.g.gain.setTargetAtTime(0.0001, ac.currentTime, 0.3);
      setTimeout(function () { try { r.src.stop(); r.lfo.stop(); } catch (e) { } }, 1200);
    } catch (e) { report(e); }
  }
})(window.ECE = window.ECE || {});
;
(function (ECE) {
  'use strict';

  var Dom = ECE.Dom;
  var h = function (t, p, k) { return Dom.h(t, p, k); };
  var Panel = {};
  ECE.Panel = Panel;

  function R() { return ECE.Rules; }
  function money(n) { return Dom.money(n); }
  function call(name, args, fallback) {
    var Rl = R();
    if (!Rl || typeof Rl[name] !== 'function') return fallback;
    try { return Rl[name].apply(Rl, args); } catch (e) { Dom.report(e, 'rules.' + name); return fallback; }
  }
  function has(list, t) {
    for (var i = 0; i < list.length; i++) if (list[i] && list[i].t === t) return list[i];
    return null;
  }

  function clock(ms) {
    var s = Math.max(0, Math.ceil(ms / 1000));
    var m = Math.floor(s / 60), r = s % 60;
    return m + ':' + (r < 10 ? '0' : '') + r;
  }
  Panel.clock = clock;

  Panel.roundText = function (st) {
    if (!st) return '';
    var lim = (st.rules && st.rules.limit) || { kind: 'none' };
    var r = st.round || 1;
    if (st.phase === 'over') return 'Game over · round ' + r;
    if (lim.kind === 'rounds') return st.limitHit ? 'Last round · ' + r + ' of ' + lim.value : 'Round ' + r + ' of ' + lim.value;
    if (lim.kind === 'minutes') {
      if (st.limitHit) return 'Time’s up · last round';
      return 'Round ' + r + ' · ' + clock(lim.value * 60000 - (st.playMs || 0)) + ' left';
    }
    return 'Round ' + r;
  };

  Panel.primary = function (st, you) {
    if (!st) return { label: 'NEW GAME', waiting: true };
    if (st.phase === 'over') return { label: 'SEE RESULTS', dialog: 'over' };
    var a = call('actor', [st], null);
    var B = ECE.BoardData;
    if (a !== you) {
      var p = Dom.player(st, a);
      var name = p ? p.name : 'Someone';
      if (st.phase === 'auction') {
        var pend = st.pending || {};
        var inIt = (pend.order || []).indexOf(you) >= 0;
        return { label: inIt ? name + ' is bidding' : 'Auction', waiting: true, dialog: inIt ? 'auction' : null };
      }
      if (st.phase === 'trade') return { label: name + ' is deciding', waiting: true };
      if (st.phase === 'debt') return { label: name + ' is raising cash', waiting: true };
      return { label: name + '’s turn', waiting: true };
    }
    var me = Dom.player(st, you) || {};
    var legal = call('legal', [st], []) || [];
    switch (st.phase) {
      case 'roll': {
        if (me.stuck) {
          var alts = [];
          var fee = B.RULES.trafficFee;
          if (has(legal, 'payFee')) alts.push({ label: 'PAY ' + money(fee), action: { t: 'payFee' }, aria: 'Pay ' + money(fee) + ' to leave Stuck in Traffic' });
          if (has(legal, 'usePass')) alts.push({ label: 'USE CARPOOL PASS', action: { t: 'usePass' }, aria: 'Use a Carpool Pass to leave Stuck in Traffic' });
          var tries = (me.stuckTries | 0) + 1, max = B.RULES.trafficMaxTries;
          return { label: 'ROLL FOR DOUBLES', sub: 'Try ' + Math.min(tries, max) + ' of ' + max, action: { t: 'roll' }, alts: alts };
        }
        return { label: st.rolled ? 'ROLL AGAIN' : 'ROLL', sub: st.rolled ? 'Doubles!' : '', action: { t: 'roll' } };
      }
      case 'end':
        return { label: 'END TURN', action: { t: 'endTurn' } };
      case 'buy': {
        var sp = Dom.space((st.pending || {}).space) || {};
        return { label: 'BUY ' + money(sp.price || 0) + '?', dialog: 'buy' };
      }
      case 'auction':
        return { label: 'YOUR BID', dialog: 'auction' };
      case 'card':
        return { label: 'READ CARD', dialog: 'card' };
      case 'debt': {
        var d = ((st.pending || {}).debts || [])[0] || {};
        return { label: 'PAY ' + money(d.amount || 0), dialog: 'debt' };
      }
      case 'trade':
        return { label: 'ANSWER OFFER', dialog: 'offer' };
      default:
        return { label: '…', waiting: true };
    }
  };

  var QUIET = { land: 1, buyAsk: 1 };
  function evType(ev) { return ev ? (ev.t || ev.type || '') : ''; }
  Panel.QUIET = QUIET;
  function answeredOffer(log, i) {
    var ev = log[i], nx = log[i + 1];
    if (!ev || ev.t !== 'offer' || !nx || (nx.t !== 'trade' && nx.t !== 'tradeNo')) return false;
    var a = ev.offer || {}, b = nx.offer || {};
    return a.from === b.from && a.to === b.to;
  }
  Panel.answeredOffer = answeredOffer;
  function rollMove(st, dice, mv, you) {
    if (!dice || !mv || dice.t !== 'dice' || mv.t !== 'move' || dice.forRent || mv.jump || !(mv.steps > 0) || dice.p !== mv.p) return '';
    var a = call('text', [st, dice, you], ''), b = call('text', [st, mv, you], '');
    var to = / to (.+)$/.exec(b || '');
    if (!a || !to) return '';
    return a.replace(/\.$/, '') + ' to ' + to[1];
  }
  Panel.rollMove = rollMove;

  Panel.lastLines = function (st, you, n) {
    var out = [];
    if (!st || !st.log || !st.log.length) return out;
    n = n || 2;
    for (var i = st.log.length - 1; i >= 0 && i >= st.log.length - 40 && out.length < n; i--) {
      var k = evType(st.log[i]);
      if (QUIET[k] || k === 'turn' || answeredOffer(st.log, i)) continue;
      var t = call('text', [st, st.log[i], you], '');
      if (t) out.push(t);
    }
    return out;
  };
  Panel.lastLine = function (st, you) { return Panel.lastLines(st, you, 1)[0] || ''; };

  var TAIL = / \([^()]*\)(?=[.!?]?$)/;
  Panel.stripText = function (text, fits) {
    text = String(text || '');
    if (!TAIL.test(text) || typeof fits !== 'function' || fits(text)) return text;
    return text.replace(TAIL, '');
  };
  function fitStrip(span, text) {
    Dom.text(span, Panel.stripText(text, function (t) {
      Dom.text(span, t);
      if (span.hidden || !span.isConnected || !span.getClientRects || !span.getClientRects().length) return true;
      return !Panel.runsOver(span);
    }));
  }
  Panel.runsOver = function (el) {
    if (el.scrollWidth > el.clientWidth) return true;
    if (typeof document === 'undefined' || typeof document.createRange !== 'function' || typeof getComputedStyle !== 'function') return false;
    var rg = document.createRange();
    rg.selectNodeContents(el);
    var cs = getComputedStyle(el);
    var room = el.getBoundingClientRect().width - (parseFloat(cs.paddingLeft) || 0) - (parseFloat(cs.paddingRight) || 0) -
      (parseFloat(cs.borderLeftWidth) || 0) - (parseFloat(cs.borderRightWidth) || 0);
    return rg.getBoundingClientRect().width > room + 0.01;
  };

  Panel.linePlayer = function (st, ev, text, you) {
    if (!st || !ev) return null;
    if (ev.p !== undefined && ev.p !== null) return Dom.player(st, ev.p);
    var t = String(text || ''), best = null, at = Infinity;
    (st.players || []).forEach(function (p) {
      var i = -1;
      if (you !== undefined && you !== null && p.id === you) { var m = /\b[Yy]ou\b/.exec(t); i = m ? m.index : -1; }
      else if (p.name) i = t.indexOf(p.name);
      if (i >= 0 && i < at) { at = i; best = p; }
    });
    return best;
  };
  Panel.dot = function (color) {
    var dot = h('span', { cls: 'ui-log-dot' + (color ? '' : ' ui-log-dot-none'), 'aria-hidden': 'true' });
    if (color) dot.style.backgroundColor = color;
    return dot;
  };

  Panel.recentLines = function (st, you, n) {
    var out = [];
    if (!st || !st.log) return out;
    var log = st.log;
    for (var i = log.length - 1; i >= 0 && out.length < (n || 10); i--) {
      var ev = log[i], k = evType(ev);
      if (QUIET[k] || answeredOffer(log, i)) continue;
      var t = '';
      if (k === 'move') {
        var j = i - 1;
        while (j >= 0 && QUIET[evType(log[j])]) j--;
        t = j >= 0 ? rollMove(st, log[j], ev, you) : '';
        if (t) i = j;
      }
      if (!t) t = call('text', [st, ev, you], '');
      if (!t) continue;
      var p = Panel.linePlayer(st, ev, t, you);
      out.push({ text: t, color: p ? p.color : null, turn: k === 'turn', mine: !!p && p.id === you && k !== 'turn' });
    }
    return out;
  };

  function shortName(nm, isYou) {
    var w = String(nm || '').trim().split(/\s+/);
    if (w.length < 2) return nm;
    if (isYou) return w[0];
    var last = w[w.length - 1];
    return /^\d+$/.test(last) ? nm : last;
  }
  Panel.shortName = shortName;

  Panel.leader = function (st) {
    if (!st || !st.players || st.phase === 'over') return null;
    var best = null, top = -Infinity, tie = false;
    st.players.forEach(function (p) {
      if (p.out) return;
      var w = call('netWorth', [st, p.id], p.cash);
      if (w > top) { top = w; best = p.id; tie = false; } else if (w === top) tie = true;
    });
    return tie ? null : best;
  };

  function spacesOf(st, id) {
    var n = 0;
    if (!st || !st.props) return 0;
    for (var k in st.props) if (Object.prototype.hasOwnProperty.call(st.props, k) && st.props[k] && st.props[k].owner === id) n++;
    return n;
  }
  Panel.spacesOf = spacesOf;

  function ownedBy(st, id) {
    var out = [];
    if (!st || !st.props) return out;
    for (var k in st.props) if (Object.prototype.hasOwnProperty.call(st.props, k) && st.props[k] && st.props[k].owner === id) out.push(+k);
    return out.sort(function (a, b) { return a - b; });
  }
  Panel.ownedBy = ownedBy;
  Panel.pickText = function (st, id, you) {
    var p = Dom.player(st, id);
    if (!p) return '';
    var nm = id === you ? 'You' : p.name;
    var list = ownedBy(st, id);
    if (!list.length) return nm + ': no spaces yet';
    var whole = (ECE.BoardData.DISTRICTS || []).filter(function (d) { return call('ownsDistrict', [st, id, d.id], false); }).map(function (d) { return d.name; });
    return nm + ': ' + list.length + (list.length === 1 ? ' space' : ' spaces') + (whole.length ? ', all of ' + whole.join(' and ') : '');
  };

  Panel.openLog = function (st, you) {
    var D = ECE.Dialogs;
    if (!D) return null;
    return D.open({
      id: 'log', title: 'Game log', cls: 'ui-dlg-log', place: 'side', closable: true,
      render: function (hd) {
        var list = h('ol', { cls: 'ui-log', 'aria-label': 'Game log, newest first' });
        var log = (st && st.log) || [];
        var n = 0;
        for (var i = log.length - 1; i >= 0; i--) {
          var ev = log[i], k = evType(ev);
          if (QUIET[k]) continue;
          var t = call('text', [st, ev, you], '');
          if (!t) continue;
          n++;
          var p = Panel.linePlayer(st, ev, t, you);
          var cls = 'ui-log-line' + (k === 'turn' ? ' ui-log-turn' : '') + (p && p.id === you && k !== 'turn' ? ' ui-log-you' : '');
          var li = h('li', { cls: cls });
          li.appendChild(Panel.dot(p ? p.color : null));
          li.appendChild(h('span', null, t));
          list.appendChild(li);
        }
        if (!n) list.appendChild(h('li', { cls: 'ui-log-line ui-muted' }, 'Nothing has happened yet.'));
        hd.body.appendChild(list);
        hd.foot.appendChild(Dom.btn('Close', function () { hd.close('ok'); }, { primary: true }));
        setTimeout(function () { hd.body.scrollTop = 0; }, 0);
      }
    });
  };

  Panel.mount = function (el, handlers) {
    handlers = handlers || {};
    Dom.clear(el);
    el.classList.add('ui-panel');
    var head = h('div', { cls: 'ui-panel-head' });
    var menuBtn = Dom.btn(Dom.icon('menu'), function () { handlers.onMenu && handlers.onMenu(); }, { ghost: true, cls: 'ui-icon-btn', aria: 'Menu' });
    var title = h('div', { cls: 'ui-panel-title' }, [h('div', { cls: 'ui-panel-name' }, (ECE.Glossary && ECE.Glossary.game.name) || 'Emerald City Estates'), h('div', { cls: 'ui-panel-round', 'aria-live': 'off' })]);
    var camBtn = Dom.btn(Dom.icon('zoom'), function () { handlers.onCloseUp && handlers.onCloseUp(); }, { ghost: true, cls: 'ui-icon-btn ui-cam-btn', aria: 'Close-up camera', pressed: false });
    head.appendChild(menuBtn); head.appendChild(title); head.appendChild(camBtn);

    var turn = h('div', { cls: 'ui-turn' });
    var dice = h('div', { cls: 'ui-dice', 'aria-hidden': 'true' });
    var turnText = h('div', { cls: 'ui-turn-text', 'aria-live': 'polite' });
    turn.appendChild(dice); turn.appendChild(turnText);

    var chips = h('div', { cls: 'ui-chips', role: 'list', 'aria-label': 'Players' });
    var pickLine = h('p', { cls: 'ui-pick-line', 'aria-live': 'polite', hidden: true });

    var actions = h('div', { cls: 'ui-actions' });
    var alts = h('div', { cls: 'ui-alts' });
    var manageBtn = Dom.btn([Dom.icon('build', 20), h('span', null, 'Manage')], function () { handlers.onManage && handlers.onManage(); }, { cls: 'ui-side-btn ui-manage-btn', aria: 'Manage your spaces' });
    var primaryBtn = Dom.btn([h('span', { cls: 'ui-primary-label' }, 'ROLL'), h('span', { cls: 'ui-primary-sub' })], function () { handlers.onPrimary && handlers.onPrimary(panel.current); }, { primary: true, cls: 'ui-primary' });
    primaryBtn.id = 'ui-primary';
    var tradeBtn = Dom.btn([Dom.icon('trade', 20), h('span', null, 'Trade')], function () { handlers.onTrade && handlers.onTrade(); }, { cls: 'ui-side-btn ui-trade-btn', aria: 'Propose a trade' });
    var row = h('div', { cls: 'ui-action-row' }, [primaryBtn, manageBtn, tradeBtn]);
    actions.appendChild(alts);
    actions.appendChild(row);

    var logText = h('span', { cls: 'ui-logline-text' }, [h('span', { cls: 'ui-logline-1' }), h('span', { cls: 'ui-logline-2' })]);
    var logBtn = Dom.btn([Dom.icon('log', 18), logText], function () { handlers.onLog && handlers.onLog(); }, { cls: 'ui-logline', ghost: true, aria: 'Open the full game log' });
    var recentList = h('ol', { cls: 'ui-recent-list', 'aria-label': 'Latest moves, newest first' });
    var recent = h('div', { cls: 'ui-recent' }, [h('div', { cls: 'ui-recent-head' }, [h('span', null, 'Latest moves'),
      Dom.btn('Full log', function () { handlers.onLog && handlers.onLog(); }, { small: true, ghost: true, cls: 'ui-recent-all', aria: 'Open the full game log' })]), recentList]);

    el.appendChild(head);
    el.appendChild(turn);
    el.appendChild(chips);
    el.appendChild(pickLine);
    el.appendChild(actions);
    el.appendChild(logBtn);
    el.appendChild(recent);

    var lastCash = {};
    var chipSig = '';
    var recentSig = '';
    var selected = null;
    var lastSt = null, lastYou = null;
    function pick(id) {
      if (!lastSt) return;
      selected = selected === id ? null : id;
      chipSig = '';
      if (handlers.onPick) handlers.onPick(selected, selected === null ? [] : ownedBy(lastSt, selected));
      renderPanel(lastSt, lastCtx || {});
    }
    var lastCtx = null;
    var panel = {
      el: el, actionsEl: actions, primaryEl: primaryBtn, manageEl: manageBtn, tradeEl: tradeBtn, logEl: logBtn, recentEl: recent,
      headEl: head, camEl: camBtn, turnEl: turn, chipsEl: chips, altsEl: alts, rowEl: row, current: null,
      home: function (altsElsewhere) {
        if (!altsElsewhere && (alts.parentNode !== actions || alts.nextSibling !== row)) actions.insertBefore(alts, row);
        if (turn.parentNode === el && turn.nextSibling === chips && chips.nextSibling === pickLine && pickLine.nextSibling === actions && actions.nextSibling === logBtn) return;
        el.insertBefore(turn, logBtn);
        el.insertBefore(chips, logBtn);
        el.insertBefore(pickLine, logBtn);
        el.insertBefore(actions, logBtn);
      },
      render: function (st, ctx) { renderPanel(st, ctx || {}); }
    };

    function renderPanel(st, ctx) {
      var you = ctx.you;
      lastSt = st; lastYou = you; lastCtx = ctx;
      var host = ctx.centerHost || el;
      if (host === el) {
        panel.home(!!ctx.altsHost);
        if (ctx.altsHost && alts.parentNode !== ctx.altsHost) ctx.altsHost.appendChild(alts);
      } else {
        var want = ctx.centerChips ? [turn, chips, actions] : [turn, actions];
        var ok = host.children.length === want.length;
        for (var w = 0; ok && w < want.length; w++) ok = host.children[w] === want[w];
        if (!ok) want.forEach(function (x) { host.appendChild(x); });
        if (!ctx.centerChips && chips.parentNode !== el) el.insertBefore(chips, logBtn);
      }

      Dom.text(title.lastChild, Panel.roundText(st));
      camBtn.setAttribute('aria-pressed', ctx.closeUp ? 'true' : 'false');
      Dom.clear(camBtn).appendChild(Dom.icon(ctx.closeUp ? 'unzoom' : 'zoom'));
      Dom.toggle(camBtn, 'ui-on', !!ctx.closeUp);
      if (!st) return;

      var dv = st.dice;
      var dsig = dv ? dv.join(',') : '';
      if (dice.dataset.sig !== dsig) {
        dice.dataset.sig = dsig;
        Dom.clear(dice);
        if (dv) { dice.appendChild(Dom.die(dv[0], 26)); dice.appendChild(Dom.die(dv[1], 26)); }
      }
      dice.hidden = !dv;
      var tp = st.players && st.players[st.turn];
      var actor = call('actor', [st], null);
      var line;
      if (st.phase === 'over') line = 'Game over';
      else if (!tp) line = '';
      else {
        line = tp.id === you ? 'Your turn' : tp.name + '’s turn';
        if (tp.stuck) line += ' · stuck in traffic';
        else if (st.phase === 'roll' && st.rolled && (st.doubles | 0) > 0) line += ' · doubles, roll again';
        if (st.phase === 'auction') line += ' · auction';
      }
      Dom.text(turnText, line);
      Dom.toggle(turn, 'ui-mine', !!tp && tp.id === you && st.phase !== 'over');

      var lead = Panel.leader(st);
      var worth = {};
      (st.players || []).forEach(function (p) { worth[p.id] = p.out ? 0 : call('netWorth', [st, p.id], p.cash); });
      var sig = (st.players || []).map(function (p) {
        return [p.id, p.name, p.token, p.cash, p.out ? 1 : 0, p.stuck ? 1 : 0, spacesOf(st, p.id), worth[p.id], lead === p.id ? 1 : 0, (p.passes || []).length, tp && tp.id === p.id ? 1 : 0, actor === p.id ? 1 : 0, selected === p.id ? 1 : 0].join(':');
      }).join('|') + '#' + you;
      if (sig !== chipSig) {
        chipSig = sig;
        Dom.clear(chips);
        var n = (st.players || []).length;
        chips.dataset.n = String(n);
        chips.style.setProperty('--n', String(n));
        (st.players || []).forEach(function (p) {
          var cur = !!tp && tp.id === p.id && st.phase !== 'over';
          var c = h('div', { cls: 'ui-chip' + (cur ? ' ui-current' : '') + (p.out ? ' ui-out' : '') + (p.stuck && !p.out ? ' ui-is-stuck' : '') + (p.id === you ? ' ui-you' : '') + (actor === p.id && !cur ? ' ui-acting' : '') + (lead === p.id ? ' ui-lead' : '') + (selected === p.id ? ' ui-picked' : ''), role: 'listitem' });
          c.style.setProperty('--seat', p.color);
          var nm = p.id === you ? (p.name || 'You') : p.name;
          var spaces = spacesOf(st, p.id);
          var label = nm + (p.id === you && !/^you$/i.test(String(nm).trim()) ? ' (you)' : '') + ', ' + money(p.cash) + (p.out ? '' : ', worth ' + money(worth[p.id])) + ', ' + spaces + (spaces === 1 ? ' space' : ' spaces') + (lead === p.id ? ', in the lead' : '') + (p.stuck ? ', stuck in traffic' : '') + (p.out ? ', out' : '') + (cur ? ', playing now' : '');
          c.setAttribute('aria-label', label);
          c.appendChild(Dom.token(p.token, p.color, 26));
          var info = h('div', { cls: 'ui-chip-info' });
          info.appendChild(h('div', { cls: 'ui-chip-name' }, [h('span', { cls: 'ui-chip-full' }, nm), h('span', { cls: 'ui-chip-short', 'aria-hidden': 'true' }, shortName(nm, p.id === you))]));
          var cashEl = h('div', { cls: 'ui-chip-cash' }, p.out ? 'Out' : money(p.cash));
          var prev = lastCash[p.id];
          if (prev !== undefined && prev !== p.cash && !p.out) cashEl.classList.add(p.cash > prev ? 'ui-up' : 'ui-down');
          lastCash[p.id] = p.cash;
          info.appendChild(cashEl);
          c.appendChild(info);
          var meta = h('div', { cls: 'ui-chip-meta' });
          if (p.out) meta.appendChild(h('span', null, 'bankrupt'));
          else {
            meta.appendChild(h('span', { cls: 'ui-chip-spaces ui-chip-worth' }, 'worth ' + money(worth[p.id])));
            if (p.stuck) meta.appendChild(h('span', { cls: 'ui-badge ui-badge-stuck' }, 'stuck'));
            if ((p.passes || []).length) meta.appendChild(h('span', { cls: 'ui-badge ui-badge-pass', title: null }, (p.passes || []).length > 1 ? (p.passes || []).length + ' carpool passes' : 'carpool pass'));
          }
          c.appendChild(meta);
          if (cur) c.appendChild(h('span', { cls: 'ui-chip-turn', 'aria-hidden': 'true' }, '▶'));
          if (lead === p.id) c.appendChild(h('span', { cls: 'ui-chip-lead', 'aria-hidden': 'true' }, '1st'));
          if (!p.out) {
            var hit = h('button', { type: 'button', cls: 'ui-chip-hit', 'aria-label': 'Show ' + (p.id === you ? 'your' : p.name + '’s') + ' spaces on the board', 'aria-pressed': selected === p.id ? 'true' : 'false' });
            Dom.on(hit, 'click', function () { pick(p.id); });
            c.appendChild(hit);
          }
          chips.appendChild(c);
        });
        fitChips();
        renderPick(st, you);
      }

      var pr = Panel.primary(st, you);
      panel.current = pr;
      Dom.text(primaryBtn.firstChild, pr.label);
      Dom.text(primaryBtn.lastChild, pr.sub || '');
      Dom.toggle(primaryBtn, 'ui-has-sub', !!pr.sub);
      Dom.toggle(primaryBtn, 'ui-waiting', !!pr.waiting);
      var disabled = !!ctx.busy || (!!pr.waiting && !pr.dialog);
      primaryBtn.disabled = disabled;
      primaryBtn.setAttribute('aria-label', pr.label + (pr.sub ? ', ' + pr.sub : ''));
      var altSig = (pr.alts || []).map(function (x) { return x.label; }).join('|') + (ctx.busy ? '#b' : '');
      if (alts.dataset.sig !== altSig) {
        alts.dataset.sig = altSig;
        Dom.clear(alts);
        (pr.alts || []).forEach(function (x) {
          alts.appendChild(Dom.btn(x.label, function () { handlers.onPrimary && handlers.onPrimary({ action: x.action }); }, { cls: 'ui-alt', disabled: !!ctx.busy, aria: x.aria || x.label }));
        });
      }
      alts.hidden = !(pr.alts && pr.alts.length);
      Dom.toggle(el, 'ui-has-alts', !alts.hidden);
      var myTurn = actor === you && (st.phase === 'roll' || st.phase === 'end');
      manageBtn.disabled = st.phase === 'over';
      var others = (st.players || []).some(function (p) { return p.id !== you && !p.out; });
      tradeBtn.disabled = !!ctx.busy || !myTurn || !others || (st.offersThisTurn | 0) >= ((R() && R().MAX_OFFERS) || 3);

      var two = selected !== null && Dom.player(st, selected) ? [Panel.pickText(st, selected, you)] : Panel.lastLines(st, you, 2);
      logText.lastChild.hidden = !two[1];
      fitStrip(logText.firstChild, two[0] || 'Tap for the game log');
      fitStrip(logText.lastChild, two[1] || '');
      renderRecent(st, you);
    }

    function renderPick(st, you) {
      var p = selected === null ? null : Dom.player(st, selected);
      if (p && p.out) { selected = null; p = null; if (handlers.onPick) handlers.onPick(null, []); }
      pickLine.hidden = !p;
      Dom.text(pickLine, p ? Panel.pickText(st, p.id, you) : '');
      if (p && handlers.onPick) handlers.onPick(selected, ownedBy(st, selected));
    }
    panel.clearPick = function () { if (selected === null) return false; selected = null; chipSig = ''; if (handlers.onPick) handlers.onPick(null, []); if (lastSt) renderPanel(lastSt, lastCtx || {}); return true; };
    panel.picked = function () { return selected; };

    function fitChips() {
      chips.classList.remove('ui-tight');
      if (!chips.isConnected || !chips.getClientRects || !chips.getClientRects().length) return;
      var list = chips.querySelectorAll('.ui-chip-cash');
      for (var i = 0; i < list.length; i++) {
        if (list[i].scrollWidth > list[i].clientWidth + 1) { chips.classList.add('ui-tight'); return; }
      }
    }
    panel.fitChips = fitChips;

    function renderRecent(st, you) {
      var log = st.log || [];
      var lastEv = log[log.length - 1];
      var sig = log.length + ':' + (lastEv ? evType(lastEv) + (lastEv.p === undefined ? '' : lastEv.p) : '') + ':' + st.round + '#' + you;
      if (sig === recentSig) return;
      recentSig = sig;
      Dom.clear(recentList);
      var lines = Panel.recentLines(st, you, 24);
      if (!lines.length) recentList.appendChild(h('li', { cls: 'ui-recent-line ui-muted' }, 'Nothing has happened yet.'));
      lines.forEach(function (l, k) {
        var li = h('li', { cls: 'ui-recent-line' + (l.turn ? ' ui-recent-turn' : '') + (l.mine ? ' ui-recent-you' : '') + (k === 0 ? ' ui-recent-new' : '') });
        li.appendChild(Panel.dot(l.color));
        li.appendChild(h('span', null, l.text));
        recentList.appendChild(li);
      });
    }

    return panel;
  };
})(window.ECE = window.ECE || {});
;
(function (ECE) {
  'use strict';

  var Dom = ECE.Dom;
  var D = {};
  ECE.Dialogs = D;

  var stack = [];
  var listeners = [];
  var seq = 0;
  var layerRoot = null;

  function root() {
    if (layerRoot && layerRoot.isConnected) return layerRoot;
    layerRoot = document.getElementById('dialogs');
    if (!layerRoot) {
      layerRoot = Dom.h('div', { id: 'dialogs', cls: 'ui-dialogs' });
      document.body.appendChild(layerRoot);
    }
    return layerRoot;
  }

  function changed() {
    for (var i = 0; i < listeners.length; i++) {
      try { listeners[i](); } catch (e) { Dom.report(e, 'dialogs:onChange'); }
    }
  }
  D.onChange = function (fn) { listeners.push(fn); };

  function topHandle() { return stack.length ? stack[stack.length - 1] : null; }

  var RETAP_MS = 450, TAP_OPEN_MS = 400, CPU_OPEN_MS = 700, RETAP_PX = 32;
  D.RETAP_MS = RETAP_MS; D.TAP_OPEN_MS = TAP_OPEN_MS; D.CPU_OPEN_MS = CPU_OPEN_MS;
  var tapping = false;
  var tapAt = null;
  var tapClosed = null;
  if (typeof document !== 'undefined' && document.addEventListener) {
    document.addEventListener('click', function (ev) {
      if (!(ev.detail > 0)) return;
      var t = ev.target && ev.target.closest ? ev.target : null;
      if (tapClosed && Dom.now() - tapClosed.at < TAP_OPEN_MS && t && t.closest('#app') && t.closest('button') &&
          Math.abs(ev.clientX - tapClosed.x) <= RETAP_PX && Math.abs(ev.clientY - tapClosed.y) <= RETAP_PX) {
        ev.stopPropagation(); ev.preventDefault(); return;
      }
      tapping = true;
      tapAt = { x: ev.clientX, y: ev.clientY };
      setTimeout(function () { tapping = false; }, 0);
    }, true);
  }
  function quietOn(hd) { return !!hd.quietUntil && Dom.now() < hd.quietUntil; }
  function markQuiet(hd) {
    var on = hd.open && quietOn(hd);
    if (!on) { hd.quietAll = false; hd.quietWait = false; }
    Dom.toggle(hd.box, 'ui-quiet-wait', on && !!hd.quietWait);
    var list = hd.box.querySelectorAll('button');
    for (var i = 0; i < list.length; i++) {
      var b = list[i];
      var g = on && (hd.quietAll ? !b.classList.contains('ui-dlg-x') : b.hasAttribute('data-once'));
      if (g) {
        if (!b.disabled && b.getAttribute('aria-disabled') !== 'true') { b.setAttribute('aria-disabled', 'true'); b.setAttribute('data-quiet', '1'); }
      } else if (b.hasAttribute('data-quiet')) { b.removeAttribute('data-quiet'); b.removeAttribute('aria-disabled'); }
    }
  }
  function quiet(hd, ms, all, wait) {
    var until = Dom.now() + ms;
    if (!(hd.quietUntil > until)) hd.quietUntil = until;
    if (all) hd.quietAll = true;
    if (wait) hd.quietWait = true;
    markQuiet(hd);
    if (hd.quietTimer) clearTimeout(hd.quietTimer);
    hd.quietTimer = setTimeout(function () { hd.quietTimer = 0; markQuiet(hd); }, Math.max(0, hd.quietUntil - Dom.now()) + 10);
  }
  function once(b) { b.setAttribute('data-once', ''); return b; }
  D.once = once;
  D.quiet = function (id) { var hd = D.get(id); return !!hd && quietOn(hd); };
  D.quietLeft = function (id) { var hd = D.get(id); return hd && quietOn(hd) ? Math.round(hd.quietUntil - Dom.now()) : 0; };

  var inertSet = [];
  function appInert(app, on) {
    var i;
    for (i = 0; i < inertSet.length; i++) inertSet[i].inert = false;
    inertSet = [];
    if (!on) { app.inert = false; return; }
    var keep = document.getElementById('board');
    if (!keep || !app.contains(keep)) { app.inert = true; return; }
    app.inert = false;
    for (var n = keep; n && n !== app; n = n.parentNode) {
      var par = n.parentNode;
      if (!par) break;
      for (var c = par.firstElementChild; c; c = c.nextElementSibling) {
        if (c !== n && !c.inert) { c.inert = true; inertSet.push(c); }
      }
    }
  }

  function restack() {
    for (var i = 0; i < stack.length; i++) {
      var under = i < stack.length - 1;
      Dom.toggle(stack[i].layer, 'ui-under', under);
      stack[i].layer.setAttribute('aria-hidden', under ? 'true' : 'false');
      if ('inert' in stack[i].layer) stack[i].layer.inert = under;
    }
    var app = document.getElementById('app');
    if (app) {
      var any = stack.length > 0;
      if ('inert' in app) appInert(app, any);
      if (any) app.setAttribute('aria-hidden', 'true'); else app.removeAttribute('aria-hidden');
    }
    document.documentElement.classList.toggle('ui-modal-open', stack.length > 0);
  }

  function place(hd) {
    var el = hd.box;
    el.style.left = ''; el.style.top = ''; el.style.width = ''; el.style.maxHeight = ''; el.style.right = ''; el.style.bottom = '';
    var phone = document.documentElement.classList.contains('phone');
    var A = ECE.App;
    var r = null;
    if (hd.spec.place === 'board' && A && typeof A.boardRect === 'function') r = A.boardRect();
    else if (hd.spec.place === 'side' && !phone && A && typeof A.sideRect === 'function') r = A.sideRect();
    if (!r || !(r.width > 40) || !(r.height > 40)) { hd.layer.classList.remove('ui-placed'); return; }
    hd.layer.classList.add('ui-placed');
    if (hd.spec.place === 'board') {
      var w = Math.min(340, Math.max(220, r.width * 0.74));
      el.style.width = Math.round(w) + 'px';
      el.style.left = Math.round(r.left + (r.width - w) / 2) + 'px';
      var winH = window.innerHeight || 800;
      var ins = phone && ECE.Mobile && typeof ECE.Mobile.insets === 'function' ? ECE.Mobile.insets() : { top: 0, bottom: 0 };
      var maxH = phone ? winH - ins.top - ins.bottom - 16 : Math.min(r.height - 16, winH - 16);
      var hgt = Math.min(el.offsetHeight || 260, maxH);
      var top = r.top + (r.height - hgt) / 2;
      top = Math.max(ins.top + 8, Math.min(top, winH - ins.bottom - hgt - 8));
      el.style.top = Math.round(top) + 'px';
      el.style.maxHeight = Math.round(maxH) + 'px';
    } else {
      var pad = 12;
      el.style.left = Math.round(r.left + pad) + 'px';
      el.style.width = Math.round(r.width - pad * 2) + 'px';
      el.style.top = Math.round(r.top + pad) + 'px';
      el.style.maxHeight = Math.round(r.height - pad * 2) + 'px';
    }
  }

  function renderInto(hd) {
    var keep = document.activeElement && hd.box.contains(document.activeElement) ? document.activeElement : null;
    var keepKey = keep && keep.dataset ? keep.dataset.k : null;
    var scroll = hd.body.scrollTop;
    Dom.clear(hd.body);
    Dom.clear(hd.foot);
    hd.foot.hidden = false;
    try { hd.spec.render(hd); } catch (e) { Dom.report(e, 'dialog:' + hd.id); hd.body.appendChild(Dom.h('p', { cls: 'ui-error-line' }, 'This window could not be drawn.')); hd.foot.appendChild(Dom.btn('Close', function () { hd.close('error'); }, { primary: true })); }
    if (!hd.foot.firstChild) hd.foot.hidden = true;
    if (hd.retapAt && Dom.now() - hd.retapAt < 1500) { hd.retapAt = 0; quiet(hd, RETAP_MS, false, false); }
    else markQuiet(hd);
    hd.body.scrollTop = scroll;
    if (keepKey) {
      var again = hd.box.querySelector('[data-k="' + keepKey.replace(/"/g, '') + '"]');
      if (again && !again.disabled) Dom.focus(again);
      else focusFirst(hd);
    } else if (keep && !keep.isConnected) focusFirst(hd);
    place(hd);
  }

  function focusFirst(hd) {
    if (hd.spec.focus === 'box') { Dom.focus(hd.box); return; }
    var f = hd.box.querySelector('[data-autofocus]:not([disabled])') || hd.foot.querySelector('.ui-btn-primary:not([disabled])') ||
      Dom.focusables(hd.foot)[0] || Dom.focusables(hd.body)[0] || hd.box;
    Dom.focus(f);
  }

  D.open = function (spec) {
    var existing = D.get(spec.id);
    if (existing) {
      existing.spec = spec;
      existing.title(spec.title || '');
      renderInto(existing);
      return existing;
    }
    var n = ++seq;
    var titleId = 'ui-dlg-title-' + n;
    var layer = Dom.h('div', { cls: 'ui-dlg-layer place-' + (spec.place || 'center') + (spec.lightBackdrop ? ' ui-light' : '') });
    var backdrop = Dom.h('div', { cls: 'ui-backdrop' });
    var box = Dom.h('div', { cls: 'ui-dlg ' + (spec.cls || ''), role: spec.role || 'dialog', 'aria-modal': 'true', 'aria-labelledby': titleId, tabindex: '-1' });
    var head = Dom.h('div', { cls: 'ui-dlg-head' });
    var titleEl = Dom.h('h2', { id: titleId, cls: 'ui-dlg-title' }, spec.title || '');
    head.appendChild(titleEl);
    var body = Dom.h('div', { cls: 'ui-dlg-body' });
    var foot = Dom.h('div', { cls: 'ui-dlg-foot' });
    var opener = document.activeElement;
    var hd = {
      id: spec.id || ('dlg' + n), spec: spec, layer: layer, box: box, head: head, body: body, foot: foot,
      opener: opener, openerByKeyboard: keyboardFocus(opener), data: spec.data || {},
      title: function (t) { Dom.text(titleEl, t); },
      update: function () { if (hd.open) renderInto(hd); },
      close: function (reason) { closeHandle(hd, reason); },
      open: true
    };
    if (spec.closable) {
      var x = Dom.btn(Dom.icon('close', 20), function () { hd.close('x'); }, { cls: 'ui-dlg-x', ghost: true, aria: 'Close' });
      head.appendChild(x);
      Dom.on(backdrop, 'click', function () { hd.close('backdrop'); });
    }
    box.appendChild(head);
    box.appendChild(body);
    box.appendChild(foot);
    layer.appendChild(backdrop);
    layer.appendChild(box);
    Dom.on(box, 'keydown', function (ev) { Dom.trapTab(box, ev); });
    box.addEventListener('click', function (ev) {
      if (!(ev.detail > 0)) return;
      var b = ev.target && ev.target.closest ? ev.target.closest('button') : null;
      if (!b || !box.contains(b)) return;
      if (quietOn(hd)) {
        var held = hd.quietAll ? !b.classList.contains('ui-dlg-x') : b.hasAttribute('data-once') &&
          (!hd.retapXY || (Math.abs(ev.clientX - hd.retapXY.x) <= RETAP_PX && Math.abs(ev.clientY - hd.retapXY.y) <= RETAP_PX));
        if (held) { ev.stopPropagation(); ev.preventDefault(); return; }
      }
      if (b.hasAttribute('data-once') && !b.disabled && (b.getAttribute('aria-disabled') !== 'true' || b.hasAttribute('data-quiet'))) {
        hd.retapAt = Dom.now(); hd.retapXY = { x: ev.clientX, y: ev.clientY };
        quiet(hd, RETAP_MS, false, false);
      }
    }, true);
    root().appendChild(layer);
    stack.push(hd);
    restack();
    renderInto(hd);
    focusFirst(hd);
    if (spec.guard > 0) quiet(hd, spec.guard, true, true);
    else if (tapping) quiet(hd, TAP_OPEN_MS, true, false);
    if (typeof requestAnimationFrame === 'function') requestAnimationFrame(function () { if (hd.open) place(hd); });
    changed();
    return hd;
  };

  function closeHandle(hd, reason) {
    if (!hd || !hd.open) return;
    hd.open = false;
    if (hd.quietTimer) { clearTimeout(hd.quietTimer); hd.quietTimer = 0; }
    if (tapping && tapAt) tapClosed = { at: Dom.now(), x: tapAt.x, y: tapAt.y };
    var i = stack.indexOf(hd);
    if (i >= 0) stack.splice(i, 1);
    if (hd.layer.parentNode) hd.layer.parentNode.removeChild(hd.layer);
    restack();
    try { if (hd.spec.onClose) hd.spec.onClose(reason || 'close', hd); } catch (e) { Dom.report(e, 'dialog:onClose'); }
    var t = topHandle();
    if (t) focusFirst(t);
    else if (hd.openerByKeyboard && hd.opener && hd.opener.isConnected && typeof hd.opener.focus === 'function') Dom.focus(hd.opener);
    else {
      var a = document.activeElement;
      var pb = document.getElementById('ui-primary');
      var desk = !document.documentElement.classList.contains('phone');
      if (desk && pb && !pb.disabled && pb.getClientRects().length && !(pb.closest && pb.closest('[hidden]'))) Dom.focus(pb);
      else if (a && a !== document.body && typeof a.blur === 'function' && !(a.closest && a.closest('.ui-dlg-layer'))) a.blur();
    }
    changed();
  }

  function keyboardFocus(e) {
    if (!e || e === document.body || e === document.documentElement) return false;
    return Dom.focusByKeyboard ? Dom.focusByKeyboard(e) : false;
  }
  D.keyboardFocus = keyboardFocus;

  D.get = function (id) {
    for (var i = 0; i < stack.length; i++) if (stack[i].id === id) return stack[i];
    return null;
  };
  D.isOpen = function (id) { return id ? !!D.get(id) : stack.length > 0; };
  D.top = function () { var t = topHandle(); return t ? t.id : null; };
  D.list = function () { return stack.map(function (h) { return h.id; }); };
  D.blocking = function () {
    for (var i = 0; i < stack.length; i++) if (!stack[i].spec.live) return true;
    return false;
  };
  D.close = function (id, reason) { var hd = D.get(id); if (hd) hd.close(reason); };
  D.closeAll = function () { while (stack.length) closeHandle(stack[stack.length - 1], 'all'); };
  D.refresh = function () {
    var list = stack.slice();
    for (var i = 0; i < list.length; i++) if (list[i].open) renderInto(list[i]);
  };
  D.replace = function () { for (var i = 0; i < stack.length; i++) place(stack[i]); };
  D.escape = function () {
    var t = topHandle();
    if (!t) return false;
    if (t.spec.closable) { t.close('esc'); return true; }
    if (typeof t.spec.onEscape === 'function') { t.spec.onEscape(t); return true; }
    return true;
  };

  var h = function (t, p, k) { return Dom.h(t, p, k); };
  function B() { return ECE.BoardData; }
  function R() { return ECE.Rules; }
  function money(n) { return Dom.money(n); }
  function pl(state, id) { return Dom.player(state, id); }
  function who(ctx, id) {
    if (id === null || id === undefined) return 'the bank';
    if (id === ctx.you) return 'you';
    var p = pl(ctx.state, id);
    return p ? p.name : 'someone';
  }
  function Who(ctx, id) { var w = who(ctx, id); return w.charAt(0).toUpperCase() + w.slice(1); }
  function prop(state, i) { return state && state.props ? state.props[i] || state.props[String(i)] || null : null; }
  function ruleCall(name, args, fallback) {
    var Rl = R();
    if (!Rl || typeof Rl[name] !== 'function') return fallback;
    try { return Rl[name].apply(Rl, args); } catch (e) { Dom.report(e, 'rules.' + name); return fallback; }
  }
  function legalHas(list, t, space) {
    for (var i = 0; i < list.length; i++) {
      var a = list[i];
      if (a && a.t === t && (space === undefined || a.space === space)) return a;
    }
    return null;
  }
  function row(label, value, cls) {
    return h('div', { cls: 'ui-row' + (cls ? ' ' + cls : '') }, [h('span', { cls: 'ui-row-k' }, label), h('span', { cls: 'ui-row-v' }, value)]);
  }
  function para(text, cls) { return h('p', { cls: 'ui-p' + (cls ? ' ' + cls : '') }, text); }
  function chipFor(ctx, id, extra) {
    var p = pl(ctx.state, id);
    if (!p) return h('span');
    return h('span', { cls: 'ui-mini-chip' + (extra ? ' ' + extra : '') }, [Dom.token(p.token, p.color, 20), h('span', { cls: 'ui-mini-name' }, id === ctx.you ? 'You' : p.name)]);
  }
  function key(b, k) { b.dataset.k = k; return b; }
  function homesForTower() { var R0 = B() && B().RULES; return Math.max(1, ((R0 && R0.maxLevel) || 5) - 1); }
  D.homesForTower = homesForTower;
  function youName(ctx, p) {
    if (p.id !== ctx.you) return p.name;
    return /^you$/i.test(String(p.name || '').trim()) ? 'You' : p.name + ' (you)';
  }
  D.youName = youName;
  function youNameEls(ctx, p) {
    var full = youName(ctx, p);
    if (p.id !== ctx.you || full === 'You') return [h('span', { cls: 'ui-name' }, full)];
    return [h('span', { cls: 'ui-name' }, p.name), h('span', { cls: 'ui-you-mark' }, '(you)')];
  }
  D.youNameEls = youNameEls;

  function spaceHead(i, withAbout) {
    var s = Dom.space(i) || {};
    var about = withAbout && typeof s.about === 'string' && s.about;
    var d = s.district ? B().district(s.district) : null;
    var area = d ? d.name : (s.area || '');
    var head = h('div', { cls: 'ui-space-head' }, [Dom.spaceBadge(i), h('div', { cls: 'ui-space-names' }, [h('div', { cls: 'ui-space-name' }, s.name || ''), area ? h('div', { cls: 'ui-space-area' }, area) : null, about ? h('div', { cls: 'ui-space-about' }, s.about) : null])]);
    if (d) head.style.borderColor = d.color;
    return head;
  }

  function transitCount(state, owner) {
    var n = 0, T = B().TRANSIT || [];
    for (var k = 0; k < T.length; k++) { var pp = prop(state, T[k]); if (pp && pp.owner === owner) n++; }
    return n;
  }
  function utilityCount(state, owner) {
    var n = 0, U = B().UTILITIES || [];
    for (var k = 0; k < U.length; k++) { var pp = prop(state, U[k]); if (pp && pp.owner === owner) n++; }
    return n;
  }

  function rentRows(state, i) {
    var s = Dom.space(i), Bd = B(), out = [];
    if (!s) return out;
    var pp = prop(state, i);
    var owner = pp ? pp.owner : null;
    if (s.kind === 'street') {
      var names = (ECE.Glossary && ECE.Glossary.buildings && ECE.Glossary.buildings.levelNames) || ['No buildings', '1 home', '2 homes', '3 homes', '4 homes', 'Tower'];
      var full = owner !== null && owner !== undefined ? !!ruleCall('ownsDistrict', [state, owner, s.district], false) : false;
      for (var lv = 0; lv <= 5; lv++) {
        var r = { label: names[lv], amount: s.rent[lv], current: !!pp && !pp.mortgaged && (pp.level | 0) === lv };
        if (lv === 0) { r.extra = 'all 3: ' + money(s.rent[0] * 2); if (r.current && full) r.boost = true; }
        out.push(r);
      }
    } else if (s.kind === 'transit') {
      var tr = Bd.RULES.transitRent || [];
      var have = owner !== null && owner !== undefined ? transitCount(state, owner) : -1;
      for (var k = 0; k < tr.length; k++) out.push({ label: (k + 1) + (k ? ' stops owned' : ' stop owned'), amount: tr[k], current: !!pp && !pp.mortgaged && have === k + 1 });
    } else if (s.kind === 'utility') {
      var ut = Bd.RULES.utilityTimes || [];
      var hu = owner !== null && owner !== undefined ? utilityCount(state, owner) : -1;
      out.push({ label: 'Owner has 1', text: 'dice total × ' + ut[0], current: !!pp && !pp.mortgaged && hu === 1 });
      out.push({ label: 'Owner has both', text: 'dice total × ' + ut[1], current: !!pp && !pp.mortgaged && hu === 2 });
    }
    return out;
  }

  function rentTable(state, i) {
    var rows = rentRows(state, i);
    if (!rows.length) return null;
    var t = h('div', { cls: 'ui-rent', role: 'table', 'aria-label': 'Rent' });
    rows.forEach(function (r) {
      var val = r.text || money(r.amount);
      if (r.boost) val = money(r.amount * 2) + ' (x2)';
      var line = h('div', { cls: 'ui-rent-row' + (r.current ? ' ui-current' : ''), role: 'row' }, [
        h('span', { cls: 'ui-rent-k', role: 'cell' }, [r.current ? h('span', { cls: 'ui-here', 'aria-label': 'now' }, '▶') : null, r.label]),
        h('span', { cls: 'ui-rent-v', role: 'cell' }, [val, r.extra && !r.boost ? h('small', { cls: 'ui-rent-x' }, ' (' + r.extra + ')') : null])
      ]);
      t.appendChild(line);
    });
    return t;
  }

  function ownerLine(ctx, i) {
    var pp = prop(ctx.state, i);
    var s = Dom.space(i);
    if (!B().isOwnable(i)) return null;
    if (!pp) return row('Owner', 'Nobody yet', 'ui-owner');
    var p = pl(ctx.state, pp.owner);
    var v = h('span', { cls: 'ui-owner-v' }, [p ? Dom.token(p.token, p.color, 18) : null, ' ', pp.owner === ctx.you ? 'You' : (p ? p.name : '?'), pp.mortgaged ? h('span', { cls: 'ui-badge ui-badge-m' }, 'Mortgaged') : null]);
    if (s && s.kind === 'street' && (pp.level | 0) > 0) v.appendChild(Dom.levelGlyphs(pp.level | 0, false));
    return row('Owner', v, 'ui-owner');
  }

  function askOwner(ctx, i) {
    var st = ctx.state;
    if (!st || !st.players) return null;
    var pp = prop(st, i);
    if (!pp || pp.owner === ctx.you) return null;
    var op = pl(st, pp.owner);
    if (!op || op.out || op.kind === 'human') return null;
    if (ruleCall('actor', [st], null) !== ctx.you || (st.phase !== 'roll' && st.phase !== 'end')) return null;
    if ((st.offersThisTurn | 0) >= ((R() && R().MAX_OFFERS) || 3)) return null;
    var tr = ruleCall('tradeable', [st, pp.owner], null);
    if (!tr || !Array.isArray(tr.spaces) || tr.spaces.indexOf(i) < 0) return null;
    return pp.owner;
  }
  D.askOwner = askOwner;
  function openAsk(ctx, hd, owner, i) { hd.close('trade'); D.trade(ctx, { to: owner, get: { spaces: [i] } }); }

  function kindTitle(s) {
    switch (s.kind) {
      case 'street': { var d = B().district(s.district); return (d ? d.name + ' ' : '') + 'street'; }
      case 'transit': return s.mode === 'ferry' ? 'Ferry dock' : s.mode === 'bus' ? 'Bus transit stop' : 'Train station';
      case 'utility': return 'Utility';
      case 'tax': return /toll/i.test(s.name || '') ? 'Toll' : 'Tax';
      case 'card': return 'Card space';
      case 'start': return 'Payday';
      case 'traffic': return 'Traffic jam';
      case 'rest': return 'Rest stop';
      case 'bridge': return 'Drawbridge';
      default: return 'Corner';
    }
  }
  D.deed = function (ctx, i) {
    i = i | 0;
    var s = Dom.space(i);
    if (!s) return null;
    return D.open({
      id: 'deed', title: kindTitle(s), cls: 'ui-dlg-deed', place: 'board', closable: true,
      render: function (hd) {
        var st = ctx.state, Bd = B(), body = hd.body;
        hd.title(kindTitle(s));
        body.appendChild(spaceHead(i, true));
        if (s.kind === 'street' || s.kind === 'transit' || s.kind === 'utility') {
          var ol = ownerLine(ctx, i);
          if (ol) body.appendChild(ol);
          body.appendChild(row('Price', money(s.price)));
          var rt = rentTable(st, i);
          if (rt) { body.appendChild(h('div', { cls: 'ui-sub' }, 'Rent')); body.appendChild(rt); }
          if (s.kind === 'street') {
            var d = Bd.districtOf(i);
            body.appendChild(row('Build', money(Bd.buildCost(i)) + ' per home or tower'));
            var dp = prop(st, i);
            var whole = !!dp && !!d && !!ruleCall('ownsDistrict', [st, dp.owner, d.id], false);
            if (whole && dp.owner === ctx.you) body.appendChild(para('You own all of ' + d.name + '. Build evenly; a tower needs ' + homesForTower() + ' homes on each street.', 'ui-small'));
            else if (whole) body.appendChild(para(Who(ctx, dp.owner) + ' owns all of ' + d.name + '.', 'ui-small'));
            else body.appendChild(para('Own all of ' + (d ? d.name : 'the district') + ' (' + (d ? d.spaces.map(Dom.spaceName).join(', ') : '') + ') to build.', 'ui-small'));
          }
          body.appendChild(row('Mortgage', money(Bd.mortgageValue(i)) + ' (pay off ' + money(Bd.unmortgageCost(i)) + ')'));
        } else if (s.kind === 'tax') {
          body.appendChild(row('Pay', money(s.amount)));
          if (st && st.rules && st.rules.rainFund) body.appendChild(para('With the Rain Fund rule on, this goes into the Rain Fund.', 'ui-small'));
        } else if (s.kind === 'card') {
          var deck = ECE.CardData && ECE.CardData.DECKS[s.deck];
          body.appendChild(para('Draw the top ' + (deck ? deck.name : 'card') + ' card. ' + (s.deck === 'rain' ? 'Mostly moves around the board.' : 'Mostly money.')));
        } else if (s.kind === 'start') {
          body.appendChild(para('Payday! Get ' + money(Bd.RULES.salary) + ' each time you pass or land here.'));
        } else if (s.kind === 'traffic') {
          body.appendChild(para(s.note || ''));
          body.appendChild(para('To leave: pay ' + money(Bd.RULES.trafficFee) + ', use a Carpool Pass, or roll doubles (' + Bd.RULES.trafficMaxTries + ' tries; after the last one you pay ' + money(Bd.RULES.trafficFee) + ' and move).', 'ui-small'));
        } else if (s.kind === 'rest') {
          body.appendChild(para(s.note || ''));
          if (st && st.rules && st.rules.rainFund) body.appendChild(row('Rain Fund now', money(st.rainFund || 0)));
        } else if (s.note) {
          body.appendChild(para(s.note));
        }
        var here = (st && st.players || []).filter(function (p) { return !p.out && p.pos === i; });
        if (here.length) {
          var line = h('div', { cls: 'ui-here-list' }, [h('span', { cls: 'ui-row-k' }, 'Here now')]);
          here.forEach(function (p) { line.appendChild(chipFor(ctx, p.id, p.stuck ? 'ui-stuck' : '')); });
          body.appendChild(line);
        }
        var asker = askOwner(ctx, i);
        if (asker !== null) hd.foot.appendChild(key(Dom.btn('Offer a trade', function () { openAsk(ctx, hd, asker, i); }, { aria: 'Offer ' + Who(ctx, asker) + ' a trade for ' + s.name }), 'ask'));
        hd.foot.appendChild(Dom.btn('Close', function () { hd.close('ok'); }, { primary: true }));
      }
    });
  };

  D.buy = function (ctx) {
    return D.open({
      id: 'buy', title: 'For sale', cls: 'ui-dlg-buy', place: 'side', live: false,
      render: function (hd) {
        var st = ctx.state, pend = st.pending || {};
        if (st.phase !== 'buy' || pend.kind !== 'buy') { hd.close('done'); return; }
        var i = pend.space, s = Dom.space(i) || {};
        var me = pl(st, ctx.you) || { cash: 0 };
        var price = s.price || 0;
        hd.title('Buy ' + s.name + '?');
        hd.body.appendChild(spaceHead(i));
        hd.body.appendChild(row('Price', money(price), 'ui-big'));
        var legal = ctx.legal();
        var canBuy = !!legalHas(legal, 'buy') && me.cash >= price;
        hd.body.appendChild(row('Your cash', money(me.cash) + (canBuy ? '  →  ' + money(me.cash - price) : '')));
        if (me.cash < price) {
          var liquid = ruleCall('liquid', [st, ctx.you], me.cash);
          hd.body.appendChild(para('You need ' + money(price - me.cash) + ' more.' + (liquid >= price ? ' Sell homes or mortgage spaces to raise it.' : ''), 'ui-warn'));
          if (liquid >= price) hd.foot.appendChild(key(Dom.btn('Raise cash', function () { ctx.openManage(); }), 'raise'));
        }
        var dist = B().districtOf(i);
        if (dist) {
          var ownersLine = h('div', { cls: 'ui-district-owners' }, [h('span', { cls: 'ui-row-k' }, dist.name)]);
          dist.spaces.forEach(function (j) {
            var pj = prop(st, j);
            var label = j === i ? 'this one' : pj ? (pj.owner === ctx.you ? 'yours' : who(ctx, pj.owner)) : 'for sale';
            ownersLine.appendChild(h('span', { cls: 'ui-own-pill' + (pj && pj.owner === ctx.you ? ' ui-mine' : '') }, Dom.spaceName(j) + ': ' + label));
          });
          hd.body.appendChild(ownersLine);
        }
        var rt = rentTable(st, i);
        if (rt) { hd.body.appendChild(h('div', { cls: 'ui-sub' }, 'Rent')); hd.body.appendChild(rt); }
        if (s.kind === 'street') hd.body.appendChild(row('Homes', money(B().buildCost(i)) + ' each', 'ui-small-row'));
        var auctions = !st.rules || st.rules.auctions !== false;
        hd.foot.appendChild(key(Dom.btn(auctions ? 'No, auction it' : 'No thanks', function () { ctx.act({ t: 'decline' }); }, { aria: auctions ? 'No, put it up for auction' : 'No thanks' }), 'decline'));
        hd.foot.appendChild(key(Dom.btn('Buy ' + money(price), function () { ctx.act({ t: 'buy' }); }, { primary: true, disabled: !canBuy }), 'buy'));
      }
    });
  };

  function bidFor(st, step) {
    var pend = st.pending || {};
    var open = B().RULES.auctionOpen || 10;
    var cur = pend.bid | 0;
    return cur > 0 ? cur + step : Math.max(open, step);
  }
  D.bidFor = bidFor;

  function bidInAuction(state, you) {
    var log = (state && state.log) || [];
    for (var i = log.length - 1; i >= 0; i--) {
      var e = log[i];
      if (!e) continue;
      if (e.t === 'auction') return false;
      if (e.t === 'bid' && e.p === you) return true;
    }
    return false;
  }
  D.bidInAuction = bidInAuction;

  D.auction = function (ctx, opts) {
    var memo = { space: null, result: null };
    var pend0 = ctx.state.pending || {};
    memo.space = pend0.space;
    return D.open({
      id: 'auction', title: 'Auction', cls: 'ui-dlg-auction', place: 'side', focus: 'box',
      live: true,
      guard: opts && opts.cpu ? CPU_OPEN_MS : 0,
      render: function (hd) {
        var st = ctx.state, pend = st.pending || {};
        var running = st.phase === 'auction' && pend.kind === 'auction';
        if (running) memo.space = pend.space;
        var i = memo.space, s = Dom.space(i) || {};
        if (!running && !ctx.demo && !bidInAuction(st, ctx.you)) { hd.close('done'); return; }
        hd.title('Auction: ' + (s.name || ''));
        hd.body.appendChild(spaceHead(i));
        hd.body.appendChild(row('Price on the board', money(s.price || 0)));
        var stake = running ? auctionNote(ctx, i) : null;
        if (stake) hd.body.appendChild(h('p', { cls: 'ui-small ui-hint' + (stake.warn ? ' ui-hint-warn' : '') }, [Dom.tag(stake.d.id), h('span', null, stake.text)]));
        if (!running) {
          hd.spec.live = false;
          var res = memo.result || (ctx.lastAuctionEnd ? ctx.lastAuctionEnd() : null);
          memo.result = res;
          var line;
          if (res && res.winner !== null && res.winner !== undefined) line = (res.winner === ctx.you ? 'You bought it for ' : Who(ctx, res.winner) + ' bought it for ') + money(res.amount) + '.';
          else line = 'No bids: it stays for sale.';
          hd.body.appendChild(para(line, 'ui-result'));
          hd.foot.appendChild(key(Dom.btn('OK', function () { hd.close('ok'); }, { primary: true }), 'ok'));
          return;
        }
        hd.spec.live = !ctx.demo;
        var leader = pend.leader;
        hd.body.appendChild(row('Current bid', (pend.bid | 0) > 0 ? money(pend.bid) + ' by ' + who(ctx, leader) : 'No bids yet', 'ui-big'));
        var order = pend.order || [];
        var actor = order[pend.idx | 0];
        var me = pl(st, ctx.you) || { cash: 0 };
        var inIt = order.indexOf(ctx.you) >= 0;
        var mine = actor === ctx.you;
        var cur = pend.bid | 0;
        var least = ruleCall('minBid', [st], Math.max(B().RULES.auctionOpen || 10, cur + 1)) || 0;
        var priced = me.cash < least;
        if (!inIt) hd.body.appendChild(para(priced && !bidInAuction(st, ctx.you) ? (cur > 0 ? 'You can’t beat ' + money(cur) + ' with your ' + money(me.cash) + ', so you’re out of this auction.' : 'Your ' + money(me.cash) + ' can’t make the first bid, so you’re out of this auction.') : 'You passed. The others finish the auction.', 'ui-small'));
        else if (priced) hd.body.appendChild(para(cur > 0 ? 'You can’t beat ' + money(cur) + ' with your ' + money(me.cash) + ', so you’re out of this auction.' : 'Your ' + money(me.cash) + ' can’t make the first bid, so you’re out of this auction.', 'ui-small'));
        else if (!mine) hd.body.appendChild(para(Who(ctx, actor) + ' is thinking…', 'ui-small ui-wait'));
        else if (cur <= 0) hd.body.appendChild(para('Your bid. The first bid is at least ' + money(least) + '.', 'ui-small'));
        else hd.body.appendChild(para('Your bid. Each bid must beat ' + money(cur) + '.', 'ui-small'));
        hd.body.appendChild(row('Your cash', money(me.cash)));
        var bidders = h('div', { cls: 'ui-bidders', 'aria-label': 'Still bidding' });
        order.forEach(function (id) {
          bidders.appendChild(chipFor(ctx, id, (id === actor ? 'ui-acting' : '') + (id === leader ? ' ui-leader' : '')));
        });
        hd.body.appendChild(h('div', { cls: 'ui-sub' }, 'Still bidding'));
        hd.body.appendChild(bidders);
        var steps = [10, 50, 100];
        var grid = h('div', { cls: 'ui-bid-grid' });
        steps.forEach(function (stp, k) {
          var amt = bidFor(st, stp);
          if (k === 0 && amt > me.cash && me.cash >= least) amt = me.cash;
          var ok = mine && amt <= me.cash && amt >= least;
          grid.appendChild(once(key(Dom.btn([h('b', null, '+' + money(Math.max(0, amt - cur))), h('small', null, money(amt))], function () { ctx.act({ t: 'bid', amount: amt }); }, { disabled: !ok, aria: 'Bid ' + money(amt), cls: 'ui-bid' }), 'bid' + stp)));
        });
        if (inIt) {
          hd.foot.appendChild(grid);
          if (!document.documentElement.classList.contains('phone')) hd.foot.appendChild(para('Tab to a bid or Pass.', 'ui-small ui-keys-hint'));
          hd.foot.appendChild(once(key(Dom.btn('Pass', function () { ctx.act({ t: 'pass' }); }, { disabled: !mine, aria: 'Pass and leave the auction' }), 'pass')));
        }
      },
      onClose: function () { if (ctx.onAuctionClosed) ctx.onAuctionClosed(); }
    });
  };

  D.card = function (ctx, info) {
    var C = ECE.CardData;
    var card = C ? C.card(info.deck, info.id) : null;
    var deck = C ? C.DECKS[info.deck] : null;
    return D.open({
      id: 'card', title: deck ? deck.name : 'Card', cls: 'ui-dlg-card ui-deck-' + info.deck, place: 'board', live: false,
      onEscape: function (hd) { ok(hd); },
      render: function (hd) {
        var icon = h('div', { cls: 'ui-card-icon', 'aria-hidden': 'true' });
        icon.appendChild(deckGlyph(info.deck));
        hd.body.appendChild(icon);
        hd.body.appendChild(h('p', { cls: 'ui-card-text' }, card ? card.text : ''));
        var mine = info.p === ctx.you;
        var what = mine ? cardAction(ctx.state, ctx.you, card) : null;
        if (what && what.line) hd.body.appendChild(h('p', { cls: 'ui-card-next ui-warn' }, what.line));
        var by = mine ? 'Your card.' : Who(ctx, info.p) + ' drew this card.';
        hd.body.appendChild(h('p', { cls: 'ui-card-by' }, by));
        hd.foot.appendChild(key(Dom.btn(what && what.label ? what.label : 'OK', function () { ok(hd); }, { primary: true }), 'ok'));
      }
    });
    function ok(hd) {
      if (info.p === ctx.you && !ctx.demo && ctx.state.phase === 'card') {
        hd.close('ok');
        ctx.act({ t: 'ack' });
      } else hd.close('ok');
    }
  };

  function cardAction(st, you, card) {
    var Bd = B(), e = card && card.effect;
    if (!e || !st) return { label: 'OK', line: null };
    var me = pl(st, you) || { pos: 0 };
    var n = Bd.SPACES.length;
    var others = (st.players || []).filter(function (p) { return p.id !== you && !p.out; }).length;
    var dest = null, label = 'OK';
    if (e.to !== undefined) { dest = e.to | 0; label = 'Go to ' + Dom.spaceName(dest); }
    else if (e.back) { dest = ((me.pos | 0) - (e.back | 0) + n * 4) % n; label = 'Go back to ' + Dom.spaceName(dest); }
    else if (e.nearest) {
      var list = e.nearest === 'utility' ? (Bd.UTILITIES || []) : (Bd.TRANSIT || []);
      var best = null, bd = n + 1;
      list.forEach(function (j) { var dd = ((j - (me.pos | 0)) + n) % n || n; if (dd < bd) { bd = dd; best = j; } });
      if (best !== null) { dest = best; label = 'Go to ' + Dom.spaceName(best); }
    }
    else if (e.traffic) label = 'Go to ' + ((Bd.SPACES[Bd.TRAFFIC] || {}).name || 'Stuck in Traffic');
    else if (e.carpool) label = 'Keep the Carpool Pass';
    else if (e.cash) label = (e.cash > 0 ? 'Collect ' : 'Pay ') + money(Math.abs(e.cash));
    else if (e.each) label = (e.each > 0 ? 'Collect ' : 'Pay ') + money(Math.abs(e.each) * others);
    else if (e.repairs) {
      var homes = 0, towers = 0, top = (Bd.RULES && Bd.RULES.maxLevel) || 5;
      for (var k in (st.props || {})) {
        if (!Object.prototype.hasOwnProperty.call(st.props, k)) continue;
        var pp = st.props[k];
        if (!pp || pp.owner !== you) continue;
        if ((pp.level | 0) >= top) towers++; else homes += pp.level | 0;
      }
      var due = homes * (e.repairs.home | 0) + towers * (e.repairs.tower | 0);
      label = due > 0 ? 'Pay ' + money(due) : 'Nothing to pay';
    }
    var line = null;
    if (dest !== null) {
      var dp = prop(st, dest), ds = Dom.space(dest);
      if (dp && dp.owner !== you && !dp.mortgaged && ds) {
        var op = pl(st, dp.owner);
        if (op && !op.out) {
          var rentTxt;
          if (ds.kind === 'utility') rentTxt = 'rent dice total × ' + ((Bd.RULES.utilityTimes || [])[Math.max(0, utilityCount(st, dp.owner) - 1)] || 0);
          else rentTxt = 'rent ' + money(ruleCall('rent', [st, dest, 7], 0));
          line = ds.name + ': ' + op.name + '’s, ' + rentTxt + '.';
        }
      }
    }
    return { label: label, line: line };
  }
  D.cardAction = cardAction;

  function deckGlyph(deck) {
    var svg = Dom.s('svg', { viewBox: '0 0 24 24', width: 44, height: 44, focusable: 'false' });
    if (ECE.Art && typeof ECE.Art.icon === 'function') { try { ECE.Art.icon(svg, deck === 'rain' ? 'rain' : 'buzz', 12, 12, 24); } catch (e) { Dom.report(e, 'art.icon'); } }
    return svg;
  }
  D.deckGlyph = deckGlyph;

  function holdings(state, p) {
    var Bd = B(), groups = [], other = [];
    Bd.DISTRICTS.forEach(function (d) {
      var mine = d.spaces.filter(function (j) { var pp = prop(state, j); return pp && pp.owner === p; });
      if (mine.length) groups.push({ d: d, mine: mine });
    });
    Bd.SPACES.forEach(function (s) {
      if (s.kind !== 'transit' && s.kind !== 'utility') return;
      var pp = prop(state, s.i);
      if (pp && pp.owner === p) other.push(s.i);
    });
    return { groups: groups, other: other };
  }
  D.holdings = holdings;

  D.manage = function (ctx) {
    var opened = false;
    return D.open({
      id: 'manage', title: 'Manage', cls: 'ui-dlg-manage', place: 'side', closable: true, lightBackdrop: true,
      render: function (hd) {
        var st = ctx.state, Bd = B();
        var me = pl(st, ctx.you) || { cash: 0 };
        var actor = ruleCall('actor', [st], null);
        var legal = actor === ctx.you ? ctx.legal() : [];
        var hold = holdings(st, ctx.you);
        var all = [];
        hold.groups.forEach(function (g) { all = all.concat(g.mine); });
        all = all.concat(hold.other);
        if (!opened && ctx.view && ctx.view.highlight) { opened = true; try { ctx.view.highlight(all); } catch (e) { Dom.report(e, 'view.highlight'); } }
        var top = h('div', { cls: 'ui-manage-top' }, [row('Your cash', money(me.cash), 'ui-big')]);
        var pend = st.pending || {};
        if (st.phase === 'debt' && pend.debts && pend.debts[0] && pend.debts[0].player === ctx.you) {
          var owe = pend.debts[0].amount | 0;
          top.appendChild(para(me.cash >= owe ? 'You can pay the ' + money(owe) + ' you owe now.' : 'You owe ' + money(owe) + ': raise ' + money(owe - me.cash) + ' more.', me.cash >= owe ? 'ui-good' : 'ui-warn'));
        } else if (st.phase === 'buy' && pend.kind === 'buy' && actor === ctx.you) {
          var price = (Dom.space(pend.space) || {}).price || 0;
          top.appendChild(para(me.cash >= price ? 'You can buy ' + Dom.spaceName(pend.space) + ' now.' : 'To buy ' + Dom.spaceName(pend.space) + ' raise ' + money(price - me.cash) + ' more.', me.cash >= price ? 'ui-good' : 'ui-warn'));
        } else if (actor !== ctx.you) {
          top.appendChild(para('You can build, sell and mortgage on your own turn.', 'ui-small'));
        }
        hd.body.appendChild(top);
        if (!all.length) {
          hd.body.appendChild(para('You own no spaces yet. Buy streets, transit stops and utilities when you land on them.'));
        }
        var inDebt = st.phase === 'debt' && pend.debts && pend.debts[0] && pend.debts[0].player === ctx.you;
        if (inDebt && all.length) {
          var raise = raiseOrder(st, ctx.you, legal);
          var sec0 = h('section', { cls: 'ui-manage-group' }, [h('div', { cls: 'ui-group-head' }, [h('b', null, 'Raise cash'), h('span', { cls: 'ui-group-note' }, 'smallest loss of rent first')])]);
          raise.forEach(function (j) {
            var dd = Bd.districtOf(j);
            sec0.appendChild(manageRow(ctx, hd, st, j, prop(st, j), legal, !!dd && !!ruleCall('ownsDistrict', [st, ctx.you, dd.id], false), true));
          });
          if (!raise.length) sec0.appendChild(para('Nothing left to sell or mortgage.', 'ui-small'));
          hd.body.appendChild(sec0);
          hd.foot.appendChild(key(Dom.btn('Done', function () { hd.close('done'); }, { primary: true }), 'done'));
          return;
        }
        hold.groups.forEach(function (g) {
          var d = g.d;
          var full = !!ruleCall('ownsDistrict', [st, ctx.you, d.id], false);
          var sec = h('section', { cls: 'ui-manage-group' });
          var hdr = h('div', { cls: 'ui-group-head' }, [Dom.tag(d.id), h('b', null, d.name), h('span', { cls: 'ui-group-note' }, full ? 'Homes ' + money(d.build) + ' each' : g.mine.length + ' of 3 owned')]);
          sec.appendChild(hdr);
          d.spaces.forEach(function (j) {
            var pp = prop(st, j);
            if (!pp || pp.owner !== ctx.you) {
              var orow = h('div', { cls: 'ui-mrow ui-mrow-other' }, [h('div', { cls: 'ui-mleft' }, [h('span', { cls: 'ui-mname' }, Dom.spaceName(j)), h('span', { cls: 'ui-mstate' }, pp ? 'owned by ' + who(ctx, pp.owner) : 'for sale')])]);
              var asker = askOwner(ctx, j);
              if (asker !== null) orow.appendChild(h('div', { cls: 'ui-mbtns' }, [key(Dom.btn([h('span', null, 'Ask'), h('small', null, 'trade')], function () { openAsk(ctx, hd, asker, j); }, { small: true, aria: 'Ask ' + Who(ctx, asker) + ' for ' + Dom.spaceName(j) }), 'ask' + j)]));
              sec.appendChild(orow);
              return;
            }
            sec.appendChild(manageRow(ctx, hd, st, j, pp, legal, full));
          });
          hd.body.appendChild(sec);
        });
        if (hold.other.length) {
          var sec2 = h('section', { cls: 'ui-manage-group' }, [h('div', { cls: 'ui-group-head' }, [h('b', null, 'Transit and utilities')])]);
          hold.other.forEach(function (j) { sec2.appendChild(manageRow(ctx, hd, st, j, prop(st, j), legal, false)); });
          hd.body.appendChild(sec2);
        }
        if (all.length) hd.body.appendChild(para('Build evenly: a street gets its next home only when no street of its district has fewer. ' + homesForTower() + ' homes on all three, then a tower. Buildings sell back for ' + Dom.share(B().RULES.sellShare) + '.', 'ui-small ui-rulenote'));
        hd.foot.appendChild(key(Dom.btn('Done', function () { hd.close('done'); }, { primary: true }), 'done'));
      },
      onClose: function () { if (ctx.view && ctx.view.highlight) { try { ctx.view.highlight([]); } catch (e) { Dom.report(e, 'view.highlight'); } } }
    });
  };

  function rentText(st, you, j, now) {
    var Bd = B(), s = Dom.space(j), pp = prop(st, j);
    if (!s || !pp) return '';
    if (pp.mortgaged) return 'no rent';
    var lv = pp.level | 0;
    if (s.kind === 'street') {
      var full = !!ruleCall('ownsDistrict', [st, pp.owner, s.district], false);
      var cur = money(Bd.streetRent(s, lv, full));
      var top = (Bd.RULES && Bd.RULES.maxLevel) || 5;
      if (full && lv < top && !now) return (lv === top - 1 ? cur + ' → ' + money(Bd.streetRent(s, lv + 1, full)) : 'rent ' + cur + ' → ' + money(Bd.streetRent(s, lv + 1, full)));
      return 'rent ' + cur;
    }
    if (s.kind === 'transit') return 'rent ' + money((Bd.RULES.transitRent || [])[Math.max(0, transitCount(st, pp.owner) - 1)] || 0);
    return 'dice × ' + ((Bd.RULES.utilityTimes || [])[Math.max(0, utilityCount(st, pp.owner) - 1)] || 0);
  }
  D.rentText = rentText;
  function raiseOrder(st, you, legal) {
    var Bd = B(), out = [];
    var hold = holdings(st, you), all = [];
    hold.groups.forEach(function (g) { all = all.concat(g.mine); });
    all = all.concat(hold.other);
    all.forEach(function (j) {
      var pp = prop(st, j), s = Dom.space(j);
      if (!pp || pp.mortgaged) return;
      var canS = !!legalHas(legal, 'sell', j), canM = !!legalHas(legal, 'mortgage', j);
      if (!canS && !canM) return;
      var lv = pp.level | 0, loss = 0;
      if (s.kind === 'street') {
        var full = !!ruleCall('ownsDistrict', [st, you, s.district], false);
        loss = canS && lv > 0 ? Bd.streetRent(s, lv, full) - Bd.streetRent(s, lv - 1, full) : Bd.streetRent(s, 0, full);
      } else if (s.kind === 'transit') loss = (Bd.RULES.transitRent || [])[Math.max(0, transitCount(st, you) - 1)] || 0;
      else loss = ((Bd.RULES.utilityTimes || [])[Math.max(0, utilityCount(st, you) - 1)] || 0) * 7;
      out.push({ j: j, loss: loss });
    });
    out.sort(function (a, b) { return a.loss - b.loss || a.j - b.j; });
    return out.map(function (x) { return x.j; });
  }
  D.raiseOrder = raiseOrder;

  function mbtn(ctx, kids, t, j, ok, aria, extraCls) {
    var b = Dom.btn(kids, function () {
      if (ok) { ctx.act({ t: t, space: j }); return; }
      var why = ruleCall('whyNot', [ctx.state, { t: t, p: ctx.you, space: j }], null);
      if (!why || ruleCall('actor', [ctx.state], null) !== ctx.you) why = 'You can build, sell and mortgage on your own turn.';
      if (ECE.App && ECE.App.toast) ECE.App.toast(why);
    }, { small: true, cls: (extraCls || '') + (ok ? '' : ' ui-off'), aria: aria });
    if (!ok) b.setAttribute('aria-disabled', 'true');
    return once(b);
  }
  function mcell() { return h('span', { cls: 'ui-mcell-empty', 'aria-hidden': 'true' }); }

  function manageRow(ctx, hd, st, j, pp, legal, full, raiseOnly) {
    var Bd = B(), s = Dom.space(j);
    var lv = pp.level | 0;
    var r = h('div', { cls: 'ui-mrow' + (pp.mortgaged ? ' ui-mortgaged' : '') + (raiseOnly ? ' ui-mrow-raise' : '') });
    var rent = rentText(st, ctx.you, j, !!raiseOnly);
    r.appendChild(h('div', { cls: 'ui-mleft' }, [h('span', { cls: 'ui-mname' }, s.name), h('span', { cls: 'ui-mstate' }, [Dom.levelGlyphs(lv, pp.mortgaged), ' ', rent])]));
    var btns = h('div', { cls: 'ui-mbtns' });
    var cost = Bd.buildCost(j);
    var back = ruleCall('sellValue', [j], Math.round(cost * (Bd.RULES.sellShare || 0.5)));
    var district = s.kind === 'street' && full;
    var cellA = null, cellB = null, cellC = null;
    if (district && !pp.mortgaged) {
      var canB = !!legalHas(legal, 'build', j);
      var canS = !!legalHas(legal, 'sell', j);
      if (lv > 0) cellA = key(mbtn(ctx, [h('span', null, lv >= 5 ? 'Sell tower' : 'Sell'), h('small', null, '+' + money(back))], 'sell', j, canS, (lv >= 5 ? 'Sell the tower on ' : 'Sell a home on ') + s.name + ' for ' + money(back)), 'sell' + j);
      if (lv < 5 && !raiseOnly) cellB = key(mbtn(ctx, [h('span', null, lv === 4 ? 'Tower' : 'Home'), h('small', null, '-' + money(cost))], 'build', j, canB, (lv === 4 ? 'Build a tower on ' : 'Build a home on ') + s.name + ' for ' + money(cost), 'ui-btn-build'), 'build' + j);
    }
    if (pp.mortgaged) {
      if (raiseOnly) { r.appendChild(btns); return r; }
      var canU = !!legalHas(legal, 'unmortgage', j);
      cellA = key(mbtn(ctx, [h('span', null, 'Pay off'), h('small', null, '-' + money(Bd.unmortgageCost(j)))], 'unmortgage', j, canU, 'Pay off the mortgage on ' + s.name + ' for ' + money(Bd.unmortgageCost(j))), 'unm' + j);
    } else if (lv === 0) {
      var canM = !!legalHas(legal, 'mortgage', j);
      cellC = key(mbtn(ctx, [h('span', null, 'Mortgage'), h('small', null, '+' + money(Bd.mortgageValue(j)))], 'mortgage', j, canM, 'Mortgage ' + s.name + ' for ' + money(Bd.mortgageValue(j))), 'mort' + j);
    }
    btns.appendChild(cellA || mcell());
    if (district && !raiseOnly) btns.appendChild(cellB || mcell());
    btns.appendChild(cellC || mcell());
    r.appendChild(btns);
    return r;
  }
  D.manageRow = manageRow;

  function blankSide() { return { cash: 0, spaces: [], passes: 0 }; }
  function cpuIds(ctx) {
    return (ctx.state.players || []).filter(function (p) { return p.id !== ctx.you && !p.out; }).map(function (p) { return p.id; });
  }

  D.trade = function (ctx, preset) {
    var ids = cpuIds(ctx);
    var draft = { to: preset && preset.to !== undefined ? preset.to : ids[0], give: blankSide(), get: blankSide() };
    if (preset && preset.get && Array.isArray(preset.get.spaces)) draft.get.spaces = preset.get.spaces.slice();
    var answer = null;
    var busy = false;
    function send(hd, o) {
      if (busy) return;
      busy = true;
      Promise.resolve(ctx.propose(o)).then(function (res) {
        busy = false;
        res = res || {};
        if (!res.ok) answer = { from: o.to, accept: false, text: niceError(res.error) };
        else {
          var deal = dealText(o, ctx), yes = String(res.reason || '');
          if (res.accept && /^Deal[.!]/.test(yes) && yes.length > 6 && yes !== 'Deal!') deal = yes + ' ' + deal.replace(/^Deal! /, '');
          answer = { from: o.to, accept: !!res.accept, text: res.accept ? deal : (res.reason || 'No thanks.'), more: res.more, short: !!res.short, sent: offerKey(o) };
          if (res.accept) { draft.give = blankSide(); draft.get = blankSide(); }
        }
        if (hd.open) hd.update();
      }, function (e) { busy = false; Dom.report(e, 'trade.propose'); });
    }
    return D.open({
      id: 'trade', title: 'Trade', cls: 'ui-dlg-trade', place: 'side', closable: true,
      render: function (hd) {
        var st = ctx.state;
        var actor = ruleCall('actor', [st], null);
        var live = cpuIds(ctx);
        if (live.indexOf(draft.to) < 0) draft.to = live[0];
        var pick = h('div', { cls: 'ui-trade-pick', role: 'radiogroup', 'aria-label': 'Trade with' });
        live.forEach(function (id) {
          var p = pl(st, id);
          var b = Dom.btn([Dom.token(p.token, p.color, 22), h('span', null, p.name)], function () {
            if (draft.to === id) return;
            draft.to = id; draft.get = blankSide(); answer = null; hd.update();
          }, { cls: 'ui-pick' + (draft.to === id ? ' ui-on' : ''), aria: 'Trade with ' + p.name });
          b.setAttribute('role', 'radio');
          b.setAttribute('aria-checked', draft.to === id ? 'true' : 'false');
          pick.appendChild(key(b, 'to' + id));
        });
        hd.body.appendChild(h('div', { cls: 'ui-sub' }, 'Trade with'));
        hd.body.appendChild(pick);
        if (draft.to === undefined) { hd.body.appendChild(para('Nobody to trade with.')); hd.foot.appendChild(Dom.btn('Close', function () { hd.close('x'); }, { primary: true })); return; }
        var mine = ruleCall('tradeable', [st, ctx.you], { spaces: [], passes: 0, cash: 0 }) || { spaces: [], passes: 0, cash: 0 };
        var theirs = ruleCall('tradeable', [st, draft.to], { spaces: [], passes: 0, cash: 0 }) || { spaces: [], passes: 0, cash: 0 };
        var cols = h('div', { cls: 'ui-trade-cols' });
        cols.appendChild(sideColumn(ctx, hd, 'You give', draft.give, mine, ctx.you));
        cols.appendChild(sideColumn(ctx, hd, 'You get', draft.get, theirs, draft.to));
        hd.body.appendChild(cols);
        var offer = { from: ctx.you, to: draft.to, give: copySide(draft.give), get: copySide(draft.get) };
        var chk = ruleCall('checkOffer', [st, offer], { ok: false, error: 'not available' }) || { ok: false };
        var maxOffers = (R() && R().MAX_OFFERS) || 3;
        var left = maxOffers - (st.offersThisTurn | 0);
        var myTurn = actor === ctx.you && (st.phase === 'roll' || st.phase === 'end');
        var same = !!(answer && !answer.accept && answer.sent && answer.sent === offerKey(offer));
        hintLines(ctx, offer).forEach(function (x) { hd.body.appendChild(x); });
        if (answer) hd.foot.appendChild(h('p', { cls: 'ui-answer ' + (answer.accept ? 'ui-good' : 'ui-warn'), role: 'status', 'aria-live': 'polite' }, [chipFor(ctx, answer.from), h('span', { cls: 'ui-answer-text' }, answer.text)]));
        var more = answer && !answer.accept ? (answer.more > 0 ? Math.round(answer.more) : askedMore(answer.text)) : 0;
        if (more > 0 && answer.from === draft.to) {
          var me = pl(st, ctx.you) || { cash: 0 };
          var next = withMore(draft, more);
          var nOffer = { from: ctx.you, to: draft.to, give: next.give, get: next.get };
          var nChk = ruleCall('checkOffer', [st, nOffer], { ok: false }) || { ok: false };
          var can = myTurn && left > 0 && nChk.ok && next.give.cash <= me.cash && !(answer.short && next.give.cash > me.cash);
          hd.foot.appendChild(once(key(Dom.btn('Add ' + money(more) + ' and propose', function () {
            draft.give = next.give; draft.get = next.get;
            send(hd, { from: ctx.you, to: draft.to, give: copySide(draft.give), get: copySide(draft.get) });
          }, { disabled: !can, cls: 'ui-add-more', aria: 'Add ' + money(more) + ' to your side and propose again' }), 'addmore')));
        }
        var sum = dealSummary(st, offer);
        var status;
        if (!myTurn) status = 'You can trade on your own turn.';
        else if (left <= 0) status = 'No offers left this turn (' + maxOffers + ' per turn).';
        else if (!chk.ok && !sum) status = niceError(chk.error);
        else if (same) status = 'Change the offer to propose again. Offers left: ' + left + '.';
        else status = 'Offers left: ' + left + '.';
        var line = h('p', { cls: 'ui-small ui-trade-status' });
        if (sum) line.appendChild(h('span', { cls: 'ui-trade-sum' + (sum.lopsided ? ' ui-warn' : '') }, sum.text + ' '));
        line.appendChild(h('span', { cls: 'ui-trade-left' }, status));
        hd.foot.appendChild(line);
        hd.foot.appendChild(key(Dom.btn('Close', function () { hd.close('x'); }), 'close'));
        hd.foot.appendChild(once(key(Dom.btn('Propose', function () {
          send(hd, { from: ctx.you, to: draft.to, give: copySide(draft.give), get: copySide(draft.get) });
        }, { primary: true, disabled: !chk.ok || !myTurn || left <= 0 || same }), 'propose')));
      }
    });
  };

  function offerKey(o) {
    var side = function (x) { x = x || {}; return [x.cash | 0, (x.spaces || []).slice().sort(function (a, b) { return a - b; }).join('.'), x.passes | 0].join('/'); };
    return [o.to, side(o.give), side(o.get)].join('|');
  }
  D.offerKey = offerKey;

  function askedMore(text) {
    var m = /about \$([\d,]+) more/.exec(String(text || ''));
    return m ? parseInt(m[1].replace(/,/g, ''), 10) || 0 : 0;
  }
  D.askedMore = askedMore;
  function withMore(draft, more) {
    var give = copySide(draft.give), get = copySide(draft.get);
    var cut = Math.min(get.cash | 0, more);
    get.cash -= cut;
    give.cash += more - cut;
    return { give: give, get: get };
  }
  D.withMore = withMore;
  function sideValue(st, side) {
    var Bd = B(), v = side.cash | 0;
    (side.spaces || []).forEach(function (j) { var sp = Dom.space(j) || {}, pp = prop(st, j); v += pp && pp.mortgaged ? Bd.mortgageValue(j) : (sp.price || 0); });
    return v + (side.passes | 0) * (Bd.RULES.trafficFee || 0);
  }
  function dealSummary(st, o) {
    var give = plusWords(o.give), get = plusWords(o.get);
    if (!give.length && !get.length) return null;
    var vg = sideValue(st, o.give), vt = sideValue(st, o.get);
    var part = function (label, words, side, v) {
      if (!words.length) return label + ' nothing';
      var things = (side.spaces || []).length + (side.passes | 0);
      return label + ' ' + words.join(' + ') + (things ? ' (' + money(v) + ')' : '');
    };
    return { text: part('You give', give, o.give, vg) + ' · ' + part('You get', get, o.get, vt), lopsided: vg > vt, give: vg, get: vt };
  }
  D.dealSummary = dealSummary;
  function plusWords(side) {
    var out = [];
    (side.spaces || []).forEach(function (j) { out.push(Dom.spaceName(j)); });
    if ((side.passes | 0) > 0) out.push(side.passes === 1 ? 'a Carpool Pass' : side.passes + ' Carpool Passes');
    if ((side.cash | 0) > 0) out.push(money(side.cash));
    return out;
  }

  function copySide(s) { return { cash: s.cash | 0, spaces: s.spaces.slice(), passes: s.passes | 0 }; }
  function sideWords(side) {
    var out = [];
    if (!side) return out;
    if ((side.cash | 0) > 0) out.push(money(side.cash));
    (side.spaces || []).forEach(function (j) { out.push(Dom.spaceName(j)); });
    if ((side.passes | 0) > 0) out.push(side.passes === 1 ? 'a Carpool Pass' : side.passes + ' Carpool Passes');
    return out;
  }
  function joinWords(a) { return a.length <= 1 ? a.join('') : a.slice(0, -1).join(', ') + ' and ' + a[a.length - 1]; }
  function dealText(o, ctx) {
    var get = sideWords(o.get), give = sideWords(o.give);
    var p = ctx && ctx.state ? pl(ctx.state, o.to) : null;
    if (!p) {
      if (!get.length) return 'Deal! You give ' + joinWords(give) + '.';
      return 'Deal! You get ' + joinWords(get) + (give.length ? ' for ' + joinWords(give) : '') + '.';
    }
    if (!get.length) return 'Deal! ' + p.name + ' gets ' + joinWords(give) + '.';
    if (!give.length) return 'Deal! You get ' + joinWords(get) + '.';
    return 'Deal! You get ' + joinWords(get) + '; ' + p.name + ' gets ' + joinWords(give) + '.';
  }
  D.dealText = dealText;
  function niceError(e) {
    var s = String(e || '');
    if (!s) return 'Pick at least one thing to give or get.';
    if (/empty|nothing|at least/i.test(s)) return 'Pick at least one thing to give or get.';
    return s.charAt(0).toUpperCase() + s.slice(1) + (/[.!?]$/.test(s) ? '' : '.');
  }

  function itemParts(st, j) {
    var s = Dom.space(j) || { name: '?', price: 0 };
    var pp = prop(st, j);
    var m = !!(pp && pp.mortgaged);
    var value = m ? 'mortgaged, pay off ' + money(B().unmortgageCost(j)) : money(s.price);
    var text = h('span', { cls: 'ui-item-text' }, [h('span', { cls: 'ui-item-name' }, s.name), h('small', { cls: 'ui-item-val' + (m ? ' ui-item-m' : '') }, value)]);
    return { name: s.name, value: value, mortgaged: m, els: [Dom.spaceBadge(j), text] };
  }
  D.itemParts = itemParts;

  function sideColumn(ctx, hd, title, side, avail, owner) {
    var st = ctx.state;
    var col = h('div', { cls: 'ui-trade-col' }, [h('div', { cls: 'ui-sub' }, title)]);
    var spaces = (avail.spaces || []).slice().sort(function (a, b) { return a - b; });
    if (!spaces.length && !(avail.passes > 0)) col.appendChild(para('No spaces to trade.', 'ui-small ui-muted'));
    spaces.forEach(function (j) {
      var on = side.spaces.indexOf(j) >= 0;
      var it = itemParts(st, j);
      var b = Dom.btn(it.els, function () {
        var k = side.spaces.indexOf(j);
        if (k >= 0) side.spaces.splice(k, 1); else side.spaces.push(j);
        hd.update();
      }, { cls: 'ui-item' + (on ? ' ui-on' : ''), pressed: on, aria: (on ? 'Remove ' : 'Add ') + it.name + ', ' + it.value });
      col.appendChild(key(b, 'it' + owner + '-' + j));
    });
    if (avail.passes > 0) {
      col.appendChild(stepper(hd, 'Carpool Pass', side.passes, 0, avail.passes, 1, function (v) { side.passes = v; }, 'ps' + owner, function (v) { return v + ' of ' + avail.passes; }));
    }
    var held = 0;
    for (var k in (st.props || {})) {
      if (!Object.prototype.hasOwnProperty.call(st.props, k)) continue;
      var pp = st.props[k], sp = Dom.space(+k);
      if (pp && pp.owner === owner && sp && sp.kind === 'street' && spaces.indexOf(+k) < 0) held++;
    }
    if (held) col.appendChild(para('Streets in a district with buildings can’t be traded.', 'ui-small ui-muted ui-trade-why'));
    var cash = Math.max(0, avail.cash | 0);
    col.appendChild(stepper(hd, 'Cash', side.cash, 0, cash, 10, function (v) { side.cash = v; }, 'cs' + owner, money, true));
    return col;
  }

  function stepper(hd, label, value, min, max, step, set, k, fmt, big) {
    var wrap = h('div', { cls: 'ui-stepper', role: 'group', 'aria-label': label });
    wrap.appendChild(h('div', { cls: 'ui-step-head' }, [h('span', { cls: 'ui-step-label' }, label), h('span', { cls: 'ui-step-value', 'aria-live': 'polite' }, fmt ? fmt(value) : String(value))]));
    function change(d) { return function () { set(Math.max(min, Math.min(max, value + d))); hd.update(); }; }
    if (big) {
      var grid = h('div', { cls: 'ui-step-grid' });
      [[-100, 'm100'], [-50, 'm50'], [-step, 'm'], [step, 'p'], [50, 'p50'], [100, 'p100']].forEach(function (x) {
        var d = x[0];
        grid.appendChild(key(Dom.btn((d < 0 ? '−' : '+') + Math.abs(d), change(d), { small: true, disabled: d < 0 ? value <= min : value >= max, aria: label + (d < 0 ? ' minus ' : ' plus ') + Math.abs(d) }), k + x[1]));
      });
      wrap.appendChild(grid);
      return wrap;
    }
    var line = h('div', { cls: 'ui-step-line' });
    line.appendChild(key(Dom.btn('−1', change(-1), { small: true, disabled: value <= min, aria: label + ' minus 1' }), k + 'm'));
    line.appendChild(key(Dom.btn('+1', change(1), { small: true, disabled: value >= max, aria: label + ' plus 1' }), k + 'p'));
    wrap.appendChild(line);
    return wrap;
  }

  function offerList(ctx, side, title) {
    var col = h('div', { cls: 'ui-trade-col' }, [h('div', { cls: 'ui-sub' }, title)]);
    var any = false;
    (side.spaces || []).forEach(function (j) {
      any = true;
      col.appendChild(h('div', { cls: 'ui-item ui-item-static' }, itemParts(ctx.state, j).els));
    });
    if (side.passes > 0) { any = true; col.appendChild(h('div', { cls: 'ui-item ui-item-static' }, [h('span', { cls: 'ui-item-name' }, side.passes > 1 ? side.passes + ' Carpool Passes' : 'Carpool Pass')])); }
    if (side.cash > 0) { any = true; col.appendChild(h('div', { cls: 'ui-item ui-item-static ui-cash' }, [h('span', { cls: 'ui-tag ui-tag-cash' }, '$'), h('span', { cls: 'ui-item-name' }, money(side.cash))])); }
    if (!any) col.appendChild(para('Nothing', 'ui-small ui-muted'));
    return col;
  }

  function districtNotes(ctx, offer) {
    var st = ctx.state, Bd = B(), out = [];
    var give = (offer.give && offer.give.spaces) || [], get = (offer.get && offer.get.spaces) || [];
    function before(j) { var pp = prop(st, j); return pp ? pp.owner : null; }
    function after(j) {
      if (give.indexOf(j) >= 0) return offer.to;
      if (get.indexOf(j) >= 0) return offer.from;
      return before(j);
    }
    Bd.DISTRICTS.forEach(function (d) {
      var moved = d.spaces.some(function (j) { return give.indexOf(j) >= 0 || get.indexOf(j) >= 0; });
      if (!moved) return;
      var o = after(d.spaces[0]);
      if (o !== null && o !== undefined && d.spaces.every(function (j) { return after(j) === o; }) && !ruleCall('ownsDistrict', [st, o, d.id], false)) {
        out.push({ text: (o === ctx.you ? 'You would own' : Who(ctx, o) + ' would own') + ' all of ' + d.name + '.', warn: o !== ctx.you, d: d, all: true });
        return;
      }
      [offer.from, offer.to].forEach(function (who2) {
        var now = d.spaces.filter(function (j) { return after(j) === who2; }).length;
        var was = d.spaces.filter(function (j) { return before(j) === who2; }).length;
        if (now === 2 && was < 2) out.push({ text: (who2 === ctx.you ? 'You would own' : Who(ctx, who2) + ' would own') + ' 2 of 3 ' + d.name + ' streets.', warn: false, d: d, all: false });
      });
    });
    return out;
  }
  D.districtNotes = districtNotes;
  function districtHints(ctx, offer) { return districtNotes(ctx, offer).map(function (n) { return n.text; }); }
  D.districtHints = districtHints;
  function hintLines(ctx, offer) {
    return districtNotes(ctx, offer).map(function (n) {
      return h('p', { cls: 'ui-small ui-hint' + (n.warn ? ' ui-hint-warn' : '') }, [Dom.tag(n.d.id), h('span', null, n.text)]);
    });
  }
  function auctionNote(ctx, i) {
    var d = B().districtOf(i);
    if (!d) return null;
    var others = d.spaces.filter(function (j) { return j !== i; }).map(function (j) { var pp = prop(ctx.state, j); return pp ? pp.owner : null; });
    if (others.length !== 2 || others[0] === null || others[0] === undefined || others[0] !== others[1]) return null;
    if (others[0] === ctx.you) return { text: 'You own the other two.', warn: false, d: d };
    var p = pl(ctx.state, others[0]);
    if (!p || p.out) return null;
    return { text: 'Finishes ' + p.name + '’s ' + d.name + '.', warn: true, d: d };
  }
  D.auctionNote = auctionNote;

  D.offer = function (ctx) {
    return D.open({
      id: 'offer', title: 'Trade offer', cls: 'ui-dlg-offer', place: 'side', focus: 'box',
      guard: CPU_OPEN_MS,
      render: function (hd) {
        var st = ctx.state, pend = st.pending || {};
        if (st.phase !== 'trade' || !pend.offer || pend.offer.to !== ctx.you) { hd.close('done'); return; }
        var o = pend.offer;
        var from = pl(st, o.from);
        hd.title((from ? from.name : 'Someone') + ' offers a trade');
        var old = hd.head.querySelector && hd.head.querySelector('.ui-offer-token');
        if (old) old.parentNode.removeChild(old);
        if (from) { var tk = Dom.token(from.token, from.color, 24); tk.classList.add('ui-offer-token'); hd.head.insertBefore(tk, hd.head.firstChild); }
        var me = pl(st, ctx.you) || { cash: 0 };
        if (from) hd.body.appendChild(para(from.name + ' has ' + money(from.cash) + ' · you have ' + money(me.cash), 'ui-small ui-offer-cash'));
        var cols = h('div', { cls: 'ui-trade-cols' });
        cols.appendChild(offerList(ctx, o.get, 'You give'));
        cols.appendChild(offerList(ctx, o.give, 'You get'));
        hd.body.appendChild(cols);
        hintLines(ctx, o).forEach(function (x) { hd.body.appendChild(x); });
        hd.body.appendChild(row('Your cash', money(me.cash) + '  →  ' + money(me.cash - (o.get.cash | 0) + (o.give.cash | 0))));
        hd.foot.appendChild(once(key(Dom.btn('Reject', function () { ctx.act({ t: 'reject' }); }), 'reject')));
        hd.foot.appendChild(once(key(Dom.btn('Accept', function () { ctx.act({ t: 'accept' }); }, { primary: true }), 'accept')));
      }
    });
  };

  function reasonText(ctx, d) {
    var r = d.reason, sp = d.space !== undefined && d.space !== null ? Dom.spaceName(d.space) : '';
    switch (r) {
      case 'rent': {
        var w = ruleCall('whyText', [d.why], '') || '';
        return sp ? 'Rent for ' + sp + (w ? ' (' + w + ')' : '') + '.' : 'Rent.';
      }
      case 'tax': return sp ? sp + '.' : 'A tax.';
      case 'card': { var c = lastCardOf(ctx.state, d.player); return c ? 'Your card: "' + c.text + '"' : 'A card you drew.'; }
      case 'repairs': return 'Repairs on your homes and towers (a card).';
      case 'each': {
        var dr = lastCardDraw(ctx.state);
        var card = dr && ECE.CardData ? ECE.CardData.card(dr.deck, dr.id) : null;
        var owed = (d.to || []).filter(function (x) { return x && x.id !== null && x.id !== undefined; });
        if (card && dr.p === d.player) return 'Your card: "' + card.text + '"';
        if (card && owed.length === 1 && owed[0].id === dr.p) return Who(ctx, dr.p) + '’s card: "' + card.text + '"';
        return owed.length === 1 ? 'A card: you pay ' + who(ctx, owed[0].id) + '.' : 'A card: you pay each player.';
      }
      case 'traffic': return 'The fee to leave Stuck in Traffic.';
      default: return typeof r === 'string' && r ? r.charAt(0).toUpperCase() + r.slice(1) + '.' : '';
    }
  }
  function lastCardDraw(state) {
    var log = (state && state.log) || [];
    for (var i = log.length - 1; i >= 0; i--) {
      var e = log[i];
      if (e && e.t === 'card') return { p: e.p, deck: e.deck, id: e.id };
      if (e && e.t === 'turn') break;
    }
    return null;
  }
  function lastCardOf(state, p) {
    var log = (state && state.log) || [];
    for (var i = log.length - 1; i >= 0; i--) {
      var e = log[i];
      if (e && e.t === 'card' && e.p === p) return ECE.CardData ? ECE.CardData.card(e.deck, e.id) : null;
      if (e && e.t === 'turn') break;
    }
    return null;
  }
  D.debt = function (ctx) {
    return D.open({
      id: 'debt', title: 'Owing money', cls: 'ui-dlg-debt', place: 'side',
      render: function (hd) {
        var st = ctx.state, pend = st.pending || {};
        var d = pend.debts && pend.debts[0];
        if (st.phase !== 'debt' || !d || d.player !== ctx.you) { hd.close('done'); return; }
        var me = pl(st, ctx.you) || { cash: 0 };
        var amount = d.amount | 0;
        hd.body.appendChild(row('You owe', money(amount), 'ui-big'));
        var to = d.to || [];
        to.forEach(function (t) {
          hd.body.appendChild(row(t.fund ? 'To the Rain Fund' : t.id === null || t.id === undefined ? 'To the bank' : 'To ' + who(ctx, t.id), money(t.amount)));
        });
        var why = reasonText(ctx, d);
        if (why) hd.body.appendChild(para(why, 'ui-small'));
        hd.body.appendChild(row('Your cash', money(me.cash)));
        var legal = ctx.legal();
        var liquid = ruleCall('liquid', [st, ctx.you], me.cash);
        var canPay = !!legalHas(legal, 'pay') && me.cash >= amount;
        if (me.cash < amount) {
          if (liquid >= amount) hd.body.appendChild(para('Raise ' + money(amount - me.cash) + ' more: sell buildings (half back) or mortgage spaces in Manage.', 'ui-warn'));
          else hd.body.appendChild(para('Everything you own is worth ' + money(liquid) + ' in cash. It cannot cover this.', 'ui-warn'));
        }
        hd.foot.appendChild(key(Dom.btn('Manage', function () { ctx.openManage(); }), 'manage'));
        if (liquid < amount && legalHas(legal, 'bankrupt')) {
          hd.foot.appendChild(key(Dom.btn('Declare bankruptcy', function () {
            D.confirm({ title: 'Declare bankruptcy?', text: 'You are out of the game. ' + (to.length === 1 && to[0].id !== null && to[0].id !== undefined ? Who(ctx, to[0].id) + ' gets your cash and spaces.' : 'Your cash pays what you owe and your spaces go back to the bank.'), yes: 'Declare bankruptcy', no: 'Not yet', danger: true }).then(function (yes) { if (yes) ctx.act({ t: 'bankrupt' }); });
          }, { danger: true }), 'bankrupt'));
        }
        hd.foot.appendChild(once(key(Dom.btn('Pay ' + money(amount), function () { ctx.act({ t: 'pay' }); }, { primary: true, disabled: !canPay }), 'pay')));
      }
    });
  };

  function standingsOf(state) {
    var raw = state.standings || ruleCall('standings', [state], null) || [];
    return raw.map(function (r, k) {
      if (typeof r === 'number') return { id: r, rank: k + 1, net: ruleCall('netWorth', [state, r], 0) };
      var id = r.id !== undefined ? r.id : r.p !== undefined ? r.p : r.player;
      var net = r.net !== undefined ? r.net : r.netWorth !== undefined ? r.netWorth : r.worth !== undefined ? r.worth : ruleCall('netWorth', [state, id], 0);
      return { id: id, rank: r.rank || k + 1, net: net, out: r.out };
    });
  }
  D.standingsOf = standingsOf;

  D.over = function (ctx) {
    return D.open({
      id: 'over', title: 'Game over', cls: 'ui-dlg-over', place: 'center',
      render: function (hd) {
        var st = ctx.state;
        var list = standingsOf(st);
        var winner = st.winner !== null && st.winner !== undefined ? st.winner : list.length ? list[0].id : null;
        var mine = null, top = null;
        for (var k = 0; k < list.length; k++) { if (list[k].id === ctx.you) mine = list[k]; if (list[k].id === winner) top = list[k]; }
        var title = winner === ctx.you ? 'You win!' : mine ? 'You finished ' + Dom.ordinal(mine.rank) + ' of ' + list.length : winner !== null ? Who(ctx, winner) + ' wins' : 'Game over';
        hd.title(title);
        var wp = winner !== null && winner !== undefined ? pl(st, winner) : null;
        var wnet = money(top ? top.net : ruleCall('netWorth', [st, winner], 0));
        if (wp) hd.body.appendChild(h('div', { cls: 'ui-over-winner' }, [Dom.token(wp.token, wp.color, 40), h('span', null, winner === ctx.you ? 'Your net worth: ' + wnet : wp.name + ' wins with ' + wnet)]));
        var meP = pl(st, ctx.you);
        var stillIn = (st.players || []).filter(function (p) { return !p.out; }).length;
        var how;
        if (st.limitHit) how = 'The limit was reached, so the richest player (by net worth) wins.';
        else if (meP && meP.out && stillIn > 1) how = 'You went bankrupt in round ' + (st.round || 1) + ', so the game ends here; the others are ranked by net worth.';
        else if (winner === ctx.you) how = 'Everyone else went bankrupt.';
        else if (winner !== null && stillIn <= 1) how = Who(ctx, winner) + ' is the last player still in.';
        else how = 'The others are ranked by net worth.';
        if (how) hd.body.appendChild(para(how, 'ui-small'));
        var mins = Math.round((st.playMs || 0) / 60000);
        hd.body.appendChild(para('Round ' + (st.round || 1) + ' · ' + (mins < 1 ? 'under a minute' : mins + (mins === 1 ? ' minute' : ' minutes')) + ' of play', 'ui-small ui-muted'));
        var tbl = h('div', { cls: 'ui-standings', role: 'table', 'aria-label': 'Standings' });
        tbl.appendChild(h('div', { cls: 'ui-st-row ui-st-head', role: 'row' }, [h('span', { role: 'columnheader' }, ''), h('span', { role: 'columnheader' }, 'Player'), h('span', { role: 'columnheader' }, 'Net worth')]));
        list.forEach(function (r) {
          var p = pl(st, r.id);
          if (!p) return;
          var outText = p.out ? ((p.outRound | 0) > 0 ? 'out in round ' + (p.outRound | 0) : 'out') : null;
          tbl.appendChild(h('div', { cls: 'ui-st-row' + (r.id === ctx.you ? ' ui-mine' : '') + (r.id === winner ? ' ui-win' : '') + (p.out ? ' ui-st-out' : ''), role: 'row' }, [
            h('span', { cls: 'ui-st-rank', role: 'cell' }, Dom.ordinal(r.rank)),
            h('span', { cls: 'ui-st-name', role: 'cell' }, [Dom.token(p.token, p.color, 22)].concat(youNameEls(ctx, p))),
            h('span', { cls: 'ui-st-net', role: 'cell' }, outText || money(r.net))
          ]));
        });
        hd.body.appendChild(tbl);
        hd.body.appendChild(para('Net worth = cash + each space’s price (its mortgage value if mortgaged) + what was paid for its buildings.', 'ui-small ui-muted'));
        hd.foot.appendChild(key(Dom.btn('Home', function () { hd.close('home'); ctx.home(); }), 'home'));
        hd.foot.appendChild(key(Dom.btn('New game', function () { hd.close('new'); ctx.newGame(); }, { primary: true }), 'new'));
      }
    });
  };

  D.turnOrder = function (ctx) {
    return new Promise(function (resolve) {
      D.open({
        id: 'order', title: 'Turn order', cls: 'ui-dlg-order', place: 'center',
        onEscape: function (hd) { hd.close('esc'); },
        render: function (hd) {
          var st = ctx.state;
          var ol = h('ol', { cls: 'ui-order' });
          (st.players || []).forEach(function (p) {
            var blurb = p.id === ctx.you ? '' : blurbOf(p);
            var who2 = h('span', { cls: 'ui-order-who' }, youNameEls(ctx, p).concat(blurb ? [h('small', { cls: 'ui-order-blurb' }, blurb)] : []));
            ol.appendChild(h('li', { cls: p.id === ctx.you ? 'ui-mine' : '' }, [Dom.token(p.token, p.color, 26), who2]));
          });
          hd.body.appendChild(ol);
          hd.body.appendChild(para('Everyone starts with ' + money(B().RULES.startCash) + '. Pass START for ' + money(B().RULES.salary) + '.', 'ui-small'));
          hd.foot.appendChild(key(Dom.btn('Let’s go', function () { hd.close('ok'); }, { primary: true }), 'go'));
        },
        onClose: function () { resolve(); }
      });
    });
  };

  function blurbOf(p) {
    var list = (ECE.Glossary && ECE.Glossary.computers) || [];
    for (var i = 0; i < list.length; i++) if ((p.persona && list[i].persona === p.persona) || list[i].name === p.name) return list[i].blurb || '';
    return '';
  }
  D.blurbOf = blurbOf;

  D.menu = function (ctx) {
    return D.open({
      id: 'menu', title: 'Menu', cls: 'ui-dlg-menu', place: 'center', closable: true,
      render: function (hd) {
        var list = h('div', { cls: 'ui-menu-list' });
        list.appendChild(key(Dom.btn('Resume', function () { hd.close('resume'); }, { primary: true }), 'resume'));
        list.appendChild(key(Dom.btn('Full log', function () { hd.close('log'); ctx.openLog(); }), 'log'));
        list.appendChild(key(Dom.btn('How to play', function () { hd.close('howto'); ctx.go('howto'); }), 'howto'));
        list.appendChild(key(Dom.btn('Settings', function () { hd.close('settings'); ctx.go('settings'); }), 'settings'));
        list.appendChild(key(Dom.btn('Home', function () { hd.close('home'); ctx.home(); }), 'home'));
        hd.body.appendChild(list);
        if (ctx.speed) {
          var cur = ctx.speed();
          var seg = h('div', { cls: 'ui-seg ui-menu-speed', role: 'radiogroup', 'aria-label': 'Computer speed' });
          [['normal', 'Normal'], ['fast', 'Fast'], ['instant', 'Instant']].forEach(function (x) {
            var b = key(Dom.btn(x[1], function () { ctx.speed(x[0]); hd.update(); }, { cls: 'ui-seg-btn' + (cur === x[0] ? ' ui-on' : '') }), 'speed-' + x[0]);
            b.setAttribute('role', 'radio');
            b.setAttribute('aria-checked', cur === x[0] ? 'true' : 'false');
            seg.appendChild(b);
          });
          hd.body.appendChild(h('div', { cls: 'ui-menu-row' }, [h('div', { cls: 'ui-sub' }, 'Computer speed'), seg]));
        }
        hd.body.appendChild(para('Your game is saved as you play.', 'ui-small ui-muted'));
      }
    });
  };

  D.confirm = function (o) {
    o = o || {};
    return new Promise(function (resolve) {
      var answered = false;
      D.open({
        id: o.id || 'confirm', title: o.title || 'Are you sure?', cls: 'ui-dlg-confirm', place: 'center', closable: true, role: 'alertdialog',
        render: function (hd) {
          (Array.isArray(o.text) ? o.text : [o.text]).forEach(function (t) { if (t) hd.body.appendChild(para(t)); });
          if (o.extra) hd.body.appendChild(o.extra);
          hd.foot.appendChild(key(Dom.btn(o.no || 'Cancel', function () { answered = true; hd.close('no'); resolve(false); }), 'no'));
          hd.foot.appendChild(key(Dom.btn(o.yes || 'OK', function () { answered = true; hd.close('yes'); resolve(true); }, { primary: !o.danger, danger: !!o.danger }), 'yes'));
        },
        onClose: function () { if (!answered) resolve(false); }
      });
    });
  };

  D.message = function (o) {
    o = o || {};
    return new Promise(function (resolve) {
      D.open({
        id: o.id || 'message', title: o.title || '', cls: 'ui-dlg-msg ' + (o.cls || ''), place: o.place || 'center',
        onEscape: function (hd) { hd.close('esc'); },
        render: function (hd) {
          (o.lines || []).forEach(function (t) { if (t) hd.body.appendChild(para(t)); });
          if (o.node) hd.body.appendChild(o.node);
          hd.foot.appendChild(key(Dom.btn(o.ok || 'Got it', function () { hd.close('ok'); }, { primary: true }), 'ok'));
        },
        onClose: function () { resolve(); }
      });
    });
  };
  D.tip = function (o) { return D.message(Object.assign({ cls: 'ui-dlg-tip' }, o || {}, { id: 'tip' })); };
})(window.ECE = window.ECE || {});
;
(function (ECE) {
  'use strict';

  var Dom = ECE.Dom;
  var h = function (t, p, k) { return Dom.h(t, p, k); };
  var S = {};
  ECE.Screens = S;

  function money(n) { return Dom.money(n); }
  function G() { return ECE.Glossary; }
  function B() { return ECE.BoardData; }

  function header(ctx, title) {
    var back = Dom.btn([Dom.icon('back', 20), h('span', null, 'Back')], function () { ctx.back(); }, { ghost: true, cls: 'ui-back', aria: 'Back' });
    return h('header', { cls: 'ui-screen-head' }, [back, h('h1', { cls: 'ui-screen-title', tabindex: '-1', 'data-autofocus': '' }, title)]);
  }

  function segmented(label, opts, value, onPick, cls) {
    var g = h('div', { cls: 'ui-seg' + (cls ? ' ' + cls : ''), role: 'radiogroup', 'aria-label': label });
    opts.forEach(function (o) {
      var on = o.id === value;
      var b = Dom.btn(o.sub ? [h('span', null, o.label), h('small', null, o.sub)] : o.label, function () {
        if (o.id === value) return;
        value = o.id;
        Array.prototype.forEach.call(g.children, function (c) { var me = c.dataset.id === o.id; c.classList.toggle('ui-on', me); c.setAttribute('aria-checked', me ? 'true' : 'false'); });
        onPick(o.id);
      }, { cls: 'ui-seg-btn' + (on ? ' ui-on' : '') });
      b.dataset.id = o.id;
      b.setAttribute('role', 'radio');
      b.setAttribute('aria-checked', on ? 'true' : 'false');
      g.appendChild(b);
    });
    return g;
  }

  function toggle(label, line, value, onChange) {
    var b = h('button', { type: 'button', cls: 'ui-switch' + (value ? ' ui-on' : ''), role: 'switch', 'aria-checked': value ? 'true' : 'false' });
    b.appendChild(h('span', { cls: 'ui-switch-text' }, [h('b', null, label), line ? h('small', null, line) : null]));
    b.appendChild(h('span', { cls: 'ui-switch-knob', 'aria-hidden': 'true' }, h('span')));
    Dom.on(b, 'click', function () {
      value = !value;
      b.classList.toggle('ui-on', value);
      b.setAttribute('aria-checked', value ? 'true' : 'false');
      onChange(value);
    });
    return b;
  }

  function field(label, control, note) {
    return h('div', { cls: 'ui-field' }, [h('div', { cls: 'ui-field-label' }, label), control, note ? h('p', { cls: 'ui-field-note' }, note) : null]);
  }

  var SCENE = { w: 5.88, h: 9.88, crop: '0 1.55 5.88 3.55', tall: '0 1.2 5.88 4.6' };
  function tallPhone() {
    try { return document.documentElement.classList.contains('phone') && window.innerHeight >= 800 && window.innerHeight / Math.max(1, window.innerWidth) >= 1.9; } catch (e) { return false; }
  }
  function titleArt(wide) {
    var A = ECE.Art;
    var wrap = h('div', { cls: 'ui-title-art', 'aria-hidden': 'true' });
    if (A && typeof A.centre === 'function') {
      try {
        var crop = wide || tallPhone() ? SCENE.tall : SCENE.crop;
        var svg = Dom.s('svg', { viewBox: crop, cls: 'ui-title-svg', preserveAspectRatio: 'xMidYMid slice', focusable: 'false' });
        var cr = crop.split(' ');
        svg.style.aspectRatio = cr[2] + ' / ' + cr[3];
        if (!onPhone()) svg.setAttribute('data-fit', crop);
        A.centre(svg, { x: 0, y: 0, w: SCENE.w, h: SCENE.h }, {});
        var t = svg.querySelector('.ece-title');
        if (t && t.parentNode) t.parentNode.removeChild(t);
        wrap.appendChild(svg);
        return wrap;
      } catch (e) { Dom.report(e, 'art.centre'); }
    }
    var f = Dom.s('svg', { viewBox: '0 0 70 42', cls: 'ui-title-svg', preserveAspectRatio: 'xMidYMid slice', focusable: 'false' });
    f.appendChild(Dom.s('rect', { x: 0, y: 0, width: 70, height: 42, fill: '#DCEBEF' }));
    f.appendChild(Dom.s('path', { d: 'M8 24L24 8l7 7 5-4 14 13z', fill: '#E9F0F2' }));
    f.appendChild(Dom.s('path', { d: 'M0 26c10-6 20-6 30-2s24 4 40-3v21H0z', fill: '#1F5F45' }));
    f.appendChild(Dom.s('rect', { x: 0, y: 30, width: 70, height: 12, fill: '#2E6F95' }));
    f.appendChild(Dom.s('path', { d: 'M40 33h14l-2 3H42z', fill: '#fff' }));
    wrap.appendChild(f);
    return wrap;
  }

  function wideHome() {
    try { return !document.documentElement.classList.contains('phone') && (window.innerWidth || 0) > 900; } catch (e) { return false; }
  }
  function onPhone() {
    try { return document.documentElement.classList.contains('phone'); } catch (e) { return false; }
  }

  var BANDS = [[2.79, 4.3], [2.38, 4.3], [2.79, 5.08], [2.38, 5.08], [1.55, 5.08]];
  function artBand(hU) {
    hU = Math.min(4.6, +hU || 0);
    var r3 = function (v) { return Math.round(v * 1000) / 1000; };
    var last = BANDS[BANDS.length - 1], lastH = last[1] - last[0];
    if (hU >= lastH) return [0, r3(last[0] - (hU - lastH) / (4.6 - lastH) * 0.35), SCENE.w, r3(hU)];
    var pick = BANDS[0];
    for (var i = 0; i < BANDS.length; i++) if (BANDS[i][1] - BANDS[i][0] <= hU + 1e-9) pick = BANDS[i];
    return [0, pick[0], SCENE.w, r3(pick[1] - pick[0])];
  }
  S.artBand = artBand;
  S.ART_BANDS = BANDS;
  var CLOUD_TOP = 1.59;
  function artRain(band) { return !!band && +band[1] <= CLOUD_TOP + 1e-9; }
  S.artRain = artRain;

  S.fitHome = function (el) {
    try {
      if (!el || !el.querySelector || onPhone()) return true;
      if (el.classList.contains('ui-home-wide') !== wideHome()) return false;
      var svg = el.querySelector('.ui-title-svg[data-fit]'), wrap = el.querySelector('.ui-home');
      if (!svg || !wrap || !wrap.getClientRects().length) return true;
      var w = svg.getBoundingClientRect().width;
      if (!(w > 0)) return true;
      var full = String(svg.getAttribute('data-fit')).split(' ').map(Number);
      if (full.length !== 4 || !(full[3] > 0)) return true;
      var maxPx = w * full[3] / full[2];
      var rain = svg.querySelector ? svg.querySelector('.ece-rain') : null;
      var place = function (band) {
        svg.setAttribute('viewBox', band.join(' '));
        svg.style.aspectRatio = band[2] + ' / ' + band[3];
        if (rain) rain.setAttribute('visibility', artRain(band) ? 'visible' : 'hidden');
      };
      var room = function () {
        var cs = getComputedStyle(wrap), first = wrap.firstElementChild, last = wrap.lastElementChild;
        var used = last.getBoundingClientRect().bottom - first.getBoundingClientRect().top + (parseFloat(cs.paddingTop) || 0) + (parseFloat(cs.paddingBottom) || 0);
        return (window.innerHeight || 0) - (used - svg.getBoundingClientRect().height);
      };
      Dom.toggle(el, 'ui-home-short', false);
      place(full);
      var px = room();
      if (px >= maxPx - 0.5) return true;
      Dom.toggle(el, 'ui-home-short', true);
      px = room();
      place(px >= maxPx - 0.5 ? full : artBand(Math.min(full[3], px * SCENE.w / w)));
    } catch (e) { Dom.report(e, 'fitHome'); }
    return true;
  };
  function backdrop() {
    var A = ECE.Art;
    var svg = Dom.s('svg', { viewBox: '0 0 160 60', preserveAspectRatio: 'xMidYMax slice', cls: 'ui-home-backdrop', focusable: 'false', 'aria-hidden': 'true' });
    svg.appendChild(Dom.s('path', { d: 'M38 46C48 44 58 34 70 29.5Q76 27.6 81 28.2Q87 28.9 93 31.6C105 37 116 43 128 46Z', fill: '#DCE6E8' }));
    svg.appendChild(Dom.s('path', { d: 'M64 32.6L67.2 31.4L69.6 33.4L72.4 31L75 33.6L78 31.2L81 33.8L84.4 31.6L87.6 34L90.4 32.4L93 33.6Q88 30 81 28.2Q76 27.6 70 29.5Z', fill: '#F4F7F6' }));
    svg.appendChild(Dom.s('path', { d: 'M0 47C18 42 34 44 52 45.5C76 47.5 100 43 124 44.5C140 45.5 150 44 160 45V60H0Z', fill: '#D9E4DF' }));
    var trees = Dom.s('g', { fill: '#D2DFD8' });
    for (var i = 0; i < 34; i++) {
      var x = 2 + i * 4.8 + ((i * 37) % 5) * 0.4, hh = 3.4 + ((i * 53) % 7) * 0.35;
      if (A && typeof A.tree === 'function') A.tree(trees, x, 47.6, hh, '#D2DFD8');
    }
    svg.appendChild(trees);
    svg.appendChild(Dom.s('rect', { x: 0, y: 48.4, width: 160, height: 11.6, fill: '#DCE7EC' }));
    svg.appendChild(Dom.s('path', { d: 'M8 52.4q2-1 4 0t4 0M40 55q2-1 4 0t4 0M96 51.6q2-1 4 0t4 0M130 55.4q2-1 4 0t4 0', stroke: '#EEF4F6', 'stroke-width': 0.5, fill: 'none' }));
    return svg;
  }

  S.home = function (el, ctx) {
    Dom.clear(el);
    var save = ctx.save;
    var game = ctx.game;
    var wide = wideHome();
    Dom.toggle(el, 'ui-home-wide', wide);
    if (wide) el.appendChild(backdrop());
    var wrap = h('div', { cls: 'ui-home' });
    var hero = h('div', { cls: 'ui-home-hero' });
    hero.appendChild(titleArt(wide));
    hero.appendChild(h('h1', { cls: 'ui-home-title', tabindex: '-1', 'data-autofocus': '' }, G().game.name));
    hero.appendChild(h('p', { cls: 'ui-home-tag' }, G().game.tagline));
    wrap.appendChild(hero);

    var actions = h('div', { cls: 'ui-home-actions' });
    if (game) {
      var me = Dom.player(game, ctx.you) || { cash: 0 };
      var big = Dom.btn([h('span', { cls: 'ui-big-label' }, 'Continue'), h('span', { cls: 'ui-big-sub' }, 'Round ' + (game.round || 1) + ' · you have ' + money(me.cash))], function () { ctx.continueGame(); }, { primary: true, cls: 'ui-big-btn', aria: 'Continue: round ' + (game.round || 1) + ', you have ' + money(me.cash) });
      actions.appendChild(big);
    } else {
      actions.appendChild(Dom.btn([h('span', { cls: 'ui-big-label' }, 'New game')], function () { ctx.go('setup'); }, { primary: true, cls: 'ui-big-btn' }));
    }
    var small = h('div', { cls: 'ui-home-small' });
    if (game) small.appendChild(Dom.btn('New game', function () { ctx.go('setup'); }, { cls: 'ui-home-btn' }));
    small.appendChild(Dom.btn('How to play', function () { ctx.go('howto'); }, { cls: 'ui-home-btn' }));
    small.appendChild(Dom.btn('Settings', function () { ctx.go('settings'); }, { cls: 'ui-home-btn' }));
    actions.appendChild(small);
    wrap.appendChild(actions);

    var st = save.stats || {};
    wrap.appendChild(h('p', { cls: 'ui-stats' }, 'Played ' + (st.played | 0) + ' · Won ' + (st.won | 0) + (st.bestNet ? ' · Best net worth ' + money(st.bestNet) : '')));

    if (ctx.notice) {
      var note = h('div', { cls: 'ui-card ui-notice', role: 'status' }, [h('p', null, String(ctx.notice))]);
      note.appendChild(Dom.btn('OK', function () { ctx.dismissNotice(); if (note.parentNode) note.parentNode.removeChild(note); S.fitHome(el); }, { small: true }));
      wrap.appendChild(note);
    }
    var tip = ctx.keepTip;
    if (tip) {
      var card = h('div', { cls: 'ui-card ui-keep-tip', role: 'note' });
      card.appendChild(h('h2', { cls: 'ui-card-title' }, tip.title || 'Keep your progress safe'));
      (tip.lines || []).forEach(function (l) { card.appendChild(h('p', null, l)); });
      card.appendChild(Dom.btn('Got it', function () { ctx.dismissKeepTip(); if (card.parentNode) card.parentNode.removeChild(card); S.fitHome(el); }, { small: true, primary: true }));
      wrap.appendChild(card);
    }
    wrap.appendChild(h('p', { cls: 'ui-version' }, 'Version ' + ctx.version));
    el.appendChild(wrap);
    S.fitHome(el);
  };

  S.setup = function (el, ctx) {
    Dom.clear(el);
    var setup = Object.assign({}, ctx.save.setup);
    var wrap = h('div', { cls: 'ui-form ui-setup' });
    wrap.appendChild(header(ctx, 'New game'));

    var name = h('input', { type: 'text', cls: 'ui-input', maxlength: '20', autocomplete: 'off', autocapitalize: 'words', spellcheck: 'false', 'aria-label': 'Your name', value: setup.name || 'You' });
    Dom.on(name, 'input', function () { setup.name = name.value.slice(0, 20); });
    wrap.appendChild(field('Your name', name));

    var toks = h('div', { cls: 'ui-tokens', role: 'radiogroup', 'aria-label': 'Your token' });
    var tokNote = h('p', { cls: 'ui-field-note' });
    function drawTokens() {
      Dom.clear(toks);
      G().tokens.forEach(function (t) {
        var on = setup.token === t.id;
        var b = Dom.btn([Dom.token(t.id, (G().playerColors || [])[0] || '#1E73E8', 34), h('small', null, t.name)], function () { setup.token = t.id; drawTokens(); }, { cls: 'ui-token-btn' + (on ? ' ui-on' : ''), aria: t.name });
        b.setAttribute('role', 'radio');
        b.setAttribute('aria-checked', on ? 'true' : 'false');
        toks.appendChild(b);
      });
    }
    drawTokens();
    wrap.appendChild(field('Your token', toks));

    var cpuNames = h('p', { cls: 'ui-field-note' });
    function drawNames() {
      var list = G().computers.slice(0, setup.opponents | 0 || 3).map(function (c) { return c.blurb ? c.name + ' ' + c.blurb.charAt(0).toLowerCase() + c.blurb.slice(1) : c.name + '.'; });
      Dom.text(cpuNames, list.join(' '));
    }
    var counts = [1, 2, 3, 4, 5].map(function (n) { return { id: String(n), label: String(n) }; });
    wrap.appendChild(field('Computer players', segmented('Computer players', counts, String(setup.opponents || 3), function (id) { setup.opponents = +id; drawNames(); }), null));
    wrap.lastChild.appendChild(cpuNames);
    drawNames();

    var levelNotes = { easy: 'They sell you the streets you need. You’ll win most games.', normal: 'An even game if you trade: you win about 1 in 3 with 3 players.', hard: 'They charge 2.5x for the street you need: you win about 1 in 7.' };
    var levelNote = h('p', { cls: 'ui-field-note' }, levelNotes[setup.level] || '');
    wrap.appendChild(field('Difficulty', segmented('Difficulty', G().levels.map(function (l) { return { id: l.id, label: l.name }; }), setup.level || 'normal', function (id) { setup.level = id; Dom.text(levelNote, levelNotes[id] || ''); })));
    wrap.lastChild.appendChild(levelNote);

    var limitNote = h('p', { cls: 'ui-field-note' });
    function drawLimitNote() { var l = G().limits.filter(function (x) { return x.id === setup.limit; })[0]; Dom.text(limitNote, l ? l.note : ''); }
    wrap.appendChild(field('Game end', segmented('Game end', G().limits.map(function (l) { return { id: l.id, label: l.name.replace(' minutes', ' min') }; }), setup.limit || 'none', function (id) { setup.limit = id; drawLimitNote(); }, 'ui-seg-grid')));
    wrap.lastChild.appendChild(limitNote);
    drawLimitNote();

    var rules = h('div', { cls: 'ui-switches' });
    rules.appendChild(toggle('Auctions', 'A space nobody buys goes to the highest bidder.', setup.auctions !== false, function (v) { setup.auctions = v; }));
    rules.appendChild(toggle('Rain Fund', 'Taxes and card payments go into a fund; Coffee Break collects it.', !!setup.rainFund, function (v) { setup.rainFund = v; }));
    wrap.appendChild(field('House rules', rules));

    var start = Dom.btn('Start game', function () {
      setup.name = ECE.Save && typeof ECE.Save.cleanName === 'function' ? ECE.Save.cleanName(name.value || '', 'You') :
        (name.value || '').replace(/[\u0000-\u001f\u007f]/g, '').trim().slice(0, 20) || 'You';
      if (ECE.Sound) ECE.Sound.unlock();
      ECE.App.startFromSetup(setup);
    }, { primary: true, cls: 'ui-big-btn ui-start' });
    wrap.appendChild(h('div', { cls: 'ui-form-foot' }, [start]));
    el.appendChild(wrap);
  };

  S.settings = function (el, ctx) {
    Dom.clear(el);
    var set = ctx.save.settings;
    var wrap = h('div', { cls: 'ui-form ui-settings' });
    wrap.appendChild(header(ctx, 'Settings'));
    function changed() { ctx.settingsChanged(); }

    wrap.appendChild(field('Computer turn speed', segmented('Computer turn speed', [
      { id: 'normal', label: 'Normal' }, { id: 'fast', label: 'Fast' }, { id: 'instant', label: 'Instant' }
    ], set.speed || 'normal', function (id) { set.speed = id; changed(); }), 'How fast the computer players take their turns.'));

    var vol = h('input', { type: 'range', min: '0', max: '100', step: '5', cls: 'ui-range', 'aria-label': 'Volume', value: String(Math.round((set.volume === undefined ? 0.6 : set.volume) * 100)) });
    var fill = function () { vol.style.setProperty('--fill', (+vol.value || 0) + '%'); };
    fill();
    Dom.on(vol, 'input', function () { set.volume = Math.max(0, Math.min(1, (+vol.value || 0) / 100)); fill(); changed(); });
    Dom.on(vol, 'change', function () { if (ECE.Sound) { ECE.Sound.unlock(); ECE.Sound.play('coinIn'); } });
    var sounds = h('div', { cls: 'ui-switches' });
    sounds.appendChild(toggle('Sound effects', 'Dice, coins, cards and the bridge bell.', set.sound !== false, function (v) { set.sound = v; vol.disabled = !v; changed(); if (v && ECE.Sound) { ECE.Sound.unlock(); ECE.Sound.play('card'); } }));
    sounds.appendChild(h('label', { cls: 'ui-range-row' }, [h('span', null, 'Volume'), vol]));
    vol.disabled = set.sound === false;
    sounds.appendChild(toggle('Rain sounds', 'Soft rain in the background during a game.', !!set.rain, function (v) { set.rain = v; changed(); if (ECE.Sound) ECE.Sound.unlock(); }));
    wrap.appendChild(field('Sound', sounds));

    var tips = h('div', { cls: 'ui-switches' });
    tips.appendChild(toggle('Tips', 'Short hints the first time something happens.', set.tips !== false, function (v) { set.tips = v; changed(); }));
    var again = Dom.btn('Show tips again', function () { ctx.showTipsAgain(); again.disabled = true; Dom.text(again, 'Tips will show again'); }, { cls: 'ui-wide-btn' });
    tips.appendChild(again);
    wrap.appendChild(field('Help', tips));

    var rmNote = h('p', { cls: 'ui-field-note' });
    var rmNotes = { auto: 'Auto follows your device. On: tokens jump instead of hopping.', on: 'On: tokens jump instead of hopping.', off: 'Off: tokens always hop.' };
    var rm = set.reduceMotion === 'on' || set.reduceMotion === 'off' ? set.reduceMotion : 'auto';
    Dom.text(rmNote, rmNotes[rm]);
    wrap.appendChild(field('Reduce motion', segmented('Reduce motion', [{ id: 'auto', label: 'Auto' }, { id: 'on', label: 'On' }, { id: 'off', label: 'Off' }], rm, function (id) { set.reduceMotion = id; Dom.text(rmNote, rmNotes[id] || ''); changed(); })));
    wrap.lastChild.appendChild(rmNote);

    var codeBox = h('div', { cls: 'ui-code-box', hidden: true });
    var importBox = h('div', { cls: 'ui-code-box', hidden: true });
    var saveBtns = h('div', { cls: 'ui-btn-row' });
    saveBtns.appendChild(Dom.btn('Copy save code', function () { showCode(); }, { cls: 'ui-wide-btn' }));
    saveBtns.appendChild(Dom.btn('Import save code', function () { showImport(); }, { cls: 'ui-wide-btn' }));
    var saveField = field('Your progress', saveBtns, ctx.saveStatus || 'Your progress is saved on this device. A save code moves it to another browser or keeps a spare copy.');
    if (ctx.saveStatus) saveField.querySelector('.ui-field-note').classList.add('ui-warn');
    saveField.appendChild(codeBox);
    saveField.appendChild(importBox);
    wrap.appendChild(saveField);

    function showCode() {
      importBox.hidden = true;
      Dom.clear(codeBox);
      var code = ctx.exportSave() || '';
      var ta = h('textarea', { cls: 'ui-code', readonly: '', rows: '4', 'aria-label': 'Your save code', spellcheck: 'false' });
      ta.value = code;
      var status = h('p', { cls: 'ui-field-note', 'aria-live': 'polite' }, 'Keep this code somewhere safe.');
      var copy = Dom.btn('Copy', function () {
        var done = function () { Dom.text(status, 'Copied. Paste it somewhere safe.'); };
        var manual = function () { ta.focus(); ta.select(); Dom.text(status, 'Selected: copy it with your device’s Copy.'); };
        try {
          if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(code).then(done, manual);
          else manual();
        } catch (e) { manual(); }
      }, { primary: true, small: true });
      codeBox.appendChild(ta);
      codeBox.appendChild(h('div', { cls: 'ui-btn-row' }, [copy, Dom.btn('Close', function () { codeBox.hidden = true; }, { small: true })]));
      codeBox.appendChild(status);
      codeBox.hidden = false;
      setTimeout(function () { try { ta.focus(); ta.select(); } catch (e) { } }, 0);
    }
    function showImport() {
      codeBox.hidden = true;
      Dom.clear(importBox);
      var ta = h('textarea', { cls: 'ui-code', rows: '4', 'aria-label': 'Paste a save code', placeholder: 'Paste a save code (it starts with ECE1-)', spellcheck: 'false', autocapitalize: 'off', autocomplete: 'off' });
      var status = h('p', { cls: 'ui-field-note', 'aria-live': 'polite' });
      var go = Dom.btn('Import', function () {
        Dom.text(status, '');
        ctx.importSave(ta.value).then(function (r) {
          if (r && r.ok) { Dom.text(status, 'Imported.'); if (ECE.App && ECE.App.toast) ECE.App.toast('Save imported'); S.settings(el, Object.assign({}, ctx, { save: ECE.App.save })); }
          else if (r && !r.cancelled) Dom.text(status, r.error || 'That save code could not be read.');
        });
      }, { primary: true, small: true });
      importBox.appendChild(ta);
      importBox.appendChild(h('div', { cls: 'ui-btn-row' }, [go, Dom.btn('Close', function () { importBox.hidden = true; }, { small: true })]));
      importBox.appendChild(status);
      importBox.hidden = false;
      setTimeout(function () { try { ta.focus(); } catch (e) { } }, 0);
    }

    if (ctx.updateReady) wrap.appendChild(h('div', { cls: 'ui-card' }, [h('p', null, 'A new version is ready.'), Dom.btn('Update now', function () { ctx.applyUpdate(); }, { primary: true, small: true })]));
    wrap.appendChild(h('div', { cls: 'ui-about' }, [
      h('p', null, G().game.name + ' · version ' + ctx.version + (ctx.build ? ' (' + ctx.build + ')' : '')),
      h('p', null, 'An original game. Street names are real places; no brands.')
    ]));
    if (ctx.fromGame) wrap.appendChild(h('div', { cls: 'ui-form-foot' }, [Dom.btn('Back to the game', function () { ctx.back(); }, { primary: true, cls: 'ui-wide-btn', data: { k: 'back-game' } })]));
    el.appendChild(wrap);
  };

  function legendItem(draw, label) {
    var svg = Dom.s('svg', { viewBox: '0 0 24 24', width: 30, height: 30, cls: 'ui-legend-svg', focusable: 'false', 'aria-hidden': 'true' });
    try { draw(svg); } catch (e) { Dom.report(e, 'legend'); }
    return h('li', { cls: 'ui-legend-item' }, [svg, h('span', null, label)]);
  }

  S.howto = function (el, ctx) {
    Dom.clear(el);
    var Bd = B(), R = Bd.RULES, A = ECE.Art;
    var wrap = h('div', { cls: 'ui-form ui-howto' });
    wrap.appendChild(header(ctx, 'How to play'));
    var legendAt = h('div', { cls: 'ui-legend-slot' });
    wrap.appendChild(legendAt);
    function section(title, lines) {
      var sec = h('section', { cls: 'ui-howto-sec' }, [h('h2', null, title)]);
      var ul = h('ul');
      lines.forEach(function (l) { if (l) ul.appendChild(h('li', null, l)); });
      sec.appendChild(ul);
      wrap.appendChild(sec);
    }
    var C = ECE.CardData || { DECKS: {} };
    var Rl = ECE.Rules || {};
    var house = ctx.game && ctx.game.rules ? ctx.game.rules : { auctions: !(ctx.save && ctx.save.setup && ctx.save.setup.auctions === false), rainFund: !!(ctx.save && ctx.save.setup && ctx.save.setup.rainFund) };
    var inGame = !!(ctx.game && ctx.game.rules);
    var share = Dom.share;
    var tr = R.transitRent.map(money).join(' / ');
    var counts = R.transitRent.map(function (x, k) { return String(k + 1); }).join(' / ');
    var costs = Bd.DISTRICTS.map(function (d) { return d.name + ' ' + money(d.build); }).join(', ');
    var tax = Bd.SPACES.filter(function (sp) { return sp.kind === 'tax'; }).map(function (sp) { return sp.name + ' ' + money(sp.amount); }).join(', ');
    var deckLine = function (id, what) { var d = C.DECKS[id]; return d ? d.name + ' (' + d.cards.length + ' cards, ' + what + ')' : ''; };
    var passes = 0;
    Object.keys(C.DECKS || {}).forEach(function (k) { (C.DECKS[k].cards || []).forEach(function (c) { if (c.effect && c.effect.carpool) passes++; }); });
    var firstStreet = 0;
    for (var fi = 0; fi < Bd.SPACES.length; fi++) if (Bd.SPACES[fi].kind === 'street') { firstStreet = fi; break; }
    var homes = (R.maxLevel || 5) - 1;
    var maxOffers = Rl.MAX_OFFERS || R.maxOffers || 3;
    var lim = (G().limits || []).filter(function (l) { return l.kind !== 'none'; });
    var mins = lim.filter(function (l) { return l.kind === 'minutes'; }).map(function (l) { return l.value; });
    var rounds = lim.filter(function (l) { return l.kind === 'rounds'; }).map(function (l) { return l.value; });
    var limits = [mins.length ? mins.join(' / ') + ' minutes of play' : '', rounds.length ? rounds.join(' / ') + ' rounds' : ''].filter(Boolean).join(', or ');
    var stuckName = (Bd.SPACES[Bd.TRAFFIC] || {}).name || 'Stuck in Traffic';
    var restName = (Bd.SPACES[Bd.REST] || {}).name || 'Coffee Break';
    var bridgeName = (Bd.SPACES[Bd.BRIDGE] || {}).name || 'Bridge Up!';
    var startName = (Bd.SPACES[Bd.START] || {}).name || 'START';
    var payStep = Dom.payOffStep();

    section('The goal', [
      'Buy real Seattle-area streets, collect rent, build homes and towers, and outlast the computer players.',
      'With a time or round limit, the richest player wins when it ends.'
    ]);
    section('Your turn', [
      'Everyone starts with ' + money(R.startCash) + '.',
      'Before and after you roll you may build, sell, mortgage and trade (Manage and Trade).',
      'Roll two dice and move clockwise. Pass or land on ' + startName + ': payday, ' + money(R.salary) + '.',
      'Doubles: roll again after your move. The ' + Dom.ordinal(R.doublesToTraffic) + ' doubles in a row sends you to ' + stuckName + '.'
    ]);
    section('The spaces', [
      house.auctions !== false
        ? 'Nobody owns it: buy it at its price, or say no and it goes to auction (the first bid is at least ' + money(R.auctionOpen) + ').'
        : 'Nobody owns it: buy it at its price, or say no and it stays for sale (Auctions are off' + (inGame ? ' in this game' : '') + ').',
      'Someone else owns it: pay rent. Own all three streets of a district and its streets with no buildings pay double.',
      'Transit stops: ' + tr + ' for ' + counts + ' stops owned.',
      'Utilities: dice total × ' + R.utilityTimes[0] + ', or × ' + R.utilityTimes[1] + ' when the owner has both.',
      tax + (house.rainFund ? ': into the Rain Fund.' : '.'),
      deckLine('rain', 'mostly moves') + ' and ' + deckLine('buzz', 'mostly money') + ': draw the top card. Yours stays until you tap OK; a computer player’s shows for a moment.',
      house.rainFund ? restName + ': collect the whole Rain Fund.' : restName + ': a rest.',
      bridgeName + ': go straight to ' + stuckName + ', no salary; your turn ends, even after doubles.'
    ]);
    section(stuckName, [
      'Pay ' + money(R.trafficFee) + ', use a Carpool Pass, or roll for doubles.',
      'Doubles: leave and move by that roll (no extra roll). After the ' + Dom.ordinal(R.trafficMaxTries) + ' miss: pay ' + money(R.trafficFee) + ' and move.',
      'There ' + (passes === 1 ? 'is 1 Carpool Pass' : 'are ' + passes + ' Carpool Passes') + ' in the decks: keep yours until you use it, or trade it.',
      'While stuck you still collect rent, build and trade.'
    ]);
    section('Homes and towers', [
      'Own all three streets of a district, none mortgaged, to build.',
      'A home or a tower costs: ' + costs + '.',
      'Build evenly: a street gets its next building only when no street of its district has fewer. 1-' + homes + ' homes, then a tower (' + homes + ' homes on every street of the district first).',
      'Buildings sell back for ' + share(R.sellShare) + '.'
    ]);
    section('Money', [
      'Mortgage a space with no buildings in its district for about ' + share(R.mortgageShare) + ' its price; pay it off for that plus ' + Math.round(R.unmortgageExtra * 100) + '%, rounded up' + (payStep > 1 ? ' to the next ' + money(payStep) : '') + ' (' +
        Bd.SPACES[firstStreet].name + ': ' + money(Bd.mortgageValue(firstStreet)) + ' now, ' + money(Bd.unmortgageCost(firstStreet)) + ' to pay off). No rent while mortgaged.',
      'Trade on your turn: cash, streets with no buildings in their district, transit stops, utilities and Carpool Passes. Up to ' + maxOffers + ' offers a turn.',
      'Owe more than your cash? Sell buildings and mortgage to pay. If everything you own cannot cover it, you are out: a player you owe gets your cash and spaces; if you owe the bank or several players, your cash is shared and your spaces go back to the bank.'
    ]);
    section('House rules (chosen at New game)', inGame ? [
      house.auctions !== false ? 'Auctions (on in this game): a space nobody buys goes to the highest bidder.' : 'Auctions (off in this game): a space nobody buys stays for sale.',
      house.rainFund ? 'Rain Fund (on in this game): taxes and card payments to the bank go into the Rain Fund in the board’s centre; landing on ' + restName + ' collects all of it.' : 'Rain Fund (off in this game): taxes and card payments go to the bank.'
    ] : [
      'Auctions (on unless you turn them off): a space nobody buys goes to the highest bidder. With Auctions off it stays for sale.',
      'Rain Fund (off unless you turn it on): taxes and card payments to the bank go into the Rain Fund in the board’s centre; landing on ' + restName + ' collects all of it.'
    ]);
    section('Winning', [
      'No limit: the last player still in wins.',
      'With a limit (' + limits + '): the round finishes, then the highest net worth wins.',
      'If you go bankrupt, the game ends for you; the others are ranked by net worth.',
      'Net worth = cash + each space’s price (its mortgage value if mortgaged) + what was paid for its buildings.'
    ]);
    if (!document.documentElement.classList.contains('phone')) section('Keys', ['Space or Enter = the big green button, Esc = close, Tab = move between buttons.']);

    var leg = h('ul', { cls: 'ui-legend' });
    var tagD = Bd.DISTRICTS[3];
    var tagC = Dom.tagColors(tagD.color);
    leg.appendChild(legendItem(function (svg) {
      svg.appendChild(Dom.s('rect', { x: 2, y: 6, width: 20, height: 12, rx: 3, fill: tagC.fill }));
      var t = Dom.s('text', { x: 12, y: 15.5, 'text-anchor': 'middle', 'font-size': 9, 'font-weight': 700, fill: tagC.text, 'font-family': 'system-ui, sans-serif' });
      t.textContent = tagD.tag;
      svg.appendChild(t);
    }, 'District tag (' + tagD.tag + ' = ' + tagD.name + ')'));
    leg.appendChild(legendItem(function (svg) {
      if (A && A.house) A.house(svg, 12, 19, 14); else svg.appendChild(Dom.s('path', { d: 'M5 12l7-6 7 6v7H5z', fill: '#fff', stroke: '#8A5A3B', 'stroke-width': 1.6 }));
    }, 'A home'));
    leg.appendChild(legendItem(function (svg) {
      if (A && A.tower) A.tower(svg, 12, 22, 8, 19); else svg.appendChild(Dom.s('rect', { x: 8, y: 3, width: 8, height: 19, fill: '#3D5A80' }));
    }, 'A tower'));
    leg.appendChild(legendItem(function (svg) {
      svg.appendChild(Dom.s('rect', { x: 3, y: 3, width: 18, height: 18, rx: 3, fill: '#D3D7D6' }));
      for (var k = -12; k < 24; k += 5) svg.appendChild(Dom.s('path', { d: 'M' + (3 + k) + ' 21L' + (21 + k) + ' 3', stroke: '#7B878C', 'stroke-width': 1.2 }));
      var t = Dom.s('text', { x: 12, y: 16, 'text-anchor': 'middle', 'font-size': 11, 'font-weight': 800, fill: '#1D2A30', 'font-family': 'system-ui, sans-serif' });
      t.textContent = 'M';
      svg.appendChild(t);
    }, 'Mortgaged (no rent)'));
    leg.appendChild(legendItem(function (svg) {
      var g = Dom.s('g', { transform: 'translate(12 12) scale(9)' });
      svg.appendChild(g);
      if (A && A.disc) A.disc(g, 'ferry', (G().playerColors || [])[1] || '#E0453A', 1, { rim: 0.12, glyph: 0.66 });
      else g.appendChild(Dom.s('circle', { cx: 0, cy: 0, r: 1, fill: '#E0453A' }));
    }, 'Owner (their colour and token)'));
    [['rain', 'Rain Check card'], ['buzz', 'Local Buzz card'], ['train', 'Transit stop'], ['dam', 'Utility'], ['tax', 'Tax or toll']].forEach(function (x) {
      leg.appendChild(legendItem(function (svg) {
        if (A && A.icon) A.icon(svg, x[0], 12, 12, 22);
        else svg.appendChild(Dom.s('circle', { cx: 12, cy: 12, r: 8, fill: '#2E6F95' }));
      }, x[1]));
    });
    legendAt.appendChild(h('section', { cls: 'ui-howto-sec' }, [h('h2', null, 'On the board'), leg]));
    wrap.appendChild(h('div', { cls: 'ui-form-foot' }, [Dom.btn(ctx.fromGame ? 'Back to the game' : 'Back', function () { ctx.back(); }, { primary: true, cls: 'ui-wide-btn' })]));
    el.appendChild(wrap);
  };
})(window.ECE = window.ECE || {});
;
(function (ECE) {
  'use strict';

  var PHONE_MAX = 500;
  var M = { touch: false, phone: false, standalone: false, ready: false, PHONE_MAX: PHONE_MAX };
  ECE.Mobile = M;

  function report(e) { if (ECE.Dom) ECE.Dom.report(e, 'mobile'); }

  M.detectFrom = function (f) {
    f = f || {};
    var q = f.query || {};
    var touch = !!f.coarse;
    var phone = touch && f.minScreen > 0 && f.minScreen <= PHONE_MAX;
    if (q.phone === '1') { phone = true; touch = true; }
    else if (q.phone === '0') phone = false;
    return { touch: touch, phone: phone, standalone: !!f.standalone };
  };

  M.facts = function () {
    var w = window, scr = w.screen || {};
    var mq = function (s) { try { return !!(w.matchMedia && w.matchMedia(s).matches); } catch (e) { return false; } };
    var q = {};
    try { var m = /[?&]phone=([01])\b/.exec(w.location.search || ''); if (m) q.phone = m[1]; } catch (e) { }
    var sa = false;
    try { sa = ECE.Pwa && typeof ECE.Pwa.isStandalone === 'function' ? !!ECE.Pwa.isStandalone() : (mq('(display-mode: standalone)') || w.navigator.standalone === true); } catch (e2) { sa = false; }
    var sw = +scr.width || 0, sh = +scr.height || 0;
    return { coarse: mq('(hover: none) and (pointer: coarse)'), minScreen: sw && sh ? Math.min(sw, sh) : Math.min(w.innerWidth || 0, w.innerHeight || 0), standalone: sa, query: q };
  };

  M.refresh = function () {
    var f = M.detectFrom(M.facts());
    var changed = f.phone !== M.phone || f.touch !== M.touch || f.standalone !== M.standalone || !M.ready;
    M.touch = f.touch; M.phone = f.phone; M.standalone = f.standalone;
    var c = document.documentElement.classList;
    if (c.contains('phone') !== f.phone) c.toggle('phone', f.phone);
    if (c.contains('touch') !== f.touch) c.toggle('touch', f.touch);
    if (c.contains('standalone') !== f.standalone) c.toggle('standalone', f.standalone);
    M.ready = true;
    return changed;
  };

  var probe = null;
  M.insets = function () {
    try {
      if (!probe || !probe.isConnected) {
        probe = document.createElement('div');
        probe.className = 'ui-safe-probe';
        probe.setAttribute('aria-hidden', 'true');
        document.body.appendChild(probe);
      }
      var cs = getComputedStyle(probe);
      return { top: parseFloat(cs.paddingTop) || 0, right: parseFloat(cs.paddingRight) || 0, bottom: parseFloat(cs.paddingBottom) || 0, left: parseFloat(cs.paddingLeft) || 0 };
    } catch (e) { return { top: 0, right: 0, bottom: 0, left: 0 }; }
  };

  function inScroller(t) {
    for (var n = t; n && n.nodeType === 1; n = n.parentNode) {
      if (n.classList && (n.classList.contains('ui-dlg-body') || n.classList.contains('ui-scroll'))) return n.scrollHeight > n.clientHeight + 1;
      if (n.tagName === 'TEXTAREA' || (n.tagName === 'INPUT' && n.type === 'range')) return true;
    }
    return false;
  }
  function onGame() { return document.documentElement.classList.contains('on-game'); }

  M.init = function () {
    M.refresh();
    if (M.hooked) return;
    M.hooked = true;
    var relayout = function () {
      try { M.refresh(); } catch (e) { report(e); }
      if (ECE.App && ECE.App.orient) ECE.App.orient();
      if (ECE.App && ECE.App.layout) ECE.App.layout();
    };
    window.addEventListener('orientationchange', function () { setTimeout(relayout, 80); });
    if (window.matchMedia) {
      try {
        var mm = window.matchMedia('(display-mode: standalone)');
        if (mm && mm.addEventListener) mm.addEventListener('change', relayout);
      } catch (e) { }
    }
    ['gesturestart', 'gesturechange'].forEach(function (g) {
      document.addEventListener(g, function (ev) { if (M.touch && onGame() && ev.cancelable) ev.preventDefault(); }, { passive: false });
    });
    document.addEventListener('touchmove', function (ev) {
      if (!M.phone || !onGame() || !ev.cancelable) return;
      if (ev.touches && ev.touches.length > 1) { ev.preventDefault(); return; }
      var t = ev.target;
      if (t && t.closest && t.closest('.ui-board-host')) return;
      if (!inScroller(t)) ev.preventDefault();
    }, { passive: false });
    document.addEventListener('contextmenu', function (ev) {
      if (!M.touch) return;
      var t = ev.target;
      if (t && t.closest && t.closest('input, textarea')) return;
      ev.preventDefault();
    });
  };

  M.landscape = function () {
    if (!M.phone) return false;
    var a = document.activeElement;
    if (a && /^(INPUT|TEXTAREA)$/.test(a.tagName)) return false;
    var w = window.innerWidth || 0, h = window.innerHeight || 0;
    return w > h * 1.05;
  };

  var BOARD_MIN_SHARE = 0.95;
  var MINI_CHIP_W = 72;

  function setFit(g, cfg) {
    g.dataset.chips = cfg.chips || 'full';
    Dom().toggle(g, 'ui-fit-noturn', !cfg.turn);
    Dom().toggle(g, 'ui-fit-nolog', !cfg.log);
  }
  function Dom() { return ECE.Dom || { toggle: function (el, c, on) { el.classList.toggle(c, !!on); } }; }
  function miniCols(chips, n, innerW) {
    n = Math.max(1, n);
    var fit = Math.max(1, Math.min(n, Math.floor((innerW + 4) / (MINI_CHIP_W + 4))));
    var rows = Math.ceil(n / fit);
    var cols = Math.ceil(n / rows);
    chips.style.setProperty('--cols', String(cols));
    return cols;
  }

  M.fitGame = function (els, state) {
    var W = window.innerWidth || 390, H = window.innerHeight || 844;
    var ins = M.insets();
    var L = ECE.BoardData.LAYOUT, ratio = L.widthUnits / L.heightUnits;
    var g = els.screens.game;
    g.classList.remove('ui-layout-side');
    g.classList.remove('ui-layout-stack');
    g.classList.remove('ui-stack-compact');
    var margin = 4, slack = 2;
    var topBottom = els.top ? els.top.getBoundingClientRect().bottom : ins.top + 44;
    var wrapPad = els.wrap ? (parseFloat(getComputedStyle(els.wrap).paddingTop) || 0) : 0;
    var avail = H - ins.bottom - topBottom - wrapPad;
    var usable = Math.max(100, W - ins.left - ins.right);
    var bwMax = usable - margin * 2;
    var bwMin = Math.min(bwMax, usable * BOARD_MIN_SHARE);
    var panel = els.panel, P = els.panelApi;
    var n = state && state.players ? state.players.length : 4;
    var m = { pad: 0, gap: 4, turn: 0, act: 64, row: 52, alts: 0, log: 44, chips: { full: 0, compact: 0, row: 0, mini: 0, micro: 0 }, cut: {} };
    if (panel && P && P.chipsEl) {
      if (P.home) P.home();
      var cs = getComputedStyle(panel);
      m.pad = (parseFloat(cs.paddingTop) || 0) + (parseFloat(cs.paddingBottom) || 0);
      m.gap = parseFloat(cs.rowGap || cs.gap) || 0;
      var hgt = function (e) { return e ? e.getBoundingClientRect().height : 0; };
      var cashCut = function () {
        if (typeof P.chipsEl.querySelectorAll !== 'function' || typeof document === 'undefined' || !document.createRange) return false;
        var list = P.chipsEl.querySelectorAll('.ui-chip');
        for (var i = 0; i < list.length; i++) {
          var c = list[i];
          if (!c.getClientRects().length) continue;
          var cash = c.querySelectorAll('.ui-chip-cash');
          for (var k = 0; k < cash.length; k++) {
            var e = cash[k];
            if (!e.getClientRects().length || !e.firstChild) continue;
            if (e.scrollWidth > e.clientWidth + 1) return true;
            var cr = c.getBoundingClientRect(), ccs = getComputedStyle(c);
            var rr = null;
            try { var rg = document.createRange(); rg.selectNodeContents(e); rr = rg.getBoundingClientRect(); } catch (er) { rr = null; }
            if (rr && rr.width > 0 && rr.right > cr.right - (parseFloat(ccs.paddingRight) || 0) + 1.5) return true;
          }
        }
        return false;
      };
      setFit(g, { turn: true, chips: 'full', log: true });
      m.turn = hgt(P.turnEl);
      m.act = hgt(P.actionsEl) || 64;
      m.row = (P.rowEl && hgt(P.rowEl)) || m.act;
      m.alts = P.altsEl && !P.altsEl.hidden ? hgt(P.altsEl) : 0;
      m.log = hgt(P.logEl) || 44;
      m.chips.full = hgt(P.chipsEl);
      m.cut.full = cashCut();
      setFit(g, { turn: true, chips: 'compact', log: true });
      m.chips.compact = hgt(P.chipsEl);
      m.cut.compact = cashCut();
      setFit(g, { turn: true, chips: 'row', log: true });
      m.chips.row = hgt(P.chipsEl);
      m.cut.row = cashCut();
      var innerW = Math.max(100, (panel.getBoundingClientRect().width || usable) - (parseFloat(cs.paddingLeft) || 0) - (parseFloat(cs.paddingRight) || 0));
      miniCols(P.chipsEl, n, innerW);
      setFit(g, { turn: true, chips: 'mini', log: true });
      m.chips.mini = hgt(P.chipsEl);
      m.cut.mini = cashCut();
      setFit(g, { turn: true, chips: 'micro', log: true });
      m.chips.micro = hgt(P.chipsEl);
      m.cut.micro = cashCut();
      miniCols(P.chipsEl, n, innerW);
    }
    var need = function (cfg, withActions) {
      var parts = [];
      if (cfg.turn) parts.push(m.turn);
      if (cfg.chips) parts.push(m.chips[cfg.chips]);
      if (withActions === 'row') parts.push(m.row);
      else if (withActions) parts.push(m.act);
      if (cfg.log) parts.push(m.log);
      if (!parts.length) return 0;
      var sum = 0;
      for (var i = 0; i < parts.length; i++) sum += parts[i];
      return sum + m.gap * (parts.length - 1) + m.pad + slack;
    };
    var boardFor = function (panelH) { return Math.min(bwMax, Math.max(0, avail - panelH) * ratio); };
    var STACK = [
      { turn: 1, chips: 'full', log: 1, wide: 1 }, { turn: 0, chips: 'full', log: 1, wide: 1 },
      { turn: 0, chips: 'compact', log: 1 }, { turn: 0, chips: 'compact', log: 0 },
      { turn: 0, chips: 'row', log: 1 }, { turn: 0, chips: 'row', log: 0 },
      { turn: 0, chips: 'mini', log: 1 }, { turn: 0, chips: 'mini', log: 0 }, { turn: 0, chips: 'micro', log: 0 }
    ];
    var CENTRE = [
      { turn: 0, chips: 'full', log: 1, wide: 1 }, { turn: 0, chips: 'compact', log: 1 }, { turn: 0, chips: 'compact', log: 0 },
      { turn: 0, chips: 'row', log: 1 }, { turn: 0, chips: 'row', log: 0 },
      { turn: 0, chips: 'mini', log: 1 }, { turn: 0, chips: 'mini', log: 0 }, { turn: 0, chips: 'micro', log: 0 }
    ];
    var atFull = function (bw) { return bw >= bwMax - 0.5; };
    var atLeast95 = function (bw) { return Math.floor(bw + 1e-6) >= bwMin - 0.5; };
    var anyWhole = !m.cut.full || !m.cut.compact || !m.cut.row || !m.cut.mini || !m.cut.micro;
    var pick = function (list, withActions) {
      for (var i = 0; i < list.length; i++) {
        if (anyWhole && m.cut[list[i].chips]) continue;
        var bw = boardFor(need(list[i], withActions));
        if (atFull(bw) || (!list[i].wide && atLeast95(bw))) return { cfg: list[i], bw: bw };
      }
      return null;
    };
    var mode = 'stack';
    var sel = pick(STACK, true);
    if (!sel && m.alts > 0) { mode = 'stack-alts'; sel = pick(STACK, 'row'); }
    if (!sel) { mode = 'centre'; sel = pick(CENTRE, false); }
    if (!sel) {
      mode = 'centre-all';
      var withLog = { turn: 0, chips: 'mini', log: 1, inCentre: true };
      var bwLog = Math.min(bwMax, Math.max(0, avail - (m.log + m.pad + slack)) * ratio);
      sel = bwLog >= bwMin ? { cfg: withLog, bw: bwLog } : { cfg: { turn: 0, chips: 'mini', log: 0, inCentre: true }, bw: Math.min(bwMax, avail * ratio) };
    }
    var bw = Math.max(120, sel.bw), bh = bw / ratio;
    setFit(g, sel.cfg);
    g.dataset.fit = mode;
    var host = els.boardHost;
    host.style.width = Math.floor(bw) + 'px';
    host.style.height = Math.floor(bh) + 'px';
    if (panel) panel.style.width = '';
    var cr = null;
    if (els.center) {
      var c = els.center;
      var closeUp = !!(ECE.App && ECE.App.save && ECE.App.save.settings.closeUp);
      var wrapW = els.wrap ? els.wrap.getBoundingClientRect().width || W : W;
      var bx = (wrapW - Math.floor(bw)) / 2;
      var unit = bw / L.widthUnits;
      try { if (ECE.BoardView && typeof ECE.BoardView.geometry === 'function') cr = ECE.BoardView.geometry(Math.floor(bw), Math.floor(bh)).center; } catch (e3) { cr = null; }
      if (!cr || !(cr.w > 0)) cr = { x: unit * 2.06, y: unit * 2.06, w: unit * 5.88, h: unit * 9.88 };
      var inset = 4;
      c.style.width = Math.floor(cr.w - inset * 2) + 'px';
      c.style.left = Math.floor(bx + cr.x + inset) + 'px';
      c.style.top = '';
      c.style.bottom = Math.floor(closeUp ? 8 : (Math.floor(bh) - cr.y - cr.h + inset)) + 'px';
      Dom().toggle(c, 'ui-center-foot', closeUp);
      if (sel.cfg.inCentre && P && P.chipsEl) miniCols(P.chipsEl, n, cr.w - inset * 2 - 12);
    }
    return { center: mode === 'centre' || mode === 'centre-all', altsInCentre: mode === 'stack-alts', centerChips: !!sel.cfg.inCentre, mode: mode, cfg: sel.cfg, boardW: bw, boardH: bh, boardMin: bwMin, usable: usable };
  };
})(window.ECE = window.ECE || {});
;
(function (ECE) {
  'use strict';

  var Dom = ECE.Dom;
  var h = function (t, p, k) { return Dom.h(t, p, k); };
  var App = {};
  ECE.App = App;

  var THINK = { normal: 280, fast: 100, instant: 0 };
  var AFTER = { normal: 230, fast: 80, instant: 0 };
  var CARD_MS = { normal: 1200, fast: 550, instant: 0 };
  var MANAGE_MS = { normal: 60, fast: 20, instant: 0 };
  var END_MS = { normal: 160, fast: 60, instant: 0 };
  var SCREENS = ['home', 'setup', 'game', 'settings', 'howto'];
  var SCREEN_NAMES = { home: 'Home', setup: 'New game', game: 'Game', settings: 'Settings', howto: 'How to play' };
  var MANAGE = { build: 1, sell: 1, mortgage: 1, unmortgage: 1 };
  var ROLLS = { roll: 1, payFee: 1, usePass: 1 };
  var NOTE_FADE_MS = 120;
  var TURN_ACTION_CAP = 150;
  var PLAY_TIMEOUT_MS = 12000;

  App.errors = [];
  App.screen = null;
  App.game = null;
  App.you = null;
  App.busy = false;
  App.auto = false;
  App.updateReady = false;
  App.gen = 0;

  var errorShown = false;
  App.report = function (err, where) {
    var msg = (where ? where + ': ' : '') + (err && err.message ? err.message : String(err));
    var stack = err && err.stack ? String(err.stack).split('\n').slice(0, 8).join('\n') : '';
    App.errors.push(stack && stack.indexOf(msg) < 0 ? msg + '\n' + stack : (stack || msg));
    if (App.errors.length > 60) App.errors.splice(0, App.errors.length - 60);
    try { console.error('[ece] ' + msg + (stack ? '\n' + stack : '')); } catch (e) { }
    showErrorBar();
  };

  function showErrorBar() {
    var bar = document.getElementById('errorbar');
    if (!bar) return;
    if (!errorShown) {
      errorShown = true;
      Dom.clear(bar);
      bar.appendChild(h('span', { cls: 'ui-errorbar-text' }, 'Something went wrong'));
      bar.appendChild(Dom.btn('Reload', function () { try { safeReload(function () { location.reload(); }); } catch (e) { location.reload(); } }, { small: true, primary: true }));
      if (App.debug) {
        bar.appendChild(Dom.btn('Details', function () { var d = bar.querySelector('.ui-errorbar-details'); if (d) d.hidden = !d.hidden; }, { small: true }));
        bar.appendChild(h('pre', { cls: 'ui-errorbar-details', hidden: true }));
      }
      bar.appendChild(Dom.btn(Dom.icon('close', 18), function () { bar.hidden = true; }, { small: true, ghost: true, aria: 'Hide this message' }));
      bar.hidden = false;
    }
    var pre = bar.querySelector('.ui-errorbar-details');
    if (pre) pre.textContent = App.errors.slice(-12).join('\n\n');
  }

  function installCatchers() {
    window.addEventListener('error', function (ev) {
      if (ev && ev.target && ev.target !== window && ev.target.tagName) { App.report(new Error('could not load ' + (ev.target.src || ev.target.href || ev.target.tagName)), 'resource'); return; }
      App.report(ev && ev.error ? ev.error : new Error(ev && ev.message ? ev.message : 'error'), 'window');
    }, true);
    window.addEventListener('unhandledrejection', function (ev) { App.report(ev && ev.reason ? ev.reason : new Error('promise rejected'), 'promise'); });
  }

  function blankSave() {
    if (ECE.Save && typeof ECE.Save.blank === 'function') {
      try { var b = ECE.Save.blank(); if (b && typeof b === 'object') return b; } catch (e) { App.report(e, 'save.blank'); }
    }
    return {
      v: 1, app: 'emeraldcityestates', createdAt: Date.now(), updatedAt: Date.now(), build: ECE.BUILD || '',
      settings: { speed: 'normal', sound: true, volume: 0.6, rain: false, tips: true, reduceMotion: 'auto', closeUp: false },
      setup: { name: 'You', token: 'orca', opponents: 3, level: 'normal', limit: 'none', auctions: true, rainFund: false },
      stats: { played: 0, won: 0, bestNet: 0, bestRank: 0, fastestWin: 0 },
      tips: {}, keepTipShown: false, game: null, history: []
    };
  }
  function fillSave(s) {
    var b = blankSave();
    s = s && typeof s === 'object' ? s : b;
    ['settings', 'setup', 'stats'].forEach(function (k) {
      if (!s[k] || typeof s[k] !== 'object') s[k] = b[k];
      for (var f in b[k]) if (s[k][f] === undefined) s[k][f] = b[k][f];
    });
    if (!s.tips || typeof s.tips !== 'object') s.tips = {};
    if (!Array.isArray(s.history)) s.history = [];
    if (s.game === undefined) s.game = null;
    return s;
  }
  App.saveSoon = function () {
    if (!App.save) return;
    if (App.game) App.save.game = App.game.phase === 'over' ? null : App.game;
    try { if (ECE.Save && !App.readOnly) ECE.Save.schedule(App.save); } catch (e) { App.report(e, 'save'); }
  };
  App.saveNow = function () {
    App.saveSoon();
    try { return ECE.Save ? ECE.Save.flush() !== false : false; } catch (e) { App.report(e, 'save.flush'); return false; }
  };
  function reloadLoses() {
    if (!App.game || App.takenOver || App.readOnly) return false;
    var st = null;
    try { st = ECE.Save && typeof ECE.Save.status === 'function' ? ECE.Save.status() : null; } catch (e) { st = null; }
    if (!st || st.takenOver || st.readOnly) return false;
    return !!(st.lastError || st.pending || st.storage === 'memory');
  }
  App.reloadLoses = reloadLoses;
  function safeReload(go) {
    var ok = App.saveNow();
    if (ok || !reloadLoses()) { go(); return; }
    ECE.Dialogs.open({
      id: 'reloadask', title: 'Your progress isn’t saved', cls: 'ui-dlg-msg', place: 'center', closable: true,
      render: function (hd) {
        hd.body.appendChild(h('p', { cls: 'ui-p' }, 'Your progress can’t be saved right now. Reloading loses the moves since it was last saved. Copy your save code first to keep this game.'));
        if (hd.data.code) {
          var ta = h('textarea', { cls: 'ui-code', readonly: true, rows: 3, 'aria-label': 'Your save code' });
          ta.value = hd.data.code;
          hd.body.appendChild(ta);
        }
        hd.foot.appendChild(key3(Dom.btn('Copy save code', function () {
          var code = '';
          try { code = ECE.Save.exportCode(App.save); } catch (e) { App.report(e, 'export'); }
          hd.data.code = code;
          try { if (navigator.clipboard && code) navigator.clipboard.writeText(code).catch(function () { }); } catch (e2) { }
          hd.update();
          if (App.toast) App.toast(code ? 'Save code copied.' : 'The save code could not be made.');
        }), 'copy'));
        hd.foot.appendChild(key3(Dom.btn('Reload anyway', function () { hd.close('reload'); go(); }, { danger: true }), 'reload'));
        hd.foot.appendChild(key3(Dom.btn('Not now', function () { hd.close('no'); }, { primary: true }), 'no'));
      }
    });
  }
  App.safeReload = safeReload;
  function key3(b, k) { b.dataset.k = k; return b; }

  function reduceMotion() {
    var s = App.save && App.save.settings;
    if (s && s.reduceMotion === 'on') return true;
    if (s && s.reduceMotion === 'off') return false;
    try { return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches); } catch (e) { return false; }
  }
  App.reduceMotion = reduceMotion;
  App.applySettings = function () {
    var s = App.save.settings;
    document.documentElement.classList.toggle('reduce-motion', reduceMotion());
    if (ECE.Sound) { try { ECE.Sound.set({ sound: s.sound, volume: s.volume, rain: s.rain && App.screen === 'game' }); } catch (e) { App.report(e, 'sound'); } }
  };
  function watchMotion() {
    var mq = null;
    try { mq = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null; } catch (e) { mq = null; }
    if (!mq) return;
    var on = function () { try { if (App.save) App.applySettings(); } catch (e) { App.report(e, 'reduce motion'); } };
    if (typeof mq.addEventListener === 'function') mq.addEventListener('change', on);
    else if (typeof mq.addListener === 'function') mq.addListener(on);
  }
  App.settingsChanged = function () {
    App.applySettings();
    App.saveSoon();
    if (App.panel && App.game) renderPanel();
  };
  function cpuSpeed() {
    if (App.auto) return 'instant';
    if (App.test && !App.testSpeed) return 'instant';
    var sp = App.testSpeed || (App.save && App.save.settings.speed) || 'normal';
    return THINK[sp] === undefined ? 'normal' : sp;
  }
  function humanSpeed() {
    if (App.auto || (App.test && !App.testSpeed)) return 'instant';
    if (App.testSpeed === 'instant') return 'instant';
    return 'normal';
  }

  function el(id, tag, cls, parent) {
    var e = document.getElementById(id);
    if (!e) { e = h(tag, { id: id, cls: cls }); (parent || document.body).appendChild(e); }
    else if (cls) cls.split(' ').forEach(function (c) { if (c) e.classList.add(c); });
    return e;
  }
  function buildShell() {
    var app = el('app', 'div', 'ui-app');
    var splash = document.getElementById('splash');
    if (splash && splash.parentNode) splash.parentNode.removeChild(splash);
    App.el = { app: app, screens: {} };
    var main = el('screens', 'main', 'ui-screens', app);
    SCREENS.forEach(function (n) {
      var s = el('screen-' + n, 'section', 'ui-screen ui-screen-' + n, main);
      s.hidden = true;
      s.setAttribute('aria-label', SCREEN_NAMES[n] || n);
      App.el.screens[n] = s;
    });
    el('banner', 'div', 'ui-banner').hidden = true;
    var rot = el('rotate', 'div', 'ui-rotate');
    rot.hidden = true;
    rot.setAttribute('role', 'status');
    Dom.clear(rot);
    rot.appendChild(h('div', { cls: 'ui-rotate-card' }, [rotateIcon(), h('p', { cls: 'ui-rotate-title' }, 'Turn your phone upright to play'), h('p', { cls: 'ui-rotate-sub' }, 'The game waits for you.')]));
    var bar = el('errorbar', 'div', 'ui-errorbar');
    bar.hidden = true;
    bar.setAttribute('role', 'alert');
    el('dialogs', 'div', 'ui-dialogs');
    buildGameScreen(App.el.screens.game);
  }

  function buildGameScreen(g) {
    Dom.clear(g);
    var top = h('header', { cls: 'ui-topbar' });
    var menu = Dom.btn(Dom.icon('menu'), function () { openMenu(); }, { ghost: true, cls: 'ui-icon-btn', aria: 'Menu' });
    var round = h('div', { cls: 'ui-topbar-round', 'aria-live': 'off' });
    var cam = Dom.btn(Dom.icon('zoom'), function () { App.setCloseUp(!closeUpOn()); }, { ghost: true, cls: 'ui-icon-btn ui-cam-btn', aria: 'Close-up camera', pressed: false });
    top.appendChild(menu); top.appendChild(round); top.appendChild(cam);
    var wrap = h('div', { cls: 'ui-board-wrap' });
    var host = h('div', { id: 'board', cls: 'ui-board-host' });
    var center = h('div', { cls: 'ui-center-actions', hidden: true });
    var note = h('div', { cls: 'ui-board-note', hidden: true });
    wrap.appendChild(host);
    wrap.appendChild(note);
    wrap.appendChild(center);
    App.el.note = note;
    var panelEl = h('aside', { id: 'panel', cls: 'ui-panel', 'aria-label': 'Players and actions' });
    g.appendChild(top);
    g.appendChild(wrap);
    g.appendChild(panelEl);
    App.el.top = top; App.el.round = round; App.el.cam = cam;
    App.el.wrap = wrap; App.el.boardHost = host; App.el.center = center; App.el.panel = panelEl;
    App.panel = ECE.Panel.mount(panelEl, {
      onPrimary: function (pr) { onPrimary(pr); },
      onManage: function () { openManage(); },
      onTrade: function () { openTrade(); },
      onLog: function () { openLog(); },
      onMenu: function () { openMenu(); },
      onCloseUp: function () { App.setCloseUp(!closeUpOn()); },
      onPick: function (id, spaces) { viewCall('highlight', [id === null ? [] : spaces]); }
    });
    App.el.panelApi = App.panel;
  }

  function ensureView() {
    if (App.view) return App.view;
    if (!ECE.BoardView || typeof ECE.BoardView.mount !== 'function') return null;
    try {
      App.view = ECE.BoardView.mount(App.el.boardHost, { onSpaceTap: function (i) { onSpaceTap(i); } });
    } catch (e) { App.report(e, 'BoardView.mount'); App.view = null; }
    if (App.view && closeUpOn()) viewCall('setCloseUp', [true]);
    return App.view;
  }
  function viewCall(name, args) {
    var v = App.view;
    if (!v || typeof v[name] !== 'function') return undefined;
    try { return v[name].apply(v, args || []); } catch (e) { App.report(e, 'view.' + name); return undefined; }
  }
  function renderBoard() {
    if (App.view && App.game) viewCall('render', [App.game, { you: App.you, reduceMotion: reduceMotion() }]);
  }
  function onSpaceTap(i) {
    if (!App.game || ECE.Dialogs.blocking()) return;
    ECE.Dialogs.deed(App.gameCtx(), i);
  }
  App.boardRect = function () {
    var e = App.el && App.el.boardHost;
    if (!e || !e.isConnected || App.screen !== 'game') return null;
    var r = e.getBoundingClientRect();
    var B = ECE.BoardData.LAYOUT;
    var k = Math.min(r.width / B.widthUnits, r.height / B.heightUnits);
    var w = k * B.widthUnits, hh = k * B.heightUnits;
    return { left: r.left + (r.width - w) / 2, top: r.top + (r.height - hh) / 2, width: w, height: hh };
  };
  App.sideRect = function () {
    var e = App.el && App.el.panel;
    if (!e || App.screen !== 'game' || document.documentElement.classList.contains('phone')) return null;
    var g = App.el.screens.game;
    if (!g.classList.contains('ui-layout-side')) return null;
    var r = e.getBoundingClientRect();
    var bottom = Math.max(r.bottom, (window.innerHeight || 800) - 14);
    return { left: r.left, top: r.top, width: r.width, height: bottom - r.top, right: r.right, bottom: bottom };
  };

  function closeUpOn() { return !!(App.save && App.save.settings.closeUp); }
  App.setCloseUp = function (on) {
    App.save.settings.closeUp = !!on;
    viewCall('setCloseUp', [!!on]);
    if (on && App.game) {
      var tp = App.game.players[App.game.turn];
      if (tp) viewCall('follow', [tp.id]);
    }
    App.saveSoon();
    renderTop();
    renderPanel();
    App.layout();
  };

  App.go = function (name, opts) {
    opts = opts || {};
    if (SCREENS.indexOf(name) < 0) name = 'home';
    if (name === 'game' && !App.game) name = 'home';
    var from = App.screen;
    if (name === 'settings' || name === 'howto' || name === 'setup') {
      if (from === 'game') App.backTo = 'game';
      else if (from !== 'settings' && from !== 'howto' && from !== 'setup') App.backTo = 'home';
    }
    if (from === 'game' && name !== 'game') { closeScreenDialogs(); hideNote(); App.waitedKey = null; }
    if (name !== 'game' && ECE.Dialogs.isOpen()) closeScreenDialogs();
    App.screen = name;
    SCREENS.forEach(function (n) { App.el.screens[n].hidden = n !== name; });
    document.documentElement.classList.toggle('on-game', name === 'game');
    document.documentElement.dataset.screen = name;
    if (name === 'game') {
      ensureView();
      App.layout();
      renderAll();
      pump();
    } else {
      var S = ECE.Screens;
      try { if (S && typeof S[name] === 'function') S[name](App.el.screens[name], screenCtx()); }
      catch (e) { App.report(e, 'screen ' + name); }
      try { window.scrollTo(0, 0); } catch (e2) { }
    }
    App.applySettings();
    if (ECE.Mobile && ECE.Mobile.refresh) { try { ECE.Mobile.refresh(); } catch (e3) { App.report(e3, 'mobile'); } }
    renderBanner();
    var focusEl = App.el.screens[name].querySelector('[data-autofocus]') || App.el.screens[name].querySelector('h1, h2');
    if (focusEl && name !== 'game') { if (!focusEl.hasAttribute('tabindex') && !/BUTTON|INPUT/.test(focusEl.tagName)) focusEl.setAttribute('tabindex', '-1'); Dom.focus(focusEl); }
  };
  var SAVE_MESSAGES = ['savefail', 'takeover'];
  function closeScreenDialogs() {
    var D = ECE.Dialogs;
    var ids = typeof D.list === 'function' ? D.list() : [];
    var keep = ids.filter(function (id) { return SAVE_MESSAGES.indexOf(id) >= 0; });
    if (!keep.length) { D.closeAll(); return; }
    for (var i = ids.length - 1; i >= 0; i--) if (keep.indexOf(ids[i]) < 0) D.close(ids[i], 'all');
  }
  function fitHome() {
    var S = ECE.Screens;
    if (App.screen !== 'home' || !S || typeof S.fitHome !== 'function' || !App.el) return;
    if (S.fitHome(App.el.screens.home) === false) App.go('home');
  }
  App.back = function () { App.go(App.backTo === 'game' && App.game && App.game.phase !== 'over' ? 'game' : 'home'); };
  App.home = function () { App.saveNow(); App.go('home'); };

  function humanOf(st) {
    var ps = (st && st.players) || [];
    for (var i = 0; i < ps.length; i++) if (ps[i].kind === 'human') return ps[i].id;
    return ps.length ? ps[0].id : 0;
  }

  function screenCtx() {
    var G = App.game && App.game.phase !== 'over' ? App.game : null;
    return {
      save: App.save, game: G, you: G ? App.you : null, readOnly: App.readOnly, notice: App.notice, fromGame: !!G && App.backTo === 'game',
      version: App.version, build: ECE.BUILD || '', updateReady: App.updateReady,
      go: App.go, back: App.back,
      continueGame: function () { if (App.game) App.go('game'); },
      startGame: function (setup) { App.newGame(setup, {}); },
      settingsChanged: App.settingsChanged,
      keepTip: keepTipInfo(),
      dismissKeepTip: function () { App.save.keepTipShown = true; App.saveSoon(); },
      dismissNotice: function () { App.notice = null; },
      applyUpdate: App.applyUpdate,
      importSave: App.importSave,
      exportSave: function () { try { return ECE.Save.exportCode(App.save); } catch (e) { App.report(e, 'export'); return ''; } },
      saveStatus: saveStatusLine(),
      showTipsAgain: function () { App.save.tips = {}; App.saveSoon(); }
    };
  }

  function keepTipInfo() {
    if (!App.save || App.save.keepTipShown) return null;
    var P = ECE.Pwa;
    try { var ss = ECE.Save && typeof ECE.Save.status === 'function' ? ECE.Save.status() : null; if (ss && ss.storage === 'memory') return null; } catch (e0) { }
    try {
      if (P && typeof P.isStandalone === 'function' && P.isStandalone()) return null;
      if (P && typeof P.keepTip === 'function') return P.keepTip();
    } catch (e) { App.report(e, 'pwa.keepTip'); }
    return null;
  }

  function limitOf(id) {
    var list = (ECE.Glossary && ECE.Glossary.limits) || [];
    for (var i = 0; i < list.length; i++) if (list[i].id === id) return { kind: list[i].kind, value: list[i].value };
    return { kind: 'none', value: 0 };
  }
  function playersFor(setup) {
    var G = ECE.Glossary;
    var name = ECE.Save && typeof ECE.Save.cleanName === 'function' ? ECE.Save.cleanName(String(setup.name || ''), 'You') :
      String(setup.name || 'You').replace(/[\u0000-\u001f\u007f]/g, '').trim().slice(0, 20) || 'You';
    var tokens = G.tokens.map(function (t) { return t.id; });
    var mine = tokens.indexOf(setup.token) >= 0 ? setup.token : tokens[0];
    var n = Math.max(1, Math.min(5, setup.opponents | 0 || 3));
    var cpus = G.computers.slice(0, n);
    var used = [mine];
    cpus.forEach(function (c) { if (c.token !== mine && used.indexOf(c.token) < 0) used.push(c.token); });
    var persona = G.computers.map(function (c) { return c.token; });
    var SPARE = ['bicycle', 'seaplane', 'orca'];
    var order = SPARE.filter(function (t) { return tokens.indexOf(t) >= 0; }).concat(tokens.filter(function (t) { return SPARE.indexOf(t) < 0; }));
    function freeToken() {
      for (var pass = 0; pass < 2; pass++) {
        for (var k = 0; k < order.length; k++) {
          if (used.indexOf(order[k]) >= 0) continue;
          if (pass === 0 && persona.indexOf(order[k]) >= 0) continue;
          return order[k];
        }
      }
      return null;
    }
    var list = [{ name: name, token: mine, kind: 'human', level: setup.level || 'normal', persona: null }];
    cpus.forEach(function (c) {
      var tok = c.token;
      if (tok === mine || tokens.indexOf(tok) < 0) { tok = freeToken() || tok; used.push(tok); }
      list.push({ name: c.name, token: tok, kind: 'cpu', level: setup.level || 'normal', persona: c.persona });
    });
    return list;
  }
  function newSeed() {
    if (App.query.seed !== undefined && App.query.seed !== '' && isFinite(+App.query.seed)) return (+App.query.seed) >>> 0;
    if (App.test) return 1;
    try { var a = new Uint32Array(1); window.crypto.getRandomValues(a); return a[0] >>> 0 || 1; } catch (e) { return ((Math.random() * 4294967295) >>> 0) || 1; }
  }

  App.newGame = function (setup, opts) {
    opts = opts || {};
    var R = ECE.Rules;
    if (!R || typeof R.newGame !== 'function') { App.report(new Error('the rules are missing'), 'newGame'); return null; }
    setup = Object.assign({}, App.save.setup, setup || {});
    App.save.setup = {
      name: String(setup.name || 'You').slice(0, 20), token: setup.token, opponents: setup.opponents | 0 || 3,
      level: setup.level || 'normal', limit: setup.limit || 'none', auctions: setup.auctions !== false, rainFund: !!setup.rainFund
    };
    var seed = opts.seed !== undefined && opts.seed !== null ? (opts.seed >>> 0) : newSeed();
    var st;
    try {
      st = R.newGame({ seed: seed, players: playersFor(App.save.setup), rules: { auctions: App.save.setup.auctions, rainFund: App.save.setup.rainFund, limit: limitOf(App.save.setup.limit) }, now: Date.now() });
    } catch (e) { App.report(e, 'rules.newGame'); return null; }
    if (!st) return null;
    stopTimers();
    ECE.Dialogs.closeAll();
    hideNote();
    clearPick();
    App.waitedKey = null;
    App.game = st;
    App.you = humanOf(st);
    App.overShown = null;
    App.cardPending = false;
    App.lastAuctionEnd = null;
    App.turnActions = 0;
    App.saveSoon();
    App.go('game');
    if (!opts.noIntro && !App.test) {
      App.intro = true;
      ECE.Dialogs.turnOrder(App.gameCtx()).then(function () { App.intro = false; pump(); });
    }
    return st;
  };

  App.startFromSetup = function (setup) {
    var G = App.game && App.game.phase !== 'over';
    if (!G) { App.newGame(setup, {}); return Promise.resolve(true); }
    return ECE.Dialogs.confirm({ title: 'Start a new game?', text: 'Your current game ends.', yes: 'Start new game', no: 'Keep playing' }).then(function (yes) {
      if (yes) App.newGame(setup, {});
      return yes;
    });
  };

  App.gameCtx = function (demo) {
    var st = demo || App.game;
    var you = demo ? humanOf(demo) : App.you;
    var ctx = {
      state: st, you: you, demo: !!demo, view: App.view,
      act: demo ? function (a) { return demoAct(st, a); } : humanAct,
      legal: function () {
        var R = ECE.Rules;
        try { return R.actor(st) === you ? (R.legal(st) || []) : []; } catch (e) { App.report(e, 'rules.legal'); return []; }
      },
      propose: demo ? function (o) { return demoPropose(st, o); } : propose,
      openManage: function () { ECE.Dialogs.manage(App.gameCtx(demo)); },
      newGame: function () { App.go('setup'); },
      home: function () { App.home(); },
      go: function (n) { App.go(n); },
      openLog: function () { openLog(); },
      lastAuctionEnd: function () { return App.lastAuctionEnd; },
      onAuctionClosed: function () { pump(); },
      speed: function (v) {
        if (v && THINK[v] !== undefined) { App.save.settings.speed = v; if (App.testSpeed) App.testSpeed = v; App.settingsChanged(); }
        return (App.save && App.save.settings.speed) || 'normal';
      }
    };
    return ctx;
  };

  function demoAct(st, a) {
    var r;
    try { r = ECE.Rules.act(st, withP(a, humanOf(st))); } catch (e) { r = { ok: false, error: String(e) }; }
    ECE.Dialogs.refresh();
    return Promise.resolve(r || { ok: false });
  }
  function demoPropose(st, o) {
    var R = ECE.Rules, A = ECE.AI;
    var chk = R.checkOffer(st, o);
    if (!chk || !chk.ok) return Promise.resolve({ ok: false, error: chk && chk.error });
    var ans = { accept: false, reason: '' };
    try { if (A && A.answer) ans = A.answer(st, o.to, o) || ans; } catch (e) { App.report(e, 'ai.answer'); }
    return Promise.resolve({ ok: true, accept: !!ans.accept, reason: ans.reason });
  }

  function safeAct(st, action) {
    if (!action) return { ok: false, error: 'no action' };
    try {
      var r = ECE.Rules.act(st, action);
      return r || { ok: false, error: 'no result' };
    } catch (e) { App.report(e, 'rules.act ' + (action && action.t)); return { ok: false, error: 'internal' }; }
  }

  function evType(ev) { return ev ? (ev.t || ev.type || ev.kind || '') : ''; }
  function withP(a, p) {
    if (!a || a.t === 'tick' || (a.p !== undefined && a.p !== null)) return a;
    var b = {};
    for (var k in a) if (Object.prototype.hasOwnProperty.call(a, k)) b[k] = a[k];
    b.p = p;
    return b;
  }
  App.withP = withP;
  App.evType = evType;

  function noteEvents(st, evs, quiet) {
    for (var i = 0; i < (evs || []).length; i++) {
      var ev = evs[i], t = evType(ev);
      if (t === 'card') App.cardPending = true;
      else if (t === 'auctionEnd') App.lastAuctionEnd = { space: ev.space, winner: ev.winner === undefined ? null : ev.winner, amount: ev.amount | 0 };
      else if (t === 'turn') {
        App.turnActions = 0;
        App.turnsSeen = (App.turnsSeen || 0) + 1;
        if (!quiet && closeUpOn()) viewCall('follow', [ev.p]);
      } else if (t === 'limit' && !quiet && !App.auto) App.limitNotice = true;
    }
    if (st.phase === 'over') onGameOver(st);
  }

  function playEvents(evs, speed) {
    if (!evs || !evs.length) { renderAll(); return Promise.resolve(); }
    if (ECE.Sound && speed !== 'instant' && !App.auto) { try { ECE.Sound.events(evs, speed, App.you); } catch (e) { App.report(e, 'sound'); } }
    var p = null;
    if (App.view && typeof App.view.play === 'function' && App.screen === 'game') {
      try { p = App.view.play(evs, { speed: speed, you: App.you, reduceMotion: reduceMotion() }); } catch (e) { App.report(e, 'view.play'); p = null; }
    }
    if (!p || typeof p.then !== 'function') { renderAll(); return Promise.resolve(); }
    var done = false;
    return new Promise(function (resolve) {
      var t = setTimeout(function () { if (!done) { done = true; renderAll(); resolve(); } }, PLAY_TIMEOUT_MS);
      p.then(function () { if (!done) { done = true; clearTimeout(t); renderAll(); resolve(); } },
        function (e) { App.report(e, 'view.play'); if (!done) { done = true; clearTimeout(t); renderAll(); resolve(); } });
    });
  }

  function commit(st, res, speed) {
    App.turnActions = (App.turnActions || 0) + 1;
    noteEvents(st, res.events);
    App.saveSoon();
    ECE.Dialogs.refresh();
    renderPanel();
    return playEvents(res.events || [], speed).then(function () { return res; });
  }
  function perform(action, speed) {
    var st = App.game;
    var res = safeAct(st, action);
    if (!res.ok) return Promise.resolve(res);
    return commit(st, res, speed);
  }

  function humanAct(action) {
    var st = App.game;
    if (!st) return Promise.resolve({ ok: false, error: 'no game' });
    if (App.busy) return Promise.resolve({ ok: false, error: 'busy' });
    if (ECE.Rules.actor(st) !== App.you) return Promise.resolve({ ok: false, error: 'not your turn' });
    if (ECE.Sound) ECE.Sound.unlock();
    if (App.noteDemo) hideNote();
    if (App.noteKind === 'waited' && action && ROLLS[action.t]) hideNote('waited', true);
    App.busy = true;
    var gen = App.gen;
    renderPanel();
    return perform(withP(action, App.you), humanSpeed()).then(function (res) {
      if (gen !== App.gen) return res;
      App.busy = false;
      if (!res.ok && res.error && res.error !== 'busy') toast(niceError(res.error));
      after();
      return res;
    }, function (e) { if (gen === App.gen) { App.busy = false; after(); } App.report(e, 'humanAct'); return { ok: false, error: 'internal' }; });
  }
  App.act = humanAct;

  function niceError(e) {
    var s = String(e || '');
    return s ? s.charAt(0).toUpperCase() + s.slice(1) + (/[.!?]$/.test(s) ? '' : '.') : 'Not possible right now.';
  }

  function after() {
    renderAll();
    ECE.Dialogs.refresh();
    pump();
  }

  function propose(offer) {
    var st = App.game, R = ECE.Rules, A = ECE.AI;
    if (!st) return Promise.resolve({ ok: false, error: 'no game' });
    if (App.busy) return Promise.resolve({ ok: false, error: 'Wait a moment.' });
    var chk = R.checkOffer(st, offer) || { ok: false };
    if (!chk.ok) return Promise.resolve({ ok: false, error: chk.error });
    App.busy = true;
    var r1 = safeAct(st, { t: 'offer', p: App.you, offer: offer });
    if (!r1.ok) { App.busy = false; return Promise.resolve(r1); }
    noteEvents(st, r1.events);
    var to = offer.to;
    var ans = { accept: false, reason: '' };
    var answered = false;
    if (R.actor(st) === to) {
      try { if (A && typeof A.answer === 'function') { ans = A.answer(st, to, (st.pending && st.pending.offer) || offer) || ans; answered = true; } } catch (e) { App.report(e, 'ai.answer'); }
      if (!answered) { var d = decideFor(st, to); ans.accept = !!d && evType(d) === 'accept'; }
      var r2 = safeAct(st, { t: ans.accept ? 'accept' : 'reject', p: to, reason: ans.reason || undefined });
      if (!r2.ok) { ans.accept = !ans.accept; ans.reason = ''; r2 = safeAct(st, { t: ans.accept ? 'accept' : 'reject', p: to }); }
      if (r2.ok) { noteEvents(st, r2.events); r1.events = (r1.events || []).concat(r2.events || []); }
      else { App.busy = false; App.report(new Error('the trade could not be answered: ' + r2.error), 'propose'); after(); return Promise.resolve({ ok: false, error: r2.error }); }
    }
    App.saveSoon();
    var gen = App.gen;
    return playEvents(r1.events || [], humanSpeed()).then(function () {
      if (gen === App.gen) { App.busy = false; after(); }
      return { ok: true, accept: !!ans.accept, reason: ans.reason || (ans.accept ? 'Deal!' : 'No thanks.'), more: ans.more, short: !!ans.short, pay: ans.pay };
    });
  }

  function decideFor(st, p) {
    var A = ECE.AI;
    var a = null;
    if (A && typeof A.decide === 'function') {
      try { a = A.decide(st, p); } catch (e) { App.report(e, 'ai.decide'); a = null; }
    }
    return withP(a, p) || fallbackAction(st);
  }
  function fallbackAction(st) {
    var legal = [];
    try { legal = ECE.Rules.legal(st) || []; } catch (e) { App.report(e, 'rules.legal'); }
    var order = ['ack', 'roll', 'endTurn', 'pay', 'pass', 'decline', 'reject', 'payFee', 'sell', 'mortgage', 'bankrupt', 'accept', 'buy'];
    for (var i = 0; i < order.length; i++) for (var k = 0; k < legal.length; k++) if (legal[k] && legal[k].t === order[i]) return legal[k];
    return legal[0] || null;
  }
  function rescue(st) {
    var tried = [];
    var fb = fallbackAction(st);
    var list = [];
    try { list = ECE.Rules.legal(st) || []; } catch (e) { list = []; }
    if (fb) list.unshift(fb);
    for (var i = 0; i < list.length; i++) {
      var k = JSON.stringify(list[i]);
      if (tried.indexOf(k) >= 0) continue;
      tried.push(k);
      var r = safeAct(st, list[i]);
      if (r.ok) return r;
    }
    return { ok: false, error: 'no legal action' };
  }

  function forwardAction(st) {
    var legal = [];
    try { legal = ECE.Rules.legal(st) || []; } catch (e) { return null; }
    for (var i = 0; i < legal.length; i++) if (legal[i] && !MANAGE[legal[i].t]) return legal[i];
    return null;
  }

  function cpuPaused() {
    if (typeof document !== 'undefined' && document.hidden && !App.test) return true;
    if (App.intro) return true;
    if (App.landscape || App.takenOver) return true;
    if (ECE.Dialogs.blocking()) return true;
    if (App.screen !== 'game') return true;
    return false;
  }

  function stopTimers() {
    if (App.timer) { clearTimeout(App.timer); App.timer = null; }
    App.busy = false;
    App.gen++;
  }

  var pumpQueued = false;
  function pump() {
    if (pumpQueued) return;
    pumpQueued = true;
    setTimeout(function () { pumpQueued = false; try { step(); } catch (e) { App.report(e, 'step'); } }, 0);
  }
  App.pump = pump;

  function step() {
    var st = App.game;
    if (!st || App.screen !== 'game' || App.busy || App.auto) return;
    renderPanel();
    renderTop();
    if (st.phase === 'over') { onGameOver(st); if (App.overShown !== st && !ECE.Dialogs.isOpen()) { App.overShown = st; ECE.Dialogs.over(App.gameCtx()); } return; }
    if (App.limitNotice && !ECE.Dialogs.isOpen()) {
      App.limitNotice = false;
      var lim = (st.rules && st.rules.limit) || {};
      ECE.Dialogs.message({ id: 'limit', title: lim.kind === 'minutes' ? 'Time’s up!' : 'Last round!', lines: ['This round finishes so everyone has the same number of turns. Then the richest player wins.'], ok: 'OK' }).then(pump);
      return;
    }
    var a = null;
    try { a = ECE.Rules.actor(st); } catch (e) { App.report(e, 'rules.actor'); return; }
    if (a === null || a === undefined) return;
    if (a === App.you) { promptHuman(st); return; }
    if (cpuPaused()) return;
    var speed = cpuSpeed();
    if (st.phase === 'card' && App.cardPending && speed !== 'instant') {
      App.cardPending = false;
      var pc = st.pending || {};
      showCardNote(a, pc.deck, pc.id);
      runCpu(st, a, speed, CARD_MS[speed]);
      return;
    }
    if (st.phase === 'auction' && humanInAuction(st) && !ECE.Dialogs.isOpen('auction') && canBidAtAll(st)) {
      if (showTip('auction')) return;
      var tp = st.players && st.players[st.turn];
      ECE.Dialogs.auction(App.gameCtx(), { cpu: !tp || tp.id !== App.you });
    }
    runCpu(st, a, speed);
  }

  function humanInAuction(st) {
    var pend = st.pending || {};
    return st.phase === 'auction' && (pend.order || []).indexOf(App.you) >= 0;
  }
  function canBidAtAll(st) {
    var me = Dom.player(st, App.you);
    var mb = 0;
    try { mb = ECE.Rules.minBid ? ECE.Rules.minBid(st) : (ECE.BoardData.RULES.auctionOpen || 10); } catch (e) { mb = 0; }
    return !!me && me.cash >= mb;
  }
  function onlyPass(st) {
    if (st.phase !== 'auction') return false;
    var list = [];
    try { list = ECE.Rules.actor(st) === App.you ? ECE.Rules.legal(st) || [] : []; } catch (e) { list = []; }
    return list.length > 0 && list.every(function (x) { return x.t === 'pass'; });
  }

  function thinkMs(st, a, speed) {
    var base = THINK[speed] || 0;
    if (!base) return 0;
    if (st.phase === 'auction') return humanInAuction(st) ? Math.round(base * 0.7) : 0;
    if (st.phase === 'trade') return Math.round(base * 0.8);
    if (App.lastCpuManage) return MANAGE_MS[speed] || 0;
    if (st.phase === 'end') return END_MS[speed] || 0;
    if (st.rolled) return AFTER[speed] || 0;
    return base;
  }

  var instantRun = 0;
  function runCpu(st, a, speed, forceMs) {
    App.busy = true;
    var gen = App.gen;
    var ms = forceMs !== undefined ? forceMs : thinkMs(st, a, speed);
    if (speed === 'instant') { instantRun++; if (instantRun % 6 === 0) ms = 16; } else instantRun = 0;
    App.timer = setTimeout(function () {
      App.timer = null;
      if (gen !== App.gen) return;
      try {
        if (App.game !== st || cpuPaused() || ECE.Rules.actor(st) !== a || st.phase === 'over') { App.busy = false; pump(); return; }
        var action = decideFor(st, a);
        if ((App.turnActions || 0) > TURN_ACTION_CAP && action && MANAGE[action.t]) action = forwardAction(st) || action;
        App.lastCpuManage = !!(action && MANAGE[action.t]);
        var res = safeAct(st, action);
        if (st.phase !== 'card') hideNote('card');
        if (!res.ok) {
          var why = 'computer action refused (' + (action && action.t) + ': ' + res.error + ')';
          res = rescue(st);
          App.report(new Error(why + (res.ok ? '; played a safe legal action instead' : '; no legal action worked in ' + st.phase)), 'ai');
          if (!res.ok) { App.busy = false; return; }
        }
        commit(st, res, speed).then(function () { if (gen === App.gen) { App.busy = false; pump(); } }, function (e) { if (gen === App.gen) { App.busy = false; pump(); } App.report(e, 'cpu'); });
      } catch (e) { App.busy = false; App.report(e, 'cpu turn'); }
    }, ms);
  }

  var TIP_TEXT = {
    welcome: { title: 'Your turn', lines: ['Tap ROLL to roll the dice. Tap any space on the board to see its card.'],
      desk: ['Click ROLL or press Space to roll. Click any space on the board to see its card.'] },
    buy: { title: 'Buying streets', lines: ['Anyone who lands on your street pays you rent. Own all three streets of a district to double its rent and build homes.'] },
    finish: { title: 'Finish a district', lines: [] },
    auction: { title: 'Auctions', lines: ['Everyone can bid: +$10, +$50 or +$100 over the current bid. Pass to drop out; the last bidder buys it.'] },
    traffic: { title: 'Stuck in Traffic', lines: [] },
    debt: { title: 'Short on cash', lines: ['Open Manage to sell homes (half price back) or mortgage spaces, then pay.'] },
    district: { title: 'A whole district!', lines: [] },
    offer: { title: 'A trade offer', lines: ['Computer players sometimes offer trades. Check what you give and get, then Accept or Reject.'] }
  };
  function tipsOn() { return !!(App.save && App.save.settings.tips) && !App.test && !App.auto; }
  function onPhone() { return document.documentElement.classList.contains('phone'); }
  function tapWord(cap) { var w = onPhone() ? 'tap' : 'click'; return cap ? w.charAt(0).toUpperCase() + w.slice(1) : w; }
  function showTip(id, extra) {
    if (!tipsOn() || App.save.tips[id]) return false;
    var t = TIP_TEXT[id];
    if (!t) return false;
    App.save.tips[id] = true;
    App.saveSoon();
    var lines = (!onPhone() && t.desk ? t.desk : t.lines).slice();
    if (extra) lines = lines.concat(extra);
    ECE.Dialogs.tip({ title: t.title, lines: lines }).then(pump);
    return true;
  }
  App.tipText = function (id) { var t = TIP_TEXT[id]; return t ? (!onPhone() && t.desk ? t.desk : t.lines).slice() : []; };
  function finishable(st, you) {
    var Ds = ECE.BoardData.DISTRICTS;
    for (var i = 0; i < Ds.length; i++) {
      var mine = 0, other = null, built = false;
      for (var k = 0; k < Ds[i].spaces.length; k++) {
        var j = Ds[i].spaces[k], pp = st.props && (st.props[j] || st.props[String(j)]);
        if (pp && (pp.level | 0) > 0) built = true;
        if (pp && pp.owner === you) mine++;
        else if (pp && pp.owner !== null && pp.owner !== undefined) other = { space: j, owner: pp.owner };
      }
      if (built || mine !== 2 || !other) continue;
      var op = Dom.player(st, other.owner);
      if (!op || op.out || op.kind === 'human') continue;
      return { d: Ds[i], space: other.space, owner: other.owner };
    }
    return null;
  }
  App.finishable = finishable;
  function finishTip(st) {
    if (!tipsOn() || App.save.tips.finish) return false;
    var f = finishable(st, App.you);
    if (!f) return false;
    var op = Dom.player(st, f.owner);
    return showTip('finish', ['You own 2 of 3 ' + f.d.name + ' streets; ' + op.name + ' has ' + Dom.spaceName(f.space) + '. ' + tapWord(true) + ' Trade: they say what they’d want.']);
  }
  function districtTip(st) {
    if (!tipsOn() || App.save.tips.district) return false;
    var R = ECE.Rules;
    var Ds = ECE.BoardData.DISTRICTS;
    for (var i = 0; i < Ds.length; i++) {
      var own = false;
      try { own = R.ownsDistrict(st, App.you, Ds[i].id); } catch (e) { own = false; }
      if (own) return showTip('district', ['You own all of ' + Ds[i].name + '. Its rent doubles. Open Manage to build homes for ' + Dom.money(Ds[i].build) + ' each; 3 homes is the big jump in rent.']);
    }
    return false;
  }

  function promptHuman(st) {
    var D = ECE.Dialogs;
    var ctx = App.gameCtx();
    var pend = st.pending || {};
    var me = Dom.player(st, App.you) || {};
    if (st.phase === 'auction' && !D.blocking() && onlyPass(st)) { humanAct({ t: 'pass' }); return; }
    if (D.isOpen()) return;
    var fee = Dom.money(ECE.BoardData.RULES.trafficFee);
    if (st.phase === 'roll' && !st.rolled && showTip('welcome')) return;
    if (st.phase === 'roll' && me.stuck && showTip('traffic', ['Before you roll: pay ' + fee + ', use a Carpool Pass, or roll for doubles. After the ' + Dom.ordinal(ECE.BoardData.RULES.trafficMaxTries) + ' miss you pay ' + fee + ' and move.', 'Early on, paying ' + fee + ' gets you back to buying streets.'])) return;
    if ((st.phase === 'roll' || st.phase === 'end') && districtTip(st)) return;
    if ((st.phase === 'roll' || st.phase === 'end') && finishTip(st)) return;
    if (st.phase === 'roll' && !st.rolled) showWaited(st);
    if (st.phase === 'buy' && showTip('buy', st.rules && st.rules.auctions === false ? null : ['Not buying? Everyone bids on it, you too.'])) return;
    if (st.phase === 'auction' && showTip('auction')) return;
    if (st.phase === 'debt' && showTip('debt')) return;
    if (st.phase === 'trade' && showTip('offer')) return;
    switch (st.phase) {
      case 'buy': if (!D.isOpen('buy')) D.buy(ctx); break;
      case 'auction': if (!D.isOpen('auction')) D.auction(ctx); break;
      case 'card':
        if (!D.isOpen('card')) { App.cardPending = false; viewCall('dropCards'); D.card(ctx, { p: App.you, deck: pend.deck, id: pend.id }); }
        break;
      case 'debt': if (!D.isOpen('debt')) D.debt(ctx); break;
      case 'trade': if (pend.offer && pend.offer.to === App.you && !D.isOpen('offer')) D.offer(ctx); break;
      default: break;
    }
  }

  function onPrimary(pr) {
    if (!App.game) return;
    if (ECE.Sound) ECE.Sound.unlock();
    pr = pr || (App.panel && App.panel.current) || {};
    if (pr.action) { humanAct(pr.action); return; }
    var D = ECE.Dialogs, ctx = App.gameCtx(), st = App.game;
    switch (pr.dialog) {
      case 'buy': D.buy(ctx); break;
      case 'auction': D.auction(ctx); break;
      case 'card': { var pc = st.pending || {}; D.card(ctx, { p: App.you, deck: pc.deck, id: pc.id }); break; }
      case 'debt': D.debt(ctx); break;
      case 'offer': D.offer(ctx); break;
      case 'over': D.over(ctx); break;
      default: break;
    }
  }
  function clearPick() { if (App.panel && App.panel.clearPick) App.panel.clearPick(); }
  function openManage() { if (App.game) { clearPick(); ECE.Dialogs.manage(App.gameCtx()); } }
  function openTrade() { if (App.game) { clearPick(); ECE.Dialogs.trade(App.gameCtx()); } }
  function openLog() { if (App.game) ECE.Panel.openLog(App.game, App.you); }
  function openMenu() {
    if (!App.game) { App.go('home'); return; }
    ECE.Dialogs.menu(App.gameCtx());
  }

  function onGameOver(st) {
    if (App.recordedFor === st || !App.save) return;
    App.recordedFor = st;
    var list = ECE.Dialogs.standingsOf(st);
    var mine = null;
    for (var i = 0; i < list.length; i++) if (list[i].id === App.you) mine = list[i];
    var winner = st.winner !== null && st.winner !== undefined ? st.winner : list.length ? list[0].id : null;
    var wp = Dom.player(st, winner);
    var S = App.save.stats;
    S.played = (S.played | 0) + 1;
    var won = winner === App.you;
    if (won) {
      S.won = (S.won | 0) + 1;
      if (!S.fastestWin || st.round < S.fastestWin) S.fastestWin = st.round | 0;
    }
    if (mine) {
      if (mine.net > (S.bestNet | 0)) S.bestNet = Math.round(mine.net);
      if (!S.bestRank || mine.rank < S.bestRank) S.bestRank = mine.rank;
    }
    var lim = (st.rules && st.rules.limit) || { kind: 'none' };
    App.save.history.push({ at: Date.now(), rounds: st.round | 0, rank: mine ? mine.rank : 0, of: list.length, net: mine ? Math.round(mine.net) : 0, winnerName: wp ? wp.name : '', limit: lim.kind === 'none' ? 'none' : lim.kind + ':' + lim.value });
    if (App.save.history.length > 20) App.save.history.splice(0, App.save.history.length - 20);
    App.save.game = null;
    App.saveNow();
    if (ECE.Sound && !App.auto) { try { ECE.Sound.play(won ? 'win' : 'out'); } catch (e) { } }
  }

  function noteEl() { return App.el && App.el.note; }
  var noteSeq = 0;
  function hideNote(kind, fade) {
    var n = noteEl();
    if (!n || n.hidden || (kind && App.noteKind !== kind)) return;
    App.noteKind = null;
    App.noteDemo = false;
    viewCall('setNote', [false]);
    viewCall('setTitle', [true]);
    var seq = ++noteSeq;
    var done = function () { if (seq !== noteSeq) return; n.hidden = true; Dom.clear(n); n.classList.remove('ui-note-out'); };
    if (fade && !reduceMotion()) { n.classList.add('ui-note-out'); setTimeout(done, NOTE_FADE_MS); return; }
    done();
  }
  App.hideNote = hideNote;
  function showNote(kind, build, demo) {
    var n = noteEl();
    if (!n || App.screen !== 'game') return;
    noteSeq++;
    App.noteDemo = !!demo;
    Dom.clear(n);
    n.className = 'ui-board-note ui-note-' + kind;
    try { build(n); } catch (e) { App.report(e, 'note ' + kind); }
    n.hidden = false;
    App.noteKind = kind;
    viewCall('setNote', [true]);
    placeNote();
  }
  function placeNote() {
    var n = noteEl();
    if (!n || n.hidden || !App.el.boardHost) return;
    var host = App.el.boardHost, wrap = App.el.wrap;
    var hr = host.getBoundingClientRect(), wr = wrap.getBoundingClientRect();
    if (!(hr.width > 40)) return;
    var cr = null;
    try { cr = ECE.BoardView.geometry(hr.width, hr.height).center; } catch (e) { cr = null; }
    if (!cr) cr = { x: hr.width * 0.206, y: hr.width * 0.206, w: hr.width * 0.588, h: hr.height * 0.706 };
    var x0 = hr.left - wr.left + cr.x, y0 = hr.top - wr.top + cr.y, w = cr.w, hh = cr.h;
    var close = closeUpOn(), atBottom = false, strip = close && App.noteKind === 'waited';
    if (close) {
      var tp = viewCall('focusScreen');
      var seen = Math.max(80, hr.height - (App.sheetPx || 0));
      atBottom = !!tp && tp.y < hr.top + seen / 2;
      x0 = hr.left - wr.left + hr.width * 0.05; w = hr.width * 0.9; hh = seen * 0.4;
      y0 = atBottom ? hr.top - wr.top + seen - hh : hr.top - wr.top;
    }
    Dom.toggle(n, 'ui-note-strip', strip);
    var ca = App.el.center;
    if (ca && !ca.hidden && !close) {
      var car = ca.getBoundingClientRect();
      var caTop = car.top - wr.top, caBottom = car.bottom - wr.top;
      if (caTop > y0 + 60) hh = Math.min(hh, caTop - y0 - 6);
      else if (caBottom < y0 + hh - 60) { hh = y0 + hh - caBottom - 6; y0 = caBottom + 6; }
    }
    var inset = 6;
    var nw = Math.min(w - inset * 2, strip ? 440 : 330);
    n.style.width = Math.floor(nw) + 'px';
    n.style.left = Math.floor(x0 + (w - nw) / 2) + 'px';
    n.style.maxHeight = Math.floor(Math.max(strip ? 44 : 60, hh - inset * 2)) + 'px';
    fitNoteTitle(n);
    if (!strip) fitNoteLines(n);
    fitNoteCard(n);
    var nh = n.offsetHeight || 0;
    var top;
    if (close) top = atBottom ? y0 + hh - inset - nh : y0 + inset;
    else if (App.centerMode) top = y0 + inset;
    else top = y0 + inset + Math.max(0, (hh - inset * 2 - nh) / 2);
    n.style.top = Math.floor(top) + 'px';
    var tEl = host.querySelector && host.querySelector('.ece-title');
    var covers = false;
    if (tEl && tEl.getBoundingClientRect) {
      var tr = tEl.getBoundingClientRect(), nr = n.getBoundingClientRect();
      covers = tr.width > 0 && nr.left < tr.right && nr.right > tr.left && nr.top < tr.bottom && nr.bottom > tr.top;
    }
    viewCall('setTitle', [!covers]);
  }
  App.placeNote = placeNote;
  function fitNoteTitle(n) {
    var t = n.querySelector('.ui-note-title');
    n.classList.remove('ui-note-snug');
    n.classList.remove('ui-note-wrap');
    n.classList.remove('ui-note-stack');
    if (!t || t.scrollWidth <= t.clientWidth) return;
    n.classList.add('ui-note-snug');
    if (t.scrollWidth <= t.clientWidth) return;
    n.classList.add('ui-note-wrap');
    var cut = function () { return t.scrollWidth > t.clientWidth || t.scrollHeight > t.clientHeight + 1; };
    if (!n.classList.contains('ui-note-strip') && n.querySelector('.ui-note-head .ui-note-log') && (cut() || textLines(t) > 2)) n.classList.add('ui-note-stack');
  }
  App.fitNoteTitle = fitNoteTitle;
  function textLines(el) {
    if (!el || typeof document === 'undefined' || typeof document.createRange !== 'function') return 1;
    var rg = document.createRange();
    rg.selectNodeContents(el);
    var rects = rg.getClientRects ? rg.getClientRects() : [], tops = [];
    for (var i = 0; i < rects.length; i++) {
      var r = rects[i], seen = false;
      if (!(r.width > 0)) continue;
      for (var j = 0; j < tops.length && !seen; j++) seen = Math.abs(tops[j] - r.top) < Math.max(2, r.height / 2);
      if (!seen) tops.push(r.top);
    }
    return Math.max(1, tops.length);
  }
  App.textLines = textLines;
  function fitNoteCard(n) {
    var tx = n.querySelector('.ui-note-card-text');
    if (!tx) return;
    var by = n.querySelector('.ui-note-by'), tl = n.querySelector('.ui-note-title');
    tx.style.fontSize = '';
    if (by) by.hidden = false;
    if (tl && tl.dataset.deck) Dom.text(tl, tl.dataset.deck);
    var over = function () { return n.scrollHeight > n.clientHeight + 1; };
    if (!over()) return;
    if (by) by.hidden = true;
    if (tl && tl.dataset.deck) { Dom.text(tl, tl.dataset.deck + ' · ' + tl.dataset.by); fitNoteTitle(n); }
    var sizes = [16, 14, 13];
    for (var k = 0; k < sizes.length && over(); k++) tx.style.fontSize = sizes[k] + 'px';
  }
  App.fitNoteCard = fitNoteCard;
  function fitNoteLines(n) {
    var list = n.querySelector('.ui-note-list');
    if (!list) return;
    var items = Array.prototype.slice.call(list.querySelectorAll('.ui-note-line:not(.ui-note-more)'));
    var more = list.querySelector('.ui-note-more');
    var base = more ? (+more.dataset.base || 0) : 0;
    if (more && !more.dataset.base) { base = +(/\d+/.exec(more.textContent) || [0])[0]; more.dataset.base = String(base); }
    items.forEach(function (li) { li.hidden = false; });
    var dropped = 0;
    var over = function () { return list.scrollHeight > list.clientHeight + 1 || n.scrollHeight > n.clientHeight + 1; };
    for (var k = items.length - 1; k > 0 && over(); k--) {
      items[k].hidden = true;
      dropped++;
      if (!more) { more = moreLine(''); more.dataset.base = '0'; list.appendChild(more); }
      setMore(more, '+' + (base + dropped) + ' more in the full log');
    }
    if (more) { more.hidden = base + dropped === 0; if (base + dropped > 0) setMore(more, '+' + (base + dropped) + ' more in the full log'); }
  }

  function deckIcon(deck, px) {
    var svg = Dom.s('svg', { viewBox: '0 0 24 24', width: px, height: px, cls: 'ui-deck-icon', focusable: 'false', 'aria-hidden': 'true' });
    if (ECE.Art && typeof ECE.Art.icon === 'function') { try { ECE.Art.icon(svg, deck === 'rain' ? 'rain' : 'buzz', 12, 12, 24); } catch (e) { App.report(e, 'art.icon'); } }
    return svg;
  }
  function showCardNote(p, deck, id, demo) {
    var C = ECE.CardData;
    var card = C ? C.card(deck, id) : null;
    var dk = C && C.DECKS ? C.DECKS[deck] : null;
    var pl = Dom.player(App.game, p);
    showNote('card', function (n) {
      n.classList.add('ui-deck-' + (deck === 'rain' ? 'rain' : 'buzz'));
      n.setAttribute('role', 'status');
      var tl = h('span', { cls: 'ui-note-title' }, dk ? dk.name : 'Card');
      tl.dataset.deck = dk ? dk.name : 'Card';
      tl.dataset.by = pl ? pl.name : 'Someone';
      n.appendChild(h('div', { cls: 'ui-note-head' }, [deckIcon(deck, 26), tl]));
      n.appendChild(h('p', { cls: 'ui-note-card-text' }, card ? card.text : ''));
      n.appendChild(h('p', { cls: 'ui-note-by' }, (pl ? pl.name : 'Someone') + ' drew this card.'));
    }, demo);
  }

  function waitedLines(st, you, max) {
    var log = (st && st.log) || [];
    var end = -1, i;
    for (i = log.length - 1; i >= 0; i--) if (log[i] && log[i].t === 'turn' && log[i].p === you) { end = i; break; }
    if (end < 0) return { lines: [], more: 0 };
    var prev = -1;
    for (i = end - 1; i >= 0; i--) if (log[i] && log[i].t === 'turn' && log[i].p === you) { prev = i; break; }
    var start = 0;
    var from = prev >= 0 ? prev + 1 : 0;
    if (prev >= 0 || log.length >= ((ECE.BoardData.RULES && ECE.BoardData.RULES.logMax) || 200)) {
      start = end;
      for (i = from; i < end; i++) if (log[i] && log[i].t === 'turn' && log[i].p !== you) { start = i; break; }
    }
    var R = ECE.Rules, out = [], groups = {};
    var top = (ECE.BoardData.RULES && ECE.BoardData.RULES.maxLevel) || 5;
    var involves = function (ev) { return ev.p === you || ev.owner === you || ev.to === you || ev.winner === you || (ev.offer && (ev.offer.from === you || ev.offer.to === you)); };
    for (i = start; i < end; i++) {
      var ev = log[i];
      if (!ev) continue;
      var t = ev.t, keep = false, prio = 0;
      if (t === 'rent' || t === 'cash') { keep = ev.p === you || ev.owner === you || ev.to === you; prio = 3; }
      else if (t === 'bankrupt') { keep = true; prio = 3; }
      else if (t === 'trade') { keep = true; prio = involves(ev) ? 3 : 2; }
      else if (t === 'buy') { keep = true; prio = 1; }
      else if (t === 'auctionEnd') { keep = ev.winner !== null && ev.winner !== undefined; prio = involves(ev) ? 3 : 1; }
      else if (t === 'fund') { keep = true; prio = ev.p === you ? 3 : 1; }
      else if (t === 'build' || t === 'sell') {
        var d = ECE.BoardData.districtOf(ev.space);
        var gk = t + ':' + ev.p + ':' + (d ? d.id : ev.space);
        var gr = groups[gk];
        if (!gr) { gr = groups[gk] = { t: t, p: ev.p, d: d, homes: 0, towers: 0, streets: {}, at: out.length, prio: 2 }; out.push({ group: gr, prio: 2 }); }
        if (t === 'build') {
          var lv = ev.level | 0, rec = gr.streets[ev.space];
          if (!rec) gr.streets[ev.space] = { from: lv - 1, to: lv };
          else rec.to = lv;
        }
        else if ((ev.level | 0) === top - 1 && (ev.count | 0) <= 1) gr.towers++;
        else gr.homes += Math.max(1, ev.count | 0);
        continue;
      }
      if (keep) out.push({ ev: ev, prio: prio });
    }
    var lines = out.map(function (o, k) {
      var text = '', p = null;
      if (o.group) {
        var g = o.group, who = Dom.player(st, g.p);
        p = who;
        var name = g.p === you ? 'You' : (who ? who.name : 'Someone');
        if (g.t === 'build') {
          g.homes = 0; g.towers = 0;
          Object.keys(g.streets).forEach(function (j) {
            var r = g.streets[j];
            if (r.to >= top) { if (r.from < top) g.towers++; }
            else g.homes += Math.max(0, r.to - r.from);
          });
        }
        var parts = [];
        if (g.homes) parts.push(g.homes === 1 ? 'a home' : g.homes + ' homes');
        if (g.towers) parts.push(g.towers === 1 ? 'a tower' : g.towers + ' towers');
        if (!parts.length) return null;
        text = name + (g.t === 'build' ? ' built ' : ' sold ') + parts.join(' and ') + (g.d ? ' in ' + g.d.name : '') + '.';
      } else {
        try { text = R.text(st, o.ev, you) || ''; } catch (e) { text = ''; }
        p = ECE.Panel && ECE.Panel.linePlayer ? ECE.Panel.linePlayer(st, o.ev, text, you) : (o.ev.p !== undefined ? Dom.player(st, o.ev.p) : null);
      }
      return text ? { text: text, color: p ? p.color : null, you: !!(o.ev ? involves(o.ev) : o.group.p === you), prio: o.prio, k: k } : null;
    }).filter(Boolean);
    var more = 0;
    if (max && lines.length > max) {
      var keepSet = lines.slice().sort(function (a, b) { return b.prio - a.prio || b.k - a.k; }).slice(0, max - 1);
      more = lines.length - keepSet.length;
      lines = lines.filter(function (l) { return keepSet.indexOf(l) >= 0; });
    }
    return { lines: lines, more: more };
  }
  App.waitedLines = waitedLines;

  function showWaited(st, demoRes) {
    var key = (st.counters ? st.counters.turns : 0) + ':' + st.round + ':' + st.turn;
    if (App.waitedKey === key && !demoRes) return;
    App.waitedKey = key;
    var max = document.documentElement.classList.contains('phone') ? (App.centerMode ? 4 : 5) : 6;
    var res = demoRes || waitedLines(st, App.you, max);
    if (!res.lines.length) { hideNote('waited'); return; }
    showNote('waited', function (n) {
      n.setAttribute('role', 'status');
      n.setAttribute('aria-label', 'While you waited');
      var count = res.lines.length + (res.more | 0);
      n.appendChild(h('div', { cls: 'ui-note-head' }, [h('span', { cls: 'ui-note-title' }, ['While you waited', h('span', { cls: 'ui-note-count' }, ': ' + count + (count === 1 ? ' move' : ' moves'))]),
        Dom.btn('Full log', function () { openLog(); }, { small: true, ghost: true, cls: 'ui-note-log', aria: 'Open the full game log' })]));
      var ol = h('ol', { cls: 'ui-note-list' });
      res.lines.forEach(function (l) {
        var li = h('li', { cls: 'ui-note-line' + (l.you ? ' ui-note-you' : '') });
        li.appendChild(noteDot(l.color));
        li.appendChild(h('span', null, l.text));
        ol.appendChild(li);
      });
      if (res.more) ol.appendChild(moreLine('+' + res.more + ' more in the full log'));
      n.appendChild(ol);
    }, !!demoRes);
  }
  function noteDot(color) {
    if (ECE.Panel && ECE.Panel.dot) return ECE.Panel.dot(color);
    var dot = h('span', { cls: 'ui-log-dot' + (color ? '' : ' ui-log-dot-none'), 'aria-hidden': 'true' });
    if (color) dot.style.backgroundColor = color;
    return dot;
  }
  function moreLine(text) {
    return h('li', { cls: 'ui-note-line ui-note-more' }, [noteDot(null), h('span', { cls: 'ui-note-more-text' }, text)]);
  }
  function setMore(li, text) {
    var s = li.querySelector('.ui-note-more-text');
    Dom.text(s || li, text);
  }
  function settleNotes(st) {
    if (App.noteDemo) return;
    if (App.noteKind === 'waited') {
      var a = null;
      try { a = ECE.Rules.actor(st); } catch (e) { a = null; }
      if (!st || st.rolled || st.phase !== 'roll' || a !== App.you) hideNote('waited');
    }
    if (App.noteKind === 'card' && (!st || st.phase !== 'card')) hideNote('card');
  }

  function renderTop() {
    if (!App.el || !App.el.round) return;
    Dom.text(App.el.round, App.game ? ECE.Panel.roundText(App.game) : '');
    var on = closeUpOn();
    App.el.cam.setAttribute('aria-pressed', on ? 'true' : 'false');
    Dom.toggle(App.el.cam, 'ui-on', on);
    var want = on ? 'unzoom' : 'zoom';
    if (App.el.cam.dataset.icon !== want) { App.el.cam.dataset.icon = want; Dom.clear(App.el.cam).appendChild(Dom.icon(want)); }
  }
  function renderPanel() {
    if (!App.panel || !App.game) return;
    try {
      App.panel.render(App.game, { you: App.you, busy: App.busy && ECE.Rules.actor(App.game) === App.you, closeUp: closeUpOn(), centerHost: App.centerMode ? App.el.center : null, centerChips: !!(App.centerMode && App.centerChips), altsHost: !App.centerMode && App.altsCentre ? App.el.center : null });
    } catch (e) { App.report(e, 'panel'); }
  }
  function renderAll() {
    if (App.screen !== 'game') return;
    renderBoard();
    renderPanel();
    renderTop();
    if (App.game) settleNotes(App.game);
    var sig = layoutSig();
    if (sig !== App.layoutSig) { App.layoutSig = sig; App.layout(); }
  }
  function layoutSig() {
    var st = App.game;
    if (!st) return '';
    var n = st.players.filter(function (p) { return !p.out; }).length;
    var pr = App.panel && App.panel.current;
    return n + ':' + ((pr && pr.alts && pr.alts.length) || 0);
  }
  App.render = renderAll;

  function rotateIcon() {
    var svg = Dom.s('svg', { viewBox: '0 0 48 48', width: 64, height: 64, focusable: 'false', 'aria-hidden': 'true', cls: 'ui-rotate-icon' });
    svg.appendChild(Dom.s('rect', { x: 3, y: 27, width: 22, height: 13, rx: 2.6, fill: 'none', stroke: '#9FE0C2', 'stroke-width': 2, opacity: 0.6 }));
    svg.appendChild(Dom.s('rect', { x: 26, y: 8, width: 14, height: 25, rx: 3, fill: 'none', stroke: '#FFFFFF', 'stroke-width': 2.6 }));
    svg.appendChild(Dom.s('path', { d: 'M31 29h4', stroke: '#FFFFFF', 'stroke-width': 2.2, 'stroke-linecap': 'round' }));
    svg.appendChild(Dom.s('path', { d: 'M8 22a13 13 0 0 1 12-13M16.5 5.5l3.8 3.4-3.6 3.7', fill: 'none', stroke: '#9FE0C2', 'stroke-width': 2.4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }));
    return svg;
  }
  App.orient = function () {
    var M = ECE.Mobile;
    var land = false;
    try { land = !!(M && typeof M.landscape === 'function' && M.landscape()); } catch (e) { land = false; }
    if (land === !!App.landscape) return;
    App.landscape = land;
    var r = document.getElementById('rotate');
    if (r) r.hidden = !land;
    document.documentElement.classList.toggle('ui-landscape', land);
    if (!land) { App.layout(); pump(); }
  };

  App.layout = function () {
    if (!App.el || App.screen !== 'game' || App.landscape) return;
    var g = App.el.screens.game;
    var M = ECE.Mobile;
    var res = null;
    try {
      if (M && M.phone && typeof M.fitGame === 'function') res = M.fitGame(App.el, App.game);
      else res = desktopFit(g);
    } catch (e) { App.report(e, 'layout'); }
    var center = !!(res && res.center);
    App.centerMode = center;
    App.centerChips = !!(res && res.centerChips);
    App.altsCentre = !!(res && res.altsInCentre);
    App.fit = res || null;
    App.el.center.hidden = !(center || App.altsCentre);
    Dom.toggle(g, 'ui-center-mode', center);
    Dom.toggle(g, 'ui-alts-centre', App.altsCentre);
    renderPanel();
    if (App.panel && App.panel.fitChips) App.panel.fitChips();
    viewCall('resize');
    centreInset();
    placeNote();
    ECE.Dialogs.replace();
    sheetInset();
    bannerSpot(res);
  };
  function bannerSpot(res) {
    var root = document.documentElement, on = !!(res && res.stack) && !onPhone();
    root.classList.toggle('game-stacked', on);
    if (!on || !App.el.boardHost) return;
    var r = App.el.boardHost.getBoundingClientRect();
    root.style.setProperty('--ece-banner-top', Math.round(r.top + r.height * 0.15 + 6) + 'px');
    root.style.setProperty('--ece-banner-left', Math.round(r.left + r.width / 2) + 'px');
    root.style.setProperty('--ece-banner-max', Math.max(200, Math.round(r.width * 0.86)) + 'px');
  }
  function centreInset() {
    var u = null, ca = App.el.center;
    if (ca && !ca.hidden && !closeUpOn() && App.el.boardHost) {
      var hr = App.el.boardHost.getBoundingClientRect(), car = ca.getBoundingClientRect();
      var geo = null;
      try { geo = ECE.BoardView.geometry(hr.width, hr.height); } catch (e) { geo = null; }
      if (geo && geo.unit > 0 && car.height > 0) u = (car.top - hr.top - geo.board.y) / geo.unit;
    }
    viewCall('setCentreInset', [u]);
  }
  var SHEETS = { buy: 1, debt: 1, offer: 1, auction: 1 };
  function sheetInset() {
    if (!App.view || !App.el || !App.el.boardHost) return;
    var px = 0, top = ECE.Dialogs.top();
    if (App.screen === 'game' && onPhone() && top && SHEETS[top]) {
      var hd = ECE.Dialogs.get(top);
      if (hd && hd.box && hd.box.isConnected) {
        var hr = App.el.boardHost.getBoundingClientRect();
        var sheetTop = (window.innerHeight || 0) - (hd.box.offsetHeight || 0);
        px = Math.max(0, Math.round(hr.bottom - sheetTop));
      }
    }
    if (px !== (App.sheetPx || 0)) { App.sheetPx = px; viewCall('setBottomInset', [px]); placeNote(); }
  }
  App.sheetInset = sheetInset;

  function desktopFit(g) {
    var W = window.innerWidth || 1280, H = window.innerHeight || 800;
    var ins = ECE.Mobile && typeof ECE.Mobile.insets === 'function' ? ECE.Mobile.insets() : null;
    if (ins) { W = Math.max(200, W - (ins.left || 0) - (ins.right || 0)); H = Math.max(200, H - (ins.top || 0) - (ins.bottom || 0)); }
    var L = ECE.BoardData.LAYOUT, ratio = L.widthUnits / L.heightUnits;
    var m = 14, panelMin = 320, panelMax = 440;
    var host = App.el.boardHost;
    g.classList.remove('ui-layout-stack');
    g.classList.remove('ui-stack-compact');
    g.classList.add('ui-layout-side');
    var bh = H - m * 2, bw = bh * ratio;
    if (bw + panelMin + m * 3 > W) { bw = W - panelMin - m * 3; bh = bw / ratio; }
    var tryStack = false;
    if (W <= H) {
      if (bw < STACK_MIN_BOARD) tryStack = true;
      else {
        var sb = stackTrial(g, H, m, ratio, Math.min(W - m * 2, STACK_TALL_W));
        tryStack = sb >= bw * 1.1 || (sb >= bw && H - bh - m * 2 >= H * 0.25);
      }
    } else if (bw < 120) tryStack = true;
    if (tryStack) {
      g.classList.remove('ui-layout-side');
      g.classList.add('ui-layout-stack');
      App.el.panel.style.width = '';
      var maxW = Math.min(W - m * 2, W <= H ? STACK_TALL_W : 560);
      var full = stackBoard(g, false, H, m, ratio, maxW);
      bw = full >= maxW - 0.5 ? full : Math.max(stackBoard(g, true, H, m, ratio, maxW), Math.min(maxW, STACK_FLOOR));
      bh = bw / ratio;
      host.style.width = Math.floor(bw) + 'px';
      host.style.height = Math.floor(bh) + 'px';
      return { center: false, stack: true, compact: g.classList.contains('ui-stack-compact'), boardW: bw, boardH: bh };
    }
    var pw = Math.max(panelMin, Math.min(panelMax, W - bw - m * 3));
    host.style.width = Math.floor(bw) + 'px';
    host.style.height = Math.floor(bh) + 'px';
    App.el.panel.style.width = Math.floor(pw) + 'px';
    return { center: false };
  }
  function stackTrial(g, H, m, ratio, maxW) {
    g.classList.remove('ui-layout-side');
    g.classList.add('ui-layout-stack');
    var pw = App.el.panel.style.width;
    App.el.panel.style.width = '';
    var full = stackBoard(g, false, H, m, ratio, maxW);
    var bw = full >= maxW - 0.5 ? full : stackBoard(g, true, H, m, ratio, maxW);
    g.classList.remove('ui-layout-stack');
    g.classList.remove('ui-stack-compact');
    g.classList.add('ui-layout-side');
    App.el.panel.style.width = pw;
    return bw;
  }
  var STACK_MIN_BOARD = 300;
  var STACK_FLOOR = 200;
  var STACK_TALL_W = 820;
  var STACK_CHIP_W = 104;
  function stackBoard(g, compact, H, m, ratio, maxW) {
    Dom.toggle(g, 'ui-stack-compact', compact);
    var chips = App.panel && App.panel.chipsEl;
    if (compact && chips) {
      var n = Math.max(1, (App.game && App.game.players ? App.game.players.length : 4));
      var w = chips.getBoundingClientRect().width || 0;
      var cols = w && (w + 6) / n >= STACK_CHIP_W ? n : Math.ceil(n / 2);
      chips.style.setProperty('--cols', String(cols));
    }
    if (App.panel && App.panel.fitChips) App.panel.fitChips();
    var pr = App.el.panel.getBoundingClientRect();
    var act = App.panel && App.panel.actionsEl;
    var need = act && act.isConnected && act.parentNode === App.el.panel ? act.getBoundingClientRect().bottom - pr.top + 14 : 280;
    var bw = Math.min(maxW, Math.max(0, Math.min(maxW / ratio, H - need - m * 3)) * ratio);
    if (maxW > 560 && bw > 560) {
      var all = pr.height > 0 ? Math.max(0, Math.min(maxW / ratio, H - Math.max(need, pr.height + 14) - m * 3)) * ratio : bw;
      bw = Math.min(maxW, Math.max(560, all));
    }
    return bw;
  }

  var toastTimer = null;
  function toast(text) {
    var t = document.getElementById('toast');
    if (!t) { t = h('div', { id: 'toast', cls: 'ui-toast', role: 'status', 'aria-live': 'polite' }); document.body.appendChild(t); }
    Dom.text(t, text);
    t.hidden = false;
    t.classList.add('ui-show');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove('ui-show'); t.hidden = true; }, 2600);
  }
  App.toast = toast;

  function renderBanner() {
    var b = document.getElementById('banner');
    if (!b) return;
    if (!App.updateReady) { b.hidden = true; return; }
    if (!b.firstChild) {
      b.appendChild(h('span', { cls: 'ui-banner-text' }, 'New version ready'));
      b.appendChild(Dom.btn('Update now', function () { App.applyUpdate(); }, { small: true, primary: true }));
      b.appendChild(Dom.btn(Dom.icon('close', 18), function () { App.bannerHidden = true; b.hidden = true; }, { small: true, ghost: true, aria: 'Later' }));
    }
    b.hidden = !!App.bannerHidden;
    b.setAttribute('role', 'status');
  }
  App.applyUpdate = function () {
    safeReload(function () {
      try { if (ECE.Pwa && typeof ECE.Pwa.applyUpdate === 'function' && ECE.Pwa.applyUpdate()) return; } catch (e) { App.report(e, 'pwa.applyUpdate'); }
      location.reload();
    });
  };
  function onUpdateReady() {
    App.updateReady = true;
    App.bannerHidden = false;
    renderBanner();
    if (App.screen === 'home') App.go('home');
  }

  var SAVE_ERROR_TEXT = {
    full: 'This browser’s storage is full. Your game goes on; free some space or copy your save code in Settings.',
    denied: 'This browser is not letting the game store its progress. Your game goes on; copy your save code in Settings to keep it.',
    unknown: 'Something stopped the game from storing your progress. Your game goes on and it keeps trying; copy your save code in Settings to keep a copy.'
  };
  function watchSave() {
    var S = ECE.Save;
    if (!S) return;
    try { if (typeof S.onConflict === 'function') S.onConflict(function (info) { onSaveConflict(info || {}); }); } catch (e) { App.report(e, 'save.onConflict'); }
    try { if (typeof S.onError === 'function') S.onError(function (info) { onSaveError(info || {}); }); } catch (e2) { App.report(e2, 'save.onError'); }
  }
  function onSaveConflict(info) {
    info = info || {};
    if (App.takenOver) return;
    var only = info.gameChanged === false;
    App.takenOver = true;
    stopTimers();
    hideNote();
    ECE.Dialogs.closeAll();
    renderAll();
    ECE.Dialogs.open({
      id: 'takeover', title: only ? 'Changed in another tab' : 'Played somewhere else', cls: 'ui-dlg-msg ui-dlg-takeover', place: 'center', role: 'alertdialog',
      onEscape: function () { },
      render: function (hd) {
        hd.body.appendChild(h('p', { cls: 'ui-p' }, only ? 'Emerald City Estates was changed in another tab or window. Reload to go on from there.' : 'This game was played in another tab or window. Reload to go on from there.'));
        hd.foot.appendChild(Dom.btn('Reload', function () { location.reload(); }, { primary: true, data: { k: 'reload' } }));
      }
    });
  }
  App.onSaveConflict = onSaveConflict;
  function onSaveError(info) {
    var kind = SAVE_ERROR_TEXT[info.kind] ? info.kind : 'unknown';
    if (App.takenOver) return;
    ECE.Dialogs.message({ id: 'savefail', title: 'Can’t save right now', lines: [SAVE_ERROR_TEXT[kind]], ok: 'OK' }).then(pump);
  }
  App.onSaveError = onSaveError;
  var READ_ONLY_LINE = 'Your progress isn’t being saved in this window (another save is kept as it is). Copy your save code to keep this game.';
  function saveStatusLine() {
    var S = ECE.Save, st = null;
    try { st = S && typeof S.status === 'function' ? S.status() : null; } catch (e) { st = null; }
    if (!st) return null;
    if (st.takenOver || App.takenOver) return 'This game was played in another tab or window: reload to go on from there.';
    if (st.readOnly || App.readOnly) return READ_ONLY_LINE;
    if (st.lastError === 'full') return 'Your progress can’t be saved right now: this browser’s storage is full. Copy your save code to keep it.';
    if (st.lastError) return 'Your progress can’t be saved right now. Copy your save code to keep it.';
    if (st.storage === 'memory') return 'This browser is not keeping saves for this game: copy your save code to keep your progress.';
    return null;
  }

  App.importSave = function (text) {
    var S = ECE.Save;
    var r;
    try { r = S.importCode(String(text || '')); } catch (e) { App.report(e, 'importCode'); r = { ok: false, error: 'This code could not be read.' }; }
    if (!r || !r.ok) return Promise.resolve({ ok: false, error: (r && r.error) || 'This code could not be read.' });
    var sum = r.summary || {};
    var lines = [];
    if (typeof sum === 'string') lines.push(sum);
    else {
      if (sum.played !== undefined) lines.push('Games played: ' + sum.played + (sum.won !== undefined ? ', won: ' + sum.won : '') + '.');
      if (sum.game || sum.inProgress || sum.round) lines.push('A game in progress' + (sum.round ? ', round ' + sum.round : '') + '.');
      else lines.push('No game in progress.');
      if (sum.text) lines = [sum.text];
    }
    lines.push('Your current progress on this device will be replaced (a backup copy is kept).');
    if (App.takenOver) return Promise.resolve({ ok: false, error: 'This game was played in another tab or window. Reload to go on from there.' });
    return ECE.Dialogs.confirm({ title: 'Import this save?', text: lines, yes: 'Import', no: 'Cancel' }).then(function (yes) {
      if (!yes) return { ok: false, cancelled: true };
      var stored = true;
      try {
        if (typeof S.replace === 'function') stored = S.replace(r.save, App.save) !== false;
        else if (typeof S.backup === 'function') S.backup(App.save);
      } catch (e) { App.report(e, 'save.replace'); stored = false; }
      if (!stored) {
        var ro = false;
        try { var sst = S.status(); ro = !!(sst && sst.readOnly) || !!App.readOnly; } catch (e2) { ro = !!App.readOnly; }
        return { ok: false, error: ro ? READ_ONLY_LINE : 'This browser could not store the imported save, so nothing changed.' };
      }
      stopTimers();
      ECE.Dialogs.closeAll();
      App.save = fillSave(r.save);
      App.game = App.save.game && App.save.game.phase !== 'over' ? App.save.game : null;
      App.you = App.game ? humanOf(App.game) : null;
      App.cardPending = !!(App.game && App.game.phase === 'card');
      App.saveNow();
      App.applySettings();
      return { ok: true };
    });
  };

  function keyboard() {
    if (Dom.trackFocus) Dom.trackFocus();
    document.addEventListener('keydown', Dom.safe(function (ev) {
      if (ev.defaultPrevented) return;
      if (ECE.Sound) ECE.Sound.unlock();
      if (ev.key === 'Escape' || ev.key === 'Esc') {
        if (ECE.Dialogs.isOpen()) { ECE.Dialogs.escape(); ev.preventDefault(); return; }
        if (App.screen === 'game' && App.panel && App.panel.clearPick && App.panel.clearPick()) { ev.preventDefault(); return; }
        if (App.screen === 'settings' || App.screen === 'howto' || App.screen === 'setup') { App.back(); ev.preventDefault(); }
        return;
      }
      if (ev.key !== ' ' && ev.key !== 'Enter' && ev.key !== 'Spacebar') return;
      if (ev.altKey || ev.ctrlKey || ev.metaKey) return;
      if (App.screen !== 'game' || ECE.Dialogs.isOpen() || App.landscape || App.takenOver) return;
      var a = document.activeElement;
      if (a && a !== document.body && /^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName)) return;
      if (a && a !== document.body && /^(BUTTON|A)$/.test(a.tagName) && ECE.Dialogs.keyboardFocus(a)) return;
      var b = App.panel && App.panel.primaryEl;
      if (b && !b.disabled) { ev.preventDefault(); if (a && a !== b && a !== document.body && a.blur) a.blur(); b.click(); }
    }, 'keydown'));
  }

  var lastTick = 0;
  function ticker() {
    lastTick = Dom.now();
    setInterval(Dom.safe(function () {
      var now = Dom.now();
      var dt = Math.min(1500, Math.max(0, now - lastTick));
      lastTick = now;
      var st = App.game;
      if (!st || st.phase === 'over' || App.screen !== 'game' || document.hidden || App.auto || App.landscape || App.takenOver) return;
      var r = safeAct(st, { t: 'tick', ms: Math.round(dt) });
      if (r.ok && r.events && r.events.length) { noteEvents(st, r.events); pump(); }
      App.tickCount = (App.tickCount || 0) + 1;
      if (App.tickCount % 5 === 0) App.saveSoon();
      renderTop();
      if (App.panel) Dom.text(App.panel.headEl.querySelector('.ui-panel-round'), ECE.Panel.roundText(st));
    }, 'tick'), 1000);
  }

  function visibility() {
    document.addEventListener('visibilitychange', function () {
      lastTick = Dom.now();
      if (document.hidden) { App.saveNow(); if (ECE.Sound) ECE.Sound.suspend(); }
      else {
        if (ECE.Sound) ECE.Sound.resume();
        try { if (ECE.Pwa && typeof ECE.Pwa.check === 'function') { var c = ECE.Pwa.check(); if (c && c.catch) c.catch(function () { }); } } catch (e) { }
        pump();
      }
    });
    window.addEventListener('pagehide', function () { App.saveNow(); });
    window.addEventListener('resize', Dom.safe(function () { App.orient(); App.layout(); fitHome(); }, 'resize'));
  }

  function cloneJSON(x) { return x === null || x === undefined ? x : JSON.parse(JSON.stringify(x)); }

  function autoRun(turns) {
    return new Promise(function (resolve) {
      var st = App.game;
      if (!st) { resolve(); return; }
      stopTimers();
      ECE.Dialogs.closeAll();
      App.auto = true;
      App.turnsSeen = 0;
      var stuck = 0, refusedSeen = 0;
      function finish() {
        App.auto = false;
        App.busy = false;
        App.saveNow();
        if (App.screen === 'game') renderAll();
        pump();
        resolve();
      }
      function chunk() {
        try {
          var t0 = Dom.now();
          while (Dom.now() - t0 < 30) {
            if (App.game !== st || st.phase === 'over' || App.turnsSeen >= turns) { finish(); return; }
            var a = ECE.Rules.actor(st);
            if (a === null || a === undefined) { finish(); return; }
            var action = decideFor(st, a);
            if ((App.turnActions || 0) > TURN_ACTION_CAP && action && MANAGE[action.t]) action = forwardAction(st) || action;
            var res = safeAct(st, action);
            if (!res.ok) {
              var refused = (action && action.t) + ': ' + res.error;
              res = rescue(st);
              if (refusedSeen++ < 5) App.report(new Error('computer action refused in autoplay (' + refused + ')' + (res.ok ? '; played a safe legal action instead' : '')), 'ai');
              if (!res.ok) { if (++stuck > 3) { App.report(new Error('autoplay stuck in ' + st.phase + ': ' + res.error), 'autoplay'); finish(); return; } continue; }
            }
            stuck = 0;
            App.turnActions = (App.turnActions || 0) + 1;
            noteEvents(st, res.events, true);
          }
          if (App.screen === 'game') { renderBoard(); renderPanel(); renderTop(); }
          setTimeout(chunk, 0);
        } catch (e) { App.report(e, 'autoplay'); finish(); }
      }
      chunk();
    });
  }

  function demoBase() {
    var R = ECE.Rules;
    var st = App.game ? (R.clone ? R.clone(App.game) : cloneJSON(App.game)) : null;
    if (!st) {
      st = R.newGame({ seed: 7, players: playersFor(App.save.setup), rules: { auctions: true, rainFund: false, limit: { kind: 'none', value: 0 } }, now: Date.now() });
    }
    return st;
  }
  function seatOf(st, id) { for (var i = 0; i < st.players.length; i++) if (st.players[i].id === id) return i; return 0; }
  function firstCpu(st, you) { for (var i = 0; i < st.players.length; i++) if (st.players[i].id !== you && !st.players[i].out) return st.players[i].id; return null; }
  function unowned(st, kind) {
    var S = ECE.BoardData.SPACES;
    for (var i = 0; i < S.length; i++) if ((!kind ? ECE.BoardData.isOwnable(i) : S[i].kind === kind) && !(st.props && st.props[i])) return i;
    return 1;
  }
  function give(st, owner, list, levels) {
    st.props = st.props || {};
    list.forEach(function (i, k) { st.props[i] = { owner: owner, level: levels ? levels[k] | 0 : 0, mortgaged: false }; });
  }
  function demoFor(kind) {
    var st = demoBase();
    var you = humanOf(st);
    var cpu = firstCpu(st, you);
    var me = Dom.player(st, you);
    if (me) { me.out = false; me.stuck = false; }
    st.turn = seatOf(st, you);
    st.phase = 'roll';
    st.pending = null;
    st.rolled = false;
    var mineCount = Object.keys(st.props || {}).filter(function (k) { return st.props[k].owner === you; }).length;
    if (kind === 'buy') {
      st.phase = 'buy'; st.pending = { kind: 'buy', space: unowned(st, 'street') };
    } else if (kind === 'auction') {
      var order = st.players.filter(function (p) { return !p.out; }).map(function (p) { return p.id; });
      st.phase = 'auction'; st.pending = { kind: 'auction', space: unowned(st, 'street'), bid: 120, leader: cpu, order: order, idx: order.indexOf(you) };
    } else if (kind === 'card') {
      var d = st.decks && st.decks.rain;
      var id = d && d.order && d.order.length ? d.order[(d.next | 0) % d.order.length] : 'rc1';
      st.phase = 'card'; st.pending = { kind: 'card', deck: 'rain', id: id };
    } else if (kind === 'manage') {
      var full = ECE.BoardData.DISTRICTS.some(function (d) { try { return ECE.Rules.ownsDistrict(st, you, d.id); } catch (e) { return false; } });
      if (!full) { give(st, you, [17, 18, 19], [2, 2, 1]); give(st, you, [16]); st.props[16].mortgaged = true; if (!st.props[12]) give(st, you, [12]); }
    } else if (kind === 'trade' || kind === 'offer') {
      if (!mineCount) give(st, you, [12, 16]);
      var theirs = Object.keys(st.props || {}).filter(function (k) { return st.props[k].owner === cpu; });
      if (!theirs.length) give(st, cpu, [13, 26]);
      if (kind === 'offer') {
        var mineList = Object.keys(st.props).filter(function (k) { return st.props[k].owner === you; }).map(Number);
        var theirList = Object.keys(st.props).filter(function (k) { return st.props[k].owner === cpu; }).map(Number);
        st.phase = 'trade';
        st.pending = { kind: 'trade', offer: { from: cpu, to: you, give: { cash: 100, spaces: theirList.slice(0, 1), passes: 0 }, get: { cash: 0, spaces: mineList.slice(0, 1), passes: 0 } }, back: 'roll' };
      }
    } else if (kind === 'debt') {
      if (!mineCount) give(st, you, [12, 16]);
      if (me) me.cash = 120;
      st.phase = 'debt';
      st.pending = { kind: 'debt', debts: [{ player: you, amount: 300, to: [{ id: cpu, amount: 300 }], reason: 'rent', space: 30 }], resume: 'end' };
    } else if (kind === 'over') {
      st.phase = 'over';
      st.pending = null;
      try { st.standings = ECE.Rules.standings(st); } catch (e) { st.standings = null; }
      var list = ECE.Dialogs.standingsOf(st);
      st.winner = list.length ? list[0].id : you;
    }
    return st;
  }

  function installTestHooks() {
    var T = {
      ready: false,
      screen: function () { return App.screen; },
      state: function () { return cloneJSON(App.game); },
      save: function () { return cloneJSON(App.save); },
      start: function (o) {
        o = o || {};
        var setup = Object.assign({}, App.save.setup);
        ['opponents', 'level', 'limit', 'name', 'token', 'auctions', 'rainFund'].forEach(function (k) { if (o[k] !== undefined) setup[k] = o[k]; });
        App.newGame(setup, { seed: o.seed !== undefined ? o.seed : newSeed(), noIntro: true });
        return new Promise(function (res) { setTimeout(function () { res(cloneJSON(App.game)); }, 30); });
      },
      autoplay: function (turns) { return autoRun(Math.max(0, turns | 0)).then(function () { return cloneJSON(App.game); }); },
      toEnd: function () { return autoRun(3000).then(function () { return cloneJSON(App.game); }); },
      open: function (name) { return testOpen(String(name || '')); },
      speed: function (s) { if (THINK[s] !== undefined) { App.testSpeed = s; App.save.settings.speed = s; } return cpuSpeed(); },
      closeUp: function (on) { App.setCloseUp(!!on); return closeUpOn(); },
      errors: function () { return App.errors.slice(); },
      home: function () { ECE.Dialogs.closeAll(); App.go('home'); return App.screen; }
    };
    window.ECE_TEST = T;
    return T;
  }

  function testOpen(name) {
    var D = ECE.Dialogs;
    var m = /^deed:(\d+)$/.exec(name);
    if (m) { if (App.screen !== 'game' && App.game) App.go('game'); D.deed(App.gameCtx(App.game ? null : demoBase()), +m[1]); return true; }
    if (SCREENS.indexOf(name) >= 0 && name !== 'game') { D.closeAll(); App.go(name); return true; }
    if (name === 'log') { if (App.game) { if (App.screen !== 'game') App.go('game'); openLog(); return true; } return false; }
    if (name === 'cpucard' || name === 'waited') {
      if (!App.game) return false;
      if (App.screen !== 'game') App.go('game');
      D.closeAll();
      var gst = App.game;
      if (name === 'cpucard') {
        var cp = firstCpu(gst, App.you);
        var deck = gst.decks && gst.decks.buzz && gst.decks.buzz.order && gst.decks.buzz.order.length ? 'buzz' : 'rain';
        var dk = gst.decks && gst.decks[deck];
        var cid = dk && dk.order && dk.order.length ? dk.order[(dk.next | 0) % dk.order.length] : (deck === 'rain' ? 'rc1' : 'lb1');
        showCardNote(cp, deck, cid, true);
        return true;
      }
      var wl = waitedLines(gst, App.you, 6);
      if (!wl.lines.length) {
        var keep = { rent: 1, buy: 1, auctionEnd: 1, trade: 1, build: 1, bankrupt: 1, fund: 1 };
        var picked = gst.log.filter(function (e) { return e && keep[e.t] && !(e.t === 'auctionEnd' && (e.winner === null || e.winner === undefined)); }).slice(-5);
        wl = { lines: picked.map(function (e) { var p = Dom.player(gst, e.p !== undefined ? e.p : e.winner); return { text: ECE.Rules.text(gst, e, App.you), color: p ? p.color : null, you: e.p === App.you || e.owner === App.you }; }), more: 0 };
      }
      showWaited(gst, wl);
      return !!wl.lines.length;
    }
    if (App.game && App.screen !== 'game') App.go('game');
    var st = App.game, R = ECE.Rules;
    var live = st && st.pending;
    var actor = st ? R.actor(st) : null;
    var real = st && actor === App.you;
    var ctx;
    switch (name) {
      case 'buy':
        if (real && st.phase === 'buy') { D.buy(App.gameCtx()); return true; }
        D.buy(App.gameCtx(demoFor('buy'))); return true;
      case 'auction':
        if (real && st.phase === 'auction') { D.auction(App.gameCtx()); return true; }
        ctx = App.gameCtx(demoFor('auction')); D.auction(ctx); var a = D.get('auction'); if (a) { a.spec.live = false; } return true;
      case 'card':
        if (st && st.phase === 'card' && live) { D.card(App.gameCtx(), { p: actor, deck: live.deck, id: live.id }); return true; }
        var dc = demoFor('card'); D.card(App.gameCtx(dc), { p: App.you !== null ? App.you : humanOf(dc), deck: dc.pending.deck, id: dc.pending.id }); return true;
      case 'manage': D.manage(App.gameCtx(demoFor('manage'))); return true;
      case 'trade': { var ts = demoFor('trade'); D.trade(App.gameCtx(ts), { to: firstCpu(ts, humanOf(ts)) }); return true; }
      case 'offer':
        if (real && st.phase === 'trade' && live && live.offer && live.offer.to === App.you) { D.offer(App.gameCtx()); return true; }
        D.offer(App.gameCtx(demoFor('offer'))); return true;
      case 'debt':
        if (real && st.phase === 'debt') { D.debt(App.gameCtx()); return true; }
        D.debt(App.gameCtx(demoFor('debt'))); return true;
      case 'over':
        if (st && st.phase === 'over') { D.over(App.gameCtx()); return true; }
        D.over(App.gameCtx(demoFor('over'))); return true;
      default: return false;
    }
  }

  App.boot = function () {
    if (App.booted) return;
    App.booted = true;
    App.query = Dom.query();
    App.test = App.query.test === '1';
    App.debug = App.query.debug === '1';
    App.version = ECE.VERSION || '1.0.0';
    installCatchers();
    if (App.test) installTestHooks();
    try {
      var r = null;
      if (ECE.Save && typeof ECE.Save.load === 'function') {
        try { r = ECE.Save.load(); } catch (e) { App.report(e, 'save.load'); }
      }
      App.save = fillSave(r && r.save ? r.save : blankSave());
      App.readOnly = !!(r && r.readOnly);
      App.notice = r && r.notice ? r.notice : null;
      if (!ECE.Save) App.notice = App.notice || null;
      if (ECE.Mobile && typeof ECE.Mobile.init === 'function') { try { ECE.Mobile.init(); } catch (e2) { App.report(e2, 'mobile.init'); } }
      if (ECE.Sound && typeof ECE.Sound.init === 'function') { try { ECE.Sound.init(App.save.settings); } catch (e3) { App.report(e3, 'sound.init'); } }
      buildShell();
      App.orient();
      keyboard();
      visibility();
      ticker();
      ECE.Dialogs.onChange(function () { sheetInset(); pump(); });
      if (ECE.Pwa) {
        try {
          if (typeof ECE.Pwa.onUpdate === 'function') ECE.Pwa.onUpdate(onUpdateReady);
          if (typeof ECE.Pwa.register === 'function') ECE.Pwa.register();
        } catch (e4) { App.report(e4, 'pwa'); }
      }
      var g = App.save.game;
      if (g && g.phase && g.phase !== 'over' && ECE.Rules) {
        var problems = [];
        try { problems = typeof ECE.Rules.check === 'function' ? ECE.Rules.check(g) || [] : []; } catch (e5) { problems = ['check failed']; }
        if (App.debug && problems.length) App.report(new Error('saved game: ' + problems.slice(0, 3).join('; ')), 'check');
        App.game = g;
        App.you = humanOf(g);
        App.cardPending = g.phase === 'card';
      } else if (g && g.phase === 'over') App.save.game = null;
      App.go('home');
    } catch (e) {
      App.report(e, 'boot');
    }
    watchSave();
    watchMotion();
    document.documentElement.classList.add('ready');
    if (window.ECE_TEST) window.ECE_TEST.ready = true;
  };

  App.updateAvailable = onUpdateReady;
  App.playersFor = playersFor;
  App.limitOf = limitOf;
  App.fallbackAction = fallbackAction;
  if (typeof document !== 'undefined' && document.addEventListener) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { App.boot(); });
    else setTimeout(function () { App.boot(); }, 0);
  }
})(window.ECE = window.ECE || {});
