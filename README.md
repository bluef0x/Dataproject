# Dataproject
Project voor de Minor Programmeren UvA
Voorstel: Social media stock

Social media stock price fluctuations by twitter information


Jeroen Meijaard







 

(bron: https://img.youtube.com/vi/oGhau1Y8vXQ/hqdefault.jpg?h=90&w=120&sigh=__MyZcsWZJdkxO3vi6A0zpf5cS6rY= , geraadpleegd op 27 mei 2015)


Doelen:
-	Inzicht verschaffen in de relatie tussen het sentiment over een bedrijf op twitter en prijsontwikkeling van een van de social media aandelen (TWITTER, TESLA, APPLE  etc..).




1. Features voor gebruikers.

De gebruiker zal inzicht krijgen in de relatie tussen het sentiment over een bedrijf op twitter en prijsontwikkeling van een social media aandelen (TESLA, APPLE  etc..). Een overzicht te geven in belangrijke historische gebeurtenissen voor het bedrijf.

De gebruiker kan interactief in de kaart de historische gebeurtenissen opzoeken, zodat de impact op de aandeelprijs vergeleken kan worden.

2. Schets van de visualisatie

De visualisatie zal de gebruiker een lineplot laten zien waarin de data geplot is over een bepaalde tijdsperiode. Op de x-as waar de tijd is aangegeven zullen ook de historische gebeurtenissen weergeven zijn, waar de gebruiker op kan klikken om extra informatie te krijgen.

De y-as zal gebruikt worden om de prijs van het aandeel en het sentiment te plotten.

 

3. Data

Voor het verkrijgen van de benodigde twitter data kunnen de volgende bronnen worden gebruikt.
Data voor het sentiment kan worden verkregen via de api: http://www.followthehashtag.com of http://snapbird.org/

Eventueel kan er nog terug gevallen worden op de twitterdata verkregen uit januari 2012 ten behoeve van het scriptie onderzoek  op de onderstaande link is gepost.
https://archive.org/details/archiveteam-twitter-stream-2012-01

Historische social media aandelen prijzen.
http://finance.yahoo.com/q/hp?s=YHOO

Voor het bepalen van het sentiment kan de code uit onderstaande scriptie gebruikt worden.

The Impacts of Information on Stock Prices Assessed by Social Media Sentiment, Guangxue Cao




4. Onderdelen visualisatie

- Data transformatie via de voorontwikkelde script van bovengenoemde scriptie t.b.v. sentiment.

- Maken lineplot in D3 of canvas (afhankelijk van de grootte van de te tijdsperiode)

- Line plotten voor koers ontwikkeling en sentiment

- Toevoegen historische gebeurtenissen

- Optioneel: Keuze menu voor het laden van meerdere datapunten.

5. Platform

Zoals in de paragraaf data al besproken zal ik gebruik maken van followthehastag.com om de data aangeleverd te krijgen. Dit platform geeft de mogelijkheid om excel documenten uit te geven.

Hierover dient nog een visualisatie laag gebouwd te worden met d3. De historische data zullen worden gescraped met behalve van de DOM API.

6. Potentiële problemen

Een mogelijk probleem is dat ik maar een uit een korte tijdsperiode (2 maanden) data van twitter kan verkrijgen.  Dit is afhankelijk van de api die ik gebruik. Dit kan overkomen worden door de toevoeging te doen om voor meerdere aandelen de visualisatie te maken. Hierdoor kan men, danwel over een korte tijdsperiode,  de onderlinge verwantschap en sterkte van prijsfluctuaties in de aandelen vergelijken.

Een ander mogelijk probleem bij het gebruik van d3 is het aantal punten. Echter wordt door het bepalen van de sentiment waarde in het python script al samengevoegd voordat het in javascript ingeladen dient te worden.

7.  Overview gerelateerde en bestaande visualizaties

Onderstaande site weergeeft tweets op een geografische kaart weer maar gebruikt geen sentiment om aan de aandeelprijs te relateren.
http://tweetmap.mapd.com/desktop/

Hoewel ook het ook niet echt in de buurt komt van het voorstel laat deze visualisatie het sentiment zien bij het invoeren van een bepaalde key. 
http://www.csc.ncsu.edu/faculty/healey/tweet_viz/tweet_app/

Alleen betaalde tools kunnen visualisaties maken die vergelijkbaar kunnen zijn. Echter zal deze applicaties zich vooral focussen op de historische prijzen in plaats van real time datafeeds.
http://www.pentaho.com/resource/analyzer-on-mongodb-video









