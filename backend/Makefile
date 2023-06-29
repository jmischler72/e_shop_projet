.SILENT: build


reset_db:
	if sudo mysql -u root < MariaDB_BuildFile; then \
		echo succeeded; \
	else \
		echo setup failed; \
	fi

setup_db:
	sudo apt install -y mariadb-server
	reset_db


start_db:
	sudo service mariadb start
	reset_db
