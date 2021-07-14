FROM openjdk:9

RUN curl -sL https://deb.nodesource.com/setup_14.x | bash - && \
	apt-get install -y nodejs gcc g++ make && \
	curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
	echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
	apt-get update && apt-get install -y yarn

RUN mkdir /usr/app
WORKDIR /usr/app
ENV PATH /usr/app/node_modules/.bin:$PATH

COPY package.json /usr/app/package.json

RUN yarn

COPY . /usr/app

RUN chmod 777 ./migrations/flyway

EXPOSE 80

CMD ["sh", "bootstrap.sh"]
