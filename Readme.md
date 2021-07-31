## 이미지 빌드
```bash
$ cd server/database
$ docker build -t wlearn:ver1 .
``` 
## 컨테이너 실행
```
$ docker run --rm --name wlearndb -e MYSQL_ROOT_PASSWORD=wlearn11 -d -p 3306:3306 wlearn:ver1 --character-set-server=utf8 --collation-server=utf8_unicode_ci --restart=always
```
`--restart=always` : docker 데몬이 시작될 때 컨테이너가 시작

## 컨테이너 재실행
컨테이너 프로세스 확인
```
$ docker ps
``` 
종료된 상태라면 재실행
```
$ docker start wlearndb 
``` 
## 컨테이너 내부에서 SQL 파일 실행 
```docker
$ docker exec -it wlearndb bash  
$ mysql -u root -p < /mysql/setup.sql
``` 

## 컨테이너로부터 데이터베이스 백업 SQL 파일 생성
```bash
$ docker exec wlearndb sh -c 'exec mysqldump --databases wlearn -uroot -p"<your-password>"' > "<path-on-your-host>/backup.sql"
```  

## 컨테이너에 데이터베이스 백업 파일 적용
```bash
$ docker exec -i some-mysql sh -c 'exec mysql -uroot -p"<your-password>"' <  "<path-on-your-host>/backup.sql"
``` 
