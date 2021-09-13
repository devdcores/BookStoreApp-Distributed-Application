import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';

const ToggleTheme = () => {

  const initialStateChecked = JSON.parse(localStorage.getItem('isDark'));
  const [checked, setChecked] = useState(initialStateChecked);

  const changeThemeToDark = () => {
    document.getElementById('root').setAttribute('data-theme', 'dark');
  };

  const changeThemeToLight = () => {
    document.getElementById('root').setAttribute('data-theme', 'light');
  };

  const handleChangeToggle = (e) => {
    setChecked(e.target.checked);
  };

  useEffect(() => {
      if (checked) {
        changeThemeToDark();
        localStorage.setItem("isDark", JSON.stringify(true))
      } else {
        changeThemeToLight();
        localStorage.setItem("isDark", JSON.stringify(false))
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

export default ToggleTheme;
