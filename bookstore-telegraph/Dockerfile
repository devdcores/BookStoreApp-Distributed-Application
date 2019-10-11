FROM telegraf

# Add in the configuration file from the local directory.
ADD telegraf.conf /etc/telegraf/telegraf.conf

#Using Dokerize to check whether db is up, if it is then start this service.
COPY dockerize dockerize

CMD ./dockerize -wait tcp://bookstore-influxdb:8086 -timeout 15m telegraf
