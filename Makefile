pullData:
	scp -r pi@barbot:~/BarBot/src/server/http_socket/db/data ./src/server/http_socket/db/
rem:
	make pullData && scp -r ./src pi@barbot:~/BarBot/
