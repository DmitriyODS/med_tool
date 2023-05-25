import React, { useCallback, useEffect } from 'react';
import styles from './Home.module.css';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../../components/navbar/NavBar';
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
import MedicalServicesOutlinedIcon from '@mui/icons-material/MedicalServicesOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import { useDispatch, useSelector } from 'react-redux';
import {
  logout,
  selectIsLoading,
  selectIsLogin,
  setLoading,
  setUser,
} from '../../store/rootSlice';
import { AccessTokenKey, RefreshTokenKey, UrlPages, UserIDKey } from '../../globals/consts';
import { Refresh } from '../../api/auth';
import LoadingScreen from '../../components/loadingScreen/LoadingScreen';
import { enqueueSnackbar } from 'notistack';
import { GetUserByID } from '../../api/user';

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);
  const isLogin = useSelector(selectIsLogin);
  const location = useLocation();

  // проверим авторизацию пользователя
  useEffect(() => {
    if (!isLogin) {
      dispatch(setLoading(true));

      // попытаемся найти данные пользователя в localStorage
      const accessToken = localStorage.getItem(AccessTokenKey);
      const userID = localStorage.getItem(UserIDKey);
      if (!accessToken || !userID) {
        // если не нашли, идём на авторизацию
        navigate(UrlPages.Auth, { replace: true });
        dispatch(setLoading(false));
        return;
      }

      // если нашли, обновим данные
      const result = GetUserByID(userID);
      result.then((userData) => {
        dispatch(setUser(userData));
      }, (error) => {
        // если не удалось получить данные, чистим localStorage и переходим на авторизацию
        enqueueSnackbar(`Ошибка получения данныех: ${error}`, { variant: 'error' });
        localStorage.removeItem(AccessTokenKey);
        localStorage.removeItem(UserIDKey);
        navigate(UrlPages.Auth, { replace: true });
      });

      result.finally(() => {
        dispatch(setLoading(false));
      });
    }

    if (location.pathname === UrlPages.Base) {
      navigate(UrlPages.Diary, { replace: true });
    }
  }, [isLogin, location]);

  const onLogoutHandler = useCallback(() => {
    dispatch(logout());
    navigate(UrlPages.Auth, { replace: true });
  }, []);

  return (
    <div className={styles.root}>
      {isLoading ? <LoadingScreen /> : (
        <>
          <NavBar logoutHandler={onLogoutHandler} menuItems={[
            { name: 'Дневник', icon: <EditNoteOutlinedIcon />, path: UrlPages.Diary },
            { name: 'Статистика', icon: <TimelineOutlinedIcon />, path: UrlPages.Statistics },
            { name: 'Болезни', icon: <MedicalServicesOutlinedIcon />, path: UrlPages.Disease },
          ]} />
          <Outlet />
        </>)}
    </div>
  );
}

export default Home;
