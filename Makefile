pullData:
	scp -r pi@192.168.1.91:~/BarBot/src/server/db/data ./src/server/db/
rem:
	make pullData && scp -r ./src pi@192.168.1.91:~/BarBot/
