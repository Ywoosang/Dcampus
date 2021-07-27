```docker
$ docker build -t wlearn:ver1 .
$ docker run --rm --name wlearndb -e MYSQL_ROOT_PASSWORD=wlearn11 -d -p 3306:3306 wlearn:ver1 --character-set-server=utf8 --collation-server=utf8_unicode_ci --restart=always
``` 

--restart 값이 있는 플래그를 사용해 컨테이너를 always 로 실행하면 docker 데몬이 시작될 때 컨테이너가 시작된다.
그렇지 않으면 로컬 컴퓨터를 다시 켤때 docker start <container id or name> 을 사용해 수동으로 시작해야 한다. 


sql 스크립트를 적용한다. 
```docker
$ docker exec -it wlearndb bash  
$ mysql -u root -p < /mysql/setup.sql
``` 
