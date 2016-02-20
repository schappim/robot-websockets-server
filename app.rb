#!/usr/bin/env ruby

require 'rubygems'
require 'sinatra'
require 'sinatra-websocket'

set :server, 'thin'
set :sockets, []

set :bind, '0.0.0.0'
set :port, ARGV[0].to_i

get '/' do

  if !request.websocket?
    erb :keyboard
  else
    request.websocket do |ws|
      ws.onopen do
        ws.send("Hello World from sinatra!")
        settings.sockets << ws
      end
      ws.onmessage do |msg|
        EM.next_tick { settings.sockets.each{|s| s.send(msg) } }
      end
      ws.onclose do
        warn("websocket closed")
        settings.sockets.delete(ws)
      end
    end
  end
end

get '/blah' do
  "blah"
end