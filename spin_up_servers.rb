#!/usr/bin/env ruby

require 'rubygems'

(4567..4577).each do |port|
	puts "Spinnign up new Server On: #{port}"
	#{}`./app.rb #{port}`
	
	job = {}

	job[port] = fork do
  		exec "`./app.rb #{port}`"
	end
end