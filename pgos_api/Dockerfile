FROM ruby:2.5
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs
RUN mkdir -p /myapp/pgos_api
WORKDIR /myapp/pgos_api
COPY Gemfile /myapp/pgos_api/Gemfile
COPY Gemfile.lock /myapp/pgos_api/Gemfile.lock
RUN bundle install
COPY . /myapp/pgos_api
