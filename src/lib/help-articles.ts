export type HelpArticle = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  body: string[];
};

export const helpArticles: HelpArticle[] = [
  {
    slug: 'erste-schritte',
    title: 'Erste Schritte | Orderlyze',
    shortTitle: 'Erste Schritte',
    description: 'Hier erfährst du, wie du dein neues Kassensystem Schritt für Schritt einrichtest und für deine Bedürfnisse anpasst.',
    body: [
      'Nachdem du das Kassensystem bestellt hast, bekommst du von uns einen Account zugeschickt. Mit diesem kannst du dich in der App und auf orderlyze web anmelden.',
      'Lege zunächst deine Produktgruppen und Produkte an. Stelle deine Steuer­sätze ein und konfiguriere deine Drucker.',
      'Anschließend richtest du deine Mitarbeiter ein und verbindest dein Bond­rucker- oder Kartenzahlungs­gerät.',
      'Wenn du Fragen hast, hilft dir unser Support kostenlos weiter – telefonisch, per E-Mail oder WhatsApp.',
    ],
  },
  {
    slug: 'uebermittlung-finanzamt',
    title: 'Datenübermittlung Finanzamt | Orderlyze',
    shortTitle: 'Datenübermittlung Finanzamt',
    description: 'So funktioniert die Übermittlung deiner Daten an das Finanzamt mit Orderlyze.',
    body: [
      'Orderlyze ist 100% finanzamtkonform. Alle relevanten Daten werden automatisch übermittelt – du musst dich um nichts kümmern.',
      'Die Konfiguration nehmen wir gemeinsam mit dir vor. Anschließend laufen die Übermittlungen automatisch im Hintergrund.',
    ],
  },
  {
    slug: 'kassenbuch',
    title: 'Kassenbuch | Orderlyze',
    shortTitle: 'Kassenbuch',
    description: 'So führst du dein Kassenbuch direkt im Orderlyze Kassensystem.',
    body: [
      'Im Orderlyze Kassensystem ist das Kassenbuch direkt integriert. Alle Bar-Transaktionen werden automatisch erfasst und fortlaufend nummeriert.',
      'Du siehst den aktuellen Kassenstand jederzeit und kannst Einnahmen und Ausgaben mit wenigen Klicks erfassen.',
      'Das Kassenbuch ist von allen Geräten abrufbereit.',
    ],
  },
  {
    slug: 'drucker-verbinden',
    title: 'Drucker verbinden | Orderlyze',
    shortTitle: 'Mit dem Drucker verbinden',
    description: 'So verbindest du dein Kassensystem mit einem Bluetooth- oder Cloud Drucker.',
    body: [
      'Schalte deinen Bondrucker ein und stelle sicher, dass Bluetooth aktiviert ist. Öffne im Kassensystem die Druckereinstellungen und wähle deinen Drucker aus.',
      'Für Cloud Drucker verbindest du den Drucker zunächst mit deinem WLAN. Anschließend wird der Drucker automatisch im Kassensystem erkannt.',
      'Du kannst beliebig viele Drucker konfigurieren – auch separate Drucker für Küche und Bar.',
    ],
  },
  {
    slug: 'zahlungsarten',
    title: 'Zahlungsarten | Orderlyze',
    shortTitle: 'Zahlungsarten',
    description: 'Alles rund um die verschiedenen Zahlungsarten wie Bar und Kartenzahlung sowie Rabatte.',
    body: [
      'Orderlyze unterstützt alle gängigen Zahlungsarten: Bar, EC, Maestro, MasterCard, Visa und Apple Pay.',
      'Du kannst Rabatte und Gutscheine direkt im Bezahlvorgang anwenden. Gemischte Zahlungen sind ebenfalls möglich.',
      'Bei Kartenzahlung wird der Betrag automatisch an das Kartenlesegerät übertragen.',
    ],
  },
  {
    slug: 'berichte',
    title: 'Berichte erstellen | Orderlyze',
    shortTitle: 'Berichte erstellen',
    description: 'Hier findest du alle Informationen über PDF Berichte und CSV Exporte.',
    body: [
      'Im orderlyze web findest du eine große Auswahl an Berichten: Tages-, Monats- und Jahresberichte, Berichte nach Zahlungsart, Produktberichte und mehr.',
      'Du kannst alle Berichte als PDF herunterladen oder per CSV in dein Buchhaltungs­programm exportieren.',
      'Für deinen Steuerberater stehen Exporte im DATEV, BMD und RZL Format bereit.',
    ],
  },
  {
    slug: 'umsaetze',
    title: '(Tages) Umsätze ansehen | Orderlyze',
    shortTitle: '(Tages) Umsätze ansehen',
    description: 'Wie du deine Umsätze schnell und einfach nach Zahlungsart ansehen kannst.',
    body: [
      'Im orderlyze web siehst du deine Umsätze nach Zahlungsart, Produkt, Mitarbeiter oder Tageszeit aufgeschlüsselt.',
      'Du kannst Zeiträume frei wählen und Trends in deinem Unternehmen erkennen.',
    ],
  },
  {
    slug: 'gutscheine',
    title: 'Gutscheine | Orderlyze',
    shortTitle: 'Gutscheine',
    description: 'Hier erfährst du, wie du Gutscheine erstellst, verkaufst und einlöst.',
    body: [
      'Lege Gutscheine direkt im Kassensystem an. Du kannst feste Beträge oder beliebige Werte vergeben.',
      'Gutscheine werden automatisch verbucht und können in deinem Unternehmen oder online eingelöst werden.',
    ],
  },
  {
    slug: 'stammkunden',
    title: 'Stammkunden | Orderlyze',
    shortTitle: 'Stammkunden',
    description: 'Wie du Stammkunden anlegst und auf diese bonierst.',
    body: [
      'Lege Stammkunden mit Name, E-Mail und Telefonnummer an. Bei Rechnungen kannst du diese direkt zuordnen.',
      'So behältst du den Überblick über Stammkunden-Umsätze und kannst gezielt Aktionen starten.',
    ],
  },
  {
    slug: 'tischplan',
    title: 'Tischplan gestalten | Orderlyze',
    shortTitle: 'Tischplan gestalten',
    description: 'Hier erfährst du, wie du dir einen Tischplan individuell gestalten kannst.',
    body: [
      'Im Tischplan platzierst du Tische frei in einem Raster. Pro Tisch kannst du Sitzplätze und einen Namen vergeben.',
      'Beim Funkbonieren tippst du einfach auf den Tisch und nimmst die Bestellung auf.',
    ],
  },
  {
    slug: 'dynamisches-produkt',
    title: 'Dynamisches Produkt | Orderlyze',
    shortTitle: 'Dynamisches Produkt',
    description: 'Spontan ein individuelles Produkt oder eine Dienstleistung eingeben.',
    body: [
      'Mit dem dynamischen Produkt gibst du spontan Produkte oder Dienstleistungen mit individuellem Preis ein – ideal für seltene Sonderfälle.',
      'Du kannst dem dynamischen Produkt eine Produktgruppe und einen Steuersatz zuweisen.',
    ],
  },
  {
    slug: 'buchungskonten',
    title: 'Buchungskonten | Orderlyze',
    shortTitle: 'Buchungskonten',
    description: 'CSV Export für eine Buchungssoftware – so richtest du es ein.',
    body: [
      'Im orderlyze web kannst du Buchungskonten pro Steuersatz oder Produktgruppe definieren. Diese werden beim Export für deine Buchhaltungs­software automatisch ergänzt.',
      'Damit sparen du und dein Steuerberater wertvolle Zeit beim Verbuchen.',
    ],
  },
  {
    slug: 'rechnungen-bearbeiten',
    title: 'Rechnungen bearbeiten / stornieren | Orderlyze',
    shortTitle: 'Rechnungen bearbeiten/stornieren',
    description: 'Du bemerkst erst nach dem Abrechnen, dass die Rechnung falsch ist? Kein Problem.',
    body: [
      'Im Kassensystem kannst du Rechnungen nachträglich stornieren oder die Zahlungsmethode ändern.',
      'Die Stornierung ist finanzamtkonform und wird automatisch dokumentiert.',
    ],
  },
  {
    slug: 'gaengesystem',
    title: 'Gängesystem | Orderlyze',
    shortTitle: 'Gängesystem',
    description: 'So richtest du dein eigenes Gängesystem ein.',
    body: [
      'Mit dem Gängesystem teilst du Bestellungen in Gänge ein (z. B. Vorspeise, Hauptspeise, Dessert).',
      'Bei der Bestellaufnahme weist du jedem Artikel einen Gang zu. Die Küche druckt die Gänge zum richtigen Zeitpunkt.',
    ],
  },
  {
    slug: 'bewirtungsbeleg',
    title: 'Bewirtungsbeleg | Orderlyze',
    shortTitle: 'Bewirtungsbeleg',
    description: 'Mit wenigen Klicks einen Bewirtungsbeleg erstellen und digital versenden.',
    body: [
      'Im Bezahlvorgang aktivierst du den Bewirtungsbeleg. Der Beleg wird automatisch mit allen Pflichtfeldern erstellt.',
      'Du kannst den Beleg drucken oder direkt per E-Mail versenden.',
    ],
  },
  {
    slug: 'farbeinstellungen',
    title: 'Farbeinstellungen | Orderlyze',
    shortTitle: 'Farbeinstellungen',
    description: 'Gestalte deine Produktgruppen und Produkte farblich, wie sie dir gefallen.',
    body: [
      'Jedem Produkt und jeder Produktgruppe kannst du eine eigene Farbe zuweisen. Das hilft dir, schneller das richtige Produkt zu finden.',
      'Die Farben gelten sowohl in der App als auch beim Funkbonieren.',
    ],
  },
  {
    slug: 'abholung',
    title: 'Abholung | Orderlyze',
    shortTitle: 'Abholung',
    description: 'So stellst du die richtigen Steuersätze für die Abholung ein.',
    body: [
      'Beim Bezahlvorgang wählst du die Option "Abholung". Das Kassensystem wendet automatisch den richtigen Steuersatz für Außer-Haus an.',
      'Die Konfiguration der Steuersätze nimmst du im orderlyze web vor.',
    ],
  },
  {
    slug: 'pfand',
    title: 'Pfand | Orderlyze',
    shortTitle: 'Pfand',
    description: 'So verrechnest du Pfand mit dem Kassensystem.',
    body: [
      'Lege Pfand als eigenes Produkt mit dem korrekten Steuersatz an. Beim Bezahlvorgang kannst du Pfand entgegennehmen oder rückerstatten.',
      'Pfand wird in deinen Berichten separat ausgewiesen.',
    ],
  },
  {
    slug: 'steuer-aendern',
    title: 'Steuer ändern | Orderlyze',
    shortTitle: 'Steuer ändern',
    description: 'So stellst du die Steuer von Kategorien und Produkten um.',
    body: [
      'Im orderlyze web kannst du den Steuersatz pro Produkt oder Produktgruppe ändern. Änderungen werden sofort auf allen Geräten aktiv.',
      'Bei Änderungen empfehlen wir vorher Rücksprache mit deinem Steuerberater.',
    ],
  },
  {
    slug: 'termin',
    title: 'Termin vereinbaren | Orderlyze',
    shortTitle: 'Termin',
    description: 'Vereinbare einen unverbindlichen Termin mit unserem Vertriebsteam.',
    body: [
      'Wenn du Fragen zum Orderlyze Kassensystem hast oder dir das System unverbindlich vorführen lassen möchtest, vereinbare einen Termin – kostenlos und unverbindlich.',
      'Ruf uns einfach unter 0800 400 4511 an oder schreib uns eine E-Mail.',
    ],
  },
  {
    slug: 'bluetooth-drucker',
    title: 'Bluetooth Drucker verbinden | Orderlyze',
    shortTitle: 'Bluetooth Drucker verbinden',
    description: 'So verbindest du dein Tablet oder Smartphone mit einem Bluetooth Bondrucker.',
    body: [
      'Bevor du startest, stecke deinen Drucker am Stromnetz an und schalte ihn ein.',
      'Um dein Tablet oder Smartphone mit dem Drucker zu verbinden, klicke in der Tischübersicht rechts oben auf das rote Druckersymbol und wähle BLUETOOTH aus.',
      'Oben im Reiter ist bereits Bluetooth Drucker ausgewählt. Klicke auf "SUCHE NACH DRUCKER".',
      'Tippe nun auf deinen Drucker in der Liste. Innerhalb weniger Sekunden sollte sich das Drucker-Popup schließen. Überprüfe, ob das Druckersymbol rechts oben grün ist – dann hast du deinen Drucker erfolgreich verbunden.',
      'Beim nächsten Start der App verbindet sich der Drucker automatisch.',
    ],
  },
  {
    slug: 'cloud-drucker',
    title: 'Cloud Drucker (STAR) verbinden | Orderlyze',
    shortTitle: 'Cloud Drucker (STAR) verbinden',
    description: 'So richtest du einen STAR Cloud Drucker für deine Küche oder Bar ein.',
    body: [
      'Wenn du mit einem Cloud Drucker arbeitest, befolge die folgenden Schritte, um deinen Drucker einzurichten.',
      'WICHTIG: Bevor du startest, stecke bei deinem Drucker das LAN-Kabel ein, damit er mit dem Netzwerk verbunden ist. Verbinde dein Smartphone/Tablet mit demselben WLAN.',
      'Schritt 1: Tippe auf der Hauptseite rechts oben auf das rote Druckersymbol.',
      'Schritt 2: Wähle "STAR" aus.',
      'Schritt 3: Tippe auf "STAR DRUCKER HINZUFÜGEN".',
      'Schritt 4: Gib deinem Drucker einen Namen (z. B. Küchendrucker, Bardrucker).',
      'Schritt 5: Tippe auf "Hinzufügen". Warte, bis der Drucker fertig eingerichtet ist.',
    ],
  },
  {
    slug: 'sunmi-drucker',
    title: 'Sunmi Drucker verbinden | Orderlyze',
    shortTitle: 'Sunmi Drucker verbinden',
    description: 'So verbindest du dich mit dem internen Drucker deines Sunmi Geräts.',
    body: [
      'So kannst du dich mit dem internen Drucker deines Sunmi Geräts verbinden.',
      '1. Um dein Sunmi Gerät mit dem Drucker zu verbinden, klicke in der Tischübersicht rechts oben auf das rote Druckersymbol.',
      '2. Wähle oben im Menü "Sunmi" aus. (Wenn diese Option nicht angezeigt wird, aktiviere in den weiteren Einstellungen den "Sunmi Drucker".)',
      '3. Tippe einmal auf die Druckerauswahl und tippe dann auf "InnerPrinter".',
      '4. Tippe anschließend auf Speichern und schließe das Drucker-verbinden-Popup.',
      '5. Wenn die Verbindung erfolgreich war, ist das Druckersymbol auf der Hauptseite grün.',
    ],
  },
];

