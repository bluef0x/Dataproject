import loadin
import filtering
import sentiment
import csv


if __name__ == "__main__":
	
	outputStock_file = "output_stock.csv"
	outputTwitter_file = "output_sentiment.csv"

	# load stock data
	stockData = loadin.loadStockData()

	# write to stockprice file
	with open (outputStock_file,"wb") as cleanData:
			writer = csv.writer(cleanData)

			# write to csv
			writer.writerows([stockData[0],stockData[1],stockData[5],stockData[6],stockData[7],stockData[8],stockData[9]])
	
	# load twitter data
	#twitterData = loadin.loadTwitterData()

	# for each set of 5 files run the full process
	for twitterDataSet in loadin.main():
		# load filtered twitterdata
		cleanTwitterData = filtering.filter_multiple(twitterDataSet)

		# Make outputfile with sentiment
		sentimentData = sentiment.calcSentiment_multiple(cleanTwitterData)
		
		# write to twitter outputfile and round time to minutes used for average
		with open (outputTwitter_file,"a") as cleanData:
			writer = csv.writer(cleanData)

			temp = int(round(int(sentimentData[1][14:16])/5)*5)
			closeTimeId = "".join([sentimentData[1][0:14],str(temp).zfill(2),":00",sentimentData[1][19:]])

			# write to csv
			writer.writerow([closeTimeId,sentimentData[0],sentimentData[1],sentimentData[2]])
	
	
