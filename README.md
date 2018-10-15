# Dokumentasjon av prosjekt 3 - Webutvikling

## Installering 
For å installere avhengigheter og for å starte serveren til programmet, så navigerer du til prosjektmappa
og kjører disse kommandoene i terminalen din:
```
npm install
expo start
```
Da vil du få opp en QR-code som du scanner i Expo-appen på din telefon som vil bygge prosjektet.

**NB! Huk av 'Production mode' i vinduet som åpnes i nettleseren for best mulig opplevelse av appen.**

![production mode](readme/prod_mode.png)

## Diskusjon


## Beskrivelse av appen

<<<<
Her kommer en beskrivelse av funksjonaliteten til appen.
En gjennomgang over alle funksjoner på alle sidene.

På hver feature så må vi si hvilke komponenter vi har, og hva hver komponent gjør.>>>>


## Bruk av biblioteker
Vi har brukt en del biblioteker: React Native Calendars, React Native Navigation,
React Native Progress, React Native Vector Icons, React Native og randomColor. 

Vi brukte React Native Progress fordi vi trengte en visualisering av hvor langt vi hadde kommet
i prosessen med for eksempel todo-oppgavene og prosessen mot 10000 steg i pedometeret vårt. Etter
ett kjapt google-søk, så fant vi RNP og fant ut at det var akkurat det vi trengte, og at det dekket
begge behovene på en enkel måte. 

Vi brukte randomColor bare for å legge til et ekstra lag med farge og dynamikk i applikasjonen. RandomColor 
er et enkelt bibliotek å bruke, hvor man gir en fargegruppe og en ønsket lyshet, og får en tilfeldig farge
i retur. Dette tok vi i bruk i både kontaktlista og 'Todo'-lista vår. 

## Tutorials

### React Native Navigation 

### React Native Progress 
Vi brukte [React Native Progress](https://github.com/oblador/react-native-progress), som er et bibliotek som implementerer prosessindikatorer i form av 
sirkler og barer. De var veldig intuitive å bruke, og tar egentlig bare inn `progress` som prop, som er 
et tall mellom 0 og 1, hvor 0 er ingen progress og 1 er ferdig. 

#### Installasjon av React Native Progress

RNP kan installeres ved hjelp av npm og kommandoen
```
npm install react-native-progress --save
```

Etter installasjon kan man importere de ulike progress-komponentene ved bruk av ES6-syntax:

```js 
import ProgressBar from 'react-native-progress/Bar';
``` 
for progress-baren brukt i 'Todo'-lista vår, og 
```js
import ProgressCircle from 'react-native-progress/Circle';
```
for sirkelen brukt i 'Pedometeret' vårt.

#### Bruk av React Native Progress

Man kan bruke RNP på ulike måter, både baren og sirkelen kan bruke som laste-indikatorer ved å sette `indeterminate`-propen til `true`. Ellers vil
man kunne bruke de slik vi har gjort, ved å gi de en verdi mellom 0 og 1 for å angi progresjon. 

Da bruker man komponentene direkte på denne måten. 
```js 
<ProgressBar progress={0.5}/>
<ProgressCircle progress={0.5} size={50}/>
```
Det finnes også en mengde andre props som `color`, `borderWidth`, `thickness` osv...

![Demo RNP](readme/RNP.gif)

### React Native Calendars 

Vi valgte å bruke pakken [React Native Calendars](https://github.com/wix/react-native-calendars) for å vise en kalender til brukeren. React Native Calendar, eller RNC på kortform, kan brukes til noe så enkelt som å la brukeren velge en dato, eller noe mer innfløkt som en tidsplanlegger.

Til vårt formål brukte vi bare "Agenda"-komponenten. Her følger en kjapp guide for å få React Native Calendar opp og kjøre i ditt React Native prosjekt.


![agenda demo](readme/agenda.gif)

#### Installasjon av RNC
RNC installeres ved kommandoen

```
$ npm install --save react-native-calendars
```

Etter installasjonen kan komponentene `Calendar`, `CalendarList` og `Agenda` importeres med ES6-syntaksen

```js
import { Calendar, CalendarList, Agenda } from "react-native-calendars"
```

Disse kan brukes direkte via JSX i render-funksjonen i dine React-komponenter. Merk: Vi hadde problemer med å få `Agenda` til å vises på korrekt måte. Det viser seg at man må legge til en minimumshøyde for å få det til å vises korrekt: `<Agenda style={{minHeight: 200}} />`

#### Visning av elementer på kalenderen

RNC kan vise elementer via `items`-egenskapen. Dette objektet er en map / dictionary fra en dato (av type streng) til en liste av elementer. Se eksempel:

```js
render() {
    const items = {
      "2018-05-12": [{text: "Et element"}],
      "2018-05-13": [{text: "Enda ett element"}, {text: "2 på en dag!"}],
      "2018-05-14": []
    };
    return (
      <Agenda
          ...
          items={items}
          ...
      />);
}
```

(OBS: Her brukes tre prikker til å indikere andre egenskaper på Agenda, ikke ES6 spread syntaksen)

Hvordan disse vises på kalenderen må du definere selv. Egenskapen `renderItem` på `Agenda` definerer en funksjon som tar inn et element og returnerer et visbart React-element (F.eks. et JSX-uttrykk). Her er et eksempel på en passende funksjon:

```js
<Agenda
    ...
    renderItem={(item) => {return <View>{item.text}</View>;}}
    ...
/>
```

#### Dynamisk innlasting av data

RNC sier selv i fra når det passer å laste inn mer data. Du kan dermed dynamisk laste inn data når det er behov, f.eks. fra en ekstern web-tjeneste, eller fra AsyncStorage. "callback" for dynamisk lasting gis via egenskapen `loadItemsForMonth`, som argument tar den inn en dato for startdagen i måneden. Det er ikke meningen at den skal returnere noe, vanligvis lagres data på state, og et kall på `loadItemsForMonth` indikerer at du bør utvide datasettet med de dagene i måneden input-argumentet tilhører.

Her er et eksempel på en implentasjon av `loadItemsForMonth`:

```js
loadItems = (dayInMonth) => {
  MyAwesomeAsyncDataFetcher.fetchFullMonthByDay(dayInMonth)
    .then(data => {
      this.setState(prevState => {
        return {items: Object.assign({}, prevState.items, data)};
      });
    });
};
render() {
  return (<Agenda
    ...
    items={this.state.items}
    loadItemsForMonth={this.loadItems}
    ...
  />);
}
```

I eksemplet over later jeg som `MyAwesomeAsyncDataFetcher` er en selvimplementert modul som asynkront henter inn data fra et ekstert endepunkt.

Merk at alle datoene for en måned må finnes som nøkler i `items`-objektet. Dersom en dato ikke er ment å ha noen elementer kan du bruke en tom liste som verdi. Mangel på nøkkel for en dato tolkes som at måneden ikke er ferdig lastet inn ennå.

Vi håper denne korte guiden var hjelpsom for å sette opp React Native Calendars. Bruk gjerne den offisielle [dokumentasjonen](https://github.com/wix/react-native-calendars#usage) til RNC for å få en oversikt over alle mulighetene i RNC, og se vår klasse "CalendarScreen" for hvordan Agenda kan brukes i en React Native app.

### Jest (?)
