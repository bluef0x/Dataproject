''' Jeroen Meijaard 10611002 '''

import json
import os
import errno
import calendar
import sys
import time
from dateutil import parser

def loadTwitterData(filepath='00.json'):
	''' Load in twitterdata'''
	twitterData = []

	print 'Loading', filepath

	with open(filepath) as data_file:
		for line in data_file:
			twitterData.append(json.loads(line))
		print len(twitterData) 
	return twitterData

def loadStockData():
	''' Load in stock data'''
	stockData = []
	dataObjects = []

	with open('US2.AAPL_120101_120131(1).txt') as data_file:
		inputFileList = [line.rstrip('\n').split('\r') for line in data_file]

		for line in inputFileList[0]:
			stockData.append(line.split(','))
		
		for i,line in enumerate(stockData):
			if i == 0:
				print "hello"
				header = ["close_time","TICKER","OPEN","HIGH","LOW","CLOSE","VOL"]
				print header[0]

				for i,part in enumerate(line):
					line.remove(line[i])
					# line.insert(0,header[i + 1])

			else:
				dateObject = parser.parse(str(stockData[i][2] + stockData[i][3]))
				temp1 = dateObject.strftime("%a %b %d %H:%M:%S %Y")
				temp2 = temp1.split(" ")
				temp2.insert(4,"+0000")
				temp3 = " ".join(temp2)
				line.insert(0,str(temp3))
			# print line
	# print stockData
	return stockData
#Sun Jan 01 07:00:59 +0000 2012

def generate_paths(root_path =' '):
	''' generate paths for all files in folder '''

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
			for minute in range(0,60):
				if minute < 10:
					minute = str(minute).zfill(2)
				else:
					minute = str(minute)

				temp = "/".join([root_path,str(year),str(month).zfill(2),day,hour,minute])
				temp = temp + ".json" 

				yield temp

def loadFiles(paths, n = 5):
	files = []
	for i,path in enumerate(paths):
		# load file
		try:
			files.append(loadTwitterData(path))
			if (i + 1) % n == 0:
				yield files
				files = []

		# error handling
		except IOError as e:
			print(os.strerror(e.errno))
			print "%s not found" %(path)
			pass
		
#use Os.path.walk python to load multiple files # does not work!! To heavy ram use!!
# def loadAllJSON(root_path):
# 	alldata = []

# 	for root, directories, filenames in os.walk(root_path):
# 		print root
# 		for filename in filenames:
# 			if filename.endswith('json'):
# 				alldata.extend(loadTwitterData(os.path.join(root, filename)))

def main():

	root_path = "/Users/jeroen_meijaard48/Downloads"

	t0 = time.time()
	paths = generate_paths(root_path)	
	#paths = ["/somepath/something"]
	test = loadFiles(paths,60)

	print 'Took %.2f seconds' % (time.time() - t0)

	return test

if __name__ == '__main__':
	pass