export type SupportTile = { title: string; description: string; href: string };

export const supportTiles: SupportTile[] = [
  { title: 'Erste Schritte', description: 'Hier erfährst du, wie du dein neues Kassensystem Schritt für Schritt einrichtest.', href: '/erste-schritte/' },
  { title: 'Datenübermittlung Finanzamt', description: 'So funktioniert die automatische Übermittlung deiner Daten an das Finanzamt.', href: '/uebermittlung-finanzamt/' },
  { title: 'Kassenbuch', description: 'So führst du dein Kassenbuch direkt im Kassensystem.', href: '/kassenbuch/' },
  { title: 'Mit dem Drucker verbinden', description: 'Bluetooth- oder Cloud-Drucker mit dem Kassensystem verbinden.', href: '/drucker-verbinden/' },
  { title: 'Zahlungsarten', description: 'Bar, Kartenzahlung, Apple Pay und Rabatte einfach abwickeln.', href: '/zahlungsarten/' },
  { title: 'Berichte erstellen', description: 'PDF Berichte und CSV Exporte für dich oder die Steuerberatung.', href: '/berichte/' },
  { title: '(Tages) Umsätze ansehen', description: 'Umsätze nach Zahlungsart, Produkt oder Mitarbeiter ansehen.', href: '/umsaetze/' },
  { title: 'Gutscheine', description: 'Gutscheine erstellen, verkaufen und einlösen.', href: '/gutscheine/' },
  { title: 'Stammkunden', description: 'Stammkunden anlegen und gezielt bonieren.', href: '/stammkunden/' },
  { title: 'Tischplan gestalten', description: 'Individuellen Tischplan für dein Lokal gestalten.', href: '/tischplan/' },
  { title: 'Dynamisches Produkt', description: 'Spontan ein individuelles Produkt eingeben.', href: '/dynamisches-produkt/' },
  { title: 'Buchungskonten', description: 'CSV Export für deine Buchungssoftware einrichten.', href: '/buchungskonten/' },
  { title: 'Rechnungen bearbeiten', description: 'Rechnungen nachträglich stornieren oder Zahlungsmethode ändern.', href: '/rechnungen-bearbeiten/' },
  { title: 'Gängesystem', description: 'Bestellungen in Gänge unterteilen.', href: '/gaengesystem/' },
  { title: 'Bewirtungsbeleg', description: 'Bewirtungsbeleg mit wenigen Klicks erstellen.', href: '/bewirtungsbeleg/' },
  { title: 'Farbeinstellungen', description: 'Produktgruppen und Produkte farblich gestalten.', href: '/farbeinstellungen/' },
  { title: 'Abholung', description: 'Steuersätze für Abholung einstellen.', href: '/abholung/' },
  { title: 'Pfand', description: 'Pfand verrechnen und entgegennehmen.', href: '/pfand/' },
  { title: 'Steuer ändern', description: 'Steuersätze für Kategorien und Produkte umstellen.', href: '/steuer-aendern/' },
];
