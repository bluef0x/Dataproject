import json
import csv
from textblob import TextBlob

def calcSentiment_multiple(CleanTwitterDataSets):
	''' run sentiment calculation times amount of files chosen to load in each time (default is 5)'''
	average_sentiment = 0
	total = 0
	lengthDataSet = len(CleanTwitterDataSets)
	OneTweetTime = []

	# calculate average sentiment for all selected files each time
	for singleCleanSet in CleanTwitterDataSets:
		output = calcSentiment(singleCleanSet)
		
		if output is None:
			lengthDataSet -= 1
		else:
			total += output[1]
			OneTweetTime.append(output[0])

	# if dataset is not empty, calulate averagesentiment
	if lengthDataSet != 0:
		average_sentiment = total / lengthDataSet
		# write to csv
		return [str(OneTweetTime[0]),str(OneTweetTime[(lengthDataSet - 1)]), average_sentiment]


def calcSentiment(input):
	''' calculate sentiment for each twitterfile and average this'''
	tweets_data = []
	sentiment_array = []
	total = 0
	OneTweetTime = ""
	average_sentiment = 0

	# load input
	for line in input:
		tweets_data.append(line)

	# iterate over all tweets
	for tweet_data in tweets_data:
		tweet = tweet_data["text"]
		# analyze tweet with TextBlob to gain sentiment
		tweet = TextBlob(tweet)

		OneTweetTime = tweet_data["created_at"]
		
		# remove empty lines
		tweet = tweet.replace("\n", " ")
		tweet = tweet.replace("\r "," ")
		sentiment = tweet.sentiment.polarity
		sentiment_array.append(sentiment)

	for sentiment in sentiment_array:
		total += sentiment

	if len(sentiment_array) != 0:
		average_sentiment = total / len(sentiment_array)
		return [OneTweetTime, average_sentiment]
	# writer.writerow([OneTweetTime,"sentiment:", average_sentiment])













# tweet = TextBlob(tweet,analyzer=NaiveBayesAnalyzer())