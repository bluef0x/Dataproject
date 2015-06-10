import json
import csv
from textblob import TextBlob

def calcSentiment(input):
	tweets_data = []
	sentiment_array = []
	total = 0

	output_file = "output_sentiment.csv"

	# load input
	for line in input :
		tweets_data.append(line)
	# open csv
	with open (output_file,"wb") as twitterOutput:
		writer = csv.writer(twitterOutput)
		# iterate over all tweets
		for tweet_data in tweets_data:
			tweet = tweet_data["text"]
			# sent the tweet to TextBlob to gain sentiment , the default sentiment analyzer is Pattern
			tweet = TextBlob(tweet)
			
			# remove empty lines
			tweet = tweet.replace("\n", " ")
			tweet = tweet.replace("\r "," ")
			sentiment = tweet.sentiment.polarity
			sentiment_array.append(sentiment)

		for sentiment in sentiment_array:
			total += sentiment

		average_sentiment = total / len(sentiment_array)
		print average_sentiment
		writer.writerow([tweet_data[0]["created_at"],"sentiment:", average_sentiment])













# tweet = TextBlob(tweet,analyzer=NaiveBayesAnalyzer())