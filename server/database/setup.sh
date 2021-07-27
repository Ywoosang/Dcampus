#!/bin/bash
service mysql start
mysql < /mysql/setup.sql
service mysql stop



