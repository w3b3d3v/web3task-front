  import { useEffect } from "react";
  import {
    Button,
    Tooltip,
    styled,
    Box
  } from "@mui/material";
  import { useState } from "react";
  import i18next from 'i18next';
  import { useTranslation } from 'react-i18next';
  import SuspenseLoader from 'src/components/SuspenseLoader';
  
  type LngRet = { [lng: string]: { nativeName: string; }; }

  function LocaleLanguage() {
    const [lang, setLang] = useState<String>(i18next.language);
    const { t, i18n, ready } = useTranslation(['content-overview']);
    const [ loading, setLoading ] = useState<boolean>(true);
  
    const changeLanguage = (event): void => {
      console.log("event.target.value => ", event);
      setLang(event.target.accessKey);
      i18n
      .changeLanguage(event.target.accessKey)
      .then((t) => {
        console.log("t => ", t);
      });
    };

    useEffect(() => {
      if (ready)
        setLoading(false);
    }, []);
  
    return (      
      <>
        {
          !loading && 
          <Tooltip arrow title="Locale Language">
              <Box>              
                  <Button onClick={changeLanguage} sx={{  width: '31px' , height: '21px', marginRight: '10px', border: 'none', boxShadow: 'none', outline: 'none', cursor: 'pointer' }}>
                    <img accessKey="pt-BR"
                      src="/static/images/lang/pt_flag.jpg"
                    />
                  </Button>
                  <Button onClick={changeLanguage} sx={{  width: '31px', height: '21px', marginRight: '10px', border: 'none', boxShadow: 'none', outline: 'none', cursor: 'pointer' }}>
                    <img accessKey="en"
                      src="/static/images/lang/en_flag.jpg"
                    />
                  </Button>
              </Box>
              
          </Tooltip>
          
        }        
      </>
    );
  }
  
  export default LocaleLanguage;
  