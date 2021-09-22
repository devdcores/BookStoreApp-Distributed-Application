import React, { useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { ENABLE_DARK_MODE, DISABLE_DARK_MODE } from '../actions/darkModeActions';

const DarkModeToggle = () => {

  const { isDark } = useSelector((state) => state.darkMode);
  const checked = isDark;

  const dispatch = useDispatch();

  const changeThemeToDark = () => {
    document.getElementById('root').setAttribute('data-theme', 'dark');
  };

  const changeThemeToLight = () => {
    document.getElementById('root').setAttribute('data-theme', 'light');
  };

  const handleChangeToggle = (e) => {
    if (e.target.checked) {
      dispatch(ENABLE_DARK_MODE());
    } else {
      dispatch(DISABLE_DARK_MODE());
    }
  };

  useEffect(() => {
      if (checked) {
        changeThemeToDark();
        localStorage.setItem('isDark', JSON.stringify(true));
      } else {
        changeThemeToLight();
        localStorage.setItem('isDark', JSON.stringify(false));
      }
    }
    , [checked]
  );

  return (
    <Form className="row-container-fully-centered">
      <Form.Check
        type="switch"
        id="custom-switch"
        label={checked ? '🌙' : '🌞'}
        onChange={event => handleChangeToggle(event)}
        defaultChecked={checked}
      />
    </Form>
  );
};

export default DarkModeToggle;
