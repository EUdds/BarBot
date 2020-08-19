pullData:
	scp -r pi@barbot:~/BarBot/src/server/db/data ./src/server/db/
rem:
	make pullData && scp -r ./src pi@barbot:~/BarBot/
