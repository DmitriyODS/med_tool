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
import { RefreshTokenKey, UrlPages } from '../../globals/consts';
import { Refresh } from '../../api/auth';
import LoadingScreen from '../../components/loadingScreen/LoadingScreen';

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

      // попытаемся найти refresh токен в localStorage
      const refreshToken = localStorage.getItem(RefreshTokenKey);
      if (!refreshToken) {
        // если не нашли, идём на авторизацию
        navigate(UrlPages.Auth, { replace: true });
        dispatch(setLoading(false));
        return;
      }

      // если нашли, обновим токен
      const result = Refresh(refreshToken);
      result.then((userData) => {
        // если всё хорошо, обновим данные пользователя и токен в localStorage
        dispatch(setUser(userData));
        localStorage.setItem(RefreshTokenKey, userData.refreshToken);
      }, (error) => {
        // если не удалось обновить токен, удалим его из localStorage и перейдём на авторизацию
        console.log(`Ошибка обновления токена: ${error}`);
        localStorage.removeItem(RefreshTokenKey);
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
