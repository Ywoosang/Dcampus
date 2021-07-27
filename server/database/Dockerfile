FROM mysql:5.6

ENV  MYSQL_ALLOW_EMPTY_PASSWORD=1
COPY setup.sql /mysql/setup.sql
RUN chmod 755 /mysql/setup.sh
RUN /mysql/setup.sh