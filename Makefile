BARBOT_USERNAME		:= pi
BARBOT_IP			:= barbot
BARBOT_REMOTE_PATH	:= ~/BarBot

pullData:
	scp -r $(BARBOT_USERNAME)@$(BARBOT_IP):$(BARBOT_REMOTE_PATH)/src/server/http_socket/db/data ./src/server/http_socket/db/
rem:
	make pullData && scp -r ./src pi@barbot:$(BARBOT_REMOTE_PATH)
