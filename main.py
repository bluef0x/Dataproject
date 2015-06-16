import loadin
import filtering
import sentiment
import csv
import pandas as pd 

class BadLineException(Exception):
	def __init__(self, i, line):
		self.i = i
		self.line = line

	def __str__(self):
		return 'Line %d is wrong.' % self.i

if __name__ == "__main__":
	
	outputStock_file = "output_stock.csv"
	outputTwitter_file = "output_sentiment.csv"

	# # # load stock data
	# stockData = loadin.loadStockData()

	# # write to stockprice file
	# with open(outputStock_file, "wb") as f:
	# 		writer = csv.writer(f)
	# 		#print stockData

	# 		for i, line in enumerate(stockData):
	# 			# write to csv
	# 			try:
	# 				if len(line) < 10:
	# 					raise BadLineException(i, line)
	# 			except BadLineException as e:
	# 				print e
	# 				print 'Its value:\n', e.line
	# 			else:
	# 				writer.writerow([line[0], line[1], line[5], line[6], line[7], line[8], line[9]])
	
	# # load twitter data
	# #twitterData = loadin.loadTwitterData()

	# # for each set of 5 files run the full process
	# for twitterDataSet in loadin.main():
	# 	# load filtered twitterdata
	# 	cleanTwitterData = filtering.filter_multiple(twitterDataSet)

	# 	# Make outputfile with sentiment
	# 	sentimentData = sentiment.calcSentiment_multiple(cleanTwitterData)
		
	# 	# write to twitter outputfile and round time to minutes used for average
	# 	with open (outputTwitter_file,"a") as cleanData:
	# 		writer = csv.writer(cleanData)

	# 		temp = int(round(int(sentimentData[1][14:16])/5)*5)
	# 		closeTimeId = "".join([sentimentData[1][0:14],str(temp).zfill(2),":00",sentimentData[1][19:]])

	# 		# write to csv
	# 		writer.writerow([closeTimeId,sentimentData[0],sentimentData[1],sentimentData[2]])
	
	#merge twitter and stock output
	dfile1 = pd.read_csv(outputTwitter_file)
	dfile2 = pd.read_csv(outputStock_file)
	dfile = pd.merge(dfile1,dfile2)
	print dfile1.head()
	print dfile2.head()

	result = dfile.to_csv('output_aapl.csv',index=False)
	
