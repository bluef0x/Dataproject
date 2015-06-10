import loadin
import filtering
import sentiment


if __name__ == "__main__":
	
	# load stock data
	stockData = loadin.loadStockData()

	# load twitter data
	#twitterData = loadin.loadTwitterData()
	for twitterData in loadin.main():
		# load filtered twitterdata
		cleanTwitterData = filtering.filter_multiple(twitterData)

		# Make outputfile with sentiment
		sentimentData = sentiment.calcSentiment_multiple(cleanTwitterData)

	
	
