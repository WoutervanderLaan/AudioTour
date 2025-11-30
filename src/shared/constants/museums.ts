/* eslint-disable max-lines */

import type {Coordinates} from '@/shared/hooks/useUserLocation' // TODO: move file to feature folder

/**
 * MuseumLocation
 * TODO: describe what this type represents.
 */
export type MuseumLocation = {
  /**
   * id
   */
  id: string
  /**
   * name
   */
  name: string
  /**
   * province
   */
  province: string
  /**
   * address
   */
  address: string
  /**
   * website
   */
  website: string
  /**
   * coords
   */
  coords: Coordinates
  /**
   * distance
   */
  distance?: number
}

export const KNOWN_MUSEUMS: MuseumLocation[] = [
  {
    id: 'rijksmuseum',
    name: 'Rijksmuseum',
    province: 'North Holland',
    coords: {latitude: 52.3599, longitude: 4.8852},
    address: 'Museumstraat 1, 1071 XX Amsterdam',
    website: 'https://www.rijksmuseum.nl/',
  },
  {
    id: 'van-gogh-museum',
    name: 'Van Gogh Museum',
    province: 'North Holland',
    coords: {latitude: 52.35833, longitude: 4.88111},
    address: 'Museumplein 6, 1071 DJ Amsterdam',
    website: 'https://www.vangoghmuseum.nl/',
  },
  {
    id: 'stedelijk-amsterdam',
    name: 'Stedelijk Museum Amsterdam',
    province: 'North Holland',
    coords: {latitude: 52.358056, longitude: 4.879722},
    address: 'Museumplein 10, 1071 DJ Amsterdam',
    website: 'https://www.stedelijk.nl/',
  },
  {
    id: 'foam',
    name: 'Foam Fotografiemuseum Amsterdam',
    province: 'North Holland',
    coords: {latitude: 52.366667, longitude: 4.893056},
    address: 'Keizersgracht 609, 1017 DS Amsterdam',
    website: 'https://www.foam.org/',
  },
  {
    id: 'rembrandthuis',
    name: 'Rembrandt Huis Museum',
    province: 'North Holland',
    coords: {latitude: 52.369167, longitude: 4.901111},
    address: 'Jodenbreestraat 4, 1011 NK Amsterdam',
    website: 'https://www.rembrandthuis.nl/',
  },
  {
    id: 'hermitage-amsterdam',
    name: 'Hermitage Amsterdam',
    province: 'North Holland',
    coords: {latitude: 52.373333, longitude: 4.9},
    address: 'Amstel 51, 1018 EJ Amsterdam',
    website: 'https://www.hermitage.nl/',
  },
  {
    id: 'eye-filmmuseum',
    name: 'Eye Filmmuseum',
    province: 'North Holland',
    coords: {latitude: 52.375556, longitude: 4.906111},
    address: 'IJpromenade 1, 1031 KT Amsterdam',
    website: 'https://www.eyefilm.nl/',
  },

  {
    id: 'anne-frank-house',
    name: 'Anne Frank House',
    province: 'North Holland',
    coords: {latitude: 52.375218, longitude: 4.880655},
    address: 'Prinsengracht 263-267, 1016 GV Amsterdam',
    website: 'https://www.annefrank.org/',
  },

  {
    id: 'rijksmuseum-twenthe',
    name: 'Rijksmuseum Twenthe',
    province: 'Overijssel',
    coords: {latitude: 52.224722, longitude: 6.893056},
    address: 'Langestraat 97, 7511 EN Enschede',
    website: 'https://rijksmuseumtwenthe.nl/',
  },
  {
    id: 'museum-de-fundatie',
    name: 'Museum de Fundatie',
    province: 'Overijssel',
    coords: {latitude: 52.515556, longitude: 6.093889},
    address: 'Blijmarkt 20, 8011 NE Zwolle',
    website: 'https://www.museumdefundatie.nl/',
  },

  {
    id: 'drents-museum',
    name: 'Drents Museum',
    province: 'Drenthe',
    coords: {latitude: 52.991944, longitude: 6.564444},
    address: 'Bakkerstraat 2, 9400 AA Assen',
    website: 'https://drentsmuseum.nl/',
  },

  {
    id: 'fries-museum',
    name: 'Fries Museum',
    province: 'Friesland',
    coords: {latitude: 53.200556, longitude: 5.794444},
    address: 'Wilhelminaplein 92, 8911 BS Leeuwarden',
    website: 'https://www.friesmuseum.nl/',
  },

  {
    id: 'groninger-museum',
    name: 'Groninger Museum',
    province: 'Groningen',
    coords: {latitude: 53.218806, longitude: 6.570236},
    address: 'Museumstraat 1, 9711 ME Groningen',
    website: 'https://www.groningermuseum.nl/',
  },

  {
    id: 'mauritshuis',
    name: 'Mauritshuis',
    province: 'South Holland',
    coords: {latitude: 52.0804, longitude: 4.3143},
    address: 'Plein 29, 2511 CS Den Haag',
    website: 'https://www.mauritshuis.nl/',
  },
  {
    id: 'kunstmuseum-den-haag',
    name: 'Kunstmuseum Den Haag',
    province: 'South Holland',
    coords: {latitude: 52.089883, longitude: 4.28059},
    address: 'Stadhouderslaan 41, 2517 HV Den Haag',
    website: 'https://www.kunstmuseum.nl/',
  },
  {
    id: 'panorama-mesdag',
    name: 'Museum Panorama Mesdag',
    province: 'South Holland',
    coords: {latitude: 52.076111, longitude: 4.3},
    address: 'Zeestraat 65, 2518 AA Den Haag',
    website: 'https://www.panorama-mesdag.nl/',
  },
  {
    id: 'escher-in-het-paleis',
    name: 'Escher in Het Paleis',
    province: 'South Holland',
    coords: {latitude: 52.079722, longitude: 4.312222},
    address: 'Lange Voorhout 74, 2514 EH Den Haag',
    website: 'https://www.escherinhetpaleis.nl/',
  },
  {
    id: 'kek-rotterdam-boijmans',
    name: 'Museum Boijmans Van Beuningen',
    province: 'South Holland',
    coords: {latitude: 51.914214, longitude: 4.473341},
    address: 'Museumpark 18-20, 3015 CX Rotterdam',
    website: 'https://www.boijmans.nl/',
  },
  {
    id: 'kunsthal-rotterdam',
    name: 'Kunsthal Rotterdam',
    province: 'South Holland',
    coords: {latitude: 51.9108, longitude: 4.47341},
    address: 'Museumpark 10, 3015 CB Rotterdam',
    website: 'https://www.kunsthal.nl/',
  },
  {
    id: 'singer-laren',
    name: 'Singer Laren',
    province: 'North Holland',
    coords: {latitude: 52.259381, longitude: 5.221519},
    address: 'Morsweg 52, 1251 GS Laren',
    website: 'https://www.singerlaren.nl/',
  },

  {
    id: 'kroller-muller',
    name: 'Kröller-Müller Museum',
    province: 'Gelderland',
    coords: {latitude: 52.09583, longitude: 5.81694},
    address: 'Houtkampweg 6, 6731 AW Otterlo',
    website: 'https://krollermuller.nl/',
  },
  {
    id: 'museum-more',
    name: 'Museum MORE (Gorssel)',
    province: 'Gelderland',
    coords: {latitude: 52.199583, longitude: 6.223},
    address: 'H.J. van Heekplein 1, 7211 GJ Gorssel',
    website: 'https://museum-more.nl/',
  },
  {
    id: 'palais-het-loo',
    name: 'Paleis Het Loo (museum & gardens)',
    province: 'Gelderland',
    coords: {latitude: 52.195, longitude: 5.964167},
    address: 'Koninklijk Park 1, 7315 JA Apeldoorn',
    website: 'https://www.paleishetloo.nl/',
  },

  {
    id: 'bonnefantenmuseum',
    name: 'Bonnefantenmuseum',
    province: 'Limburg',
    coords: {latitude: 50.842508, longitude: 5.701834},
    address: 'Avenue Ceramique 250, 6221 KX Maastricht',
    website: 'https://www.bonnefanten.nl/',
  },

  {
    id: 'van-abbemuseum',
    name: 'Van Abbemuseum',
    province: 'North Brabant',
    coords: {latitude: 51.434722, longitude: 5.481944},
    address: 'Paulus Potterstraat 50, 5613 DM Eindhoven',
    website: 'https://vanabbemuseum.nl/',
  },
  {
    id: 'noordbrabants-museum',
    name: 'Noordbrabants Museum',
    province: 'North Brabant',
    coords: {latitude: 51.685, longitude: 5.304722},
    address: "Verwerijstraat 41, 5211 HT 's-Hertogenbosch",
    website: 'https://www.noordbrabantsmuseum.nl/',
  },
  {
    id: 'design-museum-den-bosch',
    name: 'Design Museum Den Bosch',
    province: 'North Brabant',
    coords: {latitude: 51.686944, longitude: 5.301111},
    address: "Korte Putstraat 5, 5211 TB 's-Hertogenbosch",
    website: 'https://www.designmuseumdenbosch.nl/',
  },

  {
    id: 'centraal-museum-utrecht',
    name: 'Centraal Museum (Utrecht)',
    province: 'Utrecht',
    coords: {latitude: 52.083331, longitude: 5.125831},
    address: 'Achter Clarenburg 1, 3511 JJ Utrecht',
    website: 'https://www.centraalmuseum.nl/',
  },
  {
    id: 'museum-speelklok',
    name: 'Museum Speelklok',
    province: 'Utrecht',
    coords: {latitude: 52.099167, longitude: 5.123056},
    address: 'Lange Nieuwstraat 35, 3512 PN Utrecht',
    website: 'https://www.museumspeelklok.nl/',
  },

  {
    id: 'bonnefanten',
    name: 'Bonne­fantenmuseum (Maastricht) - duplicate note',
    province: 'Limburg',
    coords: {latitude: 50.842508, longitude: 5.701834},
    address: 'Avenue Ceramique 250, 6221 KX Maastricht',
    website: 'https://www.bonnefanten.nl/',
  },

  {
    id: 'teylers-museum',
    name: 'Teylers Museum',
    province: 'North Holland',
    coords: {latitude: 52.380592, longitude: 4.639992},
    address: 'Spaarne 16, 2011 CH Haarlem',
    website: 'https://www.teylersmuseum.nl/',
  },

  {
    id: 'frans-hals-museum',
    name: 'Frans Hals Museum',
    province: 'North Holland',
    coords: {latitude: 52.372664, longitude: 4.633331},
    address: 'Groot Heiligland 62, 2011 ES Haarlem',
    website: 'https://www.franshalsmuseum.nl/',
  },

  {
    id: 'museum-voorlinden',
    name: 'Museum Voorlinden',
    province: 'South Holland',
    coords: {latitude: 52.118578, longitude: 4.346003},
    address: 'Willem van Aelstlaan 10, 2243 ZG Wassenaar',
    website: 'https://www.voorlinden.nl/',
  },

  {
    id: 'museum-beelden-aan-zee',
    name: 'Museum Beelden aan Zee',
    province: 'South Holland',
    coords: {latitude: 52.104444, longitude: 4.27},
    address: 'Duinweg 12, 2586 JK Scheveningen (Den Haag)',
    website: 'https://www.beeldenaanzee.nl/',
  },

  {
    id: 'museum-de-lakenhal',
    name: 'Museum De Lakenhal (Leiden)',
    province: 'South Holland',
    coords: {latitude: 52.158333, longitude: 4.493333},
    address: 'Museumstraat 1, 2312 ER Leiden',
    website: 'https://www.lakenhal.nl/',
  },

  {
    id: 'museum-zwolle',
    name: 'Museum de Fundatie (extended entry)',
    province: 'Overijssel',
    coords: {latitude: 52.516389, longitude: 6.093611},
    address: 'Blijmarkt 20, 8011 NE Zwolle',
    website: 'https://www.museumdefundatie.nl/',
  },
  {
    id: 'zeeuws-museum',
    name: 'Zeeuws Museum',
    province: 'Zeeland',
    coords: {latitude: 51.501944, longitude: 3.607222},
    address: 'Lange Delft 68, 4311 GB Middelburg',
    website: 'https://www.zeeuwsmuseum.nl/',
  },

  {
    id: 'batavialand',
    name: 'Batavialand (Maritime / museum - Lelystad)',
    province: 'Flevoland',
    coords: {latitude: 52.518333, longitude: 5.480556},
    address: 'Bataviahaven 1, 8256 RX Lelystad',
    website: 'https://www.batavialand.nl/',
  },

  {
    id: 'nederlands-architectuur-instituut',
    name: 'Het Nieuwe Instituut (Rotterdam)',
    province: 'South Holland',
    coords: {latitude: 51.915, longitude: 4.4825},
    address: 'Museumpark 25, 3015 CB Rotterdam',
    website: 'https://www.hetnieuweinstituut.nl/',
  },

  {
    id: 'museum-de-plas',
    name: 'Museum Catharijneconvent (Utrecht) - religious art & heritage',
    province: 'Utrecht',
    coords: {latitude: 52.093056, longitude: 5.120556},
    address: 'Lange Nieuwstraat 38, 3512 PH Utrecht',
    website: 'https://www.catharijneconvent.nl/',
  },

  {
    id: 'museum-wassenaar',
    name: 'Pulchri Studio (The Hague) - gallery & museum studio',
    province: 'South Holland',
    coords: {latitude: 52.079167, longitude: 4.300556},
    address: 'Prinsessegracht 4-6, 2514 AN Den Haag',
    website: 'https://pulchri.nl/',
  },

  {
    id: 'ontwerp-museum-tilburg',
    name: 'De Pont (Tilburg)',
    province: 'North Brabant',
    coords: {latitude: 51.569167, longitude: 5.091111},
    address: 'Wilhelminapark 1, 5041 EC Tilburg',
    website: 'https://depont.nl/',
  },

  {
    id: 'koninklijk-museum',
    name: 'Het Loo (note: palace entry restored above)',
    province: 'Gelderland',
    coords: {latitude: 52.195, longitude: 5.964167},
    address: 'Koninklijk Park 1, 7315 JA Apeldoorn',
    website: 'https://www.paleishetloo.nl/',
  },

  {
    id: 'museum-kunstkeramiek',
    name: 'GEM Museum of Contemporary Art (Den Haag) — now part of Kunstmuseum operations',
    province: 'South Holland',
    coords: {latitude: 52.090556, longitude: 4.280278},
    address: 'Stadhouderslaan 50, 2517 HV Den Haag (see Kunstmuseum)',
    website: 'https://www.kunstmuseum.nl/',
  },

  {
    id: 'cobra-museum',
    name: 'Cobra Museum of Modern Art',
    province: 'North Holland (Amstelveen)',
    coords: {latitude: 52.303798, longitude: 4.857981},
    address: 'Sandbergplein 1, 1181 ZX Amstelveen',
    website: 'https://cobra-museum.nl/',
  },

  {
    id: 'museum-heten',
    name: 'NXT Museum (Amsterdam) - immersive new media',
    province: 'North Holland',
    coords: {latitude: 52.3725, longitude: 4.889167},
    address: 'Lijnbaansgracht 238, 1017 PH Amsterdam',
    website: 'https://www.nxtmuseum.nl/',
  },

  {
    id: 'museum-kunst',
    name: 'Museum Beelden aan Zee (repeat-check)',
    province: 'South Holland',
    coords: {latitude: 52.104444, longitude: 4.27},
    address: 'Duinweg 12, 2586 JK Scheveningen',
    website: 'https://www.beeldenaanzee.nl/',
  },

  {
    id: 'museum-marine',
    name: 'Vermeer Centrum Delft (Delft) - art centre',
    province: 'South Holland',
    coords: {latitude: 52.011667, longitude: 4.359722},
    address: 'Voldersgracht 21, 2611 EV Delft',
    website: 'https://www.vermeercentrumdelft.nl/',
  },

  {
    id: 'museum-cultureel',
    name: 'Van Abbemuseum (repeat-check)',
    province: 'North Brabant',
    coords: {latitude: 51.434722, longitude: 5.481944},
    address: 'Domineestraat / Paulus Potterstraat, Eindhoven',
    website: 'https://vanabbemuseum.nl/',
  },
]
