FROM alpine:3.7
RUN mkdir /java-agent
COPY java-agent.zip /java-agent.zip
RUN unzip /java-agent.zip -d /java-agent
CMD ["tail", "-f", "/dev/null"]