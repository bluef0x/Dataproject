Raamwerk Dataproject

MVP (Minimal viable product)

Het belangrijkste onderdeel van het product dient middels een grafiek inzicht te geven in het verband tussen het twittersentiment en de prijsfluctuaties van de social media stocks.
Hiervoor dient de twitterdata wordt per file te worden doorzocht op basis van de juiste woorden die het twittersentiment moeten gaan vormen.  
Het twittersentiment wordt vastgesteld door het alle gevonden twitterberichten (die gerelateerd zijn aan het aandeel) op een bepaald tijdsmoment. Om het sentiment te kunnen herkennen in de twitterberichten zal gebruikt worden gemaakt van de libary sentiment. De functie sentiment doorzoekt woorden naar het sentiment en returned een (polarity, subjectivity)-tuple.

![UIdashboard](https://github.com/bluef0x/Dataproject/edit/master/docs/UIdashboard.jpg?raw=true "Dashboard")

Zoals in de geschetste UI te zien is, zal de eerste grafiek bestaan uit de data van het  twitersentiment afgezet tegen de koersontwikkeling. Deze data zal verkregen worden via de bovengenoemde methode. Echter zal er een array zijn per tijdsmoment die de volgende index zal hebben:

[tijd, twittersentiment(getal), Closeprijs,Opening prijs, volume]

Ook zal de grafiek daaronder de prijsfluctuatie binnen de tijdsperiode aangeven aan de hand van candlesticks in een lijn plot. Zo krijgt de gebruiker inzicht in hetgeen wat er gebeurd binnen de gekozen tijdssprongen in de grafiek erboven.

Daarnaast zullen er ook financiële indicatoren worden berekend  en  is er de mogelijkheid om het verhandelde volume te zien in twee verschillende boxen.

Optioneel

Dashboard: 
-	Niewsfeed van het geselecteerd prijsmoment
De nieuwsfeed kan gescrapt worden van de bloomberg website. Hierdoor krijgt de gebruiker extra inzicht in wat de media al gepubliceerd heeft. Men kan dan  een overweging maken , welk gedeelte van het twttersentiment al in de koersprijs verwerkt is.

Data:
-	Grafiek met Correlatie tussen twitter sentiment en koersprijs
-	Informatiebox met statistisch informatie over de data


Classes:

Function loadin (input: raw data)
(output: loaded data voor makeCleanData)

Function  makeCleanData (input: loaded data)
	(output: Clean data voor visulisatie)

Per visualisatie:








Sketches:

API'S en raamwerken:

D3,
Bootstrap,
Pattern
sentiment

Databronnen:
Finam (http://www.finam.ru/analysis/profile041CA00007/default.asp)
Archive (https://archive.org/details/archiveteam-twitter-stream-2012-01)

Optioneel

bloomberg www.bloomberg.nl

