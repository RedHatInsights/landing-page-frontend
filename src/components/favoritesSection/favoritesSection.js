import React from 'react';
import { ScalprumProvider, ScalprumComponent } from '@scalprum/react-core';

const config = {
  remoteModule: {
    name: 'LandingNavFavorites',
    manifestLocation: '/apps/chrome/js/fed-mods.json'
  }
}

const favoritesSection = (props) => {
  return (
    <ScalprumProvider config={config}>
      <ScalprumComponent
        appName="chrome"
        scope="chrome"
        module="./LandingNavFavorites"
        {...props}
      />
    </ScalprumProvider>
  )
}


export default favoritesSection;