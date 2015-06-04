import json
data = []

with open('00.json') as data_file:
	for line in data_file:
		data.append(json.loads(line)) 

print(data)