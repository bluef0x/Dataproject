import loadin
import filtering
import sentiment


if __name__ == "__main__":
	twitterData = loadin.loadTwitterData()
	stockData = loadin.loadStockData()

	cleanTwitterData = filtering.filter(twitterData)

	sentimentData = sentiment.calcSentiment(cleanTwitterData)
