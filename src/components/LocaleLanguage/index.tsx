  import { useEffect } from "react";
  import {
    Button,
    Tooltip
  } from "@mui/material";
  import { useState } from "react";
  import i18next from 'i18next';
  import { useTranslation } from 'react-i18next';
  import './styles.css';
  import SuspenseLoader from 'src/components/SuspenseLoader';
  
  type LngRet = { [lng: string]: { nativeName: string; }; }

  function LocaleLanguage() {
    const [lang, setLang] = useState<String>(i18next.language);
    const { t, i18n, ready } = useTranslation(['content-overview']);
    const [ loading, setLoading ] = useState<boolean>(true);
  
    const changeLanguage = (event): void => {
      console.log("event.target.value => ", event.target.value);
      setLang(event.target.value);
      i18n
      .changeLanguage(event.target.value)
      .then((t) => {
        console.log("t => ", t);
      });
    };

    useEffect(() => {
      if (ready)
        setLoading(false);
    }, []);
    
    // useEffect(() => {
    //   i18next.services.backendConnector.backend.getLanguages((err: any, ret: string) => {
    //     if (err) return // TODO: handle err...
    //     console.log("ret =>", ret);
    //     setLang(ret);
    //   });
    // }, [i18next]);
  
    return (      
      <>
        {
          !loading && 
          <Tooltip arrow title="Locale Language">
              <nav className='language'>
                  <button
                      className={lang === 'pt' ? 'pt active' : 'pt'}
                      onClick={changeLanguage}
                      value='pt-BR'  
                  />
                  <button
                      className={lang === 'en' ? 'en active' : 'en'}
                      onClick={changeLanguage}
                      value='en'
                  />
              </nav>
          </Tooltip>
        }        
      </>
    );
  }
  
  export default LocaleLanguage;
  