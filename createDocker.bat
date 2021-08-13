@echo off
@REM 도커 네트워크 생성 docker-compose.yaml 에 설정된 네트워크 이름
docker network create --driver=bridge dizzy
npm i
docker-compose -f docker-compose.yaml up -d --build
pause
exit