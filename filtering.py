import json

aapl_keywords_set=set(["apple","iphone","iphone4","iphone4s","ipad","mac","ios","siri","itunes","ipod","icloud","appstore","macbook"])

def filter_multiple(twitterFiles):
	cleandata = []
	for singleTwitterJsonFile in twitterFiles:
		cleandata.append(filter(singleTwitterJsonFile))
	print len(cleandata)
	return cleandata	

def filter(singleTwitterJsonFile):
	tweets_data = []
	output = []

	backup_file = "output_filter.json"

	for line in singleTwitterJsonFile:
		tweets_data.append(line)
			
	with open(backup_file,"w+") as file_output:
		for tweet in tweets_data:
			# filter out deleted tweet
			if tweet.get("user"):
				#filter English tweet
				if tweet["user"]["lang"]=="en":
					#split tweet into words and make it lowercase 
					tweet_words = tweet["text"].split()
					tweet_words=[x.lower() for x in tweet_words]
					#convert tweet to set for looking up intersection
					tweet_words_set = set(tweet_words)
					#get the intersection between tweet_words_set and keywords_set
					intersection = set.intersection(tweet_words_set,aapl_keywords_set)
					#if keyword is found in tweet, add the tweet to output file
					if intersection:
						output.append(tweet)
						# write to test file
						json.dump(tweet,file_output)
						file_output.write("\n")
	for i,j in enumerate(output):
		print output[i]["text"]
	return output
