# docker hub 에서 가져올 image 설정
FROM node:lts-alpine
# docker 내부에서 작업할 폴더위치 설정
WORKDIR /front
# 복사할 원본파일 위치 : 복사될 파일 위치
COPY ./ ./
RUN npm install
CMD ["npm", "run", "dev"]