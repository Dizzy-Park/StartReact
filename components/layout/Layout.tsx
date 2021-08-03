import React, { ReactNode, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { LOADING_OFF, LOADING_ON } from '../../reducers/GlobalReducer'
import { RootState } from "../../reducers";
import { useRouter } from 'next/dist/client/router';
import TopBar from './TopBar';

type Props = {
  children?: ReactNode
}

const Layout = ({ children }: Props) => {
  const dispatch = useDispatch();
  const {userInfo} = useSelector((state:RootState) => state.userReducer);
  const router = useRouter()

  // 로딩바 설정
  useEffect(() => {
    axios.interceptors.request.use(function (config) {
      dispatch({
        type: LOADING_ON
      })
      return config;
    }, function (error) {
      dispatch({
        type: LOADING_OFF
      })
      return Promise.reject(error);
    })

    axios.interceptors.response.use(function (config) {
      dispatch({
          type: LOADING_OFF
      })
      return config;
    }, function(error) {
      dispatch({
          type: LOADING_OFF
      })
      return Promise.reject(error)
    })
  }, [])

  return (
    <div className={"layout"}>
      <div className={"body"}>
        <TopBar />
        {children}
      </div>
    </div>
  )
}

export default Layout