import json
import csv
from textblob import TextBlob

def calcSentiment_multiple(CleanTwitterDataSets):
	average_sentiment = 0
	total = 0
	lengthDataSet = len(CleanTwitterDataSets)
	OneTweetTime = []
	output_file = "output_sentiment.csv"

	# open csv
	with open (output_file,"a") as twitterOutput:
		writer = csv.writer(twitterOutput)
		for singleCleanSet in CleanTwitterDataSets:
			output = calcSentiment(singleCleanSet)
			
			if output is None:
				lengthDataSet -= 1
			else:
				total += output[1]
				OneTweetTime.append(output[0])

		if lengthDataSet != 0:
			average_sentiment = total / lengthDataSet

		# write to csv
		writer.writerow([OneTweetTime[0],OneTweetTime[(lengthDataSet - 1)],"sentiment:", average_sentiment])


def calcSentiment(input):
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
		# sent the tweet to TextBlob to gain sentiment , the default sentiment analyzer is Pattern
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