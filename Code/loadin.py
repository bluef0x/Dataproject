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

	# get data from file to array
	with open(filepath) as data_file:
		for line in data_file:
			twitterData.append(json.loads(line))
	return twitterData

def loadStockData():
	''' Load in stock data'''
	stockData = []
	dataObjects = []

	# open input file and write to csv
	with open('US2.GOOG_120101_120131.txt') as data_file:
		inputFileList = [line.rstrip('\n').strip('\r') for line in data_file]
		# for apple stock, remove strip('\r') and use split('\r')

		for line in inputFileList:
			stockData.append(line.split(','))
		
		for i,line in enumerate(stockData):
			if i == 0:
				# write header
				header = ["close_time","TICKER","OPEN","HIGH","LOW","CLOSE","VOL"]
				print header[0]

				for i,part in enumerate(line):
					line.remove(line[i])
					# line.insert(0,header[i + 1])

			else:
				# write data
				print stockData[i]
				dateObject = parser.parse(str(stockData[i][2] + stockData[i][3]))
				timeobject = dateObject.strftime("%a %b %d %H:%M:%S %Y")
				temp2 = timeobject.split(" ")
				temp2.insert(4,"+0000")
				temp3 = " ".join(temp2)
				line.insert(0,str(temp3))
	return stockData

def generate_paths(root_path =' '):
	''' generate paths for all files in folder '''

	paths = []
	cal = calendar.Calendar()
	year = 2012
	month = 1

	# generate day,hour,minute for pathname
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
	''' load a determined amount of 1 minute twitter files '''
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

	# give rootpath
	root_path = "/Users/jeroen_meijaard48/Downloads"

	t0 = time.time()
	paths = generate_paths(root_path)	
	#paths = ["/somepath/something"]

	# load 5 files at a time
	test = loadFiles(paths,5)

	# print amount of time needed for run
	print 'Took %.2f seconds' % (time.time() - t0)

	return test

if __name__ == '__main__':
	pass


