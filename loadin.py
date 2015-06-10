import json
import os

def loadTwitterData(filename='00.json'):
	''' Load in twitterdata'''
	twitterData = []

	print 'Loading', filename

	with open(filename) as data_file:
		for line in data_file:
			twitterData.append(json.loads(line))
		print len(twitterData) 
	return twitterData

def loadStockData():
	''' Load in stock data'''
	stockData = []

	with open('AAPL_120101_120131.txt') as data_file:
		stockData = data_file.readlines()

	return stockData

def get_path(root_path=' '):
	''' give paths for five input files at a time '''
	import calendar

	
	paths = []
	cal = calendar.Calendar()
	year = 2012
	month = 1

	# for year in file_directory:
	# 	for month in year:
	days = [d for d in cal.itermonthdays(year, month) if d != 0]
	for day in days:
		if day < 10:
			day = str(day).zfill(2)
		else:
			day = str(day)
		for hour in range(0,23):
			if hour < 10:
				hour = str(hour).zfill(2)
			else:
				hour = str(hour)
			for minute in range(0,59):
				if minute < 10:
					minute = str(minute).zfill(2)
				else:
					minute = str(minute)

				temp = "/".join([root_path,str(year),str(month),day,hour,minute]) 

				paths.append([temp])
	print paths[days[0]]
	return paths

def generate_paths(root_path =' '):
	''' give paths for five input files at a time '''
	import calendar

	paths = []
	cal = calendar.Calendar()
	year = 2012
	month = 1

	# for year in file_directory:
	# 	for month in year:
	days = [d for d in cal.itermonthdays(year, month) if d != 0]
	for day in days:
		if day < 10:
			day = str(day).zfill(2)
		else:
			day = str(day)
		for hour in range(0,23):
			if hour < 10:
				hour = str(hour).zfill(2)
			else:
				hour = str(hour)
			for minute in range(0,59):
				if minute < 10:
					minute = str(minute).zfill(2)
				else:
					minute = str(minute)

				temp = "/".join([root_path,str(year),str(month),day,hour,minute]) 

				yield temp


#use Os.path.walk python to load multiple files # does not work!! To heavy ram use!!
def loadAllJSON(root_path):
	alldata = []

	for root, directories, filenames in os.walk(root_path):
		print root
		for filename in filenames:
			if filename.endswith('json'):
				alldata.extend(loadTwitterData(os.path.join(root, filename)))


if __name__ == '__main__':
	import sys
	import time

	normal_path = "/Users/jeroen_meijaard48/Downloads/2012/01/01/00/13.json"

	root_path = "/Users/jeroen_meijaard48/Downloads"

	t0 = time.time()
	# l = loadAllJSON(sys.argv[1])
	#test = get_path(rooth_path)
	generator = generate_paths(root_path)
	for i in generator:
		print next(generator)
	print next(generator)


	

	# print 'There were %d lines' % len(l)
	print 'Took %.2f seconds' % (time.time() - t0)

