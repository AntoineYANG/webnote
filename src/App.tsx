import React from 'react';
import './you.css';
import { ViewRouter, ViewCase, ViewRouterHandler } from './container/ViewRouter';
import Home from './views/Home';
import ClientContext from './server-container/ClientContext.server';
import ThemeButton from './presentational/ThemeButton';
import MarkDownEditor from './server-presentational/MarkDownEditor.server';
import styleinject from 'styleinject-y';
import User from './views/User';


export let containerHandler: ViewRouterHandler = {};

const App: React.FC = () => {
  return (
    <div className="App">
      <ClientContext>
        <ViewRouter initPath="/" handler={ containerHandler } >
          <ViewCase path="/" >
            <Home />
          </ViewCase>
          <ViewCase path="/user" >
            <User />
          </ViewCase>
          <ViewCase path="/editor" >
            <Home>
              <MarkDownEditor text="hello world" />
            </Home>
          </ViewCase>
        </ViewRouter>
        <ThemeButton />
      </ClientContext>
    </div>
  );
};

styleinject("div.App", {
  display:                "flex",
  flexDirection:          "column",
  alignItems:             "center",
  justifyContent:         "center",
  width:                  "100vw",
  height:                 "100vh",
  background:             "var(--Inkacy-backgroundColor)"
});

export default App;
