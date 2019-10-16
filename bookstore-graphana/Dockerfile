FROM grafana/grafana

# Add in the configuration file from the local directory.
ADD datasource.yml /etc/grafana/provisioning/datasources/datasource.yml
ADD dashboard.yml /etc/grafana/provisioning/dashboards/dashboard.yml
ADD services-dashboard.json /var/lib/grafana/dashboards/services-dashboard.json
ADD docker-container-dashboard.json /var/lib/grafana/dashboards/docker-container-dashboard.json
ADD docker-all-dashboard.json /var/lib/grafana/dashboards/docker-all-dashboard.json