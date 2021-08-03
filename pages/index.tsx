import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { RootState } from "../reducers";
import { Box, Input, Button, styled, Container, Typography } from "@material-ui/core";
import { ADD_TEXT } from '../reducers/testReducer';
import axios from 'axios';
import cookie from 'react-cookies'
import { SET_TOKEN } from '../reducers/userReducer';

const ContainerMainView = styled(Container)({
  padding: "10px 10px"
})

const BoxDiv = styled(Box)({
  marginBottom: "10px"
})
// BoxDiv 상속
const BoxViewText = styled(BoxDiv)({
  color: "#ff0000"
})

const TokenArea = styled(BoxDiv) ({
})

const Index = () => {
  const dispatch = useDispatch();
  const {text} = useSelector((state:RootState) => state.testReducer)
  const {accessToken} = useSelector((state:RootState) => state.userReducer)
  const [inputText, setInputText] = useState<string>("");
  
  const changeTextHandler = () => {
    console.log(inputText)
    if(inputText === "") {
      alert("최소 1글자 이상 입력해 주세요");
      return;
    }
    
    dispatch({
      type: ADD_TEXT, 
      payload: {text: inputText}
    })
  }
  
  // 쿠키에 token 저장
  const createTokenHandler = () => {
    const accessToken = "aaa"; // 본 토큰은 서버에서 받아오도록 해야하지만 여기선 임시로 aaa로 함
    axios.defaults.headers.Authorization = "Bearer " + accessToken;
    // 만료시간 1일 설정(60초 * 60 * 24)
    const expires = new Date()
    expires.setDate(Date.now() + 1000 * 60 * 60 * 24)
    cookie.save(
      'accessToken', 
      accessToken, {
        path: '/', 
        expires
      }
    )
    
    dispatch({
      type: SET_TOKEN, 
      payload: {
        accessToken: accessToken
      }
    })

    alert("저장되었습니다")
    console.log("header: ", axios.defaults.headers.Authorization)
  }
  return (
    <>
      <ContainerMainView>
        <BoxDiv>
          메인페이지 입니다
        </BoxDiv>
        <BoxDiv>
          reducer 테스트: 
          <BoxViewText>
            Input 값: { text }
          </BoxViewText>
        </BoxDiv>
        <BoxDiv>
          <Input placeholder={"값을 입력해주세요"} value={inputText} onChange={(e) => setInputText(e.target.value)}></Input>
        </BoxDiv>
        <BoxDiv>
          <Button variant="outlined" onClick={changeTextHandler}>
            적용
          </Button>
        </BoxDiv>
        <hr />
        <TokenArea>
          <BoxDiv>
            <Typography variant={"h6"} className={""}>
              Token + cookie 테스트
            </Typography>
          </BoxDiv>
        </TokenArea>
        <BoxDiv>
          <Button variant="outlined" onClick={createTokenHandler}>
            토큰 쿠키 저장
          </Button>
        </BoxDiv>
        <BoxDiv>
          store에 저장된 accessToken =&gt; {accessToken}
        </BoxDiv>
      </ContainerMainView>
    </>
  )
}

export default Index