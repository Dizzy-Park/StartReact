import { useSelector } from 'react-redux';
import { RootState } from '../reducers';
import CircularProgress from "@material-ui/core/CircularProgress";
import styled from 'styled-components';

const LoadingArea = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 9999;
`

const LoadingIcon = styled.div`
  position: absolute;
  height: 100%;
  top: 20%;
  left: 45%;
`

const LoadingView = () => {
    const {loading} = useSelector((state:RootState) => state.globalReducer)

    return (
        <>
            {loading === false ? "" :
                <>
                    <LoadingArea>
                        <LoadingIcon>
                            <CircularProgress color="inherit" />
                        </LoadingIcon>
                    </LoadingArea>
                </>
            }
        </>
    )
}

export default LoadingView